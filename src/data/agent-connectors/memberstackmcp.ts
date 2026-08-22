import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'memberstackmcp_addfreeplan',
    description: `Attaches a free plan to a member. Granting complimentary access, trial memberships, or promotional access. Free plans provide content/feature access without payment. Immediate access granted. Environment-specific (SANDBOX or LIVE). Member ID and Plan ID. Updated Member with plan connection.`,
    params: [
      {
        name: 'input',
        type: 'object',
        required: true,
        description: `Structured input payload for this operation. See the tool description for the expected shape.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_createapp',
    description: `Create a new Memberstack app (project) with isolated members, plans, data tables, and gated content. Only use when the user explicitly requests a new app. After creation the session context automatically switches to the new app.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Name for the new app. Maximum 24 characters.`,
      },
      {
        name: 'stack',
        type: 'string',
        required: true,
        description: `Platform/stack for the app. Accepted values: WEBFLOW, VANILLA, WORDPRESS.`,
      },
      {
        name: 'templateId',
        type: 'string',
        required: false,
        description: `Webflow template ID to scaffold the app from. Only applicable for WEBFLOW stack.`,
      },
      {
        name: 'wordpressPageBuilder',
        type: 'string',
        required: false,
        description: `WordPress page builder plugin. Accepted values: GUTENBERG, ELEMENTOR, DIVI, BEAVER_BUILDER, BRICKS, CORNERSTONE, OTHER.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_createcustomcontent',
    description: `Adds a custom content block to a gated content group. Creating restriction experiences, upgrade prompts, or teaser content for restricted pages. Content blocks (HTML/CSS/JS/text) display when members encounter access restrictions. Useful for driving conversions and providing context. Content Group ID, content name, type, and payload. Created custom content object.`,
    params: [
      {
        name: 'input',
        type: 'object',
        required: true,
        description: `Structured input payload for this operation. See the tool description for the expected shape.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_createcustomfield',
    description: `Creates a new custom field for member profiles. Extending member profiles beyond email/password to collect additional data (company, phone, preferences, etc.). Distinct from data table fields. Appears in signup forms and profile interfaces. Specify unique key, label, visibility, and plan restrictions. Unique field key and label. Created CustomField object.`,
    params: [
      {
        name: 'input',
        type: 'object',
        required: true,
        description: `Structured input payload for this operation. See the tool description for the expected shape.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_createdatarecord',
    description: `Creates a new record (row) in a Data Table. Adding entries like member profiles, products, posts, or custom content. Provide field values matching the table's schema and validation rules. All required fields must be provided. Environment-specific (SANDBOX or LIVE). Table ID and field values (JSON). Created DataRecord object.`,
    params: [
      {
        name: 'input',
        type: 'object',
        required: true,
        description: `Structured input payload for this operation. See the tool description for the expected shape.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_createdatatable',
    description: `Creates a new empty Data Table with custom access permissions. Setting up custom database structures for member profiles, product catalogs, posts, or any structured data. First step in data table workflow. After creation, use createDataTableField to add columns, then createDataRecord to add rows. Specify name, key, and access rules (PUBLIC/AUTHENTICATED/AUTHENTICATED_OWN/ADMIN_ONLY). Unique table name and key. Newly created DataTable object.`,
    params: [
      {
        name: 'input',
        type: 'object',
        required: true,
        description: `Structured input payload for this operation. See the tool description for the expected shape.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_createdatatablefield',
    description: `Adds a new field (column) to an existing Data Table. Extending table schemas with new data collection requirements. Define data type (TEXT, NUMBER, DATE, BOOLEAN, REFERENCE, etc.), validation rules, required status, and default values. Field types determine storage format and validation. Table ID, unique field key, name, and data type. Created DataTableField object.`,
    params: [
      {
        name: 'input',
        type: 'object',
        required: true,
        description: `Structured input payload for this operation. See the tool description for the expected shape.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_creatememberemailpassword',
    description: `Creates a new member using email/password signup. Manual member creation, testing signup flows, or member onboarding. Members are end-users (distinct from dashboard users). Optional fields include custom fields, metadata, plan assignments, payment info, and redirects. Passwords provided in plain text (auto-hashed). Environment-specific (SANDBOX or LIVE). Email and password. Created Member object with authentication details.`,
    params: [
      {
        name: 'input',
        type: 'object',
        required: true,
        description: `Structured input payload for this operation. See the tool description for the expected shape.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_createplan',
    description: `Creates a new subscription plan (membership tier). Launching new membership tiers, product offerings, or pricing structures. Plans define access levels and pricing. Can be free, one-time purchase, or recurring (via Stripe). Supports team accounts and custom redirects. Foundation for gated content access. Name and description. Created Plan object.`,
    params: [
      {
        name: 'input',
        type: 'object',
        required: true,
        description: `Structured input payload for this operation. See the tool description for the expected shape.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_createprice',
    description: `Creates a paid price point for a plan and syncs with Stripe. Launching new billing options (monthly/annual subscriptions, one-time purchases, or team pricing). Defines amount, billing cadence, currency, trial config, and setup fees. Activates paid mode and creates Stripe price record. Paid Memberstack subscription, LIVE environment, connected Stripe account, and plan ID. Created Price object.`,
    params: [
      {
        name: 'input',
        type: 'object',
        required: true,
        description: `Structured input payload for this operation. See the tool description for the expected shape.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_createrestrictedurl',
    description: `Creates a new gated URL entry for linking to content groups. Registering new protected pages or sections before configuring access rules. System trims/normalizes URL and stores filter behavior (exact match, wildcard, etc.). Makes URL available for content group assignment. URL path. Created RestrictedUrl object.`,
    params: [
      {
        name: 'input',
        type: 'object',
        required: true,
        description: `Structured input payload for this operation. See the tool description for the expected shape.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_createrestrictedurlgroup',
    description: `Creates a new gated content group with URLs and access rules. Defining new protected website areas, member-only sections, or tiered content access. Content groups are collections of URLs sharing access requirements. Configure URLs, plan access rules, redirects, and custom content blocks (HTML/CSS/JS) for restricted access. Group name and configuration. Created content group object.`,
    params: [
      {
        name: 'input',
        type: 'object',
        required: true,
        description: `Structured input payload for this operation. See the tool description for the expected shape.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_createstripecustomer',
    description: `Creates a Stripe customer record for a member if one doesn't exist. Required before assigning paid plans, processing payments, or managing billing. Establishes Memberstack-Stripe connection for subscriptions and payments. Checks for existing customers to avoid duplicates. Paid Memberstack subscription, LIVE environment, connected Stripe account, and member ID. Member object with Stripe customer ID.`,
    params: [
      {
        name: 'input',
        type: 'object',
        required: true,
        description: `Structured input payload for this operation. See the tool description for the expected shape.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_currentapp',
    description: `Get the currently active Memberstack app, including its environment mode (SANDBOX or LIVE), user role, and domain configuration.`,
    params: [],
  },
  {
    name: 'memberstackmcp_currentuser',
    description: `Get the authenticated dashboard user's profile and the list of Memberstack apps they can manage.`,
    params: [],
  },
  {
    name: 'memberstackmcp_deletecustomcontent',
    description: `Permanently removes a custom content block from a content group. Cleaning up content, replacing outdated messaging, or simplifying restriction experience. Stops content from displaying for restricted access. Custom Content ID. Success confirmation.`,
    params: [
      {
        name: 'input',
        type: 'object',
        required: true,
        description: `Structured input payload for this operation. See the tool description for the expected shape.`,
      },
      {
        name: 'confirmationToken',
        type: 'string',
        required: false,
        description: `Confirmation token returned by a previous call to this tool. Omit it on the first call: the server will describe what would be removed and issue a token. Only supply a token that the server issued, and only after the user has agreed to the described action.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_deletecustomfield',
    description: `Permanently deletes a custom field and ALL member data in that field. Removing deprecated fields no longer needed. Warning: This is irreversible. Removes field definition and all stored values across every member. Field disappears from signup forms and admin tools. Export data first if needed. Custom Field ID. Success confirmation.`,
    params: [
      {
        name: 'input',
        type: 'object',
        required: true,
        description: `Structured input payload for this operation. See the tool description for the expected shape.`,
      },
      {
        name: 'confirmationToken',
        type: 'string',
        required: false,
        description: `Confirmation token returned by a previous call to this tool. Omit it on the first call: the server will describe what would be removed and issue a token. Only supply a token that the server issued, and only after the user has agreed to the described action.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_deletedatarecord',
    description: `Permanently deletes a single Data Record and all its field values. Removing outdated information, cleaning up test data, or handling privacy deletion requests. Warning: This is irreversible. Consider data retention policies and GDPR compliance before deletion. Environment-specific (SANDBOX or LIVE). Record ID. Success confirmation.`,
    params: [
      {
        name: 'input',
        type: 'object',
        required: true,
        description: `Structured input payload for this operation. See the tool description for the expected shape.`,
      },
      {
        name: 'confirmationToken',
        type: 'string',
        required: false,
        description: `Confirmation token returned by a previous call to this tool. Omit it on the first call: the server will describe what would be removed and issue a token. Only supply a token that the server issued, and only after the user has agreed to the described action.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_deletedatatable',
    description: `Permanently deletes a Data Table and ALL associated records and fields. Removing deprecated tables or cleaning up test data. Warning: This is destructive and irreversible. All data, fields, and relationships are permanently deleted. Export data first if needed. Table ID. Success confirmation.`,
    params: [
      {
        name: 'input',
        type: 'object',
        required: true,
        description: `Structured input payload for this operation. See the tool description for the expected shape.`,
      },
      {
        name: 'confirmationToken',
        type: 'string',
        required: false,
        description: `Confirmation token returned by a previous call to this tool. Omit it on the first call: the server will describe what would be removed and issue a token. Only supply a token that the server issued, and only after the user has agreed to the described action.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_deletedatatablefield',
    description: `Permanently removes a field and ALL its data values from a Data Table. Removing deprecated fields or simplifying table schemas. Warning: Deletes field definition and all associated values across every record. This is irreversible. Export data first if needed. Field ID. Success confirmation.`,
    params: [
      {
        name: 'input',
        type: 'object',
        required: true,
        description: `Structured input payload for this operation. See the tool description for the expected shape.`,
      },
      {
        name: 'confirmationToken',
        type: 'string',
        required: false,
        description: `Confirmation token returned by a previous call to this tool. Omit it on the first call: the server will describe what would be removed and issue a token. Only supply a token that the server issued, and only after the user has agreed to the described action.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_deletemember',
    description: `Permanently deletes a member and all associated Memberstack data. Data privacy compliance (GDPR), removing test accounts, or handling deletion requests. Warning: This is irreversible. Removes profile, auth, subscriptions, custom fields, metadata, and all Memberstack data. Verify correct environment (SANDBOX vs LIVE) before deletion. Consider exporting data first. Member ID. Success confirmation.`,
    params: [
      {
        name: 'input',
        type: 'object',
        required: true,
        description: `Structured input payload for this operation. See the tool description for the expected shape.`,
      },
      {
        name: 'confirmationToken',
        type: 'string',
        required: false,
        description: `Confirmation token returned by a previous call to this tool. Omit it on the first call: the server will describe what would be removed and issue a token. Only supply a token that the server issued, and only after the user has agreed to the described action.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_deleteplan',
    description: `Deletes a subscription plan after safety validation. Retiring membership tiers, cleaning up test plans, or simplifying plan structure. System validates no active members or payment configs are attached before deletion. Prevents disruption of subscriptions. Warning: Plan and all configuration permanently removed. Plan ID. Success confirmation.`,
    params: [
      {
        name: 'input',
        type: 'object',
        required: true,
        description: `Structured input payload for this operation. See the tool description for the expected shape.`,
      },
      {
        name: 'confirmationToken',
        type: 'string',
        required: false,
        description: `Confirmation token returned by a previous call to this tool. Omit it on the first call: the server will describe what would be removed and issue a token. Only supply a token that the server issued, and only after the user has agreed to the described action.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_deleterestrictedurl',
    description: `Removes a gated URL from all content groups and access control. Decommissioning legacy pages or cleaning up URL definitions. Warning: Makes the page publicly accessible if no other access controls apply. Affects access across entire app. Restricted URL ID. Success confirmation.`,
    params: [
      {
        name: 'input',
        type: 'object',
        required: true,
        description: `Structured input payload for this operation. See the tool description for the expected shape.`,
      },
      {
        name: 'confirmationToken',
        type: 'string',
        required: false,
        description: `Confirmation token returned by a previous call to this tool. Omit it on the first call: the server will describe what would be removed and issue a token. Only supply a token that the server issued, and only after the user has agreed to the described action.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_deleterestrictedurlgroup',
    description: `Deletes a gated content group and all its relationships. Retiring protected sections or removing access restrictions. Warning: Removes content protection from all associated URLs, making them publicly accessible unless covered by other groups. Affects member access across multiple pages. Content Group ID. Success confirmation.`,
    params: [
      {
        name: 'input',
        type: 'object',
        required: true,
        description: `Structured input payload for this operation. See the tool description for the expected shape.`,
      },
      {
        name: 'confirmationToken',
        type: 'string',
        required: false,
        description: `Confirmation token returned by a previous call to this tool. Omit it on the first call: the server will describe what would be removed and issue a token. Only supply a token that the server issued, and only after the user has agreed to the described action.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_detachplansfromrestrictedurlgroup',
    description: `Revokes plan access from a content group. Restructuring membership offerings, consolidating tiers, or adjusting content access strategies. Members with detached plans lose access to group URLs. Immediately affects member access rights. Content Group ID and array of Plan IDs. Updated content group.`,
    params: [
      {
        name: 'input',
        type: 'object',
        required: true,
        description: `Structured input payload for this operation. See the tool description for the expected shape.`,
      },
      {
        name: 'confirmationToken',
        type: 'string',
        required: false,
        description: `Confirmation token returned by a previous call to this tool. Omit it on the first call: the server will describe what would be removed and issue a token. Only supply a token that the server issued, and only after the user has agreed to the described action.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_detachrestrictedurlsfromrestrictedurlgroup',
    description: `Removes URLs from a content group while preserving URL definitions. Adjusting protected content areas, refining access boundaries, or reassigning pages to different tiers. Detaches URLs from group's access rules but keeps URL records for reuse in other groups. Content Group ID and array of URL IDs. Updated content group.`,
    params: [
      {
        name: 'input',
        type: 'object',
        required: true,
        description: `Structured input payload for this operation. See the tool description for the expected shape.`,
      },
      {
        name: 'confirmationToken',
        type: 'string',
        required: false,
        description: `Confirmation token returned by a previous call to this tool. Omit it on the first call: the server will describe what would be removed and issue a token. Only supply a token that the server issued, and only after the user has agreed to the described action.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_explore_tools',
    description: `[STALE: no longer present in upstream Memberstack MCP tools/list as of 2026-08-19 refresh; left in repo per policy, not deleted] Browse available Memberstack tools by category or search term. Returns tool names with brief descriptions. Use get_tool_schema to load the full schema for a specific tool before calling it.`,
    params: [
      {
        name: 'category',
        type: 'string',
        required: false,
        description: `Filter tools by category. Accepted values: core, members, plans, dataTables, gatedContent, teams, customFields, stripe. Omit to see all.`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Search term to filter tools by name or description.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_exportmembers',
    description: `Initiates background job to export member data. Data analysis, backups, migration planning, regulatory compliance, or business intelligence. Choose export type (MEMBER for basic data, MEMBER_PLANS for subscriptions). Apply filters to target segments. Returns job ID for monitoring. Environment-specific (SANDBOX or LIVE). Job ID for tracking export progress.`,
    params: [
      {
        name: 'input',
        type: 'object',
        required: true,
        description: `Structured input payload for this operation. See the tool description for the expected shape.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_generatememberpassword',
    description: `Generates a new temporary password for a member. Customer support scenarios, urgent access recovery, or email delivery issues preventing standard reset. Creates system-generated password bypassing email reset flow. Should be shared securely and changed by member after login. Member ID. Member object with generated password.`,
    params: [
      {
        name: 'input',
        type: 'object',
        required: true,
        description: `Structured input payload for this operation. See the tool description for the expected shape.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_get_tool_schema',
    description: `[STALE: no longer present in upstream Memberstack MCP tools/list as of 2026-08-19 refresh; left in repo per policy, not deleted] Load the full input schema and usage instructions for a specific Memberstack tool by name.`,
    params: [
      {
        name: 'toolName',
        type: 'string',
        required: true,
        description: `Exact tool name returned by explore_tools, e.g. getMember.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_getcontentgroup',
    description: `Retrieves the full configuration for one gated content group by ID — all restricted URLs in the group, linked plans that grant access, custom content blocks (HTML/CSS/JS), and redirect settings. Use to prepare updates, validate plan-to-content assignments, or debug why members can/cannot access specific pages. Requires a Content Group ID.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Unique identifier of the record to operate on.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_getcontentgroups',
    description: `Lists all gated content groups (restricted URL groups) in the current app — for auditing content protection, understanding plan-to-URL access mappings, or troubleshooting member access. Gated content restricts pages/sections based on member plans. Each group returns its protected URLs, linked plans that grant access, custom content blocks, and redirect settings.`,
    params: [],
  },
  {
    name: 'memberstackmcp_getcustomfields',
    description: `Lists all custom fields configured for member profiles in the current app. Custom fields extend member profiles beyond email/password (e.g. company, phone, preferences) and are distinct from data tables. Returns CustomField objects with keys, labels, visibility settings, admin-only flags, and plan restrictions.`,
    params: [],
  },
  {
    name: 'memberstackmcp_getdatarecord',
    description: `Retrieves a single Data Record with all field values fully resolved. Loading specific entries like member profiles, product details, blog posts, or custom content. Data records are individual rows in data tables. Returns all field values, metadata, timestamps, and relational data. Environment-specific (SANDBOX or LIVE). Data Record ID. DataRecord object with complete field data.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Unique identifier of the record to operate on.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_getdatarecords',
    description: `Lists Data Records from a table with filtering, sorting, and pagination — for searching records, directories, catalogs, or querying custom data by criteria. Not for member accounts; use getMembers for auth/subscription data. Environment-specific (SANDBOX or LIVE). Requires a Table ID; returns a paginated connection of DataRecord objects.`,
    params: [
      {
        name: 'tableId',
        type: 'string',
        required: true,
        description: `Unique identifier of the parent data table.`,
      },
      {
        name: 'filter',
        type: 'object',
        required: false,
        description: `Filter object narrowing which records are returned.`,
      },
      {
        name: 'pagination',
        type: 'object',
        required: false,
        description: `Pagination options controlling page size and cursor.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_getdatatable',
    description: `Retrieves the complete schema and settings for one Data Table by its key — field definitions, data types, validation rules, and access controls. Use before creating records or validating field requirements. Data tables are custom database structures (member profiles, catalogs, posts, any structured data beyond basic auth). Requires the table key (a string, not an ID).`,
    params: [
      {
        name: 'key',
        type: 'string',
        required: true,
        description: `Unique key of the data table (not its ID).`,
      },
    ],
  },
  {
    name: 'memberstackmcp_getdatatablefield',
    description: `Retrieves detailed configuration for a specific field within a Data Table. Understanding field requirements before creating/updating records or validating data format compatibility. Returns data type (TEXT, NUMBER, DATE, BOOLEAN, REFERENCE, etc.), validation rules, required status, and default values. Field types determine storage format and validation behavior. Field ID. DataTableField object with complete specifications.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Unique identifier of the record to operate on.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_getdatatables',
    description: `Lists every Data Table in the current app. Discovering available data structures or getting an overview of the app's data architecture. Takes no arguments and returns the app's complete table list. There is no pagination, no search, and no name filtering. To find a table by name, call this and filter the results yourself. An array of DataTable objects.`,
    params: [],
  },
  {
    name: 'memberstackmcp_getmember',
    description: `Retrieves a single member's complete profile by ID. Viewing member details for support, troubleshooting access issues, or verifying status before updates. Members are end-users (distinct from dashboard users). Returns auth, custom fields, metadata, plan connections, payment status, team memberships, and permissions. Environment-specific (SANDBOX or LIVE). Member ID. Complete Member object.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: false,
        description: `Unique identifier of the record to operate on.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_getmemberevents',
    description: `Lists member activity events (logins, signups, plan changes, etc.) with pagination and filtering by member ID, event type, date range, or source — an audit trail for troubleshooting auth flows, tracking subscription changes, or analyzing behavior. Environment-specific (SANDBOX or LIVE). Returns a paginated MemberEventConnection.`,
    params: [
      {
        name: 'after',
        type: 'integer',
        required: false,
        description: `Pagination cursor to resume from a previous page.`,
      },
      {
        name: 'filters',
        type: 'object',
        required: false,
        description: `Filter object narrowing which records are returned.`,
      },
      {
        name: 'first',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return per page.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_getmembers',
    description: `Lists members (end-users, distinct from dashboard users) with pagination, filtering, and search — by plan, status, custom fields, or registration date. Environment-specific (SANDBOX or LIVE); use switchMemberstackEnvironment to target the correct dataset. Returns a paginated MemberConnection with essential fields (id, email, plans, dates); use getMember for full details.`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Pagination cursor to resume from a previous page.`,
      },
      {
        name: 'filters',
        type: 'object',
        required: false,
        description: `Filter object narrowing which records are returned.`,
      },
      {
        name: 'first',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return per page.`,
      },
      {
        name: 'order',
        type: 'string',
        required: false,
        description: `Sort order for the returned results. Accepted values: ASC, DESC.`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Search term to filter results.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_getmemberscount',
    description: `Returns the total count of members in the current app and environment. Verifying environment before bulk operations, checking member base size, or gathering metrics. Counts test members in SANDBOX mode; counts real production members in LIVE mode. Useful verification before running mutations. Integer count of members.`,
    params: [],
  },
  {
    name: 'memberstackmcp_getmemberstackenvironment',
    description: `Get the current environment (LIVE or SANDBOX) used for member-related operations.`,
    params: [],
  },
  {
    name: 'memberstackmcp_getplan',
    description: `Retrieves detailed configuration for a specific subscription plan by ID. Inspecting plan settings before updates, validating access logic, or understanding gated content rules for a tier. Plans control member access and payments. Returns pricing, redirects, plan logic (inheritance/removal rules), allowed domains, Stripe integration, team settings, and permissions. Plan ID. Complete Plan object with all configuration.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Unique identifier of the record to operate on.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_getplans',
    description: `Lists all subscription plans (membership tiers) in the current app. Auditing membership structure, discovering available plans before assignment, or configuring access rules. Plans define access levels and pricing. Returns status, prices, permissions, Stripe connections, and team settings. Supports filtering by active/inactive status. Array of Plan objects with complete metadata.`,
    params: [
      {
        name: 'input',
        type: 'object',
        required: false,
        description: `Structured input payload for this operation. See the tool description for the expected shape.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_getteam',
    description: `Retrieves details for a specific team subscription by ID. Managing team subscriptions, preparing invitations, or troubleshooting team access issues. Teams allow multiple members to share access under one plan (for businesses/groups). Returns invite token, capacity limits, current member count, and owner details. Environment-specific (SANDBOX or LIVE). Team ID. Team object with configuration and member count.`,
    params: [
      {
        name: 'input',
        type: 'object',
        required: false,
        description: `Structured input payload for this operation. See the tool description for the expected shape.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_getteammembers',
    description: `Lists all members belonging to a specific team. Auditing team membership, managing team capacity, or preparing to remove members. Shows complete roster with member details, join dates, roles (OWNER/MEMBER), and status. Useful for understanding team structure before management operations. Environment-specific (SANDBOX or LIVE). Team ID. Array of MemberTeamConnection objects.`,
    params: [
      {
        name: 'input',
        type: 'object',
        required: false,
        description: `Structured input payload for this operation. See the tool description for the expected shape.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_importmembers',
    description: `Bulk imports multiple members via background job processing. Platform migrations, bulk onboarding, seeding test environments, or transferring data from other systems. Input array of member objects with email (required), passwords (plain or hashed), custom fields, metadata, plans, and Stripe connections. Returns job ID for monitoring progress. Environment-specific (SANDBOX or LIVE). Warning: Bulk write to the CURRENT environment — confirm SANDBOX vs LIVE before importing, since importing into the wrong environment creates many records that are tedious to remove. Job ID and pending job count.`,
    params: [
      {
        name: 'input',
        type: 'object',
        required: true,
        description: `Structured input payload for this operation. See the tool description for the expected shape.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_importstripeproduct',
    description: `Imports an existing Stripe product as a Memberstack plan with automatic sync. Leveraging existing Stripe configurations, migrating from other platforms, or avoiding duplicate data entry. Syncs product metadata and pricing. Maintains consistency between Stripe and Memberstack. Paid Memberstack subscription, LIVE environment, connected Stripe account, and Stripe product ID. Imported Plan object.`,
    params: [
      {
        name: 'input',
        type: 'object',
        required: true,
        description: `Structured input payload for this operation. See the tool description for the expected shape.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_linkplanstorestrictedurlgroup',
    description: `Grants plan-based access to a content group by linking plans. Implementing tiered membership, premium content access, or subscription-based strategies. Members with linked plans gain access to all URLs in the group. Multiple plans can be linked for flexible access. Content Group ID and array of Plan IDs. Updated content group with linked plans.`,
    params: [
      {
        name: 'input',
        type: 'object',
        required: true,
        description: `Structured input payload for this operation. See the tool description for the expected shape.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_linkrestrictedurlstorestrictedurlgroup',
    description: `Attaches existing gated URLs to a content group. Bulk assigning access rules, consolidating access control, or reusing URL definitions across scenarios. URLs inherit the content group's plan requirements and access rules. Useful for complex content structures. Content Group ID and array of URL IDs. Updated content group with linked URLs.`,
    params: [
      {
        name: 'input',
        type: 'object',
        required: true,
        description: `Structured input payload for this operation. See the tool description for the expected shape.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_listapps',
    description: `List all Memberstack apps accessible to the dashboard user, including roles and creation dates.`,
    params: [],
  },
  {
    name: 'memberstackmcp_regenerateteaminvitetoken',
    description: `Regenerates team invite token, invalidating the previous one. Invite links expire, become compromised, or need distribution to new team members. Creates new secure invitation link for team onboarding. Essential for team security and managing growth. Team ID. Team object with new invite token.`,
    params: [
      {
        name: 'input',
        type: 'object',
        required: true,
        description: `Structured input payload for this operation. See the tool description for the expected shape.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_removefreeplan',
    description: `Removes a free plan from a member. Ending promotional access, removing trials, or adjusting complimentary access. Revokes access to plan's content/features. Preserves paid subscriptions. Takes effect immediately. Environment-specific (SANDBOX or LIVE). Member ID and Plan ID. Updated Member object.`,
    params: [
      {
        name: 'input',
        type: 'object',
        required: true,
        description: `Structured input payload for this operation. See the tool description for the expected shape.`,
      },
      {
        name: 'confirmationToken',
        type: 'string',
        required: false,
        description: `Confirmation token returned by a previous call to this tool. Omit it on the first call: the server will describe what would be removed and issue a token. Only supply a token that the server issued, and only after the user has agreed to the described action.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_removeonetimeplan',
    description: `Removes a one-time purchase plan from a member. Reversing accidental assignments, handling refunds, or correcting plan connections. One-time plans provide permanent access after single payment (lifetime, courses, products). Removal is permanent unless re-added. Environment-specific (SANDBOX or LIVE). Member ID and Plan ID. Updated Member object.`,
    params: [
      {
        name: 'input',
        type: 'object',
        required: true,
        description: `Structured input payload for this operation. See the tool description for the expected shape.`,
      },
      {
        name: 'confirmationToken',
        type: 'string',
        required: false,
        description: `Confirmation token returned by a previous call to this tool. Omit it on the first call: the server will describe what would be removed and issue a token. Only supply a token that the server issued, and only after the user has agreed to the described action.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_removeteammember',
    description: `Removes a member from a team plan. Team management, capacity optimization, or when members leave organizations. Revokes team plan benefits while maintaining individual account. Member retains individual subscriptions/free plans. Environment-specific (SANDBOX or LIVE). Team ID and Member ID. Success confirmation.`,
    params: [
      {
        name: 'input',
        type: 'object',
        required: true,
        description: `Structured input payload for this operation. See the tool description for the expected shape.`,
      },
      {
        name: 'confirmationToken',
        type: 'string',
        required: false,
        description: `Confirmation token returned by a previous call to this tool. Omit it on the first call: the server will describe what would be removed and issue a token. Only supply a token that the server issued, and only after the user has agreed to the described action.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_switchapp',
    description: `Set the active app context so all subsequent operations target the specified app.`,
    params: [
      {
        name: 'appId',
        type: 'string',
        required: true,
        description: `Unique identifier of the app to switch to. Retrieve app IDs using listApps.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_switchmemberstackenvironment',
    description: `Switch the environment (LIVE or SANDBOX) used for member operations. Only affects member-related tools.`,
    params: [
      {
        name: 'environment',
        type: 'string',
        required: true,
        description: `Environment for member operations. Accepted values: LIVE (production), SANDBOX (test data).`,
      },
    ],
  },
  {
    name: 'memberstackmcp_updatecustomcontent',
    description: `Updates name, type, or payload of a custom content block. Refining restriction messaging, improving conversion prompts, or updating content functionality. Modify display name, content type (HTML/CSS/JS/text), or actual payload. System maintains content control and security. Custom Content ID. Updated custom content object.`,
    params: [
      {
        name: 'input',
        type: 'object',
        required: true,
        description: `Structured input payload for this operation. See the tool description for the expected shape.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_updatecustomfield',
    description: `Updates configuration of an existing member custom field. Refining data collection strategy, adjusting visibility, or modifying access controls. Modify label, visibility (public/private/admin-only), or admin restrictions. Only field configuration changes - existing member data preserved. Custom Field ID. Updated CustomField object.`,
    params: [
      {
        name: 'input',
        type: 'object',
        required: true,
        description: `Structured input payload for this operation. See the tool description for the expected shape.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_updatedatarecord',
    description: `Updates field values in an existing Data Record. Correcting data entries, updating member profiles, or maintaining current information. Supports partial updates - only specified fields are changed. Values must comply with field validation rules. System tracks timestamps for audit purposes. Environment-specific (SANDBOX or LIVE). Record ID and updated field values (JSON). Updated DataRecord object.`,
    params: [
      {
        name: 'input',
        type: 'object',
        required: true,
        description: `Structured input payload for this operation. See the tool description for the expected shape.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_updatedatatable',
    description: `Updates metadata and access permissions for an existing Data Table. Renaming tables, changing access rules (PUBLIC/AUTHENTICATED/ADMIN_ONLY), or updating table documentation. Modifies table-level settings without affecting field structure or existing records. Cannot change properties that impact data integrity. Table ID. Updated DataTable object.`,
    params: [
      {
        name: 'input',
        type: 'object',
        required: true,
        description: `Structured input payload for this operation. See the tool description for the expected shape.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_updatedatatablefield',
    description: `Modifies configuration of an existing field within a Data Table. Refining field behavior, adding validation constraints, or adjusting default values. Update name, required status, or default values. Changes apply to future entries; existing records retain current values. Changing field type may affect compatibility. Field ID. Updated DataTableField object.`,
    params: [
      {
        name: 'input',
        type: 'object',
        required: true,
        description: `Structured input payload for this operation. See the tool description for the expected shape.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_updatemember',
    description: `Updates member profile details and settings. Member support, content moderation, profile corrections, or permission adjustments. Modify metadata (50 key-value pairs), custom fields, JSON data, verification status, moderator privileges, trust level, or redirects. Changes immediate. Environment-specific (SANDBOX or LIVE). Limitation: stripeCustomerId can only be set on a member who does not have one yet. Once a member is linked to a Stripe customer that link is permanent — it cannot be changed or removed here or by any other tool. Do not retry with a different value. Member ID. Updated Member object.`,
    params: [
      {
        name: 'input',
        type: 'object',
        required: true,
        description: `Structured input payload for this operation. See the tool description for the expected shape.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_updatememberauth',
    description: `Updates member authentication credentials (email, password, social providers). Member support, security management, or helping members regain access. Handles sensitive updates with validation and security. Password changes require current password unless passwordless. Environment-specific (SANDBOX or LIVE). Member ID and credential updates. Updated Member with auth changes.`,
    params: [
      {
        name: 'input',
        type: 'object',
        required: true,
        description: `Structured input payload for this operation. See the tool description for the expected shape.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_updatemembernote',
    description: `Creates or updates internal admin notes for a member. Tracking member interactions, support history, or important context for team collaboration. Notes visible only to dashboard users (admins). Environment-specific. Useful for customer support, account management, and maintaining relationship history. Member ID and note content. Updated Member with note.`,
    params: [
      {
        name: 'input',
        type: 'object',
        required: true,
        description: `Structured input payload for this operation. See the tool description for the expected shape.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_updateplan',
    description: `Updates configuration of an existing subscription plan. Iterating on membership strategy, adjusting pricing, or refining access controls. Modify metadata, redirects, permissions, allowed domains, team settings, member limits, and Stripe sync. Preserves existing member assignments. Changes affect future assignments. Plan ID. Updated Plan object.`,
    params: [
      {
        name: 'input',
        type: 'object',
        required: true,
        description: `Structured input payload for this operation. See the tool description for the expected shape.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_updateplanlogic',
    description: `Configures automation rules for plan additions, removals, and transitions. Creating sophisticated membership flows, automating lifecycle management, or handling plan migrations. Set rules for automatic plan add/remove based on member actions or events. Configure recurring cancellation and team member behaviors. System validates rules before persisting. Plan ID and logic rules (addedLogic/removedLogic). Updated Plan with logic configuration.`,
    params: [
      {
        name: 'input',
        type: 'object',
        required: true,
        description: `Structured input payload for this operation. See the tool description for the expected shape.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_updateprice',
    description: `Updates an existing price configuration and syncs with Stripe. Refining billing strategy, launching promotions, or adjusting trial/tax settings. Modify display name, expiration, setup fees, trial config, or team limits without disrupting active subscriptions. Preserves Stripe linkage. Paid Memberstack subscription, LIVE environment, connected Stripe account, and price ID. Updated Price object.`,
    params: [
      {
        name: 'input',
        type: 'object',
        required: true,
        description: `Structured input payload for this operation. See the tool description for the expected shape.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_updaterestrictedurl',
    description: `Updates URL path or filter behavior for a gated page. Page URLs change or refining URL matching patterns (exact match, wildcard, path prefix). Maintains access control integrity while modifying URL definitions. Restricted URL ID. Updated RestrictedUrl object.`,
    params: [
      {
        name: 'input',
        type: 'object',
        required: true,
        description: `Structured input payload for this operation. See the tool description for the expected shape.`,
      },
    ],
  },
  {
    name: 'memberstackmcp_updaterestrictedurlgroup',
    description: `Updates configuration of an existing gated content group. Refining content gating strategy, adjusting access requirements, or optimizing member experience. Modify group name, redirect behavior, or allow-all-members flag. Preserves existing URL associations and custom content. Content Group ID. Updated content group object.`,
    params: [
      {
        name: 'input',
        type: 'object',
        required: true,
        description: `Structured input payload for this operation. See the tool description for the expected shape.`,
      },
    ],
  },
]
