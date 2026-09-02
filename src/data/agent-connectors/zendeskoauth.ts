import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'zendeskoauth_attachment_delete',
    description: `Permanently delete an attachment.`,
    params: [
      {
        name: 'attachment_id',
        type: 'number',
        required: true,
        description: `The unique numeric identifier of the attachment`,
      },
    ],
  },
  {
    name: 'zendeskoauth_attachment_get',
    description: `Retrieve attachment details by ID. Obtain the attachment_id from a ticket comment's attachments list.`,
    params: [
      {
        name: 'attachment_id',
        type: 'number',
        required: true,
        description: `The unique numeric identifier of the attachment`,
      },
    ],
  },
  {
    name: 'zendeskoauth_automation_create',
    description: `Create a new automation (time-based business rule). Automations run once per day against tickets matching their conditions, which must include at least one time-based condition.`,
    params: [
      {
        name: 'actions',
        type: 'array',
        required: true,
        description: `Actions this automation performs when its conditions are met, as a JSON array of {field, value} action objects.`,
      },
      {
        name: 'conditions',
        type: 'object',
        required: true,
        description: `Conditions that determine when this automation runs, as a JSON object with 'all' and/or 'any' arrays of {field, operator, value} condition objects. Automations require at least one time-based condition (e.g. hours_since_created_at).`,
      },
      { name: 'title', type: 'string', required: true, description: `The title of the automation` },
      {
        name: 'active',
        type: 'boolean',
        required: false,
        description: `Whether the automation is active`,
      },
    ],
  },
  {
    name: 'zendeskoauth_automation_delete',
    description: `Delete an automation.`,
    params: [
      {
        name: 'automation_id',
        type: 'number',
        required: true,
        description: `The unique numeric identifier of the automation to delete`,
      },
    ],
  },
  {
    name: 'zendeskoauth_automation_get',
    description: `Retrieve a single automation by ID, including its conditions and actions.`,
    params: [
      {
        name: 'automation_id',
        type: 'number',
        required: true,
        description: `The unique numeric identifier of the automation`,
      },
    ],
  },
  {
    name: 'zendeskoauth_automation_update',
    description: `Update an existing automation's conditions and actions. Only the fields provided are changed.`,
    params: [
      {
        name: 'automation_id',
        type: 'number',
        required: true,
        description: `The unique numeric identifier of the automation to update`,
      },
      {
        name: 'actions',
        type: 'array',
        required: false,
        description: `Actions this automation performs when its conditions are met, as a JSON array of {field, value} action objects.`,
      },
      {
        name: 'active',
        type: 'boolean',
        required: false,
        description: `Whether the automation is active`,
      },
      {
        name: 'conditions',
        type: 'object',
        required: false,
        description: `Conditions that determine when this automation runs, as a JSON object with 'all' and/or 'any' arrays of {field, operator, value} condition objects. Automations require at least one time-based condition (e.g. hours_since_created_at).`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `The title of the automation`,
      },
    ],
  },
  {
    name: 'zendeskoauth_automations_list',
    description: `List the automations configured for the account. Automations run business rules on a recurring schedule based on time-based conditions.`,
    params: [
      {
        name: 'active',
        type: 'boolean',
        required: false,
        description: `Filter by active (true) or inactive (false) automations`,
      },
      { name: 'page', type: 'number', required: false, description: `Page number to retrieve` },
      {
        name: 'per_page',
        type: 'number',
        required: false,
        description: `Results per page (max 100)`,
      },
    ],
  },
  {
    name: 'zendeskoauth_brand_get',
    description: `Retrieve a single brand by ID.`,
    params: [
      {
        name: 'brand_id',
        type: 'number',
        required: true,
        description: `The unique numeric identifier of the brand`,
      },
    ],
  },
  {
    name: 'zendeskoauth_brands_list',
    description: `List the brands configured for the account, sorted by name.`,
    params: [
      {
        name: 'include_deleted',
        type: 'boolean',
        required: false,
        description: `When true, includes soft-deleted brands in the response`,
      },
    ],
  },
  {
    name: 'zendeskoauth_business_hours_schedules_list',
    description: `List all business hours schedules defined in Zendesk. Each schedule includes the configured shift windows (days and hours) your support team operates. Use this to retrieve 24/7 coverage windows and shift data without requiring a Zendesk WFM (Tymeshift) subscription.`,
    params: [],
  },
  {
    name: 'zendeskoauth_group_create',
    description: `Create a new agent group used to organize agents and route tickets.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `The name of the group` },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `The description of the group`,
      },
      {
        name: 'is_public',
        type: 'boolean',
        required: false,
        description: `If true the group is public; if false it is private. Cannot change a private group to public later.`,
      },
    ],
  },
  {
    name: 'zendeskoauth_group_delete',
    description: `Permanently delete an agent group.`,
    params: [
      {
        name: 'group_id',
        type: 'number',
        required: true,
        description: `The unique numeric identifier of the group`,
      },
    ],
  },
  {
    name: 'zendeskoauth_group_get',
    description: `Retrieve a single group by ID.`,
    params: [
      {
        name: 'group_id',
        type: 'number',
        required: true,
        description: `The unique numeric identifier of the group`,
      },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Comma-separated sideloads to include, e.g. users`,
      },
    ],
  },
  {
    name: 'zendeskoauth_group_membership_create',
    description: `Assign an agent to a group. Fails with a 422 error if the agent is already a member of the group.`,
    params: [
      {
        name: 'group_id',
        type: 'number',
        required: true,
        description: `The ID of the group to assign the agent to`,
      },
      {
        name: 'user_id',
        type: 'number',
        required: true,
        description: `The ID of the agent to assign`,
      },
      {
        name: 'default',
        type: 'boolean',
        required: false,
        description: `If true, tickets assigned directly to the agent assume this membership's group`,
      },
    ],
  },
  {
    name: 'zendeskoauth_group_membership_delete',
    description: `Remove an agent from a group. Also schedules a background job to unassign the agent's open tickets in that group.`,
    params: [
      {
        name: 'group_membership_id',
        type: 'number',
        required: true,
        description: `The unique numeric identifier of the group membership`,
      },
    ],
  },
  {
    name: 'zendeskoauth_group_memberships_list',
    description: `List agent-to-group membership assignments across the account.`,
    params: [
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Comma-separated sideloads: users, groups`,
      },
      { name: 'page', type: 'number', required: false, description: `Page number to retrieve` },
      {
        name: 'per_page',
        type: 'number',
        required: false,
        description: `Results per page (max 100)`,
      },
    ],
  },
  {
    name: 'zendeskoauth_group_update',
    description: `Update an existing group's name, description, or visibility.`,
    params: [
      {
        name: 'group_id',
        type: 'number',
        required: true,
        description: `The unique numeric identifier of the group`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `The description of the group`,
      },
      {
        name: 'is_public',
        type: 'boolean',
        required: false,
        description: `If true the group is public; if false it is private`,
      },
      { name: 'name', type: 'string', required: false, description: `The name of the group` },
    ],
  },
  {
    name: 'zendeskoauth_groups_list',
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
    name: 'zendeskoauth_guide_search',
    description: `Search across Help Center articles, community posts, and external records in a single query. Requires authentication. The filter[locales] parameter is mandatory.`,
    params: [
      {
        name: 'filter_locales',
        type: 'string',
        required: true,
        description: `Comma-separated locales to scope the search. At least one valid locale is required.`,
      },
      {
        name: 'filter_brand_ids',
        type: 'string',
        required: false,
        description: `Comma-separated brand IDs to limit search scope. Returns results across all brands if omitted.`,
      },
      {
        name: 'filter_category_ids',
        type: 'string',
        required: false,
        description: `Comma-separated category IDs to limit search to specific Help Center categories.`,
      },
      {
        name: 'filter_content_types',
        type: 'string',
        required: false,
        description: `Comma-separated content types to limit results to: ARTICLE or POST. External records cannot be specified here; use filter_external_source_ids instead.`,
      },
      {
        name: 'filter_external_source_ids',
        type: 'string',
        required: false,
        description: `Comma-separated external source IDs to scope results to specific external sources.`,
      },
      {
        name: 'filter_section_ids',
        type: 'string',
        required: false,
        description: `Comma-separated section IDs to limit search to specific Help Center sections.`,
      },
      {
        name: 'filter_topic_ids',
        type: 'string',
        required: false,
        description: `Comma-separated topic IDs to limit search to specific community topics.`,
      },
      {
        name: 'page_after',
        type: 'string',
        required: false,
        description: `Cursor string from the previous response to fetch the next page.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of results per page. Default is 10, maximum is 50.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `The search text to match. If omitted, results are sorted by internal ordering instead of relevance.`,
      },
    ],
  },
  {
    name: 'zendeskoauth_help_center_article_archive',
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
    name: 'zendeskoauth_help_center_article_comment_create',
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
    name: 'zendeskoauth_help_center_article_comments_list',
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
    name: 'zendeskoauth_help_center_article_create',
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
    name: 'zendeskoauth_help_center_article_get',
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
    name: 'zendeskoauth_help_center_article_labels_list',
    description: `List all labels attached to a specific Help Center article.`,
    params: [
      {
        name: 'article_id',
        type: 'string',
        required: true,
        description: `The ID of the article to retrieve labels for.`,
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
    ],
  },
  {
    name: 'zendeskoauth_help_center_article_translation_update',
    description: `Update a Help Center article translation's title, body, draft status, or outdated flag for a given locale. This is the only way to edit article content — the article-level update endpoint does not accept title or body.`,
    params: [
      {
        name: 'article_id',
        type: 'number',
        required: true,
        description: `The unique ID of the article whose translation to update.`,
      },
      {
        name: 'locale',
        type: 'string',
        required: true,
        description: `The locale of the translation to update.`,
      },
      {
        name: 'body',
        type: 'string',
        required: false,
        description: `New HTML body content for the translation.`,
      },
      {
        name: 'draft',
        type: 'boolean',
        required: false,
        description: `If true, saves the translation as a draft and unpublishes it.`,
      },
      {
        name: 'outdated',
        type: 'boolean',
        required: false,
        description: `If true, marks the translation as outdated.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `New title for the translation.`,
      },
    ],
  },
  {
    name: 'zendeskoauth_help_center_article_update',
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
    name: 'zendeskoauth_help_center_articles_list',
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
    name: 'zendeskoauth_help_center_articles_search',
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
    name: 'zendeskoauth_help_center_categories_list',
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
    name: 'zendeskoauth_help_center_category_get',
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
    name: 'zendeskoauth_help_center_labels_list',
    description: `List all Help Center labels in the account. Returns label names and article counts. Supports pagination.`,
    params: [
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
    ],
  },
  {
    name: 'zendeskoauth_help_center_section_create',
    description: `Create a section under a Help Center category. Supply name and locale for a single-locale section, or a translations array for multi-locale (the two patterns are mutually exclusive). Nesting under parent_section_id requires a Guide plan that supports nested sections.`,
    params: [
      {
        name: 'category_id',
        type: 'number',
        required: true,
        description: `The unique ID of the category to create the section in.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `An optional description of the section.`,
      },
      {
        name: 'locale',
        type: 'string',
        required: false,
        description: `The locale for the section. Required when not using translations.`,
      },
      {
        name: 'manageable_by',
        type: 'string',
        required: false,
        description: `Who can manage this section.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `The name of the section. Required when not using translations.`,
      },
      {
        name: 'parent_section_id',
        type: 'number',
        required: false,
        description: `ID of a parent section to nest this section under. Requires a Guide plan that supports nested sections.`,
      },
      {
        name: 'position',
        type: 'integer',
        required: false,
        description: `Position of the section within its category for manual ordering.`,
      },
      {
        name: 'sorting',
        type: 'string',
        required: false,
        description: `Sort order for articles within this section.`,
      },
      {
        name: 'theme_template',
        type: 'string',
        required: false,
        description: `The template this section uses in the Help Center theme.`,
      },
      {
        name: 'translations',
        type: 'array',
        required: false,
        description: `Additional locale translations for the section. Each item must have a locale, title, and optional body.`,
      },
      {
        name: 'user_segment_id',
        type: 'number',
        required: false,
        description: `The user segment that can view this section. Omit for a public section.`,
      },
    ],
  },
  {
    name: 'zendeskoauth_help_center_section_get',
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
    name: 'zendeskoauth_help_center_sections_list',
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
    name: 'zendeskoauth_macro_apply',
    description: `Preview the changes a macro would make without actually applying them. Optionally apply to a specific ticket to preview against its current state.`,
    params: [
      {
        name: 'macro_id',
        type: 'number',
        required: true,
        description: `The unique numeric identifier of the macro`,
      },
      {
        name: 'normalize_comment',
        type: 'boolean',
        required: false,
        description: `If true, normalizes the macro comment's newline formatting to match the ticket comment editor`,
      },
    ],
  },
  {
    name: 'zendeskoauth_macro_create',
    description: `Create a new macro. Actions is a JSON array of {field, value} objects describing what the macro changes on a ticket, e.g. [{"field":"status","value":"solved"},{"field":"comment_value","value":"Thanks for reaching out!"}].`,
    params: [
      {
        name: 'actions',
        type: 'string',
        required: true,
        description: `JSON array of {field, value} action objects the macro applies to a ticket`,
      },
      { name: 'title', type: 'string', required: true, description: `The title of the macro` },
      {
        name: 'active',
        type: 'boolean',
        required: false,
        description: `Whether the macro is available for use`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `A description of what the macro does`,
      },
    ],
  },
  {
    name: 'zendeskoauth_macro_delete',
    description: `Permanently delete a macro.`,
    params: [
      {
        name: 'macro_id',
        type: 'number',
        required: true,
        description: `The unique numeric identifier of the macro`,
      },
    ],
  },
  {
    name: 'zendeskoauth_macro_get',
    description: `Retrieve a single macro by ID, including its list of actions.`,
    params: [
      {
        name: 'macro_id',
        type: 'number',
        required: true,
        description: `The unique numeric identifier of the macro`,
      },
    ],
  },
  {
    name: 'zendeskoauth_macro_update',
    description: `Update an existing macro's title, description, active state, or actions.`,
    params: [
      {
        name: 'macro_id',
        type: 'number',
        required: true,
        description: `The unique numeric identifier of the macro`,
      },
      {
        name: 'actions',
        type: 'string',
        required: false,
        description: `JSON array of {field, value} action objects the macro applies to a ticket`,
      },
      {
        name: 'active',
        type: 'boolean',
        required: false,
        description: `Whether the macro is available for use`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `A description of what the macro does`,
      },
      { name: 'title', type: 'string', required: false, description: `The title of the macro` },
    ],
  },
  {
    name: 'zendeskoauth_macros_list',
    description: `List the shared and personal macros (canned response/action templates) available to the current user.`,
    params: [
      { name: 'access', type: 'string', required: false, description: `Filter by access level` },
      {
        name: 'active',
        type: 'boolean',
        required: false,
        description: `Filter by active (true) or inactive (false) macros`,
      },
      {
        name: 'category',
        type: 'number',
        required: false,
        description: `Filter macros by category ID`,
      },
      {
        name: 'group_id',
        type: 'number',
        required: false,
        description: `Filter macros by group ID`,
      },
      {
        name: 'only_viewable',
        type: 'boolean',
        required: false,
        description: `If true, returns only macros that can be applied to tickets`,
      },
      { name: 'page', type: 'number', required: false, description: `Page number to retrieve` },
      {
        name: 'per_page',
        type: 'number',
        required: false,
        description: `Results per page (max 100)`,
      },
      { name: 'sort_by', type: 'string', required: false, description: `Field to sort by` },
      { name: 'sort_order', type: 'string', required: false, description: `asc or desc` },
    ],
  },
  {
    name: 'zendeskoauth_omnichannel_agent_statuses_list',
    description: `Get the current Talk availability status for a specific agent. Returns agent state (online, away, offline, transfers_only), call status (on_call, wrap_up), and channel (client or phone). Useful for monitoring individual agent occupancy.`,
    params: [
      {
        name: 'agent_id',
        type: 'number',
        required: true,
        description: `The ID of the agent whose availability to retrieve`,
      },
    ],
  },
  {
    name: 'zendeskoauth_omnichannel_agents_list',
    description: `List the current availability status for all agents across all channels (voice, chat, email, messaging). Returns each agent's channel capacity, remaining capacity, and current status. Supports filtering by group, skill, channel status (e.g. voice:online), and remaining capacity.`,
    params: [
      {
        name: 'filter_agent_id',
        type: 'string',
        required: false,
        description: `Comma-separated agent IDs to filter by`,
      },
      {
        name: 'filter_agent_status_name',
        type: 'string',
        required: false,
        description: `Filter agents by their unified status name (e.g. Online, Offline, Away)`,
      },
      {
        name: 'filter_channel_status',
        type: 'string',
        required: false,
        description: `Filter agents by their status on a specific channel. Format: channel:status (e.g. voice:online, messaging:away)`,
      },
      {
        name: 'filter_group_id',
        type: 'string',
        required: false,
        description: `Comma-separated group IDs to filter agents by`,
      },
      {
        name: 'page_after',
        type: 'string',
        required: false,
        description: `Cursor for fetching the next page of results`,
      },
      {
        name: 'page_size',
        type: 'number',
        required: false,
        description: `Maximum number of agents to return per page`,
      },
      {
        name: 'select_channel',
        type: 'string',
        required: false,
        description: `Limit availability data to a single channel (e.g. voice, messaging, email)`,
      },
    ],
  },
  {
    name: 'zendeskoauth_organization_create',
    description: `Create a new organization. Names must be unique within the account.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `A unique name for the organization`,
      },
      {
        name: 'details',
        type: 'string',
        required: false,
        description: `Any details about the organization, such as its address`,
      },
      {
        name: 'domain_names',
        type: 'array',
        required: false,
        description: `Domain names associated with this organization; users signing up with a matching email domain are auto-added`,
      },
      {
        name: 'group_id',
        type: 'number',
        required: false,
        description: `New tickets from users in this organization are automatically put in this group`,
      },
      {
        name: 'notes',
        type: 'string',
        required: false,
        description: `Any notes you have about the organization`,
      },
      {
        name: 'shared_comments',
        type: 'boolean',
        required: false,
        description: `If true, end users in the organization can comment on each other's tickets`,
      },
      {
        name: 'shared_tickets',
        type: 'boolean',
        required: false,
        description: `If true, end users in the organization can see each other's tickets`,
      },
      {
        name: 'tags',
        type: 'array',
        required: false,
        description: `Tags applied to the organization`,
      },
    ],
  },
  {
    name: 'zendeskoauth_organization_delete',
    description: `Permanently delete an organization.`,
    params: [
      {
        name: 'organization_id',
        type: 'number',
        required: true,
        description: `The unique numeric identifier of the organization`,
      },
    ],
  },
  {
    name: 'zendeskoauth_organization_get',
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
    name: 'zendeskoauth_organization_membership_create',
    description: `Assign a user to an organization. Fails with a 422 error if the user is already assigned to the organization.`,
    params: [
      {
        name: 'organization_id',
        type: 'number',
        required: true,
        description: `The ID of the organization to assign the user to`,
      },
      {
        name: 'user_id',
        type: 'number',
        required: true,
        description: `The ID of the user to assign`,
      },
      {
        name: 'default',
        type: 'boolean',
        required: false,
        description: `If true, this becomes the user's default organization`,
      },
    ],
  },
  {
    name: 'zendeskoauth_organization_membership_delete',
    description: `Remove a user from an organization. Schedules a background job to clear the organization_id on the user's currently assigned tickets.`,
    params: [
      {
        name: 'organization_membership_id',
        type: 'number',
        required: true,
        description: `The unique numeric identifier of the organization membership`,
      },
    ],
  },
  {
    name: 'zendeskoauth_organization_memberships_list',
    description: `List user-to-organization membership assignments across the account.`,
    params: [
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Comma-separated sideloads: users, organizations`,
      },
      { name: 'page', type: 'number', required: false, description: `Page number to retrieve` },
      {
        name: 'per_page',
        type: 'number',
        required: false,
        description: `Results per page (max 100)`,
      },
    ],
  },
  {
    name: 'zendeskoauth_organization_tickets_list',
    description: `List the tickets belonging to a specific Zendesk organization.`,
    params: [
      {
        name: 'organization_id',
        type: 'number',
        required: true,
        description: `The unique numeric identifier of the organization`,
      },
      { name: 'page', type: 'number', required: false, description: `Page number to retrieve` },
      {
        name: 'per_page',
        type: 'number',
        required: false,
        description: `Results per page (default: 100, max: 100)`,
      },
    ],
  },
  {
    name: 'zendeskoauth_organization_update',
    description: `Update an existing organization. Agents without unrestricted permissions can only update the notes field.`,
    params: [
      {
        name: 'organization_id',
        type: 'number',
        required: true,
        description: `The unique numeric identifier of the organization`,
      },
      {
        name: 'details',
        type: 'string',
        required: false,
        description: `Any details about the organization, such as its address`,
      },
      {
        name: 'domain_names',
        type: 'array',
        required: false,
        description: `Domain names for this organization. Overwrites all existing values -- submit the complete list.`,
      },
      {
        name: 'group_id',
        type: 'number',
        required: false,
        description: `New tickets from users in this organization are automatically put in this group`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `A unique name for the organization`,
      },
      {
        name: 'notes',
        type: 'string',
        required: false,
        description: `Any notes you have about the organization`,
      },
      {
        name: 'tags',
        type: 'array',
        required: false,
        description: `Tags applied to the organization`,
      },
    ],
  },
  {
    name: 'zendeskoauth_organizations_autocomplete',
    description: `Return organizations whose name starts with the given substring.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Substring to match against the start of an organization's name`,
      },
    ],
  },
  {
    name: 'zendeskoauth_organizations_list',
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
    name: 'zendeskoauth_organizations_search',
    description: `Search for an organization by its exact external_id or name (not both at once).`,
    params: [
      {
        name: 'external_id',
        type: 'string',
        required: false,
        description: `The external_id of the organization to find`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `The exact name of the organization to find`,
      },
    ],
  },
  {
    name: 'zendeskoauth_problems_list',
    description: `List tickets of type 'problem'. Problem tickets group together incident tickets that share the same root cause.`,
    params: [],
  },
  {
    name: 'zendeskoauth_request_create',
    description: `Create a new request (ticket) from the requester's point of view. Requires a subject and an initial comment describing the issue.`,
    params: [
      {
        name: 'comment_body',
        type: 'string',
        required: true,
        description: `Describes the problem, incident, question, or task`,
      },
      {
        name: 'subject',
        type: 'string',
        required: true,
        description: `The subject/title of the request`,
      },
      {
        name: 'collaborators',
        type: 'array',
        required: false,
        description: `Email addresses to CC on the request`,
      },
      {
        name: 'priority',
        type: 'string',
        required: false,
        description: `urgent, high, normal, or low`,
      },
      {
        name: 'ticket_form_id',
        type: 'number',
        required: false,
        description: `ID of the ticket form to use (Enterprise accounts only)`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `question, incident, problem, or task`,
      },
    ],
  },
  {
    name: 'zendeskoauth_request_get',
    description: `Retrieve a single request (the customer-facing view of a ticket) by ID.`,
    params: [
      {
        name: 'request_id',
        type: 'number',
        required: true,
        description: `The unique numeric identifier of the request (same as the underlying ticket ID)`,
      },
    ],
  },
  {
    name: 'zendeskoauth_request_update',
    description: `Add a comment to a request, mark it solved, or add collaborators. This endpoint cannot change other request attributes such as subject or priority.`,
    params: [
      {
        name: 'request_id',
        type: 'number',
        required: true,
        description: `The unique numeric identifier of the request`,
      },
      {
        name: 'additional_collaborators',
        type: 'array',
        required: false,
        description: `Email addresses to add as collaborators on the request`,
      },
      {
        name: 'comment_body',
        type: 'string',
        required: false,
        description: `A comment/reply to add to the request`,
      },
      {
        name: 'solved',
        type: 'boolean',
        required: false,
        description: `Mark the request as solved. Only allowed when the request's can_be_solved_by_me property is true.`,
      },
    ],
  },
  {
    name: 'zendeskoauth_requests_list',
    description: `List the requester's own tickets (requests). End users see only their own requests; agents/admins can use this to review the customer-facing view of a ticket.`,
    params: [
      { name: 'page', type: 'number', required: false, description: `Page number to retrieve` },
      {
        name: 'per_page',
        type: 'number',
        required: false,
        description: `Results per page (max 100)`,
      },
      { name: 'sort_by', type: 'string', required: false, description: `updated_at or created_at` },
      { name: 'sort_order', type: 'string', required: false, description: `asc or desc` },
    ],
  },
  {
    name: 'zendeskoauth_requests_search',
    description: `Search requests by keyword and filters such as organization or status. Example: query=printer&status=hold,open.`,
    params: [
      {
        name: 'organization_id',
        type: 'number',
        required: false,
        description: `Restrict results to requests from this organization`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Search text; combine with other filters as query string values`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Comma-separated list of statuses to filter by, e.g. hold,open`,
      },
    ],
  },
  {
    name: 'zendeskoauth_satisfaction_ratings_list',
    description: `List CSAT satisfaction ratings with optional filters. Returns score (good/bad), comment, reason, ticket ID, and timestamps for each rating.`,
    params: [
      {
        name: 'end_time',
        type: 'number',
        required: false,
        description: `Unix timestamp to filter ratings created before this time`,
      },
      { name: 'page', type: 'number', required: false, description: `Page number for pagination` },
      {
        name: 'per_page',
        type: 'number',
        required: false,
        description: `Number of results per page`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Version of the tool schema`,
      },
      {
        name: 'score',
        type: 'string',
        required: false,
        description: `Filter by satisfaction score`,
      },
      {
        name: 'start_time',
        type: 'number',
        required: false,
        description: `Unix timestamp to filter ratings created after this time`,
      },
      { name: 'tool_version', type: 'string', required: false, description: `Version of the tool` },
    ],
  },
  {
    name: 'zendeskoauth_satisfaction_reasons_list',
    description: `List all satisfaction reasons configured for negative (bad) CSAT ratings. Used to analyze why customers rate support interactions poorly.`,
    params: [
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Version of the tool schema`,
      },
      { name: 'tool_version', type: 'string', required: false, description: `Version of the tool` },
    ],
  },
  {
    name: 'zendeskoauth_search_tickets',
    description: `Search Zendesk tickets using a query string. Supports Zendesk's search syntax (e.g., 'type:ticket status:open'). Zendesk limits search results to 1,000 total — the maximum valid page is floor(1000 / per_page) (e.g., per_page=100 → max page 10, per_page=25 → max page 40). Stop paginating when next_page is null or you reach the max page; requesting beyond the limit returns a 400 error.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Search query string using Zendesk search syntax (e.g., 'type:ticket status:open assignee:me')`,
      },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Comma-separated list of additional data to sideload with results. Supported values: users, groups, organizations, tickets.`,
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
    name: 'zendeskoauth_side_conversation_get',
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
    name: 'zendeskoauth_side_conversations_list',
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
    name: 'zendeskoauth_sla_policies_list',
    description: `List all SLA policy definitions including policy name, conditions, and filter criteria. Requires Professional or Enterprise plan.`,
    params: [
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Version of the tool schema`,
      },
      { name: 'tool_version', type: 'string', required: false, description: `Version of the tool` },
    ],
  },
  {
    name: 'zendeskoauth_sla_policy_get',
    description: `Retrieve a single SLA policy by ID, including its filter conditions and per-metric targets. Requires Professional or Enterprise plan.`,
    params: [
      {
        name: 'sla_policy_id',
        type: 'number',
        required: true,
        description: `The unique numeric identifier of the SLA policy`,
      },
    ],
  },
  {
    name: 'zendeskoauth_support_addresses_list',
    description: `List the support (recipient) email addresses configured for the account.`,
    params: [
      { name: 'page', type: 'number', required: false, description: `Page number to retrieve` },
      {
        name: 'per_page',
        type: 'number',
        required: false,
        description: `Results per page (max 100)`,
      },
    ],
  },
  {
    name: 'zendeskoauth_suspended_ticket_recover',
    description: `Recover a suspended ticket into a real ticket. The requester is set to the authenticated agent rather than the original requester.`,
    params: [
      {
        name: 'id',
        type: 'number',
        required: true,
        description: `The unique numeric identifier of the suspended ticket`,
      },
    ],
  },
  {
    name: 'zendeskoauth_suspended_tickets_list',
    description: `List tickets that Zendesk has flagged as spam or otherwise suspended before they became real tickets.`,
    params: [
      { name: 'page', type: 'number', required: false, description: `Page number to retrieve` },
      {
        name: 'per_page',
        type: 'number',
        required: false,
        description: `Results per page (max 100)`,
      },
      {
        name: 'sort_by',
        type: 'string',
        required: false,
        description: `author_email, cause, created_at, or subject`,
      },
      { name: 'sort_order', type: 'string', required: false, description: `asc or desc` },
    ],
  },
  {
    name: 'zendeskoauth_tags_list',
    description: `List up to the 20,000 most popular tags used across the Zendesk account in the last 60 days, ordered by decreasing popularity.`,
    params: [
      { name: 'page', type: 'number', required: false, description: `Page number to retrieve` },
      {
        name: 'per_page',
        type: 'number',
        required: false,
        description: `Results per page (max 100)`,
      },
    ],
  },
  {
    name: 'zendeskoauth_talk_account_overview',
    description: `Get a high-level overview of Talk voice call activity for the current day. Returns total inbound calls, total outbound calls, and other account-wide call metrics. Data covers midnight to now in your account's timezone. Filter by phone number IDs to scope to specific lines.`,
    params: [
      {
        name: 'phone_number_ids',
        type: 'string',
        required: false,
        description: `Comma-separated list of phone number IDs to filter results by (up to 100 IDs)`,
      },
    ],
  },
  {
    name: 'zendeskoauth_talk_agents_activity',
    description: `Get current-day Talk voice call activity broken down per agent. Returns calls accepted, calls missed, calls denied, talk time, and other live metrics for each agent. Data reflects the current day from midnight in your account timezone. Filter by group to narrow results.`,
    params: [
      {
        name: 'group_ids',
        type: 'string',
        required: false,
        description: `Comma-separated list of group IDs to filter agents by (up to 100 IDs)`,
      },
    ],
  },
  {
    name: 'zendeskoauth_talk_agents_overview',
    description: `Get aggregated Talk performance metrics for all agents for the current day. Returns per-agent counts of accepted, missed, and declined calls, average handle time, and talk time. Data covers midnight to now in the account timezone. Use this to assess agent-level call performance without requiring Talk Professional/Enterprise.`,
    params: [],
  },
  {
    name: 'zendeskoauth_talk_call_legs_list',
    description: `List individual call legs from Zendesk Talk. Each call can have multiple legs (e.g., the customer leg and the agent leg). Returns leg status (accepted, missed, declined), duration, agent, and timestamps.`,
    params: [
      {
        name: 'start_time',
        type: 'number',
        required: true,
        description: `Unix timestamp (seconds since epoch) to start the incremental query from. Required by Zendesk — the incremental legs endpoint will reject requests without this field.`,
      },
      {
        name: 'agent_id',
        type: 'number',
        required: false,
        description: `Filter call legs by a specific agent ID`,
      },
      {
        name: 'end_time',
        type: 'number',
        required: false,
        description: `Unix timestamp (seconds since epoch) to end the incremental query at.`,
      },
      { name: 'page', type: 'number', required: false, description: `Page number for pagination` },
      {
        name: 'per_page',
        type: 'number',
        required: false,
        description: `Number of call legs to return per page (max 100)`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter by leg status: accepted, missed, or declined`,
      },
    ],
  },
  {
    name: 'zendeskoauth_talk_calls_list',
    description: `List voice calls from Zendesk Talk. Returns inbound and outbound call records with details such as duration, status, agent, phone number, and timestamps. Use filters to narrow by direction, date range, or agent.`,
    params: [
      {
        name: 'agent_id',
        type: 'number',
        required: false,
        description: `Filter calls by a specific agent ID`,
      },
      {
        name: 'direction',
        type: 'string',
        required: false,
        description: `Filter by call direction: inbound or outbound`,
      },
      {
        name: 'end_time',
        type: 'string',
        required: false,
        description: `Filter calls that ended before this ISO 8601 timestamp`,
      },
      { name: 'page', type: 'number', required: false, description: `Page number for pagination` },
      {
        name: 'per_page',
        type: 'number',
        required: false,
        description: `Number of calls to return per page (max 100)`,
      },
      {
        name: 'start_time',
        type: 'string',
        required: false,
        description: `Filter calls that started after this ISO 8601 timestamp`,
      },
    ],
  },
  {
    name: 'zendeskoauth_theme_delete',
    description: `Delete a Guide theme by its ID. Cannot delete the account's currently live theme. Returns no content on success. Use this to remove an unused theme once you have its ID from zendeskoauth_themes_list; publish a different theme first with zendeskoauth_theme_publish if this one is currently live.`,
    params: [
      {
        name: 'theme_id',
        type: 'string',
        required: true,
        description: `The unique ID of the Guide theme to delete. Get this from zendeskoauth_themes_list. The account's currently live theme cannot be deleted. Example: 01ecd35c-fe4f-11ea-adc1-0242ac120002.`,
      },
    ],
  },
  {
    name: 'zendeskoauth_theme_get',
    description: `Retrieve a single Guide theme by its ID. Returns the theme's id, name, author, version, live status, and created/updated timestamps. Use this once you have a theme_id from zendeskoauth_themes_list to check a specific theme's details or live status.`,
    params: [
      {
        name: 'theme_id',
        type: 'string',
        required: true,
        description: `The unique ID of the Guide theme to retrieve. Get this from zendeskoauth_themes_list. Example: 01ecd35c-fe4f-11ea-adc1-0242ac120002.`,
      },
    ],
  },
  {
    name: 'zendeskoauth_theme_publish',
    description: `Publish a Guide theme, making it the live theme shown to end users in the Help Center. Returns the updated theme with its live status. Use this once you have a theme_id from zendeskoauth_themes_list to switch which theme is live; use zendeskoauth_theme_get to check a theme's current live status first.`,
    params: [
      {
        name: 'theme_id',
        type: 'string',
        required: true,
        description: `The unique ID of the Guide theme to publish and make live. Get this from zendeskoauth_themes_list. Example: 01ecd35c-fe4f-11ea-adc1-0242ac120002.`,
      },
    ],
  },
  {
    name: 'zendeskoauth_themes_list',
    description: `List the Guide themes installed on the account, optionally filtered by brand. Returns each theme's id, name, author, version, live status, and created/updated timestamps. Use this to browse all themes and find a theme's ID. Use zendeskoauth_theme_get to fetch full details for one theme by ID.`,
    params: [
      {
        name: 'brand_id',
        type: 'number',
        required: false,
        description: `Numeric ID of the brand to filter themes by. Only themes installed for this brand are returned. Leave blank to list themes across all brands. Example: 360000123.`,
      },
    ],
  },
  {
    name: 'zendeskoauth_ticket_audits_get',
    description: `Retrieve the full audit trail for a specific ticket including all field changes, status transitions, comments, and timestamps.`,
    params: [
      {
        name: 'ticket_id',
        type: 'number',
        required: true,
        description: `The ID of the ticket to retrieve audits for`,
      },
      { name: 'page_after', type: 'string', required: false, description: `Cursor for next page.` },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of records per page. Maximum 100.`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Version of the tool schema`,
      },
      {
        name: 'sort_order',
        type: 'string',
        required: false,
        description: `Sort order for audit events.`,
      },
      { name: 'tool_version', type: 'string', required: false, description: `Version of the tool` },
    ],
  },
  {
    name: 'zendeskoauth_ticket_audits_list',
    description: `List audit trail events across all tickets including field changes, status transitions, assignment changes, and timestamps. Useful for tracking time-in-status and escalation paths.`,
    params: [
      {
        name: 'page_after',
        type: 'string',
        required: false,
        description: `Cursor for next page (cursor-based pagination).`,
      },
      {
        name: 'page_before',
        type: 'string',
        required: false,
        description: `Cursor for previous page (cursor-based pagination).`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of records per page. Maximum 100.`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Version of the tool schema`,
      },
      { name: 'tool_version', type: 'string', required: false, description: `Version of the tool` },
    ],
  },
  {
    name: 'zendeskoauth_ticket_collaborators_list',
    description: `List the users who are CC'd as collaborators on a Zendesk ticket. Requires the CCs and Followers feature to be enabled.`,
    params: [
      {
        name: 'ticket_id',
        type: 'number',
        required: true,
        description: `The unique numeric identifier of the ticket`,
      },
    ],
  },
  {
    name: 'zendeskoauth_ticket_comments_list',
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
    name: 'zendeskoauth_ticket_create',
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
    name: 'zendeskoauth_ticket_delete',
    description: `Permanently delete a Zendesk ticket. This moves the ticket to the deleted tickets queue; agents with permission can restore it before it is purged. This action cannot be undone through this tool.`,
    params: [
      {
        name: 'ticket_id',
        type: 'number',
        required: true,
        description: `The unique numeric identifier of the ticket`,
      },
    ],
  },
  {
    name: 'zendeskoauth_ticket_field_create',
    description: `Create a new custom ticket field. For 'multiselect' or 'tagger' fields, supply custom_field_options as a JSON array of {name, value} objects.`,
    params: [
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `The title of the ticket field`,
      },
      {
        name: 'active',
        type: 'boolean',
        required: false,
        description: `Whether this field is available`,
      },
      {
        name: 'custom_field_options',
        type: 'string',
        required: false,
        description: `JSON array of options for 'tagger'/'multiselect' fields, e.g. [{"name":"Small","value":"small"}]`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Describes the purpose of the field to end users`,
      },
      {
        name: 'position',
        type: 'number',
        required: false,
        description: `The relative position of the field among other ticket fields`,
      },
      {
        name: 'required',
        type: 'boolean',
        required: false,
        description: `Whether agents must enter a value for this field to change a ticket's status to solved`,
      },
      {
        name: 'tag',
        type: 'string',
        required: false,
        description: `For checkbox fields, the tag applied to tickets when the checkbox is checked`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `The type of ticket field. Defaults to text when not specified.`,
      },
      {
        name: 'visible_in_portal',
        type: 'boolean',
        required: false,
        description: `Whether this field is visible to end users in the help center`,
      },
    ],
  },
  {
    name: 'zendeskoauth_ticket_field_get',
    description: `Retrieve a single ticket field by ID, including its type, title, and (for dropdown/multiselect fields) its options.`,
    params: [
      {
        name: 'ticket_field_id',
        type: 'number',
        required: true,
        description: `The unique numeric identifier of the ticket field`,
      },
      {
        name: 'creator',
        type: 'boolean',
        required: false,
        description: `If true, includes creator_user_id and creator_app_name on app-created fields`,
      },
    ],
  },
  {
    name: 'zendeskoauth_ticket_field_update',
    description: `Update an existing custom ticket field. The field's type cannot be changed after creation. For dropdown/multiselect fields, custom_field_options must list every option you want to keep -- omitted options are removed.`,
    params: [
      {
        name: 'ticket_field_id',
        type: 'number',
        required: true,
        description: `The unique numeric identifier of the ticket field`,
      },
      {
        name: 'active',
        type: 'boolean',
        required: false,
        description: `Whether this field is available`,
      },
      {
        name: 'custom_field_options',
        type: 'string',
        required: false,
        description: `JSON array of every option to keep for 'tagger'/'multiselect' fields, e.g. [{"id":123,"name":"Small","value":"small"}]`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Describes the purpose of the field to end users`,
      },
      {
        name: 'position',
        type: 'number',
        required: false,
        description: `The relative position of the field among other ticket fields`,
      },
      {
        name: 'required',
        type: 'boolean',
        required: false,
        description: `Whether agents must enter a value for this field to change a ticket's status to solved`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `The title of the ticket field`,
      },
      {
        name: 'visible_in_portal',
        type: 'boolean',
        required: false,
        description: `Whether this field is visible to end users in the help center`,
      },
    ],
  },
  {
    name: 'zendeskoauth_ticket_fields_list',
    description: `List all system and custom ticket fields defined in the Zendesk account.`,
    params: [
      {
        name: 'creator',
        type: 'boolean',
        required: false,
        description: `If true, includes creator_user_id and creator_app_name on app-created fields`,
      },
      {
        name: 'locale',
        type: 'string',
        required: false,
        description: `Return title_in_portal as a dynamic content variant for this locale`,
      },
    ],
  },
  {
    name: 'zendeskoauth_ticket_followers_list',
    description: `List the agents who follow a Zendesk ticket and receive updates about it. Requires the CCs and Followers feature to be enabled.`,
    params: [
      {
        name: 'ticket_id',
        type: 'number',
        required: true,
        description: `The unique numeric identifier of the ticket`,
      },
    ],
  },
  {
    name: 'zendeskoauth_ticket_form_create',
    description: `Create a new ticket form made up of an ordered set of ticket fields.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The internal name of the ticket form`,
      },
      {
        name: 'active',
        type: 'boolean',
        required: false,
        description: `Whether the form is active`,
      },
      {
        name: 'display_name',
        type: 'string',
        required: false,
        description: `The name shown to end users. Defaults to name if omitted.`,
      },
      {
        name: 'end_user_visible',
        type: 'boolean',
        required: false,
        description: `Whether the form is visible to end users`,
      },
      {
        name: 'position',
        type: 'number',
        required: false,
        description: `The position of this form relative to other forms`,
      },
      {
        name: 'ticket_field_ids',
        type: 'array',
        required: false,
        description: `Ordered array of ticket field IDs to include on this form`,
      },
    ],
  },
  {
    name: 'zendeskoauth_ticket_form_get',
    description: `Retrieve a single ticket form by ID, including the ordered list of ticket field IDs it contains.`,
    params: [
      {
        name: 'ticket_form_id',
        type: 'number',
        required: true,
        description: `The unique numeric identifier of the ticket form`,
      },
    ],
  },
  {
    name: 'zendeskoauth_ticket_form_update',
    description: `Update an existing ticket form's name, visibility, or the ticket fields it contains.`,
    params: [
      {
        name: 'ticket_form_id',
        type: 'number',
        required: true,
        description: `The unique numeric identifier of the ticket form`,
      },
      {
        name: 'active',
        type: 'boolean',
        required: false,
        description: `Whether the form is active`,
      },
      {
        name: 'display_name',
        type: 'string',
        required: false,
        description: `The name shown to end users`,
      },
      {
        name: 'end_user_visible',
        type: 'boolean',
        required: false,
        description: `Whether the form is visible to end users`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `The internal name of the ticket form`,
      },
      {
        name: 'position',
        type: 'number',
        required: false,
        description: `The position of this form relative to other forms`,
      },
      {
        name: 'ticket_field_ids',
        type: 'array',
        required: false,
        description: `Ordered array of ticket field IDs to include on this form`,
      },
    ],
  },
  {
    name: 'zendeskoauth_ticket_forms_list',
    description: `List the ticket forms configured for the Zendesk account. End users only see forms with end_user_visible set to true.`,
    params: [
      {
        name: 'active',
        type: 'boolean',
        required: false,
        description: `true returns only active forms, false returns only inactive forms`,
      },
      {
        name: 'end_user_visible',
        type: 'boolean',
        required: false,
        description: `true returns only end-user-visible forms, false returns only hidden forms`,
      },
      { name: 'page', type: 'number', required: false, description: `Page number to retrieve` },
      { name: 'per_page', type: 'number', required: false, description: `Results per page` },
    ],
  },
  {
    name: 'zendeskoauth_ticket_get',
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
    name: 'zendeskoauth_ticket_merge',
    description: `Merge one or more source tickets into a target ticket. Comments from the source tickets are copied into the target ticket and any attachments are copied over. Queues a background job; poll the returned job_status URL to confirm completion.`,
    params: [
      {
        name: 'ticket_id',
        type: 'number',
        required: true,
        description: `The ID of the ticket that other tickets will be merged into`,
      },
      {
        name: 'ticket_ids',
        type: 'array',
        required: true,
        description: `Array of ticket IDs to merge into the target ticket`,
      },
      {
        name: 'source_comment',
        type: 'string',
        required: false,
        description: `Comment added to the source ticket(s) explaining the merge`,
      },
      {
        name: 'source_comment_is_public',
        type: 'boolean',
        required: false,
        description: `Whether the comment on the source ticket(s) is public`,
      },
      {
        name: 'target_comment',
        type: 'string',
        required: false,
        description: `Comment added to the target ticket explaining the merge`,
      },
      {
        name: 'target_comment_is_public',
        type: 'boolean',
        required: false,
        description: `Whether the comment on the target ticket is public`,
      },
    ],
  },
  {
    name: 'zendeskoauth_ticket_metric_events',
    description: `Incrementally export ticket metric events (reply times, agent work times, requester wait times) for time-series analysis. Returns event-level granularity for SLA compliance tracking.`,
    params: [
      {
        name: 'start_time',
        type: 'number',
        required: true,
        description: `Unix timestamp to start incremental export from`,
      },
      {
        name: 'exclude_deleted',
        type: 'boolean',
        required: false,
        description: `When true, removes metric events tied to deleted tickets.`,
      },
      {
        name: 'include_changes',
        type: 'boolean',
        required: false,
        description: `When true, includes additional change data for more accurate incremental results.`,
      },
      {
        name: 'per_page',
        type: 'number',
        required: false,
        description: `Number of results per page`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Version of the tool schema`,
      },
      { name: 'tool_version', type: 'string', required: false, description: `Version of the tool` },
    ],
  },
  {
    name: 'zendeskoauth_ticket_metrics_get',
    description: `Retrieve ticket metrics for a specific ticket including reply time, resolution time, wait times, reopen count, and assignee/group station counts.`,
    params: [
      {
        name: 'ticket_id',
        type: 'number',
        required: true,
        description: `The ID of the ticket to retrieve metrics for`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Version of the tool schema`,
      },
      { name: 'tool_version', type: 'string', required: false, description: `Version of the tool` },
    ],
  },
  {
    name: 'zendeskoauth_ticket_metrics_list',
    description: `List ticket metrics for all tickets in the Zendesk account. Returns first reply time, resolution time, agent wait time, requester wait time, reply count, and reopen count.`,
    params: [
      { name: 'page', type: 'number', required: false, description: `Page number for pagination` },
      {
        name: 'per_page',
        type: 'number',
        required: false,
        description: `Number of results per page`,
      },
      {
        name: 'schema_version',
        type: 'string',
        required: false,
        description: `Version of the tool schema`,
      },
      { name: 'tool_version', type: 'string', required: false, description: `Version of the tool` },
    ],
  },
  {
    name: 'zendeskoauth_ticket_related_get',
    description: `Return related information for a ticket, such as counts of linked incidents, the associated problem ticket ID, and follow-up ticket IDs.`,
    params: [
      {
        name: 'ticket_id',
        type: 'number',
        required: true,
        description: `The unique numeric identifier of the ticket`,
      },
    ],
  },
  {
    name: 'zendeskoauth_ticket_reply',
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
    name: 'zendeskoauth_ticket_tags_add',
    description: `Add one or more tags to a ticket without removing its existing tags.`,
    params: [
      {
        name: 'tags',
        type: 'array',
        required: true,
        description: `Tags to add to the ticket's existing tags`,
      },
      {
        name: 'ticket_id',
        type: 'number',
        required: true,
        description: `The unique numeric identifier of the ticket`,
      },
    ],
  },
  {
    name: 'zendeskoauth_ticket_tags_delete',
    description: `Remove specific tags from a ticket, leaving any other tags untouched.`,
    params: [
      {
        name: 'tags',
        type: 'string',
        required: true,
        description: `Comma-separated list of tags to remove from the ticket`,
      },
      {
        name: 'ticket_id',
        type: 'number',
        required: true,
        description: `The unique numeric identifier of the ticket`,
      },
    ],
  },
  {
    name: 'zendeskoauth_ticket_tags_list',
    description: `List the tags currently applied to a Zendesk ticket.`,
    params: [
      {
        name: 'ticket_id',
        type: 'number',
        required: true,
        description: `The unique numeric identifier of the ticket`,
      },
    ],
  },
  {
    name: 'zendeskoauth_ticket_tags_set',
    description: `Replace all tags on a ticket with the given set of tags. Any tags not included in the list are removed from the ticket.`,
    params: [
      {
        name: 'tags',
        type: 'array',
        required: true,
        description: `The full list of tags the ticket should have after this call`,
      },
      {
        name: 'ticket_id',
        type: 'number',
        required: true,
        description: `The unique numeric identifier of the ticket`,
      },
    ],
  },
  {
    name: 'zendeskoauth_ticket_update',
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
    name: 'zendeskoauth_tickets_count',
    description: `Return an approximate count of tickets in the account. If the count exceeds 100,000 it refreshes only once every 24 hours.`,
    params: [],
  },
  {
    name: 'zendeskoauth_tickets_list',
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
    name: 'zendeskoauth_trigger_create',
    description: `Create a new ticket trigger (event-based business rule) with conditions and actions. Triggers run immediately when a ticket is created or updated and its conditions match.`,
    params: [
      {
        name: 'actions',
        type: 'array',
        required: true,
        description: `Actions this trigger performs when its conditions are met, as a JSON array of {field, value} action objects.`,
      },
      {
        name: 'conditions',
        type: 'object',
        required: true,
        description: `Conditions that determine when this trigger fires, as a JSON object with 'all' and/or 'any' arrays of {field, operator, value} condition objects.`,
      },
      { name: 'title', type: 'string', required: true, description: `The title of the trigger` },
      {
        name: 'active',
        type: 'boolean',
        required: false,
        description: `Whether the trigger is active`,
      },
      {
        name: 'category_id',
        type: 'string',
        required: false,
        description: `ID of the trigger category to group this trigger under`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `A description of what the trigger does`,
      },
    ],
  },
  {
    name: 'zendeskoauth_trigger_delete',
    description: `Delete a ticket trigger.`,
    params: [
      {
        name: 'trigger_id',
        type: 'number',
        required: true,
        description: `The unique numeric identifier of the trigger to delete`,
      },
    ],
  },
  {
    name: 'zendeskoauth_trigger_get',
    description: `Retrieve a single ticket trigger by ID, including its conditions and actions.`,
    params: [
      {
        name: 'trigger_id',
        type: 'number',
        required: true,
        description: `The unique numeric identifier of the trigger`,
      },
    ],
  },
  {
    name: 'zendeskoauth_trigger_update',
    description: `Update an existing ticket trigger's conditions and actions. Only the fields provided are changed.`,
    params: [
      {
        name: 'trigger_id',
        type: 'number',
        required: true,
        description: `The unique numeric identifier of the trigger to update`,
      },
      {
        name: 'actions',
        type: 'array',
        required: false,
        description: `Actions this trigger performs when its conditions are met, as a JSON array of {field, value} action objects.`,
      },
      {
        name: 'active',
        type: 'boolean',
        required: false,
        description: `Whether the trigger is active`,
      },
      {
        name: 'category_id',
        type: 'string',
        required: false,
        description: `ID of the trigger category to group this trigger under`,
      },
      {
        name: 'conditions',
        type: 'object',
        required: false,
        description: `Conditions that determine when this trigger fires, as a JSON object with 'all' and/or 'any' arrays of {field, operator, value} condition objects.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `A description of what the trigger does`,
      },
      { name: 'title', type: 'string', required: false, description: `The title of the trigger` },
    ],
  },
  {
    name: 'zendeskoauth_triggers_list',
    description: `List the ticket triggers configured for the account. Triggers run business rules automatically when a ticket is created or updated.`,
    params: [
      {
        name: 'active',
        type: 'boolean',
        required: false,
        description: `Filter by active (true) or inactive (false) triggers`,
      },
      {
        name: 'category_id',
        type: 'string',
        required: false,
        description: `Filter triggers by category ID`,
      },
      { name: 'page', type: 'number', required: false, description: `Page number to retrieve` },
      {
        name: 'per_page',
        type: 'number',
        required: false,
        description: `Results per page (max 100)`,
      },
      {
        name: 'sort_by',
        type: 'string',
        required: false,
        description: `alphabetical, created_at, updated_at, usage_1h, usage_24h, or usage_7d`,
      },
      { name: 'sort_order', type: 'string', required: false, description: `asc or desc` },
    ],
  },
  {
    name: 'zendeskoauth_user_create',
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
    name: 'zendeskoauth_user_delete',
    description: `Soft-delete a user and their associated records. Deleted users are not recoverable through the API; a further permanent-delete step is needed for GDPR compliance.`,
    params: [
      {
        name: 'user_id',
        type: 'number',
        required: true,
        description: `The unique numeric identifier of the user`,
      },
    ],
  },
  {
    name: 'zendeskoauth_user_get',
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
    name: 'zendeskoauth_user_identities_list',
    description: `List the identities (email addresses, phone numbers, social logins) associated with a user.`,
    params: [
      {
        name: 'user_id',
        type: 'number',
        required: true,
        description: `The unique numeric identifier of the user`,
      },
    ],
  },
  {
    name: 'zendeskoauth_user_identity_create',
    description: `Add a new identity (email, phone number, or social login) to a user's profile.`,
    params: [
      { name: 'type', type: 'string', required: true, description: `The kind of identity to add` },
      {
        name: 'user_id',
        type: 'number',
        required: true,
        description: `The unique numeric identifier of the user`,
      },
      {
        name: 'value',
        type: 'string',
        required: true,
        description: `The identity value, e.g. an email address or phone number`,
      },
      {
        name: 'skip_verify_email',
        type: 'boolean',
        required: false,
        description: `If true, does not send a verification email for the new identity`,
      },
    ],
  },
  {
    name: 'zendeskoauth_user_related_get',
    description: `Return related information for a user, such as counts of open tickets they requested, CC'd tickets, and assigned tickets.`,
    params: [
      {
        name: 'user_id',
        type: 'number',
        required: true,
        description: `The unique numeric identifier of the user`,
      },
    ],
  },
  {
    name: 'zendeskoauth_user_update',
    description: `Update an existing Zendesk user's profile, role, or moderation state.`,
    params: [
      {
        name: 'user_id',
        type: 'number',
        required: true,
        description: `The unique numeric identifier of the user`,
      },
      {
        name: 'email',
        type: 'string',
        required: false,
        description: `The user's primary email address`,
      },
      {
        name: 'external_id',
        type: 'string',
        required: false,
        description: `A unique identifier from another system`,
      },
      { name: 'name', type: 'string', required: false, description: `The user's full name` },
      {
        name: 'notes',
        type: 'string',
        required: false,
        description: `Any notes you want to store about the user`,
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
        description: `The user's primary phone number in E.164 format`,
      },
      { name: 'role', type: 'string', required: false, description: `end-user, agent, or admin` },
      {
        name: 'suspended',
        type: 'boolean',
        required: false,
        description: `If true, the user is suspended and cannot sign in or submit tickets`,
      },
      { name: 'tags', type: 'array', required: false, description: `The user's tags` },
      {
        name: 'verified',
        type: 'boolean',
        required: false,
        description: `Whether the user's identity is verified`,
      },
    ],
  },
  {
    name: 'zendeskoauth_users_autocomplete',
    description: `Return users whose name starts with the given substring, or that match a phone number. Only returns users with no foreign identities.`,
    params: [
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Restrict results to assignable or requester users`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Name substring to search for. Specify name or phone.`,
      },
      {
        name: 'per_page',
        type: 'number',
        required: false,
        description: `Number of results to return`,
      },
      {
        name: 'phone',
        type: 'string',
        required: false,
        description: `Phone number to search for. Specify name or phone.`,
      },
    ],
  },
  {
    name: 'zendeskoauth_users_list',
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
    name: 'zendeskoauth_users_search',
    description: `Search for users matching a query string or an exact external_id.`,
    params: [
      {
        name: 'external_id',
        type: 'string',
        required: false,
        description: `Exact external_id to match (does not support search syntax)`,
      },
      { name: 'page', type: 'number', required: false, description: `Page number to retrieve` },
      {
        name: 'per_page',
        type: 'number',
        required: false,
        description: `Results per page (max 100)`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Zendesk search syntax; can match a partial or full value of any user property`,
      },
    ],
  },
  {
    name: 'zendeskoauth_view_count_get',
    description: `Return the approximate ticket count for a single view. Rate limited to 5 requests per minute per view per agent.`,
    params: [
      {
        name: 'view_id',
        type: 'string',
        required: true,
        description: `The numeric view ID, or one of the aliases 'incoming', 'my', 'my_groups'`,
      },
    ],
  },
  {
    name: 'zendeskoauth_view_create',
    description: `Create a new ticket view (saved filter).`,
    params: [
      {
        name: 'conditions',
        type: 'object',
        required: true,
        description: `Conditions that determine which tickets appear in this view, as a JSON object with 'all' and/or 'any' arrays of {field, operator, value} condition objects.`,
      },
      { name: 'title', type: 'string', required: true, description: `The title of the view` },
      {
        name: 'active',
        type: 'boolean',
        required: false,
        description: `Whether the view is active`,
      },
      {
        name: 'execution',
        type: 'object',
        required: false,
        description: `Optional display configuration for the view's results: columns, grouping, and sorting.`,
      },
    ],
  },
  {
    name: 'zendeskoauth_view_delete',
    description: `Delete a view.`,
    params: [
      {
        name: 'view_id',
        type: 'string',
        required: true,
        description: `The unique numeric identifier of the view to delete`,
      },
    ],
  },
  {
    name: 'zendeskoauth_view_execute',
    description: `Execute a view and return its column titles and ticket rows, as they would render in the Zendesk agent UI.`,
    params: [
      {
        name: 'view_id',
        type: 'string',
        required: true,
        description: `The numeric view ID, or one of the aliases 'incoming', 'my', 'my_groups'`,
      },
      {
        name: 'group_by',
        type: 'string',
        required: false,
        description: `The ticket field title or custom field ID used for grouping`,
      },
      {
        name: 'sort_by',
        type: 'string',
        required: false,
        description: `The ticket field title or custom field ID used for sorting`,
      },
      { name: 'sort_order', type: 'string', required: false, description: `asc or desc` },
    ],
  },
  {
    name: 'zendeskoauth_view_get',
    description: `Retrieve a single view by ID. Also accepts the string aliases 'incoming', 'my', or 'my_groups' for built-in views.`,
    params: [
      {
        name: 'view_id',
        type: 'string',
        required: true,
        description: `The numeric view ID, or one of the aliases 'incoming', 'my', 'my_groups'`,
      },
    ],
  },
  {
    name: 'zendeskoauth_view_tickets_list',
    description: `List the tickets that currently match a view's conditions.`,
    params: [
      {
        name: 'view_id',
        type: 'string',
        required: true,
        description: `The numeric view ID, or one of the aliases 'incoming', 'my', 'my_groups'`,
      },
      {
        name: 'sort_by',
        type: 'string',
        required: false,
        description: `A view column to sort or group by (subject and submitter are not supported)`,
      },
      { name: 'sort_order', type: 'string', required: false, description: `asc or desc` },
    ],
  },
  {
    name: 'zendeskoauth_view_update',
    description: `Update an existing view's conditions. Only the fields provided are changed.`,
    params: [
      {
        name: 'view_id',
        type: 'string',
        required: true,
        description: `The unique numeric identifier of the view to update`,
      },
      {
        name: 'active',
        type: 'boolean',
        required: false,
        description: `Whether the view is active`,
      },
      {
        name: 'conditions',
        type: 'object',
        required: false,
        description: `Conditions that determine which tickets appear in this view, as a JSON object with 'all' and/or 'any' arrays of {field, operator, value} condition objects.`,
      },
      {
        name: 'execution',
        type: 'object',
        required: false,
        description: `Optional display configuration for the view's results: columns, grouping, and sorting.`,
      },
      { name: 'title', type: 'string', required: false, description: `The title of the view` },
    ],
  },
  {
    name: 'zendeskoauth_views_list',
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
  {
    name: 'zendeskoauth_webhook_create',
    description: `Create a new webhook to receive Zendesk event notifications at a callback URL. The webhook can be invoked directly from a trigger/automation action, or automatically via subscriptions.`,
    params: [
      {
        name: 'endpoint',
        type: 'string',
        required: true,
        description: `The destination URL the webhook sends requests to`,
      },
      {
        name: 'http_method',
        type: 'string',
        required: true,
        description: `The HTTP method used to call the endpoint`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `A display name for the webhook`,
      },
      {
        name: 'request_format',
        type: 'string',
        required: true,
        description: `The format of the request body sent to the endpoint`,
      },
      {
        name: 'authentication',
        type: 'object',
        required: false,
        description: `Authentication Zendesk should use when calling the endpoint`,
      },
      {
        name: 'custom_headers',
        type: 'object',
        required: false,
        description: `Additional custom HTTP headers to send with every webhook request`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `A description of what the webhook is for`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Whether the webhook is active or inactive`,
      },
      {
        name: 'subscriptions',
        type: 'array',
        required: false,
        description: `System event types this webhook should be automatically invoked for, if any`,
      },
    ],
  },
  {
    name: 'zendeskoauth_webhook_delete',
    description: `Permanently delete a webhook.`,
    params: [
      {
        name: 'webhook_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the webhook to delete`,
      },
    ],
  },
  {
    name: 'zendeskoauth_webhook_get',
    description: `Retrieve a single webhook by ID, including its endpoint, HTTP method, request format, and status.`,
    params: [
      {
        name: 'webhook_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the webhook`,
      },
    ],
  },
  {
    name: 'zendeskoauth_webhook_update',
    description: `Update an existing webhook's configuration. Only the fields provided are changed.`,
    params: [
      {
        name: 'webhook_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the webhook to update`,
      },
      {
        name: 'authentication',
        type: 'object',
        required: false,
        description: `Authentication Zendesk should use when calling the endpoint`,
      },
      {
        name: 'custom_headers',
        type: 'object',
        required: false,
        description: `Additional custom HTTP headers to send with every webhook request`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `A description of what the webhook is for`,
      },
      {
        name: 'endpoint',
        type: 'string',
        required: false,
        description: `The destination URL the webhook sends requests to`,
      },
      {
        name: 'http_method',
        type: 'string',
        required: false,
        description: `The HTTP method used to call the endpoint`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `A display name for the webhook`,
      },
      {
        name: 'request_format',
        type: 'string',
        required: false,
        description: `The format of the request body sent to the endpoint`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Whether the webhook is active or inactive`,
      },
      {
        name: 'subscriptions',
        type: 'array',
        required: false,
        description: `System event types this webhook should be automatically invoked for, if any`,
      },
    ],
  },
  {
    name: 'zendeskoauth_webhooks_list',
    description: `List all webhooks configured for the Zendesk account. Supports filtering by name or status, sorting, and cursor-based pagination.`,
    params: [
      {
        name: 'name_contains',
        type: 'string',
        required: false,
        description: `Only return webhooks whose name contains this substring`,
      },
      {
        name: 'page_after',
        type: 'string',
        required: false,
        description: `Cursor for the next page of results`,
      },
      {
        name: 'page_before',
        type: 'string',
        required: false,
        description: `Cursor for the previous page of results`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of webhooks to return per page (max 100)`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Field and direction to sort results by`,
      },
      { name: 'status', type: 'string', required: false, description: `Filter webhooks by status` },
    ],
  },
]
