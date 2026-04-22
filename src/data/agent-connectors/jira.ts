import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'jira_attachment_delete',
    description: `Permanently delete a Jira issue attachment by its ID. This action cannot be undone. Requires Delete Attachments project permission.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The attachment ID to delete` },
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
    name: 'jira_issues_search',
    description: `Search for Jira issues using JQL (Jira Query Language). Returns a paginated list of matching issues with their fields. Use fields to control what data is returned per issue.`,
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
        name: 'startAt',
        type: 'integer',
        required: false,
        description: `Index of the first issue to return for pagination (default 0)`,
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
    name: 'jira_priorities_list',
    description: `Get all issue priority levels configured in the Jira instance (e.g. Highest, High, Medium, Low, Lowest). Returns priority names and IDs for use in issue creation and filtering.`,
    params: [],
  },
  {
    name: 'jira_priority_get',
    description: `Retrieve details of a specific Jira priority level by its ID, including name, description, icon URL, and status color.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The priority ID to retrieve` },
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
        name: 'startAt',
        type: 'integer',
        required: false,
        description: `Index of the first workflow to return (default 0)`,
      },
      {
        name: 'workflowName',
        type: 'string',
        required: false,
        description: `Filter workflows by name (partial match)`,
      },
    ],
  },
]
