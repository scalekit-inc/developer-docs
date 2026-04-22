import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'harvestapi_bulk_scrape_profiles',
    description: `Batch scrape multiple LinkedIn profiles in a single request using the HarvestAPI Apify scraper. Accepts a JSON array of LinkedIn profile URLs. Pricing: $4 per 1,000 profiles, $10 per 1,000 with email. Requires an Apify API token from https://console.apify.com/settings/integrations.`,
    params: [
      {
        name: 'apify_token',
        type: 'string',
        required: true,
        description: `Your Apify API token from https://console.apify.com/settings/integrations.`,
      },
      {
        name: 'profile_urls',
        type: 'array',
        required: true,
        description: `JSON array of LinkedIn profile URLs to scrape in bulk.`,
      },
      {
        name: 'find_email',
        type: 'boolean',
        required: false,
        description: `When true, attempts email discovery for all profiles. Costs $10 per 1,000 instead of $4.`,
      },
    ],
  },
  {
    name: 'harvestapi_get_ad',
    description: `Retrieve details of a specific LinkedIn ad by ad ID or URL.`,
    params: [
      {
        name: 'ad_id',
        type: 'string',
        required: false,
        description: `The unique identifier of the LinkedIn Ad.`,
      },
      { name: 'url', type: 'string', required: false, description: `The URL of the LinkedIn Ad.` },
    ],
  },
  {
    name: 'harvestapi_get_comment_reactions',
    description: `Retrieve reactions on a specific LinkedIn comment by its URL.`,
    params: [
      { name: 'url', type: 'string', required: true, description: `URL of the LinkedIn comment.` },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination (default: 1).`,
      },
    ],
  },
  {
    name: 'harvestapi_get_company',
    description: `Retrieve the Harvest company (account) information for the authenticated user, including company name, base URI, plan type, clock format, currency, and weekly capacity settings.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `Your Harvest account ID, returned during OAuth as the Harvest-Account-Id header.`,
      },
    ],
  },
  {
    name: 'harvestapi_get_company_posts',
    description: `Retrieve posts published by a LinkedIn company page. Returns paginated post content, engagement metrics, and timestamps.`,
    params: [
      {
        name: 'company',
        type: 'string',
        required: false,
        description: `LinkedIn company URL. Provide this or company_universal_name.`,
      },
      {
        name: 'company_universal_name',
        type: 'string',
        required: false,
        description: `LinkedIn company universal name (slug from company URL).`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination (default: 1).`,
      },
    ],
  },
  {
    name: 'harvestapi_get_group',
    description: `Retrieve details of a LinkedIn group including name, description, member count, and activity by URL or group ID.`,
    params: [
      {
        name: 'group_id',
        type: 'string',
        required: false,
        description: `LinkedIn group ID. Provide this or url.`,
      },
      {
        name: 'url',
        type: 'string',
        required: false,
        description: `LinkedIn group URL. Provide this or group_id.`,
      },
    ],
  },
  {
    name: 'harvestapi_get_post',
    description: `Retrieve a specific LinkedIn post by its URL. Returns full post content, author details, and engagement metrics.`,
    params: [
      { name: 'url', type: 'string', required: true, description: `The LinkedIn post URL.` },
    ],
  },
  {
    name: 'harvestapi_get_post_comments',
    description: `Retrieve all comments on a LinkedIn post by its URL. Returns comment text, author details, and timestamps.`,
    params: [
      {
        name: 'post',
        type: 'string',
        required: true,
        description: `The LinkedIn post URL to retrieve comments for.`,
      },
    ],
  },
  {
    name: 'harvestapi_get_post_reactions',
    description: `Retrieve all reactions on a LinkedIn post by its URL. Returns reaction type and reactor profile details.`,
    params: [
      {
        name: 'post',
        type: 'string',
        required: true,
        description: `The LinkedIn post URL to retrieve reactions for.`,
      },
    ],
  },
  {
    name: 'harvestapi_get_profile_comments',
    description: `Retrieve comments made by a LinkedIn profile. Returns paginated results with comment content and timestamps.`,
    params: [
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination (default: 1).`,
      },
      {
        name: 'pagination_token',
        type: 'string',
        required: false,
        description: `Required for pages > 1. Use token from previous page response.`,
      },
      {
        name: 'posted_limit',
        type: 'string',
        required: false,
        description: `Filter by maximum posted date. Options: '24h', 'week', 'month'.`,
      },
      {
        name: 'profile',
        type: 'string',
        required: false,
        description: `URL of the LinkedIn profile.`,
      },
      {
        name: 'profile_id',
        type: 'string',
        required: false,
        description: `Profile ID of the LinkedIn profile. Faster than URL lookup.`,
      },
    ],
  },
  {
    name: 'harvestapi_get_profile_posts',
    description: `Retrieve posts made by a specific LinkedIn profile. Returns paginated post content, engagement data, and timestamps.`,
    params: [
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination (default: 1).`,
      },
      {
        name: 'profile',
        type: 'string',
        required: false,
        description: `LinkedIn profile URL. Provide this or profile_id.`,
      },
      {
        name: 'profile_id',
        type: 'string',
        required: false,
        description: `LinkedIn profile ID. Provide this or profile.`,
      },
      {
        name: 'profile_public_identifier',
        type: 'string',
        required: false,
        description: `LinkedIn public identifier (slug from profile URL).`,
      },
    ],
  },
  {
    name: 'harvestapi_get_profile_reactions',
    description: `Retrieve reactions made by a LinkedIn profile. Returns paginated results.`,
    params: [
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination (default: 1).`,
      },
      {
        name: 'pagination_token',
        type: 'string',
        required: false,
        description: `Required for pages > 1. Use token from previous page response.`,
      },
      {
        name: 'profile',
        type: 'string',
        required: false,
        description: `URL of the LinkedIn profile.`,
      },
      {
        name: 'profile_id',
        type: 'string',
        required: false,
        description: `Profile ID of the LinkedIn profile. Faster than URL lookup.`,
      },
    ],
  },
  {
    name: 'harvestapi_scrape_company',
    description: `Scrape a LinkedIn company page for overview, headcount, employee count range, follower count, locations, specialities, industries, and funding data. Provide one of: company_url, universal_name, or search (company name).`,
    params: [
      {
        name: 'company_url',
        type: 'string',
        required: false,
        description: `Full LinkedIn company page URL. Provide this, universal_name, or search.`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Company name to look up on LinkedIn. Returns the most relevant result. Provide this, company_url, or universal_name.`,
      },
      {
        name: 'universal_name',
        type: 'string',
        required: false,
        description: `Company universal name from the LinkedIn URL slug. Provide this, company_url, or search.`,
      },
    ],
  },
  {
    name: 'harvestapi_scrape_job',
    description: `Retrieve full job listing details from LinkedIn by job URL or job ID. Returns title, company, description, requirements, salary, location, workplace type, employment type, applicant count, and application details. Provide one of: job_url or job_id.`,
    params: [
      {
        name: 'job_id',
        type: 'string',
        required: false,
        description: `LinkedIn numeric job ID from the posting URL. Provide this or job_url.`,
      },
      {
        name: 'job_url',
        type: 'string',
        required: false,
        description: `Full LinkedIn job posting URL. Provide this or job_id.`,
      },
    ],
  },
  {
    name: 'harvestapi_scrape_profile',
    description: `Scrape a LinkedIn profile by URL or public identifier, returning contact details, employment history, education, skills, and more. Provide either profile_url or public_identifier. Use main=true for a simplified profile at fewer credits. Optionally find email with find_email=true (costs extra credits). Processing time ~2.6s (main) or ~4.9s (full).`,
    params: [
      {
        name: 'find_email',
        type: 'boolean',
        required: false,
        description: `When true, attempts to find the profile's email address via SMTP verification. Costs extra credits.`,
      },
      {
        name: 'include_about_profile',
        type: 'boolean',
        required: false,
        description: `When true, includes the 'About' section of the LinkedIn profile in the response.`,
      },
      {
        name: 'main',
        type: 'boolean',
        required: false,
        description: `When true, returns a simplified profile with fewer fields. Charges fewer credits than a full scrape.`,
      },
      {
        name: 'profile_id',
        type: 'string',
        required: false,
        description: `LinkedIn numeric profile ID. Can be used instead of profile_url or public_identifier.`,
      },
      {
        name: 'profile_url',
        type: 'string',
        required: false,
        description: `Full LinkedIn profile URL. Provide this or public_identifier or profile_id.`,
      },
      {
        name: 'public_identifier',
        type: 'string',
        required: false,
        description: `LinkedIn profile public identifier (the slug in the URL). Provide this or profile_url or profile_id.`,
      },
      {
        name: 'skip_smtp',
        type: 'boolean',
        required: false,
        description: `When true, skips SMTP verification when finding email. Faster but less accurate.`,
      },
    ],
  },
  {
    name: 'harvestapi_search_ads',
    description: `Search the LinkedIn Ad Library for ads by keyword, advertiser, country, and date range. Useful for competitive research and ad intelligence.`,
    params: [
      {
        name: 'account_owner',
        type: 'string',
        required: false,
        description: `LinkedIn company URL of the advertiser.`,
      },
      {
        name: 'countries',
        type: 'string',
        required: false,
        description: `Country codes to filter ads by, comma-separated. e.g. 'US,GB'.`,
      },
      {
        name: 'date_option',
        type: 'string',
        required: false,
        description: `Predefined date filter option.`,
      },
      {
        name: 'enddate',
        type: 'string',
        required: false,
        description: `End date for ad search in YYYY-MM-DD format.`,
      },
      {
        name: 'keyword',
        type: 'string',
        required: false,
        description: `Keyword to search for in ads.`,
      },
      {
        name: 'startdate',
        type: 'string',
        required: false,
        description: `Start date for ad search in YYYY-MM-DD format.`,
      },
    ],
  },
  {
    name: 'harvestapi_search_companies',
    description: `Search LinkedIn for companies using keyword, location, and company size filters. Returns paginated results with company name, description, and LinkedIn URL.`,
    params: [
      {
        name: 'company_size',
        type: 'string',
        required: false,
        description: `Company size range filter e.g. '1-10', '11-50', '51-200'.`,
      },
      {
        name: 'location',
        type: 'string',
        required: false,
        description: `Location to filter companies by.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination (default: 1).`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Keyword to search for companies.`,
      },
    ],
  },
  {
    name: 'harvestapi_search_geo',
    description: `Search for LinkedIn geo IDs by location name. Returns matching geographic location IDs used for filtering people and job searches by location.`,
    params: [
      {
        name: 'search',
        type: 'string',
        required: true,
        description: `Location name to search for geo IDs.`,
      },
    ],
  },
  {
    name: 'harvestapi_search_groups',
    description: `Search LinkedIn groups by keyword. Returns paginated results with group name, description, and member count.`,
    params: [
      {
        name: 'search',
        type: 'string',
        required: true,
        description: `Keyword to search for groups.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination (default: 1).`,
      },
    ],
  },
  {
    name: 'harvestapi_search_jobs',
    description: `Search LinkedIn job listings by keyword, location, company, workplace type, employment type, experience level, and salary. Returns paginated job listings with title, company, location, and LinkedIn URL.`,
    params: [
      {
        name: 'company_id',
        type: 'string',
        required: false,
        description: `Filter by LinkedIn company ID(s), comma-separated.`,
      },
      {
        name: 'easy_apply',
        type: 'boolean',
        required: false,
        description: `When true, filter to jobs with LinkedIn Easy Apply only.`,
      },
      {
        name: 'employment_type',
        type: 'string',
        required: false,
        description: `Filter by employment type. Accepted values: full-time, part-time, contract, temporary, internship (comma-separated).`,
      },
      {
        name: 'experience_level',
        type: 'string',
        required: false,
        description: `Filter by experience level. Accepted values: internship, entry, associate, mid-senior, director, executive (comma-separated).`,
      },
      {
        name: 'location',
        type: 'string',
        required: false,
        description: `Filter by job location text (city, country, or region).`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination (default: 1).`,
      },
      {
        name: 'posted_limit',
        type: 'string',
        required: false,
        description: `Filter by recency of posting. Accepted values: 24h, week, month.`,
      },
      {
        name: 'salary',
        type: 'string',
        required: false,
        description: `Minimum salary filter. Accepted values: 40k+, 60k+, 80k+, 100k+, 120k+, 140k+, 160k+, 180k+, 200k+.`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Job title or keyword to search for.`,
      },
      {
        name: 'sort_by',
        type: 'string',
        required: false,
        description: `Sort results by relevance or date.`,
      },
      {
        name: 'workplace_type',
        type: 'string',
        required: false,
        description: `Filter by workplace type. Accepted values: office, hybrid, remote (comma-separated).`,
      },
    ],
  },
  {
    name: 'harvestapi_search_leads',
    description: `Search LinkedIn for leads using advanced filters including company, job title, location, seniority, industry, and experience. Supports LinkedIn Sales Navigator URLs.`,
    params: [
      {
        name: 'company_headcount',
        type: 'string',
        required: false,
        description: `Filter by company size e.g. '1-10', '11-50', '51-200'.`,
      },
      {
        name: 'current_companies',
        type: 'string',
        required: false,
        description: `Filter by current company IDs or URLs (max 50, comma-separated).`,
      },
      {
        name: 'current_job_titles',
        type: 'string',
        required: false,
        description: `Filter by current job titles (max 70, comma-separated).`,
      },
      {
        name: 'first_names',
        type: 'string',
        required: false,
        description: `Filter by first names (max 70, comma-separated).`,
      },
      {
        name: 'geo_ids',
        type: 'string',
        required: false,
        description: `LinkedIn Geo IDs for location filtering. Overrides locations.`,
      },
      {
        name: 'industry_ids',
        type: 'string',
        required: false,
        description: `Filter by industry IDs (max 70, comma-separated).`,
      },
      {
        name: 'last_names',
        type: 'string',
        required: false,
        description: `Filter by last names (max 70, comma-separated).`,
      },
      {
        name: 'locations',
        type: 'string',
        required: false,
        description: `Location text filter (max 70, comma-separated).`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination (default: 1, max: 100).`,
      },
      {
        name: 'past_companies',
        type: 'string',
        required: false,
        description: `Filter by past company IDs or URLs (max 50, comma-separated).`,
      },
      {
        name: 'past_job_titles',
        type: 'string',
        required: false,
        description: `Filter by past job titles (max 70, comma-separated).`,
      },
      {
        name: 'recently_changed_jobs',
        type: 'boolean',
        required: false,
        description: `Filter for people who recently changed jobs.`,
      },
      {
        name: 'sales_nav_url',
        type: 'string',
        required: false,
        description: `LinkedIn Sales Navigator URL to use as search override.`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Search query supporting LinkedIn operators.`,
      },
      {
        name: 'seniority_level_ids',
        type: 'string',
        required: false,
        description: `Filter by seniority level IDs (comma-separated).`,
      },
      {
        name: 'years_of_experience_ids',
        type: 'string',
        required: false,
        description: `Filter by years of total experience IDs.`,
      },
    ],
  },
  {
    name: 'harvestapi_search_people',
    description: `Search LinkedIn for people using filters such as job title, current company, location, and industry. Uses LinkedIn Lead Search for unmasked results. Returns paginated profiles with name, title, location, and LinkedIn URL. All parameters are optional and comma-separated for multiple values.`,
    params: [
      {
        name: 'company_headcount',
        type: 'string',
        required: false,
        description: `Company headcount range filter, comma-separated (e.g. '1-10,11-50').`,
      },
      {
        name: 'current_companies',
        type: 'string',
        required: false,
        description: `Current company IDs or LinkedIn URLs, comma-separated (max 50).`,
      },
      {
        name: 'current_job_titles',
        type: 'string',
        required: false,
        description: `Current job titles, comma-separated (max 70). e.g. 'CTO,VP Engineering'`,
      },
      {
        name: 'first_names',
        type: 'string',
        required: false,
        description: `First names to filter by, comma-separated (max 70).`,
      },
      {
        name: 'industry_ids',
        type: 'string',
        required: false,
        description: `LinkedIn industry IDs, comma-separated (max 70).`,
      },
      {
        name: 'last_names',
        type: 'string',
        required: false,
        description: `Last names to filter by, comma-separated (max 70).`,
      },
      {
        name: 'locations',
        type: 'string',
        required: false,
        description: `Location text, comma-separated (max 70). e.g. 'San Francisco,New York'`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination (default: 1, max: 100).`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Fuzzy keyword search across name, title, and company. Supports LinkedIn search operators.`,
      },
      {
        name: 'seniority_level_ids',
        type: 'string',
        required: false,
        description: `LinkedIn seniority level IDs, comma-separated.`,
      },
    ],
  },
  {
    name: 'harvestapi_search_posts',
    description: `Search LinkedIn posts by keyword, company, profile, or group. Supports filtering by post age and sorting. Returns paginated results with post content, author, and engagement data.`,
    params: [
      {
        name: 'authors_company',
        type: 'string',
        required: false,
        description: `Filter posts by the author's current company URL.`,
      },
      {
        name: 'company',
        type: 'string',
        required: false,
        description: `LinkedIn company URL to filter posts by.`,
      },
      {
        name: 'company_id',
        type: 'string',
        required: false,
        description: `LinkedIn company ID to filter posts by.`,
      },
      {
        name: 'group',
        type: 'string',
        required: false,
        description: `LinkedIn group URL to filter posts by.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination (default: 1).`,
      },
      {
        name: 'posted_limit',
        type: 'string',
        required: false,
        description: `Filter by post age. e.g. 'past-24h', 'past-week', 'past-month'.`,
      },
      {
        name: 'profile',
        type: 'string',
        required: false,
        description: `LinkedIn profile URL to filter posts by.`,
      },
      {
        name: 'profile_id',
        type: 'string',
        required: false,
        description: `LinkedIn profile ID to filter posts by.`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Keyword to search for in posts.`,
      },
      {
        name: 'sort_by',
        type: 'string',
        required: false,
        description: `Sort results by 'relevance' or 'date'.`,
      },
    ],
  },
  {
    name: 'harvestapi_search_services',
    description: `Search LinkedIn profiles offering services by name, location, or geo ID. Returns paginated results.`,
    params: [
      {
        name: 'search',
        type: 'string',
        required: true,
        description: `Search profiles by service name or keyword.`,
      },
      {
        name: 'geo_id',
        type: 'string',
        required: false,
        description: `Filter by LinkedIn Geo ID. Overrides the location parameter.`,
      },
      {
        name: 'location',
        type: 'string',
        required: false,
        description: `Filter by location text.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination (default: 1).`,
      },
    ],
  },
]
