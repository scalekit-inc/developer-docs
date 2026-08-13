import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'monday_board_activity_logs_list',
    description: `Query a board's activity log: who changed what column, item, or group and when. Filterable by user, item, column, group, and time range. Maximum 10,000 records; narrow with filters or a date range for large boards.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `ID of the board to fetch activity logs for`,
      },
      {
        name: 'column_ids',
        type: 'array',
        required: false,
        description: `Filter to activity on these column IDs`,
      },
      {
        name: 'from',
        type: 'string',
        required: false,
        description: `Only return activity at or after this ISO 8601 timestamp`,
      },
      {
        name: 'group_ids',
        type: 'array',
        required: false,
        description: `Filter to activity on these group IDs`,
      },
      {
        name: 'item_ids',
        type: 'array',
        required: false,
        description: `Filter to activity on these item IDs`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of activity log entries to return (default 25)`,
      },
      { name: 'page', type: 'integer', required: false, description: `Page number for pagination` },
      {
        name: 'to',
        type: 'string',
        required: false,
        description: `Only return activity at or before this ISO 8601 timestamp`,
      },
      {
        name: 'user_ids',
        type: 'array',
        required: false,
        description: `Filter to activity performed by these user IDs`,
      },
    ],
  },
  {
    name: 'monday_board_archive',
    description: `Archive a board in Monday.com.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `ID of the board to archive`,
      },
    ],
  },
  {
    name: 'monday_board_create',
    description: `Create a new board in Monday.com.`,
    params: [
      {
        name: 'board_kind',
        type: 'string',
        required: true,
        description: `Board type: public, private, or share`,
      },
      { name: 'board_name', type: 'string', required: true, description: `Name for the new board` },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description for the board`,
      },
      {
        name: 'folder_id',
        type: 'integer',
        required: false,
        description: `Folder ID to place the board in`,
      },
      {
        name: 'template_id',
        type: 'integer',
        required: false,
        description: `Template ID to base the board on`,
      },
      {
        name: 'workspace_id',
        type: 'integer',
        required: false,
        description: `ID of the workspace to create the board in`,
      },
    ],
  },
  {
    name: 'monday_board_delete',
    description: `Permanently delete a board from Monday.com.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `ID of the board to delete`,
      },
    ],
  },
  {
    name: 'monday_board_duplicate',
    description: `Create a copy of an existing board.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `ID of the board to duplicate`,
      },
      {
        name: 'duplicate_type',
        type: 'string',
        required: true,
        description: `What to duplicate: duplicate_board_with_structure, duplicate_board_with_pulses, or duplicate_board_with_pulses_and_updates`,
      },
      {
        name: 'board_name',
        type: 'string',
        required: false,
        description: `Name for the duplicated board`,
      },
      {
        name: 'keep_subscribers',
        type: 'boolean',
        required: false,
        description: `Whether to keep board subscribers`,
      },
      {
        name: 'workspace_id',
        type: 'string',
        required: false,
        description: `Destination workspace ID`,
      },
    ],
  },
  {
    name: 'monday_board_hierarchy_update',
    description: `Move a board to a different workspace, folder, or account product. Provide at least one of workspace_id, folder_id, or account_product_id.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `ID of the board to relocate`,
      },
      {
        name: 'account_product_id',
        type: 'string',
        required: false,
        description: `ID of the account product (e.g. CRM, work management) to move the board into`,
      },
      {
        name: 'folder_id',
        type: 'string',
        required: false,
        description: `ID of the folder to move the board into`,
      },
      {
        name: 'workspace_id',
        type: 'string',
        required: false,
        description: `ID of the workspace to move the board into`,
      },
    ],
  },
  {
    name: 'monday_board_permission_set',
    description: `Set a board's default access role, controlling what non-owner members can do on the board by default.`,
    params: [
      {
        name: 'basic_role_name',
        type: 'string',
        required: true,
        description: `Default role: contributor, editor, or viewer`,
      },
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `ID of the board to set permissions on`,
      },
      {
        name: 'cross_product_collaborative',
        type: 'boolean',
        required: false,
        description: `Whether the board allows cross-product collaboration`,
      },
    ],
  },
  {
    name: 'monday_board_subscribers_add',
    description: `Subscribe users to a board so they receive notifications.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `ID of the board to add subscribers to`,
      },
      {
        name: 'user_ids',
        type: 'array',
        required: true,
        description: `Array of user IDs to subscribe`,
      },
      { name: 'kind', type: 'string', required: false, description: `Role: subscriber or owner` },
    ],
  },
  {
    name: 'monday_board_subscribers_remove',
    description: `Unsubscribe users from a board so they stop receiving its notifications. Complements monday_board_subscribers_add.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `ID of the board to remove subscribers from`,
      },
      {
        name: 'user_ids',
        type: 'array',
        required: true,
        description: `IDs of the users to unsubscribe`,
      },
    ],
  },
  {
    name: 'monday_board_update',
    description: `Update a board's name, description, or communication settings.`,
    params: [
      {
        name: 'board_attribute',
        type: 'string',
        required: true,
        description: `Attribute to update: name, description, or communication`,
      },
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `ID of the board to update`,
      },
      {
        name: 'new_value',
        type: 'string',
        required: true,
        description: `New value for the attribute`,
      },
    ],
  },
  {
    name: 'monday_boards_list',
    description: `Retrieve a list of boards from your Monday.com account with optional filtering.`,
    params: [
      {
        name: 'board_kind',
        type: 'string',
        required: false,
        description: `Filter by kind: public, private, share`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of boards to return (default 10)`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Sort order: created_at or used_at`,
      },
      { name: 'page', type: 'integer', required: false, description: `Page number for pagination` },
      {
        name: 'state',
        type: 'string',
        required: false,
        description: `Filter by state: active, archived, deleted, all`,
      },
      {
        name: 'workspace_ids',
        type: 'array',
        required: false,
        description: `Filter by workspace IDs`,
      },
    ],
  },
  {
    name: 'monday_column_create',
    description: `Add a new column to a Monday.com board.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `ID of the board to add the column to`,
      },
      {
        name: 'column_type',
        type: 'string',
        required: true,
        description: `Column type: text, long_text, numbers, status, dropdown, date, timeline, people, checkbox, email, phone, link, file, color_picker, rating, time_tracking, formula, auto_number, etc.`,
      },
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `Title/name for the new column`,
      },
      {
        name: 'after_column_id',
        type: 'string',
        required: false,
        description: `Column ID to insert this column after`,
      },
      {
        name: 'defaults',
        type: 'string',
        required: false,
        description: `JSON of default settings for the column`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional description for the column`,
      },
    ],
  },
  {
    name: 'monday_column_delete',
    description: `Permanently delete a column from a board.`,
    params: [
      { name: 'board_id', type: 'string', required: true, description: `ID of the board` },
      {
        name: 'column_id',
        type: 'string',
        required: true,
        description: `ID of the column to delete`,
      },
    ],
  },
  {
    name: 'monday_column_title_change',
    description: `Rename a column on a board.`,
    params: [
      { name: 'board_id', type: 'string', required: true, description: `ID of the board` },
      {
        name: 'column_id',
        type: 'string',
        required: true,
        description: `ID of the column to rename`,
      },
      { name: 'title', type: 'string', required: true, description: `New title for the column` },
    ],
  },
  {
    name: 'monday_column_update',
    description: `Comprehensively update a board column's title, description, width, or type-specific settings. Requires the column's current revision number for optimistic concurrency control (read it via monday_boards_list or a columns query first).`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `ID of the board the column belongs to`,
      },
      {
        name: 'column_id',
        type: 'string',
        required: true,
        description: `ID of the column to update`,
      },
      {
        name: 'column_type',
        type: 'string',
        required: true,
        description: `The column's type (must match its existing type)`,
      },
      {
        name: 'revision',
        type: 'string',
        required: true,
        description: `Current revision number of the column, for concurrency control`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New description for the column`,
      },
      {
        name: 'settings',
        type: 'string',
        required: false,
        description: `JSON-encoded type-specific settings for the column`,
      },
      { name: 'title', type: 'string', required: false, description: `New title for the column` },
      {
        name: 'width',
        type: 'integer',
        required: false,
        description: `New width for the column, in pixels`,
      },
    ],
  },
  {
    name: 'monday_doc_add_markdown_content',
    description: `Add markdown content to an existing monday Doc. The markdown is parsed and converted into the doc's native block structure (headings, lists, quotes, bold/italic/code, etc).`,
    params: [
      {
        name: 'doc_id',
        type: 'string',
        required: true,
        description: `ID of the doc to add content to`,
      },
      {
        name: 'markdown',
        type: 'string',
        required: true,
        description: `Markdown content to convert and add to the doc`,
      },
      {
        name: 'after_block_id',
        type: 'string',
        required: false,
        description: `ID of the block to insert the new content after. If omitted, content is added at the end of the doc.`,
      },
    ],
  },
  {
    name: 'monday_doc_create',
    description: `Create a new monday Doc, either attached to an item's doc-type column on a board, or as a standalone doc directly inside a workspace. Provide either (item_id and column_id) for the board placement, or (workspace_id and name) for the workspace placement.`,
    params: [
      {
        name: 'column_id',
        type: 'string',
        required: false,
        description: `ID of the doc-type column on the item (board placement mode). Requires item_id to also be set.`,
      },
      {
        name: 'item_id',
        type: 'string',
        required: false,
        description: `ID of the item containing the doc-type column (board placement mode). Requires column_id to also be set.`,
      },
      {
        name: 'kind',
        type: 'string',
        required: false,
        description: `Visibility kind for the new doc when created in a workspace, e.g. private.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Name for the new doc (workspace placement mode only).`,
      },
      {
        name: 'workspace_id',
        type: 'string',
        required: false,
        description: `ID of the workspace to create the doc directly in (workspace placement mode). Requires name to also be set.`,
      },
    ],
  },
  {
    name: 'monday_doc_delete',
    description: `Permanently delete a monday Doc.`,
    params: [
      { name: 'doc_id', type: 'string', required: true, description: `ID of the doc to delete` },
    ],
  },
  {
    name: 'monday_doc_update_name',
    description: `Rename an existing monday Doc.`,
    params: [
      { name: 'doc_id', type: 'integer', required: true, description: `ID of the doc to rename` },
      { name: 'name', type: 'string', required: true, description: `New name for the doc` },
    ],
  },
  {
    name: 'monday_docs_list',
    description: `List documents (monday Docs) in your account.`,
    params: [
      { name: 'ids', type: 'array', required: false, description: `Filter by specific doc IDs` },
      { name: 'limit', type: 'integer', required: false, description: `Number of docs to return` },
      { name: 'page', type: 'integer', required: false, description: `Page number for pagination` },
      {
        name: 'workspace_ids',
        type: 'array',
        required: false,
        description: `Filter by workspace IDs`,
      },
    ],
  },
  {
    name: 'monday_group_archive',
    description: `Archive a group on a board.`,
    params: [
      { name: 'board_id', type: 'string', required: true, description: `ID of the board` },
      {
        name: 'group_id',
        type: 'string',
        required: true,
        description: `ID of the group to archive`,
      },
    ],
  },
  {
    name: 'monday_group_create',
    description: `Create a new group on a Monday.com board.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `ID of the board to add the group to`,
      },
      {
        name: 'group_name',
        type: 'string',
        required: true,
        description: `Name of the group to create`,
      },
      {
        name: 'position_relative_method',
        type: 'string',
        required: false,
        description: `Positioning: before_at or after_at`,
      },
      {
        name: 'relative_to',
        type: 'string',
        required: false,
        description: `Group ID to position this group relative to`,
      },
    ],
  },
  {
    name: 'monday_group_delete',
    description: `Permanently delete a group from a board.`,
    params: [
      { name: 'board_id', type: 'string', required: true, description: `ID of the board` },
      {
        name: 'group_id',
        type: 'string',
        required: true,
        description: `ID of the group to delete`,
      },
    ],
  },
  {
    name: 'monday_group_duplicate',
    description: `Create a copy of a group on a board.`,
    params: [
      { name: 'board_id', type: 'string', required: true, description: `ID of the board` },
      {
        name: 'group_id',
        type: 'string',
        required: true,
        description: `ID of the group to duplicate`,
      },
      {
        name: 'add_to_top',
        type: 'boolean',
        required: false,
        description: `Whether to add the duplicate at the top of the board`,
      },
    ],
  },
  {
    name: 'monday_group_update',
    description: `Update a group's name, color, or position on a board.`,
    params: [
      {
        name: 'attribute',
        type: 'string',
        required: true,
        description: `Attribute to update: title or color`,
      },
      { name: 'board_id', type: 'string', required: true, description: `ID of the board` },
      {
        name: 'group_id',
        type: 'string',
        required: true,
        description: `ID of the group to update`,
      },
      {
        name: 'new_value',
        type: 'string',
        required: true,
        description: `New value for the attribute`,
      },
    ],
  },
  {
    name: 'monday_item_archive',
    description: `Archive an item on a Monday.com board.`,
    params: [
      { name: 'item_id', type: 'string', required: true, description: `ID of the item to archive` },
    ],
  },
  {
    name: 'monday_item_column_simple_value_change',
    description: `Update a single column's value on an item using a plain text string, instead of the JSON shape required by monday_item_column_value_change. Simpler for text-like columns, but not all column types support simple string values.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `ID of the board the item belongs to`,
      },
      {
        name: 'column_id',
        type: 'string',
        required: true,
        description: `ID of the column to update`,
      },
      { name: 'item_id', type: 'string', required: true, description: `ID of the item to update` },
      {
        name: 'create_labels_if_missing',
        type: 'boolean',
        required: false,
        description: `Auto-create labels if they don't exist (status/dropdown columns)`,
      },
      {
        name: 'value',
        type: 'string',
        required: false,
        description: `Plain text value to set on the column`,
      },
    ],
  },
  {
    name: 'monday_item_column_value_change',
    description: `Update the value of a single column on an item.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `ID of the board the item belongs to`,
      },
      {
        name: 'column_id',
        type: 'string',
        required: true,
        description: `ID of the column to update (e.g., status, date4, text)`,
      },
      { name: 'item_id', type: 'string', required: true, description: `ID of the item to update` },
      {
        name: 'value',
        type: 'string',
        required: true,
        description: `New value as a JSON string. Format varies by column type.`,
      },
      {
        name: 'create_labels_if_missing',
        type: 'boolean',
        required: false,
        description: `Auto-create labels if they don't exist`,
      },
    ],
  },
  {
    name: 'monday_item_column_values_change',
    description: `Update multiple column values on an item in a single request (up to 50 columns).`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `ID of the board the item belongs to`,
      },
      {
        name: 'column_values',
        type: 'string',
        required: true,
        description: `JSON object mapping column IDs to their new values`,
      },
      { name: 'item_id', type: 'string', required: true, description: `ID of the item to update` },
      {
        name: 'create_labels_if_missing',
        type: 'boolean',
        required: false,
        description: `Auto-create labels if they don't exist`,
      },
    ],
  },
  {
    name: 'monday_item_create',
    description: `Create a new item (row) on a Monday.com board.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `ID of the board to create the item on`,
      },
      {
        name: 'item_name',
        type: 'string',
        required: true,
        description: `Name of the item to create`,
      },
      {
        name: 'column_values',
        type: 'string',
        required: false,
        description: `JSON string of column values to set`,
      },
      {
        name: 'create_labels_if_missing',
        type: 'boolean',
        required: false,
        description: `Auto-create status/dropdown labels if they don't exist`,
      },
      {
        name: 'group_id',
        type: 'string',
        required: false,
        description: `ID of the group to add the item to`,
      },
    ],
  },
  {
    name: 'monday_item_delete',
    description: `Permanently delete an item from a Monday.com board.`,
    params: [
      { name: 'item_id', type: 'string', required: true, description: `ID of the item to delete` },
    ],
  },
  {
    name: 'monday_item_description_set',
    description: `Set an item's description content, using markdown formatting.`,
    params: [
      { name: 'item_id', type: 'string', required: true, description: `ID of the item to update` },
      {
        name: 'markdown',
        type: 'string',
        required: true,
        description: `Description content, as markdown`,
      },
    ],
  },
  {
    name: 'monday_item_duplicate',
    description: `Create a copy of an item on the same board.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `ID of the board the item belongs to`,
      },
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `ID of the item to duplicate`,
      },
      {
        name: 'with_updates',
        type: 'boolean',
        required: false,
        description: `Whether to copy the item's updates/comments`,
      },
    ],
  },
  {
    name: 'monday_item_move_to_board',
    description: `Transfer an item to a different board.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `ID of the destination board`,
      },
      {
        name: 'group_id',
        type: 'string',
        required: true,
        description: `ID of the group on the destination board`,
      },
      { name: 'item_id', type: 'string', required: true, description: `ID of the item to move` },
      {
        name: 'columns_mapping',
        type: 'string',
        required: false,
        description: `JSON array mapping source column IDs to destination column IDs`,
      },
    ],
  },
  {
    name: 'monday_item_move_to_group',
    description: `Move an item to a different group on the same board.`,
    params: [
      {
        name: 'group_id',
        type: 'string',
        required: true,
        description: `ID of the destination group`,
      },
      { name: 'item_id', type: 'string', required: true, description: `ID of the item to move` },
    ],
  },
  {
    name: 'monday_item_position_change',
    description: `Move an item to a new position within the same board -- to the top of a group, or immediately before/after another item.`,
    params: [
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `ID of the item to reposition`,
      },
      {
        name: 'group_id',
        type: 'string',
        required: false,
        description: `Move the item to this group before repositioning`,
      },
      {
        name: 'group_top',
        type: 'boolean',
        required: false,
        description: `Move the item to the top of its group`,
      },
      {
        name: 'position_relative_method',
        type: 'string',
        required: false,
        description: `Whether to place the item before or after relative_to`,
      },
      {
        name: 'relative_to',
        type: 'string',
        required: false,
        description: `ID of the item to position relative to`,
      },
    ],
  },
  {
    name: 'monday_item_updates_clear',
    description: `Permanently remove all updates (including replies and likes) from an item. This cannot be undone.`,
    params: [
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `ID of the item whose updates should be cleared`,
      },
    ],
  },
  {
    name: 'monday_items_get',
    description: `Fetch one or more items directly by ID, without going through their board. Returns item metadata and column values.`,
    params: [
      { name: 'ids', type: 'array', required: true, description: `IDs of the items to fetch` },
      {
        name: 'exclude_nonactive',
        type: 'boolean',
        required: false,
        description: `Exclude archived/deleted items`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of items to return (default 25)`,
      },
      {
        name: 'newest_first',
        type: 'boolean',
        required: false,
        description: `Return newest items first`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number to fetch (1-indexed)`,
      },
    ],
  },
  {
    name: 'monday_items_list',
    description: `Retrieve items from a Monday.com board. Returns items with their column values, group, and creator details.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `ID of the board to list items from`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response`,
      },
      { name: 'group_id', type: 'string', required: false, description: `Filter by group ID` },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of items to return per page (max 500)`,
      },
    ],
  },
  {
    name: 'monday_items_search',
    description: `Search for items on a board filtered by specific column values.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `ID of the board to search`,
      },
      {
        name: 'column_id',
        type: 'string',
        required: true,
        description: `ID of the column to filter by`,
      },
      {
        name: 'column_value',
        type: 'string',
        required: true,
        description: `Value to search for in the column`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of items to return per page`,
      },
    ],
  },
  {
    name: 'monday_me_get',
    description: `Retrieve the profile of the currently authenticated Monday.com user.`,
    params: [],
  },
  {
    name: 'monday_notification_create',
    description: `Send a notification to a user in Monday.com.`,
    params: [
      {
        name: 'target_id',
        type: 'string',
        required: true,
        description: `ID of the target item or board for context`,
      },
      {
        name: 'target_type',
        type: 'string',
        required: true,
        description: `Target type: Project (board) or Post (item)`,
      },
      { name: 'text', type: 'string', required: true, description: `Notification message text` },
      { name: 'user_id', type: 'string', required: true, description: `ID of the user to notify` },
    ],
  },
  {
    name: 'monday_search',
    description: `Full-text search across your monday.com account: items, boards, docs, users, workspaces, updates, and Emails & Activities timeline items, all in one call via the namespaced \`search\` query. Distinct from monday_items_search, which only filters items on a single board by column value.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Search term to match across items, boards, docs, users, workspaces, updates, and timeline items`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return per entity type (e.g. up to this many boards, up to this many items, etc)`,
      },
    ],
  },
  {
    name: 'monday_subitem_create',
    description: `Create a subitem (child item) under a parent item.`,
    params: [
      { name: 'item_name', type: 'string', required: true, description: `Name of the subitem` },
      {
        name: 'parent_item_id',
        type: 'string',
        required: true,
        description: `ID of the parent item`,
      },
      {
        name: 'column_values',
        type: 'string',
        required: false,
        description: `JSON object of column values to set on creation`,
      },
      {
        name: 'create_labels_if_missing',
        type: 'boolean',
        required: false,
        description: `Auto-create labels if they don't exist`,
      },
    ],
  },
  {
    name: 'monday_tag_create_or_get',
    description: `Create a new tag or retrieve an existing one by name.`,
    params: [
      {
        name: 'tag_name',
        type: 'string',
        required: true,
        description: `Name of the tag to create or retrieve`,
      },
      {
        name: 'board_id',
        type: 'string',
        required: false,
        description: `ID of the board to associate the tag with`,
      },
    ],
  },
  {
    name: 'monday_tags_list',
    description: `Retrieve tags from Monday.com.`,
    params: [
      { name: 'ids', type: 'array', required: false, description: `Filter by specific tag IDs` },
    ],
  },
  {
    name: 'monday_team_users_add',
    description: `Add one or more users to a Monday.com team.`,
    params: [
      {
        name: 'team_id',
        type: 'string',
        required: true,
        description: `ID of the team to add users to`,
      },
      {
        name: 'user_ids',
        type: 'array',
        required: true,
        description: `Array of user IDs to add to the team`,
      },
    ],
  },
  {
    name: 'monday_team_users_remove',
    description: `Remove one or more users from a Monday.com team.`,
    params: [
      {
        name: 'team_id',
        type: 'string',
        required: true,
        description: `ID of the team to remove users from`,
      },
      {
        name: 'user_ids',
        type: 'array',
        required: true,
        description: `Array of user IDs to remove from the team`,
      },
    ],
  },
  {
    name: 'monday_teams_list',
    description: `List teams in your Monday.com account.`,
    params: [
      { name: 'ids', type: 'array', required: false, description: `Filter by specific team IDs` },
    ],
  },
  {
    name: 'monday_update_create',
    description: `Post a comment or update on a Monday.com item.`,
    params: [
      {
        name: 'body',
        type: 'string',
        required: true,
        description: `Content of the update/comment (HTML supported)`,
      },
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `ID of the item to post the update on`,
      },
    ],
  },
  {
    name: 'monday_update_delete',
    description: `Delete an update/comment from an item.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `ID of the update to delete` },
    ],
  },
  {
    name: 'monday_update_edit',
    description: `Edit the text of an existing update/comment.`,
    params: [
      { name: 'body', type: 'string', required: true, description: `New content for the update` },
      { name: 'id', type: 'string', required: true, description: `ID of the update to edit` },
    ],
  },
  {
    name: 'monday_update_like',
    description: `Add a like reaction to an update (comment) from the connected user.`,
    params: [
      {
        name: 'update_id',
        type: 'string',
        required: true,
        description: `ID of the update to like`,
      },
    ],
  },
  {
    name: 'monday_update_pin',
    description: `Pin an update to the top of its item's update thread.`,
    params: [
      { name: 'update_id', type: 'string', required: true, description: `ID of the update to pin` },
      {
        name: 'item_id',
        type: 'string',
        required: false,
        description: `ID of the item the update belongs to`,
      },
    ],
  },
  {
    name: 'monday_update_unlike',
    description: `Remove the connected user's like reaction from an update (comment).`,
    params: [
      {
        name: 'update_id',
        type: 'string',
        required: true,
        description: `ID of the update to unlike`,
      },
    ],
  },
  {
    name: 'monday_update_unpin',
    description: `Remove an update from the pinned position at the top of its item's update thread.`,
    params: [
      {
        name: 'update_id',
        type: 'string',
        required: true,
        description: `ID of the update to unpin`,
      },
      {
        name: 'item_id',
        type: 'string',
        required: false,
        description: `ID of the item the update belongs to`,
      },
    ],
  },
  {
    name: 'monday_updates_list',
    description: `Retrieve updates (comments/activity posts) from Monday.com.`,
    params: [
      {
        name: 'item_id',
        type: 'string',
        required: false,
        description: `Filter updates by item ID`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of updates to return`,
      },
      { name: 'page', type: 'integer', required: false, description: `Page number for pagination` },
    ],
  },
  {
    name: 'monday_user_role_update',
    description: `Change the account role for up to 200 users at once, using either a default role or a custom role ID.`,
    params: [
      {
        name: 'user_ids',
        type: 'array',
        required: true,
        description: `IDs of the users to update (max 200)`,
      },
      { name: 'new_role', type: 'string', required: false, description: `Default role to assign` },
      {
        name: 'role_id',
        type: 'string',
        required: false,
        description: `Custom role ID to assign, instead of a default role`,
      },
    ],
  },
  {
    name: 'monday_users_activate',
    description: `Reactivate up to 200 previously deactivated user accounts on the monday.com account.`,
    params: [
      {
        name: 'user_ids',
        type: 'array',
        required: true,
        description: `IDs of the users to reactivate (max 200)`,
      },
    ],
  },
  {
    name: 'monday_users_deactivate',
    description: `Deactivate up to 200 user accounts on the monday.com account, revoking their access.`,
    params: [
      {
        name: 'user_ids',
        type: 'array',
        required: true,
        description: `IDs of the users to deactivate (max 200)`,
      },
    ],
  },
  {
    name: 'monday_users_invite',
    description: `Invite one or more people to join the monday.com account by email. Invitees remain pending until they accept.`,
    params: [
      { name: 'emails', type: 'array', required: true, description: `Email addresses to invite` },
      {
        name: 'product',
        type: 'string',
        required: false,
        description: `Product area to invite the users into`,
      },
      {
        name: 'user_role',
        type: 'string',
        required: false,
        description: `Role to grant the invited users`,
      },
    ],
  },
  {
    name: 'monday_users_list',
    description: `List users in your Monday.com account.`,
    params: [
      { name: 'emails', type: 'array', required: false, description: `Filter by email addresses` },
      { name: 'ids', type: 'array', required: false, description: `Filter by specific user IDs` },
      {
        name: 'kind',
        type: 'string',
        required: false,
        description: `User kind: all, non_guests, guests, non_pending`,
      },
      { name: 'limit', type: 'integer', required: false, description: `Number of users to return` },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Filter by name (partial match)`,
      },
      {
        name: 'newest_first',
        type: 'boolean',
        required: false,
        description: `Sort newest users first`,
      },
      { name: 'page', type: 'integer', required: false, description: `Page number for pagination` },
    ],
  },
  {
    name: 'monday_webhook_create',
    description: `Register a new webhook for a board event.`,
    params: [
      { name: 'board_id', type: 'string', required: true, description: `ID of the board to watch` },
      {
        name: 'event',
        type: 'string',
        required: true,
        description: `Event to trigger on: change_column_value, create_item, delete_item, create_update, change_status_column_value, change_subitem_column_value, create_subitem, move_item_to_group, etc.`,
      },
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `URL to send webhook payloads to`,
      },
      {
        name: 'config',
        type: 'string',
        required: false,
        description: `Optional JSON configuration for the event (e.g., specific column filter)`,
      },
    ],
  },
  {
    name: 'monday_webhook_delete',
    description: `Delete a webhook registration.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `ID of the webhook to delete` },
    ],
  },
  {
    name: 'monday_webhooks_list',
    description: `List all webhooks registered for a board.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `ID of the board to list webhooks for`,
      },
      {
        name: 'app_webhooks_only',
        type: 'boolean',
        required: false,
        description: `Return only webhooks created by the current app`,
      },
    ],
  },
  {
    name: 'monday_workspace_create',
    description: `Create a new workspace in Monday.com.`,
    params: [
      {
        name: 'kind',
        type: 'string',
        required: true,
        description: `Workspace type: open or closed`,
      },
      { name: 'name', type: 'string', required: true, description: `Name for the new workspace` },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional description for the workspace`,
      },
    ],
  },
  {
    name: 'monday_workspace_delete',
    description: `Permanently delete a workspace and remove it from the account. This is a destructive operation.`,
    params: [
      {
        name: 'workspace_id',
        type: 'string',
        required: true,
        description: `ID of the workspace to delete`,
      },
    ],
  },
  {
    name: 'monday_workspace_teams_add',
    description: `Grant one or more teams access to a workspace, as an owner or subscriber.`,
    params: [
      { name: 'team_ids', type: 'array', required: true, description: `IDs of the teams to add` },
      {
        name: 'workspace_id',
        type: 'string',
        required: true,
        description: `ID of the workspace to add teams to`,
      },
      {
        name: 'kind',
        type: 'string',
        required: false,
        description: `Access level to grant: owner or subscriber`,
      },
    ],
  },
  {
    name: 'monday_workspace_teams_remove',
    description: `Remove one or more teams' access to a workspace.`,
    params: [
      {
        name: 'team_ids',
        type: 'array',
        required: true,
        description: `IDs of the teams to remove`,
      },
      {
        name: 'workspace_id',
        type: 'string',
        required: true,
        description: `ID of the workspace to remove teams from`,
      },
    ],
  },
  {
    name: 'monday_workspace_update',
    description: `Update a workspace's name, description, or account product.`,
    params: [
      {
        name: 'workspace_id',
        type: 'string',
        required: true,
        description: `ID of the workspace to update`,
      },
      {
        name: 'account_product_id',
        type: 'string',
        required: false,
        description: `Account product to associate with the workspace`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New description for the workspace`,
      },
      { name: 'name', type: 'string', required: false, description: `New name for the workspace` },
    ],
  },
  {
    name: 'monday_workspace_users_add',
    description: `Grant one or more users access to a workspace, as an owner or subscriber.`,
    params: [
      { name: 'user_ids', type: 'array', required: true, description: `IDs of the users to add` },
      {
        name: 'workspace_id',
        type: 'string',
        required: true,
        description: `ID of the workspace to add users to`,
      },
      {
        name: 'kind',
        type: 'string',
        required: false,
        description: `Access level to grant: owner or subscriber`,
      },
    ],
  },
  {
    name: 'monday_workspace_users_remove',
    description: `Remove one or more users' access to a workspace.`,
    params: [
      {
        name: 'user_ids',
        type: 'array',
        required: true,
        description: `IDs of the users to remove`,
      },
      {
        name: 'workspace_id',
        type: 'string',
        required: true,
        description: `ID of the workspace to remove users from`,
      },
    ],
  },
  {
    name: 'monday_workspaces_list',
    description: `List all workspaces in your Monday.com account.`,
    params: [
      {
        name: 'ids',
        type: 'array',
        required: false,
        description: `Filter by specific workspace IDs`,
      },
      {
        name: 'kind',
        type: 'string',
        required: false,
        description: `Workspace kind: open or closed`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of workspaces to return`,
      },
      { name: 'page', type: 'integer', required: false, description: `Page number for pagination` },
      {
        name: 'state',
        type: 'string',
        required: false,
        description: `Workspace state: all, active, archived, deleted`,
      },
    ],
  },
]
