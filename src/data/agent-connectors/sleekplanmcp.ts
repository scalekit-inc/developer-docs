import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'sleekplanmcp_create_changelog',
    description: `Create a new changelog entry.

To pick a valid \`type\`, read sleekplan://feedback-types (or call list_feedback_types) and filter to entries whose \`disable_changelog\` is falsy. To target a cohort, read sleekplan://segments (or call list_segments) first for the \`segment\` slug. Set \`draft=True\` to create without publishing; set \`scheduled=<unix timestamp>\` to publish automatically at a future time.`,
    params: [
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `Title of the changelog entry`,
      },
      {
        name: 'announcement',
        type: 'boolean',
        required: false,
        description: `Show as an in-app announcement when this entry publishes. Default False.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Body of the changelog entry (HTML or Markdown — sanitized server-side)`,
      },
      {
        name: 'draft',
        type: 'boolean',
        required: false,
        description: `Create as a draft instead of publishing immediately. Default False.`,
      },
      {
        name: 'notify',
        type: 'boolean',
        required: false,
        description: `Email-notify changelog subscribers when this entry publishes. Default False.`,
      },
      {
        name: 'scheduled',
        type: 'integer',
        required: false,
        description: `Unix timestamp (seconds) for when the entry should publish. 0 or omitted means publish now. Only meaningful when \`draft\` is False.`,
      },
      {
        name: 'segment',
        type: 'string',
        required: false,
        description: `Segment slug (NOT segment_id) to restrict the announcement to a user cohort. Read sleekplan://segments or call list_segments for valid slugs. Omit or empty to target all users.`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Category key (e.g. 'feature', 'improvement'). Read sleekplan://feedback-types or call list_feedback_types first and pick an entry whose \`disable_changelog\` is falsy — the \`key\` string on that entry is what goes here.`,
      },
    ],
  },
  {
    name: 'sleekplanmcp_create_comment',
    description: `Add a comment to a feedback post.

Use \`parent\` to post a reply in an existing thread. Use \`pinned=True\` to promote the
comment to the top — typically for moderator answers or resolution summaries.`,
    params: [
      {
        name: 'comment',
        type: 'string',
        required: true,
        description: `Comment text (Markdown supported)`,
      },
      {
        name: 'feedback_id',
        type: 'integer',
        required: true,
        description: `ID of the feedback post to comment on`,
      },
      {
        name: 'parent',
        type: 'integer',
        required: false,
        description: `Optional parent comment_id — set this to reply to an existing comment. Call \`list_comments\` first to find the parent's id. Omit for a top-level comment.`,
      },
      {
        name: 'pinned',
        type: 'boolean',
        required: false,
        description: `Pin the comment to the top of the thread. Default false.`,
      },
    ],
  },
  {
    name: 'sleekplanmcp_create_feedback',
    description: `Create a new feedback post.

Requires a feedback type — read sleekplan://feedback-types or call list_feedback_types first for available keys.
Optional status lets you set the initial state (call update_feedback afterwards if you
need to set owner, effort, or estimated fields — the backend ignores those on create).
meta_origin/meta_service tag where the post came from for later filtering.`,
    params: [
      { name: 'title', type: 'string', required: true, description: `Title of the feedback post` },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `Feedback type key (e.g. 'feature', 'bug'). Read sleekplan://feedback-types or call list_feedback_types first to see available keys — filter to entries whose \`disable_feedback\` is falsy.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional detailed description. Markdown is supported.`,
      },
      {
        name: 'meta_origin',
        type: 'string',
        required: false,
        description: `Optional meta.origin tag — use this to mark who/what created the post (e.g. "mcp", "intelligence", "zapier"). Paired with meta_service.`,
      },
      {
        name: 'meta_service',
        type: 'string',
        required: false,
        description: `Optional meta.service tag (e.g. "agent", "chat").`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Optional initial status key (from sleekplan://feedback-statuses or list_feedback_statuses). Omit to use the workspace default.`,
      },
    ],
  },
  {
    name: 'sleekplanmcp_create_survey',
    description: `Create a new survey. The \`survey\` array defines question order and content.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Internal name for the survey` },
      {
        name: 'survey',
        type: 'array',
        required: true,
        description: `Array of question dicts. EVERY question MUST include ALL of the following fields — the frontend edit screen crashes if any field is missing. The backend also normalizes missing fields defensively, but produce the full shape to be safe:

- \`type\` (required): 'text', 'multiple', 'single', 'free', or 'scale'
- \`text\` (required): the question text, or markdown for type='text' blocks
- \`options\` (required, ALWAYS an array): list of choice strings for 'multiple'/'single'; use \`[]\` for other types. Never omit.
- \`min\` (required, ALWAYS a number): scale minimum. Use \`0\` when type != 'scale'. Never omit.
- \`max\` (required, ALWAYS a number): scale maximum. Use \`10\` when type != 'scale'. Never omit.
- \`required\` (required, ALWAYS a bool): whether the answer is required. Default \`false\`. Never omit.
- \`showIf\` (required, ALWAYS an object): conditional display. Use \`{'questionIndex': '', 'condition': 'contains', 'value': ''}\` when the question has no condition. When conditional: \`{'questionIndex': <int>, 'condition': 'contains'|'is'|'greater'|'less', 'value': <str>}\`. Never omit.
- \`question_id\` (required ONLY when updating existing questions): the 'qu...'-prefixed ID returned by \`get_survey\`/\`create_survey\`. OMIT on create; on update you MUST preserve existing \`question_id\` values or response history is lost.

Do NOT include a top-level \`options\` field in the payload — the backend manages that registry internally.`,
      },
    ],
  },
  {
    name: 'sleekplanmcp_create_tag',
    description: `Create a new workspace-level tag.

Tags can then be attached to feedback posts with tag_feedback(tag_id, action='add').`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Tag name. Only letters, numbers, and spaces are allowed (^[A-Za-z0-9 ]+$). Check sleekplan://tags or call list_tags first to avoid creating a duplicate.`,
      },
    ],
  },
  {
    name: 'sleekplanmcp_delete_changelog',
    description: `Permanently delete a changelog entry.`,
    params: [
      {
        name: 'changelog_id',
        type: 'integer',
        required: true,
        description: `ID of the changelog entry to delete`,
      },
    ],
  },
  {
    name: 'sleekplanmcp_delete_comment',
    description: `Permanently delete a comment from a feedback post.`,
    params: [
      {
        name: 'comment_id',
        type: 'integer',
        required: true,
        description: `ID of the comment to delete`,
      },
      {
        name: 'feedback_id',
        type: 'integer',
        required: true,
        description: `ID of the feedback post`,
      },
    ],
  },
  {
    name: 'sleekplanmcp_delete_feedback',
    description: `Permanently delete a feedback post.`,
    params: [
      {
        name: 'feedback_id',
        type: 'integer',
        required: true,
        description: `ID of the feedback post to delete`,
      },
    ],
  },
  {
    name: 'sleekplanmcp_delete_tag',
    description: `Permanently delete a workspace-level tag. Removes it from every feedback post it was attached to.`,
    params: [
      {
        name: 'tag_id',
        type: 'string',
        required: true,
        description: `ID of the tag to delete (from sleekplan://tags or list_tags)`,
      },
    ],
  },
  {
    name: 'sleekplanmcp_get_category_template',
    description: `Get the title/description preset template for a feedback type.

Mirrors the sleekplan://category-template/{type_key} resource — use this tool when
your MCP client doesn't auto-read resource templates. Returns \`{title, description}\`
or an empty response when no template is configured. Read before create_feedback so
posts of this category follow the workspace's preferred structure.`,
    params: [
      {
        name: 'type_key',
        type: 'string',
        required: true,
        description: `Feedback type key from list_feedback_types / sleekplan://feedback-types (e.g. 'bug', 'feature'). Strings only — not numeric IDs.`,
      },
    ],
  },
  {
    name: 'sleekplanmcp_get_changelog',
    description: `Get a single changelog entry by ID.`,
    params: [
      {
        name: 'changelog_id',
        type: 'integer',
        required: true,
        description: `ID of the changelog entry`,
      },
    ],
  },
  {
    name: 'sleekplanmcp_get_feedback',
    description: `Get a single feedback post by ID.`,
    params: [
      {
        name: 'feedback_id',
        type: 'integer',
        required: true,
        description: `ID of the feedback post`,
      },
    ],
  },
  {
    name: 'sleekplanmcp_get_feedback_stats',
    description: `Get vote and engagement statistics for a feedback post.`,
    params: [
      {
        name: 'feedback_id',
        type: 'integer',
        required: true,
        description: `ID of the feedback post`,
      },
    ],
  },
  {
    name: 'sleekplanmcp_get_similar_feedback',
    description: `Find feedback posts similar to the given one.`,
    params: [
      {
        name: 'feedback_id',
        type: 'integer',
        required: true,
        description: `ID of the feedback post`,
      },
    ],
  },
  {
    name: 'sleekplanmcp_get_survey',
    description: `Get a single survey by ID, including its \`settings\` (question array) and \`options\` registry.

Call this before \`update_survey_questions\` to retrieve existing \`question_id\` values, which must be preserved to keep response history linked to questions.`,
    params: [
      {
        name: 'survey_id',
        type: 'string',
        required: true,
        description: `Survey ID, e.g. 'su67a1b2c3d'`,
      },
    ],
  },
  {
    name: 'sleekplanmcp_get_survey_question_feed',
    description: `Paginated feed of individual answers for one question, including user info per answer.

Essential for reading free-text responses: \`get_survey_summary\` tells you a free-text question has N responses but not what they said — this tool returns them. Each entry has \`answer\`, \`question\`, \`type\`, \`created\`, and a \`user\` object.`,
    params: [
      {
        name: 'question_id',
        type: 'string',
        required: true,
        description: `Question ID (the \`qu...\`-prefixed id from get_survey or get_survey_summary)`,
      },
      { name: 'survey_id', type: 'string', required: true, description: `Survey ID` },
      { name: 'page', type: 'integer', required: false, description: `Page number (0-indexed)` },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page`,
      },
    ],
  },
  {
    name: 'sleekplanmcp_get_survey_response',
    description: `Fetch a single full response by its id — contains every answer the user gave.`,
    params: [
      {
        name: 'response_id',
        type: 'string',
        required: true,
        description: `Response ID (from list_survey_responses)`,
      },
      { name: 'survey_id', type: 'string', required: true, description: `Survey ID` },
    ],
  },
  {
    name: 'sleekplanmcp_get_survey_summary',
    description: `Aggregated response stats per question — the at-a-glance 'what did people answer' view.

Returns a dict keyed by \`question_id\`. Each value has \`question\`, \`type\`, \`total\` (response count), and (for multiple/single/scale questions) an \`answers\` dict mapping each answer option to its count. Free-text questions expose only \`total\` — follow up with \`get_survey_question_feed\` to read the actual free-text answers.

Start here when a user asks "how did people answer this survey?" Pick specific questions to drill into with \`get_survey_question_feed\`.`,
    params: [
      { name: 'survey_id', type: 'string', required: true, description: `Survey ID to summarize` },
    ],
  },
  {
    name: 'sleekplanmcp_get_user',
    description: `Get a single user by ID.`,
    params: [{ name: 'user_id', type: 'integer', required: true, description: `ID of the user` }],
  },
  {
    name: 'sleekplanmcp_get_user_segment',
    description: `Get the segment/plan information for a user.`,
    params: [{ name: 'user_id', type: 'integer', required: true, description: `ID of the user` }],
  },
  {
    name: 'sleekplanmcp_get_voters',
    description: `Get the list of users who voted on a feedback post (with vote direction).`,
    params: [
      {
        name: 'feedback_id',
        type: 'integer',
        required: true,
        description: `ID of the feedback post`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Filter: 'upvote' (default), 'downvote', 'subscribe', or 'priority'`,
      },
      { name: 'page', type: 'integer', required: false, description: `Page number (0-indexed)` },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page`,
      },
    ],
  },
  {
    name: 'sleekplanmcp_list_admins',
    description: `List admin users (team members) with access to this workspace.

Mirrors the sleekplan://admins resource — use this tool when your MCP client
doesn't auto-read resources. Returns id/name/email/role per admin; use \`id\` when
filtering feedback by owner or setting a post's owner.`,
    params: [],
  },
  {
    name: 'sleekplanmcp_list_changelog',
    description: `List changelog entries with optional filtering.`,
    params: [
      { name: 'page', type: 'integer', required: false, description: `Page number (0-indexed)` },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page`,
      },
      { name: 'search', type: 'string', required: false, description: `Full-text search query` },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Status filter: 'published', 'scheduled', 'draft', or 'all'`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Category filter — a key from sleekplan://feedback-types or list_feedback_types (filter to entries whose \`disable_changelog\` is falsy). Use 'all' for no filter.`,
      },
    ],
  },
  {
    name: 'sleekplanmcp_list_comments',
    description: `List comments on a feedback post, with pagination and sort order.

Each returned entry includes a \`comment_id\`. Use that id as the \`parent\` value on
\`create_comment\` to post a threaded reply, or as the \`comment_id\` on \`update_comment\` /
\`delete_comment\`.`,
    params: [
      {
        name: 'feedback_id',
        type: 'integer',
        required: true,
        description: `ID of the feedback post`,
      },
      { name: 'page', type: 'integer', required: false, description: `Page number (0-indexed)` },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page`,
      },
      { name: 'sort', type: 'string', required: false, description: `Sort order: 'old' or 'new'` },
    ],
  },
  {
    name: 'sleekplanmcp_list_feedback',
    description: `List feedback posts with optional filtering and sorting.

Before filtering by type/status/tag/segment/owner, read the corresponding resource
(sleekplan://feedback-types, sleekplan://feedback-statuses, sleekplan://tags,
sleekplan://segments, sleekplan://admins) so you pick real keys/slugs/IDs. If your
MCP client doesn't auto-read resources, call the equivalent list_* tools
(list_feedback_types, list_feedback_statuses, list_tags, list_segments, list_admins).`,
    params: [
      {
        name: 'advanced',
        type: 'string',
        required: false,
        description: `Advanced filter as a STRINGIFIED JSON object. Top-level keys (all optional, combined with AND): \`meta\` and \`meta_system\` = {key: str, value: str|'NULL'|'', condition: str} filter by custom meta / system-integration meta; pass value 'NULL' or '' with condition 'eq' to match posts missing that meta key. \`votes\` and \`comments\` = {value: int, condition: str, interval?: int} filter by vote/comment count; optional \`interval\` limits the count to the last N days. \`created\` and \`updated\` = {value: int, condition: 'lt'|'gt', interval: '1'|'30'|'365'} filter by age where interval 1=DAY, 30=MONTH, 365=YEAR (value is how many units ago). \`eta_q\` = {value: 'YYYY-QN' like '2026-Q2', condition: str} filter by ETA quarter. \`eta_m\` = {value: 'YYYY-MM' like '2026-04', condition: str} filter by ETA month. \`feedback_id\` = {value: int|str, condition: str} filter by feedback id. Valid \`condition\` values: 'eq', 'neq', 'gt', 'lt', 'gte', 'lte', 'like', 'contains', 'ncontains', 'in', 'notin', 'bw' (begins with), 'ew' (ends with). Example: '{"votes": {"value": 10, "condition": "gte", "interval": 30}, "created": {"value": 7, "condition": "gt", "interval": "1"}}' finds posts created in the last 7 days with >=10 votes in the last 30 days.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Filter by status key (from sleekplan://feedback-statuses or list_feedback_statuses). Pass a single key like 'planned', a comma-separated list, or 'all'. Read the resource first to see available keys.`,
      },
      {
        name: 'owner',
        type: 'string',
        required: false,
        description: `Filter by owner admin user_id (from sleekplan://admins or list_admins), or 'all'. Omit for no filter.`,
      },
      { name: 'page', type: 'integer', required: false, description: `Page number (0-indexed)` },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page`,
      },
      { name: 'search', type: 'string', required: false, description: `Full-text search query` },
      {
        name: 'segment',
        type: 'string',
        required: false,
        description: `Filter by segment slug (from sleekplan://segments or list_segments). Use the segment's \`slug\` string, not \`segment_id\`.`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort order. One of: 'trend', 'top', 'fewest', 'new', 'old', 'updated', 'updated_asc', 'scoring', 'priority', 'precedence', 'eta'.`,
      },
      {
        name: 'tags',
        type: 'string',
        required: false,
        description: `Tag filter. Accepts a single tag key, a JSON object like {"tag_key": true} for multi-tag AND, or the literal "empty" to find untagged posts. Omit for no filter.`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Filter by feedback type key (from sleekplan://feedback-types or list_feedback_types). Pass a single key like 'feature', a comma-separated list like 'feature,bug', or 'all'. Read the resource first to see available keys.`,
      },
      {
        name: 'user',
        type: 'string',
        required: false,
        description: `Filter to posts created by this end-user_id.`,
      },
    ],
  },
  {
    name: 'sleekplanmcp_list_feedback_statuses',
    description: `List feedback status definitions for this workspace.

Mirrors the sleekplan://feedback-statuses resource — use this tool when your MCP
client doesn't auto-read resources. Returns a dict keyed by status key (e.g. 'open',
'planned', 'in-progress', 'done', 'closed') with \`key\`, \`name\`, \`color\`, \`order\`,
\`roadmap\`, \`disable_feedback\` per status. Use the \`key\` string in feedback payloads.`,
    params: [],
  },
  {
    name: 'sleekplanmcp_list_feedback_types',
    description: `List feedback type (category) definitions for this workspace.

Mirrors the sleekplan://feedback-types resource — use this tool when your MCP
client doesn't auto-read resources. Returns a dict keyed by type key (e.g. 'feature',
'bug') with \`key\`, \`name\`, \`color\`, \`order\`, \`disable_feedback\`, \`disable_changelog\`
per type. Use the \`key\` string (not the human name) in feedback/changelog payloads.
Filter by \`disable_feedback\` / \`disable_changelog\` based on which surface you're
creating for.`,
    params: [],
  },
  {
    name: 'sleekplanmcp_list_segments',
    description: `List user segments (named cohorts) configured for this workspace.

Mirrors the sleekplan://segments resource — use this tool when your MCP client
doesn't auto-read resources. Returns segment_id/slug/name per segment. Use the
\`slug\` string (not \`segment_id\`) when targeting a segment in feedback or changelog
payloads.`,
    params: [],
  },
  {
    name: 'sleekplanmcp_list_sub_topics',
    description: `List sub-topics under a parent topic — a more detailed breakdown of the posts it contains.`,
    params: [
      {
        name: 'topic_id',
        type: 'integer',
        required: true,
        description: `ID of the parent topic (from list_topics)`,
      },
    ],
  },
  {
    name: 'sleekplanmcp_list_survey_responses',
    description: `Paginated list of every full response to a survey — all questions per row.

Use this only when you need the cross-question picture for each respondent (e.g. "show me every answer from user X"). For per-question analysis prefer \`get_survey_question_feed\` which is narrower and easier to reason over.`,
    params: [
      { name: 'survey_id', type: 'string', required: true, description: `Survey ID` },
      { name: 'page', type: 'integer', required: false, description: `Page number (0-indexed)` },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page`,
      },
    ],
  },
  {
    name: 'sleekplanmcp_list_surveys',
    description: `List surveys configured for this workspace.`,
    params: [
      { name: 'page', type: 'integer', required: false, description: `Page number (0-indexed)` },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Full-text search across survey names`,
      },
    ],
  },
  {
    name: 'sleekplanmcp_list_tags',
    description: `List workspace-level tags.

Mirrors the sleekplan://tags resource — use this tool when your MCP client
doesn't auto-read resources. Returns id/name per tag; use \`id\` with tag_feedback
to attach a tag to a post, or with delete_tag to remove it from the workspace.`,
    params: [],
  },
  {
    name: 'sleekplanmcp_list_topics',
    description: `List feedback topics — the top-level clusters Sleekplan's intelligence derives from posts.

Each topic typically includes an \`id\`, \`name\`, post count, and optional metadata. Use
\`list_sub_topics\` to drill into a specific topic for sub-clusters.`,
    params: [],
  },
  {
    name: 'sleekplanmcp_list_users',
    description: `List users in the workspace with optional search and filtering.`,
    params: [
      { name: 'page', type: 'integer', required: false, description: `Page number (0-indexed)` },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page`,
      },
      { name: 'search', type: 'string', required: false, description: `Search by name or email` },
      { name: 'segment', type: 'string', required: false, description: `Filter by user segment` },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort order: 'updated', 'created', 'name'`,
      },
    ],
  },
  {
    name: 'sleekplanmcp_list_votes',
    description: `List all votes for a feedback post.`,
    params: [
      {
        name: 'feedback_id',
        type: 'integer',
        required: true,
        description: `ID of the feedback post`,
      },
    ],
  },
  {
    name: 'sleekplanmcp_merge_feedback',
    description: `Merge one feedback post into another, combining votes and comments.`,
    params: [
      {
        name: 'source_id',
        type: 'integer',
        required: true,
        description: `ID of the feedback post to merge from (will be closed)`,
      },
      {
        name: 'target_id',
        type: 'integer',
        required: true,
        description: `ID of the feedback post to merge into (will remain)`,
      },
    ],
  },
  {
    name: 'sleekplanmcp_tag_feedback',
    description: `Add or remove a tag on a feedback post.`,
    params: [
      {
        name: 'feedback_id',
        type: 'integer',
        required: true,
        description: `ID of the feedback post`,
      },
      {
        name: 'tag_id',
        type: 'string',
        required: true,
        description: `ID of the tag to add or remove`,
      },
      {
        name: 'action',
        type: 'string',
        required: false,
        description: `Action to perform: 'add' or 'remove'`,
      },
    ],
  },
  {
    name: 'sleekplanmcp_update_changelog',
    description: `Update an existing changelog entry.

Only fields you pass are changed — omit to leave them alone. To CLEAR \`type\` or \`segment\`, pass an empty string (the backend treats empty-string differently from an omitted field, per class.changelog::update).`,
    params: [
      {
        name: 'changelog_id',
        type: 'integer',
        required: true,
        description: `ID of the changelog entry to update`,
      },
      {
        name: 'announcement',
        type: 'boolean',
        required: false,
        description: `Toggle in-app announcement. None = leave unchanged.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New body (HTML or Markdown — sanitized server-side)`,
      },
      {
        name: 'draft',
        type: 'boolean',
        required: false,
        description: `Toggle draft state. True=draft, False=published, None=leave unchanged.`,
      },
      {
        name: 'notify',
        type: 'boolean',
        required: false,
        description: `Toggle email notification. None = leave unchanged.`,
      },
      {
        name: 'scheduled',
        type: 'integer',
        required: false,
        description: `Unix timestamp for publish. 0 = publish now. None = leave unchanged.`,
      },
      {
        name: 'segment',
        type: 'string',
        required: false,
        description: `Segment slug from sleekplan://segments or list_segments. Pass empty string to clear targeting. None = leave unchanged.`,
      },
      { name: 'title', type: 'string', required: false, description: `New title` },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `New category key. Read sleekplan://feedback-types or call list_feedback_types and pick an entry whose \`disable_changelog\` is falsy. Pass empty string to clear.`,
      },
    ],
  },
  {
    name: 'sleekplanmcp_update_comment',
    description: `Update an existing comment.

You can update text only, pin state only, or both — pass just the fields you want to change.`,
    params: [
      {
        name: 'comment_id',
        type: 'integer',
        required: true,
        description: `ID of the comment to update`,
      },
      {
        name: 'feedback_id',
        type: 'integer',
        required: true,
        description: `ID of the feedback post`,
      },
      {
        name: 'comment',
        type: 'string',
        required: false,
        description: `New comment text (Markdown supported). Omit to keep existing text.`,
      },
      {
        name: 'pinned',
        type: 'boolean',
        required: false,
        description: `Set to true/false to pin or unpin. Omit to keep current pin state.`,
      },
    ],
  },
  {
    name: 'sleekplanmcp_update_feedback',
    description: `Update fields on an existing feedback post. Only the fields you pass are changed.

Read sleekplan://feedback-types (or list_feedback_types), sleekplan://feedback-statuses
(or list_feedback_statuses), and sleekplan://admins (or list_admins) first to pick valid
keys/IDs for type/status/owner_id.`,
    params: [
      {
        name: 'feedback_id',
        type: 'integer',
        required: true,
        description: `ID of the feedback post to update`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New description. Markdown is supported.`,
      },
      {
        name: 'effort',
        type: 'integer',
        required: false,
        description: `Internal team precedence. Integer 0–3 where 0 is unset and 3 is highest. Independent of user votes.`,
      },
      {
        name: 'estimated',
        type: 'string',
        required: false,
        description: `Estimated delivery date. Must be "{FullEnglishMonth}, {YYYY}" — the full English month name, a comma, a single space, and the 4-digit year (e.g. "March, 2026"). Abbreviations ("Mar 2026"), ISO formats ("2026-03"), and non-English month names are rejected. The backend stores this as the first of that month.`,
      },
      {
        name: 'owner_id',
        type: 'integer',
        required: false,
        description: `New owner admin user_id (from sleekplan://admins or list_admins).`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `New status key (from sleekplan://feedback-statuses or list_feedback_statuses).`,
      },
      { name: 'title', type: 'string', required: false, description: `New title` },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `New type/category key (from sleekplan://feedback-types or list_feedback_types).`,
      },
    ],
  },
  {
    name: 'sleekplanmcp_update_survey_name',
    description: `Rename a survey without touching its questions.

Internally fetches the survey's current questions and re-submits them alongside the new name, because the backend requires both \`name\` and \`survey\` on every update. Use this for pure renames so existing \`question_id\` values are preserved verbatim.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `New internal name for the survey`,
      },
      { name: 'survey_id', type: 'string', required: true, description: `Survey ID to rename` },
    ],
  },
  {
    name: 'sleekplanmcp_update_survey_questions',
    description: `Replace the question set of an existing survey while keeping its name.

Internally fetches the current \`name\` and re-submits it alongside the new questions — required because the backend rejects partial PUTs.`,
    params: [
      {
        name: 'survey',
        type: 'array',
        required: true,
        description: `New question array. Call \`get_survey\` first to see existing \`question_id\` values, then preserve them for any question that should retain its response history. Omit \`question_id\` only for genuinely new questions.

Array of question dicts. EVERY question MUST include ALL of the following fields — the frontend edit screen crashes if any field is missing. The backend also normalizes missing fields defensively, but produce the full shape to be safe:

- \`type\` (required): 'text', 'multiple', 'single', 'free', or 'scale'
- \`text\` (required): the question text, or markdown for type='text' blocks
- \`options\` (required, ALWAYS an array): list of choice strings for 'multiple'/'single'; use \`[]\` for other types. Never omit.
- \`min\` (required, ALWAYS a number): scale minimum. Use \`0\` when type != 'scale'. Never omit.
- \`max\` (required, ALWAYS a number): scale maximum. Use \`10\` when type != 'scale'. Never omit.
- \`required\` (required, ALWAYS a bool): whether the answer is required. Default \`false\`. Never omit.
- \`showIf\` (required, ALWAYS an object): conditional display. Use \`{'questionIndex': '', 'condition': 'contains', 'value': ''}\` when the question has no condition. When conditional: \`{'questionIndex': <int>, 'condition': 'contains'|'is'|'greater'|'less', 'value': <str>}\`. Never omit.
- \`question_id\` (required ONLY when updating existing questions): the 'qu...'-prefixed ID returned by \`get_survey\`/\`create_survey\`. OMIT on create; on update you MUST preserve existing \`question_id\` values or response history is lost.

Do NOT include a top-level \`options\` field in the payload — the backend manages that registry internally.`,
      },
      {
        name: 'survey_id',
        type: 'string',
        required: true,
        description: `Survey ID whose questions to replace`,
      },
    ],
  },
]
