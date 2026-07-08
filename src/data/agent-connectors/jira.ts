import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'jira_agile_issue_estimation_get',
    description: `Retrieve the estimation value of an issue for a specific board, along with the fieldId of the field used for estimation on that board (e.g. story points or original time estimate). The boardId is required to determine which field is used for estimation.`,
    params: [
      {
        name: 'boardId',
        type: 'integer',
        required: true,
        description: `The ID of the board required to determine which field is used for estimation. Returns 400 if not provided.`,
      },
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `The ID or key of the requested issue`,
      },
    ],
  },
  {
    name: 'jira_agile_issue_estimation_set',
    description: `Update the estimation value of an issue for a specific board (e.g. story points or original time estimate, depending on the board's configured estimation field). The boardId is required to determine which field is used for estimation. Returns the new estimation value and the fieldId of the field that was updated.`,
    params: [
      {
        name: 'boardId',
        type: 'integer',
        required: true,
        description: `The ID of the board required to determine which field is used for estimation. Returns 400 if not provided.`,
      },
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `The ID or key of the requested issue`,
      },
      {
        name: 'value',
        type: 'string',
        required: true,
        description: `The new estimation value for the issue on this board, as a string (e.g. story points value or time estimate depending on the board's configured field)`,
      },
    ],
  },
  {
    name: 'jira_agile_issue_get',
    description: `Retrieve details of a Jira issue by its ID or key using the Jira Software Agile API. Returns fields, status, assignee, priority, and other navigable and Agile-specific metadata (e.g. sprint, epic, estimation). Use the fields parameter to limit the response to specific fields, and expand to include additional data such as changelog.`,
    params: [
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `The issue ID (e.g. 10001) or key (e.g. PROJ-123) to retrieve`,
      },
      {
        name: 'expand',
        type: 'string',
        required: false,
        description: `Comma-separated list of additional data to include (e.g. renderedFields,names,changelog,transitions,operations,editmeta,versionedRepresentations)`,
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return (use * for all navigable fields, or -field to exclude a field). By default all navigable and Agile fields are returned.`,
      },
      {
        name: 'updateHistory',
        type: 'boolean',
        required: false,
        description: `A boolean indicating whether the issue retrieved by this method should be added to the current user's issue history`,
      },
    ],
  },
  {
    name: 'jira_agile_issue_rank',
    description: `Move or rank a list of Jira issues relative to another issue on the board's ranking field. Provide either rankBeforeIssue or rankAfterIssue (not both) to specify the target position; if neither is provided, the issues are moved to the last-ranked position. Returns an empty response (204) if the operation was fully successful, or a per-issue status list (207) if some issues could not be ranked.`,
    params: [
      {
        name: 'issues',
        type: 'array',
        required: true,
        description: `The list of issue IDs or keys to rank, in the order they should be ranked`,
      },
      {
        name: 'rankAfterIssue',
        type: 'string',
        required: false,
        description: `The issue ID or key after which the issues in the 'issues' list should be ranked. Do not set this if rankBeforeIssue is set.`,
      },
      {
        name: 'rankBeforeIssue',
        type: 'string',
        required: false,
        description: `The issue ID or key before which the issues in the 'issues' list should be ranked. Do not set this if rankAfterIssue is set.`,
      },
      {
        name: 'rankCustomFieldId',
        type: 'integer',
        required: false,
        description: `The ID of the custom field representing the board's ranking. Only required if the board has multiple ranking fields configured.`,
      },
    ],
  },
  {
    name: 'jira_all_users_default_list',
    description: `Returns a paginated list of all users, including active, inactive, and previously deleted users that have an Atlassian account. Privacy controls may hide fields like email address depending on user preferences. This is the default users listing endpoint (/rest/api/3/users); prefer this or the Get All Users tool interchangeably.`,
    params: [
      {
        name: 'expand',
        type: 'string',
        required: false,
        description: `Additional data to include in the response for each user (implementation-specific expand options).`,
      },
      {
        name: 'maxResults',
        type: 'integer',
        required: false,
        description: `The maximum number of items to return per page. Limited to 1000.`,
      },
      {
        name: 'startAt',
        type: 'integer',
        required: false,
        description: `The index of the first item to return in a page of results (page offset), default 0.`,
      },
    ],
  },
  {
    name: 'jira_all_users_list',
    description: `Returns a paginated list of all users, including active, inactive, and previously deleted users that have an Atlassian account. Privacy controls may hide fields like email address depending on user preferences. Uses the /rest/api/3/users/search endpoint.`,
    params: [
      {
        name: 'expand',
        type: 'string',
        required: false,
        description: `Additional data to include in the response for each user (implementation-specific expand options).`,
      },
      {
        name: 'maxResults',
        type: 'integer',
        required: false,
        description: `The maximum number of items to return per page. Limited to 1000.`,
      },
      {
        name: 'startAt',
        type: 'integer',
        required: false,
        description: `The index of the first item to return in a page of results (page offset), default 0.`,
      },
    ],
  },
  {
    name: 'jira_archived_issues_export',
    description: `Request an export of archived issue details, filtered by project keys, issue type IDs, reporters, archiving user, or archived date range. Upon success, the admin who submitted the request receives an email with a link to download a CSV file. Only system fields and archival-specific fields (ArchivedBy, ArchivedDate) are exported; custom fields are not supported. Requires Jira admin or site admin global permission.`,
    params: [
      {
        name: 'archivedBy',
        type: 'array',
        required: false,
        description: `List archived issues archived by the specified account IDs`,
      },
      {
        name: 'dateAfter',
        type: 'string',
        required: false,
        description: `List issues archived after this date, in YYYY-MM-DD format. Used together with dateBefore to build the archivedDateRange filter.`,
      },
      {
        name: 'dateBefore',
        type: 'string',
        required: false,
        description: `List issues archived before this date, in YYYY-MM-DD format. Used together with dateAfter to build the archivedDateRange filter.`,
      },
      {
        name: 'issueTypes',
        type: 'array',
        required: false,
        description: `List archived issues with the specified issue type IDs`,
      },
      {
        name: 'projects',
        type: 'array',
        required: false,
        description: `List archived issues belonging to the specified project keys`,
      },
      {
        name: 'reporters',
        type: 'array',
        required: false,
        description: `List archived issues where the reporter is one of the specified account IDs`,
      },
    ],
  },
  {
    name: 'jira_attachment_add',
    description: `Add a single attachment to a Jira issue. The file content must be supplied as a base64-encoded string along with a filename; it is uploaded as multipart/form-data with the required X-Atlassian-Token header. Returns metadata for the created attachment.`,
    params: [
      {
        name: 'file_content_base64',
        type: 'string',
        required: true,
        description: `Base64-encoded contents of the file to attach`,
      },
      {
        name: 'filename',
        type: 'string',
        required: true,
        description: `The name of the file being uploaded, including extension`,
      },
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `The ID or key of the issue that the attachment is added to`,
      },
    ],
  },
  {
    name: 'jira_attachment_content_get',
    description: `Download the binary contents of a Jira attachment by its ID. Optionally scope the download to a byte range using the Range header, or disable the redirect Jira normally issues to the actual file location. Use Get Attachment for metadata only, or Get Attachment Thumbnail for a scaled preview image.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the attachment whose content should be downloaded.`,
      },
      {
        name: 'redirect',
        type: 'boolean',
        required: false,
        description: `Whether a redirect is provided for the attachment download. Set to false if your client does not automatically follow redirects, to avoid multiple requests.`,
      },
    ],
  },
  {
    name: 'jira_attachment_delete',
    description: `Permanently delete a Jira issue attachment by its ID. This action cannot be undone. Requires Delete Attachments project permission.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The attachment ID to delete` },
    ],
  },
  {
    name: 'jira_attachment_expand_human_get',
    description: `Get the metadata for an attachment's contents when the attachment is an archive (currently only ZIP is supported), along with metadata for the attachment itself such as its ID and name. Use this to present attachment archive contents to a user. To process the archive contents programmatically without the attachment's own metadata, use Get Expanded Attachment (Raw) instead.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the attachment to expand.`,
      },
    ],
  },
  {
    name: 'jira_attachment_expand_raw_get',
    description: `Get the metadata for the contents of an attachment when it is an archive (currently only ZIP is supported). Returns only the metadata for the contents of the archive, not the attachment's own metadata. Use this when processing archive contents programmatically. To retrieve data intended for display to a user, use Get Expanded Attachment (Human-Readable) instead.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the attachment to expand.`,
      },
    ],
  },
  {
    name: 'jira_attachment_get',
    description: `Get metadata for a Jira issue attachment by its ID. Returns the filename, MIME type, size, creation date, author, and download URL.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The attachment ID to retrieve metadata for`,
      },
    ],
  },
  {
    name: 'jira_attachment_meta_get',
    description: `Get the Jira instance's attachment settings, including whether attachments are enabled and the maximum attachment size allowed. Note that project-level permissions may further restrict who can create or delete attachments.`,
    params: [],
  },
  {
    name: 'jira_attachment_thumbnail_get',
    description: `Download the thumbnail image of a Jira attachment by its ID. Optionally scale the thumbnail to a maximum width/height, fall back to a default thumbnail if the requested one isn't found, or disable the redirect Jira normally issues. Use Get Attachment Content to retrieve the full attachment instead.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the attachment whose thumbnail should be downloaded.`,
      },
      {
        name: 'fallbackToDefault',
        type: 'boolean',
        required: false,
        description: `Whether a default thumbnail is returned when the requested thumbnail is not found.`,
      },
      {
        name: 'height',
        type: 'integer',
        required: false,
        description: `The maximum height to scale the thumbnail to, in pixels.`,
      },
      {
        name: 'redirect',
        type: 'boolean',
        required: false,
        description: `Whether a redirect is provided for the thumbnail download. Set to false if your client does not automatically follow redirects, to avoid multiple requests.`,
      },
      {
        name: 'width',
        type: 'integer',
        required: false,
        description: `The maximum width to scale the thumbnail to, in pixels.`,
      },
    ],
  },
  {
    name: 'jira_backlog_issues_move',
    description: `Move a set of Jira issues to the backlog by removing any future or active sprint assignment from them. At most 50 issues may be moved in a single call. Returns no content on success.`,
    params: [
      {
        name: 'issues',
        type: 'array',
        required: true,
        description: `Array of issue ID or key strings to move to the backlog (max 50 per call). Example: ["PR-1", "PR-2", "10001"]`,
      },
    ],
  },
  {
    name: 'jira_backlog_issues_move_for_board',
    description: `Move issues to the backlog of a specific board, provided the issues are already on that board. If the board has sprints, this removes any future or active sprint from the issues; if the board has no sprints, this simply returns the issues to the board's backlog. Optionally rank the moved issues before or after another issue. At most 50 issues may be moved in a single call. Returns no content on success, or a 207 multi-status body describing per-issue rank results.`,
    params: [
      {
        name: 'boardId',
        type: 'integer',
        required: true,
        description: `The numeric ID of the board whose backlog the issues will be moved to.`,
      },
      {
        name: 'issues',
        type: 'array',
        required: false,
        description: `Array of issue ID or key strings to move to the board's backlog (max 50 per call). Example: ["PR-1", "PR-2", "10001"]`,
      },
      {
        name: 'rankAfterIssue',
        type: 'string',
        required: false,
        description: `Issue ID or key that the moved issues should be ranked after.`,
      },
      {
        name: 'rankBeforeIssue',
        type: 'string',
        required: false,
        description: `Issue ID or key that the moved issues should be ranked before.`,
      },
      {
        name: 'rankCustomFieldId',
        type: 'integer',
        required: false,
        description: `The custom field ID of the Rank field to use for ranking, if the default rank field should not be used.`,
      },
    ],
  },
  {
    name: 'jira_board_backlog_approximate_count_get',
    description: `Retrieve an approximate count of issues in the backlog of a Jira Software board, optionally filtered by a JQL query. Useful for quickly estimating backlog size without fetching full issue data.`,
    params: [
      {
        name: 'boardId',
        type: 'integer',
        required: true,
        description: `The ID of the board that has the backlog containing the requested issues.`,
      },
      {
        name: 'jql',
        type: 'string',
        required: false,
        description: `Filters results using a JQL query. Do not use username or userkey as search terms; use accountId instead.`,
      },
    ],
  },
  {
    name: 'jira_board_backlog_issues_list',
    description: `Returns all issues from a board's backlog, for the given board ID. Only includes issues the user has permission to view. The backlog contains incomplete issues not assigned to any future or active sprint. Issues include Agile fields such as sprint, closedSprints, flagged, and epic. Results are ordered by rank by default and can be filtered with a JQL query.`,
    params: [
      {
        name: 'boardId',
        type: 'integer',
        required: true,
        description: `The ID of the board that has the backlog containing the requested issues.`,
      },
      {
        name: 'expand',
        type: 'string',
        required: false,
        description: `This parameter is currently not used by the Jira API but is accepted for forward compatibility.`,
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return for each issue. By default, all navigable and Agile fields are returned.`,
      },
      {
        name: 'jql',
        type: 'string',
        required: false,
        description: `Filters results using a JQL query. If you define an order in your JQL query, it overrides the default rank order. Note: username and userkey cannot be used as search terms; use accountId instead.`,
      },
      {
        name: 'maxResults',
        type: 'integer',
        required: false,
        description: `The maximum number of issues to return per page. Default is 50. The total number of issues returned is limited by the 'jira.search.views.default.max' property on the Jira instance; results may be truncated if this limit is exceeded.`,
      },
      {
        name: 'startAt',
        type: 'integer',
        required: false,
        description: `The starting index of the returned issues (zero-based). Used for pagination.`,
      },
      {
        name: 'validateQuery',
        type: 'boolean',
        required: false,
        description: `Specifies whether to validate the JQL query. Default is true.`,
      },
    ],
  },
  {
    name: 'jira_board_configuration_get',
    description: `Retrieves the configuration of a Jira Software board by its ID. The response includes the board's filter, location, column configuration (statuses mapped to columns and min/max constraints), estimation settings (Scrum only), sub-query (Kanban only), and ranking custom field.`,
    params: [
      {
        name: 'boardId',
        type: 'integer',
        required: true,
        description: `The ID of the board for which configuration is requested.`,
      },
    ],
  },
  {
    name: 'jira_board_create',
    description: `Creates a new Jira Software board. Requires a name, a type (scrum or kanban), and a filterId for an existing filter the user has permission to view. Optionally specify a location (project or user) to control where the board is created. Note: if the user lacks the 'Create shared objects' permission and tries to create a shared board, a private board is created instead.`,
    params: [
      {
        name: 'filterId',
        type: 'integer',
        required: true,
        description: `The ID of a filter that the user has permission to view. Board sharing depends on the filter's sharing settings. If you do not order by the Rank field in the filter, you will not be able to reorder issues on the board.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The name of the board to create. Must be less than 255 characters.`,
      },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `The type of board to create. Valid values: scrum, kanban.`,
      },
      {
        name: 'locationProjectKeyOrId',
        type: 'string',
        required: false,
        description: `The project key or ID to locate the board in. Required only when locationType is 'project'; must not be provided when locationType is 'user'.`,
      },
      {
        name: 'locationType',
        type: 'string',
        required: false,
        description: `The type of container the board will be located in. Valid values: project, user. If 'project', a project must be specified via locationProjectKeyOrId. If 'user', the current user is chosen by default and locationProjectKeyOrId should not be provided.`,
      },
    ],
  },
  {
    name: 'jira_board_delete',
    description: `Permanently deletes a Jira Software board by its ID. The user must be a Jira Administrator or a board administrator to remove the board. Next-gen boards cannot be deleted because next-gen software projects must have a board. This action cannot be undone.`,
    params: [
      {
        name: 'boardId',
        type: 'integer',
        required: true,
        description: `The ID of the board to be deleted.`,
      },
    ],
  },
  {
    name: 'jira_board_epic_issues_list',
    description: `Returns all issues that belong to a given epic on a board, for the given board ID and epic ID. Only includes issues the user has permission to view. Issues include Agile fields such as sprint, closedSprints, flagged, and epic. Results are ordered by rank by default and can be filtered with a JQL query.`,
    params: [
      {
        name: 'boardId',
        type: 'integer',
        required: true,
        description: `The ID of the board that contains the requested issues.`,
      },
      {
        name: 'epicId',
        type: 'integer',
        required: true,
        description: `The ID of the epic that contains the requested issues.`,
      },
      {
        name: 'expand',
        type: 'string',
        required: false,
        description: `Comma-separated list of parameters to expand in the response.`,
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return for each issue. By default, all navigable and Agile fields are returned.`,
      },
      {
        name: 'jql',
        type: 'string',
        required: false,
        description: `Filters results using a JQL query. If you define an order in your JQL query, it overrides the default rank order.`,
      },
      {
        name: 'maxResults',
        type: 'integer',
        required: false,
        description: `The maximum number of issues to return per page. Default is 50. The total number of issues returned is limited by the 'jira.search.views.default.max' property on the Jira instance; results may be truncated if this limit is exceeded.`,
      },
      {
        name: 'startAt',
        type: 'integer',
        required: false,
        description: `The starting index of the returned issues (zero-based). Used for pagination.`,
      },
      {
        name: 'validateQuery',
        type: 'boolean',
        required: false,
        description: `Specifies whether to validate the JQL query. Default is true.`,
      },
    ],
  },
  {
    name: 'jira_board_epics_list',
    description: `Returns all epics from a Jira Software board, for the given board ID. Only includes epics the user has permission to view. Supports filtering by completion status and pagination.`,
    params: [
      {
        name: 'boardId',
        type: 'integer',
        required: true,
        description: `The ID of the board that contains the requested epics.`,
      },
      {
        name: 'done',
        type: 'string',
        required: false,
        description: `Filters results to epics that are either done or not done. Valid values: true, false.`,
      },
      {
        name: 'maxResults',
        type: 'integer',
        required: false,
        description: `The maximum number of epics to return per page. Default is 50.`,
      },
      {
        name: 'startAt',
        type: 'integer',
        required: false,
        description: `The starting index of the returned epics (zero-based). Used for pagination.`,
      },
    ],
  },
  {
    name: 'jira_board_feature_toggle',
    description: `Enable or disable an optional feature (such as sprints or estimation) on a Jira Software board. Requires board administration permissions. Returns the updated board configuration on success.`,
    params: [
      {
        name: 'boardId',
        type: 'integer',
        required: true,
        description: `The ID of the board whose feature should be toggled. Also included in the request body as required by the API.`,
      },
      {
        name: 'feature',
        type: 'string',
        required: true,
        description: `The name of the feature to enable or disable, e.g. 'simplifiedEpics' or 'estimation'. The exact set of feature names depends on the board type and is not enumerated by the API.`,
      },
      {
        name: 'enabling',
        type: 'boolean',
        required: false,
        description: `Whether the feature should be enabled (true) or disabled (false). Optional; omit to leave unchanged if supported by the API.`,
      },
    ],
  },
  {
    name: 'jira_board_features_list',
    description: `Get the list of features and their current status (enabled or disabled, and coming soon flags) for a Jira Software board. Use this to inspect which optional board capabilities (e.g. sprints, estimation) are currently turned on before toggling them.`,
    params: [
      {
        name: 'boardId',
        type: 'integer',
        required: true,
        description: `The ID of the board to retrieve features for`,
      },
    ],
  },
  {
    name: 'jira_board_get',
    description: `Retrieve details of a Jira Software board by its ID, including its name, type (scrum or kanban), and project location. The board is only returned if the requesting user has permission to view it.`,
    params: [
      {
        name: 'boardId',
        type: 'integer',
        required: true,
        description: `The ID of the board to retrieve`,
      },
    ],
  },
  {
    name: 'jira_board_get_by_filter',
    description: `Returns any boards which use the provided filter ID. This method can be executed by users without a valid Jira Software license in order to find which boards are using a particular filter. Supports pagination.`,
    params: [
      {
        name: 'filterId',
        type: 'integer',
        required: true,
        description: `The ID of the filter to look up boards for. Not supported for next-gen boards.`,
      },
      {
        name: 'maxResults',
        type: 'integer',
        required: false,
        description: `The maximum number of boards to return per page. Default is 50.`,
      },
      {
        name: 'startAt',
        type: 'integer',
        required: false,
        description: `The starting index of the returned boards (zero-based). Used for pagination.`,
      },
    ],
  },
  {
    name: 'jira_board_issues_approximate_count_get',
    description: `Retrieve an approximate count of issues on a Jira Software board, optionally filtered by a JQL query. Useful for quickly estimating board size without fetching full issue data.`,
    params: [
      {
        name: 'boardId',
        type: 'integer',
        required: true,
        description: `The ID of the board that contains the requested issues.`,
      },
      {
        name: 'jql',
        type: 'string',
        required: false,
        description: `Filters results using a JQL query. Do not use username or userkey as search terms; use accountId instead.`,
      },
    ],
  },
  {
    name: 'jira_board_issues_list',
    description: `Get a paginated list of issues assigned to a Jira Software board, optionally filtered by JQL. Returns issue details for issues visible to the requesting user, with support for pagination, field selection, and expansion of additional issue data.`,
    params: [
      {
        name: 'boardId',
        type: 'integer',
        required: true,
        description: `The ID of the board to retrieve issues for`,
      },
      {
        name: 'expand',
        type: 'string',
        required: false,
        description: `Comma-separated list of extra data to include in the response, e.g. 'changelog'. Optional.`,
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return for each issue, e.g. 'summary,status,assignee'. Optional; when omitted the API returns its default field set.`,
      },
      {
        name: 'jql',
        type: 'string',
        required: false,
        description: `A JQL query string used to filter which issues are returned, e.g. 'status="In Progress"'. Optional; when omitted all issues on the board are considered.`,
      },
      {
        name: 'maxResults',
        type: 'integer',
        required: false,
        description: `The maximum number of items to return per page. Defaults to 50.`,
      },
      {
        name: 'startAt',
        type: 'integer',
        required: false,
        description: `The index of the first item to return in the page of results (0-based). Defaults to 0.`,
      },
      {
        name: 'validateQuery',
        type: 'boolean',
        required: false,
        description: `Whether to validate the JQL query. Defaults to true. When false, invalid JQL is ignored rather than causing an error.`,
      },
    ],
  },
  {
    name: 'jira_board_issues_move',
    description: `Move a list of issues to a Jira Software board, optionally ranking them relative to another issue. Issues can be identified by issue key or ID. On success the response body is empty; if some issues could not be moved, a per-issue rank status is returned instead.`,
    params: [
      {
        name: 'boardId',
        type: 'integer',
        required: true,
        description: `The ID of the board to move issues to`,
      },
      {
        name: 'issues',
        type: 'array',
        required: true,
        description: `A list of issue keys or IDs to move to the board, e.g. ["PR-1", "10001", "PR-3"]. Maximum of 50 issues per request.`,
      },
      {
        name: 'rankAfterIssue',
        type: 'string',
        required: false,
        description: `The key or ID of an issue that the moved issues should be ranked after. Optional; mutually exclusive with rankBeforeIssue.`,
      },
      {
        name: 'rankBeforeIssue',
        type: 'string',
        required: false,
        description: `The key or ID of an issue that the moved issues should be ranked before. Optional; mutually exclusive with rankAfterIssue.`,
      },
      {
        name: 'rankCustomFieldId',
        type: 'integer',
        required: false,
        description: `The ID of the custom field used for ranking, if the default rank field should not be used. Optional.`,
      },
    ],
  },
  {
    name: 'jira_board_issues_without_epic_list',
    description: `Returns all issues that do not belong to any epic on a board, for the given board ID. Only includes issues the user has permission to view. Issues include Agile fields such as sprint, closedSprints, flagged, and epic. Results are ordered by rank by default and can be filtered with a JQL query.`,
    params: [
      {
        name: 'boardId',
        type: 'integer',
        required: true,
        description: `The ID of the board that contains the requested issues.`,
      },
      {
        name: 'expand',
        type: 'string',
        required: false,
        description: `Comma-separated list of parameters to expand in the response.`,
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return for each issue. By default, all navigable and Agile fields are returned.`,
      },
      {
        name: 'jql',
        type: 'string',
        required: false,
        description: `Filters results using a JQL query. If you define an order in your JQL query, it overrides the default rank order. Note: username and userkey cannot be used as search terms; use accountId instead.`,
      },
      {
        name: 'maxResults',
        type: 'integer',
        required: false,
        description: `The maximum number of issues to return per page. The total number of issues returned is limited by the 'jira.search.views.default.max' property on the Jira instance; results may be truncated if this limit is exceeded.`,
      },
      {
        name: 'startAt',
        type: 'integer',
        required: false,
        description: `The starting index of the returned issues (zero-based). Used for pagination.`,
      },
      {
        name: 'validateQuery',
        type: 'boolean',
        required: false,
        description: `Specifies whether to validate the JQL query. Default is true.`,
      },
    ],
  },
  {
    name: 'jira_board_projects_full_list',
    description: `Get the complete, unpaginated list of projects associated with a Jira Software board. Unlike the paginated projects endpoint, this returns all projects in a single response. Only projects the requesting user has permission to view are returned.`,
    params: [
      {
        name: 'boardId',
        type: 'integer',
        required: true,
        description: `The ID of the board to retrieve all associated projects for`,
      },
    ],
  },
  {
    name: 'jira_board_projects_list',
    description: `Get a paginated list of projects associated with a Jira Software board. Only projects that the board can display issues from, and that the requesting user has permission to view, are returned.`,
    params: [
      {
        name: 'boardId',
        type: 'integer',
        required: true,
        description: `The ID of the board to retrieve associated projects for`,
      },
      {
        name: 'maxResults',
        type: 'integer',
        required: false,
        description: `The maximum number of items to return per page. Defaults to 50.`,
      },
      {
        name: 'startAt',
        type: 'integer',
        required: false,
        description: `The index of the first item to return in the page of results (0-based). Defaults to 0.`,
      },
    ],
  },
  {
    name: 'jira_board_property_delete',
    description: `Delete a property from a Jira Software board by its property key. This permanently removes the stored key-value property from the board. Returns no content on success.`,
    params: [
      {
        name: 'boardId',
        type: 'string',
        required: true,
        description: `The ID of the board from which the property will be removed.`,
      },
      {
        name: 'propertyKey',
        type: 'string',
        required: true,
        description: `The key of the property to remove from the board.`,
      },
    ],
  },
  {
    name: 'jira_board_property_get',
    description: `Get the value of a specific custom property on a Jira Software board, identified by its property key. Returns a 404 if the board does not exist, the property key is not found, or the user lacks permission to view it.`,
    params: [
      {
        name: 'boardId',
        type: 'string',
        required: true,
        description: `The ID of the board to retrieve the property from`,
      },
      {
        name: 'propertyKey',
        type: 'string',
        required: true,
        description: `The key name of the property to retrieve`,
      },
    ],
  },
  {
    name: 'jira_board_property_keys_list',
    description: `Get the keys of all custom properties set on a Jira Software board. Board properties are key-value stores attached to boards for storing custom data, commonly used by Connect and Forge apps.`,
    params: [
      {
        name: 'boardId',
        type: 'string',
        required: true,
        description: `The ID of the board to list property keys for`,
      },
    ],
  },
  {
    name: 'jira_board_property_set',
    description: `Set or update a custom property on a Jira Software board. Properties can store arbitrary JSON values (up to 32768 bytes) and are commonly used by Connect and Forge apps to persist board-scoped data. The value must be a valid, non-empty JSON string.`,
    params: [
      {
        name: 'boardId',
        type: 'string',
        required: true,
        description: `The ID of the board to set the property on`,
      },
      {
        name: 'propertyKey',
        type: 'string',
        required: true,
        description: `The key name for the property`,
      },
      {
        name: 'value',
        type: 'string',
        required: true,
        description: `The JSON value to store for the property, provided as a JSON string, e.g. '{"status": "deployed", "env": "production"}'. Maximum length 32768 bytes.`,
      },
    ],
  },
  {
    name: 'jira_board_quickfilter_get',
    description: `Retrieve a single quick filter from a Jira Software board by its ID, including its name, JQL fragment, description, and position.`,
    params: [
      {
        name: 'boardId',
        type: 'integer',
        required: true,
        description: `The ID of the board that contains the requested quick filter.`,
      },
      {
        name: 'quickFilterId',
        type: 'integer',
        required: true,
        description: `The ID of the requested quick filter.`,
      },
    ],
  },
  {
    name: 'jira_board_quickfilters_list',
    description: `Retrieve all quick filters configured on a Jira Software board. Quick filters are saved JQL fragments used to filter the board view (e.g. by issue type or assignee). Results are paginated.`,
    params: [
      {
        name: 'boardId',
        type: 'integer',
        required: true,
        description: `The ID of the board that contains the requested quick filters.`,
      },
      {
        name: 'maxResults',
        type: 'integer',
        required: false,
        description: `The maximum number of quick filters to return per page.`,
      },
      {
        name: 'startAt',
        type: 'integer',
        required: false,
        description: `The starting index of the returned quick filters. Base index: 0.`,
      },
    ],
  },
  {
    name: 'jira_board_reports_list',
    description: `Retrieve the list of reports available for a Jira Software board, such as burndown, velocity, and sprint reports. Returns an array of report metadata objects.`,
    params: [
      {
        name: 'boardId',
        type: 'integer',
        required: true,
        description: `The ID of the board to retrieve available reports for.`,
      },
    ],
  },
  {
    name: 'jira_board_sprint_issues_list',
    description: `Retrieve all issues that belong to a specific sprint on a Jira Software board. Supports JQL filtering, field selection, and pagination. Note: username/userkey cannot be used as JQL search terms; use accountId instead.`,
    params: [
      {
        name: 'boardId',
        type: 'integer',
        required: true,
        description: `The ID of the board that contains the requested issues.`,
      },
      {
        name: 'sprintId',
        type: 'integer',
        required: true,
        description: `The ID of the sprint that contains the requested issues.`,
      },
      {
        name: 'expand',
        type: 'string',
        required: false,
        description: `A comma-separated list of the parameters to expand.`,
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of the fields to return for each issue. By default, all navigable and Agile fields are returned.`,
      },
      {
        name: 'jql',
        type: 'string',
        required: false,
        description: `Filters results using a JQL query. If an order is defined in the JQL query, it overrides the default order of returned issues. Do not use username or userkey as search terms; use accountId instead.`,
      },
      {
        name: 'maxResults',
        type: 'integer',
        required: false,
        description: `The maximum number of issues to return per page. Note that the total returned is limited by the 'jira.search.views.default.max' Jira instance property; results will be truncated if exceeded.`,
      },
      {
        name: 'startAt',
        type: 'integer',
        required: false,
        description: `The starting index of the returned issues. Base index: 0.`,
      },
      {
        name: 'validateQuery',
        type: 'boolean',
        required: false,
        description: `Specifies whether to validate the JQL query. Default: true.`,
      },
    ],
  },
  {
    name: 'jira_board_sprints_list',
    description: `Retrieve all sprints associated with a Jira Software board, ordered first by state (closed, active, future) then by position in the backlog. Supports pagination and filtering by sprint state.`,
    params: [
      {
        name: 'boardId',
        type: 'integer',
        required: true,
        description: `The ID of the board that contains the requested sprints.`,
      },
      {
        name: 'maxResults',
        type: 'integer',
        required: false,
        description: `The maximum number of sprints to return per page.`,
      },
      {
        name: 'startAt',
        type: 'integer',
        required: false,
        description: `The starting index of the returned sprints. Base index: 0.`,
      },
      {
        name: 'state',
        type: 'string',
        required: false,
        description: `Filters results to sprints in the specified states. Valid values: future, active, closed. Multiple states can be combined as a comma-separated string, e.g. "active,closed".`,
      },
    ],
  },
  {
    name: 'jira_board_versions_list',
    description: `Retrieve all versions associated with a Jira Software board. Supports pagination and filtering by released status.`,
    params: [
      {
        name: 'boardId',
        type: 'integer',
        required: true,
        description: `The ID of the board that contains the requested versions.`,
      },
      {
        name: 'maxResults',
        type: 'integer',
        required: false,
        description: `The maximum number of versions to return per page.`,
      },
      {
        name: 'released',
        type: 'string',
        required: false,
        description: `Filters results to versions that are either released or unreleased. Valid values: "true", "false".`,
      },
      {
        name: 'startAt',
        type: 'integer',
        required: false,
        description: `The starting index of the returned versions. Base index: 0.`,
      },
    ],
  },
  {
    name: 'jira_boards_list',
    description: `Returns all Jira Software boards that the requesting user has permission to view. Supports filtering by board type, name, project, and filter ID, plus pagination. Use this to discover board IDs before calling other board-scoped endpoints.`,
    params: [
      {
        name: 'expand',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to expand for each board. Valid values: admins, permissions.`,
      },
      {
        name: 'filterId',
        type: 'integer',
        required: false,
        description: `Filters results to boards that are relevant to the given filter ID. Not supported for next-gen boards.`,
      },
      {
        name: 'includePrivate',
        type: 'boolean',
        required: false,
        description: `If true, appends private boards to the end of the list. The name and type fields are excluded from private boards for security reasons.`,
      },
      {
        name: 'maxResults',
        type: 'integer',
        required: false,
        description: `The maximum number of boards to return per page. Default is 50.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Filters results to boards that match or partially match the specified name.`,
      },
      {
        name: 'negateLocationFiltering',
        type: 'boolean',
        required: false,
        description: `If true, negates the filters used for querying by location (project). Default is false.`,
      },
      {
        name: 'orderBy',
        type: 'string',
        required: false,
        description: `Orders the results by a given field. Valid values: name, -name, +name.`,
      },
      {
        name: 'projectKeyOrId',
        type: 'string',
        required: false,
        description: `Filters results to boards that are relevant to a project, identified by project key or ID.`,
      },
      {
        name: 'startAt',
        type: 'integer',
        required: false,
        description: `The starting index of the returned boards (zero-based). Used for pagination.`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Filters results to boards of the specified type. Valid values: scrum, kanban, simple.`,
      },
    ],
  },
  {
    name: 'jira_bulk_assignable_users_search',
    description: `Find users who can be assigned issues across one or more Jira projects, optionally filtered by a query string matched against display name, email address, or account ID. Provide projectKeys (comma-separated) plus either query or accountId. Note: this operation samples users in the startAt/maxResults range and returns only those assignable to the given projects, so it may return fewer results than maxResults.`,
    params: [
      {
        name: 'projectKeys',
        type: 'string',
        required: true,
        description: `Comma-separated list of project keys (case sensitive) to search assignable users across.`,
      },
      {
        name: 'accountId',
        type: 'string',
        required: false,
        description: `Exact account ID to match against. Required unless query is specified. Max length 128.`,
      },
      {
        name: 'maxResults',
        type: 'integer',
        required: false,
        description: `The maximum number of items to return per page. Defaults to 50. The API samples users in this range then filters to assignable ones, so actual results may be fewer.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Query string matched against user attributes (displayName, emailAddress) by prefix, to find relevant users. Required unless accountId is specified.`,
      },
      {
        name: 'startAt',
        type: 'integer',
        required: false,
        description: `The index of the first item to return in a page of results (page offset). Defaults to 0.`,
      },
    ],
  },
  {
    name: 'jira_changelogs_bulk_get',
    description: `Bulk fetch changelogs for multiple issues, optionally filtered by field IDs. Returns a paginated list of changelogs for the given issues sorted by changelog date and issue ID, starting from the oldest changelog and smallest issue ID. Accepts up to 1000 issue IDs/keys and up to 10 field IDs to filter by.`,
    params: [
      {
        name: 'issueIdsOrKeys',
        type: 'array',
        required: true,
        description: `List of issue IDs and/or keys to fetch changelogs for. A maximum of 1000 issues can be specified.`,
      },
      {
        name: 'fieldIds',
        type: 'array',
        required: false,
        description: `List of field IDs to filter changelogs by. A maximum of 10 field IDs can be specified.`,
      },
      {
        name: 'maxResults',
        type: 'integer',
        required: false,
        description: `The maximum number of items to return per page. Maximum allowed value is 10000.`,
      },
      {
        name: 'nextPageToken',
        type: 'string',
        required: false,
        description: `The cursor for pagination, returned by a previous call to this endpoint.`,
      },
    ],
  },
  {
    name: 'jira_comments_by_ids_get',
    description: `Get a paginated list of Jira comments specified by a list of comment IDs. Only comments the user has permission to view are returned. Use the expand parameter to include rendered HTML bodies or comment properties.`,
    params: [
      {
        name: 'ids',
        type: 'array',
        required: true,
        description: `The list of comment IDs to retrieve. A maximum of 1000 IDs can be specified.`,
      },
      {
        name: 'expand',
        type: 'string',
        required: false,
        description: `Comma-separated list of additional data to include. Options: renderedBody (comment body rendered in HTML), properties (comment's properties).`,
      },
    ],
  },
  {
    name: 'jira_component_create',
    description: `Create a new component in a Jira project. Components are used to group and categorize issues within a project.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name of the component` },
      {
        name: 'project',
        type: 'string',
        required: true,
        description: `Key of the project to add the component to`,
      },
      {
        name: 'assigneeType',
        type: 'string',
        required: false,
        description: `Default assignee type: PROJECT_DEFAULT, COMPONENT_LEAD, PROJECT_LEAD, or UNASSIGNED`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description of the component`,
      },
      {
        name: 'leadAccountId',
        type: 'string',
        required: false,
        description: `Account ID of the component lead`,
      },
    ],
  },
  {
    name: 'jira_component_delete',
    description: `Delete a Jira project component by its ID. Optionally move issues from the deleted component to another component. Requires Administer Projects permission.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The component ID to delete` },
      {
        name: 'moveIssuesTo',
        type: 'string',
        required: false,
        description: `Component ID to move issues to after deleting this component`,
      },
    ],
  },
  {
    name: 'jira_component_get',
    description: `Retrieve details of a Jira project component by its ID, including name, description, lead, and default assignee settings.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The component ID to retrieve` },
    ],
  },
  {
    name: 'jira_component_related_issues_get',
    description: `Get the count of issues assigned to a Jira component, identified by component ID. Useful for understanding how heavily a component is used before deleting or reassigning it.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the component to get the related issue count for.`,
      },
    ],
  },
  {
    name: 'jira_component_update',
    description: `Update an existing Jira project component's name, description, lead, or default assignee settings.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The component ID to update` },
      {
        name: 'assigneeType',
        type: 'string',
        required: false,
        description: `Updated default assignee type: PROJECT_DEFAULT, COMPONENT_LEAD, PROJECT_LEAD, or UNASSIGNED`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Updated component description`,
      },
      {
        name: 'leadAccountId',
        type: 'string',
        required: false,
        description: `Account ID of the new component lead`,
      },
      { name: 'name', type: 'string', required: false, description: `Updated component name` },
    ],
  },
  {
    name: 'jira_components_search',
    description: `Search for components across one or more Jira projects, including global (Compass) components when applicable. Returns a paginated list of components. Filter by project IDs/keys and/or a text query, and control ordering by name or description.`,
    params: [
      {
        name: 'maxResults',
        type: 'integer',
        required: false,
        description: `The maximum number of items to return per page.`,
      },
      {
        name: 'orderBy',
        type: 'string',
        required: false,
        description: `Order the results by a field: description, -description, +description, name, -name, or +name.`,
      },
      {
        name: 'projectIdsOrKeys',
        type: 'array',
        required: false,
        description: `The project IDs and/or project keys (case sensitive) to search components in. If omitted, searches across all projects the user can browse.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Filter the results using a literal string. Components with a matching name or description are returned (case insensitive).`,
      },
      {
        name: 'startAt',
        type: 'integer',
        required: false,
        description: `The index of the first item to return in a page of results (page offset).`,
      },
    ],
  },
  {
    name: 'jira_custom_field_create',
    description: `Create a new custom field in Jira. Requires a name and a field type. Optionally specify a description and a searcher key that determines how the field can be searched via JQL and basic search. Requires the Administer Jira global permission.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The name of the custom field, as displayed in Jira. This is not the unique identifier.`,
      },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `The type of the custom field, e.g. com.atlassian.jira.plugin.system.customfieldtypes:textfield for a single-line text field, or com.atlassian.jira.plugin.system.customfieldtypes:float for a numeric field. See Jira docs for the full built-in list.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `The description of the custom field, which is displayed in Jira.`,
      },
      {
        name: 'searcherKey',
        type: 'string',
        required: false,
        description: `The searcher that defines how the field is searched in Jira. Must be valid for the chosen field type (e.g. textfield uses textsearcher, float uses exactnumber or numberrange). If omitted, the field is not searchable.`,
      },
    ],
  },
  {
    name: 'jira_custom_field_delete',
    description: `Delete a custom field, whether it is currently in the trash or not. This operation is asynchronous. Use the returned task location to check status via the Get Task tool. Requires the Administer Jira global permission.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the custom field to delete, e.g. customfield_10000`,
      },
    ],
  },
  {
    name: 'jira_custom_field_restore',
    description: `Restore a custom field from the trash, making it active again. Requires the Administer Jira global permission.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the custom field to restore, e.g. customfield_10000`,
      },
    ],
  },
  {
    name: 'jira_custom_field_trash',
    description: `Move a custom field to the trash. Trashed fields can later be restored or permanently deleted. Requires the Administer Jira global permission.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the custom field to move to trash, e.g. customfield_10000`,
      },
    ],
  },
  {
    name: 'jira_custom_field_update',
    description: `Update the name, description, or searcher key of an existing custom field. Provide only the fields you want to change. Requires the Administer Jira global permission.`,
    params: [
      {
        name: 'fieldId',
        type: 'string',
        required: true,
        description: `The ID of the custom field to update, e.g. customfield_10000`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `The new description of the custom field. Maximum length is 40000 characters.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `The new name of the custom field. It doesn't have to be unique. Maximum length is 255 characters.`,
      },
      {
        name: 'searcherKey',
        type: 'string',
        required: false,
        description: `The searcher that defines how the field is searched in Jira. Must be a valid searcher for the field's type.`,
      },
    ],
  },
  {
    name: 'jira_dashboard_copy',
    description: `Copy an existing Jira dashboard. The dashboard being copied must be owned by or shared with the current user. Any values provided (name, description, share permissions, edit permissions) replace those in the copied dashboard.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the dashboard to copy`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Name for the copied dashboard`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description for the copied dashboard`,
      },
      {
        name: 'editPermissions',
        type: 'array',
        required: false,
        description: `Array of edit permission objects for the copied dashboard. Each object specifies a type (user, group, project, projectRole, global, loggedin, authenticated) and the corresponding target. Example: [{"type": "loggedin"}]`,
      },
      {
        name: 'extendAdminPermissions',
        type: 'boolean',
        required: false,
        description: `Whether admin level permissions are used when copying. Should only be true if the user has the Administer Jira global permission.`,
      },
      {
        name: 'sharePermissions',
        type: 'array',
        required: false,
        description: `Array of share permission objects for the copied dashboard. Each object specifies a type (user, group, project, projectRole, global, loggedin, authenticated) and the corresponding target. Example: [{"type": "global"}]`,
      },
    ],
  },
  {
    name: 'jira_dashboard_create',
    description: `Creates a new Jira dashboard with a name, share permissions, and edit permissions. Share/edit permission entries describe who can view or edit the dashboard (e.g. globally shared, shared with a group, project, project role, or logged-in users).`,
    params: [
      {
        name: 'editPermissions',
        type: 'array',
        required: true,
        description: `Array of edit permission objects controlling who can edit the dashboard. Each object needs a 'type' (user, group, project, projectRole, global, loggedin) and, depending on type, a group/project/role/user reference. Example: [{"type":"loggedin"}]`,
      },
      { name: 'name', type: 'string', required: true, description: `The name of the dashboard.` },
      {
        name: 'sharePermissions',
        type: 'array',
        required: true,
        description: `Array of share permission objects controlling who can view the dashboard. Each object needs a 'type' (user, group, project, projectRole, global, loggedin) and, depending on type, a group/project/role/user reference. Example: [{"type":"global"}]`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `The description of the dashboard.`,
      },
      {
        name: 'extendAdminPermissions',
        type: 'boolean',
        required: false,
        description: `Whether admin-level permissions are used when creating the dashboard. Should only be true if the user has Administer Jira global permission.`,
      },
    ],
  },
  {
    name: 'jira_dashboard_delete',
    description: `Delete a Jira dashboard. The dashboard must be owned by the authenticated user.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the dashboard to delete`,
      },
    ],
  },
  {
    name: 'jira_dashboard_gadgets_get',
    description: `Returns the gadgets placed on a specific dashboard. Optionally filter by a list of gadget IDs, module keys, or URIs; if none are provided, all gadgets on the dashboard are returned. Can be accessed anonymously.`,
    params: [
      {
        name: 'dashboardId',
        type: 'integer',
        required: true,
        description: `The numeric ID of the dashboard whose gadgets should be listed.`,
      },
      {
        name: 'gadgetId',
        type: 'string',
        required: false,
        description: `Comma-separated list of gadget IDs to filter by, e.g. 10000,10001.`,
      },
      {
        name: 'moduleKey',
        type: 'string',
        required: false,
        description: `Comma-separated list of gadget module keys to filter by.`,
      },
      {
        name: 'uri',
        type: 'string',
        required: false,
        description: `Comma-separated list of gadget URIs to filter by.`,
      },
    ],
  },
  {
    name: 'jira_dashboard_gadgets_list',
    description: `Returns a list of all available gadgets that can be added to any dashboard, including their module keys, titles, and thumbnail URLs.`,
    params: [],
  },
  {
    name: 'jira_dashboard_get',
    description: `Retrieve details of a Jira dashboard by its ID. The dashboard must be shared with the user or owned by them (admins are considered owners of the System dashboard).`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the dashboard to retrieve`,
      },
    ],
  },
  {
    name: 'jira_dashboard_item_property_delete',
    description: `Delete a property from a Jira dashboard item. Dashboard items are the gadgets that apps expose on a dashboard, and properties are custom key-value data an app has stored against a dashboard item.`,
    params: [
      {
        name: 'dashboardId',
        type: 'string',
        required: true,
        description: `The ID of the dashboard that contains the item`,
      },
      {
        name: 'itemId',
        type: 'string',
        required: true,
        description: `The ID of the dashboard item the property belongs to`,
      },
      {
        name: 'propertyKey',
        type: 'string',
        required: true,
        description: `The key of the dashboard item property to delete`,
      },
    ],
  },
  {
    name: 'jira_dashboard_item_property_get',
    description: `Get the key and value of a property on a Jira dashboard item. Dashboard items are the gadgets that apps expose on a dashboard, and properties are custom key-value data an app has stored against a dashboard item.`,
    params: [
      {
        name: 'dashboardId',
        type: 'string',
        required: true,
        description: `The ID of the dashboard that contains the item`,
      },
      {
        name: 'itemId',
        type: 'string',
        required: true,
        description: `The ID of the dashboard item the property belongs to`,
      },
      {
        name: 'propertyKey',
        type: 'string',
        required: true,
        description: `The key of the dashboard item property to retrieve`,
      },
    ],
  },
  {
    name: 'jira_dashboard_item_property_keys_list',
    description: `Get the keys of all properties for a dashboard item. Dashboard items are the gadgets that apps expose on a Jira dashboard, and properties let apps store custom data against a dashboard item.`,
    params: [
      {
        name: 'dashboardId',
        type: 'string',
        required: true,
        description: `The ID of the dashboard that contains the item`,
      },
      {
        name: 'itemId',
        type: 'string',
        required: true,
        description: `The ID of the dashboard item to list property keys for`,
      },
    ],
  },
  {
    name: 'jira_dashboard_item_property_set',
    description: `Set the value of a property on a Jira dashboard item. Use this to store custom data against a dashboard item (gadget). The value must be a valid JSON string; for the reserved key "config" on items without a complete module key, the value must be a JSON object whose keys and values are all strings.`,
    params: [
      {
        name: 'dashboardId',
        type: 'string',
        required: true,
        description: `The ID of the dashboard that contains the item`,
      },
      {
        name: 'itemId',
        type: 'string',
        required: true,
        description: `The ID of the dashboard item to set the property on`,
      },
      {
        name: 'propertyKey',
        type: 'string',
        required: true,
        description: `The key of the dashboard item property to set. Maximum length 255 characters. If set to "config" for an item with a spec URI and no complete module key, the value must be an object with all string keys and values.`,
      },
      {
        name: 'value',
        type: 'string',
        required: true,
        description: `The JSON value to store for the property, as a JSON string (e.g. '{"refreshInterval": 60}')`,
      },
    ],
  },
  {
    name: 'jira_dashboard_update',
    description: `Update a Jira dashboard, replacing all its details (name, description, edit permissions, and share permissions) with the ones provided. The dashboard must be owned by the authenticated user.`,
    params: [
      {
        name: 'editPermissions',
        type: 'array',
        required: true,
        description: `Array of share permission objects controlling who can edit the dashboard. Each object needs a "type" (user, group, project, projectRole, global, loggedin, authenticated) and, depending on type, a group/project/role/user reference. Example: [{"type": "global"}]`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the dashboard to update`,
      },
      { name: 'name', type: 'string', required: true, description: `The name of the dashboard` },
      {
        name: 'sharePermissions',
        type: 'array',
        required: true,
        description: `Array of share permission objects controlling who can view the dashboard. Each object needs a "type" (user, group, project, projectRole, global, loggedin, authenticated) and, depending on type, a group/project/role/user reference. Example: [{"type": "global"}]`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `The description of the dashboard`,
      },
      {
        name: 'extendAdminPermissions',
        type: 'boolean',
        required: false,
        description: `Whether admin-level permissions are used for this update. Should only be true if the authenticated user has the Administer Jira global permission.`,
      },
    ],
  },
  {
    name: 'jira_dashboards_bulk_edit',
    description: `Bulk edits up to 100 dashboards at once, applying a single action (changeOwner, changePermission, addPermission, or removePermission) across a list of dashboard IDs. The dashboards must be owned by the authenticated user, or the user must be an administrator. changeOwnerDetails is required for changeOwner; permissionDetails is required for the permission-related actions.`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: true,
        description: `The bulk edit action to perform on the specified dashboards.`,
      },
      {
        name: 'entityIds',
        type: 'array',
        required: true,
        description: `Array of numeric dashboard IDs to be edited (maximum 100).`,
      },
      {
        name: 'changeOwnerDetails',
        type: 'object',
        required: false,
        description: `Details of the new owner. Required when action is 'changeOwner'. Shape: {"accountId":"<atlassian-account-id>"}`,
      },
      {
        name: 'extendAdminPermissions',
        type: 'boolean',
        required: false,
        description: `Whether the action is executed with Administer Jira global permission rather than requiring dashboard ownership.`,
      },
      {
        name: 'permissionDetails',
        type: 'object',
        required: false,
        description: `Details of the permission to change, add, or remove. Required when action is changePermission, addPermission, or removePermission. Shape follows a share permission object, e.g. {"editPermissions":[{"type":"loggedin"}],"sharePermissions":[{"type":"global"}]}`,
      },
    ],
  },
  {
    name: 'jira_dashboards_list',
    description: `Returns a list of dashboards owned by or shared with the authenticated user, optionally filtered to only favorite or owned dashboards. Supports pagination via startAt and maxResults. Can be accessed anonymously.`,
    params: [
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Filter applied to the list of dashboards: 'favourite' returns dashboards the user has marked as favorite, 'my' returns dashboards owned by the user.`,
      },
      {
        name: 'maxResults',
        type: 'integer',
        required: false,
        description: `The maximum number of dashboards to return per page. Default is 20.`,
      },
      {
        name: 'startAt',
        type: 'integer',
        required: false,
        description: `The index of the first item to return in a page of results (page offset). Default is 0.`,
      },
    ],
  },
  {
    name: 'jira_dashboards_search',
    description: `Returns a paginated list of dashboards, similar to List Dashboards but with additional filtering options such as name, owner account ID, group, project, and status. When multiple filters are specified, only dashboards matching all of them are returned. Can be accessed anonymously.`,
    params: [
      {
        name: 'accountId',
        type: 'string',
        required: false,
        description: `User account ID used to return dashboards matching owner.accountId. Cannot be used together with the owner parameter.`,
      },
      {
        name: 'dashboardName',
        type: 'string',
        required: false,
        description: `String used to perform a case-insensitive partial match against the dashboard name.`,
      },
      {
        name: 'expand',
        type: 'string',
        required: false,
        description: `Comma-separated list of additional dashboard data to include, e.g. description, owner, viewUrl, sharePermissions, editPermissions, isFavourite.`,
      },
      {
        name: 'groupId',
        type: 'string',
        required: false,
        description: `Group ID used to return dashboards shared with a group matching sharePermissions.group.groupId. Cannot be used together with the groupname parameter.`,
      },
      {
        name: 'groupname',
        type: 'string',
        required: false,
        description: `Group name used to return dashboards shared with a group matching sharePermissions.group.name. Deprecated in favor of groupId. Cannot be used together with groupId.`,
      },
      {
        name: 'maxResults',
        type: 'integer',
        required: false,
        description: `The maximum number of dashboards to return per page. Default is 50.`,
      },
      {
        name: 'orderBy',
        type: 'string',
        required: false,
        description: `Order the results by a field: description, favorite_count, id, is_favorite, name, or owner. Prefix with '-' or '+' to control sort direction.`,
      },
      {
        name: 'owner',
        type: 'string',
        required: false,
        description: `Deprecated due to privacy changes; use accountId instead. User name used to return dashboards matching owner.name. Cannot be used together with accountId.`,
      },
      {
        name: 'projectId',
        type: 'integer',
        required: false,
        description: `Project ID used to return dashboards shared with a project matching sharePermissions.project.id.`,
      },
      {
        name: 'startAt',
        type: 'integer',
        required: false,
        description: `The index of the first item to return in a page of results (page offset). Default is 0.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `The status to filter dashboards by: active, archived, or deleted. Default is active.`,
      },
    ],
  },
  {
    name: 'jira_default_priority_set',
    description: `Set the default issue priority for the Jira site. Provide the ID of an existing priority to make it the default, or null to erase the default priority setting. Requires Administer Jira global permission.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the priority to set as default. Must be an existing priority ID, or null to erase the default priority setting.`,
      },
    ],
  },
  {
    name: 'jira_default_resolution_set',
    description: `Set the default issue resolution for the Jira site. Requires the Administer Jira global permission. Pass the ID of an existing resolution to make it the default, or null to erase the default resolution setting.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the resolution to set as the default. Must be an existing resolution ID, or null to clear the default resolution setting.`,
      },
    ],
  },
  {
    name: 'jira_default_share_scope_get',
    description: `Retrieve the default sharing settings applied to new filters and dashboards created by the current user (e.g. GLOBAL or AUTHENTICATED).`,
    params: [],
  },
  {
    name: 'jira_default_share_scope_set',
    description: `Set the default sharing scope for new filters and dashboards created by the authenticated user. Choose GLOBAL/AUTHENTICATED to share with all logged-in users by default, or PRIVATE to keep new filters and dashboards unshared by default.`,
    params: [
      {
        name: 'scope',
        type: 'string',
        required: true,
        description: `The default sharing scope for new filters and dashboards. GLOBAL and AUTHENTICATED both share with all logged-in users (GLOBAL is returned as AUTHENTICATED in the API response). PRIVATE means not shared with any users by default.`,
      },
    ],
  },
  {
    name: 'jira_epic_get',
    description: `Retrieve details of a Jira Software epic by its ID or key, including its name, summary, color, and done status. The epic is only returned if the requesting user has permission to view it. Does not work for epics in next-gen (team-managed) projects.`,
    params: [
      {
        name: 'epicIdOrKey',
        type: 'string',
        required: true,
        description: `The ID or key of the epic to retrieve.`,
      },
    ],
  },
  {
    name: 'jira_epic_issues_list',
    description: `Retrieve all issues that belong to a given Jira Software epic, including Agile fields such as sprint, closedSprints, flagged, and epic. Results are ordered by rank by default and only include issues the requesting user has permission to view. Not for use with next-gen (team-managed) projects — use JQL search with the parent clause instead.`,
    params: [
      {
        name: 'epicIdOrKey',
        type: 'string',
        required: true,
        description: `The ID or key of the epic whose issues should be listed.`,
      },
      {
        name: 'expand',
        type: 'string',
        required: false,
        description: `A comma-separated list of the parameters to expand in the response.`,
      },
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: `List of fields to return for each issue, as an array of field names.`,
      },
      {
        name: 'jql',
        type: 'string',
        required: false,
        description: `A JQL query used to further filter the issues returned for the epic.`,
      },
      {
        name: 'maxResults',
        type: 'integer',
        required: false,
        description: `The maximum number of issues to return per page.`,
      },
      {
        name: 'startAt',
        type: 'integer',
        required: false,
        description: `The index of the first issue to return (0-based), used for pagination.`,
      },
      {
        name: 'validateQuery',
        type: 'boolean',
        required: false,
        description: `Whether to validate the JQL query.`,
      },
    ],
  },
  {
    name: 'jira_epic_issues_move',
    description: `Move a set of issues to a Jira Software epic, given the epic's ID or key. An issue can only belong to one epic at a time, so issues already assigned to a different epic will be reassigned. The requesting user needs edit permission for all issues and for the epic. At most 50 issues may be moved in a single call. Does not work for epics in next-gen (team-managed) projects. Returns no content on success.`,
    params: [
      {
        name: 'epicIdOrKey',
        type: 'string',
        required: true,
        description: `The ID or key of the epic that the issues should be moved into.`,
      },
      {
        name: 'issues',
        type: 'array',
        required: true,
        description: `Array of issue ID or key strings to move into the epic (max 50 per call). Example: ["PR-10", "PR-11"]`,
      },
    ],
  },
  {
    name: 'jira_epic_issues_remove',
    description: `Remove a set of issues from their epics. The requesting user needs edit permission for all issues being removed. At most 50 issues may be removed in a single call. Does not work for epics in next-gen (team-managed) projects — instead update the issue with { fields: { parent: {} } }. Returns no content on success.`,
    params: [
      {
        name: 'issues',
        type: 'array',
        required: true,
        description: `Array of issue ID or key strings to remove from their current epic (max 50 per call). Example: ["PR-10", "PR-11"]`,
      },
    ],
  },
  {
    name: 'jira_epic_issues_without_epic_list',
    description: `Retrieve all issues that do not belong to any epic, including Agile fields such as sprint, closedSprints, flagged, and epic. Only includes issues the requesting user has permission to view. Results are ordered by rank by default. Not for use with next-gen (team-managed) projects — use JQL search with the 'parent is empty' clause instead.`,
    params: [
      {
        name: 'expand',
        type: 'string',
        required: false,
        description: `A comma-separated list of the parameters to expand in the response.`,
      },
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: `List of fields to return for each issue, as an array of field names.`,
      },
      {
        name: 'jql',
        type: 'string',
        required: false,
        description: `A JQL query used to further filter the issues returned.`,
      },
      {
        name: 'maxResults',
        type: 'integer',
        required: false,
        description: `The maximum number of issues to return per page.`,
      },
      {
        name: 'startAt',
        type: 'integer',
        required: false,
        description: `The index of the first issue to return (0-based), used for pagination.`,
      },
      {
        name: 'validateQuery',
        type: 'boolean',
        required: false,
        description: `Whether to validate the JQL query.`,
      },
    ],
  },
  {
    name: 'jira_epic_rank',
    description: `Move (rank) a Jira Software epic before or after another given epic. If rankCustomFieldId is not provided, the default rank field is used. Exactly one of Rank After Epic or Rank Before Epic should be provided. Does not work for epics in next-gen (team-managed) projects. Returns no content on success.`,
    params: [
      {
        name: 'epicIdOrKey',
        type: 'string',
        required: true,
        description: `The ID or key of the epic to rank relative to another epic.`,
      },
      {
        name: 'rankAfterEpic',
        type: 'string',
        required: false,
        description: `The ID or key of the epic that this epic should be ranked after.`,
      },
      {
        name: 'rankBeforeEpic',
        type: 'string',
        required: false,
        description: `The ID or key of the epic that this epic should be ranked before.`,
      },
      {
        name: 'rankCustomFieldId',
        type: 'integer',
        required: false,
        description: `The custom field ID of the Rank field to use for ranking, if the default rank field should not be used.`,
      },
    ],
  },
  {
    name: 'jira_epic_update',
    description: `Perform a partial update of a Jira Software epic. Fields not present in the request are left unchanged. Valid values for color.key are color_1 through color_9. Does not work for epics in next-gen (team-managed) projects. Returns the updated epic on success.`,
    params: [
      {
        name: 'epicIdOrKey',
        type: 'string',
        required: true,
        description: `The ID or key of the epic to update.`,
      },
      {
        name: 'colorKey',
        type: 'string',
        required: false,
        description: `The color key to assign to the epic. Valid values are color_1 through color_9.`,
      },
      {
        name: 'done',
        type: 'boolean',
        required: false,
        description: `Whether the epic should be marked as done.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `The epic name (the short label shown on the epic's issues, distinct from the issue summary).`,
      },
      {
        name: 'summary',
        type: 'string',
        required: false,
        description: `The epic's issue summary (title).`,
      },
    ],
  },
  {
    name: 'jira_events_get',
    description: `Retrieve all issue events configured in Jira. Issue events are the events that trigger notifications (e.g. Issue Created, Issue Updated, Issue Assigned). Requires the Administer Jira global permission.`,
    params: [],
  },
  {
    name: 'jira_favourite_filters_get',
    description: `Retrieve the visible favorite filters of the authenticated user. A favorite filter is visible if it is owned by the user, shared with a group the user belongs to, shared with a project the user can browse, or shared publicly. Can be called anonymously, though results will be empty without authentication.`,
    params: [
      {
        name: 'expand',
        type: 'string',
        required: false,
        description: `Comma-separated list of additional filter data to include in the response, such as sharedUsers (users the filter is shared with) or subscriptions.`,
      },
    ],
  },
  {
    name: 'jira_field_project_associations_get',
    description: `Retrieve a paginated list of project associations for a given custom field. Each association contains the ID of a project the field is associated with. Requires the Administer Jira global permission.`,
    params: [
      {
        name: 'fieldId',
        type: 'string',
        required: true,
        description: `The ID of the field, for example customfield_10000`,
      },
      {
        name: 'maxResults',
        type: 'integer',
        required: false,
        description: `The maximum number of items to return per page.`,
      },
      {
        name: 'startAt',
        type: 'integer',
        required: false,
        description: `The index of the first item to return in a page of results (page offset).`,
      },
    ],
  },
  {
    name: 'jira_field_search',
    description: `Search for Jira fields by name, type, or other criteria with pagination support. Returns paginated field results.`,
    params: [
      {
        name: 'maxResults',
        type: 'integer',
        required: false,
        description: `Maximum number of fields to return (default 50)`,
      },
      {
        name: 'orderBy',
        type: 'string',
        required: false,
        description: `Sort by: contextsCount, lastUsed, name, screensCount, or -prefixed for descending`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Search query to filter fields by name (case-insensitive)`,
      },
      {
        name: 'startAt',
        type: 'integer',
        required: false,
        description: `Index of the first field to return (default 0)`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Filter by field type: custom or system`,
      },
    ],
  },
  {
    name: 'jira_fields_list',
    description: `Get all system and custom fields available in Jira. Returns field IDs, names, types, and whether they are custom or system fields. Use field IDs when referencing fields in JQL or issue creation.`,
    params: [],
  },
  {
    name: 'jira_filter_columns_get',
    description: `Retrieve the columns configured for a filter. This column configuration is used when the filter's results are viewed in List View with Columns set to Filter. Can be called anonymously, though column details are only returned for filters visible to the caller.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The numeric ID of the filter to retrieve column configuration for.`,
      },
    ],
  },
  {
    name: 'jira_filter_columns_reset',
    description: `Reset the authenticated user's column configuration for a filter back to the system default. Columns can only be reset for filters that are owned by the user, shared with a group the user belongs to, shared with a project the user can browse, or shared publicly.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The numeric ID of the filter whose column configuration should be reset to the default.`,
      },
    ],
  },
  {
    name: 'jira_filter_columns_set',
    description: `Set the columns displayed for a filter's results in List View. Only navigable fields can be set as columns; use the Get Fields tool to find fields with navigable set to true. Columns can only be set for filters owned by the user, shared with a group the user belongs to, shared with a project the user can browse, or shared publicly.`,
    params: [
      {
        name: 'columns',
        type: 'array',
        required: true,
        description: `Ordered list of navigable field IDs to use as the filter's columns. Example: ["summary", "status", "assignee"].`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The numeric ID of the filter to set column configuration for.`,
      },
    ],
  },
  {
    name: 'jira_filter_create',
    description: `Create a saved Jira filter with a JQL query. Filters can be shared, added to favorites, and used on Jira dashboards.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Name of the filter (must be unique for the user)`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description of what this filter shows`,
      },
      {
        name: 'favourite',
        type: 'boolean',
        required: false,
        description: `Whether to add this filter to favorites immediately`,
      },
      {
        name: 'jql',
        type: 'string',
        required: false,
        description: `JQL query string for this filter`,
      },
    ],
  },
  {
    name: 'jira_filter_delete',
    description: `Permanently delete a saved Jira filter. Only the filter owner or admins can delete a filter. This action cannot be undone.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The filter ID to delete` },
    ],
  },
  {
    name: 'jira_filter_favourite_delete',
    description: `Remove a filter from the authenticated user's favorites list. This only removes filters currently visible to the user; if a favorited public filter is later made private, it cannot be removed from favorites via this operation because it is no longer visible.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The numeric ID of the filter to remove from favorites.`,
      },
      {
        name: 'expand',
        type: 'string',
        required: false,
        description: `Comma-separated list of additional filter data to include in the response, such as sharedUsers (users the filter is shared with) or subscriptions.`,
      },
    ],
  },
  {
    name: 'jira_filter_favourite_set',
    description: `Add a filter to the authenticated user's favorites list. The user can only favorite filters that are owned by them, shared with a group they belong to, shared with a project they can browse, or shared publicly.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The numeric ID of the filter to add to favorites.`,
      },
      {
        name: 'expand',
        type: 'string',
        required: false,
        description: `Comma-separated list of additional filter data to include in the response, such as sharedUsers (users the filter is shared with) or subscriptions.`,
      },
    ],
  },
  {
    name: 'jira_filter_get',
    description: `Retrieve a saved Jira filter by its ID, including the JQL query, name, owner, and share permissions.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The filter ID to retrieve` },
      {
        name: 'expand',
        type: 'string',
        required: false,
        description: `Additional data to include (e.g. sharedUsers, subscriptions)`,
      },
    ],
  },
  {
    name: 'jira_filter_owner_change',
    description: `Change the owner of a saved Jira filter to a different user. The caller must either own the filter or hold the Administer Jira global permission.`,
    params: [
      {
        name: 'accountId',
        type: 'string',
        required: true,
        description: `The Atlassian account ID of the user who will become the new owner of the filter.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The numeric ID of the filter to change ownership of.`,
      },
    ],
  },
  {
    name: 'jira_filter_share_permissions_get',
    description: `Retrieve the share permissions for a saved Jira filter. A filter can be shared with groups, projects, all logged-in users, or the public (the latter two are known as global share permissions). Can be called anonymously, though permissions are only returned for filters visible to the caller.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The numeric ID of the filter to retrieve share permissions for.`,
      },
    ],
  },
  {
    name: 'jira_filter_update',
    description: `Update a saved Jira filter's name, description, or JQL query. Only the filter owner or admins can update a filter.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The filter ID to update` },
      { name: 'name', type: 'string', required: true, description: `Updated filter name` },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Updated description of the filter`,
      },
      { name: 'jql', type: 'string', required: false, description: `Updated JQL query string` },
    ],
  },
  {
    name: 'jira_filters_search',
    description: `Search for saved Jira filters with pagination. Filter results by name, owner, project, or group. Returns filter details including JQL queries.`,
    params: [
      {
        name: 'accountId',
        type: 'string',
        required: false,
        description: `Filter by filter owner account ID`,
      },
      {
        name: 'expand',
        type: 'string',
        required: false,
        description: `Additional data to include (e.g. description, favourite, sharePermissions)`,
      },
      {
        name: 'filterName',
        type: 'string',
        required: false,
        description: `Search by filter name (partial match, case-insensitive)`,
      },
      {
        name: 'maxResults',
        type: 'integer',
        required: false,
        description: `Maximum number of filters to return (default 50)`,
      },
      {
        name: 'orderBy',
        type: 'string',
        required: false,
        description: `Field to order by (e.g. name, id, owner, favourite_count, is_favourite)`,
      },
      {
        name: 'startAt',
        type: 'integer',
        required: false,
        description: `Index of the first filter to return (default 0)`,
      },
    ],
  },
  {
    name: 'jira_gadget_add',
    description: `Add a gadget to a Jira dashboard. Specify either a moduleKey or a uri to identify the gadget type (not both), along with an optional title, color, and position on the dashboard.`,
    params: [
      {
        name: 'dashboardId',
        type: 'integer',
        required: true,
        description: `The ID of the dashboard to add the gadget to`,
      },
      {
        name: 'color',
        type: 'string',
        required: false,
        description: `The color of the gadget. Must be one of: blue, red, yellow, green, cyan, purple, gray, white.`,
      },
      {
        name: 'ignoreUriAndModuleKeyValidation',
        type: 'boolean',
        required: false,
        description: `Whether to ignore validation of the module key and URI. Useful when the gadget belongs to an app that isn't installed.`,
      },
      {
        name: 'moduleKey',
        type: 'string',
        required: false,
        description: `The module key of the gadget type to add. Cannot be provided together with uri.`,
      },
      {
        name: 'position',
        type: 'object',
        required: false,
        description: `The position of the gadget on the dashboard, as a column/row object, e.g. {"column": 0, "row": 0}`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `The title of the gadget as displayed on the dashboard.`,
      },
      {
        name: 'uri',
        type: 'string',
        required: false,
        description: `The URI of the gadget type to add. Cannot be provided together with moduleKey.`,
      },
    ],
  },
  {
    name: 'jira_gadget_delete',
    description: `Remove a gadget from a Jira dashboard. Other gadgets in the same column are moved up to fill the emptied position.`,
    params: [
      {
        name: 'dashboardId',
        type: 'integer',
        required: true,
        description: `The ID of the dashboard the gadget belongs to`,
      },
      {
        name: 'gadgetId',
        type: 'integer',
        required: true,
        description: `The ID of the gadget to remove`,
      },
    ],
  },
  {
    name: 'jira_gadget_update',
    description: `Change the title, position, and color of a gadget on a Jira dashboard.`,
    params: [
      {
        name: 'dashboardId',
        type: 'integer',
        required: true,
        description: `The ID of the dashboard the gadget belongs to`,
      },
      {
        name: 'gadgetId',
        type: 'integer',
        required: true,
        description: `The ID of the gadget to update`,
      },
      {
        name: 'color',
        type: 'string',
        required: false,
        description: `The new color of the gadget. Must be one of: blue, red, yellow, green, cyan, purple, gray, white.`,
      },
      {
        name: 'position',
        type: 'object',
        required: false,
        description: `The new position of the gadget, as a column/row object, e.g. {"column": 1, "row": 0}`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `The new title of the gadget as displayed on the dashboard.`,
      },
    ],
  },
  {
    name: 'jira_group_member_add',
    description: `Add a user to a Jira group. Requires Administer Jira global permission or the Site Administration role.`,
    params: [
      {
        name: 'accountId',
        type: 'string',
        required: true,
        description: `Account ID of the user to add to the group`,
      },
      {
        name: 'groupId',
        type: 'string',
        required: false,
        description: `The group ID to add the user to (use instead of groupname)`,
      },
      {
        name: 'groupname',
        type: 'string',
        required: false,
        description: `The group name to add the user to`,
      },
    ],
  },
  {
    name: 'jira_group_member_remove',
    description: `Remove a user from a Jira group by their account ID. Requires Administer Jira global permission.`,
    params: [
      {
        name: 'accountId',
        type: 'string',
        required: true,
        description: `Account ID of the user to remove from the group`,
      },
      {
        name: 'groupId',
        type: 'string',
        required: false,
        description: `The group ID to remove the user from (use instead of groupname)`,
      },
      {
        name: 'groupname',
        type: 'string',
        required: false,
        description: `The group name to remove the user from`,
      },
    ],
  },
  {
    name: 'jira_group_members_list',
    description: `Get a paginated list of users in a Jira group. Returns account IDs, display names, and email addresses of group members.`,
    params: [
      {
        name: 'groupId',
        type: 'string',
        required: false,
        description: `The group ID to list members of (use instead of groupname)`,
      },
      {
        name: 'groupname',
        type: 'string',
        required: false,
        description: `The group name to list members of`,
      },
      {
        name: 'includeInactiveUsers',
        type: 'boolean',
        required: false,
        description: `Whether to include inactive (deactivated) users in the results`,
      },
      {
        name: 'maxResults',
        type: 'integer',
        required: false,
        description: `Maximum number of members to return (default 50)`,
      },
      {
        name: 'startAt',
        type: 'integer',
        required: false,
        description: `Index of the first member to return (default 0)`,
      },
    ],
  },
  {
    name: 'jira_groups_find',
    description: `Find Jira user groups by name. Returns groups whose names match the query. Useful for finding group names to use in permission schemes or visibility restrictions.`,
    params: [
      {
        name: 'accountId',
        type: 'string',
        required: false,
        description: `Filter to only return groups the user with this account ID belongs to`,
      },
      {
        name: 'excludeId',
        type: 'string',
        required: false,
        description: `Group IDs to exclude from results (comma-separated)`,
      },
      {
        name: 'maxResults',
        type: 'integer',
        required: false,
        description: `Maximum number of groups to return (default 20)`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Search string to match against group names`,
      },
    ],
  },
  {
    name: 'jira_is_watching_issue_bulk_get',
    description: `Returns, for the current user, the watched status of a list of Jira issues by ID. If an issue ID is invalid, its watched status is returned as false. Requires the 'Allow users to watch issues' option to be enabled and Browse Projects permission.`,
    params: [
      {
        name: 'issueIds',
        type: 'array',
        required: true,
        description: `List of issue IDs to check watched status for`,
      },
    ],
  },
  {
    name: 'jira_issue_assign',
    description: `Assign or unassign a Jira issue to a user. Pass an accountId to assign, or omit/null to unassign. The user must have the Assign Issues project permission.`,
    params: [
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `The issue ID or key to assign (e.g. PROJ-123)`,
      },
      {
        name: 'accountId',
        type: 'string',
        required: false,
        description: `Account ID of the user to assign. Leave null or omit to unassign.`,
      },
    ],
  },
  {
    name: 'jira_issue_changelog_list',
    description: `Get the paginated change history for a Jira issue. Returns a list of changelog entries showing which fields changed, who changed them, and when.`,
    params: [
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `The issue ID or key to retrieve changelog for`,
      },
      {
        name: 'maxResults',
        type: 'integer',
        required: false,
        description: `Maximum number of changelog entries to return (default 100)`,
      },
      {
        name: 'startAt',
        type: 'integer',
        required: false,
        description: `Index of the first entry to return for pagination (default 0)`,
      },
    ],
  },
  {
    name: 'jira_issue_changelogs_by_ids_get',
    description: `Return changelogs for a single Jira issue, filtered to a specific list of changelog IDs. Requires Browse Projects permission for the project the issue belongs to.`,
    params: [
      {
        name: 'changelogIds',
        type: 'array',
        required: true,
        description: `List of changelog IDs to retrieve`,
      },
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `The ID or key of the issue`,
      },
    ],
  },
  {
    name: 'jira_issue_comment_add',
    description: `Add a comment to a Jira issue. The comment body is plain text and will be wrapped in ADF (Atlassian Document Format) for the v3 API. Optionally restrict visibility to a specific role or group.`,
    params: [
      {
        name: 'body',
        type: 'string',
        required: true,
        description: `The plain-text content of the comment`,
      },
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `The issue ID or key to add the comment to`,
      },
      {
        name: 'visibility_type',
        type: 'string',
        required: false,
        description: `Restrict comment visibility by type: 'role' or 'group'`,
      },
      {
        name: 'visibility_value',
        type: 'string',
        required: false,
        description: `Name of the role or group to restrict visibility to`,
      },
    ],
  },
  {
    name: 'jira_issue_comment_delete',
    description: `Permanently delete a comment from a Jira issue. Only the comment author or users with Administer Projects permission can delete comments. This action cannot be undone.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The comment ID to delete` },
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `The issue ID or key the comment belongs to`,
      },
    ],
  },
  {
    name: 'jira_issue_comment_get',
    description: `Retrieve a specific comment on a Jira issue by comment ID. Returns the comment body, author, and timestamps.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The comment ID to retrieve` },
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `The issue ID or key the comment belongs to`,
      },
      {
        name: 'expand',
        type: 'string',
        required: false,
        description: `Additional fields to include (e.g. renderedBody for HTML content)`,
      },
    ],
  },
  {
    name: 'jira_issue_comment_update',
    description: `Update the body of an existing comment on a Jira issue. Only the comment author or users with Administer Projects permission can update comments.`,
    params: [
      {
        name: 'body',
        type: 'string',
        required: true,
        description: `The new plain-text content for the comment`,
      },
      { name: 'id', type: 'string', required: true, description: `The comment ID to update` },
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `The issue ID or key the comment belongs to`,
      },
      {
        name: 'notifyUsers',
        type: 'boolean',
        required: false,
        description: `Whether to send notifications to watchers (default true)`,
      },
    ],
  },
  {
    name: 'jira_issue_comments_list',
    description: `Get all comments for a Jira issue with pagination support. Returns comment bodies, author details, and timestamps. Use expand=renderedBody to get HTML-rendered comment content.`,
    params: [
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `The issue ID or key to list comments for`,
      },
      {
        name: 'expand',
        type: 'string',
        required: false,
        description: `Additional fields to include (e.g. renderedBody for HTML content)`,
      },
      {
        name: 'maxResults',
        type: 'integer',
        required: false,
        description: `Maximum number of comments to return (default 50)`,
      },
      {
        name: 'orderBy',
        type: 'string',
        required: false,
        description: `Field to order by (created or -created for descending)`,
      },
      {
        name: 'startAt',
        type: 'integer',
        required: false,
        description: `Index of the first comment to return (default 0)`,
      },
    ],
  },
  {
    name: 'jira_issue_create',
    description: `Create a new Jira issue or subtask in a specified project. Requires a project key, issue type, and summary. Supports assigning users, setting priority, labels, components, parent issue (for subtasks), and a plain-text description.`,
    params: [
      {
        name: 'issue_type',
        type: 'string',
        required: true,
        description: `Name of the issue type (e.g. Bug, Story, Task, Sub-task)`,
      },
      {
        name: 'project_key',
        type: 'string',
        required: true,
        description: `Key of the project to create the issue in (e.g. PROJ)`,
      },
      {
        name: 'summary',
        type: 'string',
        required: true,
        description: `Short summary or title of the issue`,
      },
      {
        name: 'assignee_account_id',
        type: 'string',
        required: false,
        description: `Account ID of the user to assign this issue to`,
      },
      {
        name: 'components',
        type: 'array',
        required: false,
        description: `List of component names to associate with this issue`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Plain-text description of the issue (wrapped in ADF for v3 API)`,
      },
      {
        name: 'fix_versions',
        type: 'array',
        required: false,
        description: `List of version names to set as fix versions`,
      },
      {
        name: 'labels',
        type: 'array',
        required: false,
        description: `List of labels to apply to the issue`,
      },
      {
        name: 'parent_key',
        type: 'string',
        required: false,
        description: `Key of the parent issue (required for Sub-task issue type)`,
      },
      {
        name: 'priority_name',
        type: 'string',
        required: false,
        description: `Priority name for the issue (e.g. Highest, High, Medium, Low, Lowest)`,
      },
    ],
  },
  {
    name: 'jira_issue_create_meta_fields_get',
    description: `Get a page of field metadata for a specified project and issue type, describing which fields are required, their allowed values, and schema. Use this to populate the request body for Create Issue. Requires the 'Create issues' project permission and can be accessed anonymously.`,
    params: [
      {
        name: 'issueTypeId',
        type: 'string',
        required: true,
        description: `The ID of the issue type to get field metadata for`,
      },
      {
        name: 'projectIdOrKey',
        type: 'string',
        required: true,
        description: `The ID or key of the project`,
      },
      {
        name: 'maxResults',
        type: 'integer',
        required: false,
        description: `Maximum number of items to return per page (up to 200)`,
      },
      {
        name: 'startAt',
        type: 'integer',
        required: false,
        description: `Index of the first item to return in a page of results`,
      },
    ],
  },
  {
    name: 'jira_issue_create_meta_issue_types_list',
    description: `List the issue types available when creating an issue in a specified Jira project, including their metadata. Use this to populate valid issue_type values before calling Create Issue. Requires the 'Create issues' project permission and can be accessed anonymously.`,
    params: [
      {
        name: 'projectIdOrKey',
        type: 'string',
        required: true,
        description: `The ID or key of the project to get creatable issue types for`,
      },
      {
        name: 'maxResults',
        type: 'integer',
        required: false,
        description: `Maximum number of items to return per page (up to 200)`,
      },
      {
        name: 'startAt',
        type: 'integer',
        required: false,
        description: `Index of the first item to return in a page of results`,
      },
    ],
  },
  {
    name: 'jira_issue_delete',
    description: `Permanently delete a Jira issue and all its subtasks (if deleteSubtasks is true). This action cannot be undone. The user must have permission to delete the issue.`,
    params: [
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `The issue ID or key to delete (e.g. PROJ-123)`,
      },
      {
        name: 'deleteSubtasks',
        type: 'string',
        required: false,
        description: `Whether to delete subtasks of this issue (required if the issue has subtasks)`,
      },
    ],
  },
  {
    name: 'jira_issue_edit_meta_get',
    description: `Return the edit screen fields for a Jira issue that are visible to and editable by the current user. Use the result to determine which fields can be sent when editing the issue.`,
    params: [
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `The ID or key of the issue`,
      },
      {
        name: 'overrideEditableFlag',
        type: 'boolean',
        required: false,
        description: `Whether non-editable fields are returned. Requires Administer Jira global permission (default false)`,
      },
      {
        name: 'overrideScreenSecurity',
        type: 'boolean',
        required: false,
        description: `Whether hidden fields are returned. Requires Administer Jira global permission (default false)`,
      },
    ],
  },
  {
    name: 'jira_issue_get',
    description: `Retrieve details of a Jira issue by its ID or key. Returns fields, status, assignee, priority, comments summary, and other metadata. Use the fields parameter to limit the response to specific fields.`,
    params: [
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `The issue ID (e.g. 10001) or key (e.g. PROJ-123) to retrieve`,
      },
      {
        name: 'expand',
        type: 'string',
        required: false,
        description: `Comma-separated list of additional data to include (e.g. renderedFields,names,changelog)`,
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return (use * for all, -field to exclude)`,
      },
      {
        name: 'properties',
        type: 'string',
        required: false,
        description: `Comma-separated list of issue properties to return`,
      },
      {
        name: 'updateHistory',
        type: 'boolean',
        required: false,
        description: `Whether to update the issue's viewed history for the current user`,
      },
    ],
  },
  {
    name: 'jira_issue_limit_report_get',
    description: `Get a report of all Jira issues that are breaching or approaching per-issue limits (e.g. field value size limits). Requires the 'Browse projects' permission for the projects the issues are in, or the 'Administer Jira' global permission for complete results.`,
    params: [
      {
        name: 'isReturningKeys',
        type: 'boolean',
        required: false,
        description: `Whether to return issue keys instead of issue IDs in the response`,
      },
    ],
  },
  {
    name: 'jira_issue_link_create',
    description: `Create a link between two Jira issues with a specified link type (e.g. blocks, is blocked by, relates to, duplicates). Both issues must exist and the user needs Link Issues permission.`,
    params: [
      {
        name: 'inward_issue_key',
        type: 'string',
        required: true,
        description: `Key of the inward issue (the issue on the 'is' side of the link type)`,
      },
      {
        name: 'link_type_name',
        type: 'string',
        required: true,
        description: `Name of the issue link type (e.g. 'Blocks', 'Relates', 'Duplicates', 'Cloners')`,
      },
      {
        name: 'outward_issue_key',
        type: 'string',
        required: true,
        description: `Key of the outward issue (the issue on the 'causes' side of the link type)`,
      },
      {
        name: 'comment',
        type: 'string',
        required: false,
        description: `Optional comment to add when creating the link`,
      },
    ],
  },
  {
    name: 'jira_issue_link_delete',
    description: `Delete a specific issue link by its ID. This removes the relationship between the two linked issues. Requires Link Issues project permission.`,
    params: [
      {
        name: 'linkId',
        type: 'string',
        required: true,
        description: `The issue link ID to delete`,
      },
    ],
  },
  {
    name: 'jira_issue_link_get',
    description: `Retrieve details of a specific issue link by its ID, including the link type and both linked issues.`,
    params: [
      {
        name: 'linkId',
        type: 'string',
        required: true,
        description: `The issue link ID to retrieve`,
      },
    ],
  },
  {
    name: 'jira_issue_link_type_create',
    description: `Create a new issue link type, describing the reasons why issues can be linked together. Consists of a name plus descriptions of the inward and outward relationships. Requires Administer Jira global permission and issue linking must be enabled on the site.`,
    params: [
      {
        name: 'inward',
        type: 'string',
        required: true,
        description: `Description of the inward link relationship`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The name of the issue link type`,
      },
      {
        name: 'outward',
        type: 'string',
        required: true,
        description: `Description of the outward link relationship`,
      },
    ],
  },
  {
    name: 'jira_issue_link_type_delete',
    description: `Delete an issue link type from the Jira instance. Requires issue linking to be enabled on the site and Administer Jira global permission.`,
    params: [
      {
        name: 'issueLinkTypeId',
        type: 'string',
        required: true,
        description: `The ID of the issue link type to delete`,
      },
    ],
  },
  {
    name: 'jira_issue_link_type_get',
    description: `Retrieve details of a single issue link type by its ID, including its name and the inward/outward relationship descriptions (e.g. blocks/is blocked by). Requires issue linking to be enabled on the site.`,
    params: [
      {
        name: 'issueLinkTypeId',
        type: 'string',
        required: true,
        description: `The ID of the issue link type to retrieve`,
      },
    ],
  },
  {
    name: 'jira_issue_link_type_update',
    description: `Update the name, inward description, or outward description of an existing issue link type. Requires issue linking to be enabled on the site and Administer Jira global permission.`,
    params: [
      {
        name: 'issueLinkTypeId',
        type: 'string',
        required: true,
        description: `The ID of the issue link type to update`,
      },
      {
        name: 'inward',
        type: 'string',
        required: false,
        description: `The description of the issue link type's inward link (e.g. 'is blocked by')`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `The name of the issue link type (e.g. 'Blocks')`,
      },
      {
        name: 'outward',
        type: 'string',
        required: false,
        description: `The description of the issue link type's outward link (e.g. 'blocks')`,
      },
    ],
  },
  {
    name: 'jira_issue_link_types_list',
    description: `Return a list of all issue link types configured in the Jira site. Requires issue linking to be enabled and Browse Projects permission for at least one project.`,
    params: [],
  },
  {
    name: 'jira_issue_notify',
    description: `Create an email notification for a Jira issue and add it to the mail queue. Notifications can be sent to the reporter, assignee, watchers, voters, or an explicit list of account IDs and group names, and can optionally be restricted to users with a specific permission or group.`,
    params: [
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `ID or key of the issue that the notification is sent for`,
      },
      {
        name: 'htmlBody',
        type: 'string',
        required: false,
        description: `HTML body of the email notification`,
      },
      {
        name: 'notify_assignee',
        type: 'boolean',
        required: false,
        description: `Whether to notify the issue assignee`,
      },
      {
        name: 'notify_reporter',
        type: 'boolean',
        required: false,
        description: `Whether to notify the issue reporter`,
      },
      {
        name: 'notify_voters',
        type: 'boolean',
        required: false,
        description: `Whether to notify all voters of the issue`,
      },
      {
        name: 'notify_watchers',
        type: 'boolean',
        required: false,
        description: `Whether to notify all watchers of the issue`,
      },
      {
        name: 'recipient_account_ids',
        type: 'array',
        required: false,
        description: `List of additional Atlassian account IDs to notify`,
      },
      {
        name: 'recipient_group_names',
        type: 'array',
        required: false,
        description: `List of group names to notify`,
      },
      {
        name: 'restrict_group_names',
        type: 'array',
        required: false,
        description: `Restrict the notification to users who are members of these groups`,
      },
      {
        name: 'restrict_permissions',
        type: 'array',
        required: false,
        description: `Restrict the notification to users who have these permission keys`,
      },
      {
        name: 'subject',
        type: 'string',
        required: false,
        description: `Subject of the email notification. If not specified, defaults to the issue key and summary`,
      },
      {
        name: 'textBody',
        type: 'string',
        required: false,
        description: `Plain text body of the email notification`,
      },
    ],
  },
  {
    name: 'jira_issue_picker_suggestions_get',
    description: `Get lists of Jira issues matching a query string, for use in auto-completion when a user is searching for an issue by a word or string. Returns a 'History Search' list (from the user's history of created, edited, or viewed issues) and a 'Current Search' list (from issues matching an optional JQL expression), both filtered by the query string.`,
    params: [
      {
        name: 'currentIssueKey',
        type: 'string',
        required: false,
        description: `The key of an issue to exclude from search results (e.g. the issue currently being viewed)`,
      },
      {
        name: 'currentJQL',
        type: 'string',
        required: false,
        description: `A JQL query defining the list of issues to search within. Note: username and userkey cannot be used as search terms here for privacy reasons; use accountId instead.`,
      },
      {
        name: 'currentProjectId',
        type: 'string',
        required: false,
        description: `The ID of a project that suggested issues must belong to`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Text to match against issue fields such as title, description, or comments`,
      },
      {
        name: 'showSubTaskParent',
        type: 'boolean',
        required: false,
        description: `When currentIssueKey is a subtask, whether to include the parent issue in the suggestions if it matches the query`,
      },
      {
        name: 'showSubTasks',
        type: 'boolean',
        required: false,
        description: `Whether to include subtasks in the suggestions list`,
      },
    ],
  },
  {
    name: 'jira_issue_property_delete',
    description: `Delete a custom property from a Jira issue by its property key.`,
    params: [
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `The issue ID or key the property belongs to`,
      },
      {
        name: 'propertyKey',
        type: 'string',
        required: true,
        description: `The key of the property to delete`,
      },
    ],
  },
  {
    name: 'jira_issue_property_get',
    description: `Get the value of a custom property set on a Jira issue by its property key.`,
    params: [
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `The issue ID or key the property belongs to`,
      },
      {
        name: 'propertyKey',
        type: 'string',
        required: true,
        description: `The key of the property to retrieve`,
      },
    ],
  },
  {
    name: 'jira_issue_property_keys_list',
    description: `Get the keys of all custom properties set on a Jira issue. Issue properties are key-value stores attached to issues for storing custom data.`,
    params: [
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `The issue ID or key to list property keys for`,
      },
    ],
  },
  {
    name: 'jira_issue_property_set',
    description: `Set or update a custom property on a Jira issue. Properties can store arbitrary JSON values and are visible to apps and API consumers. The value must be a valid JSON string.`,
    params: [
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `The issue ID or key to set the property on`,
      },
      {
        name: 'propertyKey',
        type: 'string',
        required: true,
        description: `The key name for the property`,
      },
      {
        name: 'value',
        type: 'string',
        required: true,
        description: `The JSON value to store for the property (as a JSON string)`,
      },
    ],
  },
  {
    name: 'jira_issue_remote_link_create',
    description: `Create a remote link from a Jira issue to an external resource (e.g. a GitHub PR, Confluence page, or deployment URL). If a globalId is provided and already exists, the remote link is updated instead.`,
    params: [
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `The issue ID or key to attach the remote link to`,
      },
      { name: 'url', type: 'string', required: true, description: `URL of the remote resource` },
      {
        name: 'url_title',
        type: 'string',
        required: true,
        description: `Display title for the remote link`,
      },
      {
        name: 'globalId',
        type: 'string',
        required: false,
        description: `Global ID that identifies the remote object. Used to deduplicate links.`,
      },
      {
        name: 'relationship',
        type: 'string',
        required: false,
        description: `The relationship label describing how the remote object relates to the issue (e.g. 'fixes', 'is mentioned in')`,
      },
    ],
  },
  {
    name: 'jira_issue_remote_link_delete',
    description: `Delete a remote link from a Jira issue by its link ID or by global ID. Provide either linkId (in the path) or globalId (as query param) to identify the link to delete.`,
    params: [
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `The issue ID or key the remote link belongs to`,
      },
      {
        name: 'globalId',
        type: 'string',
        required: false,
        description: `Delete all remote links matching this global ID (use instead of linkId)`,
      },
      {
        name: 'linkId',
        type: 'string',
        required: false,
        description: `The remote link ID to delete`,
      },
    ],
  },
  {
    name: 'jira_issue_remote_link_get',
    description: `Get a specific remote link on a Jira issue by its link ID.`,
    params: [
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `The issue ID or key the remote link belongs to`,
      },
      {
        name: 'linkId',
        type: 'string',
        required: true,
        description: `The remote link ID to retrieve`,
      },
    ],
  },
  {
    name: 'jira_issue_remote_link_update',
    description: `Update an existing remote link on a Jira issue by its link ID. Can change the URL, title, or relationship label.`,
    params: [
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `The issue ID or key the remote link belongs to`,
      },
      {
        name: 'linkId',
        type: 'string',
        required: true,
        description: `The remote link ID to update`,
      },
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `Updated URL of the remote resource`,
      },
      {
        name: 'url_title',
        type: 'string',
        required: true,
        description: `Updated display title for the remote link`,
      },
      {
        name: 'relationship',
        type: 'string',
        required: false,
        description: `Updated relationship label`,
      },
    ],
  },
  {
    name: 'jira_issue_remote_links_list',
    description: `Get all remote links for a Jira issue. Remote links connect issues to external resources (e.g. GitHub PRs, Confluence pages, deployment URLs).`,
    params: [
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `The issue ID or key to list remote links for`,
      },
      {
        name: 'globalId',
        type: 'string',
        required: false,
        description: `Filter by global ID of the remote link`,
      },
    ],
  },
  {
    name: 'jira_issue_transition',
    description: `Move a Jira issue to a new workflow status using a transition. Use the List Issue Transitions tool to get valid transition IDs. Optionally update fields or add a comment during the transition.`,
    params: [
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `The issue ID or key to transition (e.g. PROJ-123)`,
      },
      {
        name: 'transitionId',
        type: 'string',
        required: true,
        description: `The ID of the transition to perform. Use jira_issue_transitions_list to find valid IDs.`,
      },
      {
        name: 'comment',
        type: 'string',
        required: false,
        description: `Comment to add when performing the transition`,
      },
    ],
  },
  {
    name: 'jira_issue_transitions_list',
    description: `Get the available workflow transitions for a Jira issue. Returns the list of transitions the current user can perform, including transition IDs needed for the transition endpoint.`,
    params: [
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `The issue ID or key to retrieve transitions for`,
      },
      {
        name: 'expand',
        type: 'string',
        required: false,
        description: `Additional data to include (e.g. transitions.fields for field metadata per transition)`,
      },
      {
        name: 'transitionId',
        type: 'string',
        required: false,
        description: `Filter results to only this transition ID`,
      },
    ],
  },
  {
    name: 'jira_issue_type_create',
    description: `Create a new issue type in the Jira instance. Requires Administer Jira global permission. The new type will be available to all projects that use the default issue type scheme.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name of the new issue type` },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description of the issue type`,
      },
      {
        name: 'hierarchyLevel',
        type: 'integer',
        required: false,
        description: `Hierarchy level: -1 for subtask, 0 for standard (default)`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Type classification: subtask or standard (default)`,
      },
    ],
  },
  {
    name: 'jira_issue_type_delete',
    description: `Delete a Jira issue type. If issues of this type exist, you must provide an alternative issue type ID to migrate them to. Requires Administer Jira global permission.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The issue type ID to delete` },
      {
        name: 'alternativeIssueTypeId',
        type: 'string',
        required: false,
        description: `ID of an alternative issue type to migrate existing issues to`,
      },
    ],
  },
  {
    name: 'jira_issue_type_get',
    description: `Retrieve details of a specific Jira issue type by its ID, including name, description, icon URL, and hierarchy level.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The issue type ID to retrieve` },
    ],
  },
  {
    name: 'jira_issue_type_update',
    description: `Update an existing Jira issue type's name or description. Requires Administer Jira global permission.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The issue type ID to update` },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Updated description of the issue type`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Updated name for the issue type`,
      },
    ],
  },
  {
    name: 'jira_issue_types_list',
    description: `Get all issue types available in the Jira instance (e.g. Bug, Story, Task, Epic, Sub-task). Returns issue type IDs, names, icons, and hierarchy levels.`,
    params: [],
  },
  {
    name: 'jira_issue_update',
    description: `Update fields of an existing Jira issue. All fields are optional — only provided fields are changed. Supports updating summary, description, assignee, priority, labels, components, and fix versions.`,
    params: [
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `The issue ID or key to update (e.g. PROJ-123)`,
      },
      {
        name: 'assignee_account_id',
        type: 'string',
        required: false,
        description: `Account ID of the new assignee. Pass empty string to unassign.`,
      },
      {
        name: 'components',
        type: 'array',
        required: false,
        description: `List of component names to set on this issue (replaces existing)`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Updated plain-text description (wrapped in ADF for v3 API)`,
      },
      {
        name: 'fix_versions',
        type: 'array',
        required: false,
        description: `List of version names to set as fix versions (replaces existing)`,
      },
      {
        name: 'labels',
        type: 'array',
        required: false,
        description: `List of labels to set on the issue (replaces existing labels)`,
      },
      {
        name: 'notifyUsers',
        type: 'boolean',
        required: false,
        description: `Whether to send notifications to watchers (default true)`,
      },
      {
        name: 'priority_name',
        type: 'string',
        required: false,
        description: `Updated priority name (e.g. Highest, High, Medium, Low, Lowest)`,
      },
      {
        name: 'summary',
        type: 'string',
        required: false,
        description: `Updated summary/title of the issue`,
      },
    ],
  },
  {
    name: 'jira_issue_vote_add',
    description: `Cast a vote for a Jira issue on behalf of the authenticated user. Voting indicates the user wants this issue resolved. Only non-resolved issues can be voted on.`,
    params: [
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `The issue ID or key to vote on`,
      },
    ],
  },
  {
    name: 'jira_issue_vote_delete',
    description: `Remove the authenticated user's vote from a Jira issue. Only the user who cast the vote can remove it.`,
    params: [
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `The issue ID or key to remove the vote from`,
      },
    ],
  },
  {
    name: 'jira_issue_votes_get',
    description: `Get vote information for a Jira issue, including the total vote count and whether the current user has voted.`,
    params: [
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `The issue ID or key to get votes for`,
      },
    ],
  },
  {
    name: 'jira_issue_watcher_add',
    description: `Add a user as a watcher to a Jira issue. If no accountId is provided, the currently authenticated user is added as a watcher.`,
    params: [
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `The issue ID or key to add a watcher to`,
      },
      {
        name: 'accountId',
        type: 'string',
        required: false,
        description: `Account ID of the user to add as a watcher. Omit to add the authenticated user.`,
      },
    ],
  },
  {
    name: 'jira_issue_watcher_remove',
    description: `Remove a user from the watchers list of a Jira issue. Requires the accountId of the user to remove.`,
    params: [
      {
        name: 'accountId',
        type: 'string',
        required: true,
        description: `Account ID of the user to remove from watchers`,
      },
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `The issue ID or key to remove the watcher from`,
      },
    ],
  },
  {
    name: 'jira_issue_watchers_get',
    description: `Get the list of users watching a Jira issue. Returns the watcher count and user details for each watcher.`,
    params: [
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `The issue ID or key to get watchers for`,
      },
    ],
  },
  {
    name: 'jira_issue_worklog_add',
    description: `Log time worked against a Jira issue. Specify time spent using Jira duration format (e.g. '2h 30m', '1d'). Optionally set the start time and add a comment. Requires Log Work project permission.`,
    params: [
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `The issue ID or key to log time against`,
      },
      {
        name: 'timeSpent',
        type: 'string',
        required: true,
        description: `Time spent in Jira duration format (e.g. '2h 30m', '1d', '45m')`,
      },
      {
        name: 'adjustEstimate',
        type: 'string',
        required: false,
        description: `How to adjust the remaining estimate: 'auto', 'new', 'manual', 'leave' (default auto)`,
      },
      {
        name: 'comment',
        type: 'string',
        required: false,
        description: `Optional comment describing the work done`,
      },
      {
        name: 'newEstimate',
        type: 'string',
        required: false,
        description: `New remaining estimate when adjustEstimate is 'new' or 'manual' (e.g. '2h 30m')`,
      },
      {
        name: 'started',
        type: 'string',
        required: false,
        description: `Date/time when work started in ISO 8601 format (e.g. 2024-01-15T08:00:00.000+0000)`,
      },
    ],
  },
  {
    name: 'jira_issue_worklog_delete',
    description: `Delete a worklog entry from a Jira issue. Only the worklog author or admins can delete worklogs. Optionally adjust the remaining time estimate.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The worklog ID to delete` },
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `The issue ID or key the worklog belongs to`,
      },
      {
        name: 'adjustEstimate',
        type: 'string',
        required: false,
        description: `How to adjust the remaining estimate: 'auto', 'manual', 'leave' (default auto)`,
      },
      {
        name: 'increaseBy',
        type: 'string',
        required: false,
        description: `Amount to increase the remaining estimate by (used when adjustEstimate is 'manual')`,
      },
    ],
  },
  {
    name: 'jira_issue_worklog_get',
    description: `Get a specific worklog entry for a Jira issue by worklog ID. Returns time spent, author, start time, and any associated comment.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The worklog ID to retrieve` },
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `The issue ID or key the worklog belongs to`,
      },
    ],
  },
  {
    name: 'jira_issue_worklog_update',
    description: `Update an existing worklog entry on a Jira issue. Can change the time spent, start time, and comment. Only the worklog author or admins can update worklogs.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The worklog ID to update` },
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `The issue ID or key the worklog belongs to`,
      },
      {
        name: 'adjustEstimate',
        type: 'string',
        required: false,
        description: `How to adjust the remaining estimate: 'auto', 'new', 'manual', 'leave'`,
      },
      {
        name: 'comment',
        type: 'string',
        required: false,
        description: `Updated comment for the worklog`,
      },
      {
        name: 'newEstimate',
        type: 'string',
        required: false,
        description: `New remaining estimate when adjustEstimate is 'new' or 'manual'`,
      },
      {
        name: 'started',
        type: 'string',
        required: false,
        description: `Updated start time in ISO 8601 format`,
      },
      {
        name: 'timeSpent',
        type: 'string',
        required: false,
        description: `Updated time spent in Jira duration format (e.g. '3h', '1d 2h')`,
      },
    ],
  },
  {
    name: 'jira_issue_worklogs_bulk_delete',
    description: `Delete a list of worklogs from a Jira issue in a single request. Up to 5000 worklogs can be deleted at once; no notifications are sent for deleted worklogs. Time tracking must be enabled in Jira.`,
    params: [
      { name: 'ids', type: 'array', required: true, description: `List of worklog IDs to delete` },
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `The ID or key of the issue`,
      },
      {
        name: 'adjustEstimate',
        type: 'string',
        required: false,
        description: `How to update the issue's time estimate: 'leave' or 'auto' (default auto)`,
      },
      {
        name: 'overrideEditableFlag',
        type: 'boolean',
        required: false,
        description: `Whether worklogs are removed even if the issue is not editable (default false)`,
      },
    ],
  },
  {
    name: 'jira_issue_worklogs_bulk_move',
    description: `Move a list of worklogs from a source Jira issue to a destination issue. Up to 5000 worklogs can be moved at once. Worklogs containing attachments or restricted by project roles cannot be moved, and no notifications, webhooks, or issue history are generated for moved worklogs. Time tracking must be enabled in Jira.`,
    params: [
      {
        name: 'destination_issue_id_or_key',
        type: 'string',
        required: true,
        description: `The ID or key of the destination issue the worklogs are moved to`,
      },
      { name: 'ids', type: 'array', required: true, description: `List of worklog IDs to move` },
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `The ID or key of the source issue whose worklogs are being moved`,
      },
      {
        name: 'adjustEstimate',
        type: 'string',
        required: false,
        description: `How to update the issues' time estimate: 'leave' or 'auto' (default auto)`,
      },
      {
        name: 'overrideEditableFlag',
        type: 'boolean',
        required: false,
        description: `Whether worklogs are moved even if the issues are not editable (default false)`,
      },
    ],
  },
  {
    name: 'jira_issue_worklogs_list',
    description: `Get all worklogs logged against a Jira issue with pagination support. Returns time spent, author, and timestamps for each worklog entry.`,
    params: [
      {
        name: 'issueIdOrKey',
        type: 'string',
        required: true,
        description: `The issue ID or key to list worklogs for`,
      },
      {
        name: 'maxResults',
        type: 'integer',
        required: false,
        description: `Maximum number of worklogs to return (default 5000)`,
      },
      {
        name: 'startAt',
        type: 'integer',
        required: false,
        description: `Index of the first worklog entry to return (default 0)`,
      },
      {
        name: 'startedAfter',
        type: 'integer',
        required: false,
        description: `Return worklogs started on or after this time (Unix timestamp in milliseconds)`,
      },
      {
        name: 'startedBefore',
        type: 'integer',
        required: false,
        description: `Return worklogs started on or before this time (Unix timestamp in milliseconds)`,
      },
    ],
  },
  {
    name: 'jira_issues_archive',
    description: `Archive up to 1000 Jira issues in a single request by issue ID or key. Returns details of the issues archived and any errors encountered. Subtasks cannot be archived directly (only through their parent), and only issues from software, service management, and business projects can be archived. Requires Jira admin or site admin permission.`,
    params: [
      {
        name: 'issueIdsOrKeys',
        type: 'array',
        required: true,
        description: `List of issue IDs or keys to archive`,
      },
    ],
  },
  {
    name: 'jira_issues_async_archive',
    description: `Archive up to 100,000 Jira issues in a single request using a JQL query. This is an asynchronous operation that returns a task URL to check progress via the Get Task tool. Subtasks cannot be archived directly (only through their parent), and only issues from software, service management, and business projects can be archived. Requires Jira admin or site admin permission.`,
    params: [
      {
        name: 'jql',
        type: 'string',
        required: true,
        description: `JQL query identifying the issues to archive`,
      },
    ],
  },
  {
    name: 'jira_issues_bulk_create',
    description: `Create up to 50 Jira issues in a single API call. Each issue in the issueUpdates array must include fields with at minimum project, summary, and issuetype. Returns created issue keys and any errors.`,
    params: [
      {
        name: 'issueUpdates',
        type: 'array',
        required: true,
        description: `Array of issue objects to create. Each must have a 'fields' object with project, summary, and issuetype.`,
      },
    ],
  },
  {
    name: 'jira_issues_bulk_fetch',
    description: `Fetch details for up to 100 Jira issues in a single request, identified by ID or key. Issues are returned in ascending ID order; unmatched identifiers are reported as errors rather than causing a redirect. Use fields/expand to control response detail.`,
    params: [
      {
        name: 'issueIdsOrKeys',
        type: 'array',
        required: true,
        description: `List of issue IDs or keys to fetch (up to 100, IDs and keys can be mixed)`,
      },
      {
        name: 'expand',
        type: 'array',
        required: false,
        description: `List of additional data to include in the response, e.g. renderedFields, names, schema, transitions, operations, editmeta, changelog, versionedRepresentations`,
      },
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: `List of fields to return per issue. Use *all for all fields, *navigable for navigable fields (default), or prefix a field with - to exclude it.`,
      },
      {
        name: 'fieldsByKeys',
        type: 'boolean',
        required: false,
        description: `Whether to reference fields by their key rather than ID`,
      },
      {
        name: 'properties',
        type: 'array',
        required: false,
        description: `List of issue property keys to include in the results (maximum 5)`,
      },
    ],
  },
  {
    name: 'jira_issues_count',
    description: `Get an estimated count of Jira issues that match a JQL (Jira Query Language) expression. The JQL query must be bounded (include a search restriction such as a project or assignee filter) for performance reasons. Recent updates might not be immediately reflected in the count.`,
    params: [
      {
        name: 'jql',
        type: 'string',
        required: false,
        description: `A JQL expression used to filter issues. Must be a bounded query (include a search restriction). Example: 'project = PROJ AND status = Open'. Unbounded queries like 'order by key desc' are rejected.`,
      },
    ],
  },
  {
    name: 'jira_issues_match',
    description: `Check whether one or more issues would be returned by one or more JQL queries. Given a list of issue IDs and a list of JQL query strings, returns which issue IDs match each JQL query. Issues are only matched against queries the user has browse permission for.`,
    params: [
      {
        name: 'issueIds',
        type: 'array',
        required: true,
        description: `List of numeric issue IDs to check against the JQL queries`,
      },
      {
        name: 'jqls',
        type: 'array',
        required: true,
        description: `List of JQL query strings to match issues against`,
      },
    ],
  },
  {
    name: 'jira_issues_search',
    description: `Search for Jira issues using JQL (Jira Query Language). Returns a paginated list of matching issues with their fields plus a nextPageToken for fetching subsequent pages. Use fields to control what data is returned per issue.`,
    params: [
      {
        name: 'jql',
        type: 'string',
        required: true,
        description: `JQL query string to filter issues (e.g. 'project = PROJ AND status = Open')`,
      },
      {
        name: 'expand',
        type: 'string',
        required: false,
        description: `Comma-separated list of additional data to include per issue (e.g. renderedFields,changelog)`,
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return per issue (use * for all)`,
      },
      {
        name: 'maxResults',
        type: 'integer',
        required: false,
        description: `Maximum number of issues to return (default 50, max 100)`,
      },
      {
        name: 'nextPageToken',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response's nextPageToken field. Omit to get the first page.`,
      },
      {
        name: 'startAt',
        type: 'integer',
        required: false,
        description: `Deprecated, no-op. This endpoint does not support offset-based pagination; use nextPageToken instead. Kept only for backward compatibility with existing callers.`,
      },
    ],
  },
  {
    name: 'jira_issues_search_get',
    description: `Search for Jira issues using JQL (Jira Query Language) via a GET request. Supports optional read-after-write consistency via reconcileIssues. Use this when the JQL expression is short enough to fit in a query string; for long JQL expressions use the POST-based search issues tool instead. Returns a paginated list of matching issues with a nextPageToken for subsequent pages.`,
    params: [
      {
        name: 'expand',
        type: 'string',
        required: false,
        description: `Comma-separated list of additional data to include per issue (e.g. renderedFields,names,changelog)`,
      },
      {
        name: 'failFast',
        type: 'boolean',
        required: false,
        description: `Fail the request early if not all field data can be retrieved. Defaults to false.`,
      },
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: `List of fields to return per issue. Accepts special values *all (all fields) or *navigable (navigable fields), individual field IDs/keys, or a field prefixed with '-' to exclude it.`,
      },
      {
        name: 'fieldsByKeys',
        type: 'boolean',
        required: false,
        description: `Reference fields by their key instead of their ID. Defaults to false.`,
      },
      {
        name: 'jql',
        type: 'string',
        required: false,
        description: `A JQL expression used to filter issues. Must be a bounded query for performance reasons. Example: 'project = HSP'. Omit for an unbounded query such as 'order by key desc' (discouraged for large instances).`,
      },
      {
        name: 'maxResults',
        type: 'integer',
        required: false,
        description: `The maximum number of items to return per page. The API may return fewer items per page when many fields/properties are requested. Maximum of 5000 issues total.`,
      },
      {
        name: 'nextPageToken',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response's nextPageToken field. Omit to get the first page.`,
      },
      {
        name: 'properties',
        type: 'array',
        required: false,
        description: `List of up to 5 issue property keys to include in the results.`,
      },
      {
        name: 'reconcileIssues',
        type: 'array',
        required: false,
        description: `List of issue IDs to reconcile with search results for strong read-after-write consistency. Accepts up to 50 IDs. Must be consistent across paginated requests.`,
      },
    ],
  },
  {
    name: 'jira_issues_unarchive',
    description: `Unarchive up to 1000 Jira issues in a single request using issue IDs or keys. Returns details of the issues unarchived and any errors encountered. Subtasks cannot be unarchived directly, only through their parent issues. Requires Jira admin or site admin permission.`,
    params: [
      {
        name: 'issueIdsOrKeys',
        type: 'array',
        required: true,
        description: `List of issue IDs or keys to unarchive`,
      },
    ],
  },
  {
    name: 'jira_jql_autocomplete_data',
    description: `Get reference data for JQL query building, including available fields and operators. Useful for building dynamic JQL query interfaces.`,
    params: [],
  },
  {
    name: 'jira_jql_autocomplete_suggestions',
    description: `Get autocomplete suggestions for a JQL field value. Provide the field name and optionally a partial value to get matching suggestions.`,
    params: [
      {
        name: 'fieldName',
        type: 'string',
        required: false,
        description: `The JQL field to get value suggestions for`,
      },
      {
        name: 'fieldValue',
        type: 'string',
        required: false,
        description: `Partial field value to search for suggestions`,
      },
      {
        name: 'predicateName',
        type: 'string',
        required: false,
        description: `The predicate to get suggestions for (e.g. by, before, after)`,
      },
      {
        name: 'predicateValue',
        type: 'string',
        required: false,
        description: `Partial predicate value to search for suggestions`,
      },
    ],
  },
  {
    name: 'jira_jql_parse',
    description: `Parse and validate one or more JQL queries. Returns the parsed structure of valid queries and error details for invalid ones. Useful for debugging JQL syntax before executing a search.`,
    params: [
      {
        name: 'queries',
        type: 'array',
        required: true,
        description: `Array of JQL query strings to parse and validate`,
      },
      {
        name: 'validation',
        type: 'string',
        required: false,
        description: `Validation mode: strict (default), warn, or none`,
      },
    ],
  },
  {
    name: 'jira_jql_sanitize',
    description: `Sanitize one or more JQL queries by converting user mentions to account IDs and fixing common formatting issues. Returns the sanitized query strings.`,
    params: [
      {
        name: 'queries',
        type: 'array',
        required: true,
        description: `Array of JQL query objects to sanitize, each with a query string`,
      },
    ],
  },
  {
    name: 'jira_labels_list',
    description: `Get a paginated list of all labels used across Jira issues in the instance. Useful for discovering available labels before applying them to issues.`,
    params: [
      {
        name: 'maxResults',
        type: 'integer',
        required: false,
        description: `Maximum number of labels to return (default 1000)`,
      },
      {
        name: 'startAt',
        type: 'integer',
        required: false,
        description: `Index of the first label to return (default 0)`,
      },
    ],
  },
  {
    name: 'jira_locale_get',
    description: `Retrieve the locale for the current user. If the user has no language preference set, or the request is anonymous, the browser-detected locale is returned, falling back to the site default locale if unsupported.`,
    params: [],
  },
  {
    name: 'jira_my_filters_get',
    description: `Retrieve the filters owned by the authenticated user. Optionally include the user's visible favorite filters as well by setting includeFavourites to true.`,
    params: [
      {
        name: 'expand',
        type: 'string',
        required: false,
        description: `Comma-separated list of additional filter data to include in the response, such as sharedUsers (users the filter is shared with) or subscriptions.`,
      },
      {
        name: 'includeFavourites',
        type: 'boolean',
        required: false,
        description: `Whether to include the user's visible favorite filters in the response, in addition to owned filters.`,
      },
    ],
  },
  {
    name: 'jira_myself_get',
    description: `Get details of the currently authenticated Jira user. Returns account ID, display name, email address, and avatar URLs. Useful for getting your own account ID.`,
    params: [
      {
        name: 'expand',
        type: 'string',
        required: false,
        description: `Additional data to include (e.g. groups,applicationRoles)`,
      },
    ],
  },
  {
    name: 'jira_notification_scheme_get',
    description: `Retrieve details of a specific Jira notification scheme by its ID, including all configured notification events and their recipients.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The notification scheme ID to retrieve`,
      },
      {
        name: 'expand',
        type: 'string',
        required: false,
        description: `Additional data to include (e.g. all,field,group,notificationSchemeEvents,projectRole,user)`,
      },
    ],
  },
  {
    name: 'jira_notification_schemes_list',
    description: `Get all notification schemes in Jira with pagination. Notification schemes define who receives emails for issue events (created, updated, resolved, etc.).`,
    params: [
      {
        name: 'expand',
        type: 'string',
        required: false,
        description: `Additional data to include (e.g. all,field,group,notificationSchemeEvents,projectRole,user)`,
      },
      {
        name: 'maxResults',
        type: 'integer',
        required: false,
        description: `Maximum number of notification schemes to return (default 50)`,
      },
      {
        name: 'startAt',
        type: 'integer',
        required: false,
        description: `Index of the first scheme to return (default 0)`,
      },
    ],
  },
  {
    name: 'jira_permission_grants_list',
    description: `Get all permission grants in a Jira permission scheme. Returns each grant's permission type, holder type (user, group, role, etc.), and holder details.`,
    params: [
      {
        name: 'schemeId',
        type: 'string',
        required: true,
        description: `The permission scheme ID to list grants for`,
      },
      {
        name: 'expand',
        type: 'string',
        required: false,
        description: `Additional data to include (e.g. all,field,group,permissions,projectRole,user)`,
      },
    ],
  },
  {
    name: 'jira_permission_scheme_get',
    description: `Retrieve details of a specific Jira permission scheme by its ID, including all permission grants and who they apply to.`,
    params: [
      {
        name: 'schemeId',
        type: 'string',
        required: true,
        description: `The permission scheme ID to retrieve`,
      },
      {
        name: 'expand',
        type: 'string',
        required: false,
        description: `Additional data to include (e.g. all,field,group,permissions,projectRole,user)`,
      },
    ],
  },
  {
    name: 'jira_permission_schemes_list',
    description: `Get all permission schemes defined in the Jira instance. Returns scheme IDs, names, and descriptions. Permission schemes define who can perform which actions on issues in a project.`,
    params: [
      {
        name: 'expand',
        type: 'string',
        required: false,
        description: `Additional data to include (e.g. all,field,group,permissions,projectRole,user)`,
      },
    ],
  },
  {
    name: 'jira_preference_delete',
    description: `Delete a preference of the current user, restoring the default value of a system-defined setting. Note that jira.user.locale and jira.user.timezone are deprecated preference keys.`,
    params: [
      {
        name: 'key',
        type: 'string',
        required: true,
        description: `The key of the preference to delete`,
      },
    ],
  },
  {
    name: 'jira_preference_get',
    description: `Retrieve the value of a preference of the current user, by preference key. Returns a plain text value. Note that jira.user.locale and jira.user.timezone are deprecated preference keys.`,
    params: [
      {
        name: 'key',
        type: 'string',
        required: true,
        description: `The key of the preference to retrieve`,
      },
    ],
  },
  {
    name: 'jira_preference_set',
    description: `Create or update a preference for the current user by sending a plain text value (e.g. 'false'). Arbitrary preferences can hold up to 255 characters. Recognized system preference keys include user.notifications.mimetype and user.default.share.private.`,
    params: [
      {
        name: 'key',
        type: 'string',
        required: true,
        description: `The key of the preference to set. Maximum length is 255 characters.`,
      },
      {
        name: 'value',
        type: 'string',
        required: true,
        description: `The plain text value to set for the preference (up to 255 characters)`,
      },
    ],
  },
  {
    name: 'jira_priorities_list',
    description: `Get all issue priority levels configured in the Jira instance (e.g. Highest, High, Medium, Low, Lowest). Returns priority names and IDs for use in issue creation and filtering.`,
    params: [],
  },
  {
    name: 'jira_priorities_move',
    description: `Change the order of issue priorities in Jira. Provide a list of priority IDs to reorder, along with either an 'after' priority ID (to place the list immediately after that priority) or a 'position' (First or Last). Requires Administer Jira global permission.`,
    params: [
      {
        name: 'ids',
        type: 'array',
        required: true,
        description: `The list of priority IDs to reorder. Cannot contain duplicates nor the after ID.`,
      },
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `The ID of the priority to move the given priorities after. Required if position isn't provided. Cannot be included in ids.`,
      },
      {
        name: 'position',
        type: 'string',
        required: false,
        description: `The position to move the priorities to. Required if 'after' isn't provided. Valid values: First, Last.`,
      },
    ],
  },
  {
    name: 'jira_priorities_search',
    description: `Search for Jira issue priorities with pagination. Optionally filter by a list of priority IDs, a list of project IDs, priority name, or whether only the default priority should be returned.`,
    params: [
      {
        name: 'expand',
        type: 'string',
        required: false,
        description: `Use 'schemes' to return the associated priority schemes for each priority (limited to first 15 schemes per priority)`,
      },
      {
        name: 'id',
        type: 'array',
        required: false,
        description: `List of priority IDs to filter by. Invalid IDs are ignored.`,
      },
      {
        name: 'maxResults',
        type: 'integer',
        required: false,
        description: `The maximum number of items to return per page (default 50)`,
      },
      {
        name: 'onlyDefault',
        type: 'boolean',
        required: false,
        description: `Whether only the default priority is returned`,
      },
      {
        name: 'priorityName',
        type: 'string',
        required: false,
        description: `The name of the priority to search for`,
      },
      {
        name: 'projectId',
        type: 'array',
        required: false,
        description: `List of project IDs. Only priorities available in these projects are returned. Invalid project IDs are ignored.`,
      },
      {
        name: 'startAt',
        type: 'integer',
        required: false,
        description: `The index of the first item to return in a page of results (page offset, default 0)`,
      },
    ],
  },
  {
    name: 'jira_priority_create',
    description: `Create a new issue priority level in the Jira instance. Requires a unique name, a status color in 3-digit or 6-digit hex format, and exactly one of avatarId or iconUrl for the priority icon (Jira rejects the request if neither is provided). Optionally set a description. Requires Administer Jira global permission.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The name of the priority. Must be unique across the instance (max 60 characters).`,
      },
      {
        name: 'statusColor',
        type: 'string',
        required: true,
        description: `The status color of the priority in 3-digit or 6-digit hexadecimal format`,
      },
      {
        name: 'avatarId',
        type: 'integer',
        required: false,
        description: `The ID of an existing avatar to use as the icon for this priority. Provide this or iconUrl (one of the two is required by Jira).`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `A description of the priority (up to 255 characters)`,
      },
      {
        name: 'iconUrl',
        type: 'string',
        required: false,
        description: `URL of an icon to use for this priority. Provide this or avatarId (one of the two is required by Jira).`,
      },
    ],
  },
  {
    name: 'jira_priority_delete',
    description: `Delete a Jira issue priority by ID. This operation is asynchronous - follow the location header in the response to track task status. Requires Administer Jira global permission.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the issue priority to delete`,
      },
    ],
  },
  {
    name: 'jira_priority_get',
    description: `Retrieve details of a specific Jira priority level by its ID, including name, description, icon URL, and status color.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The priority ID to retrieve` },
    ],
  },
  {
    name: 'jira_priority_update',
    description: `Update an existing Jira issue priority. At least one request body parameter must be provided. Note: iconUrl was deprecated in favor of avatarId - both cannot be set at the same time. Requires Administer Jira global permission.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the issue priority to update`,
      },
      {
        name: 'avatarId',
        type: 'integer',
        required: false,
        description: `The ID for the avatar to use for the priority. Nullable. Both iconUrl and avatarId cannot be defined together.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `The description of the priority. Maximum length 255 characters. Nullable.`,
      },
      {
        name: 'iconUrl',
        type: 'string',
        required: false,
        description: `The URL of a built-in icon for the priority. Deprecated in favor of avatarId. Both iconUrl and avatarId cannot be defined together. Nullable.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `The name of the priority. Must be unique. Maximum length 60 characters. Nullable.`,
      },
      {
        name: 'statusColor',
        type: 'string',
        required: false,
        description: `The status color of the priority in 3-digit or 6-digit hexadecimal format. Nullable.`,
      },
    ],
  },
  {
    name: 'jira_project_archive',
    description: `Archive a Jira project by ID or key. An archived project cannot be deleted directly; it must first be restored, then deleted. To restore a project, use the Jira UI. Requires Administer Jira global permission.`,
    params: [
      {
        name: 'projectIdOrKey',
        type: 'string',
        required: true,
        description: `The project ID or project key (case sensitive) to archive`,
      },
    ],
  },
  {
    name: 'jira_project_categories_list',
    description: `Returns all project categories defined in the Jira instance. Project categories are used to group related projects together for organizational purposes.`,
    params: [],
  },
  {
    name: 'jira_project_category_create',
    description: `Create a new project category in Jira. Project categories group related projects together. Requires Administer Jira global permission.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Name of the project category. Must be unique (case-insensitive) across the Jira instance.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description of the project category`,
      },
    ],
  },
  {
    name: 'jira_project_category_delete',
    description: `Delete a project category in Jira. This is a permanent operation and cannot be undone. Requires Administer Jira global permission.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The numeric ID of the project category to delete`,
      },
    ],
  },
  {
    name: 'jira_project_category_get',
    description: `Retrieve a single Jira project category by its numeric ID, including its name and description.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The numeric ID of the project category to retrieve`,
      },
    ],
  },
  {
    name: 'jira_project_category_update',
    description: `Update the name and/or description of an existing Jira project category. Requires Administer Jira global permission.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The numeric ID of the project category to update`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Updated description of the project category`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Updated name of the project category. Must be unique (case-insensitive) across the Jira instance.`,
      },
    ],
  },
  {
    name: 'jira_project_components_all_list',
    description: `Return all components in a Jira project as a single, non-paginated list. If the project uses Compass components, this returns a paginated list of Compass components linked to issues in the project instead. Can be accessed anonymously. Requires Browse Projects permission.`,
    params: [
      {
        name: 'projectIdOrKey',
        type: 'string',
        required: true,
        description: `The project ID or project key (case sensitive) to list components for`,
      },
      {
        name: 'componentSource',
        type: 'string',
        required: false,
        description: `The source of the components to return. Can be 'jira' (default), 'compass', or 'auto'. When 'auto' is specified, connected Compass components are returned if the project is opted into Compass; otherwise Jira components are returned.`,
      },
    ],
  },
  {
    name: 'jira_project_components_list',
    description: `Get a paginated list of components for a Jira project. Components are sub-sections that group issues within a project.`,
    params: [
      {
        name: 'projectIdOrKey',
        type: 'string',
        required: true,
        description: `The project ID or key to list components for`,
      },
      {
        name: 'maxResults',
        type: 'integer',
        required: false,
        description: `Maximum number of components to return`,
      },
      {
        name: 'orderBy',
        type: 'string',
        required: false,
        description: `Field to order results by (e.g. name, +name, -name)`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Filter components by name (case-insensitive partial match)`,
      },
      {
        name: 'startAt',
        type: 'integer',
        required: false,
        description: `Index of the first component to return (default 0)`,
      },
    ],
  },
  {
    name: 'jira_project_create',
    description: `Create a new Jira project. Requires a unique project key, project type key, and project template key. The authenticated user becomes the project lead by default.`,
    params: [
      {
        name: 'key',
        type: 'string',
        required: true,
        description: `Unique project key (2-10 uppercase letters, e.g. PROJ)`,
      },
      {
        name: 'leadAccountId',
        type: 'string',
        required: true,
        description: `Account ID of the project lead`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Full display name of the project`,
      },
      {
        name: 'projectTemplateKey',
        type: 'string',
        required: true,
        description: `Template key to use for the project (e.g. com.pyxis.greenhopper.jira:gh-scrum-template)`,
      },
      {
        name: 'projectTypeKey',
        type: 'string',
        required: true,
        description: `Type of project: software, business, or service_desk`,
      },
      {
        name: 'assigneeType',
        type: 'string',
        required: false,
        description: `Default assignee type: PROJECT_LEAD or UNASSIGNED`,
      },
      { name: 'description', type: 'string', required: false, description: `Project description` },
    ],
  },
  {
    name: 'jira_project_delete',
    description: `Delete a Jira project and all its issues. This is a permanent, irreversible operation. Requires Administer Jira global permission.`,
    params: [
      {
        name: 'projectIdOrKey',
        type: 'string',
        required: true,
        description: `The project ID or key to delete`,
      },
      {
        name: 'enableUndo',
        type: 'boolean',
        required: false,
        description: `Whether to place the project in a recycle bin instead of permanently deleting`,
      },
    ],
  },
  {
    name: 'jira_project_delete_async',
    description: `Delete a Jira project asynchronously. This operation is transactional (if part of the delete fails, the project is not deleted) and asynchronous - follow the location link in the response to track the task status via the Get Task tool. Requires Administer Jira global permission.`,
    params: [
      {
        name: 'projectIdOrKey',
        type: 'string',
        required: true,
        description: `The project ID or project key (case sensitive) to delete asynchronously`,
      },
    ],
  },
  {
    name: 'jira_project_fields_list',
    description: `Returns a paginated list of fields available for the requested projects and work types (issue types). Only fields available for the specified combination of projects and work types are returned. Optionally filter to specific field IDs.`,
    params: [
      {
        name: 'projectId',
        type: 'string',
        required: true,
        description: `Comma-separated list of project IDs to return fields for`,
      },
      {
        name: 'workTypeId',
        type: 'string',
        required: true,
        description: `Comma-separated list of work type (issue type) IDs to return fields for`,
      },
      {
        name: 'fieldId',
        type: 'string',
        required: false,
        description: `Comma-separated list of field IDs to return. If not provided, all available fields are returned.`,
      },
      {
        name: 'maxResults',
        type: 'integer',
        required: false,
        description: `The maximum number of items to return per page (1-100)`,
      },
      {
        name: 'startAt',
        type: 'integer',
        required: false,
        description: `The index of the first item to return in a page of results (page offset)`,
      },
    ],
  },
  {
    name: 'jira_project_get',
    description: `Retrieve details of a Jira project by its ID or key, including name, type, lead, category, and metadata.`,
    params: [
      {
        name: 'projectIdOrKey',
        type: 'string',
        required: true,
        description: `The project ID or key to retrieve (e.g. PROJ or 10001)`,
      },
      {
        name: 'expand',
        type: 'string',
        required: false,
        description: `Additional information to include (e.g. description,lead,issueTypes,url,projectKeys,permissions,insight)`,
      },
    ],
  },
  {
    name: 'jira_project_hierarchy_get',
    description: `Get the issue type hierarchy for a next-gen (team-managed) Jira project. The hierarchy consists of an optional Epic level (level 1), one or more standard issue types such as Story, Task, or Bug at level 0, and an optional Subtask level (level -1) used to break level-0 issues into components.`,
    params: [
      {
        name: 'projectId',
        type: 'string',
        required: true,
        description: `The numeric ID of the project to fetch the issue type hierarchy for`,
      },
    ],
  },
  {
    name: 'jira_project_notification_scheme_get',
    description: `Get the notification scheme associated with a Jira project. Returns the scheme's ID, name, and (optionally, via expand) the configured notification events and recipients. Requires Administer Jira or Administer Projects permission.`,
    params: [
      {
        name: 'projectKeyOrId',
        type: 'string',
        required: true,
        description: `The project ID or project key (case sensitive) to fetch the notification scheme for`,
      },
      {
        name: 'expand',
        type: 'string',
        required: false,
        description: `Comma-separated list of additional data to include. Options: 'all' (everything), 'field' (custom fields assigned to receive an event), 'group', 'notificationSchemeEvents', 'projectRole', 'user'.`,
      },
    ],
  },
  {
    name: 'jira_project_restore',
    description: `Restore a Jira project that has been archived or placed in the recycle bin. Requires Administer Jira global permission for company-managed projects, or Administer Jira global permission / Administer Projects project permission for team-managed projects.`,
    params: [
      {
        name: 'projectIdOrKey',
        type: 'string',
        required: true,
        description: `The project ID or project key (case sensitive) to restore`,
      },
    ],
  },
  {
    name: 'jira_project_role_get',
    description: `Get details of a project role for a specific Jira project, including the list of members (users and groups) in the role.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The role ID to retrieve (numeric)`,
      },
      {
        name: 'projectIdOrKey',
        type: 'string',
        required: true,
        description: `The project ID or key to get the role for`,
      },
    ],
  },
  {
    name: 'jira_project_roles_list',
    description: `Get all project roles defined for a specific Jira project, with URLs to get member details for each role.`,
    params: [
      {
        name: 'projectIdOrKey',
        type: 'string',
        required: true,
        description: `The project ID or key to list roles for`,
      },
    ],
  },
  {
    name: 'jira_project_statuses_list',
    description: `Get all valid issue statuses for a Jira project, grouped by issue type. Returns statuses with their names, IDs, and category colors.`,
    params: [
      {
        name: 'projectIdOrKey',
        type: 'string',
        required: true,
        description: `The project ID or key to get statuses for`,
      },
    ],
  },
  {
    name: 'jira_project_types_list',
    description: `Get all project types available in Jira (e.g. software, business, service_desk). Returns type keys, formatted names, and descriptions.`,
    params: [],
  },
  {
    name: 'jira_project_update',
    description: `Update an existing Jira project's name, description, lead, or category. Only fields provided are updated. Requires Administer Projects permission.`,
    params: [
      {
        name: 'projectIdOrKey',
        type: 'string',
        required: true,
        description: `The project ID or key to update`,
      },
      {
        name: 'assigneeType',
        type: 'string',
        required: false,
        description: `Default assignee type: PROJECT_LEAD or UNASSIGNED`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Updated project description`,
      },
      {
        name: 'leadAccountId',
        type: 'string',
        required: false,
        description: `Account ID of the new project lead`,
      },
      { name: 'name', type: 'string', required: false, description: `Updated project name` },
      {
        name: 'url',
        type: 'string',
        required: false,
        description: `A link to information about this project`,
      },
    ],
  },
  {
    name: 'jira_project_versions_get',
    description: `Returns all versions in a Jira project as a single, non-paginated list. Use this when you need every version at once; for large projects consider the paginated project versions list instead.`,
    params: [
      {
        name: 'projectIdOrKey',
        type: 'string',
        required: true,
        description: `The project ID or project key (case sensitive) to fetch versions for`,
      },
      {
        name: 'expand',
        type: 'string',
        required: false,
        description: `Comma-separated list of additional data to include in the response. Accepts 'operations', which returns actions that can be performed on the version.`,
      },
    ],
  },
  {
    name: 'jira_project_versions_list',
    description: `Get a paginated list of versions for a Jira project. Versions are used to track releases and fix versions on issues.`,
    params: [
      {
        name: 'projectIdOrKey',
        type: 'string',
        required: true,
        description: `The project ID or key to list versions for`,
      },
      {
        name: 'expand',
        type: 'string',
        required: false,
        description: `Additional data to include (e.g. operations, issuesstatus, remotelinks, approvers)`,
      },
      {
        name: 'maxResults',
        type: 'integer',
        required: false,
        description: `Maximum number of versions to return`,
      },
      {
        name: 'orderBy',
        type: 'string',
        required: false,
        description: `Field to order by (e.g. description, name, releaseDate, sequence, startDate)`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Filter versions by name (case-insensitive partial match)`,
      },
      {
        name: 'startAt',
        type: 'integer',
        required: false,
        description: `Index of the first version to return (default 0)`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter by release status: released, unreleased, or archived`,
      },
    ],
  },
  {
    name: 'jira_projects_list',
    description: `List all Jira projects visible to the authenticated user with support for filtering and pagination. Projects are returned only where the user has Browse Projects or Administer Projects permission.`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: false,
        description: `Filter results by the action the user can perform on the project`,
      },
      {
        name: 'categoryId',
        type: 'integer',
        required: false,
        description: `Filter projects by category ID`,
      },
      {
        name: 'expand',
        type: 'string',
        required: false,
        description: `Additional information to include in the response (comma-separated)`,
      },
      {
        name: 'id',
        type: 'string',
        required: false,
        description: `List of project IDs to filter by (comma-separated)`,
      },
      {
        name: 'keys',
        type: 'string',
        required: false,
        description: `List of project keys to filter by (comma-separated)`,
      },
      {
        name: 'maxResults',
        type: 'integer',
        required: false,
        description: `Maximum number of projects to return per page (default 50)`,
      },
      {
        name: 'orderBy',
        type: 'string',
        required: false,
        description: `Field to order results by (e.g., name, key, category)`,
      },
      {
        name: 'properties',
        type: 'string',
        required: false,
        description: `Project properties to return (comma-separated)`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Text query to search for in project name and key`,
      },
      {
        name: 'startAt',
        type: 'integer',
        required: false,
        description: `Starting index for pagination (default 0)`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter projects by status (comma-separated: live, archived, deleted)`,
      },
      {
        name: 'typeKey',
        type: 'string',
        required: false,
        description: `Filter projects by project type key`,
      },
    ],
  },
  {
    name: 'jira_recent_projects_list',
    description: `Retrieve a list of up to 20 Jira projects recently viewed by the authenticated user that are still visible to them. Can be accessed anonymously. Only projects where the user has Browse Projects, Administer Projects, or Administer Jira permission are returned.`,
    params: [
      {
        name: 'expand',
        type: 'string',
        required: false,
        description: `Comma-separated list of additional information to include in the response. Options: description, projectKeys, lead, issueTypes, url, insight`,
      },
      {
        name: 'properties',
        type: 'array',
        required: false,
        description: `List of project properties to return for each project (experimental). Invalid property names are ignored.`,
      },
    ],
  },
  {
    name: 'jira_related_work_delete',
    description: `Delete a related work item from a Jira project version. Requires Resolve Issues and Edit Issues permissions for the project that contains the version.`,
    params: [
      {
        name: 'relatedWorkId',
        type: 'string',
        required: true,
        description: `The ID of the related work item to delete`,
      },
      {
        name: 'versionId',
        type: 'string',
        required: true,
        description: `The ID of the version that the related work belongs to`,
      },
    ],
  },
  {
    name: 'jira_related_work_update',
    description: `Update a related work item associated with a Jira project version. Only generic link related works can be updated via this API; native release note related works and archived version related works cannot be edited.`,
    params: [
      {
        name: 'category',
        type: 'string',
        required: true,
        description: `The category of the related work (e.g. Design, Documentation)`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the version whose related work should be updated. Pass the related work's own ID inside the request via relatedWorkId.`,
      },
      {
        name: 'relatedWorkId',
        type: 'string',
        required: false,
        description: `The ID of the related work item to update. Cannot be set for the native release note related work item.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `The title of the related work`,
      },
      {
        name: 'url',
        type: 'string',
        required: false,
        description: `The URL of the related work. Required unless this is the native release note related work item.`,
      },
    ],
  },
  {
    name: 'jira_resolution_create',
    description: `Create a new issue resolution in Jira (e.g. Fixed, Won't Fix, Duplicate). Requires Administer Jira global permission.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Name of the resolution. Must be unique (case-insensitive), up to 60 characters.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description of the resolution, up to 255 characters`,
      },
    ],
  },
  {
    name: 'jira_resolution_delete',
    description: `Delete a Jira issue resolution by ID. Requires a replacement resolution ID to reassign issues currently using the deleted resolution. This operation is asynchronous; follow the returned location link to track task status. Requires the Administer Jira global permission.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the issue resolution to delete.`,
      },
      {
        name: 'replaceWith',
        type: 'string',
        required: true,
        description: `The ID of the issue resolution that will replace the deleted resolution on any issues currently using it.`,
      },
    ],
  },
  {
    name: 'jira_resolution_get',
    description: `Retrieve a single Jira issue resolution value by its ID. Returns the resolution's ID, name, and description.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the issue resolution value to retrieve.`,
      },
    ],
  },
  {
    name: 'jira_resolution_update',
    description: `Update the name and/or description of an existing Jira issue resolution. Requires the Administer Jira global permission.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the issue resolution to update.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The new name of the resolution. Must be unique across all resolutions. Maximum length 60 characters.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `The new description of the resolution. Maximum length 255 characters.`,
      },
    ],
  },
  {
    name: 'jira_resolutions_move',
    description: `Change the display order of Jira issue resolutions. Provide the list of resolution IDs to reorder, plus either an 'after' resolution ID (move the list after this ID) or a 'position' (First or Last). Requires the Administer Jira global permission.`,
    params: [
      {
        name: 'ids',
        type: 'array',
        required: true,
        description: `List of resolution IDs to reorder. Cannot contain duplicates or the ID given in 'after'.`,
      },
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `The ID of the resolution that the reordered list should be placed after. Required if 'position' is not provided.`,
      },
      {
        name: 'position',
        type: 'string',
        required: false,
        description: `The position to move the resolutions to. Valid values: First, Last. Required if 'after' is not provided.`,
      },
    ],
  },
  {
    name: 'jira_resolutions_search',
    description: `Search for Jira issue resolutions with pagination. Optionally filter by a list of resolution IDs or restrict results to only the default resolution (company-managed projects only).`,
    params: [
      {
        name: 'id',
        type: 'array',
        required: false,
        description: `List of resolution IDs to filter results by.`,
      },
      {
        name: 'maxResults',
        type: 'integer',
        required: false,
        description: `The maximum number of items to return per page.`,
      },
      {
        name: 'onlyDefault',
        type: 'boolean',
        required: false,
        description: `When true, return only the default resolution. If IDs are also provided and none of them is the default, an empty page is returned. Defaults to false.`,
      },
      {
        name: 'startAt',
        type: 'integer',
        required: false,
        description: `The index of the first item to return in a page of results (page offset).`,
      },
    ],
  },
  {
    name: 'jira_role_create',
    description: `Create a new project role in the Jira instance. The role will be available to all projects. Requires Administer Jira global permission.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name of the new project role` },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description of the role's purpose`,
      },
    ],
  },
  {
    name: 'jira_role_delete',
    description: `Delete a global project role from the Jira instance. Optionally swap the role's usage in projects with another role. Requires Administer Jira global permission.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The role ID to delete` },
      {
        name: 'swap',
        type: 'string',
        required: false,
        description: `Role ID to use as a replacement wherever this role is used`,
      },
    ],
  },
  {
    name: 'jira_role_get',
    description: `Retrieve details of a global Jira project role by its ID, including name, description, and scope.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The role ID to retrieve` },
    ],
  },
  {
    name: 'jira_roles_list',
    description: `Get all project roles defined in the Jira instance (global role list, not project-specific). Returns role IDs, names, and descriptions.`,
    params: [],
  },
  {
    name: 'jira_share_permission_add',
    description: `Add a share permission to a Jira filter, allowing it to be shared with a user, group, project, project role, or globally. Adding a global share permission overwrites all existing share permissions for the filter. Requires the 'Share dashboards and filters' global permission and filter ownership.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the filter to add the share permission to`,
      },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `The type of share permission: user, group, project, projectRole, global, or authenticated`,
      },
      {
        name: 'accountId',
        type: 'string',
        required: false,
        description: `The user account ID to share the filter with (required when type is 'user')`,
      },
      {
        name: 'groupId',
        type: 'string',
        required: false,
        description: `The ID of the group to share the filter with. Cannot be provided with groupname.`,
      },
      {
        name: 'groupname',
        type: 'string',
        required: false,
        description: `The name of the group to share the filter with (required when type is 'group' and groupId not provided)`,
      },
      {
        name: 'projectId',
        type: 'string',
        required: false,
        description: `The ID of the project to share the filter with (required when type is 'project' or 'projectRole')`,
      },
      {
        name: 'projectRoleId',
        type: 'string',
        required: false,
        description: `The ID of the project role to share the filter with (required when type is 'projectRole', along with projectId)`,
      },
      {
        name: 'rights',
        type: 'integer',
        required: false,
        description: `The rights for the share permission`,
      },
    ],
  },
  {
    name: 'jira_share_permission_delete',
    description: `Delete a share permission from a Jira filter. Requires permission to access Jira and filter ownership.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the filter that owns the share permission`,
      },
      {
        name: 'permissionId',
        type: 'string',
        required: true,
        description: `The ID of the share permission to delete`,
      },
    ],
  },
  {
    name: 'jira_share_permission_get',
    description: `Retrieve a share permission for a Jira filter. A filter can be shared with groups, projects, all logged-in users, or the public. This operation can be accessed anonymously, but a share permission is only returned for filters the user owns, filters shared with a group the user belongs to, or filters shared with a private project the user can browse.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the filter that owns the share permission`,
      },
      {
        name: 'permissionId',
        type: 'string',
        required: true,
        description: `The ID of the share permission to retrieve`,
      },
    ],
  },
  {
    name: 'jira_sprint_create',
    description: `Create a future sprint on a Jira Software board. Sprint name and origin board ID are required; start date, end date, and goal are optional. The sprint name is trimmed. Note that when starting sprints from the UI, the endDate set through this call is ignored and instead the last sprint's duration is used to fill the form.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name of the sprint` },
      {
        name: 'originBoardId',
        type: 'integer',
        required: true,
        description: `The ID of the board that the sprint is created on`,
      },
      { name: 'endDate', type: 'string', required: false, description: `End date of the sprint` },
      { name: 'goal', type: 'string', required: false, description: `Goal of the sprint` },
      {
        name: 'startDate',
        type: 'string',
        required: false,
        description: `Start date of the sprint`,
      },
    ],
  },
  {
    name: 'jira_sprint_delete',
    description: `Delete a sprint. Once a sprint is deleted, all open issues in the sprint will be moved to the backlog.`,
    params: [
      {
        name: 'sprintId',
        type: 'integer',
        required: true,
        description: `The ID of the sprint to delete`,
      },
    ],
  },
  {
    name: 'jira_sprint_get',
    description: `Return the sprint for a given sprint ID. The sprint will only be returned if the user can view the board that the sprint was created on, or view at least one of the issues in the sprint.`,
    params: [
      {
        name: 'sprintId',
        type: 'integer',
        required: true,
        description: `The ID of the requested sprint`,
      },
    ],
  },
  {
    name: 'jira_sprint_issues_list',
    description: `Return all issues in a sprint, for a given sprint ID. This only includes issues that the user has permission to view. By default, the returned issues are ordered by rank. Note: this operation is deprecated by Atlassian in favor of the Jira Cloud platform search APIs, but remains available.`,
    params: [
      {
        name: 'sprintId',
        type: 'integer',
        required: true,
        description: `The ID of the sprint that contains the requested issues`,
      },
      {
        name: 'expand',
        type: 'string',
        required: false,
        description: `A comma-separated list of the parameters to expand`,
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `The list of fields to return for each issue. By default, all navigable and Agile fields are returned.`,
      },
      {
        name: 'jql',
        type: 'string',
        required: false,
        description: `Filters results using a JQL query. If you define an order in your JQL query, it will override the default order of the returned issues. Note that username and userkey can't be used as search terms for this parameter due to privacy reasons. Use accountId instead.`,
      },
      {
        name: 'maxResults',
        type: 'integer',
        required: false,
        description: `The maximum number of issues to return per page. The total number of issues returned is limited by the property 'jira.search.views.default.max' in your Jira instance.`,
      },
      {
        name: 'startAt',
        type: 'integer',
        required: false,
        description: `The starting index of the returned issues. Base index: 0.`,
      },
      {
        name: 'validateQuery',
        type: 'boolean',
        required: false,
        description: `Specifies whether to validate the JQL query or not. Default: true.`,
      },
    ],
  },
  {
    name: 'jira_sprint_issues_move',
    description: `Move issues to a sprint, for a given sprint ID. Issues can only be moved to open or active sprints. The maximum number of issues that can be moved in one operation is 50.`,
    params: [
      {
        name: 'issues',
        type: 'array',
        required: true,
        description: `The list of issue keys or IDs to move to the sprint`,
      },
      {
        name: 'sprintId',
        type: 'integer',
        required: true,
        description: `The ID of the sprint that you want to assign issues to`,
      },
      {
        name: 'rankAfterIssue',
        type: 'string',
        required: false,
        description: `An issue to rank the moved issues after`,
      },
      {
        name: 'rankBeforeIssue',
        type: 'string',
        required: false,
        description: `An issue to rank the moved issues before`,
      },
      {
        name: 'rankCustomFieldId',
        type: 'integer',
        required: false,
        description: `The ID of the custom field of type 'Rank' used for ranking`,
      },
    ],
  },
  {
    name: 'jira_sprint_partial_update',
    description: `Perform a partial update of a sprint. Fields not present in the request are left unchanged. For closed sprints, only name and goal can be updated. A sprint can be started by updating state to 'active' (requires the sprint to be in 'future' state with startDate and endDate set), and completed by updating state to 'closed' (requires the sprint to be 'active'; this sets completeDate to the time of the request). Other state transitions are not allowed, and completeDate cannot be updated manually.`,
    params: [
      {
        name: 'sprintId',
        type: 'integer',
        required: true,
        description: `The ID of the sprint to update`,
      },
      {
        name: 'completeDate',
        type: 'string',
        required: false,
        description: `Complete date of the sprint. Cannot be set manually.`,
      },
      { name: 'endDate', type: 'string', required: false, description: `End date of the sprint` },
      { name: 'goal', type: 'string', required: false, description: `Goal of the sprint` },
      { name: 'name', type: 'string', required: false, description: `Name of the sprint` },
      {
        name: 'originBoardId',
        type: 'integer',
        required: false,
        description: `The ID of the board that the sprint is created on`,
      },
      {
        name: 'startDate',
        type: 'string',
        required: false,
        description: `Start date of the sprint`,
      },
      {
        name: 'state',
        type: 'string',
        required: false,
        description: `State of the sprint: future, active, or closed`,
      },
    ],
  },
  {
    name: 'jira_sprint_property_delete',
    description: `Delete a custom property from a Jira Software sprint by its property key. Returns an empty response if the property was removed successfully.`,
    params: [
      {
        name: 'propertyKey',
        type: 'string',
        required: true,
        description: `The key of the property to remove`,
      },
      {
        name: 'sprintId',
        type: 'string',
        required: true,
        description: `The ID of the sprint from which the property will be removed`,
      },
    ],
  },
  {
    name: 'jira_sprint_property_get',
    description: `Get the value of a custom property set on a Jira Software sprint by its property key. Returns the property key and its JSON value if the sprint exists and the property was found.`,
    params: [
      {
        name: 'propertyKey',
        type: 'string',
        required: true,
        description: `The key of the property to return`,
      },
      {
        name: 'sprintId',
        type: 'string',
        required: true,
        description: `The ID of the sprint from which the property will be returned`,
      },
    ],
  },
  {
    name: 'jira_sprint_property_keys_list',
    description: `Return the keys of all properties for the sprint identified by the given ID. The user who retrieves the property keys is required to have permission to view the sprint.`,
    params: [
      {
        name: 'sprintId',
        type: 'string',
        required: true,
        description: `The ID of the sprint from which property keys will be returned`,
      },
    ],
  },
  {
    name: 'jira_sprint_property_set',
    description: `Set or update a custom property on a Jira Software sprint. Properties can store arbitrary JSON values (max 32768 bytes) and are visible to apps and API consumers. The value must be a valid, non-empty JSON value passed as a JSON string. Returns 200 if the property was updated, or 201 if it was created.`,
    params: [
      {
        name: 'propertyKey',
        type: 'string',
        required: true,
        description: `The key of the sprint's property. The maximum length of the key is 255 bytes.`,
      },
      {
        name: 'sprintId',
        type: 'string',
        required: true,
        description: `The ID of the sprint on which the property will be set`,
      },
      {
        name: 'value',
        type: 'string',
        required: true,
        description: `The JSON value to store for the property, passed as a JSON string. Must be a valid, non-empty JSON value. The maximum length of the property value is 32768 bytes.`,
      },
    ],
  },
  {
    name: 'jira_sprint_swap',
    description: `Swap the position of the sprint with the second sprint. Both sprints must exist and be visible to the calling user.`,
    params: [
      {
        name: 'sprintId',
        type: 'integer',
        required: true,
        description: `The ID of the sprint to swap`,
      },
      {
        name: 'sprintToSwapWith',
        type: 'integer',
        required: true,
        description: `The ID of the sprint to swap with`,
      },
    ],
  },
  {
    name: 'jira_sprint_update',
    description: `Perform a full update of a sprint. A full update means the result will be exactly the same as the request body; any fields not present in the request will be set to null. For closed sprints, only name and goal can be updated. A sprint can be started by updating state to 'active' (requires the sprint to be in 'future' state with startDate and endDate set), and completed by updating state to 'closed' (requires the sprint to be 'active'; this sets completeDate to the time of the request). Other state transitions are not allowed, and completeDate cannot be updated manually.`,
    params: [
      {
        name: 'sprintId',
        type: 'integer',
        required: true,
        description: `The ID of the sprint to update`,
      },
      {
        name: 'completeDate',
        type: 'string',
        required: false,
        description: `Complete date of the sprint. Cannot be set manually; only meaningful when read back from Jira.`,
      },
      { name: 'endDate', type: 'string', required: false, description: `End date of the sprint` },
      { name: 'goal', type: 'string', required: false, description: `Goal of the sprint` },
      { name: 'name', type: 'string', required: false, description: `Name of the sprint` },
      {
        name: 'originBoardId',
        type: 'integer',
        required: false,
        description: `The ID of the board that the sprint is created on`,
      },
      {
        name: 'startDate',
        type: 'string',
        required: false,
        description: `Start date of the sprint`,
      },
      {
        name: 'state',
        type: 'string',
        required: false,
        description: `State of the sprint: future, active, or closed`,
      },
    ],
  },
  {
    name: 'jira_status_project_issue_type_usages_list',
    description: `Get a paginated list of issue types within a specific project that are currently using a given status. Useful for understanding where a status is applied before renaming or deleting it. Requires the status ID and project ID; supports cursor-based pagination via nextPageToken.`,
    params: [
      {
        name: 'projectId',
        type: 'string',
        required: true,
        description: `The ID of the project to fetch issue type usages for`,
      },
      {
        name: 'statusId',
        type: 'string',
        required: true,
        description: `The ID of the status to fetch issue type usages for`,
      },
      {
        name: 'maxResults',
        type: 'integer',
        required: false,
        description: `The maximum number of results to return (between 1 and 200). Defaults to 50.`,
      },
      {
        name: 'nextPageToken',
        type: 'string',
        required: false,
        description: `Cursor token for fetching the next page of results. Omit for the first page.`,
      },
    ],
  },
  {
    name: 'jira_status_project_usages_list',
    description: `Get a paginated list of projects that are currently using a given status. Useful for understanding the impact of renaming or deleting a status before making the change. Supports cursor-based pagination via nextPageToken.`,
    params: [
      {
        name: 'statusId',
        type: 'string',
        required: true,
        description: `The ID of the status to fetch project usages for`,
      },
      {
        name: 'maxResults',
        type: 'integer',
        required: false,
        description: `The maximum number of results to return (between 1 and 200). Defaults to 50.`,
      },
      {
        name: 'nextPageToken',
        type: 'string',
        required: false,
        description: `Cursor token for fetching the next page of results. Omit for the first page.`,
      },
    ],
  },
  {
    name: 'jira_status_workflow_usages_list',
    description: `Get a paginated list of workflows that are currently using a given status. Useful for understanding the impact of renaming or deleting a status before making the change. Supports cursor-based pagination via nextPageToken.`,
    params: [
      {
        name: 'statusId',
        type: 'string',
        required: true,
        description: `The ID of the status to fetch workflow usages for`,
      },
      {
        name: 'maxResults',
        type: 'integer',
        required: false,
        description: `The maximum number of results to return (between 1 and 200). Defaults to 50.`,
      },
      {
        name: 'nextPageToken',
        type: 'string',
        required: false,
        description: `Cursor token for fetching the next page of results. Omit for the first page.`,
      },
    ],
  },
  {
    name: 'jira_statuses_by_id_delete',
    description: `Delete one or more Jira workflow statuses by ID. Accepts between 1 and 50 status IDs. Requires the Administer projects or Administer Jira permission.`,
    params: [
      {
        name: 'id',
        type: 'array',
        required: true,
        description: `List of status IDs to delete. Minimum 1 item, maximum 50 items.`,
      },
    ],
  },
  {
    name: 'jira_statuses_by_id_get',
    description: `Retrieve one or more Jira workflow statuses by ID. Accepts between 1 and 50 status IDs and returns the matching status objects. Requires the Administer projects or Administer Jira permission.`,
    params: [
      {
        name: 'id',
        type: 'array',
        required: true,
        description: `List of status IDs to retrieve. Minimum 1 item, maximum 50 items.`,
      },
    ],
  },
  {
    name: 'jira_statuses_by_name_get',
    description: `Look up one or more Jira statuses by their exact name(s). Provide a comma-separated list of 1 to 50 status names and optionally a project ID to scope the search to a specific project (omit for global statuses). Returns matching status details including ID, name, and category. Requires Administer Jira, Administer Projects, or Browse Projects permission.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Comma-separated list of status names to look up (1 to 50 names). Example: 'To Do,In Progress,Done'`,
      },
      {
        name: 'projectId',
        type: 'string',
        required: false,
        description: `The ID of the project the statuses belong to. Omit to search global statuses.`,
      },
    ],
  },
  {
    name: 'jira_statuses_create',
    description: `Create one or more custom statuses in a Jira global or project scope. Provide a scope (GLOBAL for company-managed projects or PROJECT with a project ID for team-managed projects) and a list of statuses, each with a name and status category (TODO, IN_PROGRESS, or DONE). Requires Administer Jira or Administer Projects permission.`,
    params: [
      {
        name: 'scope_type',
        type: 'string',
        required: true,
        description: `The scope of the statuses being created. Use GLOBAL for company-managed projects or PROJECT for team-managed projects.`,
      },
      {
        name: 'statuses',
        type: 'array',
        required: true,
        description: `List of statuses to create. Each item must include a name (max 255 chars) and a statusCategory (TODO, IN_PROGRESS, or DONE), and may include an optional description. Example: [{"name": "In Review", "statusCategory": "IN_PROGRESS", "description": "Awaiting review"}]`,
      },
      {
        name: 'scope_project_id',
        type: 'string',
        required: false,
        description: `The ID of the project the statuses will be scoped to. Required when scope_type is PROJECT; omit for GLOBAL scope.`,
      },
    ],
  },
  {
    name: 'jira_statuses_search',
    description: `Search Jira statuses by name or project, returning a paginated list of matching statuses with their IDs, names, and categories. Filter by project ID, a search string matched against status names, or status category (TODO, IN_PROGRESS, DONE). Requires Administer Jira or Administer Projects permission.`,
    params: [
      {
        name: 'includeGlobalStatuses',
        type: 'boolean',
        required: false,
        description: `Whether to include global statuses (not tied to any project) in the response. Only relevant for project-scoped queries. Defaults to false.`,
      },
      {
        name: 'maxResults',
        type: 'integer',
        required: false,
        description: `The maximum number of items to return per page. Defaults to 200.`,
      },
      {
        name: 'projectId',
        type: 'string',
        required: false,
        description: `The ID of the project to search statuses in. Omit to search global statuses.`,
      },
      {
        name: 'searchString',
        type: 'string',
        required: false,
        description: `Term to match status names against. Omit to search for all statuses in scope. Max length 255.`,
      },
      {
        name: 'startAt',
        type: 'integer',
        required: false,
        description: `The index of the first item to return in a page of results (page offset). Defaults to 0.`,
      },
      {
        name: 'statusCategory',
        type: 'string',
        required: false,
        description: `Category of the status to filter by.`,
      },
    ],
  },
  {
    name: 'jira_statuses_update',
    description: `Update one or more existing Jira statuses by ID. Each status object must include the status ID, name, and status category (TODO, IN_PROGRESS, or DONE), and may include a description. Requires Administer Jira or Administer Projects permission.`,
    params: [
      {
        name: 'statuses',
        type: 'array',
        required: true,
        description: `List of statuses to update. Each item must include id, name, and statusCategory (TODO, IN_PROGRESS, or DONE), and may include an optional description. Example: [{"id": "10001", "name": "In Review", "statusCategory": "IN_PROGRESS"}]`,
      },
    ],
  },
  {
    name: 'jira_time_tracking_configuration_get',
    description: `Returns the time tracking settings for the Jira site, including the default time format, default time unit, working hours per day, and working days per week. Requires Administer Jira global permission.`,
    params: [],
  },
  {
    name: 'jira_time_tracking_configuration_set',
    description: `Sets the time tracking settings for the Jira site: the default time unit applied to logged time, the format shown on an issue's Time Spent field, and the working days per week and hours per day used to convert between units. All four fields are required. Requires Administer Jira global permission.`,
    params: [
      {
        name: 'defaultUnit',
        type: 'string',
        required: true,
        description: `The default unit of time applied to logged time.`,
      },
      {
        name: 'timeFormat',
        type: 'string',
        required: true,
        description: `The format that will appear on an issue's Time Spent field.`,
      },
      {
        name: 'workingDaysPerWeek',
        type: 'number',
        required: true,
        description: `The number of days in a working week, used to convert between time units. For example, 5.`,
      },
      {
        name: 'workingHoursPerDay',
        type: 'number',
        required: true,
        description: `The number of hours in a working day, used to convert between time units. For example, 8.`,
      },
    ],
  },
  {
    name: 'jira_time_tracking_implementation_select',
    description: `Selects the time tracking provider for the Jira site. Requires Administer Jira global permission. The key identifies the provider (e.g. 'JIRA' for the built-in time tracking), and name/url describe it.`,
    params: [
      {
        name: 'key',
        type: 'string',
        required: true,
        description: `The key for the time tracking provider, e.g. 'JIRA' for the built-in Jira time tracking provider.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `The display name of the time tracking provider, e.g. 'JIRA provided time tracking'.`,
      },
      {
        name: 'url',
        type: 'string',
        required: false,
        description: `The URL of the configuration page for the time tracking provider app. Only relevant for third-party providers that expose an admin configuration page.`,
      },
    ],
  },
  {
    name: 'jira_time_tracking_implementations_list',
    description: `Returns all time tracking providers available on the Jira site. By default Jira only has one time tracking provider, 'JIRA provided time tracking', but additional providers may be installed via Atlassian Marketplace apps. Requires Administer Jira global permission.`,
    params: [],
  },
  {
    name: 'jira_timetracking_config_get',
    description: `Get the time tracking provider that is currently selected for the Jira instance (e.g. JIRA provider). If time tracking is disabled, a successful but empty response is returned. Requires Administer Jira global permission.`,
    params: [],
  },
  {
    name: 'jira_trashed_fields_search',
    description: `Retrieve a paginated list of custom fields that have been moved to the trash. Optionally filter by field ID(s) or by a partial, case-insensitive match on field name or description. Only custom fields are returned. Requires the Administer Jira global permission.`,
    params: [
      {
        name: 'expand',
        type: 'string',
        required: false,
        description: `Additional data to include in the response for each field.`,
      },
      {
        name: 'id',
        type: 'string',
        required: false,
        description: `Comma-separated list of custom field IDs to filter by, e.g. customfield_10000,customfield_10001`,
      },
      {
        name: 'maxResults',
        type: 'integer',
        required: false,
        description: `The maximum number of items to return per page.`,
      },
      {
        name: 'orderBy',
        type: 'string',
        required: false,
        description: `Order the results by a field: name sorts by field name, trashDate sorts by the date moved to trash, plannedDeletionDate sorts by the planned deletion date. Prefix with - for descending order.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `String used to perform a case-insensitive partial match with field names or descriptions.`,
      },
      {
        name: 'startAt',
        type: 'integer',
        required: false,
        description: `The index of the first item to return in a page of results (page offset).`,
      },
    ],
  },
  {
    name: 'jira_user_account_ids_get',
    description: `Returns the account IDs for users specified by legacy username or key parameters. This is a migration helper for callers still using deprecated username/key identifiers instead of account IDs; provide either usernames or keys (not both). Note: username and key parameters are deprecated by Atlassian and may be removed.`,
    params: [
      {
        name: 'key',
        type: 'array',
        required: false,
        description: `List of user keys to resolve to account IDs. Required if username isn't provided; cannot be combined with username. Deprecated by Atlassian.`,
      },
      {
        name: 'maxResults',
        type: 'integer',
        required: false,
        description: `The maximum number of items to return per page. Default is 10.`,
      },
      {
        name: 'startAt',
        type: 'integer',
        required: false,
        description: `The index of the first item to return in a page of results (page offset). Default is 0.`,
      },
      {
        name: 'username',
        type: 'array',
        required: false,
        description: `List of usernames to resolve to account IDs. Required if key isn't provided; cannot be combined with key. Deprecated by Atlassian.`,
      },
    ],
  },
  {
    name: 'jira_user_assignable_search',
    description: `Find users who can be assigned to issues in a Jira project or specific issue. Provide either projectKey or issueKey (not both). Returns account IDs for use with the Assign Issue tool.`,
    params: [
      {
        name: 'issueKey',
        type: 'string',
        required: false,
        description: `Find users assignable to this specific issue (use instead of projectKey for issue-specific rules)`,
      },
      {
        name: 'maxResults',
        type: 'integer',
        required: false,
        description: `Maximum number of users to return (default 50)`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: false,
        description: `Find users assignable to issues in this project`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Filter users by display name, email, or account ID`,
      },
      {
        name: 'startAt',
        type: 'integer',
        required: false,
        description: `Index of the first user to return (default 0)`,
      },
    ],
  },
  {
    name: 'jira_user_columns_get',
    description: `Retrieve the default issue table columns configured for a Jira user. If accountId is omitted, returns the calling user's own default columns. Requires Administer Jira global permission to view another user's columns.`,
    params: [
      {
        name: 'accountId',
        type: 'string',
        required: false,
        description: `The account ID of the user whose default columns should be returned. If omitted, returns the calling user's own columns. Example: 5b10ac8d82e05b22cc7d4ef5`,
      },
    ],
  },
  {
    name: 'jira_user_columns_reset',
    description: `Reset the default issue table columns for a Jira user back to the system default. If accountId is omitted, resets the calling user's own default columns. Requires Administer Jira global permission to reset another user's columns.`,
    params: [
      {
        name: 'accountId',
        type: 'string',
        required: false,
        description: `The account ID of the user whose default columns should be reset. If omitted, resets the calling user's own columns. Example: 5b10ac8d82e05b22cc7d4ef5`,
      },
    ],
  },
  {
    name: 'jira_user_columns_set',
    description: `Set the default issue table columns for a Jira user. If accountId is omitted, sets the calling user's own default columns. If no columns are provided, all default columns are removed. Requires Administer Jira global permission to set another user's columns.`,
    params: [
      {
        name: 'accountId',
        type: 'string',
        required: false,
        description: `The account ID of the user whose default columns should be set. If omitted, sets the calling user's own columns. Example: 5b10ac8d82e05b22cc7d4ef5`,
      },
      {
        name: 'columns',
        type: 'array',
        required: false,
        description: `List of column keys to set as the user's default issue table columns, in display order. If omitted or empty, all default columns are removed. Example: ["summary", "status", "assignee"]`,
      },
    ],
  },
  {
    name: 'jira_user_create',
    description: `Create a new user in Jira by email address, granting access to one or more products. This is a legacy resource retained for compatibility. If the user already exists and has Jira access, returns 201; if they exist but lack access, returns 400. Requires Administer Jira global permission. Does not support Forge apps.`,
    params: [
      {
        name: 'emailAddress',
        type: 'string',
        required: true,
        description: `The email address for the new user.`,
      },
      {
        name: 'products',
        type: 'array',
        required: true,
        description: `Products the new user should have access to. Valid values: jira-core, jira-servicedesk, jira-product-discovery, jira-software. Pass an empty array to create a user with no product access.`,
      },
    ],
  },
  {
    name: 'jira_user_delete',
    description: `Permanently remove a user from Jira's user base by their account ID. This does not delete the user's underlying Atlassian account, only their access/record within this Jira site. Requires Site Administration (site-admin group membership). This is a destructive operation and cannot be undone.`,
    params: [
      {
        name: 'accountId',
        type: 'string',
        required: true,
        description: `The account ID of the user to remove, which uniquely identifies the user across all Atlassian products. Max length 128.`,
      },
    ],
  },
  {
    name: 'jira_user_email_bulk_get',
    description: `Retrieve email addresses for multiple users by account ID, regardless of the users' profile visibility settings. Only available to approved Connect apps or Forge apps making asApp() requests.`,
    params: [
      {
        name: 'accountId',
        type: 'array',
        required: true,
        description: `List of account IDs of the users whose email addresses should be returned. Treat each account ID as an opaque identifier. Example: ["5b10ac8d82e05b22cc7d4ef5", "5b10a2844c20165700ede21g"]`,
      },
    ],
  },
  {
    name: 'jira_user_email_get',
    description: `Retrieve a single user's email address by account ID, regardless of the user's profile visibility settings. Only available to approved Connect apps or Forge apps making asApp() requests.`,
    params: [
      {
        name: 'accountId',
        type: 'string',
        required: true,
        description: `The account ID of the user whose email address should be returned. Example: 5b10ac8d82e05b22cc7d4ef5`,
      },
    ],
  },
  {
    name: 'jira_user_get',
    description: `Get details for a Jira user by their account ID. Returns display name, email address, account type, avatar URLs, and active status.`,
    params: [
      {
        name: 'accountId',
        type: 'string',
        required: true,
        description: `The account ID of the user to retrieve`,
      },
      {
        name: 'expand',
        type: 'string',
        required: false,
        description: `Additional data to include (e.g. groups,applicationRoles)`,
      },
    ],
  },
  {
    name: 'jira_user_groups_get',
    description: `Retrieve the groups that a Jira user belongs to, identified by account ID. Requires the Browse users and groups global permission.`,
    params: [
      {
        name: 'accountId',
        type: 'string',
        required: true,
        description: `The account ID of the user whose group memberships should be returned. Example: 5b10ac8d82e05b22cc7d4ef5`,
      },
    ],
  },
  {
    name: 'jira_user_keys_by_query_search',
    description: `Finds Jira users with a structured query and returns a paginated list of user keys (rather than full user details). Takes users in the range defined by startAt and maxResult, up to the thousandth user, and returns only the keys of users matching the structured query.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `The structured search query used to match users, e.g. 'is assignee of PROJ' or a name/email fragment.`,
      },
      {
        name: 'maxResult',
        type: 'integer',
        required: false,
        description: `The maximum number of items to return per page (default 100).`,
      },
      {
        name: 'startAt',
        type: 'integer',
        required: false,
        description: `The index of the first item to return in a page of results (page offset), default 0.`,
      },
    ],
  },
  {
    name: 'jira_users_bulk_get',
    description: `Retrieve a paginated list of Jira users by their account IDs. Provide one or more account IDs to fetch user details (display name, email, active status) in a single call. Useful for resolving account IDs collected from other tools into full user records.`,
    params: [
      {
        name: 'accountId',
        type: 'array',
        required: true,
        description: `List of account IDs of the users to retrieve. To specify multiple users, provide multiple account ID strings. Example: ["5b10ac8d82e05b22cc7d4ef5", "5b10a2844c20165700ede21g"]`,
      },
      {
        name: 'maxResults',
        type: 'integer',
        required: false,
        description: `The maximum number of items to return per page. Default is 10.`,
      },
      {
        name: 'startAt',
        type: 'integer',
        required: false,
        description: `The index of the first item to return in a page of results (page offset). Default is 0.`,
      },
    ],
  },
  {
    name: 'jira_users_by_query_search',
    description: `Finds Jira users with a structured query and returns a paginated list of user details. Takes users in the range defined by startAt and maxResults, up to the thousandth user, and returns only those matching the structured query. To get all users, use the users list tool instead.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `The structured search query used to match users, e.g. 'is assignee of PROJ'. Must be valid UQL (User Query Language) syntax — plain name/email text fragments are NOT accepted and will fail with 'Unable to parse UQL'. Use jira_users_search or jira_user_assignable_search for name-based lookups instead.`,
      },
      {
        name: 'maxResults',
        type: 'integer',
        required: false,
        description: `The maximum number of items to return per page (default 100).`,
      },
      {
        name: 'startAt',
        type: 'integer',
        required: false,
        description: `The index of the first item to return in a page of results (page offset), default 0.`,
      },
    ],
  },
  {
    name: 'jira_users_picker_search',
    description: `Search for Jira users whose attributes match a query term, formatted for use in a user-picker UI. The response highlights the matched text with HTML strong tags. Optionally excludes specific account IDs from the results and includes avatar URIs.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Search string matched against user attributes such as displayName and emailAddress. Matches on prefix of the attribute value. Example: john`,
      },
      {
        name: 'avatarSize',
        type: 'string',
        required: false,
        description: `The size of the avatar to return in the response, e.g. xsmall, small, medium, large.`,
      },
      {
        name: 'excludeAccountIds',
        type: 'array',
        required: false,
        description: `List of account IDs to exclude from the search results. Example: ["5b10a2844c20165700ede21g", "5b10ac8d82e05b22cc7d4ef5"]`,
      },
      {
        name: 'excludeConnectUsers',
        type: 'boolean',
        required: false,
        description: `Whether to exclude Connect app users from the results. Default is false.`,
      },
      {
        name: 'maxResults',
        type: 'integer',
        required: false,
        description: `The maximum number of users to return. The total number of matched users is returned in the response's total field. Default is 50.`,
      },
      {
        name: 'showAvatar',
        type: 'boolean',
        required: false,
        description: `Whether to include the URI to the user's avatar in the response. Default is false.`,
      },
    ],
  },
  {
    name: 'jira_users_search',
    description: `Search for Jira users by query string. Returns users whose name, email, or display name matches the query. Useful for finding account IDs to use with other tools.`,
    params: [
      {
        name: 'maxResults',
        type: 'integer',
        required: false,
        description: `Maximum number of users to return (default 50, max 1000)`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Search string to match against user display name, email, or account ID`,
      },
      {
        name: 'startAt',
        type: 'integer',
        required: false,
        description: `Index of the first user to return (default 0)`,
      },
    ],
  },
  {
    name: 'jira_users_with_browse_permission_search',
    description: `Returns a list of users who match a search string and who have permission to browse a given issue or any issue in a given project. Provide either issueKey or projectKey to scope the permission check, and optionally query or accountId to filter by user attributes.`,
    params: [
      {
        name: 'accountId',
        type: 'string',
        required: false,
        description: `A query string that is matched exactly against a user's accountId. Required unless query is specified. Max length 128.`,
      },
      {
        name: 'issueKey',
        type: 'string',
        required: false,
        description: `The issue key to check browse permission against. Required unless projectKey is specified.`,
      },
      {
        name: 'maxResults',
        type: 'integer',
        required: false,
        description: `The maximum number of items to return per page (default 50).`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: false,
        description: `The project key (case sensitive) to check browse permission against. Required unless issueKey is specified.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `A query string matched against user attributes such as displayName and emailAddress, using prefix matching. For example 'john' matches displayName 'John Smith' or emailAddress 'john@example.com'.`,
      },
      {
        name: 'startAt',
        type: 'integer',
        required: false,
        description: `The index of the first item to return in a page of results (page offset), default 0.`,
      },
    ],
  },
  {
    name: 'jira_users_with_permissions_search',
    description: `Search for Jira users who both match a search string (against displayName/emailAddress) and hold a given set of permissions for a project or issue. If no search string is provided, all users with the specified permissions are returned. Note: the search scans users up to the thousandth match within the startAt/maxResults range, so results may be fewer than maxResults even if more matches exist.`,
    params: [
      {
        name: 'permissions',
        type: 'string',
        required: true,
        description: `Comma-separated list of permissions the users must hold. Can be permission keys from Get All Permissions, custom project permissions, or deprecated legacy values (e.g. ASSIGNABLE_USER, ASSIGN_ISSUES). Example: BROWSE_PROJECTS,CREATE_ISSUES`,
      },
      {
        name: 'accountId',
        type: 'string',
        required: false,
        description: `Exact account ID to match against. Required unless query is specified. Example: 5b10ac8d82e05b22cc7d4ef5`,
      },
      {
        name: 'issueKey',
        type: 'string',
        required: false,
        description: `The issue key to check permissions against (e.g. permission to a specific issue). Example: PROJ-123`,
      },
      {
        name: 'maxResults',
        type: 'integer',
        required: false,
        description: `The maximum number of items to return per page. Default is 50.`,
      },
      {
        name: 'projectKey',
        type: 'string',
        required: false,
        description: `The project key (case sensitive) to check permissions against. Example: PROJ`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Search string matched against user attributes such as displayName and emailAddress. Matches on prefix of the attribute value. Example: john`,
      },
      {
        name: 'startAt',
        type: 'integer',
        required: false,
        description: `The index of the first item to return in a page of results (page offset). Default is 0.`,
      },
    ],
  },
  {
    name: 'jira_version_create',
    description: `Create a new version (release) in a Jira project. Versions track which release fixed or introduced an issue. Requires Administer Projects permission.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Name of the version (e.g. v1.0, Sprint 5)`,
      },
      {
        name: 'project',
        type: 'string',
        required: true,
        description: `Key of the project to add the version to`,
      },
      {
        name: 'archived',
        type: 'boolean',
        required: false,
        description: `Whether to archive this version immediately (default false)`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description of the version`,
      },
      {
        name: 'released',
        type: 'boolean',
        required: false,
        description: `Whether this version has been released (default false)`,
      },
      {
        name: 'releaseDate',
        type: 'string',
        required: false,
        description: `The release date in ISO 8601 date format (e.g. 2024-06-30)`,
      },
      {
        name: 'startDate',
        type: 'string',
        required: false,
        description: `The start date in ISO 8601 date format (e.g. 2024-06-01)`,
      },
    ],
  },
  {
    name: 'jira_version_delete',
    description: `Delete a Jira project version. Optionally move unresolved and/or fixed issues to another version before deleting. Requires Administer Projects permission.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The version ID to delete` },
      {
        name: 'moveAffectedIssuesTo',
        type: 'string',
        required: false,
        description: `Version ID to move issues with this version as an affected version to`,
      },
      {
        name: 'moveFixIssuesTo',
        type: 'string',
        required: false,
        description: `Version ID to move unresolved issues with this version as a fix version to`,
      },
    ],
  },
  {
    name: 'jira_version_delete_and_replace',
    description: `Delete a Jira project version and optionally replace references to it. Alternative versions can be provided to update issues that use the deleted version in fixVersion, affectedVersion, or version-picker custom fields. If no alternatives are given, those fields are simply cleared of the deleted version. Requires Administer Projects permission.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the version to delete`,
      },
      {
        name: 'customFieldReplacementList',
        type: 'array',
        required: false,
        description: `Array of objects mapping a custom field ID to a replacement version ID, used when a version-picker custom field contains the deleted version. Example: [{"customFieldId": 10001, "moveTo": 10002}]`,
      },
      {
        name: 'moveAffectedIssuesTo',
        type: 'integer',
        required: false,
        description: `The ID of the version to use as a replacement in the affectedVersion field of issues that reference the deleted version`,
      },
      {
        name: 'moveFixIssuesTo',
        type: 'integer',
        required: false,
        description: `The ID of the version to use as a replacement in the fixVersion field of issues that reference the deleted version`,
      },
    ],
  },
  {
    name: 'jira_version_get',
    description: `Retrieve details of a Jira project version by its ID, including name, release date, status, and associated project.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The version ID to retrieve` },
      {
        name: 'expand',
        type: 'string',
        required: false,
        description: `Additional data to include (e.g. operations, issuesstatus, remotelinks, approvers)`,
      },
    ],
  },
  {
    name: 'jira_version_move',
    description: `Modifies a Jira version's sequence within its project, which affects the display order of versions in Jira. Provide either 'after' (the self URL of the version to place this one after) or 'position' (an absolute position: Earlier, Later, First, Last), but not both.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the version to be moved.`,
      },
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `The URL (self link) of the version after which to place the moved version. Cannot be used together with position.`,
      },
      {
        name: 'position',
        type: 'string',
        required: false,
        description: `An absolute position in which to place the moved version. Cannot be used together with after. One of: Earlier, Later, First, Last.`,
      },
    ],
  },
  {
    name: 'jira_version_related_issue_counts_get',
    description: `Returns counts of issues related to a Jira version: the number of issues where fixVersion is set to the version, the number where affectedVersion is set to the version, and the number where a version custom field is set to the version.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the version to retrieve related issue counts for.`,
      },
    ],
  },
  {
    name: 'jira_version_related_work_create',
    description: `Creates a related work item for a given Jira version. Only a generic link type of related work can be created via this API; the relatedWorkId is auto-generated and should not be provided. Requires Resolve Issues and Edit Issues project permissions.`,
    params: [
      {
        name: 'category',
        type: 'string',
        required: true,
        description: `The category of the related work, e.g. a label describing what kind of related work this is.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the version to associate the related work with.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `The title of the related work.`,
      },
      {
        name: 'url',
        type: 'string',
        required: false,
        description: `The URL of the related work. Required unless this is the native release note related work item (not supported via this API).`,
      },
    ],
  },
  {
    name: 'jira_version_related_work_list',
    description: `Returns the related work items associated with a given Jira version, such as release notes or external links tied to the version.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the version to list related work items for.`,
      },
    ],
  },
  {
    name: 'jira_version_unresolved_issue_count_get',
    description: `Get the total issue count and unresolved issue count for a Jira project version. Useful for checking release readiness before marking a version as released.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the version to get issue counts for`,
      },
    ],
  },
  {
    name: 'jira_version_update',
    description: `Update a Jira project version's name, description, release date, or status (released/archived). Requires Administer Projects permission.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The version ID to update` },
      {
        name: 'archived',
        type: 'boolean',
        required: false,
        description: `Whether this version is archived`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Updated version description`,
      },
      { name: 'name', type: 'string', required: false, description: `Updated version name` },
      {
        name: 'released',
        type: 'boolean',
        required: false,
        description: `Whether this version has been released`,
      },
      {
        name: 'releaseDate',
        type: 'string',
        required: false,
        description: `Updated release date in ISO 8601 date format (e.g. 2024-07-15)`,
      },
      {
        name: 'startDate',
        type: 'string',
        required: false,
        description: `Updated start date in ISO 8601 date format (e.g. 2024-06-15)`,
      },
    ],
  },
  {
    name: 'jira_versions_merge',
    description: `Merges two Jira project versions. The version specified by id is deleted, and any occurrences of its ID in fixVersion (and affectedVersion/custom fields) are replaced with the moveIssuesTo version ID. This is a destructive operation since it permanently deletes the source version. Consider using Delete and Replace Version instead if you need more control over swapping version values.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the version to delete (the source version being merged away).`,
      },
      {
        name: 'moveIssuesTo',
        type: 'string',
        required: true,
        description: `The ID of the version to merge into (the destination version that will replace references to id).`,
      },
    ],
  },
  {
    name: 'jira_workflows_search',
    description: `Search for workflows in the Jira instance with pagination. Returns workflow names, IDs, statuses, and whether they are system or custom workflows.`,
    params: [
      {
        name: 'expand',
        type: 'string',
        required: false,
        description: `Additional data to include (e.g. statuses, transitions)`,
      },
      {
        name: 'isActive',
        type: 'boolean',
        required: false,
        description: `Filter to active (true) or inactive (false) workflows only`,
      },
      {
        name: 'maxResults',
        type: 'integer',
        required: false,
        description: `Maximum number of workflows to return (default 50)`,
      },
      {
        name: 'queryString',
        type: 'string',
        required: false,
        description: `Filter workflows by name (partial match)`,
      },
      {
        name: 'startAt',
        type: 'integer',
        required: false,
        description: `Index of the first workflow to return (default 0)`,
      },
      {
        name: 'workflowName',
        type: 'string',
        required: false,
        description: `Deprecated, no-op. This field never worked (wrong query param name); use queryString instead. Kept only for backward compatibility with existing callers.`,
      },
    ],
  },
  {
    name: 'jira_worklogs_by_ids_list',
    description: `Get worklog details for a list of worklog IDs. Returns up to 1000 worklogs. Only worklogs the caller is permitted to view (marked viewable by all users, or via project role/group permission) are returned.`,
    params: [
      {
        name: 'ids',
        type: 'array',
        required: true,
        description: `A list of worklog IDs to retrieve. Example: [10001, 10002, 10003]`,
      },
      {
        name: 'expand',
        type: 'string',
        required: false,
        description: `Use expand to include additional information about worklogs in the response. Accepts 'properties' to return each worklog's properties.`,
      },
    ],
  },
  {
    name: 'jira_worklogs_deleted_since_list',
    description: `Get a list of worklog IDs and delete timestamps for worklogs deleted after a given date and time. Paginated with a limit of 1000 worklogs per page, ordered oldest to youngest; the response includes an until timestamp and a nextPage URL when more results are available. Does not return worklogs deleted during the last 30 seconds.`,
    params: [
      {
        name: 'since',
        type: 'integer',
        required: false,
        description: `The date and time, as a Unix timestamp in milliseconds, after which deleted worklogs are returned. Defaults to 0 (beginning of time).`,
      },
    ],
  },
  {
    name: 'jira_worklogs_updated_since_list',
    description: `Get a list of worklog IDs and update timestamps for worklogs updated after a given date and time. Paginated with a limit of 1000 worklogs per page, ordered oldest to youngest; the response includes an until timestamp and a nextPage URL when more results are available. Does not return worklogs updated during the last 30 seconds.`,
    params: [
      {
        name: 'expand',
        type: 'string',
        required: false,
        description: `Use expand to include additional information about worklogs in the response. Accepts 'properties' to return each worklog's properties.`,
      },
      {
        name: 'since',
        type: 'integer',
        required: false,
        description: `The date and time, as a Unix timestamp in milliseconds, after which updated worklogs are returned. Defaults to 0 (beginning of time).`,
      },
    ],
  },
]
