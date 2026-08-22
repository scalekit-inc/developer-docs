import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'tactiqmcp_expand_transcript_excerpt',
    description: `Read the conversation immediately around an excerpt returned by get_transcript_excerpts — the question it answered, the reply it drew. Use it when an excerpt reads as one side of an exchange, or when a name or number in it looks garbled and the surrounding words would settle it.

IMPORTANT: Takes the \`excerptId\` of an excerpt from a recent get_transcript_excerpts call. References stop working after about an hour; when one does, search again and expand one of the fresh excerpts.
IMPORTANT: Returns a short fixed window around the excerpt. Expanding the same excerpt again returns the same window, so to read further use get_transcript_excerpts with a more specific question.
IMPORTANT: Rate limited: transcript excerpts can be read for at most 100 different meetings per hour per user; meetings already read in the window don't count again.
IMPORTANT: Requires a Tactiq Team plan.

Returns: \`entries[]\` (each: \`text\`, \`speaker\`, \`startSeconds\`, \`endSeconds\`, \`isExcerpt\`) in speaking order, and \`url\` which opens the transcript at the excerpt.`,
    params: [
      {
        name: 'excerptId',
        type: 'string',
        required: true,
        description: `The excerptId of an excerpt from get_transcript_excerpts.`,
      },
    ],
  },
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
    name: 'tactiqmcp_get_transcript',
    description: `Read a meeting's full transcript, one page at a time, in speaking order with speaker names and timestamps.

Prefer get_transcript_excerpts when you are looking for specific moments, quotes, or topics — it is faster and more precise. Use this pager only when you genuinely need the complete text (e.g. a full translation or rewrite).

IMPORTANT: The transcript is returned in fixed pages. Start at page 1; \`totalPages\` tells you how many pages exist, and the same page number always returns the same content for a given meeting.
IMPORTANT: Rate limited: full transcripts can be read for at most 10 different meetings per hour per user; meetings already read in the window don't count again.
IMPORTANT: Requires a Tactiq Team plan.
IMPORTANT: This tool requires the Tactiq connection to have been authorized with transcript access. If it returns an upgrade/permission message, disconnect and reconnect Tactiq and approve the "Read meeting details, summaries, transcript excerpts and full transcripts" permission on the consent screen.

Returns: \`page\`, \`totalPages\`, \`totalChars\` (size of the whole transcript in characters), \`hasMore\`, \`entries[]\` (each: \`text\`, \`speaker\`, \`startSeconds\`, \`endSeconds\`), \`url\`. Cite \`url\` when you relay this content — it lets the user open the meeting to verify what was said.`,
    params: [
      { name: 'meetingId', type: 'string', required: true, description: `Meeting ID.` },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number to read, starting at 1. Defaults to 1.`,
      },
    ],
  },
  {
    name: 'tactiqmcp_get_transcript_excerpts',
    description: `Find the verbatim transcript excerpts of a meeting that are relevant to a question — what exactly was said, by whom, and when.

Prefer this over get_transcript whenever you are looking for specific moments, quotes, decisions, or topics; fetch the full transcript only when you genuinely need the entire text.

IMPORTANT: Returns at most 10 short excerpts per call. Each excerpt is a single moment; when one reads as half of an exchange, pass its \`excerptId\` to expand_transcript_excerpt to see what was said around it.
IMPORTANT: \`hasMore\` tells you whether relevant excerpts were left out — when it is true, call again with a more specific question rather than assuming this is everything.
IMPORTANT: An empty \`excerpts\` list means nothing matched the question's wording — NOT that the topic is absent from the meeting. Transcripts contain speech-recognition errors and people rarely speak in the question's exact terms, so rephrase (synonyms, related terms, a broader topic) and try again before concluding something was never discussed.
IMPORTANT: Rate limited: transcript excerpts can be read for at most 100 different meetings per hour per user; meetings already read in the window don't count again.
IMPORTANT: Requires a Tactiq Team plan.

Returns: \`excerpts[]\` (each: \`text\`, \`speaker\`, \`excerptId\`, \`startSeconds\`, \`endSeconds\`, \`url\`), ordered most relevant first; \`hasMore\`; and \`searchedWholeMeeting\`. An empty list means nothing matched this wording — rephrase and retry before concluding the topic is absent. Each \`url\` opens the transcript at that excerpt — link to it when you quote or reference the excerpt.`,
    params: [
      { name: 'meetingId', type: 'string', required: true, description: `Meeting ID.` },
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `The question or topic to find transcript excerpts for, e.g. "what did they agree about pricing". At most 500 characters.`,
      },
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
