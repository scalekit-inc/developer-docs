import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'discordbot_add_guild_member',
    description: `Add a user to a guild using their OAuth2 access token with the guilds.join scope. Returns 201 if the user was added, or 204 if already a member.`,
    params: [
      {
        name: 'access_token',
        type: 'string',
        required: true,
        description: `OAuth2 access token of the user to add, with guilds.join scope.`,
      },
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild to add the user to.`,
      },
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `The ID of the user to add to the guild.`,
      },
      {
        name: 'deaf',
        type: 'boolean',
        required: false,
        description: `Whether the user should be server-deafened on join.`,
      },
      {
        name: 'mute',
        type: 'boolean',
        required: false,
        description: `Whether the user should be server-muted on join.`,
      },
      {
        name: 'nick',
        type: 'string',
        required: false,
        description: `Nickname to assign to the user in the guild.`,
      },
      {
        name: 'roles',
        type: 'array',
        required: false,
        description: `Array of role IDs to assign to the user on join.`,
      },
    ],
  },
  {
    name: 'discordbot_add_guild_member_role',
    description: `Add a role to a guild member. Requires MANAGE_ROLES permission. Returns 204 No Content on success.`,
    params: [
      { name: 'guild_id', type: 'string', required: true, description: `The ID of the guild.` },
      {
        name: 'role_id',
        type: 'string',
        required: true,
        description: `The ID of the role to add to the member.`,
      },
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `The ID of the guild member to add the role to.`,
      },
    ],
  },
  {
    name: 'discordbot_add_lobby_member',
    description: `Add the specified user to a Discord lobby. If the user is already a member, updates their metadata and flags instead. Returns the lobby member object.`,
    params: [
      {
        name: 'lobby_id',
        type: 'string',
        required: true,
        description: `The ID of the lobby to add the member to.`,
      },
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `The ID of the user to add to the lobby.`,
      },
      {
        name: 'flags',
        type: 'integer',
        required: false,
        description: `Lobby member flags combined as a bitfield (1 = CanLinkLobby).`,
      },
      {
        name: 'metadata',
        type: 'object',
        required: false,
        description: `Optional dictionary of string key/value pairs for the member. Max total length 1000.`,
      },
    ],
  },
  {
    name: 'discordbot_add_thread_member',
    description: `Add another user to a thread. Requires the thread to not be archived. Returns 204 No Content on success.`,
    params: [
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `The ID of the thread channel.`,
      },
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `The ID of the user to add to the thread.`,
      },
    ],
  },
  {
    name: 'discordbot_begin_guild_prune',
    description: `Begin a prune operation to kick inactive members. Requires KICK_MEMBERS permission. Returns a pruned object with the count of kicked members (or null if compute_prune_count is false).`,
    params: [
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild to prune members from.`,
      },
      {
        name: 'compute_prune_count',
        type: 'boolean',
        required: false,
        description: `Whether to compute and return the number of pruned members (default true; set false for large guilds).`,
      },
      {
        name: 'days',
        type: 'integer',
        required: false,
        description: `Number of days of inactivity to prune for (1-30, default 7).`,
      },
      {
        name: 'include_roles',
        type: 'array',
        required: false,
        description: `Array of role IDs to include in the prune operation.`,
      },
      {
        name: 'reason',
        type: 'string',
        required: false,
        description: `Reason for the prune (for audit log).`,
      },
    ],
  },
  {
    name: 'discordbot_bulk_delete_messages',
    description: `Delete multiple messages in a Discord channel in a single request (2-100 messages). Messages older than 2 weeks cannot be deleted this way. Requires MANAGE_MESSAGES permission.`,
    params: [
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `The ID of the channel to delete messages from.`,
      },
      {
        name: 'messages',
        type: 'array',
        required: true,
        description: `Array of message IDs to delete (2-100 messages). Messages older than 2 weeks cannot be deleted.`,
      },
    ],
  },
  {
    name: 'discordbot_bulk_guild_ban',
    description: `Ban up to 200 users from a guild and optionally delete their recent messages. Requires both BAN_MEMBERS and MANAGE_GUILD permissions. Returns object with banned_users and failed_users arrays.`,
    params: [
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild to ban members from.`,
      },
      {
        name: 'user_ids',
        type: 'array',
        required: true,
        description: `Array of user IDs to ban (up to 200).`,
      },
      {
        name: 'delete_message_seconds',
        type: 'integer',
        required: false,
        description: `Number of seconds of messages to delete from banned users (0-604800).`,
      },
    ],
  },
  {
    name: 'discordbot_bulk_overwrite_global_application_commands',
    description: `Bulk overwrite all global application commands. Takes a full list of commands to replace existing ones. Any commands not included will be deleted. Returns an array of application command objects.`,
    params: [
      {
        name: 'application_id',
        type: 'string',
        required: true,
        description: `The ID of the application.`,
      },
      {
        name: 'commands',
        type: 'array',
        required: true,
        description: `Array of application command objects to set as global commands.`,
      },
    ],
  },
  {
    name: 'discordbot_bulk_overwrite_guild_application_commands',
    description: `Bulk overwrite all application commands registered in a guild. Commands not included will be deleted. Returns an array of application command objects.`,
    params: [
      {
        name: 'application_id',
        type: 'string',
        required: true,
        description: `The ID of the application.`,
      },
      {
        name: 'commands',
        type: 'array',
        required: true,
        description: `Array of application command objects to set as guild commands.`,
      },
      { name: 'guild_id', type: 'string', required: true, description: `The ID of the guild.` },
    ],
  },
  {
    name: 'discordbot_bulk_update_lobby_members',
    description: `Add, update, or remove up to 25 members from a Discord lobby in a single request. Members with remove_member false (the default) are upserted; members with remove_member true are removed. Users unknown to Discord return a 404 error. Users that fail permission checks, or that already reached the maximum lobbies per application, are silently dropped from the upsert set. Returns an array of lobby member objects for the upserted members; removed members are not included.`,
    params: [
      {
        name: 'lobby_id',
        type: 'string',
        required: true,
        description: `The ID of the lobby to bulk update members for.`,
      },
      {
        name: 'members',
        type: 'array',
        required: true,
        description: `Array of 1 to 25 member objects to add, update, or remove from the lobby.`,
      },
    ],
  },
  {
    name: 'discordbot_consume_entitlement',
    description: `For one-time purchase consumable SKUs, mark a given entitlement for the user as consumed. The entitlement will have consumed: true when listed afterward. This action cannot be undone. Returns 204 No Content on success.`,
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
    name: 'discordbot_create_application_emoji',
    description: `Create a new emoji owned by a Discord application (app emoji). Returns the new emoji object.`,
    params: [
      {
        name: 'application_id',
        type: 'string',
        required: true,
        description: `The ID of the application to create the emoji for.`,
      },
      {
        name: 'image',
        type: 'string',
        required: true,
        description: `Base64 encoded image data URI for the 128x128 emoji (PNG, JPG, GIF supported).`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Name of the emoji (2-32 characters, alphanumeric and underscores).`,
      },
    ],
  },
  {
    name: 'discordbot_create_auto_moderation_rule',
    description: `Create a new Auto Moderation rule for a guild. Requires the MANAGE_GUILD permission. Fires an Auto Moderation Rule Create Gateway event. Returns the new auto moderation rule object on success.`,
    params: [
      {
        name: 'actions',
        type: 'array',
        required: true,
        description: `The actions which will execute when the rule is triggered. Each action is an object with a 'type' (1=BLOCK_MESSAGE, 2=SEND_ALERT_MESSAGE, 3=TIMEOUT, 4=BLOCK_MEMBER_INTERACTION) and optional 'metadata'.`,
      },
      {
        name: 'event_type',
        type: 'integer',
        required: true,
        description: `The rule event type: 1=MESSAGE_SEND (when a member sends or edits a message), 2=MEMBER_UPDATE (when a member edits their profile).`,
      },
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild to create the Auto Moderation rule in.`,
      },
      { name: 'name', type: 'string', required: true, description: `The rule name.` },
      {
        name: 'trigger_type',
        type: 'integer',
        required: true,
        description: `The rule trigger type: 1=KEYWORD, 3=SPAM, 4=KEYWORD_PRESET, 5=MENTION_SPAM, 6=MEMBER_PROFILE.`,
      },
      {
        name: 'enabled',
        type: 'boolean',
        required: false,
        description: `Whether the rule is enabled. False by default.`,
      },
      {
        name: 'exempt_channels',
        type: 'array',
        required: false,
        description: `Channel IDs that should not be affected by the rule (maximum of 50).`,
      },
      {
        name: 'exempt_roles',
        type: 'array',
        required: false,
        description: `Role IDs that should not be affected by the rule (maximum of 20).`,
      },
      {
        name: 'reason',
        type: 'string',
        required: false,
        description: `Reason for creating the rule, shown in the guild's audit log.`,
      },
      {
        name: 'trigger_metadata',
        type: 'object',
        required: false,
        description: `Additional data used to determine whether the rule triggers, relevant fields depend on trigger_type (e.g. keyword_filter, regex_patterns, presets, allow_list, mention_total_limit, mention_raid_protection_enabled). Can be omitted for trigger types that need no metadata.`,
      },
    ],
  },
  {
    name: 'discordbot_create_channel_invite',
    description: `Create a new invite for a Discord channel. Requires CREATE_INSTANT_INVITE permission. Returns an invite object.`,
    params: [
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `The ID of the channel to create an invite for.`,
      },
      {
        name: 'max_age',
        type: 'integer',
        required: false,
        description: `Duration in seconds before the invite expires (0 for never). Default is 86400 (24 hours). Max is 604800 (7 days).`,
      },
      {
        name: 'max_uses',
        type: 'integer',
        required: false,
        description: `Maximum number of times the invite can be used (0 for unlimited). Max is 100.`,
      },
      {
        name: 'role_ids',
        type: 'array',
        required: false,
        description: `The role ID(s) for roles in the guild given to the users that accept this invite. Requires the MANAGE_ROLES permission and cannot assign roles with higher permissions than the sender.`,
      },
      {
        name: 'target_application_id',
        type: 'string',
        required: false,
        description: `Application ID for embedded activity target types.`,
      },
      {
        name: 'target_type',
        type: 'integer',
        required: false,
        description: `The type of invite target (1 for STREAM, 2 for EMBEDDED_APPLICATION).`,
      },
      {
        name: 'target_user_id',
        type: 'string',
        required: false,
        description: `The user ID whose stream to display for STREAM target type.`,
      },
      {
        name: 'temporary',
        type: 'boolean',
        required: false,
        description: `Whether this invite grants temporary membership. Default is false.`,
      },
      {
        name: 'unique',
        type: 'boolean',
        required: false,
        description: `If true, tries to create a unique invite. Default is false.`,
      },
    ],
  },
  {
    name: 'discordbot_create_dm',
    description: `Create a new DM channel with a user. Returns a DM channel object. If a DM channel already exists with the user, it is returned.`,
    params: [
      {
        name: 'recipient_id',
        type: 'string',
        required: true,
        description: `The ID of the user to open a DM channel with.`,
      },
    ],
  },
  {
    name: 'discordbot_create_global_application_command',
    description: `Create a new global application command. If a command with the same name already exists, it will be overwritten. Returns the created command object.`,
    params: [
      {
        name: 'application_id',
        type: 'string',
        required: true,
        description: `The ID of the application.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Command name (1-32 characters).`,
      },
      {
        name: 'type',
        type: 'integer',
        required: true,
        description: `Command type: 1=CHAT_INPUT (slash command), 2=USER, 3=MESSAGE.`,
      },
      {
        name: 'contexts',
        type: 'array',
        required: false,
        description: `Installation context(s) where the command is available. 0=GUILD, 1=BOT_DM, 2=PRIVATE_CHANNEL.`,
      },
      {
        name: 'default_member_permissions',
        type: 'string',
        required: false,
        description: `Set of permissions represented as a bit set string that a user must have to use the command.`,
      },
      {
        name: 'default_permission',
        type: 'boolean',
        required: false,
        description: `Whether the command is enabled by default (deprecated, use default_member_permissions).`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Command description (1-100 characters) for CHAT_INPUT commands.`,
      },
      {
        name: 'description_localizations',
        type: 'object',
        required: false,
        description: `Localization dictionary for description field.`,
      },
      {
        name: 'dm_permission',
        type: 'boolean',
        required: false,
        description: `Whether the command is available in DMs (deprecated, use contexts).`,
      },
      {
        name: 'integration_types',
        type: 'array',
        required: false,
        description: `Installation context(s): 0=GUILD_INSTALL, 1=USER_INSTALL.`,
      },
      {
        name: 'name_localizations',
        type: 'object',
        required: false,
        description: `Localization dictionary for name field.`,
      },
      {
        name: 'nsfw',
        type: 'boolean',
        required: false,
        description: `Whether the command is age-restricted.`,
      },
      {
        name: 'options',
        type: 'array',
        required: false,
        description: `Array of command option objects (for CHAT_INPUT type, up to 25 options).`,
      },
    ],
  },
  {
    name: 'discordbot_create_group_dm',
    description: `Create a new group DM channel with multiple users using their OAuth2 access tokens (granted the gdm.join scope). Returns a DM channel object. This endpoint was intended to be used with the now-deprecated GameBridge SDK and is limited to 10 active group DMs. Fires a Channel Create Gateway event.`,
    params: [
      {
        name: 'access_tokens',
        type: 'array',
        required: true,
        description: `Access tokens of users that have granted your app the gdm.join scope.`,
      },
      {
        name: 'nicks',
        type: 'object',
        required: false,
        description: `A dictionary of user ids to their respective nicknames.`,
      },
    ],
  },
  {
    name: 'discordbot_create_guild_application_command',
    description: `Create a new application command for a specific guild. Guild commands are only available in the guild they are created in. Returns the created command object.`,
    params: [
      {
        name: 'application_id',
        type: 'string',
        required: true,
        description: `The ID of the application.`,
      },
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild to create the command in.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Command name (1-32 characters).`,
      },
      {
        name: 'type',
        type: 'integer',
        required: true,
        description: `Command type: 1=CHAT_INPUT, 2=USER, 3=MESSAGE.`,
      },
      {
        name: 'default_member_permissions',
        type: 'string',
        required: false,
        description: `Permissions required to use the command as a bitfield string.`,
      },
      {
        name: 'default_permission',
        type: 'boolean',
        required: false,
        description: `Whether the command is enabled by default (deprecated).`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Command description (1-100 characters) for CHAT_INPUT commands.`,
      },
      {
        name: 'description_localizations',
        type: 'object',
        required: false,
        description: `Localization dictionary for description field.`,
      },
      {
        name: 'name_localizations',
        type: 'object',
        required: false,
        description: `Localization dictionary for name field.`,
      },
      {
        name: 'nsfw',
        type: 'boolean',
        required: false,
        description: `Whether the command is age-restricted.`,
      },
      {
        name: 'options',
        type: 'array',
        required: false,
        description: `Array of command option objects (up to 25 options).`,
      },
    ],
  },
  {
    name: 'discordbot_create_guild_ban',
    description: `Ban a user from a Discord guild. Requires BAN_MEMBERS permission. Optionally delete recent messages from the banned user.`,
    params: [
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild to ban the user from.`,
      },
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `The ID of the user to ban.`,
      },
      {
        name: 'delete_message_seconds',
        type: 'integer',
        required: false,
        description: `Number of seconds to delete messages for (0-604800, i.e., 0 to 7 days).`,
      },
    ],
  },
  {
    name: 'discordbot_create_guild_channel',
    description: `Create a new channel in a guild. Requires MANAGE_CHANNELS permission. Returns the new channel object. Each permission_overwrites entry may specify 'allow_names'/'deny_names' (arrays of named permission flags) instead of raw 'allow'/'deny' integers — the correct bitfield is computed automatically.`,
    params: [
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild to create the channel in.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Name of the channel (1-100 characters).`,
      },
      {
        name: 'available_tags',
        type: 'array',
        required: false,
        description: `Array of tag objects for forum channels.`,
      },
      {
        name: 'bitrate',
        type: 'integer',
        required: false,
        description: `Bitrate in bits for voice channels.`,
      },
      {
        name: 'default_auto_archive_duration',
        type: 'integer',
        required: false,
        description: `Default thread auto-archive duration in minutes: 60, 1440, 4320, or 10080.`,
      },
      {
        name: 'default_forum_layout',
        type: 'integer',
        required: false,
        description: `Default forum layout. 0=NOT_SET, 1=LIST_VIEW, 2=GALLERY_VIEW.`,
      },
      {
        name: 'default_reaction_emoji',
        type: 'object',
        required: false,
        description: `Default reaction emoji for forum posts.`,
      },
      {
        name: 'default_sort_order',
        type: 'integer',
        required: false,
        description: `Default sort order for forum posts. 0=LATEST_ACTIVITY, 1=CREATION_DATE.`,
      },
      {
        name: 'default_thread_rate_limit_per_user',
        type: 'integer',
        required: false,
        description: `Default slowmode for new threads in forum/media channels.`,
      },
      {
        name: 'flags',
        type: 'integer',
        required: false,
        description: `Channel flags combined as a bitfield. Currently only supported for Text, Voice, Announcement, Forum, and Media channels.`,
      },
      {
        name: 'nsfw',
        type: 'boolean',
        required: false,
        description: `Whether the channel is NSFW.`,
      },
      {
        name: 'parent_id',
        type: 'string',
        required: false,
        description: `ID of the parent category channel.`,
      },
      {
        name: 'permission_overwrites',
        type: 'array',
        required: false,
        description: `Array of permission overwrite objects.`,
      },
      {
        name: 'position',
        type: 'integer',
        required: false,
        description: `Sorting position of the channel.`,
      },
      {
        name: 'rate_limit_per_user',
        type: 'integer',
        required: false,
        description: `Slowmode rate limit in seconds (0-21600).`,
      },
      {
        name: 'rtc_region',
        type: 'string',
        required: false,
        description: `Voice region for voice/stage channels.`,
      },
      {
        name: 'topic',
        type: 'string',
        required: false,
        description: `Channel topic (0-1024 characters, or 0-4096 for forums).`,
      },
      {
        name: 'type',
        type: 'integer',
        required: false,
        description: `Channel type: 0=text, 2=voice, 4=category, 5=announcement, 13=stage, 15=forum, 16=media.`,
      },
      {
        name: 'user_limit',
        type: 'integer',
        required: false,
        description: `Maximum number of users in a voice channel (0=unlimited, 1-99).`,
      },
      {
        name: 'video_quality_mode',
        type: 'integer',
        required: false,
        description: `Video quality mode for voice channels. 1=AUTO, 2=FULL.`,
      },
    ],
  },
  {
    name: 'discordbot_create_guild_emoji',
    description: `Create a new emoji for a guild. Requires CREATE_GUILD_EXPRESSIONS permission. Returns the new emoji object.`,
    params: [
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild to create the emoji in.`,
      },
      {
        name: 'image',
        type: 'string',
        required: true,
        description: `Base64 encoded image data URI for the emoji (PNG, JPG, GIF supported).`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Name of the emoji (2-32 characters, alphanumeric and underscores).`,
      },
      {
        name: 'roles',
        type: 'array',
        required: false,
        description: `Array of role IDs allowed to use the emoji (empty array means everyone can).`,
      },
    ],
  },
  {
    name: 'discordbot_create_guild_role',
    description: `Create a new role for a guild. Requires MANAGE_ROLES permission. Returns the new role object. Full permission flag reference (name=decimal value, OR multiple together): CREATE_INSTANT_INVITE=1, KICK_MEMBERS=2, BAN_MEMBERS=4, ADMINISTRATOR=8, MANAGE_CHANNELS=16, MANAGE_GUILD=32, ADD_REACTIONS=64, VIEW_AUDIT_LOG=128, PRIORITY_SPEAKER=256, STREAM=512, VIEW_CHANNEL=1024, SEND_MESSAGES=2048, SEND_TTS_MESSAGES=4096, MANAGE_MESSAGES=8192, EMBED_LINKS=16384, ATTACH_FILES=32768, READ_MESSAGE_HISTORY=65536, MENTION_EVERYONE=131072, USE_EXTERNAL_EMOJIS=262144, VIEW_GUILD_INSIGHTS=524288, CONNECT=1048576, SPEAK=2097152, MUTE_MEMBERS=4194304, DEAFEN_MEMBERS=8388608, MOVE_MEMBERS=16777216, USE_VAD=33554432, CHANGE_NICKNAME=67108864, MANAGE_NICKNAMES=134217728, MANAGE_ROLES=268435456, MANAGE_WEBHOOKS=536870912, MANAGE_GUILD_EXPRESSIONS=1073741824, USE_APPLICATION_COMMANDS=2147483648, REQUEST_TO_SPEAK=4294967296, MANAGE_EVENTS=8589934592, MANAGE_THREADS=17179869184, CREATE_PUBLIC_THREADS=34359738368, CREATE_PRIVATE_THREADS=68719476736, USE_EXTERNAL_STICKERS=137438953472, SEND_MESSAGES_IN_THREADS=274877906944, USE_EMBEDDED_ACTIVITIES=549755813888, MODERATE_MEMBERS=1099511627776, VIEW_CREATOR_MONETIZATION_ANALYTICS=2199023255552, USE_SOUNDBOARD=4398046511104, CREATE_GUILD_EXPRESSIONS=8796093022208, CREATE_EVENTS=17592186044416, USE_EXTERNAL_SOUNDS=35184372088832, SEND_VOICE_MESSAGES=70368744177664, SET_VOICE_CHANNEL_STATUS=281474976710656, SEND_POLLS=562949953421312, USE_EXTERNAL_APPS=1125899906842624, PIN_MESSAGES=2251799813685248, BYPASS_SLOWMODE=4503599627370496. Or use a calculator like discordapi.com/permissions.htm. Optionally provide 'permissions_names' (array of named permission flags, e.g. ["SEND_MESSAGES"]) instead of a raw 'permissions' integer — the correct bitfield is computed automatically.`,
    params: [
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild to create the role in.`,
      },
      {
        name: 'color',
        type: 'integer',
        required: false,
        description: `Deprecated. RGB color value of the role as an integer. Still returned by the API, but using 'colors' is recommended when making requests.`,
      },
      {
        name: 'colors',
        type: 'object',
        required: false,
        description: `The role's colors object (recommended replacement for the deprecated 'color' field). Contains primary_color, and optionally secondary_color and tertiary_color for gradient/holographic roles.`,
      },
      {
        name: 'hoist',
        type: 'boolean',
        required: false,
        description: `Whether the role should be displayed separately in the member list.`,
      },
      {
        name: 'icon',
        type: 'string',
        required: false,
        description: `Base64 encoded role icon image (requires ROLE_ICONS guild feature).`,
      },
      {
        name: 'mentionable',
        type: 'boolean',
        required: false,
        description: `Whether the role should be mentionable by everyone.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Name of the role (1-100 characters, default 'new role').`,
      },
      {
        name: 'permissions',
        type: 'string',
        required: false,
        description: `Bitwise permission value for the role as a string.`,
      },
      {
        name: 'permissions_names',
        type: 'array',
        required: false,
        description: `Named permission flags to OR together, as a more reliable alternative to specifying 'permissions' as a raw bitwise integer string — no manual bit math required. If both 'permissions_names' and 'permissions' are given, 'permissions_names' takes precedence.`,
      },
      {
        name: 'unicode_emoji',
        type: 'string',
        required: false,
        description: `Role's unicode emoji as a standard emoji (requires ROLE_ICONS guild feature).`,
      },
    ],
  },
  {
    name: 'discordbot_create_guild_scheduled_event',
    description: `Create a new scheduled event in a Discord guild. Entity type determines the event location: 1=STAGE_INSTANCE, 2=VOICE (requires channel_id), 3=EXTERNAL (requires entity_metadata with location and scheduled_end_time).`,
    params: [
      {
        name: 'entity_type',
        type: 'integer',
        required: true,
        description: `The type of the scheduled event entity: 1=STAGE_INSTANCE, 2=VOICE, 3=EXTERNAL.`,
      },
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild to create the scheduled event in.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The name of the scheduled event (1-100 characters).`,
      },
      {
        name: 'privacy_level',
        type: 'integer',
        required: true,
        description: `Privacy level for the event. Must be 2 (GUILD_ONLY).`,
      },
      {
        name: 'scheduled_start_time',
        type: 'string',
        required: true,
        description: `ISO8601 timestamp for when the event starts.`,
      },
      {
        name: 'channel_id',
        type: 'string',
        required: false,
        description: `The channel ID for STAGE_INSTANCE or VOICE entity types. Not required for EXTERNAL events.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description of the scheduled event (up to 1000 characters).`,
      },
      {
        name: 'entity_metadata',
        type: 'object',
        required: false,
        description: `Additional metadata for the event. Required for EXTERNAL events: provide {"location": "venue name"}.`,
      },
      {
        name: 'image',
        type: 'string',
        required: false,
        description: `Base64 encoded cover image for the event (data URI format).`,
      },
      {
        name: 'recurrence_rule',
        type: 'object',
        required: false,
        description: `Recurrence rule object for repeating events.`,
      },
      {
        name: 'scheduled_end_time',
        type: 'string',
        required: false,
        description: `ISO8601 timestamp for when the event ends. Required for EXTERNAL events.`,
      },
    ],
  },
  {
    name: 'discordbot_create_guild_soundboard_sound',
    description: `Create a new soundboard sound for the guild. Requires the CREATE_GUILD_EXPRESSIONS permission. Sounds have a max file size of 512kb and a max duration of 5.2 seconds. Fires a Guild Soundboard Sound Create Gateway event. Returns the new soundboard sound object on success.`,
    params: [
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild to create the soundboard sound in.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Name of the soundboard sound (2-32 characters).`,
      },
      {
        name: 'sound',
        type: 'string',
        required: true,
        description: `The mp3 or ogg sound data, base64 encoded as a data URI, similar to image data.`,
      },
      {
        name: 'emoji_id',
        type: 'string',
        required: false,
        description: `The ID of the custom emoji for the soundboard sound.`,
      },
      {
        name: 'emoji_name',
        type: 'string',
        required: false,
        description: `The unicode character of a standard emoji for the soundboard sound.`,
      },
      {
        name: 'reason',
        type: 'string',
        required: false,
        description: `Reason for creating the sound, shown in the guild's audit log.`,
      },
      {
        name: 'volume',
        type: 'number',
        required: false,
        description: `The volume of the soundboard sound, from 0 to 1. Defaults to 1.`,
      },
    ],
  },
  {
    name: 'discordbot_create_guild_template',
    description: `Create a template from a guild's current state. Requires the MANAGE_GUILD permission. Returns the created guild template object on success.`,
    params: [
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild to create the template from.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Name of the template (1-100 characters).`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description for the template (0-120 characters).`,
      },
    ],
  },
  {
    name: 'discordbot_create_interaction_response',
    description: `Respond to an interaction from Discord. Must be called within 3 seconds of receiving the interaction. Type determines the response kind: 1=PONG, 4=CHANNEL_MESSAGE_WITH_SOURCE, 5=DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE, 6=DEFERRED_UPDATE_MESSAGE, 7=UPDATE_MESSAGE, 8=APPLICATION_COMMAND_AUTOCOMPLETE_RESULT, 9=MODAL.`,
    params: [
      {
        name: 'data',
        type: 'object',
        required: true,
        description: `Response data object. Content depends on type (e.g., message data for type 4, modal data for type 9).`,
      },
      {
        name: 'interaction_id',
        type: 'string',
        required: true,
        description: `The ID of the interaction to respond to.`,
      },
      {
        name: 'interaction_token',
        type: 'string',
        required: true,
        description: `The token of the interaction.`,
      },
      {
        name: 'type',
        type: 'integer',
        required: true,
        description: `Interaction callback type: 1=PONG, 4=message, 5=deferred message, 6=deferred update, 7=update message, 8=autocomplete, 9=modal.`,
      },
    ],
  },
  {
    name: 'discordbot_create_lobby',
    description: `Create a new Discord lobby for matchmaking, optionally adding members to it. Discord Social SDK clients cannot join or leave a lobby created via this API. Returns a lobby object.`,
    params: [
      {
        name: 'idle_timeout_seconds',
        type: 'integer',
        required: false,
        description: `Seconds to wait before shutting down the lobby after it becomes idle. Between 5 and 604800 (7 days).`,
      },
      {
        name: 'members',
        type: 'array',
        required: false,
        description: `Array of up to 25 lobby member objects to add to the lobby on creation. Each requires a user id and may include metadata and flags.`,
      },
      {
        name: 'metadata',
        type: 'object',
        required: false,
        description: `Optional dictionary of string key/value pairs to attach to the lobby. Max total length 1000.`,
      },
    ],
  },
  {
    name: 'discordbot_create_lobby_channel_invite_for_self',
    description: `Create a single-use guild invite to a lobby's linked channel, targeted at the calling user. The lobby must have a linked channel and the caller must be a member of the lobby. The invite expires after one hour. Returns a lobby invite object.`,
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
    name: 'discordbot_create_lobby_channel_invite_for_user',
    description: `Create a single-use guild invite to a lobby's linked channel on behalf of an application, targeted at the specified user. The lobby must have a linked channel. The invite expires after one hour. Uses a Bot token for authorization. Returns a lobby invite object.`,
    params: [
      {
        name: 'lobby_id',
        type: 'string',
        required: true,
        description: `The ID of the lobby to create a channel invite for.`,
      },
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `The ID of the user to target with the invite.`,
      },
    ],
  },
  {
    name: 'discordbot_create_message',
    description: `Send a message to a Discord channel. At least one of content, embeds, sticker_ids, or components must be provided. Supports rich embeds, message references for replies, and components.`,
    params: [
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `The ID of the channel to send the message to.`,
      },
      {
        name: 'allowed_mentions',
        type: 'object',
        required: false,
        description: `Controls which mentions are allowed in the message. Example: {"parse": ["users", "roles"]}`,
      },
      {
        name: 'components',
        type: 'array',
        required: false,
        description: `Array of message component objects (buttons, select menus, etc.).`,
      },
      {
        name: 'content',
        type: 'string',
        required: false,
        description: `The text content of the message (up to 2000 characters).`,
      },
      {
        name: 'embeds',
        type: 'array',
        required: false,
        description: `Array of embed objects to attach to the message (up to 10 embeds).`,
      },
      {
        name: 'enforce_nonce',
        type: 'boolean',
        required: false,
        description: `If true and nonce is present, the nonce is checked for uniqueness in the past few minutes. If another message was created by the same author with the same nonce, that message is returned and no new message is created.`,
      },
      {
        name: 'flags',
        type: 'integer',
        required: false,
        description: `Message flags. Use 64 for SUPPRESS_EMBEDS or 4096 for SUPPRESS_NOTIFICATIONS.`,
      },
      {
        name: 'message_reference',
        type: 'object',
        required: false,
        description: `Message reference object for replying to a message. Example: {"message_id": "123"}`,
      },
      {
        name: 'nonce',
        type: 'string',
        required: false,
        description: `A nonce value (string or integer) used for message deduplication.`,
      },
      {
        name: 'poll',
        type: 'object',
        required: false,
        description: `A poll request object to attach to the message.`,
      },
      {
        name: 'shared_client_theme',
        type: 'object',
        required: false,
        description: `The custom client-side theme to share via the message.`,
      },
      {
        name: 'sticker_ids',
        type: 'array',
        required: false,
        description: `Array of sticker IDs to attach to the message (up to 3 stickers).`,
      },
      {
        name: 'tts',
        type: 'boolean',
        required: false,
        description: `Whether the message should be sent as text-to-speech.`,
      },
    ],
  },
  {
    name: 'discordbot_create_or_join_lobby',
    description: `Create a new lobby identified by a secret, or join the calling user to the existing lobby with that secret if one already exists. Updates lobby metadata and the calling member's metadata on join. Returns a lobby object.`,
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
    name: 'discordbot_create_reaction',
    description: `Add a reaction to a message in a Discord channel. The emoji parameter should be URL-encoded (e.g., a Unicode emoji like %F0%9F%94%A5 for 🔥, or name:id for custom emojis).`,
    params: [
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `The ID of the channel containing the message.`,
      },
      {
        name: 'emoji',
        type: 'string',
        required: true,
        description: `The emoji to react with. Use URL-encoded Unicode for standard emojis (e.g., %F0%9F%94%A5) or name:id format for custom emojis.`,
      },
      {
        name: 'message_id',
        type: 'string',
        required: true,
        description: `The ID of the message to react to.`,
      },
    ],
  },
  {
    name: 'discordbot_create_stage_instance',
    description: `Create a new Stage instance associated with a Stage channel, making the channel go live. Requires the user to be a moderator of the Stage channel (MANAGE_CHANNELS, MUTE_MEMBERS, and MOVE_MEMBERS permissions). Fires a Stage Instance Create Gateway event. Returns the new Stage instance object.`,
    params: [
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `The ID of the Stage channel to create the Stage instance for.`,
      },
      {
        name: 'topic',
        type: 'string',
        required: true,
        description: `The topic of the Stage instance (1-120 characters).`,
      },
      {
        name: 'guild_scheduled_event_id',
        type: 'string',
        required: false,
        description: `The ID of the guild scheduled event to associate with this Stage instance.`,
      },
      {
        name: 'privacy_level',
        type: 'integer',
        required: false,
        description: `The privacy level of the Stage instance: 1=PUBLIC (deprecated), 2=GUILD_ONLY. Defaults to GUILD_ONLY (2) if omitted.`,
      },
      {
        name: 'reason',
        type: 'string',
        required: false,
        description: `Reason for creating the Stage instance, shown in the guild's audit log.`,
      },
      {
        name: 'send_start_notification',
        type: 'boolean',
        required: false,
        description: `Whether to notify @everyone that a Stage instance has started. The stage moderator must have the MENTION_EVERYONE permission for the notification to be sent.`,
      },
    ],
  },
  {
    name: 'discordbot_create_test_entitlement',
    description: `Create a test entitlement to a given SKU for a given guild or user. Discord will act as though that user or guild has entitlement to your premium offering. After creating a test entitlement, reload your Discord client to see the server or user gain premium access. Returns a partial entitlement object — it does not contain subscription_id, starts_at, or ends_at, since it's valid in perpetuity.`,
    params: [
      {
        name: 'application_id',
        type: 'string',
        required: true,
        description: `The ID of the application to create the test entitlement for.`,
      },
      {
        name: 'owner_id',
        type: 'string',
        required: true,
        description: `The ID of the guild or user to grant the entitlement to.`,
      },
      {
        name: 'owner_type',
        type: 'integer',
        required: true,
        description: `The type of owner to grant the entitlement to: 1 for a guild subscription, 2 for a user subscription.`,
      },
      {
        name: 'sku_id',
        type: 'string',
        required: true,
        description: `The ID of the SKU to grant the entitlement to.`,
      },
    ],
  },
  {
    name: 'discordbot_create_webhook',
    description: `Create a new webhook for a Discord channel. Requires MANAGE_WEBHOOKS permission. Returns the newly created webhook object with its token.`,
    params: [
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `The ID of the channel to create the webhook in.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The name of the webhook (1-80 characters). Cannot be 'clyde'.`,
      },
      {
        name: 'avatar',
        type: 'string',
        required: false,
        description: `Base64 encoded avatar image for the webhook (data URI format, e.g., data:image/png;base64,...).`,
      },
    ],
  },
  {
    name: 'discordbot_crosspost_message',
    description: `Crosspost a message in an announcement channel to all following channels. Requires SEND_MESSAGES permission if the current user wrote the message, or MANAGE_MESSAGES if they did not.`,
    params: [
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `The ID of the announcement channel containing the message.`,
      },
      {
        name: 'message_id',
        type: 'string',
        required: true,
        description: `The ID of the message to crosspost.`,
      },
    ],
  },
  {
    name: 'discordbot_delete_all_reactions',
    description: `Delete all reactions on a message. Requires MANAGE_MESSAGES permission. Returns 204 No Content on success.`,
    params: [
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `The ID of the channel containing the message.`,
      },
      {
        name: 'message_id',
        type: 'string',
        required: true,
        description: `The ID of the message to clear all reactions from.`,
      },
    ],
  },
  {
    name: 'discordbot_delete_all_reactions_for_emoji',
    description: `Delete all reactions for a specific emoji on a message. Requires MANAGE_MESSAGES permission. Use URL-encoded emoji format. Returns 204 No Content on success.`,
    params: [
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `The ID of the channel containing the message.`,
      },
      {
        name: 'emoji',
        type: 'string',
        required: true,
        description: `The emoji whose reactions to remove. For custom emoji use name:id format. For unicode emoji use the URL-encoded character.`,
      },
      {
        name: 'message_id',
        type: 'string',
        required: true,
        description: `The ID of the message to remove emoji reactions from.`,
      },
    ],
  },
  {
    name: 'discordbot_delete_application_emoji',
    description: `Delete an emoji owned by a Discord application. Returns 204 No Content on success.`,
    params: [
      {
        name: 'application_id',
        type: 'string',
        required: true,
        description: `The ID of the application that owns the emoji.`,
      },
      {
        name: 'emoji_id',
        type: 'string',
        required: true,
        description: `The ID of the emoji to delete.`,
      },
    ],
  },
  {
    name: 'discordbot_delete_auto_moderation_rule',
    description: `Delete an Auto Moderation rule for a guild. Requires the MANAGE_GUILD permission. Fires an Auto Moderation Rule Delete Gateway event. Returns 204 No Content on success.`,
    params: [
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild the rule belongs to.`,
      },
      {
        name: 'rule_id',
        type: 'string',
        required: true,
        description: `The ID of the Auto Moderation rule to delete.`,
      },
      {
        name: 'reason',
        type: 'string',
        required: false,
        description: `Reason for deleting the rule, shown in the guild's audit log.`,
      },
    ],
  },
  {
    name: 'discordbot_delete_channel',
    description: `Delete a channel or close a private message. For guild channels, requires MANAGE_CHANNELS permission. Deleting a category does not delete its child channels. Returns the deleted channel object.`,
    params: [
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `The ID of the channel to delete.`,
      },
    ],
  },
  {
    name: 'discordbot_delete_channel_invite',
    description: `Delete an invite by its code. Requires MANAGE_CHANNELS permission for guild channel invites or MANAGE_GUILD. Returns the deleted invite object.`,
    params: [
      {
        name: 'invite_code',
        type: 'string',
        required: true,
        description: `The invite code to delete.`,
      },
      {
        name: 'reason',
        type: 'string',
        required: false,
        description: `Reason for deleting the invite, shown in the guild's audit log.`,
      },
    ],
  },
  {
    name: 'discordbot_delete_channel_permission',
    description: `Delete a channel permission overwrite for a user or role in a channel. Requires MANAGE_ROLES permission. Returns 204 No Content on success.`,
    params: [
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `The ID of the channel to delete permissions from.`,
      },
      {
        name: 'overwrite_id',
        type: 'string',
        required: true,
        description: `The ID of the role or user permission overwrite to delete.`,
      },
    ],
  },
  {
    name: 'discordbot_delete_global_application_command',
    description: `Delete a global application command. Returns 204 No Content on success.`,
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
        description: `The ID of the command to delete.`,
      },
    ],
  },
  {
    name: 'discordbot_delete_guild_application_command',
    description: `Delete a guild application command. Returns 204 No Content on success.`,
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
        description: `The ID of the command to delete.`,
      },
      { name: 'guild_id', type: 'string', required: true, description: `The ID of the guild.` },
    ],
  },
  {
    name: 'discordbot_delete_guild_emoji',
    description: `Delete a guild emoji. Requires MANAGE_GUILD_EXPRESSIONS permission. Returns 204 No Content on success.`,
    params: [
      {
        name: 'emoji_id',
        type: 'string',
        required: true,
        description: `The ID of the emoji to delete.`,
      },
      { name: 'guild_id', type: 'string', required: true, description: `The ID of the guild.` },
    ],
  },
  {
    name: 'discordbot_delete_guild_integration',
    description: `Delete an attached integration for a guild. Deletes any associated webhooks and kicks the associated bot if there is one. Requires MANAGE_GUILD permission. Returns 204 No Content on success.`,
    params: [
      { name: 'guild_id', type: 'string', required: true, description: `The ID of the guild.` },
      {
        name: 'integration_id',
        type: 'string',
        required: true,
        description: `The ID of the integration to delete.`,
      },
      {
        name: 'reason',
        type: 'string',
        required: false,
        description: `Reason for deleting the integration, shown in the guild's audit log.`,
      },
    ],
  },
  {
    name: 'discordbot_delete_guild_invite',
    description: `Delete an invite by its code. Requires the MANAGE_CHANNELS permission on the channel this invite belongs to, or MANAGE_GUILD to remove any invite across the guild. Discord's invite-deletion endpoint is not guild-scoped in the URL — the invite code alone identifies it. Returns the deleted invite object.`,
    params: [
      {
        name: 'invite_code',
        type: 'string',
        required: true,
        description: `The invite code to delete.`,
      },
      {
        name: 'reason',
        type: 'string',
        required: false,
        description: `Reason for deleting the invite, shown in the guild's audit log.`,
      },
    ],
  },
  {
    name: 'discordbot_delete_guild_role',
    description: `Delete a guild role. Requires MANAGE_ROLES permission. Returns 204 No Content on success.`,
    params: [
      { name: 'guild_id', type: 'string', required: true, description: `The ID of the guild.` },
      {
        name: 'role_id',
        type: 'string',
        required: true,
        description: `The ID of the role to delete.`,
      },
    ],
  },
  {
    name: 'discordbot_delete_guild_scheduled_event',
    description: `Delete a guild scheduled event. Requires MANAGE_EVENTS permission. Returns 204 No Content on success.`,
    params: [
      { name: 'guild_id', type: 'string', required: true, description: `The ID of the guild.` },
      {
        name: 'guild_scheduled_event_id',
        type: 'string',
        required: true,
        description: `The ID of the scheduled event to delete.`,
      },
    ],
  },
  {
    name: 'discordbot_delete_guild_soundboard_sound',
    description: `Delete the given guild soundboard sound. For sounds created by the current user, requires either the CREATE_GUILD_EXPRESSIONS or MANAGE_GUILD_EXPRESSIONS permission. For other sounds, requires the MANAGE_GUILD_EXPRESSIONS permission. Fires a Guild Soundboard Sound Delete Gateway event. Returns 204 No Content on success.`,
    params: [
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild the soundboard sound belongs to.`,
      },
      {
        name: 'sound_id',
        type: 'string',
        required: true,
        description: `The ID of the soundboard sound to delete.`,
      },
      {
        name: 'reason',
        type: 'string',
        required: false,
        description: `Reason for deleting the sound, shown in the guild's audit log.`,
      },
    ],
  },
  {
    name: 'discordbot_delete_guild_sticker',
    description: `Delete a guild sticker. Requires MANAGE_GUILD_EXPRESSIONS permission. Returns 204 No Content on success.`,
    params: [
      { name: 'guild_id', type: 'string', required: true, description: `The ID of the guild.` },
      {
        name: 'sticker_id',
        type: 'string',
        required: true,
        description: `The ID of the sticker to delete.`,
      },
    ],
  },
  {
    name: 'discordbot_delete_guild_template',
    description: `Delete a guild template. Requires the MANAGE_GUILD permission. Returns the deleted guild template object on success.`,
    params: [
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild the template belongs to.`,
      },
      {
        name: 'template_code',
        type: 'string',
        required: true,
        description: `The template code to delete.`,
      },
    ],
  },
  {
    name: 'discordbot_delete_lobby',
    description: `Delete a Discord lobby if it exists. Safe to call even if the lobby is already deleted. Returns nothing.`,
    params: [
      {
        name: 'lobby_id',
        type: 'string',
        required: true,
        description: `The ID of the lobby to delete.`,
      },
    ],
  },
  {
    name: 'discordbot_delete_message',
    description: `Permanently delete a message from a Discord channel. This action is irreversible. Requires MANAGE_MESSAGES permission for messages sent by others.`,
    params: [
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `The ID of the channel containing the message.`,
      },
      {
        name: 'message_id',
        type: 'string',
        required: true,
        description: `The ID of the message to delete.`,
      },
    ],
  },
  {
    name: 'discordbot_delete_original_interaction_response',
    description: `Delete the initial response to an interaction. Returns 204 No Content on success.`,
    params: [
      {
        name: 'application_id',
        type: 'string',
        required: true,
        description: `The ID of the application.`,
      },
      {
        name: 'interaction_token',
        type: 'string',
        required: true,
        description: `The token of the interaction.`,
      },
    ],
  },
  {
    name: 'discordbot_delete_own_reaction',
    description: `Remove the current user's own reaction from a Discord message. The emoji parameter should be URL-encoded.`,
    params: [
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `The ID of the channel containing the message.`,
      },
      {
        name: 'emoji',
        type: 'string',
        required: true,
        description: `The emoji reaction to remove. Use URL-encoded Unicode for standard emojis or name:id for custom emojis.`,
      },
      {
        name: 'message_id',
        type: 'string',
        required: true,
        description: `The ID of the message to remove the reaction from.`,
      },
    ],
  },
  {
    name: 'discordbot_delete_stage_instance',
    description: `Delete the Stage instance for a Stage channel, ending the live Stage. Requires the user to be a moderator of the Stage channel (MANAGE_CHANNELS, MUTE_MEMBERS, and MOVE_MEMBERS permissions). Fires a Stage Instance Delete Gateway event. Returns 204 No Content on success.`,
    params: [
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `The ID of the Stage channel whose Stage instance should be deleted.`,
      },
      {
        name: 'reason',
        type: 'string',
        required: false,
        description: `Reason for deleting the Stage instance, shown in the guild's audit log.`,
      },
    ],
  },
  {
    name: 'discordbot_delete_test_entitlement',
    description: `Delete a currently-active test entitlement. Discord will act as though that user or guild no longer has entitlement to your premium offering. Returns 204 No Content on success.`,
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
    name: 'discordbot_delete_user_reaction',
    description: `Delete a reaction made by a specific user on a message. Requires MANAGE_MESSAGES permission. Use URL-encoded emoji format (e.g., %F0%9F%94%A5 for fire emoji, or name:id for custom emoji).`,
    params: [
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `The ID of the channel containing the message.`,
      },
      {
        name: 'emoji',
        type: 'string',
        required: true,
        description: `The emoji to remove. For custom emoji use name:id format. For unicode emoji use the URL-encoded character.`,
      },
      {
        name: 'message_id',
        type: 'string',
        required: true,
        description: `The ID of the message to remove the reaction from.`,
      },
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `The ID of the user whose reaction to remove.`,
      },
    ],
  },
  {
    name: 'discordbot_delete_webhook',
    description: `Permanently delete a Discord webhook. Requires MANAGE_WEBHOOKS permission. This action is irreversible.`,
    params: [
      {
        name: 'webhook_id',
        type: 'string',
        required: true,
        description: `The ID of the webhook to delete.`,
      },
    ],
  },
  {
    name: 'discordbot_delete_webhook_message',
    description: `Delete a previously sent webhook message. Returns 204 No Content on success.`,
    params: [
      {
        name: 'message_id',
        type: 'string',
        required: true,
        description: `The ID of the message to delete.`,
      },
      { name: 'webhook_id', type: 'string', required: true, description: `The ID of the webhook.` },
      {
        name: 'webhook_token',
        type: 'string',
        required: true,
        description: `The token of the webhook.`,
      },
      {
        name: 'thread_id',
        type: 'string',
        required: false,
        description: `ID of the thread the message is in (if applicable).`,
      },
    ],
  },
  {
    name: 'discordbot_delete_webhook_with_token',
    description: `Delete a webhook using its token instead of OAuth authentication. Returns 204 No Content on success.`,
    params: [
      {
        name: 'webhook_id',
        type: 'string',
        required: true,
        description: `The ID of the webhook to delete.`,
      },
      {
        name: 'webhook_token',
        type: 'string',
        required: true,
        description: `The token of the webhook.`,
      },
    ],
  },
  {
    name: 'discordbot_edit_channel_permissions',
    description: `Edit the channel permission overwrites for a user or role in a channel. Only usable for guild channels. Requires MANAGE_ROLES permission. Returns 204 No Content on success. Full permission flag reference (name=decimal value, OR multiple together): CREATE_INSTANT_INVITE=1, KICK_MEMBERS=2, BAN_MEMBERS=4, ADMINISTRATOR=8, MANAGE_CHANNELS=16, MANAGE_GUILD=32, ADD_REACTIONS=64, VIEW_AUDIT_LOG=128, PRIORITY_SPEAKER=256, STREAM=512, VIEW_CHANNEL=1024, SEND_MESSAGES=2048, SEND_TTS_MESSAGES=4096, MANAGE_MESSAGES=8192, EMBED_LINKS=16384, ATTACH_FILES=32768, READ_MESSAGE_HISTORY=65536, MENTION_EVERYONE=131072, USE_EXTERNAL_EMOJIS=262144, VIEW_GUILD_INSIGHTS=524288, CONNECT=1048576, SPEAK=2097152, MUTE_MEMBERS=4194304, DEAFEN_MEMBERS=8388608, MOVE_MEMBERS=16777216, USE_VAD=33554432, CHANGE_NICKNAME=67108864, MANAGE_NICKNAMES=134217728, MANAGE_ROLES=268435456, MANAGE_WEBHOOKS=536870912, MANAGE_GUILD_EXPRESSIONS=1073741824, USE_APPLICATION_COMMANDS=2147483648, REQUEST_TO_SPEAK=4294967296, MANAGE_EVENTS=8589934592, MANAGE_THREADS=17179869184, CREATE_PUBLIC_THREADS=34359738368, CREATE_PRIVATE_THREADS=68719476736, USE_EXTERNAL_STICKERS=137438953472, SEND_MESSAGES_IN_THREADS=274877906944, USE_EMBEDDED_ACTIVITIES=549755813888, MODERATE_MEMBERS=1099511627776, VIEW_CREATOR_MONETIZATION_ANALYTICS=2199023255552, USE_SOUNDBOARD=4398046511104, CREATE_GUILD_EXPRESSIONS=8796093022208, CREATE_EVENTS=17592186044416, USE_EXTERNAL_SOUNDS=35184372088832, SEND_VOICE_MESSAGES=70368744177664, SET_VOICE_CHANNEL_STATUS=281474976710656, SEND_POLLS=562949953421312, USE_EXTERNAL_APPS=1125899906842624, PIN_MESSAGES=2251799813685248, BYPASS_SLOWMODE=4503599627370496. Or use a calculator like discordapi.com/permissions.htm. Optionally provide 'allow_names'/'deny_names' (arrays of named permission flags) instead of raw 'allow'/'deny' integers — the correct bitfield is computed automatically.`,
    params: [
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `The ID of the channel to edit permissions for.`,
      },
      {
        name: 'overwrite_id',
        type: 'string',
        required: true,
        description: `The ID of the role or user to set permissions for.`,
      },
      {
        name: 'type',
        type: 'integer',
        required: true,
        description: `Type of overwrite: 0 for role, 1 for member. Required by Discord's API.`,
      },
      {
        name: 'allow',
        type: 'string',
        required: false,
        description: `Bitwise value of all allowed permissions as a string.`,
      },
      {
        name: 'allow_names',
        type: 'array',
        required: false,
        description: `Named permission flags to OR together for 'allow', as a more reliable alternative to a raw bitwise integer string — no manual bit math required. If both 'allow_names' and 'allow' are given, 'allow_names' takes precedence.`,
      },
      {
        name: 'deny',
        type: 'string',
        required: false,
        description: `Bitwise value of all denied permissions as a string.`,
      },
      {
        name: 'deny_names',
        type: 'array',
        required: false,
        description: `Named permission flags to OR together for 'deny', as a more reliable alternative to a raw bitwise integer string — no manual bit math required. If both 'deny_names' and 'deny' are given, 'deny_names' takes precedence.`,
      },
    ],
  },
  {
    name: 'discordbot_edit_current_application',
    description: `Edit properties of the app associated with the requesting bot user. Only properties that are passed are updated. Returns the updated application object on success.`,
    params: [
      {
        name: 'cover_image',
        type: 'string',
        required: false,
        description: `Base64 encoded image data URI for the app's default rich presence invite cover image, or null to remove it.`,
      },
      {
        name: 'custom_install_url',
        type: 'string',
        required: false,
        description: `Default custom authorization URL for the app, if enabled.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description of the app.`,
      },
      {
        name: 'event_webhooks_status',
        type: 'integer',
        required: false,
        description: `Whether event webhooks are enabled for the app. Use 1 to disable and 2 to enable.`,
      },
      {
        name: 'event_webhooks_types',
        type: 'array',
        required: false,
        description: `List of webhook event types to subscribe to.`,
      },
      {
        name: 'event_webhooks_url',
        type: 'string',
        required: false,
        description: `Event webhooks URL for the app to receive webhook events.`,
      },
      {
        name: 'flags',
        type: 'integer',
        required: false,
        description: `App's public flags. Only limited intent flags (GATEWAY_PRESENCE_LIMITED, GATEWAY_GUILD_MEMBERS_LIMITED, and GATEWAY_MESSAGE_CONTENT_LIMITED) can be updated via the API.`,
      },
      {
        name: 'icon',
        type: 'string',
        required: false,
        description: `Base64 encoded image data URI for the icon of the app, or null to remove it.`,
      },
      {
        name: 'install_params',
        type: 'object',
        required: false,
        description: `Settings for the app's default in-app authorization link, if enabled. An object with 'scopes' (array of strings) and 'permissions' (string).`,
      },
      {
        name: 'integration_types_config',
        type: 'object',
        required: false,
        description: `Default scopes and permissions for each supported installation context, keyed by application integration type (0 for guild install, 1 for user install).`,
      },
      {
        name: 'interactions_endpoint_url',
        type: 'string',
        required: false,
        description: `Interactions endpoint URL for the app. Discord validates this URL by sending a PING interaction before accepting the update.`,
      },
      {
        name: 'role_connections_verification_url',
        type: 'string',
        required: false,
        description: `Role connection verification URL for the app.`,
      },
      {
        name: 'tags',
        type: 'array',
        required: false,
        description: `List of tags describing the content and functionality of the app. Max of 20 characters per tag, and a max of 5 tags.`,
      },
    ],
  },
  {
    name: 'discordbot_edit_global_application_command',
    description: `Edit a global application command. Returns the updated command object.`,
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
        description: `The ID of the command to edit.`,
      },
      {
        name: 'default_member_permissions',
        type: 'string',
        required: false,
        description: `Permissions required to use the command as a bitfield string.`,
      },
      {
        name: 'default_permission',
        type: 'boolean',
        required: false,
        description: `Whether the command is enabled by default (deprecated).`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New command description (1-100 characters).`,
      },
      {
        name: 'description_localizations',
        type: 'object',
        required: false,
        description: `Localization dictionary for description field.`,
      },
      {
        name: 'dm_permission',
        type: 'boolean',
        required: false,
        description: `Whether the command is available in DMs (deprecated).`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New command name (1-32 characters).`,
      },
      {
        name: 'name_localizations',
        type: 'object',
        required: false,
        description: `Localization dictionary for name field.`,
      },
      {
        name: 'nsfw',
        type: 'boolean',
        required: false,
        description: `Whether the command is age-restricted.`,
      },
      {
        name: 'options',
        type: 'array',
        required: false,
        description: `New array of command option objects.`,
      },
    ],
  },
  {
    name: 'discordbot_edit_guild_application_command',
    description: `Edit a guild application command. Returns the updated command object.`,
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
        description: `The ID of the command to edit.`,
      },
      { name: 'guild_id', type: 'string', required: true, description: `The ID of the guild.` },
      {
        name: 'default_member_permissions',
        type: 'string',
        required: false,
        description: `Permissions required to use the command as a bitfield string.`,
      },
      {
        name: 'default_permission',
        type: 'boolean',
        required: false,
        description: `Whether the command is enabled by default (deprecated).`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New command description.`,
      },
      {
        name: 'description_localizations',
        type: 'object',
        required: false,
        description: `Localization dictionary for description field.`,
      },
      { name: 'name', type: 'string', required: false, description: `New command name.` },
      {
        name: 'name_localizations',
        type: 'object',
        required: false,
        description: `Localization dictionary for name field.`,
      },
      {
        name: 'nsfw',
        type: 'boolean',
        required: false,
        description: `Whether the command is age-restricted.`,
      },
      {
        name: 'options',
        type: 'array',
        required: false,
        description: `New array of command option objects.`,
      },
    ],
  },
  {
    name: 'discordbot_edit_message',
    description: `Edit a previously sent message in a Discord channel. Only the author of the message can edit it. Supports updating content, embeds, flags, allowed mentions, components, and attachments.`,
    params: [
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `The ID of the channel containing the message.`,
      },
      {
        name: 'message_id',
        type: 'string',
        required: true,
        description: `The ID of the message to edit.`,
      },
      {
        name: 'allowed_mentions',
        type: 'object',
        required: false,
        description: `Controls which mentions are allowed in the edited message.`,
      },
      {
        name: 'attachments',
        type: 'array',
        required: false,
        description: `Array of attachment objects to keep or modify on the message.`,
      },
      {
        name: 'components',
        type: 'array',
        required: false,
        description: `Array of updated message component objects.`,
      },
      {
        name: 'content',
        type: 'string',
        required: false,
        description: `New text content for the message (up to 2000 characters). Pass null to remove content.`,
      },
      {
        name: 'embeds',
        type: 'array',
        required: false,
        description: `Array of updated embed objects. Pass empty array to remove all embeds.`,
      },
      {
        name: 'flags',
        type: 'integer',
        required: false,
        description: `Updated message flags. Use 64 to suppress embeds.`,
      },
    ],
  },
  {
    name: 'discordbot_edit_original_interaction_response',
    description: `Edit the initial response to an interaction. Returns the updated message object.`,
    params: [
      {
        name: 'application_id',
        type: 'string',
        required: true,
        description: `The ID of the application.`,
      },
      {
        name: 'interaction_token',
        type: 'string',
        required: true,
        description: `The token of the interaction.`,
      },
      {
        name: 'allowed_mentions',
        type: 'object',
        required: false,
        description: `Allowed mentions object.`,
      },
      {
        name: 'attachments',
        type: 'array',
        required: false,
        description: `Array of attachment objects.`,
      },
      {
        name: 'components',
        type: 'array',
        required: false,
        description: `Array of message component objects.`,
      },
      { name: 'content', type: 'string', required: false, description: `Updated message content.` },
      { name: 'embeds', type: 'array', required: false, description: `Array of embed objects.` },
      { name: 'flags', type: 'integer', required: false, description: `Message flags.` },
    ],
  },
  {
    name: 'discordbot_edit_webhook_message',
    description: `Edit a previously sent webhook message. Returns the updated message object.`,
    params: [
      {
        name: 'message_id',
        type: 'string',
        required: true,
        description: `The ID of the message to edit.`,
      },
      { name: 'webhook_id', type: 'string', required: true, description: `The ID of the webhook.` },
      {
        name: 'webhook_token',
        type: 'string',
        required: true,
        description: `The token of the webhook.`,
      },
      {
        name: 'allowed_mentions',
        type: 'object',
        required: false,
        description: `Allowed mentions object controlling which mentions are processed.`,
      },
      {
        name: 'attachments',
        type: 'array',
        required: false,
        description: `Array of attachment objects to include with the message.`,
      },
      {
        name: 'components',
        type: 'array',
        required: false,
        description: `Array of message component objects.`,
      },
      {
        name: 'content',
        type: 'string',
        required: false,
        description: `New message content (up to 2000 characters).`,
      },
      { name: 'embeds', type: 'array', required: false, description: `Array of embed objects.` },
      {
        name: 'flags',
        type: 'integer',
        required: false,
        description: `Message flags (only SUPPRESS_EMBEDS can be set/unset).`,
      },
      {
        name: 'poll',
        type: 'object',
        required: false,
        description: `A poll request object to attach to the message. Polls can only be added when editing a deferred interaction response.`,
      },
      {
        name: 'thread_id',
        type: 'string',
        required: false,
        description: `ID of the thread the message is in (query parameter).`,
      },
      {
        name: 'with_components',
        type: 'boolean',
        required: false,
        description: `Whether to respect the components field of the request (defaults to false). When enabled, allows application-owned webhooks to use all components and non-owned webhooks to use non-interactive components.`,
      },
    ],
  },
  {
    name: 'discordbot_end_poll',
    description: `Immediately end an active poll in a Discord message. You cannot end polls created by other users.`,
    params: [
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `The ID of the channel containing the poll message.`,
      },
      {
        name: 'message_id',
        type: 'string',
        required: true,
        description: `The ID of the poll message to end.`,
      },
    ],
  },
  {
    name: 'discordbot_execute_github_compatible_webhook',
    description: `Send a GitHub webhook event payload to a Discord webhook, for use as the Payload URL when configuring a GitHub repository webhook. Supports the commit_comment, create, delete, fork, issue_comment, issues, member, public, pull_request, pull_request_review, pull_request_review_comment, push, release, watch, check_run, check_suite, discussion, and discussion_comment GitHub events.`,
    params: [
      {
        name: 'sender',
        type: 'object',
        required: true,
        description: `The GitHub user object that triggered the event.`,
      },
      {
        name: 'webhook_id',
        type: 'string',
        required: true,
        description: `The ID of the webhook to execute.`,
      },
      {
        name: 'webhook_token',
        type: 'string',
        required: true,
        description: `The token of the webhook.`,
      },
      {
        name: 'action',
        type: 'string',
        required: false,
        description: `The GitHub event action, such as opened, closed, or created.`,
      },
      {
        name: 'answer',
        type: 'object',
        required: false,
        description: `The GitHub discussion answer comment object, present for discussion answer events.`,
      },
      {
        name: 'check_run',
        type: 'object',
        required: false,
        description: `The GitHub check run object, present for check_run events.`,
      },
      {
        name: 'check_suite',
        type: 'object',
        required: false,
        description: `The GitHub check suite object, present for check_suite events.`,
      },
      {
        name: 'comment',
        type: 'object',
        required: false,
        description: `The GitHub comment object, present for comment_comment, issue_comment, pull_request_review_comment, and discussion_comment events.`,
      },
      {
        name: 'commits',
        type: 'array',
        required: false,
        description: `Array of GitHub commit objects included in a push event.`,
      },
      {
        name: 'compare',
        type: 'string',
        required: false,
        description: `URL to compare the before and after states of a push event.`,
      },
      {
        name: 'discussion',
        type: 'object',
        required: false,
        description: `The GitHub discussion object, present for discussion events.`,
      },
      {
        name: 'forced',
        type: 'boolean',
        required: false,
        description: `Whether the push event was a force push.`,
      },
      {
        name: 'forkee',
        type: 'object',
        required: false,
        description: `The GitHub repository object for the new fork, present for fork events.`,
      },
      {
        name: 'head_commit',
        type: 'object',
        required: false,
        description: `The head GitHub commit object for a push event.`,
      },
      {
        name: 'issue',
        type: 'object',
        required: false,
        description: `The GitHub issue object, present for issues and issue_comment events.`,
      },
      {
        name: 'member',
        type: 'object',
        required: false,
        description: `The GitHub user object for the affected member, present for member events.`,
      },
      {
        name: 'pull_request',
        type: 'object',
        required: false,
        description: `The GitHub pull request object, present for pull_request, pull_request_review, and pull_request_review_comment events.`,
      },
      {
        name: 'ref',
        type: 'string',
        required: false,
        description: `The full git ref that was pushed, created, or deleted, such as refs/heads/main.`,
      },
      {
        name: 'ref_type',
        type: 'string',
        required: false,
        description: `The type of ref affected, such as branch or tag, present for create and delete events.`,
      },
      {
        name: 'release',
        type: 'object',
        required: false,
        description: `The GitHub release object, present for release events.`,
      },
      {
        name: 'repository',
        type: 'object',
        required: false,
        description: `The GitHub repository object the event occurred in.`,
      },
      {
        name: 'review',
        type: 'object',
        required: false,
        description: `The GitHub pull request review object, present for pull_request_review events.`,
      },
      {
        name: 'thread_id',
        type: 'string',
        required: false,
        description: `ID of the thread to send the message in.`,
      },
      {
        name: 'wait',
        type: 'boolean',
        required: false,
        description: `Waits for server confirmation of message send before responding. Defaults to true; when false, a message that fails to save does not return an error.`,
      },
    ],
  },
  {
    name: 'discordbot_execute_slack_compatible_webhook',
    description: `Send a message to a Discord webhook using a Slack-compatible payload format, so tools that only speak Slack's incoming webhook format can post into Discord. Discord does not support Slack's channel, icon_emoji, mrkdwn, or mrkdwn_in properties.`,
    params: [
      {
        name: 'webhook_id',
        type: 'string',
        required: true,
        description: `The ID of the webhook to execute.`,
      },
      {
        name: 'webhook_token',
        type: 'string',
        required: true,
        description: `The token of the webhook.`,
      },
      {
        name: 'attachments',
        type: 'array',
        required: false,
        description: `Array of Slack-style attachment objects to include with the message.`,
      },
      {
        name: 'icon_url',
        type: 'string',
        required: false,
        description: `URL of an image to use as the icon for this message, overriding the webhook's default avatar.`,
      },
      {
        name: 'text',
        type: 'string',
        required: false,
        description: `The message text content (up to 2000 characters).`,
      },
      {
        name: 'thread_id',
        type: 'string',
        required: false,
        description: `ID of the thread to send the message in.`,
      },
      {
        name: 'username',
        type: 'string',
        required: false,
        description: `Override the webhook's default username for this message.`,
      },
      {
        name: 'wait',
        type: 'boolean',
        required: false,
        description: `Waits for server confirmation of message send before responding. Defaults to true; when false, a message that fails to save does not return an error.`,
      },
    ],
  },
  {
    name: 'discordbot_execute_webhook',
    description: `Send a message via a Discord webhook. Supports custom username, avatar, embeds, and components. File attachments (multipart/form-data) are not supported by this tool. Use the wait query parameter to receive the created message object in the response.`,
    params: [
      {
        name: 'webhook_id',
        type: 'string',
        required: true,
        description: `The ID of the webhook to execute.`,
      },
      {
        name: 'webhook_token',
        type: 'string',
        required: true,
        description: `The token of the webhook.`,
      },
      {
        name: 'allowed_mentions',
        type: 'object',
        required: false,
        description: `Allowed mentions object to control mention behavior.`,
      },
      {
        name: 'applied_tags',
        type: 'array',
        required: false,
        description: `Array of tag IDs to apply to the thread (requires the webhook channel to be a forum or media channel).`,
      },
      {
        name: 'attachments',
        type: 'array',
        required: false,
        description: `Array of partial attachment request objects providing metadata for the attachments on this message.`,
      },
      {
        name: 'avatar_url',
        type: 'string',
        required: false,
        description: `URL of the avatar image to use instead of the webhook's default avatar.`,
      },
      {
        name: 'components',
        type: 'array',
        required: false,
        description: `Array of message component objects.`,
      },
      {
        name: 'content',
        type: 'string',
        required: false,
        description: `The message text content (up to 2000 characters).`,
      },
      {
        name: 'embeds',
        type: 'array',
        required: false,
        description: `Array of embed objects to include in the message (up to 10).`,
      },
      {
        name: 'flags',
        type: 'integer',
        required: false,
        description: `Message flags. Use 64 for SUPPRESS_EMBEDS.`,
      },
      {
        name: 'poll',
        type: 'object',
        required: false,
        description: `A poll request object to attach to the message.`,
      },
      {
        name: 'thread_id',
        type: 'string',
        required: false,
        description: `Send the message to this thread within a forum or media channel.`,
      },
      {
        name: 'thread_name',
        type: 'string',
        required: false,
        description: `Name of the thread to create (only for forum/media channels).`,
      },
      {
        name: 'tts',
        type: 'boolean',
        required: false,
        description: `Whether the message should be sent as text-to-speech.`,
      },
      {
        name: 'username',
        type: 'string',
        required: false,
        description: `Override the webhook's default username for this message.`,
      },
      {
        name: 'wait',
        type: 'boolean',
        required: false,
        description: `If true, waits for the message to be created and returns the message object.`,
      },
      {
        name: 'with_components',
        type: 'boolean',
        required: false,
        description: `Whether to respect the components field of the request. When enabled, allows application-owned webhooks to use all components and non-owned webhooks to use non-interactive components. Defaults to false.`,
      },
    ],
  },
  {
    name: 'discordbot_follow_announcement_channel',
    description: `Follow an announcement channel to send messages to a target channel. Requires MANAGE_WEBHOOKS permission in the target channel. Returns a followed channel object.`,
    params: [
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `The ID of the announcement channel to follow.`,
      },
      {
        name: 'webhook_channel_id',
        type: 'string',
        required: true,
        description: `The ID of the target channel to receive crossposted messages.`,
      },
    ],
  },
  {
    name: 'discordbot_get_answer_voters',
    description: `Retrieve a list of users who voted for a specific answer in a Discord poll.`,
    params: [
      {
        name: 'answer_id',
        type: 'string',
        required: true,
        description: `The ID of the poll answer to get voters for.`,
      },
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `The ID of the channel containing the poll message.`,
      },
      {
        name: 'message_id',
        type: 'string',
        required: true,
        description: `The ID of the poll message.`,
      },
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Get users after this user ID (snowflake) for pagination.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of voters to return (1-100). Default is 25.`,
      },
    ],
  },
  {
    name: 'discordbot_get_application_activity_instance',
    description: `Retrieve a serialized activity instance for an application, if it exists. Useful for preventing unwanted activity sessions.`,
    params: [
      {
        name: 'application_id',
        type: 'string',
        required: true,
        description: `The ID of the application that owns the activity instance.`,
      },
      {
        name: 'instance_id',
        type: 'string',
        required: true,
        description: `The ID of the activity instance to retrieve.`,
      },
    ],
  },
  {
    name: 'discordbot_get_application_emoji',
    description: `Retrieve a specific emoji owned by a Discord application by its emoji ID.`,
    params: [
      {
        name: 'application_id',
        type: 'string',
        required: true,
        description: `The ID of the application that owns the emoji.`,
      },
      {
        name: 'emoji_id',
        type: 'string',
        required: true,
        description: `The ID of the emoji to retrieve.`,
      },
    ],
  },
  {
    name: 'discordbot_get_application_role_connection_metadata',
    description: `Fetch the list of application role connection metadata records configured for an application. Returns an array of application role connection metadata objects, each describing a comparison type, dictionary key, name, and description used to verify a user's role connection.`,
    params: [
      {
        name: 'application_id',
        type: 'string',
        required: true,
        description: `The ID of the application.`,
      },
    ],
  },
  {
    name: 'discordbot_get_auto_moderation_rule',
    description: `Get a single Auto Moderation rule for a guild by its ID. Requires the MANAGE_GUILD permission. Returns an auto moderation rule object.`,
    params: [
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild the rule belongs to.`,
      },
      {
        name: 'rule_id',
        type: 'string',
        required: true,
        description: `The ID of the Auto Moderation rule to retrieve.`,
      },
    ],
  },
  {
    name: 'discordbot_get_channel',
    description: `Retrieve a Discord channel by its ID. Returns channel information including type, name, topic, permissions, and other metadata.`,
    params: [
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `The ID of the channel to retrieve.`,
      },
    ],
  },
  {
    name: 'discordbot_get_channel_invites',
    description: `Retrieve a list of invites for a Discord channel. Requires MANAGE_CHANNELS permission. Returns invite objects with metadata.`,
    params: [
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `The ID of the channel to retrieve invites for.`,
      },
    ],
  },
  {
    name: 'discordbot_get_channel_message',
    description: `Retrieve a specific message from a Discord channel by its message ID.`,
    params: [
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `The ID of the channel containing the message.`,
      },
      {
        name: 'message_id',
        type: 'string',
        required: true,
        description: `The ID of the message to retrieve.`,
      },
    ],
  },
  {
    name: 'discordbot_get_channel_webhooks',
    description: `Retrieve all webhooks for a Discord channel. Requires MANAGE_WEBHOOKS permission.`,
    params: [
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `The ID of the channel to retrieve webhooks for.`,
      },
    ],
  },
  {
    name: 'discordbot_get_current_application',
    description: `Retrieve the full application object associated with the requesting bot user, including installation settings, integration type configuration, and webhook event configuration.`,
    params: [],
  },
  {
    name: 'discordbot_get_current_bot_application',
    description: `Retrieve the bot's own application object, including its public Client ID, name, icon, and description. Per Discord's official OpenAPI spec, this endpoint is Bot Token only.`,
    params: [],
  },
  {
    name: 'discordbot_get_current_user_voice_state',
    description: `Retrieve the current user's (the bot's) voice state in a guild, including the connected voice channel, mute and deafen status, and stage speaking request timestamp.`,
    params: [
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild to get the current user's voice state for.`,
      },
    ],
  },
  {
    name: 'discordbot_get_entitlement',
    description: `Retrieve a single entitlement for an application by ID. Use to check whether a specific entitlement is active, its type, and its expiration window.`,
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
    name: 'discordbot_get_global_application_command',
    description: `Fetch a specific global application command. Returns the application command object.`,
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
        description: `The ID of the command to retrieve.`,
      },
    ],
  },
  {
    name: 'discordbot_get_global_application_commands',
    description: `Fetch all global commands for an application. Returns an array of application command objects.`,
    params: [
      {
        name: 'application_id',
        type: 'string',
        required: true,
        description: `The ID of the application.`,
      },
      {
        name: 'with_localizations',
        type: 'boolean',
        required: false,
        description: `Whether to include localizations in the response.`,
      },
    ],
  },
  {
    name: 'discordbot_get_guild',
    description: `Retrieve a Discord guild (server) by its ID. Optionally include approximate member and presence counts.`,
    params: [
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild to retrieve.`,
      },
      {
        name: 'with_counts',
        type: 'boolean',
        required: false,
        description: `When true, returns approximate_member_count and approximate_presence_count.`,
      },
    ],
  },
  {
    name: 'discordbot_get_guild_application_command',
    description: `Fetch a specific application command registered in a guild. Returns the application command object.`,
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
        description: `The ID of the command to retrieve.`,
      },
      { name: 'guild_id', type: 'string', required: true, description: `The ID of the guild.` },
    ],
  },
  {
    name: 'discordbot_get_guild_application_command_permissions',
    description: `Fetch permissions for all commands in a guild. Returns an array of guild application command permissions objects.`,
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
    name: 'discordbot_get_guild_application_commands',
    description: `Fetch all application commands registered in a specific guild. Returns an array of application command objects.`,
    params: [
      {
        name: 'application_id',
        type: 'string',
        required: true,
        description: `The ID of the application.`,
      },
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild to get commands for.`,
      },
      {
        name: 'with_localizations',
        type: 'boolean',
        required: false,
        description: `Whether to include localizations in the response.`,
      },
    ],
  },
  {
    name: 'discordbot_get_guild_audit_log',
    description: `Retrieve the audit log for a Discord guild. Returns a list of audit log entries with details about administrative actions. Requires VIEW_AUDIT_LOG permission.`,
    params: [
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild to retrieve the audit log for.`,
      },
      {
        name: 'action_type',
        type: 'integer',
        required: false,
        description: `Filter by audit log event type (e.g., 1=GUILD_UPDATE, 10=CHANNEL_CREATE, 20=MEMBER_KICK).`,
      },
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Return entries after this audit log entry ID for pagination.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Return entries before this audit log entry ID for pagination.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of entries to return (1-100). Default is 50.`,
      },
      {
        name: 'user_id',
        type: 'string',
        required: false,
        description: `Filter audit log entries by the user who performed the action.`,
      },
    ],
  },
  {
    name: 'discordbot_get_guild_ban',
    description: `Retrieve the ban record for a specific user in a Discord guild. Requires BAN_MEMBERS permission.`,
    params: [
      { name: 'guild_id', type: 'string', required: true, description: `The ID of the guild.` },
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `The ID of the banned user to retrieve information for.`,
      },
    ],
  },
  {
    name: 'discordbot_get_guild_bans',
    description: `Retrieve a list of ban objects for users banned from a Discord guild. Requires BAN_MEMBERS permission. Supports pagination via before and after.`,
    params: [
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild to retrieve bans for.`,
      },
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Return bans after this user ID (snowflake) for pagination.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Return bans before this user ID (snowflake) for pagination.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of bans to return (1-1000). Default is 1000.`,
      },
    ],
  },
  {
    name: 'discordbot_get_guild_emoji',
    description: `Retrieve a specific custom emoji from a Discord guild by its emoji ID.`,
    params: [
      {
        name: 'emoji_id',
        type: 'string',
        required: true,
        description: `The ID of the emoji to retrieve.`,
      },
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild containing the emoji.`,
      },
    ],
  },
  {
    name: 'discordbot_get_guild_integrations',
    description: `Retrieve a list of integration objects for a Discord guild. Requires MANAGE_GUILD permission. Returns a maximum of 50 integrations.`,
    params: [
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild to retrieve integrations for.`,
      },
    ],
  },
  {
    name: 'discordbot_get_guild_invites',
    description: `Retrieve a list of all active invites for a Discord guild. Requires MANAGE_GUILD permission. Returns invite objects with metadata.`,
    params: [
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild to retrieve invites for.`,
      },
    ],
  },
  {
    name: 'discordbot_get_guild_member',
    description: `Retrieve a specific member of a Discord guild by their user ID. Returns the guild member object including roles, nickname, and join date.`,
    params: [
      { name: 'guild_id', type: 'string', required: true, description: `The ID of the guild.` },
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `The ID of the user to retrieve guild member information for.`,
      },
    ],
  },
  {
    name: 'discordbot_get_guild_onboarding',
    description: `Get the onboarding configuration for a guild. Returns the guild onboarding object.`,
    params: [
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild to get onboarding information for.`,
      },
    ],
  },
  {
    name: 'discordbot_get_guild_preview',
    description: `Retrieve a preview of a Discord guild. For public guilds this is accessible without being a member. Returns guild name, description, icon, emojis, stickers, and approximate counts.`,
    params: [
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild to preview.`,
      },
    ],
  },
  {
    name: 'discordbot_get_guild_prune_count',
    description: `Get the number of members that would be removed by a prune operation. Requires KICK_MEMBERS permission.`,
    params: [
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild to check prune count for.`,
      },
      {
        name: 'days',
        type: 'integer',
        required: false,
        description: `Number of days of inactivity to check for (1-30, default 7).`,
      },
      {
        name: 'include_roles',
        type: 'string',
        required: false,
        description: `Comma-separated list of role IDs to include in the prune count.`,
      },
    ],
  },
  {
    name: 'discordbot_get_guild_role',
    description: `Retrieve a specific role object from a Discord guild by its role ID.`,
    params: [
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild containing the role.`,
      },
      {
        name: 'role_id',
        type: 'string',
        required: true,
        description: `The ID of the role to retrieve.`,
      },
    ],
  },
  {
    name: 'discordbot_get_guild_role_member_counts',
    description: `Retrieve a map of role IDs to the number of guild members with that role. Does not include the @everyone role.`,
    params: [
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild to retrieve role member counts for.`,
      },
    ],
  },
  {
    name: 'discordbot_get_guild_scheduled_event',
    description: `Retrieve a specific scheduled event in a Discord guild by its event ID.`,
    params: [
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild containing the scheduled event.`,
      },
      {
        name: 'guild_scheduled_event_id',
        type: 'string',
        required: true,
        description: `The ID of the scheduled event to retrieve.`,
      },
      {
        name: 'with_user_count',
        type: 'boolean',
        required: false,
        description: `Include the user subscription count for the event.`,
      },
    ],
  },
  {
    name: 'discordbot_get_guild_scheduled_event_users',
    description: `Get a list of users subscribed to a guild scheduled event. Returns a list of guild scheduled event user objects.`,
    params: [
      { name: 'guild_id', type: 'string', required: true, description: `The ID of the guild.` },
      {
        name: 'guild_scheduled_event_id',
        type: 'string',
        required: true,
        description: `The ID of the scheduled event.`,
      },
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Get users after this user ID (for pagination).`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Get users before this user ID (for pagination).`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of users to return (1-100, default 100).`,
      },
      {
        name: 'with_member',
        type: 'boolean',
        required: false,
        description: `Whether to include guild member objects for each user.`,
      },
    ],
  },
  {
    name: 'discordbot_get_guild_soundboard_sound',
    description: `Retrieve a soundboard sound object for the given sound id in a guild. Includes the user field if the bot has the CREATE_GUILD_EXPRESSIONS or MANAGE_GUILD_EXPRESSIONS permission.`,
    params: [
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild containing the soundboard sound.`,
      },
      {
        name: 'sound_id',
        type: 'string',
        required: true,
        description: `The ID of the soundboard sound to retrieve.`,
      },
    ],
  },
  {
    name: 'discordbot_get_guild_sticker',
    description: `Retrieve a specific custom sticker from a Discord guild by its sticker ID.`,
    params: [
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild containing the sticker.`,
      },
      {
        name: 'sticker_id',
        type: 'string',
        required: true,
        description: `The ID of the sticker to retrieve.`,
      },
    ],
  },
  {
    name: 'discordbot_get_guild_vanity_url',
    description: `Get the vanity URL for a guild. Requires MANAGE_GUILD permission. The guild must have the VANITY_URL feature enabled. Returns a partial invite object with code and uses.`,
    params: [
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild to get the vanity URL for.`,
      },
    ],
  },
  {
    name: 'discordbot_get_guild_voice_regions',
    description: `Get a list of voice regions available for a guild. Returns optimal regions that can be used when updating a guild or voice channel's region.`,
    params: [
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild to get voice regions for.`,
      },
    ],
  },
  {
    name: 'discordbot_get_guild_webhooks',
    description: `Retrieve all webhooks for a Discord guild. Requires MANAGE_WEBHOOKS permission.`,
    params: [
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild to retrieve webhooks for.`,
      },
    ],
  },
  {
    name: 'discordbot_get_guild_welcome_screen',
    description: `Retrieve the welcome screen for a Discord guild. The welcome screen is shown to new members when they join.`,
    params: [
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild to retrieve the welcome screen for.`,
      },
    ],
  },
  {
    name: 'discordbot_get_guild_widget_settings',
    description: `Get the widget settings for a guild. Requires MANAGE_GUILD permission. Returns the guild widget settings object.`,
    params: [
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild to get widget settings for.`,
      },
    ],
  },
  {
    name: 'discordbot_get_invite_target_users',
    description: `Get the users allowed to see and accept an invite. Response is a CSV file with the header user_id and each user ID from the file originally passed to invite create, one per line. Requires the caller to be the inviter, or have MANAGE_GUILD permission, or have VIEW_AUDIT_LOG permission.`,
    params: [
      {
        name: 'invite_code',
        type: 'string',
        required: true,
        description: `The invite code to get the target users for.`,
      },
    ],
  },
  {
    name: 'discordbot_get_invite_target_users_job_status',
    description: `Check the status of the asynchronous job that processes target users from a CSV when creating or updating an invite. Requires the caller to be the inviter, or have MANAGE_GUILD permission, or have VIEW_AUDIT_LOG permission. Status values: 0=UNSPECIFIED, 1=PROCESSING, 2=COMPLETED, 3=FAILED (see error_message for details).`,
    params: [
      {
        name: 'invite_code',
        type: 'string',
        required: true,
        description: `The invite code to check the target users job status for.`,
      },
    ],
  },
  {
    name: 'discordbot_get_lobby',
    description: `Retrieve a Discord lobby object for the specified lobby id, if it exists.`,
    params: [
      {
        name: 'lobby_id',
        type: 'string',
        required: true,
        description: `The ID of the lobby to retrieve.`,
      },
    ],
  },
  {
    name: 'discordbot_get_lobby_messages',
    description: `Retrieve the most recent messages in a Discord lobby. The calling user must be a member of the lobby. Returns an array of lobby message objects.`,
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
    name: 'discordbot_get_original_interaction_response',
    description: `Get the initial response to an interaction. Returns the message object.`,
    params: [
      {
        name: 'application_id',
        type: 'string',
        required: true,
        description: `The ID of the application.`,
      },
      {
        name: 'interaction_token',
        type: 'string',
        required: true,
        description: `The token of the interaction.`,
      },
      {
        name: 'thread_id',
        type: 'string',
        required: false,
        description: `ID of the thread the message is in.`,
      },
    ],
  },
  {
    name: 'discordbot_get_pinned_messages',
    description: `Retrieve pinned messages in a Discord channel using Discord's current paginated pins endpoint (introduced June 2025, replacing the deprecated /channels/{channel.id}/pins). Returns pinned messages ordered most-recently-pinned first.`,
    params: [
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `The ID of the channel to retrieve pinned messages from.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `ISO8601 timestamp; only returns pins created before this time. Used for paginating through channels with many pins.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of pins to return (1-50, default 50).`,
      },
    ],
  },
  {
    name: 'discordbot_get_reactions',
    description: `Retrieve a list of users who reacted to a Discord message with a specific emoji.`,
    params: [
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `The ID of the channel containing the message.`,
      },
      {
        name: 'emoji',
        type: 'string',
        required: true,
        description: `The emoji to get reactions for. Use URL-encoded Unicode or name:id format.`,
      },
      {
        name: 'message_id',
        type: 'string',
        required: true,
        description: `The ID of the message to get reactions for.`,
      },
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Get users after this user ID (snowflake) for pagination.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of users to return (1-100). Default is 25.`,
      },
      {
        name: 'type',
        type: 'integer',
        required: false,
        description: `The type of reaction (0 for normal, 1 for burst/super reactions).`,
      },
    ],
  },
  {
    name: 'discordbot_get_sku_subscription',
    description: `Retrieve a single subscription for a SKU by its ID. Returns a subscription object with its status, current billing period, and the entitlements it grants.`,
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
    name: 'discordbot_get_stage_instance',
    description: `Retrieve the Stage instance associated with a Stage channel, if one exists (the channel is currently live).`,
    params: [
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `The ID of the Stage channel to look up the Stage instance for.`,
      },
    ],
  },
  {
    name: 'discordbot_get_sticker',
    description: `Retrieve a Discord sticker by its ID. Returns sticker information including name, description, format type, and pack details.`,
    params: [
      {
        name: 'sticker_id',
        type: 'string',
        required: true,
        description: `The ID of the sticker to retrieve.`,
      },
    ],
  },
  {
    name: 'discordbot_get_sticker_pack',
    description: `Retrieve a Discord standard sticker pack by its ID. Returns the sticker pack including its name, description, contained stickers, cover sticker, and banner asset.`,
    params: [
      {
        name: 'pack_id',
        type: 'string',
        required: true,
        description: `The ID of the sticker pack to retrieve.`,
      },
    ],
  },
  {
    name: 'discordbot_get_thread_member',
    description: `Get a member of a thread. Returns a thread member object.`,
    params: [
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `The ID of the thread channel.`,
      },
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `The ID of the thread member to retrieve.`,
      },
      {
        name: 'with_member',
        type: 'boolean',
        required: false,
        description: `Whether to include a guild member object for the thread member.`,
      },
    ],
  },
  {
    name: 'discordbot_get_user',
    description: `Retrieve information about any Discord user by ID. Pass '@me' as user_id to fetch the bot's own user profile. Returns username, avatar, discriminator, locale, and premium status.`,
    params: [
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `The ID of the user to retrieve, or '@me' to fetch the bot's own user profile.`,
      },
    ],
  },
  {
    name: 'discordbot_get_user_voice_state',
    description: `Retrieve the specified user's voice state in a guild, including the connected voice channel, mute and deafen status, and stage speaking request timestamp. If the user is connected to a voice channel, the bot must have permission to connect to that channel.`,
    params: [
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild to get the user's voice state for.`,
      },
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `The ID of the user to retrieve the voice state for.`,
      },
    ],
  },
  {
    name: 'discordbot_get_webhook',
    description: `Retrieve a Discord webhook by its ID. Returns the webhook object including name, channel, guild, and token.`,
    params: [
      {
        name: 'webhook_id',
        type: 'string',
        required: true,
        description: `The ID of the webhook to retrieve.`,
      },
    ],
  },
  {
    name: 'discordbot_get_webhook_message',
    description: `Get a previously sent webhook message. Returns the message object.`,
    params: [
      {
        name: 'message_id',
        type: 'string',
        required: true,
        description: `The ID of the message to retrieve.`,
      },
      { name: 'webhook_id', type: 'string', required: true, description: `The ID of the webhook.` },
      {
        name: 'webhook_token',
        type: 'string',
        required: true,
        description: `The token of the webhook.`,
      },
      {
        name: 'thread_id',
        type: 'string',
        required: false,
        description: `ID of the thread the message is in (if in a forum/thread channel).`,
      },
    ],
  },
  {
    name: 'discordbot_get_webhook_with_token',
    description: `Retrieve a Discord webhook using both its ID and token. Does not require bot authentication. Returns the webhook object without the user field.`,
    params: [
      {
        name: 'webhook_id',
        type: 'string',
        required: true,
        description: `The ID of the webhook to retrieve.`,
      },
      {
        name: 'webhook_token',
        type: 'string',
        required: true,
        description: `The token of the webhook.`,
      },
    ],
  },
  {
    name: 'discordbot_group_dm_add_recipient',
    description: `Add a recipient to a Group DM using their OAuth2 access token, which must have been granted the gdm.join scope. Returns 201 if the user was added, or 204 if already a recipient.`,
    params: [
      {
        name: 'access_token',
        type: 'string',
        required: true,
        description: `OAuth2 access token of the user to add, granted with the gdm.join scope.`,
      },
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `The ID of the Group DM channel to add the recipient to.`,
      },
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `The ID of the user to add to the Group DM.`,
      },
      {
        name: 'nick',
        type: 'string',
        required: false,
        description: `Nickname to assign to the user being added.`,
      },
    ],
  },
  {
    name: 'discordbot_group_dm_remove_recipient',
    description: `Remove a recipient from a Group DM. Returns 204 No Content on success.`,
    params: [
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `The ID of the Group DM channel to remove the recipient from.`,
      },
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `The ID of the user to remove from the Group DM.`,
      },
    ],
  },
  {
    name: 'discordbot_join_thread',
    description: `Add the current user to a thread. Requires the thread to not be archived. Returns 204 No Content on success.`,
    params: [
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `The ID of the thread channel to join.`,
      },
    ],
  },
  {
    name: 'discordbot_kick_guild_member',
    description: `Remove (kick) a member from a Discord guild. The user can rejoin via a new invite. Requires KICK_MEMBERS permission.`,
    params: [
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild to kick the member from.`,
      },
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `The ID of the member to kick.`,
      },
    ],
  },
  {
    name: 'discordbot_leave_guild',
    description: `Remove the bot from a guild it belongs to. Returns 204 No Content on success.`,
    params: [
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild to leave.`,
      },
    ],
  },
  {
    name: 'discordbot_leave_lobby',
    description: `Remove the calling user from the specified Discord lobby. Safe to call even if the user is no longer a member, but fails if the lobby does not exist. Returns nothing.`,
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
    name: 'discordbot_leave_thread',
    description: `Remove the current user from a thread. Requires the thread to not be archived. Returns 204 No Content on success.`,
    params: [
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `The ID of the thread channel to leave.`,
      },
    ],
  },
  {
    name: 'discordbot_link_channel_to_lobby',
    description: `Link an existing guild text channel to a Discord lobby, or unlink any currently linked channel by omitting channel_id. The caller must be a lobby member with the CanLinkLobby lobby member flag. Returns the updated lobby object.`,
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
    name: 'discordbot_list_active_guild_threads',
    description: `List all active threads in a guild, including public and private threads. Returns a list of channel objects and thread member objects for the current user.`,
    params: [
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild to list active threads from.`,
      },
    ],
  },
  {
    name: 'discordbot_list_application_emojis',
    description: `Retrieve all emojis owned by a Discord application (app emojis). Returns an object containing a list of emoji objects under the items key.`,
    params: [
      {
        name: 'application_id',
        type: 'string',
        required: true,
        description: `The ID of the application to retrieve emojis for.`,
      },
    ],
  },
  {
    name: 'discordbot_list_auto_moderation_rules',
    description: `Get a list of all Auto Moderation rules currently configured for a guild. Requires the MANAGE_GUILD permission. Returns a list of auto moderation rule objects.`,
    params: [
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild to list Auto Moderation rules for.`,
      },
    ],
  },
  {
    name: 'discordbot_list_channel_messages',
    description: `Retrieve a list of messages from a Discord channel. Supports pagination using around, before, and after message IDs with a configurable limit.`,
    params: [
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `The ID of the channel to retrieve messages from.`,
      },
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Get messages after this message ID (snowflake).`,
      },
      {
        name: 'around',
        type: 'string',
        required: false,
        description: `Get messages around this message ID (snowflake).`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Get messages before this message ID (snowflake).`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of messages to return (1-100). Default is 50.`,
      },
    ],
  },
  {
    name: 'discordbot_list_default_soundboard_sounds',
    description: `Retrieve an array of default soundboard sound objects that can be used by all users.`,
    params: [],
  },
  {
    name: 'discordbot_list_guild_channels',
    description: `Retrieve all channels in a Discord guild (server). Returns a list of channel objects including text channels, voice channels, categories, and threads.`,
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
    name: 'discordbot_list_guild_emojis',
    description: `Retrieve all custom emojis for a Discord guild. Returns a list of emoji objects.`,
    params: [
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild to retrieve emojis for.`,
      },
    ],
  },
  {
    name: 'discordbot_list_guild_members',
    description: `Retrieve a list of members in a Discord guild. Requires the GUILD_MEMBERS privileged intent or appropriate bot permissions. Supports pagination via the after parameter.`,
    params: [
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild to list members for.`,
      },
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Return members after this user ID (snowflake) for pagination.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of members to return (1-1000). Default is 1.`,
      },
    ],
  },
  {
    name: 'discordbot_list_guild_roles',
    description: `Retrieve all roles in a Discord guild. Returns a list of role objects including permissions, color, and position.`,
    params: [
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild to retrieve roles for.`,
      },
    ],
  },
  {
    name: 'discordbot_list_guild_scheduled_events',
    description: `Retrieve a list of scheduled events for a Discord guild. Optionally include user subscription counts.`,
    params: [
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild to retrieve scheduled events for.`,
      },
      {
        name: 'with_user_count',
        type: 'boolean',
        required: false,
        description: `Include the user count for each scheduled event.`,
      },
    ],
  },
  {
    name: 'discordbot_list_guild_soundboard_sounds',
    description: `Retrieve the guild's soundboard sounds. Includes user fields if the bot has the CREATE_GUILD_EXPRESSIONS or MANAGE_GUILD_EXPRESSIONS permission. Returns an object with an items array of soundboard sound objects.`,
    params: [
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild to retrieve soundboard sounds for.`,
      },
    ],
  },
  {
    name: 'discordbot_list_guild_stickers',
    description: `Retrieve all custom stickers for a Discord guild. Returns a list of sticker objects.`,
    params: [
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild to retrieve stickers for.`,
      },
    ],
  },
  {
    name: 'discordbot_list_guild_templates',
    description: `Retrieve all guild templates for a guild. Requires the MANAGE_GUILD permission. Returns a list of guild template objects.`,
    params: [
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild to retrieve templates for.`,
      },
    ],
  },
  {
    name: 'discordbot_list_joined_private_archived_threads',
    description: `List private archived threads in a channel that the current user has joined. Returns threads in descending order of archive timestamp.`,
    params: [
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `The ID of the channel to list joined private archived threads from.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Returns threads archived before this thread ID (snowflake).`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of threads to return.`,
      },
    ],
  },
  {
    name: 'discordbot_list_private_archived_threads',
    description: `List all private archived threads in a channel. Requires MANAGE_THREADS permission and READ_MESSAGE_HISTORY permission. Returns threads in descending order of archive timestamp.`,
    params: [
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `The ID of the channel to list private archived threads from.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Returns threads archived before this timestamp (ISO8601 format).`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of threads to return.`,
      },
    ],
  },
  {
    name: 'discordbot_list_public_archived_threads',
    description: `List all public archived threads in a channel. Returns threads in descending order of archive timestamp. Requires READ_MESSAGE_HISTORY permission.`,
    params: [
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `The ID of the channel to list archived threads from.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Returns threads archived before this timestamp (ISO8601 format).`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of threads to return.`,
      },
    ],
  },
  {
    name: 'discordbot_list_sku_subscriptions',
    description: `Retrieve all subscriptions containing a given SKU, filtered by user. Returns a list of subscription objects representing recurring payments for that SKU. With Bot Token auth, user_id is required since the bot has no implicit 'current user' context. Supports cursor-based pagination via before/after and limit.`,
    params: [
      {
        name: 'sku_id',
        type: 'string',
        required: true,
        description: `The ID of the SKU to list subscriptions for.`,
      },
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `The ID of the user to return subscriptions for. Required for Bot Token requests.`,
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
    ],
  },
  {
    name: 'discordbot_list_skus',
    description: `Retrieve all SKUs (stock-keeping units) for a given Discord application. SKUs represent premium offerings, such as subscriptions, that can be made available to the application's users or guilds. Returns an array of SKU objects.`,
    params: [
      {
        name: 'application_id',
        type: 'string',
        required: true,
        description: `The ID of the application to retrieve SKUs for.`,
      },
    ],
  },
  {
    name: 'discordbot_list_thread_members',
    description: `List all members of a thread. Returns an array of thread member objects. When with_member is true, results are paginated using after and limit.`,
    params: [
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `The ID of the thread channel.`,
      },
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Get thread members after this user ID (for pagination when with_member is true).`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of thread members to return (1-100, default 100).`,
      },
      {
        name: 'with_member',
        type: 'boolean',
        required: false,
        description: `Whether to include guild member objects for each thread member.`,
      },
    ],
  },
  {
    name: 'discordbot_list_threads',
    description: `Retrieve archived public threads in a Discord channel. Returns threads in descending order by archive timestamp. Requires READ_MESSAGE_HISTORY permission. Note: Discord has no single endpoint that lists every thread type at once — this tool calls the same public-archived-threads endpoint as discordbot_list_public_archived_threads. Use discordbot_list_active_guild_threads for active (non-archived) threads across a guild, or discordbot_list_private_archived_threads for archived private threads.`,
    params: [
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `The ID of the channel to retrieve archived threads from.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Returns threads archived before this ISO8601 timestamp.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of threads to return.`,
      },
    ],
  },
  {
    name: 'discordbot_list_voice_regions',
    description: `Retrieve a list of all available voice regions on Discord. Returns region IDs, names, and whether they are optimal or deprecated.`,
    params: [],
  },
  {
    name: 'discordbot_modify_application_emoji',
    description: `Modify the name of an emoji owned by a Discord application. Returns the updated emoji object.`,
    params: [
      {
        name: 'application_id',
        type: 'string',
        required: true,
        description: `The ID of the application that owns the emoji.`,
      },
      {
        name: 'emoji_id',
        type: 'string',
        required: true,
        description: `The ID of the emoji to modify.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `New name for the emoji (2-32 characters, alphanumeric and underscores).`,
      },
    ],
  },
  {
    name: 'discordbot_modify_auto_moderation_rule',
    description: `Modify an existing Auto Moderation rule for a guild. Requires the MANAGE_GUILD permission. All parameters are optional. Fires an Auto Moderation Rule Update Gateway event. Returns the updated auto moderation rule object on success.`,
    params: [
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild the rule belongs to.`,
      },
      {
        name: 'rule_id',
        type: 'string',
        required: true,
        description: `The ID of the Auto Moderation rule to modify.`,
      },
      {
        name: 'actions',
        type: 'array',
        required: false,
        description: `The actions which will execute when the rule is triggered. Each action is an object with a 'type' (1=BLOCK_MESSAGE, 2=SEND_ALERT_MESSAGE, 3=TIMEOUT, 4=BLOCK_MEMBER_INTERACTION) and optional 'metadata'.`,
      },
      {
        name: 'enabled',
        type: 'boolean',
        required: false,
        description: `Whether the rule is enabled.`,
      },
      {
        name: 'event_type',
        type: 'integer',
        required: false,
        description: `The rule event type: 1=MESSAGE_SEND (when a member sends or edits a message), 2=MEMBER_UPDATE (when a member edits their profile).`,
      },
      {
        name: 'exempt_channels',
        type: 'array',
        required: false,
        description: `Channel IDs that should not be affected by the rule (maximum of 50).`,
      },
      {
        name: 'exempt_roles',
        type: 'array',
        required: false,
        description: `Role IDs that should not be affected by the rule (maximum of 20).`,
      },
      { name: 'name', type: 'string', required: false, description: `The rule name.` },
      {
        name: 'reason',
        type: 'string',
        required: false,
        description: `Reason for modifying the rule, shown in the guild's audit log.`,
      },
      {
        name: 'trigger_metadata',
        type: 'object',
        required: false,
        description: `Additional data used to determine whether the rule triggers, relevant fields depend on the rule's trigger_type (e.g. keyword_filter, regex_patterns, presets, allow_list, mention_total_limit, mention_raid_protection_enabled).`,
      },
    ],
  },
  {
    name: 'discordbot_modify_channel',
    description: `Modify a channel's settings. Supports text, voice, announcement, stage, and forum channels. Returns the updated channel object. Each permission_overwrites entry may specify 'allow_names'/'deny_names' (arrays of named permission flags) instead of raw 'allow'/'deny' integers — the correct bitfield is computed automatically.`,
    params: [
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `The ID of the channel to modify.`,
      },
      {
        name: 'applied_tags',
        type: 'array',
        required: false,
        description: `IDs of tags (from the forum/media channel's available_tags) applied to this thread. Only valid when modifying a thread in a forum or media channel; maximum of 5 tags.`,
      },
      {
        name: 'archived',
        type: 'boolean',
        required: false,
        description: `Whether the thread is archived. Unarchiving with locked also false only requires the SEND_MESSAGES permission; otherwise requires MANAGE_THREADS.`,
      },
      {
        name: 'auto_archive_duration',
        type: 'integer',
        required: false,
        description: `Duration in minutes of inactivity after which this thread auto-archives: 60, 1440, 4320, or 10080.`,
      },
      {
        name: 'available_tags',
        type: 'array',
        required: false,
        description: `Array of tag objects available in a forum channel.`,
      },
      {
        name: 'bitrate',
        type: 'integer',
        required: false,
        description: `Bitrate in bits for voice channels (8000-96000, or up to 128000 for VIP servers).`,
      },
      {
        name: 'default_auto_archive_duration',
        type: 'integer',
        required: false,
        description: `Default duration (in minutes) for auto-archiving threads: 60, 1440, 4320, or 10080.`,
      },
      {
        name: 'default_forum_layout',
        type: 'integer',
        required: false,
        description: `Default layout for forum channels. 0=NOT_SET, 1=LIST_VIEW, 2=GALLERY_VIEW.`,
      },
      {
        name: 'default_reaction_emoji',
        type: 'object',
        required: false,
        description: `Default emoji for reactions in forum posts. Object with emoji_id or emoji_name.`,
      },
      {
        name: 'default_sort_order',
        type: 'integer',
        required: false,
        description: `Default sort order for forum posts. 0=LATEST_ACTIVITY, 1=CREATION_DATE.`,
      },
      {
        name: 'default_thread_rate_limit_per_user',
        type: 'integer',
        required: false,
        description: `Default slowmode rate limit (in seconds) for new threads in the channel.`,
      },
      {
        name: 'flags',
        type: 'integer',
        required: false,
        description: `Channel flags as a bitfield.`,
      },
      {
        name: 'invitable',
        type: 'boolean',
        required: false,
        description: `Whether non-moderators can add other non-moderators to a private thread. Only applies to private threads.`,
      },
      {
        name: 'locked',
        type: 'boolean',
        required: false,
        description: `Whether the thread is locked. When locked, only users with the MANAGE_THREADS permission can unarchive it.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New name for the channel (1-100 characters).`,
      },
      {
        name: 'nsfw',
        type: 'boolean',
        required: false,
        description: `Whether the channel is NSFW (not safe for work).`,
      },
      {
        name: 'parent_id',
        type: 'string',
        required: false,
        description: `ID of the new parent category for the channel.`,
      },
      {
        name: 'permission_overwrites',
        type: 'array',
        required: false,
        description: `Array of permission overwrite objects for the channel.`,
      },
      {
        name: 'position',
        type: 'integer',
        required: false,
        description: `Sorting position of the channel.`,
      },
      {
        name: 'rate_limit_per_user',
        type: 'integer',
        required: false,
        description: `Slowmode rate limit in seconds (0-21600). Users can send one message per this many seconds.`,
      },
      {
        name: 'rtc_region',
        type: 'string',
        required: false,
        description: `Voice region for voice/stage channels. null for automatic.`,
      },
      {
        name: 'topic',
        type: 'string',
        required: false,
        description: `Channel topic (0-4096 characters for forum/media channels, 0-1024 for others).`,
      },
      {
        name: 'type',
        type: 'integer',
        required: false,
        description: `Channel type. Can convert between text (0) and announcement (5) channels.`,
      },
      {
        name: 'user_limit',
        type: 'integer',
        required: false,
        description: `Maximum number of users in a voice channel (0 for unlimited, 1-99).`,
      },
      {
        name: 'video_quality_mode',
        type: 'integer',
        required: false,
        description: `Camera video quality mode for voice channels. 1=AUTO, 2=FULL.`,
      },
    ],
  },
  {
    name: 'discordbot_modify_current_member',
    description: `Modify the current user's guild member attributes. Returns the updated guild member object.`,
    params: [
      { name: 'guild_id', type: 'string', required: true, description: `The ID of the guild.` },
      {
        name: 'avatar',
        type: 'string',
        required: false,
        description: `Avatar image to set for the current user in the guild, as a base64 data URI (null to reset).`,
      },
      {
        name: 'banner',
        type: 'string',
        required: false,
        description: `Banner image to set for the current user in the guild, as a base64 data URI (null to reset).`,
      },
      {
        name: 'bio',
        type: 'string',
        required: false,
        description: `Bio to set for the current user in the guild (null to reset).`,
      },
      {
        name: 'nick',
        type: 'string',
        required: false,
        description: `Nickname to set for the current user in the guild (null to reset).`,
      },
    ],
  },
  {
    name: 'discordbot_modify_current_user',
    description: `Modify the bot's own username, avatar, or banner. Returns the updated user object.`,
    params: [
      {
        name: 'avatar',
        type: 'string',
        required: false,
        description: `Base64 encoded image data URI for the user's avatar (or null to remove).`,
      },
      {
        name: 'banner',
        type: 'string',
        required: false,
        description: `Base64 encoded image data URI for the user's banner (or null to remove).`,
      },
      {
        name: 'username',
        type: 'string',
        required: false,
        description: `New username for the account (changing username may require a discriminator change).`,
      },
    ],
  },
  {
    name: 'discordbot_modify_current_user_nick',
    description: `Deprecated in favor of Modify Current Member. Modifies the nickname of the current user in a guild. Requires CHANGE_NICKNAME permission. Returns a 200 with the nickname on success.`,
    params: [
      { name: 'guild_id', type: 'string', required: true, description: `The ID of the guild.` },
      {
        name: 'nick',
        type: 'string',
        required: false,
        description: `Value to set the current user's nickname to (null to reset).`,
      },
      {
        name: 'reason',
        type: 'string',
        required: false,
        description: `Reason for changing the nickname, shown in the guild's audit log.`,
      },
    ],
  },
  {
    name: 'discordbot_modify_current_user_voice_state',
    description: `Update the current user's (the bot's) voice state in a stage channel. Returns 204 No Content on success. channel_id must currently point to a stage channel the bot has already joined. MUTE_MEMBERS permission is required to unsuppress; REQUEST_TO_SPEAK permission is required to request to speak, but the bot can always suppress itself or clear its own speak request.`,
    params: [
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild to modify the current user's voice state in.`,
      },
      {
        name: 'channel_id',
        type: 'string',
        required: false,
        description: `The ID of the stage channel the current user is currently in. Must currently point to a stage channel already joined.`,
      },
      {
        name: 'request_to_speak_timestamp',
        type: 'string',
        required: false,
        description: `ISO8601 timestamp for when the current user requested to speak (any present or future time). Requires the REQUEST_TO_SPEAK permission; the bot can always clear its own request.`,
      },
      {
        name: 'suppress',
        type: 'boolean',
        required: false,
        description: `Toggles the current user's suppress state. Requires the MUTE_MEMBERS permission to unsuppress; the bot can always suppress itself.`,
      },
    ],
  },
  {
    name: 'discordbot_modify_guild',
    description: `Modify a guild's settings. Requires MANAGE_GUILD permission. Returns the updated guild object.`,
    params: [
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild to modify.`,
      },
      {
        name: 'afk_channel_id',
        type: 'string',
        required: false,
        description: `ID of the AFK channel (null to remove).`,
      },
      {
        name: 'afk_timeout',
        type: 'integer',
        required: false,
        description: `AFK timeout in seconds (60, 300, 900, 1800, 3600).`,
      },
      {
        name: 'banner',
        type: 'string',
        required: false,
        description: `Base64 encoded guild banner image (requires BANNER feature).`,
      },
      {
        name: 'default_message_notifications',
        type: 'integer',
        required: false,
        description: `Default message notification level: 0=ALL_MESSAGES, 1=ONLY_MENTIONS.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Guild description (for discoverable guilds).`,
      },
      {
        name: 'discovery_splash',
        type: 'string',
        required: false,
        description: `Base64 encoded discovery splash image (requires DISCOVERABLE feature).`,
      },
      {
        name: 'explicit_content_filter',
        type: 'integer',
        required: false,
        description: `Explicit content filter level: 0=DISABLED, 1=MEMBERS_WITHOUT_ROLES, 2=ALL_MEMBERS.`,
      },
      {
        name: 'features',
        type: 'array',
        required: false,
        description: `Array of guild features to enable/disable.`,
      },
      {
        name: 'icon',
        type: 'string',
        required: false,
        description: `Base64 encoded guild icon image.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New name for the guild (2-100 characters).`,
      },
      {
        name: 'preferred_locale',
        type: 'string',
        required: false,
        description: `Preferred locale for the guild (e.g., en-US, de).`,
      },
      {
        name: 'premium_progress_bar_enabled',
        type: 'boolean',
        required: false,
        description: `Whether the guild has the premium progress bar enabled.`,
      },
      {
        name: 'public_updates_channel_id',
        type: 'string',
        required: false,
        description: `ID of the channel where admins and moderators receive Discord updates.`,
      },
      {
        name: 'region',
        type: 'string',
        required: false,
        description: `Voice region ID (deprecated).`,
      },
      {
        name: 'rules_channel_id',
        type: 'string',
        required: false,
        description: `ID of the channel for community guilds' rules.`,
      },
      {
        name: 'safety_alerts_channel_id',
        type: 'string',
        required: false,
        description: `ID of the channel where Discord sends safety alerts.`,
      },
      {
        name: 'splash',
        type: 'string',
        required: false,
        description: `Base64 encoded guild splash image (requires INVITE_SPLASH feature).`,
      },
      {
        name: 'system_channel_flags',
        type: 'integer',
        required: false,
        description: `System channel flags bitfield.`,
      },
      {
        name: 'system_channel_id',
        type: 'string',
        required: false,
        description: `ID of the channel for system messages.`,
      },
      {
        name: 'verification_level',
        type: 'integer',
        required: false,
        description: `Verification level: 0=NONE, 1=LOW, 2=MEDIUM, 3=HIGH, 4=VERY_HIGH.`,
      },
    ],
  },
  {
    name: 'discordbot_modify_guild_channel_positions',
    description: `Modify the positions of channels in a guild. Requires MANAGE_CHANNELS permission. Only channels to be modified need to be included. Returns 204 No Content on success.`,
    params: [
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild to modify channel positions in.`,
      },
      {
        name: 'positions',
        type: 'array',
        required: true,
        description: `Array of objects with channel id (required) and optional position, lock_permissions (boolean), and parent_id (string).`,
      },
    ],
  },
  {
    name: 'discordbot_modify_guild_emoji',
    description: `Modify a guild emoji. Requires MANAGE_GUILD_EXPRESSIONS permission. Returns the updated emoji object.`,
    params: [
      {
        name: 'emoji_id',
        type: 'string',
        required: true,
        description: `The ID of the emoji to modify.`,
      },
      { name: 'guild_id', type: 'string', required: true, description: `The ID of the guild.` },
      { name: 'name', type: 'string', required: false, description: `New name for the emoji.` },
      {
        name: 'roles',
        type: 'array',
        required: false,
        description: `Array of role IDs allowed to use the emoji (null to allow everyone).`,
      },
    ],
  },
  {
    name: 'discordbot_modify_guild_incident_actions',
    description: `Modify the incident actions of a guild, used to temporarily disable invites or direct messages during a raid or spam incident. Requires MANAGE_GUILD permission. Both fields can be enabled for a maximum of 24 hours in the future; supplying null disables the action. Returns the updated incidents data object.`,
    params: [
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild to modify incident actions for.`,
      },
      {
        name: 'dms_disabled_until',
        type: 'string',
        required: false,
        description: `ISO8601 timestamp until which direct messages will be disabled for the guild (max 24 hours in the future). Null disables the action.`,
      },
      {
        name: 'invites_disabled_until',
        type: 'string',
        required: false,
        description: `ISO8601 timestamp until which invites will be disabled for the guild (max 24 hours in the future). Null disables the action.`,
      },
    ],
  },
  {
    name: 'discordbot_modify_guild_member',
    description: `Modify attributes of a guild member. Returns the updated guild member object.`,
    params: [
      { name: 'guild_id', type: 'string', required: true, description: `The ID of the guild.` },
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `The ID of the guild member to modify.`,
      },
      {
        name: 'channel_id',
        type: 'string',
        required: false,
        description: `Move member to a different voice channel (null to disconnect).`,
      },
      {
        name: 'communication_disabled_until',
        type: 'string',
        required: false,
        description: `ISO8601 timestamp until which the member is timed out (null to remove timeout).`,
      },
      {
        name: 'deaf',
        type: 'boolean',
        required: false,
        description: `Whether the member should be server-deafened.`,
      },
      {
        name: 'flags',
        type: 'integer',
        required: false,
        description: `Guild member flags as a bitfield.`,
      },
      {
        name: 'mute',
        type: 'boolean',
        required: false,
        description: `Whether the member should be server-muted.`,
      },
      {
        name: 'nick',
        type: 'string',
        required: false,
        description: `Nickname to set for the member (null to reset).`,
      },
      {
        name: 'roles',
        type: 'array',
        required: false,
        description: `Array of role IDs to assign to the member.`,
      },
    ],
  },
  {
    name: 'discordbot_modify_guild_onboarding',
    description: `Modify the onboarding configuration of a guild. Requires MANAGE_GUILD and MANAGE_ROLES permissions. Onboarding enforces constraints when enabled: at least 7 default channels, at least 5 of which allow sending messages to @everyone. Returns the updated guild onboarding object.`,
    params: [
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild to modify onboarding for.`,
      },
      {
        name: 'default_channel_ids',
        type: 'array',
        required: false,
        description: `Channel IDs that members get opted into automatically.`,
      },
      {
        name: 'enabled',
        type: 'boolean',
        required: false,
        description: `Whether onboarding is enabled in the guild.`,
      },
      {
        name: 'mode',
        type: 'integer',
        required: false,
        description: `The onboarding mode: 0 for ONBOARDING_DEFAULT (counts only default channels), 1 for ONBOARDING_ADVANCED (counts default channels and questions).`,
      },
      {
        name: 'prompts',
        type: 'array',
        required: false,
        description: `Prompts shown during onboarding and in customize community. Each prompt object has id, type, options, title, single_select, required, and in_onboarding fields.`,
      },
      {
        name: 'reason',
        type: 'string',
        required: false,
        description: `Reason for modifying onboarding, shown in the guild's audit log.`,
      },
    ],
  },
  {
    name: 'discordbot_modify_guild_role',
    description: `Modify a guild role's settings. Requires MANAGE_ROLES permission. Returns the updated role object. Full permission flag reference (name=decimal value, OR multiple together): CREATE_INSTANT_INVITE=1, KICK_MEMBERS=2, BAN_MEMBERS=4, ADMINISTRATOR=8, MANAGE_CHANNELS=16, MANAGE_GUILD=32, ADD_REACTIONS=64, VIEW_AUDIT_LOG=128, PRIORITY_SPEAKER=256, STREAM=512, VIEW_CHANNEL=1024, SEND_MESSAGES=2048, SEND_TTS_MESSAGES=4096, MANAGE_MESSAGES=8192, EMBED_LINKS=16384, ATTACH_FILES=32768, READ_MESSAGE_HISTORY=65536, MENTION_EVERYONE=131072, USE_EXTERNAL_EMOJIS=262144, VIEW_GUILD_INSIGHTS=524288, CONNECT=1048576, SPEAK=2097152, MUTE_MEMBERS=4194304, DEAFEN_MEMBERS=8388608, MOVE_MEMBERS=16777216, USE_VAD=33554432, CHANGE_NICKNAME=67108864, MANAGE_NICKNAMES=134217728, MANAGE_ROLES=268435456, MANAGE_WEBHOOKS=536870912, MANAGE_GUILD_EXPRESSIONS=1073741824, USE_APPLICATION_COMMANDS=2147483648, REQUEST_TO_SPEAK=4294967296, MANAGE_EVENTS=8589934592, MANAGE_THREADS=17179869184, CREATE_PUBLIC_THREADS=34359738368, CREATE_PRIVATE_THREADS=68719476736, USE_EXTERNAL_STICKERS=137438953472, SEND_MESSAGES_IN_THREADS=274877906944, USE_EMBEDDED_ACTIVITIES=549755813888, MODERATE_MEMBERS=1099511627776, VIEW_CREATOR_MONETIZATION_ANALYTICS=2199023255552, USE_SOUNDBOARD=4398046511104, CREATE_GUILD_EXPRESSIONS=8796093022208, CREATE_EVENTS=17592186044416, USE_EXTERNAL_SOUNDS=35184372088832, SEND_VOICE_MESSAGES=70368744177664, SET_VOICE_CHANNEL_STATUS=281474976710656, SEND_POLLS=562949953421312, USE_EXTERNAL_APPS=1125899906842624, PIN_MESSAGES=2251799813685248, BYPASS_SLOWMODE=4503599627370496. Or use a calculator like discordapi.com/permissions.htm. Optionally provide 'permissions_names' (array of named permission flags, e.g. ["SEND_MESSAGES"]) instead of a raw 'permissions' integer — the correct bitfield is computed automatically.`,
    params: [
      { name: 'guild_id', type: 'string', required: true, description: `The ID of the guild.` },
      {
        name: 'role_id',
        type: 'string',
        required: true,
        description: `The ID of the role to modify.`,
      },
      {
        name: 'color',
        type: 'integer',
        required: false,
        description: `Deprecated. RGB color value of the role as an integer. Still returned by the API, but using 'colors' is recommended when making requests.`,
      },
      {
        name: 'colors',
        type: 'object',
        required: false,
        description: `The role's colors object (recommended replacement for the deprecated 'color' field). Contains primary_color, and optionally secondary_color and tertiary_color for gradient/holographic roles.`,
      },
      {
        name: 'hoist',
        type: 'boolean',
        required: false,
        description: `Whether the role should be displayed separately in the member list.`,
      },
      {
        name: 'icon',
        type: 'string',
        required: false,
        description: `Base64 encoded role icon image (requires ROLE_ICONS guild feature).`,
      },
      {
        name: 'mentionable',
        type: 'boolean',
        required: false,
        description: `Whether the role should be mentionable by everyone.`,
      },
      { name: 'name', type: 'string', required: false, description: `New name for the role.` },
      {
        name: 'permissions',
        type: 'string',
        required: false,
        description: `Bitwise permission value for the role as a string.`,
      },
      {
        name: 'permissions_names',
        type: 'array',
        required: false,
        description: `Named permission flags to OR together, as a more reliable alternative to specifying 'permissions' as a raw bitwise integer string — no manual bit math required. If both 'permissions_names' and 'permissions' are given, 'permissions_names' takes precedence.`,
      },
      {
        name: 'unicode_emoji',
        type: 'string',
        required: false,
        description: `Role's unicode emoji (requires ROLE_ICONS guild feature).`,
      },
    ],
  },
  {
    name: 'discordbot_modify_guild_role_positions',
    description: `Modify the positions of roles in a guild. Requires MANAGE_ROLES permission. Returns a list of all guild role objects.`,
    params: [
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild to modify role positions in.`,
      },
      {
        name: 'positions',
        type: 'array',
        required: true,
        description: `Array of objects with role id (required) and optional position (integer).`,
      },
    ],
  },
  {
    name: 'discordbot_modify_guild_scheduled_event',
    description: `Modify a guild scheduled event. Requires MANAGE_EVENTS permission. To start or end an event, modify the status field. Returns the modified scheduled event object.`,
    params: [
      { name: 'guild_id', type: 'string', required: true, description: `The ID of the guild.` },
      {
        name: 'guild_scheduled_event_id',
        type: 'string',
        required: true,
        description: `The ID of the scheduled event to modify.`,
      },
      {
        name: 'channel_id',
        type: 'string',
        required: false,
        description: `Channel ID of the event (required for STAGE_INSTANCE and VOICE entity types).`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description of the event (up to 1000 characters).`,
      },
      {
        name: 'entity_metadata',
        type: 'object',
        required: false,
        description: `Entity metadata for the event. For EXTERNAL type, include location string.`,
      },
      {
        name: 'entity_type',
        type: 'integer',
        required: false,
        description: `Entity type: 1=STAGE_INSTANCE, 2=VOICE, 3=EXTERNAL.`,
      },
      {
        name: 'image',
        type: 'string',
        required: false,
        description: `Base64 encoded cover image for the event.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Name of the scheduled event (1-100 characters).`,
      },
      {
        name: 'privacy_level',
        type: 'integer',
        required: false,
        description: `Privacy level: 2=GUILD_ONLY.`,
      },
      {
        name: 'recurrence_rule',
        type: 'object',
        required: false,
        description: `Recurrence rule object for repeating events. Set to null to clear an existing recurrence rule.`,
      },
      {
        name: 'scheduled_end_time',
        type: 'string',
        required: false,
        description: `ISO8601 timestamp for when the event ends.`,
      },
      {
        name: 'scheduled_start_time',
        type: 'string',
        required: false,
        description: `ISO8601 timestamp for when the event starts.`,
      },
      {
        name: 'status',
        type: 'integer',
        required: false,
        description: `Event status: 1=SCHEDULED, 2=ACTIVE, 3=COMPLETED, 4=CANCELED.`,
      },
    ],
  },
  {
    name: 'discordbot_modify_guild_soundboard_sound',
    description: `Modify the given guild soundboard sound. For sounds created by the current user, requires either the CREATE_GUILD_EXPRESSIONS or MANAGE_GUILD_EXPRESSIONS permission. For other sounds, requires the MANAGE_GUILD_EXPRESSIONS permission. All parameters are optional. Fires a Guild Soundboard Sound Update Gateway event. Returns the updated soundboard sound object on success.`,
    params: [
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild the soundboard sound belongs to.`,
      },
      {
        name: 'sound_id',
        type: 'string',
        required: true,
        description: `The ID of the soundboard sound to modify.`,
      },
      {
        name: 'emoji_id',
        type: 'string',
        required: false,
        description: `The ID of the custom emoji for the soundboard sound.`,
      },
      {
        name: 'emoji_name',
        type: 'string',
        required: false,
        description: `The unicode character of a standard emoji for the soundboard sound.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New name for the soundboard sound (2-32 characters).`,
      },
      {
        name: 'reason',
        type: 'string',
        required: false,
        description: `Reason for modifying the sound, shown in the guild's audit log.`,
      },
      {
        name: 'volume',
        type: 'number',
        required: false,
        description: `The volume of the soundboard sound, from 0 to 1.`,
      },
    ],
  },
  {
    name: 'discordbot_modify_guild_sticker',
    description: `Modify a guild sticker's details. Requires MANAGE_GUILD_EXPRESSIONS permission. Returns the updated sticker object.`,
    params: [
      { name: 'guild_id', type: 'string', required: true, description: `The ID of the guild.` },
      {
        name: 'sticker_id',
        type: 'string',
        required: true,
        description: `The ID of the sticker to modify.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New description for the sticker (2-100 characters).`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New name for the sticker (2-30 characters).`,
      },
      {
        name: 'tags',
        type: 'string',
        required: false,
        description: `New autocomplete tags for the sticker (max 200 characters).`,
      },
    ],
  },
  {
    name: 'discordbot_modify_guild_template',
    description: `Modify a guild template's metadata. Requires the MANAGE_GUILD permission. Returns the guild template object on success.`,
    params: [
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild the template belongs to.`,
      },
      {
        name: 'template_code',
        type: 'string',
        required: true,
        description: `The template code to modify.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New description for the template (0-120 characters).`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New name for the template (1-100 characters).`,
      },
    ],
  },
  {
    name: 'discordbot_modify_guild_welcome_screen',
    description: `Modify the welcome screen of a Community guild. Requires MANAGE_GUILD permission. Returns the updated welcome screen object.`,
    params: [
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild to modify the welcome screen for.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `The server description shown in the welcome screen.`,
      },
      {
        name: 'enabled',
        type: 'boolean',
        required: false,
        description: `Whether the welcome screen is enabled.`,
      },
      {
        name: 'welcome_channels',
        type: 'array',
        required: false,
        description: `Array of welcome channel objects with channel_id, description, and optional emoji_id/emoji_name.`,
      },
    ],
  },
  {
    name: 'discordbot_modify_guild_widget',
    description: `Modify the widget settings for a guild. Requires MANAGE_GUILD permission. Returns the updated guild widget settings object.`,
    params: [
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild to modify the widget for.`,
      },
      {
        name: 'channel_id',
        type: 'string',
        required: false,
        description: `The channel ID to generate an invite for the widget. Set to null to disable.`,
      },
      {
        name: 'enabled',
        type: 'boolean',
        required: false,
        description: `Whether the widget is enabled.`,
      },
    ],
  },
  {
    name: 'discordbot_modify_lobby',
    description: `Modify a Discord lobby with new values, if provided. When members is provided, it replaces the full member list — any current member not included is removed from the lobby. Returns the updated lobby object.`,
    params: [
      {
        name: 'lobby_id',
        type: 'string',
        required: true,
        description: `The ID of the lobby to modify.`,
      },
      {
        name: 'idle_timeout_seconds',
        type: 'integer',
        required: false,
        description: `Seconds to wait before shutting down the lobby after it becomes idle. Between 5 and 604800 (7 days).`,
      },
      {
        name: 'members',
        type: 'array',
        required: false,
        description: `Optional array of up to 25 lobby member objects to replace the lobby members with. Members not included in this list are removed from the lobby.`,
      },
      {
        name: 'metadata',
        type: 'object',
        required: false,
        description: `Optional dictionary of string key/value pairs. Max total length 1000. Overwrites any existing metadata.`,
      },
    ],
  },
  {
    name: 'discordbot_modify_stage_instance',
    description: `Update fields of an existing Stage instance. Requires the user to be a moderator of the Stage channel (MANAGE_CHANNELS, MUTE_MEMBERS, and MOVE_MEMBERS permissions). Fires a Stage Instance Update Gateway event. Returns the updated Stage instance object.`,
    params: [
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `The ID of the Stage channel whose Stage instance should be updated.`,
      },
      {
        name: 'privacy_level',
        type: 'integer',
        required: false,
        description: `The privacy level of the Stage instance: 1=PUBLIC (deprecated), 2=GUILD_ONLY.`,
      },
      {
        name: 'reason',
        type: 'string',
        required: false,
        description: `Reason for updating the Stage instance, shown in the guild's audit log.`,
      },
      {
        name: 'topic',
        type: 'string',
        required: false,
        description: `The new topic of the Stage instance (1-120 characters).`,
      },
    ],
  },
  {
    name: 'discordbot_modify_user_voice_state',
    description: `Update another user's voice state in a stage channel. Returns 204 No Content on success. channel_id must currently point to a stage channel the user has already joined. Requires the MUTE_MEMBERS permission. When unsuppressed, non-bot users have their request_to_speak_timestamp set to the current time; bot users do not. When suppressed, the user's request_to_speak_timestamp is removed.`,
    params: [
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild to modify the user's voice state in.`,
      },
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `The ID of the user whose voice state to modify.`,
      },
      {
        name: 'channel_id',
        type: 'string',
        required: false,
        description: `The ID of the stage channel the user is currently in. Must currently point to a stage channel already joined.`,
      },
      {
        name: 'suppress',
        type: 'boolean',
        required: false,
        description: `Toggles the user's suppress state. Requires the MUTE_MEMBERS permission.`,
      },
    ],
  },
  {
    name: 'discordbot_modify_webhook',
    description: `Modify a webhook. Requires MANAGE_WEBHOOKS permission. Returns the updated webhook object.`,
    params: [
      {
        name: 'webhook_id',
        type: 'string',
        required: true,
        description: `The ID of the webhook to modify.`,
      },
      {
        name: 'avatar',
        type: 'string',
        required: false,
        description: `Base64 encoded avatar image for the webhook.`,
      },
      {
        name: 'channel_id',
        type: 'string',
        required: false,
        description: `ID of the channel to move the webhook to.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New default name for the webhook.`,
      },
    ],
  },
  {
    name: 'discordbot_modify_webhook_with_token',
    description: `Modify a webhook using its token instead of OAuth authentication. Does not support channel_id field. Returns the updated webhook object (without token).`,
    params: [
      {
        name: 'webhook_id',
        type: 'string',
        required: true,
        description: `The ID of the webhook to modify.`,
      },
      {
        name: 'webhook_token',
        type: 'string',
        required: true,
        description: `The token of the webhook.`,
      },
      {
        name: 'avatar',
        type: 'string',
        required: false,
        description: `Base64 encoded avatar image for the webhook.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New default name for the webhook.`,
      },
    ],
  },
  {
    name: 'discordbot_pin_message',
    description: `Pin a message in a Discord channel using Discord's current pins endpoint (introduced June 2025, replacing the deprecated /channels/{channel.id}/pins/{message.id}). Requires PIN_MESSAGES permission. A channel can have up to 50 pinned messages.`,
    params: [
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `The ID of the channel containing the message to pin.`,
      },
      {
        name: 'message_id',
        type: 'string',
        required: true,
        description: `The ID of the message to pin.`,
      },
    ],
  },
  {
    name: 'discordbot_remove_guild_ban',
    description: `Remove a ban for a user in a Discord guild, allowing them to rejoin. Requires BAN_MEMBERS permission.`,
    params: [
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild to remove the ban from.`,
      },
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `The ID of the user to unban.`,
      },
    ],
  },
  {
    name: 'discordbot_remove_guild_member_role',
    description: `Remove a role from a guild member. Requires MANAGE_ROLES permission. Returns 204 No Content on success.`,
    params: [
      { name: 'guild_id', type: 'string', required: true, description: `The ID of the guild.` },
      {
        name: 'role_id',
        type: 'string',
        required: true,
        description: `The ID of the role to remove from the member.`,
      },
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `The ID of the guild member to remove the role from.`,
      },
    ],
  },
  {
    name: 'discordbot_remove_lobby_member',
    description: `Remove the specified user from a Discord lobby. Safe to call even if the user is no longer a member of the lobby, but fails if the lobby does not exist. Returns nothing.`,
    params: [
      {
        name: 'lobby_id',
        type: 'string',
        required: true,
        description: `The ID of the lobby to remove the member from.`,
      },
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `The ID of the user to remove from the lobby.`,
      },
    ],
  },
  {
    name: 'discordbot_remove_thread_member',
    description: `Remove a user from a thread. Requires MANAGE_THREADS permission or that the current user is the creator of the thread. Returns 204 No Content on success.`,
    params: [
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `The ID of the thread channel.`,
      },
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `The ID of the user to remove from the thread.`,
      },
    ],
  },
  {
    name: 'discordbot_search_guild_members',
    description: `Search for guild members in a Discord guild whose username or nickname starts with the given query string.`,
    params: [
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild to search members in.`,
      },
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Query string to match against usernames and nicknames. Returns members whose username or nickname starts with this string.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of members to return (1-1000). Default is 1.`,
      },
    ],
  },
  {
    name: 'discordbot_search_guild_messages',
    description: `Search for messages matching a query across a Discord guild. Returns matching messages without the reactions key. Requires the READ_MESSAGE_HISTORY permission and access is restricted according to whether the MESSAGE_CONTENT privileged intent is enabled for the application. If the searched entity is not yet indexed, Discord returns a 202 response instead of results.`,
    params: [
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild to search messages in.`,
      },
      {
        name: 'attachment_extension',
        type: 'array',
        required: false,
        description: `Filter messages by attachment extension, e.g. txt (max 256 characters per entry, max 100 entries).`,
      },
      {
        name: 'attachment_filename',
        type: 'array',
        required: false,
        description: `Filter messages by attachment filename (max 1024 characters per entry, max 100 entries).`,
      },
      {
        name: 'author_id',
        type: 'array',
        required: false,
        description: `Filter messages by these author user IDs (max 100).`,
      },
      {
        name: 'author_type',
        type: 'array',
        required: false,
        description: `Filter messages by author type. Prefix a value with - to negate it, e.g. -bot.`,
      },
      {
        name: 'channel_id',
        type: 'array',
        required: false,
        description: `Filter messages by these channel IDs (max 500).`,
      },
      {
        name: 'content',
        type: 'string',
        required: false,
        description: `Filter messages by content (max 1024 characters).`,
      },
      {
        name: 'embed_provider',
        type: 'array',
        required: false,
        description: `Filter messages by embed provider name, case-sensitive, e.g. Tenor (max 256 characters per entry, max 100 entries).`,
      },
      {
        name: 'embed_type',
        type: 'array',
        required: false,
        description: `Filter messages by embed type (max 5 entries).`,
      },
      {
        name: 'has',
        type: 'array',
        required: false,
        description: `Filter messages by whether they have specific things. Prefix a value with - to negate it, e.g. -embed.`,
      },
      {
        name: 'include_nsfw',
        type: 'boolean',
        required: false,
        description: `Whether to include results from age-restricted channels. Defaults to false.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Max number of messages to return (1-25). Default is 25.`,
      },
      {
        name: 'link_hostname',
        type: 'array',
        required: false,
        description: `Filter messages by link hostname, e.g. discordapp.com (max 256 characters per entry, max 100 entries).`,
      },
      {
        name: 'max_id',
        type: 'string',
        required: false,
        description: `Get messages before this message ID.`,
      },
      {
        name: 'mention_everyone',
        type: 'boolean',
        required: false,
        description: `Filter messages by whether they do or do not mention @everyone.`,
      },
      {
        name: 'mentions',
        type: 'array',
        required: false,
        description: `Filter messages that mention these user IDs (max 100).`,
      },
      {
        name: 'mentions_role_id',
        type: 'array',
        required: false,
        description: `Filter messages that mention these role IDs (max 100).`,
      },
      {
        name: 'min_id',
        type: 'string',
        required: false,
        description: `Get messages after this message ID.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number to offset the returned messages by (max 9975).`,
      },
      {
        name: 'pinned',
        type: 'boolean',
        required: false,
        description: `Filter messages by whether they are or are not pinned.`,
      },
      {
        name: 'replied_to_message_id',
        type: 'array',
        required: false,
        description: `Filter messages that reply to these message IDs (max 100).`,
      },
      {
        name: 'replied_to_user_id',
        type: 'array',
        required: false,
        description: `Filter messages that reply to these user IDs (max 100).`,
      },
      {
        name: 'slop',
        type: 'integer',
        required: false,
        description: `Max number of words to skip between matching tokens in the search content (max 100, default 2).`,
      },
      {
        name: 'sort_by',
        type: 'string',
        required: false,
        description: `The sorting algorithm to use: timestamp (default) or relevance. Sort order is not respected when sorting by relevance.`,
      },
      {
        name: 'sort_order',
        type: 'string',
        required: false,
        description: `The direction to sort: asc or desc. Defaults to desc.`,
      },
    ],
  },
  {
    name: 'discordbot_send_lobby_message',
    description: `Send a message to a Discord lobby. The calling user must be a member of the lobby. If the lobby has a linked channel, the message is also forwarded there; if forwarding fails (for example due to AutoMod), the lobby message is still delivered to other lobby members. Returns the created lobby message object.`,
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
    name: 'discordbot_send_soundboard_sound',
    description: `Send a soundboard sound to a voice channel the user is connected to. Requires the SPEAK and USE_SOUNDBOARD permissions, and also USE_EXTERNAL_SOUNDS if the sound is from a different guild. The user must be connected to the voice channel with a voice state that has deaf, self_deaf, mute, and suppress all disabled. Fires a Voice Channel Effect Send Gateway event. Returns 204 No Content on success.`,
    params: [
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `The ID of the voice channel to send the soundboard sound to.`,
      },
      {
        name: 'sound_id',
        type: 'string',
        required: true,
        description: `The ID of the soundboard sound to play.`,
      },
      {
        name: 'source_guild_id',
        type: 'string',
        required: false,
        description: `The ID of the guild the soundboard sound is from. Required to play sounds from a different guild than the voice channel's guild.`,
      },
    ],
  },
  {
    name: 'discordbot_set_voice_channel_status',
    description: `Set a voice channel's status. Requires the SET_VOICE_CHANNEL_STATUS permission, and additionally the MANAGE_CHANNELS permission if the current user is not connected to the voice channel. Returns 204 No Content on success. Fires a Voice Channel Status Update Gateway event.`,
    params: [
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `The ID of the voice channel to set the status for.`,
      },
      {
        name: 'status',
        type: 'string',
        required: true,
        description: `The new voice channel status, up to 500 characters. Pass null to clear the current status.`,
      },
    ],
  },
  {
    name: 'discordbot_start_thread_from_message',
    description: `Create a new thread from an existing message in a channel. The thread is a public thread by default. Requires CREATE_PUBLIC_THREADS permission. Returns the new thread channel object.`,
    params: [
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `The ID of the channel containing the message.`,
      },
      {
        name: 'message_id',
        type: 'string',
        required: true,
        description: `The ID of the message to create the thread from.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The name of the thread (1-100 characters).`,
      },
      {
        name: 'auto_archive_duration',
        type: 'integer',
        required: false,
        description: `Duration in minutes to auto-archive the thread: 60, 1440, 4320, or 10080.`,
      },
      {
        name: 'rate_limit_per_user',
        type: 'integer',
        required: false,
        description: `Slowmode rate limit in seconds for thread members (0-21600).`,
      },
    ],
  },
  {
    name: 'discordbot_start_thread_in_forum_channel',
    description: `Create a new post (thread) in a forum or media channel, along with its first message. At least one of content, embeds, or sticker_ids must be provided for the message. The current user must have the SEND_MESSAGES permission. Returns the new thread channel object with a nested message object.`,
    params: [
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `The ID of the forum or media channel to post in.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The name of the post/thread (1-100 characters).`,
      },
      {
        name: 'allowed_mentions',
        type: 'object',
        required: false,
        description: `Controls which mentions are allowed in the first message. Example: {"parse": ["users", "roles"]}`,
      },
      {
        name: 'applied_tags',
        type: 'array',
        required: false,
        description: `IDs of the available_tags to apply to this post (forum/media channel tags).`,
      },
      {
        name: 'auto_archive_duration',
        type: 'integer',
        required: false,
        description: `Duration in minutes to auto-archive the thread: 60, 1440, 4320, or 10080.`,
      },
      {
        name: 'content',
        type: 'string',
        required: false,
        description: `The text content of the first message (up to 2000 characters).`,
      },
      {
        name: 'embeds',
        type: 'array',
        required: false,
        description: `Array of embed objects to attach to the first message (up to 10 embeds).`,
      },
      {
        name: 'rate_limit_per_user',
        type: 'integer',
        required: false,
        description: `Slowmode rate limit in seconds for the thread (0-21600).`,
      },
      {
        name: 'sticker_ids',
        type: 'array',
        required: false,
        description: `Array of sticker IDs to attach to the first message (up to 3 stickers).`,
      },
    ],
  },
  {
    name: 'discordbot_start_thread_without_message',
    description: `Create a new thread that is not attached to an existing message. Type 10=ANNOUNCEMENT_THREAD (in announcement channel), 11=PUBLIC_THREAD, 12=PRIVATE_THREAD. Returns the new thread channel object.`,
    params: [
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `The ID of the channel to create the thread in.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The name of the thread (1-100 characters).`,
      },
      {
        name: 'type',
        type: 'integer',
        required: true,
        description: `The type of thread. 10=ANNOUNCEMENT_THREAD, 11=PUBLIC_THREAD, 12=PRIVATE_THREAD.`,
      },
      {
        name: 'auto_archive_duration',
        type: 'integer',
        required: false,
        description: `Duration in minutes to auto-archive the thread: 60, 1440, 4320, or 10080.`,
      },
      {
        name: 'invitable',
        type: 'boolean',
        required: false,
        description: `Whether non-moderators can add other users to the private thread.`,
      },
      {
        name: 'rate_limit_per_user',
        type: 'integer',
        required: false,
        description: `Slowmode rate limit in seconds for thread members (0-21600).`,
      },
    ],
  },
  {
    name: 'discordbot_sync_guild_template',
    description: `Sync a template to the guild's current state. Requires the MANAGE_GUILD permission. Returns the guild template object on success.`,
    params: [
      {
        name: 'guild_id',
        type: 'string',
        required: true,
        description: `The ID of the guild the template belongs to.`,
      },
      {
        name: 'template_code',
        type: 'string',
        required: true,
        description: `The template code to sync.`,
      },
    ],
  },
  {
    name: 'discordbot_trigger_typing',
    description: `Post a typing indicator to a Discord channel. The typing indicator lasts for 10 seconds or until a message is sent. Useful for indicating that a bot is processing a request.`,
    params: [
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `The ID of the channel to show the typing indicator in.`,
      },
    ],
  },
  {
    name: 'discordbot_unpin_message',
    description: `Unpin a previously pinned message from a Discord channel using Discord's current pins endpoint (introduced June 2025, replacing the deprecated /channels/{channel.id}/pins/{message.id}). Requires PIN_MESSAGES permission.`,
    params: [
      {
        name: 'channel_id',
        type: 'string',
        required: true,
        description: `The ID of the channel containing the pinned message.`,
      },
      {
        name: 'message_id',
        type: 'string',
        required: true,
        description: `The ID of the message to unpin.`,
      },
    ],
  },
  {
    name: 'discordbot_update_application_role_connection_metadata',
    description: `Update and return the list of application role connection metadata records for an application. Takes a full list of metadata objects to replace the existing ones; any records not included are removed. An application can have a maximum of 5 metadata records.`,
    params: [
      {
        name: 'application_id',
        type: 'string',
        required: true,
        description: `The ID of the application.`,
      },
      {
        name: 'records',
        type: 'array',
        required: true,
        description: `Full list of application role connection metadata objects (max 5) to replace the existing records. Each object requires type, key, name, and description; name_localizations and description_localizations are optional.`,
      },
    ],
  },
  {
    name: 'discordbot_update_lobby_message_moderation_metadata',
    description: `Set the moderation metadata for a lobby message. The metadata is app-scoped and delivered to active game clients via the Social SDK as a realtime message update. Uses a Bot token for authorization. Returns HTTP 204 No Content on success.`,
    params: [
      {
        name: 'lobby_id',
        type: 'string',
        required: true,
        description: `The ID of the lobby the message belongs to.`,
      },
      {
        name: 'message_id',
        type: 'string',
        required: true,
        description: `The ID of the lobby message to set moderation metadata on.`,
      },
      {
        name: 'moderation_metadata',
        type: 'object',
        required: true,
        description: `Free-form key/value pairs describing the moderation decision. Up to 5 keys; key length up to 1024 characters; value length up to 2000 characters. This object is sent as the entire request body.`,
      },
    ],
  },
]
