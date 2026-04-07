import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
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
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of entitlements to return (1–100).`,
      },
    ],
  },
  {
    name: 'discord_get_gateway',
    description: `Retrieves a valid WebSocket (wss) URL for establishing a Gateway connection to Discord. Use when you need to connect to the Discord Gateway for real-time events. No authentication required.`,
    params: [],
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
    description: `DEPRECATED: Use discord_resolve_invite instead. Retrieves information about a specific invite code including guild and channel details. This endpoint is deprecated — prefer the Resolve Invite tool for new integrations.`,
    params: [
      {
        name: 'invite_code',
        type: 'string',
        required: true,
        description: `The unique invite code to look up.`,
      },
      {
        name: 'with_counts',
        type: 'boolean',
        required: false,
        description: `Whether to include approximate member and presence counts.`,
      },
      {
        name: 'with_expiration',
        type: 'boolean',
        required: false,
        description: `Whether to include the expiration date of the invite.`,
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
      {
        name: 'with_expiration',
        type: 'boolean',
        required: false,
        description: `Whether to include the expiration date of the invite.`,
      },
    ],
  },
  {
    name: 'discord_retrieve_user_connections',
    description: `Retrieves a list of the authenticated user's connected third-party accounts on Discord, such as Twitch, YouTube, GitHub, Steam, and others. Requires the 'connections' OAuth2 scope.`,
    params: [],
  },
]
