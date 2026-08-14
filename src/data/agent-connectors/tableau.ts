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
    name: 'tableau_datasource_permissions_list',
    description: `Retrieve the capability grants (permissions) defined for a specific Tableau data source, showing which users and groups can view, edit, or manage it.`,
    params: [
      {
        name: 'datasource_id',
        type: 'string',
        required: true,
        description: `The LUID of the data source to list permissions for`,
      },
    ],
  },
  {
    name: 'tableau_datasource_update',
    description: `Update a Tableau published data source's name, owner, project (move it), or certification status. Only the fields you provide are changed.`,
    params: [
      {
        name: 'datasource_id',
        type: 'string',
        required: true,
        description: `The LUID of the data source to update`,
      },
      {
        name: 'certification_note',
        type: 'string',
        required: false,
        description: `Note explaining the certification status, shown to users`,
      },
      {
        name: 'is_certified',
        type: 'boolean',
        required: false,
        description: `Whether the data source is marked as certified`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New name for the data source`,
      },
      {
        name: 'new_owner_id',
        type: 'string',
        required: false,
        description: `LUID of the user to set as the new owner`,
      },
      {
        name: 'new_project_id',
        type: 'string',
        required: false,
        description: `LUID of the project to move the data source into`,
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
    name: 'tableau_extract_refresh_task_run',
    description: `Trigger a scheduled extract refresh task to run immediately instead of waiting for its next scheduled time. Returns the asynchronous job created to perform the refresh.`,
    params: [
      {
        name: 'task_id',
        type: 'string',
        required: true,
        description: `The LUID of the extract refresh task to run now`,
      },
    ],
  },
  {
    name: 'tableau_extract_refresh_tasks_list',
    description: `List the scheduled extract refresh tasks on a Tableau site, including their schedule and the workbook or data source each task refreshes. Use tableau_extract_refresh_task_run to trigger one immediately.`,
    params: [
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Filter expression to narrow results, e.g. type:eq:RefreshExtractTask`,
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
        description: `Number of tasks to return per page (max 1000)`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort expression, e.g. priority:asc`,
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
    name: 'tableau_project_permissions_add',
    description: `Grant a user or group specific capabilities (permissions) on a Tableau project, such as Read, Write, or ProjectLeader. Capabilities are additive to any existing grants for that grantee.`,
    params: [
      {
        name: 'capabilities',
        type: 'array',
        required: true,
        description: `JSON array of capability grants to apply. Each item has a 'name' (e.g. Read, Write, ProjectLeader) and a 'mode' of Allow or Deny.`,
      },
      {
        name: 'grantee_id',
        type: 'string',
        required: true,
        description: `The LUID of the user or group to grant capabilities to`,
      },
      {
        name: 'grantee_type',
        type: 'string',
        required: true,
        description: `Whether the grantee is a user or a group`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The LUID of the project to grant permissions on`,
      },
    ],
  },
  {
    name: 'tableau_project_permissions_list',
    description: `Retrieve the capability grants (permissions) defined for a specific Tableau project, showing which users and groups can view, publish to, or manage its contents.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The LUID of the project to list permissions for`,
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
    name: 'tableau_schedule_create',
    description: `Create a new server schedule for running extract refreshes, subscriptions, or flow tasks on a recurring basis. Requires server administrator privileges.`,
    params: [
      {
        name: 'frequency',
        type: 'string',
        required: true,
        description: `How often the schedule runs`,
      },
      {
        name: 'frequency_details',
        type: 'object',
        required: true,
        description: `JSON object describing the recurrence details for the chosen frequency, matching Tableau's frequencyDetails shape. Example for Daily: {"start": "23:00:00"}. Example for Hourly: {"start": "07:00:00", "end": "23:00:00", "intervals": {"interval": [{"hours": "4"}]}}. Example for Weekly: {"start": "23:00:00", "intervals": {"interval": [{"weekDay": "Monday"}]}}.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Name of the schedule to create`,
      },
      {
        name: 'execution_order',
        type: 'string',
        required: false,
        description: `Whether tasks on this schedule run in parallel or one after another`,
      },
      {
        name: 'priority',
        type: 'integer',
        required: false,
        description: `Priority of the schedule relative to others (1-100). Lower numbers run first when resources are constrained.`,
      },
      {
        name: 'schedule_type',
        type: 'string',
        required: false,
        description: `Type of tasks this schedule can run`,
      },
    ],
  },
  {
    name: 'tableau_schedule_delete',
    description: `Permanently delete a server schedule. Any extract refresh, subscription, or flow tasks tied to this schedule are removed. This action is irreversible and requires server administrator privileges.`,
    params: [
      {
        name: 'schedule_id',
        type: 'string',
        required: true,
        description: `The ID of the schedule to delete`,
      },
    ],
  },
  {
    name: 'tableau_schedule_update',
    description: `Update an existing server schedule's name, priority, execution order, state, or recurrence details. Only the fields you provide are changed. Requires server administrator privileges.`,
    params: [
      {
        name: 'schedule_id',
        type: 'string',
        required: true,
        description: `The ID of the schedule to update`,
      },
      {
        name: 'execution_order',
        type: 'string',
        required: false,
        description: `Whether tasks on this schedule run in parallel or one after another`,
      },
      {
        name: 'frequency',
        type: 'string',
        required: false,
        description: `How often the schedule runs`,
      },
      {
        name: 'frequency_details',
        type: 'object',
        required: false,
        description: `JSON object describing the recurrence details for the chosen frequency, matching Tableau's frequencyDetails shape. Example: {"start": "23:00:00"}.`,
      },
      { name: 'name', type: 'string', required: false, description: `New name for the schedule` },
      {
        name: 'priority',
        type: 'integer',
        required: false,
        description: `New priority for the schedule relative to others (1-100)`,
      },
      {
        name: 'state',
        type: 'string',
        required: false,
        description: `Whether the schedule is active or suspended`,
      },
    ],
  },
  {
    name: 'tableau_schedules_list',
    description: `Retrieve a list of server schedules used to run extract refreshes, subscriptions, and flow tasks on a recurring basis. Requires server administrator privileges.`,
    params: [
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
        description: `Number of schedules to return per page (max 1000)`,
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
    name: 'tableau_sites_list',
    description: `Retrieve a list of all sites on a Tableau Server or Tableau Cloud pod. Requires server administrator privileges. Supports pagination and filtering.`,
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
        description: `Number of sites to return per page (max 1000)`,
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
    name: 'tableau_user_update',
    description: `Update a Tableau user's site role, full name, email, or authentication setting. Only the fields you provide are changed. Requires site or server administrator privileges.`,
    params: [
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `The LUID of the user to update`,
      },
      {
        name: 'email',
        type: 'string',
        required: false,
        description: `New email address for the user`,
      },
      {
        name: 'full_name',
        type: 'string',
        required: false,
        description: `New full name for the user`,
      },
      {
        name: 'site_role',
        type: 'string',
        required: false,
        description: `New site role controlling the user's permission level on the site`,
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
    name: 'tableau_view_data_get',
    description: `Retrieve the underlying summary data of a Tableau view as CSV, exactly as rendered by the view's current fields and filters. For flexible field selection and filtering against a published data source directly, use tableau_query_view instead.`,
    params: [
      {
        name: 'view_id',
        type: 'string',
        required: true,
        description: `The LUID of the view to retrieve underlying data for`,
      },
      {
        name: 'max_age',
        type: 'integer',
        required: false,
        description: `Maximum age in minutes of cached data to accept before forcing a refresh. Minimum 1.`,
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
    name: 'tableau_view_image_get',
    description: `Render a Tableau view as an image (PNG or SVG). No existing tool can produce a visual snapshot of a view.`,
    params: [
      {
        name: 'view_id',
        type: 'string',
        required: true,
        description: `The LUID of the view to render as an image`,
      },
      {
        name: 'format',
        type: 'string',
        required: false,
        description: `Image format to render. 'svg' requires API version 3.29+.`,
      },
      {
        name: 'max_age',
        type: 'integer',
        required: false,
        description: `Maximum age in minutes of a cached image to accept before forcing a refresh. Minimum 1.`,
      },
      {
        name: 'resolution',
        type: 'string',
        required: false,
        description: `Pixel density of the rendered image. Set to 'high' for a higher-resolution image.`,
      },
    ],
  },
  {
    name: 'tableau_view_pdf_get',
    description: `Render a Tableau view as a PDF document. No existing tool can produce a print-ready export of a view.`,
    params: [
      {
        name: 'view_id',
        type: 'string',
        required: true,
        description: `The LUID of the view to render as a PDF`,
      },
      {
        name: 'max_age',
        type: 'integer',
        required: false,
        description: `Maximum age in minutes of a cached render to accept before forcing a refresh. Minimum 1.`,
      },
      {
        name: 'orientation',
        type: 'string',
        required: false,
        description: `Page orientation for the PDF.`,
      },
      { name: 'type', type: 'string', required: false, description: `Page size for the PDF.` },
      {
        name: 'viz_height',
        type: 'integer',
        required: false,
        description: `Height in pixels used to render the view before converting to PDF.`,
      },
      {
        name: 'viz_width',
        type: 'integer',
        required: false,
        description: `Width in pixels used to render the view before converting to PDF.`,
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
    name: 'tableau_workbook_permission_delete',
    description: `Revoke a single capability grant for a user or group on a Tableau workbook. Requires the grantee type, grantee ID, capability name, and its mode as currently granted.`,
    params: [
      {
        name: 'capability_mode',
        type: 'string',
        required: true,
        description: `The mode of the capability grant to revoke, as currently set (Allow or Deny)`,
      },
      {
        name: 'capability_name',
        type: 'string',
        required: true,
        description: `The name of the capability to revoke, e.g. Read, Write, ExportData`,
      },
      {
        name: 'grantee_id',
        type: 'string',
        required: true,
        description: `The LUID of the user or group whose capability is being revoked`,
      },
      {
        name: 'grantee_type',
        type: 'string',
        required: true,
        description: `Whether the grantee is a user or a group`,
      },
      {
        name: 'workbook_id',
        type: 'string',
        required: true,
        description: `The LUID of the workbook to revoke the permission from`,
      },
    ],
  },
  {
    name: 'tableau_workbook_permissions_add',
    description: `Grant a user or group specific capabilities (permissions) on a Tableau workbook, such as Read, Write, or ExportData. Capabilities are additive to any existing grants for that grantee.`,
    params: [
      {
        name: 'capabilities',
        type: 'array',
        required: true,
        description: `JSON array of capability grants to apply. Each item has a 'name' (e.g. Read, Write, Delete, ExportData, ChangePermissions, ExportXml, ViewComments, AddComment, Filter, ViewUnderlyingData, ShareView, WebAuthoring, RunExplainData) and a 'mode' of Allow or Deny.`,
      },
      {
        name: 'grantee_id',
        type: 'string',
        required: true,
        description: `The LUID of the user or group to grant capabilities to`,
      },
      {
        name: 'grantee_type',
        type: 'string',
        required: true,
        description: `Whether the grantee is a user or a group`,
      },
      {
        name: 'workbook_id',
        type: 'string',
        required: true,
        description: `The LUID of the workbook to grant permissions on`,
      },
    ],
  },
  {
    name: 'tableau_workbook_permissions_list',
    description: `Retrieve the capability grants (permissions) defined for a specific Tableau workbook, showing which users and groups can view, edit, or manage it.`,
    params: [
      {
        name: 'workbook_id',
        type: 'string',
        required: true,
        description: `The LUID of the workbook to list permissions for`,
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
    name: 'tableau_workbook_update',
    description: `Update a Tableau workbook's name, description, owner, project (move it), tab visibility, or certification status. Only the fields you provide are changed.`,
    params: [
      {
        name: 'workbook_id',
        type: 'string',
        required: true,
        description: `The LUID of the workbook to update`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New description for the workbook`,
      },
      { name: 'name', type: 'string', required: false, description: `New name for the workbook` },
      {
        name: 'new_owner_id',
        type: 'string',
        required: false,
        description: `LUID of the user to set as the new owner`,
      },
      {
        name: 'new_project_id',
        type: 'string',
        required: false,
        description: `LUID of the project to move the workbook into`,
      },
      {
        name: 'show_tabs',
        type: 'boolean',
        required: false,
        description: `Whether sheet tabs are visible when viewing the workbook`,
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
