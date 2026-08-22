import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'trellomcp_trello_read_board',
    description: `Read Trello boards. Supports listing boards the authenticated user is a member of, listing all boards a user can access within a specific workspace (regardless of membership), fetching a single board by ARI or URL, and listing labels on a board.

Actions:
- "list" — paginated boards the authenticated user is a member of, across all workspaces. Use this for "my boards", "boards I'm on". It does NOT include boards the user could access but has not joined — for those, use "list_by_workspace". By default only open (non-archived) boards are returned; pass filter="all" to include archived boards or filter="closed" for only archived ones. Always include each board's url verbatim in the response. Optionally also filtered by visibility (limit defaults to 25, max 100). The open/closed filter is applied server-side (exact), whereas the visibility filter is applied per page — keep paginating via pageInfo.endCursor while pageInfo.hasNextPage is true to find all matches.
- "list_by_workspace" — paginated boards the user can access within ONE workspace (requires workspaceId), regardless of whether they are a member. Use this when the user names a workspace: "boards in <workspace>", "what's in this workspace". Supports the same open/closed filter, visibility filter, and pagination as "list". Always include each board's url verbatim in the response.
- "get" — return a single board by ARI or board URL (e.g. https://trello.com/b/<shortLink>/<slug>), including id, objectId, name, closed, shortLink, lastActivityAt, and url. Always include the board url verbatim as the full literal URL — never replace it with a label such as "View on Trello" or hide it behind link text; never omit it. Embeds the first 25 open lists with a listsHasMore flag; for the full set call trelloReadList with action="list_by_board".
- "list_labels" — paginated labels on a board (requires boardId; limit defaults to 25, max 100); paginate via nextCursor while hasMore is true.`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: true,
        description: `Action to perform: "list" (my boards), "list_by_workspace" (boards in a workspace), "get" (single board), "list_labels" (labels on a board).`,
      },
      {
        name: 'boardId',
        type: 'string',
        required: false,
        description: `Trello board identifier. Required for "get" and "list_labels"; not allowed for other actions. For action="get", accepts an ARI (e.g. ari:cloud:trello::board/workspace/<workspaceId>/<boardId>) or a Trello board URL (e.g. https://trello.com/b/<shortLink>/<slug>). For all other actions, boardId must be a board ARI — board URLs/short links are not supported.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor. Only valid for paginated actions ("list", "list_by_workspace", "list_labels").`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Filter boards by open/closed state. "open" (default) returns only active (non-archived) boards; "closed" returns only archived boards; "all" returns both. Only valid when action="list" or action="list_by_workspace".`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum results per page. Defaults to 25, max 100. Only valid for paginated actions ("list", "list_by_workspace", "list_labels").`,
      },
      {
        name: 'visibility',
        type: 'string',
        required: false,
        description: `Filter boards by visibility. Only valid when action="list" or action="list_by_workspace".`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `Trello workspace identifier. Required for action="list_by_workspace"; not allowed for other actions. Accepts an ARI (e.g. ari:cloud:trello::workspace/<workspaceId>).`,
      },
    ],
  },
  {
    name: 'trellomcp_trello_read_card',
    description: `Fetch a Trello card's full details, or list cards across a board or list to surface open work items.
Use this tool when you know the specific board, list, or card you want to inspect.
For keyword-based discovery across all boards/cards, use trelloSearch instead.
Actions:
- "get": fetch a single card by id or card URL (cardIdOrUrl required). Returns core card
  fields and labels (up to 25; truncation signalled via labelsHasMore).
- "list_by_board": fetch all cards for a board grouped by list (boardIdOrUrl required).
  Response: { lists: [{ id, name, cards: [...] }], hasNextPage, nextCursor }.
  Each page contains up to 25 lists (configurable via limit); each list contains all its cards.
  Filter by card state: "open" (default), "archived", or "all".
  Use cursor/limit to paginate over lists (max 50 lists per page).
- "list_by_list": fetch cards in a Trello list (listId required) with cursor-based pagination.
  Use this when the user asks for cards in a list or all cards from a specific list.
  Response: { cards: [...], pageInfo: { hasNextPage, endCursor } }.
  Filter by card state: "open" (default), "archived", or "all".
  Use cursor/limit to paginate (max 50 cards per page).

Due date timezone handling: Card due dates (due.date) are stored as UTC ISO 8601 timestamps.
For "today" or date-based due-date requests, first call trelloReadMember (get_me) for prefs.timezone and interpret due dates in the user's local time.`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: true,
        description: `Action to perform: "get" fetches a single card, "list_by_board" fetches cards grouped by list for a board, "list_by_list" fetches cards in a specific list.`,
      },
      {
        name: 'boardIdOrUrl',
        type: 'string',
        required: false,
        description: `Trello board identifier. Required for "list_by_board". Accepts an ARI (e.g. ari:cloud:trello::board/workspace/<workspaceId>/<boardId>). A Trello board URL is also accepted (e.g. https://trello.com/b/<shortLink>/<slug>).`,
      },
      {
        name: 'cardIdOrUrl',
        type: 'string',
        required: false,
        description: `Trello card identifier. Required for "get". Accepts an ARI (e.g. ari:cloud:trello::card/workspace/<workspaceId>/<cardId>) or a Trello card URL (e.g. https://trello.com/c/<shortLink>/<slug>).`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor for list actions. Not allowed for "get".`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Card state filter for "list_by_board" and "list_by_list". One of: "open" (default), "archived", "all". Not allowed for "get".`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Pagination limit (1-50) for list actions. Not allowed for "get".`,
      },
      {
        name: 'listId',
        type: 'string',
        required: false,
        description: `Trello list identifier. Required for "list_by_list". Accepts an ARI (e.g. ari:cloud:trello::list/workspace/<workspaceId>/<listId>).`,
      },
    ],
  },
  {
    name: 'trellomcp_trello_read_checklist',
    description: `Read Trello checklists (and their check items) attached to a card. Supported actions: "list_by_card" — list checklists on a card (cardId required); cursor/limit page the checklists. "get" — fetch a single checklist by id (checklistId required). In both actions each checklist is returned with its complete \`items\` list embedded.`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: true,
        description: `The read action to perform: "list_by_card" or "get".`,
      },
      {
        name: 'cardId',
        type: 'string',
        required: false,
        description: `Trello card ARI (e.g. "ari:cloud:trello::card/workspace/<workspaceId>/<cardId>"). Required for "list_by_card".`,
      },
      {
        name: 'checklistId',
        type: 'string',
        required: false,
        description: `Trello checklist ARI (e.g. "ari:cloud:trello::checklist/workspace/<workspaceId>/<checklistId>"). Required for "get".`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor for "list_by_card" (pages checklists). Not allowed for "get".`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Pagination limit (1-100, default 25) for "list_by_card" (caps checklists). Not allowed for "get".`,
      },
    ],
  },
  {
    name: 'trellomcp_trello_read_inbox',
    description: `Triage and review the authenticated user's Trello Inbox — the personal quick-capture board where new cards and notifications land. Use this specifically for the user's Inbox board. For cards on other boards or lists, use trelloReadCard instead.

Actions:
- "get" — return the Inbox board details (id, objectId, lastActivityAt). No additional arguments are needed.
- "list_cards" — list cards in the Inbox with optional filtering and pagination. Each card includes labels and up to 25 checklists (truncation signalled via checklistsHasMore). Filter by card state: "open" (default), "archived", or "all". Use cursor/limit to paginate (limit defaults to 25, max 50).`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: true,
        description: `Action to perform. "get" returns the Inbox board details. "list_cards" returns paginated cards in the Inbox (filter/cursor/limit are optional).`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor. Only valid when action="list_cards".`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Card state filter for "list_cards". One of: "open" (default), "archived", "all". Not allowed for "get".`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of cards to return per page. Defaults to 25, max 50. Only valid when action="list_cards".`,
      },
    ],
  },
  {
    name: 'trellomcp_trello_read_list',
    description: `Read Trello lists. Supported actions: "list_by_board" — list the open lists on a board (id, name, position, objectId) with cursor-based pagination (limit defaults to 25, max 50); "get" — return a single list by id, including up to 25 nested cards (id, name).`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: true,
        description: `Action to perform. "list_by_board" requires boardId (cursor/limit are optional). "get" requires listId (cursor/limit are not allowed).`,
      },
      {
        name: 'boardId',
        type: 'string',
        required: false,
        description: `Trello board identifier. Required when action="list_by_board". Accepts an ARI (e.g. ari:cloud:trello::board/workspace/<workspaceId>/<boardId>).`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor. Only valid when action="list_by_board".`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of lists to return per page. Defaults to 25, max 50. Only valid when action="list_by_board".`,
      },
      {
        name: 'listId',
        type: 'string',
        required: false,
        description: `Trello list identifier. Required when action="get". Accepts an ARI (e.g. ari:cloud:trello::list/workspace/<workspaceId>/<listId>).`,
      },
    ],
  },
  {
    name: 'trellomcp_trello_read_member',
    description: `Get a Trello member's profile. Call action="get_me" FIRST before any due-date query (e.g. "cards due today", "overdue cards") to get prefs.timezone (e.g. "America/Los_Angeles") so due dates can be interpreted in the user's local time rather than UTC. Also use action="get_me" to look up the current user's username, fullName, email, or avatarUrl. Supported actions: "get_me" — returns the authenticated user's Trello member profile (id, username, fullName, email, avatarUrl, url, prefs) via the Trello GraphQL API.`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: true,
        description: `The read action to perform. Only "get_me" is supported, which returns the authenticated user's profile.`,
      },
      {
        name: 'boardId',
        type: 'string',
        required: false,
        description: `Trello board identifier. Required for "list_by_board"; not allowed for other actions. Accepts an ARI (e.g. ari:cloud:trello::board/workspace/<workspaceId>/<boardId>).`,
      },
      {
        name: 'cardId',
        type: 'string',
        required: false,
        description: `Trello card identifier. Required for "list_by_card"; not allowed for other actions. Accepts an ARI (e.g. ari:cloud:trello::card/workspace/<workspaceId>/<cardId>).`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor. Only valid for member list actions.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of members to return per page. Defaults to 25, max 100. Only valid for member list actions.`,
      },
      {
        name: 'memberId',
        type: 'string',
        required: false,
        description: `Trello member identifier. Required for "get"; not allowed for any other action. Accepts an ARI (e.g. ari:cloud:trello::user/<memberId>).`,
      },
      {
        name: 'role',
        type: 'string',
        required: false,
        description: `Only return members with this board role. Only valid when action="list_by_board" — workspace membership cannot be filtered by role.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `Trello workspace identifier. Required for "list_by_workspace"; not allowed for other actions. Accepts an ARI (e.g. ari:cloud:trello::workspace/<workspaceId>).`,
      },
    ],
  },
  {
    name: 'trellomcp_trello_read_planner',
    description: `Read Trello Planner information for the authenticated user. Supported actions: "get" — returns the current member's planner (id, primaryAccountId, primaryCalendarId, primaryCalendar details); "list_events" — lists calendar events for a given planner calendar in a time window (plannerCalendarId, providerAccountId, start, end required; limit defaults to 25, max 50; cursor-based pagination supported); "get_event" — returns a single calendar event by provider event id (eventId, providerAccountId, plannerCalendarId required). Timezone handling: start and end must be UTC ISO 8601. For relative time queries like "today" or "this week", first use the "get" action to retrieve primaryCalendar.timezone, then convert to UTC before calling "list_events".`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: true,
        description: `Action to perform. "get" takes no additional args and returns the current member's planner. "list_events" requires plannerCalendarId, providerAccountId, start, end (cursor and limit optional). "get_event" requires eventId, providerAccountId, plannerCalendarId.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor. Only valid for "list_events".`,
      },
      {
        name: 'end',
        type: 'string',
        required: false,
        description: `Event window end as a UTC ISO 8601 date-time string. Must be after start. For relative queries like "today", first use the "get" action to retrieve primaryCalendar.timezone and convert to UTC. Required for "list_events".`,
      },
      {
        name: 'eventId',
        type: 'string',
        required: false,
        description: `Provider event ID. Required for "get_event".`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of events to return. Defaults to 25, max 50. Only valid for "list_events".`,
      },
      {
        name: 'plannerCalendarId',
        type: 'string',
        required: false,
        description: `Trello planner calendar identifier. Required for "list_events" and "get_event". Accepts an ARI (e.g. ari:cloud:trello::planner-calendar/<calendarId>).`,
      },
      {
        name: 'providerAccountId',
        type: 'string',
        required: false,
        description: `Provider account ARI (e.g. Google account ARI like "ari:third-party:google::account/<id>"). Required for "list_events" and "get_event".`,
      },
      {
        name: 'start',
        type: 'string',
        required: false,
        description: `Event window start as a UTC ISO 8601 date-time string. For relative queries like "today", first use the "get" action to retrieve primaryCalendar.timezone and convert to UTC. Required for "list_events".`,
      },
    ],
  },
  {
    name: 'trellomcp_trello_read_workspace',
    description: `Read Trello workspaces (organizations) the current user has access to. Supported actions: "list" — list workspaces visible to the authenticated user (cursor-based pagination, limit defaults to 25, max 100); "get" — fetch detailed data for a single workspace by id (typically used after "list" to drill into a workspace).`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: true,
        description: `The read action to perform. "list" returns paginated workspaces; "get" returns a single workspace by id.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor for the next page. Only valid for "list" action.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of workspaces to return (default 25, max 100). Only valid for "list" action.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `Trello workspace identifier. Required for "get" action. Accepts an ARI (e.g. ari:cloud:trello::workspace/<workspaceId>).`,
      },
    ],
  },
  {
    name: 'trellomcp_trello_search',
    description: `Discover Trello boards or cards by keyword across all workspaces. Use this when the user wants to find something by name or content but does not know which board it is on. If the user already knows the board or list they want to browse, use trelloReadCard (list_by_board or list_by_list) instead — it is faster and returns richer grouped results. Supported actions: "search_boards" — search for boards by name, always include each board's \`url\` verbatim in the response; "search_cards" — search for cards by name/content. Both support optional workspace scoping and cursor-based pagination. Both actions return open (non-archived) results by default. To search archived items instead, include \`is:archived\` in the query. "search_cards" additionally supports boardIds scoping and qualifiers: label:, board:, list:, member:, due:, has:. For archived/closed cards, use \`is:archived\` or \`is:closed\` (they are equivalent for cards only). For archived boards, use \`is:archived\` only — boards do not support the \`is:closed\` alias. Due date timezone handling: Trello due-date search qualifiers use UTC boundaries. For "today" or date-based due-date queries, first call trelloReadMember (get_me) for prefs.timezone and account for the user's local timezone.`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: true,
        description: `The search action to perform: "search_boards" or "search_cards".`,
      },
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Required free-text query string to search for (min 1 character).`,
      },
      {
        name: 'boardIds',
        type: 'array',
        required: false,
        description: `Optional list of board ARIs to scope card search results (e.g. ["ari:cloud:trello::board/workspace/<workspaceId>/<boardId>"]). Only valid for "search_cards".`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a prior response's nextCursor field.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return (default 10, max 100).`,
      },
      {
        name: 'partial',
        type: 'boolean',
        required: false,
        description: `Enable partial/prefix matching on names (default false).`,
      },
      {
        name: 'workspaceIds',
        type: 'array',
        required: false,
        description: `Optional list of workspace ARIs to scope search results (e.g. ["ari:cloud:trello::workspace/<workspaceId>"]). Valid for both "search_boards" and "search_cards".`,
      },
    ],
  },
  {
    name: 'trellomcp_trello_write_board',
    description: `Create Trello boards. Supported actions: "create" — create a Trello board in a workspace with a name, visibility, and optional preferences.`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: true,
        description: `Board write action to perform.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Name of the Trello board to create. Required for "create".`,
      },
      {
        name: 'prefs',
        type: 'object',
        required: false,
        description: `Optional board preferences payload for "create": voting, comments, invitations, selfJoin, cardCovers, cardCounts, isTemplate, showCompleteStatus, and background.key.`,
      },
      {
        name: 'visibility',
        type: 'string',
        required: false,
        description: `Board visibility. Supported values: ENTERPRISE, ORG, PRIVATE, PUBLIC. Use ORG for workspace visibility. Optional for "create".`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: false,
        description: `Trello workspace identifier that will own the new board. Accepts an ARI (e.g. ari:cloud:trello::workspace/<workspaceId>). Required for "create".`,
      },
    ],
  },
  {
    name: 'trellomcp_trello_write_card',
    description: `Create, update, move, archive, mark Trello cards done, or manage labels on cards. Supported actions: "create" — create a card on a list (listId and name required; desc, due, pos optional); "update" — update an existing card (cardId required; at least one of name, desc, due required); "move" — move a card to another list, optionally across boards (cardId and listId required, where listId is the destination list; boardId is optional and only needed when moving to a list on a different board; pos is optional and sets the card position in the destination list); "archive" — archive a card (cardId required); "mark_done" — mark a card as complete (cardId required); "attach_label" — attach a label to a card (cardId and labelId required); "detach_label" — detach a label from a card (cardId and labelId required).`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: true,
        description: `Action to perform: "create" creates a card; "update" updates card fields; "move" moves a card to another list; "archive" archives a card; "mark_done" marks a card complete; "attach_label" attaches a label to a card; "detach_label" detaches a label from a card.`,
      },
      {
        name: 'boardId',
        type: 'string',
        required: false,
        description: `Trello board ARI (e.g. "ari:cloud:trello::board/workspace/<workspaceId>/<boardId>"). Only used by "move": pass the destination board ARI when moving a card to a list on a different board. Omit when moving within the same board. Must be paired with listId — boardId on its own is not allowed.`,
      },
      {
        name: 'cardId',
        type: 'string',
        required: false,
        description: `Trello card ARI — the \`id\` field returned by trelloReadCard (e.g. "ari:cloud:trello::card/workspace/<workspaceId>/<cardId>"). Do NOT pass a Trello URL or short link; use trelloReadCard first to obtain the ARI. Required for "update", "move", "archive", "mark_done", "attach_label", "detach_label".`,
      },
      {
        name: 'desc',
        type: 'string',
        required: false,
        description: `Card description. Optional for "create" and "update".`,
      },
      {
        name: 'due',
        type: 'string',
        required: false,
        description: `Card due date as a UTC ISO 8601 date-time string (e.g. "2026-06-01T17:00:00.000Z"). Optional for "create" and "update".`,
      },
      {
        name: 'labelId',
        type: 'string',
        required: false,
        description: `Trello label ARI (e.g. "ari:cloud:trello::label/workspace/<workspaceId>/<labelId>"). Required for "attach_label" and "detach_label".`,
      },
      {
        name: 'listId',
        type: 'string',
        required: false,
        description: `Trello list ARI (e.g. "ari:cloud:trello::list/workspace/<workspaceId>/<listId>"). For "create", this is the list the new card is added to. For "move", this is the destination list the card is moved to. Required for "create" and "move".`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Card name. Required for "create"; optional for "update".`,
      },
      {
        name: 'pos',
        type: 'string',
        required: false,
        description: `Card position. Optional for "create" and "move". Use "top", "bottom", or a non-negative number (e.g. 16384).`,
      },
    ],
  },
  {
    name: 'trellomcp_trello_write_checklist',
    description: `Write Trello checklists and their check items. Actions: "create" — add a new checklist to a card by cardId and name, optionally placed at "top", "bottom", or an explicit numeric position. Returns the created checklist as a TrelloChecklist (id, objectId, name, position, checkItems[]). "add_item" — append a new check item to an existing checklist by checklistId and text, optionally placed at "top", "bottom", or an explicit numeric position. Returns the created check item (id, name, state, position) using the same normalized shape as trelloReadChecklist. "update_item" — update an existing check item by checklistId and itemId; supports renaming (text), toggling completion (checked), and repositioning (pos). Returns the updated check item. "update" — rename a checklist (name) and/or change its position on its card (pos) by checklistId. At least one of name or pos must be supplied. Returns the resulting checklist in the same normalized shape as trelloReadChecklist (id, name, position, checkItems[]).`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: true,
        description: `Action to perform. "create" requires cardId and name (pos is optional). "add_item" requires checklistId and text (pos is optional). "update_item" requires checklistId and itemId (text, checked, pos are optional). "update" requires checklistId and at least one of name or pos.`,
      },
      {
        name: 'cardId',
        type: 'string',
        required: false,
        description: `Trello card ARI — the \`id\` field returned by trelloReadCard (e.g. "ari:cloud:trello::card/workspace/<workspaceId>/<cardId>"). Do NOT pass a Trello URL or short link; use trelloReadCard first to obtain the ARI. Required when action="create".`,
      },
      {
        name: 'checked',
        type: 'boolean',
        required: false,
        description: `Whether the check item is completed. Optional when action="update_item".`,
      },
      {
        name: 'checklistId',
        type: 'string',
        required: false,
        description: `Trello checklist identifier. Required when action="add_item", action="update_item", or action="update". Accepts an ARI (e.g. ari:cloud:trello::checklist/workspace/<workspaceId>/<checklistId>).`,
      },
      {
        name: 'itemId',
        type: 'string',
        required: false,
        description: `Trello check item identifier. Required when action="update_item". Accepts an ARI (e.g. ari:cloud:trello::check-item/workspace/<workspaceId>/<itemId>).`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Name of the checklist. Required when action="create". Optional for action="update" (renames the checklist).`,
      },
      {
        name: 'pos',
        type: 'string',
        required: false,
        description: `Position of the new checklist on the card (action="create"), the initial position of the new check item within the checklist (action="add_item"), an existing check item (action="update_item"), or an existing checklist on its card (action="update"). "top" or "bottom" places it relative to existing items; a number sets an explicit absolute position.`,
      },
      {
        name: 'text',
        type: 'string',
        required: false,
        description: `Text (name) of the check item. Required when action="add_item"; optional rename when action="update_item".`,
      },
    ],
  },
  {
    name: 'trellomcp_trello_write_inbox',
    description: `Write Trello Inbox cards. Supported actions: "create" — create a new card in the Trello Inbox (name required; desc and due are optional). The Inbox list is resolved automatically — no listId needed. "update" — update fields on an existing Inbox card (cardId required; at least one of name, desc, or due required). "move" — move an Inbox card to another list and board (cardId, listId, and boardId required; pos optional). "archive" — archive an existing Inbox card (cardId required; no other fields allowed). Returns the created, updated, moved, or archived card including its id.`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: true,
        description: `Action to perform. "create" creates a new card in the Trello Inbox; "update" updates card fields; "move" moves a card to another list; "archive" archives an existing card.`,
      },
      {
        name: 'boardId',
        type: 'string',
        required: false,
        description: `Trello board ARI (e.g. "ari:cloud:trello::board/workspace/<workspaceId>/<boardId>"). Required for "move".`,
      },
      {
        name: 'cardId',
        type: 'string',
        required: false,
        description: `Trello Inbox card ARI — the \`id\` field returned by trelloReadInbox (e.g. "ari:cloud:trello::card/workspace/<workspaceId>/<cardId>"). Do NOT pass a Trello URL or short link; use trelloReadInbox first to obtain the ARI. Required for "update", "move", and "archive"; not used for "create".`,
      },
      {
        name: 'desc',
        type: 'string',
        required: false,
        description: `Card description. Optional for "create" and "update".`,
      },
      {
        name: 'due',
        type: 'string',
        required: false,
        description: `Card due date as a UTC ISO 8601 date-time string (e.g. "2026-06-01T17:00:00.000Z"). Optional for "create" and "update".`,
      },
      {
        name: 'listId',
        type: 'string',
        required: false,
        description: `Trello list ARI (e.g. "ari:cloud:trello::list/workspace/<workspaceId>/<listId>"). Required for "move": the destination list the card is moved to.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Card name. Required for "create"; optional for "update".`,
      },
      {
        name: 'pos',
        type: 'string',
        required: false,
        description: `Card position after move. Optional for "move". Use "top", "bottom", or a non-negative number (e.g. 16384).`,
      },
    ],
  },
  {
    name: 'trellomcp_trello_write_list',
    description: `Create, update, archive, or move a Trello list. Supported actions: "create" — create a new list on a board (boardId and name required; pos optional); "update" — rename an existing list (listId and name required); "archive" — soft-delete (close) a list (listId required); "move" — reposition a list, optionally moving it to another board (listId and pos required; boardId is optional and only needed when moving the list to a different board).`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: true,
        description: `Action to perform: "create", "update", "archive", or "move".`,
      },
      {
        name: 'boardId',
        type: 'string',
        required: false,
        description: `Trello board identifier. Required when action="create". For action="move", pass the destination board ARI to move the list to a different board; omit it to reposition within the same board. Accepts an ARI (e.g. ari:cloud:trello::board/workspace/<workspaceId>/<boardId>).`,
      },
      {
        name: 'listId',
        type: 'string',
        required: false,
        description: `Trello list identifier. Required when action="update", action="archive", or action="move". Accepts an ARI (e.g. ari:cloud:trello::list/workspace/<workspaceId>/<listId>).`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `List name. Required when action="create" or action="update".`,
      },
      {
        name: 'pos',
        type: 'string',
        required: false,
        description: `List position. Required when action="move"; optional when action="create". Use a non-negative number for an absolute position, or the string "top" or "bottom".`,
      },
    ],
  },
  {
    name: 'trellomcp_trello_write_planner',
    description: `Create Trello Planner calendar events and manage card-event links. Supported actions: "create_event" — create a calendar event (title, start, and end required; if cardId is provided, the event is linked to that card and title defaults to the card name); "link_card_to_event" — link an existing card to an existing event (cardId and eventId required); "unlink_card_from_event" — unlink a card from an event (cardId and eventId required). providerAccountId and calendarId are optional for all actions; when omitted the user's primary calendar account is used.`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: true,
        description: `Action to perform: "create_event", "link_card_to_event", or "unlink_card_from_event".`,
      },
      {
        name: 'calendarId',
        type: 'string',
        required: false,
        description: `The planner calendar ID to operate on. Optional — when omitted, the user's primary calendar is used.`,
      },
      {
        name: 'cardId',
        type: 'string',
        required: false,
        description: `Trello card ARI — the \`id\` field returned by trelloReadCard (e.g. "ari:cloud:trello::card/workspace/<workspaceId>/<cardId>"). Do NOT pass a Trello URL or short link; use trelloReadCard first to obtain the ARI. Required for "link_card_to_event" and "unlink_card_from_event". Optional for "create_event" (when provided, the new event is linked to the card).`,
      },
      {
        name: 'end',
        type: 'string',
        required: false,
        description: `Event end time as a UTC ISO 8601 date-time string. Required for "create_event".`,
      },
      {
        name: 'eventId',
        type: 'string',
        required: false,
        description: `The planner calendar event ID. Required for "link_card_to_event" and "unlink_card_from_event".`,
      },
      {
        name: 'providerAccountId',
        type: 'string',
        required: false,
        description: `The provider account ID (e.g. a linked Google or Outlook account ID). Optional — when omitted, the user's primary planner account is used.`,
      },
      {
        name: 'start',
        type: 'string',
        required: false,
        description: `Event start time as a UTC ISO 8601 date-time string. Required for "create_event".`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Event title. Required for "create_event" when cardId is not provided. When cardId is provided, defaults to the card name.`,
      },
    ],
  },
]
