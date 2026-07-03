import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'miro_app_card_create',
    description: `Creates an app card item on a Miro board.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description of the app card.`,
      },
      {
        name: 'parent_id',
        type: 'string',
        required: false,
        description: `ID of parent frame to nest this item inside.`,
      },
      {
        name: 'position_x',
        type: 'number',
        required: false,
        description: `X coordinate on the board.`,
      },
      {
        name: 'position_y',
        type: 'number',
        required: false,
        description: `Y coordinate on the board.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Status: disconnected | connected | disabled.`,
      },
      { name: 'title', type: 'string', required: false, description: `Title of the app card.` },
      { name: 'width', type: 'number', required: false, description: `Width in board units.` },
    ],
  },
  {
    name: 'miro_app_card_delete',
    description: `Deletes an app card item from a Miro board.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the item.`,
      },
    ],
  },
  {
    name: 'miro_app_card_get',
    description: `Retrieves an app card item from a Miro board.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the item.`,
      },
    ],
  },
  {
    name: 'miro_app_card_update',
    description: `Updates an existing app card item on a Miro board.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the item.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description of the app card.`,
      },
      {
        name: 'parent_id',
        type: 'string',
        required: false,
        description: `ID of parent frame to nest this item inside.`,
      },
      {
        name: 'position_x',
        type: 'number',
        required: false,
        description: `X coordinate on the board.`,
      },
      {
        name: 'position_y',
        type: 'number',
        required: false,
        description: `Y coordinate on the board.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Status: disconnected | connected | disabled.`,
      },
      { name: 'title', type: 'string', required: false, description: `Title of the app card.` },
      { name: 'width', type: 'number', required: false, description: `Width in board units.` },
    ],
  },
  {
    name: 'miro_audit_logs_get',
    description: `Retrieves audit logs for the organization (Enterprise only). Returns events for the specified date range (max 90 days).`,
    params: [
      {
        name: 'created_after',
        type: 'string',
        required: true,
        description: `Start of date range in ISO 8601.`,
      },
      {
        name: 'created_before',
        type: 'string',
        required: true,
        description: `End of date range in ISO 8601.`,
      },
      { name: 'cursor', type: 'string', required: false, description: `Pagination cursor.` },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Max results per page (1-100).`,
      },
      { name: 'sorting', type: 'string', required: false, description: `Sort order: asc | desc.` },
    ],
  },
  {
    name: 'miro_board_copy',
    description: `Creates a copy of an existing Miro board, optionally in a different team.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board to copy.`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `Team ID to copy the board into. Defaults to the original board's team.`,
      },
    ],
  },
  {
    name: 'miro_board_create',
    description: `Creates a new Miro board. If no name is provided, Miro defaults to 'Untitled'.`,
    params: [
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Board description (max 300 characters).`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Board name (max 60 characters).`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: false,
        description: `ID of the project/Space to add the board to.`,
      },
      {
        name: 'team_id',
        type: 'string',
        required: false,
        description: `ID of the team to create the board in.`,
      },
    ],
  },
  {
    name: 'miro_board_delete',
    description: `Permanently deletes a Miro board and all its contents.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board to delete.`,
      },
    ],
  },
  {
    name: 'miro_board_export_create',
    description: `Creates a board export job for eDiscovery (Enterprise only). Returns a job ID to poll for status.`,
    params: [
      {
        name: 'board_ids',
        type: 'string',
        required: true,
        description: `JSON array of board IDs to export, e.g. ["id1","id2"]`,
      },
      { name: 'org_id', type: 'string', required: true, description: `Organization ID.` },
      {
        name: 'request_id',
        type: 'string',
        required: true,
        description: `Unique request ID (UUID) to identify this export job.`,
      },
      { name: 'format', type: 'string', required: false, description: `Export format: pdf | csv.` },
    ],
  },
  {
    name: 'miro_board_export_job_get',
    description: `Gets the status of a board export job (Enterprise only).`,
    params: [
      { name: 'job_id', type: 'string', required: true, description: `Export job ID.` },
      { name: 'org_id', type: 'string', required: true, description: `Organization ID.` },
    ],
  },
  {
    name: 'miro_board_export_job_results_get',
    description: `Retrieves the results/download URLs of a completed board export job (Enterprise only).`,
    params: [
      { name: 'job_id', type: 'string', required: true, description: `Export job ID.` },
      { name: 'org_id', type: 'string', required: true, description: `Organization ID.` },
    ],
  },
  {
    name: 'miro_board_export_jobs_list',
    description: `Lists all board export jobs for an organization (Enterprise only).`,
    params: [
      { name: 'org_id', type: 'string', required: true, description: `Organization ID.` },
      { name: 'cursor', type: 'string', required: false, description: `Pagination cursor.` },
      { name: 'limit', type: 'integer', required: false, description: `Max results.` },
    ],
  },
  {
    name: 'miro_board_get',
    description: `Retrieves details of a specific Miro board by its ID.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the Miro board.`,
      },
    ],
  },
  {
    name: 'miro_board_member_get',
    description: `Retrieves details of a specific member on a Miro board.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      {
        name: 'member_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board member.`,
      },
    ],
  },
  {
    name: 'miro_board_member_remove',
    description: `Removes a member from a Miro board.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      {
        name: 'member_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the member to remove.`,
      },
    ],
  },
  {
    name: 'miro_board_member_update',
    description: `Updates the role of a member on a Miro board.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      {
        name: 'member_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board member to update.`,
      },
      {
        name: 'role',
        type: 'string',
        required: true,
        description: `New role for the member. Valid values: viewer, commenter, editor, coowner.`,
      },
    ],
  },
  {
    name: 'miro_board_members_list',
    description: `Returns a list of members on a Miro board.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
    ],
  },
  {
    name: 'miro_board_members_share',
    description: `Shares a Miro board with one or more users by email address, assigning them a role.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board to share.`,
      },
      {
        name: 'emails',
        type: 'string',
        required: true,
        description: `JSON array of email addresses to invite.`,
      },
      {
        name: 'role',
        type: 'string',
        required: true,
        description: `Role to assign to the invited users. Valid values: viewer, commenter, editor, coowner.`,
      },
    ],
  },
  {
    name: 'miro_board_update',
    description: `Updates the name or description of a Miro board.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board to update.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New board description (max 300 characters).`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New board name (max 60 characters).`,
      },
    ],
  },
  {
    name: 'miro_boards_list',
    description: `Returns a list of Miro boards the authenticated user has access to. Supports filtering by team, project, owner, and search query.`,
    params: [],
  },
  {
    name: 'miro_card_create',
    description: `Creates a card item on a Miro board. Cards can have a title, description, assignee, and due date.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      {
        name: 'assignee_id',
        type: 'string',
        required: false,
        description: `User ID to assign the card to.`,
      },
      {
        name: 'card_theme',
        type: 'string',
        required: false,
        description: `Card theme color as hex code (e.g. #2d9bf0).`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description/body text of the card.`,
      },
      {
        name: 'due_date',
        type: 'string',
        required: false,
        description: `Due date in ISO 8601 format (e.g. 2024-12-31T23:59:59Z).`,
      },
      {
        name: 'parent_id',
        type: 'string',
        required: false,
        description: `ID of a parent frame to place the card inside.`,
      },
      {
        name: 'position_x',
        type: 'number',
        required: false,
        description: `X coordinate on the board (0 = center).`,
      },
      {
        name: 'position_y',
        type: 'number',
        required: false,
        description: `Y coordinate on the board (0 = center).`,
      },
      { name: 'title', type: 'string', required: false, description: `Title of the card.` },
      {
        name: 'width',
        type: 'number',
        required: false,
        description: `Width of the card in board units.`,
      },
    ],
  },
  {
    name: 'miro_card_delete',
    description: `Deletes a card item from a Miro board.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the card to delete.`,
      },
    ],
  },
  {
    name: 'miro_card_get',
    description: `Retrieves details of a specific card item on a Miro board.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the card item.`,
      },
    ],
  },
  {
    name: 'miro_card_update',
    description: `Updates the content, assignment, due date, or position of a card on a Miro board.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the card to update.`,
      },
      {
        name: 'assignee_id',
        type: 'string',
        required: false,
        description: `Updated assignee user ID.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Updated card description.`,
      },
      {
        name: 'due_date',
        type: 'string',
        required: false,
        description: `Updated due date in ISO 8601 format.`,
      },
      {
        name: 'position_x',
        type: 'number',
        required: false,
        description: `Updated X coordinate on the board.`,
      },
      {
        name: 'position_y',
        type: 'number',
        required: false,
        description: `Updated Y coordinate on the board.`,
      },
      { name: 'title', type: 'string', required: false, description: `Updated card title.` },
    ],
  },
  {
    name: 'miro_connector_create',
    description: `Creates a connector (line/arrow) between two existing items on a Miro board.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      {
        name: 'end_item_id',
        type: 'string',
        required: true,
        description: `ID of the item where the connector ends.`,
      },
      {
        name: 'start_item_id',
        type: 'string',
        required: true,
        description: `ID of the item where the connector starts.`,
      },
      {
        name: 'caption',
        type: 'string',
        required: false,
        description: `Text label to display on the connector.`,
      },
      {
        name: 'end_snap_to',
        type: 'string',
        required: false,
        description: `Attachment point on the end item. Valid values: auto, top, right, bottom, left.`,
      },
      {
        name: 'end_stroke_cap',
        type: 'string',
        required: false,
        description: `End endpoint cap style. Valid values: none, arrow, filled_arrow, circle, filled_circle, diamond, filled_diamond, bar, stealth.`,
      },
      {
        name: 'shape',
        type: 'string',
        required: false,
        description: `Connector line style. Valid values: straight, elbowed, curved.`,
      },
      {
        name: 'start_snap_to',
        type: 'string',
        required: false,
        description: `Attachment point on the start item. Valid values: auto, top, right, bottom, left.`,
      },
      {
        name: 'start_stroke_cap',
        type: 'string',
        required: false,
        description: `Start endpoint cap style. Valid values: none, arrow, filled_arrow, circle, filled_circle, diamond, filled_diamond, bar, stealth.`,
      },
      {
        name: 'stroke_color',
        type: 'string',
        required: false,
        description: `Line color as hex code.`,
      },
      {
        name: 'stroke_width',
        type: 'string',
        required: false,
        description: `Line thickness as a string number.`,
      },
    ],
  },
  {
    name: 'miro_connector_delete',
    description: `Deletes a connector (line/arrow) from a Miro board.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      {
        name: 'connector_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the connector to delete.`,
      },
    ],
  },
  {
    name: 'miro_connector_get',
    description: `Retrieves details of a specific connector (line/arrow) on a Miro board.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      {
        name: 'connector_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the connector.`,
      },
    ],
  },
  {
    name: 'miro_connector_update',
    description: `Updates the style, shape, or endpoints of a connector on a Miro board.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      {
        name: 'connector_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the connector to update.`,
      },
      {
        name: 'caption',
        type: 'string',
        required: false,
        description: `Updated text label on the connector.`,
      },
      {
        name: 'end_stroke_cap',
        type: 'string',
        required: false,
        description: `Updated end endpoint cap style (e.g. arrow, none, filled_arrow).`,
      },
      {
        name: 'shape',
        type: 'string',
        required: false,
        description: `Updated line style. Valid values: straight, elbowed, curved.`,
      },
      {
        name: 'stroke_color',
        type: 'string',
        required: false,
        description: `Updated line color as hex code.`,
      },
      {
        name: 'stroke_width',
        type: 'string',
        required: false,
        description: `Updated line thickness as a string number.`,
      },
    ],
  },
  {
    name: 'miro_connectors_list',
    description: `Returns all connector (line/arrow) items on a Miro board.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Cursor token from a previous response for pagination.`,
      },
    ],
  },
  {
    name: 'miro_data_classification_board_get',
    description: `Retrieves the data classification label for a specific board (Enterprise only).`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      { name: 'org_id', type: 'string', required: true, description: `Organization ID.` },
      { name: 'team_id', type: 'string', required: true, description: `Team ID.` },
    ],
  },
  {
    name: 'miro_data_classification_board_set',
    description: `Sets the data classification label for a specific board (Enterprise only).`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      { name: 'label_id', type: 'string', required: true, description: `Classification label ID.` },
      { name: 'org_id', type: 'string', required: true, description: `Organization ID.` },
      { name: 'team_id', type: 'string', required: true, description: `Team ID.` },
    ],
  },
  {
    name: 'miro_data_classification_org_get',
    description: `Retrieves data classification label settings for the organization (Enterprise only).`,
    params: [{ name: 'org_id', type: 'string', required: true, description: `Organization ID.` }],
  },
  {
    name: 'miro_data_classification_team_get',
    description: `Retrieves data classification settings for a team (Enterprise only).`,
    params: [
      { name: 'org_id', type: 'string', required: true, description: `Organization ID.` },
      { name: 'team_id', type: 'string', required: true, description: `Team ID.` },
    ],
  },
  {
    name: 'miro_document_create',
    description: `Creates a document item on a Miro board from a publicly accessible URL.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `Publicly accessible URL of the document.`,
      },
      { name: 'height', type: 'number', required: false, description: `Height in board units.` },
      {
        name: 'parent_id',
        type: 'string',
        required: false,
        description: `ID of parent frame to nest this item inside.`,
      },
      {
        name: 'position_x',
        type: 'number',
        required: false,
        description: `X coordinate on the board.`,
      },
      {
        name: 'position_y',
        type: 'number',
        required: false,
        description: `Y coordinate on the board.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Title of the document item.`,
      },
      { name: 'width', type: 'number', required: false, description: `Width in board units.` },
    ],
  },
  {
    name: 'miro_document_delete',
    description: `Deletes a document item from a Miro board.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the item.`,
      },
    ],
  },
  {
    name: 'miro_document_get',
    description: `Retrieves a document item from a Miro board.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the item.`,
      },
    ],
  },
  {
    name: 'miro_document_update',
    description: `Updates an existing document item on a Miro board.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the item.`,
      },
      { name: 'height', type: 'number', required: false, description: `Height in board units.` },
      {
        name: 'parent_id',
        type: 'string',
        required: false,
        description: `ID of parent frame to nest this item inside.`,
      },
      {
        name: 'position_x',
        type: 'number',
        required: false,
        description: `X coordinate on the board.`,
      },
      {
        name: 'position_y',
        type: 'number',
        required: false,
        description: `Y coordinate on the board.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Title of the document item.`,
      },
      { name: 'url', type: 'string', required: false, description: `New URL for the document.` },
      { name: 'width', type: 'number', required: false, description: `Width in board units.` },
    ],
  },
  {
    name: 'miro_embed_create',
    description: `Creates an embed item on a Miro board from an oEmbed-compatible URL (YouTube, Vimeo, etc.).`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `URL of the content to embed (oEmbed-compatible).`,
      },
      { name: 'height', type: 'number', required: false, description: `Height in board units.` },
      { name: 'mode', type: 'string', required: false, description: `Embed mode: inline | modal.` },
      {
        name: 'parent_id',
        type: 'string',
        required: false,
        description: `ID of parent frame to nest this item inside.`,
      },
      {
        name: 'position_x',
        type: 'number',
        required: false,
        description: `X coordinate on the board.`,
      },
      {
        name: 'position_y',
        type: 'number',
        required: false,
        description: `Y coordinate on the board.`,
      },
      {
        name: 'preview_url',
        type: 'string',
        required: false,
        description: `URL of preview image to display.`,
      },
      { name: 'width', type: 'number', required: false, description: `Width in board units.` },
    ],
  },
  {
    name: 'miro_embed_delete',
    description: `Deletes an embed item from a Miro board.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the item.`,
      },
    ],
  },
  {
    name: 'miro_embed_get',
    description: `Retrieves an embed item from a Miro board.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the item.`,
      },
    ],
  },
  {
    name: 'miro_embed_update',
    description: `Updates an existing embed item on a Miro board.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the item.`,
      },
      { name: 'height', type: 'number', required: false, description: `Height in board units.` },
      { name: 'mode', type: 'string', required: false, description: `Embed mode: inline | modal.` },
      {
        name: 'parent_id',
        type: 'string',
        required: false,
        description: `ID of parent frame to nest this item inside.`,
      },
      {
        name: 'position_x',
        type: 'number',
        required: false,
        description: `X coordinate on the board.`,
      },
      {
        name: 'position_y',
        type: 'number',
        required: false,
        description: `Y coordinate on the board.`,
      },
      {
        name: 'preview_url',
        type: 'string',
        required: false,
        description: `URL of preview image to display.`,
      },
      { name: 'url', type: 'string', required: false, description: `New embed URL.` },
      { name: 'width', type: 'number', required: false, description: `Width in board units.` },
    ],
  },
  {
    name: 'miro_frame_create',
    description: `Creates a frame item on a Miro board. Frames group and organize other board items.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      {
        name: 'fill_color',
        type: 'string',
        required: false,
        description: `Background fill color as hex code (e.g. #ffffffff for transparent).`,
      },
      {
        name: 'height',
        type: 'number',
        required: false,
        description: `Height of the frame in board units.`,
      },
      {
        name: 'position_x',
        type: 'number',
        required: false,
        description: `X coordinate on the board (0 = center).`,
      },
      {
        name: 'position_y',
        type: 'number',
        required: false,
        description: `Y coordinate on the board (0 = center).`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Title displayed at the top of the frame.`,
      },
      {
        name: 'width',
        type: 'number',
        required: false,
        description: `Width of the frame in board units.`,
      },
    ],
  },
  {
    name: 'miro_frame_delete',
    description: `Deletes a frame item from a Miro board.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the frame to delete.`,
      },
    ],
  },
  {
    name: 'miro_frame_get',
    description: `Retrieves details of a specific frame item on a Miro board.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the frame item.`,
      },
    ],
  },
  {
    name: 'miro_frame_update',
    description: `Updates the title, style, or position of a frame on a Miro board.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the frame to update.`,
      },
      {
        name: 'fill_color',
        type: 'string',
        required: false,
        description: `Updated background fill color as hex code.`,
      },
      {
        name: 'height',
        type: 'number',
        required: false,
        description: `Updated height in board units.`,
      },
      {
        name: 'position_x',
        type: 'number',
        required: false,
        description: `Updated X coordinate on the board.`,
      },
      {
        name: 'position_y',
        type: 'number',
        required: false,
        description: `Updated Y coordinate on the board.`,
      },
      { name: 'title', type: 'string', required: false, description: `Updated frame title.` },
      {
        name: 'width',
        type: 'number',
        required: false,
        description: `Updated width in board units.`,
      },
    ],
  },
  {
    name: 'miro_group_create',
    description: `Creates a group of items on a Miro board. Items in a group move together.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      {
        name: 'item_ids',
        type: 'string',
        required: true,
        description: `JSON array of item IDs to group, e.g. ["id1","id2"]`,
      },
    ],
  },
  {
    name: 'miro_group_delete',
    description: `Deletes a group from a Miro board (items remain but are ungrouped).`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      {
        name: 'group_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the group.`,
      },
    ],
  },
  {
    name: 'miro_group_items_get',
    description: `Retrieves a group and its items from a Miro board.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      {
        name: 'group_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the group.`,
      },
    ],
  },
  {
    name: 'miro_groups_list',
    description: `Lists all item groups on a Miro board.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from previous response.`,
      },
    ],
  },
  {
    name: 'miro_image_create',
    description: `Creates an image item on a Miro board from a publicly accessible URL.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `Publicly accessible URL of the image.`,
      },
      {
        name: 'height',
        type: 'number',
        required: false,
        description: `Height of the image in board units.`,
      },
      {
        name: 'parent_id',
        type: 'string',
        required: false,
        description: `ID of a parent frame to place the image inside.`,
      },
      {
        name: 'position_x',
        type: 'number',
        required: false,
        description: `X coordinate on the board (0 = center).`,
      },
      {
        name: 'position_y',
        type: 'number',
        required: false,
        description: `Y coordinate on the board (0 = center).`,
      },
      {
        name: 'rotation',
        type: 'number',
        required: false,
        description: `Rotation angle in degrees.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Display name/title for the image item.`,
      },
      {
        name: 'width',
        type: 'number',
        required: false,
        description: `Width of the image in board units.`,
      },
    ],
  },
  {
    name: 'miro_image_delete',
    description: `Deletes an image item from a Miro board.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the image item to delete.`,
      },
    ],
  },
  {
    name: 'miro_image_get',
    description: `Retrieves details of a specific image item on a Miro board.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the image item.`,
      },
    ],
  },
  {
    name: 'miro_image_update',
    description: `Updates the URL, title, position, or size of an image item on a Miro board.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the image item to update.`,
      },
      {
        name: 'position_x',
        type: 'number',
        required: false,
        description: `Updated X coordinate on the board.`,
      },
      {
        name: 'position_y',
        type: 'number',
        required: false,
        description: `Updated Y coordinate on the board.`,
      },
      {
        name: 'rotation',
        type: 'number',
        required: false,
        description: `Updated rotation angle in degrees.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Updated title for the image.`,
      },
      { name: 'url', type: 'string', required: false, description: `Updated image URL.` },
      {
        name: 'width',
        type: 'number',
        required: false,
        description: `Updated width in board units.`,
      },
    ],
  },
  {
    name: 'miro_item_delete',
    description: `Deletes a specific item from a Miro board.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the item to delete.`,
      },
    ],
  },
  {
    name: 'miro_item_get',
    description: `Retrieves details of a specific item on a Miro board by its item ID.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the item.`,
      },
    ],
  },
  {
    name: 'miro_item_tag_attach',
    description: `Attaches an existing tag to a specific item on a Miro board.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the item to attach the tag to.`,
      },
      {
        name: 'tag_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the tag to attach.`,
      },
    ],
  },
  {
    name: 'miro_item_tag_remove',
    description: `Removes a tag from a specific item on a Miro board. Does not delete the tag from the board.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the item.`,
      },
      {
        name: 'tag_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the tag to remove from the item.`,
      },
    ],
  },
  {
    name: 'miro_item_tags_get',
    description: `Returns all tags attached to a specific item on a Miro board.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the item.`,
      },
    ],
  },
  {
    name: 'miro_items_bulk_create',
    description: `Creates up to 20 board items in a single transactional request. Pass a JSON array of item objects as \`items\`. Each object must have a \`type\` field (sticky_note, text, shape, card, image, frame, etc.) and appropriate data.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      {
        name: 'items',
        type: 'string',
        required: true,
        description: `JSON array of item objects, each with "type" and item-specific fields.`,
      },
    ],
  },
  {
    name: 'miro_items_list',
    description: `Returns all items on a Miro board. Optionally filter by item type.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
    ],
  },
  {
    name: 'miro_mindmap_node_create',
    description: `Creates a mind map node on a Miro board (experimental API). Omit parent_node_id for the root node.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      {
        name: 'node_value',
        type: 'string',
        required: true,
        description: `Text content of the mind map node.`,
      },
      {
        name: 'parent_node_id',
        type: 'string',
        required: false,
        description: `ID of parent mind map node (omit for root node).`,
      },
    ],
  },
  {
    name: 'miro_mindmap_node_delete',
    description: `Deletes a mind map node and all its children from a Miro board (experimental API).`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the item.`,
      },
    ],
  },
  {
    name: 'miro_mindmap_node_get',
    description: `Retrieves a specific mind map node from a Miro board (experimental API).`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the item.`,
      },
    ],
  },
  {
    name: 'miro_mindmap_nodes_list',
    description: `Lists all mind map nodes on a Miro board (experimental API).`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from previous response.`,
      },
    ],
  },
  {
    name: 'miro_oembed_get',
    description: `Returns oEmbed data for a Miro board URL so it can be embedded as a live iframe in external sites.`,
    params: [
      { name: 'url', type: 'string', required: true, description: `Full URL of the Miro board.` },
      {
        name: 'format',
        type: 'string',
        required: false,
        description: `Response format: json (default) or xml.`,
      },
      {
        name: 'maxheight',
        type: 'integer',
        required: false,
        description: `Maximum embed height in pixels.`,
      },
      {
        name: 'maxwidth',
        type: 'integer',
        required: false,
        description: `Maximum embed width in pixels.`,
      },
    ],
  },
  {
    name: 'miro_org_get',
    description: `Retrieves information about the organization (Enterprise only).`,
    params: [{ name: 'org_id', type: 'string', required: true, description: `Organization ID.` }],
  },
  {
    name: 'miro_org_member_get',
    description: `Retrieves a specific member of an organization (Enterprise only).`,
    params: [
      { name: 'member_id', type: 'string', required: true, description: `Member ID.` },
      { name: 'org_id', type: 'string', required: true, description: `Organization ID.` },
    ],
  },
  {
    name: 'miro_org_members_list',
    description: `Lists all members of an organization (Enterprise only).`,
    params: [
      { name: 'org_id', type: 'string', required: true, description: `Organization ID.` },
      { name: 'cursor', type: 'string', required: false, description: `Pagination cursor.` },
      {
        name: 'emails',
        type: 'string',
        required: false,
        description: `Comma-separated list of emails to filter by.`,
      },
      { name: 'limit', type: 'integer', required: false, description: `Max results per page.` },
      {
        name: 'role',
        type: 'string',
        required: false,
        description: `Filter by role: admin | member.`,
      },
    ],
  },
  {
    name: 'miro_project_create',
    description: `Creates a project (space) in a team (Enterprise only).`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Project name.` },
      { name: 'org_id', type: 'string', required: true, description: `Organization ID.` },
      { name: 'team_id', type: 'string', required: true, description: `Team ID.` },
      { name: 'description', type: 'string', required: false, description: `Project description.` },
    ],
  },
  {
    name: 'miro_project_delete',
    description: `Deletes a project from a team (Enterprise only).`,
    params: [
      { name: 'org_id', type: 'string', required: true, description: `Organization ID.` },
      { name: 'project_id', type: 'string', required: true, description: `Project ID.` },
      { name: 'team_id', type: 'string', required: true, description: `Team ID.` },
    ],
  },
  {
    name: 'miro_project_get',
    description: `Retrieves a specific project (Enterprise only).`,
    params: [
      { name: 'org_id', type: 'string', required: true, description: `Organization ID.` },
      { name: 'project_id', type: 'string', required: true, description: `Project ID.` },
      { name: 'team_id', type: 'string', required: true, description: `Team ID.` },
    ],
  },
  {
    name: 'miro_project_member_add',
    description: `Adds a member to a project (Enterprise only).`,
    params: [
      { name: 'member_id', type: 'string', required: true, description: `Member ID to add.` },
      { name: 'org_id', type: 'string', required: true, description: `Organization ID.` },
      { name: 'project_id', type: 'string', required: true, description: `Project ID.` },
      { name: 'team_id', type: 'string', required: true, description: `Team ID.` },
      {
        name: 'role',
        type: 'string',
        required: false,
        description: `Role: editor | commenter | viewer.`,
      },
    ],
  },
  {
    name: 'miro_project_member_delete',
    description: `Removes a member from a project (Enterprise only).`,
    params: [
      { name: 'member_id', type: 'string', required: true, description: `Member ID.` },
      { name: 'org_id', type: 'string', required: true, description: `Organization ID.` },
      { name: 'project_id', type: 'string', required: true, description: `Project ID.` },
      { name: 'team_id', type: 'string', required: true, description: `Team ID.` },
    ],
  },
  {
    name: 'miro_project_members_list',
    description: `Lists members of a project (Enterprise only).`,
    params: [
      { name: 'org_id', type: 'string', required: true, description: `Organization ID.` },
      { name: 'project_id', type: 'string', required: true, description: `Project ID.` },
      { name: 'team_id', type: 'string', required: true, description: `Team ID.` },
      { name: 'cursor', type: 'string', required: false, description: `Pagination cursor.` },
      { name: 'limit', type: 'integer', required: false, description: `Max results.` },
    ],
  },
  {
    name: 'miro_projects_list',
    description: `Lists all projects in a team (Enterprise only).`,
    params: [
      { name: 'org_id', type: 'string', required: true, description: `Organization ID.` },
      { name: 'team_id', type: 'string', required: true, description: `Team ID.` },
      { name: 'cursor', type: 'string', required: false, description: `Pagination cursor.` },
      { name: 'limit', type: 'integer', required: false, description: `Max results.` },
    ],
  },
  {
    name: 'miro_shape_create',
    description: `Creates a shape item on a Miro board. Shapes can contain text and support rich styling.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      {
        name: 'shape',
        type: 'string',
        required: true,
        description: `Shape type. Valid values: rectangle, round_rectangle, circle, triangle, rhombus, parallelogram, trapezoid, pentagon, hexagon, octagon, star, cross, right_arrow, left_right_arrow, cloud.`,
      },
      {
        name: 'content',
        type: 'string',
        required: false,
        description: `Text content inside the shape (supports simple HTML).`,
      },
      {
        name: 'fill_color',
        type: 'string',
        required: false,
        description: `Background fill color as hex code (e.g. #ff0000) or name.`,
      },
      {
        name: 'font_size',
        type: 'string',
        required: false,
        description: `Font size for text inside the shape as a string number.`,
      },
      {
        name: 'height',
        type: 'number',
        required: false,
        description: `Height of the shape in board units.`,
      },
      {
        name: 'parent_id',
        type: 'string',
        required: false,
        description: `ID of a parent frame to place the shape inside.`,
      },
      {
        name: 'position_x',
        type: 'number',
        required: false,
        description: `X coordinate on the board (0 = center).`,
      },
      {
        name: 'position_y',
        type: 'number',
        required: false,
        description: `Y coordinate on the board (0 = center).`,
      },
      {
        name: 'rotation',
        type: 'number',
        required: false,
        description: `Rotation angle in degrees.`,
      },
      {
        name: 'stroke_color',
        type: 'string',
        required: false,
        description: `Border/stroke color as hex code.`,
      },
      {
        name: 'stroke_width',
        type: 'string',
        required: false,
        description: `Border stroke width as a string number.`,
      },
      {
        name: 'text_align',
        type: 'string',
        required: false,
        description: `Horizontal text alignment. Valid values: left, center, right.`,
      },
      {
        name: 'width',
        type: 'number',
        required: false,
        description: `Width of the shape in board units.`,
      },
    ],
  },
  {
    name: 'miro_shape_delete',
    description: `Deletes a shape item from a Miro board.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the shape to delete.`,
      },
    ],
  },
  {
    name: 'miro_shape_get',
    description: `Retrieves details of a specific shape item on a Miro board.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the shape item.`,
      },
    ],
  },
  {
    name: 'miro_shape_update',
    description: `Updates the content, style, or position of a shape item on a Miro board.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the shape to update.`,
      },
      {
        name: 'content',
        type: 'string',
        required: false,
        description: `Updated text content inside the shape.`,
      },
      {
        name: 'fill_color',
        type: 'string',
        required: false,
        description: `Updated fill color as hex code.`,
      },
      {
        name: 'height',
        type: 'number',
        required: false,
        description: `Updated height in board units.`,
      },
      {
        name: 'parent_id',
        type: 'string',
        required: false,
        description: `ID of a parent frame to move the shape into.`,
      },
      {
        name: 'position_x',
        type: 'number',
        required: false,
        description: `Updated X coordinate on the board.`,
      },
      {
        name: 'position_y',
        type: 'number',
        required: false,
        description: `Updated Y coordinate on the board.`,
      },
      {
        name: 'shape',
        type: 'string',
        required: false,
        description: `Updated shape type (e.g. rectangle, circle, triangle).`,
      },
      {
        name: 'stroke_color',
        type: 'string',
        required: false,
        description: `Updated stroke/border color as hex code.`,
      },
      {
        name: 'width',
        type: 'number',
        required: false,
        description: `Updated width in board units.`,
      },
    ],
  },
  {
    name: 'miro_sticky_note_create',
    description: `Creates a sticky note item on a Miro board.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      {
        name: 'content',
        type: 'string',
        required: false,
        description: `Text content of the sticky note (supports simple HTML tags).`,
      },
      {
        name: 'fill_color',
        type: 'string',
        required: false,
        description: `Background color. Valid values: gray, light_yellow, yellow, orange, light_green, green, dark_green, cyan, light_pink, pink, violet, red, light_blue, blue, dark_blue, black, white.`,
      },
      {
        name: 'parent_id',
        type: 'string',
        required: false,
        description: `ID of a parent frame to place the sticky note inside.`,
      },
      {
        name: 'position_x',
        type: 'number',
        required: false,
        description: `X coordinate on the board (0 = center).`,
      },
      {
        name: 'position_y',
        type: 'number',
        required: false,
        description: `Y coordinate on the board (0 = center).`,
      },
      {
        name: 'shape',
        type: 'string',
        required: false,
        description: `Shape of the sticky note. Valid values: square, rectangle.`,
      },
      {
        name: 'text_align',
        type: 'string',
        required: false,
        description: `Horizontal text alignment. Valid values: left, center, right.`,
      },
      {
        name: 'text_align_vertical',
        type: 'string',
        required: false,
        description: `Vertical text alignment. Valid values: top, middle, bottom.`,
      },
      {
        name: 'width',
        type: 'number',
        required: false,
        description: `Width of the sticky note in board units.`,
      },
    ],
  },
  {
    name: 'miro_sticky_note_delete',
    description: `Deletes a sticky note from a Miro board.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the sticky note to delete.`,
      },
    ],
  },
  {
    name: 'miro_sticky_note_get',
    description: `Retrieves details of a specific sticky note on a Miro board.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the sticky note item.`,
      },
    ],
  },
  {
    name: 'miro_sticky_note_update',
    description: `Updates the content, style, or position of a sticky note on a Miro board.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the sticky note to update.`,
      },
      {
        name: 'content',
        type: 'string',
        required: false,
        description: `Updated text content of the sticky note.`,
      },
      {
        name: 'fill_color',
        type: 'string',
        required: false,
        description: `Updated background color (e.g. yellow, blue, pink).`,
      },
      {
        name: 'parent_id',
        type: 'string',
        required: false,
        description: `ID of a parent frame to move the sticky note into.`,
      },
      {
        name: 'position_x',
        type: 'number',
        required: false,
        description: `Updated X coordinate on the board.`,
      },
      {
        name: 'position_y',
        type: 'number',
        required: false,
        description: `Updated Y coordinate on the board.`,
      },
      {
        name: 'shape',
        type: 'string',
        required: false,
        description: `Updated shape. Valid values: square, rectangle.`,
      },
      {
        name: 'text_align',
        type: 'string',
        required: false,
        description: `Updated horizontal text alignment: left, center, right.`,
      },
      {
        name: 'width',
        type: 'number',
        required: false,
        description: `Updated width of the sticky note.`,
      },
    ],
  },
  {
    name: 'miro_tag_create',
    description: `Creates a tag on a Miro board. Tags can be attached to items to categorize them.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `Tag text (max 120 characters, must be unique on the board).`,
      },
      {
        name: 'fill_color',
        type: 'string',
        required: false,
        description: `Tag color. Valid values: red, light_green, cyan, yellow, magenta, green, blue, gray, violet, dark_green, dark_blue, black.`,
      },
    ],
  },
  {
    name: 'miro_tag_delete',
    description: `Deletes a tag from a Miro board. Detaches the tag from all items it was attached to.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      {
        name: 'tag_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the tag to delete.`,
      },
    ],
  },
  {
    name: 'miro_tag_get',
    description: `Retrieves details of a specific tag on a Miro board.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      {
        name: 'tag_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the tag.`,
      },
    ],
  },
  {
    name: 'miro_tag_update',
    description: `Updates the title or color of a tag on a Miro board.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      {
        name: 'tag_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the tag to update.`,
      },
      {
        name: 'fill_color',
        type: 'string',
        required: false,
        description: `Updated tag color (e.g. red, blue, green, yellow).`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Updated tag text (max 120 characters, must be unique on the board).`,
      },
    ],
  },
  {
    name: 'miro_tags_list',
    description: `Returns all tags on a Miro board.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
    ],
  },
  {
    name: 'miro_team_create',
    description: `Creates a new team in an organization (Enterprise only).`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Team name.` },
      { name: 'org_id', type: 'string', required: true, description: `Organization ID.` },
      { name: 'description', type: 'string', required: false, description: `Team description.` },
    ],
  },
  {
    name: 'miro_team_delete',
    description: `Deletes a team from an organization (Enterprise only).`,
    params: [
      { name: 'org_id', type: 'string', required: true, description: `Organization ID.` },
      { name: 'team_id', type: 'string', required: true, description: `Team ID.` },
    ],
  },
  {
    name: 'miro_team_get',
    description: `Retrieves a specific team in an organization (Enterprise only).`,
    params: [
      { name: 'org_id', type: 'string', required: true, description: `Organization ID.` },
      { name: 'team_id', type: 'string', required: true, description: `Team ID.` },
    ],
  },
  {
    name: 'miro_team_member_delete',
    description: `Removes a member from a team (Enterprise only).`,
    params: [
      { name: 'member_id', type: 'string', required: true, description: `Member ID.` },
      { name: 'org_id', type: 'string', required: true, description: `Organization ID.` },
      { name: 'team_id', type: 'string', required: true, description: `Team ID.` },
    ],
  },
  {
    name: 'miro_team_member_get',
    description: `Retrieves a specific member of a team (Enterprise only).`,
    params: [
      { name: 'member_id', type: 'string', required: true, description: `Member ID.` },
      { name: 'org_id', type: 'string', required: true, description: `Organization ID.` },
      { name: 'team_id', type: 'string', required: true, description: `Team ID.` },
    ],
  },
  {
    name: 'miro_team_member_invite',
    description: `Invites a user to a team by email (Enterprise only).`,
    params: [
      { name: 'email', type: 'string', required: true, description: `User email.` },
      { name: 'org_id', type: 'string', required: true, description: `Organization ID.` },
      { name: 'team_id', type: 'string', required: true, description: `Team ID.` },
      {
        name: 'role',
        type: 'string',
        required: false,
        description: `Role: admin | member | guest.`,
      },
    ],
  },
  {
    name: 'miro_team_member_update',
    description: `Updates the role of a team member (Enterprise only).`,
    params: [
      { name: 'member_id', type: 'string', required: true, description: `Member ID.` },
      { name: 'org_id', type: 'string', required: true, description: `Organization ID.` },
      {
        name: 'role',
        type: 'string',
        required: true,
        description: `New role: admin | member | guest.`,
      },
      { name: 'team_id', type: 'string', required: true, description: `Team ID.` },
    ],
  },
  {
    name: 'miro_team_members_list',
    description: `Lists members of a team (Enterprise only).`,
    params: [
      { name: 'org_id', type: 'string', required: true, description: `Organization ID.` },
      { name: 'team_id', type: 'string', required: true, description: `Team ID.` },
      { name: 'cursor', type: 'string', required: false, description: `Pagination cursor.` },
      { name: 'limit', type: 'integer', required: false, description: `Max results.` },
    ],
  },
  {
    name: 'miro_team_settings_get',
    description: `Retrieves settings for a team (Enterprise only).`,
    params: [
      { name: 'org_id', type: 'string', required: true, description: `Organization ID.` },
      { name: 'team_id', type: 'string', required: true, description: `Team ID.` },
    ],
  },
  {
    name: 'miro_team_settings_update',
    description: `Updates settings for a team (Enterprise only).`,
    params: [
      { name: 'org_id', type: 'string', required: true, description: `Organization ID.` },
      { name: 'team_id', type: 'string', required: true, description: `Team ID.` },
      {
        name: 'copy_access_level',
        type: 'string',
        required: false,
        description: `Who can copy boards: team_only | company | anyone.`,
      },
      {
        name: 'sharing_policy',
        type: 'string',
        required: false,
        description: `Board sharing policy: team_only | company | public.`,
      },
    ],
  },
  {
    name: 'miro_team_update',
    description: `Updates a team's name or description (Enterprise only).`,
    params: [
      { name: 'org_id', type: 'string', required: true, description: `Organization ID.` },
      { name: 'team_id', type: 'string', required: true, description: `Team ID.` },
      { name: 'description', type: 'string', required: false, description: `New description.` },
      { name: 'name', type: 'string', required: false, description: `New team name.` },
    ],
  },
  {
    name: 'miro_teams_list',
    description: `Lists all teams in an organization (Enterprise only).`,
    params: [
      { name: 'org_id', type: 'string', required: true, description: `Organization ID.` },
      { name: 'cursor', type: 'string', required: false, description: `Pagination cursor.` },
      { name: 'limit', type: 'integer', required: false, description: `Max results per page.` },
    ],
  },
  {
    name: 'miro_text_create',
    description: `Creates a text item on a Miro board.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      {
        name: 'content',
        type: 'string',
        required: true,
        description: `Text content (supports HTML tags).`,
      },
      { name: 'color', type: 'string', required: false, description: `Text color as hex code.` },
      {
        name: 'fill_color',
        type: 'string',
        required: false,
        description: `Background color as hex code.`,
      },
      {
        name: 'font_size',
        type: 'string',
        required: false,
        description: `Font size as a string number (e.g. '14').`,
      },
      {
        name: 'parent_id',
        type: 'string',
        required: false,
        description: `ID of a parent frame to place the text inside.`,
      },
      {
        name: 'position_x',
        type: 'number',
        required: false,
        description: `X coordinate on the board (0 = center).`,
      },
      {
        name: 'position_y',
        type: 'number',
        required: false,
        description: `Y coordinate on the board (0 = center).`,
      },
      {
        name: 'rotation',
        type: 'number',
        required: false,
        description: `Rotation angle in degrees.`,
      },
      {
        name: 'text_align',
        type: 'string',
        required: false,
        description: `Text alignment. Valid values: left, center, right.`,
      },
      {
        name: 'width',
        type: 'number',
        required: false,
        description: `Width of the text box in board units.`,
      },
    ],
  },
  {
    name: 'miro_text_delete',
    description: `Deletes a text item from a Miro board.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the text item to delete.`,
      },
    ],
  },
  {
    name: 'miro_text_get',
    description: `Retrieves details of a specific text item on a Miro board.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the text item.`,
      },
    ],
  },
  {
    name: 'miro_text_update',
    description: `Updates the content, style, or position of a text item on a Miro board.`,
    params: [
      {
        name: 'board_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the board.`,
      },
      {
        name: 'item_id',
        type: 'string',
        required: true,
        description: `Unique identifier of the text item to update.`,
      },
      {
        name: 'color',
        type: 'string',
        required: false,
        description: `Updated text color as hex code.`,
      },
      { name: 'content', type: 'string', required: false, description: `Updated text content.` },
      {
        name: 'font_size',
        type: 'string',
        required: false,
        description: `Updated font size as a string number.`,
      },
      {
        name: 'position_x',
        type: 'number',
        required: false,
        description: `Updated X coordinate on the board.`,
      },
      {
        name: 'position_y',
        type: 'number',
        required: false,
        description: `Updated Y coordinate on the board.`,
      },
      {
        name: 'width',
        type: 'number',
        required: false,
        description: `Updated width in board units.`,
      },
    ],
  },
  {
    name: 'miro_token_info_get',
    description: `Returns information about the current OAuth token including the authenticated user ID, name, team, and granted scopes.`,
    params: [],
  },
]
