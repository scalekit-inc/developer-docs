import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'clarifymcp_add_comment',
    description: `Add a Markdown comment to a supported Clarify entity (deal, person, company, etc.).`,
    params: [
      { name: 'entity', type: 'string', required: true, description: `The entity type to operate on (e.g. person, company, deal, or a custom object identifier like c_my_object).` },
      { name: 'id', type: 'string', required: true, description: `The unique ID of the record (e.g. per_01ABCDE for a person, cmp_01ABCDE for a company).` },
      { name: 'message', type: 'string', required: true, description: `The comment text in Markdown format. Supports **bold**, *italic*, and bullet lists.` },
    ],
  },
  {
    name: 'clarifymcp_create_or_update_campaign',
    description: `Create a new email campaign or update an existing one by its ID.`,
    params: [
      { name: 'campaign_name', type: 'string', required: true, description: `Name of the campaign. Required when creating a new campaign.` },
      { name: 'email_steps', type: 'array', required: true, description: `Array of email step definitions for the campaign sequence.` },
      { name: 'campaign_id', type: 'string', required: false, description: `ID of an existing campaign to update. Omit to create a new campaign.` },
      { name: 'status', type: 'string', required: false, description: `Campaign status — draft (default) or active.` },
    ],
  },
  {
    name: 'clarifymcp_create_or_update_custom_object',
    description: `Create a new custom object type or update an existing one in the Clarify workspace.`,
    params: [
      { name: 'description', type: 'string', required: false, description: `AI context description for this object type — helps the AI understand when to use it.` },
      { name: 'entity', type: 'string', required: false, description: `The entity type to operate on (e.g. person, company, deal, or a custom object identifier like c_my_object).` },
      { name: 'name', type: 'string', required: false, description: `Display name for the custom object type. Will be normalized to a slug for the entity identifier.` },
      { name: 'plural', type: 'string', required: false, description: `Plural label for the custom object type (e.g. Partnerships for a singular Partnership).` },
    ],
  },
  {
    name: 'clarifymcp_create_or_update_fields',
    description: `Create new custom fields or update existing fields on any Clarify entity (person, company, deal, or custom object).`,
    params: [
      { name: 'entity', type: 'string', required: true, description: `The entity type to operate on (e.g. person, company, deal, or a custom object identifier like c_my_object).` },
      { name: 'fields', type: 'array', required: true, description: `Array of field definitions to create or update on the entity.` },
    ],
  },
  {
    name: 'clarifymcp_create_or_update_list',
    description: `Create or update a dynamic list — a saved view whose membership is defined by a SQL query.`,
    params: [
      { name: 'entity', type: 'string', required: true, description: `The entity type to operate on (e.g. person, company, deal, or a custom object identifier like c_my_object).` },
      { name: 'description', type: 'string', required: false, description: `AI context description for this object type — helps the AI understand when to use it.` },
      { name: 'emoji', type: 'string', required: false, description: `A single emoji to display alongside the list name.` },
      { name: 'list_id', type: 'string', required: false, description: `The ID of an existing list (saved view). Use get_lists to find available list IDs.` },
      { name: 'sql', type: 'string', required: false, description: `SQL query to execute. For query_data use PostgreSQL syntax; for query_analytics use ClickHouse SQL.` },
      { name: 'title', type: 'string', required: false, description: `The display name of the list.` },
    ],
  },
  {
    name: 'clarifymcp_create_or_update_records',
    description: `Create new records or update existing ones in Clarify. Supports bulk operations of up to 25 records per call.`,
    params: [
      { name: 'entity', type: 'string', required: true, description: `The entity type to operate on (e.g. person, company, deal, or a custom object identifier like c_my_object).` },
      { name: 'records', type: 'array', required: true, description: `Array of records to create or update. Each item contains an attributes object with field values.` },
    ],
  },
  {
    name: 'clarifymcp_delete_campaign',
    description: `Permanently delete an email campaign by its ID.`,
    params: [
      { name: 'campaign_id', type: 'string', required: true, description: `The ID of the campaign. Use get_campaigns to list available campaigns and their IDs.` },
    ],
  },
  {
    name: 'clarifymcp_delete_custom_object',
    description: `Permanently delete a custom object type from the Clarify workspace by its entity identifier.`,
    params: [
      { name: 'entity', type: 'string', required: true, description: `The entity type to operate on (e.g. person, company, deal, or a custom object identifier like c_my_object).` },
    ],
  },
  {
    name: 'clarifymcp_delete_fields',
    description: `Permanently delete one or more custom fields from a Clarify entity by their field slugs.`,
    params: [
      { name: 'entity', type: 'string', required: true, description: `The entity type to operate on (e.g. person, company, deal, or a custom object identifier like c_my_object).` },
      { name: 'fieldNames', type: 'array', required: true, description: `Array of field slugs (snake_case) to delete from the entity.` },
    ],
  },
  {
    name: 'clarifymcp_delete_list',
    description: `Permanently delete a saved list (dynamic view) by its ID.`,
    params: [
      { name: 'entity', type: 'string', required: true, description: `The entity type to operate on (e.g. person, company, deal, or a custom object identifier like c_my_object).` },
      { name: 'list_id', type: 'string', required: true, description: `The ID of an existing list (saved view). Use get_lists to find available list IDs.` },
    ],
  },
  {
    name: 'clarifymcp_delete_records',
    description: `Permanently delete one or more records by their IDs. Supports bulk deletion of up to 25 records per call.`,
    params: [
      { name: 'entity', type: 'string', required: true, description: `The entity type to operate on (e.g. person, company, deal, or a custom object identifier like c_my_object).` },
      { name: 'record_ids', type: 'array', required: true, description: `Array of record IDs to delete. All must belong to the same entity type.` },
    ],
  },
  {
    name: 'clarifymcp_find_leads',
    description: `Search Clarify's built-in prospect database of 28M+ companies and 175M+ people to find new leads.`,
    params: [
      { name: 'entity', type: 'string', required: true, description: `The entity type to operate on (e.g. person, company, deal, or a custom object identifier like c_my_object).` },
      { name: 'search_label', type: 'string', required: true, description: `A descriptive label for this lead search (e.g. SF SaaS Companies 50+ employees).` },
      { name: 'sql', type: 'string', required: true, description: `SQL query to execute. For query_data use PostgreSQL syntax; for query_analytics use ClickHouse SQL.` },
      { name: 'search_identifiers', type: 'string', required: false, description: `Optional: provide a prior searchId and versionId to operate on an existing search.` },
    ],
  },
  {
    name: 'clarifymcp_get_campaigns',
    description: `List email campaigns in the workspace, or fetch a single campaign by ID with full details.`,
    params: [
      { name: 'campaign_id', type: 'string', required: false, description: `The ID of the campaign. Use get_campaigns to list available campaigns and their IDs.` },
      { name: 'limit', type: 'number', required: false, description: `Maximum number of records to return per page.` },
      { name: 'offset', type: 'number', required: false, description: `Number of records to skip for pagination (use with limit).` },
      { name: 'search', type: 'string', required: false, description: `Case-insensitive substring search to filter results by name or title.` },
      { name: 'status', type: 'string', required: false, description: `Filter by campaign status — draft (unpublished) or active (live campaigns).` },
    ],
  },
  {
    name: 'clarifymcp_get_current_user',
    description: `Retrieve information about the currently authenticated Clarify user, including timezone and workspace details.`,
    params: [
      { name: 'mcp_client_timezone', type: 'string', required: false, description: `Your IANA timezone string (e.g. America/New_York). Helps Clarify show times in your local timezone.` },
    ],
  },
  {
    name: 'clarifymcp_get_lists',
    description: `List saved views (dynamic lists) for an entity type, or fetch a single list by ID.`,
    params: [
      { name: 'entity', type: 'string', required: true, description: `The entity type to operate on (e.g. person, company, deal, or a custom object identifier like c_my_object).` },
      { name: 'limit', type: 'number', required: false, description: `Maximum number of records to return per page.` },
      { name: 'list_id', type: 'string', required: false, description: `The ID of an existing list (saved view). Use get_lists to find available list IDs.` },
      { name: 'offset', type: 'number', required: false, description: `Number of records to skip for pagination (use with limit).` },
      { name: 'search', type: 'string', required: false, description: `Case-insensitive substring search to filter results by name or title.` },
    ],
  },
  {
    name: 'clarifymcp_get_records',
    description: `Retrieve full details for one or more Clarify records by their IDs.`,
    params: [
      { name: 'entity', type: 'string', required: true, description: `The entity type to operate on (e.g. person, company, deal, or a custom object identifier like c_my_object).` },
      { name: 'ids', type: 'array', required: true, description: `Array of record IDs to retrieve. Use query_data to find IDs first.` },
    ],
  },
  {
    name: 'clarifymcp_get_schema',
    description: `Retrieve the schema for Clarify entities, including field definitions and relationship metadata.`,
    params: [
      { name: 'entities', type: 'array', required: false, description: `List of entity types to get schema for. Omit to return the schema for all entities.` },
      { name: 'format', type: 'string', required: false, description: `Schema format — use read for querying data or write for creating/updating records.` },
    ],
  },
  {
    name: 'clarifymcp_import_leads',
    description: `Import leads from a find_leads search result into your Clarify workspace.`,
    params: [
      { name: 'searchEmoji', type: 'string', required: true, description: `A single emoji representing the theme of the search.` },
      { name: 'searchId', type: 'string', required: true, description: `The ID of the lead search returned by find_leads.` },
      { name: 'searchTitle', type: 'string', required: true, description: `A descriptive title for the search based on its filters.` },
      { name: 'sourceEntity', type: 'string', required: true, description: `The lead entity type to import from — tam_company or tam_person.` },
      { name: 'count', type: 'integer', required: false, description: `Number of leads to import. Omit to import all leads in the search.` },
      { name: 'extraFields', type: 'array', required: false, description: `Additional TAM field names to import beyond the default fields.` },
      { name: 'versionId', type: 'string', required: false, description: `The version ID of the search. Use the versionId from a prior find_leads result when available.` },
    ],
  },
  {
    name: 'clarifymcp_merge_records',
    description: `Merge two or more duplicate records into a single primary record, combining all data.`,
    params: [
      { name: 'entity', type: 'string', required: true, description: `The entity type to operate on (e.g. person, company, deal, or a custom object identifier like c_my_object).` },
      { name: 'primaryRecordId', type: 'string', required: true, description: `The ID of the record to keep after the merge — all data is merged into this record.` },
      { name: 'sourceRecordIds', type: 'array', required: true, description: `IDs of records to merge into the primary record. These records are deleted after merging.` },
    ],
  },
  {
    name: 'clarifymcp_query_analytics',
    description: `Execute a read-only ClickHouse SQL query against the Clarify analytics event log.`,
    params: [
      { name: 'sql', type: 'string', required: true, description: `SQL query to execute. For query_data use PostgreSQL syntax; for query_analytics use ClickHouse SQL.` },
      { name: 'limit', type: 'number', required: false, description: `Maximum number of records to return per page.` },
    ],
  },
  {
    name: 'clarifymcp_query_data',
    description: `Execute a read-only PostgreSQL query against Clarify CRM data (contacts, companies, deals, etc.).`,
    params: [
      { name: 'entity', type: 'string', required: true, description: `The entity type to operate on (e.g. person, company, deal, or a custom object identifier like c_my_object).` },
      { name: 'sql', type: 'string', required: true, description: `SQL query to execute. For query_data use PostgreSQL syntax; for query_analytics use ClickHouse SQL.` },
      { name: 'limit', type: 'number', required: false, description: `Maximum number of records to return per page.` },
      { name: 'offset', type: 'number', required: false, description: `Number of records to skip for pagination (use with limit).` },
    ],
  },
  {
    name: 'clarifymcp_submit_feedback',
    description: `Submit a feature request or bug report about Clarify MCP tools.`,
    params: [
      { name: 'feedback', type: 'string', required: true, description: `The feature request or feedback message describing what is missing or broken.` },
      { name: 'category', type: 'string', required: false, description: `Category for your feedback. Accepted values: missing_tool, bug, improvement, other.` },
    ],
  },
]
