import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const TEMPLATES_DIR = path.resolve(__dirname, '../../components/templates/agent-connectors')
const CONTENT_DIR = path.resolve(__dirname, '../../content/docs/agentkit/connectors')

describe('_section-before-tool-list-asana-resource-ids.mdx', () => {
  const mdxFilePath = path.join(
    TEMPLATES_DIR,
    '_section-before-tool-list-asana-resource-ids.mdx',
  )

  it('file exists', () => {
    assert.ok(
      fs.existsSync(mdxFilePath),
      `expected file to exist at ${mdxFilePath}`,
    )
  })

  it('exports sectionTitle', () => {
    const content = fs.readFileSync(mdxFilePath, 'utf-8')
    assert.ok(
      content.includes("export const sectionTitle = 'Getting resource IDs'"),
      'should export sectionTitle with value "Getting resource IDs"',
    )
  })

  it('contains a markdown table with resource-to-tool mappings', () => {
    const content = fs.readFileSync(mdxFilePath, 'utf-8')
    assert.ok(content.includes('| Resource |'), 'should have Resource column header')
    assert.ok(content.includes('| Tool to get GID |'), 'should have Tool column header')
    assert.ok(content.includes('| Response field |'), 'should have Response field column header')
  })

  it('contains Workspace GID row pointing to asana_workspaces_list', () => {
    const content = fs.readFileSync(mdxFilePath, 'utf-8')
    assert.ok(content.includes('Workspace GID'), 'should have Workspace GID row')
    assert.ok(
      content.includes('`asana_workspaces_list`'),
      'should reference asana_workspaces_list tool',
    )
  })

  it('contains Project GID row pointing to asana_projects_list', () => {
    const content = fs.readFileSync(mdxFilePath, 'utf-8')
    assert.ok(content.includes('Project GID'), 'should have Project GID row')
    assert.ok(
      content.includes('`asana_projects_list`'),
      'should reference asana_projects_list tool',
    )
  })

  it('contains Task GID row with multiple tools', () => {
    const content = fs.readFileSync(mdxFilePath, 'utf-8')
    assert.ok(content.includes('Task GID'), 'should have Task GID row')
    assert.ok(
      content.includes('`asana_tasks_list`'),
      'should reference asana_tasks_list tool',
    )
    assert.ok(
      content.includes('`asana_project_tasks_list`'),
      'should reference asana_project_tasks_list tool',
    )
  })

  it('contains Section GID row pointing to asana_sections_list', () => {
    const content = fs.readFileSync(mdxFilePath, 'utf-8')
    assert.ok(content.includes('Section GID'), 'should have Section GID row')
    assert.ok(
      content.includes('`asana_sections_list`'),
      'should reference asana_sections_list tool',
    )
  })

  it('contains Tag GID row pointing to asana_tags_list', () => {
    const content = fs.readFileSync(mdxFilePath, 'utf-8')
    assert.ok(content.includes('Tag GID'), 'should have Tag GID row')
    assert.ok(content.includes('`asana_tags_list`'), 'should reference asana_tags_list tool')
  })

  it('contains Team GID row pointing to asana_workspace_teams_list', () => {
    const content = fs.readFileSync(mdxFilePath, 'utf-8')
    assert.ok(content.includes('Team GID'), 'should have Team GID row')
    assert.ok(
      content.includes('`asana_workspace_teams_list`'),
      'should reference asana_workspace_teams_list tool',
    )
  })

  it('contains User GID (self) row pointing to asana_me_get', () => {
    const content = fs.readFileSync(mdxFilePath, 'utf-8')
    assert.ok(content.includes('User GID (self)'), 'should have User GID (self) row')
    assert.ok(content.includes('`asana_me_get`'), 'should reference asana_me_get tool')
  })

  it('contains Story GID row pointing to asana_task_stories_list', () => {
    const content = fs.readFileSync(mdxFilePath, 'utf-8')
    assert.ok(content.includes('Story GID'), 'should have Story GID row')
    assert.ok(
      content.includes('`asana_task_stories_list`'),
      'should reference asana_task_stories_list tool',
    )
  })

  it('contains Attachment GID row', () => {
    const content = fs.readFileSync(mdxFilePath, 'utf-8')
    assert.ok(content.includes('Attachment GID'), 'should have Attachment GID row')
    assert.ok(
      content.includes('opt_fields=attachments'),
      'should mention opt_fields=attachments for getting attachment GIDs',
    )
  })

  it('contains an Aside tip about opt_fields', () => {
    const content = fs.readFileSync(mdxFilePath, 'utf-8')
    assert.ok(
      content.includes('<Aside type="tip"'),
      'should contain an Aside tip component',
    )
    assert.ok(
      content.includes('opt_fields'),
      'Aside should mention opt_fields',
    )
    assert.ok(
      content.includes('gid,name'),
      'Aside should show an opt_fields example with gid,name',
    )
  })

  it('imports Aside from @astrojs/starlight/components', () => {
    const content = fs.readFileSync(mdxFilePath, 'utf-8')
    assert.ok(
      content.includes("import { Aside } from '@astrojs/starlight/components'"),
      'should import Aside component',
    )
  })

  it('response field column shows data[].gid format for list tools', () => {
    const content = fs.readFileSync(mdxFilePath, 'utf-8')
    assert.ok(
      content.includes('`data[].gid`'),
      'should show data[].gid format for list resource responses',
    )
  })

  it('response field for asana_me_get shows data.gid (not data[].gid)', () => {
    const content = fs.readFileSync(mdxFilePath, 'utf-8')
    assert.ok(
      content.includes('`data.gid`'),
      'asana_me_get returns a single object so response field is data.gid',
    )
  })
})

