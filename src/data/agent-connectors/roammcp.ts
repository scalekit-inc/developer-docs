import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'roammcp_asset_create',
    description: `Create a file upload and get back a self-describing instruction for sending the bytes out of band.

This is step 1 of attaching a file (image, PDF, document, etc.) to a chat message, posting a story, **or** hosting an avatar image. Files are **not** sent through this tool — only metadata. The bytes are uploaded directly to the returned URL, so they never pass through the model.

Flow:

1. Call \`asset_create\` with the file \`name\` (include the extension, e.g. \`photo.png\`) and, if known, the \`size\` in bytes. For stories pass \`purpose: "story"\`. For avatars pass \`purpose: "avatar"\` and \`size\` (required, max 10 MiB).
2. The response contains \`assetId\`, \`uploadUrl\`, \`uploadMethod\`, and \`uploadHeaders\`. Avatar responses also include \`imageUrl\`. Upload the raw file bytes in a **single request**: use \`uploadMethod\` (a \`POST\`) against \`uploadUrl\`, send every header in \`uploadHeaders\`, and put the file bytes in the request body.
3. After the upload returns success:
   - **Chat attachment:** pass the \`assetId\` to \`chat_post\` via its \`assetIds\` argument.
   - **Story:** pass the \`assetId\` to \`story_post\` (wait until processing completes if needed).
   - **Avatar:** pass \`imageUrl\` as \`sender.imageUrl\` on \`chat_post\`, or as \`hosts[].imageUrl\` on \`onair_event_create\` / \`onair_event_update\`. Wait a few seconds for image processing (the URL 404s until the asset is ready).

Parameters:
- name (required): File name including extension.
- size (optional): File size in bytes (recommended). Required for \`purpose: "avatar"\` (max 10 MiB).
- purpose (optional): \`"file"\` (default) for chat attachments, \`"story"\` for story media (personal tokens only), or \`"avatar"\` for Roam-hosted profile/host images.

Notes:

- Send all \`uploadHeaders\` exactly as given. They authorize the upload and select the single-request upload protocol; omitting them will cause the upload to fail.
- The upload URL is short-lived. If it expires, call \`asset_create\` again for a fresh one.
- Processing (thumbnails, previews, avatar WebP, etc.) happens automatically once the bytes land; you do not need a separate "complete" or "finish" call.
- Story-purpose assets expire after 48 hours (24h story lifetime plus a posting window). Post with \`story_post\` well before that, or create a new asset.
- \`sender.imageUrl\` and On-Air \`hosts.imageUrl\` must be a Roam-hosted avatar URL. Create one with \`purpose: "avatar"\` rather than linking a third-party image.
`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The file name including its extension, e.g. "report.pdf" or "photo.png". Roam uses the extension to infer the file's content type and to generate previews or thumbnails after upload.`,
      },
      {
        name: 'purpose',
        type: 'string',
        required: false,
        description: `What the uploaded file is for: "file" (default) for a chat message attachment, "story" for story media (personal tokens only), or "avatar" for a Roam-hosted profile or host image. Choosing "avatar" makes size required and adds an imageUrl to the response.`,
      },
      {
        name: 'size',
        type: 'integer',
        required: false,
        description: `The file size in bytes. Optional but recommended for ordinary chat/story attachments; required when purpose is "avatar", where uploads are capped at 10 MiB.`,
      },
    ],
  },
  {
    name: 'roammcp_calendar_event_create',
    description: `Create a new calendar event on the authenticated user's calendar. Automatically adds a Roam meeting link and sends email notifications to attendees.`,
    params: [
      {
        name: 'end',
        type: 'string',
        required: true,
        description: `The event's end time as an RFC3339 datetime, e.g. "2026-09-15T15:00:00Z".`,
      },
      {
        name: 'start',
        type: 'string',
        required: true,
        description: `The event's start time as an RFC3339 datetime, e.g. "2026-09-15T14:00:00Z".`,
      },
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `The event's title, shown on the calendar and in invite emails sent to attendees.`,
      },
      {
        name: 'allDay',
        type: 'boolean',
        required: false,
        description: `Whether this is an all-day event with no specific start/end time of day. Defaults to false.`,
      },
      {
        name: 'attendees',
        type: 'array',
        required: false,
        description: `Attendees to invite, each as an email address or a "Name <email>" string. Each attendee receives an email notification containing the Roam meeting link.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Free-text description or agenda for the event, included in the calendar invite sent to attendees.`,
      },
      {
        name: 'host',
        type: 'string',
        required: false,
        description: `The host's email address. Required when calling with a bot or org token; optional for personal tokens, where it defaults to the authenticated user.`,
      },
      {
        name: 'rrule',
        type: 'string',
        required: false,
        description: `An iCalendar RFC 5545 recurrence rule describing how the event repeats, e.g. "FREQ=WEEKLY;COUNT=10" for ten weekly occurrences.`,
      },
      {
        name: 'timeZone',
        type: 'string',
        required: false,
        description: `The IANA time zone the start and end times should be interpreted in, e.g. "America/New_York". Required for recurring events (when rrule is set) and recommended for every event to avoid ambiguity.`,
      },
    ],
  },
  {
    name: 'roammcp_calendar_list',
    description: `List scheduled calendar events within a date range from the user's connected calendars (Google Calendar, Outlook). Returns upcoming meetings with times, attendees, and recurrence info. Note: returns scheduled events, not completed meeting transcripts — use meeting_list for transcripts.`,
    params: [
      {
        name: 'endDate',
        type: 'string',
        required: false,
        description: `End of the date range to list events for, as a YYYY-MM-DD date. Defaults to startDate plus 7 days.`,
      },
      {
        name: 'startDate',
        type: 'string',
        required: false,
        description: `Start of the date range to list events for, as a YYYY-MM-DD date. Defaults to today in the user's time zone.`,
      },
    ],
  },
  {
    name: 'roammcp_chat_delete',
    description: `Delete a bot message. Specify the message by chatId and timestamp. Idempotent. Requires a bot token or a personal token with useBotIdentity=true.`,
    params: [
      {
        name: 'chatId',
        type: 'string',
        required: true,
        description: `The UUID of the chat conversation the message belongs to.`,
      },
      {
        name: 'timestamp',
        type: 'string',
        required: true,
        description: `The RFC3339 timestamp (with microsecond precision) of the message to delete, exactly as returned by chat_history or chat_search.`,
      },
      {
        name: 'threadTimestamp',
        type: 'string',
        required: false,
        description: `The RFC3339 timestamp of the thread's root message, if the message being deleted is a reply in a thread. Omit for a main-channel message.`,
      },
    ],
  },
  {
    name: 'roammcp_chat_history',
    description: `Read messages from a specific chat conversation.

A chat target is required — provide exactly one of chatId, groupId, or userIds:
- chatId: UUID of an existing conversation (from chat_list results)
- groupId: UUID of a group (from group_list results) — reads the group's channel
- userIds: UUID(s) of users — opens or creates a DM conversation

When "after" is specified, returns messages in forward chronological order (oldest first).
Otherwise, returns messages in reverse chronological order (newest first).

Parameters:
- chatId (optional): UUID of a chat conversation
- groupId (optional): UUID of a group
- userIds (optional): Array of user UUIDs for a DM
- threadTimestamp (optional): Thread root RFC3339 datetime (from a prior message's \`timestamp\`) to read thread replies
- before (optional): Only messages before this time (RFC3339)
- after (optional): Only messages after this time (RFC3339)
- ascending (optional): Sort ascending by time (true/false)
- limit (optional): Max messages per page (max 200)
- cursor (optional): Pagination cursor from a previous response

Each returned message carries:
- \`timestamp\` — RFC3339 send time (with microsecond precision). Pass back into chat_post, chat_update, chat_delete, reaction_* as-is.
- \`threadTimestamp\` — RFC3339 thread root (only on replies / when replying to a thread).
- \`userId\` — UUID of the sender (resolve via the response envelope's \`addresses\` map; see below).
- \`text\` — canonical message text with Slack-syntax mention tokens: \`<@uuid>\` for principals (users and bots), \`<!subteam^uuid>\` for groups and channels, and \`<!channel>\` for the broadcast. Tokens are never rewritten by the server.
- \`mentions\` — flat list of payloads referenced by mention tokens in \`text\`: bare address UUIDs (from both \`<@uuid>\` and \`<!subteam^uuid>\` tokens) and the literal \`"all"\` for \`<!channel>\`. Order-preserving and deduplicated. Always present when \`text\` contains mentions; use this to know what was mentioned without re-parsing the regex.

The response envelope additionally carries an \`addresses\` map keyed by UUID — every sender and mention-target address referenced on this page, with display name, type (\`user\`/\`bot\`/\`userGroup\`/\`standardGroup\`/\`meetingGroup\`/\`teamRoam\`), and type-specific fields (e.g. \`botCode\`, \`email\`, \`isGuest\`). Use it to render display names: replace \`<@<uuid>>\` and \`<!subteam^<uuid>>\` in \`text\` with \`@\` + \`addresses.<uuid>.displayName\`, and \`<!channel>\` with \`@all\`. The map omits IDs the caller is not authorized to view (cross-roam bots, private cross-account groups, etc.) — render those as \`@unknown\`.

To look up a message from a Roam chat link URL, use resolve_chat_link instead of parsing the URL yourself. To get a shareable link to a message, use create_chat_link instead of constructing the URL yourself.
`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Only return messages sent after this RFC3339 timestamp. When set, results are returned oldest-first instead of newest-first.`,
      },
      {
        name: 'ascending',
        type: 'string',
        required: false,
        description: `Whether to sort results ascending by time (oldest first), passed as the string "true" or "false". If omitted, results are newest-first unless after is set.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Only return messages sent before this RFC3339 timestamp.`,
      },
      {
        name: 'chatId',
        type: 'string',
        required: false,
        description: `The UUID of an existing chat conversation to read, from chat_list results. Provide exactly one of chatId, groupId, or userIds to identify the conversation.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response, used to fetch the next page of messages.`,
      },
      {
        name: 'groupId',
        type: 'string',
        required: false,
        description: `The UUID of a group/channel to read, from group_list results — reads that group's channel. Provide exactly one of chatId, groupId, or userIds.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of messages to return per page (max 200).`,
      },
      {
        name: 'threadTimestamp',
        type: 'string',
        required: false,
        description: `The RFC3339 timestamp of a thread's root message (from a prior message's timestamp field), to read that thread's replies instead of the main channel.`,
      },
      {
        name: 'userIds',
        type: 'array',
        required: false,
        description: `One or more user UUIDs identifying a direct message conversation to read, opening or creating it if needed. Provide exactly one of chatId, groupId, or userIds.`,
      },
    ],
  },
  {
    name: 'roammcp_chat_list',
    description: `List your recent conversations (DMs and groups), sorted by most recent activity.
`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response, used to fetch the next page of conversations.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of conversations to return per page. Defaults to 10.`,
      },
    ],
  },
  {
    name: 'roammcp_chat_post',
    description: `Send a message to a chat conversation. Messages are delivered asynchronously by default, or can be scheduled for later with \`sendAt\`.

Messages are sent as the bot persona associated with this token.

Specify exactly one of chatId, groupId, or userIds to identify the target:
- chatId: UUID of an existing conversation (from chat_list results)
- groupId: UUID of a group (from group_list results) — sends to the group's channel
- userIds: UUID(s) of users — sends a DM (creates the conversation if needed)

Parameters:
- chatId (optional): UUID of a chat conversation
- groupId (optional): UUID of a group
- userIds (optional): Array of user UUIDs for a DM
- text (required): Message text (markdown by default — set markdown=false for plain text)
- threadTimestamp (optional): Reply to a thread (group chats only, not DMs) — use a \`timestamp\` value from chat_history results
- blocks (optional): Block Kit blocks for rich formatting
- items (optional): Item IDs to attach
- sender (optional): Override the bot sender's name and image. \`sender.imageUrl\` must be a Roam-hosted avatar URL.
- sendAt (optional): RFC3339 datetime on a 15-minute UTC boundary (:00/:15/:30/:45), up to 30 days ahead. Incompatible with sync, poll, threadKey, and replyTimestamp. When set, the response is \`{chatId, scheduledMessageId, sendAt}\` instead of a message timestamp.
`,
    params: [
      {
        name: 'text',
        type: 'string',
        required: true,
        description: `The message text to send. Rendered as Markdown by default; set markdown to false to send it as plain text.`,
      },
      {
        name: 'assetIds',
        type: 'array',
        required: false,
        description: `Asset IDs returned by asset_create to attach as files to this message. Upload the file's bytes to the asset's uploadUrl before sending.`,
      },
      {
        name: 'blocks',
        type: 'array',
        required: false,
        description: `Block Kit blocks for rich, structured message formatting, as an array of block objects.`,
      },
      {
        name: 'chatId',
        type: 'string',
        required: false,
        description: `The UUID of an existing chat conversation to post into, from chat_list results. Provide exactly one of chatId, groupId, or userIds to identify the target.`,
      },
      {
        name: 'color',
        type: 'string',
        required: false,
        description: `A color accent for the message, either a hex code or one of the named values good, danger, or warning.`,
      },
      {
        name: 'groupId',
        type: 'string',
        required: false,
        description: `The UUID of a group/channel to post into, from group_list results — sends to the group's main channel. Provide exactly one of chatId, groupId, or userIds.`,
      },
      {
        name: 'items',
        type: 'array',
        required: false,
        description: `Item IDs to attach to the message as references to existing workspace items.`,
      },
      {
        name: 'markdown',
        type: 'boolean',
        required: false,
        description: `Whether to interpret text as Markdown (bold, links, code, etc.). Defaults to true; set to false to send plain text verbatim.`,
      },
      {
        name: 'sendAt',
        type: 'string',
        required: false,
        description: `Schedule the message to send later instead of immediately. Must be an RFC3339 datetime on a 15-minute UTC boundary (:00, :15, :30, or :45), up to 30 days in the future. Incompatible with sync, threadKey, and replying to a thread. When set, the response returns a scheduledMessageId instead of a message timestamp.`,
      },
      {
        name: 'sender',
        type: 'object',
        required: false,
        description: `Override the bot's displayed sender identity for this message. imageUrl, if set, must be a Roam-hosted avatar URL created via asset_create with purpose avatar.`,
      },
      {
        name: 'sync',
        type: 'boolean',
        required: false,
        description: `Whether to wait for delivery confirmation before returning. Defaults to false (fire-and-forget).`,
      },
      {
        name: 'threadKey',
        type: 'string',
        required: false,
        description: `An idempotency key used when starting a new thread, to avoid creating duplicate threads if the call is retried.`,
      },
      {
        name: 'threadTimestamp',
        type: 'string',
        required: false,
        description: `Reply into an existing thread by passing the RFC3339 timestamp of the thread's root message, from chat_history results. Only supported in group chats, not DMs.`,
      },
      {
        name: 'userIds',
        type: 'array',
        required: false,
        description: `One or more user UUIDs to send a direct message to; the conversation is created if it doesn't already exist. Provide exactly one of chatId, groupId, or userIds.`,
      },
    ],
  },
  {
    name: 'roammcp_chat_scheduled_cancel',
    description: `Cancel a pending scheduled message before it is sent, by the scheduledMessageId returned from chat_post. Only messages scheduled by this credential's bot identity can be canceled; already-sent messages return scheduled_message_already_sent.`,
    params: [
      {
        name: 'scheduledMessageId',
        type: 'string',
        required: true,
        description: `The UUID of the scheduled message to cancel, as returned in the scheduledMessageId field of chat_post's response when sendAt was set. Only messages scheduled by this credential's own bot identity can be canceled.`,
      },
    ],
  },
  {
    name: 'roammcp_chat_scheduled_list',
    description: `List pending messages scheduled via chat_post's sendAt that have not been sent yet. Only messages scheduled by this credential's bot identity are returned, ascending by sendAt. Supports an optional chatId filter, sendAt range filtering, and pagination.`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Only return messages scheduled to send after this RFC3339 timestamp.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Only return messages scheduled to send before this RFC3339 timestamp.`,
      },
      {
        name: 'chatId',
        type: 'string',
        required: false,
        description: `Only return scheduled messages targeting this chat UUID.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response, used to fetch the next page of scheduled messages.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of scheduled messages to return per page.`,
      },
    ],
  },
  {
    name: 'roammcp_chat_search',
    description: `Search chat messages matching a query and filters.

This tool searches **across every chat the caller can see** (subject to chatTypes), so it is the right tool for a workspace-wide pulse — what is going on across all conversations, not just one. Prefer it over fanning out per-chat with chat_history when you want broad situational awareness.

By default, searches every indexed chat type the caller can see — DMs, channels, teamRoam, and meeting channels (Magic Minutes summaries and other meeting-channel posts). Use chatTypes to narrow to specific types.
To list recent messages across chats without a search query, use sort: "recent" with an empty query.

Examples:
- Search all chats: {"query": "budget report"}
- List recent activity across the workspace: {"sort": "recent"}
- List recent teamRoam messages: {"sort": "recent", "chatTypes": ["teamRoam"]}
- List recent DMs: {"sort": "recent", "chatTypes": ["address"]}
- Drop noisy automated channels: {"sort": "recent", "excludeChatIds": ["<chatId-from-prior-result>"]}
- Drop a noisy bot sender: {"sort": "recent", "excludeUserIds": ["<userId-from-prior-result>"]}

When summarizing recent activity, follow a two-pass workflow:
1. First pass: call chat_search with sort: "recent" and no exclusions to see who is posting where.
2. If a small number of chats or senders dominate the results with automated/bot noise (CI bots, deploy bots, alert webhooks, etc.), call chat_search again with those chat IDs in excludeChatIds and/or those sender userIds in excludeUserIds. The second pass should surface human conversation.

Parameters:
- query (optional): Search text
- chatTypes (optional): Filter by chat type — array of "channel", "teamRoam", "address", or "meetingChannel" (default: all indexed types).
- in (optional): Group names to search within
- from (optional): Sender email addresses
- with (optional): Conversation participant emails
- excludeChatIds (optional): Chat IDs to exclude. Populate from the chatId field on prior results to drop automated/noisy channels.
- excludeUserIds (optional): Sender user IDs to exclude. Populate from the \`userId\` field on prior results to drop automated/bot senders.
- before/after (optional): Date filters (YYYY-MM-DD). Both are optional — omit both to search all time. Never set before and after to the same date (returns nothing). Dates are treated as midnight, so to search a single day like 2024-04-14, use after: "2024-04-14" and before: "2024-04-15".
- has (optional): "mention" or "item"
- sort (optional): "relevant" (default) or "recent". For recent messages with no query, prefer sort "recent" with no date filters.
- limit (optional): Max results per page
- cursor (optional): Pagination cursor from previous response

Each returned message carries:
- \`timestamp\` — RFC3339 send time (with microsecond precision). Pass back into chat_post, chat_update, chat_delete, reaction_* as-is.
- \`threadTimestamp\` — RFC3339 thread root (only on replies / when replying to a thread).
- \`userId\` — UUID of the sender (resolve via the response envelope's \`addresses\` map; see below).
- \`text\` — canonical message text with Slack-syntax mention tokens: \`<@uuid>\` for principals (users and bots), \`<!subteam^uuid>\` for groups and channels, and \`<!channel>\` for the broadcast. Tokens are never rewritten by the server.
- \`mentions\` — flat list of payloads referenced by mention tokens in \`text\`: bare address UUIDs (from both \`<@uuid>\` and \`<!subteam^uuid>\` tokens) and the literal \`"all"\` for \`<!channel>\`. Order-preserving and deduplicated.

The response envelope additionally carries an \`addresses\` map keyed by UUID — every sender and mention-target address referenced on this page, with display name, type (\`user\`/\`bot\`/\`userGroup\`/\`standardGroup\`/\`meetingGroup\`/\`teamRoam\`), and type-specific fields (e.g. \`botCode\`, \`email\`, \`isGuest\`). Replace \`<@<uuid>>\` and \`<!subteam^<uuid>>\` in \`text\` with \`@\` + \`addresses.<uuid>.displayName\` to render, and \`<!channel>\` with \`@all\`. The map omits IDs the caller is not authorized to view (cross-roam bots, private cross-account groups, etc.) — render those as \`@unknown\`.

For excludeUserIds, pass the \`userId\` field from a prior result (matches the wire shape).
`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Only include messages sent after this date (YYYY-MM-DD, treated as midnight). Optional; omit both before and after to search all time.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Only include messages sent before this date (YYYY-MM-DD, treated as midnight). Optional; omit both before and after to search all time. Never set before and after to the same date, since the range would be empty.`,
      },
      {
        name: 'chatTypes',
        type: 'array',
        required: false,
        description: `Restrict results to specific chat types: channel, teamRoam, address (DMs), or meetingChannel (Magic Minutes and other meeting-channel posts). Defaults to searching all indexed types the caller can see.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response, used to fetch the next page of results.`,
      },
      {
        name: 'excludeChatIds',
        type: 'array',
        required: false,
        description: `Chat UUIDs to exclude from results, typically populated from the chatId field of a prior noisy/automated result to drop that channel on a follow-up search.`,
      },
      {
        name: 'excludeUserIds',
        type: 'array',
        required: false,
        description: `Sender user UUIDs to exclude from results, typically populated from the userId field of a prior result to drop a noisy bot or automated sender on a follow-up search.`,
      },
      {
        name: 'from',
        type: 'array',
        required: false,
        description: `Restrict results to messages sent by these sender email addresses.`,
      },
      {
        name: 'has',
        type: 'array',
        required: false,
        description: `Restrict results to messages that have a mention or an attached item.`,
      },
      {
        name: 'in',
        type: 'array',
        required: false,
        description: `Restrict the search to messages within these group/channel names.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return per page.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Free-text search query to match against message content across the caller's visible chats. Leave empty (with sort set to recent) to list recent activity instead of searching.`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `How to order results: relevant (default) ranks by relevance to query, recent sorts newest-first. Use recent with an empty query to list recent activity across chats.`,
      },
      {
        name: 'with',
        type: 'array',
        required: false,
        description: `Restrict results to conversations that include these participant email addresses.`,
      },
    ],
  },
  {
    name: 'roammcp_chat_update',
    description: `Update a bot message's content. Specify the message by chatId and timestamp. Supports text, markdown, block kit, and attachments. Requires a bot token or a personal token with useBotIdentity=true.`,
    params: [
      { name: 'chatId', type: 'string', required: true, description: `Chat ID (UUID)` },
      {
        name: 'timestamp',
        type: 'string',
        required: true,
        description: `Message RFC3339 datetime (e.g. 2026-04-22T13:04:57.123456Z)`,
      },
      {
        name: 'assetIds',
        type: 'array',
        required: false,
        description: `Asset IDs from asset_create to attach`,
      },
      { name: 'blocks', type: 'array', required: false, description: `Block Kit blocks` },
      {
        name: 'color',
        type: 'string',
        required: false,
        description: `Message color (hex or good/danger/warning)`,
      },
      { name: 'items', type: 'array', required: false, description: `Item IDs (attachments)` },
      {
        name: 'markdown',
        type: 'boolean',
        required: false,
        description: `Treat text as markdown (default true)`,
      },
      { name: 'text', type: 'string', required: false, description: `Updated message text` },
      {
        name: 'threadTimestamp',
        type: 'string',
        required: false,
        description: `Thread RFC3339 datetime (omit for a main-channel message)`,
      },
    ],
  },
  {
    name: 'roammcp_conversation_list',
    description: `List conversations from the workspace's attendance/reporting log, with per-participant time-in-conversation detail. Supports date range filtering and pagination.

WHEN TO USE THIS TOOL:
- Use for attendance and usage questions: "who was in meetings yesterday", "how long did we spend in huddles last week", "which rooms get used".
- Unlike meeting_list (which is transcript-oriented), conversation_list covers every conversation — including short huddles and calls without a transcript or recording — and reports how long each participant was present.
- For meeting content (summaries, transcripts, action items), use meeting_list / meeting_info / meeting_transcript instead.

WHAT IT RETURNS:
- One entry per conversation: id, place, room, roomType, start/end times, and meetingLinkIds when the room was booked through a meeting link.
- participants: each participant's name and total seconds in the conversation. Requires the user:read scope; emails additionally require user:read.email.

ACCESS:
- Org tokens list every conversation in the workspace (requires broad meeting access).
- Personal tokens list only conversations the token owner participated in. A page may then contain fewer than \`limit\` matches (even zero) while more history remains — keep following nextCursor until it is empty.

Parameters:
- after (optional): RFC3339 datetime; only conversations after this time (switches results to ascending order)
- before (optional): RFC3339 datetime; only conversations before this time
- limit (optional): Max conversations per page (default 10, max 100)
- cursor (optional): Pagination cursor from a previous response's nextCursor
- expand (optional): Comma-separated extra fields. "ip" adds each participant's client IP address (org tokens only).
`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `RFC3339 datetime, conversations after this time (switches to ascending order)`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `RFC3339 datetime, conversations before this time`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response`,
      },
      {
        name: 'expand',
        type: 'string',
        required: false,
        description: `Comma-separated extra fields: ip (participant IP addresses; org tokens only)`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Results per page (default 10, max 100)`,
      },
    ],
  },
  {
    name: 'roammcp_create_chat_link',
    description: `Create a shareable Roam link to a specific chat message.

WHEN TO USE THIS TOOL:
- When a user asks for a link to a message so they can share or reference it
- To turn a message found via chat_history or chat_search into a URL that opens that message in Roam

Parameters:
- chatId, groupId, or userIds (exactly one required): the chat containing the message
- timestamp (required): the message's timestamp in Unix microseconds
- threadTimestamp (optional): the thread root's timestamp, required when the message is a thread reply

The message must exist and be readable by this credential; otherwise the call fails and no link is returned. Returns the link URL along with the resolved chatId and timestamps. The link identifies the message but does not grant access — recipients see it only if they are members of the chat.
`,
    params: [
      {
        name: 'timestamp',
        type: 'integer',
        required: true,
        description: `Message timestamp in Unix microseconds, as returned by chat_history or chat_search.`,
      },
      {
        name: 'chatId',
        type: 'string',
        required: false,
        description: `Chat ID (UUID) containing the message. Exactly one of chatId, groupId, or userIds is required.`,
      },
      {
        name: 'groupId',
        type: 'string',
        required: false,
        description: `Group ID (UUID) whose channel chat contains the message.`,
      },
      {
        name: 'threadTimestamp',
        type: 'integer',
        required: false,
        description: `Thread root timestamp in Unix microseconds. Required when the message is a thread reply.`,
      },
      {
        name: 'userIds',
        type: 'array',
        required: false,
        description: `User ID(s) (UUIDs) identifying the DM or group DM containing the message.`,
      },
    ],
  },
  {
    name: 'roammcp_get_me',
    description: `Get the authenticated user's identity: \`id\`, \`name\`, and (when the token has the \`user:read.email\` scope) \`email\`. This is a projection over \`token.info\` that returns only the user object — useful for quickly answering "who am I" without parsing the full token payload. For org tokens, returns the bot identity.
`,
    params: [],
  },
  {
    name: 'roammcp_group_create',
    description: `Create a new group/channel with initial members.`,
    params: [
      {
        name: 'members',
        type: 'array',
        required: true,
        description: `Initial members with roles, as an array of {userId, role} objects. userId is the member's UUID; role is "member" (default) or "admin".`,
      },
      { name: 'name', type: 'string', required: true, description: `Group name (max 64 chars)` },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Group description (max 1024 chars)`,
      },
      {
        name: 'enforceThreads',
        type: 'boolean',
        required: false,
        description: `Enforce threaded messages`,
      },
      {
        name: 'private',
        type: 'boolean',
        required: false,
        description: `Whether group is private`,
      },
    ],
  },
  {
    name: 'roammcp_group_info',
    description: `Get information about a group/channel by ID or name.`,
    params: [
      { name: 'id', type: 'string', required: false, description: `Group ID (UUID)` },
      { name: 'name', type: 'string', required: false, description: `Group name (exact match)` },
    ],
  },
  {
    name: 'roammcp_group_join',
    description: `Join a public group/channel as the calling identity. Org tokens join as the bot; personal tokens join as the owner. Private groups cannot be joined. Idempotent if already a member.`,
    params: [{ name: 'id', type: 'string', required: true, description: `Group ID (UUID)` }],
  },
  {
    name: 'roammcp_group_list',
    description: `List non-archived groups/channels in your workspace, visible to the authenticated user.
Use the returned group IDs with chat_history (groupId) to read messages, or chat_post (groupId) to send messages.

Group types:
- "standard": user-created chat channels (like Slack channels). Most groups are this type.
- "magicast": AI-generated channels.
- "meeting": auto-created for recorded meetings, named after the meeting.
- "roam": the automatic all-hands group for the workspace (one per workspace).
- "onair": on-air event groups.
`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Page limit (default 50, max 100)`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Case-insensitive name search, ranked by match quality`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Comma-separated group types to include: standard, magicast, meeting, roam, onair`,
      },
    ],
  },
  {
    name: 'roammcp_lobby_booking_list',
    description: `List all bookings for a specific lobby. Supports date range filtering and pagination.`,
    params: [
      {
        name: 'lobbyId',
        type: 'string',
        required: true,
        description: `Lobby configuration ID (UUID)`,
      },
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Return bookings after this time`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Return bookings before this time`,
      },
      { name: 'cursor', type: 'string', required: false, description: `Pagination cursor` },
      { name: 'limit', type: 'integer', required: false, description: `Max bookings to return` },
    ],
  },
  {
    name: 'roammcp_lobby_list',
    description: `List all lobbies configured for the authenticated account. Optionally filter by handle.`,
    params: [
      {
        name: 'handle',
        type: 'string',
        required: false,
        description: `Filter lobbies by handle slug`,
      },
    ],
  },
  {
    name: 'roammcp_magicast_info',
    description: `Get a Magicast by ID, including transcript cues, chapters, duration, video status, a signed video download URL when ready, and an existing share URL if one has already been minted. Does not create a share link.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The Magicast ID (UUID) to look up, e.g. one returned by List Magicasts.`,
      },
    ],
  },
  {
    name: 'roammcp_magicast_list',
    description: `List Magicasts. Supports date range filtering and pagination. Returns metadata only (id, name, createdAt, owner, cover). Use magicast_info for transcript cues, chapters, and video.`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Only include Magicasts created after this RFC3339 datetime.`,
      },
      {
        name: 'ascending',
        type: 'string',
        required: false,
        description: `Sort results ascending by time when set to "true"; descending (most recent first) when "false" or left blank.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Only include Magicasts created before this RFC3339 datetime.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous List Magicasts response, used to fetch the next page.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of Magicasts to return per page (max 100).`,
      },
    ],
  },
  {
    name: 'roammcp_magicast_share_link',
    description: `Get a shareable player URL for a Magicast, creating the share link if one does not already exist (get-or-create).

WHEN TO USE THIS TOOL:
- Use this when the user wants a link to send someone so they can watch the Magicast in the Roam player.
- Use this AFTER finding a Magicast ID via magicast_list or magicast_info.

IMPORTANT:
- This is NOT a read. It mints a Roam-hosted URL (\`https://<roam>/share/<key>\`) that can be distributed outside Roam. Only call it when the user actually wants a shareable link — reading a Magicast (magicast_info) never creates one.
- Anyone with the returned URL can watch the Magicast (subject to the workspace's share settings), so treat it as a credential and only share it as the user intends.
- It is idempotent: repeat calls for the same Magicast return the same URL rather than minting a new one.
- There is no \`https://ro.am/magicast/<id>\` URL. The player URL is always \`/share/<key>\`.

Parameters:
- id (required): The Magicast ID (UUID) from magicast_list or magicast_info.

Returns:
- id: The Magicast ID.
- url: The shareable URL (e.g. https://<roam>/share/<key>).
`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The Magicast ID (UUID) to create or retrieve a share link for.`,
      },
    ],
  },
  {
    name: 'roammcp_meeting_info',
    description: `Retrieve detailed information about a specific meeting including AI-generated summary, action items, and chapter breakdowns.

WHEN TO USE THIS TOOL:
- Use this AFTER finding a meeting ID via meeting_list or meeting_search
- This provides the AI-generated summary which answers most questions about what was discussed
- Only use meeting_transcript if the summary doesn't contain the specific detail needed

WORKFLOW:
1. First use meeting_list (by date) or meeting_search (by content) to find the meeting
2. Use this tool (meeting_info) with the meeting id to get the summary and chapters
3. If the summary is insufficient, use meeting_transcript for verbatim transcript

Parameters:
- id (required): The meeting ID (UUID) from meeting_list or meeting_search results
- maxParticipants (optional): Max participants to return (default 10)

Returns:
- Meeting title, start time, and participants
- Overall AI-generated summary of the meeting
- Action items: each entry includes \`id\`, \`title\`, \`description\`, \`complete\`, \`assigneeId\` (explicit assignment), \`suggestedAssigneeId\` (AI-suggested assignee address ID), and \`suggestedAssigneeName\` (display name for \`assigneeId\` when set, otherwise the AI-suggested name). On personal access tokens only, also includes \`assignedToMe\` and \`suggestedForMe\` booleans. Skip items with \`complete: true\` unless the user asked for history. Prefer \`assignedToMe: true\`; treat \`suggestedForMe: true\` as a suggestion, not a confirmed assignment.
- Chapters: meetings are divided into topic-based chapters, each with a name, synopsis, and \`start\` (milliseconds since the start of the meeting)
- \`hasVideo\`: whether the meeting was video recorded. \`videoStatus\` says whether that recording can be watched yet: \`available\`, \`processing\` (the upload has not finished — check again shortly), or \`none\` (not recorded). Once \`videoStatus\` is \`available\`, use meeting_share_link to get a shareable link to it.

Note: Transcripts are NOT included here to keep response size manageable. Use meeting_transcript if you need the verbatim transcript.
`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The meeting ID (UUID) to retrieve, from List Meetings or a search result.`,
      },
      {
        name: 'maxParticipants',
        type: 'integer',
        required: false,
        description: `Maximum number of participants to include in the response (default 10).`,
      },
    ],
  },
  {
    name: 'roammcp_meeting_link_create',
    description: `Create a new meeting link with a specified time window and optional host assignment.`,
    params: [
      {
        name: 'end',
        type: 'string',
        required: true,
        description: `End time of the meeting window, as an RFC3339 datetime.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The display name shown for this meeting link.`,
      },
      {
        name: 'start',
        type: 'string',
        required: true,
        description: `Start time of the meeting window, as an RFC3339 datetime.`,
      },
      {
        name: 'host',
        type: 'string',
        required: false,
        description: `Email address of the meeting host. Required when authenticating with a bot or organization token.`,
      },
      {
        name: 'requireUnconfirmedEmail',
        type: 'boolean',
        required: false,
        description: `Whether guests must verify an unconfirmed email address before joining via this link.`,
      },
    ],
  },
  {
    name: 'roammcp_meeting_link_info',
    description: `Get details about a specific meeting link.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The meeting link ID (UUID) to look up.`,
      },
    ],
  },
  {
    name: 'roammcp_meeting_link_update',
    description: `Update an existing meeting link's name and time window.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The meeting link ID (UUID) to update.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Updated display name for the meeting link (max 255 characters).`,
      },
      {
        name: 'end',
        type: 'string',
        required: false,
        description: `Updated end time of the meeting window, as an RFC3339 datetime.`,
      },
      {
        name: 'host',
        type: 'string',
        required: false,
        description: `Host email address, for reference. The host of an existing meeting link cannot be changed.`,
      },
      {
        name: 'requireUnconfirmedEmail',
        type: 'boolean',
        required: false,
        description: `Whether guests must verify an unconfirmed email address before joining via this link.`,
      },
      {
        name: 'start',
        type: 'string',
        required: false,
        description: `Updated start time of the meeting window, as an RFC3339 datetime.`,
      },
    ],
  },
  {
    name: 'roammcp_meeting_list',
    description: `List meeting transcripts with optional date filters and pagination.

WHEN TO USE THIS TOOL:
- Use this tool FIRST when the user asks about meetings
- Start by calling with NO date parameters to get the most recent meetings
- Use the cursor from the response to page backwards through older meetings
- For keyword searches (e.g., "meetings about budgets"), use meeting_search instead

CRITICAL DATE FILTER GUIDANCE:
- For recent requests (e.g., "recent meetings", "today", "yesterday", "this week", "last week"), DO NOT set after/before
- For those requests, call meeting_list without date filters and page backwards with cursor; filter by returned start/end timestamps
- Only set after/before when the user gave explicit calendar boundaries or you need a strict historical window
- Avoid guessing relative dates for after/before

EXPAND FIELDS:
- For broad questions across many recent meetings (action items, weekly recaps, status updates, decision logs), pass \`expand: "summary,actionItems,chapters"\` so each returned item already carries that data.
- This avoids firing one meeting_info per row, which is the slow path. Reserve meeting_info for when you need full detail (participants) on a specific meeting.
- Allowed values are \`summary\`, \`actionItems\`, and \`chapters\`. Pass them as a single comma-separated string.
- When \`actionItems\` is expanded, each entry includes \`id\`, \`complete\`, \`assigneeId\` (explicit assignment), \`suggestedAssigneeId\` (AI suggestion), and \`suggestedAssigneeName\` (display name for \`assigneeId\` when set, otherwise the AI-suggested name). On personal access tokens only, also includes \`assignedToMe\` and \`suggestedForMe\`. Skip \`complete: true\` items unless the user wants history. Prefer \`assignedToMe: true\`; treat \`suggestedForMe: true\` as a suggestion.
- Meetings without a transcript (e.g. very short calls, calls without recording) will simply omit those fields.

WORKFLOW:
1. Call meeting_list (no dates) to get recent meetings. Add \`expand\` if you need cross-meeting content rather than just titles.
2. Use the nextCursor to page backwards if the meeting isn't in the first page.
3. Use meeting_info with the ID for full detail (participants) on a specific meeting, or meeting_transcript for verbatim transcript.

Parameters:
- after (optional): Only include meetings after this time (RFC3339). Prefer leaving unset for recent-period requests.
- before (optional): Only include meetings before this time (RFC3339). Prefer leaving unset for recent-period requests.
- limit (optional): Maximum number of meetings to return
- cursor (optional): Pagination cursor from a previous response to fetch the next page
- expand (optional): Comma-separated extra per-meeting fields: \`summary\`, \`actionItems\`, \`chapters\`. Use this when scanning many meetings at once.

Returns paginated meeting list with meeting name, start/end times, participant count, \`hasVideo\` (whether the meeting was video recorded), and \`videoStatus\` (\`available\`, \`processing\`, or \`none\` — once \`available\`, use meeting_share_link to get a shareable link to the recording). Each meeting includes an id for use with meeting_info and meeting_transcript. When expand is set, each item additionally carries the requested fields.
`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Only include meetings that started after this RFC3339 datetime. Leave unset for recent-period requests.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Only include meetings that started before this RFC3339 datetime. Leave unset for recent-period requests.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous List Meetings response, used to page backwards through older meetings.`,
      },
      {
        name: 'expand',
        type: 'string',
        required: false,
        description: `Comma-separated list of extra per-meeting fields to include: summary, actionItems, chapters.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of meetings to return per page.`,
      },
    ],
  },
  {
    name: 'roammcp_meeting_participants',
    description: `List participants of a meeting with pagination. Returns name, email, and member/guest type.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The meeting ID (UUID) whose participants should be listed.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response's nextCursor, used to fetch the next page of participants.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of participants to return per page (default 50, max 200).`,
      },
    ],
  },
  {
    name: 'roammcp_meeting_prompt',
    description: `Ask a question or give an instruction about a meeting's transcript. Uses AI to answer based on the meeting content.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The meeting ID (UUID) whose transcript the question or instruction applies to.`,
      },
      {
        name: 'prompt',
        type: 'string',
        required: true,
        description: `The question or instruction to answer using the meeting's transcript, e.g. "What decisions were made about the launch date?"`,
      },
    ],
  },
  {
    name: 'roammcp_meeting_search',
    description: `Search meeting recordings by content. Supports natural language queries like "meetings with John last week" or "discussions about the product launch".

WHEN TO USE THIS TOOL:
- Use this when searching for meetings by TOPIC or CONTENT (e.g., "meetings about budgets", "discussions with the marketing team")
- Use this when the user mentions specific keywords or topics they want to find
- For browsing by date only (e.g., "my meeting yesterday"), use meeting_list instead

WORKFLOW:
1. Use meeting_search to find relevant meetings by content/topic
2. Use meeting_info with the result's meetingId (passed as the id parameter) to get detailed summary and chapters
3. If the summary doesn't answer the question, use meeting_transcript for the full transcript

Parameters:
- query (required): Search query for meeting content. Supports:
  - Keywords: "budget review", "product launch"
  - Natural language filters: "meetings with John last week", "calls about hiring in January"
- after (optional): Only include meetings after this date (YYYY-MM-DD)
- before (optional): Only include meetings before this date (YYYY-MM-DD)
- timezone (optional): Timezone for date interpretation (e.g. America/New_York)

Returns meeting results with:
- meetingId (pass this as the id parameter to meeting_info and meeting_transcript)
- Meeting name and date
- Highlighted matches showing where query terms appear in summaries and transcripts
`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Search query for meeting content — keywords (e.g. "budget review") or natural language filters (e.g. "meetings with John last week").`,
      },
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Only include meetings after this date (YYYY-MM-DD). Leave unset to search without a lower bound.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Only include meetings before this date (YYYY-MM-DD). Leave unset to search without an upper bound.`,
      },
      {
        name: 'timezone',
        type: 'string',
        required: false,
        description: `IANA timezone used to interpret the after/before dates (e.g. America/New_York). Defaults to the workspace timezone if omitted.`,
      },
    ],
  },
  {
    name: 'roammcp_meeting_share_link',
    description: `Get a shareable URL for a meeting, creating the share link if one does not already exist (get-or-create).

WHEN TO USE THIS TOOL:
- Use this when the user wants a link to send someone so they can view the meeting (its summary, transcript, and recording) outside the API.
- Use this AFTER finding a meeting ID via meeting_list, meeting_search, or meeting_info.

IMPORTANT:
- This is NOT a read. It mints a Roam-hosted URL that can be distributed outside Roam. Only call it when the user actually wants a shareable link — reading a meeting (meeting_info / meeting_transcript) never creates one.
- Anyone with the returned URL can view the meeting (subject to the workspace's share settings), so treat it as a credential and only share it as the user intends.
- It is idempotent: repeat calls for the same meeting return the same URL rather than minting a new one.

Parameters:
- id (required): The meeting ID (UUID) from meeting_list, meeting_search, or meeting_info results.

Returns:
- id: The meeting ID.
- url: The shareable URL (e.g. https://<roam>/share/<key>).
`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Meeting ID (UUID) from meeting_list, meeting_search, or meeting_info.`,
      },
    ],
  },
  {
    name: 'roammcp_meeting_transcript',
    description: `Retrieve the verbatim transcript for a meeting as WebVTT (timestamped cues with speaker names in \`<v>\` tags).

WHEN TO USE THIS TOOL:
- Use this ONLY when meeting_info's summary doesn't contain the specific detail needed
- Use this when the user needs exact quotes or specific wording from the meeting
- Use this when looking for detailed context not captured in the summary

WORKFLOW:
1. First use meeting_list or meeting_search to find the meeting
2. Use meeting_info to get the summary and chapter list
3. If the summary is insufficient, use this tool for the verbatim transcript

Parameters:
- id (required): The meeting ID (UUID) from meeting_list or meeting_search results

Note: Transcripts can be very long. Prefer meeting_info first — its summary usually answers the question.

ERRORS: A 404 with code \`transcript_pending\` means the meeting is in progress or the transcript is still processing — it will exist soon; do not retry in a tight loop. A 404 with code \`transcript_unavailable\` means the meeting was not transcribed and the transcript will never exist — stop retrying.
`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Meeting ID (UUID) from meeting_list or meeting_search results.`,
      },
    ],
  },
  {
    name: 'roammcp_onair_attendance_list',
    description: `List attendance records for an OnAir event.`,
    params: [
      {
        name: 'eventId',
        type: 'string',
        required: true,
        description: `The OnAir event ID to list attendance records for.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response, used to fetch the next page of results.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of attendance records to return per page.`,
      },
    ],
  },
  {
    name: 'roammcp_onair_event_cancel',
    description: `Cancel an OnAir broadcast event.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The OnAir event ID to cancel.` },
    ],
  },
  {
    name: 'roammcp_onair_event_create',
    description: `Create a new OnAir broadcast event. hosts[].imageUrl must be a Roam-hosted avatar URL from asset_create with purpose "avatar".`,
    params: [
      {
        name: 'calendarHostEmail',
        type: 'string',
        required: true,
        description: `Email address of the calendar host for this event.`,
      },
      { name: 'end', type: 'string', required: true, description: `Event end time (RFC3339).` },
      { name: 'start', type: 'string', required: true, description: `Event start time (RFC3339).` },
      {
        name: 'timeZone',
        type: 'string',
        required: true,
        description: `IANA timezone used to interpret the start/end times (e.g. America/New_York).`,
      },
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `The event's title, shown to guests and on the event page.`,
      },
      {
        name: 'autoAdmit',
        type: 'boolean',
        required: false,
        description: `Whether to automatically admit guests into the broadcast without manual approval.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `A description of the event, shown on the event page.`,
      },
      {
        name: 'disableRSVP',
        type: 'boolean',
        required: false,
        description: `Whether to disable RSVP collection for this event.`,
      },
      {
        name: 'enableSEO',
        type: 'boolean',
        required: false,
        description: `Whether to make this event discoverable by search engines.`,
      },
      {
        name: 'hosts',
        type: 'array',
        required: false,
        description: `On-screen hosts for the broadcast. Each host has a display name and, optionally, an avatar image URL that must come from asset_create called with purpose "avatar" — a third-party image link will not work. Example: [{"name": "Jane Doe", "imageUrl": "https://cdn.ro.am/avatars/abc123.png"}]`,
      },
    ],
  },
  {
    name: 'roammcp_onair_event_info',
    description: `Get details about a specific OnAir broadcast event.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The OnAir event ID to retrieve.`,
      },
    ],
  },
  {
    name: 'roammcp_onair_event_list',
    description: `List OnAir broadcast events.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response, used to fetch the next page of results.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Results per page (default 50).`,
      },
    ],
  },
  {
    name: 'roammcp_onair_event_update',
    description: `Update an existing OnAir event. hosts[].imageUrl must be a Roam-hosted avatar URL from asset_create with purpose "avatar".`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The OnAir event ID to update.` },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Updated event description. Leave unset to keep the existing description.`,
      },
      {
        name: 'end',
        type: 'string',
        required: false,
        description: `Updated end time (RFC3339). Leave unset to keep the existing end time.`,
      },
      {
        name: 'hosts',
        type: 'array',
        required: false,
        description: `Replacement list of on-screen hosts for the broadcast. Each host has a display name and, optionally, an avatar image URL that must come from asset_create called with purpose "avatar" — a third-party image link will not work. Leave unset to keep the existing hosts. Example: [{"name": "Jane Doe", "imageUrl": "https://cdn.ro.am/avatars/abc123.png"}]`,
      },
      {
        name: 'start',
        type: 'string',
        required: false,
        description: `Updated start time (RFC3339). Leave unset to keep the existing start time.`,
      },
      {
        name: 'timeZone',
        type: 'string',
        required: false,
        description: `Updated IANA timezone (e.g. America/New_York). Leave unset to keep the existing timezone.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Updated event title. Leave unset to keep the existing title.`,
      },
    ],
  },
  {
    name: 'roammcp_onair_guest_add',
    description: `Add guests to an OnAir event.`,
    params: [
      {
        name: 'eventId',
        type: 'string',
        required: true,
        description: `The OnAir event ID to add guests to.`,
      },
      {
        name: 'guests',
        type: 'array',
        required: true,
        description: `Guests to add. Each entry can include an email address, display name, phone number, and status. Example: [{"email": "guest@example.com", "name": "Jane Doe"}]`,
      },
    ],
  },
  {
    name: 'roammcp_onair_guest_info',
    description: `Get details about an OnAir event guest.`,
    params: [
      {
        name: 'eventId',
        type: 'string',
        required: true,
        description: `ID of the OnAir event the guest belongs to.`,
      },
      { name: 'id', type: 'string', required: true, description: `ID of the guest to look up.` },
    ],
  },
  {
    name: 'roammcp_onair_guest_list',
    description: `List guests for an OnAir event.`,
    params: [
      {
        name: 'eventId',
        type: 'string',
        required: true,
        description: `ID of the OnAir event to list guests for.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Opaque pagination cursor for fetching the next page of results.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of guests to return in one page of results.`,
      },
    ],
  },
  {
    name: 'roammcp_onair_guest_remove',
    description: `Remove a guest from an OnAir event.`,
    params: [
      {
        name: 'eventId',
        type: 'string',
        required: true,
        description: `ID of the OnAir event the guest belongs to.`,
      },
      { name: 'id', type: 'string', required: true, description: `ID of the guest to remove.` },
    ],
  },
  {
    name: 'roammcp_onair_guest_update',
    description: `Update an OnAir event guest.`,
    params: [
      {
        name: 'eventId',
        type: 'string',
        required: true,
        description: `ID of the OnAir event the guest belongs to.`,
      },
      { name: 'id', type: 'string', required: true, description: `ID of the guest to update.` },
      {
        name: 'status',
        type: 'string',
        required: true,
        description: `Updated status for the guest (e.g. their RSVP or attendance state). The upstream API requires this field on every update call once other fields like name/email are set.`,
      },
      {
        name: 'email',
        type: 'string',
        required: false,
        description: `Updated email address for the guest.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Updated display name for the guest.`,
      },
    ],
  },
  {
    name: 'roammcp_reaction_add',
    description: `Add an emoji reaction to a message.`,
    params: [
      {
        name: 'chatId',
        type: 'string',
        required: true,
        description: `ID (UUID) of the chat containing the message.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Emoji short code identifying the reaction.`,
      },
      {
        name: 'timestamp',
        type: 'string',
        required: true,
        description: `RFC3339 datetime of the message to react to, with microsecond precision.`,
      },
      {
        name: 'threadTimestamp',
        type: 'string',
        required: false,
        description: `RFC3339 datetime of the thread root message, when reacting to a threaded reply.`,
      },
    ],
  },
  {
    name: 'roammcp_reaction_list',
    description: `List emoji reactions and poll votes on a message.`,
    params: [
      {
        name: 'chatId',
        type: 'string',
        required: true,
        description: `ID (UUID) of the chat containing the message.`,
      },
      {
        name: 'timestamp',
        type: 'string',
        required: true,
        description: `RFC3339 datetime of the message to list reactions for, with microsecond precision.`,
      },
      {
        name: 'threadTimestamp',
        type: 'string',
        required: false,
        description: `RFC3339 datetime of the thread root message, when the message is a threaded reply.`,
      },
    ],
  },
  {
    name: 'roammcp_reaction_remove',
    description: `Remove an emoji reaction from a message.`,
    params: [
      {
        name: 'chatId',
        type: 'string',
        required: true,
        description: `ID (UUID) of the chat containing the message.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Emoji short code identifying the reaction to remove.`,
      },
      {
        name: 'timestamp',
        type: 'string',
        required: true,
        description: `RFC3339 datetime of the message to remove the reaction from, with microsecond precision.`,
      },
      {
        name: 'threadTimestamp',
        type: 'string',
        required: false,
        description: `RFC3339 datetime of the thread root message, when the message is a threaded reply.`,
      },
    ],
  },
  {
    name: 'roammcp_resolve_chat_link',
    description: `Resolve a Roam chat link URL into the referenced message.

WHEN TO USE THIS TOOL:
- When a user provides a Roam chat link (e.g., https://ro.am/r/#/c/...)
- To look up the content of a specific message referenced by a link

Parameters:
- link (required): A Roam chat link URL (e.g., https://ro.am/r/#/c/{idStr}/{code})

Returns the message content including sender, timestamp, text, and replyCount. If the caller lacks access to the chat, the response still includes the chatId and timestamps of the referenced message, but readable is false and no message content is returned.
`,
    params: [
      {
        name: 'link',
        type: 'string',
        required: true,
        description: `Roam chat link URL (e.g., https://ro.am/r/#/c/{idStr}/{code})`,
      },
    ],
  },
  {
    name: 'roammcp_search',
    description: `Search the caller's Roam workspace.

This tool exists so MCP clients that hard-code a \`search\` tool name (e.g. ChatGPT) hit a working endpoint without per-client configuration. It is a thin alias for \`chat_search\` and forwards every call to the same chat search index, which covers DMs, channels, teamRoam, and meeting channels (Magic Minutes summaries and other indexed meeting-channel posts).

For filtering by sender, group, date range, attachments, exclusions, sort, or chat type, call \`chat_search\` directly. For LLM-summarized search across meeting transcripts, use \`meeting_search\`.

Parameters:
- query (required): Search text.

Each returned message carries:
- \`timestamp\` — RFC3339 send time (with microsecond precision).
- \`threadTimestamp\` — RFC3339 thread root (only on replies).
- \`chatId\` — chat the message belongs to.
- \`userId\` — UUID of the sender; look up in the response envelope's \`addresses\` map.
- \`text\` — canonical message text with Slack-syntax mention tokens: \`<@uuid>\` principals, \`<!subteam^uuid>\` groups/channels, \`<!channel>\` broadcast. Not rewritten by the server.
- \`mentions\` — flat list of payloads (bare UUIDs from both token forms, and the literal \`"all"\` for \`<!channel>\`) referenced in \`text\`.

The response envelope additionally carries an \`addresses\` map keyed by UUID with display name + type + type-specific fields (botCode, email, isGuest, etc.) for every sender and mention target. Use it to render display names; missing keys mean the caller isn't authorized to view that address.
`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `The text to search for across the caller's Roam workspace.`,
      },
    ],
  },
  {
    name: 'roammcp_story_post',
    description: `Post a photo or video story to the caller's Roam. Stories appear above the author's profile picture for ~24 hours in the roam's shared story chat.

**Personal access tokens only.** Unlike \`chat_post\` (which posts as a bot persona), stories are authored by the token owner as themselves. Org tokens are rejected.

This is step 3 of posting a story. Media is **not** sent through this tool:

1. Call \`asset_create\` with \`purpose: "story"\`, the file \`name\` (include extension, e.g. \`clip.mp4\`), and optional \`size\`.
2. Upload the raw bytes out of band using the returned \`uploadUrl\` / \`uploadMethod\` / \`uploadHeaders\` (same single-request flow as chat attachments).
3. Call \`story_post\` with the \`assetId\` once processing completes. If you get "still processing", retry after a short delay.

Parameters:
- assetId (required): UUID from \`asset_create\` with \`purpose: "story"\`. Must be owned by the token owner, photo or video only, and not yet near its 48h asset expiry (leave enough headroom for the 24h story lifetime).
- caption (optional): Text caption, up to 2048 characters.

Response: \`{itemId, chatId, expiresAt}\` where \`expiresAt\` is when the story disappears (~24h from post).
`,
    params: [
      {
        name: 'assetId',
        type: 'string',
        required: true,
        description: `UUID of the uploaded asset (from asset_create with purpose "story") to post.`,
      },
      {
        name: 'caption',
        type: 'string',
        required: false,
        description: `Optional caption text for the story, up to 2048 characters.`,
      },
    ],
  },
  {
    name: 'roammcp_token_info',
    description: `Returns information about the current API token, including the authenticated user's identity (ID, name, email), the OAuth client ID, scopes, account, and bot persona (if any).
`,
    params: [],
  },
  {
    name: 'roammcp_user_info',
    description: `Resolve a member, guest, or automated actor by user ID. The required type field is user or bot; isGuest identifies non-member users. Email lookup remains workspace-member-only.`,
    params: [
      {
        name: 'email',
        type: 'string',
        required: false,
        description: `Workspace member email address`,
      },
      {
        name: 'expand',
        type: 'string',
        required: false,
        description: `Comma-separated expand fields: status, available. status also includes willReturn (out-of-office until returnTime, with optional reason) when the user has one set — check it before pinging someone who may be away`,
      },
      {
        name: 'id',
        type: 'string',
        required: false,
        description: `Principal user ID (bare or tagged UUID)`,
      },
    ],
  },
  {
    name: 'roammcp_user_list',
    description: `List users (people) in your workspace. Returns active members of the account. Supports pagination. To find ONE specific person (e.g. resolve a name to their email/id so you can DM or @mention them), pass \`q\` with their name — that returns just the matches in a single call, no paging.

Parameters:
- q (optional): Filter to users whose name or email contains this text (case-insensitive). Use it to look a person up by name.
- limit (optional): Max results per page (default 10)
- cursor (optional): Pagination cursor from a previous response
- expand (optional): Additional fields to include (e.g., "status"). "status" also includes willReturn (out-of-office until returnTime, with optional reason) when a user has one set
`,
    params: [
      { name: 'cursor', type: 'string', required: false, description: `Pagination cursor` },
      {
        name: 'expand',
        type: 'string',
        required: false,
        description: `Expand fields: status. status also includes willReturn (out-of-office until returnTime, with optional reason) when a user has one set`,
      },
      {
        name: 'ids',
        type: 'string',
        required: false,
        description: `Comma-separated principal IDs to hydrate (maximum 100). Cannot be combined with q, limit, or cursor; unresolved IDs are omitted`,
      },
      { name: 'limit', type: 'integer', required: false, description: `Page limit (default 10)` },
      {
        name: 'q',
        type: 'string',
        required: false,
        description: `Filter to users whose name or email contains this text (case-insensitive) — use it to look one person up by name in a single call`,
      },
    ],
  },
  {
    name: 'roammcp_webhook_deliveries',
    description: `List recent FAILED webhook delivery attempts for the authenticated client — timeouts (statusCode 0, error "timeout"), connection errors, and non-2xx responses. Use this to diagnose why an endpoint is not receiving events. Successful deliveries are not recorded. Each row has timestamp, webhookId, event, url, statusCode, error (class), response (server's error body, when any), durationMs, and messageId. Results are newest-first and strictly scoped to the caller's own subscriptions. Failures are retained for about 30 days.`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Return failures after this RFC3339 timestamp`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Return failures before this RFC3339 timestamp (for pagination)`,
      },
      {
        name: 'event',
        type: 'string',
        required: false,
        description: `Filter to a single event type (e.g. chat.message)`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Max rows to return (default 10, max 100)`,
      },
      {
        name: 'webhook',
        type: 'string',
        required: false,
        description: `Filter to a single webhook subscription ID (UUID)`,
      },
    ],
  },
  {
    name: 'roammcp_webhook_subscribe',
    description: `Subscribe to receive webhook events at a URL.`,
    params: [
      {
        name: 'event',
        type: 'string',
        required: true,
        description: `Event type (e.g. chat.message, onair.event.created)`,
      },
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `Webhook delivery URL (HTTPS, max 1024 chars)`,
      },
      {
        name: 'filter',
        type: 'object',
        required: false,
        description: `Event-specific filter object (e.g. {"hasVideo": true} on meeting.ended to only receive meetings that were video recorded; the recording may still be uploading when the event fires)`,
      },
    ],
  },
  {
    name: 'roammcp_webhook_unsubscribe',
    description: `Unsubscribe from a webhook by ID.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `Webhook subscription ID (UUID)` },
    ],
  },
]
