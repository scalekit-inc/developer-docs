import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'leadiqmcp_add_prospect_to_list',
    description: `Create a new prospect and attach it to an existing LeadIQ Prospector list in one step. Returns the full prospect record with emails, phones, company, and list memberships. No credits consumed for list management (contact data unlock costs happen separately via Enrich People). Confirm the destination list with the user before saving.`,
    params: [
      {
        name: 'listId',
        type: 'string',
        required: true,
        description: `Destination list id (24-char hex ObjectId).`,
      },
      {
        name: 'prospect',
        type: 'object',
        required: true,
        description: `The prospect to create and attach to the list.`,
      },
    ],
  },
  {
    name: 'leadiqmcp_attach_prospect_to_list',
    description: `Attach an existing saved prospect (by id) to a list without creating a new record. No credits consumed. Idempotent — attaching the same prospect twice is safe. Use Add Prospect To List instead when you need to create and attach in one step.`,
    params: [
      {
        name: 'listId',
        type: 'string',
        required: true,
        description: `Destination list id (24-char hex ObjectId).`,
      },
      {
        name: 'prospectId',
        type: 'string',
        required: true,
        description: `Id of the existing prospect to attach.`,
      },
    ],
  },
  {
    name: 'leadiqmcp_browse_prospect_lists',
    description: `Paginate through the user's saved LeadIQ Prospector lists and return list metadata (id, name, description, status, visibility, dates). No credits consumed. Use this to discover existing lists before adding prospects or picking a destination list.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous response's nextCursor. Omit on the first page.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of lists to return per page (1–100, default 25).`,
      },
    ],
  },
  {
    name: 'leadiqmcp_check_credits',
    description: `Return the user's current LeadIQ credit balance and live per-field unlock costs. No credits consumed. Call this before large paid operations (Enrich People, Find People, Find Companies firmographics) to confirm available credits and quote accurate costs. Prefer the returned live costs over hardcoded figures in other tools.`,
    params: [],
  },
  {
    name: 'leadiqmcp_create_prospect',
    description: `Create a standalone prospect record in LeadIQ Prospector without attaching it to any list. No credits consumed for list management (contact data may have been unlocked separately via Enrich People). Not idempotent — each call creates a distinct record. To create and attach to a list in one step, use Add Prospect To List instead.`,
    params: [
      { name: 'firstName', type: 'string', required: true, description: `First name.` },
      { name: 'lastName', type: 'string', required: true, description: `Last name.` },
      { name: 'company', type: 'string', required: false, description: `Company name.` },
      { name: 'companyDomain', type: 'string', required: false, description: `Company domain.` },
      {
        name: 'companyIndustry',
        type: 'string',
        required: false,
        description: `Company industry.`,
      },
      {
        name: 'emailStatus',
        type: 'string',
        required: false,
        description: `Verification status of the work email. Set only when the email was already vetted upstream (e.g. returned as verified by Enrich People). Omit if unknown.`,
      },
      {
        name: 'function',
        type: 'string',
        required: false,
        description: `Job function (e.g. Sales, Marketing, Engineering).`,
      },
      {
        name: 'linkedinUrl',
        type: 'string',
        required: false,
        description: `LinkedIn profile URL.`,
      },
      {
        name: 'notes',
        type: 'string',
        required: false,
        description: `Free-form notes about the prospect.`,
      },
      {
        name: 'personId',
        type: 'string',
        required: false,
        description: `LeadIQ stable person id from a prior Enrich People result. Required to enable the verified-phone flow.`,
      },
      {
        name: 'phone',
        type: 'string',
        required: false,
        description: `Mobile or direct phone number. Pair with personId to enable the verified-phone flow.`,
      },
      {
        name: 'seniority',
        type: 'string',
        required: false,
        description: `Seniority level. Use Other when the title does not map cleanly.`,
      },
      { name: 'title', type: 'string', required: false, description: `Job title.` },
      {
        name: 'workEmail',
        type: 'string',
        required: false,
        description: `Work email address, if known.`,
      },
    ],
  },
  {
    name: 'leadiqmcp_create_prospect_list',
    description: `Create a new named prospect list in LeadIQ Prospector to organize and track leads. No credits consumed. After creation, use the returned list id with Add Prospect To List to populate it.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Name of the new prospect list.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional free-form description of the list.`,
      },
    ],
  },
  {
    name: 'leadiqmcp_enrich_companies',
    description: `Look up known companies in LeadIQ's B2B database by domain, name, LinkedIn URL, or LinkedIn ID and return firmographics, technographics, funding rounds, revenue range, NAICS/SIC codes, and social profiles. Batch up to 10 companies per call. Cost: 3 UC per result returned. Always obtain explicit user consent before calling, as the full query is a paid export.`,
    params: [
      {
        name: 'companies',
        type: 'array',
        required: true,
        description: `Up to 10 companies to look up. Identify each by domain, name, linkedinUrl, or linkedinId.`,
      },
    ],
  },
  {
    name: 'leadiqmcp_enrich_people',
    description: `Look up known people in LeadIQ's B2B database by LinkedIn URL, email, or name + company, and unlock verified work email and direct phone per person. Batch up to 10 people per call. Cost: 0.1 UC profile (always), +1 UC/person for email, +10 UC/person for phone, +3 UC/company for firmographics. Default run unlocks email + phone (up to 11 UC/person); company unlock requires explicit consent. LeadIQ only bills for data returned.`,
    params: [
      {
        name: 'people',
        type: 'array',
        required: true,
        description: `Up to 10 people to look up. Identify each by linkedinUrl (best), email, id, or fullName + company.`,
      },
      {
        name: 'unlockCompany',
        type: 'boolean',
        required: false,
        description: `Unlock company firmographics — domain, industry, employee range (3 UC per company returned). Default false. Always requires explicit user consent.`,
      },
      {
        name: 'unlockPersonalPhone',
        type: 'boolean',
        required: false,
        description: `Unlock personal phone, which is a direct business number (10 UC/person, always paired with work phone). Default true.`,
      },
      {
        name: 'unlockWorkEmail',
        type: 'boolean',
        required: false,
        description: `Unlock work email (1 UC/person). Default true.`,
      },
      {
        name: 'unlockWorkPhone',
        type: 'boolean',
        required: false,
        description: `Unlock direct phone (10 UC/person, always paired with personal phone unlock). Default true.`,
      },
    ],
  },
  {
    name: 'leadiqmcp_find_companies',
    description: `Discover companies matching ICP criteria in LeadIQ's B2B database — filter by industry, size, revenue, funding, technology stack, location, and more. Returns a list of companies with firmographic identity. Default cost: 3 UC/company (company unlock is on by default). Set unlockCompany=false for id + name only at 0.1 UC. Always obtain user consent before running with company unlock enabled.`,
    params: [
      {
        name: 'input',
        type: 'object',
        required: true,
        description: `Search filters for company discovery.`,
      },
      {
        name: 'unlockCompany',
        type: 'boolean',
        required: false,
        description: `Return full company firmographics — domain, industry, employee count (3 UC/company). Default true. Set false for id + name only at 0.1 UC.`,
      },
    ],
  },
  {
    name: 'leadiqmcp_find_job_changes',
    description: `Discover people who recently changed jobs or were promoted, matched against ICP criteria. Returns each person's full transition (previous position and company → current position and company) as a buying or warm-intro trigger signal. Default cost: 0.1 UC/person (profile only). Company firmographics unlock costs 3 UC/person and requires consent. jobChangeFilter is required — use JobChange for company movers, TitleChange for in-place promotions.`,
    params: [
      {
        name: 'input',
        type: 'object',
        required: true,
        description: `Search filters. jobChangeFilter is required.`,
      },
      {
        name: 'unlockCompany',
        type: 'boolean',
        required: false,
        description: `Unlock firmographics on both previous and current company blocks (3 UC/record). Default false. Requires user consent.`,
      },
    ],
  },
  {
    name: 'leadiqmcp_find_people',
    description: `Discover new leads in LeadIQ's B2B database matching ICP criteria — filter by title, seniority, role, industry, technology stack, company size, revenue, funding, location, and hiring or promotion signals. Returns a flat list of people with current position and company identity. Default cost: 0.1 UC/person (profile only). Company firmographics unlock costs 3 UC/person and requires consent. Use Enrich People for known individuals; use this for open-ended prospecting.`,
    params: [
      { name: 'input', type: 'object', required: true, description: `Search filters.` },
      {
        name: 'unlockCompany',
        type: 'boolean',
        required: false,
        description: `Unlock company firmographics for each result (3 UC/person). Default false. Requires user consent.`,
      },
    ],
  },
  {
    name: 'leadiqmcp_get_prospect',
    description: `Fetch a single saved Prospector prospect by id, returning the full record including LinkedIn URL, work email, phones, company, location, list memberships, and notes. No credits consumed. Reads data already saved in the user's account.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Prospect id (24-char hex ObjectId).`,
      },
    ],
  },
  {
    name: 'leadiqmcp_get_prospect_list',
    description: `Fetch a single LeadIQ Prospector list by id, including its paginated prospect records. No credits consumed. Use this to inspect prospects already saved in a known list.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `List id (24-char hex ObjectId).`,
      },
      {
        name: 'prospectsCursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous call's prospects.nextCursor. Omit on the first page.`,
      },
      {
        name: 'prospectsLimit',
        type: 'integer',
        required: false,
        description: `Number of prospects to return per page (1–100, default 25).`,
      },
    ],
  },
  {
    name: 'leadiqmcp_search_prospects',
    description: `Search the user's saved Prospector prospects across all lists by email or full name. No credits consumed. Pass either email alone, or firstName + lastName together — mixed or partial queries are not supported. Use this to check for existing contacts before creating duplicates.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a prior nextCursor.`,
      },
      {
        name: 'email',
        type: 'string',
        required: false,
        description: `Exact email to search by. Use alone (without firstName/lastName).`,
      },
      {
        name: 'firstName',
        type: 'string',
        required: false,
        description: `First name. Must be used together with lastName.`,
      },
      {
        name: 'lastName',
        type: 'string',
        required: false,
        description: `Last name. Must be used together with firstName.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of results per page (1–100, default 25).`,
      },
    ],
  },
  {
    name: 'leadiqmcp_verify_email',
    description: `Verify any email address against LeadIQ's Email Verification Service and return a deliverability verdict: Verified, VerifiedLikely, Unverified, or Invalid. No credits consumed. Does not require an existing prospect — use as a pre-flight check before saving contact data.`,
    params: [
      { name: 'email', type: 'string', required: true, description: `Email address to verify.` },
    ],
  },
  {
    name: 'leadiqmcp_verify_prospect_email',
    description: `Re-verify the work email already stored on a saved Prospector prospect and persist the updated status. No credits consumed. Returns the verdict (Verified, VerifiedLikely, Unverified, or Invalid) plus the updated prospect. Returns 409 if the prospect has no email on record. To verify an arbitrary email not tied to a prospect, use Verify Email instead.`,
    params: [
      {
        name: 'prospectId',
        type: 'string',
        required: true,
        description: `Id of the saved prospect whose email to verify.`,
      },
    ],
  },
]
