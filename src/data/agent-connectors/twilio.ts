import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'twilio_account_get',
    description: `Retrieve details of a Twilio account by its SID.`,
    params: [
    ],
  },
  {
    name: 'twilio_available_numbers_local',
    description: `Search for available local phone numbers that can be purchased in a given country.`,
    params: [
      { name: 'country_code', type: 'string', required: true, description: `The ISO 3166-1 alpha-2 country code to search for numbers in.` },
      { name: 'area_code', type: 'string', required: false, description: `Filter by area code.` },
      { name: 'contains', type: 'string', required: false, description: `A pattern to match phone numbers against. Use * for wildcards.` },
      { name: 'sms_enabled', type: 'string', required: false, description: `Filter for numbers that are SMS-capable.` },
      { name: 'voice_enabled', type: 'string', required: false, description: `Filter for numbers that are voice-capable.` },
    ],
  },
  {
    name: 'twilio_available_numbers_toll_free',
    description: `Search for available toll-free phone numbers that can be purchased in a given country.`,
    params: [
      { name: 'country_code', type: 'string', required: true, description: `The ISO 3166-1 alpha-2 country code to search for numbers in.` },
      { name: 'area_code', type: 'string', required: false, description: `Filter by area code.` },
      { name: 'contains', type: 'string', required: false, description: `A pattern to match phone numbers against. Use * for wildcards.` },
    ],
  },
  {
    name: 'twilio_call_delete',
    description: `Delete a call record from the account. This permanently removes the call log entry.`,
    params: [
      { name: 'call_sid', type: 'string', required: true, description: `The unique identifier of the Call resource to delete.` },
    ],
  },
  {
    name: 'twilio_call_get',
    description: `Retrieve details of a specific phone call by its SID, including status, duration, and pricing information.`,
    params: [
      { name: 'call_sid', type: 'string', required: true, description: `The unique identifier of the Call resource to retrieve.` },
    ],
  },
  {
    name: 'twilio_calls_list',
    description: `Retrieve a list of phone calls made to and from the account, with optional filtering by number, status, and date.`,
    params: [
      { name: 'end_time', type: 'string', required: false, description: `Filter by calls started on or before this date (YYYY-MM-DD format).` },
      { name: 'from_number', type: 'string', required: false, description: `Filter by the phone number that initiated the call.` },
      { name: 'page_size', type: 'integer', required: false, description: `The number of results to return per page. Maximum is 1000.` },
      { name: 'start_time', type: 'string', required: false, description: `Filter by calls started on or after this date (YYYY-MM-DD format).` },
      { name: 'status', type: 'string', required: false, description: `Filter by call status. Values: queued, ringing, in-progress, completed, busy, failed, no-answer, canceled.` },
      { name: 'to', type: 'string', required: false, description: `Filter by the phone number that received the call.` },
    ],
  },
  {
    name: 'twilio_conference_get',
    description: `Retrieve details of a specific conference by its SID, including status, friendly name, and region.`,
    params: [
      { name: 'conference_sid', type: 'string', required: true, description: `The unique identifier of the Conference resource to retrieve.` },
    ],
  },
  {
    name: 'twilio_conferences_list',
    description: `Retrieve a list of conferences for the account, with optional filtering by name, status, date, and pagination.`,
    params: [
      { name: 'date_created', type: 'string', required: false, description: `Filter conferences created on this date (YYYY-MM-DD format).` },
      { name: 'friendly_name', type: 'string', required: false, description: `Filter conferences by their friendly name.` },
      { name: 'page_size', type: 'integer', required: false, description: `The number of results to return per page. Maximum is 1000.` },
      { name: 'status', type: 'string', required: false, description: `Filter by conference status. Values: init, in-progress, completed.` },
    ],
  },
  {
    name: 'twilio_conversation_delete',
    description: `Delete a Twilio Conversation by its SID. This permanently removes the conversation and all associated data.`,
    params: [
      { name: 'conversation_sid', type: 'string', required: true, description: `The unique SID of the conversation to delete.` },
    ],
  },
  {
    name: 'twilio_conversation_get',
    description: `Retrieve the details of a specific Twilio Conversation by its SID.`,
    params: [
      { name: 'conversation_sid', type: 'string', required: true, description: `The unique SID of the conversation to retrieve.` },
    ],
  },
  {
    name: 'twilio_conversation_message_delete',
    description: `Delete a specific message from a Twilio Conversation by its SID.`,
    params: [
      { name: 'conversation_sid', type: 'string', required: true, description: `The unique SID of the conversation containing the message.` },
      { name: 'message_sid', type: 'string', required: true, description: `The unique SID of the message to delete.` },
    ],
  },
  {
    name: 'twilio_conversation_messages_list',
    description: `List all messages in a Twilio Conversation. Optionally control the sort order and page size.`,
    params: [
      { name: 'conversation_sid', type: 'string', required: true, description: `The unique SID of the conversation to list messages for.` },
      { name: 'order', type: 'string', required: false, description: `The sort order of messages. One of: asc, desc.` },
      { name: 'page_size', type: 'integer', required: false, description: `The number of messages to return per page.` },
    ],
  },
  {
    name: 'twilio_conversation_participants_list',
    description: `List all participants in a Twilio Conversation.`,
    params: [
      { name: 'conversation_sid', type: 'string', required: true, description: `The unique SID of the conversation to list participants for.` },
      { name: 'page_size', type: 'integer', required: false, description: `The number of participants to return per page.` },
    ],
  },
  {
    name: 'twilio_conversations_list',
    description: `List all Twilio Conversations. Optionally filter by state and control page size.`,
    params: [
      { name: 'page_size', type: 'integer', required: false, description: `The number of conversations to return per page.` },
      { name: 'state', type: 'string', required: false, description: `Filter conversations by state. One of: active, inactive, closed.` },
    ],
  },
  {
    name: 'twilio_message_delete',
    description: `Permanently delete a message resource from your Twilio account. This action cannot be undone.`,
    params: [
      { name: 'message_sid', type: 'string', required: true, description: `The unique identifier of the message to delete` },
    ],
  },
  {
    name: 'twilio_message_get',
    description: `Retrieve the details of a specific message by its SID.`,
    params: [
      { name: 'message_sid', type: 'string', required: true, description: `The unique identifier of the message to retrieve` },
    ],
  },
  {
    name: 'twilio_message_media_list',
    description: `Retrieve a list of media resources associated with a specific message.`,
    params: [
      { name: 'message_sid', type: 'string', required: true, description: `The SID of the message to list media for` },
      { name: 'page_size', type: 'integer', required: false, description: `Number of media resources to return per page (1-1000, default 50)` },
    ],
  },
  {
    name: 'twilio_messages_list',
    description: `Retrieve a list of messages associated with your Twilio account, with optional filtering by recipient, sender, or date sent.`,
    params: [
      { name: 'date_sent', type: 'string', required: false, description: `Filter by date sent (YYYY-MM-DD format)` },
      { name: 'from_number', type: 'string', required: false, description: `Filter by messages sent from this phone number in E.164 format` },
      { name: 'page_size', type: 'integer', required: false, description: `Number of messages to return per page (1-1000, default 50)` },
      { name: 'to', type: 'string', required: false, description: `Filter by messages sent to this phone number in E.164 format` },
    ],
  },
  {
    name: 'twilio_messaging_services_list',
    description: `Retrieve a list of all Messaging Services associated with your Twilio account.`,
    params: [
      { name: 'page_size', type: 'integer', required: false, description: `Number of Messaging Services to return per page (1-1000, default 50)` },
    ],
  },
  {
    name: 'twilio_phone_number_get',
    description: `Retrieve details of a specific incoming phone number by its SID.`,
    params: [
      { name: 'phone_number_sid', type: 'string', required: true, description: `The SID of the incoming phone number to retrieve.` },
    ],
  },
  {
    name: 'twilio_phone_numbers_list',
    description: `List all incoming phone numbers on the Twilio account.`,
    params: [
      { name: 'friendly_name', type: 'string', required: false, description: `Filter by friendly name of the phone number.` },
      { name: 'page_size', type: 'integer', required: false, description: `Number of results to return per page.` },
      { name: 'phone_number', type: 'string', required: false, description: `Filter by phone number in E.164 format.` },
    ],
  },
  {
    name: 'twilio_recording_delete',
    description: `Permanently delete a call recording from the account. This action cannot be undone.`,
    params: [
      { name: 'recording_sid', type: 'string', required: true, description: `The unique identifier of the Recording resource to delete.` },
    ],
  },
  {
    name: 'twilio_recording_get',
    description: `Retrieve details of a specific call recording by its SID, including duration, status, and source.`,
    params: [
      { name: 'recording_sid', type: 'string', required: true, description: `The unique identifier of the Recording resource to retrieve.` },
    ],
  },
  {
    name: 'twilio_recordings_list',
    description: `Retrieve a list of call recordings for the account, with optional filtering by call SID, date, and pagination.`,
    params: [
      { name: 'call_sid', type: 'string', required: false, description: `Filter recordings by the Call SID they are associated with.` },
      { name: 'date_created', type: 'string', required: false, description: `Filter recordings created on this date (YYYY-MM-DD format).` },
      { name: 'page_size', type: 'integer', required: false, description: `The number of results to return per page. Maximum is 1000.` },
    ],
  },
  {
    name: 'twilio_usage_records_list',
    description: `Retrieve usage records for a Twilio account, optionally filtered by category and date range.`,
    params: [
      { name: 'category', type: 'string', required: false, description: `The usage category to filter by (e.g., sms, calls, phonenumbers).` },
      { name: 'end_date', type: 'string', required: false, description: `The end date for the usage records in YYYY-MM-DD format.` },
      { name: 'page_size', type: 'integer', required: false, description: `Number of results to return per page.` },
      { name: 'start_date', type: 'string', required: false, description: `The start date for the usage records in YYYY-MM-DD format.` },
    ],
  },
  {
    name: 'twilio_usage_records_today',
    description: `Retrieve today's usage records for a Twilio account, optionally filtered by category.`,
    params: [
      { name: 'category', type: 'string', required: false, description: `The usage category to filter by (e.g., sms, calls, phonenumbers).` },
    ],
  },
  {
    name: 'twilio_verification_get',
    description: `Retrieve the status and details of a specific verification by its SID.`,
    params: [
      { name: 'service_sid', type: 'string', required: true, description: `The SID of the Verify service.` },
      { name: 'verification_sid', type: 'string', required: true, description: `The SID of the verification to retrieve.` },
    ],
  },
  {
    name: 'twilio_verify_service_create',
    description: `Create a new Twilio Verify service for sending verification codes via SMS, call, email, or WhatsApp.`,
    params: [
      { name: 'friendly_name', type: 'string', required: true, description: `A descriptive name for the Verify service.` },
      { name: 'code_length', type: 'integer', required: false, description: `The length of the verification code to generate. Must be between 4 and 10.` },
      { name: 'lookup_enabled', type: 'string', required: false, description: `Whether to perform a lookup on the phone number before sending verification.` },
      { name: 'psd2_enabled', type: 'string', required: false, description: `Whether to enable PSD2 compliance for the service.` },
      { name: 'skip_sms_to_landlines', type: 'string', required: false, description: `Whether to skip sending SMS to landline phone numbers.` },
    ],
  },
  {
    name: 'twilio_verify_service_delete',
    description: `Delete a Twilio Verify service by its SID. This action is irreversible.`,
    params: [
      { name: 'service_sid', type: 'string', required: true, description: `The unique SID of the Verify service to delete.` },
    ],
  },
  {
    name: 'twilio_verify_service_get',
    description: `Retrieve details of a specific Twilio Verify service by its SID.`,
    params: [
      { name: 'service_sid', type: 'string', required: true, description: `The unique SID of the Verify service to retrieve.` },
    ],
  },
  {
    name: 'twilio_verify_services_list',
    description: `List all Twilio Verify services on the account.`,
    params: [
      { name: 'page_size', type: 'integer', required: false, description: `Number of results to return per page. Maximum is 1000.` },
    ],
  },
]
