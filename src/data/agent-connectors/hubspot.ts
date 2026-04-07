import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'hubspot_companies_search',
    description: `Search HubSpot companies using full-text search and pagination. Returns matching companies with specified properties.`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Pagination offset to get results starting from a specific position`,
      },
      {
        name: 'filterGroups',
        type: 'string',
        required: false,
        description: `JSON string containing filter groups for advanced filtering`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of results to return per page (max 100)`,
      },
      {
        name: 'properties',
        type: 'string',
        required: false,
        description: `Comma-separated list of properties to include in the response`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Search term for full-text search across company properties`,
      },
    ],
  },
  {
    name: 'hubspot_company_create',
    description: `Create a new company in HubSpot CRM. Requires a company name as the unique identifier. Supports additional properties like domain, industry, phone, location, and revenue information.`,
    params: [
      {
        name: 'annualrevenue',
        type: 'number',
        required: false,
        description: `Annual revenue of the company`,
      },
      { name: 'city', type: 'string', required: false, description: `Company city location` },
      { name: 'country', type: 'string', required: false, description: `Company country location` },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Company description or overview`,
      },
      { name: 'domain', type: 'string', required: false, description: `Company website domain` },
      {
        name: 'industry',
        type: 'string',
        required: false,
        description: `Industry type of the company`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Company name (required, serves as primary identifier)`,
      },
      {
        name: 'numberofemployees',
        type: 'number',
        required: false,
        description: `Number of employees at the company`,
      },
      { name: 'phone', type: 'string', required: false, description: `Company phone number` },
      { name: 'state', type: 'string', required: false, description: `Company state or region` },
    ],
  },
  {
    name: 'hubspot_company_get',
    description: `Retrieve details of a specific company from HubSpot by company ID. Returns company properties and associated data.`,
    params: [
      {
        name: 'company_id',
        type: 'string',
        required: true,
        description: `ID of the company to retrieve`,
      },
      {
        name: 'properties',
        type: 'string',
        required: false,
        description: `Comma-separated list of properties to include in the response`,
      },
    ],
  },
  {
    name: 'hubspot_contact_create',
    description: `Create a new contact in HubSpot CRM. Requires an email address as the unique identifier. Supports additional properties like name, company, phone, and lifecycle stage.`,
    params: [
      {
        name: 'company',
        type: 'string',
        required: false,
        description: `Company name where the contact works`,
      },
      {
        name: 'email',
        type: 'string',
        required: true,
        description: `Primary email address for the contact (required, serves as unique identifier)`,
      },
      {
        name: 'firstname',
        type: 'string',
        required: false,
        description: `First name of the contact`,
      },
      {
        name: 'hs_lead_status',
        type: 'string',
        required: false,
        description: `Lead status of the contact`,
      },
      {
        name: 'jobtitle',
        type: 'string',
        required: false,
        description: `Job title of the contact`,
      },
      {
        name: 'lastname',
        type: 'string',
        required: false,
        description: `Last name of the contact`,
      },
      {
        name: 'lifecyclestage',
        type: 'string',
        required: false,
        description: `Lifecycle stage of the contact`,
      },
      {
        name: 'phone',
        type: 'string',
        required: false,
        description: `Phone number of the contact`,
      },
      {
        name: 'website',
        type: 'string',
        required: false,
        description: `Personal or company website URL`,
      },
    ],
  },
  {
    name: 'hubspot_contact_get',
    description: `Retrieve details of a specific contact from HubSpot by contact ID. Returns contact properties and associated data.`,
    params: [
      {
        name: 'contact_id',
        type: 'string',
        required: true,
        description: `ID of the contact to retrieve`,
      },
      {
        name: 'properties',
        type: 'string',
        required: false,
        description: `Comma-separated list of properties to include in the response`,
      },
    ],
  },
  {
    name: 'hubspot_contact_update',
    description: `Update an existing contact in HubSpot CRM by contact ID. Allows updating contact properties like name, email, company, phone, and lifecycle stage.`,
    params: [
      {
        name: 'contact_id',
        type: 'string',
        required: true,
        description: `ID of the contact to update`,
      },
      {
        name: 'props',
        type: 'object',
        required: false,
        description: `Object containing properties like first name, last name, email, company, phone, and job title to update all these should be provided inside props as a JSON object, this is required`,
      },
    ],
  },
  {
    name: 'hubspot_contacts_list',
    description: `Retrieve a list of contacts from HubSpot with filtering and pagination. Returns contact properties and supports pagination through cursor-based navigation.`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Pagination cursor to get the next set of results`,
      },
      {
        name: 'archived',
        type: 'boolean',
        required: false,
        description: `Whether to include archived contacts in the results`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of results to return per page (max 100)`,
      },
      {
        name: 'properties',
        type: 'string',
        required: false,
        description: `Comma-separated list of properties to include in the response`,
      },
    ],
  },
  {
    name: 'hubspot_contacts_search',
    description: `Search HubSpot contacts using full-text search and pagination. Returns matching contacts with specified properties.`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Pagination offset to get results starting from a specific position`,
      },
      {
        name: 'filterGroups',
        type: 'string',
        required: false,
        description: `JSON string containing filter groups for advanced filtering`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of results to return per page (max 100)`,
      },
      {
        name: 'properties',
        type: 'string',
        required: false,
        description: `Comma-separated list of properties to include in the response`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Search term for full-text search across contact properties`,
      },
    ],
  },
  {
    name: 'hubspot_deal_create',
    description: `Create a new deal in HubSpot CRM. Requires dealname, amount, and dealstage. Supports additional properties like pipeline, close date, and deal type.`,
    params: [
      {
        name: 'amount',
        type: 'number',
        required: true,
        description: `Deal amount/value (required)`,
      },
      {
        name: 'closedate',
        type: 'string',
        required: false,
        description: `Expected close date (YYYY-MM-DD format)`,
      },
      {
        name: 'dealname',
        type: 'string',
        required: true,
        description: `Name of the deal (required)`,
      },
      {
        name: 'dealstage',
        type: 'string',
        required: true,
        description: `Current stage of the deal (required)`,
      },
      { name: 'dealtype', type: 'string', required: false, description: `Type of deal` },
      { name: 'description', type: 'string', required: false, description: `Deal description` },
      {
        name: 'hs_priority',
        type: 'string',
        required: false,
        description: `Deal priority (HIGH, MEDIUM, LOW)`,
      },
      { name: 'pipeline', type: 'string', required: false, description: `Deal pipeline` },
    ],
  },
  {
    name: 'hubspot_deal_update',
    description: `Update an existing deal in HubSpot CRM by deal ID. Allows updating deal properties like name, amount, stage, pipeline, close date, and priority.`,
    params: [
      { name: 'deal_id', type: 'string', required: true, description: `ID of the deal to update` },
      {
        name: 'good_deal',
        type: 'boolean',
        required: false,
        description: `Boolean flag indicating if this is a good deal`,
      },
      {
        name: 'properties',
        type: 'object',
        required: true,
        description: `Object containing deal properties to update`,
      },
    ],
  },
  {
    name: 'hubspot_deals_search',
    description: `Search HubSpot deals using full-text search and pagination. Returns matching deals with specified properties.`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Pagination offset to get results starting from a specific position`,
      },
      {
        name: 'filterGroups',
        type: 'string',
        required: false,
        description: `JSON string containing filter groups for advanced filtering`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of results to return per page (max 100)`,
      },
      {
        name: 'properties',
        type: 'string',
        required: false,
        description: `Comma-separated list of properties to include in the response`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Search term for full-text search across deal properties`,
      },
    ],
  },
]
