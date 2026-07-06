import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
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
]
