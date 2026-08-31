import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'googlechat_complete_space_import',
    description: `Complete the import process for a space that was created in Import Mode, making it visible to users. Call this after all historical messages and memberships have been migrated into the space; if you miss the space's importModeExpireTime, Google Chat automatically deletes the space. Returns a CompleteImportSpaceResponse containing the finalized space. Requires a valid Google Chat OAuth2 connection with the chat.import scope and domain-wide delegation. Known limitation: this endpoint has no fallback scope -- it strictly requires chat.import, which is not currently offered in the standard Google Cloud Console OAuth consent screen scope picker (observed directly; likely a Developer-Preview-gated scope on Google's side). Calls will fail with an insufficient-scope/permission error until Google exposes it for this project.`,
    params: [
      {
        name: 'space_id',
        type: 'string',
        required: true,
        description: `The unique ID of the import-mode space to finalize (the segment after 'spaces/' in the space resource name)`,
      },
    ],
  },
  {
    name: 'googlechat_create_custom_emoji',
    description: `Create a new custom emoji in Google Chat from an image, for use across the Google Workspace organization.
Returns the created CustomEmoji object, including its server-assigned resource name (customEmojis/{customEmoji}) and uid.
Use create_custom_emoji to add a new emoji. Use list_custom_emojis first to check whether one with the same emoji_name already exists, since names must be unique within the organization.
Custom emojis must be turned on for the organization by a Workspace administrator before this will succeed. Known limitation: this endpoint has no fallback scope -- it strictly requires chat.customemojis, which is not currently offered in the standard Google Cloud Console OAuth consent screen scope picker (observed directly; likely a Developer-Preview-gated scope on Google's side). Calls will fail with an insufficient-scope/permission error until Google exposes it for this project.`,
    params: [
      {
        name: 'emoji_name',
        type: 'string',
        required: true,
        description: `User-provided name for the custom emoji, unique within the organization. Must start and end with colons, be lowercase, and contain only alphanumeric characters, hyphens, and underscores (hyphens/underscores cannot be used consecutively).`,
      },
      {
        name: 'filename',
        type: 'string',
        required: true,
        description: `Filename of the emoji image, including its extension (e.g. 'emoji.png'). Passed alongside the image bytes to identify the file type.`,
      },
      {
        name: 'image_content_base64',
        type: 'string',
        required: true,
        description: `Base64-encoded contents of the emoji image file (e.g. PNG, GIF, or JPEG bytes). This is the raw image data, base64-encoded, not a URL.`,
      },
    ],
  },
  {
    name: 'googlechat_create_member',
    description: `Add or invite a human user to a Google Chat space by email address. If the invited user has auto-accept turned off they receive an invitation instead of being added directly. Returns the created (or invited) membership object. Use create_member to add people to a space; use update_member to change an existing member's role, and delete_member to remove someone.`,
    params: [
      {
        name: 'member_email',
        type: 'string',
        required: true,
        description: `The Google Workspace or Gmail email address of the human user to add or invite to the space. Used to build the membership's member.name as 'users/<email>'.`,
      },
      {
        name: 'space_id',
        type: 'string',
        required: true,
        description: `The unique ID of the space to add the member to (the segment after 'spaces/' in the space resource name)`,
      },
      {
        name: 'use_admin_access',
        type: 'boolean',
        required: false,
        description: `Run this request using the caller's Google Workspace administrator privileges`,
      },
    ],
  },
  {
    name: 'googlechat_create_message',
    description: `Send a new message into a Google Chat space, with optional cards and thread grouping via thread_key. Returns the created message resource, including its resource name, thread, and create time. Use create_message to post new content. Use update_message or replace_message to edit a message that already exists. Requires a valid Google Chat OAuth2 connection with a message-create scope.`,
    params: [
      {
        name: 'space_id',
        type: 'string',
        required: true,
        description: `The unique ID of the space to post the message into (the segment after 'spaces/' in the space resource name)`,
      },
      {
        name: 'text',
        type: 'string',
        required: true,
        description: `Plain-text body of the message. Required for messages sent with user authentication; can be combined with cards_v2 when using app authentication.`,
      },
      {
        name: 'cards_v2',
        type: 'array',
        required: false,
        description: `Optional array of Card objects for rich, interactive message content (requires app authentication). Each item has the shape {"cardId": "...", "card": {...}}. Passed through as raw JSON.`,
      },
      {
        name: 'message_id',
        type: 'string',
        required: false,
        description: `Optional custom ID for the message. Must begin with 'client-', contain up to 63 characters using only lowercase letters, numbers, and hyphens, and be unique within the space.`,
      },
      {
        name: 'message_reply_option',
        type: 'string',
        required: false,
        description: `Specifies whether the message starts a new thread or replies to one identified by thread_key. Only supported in named spaces.`,
      },
      {
        name: 'request_id',
        type: 'string',
        required: false,
        description: `Optional unique request ID for this message. Specifying an existing request ID returns the message already created with that ID instead of creating a duplicate.`,
      },
      {
        name: 'thread_key',
        type: 'string',
        required: false,
        description: `Optional ID used to group this message into a thread without knowing the thread's resource name. Maps to Message.thread.threadKey. Supports up to 4000 characters. Messages sharing the same thread_key from the same Chat app are posted into the same thread.`,
      },
    ],
  },
  {
    name: 'googlechat_create_message_pin',
    description: `Pin a message in a Google Chat space so it stays easily accessible to space members.
Returns the created MessagePin object, including its resource name (spaces/{space}/messagePins/{messagePin}).
Use create_message_pin to pin an existing message. Use list_message_pins to see current pins, or delete_message_pin to unpin a message.
The message must already exist in the space (e.g. created via a send-message tool) before it can be pinned.`,
    params: [
      {
        name: 'message_id',
        type: 'string',
        required: true,
        description: `The unique ID of the message to pin (the segment after 'messages/' in the message resource name). The message must belong to the space identified by space_id.`,
      },
      {
        name: 'space_id',
        type: 'string',
        required: true,
        description: `The unique ID of the space (the segment after 'spaces/' in the space resource name) that contains the message to pin.`,
      },
    ],
  },
  {
    name: 'googlechat_create_reaction',
    description: `Add an emoji reaction to a Google Chat message. Returns the created reaction resource, including its resource name and emoji. Use create_reaction to react to a message; use delete_reaction to remove a reaction you or the caller added. Requires a valid Google Chat OAuth2 connection with a reaction-create scope.`,
    params: [
      {
        name: 'emoji',
        type: 'string',
        required: true,
        description: `The unicode emoji character to react with, e.g. a thumbs-up. Maps to the Reaction resource's emoji.unicode field.`,
      },
      {
        name: 'message_id',
        type: 'string',
        required: true,
        description: `The unique ID of the message to react to (the segment after 'messages/' in the message resource name). If a custom ID was set when the message was created, use that custom ID here.`,
      },
      {
        name: 'space_id',
        type: 'string',
        required: true,
        description: `The unique ID of the space the message belongs to (the segment after 'spaces/' in the space resource name)`,
      },
    ],
  },
  {
    name: 'googlechat_create_section',
    description: `Create a custom section in Google Chat to group and organize the calling user's spaces in the Chat navigation panel. Returns the created section, including its resource name, display name, type (CUSTOM_SECTION), and sort order. Use create_section to add a new section, then move_section_item to place spaces into it. Known limitation: this endpoint has no fallback scope -- it strictly requires chat.users.sections, which is not currently offered in the standard Google Cloud Console OAuth consent screen scope picker (observed directly; likely a Developer-Preview-gated scope on Google's side). Calls will fail with an insufficient-scope/permission error until Google exposes it for this project.`,
    params: [
      {
        name: 'display_name',
        type: 'string',
        required: true,
        description: `Display name for the new custom section. Supports up to 80 characters and is required when creating a CUSTOM_SECTION (the only type of section that can be created).`,
      },
    ],
  },
  {
    name: 'googlechat_create_space',
    description: `Create a new space in Google Chat as a named space, a group chat, or (with import mode) a placeholder for historical data migration. Returns the created space resource, including its resource name, display name, and type. Use setup_space instead to create a space and add members in a single call. Requires a valid Google Chat OAuth2 connection.`,
    params: [
      {
        name: 'space_type',
        type: 'string',
        required: true,
        description: `Required. The type of space to create. Use SPACE for a persistent named space (requires display_name), GROUP_CHAT for a group conversation without a display name, or DIRECT_MESSAGE for a 1:1 conversation.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `A short description of the space's topic, purpose, or participants. Supports up to 150 characters. Maps to the space's spaceDetails.description field.`,
      },
      {
        name: 'display_name',
        type: 'string',
        required: false,
        description: `The space's display name. Required when space_type is SPACE; omit for GROUP_CHAT and DIRECT_MESSAGE spaces. Supports up to 128 characters. If the API returns ALREADY_EXISTS, another space in the organization is already using this name.`,
      },
      {
        name: 'external_user_allowed',
        type: 'boolean',
        required: false,
        description: `Whether this space permits any Google Chat user as a member. Only meaningful when creating a space in a Google Workspace organization; omit for consumer accounts. This field is immutable once the space is created.`,
      },
      {
        name: 'guidelines',
        type: 'string',
        required: false,
        description: `The space's rules, expectations, and etiquette. Supports up to 5,000 characters. Maps to the space's spaceDetails.guidelines field.`,
      },
      {
        name: 'import_mode',
        type: 'boolean',
        required: false,
        description: `Whether to create this space in Import Mode for migrating historical data into Google Chat. Import mode spaces are hidden from users until you finish the migration by calling complete_space_import. Requires user authentication with the chat.import scope.`,
      },
      {
        name: 'request_id',
        type: 'string',
        required: false,
        description: `An optional idempotency key for this request. A random UUID is recommended. Specifying an existing request_id returns the space already created with that ID instead of creating a new one.`,
      },
    ],
  },
  {
    name: 'googlechat_delete_custom_emoji',
    description: `Delete a custom emoji from Google Chat by its ID or emoji name. By default users can only delete emojis they created; organization-assigned emoji managers can delete any custom emoji.
Returns an empty response on success.
Use delete_custom_emoji to remove an emoji you no longer want available. Use list_custom_emojis or get_custom_emoji first to confirm the correct emoji ID.
This action is permanent and cannot be undone. Known limitation: this endpoint has no fallback scope -- it strictly requires chat.customemojis, which is not currently offered in the standard Google Cloud Console OAuth consent screen scope picker (observed directly; likely a Developer-Preview-gated scope on Google's side). Calls will fail with an insufficient-scope/permission error until Google exposes it for this project.`,
    params: [
      {
        name: 'custom_emoji_id',
        type: 'string',
        required: true,
        description: `The unique ID of the custom emoji to delete (the segment after 'customEmojis/' in its resource name), OR the emoji's name used as an alias, including the surrounding colons (e.g. ':example-emoji:').`,
      },
    ],
  },
  {
    name: 'googlechat_delete_member',
    description: `Remove a membership from a Google Chat space, such as removing a human user, the calling Chat app, or a Google Group. Returns the deleted membership object. This is a destructive, irreversible action — use get_member first if you need to confirm who you're removing.`,
    params: [
      {
        name: 'member_id',
        type: 'string',
        required: true,
        description: `The unique ID of the membership to delete (the segment after 'members/' in the membership resource name, e.g. a numeric user ID, 'app', or the member's email address).`,
      },
      {
        name: 'space_id',
        type: 'string',
        required: true,
        description: `The unique ID of the space (the segment after 'spaces/' in the space resource name)`,
      },
      {
        name: 'use_admin_access',
        type: 'boolean',
        required: false,
        description: `Run this request using the caller's Google Workspace administrator privileges`,
      },
    ],
  },
  {
    name: 'googlechat_delete_message',
    description: `Delete a message from a Google Chat space, optionally removing its threaded replies as well. Returns an empty response on success. Use delete_message to permanently remove a message; this action cannot be undone. Requires a valid Google Chat OAuth2 connection with a message-delete scope.`,
    params: [
      {
        name: 'message_id',
        type: 'string',
        required: true,
        description: `The unique ID of the message to delete (the segment after 'messages/' in the message resource name). If a custom ID was set when the message was created, use that custom ID here.`,
      },
      {
        name: 'space_id',
        type: 'string',
        required: true,
        description: `The unique ID of the space the message belongs to (the segment after 'spaces/' in the space resource name)`,
      },
      {
        name: 'force',
        type: 'boolean',
        required: false,
        description: `When true, deleting the message also deletes its threaded replies. When false, deletion fails if the message has threaded replies. Only applies when authenticating as a user; has no effect with app authentication.`,
      },
    ],
  },
  {
    name: 'googlechat_delete_message_pin',
    description: `Unpin a message in a Google Chat space by deleting its message pin. This does not delete the underlying message, only removes the pin.
Returns an empty response on success.
Use delete_message_pin to unpin a message. Use list_message_pins first if you need to find the message_pin_id for the pin you want to remove.
This action cannot be undone; the message would need to be re-pinned with create_message_pin.`,
    params: [
      {
        name: 'message_pin_id',
        type: 'string',
        required: true,
        description: `The unique ID of the message pin to delete (the segment after 'messagePins/' in the message pin resource name). This matches the resource ID of the pinned message.`,
      },
      {
        name: 'space_id',
        type: 'string',
        required: true,
        description: `The unique ID of the space (the segment after 'spaces/' in the space resource name) that owns the message pin.`,
      },
    ],
  },
  {
    name: 'googlechat_delete_reaction',
    description: `Remove an emoji reaction from a Google Chat message by its reaction ID. Returns an empty response on success. Use delete_reaction to undo a reaction added via create_reaction. Requires a valid Google Chat OAuth2 connection with a reaction-delete scope.`,
    params: [
      {
        name: 'message_id',
        type: 'string',
        required: true,
        description: `The unique ID of the message the reaction is on (the segment after 'messages/' in the message resource name). If a custom ID was set when the message was created, use that custom ID here.`,
      },
      {
        name: 'reaction_id',
        type: 'string',
        required: true,
        description: `The unique ID of the reaction to delete (the segment after 'reactions/' in the reaction resource name). Obtain this from list_reactions or from the response of create_reaction.`,
      },
      {
        name: 'space_id',
        type: 'string',
        required: true,
        description: `The unique ID of the space the message belongs to (the segment after 'spaces/' in the space resource name)`,
      },
    ],
  },
  {
    name: 'googlechat_delete_section',
    description: `Delete a custom section from Google Chat. Only sections of type CUSTOM_SECTION can be deleted; system sections (default-direct-messages, default-spaces, default-apps) cannot be removed. If the section contains items such as spaces, those items move to Chat's default sections instead of being deleted. This is a destructive, irreversible action — use list_sections first to confirm the section_id. Known limitation: this endpoint has no fallback scope -- it strictly requires chat.users.sections, which is not currently offered in the standard Google Cloud Console OAuth consent screen scope picker (observed directly; likely a Developer-Preview-gated scope on Google's side). Calls will fail with an insufficient-scope/permission error until Google exposes it for this project.`,
    params: [
      {
        name: 'section_id',
        type: 'string',
        required: true,
        description: `The unique ID of the CUSTOM_SECTION to delete (the segment after 'sections/' in the section resource name). System sections cannot be deleted; use list_sections to confirm this section's type first.`,
      },
    ],
  },
  {
    name: 'googlechat_delete_space',
    description: `Permanently delete a named Google Chat space. This always performs a cascading delete, removing every message and membership in the space along with it. Returns an empty response on success. This action cannot be undone. Requires a valid Google Chat OAuth2 connection.`,
    params: [
      {
        name: 'space_id',
        type: 'string',
        required: true,
        description: `The unique ID of the space to delete (the segment after 'spaces/' in the space resource name)`,
      },
      {
        name: 'use_admin_access',
        type: 'boolean',
        required: false,
        description: `Run this request using the caller's Google Workspace administrator privileges`,
      },
    ],
  },
  {
    name: 'googlechat_download_media',
    description: `Download the raw binary content of Google Chat media, such as a message attachment, using its opaque media resource name.
Returns the raw file bytes as the response body (not JSON) — Content-Type varies with the underlying file (e.g. image/png, application/pdf). Known limitation: whether the Scalekit REST executor surfaces raw binary bytes usably to the caller should be verified during testing.
Use download_media after googlechat_get_attachment has given you an attachmentDataRef.resourceName to fetch, to retrieve the actual file content rather than just its metadata.
Requires a valid Google Chat OAuth2 connection with the appropriate messages scope.`,
    params: [
      {
        name: 'resource_name',
        type: 'string',
        required: true,
        description: `The opaque media resource name to download, exactly as returned in an attachment's attachmentDataRef.resourceName field (e.g. from googlechat_get_attachment). Pass it through verbatim — do not attempt to construct or decompose this value; its format is internal to Google Chat's media API and varies.`,
      },
    ],
  },
  {
    name: 'googlechat_find_direct_message_space',
    description: `Find the existing direct message space between the caller and a specified user. With app authentication, finds the DM between that user and the calling Chat app; with user authentication, finds the DM between that user and the authenticated user. Returns the matching space resource, or a 404 error if no direct message exists yet. Use setup_space instead to create a new direct message when one doesn't already exist. Requires a valid Google Chat OAuth2 connection.`,
    params: [
      {
        name: 'user',
        type: 'string',
        required: true,
        description: `Required. Resource name of the user to find a direct message with. Format: users/{user}, where {user} is either the People API person ID or the Directory API user ID. When using user authentication, you can also use the person's email address as an alias, e.g. users/example@gmail.com.`,
      },
    ],
  },
  {
    name: 'googlechat_find_group_chats',
    description: `Find group chat spaces whose human membership contains exactly the calling user plus the specified set of other users. Returns matching space resources (or just resource names, depending on space_view) plus a nextPageToken for pagination. Use list_spaces or search_spaces instead to browse spaces more broadly. Requires a valid Google Chat OAuth2 connection with a memberships scope.`,
    params: [
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `The maximum number of spaces to return. The service might return fewer than this value. If unspecified, at most 10 spaces are returned. The maximum value is 30; larger values are coerced down to 30.`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `A page token received from a previous find_group_chats call, used to retrieve the next page. When paginating, keep all other parameters the same as the call that returned this token.`,
      },
      {
        name: 'space_view',
        type: 'string',
        required: false,
        description: `Requested space view. SPACE_VIEW_RESOURCE_NAME_ONLY (default) populates only the space's resource name. SPACE_VIEW_EXPANDED populates full space fields (except permissionSettings) but requires a scope that allows reading space data, e.g. chat.spaces or chat.spaces.readonly.`,
      },
      {
        name: 'users',
        type: 'array',
        required: false,
        description: `Resource names of the other human users (besides the caller) who must be exactly the group chat's human membership. Chat apps can't be included. Up to 49 users. Format: users/{user}, where {user} is the People API person ID, Directory API user ID, or (with user authentication) the person's email address as an alias, e.g. users/example@gmail.com.`,
      },
    ],
  },
  {
    name: 'googlechat_get_attachment',
    description: `Get the metadata of a message attachment in Google Chat, such as its content type, source, and download/thumbnail URLs.
Returns an Attachment object with name, contentType, contentName, source, downloadUri, and thumbnailUri fields — not the file bytes themselves.
Known limitation: Google's API documents exactly one supported authentication method for this endpoint — app/bot authentication with the chat.bot scope — and offers no user-authentication alternative (unlike most other Chat API methods). This connector only implements standard 3-legged user OAuth, which this endpoint does not accept, so calls through this connector are expected to fail with a permission/authentication error until app authentication is supported here. Kept for API-surface completeness.
Use this to inspect an attachment referenced on a message before deciding whether to fetch it. Use googlechat_download_media with the attachment's attachmentDataRef.resourceName to retrieve the actual binary content.`,
    params: [
      {
        name: 'attachment_id',
        type: 'string',
        required: true,
        description: `The unique ID of the attachment (the segment after 'attachments/' in the attachment resource name).`,
      },
      {
        name: 'message_id',
        type: 'string',
        required: true,
        description: `The unique ID of the message (the segment after 'messages/' in the message resource name) that has this attachment.`,
      },
      {
        name: 'space_id',
        type: 'string',
        required: true,
        description: `The unique ID of the space (the segment after 'spaces/' in the space resource name) that contains the message with this attachment.`,
      },
    ],
  },
  {
    name: 'googlechat_get_custom_emoji',
    description: `Get the details of a single custom emoji in Google Chat by its ID or emoji name.
Returns a CustomEmoji object with name, emojiName, uid, and a temporaryImageUri (valid for at least 10 minutes) for previewing the image.
Use get_custom_emoji when you already know the specific emoji to fetch. Use list_custom_emojis to browse or search for one first.
Custom emojis must be enabled for the organization and require a Google Chat OAuth2 connection. Known limitation: this endpoint has no fallback scope -- it strictly requires chat.customemojis or chat.customemojis.readonly, which is not currently offered in the standard Google Cloud Console OAuth consent screen scope picker (observed directly; likely a Developer-Preview-gated scope on Google's side). Calls will fail with an insufficient-scope/permission error until Google exposes it for this project.`,
    params: [
      {
        name: 'custom_emoji_id',
        type: 'string',
        required: true,
        description: `The unique ID of the custom emoji (the segment after 'customEmojis/' in its resource name), OR the emoji's name used as an alias, including the surrounding colons (e.g. ':example-emoji:').`,
      },
    ],
  },
  {
    name: 'googlechat_get_member',
    description: `Get details about a single membership in a Google Chat space, including the member's role, state, and whether they are a human user, Chat app, or Google Group. Returns one membership object. Use get_member when you already know the member_id; use list_members to browse or search all members of a space.`,
    params: [
      {
        name: 'member_id',
        type: 'string',
        required: true,
        description: `The unique ID of the membership to retrieve (the segment after 'members/' in the membership resource name, e.g. a numeric user ID, 'app', or the member's email address).`,
      },
      {
        name: 'space_id',
        type: 'string',
        required: true,
        description: `The unique ID of the space (the segment after 'spaces/' in the space resource name)`,
      },
      {
        name: 'use_admin_access',
        type: 'boolean',
        required: false,
        description: `Run this request using the caller's Google Workspace administrator privileges`,
      },
    ],
  },
  {
    name: 'googlechat_get_message',
    description: `Get the full details of a single Google Chat message by its space and message ID. Returns the message's text, sender, thread, cards, and reaction summary. Use get_message when you already know the message ID; use list_messages or search_messages to find messages when you don't. Requires a valid Google Chat OAuth2 connection.`,
    params: [
      {
        name: 'message_id',
        type: 'string',
        required: true,
        description: `The unique ID of the message (the segment after 'messages/' in the message resource name). If a custom ID was set when the message was created, use that custom ID here.`,
      },
      {
        name: 'space_id',
        type: 'string',
        required: true,
        description: `The unique ID of the space the message belongs to (the segment after 'spaces/' in the space resource name)`,
      },
      {
        name: 'markup_syntax',
        type: 'string',
        required: false,
        description: `Specifies the desired output syntax for the message's formatted_text field: Chat markup or Markdown (CommonMark-based).`,
      },
    ],
  },
  {
    name: 'googlechat_get_space',
    description: `Get details about a Google Chat space, including its display name, type, and access settings. Requires a valid Google Chat OAuth2 connection.`,
    params: [
      {
        name: 'space_id',
        type: 'string',
        required: true,
        description: `The unique ID of the space (the segment after 'spaces/' in the space resource name)`,
      },
      {
        name: 'use_admin_access',
        type: 'boolean',
        required: false,
        description: `Run this request using the caller's Google Workspace administrator privileges`,
      },
    ],
  },
  {
    name: 'googlechat_get_space_event',
    description: `Get details about a single change event from a Google Chat space, such as a new message, membership change, or reaction. The event payload contains the most recent version of the affected resource. Returns one space event object. Use get_space_event when you already know the event's ID; use list_space_events to discover events by type and time range.`,
    params: [
      {
        name: 'space_event_id',
        type: 'string',
        required: true,
        description: `The unique ID of the space event to retrieve (the segment after 'spaceEvents/' in the space event resource name).`,
      },
      {
        name: 'space_id',
        type: 'string',
        required: true,
        description: `The unique ID of the space the event occurred in (the segment after 'spaces/' in the space resource name)`,
      },
    ],
  },
  {
    name: 'googlechat_get_space_notification_setting',
    description: `Get the calling user's notification setting for a Google Chat space, including whether notifications are muted and which events trigger them. Returns one SpaceNotificationSetting object with its notificationSetting and muteSetting values. Use get_space_notification_setting to check current settings before changing them with update_space_notification_setting. Known limitation: this endpoint has no fallback scope -- it strictly requires chat.users.spacesettings, which is not currently offered in the standard Google Cloud Console OAuth consent screen scope picker (observed directly; likely a Developer-Preview-gated scope on Google's side). Calls will fail with an insufficient-scope/permission error until Google exposes it for this project.`,
    params: [
      {
        name: 'space_id',
        type: 'string',
        required: true,
        description: `The unique ID of the space (the segment after 'spaces/' in the space resource name)`,
      },
    ],
  },
  {
    name: 'googlechat_get_space_read_state',
    description: `Get the calling user's read state for a Google Chat space, used to identify which messages are read or unread. Returns a read state object with the user's last_read_time for the space. Use get_space_read_state to check read status at the space level; use get_thread_read_state for a specific thread's read status.`,
    params: [
      {
        name: 'space_id',
        type: 'string',
        required: true,
        description: `The unique ID of the space to get the calling user's read state for (the segment after 'spaces/' in the space resource name). This tool always reads the state for the calling user (the 'me' alias) — there is no way to read another user's read state.`,
      },
    ],
  },
  {
    name: 'googlechat_get_thread_read_state',
    description: `Get the calling user's read state for a specific thread within a Google Chat space, used to identify which replies in that thread are read or unread. Returns a read state object with the user's last_read_time for the thread. Use get_thread_read_state for a single thread; use get_space_read_state for the space's top-level conversation.`,
    params: [
      {
        name: 'space_id',
        type: 'string',
        required: true,
        description: `The unique ID of the space containing the thread (the segment after 'spaces/' in the space resource name). This tool always reads the state for the calling user (the 'me' alias).`,
      },
      {
        name: 'thread_id',
        type: 'string',
        required: true,
        description: `The unique ID of the thread to get the calling user's read state for (the segment after 'threads/' in the thread resource name).`,
      },
    ],
  },
  {
    name: 'googlechat_get_user_availability',
    description: `Get the authenticated user's current availability in Google Chat, such as whether they are active, idle, away, or in do-not-disturb mode. Returns an Availability object with the user's state (ACTIVE, IDLE, AWAY, or DO_NOT_DISTURB), any custom status text and emoji, and Do Not Disturb metadata when applicable. Use get_user_availability to check status; use update_user_availability to change the custom status, or mark_user_active, mark_user_away, and mark_user_do_not_disturb to change the state directly.`,
    params: [],
  },
  {
    name: 'googlechat_list_custom_emojis',
    description: `List the custom emojis visible to the authenticated user in their Google Workspace organization.
Returns an array of CustomEmoji objects (name, emojiName, uid, temporaryImageUri) plus a next_page_token for pagination.
Use list_custom_emojis to browse or check whether a custom emoji already exists. Use get_custom_emoji to fetch one specific emoji by ID or name.
Custom emojis must be enabled for the organization by a Workspace administrator, and require a Google Chat OAuth2 connection. Known limitation: this endpoint has no fallback scope -- it strictly requires chat.customemojis or chat.customemojis.readonly, which is not currently offered in the standard Google Cloud Console OAuth consent screen scope picker (observed directly; likely a Developer-Preview-gated scope on Google's side). Calls will fail with an insufficient-scope/permission error until Google exposes it for this project.`,
    params: [
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `A query filter for custom emojis by creator. Only creator("users/me") and NOT creator("users/me") are accepted, to filter for emojis created (or not created) by the calling user. Invalid queries return an INVALID_ARGUMENT error.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of custom emojis to return. Fewer may be returned than requested. Maximum value is 200; values above 200 are coerced to 200. If omitted, the default is 25.`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `A page token from a previous list_custom_emojis call's next_page_token, used to retrieve the next page of results. Omit for the first page. When paginating, the filter value should match the call that produced the page token.`,
      },
    ],
  },
  {
    name: 'googlechat_list_members',
    description: `List the memberships (human members, Chat apps, and optionally Google Groups) in a Google Chat space. Returns a page of membership objects (name, member/groupMember, role, state) plus a nextPageToken for pagination. Use list_members to enumerate everyone in a space; use get_member when you already know a specific member's ID and want just that record.`,
    params: [
      {
        name: 'space_id',
        type: 'string',
        required: true,
        description: `The unique ID of the space to list memberships for (the segment after 'spaces/' in the space resource name)`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `A query filter on member role and/or type, e.g. 'member.type = "HUMAN"' or 'role = "ROLE_MANAGER" OR role = "ROLE_MEMBER"'. Combine role and type with AND. When use_admin_access is true, either 'member.type = "HUMAN"' or 'member.type != "BOT"' is required.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of memberships to return. If unspecified, at most 100 are returned. The maximum value is 1000; larger values are coerced down to 1000.`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `A page token from a previous list_members call, used to retrieve the next page of results.`,
      },
      {
        name: 'show_groups',
        type: 'boolean',
        required: false,
        description: `When true, also returns memberships associated with a Google Group in addition to other member types.`,
      },
      {
        name: 'show_invited',
        type: 'boolean',
        required: false,
        description: `When true, also returns memberships associated with invited (not yet joined) members. Requires user authentication.`,
      },
      {
        name: 'use_admin_access',
        type: 'boolean',
        required: false,
        description: `Run this request using the caller's Google Workspace administrator privileges`,
      },
    ],
  },
  {
    name: 'googlechat_list_message_pins',
    description: `List the message pins in a Google Chat space, so users can see which messages have been pinned for easy access.
Returns an array of MessagePin objects (each with a name and the resource name of the pinned message) plus a next_page_token for pagination.
Use list_message_pins to enumerate what is currently pinned in a space. Use create_message_pin to pin a new message, or delete_message_pin to unpin one.
Requires a valid Google Chat OAuth2 connection.`,
    params: [
      {
        name: 'space_id',
        type: 'string',
        required: true,
        description: `The unique ID of the space (the segment after 'spaces/' in the space resource name) whose message pins to list.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of message pins to return. Fewer may be returned than requested. Maximum value is 100; values above 100 are coerced to 100. If omitted, at most 100 message pins are returned.`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `A page token from a previous list_message_pins call's next_page_token, used to retrieve the next page of results. Omit for the first page.`,
      },
    ],
  },
  {
    name: 'googlechat_list_messages',
    description: `List messages posted in a Google Chat space, with optional filtering by creation time or thread and sorting by create time. Returns a page of message resources plus a page token for further results. Use list_messages to page through a known space's message history. Use search_messages to run a text query across one or more spaces. Requires a valid Google Chat OAuth2 connection.`,
    params: [
      {
        name: 'space_id',
        type: 'string',
        required: true,
        description: `The unique ID of the space to list messages from (the segment after 'spaces/' in the space resource name)`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Query filter to restrict results by creation time (create_time) and/or thread (thread.name). Combine conditions with AND. Example: create_time > "2012-04-21T11:30:00-04:00" AND thread.name = spaces/AAAAAAAAAAA/threads/123`,
      },
      {
        name: 'markup_syntax',
        type: 'string',
        required: false,
        description: `Output syntax for the formatted_text field on returned messages.`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `How the list of messages is ordered by create_time. Valid values are ASC (ascending, the default) or DESC (descending).`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of messages to return. If unspecified, at most 25 are returned. The maximum value is 1000; larger values are automatically capped.`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `A page token from a previous list_messages call, used to retrieve the next page of results. Other parameters should match the original call.`,
      },
      {
        name: 'show_deleted',
        type: 'boolean',
        required: false,
        description: `Whether to include deleted messages in the results. Deleted messages include delete time and metadata about the deletion, but the message content is unavailable.`,
      },
    ],
  },
  {
    name: 'googlechat_list_reactions',
    description: `List the reactions on a Google Chat message, optionally filtered by emoji and/or user. Returns a page of reaction resources plus a page token for further results. Use list_reactions to see who reacted to a message and with what emoji. Requires a valid Google Chat OAuth2 connection.`,
    params: [
      {
        name: 'message_id',
        type: 'string',
        required: true,
        description: `The unique ID of the message to list reactions for (the segment after 'messages/' in the message resource name). If a custom ID was set when the message was created, use that custom ID here.`,
      },
      {
        name: 'space_id',
        type: 'string',
        required: true,
        description: `The unique ID of the space the message belongs to (the segment after 'spaces/' in the space resource name)`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Optional query filter. Filter reactions by emoji (emoji.unicode or emoji.custom_emoji.uid) and/or user (user.name). Combine same-field filters with OR and different fields with AND; group mixed AND/OR with parentheses.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of reactions to return. If unspecified, the default is 25. The maximum value is 200; larger values are automatically capped.`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `A page token from a previous list_reactions call, used to retrieve the next page of results. The filter value should match the call that provided the token.`,
      },
    ],
  },
  {
    name: 'googlechat_list_section_items',
    description: `List the items (currently only spaces) grouped under a section in Google Chat's navigation panel. Returns an array of section items (resource name and space) plus a nextPageToken for more results. Use list_section_items to see what's in a section before moving items with move_section_item. Known limitation: this endpoint has no fallback scope -- it strictly requires chat.users.sections or chat.users.sections.readonly, which is not currently offered in the standard Google Cloud Console OAuth consent screen scope picker (observed directly; likely a Developer-Preview-gated scope on Google's side). Calls will fail with an insufficient-scope/permission error until Google exposes it for this project.`,
    params: [
      {
        name: 'section_id',
        type: 'string',
        required: true,
        description: `The unique ID of the section to list items for (the segment after 'sections/' in the section resource name). Use the wildcard '-' to list items across all sections instead of one specific section.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `A query filter, currently supporting only filtering by space, e.g. 'space = spaces/AAAAAAAAAAA'. Invalid filters return an INVALID_ARGUMENT error.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of section items to return. If unspecified, at most 10 are returned. The maximum value is 100; larger values are coerced down to 100.`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `A page token from a previous list_section_items call, used to retrieve the next page of results.`,
      },
    ],
  },
  {
    name: 'googlechat_list_sections',
    description: `List the sections the calling user has created to organize their Google Chat spaces in the Chat navigation panel. Returns an array of sections (resource name, display name, type, and sort order) plus a nextPageToken for more results. Use list_sections to find a section's ID before updating it with update_section, repositioning it with reposition_section, or listing its items with list_section_items. Known limitation: this endpoint has no fallback scope -- it strictly requires chat.users.sections or chat.users.sections.readonly, which is not currently offered in the standard Google Cloud Console OAuth consent screen scope picker (observed directly; likely a Developer-Preview-gated scope on Google's side). Calls will fail with an insufficient-scope/permission error until Google exposes it for this project.`,
    params: [
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of sections to return. If unspecified, at most 10 are returned. The maximum value is 100; larger values are coerced down to 100.`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `A page token from a previous list_sections call, used to retrieve the next page of results.`,
      },
    ],
  },
  {
    name: 'googlechat_list_space_events',
    description: `List change events (new/updated messages, memberships, reactions, and more) from a Google Chat space, filtered by event type and an optional time range. Returns a page of space event objects plus a nextPageToken for pagination. Use list_space_events to poll for changes in a space; use get_space_event when you already know a specific event's ID.`,
    params: [
      {
        name: 'filter',
        type: 'string',
        required: true,
        description: `A query filter that must specify at least one event type using the 'has' (':') operator, e.g. 'event_types:"google.workspace.chat.message.v1.created"'. Combine multiple event types with OR. Optionally add start_time and/or end_time (RFC3339) joined with AND, e.g. 'start_time="2023-08-23T19:20:33+00:00" AND event_types:"google.workspace.chat.message.v1.created"'. Events are available for up to 28 days.`,
      },
      {
        name: 'space_id',
        type: 'string',
        required: true,
        description: `The unique ID of the space to list events for (the segment after 'spaces/' in the space resource name)`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of space events to return. The service may return fewer than this value.`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `A page token from a previous list_space_events call, used to retrieve the next page of results. All other parameters should match the original call.`,
      },
    ],
  },
  {
    name: 'googlechat_list_spaces',
    description: `List Google Chat spaces that the caller is a member of. Returns a page of space resources plus a nextPageToken for pagination. Group chats and direct messages aren't listed until their first message is sent. Use search_spaces instead to search across an entire Google Workspace organization with admin privileges. Requires a valid Google Chat OAuth2 connection.`,
    params: [
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `A query filter on space_type. Must specify a valid enum value such as 'SPACE' or 'GROUP_CHAT' (SPACE_TYPE_UNSPECIFIED is not allowed). To query multiple types, use OR, e.g. spaceType = "GROUP_CHAT" OR spaceType = "DIRECT_MESSAGE".`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `The maximum number of spaces to return. The service might return fewer than this value. If unspecified, at most 100 spaces are returned. The maximum value is 1000; larger values are coerced down to 1000.`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `A page token received from a previous list_spaces call, used to retrieve the next page. When paginating, keep the filter value the same as the call that returned this token.`,
      },
    ],
  },
  {
    name: 'googlechat_mark_user_active',
    description: `Mark the authenticated user as ACTIVE in Google Chat, optionally until a given expiration time or for a given duration. Returns the updated Availability object showing the ACTIVE state. Use mark_user_active to explicitly set the user's status to active; if the user keeps using Chat, the ACTIVE state may persist past the given expiration. Use mark_user_away or mark_user_do_not_disturb instead to set a different availability state.`,
    params: [
      {
        name: 'expire_time',
        type: 'string',
        required: false,
        description: `The absolute timestamp when the ACTIVE state expires, as an RFC3339 datetime (e.g. 2026-08-27T18:00:00Z). After this time the user's state reverts to AWAY, unless the user is actively using Chat. Optional; provide either expire_time or ttl, not both.`,
      },
      {
        name: 'ttl',
        type: 'string',
        required: false,
        description: `The duration from now until the ACTIVE state expires, as a string ending in 's' for seconds (e.g. '3600s' for one hour). Using a short TTL effectively resets the user's state to be based on activity after that brief duration. Optional; provide either expire_time or ttl, not both.`,
      },
    ],
  },
  {
    name: 'googlechat_mark_user_away',
    description: `Mark the authenticated user as AWAY in Google Chat, regardless of their recent activity. Returns the updated Availability object showing the AWAY state. Use mark_user_away to manually set the user as away; this state persists until it is changed again. Use mark_user_active or mark_user_do_not_disturb instead to set a different availability state.`,
    params: [],
  },
  {
    name: 'googlechat_mark_user_do_not_disturb',
    description: `Mark the authenticated user as DO_NOT_DISTURB in Google Chat until a given expiration time or for a given duration, so they typically won't receive notifications. Returns the updated Availability object showing the DO_NOT_DISTURB state. Use mark_user_do_not_disturb to silence notifications for a period; use mark_user_active or mark_user_away instead to set a different availability state.`,
    params: [
      {
        name: 'expire_time',
        type: 'string',
        required: false,
        description: `The absolute timestamp when the DO_NOT_DISTURB state expires, as an RFC3339 datetime (e.g. 2026-08-27T18:00:00Z). After this time the user's state reverts to its normal, activity-based value. Optional; provide either expire_time or ttl, not both.`,
      },
      {
        name: 'ttl',
        type: 'string',
        required: false,
        description: `The duration from now until the DO_NOT_DISTURB state expires, as a string ending in 's' for seconds (e.g. '3600s' for one hour). Optional; provide either expire_time or ttl, not both.`,
      },
    ],
  },
  {
    name: 'googlechat_move_section_item',
    description: `Move an item, such as a space, from one section to another in Google Chat's navigation panel. Returns the updated section item with its new resource name. Use move_section_item after list_sections and list_section_items to reorganize which section a space belongs to. Known limitation: this endpoint has no fallback scope -- it strictly requires chat.users.sections, which is not currently offered in the standard Google Cloud Console OAuth consent screen scope picker (observed directly; likely a Developer-Preview-gated scope on Google's side). Calls will fail with an insufficient-scope/permission error until Google exposes it for this project.`,
    params: [
      {
        name: 'destination_section_id',
        type: 'string',
        required: true,
        description: `The unique ID of the section to move the item into (the segment after 'sections/' in the destination section's resource name). Use list_sections to find it.`,
      },
      {
        name: 'section_id',
        type: 'string',
        required: true,
        description: `The unique ID of the section the item currently belongs to (the segment after 'sections/' in the section resource name).`,
      },
      {
        name: 'section_item_id',
        type: 'string',
        required: true,
        description: `The unique ID of the section item to move (the segment after 'items/' in the section item resource name). Use list_section_items to find it.`,
      },
    ],
  },
  {
    name: 'googlechat_replace_message',
    description: `Update an existing Google Chat message using the PUT-based update endpoint. Per Google's API, \`update\` (PUT) and \`patch\` (PATCH) take identical parameters and are both governed by update_mask -- only fields named in update_mask are changed; there is no full-replace-clears-omitted-fields behavior. Google recommends using update_message (PATCH) instead; this tool exists for API-surface completeness. Returns the updated message resource. Requires a valid Google Chat OAuth2 connection.`,
    params: [
      {
        name: 'message_id',
        type: 'string',
        required: true,
        description: `The unique ID of the message to replace (the segment after 'messages/' in the message resource name). If a custom ID was set when the message was created, use that custom ID here.`,
      },
      {
        name: 'space_id',
        type: 'string',
        required: true,
        description: `The unique ID of the space the message belongs to (the segment after 'spaces/' in the space resource name)`,
      },
      {
        name: 'update_mask',
        type: 'string',
        required: true,
        description: `Required. Comma-separated list of field paths to update, or '*' to update all supported paths. Supported paths: text, attachment, cards, cards_v2 (requires app authentication), accessory_widgets (requires app authentication), quoted_message_metadata (removal only).`,
      },
      {
        name: 'allow_missing',
        type: 'boolean',
        required: false,
        description: `If true and the message isn't found, a new message is created and update_mask is ignored. The message_id must be client-assigned or the request fails.`,
      },
      {
        name: 'cards_v2',
        type: 'array',
        required: false,
        description: `New array of Card objects for rich content (requires app authentication). Only applied if 'cards_v2' is included in update_mask. Each item has the shape {"cardId": "...", "card": {...}}. Passed through as raw JSON.`,
      },
      {
        name: 'text',
        type: 'string',
        required: false,
        description: `New plain-text body for the message. Only applied if 'text' is included in update_mask.`,
      },
    ],
  },
  {
    name: 'googlechat_reposition_section',
    description: `Change the sort order of a section in Google Chat's navigation panel, moving it to an absolute position or to the start or end of the section list. Returns the updated section with its new sortOrder. Use reposition_section after create_section or list_sections to reorder how sections appear. Known limitation: this endpoint has no fallback scope -- it strictly requires chat.users.sections, which is not currently offered in the standard Google Cloud Console OAuth consent screen scope picker (observed directly; likely a Developer-Preview-gated scope on Google's side). Calls will fail with an insufficient-scope/permission error until Google exposes it for this project.`,
    params: [
      {
        name: 'section_id',
        type: 'string',
        required: true,
        description: `The unique ID of the section to reposition (the segment after 'sections/' in the section resource name). Use list_sections to find it.`,
      },
      {
        name: 'relative_position',
        type: 'string',
        required: false,
        description: `Move the section to the START or END of the section list. Provide either relative_position or sort_order, not both.`,
      },
      {
        name: 'sort_order',
        type: 'integer',
        required: false,
        description: `Absolute position (must be greater than 0) to move the section to in the list of sections. If greater than the number of sections, the section is appended to the end. Inserting at this position shifts the section previously there, and those below it, to the next position. Provide either sort_order or relative_position, not both.`,
      },
    ],
  },
  {
    name: 'googlechat_search_messages',
    description: `Search Google Chat messages the caller has access to across all spaces, using a structured filter query. Returns matching message resources, each with the space they belong to, plus a page token for further results. Google's API only supports searching across all spaces at once (there is no per-space search endpoint) -- scope results to one space with \`filter\`, e.g. 'space.name = "spaces/AAAAAAAAAAA"'. Use search_messages for text and field-based queries. Use list_messages to page through every message in one already-known space. Requires a valid Google Chat OAuth2 connection.`,
    params: [
      {
        name: 'filter',
        type: 'string',
        required: true,
        description: `Required. A search query. Supports keyword search plus field filters such as create_time (RFC-3339 timestamp, with < or >=), sender.name (users/{user} or an email), space.name, space.display_name (partial match with ':'), and attachment. Combine conditions with AND.`,
      },
      {
        name: 'markup_syntax',
        type: 'string',
        required: false,
        description: `Output syntax for the formatted_text field on returned messages.`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `How the results are ordered. create_time (default) sorts by message creation time, descending. relevance also sorts descending, but is a Google Workspace Developer Preview feature -- confirmed via live testing that projects not enrolled in that program get rejected with 'The Google Cloud project isn't allowed to call this API. To call this API, join the Google Workspace Developer Preview program.' Use create_time desc unless you know your project is enrolled.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return. If unspecified, at most 25 are returned. The maximum value is 100; larger values are automatically capped.`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `A page token from a previous search_messages call, used to retrieve the next page of results. Other parameters should match the original call.`,
      },
      {
        name: 'view',
        type: 'string',
        required: false,
        description: `How much detail to return per matched message. BASIC returns only the matched messages; FULL includes additional metadata.`,
      },
    ],
  },
  {
    name: 'googlechat_search_spaces',
    description: `Search for spaces across a Google Workspace organization using domain-wide admin access. Returns matching space resources plus a nextPageToken for pagination. Use list_spaces instead to just list the spaces the caller is already a member of. Requires use_admin_access to be true along with a Chat admin OAuth scope such as chat.admin.spaces.readonly.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Required. A search query filter. When use_admin_access is true, supported fields are create_time, customer (required, use "customers/my_customer"), display_name, external_user_allowed, last_active_time, space_history_state, and space_type (required, must be "SPACE"). Example: customer = "customers/my_customer" AND space_type = "SPACE" AND display_name:"Hello World". When use_admin_access is false, supported fields are display_name (required), external_user_allowed, and space_type. Max 1,000 characters.`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `How results are ordered. With use_admin_access true, supports 'membership_count.joined_direct_human_user_count', 'last_active_time', and 'create_time', each with optional ASC/DESC (default ASC). With use_admin_access false, only 'create_time DESC' and 'relevance DESC' are supported.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `The maximum number of spaces to return. The service may return fewer than this value. If unspecified, at most 100 spaces are returned. Maximum is 1000 when use_admin_access is true, otherwise 100.`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `A token from a previous search_spaces call, used to retrieve the next page. When paginating, keep all other parameters the same as the call that returned this token.`,
      },
      {
        name: 'use_admin_access',
        type: 'boolean',
        required: false,
        description: `When true, runs this search using the caller's Google Workspace administrator privileges across the whole organization. Required for this tool's domain-wide search behavior — requires the chat.admin.spaces or chat.admin.spaces.readonly OAuth scope and that the caller is a Workspace admin with the manage chat and spaces conversations privilege. When false, results are limited to spaces the caller has joined.`,
      },
    ],
  },
  {
    name: 'googlechat_setup_space',
    description: `Create a Google Chat space and add specified members to it in a single call. The calling user is added automatically and must not be listed as a member. Use this to create a named space with initial members, a group chat, or a direct message between the caller and one other human (or, with single_user_bot_dm, between the caller and this Chat app). Returns the created space resource. Use create_space instead if you don't need to add members at creation time. Requires a valid Google Chat OAuth2 connection.`,
    params: [
      {
        name: 'space_type',
        type: 'string',
        required: true,
        description: `Required. The type of space to create. Use SPACE for a named space with display_name and optional memberships. Use GROUP_CHAT for a group chat — don't set display_name, and provide at least two member_ids. Use DIRECT_MESSAGE for a 1:1 conversation — don't set display_name; provide exactly one member_id for a human DM, or leave member_ids empty and set single_user_bot_dm to true for a DM with this Chat app.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `A short description of the space's topic, purpose, or participants. Supports up to 150 characters. Only applies when space_type is SPACE — don't set for GROUP_CHAT or DIRECT_MESSAGE. Maps to the space's spaceDetails.description field.`,
      },
      {
        name: 'display_name',
        type: 'string',
        required: false,
        description: `The space's display name. Required when space_type is SPACE. Don't set this for GROUP_CHAT or DIRECT_MESSAGE. Supports up to 128 characters. If the API returns ALREADY_EXISTS, another space in the organization already uses this name.`,
      },
      {
        name: 'guidelines',
        type: 'string',
        required: false,
        description: `The space's rules, expectations, and etiquette. Supports up to 5,000 characters. Only applies when space_type is SPACE — don't set for GROUP_CHAT or DIRECT_MESSAGE. Maps to the space's spaceDetails.guidelines field.`,
      },
      {
        name: 'member_ids',
        type: 'array',
        required: false,
        description: `The Google Chat users to invite, as an array of resource names. Don't include the calling user — they're added automatically. Format: users/{user}, where {user} is the People API person ID, Directory API user ID, or an email address as an alias (required for Gmail users or users in other Workspace domains), e.g. users/alice@example.com. Optional for SPACE. Required (2+) for GROUP_CHAT. Required (exactly 1) for DIRECT_MESSAGE with a human. Must be empty for a DIRECT_MESSAGE with the calling app (set single_user_bot_dm to true instead). Up to 49 entries.`,
      },
      {
        name: 'request_id',
        type: 'string',
        required: false,
        description: `An optional idempotency key for this request. A random UUID is recommended. Specifying an existing request_id returns the space already created with that ID instead of creating a new one.`,
      },
      {
        name: 'single_user_bot_dm',
        type: 'boolean',
        required: false,
        description: `Whether this is a 1:1 direct message between the calling Chat app and a single human. Only valid when space_type is DIRECT_MESSAGE and member_ids is empty. If a matching DM already exists it's returned instead of creating a new one.`,
      },
    ],
  },
  {
    name: 'googlechat_update_member',
    description: `Update an existing membership in a Google Chat space, currently limited to changing a member's role (e.g. promote to manager). Returns the updated membership object. Use update_member to change a member's role; use create_member to add a new member and delete_member to remove one.`,
    params: [
      {
        name: 'member_id',
        type: 'string',
        required: true,
        description: `The unique ID of the membership to update (the segment after 'members/' in the membership resource name).`,
      },
      {
        name: 'role',
        type: 'string',
        required: true,
        description: `The member's new role within the space. One of MEMBERSHIP_ROLE_UNSPECIFIED, ROLE_MEMBER, ROLE_MANAGER, or ROLE_ASSISTANT_MANAGER.`,
      },
      {
        name: 'space_id',
        type: 'string',
        required: true,
        description: `The unique ID of the space (the segment after 'spaces/' in the space resource name)`,
      },
      {
        name: 'update_mask',
        type: 'string',
        required: true,
        description: `Comma-separated list of field paths to update. Currently the only supported field path is 'role'.`,
      },
      {
        name: 'use_admin_access',
        type: 'boolean',
        required: false,
        description: `Run this request using the caller's Google Workspace administrator privileges`,
      },
    ],
  },
  {
    name: 'googlechat_update_message',
    description: `Apply a partial update to an existing Google Chat message, changing only the fields named in update_mask. Returns the updated message resource. Use update_message to change specific fields like text; use replace_message to send the complete message content instead of a partial patch. Requires a valid Google Chat OAuth2 connection.`,
    params: [
      {
        name: 'message_id',
        type: 'string',
        required: true,
        description: `The unique ID of the message to update (the segment after 'messages/' in the message resource name). If a custom ID was set when the message was created, use that custom ID here.`,
      },
      {
        name: 'space_id',
        type: 'string',
        required: true,
        description: `The unique ID of the space the message belongs to (the segment after 'spaces/' in the space resource name)`,
      },
      {
        name: 'update_mask',
        type: 'string',
        required: true,
        description: `Required. Comma-separated list of field paths to update, or '*' to update all supported paths. Supported paths: text, attachment, cards, cards_v2 (requires app authentication), accessory_widgets (requires app authentication), quoted_message_metadata (removal only).`,
      },
      {
        name: 'allow_missing',
        type: 'boolean',
        required: false,
        description: `If true and the message isn't found, a new message is created and update_mask is ignored. The message_id must be client-assigned or the request fails.`,
      },
      {
        name: 'cards_v2',
        type: 'array',
        required: false,
        description: `New array of Card objects for rich content (requires app authentication). Only applied if 'cards_v2' is included in update_mask. Each item has the shape {"cardId": "...", "card": {...}}. Passed through as raw JSON.`,
      },
      {
        name: 'text',
        type: 'string',
        required: false,
        description: `New plain-text body for the message. Only applied if 'text' is included in update_mask.`,
      },
    ],
  },
  {
    name: 'googlechat_update_section',
    description: `Update the display name of an existing custom section in Google Chat. Returns the updated section object. Only sections of type CUSTOM_SECTION can be updated, and the only currently supported field path is 'displayName'; use list_sections first to find the section_id. Known limitation: this endpoint has no fallback scope -- it strictly requires chat.users.sections, which is not currently offered in the standard Google Cloud Console OAuth consent screen scope picker (observed directly; likely a Developer-Preview-gated scope on Google's side). Calls will fail with an insufficient-scope/permission error until Google exposes it for this project.`,
    params: [
      {
        name: 'display_name',
        type: 'string',
        required: true,
        description: `New display name for the section. Supports up to 80 characters.`,
      },
      {
        name: 'section_id',
        type: 'string',
        required: true,
        description: `The unique ID of the CUSTOM_SECTION to update (the segment after 'sections/' in the section resource name). Use list_sections to find it.`,
      },
      {
        name: 'update_mask',
        type: 'string',
        required: true,
        description: `Comma-separated list of field paths to update. The only currently supported field path is 'displayName'.`,
      },
    ],
  },
  {
    name: 'googlechat_update_space',
    description: `Update fields of an existing Google Chat space, such as its display name, description, guidelines, history state, or space type. Returns the updated space resource. You must pass update_mask listing exactly which fields to change — fields you set in the body but omit from update_mask are ignored. Requires a valid Google Chat OAuth2 connection.`,
    params: [
      {
        name: 'space_id',
        type: 'string',
        required: true,
        description: `The unique ID of the space to update (the segment after 'spaces/' in the space resource name)`,
      },
      {
        name: 'update_mask',
        type: 'string',
        required: true,
        description: `Required. Comma-separated list of field paths to update, e.g. 'displayName,spaceDetails.description'. Only the fields listed here are applied. This tool only supports the paths it exposes inputs for: displayName, spaceType, spaceDetails (or spaceDetails.description / spaceDetails.guidelines), and space_history_state. Google's API also accepts access_settings.audience, access_settings.access_permission_settings, and permission_settings.* -- but this tool has no input fields for those and does not send them, so do NOT include them here: naming an update_mask path with no corresponding value in the request body can clear/reset that setting instead of leaving it unchanged.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New description for the space (spaceDetails.description), up to 150 characters. When updating space_details, pass both description and guidelines — any field you omit is cleared. Include 'spaceDetails' or 'spaceDetails.description' in update_mask to apply this.`,
      },
      {
        name: 'display_name',
        type: 'string',
        required: false,
        description: `New display name for the space. Only supported for spaces where space_type is SPACE. Supports up to 128 characters. Include 'displayName' in update_mask to apply this.`,
      },
      {
        name: 'guidelines',
        type: 'string',
        required: false,
        description: `New guidelines for the space (spaceDetails.guidelines), up to 5,000 characters. When updating space_details, pass both description and guidelines — any field you omit is cleared. Include 'spaceDetails' or 'spaceDetails.guidelines' in update_mask to apply this.`,
      },
      {
        name: 'space_history_state',
        type: 'string',
        required: false,
        description: `New message history setting for the space. Only supported if history settings are enabled for the Google Workspace organization. To update this, update_mask must contain only 'space_history_state' and no other field paths.`,
      },
      {
        name: 'space_type',
        type: 'string',
        required: false,
        description: `New space type. This endpoint only supports changing a GROUP_CHAT space into a SPACE. Include 'spaceType' together with 'displayName' in update_mask, and ensure the space already has (or is given) a non-empty display name.`,
      },
      {
        name: 'use_admin_access',
        type: 'boolean',
        required: false,
        description: `Run this request using the caller's Google Workspace administrator privileges`,
      },
    ],
  },
  {
    name: 'googlechat_update_space_notification_setting',
    description: `Update the calling user's notification setting or mute setting for a Google Chat space. Returns the updated SpaceNotificationSetting object. Use update_space_notification_setting to change how you're notified for a space; call get_space_notification_setting first to see the current values, and set update_mask to match the fields you provide below. Known limitation: this endpoint has no fallback scope -- it strictly requires chat.users.spacesettings, which is not currently offered in the standard Google Cloud Console OAuth consent screen scope picker (observed directly; likely a Developer-Preview-gated scope on Google's side). Calls will fail with an insufficient-scope/permission error until Google exposes it for this project.`,
    params: [
      {
        name: 'space_id',
        type: 'string',
        required: true,
        description: `The unique ID of the space (the segment after 'spaces/' in the space resource name)`,
      },
      {
        name: 'update_mask',
        type: 'string',
        required: true,
        description: `Comma-separated list of field paths to update. Supported paths are 'notificationSetting' and 'muteSetting'. Set this to match whichever of Notification Setting and Mute Setting you provide below, e.g. 'notificationSetting' or 'notificationSetting,muteSetting'.`,
      },
      {
        name: 'mute_setting',
        type: 'string',
        required: false,
        description: `New mute setting for the space. MUTED suppresses all notifications for this space regardless of notification_setting; UNMUTED allows notifications according to notification_setting. Include 'muteSetting' in update_mask when setting this.`,
      },
      {
        name: 'notification_setting',
        type: 'string',
        required: false,
        description: `New notification setting for the space. ALL notifies on every message; MAIN_CONVERSATIONS notifies on @mentions, followed threads, and new threads (not available for 1:1 direct messages); FOR_YOU notifies on @mentions and followed threads only (not available for 1:1 direct messages); OFF disables notifications. Include 'notificationSetting' in update_mask when setting this.`,
      },
    ],
  },
  {
    name: 'googlechat_update_space_read_state',
    description: `Update the calling user's read state for a Google Chat space by setting last_read_time, used to mark the space's top-level conversation as read or unread. Returns the updated read state object. Setting last_read_time to a time at or after the latest message marks the space read; replies in threads are unaffected and use update_space_read_state's thread-level counterpart instead.`,
    params: [
      {
        name: 'last_read_time',
        type: 'string',
        required: true,
        description: `The new last-read timestamp for the space, as an RFC3339 datetime string. To mark the space as read, set this to a value at or after the latest message's create time; the server coerces it to match the latest message time.`,
      },
      {
        name: 'space_id',
        type: 'string',
        required: true,
        description: `The unique ID of the space to update the calling user's read state for (the segment after 'spaces/' in the space resource name). This tool always updates the state for the calling user (the 'me' alias).`,
      },
      {
        name: 'update_mask',
        type: 'string',
        required: true,
        description: `Comma-separated list of field paths to update. Currently the only supported field path is 'lastReadTime'.`,
      },
    ],
  },
  {
    name: 'googlechat_update_user_availability',
    description: `Update the authenticated user's custom status message in Google Chat, with an optional emoji and expiration. Returns the updated Availability object reflecting the new custom status. Use update_user_availability to set or change a custom status message (e.g. 'In a meeting'); use mark_user_active, mark_user_away, or mark_user_do_not_disturb instead to change the user's overall availability state rather than the status text.`,
    params: [
      {
        name: 'status_text',
        type: 'string',
        required: true,
        description: `The text of the custom status message, shown next to the user's name in Google Chat. Maximum length is 64 characters. Required when setting a custom status.`,
      },
      {
        name: 'update_mask',
        type: 'string',
        required: true,
        description: `The list of fields to update on the user's availability. The only field that can currently be updated through this method is 'customStatus', so this should always be set to 'customStatus'.`,
      },
      {
        name: 'expire_time',
        type: 'string',
        required: false,
        description: `The timestamp when the custom status expires, as an RFC3339 datetime (e.g. 2026-08-27T18:00:00Z). After this time the custom status is cleared. Confirmed via live testing: Google rejects a custom status with no expiration at all ('Custom status must have an expiration') -- you MUST set either expire_time or ttl (not both).`,
      },
      {
        name: 'status_emoji',
        type: 'string',
        required: false,
        description: `A single Unicode emoji character to display alongside the custom status (e.g. 📅). Only Unicode emoji are supported; custom (uploaded) emoji cannot be used here. Optional.`,
      },
      {
        name: 'ttl',
        type: 'string',
        required: false,
        description: `The time-to-live duration after which the custom status expires, as a string ending in 's' for seconds (e.g. '3600s' for one hour). Input-only alternative to expire_time. Confirmed via live testing: Google rejects a custom status with no expiration at all ('Custom status must have an expiration') -- you MUST set either expire_time or ttl (not both).`,
      },
    ],
  },
  {
    name: 'googlechat_upload_media',
    description: `Upload a file (up to 200MB) as a Google Chat attachment, to be referenced when sending a message.
Known limitation — NOT currently functional: Google's upload endpoint only accepts a true multipart request (a JSON metadata part containing just \`filename\`, plus a separate raw-binary media part, sent as multipart/related with a boundary). The Scalekit tool execution engine sends a single JSON request body and does not support multipart/form-data requests, so there is no way to transmit the binary media part this tool's \`content_base64\` input implies. This tool is kept for API-surface completeness and documents the intended shape, but calls through this connector will not succeed until the execution engine supports true multipart/binary uploads.
Once it works, it would return an UploadAttachmentResponse containing an attachmentDataRef.resourceName that can be attached to a subsequent create-message call.`,
    params: [
      {
        name: 'content_base64',
        type: 'string',
        required: true,
        description: `Base64-encoded contents of the file to upload. Maximum file size is 200MB before base64 encoding. NOT CURRENTLY TRANSMITTED: see this tool's description -- the execution engine has no way to send this as the required multipart binary part, so this field is accepted but has no effect on the real request today.`,
      },
      {
        name: 'filename',
        type: 'string',
        required: true,
        description: `Filename of the attachment, including its file extension (e.g. 'report.pdf'). Certain file types are blocked by Google Chat and will be rejected.`,
      },
      {
        name: 'space_id',
        type: 'string',
        required: true,
        description: `The unique ID of the space (the segment after 'spaces/' in the space resource name) to upload this attachment into.`,
      },
    ],
  },
]
