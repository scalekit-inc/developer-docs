import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'apollo_create_account',
    description: `Create a new account (company) record in your Apollo CRM. Accounts represent organizations and can be linked to contacts. Check for duplicates before creating to avoid double entries.`,
    params: [
      {
        name: 'domain',
        type: 'string',
        required: false,
        description: `Website domain of the company`,
      },
      {
        name: 'linkedin_url',
        type: 'string',
        required: false,
        description: `LinkedIn company page URL`,
      },
      { name: 'name', type: 'string', required: true, description: `Name of the company/account` },
      {
        name: 'phone_number',
        type: 'string',
        required: false,
        description: `Main phone number of the company`,
      },
      {
        name: 'raw_address',
        type: 'string',
        required: false,
        description: `Physical address of the company`,
      },
    ],
  },
  {
    name: 'apollo_create_contact',
    description: `Create a new contact record in your Apollo CRM. The contact will appear in your Apollo contacts list and can be enrolled in sequences. Check for duplicates before creating to avoid double entries.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: false,
        description: `Apollo account ID to associate this contact with`,
      },
      {
        name: 'email',
        type: 'string',
        required: false,
        description: `Email address of the contact`,
      },
      {
        name: 'first_name',
        type: 'string',
        required: true,
        description: `First name of the contact`,
      },
      {
        name: 'last_name',
        type: 'string',
        required: true,
        description: `Last name of the contact`,
      },
      {
        name: 'linkedin_url',
        type: 'string',
        required: false,
        description: `LinkedIn profile URL of the contact`,
      },
      {
        name: 'organization_name',
        type: 'string',
        required: false,
        description: `Company name the contact works at`,
      },
      {
        name: 'phone',
        type: 'string',
        required: false,
        description: `Phone number of the contact`,
      },
      { name: 'title', type: 'string', required: false, description: `Job title of the contact` },
    ],
  },
  {
    name: 'apollo_enrich_account',
    description: `Enrich a company/account record with Apollo firmographic data using the company's website domain or name. Returns verified employee count, revenue estimates, industry, tech stack, funding rounds, and social profiles. Consumes Apollo credits per match.`,
    params: [
      {
        name: 'domain',
        type: 'string',
        required: false,
        description: `Website domain of the company to enrich (e.g., acmecorp.com)`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Company name to enrich (used if domain is not available)`,
      },
    ],
  },
  {
    name: 'apollo_enrich_contact',
    description: `Enrich a contact using Apollo's people matching engine. Provide an email address or name + company to retrieve a verified contact profile. Revealing personal emails or phone numbers consumes additional Apollo credits per successful match.`,
    params: [
      {
        name: 'email',
        type: 'string',
        required: false,
        description: `Work email address of the contact to enrich`,
      },
      {
        name: 'first_name',
        type: 'string',
        required: false,
        description: `First name of the contact to enrich`,
      },
      {
        name: 'last_name',
        type: 'string',
        required: false,
        description: `Last name of the contact to enrich`,
      },
      {
        name: 'linkedin_url',
        type: 'string',
        required: false,
        description: `LinkedIn profile URL for precise matching`,
      },
      {
        name: 'organization_name',
        type: 'string',
        required: false,
        description: `Company name to assist in matching`,
      },
      {
        name: 'reveal_personal_emails',
        type: 'boolean',
        required: false,
        description: `Attempt to reveal personal email addresses (consumes extra Apollo credits)`,
      },
      {
        name: 'reveal_phone_number',
        type: 'boolean',
        required: false,
        description: `Attempt to reveal direct phone numbers (consumes extra Apollo credits)`,
      },
    ],
  },
  {
    name: 'apollo_get_account',
    description: `Retrieve the full profile of a company account from Apollo by its ID. Returns detailed firmographic data including employee count, revenue estimates, industry, tech stack, funding information, and social profiles.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `The Apollo account (organization) ID to retrieve`,
      },
    ],
  },
  {
    name: 'apollo_get_contact',
    description: `Retrieve the full profile of a contact from Apollo by their ID. Returns detailed professional information including email, phone, LinkedIn URL, employment history, education, and social profiles.`,
    params: [
      {
        name: 'contact_id',
        type: 'string',
        required: true,
        description: `The Apollo contact ID to retrieve`,
      },
    ],
  },
  {
    name: 'apollo_list_sequences',
    description: `List available email sequences (Apollo Sequences / Emailer Campaigns) in your Apollo account. Supports filtering by name and pagination. Returns sequence ID, name, status, and step count.`,
    params: [
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination (starts at 1)`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of sequences to return per page (max 100)`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Filter sequences by name (partial match)`,
      },
    ],
  },
  {
    name: 'apollo_search_accounts',
    description: `Search Apollo's company database using firmographic filters such as company name, industry, employee count range, revenue range, and location. Returns matching account records with company details.`,
    params: [
      {
        name: 'company_name',
        type: 'string',
        required: false,
        description: `Filter accounts by company name (partial match supported)`,
      },
      {
        name: 'employee_ranges',
        type: 'string',
        required: false,
        description: `Comma-separated employee count ranges (e.g., 1,10,11,50,51,200)`,
      },
      {
        name: 'industry',
        type: 'string',
        required: false,
        description: `Filter accounts by industry vertical`,
      },
      {
        name: 'keywords',
        type: 'string',
        required: false,
        description: `Keyword search across company name, description, and domain`,
      },
      {
        name: 'location',
        type: 'string',
        required: false,
        description: `Filter accounts by headquarters city, state, or country`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination (starts at 1)`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of accounts to return per page (max 100)`,
      },
    ],
  },
  {
    name: 'apollo_search_contacts',
    description: `Search contacts in your Apollo CRM using filters such as job title, company, and sort order. Returns matching contact records with professional details. Results are paginated.`,
    params: [
      {
        name: 'company_name',
        type: 'string',
        required: false,
        description: `Filter contacts by company name`,
      },
      {
        name: 'industry',
        type: 'string',
        required: false,
        description: `Filter contacts by their company's industry (e.g., Software, Healthcare)`,
      },
      {
        name: 'keywords',
        type: 'string',
        required: false,
        description: `Full-text keyword search across contact name, title, company, and bio`,
      },
      {
        name: 'location',
        type: 'string',
        required: false,
        description: `Filter contacts by city, state, or country`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination (starts at 1)`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of contacts to return per page (max 100)`,
      },
      {
        name: 'seniority',
        type: 'string',
        required: false,
        description: `Filter by seniority level (e.g., c_suite, vp, director, manager, senior, entry)`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Filter contacts by job title keywords (e.g., VP of Sales)`,
      },
    ],
  },
  {
    name: 'apollo_update_contact',
    description: `Update properties or CRM stage of an existing Apollo contact record by contact ID. Only the provided fields will be updated; omitted fields remain unchanged.`,
    params: [
      {
        name: 'contact_id',
        type: 'string',
        required: true,
        description: `The Apollo contact ID to update`,
      },
      {
        name: 'contact_stage_id',
        type: 'string',
        required: false,
        description: `Apollo CRM stage ID to move the contact to`,
      },
      {
        name: 'email',
        type: 'string',
        required: false,
        description: `Updated email address for the contact`,
      },
      { name: 'first_name', type: 'string', required: false, description: `Updated first name` },
      { name: 'last_name', type: 'string', required: false, description: `Updated last name` },
      {
        name: 'linkedin_url',
        type: 'string',
        required: false,
        description: `Updated LinkedIn profile URL`,
      },
      {
        name: 'organization_name',
        type: 'string',
        required: false,
        description: `Updated company name`,
      },
      { name: 'phone', type: 'string', required: false, description: `Updated phone number` },
      { name: 'title', type: 'string', required: false, description: `Updated job title` },
    ],
  },
]
