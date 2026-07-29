import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'discord_consume_entitlement',
    description: `For one-time purchase consumable SKUs, mark a given entitlement for the user as consumed. The entitlement will have consumed: true when listed afterward. This action cannot be undone. Returns 204 No Content on success. Per Discord's official OpenAPI spec, this endpoint also accepts an OAuth2 Bearer token with the \`applications.entitlements\` scope (in addition to Bot Token) — use this tool for user-authorized OAuth connections, or the equivalent discordbot_* tool for bot-token connections.`,
    params: [
      {
        name: 'application_id',
        type: 'string',
        required: true,
        description: `The ID of the application that owns the entitlement.`,
      },
      {
        name: 'entitlement_id',
        type: 'string',
        required: true,
        description: `The ID of the entitlement to mark as consumed.`,
      },
    ],
  },
  {
    name: 'discord_create_lobby_channel_invite_for_self',
    description: `Create a single-use guild invite to a lobby's linked channel, targeted at the calling user. The lobby must have a linked channel and the caller must be a member of the lobby. The invite expires after one hour. Uses a Bearer token with the sdk.social_layer scope. Per Discord's official OpenAPI spec, this endpoint also accepts a Bot Token (in addition to OAuth2) — use this tool for user-authorized OAuth connections, or the equivalent discordbot_* tool for bot-token connections. Returns a lobby invite object.`,
    params: [
      {
        name: 'lobby_id',
        type: 'string',
        required: true,
        description: `The ID of the lobby to create a channel invite for.`,
      },
    ],
  },
  {
    name: 'discord_create_or_join_lobby',
    description: `Create a new lobby identified by a secret, or join the calling user to the existing lobby with that secret if one already exists. Updates lobby metadata and the calling member's metadata on join. Uses a Bearer token with the sdk.social_layer scope. Per Discord's official OpenAPI spec, this endpoint also accepts a Bot Token (in addition to OAuth2) — use this tool for user-authorized OAuth connections, or the equivalent discordbot_* tool for bot-token connections. Returns a lobby object.`,
    params: [
      {
        name: 'secret',
        type: 'string',
        required: true,
        description: `Secret used to identify the lobby. If a lobby for this application already exists with this secret, the caller joins it; otherwise a new lobby is created. Max 250 characters.`,
      },
      {
        name: 'idle_timeout_seconds',
        type: 'integer',
        required: false,
        description: `Seconds to wait before shutting down the lobby after it becomes idle. Between 5 and 604800 (7 days).`,
      },
      {
        name: 'lobby_metadata',
        type: 'object',
        required: false,
        description: `Optional dictionary of string key/value pairs to set on the lobby. Max total length 1000. Overwrites any existing lobby metadata.`,
      },
      {
        name: 'member_metadata',
        type: 'object',
        required: false,
        description: `Optional dictionary of string key/value pairs to set on the calling user's lobby member. Max total length 1000.`,
      },
    ],
  },
  {
    name: 'discord_delete_current_user_application_role_connection',
    description: `Deletes the application role connection for the current user and the given application. Requires an OAuth2 access token with the role_connections.write scope for the application specified in the path.`,
    params: [
      {
        name: 'application_id',
        type: 'string',
        required: true,
        description: `The ID of the application to delete the role connection for.`,
      },
    ],
  },
  {
    name: 'discord_delete_test_entitlement',
    description: `Delete a currently-active test entitlement. Discord will act as though that user or guild no longer has entitlement to your premium offering. Returns 204 No Content on success. Per Discord's official OpenAPI spec, this endpoint also accepts an OAuth2 Bearer token with the \`applications.entitlements\` scope (in addition to Bot Token) — use this tool for user-authorized OAuth connections, or the equivalent discordbot_* tool for bot-token connections.`,
    params: [
      {
        name: 'application_id',
        type: 'string',
        required: true,
        description: `The ID of the application that owns the entitlement.`,
      },
      {
        name: 'entitlement_id',
        type: 'string',
        required: true,
        description: `The ID of the test entitlement to delete.`,
      },
    ],
  },
  {
    name: 'discord_edit_application_command_permissions',
    description: `Edit the permissions for a specific application command in a guild. Requires OAuth2 bearer token with applications.commands.permissions.update scope. Returns a guild application command permissions object.`,
    params: [
      {
        name: 'application_id',
        type: 'string',
        required: true,
        description: `The ID of the application.`,
      },
      {
        name: 'command_id',
        type: 'string',
        required: true,
        description: `The ID of the command to edit permissions for.`,
      },
      { name: 'guild_id', type: 'string', required: true, description: `The ID of the guild.` },
      {
        name: 'permissions',
        type: 'array',
        required: true,
        description: `Array of application command permission objects specifying who can use the command.`,
      },
    ],
  },
  {
    name: 'discord_get_application_command_permissions',
    description: `Fetch permissions for a specific application command in a guild. Returns a guild application command permissions object.`,
    params: [
      {
        name: 'application_id',
        type: 'string',
        required: true,
        description: `The ID of the application.`,
      },
      {
        name: 'command_id',
        type: 'string',
        required: true,
        description: `The ID of the command to get permissions for.`,
      },
      { name: 'guild_id', type: 'string', required: true, description: `The ID of the guild.` },
    ],
  },
  {
    name: 'discord_get_current_user_application_entitlements',
    description: `Retrieves entitlements for the current user for a given application. Use when you need to check what premium offerings or subscriptions the authenticated user has access to. Requires the applications.entitlements OAuth2 scope.`,
    params: [
      {
        name: 'application_id',
        type: 'string',
        required: true,
        description: `The ID of the application to retrieve entitlements for.`,
      },
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Retrieve entitlements after this entitlement ID (for pagination).`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Retrieve entitlements before this entitlement ID (for pagination).`,
      },
      {
        name: 'exclude_deleted',
        type: 'boolean',
        required: false,
        description: `Whether to exclude deleted entitlements.`,
      },
      {
        name: 'exclude_ended',
        type: 'boolean',
        required: false,
        description: `Whether to exclude ended entitlements.`,
      },
      {
        name: 'guild_id',
        type: 'string',
        required: false,
        description: `The ID of the guild to look up entitlements for.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of entitlements to return (1–100).`,
      },
      {
        name: 'sku_ids',
        type: 'string',
        required: false,
        description: `Comma-delimited list of SKU IDs to check entitlements for.`,
      },
      {
        name: 'user_id',
        type: 'string',
        required: false,
        description: `The ID of the user to look up entitlements for.`,
      },
    ],
  },
  {
    name: 'discord_get_current_user_application_role_connection',
    description: `Returns the application role connection for the current user and the given application. Requires an OAuth2 access token with the role_connections.write scope for the application specified in the path.`,
    params: [
      {
        name: 'application_id',
        type: 'string',
        required: true,
        description: `The ID of the application to get the role connection for.`,
      },
    ],
  },
  {
    name: 'discord_get_entitlement',
    description: `Retrieve a single entitlement for an application by ID. Use to check whether a specific entitlement is active, its type, and its expiration window. Per Discord's official OpenAPI spec, this endpoint also accepts an OAuth2 Bearer token with the \`applications.entitlements\` scope (in addition to Bot Token) — use this tool for user-authorized OAuth connections, or the equivalent discordbot_* tool for bot-token connections.`,
    params: [
      {
        name: 'application_id',
        type: 'string',
        required: true,
        description: `The ID of the application that owns the entitlement.`,
      },
      {
        name: 'entitlement_id',
        type: 'string',
        required: true,
        description: `The ID of the entitlement to retrieve.`,
      },
    ],
  },
  {
    name: 'discord_get_gateway',
    description: `Retrieves a valid WebSocket (wss) URL for establishing a Gateway connection to Discord. Use when you need to connect to the Discord Gateway for real-time events. No authentication required.`,
    params: [],
  },
  {
    name: 'discord_get_guild_application_command_permissions',
    description: `Fetch permissions for all commands in a guild. Returns an array of guild application command permissions objects. Per Discord's official OpenAPI spec, this endpoint also accepts an OAuth2 Bearer token with the \`applications.commands.permissions.update\` scope (in addition to Bot Token) — use this tool for user-authorized OAuth connections, or the equivalent discordbot_* tool for bot-token connections.`,
    params: [
      {
        name: 'application_id',
        type: 'string',
        required: true,
        description: `The ID of the application.`,
      },
      { name: 'guild_id', type: 'string', required: true, description: `The ID of the guild.` },
    ],
  },
  {
    name: 'discord_get_guild_template',
    description: `Retrieves information about a Discord guild template using its unique template code. Use when you need to get details about a guild template for creating new servers.`,
    params: [
      {
        name: 'template_code',
        type: 'string',
        required: true,
        description: `The unique code of the guild template.`,
      },
    ],
  },
  {
    name: 'discord_get_guild_widget',
    description: `Retrieves the guild widget in JSON format. Returns public information about a Discord guild's widget including online member count and invite URL. The widget must be enabled in the guild's server settings.`,
    params: [
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the Discord guild (server) to retrieve the widget for.`,
      },
    ],
  },
  {
    name: 'discord_get_guild_widget_png',
    description: `Retrieves a PNG image widget for a Discord guild. Returns a visual representation of the guild widget that can be embedded on external websites. The widget must be enabled in the guild's server settings.`,
    params: [
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the Discord guild (server) to retrieve the widget image for.`,
      },
      { name: 'style', type: 'string', required: false, description: `Style of the widget image.` },
    ],
  },
  {
    name: 'discord_get_invite_deprecated',
    description: `Retrieves information about a specific invite code, including guild and channel details. Use discord_resolve_invite instead, which supports additional query parameters such as guild_scheduled_event_id.`,
    params: [
      {
        name: 'invite_code',
        type: 'string',
        required: true,
        description: `The unique invite code to look up.`,
      },
      {
        name: 'guild_scheduled_event_id',
        type: 'string',
        required: false,
        description: `Guild scheduled event ID to include event details in the response.`,
      },
      {
        name: 'with_counts',
        type: 'boolean',
        required: false,
        description: `Whether to include approximate member and presence counts.`,
      },
    ],
  },
  {
    name: 'discord_get_lobby_messages',
    description: `Retrieve the most recent messages in a Discord lobby. The calling user must be a member of the lobby. Uses a Bearer token with the sdk.social_layer scope. Per Discord's official OpenAPI spec, this endpoint also accepts a Bot Token (in addition to OAuth2) — use this tool for user-authorized OAuth connections, or the equivalent discordbot_* tool for bot-token connections. Returns an array of lobby message objects.`,
    params: [
      {
        name: 'lobby_id',
        type: 'string',
        required: true,
        description: `The ID of the lobby to retrieve messages from.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of messages to return (1-200). Defaults to 50.`,
      },
    ],
  },
  {
    name: 'discord_get_my_guild_member',
    description: `Retrieves the guild member object for the currently authenticated user within a specified guild, provided they are a member of that guild. Requires the guilds.members.read OAuth2 scope.`,
    params: [
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild to retrieve the current user's member object from.`,
      },
    ],
  },
  {
    name: 'discord_get_my_oauth2_authorization',
    description: `Retrieves current OAuth2 authorization details for the application, including app info, granted scopes, token expiration date, and user data (contingent on scopes like 'identify'). Useful for verifying what access the current token has.`,
    params: [],
  },
  {
    name: 'discord_get_my_user',
    description: `Fetches comprehensive profile information for the currently authenticated Discord user, including username, avatar, discriminator, locale, and email if the 'email' OAuth2 scope is granted.`,
    params: [],
  },
  {
    name: 'discord_get_openid_connect_userinfo',
    description: `Retrieves OpenID Connect compliant user information for the authenticated user. Returns standardized OIDC claims (sub, email, nickname, picture, locale, etc.) following the OpenID Connect specification. Requires an OAuth2 access token with the 'openid' scope; additional fields require 'identify' and 'email' scopes.`,
    params: [],
  },
  {
    name: 'discord_get_public_keys',
    description: `Retrieves Discord OAuth2 public keys (JWKS). Use when you need to verify OAuth2 tokens or access public keys for cryptographic operations such as signature verification.`,
    params: [],
  },
  {
    name: 'discord_get_sku_subscription',
    description: `Retrieve a single subscription for a SKU by its ID. Returns a subscription object with its status, current billing period, and the entitlements it grants. Per Discord's official OpenAPI spec, this endpoint also accepts an OAuth2 Bearer token (in addition to Bot Token) — use this tool for user-authorized OAuth connections, or the equivalent discordbot_* tool for bot-token connections.`,
    params: [
      {
        name: 'sku_id',
        type: 'string',
        required: true,
        description: `The ID of the SKU the subscription belongs to.`,
      },
      {
        name: 'subscription_id',
        type: 'string',
        required: true,
        description: `The ID of the subscription to retrieve.`,
      },
      {
        name: 'user_id',
        type: 'string',
        required: false,
        description: `Optional user ID to verify the subscription belongs to.`,
      },
    ],
  },
  {
    name: 'discord_get_user',
    description: `Retrieve information about a Discord user. With OAuth Bearer token, use '@me' as user_id to return the authenticated user's information. With a Bot token, you can query any user by their ID. Returns username, avatar, discriminator, locale, premium status, and email (if email scope is granted).`,
    params: [
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `The ID of the user to retrieve. Use '@me' to get the authenticated user's information.`,
      },
    ],
  },
  {
    name: 'discord_leave_lobby',
    description: `Remove the calling user from the specified Discord lobby. Safe to call even if the user is no longer a member, but fails if the lobby does not exist. Uses a Bearer token for authorization. Per Discord's official OpenAPI spec, this endpoint also accepts a Bot Token (in addition to OAuth2) — use this tool for user-authorized OAuth connections, or the equivalent discordbot_* tool for bot-token connections. Returns nothing.`,
    params: [
      {
        name: 'lobby_id',
        type: 'string',
        required: true,
        description: `The ID of the lobby to leave.`,
      },
    ],
  },
  {
    name: 'discord_link_channel_to_lobby',
    description: `Link an existing guild text channel to a Discord lobby, or unlink any currently linked channel by omitting channel_id. Uses a Bearer token for authorization; the caller must be a lobby member with the CanLinkLobby lobby member flag. Per Discord's official OpenAPI spec, this endpoint also accepts a Bot Token (in addition to OAuth2) — use this tool for user-authorized OAuth connections, or the equivalent discordbot_* tool for bot-token connections. Returns the updated lobby object.`,
    params: [
      {
        name: 'lobby_id',
        type: 'string',
        required: true,
        description: `The ID of the lobby to link or unlink a channel for.`,
      },
      {
        name: 'channel_id',
        type: 'string',
        required: false,
        description: `The ID of the channel to link to the lobby. If omitted, any currently linked channel is unlinked from the lobby.`,
      },
    ],
  },
  {
    name: 'discord_list_guild_channels',
    description: `Retrieve all channels in a Discord guild (server). Returns a list of channel objects including text channels, voice channels, categories, and threads. Per Discord's official OpenAPI spec, this endpoint also accepts a plain OAuth2 Bearer token (no specific scope required beyond a valid authorization) in addition to Bot Token — use this tool for user-authorized OAuth connections, or the equivalent discordbot_* tool for bot-token connections.`,
    params: [
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild to retrieve channels for.`,
      },
    ],
  },
  {
    name: 'discord_list_my_guilds',
    description: `Lists the current user's guilds, returning partial data (id, name, icon, owner, permissions, features) for each. Primarily used for displaying server lists or verifying guild memberships. Requires the 'guilds' OAuth2 scope.`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Get guilds after this guild ID (for pagination).`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Get guilds before this guild ID (for pagination).`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of guilds to return (1–200, default 200).`,
      },
      {
        name: 'with_counts',
        type: 'boolean',
        required: false,
        description: `Whether to include approximate member and presence counts for each guild.`,
      },
    ],
  },
  {
    name: 'discord_list_sku_subscriptions',
    description: `Retrieve all subscriptions containing a given SKU, filtered by user. Returns a list of subscription objects representing recurring payments for that SKU. Per Discord's official OpenAPI spec, this endpoint also accepts an OAuth2 Bearer token (in addition to Bot Token) — use this tool for user-authorized OAuth connections, or the equivalent discordbot_* tool for bot-token connections. When called with an OAuth2 token, user_id is optional and defaults to the authorizing user; it is required for Bot Token requests. Supports cursor-based pagination via before/after and limit.`,
    params: [
      {
        name: 'sku_id',
        type: 'string',
        required: true,
        description: `The ID of the SKU to list subscriptions for.`,
      },
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `List subscriptions after this subscription ID (for pagination).`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `List subscriptions before this subscription ID (for pagination).`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of results to return (1-100). Defaults to 50.`,
      },
      {
        name: 'user_id',
        type: 'string',
        required: false,
        description: `The ID of the user to return subscriptions for. Optional for OAuth2 requests (defaults to the authorizing user).`,
      },
    ],
  },
  {
    name: 'discord_list_sticker_packs',
    description: `Retrieves all available Discord Nitro sticker packs. Returns official Discord sticker packs including pack name, description, stickers, cover sticker, and banner asset.`,
    params: [],
  },
  {
    name: 'discord_resolve_invite',
    description: `Resolves and retrieves information about a Discord invite code, including the associated guild, channel, event, and inviter. Prefer this over the deprecated Get Invite tool for new integrations.`,
    params: [
      {
        name: 'invite_code',
        type: 'string',
        required: true,
        description: `The unique invite code to resolve.`,
      },
      {
        name: 'guild_scheduled_event_id',
        type: 'string',
        required: false,
        description: `Guild scheduled event ID to include event details in the response.`,
      },
      {
        name: 'with_counts',
        type: 'boolean',
        required: false,
        description: `Whether to include approximate member and presence counts.`,
      },
    ],
  },
  {
    name: 'discord_retrieve_user_connections',
    description: `Retrieves a list of the authenticated user's connected third-party accounts on Discord, such as Twitch, YouTube, GitHub, Steam, and others. Requires the 'connections' OAuth2 scope.`,
    params: [],
  },
  {
    name: 'discord_send_lobby_message',
    description: `Send a message to a Discord lobby. The calling user must be a member of the lobby. Uses a Bearer token with the sdk.social_layer scope. Per Discord's official OpenAPI spec, this endpoint also accepts a Bot Token (in addition to OAuth2) — use this tool for user-authorized OAuth connections, or the equivalent discordbot_* tool for bot-token connections. If the lobby has a linked channel, the message is also forwarded there; if forwarding fails (for example due to AutoMod), the lobby message is still delivered to other lobby members. Returns the created lobby message object.`,
    params: [
      {
        name: 'content',
        type: 'string',
        required: true,
        description: `Message content. Must be non-empty.`,
      },
      {
        name: 'lobby_id',
        type: 'string',
        required: true,
        description: `The ID of the lobby to send the message to.`,
      },
      {
        name: 'flags',
        type: 'integer',
        required: false,
        description: `Optional message flags combined as a bitfield. Only flags creatable by the Social SDK are accepted.`,
      },
      {
        name: 'metadata',
        type: 'object',
        required: false,
        description: `Optional dictionary of string key/value pairs delivered alongside the message to active clients via the Social SDK. Not persisted on the linked channel message.`,
      },
    ],
  },
  {
    name: 'discord_update_current_user_application_role_connection',
    description: `Updates and returns the application role connection for the current user and the given application. Requires an OAuth2 access token with the role_connections.write scope for the application specified in the path.`,
    params: [
      {
        name: 'application_id',
        type: 'string',
        required: true,
        description: `The ID of the application to update the role connection for.`,
      },
      {
        name: 'metadata',
        type: 'object',
        required: false,
        description: `Object mapping application role connection metadata keys to their stringified value (max 100 characters) for the user on the platform a bot has connected.`,
      },
      {
        name: 'platform_name',
        type: 'string',
        required: false,
        description: `The vanity name of the platform a bot has connected (max 50 characters).`,
      },
      {
        name: 'platform_username',
        type: 'string',
        required: false,
        description: `The username on the platform a bot has connected (max 100 characters).`,
      },
    ],
  },
]
