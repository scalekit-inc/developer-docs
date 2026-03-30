import { describe, it, expect } from 'vitest'
import { classifyQuery } from '../../src/lib/classify-query.js'

describe('classifyQuery', () => {
  it('classifies FSA questions', () => {
    expect(classifyQuery('How do I manage user sessions in FSA?')).toBe('fsa')
    expect(classifyQuery('How does RBAC work?')).toBe('fsa')
    expect(classifyQuery('How do I add users to an org?')).toBe('fsa')
  })

  it('classifies SSO questions', () => {
    expect(classifyQuery('How do I set up SAML SSO?')).toBe('sso')
    expect(classifyQuery('Configure OIDC with Okta')).toBe('sso')
    expect(classifyQuery('single sign-on setup')).toBe('sso')
  })

  it('classifies SCIM questions', () => {
    expect(classifyQuery('How does SCIM provisioning work?')).toBe('scim')
    expect(classifyQuery('Sync users from directory')).toBe('scim')
  })

  it('classifies Agent Auth questions', () => {
    expect(classifyQuery('How do AI agents authenticate?')).toBe('agent-auth')
    expect(classifyQuery('OAuth vault for tool calling')).toBe('agent-auth')
  })

  it('classifies MCP questions', () => {
    expect(classifyQuery('How do I add auth to my MCP server?')).toBe('mcp')
    expect(classifyQuery('Dynamic Client Registration')).toBe('mcp')
  })

  it('classifies M2M questions', () => {
    expect(classifyQuery('Service to service authentication')).toBe('m2m')
    expect(classifyQuery('client credentials flow')).toBe('m2m')
    expect(classifyQuery('API key authentication')).toBe('m2m')
  })

  it('classifies SDK/API reference questions', () => {
    expect(classifyQuery('What does the getSession() method return?')).toBe('sdk')
    expect(classifyQuery('Webhook payload format')).toBe('sdk')
  })

  it('falls back to quickstart for unknown topics', () => {
    expect(classifyQuery('How do I get started with Scalekit?')).toBe('quickstart')
    expect(classifyQuery('What is Scalekit?')).toBe('quickstart')
  })

  it('is case-insensitive', () => {
    expect(classifyQuery('HOW DO I SET UP SAML SSO')).toBe('sso')
  })
})
