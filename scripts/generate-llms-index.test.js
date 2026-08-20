import { test } from 'node:test'
import assert from 'node:assert/strict'
import { AGENT_PLUGIN_DETAILS_MD } from '../src/configs/agent-instructions.ts'
import { buildPublishedLlmsTxt } from './generate-llms-index.js'

/** Labels from llms.config.ts customSets plus the slugs starlight already publishes. */
const SET_LINKS = [
  ['SaaSKit Complete', 'saaskit-complete'],
  ['AgentKit', 'agentkit'],
  ['AgentKit Frameworks', 'agentkit-frameworks'],
  ['MCP Authentication', 'mcp-authentication'],
  ['Enterprise SSO & SCIM', 'enterprise-sso--scim'],
  ['Quickstart Collection', 'quickstart-collection'],
  ['API & SDK Reference', 'api--sdk-reference'],
  ['Integration Guides', 'integration-guides'],
  ['Machine-to-Machine Auth', 'machine-to-machine-auth'],
]

const STUB_PAGE_URLS = [
  'https://docs.scalekit.com/dev-kit/ai-assisted-development/claude.md',
  'https://docs.scalekit.com/dev-kit/ai-assisted-development/codex.md',
  'https://docs.scalekit.com/dev-kit/ai-assisted-development/vscode.md',
]

test('published llms.txt includes the install story', async () => {
  const output = await buildPublishedLlmsTxt()
  assert.equal(output.includes(AGENT_PLUGIN_DETAILS_MD), true)
  assert.equal(output.includes('npx @scalekit-inc/cli setup'), true)
})

test('published llms.txt set labels match the files they link to', async () => {
  const output = await buildPublishedLlmsTxt()
  for (const [label, slug] of SET_LINKS) {
    const entry = `- [${label}](https://docs.scalekit.com/_llms-txt/${slug}.txt)`
    assert.equal(output.includes(entry), true, `missing set link: ${entry}`)
  }
  assert.equal(output.includes('Agent Authentication'), false)
})

test('published llms.txt omits stub AI setup pages', async () => {
  const output = await buildPublishedLlmsTxt()
  for (const url of STUB_PAGE_URLS) {
    assert.equal(output.includes(url), false, `stub page still listed: ${url}`)
  }
})
