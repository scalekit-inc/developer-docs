import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'linkedin_ad_account_create',
    description: `Create a new LinkedIn ad account for running advertising campaigns.`,
    params: [
      {
        name: 'currency',
        type: 'string',
        required: true,
        description: `The currency code for the ad account (e.g. 'USD', 'EUR').`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The name of the new ad account.`,
      },
      {
        name: 'reference',
        type: 'string',
        required: true,
        description: `Reference URN for the account owner (e.g. organization URN 'urn:li:organization:12345').`,
      },
    ],
  },
  {
    name: 'linkedin_ad_account_get',
    description: `Get a LinkedIn ad account by its ID.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the ad account to retrieve.`,
      },
    ],
  },
  {
    name: 'linkedin_ad_account_update',
    description: `Partially update a LinkedIn ad account's name or status.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the ad account to update.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New name for the ad account.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `New status for the ad account (e.g. ACTIVE, CANCELED).`,
      },
    ],
  },
  {
    name: 'linkedin_ad_account_users_list',
    description: `List all users who have access to a LinkedIn ad account.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the ad account to list users for.`,
      },
    ],
  },
  {
    name: 'linkedin_ad_accounts_search',
    description: `Search LinkedIn ad accounts by status or name.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Filter by account name (partial match).`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter by account status. One of: ACTIVE, CANCELED, DRAFT.`,
      },
    ],
  },
  {
    name: 'linkedin_ad_analytics_get',
    description: `Get campaign analytics data for a LinkedIn ad campaign including impressions, clicks, and spend.`,
    params: [
      {
        name: 'campaigns',
        type: 'string',
        required: true,
        description: `The campaign URN to retrieve analytics for (e.g. 'urn:li:sponsoredCampaign:712345678').`,
      },
      {
        name: 'date_range_end',
        type: 'string',
        required: true,
        description: `End date for the analytics period (YYYY-MM-DD format).`,
      },
      {
        name: 'date_range_start',
        type: 'string',
        required: true,
        description: `Start date for the analytics period (YYYY-MM-DD format).`,
      },
      {
        name: 'time_granularity',
        type: 'string',
        required: true,
        description: `Granularity of the analytics data. One of: DAILY, MONTHLY, ALL.`,
      },
    ],
  },
  {
    name: 'linkedin_asset_get',
    description: `Get the status and details of an uploaded LinkedIn media asset.`,
    params: [
      {
        name: 'asset_id',
        type: 'string',
        required: true,
        description: `The ID of the media asset to retrieve.`,
      },
    ],
  },
  {
    name: 'linkedin_campaign_create',
    description: `Create a new ad campaign within a LinkedIn ad account.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the ad account to create the campaign in.`,
      },
      {
        name: 'campaign_group_id',
        type: 'string',
        required: true,
        description: `The ID of the campaign group this campaign belongs to.`,
      },
      {
        name: 'cost_type',
        type: 'string',
        required: true,
        description: `The cost type for the campaign (e.g. 'CPM', 'CPC', 'CPV').`,
      },
      {
        name: 'daily_budget_amount',
        type: 'string',
        required: true,
        description: `The daily budget amount as a decimal string (e.g. '100.00').`,
      },
      {
        name: 'daily_budget_currency',
        type: 'string',
        required: true,
        description: `The currency code for the daily budget (e.g. 'USD', 'EUR').`,
      },
      { name: 'name', type: 'string', required: true, description: `The name of the campaign.` },
      {
        name: 'objective_type',
        type: 'string',
        required: true,
        description: `The objective type for the campaign (e.g. 'AWARENESS', 'WEBSITE_VISIT', 'LEAD_GENERATION').`,
      },
    ],
  },
  {
    name: 'linkedin_campaign_delete',
    description: `Delete a DRAFT LinkedIn ad campaign. Only campaigns in DRAFT status can be deleted.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the ad account that owns the campaign.`,
      },
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: `The ID of the DRAFT campaign to delete.`,
      },
    ],
  },
  {
    name: 'linkedin_campaign_get',
    description: `Get a specific ad campaign by ID within a LinkedIn ad account.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the ad account that owns the campaign.`,
      },
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: `The ID of the campaign to retrieve.`,
      },
    ],
  },
  {
    name: 'linkedin_campaign_group_create',
    description: `Create a new campaign group within a LinkedIn ad account.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the ad account to create the campaign group in.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The name of the campaign group.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Status of the campaign group. One of: ACTIVE, ARCHIVED, CANCELED, DRAFT, PAUSED. Defaults to ACTIVE.`,
      },
    ],
  },
  {
    name: 'linkedin_campaign_group_get',
    description: `Get a specific campaign group by ID within a LinkedIn ad account.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the ad account that owns the campaign group.`,
      },
      {
        name: 'group_id',
        type: 'string',
        required: true,
        description: `The ID of the campaign group to retrieve.`,
      },
    ],
  },
  {
    name: 'linkedin_campaign_group_update',
    description: `Partially update a LinkedIn campaign group's name or status.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the ad account that owns the campaign group.`,
      },
      {
        name: 'group_id',
        type: 'string',
        required: true,
        description: `The ID of the campaign group to update.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New name for the campaign group.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `New status for the campaign group (e.g. ACTIVE, PAUSED, ARCHIVED).`,
      },
    ],
  },
  {
    name: 'linkedin_campaign_groups_list',
    description: `List campaign groups for a LinkedIn ad account.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the ad account to list campaign groups for.`,
      },
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: `Number of results to return per page.`,
      },
      { name: 'start', type: 'integer', required: false, description: `Offset for pagination.` },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter by campaign group status (e.g. ACTIVE, PAUSED, ARCHIVED).`,
      },
    ],
  },
  {
    name: 'linkedin_campaign_update',
    description: `Partially update a LinkedIn ad campaign's name or status.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the ad account that owns the campaign.`,
      },
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: `The ID of the campaign to update.`,
      },
      { name: 'name', type: 'string', required: false, description: `New name for the campaign.` },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `New status for the campaign (e.g. ACTIVE, PAUSED, ARCHIVED, CANCELED).`,
      },
    ],
  },
  {
    name: 'linkedin_campaigns_list',
    description: `List ad campaigns for a LinkedIn ad account.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the ad account to list campaigns for.`,
      },
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: `Number of results to return per page.`,
      },
      { name: 'start', type: 'integer', required: false, description: `Offset for pagination.` },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter by campaign status (e.g. ACTIVE, PAUSED, ARCHIVED, CANCELED, DRAFT).`,
      },
    ],
  },
  {
    name: 'linkedin_comment_delete',
    description: `Delete a specific comment on a LinkedIn post.`,
    params: [
      {
        name: 'actor_urn',
        type: 'string',
        required: true,
        description: `The URN of the actor (person) deleting the comment.`,
      },
      {
        name: 'comment_id',
        type: 'string',
        required: true,
        description: `The ID of the comment to delete.`,
      },
      {
        name: 'entity_urn',
        type: 'string',
        required: true,
        description: `The URN of the post the comment belongs to.`,
      },
    ],
  },
  {
    name: 'linkedin_comment_get',
    description: `Get a specific comment on a LinkedIn post by entity URN and comment ID.`,
    params: [
      {
        name: 'comment_id',
        type: 'string',
        required: true,
        description: `The ID of the comment to retrieve.`,
      },
      {
        name: 'entity_urn',
        type: 'string',
        required: true,
        description: `The URN of the post the comment belongs to.`,
      },
    ],
  },
  {
    name: 'linkedin_creative_create',
    description: `Create a new ad creative for a LinkedIn ad campaign.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the ad account to create the creative in.`,
      },
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: `The campaign URN this creative belongs to (e.g. 'urn:li:sponsoredCampaign:712345678').`,
      },
      { name: 'name', type: 'string', required: true, description: `The name of the creative.` },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Status of the creative. Defaults to ACTIVE.`,
      },
    ],
  },
  {
    name: 'linkedin_creative_get',
    description: `Get a specific ad creative by ID within a LinkedIn ad account.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the ad account that owns the creative.`,
      },
      {
        name: 'creative_id',
        type: 'string',
        required: true,
        description: `The ID of the creative to retrieve.`,
      },
    ],
  },
  {
    name: 'linkedin_creative_update',
    description: `Partially update a LinkedIn ad creative's name or status.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the ad account that owns the creative.`,
      },
      {
        name: 'creative_id',
        type: 'string',
        required: true,
        description: `The ID of the creative to update.`,
      },
      { name: 'name', type: 'string', required: false, description: `New name for the creative.` },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `New status for the creative (e.g. ACTIVE, PAUSED, ARCHIVED).`,
      },
    ],
  },
  {
    name: 'linkedin_creatives_list',
    description: `List ad creatives for a LinkedIn ad account, with optional filtering by campaign or status.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The ID of the ad account to list creatives for.`,
      },
      {
        name: 'campaign_id',
        type: 'string',
        required: false,
        description: `Filter creatives by campaign URN.`,
      },
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: `Number of results to return per page.`,
      },
      { name: 'start', type: 'integer', required: false, description: `Offset for pagination.` },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter by creative status (e.g. ACTIVE, PAUSED, ARCHIVED).`,
      },
    ],
  },
  {
    name: 'linkedin_email_get',
    description: `Retrieve the authenticated user's primary email address from LinkedIn.`,
    params: [],
  },
  {
    name: 'linkedin_job_posting_get',
    description: `Get details of a specific LinkedIn job posting by its ID.`,
    params: [
      {
        name: 'job_id',
        type: 'string',
        required: true,
        description: `The ID of the job posting to retrieve.`,
      },
    ],
  },
  {
    name: 'linkedin_media_upload_register',
    description: `Register a media asset upload with LinkedIn (step 1 of image/video upload). Returns an upload URL and asset ID to use for subsequent upload steps.`,
    params: [
      {
        name: 'owner_urn',
        type: 'string',
        required: true,
        description: `The URN of the person or organization that owns the media (e.g. 'urn:li:person:{id}').`,
      },
      {
        name: 'recipe',
        type: 'string',
        required: true,
        description: `The media recipe type. One of: feedshare-image, feedshare-video, messaging-attachment.`,
      },
    ],
  },
  {
    name: 'linkedin_member_search',
    description: `Search LinkedIn members by keyword for at-mention typeahead (requires Marketing API access).`,
    params: [
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: `Number of results to return.`,
      },
      {
        name: 'keywords',
        type: 'string',
        required: true,
        description: `Keywords to search for members.`,
      },
    ],
  },
  {
    name: 'linkedin_message_create',
    description: `Send a LinkedIn message via the Messaging API (requires LinkedIn Messaging API partner access). Uses /rest/messages endpoint.`,
    params: [
      {
        name: 'body',
        type: 'string',
        required: true,
        description: `The text content of the message.`,
      },
      {
        name: 'recipients',
        type: 'string',
        required: true,
        description: `Comma-separated list of recipient person URNs (e.g. 'urn:li:person:abc123,urn:li:person:def456').`,
      },
      {
        name: 'subject',
        type: 'string',
        required: false,
        description: `Optional subject line for the message.`,
      },
    ],
  },
  {
    name: 'linkedin_organization_access_control_list',
    description: `List organizations where the authenticated user has admin access via the Organizational Entity ACLs API.`,
    params: [
      {
        name: 'role_assignee_urn',
        type: 'string',
        required: true,
        description: `URN of the person whose org access to check, e.g. urn:li:person:{id}.`,
      },
    ],
  },
  {
    name: 'linkedin_organization_admins_get',
    description: `List administrators of a LinkedIn organization page using the Organizational Entity ACLs API.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Numeric LinkedIn organization ID.`,
      },
    ],
  },
  {
    name: 'linkedin_organization_by_vanity_get',
    description: `Find a LinkedIn organization by its vanity name (the custom URL slug used in the company's LinkedIn URL).`,
    params: [
      {
        name: 'vanity_name',
        type: 'string',
        required: true,
        description: `The vanity name (URL slug) of the organization to look up.`,
      },
    ],
  },
  {
    name: 'linkedin_organization_followers_count',
    description: `Get the follower count for a LinkedIn organization using its URL-encoded URN.`,
    params: [
      {
        name: 'organization_urn',
        type: 'string',
        required: true,
        description: `URL-encoded URN of the organization, e.g. urn%3Ali%3Aorganization%3A{id}.`,
      },
    ],
  },
  {
    name: 'linkedin_organization_get',
    description: `Retrieve details of a LinkedIn organization (company page) by its numeric ID.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The numeric ID of the LinkedIn organization.`,
      },
    ],
  },
  {
    name: 'linkedin_organization_post_create',
    description: `Create a UGC post on behalf of a LinkedIn organization. The post will appear on the organization's page.`,
    params: [
      {
        name: 'organization_id',
        type: 'string',
        required: true,
        description: `The numeric ID of the organization to post on behalf of.`,
      },
      {
        name: 'text',
        type: 'string',
        required: true,
        description: `The text content of the post.`,
      },
      {
        name: 'visibility',
        type: 'string',
        required: false,
        description: `Visibility of the post. PUBLIC or CONNECTIONS.`,
      },
    ],
  },
  {
    name: 'linkedin_organization_search',
    description: `Search LinkedIn organizations by keyword using the company search API.`,
    params: [
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: `Number of results to return.`,
      },
      {
        name: 'keywords',
        type: 'string',
        required: true,
        description: `Keywords to search for organizations.`,
      },
    ],
  },
  {
    name: 'linkedin_organizations_batch_get',
    description: `Batch get multiple LinkedIn organizations by their numeric IDs. Works without admin access.`,
    params: [
      {
        name: 'ids',
        type: 'string',
        required: true,
        description: `Comma-separated list of organization IDs to retrieve (e.g. '12345,67890').`,
      },
    ],
  },
  {
    name: 'linkedin_post_comment_create',
    description: `Add a comment to a LinkedIn UGC post on behalf of a member.`,
    params: [
      {
        name: 'actor',
        type: 'string',
        required: true,
        description: `URN of the member leaving the comment, e.g. urn:li:person:{id}.`,
      },
      {
        name: 'text',
        type: 'string',
        required: true,
        description: `The text content of the comment.`,
      },
      {
        name: 'ugc_post_urn',
        type: 'string',
        required: true,
        description: `URL-encoded URN of the UGC post to comment on, e.g. urn%3Ali%3AugcPost%3A{id}.`,
      },
    ],
  },
  {
    name: 'linkedin_post_comments_list',
    description: `List comments on a LinkedIn UGC post.`,
    params: [
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: `Maximum number of comments to return.`,
      },
      {
        name: 'start',
        type: 'integer',
        required: false,
        description: `Pagination start index (0-based offset).`,
      },
      {
        name: 'ugc_post_urn',
        type: 'string',
        required: true,
        description: `URL-encoded URN of the UGC post to retrieve comments for, e.g. urn%3Ali%3AugcPost%3A{id}.`,
      },
    ],
  },
  {
    name: 'linkedin_post_create',
    description: `Create a UGC post on LinkedIn on behalf of the authenticated user or organization.`,
    params: [
      {
        name: 'author',
        type: 'string',
        required: true,
        description: `URN of the post author, e.g. urn:li:person:{id} or urn:li:organization:{id}.`,
      },
      {
        name: 'text',
        type: 'string',
        required: true,
        description: `The text content of the post.`,
      },
      {
        name: 'visibility',
        type: 'string',
        required: false,
        description: `Visibility of the post. Options: PUBLIC, CONNECTIONS. Defaults to PUBLIC.`,
      },
    ],
  },
  {
    name: 'linkedin_post_delete',
    description: `Delete a UGC post from LinkedIn by its ID. This action is irreversible.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `URL-encoded post URN, e.g. urn%3Ali%3AugcPost%3A12345.`,
      },
    ],
  },
  {
    name: 'linkedin_post_get',
    description: `Get a specific LinkedIn post by its URL-encoded URN (e.g. urn%3Ali%3AugcPost%3A12345).`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `URL-encoded post URN, e.g. urn%3Ali%3AugcPost%3A12345.`,
      },
    ],
  },
  {
    name: 'linkedin_post_like',
    description: `Like a LinkedIn post on behalf of a person or organization. Uses the Reactions API.`,
    params: [
      {
        name: 'actor_urn',
        type: 'string',
        required: true,
        description: `URN of the person or org liking the post, e.g. urn:li:person:{id}.`,
      },
      {
        name: 'entity_urn',
        type: 'string',
        required: true,
        description: `URN of the post to like, e.g. urn:li:ugcPost:{id} or urn:li:share:{id}.`,
      },
    ],
  },
  {
    name: 'linkedin_posts_list',
    description: `List posts by a specific author (person or organization URN).`,
    params: [
      {
        name: 'author',
        type: 'string',
        required: true,
        description: `URL-encoded author URN, e.g. urn%3Ali%3Aperson%3A{id} or urn%3Ali%3Aorganization%3A{id}.`,
      },
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return.`,
      },
      {
        name: 'start',
        type: 'integer',
        required: false,
        description: `Pagination start index (0-based offset).`,
      },
    ],
  },
  {
    name: 'linkedin_profile_get',
    description: `Retrieve the current authenticated user's LinkedIn profile including first name, last name, ID, and profile picture.`,
    params: [],
  },
  {
    name: 'linkedin_reaction_create',
    description: `Create a reaction (like, praise, empathy, etc.) on a LinkedIn post or comment.`,
    params: [
      {
        name: 'actor_urn',
        type: 'string',
        required: true,
        description: `The URN of the person reacting (e.g. 'urn:li:person:abc123').`,
      },
      {
        name: 'entity_urn',
        type: 'string',
        required: true,
        description: `The URN of the post or comment to react to.`,
      },
      {
        name: 'reaction_type',
        type: 'string',
        required: true,
        description: `The type of reaction. One of: LIKE, PRAISE, EMPATHY, INTEREST, APPRECIATION, ENTERTAINMENT.`,
      },
    ],
  },
  {
    name: 'linkedin_reaction_delete',
    description: `Delete a reaction from a LinkedIn post or comment.`,
    params: [
      {
        name: 'actor_urn',
        type: 'string',
        required: true,
        description: `The URN of the person whose reaction is being deleted (e.g. 'urn:li:person:abc123').`,
      },
      {
        name: 'entity_urn',
        type: 'string',
        required: true,
        description: `The URN of the post or comment the reaction was made on.`,
      },
    ],
  },
  {
    name: 'linkedin_reactions_list',
    description: `List all reactions on a LinkedIn post or entity.`,
    params: [
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: `Number of reactions to return per page.`,
      },
      {
        name: 'entity_urn',
        type: 'string',
        required: true,
        description: `The URN of the post or entity to list reactions for.`,
      },
      { name: 'start', type: 'integer', required: false, description: `Offset for pagination.` },
    ],
  },
  {
    name: 'linkedin_share_create',
    description: `Create a post on LinkedIn on behalf of a person or organization.`,
    params: [
      {
        name: 'owner',
        type: 'string',
        required: true,
        description: `URN of the share owner, e.g. urn:li:person:{id} or urn:li:organization:{id}.`,
      },
      {
        name: 'text',
        type: 'string',
        required: true,
        description: `The text content of the share.`,
      },
      {
        name: 'visibility_code',
        type: 'string',
        required: false,
        description: `Visibility of the share. Options: anyone, connectionsOnly. Defaults to anyone.`,
      },
    ],
  },
  {
    name: 'linkedin_social_metadata_get',
    description: `Get engagement metadata (likes, comments, reaction counts) for a post or share by its URN.`,
    params: [
      {
        name: 'share_urn',
        type: 'string',
        required: true,
        description: `URL-encoded post/share URN, e.g. urn%3Ali%3AugcPost%3A12345.`,
      },
    ],
  },
  {
    name: 'linkedin_userinfo_get',
    description: `Get the authenticated user's OpenID Connect userinfo including id, name, email, and profile picture.`,
    params: [],
  },
]
