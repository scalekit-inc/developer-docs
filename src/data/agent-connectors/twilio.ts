import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'twilio_account_get',
    description: `Retrieve details of a Twilio account by its SID.`,
    params: [],
  },
  {
    name: 'twilio_accounts_list',
    description: `List accounts and subaccounts belonging to the current Twilio account, optionally filtered by friendly name or status.`,
    params: [
      {
        name: 'friendly_name',
        type: 'string',
        required: false,
        description: `Only return accounts matching this exact friendly name.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `The number of accounts to return per page.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Only return accounts with this status.`,
      },
    ],
  },
  {
    name: 'twilio_application_create',
    description: `Create a TwiML Application — a reusable, named set of voice and SMS webhook URLs that phone numbers or API calls can reference instead of repeating the same URLs everywhere.`,
    params: [
      {
        name: 'friendly_name',
        type: 'string',
        required: false,
        description: `A descriptive name for the application. Up to 64 characters.`,
      },
      {
        name: 'public_application_connect_enabled',
        type: 'boolean',
        required: false,
        description: `Whether to allow other Twilio accounts to dial this application using Dial verb.`,
      },
      {
        name: 'sms_fallback_url',
        type: 'string',
        required: false,
        description: `The URL Twilio calls when an error occurs retrieving or executing TwiML from sms_url.`,
      },
      {
        name: 'sms_method',
        type: 'string',
        required: false,
        description: `The HTTP method Twilio uses to request sms_url. Either GET or POST.`,
      },
      {
        name: 'sms_url',
        type: 'string',
        required: false,
        description: `The URL Twilio calls when a phone number assigned to this application receives an incoming SMS.`,
      },
      {
        name: 'status_callback',
        type: 'string',
        required: false,
        description: `The URL Twilio calls to pass status parameters (such as call ended) after an event.`,
      },
      {
        name: 'voice_caller_id_lookup',
        type: 'boolean',
        required: false,
        description: `Whether to look up the caller's caller-ID name from the CNAM database.`,
      },
      {
        name: 'voice_fallback_url',
        type: 'string',
        required: false,
        description: `The URL Twilio calls when an error occurs retrieving or executing TwiML from voice_url.`,
      },
      {
        name: 'voice_method',
        type: 'string',
        required: false,
        description: `The HTTP method Twilio uses to request voice_url. Either GET or POST.`,
      },
      {
        name: 'voice_url',
        type: 'string',
        required: false,
        description: `The URL Twilio calls when a phone number assigned to this application receives a call.`,
      },
    ],
  },
  {
    name: 'twilio_applications_list',
    description: `List TwiML Applications on the account, optionally filtered by friendly name.`,
    params: [
      {
        name: 'friendly_name',
        type: 'string',
        required: false,
        description: `Only return applications matching this exact friendly name.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `The number of applications to return per page.`,
      },
    ],
  },
  {
    name: 'twilio_available_numbers_local',
    description: `Search for available local phone numbers that can be purchased in a given country.`,
    params: [
      {
        name: 'country_code',
        type: 'string',
        required: true,
        description: `The ISO 3166-1 alpha-2 country code to search for numbers in.`,
      },
      { name: 'area_code', type: 'string', required: false, description: `Filter by area code.` },
      {
        name: 'contains',
        type: 'string',
        required: false,
        description: `A pattern to match phone numbers against. Use * for wildcards.`,
      },
      {
        name: 'sms_enabled',
        type: 'string',
        required: false,
        description: `Filter for numbers that are SMS-capable.`,
      },
      {
        name: 'voice_enabled',
        type: 'string',
        required: false,
        description: `Filter for numbers that are voice-capable.`,
      },
    ],
  },
  {
    name: 'twilio_available_numbers_mobile',
    description: `Search for available mobile phone numbers that can be purchased in a given country.`,
    params: [
      {
        name: 'country_code',
        type: 'string',
        required: true,
        description: `Two-letter country code (e.g., GB, DE).`,
      },
      { name: 'area_code', type: 'string', required: false, description: `Filter by area code.` },
      {
        name: 'contains',
        type: 'string',
        required: false,
        description: `A pattern to match phone numbers against. Use * for wildcards.`,
      },
      {
        name: 'sms_enabled',
        type: 'string',
        required: false,
        description: `Only return SMS-capable numbers.`,
      },
      {
        name: 'voice_enabled',
        type: 'string',
        required: false,
        description: `Only return voice-capable numbers.`,
      },
    ],
  },
  {
    name: 'twilio_available_numbers_toll_free',
    description: `Search for available toll-free phone numbers that can be purchased in a given country.`,
    params: [
      {
        name: 'country_code',
        type: 'string',
        required: true,
        description: `The ISO 3166-1 alpha-2 country code to search for numbers in.`,
      },
      { name: 'area_code', type: 'string', required: false, description: `Filter by area code.` },
      {
        name: 'contains',
        type: 'string',
        required: false,
        description: `A pattern to match phone numbers against. Use * for wildcards.`,
      },
    ],
  },
  {
    name: 'twilio_balance_get',
    description: `Get the current account's balance and currency.`,
    params: [],
  },
  {
    name: 'twilio_call_create',
    description: `Make an outbound phone call from your Twilio account. Requires a URL that returns TwiML instructions for handling the call.`,
    params: [
      {
        name: 'from_number',
        type: 'string',
        required: true,
        description: `The Twilio phone number or client identifier to use as the caller ID.`,
      },
      {
        name: 'to',
        type: 'string',
        required: true,
        description: `The phone number, SIP address, or client identifier to call.`,
      },
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `The absolute URL that returns the TwiML instructions for the call.`,
      },
      {
        name: 'machine_detection',
        type: 'string',
        required: false,
        description: `Whether to detect if a human, answering machine, or fax picked up.`,
      },
      {
        name: 'method',
        type: 'string',
        required: false,
        description: `The HTTP method Twilio uses to request the url.`,
      },
      {
        name: 'record',
        type: 'boolean',
        required: false,
        description: `Whether to record the call.`,
      },
      {
        name: 'status_callback',
        type: 'string',
        required: false,
        description: `The URL Twilio calls to send status information about the call.`,
      },
      {
        name: 'timeout',
        type: 'integer',
        required: false,
        description: `How long to let the phone ring before assuming there is no answer.`,
      },
    ],
  },
  {
    name: 'twilio_call_delete',
    description: `Delete a call record from the account. This permanently removes the call log entry.`,
    params: [
      {
        name: 'call_sid',
        type: 'string',
        required: true,
        description: `The unique identifier of the Call resource to delete.`,
      },
    ],
  },
  {
    name: 'twilio_call_get',
    description: `Retrieve details of a specific phone call by its SID, including status, duration, and pricing information.`,
    params: [
      {
        name: 'call_sid',
        type: 'string',
        required: true,
        description: `The unique identifier of the Call resource to retrieve.`,
      },
    ],
  },
  {
    name: 'twilio_call_recording_create',
    description: `Start recording a live, in-progress Twilio call.`,
    params: [
      {
        name: 'call_sid',
        type: 'string',
        required: true,
        description: `The SID of the call to start recording.`,
      },
      {
        name: 'recording_channels',
        type: 'string',
        required: false,
        description: `The number of channels in the recording.`,
      },
      {
        name: 'recording_track',
        type: 'string',
        required: false,
        description: `The audio track to record.`,
      },
      {
        name: 'trim',
        type: 'string',
        required: false,
        description: `Whether to trim leading and trailing silence from the recording.`,
      },
    ],
  },
  {
    name: 'twilio_call_recording_update',
    description: `Pause, resume, or stop an in-progress recording of a live Twilio call.`,
    params: [
      {
        name: 'call_sid',
        type: 'string',
        required: true,
        description: `The SID of the call whose recording should be updated.`,
      },
      {
        name: 'recording_sid',
        type: 'string',
        required: true,
        description: `The SID of the recording to update.`,
      },
      {
        name: 'status',
        type: 'string',
        required: true,
        description: `The new status for the recording.`,
      },
      {
        name: 'pause_behavior',
        type: 'string',
        required: false,
        description: `Whether to record silence or skip recording while paused.`,
      },
    ],
  },
  {
    name: 'twilio_call_update',
    description: `Modify a live phone call: redirect it to new TwiML instructions, or end it by setting status to 'completed' or 'canceled'.`,
    params: [
      {
        name: 'call_sid',
        type: 'string',
        required: true,
        description: `The SID of the call to update.`,
      },
      {
        name: 'method',
        type: 'string',
        required: false,
        description: `The HTTP method Twilio uses to request the url.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Set to 'completed' to hang up an in-progress call, or 'canceled' to cancel a queued or ringing call.`,
      },
      {
        name: 'url',
        type: 'string',
        required: false,
        description: `A new absolute URL that returns TwiML instructions to redirect the call to.`,
      },
    ],
  },
  {
    name: 'twilio_calls_list',
    description: `Retrieve a list of phone calls made to and from the account, with optional filtering by number, status, and date.`,
    params: [
      {
        name: 'end_time',
        type: 'string',
        required: false,
        description: `Filter by calls started on or before this date (YYYY-MM-DD format).`,
      },
      {
        name: 'from_number',
        type: 'string',
        required: false,
        description: `Filter by the phone number that initiated the call.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `The number of results to return per page. Maximum is 1000.`,
      },
      {
        name: 'start_time',
        type: 'string',
        required: false,
        description: `Filter by calls started on or after this date (YYYY-MM-DD format).`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter by call status. Values: queued, ringing, in-progress, completed, busy, failed, no-answer, canceled.`,
      },
      {
        name: 'to',
        type: 'string',
        required: false,
        description: `Filter by the phone number that received the call.`,
      },
    ],
  },
  {
    name: 'twilio_conference_get',
    description: `Retrieve details of a specific conference by its SID, including status, friendly name, and region.`,
    params: [
      {
        name: 'conference_sid',
        type: 'string',
        required: true,
        description: `The unique identifier of the Conference resource to retrieve.`,
      },
    ],
  },
  {
    name: 'twilio_conference_participant_create',
    description: `Dial a new participant into an existing Twilio conference.`,
    params: [
      {
        name: 'conference_sid',
        type: 'string',
        required: true,
        description: `The SID of the conference to add the participant to.`,
      },
      {
        name: 'from_number',
        type: 'string',
        required: true,
        description: `The phone number or Client identifier that is calling the participant.`,
      },
      {
        name: 'to',
        type: 'string',
        required: true,
        description: `The phone number, SIP address, or Client identifier to dial into the conference.`,
      },
      {
        name: 'beep',
        type: 'string',
        required: false,
        description: `Whether to play a notification beep when the participant joins.`,
      },
      {
        name: 'end_conference_on_exit',
        type: 'boolean',
        required: false,
        description: `Whether to end the conference when this participant leaves.`,
      },
      {
        name: 'label',
        type: 'string',
        required: false,
        description: `A label for this participant, usable to later fetch, update, or delete them.`,
      },
      {
        name: 'muted',
        type: 'boolean',
        required: false,
        description: `Whether the participant should join muted.`,
      },
      {
        name: 'start_conference_on_enter',
        type: 'boolean',
        required: false,
        description: `Whether to start the conference when this participant joins, if not already started.`,
      },
      {
        name: 'status_callback',
        type: 'string',
        required: false,
        description: `The URL Twilio calls with status information about the participant's call.`,
      },
    ],
  },
  {
    name: 'twilio_conference_participant_delete',
    description: `Remove (kick) a participant from a live Twilio conference.`,
    params: [
      {
        name: 'call_sid',
        type: 'string',
        required: true,
        description: `The SID of the participant's call to remove.`,
      },
      {
        name: 'conference_sid',
        type: 'string',
        required: true,
        description: `The SID of the conference the participant belongs to.`,
      },
    ],
  },
  {
    name: 'twilio_conference_participant_get',
    description: `Retrieve details of a single participant in a Twilio conference.`,
    params: [
      {
        name: 'call_sid',
        type: 'string',
        required: true,
        description: `The SID of the participant's call.`,
      },
      {
        name: 'conference_sid',
        type: 'string',
        required: true,
        description: `The SID of the conference the participant belongs to.`,
      },
    ],
  },
  {
    name: 'twilio_conference_participant_update',
    description: `Mute, hold, or coach a participant in a live Twilio conference.`,
    params: [
      {
        name: 'call_sid',
        type: 'string',
        required: true,
        description: `The SID of the participant's call.`,
      },
      {
        name: 'conference_sid',
        type: 'string',
        required: true,
        description: `The SID of the conference the participant belongs to.`,
      },
      {
        name: 'beep_on_exit',
        type: 'boolean',
        required: false,
        description: `Whether to play a notification beep when this participant leaves.`,
      },
      {
        name: 'end_conference_on_exit',
        type: 'boolean',
        required: false,
        description: `Whether to end the conference when this participant leaves.`,
      },
      {
        name: 'hold',
        type: 'boolean',
        required: false,
        description: `Whether the participant should be put on hold.`,
      },
      {
        name: 'muted',
        type: 'boolean',
        required: false,
        description: `Whether the participant should be muted.`,
      },
    ],
  },
  {
    name: 'twilio_conference_update',
    description: `Update an in-progress conference: end it by setting status to 'completed', or play an announcement into it.`,
    params: [
      {
        name: 'conference_sid',
        type: 'string',
        required: true,
        description: `The SID of the conference to update.`,
      },
      {
        name: 'announce_method',
        type: 'string',
        required: false,
        description: `The HTTP method Twilio uses to request the announce_url.`,
      },
      {
        name: 'announce_url',
        type: 'string',
        required: false,
        description: `A URL returning audio (MP3 or TwiML) to play into the conference.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Set to 'completed' to end the conference and disconnect all participants.`,
      },
    ],
  },
  {
    name: 'twilio_conferences_list',
    description: `Retrieve a list of conferences for the account, with optional filtering by name, status, date, and pagination.`,
    params: [
      {
        name: 'date_created',
        type: 'string',
        required: false,
        description: `Filter conferences created on this date (YYYY-MM-DD format).`,
      },
      {
        name: 'friendly_name',
        type: 'string',
        required: false,
        description: `Filter conferences by their friendly name.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `The number of results to return per page. Maximum is 1000.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter by conference status. Values: init, in-progress, completed.`,
      },
    ],
  },
  {
    name: 'twilio_conversation_create',
    description: `Create a new Twilio Conversation, so participants and messages can be added to it. Existing tools can only get, list, or delete conversations.`,
    params: [
      {
        name: 'attributes',
        type: 'string',
        required: false,
        description: `Free-form JSON metadata to store on the conversation, as a string.`,
      },
      {
        name: 'friendly_name',
        type: 'string',
        required: false,
        description: `Human-readable name for the conversation. Up to 256 characters.`,
      },
      {
        name: 'messaging_service_sid',
        type: 'string',
        required: false,
        description: `The SID of the Messaging Service this conversation belongs to.`,
      },
      {
        name: 'state',
        type: 'string',
        required: false,
        description: `The initial state of the conversation.`,
      },
      {
        name: 'timers_closed',
        type: 'string',
        required: false,
        description: `ISO-8601 duration of inactivity after which the conversation is switched to the 'closed' state (minimum 10 minutes).`,
      },
      {
        name: 'timers_inactive',
        type: 'string',
        required: false,
        description: `ISO-8601 duration of inactivity after which the conversation is switched to the 'inactive' state (minimum 1 minute).`,
      },
      {
        name: 'unique_name',
        type: 'string',
        required: false,
        description: `An application-defined string that uniquely identifies this conversation, usable in place of the SID in the URL.`,
      },
    ],
  },
  {
    name: 'twilio_conversation_delete',
    description: `Delete a Twilio Conversation by its SID. This permanently removes the conversation and all associated data.`,
    params: [
      {
        name: 'conversation_sid',
        type: 'string',
        required: true,
        description: `The unique SID of the conversation to delete.`,
      },
    ],
  },
  {
    name: 'twilio_conversation_get',
    description: `Retrieve the details of a specific Twilio Conversation by its SID.`,
    params: [
      {
        name: 'conversation_sid',
        type: 'string',
        required: true,
        description: `The unique SID of the conversation to retrieve.`,
      },
    ],
  },
  {
    name: 'twilio_conversation_message_create',
    description: `Send a new message into a Twilio Conversation. Existing tools can only list or delete conversation messages.`,
    params: [
      {
        name: 'conversation_sid',
        type: 'string',
        required: true,
        description: `The unique SID of the conversation to send the message into.`,
      },
      {
        name: 'attributes',
        type: 'string',
        required: false,
        description: `Free-form JSON metadata to store on the message, as a string.`,
      },
      {
        name: 'author',
        type: 'string',
        required: false,
        description: `The channel-specific identifier of the message's author. Defaults to 'system'.`,
      },
      {
        name: 'body',
        type: 'string',
        required: false,
        description: `The text content of the message. Up to 1,600 characters. Ignored if content_sid is set.`,
      },
      {
        name: 'content_sid',
        type: 'string',
        required: false,
        description: `The SID of a Rich Content template to use for this message. If set, this overrides body and media_sid.`,
      },
      {
        name: 'content_variables',
        type: 'string',
        required: false,
        description: `JSON string of variable values to resolve in the Content Template referenced by content_sid.`,
      },
      {
        name: 'media_sid',
        type: 'string',
        required: false,
        description: `The SID of a previously-uploaded Media resource to attach to this message.`,
      },
      {
        name: 'subject',
        type: 'string',
        required: false,
        description: `The subject of the message, for channels that support it (e.g. email). Up to 256 characters.`,
      },
    ],
  },
  {
    name: 'twilio_conversation_message_delete',
    description: `Delete a specific message from a Twilio Conversation by its SID.`,
    params: [
      {
        name: 'conversation_sid',
        type: 'string',
        required: true,
        description: `The unique SID of the conversation containing the message.`,
      },
      {
        name: 'message_sid',
        type: 'string',
        required: true,
        description: `The unique SID of the message to delete.`,
      },
    ],
  },
  {
    name: 'twilio_conversation_messages_list',
    description: `List all messages in a Twilio Conversation. Optionally control the sort order and page size.`,
    params: [
      {
        name: 'conversation_sid',
        type: 'string',
        required: true,
        description: `The unique SID of the conversation to list messages for.`,
      },
      {
        name: 'order',
        type: 'string',
        required: false,
        description: `The sort order of messages. One of: asc, desc.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `The number of messages to return per page.`,
      },
    ],
  },
  {
    name: 'twilio_conversation_participant_create',
    description: `Add a participant to a Twilio Conversation, either as an SDK-connected Conversation User (identity) or as an external SMS/WhatsApp address (messaging_binding_address). Provide exactly one of identity or messaging_binding_address, not both. Existing tools can only list participants.`,
    params: [
      {
        name: 'conversation_sid',
        type: 'string',
        required: true,
        description: `The unique SID of the conversation to add the participant to.`,
      },
      {
        name: 'attributes',
        type: 'string',
        required: false,
        description: `Free-form JSON metadata to store on the participant, as a string.`,
      },
      {
        name: 'identity',
        type: 'string',
        required: false,
        description: `The Conversations SDK identity of the participant, for participants connecting via the Conversations SDK. Do not set together with messaging_binding_address.`,
      },
      {
        name: 'messaging_binding_address',
        type: 'string',
        required: false,
        description: `The participant's SMS or WhatsApp address (e.g. a phone number). Together with messaging_binding_proxy_address, uniquely identifies the participant. Do not set together with identity.`,
      },
      {
        name: 'messaging_binding_proxy_address',
        type: 'string',
        required: false,
        description: `The Twilio phone or WhatsApp number this participant will see messages from. Required together with messaging_binding_address for non-SDK participants.`,
      },
      {
        name: 'role_sid',
        type: 'string',
        required: false,
        description: `The SID of a conversation-level Role to assign to this participant.`,
      },
    ],
  },
  {
    name: 'twilio_conversation_participants_list',
    description: `List all participants in a Twilio Conversation.`,
    params: [
      {
        name: 'conversation_sid',
        type: 'string',
        required: true,
        description: `The unique SID of the conversation to list participants for.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `The number of participants to return per page.`,
      },
    ],
  },
  {
    name: 'twilio_conversations_list',
    description: `List all Twilio Conversations. Optionally filter by state and control page size.`,
    params: [
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `The number of conversations to return per page.`,
      },
      {
        name: 'state',
        type: 'string',
        required: false,
        description: `Filter conversations by state. One of: active, inactive, closed.`,
      },
    ],
  },
  {
    name: 'twilio_lookup_phone_number',
    description: `Look up information about a phone number, such as formatting, carrier, line type, and caller name, using Twilio Lookup.`,
    params: [
      {
        name: 'phone_number',
        type: 'string',
        required: true,
        description: `The phone number to look up, in E.164 format.`,
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of data packages to include, e.g. line_type_intelligence, caller_name, sim_swap.`,
      },
    ],
  },
  {
    name: 'twilio_message_create',
    description: `Send a new SMS or MMS message from your Twilio account. Requires a sender (from_number or messaging_service_sid) and either body text or media_url.`,
    params: [
      {
        name: 'body',
        type: 'string',
        required: true,
        description: `The text content of the message. Up to 1,600 characters.`,
      },
      {
        name: 'to',
        type: 'string',
        required: true,
        description: `The recipient's phone number in E.164 format.`,
      },
      {
        name: 'from_number',
        type: 'string',
        required: false,
        description: `Your Twilio phone number to send from, in E.164 format. Required if messaging_service_sid is not set.`,
      },
      {
        name: 'media_url',
        type: 'array',
        required: false,
        description: `URLs of media to include for MMS. jpeg, jpg, gif, and png are fully supported.`,
      },
      {
        name: 'messaging_service_sid',
        type: 'string',
        required: false,
        description: `The SID of the Messaging Service to send from, instead of a specific from_number.`,
      },
      {
        name: 'status_callback',
        type: 'string',
        required: false,
        description: `The URL Twilio calls to send message status callback requests.`,
      },
    ],
  },
  {
    name: 'twilio_message_delete',
    description: `Permanently delete a message resource from your Twilio account. This action cannot be undone.`,
    params: [
      {
        name: 'message_sid',
        type: 'string',
        required: true,
        description: `The unique identifier of the message to delete`,
      },
    ],
  },
  {
    name: 'twilio_message_get',
    description: `Retrieve the details of a specific message by its SID.`,
    params: [
      {
        name: 'message_sid',
        type: 'string',
        required: true,
        description: `The unique identifier of the message to retrieve`,
      },
    ],
  },
  {
    name: 'twilio_message_media_list',
    description: `Retrieve a list of media resources associated with a specific message.`,
    params: [
      {
        name: 'message_sid',
        type: 'string',
        required: true,
        description: `The SID of the message to list media for`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of media resources to return per page (1-1000, default 50)`,
      },
    ],
  },
  {
    name: 'twilio_message_update',
    description: `Update a message resource. Set body to an empty string to redact the text content of a message, or set status to 'canceled' to cancel a message that is still scheduled to send.`,
    params: [
      {
        name: 'message_sid',
        type: 'string',
        required: true,
        description: `The SID of the message resource to update.`,
      },
      {
        name: 'body',
        type: 'string',
        required: false,
        description: `The new body of the message. Pass an empty string to redact the message text.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Set to 'canceled' to cancel a message that is still scheduled to send.`,
      },
    ],
  },
  {
    name: 'twilio_messages_list',
    description: `Retrieve a list of messages associated with your Twilio account, with optional filtering by recipient, sender, or date sent.`,
    params: [
      {
        name: 'date_sent',
        type: 'string',
        required: false,
        description: `Filter by date sent (YYYY-MM-DD format)`,
      },
      {
        name: 'from_number',
        type: 'string',
        required: false,
        description: `Filter by messages sent from this phone number in E.164 format`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of messages to return per page (1-1000, default 50)`,
      },
      {
        name: 'to',
        type: 'string',
        required: false,
        description: `Filter by messages sent to this phone number in E.164 format`,
      },
    ],
  },
  {
    name: 'twilio_messaging_services_list',
    description: `Retrieve a list of all Messaging Services associated with your Twilio account.`,
    params: [
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of Messaging Services to return per page (1-1000, default 50)`,
      },
    ],
  },
  {
    name: 'twilio_phone_number_create',
    description: `Purchase a new incoming phone number for your Twilio account. Provide either phone_number for a specific number, or area_code to have Twilio pick one.`,
    params: [
      {
        name: 'area_code',
        type: 'string',
        required: false,
        description: `The desired US/Canada area code for the new number, if phone_number is not set.`,
      },
      {
        name: 'friendly_name',
        type: 'string',
        required: false,
        description: `A descriptive name for the new phone number.`,
      },
      {
        name: 'phone_number',
        type: 'string',
        required: false,
        description: `The specific phone number to purchase, in E.164 format.`,
      },
      {
        name: 'sms_url',
        type: 'string',
        required: false,
        description: `The URL Twilio calls when the number receives an incoming SMS.`,
      },
      {
        name: 'voice_url',
        type: 'string',
        required: false,
        description: `The URL Twilio calls to answer an incoming call to the number.`,
      },
    ],
  },
  {
    name: 'twilio_phone_number_delete',
    description: `Release (delete) an incoming phone number from your Twilio account. This action cannot be undone.`,
    params: [
      {
        name: 'phone_number_sid',
        type: 'string',
        required: true,
        description: `The SID of the incoming phone number to release.`,
      },
    ],
  },
  {
    name: 'twilio_phone_number_get',
    description: `Retrieve details of a specific incoming phone number by its SID.`,
    params: [
      {
        name: 'phone_number_sid',
        type: 'string',
        required: true,
        description: `The SID of the incoming phone number to retrieve.`,
      },
    ],
  },
  {
    name: 'twilio_phone_number_update',
    description: `Update the configuration of an existing Twilio incoming phone number, such as its webhook URLs or friendly name.`,
    params: [
      {
        name: 'phone_number_sid',
        type: 'string',
        required: true,
        description: `The SID of the incoming phone number to update.`,
      },
      {
        name: 'friendly_name',
        type: 'string',
        required: false,
        description: `A new descriptive name for the phone number.`,
      },
      {
        name: 'sms_url',
        type: 'string',
        required: false,
        description: `The URL Twilio calls when the number receives an incoming SMS.`,
      },
      {
        name: 'status_callback',
        type: 'string',
        required: false,
        description: `The URL Twilio calls to send status information about the number.`,
      },
      {
        name: 'voice_url',
        type: 'string',
        required: false,
        description: `The URL Twilio calls to answer an incoming call to the number.`,
      },
    ],
  },
  {
    name: 'twilio_phone_numbers_list',
    description: `List all incoming phone numbers on the Twilio account.`,
    params: [
      {
        name: 'friendly_name',
        type: 'string',
        required: false,
        description: `Filter by friendly name of the phone number.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of results to return per page.`,
      },
      {
        name: 'phone_number',
        type: 'string',
        required: false,
        description: `Filter by phone number in E.164 format.`,
      },
    ],
  },
  {
    name: 'twilio_queue_create',
    description: `Create a call queue, used with TwiML's <Enqueue> and <Dequeue> verbs to hold callers (e.g. for a callback or a simple call center).`,
    params: [
      {
        name: 'friendly_name',
        type: 'string',
        required: true,
        description: `A descriptive name for this queue. Up to 64 characters.`,
      },
      {
        name: 'max_size',
        type: 'integer',
        required: false,
        description: `The maximum number of calls allowed in the queue at once. Default 1000, maximum 5000.`,
      },
    ],
  },
  {
    name: 'twilio_queues_list',
    description: `List call queues on the account, used with TwiML's <Enqueue> and <Dequeue> verbs.`,
    params: [
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `The number of queues to return per page.`,
      },
    ],
  },
  {
    name: 'twilio_recording_delete',
    description: `Permanently delete a call recording from the account. This action cannot be undone.`,
    params: [
      {
        name: 'recording_sid',
        type: 'string',
        required: true,
        description: `The unique identifier of the Recording resource to delete.`,
      },
    ],
  },
  {
    name: 'twilio_recording_get',
    description: `Retrieve details of a specific call recording by its SID, including duration, status, and source.`,
    params: [
      {
        name: 'recording_sid',
        type: 'string',
        required: true,
        description: `The unique identifier of the Recording resource to retrieve.`,
      },
    ],
  },
  {
    name: 'twilio_recordings_list',
    description: `Retrieve a list of call recordings for the account, with optional filtering by call SID, date, and pagination.`,
    params: [
      {
        name: 'call_sid',
        type: 'string',
        required: false,
        description: `Filter recordings by the Call SID they are associated with.`,
      },
      {
        name: 'date_created',
        type: 'string',
        required: false,
        description: `Filter recordings created on this date (YYYY-MM-DD format).`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `The number of results to return per page. Maximum is 1000.`,
      },
    ],
  },
  {
    name: 'twilio_subaccount_create',
    description: `Create a new subaccount under the current Twilio account. Subaccounts let you isolate resources (phone numbers, usage, billing) per project or customer while staying under one parent account.`,
    params: [
      {
        name: 'friendly_name',
        type: 'string',
        required: false,
        description: `A human-readable description of the subaccount. Defaults to 'SubAccount Created at {timestamp}' if omitted.`,
      },
    ],
  },
  {
    name: 'twilio_usage_records_list',
    description: `Retrieve usage records for a Twilio account, optionally filtered by category and date range.`,
    params: [
      {
        name: 'category',
        type: 'string',
        required: false,
        description: `The usage category to filter by (e.g., sms, calls, phonenumbers).`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `The end date for the usage records in YYYY-MM-DD format.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of results to return per page.`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `The start date for the usage records in YYYY-MM-DD format.`,
      },
    ],
  },
  {
    name: 'twilio_usage_records_today',
    description: `Retrieve today's usage records for a Twilio account, optionally filtered by category.`,
    params: [
      {
        name: 'category',
        type: 'string',
        required: false,
        description: `The usage category to filter by (e.g., sms, calls, phonenumbers).`,
      },
    ],
  },
  {
    name: 'twilio_verification_check',
    description: `Check a one-time verification code entered by a user against a Twilio Verify service. Provide either 'to' or 'verification_sid'.`,
    params: [
      {
        name: 'code',
        type: 'string',
        required: true,
        description: `The verification code entered by the user.`,
      },
      {
        name: 'service_sid',
        type: 'string',
        required: true,
        description: `The SID of the Verify service to check against.`,
      },
      {
        name: 'to',
        type: 'string',
        required: false,
        description: `The phone number or email address being verified. Required if verification_sid is not set.`,
      },
      {
        name: 'verification_sid',
        type: 'string',
        required: false,
        description: `The SID of the verification to check. Required if 'to' is not set.`,
      },
    ],
  },
  {
    name: 'twilio_verification_create',
    description: `Start a phone or email verification by sending a one-time code via Twilio Verify.`,
    params: [
      {
        name: 'channel',
        type: 'string',
        required: true,
        description: `The verification method to use.`,
      },
      {
        name: 'service_sid',
        type: 'string',
        required: true,
        description: `The SID of the Verify service to use.`,
      },
      {
        name: 'to',
        type: 'string',
        required: true,
        description: `The phone number (E.164 format) or email address to verify.`,
      },
      {
        name: 'locale',
        type: 'string',
        required: false,
        description: `The locale to use for the verification message.`,
      },
    ],
  },
  {
    name: 'twilio_verification_get',
    description: `Retrieve the status and details of a specific verification by its SID.`,
    params: [
      {
        name: 'service_sid',
        type: 'string',
        required: true,
        description: `The SID of the Verify service.`,
      },
      {
        name: 'verification_sid',
        type: 'string',
        required: true,
        description: `The SID of the verification to retrieve.`,
      },
    ],
  },
  {
    name: 'twilio_verification_update',
    description: `Update the status of a pending Twilio Verify verification: cancel it, or force-approve it without checking a code.`,
    params: [
      {
        name: 'service_sid',
        type: 'string',
        required: true,
        description: `The SID of the Verify service the verification belongs to.`,
      },
      {
        name: 'status',
        type: 'string',
        required: true,
        description: `The new status for the verification.`,
      },
      {
        name: 'verification_sid',
        type: 'string',
        required: true,
        description: `The SID of the verification to update.`,
      },
    ],
  },
  {
    name: 'twilio_verify_service_create',
    description: `Create a new Twilio Verify service for sending verification codes via SMS, call, email, or WhatsApp.`,
    params: [
      {
        name: 'friendly_name',
        type: 'string',
        required: true,
        description: `A descriptive name for the Verify service.`,
      },
      {
        name: 'code_length',
        type: 'integer',
        required: false,
        description: `The length of the verification code to generate. Must be between 4 and 10.`,
      },
      {
        name: 'lookup_enabled',
        type: 'string',
        required: false,
        description: `Whether to perform a lookup on the phone number before sending verification.`,
      },
      {
        name: 'psd2_enabled',
        type: 'string',
        required: false,
        description: `Whether to enable PSD2 compliance for the service.`,
      },
      {
        name: 'skip_sms_to_landlines',
        type: 'string',
        required: false,
        description: `Whether to skip sending SMS to landline phone numbers.`,
      },
    ],
  },
  {
    name: 'twilio_verify_service_delete',
    description: `Delete a Twilio Verify service by its SID. This action is irreversible.`,
    params: [
      {
        name: 'service_sid',
        type: 'string',
        required: true,
        description: `The unique SID of the Verify service to delete.`,
      },
    ],
  },
  {
    name: 'twilio_verify_service_get',
    description: `Retrieve details of a specific Twilio Verify service by its SID.`,
    params: [
      {
        name: 'service_sid',
        type: 'string',
        required: true,
        description: `The unique SID of the Verify service to retrieve.`,
      },
    ],
  },
  {
    name: 'twilio_verify_service_update',
    description: `Update settings of an existing Twilio Verify service, such as its code length or friendly name.`,
    params: [
      {
        name: 'service_sid',
        type: 'string',
        required: true,
        description: `The SID of the Verify service to update.`,
      },
      {
        name: 'code_length',
        type: 'integer',
        required: false,
        description: `Number of digits in the verification code (4-10).`,
      },
      {
        name: 'friendly_name',
        type: 'string',
        required: false,
        description: `A new human-readable name for this verification service.`,
      },
      {
        name: 'lookup_enabled',
        type: 'string',
        required: false,
        description: `Enable phone number lookup before verification.`,
      },
      {
        name: 'psd2_enabled',
        type: 'string',
        required: false,
        description: `Enable PSD2 compliant verification messages.`,
      },
      {
        name: 'skip_sms_to_landlines',
        type: 'string',
        required: false,
        description: `Skip SMS delivery to landline numbers.`,
      },
    ],
  },
  {
    name: 'twilio_verify_services_list',
    description: `List all Twilio Verify services on the account.`,
    params: [
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of results to return per page. Maximum is 1000.`,
      },
    ],
  },
]
