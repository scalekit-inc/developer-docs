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
    name: 'zendesk_help_center_article_archive',
    description: `Archive (delete) a Help Center article by ID. The article can be restored from the Zendesk Help Center UI.`,
    params: [
      {
        name: 'article_id',
        type: 'number',
        required: true,
        description: `The ID of the article to archive.`,
      },
    ],
  },
  {
    name: 'zendesk_help_center_article_comment_create',
    description: `Add a comment to a Help Center article. Requires article ID, comment body, and locale.`,
    params: [
      {
        name: 'article_id',
        type: 'number',
        required: true,
        description: `The ID of the article to comment on.`,
      },
      { name: 'body', type: 'string', required: true, description: `HTML body of the comment.` },
      {
        name: 'locale',
        type: 'string',
        required: true,
        description: `Locale for the comment (e.g., en-us).`,
      },
      {
        name: 'author_id',
        type: 'number',
        required: false,
        description: `User ID of the comment author (Help Center managers only).`,
      },
      {
        name: 'notify_subscribers',
        type: 'boolean',
        required: false,
        description: `Whether to notify article subscribers of the new comment. Default: true.`,
      },
    ],
  },
  {
    name: 'zendesk_help_center_article_comments_list',
    description: `List all comments on a Help Center article.`,
    params: [
      {
        name: 'article_id',
        type: 'number',
        required: true,
        description: `The ID of the article whose comments to list.`,
      },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Comma-separated sideloads: users (authors), articles.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for offset pagination.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 100).`,
      },
      {
        name: 'sort_order',
        type: 'string',
        required: false,
        description: `Sort direction: asc or desc. Default: desc.`,
      },
    ],
  },
  {
    name: 'zendesk_help_center_article_create',
    description: `Create a new Help Center article in a section. Requires a title, locale, and section ID.`,
    params: [
      {
        name: 'locale',
        type: 'string',
        required: true,
        description: `Locale for the article (e.g., en-us).`,
      },
      {
        name: 'section_id',
        type: 'number',
        required: true,
        description: `The ID of the section to create the article in.`,
      },
      { name: 'title', type: 'string', required: true, description: `The title of the article.` },
      {
        name: 'author_id',
        type: 'number',
        required: false,
        description: `User ID of the article author.`,
      },
      {
        name: 'body',
        type: 'string',
        required: false,
        description: `HTML body content of the article.`,
      },
      {
        name: 'comments_disabled',
        type: 'boolean',
        required: false,
        description: `Whether to disable comments on this article.`,
      },
      {
        name: 'content_tag_ids',
        type: 'array',
        required: false,
        description: `IDs of existing content tags to attach to the article.`,
      },
      {
        name: 'draft',
        type: 'boolean',
        required: false,
        description: `If true, the article is saved as a draft and not published.`,
      },
      {
        name: 'notify_subscribers',
        type: 'boolean',
        required: false,
        description: `Set to false to suppress email notifications to article subscribers on creation. Default: true.`,
      },
      {
        name: 'permission_group_id',
        type: 'number',
        required: false,
        description: `The permission group that determines who can view this article.`,
      },
      {
        name: 'promoted',
        type: 'boolean',
        required: false,
        description: `Whether to pin this article to the top of its section.`,
      },
      {
        name: 'user_segment_id',
        type: 'number',
        required: false,
        description: `The user segment that can view this article. Omit for a public article.`,
      },
    ],
  },
  {
    name: 'zendesk_help_center_article_get',
    description: `Retrieve a single Help Center article by its ID.`,
    params: [
      {
        name: 'article_id',
        type: 'number',
        required: true,
        description: `The ID of the article to retrieve.`,
      },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Comma-separated sideloads: users, sections, categories, translations.`,
      },
    ],
  },
  {
    name: 'zendesk_help_center_article_update',
    description: `Update article-level metadata: promoted status, position, comments setting, labels, and content tags. Does not update title or body — use the Translations API for those.`,
    params: [
      {
        name: 'article_id',
        type: 'number',
        required: true,
        description: `The ID of the article to update.`,
      },
      {
        name: 'comments_disabled',
        type: 'boolean',
        required: false,
        description: `Whether to disable comments on this article.`,
      },
      {
        name: 'content_tag_ids',
        type: 'array',
        required: false,
        description: `IDs of content tags to attach to the article.`,
      },
      {
        name: 'label_names',
        type: 'array',
        required: false,
        description: `Labels to assign to the article.`,
      },
      {
        name: 'position',
        type: 'integer',
        required: false,
        description: `Position of the article within its section.`,
      },
      {
        name: 'promoted',
        type: 'boolean',
        required: false,
        description: `Whether to pin this article to the top of its section.`,
      },
    ],
  },
  {
    name: 'zendesk_help_center_articles_list',
    description: `List Help Center articles. Filter by section or category, sort, and paginate results.`,
    params: [
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Comma-separated sideloads: users, sections, categories, translations.`,
      },
      {
        name: 'label_names',
        type: 'string',
        required: false,
        description: `Comma-separated list of labels to filter articles by.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for offset pagination.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 100).`,
      },
      {
        name: 'sort_by',
        type: 'string',
        required: false,
        description: `Field to sort by: position, title, created_at, updated_at, or edited_at.`,
      },
      {
        name: 'sort_order',
        type: 'string',
        required: false,
        description: `Sort direction: asc or desc.`,
      },
      {
        name: 'start_time',
        type: 'integer',
        required: false,
        description: `Unix epoch timestamp to fetch only articles updated after this time (for incremental sync).`,
      },
    ],
  },
  {
    name: 'zendesk_help_center_articles_search',
    description: `Search Help Center articles by keyword. Filter by category, section, locale, labels, and date range.`,
    params: [
      {
        name: 'brand_id',
        type: 'integer',
        required: false,
        description: `Scope the search to a specific brand ID.`,
      },
      {
        name: 'category',
        type: 'number',
        required: false,
        description: `Filter results to a specific category ID.`,
      },
      {
        name: 'created_after',
        type: 'string',
        required: false,
        description: `Limit results to articles created after this date (YYYY-MM-DD).`,
      },
      {
        name: 'created_at',
        type: 'string',
        required: false,
        description: `Limit results to articles created on this date (YYYY-MM-DD).`,
      },
      {
        name: 'created_before',
        type: 'string',
        required: false,
        description: `Limit results to articles created before this date (YYYY-MM-DD).`,
      },
      {
        name: 'label_names',
        type: 'string',
        required: false,
        description: `Comma-separated list of labels to filter by.`,
      },
      {
        name: 'locale',
        type: 'string',
        required: false,
        description: `Filter results to a specific locale.`,
      },
      {
        name: 'multibrand',
        type: 'boolean',
        required: false,
        description: `Search across all brands when true. Defaults to false.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for offset pagination.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 100).`,
      },
      { name: 'query', type: 'string', required: false, description: `Full-text search query.` },
      {
        name: 'section',
        type: 'number',
        required: false,
        description: `Filter results to a specific section ID.`,
      },
      {
        name: 'sort_by',
        type: 'string',
        required: false,
        description: `Sort by relevance, created_at, or updated_at.`,
      },
      {
        name: 'sort_order',
        type: 'string',
        required: false,
        description: `Sort direction: asc or desc.`,
      },
      {
        name: 'updated_after',
        type: 'string',
        required: false,
        description: `Limit results to articles updated after this date (YYYY-MM-DD).`,
      },
      {
        name: 'updated_at',
        type: 'string',
        required: false,
        description: `Limit results to articles updated on this date (YYYY-MM-DD).`,
      },
      {
        name: 'updated_before',
        type: 'string',
        required: false,
        description: `Limit results to articles updated before this date (YYYY-MM-DD).`,
      },
    ],
  },
  {
    name: 'zendesk_help_center_categories_list',
    description: `List all Help Center categories in your Zendesk account. Returns categories with IDs, names, and positions.`,
    params: [
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Sideload related data. Use 'translations' to include category translations.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for offset pagination.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 100).`,
      },
      {
        name: 'sort_by',
        type: 'string',
        required: false,
        description: `Field to sort by: position, created_at, or updated_at.`,
      },
      {
        name: 'sort_order',
        type: 'string',
        required: false,
        description: `Sort direction: asc or desc.`,
      },
    ],
  },
  {
    name: 'zendesk_help_center_category_get',
    description: `Retrieve a single Help Center category by its ID.`,
    params: [
      {
        name: 'category_id',
        type: 'number',
        required: true,
        description: `The ID of the category to retrieve.`,
      },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Sideload related data. Use 'translations' to include category translations.`,
      },
    ],
  },
  {
    name: 'zendesk_help_center_section_get',
    description: `Retrieve a single Help Center section by its ID.`,
    params: [
      {
        name: 'section_id',
        type: 'number',
        required: true,
        description: `The ID of the section to retrieve.`,
      },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Comma-separated sideloads: 'categories' to include the parent category, 'translations' to include translations.`,
      },
    ],
  },
  {
    name: 'zendesk_help_center_sections_list',
    description: `List all Help Center sections. Filter by category to narrow results.`,
    params: [
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Comma-separated sideloads: 'categories' to include the parent category, 'translations' to include translations.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for offset pagination.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of results per page (max 100).`,
      },
      {
        name: 'sort_by',
        type: 'string',
        required: false,
        description: `Field to sort by: position, created_at, or updated_at.`,
      },
      {
        name: 'sort_order',
        type: 'string',
        required: false,
        description: `Sort direction: asc or desc.`,
      },
    ],
  },
  {
    name: 'zendesk_organization_get',
    description: `Retrieve details of a specific Zendesk organization by ID. Returns organization name, domain names, tags, notes, shared ticket settings, and custom fields.`,
    params: [
      {
        name: 'organization_id',
        type: 'number',
        required: true,
        description: `The ID of the organization to retrieve`,
      },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Additional related data to include (e.g., lookup_relationship_fields)`,
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
        name: 'query',
        type: 'string',
        required: true,
        description: `Search query string using Zendesk search syntax (e.g., 'type:ticket status:open assignee:me')`,
      },
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
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Sideloads to include alongside the response. Use 'side_conversation_events' to include the full event history of the side conversation.`,
      },
    ],
  },
  {
    name: 'zendesk_side_conversations_list',
    description: `List all side conversations on a Zendesk ticket. Returns side conversations including their state, subject, participants, and preview text. Requires the Collaboration add-on.`,
    params: [
      {
        name: 'ticket_id',
        type: 'number',
        required: true,
        description: `The ID of the ticket whose side conversations to list`,
      },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Sideloads to include alongside the response. Use 'side_conversation_events' to include the full event history for each side conversation.`,
      },
    ],
  },
  {
    name: 'zendesk_ticket_comments_list',
    description: `Retrieve all comments (public replies and internal notes) for a specific Zendesk ticket. Returns comment body, author, timestamps, and attachments.`,
    params: [
      {
        name: 'ticket_id',
        type: 'number',
        required: true,
        description: `The ID of the ticket whose comments to list`,
      },
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
    ],
  },
  {
    name: 'zendesk_ticket_create',
    description: `Create a new support ticket in Zendesk. Requires a comment/description and optionally a subject, priority, assignee, and tags.`,
    params: [
      {
        name: 'comment_body',
        type: 'string',
        required: true,
        description: `The description or first comment of the ticket`,
      },
      {
        name: 'assignee_email',
        type: 'string',
        required: false,
        description: `Email of the agent to assign the ticket to`,
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
        name: 'ticket_id',
        type: 'number',
        required: true,
        description: `The ID of the ticket to retrieve`,
      },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Comma-separated list of sideloads to include (e.g., users, groups, organizations)`,
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
        name: 'ticket_id',
        type: 'number',
        required: true,
        description: `The ID of the ticket to reply to`,
      },
      {
        name: 'public',
        type: 'boolean',
        required: false,
        description: `Whether the comment is public (true) or an internal note (false). Defaults to true.`,
      },
    ],
  },
  {
    name: 'zendesk_ticket_update',
    description: `Update an existing Zendesk ticket. Change status, priority, assignee, subject, tags, or any other writable ticket field.`,
    params: [
      {
        name: 'ticket_id',
        type: 'number',
        required: true,
        description: `The ID of the ticket to update`,
      },
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
      { name: 'name', type: 'string', required: true, description: `Full name of the user` },
      {
        name: 'email',
        type: 'string',
        required: false,
        description: `Primary email address of the user`,
      },
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
        name: 'user_id',
        type: 'number',
        required: true,
        description: `The ID of the user to retrieve`,
      },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Comma-separated list of sideloads to include`,
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
