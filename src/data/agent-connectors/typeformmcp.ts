import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'typeformmcp_accounts_list_accounts',
    description: `Lists all accounts the authenticated user is a member of.`,
    params: [
    ],
  },
  {
    name: 'typeformmcp_contacts_public_bulk_create_contacts_lists',
    description: `Create one or more contacts lists (segments) in the Contacts database in a single call.

Always use this tool to create contacts lists, even when creating just one — pass a single-element \`lists\` array.

## Use cases
- Create one or several segments to organize contacts
- Create lists with custom filter, sort, or table column settings

## Inputs
- lists (required): An array of list definitions. Each item contains:
  - name (required): The list's name (max 255 characters)
  - settings (required, nullable): Filter, sort, and table column configuration. Pass null for a list with no filters.
- Maximum 100 lists per call.

## Output format
Confirm the created lists to the user, including each list's name and ID.
`,
    params: [
      { name: 'account_id', type: 'string', required: true, description: `The ID of the Organization` },
      { name: 'lists', type: 'array', required: true, description: `Array of list definitions to create. Always pass an array, even for a single list.` },
    ],
  },
  {
    name: 'typeformmcp_contacts_public_bulk_create_custom_contacts_database_properties',
    description: `Create multiple custom properties on the user's Contacts database schema in a single operation.

Use this tool when you need to create several custom fields at once, for example when setting up form-to-contact mappings that require multiple new properties.

## What this tool does
- Creates multiple new custom properties in one call, available on all contacts.

## What this tool cannot do
- Create standard Typeform contact properties (Bio, Company, Job Title, etc.).
  To activate disabled standard properties, use the
  enable_standard_contacts_database_properties tool instead.

## Inputs
- properties: An array of property definitions, each containing:
  - name: The name for the new property (must be unique).
  - type: The property type. The type is permanent and cannot be changed after creation.
    - long_text: General text (default)
    - email: Email addresses
    - number: Numeric values
    - phone_number: Phone numbers
    - timestamp: Date values
    - text_list: Multiple choice options (configure with constraints)
  - constraints: Optional. Used with text_list to define choices and selection limits.
    - choices: Array of {label, value} objects.
    - min_selected: Minimum selections required.
    - max_selected: Maximum selections allowed. Set to 1 for single choice.

## Output
- The list of created properties.
`,
    params: [
      { name: 'account_id', type: 'string', required: true, description: `The ID of the Organization` },
      { name: 'properties', type: 'array', required: true, description: `Array of property definitions to create` },
    ],
  },
  {
    name: 'typeformmcp_contacts_public_bulk_upsert_contacts',
    description: `Create or update multiple contacts in the user's Contacts database in a single operation.

Use this tool when the user wants to add, create, update, or import several contacts at once.

## What this tool does
- For each contact, if a contact with the same identifier (e.g. email) already exists, it updates that contact's properties. Otherwise, it creates a new contact.
- Processes contacts in batches for efficiency.
- Deduplicates contacts within the same call by identifier, merging properties forward.

## Inputs
- contacts: An array of contact definitions, each containing:
  - properties: Contact field values as property ID and value pairs.
    - At least one identifying property (e.g. email) is required per contact.
  - Maximum 1000 contacts per call.

## Output
- The list of created or updated contacts. Each contact includes its id, identifier (value that uniquely identifies the contact) and an array of associated contact properties.

## Property Value Formats
When providing property values, use the following formats based on property type:
- Text (email, short_text, long_text, phone_number, code): {"type": "text", "text": "value"}
- Number: {"type": "number", "number": 42.0}
- Timestamp: {"type": "timestamp", "timestamp": "2024-01-15T00:00:00Z"}
- Select (single_select, multi_select, text_list): {"type": "text_list", "text_list": ["option1"]}
`,
    params: [
      { name: 'account_id', type: 'string', required: true, description: `The ID of the Organization` },
      { name: 'contacts', type: 'array', required: true, description: `Array of contact definitions to create or update` },
    ],
  },
  {
    name: 'typeformmcp_contacts_public_create_contact',
    description: `Create a new contact in the user's Contacts database.

Use this tool when the user wants to add, create, or register a new contact.

## What this tool does
- Creates a single contact with the provided properties.

## Inputs
- properties: Contact field values as property ID and value pairs.
  - At least one identifying property (e.g. email) is required.

## Output
- The created contact. Includes its id, identifier (value that uniquely identifies the contact) and an array of associated contact properties.

## Property Value Formats
When providing property values, use the following formats based on property type:
- Text (email, short_text, long_text, phone_number, code): {"type": "text", "text": "value"}
- Number: {"type": "number", "number": 42.0}
- Timestamp: {"type": "timestamp", "timestamp": "2024-01-15T00:00:00Z"}
- Select (single_select, multi_select, text_list): {"type": "text_list", "text_list": ["option1"]}
`,
    params: [
      { name: 'account_id', type: 'string', required: true, description: `The ID of the Organization` },
      { name: 'properties', type: 'array', required: true, description: `Array of property ID and value pairs` },
    ],
  },
  {
    name: 'typeformmcp_contacts_public_create_contacts_list',
    description: `Create a new contacts list (segment) in the Contacts database.

## Use cases
- Create a new segment to organize contacts
- Create a list with custom filter and sort settings

## Input
- name (required): The name for the new contacts list (max 255 characters)
- settings (required, nullable): Filter, sort, and table column configuration. Pass null for a list with no filters.

## Output format
Confirm the created list to the user, including its name and ID.
`,
    params: [
      { name: 'account_id', type: 'string', required: true, description: `The ID of the Organization` },
      { name: 'name', type: 'string', required: true, description: `The name for the new contacts list` },
      { name: 'settings', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'typeformmcp_contacts_public_create_form_property_mappings',
    description: `Create a form property mapping (sync config) to connect a form to contact properties.

## Use cases
- Map form fields and variables to contact properties

## Prerequisites
Before using this tool, call get_form_property_compatibility with the form_id to get:
- Available form fields and variables with their IDs
- Compatible contact properties for each form field/variable
- Available choices for each field (in the choices array)

## Mapping to subscription status
When mapping a field to the subscription status property
(template_id: "contacts.subscription_status"), you MUST include
value_maps to translate form answers to subscription status values.

### For checkbox fields (choice-based — use choice_id):
Checkbox fields produce choice answers, NOT boolean. Use source.type "choice_id" with the choice ID from the field's choices array.
A single-choice checkbox (e.g. marketing consent) maps the checked choice to "subscribed":
  value_maps: [
    {source: {type: "choice_id", choice_id: "<consent-choice-id>"}, target: {type: "text_list", text_list: ["subscribed"]}}
  ]

### For multiple_choice / picture_choice fields (choice-based — use choice_id):
Use source.type "choice_id" with the choice ID from the field's choices array:
  value_maps: [
    {source: {type: "choice_id", choice_id: "<yes-choice-id>"}, target: {type: "text_list", text_list: ["subscribed"]}},
    {source: {type: "choice_id", choice_id: "<no-choice-id>"}, target: {type: "text_list", text_list: ["never_subscribed"]}}
  ]

### For yes_no / legal fields (boolean answer type — use boolean):
These are the only truly boolean fields. Use source.type "boolean":
  value_maps: [
    {source: {type: "boolean", boolean: true}, target: {type: "text_list", text_list: ["subscribed"]}},
    {source: {type: "boolean", boolean: false}, target: {type: "text_list", text_list: ["never_subscribed"]}}
  ]

## Output format
Present the created form property mapping to the user.
`,
    params: [
      { name: 'account_id', type: 'string', required: true, description: `The ID of the Organization` },
      { name: 'form_id', type: 'string', required: true, description: `The ID of the form to connect` },
      { name: 'mapping', type: 'array', required: true, description: `Array of property ID to mapping configuration pairs` },
    ],
  },
  {
    name: 'typeformmcp_contacts_public_delete_contact',
    description: `Delete a contact from the Contacts database.

## Prerequisites
- Call list_contacts first to find the contact ID you want to delete.

## Input
- contact_id (required): The ID of the contact to delete

## Output format
Confirm the deletion was successful.
`,
    params: [
      { name: 'account_id', type: 'string', required: true, description: `The ID of the Organization` },
      { name: 'contact_id', type: 'string', required: true, description: `The ID of the contact to delete` },
    ],
  },
  {
    name: 'typeformmcp_contacts_public_delete_contacts_database_properties',
    description: `Delete multiple properties from the Contacts database schema in a single operation.

WARNING: This action is irreversible. Either all properties are deleted successfully, or none are deleted (all-or-nothing).

## Use cases
- Remove multiple properties that are no longer needed in one operation
- Clean up unused properties efficiently
- Batch deletion when reorganizing contact schema

## Restrictions (same as single delete)
- Properties with prevent_delete: true cannot be deleted (e.g. Subscription Status)
- The identifier property cannot be deleted (at least one identifier must remain)
- All-or-nothing: If ANY property fails validation, NO properties are deleted

## Side effects (same as single delete)
- Lists/segments: Deletion will fail if any list references ANY of these properties in its filters, sort orders, or visible columns — those lists must be updated first
- Contact data: Existing values for deleted properties are not removed from contacts, but become inaccessible
- Form mappings: Any form sync mappings targeting deleted properties will silently stop populating them
- Enrichment: Enrichment configurations referencing deleted properties stop being applied

## Input
- property_ids (required): Array of property IDs to delete (use list_contacts_database_properties to find IDs). Must contain at least one property ID.

## Output format
Confirm all properties were successfully deleted with the count of deleted properties.
`,
    params: [
      { name: 'account_id', type: 'string', required: true, description: `The ID of the Organization` },
      { name: 'property_ids', type: 'array', required: true, description: `Array of property IDs to delete` },
    ],
  },
  {
    name: 'typeformmcp_contacts_public_delete_contacts_database_property',
    description: `Delete a property from the Contacts database schema.

WARNING: This action is irreversible.

## Use cases
- Remove a property that is no longer needed
- Clean up unused properties from the contacts schema

## Restrictions
- Properties with prevent_delete: true cannot be deleted (e.g. Subscription Status)
- The identifier property cannot be deleted

## Side effects
- Lists/segments: Deletion will fail if any list references this property in its filters, sort orders, or visible columns — those lists must be updated first
- Contact data: Existing values for the deleted property are not removed from contacts, but become inaccessible
- Form mappings: Any form sync mappings targeting this property will silently stop populating it
- Enrichment: Enrichment configurations referencing this property stop being applied

## Input
- property_id (required): The ID of the property to delete (use list_contacts_database_properties to find IDs)

## Output format
Confirm the deletion was successful.
`,
    params: [
      { name: 'account_id', type: 'string', required: true, description: `The ID of the Organization` },
      { name: 'property_id', type: 'string', required: true, description: `The ID of the property to delete` },
    ],
  },
  {
    name: 'typeformmcp_contacts_public_delete_contacts_list',
    description: `Delete a contacts list (segment) from the Contacts database.

## Use cases
- Remove a segment that is no longer needed
- Clean up unused lists

## Input
- list_id (required): The ID of the contacts list to delete

## Output format
Confirm the deletion was successful.
`,
    params: [
      { name: 'account_id', type: 'string', required: true, description: `The ID of the Organization` },
      { name: 'list_id', type: 'string', required: true, description: `The ID of the contacts list to delete` },
    ],
  },
  {
    name: 'typeformmcp_contacts_public_delete_form_property_mappings',
    description: `Delete a form property mapping (sync config) by its ID.

## Use cases
- Remove form property mappings that are no longer needed

## Input
- sync_config_id (required): The ID of the sync config to delete

## Output format
Confirms the deletion was successful.
`,
    params: [
      { name: 'account_id', type: 'string', required: true, description: `The ID of the Organization` },
      { name: 'sync_config_id', type: 'string', required: true, description: `The ID of the sync config to delete` },
    ],
  },
  {
    name: 'typeformmcp_contacts_public_enable_standard_contacts_database_properties',
    description: `Activate disabled standard properties on the user's Contacts database.

Use this tool when you need to enable standard (built-in) properties
that are currently disabled, for example before creating a
form-to-contact mapping that references them.

## What this tool does
- Activates one or more disabled standard properties so they become
  visible and usable.
- Only works on standard properties (those with a template_id).
- Properties that are already enabled are returned unchanged.

## Inputs
- property_ids: An array of property IDs to enable.

## Output
- The list of enabled properties.
`,
    params: [
      { name: 'account_id', type: 'string', required: true, description: `The ID of the Organization` },
      { name: 'property_ids', type: 'array', required: true, description: `An array of property IDs to enable` },
    ],
  },
  {
    name: 'typeformmcp_contacts_public_get_contact',
    description: `Get a single contact by ID with property metadata included.

Use this tool when you need to fetch a specific contact and want property names/types without a separate API call.

## What this tool does
- Returns a single contact with all its properties
- Property metadata (name, type, template_id) is automatically included
- No need to call list_contacts_database_properties separately

## Inputs
- contact_id: The UUID of the contact to fetch

## Output
- id: Contact UUID
- identifier: Primary identifier value (e.g., email address)
- properties: Array of properties, each with:
  - property_id: The property UUID
  - value: The property value
  - name: Human-readable property name (e.g., "Email", "Name")
  - type: Property type (e.g., "email", "short_text", "number")
  - template_id: Standard property template ID (null for custom properties)
`,
    params: [
      { name: 'account_id', type: 'string', required: true, description: `The ID of the Organization` },
      { name: 'contact_id', type: 'string', required: true, description: `The UUID of the contact to fetch` },
    ],
  },
  {
    name: 'typeformmcp_contacts_public_get_contacts_database_properties',
    description: `Get specific contact properties by their IDs.

Use this tool when you need information about specific properties, particularly for validation before performing operations like deletion.

## Use cases
- Fetch property names to show users what will be affected by an operation
- Validate that property IDs exist before performing actions
- Get detailed information about specific properties without fetching all properties

## Input
- property_ids (required): Array of property IDs to retrieve. Use list_contacts_database_properties to discover available property IDs.

## Output
- Returns an array of properties that were found. Properties that don't exist are silently omitted.
- Each property includes: id, name, type, icon, identifier flag, template_id, constraints, default value, and other metadata.

## Important notes
- If a property ID doesn't exist, it won't appear in the results (no error is returned)
- Duplicate property IDs in the input are automatically deduplicated
- To check if all requested properties exist, compare the number of results with the number of requested IDs
`,
    params: [
      { name: 'account_id', type: 'string', required: true, description: `The ID of the Organization` },
      { name: 'property_ids', type: 'array', required: true, description: `Array of property IDs to retrieve` },
    ],
  },
  {
    name: 'typeformmcp_contacts_public_get_contacts_list',
    description: `Get detailed properties of a specific contacts list (segment).

Use this tool to inspect a list before performing operations like deletion, or to understand the list's configuration.

## What this tool does
- Retrieves a list's metadata (ID, name, timestamps)

## Input
- list_id (required): The ID of the contacts list to retrieve

## Output
- id: The list's unique identifier
- name: The list's human-readable name
- created_at: When the list was created (ISO 8601 timestamp)
- updated_at: When the list was last modified (ISO 8601 timestamp)

## Common Use Cases
- Confirm list details before deletion: "Show me details for list abc-123 before I delete it"
- Review list metadata: "What is the name of list xyz-456?"
`,
    params: [
      { name: 'account_id', type: 'string', required: true, description: `The ID of the Organization` },
      { name: 'list_id', type: 'string', required: true, description: `The ID of the contacts list to retrieve` },
    ],
  },
  {
    name: 'typeformmcp_contacts_public_get_form_property_compatibility',
    description: `Get compatible property mappings for a form.

## Use cases
- Preparing to create a mapping between a form and contact properties

## Input format
Provide the form_id of the form you want to map to contact properties.

## Output format
Returns compatible properties for each form field and variable:

1. **field_compatibilities**: For each form field, the field and list of contact properties it can be mapped to
2. **variable_compatibilities**: For each form variable, the variable and list of contact properties it can be mapped to

Each field includes a **choices** array:
- For **multiple_choice**, **picture_choice**, **dropdown**, **ranking** fields: contains the actual choice options with their IDs and labels from the form definition.
- For **checkbox** fields: contains the actual choice options from the form (checkbox is choice-based, NOT boolean).
- For **yes_no** and **legal** fields: contains synthesized boolean choices [{id:"true", label:"Yes"}, {id:"false", label:"No"}].
- For other field types: empty array.

Use these choice IDs when constructing value_maps for the create_form_property_mappings tool.

The compatible_properties lists may include disabled standard
properties (disabled: true, template_id is set). These are inactive
built-in properties. To activate them, use the
enable_standard_contacts_database_properties tool with their
property IDs. Always prefer standard properties over creating
new custom ones.

Use these to determine valid mappings when creating a sync config.
`,
    params: [
      { name: 'account_id', type: 'string', required: true, description: `The ID of the Organization` },
      { name: 'form_id', type: 'string', required: true, description: `The ID of the form to get property mappings for` },
    ],
  },
  {
    name: 'typeformmcp_contacts_public_get_form_property_mappings',
    description: `Get the property mappings (sync config) for a specific form.

## Use cases
- View how a form's fields are mapped to contact properties
- Check if a form has an existing mapping configured

## Input format
Provide the form_id of the form you want to get mappings for.

## Output format
Returns the sync config for the form
`,
    params: [
      { name: 'account_id', type: 'string', required: true, description: `The ID of the Organization` },
      { name: 'form_id', type: 'string', required: true, description: `The ID of the form to get property mappings for` },
    ],
  },
  {
    name: 'typeformmcp_contacts_public_get_form_property_mappings_by_id',
    description: `Get form property mapping details by sync config ID.

Use this tool to inspect a form property mapping before performing operations like deletion.

## What this tool does
- Retrieves sync config metadata (ID, form ID, type, active status, timestamps)
- Lists all form field to property mappings

## Input
- sync_config_id (required): The ID of the form property mapping to retrieve

## Output
- id: The sync config's unique identifier
- form_id: The form/smart form ID this mapping is associated with
- form_name: The name/title of the form (empty if form no longer exists or for CSV type)
- type: The sync config type (form, smart_form, or csv)
- active: Whether the mapping is currently active
- created_at: When the mapping was created (ISO 8601 timestamp)
- updated_at: When the mapping was last modified (ISO 8601 timestamp)
- mappings: Array of field mappings showing which form fields map to which properties

## Common Use Cases
- Confirm mapping details before deletion: "Show me details for sync config abc-123 before I delete it"
- Verify which form a mapping belongs to: "Which form does sync config xyz-456 map to?"
- See what fields are mapped: "What mappings exist in sync config xyz-456?"
`,
    params: [
      { name: 'account_id', type: 'string', required: true, description: `The ID of the Organization` },
      { name: 'sync_config_id', type: 'string', required: true, description: `The ID of the form property mapping to retrieve` },
    ],
  },
  {
    name: 'typeformmcp_contacts_public_import_form_responses_by_mapping',
    description: `Schedule an import of form responses into contacts using an existing form property mapping (sync config).

## Use cases
- Import form responses into contacts after a form property mapping has been created or updated
- Re-import form responses to pick up new submissions

## Input
- account_id (required): The ID of the Organization
- sync_config_id (required): The ID of the form property mapping (sync config) to use for the import. Use list_form_property_mappings to find existing sync configs.

## Output format
Confirms the import has been scheduled successfully.
`,
    params: [
      { name: 'account_id', type: 'string', required: true, description: `The ID of the Organization` },
      { name: 'sync_config_id', type: 'string', required: true, description: `The ID of the form property mapping (sync config) to use for the import` },
    ],
  },
  {
    name: 'typeformmcp_contacts_public_list_contacts',
    description: `List contacts from the user's Contacts database.

Use this tool when the user wants to see, search, or find contacts.

## What this tool does
- Returns contacts matching the specified criteria with pagination.

## Inputs
- segment_id: a saved list ID, or null. If provided, uses the list's filters and sort.
- filters: filter criteria, or null for no filtering. Only used when segment_id is null.
- sort: sort order, or null for newest first. Only used when segment_id is null.
- page: page number, starting at 1.
- page_size: results per page.

## Output
- total_count: Total contacts matching the criteria.
- items: An array of contacts matching the criteria. Each includes its id, identifier (value that uniquely identifies the contact) and an array of associated contact properties.

## Default pagination
- page=1, page_size=25.

## Understanding Filters
### Structure
- Filters use a two-level group structure:
  - Root: operator (and/or) + filter_groups array
  - Each filter_group: operator (and/or) + filters array
  - Each filter: property_id, operator, value, negate

### Semantics:
- Root operator=and: contact must match ALL groups
- Root operator=or: contact must match ANY group
- Group operator=and: ALL filters in the group must match
- Group operator=or: ANY filter in the group must match

### Filter operators by property type
- Text (email, short_text, long_text, phone_number, code): equals, starts_with, ends_with, contains, empty, any_of
- Number: equals, greater_than, less_than, empty
- Timestamp: equals, greater_than, less_than, empty
- Select (single_select, multi_select, text_list): equals, contains, empty
`,
    params: [
      { name: 'account_id', type: 'string', required: true, description: `The ID of the Organization` },
      { name: 'filters', type: 'string', required: true, description: `Optional filters to apply when listing contacts` },
      { name: 'page', type: 'integer', required: true, description: `Page number for pagination (default is 1)` },
      { name: 'page_size', type: 'integer', required: true, description: `Number of contacts per page (max 100; useful to set to 0 to get only the total count)` },
      { name: 'segment_id', type: 'string', required: true, description: `The ID of the segment to list contacts from` },
      { name: 'sort', type: 'array', required: true, description: `Optional sort orders to apply when listing contacts; default is created_at desc` },
    ],
  },
  {
    name: 'typeformmcp_contacts_public_list_contacts_database_properties',
    description: `List all contact properties in the user's Contacts database.

Use this tool when the user asks about their contact properties/fields or schema.

## What this tool does
- Returns all properties defined for contacts.

## Output
- An array of contact properties. Each includes its id, name, type, and flags for how it can be used.

## Understanding Contact Property Fields
- identifier: true → Indicates this is a primary identifier field (e.g., email). It is required when creating a contact.
- template_id has a value → Indicates the property is a standard (built-in) Typeform property rather than a custom property.
- immutable: true → Means the property definition itself cannot be modified (e.g., its name or type).
- disabled: true → Indicates the property is inactive or hidden.
  Ignore disabled properties when displaying to the user. To activate
  a disabled standard property, use the
  enable_standard_contacts_database_properties tool.
- prevent_delete: true → Indicates the property cannot be deleted.
- default → The default value assigned to the property. Informational.
- constraints.choices → For select-type properties, defines the available options.
- valid_filter_operators → The comparison operators valid for filtering by this property. Always use one of these operators to avoid errors.
`,
    params: [
      { name: 'account_id', type: 'string', required: true, description: `The ID of the Organization` },
    ],
  },
  {
    name: 'typeformmcp_contacts_public_list_contacts_lists',
    description: `List all saved contact lists in the user's Contacts database.

Use this tool when the user wants to see their saved contact lists.

## What this tool does
- Returns all saved lists with their names and filter settings.

## Output
- An array of lists. Each includes its id, name, and settings.

## Understanding Filters
### Structure
- Filters use a two-level group structure:
  - Root: operator (and/or) + filter_groups array
  - Each filter_group: operator (and/or) + filters array
  - Each filter: property_id, operator, value, negate

### Semantics:
- Root operator=and: contact must match ALL groups
- Root operator=or: contact must match ANY group
- Group operator=and: ALL filters in the group must match
- Group operator=or: ANY filter in the group must match

### Filter operators by property type
- Text (email, short_text, long_text, phone_number, code): equals, starts_with, ends_with, contains, empty, any_of
- Number: equals, greater_than, less_than, empty
- Timestamp: equals, greater_than, less_than, empty
- Select (single_select, multi_select, text_list): equals, contains, empty
`,
    params: [
      { name: 'account_id', type: 'string', required: true, description: `The ID of the Organization` },
    ],
  },
  {
    name: 'typeformmcp_contacts_public_list_form_property_mappings',
    description: `List all form property mappings (sync configs) for the Contacts database.

## Use cases
- View all configured form-to-contact property mappings

## Output format
Present the list of form property mappings to the user.
`,
    params: [
      { name: 'account_id', type: 'string', required: true, description: `The ID of the Organization` },
    ],
  },
  {
    name: 'typeformmcp_contacts_public_update_contact',
    description: `Update an existing contact in the user's Contacts database.

Use this tool when the user wants to modify, change, or update a contact's information.

## What this tool does
- Updates the contact with only the properties provided; others remain unchanged.

## Inputs
- contact_id: The ID of the contact to update.
- properties: Contact field values as property ID and value pairs. Only include fields to change.

## Output
- The updated contact.

## Property Value Formats
When providing property values, use the following formats based on property type:
- Text (email, short_text, long_text, phone_number, code): {"type": "text", "text": "value"}
- Number: {"type": "number", "number": 42.0}
- Timestamp: {"type": "timestamp", "timestamp": "2024-01-15T00:00:00Z"}
- Select (single_select, multi_select, text_list): {"type": "text_list", "text_list": ["option1"]}
`,
    params: [
      { name: 'account_id', type: 'string', required: true, description: `The ID of the Organization` },
      { name: 'contact_id', type: 'string', required: true, description: `The ID of the contact to update. Use list_contacts to find contact IDs.` },
      { name: 'properties', type: 'array', required: true, description: `Array of property ID and value pairs` },
    ],
  },
  {
    name: 'typeformmcp_contacts_public_update_contacts_list',
    description: `Update an existing contacts list (segment) in the Contacts database.

## Use cases
- Rename a segment
- Update a segment's filter, sort, or table column settings

## Input
- list_id (required): The ID of the contacts list to update
- name (required): The name for the contacts list (can be unchanged)
- settings (required, nullable): Filter, sort, and table column configuration. Pass null to keep existing settings unchanged.

## Output format
Confirm the updated list to the user, including its new name and settings.
`,
    params: [
      { name: 'account_id', type: 'string', required: true, description: `The ID of the Organization` },
      { name: 'list_id', type: 'string', required: true, description: `The ID of the contacts list to update` },
      { name: 'name', type: 'string', required: true, description: `The name for the contacts list` },
      { name: 'settings', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'typeformmcp_contacts_public_update_form_property_mappings',
    description: `Update an existing form property mapping (sync config).

## Use cases
- Add new field/variable mappings to an existing form connection
- Change which contact properties form fields/variables map to
- Remove mappings by excluding them from the update

## Prerequisites
- Use list_form_property_mappings or get_form_property_mappings to get the sync_config_id                                                                                          
- IMPORTANT: Use get_form_property_compatibility with the form_id to discover which form fields and variables can map to which contact properties   

## Important
The mapping provided replaces the existing mapping entirely.
To preserve existing mappings while adding new ones, include all desired mappings in the request.

## Output format
Present the updated form property mapping to the user.
`,
    params: [
      { name: 'account_id', type: 'string', required: true, description: `The ID of the Organization` },
      { name: 'mapping', type: 'array', required: true, description: `Array of property ID to mapping configuration pairs` },
      { name: 'sync_config_id', type: 'string', required: true, description: `The ID of the sync config to update` },
    ],
  },
  {
    name: 'typeformmcp_forms_public_create_form',
    description: `Create a new Typeform form.

## Use cases
- Create a blank form to start building a survey or quiz
- Create a form in a specific workspace

## Parameters
- account_id: Account ID (required)
- title: The title of the form (required)
- workspace: Workspace href URL, e.g. "https://api.typeform.com/workspaces/abc123" (required)

## Output
Returns the created form with its ID, title, workspace, theme, and other metadata.
The form is created as unpublished (empty, no content).

## After creating a form
After calling this tool, respond with this conversational format:

Done — I've created a blank Typeform titled "{title}" in your workspace.

One thing to flag: the current version of the Typeform connector can create the form, but
it can't add questions or content to it yet — so right now it's empty. To add content,
open it in the builder:

👉 Open in the builder: https://admin.typeform.com/form/{form_id}/create

The fastest way to build it out is with Typeform AI, right inside the builder. Once you're
in, start with Typeform AI and paste this prompt:

{Generate a detailed prompt here as a separate paragraph based on what the user described:
form type, purpose, key fields. Keep it clear and actionable.}

That'll generate the questions, logic, and screens in a few seconds. Want me to tailor
the prompt to a specific audience or adjust the fields first?

Do NOT provide the public form URL (the form is empty and unpublished).
Do NOT suggest adding fields via subsequent API calls — that capability does not exist yet.`,
    params: [
      { name: 'account_id', type: 'string', required: true, description: `Account ID (required)` },
      { name: 'title', type: 'string', required: true, description: `Form title (required)` },
      { name: 'workspace', type: 'string', required: true, description: `Workspace href URL, e.g. https://api.typeform.com/workspaces/abc123 (required)` },
    ],
  },
  {
    name: 'typeformmcp_forms_public_delete_form',
    description: `Delete/remove a form based on its ID.

## Use cases
- Remove a form that is no longer needed
- Clean up test forms

## Parameters
- id: The form ID to delete (required)

## Output
Returns empty response on success.`,
    params: [
      { name: 'account_id', type: 'string', required: true, description: `Account ID (required)` },
      { name: 'id', type: 'string', required: true, description: `Form ID to delete (required)` },
    ],
  },
  {
    name: 'typeformmcp_forms_public_get_form',
    description: `Retrieve a form.

Always call get_form before patch_form so you are working from the current state.

## Parameters
- id: The form ID (required)
- view: one of
    - "skeleton" — id, title, field refs+types+titles, thankyou_screens, and welcome_screen.
      Container fields include their nested children inline under "fields", so the agent sees
      nested refs without drilling. Cheapest read.
    - "fields" — drill-down into specific fields. Requires "refs" (list of field refs, max 50).
      Looks up refs at any depth. Returns the same per-field shape as "full" but only for the
      requested refs, plus a "missing" array for refs not found.
    - "full" (default) — the complete form including settings, theme, logic. Use sparingly; this is the most expensive read.
- refs: list of field refs (only used when view="fields"). Max 50 per call.

Typical workflow: skeleton to find the field, fields to read its details, then patch_form to edit it.`,
    params: [
      { name: 'account_id', type: 'string', required: true, description: `Account ID (required)` },
      { name: 'id', type: 'string', required: true, description: `Form ID (required)` },
      { name: 'refs', type: 'array', required: true, description: `Field refs to drill into (used only when view=fields). Max 50 per call.` },
      { name: 'view', type: 'string', required: true, description: `skeleton: compact map of the form — id, title, and each field's ref/type/title/required/choice_count/rule_count. Container fields include their nested children inline under \`fields\`, so the agent sees nested refs without drilling. rule_count shows how many logic rules are triggered by that field (omitted when 0). Drops property bags, choice labels, theme, settings, and layout.
fields: drill-down. Requires \`refs\`. Returns the same per-field shape as \`full\` but only for the requested refs, plus a \`missing\` array for refs not found.
full (default): complete form including settings, theme, logic.
` },
    ],
  },
  {
    name: 'typeformmcp_forms_public_list_forms',
    description: `List forms owned by your user.

## Use cases
- Browse all forms in your account
- Search for forms by title
- Filter forms by workspace
- Paginate through large form collections

## Parameters
- search: Filter forms by title (partial match, optional)
- page: Page number starting from 1 (default: 1)
- page_size: Number of forms per page (default: 10, max: 200)
- sort_by: Sort field - "created_at", "title", or "last_updated_at" (default: "created_at")
- order_by: Sort order - "asc" or "desc" (default: "desc")
- workspace_id: Filter by workspace ID (optional)

## Output
Returns paginated list of forms with total count and form metadata.`,
    params: [
      { name: 'account_id', type: 'string', required: true, description: `Account ID (required)` },
      { name: 'order_by', type: 'string', required: true, description: `Sort order: asc or desc` },
      { name: 'page', type: 'integer', required: true, description: `Page number (default: 1)` },
      { name: 'page_size', type: 'integer', required: true, description: `Items per page (default: 10, max: 200)` },
      { name: 'search', type: 'string', required: true, description: `Filter by title (partial match)` },
      { name: 'sort_by', type: 'string', required: true, description: `Sort field: created_at, title, or last_updated_at` },
      { name: 'workspace_id', type: 'string', required: true, description: `Filter by workspace ID` },
    ],
  },
  {
    name: 'typeformmcp_insights_public_discover',
    description: `Return the schema of analytics data available for a given scope.

Call this BEFORE any analytics query (insights-public_aggregate/timeseries/toplist/list) to learn which datasets exist,
which fields are queryable, what measures and dimensions each field supports, and which filters apply.

## Inputs
- account_id: required.
- form_id XOR audience_id: form_id for form response data, audience_id for contact data. Provide exactly one.

## Output
- datasets: array of datasets, each with fields. Each field lists answer_type, measures, dimensions, supported_query_types, and filter operators.

## Resolving a form by name
If the user refers to a form by topic/name/description rather than ID, first call forms-public_list_forms with the search
parameter set to keywords from the user's message; it returns forms with titles and IDs.
If multiple match, ask the user which form they mean before proceeding.
`,
    params: [
      { name: 'account_id', type: 'string', required: true, description: `Account ID. Always required.` },
      { name: 'audience_id', type: 'string', required: true, description: `Audience ID for contact data. Mutually exclusive with form_id.` },
      { name: 'form_id', type: 'string', required: true, description: `Form ID for form response data. Mutually exclusive with audience_id.` },
    ],
  },
  {
    name: 'typeformmcp_insights_public_list',
    description: `Return paginated row-level data for a single field in a dataset.

Use this tool when the user wants to see individual records (text responses, numeric ratings, true/false answers, etc.) rather than aggregated numbers.

## What this tool does
- Returns one row per response for the specified field, with cursor-based pagination.

## Inputs
- account_id: required.
- form_id XOR audience_id: form_id for the "forms" dataset, audience_id for the "contacts" dataset. Exactly one.
- field_id: form field to list values for. Works in "forms" dataset only.
- property_id: property to list values for. Required together with audience_id in the "contacts" dataset.
- time_range: { start, end } as unix seconds. Required.
- pagination:
  - page_size: Required. Max 100.
  - cursor: opaque token from a previous response to fetch the next page. Null for first page.
- search: free-text ILIKE filter on values. Null for no filter.
- filters: cross-field filter conditions. Null for no filtering.
- sort: sort order. Null for default (newest first).

## Output
- data: array of rows, each with { row_id, timestamp, text }.
- summary: { total_count, match_count } — total rows in scope and rows matching search/filters.
- pagination: { page_size, cursor, is_last_page }. Pass cursor back to fetch the next page.

## Supported field types
- text, number, boolean, choices, dropdown, nps, date, multi_format, transcript.

## Joining answers per respondent
- row_id is consistent across fields for the same form.
- To reconstruct one respondent's full set of answers: call this tool once per field, then join the resulting rows on row_id.
`,
    params: [
      { name: 'account_id', type: 'string', required: true, description: `Account ID. Always required.` },
      { name: 'pagination', type: 'object', required: true, description: `Pagination parameters.` },
      { name: 'time_range', type: 'object', required: true, description: `Time window for the query.` },
      { name: 'audience_id', type: 'string', required: false, description: `Audience ID for the 'contacts' dataset. Mutually exclusive with form_id.` },
      { name: 'field_id', type: 'string', required: false, description: `Field ID to list values for. 'forms' dataset only.` },
      { name: 'filters', type: 'string', required: false, description: `Cross-field filter conditions.` },
      { name: 'form_id', type: 'string', required: false, description: `Form ID for the 'forms' dataset. Mutually exclusive with audience_id.` },
      { name: 'property_id', type: 'string', required: false, description: `Property ID to list values for. Required for the 'contacts' dataset together with audience_id.` },
      { name: 'search', type: 'string', required: false, description: `Text search filter applied to values (ILIKE match).` },
      { name: 'sort', type: 'string', required: false, description: `Sort order for results.` },
    ],
  },
  {
    name: 'typeformmcp_workspaces_list_workspaces',
    description: `List the workspaces the caller can see, with id, name, form_count, type (private/shared/custom), and account_id. Pair with forms-list_forms to discover forms in a specific workspace. Supports search by name and pagination.`,
    params: [
      { name: 'page', type: 'integer', required: true, description: `1-indexed page number. Null uses default (1).` },
      { name: 'page_size', type: 'integer', required: true, description: `Items per page. Null uses default (10).` },
      { name: 'search', type: 'string', required: true, description: `Filter workspaces by name (partial match, case-insensitive). Null returns all workspaces.` },
    ],
  },
]
