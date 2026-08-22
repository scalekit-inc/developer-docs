import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'claapmcp_create_admin_automation',
    description: `Create an admin automation in a Claap workspace. An admin automation applies actions (autoRecord, autoShare, moveToFolder i.e. auto-add to a folder, updateOverview i.e. auto-personalize the summary with the given sectionIds) to the meetings matching its filters. Filter types: MeetingType (Internal/External), OrganizerIs (meeting host), ParticipantsContains (people), RecorderUserGroupIs (team), TextContains/TextIs/TextExists (title), MeetingSourceIs, FolderIs (folder/channel). Filters are combined with the combineWith operator (Or by default) and each filter can be negated with not. By default new admin automations get the highest priority; set beforeAdminAutomationId to insert the automation right before another one instead. By default admin automations are enforced (disallowUserOverride: true), meaning members cannot override them. When name is omitted it is generated from the actions and filters. When authenticating as a user, only workspace admins can create admin automations. The autoRecord action cannot be combined with a FolderIs filter.`,
    params: [
      { name: 'actions', type: 'object', required: true, description: `No description.` },
      { name: 'workspaceId', type: 'string', required: true, description: `No description.` },
      {
        name: 'beforeAdminAutomationId',
        type: 'string',
        required: false,
        description: `No description.`,
      },
      { name: 'combineWith', type: 'string', required: false, description: `No description.` },
      {
        name: 'disallowUserOverride',
        type: 'boolean',
        required: false,
        description: `No description.`,
      },
      { name: 'filters', type: 'array', required: false, description: `No description.` },
      { name: 'name', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'claapmcp_create_company_field',
    description: `Create an AI field for companies in a Claap workspace. An AI field is a custom prompt with a typed output (paragraph, list, select, rating...) evaluated by AI against the activity of each company. The created field joins the workspace AI field library and can be used as a view column: its fieldId matches the AiSection column fieldIds returned by list_company_views and accepted by create_company_view and update_company_view. The field is not visible in the app until it is added to a view. Creating a field does not generate values for existing companies. Select and MultiSelect output types require coloredSelectOptions. Check list_company_fields first to avoid creating a duplicate of an existing field. When authenticating with an API key, creatorEmail is required and sets the field author.`,
    params: [
      { name: 'prompt', type: 'object', required: true, description: `No description.` },
      { name: 'title', type: 'string', required: true, description: `No description.` },
      { name: 'workspaceId', type: 'string', required: true, description: `No description.` },
      { name: 'creatorEmail', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'claapmcp_create_company_view',
    description: `Create a company view (saved preset) in a Claap workspace, with filters, sorting and columns. Discover valid column, filter and sort identifiers via search_companies and list_company_views. When authenticating with an API key, creatorEmail is required and sets the view owner.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `No description.` },
      { name: 'workspaceId', type: 'string', required: true, description: `No description.` },
      { name: 'columns', type: 'array', required: false, description: `No description.` },
      { name: 'creatorEmail', type: 'string', required: false, description: `No description.` },
      { name: 'description', type: 'string', required: false, description: `No description.` },
      { name: 'filters', type: 'object', required: false, description: `No description.` },
      { name: 'icon', type: 'string', required: false, description: `No description.` },
      { name: 'sort', type: 'array', required: false, description: `No description.` },
      { name: 'visibility', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'claapmcp_create_contact',
    description: `Create a contact in a Claap workspace with the same fields as the manual creation flow of the app: a name and an email address. If a contact already exists for this email, its name is updated instead. When authenticating with an API key, creatorEmail is required and sets the contact author.`,
    params: [
      { name: 'email', type: 'string', required: true, description: `Contact email address.` },
      { name: 'name', type: 'string', required: true, description: `Contact name.` },
      { name: 'workspaceId', type: 'string', required: true, description: `No description.` },
      {
        name: 'creatorEmail',
        type: 'string',
        required: false,
        description: `Email of the workspace member recorded as the author of this manual change.`,
      },
    ],
  },
  {
    name: 'claapmcp_create_contact_view',
    description: `Create a contact view (saved preset) in a Claap workspace, with filters, sorting and columns. Discover valid column, filter and sort identifiers via search_contacts and list_contact_views. When authenticating with an API key, creatorEmail is required and sets the view owner.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `No description.` },
      { name: 'workspaceId', type: 'string', required: true, description: `No description.` },
      { name: 'columns', type: 'array', required: false, description: `No description.` },
      { name: 'creatorEmail', type: 'string', required: false, description: `No description.` },
      { name: 'description', type: 'string', required: false, description: `No description.` },
      { name: 'filters', type: 'object', required: false, description: `No description.` },
      { name: 'icon', type: 'string', required: false, description: `No description.` },
      { name: 'sort', type: 'array', required: false, description: `No description.` },
      { name: 'visibility', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'claapmcp_create_deal_field',
    description: `Create an AI field for deals in a Claap workspace. An AI field is a custom prompt with a typed output (paragraph, list, select, rating...) evaluated by AI against all the activity of each deal (recordings and emails). The created field joins the workspace AI field library and can be used as a view column: its fieldId matches the AiSection column fieldIds returned by list_deal_views and accepted by create_deal_view and update_deal_view. The field is not visible in the app until it is added to a view. Creating a field does not generate values for existing deals. Select and MultiSelect output types require coloredSelectOptions. crmField maps the field to a CRM property and is validated against the connected CRM. Check list_deal_fields first to avoid creating a duplicate of an existing field. When authenticating with an API key, creatorEmail is required and sets the field author.`,
    params: [
      { name: 'prompt', type: 'object', required: true, description: `No description.` },
      { name: 'title', type: 'string', required: true, description: `No description.` },
      { name: 'workspaceId', type: 'string', required: true, description: `No description.` },
      { name: 'creatorEmail', type: 'string', required: false, description: `No description.` },
      { name: 'crmField', type: 'object', required: false, description: `No description.` },
    ],
  },
  {
    name: 'claapmcp_create_deal_view',
    description: `Create a deal view (saved preset) in a Claap workspace, with filters, sorting and columns (including AI-generated insight columns). Discover valid column, filter and sort identifiers via search_deals and list_deal_views. When authenticating with an API key, creatorEmail is required and sets the view owner.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `No description.` },
      { name: 'workspaceId', type: 'string', required: true, description: `No description.` },
      { name: 'columns', type: 'array', required: false, description: `No description.` },
      { name: 'creatorEmail', type: 'string', required: false, description: `No description.` },
      { name: 'description', type: 'string', required: false, description: `No description.` },
      { name: 'filters', type: 'object', required: false, description: `No description.` },
      { name: 'icon', type: 'string', required: false, description: `No description.` },
      { name: 'sort', type: 'array', required: false, description: `No description.` },
      { name: 'visibility', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'claapmcp_create_recording_field',
    description: `Create an AI field for meeting recordings in a Claap workspace. An AI field is a custom prompt with a typed output (paragraph, list, select, rating...) evaluated by AI against each recording transcript. The created field joins the workspace AI field library and can be used as a view column: its fieldId matches the AiSection column fieldIds returned by list_recording_views and accepted by create_recording_view and update_recording_view. The field is not visible in the app until it is added to a view. Creating a field does not generate values for existing recordings. Select and MultiSelect output types require coloredSelectOptions. crmField maps the field to a CRM property and is validated against the connected CRM. Check list_recording_fields first to avoid creating a duplicate of an existing field. When authenticating with an API key, creatorEmail is required and sets the field author.`,
    params: [
      { name: 'prompt', type: 'object', required: true, description: `No description.` },
      { name: 'title', type: 'string', required: true, description: `No description.` },
      { name: 'workspaceId', type: 'string', required: true, description: `No description.` },
      { name: 'creatorEmail', type: 'string', required: false, description: `No description.` },
      {
        name: 'crmField',
        type: 'object',
        required: false,
        description: `Optional mapping to a CRM property, validated against the connected CRM.`,
      },
    ],
  },
  {
    name: 'claapmcp_create_recording_view',
    description: `Create a recording view (saved preset) in a Claap workspace. A view is a curated set of recordings (meetings) with filters, sorting and columns (including AI-generated insight columns). Discover valid column identifiers, including AI insight fieldIds, via list_recording_views. Valid filter and sort fields are defined in the input schema of this tool. When authenticating with an API key, creatorEmail is required and sets the view owner.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `No description.` },
      { name: 'workspaceId', type: 'string', required: true, description: `No description.` },
      { name: 'columns', type: 'array', required: false, description: `No description.` },
      { name: 'creatorEmail', type: 'string', required: false, description: `No description.` },
      { name: 'description', type: 'string', required: false, description: `No description.` },
      { name: 'filters', type: 'object', required: false, description: `No description.` },
      { name: 'icon', type: 'string', required: false, description: `No description.` },
      { name: 'sort', type: 'array', required: false, description: `No description.` },
    ],
  },
  {
    name: 'claapmcp_get_company',
    description: `Get a single company of a Claap workspace with its full CRM fields, domains, related contactIds and dealIds. Discover the companyId via list_companies or search_companies.`,
    params: [
      {
        name: 'companyId',
        type: 'string',
        required: true,
        description: `Discover the companyId via list_companies or search_companies.`,
      },
      { name: 'workspaceId', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'claapmcp_get_company_view',
    description: `Fetch the rows of a Claap company view: each row is a company matching the view filters, with a value for each of the view columns. Discover available views via list_company_views. To fetch only the rows without column values, prefer list_companies with viewId.`,
    params: [
      {
        name: 'viewId',
        type: 'string',
        required: true,
        description: `The ID of the company view to fetch rows for. Use list_company_views to discover IDs.`,
      },
      { name: 'workspaceId', type: 'string', required: true, description: `No description.` },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Opaque cursor returned as \`nextCursor\` by a previous call. Pass the value VERBATIM to fetch the next page of results. Omit on the first call.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of results per page (default 10, max 100). ALWAYS paginate via \`nextCursor\`.`,
      },
    ],
  },
  {
    name: 'claapmcp_get_contact',
    description: `Get a single contact of a Claap workspace with its full CRM fields and its AI-generated summary when one has been generated. Discover the contactId via list_contacts or search_contacts.`,
    params: [
      {
        name: 'contactId',
        type: 'string',
        required: true,
        description: `Discover the contactId via list_contacts or search_contacts.`,
      },
      { name: 'workspaceId', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'claapmcp_get_contact_view',
    description: `Fetch the rows of a Claap contact view: each row is a contact matching the view filters, with a value for each of the view columns. Discover available views via list_contact_views. To fetch only the rows without column values, prefer list_contacts with viewId.`,
    params: [
      {
        name: 'viewId',
        type: 'string',
        required: true,
        description: `The ID of the contact view to fetch rows for. Use list_contact_views to discover IDs.`,
      },
      { name: 'workspaceId', type: 'string', required: true, description: `No description.` },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Opaque cursor returned as \`nextCursor\` by a previous call. Pass the value VERBATIM (do not construct, modify, decode, or invent a cursor) to fetch the next page of results. Omit on the first call.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of results per page (default 10, max 100). The response includes \`total\` and, when more results exist, \`nextCursor\`. ALWAYS paginate via \`nextCursor\`.`,
      },
    ],
  },
  {
    name: 'claapmcp_get_deal',
    description: `Get a single deal of a Claap workspace with its full CRM fields. Discover the dealId via list_deals or search_deals. When returnAiFields is true, the response includes the value of each AI field of the workspace deal library for this deal (answer and state); fields without a generated value have state Missing.`,
    params: [
      {
        name: 'dealId',
        type: 'string',
        required: true,
        description: `Discover the dealId via list_deals or search_deals.`,
      },
      { name: 'workspaceId', type: 'string', required: true, description: `No description.` },
      {
        name: 'returnAiFields',
        type: 'boolean',
        required: false,
        description: `Include the AI field values of the deal in aiFields.`,
      },
    ],
  },
  {
    name: 'claapmcp_get_deal_view',
    description: `Fetch the rows of a Claap deal view: each row is a deal matching the view filters, with a value for each of the view columns, including AI-generated insight columns. Discover available views via list_deal_views. To fetch only the rows without column values, prefer list_deals with viewId.`,
    params: [
      {
        name: 'viewId',
        type: 'string',
        required: true,
        description: `The ID of the deal view to fetch rows for. Use list_deal_views to discover IDs.`,
      },
      { name: 'workspaceId', type: 'string', required: true, description: `No description.` },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Opaque cursor returned as \`nextCursor\` by a previous call. Pass the value VERBATIM to fetch the next page of results. Omit on the first call.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of results per page (default 10, max 100). ALWAYS paginate via \`nextCursor\`.`,
      },
    ],
  },
  {
    name: 'claapmcp_get_email',
    description: `Fetch the full email content including the body for a given message ID from the workspace.`,
    params: [
      {
        name: 'messageId',
        type: 'string',
        required: true,
        description: `The email message ID to fetch.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: true,
        description: `The Claap workspace ID the email belongs to.`,
      },
    ],
  },
  {
    name: 'claapmcp_get_recording',
    description: `Get ONE recording (captured meeting or call) of a Claap workspace by recordingId, with its full metadata and its AI-generated summary. The summary is the cheap way to know what a meeting was about — prefer it over get_recording_transcript, which returns the entire transcript. Note the singular name: this tool takes exactly one recordingId and returns one recording. To search or filter across many recordings, use get_recordings (plural) instead. Discover the recordingId via get_recordings or search_recording_transcripts.`,
    params: [
      {
        name: 'recordingId',
        type: 'string',
        required: true,
        description: `Discover the recordingId via get_recordings or search_recording_transcripts.`,
      },
      { name: 'workspaceId', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'claapmcp_get_recording_transcript',
    description: `Fetch the full transcript for a given recording.`,
    params: [
      {
        name: 'recordingId',
        type: 'string',
        required: true,
        description: `The ID of the recording to get the transcript for.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: true,
        description: `The Claap workspace ID the recording belongs to.`,
      },
    ],
  },
  {
    name: 'claapmcp_get_recording_view',
    description: `Fetch the rows of a Claap recording view: each row is a recording matching the view filters, with AI-generated insight values for each of the view columns. Workspaces define their own views (common examples: MEDDIC/SPICED qualification, hiring rubrics, objection trackers). Discover available views via list_recording_views.`,
    params: [
      {
        name: 'viewId',
        type: 'string',
        required: true,
        description: `The ID of the recording view to fetch rows for.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: true,
        description: `The Claap workspace ID the view belongs to.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Opaque cursor returned as nextCursor by a previous call. Pass verbatim to fetch the next page.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of results per page (default 10, max 100).`,
      },
    ],
  },
  {
    name: 'claapmcp_get_recordings',
    description: `Query the recording metadata database with a set of filters. Returns a collection of recording metadata ordered by relevance and creation date descending.`,
    params: [
      {
        name: 'workspaceId',
        type: 'string',
        required: true,
        description: `The Claap workspace ID to query recordings from.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Opaque cursor returned as nextCursor by a previous call. Pass verbatim to fetch the next page.`,
      },
      {
        name: 'filters',
        type: 'object',
        required: false,
        description: `Filters to apply to the recording query.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of results per page (default 10, max 100).`,
      },
      {
        name: 'sort',
        type: 'array',
        required: false,
        description: `Sort dimensions. When omitted, results are ordered by relevance and creation date descending.`,
      },
    ],
  },
  {
    name: 'claapmcp_get_user',
    description: `Get a single user of a Claap workspace by userId or email, with its id, name, email, state, license and role.`,
    params: [
      { name: 'workspaceId', type: 'string', required: true, description: `No description.` },
      {
        name: 'email',
        type: 'string',
        required: false,
        description: `Email of the user to fetch.`,
      },
      {
        name: 'userId',
        type: 'string',
        required: false,
        description: `Discover the userId via list_users.`,
      },
    ],
  },
  {
    name: 'claapmcp_list_admin_automations',
    description: `List the admin automations of a Claap workspace, in priority order (the first admin automation has the highest priority). Admin automations automatically apply actions (autoRecord, autoShare, moveToFolder i.e. auto-add to a folder, updateOverview i.e. auto-personalize the summary) to the meetings matching their filters.`,
    params: [
      { name: 'workspaceId', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'claapmcp_list_companies',
    description: `List the companies of a Claap workspace, sorted by creation date descending and paginated with a cursor. Pass viewId to return the companies of a saved view, applying its filters and sorting. Use search_companies instead for other filtered or sorted queries, and get_company to read a single company.`,
    params: [
      { name: 'workspaceId', type: 'string', required: true, description: `No description.` },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Paginate the results starting at the cursor returned by a previous call.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Return at most "limit" results. Default 20.`,
      },
      {
        name: 'viewId',
        type: 'string',
        required: false,
        description: `Return only the companies of this view: its filters and sorting apply. Use list_company_views to discover view IDs.`,
      },
    ],
  },
  {
    name: 'claapmcp_list_company_fields',
    description: `List the AI field library of a Claap workspace for companies. An AI field is a custom prompt with a typed output (paragraph, list, select, rating...) evaluated by AI against the activity of each company. Returns the full definition of each field, including the fieldId accepted by update_company_field and by the AiSection columns of create_company_view and update_company_view. Archived fields are excluded unless includeArchived is true.`,
    params: [
      { name: 'workspaceId', type: 'string', required: true, description: `No description.` },
      {
        name: 'includeArchived',
        type: 'boolean',
        required: false,
        description: `Include archived AI fields in the results. Defaults to false.`,
      },
    ],
  },
  {
    name: 'claapmcp_list_company_views',
    description: `List the company views (saved presets) of a Claap workspace, with their viewId, filters, sorting and columns. Use it to find the viewId expected by get_company_view and update_company_view. Built-in default views are included and flagged with isDefault: true; they cannot be updated or deleted.`,
    params: [
      { name: 'workspaceId', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'claapmcp_list_contact_views',
    description: `List the contact views (saved presets) of a Claap workspace, with their viewId, filters, sorting and columns. Use it to find the viewId expected by get_contact_view and update_contact_view. Built-in default views are included and flagged with isDefault: true; they cannot be updated or deleted.`,
    params: [
      { name: 'workspaceId', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'claapmcp_list_contacts',
    description: `List the contacts of a Claap workspace, sorted by name ascending and paginated with a cursor. Pass viewId to return the contacts of a saved view, applying its filters and sorting. Use search_contacts instead for other filtered or sorted queries, and get_contact to read a single contact. Contacts bound to a workspace user (userId set, isExternal false) are included but cannot be modified with update_contact.`,
    params: [
      { name: 'workspaceId', type: 'string', required: true, description: `No description.` },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Paginate the results starting at the cursor returned by a previous call.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Return at most "limit" results. Default 20.`,
      },
      {
        name: 'viewId',
        type: 'string',
        required: false,
        description: `Return only the contacts of this view: its filters and sorting apply. Use list_contact_views to discover view IDs.`,
      },
    ],
  },
  {
    name: 'claapmcp_list_deal_fields',
    description: `List the AI field library of a Claap workspace for deals. An AI field is a custom prompt with a typed output (paragraph, list, select, rating...) evaluated by AI against all the activity of each deal (recordings and emails). Returns the full definition of each field, including the fieldId accepted by update_deal_field and by the AiSection columns of create_deal_view and update_deal_view. Archived fields are excluded unless includeArchived is true.`,
    params: [
      { name: 'workspaceId', type: 'string', required: true, description: `No description.` },
      {
        name: 'includeArchived',
        type: 'boolean',
        required: false,
        description: `Include archived AI fields in the results. Defaults to false.`,
      },
    ],
  },
  {
    name: 'claapmcp_list_deal_owners',
    description: `List the deal owners of the CRM connected to a Claap workspace (only Hubspot is supported), with their name and email. Use it to discover the valid ownerId values accepted by update_deal, or to find the ownerId of a known email with the email filter.`,
    params: [
      { name: 'workspaceId', type: 'string', required: true, description: `No description.` },
      {
        name: 'email',
        type: 'string',
        required: false,
        description: `Return only the owners with this email (exact match).`,
      },
    ],
  },
  {
    name: 'claapmcp_list_deal_stages',
    description: `List the deal stages of the CRM connected to a Claap workspace (only Hubspot is supported), with the pipeline each stage belongs to. Use it to discover the valid stageId values accepted by update_deal.`,
    params: [
      { name: 'workspaceId', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'claapmcp_list_deal_types',
    description: `List the deal types of the CRM connected to a Claap workspace (only Hubspot is supported). Use it to discover the valid typeId values accepted by update_deal.`,
    params: [
      { name: 'workspaceId', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'claapmcp_list_deal_views',
    description: `List the deal views (saved presets) of a Claap workspace, with their viewId, filters, sorting and columns. Use it to find the viewId expected by get_deal_view and update_deal_view. Built-in default views are included and flagged with isDefault: true; they cannot be updated or deleted.`,
    params: [
      { name: 'workspaceId', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'claapmcp_list_deals',
    description: `List the deals of a Claap workspace with their full CRM fields, sorted by opened date descending and paginated with a cursor. Pass viewId to return the deals of a saved view, applying its filters and sorting. Use search_deals instead for other filtered or sorted queries, and get_deal to read a single deal.`,
    params: [
      { name: 'workspaceId', type: 'string', required: true, description: `No description.` },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Paginate the results starting at the cursor returned by a previous call.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Return at most "limit" results. Default 20.`,
      },
      {
        name: 'viewId',
        type: 'string',
        required: false,
        description: `Return only the deals of this view: its filters and sorting apply. Use list_deal_views to discover view IDs.`,
      },
    ],
  },
  {
    name: 'claapmcp_list_emails',
    description: `List emails across the workspace with metadata (sender, recipients, subject, sent date). Supports filtering by contact, company, deal, or thread. Results are sorted by sent date.`,
    params: [
      {
        name: 'workspaceId',
        type: 'string',
        required: true,
        description: `The Claap workspace ID to list emails from.`,
      },
      { name: 'companyId', type: 'string', required: false, description: `Filter by company ID.` },
      {
        name: 'contactId',
        type: 'string',
        required: false,
        description: `Filter by contact ID (sender or recipient).`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Opaque cursor returned as nextCursor by a previous call. Pass verbatim to fetch the next page.`,
      },
      { name: 'dealId', type: 'string', required: false, description: `Filter by deal ID.` },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of results per page (default 10, max 100).`,
      },
      {
        name: 'sortBy',
        type: 'string',
        required: false,
        description: `Sort field. Defaults to sentAt.`,
      },
      {
        name: 'sortOrder',
        type: 'string',
        required: false,
        description: `Sort order. Defaults to desc (most recent first).`,
      },
      {
        name: 'threadId',
        type: 'string',
        required: false,
        description: `Filter by email thread ID.`,
      },
    ],
  },
  {
    name: 'claapmcp_list_recording_fields',
    description: `List the AI field library of a Claap workspace for meeting recordings. An AI field is a custom prompt with a typed output (paragraph, list, select, rating...) evaluated by AI against each recording transcript. Returns the full definition of each field, including the fieldId accepted by update_recording_field and by the AiSection columns of create_recording_view and update_recording_view. Archived fields are excluded unless includeArchived is true. One-off view sections that were never promoted to the library are not included; discover those via the AiSection columns of list_recording_views.`,
    params: [
      { name: 'workspaceId', type: 'string', required: true, description: `No description.` },
      {
        name: 'includeArchived',
        type: 'boolean',
        required: false,
        description: `Include archived AI fields in the results. Defaults to false.`,
      },
    ],
  },
  {
    name: 'claapmcp_list_recording_views',
    description: `List the recording views configured in a Claap workspace. A view is a curated set of recordings enriched with AI-generated insight columns. Common examples include sales qualification frameworks (MEDDIC, SPICED, BANT), hiring rubrics, and objection trackers. Prefer views over get_recordings when a view matches the user question. Use get_recording_view to read a specific view's rows.`,
    params: [
      {
        name: 'workspaceId',
        type: 'string',
        required: true,
        description: `The Claap workspace ID to list recording views from.`,
      },
    ],
  },
  {
    name: 'claapmcp_list_users',
    description: `List the users of a Claap workspace with their id, name, email, state, license and role, paginated with a cursor. Use this to resolve user ids for user-based filters. Use search_contacts instead to search external contacts.`,
    params: [
      { name: 'workspaceId', type: 'string', required: true, description: `No description.` },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Paginate the results starting at the cursor returned by a previous call. Pages may contain fewer than "limit" results; iterate until no nextCursor is returned.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Return at most "limit" results. Default 20.`,
      },
    ],
  },
  {
    name: 'claapmcp_list_views',
    description: `List the views (saved presets) of a Claap workspace across recordings (meetings), deals, companies and contacts, grouped by entity. Restrict the output with the entities parameter: the entities set to false are returned as empty arrays; when omitted, all entities are listed. Built-in default views are included and flagged with isDefault: true; they cannot be updated or deleted.`,
    params: [
      { name: 'workspaceId', type: 'string', required: true, description: `No description.` },
      { name: 'entities', type: 'object', required: false, description: `No description.` },
    ],
  },
  {
    name: 'claapmcp_list_workspaces',
    description: `List all Claap workspaces the user has access to.`,
    params: [],
  },
  {
    name: 'claapmcp_search_companies',
    description: `Search the Claap company database.`,
    params: [
      {
        name: 'workspaceId',
        type: 'string',
        required: true,
        description: `The Claap workspace ID to search within.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Opaque cursor returned as nextCursor by a previous call. Pass verbatim to fetch the next page.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of results per page (default 10, max 100).`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Complete or partial name or domain of the company to search for.`,
      },
      {
        name: 'sort',
        type: 'array',
        required: false,
        description: `Sort dimensions to apply to the search results.`,
      },
    ],
  },
  {
    name: 'claapmcp_search_contacts',
    description: `Search the Claap contact database. Returns both workspace users and external contacts.`,
    params: [
      {
        name: 'workspaceId',
        type: 'string',
        required: true,
        description: `The Claap workspace ID to search within.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Opaque cursor returned as nextCursor by a previous call. Pass verbatim to fetch the next page.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of results per page (default 10, max 100).`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Complete or partial name, email or domain of the contact to search for.`,
      },
      {
        name: 'sort',
        type: 'array',
        required: false,
        description: `Sort dimensions to apply to the search results. When omitted, results are ordered by relevance.`,
      },
    ],
  },
  {
    name: 'claapmcp_search_deals',
    description: `Search the Claap deal database with filters and sorting options.`,
    params: [
      {
        name: 'filters',
        type: 'object',
        required: true,
        description: `Filters to apply to the search.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: true,
        description: `The Claap workspace ID to search within.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Opaque cursor returned as nextCursor by a previous call. Pass verbatim to fetch the next page.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of results per page (default 10, max 100).`,
      },
      {
        name: 'sort',
        type: 'array',
        required: false,
        description: `Sort dimensions to apply to the search results.`,
      },
    ],
  },
  {
    name: 'claapmcp_search_emails',
    description: `Search email content using semantic or keyword search across the workspace. Returns results as chunks with text snippets and metadata. Multiple results can be related to the same email (different chunks from the same message). Supports filtering by contact, company, or deal.`,
    params: [
      {
        name: 'search',
        type: 'object',
        required: true,
        description: `Search query and technique.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: true,
        description: `The Claap workspace ID to search within.`,
      },
      { name: 'companyId', type: 'string', required: false, description: `Filter by company ID.` },
      {
        name: 'contactId',
        type: 'string',
        required: false,
        description: `Filter by contact ID (sender or recipient).`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Opaque cursor for keyword search pagination. Not supported for semantic search.`,
      },
      { name: 'dealId', type: 'string', required: false, description: `Filter by deal ID.` },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of results per page (default 10, max 100).`,
      },
    ],
  },
  {
    name: 'claapmcp_search_recording_transcripts',
    description: `Perform keyword or semantic search on the recording transcript database, with optional filters on the recording metadata. Returns a collection of transcript chunks grouped by recording.`,
    params: [
      {
        name: 'search',
        type: 'object',
        required: true,
        description: `Search query and technique.`,
      },
      {
        name: 'workspaceId',
        type: 'string',
        required: true,
        description: `The Claap workspace ID to search within.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Opaque cursor for keyword search pagination. Not supported for semantic search.`,
      },
      {
        name: 'filters',
        type: 'object',
        required: false,
        description: `Filters to apply to the search.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of results per page (default 10, max 100).`,
      },
    ],
  },
  {
    name: 'claapmcp_update_admin_automation',
    description: `Update an existing admin automation of a Claap workspace. This is a full replace: the admin automation becomes exactly what is sent, so always provide the complete desired actions, filters, combineWith and disallowUserOverride values (unlike update_recording_view, omitted fields are not preserved). Set beforeAdminAutomationId to move the automation right before another one; when omitted the priority is unchanged. Discover the adminAutomationId with list_admin_automations. When authenticating as a user, only workspace admins can update admin automations.`,
    params: [
      { name: 'actions', type: 'object', required: true, description: `No description.` },
      { name: 'adminAutomationId', type: 'string', required: true, description: `No description.` },
      { name: 'workspaceId', type: 'string', required: true, description: `No description.` },
      {
        name: 'beforeAdminAutomationId',
        type: 'string',
        required: false,
        description: `No description.`,
      },
      { name: 'combineWith', type: 'string', required: false, description: `No description.` },
      {
        name: 'disallowUserOverride',
        type: 'boolean',
        required: false,
        description: `No description.`,
      },
      { name: 'filters', type: 'array', required: false, description: `No description.` },
      { name: 'name', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'claapmcp_update_company_field',
    description: `Update an AI field for companies. This is a full replace: always send the complete desired definition (title and prompt). Discover fieldIds and current definitions via list_company_fields. The field is not visible in the app until it is added to a view.`,
    params: [
      { name: 'fieldId', type: 'string', required: true, description: `No description.` },
      { name: 'prompt', type: 'object', required: true, description: `No description.` },
      { name: 'title', type: 'string', required: true, description: `No description.` },
      { name: 'workspaceId', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'claapmcp_update_company_view',
    description: `Update an existing company view (saved preset). Only the provided top-level fields are changed; omitted ones are left as-is. Beware that filters is replaced as a whole: any filter missing from a provided filters object is cleared, including insights, which may have been set from the app. Send the filters returned by get_company_view with your changes applied. Pass icon as null to clear it, and description as an empty string to clear it. Discover the viewId via list_company_views.`,
    params: [
      { name: 'viewId', type: 'string', required: true, description: `No description.` },
      { name: 'workspaceId', type: 'string', required: true, description: `No description.` },
      { name: 'columns', type: 'array', required: false, description: `No description.` },
      { name: 'description', type: 'string', required: false, description: `No description.` },
      { name: 'filters', type: 'object', required: false, description: `No description.` },
      { name: 'icon', type: 'string', required: false, description: `No description.` },
      { name: 'name', type: 'string', required: false, description: `No description.` },
      { name: 'sort', type: 'array', required: false, description: `No description.` },
    ],
  },
  {
    name: 'claapmcp_update_contact',
    description: `Update the name and/or email address of an existing contact of a Claap workspace. Only the provided fields are changed; omitted fields are left as-is. Contacts bound to a workspace user cannot be edited, and the email of a contact linked to a CRM entity must be changed in the CRM instead. Discover the contactId via list_contacts or search_contacts. When authenticating with an API key, creatorEmail is required and sets the author of the change.`,
    params: [
      {
        name: 'contactId',
        type: 'string',
        required: true,
        description: `Discover the contactId via list_contacts or search_contacts.`,
      },
      { name: 'workspaceId', type: 'string', required: true, description: `No description.` },
      {
        name: 'creatorEmail',
        type: 'string',
        required: false,
        description: `Email of the workspace member recorded as the author of this manual change.`,
      },
      { name: 'email', type: 'string', required: false, description: `New contact email address.` },
      { name: 'name', type: 'string', required: false, description: `New contact name.` },
    ],
  },
  {
    name: 'claapmcp_update_contact_view',
    description: `Update an existing contact view (saved preset). Only the provided fields are changed; omitted fields are left as-is. Pass icon as null to clear it, and description as an empty string to clear it. Discover the viewId via list_contact_views.`,
    params: [
      { name: 'viewId', type: 'string', required: true, description: `No description.` },
      { name: 'workspaceId', type: 'string', required: true, description: `No description.` },
      { name: 'columns', type: 'array', required: false, description: `No description.` },
      { name: 'description', type: 'string', required: false, description: `No description.` },
      { name: 'filters', type: 'object', required: false, description: `No description.` },
      { name: 'icon', type: 'string', required: false, description: `No description.` },
      { name: 'name', type: 'string', required: false, description: `No description.` },
      { name: 'sort', type: 'array', required: false, description: `No description.` },
    ],
  },
  {
    name: 'claapmcp_update_deal',
    description: `Update an existing deal of a Claap workspace. The update is written to the connected CRM (only Hubspot is supported) then mirrored on the Claap deal. Only the provided fields are changed; omitted fields are left as-is. Discover the dealId via list_deals or search_deals, and the valid stageId, typeId and ownerId values via list_deal_stages, list_deal_types and list_deal_owners.`,
    params: [
      { name: 'dealId', type: 'string', required: true, description: `No description.` },
      { name: 'workspaceId', type: 'string', required: true, description: `No description.` },
      {
        name: 'amount',
        type: 'number',
        required: false,
        description: `Deal amount, in the currency configured in the CRM.`,
      },
      {
        name: 'closedAt',
        type: 'string',
        required: false,
        description: `Deal close date (ISO datetime).`,
      },
      {
        name: 'ownerId',
        type: 'string',
        required: false,
        description: `Deal owner id in the CRM (ownerCrmId). List the valid ids with the list_deal_owners tool.`,
      },
      {
        name: 'stageId',
        type: 'string',
        required: false,
        description: `Stage id in the CRM (stageCrmId). List the valid ids with the list_deal_stages tool.`,
      },
      { name: 'title', type: 'string', required: false, description: `Deal title.` },
      {
        name: 'typeId',
        type: 'string',
        required: false,
        description: `Deal type id in the CRM (dealTypeCrmId). List the valid ids with the list_deal_types tool.`,
      },
    ],
  },
  {
    name: 'claapmcp_update_deal_field',
    description: `Update an AI field for deals. This is a full replace: always send the complete desired definition (title, prompt, and the optional crmField); omitted optional fields are cleared. Discover fieldIds and current definitions via list_deal_fields. The field is not visible in the app until it is added to a view.`,
    params: [
      { name: 'fieldId', type: 'string', required: true, description: `No description.` },
      { name: 'prompt', type: 'object', required: true, description: `No description.` },
      { name: 'title', type: 'string', required: true, description: `No description.` },
      { name: 'workspaceId', type: 'string', required: true, description: `No description.` },
      { name: 'crmField', type: 'object', required: false, description: `No description.` },
    ],
  },
  {
    name: 'claapmcp_update_deal_view',
    description: `Update an existing deal view (saved preset). Only the provided fields are changed; omitted fields are left as-is. Pass icon as null to clear it, and description as an empty string to clear it. Discover the viewId via list_deal_views.`,
    params: [
      { name: 'viewId', type: 'string', required: true, description: `No description.` },
      { name: 'workspaceId', type: 'string', required: true, description: `No description.` },
      { name: 'columns', type: 'array', required: false, description: `No description.` },
      { name: 'description', type: 'string', required: false, description: `No description.` },
      { name: 'filters', type: 'object', required: false, description: `No description.` },
      { name: 'icon', type: 'string', required: false, description: `No description.` },
      { name: 'name', type: 'string', required: false, description: `No description.` },
      { name: 'sort', type: 'array', required: false, description: `No description.` },
    ],
  },
  {
    name: 'claapmcp_update_recording_field',
    description: `Update an AI field for meeting recordings. This is a full replace: always send the complete desired definition (title, prompt, and the optional crmField); omitted optional fields are cleared. Discover fieldIds and current definitions via list_recording_fields. The field is not visible in the app until it is added to a view.`,
    params: [
      { name: 'fieldId', type: 'string', required: true, description: `No description.` },
      { name: 'prompt', type: 'object', required: true, description: `No description.` },
      { name: 'title', type: 'string', required: true, description: `No description.` },
      { name: 'workspaceId', type: 'string', required: true, description: `No description.` },
      { name: 'crmField', type: 'object', required: false, description: `No description.` },
    ],
  },
  {
    name: 'claapmcp_update_recording_view',
    description: `Update an existing recording view (saved preset of meetings). Only the provided fields are changed; omitted fields are left as-is. Pass icon as null to clear it, and description as an empty string to clear it. Discover the viewId and valid column identifiers, including AI insight fieldIds, via list_recording_views. Valid filter and sort fields are defined in the input schema of this tool.`,
    params: [
      { name: 'viewId', type: 'string', required: true, description: `No description.` },
      { name: 'workspaceId', type: 'string', required: true, description: `No description.` },
      { name: 'columns', type: 'array', required: false, description: `No description.` },
      { name: 'description', type: 'string', required: false, description: `No description.` },
      { name: 'filters', type: 'object', required: false, description: `No description.` },
      { name: 'icon', type: 'string', required: false, description: `No description.` },
      { name: 'name', type: 'string', required: false, description: `No description.` },
      { name: 'sort', type: 'array', required: false, description: `No description.` },
    ],
  },
]
