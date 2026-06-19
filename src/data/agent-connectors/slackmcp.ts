import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'slackmcp_slack_add_reaction',
    description: `Add an emoji reaction to a Slack message. Requires the channel ID, message timestamp, and emoji name.`,
    params: [
      { name: 'channel_id', type: 'string', required: true, description: `ID of the Slack channel. Get it from slack_search_channels.` },
      { name: 'emoji', type: 'string', required: true, description: `Reaction (emoji) name without colons` },
      { name: 'message_ts', type: 'string', required: true, description: `Timestamp of the message. Get it from slack_read_channel or slack_read_thread.` },
    ],
  },
  {
    name: 'slackmcp_slack_create_canvas',
    description: `Create a Slack Canvas document from Canvas-flavored Markdown content.`,
    params: [
      { name: 'content', type: 'string', required: true, description: `Canvas-flavored Markdown content for the canvas body.` },
      { name: 'title', type: 'string', required: true, description: `Display name shown at the top of the canvas.` },
    ],
  },
  {
    name: 'slackmcp_slack_create_conversation',
    description: `Create a channel, DM, or group DM. Returns a channel ID for sending messages.`,
    params: [
      { name: 'channel_name', type: 'string', required: false, description: `Name for the new channel (lowercase, hyphens, max 80 chars). Omit to create a DM instead.` },
      { name: 'is_private', type: 'boolean', required: false, description: `If true, creates a private channel. Only used with channel_name. Default: false.` },
      { name: 'user_ids', type: 'array', required: false, description: `Slack user IDs to invite. 1 ID = DM, 2–8 IDs = group DM, up to 1000 IDs for a channel.` },
    ],
  },
  {
    name: 'slackmcp_slack_get_reactions',
    description: `Retrieve all emoji reactions on a specific Slack message.`,
    params: [
      { name: 'channel_id', type: 'string', required: true, description: `ID of the Slack channel. Get it from slack_search_channels.` },
      { name: 'message_ts', type: 'string', required: true, description: `Timestamp of the message. Get it from slack_read_channel or slack_read_thread.` },
    ],
  },
  {
    name: 'slackmcp_slack_list_channel_members',
    description: `List members of a Slack channel, group, or group DM with profile details.`,
    params: [
      { name: 'channel_id', type: 'string', required: true, description: `ID of the Slack channel. Get it from slack_search_channels.` },
      { name: 'cursor', type: 'string', required: false, description: `Pagination cursor from the previous response to fetch the next page.` },
      { name: 'include_bots', type: 'boolean', required: false, description: `Include bots and apps in the member list (default: false)` },
      { name: 'include_deleted', type: 'boolean', required: false, description: `Include deleted/deactivated users in the member list (default: false)` },
      { name: 'limit', type: 'integer', required: false, description: `Maximum number of results to return per page.` },
      { name: 'response_format', type: 'string', required: false, description: `Level of detail in the response. Accepted values: detailed, concise, ids_only.` },
    ],
  },
  {
    name: 'slackmcp_slack_read_canvas',
    description: `Retrieve the Markdown content and section ID mapping of a Slack Canvas document.`,
    params: [
      { name: 'canvas_id', type: 'string', required: true, description: `ID of the Slack canvas document. Get it from slack_search_public.` },
    ],
  },
  {
    name: 'slackmcp_slack_read_channel',
    description: `Read messages from a Slack channel in reverse chronological order (newest first).`,
    params: [
      { name: 'channel_id', type: 'string', required: true, description: `ID of the Slack channel. Get it from slack_search_channels.` },
      { name: 'cursor', type: 'string', required: false, description: `Pagination cursor from the previous response to fetch the next page.` },
      { name: 'latest', type: 'string', required: false, description: `Only return messages before this Unix timestamp (e.g. 1640995200.000000).` },
      { name: 'limit', type: 'integer', required: false, description: `Maximum number of results to return per page.` },
      { name: 'oldest', type: 'string', required: false, description: `Only return messages after this Unix timestamp (e.g. 1609459200.000000).` },
      { name: 'response_format', type: 'string', required: false, description: `Level of detail in the response. Accepted values: detailed, concise, ids_only.` },
    ],
  },
  {
    name: 'slackmcp_slack_read_file',
    description: `Read a Slack file's content by file ID. Returns text or base64-encoded content.`,
    params: [
      { name: 'file_id', type: 'string', required: true, description: `ID of the Slack file. Get it from slack_search_public.` },
    ],
  },
  {
    name: 'slackmcp_slack_read_thread',
    description: `Read all messages in a Slack thread — the parent message and its replies.`,
    params: [
      { name: 'channel_id', type: 'string', required: true, description: `ID of the Slack channel. Get it from slack_search_channels.` },
      { name: 'message_ts', type: 'string', required: true, description: `Timestamp of the message. Get it from slack_read_channel or slack_read_thread.` },
      { name: 'cursor', type: 'string', required: false, description: `Pagination cursor from the previous response to fetch the next page.` },
      { name: 'latest', type: 'string', required: false, description: `Only return messages before this Unix timestamp (e.g. 1640995200.000000).` },
      { name: 'limit', type: 'integer', required: false, description: `Maximum number of results to return per page.` },
      { name: 'oldest', type: 'string', required: false, description: `Only return messages after this Unix timestamp (e.g. 1609459200.000000).` },
      { name: 'response_format', type: 'string', required: false, description: `Level of detail in the response. Accepted values: detailed, concise, ids_only.` },
    ],
  },
  {
    name: 'slackmcp_slack_read_user_profile',
    description: `Retrieve detailed profile information for a Slack user including status and contact info.`,
    params: [
      { name: 'include_locale', type: 'boolean', required: false, description: `Include user's locale information. Default: false` },
      { name: 'response_format', type: 'string', required: false, description: `Level of detail in the response. Accepted values: detailed, concise, ids_only.` },
      { name: 'user_id', type: 'string', required: false, description: `ID of the Slack user. Get it from slack_search_users.` },
    ],
  },
  {
    name: 'slackmcp_slack_schedule_message',
    description: `Schedule a message for future delivery to a Slack channel at a specified Unix timestamp.`,
    params: [
      { name: 'channel_id', type: 'string', required: true, description: `ID of the Slack channel. Get it from slack_search_channels.` },
      { name: 'message', type: 'string', required: true, description: `Message content to schedule` },
      { name: 'post_at', type: 'integer', required: true, description: `Unix timestamp (seconds) for when to send the scheduled message.` },
      { name: 'reply_broadcast', type: 'boolean', required: false, description: `Broadcast thread reply to channel` },
      { name: 'thread_ts', type: 'string', required: false, description: `Timestamp of the parent message to reply in a thread. Get it from slack_read_channel.` },
    ],
  },
  {
    name: 'slackmcp_slack_search_channels',
    description: `Search for Slack channels by name or description and return channel IDs and metadata.`,
    params: [
      { name: 'query', type: 'string', required: true, description: `Search query string.` },
      { name: 'channel_types', type: 'string', required: false, description: `Comma-separated channel types to filter. Accepted values: public_channel, private_channel, mpim, im.` },
      { name: 'cursor', type: 'string', required: false, description: `Pagination cursor from the previous response to fetch the next page.` },
      { name: 'include_archived', type: 'boolean', required: false, description: `Include archived channels in the search results` },
      { name: 'limit', type: 'integer', required: false, description: `Maximum number of results to return per page.` },
      { name: 'response_format', type: 'string', required: false, description: `Level of detail in the response. Accepted values: detailed, concise, ids_only.` },
    ],
  },
  {
    name: 'slackmcp_slack_search_emojis',
    description: `Search custom emojis available in this Slack workspace by name.`,
    params: [
      { name: 'query', type: 'string', required: true, description: `Search query string.` },
    ],
  },
  {
    name: 'slackmcp_slack_search_public',
    description: `Search messages and files in public Slack channels only.`,
    params: [
      { name: 'query', type: 'string', required: true, description: `Search query string.` },
      { name: 'after', type: 'string', required: false, description: `Only messages after this Unix timestamp (inclusive)` },
      { name: 'before', type: 'string', required: false, description: `Only messages before this Unix timestamp (inclusive)` },
      { name: 'content_types', type: 'string', required: false, description: `Comma-separated content types to search. Accepted values: messages, files.` },
      { name: 'context_channel_id', type: 'string', required: false, description: `Channel ID to boost relevance of results from that channel.` },
      { name: 'cursor', type: 'string', required: false, description: `Pagination cursor from the previous response to fetch the next page.` },
      { name: 'include_bots', type: 'boolean', required: false, description: `Include bot messages (default: false)` },
      { name: 'include_context', type: 'boolean', required: false, description: `Include surrounding context messages for each result. Defaults to true.` },
      { name: 'limit', type: 'integer', required: false, description: `Maximum number of results to return per page.` },
      { name: 'max_context_length', type: 'integer', required: false, description: `Max character length for each context message. Longer messages are truncated.` },
      { name: 'response_format', type: 'string', required: false, description: `Level of detail in the response. Accepted values: detailed, concise, ids_only.` },
      { name: 'sort', type: 'string', required: false, description: `Sort by relevance or date (default: 'score'). Options: 'score', 'timestamp'` },
      { name: 'sort_dir', type: 'string', required: false, description: `Sort direction (default: 'desc'). Options: 'asc', 'desc'` },
    ],
  },
  {
    name: 'slackmcp_slack_search_public_and_private',
    description: `Search messages and files across all Slack channels including private ones the user has access to.`,
    params: [
      { name: 'query', type: 'string', required: true, description: `Search query string.` },
      { name: 'after', type: 'string', required: false, description: `Only messages after this Unix timestamp (inclusive)` },
      { name: 'before', type: 'string', required: false, description: `Only messages before this Unix timestamp (inclusive)` },
      { name: 'channel_types', type: 'string', required: false, description: `Comma-separated channel types to filter. Accepted values: public_channel, private_channel, mpim, im.` },
      { name: 'content_types', type: 'string', required: false, description: `Comma-separated content types to search. Accepted values: messages, files.` },
      { name: 'context_channel_id', type: 'string', required: false, description: `Channel ID to boost relevance of results from that channel.` },
      { name: 'cursor', type: 'string', required: false, description: `Pagination cursor from the previous response to fetch the next page.` },
      { name: 'include_bots', type: 'boolean', required: false, description: `Include bot messages (default: false)` },
      { name: 'include_context', type: 'boolean', required: false, description: `Include surrounding context messages for each result. Defaults to true.` },
      { name: 'limit', type: 'integer', required: false, description: `Maximum number of results to return per page.` },
      { name: 'max_context_length', type: 'integer', required: false, description: `Max character length for each context message. Longer messages are truncated.` },
      { name: 'response_format', type: 'string', required: false, description: `Level of detail in the response. Accepted values: detailed, concise, ids_only.` },
      { name: 'sort', type: 'string', required: false, description: `Sort by relevance or date (default: 'score'). Options: 'score', 'timestamp'` },
      { name: 'sort_dir', type: 'string', required: false, description: `Sort direction (default: 'desc'). Options: 'asc', 'desc'` },
    ],
  },
  {
    name: 'slackmcp_slack_search_users',
    description: `Search for Slack users by name, email, or profile attributes.`,
    params: [
      { name: 'query', type: 'string', required: true, description: `Search query string.` },
      { name: 'cursor', type: 'string', required: false, description: `Pagination cursor from the previous response to fetch the next page.` },
      { name: 'limit', type: 'integer', required: false, description: `Maximum number of results to return per page.` },
      { name: 'response_format', type: 'string', required: false, description: `Level of detail in the response. Accepted values: detailed, concise, ids_only.` },
    ],
  },
  {
    name: 'slackmcp_slack_send_message',
    description: `Send a message to a Slack channel or user. Use a user ID as channel_id to send a DM.`,
    params: [
      { name: 'channel_id', type: 'string', required: true, description: `ID of the Slack channel. Get it from slack_search_channels.` },
      { name: 'message', type: 'string', required: true, description: `Add a message` },
      { name: 'draft_id', type: 'string', required: false, description: `ID of a previously saved draft to delete after sending.` },
      { name: 'reply_broadcast', type: 'boolean', required: false, description: `Also send to conversation` },
      { name: 'thread_ts', type: 'string', required: false, description: `Timestamp of the parent message to reply in a thread. Get it from slack_read_channel.` },
    ],
  },
  {
    name: 'slackmcp_slack_send_message_draft',
    description: `Save a message as a draft in a Slack channel without sending it.`,
    params: [
      { name: 'channel_id', type: 'string', required: true, description: `ID of the Slack channel. Get it from slack_search_channels.` },
      { name: 'message', type: 'string', required: true, description: `The message content in standard markdown` },
      { name: 'thread_ts', type: 'string', required: false, description: `Timestamp of the parent message to reply in a thread. Get it from slack_read_channel.` },
    ],
  },
  {
    name: 'slackmcp_slack_update_canvas',
    description: `Update an existing Slack Canvas document by appending, replacing, or deleting content.`,
    params: [
      { name: 'action', type: 'string', required: true, description: `One of "append", "prepend", or "replace". Defaults to "append"` },
      { name: 'canvas_id', type: 'string', required: true, description: `ID of the Slack canvas document. Get it from slack_search_public.` },
      { name: 'content', type: 'string', required: true, description: `Canvas-flavored Markdown content for the canvas body.` },
      { name: 'section_id', type: 'string', required: false, description: `ID of the canvas section to update. Get it from slack_read_canvas.` },
    ],
  },
]
