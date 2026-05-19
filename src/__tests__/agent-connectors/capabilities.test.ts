import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const require = createRequire(import.meta.url)

const capabilities = require(
  path.resolve(__dirname, '../../data/agent-connectors/capabilities.json'),
) as Record<string, string[]>

describe('capabilities.json asana entry', () => {
  it('has an asana key', () => {
    assert.ok('asana' in capabilities, 'capabilities.json should have an "asana" key')
  })

  it('asana capabilities is an array', () => {
    assert.ok(Array.isArray(capabilities['asana']), 'asana capabilities should be an array')
  })

  it('asana has exactly 12 capability entries', () => {
    assert.strictEqual(capabilities['asana'].length, 12)
  })

  it('every capability entry is a non-empty string', () => {
    for (const cap of capabilities['asana']) {
      assert.ok(
        typeof cap === 'string' && cap.length > 0,
        `capability entry should be a non-empty string, got: ${JSON.stringify(cap)}`,
      )
    }
  })

  it('every capability entry starts with bold markdown (**)', () => {
    for (const cap of capabilities['asana']) {
      assert.ok(cap.startsWith('**'), `capability "${cap}" should start with "**"`)
    }
  })

  it('every capability entry contains an em-dash separator (\u2014)', () => {
    for (const cap of capabilities['asana']) {
      assert.ok(
        cap.includes('\u2014'),
        `capability "${cap}" should contain em-dash separator`,
      )
    }
  })

  it('includes task management capability', () => {
    const caps = capabilities['asana']
    const taskCap = caps.find((c) => c.toLowerCase().includes('manage tasks'))
    assert.ok(taskCap, 'should have a task management capability')
    assert.ok(taskCap!.includes('create'), 'task capability should mention create')
    assert.ok(taskCap!.includes('update'), 'task capability should mention update')
    assert.ok(taskCap!.includes('delete'), 'task capability should mention delete')
  })

  it('includes project management capability', () => {
    const caps = capabilities['asana']
    const projectCap = caps.find((c) => c.toLowerCase().includes('manage projects'))
    assert.ok(projectCap, 'should have a project management capability')
  })

  it('includes section management capability', () => {
    const caps = capabilities['asana']
    const sectionCap = caps.find((c) => c.toLowerCase().includes('sections'))
    assert.ok(sectionCap, 'should have a section management capability')
  })

  it('includes subtask management capability', () => {
    const caps = capabilities['asana']
    const subtaskCap = caps.find((c) => c.toLowerCase().includes('subtask'))
    assert.ok(subtaskCap, 'should have a subtask management capability')
  })

  it('includes tag management capability', () => {
    const caps = capabilities['asana']
    const tagCap = caps.find((c) => c.toLowerCase().includes('tag'))
    assert.ok(tagCap, 'should have a tag-related capability')
  })

  it('includes story/comment management capability', () => {
    const caps = capabilities['asana']
    const storyCap = caps.find((c) => c.toLowerCase().includes('stories'))
    assert.ok(storyCap, 'should have a stories/comments capability')
  })

  it('includes team management capability', () => {
    const caps = capabilities['asana']
    const teamCap = caps.find((c) => c.toLowerCase().includes('teams'))
    assert.ok(teamCap, 'should have a team management capability')
  })

  it('includes user management capability', () => {
    const caps = capabilities['asana']
    const userCap = caps.find((c) => c.toLowerCase().includes('user'))
    assert.ok(userCap, 'should have a user management capability')
  })

  it('includes workspace capability', () => {
    const caps = capabilities['asana']
    const workspaceCap = caps.find((c) => c.toLowerCase().includes('workspace'))
    assert.ok(workspaceCap, 'should have a workspace-related capability')
  })

  it('includes followers management capability', () => {
    const caps = capabilities['asana']
    const followersCap = caps.find((c) => c.toLowerCase().includes('followers'))
    assert.ok(followersCap, 'should have a followers management capability')
  })

  it('includes attachment handling capability', () => {
    const caps = capabilities['asana']
    const attachmentCap = caps.find((c) => c.toLowerCase().includes('attachment'))
    assert.ok(attachmentCap, 'should have an attachment handling capability')
  })

  it('includes webhook capability', () => {
    const caps = capabilities['asana']
    const webhookCap = caps.find((c) => c.toLowerCase().includes('webhook'))
    assert.ok(webhookCap, 'should have a webhook capability')
  })

  it('asana capabilities contain the exact expected strings', () => {
    const caps = capabilities['asana']
    const expected = [
      '**Manage tasks**',
      '**Manage projects**',
      '**Manage sections**',
      '**Manage subtasks**',
      '**Work with tags**',
      '**Manage stories**',
      '**Manage teams**',
      '**Manage users**',
      '**Work with workspaces**',
      '**Manage followers**',
      '**Handle attachments**',
      '**Use webhooks**',
    ]
    for (const prefix of expected) {
      const found = caps.find((c) => c.startsWith(prefix))
      assert.ok(found, `should have capability starting with "${prefix}"`)
    }
  })
})