import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { setupOneLiner } from './agent-instructions.ts'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '../..')

/** Product pages that host an agent block. Skill must match the page's product. */
const AGENT_BLOCKS = [
  ['src/content/docs/authenticate/fsa/quickstart.mdx', 'implement-saaskit'],
  ['src/content/docs/authenticate/mcp/quickstart.mdx', 'add-mcp-oauth'],
  ['src/content/docs/authenticate/sso/add-modular-sso.mdx', 'implement-sso'],
  ['src/content/docs/sso/quickstart.mdx', 'implement-sso'],
  ['src/content/docs/directory/scim/quickstart.mdx', 'implement-scim'],
  ['src/content/docs/passwordless/quickstart.mdx', 'implement-saaskit'],
  ['src/content/docs/passwordless/oidc.mdx', 'implement-saaskit'],
  ['src/content/docs/agentkit/quickstart.mdx', 'integrate-agentkit'],
  ['src/content/docs/home/saaskit/index.mdx', 'implement-saaskit'],
  ['src/content/docs/authenticate/set-up-scalekit.mdx', 'implement-saaskit'],
]

function read(rel) {
  return readFileSync(join(repoRoot, rel), 'utf8')
}

test('product-page agent blocks name the owned CLI and the matching shipped skill', () => {
  for (const [file, skill] of AGENT_BLOCKS) {
    const text = read(file)
    const hasCli = text.includes(setupOneLiner) || text.includes('ProductAgentBlock')
    assert.equal(hasCli, true, `${file} is missing the install CLI`)
    assert.equal(text.includes(skill), true, `${file} is missing shipped skill ${skill}`)
  }
})

test('product agent block component uses the owned CLI', () => {
  const text = read('src/components/ProductAgentBlock.astro')
  assert.equal(text.includes('setupOneLiner'), true)
})
