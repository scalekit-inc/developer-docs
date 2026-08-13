import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'googlelooker_create_dashboard',
    description: `Create a new, empty Looker dashboard. Requires a title and the ID of the folder it should live in; a dashboard's title must be unique within that destination folder. Add tiles afterward from the Looker UI or the dashboard element APIs.`,
    params: [
      {
        name: 'folder_id',
        type: 'string',
        required: true,
        description: `ID of the folder this dashboard should be created in`,
      },
      { name: 'title', type: 'string', required: true, description: `Title for the new dashboard` },
      {
        name: 'background_color',
        type: 'string',
        required: false,
        description: `Background color for the dashboard, as a hex string`,
      },
      {
        name: 'crossfilter_enabled',
        type: 'boolean',
        required: false,
        description: `Enable cross-filtering between tiles on this dashboard`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional description of the dashboard`,
      },
    ],
  },
  {
    name: 'googlelooker_create_folder',
    description: `Create a new folder (space) to organize dashboards and Looks. Provide a parent_id to nest it under an existing folder; omit it to create a root-level folder (permissions permitting). The folder name must be unique among its siblings.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name for the new folder` },
      {
        name: 'parent_id',
        type: 'string',
        required: false,
        description: `ID of the parent folder to nest this folder under`,
      },
    ],
  },
  {
    name: 'googlelooker_create_look',
    description: `Save a query as a new Look so it can be revisited, shared, and run with Run Look. Create the underlying query first with Create Query, then pass its query ID here.`,
    params: [
      {
        name: 'query_id',
        type: 'string',
        required: true,
        description: `The ID of the query this Look should run`,
      },
      { name: 'title', type: 'string', required: true, description: `Title for the new Look` },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional description of the Look`,
      },
      {
        name: 'folder_id',
        type: 'string',
        required: false,
        description: `Folder to save the Look into. Defaults to the user's personal folder.`,
      },
    ],
  },
  {
    name: 'googlelooker_create_query',
    description: `Define and persist a query against a LookML model and explore, without running it. Returns a query ID (and slug) you can execute repeatedly with Run Query or attach to a new Look with Create Look, instead of resending the full query definition each time.`,
    params: [
      {
        name: 'fields',
        type: 'string',
        required: true,
        description: `Comma-separated list of LookML field names to include (e.g., orders.count,orders.total_revenue)`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The LookML model name to query against`,
      },
      {
        name: 'view',
        type: 'string',
        required: true,
        description: `The explore (view) name within the model to query`,
      },
      {
        name: 'filters',
        type: 'object',
        required: false,
        description: `Filter conditions as a JSON object (field_name: filter_value pairs)`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of rows the query returns when run`,
      },
      {
        name: 'sorts',
        type: 'string',
        required: false,
        description: `Comma-separated list of sort fields with optional direction (e.g., orders.total_revenue desc)`,
      },
    ],
  },
  {
    name: 'googlelooker_create_scheduled_plan',
    description: `Create a recurring (or one-shot) Scheduled Plan that runs a dashboard, Look, LookML dashboard, or query and delivers the results to one or more destinations (email, webhook, S3, SFTP, etc). Set exactly one of dashboard_id, look_id, lookml_dashboard_id, or query_id as the content to deliver, and provide a crontab or datagroup to control when it runs.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name of this scheduled plan` },
      {
        name: 'scheduled_plan_destination',
        type: 'array',
        required: true,
        description: `Array of destination objects describing where and how to deliver the results`,
      },
      {
        name: 'crontab',
        type: 'string',
        required: false,
        description: `Vixie-style crontab specifying when this plan runs`,
      },
      {
        name: 'dashboard_id',
        type: 'string',
        required: false,
        description: `ID of the dashboard this plan should run and deliver`,
      },
      {
        name: 'enabled',
        type: 'boolean',
        required: false,
        description: `Whether this scheduled plan is enabled`,
      },
      {
        name: 'filters_string',
        type: 'string',
        required: false,
        description: `Query string of filter values to run the dashboard or Look with`,
      },
      {
        name: 'look_id',
        type: 'string',
        required: false,
        description: `ID of the Look this plan should run and deliver`,
      },
      {
        name: 'lookml_dashboard_id',
        type: 'string',
        required: false,
        description: `ID (slug) of the LookML dashboard this plan should run and deliver`,
      },
      {
        name: 'query_id',
        type: 'string',
        required: false,
        description: `ID of the saved query this plan should run and deliver`,
      },
      {
        name: 'require_change',
        type: 'boolean',
        required: false,
        description: `Only deliver when the results changed since the last run`,
      },
      {
        name: 'require_no_results',
        type: 'boolean',
        required: false,
        description: `Only deliver when the dashboard or Look returns no results`,
      },
      {
        name: 'require_results',
        type: 'boolean',
        required: false,
        description: `Only deliver when the dashboard or Look returns results`,
      },
      {
        name: 'run_once',
        type: 'boolean',
        required: false,
        description: `Whether this plan should run only once and then disable itself`,
      },
      {
        name: 'timezone',
        type: 'string',
        required: false,
        description: `IANA timezone used to interpret the crontab`,
      },
    ],
  },
  {
    name: 'googlelooker_delete_dashboard',
    description: `Permanently delete a Looker dashboard by ID. If the dashboard has not already been soft-deleted (trashed via Update Dashboard's deleted flag), your Looker instance may require that step first depending on configuration. This action cannot be undone.`,
    params: [
      {
        name: 'dashboard_id',
        type: 'string',
        required: true,
        description: `The ID of the Looker dashboard to delete`,
      },
    ],
  },
  {
    name: 'googlelooker_delete_folder',
    description: `Permanently delete a folder by ID, along with all Looks and dashboards it directly contains. This action cannot be undone — make sure nothing of value remains in the folder before deleting.`,
    params: [
      {
        name: 'folder_id',
        type: 'string',
        required: true,
        description: `The ID of the folder to delete`,
      },
    ],
  },
  {
    name: 'googlelooker_delete_look',
    description: `Permanently delete a Look by ID. This is a hard delete with no undo — unlike removing a Look from the Looker UI (which soft-deletes it), this call destroys the Look data immediately. To soft-delete instead, use Update Look with deleted set to true.`,
    params: [
      {
        name: 'look_id',
        type: 'string',
        required: true,
        description: `The numeric ID of the Look to delete`,
      },
    ],
  },
  {
    name: 'googlelooker_delete_scheduled_plan',
    description: `Permanently delete a Scheduled Plan by ID, stopping all future scheduled deliveries. This action cannot be undone.`,
    params: [
      {
        name: 'scheduled_plan_id',
        type: 'string',
        required: true,
        description: `The ID of the scheduled plan to delete`,
      },
    ],
  },
  {
    name: 'googlelooker_get_current_user',
    description: `Retrieve the profile of the currently authenticated Looker user, including their ID, display name, email, and role IDs.`,
    params: [
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of user fields to include in the response`,
      },
    ],
  },
  {
    name: 'googlelooker_get_dashboard',
    description: `Retrieve the full metadata of a Looker dashboard by its ID, including all tile definitions (charts, tables, text, filters), layout, linked Looks, and underlying queries.`,
    params: [
      {
        name: 'dashboard_id',
        type: 'string',
        required: true,
        description: `The ID of the Looker dashboard to retrieve`,
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of dashboard fields to include in the response`,
      },
    ],
  },
  {
    name: 'googlelooker_get_folder',
    description: `Retrieve a single folder by ID, including its name, parent folder, creator, and content counts. Use List Folders first to find a folder ID.`,
    params: [
      {
        name: 'folder_id',
        type: 'string',
        required: true,
        description: `The ID of the folder to retrieve`,
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of folder fields to include in the response`,
      },
    ],
  },
  {
    name: 'googlelooker_get_look',
    description: `Retrieve the metadata and definition of a saved Look by its ID: title, description, folder, owner, and underlying query ID. Use Get Look Results or Run Look to execute it and fetch data.`,
    params: [
      {
        name: 'look_id',
        type: 'string',
        required: true,
        description: `The numeric ID of the Look to retrieve`,
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of Look fields to include in the response`,
      },
    ],
  },
  {
    name: 'googlelooker_get_look_results',
    description: `Run a saved Look and return results in the specified format. Executes the Look's underlying query against the connected database. Use result_format to control the output: json for structured data, csv for tabular export, xlsx for Excel.`,
    params: [
      {
        name: 'look_id',
        type: 'string',
        required: true,
        description: `The numeric ID of the Look to fetch results from`,
      },
      {
        name: 'result_format',
        type: 'string',
        required: true,
        description: `Desired output format for results. Accepted values: json, json_detail, json_bi, csv, txt, html, md, xlsx, sql, png, jpg`,
      },
      {
        name: 'apply_formatting',
        type: 'boolean',
        required: false,
        description: `Apply model-specified formatting to each result value`,
      },
      {
        name: 'apply_vis',
        type: 'boolean',
        required: false,
        description: `Apply visualization options to results`,
      },
      {
        name: 'cache',
        type: 'boolean',
        required: false,
        description: `Get results from cache if available. Set to false to force a fresh database query.`,
      },
      {
        name: 'cache_only',
        type: 'boolean',
        required: false,
        description: `Retrieve any results from cache even if expired`,
      },
      {
        name: 'force_production',
        type: 'boolean',
        required: false,
        description: `Override development mode settings to force use of production models`,
      },
      {
        name: 'generate_drill_links',
        type: 'boolean',
        required: false,
        description: `Generate drill links for json_detail format`,
      },
      {
        name: 'image_height',
        type: 'integer',
        required: false,
        description: `Render height for image formats (png, jpg)`,
      },
      {
        name: 'image_width',
        type: 'integer',
        required: false,
        description: `Render width for image formats (png, jpg)`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of rows to return. May override the limit in the saved query.`,
      },
      {
        name: 'path_prefix',
        type: 'string',
        required: false,
        description: `Prefix to use for drill links (URL encoded)`,
      },
      {
        name: 'rebuild_pdts',
        type: 'boolean',
        required: false,
        description: `Rebuild Persistent Derived Tables (PDTs) used in the query`,
      },
      {
        name: 'server_table_calcs',
        type: 'boolean',
        required: false,
        description: `Perform table calculations on query results server-side`,
      },
    ],
  },
  {
    name: 'googlelooker_get_query',
    description: `Retrieve the definition of a previously created query by its ID: the model, explore, fields, filters, sorts, and row limit it was defined with. Use Run Query to execute it and fetch data, or Create Look to save it as a Look.`,
    params: [
      {
        name: 'query_id',
        type: 'string',
        required: true,
        description: `The ID of the query to retrieve`,
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of query fields to include in the response`,
      },
    ],
  },
  {
    name: 'googlelooker_get_scheduled_plan',
    description: `Retrieve a single Scheduled Plan by ID: its schedule (crontab/datagroup), destinations, and the dashboard, Look, LookML dashboard, or query it delivers.`,
    params: [
      {
        name: 'scheduled_plan_id',
        type: 'string',
        required: true,
        description: `The ID of the scheduled plan to retrieve`,
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of scheduled plan fields to include in the response`,
      },
    ],
  },
  {
    name: 'googlelooker_list_dashboards',
    description: `List all dashboards in a Looker instance that the caller has access to. Returns dashboard metadata including ID, title, folder, description, and last updated time.`,
    params: [
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of dashboard fields to include in the response`,
      },
    ],
  },
  {
    name: 'googlelooker_list_explores',
    description: `Retrieve a LookML model by name. The response includes an explores array listing all available explores in that model. Use fields=explores to limit the response to just explore metadata.`,
    params: [
      {
        name: 'model_name',
        type: 'string',
        required: true,
        description: `The LookML model name to retrieve explores for`,
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of model fields to include in the response`,
      },
    ],
  },
  {
    name: 'googlelooker_list_folders',
    description: `List all folders (spaces) in the Looker instance including personal folders. Returns folder ID, name, parent folder, creator, and content counts. Use folder IDs to filter Looks and Dashboards by location.`,
    params: [
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of folder fields to include in the response`,
      },
    ],
  },
  {
    name: 'googlelooker_list_looks',
    description: `List all Looks the caller has access to. Returns Look metadata including ID, title, folder, owner, and last run time. Soft-deleted Looks are excluded.`,
    params: [
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of Look fields to include in the response`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of Looks to return`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of results to skip before returning any`,
      },
      {
        name: 'sorts',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to sort results by`,
      },
    ],
  },
  {
    name: 'googlelooker_list_models',
    description: `List all available LookML models in the Looker instance. Returns each model's name, project, allowed database connections, and explore count. Use this to discover which models and explores are available before running queries.`,
    params: [
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of model fields to include in the response`,
      },
    ],
  },
  {
    name: 'googlelooker_list_scheduled_plans',
    description: `List Scheduled Plans. By default returns the plans owned by the calling user; set all_users to true (requires admin permission) to list scheduled plans for every user in the instance.`,
    params: [
      {
        name: 'all_users',
        type: 'boolean',
        required: false,
        description: `Return scheduled plans for all users instead of just the caller`,
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of scheduled plan fields to include in the response`,
      },
      {
        name: 'user_id',
        type: 'string',
        required: false,
        description: `Return only scheduled plans owned by this user ID`,
      },
    ],
  },
  {
    name: 'googlelooker_run_inline_query',
    description: `Execute an ad-hoc query against a LookML model and explore without saving it as a Look. Specify fields, filters, sorts, and a row limit. Useful for one-off analysis and agent-driven data exploration. Complex queries may take longer; 120s timeout applied.`,
    params: [
      {
        name: 'fields',
        type: 'string',
        required: true,
        description: `Comma-separated list of LookML field names to include (e.g., orders.count,orders.total_revenue)`,
      },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `The LookML model name to query against`,
      },
      {
        name: 'result_format',
        type: 'string',
        required: true,
        description: `Output format for the query results. Accepted values: json, json_detail, json_bi, csv, txt, html, md, xlsx, sql, png, jpg`,
      },
      {
        name: 'view',
        type: 'string',
        required: true,
        description: `The explore (view) name within the model to query`,
      },
      {
        name: 'filters',
        type: 'object',
        required: false,
        description: `Filter conditions as a JSON object (field_name: filter_value pairs)`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of rows to return from the query`,
      },
      {
        name: 'sorts',
        type: 'string',
        required: false,
        description: `Comma-separated list of sort fields with optional direction (e.g., orders.total_revenue desc)`,
      },
    ],
  },
  {
    name: 'googlelooker_run_look',
    description: `Run a saved Look and return the results in the specified format. Executes the Look's underlying query against the connected database and returns the current data.`,
    params: [
      {
        name: 'look_id',
        type: 'string',
        required: true,
        description: `The numeric ID of the Look to run`,
      },
      {
        name: 'result_format',
        type: 'string',
        required: true,
        description: `Desired output format for results. Accepted values: json, json_detail, csv, txt, html, md, xlsx, sql, png, jpg`,
      },
      {
        name: 'apply_formatting',
        type: 'boolean',
        required: false,
        description: `Apply model-specified formatting to each result value`,
      },
      {
        name: 'apply_vis',
        type: 'boolean',
        required: false,
        description: `Apply visualization options to results`,
      },
      {
        name: 'cache',
        type: 'boolean',
        required: false,
        description: `Get results from cache if available. Set to false to force a fresh database query.`,
      },
      {
        name: 'cache_only',
        type: 'boolean',
        required: false,
        description: `Retrieve any results from cache even if expired`,
      },
      {
        name: 'force_production',
        type: 'boolean',
        required: false,
        description: `Override development mode settings to force use of production models`,
      },
      {
        name: 'generate_drill_links',
        type: 'boolean',
        required: false,
        description: `Generate drill links for json_detail format`,
      },
      {
        name: 'image_height',
        type: 'integer',
        required: false,
        description: `Render height for image formats (png, jpg)`,
      },
      {
        name: 'image_width',
        type: 'integer',
        required: false,
        description: `Render width for image formats (png, jpg)`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of rows to return. May override the limit in the saved query.`,
      },
      {
        name: 'path_prefix',
        type: 'string',
        required: false,
        description: `Prefix to use for drill links (URL encoded)`,
      },
      {
        name: 'rebuild_pdts',
        type: 'boolean',
        required: false,
        description: `Rebuild Persistent Derived Tables (PDTs) used in the query`,
      },
      {
        name: 'server_table_calcs',
        type: 'boolean',
        required: false,
        description: `Perform table calculations on query results server-side`,
      },
    ],
  },
  {
    name: 'googlelooker_run_query',
    description: `Execute a previously saved query (created with Create Query) by its query ID and return results in the specified format. Cheaper than Run Inline Query when re-running the same query definition repeatedly.`,
    params: [
      {
        name: 'query_id',
        type: 'string',
        required: true,
        description: `The ID of the saved query to run`,
      },
      {
        name: 'result_format',
        type: 'string',
        required: true,
        description: `Desired output format for results. Accepted values: json, json_detail, json_bi, csv, txt, html, md, xlsx, sql, png, jpg`,
      },
      {
        name: 'cache',
        type: 'boolean',
        required: false,
        description: `Get results from cache if available. Set to false to force a fresh database query.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of rows to return. Overrides the limit baked into the saved query.`,
      },
    ],
  },
  {
    name: 'googlelooker_run_scheduled_plan_once',
    description: `Immediately run an existing, already-saved Scheduled Plan one time and deliver it to its configured destinations, without waiting for its next scheduled occurrence and without changing that schedule. Optionally override the query filters for just this one run.`,
    params: [
      {
        name: 'scheduled_plan_id',
        type: 'string',
        required: true,
        description: `The ID of the scheduled plan to run immediately`,
      },
      {
        name: 'filters_string',
        type: 'string',
        required: false,
        description: `Query string of filter values to use for just this one run, overriding the plan's saved filters`,
      },
    ],
  },
  {
    name: 'googlelooker_search_dashboards',
    description: `Search dashboards by title, description, or folder instead of listing every dashboard in the instance. Useful for finding a specific dashboard when there are too many to browse.`,
    params: [
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of dashboard fields to include in the response`,
      },
      {
        name: 'folder_id',
        type: 'string',
        required: false,
        description: `Restrict the search to dashboards in this folder`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of dashboards to return`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of results to skip before returning any`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Filter dashboards whose title matches this value. Supports wildcards with %.`,
      },
    ],
  },
  {
    name: 'googlelooker_search_looks',
    description: `Search Looks by title or folder instead of listing every Look in the instance. Useful for finding a specific Look when there are too many to browse.`,
    params: [
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of Look fields to include in the response`,
      },
      {
        name: 'folder_id',
        type: 'string',
        required: false,
        description: `Restrict the search to Looks in this folder`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of Looks to return`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Number of results to skip before returning any`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Filter Looks whose title matches this value. Supports wildcards with %.`,
      },
    ],
  },
  {
    name: 'googlelooker_update_dashboard',
    description: `Update one or more scalar fields on an existing Looker dashboard by ID (title, folder, description, colors, or soft-delete state). Only the fields provided are changed. This cannot modify nested tiles, filters, or layout components — use the dashboard element APIs for those.`,
    params: [
      {
        name: 'dashboard_id',
        type: 'string',
        required: true,
        description: `The ID of the Looker dashboard to update`,
      },
      {
        name: 'background_color',
        type: 'string',
        required: false,
        description: `New background color for the dashboard, as a hex string`,
      },
      {
        name: 'crossfilter_enabled',
        type: 'boolean',
        required: false,
        description: `Enable or disable cross-filtering between tiles on this dashboard`,
      },
      {
        name: 'deleted',
        type: 'boolean',
        required: false,
        description: `Set the dashboard's soft-deleted (trashed) state`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New description for the dashboard`,
      },
      {
        name: 'folder_id',
        type: 'string',
        required: false,
        description: `Move the dashboard to this folder ID`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `New title for the dashboard`,
      },
    ],
  },
  {
    name: 'googlelooker_update_folder',
    description: `Rename a folder or move it under a different parent folder. Only the fields provided are changed.`,
    params: [
      {
        name: 'folder_id',
        type: 'string',
        required: true,
        description: `The ID of the folder to update`,
      },
      { name: 'name', type: 'string', required: false, description: `New name for the folder` },
      {
        name: 'parent_id',
        type: 'string',
        required: false,
        description: `Move the folder under this parent folder ID`,
      },
    ],
  },
  {
    name: 'googlelooker_update_look',
    description: `Update one or more fields on an existing Look by ID: retitle it, move it to a different folder, point it at a different saved query, or soft-delete/restore it via the deleted flag. Only the fields provided are changed.`,
    params: [
      {
        name: 'look_id',
        type: 'string',
        required: true,
        description: `The numeric ID of the Look to update`,
      },
      {
        name: 'deleted',
        type: 'boolean',
        required: false,
        description: `Set the Look's soft-deleted state`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New description for the Look`,
      },
      {
        name: 'folder_id',
        type: 'string',
        required: false,
        description: `Move the Look to this folder ID`,
      },
      {
        name: 'query_id',
        type: 'string',
        required: false,
        description: `Point this Look at a different query ID`,
      },
      { name: 'title', type: 'string', required: false, description: `New title for the Look` },
    ],
  },
]
