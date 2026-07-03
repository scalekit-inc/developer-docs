import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'dropcontactmcp_check_credits',
    description: `Check the number of remaining Dropcontact enrichment credits for the authenticated user. Each contact enrichment or email validation consumes 1 credit. Call this before submitting enrichment requests to verify sufficient credits are available.`,
    params: [
      {
        name: 'conversation_id',
        type: 'string',
        required: false,
        description: `Conversation correlation ID. Present only when an earlier tool response in this conversation returned one; that value is carried unchanged on subsequent calls. Omitted on the first call.`,
      },
      {
        name: 'reason_for_invocation',
        type: 'string',
        required: false,
        description: `Brief explanation of why you chose this tool for the current task. Optional audit field; max 500 characters (longer values are truncated). Plain text only.`,
      },
    ],
  },
  {
    name: 'dropcontactmcp_retrieve_enrichment_result',
    description: `Retrieve the result of a previously submitted enrichment or email validation request. Polls until processing is complete (typically 10–60 seconds, up to 3 minutes). Call this after any submit tool returns a request_id.`,
    params: [
      {
        name: 'request_id',
        type: 'string',
        required: true,
        description: `The request ID returned by a previous submit tool call (submit_contact_enrichment_by_name, submit_contact_enrichment_by_full_name, submit_contact_enrichment_by_linkedin, or submit_email_validation). Used to poll for the enrichment or validation result.`,
      },
      {
        name: 'conversation_id',
        type: 'string',
        required: false,
        description: `Conversation correlation ID. Present only when an earlier tool response in this conversation returned one; that value is carried unchanged on subsequent calls. Omitted on the first call.`,
      },
      {
        name: 'reason_for_invocation',
        type: 'string',
        required: false,
        description: `Brief explanation of why you chose this tool for the current task. Optional audit field; max 500 characters (longer values are truncated). Plain text only.`,
      },
    ],
  },
  {
    name: 'dropcontactmcp_submit_contact_enrichment_by_full_name',
    description: `Submit a contact enrichment request using a full name and company name. Returns a request_id. Call retrieve_enrichment_result with the returned request_id to get results.`,
    params: [
      {
        name: 'company',
        type: 'string',
        required: true,
        description: `The name of the company where the contact works. Required to narrow the search and return accurate professional contact information.`,
      },
      {
        name: 'full_name',
        type: 'string',
        required: true,
        description: `The contact's full name (first and last name combined). Used together with the company name to identify the person and find their professional email address.`,
      },
      {
        name: 'conversation_id',
        type: 'string',
        required: false,
        description: `Conversation correlation ID. Present only when an earlier tool response in this conversation returned one; that value is carried unchanged on subsequent calls. Omitted on the first call.`,
      },
      {
        name: 'reason_for_invocation',
        type: 'string',
        required: false,
        description: `Brief explanation of why you chose this tool for the current task. Optional audit field; max 500 characters (longer values are truncated). Plain text only.`,
      },
    ],
  },
  {
    name: 'dropcontactmcp_submit_contact_enrichment_by_linkedin',
    description: `Submit a contact enrichment request using a LinkedIn profile URL. Returns a request_id. Call retrieve_enrichment_result with the returned request_id to get results.`,
    params: [
      {
        name: 'linkedin_url',
        type: 'string',
        required: true,
        description: `The full LinkedIn profile URL of the contact to enrich. Must be a valid linkedin.com/in/ profile URL.`,
      },
      {
        name: 'conversation_id',
        type: 'string',
        required: false,
        description: `Conversation correlation ID. Present only when an earlier tool response in this conversation returned one; that value is carried unchanged on subsequent calls. Omitted on the first call.`,
      },
      {
        name: 'reason_for_invocation',
        type: 'string',
        required: false,
        description: `Brief explanation of why you chose this tool for the current task. Optional audit field; max 500 characters (longer values are truncated). Plain text only.`,
      },
    ],
  },
  {
    name: 'dropcontactmcp_submit_contact_enrichment_by_name',
    description: `Submit a contact enrichment request using first name, last name, and company name. Returns a request_id. Call retrieve_enrichment_result with the returned request_id to get results.`,
    params: [
      {
        name: 'company',
        type: 'string',
        required: true,
        description: `The name of the company where the contact works. Required to narrow the search and return accurate professional contact information.`,
      },
      {
        name: 'first_name',
        type: 'string',
        required: true,
        description: `The contact's first name. Used together with last name and company to identify the person and find their professional email address.`,
      },
      {
        name: 'last_name',
        type: 'string',
        required: true,
        description: `The contact's last name. Used together with first name and company to identify the person and find their professional email address.`,
      },
      {
        name: 'conversation_id',
        type: 'string',
        required: false,
        description: `Conversation correlation ID. Present only when an earlier tool response in this conversation returned one; that value is carried unchanged on subsequent calls. Omitted on the first call.`,
      },
      {
        name: 'reason_for_invocation',
        type: 'string',
        required: false,
        description: `Brief explanation of why you chose this tool for the current task. Optional audit field; max 500 characters (longer values are truncated). Plain text only.`,
      },
    ],
  },
  {
    name: 'dropcontactmcp_submit_email_validation',
    description: `Submit an email validation request to check whether an email address is valid and deliverable. Returns qualification: nominative, catch-all, generic, or invalid. Returns a request_id. Call retrieve_enrichment_result to get results.`,
    params: [
      {
        name: 'email_address',
        type: 'string',
        required: true,
        description: `The email address to validate. Will be checked for deliverability and qualified as nominative, catch-all, generic, or invalid.`,
      },
      {
        name: 'conversation_id',
        type: 'string',
        required: false,
        description: `Conversation correlation ID. Present only when an earlier tool response in this conversation returned one; that value is carried unchanged on subsequent calls. Omitted on the first call.`,
      },
      {
        name: 'reason_for_invocation',
        type: 'string',
        required: false,
        description: `Brief explanation of why you chose this tool for the current task. Optional audit field; max 500 characters (longer values are truncated). Plain text only.`,
      },
    ],
  },
]
