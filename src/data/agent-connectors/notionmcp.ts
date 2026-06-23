import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'notionmcp_notion-create-comment',
    description: `Add a comment to a Notion page or inline discussion thread.`,
    params: [
      { name: 'page_id', type: 'string', required: true, description: `The ID of the page to comment on (with or without dashes).` },
      { name: 'discussion_id', type: 'string', required: false, description: `The ID or URL of an existing discussion to reply to (e.g., discussion://pageId/blockId/discussionId).` },
      { name: 'markdown', type: 'string', required: false, description: `The content of the comment as a Markdown string. Provide exactly one of markdown or rich_text. For exact syntax, read the MCP resource notion://docs/enhanced-markdown-spec through your MCP client's resource-reading interface. Do not pass this URI to the Notion fetch tool or any URL-fetching tool, and use only the Rich text types and Mentions syntax that comments support. Comments support inline formatting (bold, italic, strikethrough, underline, code, links), inline math using $\`Equation\`$, and user/page/database/date mention tags such as <mention-date start="YYYY-MM-DD"/>. Do not use UI shortcuts like @today, @name, [[page]], or autocomplete-style emoji syntax; those are editor affordances, not markdown syntax. Mention tags must include a real url where required by the spec. Block-level Markdown such as fenced code blocks, headings, lists, tables, and blockquotes is stored as plain comment text rather than rendered as blocks.` },
      { name: 'rich_text', type: 'array', required: false, description: `An array of rich text objects that represent the content of the comment. Provide exactly one of rich_text or markdown.` },
      { name: 'selection_with_ellipsis', type: 'string', required: false, description: `Unique start and end snippet of the content to comment on. DO NOT provide the entire string. Instead, provide up to the first ~10 characters, an ellipsis, and then up to the last ~10 characters. Make sure you provide enough of the start and end snippet to uniquely identify the content. For example: "# Section heading...last paragraph."` },
    ],
  },
  {
    name: 'notionmcp_notion-create-database',
    description: `Create a new Notion database using a SQL DDL schema definition.`,
    params: [
      { name: 'schema', type: 'string', required: true, description: `SQL DDL CREATE TABLE statement defining the database schema. Column names must be double-quoted, type options use single quotes.` },
      { name: 'description', type: 'string', required: false, description: `The description of the new database.` },
      { name: 'parent', type: 'object', required: false, description: `The parent under which to create the new database. If omitted, the database will be created as a private page at the workspace level.` },
      { name: 'title', type: 'string', required: false, description: `The title of the new database.` },
    ],
  },
  {
    name: 'notionmcp_notion-create-pages',
    description: `Create one or more Notion pages with properties and Markdown content.`,
    params: [
      { name: 'pages', type: 'array', required: true, description: `The pages to create.` },
      { name: 'parent', type: 'string', required: false, description: `The parent under which the new pages will be created. This can be a page (page_id), a database page (database_id), or a data source/collection under a database (data_source_id). If omitted, the new pages will be created as private pages at the workspace level. Use data_source_id when you have a collection:// URL from the fetch tool.` },
    ],
  },
  {
    name: 'notionmcp_notion-create-view',
    description: `Create a new view on a Notion database with optional filters and sorts.`,
    params: [
      { name: 'data_source_id', type: 'string', required: true, description: `The data source (collection) ID. Accepts a collection:// URI from <data-source> tags or a bare UUID.` },
      { name: 'name', type: 'string', required: true, description: `The name of the view.` },
      { name: 'type', type: 'string', required: true, description: `The view type. Accepted values: table, board, calendar, gallery, list, timeline.` },
      { name: 'configure', type: 'string', required: false, description: `View configuration DSL string. Supports FILTER, SORT BY, GROUP BY, CALENDAR BY, TIMELINE BY, MAP BY, CHART, FORM, SHOW, HIDE, COVER, WRAP CELLS, and FREEZE COLUMNS directives. See notion://docs/view-dsl-spec.` },
      { name: 'database_id', type: 'string', required: false, description: `The database to add a view tab to. Accepts a Notion URL or a bare UUID. Mutually exclusive with \`parent_page_id\`; exactly one must be provided.` },
      { name: 'parent_page_id', type: 'string', required: false, description: `A page to create an inline linked database view on. Accepts a Notion URL or a bare UUID. The new linked view block is appended at the end of the page and references \`data_source_id\`. Mutually exclusive with \`database_id\`; exactly one must be provided.` },
    ],
  },
  {
    name: 'notionmcp_notion-duplicate-page',
    description: `Duplicate an existing Notion page within the current workspace.`,
    params: [
      { name: 'page_id', type: 'string', required: true, description: `The ID of the page to duplicate. This is a v4 UUID, with or without dashes, and can be parsed from a Notion page URL.` },
    ],
  },
  {
    name: 'notionmcp_notion-fetch',
    description: `Retrieve details about a Notion page, database, or data source by URL or ID.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID or URL of the Notion page, database, or data source to fetch. Supports notion.so URLs, Notion Sites URLs (*.notion.site), raw UUIDs, and data source URLs (collection://...).` },
      { name: 'include_discussions', type: 'boolean', required: false, description: `Set to true to include discussion threads in the response.` },
      { name: 'include_transcript', type: 'boolean', required: false, description: `Set to true to include a meeting transcript in the response.` },
    ],
  },
  {
    name: 'notionmcp_notion-get-comments',
    description: `Retrieve comments and discussion threads from a Notion page.`,
    params: [
      { name: 'page_id', type: 'string', required: true, description: `Identifier for a Notion page.` },
      { name: 'discussion_id', type: 'string', required: false, description: `Fetch a specific discussion by ID or discussion URL (e.g., discussion://pageId/blockId/discussionId).` },
      { name: 'include_all_blocks', type: 'boolean', required: false, description: `Set to true to return all comment blocks, not just the first.` },
      { name: 'include_resolved', type: 'boolean', required: false, description: `Set to true to include resolved discussions in the response.` },
    ],
  },
  {
    name: 'notionmcp_notion-get-teams',
    description: `Retrieve a list of teams (teamspaces) in the current workspace.`,
    params: [
      { name: 'query', type: 'string', required: false, description: `Optional search query to filter teams by name (case-insensitive).` },
    ],
  },
  {
    name: 'notionmcp_notion-get-users',
    description: `Retrieve a list of users in the current Notion workspace.`,
    params: [
      { name: 'page_size', type: 'integer', required: false, description: `Number of users to return per page (default: 100, max: 100).` },
      { name: 'query', type: 'string', required: false, description: `Optional search query to filter users by name or email (case-insensitive).` },
      { name: 'start_cursor', type: 'string', required: false, description: `Cursor for pagination. Use the next_cursor value from the previous response to get the next page.` },
      { name: 'user_id', type: 'string', required: false, description: `Return only the user matching this ID. Pass "self" to fetch the current user.` },
    ],
  },
  {
    name: 'notionmcp_notion-move-pages',
    description: `Move one or more Notion pages or databases to a new parent.`,
    params: [
      { name: 'new_parent', type: 'string', required: true, description: `The new parent under which the pages will be moved. This can be a page, the workspace, a database, or a specific data source under a database when there are multiple. Moving pages to the workspace level adds them as private pages and should rarely be used.` },
      { name: 'page_or_database_ids', type: 'array', required: true, description: `An array of up to 100 page or database IDs to move. IDs are v4 UUIDs and can be supplied with or without dashes (e.g. extracted from a <page> or <database> URL given by the "search" or "fetch" tool). Data Sources under Databases can't be moved individually.` },
    ],
  },
  {
    name: 'notionmcp_notion-query-data-sources',
    description: `Query Notion databases using SQL or by specifying a view.`,
    params: [
      { name: 'data', type: 'string', required: true, description: `The data required for querying data sources` },
    ],
  },
  {
    name: 'notionmcp_notion-query-database-view',
    description: `Query paginated results from a Notion database view by its URL.`,
    params: [
      { name: 'view_url', type: 'string', required: true, description: `URL of a specific database view to query. Example: https://www.notion.so/workspace/db-id?v=view-id` },
      { name: 'page_size', type: 'integer', required: false, description: `Number of rows to return per page (default: 100, max: 100).` },
      { name: 'start_cursor', type: 'string', required: false, description: `Cursor for pagination. Use the next_cursor value from the previous response to get the next page.` },
    ],
  },
  {
    name: 'notionmcp_notion-query-meeting-notes',
    description: `Query the current user's Notion meeting notes data source with optional filters.`,
    params: [
      { name: 'filter', type: 'object', required: false, description: `Acceptable filter for querying current user's meeting notes data source.` },
    ],
  },
  {
    name: 'notionmcp_notion-search',
    description: `Search pages, databases, and connected sources in the Notion workspace.`,
    params: [
      { name: 'query', type: 'string', required: true, description: `Semantic search query over your entire Notion workspace and connected sources (Slack, Google Drive, Github, Jira, Microsoft Teams, Sharepoint, OneDrive, or Linear). For best results, don't provide more than one question per tool call. Use a separate "search" tool call for each search you want to perform.
Alternatively, the query can be a substring or keyword to find users by matching against their name or email address. For example: "john" or "john@example.com"` },
      { name: 'content_search_mode', type: 'string', required: false, description: `How to search within page content. Accepted values: keyword, semantic.` },
      { name: 'data_source_url', type: 'string', required: false, description: `Optionally, provide the URL of a Data source to search. This will perform a semantic search over the pages in the Data Source. Note: must be a Data Source, not a Database. <data-source> tags are part of the Notion flavored Markdown format returned by tools like fetch. The full spec is available in the create-pages tool description.` },
      { name: 'filters', type: 'object', required: false, description: `Optionally provide filters to apply to the search results. Only valid when query_type is 'internal'.` },
      { name: 'max_highlight_length', type: 'integer', required: false, description: `Maximum character length for result highlights (default 200). Set to 0 to omit highlights entirely.` },
      { name: 'page_size', type: 'integer', required: false, description: `Maximum number of results to return (default 10). Lower values reduce response size.` },
      { name: 'page_url', type: 'string', required: false, description: `Optionally, provide the URL or ID of a page to search within. This will perform a semantic search over the content within and under the specified page. Accepts either a full page URL (e.g. https://notion.so/workspace/Page-Title-1234567890) or just the page ID (UUIDv4) with or without dashes.` },
      { name: 'query_type', type: 'string', required: false, description: `The search mode. Accepted values: semantic, keyword.` },
      { name: 'teamspace_id', type: 'string', required: false, description: `Optionally, provide the ID of a teamspace to restrict search results to. This will perform a search over content within the specified teamspace only. Accepts the teamspace ID (UUIDv4) with or without dashes.` },
    ],
  },
  {
    name: 'notionmcp_notion-update-data-source',
    description: `Update a Notion data source's schema, title, or attributes using SQL DDL statements.`,
    params: [
      { name: 'data_source_id', type: 'string', required: true, description: `The data source to update. Accepts a collection:// URI from <data-source> tags, a bare UUID, or a database ID (only if the database has a single data source).` },
      { name: 'description', type: 'string', required: false, description: `The new description of the data source.` },
      { name: 'in_trash', type: 'boolean', required: false, description: `Set to true to move the data source to the trash.` },
      { name: 'is_inline', type: 'boolean', required: false, description: `Set to true to make the database display inline within a page.` },
      { name: 'statements', type: 'string', required: false, description: `Semicolon-separated SQL DDL statements to update the schema. Supports ADD COLUMN, DROP COLUMN, RENAME COLUMN, ALTER COLUMN SET.` },
      { name: 'title', type: 'string', required: false, description: `The new title of the data source.` },
    ],
  },
  {
    name: 'notionmcp_notion-update-page',
    description: `Update a Notion page's properties, content, icon, cover, or verification status.`,
    params: [
      { name: 'command', type: 'string', required: true, description: `The update operation to perform. Accepted values: update_properties, update_content, replace_content, insert_content, apply_template, update_verification.` },
      { name: 'page_id', type: 'string', required: true, description: `The ID of the page to update, with or without dashes.` },
      { name: 'allow_deleting_content', type: 'boolean', required: false, description: `Set to true to confirm deletion of child pages or databases when replacing content.` },
      { name: 'content', type: 'string', required: false, description: `Required for "insert_content" command. The markdown content to insert into the page.` },
      { name: 'content_updates', type: 'array', required: false, description: `Required for "update_content" command. An array of search-and-replace operations, each with old_str (content to find) and new_str (replacement content).` },
      { name: 'cover', type: 'string', required: false, description: `An external image URL for the page cover. Use "none" to remove the cover. Omit to leave unchanged. Can be set alongside any command.` },
      { name: 'icon', type: 'string', required: false, description: `An emoji character (e.g. "🚀"), a custom emoji by name (e.g. ":rocket_ship:"), or an external image URL. Use "none" to remove the icon. Omit to leave unchanged. Can be set alongside any command.` },
      { name: 'new_str', type: 'string', required: false, description: `Required for "replace_content" command. The new content string to replace the entire page content with.` },
      { name: 'position', type: 'string', required: false, description: `Optional for "insert_content" command. Use {"type":"start"} to prepend content or {"type":"end"} to append content. Omit to append.` },
      { name: 'properties', type: 'object', required: false, description: `Required for "update_properties" command. A JSON object that updates the page's properties. For pages in a database, use the SQLite schema definition shown in <database>. For pages outside of a database, the only allowed property is "title", which is the title of the page in inline markdown format. Use null to remove a property's value.` },
      { name: 'template_id', type: 'string', required: false, description: `Required for "apply_template" command. The ID of a template to apply to this page. Template content is appended to any existing page content.` },
      { name: 'verification_expiry_days', type: 'integer', required: false, description: `Optional for "update_verification" command when verification_status is "verified". Number of days until verification expires (e.g. 7, 30, 90). Omit for indefinite verification.` },
      { name: 'verification_status', type: 'string', required: false, description: `The verification state to set. Accepted values: verified, unverified.` },
    ],
  },
  {
    name: 'notionmcp_notion-update-view',
    description: `Update a Notion database view's name, filters, sorts, or display configuration.`,
    params: [
      { name: 'view_id', type: 'string', required: true, description: `The view to update. Accepts a view:// URI, a Notion URL with ?v= parameter, or a bare UUID.` },
      { name: 'configure', type: 'string', required: false, description: `View configuration DSL string. Supports FILTER, SORT BY, GROUP BY, CALENDAR BY, TIMELINE BY, MAP BY, CHART, FORM, SHOW, HIDE, COVER, WRAP CELLS, FREEZE COLUMNS, and CLEAR directives.` },
      { name: 'name', type: 'string', required: false, description: `New name for the view.` },
    ],
  },
]
