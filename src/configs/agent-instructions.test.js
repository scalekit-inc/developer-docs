import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  setupOneLiner,
  setupForAgent,
  ENVIRONMENT_URL_VAR,
  AGENT_PLUGIN_HEADER,
  AGENT_PLUGIN_DETAILS_MD,
  AGENT_PLUGIN_VISIBLE_MD,
  AGENT_PLUGIN_META,
} from './agent-instructions.ts'
import { homepagePrompt, pageActionsPrompt } from './page-actions.config.ts'
import {
  agentkitPrompt,
  saaskitPrompt,
  mcpAuthPrompt,
  modularSsoPrompt,
  modularScimPrompt,
  PRODUCT_PROMPTS,
} from './product-prompts.ts'

const publicAgentsMd = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), '../../public/AGENTS.md'),
  'utf8',
)

/** Skill IDs the authstack repo already ships. Independent of this module's internals. */
const SHIPPED_SKILLS = [
  'integrate-agentkit',
  'implement-saaskit',
  'add-mcp-oauth',
  'implement-sso',
  'implement-scim',
]

const INVENTED_SKILL_TOKENS = [
  'agent-auth',
  'full-stack-auth',
  'mcp-auth',
  'modular-sso',
  'modular-scim',
  'integrating-agentkit',
  'implementing-saaskit',
  'adding-mcp-oauth',
  'implementing-modular-sso',
  'implementing-scim-provisioning',
]

function installStoryExports() {
  return {
    setupOneLiner,
    setupForAgent,
    ENVIRONMENT_URL_VAR,
    AGENT_PLUGIN_HEADER,
    AGENT_PLUGIN_DETAILS_MD,
    AGENT_PLUGIN_VISIBLE_MD,
    AGENT_PLUGIN_META,
    homepagePrompt,
    pageActionsPrompt,
    agentkitPrompt,
    saaskitPrompt,
    mcpAuthPrompt,
    modularSsoPrompt,
    modularScimPrompt,
  }
}

function combinedInstallStory() {
  return [...Object.values(installStoryExports()), publicAgentsMd].join('\n')
}

function squash(text) {
  return text.replace(/\s+/g, ' ').trim()
}

test('public AGENTS.md includes the install story and the Authstack env var', () => {
  assert.equal(publicAgentsMd.includes(setupOneLiner), true)
  assert.equal(squash(publicAgentsMd).includes(squash(AGENT_PLUGIN_DETAILS_MD)), true)
  assert.equal(publicAgentsMd.includes(ENVIRONMENT_URL_VAR), true)
})

test('install story names the human CLI and the non-interactive agent form', () => {
  assert.equal(setupOneLiner, 'npx @scalekit-inc/cli setup')
  assert.equal(setupForAgent, 'npx -y @scalekit-inc/cli setup -y')
})

function hasStandaloneToken(text, token) {
  const escaped = token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return new RegExp(`(?<![A-Za-z0-9-])${escaped}(?![A-Za-z0-9-])`).test(text)
}

test('install story does not invent skill tokens or the short env alias', () => {
  const text = combinedInstallStory()
  for (const token of INVENTED_SKILL_TOKENS) {
    assert.equal(hasStandaloneToken(text, token), false, `invented token still present: ${token}`)
  }
  assert.equal(hasStandaloneToken(text, 'SCALEKIT_ENV_URL'), false)
})

test('install story names every shipped Authstack skill and the Authstack env var', () => {
  const text = combinedInstallStory()
  for (const skill of SHIPPED_SKILLS) {
    assert.equal(text.includes(skill), true, `missing shipped skill: ${skill}`)
  }
  assert.equal(text.includes('SCALEKIT_ENVIRONMENT_URL'), true)
})

test('each product prompt names its shipped skill, the CLI, and the env var', () => {
  assert.deepEqual(Object.keys(PRODUCT_PROMPTS).sort(), [...SHIPPED_SKILLS].sort())
  for (const skill of SHIPPED_SKILLS) {
    const prompt = PRODUCT_PROMPTS[skill]
    assert.equal(prompt.includes(skill), true, `product prompt missing skill: ${skill}`)
    assert.equal(prompt.includes(setupForAgent), true, `product prompt missing agent CLI: ${skill}`)
    assert.equal(
      prompt.includes(ENVIRONMENT_URL_VAR),
      true,
      `product prompt missing env var: ${skill}`,
    )
  }
})
