import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'proshortai_recordings_bulk_get',
    description: `Fetch details for up to 100 ProShort recordings in one call by their document_ids — e.g. to hydrate a list of results from Search Recordings. Missing/invalid IDs are reported separately in not_found rather than failing the whole request. Use projections to keep the response small when you don't need every field (especially the transcript).`,
    params: [
      {
        name: 'meeting_ids',
        type: 'array',
        required: true,
        description: `The document_ids of the recordings to fetch, 1-100 per call. Duplicates are automatically de-duplicated by the API.`,
      },
      {
        name: 'projections',
        type: 'array',
        required: false,
        description: `Fields to include for each recording in the response, to minimize payload size. Omit to receive all fields for every recording.`,
      },
    ],
  },
  {
    name: 'proshortai_recordings_get',
    description: `Retrieve full detail for a single ProShort meeting recording by its document_id (typically obtained from Search Recordings): title, scheduled time, platform, attendees, prospect company, AI-generated overview, transcript, and media URLs. Use the projections parameter to request only the fields you need and keep the response small — this matters especially for the (potentially large) transcript field.`,
    params: [
      {
        name: 'meeting_id',
        type: 'string',
        required: true,
        description: `The recording's unique identifier (document_id), e.g. as returned by Search Recordings or Bulk Get Recordings.`,
      },
      {
        name: 'projections',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to include in the response, to minimize payload size. Omit to receive all fields. Valid field names: document_id, event_title, source, scheduled_at, meeting_platform, meeting_participants, parties, prospect_company_name, transcript, thumbnail_url, gcp_public_url, overview.`,
      },
    ],
  },
  {
    name: 'proshortai_recordings_get_v1',
    description: `Retrieve a ProShort recording via the original v1 endpoint. Unlike the current v3 Get Recording tool (which returns a flattened, plain-text transcript), v1 always returns the complete raw diarized transcript — an array of speaker-attributed segments, each broken into individual words with start/end timestamps and confidence scores — plus meeting participants (with join/leave events) and parties (attendee/company details). There is no field-selection support: v1 always returns every field, with no projections parameter. If the meeting isn't available or doesn't belong to the calling customer, the response still returns HTTP 200 with an empty data object.`,
    params: [
      {
        name: 'meeting_id',
        type: 'string',
        required: true,
        description: `The recording's unique identifier (document_id), e.g. as returned by Search Recordings, Bulk Get Recordings, or Get Recording.`,
      },
    ],
  },
  {
    name: 'proshortai_recordings_get_v2',
    description: `Retrieve a ProShort recording via the v2 endpoint. The standout difference from the current v3 Get Recording tool: when the overview projection is requested, v2 returns a rich structured object (recap, budget, timing, use_case, pain_points, action_items, prospect_info, contract_status, questions_asked, risks_obstacles, decision_process, customer_reactions, product_discussion, product_experience, product_suggestions, competitors_mentioned) instead of v3's flattened plain-text summary — useful when you need the individual deal-analysis fields rather than prose. Use projections to request only the fields you need; document_id must always be included in the projections list when projections is used. Adding projections is optional but recommended to speed up requests. If the meeting isn't available or doesn't belong to the calling customer, the response still returns HTTP 200 with an empty data object.`,
    params: [
      {
        name: 'meeting_id',
        type: 'string',
        required: true,
        description: `The recording's unique identifier (document_id), e.g. as returned by Search Recordings, Bulk Get Recordings, or Get Recording.`,
      },
      {
        name: 'projections',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to include in the response, to minimize payload size and speed up the request. document_id must always be included in this list when projections is used. Omit entirely to receive all fields. Valid field names: document_id, event_title, source, scheduled_at, meeting_platform, meeting_participants, parties, prospect_company_name, transcript, thumbnail_url, gcp_public_url, overview.`,
      },
    ],
  },
  {
    name: 'proshortai_recordings_search',
    description: `Search and filter ProShort meeting recordings by title text, date range, attendee email, and conferencing platform. Returns a cursor-paginated list of lightweight recording summaries (document_id, title, scheduled time, platform, participants). Use Get Recording or Bulk Get Recordings afterwards to fetch full details/transcripts for specific results.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Opaque pagination token from a previous response's next_cursor field. Pass it back exactly as received to fetch the next page; omit it to start from the first page.`,
      },
      {
        name: 'from_date',
        type: 'string',
        required: false,
        description: `Lower bound (inclusive) for the meeting's scheduled start time, as an ISO-8601 timestamp.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of recordings to return per page. Valid range is 1-100; defaults to 20 if omitted.`,
      },
      {
        name: 'participants',
        type: 'array',
        required: false,
        description: `Filter by attendee email address. Provide one or more emails; they are OR-matched (any meeting containing at least one of the given attendees is returned). Matching is case-insensitive. Each value is sent as its own repeated participants query parameter.`,
      },
      {
        name: 'platform',
        type: 'string',
        required: false,
        description: `Exact match on the conferencing platform used for the meeting, e.g. zoom, google_meet, teams.`,
      },
      {
        name: 'q',
        type: 'string',
        required: false,
        description: `Free-text search on the meeting title. Supports partial matches. Results are ranked by relevance, then recency.`,
      },
      {
        name: 'to_date',
        type: 'string',
        required: false,
        description: `Upper bound (inclusive) for the meeting's scheduled start time, as an ISO-8601 timestamp.`,
      },
    ],
  },
]
