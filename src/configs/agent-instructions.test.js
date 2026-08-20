import { test } from 'node:test'
import assert from 'node:assert/strict'
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

/** Skill IDs the authstack repo already ships. Independent of this module's internals. */
const SHIPPED_SKILLS = [
  'integrating-agentkit',
  'implementing-saaskit',
  'adding-mcp-oauth',
  'implementing-modular-sso',
  'implementing-scim-provisioning',
]

const INVENTED_SKILL_TOKENS = [
  'agent-auth',
  'full-stack-auth',
  'mcp-auth',
  'modular-sso',
  'modular-scim',
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
  }
}

function combinedInstallStory() {
  return Object.values(installStoryExports()).join('\n')
}

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
