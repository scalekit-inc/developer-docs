import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'weflow_recording_clips_list',
    description: `List saved clips created from a recording.
Returns each clip's id, title, start/end time, and creator.
Use weflow_recording_clips_list to see the highlighted moments saved from a recording.
Requires a recording id from weflow_recordings_list.`,
    params: [
      {
        name: 'uid',
        type: 'string',
        required: true,
        description: `The recording's UUID or numeric id, from weflow_recordings_list.`,
      },
    ],
  },
  {
    name: 'weflow_recording_comments_list',
    description: `List threaded comments on a recording, with replies nested under their parent comment.
Returns each comment's author, text, timestamp, and nested replies.
Use weflow_recording_comments_list to read discussion left on a recording.
Requires a recording id from weflow_recordings_list.`,
    params: [
      {
        name: 'uid',
        type: 'string',
        required: true,
        description: `The recording's UUID or numeric id, from weflow_recordings_list.`,
      },
    ],
  },
  {
    name: 'weflow_recording_get',
    description: `Get full metadata for a single recording by id.
Returns the recording's title, dates, duration, participants, and any Salesforce records linked to it.
Use weflow_recording_get once you have a recording id from weflow_recordings_list.`,
    params: [
      {
        name: 'uid',
        type: 'string',
        required: true,
        description: `The recording's UUID or numeric id, from weflow_recordings_list.`,
      },
    ],
  },
  {
    name: 'weflow_recording_interaction_metrics_list',
    description: `List per-participant conversation analytics for a recording, such as talk ratio, longest monologue, and questions asked per hour.
Returns one interaction-metrics object per participant.
Use weflow_recording_interaction_metrics_list to analyze how a conversation was balanced between participants.
Requires a recording id from weflow_recordings_list.`,
    params: [
      {
        name: 'uid',
        type: 'string',
        required: true,
        description: `The recording's UUID or numeric id, from weflow_recordings_list.`,
      },
    ],
  },
  {
    name: 'weflow_recording_scorecards_list',
    description: `List cached coaching scorecards for a recording, one per scoring template that has been run against it.
Returns each scorecard's template, criteria scores, and overall result.
Use weflow_recording_scorecards_list to review how a call was scored for coaching purposes.
Requires a recording id from weflow_recordings_list.`,
    params: [
      {
        name: 'uid',
        type: 'string',
        required: true,
        description: `The recording's UUID or numeric id, from weflow_recordings_list.`,
      },
    ],
  },
  {
    name: 'weflow_recording_summary_get',
    description: `Get the AI-generated summary of a recording for a given summary template.
Returns the generated summary text for the recording.
Use weflow_recording_summary_get after picking a template with weflow_summary_templates_list, or omit the template to use the company's default.
Requires a recording id from weflow_recordings_list.`,
    params: [
      {
        name: 'uid',
        type: 'string',
        required: true,
        description: `The recording's UUID or numeric id, from weflow_recordings_list.`,
      },
      {
        name: 'templateId',
        type: 'string',
        required: false,
        description: `UUID of the summary template to use, from weflow_summary_templates_list. If omitted, the company's default summary template is used.`,
      },
    ],
  },
  {
    name: 'weflow_recording_trackers_list',
    description: `List trackers that matched on a recording, with each tracker's matched phrases.
Returns each tracker's name and the phrase matches found in the conversation.
Use weflow_recording_trackers_list to see which tracked keywords or topics came up in a call.
Requires a recording id from weflow_recordings_list.`,
    params: [
      {
        name: 'uid',
        type: 'string',
        required: true,
        description: `The recording's UUID or numeric id, from weflow_recordings_list.`,
      },
    ],
  },
  {
    name: 'weflow_recording_transcript_get',
    description: `Get the full transcript of a recording, grouped by speaker with per-word timestamps.
Returns an array of transcript segments, or an empty array if transcription never produced output.
Use weflow_recording_transcript_get to read or search what was said in a recording.
Requires a recording id from weflow_recordings_list.`,
    params: [
      {
        name: 'uid',
        type: 'string',
        required: true,
        description: `The recording's UUID or numeric id, from weflow_recordings_list.`,
      },
    ],
  },
  {
    name: 'weflow_recording_video_get',
    description: `Get pre-signed URLs to stream or download a recording's video.
Returns a stream URL, a download URL, and their expiration timestamp — the URLs expire after 1 hour.
Use weflow_recording_video_get to access the video itself; use weflow_recording_get for the recording's metadata.
Requires a recording id from weflow_recordings_list.`,
    params: [
      {
        name: 'uid',
        type: 'string',
        required: true,
        description: `The recording's UUID or numeric id, from weflow_recordings_list.`,
      },
    ],
  },
  {
    name: 'weflow_recordings_list',
    description: `List call and meeting recordings for the company, newest first.
Returns a page of recordings (id, title, dates, participants, Salesforce links) plus a nextCursor and hasMore flag for pagination.
Use weflow_recordings_list to browse or filter recordings; use weflow_recording_get for one recording's full metadata by id.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response's nextCursor field, used to fetch the next page. Leave unset for the first page.`,
      },
      {
        name: 'endDate',
        type: 'string',
        required: false,
        description: `Only return recordings that occurred on or before this date, as an ISO 8601 datetime.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of recordings to return per page, from 1 to 100. Defaults to 20.`,
      },
      {
        name: 'sfEventId',
        type: 'string',
        required: false,
        description: `Only return the recording linked to this Salesforce event id. Returns an empty list if no recording matches.`,
      },
      {
        name: 'startDate',
        type: 'string',
        required: false,
        description: `Only return recordings that occurred on or after this date, as an ISO 8601 datetime.`,
      },
    ],
  },
  {
    name: 'weflow_summary_templates_list',
    description: `List the AI summary templates available for the company.
Returns each template's id and name.
Use weflow_summary_templates_list to find a template id to pass to weflow_recording_summary_get.`,
    params: [],
  },
]
