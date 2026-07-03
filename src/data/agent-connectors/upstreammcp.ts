import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'upstreammcp_compose_thread',
    description: `Create and send a new email thread. Requires at least one recipient in the "to" field. Optionally assign to channels for team visibility.`,
    params: [
      { name: 'body', type: 'string', required: true, description: `Email body (HTML supported)` },
      {
        name: 'to',
        type: 'array',
        required: true,
        description: `Primary recipients (email addresses)`,
      },
      { name: 'bcc', type: 'array', required: false, description: `BCC recipients` },
      { name: 'cc', type: 'array', required: false, description: `CC recipients` },
      {
        name: 'channelIds',
        type: 'array',
        required: false,
        description: `Channel IDs to assign this thread to (from list-channels)`,
      },
      {
        name: 'includeSignatures',
        type: 'boolean',
        required: false,
        description: `Whether to append Gmail and Upstream signatures when they are not already present`,
      },
      { name: 'subject', type: 'string', required: false, description: `Email subject line` },
    ],
  },
  {
    name: 'upstreammcp_create_channel',
    description: `Create a new team channel for organizing and sharing threads. Requires an organization membership. Use get-self to find your organization ID.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Channel name` },
      {
        name: 'organizationId',
        type: 'string',
        required: true,
        description: `Organization ID (from get-self)`,
      },
      {
        name: 'color',
        type: 'string',
        required: false,
        description: `Channel color (defaults to lynch)`,
      },
      {
        name: 'isPublic',
        type: 'boolean',
        required: false,
        description: `Whether the channel is public (default: true)`,
      },
    ],
  },
  {
    name: 'upstreammcp_create_inbox_split',
    description: `Create a new custom inbox split. Splits filter inbox threads by a query string (matching sender, subject, body). Use list-inbox-splits to see existing splits.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Split display name` },
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Filter query — emails matching this appear in the split`,
      },
      {
        name: 'showInCategorySplit',
        type: 'boolean',
        required: false,
        description: `Also show matching threads in their original category (default: true)`,
      },
    ],
  },
  {
    name: 'upstreammcp_create_label',
    description: `Create a new label for organizing threads. Use manage-thread-labels to apply labels to threads after creation.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Label name` },
      {
        name: 'color',
        type: 'string',
        required: false,
        description: `Label color (defaults to slate_gray). Available: slate_gray, lavender_gray, jelly_bean, pale_chestnut, mandarin, apricot, mellow_apricot, very_pale_orange, naples_yellow, blond, medium_aquamarine, magic_mint, forest_green, jet_stream, cadet_blue, crystal, havelock_blue, beau_blue, medium_purple, pale_lavender, pastel_magenta, pale_pink, tuscany, timberwolf`,
      },
    ],
  },
  {
    name: 'upstreammcp_create_rule',
    description: `Create a new inbox automation rule. Rules match emails by query string and add matching emails to a channel automatically. Queries match against sender, subject, and body. Set applyToIncoming=true to apply to future incoming emails, bulkApplication=true to apply to existing matching threads.`,
    params: [
      {
        name: 'actions',
        type: 'array',
        required: true,
        description: `Actions to apply on matching emails`,
      },
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Match query — emails matching this text trigger the rule`,
      },
      {
        name: 'applyToIncoming',
        type: 'boolean',
        required: false,
        description: `Apply to future incoming emails (default: true)`,
      },
      {
        name: 'bulkApplication',
        type: 'boolean',
        required: false,
        description: `Also apply to existing matching threads (default: false)`,
      },
    ],
  },
  {
    name: 'upstreammcp_delete_inbox_split',
    description: `Permanently delete a custom inbox split. Threads previously in this split remain in their categories. Use list-inbox-splits to get split IDs.`,
    params: [
      { name: 'splitId', type: 'string', required: true, description: `Inbox split ID to delete` },
    ],
  },
  {
    name: 'upstreammcp_delete_rule',
    description: `Permanently delete an inbox automation rule. Use list-rules first to get rule IDs.`,
    params: [
      {
        name: 'ruleId',
        type: 'string',
        required: true,
        description: `Rule ID to delete (from list-rules)`,
      },
    ],
  },
  {
    name: 'upstreammcp_done_thread',
    description: `Archive/mark a thread as done, removing it from the inbox. The thread remains accessible via search or folder views but leaves the active inbox. Pass the inbox item IDs (from get-inbox-split-threads results).`,
    params: [
      {
        name: 'inboxItemIds',
        type: 'array',
        required: true,
        description: `Inbox item IDs to mark done (from get-inbox-split-threads)`,
      },
    ],
  },
  {
    name: 'upstreammcp_generate_draft',
    description: `Generate an AI-powered draft reply for a thread. Returns the draft text directly — use it with reply-to-thread to send. The draft is based on thread context, user writing style, and optional custom instructions. Consumes one draft quota unit.`,
    params: [
      {
        name: 'threadId',
        type: 'string',
        required: true,
        description: `Thread ID to generate a draft for`,
      },
      {
        name: 'currentDraftBody',
        type: 'string',
        required: false,
        description: `Optional existing draft body to refine or continue`,
      },
      {
        name: 'customInstructions',
        type: 'string',
        required: false,
        description: `Optional instructions to guide draft generation (e.g. "be formal", "decline politely")`,
      },
    ],
  },
  {
    name: 'upstreammcp_get_channel_threads',
    description: `List threads in a specific channel. Use list-channels first to get channel IDs. Returns paginated thread list with subjects, senders, and dates.`,
    params: [
      {
        name: 'channelId',
        type: 'string',
        required: true,
        description: `Channel ID from list-channels`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Max results, 1-50 (default 20)`,
      },
      {
        name: 'pageToken',
        type: 'string',
        required: false,
        description: `Cursor for next page from previous response`,
      },
    ],
  },
  {
    name: 'upstreammcp_get_inbox_split_threads',
    description: `List threads in a specific inbox split, category, or system split. Provide exactly one of splitId, category, or systemSplit. Get valid filter values from list-inbox-splits first.`,
    params: [
      {
        name: 'category',
        type: 'string',
        required: false,
        description: `Inbox category (e.g. CATEGORY_PRIMARY)`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Page size, 1-100 (default 20)`,
      },
      {
        name: 'pageToken',
        type: 'string',
        required: false,
        description: `Cursor for next page from previous response`,
      },
      {
        name: 'splitId',
        type: 'string',
        required: false,
        description: `Custom inbox split ID from list-inbox-splits`,
      },
      {
        name: 'systemSplit',
        type: 'string',
        required: false,
        description: `System split: "follow-ups", "needs-reply", or "cold-emails"`,
      },
    ],
  },
  {
    name: 'upstreammcp_get_label_threads',
    description: `List threads with a specific label. Use list-labels first to get label IDs. Returns paginated thread list.`,
    params: [
      { name: 'labelId', type: 'string', required: true, description: `Label ID from list-labels` },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Max results, 1-50 (default 20)`,
      },
      {
        name: 'pageToken',
        type: 'string',
        required: false,
        description: `Cursor for next page from previous response`,
      },
    ],
  },
  {
    name: 'upstreammcp_get_self',
    description: `Get current user profile, account status, settings, and organization memberships in one call. Useful for understanding user identity, feature flags, unread counts, and AI draft configuration.`,
    params: [],
  },
  {
    name: 'upstreammcp_list_channels',
    description: `List all channels the user belongs to. Channels are team shared spaces for organizing threads. Returns channel IDs, names, colors, member counts, and unread counts. Use get-channel-threads to browse threads within a channel.`,
    params: [],
  },
  {
    name: 'upstreammcp_list_contacts',
    description: `List all contacts the user has interacted with. Returns email addresses, display names, and profile pictures. Useful for finding recipient addresses when composing or replying to emails.`,
    params: [],
  },
  {
    name: 'upstreammcp_list_draft_threads',
    description: `List new thread drafts saved through MCP. Returns unsent draft threads owned by the user.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Max results, 1-50 (default 20)`,
      },
      {
        name: 'pageToken',
        type: 'string',
        required: false,
        description: `Cursor for next page from previous response`,
      },
    ],
  },
  {
    name: 'upstreammcp_list_inbox_splits',
    description: `List all inbox splits visible to the authenticated user, in display order. Includes Primary, system splits (Needs Reply, Follow Ups), custom splits, and category splits (Promotions, Social, Updates). Each entry contains a filter_param object — pass it directly to get-inbox-split-threads. Use this tool first to discover available splits before fetching threads.`,
    params: [],
  },
  {
    name: 'upstreammcp_list_labels',
    description: `List all labels the user has created. Returns label IDs, names, and colors. Use get-label-threads to browse threads with a specific label.`,
    params: [],
  },
  {
    name: 'upstreammcp_list_org_members',
    description: `List all members of an organization. Returns user IDs, names, emails, and profile pictures. Use get-self to find your organization ID.`,
    params: [
      {
        name: 'organizationId',
        type: 'string',
        required: true,
        description: `Organization ID (from get-self)`,
      },
    ],
  },
  {
    name: 'upstreammcp_list_rules',
    description: `List all inbox automation rules. Rules automatically apply actions (add to channel, add label, star, mark spam) to matching emails. Returns rule IDs, queries, actions, and whether they apply to incoming mail.`,
    params: [],
  },
  {
    name: 'upstreammcp_list_scheduled_threads',
    description: `List threads with scheduled sends. Returns threads with messages scheduled for future delivery.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Max results, 1-50 (default 20)`,
      },
      {
        name: 'pageToken',
        type: 'string',
        required: false,
        description: `Cursor for next page from previous response`,
      },
    ],
  },
  {
    name: 'upstreammcp_list_sent_threads',
    description: `List threads from the Sent folder. Returns sent emails with subjects, recipients, and dates.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Max results, 1-50 (default 20)`,
      },
      {
        name: 'pageToken',
        type: 'string',
        required: false,
        description: `Cursor for next page from previous response`,
      },
    ],
  },
  {
    name: 'upstreammcp_list_snoozed_threads',
    description: `List snoozed threads. Returns threads the user has deferred to reappear later.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Max results, 1-50 (default 20)`,
      },
      {
        name: 'pageToken',
        type: 'string',
        required: false,
        description: `Cursor for next page from previous response`,
      },
    ],
  },
  {
    name: 'upstreammcp_list_spam_threads',
    description: `List threads in the Spam folder. Returns threads marked as spam.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Max results, 1-50 (default 20)`,
      },
      {
        name: 'pageToken',
        type: 'string',
        required: false,
        description: `Cursor for next page from previous response`,
      },
    ],
  },
  {
    name: 'upstreammcp_list_starred_threads',
    description: `List starred/flagged threads. Returns threads the user has starred for quick access.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Max results, 1-50 (default 20)`,
      },
      {
        name: 'pageToken',
        type: 'string',
        required: false,
        description: `Cursor for next page from previous response`,
      },
    ],
  },
  {
    name: 'upstreammcp_list_trashed_threads',
    description: `List threads in the Trash. Returns deleted threads that can be restored.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Max results, 1-50 (default 20)`,
      },
      {
        name: 'pageToken',
        type: 'string',
        required: false,
        description: `Cursor for next page from previous response`,
      },
    ],
  },
  {
    name: 'upstreammcp_manage_channel_participants',
    description: `Add or remove members from a channel. Use list-org-members to find user IDs and list-channels to find channel IDs.`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: true,
        description: `"add" to invite members, "remove" to remove them`,
      },
      { name: 'channelId', type: 'string', required: true, description: `Channel ID to modify` },
      {
        name: 'participantIds',
        type: 'array',
        required: true,
        description: `User IDs to add or remove`,
      },
    ],
  },
  {
    name: 'upstreammcp_manage_thread_channels',
    description: `Add or remove channel assignments on one or more threads. Use list-channels to get available channel IDs.`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: true,
        description: `"add" to assign to channels, "remove" to unassign`,
      },
      {
        name: 'channelIds',
        type: 'array',
        required: true,
        description: `Channel IDs to add or remove`,
      },
      { name: 'threadIds', type: 'array', required: true, description: `Thread IDs to modify` },
    ],
  },
  {
    name: 'upstreammcp_manage_thread_followers',
    description: `Add or remove followers on a thread. Followers get notifications about thread activity. Use list-org-members to get user IDs.`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: true,
        description: `"add" to follow, "remove" to unfollow`,
      },
      {
        name: 'threadId',
        type: 'string',
        required: true,
        description: `Thread ID to modify followers on`,
      },
      {
        name: 'userIds',
        type: 'array',
        required: true,
        description: `User IDs to add or remove as followers`,
      },
    ],
  },
  {
    name: 'upstreammcp_manage_thread_labels',
    description: `Add or remove labels on one or more threads. Use list-labels to get available label IDs.`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: true,
        description: `"add" to apply labels, "remove" to take them off`,
      },
      {
        name: 'labelIds',
        type: 'array',
        required: true,
        description: `Label IDs to add or remove`,
      },
      { name: 'threadIds', type: 'array', required: true, description: `Thread IDs to modify` },
    ],
  },
  {
    name: 'upstreammcp_mark_read',
    description: `Mark all messages in a thread as read. Clears the unread indicator for this thread.`,
    params: [
      {
        name: 'threadId',
        type: 'string',
        required: true,
        description: `Thread ID to mark as read`,
      },
    ],
  },
  {
    name: 'upstreammcp_mark_spam',
    description: `Mark a thread as spam or remove the spam designation. Spam threads are moved to the spam folder.`,
    params: [
      {
        name: 'spam',
        type: 'boolean',
        required: true,
        description: `true to mark as spam, false to mark as not spam`,
      },
      { name: 'threadId', type: 'string', required: true, description: `Thread ID` },
    ],
  },
  {
    name: 'upstreammcp_move_to_category',
    description: `Move threads from one inbox category to another. Use list-inbox-splits to see available categories.`,
    params: [
      {
        name: 'fromCategory',
        type: 'string',
        required: true,
        description: `Current category of the threads`,
      },
      { name: 'threadIds', type: 'array', required: true, description: `Thread IDs to move` },
      {
        name: 'toCategory',
        type: 'string',
        required: true,
        description: `Target category to move threads to`,
      },
    ],
  },
  {
    name: 'upstreammcp_post_thread_comment',
    description: `Post an internal team comment on a thread. Comments are only visible to organization members, not to external email recipients. Use get-self to find your organization ID.`,
    params: [
      {
        name: 'body',
        type: 'string',
        required: true,
        description: `Comment body (HTML supported)`,
      },
      {
        name: 'organizationId',
        type: 'string',
        required: true,
        description: `Organization ID (from get-self)`,
      },
      { name: 'threadId', type: 'string', required: true, description: `Thread ID to comment on` },
    ],
  },
  {
    name: 'upstreammcp_read_thread',
    description: `Read a thread with its messages. Use response_format "concise" (default) for metadata and snippets only — saves context tokens. Use "detailed" for full message bodies when you need complete content.`,
    params: [
      {
        name: 'threadId',
        type: 'string',
        required: true,
        description: `Thread ID from get-inbox-split-threads or search-inbox`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `Level of detail: "concise" (default) returns snippets; "detailed" returns full bodies`,
      },
    ],
  },
  {
    name: 'upstreammcp_read_thread_comments',
    description: `Read internal team comments on a thread (not visible to external recipients). Comments are scoped to an organization. Use get-self to find your organization ID. Use response_format "concise" (default) for snippets; "detailed" for full bodies.`,
    params: [
      {
        name: 'organizationId',
        type: 'string',
        required: true,
        description: `Organization ID (from get-self)`,
      },
      {
        name: 'threadId',
        type: 'string',
        required: true,
        description: `Thread ID from search-inbox or get-inbox-split-threads`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `Level of detail: "concise" (default) returns snippets; "detailed" returns full bodies`,
      },
    ],
  },
  {
    name: 'upstreammcp_reply_to_thread',
    description: `Send a reply in an existing thread. You must provide at least one "to" recipient. Use read-thread to see existing participants. Optionally add cc/bcc addresses.`,
    params: [
      {
        name: 'body',
        type: 'string',
        required: true,
        description: `Reply message body (HTML supported)`,
      },
      { name: 'threadId', type: 'string', required: true, description: `Thread ID to reply to` },
      {
        name: 'to',
        type: 'array',
        required: true,
        description: `"To" recipients — use read-thread to see thread participants`,
      },
      {
        name: 'bcc',
        type: 'array',
        required: false,
        description: `BCC recipients (email addresses)`,
      },
      {
        name: 'cc',
        type: 'array',
        required: false,
        description: `CC recipients (email addresses)`,
      },
      {
        name: 'includeSignatures',
        type: 'boolean',
        required: false,
        description: `Whether to append Gmail and Upstream signatures when they are not already present`,
      },
    ],
  },
  {
    name: 'upstreammcp_save_draft_reply',
    description: `Save a draft reply in an existing thread without sending it. If recipients are omitted, Upstream stores no recipients on the draft and uses the current default reply recipients when the draft is opened. If recipients are provided, they replace the defaults and are stored on the draft.`,
    params: [
      {
        name: 'body',
        type: 'string',
        required: true,
        description: `Draft reply body (HTML supported)`,
      },
      {
        name: 'threadId',
        type: 'string',
        required: true,
        description: `Thread ID to save a draft reply for`,
      },
      {
        name: 'explanation',
        type: 'string',
        required: false,
        description: `Optional user-visible explanation shown with the saved draft in Upstream`,
      },
      {
        name: 'overwriteExistingDraft',
        type: 'boolean',
        required: false,
        description: `Whether to replace an existing active draft on this thread`,
      },
      {
        name: 'recipients',
        type: 'object',
        required: false,
        description: `Optional full recipient override. If omitted, Upstream uses current default reply recipients when the draft is opened.`,
      },
    ],
  },
  {
    name: 'upstreammcp_save_draft_thread',
    description: `Save a new email thread draft without sending it. Recipients and channel IDs are optional and can be added later in Upstream. Use compose-thread when the message should be sent immediately.`,
    params: [
      { name: 'body', type: 'string', required: true, description: `Draft body (HTML supported)` },
      { name: 'bcc', type: 'array', required: false, description: `BCC recipients` },
      { name: 'cc', type: 'array', required: false, description: `CC recipients` },
      {
        name: 'channelIds',
        type: 'array',
        required: false,
        description: `Channel IDs to assign this draft thread to (from list-channels)`,
      },
      { name: 'subject', type: 'string', required: false, description: `Email subject line` },
      {
        name: 'to',
        type: 'array',
        required: false,
        description: `Primary recipients (email addresses)`,
      },
    ],
  },
  {
    name: 'upstreammcp_search_inbox',
    description: `Search across all inbox threads by keyword or phrase. Returns matching threads with subjects, senders, and dates. More efficient than browsing splits when looking for specific content. Use read-thread to get full details of a specific result.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Search query — matches subject, body, and sender fields`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Max results, 1-50 (default 10)`,
      },
      {
        name: 'pageToken',
        type: 'string',
        required: false,
        description: `Cursor for next page from previous response`,
      },
    ],
  },
  {
    name: 'upstreammcp_snooze_thread',
    description: `Snooze a thread until a specific date/time. The thread will be removed from the inbox and reappear at the specified time. Use list-snoozed-threads to see currently snoozed threads.`,
    params: [
      {
        name: 'snoozeUntil',
        type: 'string',
        required: true,
        description: `ISO 8601 date-time when the thread should reappear (e.g. "2025-01-15T09:00:00Z")`,
      },
      { name: 'threadId', type: 'string', required: true, description: `Thread ID to snooze` },
    ],
  },
  {
    name: 'upstreammcp_star_threads',
    description: `Star or unstar one or more threads. Starred threads appear in list-starred-threads.`,
    params: [
      {
        name: 'starred',
        type: 'boolean',
        required: true,
        description: `true to star, false to unstar`,
      },
      {
        name: 'threadIds',
        type: 'array',
        required: true,
        description: `Thread IDs to star/unstar`,
      },
    ],
  },
  {
    name: 'upstreammcp_trash_threads',
    description: `Move threads to trash or restore them. Trashed threads can be restored with trashed=false. Use list-trashed-threads to see trashed threads.`,
    params: [
      {
        name: 'threadIds',
        type: 'array',
        required: true,
        description: `Thread IDs to trash/untrash`,
      },
      {
        name: 'trashed',
        type: 'boolean',
        required: true,
        description: `true to trash, false to restore from trash`,
      },
    ],
  },
  {
    name: 'upstreammcp_update_inbox_split',
    description: `Update an existing custom inbox split. Only provided fields are changed. Use list-inbox-splits to get split IDs.`,
    params: [
      { name: 'splitId', type: 'string', required: true, description: `Inbox split ID to update` },
      { name: 'name', type: 'string', required: false, description: `New display name` },
      { name: 'query', type: 'string', required: false, description: `New filter query` },
      {
        name: 'showInCategorySplit',
        type: 'boolean',
        required: false,
        description: `Whether to also show in category view`,
      },
    ],
  },
  {
    name: 'upstreammcp_update_rule',
    description: `Update an existing inbox automation rule. Only provided fields are updated; omitted fields remain unchanged. Only ADD_TO_CHANNEL actions are currently supported. Use list-rules first to get rule IDs.`,
    params: [
      {
        name: 'ruleId',
        type: 'string',
        required: true,
        description: `Rule ID to update (from list-rules)`,
      },
      {
        name: 'actions',
        type: 'array',
        required: false,
        description: `New actions (replaces all existing actions)`,
      },
      { name: 'query', type: 'string', required: false, description: `New match query` },
    ],
  },
  {
    name: 'upstreammcp_update_settings',
    description: `Update user settings like auto-draft configuration, theme, and notification preferences. Only provided fields are changed. Use get-self to see current settings first.`,
    params: [
      {
        name: 'autoAdvanceEnabled',
        type: 'boolean',
        required: false,
        description: `Automatically advance to next thread after triaging`,
      },
      {
        name: 'autoDraftEnabled',
        type: 'boolean',
        required: false,
        description: `Enable or disable AI auto-drafting`,
      },
      {
        name: 'brandingSignatureEnabled',
        type: 'boolean',
        required: false,
        description: `Include branding in email signature`,
      },
      {
        name: 'gmailSignatureEnabled',
        type: 'boolean',
        required: false,
        description: `Include the primary Gmail signature in sent emails`,
      },
    ],
  },
]
