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

/** Pages that must show the full PRODUCT_PROMPTS playbook, not a short example. */
const FULL_PLAYBOOK_PAGES = [
  ['src/content/docs/agentkit/quickstart.mdx', 'integrate-agentkit'],
  ['src/content/docs/authenticate/fsa/quickstart.mdx', 'implement-saaskit'],
  ['src/content/docs/authenticate/mcp/quickstart.mdx', 'add-mcp-oauth'],
  ['src/content/docs/authenticate/sso/add-modular-sso.mdx', 'implement-sso'],
  ['src/content/docs/sso/quickstart.mdx', 'implement-sso'],
  ['src/content/docs/directory/scim/quickstart.mdx', 'implement-scim'],
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

test('full-playbook pages mount ProductAgentBlock without an example override', () => {
  for (const [file, skill] of FULL_PLAYBOOK_PAGES) {
    const text = read(file)
    assert.equal(text.includes('ProductAgentBlock'), true, `${file} is missing ProductAgentBlock`)
    assert.equal(text.includes(`skill="${skill}"`), true, `${file} is missing skill="${skill}"`)
    assert.equal(/\bexample=/.test(text), false, `${file} still overrides the playbook`)
  }
})

test('AgentKit quickstart uses SCALEKIT_ENVIRONMENT_URL', () => {
  const text = read('src/content/docs/agentkit/quickstart.mdx')
  assert.equal(text.includes('SCALEKIT_ENVIRONMENT_URL'), true)
  assert.equal(text.includes('SCALEKIT_ENV_URL'), false)
})

test('product agent block is a copy-only CTA', () => {
  const text = read('src/components/ProductAgentBlock.astro')
  assert.equal(text.includes('ProductSkill'), true)
  assert.equal(text.includes('PRODUCT_PROMPTS'), true)
  assert.equal(text.includes('data-product-prompt-copy'), true)
  assert.equal(text.includes('aria-live="polite"'), true)
  assert.equal(text.includes('clearTimeout'), true)
  assert.equal(text.includes('setupOneLiner'), false)
  assert.equal(text.includes('syncKey'), false)
  assert.equal(/<Code[\s\S]*code=\{prompt\}/.test(text), false)
  assert.equal(text.includes('Use ${skill}'), false)
})

test('AgentKit pages do not point at a removed FoldCard playbook', () => {
  const quickstart = read('src/content/docs/agentkit/quickstart.mdx')
  const cookbook = read(
    'src/content/docs/agentkit/recipes/set-up-agentkit-with-your-coding-agent.mdx',
  )
  assert.equal(quickstart.includes('Build with a coding agent'), false)
  assert.equal(cookbook.includes('playbook below'), false)
})
