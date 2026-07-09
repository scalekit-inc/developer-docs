import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'servicenow_aggregate_stats',
    description: `Retrieve aggregate statistics (COUNT, SUM, AVG, MIN, MAX) for any ServiceNow table. Group results by fields for dashboard-style analytics.`,
    params: [
      {
        name: 'table_name',
        type: 'string',
        required: true,
        description: `Name of the ServiceNow table to aggregate (e.g., incident, change_request)`,
      },
      {
        name: 'sysparm_avg_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to compute the AVERAGE for`,
      },
      {
        name: 'sysparm_count',
        type: 'boolean',
        required: false,
        description: `When true, include a COUNT of all matching records in the result`,
      },
      {
        name: 'sysparm_display_value',
        type: 'string',
        required: false,
        description: `Return display values alongside actual values. Use 'true', 'false', or 'all'`,
      },
      {
        name: 'sysparm_group_by',
        type: 'string',
        required: false,
        description: `Comma-separated fields to GROUP BY in the aggregate query`,
      },
      {
        name: 'sysparm_max_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to find the MAXIMUM value for`,
      },
      {
        name: 'sysparm_min_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to find the MINIMUM value for`,
      },
      {
        name: 'sysparm_order_by',
        type: 'string',
        required: false,
        description: `Field name to order grouped aggregate results by`,
      },
      {
        name: 'sysparm_query',
        type: 'string',
        required: false,
        description: `Encoded query string to filter records before aggregation (ServiceNow query syntax)`,
      },
      {
        name: 'sysparm_sum_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to SUM`,
      },
    ],
  },
  {
    name: 'servicenow_attachment_delete',
    description: `Delete a file attachment from a ServiceNow record. This action is permanent.`,
    params: [
      {
        name: 'sys_id',
        type: 'string',
        required: true,
        description: `Sys ID of the attachment to delete.`,
      },
    ],
  },
  {
    name: 'servicenow_attachment_download',
    description: `Download the binary file contents of an attachment from ServiceNow. Returns the raw file data. Use servicenow_attachment_get to first retrieve metadata (filename, content_type).`,
    params: [
      {
        name: 'sys_id',
        type: 'string',
        required: true,
        description: `The sys_id of the attachment record whose binary content to download.`,
      },
    ],
  },
  {
    name: 'servicenow_attachment_get',
    description: `Retrieve metadata for a specific attachment by its sys_id. Returns details such as filename, content type, size, and the associated record.`,
    params: [
      {
        name: 'sys_id',
        type: 'string',
        required: true,
        description: `The sys_id of the attachment to retrieve.`,
      },
    ],
  },
  {
    name: 'servicenow_attachment_list',
    description: `Retrieve a list of attachments associated with a record in ServiceNow. Filter by table name and record sys_id to find attachments for a specific record.`,
    params: [
      {
        name: 'file_name',
        type: 'string',
        required: false,
        description: `Filter attachments by filename.`,
      },
      {
        name: 'sysparm_limit',
        type: 'integer',
        required: false,
        description: `Maximum number of records to return (default: 10).`,
      },
      {
        name: 'sysparm_offset',
        type: 'integer',
        required: false,
        description: `Number of records to skip for pagination.`,
      },
      {
        name: 'table_name',
        type: 'string',
        required: false,
        description: `Table name of the parent record (e.g., \`incident\`, \`change_request\`).`,
      },
      {
        name: 'table_sys_id',
        type: 'string',
        required: false,
        description: `sys_id of the parent record whose attachments to retrieve.`,
      },
    ],
  },
  {
    name: 'servicenow_attachment_upload',
    description: `Upload a file attachment to a ServiceNow record using base64 data. Associates the file with the specified table record.`,
    params: [
      {
        name: 'file_content',
        type: 'string',
        required: true,
        description: `Base64-encoded content of the file to upload.`,
      },
      {
        name: 'file_name',
        type: 'string',
        required: true,
        description: `Filename including extension for the uploaded file.`,
      },
      {
        name: 'table_name',
        type: 'string',
        required: true,
        description: `Target table name of the record to attach the file to (e.g., \`incident\`, \`change_request\`).`,
      },
      {
        name: 'table_sys_id',
        type: 'string',
        required: true,
        description: `sys_id of the record to attach the file to.`,
      },
      {
        name: 'content_type',
        type: 'string',
        required: false,
        description: `MIME type of the file (e.g., \`application/pdf\`, \`image/png\`, \`text/plain\`).`,
      },
    ],
  },
  {
    name: 'servicenow_batch_request',
    description: `Execute multiple ServiceNow REST API calls in a single HTTP request. Each sub-request runs independently and all results are returned together.`,
    params: [
      {
        name: 'rest_requests',
        type: 'array',
        required: true,
        description: `Array of REST requests. Each request: {id: string, method: string, url: string (e.g. /api/now/table/incident), headers: [{name: string, value: string}], exclude_response_headers: bool, body: string (optional)}`,
      },
      {
        name: 'batch_request_id',
        type: 'string',
        required: false,
        description: `Optional identifier for the overall batch request.`,
      },
    ],
  },
  {
    name: 'servicenow_catalog_cart_checkout',
    description: `Perform the first step of a two-step checkout in the ServiceNow Service Catalog. Returns the cart with pricing and validation before final submission. Follow up with servicenow_catalog_cart_submit to complete the order.`,
    params: [],
  },
  {
    name: 'servicenow_catalog_cart_get',
    description: `Retrieve the current user's shopping cart contents.`,
    params: [],
  },
  {
    name: 'servicenow_catalog_cart_item_delete',
    description: `Remove an item from the ServiceNow service catalog cart.`,
    params: [
      {
        name: 'cart_item_id',
        type: 'string',
        required: true,
        description: `The sys_id of the cart item to remove.`,
      },
    ],
  },
  {
    name: 'servicenow_catalog_cart_item_update',
    description: `Update the quantity or variables for an item already in the ServiceNow service catalog cart.`,
    params: [
      {
        name: 'cart_item_id',
        type: 'string',
        required: true,
        description: `The sys_id of the cart item to update.`,
      },
      {
        name: 'sysparm_quantity',
        type: 'integer',
        required: false,
        description: `New quantity for the cart item.`,
      },
      {
        name: 'variables',
        type: 'object',
        required: false,
        description: `Updated variable values for the cart item as a key-value object.`,
      },
    ],
  },
  {
    name: 'servicenow_catalog_cart_submit',
    description: `Submit all items in the current user's shopping cart as a service request.`,
    params: [],
  },
  {
    name: 'servicenow_catalog_categories_list',
    description: `List all Service Catalog categories from ServiceNow. Returns category names, descriptions, and their parent catalog associations.`,
    params: [
      {
        name: 'sysparm_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return in the response.`,
      },
      {
        name: 'sysparm_limit',
        type: 'integer',
        required: false,
        description: `Maximum number of records to return.`,
      },
      {
        name: 'sysparm_offset',
        type: 'integer',
        required: false,
        description: `Number of records to skip for pagination.`,
      },
    ],
  },
  {
    name: 'servicenow_catalog_category_get',
    description: `Retrieve details of a specific service catalog category, including its catalog items.`,
    params: [
      {
        name: 'sys_id',
        type: 'string',
        required: true,
        description: `The sys_id of the catalog category to retrieve.`,
      },
    ],
  },
  {
    name: 'servicenow_catalog_get',
    description: `Retrieve details of a specific service catalog by its sys_id from the ServiceNow Service Catalog API.`,
    params: [
      {
        name: 'sysparm_catalog',
        type: 'string',
        required: true,
        description: `The sys_id of the service catalog to retrieve`,
      },
    ],
  },
  {
    name: 'servicenow_catalog_item_add_to_cart',
    description: `Add a service catalog item to the current user's shopping cart.`,
    params: [
      {
        name: 'sys_id',
        type: 'string',
        required: true,
        description: `Sys ID of the catalog item to add to the cart.`,
      },
      {
        name: 'sysparm_quantity',
        type: 'integer',
        required: false,
        description: `Quantity of the item to add. Defaults to 1.`,
      },
      {
        name: 'variables',
        type: 'object',
        required: false,
        description: `Catalog item variable values as key-value pairs.`,
      },
    ],
  },
  {
    name: 'servicenow_catalog_item_get',
    description: `Retrieve details of a specific service catalog item including its variables and parameters.`,
    params: [
      {
        name: 'sys_id',
        type: 'string',
        required: true,
        description: `The sys_id of the catalog item to retrieve.`,
      },
      {
        name: 'sysparm_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return in the response.`,
      },
    ],
  },
  {
    name: 'servicenow_catalog_item_list',
    description: `Retrieve a list of service catalog items available to the current user.`,
    params: [
      {
        name: 'sysparm_category',
        type: 'string',
        required: false,
        description: `Filter catalog items by category sys_id.`,
      },
      {
        name: 'sysparm_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return in the response.`,
      },
      {
        name: 'sysparm_limit',
        type: 'integer',
        required: false,
        description: `Maximum number of records to return.`,
      },
      {
        name: 'sysparm_offset',
        type: 'integer',
        required: false,
        description: `Number of records to skip for pagination.`,
      },
      {
        name: 'sysparm_text',
        type: 'string',
        required: false,
        description: `Full-text search filter to match catalog items by keyword.`,
      },
    ],
  },
  {
    name: 'servicenow_catalog_item_order',
    description: `Submit an order for a service catalog item. Returns the created request and request item sys_ids.`,
    params: [
      {
        name: 'sys_id',
        type: 'string',
        required: true,
        description: `The sys_id of the catalog item to order.`,
      },
      {
        name: 'sysparm_item_guid',
        type: 'string',
        required: false,
        description: `Cart item GUID for tracking the order in the shopping cart.`,
      },
      {
        name: 'sysparm_quantity',
        type: 'integer',
        required: false,
        description: `Number of items to order. Defaults to 1 if not specified.`,
      },
      {
        name: 'variables',
        type: 'object',
        required: false,
        description: `Key-value pairs for catalog item variables/parameters required to fulfill the request.`,
      },
    ],
  },
  {
    name: 'servicenow_catalog_item_variables_get',
    description: `Retrieve the variable definitions (form fields) for a specific service catalog item.`,
    params: [
      {
        name: 'sys_id',
        type: 'string',
        required: true,
        description: `sys_id of the catalog item to retrieve variable definitions for.`,
      },
    ],
  },
  {
    name: 'servicenow_catalog_list',
    description: `List all service catalogs available in the ServiceNow Service Catalog.`,
    params: [
      {
        name: 'sysparm_limit',
        type: 'integer',
        required: false,
        description: `Maximum number of records to return.`,
      },
      {
        name: 'sysparm_offset',
        type: 'integer',
        required: false,
        description: `Number of records to skip for pagination.`,
      },
    ],
  },
  {
    name: 'servicenow_change_conflict_scan',
    description: `Run a conflict scan on a change request to detect scheduling conflicts with other changes.`,
    params: [
      {
        name: 'change_sys_id',
        type: 'string',
        required: true,
        description: `sys_id of the change request to scan for conflicts.`,
      },
    ],
  },
  {
    name: 'servicenow_change_conflicts_get',
    description: `Retrieve the results of a conflict scan for a change request.`,
    params: [
      {
        name: 'change_sys_id',
        type: 'string',
        required: true,
        description: `sys_id of the change request to retrieve conflict results for.`,
      },
    ],
  },
  {
    name: 'servicenow_change_get',
    description: `Retrieve a change request using the dedicated Change Management API. Returns richer change-specific fields including workflow state, approvals, and risk assessment compared to the generic table API.`,
    params: [
      {
        name: 'change_sys_id',
        type: 'string',
        required: true,
        description: `The sys_id of the change request to retrieve.`,
      },
    ],
  },
  {
    name: 'servicenow_change_request_create',
    description: `Create a new change request in ServiceNow. Returns the created record with its sys_id. Use type to specify normal, standard, or emergency change.`,
    params: [
      {
        name: 'short_description',
        type: 'string',
        required: true,
        description: `Brief summary of the change request.`,
      },
      {
        name: 'assigned_to',
        type: 'string',
        required: false,
        description: `sys_id or username of the individual assigned to the change.`,
      },
      {
        name: 'assignment_group',
        type: 'string',
        required: false,
        description: `sys_id or name of the group to assign the change request to.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Detailed description of the change request.`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `Planned end date and time in ISO 8601 format.`,
      },
      {
        name: 'implementation_plan',
        type: 'string',
        required: false,
        description: `Step-by-step plan for implementing the change.`,
      },
      {
        name: 'justification',
        type: 'string',
        required: false,
        description: `Business justification for the change.`,
      },
      {
        name: 'priority',
        type: 'string',
        required: false,
        description: `Priority: \`1\`=Critical, \`2\`=High, \`3\`=Moderate, \`4\`=Low.`,
      },
      {
        name: 'risk',
        type: 'string',
        required: false,
        description: `Risk level: \`1\`=High, \`2\`=Moderate, \`3\`=Low, \`4\`=Very Low.`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `Planned start date and time in ISO 8601 format.`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Change type: \`normal\`, \`standard\`, or \`emergency\`.`,
      },
    ],
  },
  {
    name: 'servicenow_change_request_emergency_create',
    description: `Create an Emergency change request using the dedicated Change Management API for urgent, unplanned changes.`,
    params: [
      {
        name: 'short_description',
        type: 'string',
        required: true,
        description: `Brief summary of the emergency change request.`,
      },
      {
        name: 'assigned_to',
        type: 'string',
        required: false,
        description: `sys_id or username of the individual assigned to the emergency change.`,
      },
      {
        name: 'assignment_group',
        type: 'string',
        required: false,
        description: `sys_id or name of the group to assign the emergency change to.`,
      },
      {
        name: 'backout_plan',
        type: 'string',
        required: false,
        description: `Plan for reverting the emergency change if it fails.`,
      },
      {
        name: 'cmdb_ci',
        type: 'string',
        required: false,
        description: `sys_id or name of the configuration item affected by this emergency change.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Detailed description of the emergency change.`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `Planned end date and time in ISO 8601 format.`,
      },
      {
        name: 'impact',
        type: 'string',
        required: false,
        description: `Impact level: \`1\`=High, \`2\`=Medium, \`3\`=Low.`,
      },
      {
        name: 'implementation_plan',
        type: 'string',
        required: false,
        description: `Step-by-step plan for implementing the emergency change.`,
      },
      {
        name: 'justification',
        type: 'string',
        required: false,
        description: `Business justification for the emergency change.`,
      },
      {
        name: 'risk',
        type: 'string',
        required: false,
        description: `Risk level: \`1\`=High, \`2\`=Moderate, \`3\`=Low, \`4\`=Very Low.`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `Planned start date and time in ISO 8601 format.`,
      },
      {
        name: 'test_plan',
        type: 'string',
        required: false,
        description: `Plan for testing the emergency change after implementation.`,
      },
    ],
  },
  {
    name: 'servicenow_change_request_get',
    description: `Retrieve details of a specific change request by sys_id from ServiceNow.`,
    params: [
      {
        name: 'sys_id',
        type: 'string',
        required: true,
        description: `The sys_id of the change request to retrieve.`,
      },
      {
        name: 'sysparm_display_value',
        type: 'string',
        required: false,
        description: `Return field display values instead of raw values. Options: \`true\`, \`false\`, or \`all\`.`,
      },
      {
        name: 'sysparm_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return in the response.`,
      },
    ],
  },
  {
    name: 'servicenow_change_request_list',
    description: `Retrieve a list of change requests from ServiceNow with filtering and pagination. Use sysparm_query for encoded queries (e.g., \`state=implement^type=normal\`).`,
    params: [
      {
        name: 'sysparm_display_value',
        type: 'string',
        required: false,
        description: `Return field display values instead of raw values. Options: \`true\`, \`false\`, or \`all\`.`,
      },
      {
        name: 'sysparm_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return in the response.`,
      },
      {
        name: 'sysparm_limit',
        type: 'integer',
        required: false,
        description: `Maximum number of records to return (default: 10, max: 10000).`,
      },
      {
        name: 'sysparm_offset',
        type: 'integer',
        required: false,
        description: `Number of records to skip for pagination.`,
      },
      {
        name: 'sysparm_query',
        type: 'string',
        required: false,
        description: `Encoded query string to filter results (e.g., \`state=implement^type=normal\`).`,
      },
    ],
  },
  {
    name: 'servicenow_change_request_normal_create',
    description: `Create a Normal change request using the dedicated Change Management API. Enforces workflow rules and approvals. Use this instead of the generic table API when workflow compliance is required.`,
    params: [
      {
        name: 'short_description',
        type: 'string',
        required: true,
        description: `Brief summary of the normal change request.`,
      },
      {
        name: 'assigned_to',
        type: 'string',
        required: false,
        description: `sys_id or username of the individual assigned to the change.`,
      },
      {
        name: 'assignment_group',
        type: 'string',
        required: false,
        description: `sys_id or name of the group to assign the change request to.`,
      },
      {
        name: 'backout_plan',
        type: 'string',
        required: false,
        description: `Plan for reverting the change if it fails.`,
      },
      {
        name: 'cmdb_ci',
        type: 'string',
        required: false,
        description: `sys_id or name of the configuration item affected by this change.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Detailed description of the change.`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `Planned end date and time in ISO 8601 format.`,
      },
      {
        name: 'impact',
        type: 'string',
        required: false,
        description: `Impact level: \`1\`=High, \`2\`=Medium, \`3\`=Low.`,
      },
      {
        name: 'implementation_plan',
        type: 'string',
        required: false,
        description: `Step-by-step plan for implementing the change.`,
      },
      {
        name: 'justification',
        type: 'string',
        required: false,
        description: `Business justification for the change.`,
      },
      {
        name: 'risk',
        type: 'string',
        required: false,
        description: `Risk level: \`1\`=High, \`2\`=Moderate, \`3\`=Low, \`4\`=Very Low.`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `Planned start date and time in ISO 8601 format.`,
      },
      {
        name: 'test_plan',
        type: 'string',
        required: false,
        description: `Plan for testing the change after implementation.`,
      },
    ],
  },
  {
    name: 'servicenow_change_request_standard_create',
    description: `Create a Standard change request from a pre-approved standard change template.`,
    params: [
      {
        name: 'template_sys_id',
        type: 'string',
        required: true,
        description: `sys_id of the standard change template to use.`,
      },
      {
        name: 'assigned_to',
        type: 'string',
        required: false,
        description: `sys_id or username of the individual assigned to the change.`,
      },
      {
        name: 'assignment_group',
        type: 'string',
        required: false,
        description: `sys_id or name of the group to assign the change to.`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `Planned end date and time in ISO 8601 format.`,
      },
      {
        name: 'short_description',
        type: 'string',
        required: false,
        description: `Override the template's short description for this specific change.`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `Planned start date and time in ISO 8601 format.`,
      },
    ],
  },
  {
    name: 'servicenow_change_request_update',
    description: `Update fields on an existing change request in ServiceNow. State values: assess=-5, authorize=-4, scheduled=-3, implement=-2, review=-1, closed=0.`,
    params: [
      {
        name: 'sys_id',
        type: 'string',
        required: true,
        description: `The sys_id of the change request to update.`,
      },
      {
        name: 'assigned_to',
        type: 'string',
        required: false,
        description: `sys_id or username of the individual assigned to the change.`,
      },
      {
        name: 'assignment_group',
        type: 'string',
        required: false,
        description: `sys_id or name of the group to assign the change request to.`,
      },
      {
        name: 'close_notes',
        type: 'string',
        required: false,
        description: `Closure notes summarizing the outcome of the change.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Updated detailed description of the change.`,
      },
      {
        name: 'risk',
        type: 'string',
        required: false,
        description: `Risk level: \`1\`=High, \`2\`=Moderate, \`3\`=Low, \`4\`=Very Low.`,
      },
      {
        name: 'short_description',
        type: 'string',
        required: false,
        description: `Updated brief summary of the change request.`,
      },
      {
        name: 'state',
        type: 'string',
        required: false,
        description: `Change state: \`-5\`=assess, \`-4\`=authorize, \`-3\`=scheduled, \`-2\`=implement, \`-1\`=review, \`0\`=closed.`,
      },
      {
        name: 'work_notes',
        type: 'string',
        required: false,
        description: `Internal work notes to add to the change request (not visible to end users).`,
      },
    ],
  },
  {
    name: 'servicenow_change_standard_templates_list',
    description: `Retrieve a list of available standard change templates.`,
    params: [
      {
        name: 'sysparm_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return in the response.`,
      },
      {
        name: 'sysparm_limit',
        type: 'integer',
        required: false,
        description: `Maximum number of templates to return.`,
      },
      {
        name: 'sysparm_offset',
        type: 'integer',
        required: false,
        description: `Number of records to skip for pagination.`,
      },
    ],
  },
  {
    name: 'servicenow_change_task_create',
    description: `Create a task for a specific change request in ServiceNow. Requires the parent change request sys_id and a short description. Optionally assign the task to a user or group and set planned start/end dates.`,
    params: [
      {
        name: 'change_sys_id',
        type: 'string',
        required: true,
        description: `sys_id of the parent change request this task belongs to`,
      },
      {
        name: 'short_description',
        type: 'string',
        required: true,
        description: `Brief summary of the change task`,
      },
      {
        name: 'assigned_to',
        type: 'string',
        required: false,
        description: `sys_id or user name of the user to assign the task to`,
      },
      {
        name: 'assignment_group',
        type: 'string',
        required: false,
        description: `sys_id of the group to assign the task to`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Detailed description of the change task`,
      },
      {
        name: 'planned_end_date',
        type: 'string',
        required: false,
        description: `Planned end date and time for the task in ISO 8601 format`,
      },
      {
        name: 'planned_start_date',
        type: 'string',
        required: false,
        description: `Planned start date and time for the task in ISO 8601 format`,
      },
    ],
  },
  {
    name: 'servicenow_change_task_get',
    description: `Retrieve the full details of a specific change task by its sys_id. Requires the parent change request sys_id and the task sys_id.`,
    params: [
      {
        name: 'change_sys_id',
        type: 'string',
        required: true,
        description: `sys_id of the parent change request`,
      },
      {
        name: 'task_sys_id',
        type: 'string',
        required: true,
        description: `sys_id of the specific change task to retrieve`,
      },
      {
        name: 'sysparm_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return in the task record`,
      },
    ],
  },
  {
    name: 'servicenow_change_task_list',
    description: `Retrieve a list of tasks associated with a change request in ServiceNow. Use the parent change request's sys_id to fetch all its related tasks with optional pagination and field filtering.`,
    params: [
      {
        name: 'change_sys_id',
        type: 'string',
        required: true,
        description: `The sys_id of the parent change request whose tasks to list`,
      },
      {
        name: 'sysparm_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return in each task record`,
      },
      {
        name: 'sysparm_limit',
        type: 'integer',
        required: false,
        description: `Maximum number of task records to return`,
      },
      {
        name: 'sysparm_offset',
        type: 'integer',
        required: false,
        description: `Number of task records to skip for pagination`,
      },
    ],
  },
  {
    name: 'servicenow_change_task_update',
    description: `Update one or more fields on a specific change task. Provide only the fields you want to change. Supports updating the description, state, work notes, and assignment.`,
    params: [
      {
        name: 'change_sys_id',
        type: 'string',
        required: true,
        description: `sys_id of the parent change request`,
      },
      {
        name: 'task_sys_id',
        type: 'string',
        required: true,
        description: `sys_id of the specific change task to update`,
      },
      {
        name: 'assigned_to',
        type: 'string',
        required: false,
        description: `sys_id or username of the user to assign the task to`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Updated detailed description of the change task`,
      },
      {
        name: 'short_description',
        type: 'string',
        required: false,
        description: `Updated brief summary of the change task`,
      },
      {
        name: 'state',
        type: 'string',
        required: false,
        description: `Task state: 1=Open, 2=Work in Progress, 3=Closed Complete, 4=Closed Incomplete`,
      },
      {
        name: 'work_notes',
        type: 'string',
        required: false,
        description: `Work notes to append to the change task activity log`,
      },
    ],
  },
  {
    name: 'servicenow_change_update',
    description: `Update a change request using the dedicated Change Management API. Enforces workflow rules and validations. Use this for state transitions and risk assessment updates.`,
    params: [
      {
        name: 'change_sys_id',
        type: 'string',
        required: true,
        description: `The sys_id of the change request to update.`,
      },
      {
        name: 'assigned_to',
        type: 'string',
        required: false,
        description: `sys_id of the user assigned to implement the change.`,
      },
      {
        name: 'assignment_group',
        type: 'string',
        required: false,
        description: `sys_id of the group assigned to implement the change.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Detailed description of the change request.`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `Planned end date and time of the change (ISO 8601 format).`,
      },
      {
        name: 'risk',
        type: 'string',
        required: false,
        description: `Risk level of the change. 1=High, 2=Moderate, 3=Low, 4=Very Low.`,
      },
      {
        name: 'short_description',
        type: 'string',
        required: false,
        description: `Brief summary of the change request.`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `Planned start date and time of the change (ISO 8601 format).`,
      },
      {
        name: 'state',
        type: 'string',
        required: false,
        description: `New state value for the change request (workflow-controlled).`,
      },
    ],
  },
  {
    name: 'servicenow_cmdb_ci_create',
    description: `Create a new Configuration Item in the CMDB. Returns the created CI record with its sys_id.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Display name of the Configuration Item.`,
      },
      {
        name: 'assigned_to',
        type: 'string',
        required: false,
        description: `sys_id of the user assigned to this CI.`,
      },
      {
        name: 'ip_address',
        type: 'string',
        required: false,
        description: `IP address of the Configuration Item.`,
      },
      {
        name: 'manufacturer',
        type: 'string',
        required: false,
        description: `Manufacturer of the CI hardware or software.`,
      },
      {
        name: 'model_id',
        type: 'string',
        required: false,
        description: `sys_id of the model record for this CI.`,
      },
      {
        name: 'os',
        type: 'string',
        required: false,
        description: `Operating system running on the CI.`,
      },
      {
        name: 'short_description',
        type: 'string',
        required: false,
        description: `Brief description of the Configuration Item.`,
      },
      {
        name: 'support_group',
        type: 'string',
        required: false,
        description: `sys_id of the support group responsible for this CI.`,
      },
      {
        name: 'sys_class_name',
        type: 'string',
        required: false,
        description: `CI class that determines the type of configuration item (e.g., \`cmdb_ci_server\`, \`cmdb_ci_application\`).`,
      },
    ],
  },
  {
    name: 'servicenow_cmdb_ci_delete',
    description: `Delete a Configuration Item from the ServiceNow CMDB using the Table API. This action is irreversible.`,
    params: [
      {
        name: 'sys_id',
        type: 'string',
        required: true,
        description: `The sys_id of the CMDB Configuration Item to delete.`,
      },
    ],
  },
  {
    name: 'servicenow_cmdb_ci_get',
    description: `Retrieve details of a specific Configuration Item by sys_id.`,
    params: [
      {
        name: 'sys_id',
        type: 'string',
        required: true,
        description: `The sys_id of the Configuration Item to retrieve.`,
      },
      {
        name: 'sysparm_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return in the response.`,
      },
    ],
  },
  {
    name: 'servicenow_cmdb_ci_list',
    description: `Retrieve a list of Configuration Items (CIs) from the CMDB. Filter by class using sysparm_query (e.g., \`sys_class_name=cmdb_ci_server\`).`,
    params: [
      {
        name: 'sysparm_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return in the response.`,
      },
      {
        name: 'sysparm_limit',
        type: 'integer',
        required: false,
        description: `Maximum number of records to return (default: 10).`,
      },
      {
        name: 'sysparm_offset',
        type: 'integer',
        required: false,
        description: `Number of records to skip for pagination.`,
      },
      {
        name: 'sysparm_query',
        type: 'string',
        required: false,
        description: `Encoded query string to filter results (e.g., \`sys_class_name=cmdb_ci_server\`).`,
      },
    ],
  },
  {
    name: 'servicenow_cmdb_ci_relationships_create',
    description: `Create a relationship between two Configuration Items in the CMDB.`,
    params: [
      {
        name: 'child',
        type: 'string',
        required: true,
        description: `Sys ID of the child (target) CI`,
      },
      {
        name: 'parent',
        type: 'string',
        required: true,
        description: `Sys ID of the parent (source) CI`,
      },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `Sys ID of the relationship type from cmdb_rel_type table`,
      },
    ],
  },
  {
    name: 'servicenow_cmdb_ci_relationships_get',
    description: `Get all CI relationships for a Configuration Item. Returns both inbound and outbound relationships from the cmdb_rel_ci table.`,
    params: [
      {
        name: 'sys_id',
        type: 'string',
        required: true,
        description: `Sys ID of the Configuration Item.`,
      },
      {
        name: 'sysparm_limit',
        type: 'integer',
        required: false,
        description: `Maximum number of relationships to return.`,
      },
      {
        name: 'sysparm_offset',
        type: 'integer',
        required: false,
        description: `Number of relationships to skip (for pagination).`,
      },
    ],
  },
  {
    name: 'servicenow_cmdb_ci_update',
    description: `Update fields on an existing Configuration Item in the CMDB. Only fields provided will be updated.`,
    params: [
      {
        name: 'sys_id',
        type: 'string',
        required: true,
        description: `The sys_id of the Configuration Item to update.`,
      },
      {
        name: 'assigned_to',
        type: 'string',
        required: false,
        description: `sys_id of the user assigned to this CI.`,
      },
      {
        name: 'install_status',
        type: 'string',
        required: false,
        description: `Installation status of the CI (e.g., \`1\`=Installed, \`2\`=In Stock, \`6\`=Retired).`,
      },
      {
        name: 'ip_address',
        type: 'string',
        required: false,
        description: `Updated IP address of the Configuration Item.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Updated display name of the Configuration Item.`,
      },
      {
        name: 'os',
        type: 'string',
        required: false,
        description: `Updated operating system running on the CI.`,
      },
      {
        name: 'short_description',
        type: 'string',
        required: false,
        description: `Updated brief description of the Configuration Item.`,
      },
      {
        name: 'support_group',
        type: 'string',
        required: false,
        description: `sys_id of the support group responsible for this CI.`,
      },
    ],
  },
  {
    name: 'servicenow_cmdb_meta_get',
    description: `Retrieve the class schema, attributes, and hierarchy for a CMDB CI class.`,
    params: [
      {
        name: 'class_name',
        type: 'string',
        required: true,
        description: `CI class name to retrieve the schema for (e.g., cmdb_ci_server).`,
      },
    ],
  },
  {
    name: 'servicenow_flow_execution_status',
    description: `Check the status and result of a triggered Flow Designer flow execution.`,
    params: [
      {
        name: 'execution_id',
        type: 'string',
        required: true,
        description: `The execution ID returned by the flow trigger operation.`,
      },
      {
        name: 'flow_api_name',
        type: 'string',
        required: true,
        description: `The API name of the Flow Designer flow.`,
      },
    ],
  },
  {
    name: 'servicenow_flow_get',
    description: `Retrieve details and schema of a specific Flow Designer flow by its API name.`,
    params: [
      {
        name: 'flow_api_name',
        type: 'string',
        required: true,
        description: `The API name of the Flow Designer flow to retrieve.`,
      },
    ],
  },
  {
    name: 'servicenow_flow_list',
    description: `List all Flow Designer flows available in the ServiceNow instance.`,
    params: [
      {
        name: 'sysparm_limit',
        type: 'integer',
        required: false,
        description: `Maximum number of flows to return.`,
      },
      {
        name: 'sysparm_offset',
        type: 'integer',
        required: false,
        description: `Number of flows to skip for pagination.`,
      },
    ],
  },
  {
    name: 'servicenow_flow_trigger',
    description: `Trigger a Flow Designer flow by its API name.`,
    params: [
      {
        name: 'flow_api_name',
        type: 'string',
        required: true,
        description: `API name of the Flow Designer flow to trigger.`,
      },
      {
        name: 'inputs',
        type: 'object',
        required: false,
        description: `Input values for the flow as key-value pairs.`,
      },
    ],
  },
  {
    name: 'servicenow_global_search',
    description: `Perform a full-text search across all configured ServiceNow tables simultaneously. Returns matching records from multiple tables in a single response.`,
    params: [
      {
        name: 'sysparm_search',
        type: 'string',
        required: true,
        description: `Full-text search query to match against all indexed ServiceNow tables`,
      },
      {
        name: 'sysparm_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return in each matching record`,
      },
      {
        name: 'sysparm_limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return per table`,
      },
    ],
  },
  {
    name: 'servicenow_import_set_get',
    description: `Retrieve the transform result and status for a previously inserted import set record to check if the transform succeeded and what target records were created or updated.`,
    params: [
      {
        name: 'staging_table',
        type: 'string',
        required: true,
        description: `The name of the import staging table the record was inserted into.`,
      },
      {
        name: 'sys_id',
        type: 'string',
        required: true,
        description: `The sys_id of the import set staging record to check.`,
      },
    ],
  },
  {
    name: 'servicenow_import_set_insert',
    description: `Insert a single record into a ServiceNow import set staging table and trigger transform maps to process it. Returns the transformed record's sys_id and status.`,
    params: [
      {
        name: 'record_data',
        type: 'object',
        required: true,
        description: `Key-value pairs matching the columns of the staging table to insert`,
      },
      {
        name: 'staging_table',
        type: 'string',
        required: true,
        description: `Name of the import set staging table to insert into (e.g., u_import_incidents)`,
      },
    ],
  },
  {
    name: 'servicenow_import_set_insert_multiple',
    description: `Insert multiple records into a ServiceNow import set staging table asynchronously. Returns an import set ID for polling results.`,
    params: [
      {
        name: 'records',
        type: 'array',
        required: true,
        description: `Array of record objects to insert into the staging table.`,
      },
      {
        name: 'staging_table',
        type: 'string',
        required: true,
        description: `Name of the import set staging table to insert records into.`,
      },
    ],
  },
  {
    name: 'servicenow_incident_close',
    description: `Close a resolved incident by setting its state to Closed (7). The incident must already be in Resolved state before it can be closed.`,
    params: [
      {
        name: 'sys_id',
        type: 'string',
        required: true,
        description: `The unique sys_id of the incident to close.`,
      },
      {
        name: 'close_notes',
        type: 'string',
        required: false,
        description: `Optional closing notes to append to the incident.`,
      },
    ],
  },
  {
    name: 'servicenow_incident_create',
    description: `Create a new incident in ServiceNow. Returns the created incident record with its sys_id.`,
    params: [
      {
        name: 'short_description',
        type: 'string',
        required: true,
        description: `Brief summary of the incident.`,
      },
      {
        name: 'assigned_to',
        type: 'string',
        required: false,
        description: `sys_id or username of the individual assigned to resolve the incident.`,
      },
      {
        name: 'assignment_group',
        type: 'string',
        required: false,
        description: `sys_id or name of the group assigned to resolve the incident.`,
      },
      {
        name: 'caller_id',
        type: 'string',
        required: false,
        description: `sys_id or username of the person reporting the incident.`,
      },
      {
        name: 'category',
        type: 'string',
        required: false,
        description: `Incident category (e.g., \`Network\`, \`Software\`, \`Hardware\`).`,
      },
      {
        name: 'cmdb_ci',
        type: 'string',
        required: false,
        description: `sys_id of the affected Configuration Item (CI) in the CMDB.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Detailed description of the incident.`,
      },
      {
        name: 'impact',
        type: 'string',
        required: false,
        description: `Impact of the incident: \`1\`=High, \`2\`=Medium, \`3\`=Low.`,
      },
      {
        name: 'priority',
        type: 'string',
        required: false,
        description: `Incident priority: \`1\`=Critical, \`2\`=High, \`3\`=Moderate, \`4\`=Low.`,
      },
      {
        name: 'subcategory',
        type: 'string',
        required: false,
        description: `Incident subcategory under the selected category.`,
      },
      {
        name: 'urgency',
        type: 'string',
        required: false,
        description: `Urgency of the incident: \`1\`=High, \`2\`=Medium, \`3\`=Low.`,
      },
    ],
  },
  {
    name: 'servicenow_incident_get',
    description: `Retrieve details of a specific incident by its sys_id.`,
    params: [
      {
        name: 'sys_id',
        type: 'string',
        required: true,
        description: `The unique sys_id of the incident to retrieve.`,
      },
      {
        name: 'sysparm_display_value',
        type: 'string',
        required: false,
        description: `Return field display values instead of raw values. Options: \`true\`, \`false\`, or \`all\`.`,
      },
      {
        name: 'sysparm_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return in the response.`,
      },
    ],
  },
  {
    name: 'servicenow_incident_list',
    description: `Retrieve a list of incidents from ServiceNow with filtering and pagination. Use sysparm_query for encoded queries (e.g., \`active=true^priority=1\`).`,
    params: [
      {
        name: 'sysparm_display_value',
        type: 'string',
        required: false,
        description: `Return field display values instead of raw values. Options: \`true\`, \`false\`, or \`all\`.`,
      },
      {
        name: 'sysparm_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return in the response.`,
      },
      {
        name: 'sysparm_limit',
        type: 'integer',
        required: false,
        description: `Maximum number of records to return (default: 10, max: 10000).`,
      },
      {
        name: 'sysparm_offset',
        type: 'integer',
        required: false,
        description: `Number of records to skip for pagination.`,
      },
      {
        name: 'sysparm_order_by',
        type: 'string',
        required: false,
        description: `Field name to order results by.`,
      },
      {
        name: 'sysparm_order_dir',
        type: 'string',
        required: false,
        description: `Sort direction: \`asc\` or \`desc\`.`,
      },
      {
        name: 'sysparm_query',
        type: 'string',
        required: false,
        description: `Encoded query string to filter results (e.g., \`active=true^priority=1\`).`,
      },
    ],
  },
  {
    name: 'servicenow_incident_resolve',
    description: `Resolve an incident by setting its state to Resolved (6). Requires a resolution code and resolution notes.`,
    params: [
      {
        name: 'close_code',
        type: 'string',
        required: true,
        description: `Resolution code describing how the incident was resolved.`,
      },
      {
        name: 'close_notes',
        type: 'string',
        required: true,
        description: `Detailed notes explaining how the incident was resolved.`,
      },
      {
        name: 'sys_id',
        type: 'string',
        required: true,
        description: `The unique sys_id of the incident to resolve.`,
      },
      {
        name: 'work_notes',
        type: 'string',
        required: false,
        description: `Internal work notes visible only to support staff.`,
      },
    ],
  },
  {
    name: 'servicenow_incident_update',
    description: `Update fields on an existing incident. Only provided fields are modified; omitted fields are left unchanged.`,
    params: [
      {
        name: 'sys_id',
        type: 'string',
        required: true,
        description: `The unique sys_id of the incident to update.`,
      },
      {
        name: 'assigned_to',
        type: 'string',
        required: false,
        description: `Updated sys_id or username of the individual assigned to resolve the incident.`,
      },
      {
        name: 'assignment_group',
        type: 'string',
        required: false,
        description: `Updated sys_id or name of the assignment group.`,
      },
      {
        name: 'comments',
        type: 'string',
        required: false,
        description: `Customer-visible comments added to the incident activity log.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Updated detailed description of the incident.`,
      },
      {
        name: 'priority',
        type: 'string',
        required: false,
        description: `Updated priority: \`1\`=Critical, \`2\`=High, \`3\`=Moderate, \`4\`=Low.`,
      },
      {
        name: 'short_description',
        type: 'string',
        required: false,
        description: `Updated brief summary of the incident.`,
      },
      {
        name: 'state',
        type: 'string',
        required: false,
        description: `Updated incident state: \`1\`=New, \`2\`=In Progress, \`3\`=On Hold, \`6\`=Resolved, \`7\`=Closed.`,
      },
      {
        name: 'work_notes',
        type: 'string',
        required: false,
        description: `Internal work notes visible only to support staff.`,
      },
    ],
  },
  {
    name: 'servicenow_knowledge_article_create',
    description: `Create a new knowledge base article in ServiceNow. Returns the created article record with its sys_id.`,
    params: [
      {
        name: 'short_description',
        type: 'string',
        required: true,
        description: `Title or summary of the knowledge article.`,
      },
      {
        name: 'author',
        type: 'string',
        required: false,
        description: `sys_id of the user who authored this article.`,
      },
      {
        name: 'kb_category',
        type: 'string',
        required: false,
        description: `sys_id of the knowledge base category for this article.`,
      },
      {
        name: 'kb_knowledge_base',
        type: 'string',
        required: false,
        description: `sys_id of the knowledge base this article belongs to.`,
      },
      {
        name: 'text',
        type: 'string',
        required: false,
        description: `Body content of the article (supports HTML or plain text).`,
      },
      {
        name: 'workflow_state',
        type: 'string',
        required: false,
        description: `Publication state of the article: \`draft\`, \`published\`, or \`retired\`.`,
      },
    ],
  },
  {
    name: 'servicenow_knowledge_article_delete',
    description: `Delete a knowledge base article by sys_id. This action is irreversible and permanently removes the article.`,
    params: [
      {
        name: 'sys_id',
        type: 'string',
        required: true,
        description: `The sys_id of the knowledge article to delete.`,
      },
    ],
  },
  {
    name: 'servicenow_knowledge_article_get',
    description: `Retrieve details of a specific knowledge base article by sys_id.`,
    params: [
      {
        name: 'sys_id',
        type: 'string',
        required: true,
        description: `The sys_id of the knowledge article to retrieve.`,
      },
      {
        name: 'sysparm_display_value',
        type: 'string',
        required: false,
        description: `Return field display values instead of raw values. Options: \`true\`, \`false\`, or \`all\`.`,
      },
      {
        name: 'sysparm_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return in the response.`,
      },
    ],
  },
  {
    name: 'servicenow_knowledge_article_list',
    description: `Retrieve a list of knowledge base articles with filtering and pagination. Use sysparm_query to filter by workflow state, category, or other fields.`,
    params: [
      {
        name: 'sysparm_display_value',
        type: 'string',
        required: false,
        description: `Return field display values instead of raw values. Options: \`true\`, \`false\`, or \`all\`.`,
      },
      {
        name: 'sysparm_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return in the response.`,
      },
      {
        name: 'sysparm_limit',
        type: 'integer',
        required: false,
        description: `Maximum number of records to return (default: 10).`,
      },
      {
        name: 'sysparm_offset',
        type: 'integer',
        required: false,
        description: `Number of records to skip for pagination.`,
      },
      {
        name: 'sysparm_query',
        type: 'string',
        required: false,
        description: `Encoded query string to filter results (e.g., \`workflow_state=published^kb_category=<sys_id>\`).`,
      },
    ],
  },
  {
    name: 'servicenow_knowledge_article_update',
    description: `Update fields on an existing knowledge base article. Only provided fields are modified; omitted fields are left unchanged.`,
    params: [
      {
        name: 'sys_id',
        type: 'string',
        required: true,
        description: `The sys_id of the knowledge article to update.`,
      },
      {
        name: 'kb_knowledge_base',
        type: 'string',
        required: false,
        description: `sys_id of the target knowledge base to associate this article with.`,
      },
      {
        name: 'short_description',
        type: 'string',
        required: false,
        description: `Updated article title.`,
      },
      {
        name: 'text',
        type: 'string',
        required: false,
        description: `Updated article body content in HTML.`,
      },
      {
        name: 'workflow_state',
        type: 'string',
        required: false,
        description: `Updated article workflow state, e.g. \`draft\`, \`review\`, \`published\`.`,
      },
    ],
  },
  {
    name: 'servicenow_knowledge_base_list',
    description: `Retrieve a list of knowledge bases available in ServiceNow.`,
    params: [
      {
        name: 'sysparm_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return for each knowledge base.`,
      },
      {
        name: 'sysparm_limit',
        type: 'integer',
        required: false,
        description: `Maximum number of knowledge bases to return.`,
      },
      {
        name: 'sysparm_offset',
        type: 'integer',
        required: false,
        description: `Starting offset for pagination.`,
      },
      {
        name: 'sysparm_query',
        type: 'string',
        required: false,
        description: `Encoded query string to filter knowledge bases.`,
      },
    ],
  },
  {
    name: 'servicenow_pa_indicators_list',
    description: `List all Performance Analytics indicator definitions available in ServiceNow. Use the returned sys_ids to filter scorecards via servicenow_pa_scorecards_get.`,
    params: [
      {
        name: 'sysparm_limit',
        type: 'integer',
        required: false,
        description: `Maximum number of PA indicator records to return.`,
      },
      {
        name: 'sysparm_offset',
        type: 'integer',
        required: false,
        description: `Number of records to skip for pagination.`,
      },
    ],
  },
  {
    name: 'servicenow_pa_scorecards_get',
    description: `Retrieve Performance Analytics scorecard data including KPI values, trend data, and targets from ServiceNow PA.`,
    params: [
      {
        name: 'sysparm_breakdown',
        type: 'string',
        required: false,
        description: `sys_id of a breakdown to segment scorecard data.`,
      },
      {
        name: 'sysparm_field',
        type: 'string',
        required: false,
        description: `sys_id of a specific PA indicator to filter scorecards.`,
      },
      {
        name: 'sysparm_include_scores',
        type: 'boolean',
        required: false,
        description: `Set to true to include historical score data points in the response.`,
      },
      {
        name: 'sysparm_limit',
        type: 'integer',
        required: false,
        description: `Maximum number of scorecard records to return.`,
      },
    ],
  },
  {
    name: 'servicenow_problem_create',
    description: `Create a new problem record in ServiceNow to track root causes of recurring incidents. Returns the created record with its sys_id.`,
    params: [
      {
        name: 'short_description',
        type: 'string',
        required: true,
        description: `Brief summary of the problem.`,
      },
      {
        name: 'assigned_to',
        type: 'string',
        required: false,
        description: `sys_id or username of the individual assigned to investigate the problem.`,
      },
      {
        name: 'assignment_group',
        type: 'string',
        required: false,
        description: `sys_id or name of the group to assign the problem to.`,
      },
      {
        name: 'cmdb_ci',
        type: 'string',
        required: false,
        description: `sys_id of the Configuration Item (CI) related to the problem.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Detailed description of the problem.`,
      },
      {
        name: 'priority',
        type: 'string',
        required: false,
        description: `Priority: \`1\`=Critical, \`2\`=High, \`3\`=Moderate, \`4\`=Low.`,
      },
      {
        name: 'workaround',
        type: 'string',
        required: false,
        description: `Temporary workaround to mitigate the problem until a fix is implemented.`,
      },
    ],
  },
  {
    name: 'servicenow_problem_get',
    description: `Retrieve details of a specific problem record by sys_id from ServiceNow.`,
    params: [
      {
        name: 'sys_id',
        type: 'string',
        required: true,
        description: `The sys_id of the problem record to retrieve.`,
      },
      {
        name: 'sysparm_display_value',
        type: 'string',
        required: false,
        description: `Return field display values instead of raw values. Options: \`true\`, \`false\`, or \`all\`.`,
      },
      {
        name: 'sysparm_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return in the response.`,
      },
    ],
  },
  {
    name: 'servicenow_problem_list',
    description: `Retrieve a list of problems from ServiceNow with filtering and pagination. Use sysparm_query for encoded queries (e.g., \`state=101^priority=1\`).`,
    params: [
      {
        name: 'sysparm_display_value',
        type: 'string',
        required: false,
        description: `Return field display values instead of raw values. Options: \`true\`, \`false\`, or \`all\`.`,
      },
      {
        name: 'sysparm_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return in the response.`,
      },
      {
        name: 'sysparm_limit',
        type: 'integer',
        required: false,
        description: `Maximum number of records to return (default: 10, max: 10000).`,
      },
      {
        name: 'sysparm_offset',
        type: 'integer',
        required: false,
        description: `Number of records to skip for pagination.`,
      },
      {
        name: 'sysparm_query',
        type: 'string',
        required: false,
        description: `Encoded query string to filter results (e.g., \`state=101^priority=1\`).`,
      },
    ],
  },
  {
    name: 'servicenow_problem_task_create',
    description: `Create a new problem task to track investigation, root cause analysis, or resolution steps for a Problem record.`,
    params: [
      {
        name: 'problem_id',
        type: 'string',
        required: true,
        description: `The sys_id of the parent Problem record this task belongs to.`,
      },
      {
        name: 'short_description',
        type: 'string',
        required: true,
        description: `Brief summary of what this problem task is for.`,
      },
      {
        name: 'assigned_to',
        type: 'string',
        required: false,
        description: `Username or sys_id of the person assigned to this problem task.`,
      },
      {
        name: 'assignment_group',
        type: 'string',
        required: false,
        description: `Name or sys_id of the group responsible for this problem task.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Detailed description of the problem task scope and objectives.`,
      },
    ],
  },
  {
    name: 'servicenow_problem_task_get',
    description: `Retrieve a specific problem task by its sys_id. Returns all fields for the problem task record including state, assignment, and work notes.`,
    params: [
      {
        name: 'sys_id',
        type: 'string',
        required: true,
        description: `The sys_id of the problem task to retrieve.`,
      },
    ],
  },
  {
    name: 'servicenow_problem_task_list',
    description: `List problem tasks (investigation and resolution sub-tasks) associated with problems in ServiceNow. Filter by problem sys_id using sysparm_query.`,
    params: [
      {
        name: 'sysparm_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of field names to include in the response.`,
      },
      {
        name: 'sysparm_limit',
        type: 'integer',
        required: false,
        description: `Maximum number of problem task records to return.`,
      },
      {
        name: 'sysparm_query',
        type: 'string',
        required: false,
        description: `Encoded query string to filter problem tasks, e.g. \`problem=<problem_sys_id>\` or \`state=1\`.`,
      },
    ],
  },
  {
    name: 'servicenow_problem_task_update',
    description: `Update fields on an existing problem task. Only provided fields are modified; omitted fields are left unchanged.`,
    params: [
      {
        name: 'sys_id',
        type: 'string',
        required: true,
        description: `The sys_id of the problem task to update.`,
      },
      {
        name: 'assigned_to',
        type: 'string',
        required: false,
        description: `Updated username or sys_id of the assignee.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Updated detailed description of the problem task.`,
      },
      {
        name: 'short_description',
        type: 'string',
        required: false,
        description: `Updated brief summary of the problem task.`,
      },
      {
        name: 'state',
        type: 'string',
        required: false,
        description: `Updated state: \`1\`=Open, \`2\`=Work in Progress, \`3\`=Closed Incomplete, \`4\`=Closed Complete.`,
      },
      {
        name: 'work_notes',
        type: 'string',
        required: false,
        description: `Internal work notes to append to the problem task activity log.`,
      },
    ],
  },
  {
    name: 'servicenow_problem_update',
    description: `Update fields on an existing problem record in ServiceNow. State values: 101=Open, 102=Known Error, 103=Pending Change, 104=Closed/Resolved.`,
    params: [
      {
        name: 'sys_id',
        type: 'string',
        required: true,
        description: `The sys_id of the problem record to update.`,
      },
      {
        name: 'assigned_to',
        type: 'string',
        required: false,
        description: `sys_id or username of the individual assigned to the problem.`,
      },
      {
        name: 'assignment_group',
        type: 'string',
        required: false,
        description: `sys_id or name of the group to assign the problem to.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Updated detailed description of the problem.`,
      },
      {
        name: 'fix_notes',
        type: 'string',
        required: false,
        description: `Notes describing the permanent fix applied to resolve the problem.`,
      },
      {
        name: 'known_error',
        type: 'string',
        required: false,
        description: `Mark as a known error (\`true\` or \`false\`).`,
      },
      {
        name: 'short_description',
        type: 'string',
        required: false,
        description: `Updated brief summary of the problem.`,
      },
      {
        name: 'state',
        type: 'string',
        required: false,
        description: `Problem state: \`101\`=Open, \`102\`=Known Error, \`103\`=Pending Change, \`104\`=Closed/Resolved.`,
      },
      {
        name: 'work_notes',
        type: 'string',
        required: false,
        description: `Internal work notes to add to the problem (not visible to end users).`,
      },
      {
        name: 'workaround',
        type: 'string',
        required: false,
        description: `Temporary workaround to mitigate the problem.`,
      },
    ],
  },
  {
    name: 'servicenow_sc_req_item_update',
    description: `Update fields on a specific Requested Item (RITM / sc_req_item).`,
    params: [
      {
        name: 'sys_id',
        type: 'string',
        required: true,
        description: `Sys ID of the Requested Item (RITM) to update.`,
      },
      {
        name: 'assigned_to',
        type: 'string',
        required: false,
        description: `Sys ID of the user to assign the request item to.`,
      },
      {
        name: 'assignment_group',
        type: 'string',
        required: false,
        description: `Sys ID of the group to assign the request item to.`,
      },
      {
        name: 'state',
        type: 'string',
        required: false,
        description: `State value to set on the request item (e.g., '1' for Open, '3' for Closed Complete).`,
      },
      {
        name: 'work_notes',
        type: 'string',
        required: false,
        description: `Work notes to add to the request item.`,
      },
    ],
  },
  {
    name: 'servicenow_service_request_get',
    description: `Retrieve details of a specific service request by sys_id.`,
    params: [
      {
        name: 'sys_id',
        type: 'string',
        required: true,
        description: `The sys_id of the service request to retrieve.`,
      },
      {
        name: 'sysparm_display_value',
        type: 'string',
        required: false,
        description: `Return field display values instead of raw values. Options: \`true\`, \`false\`, or \`all\`.`,
      },
      {
        name: 'sysparm_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return in the response.`,
      },
    ],
  },
  {
    name: 'servicenow_service_request_item_list',
    description: `Retrieve a list of requested items (sc_req_item) - individual line items within service requests.`,
    params: [
      {
        name: 'sysparm_display_value',
        type: 'string',
        required: false,
        description: `Return field display values instead of raw values. Options: \`true\`, \`false\`, or \`all\`.`,
      },
      {
        name: 'sysparm_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return in the response.`,
      },
      {
        name: 'sysparm_limit',
        type: 'integer',
        required: false,
        description: `Maximum number of records to return (default: 10, max: 10000).`,
      },
      {
        name: 'sysparm_offset',
        type: 'integer',
        required: false,
        description: `Number of records to skip for pagination.`,
      },
      {
        name: 'sysparm_query',
        type: 'string',
        required: false,
        description: `Encoded query string to filter results. Use \`request=<sys_id>\` to filter by parent request.`,
      },
    ],
  },
  {
    name: 'servicenow_service_request_list',
    description: `Retrieve a list of service requests (sc_request) with filtering and pagination.`,
    params: [
      {
        name: 'sysparm_display_value',
        type: 'string',
        required: false,
        description: `Return field display values instead of raw values. Options: \`true\`, \`false\`, or \`all\`.`,
      },
      {
        name: 'sysparm_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return in the response.`,
      },
      {
        name: 'sysparm_limit',
        type: 'integer',
        required: false,
        description: `Maximum number of records to return (default: 10, max: 10000).`,
      },
      {
        name: 'sysparm_offset',
        type: 'integer',
        required: false,
        description: `Number of records to skip for pagination.`,
      },
      {
        name: 'sysparm_query',
        type: 'string',
        required: false,
        description: `Encoded query string to filter results (e.g., \`active=true^requested_for=abc123\`).`,
      },
    ],
  },
  {
    name: 'servicenow_table_record_create',
    description: `Create a new record in any ServiceNow table using the generic Table API. Provide the table name and field values as a JSON object in \`record_data\`.`,
    params: [
      {
        name: 'record_data',
        type: 'object',
        required: true,
        description: `JSON object containing field name-value pairs for the new record.`,
      },
      {
        name: 'table_name',
        type: 'string',
        required: true,
        description: `Name of the ServiceNow table in which to create the record (e.g., \`incident\`, \`task\`, \`change_request\`).`,
      },
    ],
  },
  {
    name: 'servicenow_table_record_delete',
    description: `Delete a record from any ServiceNow table by sys_id. This action is permanent and irreversible.`,
    params: [
      {
        name: 'sys_id',
        type: 'string',
        required: true,
        description: `The sys_id of the record to delete.`,
      },
      {
        name: 'table_name',
        type: 'string',
        required: true,
        description: `Name of the ServiceNow table containing the record to delete (e.g., \`incident\`, \`task\`, \`change_request\`).`,
      },
    ],
  },
  {
    name: 'servicenow_table_record_get',
    description: `Retrieve a single record from any ServiceNow table by sys_id. Specify the table name and the record's sys_id.`,
    params: [
      {
        name: 'sys_id',
        type: 'string',
        required: true,
        description: `The sys_id of the record to retrieve.`,
      },
      {
        name: 'table_name',
        type: 'string',
        required: true,
        description: `Name of the ServiceNow table (e.g., \`incident\`, \`task\`, \`change_request\`).`,
      },
      {
        name: 'sysparm_display_value',
        type: 'string',
        required: false,
        description: `Return field display values instead of raw values. Options: \`true\`, \`false\`, or \`all\`.`,
      },
      {
        name: 'sysparm_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return in the response.`,
      },
    ],
  },
  {
    name: 'servicenow_table_record_list',
    description: `Retrieve records from any ServiceNow table using the generic Table API. Specify the table name (e.g., \`incident\`, \`task\`, \`sys_user\`) to query any table in your instance.`,
    params: [
      {
        name: 'table_name',
        type: 'string',
        required: true,
        description: `Name of the ServiceNow table to query (e.g., \`incident\`, \`task\`, \`change_request\`).`,
      },
      {
        name: 'sysparm_display_value',
        type: 'string',
        required: false,
        description: `Return field display values instead of raw values. Options: \`true\`, \`false\`, or \`all\`.`,
      },
      {
        name: 'sysparm_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return in the response.`,
      },
      {
        name: 'sysparm_limit',
        type: 'integer',
        required: false,
        description: `Maximum number of records to return (default: 10).`,
      },
      {
        name: 'sysparm_offset',
        type: 'integer',
        required: false,
        description: `Number of records to skip for pagination.`,
      },
      {
        name: 'sysparm_query',
        type: 'string',
        required: false,
        description: `Encoded query string to filter results (e.g., \`active=true^state=1\`).`,
      },
    ],
  },
  {
    name: 'servicenow_table_record_update',
    description: `Update fields on an existing record in any ServiceNow table using the generic Table API. Only fields provided in \`record_data\` will be updated.`,
    params: [
      {
        name: 'record_data',
        type: 'object',
        required: true,
        description: `JSON object containing field name-value pairs to update on the record.`,
      },
      {
        name: 'sys_id',
        type: 'string',
        required: true,
        description: `The sys_id of the record to update.`,
      },
      {
        name: 'table_name',
        type: 'string',
        required: true,
        description: `Name of the ServiceNow table containing the record to update (e.g., \`incident\`, \`task\`, \`change_request\`).`,
      },
    ],
  },
  {
    name: 'servicenow_table_schema_get',
    description: `Retrieve the field definitions, types, labels, and reference relationships for any ServiceNow table. Useful for understanding table structure before querying or creating records.`,
    params: [
      {
        name: 'table_name',
        type: 'string',
        required: true,
        description: `The internal name of the ServiceNow table whose schema to retrieve.`,
      },
    ],
  },
  {
    name: 'servicenow_user_create',
    description: `Create a new user in ServiceNow. Returns the created user record with its sys_id.`,
    params: [
      {
        name: 'user_name',
        type: 'string',
        required: true,
        description: `Username (login ID) for the new user.`,
      },
      {
        name: 'active',
        type: 'boolean',
        required: false,
        description: `Whether the user account is active.`,
      },
      {
        name: 'department',
        type: 'string',
        required: false,
        description: `Department of the user. Can be a sys_id or department name.`,
      },
      { name: 'email', type: 'string', required: false, description: `Email address of the user.` },
      {
        name: 'first_name',
        type: 'string',
        required: false,
        description: `First name of the user.`,
      },
      { name: 'last_name', type: 'string', required: false, description: `Last name of the user.` },
      {
        name: 'manager',
        type: 'string',
        required: false,
        description: `sys_id of the user's manager.`,
      },
      {
        name: 'mobile_phone',
        type: 'string',
        required: false,
        description: `Mobile phone number of the user.`,
      },
      {
        name: 'phone',
        type: 'string',
        required: false,
        description: `Business phone number of the user.`,
      },
      { name: 'title', type: 'string', required: false, description: `Job title of the user.` },
    ],
  },
  {
    name: 'servicenow_user_delete',
    description: `Delete a user record from ServiceNow. This action is irreversible. Deactivating the user (setting active=false) is typically preferred over deletion.`,
    params: [
      {
        name: 'sys_id',
        type: 'string',
        required: true,
        description: `The sys_id of the sys_user record to delete.`,
      },
    ],
  },
  {
    name: 'servicenow_user_get',
    description: `Retrieve details of a specific user by sys_id.`,
    params: [
      {
        name: 'sys_id',
        type: 'string',
        required: true,
        description: `The sys_id of the user record to retrieve.`,
      },
      {
        name: 'sysparm_display_value',
        type: 'string',
        required: false,
        description: `Return display values for reference fields. Options: true, false, or all.`,
      },
      {
        name: 'sysparm_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return in the response.`,
      },
    ],
  },
  {
    name: 'servicenow_user_group_create',
    description: `Create a new user group in ServiceNow. Returns the created group record with its sys_id.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name of the user group.` },
      {
        name: 'active',
        type: 'boolean',
        required: false,
        description: `Whether the group is active.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description of the user group.`,
      },
      {
        name: 'email',
        type: 'string',
        required: false,
        description: `Email address for the group.`,
      },
      {
        name: 'manager',
        type: 'string',
        required: false,
        description: `sys_id or username of the group manager.`,
      },
    ],
  },
  {
    name: 'servicenow_user_group_delete',
    description: `Delete a user group from ServiceNow. This action is irreversible and removes the group and all its membership records.`,
    params: [
      {
        name: 'sys_id',
        type: 'string',
        required: true,
        description: `The sys_id of the sys_user_group record to delete.`,
      },
    ],
  },
  {
    name: 'servicenow_user_group_get',
    description: `Retrieve details of a specific user group by sys_id.`,
    params: [
      {
        name: 'sys_id',
        type: 'string',
        required: true,
        description: `The sys_id of the user group record to retrieve.`,
      },
      {
        name: 'sysparm_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return in the response.`,
      },
    ],
  },
  {
    name: 'servicenow_user_group_list',
    description: `Retrieve a list of user groups from ServiceNow with filtering and pagination.`,
    params: [
      {
        name: 'sysparm_display_value',
        type: 'string',
        required: false,
        description: `Return display values for reference fields. Options: true, false, or all.`,
      },
      {
        name: 'sysparm_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return in the response.`,
      },
      {
        name: 'sysparm_limit',
        type: 'integer',
        required: false,
        description: `Maximum number of records to return.`,
      },
      {
        name: 'sysparm_offset',
        type: 'integer',
        required: false,
        description: `Starting record index for pagination.`,
      },
      {
        name: 'sysparm_query',
        type: 'string',
        required: false,
        description: `Encoded query string to filter groups (e.g., active=true^nameSTARTSWITHNetwork).`,
      },
    ],
  },
  {
    name: 'servicenow_user_group_member_add',
    description: `Add a user to a user group in ServiceNow by creating a group member record in the sys_user_grmember table.`,
    params: [
      {
        name: 'group',
        type: 'string',
        required: true,
        description: `The sys_id of the group to add the user to.`,
      },
      {
        name: 'user',
        type: 'string',
        required: true,
        description: `The sys_id of the user to add to the group.`,
      },
    ],
  },
  {
    name: 'servicenow_user_group_member_list',
    description: `Retrieve members of a user group from ServiceNow. Filter by group sys_id using group_sys_id parameter.`,
    params: [
      {
        name: 'group_sys_id',
        type: 'string',
        required: false,
        description: `Filter results to members of a specific group by providing the group's sys_id.`,
      },
      {
        name: 'sysparm_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return in the response.`,
      },
      {
        name: 'sysparm_limit',
        type: 'integer',
        required: false,
        description: `Maximum number of records to return.`,
      },
      {
        name: 'sysparm_offset',
        type: 'integer',
        required: false,
        description: `Starting record index for pagination.`,
      },
    ],
  },
  {
    name: 'servicenow_user_group_member_remove',
    description: `Remove a user from a ServiceNow user group by deleting the group membership record (sys_user_grmember). Use servicenow_user_group_member_list to find the membership record sys_id.`,
    params: [
      {
        name: 'sys_id',
        type: 'string',
        required: true,
        description: `The sys_id of the sys_user_grmember record (group membership record) to delete.`,
      },
    ],
  },
  {
    name: 'servicenow_user_list',
    description: `Retrieve a list of users from ServiceNow with filtering and pagination.`,
    params: [
      {
        name: 'sysparm_display_value',
        type: 'string',
        required: false,
        description: `Return display values for reference fields. Options: true, false, or all.`,
      },
      {
        name: 'sysparm_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return in the response.`,
      },
      {
        name: 'sysparm_limit',
        type: 'integer',
        required: false,
        description: `Maximum number of records to return.`,
      },
      {
        name: 'sysparm_offset',
        type: 'integer',
        required: false,
        description: `Starting record index for pagination.`,
      },
      {
        name: 'sysparm_query',
        type: 'string',
        required: false,
        description: `Encoded query string to filter users (e.g., active=true^department=IT).`,
      },
    ],
  },
  {
    name: 'servicenow_user_role_assign',
    description: `Assign a role to a ServiceNow user by creating a sys_user_has_role record linking the user's sys_id to the role's sys_id.`,
    params: [
      {
        name: 'role',
        type: 'string',
        required: true,
        description: `sys_id of the role to assign to the user`,
      },
      {
        name: 'user',
        type: 'string',
        required: true,
        description: `sys_id of the user to assign the role to`,
      },
    ],
  },
  {
    name: 'servicenow_user_role_list',
    description: `Retrieve a list of all available roles defined in ServiceNow. Supports pagination and field filtering to narrow the returned data.`,
    params: [
      {
        name: 'sysparm_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to return for each role`,
      },
      {
        name: 'sysparm_limit',
        type: 'integer',
        required: false,
        description: `Maximum number of role records to return`,
      },
      {
        name: 'sysparm_offset',
        type: 'integer',
        required: false,
        description: `Number of records to skip for pagination`,
      },
      {
        name: 'sysparm_query',
        type: 'string',
        required: false,
        description: `Encoded query string to filter roles (ServiceNow query syntax)`,
      },
    ],
  },
  {
    name: 'servicenow_user_role_remove',
    description: `Remove a role from a ServiceNow user by deleting the sys_user_has_role record that links the user to the role. Provide the sys_id of the sys_user_has_role record (not the user or role sys_id).`,
    params: [
      {
        name: 'sys_id',
        type: 'string',
        required: true,
        description: `sys_id of the sys_user_has_role record to delete`,
      },
    ],
  },
  {
    name: 'servicenow_user_update',
    description: `Update fields on an existing user record in ServiceNow. Only the fields provided will be updated.`,
    params: [
      {
        name: 'sys_id',
        type: 'string',
        required: true,
        description: `The sys_id of the user record to update.`,
      },
      {
        name: 'active',
        type: 'boolean',
        required: false,
        description: `Whether the user account is active.`,
      },
      {
        name: 'department',
        type: 'string',
        required: false,
        description: `Updated department. Can be a sys_id or department name.`,
      },
      {
        name: 'email',
        type: 'string',
        required: false,
        description: `Updated email address of the user.`,
      },
      {
        name: 'first_name',
        type: 'string',
        required: false,
        description: `Updated first name of the user.`,
      },
      {
        name: 'last_name',
        type: 'string',
        required: false,
        description: `Updated last name of the user.`,
      },
      {
        name: 'manager',
        type: 'string',
        required: false,
        description: `Updated sys_id of the user's manager.`,
      },
      {
        name: 'mobile_phone',
        type: 'string',
        required: false,
        description: `Updated mobile phone number.`,
      },
      {
        name: 'phone',
        type: 'string',
        required: false,
        description: `Updated business phone number.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Updated job title of the user.`,
      },
    ],
  },
]
