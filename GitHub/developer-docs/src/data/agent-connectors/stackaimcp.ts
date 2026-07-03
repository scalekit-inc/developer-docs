import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'stackaimcp_create_project',
    description: `Create a new Stack AI project from a natural-language description by generating its nodes and edges with AI assistance.`,
    params: [
      {
        name: 'description',
        type: 'string',
        required: true,
        description: `High-level description of what the project should do.`,
      },
    ],
  },
  {
    name: 'stackaimcp_edit_project',
    description: `Edit an existing Stack AI project using a natural-language description or a structured patch of node and edge operations.`,
    params: [
      { name: 'flow_id', type: 'string', required: true, description: `No description.` },
      { name: 'description', type: 'string', required: false, description: `No description.` },
      { name: 'direct_patch', type: 'string', required: false, description: `No description.` },
      { name: 'publish', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'stackaimcp_get_project',
    description: `Retrieve a project's node and edge graph as a paginated, self-contained subgraph with connectivity preserved across pages.`,
    params: [
      {
        name: 'flow_id',
        type: 'string',
        required: true,
        description: `Project ID (from \`\`list_projects\`\`).`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Opaque pagination token from a prior response's
\`\`pagination.next_cursor\`\`. Pass \`\`null\`\` to fetch
the first page.`,
      },
      {
        name: 'include_flow_json',
        type: 'string',
        required: false,
        description: `When true, also include the raw upstream
\`\`flow\`\` object verbatim. Off by default to avoid
duplicating graph data. Refused with a structured
\`\`flow_too_large\`\` error (carrying \`\`next_action\`\` and
node/edge counts) when \`\`nodes + edges\`\` exceeds the
server's \`\`max_inline_flow_elements\`\` cap; in that
case page through the flow using \`\`next_cursor\`\`
instead.`,
      },
      {
        name: 'page_size',
        type: 'string',
        required: false,
        description: `Maximum nodes per page. Defaults to 50, clamped
to [1, 200].`,
      },
    ],
  },
  {
    name: 'stackaimcp_get_project_corrections',
    description: `Re-validate a project draft and return paginated correction entries for params cleaned up during creation or editing.`,
    params: [
      {
        name: 'flow_id',
        type: 'string',
        required: true,
        description: `Project (flow) ID to re-validate.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Opaque pagination cursor from a prior response.`,
      },
      {
        name: 'page_size',
        type: 'string',
        required: false,
        description: `Maximum corrections per page (clamped to 200).`,
      },
    ],
  },
  {
    name: 'stackaimcp_get_run',
    description: `Fetch the per-node execution trace for a project run, filtered by severity and optionally expanded with inputs and outputs.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `Project (flow) ID the run belongs to.`,
      },
      { name: 'run_id', type: 'string', required: true, description: `Run ID to fetch.` },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Opaque pagination cursor from a previous response's
\`\`pagination.next_cursor\`\`.`,
      },
      {
        name: 'include_output',
        type: 'string',
        required: false,
        description: `When true, include every node-in-page's
inputs/outputs. Use \`\`node_ids\`\` for finer grain.`,
      },
      {
        name: 'node_ids',
        type: 'string',
        required: false,
        description: `Optional list of node ids whose \`\`inputs\`\` /
\`\`outputs\`\` should be populated. Up to 50 ids per call.
Ids not in the current page are surfaced in the summary.`,
      },
      {
        name: 'page_size',
        type: 'string',
        required: false,
        description: `Maximum nodes per page (clamped to 200).`,
      },
      {
        name: 'severity_filter',
        type: 'string',
        required: false,
        description: `Which nodes to return:
\`\`"failed_or_slow"\`\` (default), \`\`"failed"\`\`,
\`\`"slow"\`\`, or \`\`"all"\`\`.`,
      },
    ],
  },
  {
    name: 'stackaimcp_list_connections',
    description: `List the OAuth and API-key connections the authenticated user has configured in Stack AI.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Opaque pagination cursor from a previous response's
\`\`pagination.next_cursor\`\`.`,
      },
      {
        name: 'page_size',
        type: 'string',
        required: false,
        description: `Maximum connections per page (clamped to 200).`,
      },
      {
        name: 'provider_id',
        type: 'string',
        required: false,
        description: `Optional filter, e.g. \`\`"gmail"\`\`, \`\`"slack"\`\`.
Pass null for all.`,
      },
    ],
  },
  {
    name: 'stackaimcp_list_knowledge_bases',
    description: `List knowledge bases available to the authenticated user, with optional verbose metadata.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response.`,
      },
      {
        name: 'page_size',
        type: 'string',
        required: false,
        description: `Maximum results per page (clamped to 200).`,
      },
      {
        name: 'verbose',
        type: 'string',
        required: false,
        description: `When true, return the full KB metadata for each
row instead of the compact projection.`,
      },
    ],
  },
  {
    name: 'stackaimcp_list_projects',
    description: `Fetch a paginated list of projects accessible to the authenticated account.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Opaque pagination cursor from a previous response.
Pass \`\`null\`\` to fetch the first page.`,
      },
      {
        name: 'owned_only',
        type: 'string',
        required: false,
        description: `When true, only return projects the user owns.`,
      },
      {
        name: 'page_size',
        type: 'string',
        required: false,
        description: `Maximum number of projects per page. Defaults to
50, clamped to [1, 200].`,
      },
    ],
  },
  {
    name: 'stackaimcp_list_providers_actions',
    description: `List available Stack AI integration providers and their actions, with optional full schemas for specific action IDs.`,
    params: [
      {
        name: 'actions',
        type: 'string',
        required: false,
        description: `optional list of action / trigger ids to drill into;
only valid with a single \`\`provider_id\`\` string.`,
      },
      {
        name: 'provider_id',
        type: 'string',
        required: false,
        description: `\`\`null\`\`, a single id (e.g. \`\`"gmail"\`\`), or a list
(e.g. \`\`["gmail", "slack"]\`\`).`,
      },
    ],
  },
  {
    name: 'stackaimcp_list_triggers',
    description: `List the cron, polling, and webhook triggers configured on a specific project.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `Project (flow) ID to inspect.`,
      },
      {
        name: 'verbose',
        type: 'string',
        required: false,
        description: `When true, return the full trigger metadata
instead of the compact projection.`,
      },
    ],
  },
  {
    name: 'stackaimcp_run_project',
    description: `Execute a published Stack AI project by supplying a key-value inputs map that matches the flow's declared input schema.`,
    params: [
      { name: 'flow_id', type: 'string', required: true, description: `No description.` },
      { name: 'inputs', type: 'object', required: true, description: `No description.` },
      { name: 'verbose', type: 'string', required: false, description: `No description.` },
      { name: 'version', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'stackaimcp_search_kb',
    description: `Search a Stack AI knowledge base and return the top matching chunks ranked by relevance.`,
    params: [
      {
        name: 'kb_id',
        type: 'string',
        required: true,
        description: `Knowledge base ID to search.`,
      },
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Natural-language search query (must be non-empty).`,
      },
      {
        name: 'expand_chunk_ids',
        type: 'string',
        required: false,
        description: `Optional list of \`\`chunk_id\`\` values whose
full \`\`text\`\` should be populated in the response. Other
chunks still come back with preview only. Up to 20 ids
per call; ids that don't match any chunk in the current
result set are surfaced in the summary.`,
      },
      {
        name: 'query_strategy',
        type: 'string',
        required: false,
        description: `Retrieval mode: \`\`"semantic"\`\` (embedding
similarity, default), \`\`"keyword"\`\` (BM25), or \`\`"hybrid"\`\`
(rerank of both).`,
      },
      {
        name: 'top_k',
        type: 'string',
        required: false,
        description: `Maximum chunks to return. Defaults to 5, clamped to
[1, 20] (the upstream cap).`,
      },
    ],
  },
  {
    name: 'stackaimcp_switch_org',
    description: `Set the active organization for the current session, routing all subsequent org-scoped tools to that org.`,
    params: [
      {
        name: 'org_id',
        type: 'string',
        required: true,
        description: `The Stack AI organization id to activate. Find valid
ids by calling \`\`whoami\`\`.`,
      },
    ],
  },
  {
    name: 'stackaimcp_validate_workflow',
    description: `Run pre-flight validation checks on a project draft and return paginated errors and warnings with stable codes and fix hints.`,
    params: [
      {
        name: 'flow_id',
        type: 'string',
        required: true,
        description: `Project (flow) ID to validate. The validator
always reads the draft, not the published version.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Opaque pagination cursor from a prior response.`,
      },
      {
        name: 'page_size',
        type: 'string',
        required: false,
        description: `Maximum findings per page (clamped to 200).`,
      },
      {
        name: 'severity_filter',
        type: 'string',
        required: false,
        description: `\`\`"all"\`\` (default) returns errors AND
warnings; \`\`"errors_only"\`\` drops warnings so an LLM
checking "can I run this?" doesn't have to wade
through nice-to-haves.`,
      },
    ],
  },
  {
    name: 'stackaimcp_whoami',
    description: `Return the authenticated user's profile, active organization, plan, and paginated list of all organizations.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Opaque pagination cursor from a previous response's
\`\`pagination.next_cursor\`\`. Pass null to start.`,
      },
      {
        name: 'page_size',
        type: 'string',
        required: false,
        description: `Maximum orgs per page. Defaults to 50, clamped
to [1, 200].`,
      },
    ],
  },
]
