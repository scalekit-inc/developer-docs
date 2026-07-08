import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'tactiqmcp_get_generation_status',
    description: `Check whether a previously triggered AI generation (typically a detailed summary started by \`get_meeting\`) has finished.

Use this when \`get_meeting\` returned \`detailedSummary: { status: 'generating', jobId }\`. Poll periodically (a few seconds between calls is appropriate) until status is \`ready\` or \`failed\`.

IMPORTANT: Requires a Tactiq Team plan.
IMPORTANT: \`failed\` is terminal — generation will not produce content; do not keep polling. Re-call \`get_meeting\` to start a fresh attempt.

Returns: \`status\` (\`ready\` | \`generating\` | \`failed\`) and \`content\` when status is \`ready\`.`,
    params: [
      {
        name: 'jobId',
        type: 'string',
        required: true,
        description: `Job ID returned by \`get_meeting\` in \`detailedSummary.jobId\`.`,
      },
      { name: 'meetingId', type: 'string', required: true, description: `Meeting ID.` },
    ],
  },
  {
    name: 'tactiqmcp_get_meeting',
    description: `Fetch a meeting's detailed AI-generated summary, plus the titles and ids of all other AI artifacts on it (action items, email drafts, CSVs, slide decks, and similar).

Use this as the primary way to read meeting content. The detailed summary is the richest single view of a meeting — call this before reaching for individual artifacts.

IMPORTANT: Never returns the full transcript.
IMPORTANT: If the summary doesn't exist yet, generation starts in the background and \`detailedSummary\` is returned as \`{ status: 'generating', jobId }\` instead of content. Poll \`get_generation_status\` with that jobId until status is \`ready\`.
IMPORTANT: Requires a Tactiq Team plan.

Workflow:
1. \`get_meeting\` → read \`detailedSummary.content\` when status is \`ready\`.
2. If you need a specific artifact, pass an id from \`otherArtifacts[]\` to \`get_meeting_artifact\`.
3. If the summary is generating, poll \`get_generation_status({ meetingId, jobId })\`.

Returns: \`id\`, \`title\`, \`createdAt\` (ISO 8601), \`durationSeconds\`, \`attendees[]\`, \`url\`, \`detailedSummary\`, \`otherArtifacts[]\`.`,
    params: [{ name: 'id', type: 'string', required: true, description: `Meeting ID.` }],
  },
  {
    name: 'tactiqmcp_get_meeting_artifact',
    description: `Fetch the full content of a specific AI-generated artifact on a meeting (summaries, action items, email drafts, slide decks, CSVs, and similar).

Use this when \`get_meeting\` or \`list_meeting_artifacts\` has returned an artifact id you want to read, or when the detailed summary from \`get_meeting\` is insufficient and you need a specific artifact type.

IMPORTANT: Never returns the full transcript.
IMPORTANT: \`artifactId\` must come from \`list_meeting_artifacts\` or the \`otherArtifacts[]\` array inside \`get_meeting\` — do not guess or construct ids.
IMPORTANT: Requires a Tactiq Team plan.

Returns: \`id\`, \`title\`, optional \`contentType\` (e.g. \`summary\`, \`email_draft\`, \`csv\`, \`slide_deck\`), \`content\` (rendered text — markdown for summaries/slide decks, RFC 4180 CSV for tabular artifacts, plain-text email body for email drafts).`,
    params: [
      {
        name: 'artifactId',
        type: 'string',
        required: true,
        description: `Artifact ID from \`list_meeting_artifacts\` or \`get_meeting\`'s \`otherArtifacts[]\`.`,
      },
      { name: 'meetingId', type: 'string', required: true, description: `Meeting ID.` },
    ],
  },
  {
    name: 'tactiqmcp_list_meeting_artifacts',
    description: `List all AI-generated artifacts on a meeting — summaries, action items, email drafts, slide decks, CSVs, and similar. Returns titles and ids only, no content.

Use this when you already have a meetingId and want to discover what artifacts exist before fetching one, or when \`get_meeting\` has already been called and you want a lightweight refresh of the artifact list.

Prefer \`get_meeting\` over this tool if you haven't fetched the meeting yet — \`get_meeting\` returns both the summary content AND the artifact list in one call.

Use \`get_meeting_artifact\` with the returned ids to fetch actual artifact content.

IMPORTANT: Requires a Tactiq Team plan.

Returns \`{ artifacts: [...] }\`. Each artifact: \`id\`, \`title\`, optional \`status\` (\`ready\` or \`generating\`).`,
    params: [{ name: 'meetingId', type: 'string', required: true, description: `Meeting ID.` }],
  },
  {
    name: 'tactiqmcp_list_recent_meetings',
    description: `List the user's most recent accessible meetings (owned + shared + team + space), sorted newest first. Returns meeting metadata only — never transcript content.

Use this when the user wants to see recent meetings without specific search criteria (e.g. "show me my latest meetings", "what did I meet about this week"). Use \`search_meetings\` instead when the user names a topic, participant, or date range.

Returns \`{ results: [...] }\`. Each result: \`id\`, \`title\`, \`createdAt\` (ISO 8601), \`durationSeconds\`, \`attendees[]\`, \`url\`. Use the \`id\` to fetch full content via \`get_meeting\` or \`get_meeting_artifact\`.`,
    params: [
      {
        name: 'archived',
        type: 'boolean',
        required: false,
        description: `When true, include archived meetings.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return (max 50).`,
      },
    ],
  },
  {
    name: 'tactiqmcp_search_meetings',
    description: `Search the user's accessible meetings (owned + shared + team + space) by topic, participants, or date range. Returns meeting metadata only — never transcript content.

Use this when the user references one of:
- a topic or subject matter → set \`query\` (e.g. "find meetings about Netflix" → query: "Netflix")
- a person who joined → set \`participants\` (e.g. "meetings with David" → participants: ["David"], query left empty)
- a time window → set \`dateFrom\` / \`dateTo\`

These can be combined. Use \`list_recent_meetings\` instead if no search criteria are provided.

IMPORTANT: Supply at least one of \`query\` / \`participants\` / \`dateFrom\` / \`dateTo\`.
IMPORTANT: Do NOT put a participant's name in \`query\` — use \`participants\` for people.
IMPORTANT: Do NOT include the current authenticated user in \`participants\`.

\`participantsMatch\` modes: ANY (default) = at least one listed participant joined; ALL = every listed participant joined; NONE = none of them joined.

Returns \`{ results: [...] }\`. Each result: \`id\`, \`title\`, \`createdAt\` (ISO 8601), \`durationSeconds\`, \`attendees[]\`, \`url\`, optional \`snippet\`.`,
    params: [
      {
        name: 'dateFrom',
        type: 'string',
        required: false,
        description: `ISO 8601 lower bound on the meeting created date (inclusive).`,
      },
      {
        name: 'dateTo',
        type: 'string',
        required: false,
        description: `ISO 8601 upper bound on the meeting created date (inclusive).`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return (max 50).`,
      },
      {
        name: 'participants',
        type: 'array',
        required: false,
        description: `Names or emails of OTHER people who joined the meeting. Do NOT include the current authenticated user.`,
      },
      {
        name: 'participantsMatch',
        type: 'string',
        required: false,
        description: `How participants are matched. ANY (default) = at least one joined. ALL = every listed participant joined. NONE = none of them joined.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Free-text keywords to match against meeting title, notes, and AI outputs. Use for topics and subject matter, NOT for participant names.`,
      },
    ],
  },
]
