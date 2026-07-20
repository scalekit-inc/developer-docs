import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
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
]
