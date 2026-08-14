import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'trello_add_attachment_to_card',
    description: `Attach a URL to a Trello card. Trello fetches the URL and shows a preview when it recognizes the link type (e.g. images, YouTube, Google Drive).`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the card to attach the URL to`,
      },
      { name: 'url', type: 'string', required: true, description: `URL of the attachment` },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Display name for the attachment`,
      },
    ],
  },
  {
    name: 'trello_add_checklist_item',
    description: `Add a new item to a Trello checklist.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the checklist to add the item to`,
      },
      { name: 'name', type: 'string', required: true, description: `Text of the checklist item` },
      {
        name: 'checked',
        type: 'boolean',
        required: false,
        description: `Whether the item starts checked off`,
      },
      {
        name: 'pos',
        type: 'string',
        required: false,
        description: `Position of the item in the checklist: top, bottom, or a positive number`,
      },
    ],
  },
  {
    name: 'trello_add_comment_to_card',
    description: `Add a comment to a Trello card.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the card to comment on`,
      },
      { name: 'text', type: 'string', required: true, description: `The comment text` },
    ],
  },
  {
    name: 'trello_add_label_to_card',
    description: `Apply an existing board label to a Trello card. Use Get Board Labels or Create Label to find or create a label ID first.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the card to label` },
      {
        name: 'idLabel',
        type: 'string',
        required: true,
        description: `The ID of the label to add`,
      },
    ],
  },
  {
    name: 'trello_add_member_to_card',
    description: `Assign a member to a Trello card.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the card to assign the member to`,
      },
      {
        name: 'idMember',
        type: 'string',
        required: true,
        description: `The ID of the member to add`,
      },
    ],
  },
  {
    name: 'trello_create_board',
    description: `Create a new Trello board.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name of the board` },
      {
        name: 'defaultLists',
        type: 'boolean',
        required: false,
        description: `Whether to seed the board with the default To Do / Doing / Done lists`,
      },
      { name: 'desc', type: 'string', required: false, description: `Description of the board` },
      {
        name: 'idOrganization',
        type: 'string',
        required: false,
        description: `ID of the Workspace (organization) to create the board in`,
      },
    ],
  },
  {
    name: 'trello_create_card',
    description: `Create a new card on a Trello list.`,
    params: [
      {
        name: 'idList',
        type: 'string',
        required: true,
        description: `The ID of the list to create the card in`,
      },
      { name: 'desc', type: 'string', required: false, description: `Description of the card` },
      {
        name: 'due',
        type: 'string',
        required: false,
        description: `Due date for the card, ISO 8601 format`,
      },
      {
        name: 'idLabels',
        type: 'string',
        required: false,
        description: `Comma-separated list of label IDs to apply to the card`,
      },
      {
        name: 'idMembers',
        type: 'string',
        required: false,
        description: `Comma-separated list of member IDs to assign to the card`,
      },
      { name: 'name', type: 'string', required: false, description: `Name (title) of the card` },
      {
        name: 'pos',
        type: 'string',
        required: false,
        description: `Position of the card in the list: top, bottom, or a positive number`,
      },
    ],
  },
  {
    name: 'trello_create_checklist',
    description: `Create a new checklist on a Trello card.`,
    params: [
      {
        name: 'idCard',
        type: 'string',
        required: true,
        description: `The ID of the card to add the checklist to`,
      },
      { name: 'name', type: 'string', required: true, description: `Name of the checklist` },
      {
        name: 'pos',
        type: 'string',
        required: false,
        description: `Position of the checklist on the card: top, bottom, or a positive number`,
      },
    ],
  },
  {
    name: 'trello_create_label',
    description: `Create a new label on a Trello board. Use Add Label To Card afterward to apply it.`,
    params: [
      { name: 'color', type: 'string', required: true, description: `Color of the label` },
      {
        name: 'idBoard',
        type: 'string',
        required: true,
        description: `The ID of the board to create the label on`,
      },
      { name: 'name', type: 'string', required: true, description: `Name of the label` },
    ],
  },
  {
    name: 'trello_create_list',
    description: `Create a new list on a Trello board.`,
    params: [
      {
        name: 'idBoard',
        type: 'string',
        required: true,
        description: `The ID of the board to create the list on`,
      },
      { name: 'name', type: 'string', required: true, description: `Name of the list` },
      {
        name: 'pos',
        type: 'string',
        required: false,
        description: `Position of the list on the board: top, bottom, or a positive number`,
      },
    ],
  },
  {
    name: 'trello_create_webhook',
    description: `Create a webhook that notifies a callback URL whenever a Trello board, card, list, or other model changes.`,
    params: [
      {
        name: 'callbackURL',
        type: 'string',
        required: true,
        description: `The publicly reachable URL Trello will POST updates to`,
      },
      {
        name: 'idModel',
        type: 'string',
        required: true,
        description: `The ID of the board, card, list, or other model to watch`,
      },
      {
        name: 'active',
        type: 'boolean',
        required: false,
        description: `Whether the webhook is active immediately`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description of the webhook`,
      },
    ],
  },
  {
    name: 'trello_delete_attachment',
    description: `Permanently delete an attachment from a Trello card. Complements Add Attachment To Card.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the card the attachment belongs to`,
      },
      {
        name: 'idAttachment',
        type: 'string',
        required: true,
        description: `The ID of the attachment to delete`,
      },
    ],
  },
  {
    name: 'trello_delete_card',
    description: `Permanently delete a Trello card. This cannot be undone — to keep the card but hide it, use Update Card with closed=true instead.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the card to delete` },
    ],
  },
  {
    name: 'trello_delete_checklist',
    description: `Permanently delete a Trello checklist. Complements Create Checklist.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the checklist to delete`,
      },
    ],
  },
  {
    name: 'trello_delete_checklist_item',
    description: `Remove a single item from a Trello checklist. Complements Add Checklist Item.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the checklist the item belongs to`,
      },
      {
        name: 'idCheckItem',
        type: 'string',
        required: true,
        description: `The ID of the checklist item to remove`,
      },
    ],
  },
  {
    name: 'trello_delete_comment',
    description: `Delete a comment from a Trello card. Comments are represented as actions of type commentCard; pass that action's ID. Complements Add Comment To Card.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the card the comment belongs to`,
      },
      {
        name: 'idAction',
        type: 'string',
        required: true,
        description: `The ID of the comment action to delete`,
      },
    ],
  },
  {
    name: 'trello_delete_label',
    description: `Permanently delete a Trello label from a board. This removes it from every card that uses it and cannot be undone.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the label to delete` },
    ],
  },
  {
    name: 'trello_delete_webhook',
    description: `Permanently delete a Trello webhook by its ID, stopping any further callbacks.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the webhook to delete`,
      },
    ],
  },
  {
    name: 'trello_get_board',
    description: `Get a Trello board by its ID, including optional fields, cards, lists, and members.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the board to retrieve`,
      },
      { name: 'cards', type: 'string', required: false, description: `Which cards to return` },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of board fields to return`,
      },
      { name: 'lists', type: 'string', required: false, description: `Which lists to return` },
      { name: 'members', type: 'string', required: false, description: `Which members to return` },
    ],
  },
  {
    name: 'trello_get_board_actions',
    description: `Get the activity log (actions) for a Trello board.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the board` },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Comma-separated list of action types to filter by`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of actions to return`,
      },
      { name: 'page', type: 'integer', required: false, description: `Page number for pagination` },
    ],
  },
  {
    name: 'trello_get_board_cards',
    description: `Get all cards on a Trello board, optionally filtered by status.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the board` },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of card fields to return`,
      },
      { name: 'filter', type: 'string', required: false, description: `Filter cards by status` },
    ],
  },
  {
    name: 'trello_get_board_labels',
    description: `Get all labels defined on a Trello board.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the board` },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of label fields to return`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of labels to return (0–1000)`,
      },
    ],
  },
  {
    name: 'trello_get_board_lists',
    description: `Get all lists on a Trello board, optionally filtered by status.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the board` },
      { name: 'filter', type: 'string', required: false, description: `Filter lists by status` },
    ],
  },
  {
    name: 'trello_get_board_members',
    description: `Get all members of a Trello board, optionally filtered by role.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the board` },
      { name: 'filter', type: 'string', required: false, description: `Filter members by role` },
    ],
  },
  {
    name: 'trello_get_card',
    description: `Get a Trello card by its ID.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the card to retrieve` },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of card fields to return`,
      },
    ],
  },
  {
    name: 'trello_get_checklist',
    description: `Get a Trello checklist by its ID, including its check items.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the checklist to retrieve`,
      },
      {
        name: 'checkItems',
        type: 'string',
        required: false,
        description: `Whether to include check items in the response`,
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of checklist fields to return`,
      },
    ],
  },
  {
    name: 'trello_get_current_member',
    description: `Get the authenticated user's own Trello member info (profile, username, boards/organizations membership summary).`,
    params: [
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of member fields to return`,
      },
    ],
  },
  {
    name: 'trello_get_webhook',
    description: `Get a Trello webhook's current details and status by ID. Complements Create Webhook and Delete Webhook.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the webhook to retrieve`,
      },
    ],
  },
  {
    name: 'trello_list_my_boards',
    description: `List the boards the authenticated user belongs to. Use this to discover board IDs before calling other board, card, or list tools.`,
    params: [
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of board fields to return`,
      },
      { name: 'filter', type: 'string', required: false, description: `Which boards to return` },
    ],
  },
  {
    name: 'trello_remove_label_from_card',
    description: `Remove a label from a Trello card. Complements Add Label To Card.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the card to remove the label from`,
      },
      {
        name: 'idLabel',
        type: 'string',
        required: true,
        description: `The ID of the label to remove`,
      },
    ],
  },
  {
    name: 'trello_remove_member_from_card',
    description: `Remove a member from a Trello card. Complements Add Member To Card.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the card to remove the member from`,
      },
      {
        name: 'idMember',
        type: 'string',
        required: true,
        description: `The ID of the member to remove`,
      },
    ],
  },
  {
    name: 'trello_search',
    description: `Global keyword search across Trello boards, cards, members, and organizations that the authenticated user can access.`,
    params: [
      { name: 'query', type: 'string', required: true, description: `The search query text` },
      {
        name: 'boards_limit',
        type: 'integer',
        required: false,
        description: `Maximum number of boards to return (max 1000)`,
      },
      {
        name: 'card_fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of card fields to return`,
      },
      {
        name: 'cards_limit',
        type: 'integer',
        required: false,
        description: `Maximum number of cards to return (max 1000)`,
      },
      {
        name: 'idBoards',
        type: 'string',
        required: false,
        description: `Restrict search to specific board IDs`,
      },
      {
        name: 'idCards',
        type: 'string',
        required: false,
        description: `Restrict search to specific card IDs`,
      },
      {
        name: 'idOrganizations',
        type: 'string',
        required: false,
        description: `Restrict search to specific Workspace (organization) IDs`,
      },
      {
        name: 'modelTypes',
        type: 'string',
        required: false,
        description: `Which model types to include in results`,
      },
      {
        name: 'partial',
        type: 'boolean',
        required: false,
        description: `Whether to also match partial words`,
      },
    ],
  },
  {
    name: 'trello_update_card',
    description: `Update a Trello card's name, description, due date, list, position, or archived state.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the card to update` },
      {
        name: 'closed',
        type: 'boolean',
        required: false,
        description: `Archive (true) or unarchive (false) the card`,
      },
      {
        name: 'desc',
        type: 'string',
        required: false,
        description: `New description for the card`,
      },
      {
        name: 'due',
        type: 'string',
        required: false,
        description: `New due date, ISO 8601 format. Pass an empty string to clear it.`,
      },
      {
        name: 'idList',
        type: 'string',
        required: false,
        description: `ID of the list to move the card to`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New name (title) for the card`,
      },
      {
        name: 'pos',
        type: 'string',
        required: false,
        description: `New position: top, bottom, or a positive number`,
      },
    ],
  },
  {
    name: 'trello_update_checklist_item',
    description: `Update a checklist item's text or checked state. Trello scopes this update by both the card and the check item ID.`,
    params: [
      {
        name: 'idCard',
        type: 'string',
        required: true,
        description: `The ID of the card that owns the checklist`,
      },
      {
        name: 'idCheckItem',
        type: 'string',
        required: true,
        description: `The ID of the checklist item to update`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New text for the checklist item`,
      },
      { name: 'state', type: 'string', required: false, description: `Checked state of the item` },
    ],
  },
  {
    name: 'trello_update_label',
    description: `Rename or recolor an existing Trello label.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the label to update` },
      { name: 'color', type: 'string', required: false, description: `New color for the label` },
      { name: 'name', type: 'string', required: false, description: `New name for the label` },
    ],
  },
  {
    name: 'trello_update_list',
    description: `Rename, reposition, or archive/unarchive a Trello list. Trello has no permanent list deletion — archiving (closed=true) is the standard way to remove a list from view.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `The ID of the list to update` },
      {
        name: 'closed',
        type: 'boolean',
        required: false,
        description: `Archive (true) or unarchive (false) the list`,
      },
      { name: 'name', type: 'string', required: false, description: `New name for the list` },
      {
        name: 'pos',
        type: 'string',
        required: false,
        description: `New position: top, bottom, or a positive number`,
      },
    ],
  },
]
