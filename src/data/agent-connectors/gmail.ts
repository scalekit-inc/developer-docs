import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'gmail_fetch_mails',
    description: `Fetch emails from a connected Gmail account using search filters. Requires a valid Gmail OAuth2 connection.`,
    params: [
      {
        name: 'format',
        type: 'string',
        required: false,
        description: `Format of the returned message.`,
      },
      {
        name: 'include_spam_trash',
        type: 'boolean',
        required: false,
        description: `Whether to fetch emails from spam and trash folders`,
      },
      {
        name: 'label_ids',
        type: 'array',
        required: false,
        description: `Gmail label IDs to filter messages`,
      },
      {
        name: 'max_results',
        type: 'integer',
        required: false,
        description: `Maximum number of emails to fetch`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `Page token for pagination`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Search query string using Gmail's search syntax (e.g., 'is:unread from:user@example.com')`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Optional schema version to use for tool execution`,
      },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Optional tool version to use for execution`,
      },
    ],
  },
  {
    name: 'gmail_get_attachment_by_id',
    description: `Retrieve a specific attachment from a Gmail message using the message ID and attachment ID.`,
    params: [
      {
        name: 'attachment_id',
        type: 'string',
        required: true,
        description: `Unique Gmail attachment ID`,
      },
      {
        name: 'message_id',
        type: 'string',
        required: true,
        description: `Unique Gmail message ID that contains the attachment`,
      },
      {
        name: 'file_name',
        type: 'string',
        required: false,
        description: `Preferred filename to use when saving/returning the attachment`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Optional schema version to use for tool execution`,
      },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Optional tool version to use for execution`,
      },
    ],
  },
  {
    name: 'gmail_get_contacts',
    description: `Fetch a list of contacts from the connected Gmail account. Supports pagination and field filtering.`,
    params: [
      {
        name: 'max_results',
        type: 'integer',
        required: false,
        description: `Maximum number of contacts to fetch`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `Token to retrieve the next page of results`,
      },
      {
        name: 'person_fields',
        type: 'array',
        required: false,
        description: `Fields to include for each person`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Optional schema version to use for tool execution`,
      },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Optional tool version to use for execution`,
      },
    ],
  },
  {
    name: 'gmail_get_message_by_id',
    description: `Retrieve a specific Gmail message using its message ID. Optionally control the format of the returned data.`,
    params: [
      {
        name: 'message_id',
        type: 'string',
        required: true,
        description: `Unique Gmail message ID`,
      },
      {
        name: 'format',
        type: 'string',
        required: false,
        description: `Format of the returned message.`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Optional schema version to use for tool execution`,
      },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Optional tool version to use for execution`,
      },
    ],
  },
  {
    name: 'gmail_get_thread_by_id',
    description: `Retrieve a specific Gmail thread by thread ID. Optionally control message format and metadata headers. Requires a valid Gmail OAuth2 connection with read access.`,
    params: [
      { name: 'thread_id', type: 'string', required: true, description: `Unique Gmail thread ID` },
      {
        name: 'format',
        type: 'string',
        required: false,
        description: `Format of messages in the returned thread.`,
      },
      {
        name: 'metadata_headers',
        type: 'array',
        required: false,
        description: `Specific email headers to include when format is metadata`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Optional schema version to use for tool execution`,
      },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Optional tool version to use for execution`,
      },
    ],
  },
  {
    name: 'gmail_list_drafts',
    description: `List draft emails from a connected Gmail account. Requires a valid Gmail OAuth2 connection.`,
    params: [
      {
        name: 'max_results',
        type: 'integer',
        required: false,
        description: `Maximum number of drafts to fetch`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `Page token for pagination`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Optional schema version to use for tool execution`,
      },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Optional tool version to use for execution`,
      },
    ],
  },
  {
    name: 'gmail_list_threads',
    description: `List threads in a connected Gmail account using optional search and label filters. Requires a valid Gmail OAuth2 connection with read access.`,
    params: [
      {
        name: 'include_spam_trash',
        type: 'boolean',
        required: false,
        description: `Whether to include threads from Spam and Trash`,
      },
      {
        name: 'label_ids',
        type: 'array',
        required: false,
        description: `Gmail label IDs to filter threads (threads must match all labels)`,
      },
      {
        name: 'max_results',
        type: 'integer',
        required: false,
        description: `Maximum number of threads to return`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `Page token for pagination`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Search query string using Gmail search syntax (for example, 'is:unread from:user@example.com')`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Optional schema version to use for tool execution`,
      },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Optional tool version to use for execution`,
      },
    ],
  },
  {
    name: 'gmail_search_people',
    description: `Search people or contacts in the connected Google account using a query. Requires a valid Google OAuth2 connection with People API scopes.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Text query to search people (e.g., name, email address).`,
      },
      {
        name: 'other_contacts',
        type: 'boolean',
        required: false,
        description: `Whether to include people not in the user's contacts (from 'Other Contacts').`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of people to return.`,
      },
      {
        name: 'person_fields',
        type: 'array',
        required: false,
        description: `Fields to retrieve for each person.`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Optional schema version to use for tool execution`,
      },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Optional tool version to use for execution`,
      },
    ],
  },
]
