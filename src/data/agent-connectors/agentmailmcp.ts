import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'agentmailmcp_create_draft',
    description: `Create a draft email in an inbox, optionally scheduling it to send at a future time.`,
    params: [
      { name: 'inboxId', type: 'string', required: true, description: `ID of inbox` },
      { name: 'attachments', type: 'array', required: false, description: `Attachments` },
      { name: 'bcc', type: 'array', required: false, description: `BCC recipients` },
      { name: 'cc', type: 'array', required: false, description: `CC recipients` },
      { name: 'html', type: 'string', required: false, description: `HTML body` },
      {
        name: 'inReplyTo',
        type: 'string',
        required: false,
        description: `Message ID this draft is replying to`,
      },
      { name: 'labels', type: 'array', required: false, description: `Labels` },
      { name: 'replyTo', type: 'array', required: false, description: `Reply-to addresses` },
      {
        name: 'sendAt',
        type: 'string',
        required: false,
        description: `ISO 8601 datetime to schedule sending (e.g. 2026-04-01T09:00:00Z)`,
      },
      { name: 'subject', type: 'string', required: false, description: `Subject` },
      { name: 'text', type: 'string', required: false, description: `Plain text body` },
      { name: 'to', type: 'array', required: false, description: `Recipients` },
    ],
  },
  {
    name: 'agentmailmcp_create_inbox',
    description: `Create a new inbox with a given username and domain for sending and receiving email.`,
    params: [
      { name: 'displayName', type: 'string', required: false, description: `Display name` },
      { name: 'domain', type: 'string', required: false, description: `Domain` },
      { name: 'username', type: 'string', required: false, description: `Username` },
    ],
  },
  {
    name: 'agentmailmcp_delete_draft',
    description: `Delete a draft by ID. Also cancels any scheduled send for that draft.`,
    params: [
      { name: 'draftId', type: 'string', required: true, description: `ID of draft` },
      { name: 'inboxId', type: 'string', required: true, description: `ID of inbox` },
    ],
  },
  {
    name: 'agentmailmcp_delete_inbox',
    description: `Permanently delete an inbox and all its associated messages.`,
    params: [{ name: 'inboxId', type: 'string', required: true, description: `ID of inbox` }],
  },
  {
    name: 'agentmailmcp_forward_message',
    description: `Forward an existing message to one or more recipients, optionally adding extra content.`,
    params: [
      { name: 'inboxId', type: 'string', required: true, description: `ID of inbox` },
      { name: 'messageId', type: 'string', required: true, description: `ID of message` },
      { name: 'to', type: 'array', required: true, description: `Recipients` },
      { name: 'attachments', type: 'array', required: false, description: `Attachments` },
      { name: 'bcc', type: 'array', required: false, description: `BCC recipients` },
      { name: 'cc', type: 'array', required: false, description: `CC recipients` },
      { name: 'html', type: 'string', required: false, description: `HTML body` },
      { name: 'labels', type: 'array', required: false, description: `Labels` },
      { name: 'subject', type: 'string', required: false, description: `Subject` },
      { name: 'text', type: 'string', required: false, description: `Plain text body` },
    ],
  },
  {
    name: 'agentmailmcp_get_attachment',
    description: `Retrieve a specific attachment from a message thread by attachment ID.`,
    params: [
      { name: 'attachmentId', type: 'string', required: true, description: `ID of attachment` },
      { name: 'inboxId', type: 'string', required: true, description: `ID of inbox` },
      { name: 'threadId', type: 'string', required: true, description: `ID of thread` },
    ],
  },
  {
    name: 'agentmailmcp_get_draft',
    description: `Retrieve a draft by ID, including its content, status, and scheduled send time.`,
    params: [
      { name: 'draftId', type: 'string', required: true, description: `ID of draft` },
      { name: 'inboxId', type: 'string', required: true, description: `ID of inbox` },
    ],
  },
  {
    name: 'agentmailmcp_get_inbox',
    description: `Retrieve inbox details by ID, including its email address and configuration.`,
    params: [{ name: 'inboxId', type: 'string', required: true, description: `ID of inbox` }],
  },
  {
    name: 'agentmailmcp_get_thread',
    description: `Retrieve a message thread by ID, including all messages in the conversation.`,
    params: [
      { name: 'inboxId', type: 'string', required: true, description: `ID of inbox` },
      { name: 'threadId', type: 'string', required: true, description: `ID of thread` },
    ],
  },
  {
    name: 'agentmailmcp_list_drafts',
    description: `List drafts in an inbox with optional label filtering and pagination.`,
    params: [
      { name: 'inboxId', type: 'string', required: true, description: `ID of inbox` },
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Filter items after datetime`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Filter items before datetime`,
      },
      { name: 'labels', type: 'array', required: false, description: `Labels to filter items by` },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Max number of items to return`,
      },
      {
        name: 'pageToken',
        type: 'string',
        required: false,
        description: `Page token for pagination`,
      },
    ],
  },
  {
    name: 'agentmailmcp_list_inboxes',
    description: `List all inboxes with pagination support.`,
    params: [
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Max number of items to return`,
      },
      {
        name: 'pageToken',
        type: 'string',
        required: false,
        description: `Page token for pagination`,
      },
    ],
  },
  {
    name: 'agentmailmcp_list_threads',
    description: `List message threads in an inbox with optional label filtering and pagination.`,
    params: [
      { name: 'inboxId', type: 'string', required: true, description: `ID of inbox` },
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Filter items after datetime`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Filter items before datetime`,
      },
      { name: 'labels', type: 'array', required: false, description: `Labels to filter items by` },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Max number of items to return`,
      },
      {
        name: 'pageToken',
        type: 'string',
        required: false,
        description: `Page token for pagination`,
      },
    ],
  },
  {
    name: 'agentmailmcp_reply_to_message',
    description: `Reply to a specific message, optionally replying to all recipients.`,
    params: [
      { name: 'inboxId', type: 'string', required: true, description: `ID of inbox` },
      { name: 'messageId', type: 'string', required: true, description: `ID of message` },
      { name: 'attachments', type: 'array', required: false, description: `Attachments` },
      { name: 'html', type: 'string', required: false, description: `HTML body` },
      { name: 'labels', type: 'array', required: false, description: `Labels` },
      {
        name: 'replyAll',
        type: 'boolean',
        required: false,
        description: `Reply to all recipients`,
      },
      { name: 'text', type: 'string', required: false, description: `Plain text body` },
    ],
  },
  {
    name: 'agentmailmcp_send_draft',
    description: `Send a draft immediately, converting it to a sent message.`,
    params: [
      { name: 'draftId', type: 'string', required: true, description: `ID of draft` },
      { name: 'inboxId', type: 'string', required: true, description: `ID of inbox` },
    ],
  },
  {
    name: 'agentmailmcp_send_message',
    description: `Send a new email message from an inbox to one or more recipients.`,
    params: [
      { name: 'inboxId', type: 'string', required: true, description: `ID of inbox` },
      { name: 'to', type: 'array', required: true, description: `Recipients` },
      { name: 'attachments', type: 'array', required: false, description: `Attachments` },
      { name: 'bcc', type: 'array', required: false, description: `BCC recipients` },
      { name: 'cc', type: 'array', required: false, description: `CC recipients` },
      { name: 'html', type: 'string', required: false, description: `HTML body` },
      { name: 'labels', type: 'array', required: false, description: `Labels` },
      { name: 'subject', type: 'string', required: false, description: `Subject` },
      { name: 'text', type: 'string', required: false, description: `Plain text body` },
    ],
  },
  {
    name: 'agentmailmcp_update_draft',
    description: `Update a draft's content, recipients, or scheduled send time.`,
    params: [
      { name: 'draftId', type: 'string', required: true, description: `ID of draft` },
      { name: 'inboxId', type: 'string', required: true, description: `ID of inbox` },
      { name: 'bcc', type: 'array', required: false, description: `BCC recipients` },
      { name: 'cc', type: 'array', required: false, description: `CC recipients` },
      { name: 'html', type: 'string', required: false, description: `HTML body` },
      { name: 'replyTo', type: 'array', required: false, description: `Reply-to addresses` },
      {
        name: 'sendAt',
        type: 'string',
        required: false,
        description: `ISO 8601 datetime to reschedule sending`,
      },
      { name: 'subject', type: 'string', required: false, description: `Subject` },
      { name: 'text', type: 'string', required: false, description: `Plain text body` },
      { name: 'to', type: 'array', required: false, description: `Recipients` },
    ],
  },
  {
    name: 'agentmailmcp_update_message',
    description: `Update a message's labels by adding or removing label values.`,
    params: [
      { name: 'inboxId', type: 'string', required: true, description: `ID of inbox` },
      { name: 'messageId', type: 'string', required: true, description: `ID of message` },
      { name: 'addLabels', type: 'array', required: false, description: `Labels to add` },
      { name: 'removeLabels', type: 'array', required: false, description: `Labels to remove` },
    ],
  },
]
