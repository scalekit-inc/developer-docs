import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'frontmcp_add_comment',
    description: `Add an internal comment to a conversation.`,
    params: [
      {
        name: 'body',
        type: 'string',
        required: true,
        description: `Comment body text. Teammate @mentions in the body are resolved automatically.`,
      },
      {
        name: 'conversationId',
        type: 'string',
        required: true,
        description: `Public conversation ID (cnv_xxx) to comment on.`,
      },
    ],
  },
  {
    name: 'frontmcp_assign_conversation',
    description: `Assign a conversation to a teammate or team.`,
    params: [
      {
        name: 'assigneeId',
        type: 'string',
        required: true,
        description: `Public teammate ID (tea_xxx) to assign to, or null to unassign.`,
      },
      {
        name: 'conversationId',
        type: 'string',
        required: true,
        description: `Public conversation ID (cnv_xxx) to assign.`,
      },
    ],
  },
  {
    name: 'frontmcp_create_draft',
    description: `Create a draft for an existing conversation or a new outbound conversation. Provide conversationId to draft a reply on an existing conversation. Omit conversationId and provide channelId to create a draft for a new outbound conversation; to[] and subject are optional. The body is HTML by default; set bodyFormat to send markdown or plain text instead.`,
    params: [
      {
        name: 'body',
        type: 'string',
        required: true,
        description: `Draft body. Interpreted per bodyFormat — HTML by default (use <br> or <p> tags for line breaks).`,
      },
      {
        name: 'bcc',
        type: 'array',
        required: false,
        description: `BCC recipients for a new outbound conversation (email channels).`,
      },
      {
        name: 'bodyFormat',
        type: 'string',
        required: false,
        description: `How body is interpreted (default html): "html" is used as-is; "markdown" and "plain" are converted to HTML for you ("plain" preserves line breaks and escapes HTML characters).`,
      },
      {
        name: 'cc',
        type: 'array',
        required: false,
        description: `CC recipients for a new outbound conversation (email channels).`,
      },
      {
        name: 'channelId',
        type: 'string',
        required: false,
        description: `Channel to draft from (cha_xxx). Required for a new conversation (conversationId omitted); optional when replying to an existing conversation, where it overrides the conversation's default channel. If the user has not specified a channel for a new conversation, ask which to send from before choosing; prefer a personal channel. Use list_channels to discover available channels.`,
      },
      {
        name: 'conversationId',
        type: 'string',
        required: false,
        description: `Public conversation ID (cnv_xxx) to draft a reply for. Omit to create a draft for a new outbound conversation (requires channelId).`,
      },
      {
        name: 'inReplyToMessageId',
        type: 'string',
        required: false,
        description: `Message ID to draft a reply to; defaults to the latest message.`,
      },
      {
        name: 'replyAll',
        type: 'boolean',
        required: false,
        description: `Reply to all original recipients (default true).`,
      },
      {
        name: 'shared',
        type: 'boolean',
        required: false,
        description: `Share the draft with all conversation participants after creation. AI teammates must share drafts — the draft is always shared and passing false is rejected. For human callers it defaults to false (a private draft).`,
      },
      {
        name: 'subject',
        type: 'string',
        required: false,
        description: `Subject line for a new outbound conversation (email channels). Optional.`,
      },
      {
        name: 'to',
        type: 'array',
        required: false,
        description: `Recipients for a new outbound conversation, as the channel's handle type (email address, phone number, etc.). Optional — the draft can be addressed later.`,
      },
    ],
  },
  {
    name: 'frontmcp_delete_draft',
    description: `Discard an unsent draft owned by the authenticated teammate. Pass the version from read_message for conflict detection — the call fails if the draft changed since you read it. Owner-only: the call returns an error if the draft belongs to another teammate.`,
    params: [
      {
        name: 'draftId',
        type: 'string',
        required: true,
        description: `Public draft message ID (msg_xxx) to delete, from list_drafts or read_message.`,
      },
      {
        name: 'version',
        type: 'string',
        required: true,
        description: `Opaque version token from read_message.draftVersion. Used for conflict detection; the call fails with a conflict error if the draft changed since you read it.`,
      },
    ],
  },
  {
    name: 'frontmcp_get_attachment',
    description: `Get a specific attachment on a message or comment. Returns attachment metadata (filename, contentType, size) plus a short-lived downloadUrl.`,
    params: [
      {
        name: 'attachmentId',
        type: 'string',
        required: true,
        description: `Public attachment link ID (fil_xxx), as returned by read_message.`,
      },
    ],
  },
  {
    name: 'frontmcp_get_my_identity',
    description: `Get the calling agent's own identity: public ID, name, alias, and whether the caller is human. Takes no arguments.`,
    params: [],
  },
  {
    name: 'frontmcp_list_channels',
    description: `List channels accessible to the authenticated user. Filter by name, address, type, or inbox. Use this tool to discover channels before calling tools that require a channel ID.`,
    params: [
      {
        name: 'account_statuses',
        type: 'string',
        required: false,
        description: `Optional filter by channel account status.`,
      },
      {
        name: 'inbox_ids',
        type: 'string',
        required: false,
        description: `Optional filter by inbox IDs. Prefer this instead of putting inbox names in name_query.`,
      },
      {
        name: 'limit',
        type: 'string',
        required: false,
        description: `Maximum number of results (default 25, max 50)`,
      },
      {
        name: 'name_query',
        type: 'string',
        required: false,
        description: `Optional channel display name or address keywords. Use this only for the channel identity itself.`,
      },
      {
        name: 'offset',
        type: 'string',
        required: false,
        description: `Offset for pagination (default 0). Use with limit to paginate through results.`,
      },
      {
        name: 'types',
        type: 'string',
        required: false,
        description: `Optional filter by channel type (for example email, chat, sms).`,
      },
    ],
  },
  {
    name: 'frontmcp_list_drafts',
    description: `List in-flight draft messages authored by the authenticated teammate.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of drafts to return (default 50, max 200).`,
      },
    ],
  },
  {
    name: 'frontmcp_list_inboxes',
    description: `List inboxes accessible to the authenticated user.`,
    params: [
      {
        name: 'access_mode',
        type: 'string',
        required: false,
        description: `Optional filter by inbox access mode.`,
      },
      {
        name: 'ai_enabled',
        type: 'string',
        required: false,
        description: `Optional filter by Front AI status.`,
      },
      {
        name: 'business_hours_enabled',
        type: 'string',
        required: false,
        description: `Optional filter by business hours status.`,
      },
      {
        name: 'circle_ids',
        type: 'string',
        required: false,
        description: `Optional filter by teammate group IDs who have access to the inbox.`,
      },
      {
        name: 'global_rules_enabled',
        type: 'string',
        required: false,
        description: `Optional filter by company rules status.`,
      },
      {
        name: 'limit',
        type: 'string',
        required: false,
        description: `Maximum number of results (default 25, max 50)`,
      },
      {
        name: 'name_query',
        type: 'string',
        required: false,
        description: `Optional inbox name keywords. Use this only for the inbox name itself.`,
      },
      {
        name: 'offset',
        type: 'string',
        required: false,
        description: `Offset for pagination (default 0). Use with limit to paginate through results.`,
      },
      {
        name: 'teammate_ids',
        type: 'string',
        required: false,
        description: `Optional filter by teammate IDs who have access to the inbox.`,
      },
      {
        name: 'ticketing_enabled',
        type: 'string',
        required: false,
        description: `Optional filter by ticketing status.`,
      },
    ],
  },
  {
    name: 'frontmcp_list_statuses',
    description: `List the company's ticket statuses. Returns an empty list when ticketing is not enabled for the company.`,
    params: [
      {
        name: 'limit',
        type: 'string',
        required: false,
        description: `Maximum number of results (default 50, max 100)`,
      },
      {
        name: 'name_query',
        type: 'string',
        required: false,
        description: `Optional ticket status name keywords. Use this only for the status name itself.`,
      },
      {
        name: 'offset',
        type: 'string',
        required: false,
        description: `Offset for pagination (default 0). Use with limit to paginate through results.`,
      },
    ],
  },
  {
    name: 'frontmcp_list_tags',
    description: `List tags in the workspace.`,
    params: [
      {
        name: 'all_inboxes',
        type: 'string',
        required: false,
        description: `Optional filter by whether the tag applies to all inboxes.`,
      },
      {
        name: 'inbox_ids',
        type: 'string',
        required: false,
        description: `Optional filter by inbox IDs this tag applies to.`,
      },
      {
        name: 'is_visible_in_conversation_lists',
        type: 'string',
        required: false,
        description: `Optional filter by visibility in conversation lists.`,
      },
      {
        name: 'limit',
        type: 'string',
        required: false,
        description: `Maximum number of results (default 50, max 100)`,
      },
      {
        name: 'name_query',
        type: 'string',
        required: false,
        description: `Optional tag name keywords. Use this only for the tag name itself.`,
      },
      {
        name: 'offset',
        type: 'string',
        required: false,
        description: `Offset for pagination (default 0). Use with limit to paginate through results.`,
      },
      {
        name: 'parent_tag_id',
        type: 'string',
        required: false,
        description: `Optional filter by parent tag ID.`,
      },
    ],
  },
  {
    name: 'frontmcp_list_teammates',
    description: `List teammates in the workspace.`,
    params: [
      {
        name: 'limit',
        type: 'string',
        required: false,
        description: `Maximum number of results (default 10, max 25)`,
      },
      {
        name: 'name_query',
        type: 'string',
        required: false,
        description: `Name or email keywords to search for (for example "alex" or "alex@"). Use this only for teammate identity, not for workspace, status, or relationship intent.`,
      },
      {
        name: 'offset',
        type: 'string',
        required: false,
        description: `Offset for pagination (default 0). Use with limit to paginate through results.`,
      },
      {
        name: 'statuses',
        type: 'string',
        required: false,
        description: `Filter by account status. Defaults to active statuses (active, pending, pending_email). Include "blocked" to see deactivated teammates.`,
      },
    ],
  },
  {
    name: 'frontmcp_list_teams',
    description: `List teams in the workspace.`,
    params: [
      {
        name: 'limit',
        type: 'string',
        required: false,
        description: `Maximum number of results (default 10, max 25)`,
      },
      {
        name: 'name_query',
        type: 'string',
        required: false,
        description: `Optional team name or alias keywords. Use this only for the team name or alias.`,
      },
      {
        name: 'offset',
        type: 'string',
        required: false,
        description: `Offset for pagination (default 0). Use with limit to paginate through results.`,
      },
    ],
  },
  {
    name: 'frontmcp_move_conversation',
    description: `Move a conversation to a different inbox. Replaces the conversation's current inbox association with the destination inbox — this is not additive. Provide the destination inbox ID (inb_xxx) from list_inboxes.`,
    params: [
      {
        name: 'conversationId',
        type: 'string',
        required: true,
        description: `Public conversation ID (cnv_xxx) to move.`,
      },
      {
        name: 'inboxId',
        type: 'string',
        required: true,
        description: `Destination inbox ID (inb_xxx), as returned by list_inboxes.`,
      },
    ],
  },
  {
    name: 'frontmcp_read_account',
    description: `Read an account (company) record.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The account to read, identified by its private numeric ID or its public ID (acc_xxx).`,
      },
    ],
  },
  {
    name: 'frontmcp_read_contact',
    description: `Read a contact record.`,
    params: [
      {
        name: 'contactId',
        type: 'string',
        required: true,
        description: `Public contact card ID (crd_xxx).`,
      },
    ],
  },
  {
    name: 'frontmcp_read_conversation',
    description: `Read a conversation: its header (subject, status, assigneeId, assigneeName, assigneeAlias, inboxes (each with id and name), tagIds, ticketIds, ticketStatus, scheduledReminders, updatedAt) plus a paginated, newest-first timeline of messages, comments, and activity entries under \`entries\`. Pass \`entries.nextCursor\` back as \`cursor\` to fetch older entries, and stop when \`entries.hasMore\` is false. Active drafts and customFields are included on the first page only (both fields are omitted once a \`cursor\` is supplied).`,
    params: [
      {
        name: 'conversationId',
        type: 'string',
        required: true,
        description: `Public conversation ID (cnv_xxx).`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor for timeline entries.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum entries to return (default 50, max 200).`,
      },
    ],
  },
  {
    name: 'frontmcp_read_message',
    description: `Fetch a single message by ID with full content. Returns the message body (quoted replies stripped for clarity), recipients (from/to/cc/bcc), attachments, author, draft status, and delivery error type if applicable.`,
    params: [
      {
        name: 'messageId',
        type: 'string',
        required: true,
        description: `The message ID to read (msg_xxx format).`,
      },
    ],
  },
  {
    name: 'frontmcp_search_accounts',
    description: `Search accounts (companies) by name.`,
    params: [
      {
        name: 'limit',
        type: 'string',
        required: false,
        description: `Maximum number of results (default 10, max 25)`,
      },
      {
        name: 'name_query',
        type: 'string',
        required: false,
        description: `Optional account name keywords. Use this only for the account name itself.`,
      },
      {
        name: 'offset',
        type: 'string',
        required: false,
        description: `Offset for pagination (default 0). Use with limit to paginate through results.`,
      },
    ],
  },
  {
    name: 'frontmcp_search_contacts',
    description: `Search contacts by name or email.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Search query for contacts (name, email, or handle).`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor returned by a previous call.`,
      },
    ],
  },
  {
    name: 'frontmcp_search_conversations',
    description: `Search conversations by query and/or filters. Use the \`filters\` object to narrow by inbox, assignee, team, tags, status, or an absolute date range (after/before). \`query\` is optional when at least one filter is provided, so filters alone can list an inbox or a teammate's conversations.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor returned by a previous call.`,
      },
      {
        name: 'filters',
        type: 'object',
        required: false,
        description: `Optional filter set to narrow results.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Full-text search query for conversations. Optional when at least one filter is provided.`,
      },
      {
        name: 'scope',
        type: 'string',
        required: false,
        description: `Restricts which conversations are searched (default "my_conversations"). "my_conversations": conversations assigned to you, in your private inboxes, or in shared inboxes you participate in. "my_workspace": every conversation in your workspace. "all_inboxes": every conversation you can access (broadest). Results echo the scope actually applied as resolvedScope.`,
      },
    ],
  },
  {
    name: 'frontmcp_send_message',
    description: `Send a draft message created via create_draft (queues it for delivery). Works for both reply drafts and new conversation drafts.`,
    params: [
      {
        name: 'draftId',
        type: 'string',
        required: true,
        description: `Draft ID to send (msg_xxx), as returned by create_draft. The draft must be in compose state (not scheduled or already being sent), owned by the authenticated teammate, and have at least one recipient.`,
      },
    ],
  },
  {
    name: 'frontmcp_tag_conversation',
    description: `Add or remove tags on a conversation.`,
    params: [
      {
        name: 'conversationId',
        type: 'string',
        required: true,
        description: `Public conversation ID (cnv_xxx).`,
      },
      { name: 'addTags', type: 'array', required: false, description: `Tag IDs (tag_xxx) to add.` },
      {
        name: 'removeTags',
        type: 'array',
        required: false,
        description: `Tag IDs (tag_xxx) to remove.`,
      },
    ],
  },
  {
    name: 'frontmcp_update_conversation_status',
    description: `Update a conversation's status. Provide exactly one of \`status\`, \`statusId\`, or \`snoozeUntil\`. Use \`status\` ("archived" / "open") to archive or reopen from the requester's point of view, matching the Front "Archive" / "Move to inbox" buttons: if the requester is the conversation's assignee (or it lives in their private inbox), the change is global — everyone with access sees the new status; if the requester is not the assignee on a shared conversation, only their personal view changes. Setting \`status: "open"\` on a snoozed conversation cancels its reminder. Use \`statusId\` (a ticket-status, sts_xxx, from list_statuses) to set the ticket status on a ticketing-enabled inbox — this also updates the conversation's open/archived state to match the status category. Setting a ticket status requires ticketing to be enabled. Use \`snoozeUntil\` (ISO-8601) to snooze the conversation until a given time; all snoozes also auto-cancel when an inbound message arrives.`,
    params: [
      {
        name: 'conversationId',
        type: 'string',
        required: true,
        description: `Public conversation ID (cnv_xxx).`,
      },
      {
        name: 'snoozeUntil',
        type: 'string',
        required: false,
        description: `ISO-8601 timestamp to snooze the conversation until (e.g. 2024-01-15T09:00:00Z): it archives now and reopens then. A snooze auto-cancels when an inbound message arrives. Provide exactly one of status, statusId, or snoozeUntil.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `"archived" removes the conversation from the requester's open inbox; "open" returns it. Whether other teammates see the change depends on whether the requester is the assignee — see the tool description. Provide either status or statusId, not both.`,
      },
      {
        name: 'statusId',
        type: 'string',
        required: false,
        description: `Ticket-status ID (sts_xxx), as returned by list_statuses. Sets the ticket status; the conversation's open/archived state follows the status category. Requires ticketing to be enabled for the company. Provide exactly one of status, statusId, or snoozeUntil.`,
      },
    ],
  },
  {
    name: 'frontmcp_update_draft',
    description: `Update the body, subject, or recipients of an existing draft. Pass the version from read_message for conflict detection — the call fails if the draft changed since you read it. Omitted fields are left unchanged; providing to/cc/bcc replaces that recipient list. Use takeOver:true to claim a draft you do not own.`,
    params: [
      {
        name: 'draftId',
        type: 'string',
        required: true,
        description: `Public draft message ID (msg_xxx) to update, from list_drafts or read_message.`,
      },
      {
        name: 'version',
        type: 'string',
        required: true,
        description: `Opaque version token from read_message.draftVersion. Used for conflict detection; the call fails with a conflict error if the draft changed since you read it.`,
      },
      {
        name: 'bcc',
        type: 'array',
        required: false,
        description: `Replace the BCC recipients. Omit to leave BCC unchanged; pass [] to clear it.`,
      },
      {
        name: 'body',
        type: 'string',
        required: false,
        description: `New draft body (interpreted per bodyFormat; HTML by default). Omit to leave the body unchanged.`,
      },
      {
        name: 'bodyFormat',
        type: 'string',
        required: false,
        description: `How body is interpreted (default html): "html" is used as-is; "markdown" and "plain" are converted to HTML.`,
      },
      {
        name: 'cc',
        type: 'array',
        required: false,
        description: `Replace the CC recipients. Omit to leave CC unchanged; pass [] to clear it.`,
      },
      {
        name: 'channelId',
        type: 'string',
        required: false,
        description: `Override the sending channel (cha_xxx). Omit to keep the draft's current channel.`,
      },
      {
        name: 'subject',
        type: 'string',
        required: false,
        description: `New subject (email channels). Omit to leave the subject unchanged.`,
      },
      {
        name: 'takeOver',
        type: 'boolean',
        required: false,
        description: `If true and you are not the draft owner, claim authorship before editing. Omit (or set false) to enforce owner-only access — the call returns an error if you are not the current owner. No-op if you already own the draft.`,
      },
      {
        name: 'to',
        type: 'array',
        required: false,
        description: `Replace the TO recipients (channel handles). Omit to leave TO unchanged; pass [] to clear it.`,
      },
    ],
  },
]
