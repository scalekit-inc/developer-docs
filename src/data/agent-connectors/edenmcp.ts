import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'edenmcp_eden_add_table_rows',
    description: `Append rows to an existing Eden table. Read the table first with eden_read_table to learn its exact column names and select options -- cells are keyed by column NAME, option values by name (unknown select options are created automatically). Anything that can't resolve comes back in a 'warnings' field -- fix and retry those rows only. Rows are lightweight records; no documents are created.`,
    params: [
      {
        name: 'itemId',
        type: 'string',
        required: true,
        description: `Table item id (type === "table").`,
      },
      {
        name: 'rows',
        type: 'array',
        required: true,
        description: `Rows to append. Each row may set a title, the built-in done flag, and cells keyed by column NAME (e.g. {"Status": "In progress"}). Up to 100 rows per call.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `Workspace id, for usage attribution. Uses the configured default workspace when omitted.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_analyze_creator',
    description: `Analyze a specific creator's content by name, handle, or URL: identity, totals, topic/format breakdowns, and a curated set of best posts (real outliers padded with recent posts). Use eden_resolve_creator first when unsure which creator is meant, or pass a pre-resolved creatorRef to skip that hop. For the user's own account performance, prefer eden_get_analytics / eden_list_analytics_posts instead.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Free-text identifier (handle, name, URL). Required even when creatorRef is set, for fallback messaging.`,
      },
      {
        name: 'creatorRef',
        type: 'object',
        required: false,
        description: `Pre-resolved (platform, username), skipping the resolver hop. Use after eden_resolve_creator when you've picked a specific candidate. Shape: {"platform": "twitter", "username": "thedankoe"}.`,
      },
      {
        name: 'focus',
        type: 'string',
        required: false,
        description: `Free-text hint about what the user is trying to understand (e.g. "hook structure", "topic mix"). Echoed back so the assistant can frame its analysis around it.`,
      },
      {
        name: 'platform',
        type: 'string',
        required: false,
        description: `Constrain to one platform. Omit to consider all.`,
      },
      {
        name: 'refresh',
        type: 'boolean',
        required: false,
        description: `Set true only when the user explicitly asks to update/check the creator's latest posts. Runs an on-demand upstream pass and waits briefly before analyzing.`,
      },
      {
        name: 'since',
        type: 'string',
        required: false,
        description: `Time window for breakdown + top-posts query. Defaults to lifetime.`,
      },
      {
        name: 'topPostLimit',
        type: 'integer',
        required: false,
        description: `How many top posts to surface. Defaults to 8.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `Workspace id from eden_list_workspaces. Required for accurate billing + the daily new-creator cap when this call triggers a fresh pull of a creator nobody on Eden has searched before.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_analyze_list',
    description: `Fetch a curated creator list's metadata plus its creator roster (sorted by follower count), for summarizing a cohort or picking a creator to deep-dive on. Omit both query and listRef to instead get a roster-of-lists mode: every social list in the workspace with id, name, slug, kind, description, and member count.`,
    params: [
      {
        name: 'listRef',
        type: 'object',
        required: false,
        description: `Pre-resolved list reference, skipping the fuzzy match pass. Shape: {"listId": "<id>"}.`,
      },
      {
        name: 'memberLimit',
        type: 'integer',
        required: false,
        description: `How many members to return. Defaults to 40 when omitted.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `List name, slug, or partial match. Omit along with listRef to get the roster-of-lists mode instead of a single-list analysis.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `ID of the workspace context for the analysis. Uses the default workspace if omitted.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_append_to_note',
    description: `Append markdown to the end of an existing note, keeping everything already in it. Use only to add genuinely new material (e.g. a daily log entry); to revise, rewrite, or regenerate a note, use eden_update_note with the full new body instead -- append concatenates onto the note's current server-side content and is NOT idempotent, so calling it twice appends the text twice.`,
    params: [
      {
        name: 'content',
        type: 'string',
        required: true,
        description: `Markdown to append to the end of the note. Only the new text -- Eden inserts a blank line before it.`,
      },
      {
        name: 'itemId',
        type: 'string',
        required: true,
        description: `Note item id (an item with type: "markdown"). Find it with eden_get_note_markdown or eden_search_workspace_items.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `Workspace id from eden_list_workspaces. Uses the configured default workspace when omitted.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_cancel_scheduled_post',
    description: `Cancel a scheduled post or delete a draft in Eden by id, removing it permanently from the publish queue. Find the id with eden_list_scheduled_posts. Cannot cancel a post that is already publishing or already posted.`,
    params: [
      {
        name: 'postId',
        type: 'string',
        required: true,
        description: `Scheduled post / draft id from eden_list_scheduled_posts.`,
      },
      {
        name: 'scheduleId',
        type: 'string',
        required: false,
        description: `Optional schedule id to guard against cancelling a post on another schedule.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_connect_items',
    description: `Create item-to-item connections (backlinks) between Eden workspace items: each source item gets linked to the target item. Use when the user asks to connect, link, or relate items, e.g. 'connect these to my newsletter note'. Works for any item type including boards. Find item ids with eden_search_workspace_items / eden_find_workspace_items first. Idempotent: an already-connected pair (either direction) is reported as alreadyConnected instead of duplicated.`,
    params: [
      {
        name: 'sourceItemIds',
        type: 'array',
        required: true,
        description: `Item ids to connect FROM. Each gets an edge to the target item.`,
      },
      {
        name: 'targetItemId',
        type: 'string',
        required: true,
        description: `Item id to connect TO, e.g. the newsletter note or a board.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `Workspace id. Uses the configured default workspace when omitted.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_connect_social_accounts',
    description: `Check and set up the user's social account connections in Eden. Three actions: "status" lists what is connected right now (per platform, with handles). "get-link" mints a secure, personal account-linking link the user opens to authorize X, LinkedIn, Instagram, Threads, or TikTok. "sync" registers what they linked -- always call it after the user says they finished linking, or the new connections will not appear in Eden. Substack cannot be linked through this flow; the user connects it in the Eden web app under Settings > Social accounts instead. The linking link is tied to this user's workspace -- never share it anywhere public.`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: true,
        description: `status = list current connections; get-link = mint the account-linking URL for the user; sync = reconcile after the user finishes linking.`,
      },
      {
        name: 'brandId',
        type: 'string',
        required: false,
        description: `Connect accounts under a specific brand (brand ids from eden_list_schedules). Omit for the workspace default.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `Workspace id. Uses the configured default workspace when omitted.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_create_auto_dm_automation',
    description: `Create an Instagram Auto-DM automation on the user's connected Instagram, e.g. 'when someone comments LINK on my next post, DM them my guide'. Triggers: comment keyword -> DM, story reply -> DM, DM keyword -> DM, DM reaction -> DM, or a public comment reply. DMs can carry a link; links get a click-tracked short link by default. Each DM sent costs 1 credit. This tool clarifies instead of guessing: if required details are missing it returns a needs_clarification status -- ask the user those questions and call again with their answers. Never invent the DM message, keywords, link, or post choice.`,
    params: [
      {
        name: 'brandId',
        type: 'string',
        required: false,
        description: `Brand id whose Instagram the automation runs on (Studio brands). Pass "default" or omit for the workspace default brand.`,
      },
      {
        name: 'customCode',
        type: 'string',
        required: false,
        description: `Optional custom slug for the tracked link (3-32 chars: a-z, 0-9, hyphen). First-come-first-served and permanent -- only pass when the user asked for one.`,
      },
      {
        name: 'emoji',
        type: 'string',
        required: false,
        description: `dm_reaction only: restrict to one emoji. Omit = any reaction.`,
      },
      {
        name: 'keywords',
        type: 'array',
        required: false,
        description: `Trigger keywords (whole-word, case-insensitive; any match fires). Required for comment_keyword, dm_keyword, and comment_reply.`,
      },
      {
        name: 'link',
        type: 'string',
        required: false,
        description: `Optional http(s) link appended to the DM. Sent as a click-tracked short link unless trackLink=false. Not allowed on comment_reply (public replies can't carry links).`,
      },
      {
        name: 'message',
        type: 'string',
        required: false,
        description: `The DM text to send (for comment_reply: the public reply text). Required -- ask the user, never write it for them without their input.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Short label shown in the Auto-DM page. Optional -- derived from the trigger/keyword when omitted.`,
      },
      {
        name: 'postScope',
        type: 'string',
        required: false,
        description: `comment_keyword / comment_reply: which posts to watch -- one specific post, the next post published, or every new post. comment_reply supports specific/all only.`,
      },
      {
        name: 'publicReply',
        type: 'string',
        required: false,
        description: `comment_keyword only: also post a public reply to the matching comment, e.g. 'just sent it, check your DMs!'.`,
      },
      {
        name: 'targetPostId',
        type: 'string',
        required: false,
        description: `Required when postScope=specific: the Instagram post id, from the options this tool returns in its clarifying question (Meta Graph media ids -- never ids from other sources).`,
      },
      {
        name: 'trackLink',
        type: 'boolean',
        required: false,
        description: `Defaults to true. Set false to send the raw URL with no click tracking.`,
      },
      {
        name: 'triggerType',
        type: 'string',
        required: false,
        description: `What fires the automation. Omit to get the list of options back as a clarifying question.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `Workspace id. Uses the configured default workspace when omitted.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_create_board',
    description: `Create a new empty board (a canvas) in the user's Eden workspace and pin it to the top of their sidebar. Search for an existing board by title first with eden_search_workspace_items; only create when there's genuinely no match. Returns the board's itemId as boardId, for use with eden_create_note, eden_save_links_to_board, or eden_save_posts_to_board.`,
    params: [
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `Board title, e.g. 'Q3 Hooks'. Defaults to 'Untitled board' if blank.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `Workspace id from eden_list_workspaces. Uses the configured default workspace when omitted.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_create_custom_ai',
    description: `Create a workspace-scoped Custom AI (Eden's rebranded Skills feature) with durable instructions, starter prompts, and optional permission-checked Eden sources. This is a real write. Use exact board/item ids and normalized creator references; never invent source locators. Prefer workspace visibility, selected workspace access, retrieve activation, and memory off unless the user asks for broader behavior.`,
    params: [
      {
        name: 'definition',
        type: 'object',
        required: true,
        description: `The Custom AI's definition: name, instructions, and behavior settings. Example: {"name": "Brand Voice Coach", "instructionsMarkdown": "You help draft posts in our brand voice...", "starterPrompts": ["Draft a launch post"], "workspaceAccess": "selected", "memoryMode": "off"}.`,
      },
      {
        name: 'sources',
        type: 'array',
        required: false,
        description: `Optional permission-checked Eden sources (boards, items, creators, social posts) to ground the Custom AI's knowledge in. Use exact ids from eden_search_workspace_items / eden_find_workspace_items / eden_resolve_creator; never invent locators. Example: [{"locator": {"kind": "item", "itemId": "item_01hx2abc"}, "roles": ["knowledge"]}].`,
      },
      {
        name: 'visibility',
        type: 'string',
        required: false,
        description: `Who can see this Custom AI. Defaults to workspace (visible to workspace members) when omitted.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `Workspace id from eden_list_workspaces. Uses the workspace's configured default when omitted.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_create_note',
    description: `Create a new markdown item (note) in an Eden workspace or board. Two presentations: "document" (default) for drafted content the user keeps editing; "card" for a short canvas-visible text card (a sticky) used for quick captures, ideas, and reminders -- content is required for cards. Only creates new items; editing goes through eden_update_note. Retrying an identical call is safe and lands one item.`,
    params: [
      {
        name: 'boardId',
        type: 'string',
        required: false,
        description: `Compatibility alias for a board destination. Id of the destination board (item type: "canvas", or a folder).`,
      },
      {
        name: 'color',
        type: 'string',
        required: false,
        description: `Cards only: optional CSS color value, such as '#fff7a8'. Omit for Eden's default.`,
      },
      {
        name: 'content',
        type: 'string',
        required: false,
        description: `Full markdown body. Required for cards; max 20K chars in card mode, 200K chars in document mode.`,
      },
      {
        name: 'destination',
        type: 'object',
        required: false,
        description: `Explicit destination: {"kind": "library"} for a workspace-only item with no board placement, or {"kind": "board", "boardId": "<id>"}. Overrides boardId when both are set.`,
      },
      {
        name: 'presentation',
        type: 'string',
        required: false,
        description: `"document" (default) = an editable Document. "card" = a short canvas-visible text Card (sticky).`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Document title. Omit to derive from the first line of content. Ignored for cards.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `Workspace id from eden_list_workspaces. Uses the configured default workspace when omitted.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_create_scheduling_draft',
    description: `Deprecated stub. This tool moved to eden_schedule_post -- call eden_schedule_post with draft: true and the same content fields (no timestamp needed). Do not call this stub; it takes no parameters and performs no action.`,
    params: [],
  },
  {
    name: 'edenmcp_eden_create_skill',
    description: `Create a new AI skill (reusable prompt workflow) in the workspace.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The display name of the new skill.`,
      },
      {
        name: 'definition',
        type: 'string',
        required: false,
        description: `The skill definition as a JSON string describing its steps and configuration.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `A brief description of what the skill does.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `The workspace ID to create the skill in. Uses the default workspace if omitted.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_create_sticky_note',
    description: `Deprecated stub. This tool moved to eden_create_note -- call eden_create_note with presentation: "card" plus the same content / color / destination. Do not call this stub; it takes no parameters and performs no action.`,
    params: [],
  },
  {
    name: 'edenmcp_eden_delete_custom_ai',
    description: `Archive an editable Custom AI. This removes it from the active workspace catalog and cannot be undone from MCP. Call only after the user explicitly confirms deletion. Managed marketplace installs must be removed through their installation controls instead.`,
    params: [
      {
        name: 'confirmed',
        type: 'boolean',
        required: true,
        description: `Must be true, and only after the user has explicitly confirmed the deletion.`,
      },
      {
        name: 'customAIId',
        type: 'string',
        required: true,
        description: `Custom AI id from eden_list_custom_ai.`,
      },
      {
        name: 'expectedRevision',
        type: 'integer',
        required: true,
        description: `Current revision from eden_get_custom_ai. Prevents deleting a version the caller hasn't seen yet.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `Workspace id from eden_list_workspaces. Uses the workspace's configured default when omitted.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_delete_skill',
    description: `Permanently delete an AI skill by its ID. This action cannot be undone.`,
    params: [
      {
        name: 'skillId',
        type: 'string',
        required: true,
        description: `The unique identifier of the skill to permanently delete.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_export_skill',
    description: `Export a skill definition as a JSON string, suitable for backup or importing into another workspace.`,
    params: [
      {
        name: 'skillId',
        type: 'string',
        required: true,
        description: `The unique identifier of the skill to export.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_find_creator_in_workspace',
    description: `Find saved posts and content by a specific creator in an Eden workspace, identified by their handle.`,
    params: [
      {
        name: 'creatorHandle',
        type: 'string',
        required: true,
        description: `The handle or username of the creator whose content you want to find.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: true,
        description: `The unique identifier of the workspace to search within.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_find_workspace_items',
    description: `Semantic search over the user's Eden library -- describe what you're looking for in natural language and get their saved notes, documents, posts, links, and files ranked by MEANING, not just title match. Full note bodies, media transcripts, and AI-generated tags/keywords are all searchable, so a vague description like 'that note about pricing psychology' can still match. Use when the user describes content rather than names it exactly (e.g. 'find that note about X', 'where did I save the video on Y'). Costs 1 credit per call and requires a semantic-search-enabled workspace; falls back to eden_search_workspace_items on a 503.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Natural-language description of what to find.`,
      },
      {
        name: 'category',
        type: 'string',
        required: false,
        description: `Restrict results to items carrying one AI-assigned category.`,
      },
      {
        name: 'kind',
        type: 'string',
        required: false,
        description: `Restrict results to one item kind.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Max hits to return. Defaults to 10 when omitted.`,
      },
      {
        name: 'source',
        type: 'string',
        required: false,
        description: `Restrict social items to one platform.`,
      },
      {
        name: 'tags',
        type: 'array',
        required: false,
        description: `Restrict results to items carrying any of these AI-assigned tags.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `Workspace id. Uses the configured default workspace when omitted.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_following_overview',
    description: `List every creator the user follows in this workspace, deduplicated across all of their lists, with follower counts, profile info, the lists each creator appears in, and a creatorRef for follow-up eden_analyze_creator calls. Optionally filter by platform.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Max creators to return. Defaults to 100, maximum 500.`,
      },
      {
        name: 'platform',
        type: 'string',
        required: false,
        description: `Filter the following overview to a specific platform. Omit to return the full cross-platform roster.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `ID of the workspace context. Uses the default workspace if omitted.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_generate_carousel',
    description: `Generate an AI carousel (multi-slide image set) for social posts.`,
    params: [
      {
        name: 'prompt',
        type: 'string',
        required: true,
        description: `The text prompt describing the carousel content and theme to generate.`,
      },
      {
        name: 'slideCount',
        type: 'integer',
        required: false,
        description: `The number of slides to include in the carousel.`,
      },
      {
        name: 'style',
        type: 'string',
        required: false,
        description: `The visual style to apply to the carousel slides.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `The workspace ID to use for carousel generation.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_generate_image',
    description: `Generate an AI image for use in posts.`,
    params: [
      {
        name: 'prompt',
        type: 'string',
        required: true,
        description: `The text prompt describing the image to generate.`,
      },
      {
        name: 'height',
        type: 'integer',
        required: false,
        description: `The height of the generated image in pixels.`,
      },
      {
        name: 'style',
        type: 'string',
        required: false,
        description: `The visual style to apply to the generated image.`,
      },
      {
        name: 'width',
        type: 'integer',
        required: false,
        description: `The width of the generated image in pixels.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `The workspace ID to use for image generation.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_get_analytics',
    description: `The user's OWN social analytics across every connected platform (X, LinkedIn, Instagram, TikTok, YouTube, Threads, Facebook, Substack): period totals with vs-previous-period deltas, follower counts per account, current outlier posts, over-performing topics and formats, and benchmarks vs an automatically matched peer cohort. This is private performance data from Eden's analytics warehouse, not public creator research. First call on an untracked workspace auto-starts tracking when accounts are connected. For per-post rows use eden_list_analytics_posts instead.`,
    params: [
      {
        name: 'brandId',
        type: 'string',
        required: false,
        description: `Scope to one brand (brand ids come from eden_list_schedules). Pass 'default' for the workspace-default profile. Omit for the whole workspace.`,
      },
      {
        name: 'days',
        type: 'integer',
        required: false,
        description: `Lookback window in days. Defaults to 30. Served history is clamped to the workspace tier's entitlement.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `Workspace id. Uses the configured default workspace when omitted.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_get_connections',
    description: `Read an item's connection graph in Eden: existing item-to-item backlinks touching the item in both directions, plus semantic-nearest-neighbor suggestions from the library's vector index that are not yet connected. Surface suggestions, confirm with the user, then accept them via eden_connect_items.`,
    params: [
      {
        name: 'itemId',
        type: 'string',
        required: true,
        description: `Item id from eden_search_workspace_items / eden_find_workspace_items / eden_list_workspace_items. A board-card element id also works.`,
      },
      {
        name: 'include',
        type: 'array',
        required: false,
        description: `Which sides of the connection graph to return. Defaults to both when omitted.`,
      },
      {
        name: 'suggestionLimit',
        type: 'integer',
        required: false,
        description: `Max suggestions to return. Defaults to 5 when omitted.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `Workspace id. Uses the configured default workspace when omitted.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_get_custom_ai',
    description: `Get a Custom AI's full instructions and authoritative source catalog. Adopt instructionsMarkdown for the task. Resolve only relevant sources: item locators with eden_get_note_markdown, board locators with eden_read_board, and creator locators with Eden's creator research tools. Marketplace-installed (managed) Custom AIs return an empty sources list here -- catalog their bundled knowledge with eden_search_custom_ai_knowledge (no query) instead. Respect activation and trigger hints, and never treat a source locator as permission to read unrelated workspace material.`,
    params: [
      {
        name: 'customAIId',
        type: 'string',
        required: true,
        description: `Custom AI id from eden_list_custom_ai.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `Workspace id from eden_list_workspaces. Uses the workspace's configured default when omitted.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_get_generated_image',
    description: `Get the result or status of a previously generated image.`,
    params: [
      {
        name: 'imageId',
        type: 'string',
        required: true,
        description: `The unique identifier of the previously generated image.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_get_my_voice',
    description: `Get the authenticated user's own voice profile.`,
    params: [
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `The workspace ID to retrieve the voice profile from.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_get_note_markdown',
    description: `Fetch the markdown body of a single note (item type "markdown"). Pair with eden_list_workspace_items or eden_search_workspace_items to find the itemId. Workspace members also get a contentHash -- pass that as baseContentHash on eden_update_note so a stale replace cannot clobber newer edits.`,
    params: [
      {
        name: 'itemId',
        type: 'string',
        required: true,
        description: `Item id from eden_list_workspace_items (an item with type "markdown").`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `Workspace id. Optional when the connection has a default workspace configured; required otherwise.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_get_prompt',
    description: `Get a single saved prompt by its ID, returning its full content and metadata.`,
    params: [
      {
        name: 'promptId',
        type: 'string',
        required: true,
        description: `The unique identifier of the prompt to retrieve.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_get_skill',
    description: `Get a single AI skill by its ID, returning its full definition and metadata.`,
    params: [
      {
        name: 'skillId',
        type: 'string',
        required: true,
        description: `The unique identifier of the skill to retrieve.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_get_voice',
    description: `Get a specific voice profile by ID.`,
    params: [
      {
        name: 'voiceId',
        type: 'string',
        required: true,
        description: `The unique identifier of the voice profile to retrieve.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_import_skill',
    description: `Import a skill into the workspace from a JSON definition string, typically obtained via the Export Skill tool.`,
    params: [
      {
        name: 'skillJson',
        type: 'string',
        required: true,
        description: `The JSON string of the skill definition to import, as returned by the Export Skill tool.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `The workspace ID to import the skill into. Uses the default workspace if omitted.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_list_analytics_posts',
    description: `Per-post rows from the user's OWN analytics warehouse -- the raw material for charts, dashboards, and 'which posts did X' questions. Each row carries platform, posted date, link, text preview, metrics Eden has synced (views/likes/comments/shares/saves/impressions/reach/watch time/engagement rate), and index-derived signals (outlierScore, creatorPercentile). Sort by any metric to get top posts. For the summary/insight layer use eden_get_analytics instead.`,
    params: [
      {
        name: 'brandId',
        type: 'string',
        required: false,
        description: `Scope to one brand ('default' = workspace-default profile; omit for all brands).`,
      },
      {
        name: 'contentType',
        type: 'string',
        required: false,
        description: `Filter to one content type (e.g. 'reel', 'short', 'article', 'note').`,
      },
      {
        name: 'days',
        type: 'integer',
        required: false,
        description: `Lookback window in days. Defaults to the tier's full entitled history, which also clamps larger values.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Max rows to return. Defaults to 50 when omitted.`,
      },
      { name: 'platform', type: 'string', required: false, description: `Filter to one platform.` },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort column, descending. Defaults to postedAt.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `Workspace id. Uses the configured default workspace when omitted.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_list_auto_dm_rules',
    description: `List the workspace's Instagram Auto-DM automations: trigger, keywords, DM message, tracked link, status (active / paused / paused for credits / waiting for next post), click counts, and which posts an automation is armed on. Use before creating a new one (workspaces cap at 10 automations) or when the user asks what's running. Auto-DM is a Pro/Studio feature; each DM actually sent costs 1 credit.`,
    params: [
      {
        name: 'brandId',
        type: 'string',
        required: false,
        description: `Brand id to scope to one brand's Instagram (Studio). Pass "default" for the workspace default brand. Omit to list every automation.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `Workspace id. Uses the configured default workspace when omitted.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_list_brief_definitions',
    description: `List brief template definitions.`,
    params: [
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `The workspace ID to filter brief definitions by. If omitted, uses the default workspace.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_list_briefs',
    description: `List content briefs in a workspace.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor returned from a previous list response.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of briefs to return per page.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `The ID of the workspace whose briefs to list.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_list_captures',
    description: `List saved captures (bookmarks/swipes) in a workspace.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response to fetch the next page of results.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of captures to return per page.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `ID of the workspace to list captures from. Uses the default workspace if omitted.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_list_chats',
    description: `List the user's chats inside an Eden workspace. Returns each chat's id, title, status, and updatedAt. Read-only -- this tool does not start a chat or send a message.`,
    params: [
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `Workspace id from eden_list_workspaces. Uses the configured default workspace when omitted.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_list_creator_lists',
    description: `List creator lists (curated groups of creators) in a workspace.`,
    params: [
      {
        name: 'workspaceId',
        type: 'string',
        required: true,
        description: `ID of the workspace to list creator lists from.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_list_custom_ai',
    description: `List the Custom AI (Eden's rebranded Skills feature) available in an Eden workspace. A Custom AI combines durable instructions, conversation starters, capabilities, creator perspectives, and permission-checked workspace knowledge. Use eden_get_custom_ai to load the full definition before applying one.`,
    params: [
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `Workspace id from eden_list_workspaces. Uses the workspace's configured default when omitted.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_list_highlights',
    description: `List saved highlights in Eden, optionally scoped to a specific workspace. Supports pagination.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response to fetch the next page of results.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of highlights to return per page.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `The unique identifier of the workspace to filter highlights by. If omitted, returns highlights across all workspaces.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_list_prompts',
    description: `List saved prompts in the workspace, with optional pagination support.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response to fetch the next page of prompts.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of prompts to return per page.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `The workspace ID to list prompts from. Uses the default workspace if omitted.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_list_scheduled_posts',
    description: `List scheduled-post rows for the workspace or one schedule: drafts, scheduled, publishing, posted, partial, failed, or cancelled. Use this to inspect the queue, confirm what was just scheduled, or find a post id for a later edit/cancel call.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of scheduled posts to return per page. Defaults to 25 when omitted.`,
      },
      {
        name: 'mode',
        type: 'string',
        required: false,
        description: `Use compact when browsing recent posts for repurposing; full returns content and targets.`,
      },
      {
        name: 'postId',
        type: 'string',
        required: false,
        description: `Optional scheduled post id. Use with mode=full to inspect one post.`,
      },
      {
        name: 'scheduleId',
        type: 'string',
        required: false,
        description: `Filter posts by a specific schedule ID.`,
      },
      { name: 'status', type: 'string', required: false, description: `Optional status filter.` },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `The workspace ID to list scheduled posts for. If omitted, uses the default workspace.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_list_schedules',
    description: `List publishing schedules for a workspace.`,
    params: [
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `The workspace ID to list schedules for. If omitted, uses the default workspace.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_list_skills',
    description: `List AI skills (reusable prompt workflows) available in the workspace.`,
    params: [
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `The workspace ID to list skills from. Uses the default workspace if omitted.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_list_voices',
    description: `List available voice profiles for AI content generation.`,
    params: [
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `The workspace ID to list voice profiles for.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_list_workspace_items',
    description: `List the items the user has personally saved into a workspace's canvas (boards, notes, links, media, stacks), as a paginated flat list. Use parentId to find a board's children, and type to filter by item kind. Returns at most 'limit' items (default 200, max 500); check nextCursor for more pages.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Opaque pagination cursor. Pass the previous response's nextCursor to fetch the next page.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Max items per page. Defaults to 200. Server caps at 500 -- never request more, the response will be silently truncated.`,
      },
      {
        name: 'parentId',
        type: 'string',
        required: false,
        description: `Restrict to items whose parent is this board id. Pass the workspace id to list workspace-root children only.`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Optional type filter (e.g. markdown, canvas, twitter, youtube, image). Server-side, so it doesn't burn prompt tokens.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `Workspace id from eden_list_workspaces. Uses the configured default workspace when omitted.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_list_workspaces',
    description: `List all Eden workspaces the authenticated user belongs to. Returns workspace id, name, slug, and role for each workspace.`,
    params: [],
  },
  {
    name: 'edenmcp_eden_prepare_scheduling_media_upload',
    description: `Prepare a public media upload for a scheduled post asset. This does not upload bytes itself. Small files return a presigned PUT uploadUrl; large files return a multipart plan to drive with eden_scheduling_media_multipart. Pass the resulting publicUrl as media[].url only after the upload completes. Supported types: image/jpeg, image/png, image/webp, image/gif, application/pdf, video/mp4, video/quicktime, video/webm. Max size 10 GB.`,
    params: [
      {
        name: 'mimeType',
        type: 'string',
        required: true,
        description: `MIME type: image/jpeg, image/png, image/webp, image/gif, application/pdf, video/mp4, video/quicktime, or video/webm.`,
      },
      {
        name: 'sizeBytes',
        type: 'integer',
        required: true,
        description: `Exact file size in bytes. Max 10 GB (10737418240 bytes).`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `The workspace ID to associate the media upload with. If omitted, uses the default workspace.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_publish_post_now',
    description: `Immediately queue a social post for publishing in Eden. This is a real publish action, not a draft or proposal -- use only when the user explicitly asks to publish/post/send now. Supports text, media, per-platform overrides, X/Threads segments (threads), and long-form articles (Twitter/Substack). No longer takes a postId: this call composes and publishes a brand-new post in one step.`,
    params: [
      {
        name: 'article',
        type: 'object',
        required: false,
        description: `Canonical long-form article (Twitter Articles / Substack posts). Requires explicit platforms and may only target twitter and substack. Needs title and bodyHtml; substack targets additionally require the nested 'substack' settings object (audience, commentPermission, sendEmail, cta, paywall).`,
      },
      {
        name: 'idempotencyKey',
        type: 'string',
        required: false,
        description: `Optional retry-safe key. Same key + same content returns the same post instead of creating a duplicate.`,
      },
      {
        name: 'media',
        type: 'array',
        required: false,
        description: `Already-hosted media/document assets to attach. Each item needs a publicly fetchable 'url' (never a local file path); use eden_prepare_scheduling_media_upload first to host a local file.`,
      },
      {
        name: 'perPlatform',
        type: 'object',
        required: false,
        description: `Optional per-platform overrides for when one platform should differ from the rest (text, mediaIds subset, a unique thread, YouTube title, or Instagram trial reel). Keyed by platform name. Omit entirely to have every platform use the shared text and all shared media.`,
      },
      {
        name: 'platforms',
        type: 'array',
        required: false,
        description: `Platforms to publish to. Defaults to active text platforms when no media is provided; active platforms when media is provided.`,
      },
      {
        name: 'scheduleId',
        type: 'string',
        required: false,
        description: `Optional schedule id to publish under.`,
      },
      {
        name: 'segments',
        type: 'array',
        required: false,
        description: `Thread segments for X/Threads. Each segment is one post in the thread: {"text": "...", "mediaIds": ["..."]}.`,
      },
      {
        name: 'text',
        type: 'string',
        required: false,
        description: `Post text/caption, line breaks preserved. Use an empty string for a media-only post; text and media cannot both be empty.`,
      },
      {
        name: 'timezone',
        type: 'string',
        required: false,
        description: `IANA timezone. Defaults to the schedule's timezone.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `Workspace id from eden_list_workspaces. Uses the configured default workspace when omitted.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_read_board',
    description: `Read the full whiteboard contents of an Eden board: every sticky note, free-text label, shape-with-text, sub-folder label, and child item positioned on the canvas, plus section dividers. Find the board's itemId with eden_list_workspace_items or eden_search_workspace_items (items with type "canvas" or "folder").`,
    params: [
      {
        name: 'itemId',
        type: 'string',
        required: true,
        description: `Board id from eden_list_workspace_items (type "canvas" or "folder"). Pass the workspace id itself to read the workspace root.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `Workspace id. Uses the configured default workspace when omitted.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_read_brief',
    description: `Read a content brief by ID.`,
    params: [
      {
        name: 'briefId',
        type: 'string',
        required: true,
        description: `The unique identifier of the content brief to retrieve.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_read_brief_idea',
    description: `Read a specific idea within a content brief.`,
    params: [
      {
        name: 'briefId',
        type: 'string',
        required: true,
        description: `The unique identifier of the content brief containing the idea.`,
      },
      {
        name: 'ideaId',
        type: 'string',
        required: true,
        description: `The unique identifier of the idea to retrieve.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_read_card',
    description: `Deprecated stub. This tool moved to eden_read_social_post -- pass the card's url to eden_read_social_post (same includeTranscript / attemptLiveFetch options). Do not call this stub; it takes no parameters and performs no action.`,
    params: [],
  },
  {
    name: 'edenmcp_eden_read_custom_ai_knowledge',
    description: `Read one bundled knowledge document of a marketplace-installed (managed) Custom AI, by sourceId from eden_search_custom_ai_knowledge's catalog mode. Content is paged: pass offset (from the previous response's nextOffset) to continue a long document. To find WHERE something is discussed in a long document, use eden_search_custom_ai_knowledge first and read from the matching offset instead of paging blindly. Documents marked readable: false are publisher-protected (runtime-only) and always return a forbidden error -- do not retry them, tell the user the publisher restricted that document.`,
    params: [
      {
        name: 'customAIId',
        type: 'string',
        required: true,
        description: `Custom AI id from eden_list_custom_ai.`,
      },
      {
        name: 'sourceId',
        type: 'string',
        required: true,
        description: `Knowledge sourceId from eden_search_custom_ai_knowledge's catalog mode.`,
      },
      {
        name: 'maxChars',
        type: 'integer',
        required: false,
        description: `Max characters to return per call. Defaults to 24000 when omitted.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Character offset to start reading from. Use the previous response's nextOffset to continue a long document.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `Workspace id from eden_list_workspaces. Uses the workspace's configured default when omitted.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_read_media_card',
    description: `Read the processed content of a media or link card on a board: transcript and AI description for video/audio/loom/YouTube items, extracted text for PDFs, AI description for images. Find the item with eden_list_workspace_items first (type image/video/audio/pdf/loom/youtube/link).`,
    params: [
      {
        name: 'itemId',
        type: 'string',
        required: true,
        description: `Item id from eden_list_workspace_items.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `Workspace id. Uses the configured default workspace when omitted.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_read_social_post',
    description: `Read the full body (and transcript / carousel slide text, when available) of a single social post, identified either by contentId + platform from a prior social tool result, or by url (a saved link, a pasted post URL, or a Loom video). Pass exactly one of contentId or url. Transcripts only exist for YouTube/Instagram/TikTok.`,
    params: [
      {
        name: 'attemptLiveFetch',
        type: 'boolean',
        required: false,
        description: `When the cached transcript isn't available, fall back to a live vendor fetch. Defaults to true. Set false in batch sweeps where partial coverage is acceptable.`,
      },
      {
        name: 'contentId',
        type: 'string',
        required: false,
        description: `DB UUID returned by eden_analyze_creator's topPosts[].contentId or eden_search_social_content's results[].contentId. NOT the platform's native id. Requires platform; omit when passing url.`,
      },
      {
        name: 'includeTranscript',
        type: 'boolean',
        required: false,
        description: `Defaults to true. Set false to skip transcript fetch and save a round trip.`,
      },
      {
        name: 'platform',
        type: 'string',
        required: false,
        description: `Required with contentId.`,
      },
      {
        name: 'url',
        type: 'string',
        required: false,
        description: `A post/video URL, e.g. the url field of a saved link card, or a URL the user pasted. Omit when passing contentId.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `Workspace id from eden_list_workspaces. Required for accurate billing of a live fetch (cached reads never bill).`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_read_table',
    description: `Read a TABLE item (Eden's list / database item, called 'tables' in the UI): its column schema plus every row with that row's cell values. Use this for questions about structured rows and columns, e.g. 'what's in my content calendar' or 'which rows are still not started'. Cell values are keyed by property id, not column name -- join through the returned 'properties' array.`,
    params: [
      {
        name: 'itemId',
        type: 'string',
        required: true,
        description: `Table item id from eden_list_workspace_items (type === "table").`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `Workspace id. Uses the configured default workspace when omitted.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_rename_board',
    description: `Rename an existing board.`,
    params: [
      {
        name: 'boardId',
        type: 'string',
        required: true,
        description: `The ID of the board to rename.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The new name to assign to the board.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_rename_note',
    description: `Rename an existing note/document. Updates the title everywhere it appears (first heading, sidebar name, canvas card) while leaving the rest of the body intact. Find the note's itemId with eden_search_workspace_items / eden_get_note_markdown. Use eden_update_note instead if you need to rewrite the entire body.`,
    params: [
      {
        name: 'itemId',
        type: 'string',
        required: true,
        description: `Note item id (an item with type: "markdown").`,
      },
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `New title (display name) for the note.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `Workspace id from eden_list_workspaces. Uses the configured default workspace when omitted.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_resolve_creator',
    description: `Resolve a free-text creator query (handle, display name, or profile URL) to one or more candidate social profiles. Use when unsure which creator the user means and you want to disambiguate before running an expensive analysis. Results include platform and username for use with eden_analyze_creator or eden_search_social_content.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Handle, display name, profile URL, or any free text. Examples: @thedankoe, Dan Koe, https://x.com/thedankoe.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Max candidates to return. Defaults to 5 when omitted.`,
      },
      {
        name: 'platform',
        type: 'string',
        required: false,
        description: `Constrain to one platform. Omit to search all seven.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_save_items_to_board',
    description: `Place existing workspace/library items onto a board as cards. This is the right tool for saving highlights to a board: pass each highlight's itemId from eden_search_highlights results. Also works for any other item id from eden_search_workspace_items / eden_find_workspace_items (notes, saved links, PDFs). Unlike the links/posts tools this creates no new item -- the board gets a card for the canonical item. Idempotent: items already on the board are reported as alreadyOnBoard, not duplicated.`,
    params: [
      {
        name: 'boardId',
        type: 'string',
        required: true,
        description: `Id of the destination board (item type: "canvas", or a folder). Find via eden_list_workspace_items or eden_search_workspace_items.`,
      },
      {
        name: 'itemIds',
        type: 'array',
        required: true,
        description: `Existing workspace item ids to place on the board, e.g. the itemId field on eden_search_highlights results, or ids from eden_search_workspace_items (max 25 per call).`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `Workspace id. Uses the configured default workspace when omitted.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_save_links_to_board',
    description: `Save one or more URLs onto an Eden board. Eden classifies each URL into a platform card (YouTube/Twitter/Instagram/TikTok/LinkedIn/Substack/Loom) or a generic link card. Use only for URLs from outside Eden; save indexed social results with eden_save_posts_to_board, and items already in the workspace with eden_save_items_to_board. Re-calling with the same URLs creates duplicate cards.`,
    params: [
      {
        name: 'boardId',
        type: 'string',
        required: true,
        description: `The ID of the board to save the links to.`,
      },
      {
        name: 'urls',
        type: 'array',
        required: true,
        description: `Absolute URLs to save (max 25 per call).`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `Workspace id from eden_list_workspaces. Uses the configured default workspace when omitted.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_save_posts_to_board',
    description: `Save indexed social posts onto an Eden board as fully-hydrated cards (thumbnail, metrics, creator attribution). Use with results from eden_search_social_content, eden_analyze_creator, or eden_analyze_list: pass each result's contentId (the Eden DB UUID, not the platform's native post id) plus its platform. Retrying an identical call is safe -- each post lands on a given board once, keyed by contentId.`,
    params: [
      {
        name: 'boardId',
        type: 'string',
        required: true,
        description: `The ID of the board to save the posts to.`,
      },
      {
        name: 'posts',
        type: 'array',
        required: true,
        description: `Posts to save, in the order they should land on the board (max 20 per call). Each entry needs platform and contentId (the Eden DB UUID from a social search result, not the platform-native id).`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `Workspace id from eden_list_workspaces. Uses the configured default workspace when omitted.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_schedule_post',
    description: `Schedule a social post in Eden and enqueue it for publishing at a future time -- or, with draft: true, save it as an unscheduled scheduler draft with no publish time. This is a real write, not a proposal. When scheduling, pass a concrete timestamp as scheduledFor (epoch ms) or scheduledAtIso -- never natural language; when draft: true, omit the timestamp. Supports text, media, per-platform overrides, X/Threads segments (threads), and long-form articles (Twitter/Substack).`,
    params: [
      {
        name: 'article',
        type: 'object',
        required: false,
        description: `Canonical long-form article (Twitter Articles / Substack posts). Requires explicit platforms and may only target twitter and substack. Needs title and bodyHtml; substack targets additionally require the nested 'substack' settings object (audience, commentPermission, sendEmail, cta, paywall).`,
      },
      {
        name: 'draft',
        type: 'boolean',
        required: false,
        description: `true = save as an unscheduled scheduler draft (no publish time, nothing enqueued) for the user to review. Omit or false = schedule at the given timestamp.`,
      },
      {
        name: 'idempotencyKey',
        type: 'string',
        required: false,
        description: `Optional retry-safe key. Same key + same content/time returns the same post instead of creating a duplicate.`,
      },
      {
        name: 'media',
        type: 'array',
        required: false,
        description: `Already-hosted media/document assets to attach. Each item needs a publicly fetchable 'url' (never a local file path); use eden_prepare_scheduling_media_upload first to host a local file.`,
      },
      {
        name: 'perPlatform',
        type: 'object',
        required: false,
        description: `Optional per-platform overrides for when one platform should differ from the rest (text, mediaIds subset, a unique thread, YouTube title, or Instagram trial reel). Keyed by platform name. Omit entirely to have every platform use the shared text and all shared media.`,
      },
      {
        name: 'platforms',
        type: 'array',
        required: false,
        description: `Platforms to publish to. Defaults to active text platforms when no media is provided; active platforms when media is provided.`,
      },
      {
        name: 'scheduledAtIso',
        type: 'string',
        required: false,
        description: `Publish time as a concrete ISO timestamp. Used when scheduledFor is absent.`,
      },
      {
        name: 'scheduledFor',
        type: 'number',
        required: false,
        description: `Publish time as epoch milliseconds. Prefer this when known. Ignored with draft: true.`,
      },
      {
        name: 'scheduleId',
        type: 'string',
        required: false,
        description: `Optional schedule id to publish under.`,
      },
      {
        name: 'segments',
        type: 'array',
        required: false,
        description: `Thread segments for X/Threads. Each segment is one post in the thread: {"text": "...", "mediaIds": ["..."]}.`,
      },
      {
        name: 'text',
        type: 'string',
        required: false,
        description: `Post text/caption, line breaks preserved. Use an empty string for a media-only post; text and media cannot both be empty.`,
      },
      {
        name: 'timezone',
        type: 'string',
        required: false,
        description: `IANA timezone. Defaults to the schedule's timezone.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `Workspace id from eden_list_workspaces. Uses the configured default workspace when omitted.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_scheduling_media_multipart',
    description: `Drive a multipart scheduling-media upload from eden_prepare_scheduling_media_upload's multipart plan, one step at a time. step="sign-part" (needs partNumber) returns a presigned PUT URL for that part -- PUT the part's bytes and keep the ETag response header. step="complete" (needs parts, every partNumber + ETag in ascending order) finalizes the upload; the prepared publicUrl is ready for media[].url only after this succeeds. step="abort" discards an upload that will not be resumed.`,
    params: [
      {
        name: 'step',
        type: 'string',
        required: true,
        description: `Which multipart operation to perform: sign-part, complete, or abort.`,
      },
      {
        name: 'storagePath',
        type: 'string',
        required: true,
        description: `storagePath returned by eden_prepare_scheduling_media_upload.`,
      },
      {
        name: 'uploadId',
        type: 'string',
        required: true,
        description: `uploadId returned by eden_prepare_scheduling_media_upload.`,
      },
      {
        name: 'partNumber',
        type: 'integer',
        required: false,
        description: `Required for step=sign-part: one-based part number from the multipart plan.`,
      },
      {
        name: 'parts',
        type: 'array',
        required: false,
        description: `Required for step=complete: all uploaded part numbers and ETag response headers, in ascending order.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `Workspace id. Uses the configured default workspace when omitted.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_search_captures',
    description: `The user's quick captures -- notes, links, and media/voice-note clippings saved from the Eden mobile app or share sheet. Pass q to keyword-search capture text, link titles/URLs, and media filenames; omit q to list recent captures instead, optionally filtered by status and paginated with offset. Audio/voice notes are metadata only -- no transcript.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Max results. Defaults to 10 when searching, 20 when listing (search caps at 50, listing caps at 200).`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `List mode only: pagination offset. Defaults to 0.`,
      },
      {
        name: 'q',
        type: 'string',
        required: false,
        description: `Keyword(s) to match against capture text, link title/URL, and media filename. Omit to list recent captures instead of searching.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `List mode only: "active" = not yet filed anywhere (default). "sent" = already promoted to a board. "archived". "all" = every status.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `ID of the workspace to search captures in. Uses the default workspace if omitted.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_search_creators',
    description: `Discover PEOPLE rather than posts from Eden's pooled creator embeddings. Use kind="topic" for 'find competitors in this niche' / 'who talks about X' (requires query); kind="similar-to-creators" for 'creators like @name' (requires creatorRefs, exact platform+username pairs); or kind="similar-to-list" for more creators like one curated list (requires listId). Results include profile data plus a reason or matching-post evidence. Use eden_resolve_creator to identify a person already named, eden_analyze_creator to study one creator, and eden_search_social_content when the requested result is posts rather than people.`,
    params: [
      {
        name: 'kind',
        type: 'string',
        required: true,
        description: `Search mode. "topic" requires query; "similar-to-creators" requires creatorRefs; "similar-to-list" requires listId.`,
      },
      {
        name: 'creatorRefs',
        type: 'array',
        required: false,
        description: `Required when kind is "similar-to-creators". Exact platform and username seeds from eden_resolve_creator; never guess handles.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Max results to return. Defaults to 10 when omitted, maximum 25.`,
      },
      {
        name: 'listId',
        type: 'string',
        required: false,
        description: `Required when kind is "similar-to-list". Exact curated list id.`,
      },
      {
        name: 'maxFollowerCount',
        type: 'integer',
        required: false,
        description: `Maximum follower count for result creators.`,
      },
      {
        name: 'minFollowerCount',
        type: 'integer',
        required: false,
        description: `Minimum follower count for result creators.`,
      },
      {
        name: 'platforms',
        type: 'array',
        required: false,
        description: `Platforms the result creators may come from. Omit for all platforms.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Required when kind is "topic". The niche, audience, or subject to match.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `Workspace id. Omit when the MCP connection has a default workspace.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_search_custom_ai_knowledge',
    description: `Search the bundled knowledge of a marketplace-installed (managed) Custom AI -- managed installs keep knowledge in a server-side bundle, so eden_get_custom_ai returns an empty sources list for them. Two modes: omit query to CATALOG the documents (sourceId, label, kind, size, previewText, readable); pass query to keyword-search inside them, returning snippets with char offsets to follow up with eden_read_custom_ai_knowledge. Case-insensitive; tries the whole query as a phrase first, then falls back to individual terms. Publisher-protected (runtime-only) documents are never searched or readable. Returns a 409 conflict for workspace-built Custom AIs; those list their sources in eden_get_custom_ai.`,
    params: [
      {
        name: 'customAIId',
        type: 'string',
        required: true,
        description: `Custom AI id from eden_list_custom_ai.`,
      },
      {
        name: 'maxMatchesPerDoc',
        type: 'integer',
        required: false,
        description: `Max matches returned per document. Defaults to 4 when omitted.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Keyword or phrase to search for inside the documents. Omit to catalog the documents instead of searching.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `Workspace id from eden_list_workspaces. Uses the workspace's configured default when omitted.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_search_highlights',
    description: `The user's highlights -- their personal swipe file of quotes saved from books, articles, podcasts, and tweets. Pass q to keyword-search highlight text, notes, and book title/author; omit q to list recent highlights instead, optionally scoped with source and ordered by orderBy. Empty if no highlight source is connected or nothing matches.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Max results. Defaults to 10 when searching, 20 when listing (search caps at 50, listing caps at 200).`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `List mode only: pagination offset. Defaults to 0.`,
      },
      {
        name: 'orderBy',
        type: 'string',
        required: false,
        description: `List mode only: "recent" = most recently synced (default), "highlighted" = by the date the user highlighted it in the source.`,
      },
      {
        name: 'q',
        type: 'string',
        required: false,
        description: `Keyword(s) to match against highlight text, notes, and book title/author. Omit to list recent highlights instead of searching.`,
      },
      {
        name: 'source',
        type: 'string',
        required: false,
        description: `Restrict to one source: substring-matched (case-insensitive) against book/article title and author.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `Workspace id from eden_list_workspaces, used to resolve each highlight's Library itemId. Uses the default workspace if omitted.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_search_social_content',
    description: `Search social posts across one of four scopes: a single creator, a curated list, every creator the user follows, or the entire indexed corpus. Optional free-text query enables semantic search; omitting it returns the top posts in the chosen scope ranked by orderBy. Pattern-spotting filters (creatorTier, follower-count bounds, minOutlierScore) apply to list/following/global scopes.`,
    params: [
      {
        name: 'scope',
        type: 'string',
        required: true,
        description: `Search scope: "creator" (single creator's library, pass creatorRef), "list" (one curated list's roster, pass listRef), "following" (every creator the user follows), or "global" (the entire indexed corpus).`,
      },
      {
        name: 'creatorRef',
        type: 'object',
        required: false,
        description: `Required when scope is "creator": the resolved platform + username.`,
      },
      {
        name: 'creatorTier',
        type: 'string',
        required: false,
        description: `Convenience follower-count band: micro (10k-100k), mid (100k-1M, default for pattern-spotting), macro (1M-10M), mega (10M+). Ignored on creator scope.`,
      },
      {
        name: 'depth',
        type: 'string',
        required: false,
        description: `Global-scope search depth (needs a query; ignored elsewhere). "standard" (default) searches the fast semantic index; "deep" runs a slower exact keyword/phrase match over the full corpus.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Max results. Defaults to 10.`,
      },
      {
        name: 'listRef',
        type: 'object',
        required: false,
        description: `Required when scope is "list": the list id. Shape: {"listId": "<id>"}.`,
      },
      {
        name: 'maxFollowerCount',
        type: 'integer',
        required: false,
        description: `Hard upper bound on follower count. Overrides the upper side of creatorTier when both set.`,
      },
      {
        name: 'mediaType',
        type: 'string',
        required: false,
        description: `Per-creator endpoint media filter (e.g. youtube:short, instagram:reel). Ignored for non-creator scopes.`,
      },
      {
        name: 'minFollowerCount',
        type: 'integer',
        required: false,
        description: `Hard lower bound on follower count. Overrides the lower side of creatorTier when both set.`,
      },
      {
        name: 'minOutlierScore',
        type: 'number',
        required: false,
        description: `Minimum outlier multiplier vs creator baseline. 2.0 = double the creator's typical post; 3.0+ = real breakouts. Ignored on creator scope.`,
      },
      {
        name: 'orderBy',
        type: 'string',
        required: false,
        description: `Ranking. Defaults to outlier (overperformers vs creator baseline).`,
      },
      {
        name: 'platform',
        type: 'string',
        required: false,
        description: `Optional platform filter on top of the scope.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Free-text search (semantic for global/list/following scopes, ILIKE for creator scope). Omit for the "top posts in this scope, ranked" path. Wrap a multi-word domain term in double quotes to force exact phrase matching.`,
      },
      {
        name: 'since',
        type: 'string',
        required: false,
        description: `Time window. Defaults to lifetime.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `Workspace id. Uses the configured default workspace when omitted.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_search_workspace_items',
    description: `Text-substring search across the user's Eden workspace items (notes, cards, boards, media, links), matching case-insensitive against the item's title and its URL when present. Substring match only, no semantic search; note bodies are not searched (only titles + URLs). For semantic search use eden_find_workspace_items instead.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Opaque pagination cursor from the previous response's nextCursor. Omit on first call.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Max results per page. Defaults to 25, max 100.`,
      },
      {
        name: 'parentId',
        type: 'string',
        required: false,
        description: `Restrict to items whose parent board has this id.`,
      },
      {
        name: 'q',
        type: 'string',
        required: false,
        description: `Free-text query. Case-insensitive substring match against title + URL. Omit to return everything that matches the type / parentId filters.`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Restrict to one item type (e.g. markdown, canvas, twitter, youtube, image).`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `Workspace id. Uses the configured default workspace when omitted.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_set_first_comment',
    description: `Set the first comment on a scheduled post (for auto-commenting after publish).`,
    params: [
      {
        name: 'comment',
        type: 'string',
        required: true,
        description: `The text content of the first comment to auto-post after publishing.`,
      },
      {
        name: 'postId',
        type: 'string',
        required: true,
        description: `The unique identifier of the scheduled post.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_study_top_carousels',
    description: `Research top-performing Instagram carousel posts and return a slide-by-slide teardown (structure, hook, per-slide text, design patterns) as reusable pattern notes. Study one creator's carousels (pass creator) OR a niche across creators (pass niche) -- pass one or the other, not both. This does NOT generate carousel media.`,
    params: [
      {
        name: 'creator',
        type: 'string',
        required: false,
        description: `Creator handle/name/profile URL to study. Omit to study a niche instead.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `How many carousel posts to study. Defaults to 8.`,
      },
      {
        name: 'minOutlierScore',
        type: 'number',
        required: false,
        description: `Optional minimum outlier score.`,
      },
      {
        name: 'niche',
        type: 'string',
        required: false,
        description: `Topic/niche to study across creators when no creator is given.`,
      },
      {
        name: 'scope',
        type: 'string',
        required: false,
        description: `Use "following" to restrict niche search to creators the user follows.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `Workspace id from eden_list_workspaces. Uses the configured default workspace when omitted.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_trash_board',
    description: `Move a board to the trash in the user's Eden workspace. This is a soft delete -- the board and its cards leave the sidebar but can be restored from Trash inside Eden. Only do this when the user clearly asks to delete/remove/trash a specific board; confirm the board first with eden_search_workspace_items.`,
    params: [
      {
        name: 'boardId',
        type: 'string',
        required: true,
        description: `Id of the board to trash (an item with type: "canvas").`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_update_custom_ai',
    description: `Replace an editable Custom AI's definition. First call eden_get_custom_ai, merge the requested changes into the complete current definition, and pass that full definition plus its current revision. Managed marketplace installs are read-only. Sources are preserved (not editable through this call).`,
    params: [
      {
        name: 'customAIId',
        type: 'string',
        required: true,
        description: `Custom AI id from eden_list_custom_ai.`,
      },
      {
        name: 'definition',
        type: 'object',
        required: true,
        description: `The Custom AI's full replacement definition: name, instructions, and behavior settings. Must be the complete current definition with your changes merged in, not a partial patch. Example: {"name": "Brand Voice Coach", "instructionsMarkdown": "You help draft posts in our brand voice..."}.`,
      },
      {
        name: 'expectedRevision',
        type: 'integer',
        required: true,
        description: `Current revision from eden_get_custom_ai. Prevents overwriting a version the caller hasn't seen yet.`,
      },
      {
        name: 'visibility',
        type: 'string',
        required: false,
        description: `Who can see this Custom AI: private, workspace, unlisted, or public.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `Workspace id from eden_list_workspaces. Uses the workspace's configured default when omitted.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_update_note',
    description: `Replace the entire markdown body of an existing note with new content. Always call eden_get_note_markdown first and pass its contentHash as baseContentHash so you do not clobber newer edits. If omitted, this tool preflights a live read and refuses a large unexpected shrink unless allowShrink is true. Does not rename the note -- use eden_rename_note for that. To add to the end instead of replacing, use eden_append_to_note.`,
    params: [
      {
        name: 'content',
        type: 'string',
        required: true,
        description: `Full replacement markdown body of the note. This fully replaces any existing content.`,
      },
      {
        name: 'itemId',
        type: 'string',
        required: true,
        description: `Note item id (an item with type: "markdown").`,
      },
      {
        name: 'allowShrink',
        type: 'boolean',
        required: false,
        description: `Set true only when you intentionally replace a long note with a much shorter body. Without this, large shrinks are refused so stale/template overwrites cannot wipe work.`,
      },
      {
        name: 'baseContentHash',
        type: 'string',
        required: false,
        description: `contentHash from eden_get_note_markdown for the read you composed against. Strongly recommended. If omitted, Eden reads the live note and uses its hash.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `Workspace id from eden_list_workspaces. Uses the configured default workspace when omitted.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_update_schedule',
    description: `Edit an Eden posting schedule's recurring slot times and/or timezone -- the queue cadence shown under a brand in the scheduler, not an individual post. Read the current slots with eden_list_schedules first, then pass the full replacement array (it replaces the whole set, so include unchanged slots too). Already-queued posts keep their times. Does not rename the schedule. To move one existing post instead, use eden_update_scheduled_post.`,
    params: [
      {
        name: 'scheduleId',
        type: 'string',
        required: false,
        description: `Schedule id from eden_list_schedules. Omit to edit the default schedule; pass it explicitly when the workspace has several schedules/brands.`,
      },
      {
        name: 'slots',
        type: 'array',
        required: false,
        description: `Full replacement set of recurring posting slots. Each slot fires at 'time' on every day marked true. Example: [{"time": "08:30", "days": [true, true, true, true, true, false, false]}].`,
      },
      {
        name: 'timezone',
        type: 'string',
        required: false,
        description: `IANA timezone for the schedule, e.g. "America/New_York".`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `Workspace id. Uses the configured default workspace when omitted.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_update_scheduled_post',
    description: `Edit an existing draft or scheduled post in Eden by id -- change its time, its body, its auto first-comment, and/or its auto-repost. Find the id with eden_list_scheduled_posts. Reschedule only by passing scheduledFor/scheduledAtIso and leaving body fields out; edit the body by passing text/article/segments/media/platforms/perPlatform (omitted fields fall back to the existing post). Cannot edit a post that is already publishing or posted.`,
    params: [
      {
        name: 'postId',
        type: 'string',
        required: true,
        description: `Scheduled post / draft id from eden_list_scheduled_posts.`,
      },
      {
        name: 'article',
        type: 'object',
        required: false,
        description: `Replacement canonical article. Omit to keep the existing article. Needs title and bodyHtml; substack targets additionally require the nested 'substack' settings object.`,
      },
      {
        name: 'autoRepost',
        type: 'object',
        required: false,
        description: `X only: natively repost the post to the author's own timeline after publish. Shape: {"everyHours": <0-168>, "times": <1-3>, "undoAfterHours": <0-168>}. Pass everyHours: 0 to turn auto-repost off. Requires the X account to have advanced automations enabled in Eden.`,
      },
      {
        name: 'firstComment',
        type: 'object',
        required: false,
        description: `Set or clear the auto first-comment Eden posts right after the main post publishes. Shape: {"comment": "...", "afterLikes": <int>, "delayMinutes": <int>}. Pass an empty comment string to remove the first comment.`,
      },
      {
        name: 'media',
        type: 'array',
        required: false,
        description: `Replace the attached media. Omit to keep the post's existing media.`,
      },
      {
        name: 'perPlatform',
        type: 'object',
        required: false,
        description: `Optional per-platform overrides for when one platform should differ from the rest. Omit entirely to keep every platform on the shared text/media.`,
      },
      {
        name: 'platforms',
        type: 'array',
        required: false,
        description: `Replace the target platforms. Omit to keep the post's current platforms.`,
      },
      {
        name: 'scheduledAtIso',
        type: 'string',
        required: false,
        description: `New publish time as a concrete ISO timestamp. Used when scheduledFor is absent.`,
      },
      {
        name: 'scheduledFor',
        type: 'number',
        required: false,
        description: `New publish time as epoch milliseconds. Prefer this when known.`,
      },
      {
        name: 'scheduleId',
        type: 'string',
        required: false,
        description: `Optional schedule id guard -- rejects if the post belongs to another schedule.`,
      },
      {
        name: 'segments',
        type: 'array',
        required: false,
        description: `Replacement thread segments for X/Threads.`,
      },
      {
        name: 'text',
        type: 'string',
        required: false,
        description: `Replacement post text, line breaks preserved. Pass an empty string to remove a media post's caption; omit to keep the current text.`,
      },
      {
        name: 'timezone',
        type: 'string',
        required: false,
        description: `Optional timezone override.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_update_skill',
    description: `Update an existing AI skill's name, description, or definition by skill ID.`,
    params: [
      {
        name: 'skillId',
        type: 'string',
        required: true,
        description: `The unique identifier of the skill to update.`,
      },
      {
        name: 'definition',
        type: 'string',
        required: false,
        description: `New skill definition as a JSON string. Omit to leave unchanged.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New description for the skill. Omit to leave unchanged.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New display name for the skill. Omit to leave unchanged.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_update_table',
    description: `Change an Eden table itself (not its rows): rename it, add columns, or change the shared view -- layout table/board/calendar, groupBy a column name or 'done', the calendar's date column, hide completed / hide check circles. Existing columns can't be renamed or deleted here. Read the table first with eden_read_table for the current column names and view; anything that can't resolve comes back in a 'warnings' field.`,
    params: [
      { name: 'itemId', type: 'string', required: true, description: `Table item id.` },
      {
        name: 'addColumns',
        type: 'array',
        required: false,
        description: `New columns to add. Each needs a name and type. 'status' seeds a select with Not started/In progress/Done. 'rating' = stars. 'item' cells hold a workspace item id. 'meta' = read-only fact from the row's linked item. Up to 30 per call.`,
      },
      { name: 'title', type: 'string', required: false, description: `New table name.` },
      {
        name: 'view',
        type: 'object',
        required: false,
        description: `Changes to the table's shared view: layout (table/board/calendar), groupBy (a select/rating/checkbox/date column name, or 'done'; empty string clears), calendarDateProperty, hideDone, hideCheck.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `Workspace id, for usage attribution. Uses the configured default workspace when omitted.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_update_table_rows',
    description: `Update rows in an Eden table: set cell values, rename, check/uncheck the done circle, or soft-remove. Address each row by its row item id (from eden_read_table) or its exact title -- ambiguous titles are skipped with a warning. Cell patches merge (only the columns you pass change; null clears a cell). Use for 'mark X done', status sweeps, or bulk fills of a new column.`,
    params: [
      { name: 'itemId', type: 'string', required: true, description: `Table item id.` },
      {
        name: 'updates',
        type: 'array',
        required: true,
        description: `Row updates to apply. Each entry addresses one row by 'row' (row item id or exact title) and may set title, done, cells (merged, not replaced), or removed. Up to 100 updates per call.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `Workspace id, for usage attribution. Uses the configured default workspace when omitted.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_upload_scheduling_media',
    description: `Upload an image/video/PDF/document from base64 bytes into Eden's public scheduling media bucket and return a ready media asset for scheduling tools. Base64 upload is capped at 25 MB; for larger files use eden_prepare_scheduling_media_upload instead. Supported types: image/jpeg, image/png, image/webp, image/gif, application/pdf, video/mp4, video/quicktime, video/webm.`,
    params: [
      {
        name: 'base64Content',
        type: 'string',
        required: true,
        description: `Base64-encoded file bytes. Do not include a data: URL prefix.`,
      },
      {
        name: 'mimeType',
        type: 'string',
        required: true,
        description: `MIME type: image/jpeg, image/png, image/webp, image/gif, application/pdf, video/mp4, video/quicktime, or video/webm.`,
      },
      {
        name: 'alt',
        type: 'string',
        required: false,
        description: `Alt text or document description.`,
      },
      {
        name: 'fileName',
        type: 'string',
        required: false,
        description: `Original filename for alt/id hints.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `Workspace id from eden_list_workspaces. Uses the configured default workspace when omitted.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_wait_for_creator_index',
    description: `Wait for a creator's content index to be ready before querying. Use this before calling analyze_creator or similar tools to ensure the index has been populated.`,
    params: [
      {
        name: 'creatorId',
        type: 'string',
        required: true,
        description: `The canonical creator ID whose index readiness to await.`,
      },
    ],
  },
]
