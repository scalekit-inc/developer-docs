import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'synapsemcp_check_synapse_id',
    description: `Use this when the user has a string that looks like a Synapse ID (e.g. syn123456) and wants to check whether it exists in Synapse — verifies validity by querying the Synapse backend.`,
    params: [
      {
        name: 'syn_id',
        type: 'string',
        required: true,
        description: `The Synapse ID to validate (for example syn123456).`,
      },
    ],
  },
  {
    name: 'synapsemcp_check_user_certified',
    description: `Use this when the user wants to know whether a Synapse user has passed the certification quiz required for uploading human data. User ID example: '1234567'.`,
    params: [
      {
        name: 'user_id',
        type: 'integer',
        required: true,
        description: `The numeric Synapse user ID.`,
      },
    ],
  },
  {
    name: 'synapsemcp_get_curation_task',
    description: `Use this when the user wants the details of a single Synapse curation task by its numeric task ID. Task ID example: 42.`,
    params: [
      {
        name: 'task_id',
        type: 'integer',
        required: true,
        description: `The numeric Synapse curation task ID.`,
      },
    ],
  },
  {
    name: 'synapsemcp_get_curation_task_resources',
    description: `Use this when the user wants the Synapse resources (RecordSets, Folders, EntityViews) linked to a curation task — the data the curator will act on. Task ID example: 42.`,
    params: [
      {
        name: 'task_id',
        type: 'integer',
        required: true,
        description: `The numeric Synapse curation task ID.`,
      },
    ],
  },
  {
    name: 'synapsemcp_get_entity',
    description: `Return Synapse entity metadata by ID (projects, folders, files, tables, etc.). Only retrieves metadata information - does not download file content.`,
    params: [
      {
        name: 'entity_id',
        type: 'string',
        required: true,
        description: `The Synapse entity ID to fetch (for example syn123456).`,
      },
    ],
  },
  {
    name: 'synapsemcp_get_entity_acl',
    description: `Use this when the user wants the sharing settings or access control list (ACL) of one single Synapse entity — who can access it and with what permissions. Entity ID example: syn123456. Optionally filter to a single principal ID (user or team), e.g. '3379097'. Use list_entity_acl to audit ACLs across many entities under a container.`,
    params: [
      {
        name: 'entity_id',
        type: 'string',
        required: true,
        description: `The Synapse entity ID (for example syn123456).`,
      },
      {
        name: 'principal_id',
        type: 'integer',
        required: false,
        description: `Optional user or team ID to filter to a single principal.`,
      },
    ],
  },
  {
    name: 'synapsemcp_get_entity_annotations',
    description: `Return custom annotation key/value pairs for a Synapse entity.`,
    params: [
      {
        name: 'entity_id',
        type: 'string',
        required: true,
        description: `The Synapse entity ID whose annotations to fetch (for example syn123456).`,
      },
    ],
  },
  {
    name: 'synapsemcp_get_entity_children',
    description: `List children for Synapse container entities (projects or folders).`,
    params: [
      {
        name: 'entity_id',
        type: 'string',
        required: true,
        description: `The Synapse container entity ID (project or folder) whose children to list (for example syn123456).`,
      },
    ],
  },
  {
    name: 'synapsemcp_get_entity_permissions',
    description: `Use this when the user wants to know what the currently authenticated user is allowed to do on a Synapse entity (READ, UPDATE, DELETE, etc.). Entity ID example: syn123456. Returns the caller's own permissions only — use get_entity_acl to see everyone's permissions.`,
    params: [
      {
        name: 'entity_id',
        type: 'string',
        required: true,
        description: `The Synapse entity ID (for example syn123456).`,
      },
    ],
  },
  {
    name: 'synapsemcp_get_entity_provenance',
    description: `Return provenance (activity) metadata for a Synapse entity, including inputs and code executed.`,
    params: [
      {
        name: 'entity_id',
        type: 'string',
        required: true,
        description: `The Synapse entity ID whose provenance to fetch (for example syn123456).`,
      },
      {
        name: 'version',
        type: 'integer',
        required: false,
        description: `Optional entity version number to scope the provenance to a specific version. Omit for the latest version.`,
      },
    ],
  },
  {
    name: 'synapsemcp_get_entity_schema',
    description: `Use this when the user wants to know which JSON schema (data model / validation contract) is bound to a Synapse entity. Entity ID example: syn123456. Returns the schema binding metadata, not the schema body — use get_json_schema_body for that.`,
    params: [
      {
        name: 'entity_id',
        type: 'string',
        required: true,
        description: `The Synapse entity ID (for example syn123456).`,
      },
    ],
  },
  {
    name: 'synapsemcp_get_entity_schema_derived_keys',
    description: `Use this when the user wants the annotation keys a bound JSON schema requires on a Synapse entity. Useful for knowing what metadata fields a schema is enforcing. Entity ID example: syn123456.`,
    params: [
      {
        name: 'entity_id',
        type: 'string',
        required: true,
        description: `The Synapse entity ID (for example syn123456).`,
      },
    ],
  },
  {
    name: 'synapsemcp_get_entity_schema_invalid_validations',
    description: `Use this when the user wants the list of Synapse entities inside a Folder or Project that currently fail their bound JSON schema — the 'what's broken' view. Container entity ID example: syn123456.`,
    params: [
      {
        name: 'entity_id',
        type: 'string',
        required: true,
        description: `The Synapse entity ID (for example syn123456).`,
      },
    ],
  },
  {
    name: 'synapsemcp_get_entity_schema_validation_statistics',
    description: `Use this when the user wants an aggregate validation summary for a Synapse entity container (Folder or Project) with a bound JSON schema — how many child entities pass or fail validation. Entity ID example: syn123456.`,
    params: [
      {
        name: 'entity_id',
        type: 'string',
        required: true,
        description: `The Synapse entity ID (for example syn123456).`,
      },
    ],
  },
  {
    name: 'synapsemcp_get_evaluation',
    description: `Use this when the user wants a Synapse Evaluation queue — the challenge/competition queue that participants submit models or results to. Synonymous with 'challenge queue', 'leaderboard queue'. Evaluation ID example: '9600001'. Evaluation name example: 'DREAM Patient Data'.`,
    params: [
      {
        name: 'evaluation_id',
        type: 'string',
        required: false,
        description: `The Synapse Evaluation (challenge queue) ID.`,
      },
      {
        name: 'evaluation_name',
        type: 'string',
        required: false,
        description: `The exact name of the Synapse Evaluation queue.`,
      },
    ],
  },
  {
    name: 'synapsemcp_get_evaluation_acl',
    description: `Use this when the user wants the resource-level access control list of a Synapse Evaluation queue (challenge queue) — which principals (users and teams) hold which access types on the queue. Use for queue-administration questions like "who can score submissions". Distinct from get_evaluation_permissions, which reports the caller's own effective permissions. Evaluation ID example: '9600001'.`,
    params: [
      {
        name: 'evaluation_id',
        type: 'string',
        required: true,
        description: `The Synapse Evaluation (challenge queue) ID.`,
      },
    ],
  },
  {
    name: 'synapsemcp_get_evaluation_permissions',
    description: `Use this when the user wants to know what the authenticated caller is allowed to do on a Synapse Evaluation queue (challenge queue) — submit, administer, etc. Returns the caller's own effective permission flags. Distinct from get_evaluation_acl, which lists the queue's full ACL across every principal. Evaluation ID example: '9600001'.`,
    params: [
      {
        name: 'evaluation_id',
        type: 'string',
        required: true,
        description: `The Synapse Evaluation (challenge queue) ID.`,
      },
    ],
  },
  {
    name: 'synapsemcp_get_json_schema',
    description: `Use this when the user wants metadata about a specific Synapse JSON Schema (data model, validation contract). Organization name example: 'org.sagebionetworks'. Schema name example: 'myDataset-1.0.0'.`,
    params: [
      {
        name: 'organization_name',
        type: 'string',
        required: true,
        description: `The Synapse JSON Schema organization name.`,
      },
      {
        name: 'schema_name',
        type: 'string',
        required: true,
        description: `The Synapse JSON Schema name.`,
      },
    ],
  },
  {
    name: 'synapsemcp_get_json_schema_body',
    description: `Use this when the user wants the raw JSON document of a Synapse JSON Schema — the actual data model / validation rules. Organization name example: 'org.sagebionetworks'. Schema name example: 'myDataset-1.0.0'.`,
    params: [
      {
        name: 'organization_name',
        type: 'string',
        required: true,
        description: `The Synapse JSON Schema organization name.`,
      },
      {
        name: 'schema_name',
        type: 'string',
        required: true,
        description: `The Synapse JSON Schema name.`,
      },
      {
        name: 'version',
        type: 'string',
        required: false,
        description: `Optional version number. Omit for the latest.`,
      },
    ],
  },
  {
    name: 'synapsemcp_get_link',
    description: `Use this when the user has a Synapse Link entity (a shortcut that points at another entity) and wants either the Link's own metadata or the target it resolves to. Link entity ID example: syn123456. Set follow_link=False to inspect the Link itself instead of its target.`,
    params: [
      {
        name: 'entity_id',
        type: 'string',
        required: true,
        description: `The Synapse entity ID (for example syn123456).`,
      },
      {
        name: 'follow_link',
        type: 'boolean',
        required: false,
        description: `Whether to resolve the Link to its target entity (true) or return the Link's own metadata (false).`,
      },
    ],
  },
  {
    name: 'synapsemcp_get_schema_organization',
    description: `Use this when the user wants a Synapse JSON Schema Organization (namespace that owns a set of JSON schemas / data models) by name or numeric ID. Organization name example: 'org.sagebionetworks'. Organization ID example: 42.`,
    params: [
      {
        name: 'organization_name',
        type: 'string',
        required: true,
        description: `The Synapse JSON Schema organization name.`,
      },
    ],
  },
  {
    name: 'synapsemcp_get_schema_organization_acl',
    description: `Use this when the user wants the ACL of a Synapse JSON Schema Organization — who may publish schemas under that namespace. Organization name example: 'org.sagebionetworks'.`,
    params: [
      {
        name: 'organization_name',
        type: 'string',
        required: true,
        description: `The Synapse JSON Schema organization name.`,
      },
    ],
  },
  {
    name: 'synapsemcp_get_submission',
    description: `Use this when the user wants a specific Synapse submission — a challenge entry a participant sent to an Evaluation queue. Submission ID example: '9722233'.`,
    params: [
      {
        name: 'submission_id',
        type: 'string',
        required: true,
        description: `The Synapse submission ID.`,
      },
    ],
  },
  {
    name: 'synapsemcp_get_submission_count',
    description: `Use this when the user wants only the count of Synapse submissions (challenge entries) in an Evaluation queue, not the submissions themselves. Evaluation ID example: '9600001'.`,
    params: [
      {
        name: 'evaluation_id',
        type: 'string',
        required: true,
        description: `The Synapse Evaluation (challenge queue) ID.`,
      },
    ],
  },
  {
    name: 'synapsemcp_get_submission_status',
    description: `Use this when the user wants the scoring status of a single Synapse submission (challenge entry) — e.g. RECEIVED, EVALUATION_IN_PROGRESS, SCORED. Submission ID example: '9722233'.`,
    params: [
      {
        name: 'submission_id',
        type: 'string',
        required: true,
        description: `The Synapse submission ID.`,
      },
    ],
  },
  {
    name: 'synapsemcp_get_team',
    description: `Use this when the user wants a Synapse team by its numeric ID or name. A Synapse team is a group of users (collaborators, members) that can be granted access to entities collectively. Team ID example: '3379097'. Team name example: 'NF-OSI Curators'.`,
    params: [
      {
        name: 'team_id',
        type: 'integer',
        required: false,
        description: `The numeric Synapse team ID.`,
      },
      {
        name: 'team_name',
        type: 'string',
        required: false,
        description: `The exact name of the Synapse team.`,
      },
    ],
  },
  {
    name: 'synapsemcp_get_team_members',
    description: `Use this when the user wants the roster of a Synapse team — who is on it. Pages through the team membership API; pass an increased \`\`offset\`\` to fetch the next batch. Team ID example: '3379097'.`,
    params: [
      {
        name: 'team_id',
        type: 'integer',
        required: true,
        description: `The numeric Synapse team ID.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of results to skip, for pagination.`,
      },
    ],
  },
  {
    name: 'synapsemcp_get_team_membership_status',
    description: `Use this when the user wants to know whether a specific Synapse user is already a member of, has applied to, or has been invited to a Synapse team. Team ID example: '3379097'. User ID example: '1234567'.`,
    params: [
      {
        name: 'team_id',
        type: 'integer',
        required: true,
        description: `The numeric Synapse team ID.`,
      },
      {
        name: 'user_id',
        type: 'integer',
        required: true,
        description: `The numeric Synapse user ID.`,
      },
    ],
  },
  {
    name: 'synapsemcp_get_team_open_invitations',
    description: `Use this when the user wants the pending (not yet accepted or rejected) invitations for a Synapse team. Pages through the open-invitation API; pass an increased \`\`offset\`\` to fetch the next batch. Team ID example: '3379097'.`,
    params: [
      {
        name: 'team_id',
        type: 'integer',
        required: true,
        description: `The numeric Synapse team ID.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of results to skip, for pagination.`,
      },
    ],
  },
  {
    name: 'synapsemcp_get_user_profile',
    description: `Use this when the user wants a Synapse user profile by numeric user ID or username, or the authenticated caller's own profile when called with no arguments. User ID example: '1234567'. Username example: 'janedoe'.`,
    params: [
      {
        name: 'user_id',
        type: 'integer',
        required: false,
        description: `The numeric Synapse user ID.`,
      },
      { name: 'username', type: 'string', required: false, description: `The Synapse username.` },
    ],
  },
  {
    name: 'synapsemcp_get_wiki_headers',
    description: `Use this when the user wants the table of contents of a Synapse wiki — the list of pages and sub-pages attached to an entity. Owner entity ID example: syn123456. If the result hits the limit, call again with a higher offset to paginate.`,
    params: [
      {
        name: 'owner_id',
        type: 'string',
        required: true,
        description: `The Synapse entity ID that owns the wiki (for example syn123456).`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of results to skip, for pagination.`,
      },
    ],
  },
  {
    name: 'synapsemcp_get_wiki_history',
    description: `Use this when the user wants the revision history (edit log) of a specific Synapse wiki page — who changed it and when. Owner entity ID example: syn123456. Wiki ID example: '123456' (numeric wiki page id). Paginate via offset if needed.`,
    params: [
      {
        name: 'owner_id',
        type: 'string',
        required: true,
        description: `The Synapse entity ID that owns the wiki (for example syn123456).`,
      },
      {
        name: 'wiki_id',
        type: 'string',
        required: true,
        description: `The numeric wiki page ID. Omit for the root wiki page.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of results to skip, for pagination.`,
      },
    ],
  },
  {
    name: 'synapsemcp_get_wiki_order_hint',
    description: `Use this when the user wants to know the display order of sub-pages in a Synapse wiki — how the wiki navigation is sorted. Owner entity ID example: syn123456.`,
    params: [
      {
        name: 'owner_id',
        type: 'string',
        required: true,
        description: `The Synapse entity ID that owns the wiki (for example syn123456).`,
      },
    ],
  },
  {
    name: 'synapsemcp_get_wiki_page',
    description: `Use this when the user wants to read a Synapse wiki page — its markdown content and metadata — attached to a project, folder, or file. A Synapse wiki is the markdown documentation surfaced on an entity. Owner entity ID example: syn123456. Omit wiki_id to get the root wiki page.`,
    params: [
      {
        name: 'owner_id',
        type: 'string',
        required: true,
        description: `The Synapse entity ID that owns the wiki (for example syn123456).`,
      },
      {
        name: 'wiki_id',
        type: 'string',
        required: false,
        description: `The numeric wiki page ID. Omit for the root wiki page.`,
      },
    ],
  },
  {
    name: 'synapsemcp_list_curation_tasks',
    description: `Use this when the user wants every Synapse curation task in a project — the queue of data-curation work items attached to that project. Project entity ID example: syn123456.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The Synapse project entity ID.`,
      },
    ],
  },
  {
    name: 'synapsemcp_list_entity_acl',
    description: `Use this when the user wants every ACL on a Synapse entity and, with recursive=True, on all its descendants — useful for auditing sharing recursively across a project subtree. Set include_container_content=True to include files and folders inside containers; recursive=True requires include_container_content=True and walks into child containers as well. Entity ID example: syn123456.`,
    params: [
      {
        name: 'entity_id',
        type: 'string',
        required: true,
        description: `The Synapse entity ID (for example syn123456).`,
      },
      {
        name: 'include_container_content',
        type: 'boolean',
        required: false,
        description: `Whether to include files and folders inside containers.`,
      },
      {
        name: 'recursive',
        type: 'boolean',
        required: false,
        description: `Whether to include ACLs of all descendant entities as well.`,
      },
      {
        name: 'target_entity_types',
        type: 'array',
        required: false,
        description: `Filter to only these entity types.`,
      },
    ],
  },
  {
    name: 'synapsemcp_list_evaluation_submission_bundles',
    description: `Use this when the user wants Synapse submission plus scoring status together (as bundles) for an Evaluation queue — one call returns both sides. Pass an increased \`\`offset\`\` to fetch the next batch. Evaluation ID example: '9600001'.`,
    params: [
      {
        name: 'evaluation_id',
        type: 'string',
        required: true,
        description: `The Synapse Evaluation (challenge queue) ID.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of results to skip, for pagination.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter results to this status value.`,
      },
    ],
  },
  {
    name: 'synapsemcp_list_evaluation_submissions',
    description: `Use this when the user wants ALL submissions (every challenge entry from every participant) sent to a Synapse Evaluation queue — optionally filtered by status (SCORED, INVALID, etc.). NOT just the caller's own — use list_my_submissions for that. Pages through the queue's submission list; pass an increased \`\`offset\`\` to fetch the next batch. Evaluation ID example: '9600001'. Returns raw Submission objects; use list_submission_statuses for status-only data and list_evaluation_submission_bundles for bundled submission+status pairs.`,
    params: [
      {
        name: 'evaluation_id',
        type: 'string',
        required: true,
        description: `The Synapse Evaluation (challenge queue) ID.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of results to skip, for pagination.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter results to this status value.`,
      },
    ],
  },
  {
    name: 'synapsemcp_list_evaluations',
    description: `Use this when the user wants to enumerate Synapse Evaluation queues (challenges, competitions, leaderboards) — optionally filtered by project, access type, or active-only. Project ID example: syn123456. Paginate via offset.`,
    params: [
      {
        name: 'access_type',
        type: 'string',
        required: false,
        description: `Filter to evaluations the caller has this access type on.`,
      },
      {
        name: 'active_only',
        type: 'boolean',
        required: false,
        description: `Only return currently active evaluations.`,
      },
      {
        name: 'available_only',
        type: 'boolean',
        required: false,
        description: `Only return evaluations the caller can currently submit to.`,
      },
      {
        name: 'evaluation_ids',
        type: 'array',
        required: false,
        description: `Filter to this specific list of Evaluation IDs.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of results to skip, for pagination.`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: false,
        description: `The Synapse project entity ID.`,
      },
    ],
  },
  {
    name: 'synapsemcp_list_form_data',
    description: `Use this when the user wants the form submissions for a Synapse FormGroup — a collection of structured-data forms submitted by users. Optionally filter by state (valid filter_by_state values: 'waiting_for_submission', 'submitted_waiting_for_review', 'accepted', 'rejected'). When as_reviewer=True the caller lists submissions they can review ('waiting_for_submission' is not allowed in this mode); when False (default) lists submissions the caller owns. Token-paginated: response includes \`\`next_page_token\`\`; pass it back to fetch the next page (null on final page). Form group ID example: '42'.`,
    params: [
      {
        name: 'group_id',
        type: 'string',
        required: true,
        description: `The Synapse FormGroup ID.`,
      },
      {
        name: 'as_reviewer',
        type: 'boolean',
        required: false,
        description: `List submissions the caller can review instead of submissions they own.`,
      },
      {
        name: 'filter_by_state',
        type: 'array',
        required: false,
        description: `Filter to these submission states (e.g. accepted, rejected).`,
      },
      {
        name: 'next_page_token',
        type: 'string',
        required: false,
        description: `Pagination token returned by a previous call. Omit for the first page.`,
      },
    ],
  },
  {
    name: 'synapsemcp_list_json_schema_versions',
    description: `Use this when the user wants every version published for a Synapse JSON Schema. Token-paginated like list_json_schemas: pass the returned \`\`next_page_token\`\` back to fetch the next page. Organization name example: 'org.sagebionetworks'. Schema name example: 'myDataset-1.0.0'.`,
    params: [
      {
        name: 'organization_name',
        type: 'string',
        required: true,
        description: `The Synapse JSON Schema organization name.`,
      },
      {
        name: 'schema_name',
        type: 'string',
        required: true,
        description: `The Synapse JSON Schema name.`,
      },
      {
        name: 'next_page_token',
        type: 'string',
        required: false,
        description: `Pagination token returned by a previous call. Omit for the first page.`,
      },
    ],
  },
  {
    name: 'synapsemcp_list_json_schemas',
    description: `Use this when the user wants every Synapse JSON Schema (data model, validation contract) owned by an organization. Token-paginated (no limit/offset): the response includes \`\`next_page_token\`\`; pass it back as the next call's \`\`next_page_token\`\` argument to fetch the following page. \`\`next_page_token\`\` is null on the final page. Organization name example: 'org.sagebionetworks'.`,
    params: [
      {
        name: 'organization_name',
        type: 'string',
        required: true,
        description: `The Synapse JSON Schema organization name.`,
      },
      {
        name: 'next_page_token',
        type: 'string',
        required: false,
        description: `Pagination token returned by a previous call. Omit for the first page.`,
      },
    ],
  },
  {
    name: 'synapsemcp_list_my_submission_bundles',
    description: `Use this when the user wants their own Synapse submission+status bundles for an Evaluation queue — one call returns both submission and scoring status for every entry they made. Pass an increased \`\`offset\`\` to fetch the next batch. Evaluation ID example: '9600001'.`,
    params: [
      {
        name: 'evaluation_id',
        type: 'string',
        required: true,
        description: `The Synapse Evaluation (challenge queue) ID.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of results to skip, for pagination.`,
      },
    ],
  },
  {
    name: 'synapsemcp_list_my_submissions',
    description: `Use this when the user wants their own submissions (challenge entries) to a Synapse Evaluation queue. Pass an increased \`\`offset\`\` to page beyond the first batch. Evaluation ID example: '9600001'.`,
    params: [
      {
        name: 'evaluation_id',
        type: 'string',
        required: true,
        description: `The Synapse Evaluation (challenge queue) ID.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of results to skip, for pagination.`,
      },
    ],
  },
  {
    name: 'synapsemcp_list_submission_statuses',
    description: `Use this when the user wants the scoring statuses of every Synapse submission in an Evaluation queue — optionally filtered (SCORED, INVALID, etc.). Evaluation ID example: '9600001'. Returns status records only; use list_evaluation_submissions for the submissions themselves.`,
    params: [
      {
        name: 'evaluation_id',
        type: 'string',
        required: true,
        description: `The Synapse Evaluation (challenge queue) ID.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of results to skip, for pagination.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter results to this status value.`,
      },
    ],
  },
  {
    name: 'synapsemcp_search_entities_by_md5',
    description: `Use this when the user has an MD5 hash of a file and wants the Synapse entities (file entities) whose attached file has that exact MD5 — useful for deduplication and 'is this already in Synapse' checks. MD5 example: '9e107d9d372bb6826bd81d3542a419d6'.`,
    params: [
      {
        name: 'md5',
        type: 'string',
        required: true,
        description: `The MD5 hash of the file content to search for.`,
      },
    ],
  },
  {
    name: 'synapsemcp_search_entity_by_name',
    description: `Use this when the user has a file name or Synapse entity name (and optionally its parent folder or project) but does not know the Synapse ID — resolves an exact name to its Synapse ID. The name match is case-sensitive (e.g. 'Patient Record Set' will not match 'Patient record set'); use search_synapse for fuzzy or case-insensitive lookup. Parent entity ID example: syn123456. Name example: 'sample.csv'.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The exact entity name to resolve to a Synapse ID.`,
      },
      {
        name: 'parent_id',
        type: 'string',
        required: false,
        description: `Restrict to entities under this parent container ID.`,
      },
    ],
  },
  {
    name: 'synapsemcp_search_synapse',
    description: `Search Synapse entities using keyword queries with optional name/type/parent filters. Results are served by Synapse as data custodian. Attribution and licensing are determined by the original contributors; check the specific entity's annotations or Wiki for details.`,
    params: [
      {
        name: 'entity_type',
        type: 'string',
        required: false,
        description: `Filter results to a single entity type (for example file, folder, project, table).`,
      },
      {
        name: 'entity_types',
        type: 'array',
        required: false,
        description: `Filter results to multiple entity types. Pass as a JSON array of strings via the SDK, not as a string.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Filter results to entities matching this exact name.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of results to skip, for pagination.`,
      },
      {
        name: 'parent_id',
        type: 'string',
        required: false,
        description: `Restrict the search to entities under this parent container ID (for example syn123456).`,
      },
      {
        name: 'query_term',
        type: 'string',
        required: false,
        description: `Free-text keyword query to search Synapse entities.`,
      },
    ],
  },
]
