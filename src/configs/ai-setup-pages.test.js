import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(here, '../..')
const templatesDir = join(repoRoot, 'src/components/templates/coding-agents')

const SHIPPED_SKILLS = [
  'integrate-agentkit',
  'implement-saaskit',
  'add-mcp-oauth',
  'implement-sso',
  'implement-scim',
]

const INVENTED_PLUGIN_LINES = [
  'Install the `mcp-auth`',
  'Install the `modular-sso`',
  'Install the `modular-scim`',
  'Install the `agent-auth`',
  'Install the `full-stack-auth`',
]

function templateFiles() {
  return readdirSync(templatesDir)
    .filter((name) => name.endsWith('.mdx'))
    .map((name) => join(templatesDir, name))
}

function read(path) {
  return readFileSync(path, 'utf8')
}

test('AI setup templates do not invent skill tokens as plugin names', () => {
  for (const file of templateFiles()) {
    const text = read(file)
    for (const phrase of INVENTED_PLUGIN_LINES) {
      assert.equal(text.includes(phrase), false, `${file} still has: ${phrase}`)
    }
  }
})

test('AgentKit coding-agent cookbook verify uses SCALEKIT_ENVIRONMENT_URL', () => {
  const text = read(
    join(repoRoot, 'src/content/docs/cookbooks/set-up-agentkit-with-your-coding-agent.mdx'),
  )
  assert.equal(text.includes('SCALEKIT_ENVIRONMENT_URL'), true)
  assert.equal(text.includes('SCALEKIT_ENV_URL'), false)
  assert.equal(text.includes('ProductAgentBlock'), true)
  assert.equal(text.includes('skill="integrate-agentkit"'), true)
})

test('AI setup templates name a shipped Authstack skill', () => {
  for (const file of templateFiles()) {
    const text = read(file)
    const named = SHIPPED_SKILLS.some((skill) => text.includes(skill))
    assert.equal(named, true, `${file} names no shipped Authstack skill`)
  }
})
