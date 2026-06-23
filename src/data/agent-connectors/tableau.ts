import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'tableau_auth_signout',
    description: `Sign out of Tableau Server or Tableau Cloud, invalidating the current authentication token.`,
    params: [],
  },
  {
    name: 'tableau_datasource_delete',
    description: `Delete a published data source from a Tableau site. This action is permanent and also removes the associated data connection.`,
    params: [
      {
        name: 'datasource_id',
        type: 'string',
        required: true,
        description: `The LUID of the data source to delete`,
      },
    ],
  },
  {
    name: 'tableau_datasource_get',
    description: `Retrieve detailed information about a specific Tableau data source by its ID, including metadata, connections, project, and owner.`,
    params: [
      {
        name: 'datasource_id',
        type: 'string',
        required: true,
        description: `The LUID of the data source to retrieve`,
      },
    ],
  },
  {
    name: 'tableau_datasources_list',
    description: `Retrieve a filtered, sorted list of published data sources on a Tableau site. Supports pagination and filtering by name, type, project, and owner.`,
    params: [
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Filter expression to narrow results, e.g. name:eq:SalesData`,
      },
      {
        name: 'page_number',
        type: 'integer',
        required: false,
        description: `Page number for pagination (1-based)`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of data sources to return per page (max 1000)`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort expression, e.g. name:asc or updatedAt:desc`,
      },
    ],
  },
  {
    name: 'tableau_group_add_user',
    description: `Add an existing Tableau site user to a group. The user must already be a member of the site before being added to a group.`,
    params: [
      {
        name: 'group_id',
        type: 'string',
        required: true,
        description: `The LUID of the group to add the user to`,
      },
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `The LUID of the user to add to the group`,
      },
    ],
  },
  {
    name: 'tableau_group_create',
    description: `Create a new local group on a Tableau site. Groups simplify permission management by allowing you to assign permissions to multiple users simultaneously.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name of the group to create` },
      {
        name: 'minimum_site_role',
        type: 'string',
        required: false,
        description: `Minimum site role for users added to this group`,
      },
    ],
  },
  {
    name: 'tableau_group_remove_user',
    description: `Remove a user from a Tableau site group. The user remains a member of the site but loses any permissions inherited from this group.`,
    params: [
      {
        name: 'group_id',
        type: 'string',
        required: true,
        description: `The LUID of the group to remove the user from`,
      },
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `The LUID of the user to remove from the group`,
      },
    ],
  },
  {
    name: 'tableau_groups_list',
    description: `Retrieve a filtered, sorted list of groups on a Tableau site. Groups are used to manage permissions for multiple users at once.`,
    params: [
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Filter expression to narrow results, e.g. name:eq:Sales`,
      },
      {
        name: 'page_number',
        type: 'integer',
        required: false,
        description: `Page number for pagination (1-based)`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of groups to return per page (max 1000)`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort expression, e.g. name:asc`,
      },
    ],
  },
  {
    name: 'tableau_job_cancel',
    description: `Cancel an asynchronous Tableau job that is currently queued or in progress, such as an extract refresh or flow run.`,
    params: [
      {
        name: 'job_id',
        type: 'string',
        required: true,
        description: `The LUID of the job to cancel`,
      },
    ],
  },
  {
    name: 'tableau_job_get',
    description: `Retrieve the status and details of an asynchronous Tableau job, such as an extract refresh, workbook publish, or flow run. Use this to monitor long-running operations.`,
    params: [
      {
        name: 'job_id',
        type: 'string',
        required: true,
        description: `The LUID of the job to retrieve`,
      },
    ],
  },
  {
    name: 'tableau_jobs_list',
    description: `Retrieve a filtered, sorted list of asynchronous jobs on a Tableau site. Jobs include extract refreshes, workbook publishes, data-driven alerts, and flow runs.`,
    params: [
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Filter expression to narrow results, e.g. status:eq:InProgress`,
      },
      {
        name: 'page_number',
        type: 'integer',
        required: false,
        description: `Page number for pagination (1-based)`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of jobs to return per page (max 1000)`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort expression, e.g. createdAt:desc`,
      },
    ],
  },
  {
    name: 'tableau_list_views',
    description: `List views (individual sheets and dashboards) within a specific workbook, or all views across an entire Tableau site. Supports filtering by name or owner and pagination.`,
    params: [
      {
        name: 'workbook_id',
        type: 'string',
        required: true,
        description: `The LUID of the workbook to list views from. If omitted, lists all views on the site.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Filter expression using Tableau REST API filter syntax (e.g., name:eq:Sales Dashboard)`,
      },
      {
        name: 'include_usage_statistics',
        type: 'boolean',
        required: false,
        description: `Include view usage statistics (total views count) in the response`,
      },
      {
        name: 'page_number',
        type: 'integer',
        required: false,
        description: `Page number to retrieve (1-based)`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of views to return per page (max 1000)`,
      },
    ],
  },
  {
    name: 'tableau_project_create',
    description: `Create a new project on a Tableau site to organize workbooks, data sources, and flows. Optionally specify a parent project to create a nested project hierarchy.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Name of the project to create`,
      },
      {
        name: 'content_permissions',
        type: 'string',
        required: false,
        description: `Content permission mode: ManagedByOwner or LockedToProject`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description of the project`,
      },
      {
        name: 'parent_project_id',
        type: 'string',
        required: false,
        description: `LUID of the parent project to create a nested project`,
      },
    ],
  },
  {
    name: 'tableau_project_delete',
    description: `Delete a project from a Tableau site. This action is permanent. Content within the project may be moved to the Default project or deleted depending on server settings.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The LUID of the project to delete`,
      },
    ],
  },
  {
    name: 'tableau_project_update',
    description: `Update an existing project on a Tableau site. You can rename the project, change its description, content permissions, or move it to a different parent project.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The LUID of the project to update`,
      },
      {
        name: 'content_permissions',
        type: 'string',
        required: false,
        description: `Content permission mode: ManagedByOwner or LockedToProject`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New description for the project`,
      },
      { name: 'name', type: 'string', required: false, description: `New name for the project` },
      {
        name: 'parent_project_id',
        type: 'string',
        required: false,
        description: `LUID of the parent project (set to move this project under a different parent)`,
      },
    ],
  },
  {
    name: 'tableau_projects_list',
    description: `Retrieve a filtered, sorted list of projects on a Tableau site. Projects are used to organize workbooks, views, and data sources.`,
    params: [
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Filter expression to narrow results, e.g. name:eq:Marketing`,
      },
      {
        name: 'page_number',
        type: 'integer',
        required: false,
        description: `Page number for pagination (1-based)`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of projects to return per page (max 1000)`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort expression, e.g. name:asc`,
      },
    ],
  },
  {
    name: 'tableau_query_view',
    description: `Run a structured query against a published Tableau data source using the VizQL Data Service API. Supports selecting fields, applying filters, sorting, and limiting rows. Returns JSON data. Available on Tableau Cloud and Tableau Server 2023.1+.`,
    params: [
      {
        name: 'datasource_luid',
        type: 'string',
        required: true,
        description: `The LUID of the published data source to query`,
      },
      {
        name: 'fields',
        type: 'string',
        required: true,
        description: `JSON array of field objects to select, each with a fieldCaption property`,
      },
      {
        name: 'filters',
        type: 'string',
        required: false,
        description: `JSON array of filter conditions to apply to the query`,
      },
      {
        name: 'max_rows',
        type: 'integer',
        required: false,
        description: `Maximum number of rows to return from the query`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `JSON array of sort criteria applied to query results`,
      },
    ],
  },
  {
    name: 'tableau_session_get',
    description: `Returns information about the current authenticated session, including the site LUID, site name, and authenticated user details. Call this after tableau_auth_signin to retrieve the site_id needed for the connected account configuration.`,
    params: [],
  },
  {
    name: 'tableau_site_get',
    description: `Retrieve information about a specific Tableau site, including its name, content URL, status, storage quota, and user quota settings.`,
    params: [
      {
        name: 'include_usage_statistics',
        type: 'boolean',
        required: false,
        description: `If true, include view count and storage usage statistics`,
      },
    ],
  },
  {
    name: 'tableau_user_add_to_site',
    description: `Add a user to a Tableau site with a specified site role. If the user does not exist in the server, a new user account will be created.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Username of the user to add (e.g. john.doe or john.doe@example.com)`,
      },
      {
        name: 'site_role',
        type: 'string',
        required: true,
        description: `The role to assign to the user on the site`,
      },
      {
        name: 'auth_setting',
        type: 'string',
        required: false,
        description: `Authentication type for the user, e.g. SAML or ServerDefault`,
      },
    ],
  },
  {
    name: 'tableau_user_get',
    description: `Retrieve information about a specific user on a Tableau site, including their name, email, site role, and authentication settings.`,
    params: [
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `The LUID of the user to retrieve`,
      },
    ],
  },
  {
    name: 'tableau_user_remove_from_site',
    description: `Remove a user from a Tableau site. The user's content (workbooks, data sources) is reassigned to the site administrator.`,
    params: [
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `The LUID of the user to remove from the site`,
      },
    ],
  },
  {
    name: 'tableau_users_list',
    description: `Retrieve a filtered, sorted list of users added to a Tableau site. Supports pagination and filtering by name, site role, and other attributes.`,
    params: [
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Filter expression to narrow results, e.g. name:eq:john.doe`,
      },
      {
        name: 'page_number',
        type: 'integer',
        required: false,
        description: `Page number for pagination (1-based)`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of users to return per page (max 1000)`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort expression, e.g. name:asc`,
      },
    ],
  },
  {
    name: 'tableau_view_get',
    description: `Retrieve detailed information about a specific Tableau view by its ID, including name, content URL, owner, workbook, project, and optional usage statistics.`,
    params: [
      {
        name: 'view_id',
        type: 'string',
        required: true,
        description: `The LUID of the view to retrieve`,
      },
      {
        name: 'include_usage_statistics',
        type: 'boolean',
        required: false,
        description: `If true, include view count and high-water-mark usage statistics`,
      },
    ],
  },
  {
    name: 'tableau_views_list',
    description: `Retrieve a filtered, sorted list of all views on a Tableau site. Supports pagination, filtering by name or owner, and sorting.`,
    params: [
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Filter expression to narrow results, e.g. name:eq:SalesView`,
      },
      {
        name: 'include_usage_statistics',
        type: 'boolean',
        required: false,
        description: `If true, include view count and high-water-mark usage statistics`,
      },
      {
        name: 'page_number',
        type: 'integer',
        required: false,
        description: `Page number for pagination (1-based)`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of views to return per page (max 1000)`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort expression, e.g. name:asc or viewCount:desc`,
      },
    ],
  },
  {
    name: 'tableau_workbook_connections_list',
    description: `Returns the data connections for a published workbook, including connection type, server address, port, username, and whether embedded credentials are used.`,
    params: [
      {
        name: 'workbook_id',
        type: 'string',
        required: true,
        description: `The LUID of the workbook whose connections to list`,
      },
    ],
  },
  {
    name: 'tableau_workbook_delete',
    description: `Delete a workbook from a Tableau site. This action is permanent and also removes all views and associated data connections.`,
    params: [
      {
        name: 'workbook_id',
        type: 'string',
        required: true,
        description: `The LUID of the workbook to delete`,
      },
    ],
  },
  {
    name: 'tableau_workbook_get',
    description: `Retrieve detailed information about a specific Tableau workbook by its ID, including metadata, project, owner, tags, and optional usage statistics.`,
    params: [
      {
        name: 'workbook_id',
        type: 'string',
        required: true,
        description: `The LUID of the workbook to retrieve`,
      },
      {
        name: 'include_usage_statistics',
        type: 'boolean',
        required: false,
        description: `If true, include view and high-water-mark usage statistics in the response`,
      },
    ],
  },
  {
    name: 'tableau_workbook_search',
    description: `Search for workbooks on a Tableau site by name. Returns workbooks whose name matches the search term.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The workbook name to search for (exact match)`,
      },
      {
        name: 'page_number',
        type: 'integer',
        required: false,
        description: `Page number for pagination (1-based)`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of workbooks to return per page (max 1000)`,
      },
    ],
  },
  {
    name: 'tableau_workbooks_list',
    description: `Retrieve a filtered, sorted list of workbooks on a specified Tableau site. Supports pagination and filtering by name, owner, project, and more.`,
    params: [
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Filter expression to narrow results, e.g. name:eq:SalesReport`,
      },
      {
        name: 'page_number',
        type: 'integer',
        required: false,
        description: `Page number for pagination (1-based)`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of workbooks to return per page (max 1000)`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort expression, e.g. name:asc or updatedAt:desc`,
      },
    ],
  },
]
