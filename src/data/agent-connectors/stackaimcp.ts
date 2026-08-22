import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'stackaimcp_audit_logs_list',
    description: `List the active Stack AI organization's audit trail (who did what, when), with optional filters and pagination.`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: false,
        description: `Filter by action verb (e.g. "export", "delete", "update", "run").`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Opaque pagination cursor from a previous response's
pagination.next_cursor.`,
      },
      {
        name: 'date_from',
        type: 'string',
        required: false,
        description: `ISO-8601 lower bound (inclusive) on created_at.`,
      },
      {
        name: 'date_to',
        type: 'string',
        required: false,
        description: `ISO-8601 upper bound (inclusive) on created_at.`,
      },
      {
        name: 'decision',
        type: 'string',
        required: false,
        description: `Filter by decision ("allow" / "deny").`,
      },
      {
        name: 'page_size',
        type: 'string',
        required: false,
        description: `Maximum entries per page (clamped to 200).`,
      },
      {
        name: 'permission_key',
        type: 'string',
        required: false,
        description: `Filter by permission key (e.g. "org.members.remove").`,
      },
      {
        name: 'resource_type',
        type: 'string',
        required: false,
        description: `Filter by resource type (e.g. "projects").`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Free-text search across the entry.`,
      },
      {
        name: 'user_id',
        type: 'string',
        required: false,
        description: `Filter to a single acting member's id.`,
      },
    ],
  },
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
      { name: 'project_id', type: 'string', required: true, description: `No description.` },
      { name: 'description', type: 'string', required: false, description: `No description.` },
      { name: 'direct_patch', type: 'string', required: false, description: `No description.` },
      {
        name: 'dry_run',
        type: 'string',
        required: false,
        description: `Pass true together with \`\`direct_patch\`\` to validate the
patch without saving. Shows projected node/edge counts and
delta; \`\`published\`\` is always false for a dry run.`,
      },
      { name: 'publish', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'stackaimcp_files_create_upload_url',
    description: `Request a presigned PUT URL from Stack AI so the client can upload a large file out of band.`,
    params: [
      {
        name: 'byte_length',
        type: 'integer',
        required: true,
        description: `Exact byte count of the file (1..104857600).`,
      },
      {
        name: 'content_hash',
        type: 'string',
        required: true,
        description: `Base64-encoded SHA-256 of the file's bytes
(44 characters, ending in "=").`,
      },
      {
        name: 'filename',
        type: 'string',
        required: true,
        description: `Display name (e.g. invoice.pdf).`,
      },
      {
        name: 'mime_type',
        type: 'string',
        required: false,
        description: `Optional Content-Type hint. Defaults to
Stack AI's inference from the filename when omitted.`,
      },
      {
        name: 'purpose',
        type: 'string',
        required: false,
        description: `Storage bucket. Defaults to "user-documents".`,
      },
    ],
  },
  {
    name: 'stackaimcp_files_finalize_upload',
    description: `Finalize a presigned Stack AI file upload and return a projects_run-ready signed URL.`,
    params: [
      {
        name: 'file_id',
        type: 'string',
        required: true,
        description: `The file_id returned by files_create_upload_url.`,
      },
    ],
  },
  {
    name: 'stackaimcp_files_upload',
    description: `Upload a file inline as base64 to Stack AI and return a signed URL usable in project inputs.`,
    params: [
      {
        name: 'content_base64',
        type: 'string',
        required: true,
        description: `Standard-alphabet base64 of the bytes.`,
      },
      {
        name: 'filename',
        type: 'string',
        required: true,
        description: `Display name (e.g. invoice.pdf). Used for
Content-Disposition and the storage key.`,
      },
      {
        name: 'mime_type',
        type: 'string',
        required: false,
        description: `Optional Content-Type hint. Defaults to
application/octet-stream.`,
      },
      {
        name: 'purpose',
        type: 'string',
        required: false,
        description: `Storage bucket. Defaults to "user-documents",
which is what projects_run doc-* inputs expect.`,
      },
    ],
  },
  {
    name: 'stackaimcp_get_project',
    description: `Retrieve a project's node and edge graph as a paginated, self-contained subgraph with connectivity preserved across pages.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `Project ID (from \`\`projects_list\`\`).`,
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
        name: 'page_size',
        type: 'string',
        required: false,
        description: `Maximum nodes per page. Defaults to 50, clamped
to [1, 200].`,
      },
      {
        name: 'verbose',
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
        name: 'version',
        type: 'string',
        required: false,
        description: `\`\`"published"\`\` (default — falls back to draft if
none) or \`\`"draft"\`\` to read the draft directly.`,
      },
    ],
  },
  {
    name: 'stackaimcp_get_project_corrections',
    description: `Re-validate a project draft and return paginated correction entries for params cleaned up during creation or editing.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `Project ID to re-validate.`,
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
        name: 'expand',
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
      {
        name: 'verbose',
        type: 'string',
        required: false,
        description: `When true, include every node-in-page's
inputs/outputs. Use \`\`expand\`\` for finer grain.`,
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
        name: 'expand',
        type: 'string',
        required: false,
        description: `optional list of action / trigger ids to drill into;
only valid with a single \`\`provider_id\`\` string.`,
      },
      {
        name: 'include_deprecated',
        type: 'string',
        required: false,
        description: `When true, surface deprecated providers /
actions / triggers instead of filtering them. Off by default.`,
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
    name: 'stackaimcp_projects_edit_ui',
    description: `Patch a Stack AI project's UI options (theme, welcome message, allowed origins, etc.) without modifying its flow graph.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `Project id whose UI options to update.`,
      },
      {
        name: 'updates',
        type: 'object',
        required: true,
        description: `Object of UI option fields to merge. At least one
key required. Unknown keys raise an error with the list
of bad keys.`,
      },
      {
        name: 'publish',
        type: 'string',
        required: false,
        description: `Publish the new draft on success. Defaults to false.`,
      },
    ],
  },
  {
    name: 'stackaimcp_projects_import',
    description: `Create a new draft Stack AI project from an exported workflow JSON.`,
    params: [
      {
        name: 'workflow_json',
        type: 'object',
        required: true,
        description: `Parsed export object. Must be JSON-safe.
Pass the parsed body, not a string blob.`,
      },
      {
        name: 'folder_id',
        type: 'string',
        required: false,
        description: `Optional folder where the new project should
land. Null lets Stack AI pick the default.`,
      },
      {
        name: 'project_name',
        type: 'string',
        required: false,
        description: `Optional name for the new project. When
omitted, the name embedded in the export is used.`,
      },
    ],
  },
  {
    name: 'stackaimcp_projects_validate_flow_json',
    description: `Run Stack AI's pre-flight validators against a raw flow JSON payload without saving it as a project.`,
    params: [
      {
        name: 'flow_json',
        type: 'object',
        required: true,
        description: `Object with nodes and edges arrays, in the shape
returned by projects_get.`,
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
        description: `"all" (default) or "errors_only".`,
      },
    ],
  },
  {
    name: 'stackaimcp_run_project',
    description: `Execute a published Stack AI project by supplying a key-value inputs map that matches the flow's declared input schema.`,
    params: [
      { name: 'inputs', type: 'object', required: true, description: `No description.` },
      { name: 'project_id', type: 'string', required: true, description: `No description.` },
      { name: 'verbose', type: 'string', required: false, description: `No description.` },
      { name: 'version', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'stackaimcp_runs_list',
    description: `List a Stack AI project's run history, paginated.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `Project id whose runs to list.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Opaque pagination cursor from a previous response.`,
      },
      {
        name: 'page_size',
        type: 'string',
        required: false,
        description: `Maximum rows per page. Defaults to 25, clamped
to [1, 200].`,
      },
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
        name: 'expand',
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
    name: 'stackaimcp_server_info',
    description: `Return the Stack AI MCP server's version, mode, and capability flags.`,
    params: [],
  },
  {
    name: 'stackaimcp_skills_create',
    description: `Create a new Stack AI skill (version 1) from text fields or a file bundle.`,
    params: [
      {
        name: 'actions',
        type: 'string',
        required: false,
        description: `Optional action refs the skill may invoke, each
provider_id.action_id. Pass null for none.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `A one-line description of when to use the skill
(text mode only).`,
      },
      {
        name: 'files',
        type: 'string',
        required: false,
        description: `Optional file bundle (file mode): a list of
\`\`{ path, content_base64 }\`\` objects with a root \`\`SKILL.md\`\`.`,
      },
      {
        name: 'instructions',
        type: 'string',
        required: false,
        description: `The SKILL.md body, markdown (text mode only).`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `The skill name, unique within the org (text mode
only).`,
      },
    ],
  },
  {
    name: 'stackaimcp_skills_get',
    description: `Fetch one Stack AI skill's full detail: instructions, frontmatter, actions, and file manifest.`,
    params: [
      {
        name: 'skill_id',
        type: 'string',
        required: true,
        description: `The skill id (from skills_list).`,
      },
    ],
  },
  {
    name: 'stackaimcp_skills_list',
    description: `List the Stack AI skills visible to the authenticated user, builtins first.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Opaque pagination cursor from a previous response's
pagination.next_cursor. Pass null to fetch the first page.`,
      },
      {
        name: 'page_size',
        type: 'string',
        required: false,
        description: `Maximum skills per page. Defaults to 25, clamped
to [1, 100].`,
      },
    ],
  },
  {
    name: 'stackaimcp_skills_rollback',
    description: `Restore a prior version of a Stack AI skill's content by publishing it as a new latest version.`,
    params: [
      {
        name: 'skill_id',
        type: 'string',
        required: true,
        description: `The skill id to roll back (from skills_list).`,
      },
      {
        name: 'version',
        type: 'integer',
        required: true,
        description: `The historical version whose content to restore
(1-based, from skills_versions_list). It must not
be the current latest version.`,
      },
    ],
  },
  {
    name: 'stackaimcp_skills_update',
    description: `Publish a new version of a Stack AI skill as a full replacement, from text fields or a file bundle.`,
    params: [
      {
        name: 'skill_id',
        type: 'string',
        required: true,
        description: `The skill id to update (from skills_list).`,
      },
      {
        name: 'actions',
        type: 'string',
        required: false,
        description: `The full replacement list of provider_id.action_id
refs. Pass null for none - this clears any existing refs,
so re-send the current list to keep them.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `The full replacement description (text mode
only).`,
      },
      {
        name: 'files',
        type: 'string',
        required: false,
        description: `Optional file bundle (file mode): a list of
\`\`{ path, content_base64 }\`\` objects with a root \`\`SKILL.md\`\`.`,
      },
      {
        name: 'instructions',
        type: 'string',
        required: false,
        description: `The full replacement SKILL.md body, markdown
(text mode only).`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `The skill name (text mode only) - re-send the current
one unless you rename it.`,
      },
    ],
  },
  {
    name: 'stackaimcp_skills_validate',
    description: `Validate a proposed Stack AI skill bundle offline and preview the normalization the write tools would apply.`,
    params: [
      {
        name: 'files',
        type: 'array',
        required: true,
        description: `The file bundle: a list of \`\`{ path, content_base64 }\`\`
objects. \`\`path\`\` is the relative POSIX path inside the bundle; a root
\`\`SKILL.md\`\` (exact case) is required.`,
      },
      {
        name: 'actions',
        type: 'string',
        required: false,
        description: `Optional provider_id.action_id refs to check (format only)
and merge into the normalization preview.`,
      },
    ],
  },
  {
    name: 'stackaimcp_skills_version_get',
    description: `Fetch one historical version of a Stack AI skill's full detail: instructions, frontmatter, actions, and file manifest.`,
    params: [
      {
        name: 'skill_id',
        type: 'string',
        required: true,
        description: `The skill id (from skills_list).`,
      },
      {
        name: 'version',
        type: 'integer',
        required: true,
        description: `The version number to fetch (1-based, from
skills_versions_list).`,
      },
    ],
  },
  {
    name: 'stackaimcp_skills_versions_list',
    description: `List a Stack AI skill's full version history, newest first.`,
    params: [
      {
        name: 'skill_id',
        type: 'string',
        required: true,
        description: `The skill id (from skills_list).`,
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
        name: 'project_id',
        type: 'string',
        required: true,
        description: `Project ID to validate. The validator
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
