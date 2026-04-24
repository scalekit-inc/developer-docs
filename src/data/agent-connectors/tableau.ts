import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  // ─── Auth ───────────────────────────────────────────────────────────────────
  {
    name: 'tableau_auth_signout',
    description:
      'Sign out of Tableau, invalidating the current session token. Call this at the end of an agent session. Scalekit will obtain a fresh token automatically on the next tool call.',
    params: [],
  },
  {
    name: 'tableau_session_get',
    description:
      'Returns information about the current authenticated session, including the site name, site content URL, and the authenticated user. Useful for confirming which site the agent is connected to.',
    params: [],
  },

  // ─── Site ───────────────────────────────────────────────────────────────────
  {
    name: 'tableau_site_get',
    description:
      'Retrieve information about a Tableau site: name, content URL, storage quota, user quota, and status. Optionally include usage statistics.',
    params: [
      {
        name: 'include_usage_statistics',
        type: 'boolean',
        required: false,
        description: 'Set to `true` to include storage and user count statistics.',
      },
    ],
  },

  // ─── Workbooks ──────────────────────────────────────────────────────────────
  {
    name: 'tableau_workbooks_list',
    description:
      'List published workbooks on a Tableau site. Supports filtering (e.g., `name:eq:SalesReport`, `ownerName:eq:jane`), sorting (`name:asc`, `updatedAt:desc`), and pagination.',
    params: [
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: 'Filter expression, e.g. `name:eq:SalesReport` or `ownerName:eq:jane`.',
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: 'Sort expression, e.g. `name:asc` or `updatedAt:desc`.',
      },
      {
        name: 'page_number',
        type: 'integer',
        required: false,
        description: 'Page number (starts at 1).',
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: 'Items per page (max 1000).',
      },
    ],
  },
  {
    name: 'tableau_workbook_search',
    description:
      'Search for workbooks on a Tableau site by exact name. Returns workbooks whose name matches the search term.',
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: 'The workbook name to search for (exact match).',
      },
      {
        name: 'page_number',
        type: 'integer',
        required: false,
        description: 'Page number (starts at 1).',
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: 'Items per page (max 1000).',
      },
    ],
  },
  {
    name: 'tableau_workbook_get',
    description:
      'Retrieve detailed information about a specific workbook: name, owner, project, tags, views, and data connections. Optionally include view count statistics.',
    params: [
      {
        name: 'workbook_id',
        type: 'string',
        required: true,
        description:
          'Workbook LUID. Get it from `tableau_workbooks_list` → `workbooks.workbook[].id`.',
      },
      {
        name: 'include_usage_statistics',
        type: 'boolean',
        required: false,
        description: 'Set to `true` to include view count and high-water-mark statistics.',
      },
    ],
  },
  {
    name: 'tableau_workbook_delete',
    description:
      'Permanently delete a workbook and all of its views from the Tableau site. This action cannot be undone.',
    params: [
      {
        name: 'workbook_id',
        type: 'string',
        required: true,
        description:
          'Workbook LUID. Get it from `tableau_workbooks_list`. WARNING: This is permanent.',
      },
    ],
  },
  {
    name: 'tableau_workbook_connections_list',
    description:
      'List the data connections used by a workbook: connection type, server address, username, and whether the connection is embedded.',
    params: [
      {
        name: 'workbook_id',
        type: 'string',
        required: true,
        description: 'Workbook LUID. Get it from `tableau_workbooks_list`.',
      },
    ],
  },

  // ─── Views ──────────────────────────────────────────────────────────────────
  {
    name: 'tableau_views_list',
    description:
      'List all views (sheets and dashboards) across the entire site. Supports filtering, sorting, and pagination. Use `tableau_list_views` to scope to a single workbook.',
    params: [
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: 'Filter expression, e.g. `name:eq:SalesDashboard`.',
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: 'Sort expression, e.g. `name:asc` or `viewCount:desc`.',
      },
      {
        name: 'include_usage_statistics',
        type: 'boolean',
        required: false,
        description: 'Set to `true` to include view count statistics.',
      },
      {
        name: 'page_number',
        type: 'integer',
        required: false,
        description: 'Page number (starts at 1).',
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: 'Items per page (max 1000).',
      },
    ],
  },
  {
    name: 'tableau_list_views',
    description:
      "List all views (sheets and dashboards) within a specific workbook. Returns each view's LUID, name, content URL, and owner.",
    params: [
      {
        name: 'workbook_id',
        type: 'string',
        required: true,
        description: 'Workbook LUID. Get it from `tableau_workbooks_list`.',
      },
      {
        name: 'include_usage_statistics',
        type: 'boolean',
        required: false,
        description: 'Set to `true` to include view count for each view.',
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: 'Filter expression, e.g. `name:eq:Overview`.',
      },
      {
        name: 'page_number',
        type: 'integer',
        required: false,
        description: 'Page number (starts at 1).',
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: 'Items per page.',
      },
    ],
  },
  {
    name: 'tableau_view_get',
    description:
      'Retrieve detailed information about a specific view: name, owner, workbook, content URL, tags, and creation date.',
    params: [
      {
        name: 'view_id',
        type: 'string',
        required: true,
        description:
          'View LUID. Get it from `tableau_views_list` or `tableau_list_views` → `views.view[].id`.',
      },
      {
        name: 'include_usage_statistics',
        type: 'boolean',
        required: false,
        description: 'Set to `true` to include total view count.',
      },
    ],
  },

  // ─── Data Sources ────────────────────────────────────────────────────────────
  {
    name: 'tableau_datasources_list',
    description:
      'List published data sources on a Tableau site. Supports filtering (e.g., `name:eq:SalesData`, `type:eq:excel`), sorting, and pagination.',
    params: [
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: 'Filter expression, e.g. `name:eq:SalesData` or `type:eq:excel`.',
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: 'Sort expression, e.g. `name:asc` or `updatedAt:desc`.',
      },
      {
        name: 'page_number',
        type: 'integer',
        required: false,
        description: 'Page number (starts at 1).',
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: 'Items per page (max 1000).',
      },
    ],
  },
  {
    name: 'tableau_datasource_get',
    description:
      'Retrieve detailed information about a specific published data source: name, type, owner, project, tags, and connection details.',
    params: [
      {
        name: 'datasource_id',
        type: 'string',
        required: true,
        description:
          'Data source LUID. Get it from `tableau_datasources_list` → `datasources.datasource[].id`.',
      },
    ],
  },
  {
    name: 'tableau_datasource_delete',
    description:
      'Permanently delete a published data source from the Tableau site. This action cannot be undone and will break any workbooks that depend on this data source.',
    params: [
      {
        name: 'datasource_id',
        type: 'string',
        required: true,
        description:
          'Data source LUID. Get it from `tableau_datasources_list`. WARNING: This is permanent.',
      },
    ],
  },

  // ─── Projects ────────────────────────────────────────────────────────────────
  {
    name: 'tableau_projects_list',
    description:
      'List projects on a Tableau site. Projects organize workbooks and data sources. Supports filtering (e.g., `name:eq:Marketing`), sorting, and pagination.',
    params: [
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: 'Filter expression, e.g. `name:eq:Marketing`.',
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: 'Sort expression, e.g. `name:asc`.',
      },
      {
        name: 'page_number',
        type: 'integer',
        required: false,
        description: 'Page number (starts at 1).',
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: 'Items per page (max 1000).',
      },
    ],
  },
  {
    name: 'tableau_project_create',
    description:
      'Create a new project on a Tableau site. Optionally nest it under a parent project and set content permission behavior.',
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: 'Display name for the new project.',
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: 'Optional description.',
      },
      {
        name: 'parent_project_id',
        type: 'string',
        required: false,
        description:
          'Parent project LUID to create a sub-project. Get it from `tableau_projects_list`.',
      },
      {
        name: 'content_permissions',
        type: 'string',
        required: false,
        description: '`ManagedByOwner` (default) or `LockedToProject`.',
      },
    ],
  },
  {
    name: 'tableau_project_update',
    description:
      "Update a project's name, description, parent project, or content permission behavior.",
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: 'Project LUID. Get it from `tableau_projects_list` → `projects.project[].id`.',
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: 'New display name.',
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: 'New description.',
      },
      {
        name: 'parent_project_id',
        type: 'string',
        required: false,
        description: 'New parent project LUID to move the project.',
      },
      {
        name: 'content_permissions',
        type: 'string',
        required: false,
        description: '`ManagedByOwner` or `LockedToProject`.',
      },
    ],
  },
  {
    name: 'tableau_project_delete',
    description:
      'Permanently delete a project from the Tableau site. Content within the project is moved to the default project (not deleted). This action cannot be undone.',
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description:
          'Project LUID. Get it from `tableau_projects_list`. WARNING: This is permanent.',
      },
    ],
  },

  // ─── Users ───────────────────────────────────────────────────────────────────
  {
    name: 'tableau_users_list',
    description:
      'List users on a Tableau site. Supports filtering (e.g., `siteRole:eq:SiteAdministratorCreator`), sorting (`name:asc`, `lastLogin:desc`), and pagination.',
    params: [
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: 'Filter expression, e.g. `siteRole:eq:Viewer` or `name:eq:jane`.',
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: 'Sort expression, e.g. `name:asc` or `lastLogin:desc`.',
      },
      {
        name: 'page_number',
        type: 'integer',
        required: false,
        description: 'Page number (starts at 1).',
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: 'Items per page (max 1000).',
      },
    ],
  },
  {
    name: 'tableau_user_get',
    description:
      'Retrieve information about a specific user: name, email, site role, last login, and authentication type.',
    params: [
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: 'User LUID. Get it from `tableau_users_list` → `users.user[].id`.',
      },
    ],
  },
  {
    name: 'tableau_user_add_to_site',
    description:
      'Add a user to the Tableau site with a specified role. If the user account does not exist, it is created. The `site_role` field controls what the user can do.',
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: 'Username or email address of the user to add.',
      },
      {
        name: 'site_role',
        type: 'string',
        required: true,
        description:
          'Role to assign: `SiteAdministratorCreator`, `SiteAdministratorExplorer`, `Creator`, `ExplorerCanPublish`, `Explorer`, `Viewer`, or `Unlicensed`.',
      },
      {
        name: 'auth_setting',
        type: 'string',
        required: false,
        description: 'Authentication type: `ServerDefault`, `SAML`, or `OpenIDConnect`.',
      },
    ],
  },
  {
    name: 'tableau_user_remove_from_site',
    description:
      "Remove a user from the Tableau site. The user's content (workbooks, data sources) is transferred to the site admin. The user account itself is not deleted from the server.",
    params: [
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: 'User LUID. Get it from `tableau_users_list`.',
      },
    ],
  },

  // ─── Groups ──────────────────────────────────────────────────────────────────
  {
    name: 'tableau_groups_list',
    description:
      'List groups on a Tableau site. Groups simplify permission management — you assign permissions once to a group and they apply to all members.',
    params: [
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: 'Filter expression, e.g. `name:eq:Analytics`.',
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: 'Sort expression, e.g. `name:asc`.',
      },
      {
        name: 'page_number',
        type: 'integer',
        required: false,
        description: 'Page number (starts at 1).',
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: 'Items per page (max 1000).',
      },
    ],
  },
  {
    name: 'tableau_group_create',
    description:
      'Create a new local group on a Tableau site. Optionally set a minimum site role for all group members.',
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: 'Display name for the new group.',
      },
      {
        name: 'minimum_site_role',
        type: 'string',
        required: false,
        description: 'Minimum site role for members: `Viewer`, `Explorer`, `Creator`, etc.',
      },
    ],
  },
  {
    name: 'tableau_group_add_user',
    description:
      'Add a user to a group on a Tableau site. The user must already be a site member. Use this to manage group-based permissions.',
    params: [
      {
        name: 'group_id',
        type: 'string',
        required: true,
        description: 'Group LUID. Get it from `tableau_groups_list` → `groups.group[].id`.',
      },
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: 'User LUID. Get it from `tableau_users_list` → `users.user[].id`.',
      },
    ],
  },
  {
    name: 'tableau_group_remove_user',
    description:
      'Remove a user from a group. The user remains a site member — only group membership is changed.',
    params: [
      {
        name: 'group_id',
        type: 'string',
        required: true,
        description: 'Group LUID. Get it from `tableau_groups_list`.',
      },
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: 'User LUID. Get it from `tableau_users_list`.',
      },
    ],
  },

  // ─── Jobs ────────────────────────────────────────────────────────────────────
  {
    name: 'tableau_jobs_list',
    description:
      'List background jobs on a Tableau site. Jobs include extract refreshes, data source imports, and workbook publishes. Filter by status: `InProgress`, `Success`, `Failed`, or `Cancelled`.',
    params: [
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: 'Filter expression, e.g. `status:eq:Failed`.',
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: 'Sort expression, e.g. `createdAt:desc`.',
      },
      {
        name: 'page_number',
        type: 'integer',
        required: false,
        description: 'Page number (starts at 1).',
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: 'Items per page (max 1000).',
      },
    ],
  },
  {
    name: 'tableau_job_get',
    description:
      'Retrieve the current status and details of a background job: type, status (`InProgress`, `Success`, `Failed`, `Cancelled`), progress percentage, and error details if failed. Use this to poll after triggering a refresh.',
    params: [
      {
        name: 'job_id',
        type: 'string',
        required: true,
        description:
          'Job LUID returned from async operations like workbook or data source refreshes → `job.id`.',
      },
    ],
  },
  {
    name: 'tableau_job_cancel',
    description:
      'Cancel a background job that is currently queued or in progress. Already completed, failed, or cancelled jobs cannot be cancelled.',
    params: [
      {
        name: 'job_id',
        type: 'string',
        required: true,
        description:
          'Job LUID. Get it from `tableau_jobs_list` or from a refresh response. Only queued/in-progress jobs can be cancelled.',
      },
    ],
  },
]