describe('agent-connectors template index.ts', () => {
  const indexFilePath = path.join(TEMPLATES_DIR, 'index.ts')

  it('index.ts exists', () => {
    assert.ok(fs.existsSync(indexFilePath), `expected index.ts to exist at ${indexFilePath}`)
  })

  it('exports SectionBeforeToolListAsanaResourceIds', () => {
    const content = fs.readFileSync(indexFilePath, 'utf-8')
    assert.ok(
      content.includes('SectionBeforeToolListAsanaResourceIds'),
      'index.ts should export SectionBeforeToolListAsanaResourceIds',
    )
  })

  it('SectionBeforeToolListAsanaResourceIds export references the correct MDX file', () => {
    const content = fs.readFileSync(indexFilePath, 'utf-8')
    assert.ok(
      content.includes("'./_section-before-tool-list-asana-resource-ids.mdx'"),
      'export should reference _section-before-tool-list-asana-resource-ids.mdx',
    )
  })

  it('export line has correct format', () => {
    const content = fs.readFileSync(indexFilePath, 'utf-8')
    const expectedExportLine =
      "export { default as SectionBeforeToolListAsanaResourceIds } from './_section-before-tool-list-asana-resource-ids.mdx'"
    assert.ok(
      content.includes(expectedExportLine),
      `index.ts should contain the exact export line: ${expectedExportLine}`,
    )
  })

  it('SectionBeforeToolListAsanaResourceIds is exported near other SectionBeforeToolList exports', () => {
    const content = fs.readFileSync(indexFilePath, 'utf-8')
    const asanaIdx = content.indexOf('SectionBeforeToolListAsanaResourceIds')
    const datadogIdx = content.indexOf('SectionBeforeToolListDatadogResourceIds')
    const hubspotIdx = content.indexOf('SectionBeforeToolListHubspotResourceIds')
    assert.ok(asanaIdx > -1, 'Asana export should exist')
    assert.ok(datadogIdx > -1, 'Datadog export should exist for comparison')
    assert.ok(hubspotIdx > -1, 'HubSpot export should exist for comparison')
    // Asana export should be grouped with the other SectionBeforeToolList exports
    const distToDatadog = Math.abs(asanaIdx - datadogIdx)
    const distToHubspot = Math.abs(asanaIdx - hubspotIdx)
    assert.ok(
      distToDatadog < 500,
      'Asana export should be near the Datadog export in the file',
    )
    assert.ok(
      distToHubspot < 500,
      'Asana export should be near the HubSpot export in the file',
    )
  })
})

describe('asana.mdx connector page', () => {
  const asanaMdxPath = path.join(CONTENT_DIR, 'asana.mdx')

  it('asana.mdx exists', () => {
    assert.ok(fs.existsSync(asanaMdxPath), `expected asana.mdx to exist at ${asanaMdxPath}`)
  })

  it('contains a "What\'s next" section', () => {
    const content = fs.readFileSync(asanaMdxPath, 'utf-8')
    assert.ok(
      content.includes("## What's next"),
      "asana.mdx should contain a ## What's next section",
    )
  })

  it("What's next section links to connectors index", () => {
    const content = fs.readFileSync(asanaMdxPath, 'utf-8')
    assert.ok(
      content.includes('/agentkit/connectors/'),
      "What's next should link to the connectors index",
    )
  })

  it("What's next section links to MCP server configuration", () => {
    const content = fs.readFileSync(asanaMdxPath, 'utf-8')
    assert.ok(
      content.includes('/agentkit/mcp/configure-mcp-server/'),
      "What's next should link to MCP server configuration",
    )
  })

  it("What's next section references Browse all connectors", () => {
    const content = fs.readFileSync(asanaMdxPath, 'utf-8')
    assert.ok(
      content.includes('Browse all connectors'),
      "What's next should include Browse all connectors link text",
    )
  })

  it("What's next section references Configure MCP server", () => {
    const content = fs.readFileSync(asanaMdxPath, 'utf-8')
    assert.ok(
      content.includes('Configure MCP server'),
      "What's next should include Configure MCP server link text",
    )
  })
})
