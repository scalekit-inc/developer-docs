import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'circlebackmcp_finddomains',
    description: `Find company domains matching the given search terms. The data returned will be an array of domain strings representing companies accessible through meetings.`,
    params: [
      {
        name: 'searchTerms',
        type: 'array',
        required: true,
        description: `Array of search terms to find matching company domains.`,
      },
    ],
  },
  {
    name: 'circlebackmcp_findprofiles',
    description: `Find profiles matching the given names. The data returned will be an array of objects representing each of the matching profiles.`,
    params: [
      {
        name: 'searchTerms',
        type: 'array',
        required: true,
        description: `Array of people's names to find matching profiles.`,
      },
    ],
  },
  {
    name: 'circlebackmcp_gettranscriptsformeetings',
    description: `Get the full transcripts for given meeting IDs. Use string IDs like Vd6Pz_kWqLm3xY-c8RhTn. The data returned will be an array of objects, each representing a full transcript for a meeting. Each transcript object will contain the meetingId, meetingName, and an array of transcript segments. Each segment is formatted with timestamps like: {startTimestamp: 123.45, endTimestamp: 128.00, speaker: 'John Doe', words: 'This is a test.'}. This should be used to get detailed transcript information for one or many meetings at once.`,
    params: [
      {
        name: 'intent',
        type: 'string',
        required: true,
        description: `The reason why this tool call is being done.`,
      },
      {
        name: 'meetingIds',
        type: 'array',
        required: true,
        description: `Array of meeting IDs to fetch, like aB3dEf6hIj9kLm2pQr5tV.`,
      },
    ],
  },
  {
    name: 'circlebackmcp_listtags',
    description: `List all tags available in the user's workspace. Returns an array of tag objects with their IDs and names. Use this to discover available tags before filtering meetings, transcripts, or action items by tag.`,
    params: [
      {
        name: 'intent',
        type: 'string',
        required: true,
        description: `The reason why this tool call is being done.`,
      },
    ],
  },
  {
    name: 'circlebackmcp_readmeetings',
    description: `Given up to 50 meeting IDs, fetch detailed information for each meeting. Use string IDs like Vd6Pz_kWqLm3xY-c8RhTn. The data returned will be an array of objects, with each containing the meeting ID, name, notes, attendees, action items, AI-generated insights, creator, tags, status, duration, and creation date.`,
    params: [
      {
        name: 'intent',
        type: 'string',
        required: true,
        description: `The reason why this tool call is being done.`,
      },
      {
        name: 'meetingIds',
        type: 'array',
        required: true,
        description: `Array of meeting IDs to fetch, like aB3dEf6hIj9kLm2pQr5tV.`,
      },
    ],
  },
  {
    name: 'circlebackmcp_searchactionitems',
    description: `Find action items that match a given search term or filter. Returns action items with their title, description, status, assignee, and related meeting details. By default, only action items assigned to the user are returned. To find action items assigned to someone else, use FindProfiles to resolve their name to a profile ID and pass it as assigneeProfileId. Action items can be filtered by search terms, status (PENDING or DONE), tags, and meeting date range (startDate/endDate). Only 25 action items are returned per page, so this function may need to be called multiple times if there are more than that many results.`,
    params: [
      {
        name: 'intent',
        type: 'string',
        required: true,
        description: `The reason why this tool call is being done.`,
      },
      {
        name: 'pageIndex',
        type: 'number',
        required: true,
        description: `The page index to fetch. Always start with page 0.`,
      },
      {
        name: 'assigneeProfileId',
        type: 'number',
        required: false,
        description: `Optional profile ID to filter action items by assignee. Use FindProfiles to resolve a name to a profile ID. Always set this when the user mentions a specific person, including themselves. When omitted, only action items assigned to the user are returned.`,
      },
      {
        name: 'endDate',
        type: 'string',
        required: false,
        description: `Optional ISO date string (yyyy-MM-dd) for latest date.`,
      },
      {
        name: 'searchTerms',
        type: 'array',
        required: false,
        description: `Optional array of search terms to find action items by title or description.`,
      },
      {
        name: 'startDate',
        type: 'string',
        required: false,
        description: `Optional ISO date string (yyyy-MM-dd) for earliest date.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Optional filter by action item status.`,
      },
      {
        name: 'tags',
        type: 'array',
        required: false,
        description: `Optional array of tag IDs to filter by.`,
      },
    ],
  },
  {
    name: 'circlebackmcp_searchcalendarevents',
    description: `Get calendar events from the user's connected calendars. When searching for calendar events, the tool will extract relevant excerpts based on the intent instead of returning the entire data. Each calendar event excerpt includes comprehensive details: event title, date (in the user's timezone), organizer email, attendees (with names, emails, and status), calendar description (if present), meeting platform (Zoom, Google Meet, Microsoft Teams, etc.), meeting platform link, whether it's a recurring event, Circleback join status, and any associated meeting data from Circleback (meeting ID, status, tag IDs, user notes). You can filter events by providing a date range using startDate and endDate parameters. This is useful for finding upcoming meetings, scheduled calls, or calendar events that the user has. Note: This should be primarily used for searching calendar events happening in the future. Past calendar events have a meeting record if they were captured with Circleback. Only 50 calendar events are returned per page, so this function may need to be called multiple times if there are more than that many results.`,
    params: [
      {
        name: 'intent',
        type: 'string',
        required: true,
        description: `The reason why this tool call is being done.`,
      },
      {
        name: 'pageIndex',
        type: 'number',
        required: true,
        description: `The page index to fetch. Always start with page 0.`,
      },
      {
        name: 'endDate',
        type: 'string',
        required: false,
        description: `Optional ISO date string (yyyy-MM-dd) for latest date to include results from.`,
      },
      {
        name: 'startDate',
        type: 'string',
        required: false,
        description: `Optional ISO date string (yyyy-MM-dd) for earliest date to include results from.`,
      },
    ],
  },
  {
    name: 'circlebackmcp_searchemails',
    description: `Search the user's connected email accounts for email threads matching a query. This should be used when the user asks questions about their emails or needs to find specific email conversations. This function queries across all connected email services and retrieves up to 20 matching email threads per service per page. The data returned will be an array of objects, with each containing the email thread ID, subject line, and relevant excerpts. Each email thread object includes metadata such as the sender email, received date, and the fromEmailAddress of the connected account the thread belongs to (if available). Only 20 email threads are returned per page, so this function may need to be called multiple times if there are more than that many results.`,
    params: [
      {
        name: 'intent',
        type: 'string',
        required: true,
        description: `The reason why this tool call is being done.`,
      },
      {
        name: 'searchTerm',
        type: 'string',
        required: true,
        description: `A query string to find relevant email threads. Supports search terms and the following filters: from:email (sender address) or from:me (will search for emails sent by the user), to:email (recipient address), participant:email (matches from OR to), before:date (latest date, yyyy-MM-dd format), after:date (earliest date, yyyy-MM-dd format). Examples: 'Meeting participant:ali@gmail.com', 'Q4 report participant:team@company.com', 'project update to:sarah@company.com after:2025-04-19'`,
      },
      {
        name: 'pageIndex',
        type: 'number',
        required: false,
        description: `The page index to fetch. Always start with page 0.`,
      },
    ],
  },
  {
    name: 'circlebackmcp_searchmeetings',
    description: `Find meetings that match a given search term or filter.

      Searches can be done by direct match on the meeting name or notes.
      Search term is a direct match ignoring case, prefer to search for a single word or phrase if provided.
      Searches can also be performed for tags or related profiles (attendees of the meetings).
      When searching for a meeting, the tool will find the appropriate meeting and extract the relevant source excerpt based on the intent instead of returning the entire data.
      NOTE: A search term is not explicitly required, for example if you want to find all meetings with a specific tag in a date range, only include those and don't pass a searchTerm.
      To restrict the search further, you can provide a start and end date. This will significantly improve performance.
      The data returned will be an an array of objects, with each containing meeting data.
      Only 20 meetings are returned per page, so this function may need to be called multiple times if there are more than that many results.
      If 20 meetings are returned, call this function again with the next pageIndex to ensure you get all results.
      IMPORTANT: The pageIndex is only valid for the exact same search parameters (aside from pageIndex).
      For example, if you provide a start / end date to fetch page 0, then you must provide the EXACT SAME start / end dates to fetch page 1.`,
    params: [
      {
        name: 'intent',
        type: 'string',
        required: true,
        description: `The reason why this tool call is being done.`,
      },
      {
        name: 'pageIndex',
        type: 'number',
        required: true,
        description: `The page index to fetch. Always start with page 0.`,
      },
      {
        name: 'domains',
        type: 'array',
        required: false,
        description: `Optional array of domains to filter by.`,
      },
      {
        name: 'endDate',
        type: 'string',
        required: false,
        description: `Optional ISO date string (yyyy-MM-dd) for latest date.`,
      },
      {
        name: 'profiles',
        type: 'array',
        required: false,
        description: `Optional array of profile IDs to filter by.`,
      },
      {
        name: 'searchTerm',
        type: 'string',
        required: false,
        description: `Optional search term to find related meetings.`,
      },
      {
        name: 'startDate',
        type: 'string',
        required: false,
        description: `Optional ISO date string (yyyy-MM-dd) for earliest date.`,
      },
      {
        name: 'tags',
        type: 'array',
        required: false,
        description: `Optional array of tag IDs to filter by.`,
      },
    ],
  },
  {
    name: 'circlebackmcp_searchsupportarticles',
    description: `Search for support articles about Circleback to find relevant documentation and help content.`,
    params: [
      {
        name: 'searchTerm',
        type: 'string',
        required: true,
        description: `The search term or query to find relevant support articles about Circleback. This is typically the user's question or keywords related to their issue.`,
      },
    ],
  },
  {
    name: 'circlebackmcp_searchtranscripts',
    description: `Search meeting transcripts to find transcript chunks that match a given search term. If the user's question requires searching for multiple distinct search terms, you should call this function multiple times. The data returned will be an array of objects, with each containing the meeting ID, name, creator user ID, when it was created, the chunk matching the search term, and the start and end timestamps of the matching chunk. Search results can be further filtered by including tags, profiles (attendees), or domains. This function is useful to find relevant meetings where a search term was mentioned. We can find more details about those meetings using the ReadMeetings tool.`,
    params: [
      {
        name: 'intent',
        type: 'string',
        required: true,
        description: `The reason why this tool call is being done.`,
      },
      {
        name: 'searchTerm',
        type: 'string',
        required: true,
        description: `The search term to find relevant transcript chunks.`,
      },
      {
        name: 'domains',
        type: 'array',
        required: false,
        description: `Optional array of domains to filter by.`,
      },
      {
        name: 'profiles',
        type: 'array',
        required: false,
        description: `Optional array of profile IDs to filter by.`,
      },
      {
        name: 'tags',
        type: 'array',
        required: false,
        description: `Optional array of tag IDs to filter by.`,
      },
    ],
  },
]
