import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'quomcp_create_contact',
    description: `Create a new contact in the Quo workspace. Returns the new contact ID and a compact pipe-separated row that can be chained into \`update-contact\` or \`get-contact\`. Only \`firstName\` is required; all other fields are optional.`,
    params: [
      {
        name: 'firstName',
        type: 'string',
        required: true,
        description: `Contact's first name (required)`,
      },
      { name: 'company', type: 'string', required: false, description: `Contact's company name` },
      {
        name: 'email',
        type: 'string',
        required: false,
        description: `Contact's email address, RFC-5322 format (e.g., 'jane@example.com')`,
      },
      { name: 'lastName', type: 'string', required: false, description: `Contact's last name` },
      {
        name: 'phoneNumber',
        type: 'string',
        required: false,
        description: `Contact's phone number. Format as E.164 before sending (e.g. '+15551234567', '+447911123456'). International numbers are supported.`,
      },
      { name: 'role', type: 'string', required: false, description: `Contact's role or title` },
    ],
  },
  {
    name: 'quomcp_create_task',
    description: `Create a task in Quo linked to exactly one inbox, conversation, or conversation activity. Pick the most specific link target available: if a fetch result row gives you an AC… activity ID (a specific call or message), prefer \`activityId\` — it ties the task to exactly what the user is referring to. Use \`conversationId\` (CN…) when the user means the whole thread with a contact (also from fetch-* results). Use \`inboxPhoneNumber\` (E.164 or PN… ID, from list-inboxes) only when the task isn't about any specific call/message/thread.`,
    params: [
      { name: 'description', type: 'string', required: true, description: `The task description.` },
      { name: 'title', type: 'string', required: true, description: `The task title.` },
      {
        name: 'activityId',
        type: 'string',
        required: false,
        description: `Create the task linked to a Quo activity ID (AC... format). Provide exactly one of inboxPhoneNumber, conversationId, or activityId.`,
      },
      {
        name: 'assignedTo',
        type: 'string',
        required: false,
        description: `Optional Quo user ID to assign the task to (US... format).`,
      },
      {
        name: 'conversationId',
        type: 'string',
        required: false,
        description: `Create the task linked to a Quo conversation ID (CN... format), as returned by fetch-messages / fetch-call-transcripts / fetch-missed-calls. Provide exactly one of inboxPhoneNumber, conversationId, or activityId.`,
      },
      {
        name: 'dueDate',
        type: 'string',
        required: false,
        description: `Optional due date as ISO 8601 datetime with timezone (e.g. '2024-01-01T00:00:00Z').`,
      },
      {
        name: 'inboxPhoneNumber',
        type: 'string',
        required: false,
        description: `Create the task under a Quo inbox: E.164 number (e.g. '+15555555555') or PN... ID. Use list-inboxes to discover available numbers. Provide exactly one of inboxPhoneNumber, conversationId, or activityId.`,
      },
    ],
  },
  {
    name: 'quomcp_fetch_call_transcripts',
    description: `Fetch call transcripts for a Quo inbox. Requires the Quo Business plan and calls where transcription was enabled. Optionally filter by \`userId\` to return only calls handled by a specific team member (use \`list-users\` to look up user IDs). Each result row is \`id | participant | direction | status | createdAt | duration | conversationId\`; the leading \`id\` is the call's activity ID (AC…) — pass it to \`create-task\` as \`activityId\` to link a follow-up task to that specific call. When \`participantPhoneNumber\` is omitted, the tool aggregates across participants discovered from conversations, and the trailing \`conversationId\` (CN…) is populated for thread-level task linking. Set \`createdAfter\` to bound the window — the tool filters conversation discovery by that time server-side, so a call whose conversation is old but had recent activity is still found. Single-participant queries leave the \`conversationId\` column blank since the per-call \`activityId\` is already a precise link target. To page through additional results, use \`participantPhoneNumber\` + \`pageToken\` for a single participant, or \`conversationPageToken\` if you hit the conversation-discovery safety cap. Timezone: \`createdAfter\`/\`createdBefore\` are treated as UTC — pass ISO 8601 with a 'Z' suffix or an explicit offset — and every timestamp in results is UTC. When the user asks in relative terms (e.g. 'yesterday', 'this week'), scope the window to THEIR local timezone and convert to the matching UTC instants before calling; if you don't know their timezone, ask. Present returned times in the user's local timezone. When showing a phone number to the user, render it as a click-to-call link, e.g. [(555) 555-5555](tel:+15555555555). Pass the bare E.164 value (not a tel: URI) into tool parameters.`,
    params: [
      {
        name: 'inboxPhoneNumber',
        type: 'string',
        required: true,
        description: `Your Quo inbox number or phone-number ID to find transcripts for (E.164 like '+15555555555', or a PN... ID). Use list-inboxes to discover available numbers.`,
      },
      {
        name: 'conversationPageToken',
        type: 'string',
        required: false,
        description: `Optional: token to fetch older conversations when doing multi-participant discovery. Use this if the response shows 'More conversations available'. Only used when participantPhoneNumber is NOT specified.`,
      },
      {
        name: 'createdAfter',
        type: 'string',
        required: false,
        description: `Optional: filter calls created after this ISO 8601 datetime with offset (e.g. '2024-01-01T00:00:00Z').`,
      },
      {
        name: 'createdBefore',
        type: 'string',
        required: false,
        description: `Optional: filter calls created before this ISO 8601 datetime with offset (e.g. '2024-01-01T00:00:00Z').`,
      },
      {
        name: 'maxResults',
        type: 'number',
        required: false,
        description: `Maximum number of calls to fetch transcripts for (default: 100, max: 100 when using pagination)`,
      },
      {
        name: 'pageToken',
        type: 'string',
        required: false,
        description: `Optional: token from previous response to fetch the next page of results. Can only be used with participantPhoneNumber (single-participant queries). Not supported when fetching across all participants.`,
      },
      {
        name: 'participantPhoneNumber',
        type: 'string',
        required: false,
        description: `Optional: specific participant phone number to filter conversations (E.164 format). REQUIRED when using pageToken for pagination.`,
      },
      {
        name: 'userId',
        type: 'string',
        required: false,
        description: `Optional: filter calls by a specific team member's user ID (US… format). When provided, returns only calls handled by that user. Use \`list-users\` to look up user IDs.`,
      },
    ],
  },
  {
    name: 'quomcp_fetch_messages',
    description: `Fetch message history for a Quo inbox. Two modes:

• Single contact (\`participantPhoneNumber\` set) — DEPTH: returns that contact's full message history, most-recent-first, with pagination via \`pageToken\` (up to 100 per page). Each message is \`id | participant | direction | timestamp\` followed by the text; the leading \`id\` is the message's activity ID (AC…) — pass it to \`create-task\` as \`activityId\`. A message with MMS attachments is followed by one indented \`media: <mime-type> <url>\` line per attachment; text-only messages have none. A message may carry both text and attachments — when it does, the body is the text and the media lines follow it. ALWAYS pass the attachment URL through to the user as a clickable markdown link (e.g. [image/png](https://example.com/image.png)); stating that an attachment exists without giving its URL is not useful, since the user cannot open a link they were not shown. Never shorten, truncate, or omit the URL. When an attachment arrives with no accompanying text the body shows \`(no text)\`; describe that to the user as a photo or file, not as an empty message.

• Whole inbox (\`participantPhoneNumber\` omitted) — BREADTH: returns the most-recent messages for EVERY contact active in the window, grouped by contact (up to 10 messages each, up to 50 contacts), so a daily-summary query never silently drops a contact. Each contact's conversation ID (CN…) is on its header for \`create-task\` linking. A contact with more than 10 in-window messages is flagged (\`[more than 10 …]\`) — re-query that contact with \`participantPhoneNumber\` for the full thread. If more than 50 contacts were active, an \`[incomplete: …]\` line reports how many were left out; narrow the date range or query specific contacts. \`maxResults\` is ignored in this mode. Set \`createdAfter\` to bound the window — the tool filters conversation discovery by that time server-side, so a contact with a recent message is found even when their conversation is old. Without \`createdAfter\`, discovery falls back to the most recent conversations. Timezone: \`createdAfter\`/\`createdBefore\` are treated as UTC — pass ISO 8601 with a 'Z' suffix or an explicit offset — and every timestamp in results is UTC. When the user asks in relative terms (e.g. 'yesterday', 'this week'), scope the window to THEIR local timezone and convert to the matching UTC instants before calling; if you don't know their timezone, ask. Present returned times in the user's local timezone. When showing a phone number to the user, render it as a click-to-call link, e.g. [(555) 555-5555](tel:+15555555555). Pass the bare E.164 value (not a tel: URI) into tool parameters.`,
    params: [
      {
        name: 'inboxPhoneNumber',
        type: 'string',
        required: true,
        description: `Your Quo inbox number or phone-number ID to fetch messages for (E.164 like '+15555555555', or a PN... ID). Use list-inboxes to discover available numbers.`,
      },
      {
        name: 'conversationPageToken',
        type: 'string',
        required: false,
        description: `Optional: token to fetch older conversations when doing multi-participant discovery. Use this if the response shows 'More conversations available'. Only used when participantPhoneNumber is NOT specified.`,
      },
      {
        name: 'createdAfter',
        type: 'string',
        required: false,
        description: `Optional: filter messages created after this ISO 8601 datetime with offset (e.g. '2024-01-01T00:00:00Z').`,
      },
      {
        name: 'createdBefore',
        type: 'string',
        required: false,
        description: `Optional: filter messages created before this ISO 8601 datetime with offset (e.g. '2024-01-01T00:00:00Z').`,
      },
      {
        name: 'maxResults',
        type: 'number',
        required: false,
        description: `Maximum number of messages to fetch (default: 100, max: 100). Only applies to single-contact queries (participantPhoneNumber set). Ignored for whole-inbox queries, which return up to 10 messages per contact across up to 50 contacts.`,
      },
      {
        name: 'pageToken',
        type: 'string',
        required: false,
        description: `Optional: token from previous response to fetch the next page of results. Can only be used with participantPhoneNumber (single-participant queries). For multi-participant aggregation, pagination is not supported.`,
      },
      {
        name: 'participantPhoneNumber',
        type: 'string',
        required: false,
        description: `Optional: specific participant phone number to filter conversations (E.164 format). REQUIRED when using pageToken for pagination.`,
      },
      {
        name: 'userId',
        type: 'string',
        required: false,
        description: `Optional: filter to messages sent by a specific team member's user ID (US… format). Incoming messages are excluded when this filter is set, since the API does not associate them with a sender user ID. Use \`list-users\` to look up user IDs.`,
      },
    ],
  },
  {
    name: 'quomcp_fetch_missed_calls',
    description: `Fetch missed incoming calls for a Quo inbox, each enriched with the voicemail the caller left (transcript + recording URL) when there is one. Only returns incoming calls whose status is 'missed', 'no-answer', or 'abandoned' — this filter is fixed and cannot be changed or broadened. Use it for questions like 'what calls did I miss yesterday?' or 'any voicemails this week?'. Each result is a row \`id | status | direction | participants | createdAt | duration | conversationId\`; the leading \`id\` is the call's activity ID (AC…) — pass it to \`create-task\` as \`activityId\` to link a follow-up task to that specific call. The trailing \`conversationId\` (CN…) is for thread-level task linking and is populated only when discovering across multiple participants (single-participant queries leave it blank since the per-call \`activityId\` is already precise). Rows whose call has a voicemail are followed by an indented voicemail block (status, duration, recordingUrl, transcript). Voicemails are processed asynchronously — a voicemail with status 'in-progress' has null duration/transcript/recordingUrl, so retry in a few seconds. Missed calls where the caller hung up without leaving a message are still listed, just marked '(no voicemail)'. When \`participantPhoneNumber\` is omitted, the tool aggregates calls across all participants active in your \`createdAfter\` window — the tool filters conversation discovery by that time server-side, so a missed call whose conversation is old but had recent activity is still found. Without \`createdAfter\`, discovery falls back to the most recent conversations. For exhaustive single-contact pulls, use \`participantPhoneNumber\` + \`pageToken\`; if you hit the conversation-discovery safety cap, use \`conversationPageToken\` to continue. Timezone: \`createdAfter\`/\`createdBefore\` are treated as UTC — pass ISO 8601 with a 'Z' suffix or an explicit offset — and every timestamp in results is UTC. When the user asks in relative terms (e.g. 'yesterday', 'this week'), scope the window to THEIR local timezone and convert to the matching UTC instants before calling; if you don't know their timezone, ask. Present returned times in the user's local timezone. When showing a phone number to the user, render it as a click-to-call link, e.g. [(555) 555-5555](tel:+15555555555). Pass the bare E.164 value (not a tel: URI) into tool parameters.`,
    params: [
      {
        name: 'inboxPhoneNumber',
        type: 'string',
        required: true,
        description: `Your Quo inbox number or phone-number ID to list calls for (E.164 like '+15555555555', or a PN... ID). Use list-inboxes to discover available numbers.`,
      },
      {
        name: 'conversationPageToken',
        type: 'string',
        required: false,
        description: `Optional: token to fetch older conversations when doing multi-participant discovery. Use this if the response shows 'More conversations available'. Only used when participantPhoneNumber is NOT specified.`,
      },
      {
        name: 'createdAfter',
        type: 'string',
        required: false,
        description: `Optional: filter calls created after this ISO 8601 datetime with offset (e.g. '2026-05-19T00:00:00Z').`,
      },
      {
        name: 'createdBefore',
        type: 'string',
        required: false,
        description: `Optional: filter calls created before this ISO 8601 datetime with offset (e.g. '2026-05-20T00:00:00Z').`,
      },
      {
        name: 'maxResults',
        type: 'number',
        required: false,
        description: `Maximum number of calls to return after filtering (default: 100, max: 100 when using pagination).`,
      },
      {
        name: 'pageToken',
        type: 'string',
        required: false,
        description: `Optional: token from previous response to fetch the next page of results. Can only be used with participantPhoneNumber (single-participant queries). Not supported when fetching across all participants.`,
      },
      {
        name: 'participantPhoneNumber',
        type: 'string',
        required: false,
        description: `Optional: specific other-party phone number to filter calls (E.164 format). REQUIRED when using pageToken for pagination.`,
      },
    ],
  },
  {
    name: 'quomcp_get_contact',
    description: `Fetch a single Quo contact by ID, including its default fields (name, company, role, email, phone) and any custom fields configured on the workspace. Use \`list-contacts\` first if you need to discover contact IDs. When showing a phone number to the user, render it as a click-to-call link, e.g. [(555) 555-5555](tel:+15555555555). Pass the bare E.164 value (not a tel: URI) into tool parameters.`,
    params: [
      {
        name: 'contactId',
        type: 'string',
        required: true,
        description: `The Quo contact ID to retrieve.`,
      },
    ],
  },
  {
    name: 'quomcp_list_contacts',
    description: `List contacts in the Quo workspace, optionally filtered by \`externalIds\` or \`sources\`. Returns a compact pipe-separated table (id | name | company | role | email | phone) and supports pagination via \`pageToken\` (1–50 results per page). When showing a phone number to the user, render it as a click-to-call link, e.g. [(555) 555-5555](tel:+15555555555). Pass the bare E.164 value (not a tel: URI) into tool parameters.`,
    params: [
      {
        name: 'externalIds',
        type: 'array',
        required: false,
        description: `Optional: filter by a list of external identifiers from an external system.`,
      },
      {
        name: 'maxResults',
        type: 'integer',
        required: false,
        description: `Maximum contacts to return per page (1-50, default 10).`,
      },
      {
        name: 'pageToken',
        type: 'string',
        required: false,
        description: `Optional: token from a previous response to fetch the next page.`,
      },
      {
        name: 'sources',
        type: 'array',
        required: false,
        description: `Optional: filter by contact source (origin/creation method).`,
      },
    ],
  },
  {
    name: 'quomcp_list_inboxes',
    description: `List the phone numbers (inboxes) available in the Quo workspace, including assigned users. Use this first to discover the correct \`from\` number for \`send-message\` or the \`inboxPhoneNumber\` for \`fetch-messages\` / \`fetch-call-transcripts\`. When showing a phone number to the user, render it as a click-to-call link, e.g. [(555) 555-5555](tel:+15555555555). Pass the bare E.164 value (not a tel: URI) into tool parameters.`,
    params: [
      {
        name: 'userId',
        type: 'string',
        required: false,
        description: `Optional: filter inboxes by a specific Quo user ID (US... format).`,
      },
    ],
  },
  {
    name: 'quomcp_list_tasks',
    description: `List tasks in the Quo workspace. Returns compact rows with task ID, status, title, due date, assignee, linked phone number/conversation/activity, creation time, and revision. Supports pagination via \`pageToken\` (1-100 results per page).`,
    params: [
      {
        name: 'maxResults',
        type: 'integer',
        required: false,
        description: `Maximum tasks to return per page (1-100, default 50).`,
      },
      {
        name: 'pageToken',
        type: 'string',
        required: false,
        description: `Optional: token from a previous response to fetch the next page.`,
      },
    ],
  },
  {
    name: 'quomcp_list_users',
    description: `List the users (members) in the Quo workspace. Returns each user's ID, name, email, and role. Use the returned \`id\` (US… format) to filter other tools like \`list-inboxes\` by user. Supports pagination via \`pageToken\` (1–50 results per page, max 50).`,
    params: [
      {
        name: 'maxResults',
        type: 'integer',
        required: false,
        description: `Maximum users to return per page (1–50, default 10).`,
      },
      {
        name: 'pageToken',
        type: 'string',
        required: false,
        description: `Optional: token from a previous response to fetch the next page.`,
      },
    ],
  },
  {
    name: 'quomcp_send_bulk_messages',
    description: `Send SMS to up to 40 recipients as SEPARATE individual (1:1) messages — a broadcast. Two modes: for the SAME text to everyone, pass \`to\` (2–40 numbers) + \`content\`; to personalize per recipient, pass \`messages\` as [{to, content}] instead. Provide one mode or the other, never both. Prefer \`to\` + \`content\` when the text is identical — it guarantees everyone receives exactly the same message. Each recipient gets their own private thread and does NOT see the other recipients; replies come back individually. Use this for announcements or blasts. This is different from send-group-message, which puts everyone in ONE shared thread that exposes their numbers to each other — use that only when recipients should see one another. For a single recipient use send-message. Sends cannot be undone. The \`from\` number must belong to the user's Quo workspace — use \`list-inboxes\` to discover available numbers. Recipients must be valid phone numbers in E.164 format (international supported).`,
    params: [
      {
        name: 'from',
        type: 'string',
        required: true,
        description: `Your Quo number to send from. Accepts E.164 (e.g. '+15551234567'), a phone-number ID, or a recognizable local format. Must belong to your Quo workspace — use list-inboxes to discover available numbers.`,
      },
      {
        name: 'content',
        type: 'string',
        required: false,
        description: `SAME-MESSAGE mode. The single message body, sent identically to every recipient in \`to\`. REQUIRED together with \`to\`, unless you are using \`messages\` instead. Omit this entirely when using \`messages\` — supplying both modes is an error.`,
      },
      {
        name: 'messages',
        type: 'array',
        required: false,
        description: `PERSONALIZED mode. One entry per recipient (2–40), each with its own \`to\` and \`content\` — e.g. [{"to": "+15551234567", "content": "Hi John, you're confirmed for 2pm"}, {"to": "+15559876543", "content": "Hi Sarah, you're confirmed for 3pm"}]. REQUIRED unless you are using \`to\` + \`content\` instead. Use this ONLY when the text differs per recipient; if everyone gets the same text, use \`to\` + \`content\`, which guarantees an identical message. Each recipient still receives a SEPARATE private message and cannot see the others. A phone number may appear only once. Omit this entirely when using \`to\` + \`content\` — supplying both modes is an error.`,
      },
      {
        name: 'to',
        type: 'array',
        required: false,
        description: `SAME-MESSAGE mode. The recipients' phone numbers (2–40), each in E.164 format (e.g. '+15551234567'). REQUIRED together with \`content\`, unless you are using \`messages\` instead. Each recipient receives a SEPARATE private message and cannot see the others. Omit this entirely when using \`messages\` — supplying both modes is an error. For one shared group thread, use send-group-message instead.`,
      },
    ],
  },
  {
    name: 'quomcp_send_group_message',
    description: `Send a single SMS group message from a Quo inbox to 2–10 recipients in one shared thread. IMPORTANT: this creates a group conversation — every recipient can see all the other recipients' phone numbers and all replies, and it cannot be undone once sent. Use \`send-message\` instead when you want to text one person, or to text several people privately without exposing them to each other (call \`send-message\` once per recipient). The \`from\` number must belong to the user's Quo workspace — use \`list-inboxes\` to discover available numbers. Recipients must be valid phone numbers in E.164 format (international supported).`,
    params: [
      { name: 'content', type: 'string', required: true, description: `The message content` },
      {
        name: 'from',
        type: 'string',
        required: true,
        description: `Your Quo number to send from. Accepts E.164 (e.g. '+15551234567'), a phone-number ID, or a recognizable local format. Must belong to your Quo workspace — use list-inboxes to discover available numbers.`,
      },
      {
        name: 'to',
        type: 'array',
        required: true,
        description: `The recipients' phone numbers (2–10), each in E.164 format (e.g. '+15551234567'). All recipients share one thread and can see each other. For a single recipient, use send-message instead.`,
      },
    ],
  },
  {
    name: 'quomcp_send_message',
    description: `Send an SMS text message from a Quo inbox to a single recipient. The \`from\` number must belong to the user's Quo workspace — use \`list-inboxes\` to discover available numbers. Recipient must be a valid phone number in E.164 format (international supported).`,
    params: [
      { name: 'content', type: 'string', required: true, description: `The message content` },
      {
        name: 'from',
        type: 'string',
        required: true,
        description: `Your Quo number to send from. Accepts E.164 (e.g. '+15551234567'), a phone-number ID, or a recognizable local format. Must belong to your Quo workspace — use list-inboxes to discover available numbers.`,
      },
      {
        name: 'to',
        type: 'string',
        required: true,
        description: `The recipient's phone number. Format as E.164 before sending (e.g. '+15551234567', '+447911123456'). International numbers are supported.`,
      },
    ],
  },
  {
    name: 'quomcp_update_contact',
    description: `Update fields on an existing Quo contact. Omit fields you want to leave unchanged; pass \`null\` for any field you want to clear. Use \`get-contact\` first if you need to inspect current values before updating.`,
    params: [
      {
        name: 'contactId',
        type: 'string',
        required: true,
        description: `The Quo contact ID to update`,
      },
      {
        name: 'company',
        type: 'string',
        required: false,
        description: `Updated company name. Set to null to remove.`,
      },
      {
        name: 'email',
        type: 'string',
        required: false,
        description: `Updated email address, RFC-5322 format (e.g., 'jane@example.com'). Set to null to remove.`,
      },
      {
        name: 'firstName',
        type: 'string',
        required: false,
        description: `Updated first name. Set to null to remove.`,
      },
      {
        name: 'lastName',
        type: 'string',
        required: false,
        description: `Updated last name. Set to null to remove.`,
      },
      {
        name: 'phoneNumber',
        type: 'string',
        required: false,
        description: `Updated phone number. Format as E.164 before sending (e.g. '+15551234567', '+447911123456'). International numbers are supported. Set to null to remove.`,
      },
      {
        name: 'role',
        type: 'string',
        required: false,
        description: `Updated role/title. Set to null to remove.`,
      },
    ],
  },
  {
    name: 'quomcp_update_task',
    description: `Update a Quo task. Performs exactly one change per call, selected by which parameter is provided: title/description (counted as one change), assignToUserId, unassignUserId, dueDate, removeDueDate, completed (true marks the task done, false reopens it), linkConversationId, or unlinkConversationId. To make several changes, call this tool once per change.`,
    params: [
      {
        name: 'taskId',
        type: 'string',
        required: true,
        description: `The Quo task ID to update (TK... format).`,
      },
      {
        name: 'assignToUserId',
        type: 'string',
        required: false,
        description: `Optional Quo user ID (US... format) to assign to the task.`,
      },
      {
        name: 'completed',
        type: 'boolean',
        required: false,
        description: `Set to true to mark the task as completed, or false to reopen a completed task.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional new task description.`,
      },
      {
        name: 'dueDate',
        type: 'string',
        required: false,
        description: `Optional due date as ISO 8601 datetime with timezone (e.g. '2024-01-01T00:00:00Z').`,
      },
      {
        name: 'linkConversationId',
        type: 'string',
        required: false,
        description: `Optional conversation ID (CN... format) to link to the task, as returned by fetch-messages / fetch-call-transcripts / fetch-missed-calls.`,
      },
      {
        name: 'removeDueDate',
        type: 'boolean',
        required: false,
        description: `Set to true to clear the task due date.`,
      },
      { name: 'title', type: 'string', required: false, description: `Optional new task title.` },
      {
        name: 'unassignUserId',
        type: 'string',
        required: false,
        description: `Optional Quo user ID (US... format) to unassign from the task.`,
      },
      {
        name: 'unlinkConversationId',
        type: 'string',
        required: false,
        description: `Optional conversation ID (CN... format) to unlink from the task.`,
      },
    ],
  },
]
