import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { tools } from '../../data/agent-connectors/asana.js'

// Valid param types per the ParamType definition in src/types/agent-connectors.ts
// Note: 'string | null' is used in this PR for nullable params (a documented extension)
const VALID_PARAM_TYPES = new Set([
  'string',
  'boolean',
  'integer',
  'number',
  'object',
  'array',
  'string | null',
])

describe('asana connector tools', () => {
  it('exports a non-empty tools array', () => {
    assert.ok(Array.isArray(tools), 'tools should be an array')
    assert.ok(tools.length > 0, 'tools array should not be empty')
  })

  it('exports exactly 48 tools', () => {
    assert.strictEqual(tools.length, 48)
  })

  it('every tool has a non-empty name string', () => {
    for (const tool of tools) {
      assert.ok(
        typeof tool.name === 'string' && tool.name.length > 0,
        `tool name should be a non-empty string, got: ${tool.name}`,
      )
    }
  })

  it('every tool name starts with the asana_ prefix', () => {
    for (const tool of tools) {
      assert.ok(
        tool.name.startsWith('asana_'),
        `tool "${tool.name}" should start with "asana_"`,
      )
    }
  })

  it('every tool has a non-empty description string', () => {
    for (const tool of tools) {
      assert.ok(
        typeof tool.description === 'string' && tool.description.length > 0,
        `tool "${tool.name}" should have a non-empty description`,
      )
    }
  })

  it('every tool has a params array', () => {
    for (const tool of tools) {
      assert.ok(Array.isArray(tool.params), `tool "${tool.name}" should have a params array`)
    }
  })

  it('every param has the required fields with correct types', () => {
    for (const tool of tools) {
      for (const param of tool.params) {
        assert.ok(
          typeof param.name === 'string' && param.name.length > 0,
          `param in tool "${tool.name}" should have a non-empty name`,
        )
        assert.ok(
          VALID_PARAM_TYPES.has(param.type as string),
          `param "${param.name}" in tool "${tool.name}" has invalid type "${param.type}"`,
        )
        assert.ok(
          typeof param.required === 'boolean',
          `param "${param.name}" in tool "${tool.name}" should have a boolean required field`,
        )
        assert.ok(
          typeof param.description === 'string' && param.description.length > 0,
          `param "${param.name}" in tool "${tool.name}" should have a non-empty description`,
        )
      }
    }
  })

  it('has no duplicate tool names', () => {
    const names = tools.map((t) => t.name)
    const unique = new Set(names)
    assert.strictEqual(unique.size, names.length, 'tool names should all be unique')
  })

  describe('attachment tools', () => {
    it('includes asana_attachment_delete with required attachment_gid', () => {
      const tool = tools.find((t) => t.name === 'asana_attachment_delete')
      assert.ok(tool, 'asana_attachment_delete should exist')
      const param = tool!.params.find((p) => p.name === 'attachment_gid')
      assert.ok(param, 'should have attachment_gid param')
      assert.strictEqual(param!.required, true)
      assert.strictEqual(param!.type, 'string')
    })

    it('includes asana_attachment_get with optional opt_fields', () => {
      const tool = tools.find((t) => t.name === 'asana_attachment_get')
      assert.ok(tool, 'asana_attachment_get should exist')
      const gidParam = tool!.params.find((p) => p.name === 'attachment_gid')
      const optParam = tool!.params.find((p) => p.name === 'opt_fields')
      assert.ok(gidParam, 'should have attachment_gid param')
      assert.strictEqual(gidParam!.required, true)
      assert.ok(optParam, 'should have opt_fields param')
      assert.strictEqual(optParam!.required, false)
    })
  })

  describe('project tools', () => {
    it('includes asana_project_create with required name and workspace', () => {
      const tool = tools.find((t) => t.name === 'asana_project_create')
      assert.ok(tool, 'asana_project_create should exist')
      const nameParam = tool!.params.find((p) => p.name === 'name')
      const workspaceParam = tool!.params.find((p) => p.name === 'workspace')
      assert.ok(nameParam?.required, 'name should be required')
      assert.ok(workspaceParam?.required, 'workspace should be required')
    })

    it('includes asana_project_delete with required project_gid', () => {
      const tool = tools.find((t) => t.name === 'asana_project_delete')
      assert.ok(tool, 'asana_project_delete should exist')
      assert.strictEqual(tool!.params.length, 1)
      assert.strictEqual(tool!.params[0].name, 'project_gid')
      assert.strictEqual(tool!.params[0].required, true)
    })

    it('includes asana_project_duplicate with required name and project_gid', () => {
      const tool = tools.find((t) => t.name === 'asana_project_duplicate')
      assert.ok(tool, 'asana_project_duplicate should exist')
      const nameParam = tool!.params.find((p) => p.name === 'name')
      const gidParam = tool!.params.find((p) => p.name === 'project_gid')
      assert.ok(nameParam?.required, 'name should be required')
      assert.ok(gidParam?.required, 'project_gid should be required')
    })

    it('includes asana_project_update with archived boolean param', () => {
      const tool = tools.find((t) => t.name === 'asana_project_update')
      assert.ok(tool, 'asana_project_update should exist')
      const archived = tool!.params.find((p) => p.name === 'archived')
      assert.ok(archived, 'should have archived param')
      assert.strictEqual(archived!.type, 'boolean')
      assert.strictEqual(archived!.required, false)
    })
  })

  describe('section tools', () => {
    it('includes asana_section_add_task with required section_gid and task', () => {
      const tool = tools.find((t) => t.name === 'asana_section_add_task')
      assert.ok(tool, 'asana_section_add_task should exist')
      const sectionParam = tool!.params.find((p) => p.name === 'section_gid')
      const taskParam = tool!.params.find((p) => p.name === 'task')
      assert.ok(sectionParam?.required, 'section_gid should be required')
      assert.ok(taskParam?.required, 'task should be required')
    })

    it('includes asana_sections_list with required project_gid', () => {
      const tool = tools.find((t) => t.name === 'asana_sections_list')
      assert.ok(tool, 'asana_sections_list should exist')
      const param = tool!.params.find((p) => p.name === 'project_gid')
      assert.ok(param?.required, 'project_gid should be required')
    })
  })

  describe('task tools', () => {
    it('includes asana_task_create with required name param', () => {
      const tool = tools.find((t) => t.name === 'asana_task_create')
      assert.ok(tool, 'asana_task_create should exist')
      const nameParam = tool!.params.find((p) => p.name === 'name')
      assert.ok(nameParam, 'should have name param')
      assert.strictEqual(nameParam!.required, true)
    })

    it('includes asana_task_create with optional assignee, due_on, workspace', () => {
      const tool = tools.find((t) => t.name === 'asana_task_create')
      assert.ok(tool)
      const assignee = tool!.params.find((p) => p.name === 'assignee')
      const dueOn = tool!.params.find((p) => p.name === 'due_on')
      const workspace = tool!.params.find((p) => p.name === 'workspace')
      assert.strictEqual(assignee!.required, false)
      assert.strictEqual(dueOn!.required, false)
      assert.strictEqual(workspace!.required, false)
    })

    it('includes asana_task_update with task_gid required', () => {
      const tool = tools.find((t) => t.name === 'asana_task_update')
      assert.ok(tool, 'asana_task_update should exist')
      const gidParam = tool!.params.find((p) => p.name === 'task_gid')
      assert.ok(gidParam?.required, 'task_gid should be required')
    })

    it('asana_task_update assignee param has type "string | null" (nullable for unassign)', () => {
      const tool = tools.find((t) => t.name === 'asana_task_update')
      assert.ok(tool, 'asana_task_update should exist')
      const assignee = tool!.params.find((p) => p.name === 'assignee')
      assert.ok(assignee, 'should have assignee param')
      assert.strictEqual(
        assignee!.type,
        'string | null',
        'assignee should be "string | null" to support unassigning',
      )
      assert.strictEqual(assignee!.required, false)
    })

    it('asana_task_update completed param has type boolean', () => {
      const tool = tools.find((t) => t.name === 'asana_task_update')
      assert.ok(tool)
      const completed = tool!.params.find((p) => p.name === 'completed')
      assert.ok(completed, 'should have completed param')
      assert.strictEqual(completed!.type, 'boolean')
      assert.strictEqual(completed!.required, false)
    })

    it('asana_task_set_parent parent param has type "string | null" (nullable for top-level)', () => {
      const tool = tools.find((t) => t.name === 'asana_task_set_parent')
      assert.ok(tool, 'asana_task_set_parent should exist')
      const parent = tool!.params.find((p) => p.name === 'parent')
      assert.ok(parent, 'should have parent param')
      assert.strictEqual(
        parent!.type,
        'string | null',
        'parent should be "string | null" to support making a task top-level',
      )
      assert.strictEqual(parent!.required, true, 'parent should be required')
    })

    it('asana_task_set_parent has task_gid required', () => {
      const tool = tools.find((t) => t.name === 'asana_task_set_parent')
      assert.ok(tool)
      const gidParam = tool!.params.find((p) => p.name === 'task_gid')
      assert.ok(gidParam?.required, 'task_gid should be required')
    })

    it('includes asana_task_delete with only task_gid param', () => {
      const tool = tools.find((t) => t.name === 'asana_task_delete')
      assert.ok(tool, 'asana_task_delete should exist')
      assert.strictEqual(tool!.params.length, 1)
      assert.strictEqual(tool!.params[0].name, 'task_gid')
      assert.strictEqual(tool!.params[0].required, true)
    })

    it('includes asana_task_add_followers with required followers and task_gid', () => {
      const tool = tools.find((t) => t.name === 'asana_task_add_followers')
      assert.ok(tool, 'asana_task_add_followers should exist')
      const followersParam = tool!.params.find((p) => p.name === 'followers')
      const gidParam = tool!.params.find((p) => p.name === 'task_gid')
      assert.ok(followersParam?.required, 'followers should be required')
      assert.ok(gidParam?.required, 'task_gid should be required')
    })

    it('includes asana_task_remove_followers with required followers and task_gid', () => {
      const tool = tools.find((t) => t.name === 'asana_task_remove_followers')
      assert.ok(tool)
      const followersParam = tool!.params.find((p) => p.name === 'followers')
      assert.ok(followersParam?.required)
    })

    it('includes asana_task_add_project with required project and task_gid', () => {
      const tool = tools.find((t) => t.name === 'asana_task_add_project')
      assert.ok(tool)
      const projectParam = tool!.params.find((p) => p.name === 'project')
      const gidParam = tool!.params.find((p) => p.name === 'task_gid')
      assert.ok(projectParam?.required, 'project should be required')
      assert.ok(gidParam?.required, 'task_gid should be required')
    })

    it('includes asana_task_add_tag with required tag and task_gid', () => {
      const tool = tools.find((t) => t.name === 'asana_task_add_tag')
      assert.ok(tool)
      const tagParam = tool!.params.find((p) => p.name === 'tag')
      const gidParam = tool!.params.find((p) => p.name === 'task_gid')
      assert.ok(tagParam?.required)
      assert.ok(gidParam?.required)
    })

    it('includes asana_tasks_list with all optional params', () => {
      const tool = tools.find((t) => t.name === 'asana_tasks_list')
      assert.ok(tool)
      for (const param of tool!.params) {
        assert.strictEqual(param.required, false, `param "${param.name}" should be optional`)
      }
    })
  })

  describe('story tools', () => {
    it('includes asana_story_create with required task_gid and text', () => {
      const tool = tools.find((t) => t.name === 'asana_story_create')
      assert.ok(tool, 'asana_story_create should exist')
      const taskGid = tool!.params.find((p) => p.name === 'task_gid')
      const text = tool!.params.find((p) => p.name === 'text')
      assert.ok(taskGid?.required, 'task_gid should be required')
      assert.ok(text?.required, 'text should be required')
    })

    it('includes asana_task_stories_list with required task_gid', () => {
      const tool = tools.find((t) => t.name === 'asana_task_stories_list')
      assert.ok(tool)
      const param = tool!.params.find((p) => p.name === 'task_gid')
      assert.ok(param?.required)
    })
  })

  describe('tag tools', () => {
    it('includes asana_tag_create with required name and workspace', () => {
      const tool = tools.find((t) => t.name === 'asana_tag_create')
      assert.ok(tool)
      const name = tool!.params.find((p) => p.name === 'name')
      const workspace = tool!.params.find((p) => p.name === 'workspace')
      assert.ok(name?.required)
      assert.ok(workspace?.required)
    })

    it('includes asana_tags_list with all optional params', () => {
      const tool = tools.find((t) => t.name === 'asana_tags_list')
      assert.ok(tool)
      for (const param of tool!.params) {
        assert.strictEqual(param.required, false, `${param.name} should be optional`)
      }
    })
  })

  describe('team tools', () => {
    it('includes asana_team_add_user and asana_team_remove_user', () => {
      assert.ok(tools.find((t) => t.name === 'asana_team_add_user'))
      assert.ok(tools.find((t) => t.name === 'asana_team_remove_user'))
    })

    it('asana_team_add_user has required team_gid and user', () => {
      const tool = tools.find((t) => t.name === 'asana_team_add_user')
      assert.ok(tool)
      const teamGid = tool!.params.find((p) => p.name === 'team_gid')
      const user = tool!.params.find((p) => p.name === 'user')
      assert.ok(teamGid?.required)
      assert.ok(user?.required)
    })
  })

  describe('user tools', () => {
    it('includes asana_me_get with no required params', () => {
      const tool = tools.find((t) => t.name === 'asana_me_get')
      assert.ok(tool)
      const requiredParams = tool!.params.filter((p) => p.required)
      assert.strictEqual(requiredParams.length, 0, 'asana_me_get should have no required params')
    })

    it('includes asana_users_list with required workspace_gid', () => {
      const tool = tools.find((t) => t.name === 'asana_users_list')
      assert.ok(tool)
      const param = tool!.params.find((p) => p.name === 'workspace_gid')
      assert.ok(param?.required)
    })

    it('includes asana_user_get with required user_gid', () => {
      const tool = tools.find((t) => t.name === 'asana_user_get')
      assert.ok(tool)
      const param = tool!.params.find((p) => p.name === 'user_gid')
      assert.ok(param?.required)
    })
  })

  describe('workspace tools', () => {
    it('includes asana_workspaces_list with only optional opt_fields', () => {
      const tool = tools.find((t) => t.name === 'asana_workspaces_list')
      assert.ok(tool)
      assert.strictEqual(tool!.params.length, 1)
      assert.strictEqual(tool!.params[0].name, 'opt_fields')
      assert.strictEqual(tool!.params[0].required, false)
    })

    it('includes asana_workspace_get with required workspace_gid', () => {
      const tool = tools.find((t) => t.name === 'asana_workspace_get')
      assert.ok(tool)
      const param = tool!.params.find((p) => p.name === 'workspace_gid')
      assert.ok(param?.required)
    })

    it('includes asana_workspace_teams_list with required workspace_gid', () => {
      const tool = tools.find((t) => t.name === 'asana_workspace_teams_list')
      assert.ok(tool)
      const param = tool!.params.find((p) => p.name === 'workspace_gid')
      assert.ok(param?.required)
    })
  })

  describe('subtask tools', () => {
    it('includes asana_subtask_create with required name and task_gid', () => {
      const tool = tools.find((t) => t.name === 'asana_subtask_create')
      assert.ok(tool)
      const name = tool!.params.find((p) => p.name === 'name')
      const taskGid = tool!.params.find((p) => p.name === 'task_gid')
      assert.ok(name?.required)
      assert.ok(taskGid?.required)
    })

    it('includes asana_task_subtasks_list with required task_gid', () => {
      const tool = tools.find((t) => t.name === 'asana_task_subtasks_list')
      assert.ok(tool)
      const param = tool!.params.find((p) => p.name === 'task_gid')
      assert.ok(param?.required)
    })
  })

  describe('webhook tools', () => {
    it('includes asana_webhooks_list with required workspace', () => {
      const tool = tools.find((t) => t.name === 'asana_webhooks_list')
      assert.ok(tool)
      const workspace = tool!.params.find((p) => p.name === 'workspace')
      assert.ok(workspace?.required)
    })

    it('asana_webhooks_list has optional resource filter', () => {
      const tool = tools.find((t) => t.name === 'asana_webhooks_list')
      assert.ok(tool)
      const resource = tool!.params.find((p) => p.name === 'resource')
      assert.ok(resource, 'should have resource param')
      assert.strictEqual(resource!.required, false)
    })
  })

  describe('regression: nullable param types introduced in PR', () => {
    it('only asana_task_set_parent and asana_task_update use string | null type', () => {
      const nullableParamTools = tools
        .filter((tool) => tool.params.some((p) => p.type === 'string | null'))
        .map((t) => t.name)
      assert.deepStrictEqual(
        nullableParamTools.sort(),
        ['asana_task_set_parent', 'asana_task_update'].sort(),
      )
    })

    it('exactly two params across all tools have string | null type', () => {
      const nullableParams = tools.flatMap((tool) =>
        tool.params
          .filter((p) => p.type === 'string | null')
          .map((p) => ({ tool: tool.name, param: p.name })),
      )
      assert.strictEqual(nullableParams.length, 2)
      const paramKeys = nullableParams.map((np) => `${np.tool}.${np.param}`).sort()
      assert.deepStrictEqual(paramKeys, [
        'asana_task_set_parent.parent',
        'asana_task_update.assignee',
      ])
    })
  })
})