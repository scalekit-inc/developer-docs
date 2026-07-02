import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'whimsicalmcp_auto_layout',
    description: `Re-arrange shapes on a Whimsical flowchart using the auto-layout engine, with connectors re-routed automatically.`,
    params: [
      { name: 'board_id', type: 'string', required: true, description: `Board file ID` },
      {
        name: 'orientation',
        type: 'string',
        required: false,
        description: `Layout direction (td=top-to-bottom, lr=left-to-right, bt=bottom-to-top, rl=right-to-left). Inferred from connector flow when omitted.`,
      },
      {
        name: 'parent_id',
        type: 'string',
        required: false,
        description: `Optional: scope layout to descendants of this object id (e.g. a group/container). Omit to lay out all root-level shapes on the file.`,
      },
      {
        name: 'spacing',
        type: 'string',
        required: false,
        description: `Spacing preset; defaults to 'default'.`,
      },
    ],
  },
  {
    name: 'whimsicalmcp_comment_edit',
    description: `Create, reply to, edit, resolve, or delete comment threads on a Whimsical board or doc.`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: true,
        description: `Which comment operation to perform.`,
      },
      {
        name: 'cell_id',
        type: 'string',
        required: false,
        description: `For create on a table cell: the column id (short-id of the table column). Combined with a table-row \`item_id\` to target a single cell. Reuse a \`:cell\` short-id from a previous comment_read response.`,
      },
      {
        name: 'comment_id',
        type: 'string',
        required: false,
        description: `For edit/delete: id of the specific comment to modify.`,
      },
      {
        name: 'content',
        type: 'string',
        required: false,
        description: `For create/reply/edit: markdown content for the comment.`,
      },
      {
        name: 'item_id',
        type: 'string',
        required: false,
        description: `For create: id of the board, doc, board object, or table row to attach the thread to.`,
      },
      {
        name: 'thread_id',
        type: 'string',
        required: false,
        description: `For reply/resolve/unresolve: id of the root comment of the thread.`,
      },
    ],
  },
  {
    name: 'whimsicalmcp_comment_read',
    description: `Read all comment threads on a board item, including author, timestamp, and thread content.`,
    params: [
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `Board, doc, board-object, doc-block, or table-row id (short-id, base58, or UUID).`,
      },
      {
        name: 'cell_id',
        type: 'string',
        required: false,
        description: `Optional column id (short-id of the table column) to narrow results to a single cell. Only meaningful alongside a table-row \`item_id\`. Reuse the \`:cell\` value from a previous comment_read response.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of threads to return (default 50).`,
      },
    ],
  },
  {
    name: 'whimsicalmcp_create',
    description: `Create a new Whimsical board, diagram, folder, or doc in the specified workspace or folder.`,
    params: [
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `What to create. Use 'board' for freeform/sketch layouts where you control absolute positions (ideal for recreating hand-drawn notes, whiteboards, or any visual layout). Use 'flowchart', 'mindmap', 'sequence_diagram', 'sticky_notes', or 'wireframe' for semantic diagrams that auto-layout.`,
      },
      {
        name: 'board_id',
        type: 'string',
        required: false,
        description: `Add to existing board. Omit to create new board. Required for wireframe.`,
      },
      {
        name: 'data',
        type: 'string',
        required: false,
        description: `Content payload. Board (freeform layout): {items: [{type:"text"|"shape"|"note"|"conn"|"icon"|"link", text, x, y, ...}], groups?: [...]}. Field names are snake_case: shape_type, from_id, to_id, temp_id, font_size, icon_name (NOT camelCase). For board items the \`text\` field accepts markdown (**bold**, *italic*, \`code\`, - bullet, 1. numbered, [label](url), # heading). URLs to Linear issues or GitHub issues/PRs render as inline badges; custom labels ([label](url)) aren't kept for these — use a bare URL. Keep one item per entity (one Linear issue, one card); put the formatting inside that item's text rather than splitting it across several items. Only emit conn items for arrows actually present in the source — do not invent connectors. Call how_to('board') for the full schema and examples. Mindmap: {markdown: "Root\\n- Child\\n  - Grandchild"} (indented bullets). Flowchart/sequence_diagram: call how_to(type) for syntax. Wireframe: call how_to('wireframe') for flexbox DSL. Table: {markdown: "| A | B |\\n|---|---|\\n| 1 | 2 |"} or {columns: ["A","B"], rows: [["1","2"]]}.`,
      },
      {
        name: 'parent_id',
        type: 'string',
        required: false,
        description: `Folder or team id (base58) to create in. Find folder ids with file_tree, team ids with file_tree({filter:'teams'}), search, or list_workspaces. Defaults to the Private section.`,
      },
      {
        name: 'placement',
        type: 'object',
        required: false,
        description: `Position relative to a previous diagram's bbox (returned in every creation response). Use direction 'right' or 'below' to build grids. Mutually exclusive with x/y.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Title or name for the created item`,
      },
      {
        name: 'workspace_id',
        type: 'string',
        required: false,
        description: `Workspace ID (UUID). Use list_workspaces to see options. Defaults to most recently active workspace.`,
      },
      {
        name: 'x',
        type: 'number',
        required: false,
        description: `X position on board. Mutually exclusive with placement.`,
      },
      {
        name: 'y',
        type: 'number',
        required: false,
        description: `Y position on board. Mutually exclusive with placement.`,
      },
    ],
  },
  {
    name: 'whimsicalmcp_delete',
    description: `Move a Whimsical file, folder, or doc to trash, restoring it later from the Whimsical UI.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Id of the file, folder, or doc to delete. Accepts UUID or base58 form (as returned by file_tree or search).`,
      },
    ],
  },
  {
    name: 'whimsicalmcp_doc_create',
    description: `Create a new Whimsical document with optional markdown content.`,
    params: [
      {
        name: 'data',
        type: 'string',
        required: false,
        description: `Document content as a markdown string.`,
      },
      {
        name: 'parent_id',
        type: 'string',
        required: false,
        description: `Folder or team section ID to create in. Defaults to Private section.`,
      },
      { name: 'title', type: 'string', required: false, description: `Document title` },
      {
        name: 'workspace_id',
        type: 'string',
        required: false,
        description: `Workspace ID (UUID). Use list_workspaces to see options. Defaults to most recently active workspace.`,
      },
    ],
  },
  {
    name: 'whimsicalmcp_edit',
    description: `Edit a Whimsical board or doc by applying an array of add, update, or delete operations to its objects.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Board or doc ID (from create, fetch, or a previous tool response)`,
      },
      {
        name: 'operations',
        type: 'array',
        required: true,
        description: `Array of operations to perform`,
      },
    ],
  },
  {
    name: 'whimsicalmcp_fetch',
    description: `Fetch the content of a Whimsical board, doc, or folder by ID, optionally returning a PNG snapshot.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `File or object ID (6-char short-id, UUID, or base58) from search results or a previous tool call`,
      },
      {
        name: 'board_id',
        type: 'string',
        required: false,
        description: `Parent board ID — required when fetching a table object. The table_id goes in 'id'.`,
      },
      {
        name: 'crop_ids',
        type: 'array',
        required: false,
        description: `Specific object IDs to crop the image to (image mode only).`,
      },
      {
        name: 'detail',
        type: 'string',
        required: false,
        description: `Detail level (boards only). "simple" (default): type, id, text only. "detailed": includes x, y, width, height, color, and the board's color palette. Task rows surface assignee, tags, and description-present as inline markers in the text column: \`[@name, #tag, 📝]\`.`,
      },
      {
        name: 'expand_groups',
        type: 'boolean',
        required: false,
        description: `Show all objects flat instead of collapsing groups into summaries (boards only).`,
      },
      {
        name: 'grep_text',
        type: 'array',
        required: false,
        description: `Filter to items whose text contains any of these terms (boards and docs, case-insensitive).`,
      },
      {
        name: 'image',
        type: 'boolean',
        required: false,
        description: `Return a rendered PNG image instead of text (boards only). Use scope, crop_ids, or viewport to crop.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Max objects/blocks to return (default: 50 for boards, 200 for docs, max: 200)`,
      },
      {
        name: 'scope',
        type: 'string',
        required: false,
        description: `IMPORTANT for editing: ID of a compound diagram (flowchart, mindmap, sequence diagram) to drill into. Returns the actual node/shape text instead of the board overview summary. You MUST use scope before find_replace — board overview shows summaries like 'Root (5 nodes)' that won't match actual text.`,
      },
      {
        name: 'select_ids',
        type: 'array',
        required: false,
        description: `Return only items with these IDs (boards and docs)`,
      },
      {
        name: 'select_kinds',
        type: 'array',
        required: false,
        description: `Filter by type (boards and docs). For boards: shape, note, text, icon, frame, link, task, table, attachment, image, w-annotation, sd-actor. Groups: flowchart, mindmap, wireframe, sequence-diagram, stack, section. For docs: block element tags (p, h1, h2, ul, ol, etc.).`,
      },
      {
        name: 'spatial',
        type: 'boolean',
        required: false,
        description: `Include spatial annotations (boards only, requires detail: detailed). Default: false.`,
      },
      {
        name: 'viewport',
        type: 'object',
        required: false,
        description: `Bounding box in board coordinates to crop the image to (image mode only).`,
      },
    ],
  },
  {
    name: 'whimsicalmcp_file_tree',
    description: `Browse the workspace file hierarchy to list folders, boards, and docs with optional depth and type filtering.`,
    params: [
      {
        name: 'depth',
        type: 'integer',
        required: false,
        description: `How many levels deep to show (default 2, max 5)`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Set to "teams" to list only the workspace's teams (name + id) without descending into files — use it to resolve a team name like "Trips" to its id. Ignored when folder_id is set.`,
      },
      {
        name: 'folder_id',
        type: 'string',
        required: false,
        description: `Folder, section, or team id (base58 or UUID) to browse — returns the file tree below it. Team ids come from filter="teams" or list_workspaces. Omit to see the whole workspace tree.`,
      },
      {
        name: 'workspace_id',
        type: 'string',
        required: false,
        description: `Target workspace ID. Defaults to most recently active workspace. Use list_workspaces to see options.`,
      },
    ],
  },
  {
    name: 'whimsicalmcp_generate_diagram',
    description: `Generate a Whimsical flowchart, mind map, or sequence diagram from structured data or Mermaid syntax.`,
    params: [
      { name: 'type', type: 'string', required: true, description: `Diagram type to generate` },
      {
        name: 'board_id',
        type: 'string',
        required: false,
        description: `Add to existing board. Omit to create a new board.`,
      },
      {
        name: 'data',
        type: 'string',
        required: false,
        description: `Content data — format varies by type. Use how_to(type) for syntax.`,
      },
      {
        name: 'parent_id',
        type: 'string',
        required: false,
        description: `Folder or team section ID to create in. Defaults to Private section.`,
      },
      { name: 'title', type: 'string', required: false, description: `Title for the board` },
      {
        name: 'workspace_id',
        type: 'string',
        required: false,
        description: `Workspace ID (UUID). Use list_workspaces to see options. Defaults to most recently active workspace.`,
      },
    ],
  },
  {
    name: 'whimsicalmcp_generate_mind_map',
    description: `Generate a Whimsical mind map from indented markdown, where the first line is the root and children are bulleted.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: false,
        description: `Add to existing board. Omit to create a new board.`,
      },
      {
        name: 'data',
        type: 'string',
        required: false,
        description: `Mind map content as {"markdown": "Root Topic\\n- Child 1\\n  - Grandchild\\n- Child 2"}. First line is root, children use '- ' bullets, indent 2 spaces per level.`,
      },
      {
        name: 'parent_id',
        type: 'string',
        required: false,
        description: `Folder or team section ID to create in. Defaults to Private section.`,
      },
      { name: 'title', type: 'string', required: false, description: `Title for the board` },
      {
        name: 'workspace_id',
        type: 'string',
        required: false,
        description: `Workspace ID (UUID). Use list_workspaces to see options. Defaults to most recently active workspace.`,
      },
    ],
  },
  {
    name: 'whimsicalmcp_generate_wireframe',
    description: `Generate a Whimsical wireframe with flexbox layout using containers, buttons, inputs, and other UI elements.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: false,
        description: `Add to existing board. Omit to create a new board.`,
      },
      {
        name: 'data',
        type: 'string',
        required: false,
        description: `Content data — format varies by type. Use how_to(type) for syntax.`,
      },
      {
        name: 'parent_id',
        type: 'string',
        required: false,
        description: `Folder or team section ID to create in. Defaults to Private section.`,
      },
      { name: 'title', type: 'string', required: false, description: `Title for the board` },
      {
        name: 'workspace_id',
        type: 'string',
        required: false,
        description: `Workspace ID (UUID). Use list_workspaces to see options. Defaults to most recently active workspace.`,
      },
    ],
  },
  {
    name: 'whimsicalmcp_get_board_items',
    description: `Fetch board objects by file ID for rendering in the Whimsical widget.`,
    params: [
      {
        name: 'fileId',
        type: 'string',
        required: true,
        description: `Board file ID (base58 or UUID)`,
      },
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: `Object fields to include (omit for all). Lightweight: rect, objectType, text, fillColor, parentId, url. Heavy: gfx, rgfx, overlayGfx, hitboxes, shadowPathD.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Max objects per page (omit for all)`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Object offset for pagination (default 0)`,
      },
    ],
  },
  {
    name: 'whimsicalmcp_how_to',
    description: `Look up Whimsical-specific syntax, examples, and guides for creating diagrams and wireframes.`,
    params: [
      {
        name: 'domain',
        type: 'string',
        required: false,
        description: `Structured lookup that returns JSON (vs \`topic\` which returns markdown). Use {type:'icon', query:'database'} for ranked icon names with aliases, {type:'color', query?} for the canonical palette with aliases and descriptions, {type:'font-size'} for valid font sizes, {type:'kinds'} for the canonical add-op type list used by edit. When \`domain\` is provided, \`topic\` is ignored.`,
      },
      {
        name: 'topic',
        type: 'string',
        required: false,
        description: `Topic keyword (e.g. 'flowchart', 'table', 'colors') or search query`,
      },
    ],
  },
  {
    name: 'whimsicalmcp_list_workspaces',
    description: `List all workspaces the authenticated user belongs to, including team IDs and member roles.`,
    params: [],
  },
  {
    name: 'whimsicalmcp_search',
    description: `Search workspace files and content by name or full-text query.`,
    params: [
      { name: 'query', type: 'string', required: true, description: `Search text` },
      {
        name: 'mode',
        type: 'string',
        required: false,
        description: `"all" (default) ranks titles and content together. "files" narrows to file/folder/section titles only — use when you need to pick a board to open and want to filter out object/text matches.`,
      },
      {
        name: 'workspace_id',
        type: 'string',
        required: false,
        description: `Target workspace ID. Defaults to most recently active workspace. Use list_workspaces to see options.`,
      },
    ],
  },
  {
    name: 'whimsicalmcp_wireframe_edit',
    description: `Reflow or edit Whimsical wireframe elements using operations or a flexbox layout tree.`,
    params: [
      { name: 'board_id', type: 'string', required: true, description: `Board file ID` },
      {
        name: 'target_id',
        type: 'string',
        required: true,
        description: `Wireframe frame ID to edit (from board_read or create)`,
      },
      {
        name: 'frame_type',
        type: 'string',
        required: false,
        description: `Override frame type if auto-detection fails. Valid: plain, desktop, iphone-14, iphone-x, iphone-8, ipad, android, android-tablet, apple-watch`,
      },
      {
        name: 'layout',
        type: 'array',
        required: false,
        description: `Layout mode: JSON layout tree for structural changes with flexbox reflow. Cannot be used with operations.`,
      },
      {
        name: 'operations',
        type: 'array',
        required: false,
        description: `Operations mode: direct property edits and deletes. Cannot be used with layout.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Frame title (preserves existing if omitted)`,
      },
    ],
  },
]
