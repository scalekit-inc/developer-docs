import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'vapimcp_create_assistant',
    description: `Creates a new Vapi voice AI assistant with the specified configuration. Configure the assistant's LLM provider, voice, transcription engine, first message, and any tools it should have access to.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name of the assistant` },
      {
        name: 'rationale',
        type: 'string',
        required: true,
        description: `Always provide a brief explanation of why you are calling this tool`,
      },
      {
        name: 'firstMessage',
        type: 'string',
        required: false,
        description: `First message the assistant says when a call starts`,
      },
      {
        name: 'firstMessageMode',
        type: 'string',
        required: false,
        description: `Whether the assistant speaks first or waits for the user`,
      },
      {
        name: 'instructions',
        type: 'string',
        required: false,
        description: `System instructions for the assistant. Defaults to 'You are a helpful assistant.'`,
      },
      {
        name: 'llm',
        type: 'string',
        required: false,
        description: `LLM configuration. Defaults to OpenAI gpt-4o.`,
      },
      {
        name: 'toolIds',
        type: 'string',
        required: false,
        description: `IDs of Vapi tools to attach to this assistant`,
      },
      {
        name: 'transcriber',
        type: 'string',
        required: false,
        description: `Transcription configuration. Defaults to Deepgram nova-3.`,
      },
      {
        name: 'voice',
        type: 'string',
        required: false,
        description: `Voice configuration. Defaults to ElevenLabs 'sarah'.`,
      },
    ],
  },
  {
    name: 'vapimcp_create_call',
    description: `Initiates or schedules an outbound Vapi call. Specify the assistant and phone number to use, the customer's phone number, and optionally a scheduled time. Use assistantOverrides.variableValues to inject dynamic data into the assistant's prompts.`,
    params: [
      {
        name: 'rationale',
        type: 'string',
        required: true,
        description: `Always provide a brief explanation of why you are calling this tool`,
      },
      {
        name: 'assistantId',
        type: 'string',
        required: false,
        description: `ID of the Vapi assistant to use for the call`,
      },
      {
        name: 'assistantOverrides',
        type: 'string',
        required: false,
        description: `Runtime overrides for the assistant configuration`,
      },
      {
        name: 'customer',
        type: 'string',
        required: false,
        description: `Customer contact information for the outbound call`,
      },
      {
        name: 'phoneNumberId',
        type: 'string',
        required: false,
        description: `ID of the Vapi phone number to call from`,
      },
      {
        name: 'scheduledAt',
        type: 'string',
        required: false,
        description: `ISO 8601 datetime to schedule the call (e.g. 2025-03-25T22:39:27.771Z). Omit to call immediately.`,
      },
    ],
  },
  {
    name: 'vapimcp_create_tool',
    description: `Creates a new Vapi tool that can be attached to assistants. Supports four tool types: 'sms' for sending text messages, 'transferCall' for transferring calls to destinations, 'function' for custom server-side functions, and 'apiRequest' for HTTP API integrations.`,
    params: [
      {
        name: 'rationale',
        type: 'string',
        required: true,
        description: `Always provide a brief explanation of why you are calling this tool`,
      },
      { name: 'type', type: 'string', required: true, description: `Type of tool to create` },
      {
        name: 'apiRequest',
        type: 'string',
        required: false,
        description: `API request tool configuration — provide when type is 'apiRequest'`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description of what the tool does`,
      },
      {
        name: 'function',
        type: 'string',
        required: false,
        description: `Function tool configuration — provide when type is 'function'`,
      },
      { name: 'name', type: 'string', required: false, description: `Name of the tool` },
      {
        name: 'sms',
        type: 'string',
        required: false,
        description: `SMS configuration — provide when type is 'sms'`,
      },
      {
        name: 'transferCall',
        type: 'string',
        required: false,
        description: `Transfer call configuration — provide when type is 'transferCall'`,
      },
    ],
  },
  {
    name: 'vapimcp_get_assistant',
    description: `Retrieves the full configuration of a specific Vapi assistant by ID, including its LLM, voice, transcription settings, tools, and first message.`,
    params: [
      {
        name: 'assistantId',
        type: 'string',
        required: true,
        description: `ID of the assistant to retrieve`,
      },
      {
        name: 'rationale',
        type: 'string',
        required: true,
        description: `Always provide a brief explanation of why you are calling this tool`,
      },
    ],
  },
  {
    name: 'vapimcp_get_call',
    description: `Retrieves detailed information about a specific Vapi call by ID, including its status, duration, transcript, recording URL, and associated assistant.`,
    params: [
      { name: 'callId', type: 'string', required: true, description: `ID of the call to retrieve` },
      {
        name: 'rationale',
        type: 'string',
        required: true,
        description: `Always provide a brief explanation of why you are calling this tool`,
      },
    ],
  },
  {
    name: 'vapimcp_get_phone_number',
    description: `Retrieves details of a specific Vapi phone number by ID, including its number, provider, and any assistant or squad configuration attached to it.`,
    params: [
      {
        name: 'phoneNumberId',
        type: 'string',
        required: true,
        description: `ID of the phone number to retrieve`,
      },
      {
        name: 'rationale',
        type: 'string',
        required: true,
        description: `Always provide a brief explanation of why you are calling this tool`,
      },
    ],
  },
  {
    name: 'vapimcp_get_tool',
    description: `Retrieves the full configuration of a specific Vapi tool by ID, including its type (SMS, transfer call, function, or API request) and associated settings.`,
    params: [
      {
        name: 'rationale',
        type: 'string',
        required: true,
        description: `Always provide a brief explanation of why you are calling this tool`,
      },
      {
        name: 'toolId',
        type: 'string',
        required: true,
        description: `ID of the Vapi tool to retrieve`,
      },
    ],
  },
  {
    name: 'vapimcp_list_assistants',
    description: `Lists all Vapi assistants configured in the account. Returns a list of assistant objects including their IDs, names, configurations, and settings.`,
    params: [
      {
        name: 'rationale',
        type: 'string',
        required: true,
        description: `Always provide a brief explanation of why you are calling this tool`,
      },
    ],
  },
  {
    name: 'vapimcp_list_calls',
    description: `Lists all Vapi calls in the account. Returns call records including their IDs, status, duration, associated assistant, and transcript metadata.`,
    params: [
      {
        name: 'rationale',
        type: 'string',
        required: true,
        description: `Always provide a brief explanation of why you are calling this tool`,
      },
    ],
  },
  {
    name: 'vapimcp_list_phone_numbers',
    description: `Lists all phone numbers provisioned in the Vapi account. Returns phone number objects including their IDs, numbers, provider, and associated assistant configurations.`,
    params: [
      {
        name: 'rationale',
        type: 'string',
        required: true,
        description: `Always provide a brief explanation of why you are calling this tool`,
      },
    ],
  },
  {
    name: 'vapimcp_list_tools',
    description: `Lists all Vapi tools configured in the account. Vapi tools extend assistant capabilities — types include SMS, transfer call, custom functions, and API request tools.`,
    params: [
      {
        name: 'rationale',
        type: 'string',
        required: true,
        description: `Always provide a brief explanation of why you are calling this tool`,
      },
    ],
  },
  {
    name: 'vapimcp_update_assistant',
    description: `Updates an existing Vapi assistant's configuration. Only fields you provide will be changed; omitted fields retain their current values.`,
    params: [
      {
        name: 'assistantId',
        type: 'string',
        required: true,
        description: `ID of the assistant to update`,
      },
      {
        name: 'rationale',
        type: 'string',
        required: true,
        description: `Always provide a brief explanation of why you are calling this tool`,
      },
      {
        name: 'firstMessage',
        type: 'string',
        required: false,
        description: `New first message the assistant says when a call starts`,
      },
      {
        name: 'firstMessageMode',
        type: 'string',
        required: false,
        description: `New first message mode`,
      },
      {
        name: 'instructions',
        type: 'string',
        required: false,
        description: `New system instructions for the assistant`,
      },
      { name: 'llm', type: 'string', required: false, description: `New LLM configuration` },
      { name: 'name', type: 'string', required: false, description: `New name for the assistant` },
      {
        name: 'toolIds',
        type: 'string',
        required: false,
        description: `New list of Vapi tool IDs for the assistant`,
      },
      {
        name: 'transcriber',
        type: 'string',
        required: false,
        description: `New transcription configuration`,
      },
      { name: 'voice', type: 'string', required: false, description: `New voice configuration` },
    ],
  },
  {
    name: 'vapimcp_update_tool',
    description: `Updates an existing Vapi tool's configuration. Only fields you provide will be changed. Supports all tool types: sms, transferCall, function, and apiRequest.`,
    params: [
      {
        name: 'rationale',
        type: 'string',
        required: true,
        description: `Always provide a brief explanation of why you are calling this tool`,
      },
      {
        name: 'toolId',
        type: 'string',
        required: true,
        description: `ID of the Vapi tool to update`,
      },
      {
        name: 'apiRequest',
        type: 'string',
        required: false,
        description: `Updated API request tool configuration`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New description for the tool`,
      },
      {
        name: 'function',
        type: 'string',
        required: false,
        description: `Updated function tool configuration`,
      },
      { name: 'name', type: 'string', required: false, description: `New name for the tool` },
      { name: 'sms', type: 'string', required: false, description: `Updated SMS configuration` },
      {
        name: 'transferCall',
        type: 'string',
        required: false,
        description: `Updated transfer call configuration`,
      },
    ],
  },
]
