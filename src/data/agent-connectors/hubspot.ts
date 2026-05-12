import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  // ─── Companies ────────────────────────────────────────────────────────────────
  {
    name: 'hubspot_company_create',
    description:
      'Create a new company in HubSpot CRM. Requires a company name as the unique identifier. Supports additional properties like domain, industry, phone, location, and revenue information.',
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: 'Company name (required, serves as primary identifier).',
      },
      {
        name: 'domain',
        type: 'string',
        required: false,
        description: 'Company website domain (e.g. `example.com`).',
      },
      {
        name: 'phone',
        type: 'string',
        required: false,
        description: 'Primary phone number for the company.',
      },
      {
        name: 'industry',
        type: 'string',
        required: false,
        description: 'Industry type of the company.',
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: 'Company description or overview.',
      },
      {
        name: 'city',
        type: 'string',
        required: false,
        description: 'City where the company is located.',
      },
      {
        name: 'state',
        type: 'string',
        required: false,
        description: 'State or region where the company is located.',
      },
      {
        name: 'country',
        type: 'string',
        required: false,
        description: 'Country where the company is located.',
      },
      {
        name: 'annualrevenue',
        type: 'number',
        required: false,
        description: 'Annual revenue of the company in dollars.',
      },
      {
        name: 'numberofemployees',
        type: 'number',
        required: false,
        description: 'Number of employees at the company.',
      },
    ],
  },
  {
    name: 'hubspot_company_get',
    description:
      'Retrieve details of a specific company from HubSpot by company ID. Returns company properties and associated data.',
    params: [
      {
        name: 'company_id',
        type: 'string',
        required: true,
        description: 'The unique identifier of the company in HubSpot.',
      },
      {
        name: 'properties',
        type: 'string',
        required: false,
        description:
          'Comma-separated list of properties to include in the response (e.g. `name,domain,industry,phone`).',
      },
    ],
  },
  {
    name: 'hubspot_company_update',
    description:
      'Update an existing company in HubSpot CRM by company ID. Provide any fields to update.',
    params: [
      {
        name: 'company_id',
        type: 'string',
        required: true,
        description: 'The unique identifier of the company in HubSpot.',
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: 'Updated name of the company.',
      },
      {
        name: 'domain',
        type: 'string',
        required: false,
        description: 'Updated company website domain.',
      },
      {
        name: 'phone',
        type: 'string',
        required: false,
        description: 'Updated primary phone number.',
      },
      {
        name: 'city',
        type: 'string',
        required: false,
        description: 'Updated city.',
      },
      {
        name: 'state',
        type: 'string',
        required: false,
        description: 'Updated state or region.',
      },
      {
        name: 'country',
        type: 'string',
        required: false,
        description: 'Updated country.',
      },
      {
        name: 'industry',
        type: 'string',
        required: false,
        description: 'Updated industry.',
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: 'Updated company description.',
      },
      {
        name: 'website',
        type: 'string',
        required: false,
        description: 'Full URL of the company website.',
      },
      {
        name: 'annualrevenue',
        type: 'number',
        required: false,
        description: 'Updated annual revenue.',
      },
      {
        name: 'numberofemployees',
        type: 'number',
        required: false,
        description: 'Updated number of employees.',
      },
    ],
  },
  {
    name: 'hubspot_companies_search',
    description:
      'Search HubSpot companies using full-text search and pagination. Returns matching companies with specified properties.',
    params: [
      {
        name: 'query',
        type: 'string',
        required: false,
        description: 'Search term for full-text search across company properties.',
      },
      {
        name: 'filterGroups',
        type: 'string',
        required: false,
        description:
          'JSON string containing filter groups (e.g. `[{"filters":[{"propertyName":"industry","operator":"EQ","value":"Technology"}]}]`).',
      },
      {
        name: 'properties',
        type: 'string',
        required: false,
        description: 'Comma-separated list of properties to include.',
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: 'Number of results per page (max 100).',
      },
      {
        name: 'after',
        type: 'string',
        required: false,
        description: 'Pagination offset from previous response.',
      },
    ],
  },

  // ─── Contacts ─────────────────────────────────────────────────────────────────
  {
    name: 'hubspot_contact_create',
    description:
      'Create a new contact in HubSpot CRM. Requires an email address as the unique identifier. Supports additional properties like name, company, phone, and lifecycle stage.',
    params: [
      {
        name: 'email',
        type: 'string',
        required: true,
        description: 'Primary email address (required, must be unique in HubSpot).',
      },
      {
        name: 'firstname',
        type: 'string',
        required: false,
        description: "Contact's first name.",
      },
      {
        name: 'lastname',
        type: 'string',
        required: false,
        description: "Contact's last name.",
      },
      {
        name: 'phone',
        type: 'string',
        required: false,
        description: "Contact's primary phone number.",
      },
      {
        name: 'company',
        type: 'string',
        required: false,
        description: 'Company name where the contact works.',
      },
      {
        name: 'jobtitle',
        type: 'string',
        required: false,
        description: "Contact's job title or role.",
      },
      {
        name: 'website',
        type: 'string',
        required: false,
        description: 'Personal or company website URL.',
      },
      {
        name: 'lifecyclestage',
        type: 'string',
        required: false,
        description:
          'Lifecycle stage: `subscriber`, `lead`, `marketingqualifiedlead`, `salesqualifiedlead`, `opportunity`, `customer`, `evangelist`, or `other`.',
      },
      {
        name: 'hs_lead_status',
        type: 'string',
        required: false,
        description:
          'Lead status: `NEW`, `OPEN`, `IN_PROGRESS`, `OPEN_DEAL`, `UNQUALIFIED`, `ATTEMPTED_TO_CONTACT`, `CONNECTED`, or `BAD_TIMING`.',
      },
    ],
  },
  {
    name: 'hubspot_contact_get',
    description:
      'Retrieve details of a specific contact from HubSpot by contact ID. Returns contact properties and associated data.',
    params: [
      {
        name: 'contact_id',
        type: 'string',
        required: true,
        description: 'The unique identifier of the contact in HubSpot.',
      },
      {
        name: 'properties',
        type: 'string',
        required: false,
        description:
          'Comma-separated list of properties to include (e.g. `firstname,lastname,email,company`).',
      },
    ],
  },
  {
    name: 'hubspot_contact_update',
    description:
      'Update an existing contact in HubSpot CRM by contact ID. Provide any fields to update.',
    params: [
      {
        name: 'contact_id',
        type: 'string',
        required: true,
        description: 'The unique identifier of the contact in HubSpot.',
      },
      {
        name: 'email',
        type: 'string',
        required: false,
        description: 'Updated email address (must be unique in HubSpot).',
      },
      {
        name: 'firstname',
        type: 'string',
        required: false,
        description: 'Updated first name.',
      },
      {
        name: 'lastname',
        type: 'string',
        required: false,
        description: 'Updated last name.',
      },
      {
        name: 'phone',
        type: 'string',
        required: false,
        description: 'Updated phone number.',
      },
      {
        name: 'company',
        type: 'string',
        required: false,
        description: 'Updated company name.',
      },
      {
        name: 'jobtitle',
        type: 'string',
        required: false,
        description: 'Updated job title.',
      },
      {
        name: 'website',
        type: 'string',
        required: false,
        description: 'Updated website URL.',
      },
      {
        name: 'lifecyclestage',
        type: 'string',
        required: false,
        description: 'Updated lifecycle stage (e.g. `lead`, `customer`).',
      },
      {
        name: 'hs_lead_status',
        type: 'string',
        required: false,
        description: 'Updated lead status (e.g. `IN_PROGRESS`, `CONNECTED`).',
      },
    ],
  },
  {
    name: 'hubspot_contacts_list',
    description:
      'Retrieve a list of contacts from HubSpot with filtering and pagination. Returns contact properties and supports cursor-based navigation.',
    params: [
      {
        name: 'properties',
        type: 'string',
        required: false,
        description: 'Comma-separated list of properties to return.',
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: 'Number of contacts to return per page (max 100).',
      },
      {
        name: 'after',
        type: 'string',
        required: false,
        description: 'Cursor value from previous response to get next page.',
      },
      {
        name: 'archived',
        type: 'boolean',
        required: false,
        description: 'Include archived contacts (default: false).',
      },
    ],
  },
  {
    name: 'hubspot_contacts_search',
    description:
      'Search HubSpot contacts using full-text search and pagination. Returns matching contacts with specified properties.',
    params: [
      {
        name: 'query',
        type: 'string',
        required: false,
        description: 'Search term for full-text search across contact properties.',
      },
      {
        name: 'filterGroups',
        type: 'string',
        required: false,
        description:
          'JSON string containing filter groups (e.g. `[{"filters":[{"propertyName":"lifecyclestage","operator":"EQ","value":"customer"}]}]`).',
      },
      {
        name: 'properties',
        type: 'string',
        required: false,
        description: 'Comma-separated list of properties to include.',
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: 'Number of results per page (max 100).',
      },
      {
        name: 'after',
        type: 'string',
        required: false,
        description: 'Pagination offset from previous response.',
      },
    ],
  },
  {
    name: 'hubspot_contacts_batch_create',
    description:
      'Create multiple contacts in HubSpot CRM in a single batch API call. Pass a JSON array of contact objects — each with a `properties` map and an optional `associations` array.',
    params: [
      {
        name: 'inputs',
        type: 'string',
        required: true,
        description:
          'JSON array of contact objects to create. Each item has a `properties` object with contact fields and an optional `associations` array to link records on creation. Example: `[{"properties":{"email":"jane@example.com","firstname":"Jane","lastname":"Smith"},"associations":[{"to":{"id":"201"},"types":[{"associationCategory":"HUBSPOT_DEFINED","associationTypeId":279}]}]}]`',
      },
    ],
  },
  {
    name: 'hubspot_contacts_batch_update',
    description:
      'Update multiple contacts in HubSpot CRM in a single batch API call. Pass a JSON array of objects — each with an `id` and a `properties` map.',
    params: [
      {
        name: 'inputs',
        type: 'string',
        required: true,
        description:
          'JSON array of contact update objects. Each item has an `id` (HubSpot record ID) and a `properties` object with fields to update. Example: `[{"id":"12345","properties":{"jobtitle":"VP of Engineering","lifecyclestage":"customer"}}]`',
      },
    ],
  },
  {
    name: 'hubspot_contacts_batch_upsert',
    description:
      'Create or update multiple contacts in HubSpot CRM in a single batch API call. Uses `idProperty` for lookup — creates if not found, updates if found.',
    params: [
      {
        name: 'inputs',
        type: 'string',
        required: true,
        description:
          'JSON array of contact upsert objects. Each item has an `idProperty` (unique field name, e.g. `"email"`), `id` (value of that field), and `properties` map. Example: `[{"idProperty":"email","id":"jane@example.com","properties":{"firstname":"Jane","lifecyclestage":"lead"}}]`',
      },
    ],
  },
  {
    name: 'hubspot_contacts_batch_read',
    description:
      'Read multiple contact records from HubSpot CRM in a single batch API call. Pass a JSON array of record IDs.',
    params: [
      {
        name: 'inputs',
        type: 'string',
        required: true,
        description:
          'JSON array of contact record IDs to fetch. Each item has an `id` field. Example: `[{"id":"12345"},{"id":"67890"}]`',
      },
      {
        name: 'properties',
        type: 'string',
        required: false,
        description:
          'JSON array of property names to return (e.g. `["firstname","email","company"]`). Returns default properties if omitted.',
      },
    ],
  },
  {
    name: 'hubspot_contacts_batch_archive',
    description:
      'Archive multiple contacts in HubSpot CRM in a single batch API call. Archived contacts are hidden from the UI but can be restored.',
    params: [
      {
        name: 'inputs',
        type: 'string',
        required: true,
        description:
          'JSON array of contact record IDs to archive. Each item has an `id` field. Example: `[{"id":"12345"},{"id":"67890"}]`',
      },
    ],
  },
  {
    name: 'hubspot_contact_list_membership_get',
    description:
      'Retrieve all HubSpot lists that a specific contact belongs to, identified by contact ID.',
    params: [
      {
        name: 'contact_id',
        type: 'string',
        required: true,
        description: 'The unique identifier of the contact in HubSpot.',
      },
    ],
  },
  {
    name: 'hubspot_contact_email_events_get',
    description:
      'Retrieve marketing email events for a specific contact by their email address. Returns open, click, bounce, and unsubscribe events.',
    params: [
      {
        name: 'email',
        type: 'string',
        required: true,
        description: "The contact's email address.",
      },
      {
        name: 'eventType',
        type: 'string',
        required: false,
        description: 'Filter by event type: `OPEN`, `CLICK`, `BOUNCE`, or `UNSUBSCRIBE`.',
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: 'Number of events to return per page (default: 100).',
      },
    ],
  },

  {
    name: 'hubspot_companies_batch_create',
    description:
      'Create multiple companies in HubSpot CRM in a single batch API call. Pass a JSON array of company objects — each with a `properties` map and an optional `associations` array.',
    params: [
      {
        name: 'inputs',
        type: 'string',
        required: true,
        description:
          'JSON array of company objects to create. Each item has a `properties` object with company fields and an optional `associations` array. Example: `[{"properties":{"name":"Acme Corp","domain":"acme.com","industry":"TECHNOLOGY"},"associations":[{"to":{"id":"101"},"types":[{"associationCategory":"HUBSPOT_DEFINED","associationTypeId":280}]}]}]`',
      },
    ],
  },
  {
    name: 'hubspot_companies_batch_update',
    description:
      'Update multiple companies in HubSpot CRM in a single batch API call. Pass a JSON array of objects — each with an `id` and a `properties` map.',
    params: [
      {
        name: 'inputs',
        type: 'string',
        required: true,
        description:
          'JSON array of company update objects. Each item has an `id` (HubSpot record ID) and a `properties` object with fields to update. Example: `[{"id":"12345","properties":{"numberofemployees":500,"annualrevenue":"5000000"}}]`',
      },
    ],
  },
  {
    name: 'hubspot_companies_batch_upsert',
    description:
      'Create or update multiple companies in HubSpot CRM in a single batch API call. Specify a unique property via `idProperty` to match records — omitting `idProperty` defaults to matching by record ID.',
    params: [
      {
        name: 'inputs',
        type: 'string',
        required: true,
        description:
          'JSON array of company upsert objects. Each item has an `idProperty` (unique field name, e.g. `"domain"`), `id` (value of that field), and `properties` map. Example: `[{"idProperty":"domain","id":"acme.com","properties":{"name":"Acme Corp","industry":"TECHNOLOGY"}}]`',
      },
    ],
  },
  {
    name: 'hubspot_companies_batch_read',
    description:
      'Read multiple company records from HubSpot CRM in a single batch API call. Pass a JSON array of record IDs.',
    params: [
      {
        name: 'inputs',
        type: 'string',
        required: true,
        description:
          'JSON array of company record IDs to fetch. Each item has an `id` field. Example: `[{"id":"12345"},{"id":"67890"}]`',
      },
      {
        name: 'properties',
        type: 'string',
        required: false,
        description:
          'JSON array of property names to return (e.g. `["name","domain","industry"]`). Returns default properties if omitted.',
      },
    ],
  },
  {
    name: 'hubspot_companies_batch_archive',
    description:
      'Archive multiple companies in HubSpot CRM in a single batch API call. Archived companies are hidden from the UI but can be restored.',
    params: [
      {
        name: 'inputs',
        type: 'string',
        required: true,
        description:
          'JSON array of company record IDs to archive. Each item has an `id` field. Example: `[{"id":"12345"},{"id":"67890"}]`',
      },
    ],
  },

  // ─── Deals ────────────────────────────────────────────────────────────────────
  {
    name: 'hubspot_deal_create',
    description:
      'Create a new deal in HubSpot CRM. Requires dealname and dealstage. Supports additional properties like amount, pipeline, close date, and deal type.',
    params: [
      {
        name: 'dealname',
        type: 'string',
        required: true,
        description: 'Name of the deal.',
      },
      {
        name: 'dealstage',
        type: 'string',
        required: true,
        description: 'Current stage of the deal (e.g. `qualifiedtobuy`, `closedwon`).',
      },
      {
        name: 'amount',
        type: 'number',
        required: false,
        description: 'Monetary value of the deal.',
      },
      {
        name: 'closedate',
        type: 'string',
        required: false,
        description: 'Expected close date in `YYYY-MM-DD` format.',
      },
      {
        name: 'pipeline',
        type: 'string',
        required: false,
        description: 'The pipeline this deal belongs to (e.g. `default`).',
      },
      {
        name: 'dealtype',
        type: 'string',
        required: false,
        description: 'Classification of the deal type (e.g. `newbusiness`, `existingbusiness`).',
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: 'Additional details about the deal.',
      },
      {
        name: 'hs_priority',
        type: 'string',
        required: false,
        description: 'Deal priority: `high`, `medium`, or `low`.',
      },
    ],
  },
  {
    name: 'hubspot_deal_get',
    description:
      'Retrieve details of a specific deal from HubSpot by deal ID. Returns deal properties and associated data.',
    params: [
      {
        name: 'deal_id',
        type: 'string',
        required: true,
        description: 'The unique identifier of the deal in HubSpot.',
      },
      {
        name: 'properties',
        type: 'string',
        required: false,
        description:
          'Comma-separated list of properties to return (e.g. `dealname,amount,dealstage,closedate`).',
      },
      {
        name: 'associations',
        type: 'string',
        required: false,
        description:
          'Comma-separated object types to retrieve associations for (e.g. `contacts,companies,line_items`).',
      },
    ],
  },
  {
    name: 'hubspot_deal_update',
    description: 'Update an existing deal in HubSpot CRM by deal ID. Provide any fields to update.',
    params: [
      {
        name: 'deal_id',
        type: 'string',
        required: true,
        description: 'The unique identifier of the deal in HubSpot.',
      },
      {
        name: 'dealname',
        type: 'string',
        required: false,
        description: 'Updated name of the deal.',
      },
      {
        name: 'dealstage',
        type: 'string',
        required: false,
        description: 'Updated pipeline stage (e.g. `closedwon`).',
      },
      {
        name: 'amount',
        type: 'number',
        required: false,
        description: 'Updated monetary value of the deal.',
      },
      {
        name: 'closedate',
        type: 'string',
        required: false,
        description: 'Updated expected close date in `YYYY-MM-DD` format.',
      },
      {
        name: 'pipeline',
        type: 'string',
        required: false,
        description: 'Updated pipeline.',
      },
      {
        name: 'dealtype',
        type: 'string',
        required: false,
        description: 'Updated deal type.',
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: 'Updated deal description.',
      },
      {
        name: 'hs_priority',
        type: 'string',
        required: false,
        description: 'Updated priority: `high`, `medium`, or `low`.',
      },
    ],
  },
  {
    name: 'hubspot_deals_search',
    description:
      'Search HubSpot deals using full-text search and pagination. Returns matching deals with specified properties.',
    params: [
      {
        name: 'query',
        type: 'string',
        required: false,
        description: 'Search term for full-text search across deal properties.',
      },
      {
        name: 'filterGroups',
        type: 'string',
        required: false,
        description:
          'JSON string containing filter groups (e.g. `[{"filters":[{"propertyName":"dealstage","operator":"EQ","value":"closedwon"}]}]`).',
      },
      {
        name: 'properties',
        type: 'string',
        required: false,
        description: 'Comma-separated list of properties to include.',
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: 'Number of results per page (max 100).',
      },
      {
        name: 'after',
        type: 'string',
        required: false,
        description: 'Pagination offset from previous response.',
      },
    ],
  },
  {
    name: 'hubspot_deal_pipelines_list',
    description:
      'Retrieve all pipelines for a HubSpot CRM object type (e.g. `deals` or `tickets`), including pipeline stages. Use this to get valid pipeline IDs and stage IDs for creating or updating deals and tickets.',
    params: [
      {
        name: 'archived',
        type: 'boolean',
        required: false,
        description: 'Set to `true` to include archived pipelines.',
      },
    ],
  },
  {
    name: 'hubspot_deal_line_items_get',
    description: 'Retrieve all line items associated with a specific HubSpot deal.',
    params: [
      {
        name: 'deal_id',
        type: 'string',
        required: true,
        description: 'The HubSpot ID of the deal.',
      },
    ],
  },

  {
    name: 'hubspot_deals_batch_create',
    description:
      'Create multiple deals in HubSpot CRM in a single batch API call. Pass a JSON array of deal objects — each with a `properties` map and an optional `associations` array.',
    params: [
      {
        name: 'inputs',
        type: 'string',
        required: true,
        description:
          'JSON array of deal objects to create. Each item has a `properties` object with deal fields and an optional `associations` array. Example: `[{"properties":{"dealname":"Enterprise Q4","amount":"50000","dealstage":"qualifiedtobuy","closedate":"2025-12-31"},"associations":[{"to":{"id":"101"},"types":[{"associationCategory":"HUBSPOT_DEFINED","associationTypeId":3}]}]}]`',
      },
    ],
  },
  {
    name: 'hubspot_deals_batch_update',
    description:
      'Update multiple deals in HubSpot CRM in a single batch API call. Pass a JSON array of objects — each with an `id` and a `properties` map.',
    params: [
      {
        name: 'inputs',
        type: 'string',
        required: true,
        description:
          'JSON array of deal update objects. Each item has an `id` (HubSpot record ID) and a `properties` object with fields to update. Example: `[{"id":"12345","properties":{"dealstage":"closedwon","amount":"75000"}}]`',
      },
    ],
  },
  {
    name: 'hubspot_deals_batch_upsert',
    description:
      'Create or update multiple deals in HubSpot CRM in a single batch API call. Uses a unique property for lookup — the property must be configured as unique in your HubSpot portal.',
    params: [
      {
        name: 'inputs',
        type: 'string',
        required: true,
        description:
          'JSON array of deal upsert objects. Each item has an `idProperty` (unique field name), `id` (value of that field), and `properties` map. Example: `[{"idProperty":"dealname","id":"Enterprise Q4","properties":{"amount":"50000","dealstage":"qualifiedtobuy"}}]`',
      },
    ],
  },
  {
    name: 'hubspot_deals_batch_read',
    description:
      'Read multiple deal records from HubSpot CRM in a single batch API call. Pass a JSON array of record IDs.',
    params: [
      {
        name: 'inputs',
        type: 'string',
        required: true,
        description:
          'JSON array of deal record IDs to fetch. Each item has an `id` field. Example: `[{"id":"12345"},{"id":"67890"}]`',
      },
      {
        name: 'properties',
        type: 'string',
        required: false,
        description:
          'JSON array of property names to return (e.g. `["dealname","amount","dealstage"]`). Returns default properties if omitted.',
      },
    ],
  },
  {
    name: 'hubspot_deals_batch_archive',
    description:
      'Archive multiple deals in HubSpot CRM in a single batch API call. Archived deals are hidden from the UI but can be restored.',
    params: [
      {
        name: 'inputs',
        type: 'string',
        required: true,
        description:
          'JSON array of deal record IDs to archive. Each item has an `id` field. Example: `[{"id":"12345"},{"id":"67890"}]`',
      },
    ],
  },

  // ─── Tickets ──────────────────────────────────────────────────────────────────
  {
    name: 'hubspot_ticket_create',
    description:
      'Create a new support ticket in HubSpot. Use `hubspot_deal_pipelines_list` with `object_type: tickets` to find valid pipeline and stage IDs.',
    params: [
      {
        name: 'subject',
        type: 'string',
        required: true,
        description: 'A short descriptive title for the support ticket.',
      },
      {
        name: 'hs_pipeline_stage',
        type: 'string',
        required: true,
        description: 'Pipeline stage ID for the ticket (e.g. `1` for New).',
      },
      {
        name: 'content',
        type: 'string',
        required: false,
        description: 'Detailed description of the support issue.',
      },
      {
        name: 'hs_pipeline',
        type: 'string',
        required: false,
        description: "Pipeline ID (use `'0'` for the default Support Pipeline).",
      },
      {
        name: 'hs_ticket_priority',
        type: 'string',
        required: false,
        description: 'Priority level: `HIGH`, `MEDIUM`, or `LOW`.',
      },
    ],
  },
  {
    name: 'hubspot_ticket_get',
    description: 'Retrieve details of a specific HubSpot support ticket by ticket ID.',
    params: [
      {
        name: 'ticket_id',
        type: 'string',
        required: true,
        description: 'The unique identifier of the ticket in HubSpot.',
      },
      {
        name: 'properties',
        type: 'string',
        required: false,
        description: 'Comma-separated list of properties to return.',
      },
    ],
  },
  {
    name: 'hubspot_ticket_update',
    description:
      'Update an existing HubSpot support ticket by ticket ID. Provide any fields to update.',
    params: [
      {
        name: 'ticket_id',
        type: 'string',
        required: true,
        description: 'The unique identifier of the ticket in HubSpot.',
      },
      {
        name: 'subject',
        type: 'string',
        required: false,
        description: 'Updated subject of the ticket.',
      },
      {
        name: 'content',
        type: 'string',
        required: false,
        description: 'Updated description of the support issue.',
      },
      {
        name: 'hs_pipeline_stage',
        type: 'string',
        required: false,
        description: 'Updated pipeline stage ID.',
      },
      {
        name: 'hs_pipeline',
        type: 'string',
        required: false,
        description: 'Updated pipeline ID.',
      },
      {
        name: 'hs_ticket_priority',
        type: 'string',
        required: false,
        description: 'Updated priority: `HIGH`, `MEDIUM`, or `LOW`.',
      },
    ],
  },
  {
    name: 'hubspot_tickets_search',
    description:
      'Search HubSpot support tickets using filters and full-text search. Returns matching tickets with their properties.',
    params: [
      {
        name: 'query',
        type: 'string',
        required: false,
        description: 'Full-text search term across ticket subjects and content.',
      },
      {
        name: 'filterGroups',
        type: 'string',
        required: false,
        description:
          'JSON string containing filter groups (e.g. `[{"filters":[{"propertyName":"hs_ticket_priority","operator":"EQ","value":"HIGH"}]}]`).',
      },
      {
        name: 'properties',
        type: 'string',
        required: false,
        description: 'Comma-separated list of properties to include.',
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: 'Number of results per page (max 100).',
      },
      {
        name: 'after',
        type: 'string',
        required: false,
        description: 'Pagination offset from previous response.',
      },
    ],
  },

  {
    name: 'hubspot_tickets_batch_create',
    description:
      'Create multiple support tickets in HubSpot CRM in a single batch API call. Pass a JSON array of ticket objects — each with a `properties` map and an optional `associations` array.',
    params: [
      {
        name: 'inputs',
        type: 'string',
        required: true,
        description:
          'JSON array of ticket objects to create. Each item has a `properties` object with ticket fields and an optional `associations` array. Example: `[{"properties":{"subject":"Login issue","hs_pipeline_stage":"1","hs_ticket_priority":"HIGH"},"associations":[{"to":{"id":"101"},"types":[{"associationCategory":"HUBSPOT_DEFINED","associationTypeId":16}]}]}]`',
      },
    ],
  },
  {
    name: 'hubspot_tickets_batch_update',
    description:
      'Update multiple support tickets in HubSpot CRM in a single batch API call. Pass a JSON array of objects — each with an `id` and a `properties` map.',
    params: [
      {
        name: 'inputs',
        type: 'string',
        required: true,
        description:
          'JSON array of ticket update objects. Each item has an `id` (HubSpot record ID) and a `properties` object with fields to update. Example: `[{"id":"12345","properties":{"hs_pipeline_stage":"4","hs_ticket_priority":"LOW"}}]`',
      },
    ],
  },
  {
    name: 'hubspot_tickets_batch_upsert',
    description:
      'Create or update multiple support tickets in HubSpot CRM in a single batch API call. Uses a unique property for lookup — the property must be configured as unique in your HubSpot portal.',
    params: [
      {
        name: 'inputs',
        type: 'string',
        required: true,
        description:
          'JSON array of ticket upsert objects. Each item has an `idProperty` (unique field name), `id` (value of that field), and `properties` map. Example: `[{"idProperty":"subject","id":"Login issue","properties":{"hs_pipeline_stage":"1","hs_ticket_priority":"HIGH"}}]`',
      },
    ],
  },
  {
    name: 'hubspot_tickets_batch_read',
    description:
      'Read multiple support ticket records from HubSpot CRM in a single batch API call. Pass a JSON array of record IDs.',
    params: [
      {
        name: 'inputs',
        type: 'string',
        required: true,
        description:
          'JSON array of ticket record IDs to fetch. Each item has an `id` field. Example: `[{"id":"12345"},{"id":"67890"}]`',
      },
      {
        name: 'properties',
        type: 'string',
        required: false,
        description:
          'JSON array of property names to return (e.g. `["subject","hs_ticket_priority","hs_pipeline_stage"]`). Returns default properties if omitted.',
      },
    ],
  },
  {
    name: 'hubspot_tickets_batch_archive',
    description:
      'Archive multiple support tickets in HubSpot CRM in a single batch API call. Archived tickets are hidden from the UI but can be restored.',
    params: [
      {
        name: 'inputs',
        type: 'string',
        required: true,
        description:
          'JSON array of ticket record IDs to archive. Each item has an `id` field. Example: `[{"id":"12345"},{"id":"67890"}]`',
      },
    ],
  },

  // ─── Tasks ────────────────────────────────────────────────────────────────────
  {
    name: 'hubspot_task_create',
    description:
      'Create a new task in HubSpot CRM. Tasks can be assigned to owners and associated with contacts, companies, or deals.',
    params: [
      {
        name: 'hs_task_subject',
        type: 'string',
        required: true,
        description: 'A descriptive subject for the task.',
      },
      {
        name: 'hs_timestamp',
        type: 'string',
        required: true,
        description:
          'Due date and time for the task in ISO 8601 format (e.g. `2024-01-20T10:00:00Z`).',
      },
      {
        name: 'hs_task_status',
        type: 'string',
        required: false,
        description: 'Status: `NOT_STARTED`, `IN_PROGRESS`, `COMPLETED`, `DEFERRED`, or `WAITING`.',
      },
      {
        name: 'hs_task_priority',
        type: 'string',
        required: false,
        description: 'Priority: `HIGH`, `MEDIUM`, or `LOW`.',
      },
      {
        name: 'hs_task_type',
        type: 'string',
        required: false,
        description: 'Type of task: `EMAIL`, `CALL`, or `TODO`.',
      },
      {
        name: 'hs_task_body',
        type: 'string',
        required: false,
        description: 'Additional notes or context for the task.',
      },
    ],
  },
  {
    name: 'hubspot_task_complete',
    description:
      'Mark a HubSpot task as completed or update its status. Use the task ID from `hubspot_tasks_search` or `hubspot_task_create`.',
    params: [
      {
        name: 'task_id',
        type: 'string',
        required: true,
        description: 'The unique identifier of the task in HubSpot.',
      },
      {
        name: 'hs_task_status',
        type: 'string',
        required: false,
        description:
          'New status: `NOT_STARTED`, `IN_PROGRESS`, `COMPLETED`, `DEFERRED`, or `WAITING`.',
      },
      {
        name: 'hs_task_body',
        type: 'string',
        required: false,
        description: 'Updated notes when completing the task.',
      },
    ],
  },
  {
    name: 'hubspot_tasks_search',
    description:
      'Search HubSpot tasks using filters and full-text search. Returns tasks with their subject, status, due date, and priority.',
    params: [
      {
        name: 'query',
        type: 'string',
        required: false,
        description: 'Full-text search term across task subjects and notes.',
      },
      {
        name: 'filterGroups',
        type: 'string',
        required: false,
        description:
          'JSON string containing filter groups (e.g. `[{"filters":[{"propertyName":"hs_task_status","operator":"NEQ","value":"COMPLETED"}]}]`).',
      },
      {
        name: 'properties',
        type: 'string',
        required: false,
        description: 'Comma-separated list of properties to include.',
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: 'Number of results per page (max 100).',
      },
      {
        name: 'after',
        type: 'string',
        required: false,
        description: 'Pagination offset from previous response.',
      },
    ],
  },

  // ─── Meetings ─────────────────────────────────────────────────────────────────
  {
    name: 'hubspot_meeting_log',
    description:
      'Log a meeting engagement in HubSpot CRM. Records details of a meeting including title, start/end time, description, and outcome.',
    params: [
      {
        name: 'hs_meeting_title',
        type: 'string',
        required: true,
        description: 'A descriptive title for the meeting.',
      },
      {
        name: 'hs_meeting_start_time',
        type: 'string',
        required: true,
        description: 'Start time of the meeting in ISO 8601 format (e.g. `2024-01-15T14:00:00Z`).',
      },
      {
        name: 'hs_meeting_end_time',
        type: 'string',
        required: true,
        description: 'End time of the meeting in ISO 8601 format.',
      },
      {
        name: 'hs_timestamp',
        type: 'string',
        required: true,
        description: 'Timestamp when the meeting was logged in ISO 8601 format.',
      },
      {
        name: 'hs_meeting_body',
        type: 'string',
        required: false,
        description: 'Notes, agenda, or description of the meeting.',
      },
      {
        name: 'hs_meeting_outcome',
        type: 'string',
        required: false,
        description: 'Outcome of the meeting: `SCHEDULED`, `COMPLETED`, `NO_SHOW`, or `CANCELED`.',
      },
    ],
  },
  {
    name: 'hubspot_meetings_search',
    description:
      'Search HubSpot meeting engagements using filters and full-text search. Returns logged meetings with their properties.',
    params: [
      {
        name: 'query',
        type: 'string',
        required: false,
        description: 'Full-text search term across meeting titles and descriptions.',
      },
      {
        name: 'filterGroups',
        type: 'string',
        required: false,
        description:
          'JSON string containing filter groups (e.g. `[{"filters":[{"propertyName":"hs_meeting_outcome","operator":"EQ","value":"COMPLETED"}]}]`).',
      },
      {
        name: 'properties',
        type: 'string',
        required: false,
        description: 'Comma-separated list of properties to include.',
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: 'Number of results per page (max 100).',
      },
      {
        name: 'after',
        type: 'string',
        required: false,
        description: 'Pagination offset from previous response.',
      },
    ],
  },

  // ─── Calls ────────────────────────────────────────────────────────────────────
  {
    name: 'hubspot_call_log',
    description:
      'Log a call engagement in HubSpot CRM. Records details of a phone call including title, duration, notes, status, and direction.',
    params: [
      {
        name: 'hs_call_title',
        type: 'string',
        required: true,
        description: 'A descriptive title for the call.',
      },
      {
        name: 'hs_timestamp',
        type: 'string',
        required: true,
        description: 'Date and time when the call took place in ISO 8601 format.',
      },
      {
        name: 'hs_call_body',
        type: 'string',
        required: false,
        description: 'Notes or transcript from the call.',
      },
      {
        name: 'hs_call_direction',
        type: 'string',
        required: false,
        description: 'Direction of the call: `INBOUND` or `OUTBOUND`.',
      },
      {
        name: 'hs_call_duration',
        type: 'number',
        required: false,
        description: 'Duration of the call in milliseconds (e.g. `300000` = 5 minutes).',
      },
      {
        name: 'hs_call_status',
        type: 'string',
        required: false,
        description:
          'Outcome status: `COMPLETED`, `BUSY`, `FAILED`, `NO_ANSWER`, `CANCELED`, `QUEUED`, or `IN_PROGRESS`.',
      },
    ],
  },
  {
    name: 'hubspot_calls_search',
    description:
      'Search HubSpot call engagements using filters and full-text search. Returns logged calls with their properties.',
    params: [
      {
        name: 'query',
        type: 'string',
        required: false,
        description: 'Full-text search term across call titles, notes, and other text fields.',
      },
      {
        name: 'filterGroups',
        type: 'string',
        required: false,
        description:
          'JSON string containing filter groups (e.g. `[{"filters":[{"propertyName":"hs_call_status","operator":"EQ","value":"COMPLETED"}]}]`).',
      },
      {
        name: 'properties',
        type: 'string',
        required: false,
        description: 'Comma-separated list of properties to include.',
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: 'Number of results per page (max 100).',
      },
      {
        name: 'after',
        type: 'string',
        required: false,
        description: 'Pagination offset from previous response.',
      },
    ],
  },

  // ─── Notes ────────────────────────────────────────────────────────────────────
  {
    name: 'hubspot_note_create',
    description:
      'Create a note in HubSpot CRM to log interactions, meeting summaries, or important information. Notes can be associated with contacts, companies, or deals.',
    params: [
      {
        name: 'hs_note_body',
        type: 'string',
        required: true,
        description: 'Content of the note. Supports HTML.',
      },
      {
        name: 'hs_timestamp',
        type: 'string',
        required: true,
        description: 'Timestamp for the note in ISO 8601 format (e.g. `2024-01-15T10:30:00Z`).',
      },
    ],
  },
  {
    name: 'hubspot_note_log',
    description:
      'Log a note engagement in HubSpot CRM. Creates a text note that can be associated with contacts, companies, or deals.',
    params: [
      {
        name: 'hs_note_body',
        type: 'string',
        required: true,
        description: 'Content of the note. Supports HTML.',
      },
      {
        name: 'hs_timestamp',
        type: 'string',
        required: true,
        description: 'Timestamp for the note in ISO 8601 format (e.g. `2024-01-15T10:30:00Z`).',
      },
    ],
  },
  {
    name: 'hubspot_notes_search',
    description:
      'Search HubSpot note engagements using filters and full-text search. Returns logged notes with their content and timestamps.',
    params: [
      {
        name: 'query',
        type: 'string',
        required: false,
        description: 'Full-text search term across note body text.',
      },
      {
        name: 'filterGroups',
        type: 'string',
        required: false,
        description: 'JSON string containing filter groups for advanced filtering.',
      },
      {
        name: 'properties',
        type: 'string',
        required: false,
        description: 'Comma-separated list of properties to include.',
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: 'Number of results per page (max 100).',
      },
      {
        name: 'after',
        type: 'string',
        required: false,
        description: 'Pagination offset from previous response.',
      },
    ],
  },

  // ─── Emails ───────────────────────────────────────────────────────────────────
  {
    name: 'hubspot_emails_search',
    description:
      'Search HubSpot email engagements (logged emails) using filters and full-text search. Returns logged email records with their properties.',
    params: [
      {
        name: 'query',
        type: 'string',
        required: false,
        description: 'Full-text search term across email subject lines and body text.',
      },
      {
        name: 'filterGroups',
        type: 'string',
        required: false,
        description: 'JSON string containing filter groups for advanced filtering.',
      },
      {
        name: 'properties',
        type: 'string',
        required: false,
        description:
          'Comma-separated list of properties to include (e.g. `hs_email_subject,hs_email_text,hs_timestamp`).',
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: 'Number of results per page (max 100).',
      },
      {
        name: 'after',
        type: 'string',
        required: false,
        description: 'Pagination offset from previous response.',
      },
    ],
  },

  // ─── Engagements ──────────────────────────────────────────────────────────────
  {
    name: 'hubspot_engagements_list',
    description:
      'List engagements (notes, tasks, calls, emails, meetings) from HubSpot CRM. Supports filtering by engagement type and pagination.',
    params: [
      {
        name: 'engagement_type',
        type: 'string',
        required: true,
        description:
          'Type of engagement to list: `notes`, `tasks`, `calls`, `emails`, or `meetings`.',
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: 'Number of engagements to return per page (max 100).',
      },
      {
        name: 'after',
        type: 'string',
        required: false,
        description: 'Cursor from previous response to fetch next page.',
      },
    ],
  },

  // ─── Owners ───────────────────────────────────────────────────────────────────
  {
    name: 'hubspot_owners_list',
    description:
      'List all HubSpot owners (users). Use this to find owner IDs for assigning contacts, deals, tickets, and other CRM records.',
    params: [
      {
        name: 'email',
        type: 'string',
        required: false,
        description: 'Filter owners by email address.',
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: 'Number of owners to return per page (max 500).',
      },
      {
        name: 'after',
        type: 'string',
        required: false,
        description: 'Pagination cursor from previous response.',
      },
    ],
  },

  // ─── Associations ─────────────────────────────────────────────────────────────
  {
    name: 'hubspot_associations_batch_create',
    description:
      'Create associations between two HubSpot CRM object types in a single batch API call using the v4 associations API.',
    params: [
      {
        name: 'from_object_type',
        type: 'string',
        required: true,
        description:
          'Source object type: `contacts`, `companies`, `deals`, `tickets`, `line_items`, `products`.',
      },
      {
        name: 'to_object_type',
        type: 'string',
        required: true,
        description:
          'Target object type: `contacts`, `companies`, `deals`, `tickets`, `line_items`, `products`.',
      },
      {
        name: 'inputs',
        type: 'string',
        required: true,
        description:
          'JSON array of association objects in HubSpot v4 format. Each item has `_from` (with `id`), `to` (with `id`), and `types` (array with `associationCategory` and `associationTypeId`). Common type IDs: `279`=contact→company, `4`=contact→deal, `15`=contact→ticket, `3`=deal→contact, `5`=deal→company, `16`=ticket→contact. Example: `[{"_from":{"id":"101"},"to":{"id":"201"},"types":[{"associationCategory":"HUBSPOT_DEFINED","associationTypeId":279}]}]`',
      },
    ],
  },
  {
    name: 'hubspot_associations_batch_archive',
    description:
      'Remove associations between two HubSpot CRM object types in a single batch API call using the v4 associations API.',
    params: [
      {
        name: 'from_object_type',
        type: 'string',
        required: true,
        description:
          'Source object type: `contacts`, `companies`, `deals`, `tickets`, `line_items`, `products`.',
      },
      {
        name: 'to_object_type',
        type: 'string',
        required: true,
        description:
          'Target object type: `contacts`, `companies`, `deals`, `tickets`, `line_items`, `products`.',
      },
      {
        name: 'inputs',
        type: 'string',
        required: true,
        description:
          'JSON array of association pairs to remove. Each item has `_from` (with `id`) and `to` (with `id`). Example: `[{"_from":{"id":"101"},"to":{"id":"201"}}]`',
      },
    ],
  },
  {
    name: 'hubspot_association_create',
    description:
      'Create a default association between two HubSpot CRM objects. For example, associate a contact with a deal, or a company with a ticket.',
    params: [
      {
        name: 'from_object_type',
        type: 'string',
        required: true,
        description:
          'Type of the source object (e.g. `contacts`, `companies`, `deals`, `tickets`).',
      },
      {
        name: 'from_object_id',
        type: 'string',
        required: true,
        description: 'HubSpot ID of the source record.',
      },
      {
        name: 'to_object_type',
        type: 'string',
        required: true,
        description: 'Type of the target object (e.g. `contacts`, `deals`).',
      },
      {
        name: 'to_object_id',
        type: 'string',
        required: true,
        description: 'HubSpot ID of the target record.',
      },
    ],
  },

  // ─── Marketing ────────────────────────────────────────────────────────────────
  {
    name: 'hubspot_campaigns_list',
    description: 'List all HubSpot marketing campaigns with pagination support.',
    params: [
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: 'Number of campaigns to return per page (default: 20).',
      },
      {
        name: 'after',
        type: 'string',
        required: false,
        description: 'Pagination cursor from previous response.',
      },
    ],
  },
  {
    name: 'hubspot_campaign_get',
    description: 'Retrieve details of a specific HubSpot marketing campaign by campaign ID.',
    params: [
      {
        name: 'campaign_id',
        type: 'string',
        required: true,
        description: 'The unique identifier of the campaign in HubSpot.',
      },
    ],
  },
  {
    name: 'hubspot_forms_list',
    description:
      'List all HubSpot marketing forms. Returns form IDs, names, and field definitions.',
    params: [
      {
        name: 'formTypes',
        type: 'string',
        required: false,
        description:
          'Comma-separated list of form types to filter by (e.g. `hubspot`, `captured`, `flow`).',
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: 'Number of forms to return per page (max 50).',
      },
      {
        name: 'after',
        type: 'string',
        required: false,
        description: 'Pagination cursor from previous response.',
      },
    ],
  },
  {
    name: 'hubspot_form_submissions_get',
    description:
      'Retrieve all submissions for a specific HubSpot form. Returns submitted field values and submission timestamps.',
    params: [
      {
        name: 'form_id',
        type: 'string',
        required: true,
        description: 'The unique identifier of the HubSpot form. Get it from `hubspot_forms_list`.',
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: 'Number of submissions to return per page (default: 20).',
      },
      {
        name: 'after',
        type: 'string',
        required: false,
        description: 'Pagination offset token for the next page.',
      },
    ],
  },

  // ─── Products ─────────────────────────────────────────────────────────────────
  {
    name: 'hubspot_product_create',
    description: 'Create a new product in the HubSpot product library.',
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: 'The product name as it will appear in HubSpot.',
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: 'A description of the product or service.',
      },
      {
        name: 'hs_sku',
        type: 'string',
        required: false,
        description: 'Unique product SKU or identifier.',
      },
      {
        name: 'price',
        type: 'string',
        required: false,
        description: 'Unit price of the product (e.g. `999.00`).',
      },
    ],
  },
  {
    name: 'hubspot_products_list',
    description: 'Retrieve a list of products from the HubSpot product library.',
    params: [
      {
        name: 'properties',
        type: 'string',
        required: false,
        description:
          'Comma-separated list of product properties to include (e.g. `name,price,description`).',
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: 'Number of products to return per page (max 100).',
      },
      {
        name: 'after',
        type: 'string',
        required: false,
        description: 'Pagination cursor from previous response.',
      },
    ],
  },

  // ─── Line Items ───────────────────────────────────────────────────────────────
  {
    name: 'hubspot_line_items_batch_create',
    description:
      'Create multiple line items in HubSpot CRM in a single batch API call. Pass a JSON array of line item objects — each with a `properties` map and an optional `associations` array.',
    params: [
      {
        name: 'inputs',
        type: 'string',
        required: true,
        description:
          'JSON array of line item objects to create. Each item has a `properties` object and an optional `associations` array to link to a deal. Example: `[{"properties":{"name":"Enterprise License","quantity":"1","price":"999.00"},"associations":[{"to":{"id":"DEAL_ID"},"types":[{"associationCategory":"HUBSPOT_DEFINED","associationTypeId":20}]}]}]`',
      },
    ],
  },
  {
    name: 'hubspot_line_items_batch_update',
    description:
      'Update multiple line items in HubSpot CRM in a single batch API call. Pass a JSON array of objects — each with an `id` and a `properties` map.',
    params: [
      {
        name: 'inputs',
        type: 'string',
        required: true,
        description:
          'JSON array of line item update objects. Each item has an `id` (HubSpot record ID) and a `properties` object with fields to update. Example: `[{"id":"12345","properties":{"quantity":"5","price":"799.00"}}]`',
      },
    ],
  },
  {
    name: 'hubspot_line_items_batch_read',
    description:
      'Read multiple line item records from HubSpot CRM in a single batch API call. Pass a JSON array of record IDs.',
    params: [
      {
        name: 'inputs',
        type: 'string',
        required: true,
        description:
          'JSON array of line item record IDs to fetch. Each item has an `id` field. Example: `[{"id":"12345"},{"id":"67890"}]`',
      },
      {
        name: 'properties',
        type: 'string',
        required: false,
        description:
          'JSON array of property names to return (e.g. `["name","quantity","price"]`). Returns default properties if omitted.',
      },
    ],
  },
  {
    name: 'hubspot_line_items_batch_archive',
    description:
      'Archive multiple line items in HubSpot CRM in a single batch API call. Archived line items are removed from their associated deals.',
    params: [
      {
        name: 'inputs',
        type: 'string',
        required: true,
        description:
          'JSON array of line item record IDs to archive. Each item has an `id` field. Example: `[{"id":"12345"},{"id":"67890"}]`',
      },
    ],
  },
  {
    name: 'hubspot_line_item_create',
    description:
      'Create a new line item in HubSpot. Line items represent individual products or services in a deal.',
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: 'The name of the product or service for this line item.',
      },
      {
        name: 'hs_product_id',
        type: 'string',
        required: false,
        description: 'Link this line item to a product in the HubSpot product library.',
      },
      {
        name: 'price',
        type: 'string',
        required: false,
        description: 'The price per unit for this line item.',
      },
      {
        name: 'quantity',
        type: 'string',
        required: false,
        description: 'Number of units for this line item.',
      },
      {
        name: 'deal_id',
        type: 'string',
        required: false,
        description: 'The HubSpot deal ID to associate this line item with.',
      },
    ],
  },

  {
    name: 'hubspot_products_batch_read',
    description:
      'Read multiple product records from the HubSpot product library in a single batch API call. Pass a JSON array of record IDs.',
    params: [
      {
        name: 'inputs',
        type: 'string',
        required: true,
        description:
          'JSON array of product record IDs to fetch. Each item has an `id` field. Example: `[{"id":"12345"},{"id":"67890"}]`',
      },
      {
        name: 'properties',
        type: 'string',
        required: false,
        description:
          'JSON array of property names to return (e.g. `["name","price","hs_sku"]`). Returns default properties if omitted.',
      },
    ],
  },
  {
    name: 'hubspot_products_batch_archive',
    description:
      'Archive multiple products from the HubSpot product library in a single batch API call.',
    params: [
      {
        name: 'inputs',
        type: 'string',
        required: true,
        description:
          'JSON array of product record IDs to archive. Each item has an `id` field. Example: `[{"id":"12345"},{"id":"67890"}]`',
      },
    ],
  },

  // ─── Quotes ───────────────────────────────────────────────────────────────────
  {
    name: 'hubspot_quote_create',
    description: 'Create a new quote in HubSpot for a deal.',
    params: [
      {
        name: 'hs_title',
        type: 'string',
        required: true,
        description: 'The display title for the quote.',
      },
      {
        name: 'hs_language',
        type: 'string',
        required: true,
        description:
          'Language of the quote as an ISO 639-1 code (e.g. `en`, `de`, `fr`). Required by HubSpot.',
      },
      {
        name: 'deal_id',
        type: 'string',
        required: false,
        description: 'The HubSpot deal ID to link this quote to.',
      },
      {
        name: 'hs_expiration_date',
        type: 'string',
        required: false,
        description: 'Expiration date of the quote in `YYYY-MM-DD` format.',
      },
      {
        name: 'hs_status',
        type: 'string',
        required: false,
        description: 'Status of the quote: `DRAFT`, `PENDING_APPROVAL`, `APPROVED`, or `REJECTED`.',
      },
    ],
  },
  {
    name: 'hubspot_quote_get',
    description: 'Retrieve a specific HubSpot quote by its ID.',
    params: [
      {
        name: 'quote_id',
        type: 'string',
        required: true,
        description: 'The HubSpot ID of the quote.',
      },
      {
        name: 'properties',
        type: 'string',
        required: false,
        description:
          'Comma-separated list of quote properties to include (e.g. `hs_title,hs_status,hs_expiration_date`).',
      },
    ],
  },

  // ─── Custom Objects ───────────────────────────────────────────────────────────
  {
    name: 'hubspot_schemas_list',
    description:
      'List all custom object schemas defined in HubSpot. Returns object type IDs, labels, and property definitions needed to work with custom objects.',
    params: [
      {
        name: 'archived',
        type: 'boolean',
        required: false,
        description: 'Set to `true` to include archived custom object schemas.',
      },
    ],
  },
  {
    name: 'hubspot_custom_object_record_create',
    description: 'Create a new record for a HubSpot custom object type.',
    params: [
      {
        name: 'object_type_id',
        type: 'string',
        required: true,
        description:
          'The custom object type ID (e.g. `2-1234567`). Get it from `hubspot_schemas_list`.',
      },
      {
        name: 'properties',
        type: 'object',
        required: true,
        description:
          'Key-value pairs for the new record (e.g. `{"name": "Example Record"}`). Use `hubspot_schemas_list` to discover valid property names.',
      },
    ],
  },
  {
    name: 'hubspot_custom_object_record_get',
    description:
      'Retrieve a specific record of a HubSpot custom object by object type ID and record ID.',
    params: [
      {
        name: 'object_type_id',
        type: 'string',
        required: true,
        description: 'The custom object type ID (e.g. `2-1234567`).',
      },
      {
        name: 'record_id',
        type: 'string',
        required: true,
        description: 'The HubSpot ID of the specific record.',
      },
      {
        name: 'properties',
        type: 'string',
        required: false,
        description: 'Comma-separated list of properties to return.',
      },
    ],
  },
  {
    name: 'hubspot_custom_object_record_update',
    description:
      'Update an existing record of a HubSpot custom object by object type ID and record ID. Use hubspot_schemas_list to discover available object type IDs and their properties.',
    params: [
      {
        name: 'object_type_id',
        type: 'string',
        required: true,
        description:
          'The custom object type ID (e.g. `2-1234567`). Get it from `hubspot_schemas_list`.',
      },
      {
        name: 'record_id',
        type: 'string',
        required: true,
        description:
          'The HubSpot ID of the record to update. Get it from `hubspot_custom_object_records_search`.',
      },
      {
        name: 'properties',
        type: 'object',
        required: true,
        description:
          'JSON object of property names and updated values (e.g. `{"name": "Updated Name", "status": "active"}`). Use `hubspot_schemas_list` to discover valid property names.',
      },
    ],
  },
  {
    name: 'hubspot_custom_object_records_search',
    description:
      'Search records of a HubSpot custom object by object type ID. Use `hubspot_schemas_list` to find the objectTypeId for your custom object.',
    params: [
      {
        name: 'object_type_id',
        type: 'string',
        required: true,
        description: 'The custom object type ID (e.g. `2-1234567`).',
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: 'Full-text search term across record properties.',
      },
      {
        name: 'filterGroups',
        type: 'string',
        required: false,
        description: 'JSON string containing filter groups for advanced filtering.',
      },
      {
        name: 'properties',
        type: 'string',
        required: false,
        description: 'Comma-separated list of properties to include.',
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: 'Number of results per page (max 100).',
      },
      {
        name: 'after',
        type: 'string',
        required: false,
        description: 'Pagination offset from previous response.',
      },
    ],
  },

  // ─── Properties ───────────────────────────────────────────────────────────────
  {
    name: 'hubspot_object_properties_list',
    description:
      'Retrieve all properties defined for a HubSpot CRM object type (contacts, companies, deals, tickets, etc.).',
    params: [
      {
        name: 'object_type',
        type: 'string',
        required: true,
        description:
          'CRM object type to list properties for (e.g. `contacts`, `companies`, `deals`, `tickets`, `products`, or a custom object type ID).',
      },
      {
        name: 'archived',
        type: 'boolean',
        required: false,
        description: 'Set to `true` to include archived properties.',
      },
    ],
  },
]
