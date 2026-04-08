import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'notion_block_delete',
    description: `Delete (archive) a Notion block by its ID. This also deletes all child blocks within it.`,
    params: [
      {
        name: 'block_id',
        type: 'string',
        required: true,
        description: `The ID of the block to delete`,
      },
    ],
  },
  {
    name: 'notion_block_update',
    description: `Update the text content of an existing Notion block. Supports paragraph, heading, list item, quote, callout, and code blocks.`,
    params: [
      {
        name: 'block_id',
        type: 'string',
        required: true,
        description: `The ID of the block to update`,
      },
      {
        name: 'text',
        type: 'string',
        required: true,
        description: `New text content for the block`,
      },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `The block type (must match the existing block type)`,
      },
      {
        name: 'language',
        type: 'string',
        required: false,
        description: `Programming language for code blocks`,
      },
    ],
  },
  {
    name: 'notion_comment_create',
    description: `Create a comment in Notion. Provide a comment object with rich_text content and either a parent object (with page_id) for a page-level comment or a discussion_id to reply in an existing thread.`,
    params: [
      {
        name: 'comment',
        type: 'object',
        required: true,
        description: `Comment object containing a rich_text array. Example: {"rich_text":[{"type":"text","text":{"content":"Hello"}}]}`,
      },
      {
        name: 'discussion_id',
        type: 'string',
        required: false,
        description: `Existing discussion thread ID to reply to.`,
      },
      {
        name: 'notion_version',
        type: 'string',
        required: false,
        description: `Optional override for the Notion-Version header (e.g., 2022-06-28).`,
      },
      {
        name: 'parent',
        type: 'object',
        required: false,
        description: `Parent object for a new top-level comment. Shape: {"page_id":"<uuid>"}.`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Internal override for schema version.`,
      },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Internal override for tool implementation version.`,
      },
    ],
  },
  {
    name: 'notion_comment_retrieve',
    description: `Retrieve a single Notion comment by its \`comment_id\`. LLM tip: you typically obtain \`comment_id\` from the response of creating a comment or by first listing comments for a page/block and selecting the desired item’s \`id\`.`,
    params: [
      {
        name: 'comment_id',
        type: 'string',
        required: true,
        description: `The identifier of the comment to retrieve (hyphenated UUID). Obtain it from Create-Comment responses or from a prior List-Comments call.`,
      },
      {
        name: 'notion_version',
        type: 'string',
        required: false,
        description: `Optional Notion-Version header override (e.g., 2022-06-28).`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Internal override for schema version.`,
      },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Internal override for tool implementation version.`,
      },
    ],
  },
  {
    name: 'notion_comments_fetch',
    description: `Fetch comments for a given Notion block. Provide a \`block_id\` (the target page/block ID, hyphenated UUID). Supports pagination via \`start_cursor\` and \`page_size\` (1–100). LLM tip: extract \`block_id\` from a Notion URL’s trailing 32-char id, then insert hyphens (8-4-4-4-12).`,
    params: [
      {
        name: 'block_id',
        type: 'string',
        required: true,
        description: `Target Notion block (or page) ID to fetch comments for. Use a hyphenated UUID.`,
      },
      {
        name: 'notion_version',
        type: 'string',
        required: false,
        description: `Optional Notion-Version header override (e.g., 2022-06-28).`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of comments to return (1–100).`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Internal override for schema version.`,
      },
      {
        name: 'start_cursor',
        type: 'string',
        required: false,
        description: `Cursor to fetch the next page of results.`,
      },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Internal override for tool implementation version.`,
      },
    ],
  },
  {
    name: 'notion_data_fetch',
    description: `Fetch data from Notion using the workspace search API (/search). Supports pagination via start_cursor.`,
    params: [
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Max number of results to return (1–100)`,
      },
      { name: 'query', type: 'string', required: false, description: `Text query used by /search` },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Optional schema version to use for tool execution`,
      },
      {
        name: 'start_cursor',
        type: 'string',
        required: false,
        description: `Cursor for pagination; pass the previous response's next_cursor`,
      },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Optional tool version to use for execution`,
      },
    ],
  },
  {
    name: 'notion_data_source_fetch',
    description: `Retrieve a Notion database's schema, title, and properties using the Notion 2025-09-03 API. Unlike notion_database_fetch, this returns a data_sources array — each entry contains a data_source_id required by notion_data_source_query and notion_data_source_insert_row. Use this as the first step when working with merged, synced, or multi-source databases. For standard single-source databases, notion_database_fetch is sufficient. LLM guidance: extract data_sources[0].id (or the relevant source) from the response and pass it to the query or insert tools.`,
    params: [
      {
        name: 'database_id',
        type: 'string',
        required: true,
        description: `The target database ID in UUID format with hyphens.`,
      },
    ],
  },
  {
    name: 'notion_data_source_insert_row',
    description: `Create a new row (page) in a Notion data source using the 2025-09-03 API. Required for merged, synced, or multi-source databases — these require parent.data_source_id instead of parent.database_id which the older notion_database_insert_row uses. Provide the data_source_id from notion_data_source_fetch (data_sources[].id) and a properties object mapping column names to Notion property value shapes. Optionally attach child blocks (page content), an icon, or a cover image. LLM guidance: step 1 — call notion_data_source_fetch to get the data_source_id; step 2 — build the properties object using exact column names from the schema (use 'title' key for title-type fields); step 3 — call this tool.`,
    params: [
      {
        name: 'data_source_id',
        type: 'string',
        required: true,
        description: `The ID of the data source to insert a row into. Retrieve from notion_database_fetch response under data_sources[].id.`,
      },
      {
        name: 'properties',
        type: 'object',
        required: true,
        description: `Object mapping column names (or property ids) to property values. Example: {"title": {"title": [{"text": {"content": "Task A"}}]}, "Status": {"select": {"name": "Todo"}}}`,
      },
      {
        name: 'child_blocks',
        type: 'array',
        required: false,
        description: `Optional array of Notion blocks to append as page content.`,
      },
      {
        name: 'cover',
        type: 'object',
        required: false,
        description: `Optional page cover object. Example: {"type":"external","external":{"url":"https://example.com/cover.jpg"}}`,
      },
      {
        name: 'icon',
        type: 'object',
        required: false,
        description: `Optional page icon object. Example: {"type":"emoji","emoji":"📝"}`,
      },
    ],
  },
  {
    name: 'notion_data_source_query',
    description: `Query rows (pages) from a Notion data source using the 2025-09-03 API. Required for merged, synced, or multi-source databases — these cannot be queried via notion_database_query as that tool uses the older /databases/{id}/query endpoint which does not support multiple data sources. Provide the data_source_id obtained from notion_data_source_fetch (data_sources[].id). Supports filtering by property values, sorting, and cursor-based pagination. LLM guidance: step 1 — call notion_data_source_fetch with the database_id to retrieve the data_source_id; step 2 — pass that id here along with an optional filter, sorts, and page_size.`,
    params: [
      {
        name: 'data_source_id',
        type: 'string',
        required: true,
        description: `The ID of the data source to query. Retrieve from notion_database_fetch response under data_sources[].id.`,
      },
      {
        name: 'filter',
        type: 'object',
        required: false,
        description: `Notion filter object to narrow results. Example: {"property": "Status", "select": {"equals": "Done"}}. Supports compound filters with 'and'/'or' arrays.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of rows to return (1-100).`,
      },
      {
        name: 'sorts',
        type: 'array',
        required: false,
        description: `Order the results. Each item must include either property or timestamp, plus direction.`,
      },
      {
        name: 'start_cursor',
        type: 'string',
        required: false,
        description: `Cursor to fetch the next page of results.`,
      },
    ],
  },
  {
    name: 'notion_database_create',
    description: `Create a new database in Notion under a parent page. Provide a parent object with page_id, a database title (rich_text array), and a properties object that defines the database schema (columns).`,
    params: [
      {
        name: 'parent',
        type: 'object',
        required: true,
        description: `Parent object specifying the page under which the database is created. Example: {"page_id": "2561ab6c-418b-8072-beec-c4779fa811cf"}`,
      },
      {
        name: 'properties',
        type: 'object',
        required: true,
        description: `Database schema object defining properties (columns). Example: {"Name": {"title": {}}, "Status": {"select": {"options": [{"name": "Todo"}, {"name": "Doing"}, {"name": "Done"}]}}}`,
      },
      {
        name: 'title',
        type: 'array',
        required: true,
        description: `Database title as a Notion rich_text array.`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Internal override for schema version.`,
      },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Internal override for tool implementation version.`,
      },
    ],
  },
  {
    name: 'notion_database_fetch',
    description: `Retrieve a Notion database's full definition, including title, properties, and schema. Required: database_id (hyphenated UUID). LLM tip: Extract the last 32 characters from a Notion database URL, then insert hyphens (8-4-4-4-12).`,
    params: [
      {
        name: 'database_id',
        type: 'string',
        required: true,
        description: `The target database ID in UUID format with hyphens.`,
      },
    ],
  },
  {
    name: 'notion_database_insert_row',
    description: `Insert a new row (page) into a Notion database. Required: \`database_id\` (hyphenated UUID) and \`properties\` (object mapping database column names to Notion **property values**). Optional: \`child_blocks\` (content blocks), \`icon\` (page icon object), and \`cover\` (page cover object).

LLM guidance:
- \`properties\` must use **property values** (not schema). Example:
  {
    "title": { "title": [ { "text": { "content": "Task A" } } ] },
    "Status": { "select": { "name": "Todo" } },
    "Due": { "date": { "start": "2025-09-01" } }
  }
- Use the **exact property key** as defined in the database (case‑sensitive), or the property **id\`.
- \`icon\` example (emoji): {"type":"emoji","emoji":"📝"}
- \`cover\` example (external): {"type":"external","external":{"url":"https://example.com/image.jpg"}}
- Runtime note: the executor/host should synthesize \`parent = {"database_id": database_id}\` before sending to Notion.`,
    params: [
      {
        name: 'database_id',
        type: 'string',
        required: true,
        description: `Target database ID (hyphenated UUID).`,
      },
      {
        name: 'properties',
        type: 'object',
        required: true,
        description: `Object mapping **column names (or property ids)** to **property values**.

️ **CRITICAL: Property Identification Rules:**
- For title fields: ALWAYS use 'title' as the property key (not 'Name' or display names)
- For other properties: Use exact property names from database schema (case-sensitive)
- DO NOT use URL-encoded property IDs with special characters

 **Recommended Workflow:**
1. Call fetch_database first to see exact property names
2. Use 'title' for title-type properties
3. Match other property names exactly as shown in schema

Example:
{
  "title": { "title": [ { "text": { "content": "Task A" } } ] },
  "Status": { "select": { "name": "Todo" } },
  "Due": { "date": { "start": "2025-09-01" } }
}`,
      },
      {
        name: '_parent',
        type: 'object',
        required: false,
        description: `Computed by host: \`{ "database_id": "<database_id>" }\`. Do not supply manually.`,
      },
      {
        name: 'child_blocks',
        type: 'array',
        required: false,
        description: `Optional array of Notion blocks to append as page content (paragraph, heading, to_do, etc.).`,
      },
      {
        name: 'cover',
        type: 'object',
        required: false,
        description: `Optional page cover object. Example external: {"type":"external","external":{"url":"https://example.com/cover.jpg"}}.`,
      },
      {
        name: 'icon',
        type: 'object',
        required: false,
        description: `Optional page icon object. Examples: {"type":"emoji","emoji":"📝"} or {"type":"external","external":{"url":"https://..."}}.`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Optional schema version override.`,
      },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Optional tool version override.`,
      },
    ],
  },
  {
    name: 'notion_database_property_retrieve',
    description: `Query a Notion database and return only specific properties by supplying one or more property IDs. Use when you need page rows but want to limit the returned properties to reduce payload. Provide the database_id and an array of filter_properties (each item is a property id like "title")`,
    params: [
      {
        name: 'database_id',
        type: 'string',
        required: true,
        description: `Target database ID (hyphenated UUID).`,
      },
      {
        name: 'property_id',
        type: 'string',
        required: false,
        description: `property ID to filter results by a specific property. get the property id by querying database.`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Optional schema version override.`,
      },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Optional tool version override.`,
      },
    ],
  },
  {
    name: 'notion_database_query',
    description: `Query a Notion database for rows (pages) using the 2022-06-28 API. Works for standard single-source databases. NOTE: If you encounter an 'Invalid request URL' error or are working with a merged, synced, or multi-source database, use the newer data source tools instead — call notion_data_source_fetch with the database_id to get the data_source_id, then call notion_data_source_query with that id. Provide database_id (hyphenated UUID). Optional: filter (Notion filter object), page_size (default 10), start_cursor for pagination, and sorts. LLM guidance: extract the last 32 characters from a Notion database URL and insert hyphens (8-4-4-4-12) to form database_id. Sort rules: each sort item MUST include either property OR timestamp (last_edited_time/created_time), not both.`,
    params: [
      {
        name: 'database_id',
        type: 'string',
        required: true,
        description: `Target database ID (hyphenated UUID).`,
      },
      {
        name: 'filter',
        type: 'object',
        required: false,
        description: `Notion filter object to narrow results. Example: {"property": "Status", "select": {"equals": "Done"}}. Supports compound filters with 'and'/'or' arrays.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of rows to return (1–100).`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Optional schema version override.`,
      },
      {
        name: 'sorts',
        type: 'array',
        required: false,
        description: `Order the results. Each item must include either property or timestamp, plus direction.`,
      },
      {
        name: 'start_cursor',
        type: 'string',
        required: false,
        description: `Cursor to fetch the next page of results.`,
      },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Optional tool version override.`,
      },
    ],
  },
  {
    name: 'notion_database_update',
    description: `Update a Notion database's title, description, or property schema.`,
    params: [
      {
        name: 'database_id',
        type: 'string',
        required: true,
        description: `The ID of the database to update`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New description for the database`,
      },
      {
        name: 'properties',
        type: 'object',
        required: false,
        description: `Property schema updates (add, rename, or reconfigure columns)`,
      },
      { name: 'title', type: 'string', required: false, description: `New title for the database` },
    ],
  },
  {
    name: 'notion_page_content_append',
    description: `Append blocks to a Notion page or block. IMPORTANT: This tool uses a simplified block format — do NOT pass raw Notion API block objects. Each block takes a 'type' and a 'text' string (plain text only). The tool internally converts these into the Notion API format. Supported types: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, code, quote, callout, divider. For code blocks, add a 'language' field. Dividers require only the 'type' field. Example: [{"type": "heading_1", "text": "My Title"}, {"type": "paragraph", "text": "Some content"}, {"type": "code", "text": "print('hi')", "language": "python"}, {"type": "divider"}].`,
    params: [
      {
        name: 'block_id',
        type: 'string',
        required: true,
        description: `The ID of the page or block to append content to`,
      },
      {
        name: 'blocks',
        type: 'array',
        required: true,
        description: `Array of blocks to append. Each block uses a simplified format with 'type' and 'text' fields — NOT the raw Notion API format. Do not pass Notion block objects with rich_text arrays.`,
      },
    ],
  },
  {
    name: 'notion_page_content_get',
    description: `Retrieve the content (blocks) of a Notion page or block. Returns all child blocks with their type and text content.`,
    params: [
      {
        name: 'block_id',
        type: 'string',
        required: true,
        description: `The ID of the page or block whose children to retrieve`,
      },
      {
        name: 'page_size',
        type: 'number',
        required: false,
        description: `Number of blocks to return (max 100)`,
      },
      {
        name: 'start_cursor',
        type: 'string',
        required: false,
        description: `Cursor for pagination from a previous response`,
      },
    ],
  },
  {
    name: 'notion_page_create',
    description: `Create a page in Notion either inside a database (as a row) or as a child of a page. Use exactly one parent mode: provide database_id to create a database row (page with properties) OR provide parent_page_id to create a child page. When creating in a database, properties must use Notion property value shapes and the title property key must be "title" (not the display name). Children (content blocks), icon, and cover are optional. The executor should synthesize the Notion parent object from the chosen parent input.

Target rules:
- Use database_id OR parent_page_id (not both)
- If database_id is provided → properties are required
- If parent_page_id is provided → properties are optional`,
    params: [
      {
        name: '_parent',
        type: 'object',
        required: false,
        description: `Computed by the executor: {"database_id": "..."} OR {"page_id": "..."} derived from database_id/parent_page_id.`,
      },
      {
        name: 'child_blocks',
        type: 'array',
        required: false,
        description: `Optional blocks to add as page content (children).`,
      },
      {
        name: 'cover',
        type: 'object',
        required: false,
        description: `Optional page cover object.`,
      },
      {
        name: 'database_id',
        type: 'string',
        required: false,
        description: `Create a page as a new row in this database (hyphenated UUID). Extract from the database URL (last 32 chars → hyphenate 8-4-4-4-12).`,
      },
      { name: 'icon', type: 'object', required: false, description: `Optional page icon object.` },
      {
        name: 'notion_version',
        type: 'string',
        required: false,
        description: `Optional Notion-Version header override.`,
      },
      {
        name: 'parent_page_id',
        type: 'string',
        required: false,
        description: `Create a child page under this page (hyphenated UUID). Extract from the parent page URL.`,
      },
      {
        name: 'properties',
        type: 'object',
        required: false,
        description: `For database rows, supply property values keyed by property name (or id). For title properties, the key must be "title".

Example (database row):
{
  "title": { "title": [ { "text": { "content": "Task A" } } ] },
  "Status": { "select": { "name": "Todo" } },
  "Due": { "date": { "start": "2025-09-01" } }
}`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Optional schema version override.`,
      },
      {
        name: 'tool_version',
        type: 'string',
        required: false,
        description: `Optional tool version override.`,
      },
    ],
  },
  {
    name: 'notion_page_get',
    description: `Retrieve a Notion page by its ID. Returns the page properties, metadata, and parent information.`,
    params: [
      {
        name: 'page_id',
        type: 'string',
        required: true,
        description: `The ID of the Notion page to retrieve`,
      },
    ],
  },
  {
    name: 'notion_page_search',
    description: `Search Notion pages by text query. Returns matching pages with their titles, IDs, and metadata. Optionally sort by last_edited_time or created_time, and paginate with start_cursor.`,
    params: [
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of pages to return (1–100).`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Text to search for across Notion pages.`,
      },
      {
        name: 'sort_direction',
        type: 'string',
        required: false,
        description: `Direction to sort results.`,
      },
      {
        name: 'sort_timestamp',
        type: 'string',
        required: false,
        description: `Timestamp field to sort results by.`,
      },
      {
        name: 'start_cursor',
        type: 'string',
        required: false,
        description: `Cursor to fetch the next page of results.`,
      },
    ],
  },
  {
    name: 'notion_page_update',
    description: `Update a Notion page's properties, archive/unarchive it, or change its icon and cover.`,
    params: [
      {
        name: 'page_id',
        type: 'string',
        required: true,
        description: `The ID of the Notion page to update`,
      },
      {
        name: 'archived',
        type: 'boolean',
        required: false,
        description: `Set to true to archive (delete) the page, false to unarchive it`,
      },
      { name: 'cover', type: 'object', required: false, description: `Page cover image to set` },
      { name: 'icon', type: 'object', required: false, description: `Page icon to set` },
      {
        name: 'properties',
        type: 'object',
        required: false,
        description: `Page properties to update using Notion property value shapes`,
      },
    ],
  },
  {
    name: 'notion_user_list',
    description: `List all users in the Notion workspace including people and bots.`,
    params: [
      {
        name: 'page_size',
        type: 'number',
        required: false,
        description: `Number of users to return (max 100)`,
      },
      {
        name: 'start_cursor',
        type: 'string',
        required: false,
        description: `Cursor for pagination from a previous response`,
      },
    ],
  },
]
