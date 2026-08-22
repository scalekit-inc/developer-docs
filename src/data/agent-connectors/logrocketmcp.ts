import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'logrocketmcp_build_metric',
    description: `Use this to query LogRocket analytics data. This tool translates your natural language query into a LogRocket metric (e.g., timeseries, table, conversion funnel) that is then used to find relevant data. It's best used for performing aggregate analysis (e.g., session totals over time, browser or country breakdowns, conversion rates between steps). Returns an object with a \`metricDefinition\` field indicating the LogRocket metric that was used to find the data and a \`metricQueryResult\` field containing the corresponding analytics data.`,
    params: [
      {
        name: 'organizationID',
        type: 'string',
        required: true,
        description: `The organization ID to run the query against. If not provided by the user, discover options using the list_organizations tool.`,
      },
      {
        name: 'projectID',
        type: 'string',
        required: true,
        description: `The project ID to run the query against. If not provided by the user, discover options using the list_projects tool.`,
      },
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Natural language query describing the analytics data you want to retrieve.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of rows/buckets returned in metricQueryResult for top-N or table-style metrics (e.g., top countries, top pages, top users). Defaults to 20. This does not control sessionDefinitions and may be ignored for metric types that do not return ranked row buckets.`,
      },
      {
        name: 'timezone',
        type: 'string',
        required: false,
        description: `Optional IANA timezone (e.g., 'America/New_York'). Time buckets align to this timezone's calendar (e.g., daily buckets break at its midnight). When omitted, they align to UTC.`,
      },
    ],
  },
  {
    name: 'logrocketmcp_find_issues',
    description: `Use this to list a LogRocket project's issues. This includes error signals detected in session recordings, specifically JavaScript exceptions, network errors, rage clicks, dead clicks, frustrating network requests, error states, and mobile crash reports. Issues can be filtered by severity, triage status, issue type, and time range, and optionally refined with a natural language query. Returns an object with an \`issues\` field listing matching issues, each with its issue type, platform, event count, first/last seen dates, \`triageStatus\`, a \`url\` linking to the issue's detail page in the LogRocket dashboard, and an AI-generated \`issueDescription\` when one exists.`,
    params: [
      {
        name: 'organizationID',
        type: 'string',
        required: true,
        description: `The organization ID to run the query against. If not provided by the user, discover options using the list_organizations tool.`,
      },
      {
        name: 'projectID',
        type: 'string',
        required: true,
        description: `The project ID to run the query against. If not provided by the user, discover options using the list_projects tool.`,
      },
      {
        name: 'endDate',
        type: 'string',
        required: false,
        description: `Optional ISO 8601 datetime for the end of the time range to search. Defaults to now.`,
      },
      {
        name: 'issueTypes',
        type: 'array',
        required: false,
        description: `Optional list of issue types to include. "exception" covers JavaScript exceptions and mobile errors, "networkError" failed network requests, "mobileCrash" mobile app crash reports, "rageClick" repeated frustrated clicks, "deadClick" clicks with no visible effect, "frustratingNetworkRequest" impatient user actions during slow requests, and "errorState" error pages and modals users encounter. Defaults to all issue types.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of issues to fetch, applied before any natural language relevance filtering. Defaults to 30.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Optional natural language query used to refine results (e.g., "checkout errors affecting Chrome users"). When provided, additional filters are parsed from the query and results are filtered to those relevant to it. Omit to list issues using only the structured parameters.`,
      },
      {
        name: 'severity',
        type: 'string',
        required: false,
        description: `Optional severity filter. "severe" returns only issues where LogRocket detected significant user impact and generated an issue description; "notSevere" returns only issues without one; "any" returns both. Defaults to "severe".`,
      },
      {
        name: 'startDate',
        type: 'string',
        required: false,
        description: `Optional ISO 8601 datetime for the start of the time range to search. Defaults to a lookback of one week. Issues data is only retained for 30 days: start dates older than that are clamped to 30 days ago, and time ranges ending more than 30 days ago return no issues.`,
      },
      {
        name: 'triageStatuses',
        type: 'array',
        required: false,
        description: `Optional list of triage statuses to include. Issues start as "untriaged" and can be triaged by users to "highImpact", "lowImpact", or "ignored". Defaults to ["untriaged"], matching the default dashboard issues view.`,
      },
    ],
  },
  {
    name: 'logrocketmcp_find_sessions',
    description: `Use this to find LogRocket sessions matching a natural language query. This tool translates your natural language query into LogRocket filters that are then used to find relevant sessions. It's best used for filtering sessions based on user ID or email, custom user traits, visited page or URL, custom events, text inputs, clicked on text or CSS selector, network errors, IP address, user location (e.g., country), and/or other basic metadata, in addition to over a specific date range (e.g., last week). Returns an object with a list of relevant sessions in the \`sessionDefinitions\` field, each with recording ID, session ID, session URL, date of recording as a Unix timestamp in milliseconds, and other basic metadata. The returned object will also include a \`metricDefinition\` field indicating which LogRocket filters were used to find the sessions.`,
    params: [
      {
        name: 'organizationID',
        type: 'string',
        required: true,
        description: `The organization ID to run the query against. If not provided by the user, discover options using the list_organizations tool.`,
      },
      {
        name: 'projectID',
        type: 'string',
        required: true,
        description: `The project ID to run the query against. If not provided by the user, discover options using the list_projects tool.`,
      },
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Natural language query describing the sessions you want to find.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of sessions to return. Defaults to 10.`,
      },
    ],
  },
  {
    name: 'logrocketmcp_get_network_entries',
    description: `Use this to retrieve raw network request and response pairs recorded during a single LogRocket session, identified by its recording ID and session ID, as a HAR 1.2 document. Prefer this tool over watch_sessions when you only need network data. The response is an object with \`total\`, \`offset\`, \`limit\`, and \`har\`; entries are sorted by request start time and paginated, so if \`offset + limit < total\`, call the tool again with a higher offset to fetch the next page.`,
    params: [
      {
        name: 'organizationID',
        type: 'string',
        required: true,
        description: `The organization ID to run the query against. If not provided by the user, discover options using the list_organizations tool.`,
      },
      {
        name: 'projectID',
        type: 'string',
        required: true,
        description: `The project ID to run the query against. If not provided by the user, discover options using the list_projects tool.`,
      },
      {
        name: 'recordingID',
        type: 'string',
        required: true,
        description: `The recording ID of the session.`,
      },
      {
        name: 'sessionID',
        type: 'integer',
        required: true,
        description: `The session ID of the session. Provide this as an integer.`,
      },
      {
        name: 'endTime',
        type: 'string',
        required: false,
        description: `Optional ISO 8601 datetime. Only entries whose request started at or before this time are returned. Defaults to the end of the session.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of entries to return per call. Defaults to 100.`,
      },
      {
        name: 'maxStatus',
        type: 'integer',
        required: false,
        description: `Optional inclusive upper bound on the response status code.`,
      },
      {
        name: 'methods',
        type: 'array',
        required: false,
        description: `Optional list of HTTP methods (e.g., ["POST", "PUT"]). Only entries whose request used one of these methods are returned. Matching is case-insensitive.`,
      },
      {
        name: 'minStatus',
        type: 'integer',
        required: false,
        description: `Optional inclusive lower bound on the response status code. Combine with maxStatus to select a range (e.g., 500 and 599 for server errors) or use both with the same value to select one code (e.g., 404).`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of matching entries to skip, for pagination. Defaults to 0.`,
      },
      {
        name: 'startTime',
        type: 'string',
        required: false,
        description: `Optional ISO 8601 datetime. Only entries whose request started at or after this time are returned. Defaults to the start of the session.`,
      },
      {
        name: 'urlFilter',
        type: 'string',
        required: false,
        description: `Optional case-insensitive substring filter applied to request URLs (e.g., "/api/cart" or "subdomain.example.com"). Only entries whose URL contains this substring are returned.`,
      },
    ],
  },
  {
    name: 'logrocketmcp_list_organizations',
    description: `List all LogRocket organizations the authenticated user has access to. Use this first to discover available organizations before querying projects or sessions.`,
    params: [],
  },
  {
    name: 'logrocketmcp_list_projects',
    description: `List all projects within a LogRocket organization. Use this to identify accessible projects before querying sessions, metrics, or issues.`,
    params: [
      {
        name: 'organizationSlug',
        type: 'string',
        required: true,
        description: `The slug of the LogRocket organization. Use the list_organizations tool to find available organization slugs.`,
      },
    ],
  },
  {
    name: 'logrocketmcp_use_logrocket',
    description: `Process a natural language query against LogRocket data — sessions, metrics, and issues. Use this to investigate user-reported bugs, understand behavior patterns, analyze performance metrics, and detect regressions by correlating code changes with LogRocket data.`,
    params: [
      {
        name: 'organizationSlug',
        type: 'string',
        required: true,
        description: `The slug of the LogRocket organization to query. Use the list_organizations tool to find available slugs.`,
      },
      {
        name: 'projectSlug',
        type: 'string',
        required: true,
        description: `The slug of the LogRocket project to query. Use the list_projects tool to find available slugs.`,
      },
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Natural language query describing what to investigate. Examples: 'show me sessions where users encountered a checkout error', 'how many users hit the payment failure last week', 'find sessions with rage clicks on the signup button'.`,
      },
    ],
  },
  {
    name: 'logrocketmcp_watch_sessions',
    description: `Use this to analyze one or more LogRocket sessions, each identified by its recording ID and session ID. You can use this tool to understand user behavior in the session or to extract additional information about the session (e.g., metadata, console logs, network requests and responses). Provide a separate natural language query describing what you want to know for each session to be analyzed. Sessions are analyzed in parallel, independently of each other. Session watching can take several minutes to complete; if pendingResults are returned, continue calling this tool with pollForResults: true and the pending fingerprints until all requests are complete.`,
    params: [
      {
        name: 'organizationID',
        type: 'string',
        required: true,
        description: `The organization ID to run the query against. If not provided by the user, discover options using the list_organizations tool.`,
      },
      {
        name: 'projectID',
        type: 'string',
        required: true,
        description: `The project ID to run the query against. If not provided by the user, discover options using the list_projects tool.`,
      },
      {
        name: 'fingerprints',
        type: 'array',
        required: false,
        description: `Fingerprints identifying session watching requests that are still pending. Required when pollForResults is true.`,
      },
      {
        name: 'pollForResults',
        type: 'boolean',
        required: false,
        description: `Set to true to poll for completion of previously-submitted session watching requests. Omit in all other cases.`,
      },
      {
        name: 'sessions',
        type: 'array',
        required: false,
        description: `Sessions to be analyzed. Required when pollForResults is omitted or false. Omit when polling for already-submitted fingerprints.`,
      },
    ],
  },
]
