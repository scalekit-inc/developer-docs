import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'hubspotmcp_get_campaign_analytics',
    description: `Retrieve engagement analytics (sessions, new contacts, influenced contacts) for one or more HubSpot campaigns.`,
    params: [
      {
        name: 'requests',
        type: 'array',
        required: false,
        description: `Required: List of analytics requests to process. Each entry is a full CampaignAnalyticsRequest. Maximum 20 requests per batch.`,
      },
    ],
  },
  {
    name: 'hubspotmcp_get_campaign_asset_metrics',
    description: `Retrieve performance metrics for assets (emails, landing pages, CTAs) associated with a campaign.`,
    params: [
      {
        name: 'assetType',
        type: 'string',
        required: true,
        description: `The asset type name, such as LANDING_PAGE, SITE_PAGE, BLOG_POST, or MEETING_EVENT. If invalid, the error will list valid types.`,
      },
      {
        name: 'campaignCrmObjectId',
        type: 'integer',
        required: true,
        description: `The numeric ID of the campaign to get asset metrics for. Must be greater than 0.`,
      },
      {
        name: 'crmObjectIds',
        type: 'array',
        required: false,
        description: `Optional list of CRM object IDs to scope metrics to specific assets. When omitted or empty, metrics are returned for all assets of the given assetType associated with the campaign.`,
      },
      {
        name: 'endDate',
        type: 'string',
        required: false,
        description: `End of the date range in YYYY-MM-DD format.`,
      },
      {
        name: 'startDate',
        type: 'string',
        required: false,
        description: `Start of the date range in YYYY-MM-DD format.`,
      },
    ],
  },
  {
    name: 'hubspotmcp_get_campaign_contacts_by_type',
    description: `Retrieve paginated contact IDs for a campaign filtered by attribution type (NEW_CONTACTS, INFLUENCED_CONTACTS, or ALL_CONTACTS).`,
    params: [
      {
        name: 'campaignCrmObjectId',
        type: 'integer',
        required: true,
        description: `The numeric object ID of the campaign. Must be greater than 0.`,
      },
      {
        name: 'contactType',
        type: 'string',
        required: true,
        description: `The contact attribution type: NEW_CONTACTS_FIRST_TOUCH (first marketing interaction was this campaign), NEW_CONTACTS_LAST_TOUCH (last interaction before conversion), or INFLUENCED_CONTACTS (any engagement within the date range).`,
      },
      {
        name: 'endDate',
        type: 'string',
        required: false,
        description: `End of the date range in YYYY-MM-DD format.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return per page.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Pagination offset — number of records to skip before returning results.`,
      },
      {
        name: 'startDate',
        type: 'string',
        required: false,
        description: `Start of the date range in YYYY-MM-DD format.`,
      },
    ],
  },
  {
    name: 'hubspotmcp_get_content_analytics_report',
    description: `Run a content analytics report across HubSpot landing pages, website pages, and blog posts for a given date range.`,
    params: [
      {
        name: 'mode',
        type: 'string',
        required: true,
        description: `Which report mode to run. TOTALS returns aggregated metrics per content; TIME_SERIES returns data points per period (requires contentIds and period); SUMMARY returns summarized points per period; PEOPLE returns the list of contacts or visitors who viewed the pages.`,
      },
      {
        name: 'contentIds',
        type: 'array',
        required: false,
        description: `Content IDs to filter results to. Numeric for pages and posts; composite string (e.g. hubdb-{tableId}-{rowId}) for HubDB rows. Leave empty to query all pages in the portal. Required for TIME_SERIES and PEOPLE modes.`,
      },
      {
        name: 'end',
        type: 'string',
        required: false,
        description: `End of the reporting period in YYYY-MM-DD format.`,
      },
      {
        name: 'excludedIds',
        type: 'array',
        required: false,
        description: `Content IDs to exclude from the result set. Same format as contentIds (numeric or composite string).`,
      },
      {
        name: 'includeMetadata',
        type: 'boolean',
        required: false,
        description: `TOTALS mode: include per-content metadata (title, URL, type) in the response.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return per page.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Pagination offset — number of records to skip before returning results.`,
      },
      {
        name: 'paginationCursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from the previous response to fetch the next page.`,
      },
      {
        name: 'peopleType',
        type: 'string',
        required: false,
        description: `PEOPLE mode: whether to return CONTACTS (known people) or VISITORS (anonymous). Required for PEOPLE mode.`,
      },
      {
        name: 'period',
        type: 'string',
        required: false,
        description: `TIME_SERIES or SUMMARY mode: bucket size for the time series. Required for those modes.`,
      },
      {
        name: 'scaleByPercent',
        type: 'boolean',
        required: false,
        description: `TOTALS mode: scale metric values by their percent contribution to the totals.`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Free-text search to filter content by title or URL.`,
      },
      {
        name: 'sortDirection',
        type: 'string',
        required: false,
        description: `TOTALS mode: sort direction. Ignored in other modes.`,
      },
      {
        name: 'sortMetric',
        type: 'string',
        required: false,
        description: `TOTALS mode: metric to sort by (e.g. rawViews, submissions, contacts). Ignored in other modes.`,
      },
      {
        name: 'start',
        type: 'string',
        required: false,
        description: `Start of the reporting period in YYYY-MM-DD format.`,
      },
    ],
  },
  {
    name: 'hubspotmcp_get_crm_objects',
    description: `Fetch multiple CRM objects of the same type in a single request by their IDs.`,
    params: [
      {
        name: 'objectType',
        type: 'string',
        required: true,
        description: `The HubSpot CRM object type to operate on (e.g. contacts, companies, deals).`,
      },
      {
        name: 'objectIds',
        type: 'array',
        required: false,
        description: `List of object IDs to fetch. Min: 1, Max: 100`,
      },
      {
        name: 'properties',
        type: 'array',
        required: false,
        description: `List of property names to include in results.`,
      },
    ],
  },
  {
    name: 'hubspotmcp_get_organization_details',
    description: `Retrieve organization-wide details including teams, job titles, seats, account settings, and timezone.`,
    params: [
      {
        name: 'include',
        type: 'array',
        required: false,
        description: `Optional list of data to include in the response.
Available values:
- TEAMS: Include the list of teams and their members
- SEATS: Include the list of seat/role names available in the account
- JOB_TITLES: Include the list of job titles assigned to users in the account
- ACCOUNT_INFORMATION: Include account details such as timezone, currency, and account type

If not specified or empty, all data will be returned.
Specify only the values you need to reduce response size.
Unrecognized values will result in an error.`,
      },
    ],
  },
  {
    name: 'hubspotmcp_get_properties',
    description: `Fetch property definitions for a CRM object type, including data types and enumeration values.`,
    params: [
      {
        name: 'objectType',
        type: 'string',
        required: true,
        description: `The HubSpot CRM object type to operate on (e.g. contacts, companies, deals).`,
      },
      {
        name: 'propertyNames',
        type: 'array',
        required: false,
        description: `The set of property names to retrieve`,
      },
    ],
  },
  {
    name: 'hubspotmcp_get_user_details',
    description: `Return details for the current user including team membership, CRM tool availability, and hub info.`,
    params: [
      {
        name: 'include',
        type: 'array',
        required: false,
        description: `Optional list of data sections to include in the user details response.
Available values:
- USER_INFORMATION: The current user's personal details (owner ID, name, email)
- TOOL_INFORMATION: Tool and CRM object type availability, including separate read/write access per object type
- TEAMS_AND_ROLES: The user's team memberships and role assignments

If not specified or empty, USER_INFORMATION and TOOL_INFORMATION sections are returned.
Specify only the sections you need to reduce response size.
Unrecognized values will result in an error.`,
      },
    ],
  },
  {
    name: 'hubspotmcp_manage_crm_objects',
    description: `Create or update CRM objects with properties and associations. Use createRequest to create, updateRequest to update.`,
    params: [
      {
        name: 'confirmationStatus',
        type: 'string',
        required: false,
        description: `User confirmation for write actions. Must be CONFIRMED or CONFIRMATION_NOT_REQUIRED.`,
      },
      {
        name: 'createRequest',
        type: 'object',
        required: false,
        description: `Required when creating new CRM objects.`,
      },
      {
        name: 'updateRequest',
        type: 'object',
        required: false,
        description: `Required when updating existing CRM objects.`,
      },
    ],
  },
  {
    name: 'hubspotmcp_manage_landing_page',
    description: `Read from or write to HubSpot landing pages. Specify the action field to control the operation (LIST, GET, CREATE, UPDATE, DELETE, etc.).`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: true,
        description: `Action to perform. One per call. READ actions (no side effects): "MODULES": list every module on the page draft. Each entry includes the module's field values, its layout position (sectionId, rowIndex, parentCellName when it lives inside a nested column, and cellWidth/cellX on the 12-column grid), and ownership flags (overrideable, globalOwned, globalPartialPath, themePartialOwned). Positions are populated even on a freshly created template page, before any edit. Capture a module's position here BEFORE you REMOVE or MOVE it so you can restore or reposition it precisely. Check ownership before REMOVE/MOVE: true global partials (header/footer) and global widgets are refused, but modules inside theme dnd_partial sections are removable and movable. "MODULE_TYPES": list available module types for this page's theme (call before INSERT). "MODULE_DEF": full field schema for a module type (requires modulePath). The response also includes the curated guide in moduleGuide when one exists, so a separate MODULE_GUIDE call is usually unnecessary. "MODULE_STYLES": read the layout styles (padding, margin, background, visibility) for a module (requires moduleId). "MODULE_GUIDE": (rarely needed — MODULE_DEF already returns the same guide inline) curated markdown for the modulePath covering required fields, common traps, and a minimal INSERT body. Errors if no guide exists; check MODULE_TYPES.hasGuide first. "REVISIONS": list recent page revisions for undo. "TEMPLATES": list landing page templates available in the portal (contentId not required). "FORMS": list forms available in the portal for embedding via the @hubspot/form module (contentId not required). Returns guid, name, portalId, formType, isPublished, createdAt, updatedAt. "BRAND_KIT": fetch the portal's primary brand kit (colors, fonts, logos) when brand-consistent content would help — e.g. picking a CTA color, a hero font, or a logo to drop into a header (contentId not required). WRITE actions (mutate the same shared draft — issue them ONE AT A TIME, never in parallel): "CLONE": duplicate an existing page (requires contentId of the source page; optional pageName and slug for the clone). Returns a new contentId. "CREATE_FROM_TEMPLATE": create the page from a template (requires pageName and templatePath; optional slug). MUST be preceded by a proposal card (call render_landing_page_ui directly with a "propose" target — there is no separate write step to propose) and an explicit user confirmation IN CHAT — never the first step of creating a page, and choosing a template is NOT confirmation. Returns contentId. "SET_MODULE_FIELDS": verbatim field patch on one module (requires contentId, moduleId, fieldOverridesJson). "SET_MODULE_STYLES": set layout styles (padding, margin, background, visibility) on one module (requires contentId, moduleId, stylesJson). Merge semantics — only supplied fields are updated. Call action=MODULE_STYLES first to see current values. "SET_SECTION_STYLES": set the background, padding, margin, or full-width of the ENTIRE SECTION band a module sits in (requires contentId, moduleId, stylesJson; moduleId is any module inside the band, used as an anchor). This is the correct way to do "make this section's background <color>" — do NOT inject CSS via SET_METADATA headHtml for section backgrounds. Merge semantics. Page-scoped bands — including theme dnd_partial sections — CAN be styled; only true global sections (header/footer/global widgets) are refused. "INSERT": add a new module (requires contentId, modulePath; then EITHER anchorModuleId+anchorPosition for anchor-based placement, OR sectionId+rowStart+columnStart+columnsSpanned for grid-coord placement; optional fieldOverridesJson). "REMOVE": delete one module (requires contentId, moduleId). If it was the last module in its section band, the now-empty band — background and padding included — is collapsed too, so no empty "Drop modules here" ghost band is left behind. "REMOVE_SECTION": delete the ENTIRE section band a module sits in — the whole top-level row, every module in it, AND the band's own background/padding styles (requires contentId, moduleId; moduleId is any module inside the target band, used as an anchor). Page-scoped sections — including theme dnd_partial sections like a logo bar — CAN be removed; only true global sections are refused. "MOVE": reposition module (requires contentId, moduleId; optional sectionId, rowStart, columnStart). "SET_METADATA": update page metadata — pageName, htmlTitle, slug, metaDescription, featuredImageUrl, language, headHtml (requires contentId; all metadata fields optional). "PUBLISH": publish draft (requires contentId; confirm with the user first). "RESTORE_REVISION": roll back to revision (requires contentId, revisionId; confirm first).`,
      },
      {
        name: 'anchorModuleId',
        type: 'string',
        required: false,
        description: `Anchor-based placement: moduleId of an existing module that the new INSERT should land relative to. When provided, omit rowStart / columnStart / columnsSpanned — the backend resolves the target row from the anchor and auto-redistributes column widths across siblings. Pair with anchorPosition.`,
      },
      {
        name: 'anchorPosition',
        type: 'string',
        required: false,
        description: `Anchor placement direction. Used with anchorModuleId on INSERT. Values: "BEFORE" (new module on a new row immediately above the anchor's row), "AFTER" (new row immediately below), "IN_ROW_WITH" (sibling cell appended to the right of all existing cells in the anchor's row — siblings give up width), "IN_ROW_BEFORE" (sibling cell positioned to the LEFT of the anchor within the same row), "IN_ROW_AFTER" (sibling cell positioned to the RIGHT of the anchor within the same row, regardless of any cells beyond the anchor), "START_OF_SECTION" (first row of anchor's section), "END_OF_SECTION" (last row of anchor's section), "STACK_ABOVE" (wrap the anchor in a column and place the new module ABOVE it as a stacked row), "STACK_BELOW" (same, stacked BELOW). STACK_* builds a "unified section" — both modules share ONE wrapper cell as separate rows (the shape the editor's drag-to-stack creates); use it instead of BEFORE/AFTER when the two modules should read as one visual group rather than independent section rows. STACK requires a module anchor inside a section (not a top-level section id).`,
      },
      {
        name: 'availableForNewContent',
        type: 'boolean',
        required: false,
        description: `When action=TEMPLATES: filter to templates available for new page creation. Omit to return all templates.`,
      },
      {
        name: 'columnsSpanned',
        type: 'integer',
        required: false,
        description: `Width in columns on the 12-column grid. Required for INSERT when using legacy grid-coord placement. Full width=12, two halves=6 each, three thirds=4 each. Omit when using anchor-based placement (anchorModuleId + anchorPosition) — width is computed automatically by stealing from siblings.`,
      },
      {
        name: 'columnStart',
        type: 'integer',
        required: false,
        description: `1-based column position on a 12-column grid. Required for INSERT (grid-coord placement). Optional for MOVE. columnStart=1 is leftmost.`,
      },
      {
        name: 'contentId',
        type: 'integer',
        required: false,
        description: `Content ID of the landing page. Required for most actions. NOT required for CREATE_FROM_TEMPLATE (creates a new page), TEMPLATES, FORMS, BRAND_KIT, MODULE_DEF, and MODULE_GUIDE.`,
      },
      {
        name: 'featuredImageUrl',
        type: 'string',
        required: false,
        description: `Featured image URL for social sharing. Only used for SET_METADATA. Omit to leave unchanged.`,
      },
      {
        name: 'fieldOverridesJson',
        type: 'string',
        required: false,
        description: `JSON object of verbatim field values (e.g. {"heading":"Close deals faster"}). Required for SET_MODULE_FIELDS. Optional for INSERT (sets initial field values on the new module).`,
      },
      {
        name: 'folderName',
        type: 'string',
        required: false,
        description: `When action=TEMPLATES: filter by folder name (e.g. "my-theme/templates").`,
      },
      {
        name: 'headHtml',
        type: 'string',
        required: false,
        description: `Raw HTML injected into <head> (e.g. "<style>body{background:#2563eb}</style>"). Only used for SET_METADATA. Omit to leave unchanged.`,
      },
      {
        name: 'htmlTitle',
        type: 'string',
        required: false,
        description: `HTML <title> tag for the page (~50–60 chars). Only used for SET_METADATA. Omit to leave unchanged.`,
      },
      {
        name: 'language',
        type: 'string',
        required: false,
        description: `ISO-639-1 language code (e.g. "en", "de"). Used for SET_METADATA (omit to leave unchanged).`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return per page.`,
      },
      {
        name: 'metaDescription',
        type: 'string',
        required: false,
        description: `Meta description for search snippets (~140–160 chars). Only used for SET_METADATA. Omit to leave unchanged.`,
      },
      {
        name: 'moduleId',
        type: 'string',
        required: false,
        description: `Module ID to operate on. Required for SET_MODULE_FIELDS, SET_MODULE_STYLES, SET_SECTION_STYLES, REMOVE, REMOVE_SECTION, MOVE, and MODULE_STYLES. For REMOVE_SECTION and SET_SECTION_STYLES it is any module inside the target section band (an anchor). Find IDs via action=MODULES.`,
      },
      {
        name: 'modulePath',
        type: 'string',
        required: false,
        description: `Module type path (e.g. "@hubspot/rich_text"). Required for INSERT, MODULE_DEF, and MODULE_GUIDE. Use paths exactly as returned by action=MODULE_TYPES.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Pagination offset — number of records to skip before returning results.`,
      },
      {
        name: 'pageName',
        type: 'string',
        required: false,
        description: `Name for the landing page. Required for CREATE_FROM_TEMPLATE. Optional for CLONE (defaults to a copy of the source page name). Also used by SET_METADATA to update the internal listing name shown in the HubSpot content listing UI (not the HTML title).`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Text to search for within the default searchable properties of the specified object type.`,
      },
      {
        name: 'responseFormat',
        type: 'string',
        required: false,
        description: `Verbosity of the response. "DETAILED" returns all fields and is the default when omitted. "SUMMARY" trims verbose fields to save tokens on large pages: when action=MODULES, drops module field values and returns only module IDs, modulePaths, and section info. For MODULE_TYPES, MODULE_DEF, and REVISIONS, SUMMARY currently returns the same payload as DETAILED.`,
      },
      {
        name: 'revisionId',
        type: 'string',
        required: false,
        description: `Revision ID to restore. Required for RESTORE_REVISION. Find IDs via action=REVISIONS.`,
      },
      {
        name: 'rowStart',
        type: 'integer',
        required: false,
        description: `1-based row position within the section. Required for INSERT (grid-coord placement). Optional for MOVE. Modules with the same rowStart and sectionId are placed side-by-side.`,
      },
      {
        name: 'sectionId',
        type: 'string',
        required: false,
        description: `Layout section ID to place the module in. Required for INSERT (grid-coord placement). Optional for MOVE (omit to keep current section). Find section IDs via action=MODULES.`,
      },
      {
        name: 'slug',
        type: 'string',
        required: false,
        description: `URL slug (lowercase, hyphenated, no leading slash). Used for SET_METADATA (omit to leave unchanged), CREATE_FROM_TEMPLATE (omit to derive from pageName), or CLONE (omit to auto-generate).`,
      },
      {
        name: 'stylesJson',
        type: 'string',
        required: false,
        description: `JSON object of structured layout styles to merge. Required for SET_MODULE_STYLES (onto a module) and SET_SECTION_STYLES (onto a section band). Uses merge semantics: only supplied fields are updated, existing styles are preserved. Shape: {"breakpoint_styles":{"default":{"padding":{"top":{"value":20,"units":"px"}},"margin":{"top":{"value":10,"units":"px"}}}}}. Supported breakpoints: "default" (desktop), "mobile". Supported spacing sides — padding: top, right, bottom, left; margin: top, bottom. Each side is a Size: {"value":<number>,"units":"px"|"em"|"rem"|..."}. Background color (mainly for SET_SECTION_STYLES) goes in the top-level backgroundColor field as r/g/b/a: {"backgroundColor":{"r":255,"g":238,"b":0,"a":1}} (r/g/b 0–255, a 0–1). Section-only fields (SET_SECTION_STYLES): "forceFullWidthSection":true OR "maxWidthSectionCentering":<px> (mutually exclusive). Use camelCase keys (e.g. backgroundColor, breakpointStyles, forceFullWidthSection) — they mirror what action=MODULE_STYLES returns. Also supports per-breakpoint "hidden":true/false to toggle visibility. Layout only — for TEXT color use the separate textColor field, not this.`,
      },
      {
        name: 'templatePath',
        type: 'string',
        required: false,
        description: `Template path to build the page on. Required for CREATE_FROM_TEMPLATE. Use action=TEMPLATES to discover available templates, then pass the templatePath exactly as returned.`,
      },
      {
        name: 'textColor',
        type: 'string',
        required: false,
        description: `For action=SET_MODULE_STYLES: set the text color of ALL text in a module (headings, paragraphs, list items) to this CSS color, e.g. "#cc0000", "red", or "rgb(204,0,0)". This is the reliable way to recolor module text — it writes a scoped, !important rule the renderer applies to the module's own elements, overriding the theme. Do NOT hand-roll headHtml CSS for text color, and do NOT use it to recolor a whole section (use the section's sectionStyleVariant for that). Supply with moduleId; may be combined with stylesJson.`,
      },
      {
        name: 'themePath',
        type: 'string',
        required: false,
        description: `When action=TEMPLATES: filter templates by theme path. Use for HubSpot themes ("@hubspot/elevate", "@hubspot/growth"), marketplace themes ("@marketplace/vendor/theme-name"), or custom themes ("my-custom-theme"). Omit to return templates across all themes.`,
      },
    ],
  },
  {
    name: 'hubspotmcp_query_crm_data',
    description: `Query HubSpot CRM data using SQL with HubSpot-specific extensions. Call get_properties first to discover valid property names.`,
    params: [
      {
        name: 'sql',
        type: 'string',
        required: true,
        description: `SQL query to execute against HubSpot CRM data.`,
      },
      {
        name: 'chatInsights',
        type: 'object',
        required: false,
        description: `Insights about the chat including user intent and satisfaction level.`,
      },
      {
        name: 'verbosityLevel',
        type: 'string',
        required: false,
        description: `Controls the amount of data returned in the response:
- LOW: Data only, no citation links
- MEDIUM/HIGH: Data with citation links for each record when available`,
      },
    ],
  },
  {
    name: 'hubspotmcp_render_landing_page_ui',
    description: `Display the landing page card (preview image and open-in-editor link) in the chat UI.`,
    params: [
      {
        name: 'target',
        type: 'string',
        required: true,
        description: `What to render. Use a "propose" target (pageName, pageDescription, goal) to show the proposal card for a page that does not exist yet, or a "result" target carrying a contentId to show the result card for an existing page.`,
      },
    ],
  },
  {
    name: 'hubspotmcp_search_crm_objects',
    description: `Search and retrieve CRM records from HubSpot using filters, sorting, and keyword queries.`,
    params: [
      {
        name: 'objectType',
        type: 'string',
        required: true,
        description: `The HubSpot CRM object type to operate on (e.g. contacts, companies, deals).`,
      },
      {
        name: 'chatInsights',
        type: 'object',
        required: false,
        description: `Insights about the chat including user intent and satisfaction level.
IMPORTANT: MUST be provided for all scenarios.`,
      },
      {
        name: 'filterGroups',
        type: 'array',
        required: false,
        description: `* The filter groups that define the search criteria.
 * Filters that match ALL of several conditions (AND logic) should be put in the same filterGroup.
 * Filters that match AT LEAST ONE of several conditions (OR logic) should be put in a separate filterGroup.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return per page.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Pagination offset — number of records to skip before returning results.`,
      },
      {
        name: 'properties',
        type: 'array',
        required: false,
        description: `List of property names to include in results.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Text to search for within the default searchable properties of the specified object type.`,
      },
      {
        name: 'sorts',
        type: 'array',
        required: false,
        description: `Optional sorting rules for results. Only one sort rule can be applied`,
      },
    ],
  },
  {
    name: 'hubspotmcp_search_owners',
    description: `List and search for HubSpot owners who can be assigned to CRM records.`,
    params: [
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of results to return per page.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Pagination offset — number of records to skip before returning results.`,
      },
      {
        name: 'ownerIds',
        type: 'array',
        required: false,
        description: `Optional list of owner IDs to lookup directly. When provided, search query is ignored`,
      },
      {
        name: 'searchQuery',
        type: 'string',
        required: false,
        description: `Optional search query to find owners by name or email. Returns all owners if not provided`,
      },
    ],
  },
  {
    name: 'hubspotmcp_search_properties',
    description: `Find the most relevant CRM property definitions using keyword-based search.`,
    params: [
      {
        name: 'objectType',
        type: 'string',
        required: true,
        description: `The HubSpot CRM object type to operate on (e.g. contacts, companies, deals).`,
      },
      {
        name: 'keywords',
        type: 'array',
        required: false,
        description: `Multiple search keywords (max 5) to find relevant properties using efficient keyword-based search.
Supports searching for multiple related property concepts in a single request.

Examples:
- ["urgency"] - Single keyword search
- ["assignee", "assigned_to", "owner"] - Multiple related keywords for assignment
- ["name", "employees", "zip", "contact"] - Multiple unrelated keywords for different properties

If both query and keywords are provided, keywords takes precedence.
If empty and no query provided, returns all properties for the object type.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Text to search for within the default searchable properties of the specified object type.`,
      },
    ],
  },
  {
    name: 'hubspotmcp_submit_feedback',
    description: `Submit user feedback about the HubSpot MCP connector to HubSpot.`,
    params: [
      {
        name: 'explanationOfSatisfaction',
        type: 'string',
        required: true,
        description: `Brief explanation of what went wrong from the agent's perspective.

When errors occurred: Explain why the agent made a request that failed validation, including what the agent's reasoning was and why it failed. This helps with investigation and improvement. Example: 'Error: "A non-empty list of objects to create or update must be provided" - Agent attempted to batch update contacts but incorrectly passed an empty list because it filtered out all objects based on a misunderstanding of the user's criteria.'`,
      },
      {
        name: 'feedback',
        type: 'string',
        required: true,
        description: `User's verbatim feedback about the HubSpot connector. CRITICAL RULES:
- Use the user's EXACT words. NEVER paraphrase, summarize, or rewrite.
- If the user said it in their language, keep it in their language.
- If the user hasn't typed specific feedback yet, do NOT fill this in yourself — ask them first.
- Avoid PII — use anonymized references.`,
      },
      {
        name: 'goal',
        type: 'string',
        required: true,
        description: `User's goal or what they were trying to accomplish and relevant conversation context.
Avoid PII - use anonymized references.
Important: Avoid adding extraneous information, especially from memory.`,
      },
      {
        name: 'feedbackType',
        type: 'string',
        required: false,
        description: `Category of the feedback being submitted. Used to triage and analyze feedback trends.
- PROBLEM: Something is broken or not working as expected (errors, incorrect results, bugs).
- FEATURE_REQUEST: A request for new functionality or capability, including enhancements to existing features that would require new behavior to be built.
- GENERAL_FEEDBACK: Opinions, observations, or suggestions about an existing tool or workflow — e.g., usability impressions, praise, workflow friction, or improvement ideas that don't rise to the level of a bug report or feature request.
- OTHER: Use only when the feedback genuinely does not fit any of the above categories.`,
      },
      {
        name: 'sourceInterface',
        type: 'string',
        required: false,
        description: `Where the feedback originated.
- MCP_UI: Submitted from the dedicated in-app feedback UI rendered by the MCP host (e.g. a feedback form/widget the user explicitly opened).
- NON_UI: Submitted from a regular chat conversation (no dedicated feedback UI).`,
      },
      {
        name: 'triggeringToolName',
        type: 'string',
        required: false,
        description: `Name of the HubSpot tool related to this feedback.
IMPORTANT: This tool ONLY collects feedback about HubSpot connector tools.
Do NOT submit feedback about non-HubSpot tools (e.g. Slack, Microsoft 365, Notion, iMessage, Intercom, Bash, etc.).`,
      },
    ],
  },
  {
    name: 'hubspotmcp_tool_guidance',
    description: `Retrieve usage instructions and guidance for one or more HubSpot MCP tools.`,
    params: [
      {
        name: 'toolNames',
        type: 'array',
        required: true,
        description: `List of tool names to get usage instructions for`,
      },
    ],
  },
]
