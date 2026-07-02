import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'jammcp_analyzevideo',
    description: `Extract user intents from a Jam recording. Identifies distinct user goals, issues, and feedback with detailed context including visual observations, interactions, and technical indicators.`,
    params: [
      { name: 'jamId', type: 'string', required: true, description: `Jam identifier — a UUID or a jam.dev URL` },
    ],
  },
  {
    name: 'jammcp_createcomment',
    description: `Add a new comment to a Jam bug report. The comment body supports Markdown formatting. Use this to add notes, analysis results, or follow-up information to a Jam.`,
    params: [
      { name: 'body', type: 'string', required: true, description: `The comment body in Markdown format` },
      { name: 'jamId', type: 'string', required: true, description: `Jam identifier — a UUID or a jam.dev URL` },
      { name: 'playbackRelativeTimestamp', type: 'number', required: false, description: `Optional timestamp in milliseconds relative to the start of the media playback. When provided, the comment will be linked to that specific point in the video/replay.` },
    ],
  },
  {
    name: 'jammcp_fetch',
    description: `Retrieve metadata and details for a specific Jam bug report, including author, description, timestamps, type, and metadata.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `Jam identifier — a UUID or a jam.dev URL` },
    ],
  },
  {
    name: 'jammcp_getconsolelogs',
    description: `Retrieve browser console output captured during the Jam session, including errors, warnings, info messages, and debug logs.`,
    params: [
      { name: 'jamId', type: 'string', required: true, description: `Jam identifier — a UUID or a jam.dev URL` },
      { name: 'limit', type: 'number', required: false, description: `Maximum number of events to return` },
      { name: 'logLevel', type: 'string', required: false, description: `Optional filter to limit logs to a specific log level (error, warn, info, log, debug)` },
    ],
  },
  {
    name: 'jammcp_getdetails',
    description: `Retrieve metadata and details for a specific Jam bug report, including author, description, timestamps, type, and metadata.`,
    params: [
      { name: 'jamId', type: 'string', required: true, description: `Jam identifier — a UUID or a jam.dev URL` },
    ],
  },
  {
    name: 'jammcp_getmetadata',
    description: `Retrieve custom metadata set via the jam.metadata() SDK. Returns key-value pairs defined by the application developer, such as user IDs, app versions, feature flags, or any custom debugging context.`,
    params: [
      { name: 'jamId', type: 'string', required: true, description: `Jam identifier — a UUID or a jam.dev URL` },
    ],
  },
  {
    name: 'jammcp_getnetworkrequests',
    description: `Retrieve network requests captured during the Jam session, including URLs, methods, status codes, headers, and response times.`,
    params: [
      { name: 'jamId', type: 'string', required: true, description: `Jam identifier — a UUID or a jam.dev URL` },
      { name: 'contentType', type: 'string', required: false, description: `Filter by content type (e.g., 'application/json')` },
      { name: 'host', type: 'string', required: false, description: `Filter by host (e.g., 'api.example.com')` },
      { name: 'limit', type: 'number', required: false, description: `Maximum number of events to return` },
      { name: 'method', type: 'string', required: false, description: `Filter by HTTP method (e.g., 'GET', 'POST', 'PUT', 'DELETE')` },
      { name: 'statusCode', type: 'number', required: false, description: `Filter by HTTP status code (e.g., 500) or range (e.g., '4xx', '5xx')` },
    ],
  },
  {
    name: 'jammcp_getscreenshots',
    description: `Retrieve screenshots from screenshot-type Jams. Use getDetails first to verify the Jam type before calling this tool.`,
    params: [
      { name: 'jamId', type: 'string', required: true, description: `Jam identifier — a UUID or a jam.dev URL` },
    ],
  },
  {
    name: 'jammcp_getuserevents',
    description: `Retrieve the timeline of user interactions captured in the Jam, including clicks, inputs, navigation, and scroll events.`,
    params: [
      { name: 'jamId', type: 'string', required: true, description: `Jam identifier — a UUID or a jam.dev URL` },
    ],
  },
  {
    name: 'jammcp_getvideotranscript',
    description: `Retrieve the speech transcript (captions) from a video Jam recording in WebVTT format with timestamps. Only available for video Jams where the microphone was enabled during recording. Use this to understand what the user said while recording the bug report.`,
    params: [
      { name: 'jamId', type: 'string', required: true, description: `Jam identifier — a UUID or a jam.dev URL` },
    ],
  },
  {
    name: 'jammcp_listfolders',
    description: `List folders in the team with optional search and pagination. Returns folder metadata including name, short ID, Jam count, and timestamps. Use this to discover available folders for organizing Jams.`,
    params: [
      { name: 'after', type: 'string', required: false, description: `Cursor for forward pagination (folder ID)` },
      { name: 'limit', type: 'number', required: false, description: `Maximum number of results to return` },
      { name: 'orderBy', type: 'string', required: false, description: `Sort order field` },
      { name: 'query', type: 'string', required: false, description: `Search query to filter folders by name` },
    ],
  },
  {
    name: 'jammcp_listjams',
    description: `List Jam bug reports with filtering and pagination. Search by text, filter by type (video/screenshot/replay), folder, author, URL, or creation date. Returns Jam metadata including title, author, folder, and timestamps. Use this to find specific Jams or browse the team's bug reports.`,
    params: [
      { name: 'after', type: 'string', required: false, description: `Cursor for forward pagination (Jam ID)` },
      { name: 'author', type: 'string', required: false, description: `Author filter: "me", user name, email, or user ID` },
      { name: 'createdAt', type: 'string', required: false, description: `Filter by creation date: ISO date string or ISO 8601 duration (e.g., "-P7D" for last 7 days)` },
      { name: 'folder', type: 'string', required: false, description: `Folder filter: folder name, folder ID, folder short ID, or "root" for unfiled Jams` },
      { name: 'limit', type: 'number', required: false, description: `Maximum number of results to return` },
      { name: 'orderBy', type: 'string', required: false, description: `Sort order field` },
      { name: 'query', type: 'string', required: false, description: `Text search query to filter Jams by title or description` },
      { name: 'type', type: 'string', required: false, description: `Filter by Jam type` },
      { name: 'url', type: 'string', required: false, description: `Filter by original page URL (partial match, case-insensitive)` },
    ],
  },
  {
    name: 'jammcp_listmembers',
    description: `List team members with optional search and pagination. Returns user metadata including name, email, and role. Use this to find users for filtering Jams by author.`,
    params: [
      { name: 'after', type: 'string', required: false, description: `Cursor for forward pagination (user ID)` },
      { name: 'limit', type: 'number', required: false, description: `Maximum number of results to return` },
      { name: 'query', type: 'string', required: false, description: `Search query to filter users by name or email` },
    ],
  },
  {
    name: 'jammcp_search',
    description: `Search for a Jam by extracting a UUID from a query string, jam.dev URL, or pasted text and returning matching Jam metadata.`,
    params: [
      { name: 'query', type: 'string', required: true, description: `Search string containing a UUID or a jam.dev URL (e.g., https://jam.dev/c/{uuid})` },
    ],
  },
  {
    name: 'jammcp_updatejam',
    description: `Update a Jam bug report. Currently supports moving Jams between folders. Use folder name, folder ID, folder short ID, or "root" to move to the root level.`,
    params: [
      { name: 'jamId', type: 'string', required: true, description: `Jam identifier — a UUID or a jam.dev URL` },
      { name: 'folder', type: 'string', required: false, description: `Target folder: folder name, folder ID, folder short ID, or "root" to move to root level` },
    ],
  },
]
