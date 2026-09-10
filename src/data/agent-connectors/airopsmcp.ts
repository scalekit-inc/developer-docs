import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'airopsmcp_accept_opportunity',
    description: `Accept pending opportunities for a campaign and add them to the campaign action grid. For v2 campaigns, pass opportunity_ids; acceptance uses the original rationale and every opportunity context. Before calling this tool, summarize the opportunities or opportunity items that will be accepted and get explicit user confirmation.`,
    params: [
      { name: 'play_id', type: 'integer', required: true, description: `Campaign ID.` },
      {
        name: 'opportunity_ids',
        type: 'array',
        required: false,
        description: `Opportunity IDs to accept. Required for v2; for v1 this accepts every pending item in each opportunity.`,
      },
      {
        name: 'opportunity_item_ids',
        type: 'array',
        required: false,
        description: `V1-only opportunity item IDs to accept. Use this for item-level acceptance.`,
      },
    ],
  },
  {
    name: 'airopsmcp_add_aeo_region',
    description: `Add a region (ISO alpha-2 country code) to a Brand Kit's configured AEO regions.

Why this tool exists: AEO prompts and prompt-assignments can only reference regions
that are configured on the Brand Kit. When \`create_aeo_prompt\` or
\`update_aeo_prompt_assignments\` returns a \`validation_error\` mentioning that the
country code is "not configured on this brand kit", call this tool to add the
missing region first, then retry.

Behavior:
- Re-adding an already-configured region is a no-op (idempotent) and returns success.
- The country code must be a valid ISO 3166-1 alpha-2 code supported by the platform
  (e.g. US, GB, DE, FR, JP, BR, IN, ...).
- Optional \`add_to_all_prompts\` (default \`false\`): when \`true\`, the new region is
  also assigned to every existing live prompt in the Brand Kit. This may incur
  additional answer credits/month; if the workspace's estimated answers limit would
  be exceeded, the call is rejected with a \`validation_error\` containing
  \`estimated_answers\` and \`max_answers\` in \`details\`. Defaults to \`false\` so the
  agent does not silently incur credits.

IMPORTANT: Always show the user the region you plan to add (and whether
\`add_to_all_prompts\` is on) and get explicit confirmation before calling. Adding a
region cannot be undone via this tool.`,
    params: [
      {
        name: 'brand_kit_id',
        type: 'integer',
        required: true,
        description: `The Brand Kit ID to add the region to.`,
      },
      {
        name: 'country_code',
        type: 'string',
        required: true,
        description: `ISO 3166-1 alpha-2 country code (e.g. "US", "GB", "JP"). Must be one of the platform-supported codes.`,
      },
      {
        name: 'add_to_all_prompts',
        type: 'boolean',
        required: false,
        description: `If true, also assigns this region to every existing live prompt in the Brand Kit (subject to the workspace answers limit). Defaults to false.`,
      },
    ],
  },
  {
    name: 'airopsmcp_add_grid_column',
    description: `Add a new column to a grid table. Use this before write_grid when you need to write to a column that does not exist yet.`,
    params: [
      {
        name: 'data_type',
        type: 'string',
        required: true,
        description: `The data type for the column.`,
      },
      { name: 'grid_id', type: 'integer', required: true, description: `The ID of the grid.` },
      {
        name: 'grid_table_id',
        type: 'integer',
        required: true,
        description: `The ID of the grid table (sheet).`,
      },
      { name: 'title', type: 'string', required: true, description: `The column title.` },
      {
        name: 'position',
        type: 'integer',
        required: false,
        description: `Optional column position. If omitted, appended at the end.`,
      },
    ],
  },
  {
    name: 'airopsmcp_analytics_chart',
    description: `Query analytics data and display it as an interactive chart. Returns data with a UI reference for visualization.`,
    params: [
      {
        name: 'brand_kit_id',
        type: 'integer',
        required: true,
        description: `The Brand Kit ID to query analytics for`,
      },
      {
        name: 'metrics',
        type: 'array',
        required: true,
        description: `Metrics to calculate and display (e.g., citation_rate, mention_rate, share_of_voice).`,
      },
      {
        name: 'chart_type',
        type: 'string',
        required: false,
        description: `Type of chart to render. Line for time series, bar for comparisons, pie for proportions, area for comparison and visualizing totals with filled area under the curve. Default: line.`,
      },
      {
        name: 'countries',
        type: 'array',
        required: false,
        description: `Filter by country codes (ISO 3166-1 alpha-2)`,
      },
      {
        name: 'dimensions',
        type: 'array',
        required: false,
        description: `Dimensions to group by (max 3).`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `End date (YYYY-MM-DD). Defaults to yesterday. Must be before today because today's data may still be processing and is incomplete — yesterday is used to ensure robust, complete data. Leave blank unless a specific date is requested.`,
      },
      {
        name: 'grain',
        type: 'string',
        required: false,
        description: `Time granularity for aggregation. Default: total`,
      },
      { name: 'personas', type: 'array', required: false, description: `Filter by persona IDs` },
      { name: 'providers', type: 'array', required: false, description: `Filter by AI providers` },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `Start date (YYYY-MM-DD). Default: 7 days ago`,
      },
      {
        name: 'tags',
        type: 'array',
        required: false,
        description: `Filter by tag IDs. Returns data only for prompts tagged with any of the given tags.`,
      },
      {
        name: 'themes',
        type: 'array',
        required: false,
        description: `Filter sentiment data by theme IDs. Only applies to sentiment_score metric.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Optional chart title. If not provided, a title will be auto-generated.`,
      },
      { name: 'topics', type: 'array', required: false, description: `Filter by topic IDs` },
    ],
  },
  {
    name: 'airopsmcp_bulk_update_aeo_prompt_tags',
    description: `Apply a single tag operation (add or remove) to a batch of AEO prompts in one
Brand Kit, atomically.

Operations:
- \`add\` — adds the supplied tag_ids to each prompt's existing tags. Duplicates
  are silently deduped.
- \`remove\` — removes the supplied tag_ids from each prompt. Tags not currently
  on a prompt are silently no-oped.

Specifying tags:
- Pass \`tag_ids\` (use \`list_tags\` to discover them).
- Tags must already exist on the Brand Kit. This tool does NOT create new tags.

Atomicity:
- The call is fully atomic. If ANY supplied \`prompt_id\` is missing/discarded/
  cross-brand-kit, or ANY \`tag_id\` is unknown on the Brand Kit, the call is
  refused with a \`validation_error\` listing every problem, and no taggings are
  changed.
- On success, all listed prompts receive the operation in a single DB transaction.

Limits:
- Up to 100 \`prompt_ids\` per call.

IMPORTANT: Always show the user the prompts and tags you plan to operate on, and
get explicit confirmation before calling.`,
    params: [
      {
        name: 'brand_kit_id',
        type: 'integer',
        required: true,
        description: `The Brand Kit ID that owns the prompts and tags.`,
      },
      {
        name: 'operation',
        type: 'string',
        required: true,
        description: `Tag operation to apply to every listed prompt.`,
      },
      {
        name: 'prompt_ids',
        type: 'array',
        required: true,
        description: `AEO prompt (question) IDs to operate on. All must belong to the Brand Kit and not be discarded.`,
      },
      {
        name: 'tag_ids',
        type: 'array',
        required: true,
        description: `Tag IDs to add or remove. Must exist on the Brand Kit. Use \`list_tags\` to discover available tag_ids.`,
      },
    ],
  },
  {
    name: 'airopsmcp_bulk_update_aeo_prompt_topics',
    description: `Reassign a batch of AEO prompts to an existing topic in one Brand Kit.

Specifying the destination topic:
- Pass \`topic_id\` (use \`list_topics\` to discover them).
- The topic must already exist on the Brand Kit. This tool does NOT create topics.
  To create a new topic first, use \`create_topic\`, then pass its id here.

Specifying prompts:
- Pass \`prompt_ids\` (use \`list_aeo_prompts\` filtered by \`topic_id\` to find prompts
  currently under a source topic).
- IDs that are missing, discarded, or not in the Brand Kit are skipped; only
  matching prompts are updated.

IMPORTANT: Always show the user the prompts and destination topic you plan to
operate on, and get explicit confirmation before calling.`,
    params: [
      {
        name: 'brand_kit_id',
        type: 'integer',
        required: true,
        description: `The Brand Kit ID that owns the prompts and topic.`,
      },
      {
        name: 'prompt_ids',
        type: 'array',
        required: true,
        description: `AEO prompt (question) IDs to reassign. Unknown or discarded IDs are skipped.`,
      },
      {
        name: 'topic_id',
        type: 'integer',
        required: true,
        description: `Destination topic ID. Must exist on the Brand Kit. Use \`list_topics\` to discover available topic_ids. Does NOT create topics — use \`create_topic\` first if needed.`,
      },
    ],
  },
  {
    name: 'airopsmcp_commit_aeo_prompt_assignments',
    description: `Commit the current prompt-assignment draft for a Brand Kit to live. Replaces all
live country, persona, and platform assignments for the brand kit's prompts with
the draft data.

The workspace's estimated answers limit is enforced. If committing would push the
workspace over its quota, the call is rejected with an \`AnswersLimitExceeded\`
validation error containing \`estimated_answers\` and \`max_answers\` in \`details\`.
Recover by calling \`update_aeo_prompt_assignments\` to adjust, or
\`discard_aeo_prompt_assignments\` to abandon.

IMPORTANT:
- This action affects live data and is not undoable except by manually editing
  assignments again. Always get explicit user confirmation before calling.
- If the human user has unsaved UI edits in the same draft, those will also be
  committed. Surface this to the user before proceeding.
- After a successful commit, a fresh empty draft is automatically re-mirrored from
  the new live data. You may immediately stage further edits with
  \`update_aeo_prompt_assignments\`.
- This tool does NOT return the new live estimated-answers/month. If you or the
  user need the post-commit estimates, call \`get_aeo_prompt_assignments_status\`.
  Do NOT reuse the pre-commit \`draft_estimated_answers\` from
  \`update_aeo_prompt_assignments\` and do NOT compute the estimate yourself —
  repetition-times, persona/country/platform interactions, and concurrent edits
  can all shift the result.`,
    params: [
      {
        name: 'brand_kit_id',
        type: 'integer',
        required: true,
        description: `The Brand Kit ID whose draft should be committed.`,
      },
    ],
  },
  {
    name: 'airopsmcp_create_aeo_persona',
    description: `Create a new AEO persona on a Brand Kit. Personas represent the characters used to
simulate AI-search queries when measuring AI visibility, citations, and mentions.

Behavior:
- \`title\` must be unique within the Brand Kit (max 200 chars) and \`description\` is
  required (max 5000 chars).
- Optional \`add_to_all_prompts\` (default \`false\`): when \`true\`, the new persona is
  also assigned to every existing live prompt in the Brand Kit. This may incur
  additional answer credits/month; if the workspace's estimated answers limit would
  be exceeded, the call is rejected with a \`validation_error\` containing
  \`estimated_answers\` and \`max_answers\` in \`details\`. Defaults to \`false\` so the
  agent does not silently incur credits.

Writing guidance: avoid including specific brand names in the persona's title or
description — the LLM may then mention the brand in its answer, which the analyzer
will count as a mention and skew the data.

IMPORTANT: Always show the user the persona you plan to create (title, description,
and whether \`add_to_all_prompts\` is on) and get explicit confirmation before
calling. You can verify the persona was created by calling \`list_personas\` sorted
by \`created_at\` descending.`,
    params: [
      {
        name: 'brand_kit_id',
        type: 'integer',
        required: true,
        description: `The Brand Kit ID to add the persona to.`,
      },
      {
        name: 'description',
        type: 'string',
        required: true,
        description: `A description of the persona's perspective and concerns (max 5000 characters). Avoid including specific brand names.`,
      },
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `The persona title (max 200 characters). Must be unique within the Brand Kit. Example: "Enterprise CTO".`,
      },
      {
        name: 'add_to_all_prompts',
        type: 'boolean',
        required: false,
        description: `If true, also assigns this persona to every existing live prompt in the Brand Kit (subject to the workspace answers limit). Defaults to false.`,
      },
    ],
  },
  {
    name: 'airopsmcp_create_aeo_prompt',
    description: `Create a new AEO prompt for a Brand Kit. Prompts are questions that can be asked about a brand to AI search engines, used to track AI visibility and citations.`,
    params: [
      {
        name: 'brand_kit_id',
        type: 'integer',
        required: true,
        description: `The Brand Kit ID to add the prompt to`,
      },
      {
        name: 'text',
        type: 'string',
        required: true,
        description: `The prompt text (max 512 characters). Must be unique within the Brand Kit.`,
      },
      {
        name: 'topic_id',
        type: 'integer',
        required: true,
        description: `Topic ID to associate with the prompt. Must belong to the same Brand Kit. Use \`list_topics\` to discover available topics and either suggest one or ask the user to choose.`,
      },
      {
        name: 'countries',
        type: 'array',
        required: false,
        description: `ISO alpha-2 country codes to assign (e.g., ["US", "GB"]). Must be configured on the Brand Kit.`,
      },
      {
        name: 'persona_ids',
        type: 'array',
        required: false,
        description: `Persona IDs to assign. Must belong to the same Brand Kit. Use \`list_personas\` to discover available personas.`,
      },
      {
        name: 'platforms',
        type: 'array',
        required: false,
        description: `Platforms to assign. Valid values: chat_gpt, gemini, perplexity, google_ai_mode, google_ai_overview.`,
      },
    ],
  },
  {
    name: 'airopsmcp_create_aeo_tag',
    description: `Create a new AEO tag on a Brand Kit. Tags are user-defined labels that can be applied
to prompts via \`bulk_update_aeo_prompt_tags\`.

Behavior:
- \`name\` must be unique within the Brand Kit (case-insensitive). The model enforces
  this via a unique index on (brand_kit_id, lower(name)).
- \`color\` is optional. If omitted, a color is auto-assigned from the platform
  palette. Valid colors: light_grey, grey, green, teal, blue, purple, lilac, pink, red, coral, orange.
- This tool does NOT apply the new tag to any prompts. Use
  \`bulk_update_aeo_prompt_tags\` with \`operation: 'add'\` to assign it afterward.

IMPORTANT: Always show the user the tag you plan to create (name and color) and get
explicit confirmation before calling. You can verify the tag was created by calling
\`list_tags\` filtered by name.`,
    params: [
      {
        name: 'brand_kit_id',
        type: 'integer',
        required: true,
        description: `The Brand Kit ID to add the tag to.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The tag name. Must be unique within the Brand Kit (case-insensitive).`,
      },
      {
        name: 'color',
        type: 'string',
        required: false,
        description: `Optional. Named color from the platform palette. If omitted, a color is auto-assigned.`,
      },
    ],
  },
  {
    name: 'airopsmcp_create_brand_kit_direct_upload',
    description: `Initiate a direct file upload for use with Brand Kit visual tools.`,
    params: [
      {
        name: 'brand_kit_id',
        type: 'integer',
        required: true,
        description: `The Brand Kit ID this file is intended for`,
      },
      {
        name: 'byte_size',
        type: 'integer',
        required: true,
        description: `Size of the file in bytes`,
      },
      {
        name: 'checksum',
        type: 'string',
        required: true,
        description: `Base64-encoded MD5 digest of the file contents`,
      },
      {
        name: 'content_type',
        type: 'string',
        required: true,
        description: `MIME type of the file`,
      },
      {
        name: 'filename',
        type: 'string',
        required: true,
        description: `The filename including extension, e.g. "logo.png" or "brand-font.woff2"`,
      },
    ],
  },
  {
    name: 'airopsmcp_create_brand_kit_recap_entry',
    description: `Record a recap entry summarizing the changes you made to a Brand Kit.

Call this once, near the end of a session that mutated the Brand Kit draft — not for every edit.
Do not call this tool if you made no Brand Kit draft mutations this session (for example,
you only read the Brand Kit, suggested edits the user rejected, or worked on Playbooks,
Campaigns, or Insights). Never create a recap that says nothing changed.
Put the evidence behind the changes in \`body_markdown\`: verbatim quotes, source URLs, and pages.

Example:
  create_brand_kit_recap_entry(
    brand_kit_id: 123,
    title: "Refreshed tone & voice and added 2 regions",
    body_markdown: "Made the tone more concise per the latest brand guidelines (https://acme.com/brand). Added US East and US West to support the Q3 launch."
  )`,
    params: [
      { name: 'brand_kit_id', type: 'integer', required: true, description: `The Brand Kit ID` },
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `One-line summary of what changed (max 200 characters)`,
      },
      {
        name: 'body_markdown',
        type: 'string',
        required: false,
        description: `Markdown detail with the evidence behind the changes, e.g. quotes, source URLs, pages (max 4000 characters)`,
      },
    ],
  },
  {
    name: 'airopsmcp_create_grid',
    description: `Create a new empty, general-purpose grid with the given name. The grid is created with a single empty sheet (zero rows, zero columns).`,
    params: [
      { name: 'name', type: 'string', required: true, description: `The name for the new grid.` },
      {
        name: 'workspace_id',
        type: 'integer',
        required: false,
        description: `Optional workspace ID. Defaults to the user's only workspace when unambiguous.`,
      },
    ],
  },
  {
    name: 'airopsmcp_create_grid_sheet',
    description: `Create a new sheet (grid table) within an existing grid. The sheet is created with zero rows and zero columns.`,
    params: [
      {
        name: 'grid_id',
        type: 'integer',
        required: true,
        description: `The ID of the grid to add the sheet to.`,
      },
      { name: 'name', type: 'string', required: true, description: `The name for the new sheet.` },
    ],
  },
  {
    name: 'airopsmcp_create_opportunity',
    description: `Create a pending opportunity for a campaign. Before calling this tool, summarize the proposed opportunity name, description, and target resources for the user, then get explicit confirmation. In Quill or other OAuth MCP clients, provide play_id from list_campaigns or get_campaign. In playbook sessions, play_id is optional and is derived from the current session.`,
    params: [
      {
        name: 'description',
        type: 'string',
        required: true,
        description: `Opportunity description.`,
      },
      { name: 'name', type: 'string', required: true, description: `Opportunity name.` },
      {
        name: 'contexts',
        type: 'array',
        required: false,
        description: `Ordered supporting resources for v2 campaigns. Rejected for v1 campaigns.`,
      },
      {
        name: 'items',
        type: 'array',
        required: false,
        description: `Required for v1 campaigns and rejected for v2 campaigns.`,
      },
      {
        name: 'play_id',
        type: 'integer',
        required: false,
        description: `Campaign ID. Required outside playbook sessions.`,
      },
      {
        name: 'target_page_id',
        type: 'integer',
        required: false,
        description: `Required for v2 page-refresh campaigns and rejected otherwise.`,
      },
    ],
  },
  {
    name: 'airopsmcp_create_page',
    description: `Add a web page to a Brand Kit's AEO pages. The URL is normalized before the page is
created, and the page is associated with the Brand Kit's configured AEO domain.

The URL must be unique within the Brand Kit.

IMPORTANT: Always show the user the URL and Brand Kit you plan to use and get explicit
confirmation before calling this tool. You can verify the page was created by calling
\`list_pages\` filtered by URL.`,
    params: [
      {
        name: 'brand_kit_id',
        type: 'integer',
        required: true,
        description: `The Brand Kit ID to add the page to.`,
      },
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `The web page URL. Must be unique within the Brand Kit.`,
      },
    ],
  },
  {
    name: 'airopsmcp_create_topic',
    description: `Create a new AEO topic on a Brand Kit. Topics are categories used to group AEO prompts.

Behavior:
- \`name\` must be unique within the Brand Kit.
- \`color\` is optional. If omitted, a color is auto-assigned from the platform palette.
  Valid colors: light_grey, grey, green, teal, blue, purple, lilac, pink, red, coral, orange.
- This tool does NOT create or assign prompts. Use \`create_aeo_prompt\` with the returned
  topic ID to add prompts to the topic.

IMPORTANT: Always show the user the topic you plan to create (name and color) and get
explicit confirmation before calling. You can verify the topic was created by calling
\`list_topics\` filtered by name.`,
    params: [
      {
        name: 'brand_kit_id',
        type: 'integer',
        required: true,
        description: `The Brand Kit ID to add the topic to.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The topic name. Must be unique within the Brand Kit.`,
      },
      {
        name: 'color',
        type: 'string',
        required: false,
        description: `Optional. Named color from the platform palette. If omitted, a color is auto-assigned.`,
      },
    ],
  },
  {
    name: 'airopsmcp_delete_aeo_prompt',
    description: `Delete an AEO prompt from a Brand Kit.

Use \`list_aeo_prompts\` to find the prompt ID and verify the prompt text before deletion.

IMPORTANT: This action is destructive. Always show the user the exact prompt text and
get explicit confirmation before calling this tool.`,
    params: [
      {
        name: 'brand_kit_id',
        type: 'integer',
        required: true,
        description: `The Brand Kit ID that owns the prompt.`,
      },
      {
        name: 'prompt_id',
        type: 'integer',
        required: true,
        description: `The ID of the prompt to remove.`,
      },
    ],
  },
  {
    name: 'airopsmcp_delete_aeo_tag',
    description: `Delete an AEO tag from a Brand Kit.

Behavior:
- This is a HARD delete. The tag is removed from the Brand Kit entirely.
- All taggings on prompts that referenced this tag are also deleted (cascade via
  \`Aeo::Tag has_many :taggings, dependent: :destroy\`). Every prompt that had this
  tag will lose it.
- The response includes \`tagged_prompts_count\`: the number of prompts that lost the
  tag. Use this to communicate the blast radius back to the user.

IMPORTANT: This action is destructive and cannot be undone via this tool. Always
show the user the tag name AND \`tagged_prompts_count\` (look it up first via
\`list_tags\` + \`list_aeo_prompts\` if needed) and get explicit confirmation before
calling.`,
    params: [
      {
        name: 'brand_kit_id',
        type: 'integer',
        required: true,
        description: `The Brand Kit ID that owns the tag.`,
      },
      { name: 'tag_id', type: 'integer', required: true, description: `The tag ID to delete.` },
    ],
  },
  {
    name: 'airopsmcp_delete_brand_kit_writing_rules',
    description: `Delete one or more writing rules from a Brand Kit.
This edits the Brand Kit draft version only; it does not change the active (live) version.

A failure deleting one rule does not block or roll back the others: the response reports
which rules were deleted and which could not be.

IMPORTANT: Always show the user exactly which writing rules will be deleted and ask for
confirmation before calling this tool.`,
    params: [
      { name: 'brand_kit_id', type: 'integer', required: true, description: `The Brand Kit ID` },
      {
        name: 'writing_rule_ids',
        type: 'array',
        required: true,
        description: `The IDs of the writing rules to delete (up to 10)`,
      },
    ],
  },
  {
    name: 'airopsmcp_delete_topic',
    description: `Delete an AEO topic from a Brand Kit.

Behavior:
- This is a HARD delete. The topic is removed from the Brand Kit entirely.
- Deletion is blocked when the topic has associated prompts. Use \`list_aeo_prompts\`
  filtered by \`topic_id\` to inspect prompts before deleting.
- Candidate questions and question recommendations for the topic are deleted by model
  associations when the topic is deleted.

IMPORTANT: This action is destructive and cannot be undone via this tool. Always show
the user the topic name and associated prompt count, then get explicit confirmation
before calling.`,
    params: [
      {
        name: 'brand_kit_id',
        type: 'integer',
        required: true,
        description: `The Brand Kit ID that owns the topic.`,
      },
      { name: 'topic_id', type: 'integer', required: true, description: `The topic ID to delete.` },
    ],
  },
  {
    name: 'airopsmcp_discard_aeo_prompt_assignments',
    description: `Discard the current prompt-assignment draft for a Brand Kit. Throws away ALL
uncommitted edits — both your own and any unsaved edits the human user made in the
UI — and re-mirrors a fresh empty draft from live.

Live assignments are never touched.

IMPORTANT:
- This action is destructive and unrecoverable. Pending UI edits the user has not
  committed will be lost.
- Always get explicit user confirmation before calling.
- Calling discard when no draft exists is a no-op; a fresh empty draft is still
  created so further \`update_aeo_prompt_assignments\` calls work without setup.`,
    params: [
      {
        name: 'brand_kit_id',
        type: 'integer',
        required: true,
        description: `The Brand Kit ID whose draft should be discarded.`,
      },
    ],
  },
  {
    name: 'airopsmcp_get_aeo_citation',
    description: `Get prompts citing a specific URL. The 'id' parameter is the URL to look up.`,
    params: [
      {
        name: 'brand_kit_id',
        type: 'integer',
        required: true,
        description: `The ID of the Brand Kit`,
      },
      { name: 'id', type: 'string', required: true, description: `Resource ID` },
      {
        name: 'countries',
        type: 'array',
        required: false,
        description: `Filter metrics by country codes`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `End date for metrics (ISO 8601). Defaults to today.`,
      },
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: `Specify which fields to return in the response, as a list of field names.`,
      },
      {
        name: 'filters',
        type: 'array',
        required: false,
        description: `Filter results by column values. Each filter requires column_id, operator, and value.`,
      },
      {
        name: 'personas',
        type: 'array',
        required: false,
        description: `Filter metrics by persona IDs`,
      },
      {
        name: 'providers',
        type: 'array',
        required: false,
        description: `Filter metrics by AI providers`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `Start date for metrics (ISO 8601). Defaults to 1 month ago.`,
      },
    ],
  },
  {
    name: 'airopsmcp_get_aeo_page_content_update',
    description: `Get a specific page content update by ID. Track content updates.`,
    params: [
      { name: 'id', type: 'integer', required: true, description: `Resource ID` },
      {
        name: 'brand_kit_id',
        type: 'integer',
        required: false,
        description: `Optional Brand Kit ID to filter content updates by`,
      },
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: `Specify which fields to return in the response, as a list of field names.`,
      },
      {
        name: 'filters',
        type: 'array',
        required: false,
        description: `Filter results by column values. Each filter requires column_id, operator, and value.`,
      },
      {
        name: 'includes',
        type: 'array',
        required: false,
        description: `Related resources to include in the response, as a list of relationship names.`,
      },
      {
        name: 'workspace_id',
        type: 'integer',
        required: false,
        description: `ID of the workspace to retrieve results from. If not provided, returns results from all workspaces the user belongs to.`,
      },
    ],
  },
  {
    name: 'airopsmcp_get_aeo_prompt_assignments_status',
    description: `Inspect the current prompt-assignment draft state for a Brand Kit without modifying
anything. Read-only.

This is the authoritative source for workspace estimated-answers numbers (live
and draft). Call it whenever you need them — never compute or guess them yourself.
In particular:
- At the start of a session, to detect a pre-existing draft from unsaved UI edits.
- Immediately after \`commit_aeo_prompt_assignments\`, to read the new live
  \`estimated_answers\` — the commit tool does not return them.
- Before staging more changes via \`update_aeo_prompt_assignments\`, to compare
  against \`max_answers\`.

Returns:
- \`has_draft\`: whether a draft session exists for this brand kit.
- \`has_changes\`: whether the draft has uncommitted edits relative to live (null if
  no draft).
- \`draft_id\`: the draft's ID (null if no draft).
- \`live_estimated_answers\`: current workspace estimated answers/month based on live
  assignments.
- \`draft_estimated_answers\`: what the workspace estimated answers/month would be if
  the draft were committed now (null if no draft).
- \`max_answers\`: the workspace's effective answers limit.
- \`limit_exceeded\`: whether committing the draft now would exceed the limit (false
  if no draft).`,
    params: [
      {
        name: 'brand_kit_id',
        type: 'integer',
        required: true,
        description: `The Brand Kit ID to inspect.`,
      },
    ],
  },
  {
    name: 'airopsmcp_get_answer',
    description: `Get a specific AI answer by ID with full text content.`,
    params: [
      { name: 'id', type: 'integer', required: true, description: `Resource ID` },
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: `Specify which fields to return in the response, as a list of field names.`,
      },
      {
        name: 'includes',
        type: 'array',
        required: false,
        description: `Related resources to include in the response, as a list of relationship names.`,
      },
    ],
  },
  {
    name: 'airopsmcp_get_brand_kit',
    description: `Fetch a Brand Kit's brand identity (writing_tone, writing_persona) and associated entities (product lines, audiences, content types, regions, writing rules, cus...`,
    params: [
      { name: 'id', type: 'integer', required: true, description: `Resource ID` },
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: `Specify which fields to return in the response, as a list of field names.`,
      },
      {
        name: 'filters',
        type: 'array',
        required: false,
        description: `Filter results by column values. Each filter requires column_id, operator, and value.`,
      },
      {
        name: 'includes',
        type: 'array',
        required: false,
        description: `Related resources to include in the response, as a list of relationship names.`,
      },
      {
        name: 'version',
        type: 'string',
        required: false,
        description: `Brand Kit version to read from (\`active\` or \`draft\`). Defaults to \`active\`.`,
      },
      {
        name: 'workspace_id',
        type: 'integer',
        required: false,
        description: `ID of the workspace to retrieve brand kits from. If not provided, returns brand kits from all workspaces the user belongs to.`,
      },
    ],
  },
  {
    name: 'airopsmcp_get_campaign',
    description: `Get a campaign by ID, including action grid IDs needed to inspect or update its grid. Campaigns are Plays that coordinate strategy playbooks, action grids, and related opportunities for improving AEO performance.`,
    params: [
      { name: 'id', type: 'integer', required: true, description: `Resource ID` },
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: `Select specific fields to return.

**Available fields:**
- **id**: Campaign ID
- **name**: Campaign name
- **status**: Campaign status
- **resource_type**: Resource type this campaign works on
- **brand_kit_id**: Brand Kit this campaign belongs to
- **workspace_id**: Workspace this campaign belongs to
- **strategy_playbook_id**: Strategy playbook generated for this campaign
- **opportunity_schema_version**: Persisted Opportunity schema version
- **created_at**: When the campaign was created
- **updated_at**: When the campaign was last updated
- **action_grid_id**: Action grid ID to use with grid tools
- **action_grid_table_id**: Action grid table ID to use with grid tools
- **custom_instructions**: Campaign-specific guidance for working related opportunities`,
      },
      {
        name: 'filters',
        type: 'array',
        required: false,
        description: `Filter results. Nested fields (e.g. \`writing_rules.text\`) filter within an included association and require that association in \`includes\`.

**Available fields:**
- **name** (EQUALS, CONTAINS): Filter by campaign name
- **status** (EQUALS, IN): Filter by campaign status
- **workspace_id** (EQ, IN): Filter by workspace ID
- **brand_kit_id** (EQ, IN): Filter by Brand Kit ID
- **resource_type** (EQUALS, IN): Filter by campaign resource type`,
      },
    ],
  },
  {
    name: 'airopsmcp_get_grid_row_execution_status',
    description: `Check the status of grid row executions. Returns the overall status and per-column detail for each execution.`,
    params: [
      {
        name: 'grid_id',
        type: 'integer',
        required: true,
        description: `The ID of the grid containing the executions.`,
      },
      {
        name: 'row_execution_ids',
        type: 'array',
        required: true,
        description: `IDs of the row executions to check (max 50).`,
      },
    ],
  },
  {
    name: 'airopsmcp_get_insights_settings',
    description: `Get AEO insights configuration for a Brand Kit, this includes the relevant information to use any AEO and analytics tools.`,
    params: [
      { name: 'id', type: 'integer', required: true, description: `Resource ID` },
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: `Specify which fields to return in the response, as a list of field names.`,
      },
      {
        name: 'workspace_id',
        type: 'integer',
        required: false,
        description: `ID of the workspace to retrieve results from. If not provided, returns results from all workspaces the user belongs to.`,
      },
    ],
  },
  {
    name: 'airopsmcp_get_page_details',
    description: `Get AEO metrics for a specific web page. Page details include citation share, citation rate, unique cited questions count, and Google Search Console metrics (cl...`,
    params: [
      { name: 'id', type: 'integer', required: true, description: `Resource ID` },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `End date for metrics period (YYYY-MM-DD format). Defaults to current date.`,
      },
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: `Specify which fields to return in the response, as a list of field names.`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `Start date for metrics period (YYYY-MM-DD format). Defaults to 1 month ago.`,
      },
    ],
  },
  {
    name: 'airopsmcp_get_page_prompts',
    description: `Get prompts citing a specific web page. Returns AI prompts that cite the page along with citation metrics (citation_rate, mention_rate) and trends.`,
    params: [
      { name: 'brand_kit_id', type: 'integer', required: true, description: `ID of the brand kit` },
      {
        name: 'web_page_id',
        type: 'integer',
        required: true,
        description: `ID of the web page to get citing prompts for`,
      },
      {
        name: 'countries',
        type: 'array',
        required: false,
        description: `Country codes to filter by (ISO 3166-1 alpha-2 format).`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `End date for analysis period (ISO 8601 format, defaults to today)`,
      },
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: `Specify which fields to return in the response, as a list of field names.`,
      },
      {
        name: 'filters',
        type: 'array',
        required: false,
        description: `Filter results by column values. Each filter requires column_id, operator, and value.`,
      },
      {
        name: 'includes',
        type: 'array',
        required: false,
        description: `Related resources to include in the response, as a list of relationship names.`,
      },
      { name: 'page', type: 'integer', required: false, description: `Page number` },
      { name: 'per_page', type: 'integer', required: false, description: `Items per page` },
      { name: 'personas', type: 'array', required: false, description: `Filter by persona IDs` },
      {
        name: 'providers',
        type: 'array',
        required: false,
        description: `Filter by AI providers (e.g., chat_gpt, gemini, perplexity, google_ai_mode, google_ai_overview, claude, grok, microsoft_copilot)`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `Start date for analysis period (ISO 8601 format, defaults to 1 month ago)`,
      },
      { name: 'topic_ids', type: 'array', required: false, description: `Filter by topic IDs` },
    ],
  },
  {
    name: 'airopsmcp_get_prompt_answers',
    description: `Get AI answers for a specific prompt/question. Prompt answers are the AI answers for a specific question/prompt asked to multiple AI providers and the answers a...`,
    params: [
      {
        name: 'prompt_id',
        type: 'integer',
        required: true,
        description: `ID of the question/prompt to get answers for`,
      },
      {
        name: 'countries',
        type: 'string',
        required: false,
        description: `Country codes to filter by (ISO 3166-1 alpha-2 format).`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `End date for analysis period (ISO 8601 format, defaults to today)`,
      },
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: `Specify which fields to return in the response, as a list of field names.`,
      },
      {
        name: 'includes',
        type: 'array',
        required: false,
        description: `Related resources to include in the response, as a list of relationship names.`,
      },
      { name: 'page', type: 'integer', required: false, description: `Page number` },
      { name: 'per_page', type: 'integer', required: false, description: `Items per page` },
      {
        name: 'personas',
        type: 'string',
        required: false,
        description: `Comma-separated persona IDs to filter by.Use "default" for the default persona.`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort field. Prefix with - for descending.`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `Start date for analysis period (ISO 8601 format, defaults to 1 month ago)`,
      },
    ],
  },
  {
    name: 'airopsmcp_get_report',
    description: `Get a specific report by ID with its module configurations. Reports are saved analytics views for a Brand Kit.`,
    params: [
      {
        name: 'brand_kit_id',
        type: 'integer',
        required: true,
        description: `The ID of the Brand Kit`,
      },
      { name: 'id', type: 'integer', required: true, description: `Resource ID` },
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: `Specify which fields to return in the response, as a list of field names.`,
      },
      {
        name: 'filters',
        type: 'array',
        required: false,
        description: `Filter results by column values. Each filter requires column_id, operator, and value.`,
      },
      {
        name: 'includes',
        type: 'array',
        required: false,
        description: `Related resources to include in the response, as a list of relationship names.`,
      },
    ],
  },
  {
    name: 'airopsmcp_get_sentiment_theme_answers',
    description: `Get individual AI answers with sentiment details for a specific theme. Returns answer text, sentiment (positive/neutral/negative), confidence score, and provide...`,
    params: [
      { name: 'brand_kit_id', type: 'integer', required: true, description: `The Brand Kit ID` },
      {
        name: 'sentiment_theme_id',
        type: 'integer',
        required: true,
        description: `The sentiment theme ID to drill into. Use query_analytics with dimensions=[theme] to discover available theme IDs first.`,
      },
      {
        name: 'countries',
        type: 'array',
        required: false,
        description: `Filter by country codes (ISO 3166-1 alpha-2)`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `End date (YYYY-MM-DD). Defaults to yesterday. Must be before today.`,
      },
      { name: 'page', type: 'integer', required: false, description: `Page number. Default: 1` },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Results per page (1-50). Default: 10`,
      },
      { name: 'personas', type: 'array', required: false, description: `Filter by persona IDs` },
      { name: 'providers', type: 'array', required: false, description: `Filter by AI providers` },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `Start date (YYYY-MM-DD). Default: 30 days ago`,
      },
      { name: 'topics', type: 'array', required: false, description: `Filter by topic IDs` },
    ],
  },
  {
    name: 'airopsmcp_knowledge_base_add_file',
    description: `Step 2 of the two-step file ingestion flow for a Knowledge Base. Consumes a \`signed_id\`
returned by \`knowledge_base_create_direct_upload\` (step 1) plus the file's metadata, and
registers the document with the Knowledge Base. Returns immediately with the new
\`document_id\` in \`pending\` status — poll \`knowledge_base_get_status\` to monitor indexing.

Workflow:
1. Call \`knowledge_base_create_direct_upload\` with the file metadata to get back a
   \`signed_id\` and a presigned \`upload_url\`.
2. PUT the file bytes to the \`upload_url\` with the provided headers.
3. Call this tool with the \`signed_id\`, the desired \`name\` (used as the document's display
   name), the \`document_type\` MIME (must match the supported types), and an optional
   \`metadata\` hash.

The \`metadata\` hash, if provided, is a single-level key/value object. It **replaces** any
existing metadata on the document (no merge) and is filterable at search time via
\`search_knowledge_base\`.`,
    params: [
      {
        name: 'document_type',
        type: 'string',
        required: true,
        description: `MIME type to index the document as. Typically matches the \`content_type\` passed to \`knowledge_base_create_direct_upload\`, but may intentionally differ to select a different loader (e.g. registering a \`text/csv\` blob as \`text/plain\` to bypass CSV-specific parsing).`,
      },
      {
        name: 'knowledge_base_id',
        type: 'integer',
        required: true,
        description: `The ID of the Knowledge Base to register the document with.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Display name for the document.`,
      },
      {
        name: 'signed_id',
        type: 'string',
        required: true,
        description: `The \`signed_id\` returned by \`knowledge_base_create_direct_upload\`.`,
      },
      {
        name: 'metadata',
        type: 'object',
        required: false,
        description: `Optional single-level key/value hash to attach to the document. Filterable via \`search_knowledge_base\`.`,
      },
    ],
  },
  {
    name: 'airopsmcp_knowledge_base_add_urls',
    description: `Bulk-ingest one or more web pages into a Knowledge Base. Each URL becomes a separate
document that fetches and indexes asynchronously. The call returns immediately with the
new document IDs in \`pending\` state — poll \`knowledge_base_get_status\` to check progress.

URLs must be absolute and include the \`http://\` or \`https://\` scheme (e.g.
\`https://example.com/page\`). No documents are created if any URL fails validation.

The \`metadata\` hash, if provided, is applied identically to every document in the batch
(single-level keys only); it replaces (not merges) any existing metadata and is
filterable at search time.`,
    params: [
      {
        name: 'knowledge_base_id',
        type: 'integer',
        required: true,
        description: `The ID of the Knowledge Base to add URLs to.`,
      },
      {
        name: 'urls',
        type: 'array',
        required: true,
        description: `One or more absolute URLs starting with \`http://\` or \`https://\` (e.g. \`https://example.com/page\`). Each URL becomes its own document. Bare hostnames without a scheme are rejected.`,
      },
      {
        name: 'metadata',
        type: 'object',
        required: false,
        description: `Optional single-level hash applied identically to every new document. Replaces existing metadata (no merge). Filterable via search_knowledge_base.`,
      },
    ],
  },
  {
    name: 'airopsmcp_knowledge_base_create_direct_upload',
    description: `Initiate a direct file upload for a Knowledge Base. Returns a presigned S3 upload URL,
the required upload headers, and a \`signed_id\` you'll use with \`knowledge_base_add_file\`
to register the document.

This is the first call in the two-step file ingestion flow — large files (PDFs, DOCX,
MD, HTML, etc.) don't fit through the MCP transport, so the file bytes go directly from
your client to S3.

Workflow:
1. Call this tool with the file metadata (filename, content_type, byte_size, checksum).
   The checksum must be the Base64-encoded MD5 digest of the file contents.
2. PUT the raw file bytes to the returned \`upload_url\` with **all** the provided
   \`upload_headers\`. No additional authentication is needed — the URL is a time-limited
   presigned URL.
3. Pass the returned \`signed_id\` to \`knowledge_base_add_file\` to register the document.
   Only after step 3 is the file searchable.

Example:
> knowledge_base_create_direct_upload(knowledge_base_id: 1, filename: "report.pdf",
    content_type: "application/pdf", byte_size: 1234567, checksum: "...")
# → { signed_id: "abc...", upload_url: "https://s3...", upload_headers: { ... } }
> knowledge_base_add_file(knowledge_base_id: 1, signed_id: "abc...",
    name: "Q4 Report", document_type: "application/pdf")
# → { document_ids: [42], status: "pending" }

Maximum file size is 256 MB.`,
    params: [
      {
        name: 'byte_size',
        type: 'integer',
        required: true,
        description: `Size of the file in bytes. Maximum: 256 MB.`,
      },
      {
        name: 'checksum',
        type: 'string',
        required: true,
        description: `Base64-encoded MD5 digest of the file contents.`,
      },
      {
        name: 'content_type',
        type: 'string',
        required: true,
        description: `MIME type of the file.`,
      },
      {
        name: 'filename',
        type: 'string',
        required: true,
        description: `The filename including extension, e.g. "report.pdf" or "transcript.md".`,
      },
      {
        name: 'knowledge_base_id',
        type: 'integer',
        required: true,
        description: `The ID of the Knowledge Base the file will be ingested into.`,
      },
    ],
  },
  {
    name: 'airopsmcp_knowledge_base_delete',
    description: `Permanently delete a Knowledge Base and ALL of its documents. This cascades through
every document in the KB and drops the underlying vectors. This action cannot be
undone.

IMPORTANT: Always warn the user that deletion is permanent and irreversible, name
the Knowledge Base being deleted, and ask for explicit confirmation before calling
this tool.`,
    params: [
      {
        name: 'knowledge_base_id',
        type: 'integer',
        required: true,
        description: `The ID of the Knowledge Base to delete.`,
      },
    ],
  },
  {
    name: 'airopsmcp_knowledge_base_delete_document',
    description: `Permanently delete a single document from a Knowledge Base. This action cannot be undone.

IMPORTANT: Always warn the user that deletion is permanent and ask for explicit
confirmation before calling this tool.`,
    params: [
      {
        name: 'document_id',
        type: 'integer',
        required: true,
        description: `The ID of the document to delete.`,
      },
      {
        name: 'knowledge_base_id',
        type: 'integer',
        required: true,
        description: `The ID of the Knowledge Base the document belongs to.`,
      },
    ],
  },
  {
    name: 'airopsmcp_knowledge_base_get_document',
    description: `Read the full reconstructed text content of a Knowledge Base document end-to-end —
the loader-extracted text from every chunk concatenated in \`position\` order.

Use when chunked search results aren't enough: summarizing a whole document,
answering questions across an entire report, or reading back a doc before
delete-and-recreate. For finding specific passages, prefer \`search_knowledge_base\`.

Returns up to \`max_chars\` characters starting at \`offset\` (defaults to 0 and
200000). When the document is larger than the slice, the response
includes \`next_offset\` (the value to pass on the next call to continue reading);
when fully read, \`next_offset\` is \`null\`.

For documents still indexing (\`status: pending\`) or in error (\`status: error\`),
content may be empty — check \`status\` first.

Content is reconstructed by joining chunks; minor overlap or duplication between
adjacent chunks is possible depending on the original loader's chunking strategy.
For the original source file, use the existing download path outside MCP.`,
    params: [
      {
        name: 'document_id',
        type: 'integer',
        required: true,
        description: `The ID of the document to read.`,
      },
      {
        name: 'knowledge_base_id',
        type: 'integer',
        required: true,
        description: `The ID of the Knowledge Base the document belongs to.`,
      },
      {
        name: 'max_chars',
        type: 'integer',
        required: false,
        description: `Maximum characters to return in this call (default 200000, cap 500000). For larger documents, paginate via \`next_offset\`.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Character offset to start reading from (default 0). Use the \`next_offset\` from a previous call to paginate.`,
      },
    ],
  },
  {
    name: 'airopsmcp_knowledge_base_get_status',
    description: `Get the indexing status of a Knowledge Base and its documents.
Returns a Knowledge Base–level rollup (status, pending and total document counts) plus a
paginated list of per-document statuses. Use this to monitor indexing after writes — only
documents with status "ready" are returned by search_knowledge_base. Pass the returned
\`cursor\` back to fetch the next page; pass \`document_ids\` to filter to specific documents.`,
    params: [
      {
        name: 'knowledge_base_id',
        type: 'integer',
        required: true,
        description: `The ID of the Knowledge Base to inspect.`,
      },
      {
        name: 'cursor',
        type: 'integer',
        required: false,
        description: `Optional. Cursor token returned by a previous call. Pass it back to fetch the next page.`,
      },
      {
        name: 'document_ids',
        type: 'array',
        required: false,
        description: `Optional. Filter the documents array to only the listed document IDs.`,
      },
      {
        name: 'items',
        type: 'integer',
        required: false,
        description: `Optional. Page size for the documents array (1–100, default 25).`,
      },
    ],
  },
  {
    name: 'airopsmcp_knowledge_base_manage',
    description: `Create or update a Knowledge Base. Omit \`knowledge_base_id\` to create a new one; pass it
to update an existing one. On create, \`name\` is required; pass \`workspace_id\` if you have
access to more than one workspace. On update, only the fields you pass change.`,
    params: [
      {
        name: 'knowledge_base_id',
        type: 'integer',
        required: false,
        description: `Omit to create a new Knowledge Base; pass it to update an existing one.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Display name. Required on create; optional on update (omit to leave unchanged).`,
      },
      {
        name: 'workspace_id',
        type: 'integer',
        required: false,
        description: `Workspace ID for the new Knowledge Base. Required on create when the caller has access to multiple workspaces; inferred otherwise. Ignored on update (workspace is fixed by the existing Knowledge Base).`,
      },
    ],
  },
  {
    name: 'airopsmcp_knowledge_base_update_document_metadata',
    description: `Replace a document's user-facing metadata in full. Accepts a single-level hash that
**replaces** (not merges) the existing user-facing metadata. To remove a key, pass the
full new hash that omits it. To clear all metadata, pass \`{}\`. Filterable at search
time via \`search_knowledge_base\`.

Metadata-only — does not re-embed the document. Loader-derived metadata (scraped page
metadata for URLs, chunker metadata for files) is not touched. Search filters may
take a few seconds to reflect the new values.

The document must be fully indexed (\`status: ready\`) before calling this tool. If
indexing isn't complete, the tool returns a validation error.`,
    params: [
      {
        name: 'document_id',
        type: 'integer',
        required: true,
        description: `The ID of the document whose metadata to replace.`,
      },
      {
        name: 'knowledge_base_id',
        type: 'integer',
        required: true,
        description: `The ID of the Knowledge Base the document belongs to.`,
      },
      {
        name: 'metadata',
        type: 'object',
        required: true,
        description: `Single-level key/value hash. Replaces the existing user-facing metadata in full. Values must be a string, number, or boolean (no nested objects / arrays). String values are capped at 512 characters.`,
      },
    ],
  },
  {
    name: 'airopsmcp_list_aeo_citations',
    description: `List citations (URLs) with metrics for a Brand Kit.`,
    params: [
      {
        name: 'brand_kit_id',
        type: 'integer',
        required: true,
        description: `The ID of the Brand Kit`,
      },
      {
        name: 'countries',
        type: 'array',
        required: false,
        description: `Filter metrics by country codes`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `End date for metrics (ISO 8601). Defaults to today.`,
      },
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: `Specify which fields to return in the response, as a list of field names.`,
      },
      {
        name: 'filters',
        type: 'array',
        required: false,
        description: `Filter results by column values. Each filter requires column_id, operator, and value.`,
      },
      { name: 'page', type: 'integer', required: false, description: `Page number` },
      { name: 'per_page', type: 'integer', required: false, description: `Items per page` },
      {
        name: 'personas',
        type: 'array',
        required: false,
        description: `Filter metrics by persona IDs`,
      },
      {
        name: 'providers',
        type: 'array',
        required: false,
        description: `Filter metrics by AI providers`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort field. Prefix with - for descending.`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `Start date for metrics (ISO 8601). Defaults to 1 month ago.`,
      },
    ],
  },
  {
    name: 'airopsmcp_list_aeo_domains',
    description: `List domains cited in AI answers for a Brand Kit. Cited domains aggregated by domain with citation metrics.`,
    params: [
      {
        name: 'brand_kit_id',
        type: 'integer',
        required: true,
        description: `The ID of the Brand Kit`,
      },
      {
        name: 'countries',
        type: 'array',
        required: false,
        description: `Filter metrics by country codes`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `End date for metrics (ISO 8601). Defaults to today.`,
      },
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: `Specify which fields to return in the response, as a list of field names.`,
      },
      {
        name: 'filters',
        type: 'array',
        required: false,
        description: `Filter results by column values. Each filter requires column_id, operator, and value.`,
      },
      { name: 'page', type: 'integer', required: false, description: `Page number` },
      { name: 'per_page', type: 'integer', required: false, description: `Items per page` },
      {
        name: 'personas',
        type: 'array',
        required: false,
        description: `Filter metrics by persona IDs`,
      },
      {
        name: 'providers',
        type: 'array',
        required: false,
        description: `Filter metrics by AI providers`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort field. Prefix with - for descending.`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `Start date for metrics (ISO 8601). Defaults to 1 month ago.`,
      },
    ],
  },
  {
    name: 'airopsmcp_list_aeo_page_content_updates',
    description: `List page content updates for a workspace. Track content updates.`,
    params: [
      {
        name: 'brand_kit_id',
        type: 'integer',
        required: false,
        description: `Optional Brand Kit ID to filter content updates by`,
      },
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: `Specify which fields to return in the response, as a list of field names.`,
      },
      {
        name: 'filters',
        type: 'array',
        required: false,
        description: `Filter results by column values. Each filter requires column_id, operator, and value.`,
      },
      {
        name: 'includes',
        type: 'array',
        required: false,
        description: `Related resources to include in the response, as a list of relationship names.`,
      },
      { name: 'page', type: 'integer', required: false, description: `Page number` },
      { name: 'per_page', type: 'integer', required: false, description: `Items per page` },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort field. Prefix with - for descending.`,
      },
      {
        name: 'workspace_id',
        type: 'integer',
        required: false,
        description: `ID of the workspace to retrieve results from. If not provided, returns results from all workspaces the user belongs to.`,
      },
    ],
  },
  {
    name: 'airopsmcp_list_aeo_prompts',
    description: `List AEO prompts for a specific Brand Kit. Questions are the AI prompts that can be asked about a brand.`,
    params: [
      {
        name: 'brand_kit_id',
        type: 'integer',
        required: true,
        description: `The ID of the Brand Kit`,
      },
      {
        name: 'countries',
        type: 'array',
        required: false,
        description: `Filter metrics by country codes`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `End date for metrics (ISO 8601). Defaults to today.`,
      },
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: `Specify which fields to return in the response, as a list of field names.`,
      },
      {
        name: 'filters',
        type: 'array',
        required: false,
        description: `Filter results by column values. Each filter requires column_id, operator, and value.`,
      },
      {
        name: 'includes',
        type: 'array',
        required: false,
        description: `Related resources to include in the response, as a list of relationship names.`,
      },
      { name: 'page', type: 'integer', required: false, description: `Page number` },
      { name: 'per_page', type: 'integer', required: false, description: `Items per page` },
      {
        name: 'personas',
        type: 'array',
        required: false,
        description: `Filter metrics by persona IDs`,
      },
      {
        name: 'providers',
        type: 'array',
        required: false,
        description: `Filter metrics by AI providers`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort field. Prefix with - for descending.`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `Start date for metrics (ISO 8601). Defaults to 1 month ago.`,
      },
    ],
  },
  {
    name: 'airopsmcp_list_answers',
    description: `List AI answers for a brand kit with filters for date range, providers, countries, prompt_id, and brand_mentioned. Individual AI answers with their cited URLs and brand/competitor mentions.`,
    params: [
      {
        name: 'brand_kit_id',
        type: 'integer',
        required: true,
        description: `The ID of the Brand Kit`,
      },
      {
        name: 'brand_mentioned',
        type: 'boolean',
        required: false,
        description: `When set, filter to answers where the brand was (or was not) mentioned.`,
      },
      {
        name: 'countries',
        type: 'array',
        required: false,
        description: `Filter by ISO alpha-2 country codes.`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `End date (ISO 8601) on aeo_analyses.created_at. Defaults to today.`,
      },
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: `Select additional fields to return.

**Optional fields:**
- **id**: Answer ID
- **date**: Analysis date (YYYY-MM-DD)
- **text**: Answer text. Truncated to 200 chars with ellipsis on list; full on show.
- **prompt**: Prompt (question) text
- **citations**: URLs cited by the answer (deduped)
- **mentions**: Brand names mentioned in the answer (self brand + competitors)
- **persona**: Persona name or "default"
- **provider**: AI provider
- **country**: ISO alpha-2 country code
- **web_search_triggered**: Whether the AI performed a web search for this answer
- **brand_mentioned**: Whether the brand was mentioned in this answer`,
      },
      { name: 'page', type: 'integer', required: false, description: `Page number` },
      { name: 'per_page', type: 'integer', required: false, description: `Items per page` },
      {
        name: 'prompt_id',
        type: 'integer',
        required: false,
        description: `Filter answers by a single prompt (question) ID.`,
      },
      { name: 'providers', type: 'array', required: false, description: `Filter by AI providers.` },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `Start date (ISO 8601) on aeo_analyses.created_at. Defaults to 30 days ago.`,
      },
    ],
  },
  {
    name: 'airopsmcp_list_brand_kits',
    description: `List all Brand Kits the user has access to. Returns \`brand_management_enabled\` and \`aeo_enabled\` flags for each brand kit.`,
    params: [
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: `Specify which fields to return in the response, as a list of field names.`,
      },
      {
        name: 'filters',
        type: 'array',
        required: false,
        description: `Filter results by column values. Each filter requires column_id, operator, and value.`,
      },
      { name: 'page', type: 'integer', required: false, description: `Page number` },
      { name: 'per_page', type: 'integer', required: false, description: `Items per page` },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort field. Prefix with - for descending.`,
      },
      {
        name: 'version',
        type: 'string',
        required: false,
        description: `Brand Kit version to read from (\`active\` or \`draft\`). Defaults to \`active\`.`,
      },
      {
        name: 'workspace_id',
        type: 'integer',
        required: false,
        description: `ID of the workspace to retrieve results from. If not provided, returns results from all workspaces the user belongs to.`,
      },
    ],
  },
  {
    name: 'airopsmcp_list_campaigns',
    description: `List campaigns the authenticated user has access to. Use get_campaign to retrieve action grid IDs and custom instructions for a campaign. Campaigns are Plays that coordinate strategy playbooks, action grids, and related opportunities for improving AEO performance.`,
    params: [
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: `Select additional fields to return.

Default fields (id, name, status, resource_type, brand_kit_id, workspace_id, strategy_playbook_id, opportunity_schema_version, created_at, updated_at) are always included.

**Optional fields:**
- **action_grid_id**: Action grid ID to use with grid tools
- **action_grid_table_id**: Action grid table ID to use with grid tools
- **custom_instructions**: Campaign-specific guidance for working related opportunities`,
      },
      {
        name: 'filters',
        type: 'array',
        required: false,
        description: `Filter results. Nested fields (e.g. \`writing_rules.text\`) filter within an included association and require that association in \`includes\`.

**Available fields:**
- **name** (EQUALS, CONTAINS): Filter by campaign name
- **status** (EQUALS, IN): Filter by campaign status
- **workspace_id** (EQ, IN): Filter by workspace ID
- **brand_kit_id** (EQ, IN): Filter by Brand Kit ID
- **resource_type** (EQUALS, IN): Filter by campaign resource type`,
      },
      { name: 'page', type: 'integer', required: false, description: `Page number` },
      { name: 'per_page', type: 'integer', required: false, description: `Items per page` },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort field. Prefix with - for descending.

**Available sort fields:**
- **name/-name**: Sort by campaign name
- **created_at/-created_at**: Sort by creation date
- **updated_at/-updated_at**: Sort by last updated date`,
      },
    ],
  },
  {
    name: 'airopsmcp_list_grids',
    description: `List grids the authenticated user has access to. Use includes=[\\"grid_tables.grid_columns\\"] to get table and column structure needed for read_grid and write_gr...`,
    params: [
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: `Specify which fields to return in the response, as a list of field names.`,
      },
      {
        name: 'filters',
        type: 'array',
        required: false,
        description: `Filter results by column values. Each filter requires column_id, operator, and value.`,
      },
      {
        name: 'includes',
        type: 'array',
        required: false,
        description: `Related resources to include in the response, as a list of relationship names.`,
      },
      { name: 'page', type: 'integer', required: false, description: `Page number` },
      { name: 'per_page', type: 'integer', required: false, description: `Items per page` },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort field. Prefix with - for descending.`,
      },
    ],
  },
  {
    name: 'airopsmcp_list_knowledge_bases',
    description: `List all Knowledge Bases the authenticated user has access to. Knowledge Bases store documents for semantic search.`,
    params: [
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: `Specify which fields to return in the response, as a list of field names.`,
      },
      {
        name: 'filters',
        type: 'array',
        required: false,
        description: `Filter results by column values. Each filter requires column_id, operator, and value.`,
      },
      { name: 'page', type: 'integer', required: false, description: `Page number` },
      { name: 'per_page', type: 'integer', required: false, description: `Items per page` },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort field. Prefix with - for descending.`,
      },
    ],
  },
  {
    name: 'airopsmcp_list_opportunities',
    description: `List opportunities for a campaign. V1 responses include matching opportunity items; v2 responses include parent review state, the target page, and ordered contexts.`,
    params: [
      { name: 'play_id', type: 'integer', required: true, description: `Campaign ID.` },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of opportunities to return. Defaults to 30.`,
      },
      {
        name: 'status',
        type: 'array',
        required: false,
        description: `Optional item statuses for v1 or parent statuses for v2. Defaults to all.`,
      },
    ],
  },
  {
    name: 'airopsmcp_list_pages',
    description: `List web pages with daily metrics (AEO citations, GSC clicks/impressions, GA4 traffic) for a brand kit.`,
    params: [
      {
        name: 'brand_kit_id',
        type: 'integer',
        required: true,
        description: `ID of the brand kit to retrieve web page metrics for`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `End date for analysis period (ISO 8601 format, defaults to today)`,
      },
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: `Specify which fields to return in the response, as a list of field names.`,
      },
      {
        name: 'filters',
        type: 'array',
        required: false,
        description: `Filter results by column values. Each filter requires column_id, operator, and value.`,
      },
      { name: 'page', type: 'integer', required: false, description: `Page number` },
      { name: 'per_page', type: 'integer', required: false, description: `Items per page` },
      {
        name: 'smart_filter',
        type: 'string',
        required: false,
        description: `Apply a predefined filter preset.`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort field. Prefix with - for descending.`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `Start date for analysis period (ISO 8601 format, defaults to 1 month ago)`,
      },
    ],
  },
  {
    name: 'airopsmcp_list_personas',
    description: `List personas for a specific Brand Kit. Personas are the characters that can be used to ask questions about a brand.`,
    params: [
      {
        name: 'brand_kit_id',
        type: 'integer',
        required: true,
        description: `The ID of the Brand Kit`,
      },
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: `Specify which fields to return in the response, as a list of field names.`,
      },
      {
        name: 'filters',
        type: 'array',
        required: false,
        description: `Filter results by column values. Each filter requires column_id, operator, and value.`,
      },
      { name: 'page', type: 'integer', required: false, description: `Page number` },
      { name: 'per_page', type: 'integer', required: false, description: `Items per page` },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort field. Prefix with - for descending.`,
      },
    ],
  },
  {
    name: 'airopsmcp_list_reports',
    description: `List saved analytics reports for a specific Brand Kit.`,
    params: [
      {
        name: 'brand_kit_id',
        type: 'integer',
        required: true,
        description: `The ID of the Brand Kit`,
      },
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: `Specify which fields to return in the response, as a list of field names.`,
      },
      {
        name: 'filters',
        type: 'array',
        required: false,
        description: `Filter results by column values. Each filter requires column_id, operator, and value.`,
      },
      {
        name: 'includes',
        type: 'array',
        required: false,
        description: `Related resources to include in the response, as a list of relationship names.`,
      },
      { name: 'page', type: 'integer', required: false, description: `Page number` },
      { name: 'per_page', type: 'integer', required: false, description: `Items per page` },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort field. Prefix with - for descending.`,
      },
    ],
  },
  {
    name: 'airopsmcp_list_tags',
    description: `List tags for a specific Brand Kit. Tags are user-defined labels applied to prompts within a Brand Kit.`,
    params: [
      {
        name: 'brand_kit_id',
        type: 'integer',
        required: true,
        description: `The ID of the Brand Kit`,
      },
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: `Specify which fields to return in the response, as a list of field names.`,
      },
      {
        name: 'filters',
        type: 'array',
        required: false,
        description: `Filter results by column values. Each filter requires column_id, operator, and value.`,
      },
      { name: 'page', type: 'integer', required: false, description: `Page number` },
      { name: 'per_page', type: 'integer', required: false, description: `Items per page` },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort field. Prefix with - for descending.`,
      },
    ],
  },
  {
    name: 'airopsmcp_list_topics',
    description: `List topics for a specific Brand Kit. Topics are the categories of questions that can be asked about a Brand Kit.`,
    params: [
      {
        name: 'brand_kit_id',
        type: 'integer',
        required: true,
        description: `The ID of the Brand Kit`,
      },
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: `Specify which fields to return in the response, as a list of field names.`,
      },
      {
        name: 'filters',
        type: 'array',
        required: false,
        description: `Filter results by column values. Each filter requires column_id, operator, and value.`,
      },
      { name: 'page', type: 'integer', required: false, description: `Page number` },
      { name: 'per_page', type: 'integer', required: false, description: `Items per page` },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort field. Prefix with - for descending.`,
      },
    ],
  },
  {
    name: 'airopsmcp_list_workspaces',
    description: `List all workspaces the authenticated user has access to. Workspaces are the top-level container for all resources in the AirOps platform.`,
    params: [
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: `Specify which fields to return in the response, as a list of field names.`,
      },
      {
        name: 'filters',
        type: 'array',
        required: false,
        description: `Filter results by column values. Each filter requires column_id, operator, and value.`,
      },
      { name: 'page', type: 'integer', required: false, description: `Page number` },
      { name: 'per_page', type: 'integer', required: false, description: `Items per page` },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort field. Prefix with - for descending.`,
      },
    ],
  },
  {
    name: 'airopsmcp_manage_brand_kit_audience',
    description: `Create or update an audience for a Brand Kit draft. Omit \`id\` to create a new audience; provide \`id\` to update an existing one.`,
    params: [
      { name: 'brand_kit_id', type: 'integer', required: true, description: `The Brand Kit ID` },
      { name: 'description', type: 'string', required: false, description: `Audience description` },
      {
        name: 'id',
        type: 'integer',
        required: false,
        description: `Audience ID (omit to create new)`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Audience name (required on create)`,
      },
    ],
  },
  {
    name: 'airopsmcp_manage_brand_kit_competitor',
    description: `Create or update a competitor for a Brand Kit. Omit \`id\` to create a new competitor; provide \`id\` to update an existing one.`,
    params: [
      { name: 'brand_kit_id', type: 'integer', required: true, description: `The Brand Kit ID` },
      {
        name: 'domain',
        type: 'string',
        required: false,
        description: `Competitor domain (e.g. "example.com")`,
      },
      {
        name: 'id',
        type: 'integer',
        required: false,
        description: `Competitor ID (omit to create new)`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Competitor name (required on create)`,
      },
      {
        name: 'product_line_ids',
        type: 'array',
        required: false,
        description: `Product line IDs to associate (must belong to this brand kit, at least one required)`,
      },
    ],
  },
  {
    name: 'airopsmcp_manage_brand_kit_content_sample',
    description: `Create or update a content sample for a Brand Kit. Omit \`id\` to create a new content sample; provide \`id\` to update an existing one.`,
    params: [
      { name: 'brand_kit_id', type: 'integer', required: true, description: `The Brand Kit ID` },
      {
        name: 'audience_ids',
        type: 'array',
        required: false,
        description: `Audience IDs to associate (must belong to this brand kit). Pass [] to clear.`,
      },
      {
        name: 'content',
        type: 'string',
        required: false,
        description: `Plain text content for the sample. On create, provide either content or url (not both).`,
      },
      {
        name: 'content_type_id',
        type: 'integer',
        required: false,
        description: `Content type ID (required on create, must belong to this brand kit)`,
      },
      {
        name: 'id',
        type: 'integer',
        required: false,
        description: `Content sample ID (omit to create new)`,
      },
      {
        name: 'region_ids',
        type: 'array',
        required: false,
        description: `Region IDs to associate (must belong to this brand kit). Pass [] to clear.`,
      },
      {
        name: 'url',
        type: 'string',
        required: false,
        description: `URL of the content sample. On create, provide either url or content (not both).`,
      },
    ],
  },
  {
    name: 'airopsmcp_manage_brand_kit_content_type',
    description: `Create or update a content type for a Brand Kit. Omit \`id\` to create a new content type; provide \`id\` to update an existing one.`,
    params: [
      { name: 'brand_kit_id', type: 'integer', required: true, description: `The Brand Kit ID` },
      { name: 'cta_text', type: 'string', required: false, description: `Call-to-action text` },
      { name: 'cta_url', type: 'string', required: false, description: `Call-to-action URL` },
      { name: 'header_case', type: 'string', required: false, description: `Header case style` },
      {
        name: 'header_case_custom_value',
        type: 'string',
        required: false,
        description: `Custom header case rules (when header_case is custom)`,
      },
      {
        name: 'id',
        type: 'integer',
        required: false,
        description: `Content type ID (omit to create new)`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Content type name (required on create)`,
      },
      {
        name: 'sample_url',
        type: 'string',
        required: false,
        description: `URL of a content sample (only used on create)`,
      },
      {
        name: 'template_outline',
        type: 'string',
        required: false,
        description: `Template outline`,
      },
    ],
  },
  {
    name: 'airopsmcp_manage_brand_kit_custom_variable',
    description: `Before creating a custom variable, you MUST analyze the user's intent and suggest the appropriate Brand Kit dimension instead.`,
    params: [
      { name: 'brand_kit_id', type: 'integer', required: true, description: `The Brand Kit ID` },
      {
        name: 'id',
        type: 'integer',
        required: false,
        description: `Custom variable ID (omit to create new)`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Custom variable name (required on create)`,
      },
      {
        name: 'value',
        type: 'string',
        required: false,
        description: `Custom variable value (required on create, editable on update)`,
      },
    ],
  },
  {
    name: 'airopsmcp_manage_brand_kit_font',
    description: `Create or update a font for a Brand Kit. Omit \`id\` to create a new font; provide \`id\` to update an existing one.`,
    params: [
      { name: 'brand_kit_id', type: 'integer', required: true, description: `The Brand Kit ID` },
      {
        name: 'file_url',
        type: 'string',
        required: false,
        description: `Publicly accessible URL to a font file (TTF, OTF, WOFF, WOFF2, or EOT). Use signed_id instead if the file was uploaded via create_brand_kit_direct_upload. Pass null or empty to leave the existing file unchanged.`,
      },
      {
        name: 'google_font_link',
        type: 'string',
        required: false,
        description: `Google Fonts URL for this font (e.g. https://fonts.google.com/specimen/Inter). Pass null or empty string to clear.`,
      },
      { name: 'id', type: 'integer', required: false, description: `Font ID (omit to create new)` },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Font name, e.g. "Inter" or "Brand Heading Font" (required on create)`,
      },
      {
        name: 'signed_id',
        type: 'string',
        required: false,
        description: `Signed blob ID returned by create_brand_kit_direct_upload after a direct upload. Preferred over file_url when the user has a local file. Pass null to leave the existing file unchanged.`,
      },
      {
        name: 'usage_instructions',
        type: 'string',
        required: false,
        description: `Instructions for agents on when and how to use this font. Pass null or empty string to clear.`,
      },
    ],
  },
  {
    name: 'airopsmcp_manage_brand_kit_logo_size',
    description: `Create or update a logo size for a Brand Kit. Omit \`id\` to create a new logo size; provide \`id\` to update an existing one.`,
    params: [
      { name: 'brand_kit_id', type: 'integer', required: true, description: `The Brand Kit ID` },
      {
        name: 'height',
        type: 'integer',
        required: false,
        description: `Height in pixels. Pass null to clear.`,
      },
      {
        name: 'id',
        type: 'integer',
        required: false,
        description: `Logo size ID (omit to create new)`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Logo size name, e.g. "Web Banner" or "Social Media Square" (required on create)`,
      },
      {
        name: 'usage_instructions',
        type: 'string',
        required: false,
        description: `Instructions for agents on when and how to use this logo size. Pass null to clear.`,
      },
      {
        name: 'width',
        type: 'integer',
        required: false,
        description: `Width in pixels. Pass null to clear.`,
      },
    ],
  },
  {
    name: 'airopsmcp_manage_brand_kit_logo_variant',
    description: `Create or update a logo variant for a Brand Kit. Omit \`id\` to create a new logo variant; provide \`id\` to update an existing one.`,
    params: [
      { name: 'brand_kit_id', type: 'integer', required: true, description: `The Brand Kit ID` },
      {
        name: 'background_color',
        type: 'string',
        required: false,
        description: `Background color as a hex value (e.g. #ffffff). Pass null to clear.`,
      },
      {
        name: 'file_url',
        type: 'string',
        required: false,
        description: `Publicly accessible URL to a PNG or SVG image. Use signed_id instead if the file was uploaded via create_brand_kit_direct_upload. Pass null to leave the existing file unchanged.`,
      },
      {
        name: 'id',
        type: 'integer',
        required: false,
        description: `Logo variant ID (omit to create new)`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Logo variant name, e.g. "Primary Logo" or "Dark Background Logo" (required on create)`,
      },
      {
        name: 'signed_id',
        type: 'string',
        required: false,
        description: `Signed blob ID returned by create_brand_kit_direct_upload after a direct upload. Preferred over file_url when the user has a local file. Pass null to leave the existing file unchanged.`,
      },
      {
        name: 'usage_instructions',
        type: 'string',
        required: false,
        description: `Instructions for agents on when and how to use this logo, e.g. "Use on dark backgrounds only". Pass null to clear.`,
      },
    ],
  },
  {
    name: 'airopsmcp_manage_brand_kit_palette',
    description: `Create or update a color palette for a Brand Kit. Omit \`id\` to create a new palette; provide \`id\` to update an existing one.`,
    params: [
      { name: 'brand_kit_id', type: 'integer', required: true, description: `The Brand Kit ID` },
      {
        name: 'id',
        type: 'integer',
        required: false,
        description: `Palette ID (omit to create new)`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `The palette name, e.g. "Primary" (required on create)`,
      },
    ],
  },
  {
    name: 'airopsmcp_manage_brand_kit_palette_color',
    description: `Create or update a color within a Brand Kit palette. Omit \`id\` to create a new color; provide \`id\` to update an existing one.`,
    params: [
      { name: 'brand_kit_id', type: 'integer', required: true, description: `The Brand Kit ID` },
      {
        name: 'id',
        type: 'integer',
        required: false,
        description: `Color ID (omit to create new)`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Color name, e.g. "Brand Blue" (required on create)`,
      },
      {
        name: 'palette_id',
        type: 'integer',
        required: false,
        description: `The palette ID (required on create)`,
      },
      {
        name: 'usage_instructions',
        type: 'string',
        required: false,
        description: `Instructions for agents on when and how to use this color`,
      },
      {
        name: 'value',
        type: 'string',
        required: false,
        description: `Hex color value, e.g. "#0055ff" (required on create)`,
      },
    ],
  },
  {
    name: 'airopsmcp_manage_brand_kit_product_line',
    description: `Create or update a product line for a Brand Kit. Omit \`id\` to create a new product line; provide \`id\` to update an existing one.`,
    params: [
      { name: 'brand_kit_id', type: 'integer', required: true, description: `The Brand Kit ID` },
      { name: 'details', type: 'string', required: false, description: `Product line details` },
      {
        name: 'id',
        type: 'integer',
        required: false,
        description: `Product line ID (omit to create new)`,
      },
      {
        name: 'ideal_customer_profile',
        type: 'string',
        required: false,
        description: `Ideal customer profile`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Product line name (required on create)`,
      },
      { name: 'positioning', type: 'string', required: false, description: `Product positioning` },
      { name: 'url', type: 'string', required: false, description: `Product line URL` },
    ],
  },
  {
    name: 'airopsmcp_manage_brand_kit_region',
    description: `Create or update a region for a Brand Kit. Omit \`id\` to create a new region; provide \`id\` to update an existing one.`,
    params: [
      { name: 'brand_kit_id', type: 'integer', required: true, description: `The Brand Kit ID` },
      { name: 'description', type: 'string', required: false, description: `Region description` },
      {
        name: 'icon_name',
        type: 'string',
        required: false,
        description: `Flag icon name (e.g. flag-us, flag-gb). Pass empty string or null to clear.`,
      },
      {
        name: 'id',
        type: 'integer',
        required: false,
        description: `Region ID (omit to create new)`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Region name (required on create)`,
      },
    ],
  },
  {
    name: 'airopsmcp_manage_brand_kit_type_size',
    description: `Create or update a type size for a Brand Kit. Omit \`id\` to create a new type size; provide \`id\` to update an existing one.`,
    params: [
      { name: 'brand_kit_id', type: 'integer', required: true, description: `The Brand Kit ID` },
      {
        name: 'font_id',
        type: 'integer',
        required: false,
        description: `ID of the font this type size belongs to`,
      },
      {
        name: 'id',
        type: 'integer',
        required: false,
        description: `Type size ID (omit to create new)`,
      },
      {
        name: 'line_height',
        type: 'number',
        required: false,
        description: `Line height as a decimal multiplier, e.g. 1.5.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Type size name, e.g. "H1 Display" or "Body Regular" (required on create)`,
      },
      { name: 'size', type: 'integer', required: false, description: `Font size in pixels.` },
      {
        name: 'usage_instructions',
        type: 'string',
        required: false,
        description: `Instructions for agents on when and how to use this type size. Pass null or empty string to clear.`,
      },
      {
        name: 'weight',
        type: 'integer',
        required: false,
        description: `Font weight as an integer (100–900), e.g. 400 or 700.`,
      },
    ],
  },
  {
    name: 'airopsmcp_manage_brand_kit_usage_rule',
    description: `Create or update a usage rule for a Brand Kit. Omit \`id\` to create a new usage rule; provide \`id\` to update an existing one.`,
    params: [
      { name: 'brand_kit_id', type: 'integer', required: true, description: `The Brand Kit ID` },
      {
        name: 'applies_to',
        type: 'string',
        required: false,
        description: `What this rule applies to. Required on create; ignored on update.`,
      },
      {
        name: 'id',
        type: 'integer',
        required: false,
        description: `Usage rule ID (omit to create new)`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `The usage rule text, e.g. "Use only on white backgrounds" (required on create)`,
      },
    ],
  },
  {
    name: 'airopsmcp_manage_brand_kit_visual_example',
    description: `Create or update a visual example for a Brand Kit's Data Visualization section. Omit \`id\` to create a new visual example; provide \`id\` to update an existing one...`,
    params: [
      { name: 'brand_kit_id', type: 'integer', required: true, description: `The Brand Kit ID` },
      {
        name: 'file_url',
        type: 'string',
        required: false,
        description: `Publicly accessible URL to a PNG, JPG, SVG, GIF, or WebP image. Use signed_id instead if the file was uploaded via create_brand_kit_direct_upload. Pass null to leave the existing file unchanged.`,
      },
      {
        name: 'id',
        type: 'integer',
        required: false,
        description: `Visual example ID (omit to create new)`,
      },
      {
        name: 'sample_url',
        type: 'string',
        required: false,
        description: `Optional URL to a live sample. Pass null to clear.`,
      },
      {
        name: 'signed_id',
        type: 'string',
        required: false,
        description: `Signed blob ID returned by create_brand_kit_direct_upload after a direct upload. Preferred over file_url when the user has a local file. Pass null to leave the existing file unchanged.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Title of the visual example, e.g. "Dashboard Overview" (required on create)`,
      },
      {
        name: 'usage_instructions',
        type: 'string',
        required: false,
        description: `Instructions for agents on when and how to use this visual example. Pass null to clear.`,
      },
    ],
  },
  {
    name: 'airopsmcp_manage_brand_kit_visual_use_case',
    description: `Create or update a Visual Use Case for a Brand Kit.
A Visual Use Case is a named grouping of visual examples that share a common set of instructions
for when and how to apply them (e.g., "Hero sections", "Social posts", "Email headers").

Omit \`id\` to create a new visual use case; provide \`id\` to update an existing one.
On update, only provided fields are changed.

This tool edits the Brand Kit draft version only; it does not change the active (live) version.

IMPORTANT: Always show the user exactly which fields will be created or changed and ask for confirmation before calling this tool.`,
    params: [
      { name: 'brand_kit_id', type: 'integer', required: true, description: `The Brand Kit ID` },
      {
        name: 'id',
        type: 'integer',
        required: false,
        description: `Visual use case ID (omit to create new)`,
      },
      {
        name: 'instructions',
        type: 'string',
        required: false,
        description: `Free-form instructions for when and how to apply the visual examples grouped under this visual use case. Pass null to clear.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Name of the visual use case, e.g. "Hero sections" (required on create)`,
      },
    ],
  },
  {
    name: 'airopsmcp_manage_brand_kit_writing_rule',
    description: `Create or update a writing rule for a Brand Kit. Omit \`id\` to create a new rule; provide \`id\` to update an existing one.`,
    params: [
      { name: 'brand_kit_id', type: 'integer', required: true, description: `The Brand Kit ID` },
      {
        name: 'audience_id',
        type: 'integer',
        required: false,
        description: `Audience ID to scope this rule to (mutually exclusive with content_type_id and region_id). Only on create.`,
      },
      {
        name: 'content_type_id',
        type: 'integer',
        required: false,
        description: `Content type ID to scope this rule to (mutually exclusive with audience_id and region_id). Only on create.`,
      },
      {
        name: 'id',
        type: 'integer',
        required: false,
        description: `Writing rule ID (omit to create new)`,
      },
      {
        name: 'region_id',
        type: 'integer',
        required: false,
        description: `Region ID to scope this rule to (mutually exclusive with content_type_id and audience_id). Only on create.`,
      },
      {
        name: 'text',
        type: 'string',
        required: false,
        description: `Writing rule text (required on create)`,
      },
    ],
  },
  {
    name: 'airopsmcp_publish_brand_kit',
    description: `Publish a Brand Kit's current draft so changes become active. This promotes the current draft to active and creates a fresh draft from it.`,
    params: [
      {
        name: 'brand_kit_id',
        type: 'integer',
        required: true,
        description: `The Brand Kit ID to publish`,
      },
    ],
  },
  {
    name: 'airopsmcp_query_analytics',
    description: `Query analytics data for a Brand Kit with flexible metrics, dimensions, and filters.`,
    params: [
      {
        name: 'brand_kit_id',
        type: 'integer',
        required: true,
        description: `The Brand Kit ID to query analytics for`,
      },
      {
        name: 'metrics',
        type: 'array',
        required: true,
        description: `Metrics to calculate and display (e.g., citation_rate, mention_rate, share_of_voice).`,
      },
      {
        name: 'brand_mentioned',
        type: 'string',
        required: false,
        description: `Filter by prompt type. Options: category (generic prompts - recommended for accurate visibility metrics), brand (prompts mentioning the brand). Defaults to category if not specified`,
      },
      {
        name: 'countries',
        type: 'array',
        required: false,
        description: `Filter by country codes (ISO 3166-1 alpha-2)`,
      },
      {
        name: 'dimensions',
        type: 'array',
        required: false,
        description: `Dimensions to group by (max 3).`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `End date (YYYY-MM-DD). Defaults to yesterday. Must be before today because today's data may still be processing and is incomplete — yesterday is used to ensure robust, complete data. Leave blank unless a specific date is requested.`,
      },
      {
        name: 'grain',
        type: 'string',
        required: false,
        description: `Time granularity for aggregation. Default: total`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum rows to return (1-1000). Default: 100`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Custom sort order (e.g., "citation_count DESC")`,
      },
      { name: 'personas', type: 'array', required: false, description: `Filter by persona IDs` },
      { name: 'providers', type: 'array', required: false, description: `Filter by AI providers` },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `Start date (YYYY-MM-DD). Default: 7 days ago`,
      },
      {
        name: 'tags',
        type: 'array',
        required: false,
        description: `Filter by tag IDs. Returns data only for prompts tagged with any of the given tags.`,
      },
      {
        name: 'themes',
        type: 'array',
        required: false,
        description: `Filter sentiment data by theme IDs. Only applies to sentiment_score metric.`,
      },
      { name: 'topics', type: 'array', required: false, description: `Filter by topic IDs` },
    ],
  },
  {
    name: 'airopsmcp_read_grid',
    description: `Read rows from a grid table. Returns rows as objects with column titles as keys.`,
    params: [
      {
        name: 'grid_id',
        type: 'integer',
        required: true,
        description: `The ID of the grid to read from.`,
      },
      {
        name: 'grid_table_id',
        type: 'integer',
        required: true,
        description: `The ID of the grid table (sheet) to read.`,
      },
      {
        name: 'column_ids',
        type: 'array',
        required: false,
        description: `Optional list of column IDs to include. If omitted, all columns are returned.`,
      },
      {
        name: 'filters',
        type: 'array',
        required: false,
        description: `Optional filters to apply.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of rows to return (1-100, default 50).`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Row offset for pagination (default: 0). Use with limit to page through results.`,
      },
      {
        name: 'truncate',
        type: 'integer',
        required: false,
        description: `Maximum number of characters per cell value. 0 means no truncation (default).`,
      },
    ],
  },
  {
    name: 'airopsmcp_read_grid_cell',
    description: `Read the full value of a single grid cell. read_grid() truncates cell values; use this tool when you need the complete content of one cell (e.g. a full article, brief, or HTML payload). Identify the cell via the row __id and column id returned by read_grid().`,
    params: [
      {
        name: 'column_id',
        type: 'integer',
        required: true,
        description: `The grid column ID (from the columns array returned by read_grid).`,
      },
      { name: 'grid_id', type: 'integer', required: true, description: `The ID of the grid.` },
      {
        name: 'grid_table_id',
        type: 'integer',
        required: true,
        description: `The ID of the grid table (sheet).`,
      },
      {
        name: 'row_id',
        type: 'integer',
        required: true,
        description: `The row ID (the __id field returned by read_grid).`,
      },
    ],
  },
  {
    name: 'airopsmcp_reject_opportunity',
    description: `Reject pending opportunities for a campaign. For v2 campaigns, pass opportunity_ids; opportunity item selection and rejection reasons are v1-only. Before calling this tool, summarize the opportunities or opportunity items that will be rejected and get explicit user confirmation.`,
    params: [
      { name: 'play_id', type: 'integer', required: true, description: `Campaign ID.` },
      {
        name: 'opportunity_ids',
        type: 'array',
        required: false,
        description: `Opportunity IDs to reject. Required for v2; for v1 this rejects every pending item in each opportunity.`,
      },
      {
        name: 'opportunity_item_ids',
        type: 'array',
        required: false,
        description: `V1-only opportunity item IDs to reject. Use this for item-level rejection.`,
      },
      {
        name: 'rejection_reason',
        type: 'string',
        required: false,
        description: `V1-only optional reason to store on rejected opportunity items.`,
      },
    ],
  },
  {
    name: 'airopsmcp_run_grid_rows',
    description: `Trigger execution of one or more grid rows. This runs all workflow (app execution) columns for each specified row in dependency order.`,
    params: [
      {
        name: 'grid_id',
        type: 'integer',
        required: true,
        description: `The ID of the grid containing the rows to execute.`,
      },
      {
        name: 'grid_row_ids',
        type: 'array',
        required: true,
        description: `IDs of the grid rows to execute (max 50).`,
      },
      {
        name: 'grid_table_id',
        type: 'integer',
        required: true,
        description: `The ID of the grid table (sheet) containing the rows.`,
      },
    ],
  },
  {
    name: 'airopsmcp_search_knowledge_base',
    description: `Search a Knowledge Base for relevant content using semantic similarity. Use list_knowledge_bases() first to find available Knowledge Bases and their IDs.`,
    params: [
      {
        name: 'knowledge_base_id',
        type: 'integer',
        required: true,
        description: `The ID of the Knowledge Base to search.`,
      },
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `The search query. Use natural language to describe what you are looking for.`,
      },
      {
        name: 'top_k',
        type: 'integer',
        required: false,
        description: `Number of results to return (1-20, default 5).`,
      },
    ],
  },
  {
    name: 'airopsmcp_suggest_brand_kit_edits',
    description: `Suggest edits to a Brand Kit's fields without applying them. Returns a comparison of current vs suggested values for user review.`,
    params: [
      { name: 'brand_kit_id', type: 'integer', required: true, description: `The Brand Kit ID` },
      {
        name: 'suggestions',
        type: 'object',
        required: true,
        description: `Field name to suggested value pairs. Valid fields depend on entity_type. Use arrays for multi_select fields (e.g. product_line_ids).`,
      },
      {
        name: 'entity_type',
        type: 'string',
        required: false,
        description: `Which entity to suggest edits for. Defaults to brand_kit.`,
      },
      {
        name: 'id',
        type: 'integer',
        required: false,
        description: `Record ID of the existing record to update. Omit to suggest creating a new record.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Optional heading to display in the review UI`,
      },
    ],
  },
  {
    name: 'airopsmcp_track_aeo_page_content_update',
    description: `Track a page content update (publish/refresh) to correlate future analytics with content changes.`,
    params: [
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `The type of content update to track`,
      },
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `The page URL to track (max 512 characters). The URL must belong to a brand_url or domain configured in one of the workspace's Brand Kits (use get_insights_settings to see domains). For example, if the Brand Kit domain is "example.com", URLs like "https://example.com/blog/post" will match.`,
      },
      {
        name: 'workspace_id',
        type: 'integer',
        required: true,
        description: `The workspace ID to create the content update in`,
      },
    ],
  },
  {
    name: 'airopsmcp_update_aeo_prompt_assignments',
    description: `Update the country, persona, and platform assignments of one or more existing AEO
prompts on a Brand Kit. Writes to the brand kit's draft session ONLY — changes do
NOT take effect until you call \`commit_aeo_prompt_assignments\`.

Semantics:
- For each entry in \`prompts\`, a non-empty array REPLACES that prompt's current
  draft assignments for the given dimension.
- An empty array CLEARS that dimension on the prompt.
- Omitting a dimension or passing null leaves that dimension UNCHANGED.
- At most 100 prompts can be updated per call.

Workflow:
1. Call \`update_aeo_prompt_assignments\` to stage your changes in the draft.
2. Inspect \`limit_exceeded\` in the response. If true, the workspace would exceed
   its estimated-answers quota on commit. Adjust by calling
   \`update_aeo_prompt_assignments\` again, or call
   \`discard_aeo_prompt_assignments\` to abandon.
3. When ready, call \`commit_aeo_prompt_assignments\` to apply the draft to live.
   Always confirm with the user before committing.

IMPORTANT — shared draft with the UI:
- There is one draft per brand kit, shared between MCP and the human-facing UI.
- If the user has unsaved UI edits, your edits accumulate in the same draft. A
  subsequent commit will publish both sets of edits together; a discard will
  destroy both. Surface this to the user before committing or discarding.

To discover prompt IDs and current assignments, use \`list_aeo_prompts\`.
To inspect current draft state without modifying it, use
\`get_aeo_prompt_assignments_status\`.`,
    params: [
      {
        name: 'brand_kit_id',
        type: 'integer',
        required: true,
        description: `The Brand Kit ID owning the prompts to update.`,
      },
      {
        name: 'prompts',
        type: 'array',
        required: true,
        description: `Per-prompt assignment updates. Empty arrays clear a dimension; omitted or null dimensions remain unchanged.`,
      },
    ],
  },
  {
    name: 'airopsmcp_update_aeo_tag',
    description: `Update an existing AEO tag's name and/or color on a Brand Kit.

Behavior:
- At least one of \`name\` or \`color\` must be provided.
- If \`name\` is provided, it must remain unique within the Brand Kit
  (case-insensitive).
- Valid colors: light_grey, grey, green, teal, blue, purple, lilac, pink, red, coral, orange.
- Existing taggings on prompts are preserved — only the tag's own attributes change.

IMPORTANT: Always show the user the tag (current name) and the change you plan to
apply, and get explicit confirmation before calling. You can verify the change by
calling \`list_tags\`.`,
    params: [
      {
        name: 'brand_kit_id',
        type: 'integer',
        required: true,
        description: `The Brand Kit ID that owns the tag.`,
      },
      { name: 'tag_id', type: 'integer', required: true, description: `The tag ID to update.` },
      {
        name: 'color',
        type: 'string',
        required: false,
        description: `Optional. New color from the platform palette.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Optional. New name for the tag. Must be unique within the Brand Kit (case-insensitive).`,
      },
    ],
  },
  {
    name: 'airopsmcp_update_brand_kit',
    description: `Update a Brand Kit's base fields. Only provided fields are changed.`,
    params: [
      {
        name: 'brand_kit_id',
        type: 'integer',
        required: true,
        description: `The Brand Kit ID to update`,
      },
      {
        name: 'brand_about',
        type: 'string',
        required: false,
        description: `Description/overview of the brand`,
      },
      { name: 'brand_name', type: 'string', required: false, description: `Name of the brand` },
      {
        name: 'brand_url',
        type: 'string',
        required: false,
        description: `URL of the brand website`,
      },
      {
        name: 'writing_persona',
        type: 'string',
        required: false,
        description: `The persona/voice used in brand writing`,
      },
      {
        name: 'writing_tone',
        type: 'string',
        required: false,
        description: `The tone of voice for brand content`,
      },
    ],
  },
  {
    name: 'airopsmcp_update_topic',
    description: `Update an existing AEO topic's name and/or color on a Brand Kit.

Behavior:
- At least one of \`name\` or \`color\` must be provided.
- If \`name\` is provided, it must remain unique within the Brand Kit.
- Valid colors: light_grey, grey, green, teal, blue, purple, lilac, pink, red, coral, orange.
- Existing prompt assignments are preserved. This tool cannot move a topic to another
  Brand Kit.

IMPORTANT: Always show the user the topic (current name) and the change you plan to
apply, and get explicit confirmation before calling. You can verify the change by
calling \`list_topics\`.`,
    params: [
      {
        name: 'brand_kit_id',
        type: 'integer',
        required: true,
        description: `The Brand Kit ID that owns the topic.`,
      },
      { name: 'topic_id', type: 'integer', required: true, description: `The topic ID to update.` },
      {
        name: 'color',
        type: 'string',
        required: false,
        description: `Optional. New color from the platform palette.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Optional. New name for the topic. Must be unique within the Brand Kit.`,
      },
    ],
  },
  {
    name: 'airopsmcp_write_grid',
    description: `Create or update rows in a grid table. When mode is 'create', rows are added as new rows with column titles as keys.`,
    params: [
      {
        name: 'grid_id',
        type: 'integer',
        required: true,
        description: `The ID of the grid to write to.`,
      },
      {
        name: 'grid_table_id',
        type: 'integer',
        required: true,
        description: `The ID of the grid table (sheet) to write to.`,
      },
      {
        name: 'mode',
        type: 'string',
        required: true,
        description: `'create' to add new rows, 'update' to modify existing rows (requires __id in each row).`,
      },
      {
        name: 'rows',
        type: 'array',
        required: true,
        description: `Array of row objects. Keys are column titles, values are cell values. For update mode, include __id with the row ID.`,
      },
    ],
  },
]
