import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'v0mcp_createchat',
    description: `Create a new chat using the v0 Platform API. Starts a fresh v0 conversation from an initial message and returns the created chat, including generated UI and a chat ID you can use with v0mcp_getchat or v0mcp_sendchatmessage.`,
    params: [
      {
        name: 'message',
        type: 'string',
        required: true,
        description: `The initial message to start the chat with.`,
      },
      {
        name: 'attachments',
        type: 'array',
        required: false,
        description: `Attachments to include with the initial message.`,
      },
      {
        name: 'chatPrivacy',
        type: 'string',
        required: false,
        description: `Privacy level for the chat.`,
      },
      {
        name: 'designSystemId',
        type: 'string',
        required: false,
        description: `The ID of a design system to apply to this chat.`,
      },
      {
        name: 'modelConfiguration',
        type: 'object',
        required: false,
        description: `Model configuration for the chat.`,
      },
      {
        name: 'projectId',
        type: 'string',
        required: false,
        description: `Associates the chat with a specific project.`,
      },
      {
        name: 'responseMode',
        type: 'string',
        required: false,
        description: `Controls how the response is delivered.`,
      },
      {
        name: 'system',
        type: 'string',
        required: false,
        description: `System-level context or background for the chat.`,
      },
    ],
  },
  {
    name: 'v0mcp_findchats',
    description: `Find all chats using the v0 Platform API. Returns the list of chats owned by the authenticated user, including each chat's ID and metadata. Use this to discover chat IDs for v0mcp_getchat or v0mcp_sendchatmessage.`,
    params: [],
  },
  {
    name: 'v0mcp_getchat',
    description: `Get a specific chat by ID using the v0 Platform API. Returns the full chat, including its messages and generated UI. Obtain a chat ID from v0mcp_findchats or v0mcp_createchat.`,
    params: [
      {
        name: 'chatId',
        type: 'string',
        required: true,
        description: `The ID of the chat to retrieve.`,
      },
    ],
  },
  {
    name: 'v0mcp_getuser',
    description: `Get user information using the v0 Platform API. Returns details about the authenticated v0 account, such as plan and billing context.`,
    params: [
      { name: 'scope', type: 'string', required: false, description: `Optional scope parameter.` },
    ],
  },
  {
    name: 'v0mcp_sendchatmessage',
    description: `Send a new message to an existing chat using the v0 Platform API. Continues an existing v0 conversation with a follow-up message and returns the updated chat. Obtain a chat ID from v0mcp_findchats or v0mcp_createchat.`,
    params: [
      {
        name: 'chatId',
        type: 'string',
        required: true,
        description: `The ID of the chat to add the message to.`,
      },
      {
        name: 'message',
        type: 'string',
        required: true,
        description: `The message content to send.`,
      },
      {
        name: 'attachments',
        type: 'array',
        required: false,
        description: `Attachments to include with the message.`,
      },
      {
        name: 'modelConfiguration',
        type: 'object',
        required: false,
        description: `Model configuration for processing the message.`,
      },
    ],
  },
]
