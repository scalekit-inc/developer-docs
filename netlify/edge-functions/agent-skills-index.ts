import type { Config } from '@netlify/edge-functions'

const REPO = 'scalekit-inc/skills'
const BRANCH = 'main'
const SKILLS_PATH = 'skills'
const RAW_BASE = `https://raw.githubusercontent.com/${REPO}/${BRANCH}/${SKILLS_PATH}`
const API_BASE = `https://api.github.com/repos/${REPO}/contents/${SKILLS_PATH}`
const SCHEMA = 'https://schemas.agentskills.io/discovery/0.2.0/schema.json'

async function sha256Hex(content: string): Promise<string> {
  const buf = new TextEncoder().encode(content)
  const hash = await crypto.subtle.digest('SHA-256', buf)
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

function extractDescription(skillMd: string): string {
  const lines = skillMd.split('\n')
  // First non-empty, non-heading line after the H1
  let pastH1 = false
  for (const line of lines) {
    const trimmed = line.trim()
    if (!pastH1) {
      if (trimmed.startsWith('# ')) pastH1 = true
      continue
    }
    if (trimmed && !trimmed.startsWith('#')) return trimmed.slice(0, 160)
  }
  // Fallback: use the H1 title
  const h1 = lines.find((l) => l.trim().startsWith('# '))
  return h1 ? h1.replace(/^#\s+/, '').trim() : ''
}

export default async function handler() {
  const token = Deno.env.get('GITHUB_TOKEN')
  const authHeaders: Record<string, string> = {
    'User-Agent': 'docs.scalekit.com/agent-skills-index',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }

  const dirRes = await fetch(API_BASE, { headers: authHeaders })

  if (!dirRes.ok) {
    return new Response(JSON.stringify({ error: 'Failed to fetch skills directory' }), {
      status: 502,
      headers: { 'content-type': 'application/json' },
    })
  }

  const entries: Array<{ name: string; type: string }> = await dirRes.json()
  const dirs = entries.filter((e) => e.type === 'dir').map((e) => e.name)

  const skills = await Promise.all(
    dirs.map(async (name) => {
      const url = `${RAW_BASE}/${name}/SKILL.md`
      const res = await fetch(url)
      if (!res.ok) return null
      const content = await res.text()
      const digest = `sha256:${await sha256Hex(content)}`
      const description = extractDescription(content)
      return { name, type: 'skill-md', description, url, digest }
    }),
  )

  const index = {
    $schema: SCHEMA,
    skills: skills.filter(Boolean),
  }

  return new Response(JSON.stringify(index, null, 2), {
    status: 200,
    headers: {
      'content-type': 'application/json',
      'cache-control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}

export const config: Config = {
  path: '/.well-known/agent-skills/index.json',
}
