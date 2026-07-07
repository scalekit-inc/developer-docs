import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'notion_async_task_retrieve',
    description: `Retrieve the status of an asynchronous Notion operation by task ID. Use this to poll long-running operations (such as notion_page_markdown_update when allow_async is set) until status is no longer queued/running/retrying. When complete, the response includes a result object with the operation's outcome.`,
    params: [
      {
        name: 'task_id',
        type: 'string',
        required: true,
        description: `The ID of the async task to retrieve`,
      },
    ],
  },
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
    name: 'notion_comment_delete',
    description: `Delete a Notion comment by its comment_id. This permanently removes the comment from its page or discussion thread.`,
    params: [
      {
        name: 'comment_id',
        type: 'string',
        required: true,
        description: `The ID of the comment to delete (hyphenated UUID).`,
      },
      {
        name: 'notion_version',
        type: 'string',
        required: false,
        description: `Optional override for the Notion-Version header (e.g., 2022-06-28).`,
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
    name: 'notion_comment_update',
    description: `Update the content of an existing Notion comment. Provide comment_id and either a rich_text array (structured Notion rich text) or a markdown string. Only one of rich_text or markdown should be provided; if both are set, rich_text takes precedence.`,
    params: [
      {
        name: 'comment_id',
        type: 'string',
        required: true,
        description: `The ID of the comment to update (hyphenated UUID).`,
      },
      {
        name: 'markdown',
        type: 'string',
        required: false,
        description: `Updated content of the comment as a Markdown string. Supports inline formatting only (bold, italic, strikethrough, code, links), inline equations ($expression$), and mentions. Block-level Markdown (headings, lists, tables, blockquotes) does not render as structured blocks in comments. Provide this OR rich_text, not both.`,
      },
      {
        name: 'notion_version',
        type: 'string',
        required: false,
        description: `Optional override for the Notion-Version header (e.g., 2022-06-28).`,
      },
      {
        name: 'rich_text',
        type: 'array',
        required: false,
        description: `Array of rich text objects representing the updated comment content. Example: [{"type":"text","text":{"content":"Updated comment text"}}]. Provide this OR markdown, not both.`,
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
    name: 'notion_custom_emojis_list',
    description: `List custom emojis available in the Notion workspace. Supports optional exact-name filtering (useful for resolving a custom emoji name to its ID) and pagination via page_size and start_cursor.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `If supplied, filters custom emojis by exact name match. Useful for resolving a custom emoji name to its ID.`,
      },
      {
        name: 'notion_version',
        type: 'string',
        required: false,
        description: `Optional override for the Notion-Version header (e.g., 2022-06-28).`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of custom emojis to return (1–100).`,
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
    name: 'notion_data_source_create',
    description: `Create a new data source (table) within an existing Notion database using the 2025-09-03 API. This is distinct from notion_database_create (legacy POST /v1/databases, which creates a database directly under a page): this endpoint adds a new data source under an existing parent database_id. Provide the parent database_id, a properties schema object defining columns, and optionally a title and icon.`,
    params: [
      {
        name: 'parent_database_id',
        type: 'string',
        required: true,
        description: `The ID of the parent database (with or without dashes) under which this new data source will be created.`,
      },
      {
        name: 'properties',
        type: 'object',
        required: true,
        description: `Data source schema object defining properties (columns). Example: {"Name": {"title": {}}, "Status": {"select": {"options": [{"name": "Todo"}, {"name": "Doing"}, {"name": "Done"}]}}}`,
      },
      {
        name: 'icon',
        type: 'object',
        required: false,
        description: `Icon to set on the new data source.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Title of the new data source as plain text (converted internally to a Notion rich_text array).`,
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
    name: 'notion_data_source_templates_list',
    description: `List the page templates available in a Notion data source. Provide data_source_id (obtain via notion_data_source_fetch). Supports optional name filtering (case-insensitive substring match) and pagination via page_size and start_cursor.`,
    params: [
      {
        name: 'data_source_id',
        type: 'string',
        required: true,
        description: `The ID of the Notion data source to list templates for (hyphenated UUID). Obtain via notion_data_source_fetch.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Filter templates by name using a case-insensitive substring match.`,
      },
      {
        name: 'notion_version',
        type: 'string',
        required: false,
        description: `Optional override for the Notion-Version header (e.g., 2025-09-03).`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of templates to return (1–100).`,
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
    name: 'notion_data_source_update',
    description: `Update a Notion data source's (2025-09-03 API) title, icon, or property schema. A data source is the underlying table/collection of a database; use notion_data_source_fetch to obtain a data_source_id from a database_id. This is the new-style equivalent of notion_database_update for multi-source or synced databases.`,
    params: [
      {
        name: 'data_source_id',
        type: 'string',
        required: true,
        description: `The ID of the data source to update`,
      },
      {
        name: 'icon',
        type: 'object',
        required: false,
        description: `New icon for the data source. Notion icon object (emoji or external URL), or null to remove.`,
      },
      {
        name: 'properties',
        type: 'object',
        required: false,
        description: `Property schema updates (add, rename, or reconfigure columns) as Notion property schema objects, keyed by property name.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `New title for the data source, provided as plain text (converted internally to a Notion rich_text array).`,
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
    name: 'notion_file_upload_create',
    description: `Create a Notion file upload record. This only creates the file_upload object (returning its id, upload_url, and status) — it does NOT send the file's binary content. Use mode 'single_part' for files under 20MB, 'multi_part' for larger files (requires number_of_parts and filename), or 'external_url' to import a publicly accessible file (requires external_url). After creating a single_part or multi_part upload, send the binary content to upload_url via the generic proxy-request mechanism; this tool does not perform that step.`,
    params: [
      {
        name: 'content_type',
        type: 'string',
        required: false,
        description: `MIME type of the file to be created. Recommended when sending the file in multiple parts. Must match the content type of the file that's sent, and the extension of filename if any.`,
      },
      {
        name: 'external_url',
        type: 'string',
        required: false,
        description: `When mode is 'external_url', the HTTPS URL of a publicly accessible file to import into your workspace. Required when mode is external_url.`,
      },
      {
        name: 'filename',
        type: 'string',
        required: false,
        description: `Name of the file to be created. Required when mode is 'multi_part'. Otherwise optional and used to override the filename. Must include an extension, or have one inferred from content_type.`,
      },
      {
        name: 'mode',
        type: 'string',
        required: false,
        description: `How the file is being sent. Use 'multi_part' for files larger than 20MB. Use 'external_url' for files that are temporarily hosted publicly elsewhere. Default is 'single_part'.`,
      },
      {
        name: 'notion_version',
        type: 'string',
        required: false,
        description: `Optional override for the Notion-Version header (e.g., 2022-06-28).`,
      },
      {
        name: 'number_of_parts',
        type: 'integer',
        required: false,
        description: `When mode is 'multi_part', the number of parts you are uploading. This must match the number of parts as well as the final part_number you send. Required when mode is multi_part.`,
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
    name: 'notion_file_upload_list',
    description: `List file upload objects for the workspace. Supports optional filtering by status (pending, uploaded, expired, failed) and pagination via page_size and start_cursor.`,
    params: [
      {
        name: 'notion_version',
        type: 'string',
        required: false,
        description: `Optional override for the Notion-Version header (e.g., 2022-06-28).`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of file uploads to return (1–100).`,
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
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter file uploads by status.`,
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
    name: 'notion_file_upload_retrieve',
    description: `Retrieve a single Notion file upload object by its file_upload_id, including its status (pending, uploaded, expired, failed), upload_url, and file metadata.`,
    params: [
      {
        name: 'file_upload_id',
        type: 'string',
        required: true,
        description: `Identifier for the Notion file upload object to retrieve (hyphenated UUID). Obtain it from a prior notion_file_upload_create or notion_file_upload_list call.`,
      },
      {
        name: 'notion_version',
        type: 'string',
        required: false,
        description: `Optional override for the Notion-Version header (e.g., 2022-06-28).`,
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
    name: 'notion_meeting_notes_query',
    description: `Query Notion meeting notes blocks using filter, sort, and limit options. Filter supports combinator nodes ({operator: 'and'|'or', filters: [...]}) nested with property filters ({property, filter: {operator, value}}) on fields like title and attendees. Sort accepts an array of {property, direction} pairs where property is one of title, attendees, created_time, created_by, last_edited_time, last_edited_by. Limit caps the number of results (1-50, default 50).`,
    params: [
      {
        name: 'filter',
        type: 'object',
        required: false,
        description: `Filter object for meeting notes. Top-level shape is a combinator: {operator: 'and'|'or', filters: [...]}, where each entry in filters is either a nested combinator or a property filter of the form {property: 'title'|'attendees'|..., filter: {operator: '<op>', value: <value>}}. Example: {"operator":"and","filters":[{"property":"title","filter":{"operator":"string_contains","value":{"type":"exact","value":"Weekly sync"}}},{"property":"attendees","filter":{"operator":"is_not_empty"}}]}`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return (1–50). Defaults to 50.`,
      },
      {
        name: 'notion_version',
        type: 'string',
        required: false,
        description: `Optional override for the Notion-Version header (e.g., 2022-06-28).`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Internal override for schema version.`,
      },
      {
        name: 'sort',
        type: 'array',
        required: false,
        description: `Sort order for the results. Each entry specifies a property (title, attendees, created_time, created_by, last_edited_time, last_edited_by) and a direction (ascending or descending).`,
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
    name: 'notion_page_markdown_get',
    description: `Retrieve a Notion page's content rendered as enhanced Markdown. Returns the markdown string along with a truncated flag (true if content exceeded the record count limit) and any unknown_block_ids that could not be resolved inline.`,
    params: [
      {
        name: 'page_id',
        type: 'string',
        required: true,
        description: `The ID of the Notion page to retrieve as markdown`,
      },
      {
        name: 'include_transcript',
        type: 'boolean',
        required: false,
        description: `Whether to include full meeting note transcripts in the markdown. Defaults to false, showing a placeholder with the meeting note URL instead.`,
      },
    ],
  },
  {
    name: 'notion_page_markdown_update',
    description: `Update a Notion page's content using enhanced Markdown edit operations. Choose one operation_type: 'update_content' (search-and-replace one or more old_str/new_str pairs — recommended for targeted edits), 'replace_content' (overwrite the entire page body with new_str), 'insert_content' (deprecated — insert markdown at start, end, or after a text selection), or 'replace_content_range' (deprecated — replace a selected text range). Operations that could delete child pages or databases require allow_deleting_content=true. If allow_async is set to true, the API may accept the request and process it in the background, returning an async_task object instead of the updated page_markdown — poll notion_async_task_retrieve with the returned task id until it completes.`,
    params: [
      {
        name: 'operation_type',
        type: 'string',
        required: true,
        description: `Which markdown edit operation to perform on the page.`,
      },
      {
        name: 'page_id',
        type: 'string',
        required: true,
        description: `The ID of the Notion page whose markdown content to update`,
      },
      {
        name: 'allow_async',
        type: 'boolean',
        required: false,
        description: `Set to true to opt into receiving an async_task result when this update is accepted for background execution.`,
      },
      {
        name: 'allow_deleting_content',
        type: 'boolean',
        required: false,
        description: `Set to true to allow this operation to delete child pages or databases as part of the edit. Applies to replace_content, replace_content_range, and update_content operations.`,
      },
      {
        name: 'content_range',
        type: 'string',
        required: false,
        description: `For operation_type=replace_content_range only (deprecated): selection of existing content to replace, using the ellipsis format ("start text...end text"). Required for this operation type.`,
      },
      {
        name: 'content_updates',
        type: 'array',
        required: false,
        description: `For operation_type=update_content only: array of search-and-replace operations, each with old_str (must exactly match existing content), new_str (replacement), and optional replace_all_matches (defaults to false; if false, the operation fails when old_str matches more than once). Required for this operation type. Maximum 100 items.`,
      },
      {
        name: 'insert_after',
        type: 'string',
        required: false,
        description: `For operation_type=insert_content only: selection of existing content to insert after, using the ellipsis format ("start text...end text"). Omit to append at the end of the page. Do not combine with insert_position.`,
      },
      {
        name: 'insert_position',
        type: 'string',
        required: false,
        description: `For operation_type=insert_content only: explicit position for inserted content, either 'start' or 'end'. Cannot be combined with insert_after.`,
      },
      {
        name: 'markdown_content',
        type: 'string',
        required: false,
        description: `The enhanced markdown content for this operation. For insert_content this is the content to insert; for replace_content_range this is the replacement for the matched range; for replace_content this is the full new page body. Not used for update_content (use content_updates instead).`,
      },
    ],
  },
  {
    name: 'notion_page_move',
    description: `Move a Notion page to a new parent, either another page or a data source (database collection). Provide exactly one of new_parent_page_id or new_parent_data_source_id to specify the destination.`,
    params: [
      {
        name: 'page_id',
        type: 'string',
        required: true,
        description: `The ID of the Notion page to move`,
      },
      {
        name: 'new_parent_data_source_id',
        type: 'string',
        required: false,
        description: `The ID of the destination data source (database collection) to move the page into, with or without dashes. Do not provide new_parent_page_id if this is set.`,
      },
      {
        name: 'new_parent_page_id',
        type: 'string',
        required: false,
        description: `The ID of the destination parent page to move the page under, with or without dashes. Do not provide new_parent_data_source_id if this is set.`,
      },
    ],
  },
  {
    name: 'notion_page_property_retrieve',
    description: `Retrieve a single property value from a Notion page by property ID. For properties that hold multiple values (e.g. relation, rollup, or people properties that don't fit in a single response), the result is paginated using start_cursor and page_size.`,
    params: [
      {
        name: 'page_id',
        type: 'string',
        required: true,
        description: `The ID of the Notion page containing the property`,
      },
      {
        name: 'property_id',
        type: 'string',
        required: true,
        description: `The ID of the property to retrieve`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of property items to return for paginated properties (e.g. relation, rollup).`,
      },
      {
        name: 'start_cursor',
        type: 'string',
        required: false,
        description: `Cursor to fetch the next page of a paginated property value.`,
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
    name: 'notion_user_get',
    description: `Retrieve a specific Notion user (person or bot) by their user ID. Returns the user's name, avatar, type, and (for person users) email if the integration has user information access.`,
    params: [
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `The ID of the Notion user to retrieve`,
      },
    ],
  },
  {
    name: 'notion_user_get_self',
    description: `Retrieve the bot user associated with this integration's access token. Useful for confirming which workspace and identity the current Notion connection is authenticated as. No parameters required.`,
    params: [],
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
  {
    name: 'notion_view_create',
    description: `Create a new view over a Notion data source (e.g. table, board, list, calendar, timeline, gallery, form, chart, map, dashboard). Requires data_source_id, name, and type. Provide exactly one of database_id, view_id, or create_database to place the new view: database_id creates a tab on an existing database, view_id adds the view as a widget on a dashboard view, create_database creates a new linked database block on a page. Optional filter, sorts, quick_filters, and configuration objects use the same shapes as the data source query API.`,
    params: [
      {
        name: 'data_source_id',
        type: 'string',
        required: true,
        description: `The ID of the data source this view should be scoped to.`,
      },
      { name: 'name', type: 'string', required: true, description: `The name of the view.` },
      { name: 'type', type: 'string', required: true, description: `The type of view to create.` },
      {
        name: 'configuration',
        type: 'object',
        required: false,
        description: `View presentation configuration object. The type field within must match the view's type (e.g. {"type": "table", ...}).`,
      },
      {
        name: 'create_database',
        type: 'object',
        required: false,
        description: `Create a new linked database block on a page and add the view to it. Mutually exclusive with database_id and view_id.`,
      },
      {
        name: 'database_id',
        type: 'string',
        required: false,
        description: `The ID of the database to create a view (tab) in. Mutually exclusive with view_id and create_database.`,
      },
      {
        name: 'filter',
        type: 'object',
        required: false,
        description: `Filter to apply to the view. Uses the same format as the data source query filter.`,
      },
      {
        name: 'placement',
        type: 'object',
        required: false,
        description: `Where to place the new widget in a dashboard view. Only applicable when view_id is provided. Defaults to creating a new row at the end.`,
      },
      {
        name: 'position',
        type: 'object',
        required: false,
        description: `Where to place the new view in the database's view tab bar. Only applicable when database_id is provided. Defaults to "end" (append).`,
      },
      {
        name: 'quick_filters',
        type: 'object',
        required: false,
        description: `Quick filters to pin in the view's filter bar. Keys are property names or IDs. Values are filter conditions (same shape as a property filter but without the property field).`,
      },
      {
        name: 'sorts',
        type: 'array',
        required: false,
        description: `Sorts to apply to the view. Uses the same format as the data source query sorts.`,
      },
    ],
  },
  {
    name: 'notion_view_delete',
    description: `Delete a Notion view by its ID. This removes the saved view (table, board, list, calendar, timeline, gallery, form, chart, map, or dashboard widget) permanently.`,
    params: [
      {
        name: 'view_id',
        type: 'string',
        required: true,
        description: `ID of a Notion view to delete.`,
      },
    ],
  },
  {
    name: 'notion_view_list',
    description: `List views for a Notion database or data source. Views represent saved presentations (table, board, list, calendar, timeline, gallery, form, chart, map, dashboard) over a data source. Provide at least one of database_id or data_source_id. Supports cursor-based pagination via start_cursor and page_size.`,
    params: [
      {
        name: 'data_source_id',
        type: 'string',
        required: false,
        description: `ID of a data source to list all views for, including linked views across the workspace. At least one of database_id or data_source_id is required.`,
      },
      {
        name: 'database_id',
        type: 'string',
        required: false,
        description: `ID of a Notion database to list views for. At least one of database_id or data_source_id is required.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `The number of items from the full list desired in the response. Maximum: 100.`,
      },
      {
        name: 'start_cursor',
        type: 'string',
        required: false,
        description: `If supplied, this endpoint will return a page of results starting after the cursor provided.`,
      },
    ],
  },
  {
    name: 'notion_view_query_create',
    description: `Execute a view's underlying query and cache the results server-side, returning a query_id and the first page of results. Use notion_view_query_results_get with the returned view_id and query_id to retrieve subsequent pages while the cached results remain valid (see expires_at in the response). If the data source has more rows than the server-side pagination depth limit allows, request_status will indicate an incomplete result.`,
    params: [
      {
        name: 'view_id',
        type: 'string',
        required: true,
        description: `The ID of the view to query.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `The number of results to return per page. Maximum: 100.`,
      },
    ],
  },
  {
    name: 'notion_view_query_delete',
    description: `Delete a cached view query and its results by view_id and query_id. Use this to release server-side cached results once you are done polling them.`,
    params: [
      {
        name: 'query_id',
        type: 'string',
        required: true,
        description: `The ID of the query to delete.`,
      },
      {
        name: 'view_id',
        type: 'string',
        required: true,
        description: `The ID of the view the query was executed against.`,
      },
    ],
  },
  {
    name: 'notion_view_query_results_get',
    description: `Retrieve cached results for a previously created view query, identified by view_id and query_id (from notion_view_query_create). Supports cursor-based pagination via start_cursor and page_size to page through the full result set while the cached query remains valid.`,
    params: [
      {
        name: 'query_id',
        type: 'string',
        required: true,
        description: `The ID of the query to fetch results for.`,
      },
      {
        name: 'view_id',
        type: 'string',
        required: true,
        description: `The ID of the view the query was executed against.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `The number of results to return per page. Maximum: 100.`,
      },
      {
        name: 'start_cursor',
        type: 'string',
        required: false,
        description: `If supplied, this endpoint will return a page of results starting after the cursor provided.`,
      },
    ],
  },
  {
    name: 'notion_view_retrieve',
    description: `Retrieve a Notion view by its ID. Returns the view's configuration, filter, sorts, quick filters, and metadata.`,
    params: [
      { name: 'view_id', type: 'string', required: true, description: `ID of a Notion view.` },
    ],
  },
  {
    name: 'notion_view_update',
    description: `Update a Notion view's name, filter, sorts, quick filters, or configuration. Pass filter, sorts, or a quick_filters entry as null to clear that setting; only property-based sorts are supported for updates (timestamp sorts are not). Only the fields you provide are changed; omitted fields are left as-is.`,
    params: [
      { name: 'view_id', type: 'string', required: true, description: `ID of a Notion view.` },
      {
        name: 'configuration',
        type: 'object',
        required: false,
        description: `View presentation configuration object. The type field within must match the view's type. Individual nullable fields within the configuration can be set to null to clear them.`,
      },
      {
        name: 'filter',
        type: 'object',
        required: false,
        description: `Filter to apply to the view. Uses the same format as the data source query filter. Pass null to clear the filter.`,
      },
      { name: 'name', type: 'string', required: false, description: `New name for the view.` },
      {
        name: 'quick_filters',
        type: 'object',
        required: false,
        description: `Quick filters for the view's filter bar. Keys are property names or IDs. Set a key to a filter condition to add/update that quick filter. Set a key to null to remove it. Pass null for the entire field to clear all quick filters. Unmentioned quick filters are preserved.`,
      },
      {
        name: 'sorts',
        type: 'array',
        required: false,
        description: `Property sorts to apply to the view. Only property-based sorts are supported (timestamp sorts are not). Pass null to clear the sorts.`,
      },
    ],
  },
]
