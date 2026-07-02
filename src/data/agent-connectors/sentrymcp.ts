import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'sentrymcp_analyze_issue_with_seer',
    description: `Use Sentry's Seer AI to analyze a production error and get root cause analysis with specific code fixes. Provides file locations, line numbers, and concrete fix recommendations. Results are cached — subsequent calls return instantly.`,
    params: [
      {
        name: 'instruction',
        type: 'string',
        required: false,
        description: `Optional custom instruction for the AI analysis, to focus on specific aspects of the issue.`,
      },
      {
        name: 'issueId',
        type: 'string',
        required: false,
        description: `The Issue ID. Example: 'PROJECT-1Z43'. Required if issueUrl is not provided.`,
      },
      {
        name: 'issueUrl',
        type: 'string',
        required: false,
        description: `Full URL to the Sentry issue. Example: 'https://my-org.sentry.io/issues/PROJECT-1Z43'. Use instead of organizationSlug + issueId.`,
      },
      {
        name: 'organizationSlug',
        type: 'string',
        required: false,
        description: `The organization's slug. Use the find_organizations tool to list available organizations.`,
      },
      {
        name: 'regionUrl',
        type: 'string',
        required: false,
        description: `The region URL for the organization. For sentry.io, typically 'https://us.sentry.io'. Omit for self-hosted.`,
      },
    ],
  },
  {
    name: 'sentrymcp_execute_sentry_tool',
    description: `Execute any available Sentry MCP tool discovered through the search_sentry_tools tool. Use this to call Sentry operations that are not exposed as direct top-level tools.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The name of the Sentry tool to execute, as returned by search_sentry_tools. Example: 'find_projects', 'whoami', 'get_issue_details'.`,
      },
      {
        name: 'arguments',
        type: 'object',
        required: false,
        description: `Arguments for the target tool, matching the schema returned by search_sentry_tools. Example: {"organizationSlug": "my-org"}.`,
      },
    ],
  },
  {
    name: 'sentrymcp_find_organizations',
    description: `Find organizations that the user has access to in Sentry. Supports filtering by name or slug. Returns up to 25 results.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Search query to filter results by name or slug. Use this to narrow down results when there are many items.`,
      },
    ],
  },
  {
    name: 'sentrymcp_find_projects',
    description: `Find projects within a Sentry organization. Supports filtering by name or slug. Returns up to 25 results.`,
    params: [
      {
        name: 'organizationSlug',
        type: 'string',
        required: true,
        description: `The organization's slug. Use the find_organizations tool to list available organizations.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Search query to filter results by project name or slug.`,
      },
      {
        name: 'regionUrl',
        type: 'string',
        required: false,
        description: `The region URL for the organization. For sentry.io, this is typically 'https://us.sentry.io'. Omit for self-hosted installations.`,
      },
    ],
  },
  {
    name: 'sentrymcp_get_sentry_resource',
    description: `Fetch a Sentry resource by URL, or by resourceType plus resourceId. Supports issues, events, traces, spans, AI conversations, breadcrumbs, replays, monitors, and snapshots. Pass a Sentry URL directly when possible — the resource type is auto-detected.`,
    params: [
      {
        name: 'organizationSlug',
        type: 'string',
        required: false,
        description: `The organization's slug. Required when not providing a URL.`,
      },
      {
        name: 'resourceId',
        type: 'string',
        required: false,
        description: `Resource identifier. For issues: short ID like 'PROJECT-123'. For spans: 'traceId:spanId'. For snapshot images: 'snapshotId:image_file_name'. Required when not using a URL.`,
      },
      {
        name: 'resourceType',
        type: 'string',
        required: false,
        description: `Resource type to fetch. Use with resourceId when not providing a URL.`,
      },
      {
        name: 'url',
        type: 'string',
        required: false,
        description: `Sentry URL. The resource type is auto-detected from the URL pattern. Example: 'https://my-org.sentry.io/issues/PROJECT-123/'.`,
      },
    ],
  },
  {
    name: 'sentrymcp_search_events',
    description: `Search Sentry events across datasets (errors, logs, spans, metrics, profiles, replays). Supports aggregations (counts, averages) and individual event queries. Use natural language or Sentry query syntax.`,
    params: [
      {
        name: 'organizationSlug',
        type: 'string',
        required: true,
        description: `The organization's slug. Use the find_organizations tool to list available organizations.`,
      },
      {
        name: 'dataset',
        type: 'string',
        required: false,
        description: `Dataset to query: errors (exceptions), logs (log entries), spans (traces/performance), metrics (counters/gauges), profiles (profiling), replays (session replays).`,
      },
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: `Fields to return. Include aggregate functions like count(), avg() for statistics. Example: ['issue', 'count()'].`,
      },
      {
        name: 'includeExplanation',
        type: 'boolean',
        required: false,
        description: `Include an explanation of how the query was interpreted or repaired.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of results to return (1–100). Default is 10.`,
      },
      {
        name: 'projectSlug',
        type: 'string',
        required: false,
        description: `Filter results to a specific project by slug.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Natural language or Sentry event search query. Example: 'how many errors today', 'level:error', 'span.op:db'.`,
      },
      {
        name: 'regionUrl',
        type: 'string',
        required: false,
        description: `The region URL for the organization. For sentry.io, typically 'https://us.sentry.io'. Omit for self-hosted.`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort field (prefix with - for descending). Example: '-count()' for most frequent, '-timestamp' for newest.`,
      },
      {
        name: 'statsPeriod',
        type: 'string',
        required: false,
        description: `Time period to query: 1h, 24h, 7d, 14d, 30d, etc.`,
      },
    ],
  },
  {
    name: 'sentrymcp_search_issues',
    description: `Search for grouped issues/problems in Sentry. Returns a list of issues with metadata like title, status, and user count. Supports natural language or Sentry query syntax. Use search_events for counts/aggregations.`,
    params: [
      {
        name: 'organizationSlug',
        type: 'string',
        required: true,
        description: `The organization's slug. Use the find_organizations tool to list available organizations.`,
      },
      {
        name: 'includeExplanation',
        type: 'boolean',
        required: false,
        description: `Include an explanation of how the query was interpreted or repaired by the AI.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of issues to return (1–100). Default is 10.`,
      },
      {
        name: 'projectSlugOrId',
        type: 'string',
        required: false,
        description: `Filter by project slug or numeric ID (optional).`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Natural language or Sentry issue search query. Examples: 'is:unresolved', 'level:error firstSeen:-24h', 'assigned:me', 'critical bugs from last week'.`,
      },
      {
        name: 'regionUrl',
        type: 'string',
        required: false,
        description: `The region URL for the organization. For sentry.io, typically 'https://us.sentry.io'. Omit for self-hosted.`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort order for results: date (last seen), freq (frequency), new (first seen), user (user count).`,
      },
    ],
  },
  {
    name: 'sentrymcp_search_sentry_tools',
    description: `Search the available Sentry MCP tool catalog by keyword. Use this to discover catalog tools and their schemas for any Sentry operation not directly exposed as a top-level tool (e.g. project management, documentation, DSNs, releases, attachments, snapshots).`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Natural language keywords describing the Sentry operation or resource to find. Example: 'list projects', 'issue details', 'find dsn'.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of matching tools to return (1–20). Default is 8.`,
      },
    ],
  },
  {
    name: 'sentrymcp_update_issue',
    description: `Update a Sentry issue's status or assignment. Use to resolve, reopen, assign, or ignore an issue. Provide issueUrl or organizationSlug + issueId. At least one of status or assignedTo is required.`,
    params: [
      {
        name: 'assignedTo',
        type: 'string',
        required: false,
        description: `Assignee in format 'user:ID' or 'team:ID_OR_SLUG'. Example: 'user:123456', 'team:my-team-slug'.`,
      },
      {
        name: 'ignoreCount',
        type: 'integer',
        required: false,
        description: `Number of occurrences before the issue stops being ignored when ignoreMode is 'untilOccurrenceCount'.`,
      },
      {
        name: 'ignoreDurationMinutes',
        type: 'integer',
        required: false,
        description: `Minutes to ignore the issue when ignoreMode is 'forDuration'.`,
      },
      {
        name: 'ignoreMode',
        type: 'string',
        required: false,
        description: `How ignored issues should behave: untilEscalating (Sentry default), forever, forDuration, untilOccurrenceCount, or untilUserCount.`,
      },
      {
        name: 'ignoreUserCount',
        type: 'integer',
        required: false,
        description: `Number of affected users before the issue stops being ignored when ignoreMode is 'untilUserCount'.`,
      },
      {
        name: 'ignoreUserWindowMinutes',
        type: 'integer',
        required: false,
        description: `Optional time window in minutes for ignoreUserCount. Maximum 10080 (1 week).`,
      },
      {
        name: 'ignoreWindowMinutes',
        type: 'integer',
        required: false,
        description: `Optional time window in minutes for ignoreCount. Maximum 10080 (1 week).`,
      },
      {
        name: 'issueId',
        type: 'string',
        required: false,
        description: `The Issue ID, e.g. 'PROJECT-1Z43'. Required if issueUrl is not provided.`,
      },
      {
        name: 'issueUrl',
        type: 'string',
        required: false,
        description: `Full URL to the Sentry issue. Use instead of organizationSlug + issueId.`,
      },
      {
        name: 'organizationSlug',
        type: 'string',
        required: false,
        description: `The organization's slug. Required if issueUrl is not provided.`,
      },
      {
        name: 'reason',
        type: 'string',
        required: false,
        description: `Optional reason for the action. When provided, posted as a comment on the issue's activity feed.`,
      },
      {
        name: 'regionUrl',
        type: 'string',
        required: false,
        description: `The region URL for the organization. For sentry.io, typically 'https://us.sentry.io'. Omit for self-hosted.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `New status for the issue: resolved, resolvedInNextRelease, unresolved, or ignored.`,
      },
    ],
  },
]
