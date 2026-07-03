import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'leadfeedermcp_add_company_to_lists',
    description: `Allows the addition of this company to one or more lists. Since lists are a separate entity, the IDs that you must pass in this endpoint come from the Retrieve Lists and Get List Details endpoints. Adding a company to lists does not consume credits.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The Leadfeeder Account ID. The Account ID can be retrieved using the List Accounts endpoint.`,
      },
      {
        name: 'data',
        type: 'array',
        required: true,
        description: `Array of list references to add the company to.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The company's ID. Note that the older string-based ID format continues to be supported.`,
      },
    ],
  },
  {
    name: 'leadfeedermcp_add_contact_to_lists',
    description: `Add a contact to one or more Leadfeeder lists.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The Leadfeeder Account ID. The Account ID can be retrieved using the List Accounts endpoint.`,
      },
      {
        name: 'data',
        type: 'array',
        required: true,
        description: `Array of list references to add the contact to.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The contact's ID. Note that the older string-based ID format continues to be supported.`,
      },
    ],
  },
  {
    name: 'leadfeedermcp_assign_tags_to_company',
    description: `Assign one or more tags to a Leadfeeder company.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The Leadfeeder Account ID. The Account ID can be retrieved using the List Accounts endpoint.`,
      },
      {
        name: 'data',
        type: 'array',
        required: true,
        description: `Array of tag references to assign to the company.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The company's ID. Note that the older string-based ID format continues to be supported.`,
      },
    ],
  },
  {
    name: 'leadfeedermcp_create_company_enrichment_job',
    description: `Start an async job to enrich a batch of companies with additional data. Returns a job ID to track progress.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The Leadfeeder Account ID. The Account ID can be retrieved using the List Accounts endpoint.`,
      },
      {
        name: 'data',
        type: 'object',
        required: true,
        description: `Enrichment job creation parameters. Provide exactly one of company_ids or list_id, plus a custom_field_id identifying the AI field to enrich.`,
      },
    ],
  },
  {
    name: 'leadfeedermcp_create_custom_field',
    description: `Create a new custom field in a Leadfeeder account.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The Leadfeeder Account ID. The Account ID can be retrieved using the List Accounts endpoint.`,
      },
      {
        name: 'data',
        type: 'object',
        required: true,
        description: `The request body containing the custom field definition.`,
      },
    ],
  },
  {
    name: 'leadfeedermcp_create_find_contact_data_job',
    description: `CRITICAL: CREDIT-CONSUMING TOOL
Using this tool MAY consume Leadfeeder credits. You MUST follow this protocol:
1. PAUSE: Do not execute this tool automatically.
2. INFORM: Tell the user this action may consume credits.
3. CONFIRM: Ask the user for an explicit Yes/No confirmation to proceed.
4. EXECUTE: Only call this tool after receiving clear, affirmative consent.

Trigger an asynchronous job to enrich the given contacts with email and phone data. Accepts either explicit \`contact_ids\` or a \`list_id\` to target an entire list. The job runs in the background; poll the status endpoint to check progress.
Credit Note: Credits are consumed as contacts are enriched.

Requires the \`contacts:read\` OAuth2 scope.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The Leadfeeder Account ID. The Account ID can be retrieved using the List Accounts endpoint.`,
      },
      {
        name: 'data',
        type: 'object',
        required: true,
        description: `Job definition object. Must include an 'attributes' field with either contact_ids or list_id.`,
      },
    ],
  },
  {
    name: 'leadfeedermcp_create_list',
    description: `Create a new list in the account.

Requires the \`lists:write\` OAuth2 scope.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The Leadfeeder Account ID. The Account ID can be retrieved using the List Accounts endpoint.`,
      },
      {
        name: 'data',
        type: 'object',
        required: true,
        description: `List definition object with required type and attributes fields.`,
      },
    ],
  },
  {
    name: 'leadfeedermcp_create_tag',
    description: `Create a new tag in a Leadfeeder account.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The Leadfeeder Account ID. The Account ID can be retrieved using the List Accounts endpoint.`,
      },
      {
        name: 'data',
        type: 'object',
        required: true,
        description: `The request body containing the tag definition.`,
      },
    ],
  },
  {
    name: 'leadfeedermcp_create_web_visits_custom_feed',
    description: `Create a new custom feed to filter and segment web visit data.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The Leadfeeder Account ID. The Account ID can be retrieved using the List Accounts endpoint.`,
      },
      {
        name: 'data',
        type: 'object',
        required: true,
        description: `The custom feed object to create, including type and attributes.`,
      },
    ],
  },
  {
    name: 'leadfeedermcp_delete_custom_field',
    description: `Permanently delete a custom field from a Leadfeeder account.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The Leadfeeder Account ID. The Account ID can be retrieved using the List Accounts endpoint.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The custom field internal name.`,
      },
    ],
  },
  {
    name: 'leadfeedermcp_delete_list',
    description: `Delete a list from the account. Once removed, the list will no longer be accessible.

Credit Note: Deleting list does not consume credits.

Requires the \`lists:write\` OAuth2 scope.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The Leadfeeder Account ID. The Account ID can be retrieved using the List Accounts endpoint.`,
      },
      { name: 'id', type: 'string', required: true, description: `The list ID.` },
    ],
  },
  {
    name: 'leadfeedermcp_delete_tag',
    description: `Permanently delete a tag from a Leadfeeder account.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The Leadfeeder Account ID. The Account ID can be retrieved using the List Accounts endpoint.`,
      },
      { name: 'id', type: 'string', required: true, description: `The tag ID.` },
    ],
  },
  {
    name: 'leadfeedermcp_delete_web_visits_custom_feed',
    description: `Permanently delete a web visit custom feed.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The Leadfeeder Account ID. The Account ID can be retrieved using the List Accounts endpoint.`,
      },
      {
        name: 'custom_feed_id',
        type: 'string',
        required: true,
        description: `The ID of the custom feed to delete.`,
      },
    ],
  },
  {
    name: 'leadfeedermcp_enrich_ip',
    description: `Look up company information associated with a given IP address. Returns firmographic data for the organization behind the IP.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The Leadfeeder Account ID. The Account ID can be retrieved using the List Accounts endpoint.`,
      },
      {
        name: 'ip',
        type: 'string',
        required: true,
        description: `A valid IPv4 or IPv6 address to enrich with company information.`,
      },
    ],
  },
  {
    name: 'leadfeedermcp_estimate_company_enrichment_job',
    description: `Estimate the credit cost of a company enrichment job before running it.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The Leadfeeder Account ID. The Account ID can be retrieved using the List Accounts endpoint.`,
      },
      {
        name: 'data',
        type: 'object',
        required: true,
        description: `Enrichment job estimate parameters including attributes that specify the target companies and custom field to enrich.`,
      },
    ],
  },
  {
    name: 'leadfeedermcp_estimate_find_contact_data_job',
    description: `Estimate the credit cost for enriching contacts with email and phone data. Accepts either explicit \`contact_ids\` or a \`list_id\` to target an entire list. Returns the number of eligible contacts and the estimated total credits that would be consumed.
Credit Note: This endpoint does not consume credits.

Requires the \`contacts:read\` OAuth2 scope.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The Leadfeeder Account ID. The Account ID can be retrieved using the List Accounts endpoint.`,
      },
      {
        name: 'data',
        type: 'object',
        required: true,
        description: `Job definition object. Must include an 'attributes' field with either contact_ids or list_id.`,
      },
    ],
  },
  {
    name: 'leadfeedermcp_get_account_info',
    description: `Retrieves a list of Leadfeeder accounts associated with this API key. When listing all accounts, only the account names are returned. Detailed credit information is accessible only when querying a specific account.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: false,
        description: `The Leadfeeder Account ID. When provided, the response returns a single account including credit details. If omitted, it returns a list of all accessible accounts without credit information.`,
      },
    ],
  },
  {
    name: 'leadfeedermcp_get_buyer_persona',
    description: `Retrieve a specific buyer persona by ID.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The Leadfeeder Account ID. The Account ID can be retrieved using the List Accounts endpoint.`,
      },
      { name: 'id', type: 'string', required: true, description: `The buyer persona ID.` },
    ],
  },
  {
    name: 'leadfeedermcp_get_buyer_personas',
    description: `Retrieve all buyer personas defined in a Leadfeeder account.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The Leadfeeder Account ID. The Account ID can be retrieved using the List Accounts endpoint.`,
      },
    ],
  },
  {
    name: 'leadfeedermcp_get_campaign',
    description: `Retrieve details of a specific campaign by ID.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The Leadfeeder Account ID. The Account ID can be retrieved using the List Accounts endpoint.`,
      },
      { name: 'id', type: 'string', required: true, description: `The campaign ID.` },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Comma-separated list of related resources to inline. Supported: campaign_summary, campaign_settings, campaign_locations, list, custom_feed.`,
      },
    ],
  },
  {
    name: 'leadfeedermcp_get_campaign_stats',
    description: `Retrieve performance statistics for a specific campaign.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The Leadfeeder Account ID. The Account ID can be retrieved using the List Accounts endpoint.`,
      },
      {
        name: 'end_period',
        type: 'string',
        required: true,
        description: `Inclusive end of the reporting window (ISO 8601 calendar date, YYYY-MM-DD). Must be on or after start_period.`,
      },
      {
        name: 'frequency',
        type: 'string',
        required: true,
        description: `Bucket granularity for the returned stats series.`,
      },
      { name: 'id', type: 'string', required: true, description: `The campaign ID.` },
      {
        name: 'start_period',
        type: 'string',
        required: true,
        description: `Inclusive start of the reporting window (ISO 8601 calendar date, YYYY-MM-DD). Must be on or before end_period.`,
      },
      {
        name: 'page_num',
        type: 'integer',
        required: false,
        description: `Page of results to fetch.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `The number of items per page. Maximum is 100.`,
      },
    ],
  },
  {
    name: 'leadfeedermcp_get_campaigns',
    description: `Retrieve all campaigns in a Leadfeeder account.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The Leadfeeder Account ID. The Account ID can be retrieved using the List Accounts endpoint.`,
      },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Comma-separated list of related resources to inline. Supported: campaign_summary, campaign_settings, campaign_locations, list, custom_feed.`,
      },
      {
        name: 'page_num',
        type: 'integer',
        required: false,
        description: `Page of results to fetch.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `The number of items per page. Maximum is 100.`,
      },
    ],
  },
  {
    name: 'leadfeedermcp_get_companies_by_ids',
    description: `Fetch one or more companies by their Leadfeeder IDs in a single call. Pass IDs comma-separated in the ids parameter (up to 100 IDs). Accessing company data consumes credits.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The Leadfeeder Account ID. The Account ID can be retrieved using the List Accounts endpoint.`,
      },
      {
        name: 'ids',
        type: 'string',
        required: true,
        description: `Comma separated list of company IDs. A maximum of 100 IDs can be passed to this endpoint.`,
      },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Specify which additional data should be attached to the result.`,
      },
    ],
  },
  {
    name: 'leadfeedermcp_get_company',
    description: `Fetch detailed information about a specific company, including firmographics and hierarchy information. Accessing full deep data consumes 1 credit, unless the company was already accessed within the last 12 months.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The Leadfeeder Account ID. The Account ID can be retrieved using the List Accounts endpoint.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The company's ID. Note that the older string-based ID format continues to be supported.`,
      },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Specify which additional data should be attached to the result.`,
      },
    ],
  },
  {
    name: 'leadfeedermcp_get_company_enrichment_job',
    description: `Check the status and results of a company enrichment job.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The Leadfeeder Account ID. The Account ID can be retrieved using the List Accounts endpoint.`,
      },
      {
        name: 'job_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the enrichment job.`,
      },
    ],
  },
  {
    name: 'leadfeedermcp_get_company_financials',
    description: `Returns all financial reports for a given company. Accessing financial data consumes 1 credit per company if not accessed within the last 12 months.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The Leadfeeder Account ID. The Account ID can be retrieved using the List Accounts endpoint.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The company's ID. Note that the older string-based ID format continues to be supported.`,
      },
    ],
  },
  {
    name: 'leadfeedermcp_get_company_ips',
    description: `Fetch known IP addresses associated with given companies. Retrieving IP data consumes 1 credit per company unless accessed within the last 12 months.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The Leadfeeder Account ID. The Account ID can be retrieved using the List Accounts endpoint.`,
      },
      {
        name: 'company_ids',
        type: 'string',
        required: true,
        description: `A comma-separated list of company IDs. Accepts up to 100 company IDs per request.`,
      },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Specify which additional data should be attached to the result. When 'company' is included, the full company attributes are inlined.`,
      },
      {
        name: 'max_ip_addresses',
        type: 'integer',
        required: false,
        description: `Maximum number of IP addresses to return per company. Results are ordered by confidence score (highest first).`,
      },
    ],
  },
  {
    name: 'leadfeedermcp_get_contact',
    description: `Fetch detailed information about a specific contact by ID.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The Leadfeeder Account ID. The Account ID can be retrieved using the List Accounts endpoint.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The contact's ID. Note that the older string-based ID format continues to be supported.`,
      },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Specify which additional data should be attached to the result.`,
      },
    ],
  },
  {
    name: 'leadfeedermcp_get_contacts',
    description: `Retrieve a paginated list of contacts from Leadfeeder.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The Leadfeeder Account ID. The Account ID can be retrieved using the List Accounts endpoint.`,
      },
      {
        name: 'ids',
        type: 'string',
        required: true,
        description: `Comma separated list of contact IDs. A maximum of 100 IDs can be passed to this endpoint.`,
      },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Specify which additional data should be attached to the result.`,
      },
    ],
  },
  {
    name: 'leadfeedermcp_get_current_user_info',
    description: `Retrieves the identity of the current API user. Unlike most endpoints, this one does not require the account_id parameter — the user's identity is independent of the account they are currently working on.`,
    params: [],
  },
  {
    name: 'leadfeedermcp_get_custom_field',
    description: `Retrieve a specific custom field by ID.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The Leadfeeder Account ID. The Account ID can be retrieved using the List Accounts endpoint.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The custom field internal name.`,
      },
    ],
  },
  {
    name: 'leadfeedermcp_get_custom_fields',
    description: `Retrieve the list of all custom field definitions available in the account. The response includes each field's attributes.

Credit Note: Retrieving custom field definitions does not consume credits.

Requires the \`custom_fields:read\` OAuth2 scope.

Pagination: use page_num to page through results, starting at 1. Increment by 1 for each subsequent page. Stop when page_num exceeds meta.pagination.page_count. page_size controls how many items are returned per page (default: 20, max: 100).`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The Leadfeeder Account ID. The Account ID can be retrieved using the List Accounts endpoint.`,
      },
      {
        name: 'filter_scope',
        type: 'string',
        required: false,
        description: `Filter by entities that apply to either company or contact. If omitted, returns both kinds of entities.`,
      },
      {
        name: 'filter_type',
        type: 'string',
        required: false,
        description: `Filter by field type. If omitted, returns all field types.`,
      },
      {
        name: 'page_num',
        type: 'integer',
        required: false,
        description: `Page of results to fetch.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `The number of items per page. Maximum is 100.`,
      },
    ],
  },
  {
    name: 'leadfeedermcp_get_find_contact_data_job',
    description: `Retrieve the current status of a Find Contact Data job. Returns progress counters, credit consumption, and any errors.
Jobs are retained for 7 days after completion.
Credit Note: This endpoint does not consume credits.

Requires the \`contacts:read\` OAuth2 scope.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The Leadfeeder Account ID. The Account ID can be retrieved using the List Accounts endpoint.`,
      },
      {
        name: 'job_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the find contact data job.`,
      },
    ],
  },
  {
    name: 'leadfeedermcp_get_icp',
    description: `Retrieve a specific Ideal Customer Profile (ICP) definition by ID.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The Leadfeeder Account ID. The Account ID can be retrieved using the List Accounts endpoint.`,
      },
      { name: 'id', type: 'string', required: true, description: `The ICP ID.` },
    ],
  },
  {
    name: 'leadfeedermcp_get_icps',
    description: `Retrieve all Ideal Customer Profile (ICP) definitions in a Leadfeeder account.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The Leadfeeder Account ID. The Account ID can be retrieved using the List Accounts endpoint.`,
      },
    ],
  },
  {
    name: 'leadfeedermcp_get_list',
    description: `Retrieve the details of a specific list using its unique ID. The response includes the list's attributes, such as its name and scope, along with any related information.

Credit Note: Retrieving list definitions does not consume credits.

Requires the \`lists:read\` OAuth2 scope.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The Leadfeeder Account ID. The Account ID can be retrieved using the List Accounts endpoint.`,
      },
      { name: 'id', type: 'string', required: true, description: `The list ID.` },
    ],
  },
  {
    name: 'leadfeedermcp_get_lists',
    description: `Retrieve all lists available in the account. The response includes each list's attributes and can be filtered through query parameters.

Credit Note: Retrieving list definitions does not consume credits.

Requires the \`lists:read\` OAuth2 scope.

Pagination: use page_num to page through results, starting at 1. Increment by 1 for each subsequent page. Stop when page_num exceeds meta.pagination.page_count. page_size controls how many items are returned per page (default: 20, max: 100).`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The Leadfeeder Account ID. The Account ID can be retrieved using the List Accounts endpoint.`,
      },
      {
        name: 'filter_scope',
        type: 'string',
        required: true,
        description: `Filter by entities that apply to either company or contact.`,
      },
      {
        name: 'page_num',
        type: 'integer',
        required: false,
        description: `Page of results to fetch.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `The number of items per page. Maximum is 100.`,
      },
    ],
  },
  {
    name: 'leadfeedermcp_get_tag',
    description: `Retrieve details of a specific tag by ID.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The Leadfeeder Account ID. The Account ID can be retrieved using the List Accounts endpoint.`,
      },
      { name: 'id', type: 'string', required: true, description: `The tag ID.` },
    ],
  },
  {
    name: 'leadfeedermcp_get_tags',
    description: `Retrieve all tags defined in a Leadfeeder account.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The Leadfeeder Account ID. The Account ID can be retrieved using the List Accounts endpoint.`,
      },
      {
        name: 'page_num',
        type: 'integer',
        required: false,
        description: `Page of results to fetch.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `The number of items per page. Maximum is 100.`,
      },
    ],
  },
  {
    name: 'leadfeedermcp_get_web_visits_companies',
    description: `Retrieve companies identified from web visits, with details about their visit activity.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The Leadfeeder Account ID. The Account ID can be retrieved using the List Accounts endpoint.`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: true,
        description: `End of the date range (ISO 8601).`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: true,
        description: `Start of the date range (ISO 8601).`,
      },
      {
        name: 'custom_feed_id',
        type: 'string',
        required: false,
        description: `Filter results to companies matching a specific custom feed.`,
      },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Specify which additional data should be attached to the result.`,
      },
      {
        name: 'page_num',
        type: 'integer',
        required: false,
        description: `Page of results to fetch.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `The number of items per page. Maximum is 100.`,
      },
    ],
  },
  {
    name: 'leadfeedermcp_get_web_visits_custom_feed',
    description: `Retrieve details of a specific web visit custom feed by ID.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The Leadfeeder Account ID. The Account ID can be retrieved using the List Accounts endpoint.`,
      },
      {
        name: 'custom_feed_id',
        type: 'string',
        required: true,
        description: `The ID of the custom feed.`,
      },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Specify which additional data should be attached to the result.`,
      },
    ],
  },
  {
    name: 'leadfeedermcp_get_web_visits_custom_feed_folders',
    description: `Retrieve all folder groupings for web visit custom feeds in a Leadfeeder account.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The Leadfeeder Account ID. The Account ID can be retrieved using the List Accounts endpoint.`,
      },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Specify which additional data should be attached to the result.`,
      },
    ],
  },
  {
    name: 'leadfeedermcp_get_web_visits_custom_feeds',
    description: `Retrieve all custom feeds for web visits in a Leadfeeder account.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The Leadfeeder Account ID. The Account ID can be retrieved using the List Accounts endpoint.`,
      },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Specify which additional data should be attached to the result.`,
      },
    ],
  },
  {
    name: 'leadfeedermcp_get_web_visits_tracker',
    description: `Retrieve tracking script configuration and status for web visit tracking.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The Leadfeeder Account ID. The Account ID can be retrieved using the List Accounts endpoint.`,
      },
    ],
  },
  {
    name: 'leadfeedermcp_match_companies',
    description: `Find matching companies based on the provided input parameters. Returns matching company IDs and basic company information. Each company object must include at least one of: company_name, url, vat_id, or register_id. Matches do not consume credits.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The Leadfeeder Account ID. The Account ID can be retrieved using the List Accounts endpoint.`,
      },
      {
        name: 'companies',
        type: 'array',
        required: true,
        description: `Array of company objects to match (up to 200). Each must include at least one of: company_name, url, vat_id, or register_id.`,
      },
      {
        name: 'max_results_per_company',
        type: 'number',
        required: false,
        description: `Number of maximum results per company match input object.`,
      },
    ],
  },
  {
    name: 'leadfeedermcp_remove_company_from_lists',
    description: `Remove a company from one or more Leadfeeder lists.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The Leadfeeder Account ID. The Account ID can be retrieved using the List Accounts endpoint.`,
      },
      {
        name: 'data',
        type: 'array',
        required: true,
        description: `Array of list references to remove the company from.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The company's ID. Note that the older string-based ID format continues to be supported.`,
      },
    ],
  },
  {
    name: 'leadfeedermcp_remove_contact_from_lists',
    description: `Allows the removal of this contact from one or more lists.

Credit Note: Removing a contact from lists does not consume credits.

Requires the \`contacts:write\` OAuth2 scope.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The Leadfeeder Account ID. The Account ID can be retrieved using the List Accounts endpoint.`,
      },
      {
        name: 'data',
        type: 'array',
        required: true,
        description: `Array of list references to remove the contact from.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The contact's ID. Note that the older string-based ID format continues to be supported.`,
      },
    ],
  },
  {
    name: 'leadfeedermcp_search_companies',
    description: `Search companies by name, location, industry, size, and other filters. Returns matching company IDs and basic company info. Searches do not consume credits. Pagination: pass page_cursor from meta.pagination.next_cursor to fetch the next page. Stop when next_cursor is null.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The Leadfeeder Account ID. The Account ID can be retrieved using the List Accounts endpoint.`,
      },
      {
        name: 'employee_ranges',
        type: 'array',
        required: false,
        description: `List of employee count ranges to filter companies by size.`,
      },
      {
        name: 'filters',
        type: 'object',
        required: false,
        description: `Object containing additional boolean filters to refine search results. All filters are combined using AND.`,
      },
      {
        name: 'icp_ids',
        type: 'array',
        required: false,
        description: `List of Ideal Customer Profile (ICP) IDs. Returns companies matching at least one ICP (OR logic).`,
      },
      {
        name: 'industries',
        type: 'object',
        required: false,
        description: `Object specifying industry classification filters. Use the internal classification by default.`,
      },
      {
        name: 'locations',
        type: 'array',
        required: false,
        description: `Search in the company address. Multiple locations are combined as OR.`,
      },
      {
        name: 'page_cursor',
        type: 'string',
        required: false,
        description: `Cursor for pagination. Use this value to fetch the next page of results.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `The number of items per page. Maximum is 100.`,
      },
      {
        name: 'revenue',
        type: 'object',
        required: false,
        description: `Defines a revenue range filter. Specify at least one of min or max.`,
      },
      {
        name: 'search_terms',
        type: 'array',
        required: false,
        description: `List of strings to match against company name, alternative names, trade name and domain(s).`,
      },
    ],
  },
  {
    name: 'leadfeedermcp_search_companies_signals',
    description: `Retrieve signals for a specified set of company IDs. The response returns the signals linked to the provided companies. Credits are charged 1 per company if the company has signals and there was no active deep data access within the last 12 months. Pagination: pass page_cursor from meta.pagination.next_cursor to fetch the next page.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The Leadfeeder Account ID. The Account ID can be retrieved using the List Accounts endpoint.`,
      },
      {
        name: 'company_ids',
        type: 'array',
        required: true,
        description: `Array of company IDs to filter signals for (mandatory).`,
      },
      {
        name: 'categories',
        type: 'array',
        required: false,
        description: `Filter to search for signals in specific categories.`,
      },
      {
        name: 'event_date',
        type: 'object',
        required: false,
        description: `Filter signals by event date (YYYY-MM-DD). If both from and to are provided, from must be earlier than or equal to to.`,
      },
      {
        name: 'page_cursor',
        type: 'string',
        required: false,
        description: `Cursor for pagination. Use this value to fetch the next page of results.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `The number of items per page. Maximum is 100.`,
      },
      {
        name: 'publication_date',
        type: 'object',
        required: false,
        description: `Filter signals by publication date (YYYY-MM-DD). If both from and to are provided, from must be earlier than or equal to to.`,
      },
    ],
  },
  {
    name: 'leadfeedermcp_search_contacts',
    description: `Search for contacts using filters such as name, email, company, or other attributes.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The Leadfeeder Account ID. The Account ID can be retrieved using the List Accounts endpoint.`,
      },
      {
        name: 'affiliation',
        type: 'string',
        required: false,
        description: `Determines how the contact is related to the company.`,
      },
      {
        name: 'buyer_persona_ids',
        type: 'array',
        required: false,
        description: `List of buyer persona IDs to use as a filter.`,
      },
      {
        name: 'company_ids',
        type: 'array',
        required: false,
        description: `Filter contacts by Leadfeeder company IDs.`,
      },
      {
        name: 'departments',
        type: 'array',
        required: false,
        description: `The departments the contact works in within the company.`,
      },
      {
        name: 'emails',
        type: 'array',
        required: false,
        description: `Filter contacts by email addresses.`,
      },
      {
        name: 'filters',
        type: 'object',
        required: false,
        description: `Filter down search results (combined with AND).`,
      },
      {
        name: 'hierarchy_levels',
        type: 'array',
        required: false,
        description: `Filter contacts by hierarchy level within the company.`,
      },
      {
        name: 'page_cursor',
        type: 'string',
        required: false,
        description: `Cursor for pagination. Use this value to fetch the next page of results.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `The number of items per page. Maximum is 100.`,
      },
      {
        name: 'positions',
        type: 'array',
        required: false,
        description: `Search in orig and en fields.`,
      },
      {
        name: 'search_terms',
        type: 'array',
        required: false,
        description: `Search in contact fullname and title fields.`,
      },
    ],
  },
  {
    name: 'leadfeedermcp_search_web_visits',
    description: `Search and filter web visit records to identify companies that visited your website.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The Leadfeeder Account ID. The Account ID can be retrieved using the List Accounts endpoint.`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: true,
        description: `The end of the date range to search (inclusive). Must be a valid ISO 8601 date.`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: true,
        description: `The start of the date range to search (inclusive). Must be a valid ISO 8601 date.`,
      },
      {
        name: 'filters',
        type: 'object',
        required: false,
        description: `Optional filters to narrow visit records by company ID or visitor location.`,
      },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Specify which additional data should be attached to the result.`,
      },
      {
        name: 'page_num',
        type: 'integer',
        required: false,
        description: `Page of results to fetch.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `The number of items per page. Maximum is 100.`,
      },
    ],
  },
  {
    name: 'leadfeedermcp_unassign_tags_from_company',
    description: `Remove one or more tags from a Leadfeeder company.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The Leadfeeder Account ID. The Account ID can be retrieved using the List Accounts endpoint.`,
      },
      {
        name: 'data',
        type: 'array',
        required: true,
        description: `Array of tag references to unassign from the company.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The company's ID. Note that the older string-based ID format continues to be supported.`,
      },
    ],
  },
  {
    name: 'leadfeedermcp_update_campaign',
    description: `Update the settings or configuration of an existing campaign.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The Leadfeeder Account ID. The Account ID can be retrieved using the List Accounts endpoint.`,
      },
      {
        name: 'data',
        type: 'object',
        required: true,
        description: `Campaign update payload containing attributes and optional relationships to modify.`,
      },
      { name: 'id', type: 'string', required: true, description: `The campaign ID.` },
    ],
  },
  {
    name: 'leadfeedermcp_update_custom_field',
    description: `Update the definition of an existing custom field.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The Leadfeeder Account ID. The Account ID can be retrieved using the List Accounts endpoint.`,
      },
      {
        name: 'data',
        type: 'object',
        required: true,
        description: `The request body containing updated custom field attributes.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The custom field internal name.`,
      },
    ],
  },
  {
    name: 'leadfeedermcp_update_list',
    description: `Update the name of a list.

Credit Note: Updating list name does not consume credits.

Requires the \`lists:write\` OAuth2 scope.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The Leadfeeder Account ID. The Account ID can be retrieved using the List Accounts endpoint.`,
      },
      {
        name: 'data',
        type: 'object',
        required: true,
        description: `List update payload with required type and attributes fields.`,
      },
      { name: 'id', type: 'string', required: true, description: `The list ID.` },
    ],
  },
  {
    name: 'leadfeedermcp_update_tag',
    description: `Update the name or settings of an existing tag.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The Leadfeeder Account ID. The Account ID can be retrieved using the List Accounts endpoint.`,
      },
      {
        name: 'data',
        type: 'object',
        required: true,
        description: `The request body containing updated tag attributes.`,
      },
      { name: 'id', type: 'string', required: true, description: `The tag ID.` },
    ],
  },
  {
    name: 'leadfeedermcp_update_web_visits_custom_feed',
    description: `Update the configuration of an existing web visit custom feed.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The Leadfeeder Account ID. The Account ID can be retrieved using the List Accounts endpoint.`,
      },
      {
        name: 'custom_feed_id',
        type: 'string',
        required: true,
        description: `The ID of the custom feed to update.`,
      },
      {
        name: 'data',
        type: 'object',
        required: true,
        description: `The update payload containing type and attributes to modify.`,
      },
    ],
  },
  {
    name: 'leadfeedermcp_usage',
    description: `Retrieve current API usage and credit consumption for a Leadfeeder account.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The Leadfeeder Account ID. The Account ID can be retrieved using the List Accounts endpoint.`,
      },
      {
        name: 'end_period',
        type: 'string',
        required: true,
        description: `The ending month for the usage period, formatted as YYYY-MM. Must be greater than or equal to start_period.`,
      },
      {
        name: 'start_period',
        type: 'string',
        required: true,
        description: `The starting month for the usage period, formatted as YYYY-MM.`,
      },
    ],
  },
]
