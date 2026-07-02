import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'fathom_create_webhook',
    description: `Create a new webhook subscription in Fathom. Fathom will POST meeting data to the destination_url when recordings matching the triggered_for criteria are available. The triggered_for field controls whose recordings trigger the webhook. At least one of the include_summary, include_transcript, include_action_items, or include_crm_matches flags must be set to true — the API returns an error if all content flags are omitted or null.`,
    params: [
      {
        name: 'destination_url',
        type: 'string',
        required: true,
        description: `The HTTPS URL that Fathom will POST webhook payloads to. Must be a publicly accessible URL. Example: https://yourserver.example.com/webhooks/fathom.`,
      },
      {
        name: 'triggered_for',
        type: 'array',
        required: true,
        description: `Array of recording scopes that trigger this webhook. Valid values: my_recordings (your own recordings), shared_external_recordings (recordings shared from outside your org), my_shared_with_team_recordings (your recordings shared with a team), shared_team_recordings (recordings shared within the team). At least one value is required.`,
      },
      {
        name: 'include_action_items',
        type: 'boolean',
        required: false,
        description: `When true, the webhook payload includes extracted action items from the meeting.`,
      },
      {
        name: 'include_crm_matches',
        type: 'boolean',
        required: false,
        description: `When true, the webhook payload includes matched CRM data (contacts, deals, companies).`,
      },
      {
        name: 'include_summary',
        type: 'boolean',
        required: false,
        description: `When true, the webhook payload includes the AI-generated meeting summary.`,
      },
      {
        name: 'include_transcript',
        type: 'boolean',
        required: false,
        description: `When true, the webhook payload includes the full meeting transcript.`,
      },
    ],
  },
  {
    name: 'fathom_delete_webhook',
    description: `Delete a webhook subscription in Fathom by its ID. Once deleted, Fathom will stop sending webhook POST requests to the associated destination URL. The webhook ID is returned in the Create Webhook response.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique identifier of the webhook to delete. Returned as the id field in the Create Webhook response.`,
      },
    ],
  },
  {
    name: 'fathom_get_recording_summary',
    description: `Retrieve the AI-generated summary for a specific Fathom recording by its recording ID. The recording_id is found in the Meeting object returned by List Meetings. If destination_url is provided, the result is posted asynchronously to that URL instead of returned directly.`,
    params: [
      {
        name: 'recording_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the recording whose summary to retrieve. Found in the recording_id field of a Meeting object from the List Meetings response.`,
      },
      {
        name: 'destination_url',
        type: 'string',
        required: false,
        description: `Optional webhook URL to receive the summary asynchronously. When set, Fathom posts the result to this URL instead of returning it in the response. Must be a valid HTTPS URL. Example: https://yourserver.example.com/webhooks/fathom.`,
      },
    ],
  },
  {
    name: 'fathom_get_recording_transcript',
    description: `Retrieve the full transcript for a specific Fathom recording by its recording ID. The recording_id is found in the Meeting object returned by List Meetings. If destination_url is provided, the transcript is posted asynchronously to that URL instead of returned directly.`,
    params: [
      {
        name: 'recording_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the recording whose transcript to retrieve. Found in the recording_id field of a Meeting object from the List Meetings response.`,
      },
      {
        name: 'destination_url',
        type: 'string',
        required: false,
        description: `Optional webhook URL to receive the transcript asynchronously. When set, Fathom posts the result to this URL instead of returning it in the response. Must be a valid HTTPS URL. Example: https://yourserver.example.com/webhooks/fathom.`,
      },
    ],
  },
  {
    name: 'fathom_list_meeting_types',
    description: `List all meeting types configured in Fathom. Meeting types categorize recordings (e.g., 'Sales Call', 'Demo', 'Onboarding'). Use the returned type names to filter meetings in the List Meetings tool.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor returned by a previous List Meeting Types response. Pass this value to retrieve the next page of results.`,
      },
    ],
  },
  {
    name: 'fathom_list_meetings',
    description: `List meetings recorded by Fathom with optional filters. Returns paginated meeting records including participants, recording IDs, and metadata. Use cursor for pagination. Array parameters (calendar_invitees_domains, recorded_by, teams) must be sent with bracket notation (e.g., calendar_invitees_domains[]=example.com) — the API handles this automatically when you pass arrays.`,
    params: [
      {
        name: 'calendar_invitees_domains',
        type: 'array',
        required: false,
        description: `Filter meetings by company domains of calendar invitees. Provide as an array of domain strings, e.g. ["acme.com", "example.org"]. Sent as calendar_invitees_domains[] query params.`,
      },
      {
        name: 'calendar_invitees_domains_type',
        type: 'string',
        required: false,
        description: `Controls how the calendar_invitees_domains filter is applied. Valid values: all (all invitees match), only_internal (only internal domains), one_or_more_external (at least one external domain).`,
      },
      {
        name: 'created_after',
        type: 'string',
        required: false,
        description: `Return only meetings created after this ISO 8601 datetime. Example: 2025-01-01T00:00:00Z.`,
      },
      {
        name: 'created_before',
        type: 'string',
        required: false,
        description: `Return only meetings created before this ISO 8601 datetime. Example: 2025-12-31T23:59:59Z.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor returned by a previous List Meetings response. Pass this value to retrieve the next page of results.`,
      },
      {
        name: 'include_action_items',
        type: 'boolean',
        required: false,
        description: `When true, each meeting record includes extracted action items from the AI analysis.`,
      },
      {
        name: 'include_crm_matches',
        type: 'boolean',
        required: false,
        description: `When true, each meeting record includes matched CRM data (contacts, deals, companies).`,
      },
      {
        name: 'include_highlights',
        type: 'boolean',
        required: false,
        description: `When true, each meeting record includes AI-generated highlights from the recording.`,
      },
      {
        name: 'include_summary',
        type: 'boolean',
        required: false,
        description: `When true, each meeting record includes the AI-generated meeting summary.`,
      },
      {
        name: 'include_transcript',
        type: 'boolean',
        required: false,
        description: `When true, each meeting record includes the full meeting transcript.`,
      },
      {
        name: 'meeting_type',
        type: 'string',
        required: false,
        description: `Filter meetings by their meeting type name (e.g., 'Sales Call', 'Demo'). Must match a meeting type name configured in Fathom.`,
      },
      {
        name: 'recorded_by',
        type: 'array',
        required: false,
        description: `Filter meetings by recorder email addresses. Provide as an array of email strings. Sent as recorded_by[] query params.`,
      },
      {
        name: 'teams',
        type: 'array',
        required: false,
        description: `Filter meetings by team names. Provide as an array of team name strings. Sent as teams[] query params.`,
      },
    ],
  },
  {
    name: 'fathom_list_team_members',
    description: `List team members in Fathom. Returns user details including names and email addresses. Optionally filter by team name to retrieve members of a specific team.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor returned by a previous List Team Members response. Pass this value to retrieve the next page of results.`,
      },
      {
        name: 'team',
        type: 'string',
        required: false,
        description: `Filter members by team name. Must match a team name returned by the List Teams tool. Example: 'Sales'.`,
      },
    ],
  },
  {
    name: 'fathom_list_teams',
    description: `List all teams configured in Fathom. Returns team names and metadata. Use the returned team names to filter meetings via the teams parameter in the List Meetings tool.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor returned by a previous List Teams response. Pass this value to retrieve the next page of results.`,
      },
    ],
  },
]
