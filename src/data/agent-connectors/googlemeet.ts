import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'googlemeet_create_meet_space',
    description: `Create a new Google Meet meeting space. Optionally configure access type and entry point access restrictions. Returns the meeting URI and space details. Uses OAuth credentials.`,
    params: [
      {
        name: 'access_type',
        type: 'string',
        required: false,
        description: `Access type for the meeting space. One of: 'OPEN' (anyone with link), 'TRUSTED' (domain users), 'RESTRICTED' (only invited participants).`,
      },
      {
        name: 'entry_point_access',
        type: 'string',
        required: false,
        description: `Who can use entry points to join. One of: 'ALL' (anyone), 'CREATOR_APP_ONLY' (only the creating app's users).`,
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
    name: 'googlemeet_end_meet_conference',
    description: `End the active conference in a Google Meet space, disconnecting all participants. Requires the resource name of the space (e.g., 'spaces/abc123'). Uses OAuth credentials.`,
    params: [
      {
        name: 'space_name',
        type: 'string',
        required: true,
        description: `Resource name of the Meet space whose active conference to end (e.g., 'spaces/abc123').`,
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
    name: 'googlemeet_get_conference_record',
    description: `Retrieve details of a single Google Meet conference record by its resource name (e.g., 'conferenceRecords/abc123'), including its start/end time and associated space. Uses OAuth credentials.`,
    params: [
      {
        name: 'conference_record_name',
        type: 'string',
        required: true,
        description: `Resource name of the conference record to retrieve (e.g., 'conferenceRecords/abc123def456')`,
      },
    ],
  },
  {
    name: 'googlemeet_get_meet_space',
    description: `Retrieve details of a Google Meet meeting space by its resource name (e.g., 'spaces/abc123'), including its meeting URI and configuration. Uses OAuth credentials.`,
    params: [
      {
        name: 'space_name',
        type: 'string',
        required: true,
        description: `Resource name of the Meet space to retrieve (e.g., 'spaces/abc123').`,
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
    name: 'googlemeet_get_participant',
    description: `Retrieve details of a single Google Meet conference participant by their resource name (signed-in user, anonymous user, or phone user). Uses OAuth credentials.`,
    params: [
      {
        name: 'participant_name',
        type: 'string',
        required: true,
        description: `Resource name of the participant to retrieve (e.g., 'conferenceRecords/abc123def456/participants/xyz789')`,
      },
    ],
  },
  {
    name: 'googlemeet_get_recording',
    description: `Retrieve details of a single Google Meet recording by its resource name, including its Google Drive export location. Uses OAuth credentials.`,
    params: [
      {
        name: 'recording_name',
        type: 'string',
        required: true,
        description: `Resource name of the recording to retrieve (e.g., 'conferenceRecords/abc123def456/recordings/xyz789')`,
      },
    ],
  },
  {
    name: 'googlemeet_get_smart_note',
    description: `Retrieve details of a single Gemini-generated smart notes session by its resource name, including its state and Google Docs destination. Uses OAuth credentials.`,
    params: [
      {
        name: 'smart_note_name',
        type: 'string',
        required: true,
        description: `Resource name of the smart notes session to retrieve (e.g., 'conferenceRecords/abc123def456/smartNotes/xyz789')`,
      },
    ],
  },
  {
    name: 'googlemeet_get_transcript',
    description: `Retrieve details of a single Google Meet transcript by its resource name, including its Google Docs export location. Uses OAuth credentials.`,
    params: [
      {
        name: 'transcript_name',
        type: 'string',
        required: true,
        description: `Resource name of the transcript to retrieve (e.g., 'conferenceRecords/abc123def456/transcripts/xyz789')`,
      },
    ],
  },
  {
    name: 'googlemeet_list_conference_records',
    description: `List past Google Meet conference records, ordered by start time in descending order, optionally filtered by space name, meeting code, or start/end time. Uses OAuth credentials.`,
    params: [
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Filter expression restricting which conference records are returned, e.g. by space.meeting_code, space.name, start_time, or end_time`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of conference records to return (default 25, maximum 100)`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `Token for retrieving the next page of results`,
      },
    ],
  },
  {
    name: 'googlemeet_list_participant_sessions',
    description: `List the join/leave sessions of a single Google Meet participant. A participant can have multiple sessions if they rejoined the same conference. Uses OAuth credentials.`,
    params: [
      {
        name: 'participant_name',
        type: 'string',
        required: true,
        description: `Resource name of the parent participant whose sessions to list (e.g., 'conferenceRecords/abc123def456/participants/xyz789')`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `EBNF filter expression over start_time / end_time, e.g. "end_time IS NULL" to return only sessions still in progress.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of participant sessions to return (default 10, maximum 100)`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `Token for retrieving the next page of results`,
      },
    ],
  },
  {
    name: 'googlemeet_list_participants',
    description: `List the participants of a Google Meet conference, given the conference record's resource name. Uses OAuth credentials.`,
    params: [
      {
        name: 'conference_record_name',
        type: 'string',
        required: true,
        description: `Resource name of the conference record whose participants to list (e.g., 'conferenceRecords/abc123def456')`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `EBNF filter expression over earliest_start_time / latest_end_time, e.g. "latest_end_time IS NULL" to return only participants currently in the conference.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of participants to return (default 10, maximum 250)`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `Token for retrieving the next page of results`,
      },
    ],
  },
  {
    name: 'googlemeet_list_recordings',
    description: `List the recordings generated during a Google Meet conference, given the conference record's resource name. Uses OAuth credentials.`,
    params: [
      {
        name: 'conference_record_name',
        type: 'string',
        required: true,
        description: `Resource name of the conference record whose recordings to list (e.g., 'conferenceRecords/abc123def456')`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of recordings to return (default 10, maximum 100)`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `Token for retrieving the next page of results`,
      },
    ],
  },
  {
    name: 'googlemeet_list_smart_notes',
    description: `List the set of Gemini-generated smart notes sessions from a Google Meet conference, given the conference record's resource name. Each smart notes session points to a Google Doc destination. Uses OAuth credentials.`,
    params: [
      {
        name: 'conference_record_name',
        type: 'string',
        required: true,
        description: `Resource name of the conference record whose smart notes to list (e.g., 'conferenceRecords/abc123def456')`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of smart notes to return (default 10, maximum 100)`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `Token for retrieving the next page of results`,
      },
    ],
  },
  {
    name: 'googlemeet_list_transcript_entries',
    description: `List the structured transcript entries (one per speaker utterance, with text, speaker, and start/end time) within a Google Meet transcript. Uses OAuth credentials.`,
    params: [
      {
        name: 'transcript_name',
        type: 'string',
        required: true,
        description: `Resource name of the parent transcript whose entries to list (e.g., 'conferenceRecords/abc123def456/transcripts/xyz789')`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of transcript entries to return (default 10, maximum 100)`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `Token for retrieving the next page of results`,
      },
    ],
  },
  {
    name: 'googlemeet_list_transcripts',
    description: `List the transcripts generated during a Google Meet conference, given the conference record's resource name. Uses OAuth credentials.`,
    params: [
      {
        name: 'conference_record_name',
        type: 'string',
        required: true,
        description: `Resource name of the conference record whose transcripts to list (e.g., 'conferenceRecords/abc123def456')`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of transcripts to return (default 10, maximum 100)`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `Token for retrieving the next page of results`,
      },
    ],
  },
  {
    name: 'googlemeet_update_meet_space',
    description: `Update the configuration of a Google Meet meeting space, such as its access type or entry point access. Only the fields you provide are changed unless an explicit update mask is given. Uses OAuth credentials.`,
    params: [
      {
        name: 'space_name',
        type: 'string',
        required: true,
        description: `Resource name of the Meet space to update (e.g., 'spaces/abc123')`,
      },
      {
        name: 'access_type',
        type: 'string',
        required: false,
        description: `Access type for the meeting space. One of: 'OPEN' (anyone with link), 'TRUSTED' (domain users), 'RESTRICTED' (only invited participants).`,
      },
      {
        name: 'entry_point_access',
        type: 'string',
        required: false,
        description: `Who can use entry points to join. One of: 'ALL' (anyone), 'CREATOR_APP_ONLY' (only the creating app's users).`,
      },
      {
        name: 'update_mask',
        type: 'string',
        required: false,
        description: `Comma-separated field mask restricting which fields are updated (e.g. 'config.accessType'). If omitted, all fields provided in the request are updated.`,
      },
    ],
  },
]
