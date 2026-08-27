import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'miromcp_board_create',
    description: `Create a new Miro board. To place the board inside a space, pass parent_space_url - either the space URL or the space content item id. Creating it in the space directly saves the extra board_move call that creating it at the team root would need. IMPORTANT: Always confirm with the user before creating a board. This action creates a new board and cannot be undone.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name of the new board.` },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional description for the board.`,
      },
      {
        name: 'icon_emoji',
        type: 'string',
        required: false,
        description: `Optional single emoji to use as the board icon, e.g. "🚀". Set it when the user asks for an icon; otherwise leave it unset.`,
      },
      {
        name: 'invocation_source',
        type: 'string',
        required: false,
        description: `Identifies what triggered this tool call.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `Set to true when operating in a source-control repository folder, false otherwise.`,
      },
      {
        name: 'parent_space_url',
        type: 'string',
        required: false,
        description: `Space to create the content inside, given either as a full Miro space URL (e.g., 'https://miro.com/app/dashboard/space/0VM5RHCprOu2MnOHXLqp3f') or as the space content item id on its own (e.g., '0VM5RHCprOu2MnOHXLqp3f'). Omit to create at the team root instead.`,
      },
    ],
  },
  {
    name: 'miromcp_board_create_format',
    description: `Create a typed board format, such as a table, timeline, kanban, document, diagram, prototyping container, slide container, activities board, or embed. Use this tool when the user asks for the document/table/diagram itself as a standalone piece of content (e.g. 'create a doc in Miro about X', 'make me a table of Y'). Prefer it over adding a doc, table or diagram widget to an existing board: those tools are for adding content onto a board the user is already working on. To place the format inside a space, pass parent_space_url - either the space URL or the space content item id. Creating it in the space directly saves the extra board_move call that creating it at the team root would need. IMPORTANT: Always confirm with the user before creating content. This action cannot be undone.`,
    params: [
      {
        name: 'format_type',
        type: 'string',
        required: true,
        description: `The kind of format to create`,
      },
      { name: 'name', type: 'string', required: true, description: `Name of the new format` },
      {
        name: 'embed_url',
        type: 'string',
        required: false,
        description: `Source URL to embed (only used when format_type is 'embed')`,
      },
      {
        name: 'icon_emoji',
        type: 'string',
        required: false,
        description: `Optional single emoji to use as the icon, e.g. "🚀". Set it when the user asks for an icon; otherwise leave it unset.`,
      },
      {
        name: 'invocation_source',
        type: 'string',
        required: false,
        description: `Identifies what triggered this tool call. Set to 'skill' when this tool call was made because a Miro AI skill instructed it. Set to 'ui' when invoked from the Miro MCP UI. Leave unset otherwise.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `Set to true when the folder you are operating in is a source-control repository (for example a Git working directory); set to false otherwise. Defaults to false.`,
      },
      {
        name: 'parent_space_url',
        type: 'string',
        required: false,
        description: `Space to create the content inside, given either as a full Miro space URL (e.g., 'https://miro.com/app/dashboard/space/0VM5RHCprOu2MnOHXLqp3f') or as the space content item id on its own (e.g., '0VM5RHCprOu2MnOHXLqp3f'). Omit to create at the team root instead.`,
      },
    ],
  },
  {
    name: 'miromcp_board_get_space',
    description: `Find which space a board belongs to.`,
    params: [
      {
        name: 'miro_url',
        type: 'string',
        required: true,
        description: `Full Miro board URL (e.g., 'https://miro.com/app/board/uXjVOakxTk0='). To target a specific parent frame, include ?moveToWidget=<frame_id>.`,
      },
      {
        name: 'invocation_source',
        type: 'string',
        required: false,
        description: `Tells the server what triggered this particular call. Populate with 'skill' if a Miro AI skill directed the call, with 'ui' if it originated from the Miro MCP interface, and leave it out for any other caller.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `True if the working directory for this call is a source-controlled repository (a checked-out Git project, for instance); false in every other case.`,
      },
    ],
  },
  {
    name: 'miromcp_board_list_items',
    description: `List items on a board with cursor-based pagination. For slide content, prefer slides_read_html over this tool.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: true,
        description: `Maximum number of items to return per page. Range: 10-1000; capped at 50 when filtering by parent.`,
      },
      {
        name: 'miro_url',
        type: 'string',
        required: true,
        description: `Full Miro board URL, optionally with a frame target via moveToWidget query parameter.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Opaque cursor for retrieving the next page of results.`,
      },
      {
        name: 'invocation_source',
        type: 'string',
        required: false,
        description: `Identifies what triggered this tool call.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `Set to true when operating in a source-control repository folder, false otherwise.`,
      },
      {
        name: 'item_type',
        type: 'string',
        required: false,
        description: `Filter items by type. Leave empty to return all item types.`,
      },
    ],
  },
  {
    name: 'miromcp_board_move',
    description: `Move an existing Miro board under a space or folder. Use this tool when a user asks to move a board into a space or under a folder. Provide the board and the content item id of the destination space or folder.`,
    params: [
      {
        name: 'miro_url',
        type: 'string',
        required: true,
        description: `Full Miro board URL (e.g., 'https://miro.com/app/board/uXjVOakxTk0='). To target a specific parent frame, include ?moveToWidget=<frame_id>.`,
      },
      {
        name: 'target_parent_content_item_id',
        type: 'string',
        required: true,
        description: `Content item id of the destination space or folder.`,
      },
      {
        name: 'invocation_source',
        type: 'string',
        required: false,
        description: `Identifies what triggered this tool call. Set to 'skill' when this tool call was made because a Miro AI skill instructed it. Set to 'ui' when invoked from the Miro MCP UI. Leave unset otherwise.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `Set to true when the folder you are operating in is a source-control repository (for example a Git working directory); set to false otherwise. Defaults to false.`,
      },
    ],
  },
  {
    name: 'miromcp_board_move_to_team',
    description: `Move a board to a different team.`,
    params: [
      {
        name: 'miro_url',
        type: 'string',
        required: true,
        description: `Full Miro board URL (e.g., 'https://miro.com/app/board/uXjVOakxTk0='). To target a specific parent frame, include ?moveToWidget=<frame_id>.`,
      },
      {
        name: 'target_team_id',
        type: 'integer',
        required: true,
        description: `Numeric identifier of the destination team`,
      },
      {
        name: 'invocation_source',
        type: 'string',
        required: false,
        description: `Tells the server what triggered this particular call. Populate with 'skill' if a Miro AI skill directed the call, with 'ui' if it originated from the Miro MCP interface, and leave it out for any other caller.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `True if the working directory for this call is a source-controlled repository (a checked-out Git project, for instance); false in every other case.`,
      },
    ],
  },
  {
    name: 'miromcp_board_restore',
    description: `Restore one or more boards from trash.`,
    params: [
      {
        name: 'board_urls',
        type: 'array',
        required: true,
        description: `Full Miro board URLs to restore from trash`,
      },
      {
        name: 'invocation_source',
        type: 'string',
        required: false,
        description: `Identifies what triggered this tool call. Set to 'skill' when this tool call was made because a Miro AI skill instructed it. Set to 'ui' when invoked from the Miro MCP UI. Leave unset otherwise.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `Set to true when the folder you are operating in is a source-control repository (for example a Git working directory); set to false otherwise. Defaults to false.`,
      },
    ],
  },
  {
    name: 'miromcp_board_role_update',
    description: `Change the role of a user or user group that already has access to a board. If they do not yet have access, use board_share instead. IMPORTANT: Always confirm with the user before changing who can access a board.`,
    params: [
      {
        name: 'miro_url',
        type: 'string',
        required: true,
        description: `Full Miro board URL (e.g., 'https://miro.com/app/board/uXjVOakxTk0='). To target a specific parent frame, include ?moveToWidget=<frame_id>.`,
      },
      {
        name: 'role',
        type: 'string',
        required: true,
        description: `Role to assign: owner, coowner, editor, commenter, or viewer (from most to least access).`,
      },
      {
        name: 'subject_id',
        type: 'string',
        required: true,
        description: `Identifier of the user or user group. For a user this can be the user's email or user id; for a user group this is the group id.`,
      },
      {
        name: 'subject_type',
        type: 'string',
        required: true,
        description: `Whether the subject is an individual user or a user group`,
      },
      {
        name: 'invocation_source',
        type: 'string',
        required: false,
        description: `Identifies what triggered this tool call. Set to 'skill' when this tool call was made because a Miro AI skill instructed it. Set to 'ui' when invoked from the Miro MCP UI. Leave unset otherwise.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `Set to true when the folder you are operating in is a source-control repository (for example a Git working directory); set to false otherwise. Defaults to false.`,
      },
    ],
  },
  {
    name: 'miromcp_board_search_boards',
    description: `Search and list boards accessible to the current user, scoped to their team. Returns board metadata — name and URL — suitable for navigating to a specific board or discovering relevant boards before operating on them. Use this tool when the user wants to find a board by name or description, or discover which boards are available before using other board tools. Supports offset-based pagination.`,
    params: [
      {
        name: 'include_content',
        type: 'boolean',
        required: false,
        description: `When true, searches inside board content in addition to names and descriptions.`,
      },
      {
        name: 'invocation_source',
        type: 'string',
        required: false,
        description: `Identifies what triggered this tool call.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `Set to true when operating in a source-control repository folder, false otherwise.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of boards to return per page. Range: 1-50.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Zero-based index of the first board to return for pagination.`,
      },
      {
        name: 'owned_by_me',
        type: 'boolean',
        required: false,
        description: `When true, restricts results to boards owned by the current user.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Text to search for in board names and descriptions. Leave empty to list all accessible boards.`,
      },
    ],
  },
  {
    name: 'miromcp_board_share',
    description: `Grant a user or user group access to a board with a specific role. Use to share a board with someone who does not yet have access. If they already have a role, use board_role_update instead. IMPORTANT: Always confirm with the user before changing who can access a board.`,
    params: [
      {
        name: 'miro_url',
        type: 'string',
        required: true,
        description: `Full Miro board URL (e.g., 'https://miro.com/app/board/uXjVOakxTk0='). To target a specific parent frame, include ?moveToWidget=<frame_id>.`,
      },
      {
        name: 'role',
        type: 'string',
        required: true,
        description: `Role to assign: owner, coowner, editor, commenter, or viewer (from most to least access).`,
      },
      {
        name: 'subject_id',
        type: 'string',
        required: true,
        description: `Identifier of the user or user group. For a user this can be the user's email or user id; for a user group this is the group id.`,
      },
      {
        name: 'subject_type',
        type: 'string',
        required: true,
        description: `Whether the subject is an individual user or a user group`,
      },
      {
        name: 'invocation_source',
        type: 'string',
        required: false,
        description: `Identifies what triggered this tool call. Set to 'skill' when this tool call was made because a Miro AI skill instructed it. Set to 'ui' when invoked from the Miro MCP UI. Leave unset otherwise.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `Set to true when the folder you are operating in is a source-control repository (for example a Git working directory); set to false otherwise. Defaults to false.`,
      },
    ],
  },
  {
    name: 'miromcp_board_update_metadata',
    description: `Update a board's title, description and/or icon emoji. Omitted fields are left unchanged. To remove the board's icon, pass an empty string as icon_emoji.`,
    params: [
      {
        name: 'miro_url',
        type: 'string',
        required: true,
        description: `Full Miro board URL (e.g., 'https://miro.com/app/board/uXjVOakxTk0='). To target a specific parent frame, include ?moveToWidget=<frame_id>.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New board description`,
      },
      {
        name: 'icon_emoji',
        type: 'string',
        required: false,
        description: `New single-emoji icon for the board, e.g. "🚀". Omit to leave the icon unchanged; pass an empty string to remove it.`,
      },
      {
        name: 'invocation_source',
        type: 'string',
        required: false,
        description: `Identifies what triggered this tool call. Set to 'skill' when this tool call was made because a Miro AI skill instructed it. Set to 'ui' when invoked from the Miro MCP UI. Leave unset otherwise.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `Set to true when the folder you are operating in is a source-control repository (for example a Git working directory); set to false otherwise. Defaults to false.`,
      },
      { name: 'title', type: 'string', required: false, description: `New board title` },
    ],
  },
  {
    name: 'miromcp_canvas_create_from_svg',
    description: `Create board items from a canvas-composer SVG document. Parses the SVG into Miro widgets -- shapes, stickies, text, connectors, frames, tables, docs, images, AND structured Mermaid diagrams (flowchart, ERD, UML class/sequence, authored as a <foreignObject data-type="diagram"> with a Mermaid body). This is the primary tool for creating ANY board content, diagrams included: requests like 'create a diagram', 'draw a flowchart', or 'diagram X using mermaid' are handled here, NOT by the legacy diagram_* tools. Returns a result_svg with data-miro-id stamped on every svg element for the next iteration.`,
    params: [
      {
        name: 'miro_url',
        type: 'string',
        required: true,
        description: `Full Miro board URL (e.g., 'https://miro.com/app/board/uXjVOakxTk0='). To target a specific parent frame, include ?moveToWidget=<frame_id>.`,
      },
      {
        name: 'svg',
        type: 'string',
        required: true,
        description: `A board written in the Canvas Composer SVG format.`,
      },
      {
        name: 'invocation_source',
        type: 'string',
        required: false,
        description: `Identifies what triggered this tool call. Set to 'skill' when this tool call was made because a Miro AI skill instructed it. Set to 'ui' when invoked from the Miro MCP UI. Leave unset otherwise.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `Set to true when the folder you are operating in is a source-control repository (for example a Git working directory); set to false otherwise. Defaults to false.`,
      },
    ],
  },
  {
    name: 'miromcp_canvas_get_canvas_composer_skill',
    description: `Get the DSL (Domain-Specific Language) format specification for creating board items. Returns syntax rules, item types, valid colors, valid shape types, and a complete example. REQUIRED and FIRST: call this before canvas_create_from_svg, and before canvas_load_format_skill, to learn the SVG board format. This is the foundational skill -- every use-case skill from canvas_load_format_skill (e.g. diagramming) layers on top of it and assumes you already have it, so never load a format skill before this one. In a conversation, call this only once and reuse the specification.`,
    params: [
      {
        name: 'invocation_source',
        type: 'string',
        required: false,
        description: `Identifies what triggered this tool call. Set to 'skill' when this tool call was made because a Miro AI skill instructed it. Set to 'ui' when invoked from the Miro MCP UI. Leave unset otherwise.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `Set to true when the folder you are operating in is a source-control repository (for example a Git working directory); set to false otherwise. Defaults to false.`,
      },
    ],
  },
  {
    name: 'miromcp_canvas_load_format_skill',
    description: `Load supplementary authoring guidance (a skill) for a specific composition format, layered ON TOP OF the general canvas format. PREREQUISITE: call canvas_get_canvas_composer_skill FIRST -- this tool assumes you already know the SVG board format and only adds format-specific styling and examples. Do not call it as your first step, and never in place of the composer skill. Content is still created with canvas_create_from_svg / canvas_update_from_svg. Available formats: 'diagramming' (styling and worked examples for Mermaid diagram widgets). For 'diagramming', pass the notation you are drawing to get that notation's color defaults and worked example. Call once per format/notation in a conversation and reuse the guidance.`,
    params: [
      {
        name: 'format_name',
        type: 'string',
        required: true,
        description: `The composition format to load guidance for. 'diagramming' for styling and worked examples of Mermaid diagram widgets.`,
      },
      {
        name: 'invocation_source',
        type: 'string',
        required: false,
        description: `Identifies what triggered this tool call. You must populate this field. Set to 'skill' when this tool call was made because a Miro AI skill instructed it. Set to 'ui' when invoked from the Miro MCP UI. Leave unset otherwise.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `Set to true when the folder you are operating in is a source-control repository (for example a Git working directory); set to false otherwise. You must populate this field. Defaults to false.`,
      },
      {
        name: 'notation',
        type: 'string',
        required: false,
        description: `For format_name='diagramming', the diagram notation you are drawing: 'flowchart', 'entity_relationship', 'uml_class', or 'uml_sequence' for a Mermaid diagram widget, or 'free_form' for a hand-assembled diagram from shapes and connectors (use only when no Mermaid notation and no native widget fits, e.g. a mind map). Returns that notation's guidance. Omit to get the shared color contract plus the list of supported notations.`,
      },
    ],
  },
  {
    name: 'miromcp_canvas_read_as_svg',
    description: `Read existing board items and return them as a canvas-composer SVG document. Every element carries a data-miro-id so the SVG can be edited and fed back into canvas_update_from_svg. Unsupported (foreign) items are recorded but not drawn. By default the whole board is read; to keep the response small on large boards, scope the read to a subset with widget_ids (an explicit list of item ids). Ancestor frames of any selected item are included automatically.`,
    params: [
      {
        name: 'miro_url',
        type: 'string',
        required: true,
        description: `Full Miro board URL (e.g., 'https://miro.com/app/board/uXjVOakxTk0='). To target a specific parent frame, include ?moveToWidget=<frame_id>.`,
      },
      {
        name: 'invocation_source',
        type: 'string',
        required: false,
        description: `Identifies what triggered this tool call. You must populate this field. Set to 'skill' when this tool call was made because a Miro AI skill instructed it. Set to 'ui' when invoked from the Miro MCP UI. Leave unset otherwise.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `Set to true when the folder you are operating in is a source-control repository (for example a Git working directory); set to false otherwise. You must populate this field. Defaults to false.`,
      },
      {
        name: 'widget_ids',
        type: 'array',
        required: false,
        description: `Optional. Return only these items instead of the whole board, identified by their data-miro-id values (the same ids retrieve_board_context reports). Read just the items you intend to edit to keep the response small on large boards. Ancestor frames of any selected item are added automatically so positions stay correct. Unknown ids are skipped. Omit to read the whole board.`,
      },
    ],
  },
  {
    name: 'miromcp_canvas_update_from_svg',
    description: `Apply a canvas-composer SVG document to the board by diffing it against the live board (matched on data-miro-id) and applying only the deltas: it creates new elements, updates existing ones, and deletes elements explicitly marked with data-deleted="true" (which must carry the element's data-miro-id). Removing an element from the SVG does NOT delete it, deletion is explicit per element, so a partial document is always safe. Deletion is destructive and not undoable here: confirm the specific items with the user before sending any data-deleted="true". Feed the result_svg from a previous canvas_create_from_svg or canvas_update_from_svg call back in to iterate. Returns a result_svg with data-miro-id stamped on every element for the next iteration.`,
    params: [
      {
        name: 'miro_url',
        type: 'string',
        required: true,
        description: `Full Miro board URL (e.g., 'https://miro.com/app/board/uXjVOakxTk0='). To target a specific parent frame, include ?moveToWidget=<frame_id>.`,
      },
      {
        name: 'svg',
        type: 'string',
        required: true,
        description: `A board written in the Canvas Composer SVG format.`,
      },
      {
        name: 'invocation_source',
        type: 'string',
        required: false,
        description: `Identifies what triggered this tool call. You must populate this field. Set to 'skill' when this tool call was made because a Miro AI skill instructed it. Set to 'ui' when invoked from the Miro MCP UI. Leave unset otherwise.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `Set to true when the folder you are operating in is a source-control repository (for example a Git working directory); set to false otherwise. You must populate this field. Defaults to false.`,
      },
    ],
  },
  {
    name: 'miromcp_code_widget_create',
    description: `Create a code widget on a Miro board. The widget displays syntax-highlighted source code with an optional title and line numbers. Coordinates are board-absolute (center is 0,0) unless a frame is targeted via moveToWidget, in which case x/y are relative to the frame's top-left corner.`,
    params: [
      {
        name: 'code',
        type: 'string',
        required: true,
        description: `Source code content to display in the widget.`,
      },
      {
        name: 'height',
        type: 'number',
        required: false,
        description: `Height of the code widget in pixels. Defaults to 100.`,
      },
      {
        name: 'invocation_source',
        type: 'string',
        required: false,
        description: `Identifies what triggered this tool call.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `Set to true when operating in a source-control repository folder, false otherwise.`,
      },
      {
        name: 'language',
        type: 'string',
        required: false,
        description: `Programming language for syntax highlighting. Defaults to PlainText when omitted.`,
      },
      {
        name: 'line_numbers_visible',
        type: 'boolean',
        required: false,
        description: `Whether to show line numbers in the code widget. Defaults to true.`,
      },
      {
        name: 'miro_url',
        type: 'string',
        required: false,
        description: `Full Miro board URL. If not provided, a new board will be created (requires user confirmation).`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Display title for the code widget.`,
      },
      {
        name: 'width',
        type: 'number',
        required: false,
        description: `Width of the code widget in pixels. Defaults to 800.`,
      },
      {
        name: 'x',
        type: 'number',
        required: false,
        description: `X-axis coordinate for widget placement.`,
      },
      {
        name: 'y',
        type: 'number',
        required: false,
        description: `Y-axis coordinate for widget placement.`,
      },
    ],
  },
  {
    name: 'miromcp_code_widget_delete',
    description: `Delete a code widget from a Miro board. This action permanently removes the widget and cannot be undone.`,
    params: [
      {
        name: 'miro_url',
        type: 'string',
        required: true,
        description: `Full Miro URL to a specific code widget item.`,
      },
      {
        name: 'invocation_source',
        type: 'string',
        required: false,
        description: `Identifies what triggered this tool call.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `Set to true when operating in a source-control repository folder, false otherwise.`,
      },
    ],
  },
  {
    name: 'miromcp_code_widget_get',
    description: `Read a code widget from a Miro board, returning its source code, language, title, and position.`,
    params: [
      {
        name: 'miro_url',
        type: 'string',
        required: true,
        description: `Full Miro URL to a specific code widget item.`,
      },
      {
        name: 'invocation_source',
        type: 'string',
        required: false,
        description: `Identifies what triggered this tool call.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `Set to true when operating in a source-control repository folder, false otherwise.`,
      },
    ],
  },
  {
    name: 'miromcp_code_widget_list_items',
    description: `List code widgets on a Miro board. Returns a paginated list of all code widget items on the board. Use the cursor from a previous response to retrieve the next page.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous list response. Omit to start from the beginning.`,
      },
      {
        name: 'invocation_source',
        type: 'string',
        required: false,
        description: `Identifies what triggered this tool call.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `Set to true when operating in a source-control repository folder, false otherwise.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of items to return (10-50). Defaults to 10.`,
      },
      {
        name: 'miro_url',
        type: 'string',
        required: false,
        description: `Full Miro board URL. If not provided, a new board will be created (requires user confirmation).`,
      },
    ],
  },
  {
    name: 'miromcp_code_widget_update',
    description: `Update an existing code widget on a Miro board. All fields are optional — only the provided fields are updated.`,
    params: [
      {
        name: 'miro_url',
        type: 'string',
        required: true,
        description: `Full Miro URL to a specific code widget item.`,
      },
      {
        name: 'code',
        type: 'string',
        required: false,
        description: `New source code content. Omit to leave unchanged.`,
      },
      {
        name: 'height',
        type: 'number',
        required: false,
        description: `New height in pixels. Omit to leave unchanged.`,
      },
      {
        name: 'invocation_source',
        type: 'string',
        required: false,
        description: `Identifies what triggered this tool call.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `Set to true when operating in a source-control repository folder, false otherwise.`,
      },
      {
        name: 'language',
        type: 'string',
        required: false,
        description: `New programming language for syntax highlighting. Omit to leave unchanged.`,
      },
      {
        name: 'line_numbers_visible',
        type: 'boolean',
        required: false,
        description: `Whether to show line numbers. Omit to leave unchanged.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `New display title. Omit to leave unchanged.`,
      },
      {
        name: 'width',
        type: 'number',
        required: false,
        description: `New width in pixels. Omit to leave unchanged.`,
      },
      {
        name: 'x',
        type: 'number',
        required: false,
        description: `New X-axis coordinate. Omit to leave unchanged.`,
      },
      {
        name: 'y',
        type: 'number',
        required: false,
        description: `New Y-axis coordinate. Omit to leave unchanged.`,
      },
    ],
  },
  {
    name: 'miromcp_comment_create',
    description: `Create a new comment on the Miro board canvas. The comment appears at the specified canvas coordinates and is attributed to the current user. To attach the comment to an existing board item, pass a URL that targets that item. Use list_comments to read existing comments and their positions.`,
    params: [
      {
        name: 'content',
        type: 'string',
        required: true,
        description: `Text content of the comment.`,
      },
      {
        name: 'miro_url',
        type: 'string',
        required: true,
        description: `Miro board URL. Can be a plain board URL or include moveToWidget/focusWidget parameter to target a specific item.`,
      },
      {
        name: 'x',
        type: 'number',
        required: true,
        description: `X-axis coordinate of the comment on the canvas.`,
      },
      {
        name: 'y',
        type: 'number',
        required: true,
        description: `Y-axis coordinate of the comment on the canvas.`,
      },
      {
        name: 'invocation_source',
        type: 'string',
        required: false,
        description: `Identifies what triggered this tool call.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `Set to true when the folder you are operating in is a source-control repository; set to false otherwise.`,
      },
    ],
  },
  {
    name: 'miromcp_comment_list_comments',
    description: `List comments from a Miro board or a specific item on the board. Comments include author information, messages (original comment and replies), reactions, resolved status, and position. Use limit and offset for pagination. Use from_date and to_date to filter by creation time. Use resolved to filter by resolved status.`,
    params: [
      {
        name: 'miro_url',
        type: 'string',
        required: true,
        description: `Miro board URL. Can be a plain board URL or include moveToWidget/focusWidget parameter to target a specific item.`,
      },
      {
        name: 'from_date',
        type: 'string',
        required: false,
        description: `Return only comments created at or after this date. Format: ISO 8601.`,
      },
      {
        name: 'invocation_source',
        type: 'string',
        required: false,
        description: `Identifies what triggered this tool call.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `Set to true when the folder you are operating in is a source-control repository; set to false otherwise.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of comments to return per page. Range: 1-50. Default: 20.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Zero-based offset for pagination. Default: 0.`,
      },
      {
        name: 'resolved',
        type: 'boolean',
        required: false,
        description: `Filter by resolved status. true returns only resolved comments, false returns only unresolved. Omit to return all comments.`,
      },
      {
        name: 'to_date',
        type: 'string',
        required: false,
        description: `Return only comments created at or before this date. Format: ISO 8601.`,
      },
    ],
  },
  {
    name: 'miromcp_comment_reply',
    description: `Add a reply message to an existing comment thread on a Miro board. Use list_comments to find comment IDs. The reply appears as the last message in the thread and is attributed to the current user.`,
    params: [
      {
        name: 'comment_id',
        type: 'string',
        required: true,
        description: `ID of the comment thread to reply to. Obtain from comment_list_comments.`,
      },
      {
        name: 'content',
        type: 'string',
        required: true,
        description: `Text content of the reply message.`,
      },
      {
        name: 'miro_url',
        type: 'string',
        required: true,
        description: `Miro board URL. Can be a plain board URL or include moveToWidget/focusWidget parameter to target a specific item.`,
      },
      {
        name: 'invocation_source',
        type: 'string',
        required: false,
        description: `Identifies what triggered this tool call.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `Set to true when the folder you are operating in is a source-control repository; set to false otherwise.`,
      },
    ],
  },
  {
    name: 'miromcp_comment_resolve',
    description: `Resolve or unresolve a comment thread on a Miro board. Resolving marks the thread as addressed; unresolving reopens it. Use list_comments with resolved=false to find open threads.`,
    params: [
      {
        name: 'comment_id',
        type: 'string',
        required: true,
        description: `ID of the comment thread to resolve or unresolve. Obtain from comment_list_comments.`,
      },
      {
        name: 'miro_url',
        type: 'string',
        required: true,
        description: `Miro board URL. Can be a plain board URL or include moveToWidget/focusWidget parameter to target a specific item.`,
      },
      {
        name: 'resolved',
        type: 'boolean',
        required: true,
        description: `Set to true to resolve the thread, false to unresolve it.`,
      },
      {
        name: 'invocation_source',
        type: 'string',
        required: false,
        description: `Identifies what triggered this tool call.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `Set to true when the folder you are operating in is a source-control repository; set to false otherwise.`,
      },
    ],
  },
  {
    name: 'miromcp_content_item_list_roles',
    description: `List who can access a board or space and the role each of them holds. Use this to answer who a board or space is shared with, or what access somebody has. Each entry names the subject, its kind, the role it holds and, for users, their email address. User groups have no email, so identify them by their subject id. Entries whose kind is 'user' or 'user_group' and whose role is one of owner, coowner, editor, commenter or viewer can be fed straight into board_role_update or space_role_update. Access granted by other means is still listed, under its own kind or role name such as 'team' or 'private', and cannot be changed with those tools. Results are paginated: pass the returned cursor back to fetch the next page.`,
    params: [
      {
        name: 'content_item_url',
        type: 'string',
        required: true,
        description: `The board or space to inspect. Give a full Miro board URL (e.g., 'https://miro.com/app/board/uXjVOakxTk0='), a full Miro space URL (e.g., 'https://miro.com/app/dashboard/space/0VM5RHCprOu2MnOHXLqp3f'), or the content item id of either on its own (e.g., '0VM5RHCprOu2MnOHXLqp3f') - a content item id identifies a board just as well as a space. A board key on its own is not accepted; use the board URL for that.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Opaque cursor token for fetching the next page`,
      },
      {
        name: 'invocation_source',
        type: 'string',
        required: false,
        description: `Identifies what triggered this tool call. You must populate this field. Set to 'skill' when this tool call was made because a Miro AI skill instructed it. Set to 'ui' when invoked from the Miro MCP UI. Leave unset otherwise.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `Set to true when the folder you are operating in is a source-control repository (for example a Git working directory); set to false otherwise. You must populate this field. Defaults to false.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum entries per page (1-100)`,
      },
    ],
  },
  {
    name: 'miromcp_context_explore',
    description: `Explore high-level items on a Miro board. Returns a list of frames, documents, prototypes (interactive design mockups with multiple UI screens), individual prototype screens, tables, and diagrams with their URLs and titles. Use this to discover what's on a board before retrieving detailed content with context_get. Returns 'total' (item count) and, for large boards, a 'message' recommending that you retrieve context per item rather than requesting a whole-board context_get overview.`,
    params: [
      {
        name: 'miro_url',
        type: 'string',
        required: true,
        description: `Full Miro board URL, optionally with a frame target via moveToWidget query parameter.`,
      },
      {
        name: 'invocation_source',
        type: 'string',
        required: false,
        description: `Identifies what triggered this tool call.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `Set to true when operating in a source-control repository folder, false otherwise.`,
      },
    ],
  },
  {
    name: 'miromcp_context_get',
    description: `Get text context from a Miro board or a specific item on a board. When a plain board URL is provided (no moveToWidget parameter): returns an AI-generated overview summarizing the entire board contents. This whole-board overview can be slow or time out on very large boards; for a large or unfamiliar board, call context_explore first, and if it reports many items (see its 'total' and 'message'), retrieve context per item (context_get with each item's moveToWidget URL) instead of the whole-board overview. When a URL with moveToWidget/focusWidget parameter is provided: returns detailed content for that specific item. For documents: returns Markdown content of the document. For prototype screens: returns HTML markup representing the UI/layout of that specific screen within an interactive design prototype. For prototype containers: returns AI-generated map of all screens with navigation flow. For frames: generates AI summary of frame contents. For tables: returns formatted table data. For diagrams: returns Mermaid code when available, otherwise an AI-generated description and analysis of the diagram structure.`,
    params: [
      {
        name: 'miro_url',
        type: 'string',
        required: true,
        description: `Miro board URL, either plain for a board overview or with moveToWidget/focusWidget to get content for a specific item.`,
      },
      {
        name: 'invocation_source',
        type: 'string',
        required: false,
        description: `Identifies what triggered this tool call.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `Set to true when operating in a source-control repository folder, false otherwise.`,
      },
    ],
  },
  {
    name: 'miromcp_diagram_create',
    description: `Create a diagram on a Miro board from DSL (Domain-Specific Language) text. Call diagram_get_dsl first to obtain the correct DSL format for the diagram type, then pass the generated DSL here. Supported types: flowchart, uml_class, uml_sequence, entity_relationship.`,
    params: [
      {
        name: 'diagram_dsl',
        type: 'string',
        required: true,
        description: `DSL text defining the diagram, following the format specification from diagram_get_dsl.`,
      },
      {
        name: 'diagram_type',
        type: 'string',
        required: true,
        description: `Type of diagram to create. Must match the type used when calling diagram_get_dsl.`,
      },
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `Required title for the diagram.`,
      },
      {
        name: 'invocation_source',
        type: 'string',
        required: false,
        description: `Identifies what triggered this tool call.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `Set to true when operating in a source-control repository folder, false otherwise.`,
      },
      {
        name: 'miro_url',
        type: 'string',
        required: false,
        description: `Full Miro board URL where the diagram will be placed. If not provided, a new board is created (requires user confirmation).`,
      },
      {
        name: 'x',
        type: 'number',
        required: false,
        description: `X-axis coordinate for diagram placement on the board.`,
      },
      {
        name: 'y',
        type: 'number',
        required: false,
        description: `Y-axis coordinate for diagram placement on the board.`,
      },
    ],
  },
  {
    name: 'miromcp_diagram_create_mermaid',
    description: `DEPRECATED and superseded by canvas_create_from_svg (author a <foreignObject data-type="diagram"> with a Mermaid body; see canvas_get_canvas_composer_skill + canvas_load_format_skill(format_name='diagramming')). Do NOT choose this tool for diagram or Mermaid requests -- 'create a diagram', 'draw a flowchart', 'diagram X using mermaid' all go to canvas_create_from_svg. Use this legacy tool ONLY when the user explicitly asks for the old diagram tools by name; never select it on your own based on the task. Will be removed after the canvas diagram path reaches GA. (Legacy behavior: creates a structured diagram from Mermaid syntax up to v10; if no board URL is provided a new board is created, so confirm with the user first.)`,
    params: [
      {
        name: 'diagram_type',
        type: 'string',
        required: true,
        description: `Type of diagram to create (e.g. 'flowchart', 'sequence', 'class').`,
      },
      {
        name: 'mermaid_code',
        type: 'string',
        required: true,
        description: `Valid Mermaid syntax for the diagram, up to v10. For example: 'flowchart TD\\n    A --> B --> C'. `,
      },
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `Title for the diagram widget.`,
      },
      {
        name: 'invocation_source',
        type: 'string',
        required: false,
        description: `Identifies what triggered this tool call. You must populate this field. Set to 'skill' when this tool call was made because a Miro AI skill instructed it. Set to 'ui' when invoked from the Miro MCP UI. Leave unset otherwise.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `Set to true when the folder you are operating in is a source-control repository (for example a Git working directory); set to false otherwise. You must populate this field. Defaults to false.`,
      },
      {
        name: 'miro_url',
        type: 'string',
        required: false,
        description: `Full Miro board URL (e.g., 'https://miro.com/app/board/uXjVOakxTk0='). If not provided, a new board will be created (requires user confirmation). To target a specific parent frame, include ?moveToWidget=<frame_id>.`,
      },
      {
        name: 'x',
        type: 'number',
        required: false,
        description: `X-axis coordinate for diagram placement. Without a frame target: board-absolute, board center is x=0. With a frame target via moveToWidget: relative to the frame's top-left corner (frame top-left is x=0). Use different x values to prevent overlap when creating multiple items.`,
      },
      {
        name: 'y',
        type: 'number',
        required: false,
        description: `Y-axis coordinate for diagram placement. Without a frame target: board-absolute, board center is y=0. With a frame target via moveToWidget: relative to the frame's top-left corner (frame top-left is y=0). Use different y values to prevent overlap when creating multiple items.`,
      },
    ],
  },
  {
    name: 'miromcp_diagram_get_dsl',
    description: `Get the DSL (Domain-Specific Language) format specification for a diagram type, including rules, syntax, color guidelines, and examples needed to write valid DSL. Call this before diagram_create to understand the expected format; you only need to call it once per diagram type per conversation.`,
    params: [
      {
        name: 'diagram_type',
        type: 'string',
        required: true,
        description: `Type of diagram to get the DSL format specification for.`,
      },
      {
        name: 'miro_url',
        type: 'string',
        required: true,
        description: `Full Miro board URL, optionally with a frame target via moveToWidget query parameter.`,
      },
      {
        name: 'invocation_source',
        type: 'string',
        required: false,
        description: `Identifies what triggered this tool call.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `Set to true when operating in a source-control repository folder, false otherwise.`,
      },
    ],
  },
  {
    name: 'miromcp_diagram_get_mermaid_instructions',
    description: `DEPRECATED and superseded by canvas_get_canvas_composer_skill + canvas_load_format_skill(format_name='diagramming'). Do NOT choose this tool for Mermaid or diagram requests -- 'create a diagram', 'draw a flowchart', 'diagram X using mermaid' are all handled by the canvas path. Use this legacy tool ONLY when the user explicitly asks for the old diagram tools by name; never select it on your own based on the task. Will be removed after the canvas diagram path reaches GA. (Legacy behavior: returns guidance for writing Mermaid syntax, used before diagram_create_mermaid.)`,
    params: [
      {
        name: 'diagram_type',
        type: 'string',
        required: true,
        description: `Type of diagram to get the Mermaid guidance for. Options: 'flowchart' for process flows and workflows, 'uml_class' for UML class diagrams showing class structures and inheritance, 'uml_sequence' for UML sequence diagrams showing interactions over time, 'entity_relationship' for ERD database schema diagrams.`,
      },
      {
        name: 'miro_url',
        type: 'string',
        required: true,
        description: `Full Miro board URL (e.g., 'https://miro.com/app/board/uXjVOakxTk0='). To target a specific parent frame, include ?moveToWidget=<frame_id>.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `Set to true when the folder you are operating in is a source-control repository (for example a Git working directory); set to false otherwise. You must populate this field. Defaults to false.`,
      },
    ],
  },
  {
    name: 'miromcp_diagram_update_mermaid',
    description: `DEPRECATED and superseded by canvas_update_from_svg (send the diagram's <foreignObject data-type="diagram"> back with its data-miro-id and a new Mermaid body; see canvas_get_canvas_composer_skill + canvas_load_format_skill(format_name='diagramming')). Do NOT choose this tool for diagram or Mermaid requests. Use it ONLY when the user explicitly asks for the old diagram tools by name; never select it on your own based on the task. Will be removed after the canvas diagram path reaches GA. (Legacy behavior: fully replaces the Mermaid code of a diagram previously created with diagram_create_mermaid; does not work on diagrams made with the legacy diagram_create tool.)`,
    params: [
      {
        name: 'diagram_type',
        type: 'string',
        required: true,
        description: `Type of diagram to update (e.g. 'flowchart', 'sequence', 'class').`,
      },
      {
        name: 'mermaid_code',
        type: 'string',
        required: true,
        description: `Complete new Mermaid body for the diagram, up to v10. Replaces the existing code verbatim. For example: 'flowchart TD\\n    A --> B --> C'.`,
      },
      {
        name: 'miro_url',
        type: 'string',
        required: true,
        description: `Full Miro URL to a specific item (e.g., 'https://miro.com/app/board/uXjVOakxTk0=/?moveToWidget=3458764516062720430'). Must include moveToWidget or focusWidget query parameter.`,
      },
      {
        name: 'invocation_source',
        type: 'string',
        required: false,
        description: `Identifies what triggered this tool call. You must populate this field. Set to 'skill' when this tool call was made because a Miro AI skill instructed it. Set to 'ui' when invoked from the Miro MCP UI. Leave unset otherwise.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `Set to true when the folder you are operating in is a source-control repository (for example a Git working directory); set to false otherwise. You must populate this field. Defaults to false.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Title for the diagram widget.`,
      },
    ],
  },
  {
    name: 'miromcp_doc_create',
    description: `Create a doc format item (structured document similar to Google Docs) on a Miro board. Use this tool to add a document onto a board the user is already working on. If the user asks for a standalone document in Miro (e.g. 'create a doc about X') without pointing at an existing board, use board_create_format with format_type='document' instead - that creates the document as its own content item rather than a widget. Content accepts GitHub Flavored Markdown format, including headings, formatting, lists, links, tables, and blockquotes. Blocks inside callouts and blockquotes are not supported. Coordinates: when the URL has no item target, x/y are board-absolute (board center is (0, 0)). When the URL targets a frame via moveToWidget, the document is created INSIDE that frame and x/y are relative to the frame's top-left corner; (0, 0) is the frame's top-left, x/y mark the document's top-left corner, and the document must fit within the frame's width and height. The default doc width is 800px. If no board URL is provided, a new board will be created. IMPORTANT: Always confirm with the user before creating a new board.`,
    params: [
      {
        name: 'content',
        type: 'string',
        required: false,
        description: `The content of the document in markdown format.`,
      },
      {
        name: 'invocation_source',
        type: 'string',
        required: false,
        description: `Identifies what triggered this tool call. Set to 'skill' when invoked by a Miro AI skill, 'ui' when invoked from the Miro MCP UI, or leave unset otherwise.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `Set to true when the folder you are operating in is a source-control repository; set to false otherwise.`,
      },
      {
        name: 'miro_url',
        type: 'string',
        required: false,
        description: `Full Miro board URL (e.g., 'https://miro.com/app/board/uXjVOakxTk0='). If not provided, a new board will be created (requires user confirmation). To target a specific parent frame, include ?moveToWidget=<frame_id>.`,
      },
      {
        name: 'x',
        type: 'number',
        required: false,
        description: `X-axis coordinate for document placement. Without a frame target: board-absolute, board center is x=0. With a frame target via moveToWidget: relative to the frame's top-left corner (frame top-left is x=0).`,
      },
      {
        name: 'y',
        type: 'number',
        required: false,
        description: `Y-axis coordinate for document placement. Without a frame target: board-absolute, board center is y=0. With a frame target via moveToWidget: relative to the frame's top-left corner (frame top-left is y=0).`,
      },
    ],
  },
  {
    name: 'miromcp_doc_get',
    description: `Read the content of a doc format item from a Miro board. Returns the markdown content and content version for use in subsequent edits.`,
    params: [
      {
        name: 'miro_url',
        type: 'string',
        required: true,
        description: `Full Miro URL to a specific item (e.g., 'https://miro.com/app/board/uXjVOakxTk0=/?moveToWidget=3458764516062720430'). Must include moveToWidget or focusWidget query parameter.`,
      },
      {
        name: 'invocation_source',
        type: 'string',
        required: false,
        description: `Identifies what triggered this tool call. Set to 'skill' when invoked by a Miro AI skill, 'ui' when invoked from the Miro MCP UI, or leave unset otherwise.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `Set to true when the folder you are operating in is a source-control repository; set to false otherwise.`,
      },
    ],
  },
  {
    name: 'miromcp_doc_update',
    description: `Edit content in an existing doc format item using find-and-replace. Provide the exact text to find (old_content) and the text to replace it with (new_content). By default, only the first occurrence is replaced. Use replace_all=true to replace all occurrences.`,
    params: [
      {
        name: 'miro_url',
        type: 'string',
        required: true,
        description: `Full Miro URL to a specific item (e.g., 'https://miro.com/app/board/uXjVOakxTk0=/?moveToWidget=3458764516062720430'). Must include moveToWidget or focusWidget query parameter.`,
      },
      {
        name: 'invocation_source',
        type: 'string',
        required: false,
        description: `Identifies what triggered this tool call. Set to 'skill' when invoked by a Miro AI skill, 'ui' when invoked from the Miro MCP UI, or leave unset otherwise.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `Set to true when the folder you are operating in is a source-control repository; set to false otherwise.`,
      },
      {
        name: 'new_content',
        type: 'string',
        required: false,
        description: `The text to replace old_content with. Can be empty to delete the found text.`,
      },
      {
        name: 'old_content',
        type: 'string',
        required: false,
        description: `The exact text to find in the document. Must match exactly — read the document first to get the precise text.`,
      },
      {
        name: 'replace_all',
        type: 'boolean',
        required: false,
        description: `If true, replaces all occurrences of old_content. If false (default), replaces only the first occurrence.`,
      },
    ],
  },
  {
    name: 'miromcp_image_create',
    description: `Create an image item on a Miro board. Accepts either an upload token (from image_get_upload_url after the upload completes) or a publicly accessible image URL. Exactly one of image_token or image_url must be provided. When image_token is provided, title/x/y/width from the token (set at upload time) are used; any values supplied here for those fields are ignored. Coordinates: when the URL has no item target, x/y are board-absolute (board center is (0, 0)). When the URL targets a frame via moveToWidget, the image is created INSIDE that frame and x/y are relative to the frame's top-left corner; (0, 0) is the frame's top-left and the image must fit within the frame's width and height.`,
    params: [
      {
        name: 'miro_url',
        type: 'string',
        required: true,
        description: `Full Miro board URL (e.g., 'https://miro.com/app/board/uXjVOakxTk0='). To target a specific parent frame, include ?moveToWidget=<frame_id>.`,
      },
      {
        name: 'image_token',
        type: 'string',
        required: false,
        description: `Token returned by image_get_upload_url after the upload completes. Mutually exclusive with image_url.`,
      },
      {
        name: 'image_url',
        type: 'string',
        required: false,
        description: `Publicly accessible URL of the image to add to the board. Mutually exclusive with image_token.`,
      },
      {
        name: 'invocation_source',
        type: 'string',
        required: false,
        description: `Identifies what triggered this tool call. Set to 'skill' when invoked by a Miro AI skill, 'ui' when invoked from the Miro MCP UI, or leave unset otherwise.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `Set to true when the folder you are operating in is a source-control repository; set to false otherwise.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Optional title label for the image widget.`,
      },
      {
        name: 'width',
        type: 'number',
        required: false,
        description: `Image width in pixels. Height scales proportionally.`,
      },
      {
        name: 'x',
        type: 'number',
        required: false,
        description: `X-axis coordinate. Without a frame target: board-absolute, board center is x=0. With a frame target via moveToWidget: relative to the frame's top-left corner (frame top-left is x=0).`,
      },
      {
        name: 'y',
        type: 'number',
        required: false,
        description: `Y-axis coordinate. Without a frame target: board-absolute, board center is y=0. With a frame target via moveToWidget: relative to the frame's top-left corner (frame top-left is y=0).`,
      },
    ],
  },
  {
    name: 'miromcp_image_get_data',
    description: `Get the pixels of an image item on a Miro board. Use this when a layout shows an image (by its properties and source URL) and you need to see what the image actually depicts. Returns the image content directly.`,
    params: [
      {
        name: 'miro_url',
        type: 'string',
        required: true,
        description: `Full Miro URL to a specific item (e.g., 'https://miro.com/app/board/uXjVOakxTk0=/?moveToWidget=3458764516062720430'). Must include moveToWidget or focusWidget query parameter.`,
      },
      {
        name: 'invocation_source',
        type: 'string',
        required: false,
        description: `Identifies what triggered this tool call. Set to 'skill' when invoked by a Miro AI skill, 'ui' when invoked from the Miro MCP UI, or leave unset otherwise.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `Set to true when the folder you are operating in is a source-control repository; set to false otherwise.`,
      },
    ],
  },
  {
    name: 'miromcp_image_get_upload_url',
    description: `Get a single-use upload URL for a local image. Returns upload_url and a token. PUT the raw image bytes as the request body; set Content-Type to the image MIME type; no auth header. curl: curl -X PUT -H 'Content-Type: image/png' --data-binary @image.png '<upload_url>'. If the image only exists as in-memory bytes, write it to a local file first, then PUT that file. After upload, pass the returned token to any tool that accepts an image_token / image_tokens parameter — see each consumer tool's description for what it does with the upload. Max size: 6,000,000 bytes. Accepted types: image/bmp, image/gif, image/jpeg, image/png, image/svg+xml, image/vnd.adobe.photoshop.`,
    params: [
      {
        name: 'miro_url',
        type: 'string',
        required: true,
        description: `Full Miro board URL (e.g., 'https://miro.com/app/board/uXjVOakxTk0='). To target a specific parent frame, include ?moveToWidget=<frame_id>.`,
      },
      {
        name: 'content_type',
        type: 'string',
        required: false,
        description: `MIME type of the image to upload. Accepted: image/bmp, image/gif, image/jpeg, image/png, image/svg+xml, image/vnd.adobe.photoshop. When provided, the upload request Content-Type must match exactly.`,
      },
      {
        name: 'invocation_source',
        type: 'string',
        required: false,
        description: `Identifies what triggered this tool call. Set to 'skill' when invoked by a Miro AI skill, 'ui' when invoked from the Miro MCP UI, or leave unset otherwise.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `Set to true when the folder you are operating in is a source-control repository; set to false otherwise.`,
      },
      {
        name: 'src',
        type: 'string',
        required: false,
        description: `Only consumed by tools that rewrite HTML by src — currently prototype_create's and slides_create_html's image_tokens (i.e. a local file referenced from HTML). Set this to the EXACT string that appears as the src attribute in the HTML (e.g. './logo.png', 'assets/icon.svg') — matching is literal. The server rewrites every <img src=...> equal to this value with the uploaded board resource. Other consumers (image_create) ignore this field.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Optional title label for the image widget.`,
      },
      {
        name: 'width',
        type: 'number',
        required: false,
        description: `Image width in pixels. Height scales proportionally.`,
      },
      {
        name: 'x',
        type: 'number',
        required: false,
        description: `X-axis coordinate. Without a frame target: board-absolute, board center is x=0. With a frame target via moveToWidget: relative to the frame's top-left corner (frame top-left is x=0).`,
      },
      {
        name: 'y',
        type: 'number',
        required: false,
        description: `Y-axis coordinate. Without a frame target: board-absolute, board center is y=0. With a frame target via moveToWidget: relative to the frame's top-left corner (frame top-left is y=0).`,
      },
    ],
  },
  {
    name: 'miromcp_image_get_url',
    description: `Get image download URL for an image item from a Miro board.`,
    params: [
      {
        name: 'miro_url',
        type: 'string',
        required: true,
        description: `Full Miro URL to a specific item (e.g., 'https://miro.com/app/board/uXjVOakxTk0=/?moveToWidget=3458764516062720430'). Must include moveToWidget or focusWidget query parameter.`,
      },
      {
        name: 'invocation_source',
        type: 'string',
        required: false,
        description: `Identifies what triggered this tool call. Set to 'skill' when invoked by a Miro AI skill, 'ui' when invoked from the Miro MCP UI, or leave unset otherwise.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `Set to true when the folder you are operating in is a source-control repository; set to false otherwise.`,
      },
    ],
  },
  {
    name: 'miromcp_image_resource_upload',
    description: `Upload one or more images to Miro board resources for use in prototype HTML. Provide either image_urls (publicly accessible URLs) or image_tokens (from image_get_upload_url after upload) — not both. Returns one entry per input in the same order. On partial failure, retry only the failed indices.`,
    params: [
      {
        name: 'miro_url',
        type: 'string',
        required: true,
        description: `Full Miro board URL (e.g., 'https://miro.com/app/board/uXjVOakxTk0='). To target a specific parent frame, include ?moveToWidget=<frame_id>.`,
      },
      {
        name: 'image_tokens',
        type: 'array',
        required: false,
        description: `Tokens from image_get_upload_url after each image upload completes. Mutually exclusive with image_urls.`,
      },
      {
        name: 'image_urls',
        type: 'array',
        required: false,
        description: `Publicly accessible image URLs to upload as board resources. Mutually exclusive with image_tokens.`,
      },
      {
        name: 'invocation_source',
        type: 'string',
        required: false,
        description: `Identifies what triggered this tool call.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `Set to true when the folder you are operating in is a source-control repository; set to false otherwise.`,
      },
    ],
  },
  {
    name: 'miromcp_layout_create',
    description: `DEPRECATED - superseded by the canvas tools. Before using this tool, check whether canvas_create_from_svg is available to you. If it is, use canvas_create_from_svg instead and do not call this tool. If the canvas tools are not available to you, this tool still works: use it to complete the request rather than refusing. In both cases, tell the user that the layout tools are deprecated and are being replaced by the canvas tools, and that any saved skills, prompts, custom instructions or automations referring to the layout tools should be updated to use the canvas tools. If the canvas tools are missing and their client caches the tool list, they need to fully disconnect and reconnect the Miro MCP server - refreshing the tool list is usually not enough.
For generic board items — anything other than presentation slide decks. Use slides_create_html for those instead.
Create multiple board items (and connectors between them) on a Miro board from DSL (Domain-Specific Language) text. PREREQUISITE: Call layout_get_dsl first to obtain the DSL format specification. Items are created using board-absolute coordinates. Frames are always created first, then all other items, then connectors last (so they can reference items by alias). Returns a list of any items that failed to be created.`,
    params: [
      {
        name: 'dsl',
        type: 'string',
        required: true,
        description: `DSL text describing the items to create. Must follow the format from layout_get_dsl.`,
      },
      {
        name: 'miro_url',
        type: 'string',
        required: true,
        description: `Full Miro board URL (e.g., 'https://miro.com/app/board/uXjVOakxTk0='). To target a specific parent frame, include ?moveToWidget=<frame_id>.`,
      },
      {
        name: 'invocation_source',
        type: 'string',
        required: false,
        description: `Identifies what triggered this tool call.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `Set to true when the folder you are operating in is a source-control repository; set to false otherwise.`,
      },
    ],
  },
  {
    name: 'miromcp_layout_get_dsl',
    description: `DEPRECATED - superseded by the canvas tools. Before using this tool, check whether canvas_get_canvas_composer_skill is available to you. If it is, use canvas_get_canvas_composer_skill instead and do not call this tool. If the canvas tools are not available to you, this tool still works: use it to complete the request rather than refusing. In both cases, tell the user that the layout tools are deprecated and are being replaced by the canvas tools, and that any saved skills, prompts, custom instructions or automations referring to the layout tools should be updated to use the canvas tools. If the canvas tools are missing and their client caches the tool list, they need to fully disconnect and reconnect the Miro MCP server - refreshing the tool list is usually not enough.
Get the DSL (Domain-Specific Language) format specification for creating board items and connectors. Returns syntax rules, item types, connector syntax, valid colors, valid shape types, and a complete example. REQUIRED: Call this before layout_create to understand the DSL format. In a conversation, call this only once and reuse the specification.`,
    params: [
      {
        name: 'invocation_source',
        type: 'string',
        required: false,
        description: `Identifies what triggered this tool call.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `Set to true when the folder you are operating in is a source-control repository; set to false otherwise.`,
      },
    ],
  },
  {
    name: 'miromcp_layout_read',
    description: `DEPRECATED - superseded by the canvas tools. Before using this tool, check whether canvas_read_as_svg is available to you. If it is, use canvas_read_as_svg instead and do not call this tool. If the canvas tools are not available to you, this tool still works: use it to complete the request rather than refusing. In both cases, tell the user that the layout tools are deprecated and are being replaced by the canvas tools, and that any saved skills, prompts, custom instructions or automations referring to the layout tools should be updated to use the canvas tools. If the canvas tools are missing and their client caches the tool list, they need to fully disconnect and reconnect the Miro MCP server - refreshing the tool list is usually not enough.
Read existing board items and return them as DSL text. When given a board URL, returns all supported top-level items (no frame children). When the URL targets a specific frame (via moveToWidget), returns the frame and its children. When the URL targets a non-frame item, returns just that item as DSL with full content. By default (mode=structured), DOCs and TABLEs are returned as shallow headers with read-only metadata (preview/length, schema/row count) so large boards stay token-light; open the DOC or TABLE by URL to read its full body. Pass mode=full to force inline DOC bodies and TABLE rows at any scope. Connectors between items in scope are returned as CONNECTOR lines (board and frame scope only). The returned DSL uses full Miro item URLs as ids and parent references; those URLs can be passed directly as miro_url to other tools (doc_get, table_list_rows, context_get, etc.) without modification, and fed back into layout_update for editing.`,
    params: [
      {
        name: 'miro_url',
        type: 'string',
        required: true,
        description: `Full Miro board URL (e.g., 'https://miro.com/app/board/uXjVOakxTk0='). To target a specific parent frame, include ?moveToWidget=<frame_id>.`,
      },
      {
        name: 'invocation_source',
        type: 'string',
        required: false,
        description: `Identifies what triggered this tool call.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `Set to true when the folder you are operating in is a source-control repository; set to false otherwise.`,
      },
      {
        name: 'mode',
        type: 'string',
        required: false,
        description: `DSL render mode: 'structured' (default) returns DOCs/TABLEs as one-line shallow headers; 'full' inlines DOC bodies and TABLE rows.`,
      },
    ],
  },
  {
    name: 'miromcp_layout_update',
    description: `DEPRECATED - superseded by the canvas tools. Before using this tool, check whether canvas_update_from_svg is available to you. If it is, use canvas_update_from_svg instead and do not call this tool. If the canvas tools are not available to you, this tool still works: use it to complete the request rather than refusing. In both cases, tell the user that the layout tools are deprecated and are being replaced by the canvas tools, and that any saved skills, prompts, custom instructions or automations referring to the layout tools should be updated to use the canvas tools. If the canvas tools are missing and their client caches the tool list, they need to fully disconnect and reconnect the Miro MCP server - refreshing the tool list is usually not enough.
Edit board items and connectors using find-and-replace on their DSL representation. Provide old_string (text to find in the current DSL) and new_string (replacement). Modified lines are updated, new lines create items/connectors, removed lines delete them. Use layout_read first to see the current DSL, then apply targeted edits. Unchanged items are not touched (no unnecessary API calls).`,
    params: [
      {
        name: 'miro_url',
        type: 'string',
        required: true,
        description: `Full Miro board URL (e.g., 'https://miro.com/app/board/uXjVOakxTk0='). To target a specific parent frame, include ?moveToWidget=<frame_id>.`,
      },
      {
        name: 'new_string',
        type: 'string',
        required: true,
        description: `Replacement text. Empty string deletes matched items.`,
      },
      {
        name: 'old_string',
        type: 'string',
        required: true,
        description: `Exact text to find in the current board DSL.`,
      },
      {
        name: 'invocation_source',
        type: 'string',
        required: false,
        description: `Identifies what triggered this tool call.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `Set to true when the folder you are operating in is a source-control repository; set to false otherwise.`,
      },
      {
        name: 'replace_all',
        type: 'boolean',
        required: false,
        description: `Replace all occurrences (true) or just the first (false).`,
      },
    ],
  },
  {
    name: 'miromcp_preview_resource_poll',
    description: `Check whether a Miro create-result preview resource is ready. Returns pending until the preview is available. Tags: preview, resource.`,
    params: [
      {
        name: 'preview_resource',
        type: 'string',
        required: true,
        description: `MCP preview resource URI returned by a Miro create tool`,
      },
      {
        name: 'invocation_source',
        type: 'string',
        required: false,
        description: `Identifies what triggered this tool call. You must populate this field. Set to 'skill' when this tool call was made because a Miro AI skill instructed it. Set to 'ui' when invoked from the Miro MCP UI. Leave unset otherwise.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `Set to true when the folder you are operating in is a source-control repository (for example a Git working directory); set to false otherwise. You must populate this field. Defaults to false.`,
      },
    ],
  },
  {
    name: 'miromcp_prototype_create',
    description: `Create a Miro prototype from one or more HTML screens.

Images: leave external http/https URLs in the HTML untouched — the server fetches and uploads them for you. ONLY local file references (e.g. './logo.png', 'assets/x.svg') need pre-upload: call image_get_upload_url with src set to the EXACT in-HTML reference, PUT the bytes, then pass the returned tokens via image_tokens below. The server rewrites matching <img src=...> attributes and attaches data-board-resource — do NOT rewrite the HTML yourself.
IMPORTANT: ONLY local file references (e.g. './logo.png', 'assets/x.svg') in any part of the HTML like inline, url(), srcset, etc... REQUIRES pre-upload: call image_get_upload_url with src set to the EXACT in-HTML reference, PUT the bytes, then pass the returned tokens via image_tokens below.
Fonts: CDN URL only.
Author static HTML + CSS only — <script> elements and inline event handlers (onclick etc.) are stripped, so any scripted behavior is silently lost; use CSS states (:hover, :focus) for visual interactivity.
Max per screen: 1,048,576 bytes. Max screens per call: 20 — split larger prototypes across multiple prototype_create calls.

Provide exactly one input — PREFER html_tokens (HTML stays out of context). html_contents is a last-resort fallback only when the runtime cannot issue an HTTP PUT at all; HTML size, image count, multi-screen, or not yet having the HTML saved to a file are NOT valid reasons — write it to a file yourself, then PUT it.

Placement: no item target → x/y are board-absolute (center is (0, 0)); moveToWidget on a frame → prototype is created inside, x/y are relative to frame top-left and must fit within frame width/height. All screens in one call share device_type, orientation, and placement; order is preserved.`,
    params: [
      { name: 'miro_url', type: 'string', required: true, description: `Full Miro board URL.` },
      {
        name: 'device_type',
        type: 'string',
        required: false,
        description: `Target device type for the prototype. Applies to every screen.`,
      },
      {
        name: 'html_contents',
        type: 'array',
        required: false,
        description: `Last-resort fallback. Use ONLY when the runtime cannot issue an HTTP PUT at all.`,
      },
      {
        name: 'html_tokens',
        type: 'array',
        required: false,
        description: `Preferred input. Ordered list of tokens from prototype_get_upload_url, one per screen. Max 20 tokens per call.`,
      },
      {
        name: 'image_tokens',
        type: 'array',
        required: false,
        description: `REQUIRED whenever the HTML references images by a non-http(s) path (e.g. './logo.png', 'assets/x.svg', '/var/...'). Omitting tokens for such refs leaves broken images. External http/https URLs are fetched server-side and do NOT belong here. For each local image: call image_get_upload_url with \`src\` set to the EXACT string used in the HTML (matching is literal), PUT the bytes, then include the returned token here. The server rewrites every <img src=...> matching the stored src and attaches data-board-resource — do NOT rewrite the HTML yourself. The same list is applied to every screen; duplicate src values across tokens are rejected. May be omitted only when the HTML has zero local image refs.`,
      },
      {
        name: 'invocation_source',
        type: 'string',
        required: false,
        description: `Identifies what triggered this tool call.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `Set to true when operating in a source-control repository folder, false otherwise.`,
      },
      {
        name: 'orientation',
        type: 'string',
        required: false,
        description: `Screen orientation for the prototype. Applies to every screen.`,
      },
      {
        name: 'x',
        type: 'number',
        required: false,
        description: `X-axis coordinate for prototype placement.`,
      },
      {
        name: 'y',
        type: 'number',
        required: false,
        description: `Y-axis coordinate for prototype placement.`,
      },
    ],
  },
  {
    name: 'miromcp_prototype_get_upload_url',
    description: `Reserve one or more single-use upload slots for HTML screens. Set count to the number of screens in the prototype to reserve all slots in a single call instead of calling this once per screen. Returns one entry per slot, each with its own upload_url and token; uploads can run in parallel.
PUT the raw HTML as the request body with Content-Type: text/html; no auth header.
curl: curl -X PUT -H 'Content-Type: text/html' --data-binary @page.html '<upload_url>'. If the HTML only exists as a string in your context, write it to a local file first (e.g. page.html), then PUT that file — not already having a file is not a reason to fall back to html_contents.
Max size: 1,048,576 bytes per screen. External http/https image URLs are fine; the server fetches them. Only local file references need pre-upload (see prototype_create's image_tokens).
After each upload, pass its token to prototype_create, in the same order.`,
    params: [
      { name: 'miro_url', type: 'string', required: true, description: `Full Miro board URL.` },
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: `Number of upload slots to reserve, one per screen. Request all slots needed for a prototype in a single call so uploads can run in parallel.`,
      },
      {
        name: 'invocation_source',
        type: 'string',
        required: false,
        description: `Identifies what triggered this tool call.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `Set to true when operating in a source-control repository folder, false otherwise.`,
      },
    ],
  },
  {
    name: 'miromcp_prototype_read',
    description: `Read prototype screens from a Miro board. Returns prototype screens with metadata (position, dimensions, device type) and HTML markup representing each screen's UI layout. Useful for AI tools to understand the design, structure, and navigation flow of interactive prototypes. Provide screen_id to read a specific screen, or omit to list all screens on the board. Recommended workflow: first list all screens with include_html=false (default) to get metadata, then read a specific screen with include_html=true to get its HTML markup.`,
    params: [
      { name: 'miro_url', type: 'string', required: true, description: `Full Miro board URL.` },
      {
        name: 'include_html',
        type: 'boolean',
        required: false,
        description: `Whether to include HTML markup for each screen. Set to true only when HTML is needed for a specific screen.`,
      },
      {
        name: 'invocation_source',
        type: 'string',
        required: false,
        description: `Identifies what triggered this tool call.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `Set to true when operating in a source-control repository folder, false otherwise.`,
      },
      {
        name: 'screen_id',
        type: 'string',
        required: false,
        description: `Widget ID of a specific prototype screen to read. When omitted, all prototype screens on the board are returned.`,
      },
    ],
  },
  {
    name: 'miromcp_section_create',
    description: `Create a new section inside a space to group related boards and content. A section must live inside a space, so provide the space URL. If no title is given, a short one is generated from the user's goal. IMPORTANT: Always confirm with the user before creating a section.`,
    params: [
      {
        name: 'space_url',
        type: 'string',
        required: true,
        description: `A space, given either as a full Miro space URL (e.g., 'https://miro.com/app/dashboard/space/0VM5RHCprOu2MnOHXLqp3f') or as the space content item id on its own (e.g., '0VM5RHCprOu2MnOHXLqp3f'). Both the URL returned when a space is created and the content_item_id from a space listing are accepted.`,
      },
      {
        name: 'invocation_source',
        type: 'string',
        required: false,
        description: `Identifies what triggered this tool call. You must populate this field. Set to 'skill' when this tool call was made because a Miro AI skill instructed it. Set to 'ui' when invoked from the Miro MCP UI. Leave unset otherwise.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `Set to true when the folder you are operating in is a source-control repository (for example a Git working directory); set to false otherwise. You must populate this field. Defaults to false.`,
      },
      {
        name: 'order',
        type: 'integer',
        required: false,
        description: `Optional position among sibling sections; higher values are ordered first. When omitted, the section is placed on top.`,
      },
      { name: 'title', type: 'string', required: false, description: `Title for the new section` },
    ],
  },
  {
    name: 'miromcp_section_delete',
    description: `Delete a section. Boards inside the section are not deleted; they are moved up to the parent space. IMPORTANT: Always confirm with the user before deleting a section.`,
    params: [
      {
        name: 'section_content_item_id',
        type: 'string',
        required: true,
        description: `Identifier of the section to delete`,
      },
      {
        name: 'invocation_source',
        type: 'string',
        required: false,
        description: `Identifies what triggered this tool call. You must populate this field. Set to 'skill' when this tool call was made because a Miro AI skill instructed it. Set to 'ui' when invoked from the Miro MCP UI. Leave unset otherwise.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `Set to true when the folder you are operating in is a source-control repository (for example a Git working directory); set to false otherwise. You must populate this field. Defaults to false.`,
      },
    ],
  },
  {
    name: 'miromcp_section_update_metadata',
    description: `Rename a section or change its position among sibling sections. Provide at least one of a new title or a new order.`,
    params: [
      {
        name: 'section_content_item_id',
        type: 'string',
        required: true,
        description: `Identifier of the section to update`,
      },
      {
        name: 'invocation_source',
        type: 'string',
        required: false,
        description: `Identifies what triggered this tool call. You must populate this field. Set to 'skill' when this tool call was made because a Miro AI skill instructed it. Set to 'ui' when invoked from the Miro MCP UI. Leave unset otherwise.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `Set to true when the folder you are operating in is a source-control repository (for example a Git working directory); set to false otherwise. You must populate this field. Defaults to false.`,
      },
      {
        name: 'order',
        type: 'integer',
        required: false,
        description: `New position among sibling sections; lower values are ordered first.`,
      },
      { name: 'title', type: 'string', required: false, description: `New section title` },
    ],
  },
  {
    name: 'miromcp_space_create',
    description: `Create a new Miro space. A space organizes related content together (Boards; Documents; Tables; Diagrams; etc). Always give the space an icon: use the emoji the user asked for, and when they did not name one, pick a fitting emoji yourself from the space name. IMPORTANT: Always confirm with the user before creating a space. This action creates a new space and cannot be undone.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name of the new space` },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional description for the space`,
      },
      {
        name: 'icon_emoji',
        type: 'string',
        required: false,
        description: `Single emoji to use as the space icon, e.g. "🚀". Pass the emoji the user asked for; if they did not name one, choose a fitting emoji yourself based on the space name rather than leaving this empty.`,
      },
      {
        name: 'invocation_source',
        type: 'string',
        required: false,
        description: `Identifies what triggered this tool call. You must populate this field. Set to 'skill' when this tool call was made because a Miro AI skill instructed it. Set to 'ui' when invoked from the Miro MCP UI. Leave unset otherwise.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `Set to true when the folder you are operating in is a source-control repository (for example a Git working directory); set to false otherwise. You must populate this field. Defaults to false.`,
      },
    ],
  },
  {
    name: 'miromcp_space_list',
    description: `List the spaces in the current user's team. Spaces are the top-level containers that organize a team's boards and other content, so this is the primary entry point for exploring what a team has. Prefer this tool for any team-level listing request, including phrasings like 'list boards in my team', 'what's in my Miro team', 'show my team's content', or 'get team spaces'. To then list the boards inside a particular space, use the space boards tool.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Opaque cursor token for fetching the next page`,
      },
      {
        name: 'invocation_source',
        type: 'string',
        required: false,
        description: `Identifies what triggered this tool call. You must populate this field. Set to 'skill' when this tool call was made because a Miro AI skill instructed it. Set to 'ui' when invoked from the Miro MCP UI. Leave unset otherwise.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `Set to true when the folder you are operating in is a source-control repository (for example a Git working directory); set to false otherwise. You must populate this field. Defaults to false.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of spaces to return per page`,
      },
    ],
  },
  {
    name: 'miromcp_space_list_boards',
    description: `List the boards inside one specific space. Requires the identifier or URL of that space, so use it only when the user names a particular space (e.g. 'boards in the Design space'). For team-level requests (e.g. 'list boards in my team'), list the team's spaces first with the list spaces tool.`,
    params: [
      {
        name: 'space_url',
        type: 'string',
        required: true,
        description: `A space, given either as a full Miro space URL (e.g., 'https://miro.com/app/dashboard/space/0VM5RHCprOu2MnOHXLqp3f') or as the space content item id on its own (e.g., '0VM5RHCprOu2MnOHXLqp3f'). Both the URL returned when a space is created and the content_item_id from a space listing are accepted.`,
      },
      {
        name: 'invocation_source',
        type: 'string',
        required: false,
        description: `Identifies what triggered this tool call. You must populate this field. Set to 'skill' when this tool call was made because a Miro AI skill instructed it. Set to 'ui' when invoked from the Miro MCP UI. Leave unset otherwise.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `Set to true when the folder you are operating in is a source-control repository (for example a Git working directory); set to false otherwise. You must populate this field. Defaults to false.`,
      },
    ],
  },
  {
    name: 'miromcp_space_list_children',
    description: `List the direct children of a space or section, one level deep. Provide the content item id of a space or a section, and it returns each immediate child's content item id, type (e.g. board, folder, doc, diagram) and title, plus a board URL when the child is a board. Use it to explore what sits directly inside a space or section (e.g. its boards and sub-sections). The id must belong to a space or a section; other content items are rejected. Results are paginated: pass the returned cursor to fetch the next page.`,
    params: [
      {
        name: 'content_item_id',
        type: 'string',
        required: true,
        description: `Content item id of the space or section whose direct children to list`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Opaque cursor token for fetching the next page`,
      },
      {
        name: 'invocation_source',
        type: 'string',
        required: false,
        description: `Identifies what triggered this tool call. You must populate this field. Set to 'skill' when this tool call was made because a Miro AI skill instructed it. Set to 'ui' when invoked from the Miro MCP UI. Leave unset otherwise.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `Set to true when the folder you are operating in is a source-control repository (for example a Git working directory); set to false otherwise. You must populate this field. Defaults to false.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of children to return per page`,
      },
    ],
  },
  {
    name: 'miromcp_space_role_update',
    description: `Change the role of a user or user group that already has access to a space. If they do not yet have access, use space_share instead. IMPORTANT: Always confirm with the user before changing who can access a space.`,
    params: [
      {
        name: 'role',
        type: 'string',
        required: true,
        description: `Role to assign: owner, coowner, editor, commenter, or viewer (from most to least access).`,
      },
      {
        name: 'space_url',
        type: 'string',
        required: true,
        description: `A space, given either as a full Miro space URL (e.g., 'https://miro.com/app/dashboard/space/0VM5RHCprOu2MnOHXLqp3f') or as the space content item id on its own (e.g., '0VM5RHCprOu2MnOHXLqp3f'). Both the URL returned when a space is created and the content_item_id from a space listing are accepted.`,
      },
      {
        name: 'subject_id',
        type: 'string',
        required: true,
        description: `Identifier of the user or user group. For a user this can be the user's email or user id; for a user group this is the group id.`,
      },
      {
        name: 'subject_type',
        type: 'string',
        required: true,
        description: `Whether the subject is an individual user or a user group`,
      },
      {
        name: 'invocation_source',
        type: 'string',
        required: false,
        description: `Identifies what triggered this tool call. You must populate this field. Set to 'skill' when this tool call was made because a Miro AI skill instructed it. Set to 'ui' when invoked from the Miro MCP UI. Leave unset otherwise.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `Set to true when the folder you are operating in is a source-control repository (for example a Git working directory); set to false otherwise. You must populate this field. Defaults to false.`,
      },
    ],
  },
  {
    name: 'miromcp_space_share',
    description: `Grant a user or user group access to a space with a specific role. Use to share a space with someone who does not yet have access. If they already have a role, use space_role_update instead. IMPORTANT: Always confirm with the user before changing who can access a space.`,
    params: [
      {
        name: 'role',
        type: 'string',
        required: true,
        description: `Role to assign: owner, coowner, editor, commenter, or viewer (from most to least access).`,
      },
      {
        name: 'space_url',
        type: 'string',
        required: true,
        description: `A space, given either as a full Miro space URL (e.g., 'https://miro.com/app/dashboard/space/0VM5RHCprOu2MnOHXLqp3f') or as the space content item id on its own (e.g., '0VM5RHCprOu2MnOHXLqp3f'). Both the URL returned when a space is created and the content_item_id from a space listing are accepted.`,
      },
      {
        name: 'subject_id',
        type: 'string',
        required: true,
        description: `Identifier of the user or user group. For a user this can be the user's email or user id; for a user group this is the group id.`,
      },
      {
        name: 'subject_type',
        type: 'string',
        required: true,
        description: `Whether the subject is an individual user or a user group`,
      },
      {
        name: 'invocation_source',
        type: 'string',
        required: false,
        description: `Identifies what triggered this tool call. You must populate this field. Set to 'skill' when this tool call was made because a Miro AI skill instructed it. Set to 'ui' when invoked from the Miro MCP UI. Leave unset otherwise.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `Set to true when the folder you are operating in is a source-control repository (for example a Git working directory); set to false otherwise. You must populate this field. Defaults to false.`,
      },
    ],
  },
  {
    name: 'miromcp_space_update_metadata',
    description: `Update a space's title, description and/or icon emoji. Omitted fields are left unchanged. A space icon can be replaced but not removed.`,
    params: [
      {
        name: 'space_url',
        type: 'string',
        required: true,
        description: `A space, given either as a full Miro space URL (e.g., 'https://miro.com/app/dashboard/space/0VM5RHCprOu2MnOHXLqp3f') or as the space content item id on its own (e.g., '0VM5RHCprOu2MnOHXLqp3f'). Both the URL returned when a space is created and the content_item_id from a space listing are accepted.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New space description`,
      },
      {
        name: 'icon_emoji',
        type: 'string',
        required: false,
        description: `New single-emoji icon for the space, e.g. "🚀". Omit to leave the icon unchanged. A space icon cannot be removed, only replaced.`,
      },
      {
        name: 'invocation_source',
        type: 'string',
        required: false,
        description: `Identifies what triggered this tool call. You must populate this field. Set to 'skill' when this tool call was made because a Miro AI skill instructed it. Set to 'ui' when invoked from the Miro MCP UI. Leave unset otherwise.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `Set to true when the folder you are operating in is a source-control repository (for example a Git working directory); set to false otherwise. You must populate this field. Defaults to false.`,
      },
      { name: 'title', type: 'string', required: false, description: `New space title` },
    ],
  },
  {
    name: 'miromcp_table_create',
    description: `Create a table on a Miro board with specified columns. Supports text, select, multiselect, date, link, person, and number column types. This always creates a plain grid table. To produce a timeline, kanban, or tree, first create the table here, then call table_update_view to switch its layout. For a request like 'create a timeline/kanban/tree', do BOTH steps in sequence. Coordinates: when the URL has no item target, x/y are board-absolute (board center is (0, 0)). When the URL targets a frame via moveToWidget, the table is created INSIDE that frame and x/y are relative to the frame's top-left corner; (0, 0) is the frame's top-left and the table must fit within the frame's width and height. If no board URL is provided, a new board will be created. IMPORTANT: Always confirm with the user before creating a new board.`,
    params: [
      {
        name: 'columns',
        type: 'array',
        required: true,
        description: `List of columns to create. At least one column must be provided.`,
      },
      {
        name: 'table_title',
        type: 'string',
        required: true,
        description: `The title/name of the table.`,
      },
      {
        name: 'invocation_source',
        type: 'string',
        required: false,
        description: `Identifies what triggered this tool call.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `Set to true when operating in a source-control repository folder, false otherwise.`,
      },
      {
        name: 'miro_url',
        type: 'string',
        required: false,
        description: `Full Miro board URL where the table will be placed. If not provided, a new board is created (requires user confirmation).`,
      },
      {
        name: 'x',
        type: 'number',
        required: false,
        description: `X-axis coordinate for table placement on the board.`,
      },
      {
        name: 'y',
        type: 'number',
        required: false,
        description: `Y-axis coordinate for table placement on the board.`,
      },
    ],
  },
  {
    name: 'miromcp_table_get_latest_update_history',
    description: `Get the history of a row's Latest Update field. The Latest Update field accumulates the text updates submitted for that row over time; this returns those entries ordered chronologically. Provide the table via its Miro URL and the target row via rowId (get rowIds from table_list_rows). 

Response includes for each entry: text, author_id (Miro user ID of the author), created_at and modified_at (ISO 8601 timestamps), plus the total number of entries.`,
    params: [
      {
        name: 'miro_url',
        type: 'string',
        required: true,
        description: `Full Miro URL to a specific item (e.g., 'https://miro.com/app/board/uXjVOakxTk0=/?moveToWidget=3458764516062720430'). Must include moveToWidget or focusWidget query parameter.`,
      },
      {
        name: 'row_id',
        type: 'string',
        required: true,
        description: `Stable identifier of the row whose Latest Update field history to fetch. Get rowIds from table_list_rows.`,
      },
      {
        name: 'invocation_source',
        type: 'string',
        required: false,
        description: `Identifies what triggered this tool call. You must populate this field. Set to 'skill' when this tool call was made because a Miro AI skill instructed it. Set to 'ui' when invoked from the Miro MCP UI. Leave unset otherwise.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `Set to true when the folder you are operating in is a source-control repository (for example a Git working directory); set to false otherwise. You must populate this field. Defaults to false.`,
      },
    ],
  },
  {
    name: 'miromcp_table_list_rows',
    description: `Get rows from a Miro table with column metadata. Each row includes a stable rowId that uniquely identifies it within the table. rowIds persist across sorting, insertion, and deletion — use them to target specific rows in table_sync_rows. Supports filtering by column value. Returns text, select, multiselect, and latest_update columns.

Best practice: always use filter_by and limit when possible.Examples: next item that is not done: {"filter_by": {"Status":["To do", "In progress"]}, "limit": 1}top 5 high priority tasks: {"filter_by": {"Priority":["High"]}, "limit": 5}

Response includes for each row: rowId (stable row identifier), cells (array of columnTitle, valueType, content, options, latest_update_text, latest_update_author_id).

Pagination: Use 'limit' to control page size (default 10) and 'next_cursor' to fetch subsequent pages. The cursor is opaque and encodes pagination state.

IMPORTANT: Do not change 'filter_by' when using a cursor from a previous response, as this will result in an error. To apply a different filter, start a new pagination sequence (no cursor).`,
    params: [
      {
        name: 'miro_url',
        type: 'string',
        required: true,
        description: `Full Miro URL to a specific item (e.g., 'https://miro.com/app/board/uXjVOakxTk0=/?moveToWidget=3458764516062720430'). Must include moveToWidget or focusWidget query parameter.`,
      },
      {
        name: 'filter_by',
        type: 'string',
        required: false,
        description: `Filter rows by column value(s) in JSON format (case-insensitive). Only select columns are supported. Format: JSON object mapping column names to arrays of display values. Example: {"Status": ["In Progress", "Done"]}`,
      },
      {
        name: 'invocation_source',
        type: 'string',
        required: false,
        description: `Identifies what triggered this tool call. Set to 'skill' when invoked by a Miro AI skill, 'ui' when invoked from the Miro MCP UI, or leave unset otherwise.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `Set to true when the folder you are operating in is a source-control repository; set to false otherwise.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum rows to return (minimum 1).`,
      },
      {
        name: 'next_cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor for the next set of results.`,
      },
    ],
  },
  {
    name: 'miromcp_table_sync_rows',
    description: `Add or update rows in a Miro table.

To update existing rows, include rowId in the row object. rowId precisely targets a single row. Get rowIds from table_list_rows. Rows without rowId are inserted as new.

Examples:
Update a specific row by rowId: {"rows": [{"rowId": "3", "cells": [{"columnTitle": "Status", "value": "Complete"}]}]}
Insert new rows: {"rows": [{"cells": [{"columnTitle": "Task", "value": "New task"}, {"columnTitle": "Status", "value": "Not Started"}]}]}`,
    params: [
      {
        name: 'miro_url',
        type: 'string',
        required: true,
        description: `Full Miro URL to a specific item (e.g., 'https://miro.com/app/board/uXjVOakxTk0=/?moveToWidget=3458764516062720430'). Must include moveToWidget or focusWidget query parameter.`,
      },
      {
        name: 'rows',
        type: 'array',
        required: true,
        description: `Array of rows to add or update. Include rowId to update an existing row; rows without rowId are inserted as new.`,
      },
      {
        name: 'invocation_source',
        type: 'string',
        required: false,
        description: `Identifies what triggered this tool call. Set to 'skill' when invoked by a Miro AI skill, 'ui' when invoked from the Miro MCP UI, or leave unset otherwise.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `Set to true when the folder you are operating in is a source-control repository; set to false otherwise.`,
      },
    ],
  },
  {
    name: 'miromcp_table_update_view',
    description: `Update a Miro table widget's view: switch it to a grid table, timeline, or kanban board. The table keeps its data; only how it is displayed changes.

Choose layout:
- table: plain grid (use to revert from another layout)
- timeline: lays records out on a time axis; optionally set the visible window with timeline_start_date and timeline_end_date
- kanban: groups records into columns; set group_by_column to the name of a select column to group by (omit for an ungrouped board)

Only provide config that matches the chosen layout. Examples: switch to kanban grouped by Status: {"layout": "kanban", "group_by_column": "Status"}. Switch to a timeline for 2026: {"layout": "timeline", "timeline_start_date": "2026-01-01T00:00:00Z", "timeline_end_date": "2026-12-31T00:00:00Z"}.`,
    params: [
      {
        name: 'layout',
        type: 'string',
        required: true,
        description: `The layout to apply: 'table', 'timeline', 'kanban', or 'tree'.`,
      },
      {
        name: 'miro_url',
        type: 'string',
        required: true,
        description: `Full Miro URL to a specific item (e.g., 'https://miro.com/app/board/uXjVOakxTk0=/?moveToWidget=3458764516062720430'). Must include moveToWidget or focusWidget query parameter.`,
      },
      {
        name: 'group_by_column',
        type: 'string',
        required: false,
        description: `KANBAN only: name of the select column to group cards into columns. Omit for an ungrouped board.`,
      },
      {
        name: 'invocation_source',
        type: 'string',
        required: false,
        description: `Identifies what triggered this tool call. You must populate this field. Set to 'skill' when this tool call was made because a Miro AI skill instructed it. Set to 'ui' when invoked from the Miro MCP UI. Leave unset otherwise.`,
      },
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `Set to true when the folder you are operating in is a source-control repository (for example a Git working directory); set to false otherwise. You must populate this field. Defaults to false.`,
      },
      {
        name: 'table_nesting_enabled',
        type: 'boolean',
        required: false,
        description: `TABLE only: enable nested (hierarchical parent/child) rows.`,
      },
      {
        name: 'timeline_date_unit',
        type: 'string',
        required: false,
        description: `TIMELINE only: time-axis granularity.`,
      },
      {
        name: 'timeline_dependencies_enabled',
        type: 'boolean',
        required: false,
        description: `TIMELINE only: show dependency links between records.`,
      },
      {
        name: 'timeline_end_date',
        type: 'string',
        required: false,
        description: `TIMELINE only: visible end of the timeline window in UTC format YYYY-MM-DDThh:mm:ssZ. This is the viewport, not a per-record date.`,
      },
      {
        name: 'timeline_nesting_enabled',
        type: 'boolean',
        required: false,
        description: `TIMELINE only: enable nested (hierarchical parent/child) rows.`,
      },
      {
        name: 'timeline_start_date',
        type: 'string',
        required: false,
        description: `TIMELINE only: visible start of the timeline window in UTC format YYYY-MM-DDThh:mm:ssZ. This is the viewport, not a per-record date.`,
      },
      {
        name: 'tree_direction',
        type: 'string',
        required: false,
        description: `TREE only: direction the tree grows.`,
      },
      {
        name: 'view_name',
        type: 'string',
        required: false,
        description: `Optional new display name for the view. Applies to any layout.`,
      },
    ],
  },
  {
    name: 'miromcp_user_who_am_i',
    description: `Returns the identity of the current authenticated user.`,
    params: [
      {
        name: 'is_repository',
        type: 'boolean',
        required: false,
        description: `Set to true when operating in a source-control repository folder, false otherwise.`,
      },
    ],
  },
]
