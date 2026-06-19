import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'mintlifymcp_checkout',
    description: `Bind the current session to a git branch, creating it if it does not exist. Returns the branch name, editor URL, and a toolkit list of recommended tools to use next.`,
    params: [
      { name: 'branch', type: 'string', required: false, description: `Specific branch to bind to. If it exists in git the session attaches to it without creating a branch; if not, it is created from \`from\`. Cannot be the deploy branch. Omit to auto-generate a fresh \`admin-mcp/<slug>-<7-char-sha>\` branch.` },
      { name: 'from', type: 'string', required: false, description: `Base branch to fork from when creating a new branch. Defaults to the deployment's configured deploy branch (typically \`main\`). The new branch is created at this branch's latest commit.` },
      { name: 'slug', type: 'string', required: false, description: `Human-readable slug used to name an auto-generated branch as \`admin-mcp/<slug>-<7-char-base-sha>\`. Ignored when \`branch\` is provided. If omitted and \`branch\` is also omitted, the branch is auto-named \`admin-mcp/<sessionTokenPrefix>\` and is not human-recognizable. Use a stable, kebab-case slug (e.g. \`add-tips-page\`).` },
    ],
  },
  {
    name: 'mintlifymcp_create_node',
    description: `Insert a new node (page, group, tab, anchor, version, language, or product) into the navigation tree under the specified parent.`,
    params: [
      { name: 'data', type: 'string', required: true, description: `No description.` },
      { name: 'parentId', type: 'string', required: true, description: `No description.` },
      { name: 'order', type: 'integer', required: false, description: `No description.` },
    ],
  },
  {
    name: 'mintlifymcp_delete_node',
    description: `Remove a node and all its descendants from the navigation tree by node ID, optionally adding a redirect for deleted pages.`,
    params: [
      { name: 'nodeId', type: 'string', required: true, description: `No description.` },
      { name: 'redirect', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'mintlifymcp_diff',
    description: `Return the list of changes between the current session branch and the main branch.`,
    params: [
    ],
  },
  {
    name: 'mintlifymcp_discard_session',
    description: `End the current editing session without creating a pull request, discarding all unsaved changes.`,
    params: [
    ],
  },
  {
    name: 'mintlifymcp_edit_page',
    description: `Apply a string-replace edit to a page's MDX body content. Use update_node to change frontmatter fields such as title or description.`,
    params: [
      { name: 'newString', type: 'string', required: true, description: `No description.` },
      { name: 'oldString', type: 'string', required: true, description: `No description.` },
      { name: 'path', type: 'string', required: true, description: `No description.` },
      { name: 'replaceAll', type: 'boolean', required: false, description: `No description.` },
    ],
  },
  {
    name: 'mintlifymcp_execute',
    description: `Run TypeScript or JavaScript against the Admin MCP dashboard SDK in a sandboxed isolate to call workflows, deployment, billing, or analytics APIs.`,
    params: [
      { name: 'code', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'mintlifymcp_get_session_state',
    description: `Return the current session state including the active branch name, edited files, and navigation diff.`,
    params: [
    ],
  },
  {
    name: 'mintlifymcp_list_branches',
    description: `List all git branches available for the current deployment, optionally filtered by a query string.`,
    params: [
      { name: 'query', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'mintlifymcp_list_nodes',
    description: `List navigation nodes from the current branch tree with optional filters for parent, type, language, version, tab, anchor, or product.`,
    params: [
      { name: 'anchor', type: 'string', required: false, description: `No description.` },
      { name: 'cursor', type: 'string', required: false, description: `No description.` },
      { name: 'dropdown', type: 'string', required: false, description: `No description.` },
      { name: 'item', type: 'string', required: false, description: `No description.` },
      { name: 'language', type: 'string', required: false, description: `No description.` },
      { name: 'limit', type: 'integer', required: false, description: `No description.` },
      { name: 'parentId', type: 'string', required: false, description: `No description.` },
      { name: 'product', type: 'string', required: false, description: `No description.` },
      { name: 'recursive', type: 'boolean', required: false, description: `No description.` },
      { name: 'tab', type: 'string', required: false, description: `No description.` },
      { name: 'type', type: 'string', required: false, description: `No description.` },
      { name: 'version', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'mintlifymcp_move_node',
    description: `Reposition a navigation node by moving it to a new parent or changing its order among siblings.`,
    params: [
      { name: 'nodeId', type: 'string', required: true, description: `No description.` },
      { name: 'order', type: 'integer', required: false, description: `No description.` },
      { name: 'parentId', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'mintlifymcp_read',
    description: `Read the full MDX content of a single page on the current branch by path, reflecting any in-session edits.`,
    params: [
      { name: 'path', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'mintlifymcp_save',
    description: `Flush branch changes to git by opening a pull request or committing directly, depending on the selected mode.`,
    params: [
      { name: 'title', type: 'string', required: true, description: `No description.` },
      { name: 'body', type: 'string', required: false, description: `No description.` },
      { name: 'mode', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'mintlifymcp_search',
    description: `Find lines matching a substring or regex pattern across all pages on the current branch.`,
    params: [
      { name: 'query', type: 'string', required: true, description: `No description.` },
      { name: 'caseSensitive', type: 'boolean', required: false, description: `No description.` },
      { name: 'limit', type: 'integer', required: false, description: `No description.` },
      { name: 'regex', type: 'boolean', required: false, description: `No description.` },
    ],
  },
  {
    name: 'mintlifymcp_search_operations',
    description: `Search the Admin MCP SDK for available methods by keyword to find the right operation before writing an execute script.`,
    params: [
      { name: 'query', type: 'string', required: true, description: `No description.` },
      { name: 'limit', type: 'integer', required: false, description: `No description.` },
    ],
  },
  {
    name: 'mintlifymcp_update_config',
    description: `Update top-level docs.json configuration fields or manage redirects. Use this to change site-level settings such as name, description, or theme.`,
    params: [
      { name: 'op', type: 'string', required: true, description: `No description.` },
      { name: 'docsConfig', type: 'object', required: false, description: `No description.` },
      { name: 'redirect', type: 'object', required: false, description: `No description.` },
      { name: 'source', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'mintlifymcp_update_node',
    description: `Update a navigation node's properties in place by node ID, including page frontmatter fields like title, description, icon, or tag.`,
    params: [
      { name: 'data', type: 'string', required: true, description: `No description.` },
      { name: 'nodeId', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'mintlifymcp_write_page',
    description: `Fully overwrite a page's MDX content on the current branch by path.`,
    params: [
      { name: 'content', type: 'string', required: true, description: `No description.` },
      { name: 'path', type: 'string', required: true, description: `No description.` },
    ],
  },
]
