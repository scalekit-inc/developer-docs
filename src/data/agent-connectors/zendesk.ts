import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'zendesk_groups_list',
    description: `List all groups in Zendesk. Groups are used to organize agents and route tickets.`,
    params: [
      { name: 'page', type: 'number', required: false, description: `Page number for pagination` },
      {
        name: 'per_page',
        type: 'number',
        required: false,
        description: `Number of groups per page (max 100)`,
      },
    ],
  },
  {
    name: 'zendesk_organization_get',
    description: `Retrieve details of a specific Zendesk organization by ID. Returns organization name, domain names, tags, notes, shared ticket settings, and custom fields.`,
    params: [
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Additional related data to include (e.g., lookup_relationship_fields)`,
      },
      {
        name: 'organization_id',
        type: 'number',
        required: true,
        description: `The ID of the organization to retrieve`,
      },
    ],
  },
  {
    name: 'zendesk_organizations_list',
    description: `List all organizations in Zendesk with pagination support.`,
    params: [
      { name: 'page', type: 'number', required: false, description: `Page number for pagination` },
      {
        name: 'per_page',
        type: 'number',
        required: false,
        description: `Number of organizations per page (max 100)`,
      },
    ],
  },
  {
    name: 'zendesk_search_tickets',
    description: `Search Zendesk tickets using a query string. Supports Zendesk's search syntax (e.g., 'type:ticket status:open'). Zendesk limits search results to 1,000 total — the maximum valid page is floor(1000 / per_page) (e.g., per_page=100 → max page 10, per_page=25 → max page 40). Stop paginating when next_page is null or you reach the max page; requesting beyond the limit returns a 400 error.`,
    params: [
      {
        name: 'page',
        type: 'number',
        required: false,
        description: `Page number for pagination. Max valid page = floor(1000 / per_page). Do not exceed this — Zendesk returns a 400 error beyond the 1,000 result limit.`,
      },
      {
        name: 'per_page',
        type: 'number',
        required: false,
        description: `Number of results per page (max 100). Determines the max page ceiling: floor(1000 / per_page). Higher values mean fewer pages but a lower max page number.`,
      },
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Search query string using Zendesk search syntax (e.g., 'type:ticket status:open assignee:me')`,
      },
      {
        name: 'sort_by',
        type: 'string',
        required: false,
        description: `Field to sort results by (updated_at, created_at, priority, status, ticket_type)`,
      },
      {
        name: 'sort_order',
        type: 'string',
        required: false,
        description: `Sort direction: asc or desc (default: desc)`,
      },
    ],
  },
  {
    name: 'zendesk_side_conversation_get',
    description: `Retrieve a specific side conversation on a Zendesk ticket by its ID. Returns the side conversation's state, subject, participants, preview text, and timestamps. Requires the Collaboration add-on.`,
    params: [
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Sideloads to include alongside the response. Use 'side_conversation_events' to include the full event history of the side conversation.`,
      },
      {
        name: 'side_conversation_id',
        type: 'string',
        required: true,
        description: `The ID of the side conversation to retrieve`,
      },
      {
        name: 'ticket_id',
        type: 'number',
        required: true,
        description: `The ID of the parent ticket`,
      },
    ],
  },
  {
    name: 'zendesk_side_conversations_list',
    description: `List all side conversations on a Zendesk ticket. Returns side conversations including their state, subject, participants, and preview text. Requires the Collaboration add-on.`,
    params: [
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Sideloads to include alongside the response. Use 'side_conversation_events' to include the full event history for each side conversation.`,
      },
      {
        name: 'ticket_id',
        type: 'number',
        required: true,
        description: `The ID of the ticket whose side conversations to list`,
      },
    ],
  },
  {
    name: 'zendesk_ticket_comments_list',
    description: `Retrieve all comments (public replies and internal notes) for a specific Zendesk ticket. Returns comment body, author, timestamps, and attachments.`,
    params: [
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Sideloads to include. Accepts 'users' to list email CCs.`,
      },
      {
        name: 'include_inline_images',
        type: 'boolean',
        required: false,
        description: `When true, inline images are listed as attachments (default: false)`,
      },
      {
        name: 'sort_order',
        type: 'string',
        required: false,
        description: `Sort direction for comments: asc or desc (default: asc)`,
      },
      {
        name: 'ticket_id',
        type: 'number',
        required: true,
        description: `The ID of the ticket whose comments to list`,
      },
    ],
  },
  {
    name: 'zendesk_ticket_create',
    description: `Create a new support ticket in Zendesk. Requires a comment/description and optionally a subject, priority, assignee, and tags.`,
    params: [
      {
        name: 'assignee_email',
        type: 'string',
        required: false,
        description: `Email of the agent to assign the ticket to`,
      },
      {
        name: 'comment_body',
        type: 'string',
        required: true,
        description: `The description or first comment of the ticket`,
      },
      {
        name: 'priority',
        type: 'string',
        required: false,
        description: `Ticket priority: urgent, high, normal, or low`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Ticket status: new, open, pending, hold, solved, or closed`,
      },
      {
        name: 'subject',
        type: 'string',
        required: false,
        description: `The subject/title of the ticket`,
      },
      {
        name: 'tags',
        type: 'array',
        required: false,
        description: `List of tags to apply to the ticket`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Ticket type: problem, incident, question, or task`,
      },
    ],
  },
  {
    name: 'zendesk_ticket_get',
    description: `Retrieve details of a specific Zendesk ticket by ID. Returns ticket properties including status, priority, subject, requester, assignee, and timestamps.`,
    params: [
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Comma-separated list of sideloads to include (e.g., users, groups, organizations)`,
      },
      {
        name: 'ticket_id',
        type: 'number',
        required: true,
        description: `The ID of the ticket to retrieve`,
      },
    ],
  },
  {
    name: 'zendesk_ticket_reply',
    description: `Add a public reply or internal note to a Zendesk ticket. Set public to false for internal notes visible only to agents.`,
    params: [
      {
        name: 'body',
        type: 'string',
        required: true,
        description: `The reply message content (plain text, markdown supported)`,
      },
      {
        name: 'public',
        type: 'boolean',
        required: false,
        description: `Whether the comment is public (true) or an internal note (false). Defaults to true.`,
      },
      {
        name: 'ticket_id',
        type: 'number',
        required: true,
        description: `The ID of the ticket to reply to`,
      },
    ],
  },
  {
    name: 'zendesk_ticket_update',
    description: `Update an existing Zendesk ticket. Change status, priority, assignee, subject, tags, or any other writable ticket field.`,
    params: [
      {
        name: 'assignee_email',
        type: 'string',
        required: false,
        description: `Email of the agent to assign the ticket to`,
      },
      {
        name: 'assignee_id',
        type: 'number',
        required: false,
        description: `ID of the agent to assign the ticket to`,
      },
      {
        name: 'group_id',
        type: 'number',
        required: false,
        description: `ID of the group to assign the ticket to`,
      },
      {
        name: 'priority',
        type: 'string',
        required: false,
        description: `Ticket priority: urgent, high, normal, or low`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Ticket status: new, open, pending, hold, solved, or closed`,
      },
      {
        name: 'subject',
        type: 'string',
        required: false,
        description: `New subject/title for the ticket`,
      },
      {
        name: 'tags',
        type: 'array',
        required: false,
        description: `List of tags to set on the ticket (replaces existing tags)`,
      },
      {
        name: 'ticket_id',
        type: 'number',
        required: true,
        description: `The ID of the ticket to update`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Ticket type: problem, incident, question, or task`,
      },
    ],
  },
  {
    name: 'zendesk_tickets_list',
    description: `List tickets in Zendesk with sorting and pagination. Returns tickets for the authenticated agent's account.`,
    params: [
      { name: 'page', type: 'number', required: false, description: `Page number for pagination` },
      {
        name: 'per_page',
        type: 'number',
        required: false,
        description: `Number of tickets per page (max 100)`,
      },
      {
        name: 'sort_by',
        type: 'string',
        required: false,
        description: `Field to sort by: created_at, updated_at, priority, status, ticket_type`,
      },
      {
        name: 'sort_order',
        type: 'string',
        required: false,
        description: `Sort direction: asc or desc (default: desc)`,
      },
    ],
  },
  {
    name: 'zendesk_user_create',
    description: `Create a new user in Zendesk. Can create end-users (customers), agents, or admins. Email is required for end-users.`,
    params: [
      {
        name: 'email',
        type: 'string',
        required: false,
        description: `Primary email address of the user`,
      },
      { name: 'name', type: 'string', required: true, description: `Full name of the user` },
      {
        name: 'organization_id',
        type: 'number',
        required: false,
        description: `ID of the organization to associate the user with`,
      },
      {
        name: 'phone',
        type: 'string',
        required: false,
        description: `Primary phone number (E.164 format, e.g. +15551234567)`,
      },
      {
        name: 'role',
        type: 'string',
        required: false,
        description: `User role: end-user, agent, or admin. Defaults to end-user.`,
      },
      {
        name: 'verified',
        type: 'boolean',
        required: false,
        description: `Whether the user's identity is verified. Defaults to false.`,
      },
    ],
  },
  {
    name: 'zendesk_user_get',
    description: `Retrieve details of a specific Zendesk user by ID. Returns user profile including name, email, role, organization, and account status.`,
    params: [
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Comma-separated list of sideloads to include`,
      },
      {
        name: 'user_id',
        type: 'number',
        required: true,
        description: `The ID of the user to retrieve`,
      },
    ],
  },
  {
    name: 'zendesk_users_list',
    description: `List users in Zendesk. Filter by role (end-user, agent, admin) with pagination support.`,
    params: [
      { name: 'page', type: 'number', required: false, description: `Page number for pagination` },
      {
        name: 'per_page',
        type: 'number',
        required: false,
        description: `Number of users per page (max 100)`,
      },
      {
        name: 'role',
        type: 'string',
        required: false,
        description: `Filter by role: end-user, agent, or admin`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Field to sort by. Prefix with - for descending (e.g. -created_at)`,
      },
    ],
  },
  {
    name: 'zendesk_views_list',
    description: `List ticket views in Zendesk. Views are saved filters for organizing tickets by status, assignee, tags, and more.`,
    params: [
      {
        name: 'access',
        type: 'string',
        required: false,
        description: `Filter by access level: personal, shared, or account`,
      },
      { name: 'page', type: 'number', required: false, description: `Page number for pagination` },
      {
        name: 'per_page',
        type: 'number',
        required: false,
        description: `Number of views per page (max 100)`,
      },
      {
        name: 'sort_by',
        type: 'string',
        required: false,
        description: `Field to sort by: title, updated_at, created_at, or position`,
      },
      {
        name: 'sort_order',
        type: 'string',
        required: false,
        description: `Sort direction: asc or desc`,
      },
    ],
  },
]
