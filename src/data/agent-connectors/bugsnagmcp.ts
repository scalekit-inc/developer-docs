import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'bugsnagmcp_bugsnag_get_build',
    description: `Retrieve details for a specific build by its ID, including source control metadata.`,
    params: [
      { name: 'buildId', type: 'string', required: true, description: `Unique identifier of the app build` },
      { name: 'projectId', type: 'string', required: false, description: `Unique identifier of the project. This is optional if a current project is set and is used to set the current project for BugSnag tools.` },
    ],
  },
  {
    name: 'bugsnagmcp_bugsnag_get_current_project',
    description: `Retrieve the default project set for the current session. Tools use this project when no projectId is specified.`,
    params: [
    ],
  },
  {
    name: 'bugsnagmcp_bugsnag_get_error',
    description: `Retrieve full details on an error, including aggregated stats across all occurrences and the latest event's stacktrace, breadcrumbs, and metadata.`,
    params: [
      { name: 'errorId', type: 'string', required: true, description: `Unique identifier of the error to retrieve` },
      { name: 'filters', type: 'object', required: false, description: `Apply filters to narrow down the error list. Use the List Project Event Filters tool to discover available filter fields. Time filters support extended ISO 8601 format (e.g. 2018-05-20T00:00:00Z) or relative format (e.g. 7d, 24h).` },
      { name: 'projectId', type: 'string', required: false, description: `Unique identifier of the project. This is optional if a current project is set and is used to set the current project for BugSnag tools.` },
    ],
  },
  {
    name: 'bugsnagmcp_bugsnag_get_event',
    description: `Retrieve detailed information about a specific error event by its ID.`,
    params: [
      { name: 'eventId', type: 'string', required: true, description: `Unique identifier of the event` },
      { name: 'projectId', type: 'string', required: false, description: `Unique identifier of the project. This is optional if a current project is set and is used to set the current project for BugSnag tools.` },
    ],
  },
  {
    name: 'bugsnagmcp_bugsnag_get_event_details_from_dashboard_url',
    description: `Retrieve event details using a Bugsnag dashboard URL.`,
    params: [
      { name: 'link', type: 'string', required: true, description: `Full URL to the event details page in the BugSnag dashboard (web interface), containing project slug and event_id parameter.` },
    ],
  },
  {
    name: 'bugsnagmcp_bugsnag_get_events_on_an_error',
    description: `List events (occurrences) grouped under a specific error.`,
    params: [
      { name: 'errorId', type: 'string', required: true, description: `Unique identifier of the error` },
      { name: 'direction', type: 'string', required: false, description: `Sort direction for ordering results` },
      { name: 'filters', type: 'object', required: false, description: `Apply filters to narrow down the event list. Use the List Project Event Filters tool to discover available filter fields. Time filters support extended ISO 8601 format (e.g. 2018-05-20T00:00:00Z) or relative format (e.g. 7d, 24h).` },
      { name: 'nextUrl', type: 'string', required: false, description: `URL for retrieving the next page of results. Use the value in the previous response to get the next page when more results are available. Only values provided in the output from this tool can be used. Do not attempt to construct it manually.` },
      { name: 'perPage', type: 'number', required: false, description: `How many results to return per page.` },
      { name: 'projectId', type: 'string', required: false, description: `Unique identifier of the project. This is optional if a current project is set and is used to set the current project for BugSnag tools.` },
    ],
  },
  {
    name: 'bugsnagmcp_bugsnag_get_network_endpoint_groupings',
    description: `Retrieve the network endpoint grouping rules configured for a project.`,
    params: [
      { name: 'projectId', type: 'string', required: false, description: `Unique identifier of the project. This is optional if a current project is set and is used to set the current project for BugSnag tools.` },
    ],
  },
  {
    name: 'bugsnagmcp_bugsnag_get_release',
    description: `Retrieve details for a specific release by its ID, including source control info and associated builds.`,
    params: [
      { name: 'releaseId', type: 'string', required: true, description: `Unique identifier of the app release` },
      { name: 'projectId', type: 'string', required: false, description: `Unique identifier of the project. This is optional if a current project is set and is used to set the current project for BugSnag tools.` },
    ],
  },
  {
    name: 'bugsnagmcp_bugsnag_get_span_group',
    description: `Retrieve performance metrics for a specific span group.`,
    params: [
      { name: 'spanGroupId', type: 'string', required: true, description: `ID of the span group` },
      { name: 'filters', type: 'object', required: false, description: `Apply filters to narrow down the span group list. Use the List Trace Fields tool to discover available filter fields. Time filters support extended ISO 8601 format (e.g. 2018-05-20T00:00:00Z) or relative format (e.g. 7d, 24h).` },
      { name: 'projectId', type: 'string', required: false, description: `Unique identifier of the project. This is optional if a current project is set and is used to set the current project for BugSnag tools.` },
    ],
  },
  {
    name: 'bugsnagmcp_bugsnag_get_trace',
    description: `Retrieve all spans within a specific distributed trace.`,
    params: [
      { name: 'from', type: 'string', required: true, description: `Start time (ISO 8601 format)` },
      { name: 'to', type: 'string', required: true, description: `End time (ISO 8601 format)` },
      { name: 'traceId', type: 'string', required: true, description: `Trace ID` },
      { name: 'nextUrl', type: 'string', required: false, description: `URL for retrieving the next page of results. Use the value in the previous response to get the next page when more results are available. Only values provided in the output from this tool can be used. Do not attempt to construct it manually.` },
      { name: 'perPage', type: 'number', required: false, description: `How many results to return per page.` },
      { name: 'projectId', type: 'string', required: false, description: `Unique identifier of the project. This is optional if a current project is set and is used to set the current project for BugSnag tools.` },
      { name: 'targetSpanId', type: 'string', required: false, description: `Optional target span ID to focus on` },
    ],
  },
  {
    name: 'bugsnagmcp_bugsnag_list_project_errors',
    description: `List and search errors in a project with filters, sorting, and pagination.`,
    params: [
      { name: 'direction', type: 'string', required: false, description: `Sort direction for ordering results` },
      { name: 'filters', type: 'object', required: false, description: `Apply filters to narrow down the error list. Use the List Project Event Filters tool to discover available filter fields. Time filters support extended ISO 8601 format (e.g. 2018-05-20T00:00:00Z) or relative format (e.g. 7d, 24h).` },
      { name: 'nextUrl', type: 'string', required: false, description: `URL for retrieving the next page of results. Use the value in the previous response to get the next page when more results are available. Only values provided in the output from this tool can be used. Do not attempt to construct it manually.` },
      { name: 'perPage', type: 'number', required: false, description: `How many results to return per page.` },
      { name: 'projectId', type: 'string', required: false, description: `Unique identifier of the project. This is optional if a current project is set and is used to set the current project for BugSnag tools.` },
      { name: 'sort', type: 'string', required: false, description: `Field to sort the errors by` },
    ],
  },
  {
    name: 'bugsnagmcp_bugsnag_list_project_event_filters',
    description: `Retrieve available event filter fields for a project.`,
    params: [
      { name: 'projectId', type: 'string', required: false, description: `Unique identifier of the project. This is optional if a current project is set and is used to set the current project for BugSnag tools.` },
    ],
  },
  {
    name: 'bugsnagmcp_bugsnag_list_projects',
    description: `List all projects in the organization the current user can access, or find a project by API key.`,
    params: [
      { name: 'apiKey', type: 'string', required: false, description: `The API key of the BugSnag project, if known.` },
    ],
  },
  {
    name: 'bugsnagmcp_bugsnag_list_releases',
    description: `List releases for a project with optional stage and visibility filters.`,
    params: [
      { name: 'nextUrl', type: 'string', required: false, description: `URL for retrieving the next page of results. Use the value in the previous response to get the next page when more results are available. Only values provided in the output from this tool can be used. Do not attempt to construct it manually.` },
      { name: 'perPage', type: 'number', required: false, description: `How many results to return per page.` },
      { name: 'projectId', type: 'string', required: false, description: `Unique identifier of the project. This is optional if a current project is set and is used to set the current project for BugSnag tools.` },
      { name: 'releaseStage', type: 'string', required: false, description: `Filter releases by this stage (e.g. production, staging), defaults to 'production'` },
      { name: 'visibleOnly', type: 'boolean', required: false, description: `Whether to only include releases that are marked as visible in the dashboard` },
    ],
  },
  {
    name: 'bugsnagmcp_bugsnag_list_span_groups',
    description: `List span groups (tracked operations) for performance monitoring in a project.`,
    params: [
      { name: 'direction', type: 'string', required: false, description: `Sort direction for ordering results` },
      { name: 'filters', type: 'object', required: false, description: `Apply filters to narrow down the span group list. Use the List Trace Fields tool to discover available filter fields. Time filters support extended ISO 8601 format (e.g. 2018-05-20T00:00:00Z) or relative format (e.g. 7d, 24h).` },
      { name: 'nextUrl', type: 'string', required: false, description: `URL for retrieving the next page of results. Use the value in the previous response to get the next page when more results are available. Only values provided in the output from this tool can be used. Do not attempt to construct it manually.` },
      { name: 'perPage', type: 'number', required: false, description: `How many results to return per page.` },
      { name: 'projectId', type: 'string', required: false, description: `Unique identifier of the project. This is optional if a current project is set and is used to set the current project for BugSnag tools.` },
      { name: 'sort', type: 'string', required: false, description: `Field to sort by` },
      { name: 'starredOnly', type: 'boolean', required: false, description: `Show only starred span groups` },
    ],
  },
  {
    name: 'bugsnagmcp_bugsnag_list_spans',
    description: `List individual spans belonging to a span group.`,
    params: [
      { name: 'spanGroupId', type: 'string', required: true, description: `ID of the span group` },
      { name: 'direction', type: 'string', required: false, description: `Sort direction for ordering results` },
      { name: 'filters', type: 'object', required: false, description: `Apply filters to narrow down the span group list. Use the List Trace Fields tool to discover available filter fields. Time filters support extended ISO 8601 format (e.g. 2018-05-20T00:00:00Z) or relative format (e.g. 7d, 24h).` },
      { name: 'nextUrl', type: 'string', required: false, description: `URL for retrieving the next page of results. Use the value in the previous response to get the next page when more results are available. Only values provided in the output from this tool can be used. Do not attempt to construct it manually.` },
      { name: 'perPage', type: 'number', required: false, description: `How many results to return per page.` },
      { name: 'projectId', type: 'string', required: false, description: `Unique identifier of the project. This is optional if a current project is set and is used to set the current project for BugSnag tools.` },
      { name: 'sort', type: 'string', required: false, description: `Field to sort by` },
    ],
  },
  {
    name: 'bugsnagmcp_bugsnag_list_trace_fields',
    description: `Retrieve available trace attribute fields for filtering.`,
    params: [
      { name: 'projectId', type: 'string', required: false, description: `Unique identifier of the project. This is optional if a current project is set and is used to set the current project for BugSnag tools.` },
    ],
  },
  {
    name: 'bugsnagmcp_bugsnag_set_network_endpoint_groupings',
    description: `Set network endpoint grouping rules for a project.`,
    params: [
      { name: 'endpoints', type: 'array', required: true, description: `Array of URL patterns by which network spans are grouped. Endpoints follow OpenAPI path templating syntax (https://swagger.io/specification/#path-templating) where path parameters use curly braces (e.g., /users/{id}). If you encounter colon-prefixed parameters (e.g., :userId from Express/React Router), convert them to curly braces (e.g., {userId}). Wildcards (*) can be used in domains (e.g., https://*.example.com) to match multiple subdomains.` },
      { name: 'projectId', type: 'string', required: false, description: `Unique identifier of the project. This is optional if a current project is set and is used to set the current project for BugSnag tools.` },
    ],
  },
  {
    name: 'bugsnagmcp_bugsnag_update_error',
    description: `Update the status of an error (e.g., ignore, snooze, open, or mark as fixed).`,
    params: [
      { name: 'errorId', type: 'string', required: true, description: `Unique identifier of the error` },
      { name: 'operation', type: 'string', required: true, description: `The operation to apply to the error` },
      { name: 'issue_url', type: 'string', required: false, description: `The URL of the issue to link to the error - required when operation is 'link_issue'` },
      { name: 'projectId', type: 'string', required: false, description: `Unique identifier of the project. This is optional if a current project is set and is used to set the current project for BugSnag tools.` },
      { name: 'reopenRules', type: 'object', required: false, description: `Reopen rules for snooze operation - required when operation is 'snooze'` },
    ],
  },
]
