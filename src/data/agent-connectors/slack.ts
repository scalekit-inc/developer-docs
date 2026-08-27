import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'slack_add_bookmark',
    description: `Add a bookmark to a Slack channel, such as a link. Requires a valid Slack OAuth2 connection with the bookmarks:write scope.`,
    params: [
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `Channel to add the bookmark to.`,
      },
      { name: 'title', type: 'string', required: true, description: `Title for the bookmark.` },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `Type of the bookmark, e.g. 'link'.`,
      },
      {
        name: 'emoji',
        type: 'string',
        required: false,
        description: `Emoji to display alongside the bookmark, e.g. ':pushpin:'.`,
      },
      {
        name: 'entity_id',
        type: 'string',
        required: false,
        description: `ID of the entity being bookmarked. Only applies to 'message' or 'file' bookmark types.`,
      },
      {
        name: 'link',
        type: 'string',
        required: false,
        description: `URL to bookmark. Required when type is 'link'.`,
      },
    ],
  },
  {
    name: 'slack_add_reaction',
    description: `Add an emoji reaction to a Slack message. Returns ok. Use add_reaction to react. Use remove_reaction to take it off. Use get_reactions to read reactions on one item.`,
    params: [
      {
        name: 'channel',
        type: 'string',
        required: true,
        description: `Channel ID or channel name where the message exists`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Emoji name to react with (without colons)`,
      },
      {
        name: 'timestamp',
        type: 'string',
        required: true,
        description: `Timestamp of the message to add reaction to`,
      },
    ],
  },
  {
    name: 'slack_add_reminder',
    description: `Create a Slack reminder for a user. Requires a valid Slack OAuth2 connection with the reminders:write scope.`,
    params: [
      { name: 'text', type: 'string', required: true, description: `The content of the reminder.` },
      {
        name: 'time',
        type: 'string',
        required: true,
        description: `When this reminder should happen: a UNIX timestamp, the number of seconds until the reminder, or a natural-language string like 'in 15 minutes' or 'every Thursday'.`,
      },
      {
        name: 'user',
        type: 'string',
        required: false,
        description: `The user who will receive the reminder. Defaults to the reminder's creator if omitted.`,
      },
    ],
  },
  {
    name: 'slack_archive_channel',
    description: `Archive a Slack channel. Requires a valid Slack OAuth2 connection with channels:manage (bot) or channels:write (user) scope, or groups:write for private channels.`,
    params: [
      {
        name: 'channel',
        type: 'string',
        required: true,
        description: `ID of the channel to archive`,
      },
    ],
  },
  {
    name: 'slack_archive_conversation',
    description: `Archive a public or private Slack channel. Requires a valid Slack OAuth2 connection with the conversations:write scope.`,
    params: [
      {
        name: 'channel',
        type: 'string',
        required: true,
        description: `ID of the conversation to archive.`,
      },
    ],
  },
  {
    name: 'slack_auth_test',
    description: `Verify the current Slack connection's authentication and identity. Returns the connected team, user, and bot identity for the active token.`,
    params: [],
  },
  {
    name: 'slack_close_conversation',
    description: `Close a direct message or multi-person direct message conversation in Slack. Requires a valid Slack OAuth2 connection with the im:write or mpim:write scope.`,
    params: [
      { name: 'channel', type: 'string', required: true, description: `Conversation to close.` },
    ],
  },
  {
    name: 'slack_complete_reminder',
    description: `Mark a Slack reminder as complete. Requires a valid Slack OAuth2 connection with the reminders:write scope.`,
    params: [
      {
        name: 'reminder',
        type: 'string',
        required: true,
        description: `The ID of the reminder to mark as complete.`,
      },
    ],
  },
  {
    name: 'slack_complete_upload_external',
    description: `Step 2 of Slack's current file-upload flow: finalize file(s) previously uploaded to the URL returned by slack_get_upload_url_external, and optionally share them to a channel or thread. Requires a valid Slack OAuth2 connection with the files:write scope.`,
    params: [
      {
        name: 'files',
        type: 'array',
        required: true,
        description: `Array of uploaded files to finalize. Each item must have 'id' (the file_id from slack_get_upload_url_external) and may include 'title'.`,
      },
      {
        name: 'channel_id',
        type: 'string',
        required: false,
        description: `Channel ID to share the completed files to.`,
      },
      {
        name: 'initial_comment',
        type: 'string',
        required: false,
        description: `Message text to introduce the uploaded file(s) with.`,
      },
      {
        name: 'thread_ts',
        type: 'string',
        required: false,
        description: `Timestamp of the parent message, to share the file(s) as a threaded reply.`,
      },
    ],
  },
  {
    name: 'slack_create_canvas',
    description: `Create a new standalone Canvas, or one tabbed in a channel. The entire Canvases feature is otherwise uncovered by this connector. Requires a valid Slack OAuth2 connection with the canvases:write scope.`,
    params: [
      {
        name: 'channel_id',
        type: 'string',
        required: false,
        description: `Channel ID to tab this canvas in. Required for free/standard workspaces to create a canvas.`,
      },
      {
        name: 'document_content',
        type: 'object',
        required: false,
        description: `Structure describing the initial content, e.g. {"type": "markdown", "markdown": "# Hello"}. Markdown content is limited to 1 MiB.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Title of the newly created canvas.`,
      },
    ],
  },
  {
    name: 'slack_create_channel',
    description: `Creates a new public or private channel in a Slack workspace. Requires a valid Slack OAuth2 connection with channels:manage scope for public channels or groups:write scope for private channels.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Name of the channel to create (without # prefix)`,
      },
      {
        name: 'is_private',
        type: 'boolean',
        required: false,
        description: `Create a private channel instead of public`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Encoded team ID to create channel in (if using org tokens)`,
      },
    ],
  },
  {
    name: 'slack_create_usergroup',
    description: `Create a new Slack User Group (@handle group) for mentioning a set of users at once. Requires a valid Slack OAuth2 connection with the usergroups:write scope.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `A name for the User Group. Must be unique among User Groups.`,
      },
      {
        name: 'channels',
        type: 'string',
        required: false,
        description: `Comma-separated string of encoded channel IDs the User Group uses as its default channels.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `A short description of the User Group.`,
      },
      {
        name: 'handle',
        type: 'string',
        required: false,
        description: `A mention handle. Must be unique among channels, users, and User Groups.`,
      },
      {
        name: 'include_count',
        type: 'boolean',
        required: false,
        description: `Include the number of users in the User Group in the response.`,
      },
    ],
  },
  {
    name: 'slack_delete_file',
    description: `Delete a file uploaded to Slack. Requires a valid Slack OAuth2 connection with the files:write scope.`,
    params: [
      { name: 'file', type: 'string', required: true, description: `ID of the file to delete.` },
    ],
  },
  {
    name: 'slack_delete_message',
    description: `Delete an existing Slack message by channel and timestamp. Returns ok and the deleted timestamp. Use delete_message to remove a posted message. Use update_message to change its text.`,
    params: [
      {
        name: 'channel',
        type: 'string',
        required: true,
        description: `Channel ID, channel name (#general), or user ID for DM where the message was sent`,
      },
      {
        name: 'ts',
        type: 'string',
        required: true,
        description: `Timestamp of the message to delete`,
      },
    ],
  },
  {
    name: 'slack_delete_reminder',
    description: `Delete a Slack reminder. Requires a valid Slack OAuth2 connection with the reminders:write scope.`,
    params: [
      {
        name: 'reminder',
        type: 'string',
        required: true,
        description: `The ID of the reminder to delete.`,
      },
    ],
  },
  {
    name: 'slack_delete_scheduled_message',
    description: `Cancel a queued Slack message before it sends. Returns ok. Use delete_scheduled_message on a scheduled_message_id from list_scheduled_messages or schedule_rich_message.`,
    params: [
      {
        name: 'channel',
        type: 'string',
        required: true,
        description: `The channel the scheduled message is posting to.`,
      },
      {
        name: 'scheduled_message_id',
        type: 'string',
        required: true,
        description: `The scheduled_message_id returned from a prior call to slack_schedule_rich_message.`,
      },
      {
        name: 'as_user',
        type: 'boolean',
        required: false,
        description: `Pass true to delete the message as the authed user, requires the chat:write:user scope.`,
      },
    ],
  },
  {
    name: 'slack_disable_usergroup',
    description: `Disable an existing Slack User Group. Requires a valid Slack OAuth2 connection with the usergroups:write scope.`,
    params: [
      {
        name: 'usergroup',
        type: 'string',
        required: true,
        description: `The encoded ID of the User Group to disable.`,
      },
      {
        name: 'include_count',
        type: 'boolean',
        required: false,
        description: `Include the number of users in the User Group in the response.`,
      },
    ],
  },
  {
    name: 'slack_edit_bookmark',
    description: `Edit an existing Slack channel bookmark's title, link, or emoji. Requires a valid Slack OAuth2 connection with the bookmarks:write scope.`,
    params: [
      {
        name: 'bookmark_id',
        type: 'string',
        required: true,
        description: `ID of the bookmark to update.`,
      },
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `Channel where the bookmark resides.`,
      },
      {
        name: 'emoji',
        type: 'string',
        required: false,
        description: `New emoji to associate with the bookmark, e.g. ':pushpin:'.`,
      },
      { name: 'link', type: 'string', required: false, description: `New URL for the bookmark.` },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `New display title for the bookmark.`,
      },
    ],
  },
  {
    name: 'slack_edit_canvas',
    description: `Apply a list of change operations to an existing Slack Canvas (insert_at_end, insert_at_start, or replace, each with markdown document_content). Requires a valid Slack OAuth2 connection with canvases:write scope.`,
    params: [
      {
        name: 'canvas_id',
        type: 'string',
        required: true,
        description: `ID of the canvas to edit`,
      },
      {
        name: 'changes',
        type: 'array',
        required: true,
        description: `Array of change operation objects to apply, e.g. [{"operation": "insert_at_end", "document_content": {"type": "markdown", "markdown": "## New section"}}]`,
      },
    ],
  },
  {
    name: 'slack_enable_usergroup',
    description: `Enable a previously disabled Slack User Group. Requires a valid Slack OAuth2 connection with the usergroups:write scope.`,
    params: [
      {
        name: 'usergroup',
        type: 'string',
        required: true,
        description: `The encoded ID of the User Group to enable.`,
      },
      {
        name: 'include_count',
        type: 'boolean',
        required: false,
        description: `Include the number of users in the User Group in the response.`,
      },
    ],
  },
  {
    name: 'slack_end_dnd_snooze',
    description: `End the current Slack user's active Do Not Disturb snooze early. Requires a valid Slack OAuth2 connection with the dnd:write scope.`,
    params: [],
  },
  {
    name: 'slack_fetch_conversation_history',
    description: `Page messages in one Slack channel or DM in time order. Returns messages and a next_cursor. Use fetch_conversation_history to read a channel. Use search_messages to find text across the workspace. Use get_conversation_replies for one thread.`,
    params: [
      {
        name: 'channel',
        type: 'string',
        required: true,
        description: `Channel ID, channel name (#general), or user ID for DM`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Paginate through collections by cursor for pagination`,
      },
      {
        name: 'latest',
        type: 'string',
        required: false,
        description: `End of time range of messages to include in results`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of messages to return (1-1000, default 100)`,
      },
      {
        name: 'oldest',
        type: 'string',
        required: false,
        description: `Start of time range of messages to include in results`,
      },
    ],
  },
  {
    name: 'slack_get_bot_info',
    description: `Retrieve information about a bot user in Slack, such as its name and icons. Requires a valid Slack OAuth2 connection with the users:read scope.`,
    params: [
      {
        name: 'bot',
        type: 'string',
        required: false,
        description: `Bot user to get info on. Defaults to the calling bot's own identity if omitted.`,
      },
    ],
  },
  {
    name: 'slack_get_conversation_info',
    description: `Get metadata for one Slack channel, including settings and optional member count. Returns the channel object. Use get_conversation_info for one known channel. Use list_channels when you do not have the id.`,
    params: [
      {
        name: 'channel',
        type: 'string',
        required: true,
        description: `Channel ID, channel name (#general), or user ID for DM`,
      },
      {
        name: 'include_locale',
        type: 'boolean',
        required: false,
        description: `Set to true to include the locale for this conversation`,
      },
      {
        name: 'include_num_members',
        type: 'boolean',
        required: false,
        description: `Set to true to include the member count for the conversation`,
      },
    ],
  },
  {
    name: 'slack_get_conversation_replies',
    description: `Page replies in one Slack thread by parent timestamp. Returns messages and a next_cursor. Use get_conversation_replies for a thread. Use fetch_conversation_history for the channel's main timeline.`,
    params: [
      {
        name: 'channel',
        type: 'string',
        required: true,
        description: `Channel ID, channel name (#general), or user ID for DM`,
      },
      {
        name: 'ts',
        type: 'string',
        required: true,
        description: `Timestamp of the parent message to get replies for`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor for retrieving next page of results`,
      },
      {
        name: 'inclusive',
        type: 'boolean',
        required: false,
        description: `Include messages with latest or oldest timestamp in results`,
      },
      {
        name: 'latest',
        type: 'string',
        required: false,
        description: `End of time range of messages to include in results`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of messages to return (default 100, max 1000)`,
      },
      {
        name: 'oldest',
        type: 'string',
        required: false,
        description: `Start of time range of messages to include in results`,
      },
    ],
  },
  {
    name: 'slack_get_dnd_info',
    description: `Retrieve a Slack user's current Do Not Disturb status, including whether it is active and when it ends. Requires a valid Slack OAuth2 connection with the dnd:read scope.`,
    params: [
      {
        name: 'user',
        type: 'string',
        required: false,
        description: `User to fetch Do Not Disturb status for. Defaults to the authenticated user.`,
      },
    ],
  },
  {
    name: 'slack_get_file_info',
    description: `Get metadata and comments for one Slack file by id. Returns the file object. Use get_file_info for a known file id. Use list_files or search_files when you do not have the id.`,
    params: [
      {
        name: 'file',
        type: 'string',
        required: true,
        description: `Specify a file by providing its ID.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous call's response_metadata.next_cursor.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The maximum number of items to return.`,
      },
    ],
  },
  {
    name: 'slack_get_permalink',
    description: `Retrieve a permalink URL for a specific existing Slack message, identified by its channel and timestamp.`,
    params: [
      {
        name: 'channel',
        type: 'string',
        required: true,
        description: `The ID of the conversation or channel containing the message.`,
      },
      {
        name: 'message_ts',
        type: 'string',
        required: true,
        description: `A message's ts value, uniquely identifying it within a channel.`,
      },
    ],
  },
  {
    name: 'slack_get_reactions',
    description: `Read emoji reactions on one Slack message, file, or file comment. Returns the item and its reactions. Use get_reactions for one item. Use list_reactions for items a user has reacted to.`,
    params: [
      {
        name: 'channel',
        type: 'string',
        required: false,
        description: `Channel where the message to get reactions for was posted. Required when looking up a message.`,
      },
      { name: 'file', type: 'string', required: false, description: `File to get reactions for.` },
      {
        name: 'file_comment',
        type: 'string',
        required: false,
        description: `File comment to get reactions for.`,
      },
      {
        name: 'full',
        type: 'boolean',
        required: false,
        description: `If true, always return the complete reaction list.`,
      },
      {
        name: 'timestamp',
        type: 'string',
        required: false,
        description: `Timestamp of the message to get reactions for. Required when looking up a message.`,
      },
    ],
  },
  {
    name: 'slack_get_reminder_info',
    description: `Retrieve details about a specific Slack reminder by its ID. Requires a valid Slack OAuth2 connection with the reminders:read scope.`,
    params: [
      {
        name: 'reminder',
        type: 'string',
        required: true,
        description: `The ID of the reminder to look up.`,
      },
    ],
  },
  {
    name: 'slack_get_team_dnd_info',
    description: `Retrieve the Do Not Disturb status for up to 50 users on a Slack team at once. Requires a valid Slack OAuth2 connection with the dnd:read scope.`,
    params: [
      {
        name: 'users',
        type: 'string',
        required: true,
        description: `Comma-separated list of user IDs to fetch Do Not Disturb status for (up to 50).`,
      },
    ],
  },
  {
    name: 'slack_get_team_info',
    description: `Retrieve information about the current Slack team/workspace, such as its name, domain, and icon. Requires a valid Slack OAuth2 connection with the team:read scope.`,
    params: [
      {
        name: 'team',
        type: 'string',
        required: false,
        description: `Team to get info on. If omitted, returns information about the current team.`,
      },
    ],
  },
  {
    name: 'slack_get_upload_url_external',
    description: `Step 1 of Slack's current file-upload flow: request an upload URL and file ID for a given filename and size. Use slack_complete_upload_external afterward to finalize and share the uploaded file. The classic files.upload method was sunset on 2025-11-12; this is the only way to upload new file content today. Requires a valid Slack OAuth2 connection with the files:write scope.`,
    params: [
      {
        name: 'filename',
        type: 'string',
        required: true,
        description: `Name of the file being uploaded.`,
      },
      {
        name: 'length',
        type: 'integer',
        required: true,
        description: `Size of the file to upload, in bytes.`,
      },
      {
        name: 'alt_txt',
        type: 'string',
        required: false,
        description: `Description of the image for accessibility, max 1000 characters.`,
      },
      {
        name: 'snippet_type',
        type: 'string',
        required: false,
        description: `Syntax type of the snippet being uploaded, if any (e.g. python, json).`,
      },
    ],
  },
  {
    name: 'slack_get_user_info',
    description: `Retrieves detailed information about a specific Slack user, including profile data, status, and workspace information. Requires a valid Slack OAuth2 connection with users:read scope.`,
    params: [
      {
        name: 'user',
        type: 'string',
        required: true,
        description: `User ID to get information about`,
      },
      {
        name: 'include_locale',
        type: 'boolean',
        required: false,
        description: `Set to true to include locale information for the user`,
      },
    ],
  },
  {
    name: 'slack_get_user_presence',
    description: `Gets the current presence status of a Slack user (active, away, etc.). Indicates whether the user is currently online and available. Requires a valid Slack OAuth2 connection with users:read scope.`,
    params: [
      {
        name: 'user',
        type: 'string',
        required: true,
        description: `User ID to check presence for`,
      },
    ],
  },
  {
    name: 'slack_get_user_profile',
    description: `Retrieve detailed profile information for a Slack user, including custom profile fields. Requires a valid Slack OAuth2 connection with the users.profile:read scope.`,
    params: [
      {
        name: 'include_labels',
        type: 'boolean',
        required: false,
        description: `Include labels for each custom profile field ID.`,
      },
      {
        name: 'user',
        type: 'string',
        required: false,
        description: `User to retrieve profile info for. Defaults to the authenticated user if omitted.`,
      },
    ],
  },
  {
    name: 'slack_invite_users_to_channel',
    description: `Invites one or more users to a Slack channel. Requires a valid Slack OAuth2 connection with channels:write scope for public channels or groups:write for private channels.`,
    params: [
      {
        name: 'channel',
        type: 'string',
        required: true,
        description: `Channel ID or channel name (#general) to invite users to`,
      },
      {
        name: 'users',
        type: 'string',
        required: true,
        description: `Comma-separated list of user IDs to invite to the channel`,
      },
    ],
  },
  {
    name: 'slack_join_conversation',
    description: `Joins an existing Slack channel. The authenticated user will become a member of the channel. Requires a valid Slack OAuth2 connection with channels:write scope for public channels.`,
    params: [
      {
        name: 'channel',
        type: 'string',
        required: true,
        description: `Channel ID or channel name (#general) to join`,
      },
    ],
  },
  {
    name: 'slack_kick_from_conversation',
    description: `Remove a user from a Slack conversation. Requires a valid Slack OAuth2 connection with the conversations:write scope.`,
    params: [
      {
        name: 'channel',
        type: 'string',
        required: true,
        description: `ID of the conversation to remove the user from.`,
      },
      { name: 'user', type: 'string', required: true, description: `User ID to be removed.` },
    ],
  },
  {
    name: 'slack_kick_user_from_channel',
    description: `Remove a user from a Slack channel. Requires a valid Slack OAuth2 connection with channels:manage (bot) or channels:write (user) scope, or groups:write for private channels.`,
    params: [
      {
        name: 'channel',
        type: 'string',
        required: true,
        description: `ID of the channel to remove the user from`,
      },
      { name: 'user', type: 'string', required: true, description: `ID of the user to remove` },
    ],
  },
  {
    name: 'slack_leave_conversation',
    description: `Leaves a Slack channel. The authenticated user will be removed from the channel and will no longer receive messages from it. Requires a valid Slack OAuth2 connection with channels:write scope for public channels or groups:write for private channels.`,
    params: [
      {
        name: 'channel',
        type: 'string',
        required: true,
        description: `Channel ID or channel name (#general) to leave`,
      },
    ],
  },
  {
    name: 'slack_list_bookmarks',
    description: `List the bookmarks on a Slack channel. Requires a valid Slack OAuth2 connection with the bookmarks:read scope.`,
    params: [
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `Channel whose bookmarks should be listed.`,
      },
    ],
  },
  {
    name: 'slack_list_channel_members',
    description: `List the member user IDs of a Slack channel. Requires a valid Slack OAuth2 connection with channels:read (public) or groups:read (private) scope.`,
    params: [
      {
        name: 'channel',
        type: 'string',
        required: true,
        description: `Channel ID or channel name to list members for`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response's response_metadata.next_cursor`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of members to return per page`,
      },
    ],
  },
  {
    name: 'slack_list_channels',
    description: `List public and private Slack channels the caller can see. Returns channels and a next_cursor. Use list_channels to browse the workspace. Use list_user_conversations for one user's membership. Use get_conversation_info for one channel's metadata.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor for retrieving next page of results`,
      },
      {
        name: 'exclude_archived',
        type: 'boolean',
        required: false,
        description: `Exclude archived channels from the list`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of channels to return (default 100, max 1000)`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Encoded team ID to list channels for (optional)`,
      },
      {
        name: 'types',
        type: 'string',
        required: false,
        description: `Mix and match channel types (public_channel, private_channel, mpim, im)`,
      },
    ],
  },
  {
    name: 'slack_list_emoji',
    description: `List the custom emoji available for a Slack team. Requires a valid Slack OAuth2 connection with the emoji:read scope.`,
    params: [],
  },
  {
    name: 'slack_list_files',
    description: `List Slack files, optionally filtered by user, channel, type, or time range. Returns files and paging fields. Use list_files to browse with filters. Use search_files for a text query. Use get_file_info for one file id.`,
    params: [
      {
        name: 'channel',
        type: 'string',
        required: false,
        description: `Filter files appearing in a specific channel, indicated by its ID.`,
      },
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: `Number of items to return per page.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number of results to return.`,
      },
      {
        name: 'ts_from',
        type: 'string',
        required: false,
        description: `Filter files created after this UNIX timestamp (inclusive).`,
      },
      {
        name: 'ts_to',
        type: 'string',
        required: false,
        description: `Filter files created before this UNIX timestamp (inclusive).`,
      },
      {
        name: 'types',
        type: 'string',
        required: false,
        description: `Comma-separated list of file types to filter by (e.g., images, pdfs, docs).`,
      },
      {
        name: 'user',
        type: 'string',
        required: false,
        description: `Filter files created by a single user.`,
      },
    ],
  },
  {
    name: 'slack_list_pinned_items',
    description: `List the messages and files pinned to a Slack channel. Requires a valid Slack OAuth2 connection with the pins:read scope.`,
    params: [
      {
        name: 'channel',
        type: 'string',
        required: true,
        description: `Channel to get pinned items for.`,
      },
    ],
  },
  {
    name: 'slack_list_reactions',
    description: `List Slack items a user has reacted to. Returns items and a next_cursor. Use list_reactions for a user's reaction history. Use get_reactions for one message or file.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous call's response_metadata.next_cursor.`,
      },
      {
        name: 'full',
        type: 'boolean',
        required: false,
        description: `If true, always return the complete reaction list for each item.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The maximum number of items to return.`,
      },
      {
        name: 'user',
        type: 'string',
        required: false,
        description: `Show reactions made by this user. Defaults to the authenticated user.`,
      },
    ],
  },
  {
    name: 'slack_list_reminders',
    description: `List all reminders created by or for the authenticated Slack user. Requires a valid Slack OAuth2 connection with the reminders:read scope.`,
    params: [],
  },
  {
    name: 'slack_list_scheduled_messages',
    description: `List Slack messages waiting to send, optionally filtered by channel or time. Returns scheduled_messages and a next_cursor. Use list_scheduled_messages to browse the queue. Use search_messages for text already posted.`,
    params: [
      {
        name: 'channel',
        type: 'string',
        required: false,
        description: `The channel of the scheduled messages. Omit to list across all channels.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous call's response_metadata.next_cursor.`,
      },
      {
        name: 'latest',
        type: 'string',
        required: false,
        description: `A UNIX timestamp of the latest value in the time range.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of original entries to return.`,
      },
      {
        name: 'oldest',
        type: 'string',
        required: false,
        description: `A UNIX timestamp of the oldest value in the time range.`,
      },
    ],
  },
  {
    name: 'slack_list_user_conversations',
    description: `List Slack conversations one user belongs to. Returns channels and a next_cursor. Use list_user_conversations for one member. Use list_channels to browse the whole workspace.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous call's next_cursor value.`,
      },
      {
        name: 'exclude_archived',
        type: 'boolean',
        required: false,
        description: `Set to true to exclude archived channels from the list.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The maximum number of items to return.`,
      },
      {
        name: 'types',
        type: 'string',
        required: false,
        description: `Comma-separated list of channel types to include (public_channel, private_channel, mpim, im).`,
      },
      {
        name: 'user',
        type: 'string',
        required: false,
        description: `Browse conversations by a specific user ID's membership. Defaults to the authenticated user if omitted.`,
      },
    ],
  },
  {
    name: 'slack_list_usergroup_users',
    description: `List all users belonging to a Slack User Group. Requires a valid Slack OAuth2 connection with the usergroups:read scope.`,
    params: [
      {
        name: 'usergroup',
        type: 'string',
        required: true,
        description: `The encoded ID of the User Group to list members for.`,
      },
      {
        name: 'include_disabled',
        type: 'boolean',
        required: false,
        description: `Allow results for disabled User Groups.`,
      },
    ],
  },
  {
    name: 'slack_list_usergroups',
    description: `List all User Groups (@handle groups) for a Slack team. Requires a valid Slack OAuth2 connection with the usergroups:read scope.`,
    params: [
      {
        name: 'include_count',
        type: 'boolean',
        required: false,
        description: `Include the number of users in each User Group.`,
      },
      {
        name: 'include_disabled',
        type: 'boolean',
        required: false,
        description: `Include disabled User Groups in the results.`,
      },
      {
        name: 'include_users',
        type: 'boolean',
        required: false,
        description: `Include the list of users for each User Group.`,
      },
    ],
  },
  {
    name: 'slack_list_users',
    description: `Lists all users in a Slack workspace, including information about their status, profile, and presence. Requires a valid Slack OAuth2 connection with users:read scope.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor for fetching additional pages of users`,
      },
      {
        name: 'include_locale',
        type: 'boolean',
        required: false,
        description: `Set to true to include locale information for each user`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of users to return (1-1000)`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Encoded team ID to list users for (if using org tokens)`,
      },
    ],
  },
  {
    name: 'slack_lookup_user_by_email',
    description: `Find a user by their registered email address in a Slack workspace. Requires a valid Slack OAuth2 connection with users:read.email scope. Cannot be used by custom bot users.`,
    params: [
      {
        name: 'email',
        type: 'string',
        required: true,
        description: `Email address to search for users by`,
      },
    ],
  },
  {
    name: 'slack_mark_conversation_read',
    description: `Set the read cursor in a Slack channel or conversation to a given message, marking everything up to and including it as read. Requires a valid Slack OAuth2 connection with the conversations:write scope.`,
    params: [
      {
        name: 'channel',
        type: 'string',
        required: true,
        description: `Channel or conversation to set the read cursor for.`,
      },
      {
        name: 'ts',
        type: 'string',
        required: true,
        description: `Unique identifier (timestamp) of the message marked as most recently seen in this conversation.`,
      },
    ],
  },
  {
    name: 'slack_open_conversation',
    description: `Open or resume a direct message or multi-person direct message in Slack. Provide either an existing im/mpim channel ID to resume, or a list of user IDs to start a new one. Requires a valid Slack OAuth2 connection with the im:write scope.`,
    params: [
      {
        name: 'channel',
        type: 'string',
        required: false,
        description: `Resume a conversation by supplying an existing im or mpim channel ID. Provide this or users, not both.`,
      },
      {
        name: 'return_im',
        type: 'boolean',
        required: false,
        description: `If true, the response includes the full IM channel definition even if the channel already existed.`,
      },
      {
        name: 'users',
        type: 'string',
        required: false,
        description: `Comma-separated list of user IDs. If only one user is included, this creates a 1:1 DM.`,
      },
    ],
  },
  {
    name: 'slack_open_view',
    description: `Open a modal view for a Slack user in response to a trigger (e.g., a slash command or button click). Requires a valid Slack OAuth2 connection.`,
    params: [
      {
        name: 'trigger_id',
        type: 'string',
        required: true,
        description: `Exchange a trigger to post the view to the user. Trigger IDs expire after 3 seconds.`,
      },
      {
        name: 'view',
        type: 'object',
        required: true,
        description: `A view payload object describing the modal to display.`,
      },
    ],
  },
  {
    name: 'slack_pin_message',
    description: `Pin a message to a Slack channel. Pinned messages are highlighted and easily accessible to channel members. Requires a valid Slack OAuth2 connection with pins:write scope.`,
    params: [
      {
        name: 'channel',
        type: 'string',
        required: true,
        description: `Channel ID or channel name where the message exists`,
      },
      {
        name: 'timestamp',
        type: 'string',
        required: true,
        description: `Timestamp of the message to pin`,
      },
    ],
  },
  {
    name: 'slack_publish_view',
    description: `Publish a static App Home view for a specific Slack user. Requires a valid Slack OAuth2 connection.`,
    params: [
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `The id of the user you want to publish the App Home view to.`,
      },
      {
        name: 'view',
        type: 'object',
        required: true,
        description: `A view payload object of type 'home' describing the App Home content.`,
      },
      {
        name: 'hash',
        type: 'string',
        required: false,
        description: `A string representing view state, used to protect against race conditions between multiple publishes.`,
      },
    ],
  },
  {
    name: 'slack_push_view',
    description: `Push a new modal view onto the stack of an existing root modal view for a Slack user. Requires a valid Slack OAuth2 connection.`,
    params: [
      {
        name: 'trigger_id',
        type: 'string',
        required: true,
        description: `Exchange a trigger to post the view to the user. Trigger IDs expire after 3 seconds.`,
      },
      {
        name: 'view',
        type: 'object',
        required: true,
        description: `A view payload object describing the modal to push onto the stack.`,
      },
    ],
  },
  {
    name: 'slack_remove_bookmark',
    description: `Remove a bookmark from a Slack channel. Requires a valid Slack OAuth2 connection with the bookmarks:write scope.`,
    params: [
      {
        name: 'bookmark_id',
        type: 'string',
        required: true,
        description: `ID of the bookmark to remove.`,
      },
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `Channel where the bookmark resides.`,
      },
    ],
  },
  {
    name: 'slack_remove_pin',
    description: `Un-pin a message from a Slack channel. Requires a valid Slack OAuth2 connection with the pins:write scope.`,
    params: [
      {
        name: 'channel',
        type: 'string',
        required: true,
        description: `Channel where the item is pinned.`,
      },
      {
        name: 'timestamp',
        type: 'string',
        required: false,
        description: `Timestamp of the message to un-pin.`,
      },
    ],
  },
  {
    name: 'slack_remove_reaction',
    description: `Remove an emoji reaction from a Slack message. Returns ok. Use remove_reaction to clear a reaction. Use add_reaction to add one.`,
    params: [
      {
        name: 'channel',
        type: 'string',
        required: true,
        description: `Channel ID or channel name where the message exists`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Emoji name to remove (without colons)`,
      },
      {
        name: 'timestamp',
        type: 'string',
        required: true,
        description: `Timestamp of the message to remove reaction from`,
      },
    ],
  },
  {
    name: 'slack_rename_channel',
    description: `Rename a Slack channel. Requires a valid Slack OAuth2 connection with channels:manage (bot) or channels:write (user) scope, or groups:write for private channels.`,
    params: [
      {
        name: 'channel',
        type: 'string',
        required: true,
        description: `ID of the channel to rename`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `New name for the channel (lowercase letters, numbers, hyphens, underscores; max 80 characters)`,
      },
    ],
  },
  {
    name: 'slack_rename_conversation',
    description: `Rename an existing Slack channel. Requires a valid Slack OAuth2 connection with the conversations:write scope.`,
    params: [
      {
        name: 'channel',
        type: 'string',
        required: true,
        description: `ID of the conversation to rename.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `New name for the conversation.`,
      },
    ],
  },
  {
    name: 'slack_revoke_file_public_url',
    description: `Revoke public, external sharing access for a file uploaded to Slack, disabling its public URL. Requires a valid Slack OAuth2 connection with the files:write scope.`,
    params: [
      {
        name: 'file',
        type: 'string',
        required: true,
        description: `File to revoke public sharing for.`,
      },
    ],
  },
  {
    name: 'slack_schedule_rich_message',
    description: `Schedule a Slack message, including Block Kit, for a future Unix time. Returns scheduled_message_id and post_at. Use schedule_rich_message for later delivery. Use send_rich_message to post now.`,
    params: [
      {
        name: 'channel',
        type: 'string',
        required: true,
        description: `Channel ID, channel name (#general), or user ID for DM`,
      },
      {
        name: 'post_at',
        type: 'integer',
        required: true,
        description: `Unix timestamp (seconds) for when the message should be sent`,
      },
      {
        name: 'text',
        type: 'string',
        required: true,
        description: `Fallback message text, shown in notifications and clients that can't render blocks/attachments`,
      },
      {
        name: 'attachments',
        type: 'array',
        required: false,
        description: `Array of legacy attachment objects for additional message formatting`,
      },
      {
        name: 'blocks',
        type: 'array',
        required: false,
        description: `Array of Block Kit block elements for rich message formatting`,
      },
      {
        name: 'reply_broadcast',
        type: 'boolean',
        required: false,
        description: `Used in conjunction with thread_ts to broadcast reply to channel`,
      },
      {
        name: 'thread_ts',
        type: 'string',
        required: false,
        description: `Timestamp of parent message to reply in thread`,
      },
      {
        name: 'unfurl_links',
        type: 'boolean',
        required: false,
        description: `Enable or disable link previews`,
      },
      {
        name: 'unfurl_media',
        type: 'boolean',
        required: false,
        description: `Enable or disable media link previews`,
      },
    ],
  },
  {
    name: 'slack_search_all',
    description: `Search for both messages and files across the Slack workspace matching a query in a single call. Requires a valid Slack OAuth2 connection with search:read scope (user-token authorization; not available to bot tokens).`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Search query. Supports Slack search modifiers like from:, in:, before:, after:`,
      },
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: `Number of results to return per page`,
      },
      {
        name: 'highlight',
        type: 'boolean',
        required: false,
        description: `Enable query highlight markers in results`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number of results to return`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort results by relevance score or by timestamp`,
      },
      { name: 'sort_dir', type: 'string', required: false, description: `Sort direction` },
    ],
  },
  {
    name: 'slack_search_files',
    description: `Search Slack files by query text and Slack modifiers. Returns matching files with pagination. Use search_files to find files by text. Use list_files to browse with filters. Needs a user token with search:read.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Search query. Supports Slack search modifiers such as from:, in:, and before:.`,
      },
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: `Number of results to return per page.`,
      },
      {
        name: 'highlight',
        type: 'boolean',
        required: false,
        description: `Enable query highlight markers in the returned results.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number of results to return.`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Return matches sorted by either score (relevance) or timestamp (recency).`,
      },
      {
        name: 'sort_dir',
        type: 'string',
        required: false,
        description: `Sort direction: ascending (asc) or descending (desc).`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Encoded team ID to search in. Required if using an org-wide token.`,
      },
    ],
  },
  {
    name: 'slack_search_messages',
    description: `Search posted Slack messages by query text and Slack modifiers (from:, in:, before:). Returns matching messages with pagination. Use search_messages to find text. Use fetch_conversation_history to page one channel in time order. Needs a user token with search:read.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Search query. Supports Slack search modifiers such as from:, in:, and before:.`,
      },
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: `Number of results to return per page. Maximum of 100.`,
      },
      {
        name: 'highlight',
        type: 'boolean',
        required: false,
        description: `Enable query highlight markers in the returned message text.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number of results to return.`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Return matches sorted by either score (relevance) or timestamp (recency).`,
      },
      {
        name: 'sort_dir',
        type: 'string',
        required: false,
        description: `Sort direction: ascending (asc) or descending (desc).`,
      },
    ],
  },
  {
    name: 'slack_send_ephemeral_message',
    description: `Send a Slack message that only one user can see in a channel. Returns channel and message timestamp. Use send_ephemeral_message for a private in-channel notice. Use send_message when everyone in the channel should see it.`,
    params: [
      {
        name: 'channel',
        type: 'string',
        required: true,
        description: `Channel ID or channel name where the ephemeral message should appear`,
      },
      {
        name: 'text',
        type: 'string',
        required: true,
        description: `Fallback message text, shown in notifications and clients that can't render blocks/attachments`,
      },
      {
        name: 'user',
        type: 'string',
        required: true,
        description: `User ID of the user who should see the ephemeral message`,
      },
      {
        name: 'attachments',
        type: 'array',
        required: false,
        description: `Array of legacy attachment objects for additional message formatting`,
      },
      {
        name: 'blocks',
        type: 'array',
        required: false,
        description: `Array of Block Kit block elements for rich message formatting`,
      },
      {
        name: 'thread_ts',
        type: 'string',
        required: false,
        description: `Timestamp of parent message to post the ephemeral message in a thread`,
      },
    ],
  },
  {
    name: 'slack_send_me_message',
    description: `Send an italic /me-style action line to a Slack channel. Returns channel and message timestamp. Use send_me_message for an action line. Use send_message for a normal chat line.`,
    params: [
      {
        name: 'channel',
        type: 'string',
        required: true,
        description: `Channel to send the message to. Can be a public channel, private group, or IM channel.`,
      },
      { name: 'text', type: 'string', required: true, description: `Text of the message to send.` },
    ],
  },
  {
    name: 'slack_send_message',
    description: `Send plain text to a Slack channel or DM, optionally in a thread. Returns channel and message timestamp. Use send_message for text. Use send_rich_message when the message needs Block Kit or attachments.`,
    params: [
      {
        name: 'channel',
        type: 'string',
        required: true,
        description: `Channel ID, channel name (#general), or user ID for DM`,
      },
      { name: 'text', type: 'string', required: true, description: `Message text content` },
      {
        name: 'attachments',
        type: 'string',
        required: false,
        description: `JSON-encoded array of attachment objects for additional message formatting`,
      },
      {
        name: 'blocks',
        type: 'string',
        required: false,
        description: `JSON-encoded array of Block Kit block elements for rich message formatting`,
      },
      {
        name: 'reply_broadcast',
        type: 'boolean',
        required: false,
        description: `Used in conjunction with thread_ts to broadcast reply to channel`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Optional schema version to use for tool execution`,
      },
      {
        name: 'thread_ts',
        type: 'string',
        required: false,
        description: `Timestamp of parent message to reply in thread`,
      },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Optional tool version to use for execution`,
      },
      {
        name: 'unfurl_links',
        type: 'boolean',
        required: false,
        description: `Enable or disable link previews`,
      },
      {
        name: 'unfurl_media',
        type: 'boolean',
        required: false,
        description: `Enable or disable media link previews`,
      },
    ],
  },
  {
    name: 'slack_send_rich_message',
    description: `Send a Slack message with Block Kit blocks or legacy attachments. Returns channel and message timestamp. Use send_rich_message for rich layout. Use send_message for plain text.`,
    params: [
      {
        name: 'channel',
        type: 'string',
        required: true,
        description: `Channel ID, channel name (#general), or user ID for DM`,
      },
      {
        name: 'text',
        type: 'string',
        required: true,
        description: `Fallback message text, shown in notifications and clients that can't render blocks/attachments`,
      },
      {
        name: 'attachments',
        type: 'array',
        required: false,
        description: `Array of legacy attachment objects for additional message formatting`,
      },
      {
        name: 'blocks',
        type: 'array',
        required: false,
        description: `Array of Block Kit block elements for rich message formatting`,
      },
      {
        name: 'reply_broadcast',
        type: 'boolean',
        required: false,
        description: `Used in conjunction with thread_ts to broadcast reply to channel`,
      },
      {
        name: 'thread_ts',
        type: 'string',
        required: false,
        description: `Timestamp of parent message to reply in thread`,
      },
      {
        name: 'unfurl_links',
        type: 'boolean',
        required: false,
        description: `Enable or disable link previews`,
      },
      {
        name: 'unfurl_media',
        type: 'boolean',
        required: false,
        description: `Enable or disable media link previews`,
      },
    ],
  },
  {
    name: 'slack_set_channel_purpose',
    description: `Set the purpose/description for a Slack channel. Requires a valid Slack OAuth2 connection with channels:write.topic (or channels:manage) scope, or groups:write.topic for private channels.`,
    params: [
      {
        name: 'channel',
        type: 'string',
        required: true,
        description: `ID of the channel to update`,
      },
      {
        name: 'purpose',
        type: 'string',
        required: true,
        description: `New purpose/description string (max 250 characters)`,
      },
    ],
  },
  {
    name: 'slack_set_channel_topic',
    description: `Set the topic for a Slack channel. Requires a valid Slack OAuth2 connection with channels:write.topic (or channels:manage) scope, or groups:write.topic for private channels.`,
    params: [
      {
        name: 'channel',
        type: 'string',
        required: true,
        description: `ID of the channel to update`,
      },
      {
        name: 'topic',
        type: 'string',
        required: true,
        description: `New topic string (max 250 characters, no formatting or linkification)`,
      },
    ],
  },
  {
    name: 'slack_set_conversation_purpose',
    description: `Set the purpose (description) for a Slack conversation. Requires a valid Slack OAuth2 connection with the conversations:write scope.`,
    params: [
      {
        name: 'channel',
        type: 'string',
        required: true,
        description: `Conversation to set the purpose of.`,
      },
      {
        name: 'purpose',
        type: 'string',
        required: true,
        description: `The new purpose text for the conversation.`,
      },
    ],
  },
  {
    name: 'slack_set_conversation_topic',
    description: `Set the topic for a Slack conversation. Does not support formatting or linkification. Requires a valid Slack OAuth2 connection with the conversations:write scope.`,
    params: [
      {
        name: 'channel',
        type: 'string',
        required: true,
        description: `Conversation to set the topic of.`,
      },
      {
        name: 'topic',
        type: 'string',
        required: true,
        description: `The new topic string. Does not support formatting or linkification.`,
      },
    ],
  },
  {
    name: 'slack_set_dnd_snooze',
    description: `Turn on Do Not Disturb snooze for the current Slack user for a given number of minutes. Requires a valid Slack OAuth2 connection with the dnd:write scope.`,
    params: [
      {
        name: 'num_minutes',
        type: 'integer',
        required: true,
        description: `Number of minutes, from now, to snooze notifications for.`,
      },
    ],
  },
  {
    name: 'slack_set_user_presence',
    description: `Manually set the authenticated user's Slack presence to active or away. Requires a valid Slack OAuth2 connection with the users:write scope.`,
    params: [
      {
        name: 'presence',
        type: 'string',
        required: true,
        description: `The presence to set: auto (active) or away.`,
      },
    ],
  },
  {
    name: 'slack_set_user_status',
    description: `Set the user's custom status with text and emoji. This appears in their profile and can include an expiration time. Requires a valid Slack OAuth2 connection with users.profile:write scope.`,
    params: [
      {
        name: 'status_emoji',
        type: 'string',
        required: false,
        description: `Emoji to display with status (without colons)`,
      },
      {
        name: 'status_expiration',
        type: 'integer',
        required: false,
        description: `Unix timestamp when status should expire`,
      },
      {
        name: 'status_text',
        type: 'string',
        required: false,
        description: `Status text to display`,
      },
    ],
  },
  {
    name: 'slack_share_file_public_url',
    description: `Enable public, external sharing for a file uploaded to Slack, generating a URL anyone can use to view it. Requires a valid Slack OAuth2 connection with the files:write scope.`,
    params: [
      { name: 'file', type: 'string', required: true, description: `File to share publicly.` },
    ],
  },
  {
    name: 'slack_unarchive_channel',
    description: `Unarchive a Slack channel. Requires a valid Slack OAuth2 connection with channels:write (user) or groups:write scope. Note: Slack currently only supports unarchiving via a User Token, not a Bot Token - use a User Token Scope for this tool.`,
    params: [
      {
        name: 'channel',
        type: 'string',
        required: true,
        description: `ID of the channel to unarchive`,
      },
    ],
  },
  {
    name: 'slack_unarchive_conversation',
    description: `Reverse the archival of a Slack channel, restoring it to active use. Requires a valid Slack OAuth2 connection with the conversations:write scope.`,
    params: [
      {
        name: 'channel',
        type: 'string',
        required: true,
        description: `ID of the conversation to unarchive.`,
      },
    ],
  },
  {
    name: 'slack_unfurl_message',
    description: `Provide custom unfurl (link preview) content for a URL posted in an existing Slack message. Requires a valid Slack OAuth2 connection with the links:write scope.`,
    params: [
      {
        name: 'channel',
        type: 'string',
        required: true,
        description: `Channel ID of the message.`,
      },
      {
        name: 'ts',
        type: 'string',
        required: true,
        description: `Timestamp of the message to add unfurl behavior to.`,
      },
      {
        name: 'unfurls',
        type: 'object',
        required: true,
        description: `JSON object with keys set to URLs featured in the message, each mapped to its unfurl attachment payload.`,
      },
    ],
  },
  {
    name: 'slack_unpin_message',
    description: `Remove a pinned message from a Slack channel. Requires a valid Slack OAuth2 connection with pins:write scope.`,
    params: [
      {
        name: 'channel',
        type: 'string',
        required: true,
        description: `Channel ID or channel name where the message is pinned`,
      },
      {
        name: 'timestamp',
        type: 'string',
        required: true,
        description: `Timestamp of the pinned message to unpin`,
      },
    ],
  },
  {
    name: 'slack_update_message',
    description: `Edit an existing Slack message by channel and timestamp. Returns the updated message timestamp. Use update_message to change text that is already posted. Use send_message to post a new line.`,
    params: [
      {
        name: 'channel',
        type: 'string',
        required: true,
        description: `Channel ID, channel name (#general), or user ID for DM where the message was sent`,
      },
      {
        name: 'ts',
        type: 'string',
        required: true,
        description: `Timestamp of the message to update`,
      },
      {
        name: 'attachments',
        type: 'array',
        required: false,
        description: `Array of attachment objects for additional message formatting`,
      },
      {
        name: 'blocks',
        type: 'array',
        required: false,
        description: `Array of Block Kit block elements for rich message formatting`,
      },
      { name: 'text', type: 'string', required: false, description: `New message text content` },
    ],
  },
  {
    name: 'slack_update_usergroup',
    description: `Update the name, handle, description, or default channels of an existing Slack User Group. Only the fields you provide are changed. Requires a valid Slack OAuth2 connection with the usergroups:write scope.`,
    params: [
      {
        name: 'usergroup',
        type: 'string',
        required: true,
        description: `The encoded ID of the User Group to update.`,
      },
      {
        name: 'channels',
        type: 'string',
        required: false,
        description: `Comma-separated string of encoded channel IDs the User Group uses as its default channels.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `A new short description of the User Group.`,
      },
      {
        name: 'handle',
        type: 'string',
        required: false,
        description: `A new mention handle. Must be unique among channels, users, and User Groups.`,
      },
      {
        name: 'include_count',
        type: 'boolean',
        required: false,
        description: `Include the number of users in the User Group in the response.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `A new name for the User Group. Must be unique among User Groups.`,
      },
    ],
  },
  {
    name: 'slack_update_usergroup_users',
    description: `Replace the entire member list of a Slack User Group with a new set of users. Requires a valid Slack OAuth2 connection with the usergroups:write scope.`,
    params: [
      {
        name: 'usergroup',
        type: 'string',
        required: true,
        description: `The encoded ID of the User Group to update.`,
      },
      {
        name: 'users',
        type: 'string',
        required: true,
        description: `Comma-separated string of encoded user IDs that represent the entire new list of users for the User Group.`,
      },
      {
        name: 'include_count',
        type: 'boolean',
        required: false,
        description: `Include the number of users in the User Group in the response.`,
      },
    ],
  },
  {
    name: 'slack_update_view',
    description: `Update an existing modal view in place, identified by its view_id or external_id. Requires a valid Slack OAuth2 connection.`,
    params: [
      {
        name: 'view',
        type: 'object',
        required: true,
        description: `A view payload object describing the modal's new content.`,
      },
      {
        name: 'external_id',
        type: 'string',
        required: false,
        description: `A unique identifier of the view set by the developer, unique per team. Provide either this or view_id.`,
      },
      {
        name: 'hash',
        type: 'string',
        required: false,
        description: `A string representing view state, used to protect against race conditions between multiple updates.`,
      },
      {
        name: 'view_id',
        type: 'string',
        required: false,
        description: `A unique identifier of the view to update. Provide either this or external_id.`,
      },
    ],
  },
]
