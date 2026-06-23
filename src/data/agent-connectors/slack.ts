import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'slack_add_reaction',
    description: `Add an emoji reaction to a message in Slack. Requires a valid Slack OAuth2 connection with reactions:write scope.`,
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
    name: 'slack_delete_message',
    description: `Deletes a message from a Slack channel or direct message. Requires a valid Slack OAuth2 connection with chat:write scope.`,
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
    name: 'slack_fetch_conversation_history',
    description: `Fetches conversation history from a Slack channel or direct message with pagination support. Requires a valid Slack OAuth2 connection with channels:history scope.`,
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
    name: 'slack_get_conversation_info',
    description: `Retrieve information about a Slack channel, including metadata, settings, and member count. Requires a valid Slack OAuth2 connection with channels:read scope.`,
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
    description: `Retrieve replies to a specific message thread in a Slack channel or direct message. Requires a valid Slack OAuth2 connection with channels:history or groups:history scope.`,
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
    name: 'slack_list_channels',
    description: `List all public and private channels in a Slack workspace that the authenticated user has access to. Requires a valid Slack OAuth2 connection with channels:read, groups:read, mpim:read, and/or im:read scopes depending on conversation types needed.`,
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
    name: 'slack_send_message',
    description: `Sends a message to a Slack channel or direct message. Requires a valid Slack OAuth2 connection with chat:write scope.`,
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
    name: 'slack_update_message',
    description: `Updates/edits a previously sent message in a Slack channel or direct message. Requires a valid Slack OAuth2 connection with chat:write scope.`,
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
      { name: 'text', type: 'string', required: false, description: `New message text content` },
    ],
  },
]
