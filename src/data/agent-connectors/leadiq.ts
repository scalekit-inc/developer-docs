import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'leadiq_add_prospect_to_list',
    description: `Add a contact to an existing LeadIQ prospect list. Provide first name, last name, and any known contact details. Use Get Prospect Lists to find the list ID.`,
    params: [
      { name: 'first_name', type: 'string', required: true, description: `First name of the prospect` },
      { name: 'last_name', type: 'string', required: true, description: `Last name of the prospect` },
      { name: 'list_id', type: 'string', required: true, description: `ID of the prospect list to add the contact to` },
      { name: 'company', type: 'string', required: false, description: `Current company name of the prospect` },
      { name: 'company_domain', type: 'string', required: false, description: `Website domain of the prospect's company` },
      { name: 'company_industry', type: 'string', required: false, description: `Industry of the prospect's company` },
      { name: 'linkedin_url', type: 'string', required: false, description: `LinkedIn profile URL of the prospect` },
      { name: 'mobile_phone', type: 'string', required: false, description: `Mobile phone number of the prospect` },
      { name: 'notes', type: 'string', required: false, description: `Internal notes about this prospect` },
      { name: 'seniority', type: 'string', required: false, description: `Seniority level of the prospect` },
      { name: 'title', type: 'string', required: false, description: `Job title of the prospect` },
      { name: 'work_email', type: 'string', required: false, description: `Work email address of the prospect` },
      { name: 'work_phone', type: 'string', required: false, description: `Work phone number of the prospect` },
    ],
  },
  {
    name: 'leadiq_create_list',
    description: `Create a new prospect list in LeadIQ to organize contacts for outreach campaigns. Returns the created list ID for use with Add Prospect to List.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name of the prospect list` },
      { name: 'description', type: 'string', required: false, description: `Optional description of the prospect list` },
    ],
  },
  {
    name: 'leadiq_flat_advanced_search',
    description: `Search across LeadIQ's full contact database using advanced filters for title, seniority, company, industry, location, and more. Returns a flat list of matching contacts. Consumes credits per result.`,
    params: [
      { name: 'company_excluded_filter', type: 'object', required: false, description: `Exclude contacts at companies matching these criteria` },
      { name: 'company_filter', type: 'object', required: false, description: `Filter by company attributes including name, domain, industry, size, and location` },
      { name: 'contact_excluded_filter', type: 'object', required: false, description: `Exclude contacts matching these criteria` },
      { name: 'contact_filter', type: 'object', required: false, description: `Filter contacts by title, seniority, role, location, and more` },
      { name: 'limit', type: 'integer', required: false, description: `Maximum number of contacts to return (default 10)` },
      { name: 'skip', type: 'integer', required: false, description: `Number of results to skip for pagination (default 0)` },
    ],
  },
  {
    name: 'leadiq_get_account',
    description: `Retrieve the current LeadIQ account details including active plans, product subscriptions, billing status, and credit usage (available and used). Use this to check remaining search credits before making enrichment calls.`,
    params: [
    ],
  },
  {
    name: 'leadiq_get_list',
    description: `Retrieve a specific prospect list by ID, including its contacts with name, title, company, email, and LinkedIn URL. Use Get Prospect Lists first to find the list ID.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `ID of the prospect list to retrieve` },
      { name: 'prospects_cursor', type: 'string', required: false, description: `Pagination cursor from a previous response to get the next batch of prospects` },
      { name: 'prospects_limit', type: 'integer', required: false, description: `Maximum number of prospects to return from the list (default 25)` },
    ],
  },
  {
    name: 'leadiq_get_lists',
    description: `Retrieve all prospect lists in the LeadIQ account. Returns list metadata including name, status, and timestamps. Use the returned list IDs with Get Prospect List to fetch contacts.`,
    params: [
      { name: 'cursor', type: 'string', required: false, description: `Pagination cursor from a previous response's nextCursor field` },
      { name: 'limit', type: 'integer', required: false, description: `Maximum number of lists to return per page` },
    ],
  },
  {
    name: 'leadiq_get_prospect',
    description: `Retrieve a single prospect record by ID, including full contact details: emails, phones, LinkedIn, title, company, and location.`,
    params: [
      { name: 'id', type: 'string', required: true, description: `ID of the prospect to retrieve` },
    ],
  },
  {
    name: 'leadiq_get_usage',
    description: `Retrieve API credit usage for the current billing period — plan credit counts, usage caps, trial usage, and subscription status. Use this to monitor quota before making credit-consuming calls.`,
    params: [
    ],
  },
  {
    name: 'leadiq_grouped_advanced_search',
    description: `Search LeadIQ's contact database with advanced filters and get results grouped by company. Each result contains a company record with its top matching contacts. Useful for account-based prospecting. Consumes credits per contact returned.`,
    params: [
      { name: 'company_excluded_filter', type: 'object', required: false, description: `Exclude companies matching these criteria` },
      { name: 'company_filter', type: 'object', required: false, description: `Filter by company name, domain, industry, size, location, and more` },
      { name: 'contact_excluded_filter', type: 'object', required: false, description: `Exclude contacts matching these criteria` },
      { name: 'contact_filter', type: 'object', required: false, description: `Filter contacts by title, seniority, role, location, and more` },
      { name: 'limit', type: 'integer', required: false, description: `Maximum number of companies to return (default 10)` },
      { name: 'limit_per_company', type: 'integer', required: false, description: `Maximum number of contacts to return per company (default 5)` },
      { name: 'skip', type: 'integer', required: false, description: `Number of companies to skip for pagination (default 0)` },
    ],
  },
  {
    name: 'leadiq_search_company',
    description: `Search for a company by name, domain, or LinkedIn URL. Returns firmographic data including employee count, industry, headquarters location, and funding information.`,
    params: [
      { name: 'domain', type: 'string', required: false, description: `Company website domain` },
      { name: 'linkedin_id', type: 'string', required: false, description: `LinkedIn company numeric ID` },
      { name: 'linkedin_url', type: 'string', required: false, description: `LinkedIn company page URL` },
      { name: 'name', type: 'string', required: false, description: `Company name to search for` },
      { name: 'strict', type: 'boolean', required: false, description: `Enable strict matching — only return exact name or domain matches` },
    ],
  },
  {
    name: 'leadiq_search_people',
    description: `Search for a person by LinkedIn URL, email, or name + company. At least one of: linkedin_url, email, or first_name+last_name must be provided. Returns verified work emails, direct dials, and current job details. Consumes LeadIQ credits per result.`,
    params: [
      { name: 'company_domain', type: 'string', required: false, description: `Domain of the person's current company` },
      { name: 'company_name', type: 'string', required: false, description: `Current company name of the person` },
      { name: 'contains_work_contact_info', type: 'boolean', required: false, description: `Only return results that have at least one work email or work phone` },
      { name: 'email', type: 'string', required: false, description: `Known email address of the person` },
      { name: 'first_name', type: 'string', required: false, description: `First name of the person to search for` },
      { name: 'full_name', type: 'string', required: false, description: `Full name of the person (alternative to first_name + last_name)` },
      { name: 'last_name', type: 'string', required: false, description: `Last name of the person to search for` },
      { name: 'limit', type: 'integer', required: false, description: `Maximum number of results to return (default 10, max 25)` },
      { name: 'linkedin_url', type: 'string', required: false, description: `LinkedIn profile URL of the person` },
      { name: 'skip', type: 'integer', required: false, description: `Number of results to skip for pagination (default 0)` },
    ],
  },
  {
    name: 'leadiq_search_people_preview',
    description: `Check whether LeadIQ has a work email or phone number for a person without consuming credits. Use this before calling Search People to avoid wasting credits on contacts with no data.`,
    params: [
      { name: 'company_domain', type: 'string', required: false, description: `Domain of the person's current company` },
      { name: 'company_name', type: 'string', required: false, description: `Current company name of the person` },
      { name: 'email', type: 'string', required: false, description: `Known email address of the person` },
      { name: 'first_name', type: 'string', required: false, description: `First name of the person` },
      { name: 'full_name', type: 'string', required: false, description: `Full name of the person` },
      { name: 'last_name', type: 'string', required: false, description: `Last name of the person` },
      { name: 'linkedin_url', type: 'string', required: false, description: `LinkedIn profile URL of the person` },
    ],
  },
  {
    name: 'leadiq_submit_person_feedback',
    description: `Report incorrect or outdated contact data back to LeadIQ to improve data quality. Mark an email or phone as correct or invalid, and optionally provide a correction or bounce reason.`,
    params: [
      { name: 'value', type: 'string', required: true, description: `The contact info value being reported (email address or phone number)` },
      { name: 'company_domain', type: 'string', required: false, description: `Company domain for additional context` },
      { name: 'company_name', type: 'string', required: false, description: `Company name for additional context` },
      { name: 'invalid_reason', type: 'string', required: false, description: `Specific bounce or invalidity reason code (for invalid emails)` },
      { name: 'linkedin_url', type: 'string', required: false, description: `LinkedIn URL of the person the feedback is about` },
      { name: 'person_id', type: 'string', required: false, description: `LeadIQ person ID associated with the contact info` },
      { name: 'status', type: 'string', required: false, description: `Whether the contact info is correct or invalid` },
      { name: 'title', type: 'string', required: false, description: `Job title of the person at the time the contact info was used` },
      { name: 'type', type: 'string', required: false, description: `Type of contact information being reported` },
    ],
  },
]
