import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'edenmcp_eden_analyze_creator',
    description: `Analyze a creator's full-corpus best posts and content patterns.`,
    params: [
      {
        name: 'creatorId',
        type: 'string',
        required: true,
        description: `The canonical creator ID to analyze.`,
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
    name: 'edenmcp_eden_analyze_list',
    description: `Analyze all creators in a creator list, returning content patterns and best posts across the group.`,
    params: [
      {
        name: 'listId',
        type: 'string',
        required: true,
        description: `The unique identifier of the creator list to analyze.`,
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
    description: `Append content to the end of an existing note.`,
    params: [
      {
        name: 'content',
        type: 'string',
        required: true,
        description: `The markdown content to append to the end of the note.`,
      },
      {
        name: 'noteId',
        type: 'string',
        required: true,
        description: `The ID of the note to append content to.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_cancel_scheduled_post',
    description: `Cancel a scheduled post (moves back to draft).`,
    params: [
      {
        name: 'postId',
        type: 'string',
        required: true,
        description: `The unique identifier of the scheduled post to cancel.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_create_board',
    description: `Create a new board in a workspace.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The name to assign to the new board.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: true,
        description: `The ID of the workspace in which to create the board.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_create_note',
    description: `Create a new note in a workspace or board.`,
    params: [
      { name: 'title', type: 'string', required: true, description: `The title of the new note.` },
      {
        name: 'boardId',
        type: 'string',
        required: false,
        description: `The ID of the board in which to create the note. Either workspaceId or boardId must be provided.`,
      },
      {
        name: 'content',
        type: 'string',
        required: false,
        description: `The initial markdown content of the note.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `The ID of the workspace in which to create the note. Either workspaceId or boardId must be provided.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_create_scheduling_draft',
    description: `Create a draft post in the scheduling queue.`,
    params: [
      {
        name: 'content',
        type: 'string',
        required: true,
        description: `The text content of the draft post.`,
      },
      {
        name: 'mediaIds',
        type: 'array',
        required: false,
        description: `List of media IDs to attach to the draft post, obtained from the upload flow.`,
      },
      {
        name: 'platform',
        type: 'string',
        required: false,
        description: `The target social platform for the draft (e.g. twitter, linkedin, instagram).`,
      },
      {
        name: 'scheduleId',
        type: 'string',
        required: false,
        description: `The schedule to associate the draft with.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `The workspace ID to create the draft in. If omitted, uses the default workspace.`,
      },
    ],
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
    name: 'edenmcp_eden_following_overview',
    description: `Get an overview of creators the user follows, optionally filtered by platform.`,
    params: [
      {
        name: 'platform',
        type: 'string',
        required: false,
        description: `Filter the following overview to a specific platform. Valid values: twitter, youtube, tiktok, linkedin.`,
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
    description: `Retrieve a note's full content formatted as markdown. Use this to read the body of a saved note by its ID.`,
    params: [
      {
        name: 'noteId',
        type: 'string',
        required: true,
        description: `The unique identifier of the note to retrieve.`,
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
    description: `List chat conversations in Eden, optionally filtered to a specific workspace. Supports pagination.`,
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
        description: `Maximum number of chat conversations to return per page.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `The unique identifier of the workspace to filter chats by. If omitted, returns chats across all workspaces.`,
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
    description: `List scheduled posts, optionally filtered by schedule or date range.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from the previous response to fetch the next page of results.`,
      },
      {
        name: 'from',
        type: 'string',
        required: false,
        description: `Start of the date range filter in ISO 8601 date format (e.g. 2024-01-01).`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of scheduled posts to return per page.`,
      },
      {
        name: 'scheduleId',
        type: 'string',
        required: false,
        description: `Filter posts by a specific schedule ID.`,
      },
      {
        name: 'to',
        type: 'string',
        required: false,
        description: `End of the date range filter in ISO 8601 date format (e.g. 2024-01-31).`,
      },
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
    description: `List items in an Eden workspace as a paginated flat list. Use cursor from a previous response to fetch the next page.`,
    params: [
      {
        name: 'workspaceId',
        type: 'string',
        required: true,
        description: `The unique identifier of the workspace to list items from.`,
      },
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
        description: `Maximum number of items to return per page.`,
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
    description: `Get a pre-signed upload URL for scheduling media.`,
    params: [
      {
        name: 'filename',
        type: 'string',
        required: true,
        description: `The name of the file to upload, including extension.`,
      },
      {
        name: 'mimeType',
        type: 'string',
        required: true,
        description: `The MIME type of the file to upload (e.g. image/jpeg, video/mp4).`,
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
    description: `Publish a draft post immediately.`,
    params: [
      {
        name: 'postId',
        type: 'string',
        required: true,
        description: `The unique identifier of the draft post to publish immediately.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_read_board',
    description: `Read an Eden board and its full contents, including all items organized on the board.`,
    params: [
      {
        name: 'boardId',
        type: 'string',
        required: true,
        description: `The unique identifier of the board to read.`,
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
    description: `Read a saved URL/shared card by its ID.`,
    params: [
      {
        name: 'cardId',
        type: 'string',
        required: true,
        description: `The unique identifier of the saved card to read.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_read_media_card',
    description: `Read the details of a saved media card in Eden, including its metadata and content.`,
    params: [
      {
        name: 'cardId',
        type: 'string',
        required: true,
        description: `The unique identifier of the media card to read.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_read_social_post',
    description: `Read a single social media post by its ID.`,
    params: [
      {
        name: 'postId',
        type: 'string',
        required: true,
        description: `The unique identifier of the social media post to read.`,
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
    description: `Rename a note.`,
    params: [
      {
        name: 'noteId',
        type: 'string',
        required: true,
        description: `The ID of the note to rename.`,
      },
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `The new title to assign to the note.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_resolve_creator',
    description: `Resolve an ambiguous creator handle to a canonical creator profile.`,
    params: [
      {
        name: 'handle',
        type: 'string',
        required: true,
        description: `The creator's handle or username to resolve to a canonical profile.`,
      },
      {
        name: 'platform',
        type: 'string',
        required: false,
        description: `Platform to resolve the handle on. Valid values: twitter, youtube, tiktok, linkedin.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_save_links_to_board',
    description: `Save one or more URLs/links to a board.`,
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
        description: `An array of URLs to save to the board.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_save_posts_to_board',
    description: `Save social posts to a board.`,
    params: [
      {
        name: 'boardId',
        type: 'string',
        required: true,
        description: `The ID of the board to save the posts to.`,
      },
      {
        name: 'postIds',
        type: 'array',
        required: true,
        description: `An array of social post IDs to save to the board.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_schedule_post',
    description: `Schedule a draft post for publication at a specific time.`,
    params: [
      {
        name: 'postId',
        type: 'string',
        required: true,
        description: `The unique identifier of the draft post to schedule.`,
      },
      {
        name: 'scheduledAt',
        type: 'string',
        required: true,
        description: `The ISO 8601 datetime at which to publish the post (e.g. 2024-06-01T09:00:00Z).`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_search_captures',
    description: `Search saved captures (bookmarks/swipes) by a text query.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Search query text to filter captures.`,
      },
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
        description: `ID of the workspace to search captures in. Uses the default workspace if omitted.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_search_highlights',
    description: `Search saved highlights in Eden by a query string, optionally scoped to a specific workspace. Supports pagination.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Search query string to match against saved highlights.`,
      },
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
        description: `The unique identifier of the workspace to search highlights within. If omitted, searches across all workspaces.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_search_social_content',
    description: `Search social posts across one of four scopes: a single creator, a curated list, every creator the user follows, or the entire indexed corpus. Optional free-text query enables semantic search; omitting it returns top posts in the chosen scope ranked by outlier score. Supports platform filters, follower-count tiers, and outlier-score thresholds.

scope.kind values:
- 'creator': requires scope.creatorRef.platform and scope.creatorRef.username
- 'list': requires scope.listRef.listId
- 'following': no extra fields needed
- 'global': no extra fields needed`,
    params: [
      {
        name: 'scope',
        type: 'object',
        required: true,
        description: `Search scope object. Set kind to 'creator', 'list', 'following', or 'global'. For 'creator': include creatorRef with platform and username. For 'list': include listRef with listId.`,
      },
      {
        name: 'creatorTier',
        type: 'string',
        required: false,
        description: `Follower-count band filter: micro (10k-100k), mid (100k-1M), macro (1M-10M), mega (10M+). Ignored on creator scope.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return (max 25).`,
      },
      {
        name: 'minOutlierScore',
        type: 'number',
        required: false,
        description: `Minimum outlier multiplier vs creator baseline. 2.0 = double typical; 3.0+ = real breakouts.`,
      },
      {
        name: 'orderBy',
        type: 'string',
        required: false,
        description: `Ranking method. Default is outlier (overperformers vs creator baseline).`,
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
        description: `Free-text search query (semantic for global/list/following scopes). Omit to get top posts ranked by outlier score.`,
      },
      {
        name: 'since',
        type: 'string',
        required: false,
        description: `Time window for the search. Default is lifetime.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `Workspace ID to scope the search to. Optional if EDEN_WORKSPACE_ID is configured.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_search_workspace_items',
    description: `Search items in an Eden workspace by topic or title. Returns matching items with pagination support.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Search query string to match against item topics or titles.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: true,
        description: `The unique identifier of the workspace to search within.`,
      },
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
        description: `Maximum number of items to return per page.`,
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
    description: `Study the top-performing carousels for inspiration and patterns.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of top carousels to return.`,
      },
      {
        name: 'topic',
        type: 'string',
        required: false,
        description: `A topic or keyword to filter the top carousels by.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `The workspace ID to scope the top carousel study to.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_trash_board',
    description: `Move a board to trash.`,
    params: [
      {
        name: 'boardId',
        type: 'string',
        required: true,
        description: `The ID of the board to move to trash.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_update_note',
    description: `Update a note's content, fully replacing the existing content.`,
    params: [
      {
        name: 'content',
        type: 'string',
        required: true,
        description: `The new markdown content for the note. This fully replaces any existing content.`,
      },
      {
        name: 'noteId',
        type: 'string',
        required: true,
        description: `The ID of the note to update.`,
      },
    ],
  },
  {
    name: 'edenmcp_eden_update_scheduled_post',
    description: `Update a scheduled post's content or scheduled time.`,
    params: [
      {
        name: 'postId',
        type: 'string',
        required: true,
        description: `The unique identifier of the scheduled post to update.`,
      },
      {
        name: 'content',
        type: 'string',
        required: false,
        description: `The new text content for the post.`,
      },
      {
        name: 'mediaIds',
        type: 'array',
        required: false,
        description: `Array of media IDs to attach to the post.`,
      },
      {
        name: 'scheduledAt',
        type: 'string',
        required: false,
        description: `The new scheduled publish time in ISO 8601 format.`,
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
    name: 'edenmcp_eden_upload_scheduling_media',
    description: `Upload media for use in scheduled posts using a pre-signed URL.`,
    params: [
      {
        name: 'fileContent',
        type: 'string',
        required: true,
        description: `The base64-encoded content of the file to upload.`,
      },
      {
        name: 'mimeType',
        type: 'string',
        required: true,
        description: `The MIME type of the file being uploaded (e.g. image/jpeg, video/mp4).`,
      },
      {
        name: 'uploadUrl',
        type: 'string',
        required: true,
        description: `The pre-signed URL obtained from the prepare_scheduling_media_upload tool.`,
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
