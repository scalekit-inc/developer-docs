import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'hubspot_association_create',
    description: `Create a default association between two HubSpot CRM objects. For example, associate a contact with a deal, or a company with a ticket.`,
    params: [
      { name: 'from_object_id', type: 'string', required: true, description: `ID of the source object` },
      { name: 'from_object_type', type: 'string', required: true, description: `Type of the source object (e.g. contacts, companies, deals, tickets)` },
      { name: 'to_object_id', type: 'string', required: true, description: `ID of the target object` },
      { name: 'to_object_type', type: 'string', required: true, description: `Type of the target object (e.g. contacts, companies, deals, tickets)` },
    ],
  },
  {
    name: 'hubspot_call_log',
    description: `Log a call engagement in HubSpot CRM. Records details of a phone call including title, duration, notes, status, and direction.`,
    params: [
      { name: 'hs_call_title', type: 'string', required: true, description: `Title or subject of the call` },
      { name: 'hs_timestamp', type: 'string', required: true, description: `Date and time when the call took place (ISO 8601 format)` },
      { name: 'hs_call_body', type: 'string', required: false, description: `Notes or transcript from the call` },
      { name: 'hs_call_direction', type: 'string', required: false, description: `Direction of the call` },
      { name: 'hs_call_duration', type: 'number', required: false, description: `Duration of the call in milliseconds` },
      { name: 'hs_call_status', type: 'string', required: false, description: `Outcome status of the call` },
    ],
  },
  {
    name: 'hubspot_calls_search',
    description: `Search HubSpot call engagements using filters and full-text search. Returns logged calls with their properties.`,
    params: [
      { name: 'after', type: 'string', required: false, description: `Pagination offset to get results starting from a specific position` },
      { name: 'filterGroups', type: 'string', required: false, description: `JSON string containing filter groups for advanced filtering` },
      { name: 'limit', type: 'number', required: false, description: `Number of results to return per page (max 100)` },
      { name: 'properties', type: 'string', required: false, description: `Comma-separated list of properties to include in the response` },
      { name: 'query', type: 'string', required: false, description: `Full-text search term across call properties` },
    ],
  },
  {
    name: 'hubspot_campaign_get',
    description: `Retrieve details of a specific HubSpot marketing campaign by campaign ID.`,
    params: [
      { name: 'campaign_id', type: 'string', required: true, description: `ID of the campaign to retrieve` },
    ],
  },
  {
    name: 'hubspot_campaigns_list',
    description: `List all HubSpot marketing campaigns with pagination support.`,
    params: [
      { name: 'after', type: 'string', required: false, description: `Pagination cursor for the next page of results` },
      { name: 'limit', type: 'number', required: false, description: `Number of campaigns to return per page` },
    ],
  },
  {
    name: 'hubspot_companies_search',
    description: `Search HubSpot companies using full-text search and pagination. Returns matching companies with specified properties.`,
    params: [
      { name: 'after', type: 'string', required: false, description: `Pagination offset to get results starting from a specific position` },
      { name: 'filterGroups', type: 'string', required: false, description: `JSON string containing filter groups for advanced filtering` },
      { name: 'limit', type: 'number', required: false, description: `Number of results to return per page (max 100)` },
      { name: 'properties', type: 'string', required: false, description: `Comma-separated list of properties to include in the response` },
      { name: 'query', type: 'string', required: false, description: `Search term for full-text search across company properties` },
    ],
  },
  {
    name: 'hubspot_company_create',
    description: `Create a new company in HubSpot CRM. Requires a company name as the unique identifier. Supports additional properties like domain, industry, phone, location, and revenue information.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Company name (required, serves as primary identifier)` },
      { name: 'annualrevenue', type: 'number', required: false, description: `Annual revenue of the company` },
      { name: 'city', type: 'string', required: false, description: `Company city location` },
      { name: 'country', type: 'string', required: false, description: `Company country location` },
      { name: 'description', type: 'string', required: false, description: `Company description or overview` },
      { name: 'domain', type: 'string', required: false, description: `Company website domain` },
      { name: 'industry', type: 'string', required: false, description: `Industry type of the company` },
      { name: 'numberofemployees', type: 'number', required: false, description: `Number of employees at the company` },
      { name: 'phone', type: 'string', required: false, description: `Company phone number` },
      { name: 'state', type: 'string', required: false, description: `Company state or region` },
    ],
  },
  {
    name: 'hubspot_company_get',
    description: `Retrieve details of a specific company from HubSpot by company ID. Returns company properties and associated data.`,
    params: [
      { name: 'company_id', type: 'string', required: true, description: `ID of the company to retrieve` },
      { name: 'properties', type: 'string', required: false, description: `Comma-separated list of properties to include in the response` },
    ],
  },
  {
    name: 'hubspot_company_update',
    description: `Update an existing company in HubSpot CRM by company ID. Provide any fields to update.`,
    params: [
      { name: 'company_id', type: 'string', required: true, description: `ID of the company to update` },
      { name: 'annualrevenue', type: 'string', required: false, description: `Annual revenue of the company` },
      { name: 'city', type: 'string', required: false, description: `City where the company is located` },
      { name: 'country', type: 'string', required: false, description: `Country where the company is located` },
      { name: 'description', type: 'string', required: false, description: `Description of the company` },
      { name: 'domain', type: 'string', required: false, description: `Company website domain` },
      { name: 'industry', type: 'string', required: false, description: `Industry the company operates in` },
      { name: 'name', type: 'string', required: false, description: `Name of the company` },
      { name: 'numberofemployees', type: 'number', required: false, description: `Number of employees at the company` },
      { name: 'phone', type: 'string', required: false, description: `Company phone number` },
      { name: 'state', type: 'string', required: false, description: `State or region where the company is located` },
      { name: 'website', type: 'string', required: false, description: `Company website URL` },
    ],
  },
  {
    name: 'hubspot_contact_create',
    description: `Create a new contact in HubSpot CRM. Requires an email address as the unique identifier. Supports additional properties like name, company, phone, and lifecycle stage.`,
    params: [
      { name: 'email', type: 'string', required: true, description: `Primary email address for the contact (required, serves as unique identifier)` },
      { name: 'company', type: 'string', required: false, description: `Company name where the contact works` },
      { name: 'firstname', type: 'string', required: false, description: `First name of the contact` },
      { name: 'hs_lead_status', type: 'string', required: false, description: `Lead status of the contact` },
      { name: 'jobtitle', type: 'string', required: false, description: `Job title of the contact` },
      { name: 'lastname', type: 'string', required: false, description: `Last name of the contact` },
      { name: 'lifecyclestage', type: 'string', required: false, description: `Lifecycle stage of the contact` },
      { name: 'phone', type: 'string', required: false, description: `Phone number of the contact` },
      { name: 'website', type: 'string', required: false, description: `Personal or company website URL` },
    ],
  },
  {
    name: 'hubspot_contact_email_events_get',
    description: `Retrieve marketing email events for a specific contact by their email address. Returns open, click, bounce, and unsubscribe events.`,
    params: [
      { name: 'email', type: 'string', required: true, description: `Email address of the contact to retrieve events for` },
      { name: 'eventType', type: 'string', required: false, description: `Filter by event type (e.g., OPEN, CLICK, BOUNCE, UNSUBSCRIBE)` },
      { name: 'limit', type: 'number', required: false, description: `Number of events to return per page` },
    ],
  },
  {
    name: 'hubspot_contact_get',
    description: `Retrieve details of a specific contact from HubSpot by contact ID. Returns contact properties and associated data.`,
    params: [
      { name: 'contact_id', type: 'string', required: true, description: `ID of the contact to retrieve` },
      { name: 'properties', type: 'string', required: false, description: `Comma-separated list of properties to include in the response` },
    ],
  },
  {
    name: 'hubspot_contact_list_membership_get',
    description: `Retrieve all HubSpot lists that a specific contact belongs to, identified by contact ID.`,
    params: [
      { name: 'contact_id', type: 'string', required: true, description: `ID of the contact to retrieve list memberships for` },
    ],
  },
  {
    name: 'hubspot_contact_update',
    description: `Update an existing contact in HubSpot CRM by contact ID. Provide any fields to update.`,
    params: [
      { name: 'contact_id', type: 'string', required: true, description: `ID of the contact to update` },
      { name: 'company', type: 'string', required: false, description: `Company name where the contact works` },
      { name: 'email', type: 'string', required: false, description: `Primary email address of the contact` },
      { name: 'firstname', type: 'string', required: false, description: `First name of the contact` },
      { name: 'hs_lead_status', type: 'string', required: false, description: `Lead status of the contact` },
      { name: 'jobtitle', type: 'string', required: false, description: `Job title of the contact` },
      { name: 'lastname', type: 'string', required: false, description: `Last name of the contact` },
      { name: 'lifecyclestage', type: 'string', required: false, description: `Lifecycle stage of the contact` },
      { name: 'phone', type: 'string', required: false, description: `Phone number of the contact` },
      { name: 'website', type: 'string', required: false, description: `Website URL of the contact` },
    ],
  },
  {
    name: 'hubspot_contacts_batch_create',
    description: `Create multiple contacts in HubSpot CRM in a single API call. Each contact requires an email address. Supports up to 100 contacts per request.`,
    params: [
      { name: 'contacts', type: 'array', required: true, description: `Array of contact objects to create. Each contact requires an email address.` },
    ],
  },
  {
    name: 'hubspot_contacts_list',
    description: `Retrieve a list of contacts from HubSpot with filtering and pagination. Returns contact properties and supports pagination through cursor-based navigation.`,
    params: [
      { name: 'after', type: 'string', required: false, description: `Pagination cursor to get the next set of results` },
      { name: 'archived', type: 'boolean', required: false, description: `Whether to include archived contacts in the results` },
      { name: 'limit', type: 'number', required: false, description: `Number of results to return per page (max 100)` },
      { name: 'properties', type: 'string', required: false, description: `Comma-separated list of properties to include in the response` },
    ],
  },
  {
    name: 'hubspot_contacts_search',
    description: `Search HubSpot contacts using full-text search and pagination. Returns matching contacts with specified properties.`,
    params: [
      { name: 'after', type: 'string', required: false, description: `Pagination offset to get results starting from a specific position` },
      { name: 'filterGroups', type: 'string', required: false, description: `JSON string containing filter groups for advanced filtering` },
      { name: 'limit', type: 'number', required: false, description: `Number of results to return per page (max 100)` },
      { name: 'properties', type: 'string', required: false, description: `Comma-separated list of properties to include in the response` },
      { name: 'query', type: 'string', required: false, description: `Search term for full-text search across contact properties` },
    ],
  },
  {
    name: 'hubspot_custom_object_record_create',
    description: `Create a new record for a HubSpot custom object type.`,
    params: [
      { name: 'object_type_id', type: 'string', required: true, description: `The object type ID of the custom object (e.g., 2-1234567)` },
      { name: 'properties', type: 'string', required: true, description: `JSON object containing the properties for the new record` },
    ],
  },
  {
    name: 'hubspot_custom_object_record_get',
    description: `Retrieve a specific record of a HubSpot custom object by object type ID and record ID.`,
    params: [
      { name: 'object_type_id', type: 'string', required: true, description: `The object type ID of the custom object (e.g., 2-1234567)` },
      { name: 'record_id', type: 'string', required: true, description: `ID of the record to retrieve` },
      { name: 'properties', type: 'string', required: false, description: `Comma-separated list of properties to include in the response` },
    ],
  },
  {
    name: 'hubspot_custom_object_record_update',
    description: `Update an existing record of a HubSpot custom object by object type ID and record ID. Use hubspot_schemas_list to discover available object type IDs and their properties.`,
    params: [
      { name: 'object_type_id', type: 'string', required: true, description: `The object type ID of the custom object (e.g., 2-1234567)` },
      { name: 'properties', type: 'object', required: true, description: `Key-value pairs of custom object properties to update` },
      { name: 'record_id', type: 'string', required: true, description: `ID of the record to update` },
    ],
  },
  {
    name: 'hubspot_custom_object_records_search',
    description: `Search records of a HubSpot custom object by object type ID. Use hubspot_schemas_list to find the objectTypeId for your custom object.`,
    params: [
      { name: 'object_type_id', type: 'string', required: true, description: `The object type ID of the custom object (e.g., 2-1234567)` },
      { name: 'after', type: 'string', required: false, description: `Pagination offset to get results starting from a specific position` },
      { name: 'filterGroups', type: 'string', required: false, description: `JSON string containing filter groups for advanced filtering` },
      { name: 'limit', type: 'number', required: false, description: `Number of results to return per page (max 100)` },
      { name: 'properties', type: 'string', required: false, description: `Comma-separated list of properties to include in the response` },
      { name: 'query', type: 'string', required: false, description: `Full-text search term across record properties` },
    ],
  },
  {
    name: 'hubspot_deal_create',
    description: `Create a new deal in HubSpot CRM. Requires dealname and dealstage. Supports additional properties like amount, pipeline, close date, and deal type.`,
    params: [
      { name: 'dealname', type: 'string', required: true, description: `Name of the deal (required)` },
      { name: 'dealstage', type: 'string', required: true, description: `Current stage of the deal (required)` },
      { name: 'amount', type: 'number', required: false, description: `Deal amount/value` },
      { name: 'closedate', type: 'string', required: false, description: `Expected close date (YYYY-MM-DD format)` },
      { name: 'dealtype', type: 'string', required: false, description: `Type of deal` },
      { name: 'description', type: 'string', required: false, description: `Deal description` },
      { name: 'hs_priority', type: 'string', required: false, description: `Deal priority (high, medium, low)` },
      { name: 'pipeline', type: 'string', required: false, description: `Deal pipeline` },
    ],
  },
  {
    name: 'hubspot_deal_get',
    description: `Retrieve details of a specific deal from HubSpot by deal ID. Returns deal properties and associated data.`,
    params: [
      { name: 'deal_id', type: 'string', required: true, description: `ID of the deal to retrieve` },
      { name: 'associations', type: 'string', required: false, description: `Comma-separated list of object types to retrieve associations for` },
      { name: 'properties', type: 'string', required: false, description: `Comma-separated list of properties to include in the response` },
    ],
  },
  {
    name: 'hubspot_deal_line_items_get',
    description: `Retrieve all line items associated with a specific HubSpot deal.`,
    params: [
      { name: 'deal_id', type: 'string', required: true, description: `ID of the deal to retrieve line items for` },
    ],
  },
  {
    name: 'hubspot_deal_pipelines_list',
    description: `Retrieve all deal pipelines in HubSpot, including pipeline stages. Use this to get valid pipeline IDs and stage IDs for creating or updating deals.`,
    params: [
      { name: 'archived', type: 'string', required: false, description: `Include archived pipelines in the response` },
    ],
  },
  {
    name: 'hubspot_deal_update',
    description: `Update an existing deal in HubSpot CRM by deal ID. Provide any fields to update.`,
    params: [
      { name: 'deal_id', type: 'string', required: true, description: `ID of the deal to update` },
      { name: 'amount', type: 'number', required: false, description: `Updated deal amount/value` },
      { name: 'closedate', type: 'string', required: false, description: `Updated expected close date (YYYY-MM-DD format)` },
      { name: 'dealname', type: 'string', required: false, description: `Updated name of the deal` },
      { name: 'dealstage', type: 'string', required: false, description: `Updated stage of the deal` },
      { name: 'dealtype', type: 'string', required: false, description: `Updated type of deal` },
      { name: 'description', type: 'string', required: false, description: `Updated deal description` },
      { name: 'hs_priority', type: 'string', required: false, description: `Updated deal priority` },
      { name: 'pipeline', type: 'string', required: false, description: `Updated deal pipeline` },
    ],
  },
  {
    name: 'hubspot_deals_search',
    description: `Search HubSpot deals using full-text search and pagination. Returns matching deals with specified properties.`,
    params: [
      { name: 'after', type: 'string', required: false, description: `Pagination offset to get results starting from a specific position` },
      { name: 'filterGroups', type: 'string', required: false, description: `JSON string containing filter groups for advanced filtering` },
      { name: 'limit', type: 'number', required: false, description: `Number of results to return per page (max 100)` },
      { name: 'properties', type: 'string', required: false, description: `Comma-separated list of properties to include in the response` },
      { name: 'query', type: 'string', required: false, description: `Search term for full-text search across deal properties` },
    ],
  },
  {
    name: 'hubspot_emails_search',
    description: `Search HubSpot email engagements (logged emails) using filters and full-text search. Returns logged email records with their properties.`,
    params: [
      { name: 'after', type: 'string', required: false, description: `Pagination offset to get results starting from a specific position` },
      { name: 'filterGroups', type: 'string', required: false, description: `JSON string containing filter groups for advanced filtering` },
      { name: 'limit', type: 'number', required: false, description: `Number of results to return per page (max 100)` },
      { name: 'properties', type: 'string', required: false, description: `Comma-separated list of properties to include in the response` },
      { name: 'query', type: 'string', required: false, description: `Full-text search term across email properties` },
    ],
  },
  {
    name: 'hubspot_engagements_list',
    description: `List engagements (notes, tasks, calls, emails, meetings) from HubSpot CRM. Supports filtering by engagement type and pagination.`,
    params: [
      { name: 'engagement_type', type: 'string', required: true, description: `Type of engagement to list` },
      { name: 'after', type: 'string', required: false, description: `Pagination cursor to get the next page of results` },
      { name: 'limit', type: 'integer', required: false, description: `Number of results to return (max 100)` },
    ],
  },
  {
    name: 'hubspot_form_submissions_get',
    description: `Retrieve all submissions for a specific HubSpot form. Returns submitted field values and submission timestamps.`,
    params: [
      { name: 'form_id', type: 'string', required: true, description: `ID of the form to retrieve submissions for` },
      { name: 'after', type: 'string', required: false, description: `Pagination offset token for the next page` },
      { name: 'limit', type: 'number', required: false, description: `Number of submissions to return per page` },
    ],
  },
  {
    name: 'hubspot_forms_list',
    description: `List all HubSpot marketing forms. Returns form IDs, names, and field definitions.`,
    params: [
      { name: 'after', type: 'string', required: false, description: `Pagination cursor for the next page of results` },
      { name: 'formTypes', type: 'string', required: false, description: `Comma-separated list of form types to filter by (e.g., hubspot,captured,flow)` },
      { name: 'limit', type: 'number', required: false, description: `Number of forms to return per page (max 50)` },
    ],
  },
  {
    name: 'hubspot_line_item_create',
    description: `Create a new line item in HubSpot. Line items represent individual products or services in a deal.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name of the line item` },
      { name: 'deal_id', type: 'string', required: false, description: `ID of the deal to associate this line item with` },
      { name: 'hs_product_id', type: 'string', required: false, description: `ID of the associated product from HubSpot product library` },
      { name: 'price', type: 'string', required: false, description: `Unit price of the line item` },
      { name: 'quantity', type: 'string', required: false, description: `Quantity of the line item` },
    ],
  },
  {
    name: 'hubspot_meeting_log',
    description: `Log a meeting engagement in HubSpot CRM. Records details of a meeting including title, start/end time, description, and outcome.`,
    params: [
      { name: 'hs_meeting_end_time', type: 'string', required: true, description: `End time of the meeting (ISO 8601 format)` },
      { name: 'hs_meeting_start_time', type: 'string', required: true, description: `Start time of the meeting (ISO 8601 format)` },
      { name: 'hs_meeting_title', type: 'string', required: true, description: `Title of the meeting` },
      { name: 'hs_timestamp', type: 'string', required: true, description: `Timestamp for the meeting (ISO 8601 format)` },
      { name: 'hs_meeting_body', type: 'string', required: false, description: `Description or agenda for the meeting` },
      { name: 'hs_meeting_outcome', type: 'string', required: false, description: `Outcome of the meeting` },
    ],
  },
  {
    name: 'hubspot_meetings_search',
    description: `Search HubSpot meeting engagements using filters and full-text search. Returns logged meetings with their properties.`,
    params: [
      { name: 'after', type: 'string', required: false, description: `Pagination offset to get results starting from a specific position` },
      { name: 'filterGroups', type: 'string', required: false, description: `JSON string containing filter groups for advanced filtering` },
      { name: 'limit', type: 'number', required: false, description: `Number of results to return per page (max 100)` },
      { name: 'properties', type: 'string', required: false, description: `Comma-separated list of properties to include in the response` },
      { name: 'query', type: 'string', required: false, description: `Full-text search term across meeting properties` },
    ],
  },
  {
    name: 'hubspot_note_create',
    description: `Create a note in HubSpot CRM to log interactions, meeting summaries, or important information. Notes can be associated with contacts, companies, or deals.`,
    params: [
      { name: 'props', type: 'object', required: true, description: `Note properties. hs_note_body (required) is the note content. hs_timestamp (required) is Unix ms timestamp e.g. 1700000000000.` },
    ],
  },
  {
    name: 'hubspot_note_log',
    description: `Log a note engagement in HubSpot CRM. Creates a text note that can be associated with contacts, companies, or deals.`,
    params: [
      { name: 'hs_note_body', type: 'string', required: true, description: `Content of the note` },
      { name: 'hs_timestamp', type: 'string', required: true, description: `Timestamp for the note (ISO 8601 format)` },
    ],
  },
  {
    name: 'hubspot_notes_search',
    description: `Search HubSpot note engagements using filters and full-text search. Returns logged notes with their content and timestamps.`,
    params: [
      { name: 'after', type: 'string', required: false, description: `Pagination offset to get results starting from a specific position` },
      { name: 'filterGroups', type: 'string', required: false, description: `JSON string containing filter groups for advanced filtering` },
      { name: 'limit', type: 'number', required: false, description: `Number of results to return per page (max 100)` },
      { name: 'properties', type: 'string', required: false, description: `Comma-separated list of properties to include in the response` },
      { name: 'query', type: 'string', required: false, description: `Full-text search term across note content` },
    ],
  },
  {
    name: 'hubspot_object_properties_list',
    description: `Retrieve all properties defined for a HubSpot CRM object type (contacts, companies, deals, tickets, etc.).`,
    params: [
      { name: 'object_type', type: 'string', required: true, description: `The CRM object type to list properties for` },
      { name: 'archived', type: 'string', required: false, description: `Include archived properties in the response` },
    ],
  },
  {
    name: 'hubspot_owners_list',
    description: `List all HubSpot owners (users). Use this to find owner IDs for assigning contacts, deals, tickets, and other CRM records.`,
    params: [
      { name: 'after', type: 'string', required: false, description: `Pagination cursor for the next page of results` },
      { name: 'email', type: 'string', required: false, description: `Filter owners by email address` },
      { name: 'limit', type: 'number', required: false, description: `Number of owners to return per page (max 500)` },
    ],
  },
  {
    name: 'hubspot_product_create',
    description: `Create a new product in the HubSpot product library.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name of the product` },
      { name: 'description', type: 'string', required: false, description: `Description of the product` },
      { name: 'hs_sku', type: 'string', required: false, description: `Stock keeping unit (SKU) identifier for the product` },
      { name: 'price', type: 'string', required: false, description: `Price of the product` },
    ],
  },
  {
    name: 'hubspot_products_list',
    description: `Retrieve a list of products from the HubSpot product library.`,
    params: [
      { name: 'after', type: 'string', required: false, description: `Pagination cursor for the next page of results` },
      { name: 'limit', type: 'number', required: false, description: `Number of products to return per page (max 100)` },
      { name: 'properties', type: 'string', required: false, description: `Comma-separated list of product properties to include in response` },
    ],
  },
  {
    name: 'hubspot_quote_create',
    description: `Create a new quote in HubSpot for a deal.`,
    params: [
      { name: 'hs_language', type: 'string', required: true, description: `Language of the quote (ISO 639-1 code, e.g. en, de, fr, es)` },
      { name: 'hs_title', type: 'string', required: true, description: `Title of the quote` },
      { name: 'deal_id', type: 'string', required: false, description: `ID of the deal to associate this quote with` },
      { name: 'hs_expiration_date', type: 'string', required: false, description: `Expiration date of the quote (YYYY-MM-DD format)` },
      { name: 'hs_status', type: 'string', required: false, description: `Status of the quote (DRAFT, PENDING_APPROVAL, APPROVED, REJECTED)` },
    ],
  },
  {
    name: 'hubspot_quote_get',
    description: `Retrieve a specific HubSpot quote by its ID.`,
    params: [
      { name: 'quote_id', type: 'string', required: true, description: `ID of the quote to retrieve` },
      { name: 'properties', type: 'string', required: false, description: `Comma-separated list of quote properties to include in response` },
    ],
  },
  {
    name: 'hubspot_schemas_list',
    description: `List all custom object schemas defined in HubSpot. Returns object type IDs, labels, and property definitions needed to work with custom objects.`,
    params: [
      { name: 'archived', type: 'string', required: false, description: `Include archived schemas in the response` },
    ],
  },
  {
    name: 'hubspot_task_complete',
    description: `Mark a HubSpot task as completed or update its status. Use the task ID from hubspot_tasks_search or hubspot_task_create.`,
    params: [
      { name: 'task_id', type: 'string', required: true, description: `ID of the task to update` },
      { name: 'hs_task_body', type: 'string', required: false, description: `Updated notes for the task` },
      { name: 'hs_task_status', type: 'string', required: false, description: `New status to set for the task` },
    ],
  },
  {
    name: 'hubspot_task_create',
    description: `Create a new task in HubSpot CRM. Tasks can be assigned to owners and associated with contacts, companies, or deals.`,
    params: [
      { name: 'hs_task_subject', type: 'string', required: true, description: `Subject or title of the task` },
      { name: 'hs_timestamp', type: 'string', required: true, description: `Due date and time for the task (ISO 8601 format)` },
      { name: 'hs_task_body', type: 'string', required: false, description: `Notes or description for the task` },
      { name: 'hs_task_priority', type: 'string', required: false, description: `Priority level of the task` },
      { name: 'hs_task_status', type: 'string', required: false, description: `Status of the task` },
      { name: 'hs_task_type', type: 'string', required: false, description: `Type of task` },
    ],
  },
  {
    name: 'hubspot_tasks_search',
    description: `Search HubSpot tasks using filters and full-text search. Returns tasks with their subject, status, due date, and priority.`,
    params: [
      { name: 'after', type: 'string', required: false, description: `Pagination offset to get results starting from a specific position` },
      { name: 'filterGroups', type: 'string', required: false, description: `JSON string containing filter groups for advanced filtering` },
      { name: 'limit', type: 'number', required: false, description: `Number of results to return per page (max 100)` },
      { name: 'properties', type: 'string', required: false, description: `Comma-separated list of properties to include in the response` },
      { name: 'query', type: 'string', required: false, description: `Full-text search term across task properties` },
    ],
  },
  {
    name: 'hubspot_ticket_create',
    description: `Create a new support ticket in HubSpot. Use hubspot_deal_pipelines_list with object type 'tickets' to find valid pipeline and stage IDs.`,
    params: [
      { name: 'hs_pipeline_stage', type: 'string', required: true, description: `Pipeline stage ID for the ticket` },
      { name: 'subject', type: 'string', required: true, description: `Subject of the ticket` },
      { name: 'content', type: 'string', required: false, description: `Detailed description of the support issue` },
      { name: 'hs_pipeline', type: 'string', required: false, description: `Pipeline ID for the ticket (defaults to '0' for the default pipeline)` },
      { name: 'hs_ticket_priority', type: 'string', required: false, description: `Priority level of the ticket` },
    ],
  },
  {
    name: 'hubspot_ticket_get',
    description: `Retrieve details of a specific HubSpot support ticket by ticket ID.`,
    params: [
      { name: 'ticket_id', type: 'string', required: true, description: `ID of the ticket to retrieve` },
      { name: 'properties', type: 'string', required: false, description: `Comma-separated list of properties to include in the response` },
    ],
  },
  {
    name: 'hubspot_ticket_update',
    description: `Update an existing HubSpot support ticket by ticket ID. Provide any fields to update.`,
    params: [
      { name: 'ticket_id', type: 'string', required: true, description: `ID of the ticket to update` },
      { name: 'content', type: 'string', required: false, description: `Updated description of the support issue` },
      { name: 'hs_pipeline', type: 'string', required: false, description: `Updated pipeline ID for the ticket` },
      { name: 'hs_pipeline_stage', type: 'string', required: false, description: `Updated pipeline stage ID for the ticket` },
      { name: 'hs_ticket_priority', type: 'string', required: false, description: `Updated priority level of the ticket` },
      { name: 'subject', type: 'string', required: false, description: `Updated subject of the ticket` },
    ],
  },
  {
    name: 'hubspot_tickets_search',
    description: `Search HubSpot support tickets using filters and full-text search. Returns matching tickets with their properties.`,
    params: [
      { name: 'after', type: 'string', required: false, description: `Pagination offset to get results starting from a specific position` },
      { name: 'filterGroups', type: 'string', required: false, description: `JSON string containing filter groups for advanced filtering` },
      { name: 'limit', type: 'number', required: false, description: `Number of results to return per page (max 100)` },
      { name: 'properties', type: 'string', required: false, description: `Comma-separated list of properties to include in the response` },
      { name: 'query', type: 'string', required: false, description: `Full-text search term across ticket properties` },
    ],
  },
]
