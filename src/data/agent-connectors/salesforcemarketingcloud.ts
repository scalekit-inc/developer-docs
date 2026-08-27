import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'salesforcemarketingcloud_address_email_validate',
    description: `Validate an email address's syntax and deliverability using Marketing Cloud's Address Verification API. Choose one or more validators: SyntaxValidator checks for basic structural validity (e.g. presence of '@' and a domain with a '.'), MXValidator checks the domain has a valid DNS MX record, and ListDetectiveValidator checks the address's username or domain against a known bad-address filtering list. This is a read-only check -- it does not modify any Marketing Cloud data. Returns a validation result indicating whether the address passed each requested validator. Example: email 'help@example.com' with all three validators.`,
    params: [
      {
        name: 'email',
        type: 'string',
        required: true,
        description: `The email address to validate, e.g. 'help@example.com'.`,
      },
      {
        name: 'validators',
        type: 'array',
        required: false,
        description: `Which validators to run against the email address. SyntaxValidator checks basic format, MXValidator checks the domain's DNS MX record, and ListDetectiveValidator checks against a known bad-address list. Defaults to running all three.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_approval_item_create',
    description: `Create an approval item and its associated workflow item in Salesforce Marketing Cloud via the Approvals API. Approval items route a Marketing Cloud object (such as an email send, journey, or asset) through a configured approval workflow before it can proceed. Requires the id of an existing workflow item (workflow_item_id) — approval workflows are configured in Marketing Cloud Setup. Fails with 409 if an active approval already exists for the given object, or 400 if required fields are missing or the workflow/team/approver configuration is invalid.`,
    params: [
      {
        name: 'deadline',
        type: 'string',
        required: true,
        description: `Deadline for the approval item as an ISO 8601 datetime, e.g. 2026-09-01T17:00:00Z. After this time the approval may be flagged as overdue depending on workflow configuration.`,
      },
      {
        name: 'description',
        type: 'string',
        required: true,
        description: `Description of the approval item, explaining what is being approved and any relevant context for approvers.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Name of the approval item, shown in the Approvals UI.`,
      },
      {
        name: 'object_id',
        type: 'string',
        required: true,
        description: `The unique id of the Marketing Cloud object this approval item is associated with, e.g. an email send definition key or asset id, matching object_type.`,
      },
      {
        name: 'object_type',
        type: 'string',
        required: true,
        description: `The type of Marketing Cloud object this approval item is associated with, e.g. an email definition, asset, or journey. Consult your Marketing Cloud Approvals configuration for the exact object type strings supported in your account.`,
      },
      {
        name: 'workflow_item_id',
        type: 'string',
        required: true,
        description: `The id of the existing approval workflow item to attach this approval to. Approval workflows are configured in Marketing Cloud Setup under Approvals.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_approval_item_get',
    description: `Retrieve a single approval item by its unique ID from Salesforce Marketing Cloud's Approvals v2 REST API. The approval item must belong to (be visible to) the current user's approval context. The response includes the approval's name, description, workflow state (e.g. draft, submitted, reviewed, approved), workflow type, deadline, comment counts, and the workflow item's current state and available transitions based on the current user's roles.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique ID of the approval item to retrieve. Obtain this from the List Approval Items tool's response (approvalItemId).`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_approval_item_roles_list',
    description: `List the roles defined for a given Approvals v2 item and the users assigned to each role, via GET /hub/v1/approvals-v2/{id}/roles on Salesforce Marketing Cloud's Approvals REST API. Use this alongside Get Approval Item to see who can act on (review or approve) a specific approval item, and in what capacity. Confidence note: existence of this route was confirmed only via a search-indexed documentation page title; the exact shape of the returned roles/assignments has not been independently verified, so treat the returned fields as best-effort until confirmed against a live response.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique ID of the approval item whose roles you want to list. Obtain this from the List Approval Items tool's response (approvalItemId).`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_approval_items_list',
    description: `List approval items in Salesforce Marketing Cloud that belong to the current user's approval workflow context, using the Approvals v2 REST API. Results can be filtered by workflow state, workflow type, object type, and other attributes, and are paginated. Use this to see what content (emails, journeys, assets, etc.) is pending, in review, or already approved. Each item in the response includes its approval ID, name, workflow state, workflow type, deadline, and comment counts.`,
    params: [
      {
        name: 'object_type',
        type: 'string',
        required: false,
        description: `Filter results to approval items for a specific object type, e.g. 'EmailSendDefinition' or 'InteractionStudio.DefinitionInfo' (journey). Leave blank to return items for all object types.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number of results to retrieve, starting at 1. Use with page_size to page through large result sets.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of approval items to return per page. Defaults to 25 if not specified.`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort order for results, formatted as '<field> <ASC|DESC>'. Sortable fields are Name, CreatedDate, WorkflowState, and Deadline. Example: 'Deadline ASC'.`,
      },
      {
        name: 'workflow_state',
        type: 'string',
        required: false,
        description: `Filter results to approval items currently in this workflow state. Leave blank to return items in all states.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_approval_settings_get',
    description: `Retrieve the Approvals v2 configuration/settings that apply to the current user, via GET /hub/v1/approvals-v2/settings on Salesforce Marketing Cloud's Approvals REST API. Use this alongside List Approval Items and Get Approval Item to understand how approvals are configured (for example, notification or workflow-related settings) before creating or acting on approval items. Confidence note: existence of this route was confirmed only via a search-indexed documentation page title; the exact shape of the returned settings object has not been independently verified, and no query or request-body parameters are documented for it, so this tool takes no input beyond authentication. Treat the response fields as best-effort until confirmed against a live call.`,
    params: [],
  },
  {
    name: 'salesforcemarketingcloud_asset_category_create',
    description: `Create a new category (folder) in Content Builder under a given parent folder, using the Salesforce Marketing Cloud Asset REST API. Requires a Name and the numeric ParentId of the folder it should be created inside (use the List Content Categories tool to find valid parent IDs, such as your account's root Content Builder folder). Returns the created category, including its newly assigned numeric id.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Name of the new folder as it will appear in Content Builder.`,
      },
      {
        name: 'parent_id',
        type: 'integer',
        required: true,
        description: `Numeric ID of the parent category (folder) this new folder should be created inside. Use the List Content Categories tool to find your account's root or an existing folder's ID.`,
      },
      {
        name: 'category_type',
        type: 'string',
        required: false,
        description: `Type of category to create. "asset" is the standard value for Content Builder folders.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_asset_category_delete',
    description: `Permanently delete a Content Builder category (folder) from Salesforce Marketing Cloud by its numeric category ID. This action is irreversible. Deleting a folder that still contains assets or sub-folders may fail or move its contents depending on your account configuration, so verify the folder is empty first using the List Content Categories and Get/List asset tools.`,
    params: [
      {
        name: 'id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the Content Builder category (folder) to permanently delete, e.g. 3916.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_asset_category_get',
    description: `Retrieve a single Content Builder category (folder) by its numeric ID, using GET /asset/v1/content/categories/{id}. This returns just that one folder's id, name, parentId, and categoryType, rather than the full list returned by List Content Categories. Confirmed via two independently indexed official Salesforce documentation pages both titled 'Get Category by ID' -- developer.salesforce.com's current JS-rendered docs platform returns 404 to direct automated fetches of this deep-linked reference page, so the exact response shape was not read first-hand in this session; it is inferred from the equivalent List Content Categories response and the sibling Get Content Asset tool.`,
    params: [
      {
        name: 'id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the Content Builder category (folder) to retrieve, e.g. 3916. Find it in the Content Builder folder URL, or from a previous List Content Categories or Create Content Category response.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_asset_category_list',
    description: `List Content Builder categories (folders) owned by or shared with your Marketing Cloud account (MID), using the Asset REST API. Supports pagination ($page/$pagesize), sorting ($orderBy), simple filtering ($filter), and requesting categories shared from other business units (scope=Shared). Each returned category includes its id, name, parentId, and categoryType. Use this to discover valid category IDs before creating or moving assets/folders.`,
    params: [
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Simple filter expression to narrow results, using the same '$filter' Simple Query grammar as the Content Builder Assets endpoint: '<property> <operator> <value>' with a space-separated keyword operator, e.g. "parentId eq 3916" or "name eq 'Newsletters'". Supported operators: eq, neq, lt, lte, gt, gte, like. Quote string values with single quotes; leave numeric values (like parentId) unquoted. Do NOT use "==" -- Salesforce's Simple Query API rejects that syntax with a 400 'Invalid Query Format' error.`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Field and direction to sort results by, e.g. "name asc" or "id desc".`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `1-based page number of results to return. Defaults to page 1 if omitted.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of categories to return per page. Defaults to the API's standard page size if omitted.`,
      },
      {
        name: 'scope',
        type: 'string',
        required: false,
        description: `Set to "Shared" to request categories that have been shared with your MID from other business units, instead of ones your MID owns.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_asset_category_update',
    description: `Rename or move a Content Builder category (folder) in Salesforce Marketing Cloud. This is a full replace of the category record, so provide its current name and parent_id even if you are only changing one of them (e.g. keep name the same while changing parent_id to move the folder, or keep parent_id the same while changing name to rename it).`,
    params: [
      {
        name: 'id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the category (folder) to update.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The name the folder should have after this update. Provide the existing name unchanged if you are only moving the folder.`,
      },
      {
        name: 'parent_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the parent folder this category should belong to after this update. Provide the existing parent_id unchanged if you are only renaming the folder.`,
      },
      {
        name: 'category_type',
        type: 'string',
        required: false,
        description: `Type of the category. "asset" is the standard value for Content Builder folders.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_asset_create',
    description: `Create a new Content Builder asset in Salesforce Marketing Cloud, such as an HTML email, template, content block, or image. Requires a name and an assetType (the numeric type ID, e.g. 208 for htmlemail, 207 for templatebasedemail, 197 for htmlblock, 8 for image). Content is supplied either via the views object (e.g. views.html.content for the HTML body of an email, views.subjectline.content for the subject line), the top-level content string, or a base64-encoded file for binary asset types. Returns the created asset object including its assigned numeric id.`,
    params: [
      {
        name: 'asset_type_id',
        type: 'integer',
        required: true,
        description: `Numeric ID of the asset type to create. Common values: 208=htmlemail, 207=templatebasedemail, 197=htmlblock, 8=image, 23=jpg, 28=png. See Salesforce's 'List of Asset Types' reference for the full list.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Display name of the asset, shown in Content Builder.`,
      },
      {
        name: 'asset_type_name',
        type: 'string',
        required: false,
        description: `Optional name of the asset type (e.g. htmlemail, template, htmlblock). If provided but it doesn't match asset_type_id, the API uses the ID and corrects the name automatically.`,
      },
      {
        name: 'category_id',
        type: 'integer',
        required: false,
        description: `Numeric ID of the Content Builder category (folder) to create the asset in. Omit to create it in the account's default/root content area.`,
      },
      {
        name: 'content',
        type: 'string',
        required: false,
        description: `Raw content string for simple asset types (e.g. plain HTML for a content block). For multi-view assets like emails, prefer the views field instead.`,
      },
      {
        name: 'customer_key',
        type: 'string',
        required: false,
        description: `Optional external key (customer key) to assign to the asset for later lookup. If omitted, Marketing Cloud auto-generates one.`,
      },
      {
        name: 'data',
        type: 'object',
        required: false,
        description: `Optional property bag object containing asset-type-specific data (e.g. layout metadata for templates or blocks). Passed through as-is.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional human-readable description of the asset, shown in Content Builder.`,
      },
      {
        name: 'file',
        type: 'string',
        required: false,
        description: `Base64-encoded file content, required for binary/file asset types such as images or documents.`,
      },
      {
        name: 'tags',
        type: 'array',
        required: false,
        description: `Optional array of tag strings to associate with the asset for organization/search.`,
      },
      {
        name: 'views',
        type: 'object',
        required: false,
        description: `Views object for multi-part asset types like emails. Example: {"html": {"content": "<h1>Hello</h1>"}, "subjectline": {"content": "Hello!"}, "preheader": {"content": "A quick note"}, "text": {}}.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_asset_delete',
    description: `Permanently delete a Content Builder asset (email, template, block, image, etc.) from Salesforce Marketing Cloud by its numeric asset ID. This action is irreversible and will remove the asset from Content Builder; any emails or templates still referencing it may break. Optionally set delete_from_cdn to also purge a cached image/file asset from Salesforce's CDN.`,
    params: [
      {
        name: 'id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the Content Builder asset to permanently delete, e.g. 20331.`,
      },
      {
        name: 'delete_from_cdn',
        type: 'boolean',
        required: false,
        description: `Set to true to also purge the asset's cached copy from Salesforce's CDN (relevant for image/file asset types). Corresponds to the isCdnDelete=1 query parameter.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_asset_get',
    description: `Retrieve a single Content Builder asset by its numeric asset ID using the Salesforce Marketing Cloud Asset REST API. Returns the asset's full metadata and content, including name, customerKey, description, assetType (id/name/displayName), category, tags, views (e.g. html/text/subjectline/preheader for emails), content, data, and file properties (for images/documents). Use this to inspect an existing email, template, content block, image, or other Content Builder asset before updating or reusing it. Example asset id: 20331.`,
    params: [
      {
        name: 'id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the Content Builder asset to retrieve, e.g. 20331. This is the asset's internal ID (visible in the Content Builder URL or in the response of a create/list call), not its customerKey.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_asset_get_file',
    description: `Best-effort tool: retrieve the raw file bytes of a Content Builder asset (the actual image, document, or other binary payload) rather than its JSON metadata, using GET /asset/v1/content/assets/{id}/file. This is distinct from the Get Content Asset tool, which returns the asset's JSON object (name, category, views, etc.) but not the underlying file content. This exact sub-path was not confirmed against an official Salesforce documentation page in this session -- developer.salesforce.com's JS-rendered docs platform 404s to automated fetches and no exact matching official page title was found by search -- so it is corroborated only by three independent secondary sources (ampscript.xyz, ssjsdocs.xyz/salesforcefan.com, and a LinkedIn SFMC REST API walkthrough) that all cite this identical path and GET-binary behavior. Verify against a live tenant or Postman collection before relying on this in production; only use it for assets you already know contain a file (e.g. image or document asset types).`,
    params: [
      {
        name: 'id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the Content Builder asset whose file bytes should be retrieved, e.g. 20331. This is the same ID used with Get Content Asset -- look it up there first if unsure whether the asset has an associated file.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_asset_list',
    description: `List and paginate Content Builder assets (emails, templates, blocks, images, documents, and other content items) using the Asset REST API's GET /asset/v1/content/assets resource. Supports simple filtering with the $filter query syntax (e.g. Name like 'welcome' or assetType.name eq htmlemail), sorting with $orderBy (property plus asc/desc, e.g. 'id desc'), limiting returned properties with $fields, and pagination via $page/$pageSize. For complex AND/OR filter logic or filtering by nested subproperties, use the dedicated asset query tool instead.`,
    params: [
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `Comma-separated list of asset property names to include in the response, to reduce payload size, e.g. 'id,name,assetType,category'.`,
      },
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Simple filter expression using SFMC's $filter syntax, e.g. "Name like 'welcome'" or "assetType.name eq 'htmlemail'". Supported operators: eq, neq, lt, lte, gt, gte, like.`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Sort order as an asset property name followed by 'asc' or 'desc', e.g. 'id desc'. Separate multiple properties with commas.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `The page number of results to fetch, starting at 1.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of assets to return per page.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_asset_query',
    description: `Advanced search for Content Builder assets using the Asset REST API's POST /asset/v1/content/assets/query resource, for filter logic that the simple GET list endpoint can't express (AND/OR combinations, or filtering by nested subproperties). Provide a query object using SFMC's asset query grammar: either a simple form {"property": "assetType.id", "simpleOperator": "IN", "value": ["20","21"]}, or a compound form {"leftOperand": {...}, "logicalOperator": "AND", "rightOperand": {...}} for combining conditions. Optionally add sort (array of {property, direction}) and fields (array of asset properties to return, e.g. thumbnail, category, content, data) to shape the response, plus page/page_size for pagination.`,
    params: [
      {
        name: 'query',
        type: 'object',
        required: true,
        description: `The asset search filter, in SFMC's query grammar. Simple form: {"property": "assetType.id", "simpleOperator": "IN", "value": ["20","21"]}. Compound form for AND/OR: {"leftOperand": {...}, "logicalOperator": "AND", "rightOperand": {...}}.`,
      },
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: `Optional array of asset property names to include in each returned asset, e.g. ["thumbnail", "category", "content", "data"]. If omitted, the API's default field set is returned.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `The page number of results to fetch, starting at 1.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of assets to return per page.`,
      },
      {
        name: 'sort',
        type: 'array',
        required: false,
        description: `Optional array of sort instructions, each an object with 'property' (asset property name) and 'direction' ('ASC' or 'DESC'). Example: [{"property": "id", "direction": "ASC"}].`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_asset_types_list',
    description: `List the Content Builder asset types supported by Salesforce Marketing Cloud, using the Asset REST API. Each entry includes the numeric id, name (e.g. htmlemail, template, htmlblock, jpg), and displayName of an asset type. Use this to look up the correct asset_type_id when creating a new asset with the Create Content Asset tool, instead of hardcoding type IDs.`,
    params: [],
  },
  {
    name: 'salesforcemarketingcloud_asset_update',
    description: `Partially update an existing Content Builder asset in Salesforce Marketing Cloud by its numeric asset ID. Only the fields you provide are changed; omitted fields keep their current values. Use this to rename an asset, move it to a different category, edit its content/views (e.g. an email's HTML body or subject line), or update its tags/description.`,
    params: [
      {
        name: 'id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the Content Builder asset to update, e.g. 20331.`,
      },
      {
        name: 'category_id',
        type: 'integer',
        required: false,
        description: `Numeric ID of the Content Builder category (folder) to move the asset into. Omit to leave the asset in its current folder.`,
      },
      {
        name: 'content',
        type: 'string',
        required: false,
        description: `New raw content string for simple asset types (e.g. plain HTML for a content block). For multi-view assets like emails, use the views field instead.`,
      },
      {
        name: 'data',
        type: 'object',
        required: false,
        description: `Optional property bag object containing asset-type-specific data to merge/replace. Passed through as-is.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New human-readable description of the asset, shown in Content Builder.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New display name for the asset, shown in Content Builder.`,
      },
      {
        name: 'tags',
        type: 'array',
        required: false,
        description: `New array of tag strings to associate with the asset. Replaces the existing tag list.`,
      },
      {
        name: 'views',
        type: 'object',
        required: false,
        description: `Views object for multi-part asset types like emails. Example: {"html": {"content": "<h1>Updated</h1>"}, "subjectline": {"content": "New subject"}}. Only the sub-keys you include are updated.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_audit_events_list',
    description: `Retrieve logged Audit Trail audit events for this Salesforce Marketing Cloud account and its child business units, using GET /data/v1/audit/auditEvents. Audit events record administrative/configuration changes such as user and role updates, security settings changes, and other account-object modifications (logins are audited separately at the enterprise level via the sibling GET /data/v1/audit/securityEvents endpoint). Each item in the response includes an id, createdDate, memberId, enterpriseId, the employee who performed the action (id, employeeName, userName), the objectType affected (id, name, e.g. 'MemberEmployee', 'SecuritySettings'), the operation performed (id, name, e.g. 'Update'), the affected object (id, name), and a transactionId. Results are paginated and sortable. Requires the account's Installed Package to have the Tracking Events Read (tracking_events_read) scope. Confirmed against Salesforce's official 'Salesforce Marketing Cloud APIs' Postman collection (folder: REST > Audit > Get Audit Events / Get Security Events); a fully public Salesforce Developers reference page for this exact operation could not be independently reloaded at authoring time. The page-size query parameter is sent as the lower-cased '$pagesize' (not '$pageSize'), matching the exact casing used in that collection's example request for the sibling Security Events endpoint in the same /data/v1/audit/ family — the full set of supported query parameters beyond page/$pagesize/orderBy (e.g. a possible $filter) is still not guaranteed and should be confirmed in testing.`,
    params: [
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Sort order for the results, as a field name followed by 'asc' or 'desc', e.g. 'createdDate desc'. Defaults to 'createdDate desc' (most recent first).`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number of results to retrieve, starting at 1. Use with page_size to page through large result sets.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of audit events to return per page. Defaults to 50 if not specified.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_auth_userinfo_get',
    description: `Get information about the Salesforce Marketing Cloud account and user associated with the currently authenticated access token, using GET /v2/userinfo. Unlike every other tool in this connector, this endpoint is served from the tenant's AUTH subdomain (https://{{domain}}.auth.marketingcloudapis.com) rather than the REST subdomain (.rest.marketingcloudapis.com) — no path or query parameters are needed, since the access token itself (sent as the Bearer credential) identifies both the account and the user. The response includes user details (e.g. id, email, locale, timezone) and organization/account details (e.g. enterprise ID, member ID/MID, stack key, region), along with the account's REST and SOAP base instance URLs and the OAuth scopes granted to the current token. Use this to verify which account/MID a token is scoped to, confirm granted scopes before calling a scope-gated endpoint, or discover the account's own REST/SOAP base URLs at runtime.`,
    params: [],
  },
  {
    name: 'salesforcemarketingcloud_automation_create',
    description: `Create a new automation (Automation Studio program) in Salesforce Marketing Cloud via POST /automation/v1/automations. An automation is a saved chain of steps, where each step runs one or more activities (e.g. a Query Activity, Data Extract, File Transfer, or Send) in sequence, kicked off by a schedule or a file-drop trigger. Provide the automation's name and, optionally, its key, description, folder (categoryId), the ordered steps array, and a startSource object describing how it runs. Steps and startSource can be omitted to create an empty automation shell that you configure later in Automation Studio or via the Update Automation tool. Each step object looks like {"stepNumber": 1, "activities": [{"name": "My Query", "objectTypeId": 300, "activityObjectId": "<GUID of an existing Query Activity>", "displayOrder": 1}]} — activityObjectId must reference an activity definition that already exists in Automation Studio (this tool does not create the underlying activities). objectTypeId identifies the kind of activity: common values are 300=Query Activity, 43=Import Activity, 45=File Transfer, 423=Script Activity -- don't reuse 43 for a Query Activity, that id belongs to Import. A startSource of {"typeId": 1, "schedule": {...}} schedules the automation on a recurring basis; {"typeId": 2, "fileDrop": {"folderLocation": "...", "filenamePatternTypeId": 0, "queueFiles": true}} triggers it on a file drop. If no key is provided, Marketing Cloud generates one automatically. The response includes the new automation's ObjectID (GUID, use this as 'id' for the Get/Update/Start/Delete Automation tools) and its automationLegacyId (a separate numeric ID needed by the legacy-namespaced Get Automation Status and Pause Automation tools). Note: the Automation Studio REST API is not part of Salesforce's officially documented API surface, though it is widely used in production integrations; verify request/response shapes during testing.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Display name of the automation as shown in Automation Studio. Required. Example: Nightly Customer Export.`,
      },
      {
        name: 'categoryId',
        type: 'integer',
        required: false,
        description: `The numeric ID of the Automation Studio folder (category) to save this automation into. Leave blank to save it in the default/root automations folder.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional free-text description of the automation's purpose, shown in the Automation Studio list.`,
      },
      {
        name: 'key',
        type: 'string',
        required: false,
        description: `User-defined unique key (external identifier, aka CustomerKey) for the automation. If omitted, Marketing Cloud generates one automatically. Use a stable, human-readable key if you plan to reference this automation later. Example: nightly_customer_export.`,
      },
      {
        name: 'startSource',
        type: 'object',
        required: false,
        description: `Object describing how the automation is triggered to run. Use {"typeId": 1, "schedule": {...}} for a recurring schedule, or {"typeId": 2, "fileDrop": {"folderLocation": "Import/MyFolder/", "filenamePatternTypeId": 0, "queueFiles": true}} for a file-drop trigger (filenamePatternTypeId: 0=no pattern, 1=contains, 2=begins with, 3=ends with; add "filenamePattern" for options 1-3). Leave blank to create the automation without a start source, configuring it later.`,
      },
      {
        name: 'steps',
        type: 'array',
        required: false,
        description: `Array of step objects defining the automation's ordered chain of activities. Each step has a stepNumber and an activities array; each activity references an existing Automation Studio activity by activityObjectId. Example: [{"stepNumber": 1, "activities": [{"name": "Export Query", "objectTypeId": 300, "activityObjectId": "8f14e45f-ceea-467e-bd3a-45b3f4b3e21f", "displayOrder": 1}]}]. objectTypeId identifies the activity kind -- 300=Query Activity, 43=Import Activity, 45=File Transfer, 423=Script Activity; use the id matching the activity type activityObjectId actually points to. Leave blank to create an empty automation shell to build out in Automation Studio.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_automation_delete',
    description: `Permanently delete an automation (Automation Studio program) from Salesforce Marketing Cloud via DELETE /automation/v1/automations/{id}. Requires the automation's ObjectID (a GUID), as returned by the Create Automation or List Automations tools; the caller's Installed Package needs the automations_write scope. This does not delete the underlying activities referenced by the automation's steps (e.g. Query Activities, Data Extracts), only the automation/program that chains them together, and it does not delete an in-progress run's results. This action is irreversible. Note: while GET/POST/PATCH on /automation/v1/automations/{id} are confirmed working via production SFMC tooling, that same tooling deletes automations via the SOAP API rather than REST DELETE; this REST DELETE endpoint follows the standard collection+item REST convention used elsewhere in the Marketing Cloud API but was not independently confirmed during authoring — verify during testing. Example id: 8f14e45f-ceea-467e-bd3a-45b3f4b3e21f.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ObjectID (GUID) of the automation to delete, as returned by Create Automation or List Automations. Example: 8f14e45f-ceea-467e-bd3a-45b3f4b3e21f.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_automation_get',
    description: `Retrieve an automation's (Automation Studio program's) full definition and current status from Salesforce Marketing Cloud via GET /automation/v1/automations/{id}. Requires the automation's ObjectID (a GUID), as returned by the Create Automation or List Automations tools. Returns fields such as name, key, description, status (e.g. Building, Ready, Running, Paused, Stopped, Scheduled, AwaitingTrigger), categoryId, the ordered steps array (each step's activities), the startSource (schedule or file-drop trigger configuration), and an automationLegacyId — a separate numeric identifier needed by the legacy-namespaced status and pause tools (Get Automation Status, Pause Automation). Example id: 8f14e45f-ceea-467e-bd3a-45b3f4b3e21f.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ObjectID (GUID) of the automation to retrieve, as returned by Create Automation or List Automations. Example: 8f14e45f-ceea-467e-bd3a-45b3f4b3e21f.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_automation_list',
    description: `List automations (Automation Studio programs) in the Salesforce Marketing Cloud account via GET /automation/v1/automations, the collection form of the same Automation REST API used by the Get Automation, Create Automation, and Update Automation tools (which operate on /automation/v1/automations/{id}). Returns each automation's id, key, name, description, and status (e.g. Building, Ready, Running, Paused, Stopped, Scheduled, AwaitingTrigger). Supports optional pagination. Note: Salesforce's rendered API reference for this Automation Studio resource is a JavaScript-driven page that could not be fully inspected during authoring; the item-level GET/POST/PATCH on this same /automation/v1/automations resource are confirmed working via production tooling, and this list form follows the same collection+item REST convention used elsewhere in this API (e.g. GET /interaction/v1/interactions). Verify during testing and adjust the pagination parameter names if the API rejects them.`,
    params: [
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number of results to return, for accounts with many automations. Starts at 1.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of automations to return per page.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_automation_pause',
    description: `Pause a scheduled automation (Automation Studio program) in Salesforce Marketing Cloud so it won't run again until reactivated, via POST /legacy/v1/beta/bulk/automations/automation/definition/?action=pauseSchedule — confirmed via production SFMC tooling as the real mechanism behind Automation Studio's 'Pause' button (there is no /automation/v1/automations/{id}/actions/pause endpoint; pausing operates on the automation's schedule in the legacy REST namespace). Requires two numeric legacy identifiers, both found via the Get Automation Status tool: automation_legacy_id (the automation's automationLegacyId) and schedule_legacy_id (the id inside that response's scheduleObject). Pausing only applies to schedule-triggered automations — file-drop and trigger-based automations don't have a schedule to pause. After pausing, the automation's status becomes Paused; use the Get Automation Status tool to confirm, and Automation Studio's UI (or a subsequent schedule update) to resume it. Example automation_legacy_id: 4821, example schedule_legacy_id: 9310.`,
    params: [
      {
        name: 'automation_legacy_id',
        type: 'string',
        required: true,
        description: `The automation's numeric legacy ID (automationLegacyId), not its GUID ObjectID. Find it via the Get Automation Status tool. Example: 4821.`,
      },
      {
        name: 'schedule_legacy_id',
        type: 'string',
        required: true,
        description: `The numeric legacy ID of the automation's schedule (scheduleObject.id), obtained from the Get Automation Status tool's response. Example: 9310.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_automation_start',
    description: `Manually start an automation (Automation Studio program) immediately in Salesforce Marketing Cloud via POST /automation/v1/automations/{id}/actions/start, bypassing its configured schedule or file-drop trigger. Requires the automation's ObjectID (a GUID), as returned by the Create Automation or List Automations tools; the caller's Installed Package needs the automations_execute scope. The automation must be in a runnable state (e.g. Ready) — starting one that is already Running, Building, or has a configuration error will fail. Each call kicks off one run; calling it again while a run is already in progress starts a separate concurrent run rather than being a no-op. Use the Get Automation or Get Automation Status tool afterward to confirm the run started and to monitor its progress. Note: this action endpoint follows the same /actions/<verb> convention documented for other Automation Studio resources (e.g. Query Activities' /automation/v1/queries/{id}/actions/start) but is not itself part of Salesforce's officially published REST API reference; verify behavior during testing. Example id: 8f14e45f-ceea-467e-bd3a-45b3f4b3e21f.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ObjectID (GUID) of the automation to start immediately, as returned by Create Automation or List Automations. Example: 8f14e45f-ceea-467e-bd3a-45b3f4b3e21f.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_automation_status_get',
    description: `Get extended run/status details for an automation (Automation Studio program) in Salesforce Marketing Cloud via GET /legacy/v1/beta/bulk/automations/automation/definition/{automationLegacyId} — confirmed via production SFMC tooling as the source of richer runtime status than the main Get Automation tool provides. Requires the automation's numeric automationLegacyId (NOT the GUID ObjectID used by Get/Start/Delete Automation) — find it in the automationLegacyId field of the Create Automation or Get Automation response. Returns fields including automationType, status (e.g. Building, Ready, Running, Paused, Stopped, Scheduled, AwaitingTrigger, Skipped, Initialized, Error), createdBy/createdDate, lastSavedBy/lastSaveDate, lastPausedBy/lastPausedDate, the scheduleObject (id, description, iCalRecur, startDate, timeZone — its id is the scheduleLegacyId needed by the Pause Automation tool), and the processes array describing each step's workers/activities. Poll this after Start Automation to watch status move from Running back to Ready/Scheduled. Example automationLegacyId: 4821.`,
    params: [
      {
        name: 'automation_legacy_id',
        type: 'string',
        required: true,
        description: `The automation's numeric legacy ID (automationLegacyId), not its GUID ObjectID. Find it in the automationLegacyId field returned by Create Automation or Get Automation. Example: 4821.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_automation_update',
    description: `Update an existing automation's (Automation Studio program's) definition in Salesforce Marketing Cloud via PATCH /automation/v1/automations/{id} (confirmed via production SFMC tooling; PATCH, not PUT). Requires the automation's ObjectID (a GUID). Only the fields you provide are changed; omit a field to leave it as-is. You can rename it, change its description or folder (categoryId), replace its steps (the ordered chain of activities), or replace its startSource (schedule or file-drop trigger configuration) — see the Create Automation tool for the shape of steps and startSource. Replacing steps or startSource typically requires the automation to not be currently running. Example id: 8f14e45f-ceea-467e-bd3a-45b3f4b3e21f.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ObjectID (GUID) of the automation to update, as returned by Create Automation or List Automations. Example: 8f14e45f-ceea-467e-bd3a-45b3f4b3e21f.`,
      },
      {
        name: 'categoryId',
        type: 'integer',
        required: false,
        description: `New numeric ID of the Automation Studio folder (category) to move this automation into. Omit to leave unchanged.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New free-text description of the automation's purpose. Omit to leave unchanged.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New display name for the automation. Omit to leave unchanged.`,
      },
      {
        name: 'startSource',
        type: 'object',
        required: false,
        description: `Replacement startSource object describing how the automation is triggered. Use {"typeId": 1, "schedule": {...}} for a recurring schedule, or {"typeId": 2, "fileDrop": {"folderLocation": "Import/MyFolder/", "filenamePatternTypeId": 0, "queueFiles": true}} for a file-drop trigger. Omit to leave the current start source unchanged.`,
      },
      {
        name: 'steps',
        type: 'array',
        required: false,
        description: `Replacement array of step objects defining the automation's ordered chain of activities (this replaces the entire steps array, not a merge). Example: [{"stepNumber": 1, "activities": [{"name": "Export Query", "objectTypeId": 300, "activityObjectId": "8f14e45f-ceea-467e-bd3a-45b3f4b3e21f", "displayOrder": 1}]}]. objectTypeId identifies the activity kind -- 300=Query Activity, 43=Import Activity, 45=File Transfer, 423=Script Activity; use the id matching the activity type activityObjectId actually points to. Omit to leave the current steps unchanged.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_bulk_ingest_job_complete',
    description: `Signal that all data has been staged for a bulk ingest job, as step 3 of Salesforce Marketing Cloud's Bulk Data Ingest workflow, triggering Marketing Cloud to validate the staged rows and begin importing them into the target Data Extension. Salesforce's public documentation describes this step ('complete the ingest job') only in prose - the exact path is not confirmed from a fetchable reference/OpenAPI source in this session. The path used here (POST /data/v1/bulk/ingest/{bulkApiDefinitionId}/complete) is inferred by analogy with the create-job endpoint and Salesforce's general Bulk API 2.0 convention of a '.../complete' or job-state-transition sub-resource. Call this once, after all batches have been uploaded with the Stage Bulk Ingest Job Data tool, then poll the Get Bulk Ingest Job Status tool to track validation/import progress and surface any row-level errors. Do not rely on this tool in production before smoke-testing it against a real Marketing Cloud sandbox and correcting the path_template if the API responds with a 404 or an unexpected error.`,
    params: [
      {
        name: 'bulk_api_definition_id',
        type: 'string',
        required: true,
        description: `The bulkApiDefinitionId of the job to finalize, returned by the Create Bulk Ingest Job tool. All batches must already be staged for this job via the Stage Bulk Ingest Job Data tool before completing it. Example: 3fa85f64-5717-4562-b3fc-2c963f66afa6.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_bulk_ingest_job_create',
    description: `Create a bulk ingest job definition targeting a Data Extension in Salesforce Marketing Cloud, using the Bulk Data Ingest REST API (POST /data/v1/bulk/ingest, operation createBulkIngestJob). This is step 1 of the four-step Bulk Data Ingest workflow, purpose-built for loading millions of rows without the performance penalty of many small synchronous/async calls: (1) create the job definition here, (2) upload row batches to it with the stage-data tool, (3) finalize with the complete tool to trigger validation and import, (4) poll the status tool for progress/results. Provide destinationCustomerKey (the target Data Extension's customer/external key), updateType (how new vs. existing rows are handled), and optionally jobExpirationHours (how long the job definition stays valid before it must be completed, up to 8 hours). On success, returns a requestId and a bulkApiDefinitionId — the bulkApiDefinitionId is the job identifier required by the stage-data, complete, and status tools. This endpoint/operation is confirmed against an independently-generated OpenAPI specification that matches Salesforce's own documented operation name createBulkIngestJob for this route.`,
    params: [
      {
        name: 'destination_customer_key',
        type: 'string',
        required: true,
        description: `The customer key (external key) of the target Data Extension that this bulk ingest job will load rows into. This is the Data Extension's human-assigned unique identifier, not its internal ObjectID GUID. Example: Customer_Master_DE.`,
      },
      {
        name: 'update_type',
        type: 'string',
        required: true,
        description: `How the bulk load should handle rows relative to existing data in the Data Extension: 'AddAndUpdate' inserts new rows and updates existing ones matched by primary key (upsert), 'AddAndDoNotUpdate' inserts new rows only and skips rows that already exist, 'UpdateButDoNotAdd' updates existing rows only and skips rows with no existing match, and 'Overwrite' clears the Data Extension first and loads only the new rows. Example: AddAndUpdate.`,
      },
      {
        name: 'job_expiration_hours',
        type: 'integer',
        required: false,
        description: `Number of hours the job definition remains valid for staging data before it must be completed, from 1 up to a maximum of 8. If omitted, Marketing Cloud applies its own default expiration window. Example: 4.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_bulk_ingest_job_stage_data',
    description: `Upload one batch of rows to the staging area of a bulk ingest job created with the Create Bulk Ingest Job tool, as step 2 of Salesforce Marketing Cloud's Bulk Data Ingest workflow. Salesforce's public documentation describes this step ('stage your data') only in prose - the exact path and request-body shape are not confirmed from a fetchable reference/OpenAPI source in this session. The path used here (PUT /data/v1/bulk/ingest/{bulkApiDefinitionId}) is inferred by analogy with the create-job endpoint (POST /data/v1/bulk/ingest) and with Salesforce's general Bulk API 2.0 convention of PUT-ing batches to a job resource identified by its ID. The request body is sent as a bare JSON array of row objects (each object's keys matching the target Data Extension's column names), mirroring how Bulk API 2.0 batch payloads are structured - but whether Marketing Cloud expects a bare array here versus an object wrapper (e.g. {"items": [...]}) is also unconfirmed. Call this repeatedly to upload sequential batches for the same bulkApiDefinitionId, then call the Complete Bulk Ingest Job tool once all batches are staged. Do not rely on this tool in production before smoke-testing it against a real Marketing Cloud sandbox and correcting the path_template/body shape if the API responds with a 404 or a body-shape error.`,
    params: [
      {
        name: 'bulk_api_definition_id',
        type: 'string',
        required: true,
        description: `The bulkApiDefinitionId returned by the Create Bulk Ingest Job tool, identifying the job to stage this batch of rows into. Example: 3fa85f64-5717-4562-b3fc-2c963f66afa6.`,
      },
      {
        name: 'items',
        type: 'array',
        required: true,
        description: `Array of rows in this batch. Each row is a flat object mapping the target Data Extension's column names to values; rows missing a required primary key field are expected to be skipped by Marketing Cloud. Example: [{"SubscriberKey": "12345", "FirstName": "Jane", "EmailAddress": "jane@example.com"}]`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_bulk_ingest_job_status_get',
    description: `Check the status and progress of a bulk ingest job created via the Create Bulk Ingest Job tool, as step 4 of Salesforce Marketing Cloud's Bulk Data Ingest workflow. Salesforce's public documentation mentions monitoring job progress and reviewing completed-job summaries (row counts, error details) only in prose - the exact path is not confirmed from a fetchable reference/OpenAPI source in this session. The path used here (GET /data/v1/bulk/ingest/{bulkApiDefinitionId}) is inferred by analogy with the create-job endpoint and Salesforce's general Bulk API 2.0 convention of GET-ing a job resource by its ID to retrieve its current state. Poll this after calling the Complete Bulk Ingest Job tool until the job reaches a terminal state before assuming the import has finished. Do not rely on this tool in production before smoke-testing it against a real Marketing Cloud sandbox and correcting the path_template if the API responds with a 404 or an unexpected shape.`,
    params: [
      {
        name: 'bulk_api_definition_id',
        type: 'string',
        required: true,
        description: `The bulkApiDefinitionId of the job to check, returned by the Create Bulk Ingest Job tool. Example: 3fa85f64-5717-4562-b3fc-2c963f66afa6.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_campaign_asset_add',
    description: `Associate one or more existing Content Builder assets (emails, templates, images, etc.) or other Marketing Cloud objects (automations, data extensions, landing pages, etc.) with a campaign via the Hub API. The asset(s) must already exist — use the Content Builder Asset API to find numeric ids first. This does not create a new asset; it only links existing ones to the campaign for organization and reporting. Requires a type describing what kind of object the ids refer to (e.g. EMAIL for Content Builder emails, CMS_asset for other Content Builder assets).`,
    params: [
      {
        name: 'asset_ids',
        type: 'array',
        required: true,
        description: `Array of Content Builder asset ids (or other object ids matching type) to associate with the campaign, e.g. ["98765"]. When associating a Template Based Email created with the Classic editor, use its legacyID instead (retrievable via the asset advanced query).`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique id of the campaign to associate the asset with, as returned by campaign_list or campaign_create.`,
      },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `The type of object that asset_ids refers to. Use EMAIL for Content Builder emails, or CMS_asset for other Content Builder assets (templates, blocks, images, documents).`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_campaign_assets_list',
    description: `List the Content Builder assets currently associated with a Salesforce Marketing Cloud campaign via the Hub API. Returns each linked asset's id and association metadata. Accepts optional page and pageSize query parameters to page through results. Note: a live test found this Hub API endpoint did not honor pageSize to shrink the result count below the account's default page size (results stayed at 50 regardless of the value sent) -- use page to page through the full result set and don't rely on pageSize to limit how many assets come back.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique id of the campaign whose associated assets should be listed.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `1-based page number of results to retrieve. Omit to fetch the first page.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of assets to return per page. Omit to use the API's default page size. Caveat from live testing: this endpoint has been observed ignoring pageSize values smaller than the default (results still came back at the default page size of 50) -- treat this as a hint rather than a guarantee.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_campaign_create',
    description: `Create a new campaign in Salesforce Marketing Cloud via the Hub API (Content Builder Campaigns feature). Campaigns are used to group and tag related Content Builder assets (emails, templates, etc.) for organization and reporting. All five fields (name, description, campaign_code, color, favorite) are required by the API. Returns the created campaign object including its system-assigned id.`,
    params: [
      {
        name: 'campaign_code',
        type: 'string',
        required: true,
        description: `A unique identifier for the campaign, up to 36 characters. Often a short slug or external tracking code distinct from the display name.`,
      },
      {
        name: 'color',
        type: 'string',
        required: true,
        description: `Hex color value used to visually tag the campaign in the Marketing Cloud UI, e.g. #FF5733.`,
      },
      {
        name: 'description',
        type: 'string',
        required: true,
        description: `Description of the campaign, up to 512 characters.`,
      },
      {
        name: 'favorite',
        type: 'boolean',
        required: true,
        description: `Whether this campaign should be flagged as a favorite for quick access in the Marketing Cloud UI.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Name of the campaign, up to 128 characters.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_campaign_get',
    description: `Retrieve a single Salesforce Marketing Cloud campaign by its id via the Hub API. Returns the campaign's id, name, description, campaignCode, color (hex), favorite flag, createdDate, and modifiedDate. Use campaign_list to find a campaign's id if you don't already have it.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique id of the campaign to retrieve, as returned by campaign_list or campaign_create.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_campaign_list',
    description: `List campaigns defined in Salesforce Marketing Cloud via the Hub API (Content Builder Campaigns feature used to group and tag related Content Builder assets). Returns a paginated collection of campaign objects (id, name, description, campaignCode, color, favorite, createdDate, modifiedDate). Accepts optional page and pageSize query parameters to page through results; leave both blank to fetch the API's default first page. Note: a live test found this Hub API endpoint did not honor pageSize to shrink the result count below the account's default page size (results stayed at 50 regardless of the value sent) -- use page to page through the full result set and don't rely on pageSize to limit how many campaigns come back.`,
    params: [
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `1-based page number of results to retrieve. Omit to fetch the first page.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of campaigns to return per page. Omit to use the API's default page size. Caveat from live testing: this endpoint has been observed ignoring pageSize values smaller than the default (results still came back at the default page size of 50) -- treat this as a hint rather than a guarantee.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_campaign_update',
    description: `Update an existing Salesforce Marketing Cloud campaign identified by id, via the Hub API. This is a full replace of the campaign's editable fields, so supply all current values (not just the ones you're changing) — fetch the campaign first with campaign_get if you need to preserve existing values. Returns the updated campaign object.`,
    params: [
      {
        name: 'campaign_code',
        type: 'string',
        required: true,
        description: `A unique identifier for the campaign, up to 36 characters.`,
      },
      {
        name: 'color',
        type: 'string',
        required: true,
        description: `Hex color value used to visually tag the campaign in the Marketing Cloud UI, e.g. #FF5733.`,
      },
      {
        name: 'description',
        type: 'string',
        required: true,
        description: `Description of the campaign, up to 512 characters.`,
      },
      {
        name: 'favorite',
        type: 'boolean',
        required: true,
        description: `Whether this campaign should be flagged as a favorite for quick access in the Marketing Cloud UI.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique id of the campaign to update, as returned by campaign_list or campaign_create.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Name of the campaign, up to 128 characters.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_contact_addresses_list',
    description: `Look up the Contact Key(s) associated with one or more email addresses, via POST /contacts/v1/addresses/email/search. Note: Marketing Cloud does not expose a plain 'list all addresses' endpoint; the real, documented way to resolve contact/address identity from channel addresses is this email-to-contact-key search. Returns, for each email address supplied, the matching contact key(s) and the date each was created.`,
    params: [
      {
        name: 'email_addresses',
        type: 'array',
        required: true,
        description: `Array of email addresses to find contact keys for. Example: ["jane.doe@example.com"].`,
      },
      {
        name: 'maximum_count',
        type: 'integer',
        required: false,
        description: `Maximum number of contact keys to return per email address, in case multiple contacts share the same address. Defaults to 1.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_contact_attribute_groups_list',
    description: `List attribute groups in Contact Builder via GET /contacts/v1/schemas/{schemaId}/attributeGroups. Attribute groups organize related attribute sets (e.g. 'ExactTarget MobilePush'). Marketing Cloud schemas are tenant-specific; find your account's schema id first by calling GET /contacts/v1/schema (the Get Schemas Collection endpoint) and using the 'id' of the schema with schemaType 'Contacts'. Note: a live test against this endpoint found that it may return the same full set of attribute groups for the account regardless of which valid schema_id is supplied -- despite schema_id appearing in the path, treat this endpoint as 'list this account's attribute groups' rather than a reliable per-schema filter, and verify against your own tenant before assuming scoped results.`,
    params: [
      {
        name: 'schema_id',
        type: 'string',
        required: true,
        description: `The GUID of the contact data schema to list attribute groups for. Retrieve this from GET /contacts/v1/schema (look for the schema with schemaType 'Contacts'). Example: 71c1f974-9812-e411-9ef0-08edb9ddebf0.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_contact_attribute_set_data_search',
    description: `Retrieve the attribute value data rows of a specified Contact Builder attribute set by name, via GET /contacts/v1/attributeSets/name:{name}. The literal text 'name:' is part of the URL path itself, immediately followed by the attribute set's name (e.g. a call for the 'Email Addresses' attribute set hits /contacts/v1/attributeSets/name:Email Addresses). This is expected to return the contact-level data rows stored under that attribute set, similar in spirit to the by-id attribute set definition lookup but keyed by name and returning data instead of the definition. This endpoint was located via a Salesforce documentation search-index page title rather than a fully loaded reference page, so its exact response shape and any supported query filters have not been independently verified -- only the name path parameter is modeled here as a result.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Name of the attribute set to look up, exactly as it appears in Contact Builder (e.g. from the name field returned by the List Contact Attribute Set Definitions tool). Example: Email Addresses.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_contact_attribute_set_get',
    description: `Retrieve a single Contact Builder attribute set definition by its UUID, via GET /contacts/v1/attributeSetDefinitions/{id}. An attribute set definition describes a data extension or system attribute group (e.g. Email Addresses, MobilePush Demographics) that can be attached to a contact, and is expected to return the same kind of item found in the List Contact Attribute Set Definitions tool's results -- id, key, name, whether it is sendable, and its attribute/field list -- just narrowed to the one definition. This by-id endpoint was located via a Salesforce documentation search-index page title rather than a fully loaded reference page, so its exact response shape has not been independently re-verified; use the List Contact Attribute Set Definitions tool first to find the id you want, then call this to fetch just that one definition.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `UUID of the attribute set definition to retrieve. Get this from the id field of an item returned by the List Contact Attribute Set Definitions tool. Example: 8f14e45f-ceea-467e-bd97-97f78d9c8f1e.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_contact_attribute_sets_list',
    description: `List all attribute set definitions available in the account's Contact Builder data model, via GET /contacts/v1/attributeSetDefinitions (note: the real Marketing Cloud path is 'attributeSetDefinitions', not 'attributeSets'). Each attribute set definition represents a data extension or system attribute group (e.g. 'Email Addresses', 'MobilePush Demographics') that can be attached to a contact, and includes its id, key, name, whether it is sendable, and its attribute/field list. Use this to discover valid attribute set names and field names before calling Create/Update Contact.`,
    params: [
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number of results to return, for accounts with many attribute set definitions. Starts at 1.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of attribute set definitions to return per page. The API's own default page size is 50.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_contact_create',
    description: `Create a new contact in Salesforce Marketing Cloud's Contact Builder using the Contacts REST API. A contact is identified by a unique Contact Key and is populated by writing one or more attribute sets (Contact Builder data extensions/attribute groups such as 'Email Addresses', 'Email Demographics', 'MobileConnect', or a custom data extension attribute set) onto it. At least one attribute set is required; to make the contact usable for Email Studio sends you typically must include the 'Email Addresses' attribute set with 'Email Address' and 'HTML Enabled' values. Returns operation status, whether the contact key was newly created, and the resulting numeric contactId.`,
    params: [
      {
        name: 'attribute_sets',
        type: 'array',
        required: true,
        description: `Array of attribute sets to write onto the contact. Each item has shape {"name": "<attribute set name>", "items": [{"values": [{"name": "<attribute name>", "value": "<attribute value>"}]}]}. Each call accepts only one instance of each attribute set. Example: [{"name": "Email Addresses", "items": [{"values": [{"name": "Email Address", "value": "jane.doe@example.com"}, {"name": "HTML Enabled", "value": "true"}]}]}]`,
      },
      {
        name: 'contact_key',
        type: 'string',
        required: true,
        description: `The unique Contact Key to assign to this new contact. This is the human-assigned identifier Marketing Cloud uses to unify a person's data across channels (email, SMS, push, etc.). Example: 5f3a1b2c-4d5e-6f78-9012-3456789abcde or a business identifier like CRM-00123.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_contact_custom_object_info_get',
    description: `Check whether a custom object (data extension) is used in the account's contact model, via GET /contacts/v1/customObject/{id}/isUsedInContacts. Existence of this endpoint is confirmed only via a Salesforce documentation search-index page title -- the exact response shape was not independently verified, so treat the returned payload as best-effort and inspect it at runtime rather than assuming a specific structure. Use this before deleting or restructuring a custom object, to check whether the account's contact model depends on it.`,
    params: [
      {
        name: 'custom_object_id',
        type: 'string',
        required: true,
        description: `The ObjectID (GUID) of the custom object / data extension to check, as returned by the data extension's ObjectID field (e.g. from Get or List Data Extension). Example: 8a5f3c2e-1b4d-4e6a-9c7f-0d2e4a6b8c1d.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_contact_delete',
    description: `Asynchronously and irreversibly delete one or more contacts and their attribute data from Salesforce Marketing Cloud, via POST /contacts/v1/contacts/actions/delete?type=ids|keys. Identify the contacts either by their numeric contact IDs or by their Contact Keys. The operation runs asynchronously in Marketing Cloud and returns an OperationID; check progress with GET /contacts/v1/contacts/actions/delete/status?operationID={id}. This permanently removes the contact and its attribute data and cannot be undone.`,
    params: [
      {
        name: 'identifier_type',
        type: 'string',
        required: true,
        description: `Whether the values you're providing are numeric Contact IDs or string Contact Keys. Controls the 'type' query parameter: 'ids' or 'keys'.`,
      },
      {
        name: 'values',
        type: 'array',
        required: true,
        description: `Array of contact identifiers to delete, matching identifier_type. For 'ids' provide numbers, e.g. [12345678, 12345679]. For 'keys' provide strings, e.g. ["CRM-00123", "CRM-00124"].`,
      },
      {
        name: 'delete_operation_type',
        type: 'string',
        required: false,
        description: `The scope of the delete operation. Currently the only documented value is 'ContactAndAttributes', which deletes the contact and all of its attribute data.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_contact_delete_operations_list',
    description: `List asynchronous contact delete operations that have been submitted for this account, via GET /contacts/v1/contacts/deleteOperations. Each item is expected to represent one delete request batch (with an operation identifier and a status you can look up with the Get Contact Delete Status tool), letting you audit or monitor bulk contact-deletion activity without knowing an individual operation ID in advance. This endpoint was located via a Salesforce documentation search-index page title rather than a fully loaded reference page, so its exact response shape is not independently confirmed. Optional page and page_size fields are included on a best-effort basis, following the $page/$pageSize pagination convention confirmed on the sibling /contacts/v1/attributeSetDefinitions endpoint in the same Contacts API family -- they have not been confirmed specifically for this operation and can be left blank if the API ignores or rejects them.`,
    params: [
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number of results to return, starting at 1. Best-effort: follows the $page convention used by the sibling attributeSetDefinitions list endpoint, not independently confirmed for this operation. Leave blank to get the default (first) page.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of delete operations to return per page. Best-effort: follows the $pageSize convention used by the sibling attributeSetDefinitions list endpoint (whose own default page size is 50), not independently confirmed for this operation.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_contact_delete_requests_details',
    description: `Get details of contact delete requests submitted over a date range, via GET /contacts/v1/contacts/analytics/deleterequests. This is expected to list the individual delete requests made in that window (e.g. who/when/how many contacts, and each request's status), which is useful for auditing bulk contact-deletion activity over time. The endpoint's existence and purpose were confirmed via a Salesforce documentation search-index page title rather than a fully loaded reference page; the start_date/end_date fields are sent as 'startDate'/'endDate' on a best-effort basis, since the exact query parameter names were not independently verified.`,
    params: [
      {
        name: 'end_date',
        type: 'string',
        required: true,
        description: `End of the date range to report on, as an ISO 8601 date (YYYY-MM-DD). Sent as the 'endDate' query parameter on a best-effort basis. Example: 2024-01-31.`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: true,
        description: `Start of the date range to report on, as an ISO 8601 date (YYYY-MM-DD). Sent as the 'startDate' query parameter on a best-effort basis. Example: 2024-01-01.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_contact_delete_requests_summary',
    description: `Get a status-count summary of contact delete requests submitted over a date range, via GET /contacts/v1/contacts/analytics/deleterequests/summary. This is expected to return aggregate counts of delete requests grouped by status (e.g. how many completed, are in progress, or failed) for the given window, complementing the Get Contact Delete Request Details tool's per-request listing with a rolled-up view. The endpoint's existence and purpose were confirmed via a Salesforce documentation search-index page title rather than a fully loaded reference page; the start_date/end_date fields are sent as 'startDate'/'endDate' on a best-effort basis, since the exact query parameter names were not independently verified.`,
    params: [
      {
        name: 'end_date',
        type: 'string',
        required: true,
        description: `End of the date range to summarize, as an ISO 8601 date (YYYY-MM-DD). Sent as the 'endDate' query parameter on a best-effort basis. Example: 2024-01-31.`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: true,
        description: `Start of the date range to summarize, as an ISO 8601 date (YYYY-MM-DD). Sent as the 'startDate' query parameter on a best-effort basis. Example: 2024-01-01.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_contact_delete_status_get',
    description: `Get the status of an asynchronous contact delete operation, via GET /contacts/v1/contacts/actions/delete/status. Because this path has no {id} segment, the operation identifier must be supplied as a query parameter; the operation_id field here is sent as 'operationId' on a best-effort basis (the exact query parameter name and casing were not independently confirmed, only the endpoint's existence and purpose -- get an operation ID from a previous contact-delete request or from the List Contact Delete Operations tool). Use this to poll whether a bulk or single contact deletion has completed, is still running, or failed.`,
    params: [
      {
        name: 'operation_id',
        type: 'string',
        required: true,
        description: `Identifier of the contact delete operation to check, as returned when the delete was submitted or by the List Contact Delete Operations tool. Sent as the 'operationId' query parameter on a best-effort basis. Example: a2f4c8e0-1234-4abc-9def-56789abcdef0.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_contact_get_or_create',
    description: `Establish one or more contacts by Contact Key: returns each contact's internal reference (contactID, contactType, contactStatus) if it already exists, or silently creates a bare contact record for any key that doesn't exist yet. This is the fastest way to get a stable contactID for a Contact Key before writing attribute data with Create/Update Contact. Note: the real Marketing Cloud endpoint for this operation is POST /contacts/v1/establish (not a nested /contacts/actions/ path).`,
    params: [
      {
        name: 'contact_keys',
        type: 'array',
        required: true,
        description: `Array of Contact Keys to establish (look up or create). Example: ["CRM-00123", "CRM-00124"].`,
      },
      {
        name: 'contact_type',
        type: 'integer',
        required: false,
        description: `Numeric contact type to establish under. Defaults to 0 (the standard Default contact type). Leave as the default unless your account uses custom contact types.`,
      },
      {
        name: 'correlate_response_item',
        type: 'boolean',
        required: false,
        description: `When true, the order of items in the response array matches the order of contact_keys in the request.`,
      },
      {
        name: 'include_new_contact_awareness',
        type: 'boolean',
        required: false,
        description: `When true, each response item includes an isNewContact flag indicating whether the contact was just created by this call versus already existing.`,
      },
      {
        name: 'return_results',
        type: 'boolean',
        required: false,
        description: `Whether to return the established contact reference details in the response. Set false for a fire-and-forget establish call.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_contact_preferences_get_by_id',
    description: `Get consent/subscription preferences for a single contact by their numeric Contact ID, via GET /contacts/v1/contacts/id:{contactId}/Preferences. Existence of this endpoint is confirmed only via a Salesforce documentation search-index page title -- the exact response shape was not independently verified, so treat the returned payload as best-effort and inspect it at runtime rather than assuming specific fields. If you only have the contact's Subscriber/Contact Key instead of its numeric ID, use the by-key variant of this tool instead.`,
    params: [
      {
        name: 'contact_id',
        type: 'string',
        required: true,
        description: `The numeric Contact ID of the contact whose preferences to retrieve, as returned by the contact's ContactID field (e.g. from a contact search or contact create response). Example: 123456789.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_contact_preferences_get_by_key',
    description: `Get consent/subscription preferences for a single contact by their Contact Key (Subscriber Key), via GET /contacts/v1/contacts/key:{contactKey}/Preferences. Existence of this endpoint is confirmed only via a Salesforce documentation search-index page title -- the exact response shape was not independently verified, so treat the returned payload as best-effort and inspect it at runtime rather than assuming specific fields. If you only have the contact's numeric Contact ID instead of its key, use the by-id variant of this tool instead.`,
    params: [
      {
        name: 'contact_key',
        type: 'string',
        required: true,
        description: `The Contact Key / Subscriber Key of the contact whose preferences to retrieve. Example: CONTACT-00123.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_contact_restrict_status_get',
    description: `Get the status of an asynchronous contact restrict operation, via GET /contacts/v1/contacts/actions/restrict/status. Because this path has no {id} segment, the operation identifier must be supplied as a query parameter; by analogy with this connector's confirmed Get Contact Delete Status tool (the equivalent GET /contacts/v1/contacts/actions/delete/status endpoint, which takes an 'operationId' query parameter), operation_id here is sent as 'operationId' on a best-effort basis -- the exact query parameter name and casing for this specific endpoint were not independently confirmed, only its existence and general purpose. Use this to poll whether a bulk contact restrict (suppress-from-sends) operation has completed, is still running, or failed.`,
    params: [
      {
        name: 'operation_id',
        type: 'string',
        required: true,
        description: `Identifier of the contact restrict operation to check, as returned when the restrict request was submitted. Sent as the 'operationId' query parameter on a best-effort basis. Example: a2f4c8e0-1234-4abc-9def-56789abcdef0.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_contact_schemas_list',
    description: `List all contact data schemas defined in the account, via GET /contacts/v1/schema (the Get Schemas Collection endpoint). This account-wide call takes no parameters. Existence is confirmed both via a Salesforce documentation search-index page title and because this connector's List Contact Attribute Groups tool already documents calling this same endpoint to obtain a schema id -- the exact response shape was not independently verified beyond that, so treat the returned payload as best-effort. Use the 'id' of the schema with schemaType 'Contacts' as input to schema-scoped tools like List Contact Attribute Groups.`,
    params: [],
  },
  {
    name: 'salesforcemarketingcloud_contact_search',
    description: `Search for contacts and their associated addresses in Salesforce Marketing Cloud by a single filterable attribute. Uses the Contacts/Addresses REST search endpoint: POST /contacts/v1/addresses/search/{attributeName}. Choose the attribute to filter on (ContactKey, LastModfiedDate, Source, Channel, Status, or AudienceID [note: 'LastModfiedDate' is spelled exactly this way, without the second 'i', in Salesforce's own API] ) and provide the value to match; currently only the 'Is' comparison operator is supported. Returns matching addresses with their contactID/contactKey and channel-specific value sets (e.g. email or mobile number details).`,
    params: [
      {
        name: 'attribute_name',
        type: 'string',
        required: true,
        description: `The contact/address attribute to filter on. One of: ContactKey, LastModfiedDate (last modified date range), Source, Channel (MOBILE, PUSH, LINE, or EMAIL), Status, or AudienceID.`,
      },
      {
        name: 'filter_condition_value',
        type: 'string',
        required: true,
        description: `The value to match against the chosen attribute_name. For Channel use MOBILE, PUSH, LINE, or EMAIL. For LastModfiedDate, separate a start and end date with 'AND', e.g. '2024-01-01T00:00:00 AND 2024-12-31T23:59:59'. Example for ContactKey: CRM-00123.`,
      },
      {
        name: 'filter_condition_operator',
        type: 'string',
        required: false,
        description: `Comparison operator to apply. Marketing Cloud currently supports only 'Is'.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_contact_update',
    description: `Update an existing contact's attribute data in Salesforce Marketing Cloud using the Contacts REST API. Identify the contact by its Contact Key and supply one or more attribute sets (Contact Builder data extensions/attribute groups) whose values should be written. Only the attribute sets you include are modified; other data on the contact is left unchanged. Returns operation status and the resulting contactId.`,
    params: [
      {
        name: 'attribute_sets',
        type: 'array',
        required: true,
        description: `Array of attribute sets to update on the contact. Each item has shape {"name": "<attribute set name>", "items": [{"values": [{"name": "<attribute name>", "value": "<attribute value>"}]}]}. Each call accepts only one instance of each attribute set. Example: [{"name": "Email Addresses", "items": [{"values": [{"name": "Email Address", "value": "jane.doe@example.com"}]}]}]`,
      },
      {
        name: 'contact_key',
        type: 'string',
        required: true,
        description: `The Contact Key of the existing contact to update. Example: CRM-00123.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_data_extension_create',
    description: `Create a new data extension (custom object) schema in Salesforce Marketing Cloud via the Custom Object REST API (POST /data/v1/customobjects). Define the data extension's name, folder, optional external key, whether it's usable as a send audience, and its columns (each with a name, type, and which one serves as the primary key). Live-confirmed: the folder ID is required -- a call without it is rejected, despite this field once implying an account default existed. Get a valid folder ID from the categoryId of any existing data extension (returned by Get or List Data Extension) or from Contact Builder / Email Studio's folder view. This only creates the schema/structure; use a separate data-rows tool to insert rows afterward. On success, returns the created data extension's key, name, and fields.`,
    params: [
      {
        name: 'category_id',
        type: 'integer',
        required: true,
        description: `Numeric ID of the Contact Builder/Email Studio folder (category) to create this data extension in. Confirmed required by Salesforce -- a call without it is rejected with "A valid categoryId must be provided". Get a valid ID from the categoryId of any existing data extension (Get or List Data Extension) or from the folder view in Contact Builder / Email Studio.`,
      },
      {
        name: 'fields',
        type: 'array',
        required: true,
        description: `Array of field (column) definitions for the data extension. Each field needs a name and a type -- Text, Number, Date, Boolean, EmailAddress, Phone, Decimal, or Locale, with Text/Decimal fields also taking a length and an ordinal for column ordering. Mark the column(s) that uniquely identify a row as the primary key; primary key columns can't be nullable. A handful of less-common flags (template/inheritance/override/visibility behavior, mainly relevant to Shared Data Extensions) can also be set per field but are rarely needed. Example: [{"name": "SubscriberKey", "type": "Text", "length": 254, "ordinal": 1, "isPrimaryKey": true, "isNullable": false}, {"name": "EmailAddress", "type": "EmailAddress", "ordinal": 2, "isPrimaryKey": false, "isNullable": true}]`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Display name of the new data extension, shown in Email Studio / Contact Builder under Subscribers > Data Extensions. Example: Customer Master.`,
      },
      {
        name: 'is_sendable',
        type: 'boolean',
        required: false,
        description: `Whether this data extension can be used as an email/SMS send audience. If true, sendable_custom_object_field and sendable_subscriber_field should also be provided. Omit for a standard (non-sendable) data extension.`,
      },
      {
        name: 'key',
        type: 'string',
        required: false,
        description: `External key (customer key) for the data extension. If omitted, Marketing Cloud generates one automatically. Providing your own key makes the data extension easier to reference later (e.g. from other tools by its customer key). Example: Customer_Master_DE.`,
      },
      {
        name: 'sendable_custom_object_field',
        type: 'string',
        required: false,
        description: `Name of the field on this data extension used to relate its rows to subscribers when is_sendable is true (e.g. the field holding the subscriber's email address or key). Required if is_sendable is true.`,
      },
      {
        name: 'sendable_subscriber_field',
        type: 'string',
        required: false,
        description: `The subscriber-side field this data extension's sendable field maps to, typically '_SubscriberKey' or '_EmailAddress'. Required if is_sendable is true.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_data_extension_delete',
    description: `Permanently delete a Data Extension (and every row of data it contains) from Salesforce Marketing Cloud using the Custom Object REST API (DELETE), looked up by its customer key (external key). This action is irreversible — once deleted, the Data Extension's rows cannot be recovered. A Data Extension that has active data relationships (in Contact Builder/Data Designer) or that is referenced by a triggered send definition typically cannot be deleted until those relationships or references are removed first. Example key: Customer_Master_DE.`,
    params: [
      {
        name: 'key',
        type: 'string',
        required: true,
        description: `The customer key (external key) of the Data Extension to delete, e.g. Customer_Master_DE. This is the unique, human-assigned identifier for the Data Extension, not its internal ObjectID GUID.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_data_extension_fields_get',
    description: `Retrieve just the field/column definitions of a Data Extension's schema from Salesforce Marketing Cloud's Custom Object REST API: GET /data/v1/customobjects/{id}/fields. This is meant as a narrower sub-resource of the full Get Data Extension response (which already returns a fields array alongside the data extension's other metadata) -- use it when you only need the column list. IMPORTANT (confirmed by live testing against a real Marketing Cloud connection): despite this operation appearing in the Custom Objects API reference as a sibling of the create/update/delete/get-by-id operations, the path parameter only works when you pass the Data Extension's internal ObjectID (a GUID, e.g. 51195004-bc92-ef11-a5d1-5cba2c191058) -- the same GUID returned as 'id' by List Data Extensions or Get Data Extension. Passing the customer/external key instead (e.g. 'Customer_Master_DE'), with or without spaces, and even with a 'key:' prefix, was confirmed live to fail with HTTP 400 'Id is invalid' -- the exact same failure the sibling Get Data Extension tool produces for the same external key, which only succeeds once given the GUID. If this returns a 404 or 400 'Id is invalid', use Get Data Extension with the GUID instead and read its fields array.`,
    params: [
      {
        name: 'key',
        type: 'string',
        required: true,
        description: `The Data Extension's internal ObjectID (a GUID), e.g. 51195004-bc92-ef11-a5d1-5cba2c191058. Confirmed by live testing: this endpoint only accepts the ObjectID GUID here, NOT the customer/external key -- passing the external key (with or without spaces, with or without a 'key:' prefix) fails with HTTP 400 'Id is invalid'. Get the ObjectID from the 'id' field returned by List Data Extensions or Get Data Extension.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_data_extension_get',
    description: `Retrieve a Data Extension's schema (fields and properties) from Salesforce Marketing Cloud using the Custom Object REST API, looked up by its customer key (external key). Returns the Data Extension's metadata (name, customer key, description, category, sendable configuration such as isSendable/sendableCustomObjectField/sendableSubscriberField) and its full fields array, where each field includes name, data type, length, ordinal position, and constraints such as isPrimaryKey and isNullable. Use this to inspect a Data Extension's structure before reading or writing rows to it. Example key: Customer_Master_DE.`,
    params: [
      {
        name: 'key',
        type: 'string',
        required: true,
        description: `The customer key (external key) of the Data Extension to retrieve, e.g. Customer_Master_DE. This is the unique, human-assigned identifier for the Data Extension, not its internal ObjectID GUID.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_data_extension_import_start',
    description: `Queue and start a one-time import of data from a file already sitting on a configured File Transfer Location directly into a Data Extension in Salesforce Marketing Cloud, using POST /data/v1/async/import. This lets you trigger a bulk file-based import without first creating a reusable Import Definition/Automation Studio import activity -- the source file, target Data Extension, column-mapping strategy, and file transfer location are all specified inline in a single call. The call returns immediately with an id identifying the queued import job; poll the Get Data Extension Import Status tool (GET /data/v1/async/import/{id}/summary) with that id to check progress and row counts, and use the Get Data Extension Import Validation Summary/Result tools to inspect any rejected rows. Before calling this: the source file must already exist at the given location (upload it there separately -- this tool does not upload file bytes), the File Transfer Location must already exist (see the File Transfer Location tools), and the target Data Extension must already exist (see Create Data Extension). Salesforce's official reference page for this resource (developer.salesforce.com/docs/marketing/marketing-cloud/references/mc-import_job_api) is a client-rendered page that returned a 403/empty shell on every fetch attempt at authoring time -- the same bot-protection behavior already documented on this connector's File Transfer Location tools -- so the exact request body shape below could not be confirmed against the primary source. It is instead a best-effort reconstruction cross-checked across multiple independent third-party technical write-ups describing this Spring '24 Salesforce Marketing Cloud REST API feature (a dedicated SFMC blog post and its author's own translated mirror, corroborated by several independent secondary summaries that separately named the same field names: source.fileInfo.{specifier,contentType,hasMultipleFiles,standardQuotedStrings}, target.{type,key,updateType}, mapping.{fieldMappingType,allowErrors}, transport.key). Smoke-test this call against a real tenant before relying on it in production -- updateType and fieldMappingType's exact accepted values are the most likely point of divergence from your account's behavior, and Overwrite is destructive to the target Data Extension's existing contents if chosen.`,
    params: [
      {
        name: 'data_extension_key',
        type: 'string',
        required: true,
        description: `Customer key (external key) of the target Data Extension that rows will be imported into, e.g. Customer_Master_DE. This is the unique, human-assigned identifier for the Data Extension, not its internal ObjectID GUID. The Data Extension must already exist -- create one with the Create Data Extension tool if needed.`,
      },
      {
        name: 'file_specifier',
        type: 'string',
        required: true,
        description: `Name or file-matching pattern of the source file to import, as located on the file transfer location given in transport_key, relative to that location's configured directory. Example: TransactionData_20250301.csv. If has_multiple_files is true, this can be a pattern matching several files to import together.`,
      },
      {
        name: 'transport_key',
        type: 'string',
        required: true,
        description: `Customer Key of the File Transfer Location where the source file (file_specifier) is located. Create or find one with the File Transfer Location tools -- List File Transfer Locations returns each location's Customer Key.`,
      },
      {
        name: 'update_type',
        type: 'string',
        required: true,
        description: `How imported rows are reconciled against existing rows in the target Data Extension, matched on primary key. AddAndUpdate inserts new rows and updates existing ones (upsert). AddAndDoNotUpdate inserts only new rows and skips rows that already exist. UpdateButDoNotAdd updates only rows that already exist and skips new ones. Overwrite replaces the Data Extension's entire contents with the imported file -- this is destructive to existing data.`,
      },
      {
        name: 'allow_errors',
        type: 'boolean',
        required: false,
        description: `Whether the import job should skip rows with errors and keep processing the rest of the file (true, the documented example default), rather than aborting the entire job on the first bad row (false).`,
      },
      {
        name: 'field_mapping_type',
        type: 'string',
        required: false,
        description: `How columns in the source file are matched to Data Extension fields. InferFromColumnHeadings (default) matches by comparing the file's header row column names against field names; MapByOrdinal matches purely by column position, ignoring header names entirely.`,
      },
      {
        name: 'file_content_type',
        type: 'string',
        required: false,
        description: `Delimiter format of the source file. CSV for comma-separated values (default), TAB for tab-separated values.`,
      },
      {
        name: 'has_multiple_files',
        type: 'boolean',
        required: false,
        description: `Whether file_specifier should be treated as a pattern matching multiple files to import together in one job (true), or a single exact file name (false, default).`,
      },
      {
        name: 'standard_quoted_strings',
        type: 'boolean',
        required: false,
        description: `Whether field values in the source file follow standard CSV quoting rules (double quotes wrapping values that contain the delimiter or newlines, with internal quotes doubled to escape them). Defaults to true; set to false only if the file uses non-standard quoting.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_data_extension_import_status_get',
    description: `Check the status and row-count summary of a one-time Data Extension import job in Salesforce Marketing Cloud (queued by the Start Data Extension Import tool), using GET /data/v1/async/import/{id}/summary. Pass the id returned when the import was started. The response reports the job's overall progress/outcome plus row counts (e.g. total, successful, and errored rows) once the job reaches a terminal state. Poll this endpoint until the job's status is terminal (complete or errored) before assuming the import has finished, then use the Get Data Extension Import Validation Summary and Get Data Extension Import Validation Result tools to inspect the specifics of any rejected rows. as with the Start Data Extension Import tool, Salesforce's official reference page for this resource (developer.salesforce.com/docs/marketing/marketing-cloud/references/mc-import_job_api) is a client-rendered page that returned a 403/empty shell on every fetch attempt at authoring time -- the same bot-protection behavior already documented on this connector's File Transfer Location tools. The path itself (an id-scoped .../summary GET returning row counts) is corroborated by an independent third-party technical reconstruction of this Spring '24 SFMC REST API family, but the exact response field names were not directly confirmed against the primary source -- verify the live response shape before depending on a specific field name downstream.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The id returned when the import job was queued by the Start Data Extension Import tool. Example: 8f14e45f-ceea-467e-b7ac-1a1a1a1a1a1a.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_data_extension_import_validation_result_get',
    description: `Get row-level validation details for a one-time Data Extension import job in Salesforce Marketing Cloud, using GET /data/v1/async/import/{id}/validationresult. Pass the id returned when the import was started (Start Data Extension Import tool). This returns the specific records that failed validation and, per publicly documented behavior of this endpoint, names the problematic field(s) on each -- use it after Get Data Extension Import Validation Summary has told you rows failed, when you need to know exactly which rows and fields caused the failures (for example, to fix and re-import them). Typically called after Get Data Extension Import Status shows the job reached a terminal state and reported errored rows. Salesforce's official reference page for this resource (developer.salesforce.com/docs/marketing/marketing-cloud/references/mc-import_job_api) is a client-rendered page that returned a 403/empty shell on every fetch attempt at authoring time -- the same bot-protection behavior already documented on this connector's File Transfer Location tools. This exact path and its 'per-record, per-field detail' behavior are corroborated by independent third-party summaries of this Spring '24 SFMC REST API family, but the precise response field names (e.g. row number, field name, error message) were not directly confirmed against the primary source -- verify the live response shape before depending on a specific field name downstream.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The id returned when the import job was queued by the Start Data Extension Import tool. Example: 8f14e45f-ceea-467e-b7ac-1a1a1a1a1a1a.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_data_extension_import_validation_summary_get',
    description: `Get the validation summary for a one-time Data Extension import job in Salesforce Marketing Cloud, using GET /data/v1/async/import/{id}/validationsummary. Pass the id returned when the import was started (Start Data Extension Import tool). This returns a high-level rollup of how many rows in the source file passed vs. failed validation and, per publicly documented behavior of this endpoint, groups failures by category (for example, rows missing a required field) -- it does not list every individual failing row or which specific fields on which rows were the problem; use the Get Data Extension Import Validation Result tool for that row-level detail. Typically called after Get Data Extension Import Status shows the job reached a terminal state and reported errored rows. Salesforce's official reference page for this resource (developer.salesforce.com/docs/marketing/marketing-cloud/references/mc-import_job_api) is a client-rendered page that returned a 403/empty shell on every fetch attempt at authoring time -- the same bot-protection behavior already documented on this connector's File Transfer Location tools. This exact path and its 'grouped counts, not row-level detail' behavior are corroborated by independent third-party summaries of this Spring '24 SFMC REST API family, but the precise response field names were not directly confirmed against the primary source -- verify the live response shape before depending on a specific field name downstream.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The id returned when the import job was queued by the Start Data Extension Import tool. Example: 8f14e45f-ceea-467e-b7ac-1a1a1a1a1a1a.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_data_extension_list',
    description: `Search/list data extensions (custom objects) in the account via GET /data/v1/customobjects, the collection form of the Custom Object REST API used by the Get Data Extension tool (GET /data/v1/customobjects/{key}). Returns each matching data extension's external key, name, and schema metadata. IMPORTANT: this endpoint is a search, not an unfiltered listing — Salesforce requires a non-empty '$search' query parameter on every call (confirmed live: omitting it fails with HTTP 400 'errorcode 10005: $search is a required parameter'), and per Salesforce's own Marketing Cloud Engagement MCP server documentation, that search term must be real text — wildcards such as '*' or '%' are rejected, so there is no way to request 'all data extensions' in a single call. Pass a substring of the data extension's name to search for; supports optional pagination. Note: Salesforce's rendered documentation for this collection-level GET was not directly accessible during authoring (consistent with the rest of this connector's build notes); the $search requirement and its constraints were confirmed via a live 400 response plus Salesforce's official MCE MCP server blog post, and the single-item GET by key on this same resource family is separately confirmed working. Verify pagination parameter names during testing and adjust if the API rejects them.`,
    params: [
      {
        name: 'search',
        type: 'string',
        required: true,
        description: `Required search term used to find data extensions by name (substring match). Salesforce's Custom Object REST API rejects requests with no $search value, an empty string, or a wildcard such as '*' or '%' — a real, non-empty search term must be supplied on every call. Example: 'Customer' to find data extensions with 'Customer' in their name.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number of results to return, for accounts with many data extensions. Starts at 1.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of data extensions to return per page.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_data_extension_row_async_results_get',
    description: `Retrieve the detailed, row-level results of a completed asynchronous Data Extension row job (insert/upsert/delete) in Salesforce Marketing Cloud, using GET /data/v1/async/{requestId}/results. This is distinct from the Get Async Row Job Status tool (GET /data/v1/async/{requestId}/status), which only reports overall job state (requestStatus, resultStatus, hasErrors) -- this endpoint returns the outcome of each individual row in the batch, so you can tell exactly which rows succeeded and which failed, with a status and error detail per row. Pass the same requestId returned when the row job was queued (async insert/upsert/delete tools), and call the Get Async Row Job Status tool first, fetching results only once that shows the job reached a terminal state. Results are paginated. request_id MUST be a well-formed GUID copied verbatim from a prior async row job -- as with the async row status tool, passing an arbitrary or malformed string is not guaranteed to be rejected cleanly and may return an ungraceful server error instead of a clean 400. Salesforce's official reference page for this resource (developer.salesforce.com/docs/marketing/marketing-cloud/references/mc-data_extension_rows_async) is a client-rendered page that returned a 403/empty shell on every fetch attempt at authoring time -- the same bot-protection behavior already documented on this connector's File Transfer Location tools. The path itself is corroborated by the page's own indexed sub-section title ('Get Results of Asynchronous Request'); the response shape used here (requestId, page, pageSize, count, and an items array of per-row {status, errorCode, message} objects) and the page/pageSize request parameters below come from an independent third-party technical reconstruction, not the primary source -- verify the live request/response shape before depending on a specific field or parameter name, and omit page/pageSize entirely if the API does not honor them as expected.`,
    params: [
      {
        name: 'request_id',
        type: 'string',
        required: true,
        description: `The requestId returned when the asynchronous Data Extension row job was queued (from the async row insert/upsert/delete tool), or reported by the Get Async Row Job Status tool. Must be the exact GUID returned by that prior call, e.g. 3fa85f64-5717-4562-b3fc-2c963f66afa6 -- not an arbitrary string.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number of row-level results to return, starting at 1. Use with page_size to page through large batches. Not independently confirmed against Salesforce's primary documentation -- see the tool description.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of row-level results to return per page. Not independently confirmed against Salesforce's primary documentation -- see the tool description.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_data_extension_row_async_status',
    description: `Check the status and result of an asynchronous Data Extension row job (created by the asynchronous row insert/upsert/delete tools) in Salesforce Marketing Cloud, using the requestId returned when the job was queued. The response includes a nested status object with fields such as requestStatus (e.g. 'InProgress', 'Complete', 'Error'), resultStatus (e.g. 'OK' or an error indicator), hasErrors, callDateTime, and completionDateTime. Poll this endpoint until requestStatus reaches a terminal state before assuming the row write has finished. request_id MUST be a well-formed GUID copied verbatim from the requestId a prior async row job (insert/upsert/delete) returned when it was queued — passing an arbitrary or malformed string is not rejected with a clean 400 but instead causes Salesforce to return an ungraceful HTTP 500. Example requestId: 3fa85f64-5717-4562-b3fc-2c963f66afa6.`,
    params: [
      {
        name: 'request_id',
        type: 'string',
        required: true,
        description: `The requestId returned when the asynchronous Data Extension row job was queued (from the async row insert/upsert/delete tool). Must be the exact GUID returned by that prior call, e.g. 3fa85f64-5717-4562-b3fc-2c963f66afa6 — not an arbitrary string.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_data_extension_row_async_upsert',
    description: `Queue an asynchronous job to insert or update (upsert) a large batch of rows into a Data Extension in Salesforce Marketing Cloud, looked up by the Data Extension's customer key (external key). Unlike the synchronous row insert/upsert tools, this is designed for large payloads and returns immediately with a requestId rather than waiting for the write to complete — poll the async row status tool with that requestId to check progress and results. Each row is a flat object of field name to value pairs, including the Data Extension's primary key field(s); rows whose primary key already exists are updated, others are inserted. Example key: Customer_Master_DE.`,
    params: [
      {
        name: 'items',
        type: 'array',
        required: true,
        description: `Array of rows to insert or upsert asynchronously. Each row is a flat object mapping field name to value, and must include the Data Extension's primary key field(s). Example: [{"SubscriberKey": "12345", "FirstName": "Jane", "EmailAddress": "jane@example.com"}]`,
      },
      {
        name: 'key',
        type: 'string',
        required: true,
        description: `The customer key (external key) of the Data Extension to upsert rows into, e.g. Customer_Master_DE. This is the unique, human-assigned identifier for the Data Extension, not its internal ObjectID GUID.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_data_extension_row_column_increment',
    description: `Atomically increment (or decrement, with a negative amount) a numeric column on a single Data Extension row in Salesforce Marketing Cloud, without a read-then-write round trip. Uses the Data Extension Rows (Synchronous) API's route PUT /hub/v1/dataevents/key:{externalKey}/rows/{primaryKey}:{primaryKeyValue}/column/{column}/increment, confirmed directly on Salesforce's live 'Data Extension Rows (Synchronous)' reference page (the 'Increment Column Value by Using a Data Extension External Key' operation). The row is identified by the Data Extension's external (customer) key plus the name and value of its primary key field; the column to modify is a separate path segment. This tool sends the increment amount in the request body as {"value": <amount>} - that specific body field name follows this route family's typical convention but could not be independently re-confirmed against the live doc content in this session (the page renders its endpoint details via client-side JavaScript that this tool's fetcher cannot execute), so smoke-test the body shape once against a sandbox Data Extension and adjust rest_api_info.body_json_mapping if Marketing Cloud rejects the 'value' key. This only works on a Data Extension with a simple (non-composite) primary key matching primary_key_field/primary_key_value; composite-key Data Extensions are not supported by this route. Example: external_key Customer_Master_DE, primary_key_field SubscriberKey, primary_key_value 12345, column LoginCount, increment_by 1.`,
    params: [
      {
        name: 'column',
        type: 'string',
        required: true,
        description: `Name of the numeric column on the Data Extension to increment. Example: LoginCount.`,
      },
      {
        name: 'external_key',
        type: 'string',
        required: true,
        description: `The customer key (external key) of the Data Extension containing the row to update, e.g. Customer_Master_DE. This is the unique, human-assigned identifier for the Data Extension, not its internal ObjectID GUID.`,
      },
      {
        name: 'increment_by',
        type: 'number',
        required: true,
        description: `The amount to add to the current column value. Use a negative number to decrement instead. Example: 1.`,
      },
      {
        name: 'primary_key_field',
        type: 'string',
        required: true,
        description: `The name of the Data Extension's (single, non-composite) primary key field that identifies the row to update. Example: SubscriberKey.`,
      },
      {
        name: 'primary_key_value',
        type: 'string',
        required: true,
        description: `The value of the primary key field identifying the specific row to update. Example: 12345.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_data_extension_row_delete',
    description: `Permanently delete every row in a Data Extension in Salesforce Marketing Cloud that matches an OData-style filter, using the Custom Object Data REST API, looked up by the Data Extension's customer key (external key). This is a bulk, filter-based delete — all rows matching the filter are removed and cannot be recovered. To delete a single, specific row instead, use the delete-row-by-primary-key tool. Example key: Customer_Master_DE, example filter: "Status eq 'Inactive'".`,
    params: [
      {
        name: '$filter',
        type: 'string',
        required: true,
        description: `OData-style filter expression selecting which rows to delete. Only rows matching this filter are removed. Example: "Status eq 'Inactive'" or "LastActivityDate lt '2024-01-01'". This tool has no 'delete everything' mode — a filter is always required.`,
      },
      {
        name: 'key',
        type: 'string',
        required: true,
        description: `The customer key (external key) of the Data Extension to delete rows from, e.g. Customer_Master_DE. This is the unique, human-assigned identifier for the Data Extension, not its internal ObjectID GUID.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_data_extension_row_delete_by_key',
    description: `Permanently delete a single row from a Data Extension in Salesforce Marketing Cloud using the Custom Object Data REST API, looked up by the Data Extension's customer key (external key) plus the row's primary key value(s). If the Data Extension has a single primary key field, pass just its value (e.g. "user@example.com"). If it has a composite (multi-column) primary key, pass comma-separated Field:Value pairs (e.g. "Email:user@example.com,Country:US"). This action is irreversible. To delete multiple rows matching a condition instead, use the filter-based bulk delete tool. Example key: Customer_Master_DE.`,
    params: [
      {
        name: 'key',
        type: 'string',
        required: true,
        description: `The customer key (external key) of the Data Extension to delete the row from, e.g. Customer_Master_DE. This is the unique, human-assigned identifier for the Data Extension, not its internal ObjectID GUID.`,
      },
      {
        name: 'primary_key',
        type: 'string',
        required: true,
        description: `The primary key value identifying the row to delete. For a Data Extension with a single primary key field, pass just the value (e.g. "user@example.com"). For a composite primary key, pass comma-separated Field:Value pairs (e.g. "Email:user@example.com,Country:US").`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_data_extension_row_delete_rowset',
    description: `Synchronously and permanently delete a batch of rows from a Data Extension in Salesforce Marketing Cloud, given an explicit list of primary-key values, using the Data Extension Rows (Synchronous) API's rowset delete route (POST /hub/v1/dataevents/key:{dEExternalKey}/rowset/delete, operationId deleteDERowSetByKey). Each item in the request identifies one row to delete via a 'keys' object containing the Data Extension's primary key field name(s) and value(s) - the same keys/values row shape used by this API family's rowset insert/upsert route, but with only 'keys' needed since no field values are being written. This is irreversible - deleted rows cannot be recovered. Use this for a known, explicit list of primary keys; to delete rows matching a filter condition instead, use the OData filter-based bulk delete tool, and to delete a single row use the delete-row-by-primary-key tool. Example key: Customer_Master_DE, example items: [{"keys": {"SubscriberKey": "12345"}}, {"keys": {"SubscriberKey": "67890"}}]. LIVE-CONFIRMED (2026-08-25): the endpoint itself is real -- sending the request body wrapped in an {"items": [...]} envelope got a genuine 'JSON Deserialization Exception' from Salesforce, but sending the bare array directly as the request body got a clean 403 (Insufficient Privileges), proving Salesforce accepted and parsed the request correctly once the envelope was removed. The tool's wire format has been corrected to send a bare array.`,
    params: [
      {
        name: 'items',
        type: 'array',
        required: true,
        description: `Array of rows to delete, each identified by a 'keys' object containing the Data Extension's primary key field name(s) and value(s). Example: [{"keys": {"SubscriberKey": "12345"}}, {"keys": {"SubscriberKey": "67890"}}]`,
      },
      {
        name: 'key',
        type: 'string',
        required: true,
        description: `The customer key (external key) of the Data Extension to delete rows from, e.g. Customer_Master_DE. This is the unique, human-assigned identifier for the Data Extension, not its internal ObjectID GUID.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_data_extension_row_get',
    description: `Retrieve a single row from a Data Extension in Salesforce Marketing Cloud using the Custom Object Data REST API, looked up by the Data Extension's customer key (external key) plus the row's primary key value(s). If the Data Extension has a single primary key field, pass just its value (e.g. "user@example.com"). If it has a composite (multi-column) primary key, pass comma-separated Field:Value pairs (e.g. "Email:user@example.com,Country:US"). The response splits the row into a 'keys' object (the primary key field(s) and their values) and a 'values' object (every other field and its value). Example key: Customer_Master_DE.`,
    params: [
      {
        name: 'key',
        type: 'string',
        required: true,
        description: `The customer key (external key) of the Data Extension to read the row from, e.g. Customer_Master_DE. This is the unique, human-assigned identifier for the Data Extension, not its internal ObjectID GUID.`,
      },
      {
        name: 'primary_key',
        type: 'string',
        required: true,
        description: `The primary key value identifying the row to retrieve. For a Data Extension with a single primary key field, pass just the value (e.g. "user@example.com"). For a composite primary key, pass comma-separated Field:Value pairs (e.g. "Email:user@example.com,Country:US").`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_data_extension_row_insert',
    description: `Synchronously insert one or more new rows into a Data Extension in Salesforce Marketing Cloud using the Custom Object Data REST API, looked up by the Data Extension's customer key (external key). Each row is provided as an object with a 'keys' sub-object (the Data Extension's primary key field name(s) and value(s)) and a 'values' sub-object (every other field name and value to set). Best suited for small, immediate inserts (a handful to a few hundred rows); for large bulk loads, use the asynchronous row insert/upsert tool instead. Inserting a row whose primary key already exists typically fails — use the upsert tool if the row may already exist. Example key: Customer_Master_DE.`,
    params: [
      {
        name: 'items',
        type: 'array',
        required: true,
        description: `Array of rows to insert. Each row object has a 'keys' object containing the Data Extension's primary key field name(s) and value(s), and an optional 'values' object containing every other field name and value to set. Example: [{"keys": {"Email": "user@example.com"}, "values": {"FirstName": "Jane", "Status": "Active"}}]`,
      },
      {
        name: 'key',
        type: 'string',
        required: true,
        description: `The customer key (external key) of the Data Extension to insert rows into, e.g. Customer_Master_DE. This is the unique, human-assigned identifier for the Data Extension, not its internal ObjectID GUID.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_data_extension_row_list',
    description: `Retrieve rows of data from a Data Extension in Salesforce Marketing Cloud using the Custom Object Data REST API, looked up by the Data Extension's customer key (external key). Each returned row is split into a 'keys' object (the primary key field(s) and their values) and a 'values' object (every other field and its value). Supports an OData-style $filter expression to narrow results (e.g. "Status eq 'Active'"), and $page/$pageSize for pagination (up to 2500 rows per page). Filtering, sorting, and paging beyond the first page are only fully supported for sendable Data Extensions — requests against non-sendable Data Extensions can return a maximum of 200 rows. Example key: Customer_Master_DE.`,
    params: [
      {
        name: 'key',
        type: 'string',
        required: true,
        description: `The customer key (external key) of the Data Extension to read rows from, e.g. Customer_Master_DE. This is the unique, human-assigned identifier for the Data Extension, not its internal ObjectID GUID.`,
      },
      {
        name: '$filter',
        type: 'string',
        required: false,
        description: `OData-style filter expression to narrow which rows are returned. Example: "Status eq 'Active'" or "LoyaltyPoints gt 100". Leave blank to return all rows (subject to paging limits).`,
      },
      {
        name: '$page',
        type: 'integer',
        required: false,
        description: `Page number of results to return, starting at 1. Use with $pageSize to page through large result sets.`,
      },
      {
        name: '$pageSize',
        type: 'integer',
        required: false,
        description: `Number of rows to return per page. Up to 2500 rows can be retrieved per page for sendable Data Extensions; non-sendable Data Extensions are capped at 200 total rows regardless of this value.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_data_extension_row_upsert',
    description: `Synchronously insert or update (upsert) one or more rows in a Data Extension in Salesforce Marketing Cloud using the Custom Object Data REST API, looked up by the Data Extension's customer key (external key). Each row is provided as an object with a 'keys' sub-object (the Data Extension's primary key field name(s) and value(s)) and a 'values' sub-object (every other field name and value to set). If a row with the given key(s) already exists it is updated in place; otherwise a new row is created. Best suited for small, immediate upserts (a handful to a few hundred rows); for large bulk loads, use the asynchronous row insert/upsert tool instead. Example key: Customer_Master_DE.`,
    params: [
      {
        name: 'items',
        type: 'array',
        required: true,
        description: `Array of rows to insert or update. Each row object has a 'keys' object containing the Data Extension's primary key field name(s) and value(s), and an optional 'values' object containing every other field name and value to set. Example: [{"keys": {"Email": "user@example.com"}, "values": {"FirstName": "Jane", "Status": "Active"}}]`,
      },
      {
        name: 'key',
        type: 'string',
        required: true,
        description: `The customer key (external key) of the Data Extension to upsert rows into, e.g. Customer_Master_DE. This is the unique, human-assigned identifier for the Data Extension, not its internal ObjectID GUID.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_data_extension_update',
    description: `Update an existing Data Extension's schema in Salesforce Marketing Cloud using the Custom Object REST API (PATCH), looked up by its customer key (external key). Use this to rename the Data Extension, change its description or folder (category), update its sendable configuration (isSendable/sendableCustomObjectField/sendableSubscriberField), or add new fields / modify existing fields. To modify an existing field rather than create a new one, reference it by its exact current field name — adding a field object with a name that doesn't already exist creates a brand-new column instead. Fields cannot be removed via this endpoint. Only the properties you supply are changed; any property left blank keeps its current value. Example key: Customer_Master_DE.`,
    params: [
      {
        name: 'key',
        type: 'string',
        required: true,
        description: `The customer key (external key) of the Data Extension to update, e.g. Customer_Master_DE. This is the unique, human-assigned identifier for the Data Extension, not its internal ObjectID GUID.`,
      },
      {
        name: 'category_id',
        type: 'integer',
        required: false,
        description: `ID of the Content Builder/Data Extension folder (category) to move this Data Extension into. Leave blank to keep its current folder.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New description text for the Data Extension. Leave blank to keep the current description.`,
      },
      {
        name: 'fields',
        type: 'array',
        required: false,
        description: `Array of field definitions to add or update. To add a new field, include an object with at least name and fieldType (e.g. Text, Number, Date, Boolean, EmailAddress, Decimal, Locale, Phone) plus any relevant attributes (maxLength, isRequired, isPrimaryKey, defaultValue, scale). To modify an existing field, reference it by its exact current name instead of introducing a new one. Example: [{"name": "LoyaltyTier", "fieldType": "Text", "maxLength": 50, "isRequired": false}]`,
      },
      {
        name: 'is_sendable',
        type: 'boolean',
        required: false,
        description: `Whether this Data Extension can be used as an email/SMS send audience. Set to true to make it sendable (requires sendable_custom_object_field and sendable_subscriber_field to also be configured, either now or previously). Leave blank to keep the current setting.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New name for the Data Extension. Leave blank to keep the current name.`,
      },
      {
        name: 'sendable_custom_object_field',
        type: 'string',
        required: false,
        description: `Name of the field within this Data Extension that maps to the subscriber attribute named in sendable_subscriber_field (e.g. 'SubscriberKey' or 'EmailAddress'). Used together with is_sendable.`,
      },
      {
        name: 'sendable_subscriber_field',
        type: 'string',
        required: false,
        description: `Name of the corresponding subscriber attribute that this Data Extension's sendable_custom_object_field maps to, e.g. '_SubscriberKey' or '_EmailAddress' — the underscore-prefixed system subscriber attribute name (not the human-readable label shown in the Email Studio UI dropdown, e.g. not 'Subscriber Key' with a space). Used together with is_sendable.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_domain_verification_bulk_submit',
    description: `Queue an asynchronous bulk domain verification check in Salesforce Marketing Cloud, using POST /messaging/v1/domainverification/bulk/insert. Domain Verification is a new resource category for this connector. Supply a notification_email to be notified when the job completes, plus either an explicit addresses array of email addresses to check, or a Data Extension column reference (de_table + de_column) so Marketing Cloud pulls the addresses to check from an existing Data Extension column instead -- provide exactly one of addresses or the de_table/de_column pair, not both. The call returns immediately with HTTP 201 and an async requestId identifying the queued job; the job's outcome is delivered via the notification email rather than in this call's response.`,
    params: [
      {
        name: 'notification_email',
        type: 'string',
        required: true,
        description: `Email address to notify when the bulk domain verification check completes, e.g. 'ops@example.com'.`,
      },
      {
        name: 'addresses',
        type: 'array',
        required: false,
        description: `Explicit array of email addresses to check, e.g. ["a@example.com", "b@example.com"]. Provide this OR de_table/de_column, not both.`,
      },
      {
        name: 'de_column',
        type: 'string',
        required: false,
        description: `Name of the column within de_table that holds the email addresses to check, e.g. 'EmailAddress'. Required together with de_table when not supplying an explicit addresses array.`,
      },
      {
        name: 'de_table',
        type: 'string',
        required: false,
        description: `Name or customer key of the Data Extension containing the email addresses to check. Required together with de_column when not supplying an explicit addresses array.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_domain_verification_delete',
    description: `Remove one or more domain verification/authentication records from Salesforce Marketing Cloud, using POST /messaging/v1/domainverification/delete. Domain Verification is a new resource category for this connector. The request body is a JSON array of entries, each identifying a record to remove by its EmailAddress (the sender/domain-owner address the authentication record is tied to) and DomainType (the kind of domain record, e.g. 'SenderDomain' or 'TrackingDomain' -- match the domainType value shown for that record by the List Domain Verification Records tool). This permanently deletes the matching stored records and cannot be undone; it does not remove the DNS TXT record you published on the domain, so registering the same domain again later starts a fresh verification flow. This path and body shape are drawn from a secondhand summary of Salesforce's Domain Verification reference rather than the primary page itself, which still 404s to every automated fetch attempt. LIVE-CONFIRMED (2026-08-25): a real call with a well-formed array body reached Salesforce and returned a clean 403 (Insufficient Privileges) with no deserialization complaint -- meaningfully stronger evidence than a doc match alone, since a malformed body shape at this endpoint would be expected to fail parsing before reaching the authorization check (as an earlier, incorrectly-shaped sibling tool's body did). The exact per-call semantics (a batch of records vs. a single domain per call) still isn't independently confirmed, since a 403 happens before Salesforce evaluates the body's business meaning -- verify against a live sandbox with write access before relying on this for a real deletion.`,
    params: [
      {
        name: 'records',
        type: 'array',
        required: true,
        description: `Array of domain verification records to delete. Each entry must include the EmailAddress and DomainType of an existing record, as shown by the List Domain Verification Records tool. Example: [{"EmailAddress": "sender@example.com", "DomainType": "SenderDomain"}]`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_domain_verification_list',
    description: `List the domain verification/authentication records configured for this Salesforce Marketing Cloud account, using GET /messaging/v1/domainverification. Domain Verification is a new resource category for this connector: it tracks the DNS-based authentication status of sending domains, separate from the existing seed list and address validation tools. Each item in the response includes the domain name, its status (e.g. 'Verify' for pending, 'Verified' for complete), domainType (e.g. SenderDomain, TrackingDomain), and isSendable (whether Marketing Cloud will currently send from that domain). Supports pagination with $page/$pageSize, sorting with $orderBy (a field name plus 'asc' or 'desc'), and simple narrowing with $filter (e.g. "Status in ('Verify')" to see only domains still pending verification).`,
    params: [
      {
        name: 'filter',
        type: 'string',
        required: false,
        description: `Optional $filter expression to narrow results, e.g. "Status in ('Verify')" to show only domains still pending verification, or "DomainType eq 'SenderDomain'" to show only one domain type. Combine conditions with 'and'/'or' as needed.`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Sort order for the results, as a field name followed by 'asc' or 'desc', e.g. 'domain asc'. Separate multiple fields with commas.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number of results to retrieve, starting at 1. Use with page_size to page through large result sets.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of domain verification records to return per page. Defaults to 50 if not specified.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_domain_verification_register',
    description: `Register a new sending domain for verification/authentication in Salesforce Marketing Cloud, using POST /messaging/v1/domainverification/register with body {"domain": "<domain>"}. Domain Verification is a new resource category for this connector, covering the DNS-based sender-domain authentication workflow that complements the existing seed list and address validation tools. On success, Marketing Cloud returns the registered domain along with a verification key/token (formatted like 'SFMC-a1b2c3d4e5f67890') that must be published as a DNS TXT record on that domain; once the DNS record is in place and has propagated, call the Verify Registered Domain tool with the same domain and key to complete verification. The domain is not usable for sending until verification succeeds.`,
    params: [
      {
        name: 'domain',
        type: 'string',
        required: true,
        description: `The fully-qualified sending domain to register for verification, e.g. 'mail.example.com'. Do not include a protocol (http/https), path, or trailing slash.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_domain_verification_verify',
    description: `Complete DNS-based verification for a sending domain previously registered with the Register Domain for Verification tool, using POST /messaging/v1/domainverification/verify. Domain Verification is a new resource category for this connector. Submit the domain name and the verification key/token that was returned at registration (formatted like 'SFMC-a1b2c3d4e5f67890'); Marketing Cloud checks DNS for a TXT record on that domain matching the key and, if found, marks the domain verified (updating its status and isSendable flag, visible via the List Domain Verification Records tool). Run this only after the TXT record has been published and has had time to propagate -- calling it too early, or with a key that doesn't match the domain, returns a failure rather than retrying automatically.`,
    params: [
      {
        name: 'domain',
        type: 'string',
        required: true,
        description: `The domain previously registered via the Register Domain for Verification tool, e.g. 'mail.example.com'. Must match exactly what was registered.`,
      },
      {
        name: 'verification_key',
        type: 'string',
        required: true,
        description: `The verification key/token returned by the Register Domain for Verification tool for this domain, e.g. 'SFMC-a1b2c3d4e5f67890'. This value must already be published as a DNS TXT record on the domain before calling this tool.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_email_definition_send',
    description: `Send a transactional/triggered email using a pre-configured Email Studio triggered-send definition (a TriggeredSendDefinition built around an existing email asset), via the Marketing Cloud Messaging REST API. Requires the triggered send definition's identifier (its ObjectID GUID or its external/customer key), the recipient's email address, and a SubscriberKey that uniquely identifies the recipient in Marketing Cloud. Optionally pass contact_attributes for personalization (must match the fields the definition's data extension expects) and override the From address/name. Defaults to asynchronous processing; check delivery status separately via the Email Delivery Details endpoint.`,
    params: [
      {
        name: 'subscriber_key',
        type: 'string',
        required: true,
        description: `The unique SubscriberKey identifying the recipient in Marketing Cloud (used to match/create the subscriber and track sends).`,
      },
      {
        name: 'to_address',
        type: 'string',
        required: true,
        description: `The recipient's email address.`,
      },
      {
        name: 'triggered_send_definition_id',
        type: 'string',
        required: true,
        description: `The identifier of the Email Studio triggered-send definition to send through. Accepts either the definition's ObjectID GUID (as returned when the TriggeredSendDefinition was created) or its external key/customer key set in Email Studio.`,
      },
      {
        name: 'contact_attributes',
        type: 'object',
        required: false,
        description: `Optional object of subscriber attribute name/value pairs used to personalize the email (e.g. merge fields referenced in the email content). The expected keys depend on how the triggered send definition's data extension is configured.`,
      },
      {
        name: 'from_address',
        type: 'string',
        required: false,
        description: `Optional sender email address to override the triggered send definition's default From address.`,
      },
      {
        name: 'from_name',
        type: 'string',
        required: false,
        description: `Optional sender display name to override the triggered send definition's default From name.`,
      },
      {
        name: 'request_type',
        type: 'string',
        required: false,
        description: `Whether the send should be processed asynchronously (ASYNC, default; returns a queued status immediately) or synchronously (SYNC; waits for the send result).`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_email_definition_send_delivery_get',
    description: `Get the delivery record for a single recipient of a message-definition (triggered send) send in Salesforce Marketing Cloud, via the Messaging API's deliveryRecords sub-resource (GET /messaging/v1/messageDefinitionSends/{key}/deliveryRecords/{RecipientSendId}). Use this after calling the triggered-send/message-definition send endpoint to check whether that recipient's message was delivered, is still queued, or errored. On success the response includes status ('Sent', 'Queued', or 'Error'), deliveryTime, id, messageId, and the recipient's to.address/to.id/to.key; an 'Error' status also includes a messageErrors array describing what went wrong. Example send definition key: key:Welcome_TriggeredSend. Example recipient send id: 8f14e45f-ceea-467e-b789-4b2f7e0b1a12.`,
    params: [
      {
        name: 'recipientSendId',
        type: 'string',
        required: true,
        description: `The RecipientSendId that uniquely identifies this specific recipient's message within the send. This value is returned in the response of the message-definition send call (one RecipientSendId per recipient) — you cannot guess it, it must come from that earlier response.`,
      },
      {
        name: 'sendDefinitionKey',
        type: 'string',
        required: true,
        description: `Identifier of the triggered send / message definition that the recipient's message was sent from. Provide either the definition's internal ObjectID (a GUID, used as-is) or its external key prefixed with 'key:' (e.g. key:Welcome_TriggeredSend). This is the same definition identifier used when configuring or triggering the send in Email Studio.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_event_notification_callback_create',
    description: `Register a new callback (webhook) URL with Salesforce Marketing Cloud's Event Notification Service (ENS), using POST /platform/v1/ens-callbacks. Your endpoint must already be online and reachable: as soon as you create the callback, ENS immediately posts verification details to it and expects an HTTP 200 OK response within 30 seconds, or the request fails with 400 Bad Request. Once created and verified, the callback's ID can be used to create subscriptions (see Create Event Notification Subscription) that route specific event types to this URL. The response includes a generated callback_id and a signature_key used to verify the authenticity of incoming webhook payloads.`,
    params: [
      {
        name: 'callback_name',
        type: 'string',
        required: true,
        description: `A unique, human-readable name for this callback registration.`,
      },
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `The HTTPS URL that will receive event notification webhook payloads. Must be publicly reachable, syntactically valid, and not already registered as a callback. Ports and query strings are not supported.`,
      },
      {
        name: 'max_batch_size',
        type: 'integer',
        required: false,
        description: `Maximum number of events to include in a single notification batch posted to this callback URL. Defaults to 1000 if not specified.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_event_notification_callback_delete',
    description: `Permanently delete a registered Event Notification Service (ENS) callback from Salesforce Marketing Cloud, using DELETE /platform/v1/ens-callbacks/{callbackId}. This action is irreversible. Confirmed via the official Salesforce documentation page for Delete Callback: all subscriptions attached to this callback must already be deleted first (use the Delete Event Notification Subscription tool for each one) -- attempting to delete a callback that still has subscriptions returns a 409 Conflict.`,
    params: [
      {
        name: 'callback_id',
        type: 'string',
        required: true,
        description: `The unique ID (UUID) of the callback to permanently delete. All subscriptions on this callback must be deleted first, or the API returns 409 Conflict.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_event_notification_callback_get',
    description: `Retrieve details of a single registered Event Notification Service (ENS) callback by its ID, using GET /platform/v1/ens-callbacks/{callbackId}. The response includes the callback's name, URL, maximum batch size, and its verification status (e.g. verified) with a status reason. Use this to check whether a callback is verified and ready to be used in a subscription.`,
    params: [
      {
        name: 'callback_id',
        type: 'string',
        required: true,
        description: `The unique ID (UUID) of the callback to retrieve.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_event_notification_callback_list',
    description: `List every Event Notification Service (ENS) callback registered on this Marketing Cloud account, using GET /platform/v1/ens-callbacks (confirmed via Salesforce's official 'Get All Callbacks' reference page). The connector can already create a callback (Create Event Notification Callback) and fetch one by ID (Get Event Notification Callback), but had no way to discover which callback IDs already exist -- this tool closes that gap. Returns an array of callback objects, each with callbackId (UUID), callbackName, url, maxBatchSize, and its verification status/statusReason (e.g. whether it's verified and ready to use in a subscription). No query parameters are documented for this endpoint -- it returns the full list in one call, with no pagination or filtering options confirmed.`,
    params: [],
  },
  {
    name: 'salesforcemarketingcloud_event_notification_callback_regenerate_key',
    description: `Regenerate the signature key for a registered Event Notification Service (ENS) callback in Salesforce Marketing Cloud, using PUT /platform/v1/ens-regenerate. The callback's previous signature key is immediately deactivated, so any webhook receiver validating incoming payloads must be updated with the new key before this is called, or signature verification will start failing. Confirmed via the official Salesforce documentation page for Regenerate Signature Key: the response includes the callback's name, ID, HTTPS URL, and the newly generated signature key.`,
    params: [
      {
        name: 'callback_id',
        type: 'string',
        required: true,
        description: `The unique ID (UUID) of the callback whose signature key should be regenerated. Its old signature key is deactivated as soon as this call succeeds.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_event_notification_callback_update',
    description: `Update an existing registered Event Notification Service (ENS) callback in Salesforce Marketing Cloud, using PUT /platform/v1/ens-callbacks. Like ENS subscriptions, callbacks are updated by PUTting an array containing the full replacement callback object to the collection endpoint (there is no /{id} path variant for update) -- identify which callback to update via callback_id, and supply the callback's full name again even if it isn't changing. You can also adjust the maximum batch size used when posting notification batches to this callback's URL. Confirmed via the official Salesforce documentation page for Update Callback; the API returns 200, 201, or 304 depending on whether the update was applied.`,
    params: [
      {
        name: 'callback_id',
        type: 'string',
        required: true,
        description: `The unique ID (UUID) of the callback to update, as returned when it was created or listed.`,
      },
      {
        name: 'callback_name',
        type: 'string',
        required: true,
        description: `The callback's name after this update. The API requires this field on every update call, so supply the existing name again if you only intend to change max_batch_size.`,
      },
      {
        name: 'max_batch_size',
        type: 'integer',
        required: false,
        description: `Maximum number of events to include in a single notification batch posted to this callback's URL. Accepts values from 100 to 1000; defaults to 1000 if not specified.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_event_notification_callback_verify',
    description: `Manually complete two-step verification of an Event Notification Service (ENS) callback in Salesforce Marketing Cloud, using POST /platform/v1/ens-verify (confirmed via Salesforce's official 'Verify Callback' reference page). When a callback is created (Create Event Notification Callback), ENS immediately issues an HTTPS POST to its URL carrying a callback ID and a unique, single-use verification key, and normally expects that callback's own webhook receiver to echo the verification key straight back within 4 hours to auto-complete verification. If the receiver can't respond programmatically -- e.g. it's a manual endpoint, or the payload was captured out-of-band -- use this tool to submit the same callback_id and verification_key yourself and complete verification manually. Returns HTTP 200 on success. Verification must be completed within 4 hours of the callback's creation or it expires and the callback registration fails.`,
    params: [
      {
        name: 'callback_id',
        type: 'string',
        required: true,
        description: `The unique ID (UUID) of the callback to verify, as returned when it was created or listed.`,
      },
      {
        name: 'verification_key',
        type: 'string',
        required: true,
        description: `The unique, single-use verification key that ENS sent to the callback's URL when the callback was created. Must be submitted within 4 hours of creation.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_event_notification_subscription_create',
    description: `Subscribe a previously registered and verified callback to one or more Event Notification Service (ENS) event types in Salesforce Marketing Cloud, using POST /platform/v1/ens-subscriptions. A subscription determines which event categories (e.g. TransactionalSendEvents.EmailSent) are delivered to a given callback URL, and can optionally be scoped further with filter criteria such as a specific definitionKey. The callback referenced by callback_id must already exist and be verified (see Create Event Notification Callback). You can create up to 200 subscriptions per callback, and a new subscription can take up to two minutes to become active.`,
    params: [
      {
        name: 'callback_id',
        type: 'string',
        required: true,
        description: `The unique ID (UUID) of the verified callback that should receive notifications for this subscription's event types.`,
      },
      {
        name: 'event_category_types',
        type: 'array',
        required: true,
        description: `Array of fully-qualified ENS event type names to subscribe to, e.g. 'TransactionalSendEvents.EmailSent' or 'TransactionalSendEvents.EmailNotSent'. Adding a subscription filter (see filters) that targets a specific definitionKey prevents that subscription from also receiving generic open/click events, so a separate subscription with the same callback may be needed for those.`,
      },
      {
        name: 'subscription_name',
        type: 'string',
        required: true,
        description: `A unique, human-readable name for this subscription.`,
      },
      {
        name: 'filters',
        type: 'array',
        required: false,
        description: `Optional array of 'key=value' filter strings to scope this subscription, e.g. 'definitionKey=12345' to only receive notifications for a specific transactional send definition. Leave blank to receive notifications for all matching events regardless of source definition.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_event_notification_subscription_delete',
    description: `Permanently delete an Event Notification Service (ENS) subscription in Salesforce Marketing Cloud, using DELETE /platform/v1/ens-subscriptions/{subscriptionId}. This is irreversible: the callback stops receiving notifications for this subscription's event types immediately. It does not delete the underlying callback registration itself (see Create/Get Event Notification Callback), only this specific subscription. Example subscription ID: d89c87c4-70f8-43d6-be1e-f01dce97fe4c.`,
    params: [
      {
        name: 'subscription_id',
        type: 'string',
        required: true,
        description: `The unique ID (UUID) of the ENS subscription to permanently delete.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_event_notification_subscription_get',
    description: `Retrieve a single Event Notification Service (ENS) subscription by its subscription ID, using GET /platform/v1/ens-subscriptions/{subscriptionId}. Returns the subscription's current configuration, including the owning callback ID and name, the subscribed event category types (e.g. TransactionalSendEvents.EmailSent), any scoping filters, and its status (active or paused) with a status reason if paused. Use this to inspect a subscription's settings before updating or deleting it.`,
    params: [
      {
        name: 'subscription_id',
        type: 'string',
        required: true,
        description: `The unique ID (UUID) of the ENS subscription to retrieve, as returned when the subscription was created.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_event_notification_subscription_list',
    description: `List all Event Notification Service (ENS) subscriptions registered for a specific callback in Salesforce Marketing Cloud, using GET /platform/v1/ens-subscriptions-by-cb/{callbackId}. ENS subscriptions are scoped to the callback that owns them (there is no single endpoint that lists subscriptions across all callbacks), so provide the callback's ID to see which event types it's currently subscribed to. Each returned subscription includes its subscription ID, name, event category types, filters, and status.`,
    params: [
      {
        name: 'callback_id',
        type: 'string',
        required: true,
        description: `The unique ID (UUID) of the callback whose subscriptions should be listed.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_event_notification_subscription_update',
    description: `Update an existing Event Notification Service (ENS) subscription in Salesforce Marketing Cloud, using PUT /platform/v1/ens-subscriptions. Unlike most REST resources, ENS subscriptions are updated by PUTting an array containing the full replacement subscription object to the collection endpoint (there is no /{id} path variant for update) — identify which subscription to update via subscription_id inside the request body. Use this to change the subscribed event_category_types, adjust scoping filters, rename the subscription, or pause/resume it. To pause an active subscription set status to 'paused', and to resume a paused subscription set status to 'active'; a status_reason should be supplied whenever status is changed. A new subscription can take up to two minutes to become fully active after an update.`,
    params: [
      {
        name: 'event_category_types',
        type: 'array',
        required: true,
        description: `Array of fully-qualified ENS event type names this subscription should be subscribed to after the update, e.g. 'TransactionalSendEvents.EmailSent'. This replaces the subscription's full set of event types, so include every type it should keep receiving, not just new ones.`,
      },
      {
        name: 'subscription_id',
        type: 'string',
        required: true,
        description: `The unique ID (UUID) of the ENS subscription to update, as returned when the subscription was created.`,
      },
      {
        name: 'filters',
        type: 'array',
        required: false,
        description: `Optional array of 'key=value' filter strings to scope this subscription, e.g. 'definitionKey=12345'. This replaces any existing filters on the subscription. Leave blank to remove filtering (receive all matching events) or to leave filters unchanged if the API treats an absent field as 'no change' — verify behavior for your account.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Set to 'paused' to pause an active subscription, or 'active' to resume a paused one. Leave blank to leave the current status unchanged. When set, status_reason should also be supplied.`,
      },
      {
        name: 'status_reason',
        type: 'string',
        required: false,
        description: `Human-readable reason for the status change. Required by the API whenever status is supplied (e.g. explaining why a subscription was paused, such as 'max retries exhausted trying to post to callback url'). Leave blank if status is not being changed.`,
      },
      {
        name: 'subscription_name',
        type: 'string',
        required: false,
        description: `A unique, human-readable name for this subscription. Leave blank to keep the existing name.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_file_transfer_location_create',
    description: `Create a new external file transfer location in Salesforce Marketing Cloud, using POST /automation/v1/filelocations. A file transfer location is a saved connection profile (FTP, SFTP, Enhanced FTP, or similar external server) that Automation Studio's File Transfer, Import, and Data Extract activities reference to move files in or out of Marketing Cloud, instead of embedding raw server credentials in every activity. Username and password are required for password-authenticated FTP/SFTP/Enhanced FTP servers; some connection types (e.g. key-based SFTP, or internal Enhanced FTP/Safehouse storage) may not need them. NOTE: the exact set of fields accepted by this endpoint could not be independently verified against live API documentation at authoring time (the Salesforce docs page for this resource is a JavaScript-rendered reference that could not be fetched) — field names are a best-effort reconstruction from the Marketing Cloud 'File Locations' setup screen and should be validated in testing.`,
    params: [
      {
        name: 'host',
        type: 'string',
        required: true,
        description: `Hostname or IP address of the external file transfer server.`,
      },
      {
        name: 'location_type',
        type: 'string',
        required: true,
        description: `The connection/protocol type for this location. Common Marketing Cloud values are 'FTP', 'SFTP', and 'Enhanced FTP' (FTPS/TLS); some accounts also support 'HTTP' or an internal Safehouse location. Confirm the exact accepted value for your account before relying on this in production.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `A unique, human-readable name for this file transfer location.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional human-readable description of this file transfer location.`,
      },
      {
        name: 'directory',
        type: 'string',
        required: false,
        description: `Default remote directory/path on the server that activities should read from or write to when using this location. Leave blank to use the server's root/home directory.`,
      },
      {
        name: 'password',
        type: 'string',
        required: false,
        description: `Password for the account on the external server. Required for password-authenticated FTP/SFTP/Enhanced FTP connections; leave blank for key-based authentication or connection types that don't require it. Not returned by subsequent GET calls once set.`,
      },
      {
        name: 'port',
        type: 'integer',
        required: false,
        description: `Port number to connect on. Leave blank to use the protocol's default (typically 21 for FTP, 22 for SFTP).`,
      },
      {
        name: 'username',
        type: 'string',
        required: false,
        description: `Username for the account on the external server. Required for password-authenticated FTP/SFTP/Enhanced FTP connections.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_file_transfer_location_get',
    description: `Retrieve a single external file transfer location by its Customer Key from Salesforce Marketing Cloud, using GET /data/v1/filetransferlocation/{key}. Returns the location's saved connection profile (name, description, connection type such as External SFTP/FTP/FTPS, Amazon S3, Azure Blob Storage, Google Cloud Storage, Enhanced FTP, or Safehouse) as referenced by Automation Studio's File Transfer, Import, and Data Extract activities. Sensitive fields such as passwords or keys are not returned in the response. Use List File Transfer Locations first to find a location's Customer Key. NOTE (2026-08-24 fix): this tool previously called GET /automation/v1/filelocations/{id}, which returned a generic 404 on every live call -- that base path/resource name was simply wrong. The correct resource lives under /data/v1/filetransferlocation/{key} instead, confirmed via Salesforce's own actively-maintained open-source DevOps tooling (Accenture/sfmc-devtools), which uses this exact path against real tenants; the official reference page for this resource (linked above) could not be independently fetched at authoring time (consistent hard 404 from Salesforce's own doc site, verified across dozens of fetch techniques over multiple sibling reference pages that DID load fine), so this path should still be smoke-tested against a real tenant.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The Customer Key of the file transfer location to retrieve, as returned by List File Transfer Locations. This is a short unique key, not a numeric ObjectID -- for locations created via the newer connection types (SFTP, S3, Azure, GCS) it is typically a GUID; for older/legacy FTP-type locations it may equal the location's name instead.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_file_transfer_location_list',
    description: `List the external file transfer locations configured in this Salesforce Marketing Cloud account, using GET /data/v1/filetransferlocations. A file transfer location is a saved connection profile (External FTP/SFTP/FTPS, Enhanced FTP, Safehouse, Amazon S3, Azure Blob Storage, or Google Cloud Storage) that Automation Studio's File Transfer, Import, and Data Extract activities reference to move files in or out of Marketing Cloud. NOTE (2026-08-24 fix): this tool previously called GET /automation/v1/filelocations, which returned an identical generic 404 on every live call, including with zero parameters -- that base path/resource name was simply wrong. /automation/v1/ is the legacy Automation Studio surface, which only exposes a read-only, non-updatable subset of older FTP-type locations under /automation/v1/ftplocations (no create/update/validate); the current, full-featured File Transfer Locations resource lives under the data platform base path instead, confirmed via Salesforce's own actively-maintained open-source DevOps tooling (Accenture/sfmc-devtools) which retrieves via GET /data/v1/filetransferlocations and GET /data/v1/filetransferlocation/{key} against real tenants -- the official reference page for this resource (linked above) could not be independently fetched at authoring time (consistent hard 404 from Salesforce's own doc site, verified across dozens of fetch techniques over multiple sibling reference pages that DID load fine), so this path should still be smoke-tested against a real tenant. This endpoint returns every location in a single response (no server-side pagination -- there is no $page/$pageSize support), so the page/page_size parameters previously exposed here have been removed as non-functional. Use this to find a location's Customer Key before retrieving, updating, or referencing it in an automation.`,
    params: [],
  },
  {
    name: 'salesforcemarketingcloud_file_transfer_location_update',
    description: `Update an existing external file transfer location in Salesforce Marketing Cloud, using PATCH /automation/v1/filelocations/{id}. Only the fields you supply are changed; leave a field blank to keep its current value. Use this to rotate credentials, change the host/port/directory, or rename a location referenced by Automation Studio's File Transfer, Import, and Data Extract activities. NOTE: the exact set of fields accepted by this endpoint could not be independently verified against live API documentation at authoring time (the Salesforce docs page for this resource is a JavaScript-rendered reference that could not be fetched) — field names are a best-effort reconstruction from the Marketing Cloud 'File Locations' setup screen and should be validated in testing.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique ID of the file transfer location to update, as returned by List File Transfer Locations.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New human-readable description of this file transfer location. Leave blank to keep the current description.`,
      },
      {
        name: 'directory',
        type: 'string',
        required: false,
        description: `New default remote directory/path on the server. Leave blank to keep the current directory.`,
      },
      {
        name: 'host',
        type: 'string',
        required: false,
        description: `New hostname or IP address of the external file transfer server. Leave blank to keep the current host.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New unique, human-readable name for this file transfer location. Leave blank to keep the current name.`,
      },
      {
        name: 'password',
        type: 'string',
        required: false,
        description: `New password for the account on the external server. Leave blank to keep the current credential unchanged.`,
      },
      {
        name: 'port',
        type: 'integer',
        required: false,
        description: `New port number to connect on. Leave blank to keep the current port.`,
      },
      {
        name: 'username',
        type: 'string',
        required: false,
        description: `New username for the account on the external server. Leave blank to keep the current username.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_file_transfer_location_validate',
    description: `Validate connectivity for an existing external file transfer location in Salesforce Marketing Cloud, by its Customer Key, using POST /data/v1/filetransferlocation/{key}/validate. This attempts to connect to the saved location (External FTP/SFTP/FTPS, Amazon S3, Azure Blob Storage, Google Cloud Storage, Enhanced FTP, or Safehouse) using its stored host/credentials and reports whether the connection succeeds, mirroring the 'Validate' action available on the File Locations setup screen before saving a location. This is a read-only connectivity check -- it does not modify the saved location's configuration. Use List/Get File Transfer Locations first to find a location's Customer Key. NOTE (2026-08-24 fix): this tool previously called POST /automation/v1/filelocations/{id}/validate, which returned a generic 404 on every live call -- that base path/resource name was simply wrong (same root cause confirmed across List/Get/Validate: /automation/v1/filelocations does not exist as a resource). The corrected base path here, POST /data/v1/filetransferlocation/{key}/validate, is a best-evidence reconstruction: the /data/v1/filetransferlocation(s) base and {key}-scoped singular path are confirmed via Salesforce's own actively-maintained open-source DevOps tooling (Accenture/sfmc-devtools), which uses that exact base for GET/POST/PATCH/DELETE against real tenants, but that tooling has no need for a live connectivity check and does not implement Validate, so the trailing '/validate' action-segment placement (vs. e.g. a query-param or collection-level variant) is inferred by convention from other SFMC REST families (id-scoped action suffixes), not independently confirmed. 'Validate a file transfer location' is a confirmed real operation -- it appears as its own entry under the 'File Transfer Locations' category in Salesforce's live Marketing Cloud Engagement REST API reference navigation (its href is exactly /docs/marketing/marketing-cloud/references/mc-file_transfer_locations, scraped directly from that nav), and independently as an indexed reference page titled 'Validate a file transfer location | File Transfer Locations | ... | Salesforce Developers' -- but the exact HTTP method/path and response shape still could not be directly loaded at authoring time (the reference page returns a genuine 404 from Salesforce's own doc site on every fetch attempt, across dozens of techniques, even though sibling reference pages in the same family loaded fine -- this looks like a live bug/dead link on Salesforce's own site, not a bot-protection issue). Smoke-test this path against a real tenant before relying on it.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The Customer Key of the file transfer location to validate, as returned by List File Transfer Locations. This is a short unique key, not a numeric ObjectID -- for locations created via the newer connection types (SFTP, S3, Azure, GCS) it is typically a GUID; for older/legacy FTP-type locations it may equal the location's name instead.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_journey_audit_log_get',
    description: `Retrieve the paginated audit log history for a journey by its GUID id, using the Interaction REST API. Corrected endpoint: GET /interaction/v1/interactions/{id}/audit/{action} (the action segment is required in the path, not a separate 'auditLog' resource). Filter by action type (create, modify, publish, unpublish, delete, or all), optionally scope to a single versionNumber, and paginate with page/page_size. The response includes Page, PageSize, Count, and an Items array where each entry describes the action taken, a timestamp, the acting user, and status details such as publishStatus or ContactsEjected. WARNING: do not combine version_number with most_recent_version_only=true in the same call. Unlike List Journeys (which returns a clear validation error for the equivalent conflicting-filter combination), this audit-log endpoint fails that combination with an opaque generic error (HTTP error code 30000, "Oops we've encountered an error") that gives no indication the two filters are mutually exclusive. Set at most one of the two.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The GUID (ObjectID) of the journey whose audit log you want. Example: 8f14e45f-ceea-467e-bd3a-45b3f4b3e21f.`,
      },
      {
        name: 'action',
        type: 'string',
        required: false,
        description: `The type of audit action to retrieve: 'all', 'create', 'modify', 'publish', 'unpublish', or 'delete'.`,
      },
      {
        name: 'most_recent_version_only',
        type: 'boolean',
        required: false,
        description: `If true, restricts results to only the journey's most recent version. Do not set this together with version_number -- combining the two causes an opaque generic API error (error code 30000) rather than a clear validation message.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `The page number of results to fetch, starting at 1.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of audit log entries per page (1-50).`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Optional filter by journey status at the time of the audit entry (e.g. Published, Draft, Stopped).`,
      },
      {
        name: 'version_number',
        type: 'integer',
        required: false,
        description: `Restrict the audit log to a single journey version number. If omitted, entries for all versions are returned. Do not set this together with most_recent_version_only=true -- combining the two causes an opaque generic API error (error code 30000) rather than a clear validation message.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_journey_audit_log_get_by_key',
    description: `Retrieve the paginated audit log history for a journey by its external key, using the Interaction REST API: GET /interaction/v1/interactions/key:{key}/audit/{action}. This is the key-based counterpart to the Get Journey Audit Log tool (which takes the journey's GUID id) -- use this one when you only know the journey's customer key, not its ObjectID. Filter by action type (create, modify, publish, unpublish, delete, or all), optionally scope to a single versionNumber, and paginate with page/page_size. The response includes Page, PageSize, Count, and an Items array where each entry describes the action taken, a timestamp, the acting user, and status details such as publishStatus or ContactsEjected. Confidence note: existence of this route was confirmed via a search-indexed documentation page title; the response shape is assumed to match the id-based version (which is independently confirmed and documented), and the key: prefix syntax mirrors the same convention documented for Get Event Definition, but the key-based form of this specific audit endpoint has not been independently re-verified beyond that. WARNING: do not combine version_number with most_recent_version_only=true in the same call -- on the id-based version this combination fails with an opaque generic error (HTTP error code 30000, "Oops we've encountered an error") rather than a clear validation message, and the same is expected to apply here. Set at most one of the two.`,
    params: [
      {
        name: 'key',
        type: 'string',
        required: true,
        description: `The external (customer) key of the journey whose audit log you want. Example: Welcome_Series_Journey.`,
      },
      {
        name: 'action',
        type: 'string',
        required: false,
        description: `The type of audit action to retrieve: 'all', 'create', 'modify', 'publish', 'unpublish', or 'delete'.`,
      },
      {
        name: 'most_recent_version_only',
        type: 'boolean',
        required: false,
        description: `If true, restricts results to only the journey's most recent version. Do not set this together with version_number -- combining the two is expected to cause an opaque generic API error (error code 30000) rather than a clear validation message.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `The page number of results to fetch, starting at 1.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of audit log entries per page (1-50).`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Optional filter by journey status at the time of the audit entry (e.g. Published, Draft, Stopped).`,
      },
      {
        name: 'version_number',
        type: 'integer',
        required: false,
        description: `Restrict the audit log to a single journey version number. If omitted, entries for all versions are returned. Do not set this together with most_recent_version_only=true -- combining the two is expected to cause an opaque generic API error (error code 30000) rather than a clear validation message, matching the behavior confirmed on the id-based Get Journey Audit Log tool.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_journey_contact_exit',
    description: `Remove a single contact from a running journey (or from specific versions of it), using the Interaction REST API's contact-exit endpoint (POST /interaction/v1/interactions/contactexit). Identify the contact by contact_key and the journey by its external definition_key (the customer key shared across all versions of the journey, not its GUID). Optionally restrict the exit to specific version numbers via versions; if omitted, the contact exits from every version they are currently in. The request is processed asynchronously (HTTP 202 Accepted); use the corresponding 'get exit status' endpoint to confirm completion. The underlying API also supports removing up to 50 contacts in a single call, but this tool submits one contact per invocation for predictable results.`,
    params: [
      {
        name: 'contact_key',
        type: 'string',
        required: true,
        description: `The unique identifier (Subscriber Key / Contact Key) of the contact to remove from the journey.`,
      },
      {
        name: 'definition_key',
        type: 'string',
        required: true,
        description: `The journey's external customer key (shared across all versions), not its GUID. Found on the journey's Properties panel in Journey Builder as the journey's 'External Key'.`,
      },
      {
        name: 'versions',
        type: 'array',
        required: false,
        description: `Optional array of specific journey version numbers to exit the contact from. If omitted, the contact is exited from every version of the journey they are currently in.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_journey_contact_exit_status_get',
    description: `Check the status of a previously submitted Remove Contact From Journey request in Salesforce Marketing Cloud, using POST /interaction/v1/interactions/contactexit/status. This closes the polling gap the Remove Contact From Journey tool's own description points to: that tool submits an exit request asynchronously (HTTP 202) and directs callers to this status endpoint to confirm completion. Confirmed via Salesforce's official documentation ('Get the Status of Removing a Contact from a Journey'): the request body is an array of lookups (up to 50), each identified by ContactKey and DefinitionKey (and optionally the same Versions array used on the original exit request), and the API responds 200 with, per contact, a status array describing the outcome for each targeted journey version — fields include version, message (e.g. 'Exit process Completed', 'Exit request Ignored - Duplicate Request', or 'Exit request Cancelled - Contact not in this Interaction'), and definitionInstanceId when applicable. This tool checks the status for one contact per invocation, mirroring Remove Contact From Journey's single-contact design. Pass exactly the same contact_key, definition_key, and versions you used on the original exit request.`,
    params: [
      {
        name: 'contact_key',
        type: 'string',
        required: true,
        description: `The unique identifier (Subscriber Key / Contact Key) of the contact whose exit status you want to check. Must match the contact_key used on the original Remove Contact From Journey call.`,
      },
      {
        name: 'definition_key',
        type: 'string',
        required: true,
        description: `The journey's external customer key (shared across all versions), not its GUID, matching the definition_key used on the original Remove Contact From Journey call.`,
      },
      {
        name: 'versions',
        type: 'array',
        required: false,
        description: `Optional array of specific journey version numbers to check, matching the versions used on the original exit request. If omitted, status for every version the contact was in is returned.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_journey_contacts_by_status_get',
    description: `List contacts currently sitting in a given activity type and status (e.g. waiting, completed, errored) within one specific version of a journey in Salesforce Marketing Cloud Journey Builder, via GET /interaction/v1/journeys/{id}/versions/{version}/summary/contacts/{type}/{status}. This exact path could not be confirmed: a full enumeration of Salesforce's officially published Interaction REST API reference navigation (every entry under Journeys and Events, from Insert Journey through Get Journey History Download Estimate) contains no 'journeys' resource and no 'summary/contacts' sub-path -- only the singular 'interactions' resource is documented, alongside the narrower goalstatistics/{id} and waitstatistics/{id} endpoints, which return aggregate counts rather than contact lists and don't accept a type/status pair. This tool's shape is a best-effort reconstruction of the endpoint pattern requested for this connector, matching the general capability Journey Builder's UI exposes (its Activity view lets you drill into an activity and see which contacts are Waiting, Completed, or Errored there) -- but the resource name, the accepted values for type and status, and the response shape are all unconfirmed. id is assumed to be the journey's GUID (as used by every other Get/Pause/Resume/Stop Journey tool in this connector) and version its numeric published version number; type and status are passed through verbatim as free-text path segments -- try a specific activity's type or key (as seen in the activities returned by Get Journey with extras=activities) for type, and values like waiting, completed, or errored for status, but treat both as guesses, not confirmed enums, until verified against a real tenant. Smoke-test against a real tenant before relying on it in production.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The GUID (ObjectID) of the journey to inspect. Example: 8f14e45f-ceea-467e-bd3a-45b3f4b3e21f.`,
      },
      {
        name: 'status',
        type: 'string',
        required: true,
        description: `The contact status to filter by within the given activity type/version. UNCONFIRMED enum -- try values such as waiting, completed, or errored.`,
      },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `The activity type or activity key whose contacts to list. UNCONFIRMED format -- try an activity type name or the specific activity's key as returned by Get Journey with extras=activities.`,
      },
      {
        name: 'version',
        type: 'integer',
        required: true,
        description: `The published version number of the journey to inspect.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_journey_contacts_enter_batch',
    description: `Asynchronously insert a batch of up to 100 contacts into a Journey Builder journey using the Batch Event API. Supply the eventDefinitionKey (the API Event entry source key configured on the journey, found in Journey Builder's Entry Source > API Event details panel — not the journey's own key) and an array of members, each identified by a contactKey and optional personalization data. The request is queued and processed asynchronously; the response returns a requestId used to poll the status endpoint, plus a count of contacts accepted and any per-contact errors. Corrected endpoint: POST /interaction/v1/async/events (the older synchronous single-contact endpoint is /interaction/v1/events; a distinct experimental bulk endpoint also exists but is unsupported).`,
    params: [
      {
        name: 'event_definition_key',
        type: 'string',
        required: true,
        description: `The key (customer key) of the journey's entry event (API Event), not the journey's own external key. Found in Journey Builder under the entry source's API Event configuration. Example: APIEvent-abc12345-6789-def0-1234-56789abcdef0.`,
      },
      {
        name: 'members',
        type: 'array',
        required: true,
        description: `Array of up to 100 contacts to enter into the journey. Each member requires a contactKey (the subscriber's unique identifier, typically their Subscriber Key or Contact Key in Marketing Cloud) and may include an optional data object of personalization attributes matching the entry event's data extension schema.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_journey_contacts_enter_batch_status_get',
    description: `Check the status of a previously submitted batch contact-entry request in Salesforce Marketing Cloud, using GET /interaction/v1/async/events/status. This closes the polling gap that Enter Contacts Into Journey (Batch)'s own description points to: that tool queues up to 100 contacts asynchronously and returns a requestId to poll here. Confirmed via Salesforce's official documentation ('Get Status of Async Journey Insertion Request'): the endpoint accepts requestId, contactKey, eventInstanceId, eventDefinitionKey, and/or type as query parameters, and requires at least one of them to be supplied — a request with none of the five is rejected. request_id (the value returned by the batch-entry call) is normally the most useful single filter, since it scopes results to exactly the batch you just submitted. The response is paginated: {page, pageSize, count, items[]}, where each item has eventCategoryType (observed values include Processed and Queued; an Error category is also expected for failed entries), a timestamp, eventDefinitionKey, requestId, and an info object with contactKey and eventInstanceId. Poll until every contact in your batch shows a terminal eventCategoryType.`,
    params: [
      {
        name: 'contact_key',
        type: 'string',
        required: false,
        description: `Filter results to a single contact by their Subscriber Key / Contact Key. Combine with or use instead of request_id.`,
      },
      {
        name: 'event_definition_key',
        type: 'string',
        required: false,
        description: `Filter results to entries for a specific entry event, using the same event_definition_key (API Event key) supplied to Enter Contacts Into Journey (Batch).`,
      },
      {
        name: 'event_instance_id',
        type: 'string',
        required: false,
        description: `Filter results to a single event instance by its eventInstanceId, as returned in a prior status check's info object.`,
      },
      {
        name: 'request_id',
        type: 'string',
        required: false,
        description: `The requestId returned when the batch contact-entry request was queued (from Enter Contacts Into Journey (Batch)). Filters results to just that batch. Example: c77598e6-cae3-4244-913b-6231e6e8a17b.`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Filter results to a specific eventCategoryType. Observed values include Processed and Queued; an Error category is also expected for failed entries, but the complete set of values is not exhaustively documented.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_journey_create',
    description: `Create (insert) a new journey definition in Salesforce Marketing Cloud Journey Builder using the Interaction REST API (POST /interaction/v1/interactions). Provide the journey's name and, optionally, its triggers (entry sources such as an API Event or Contact Data Entry), goals, and activities (the ordered sequence of steps such as emails, wait activities, and decision splits) as JSON arrays following the Journey Specification. Fields such as id, createdDate, modifiedDate, status, and definitionId are assigned by Journey Builder and must never be supplied. If no key is provided, Marketing Cloud generates one automatically. The journey is created in Draft status and must be published separately (see the Publish Journey tool) before it goes live.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Display name of the journey as shown in Journey Builder. Required. Example: New Subscriber Onboarding.`,
      },
      {
        name: 'activities',
        type: 'array',
        required: false,
        description: `Array of activity objects defining the ordered steps of the journey (e.g. email sends, wait activities, decision splits, updates). Each activity is a JSON object per the Journey Specification. Example: [{"key":"EMAILV2-1","name":"Send Welcome Email","type":"EMAILV2","outcomes":[],"arguments":{}}]. Leave empty to create an empty journey canvas to build out later in Journey Builder.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional free-text description of the journey's purpose, shown in Journey Builder's journey list.`,
      },
      {
        name: 'goals',
        type: 'array',
        required: false,
        description: `Array of goal objects defining the journey's success criteria (e.g. a data extension or event that marks a contact as having completed the journey's goal). Each goal is a JSON object per the Journey Specification. Example: [{"key":"GOAL-1","name":"Purchase Goal","type":"multicriteria.goal","arguments":{}}].`,
      },
      {
        name: 'key',
        type: 'string',
        required: false,
        description: `User-defined unique key (external identifier) for the journey. If omitted, Marketing Cloud generates a GUID automatically. Use a stable, human-readable key if you plan to reference or update this journey later (e.g. via the Update Journey tool). Example: onboarding-journey-2024.`,
      },
      {
        name: 'triggers',
        type: 'array',
        required: false,
        description: `Array of trigger objects defining the journey's entry source(s), such as an API Event, Contact Data Entry from a data extension, or Salesforce Data Entry. Each trigger is a JSON object per the Journey Specification. Example: [{"key":"TRIGGER-1","name":"API Event","type":"APIEvent","eventDefinitionKey":"APIEvent-Welcome"}].`,
      },
      {
        name: 'workflowApiVersion',
        type: 'number',
        required: false,
        description: `The Journey Builder workflow API version. Use 1 (current) for new journeys, or 0.5 for the legacy workflow. Defaults to 1.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_journey_delete',
    description: `Permanently delete a journey (irreversible) using the Interaction REST API. Identify the journey by its GUID id, or by its external key using the form key:{ExternalKey}. If versionNumber is omitted, ALL versions of the journey are deleted; provide versionNumber to delete only a specific version. Deleted journeys and their history cannot be recovered. If you delete the last remaining version of a journey that is associated with a tag, you must separately remove the tag association.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The journey's unique identifier: either its GUID (ObjectID) or its external key expressed as key:{ExternalKey}. Example GUID: 8f14e45f-ceea-467e-bd3a-45b3f4b3e21f. Example key form: key:Welcome_Series_Journey.`,
      },
      {
        name: 'version_number',
        type: 'integer',
        required: false,
        description: `The specific version number of the journey to delete. If omitted, ALL versions of the journey are deleted, which cannot be undone.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_journey_event_definition_create',
    description: `Create an event definition in Salesforce Marketing Cloud Journey Builder (POST /interaction/v1/eventDefinitions). An event definition names and describes the schema of an event that can be used as a journey entry source (trigger) or waypoint, and is referenced by its eventDefinitionKey when firing events via the Fire Journey Event tool. Provide either a dataExtensionId (pointing at an existing data extension whose schema defines the event's data fields) or a schema object describing the fields directly — one of the two is required. The type field determines the kind of event; use Event (the generic/default type) for events fired programmatically via the REST API — Salesforce's docs do not define an 'APIEvent' type value despite the eventDefinitionKey naming convention (e.g. 'APIEvent-Welcome').`,
    params: [
      {
        name: 'eventDefinitionKey',
        type: 'string',
        required: true,
        description: `Unique key identifying this event definition. Cannot contain periods or spaces. This is the key you pass as EventDefinitionKey when firing the event or referencing it as a journey trigger. Example: APIEvent-Welcome.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Display name of the event definition as shown in Journey Builder. Example: API Event - Welcome.`,
      },
      {
        name: 'dataExtensionId',
        type: 'string',
        required: false,
        description: `ObjectID (GUID) of an existing data extension whose fields define this event's data schema. Required if the schema field is not provided. Example: 8f14e45f-ceea-467e-adde-3fb5ba90140e.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional free-text description of the event definition's purpose.`,
      },
      {
        name: 'iconUrl',
        type: 'string',
        required: false,
        description: `Optional URL of an icon to display for this event in the Journey Builder entry-source picker.`,
      },
      {
        name: 'isVisibleInPicker',
        type: 'boolean',
        required: false,
        description: `Whether this event should be visible as a selectable entry source in the Journey Builder UI picker. Defaults to true.`,
      },
      {
        name: 'mode',
        type: 'string',
        required: false,
        description: `Operating mode of the event definition: Production or Test. Defaults to Production.`,
      },
      {
        name: 'schema',
        type: 'object',
        required: false,
        description: `Object describing the event's data schema directly, as an alternative to dataExtensionId. Shape: {"sendableCustomObjectField":"SubscriberKey","sendableSubscriberField":"Subscriber Key","fields":[{"name":"EmailAddress","dataType":"EmailAddress","isNullable":true}]}. Required if dataExtensionId is not provided.`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `The kind of event definition to create. Per Salesforce's documentation, Event is the generic/default type and is what's used for events fired programmatically via the REST API (the most common case for integrations); there is no separate 'APIEvent' type value. Other values (ContactEvent, DateEvent, RestEvent) correspond to other entry-source types configured in Marketing Cloud.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_journey_event_definition_delete',
    description: `Permanently delete a journey entry event definition (irreversible) by its GUID id, using the Interaction REST API. Event definitions represent the entry sources (e.g. API Event, Data Extension, Salesforce Data) that trigger contacts to enter a journey; deleting one that is still referenced by an active journey can break that journey's entry point. This action cannot be undone.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The GUID (ObjectID) of the event definition to delete. Example: 3c9c2f6a-1b2d-4e5f-8a9b-0c1d2e3f4a5b.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_journey_event_definition_get',
    description: `Retrieve a single event definition by ID or key from Salesforce Marketing Cloud Journey Builder (GET /interaction/v1/eventDefinitions/{id}). Returns the event definition's metadata (name, type, mode, eventDefinitionKey, dataExtensionId, schema, createdDate) used by journey entry sources and the Fire Journey Event tool.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The event definition's ID expressed as a GUID (UUID), or use the form key:{key} to look it up by its eventDefinitionKey instead. Example: 8f14e45f-ceea-467e-adde-3fb5ba90140e or key:APIEvent-Welcome.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_journey_event_definition_get_by_key',
    description: `Retrieve a single Journey Builder event definition by its eventDefinitionKey instead of its GUID id, via GET /interaction/v1/eventDefinitions/key:{key} on Salesforce Marketing Cloud's Interaction REST API. This is a convenience wrapper around the same underlying route as the Get Event Definition tool: the official getEventDefinition.html documentation page states verbatim that the id path segment also accepts the form key:{key} to look an event definition up by its key, and the official discovery document lists this key: form as a distinct route. This tool builds that key: prefix for you, so you only need to supply the bare key rather than remembering to type key: yourself. Returns the same event definition metadata as Get Event Definition -- name, type, mode, eventDefinitionKey, dataExtensionId, schema, and createdDate -- used by journey entry sources and the Fire Journey Event tool.`,
    params: [
      {
        name: 'key',
        type: 'string',
        required: true,
        description: `The event definition's eventDefinitionKey (not its GUID id). Example: APIEvent-Welcome.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_journey_event_definition_list',
    description: `Retrieve a paginated collection of event definitions from Salesforce Marketing Cloud Journey Builder (GET /interaction/v1/eventDefinitions). Event definitions describe events that can be used as journey entry sources or fired to move contacts through journeys. Optionally filter by name and page through results.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Filter results to event definitions whose name matches this string. Leave blank to return all event definitions.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number of results to retrieve. Defaults to 1.`,
      },
      {
        name: 'pageSize',
        type: 'integer',
        required: false,
        description: `Number of results to return per page. Default and maximum is 50.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_journey_event_definition_trigger_statistics_get',
    description: `Retrieve how many times an entry event (event definition) has fired in Salesforce Marketing Cloud Journey Builder (GET /interaction/v1/triggerstats/{eventDefinitionID}). Useful for confirming an API Event or other entry source is actually receiving/firing events for the journeys listening on it. this path and its one-line description ('Retrieve trigger statistics') are confirmed to exist in Salesforce's own REST discovery document for the Interaction API, but Salesforce does not publish a full parameter/response reference page for it -- no request/response schema and no confirmation of optional query parameters. The id parameter is modeled here, by analogy with the documented Get Event Definition endpoint (GET /interaction/v1/eventDefinitions/{id}), as accepting either the event definition's GUID or a key:{key} reference to its eventDefinitionKey; this key: support is NOT independently confirmed for triggerstats specifically. Verify against a sandbox account before relying on it in production.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The GUID (UUID) of the event definition whose trigger statistics you want, or (inferred, not independently confirmed for this endpoint) the form key:{key} to reference it by its eventDefinitionKey. Example: 8f14e45f-ceea-467e-adde-3fb5ba90140e or key:APIEvent-Welcome.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_journey_event_definition_update',
    description: `Update an existing event definition by ID in Salesforce Marketing Cloud Journey Builder (PUT /interaction/v1/eventDefinitions/{id}). Once an event definition is created, only a limited set of properties can be updated (name, description, icon, visibility, and its underlying data extension); its type and eventDefinitionKey cannot be changed. Only include the fields you want to change.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The event definition's ID expressed as a GUID (UUID), or use the form key:{key} to identify it by its eventDefinitionKey instead. Example: 8f14e45f-ceea-467e-adde-3fb5ba90140e or key:APIEvent-Welcome.`,
      },
      {
        name: 'dataExtensionId',
        type: 'string',
        required: false,
        description: `New ObjectID (GUID) of the data extension that defines this event's data schema. Leave blank to keep the current data extension.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Updated free-text description of the event definition's purpose. Leave blank to keep the current description.`,
      },
      {
        name: 'iconUrl',
        type: 'string',
        required: false,
        description: `Updated URL of an icon to display for this event in the Journey Builder entry-source picker. Leave blank to keep the current icon.`,
      },
      {
        name: 'isVisibleInPicker',
        type: 'boolean',
        required: false,
        description: `Whether this event should be visible as a selectable entry source in the Journey Builder UI picker. Leave blank to keep the current setting.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Updated display name of the event definition as shown in Journey Builder. Leave blank to keep the current name.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_journey_event_fire',
    description: `Fire an event to enter a contact into any journeys in Salesforce Marketing Cloud that are listening for it (POST /interaction/v1/events). Provide the contact's ContactKey (typically the subscriber key or email address), the EventDefinitionKey of the event definition to fire (created via the Create Event Definition tool), and any additional data fields the event definition's schema requires. On success, returns an eventInstanceId. The contact must have an Active status, and the EventDefinitionKey must not contain periods.`,
    params: [
      {
        name: 'contactKey',
        type: 'string',
        required: true,
        description: `The unique identifier of the subscriber/contact to enter into the journey (typically their SubscriberKey or email address). The contact's status must be Active. Example: subscriber@example.com.`,
      },
      {
        name: 'eventDefinitionKey',
        type: 'string',
        required: true,
        description: `The key of the event definition to fire, as created via the Create Event Definition tool or Event Administration UI. Cannot contain periods. Example: APIEvent-Welcome.`,
      },
      {
        name: 'data',
        type: 'object',
        required: false,
        description: `Additional data fields for the event, matching the schema of the referenced event definition (e.g. fields from its underlying data extension). Example: {"FirstName":"Jane","SignupDate":"2026-08-17"}. Omit if the event definition requires no extra data.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_journey_get',
    description: `Retrieve a journey (interaction) by its ID from Salesforce Marketing Cloud Journey Builder using the Interaction REST API (GET /interaction/v1/interactions/{id}). Returns the journey's metadata (name, key, description, status, version, workflowApiVersion, createdDate, modifiedDate) plus its triggers, goals, and activities. Pass a version number to retrieve a specific version, or omit it to retrieve the latest version. Use the extras parameter to include additional data such as activity details or stats.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The journey's ID expressed as a GUID (UUID), or use the form key:{key} to look the journey up by its user-defined key instead of its ID. Example: 8f14e45f-ceea-467e-adde-3fb5ba90140e or key:onboarding-journey-2024.`,
      },
      {
        name: 'extras',
        type: 'string',
        required: false,
        description: `Additional data to include in the response beyond the base journey metadata. Valid values: all, activities, outcomes, stats. Leave blank to return only the base journey object.`,
      },
      {
        name: 'versionNumber',
        type: 'integer',
        required: false,
        description: `Specific journey version number to retrieve. If omitted, the latest version is returned.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_journey_goal_statistics_get',
    description: `Retrieve goal-completion statistics for a journey in Salesforce Marketing Cloud Journey Builder (GET /interaction/v1/goalstatistics/{id}). Returns metrics describing how many contacts have met the journey's configured goal. LIVE-CONFIRMED (2026-08-24): requires the journey's bare GUID plus a versionNumber query parameter -- a live call with only the GUID returned "A valid version number is required". The key:{key} external-key form is confirmed NOT supported for this endpoint -- a live call with it returned "Must provide a valid Interaction ID" (a different, more fundamental rejection than a not-found), unlike the Get Journey/Get Event Definition endpoints this tool was originally modeled after. Use journey_get or journey_list to find the journey's current versionNumber.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The GUID (UUID) of the journey whose goal statistics you want. The key:{key} external-key form is confirmed NOT supported for this endpoint -- pass the bare GUID.`,
      },
      {
        name: 'version_number',
        type: 'integer',
        required: true,
        description: `The journey version number to get goal statistics for. Confirmed required -- a live call without it returns "A valid version number is required". Use journey_get or journey_list to find the journey's current version.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_journey_list',
    description: `Search/list journeys (Journey Builder interactions) in Salesforce Marketing Cloud via GET /interaction/v1/interactions, the collection form of the Interaction REST API used by the Get Journey tool. Requires the Automation | Journeys | Read scope. Supports filtering by status, a text search across name/description, external key, journey ID (returns all versions of that journey), tag, and definitionType, plus pagination and sorting. By default only the most recent version of each journey is returned. Use extras to include activity details, outcomes, or stats alongside each journey's base metadata. Each result includes id, key, name, description, status, version, createdDate, and modifiedDate. Example nameOrDescription search: "onboarding".`,
    params: [
      {
        name: 'definitionType',
        type: 'string',
        required: false,
        description: `Filter to a specific journey definition type. Currently the only documented accepted value is 'transactional'. Leave blank to include all journey types.`,
      },
      {
        name: 'extras',
        type: 'string',
        required: false,
        description: `Additional data to include in each returned journey beyond base metadata. Valid values: all, activities, outcome, stats (note: Salesforce's List Journeys reference documents this as singular 'outcome', unlike the plural 'outcomes' accepted by the Get Journey tool). Leave blank to return only base journey metadata (faster for large lists).`,
      },
      {
        name: 'id',
        type: 'string',
        required: false,
        description: `Filter to a specific journey by its GUID (ObjectID). When set, all versions of that journey are returned (subject to mostRecentVersionOnly). Leave blank to list journeys across the account.`,
      },
      {
        name: 'key',
        type: 'string',
        required: false,
        description: `Filter to a specific journey by its external key. Leave blank to list journeys across the account.`,
      },
      {
        name: 'mostRecentVersionOnly',
        type: 'boolean',
        required: false,
        description: `If true (the default), only the latest version of each journey is returned. Set to false to include every version of every matching journey.`,
      },
      {
        name: 'nameOrDescription',
        type: 'string',
        required: false,
        description: `Free-text search term matched against journey name and description. Leave blank to skip this filter.`,
      },
      {
        name: 'orderBy',
        type: 'string',
        required: false,
        description: `Sort order for results, as '<field> <direction>'. Sortable fields: ModifiedDate, Name, Performance. Direction: ASC or DESC. Defaults to modifiedDate DESC. Example: 'name ASC'.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number of results to retrieve. Defaults to 1.`,
      },
      {
        name: 'pageSize',
        type: 'integer',
        required: false,
        description: `Number of journeys to return per page. Default and maximum is 50.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter to journeys in a specific status. Valid values: Draft, Published, Paused, Stopped, Deleted, Unpublished, ScheduledToPublish, ScheduledToSend, Sent (the last two, plus Stopped, apply only to single-send/transactional journeys). Leave blank to include journeys in any status.`,
      },
      {
        name: 'tag',
        type: 'string',
        required: false,
        description: `Filter to journeys associated with this tag. Leave blank to skip this filter.`,
      },
      {
        name: 'versionNumber',
        type: 'integer',
        required: false,
        description: `Specific version number to retrieve when filtering by id or key. Leave blank to use mostRecentVersionOnly behavior instead.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_journey_pause',
    description: `Pause a currently running standard journey (Journey Builder Interaction REST API), by its GUID id. Corrected endpoint: POST /interaction/v1/interactions/pause/{id} (not '.../pauseByDefinitionId/{id}'). You must supply either versionNumber (to pause one specific published version) or set allVersions to true (to pause every running version); providing neither is rejected by the API. Optional body settings control the pause behavior: extendWaitEndDates shifts any in-flight Wait activities by the pause duration, guardrailAction controls what happens if a paused journey isn't resumed within pausedDays ('stop', 'resume', or 'none'), pausedDays sets the auto-guardrail window (API default 14 if omitted), and retainContactInjectionWhileJourneyPaused controls whether new contacts can still enter the journey while paused. This only applies to standard multi-step journeys, not transactional send journeys. Requires the Automation | Journeys | Activate/Stop/Pause/Resume/Send/ScheduleActivate scope.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The GUID (ObjectID) of the journey to pause. Example: 8f14e45f-ceea-467e-bd3a-45b3f4b3e21f.`,
      },
      {
        name: 'all_versions',
        type: 'boolean',
        required: false,
        description: `If true, pauses every running version of the journey instead of a single versionNumber. Required to be true if version_number is not provided.`,
      },
      {
        name: 'extend_wait_end_dates',
        type: 'boolean',
        required: false,
        description: `If true, extends the end dates of any in-flight Wait activities by the duration of the pause, so contacts don't skip ahead unexpectedly on resume.`,
      },
      {
        name: 'guardrail_action',
        type: 'string',
        required: false,
        description: `What happens if the journey remains paused longer than paused_days: 'stop' ends the journey for contacts, 'resume' automatically resumes it, or 'none' takes no automatic action.`,
      },
      {
        name: 'paused_days',
        type: 'integer',
        required: false,
        description: `Number of days the journey may remain paused before the guardrail_action is applied. The API defaults to 14 days if omitted.`,
      },
      {
        name: 'retain_contact_injection_while_journey_paused',
        type: 'boolean',
        required: false,
        description: `If true, new contacts can still enter the journey's entry event while it is paused (they wait until resume); if false, new entries are blocked while paused.`,
      },
      {
        name: 'version_number',
        type: 'integer',
        required: false,
        description: `The version number of the journey to pause. Required unless all_versions is set to true.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_journey_publish',
    description: `Publish a specific version of a journey in Salesforce Marketing Cloud Journey Builder, making it live so contacts can enter it (POST /interaction/v1/interactions/publishAsync/{id}?versionNumber={versionNumber}). Publishing happens asynchronously: this call returns a statusId immediately; use the Get Journey Publish Status tool with that statusId to poll for completion (PublishInProcess, PublishCompleted, or Error). Requires the journey's GUID and the specific version number to publish.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The GUID (UUID) of the journey to publish. Example: 8f14e45f-ceea-467e-adde-3fb5ba90140e.`,
      },
      {
        name: 'versionNumber',
        type: 'integer',
        required: true,
        description: `The version number of the journey to publish. Example: 1.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_journey_publish_status_get',
    description: `Check the status of an asynchronous journey publish request in Salesforce Marketing Cloud (GET /interaction/v1/interactions/publishStatus/{id}). Pass the statusId returned by the Publish Journey tool. Returns one of PublishInProcess, PublishCompleted, or Error, along with an errors array describing any publishing problems.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The statusId GUID returned by a prior call to the Publish Journey tool. Example: bd93502a-773c-4588-81d9-d3c7ca0cc10a.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_journey_resume',
    description: `Resume a currently paused standard journey (Journey Builder Interaction REST API), by its GUID id. Corrected endpoint: POST /interaction/v1/interactions/resume/{id} (not '.../resumeByDefinitionId/{id}'). You must supply either versionNumber (to resume one specific paused version) or set allVersions to true (to resume every paused version); providing neither is rejected by the API. No request body is needed. A successful call returns HTTP 202 Accepted with {"status": "Accepted"}. Requires the Automation | Journeys | Activate/Stop/Pause/Resume/Send/ScheduleActivate scope.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The GUID (ObjectID) of the journey to resume. Example: 8f14e45f-ceea-467e-bd3a-45b3f4b3e21f.`,
      },
      {
        name: 'all_versions',
        type: 'boolean',
        required: false,
        description: `If true, resumes every paused version of the journey instead of a single versionNumber. Required to be true if version_number is not provided.`,
      },
      {
        name: 'version_number',
        type: 'integer',
        required: false,
        description: `The version number of the journey to resume. Required unless all_versions is set to true.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_journey_stop',
    description: `Stop a running version of a journey for all contacts currently in it, using the Interaction REST API. Requires both the journey's GUID id and the versionNumber of the specific published version to stop; only that version is affected. Stopping a journey halts activity for contacts still progressing through it but does not delete the journey. Requires the Automation | Interactions | Read scope on the API integration.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The GUID (ObjectID) of the journey to stop. Example: 8f14e45f-ceea-467e-bd3a-45b3f4b3e21f.`,
      },
      {
        name: 'version_number',
        type: 'integer',
        required: true,
        description: `The version number of the journey to stop. Only this published/paused version is stopped.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_journey_trace_events_search',
    description: `Search execution trace events to debug a specific contact's path through a Salesforce Marketing Cloud journey -- e.g. to find out why a contact didn't receive an email, where they exited, or which activities they hit (POST /interaction/v1/interactions/traceevents/search). Salesforce's own REST discovery document for the Interaction API confirms a path with this description exists ('Search for trace events stored in ElasticSearch') but publishes no request/response schema, so the request body shape here (interactionId, versionNumber, contactKey, activityId, startDate/endDate, page, pageSize) is inferred rather than documented. A live test against a real, valid journey returned a 404 regardless of body content, suggesting the journey ID may belong in the path (as with sibling endpoints like journey_pause) rather than the body, or that the field names differ from what's modeled here -- treat this tool as needing further verification before relying on it in production.`,
    params: [
      {
        name: 'interactionId',
        type: 'string',
        required: true,
        description: `The journey's ID (GUID/UUID) to scope the trace-event search to, or (inferred, not officially documented) the form key:{key} to reference it by external key. Example: 8f14e45f-ceea-467e-adde-3fb5ba90140e.`,
      },
      {
        name: 'activityId',
        type: 'string',
        required: false,
        description: `Restrict results to trace events for one specific activity (step) within the journey. Leave blank to include all activities. Field name inferred -- not officially documented. Example: 3c1a2b4d-5e6f-7890-1234-56789abcdef0.`,
      },
      {
        name: 'contactKey',
        type: 'string',
        required: false,
        description: `The subscriber/contact key (typically SubscriberKey or email address) to trace through the journey -- the primary way to answer 'why didn't this contact receive their email'. Leave blank to search across all contacts. Field name inferred -- not officially documented. Example: subscriber@example.com.`,
      },
      {
        name: 'endDate',
        type: 'string',
        required: false,
        description: `Only include trace events at or before this ISO 8601 timestamp. Leave blank for no upper bound. Field name inferred -- not officially documented. Example: 2026-08-24T23:59:59Z.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number of results to fetch, starting at 1. Pagination shape inferred from other search/query endpoints in this connector -- not officially documented for this endpoint.`,
      },
      {
        name: 'pageSize',
        type: 'integer',
        required: false,
        description: `Number of trace events to return per page. Pagination shape inferred from other search/query endpoints in this connector -- not officially documented for this endpoint.`,
      },
      {
        name: 'startDate',
        type: 'string',
        required: false,
        description: `Only include trace events at or after this ISO 8601 timestamp. Leave blank for no lower bound. Field name inferred -- not officially documented. Example: 2026-08-01T00:00:00Z.`,
      },
      {
        name: 'versionNumber',
        type: 'integer',
        required: false,
        description: `Restrict the search to one specific journey version. Leave blank to search across all versions. Field name inferred -- not officially documented.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_journey_update',
    description: `Update a journey version in Salesforce Marketing Cloud Journey Builder (PUT /interaction/v1/interactions). Requires the journey's key, name, version number, workflowApiVersion, and its current modifiedDate (which must match the value on the server to prevent overwriting concurrent changes — fetch it fresh via the Get Journey tool first). Only journeys in Draft status can typically be updated; a published journey must usually be updated as a new version. If the supplied data exactly matches what's already on the server, the API returns HTTP 304 (no change) instead of 200.`,
    params: [
      {
        name: 'key',
        type: 'string',
        required: true,
        description: `The user-defined key (external identifier) of the journey to update. Example: onboarding-journey-2024.`,
      },
      {
        name: 'modifiedDate',
        type: 'string',
        required: true,
        description: `The journey's current modifiedDate exactly as returned by the Get Journey tool, used to detect and prevent concurrent-update conflicts. Format: ISO 8601, e.g. 2026-08-17T08:11:12.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Display name of the journey as shown in Journey Builder.`,
      },
      {
        name: 'version',
        type: 'integer',
        required: true,
        description: `The version number of the journey being updated. Example: 2.`,
      },
      {
        name: 'activities',
        type: 'array',
        required: false,
        description: `Array of activity objects defining the ordered steps of the journey. Each activity is a JSON object per the Journey Specification. Omit to leave activities unchanged (depending on API behavior, generally you should resend the full current set).`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Updated free-text description of the journey's purpose.`,
      },
      {
        name: 'goals',
        type: 'array',
        required: false,
        description: `Array of goal objects defining the journey's success criteria. Each goal is a JSON object per the Journey Specification.`,
      },
      {
        name: 'triggers',
        type: 'array',
        required: false,
        description: `Array of trigger objects defining the journey's entry source(s). Each trigger is a JSON object per the Journey Specification.`,
      },
      {
        name: 'workflowApiVersion',
        type: 'number',
        required: false,
        description: `The Journey Builder workflow API version. Use 1 (current) or 0.5 (legacy). Defaults to 1.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_journey_validate',
    description: `Asynchronously validate a specific version of a journey's configuration in Salesforce Marketing Cloud Journey Builder before publishing it, without making the journey live (POST /interaction/v1/interactions/validateAsync/{id}?versionNumber={versionNumber}). Runs the same technical checks Journey Builder performs when you click its 'Validate' button (entry source, activities, goals, exit criteria) and returns a statusId immediately; poll that statusId with the Get Journey Validation Status tool. unlike Publish Journey / Get Journey Publish Status (whose publishAsync/publishStatus pairing is fully documented at developer.salesforce.com/docs/marketing/marketing-cloud/references/mc_rest_interaction), this validateAsync/validateStatus pair does not currently appear in Salesforce's public REST discovery document or reference pages for the Interaction API. This tool is built by direct analogy to the confirmed, identically-shaped publishAsync endpoint (same {id}?versionNumber= signature, same fire-and-poll statusId response pattern) -- verify behavior against a sandbox account before relying on it in production.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The GUID (UUID) of the journey to validate, or use the form key:{key} to reference it by its external key instead (inferred by analogy with Get Journey and other Interaction endpoints that accept either form; this key: support is not independently confirmed for validateAsync). Example: 8f14e45f-ceea-467e-adde-3fb5ba90140e or key:onboarding-journey-2024.`,
      },
      {
        name: 'versionNumber',
        type: 'integer',
        required: true,
        description: `The version number of the journey to validate. Mirrors the required versionNumber query parameter of the documented Publish Journey (publishAsync) endpoint. Example: 1.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_journey_validate_status_get',
    description: `Check the status of an asynchronous journey validation request in Salesforce Marketing Cloud (GET /interaction/v1/interactions/validateStatus/{id}). Pass the statusId returned by the Validate Journey tool. By analogy with the confirmed, identically-patterned Get Journey Publish Status endpoint, the response is expected to include a status such as ValidateInProcess, ValidateCompleted, or Error, plus an errors array describing any validation problems. Salesforce's public REST discovery document and reference pages for the Interaction API do not currently list validateAsync/validateStatus at all (unlike publishAsync/publishStatus, which are fully documented). This tool is built by direct analogy to that documented publish-status pair; verify the actual status/field names against a sandbox account before relying on them in production.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The statusId GUID returned by a prior call to the Validate Journey tool. Example: bd93502a-773c-4588-81d9-d3c7ca0cc10a.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_journey_wait_statistics_get',
    description: `Retrieve counts of contacts currently sitting in Wait activities (Wait By Duration, Wait Until, Wait Until API Event, etc.) for a journey in Salesforce Marketing Cloud Journey Builder (GET /interaction/v1/waitstatistics/{id}). Useful for seeing how many contacts are currently paused at each wait step. this path and its one-line description ('Retrieve wait activity counts for a journey') are confirmed to exist in Salesforce's own REST discovery document for the Interaction API, but Salesforce does not publish a full parameter/response reference page for it -- no request/response schema and no confirmation of optional query parameters. The id parameter is modeled here, by analogy with the documented Get Journey and Get Event Definition endpoints in this same Interaction API, as accepting either the journey's GUID or a key:{key} external-key reference; this key: support is NOT independently confirmed for waitstatistics specifically. Verify against a sandbox account before relying on it in production.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The GUID (UUID) of the journey whose wait-activity statistics you want, or (inferred, not independently confirmed for this endpoint) the form key:{key} to reference it by its external key. Example: 8f14e45f-ceea-467e-adde-3fb5ba90140e or key:onboarding-journey-2024.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_nested_tag_create',
    description: `Create a new tag definition in Salesforce Marketing Cloud's tag hierarchy, optionally with nested child tags created in the same request, using the Nested Tags REST API (POST /hub/v1/nestedtags). This creates the reusable tag definition itself (e.g. 'Membership Level' with child tags 'Gold', 'Silver', 'Bronze') -- it does NOT associate any tag with an object. To associate a tag name with a campaign, journey, or Content Builder asset, use the separate Create Tag Associations tool (POST /hub/v1/objects/{objectTypeName}/tags/), which operates on a different resource and will auto-create a tag by that name if it doesn't already exist. Returns the created tag's generated ID and, if provided, the generated IDs of its nested child tags.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Name of the tag, up to 120 characters. Allowed special characters are period (.) and apostrophe (').`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description of the tag, up to 256 characters. Allowed special characters are period (.), apostrophe ('), comma (,), and forward slash (/).`,
      },
      {
        name: 'parent_id',
        type: 'integer',
        required: false,
        description: `The numeric ID of an existing tag to nest this new tag under. Omit (or leave null) to create a root-level tag with no parent.`,
      },
      {
        name: 'tags',
        type: 'array',
        required: false,
        description: `Array of child tags to create nested directly under this new tag in the same request. Each item needs a name (required) and may include a description. Example: [{"name": "Gold", "description": "Gold Membership Level"}].`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_nested_tag_delete',
    description: `Permanently delete a tag definition and all of its nested/child tags from Salesforce Marketing Cloud's tag hierarchy, using the Nested Tags REST API (DELETE /hub/v1/nestedtags/{tagId}). This action is irreversible and removes the entire tag subtree rooted at the given tag ID. This deletes the tag definition itself -- it does not, by itself, remove any tag-to-object associations that referenced this tag's name via the Create Tag Associations tool; verify no critical associations depend on this tag before deleting it.`,
    params: [
      {
        name: 'tag_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the tag to permanently delete. Deleting a tag also deletes all of its nested/child tags. Obtain this from the List Tags or Get Tag tools.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_nested_tag_get',
    description: `Retrieve a single tag definition by its numeric tag ID from Salesforce Marketing Cloud's Nested Tags REST API (GET /hub/v1/nestedtags/{tagId}). The response includes the tag's ID, name, description, parent tag ID (if nested), last modified date, and -- depending on the depth parameter -- its nested/child tags. Use this to inspect a specific tag before updating or deleting it, or to look up its current nested children.`,
    params: [
      {
        name: 'tag_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the tag to retrieve. Obtain this from the List Tags tool or from the response of a previous Create Tag call.`,
      },
      {
        name: 'depth',
        type: 'integer',
        required: false,
        description: `Number of nested tag levels to include below this tag in the response. 0 returns only this tag's own fields with no nested children expanded.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_nested_tag_update',
    description: `Partially update an existing tag definition in Salesforce Marketing Cloud's tag hierarchy, using the Nested Tags REST API (PATCH /hub/v1/nestedtags/{tagId}). Only the fields you provide are changed -- omitted fields (name, description, parent_id, tags) keep their current values. Use this to rename a tag, change its description, or move it under a different parent tag. This updates the tag definition itself, not any tag-to-object associations created via the Create Tag Associations tool.`,
    params: [
      {
        name: 'tag_id',
        type: 'integer',
        required: true,
        description: `The numeric ID of the tag to update. Obtain this from the List Tags or Get Tag tools.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New description for the tag, up to 256 characters. Allowed special characters are period (.), apostrophe ('), comma (,), and forward slash (/). Leave blank to keep the tag's current description unchanged.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New name for the tag, up to 120 characters. Allowed special characters are period (.) and apostrophe ('). Leave blank to keep the tag's current name unchanged.`,
      },
      {
        name: 'parent_id',
        type: 'integer',
        required: false,
        description: `New parent tag's numeric ID, to move this tag to nest under a different parent. Leave blank to keep the tag's current parent unchanged.`,
      },
      {
        name: 'tags',
        type: 'array',
        required: false,
        description: `Array of additional child tags to create nested under this tag as part of this update. Each item needs a name (required) and may include a description. Leave blank to leave the tag's existing nested children unchanged -- this field only adds new nested tags, it does not replace or remove existing ones. Example: [{"name": "Gold", "description": "Gold Membership Level"}].`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_platform_endpoint_get',
    description: `Resolve the base URL for a specific Marketing Cloud internal service or application by its symbolic name, using the Marketing Cloud Platform API's Endpoint resource (GET /platform/v1/endpoints/{name}). This is a low-level discovery call occasionally needed when integrating with Marketing Cloud sub-systems that publish their base URI dynamically per account/tenant rather than at a fixed, well-known host. Returns the resolved endpoint URL for the requested name. Valid names are account/tenant-specific and not a fixed, universal set (a live test against a real tenant confirmed a previously-documented-here example name, 'content_odata', is not valid on every account and returns "No endpoint exists for key 'content_odata'"), so don't assume any single name works everywhere. To discover the exact names valid for your account, call GET /platform/v1/endpoints (no name suffix), which returns every endpoint key configured for the tenant.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The symbolic name of the Marketing Cloud service/application whose base endpoint URL should be resolved. This is an internal service identifier, not a Data Extension or asset name. Valid names are account/tenant-specific (there is no fixed, universal list) and must be discovered per account, e.g. by listing GET /platform/v1/endpoints first.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_platform_endpoints_list',
    description: `List every symbolic platform endpoint key configured for this Salesforce Marketing Cloud tenant, along with each key's resolved base URL, using the Marketing Cloud Platform API's Endpoint resource (GET /platform/v1/endpoints, no name suffix). Valid endpoint names are account/tenant-specific and not a fixed, universal set across all Marketing Cloud accounts -- the Get Platform Endpoint tool's own documentation flags this discoverability gap (a previously-documented example name, 'content_odata', was confirmed invalid on a live tenant). Call this tool first to see the exact endpoint keys and resolved URLs valid for your account, then pass one of the returned names to the Get Platform Endpoint tool if you need to resolve it again on demand.`,
    params: [],
  },
  {
    name: 'salesforcemarketingcloud_push_message_create',
    description: `Create a push message template in Salesforce Marketing Cloud MobilePush, via POST /push/v1/message. Per Salesforce's documentation, this creates a push message template for sending to a subscriber list, an audience inclusion list, or a data extension, and each recipient's message can be personalized with personalization strings or AMPscript lookups from a data extension. Because Salesforce's push message schema has many optional, MobilePush-specific fields (message text/alert, sound, badge, media, custom keys, and one of subscriberKeys/listId/dataExtension for targeting), supply the complete message definition object exactly as documented in the Create Push Message reference (see help link) — it is sent through unmodified as the request body. On success, returns the created message's id, which you then use with the Send Push Message, Get Push Message, Update Push Message, and Get Push Message Deliveries tools. IMPORTANT: accounts with more than one MobilePush Application configured (e.g. separate iOS and Android apps) MUST include an applicationId field identifying which MobilePush Application the message belongs to — Salesforce rejects the request with HTTP 400 'Application is required' if it's omitted and the account is ambiguous. Find your Application's ID in Marketing Cloud under Mobile Push > Settings > [your app] (labeled 'Application ID' / API Key), and add it to the object below. Example minimal object: {"name": "Order Shipped Push", "keyword": "ORDERSHIPPED", "message": "Your order has shipped!", "subscriberKeys": ["contact-123"], "applicationId": "YOUR_MOBILEPUSH_APPLICATION_ID"}.`,
    params: [
      {
        name: 'push_message',
        type: 'object',
        required: true,
        description: `The complete push message definition object, exactly as documented by Salesforce's Create Push Message API. Must include the fields Salesforce requires for a push message template (typically a name, the message content/alert text, an audience target such as subscriberKeys, a list, or a data extension, and — for accounts with more than one MobilePush Application — an applicationId identifying which app the message belongs to). This object is sent through unmodified as the JSON request body.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_push_message_delivery_get',
    description: `Get the delivery status of a previous send job for a push message in Salesforce Marketing Cloud MobilePush, via GET /push/v1/message/{id}/deliveries. Returns a paginated collection of delivery records for the push message, showing per-send-job status information (e.g. queued/sent/failed counts and timestamps) for each time this message has been sent. Use this to check the outcome of a send triggered with the Send Push Message tool.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique numeric id of the push message whose delivery history you want to check. Obtain this from the List Push Messages tool or from the response of the Create Push Message tool.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number of delivery records to retrieve, starting at 1.`,
      },
      {
        name: 'pageSize',
        type: 'integer',
        required: false,
        description: `Number of delivery records to return per page. Defaults to 50.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_push_message_get',
    description: `Retrieve a single push message template from Salesforce Marketing Cloud MobilePush by its id, via GET /push/v1/message/{id}. Returns the message's full definition (name, keyword, message content/alert, sound, targeting configuration, and status). Use the List Push Messages tool to find a message's id if you don't already have it.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique numeric id of the push message to retrieve. Obtain this from the List Push Messages tool or from the response of the Create Push Message tool.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_push_message_list',
    description: `Retrieve and sort push message templates configured in Salesforce Marketing Cloud MobilePush, via GET /push/v1/message. Push messages are the message templates created with the Create Push Message tool for sending to a subscriber list, audience inclusion list, or data extension. Supports paging ($page/$pageSize) and an $orderBy expression to sort results (e.g. by name or lastUpdated). Use this to find an existing push message's id before getting its details, updating it, sending it, or checking its delivery status.`,
    params: [
      {
        name: 'orderBy',
        type: 'string',
        required: false,
        description: `Sort expression for the results, formatted as '<field> <asc|desc>'. Example: 'name asc' or 'modifiedDate desc'. Leave blank for the API's default order.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number of results to retrieve, starting at 1. Use with pageSize to page through large result sets.`,
      },
      {
        name: 'pageSize',
        type: 'integer',
        required: false,
        description: `Number of push messages to return per page. Defaults to 50.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_push_message_send',
    description: `Send an existing push message to specified devices of a push-enabled app in Salesforce Marketing Cloud MobilePush, via POST /push/v1/message/{id}/send. The id identifies a push message template created with the Create Push Message tool. Because Salesforce's send-targeting schema for this endpoint has several optional fields (e.g. which subscribers/devices to target and any text overrides), supply the complete send request object exactly as documented in the Send Message to Mobile Devices reference (see help link) — it is sent through unmodified as the request body. Use the Get Push Message Deliveries tool afterward to check the outcome of the send.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique numeric id of the push message template to send. Obtain this from the List Push Messages tool or from the response of the Create Push Message tool.`,
      },
      {
        name: 'send_request',
        type: 'object',
        required: true,
        description: `The complete send request object, exactly as documented by Salesforce's Send Message to Mobile Devices API — typically the set of subscriber keys or devices to target and any optional text/content overrides for this specific send. This object is sent through unmodified as the JSON request body.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_push_message_update',
    description: `Update an existing push message template in Salesforce Marketing Cloud MobilePush by its id, via PUT /push/v1/message/{id}. Per Salesforce's documentation, this updates a push message, optionally letting you override the message text specified in the definition. Because Salesforce's push message schema has many optional, MobilePush-specific fields, supply the complete, updated message definition object exactly as documented in the Update Push Message reference (see help link) — it is sent through unmodified as the request body. Use the List Push Messages or Get Push Message tool first to retrieve the current definition, then submit it back with your changes applied.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The unique numeric id of the push message to update. Obtain this from the List Push Messages tool or from the response of the Create Push Message tool.`,
      },
      {
        name: 'push_message',
        type: 'object',
        required: true,
        description: `The complete, updated push message definition object, exactly as documented by Salesforce's Update Push Message API. This object is sent through unmodified as the JSON request body and generally replaces the message's configuration, so include all fields you want to keep, not only the ones you're changing.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_security_events_list',
    description: `Retrieve logged Security Events for this Salesforce Marketing Cloud account and its child business units, using GET /data/v1/audit/securityEvents. Security Events record enterprise-level login/authentication activity (e.g. successful and failed sign-in attempts), as distinct from the sibling GET /data/v1/audit/auditEvents endpoint, which records administrative/configuration changes such as user and role updates. Each item in the response includes an id, createdDate, memberId, enterpriseId, the employee involved (id, employeeName, userName), the event/objectType (e.g. a login-related type), the operation performed, source details such as the originating IP address, and a transactionId — exact field names should be confirmed against a live response, since a fully public Salesforce Developers reference page for this exact operation could not be independently reloaded at authoring time. Results are paginated and sortable. Requires the account's Installed Package to have the Tracking Events Read (tracking_events_read) scope. Confirmed against Salesforce's official 'Salesforce Marketing Cloud APIs' Postman collection (folder: REST > Audit > Get Audit Events / Get Security Events) — the same collection the sibling audit_events_list tool in this connector was verified against. The page-size query parameter is sent as the lower-cased '$pagesize' (not '$pageSize'), matching the exact casing confirmed in that collection's example request for this endpoint; the full set of supported query parameters beyond $page/$pagesize/$orderBy (e.g. a possible $filter) is still not guaranteed and should be confirmed in testing.`,
    params: [
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Sort order for the results, as a field name followed by 'asc' or 'desc', e.g. 'createdDate desc'. Defaults to 'createdDate desc' (most recent first).`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number of results to retrieve, starting at 1. Use with page_size to page through large result sets.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of security events to return per page. Defaults to 50 if not specified.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_seed_list_create',
    description: `Create a new email seed list in Salesforce Marketing Cloud, using POST /messaging/v1/email/seed-lists/. A seed list is a set of monitored inbox addresses (e.g. test mailboxes at Gmail, Outlook, Yahoo) that inbox-rendering and deliverability tools send test copies to before a real campaign goes out. Seed lists have a 60-day retention period and must be updated at least every 30 days to stay active; each account supports up to 20 seed lists with up to 500 email addresses per list. The response contains the new seed list's generated ID.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `A unique, human-readable name for this seed list.`,
      },
      {
        name: 'seeds',
        type: 'array',
        required: true,
        description: `Array of email addresses to include as seeds on this list. Each address should be a monitored inbox used to check inbox placement and rendering. Up to 500 addresses per list.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional human-readable description of this seed list.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_seed_list_delete',
    description: `Permanently delete (inactivate) a seed list from Salesforce Marketing Cloud using the Email Seed List REST API (DELETE), looked up by its GUID. Every seed address within the seed list is inactivated. This is irreversible — the seed list can no longer be used for inbox-placement/deliverability testing once deleted. The seed list must belong to the same MID/Partner AppID used for authentication, or the request returns a 400/404. Example id: 8f14e45f-ceea-467e-9575-3ab4f8f8f8f8.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The GUID of the seed list to delete. Obtain this from the List Seed Lists tool's response. Deleting inactivates every seed address in the list and cannot be undone.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_seed_list_get',
    description: `Retrieve a single seed list by its GUID from Salesforce Marketing Cloud using the Email Seed List REST API. A seed list is a set of monitored inbox addresses (seeds) used for inbox-placement and deliverability testing of email sends. The response includes the seed list's id, name, description, and its array of seed email addresses. The seed list must belong to the same MID/Partner AppID used for authentication, or the request returns a 401/404. Obtain the id from the List Seed Lists tool's response. Example id: 8f14e45f-ceea-467e-9575-3ab4f8f8f8f8.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The GUID of the seed list to retrieve. Obtain this from the List Seed Lists tool's response. The seed list must belong to the currently authenticated MID/Partner AppID.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_seed_list_list',
    description: `List the email seed lists configured for this Salesforce Marketing Cloud account, using GET /messaging/v1/email/seed-lists. A seed list is a set of monitored inbox addresses used for inbox rendering and deliverability testing before sending a real campaign. Each item in the response includes the seed list's ID, name, description, and active seed count. An account can have up to 20 seed lists.`,
    params: [
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number of results to retrieve, starting at 1. Use with page_size to page through large result sets.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of seed lists to return per page. Defaults to 50 if not specified.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_seed_list_update',
    description: `Update an existing email seed list in Salesforce Marketing Cloud by its GUID, using PUT /messaging/v1/email/seed-lists/{id}. A seed list is a set of monitored inbox addresses (seeds) used for inbox-placement and deliverability testing of email sends. Supply any combination of name, description, and seeds — only the fields you provide are changed; fields left blank keep their current value. Provide at least one of name, description, or seeds, otherwise the request has nothing to update. Seed lists must be updated at least every 30 days to stay active (60-day retention period), so this tool can also be used purely to 'touch' a list and reset its retention clock by re-submitting its existing seeds. The seed list must belong to the same MID/Partner AppID used for authentication, or the request returns a 401/404. Obtain the id from the List Seed Lists tool's response.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The GUID of the seed list to update. Obtain this from the List Seed Lists tool's response. The seed list must belong to the currently authenticated MID/Partner AppID.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New human-readable description of this seed list. Leave blank to keep the current description.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New unique, human-readable name for this seed list. Leave blank to keep the current name.`,
      },
      {
        name: 'seeds',
        type: 'array',
        required: false,
        description: `Full replacement array of email addresses for this seed list. If provided, this replaces the entire existing set of seed addresses (not a merge/append) — include every address the list should keep, not just new ones. Leave blank to keep the current seeds unchanged. Up to 500 addresses per list.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_sms_audience_refresh',
    description: `Trigger a refresh of a filtered SMS list/audience in MobileConnect, recalculating its membership against current subscriber data. Requires the list's ID — Salesforce's own examples show this as an opaque encoded string (like the targetListIds/exclusionListIds used with Send SMS to List), not a short decimal number. Returns HTTP 202 Accepted with a tokenId and lastPublishDate; the refresh runs asynchronously, so poll the Get Refresh List Status endpoint (GET /sms/v1/contacts/refreshList/{id}/status/{tokenId}) with that tokenId to check completion. Example: list_id 'bzZ0cENGam1FZUtNX0poTDRYZzhlQTo2Mzow'.`,
    params: [
      {
        name: 'list_id',
        type: 'string',
        required: true,
        description: `The ID of the filtered SMS list/audience to refresh. Salesforce's MobileConnect list IDs are opaque encoded strings (the same format as targetListIds/exclusionListIds), not plain decimal numbers. Example: bzZ0cENGam1FZUtNX0poTDRYZzhlQTo2Mzow.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_sms_audience_refresh_status_get',
    description: `Get the status of a previously triggered SMS audience/list refresh, via GET /sms/v1/contacts/refreshList/{id}/status/{tokenId}. The id is the MobileConnect list ID that was refreshed, and tokenId is the value returned by the Refresh SMS Audience tool. Salesforce's own example response returns tokenId and publishDate, confirming the refresh completed and when the list was republished; the existing Refresh SMS Audience tool only triggers the refresh, so use this tool to check whether it finished. If the request is invalid, Salesforce returns HTTP 400 with error details. Example id: bzZ0cENGam1FZUtNX0poTDRYZzhlQTo2Mzow, example tokenId: NDo8NDow.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the MobileConnect list that was refreshed, as shown in the MobileConnect interface. This is the same list_id passed to the Refresh SMS Audience tool. Example: bzZ0cENGam1FZUtNX0poTDRYZzhlQTo2Mzow.`,
      },
      {
        name: 'tokenId',
        type: 'string',
        required: true,
        description: `The unique tokenId returned by the Refresh SMS Audience call. Example: NDo8NDow.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_sms_contact_import_queue',
    description: `Queue an asynchronous CSV audience/contact import into a MobileConnect SMS list, via POST /sms/v1/contacts/queueImport/{id}. The id is the list's ID as shown in the MobileConnect interface. Salesforce's own example sends the same list ID again inside the body as ListId alongside the file's name, short code, and keyword to opt contacts on to; set is_first_row_header to indicate whether the CSV's first row is a header, and optionally provide field_maps to map source columns to destination fields (e.g. _MobileNumber, _SubscriberKey, _CountryCode) when import_mapping_type is a manual mapping mode. The call returns HTTP 202 Accepted with a tokenId; poll the Get SMS Contact Import Status tool with that tokenId and the list id to track progress. Example field_maps entry: {"destination": "_MobileNumber", "ordinal": 2, "source": "mobile number"}.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the MobileConnect list to import contacts into, as shown in the MobileConnect interface. This is also sent again inside the body as ListId. Example: UEhwdktFWXpFZUs3Z3hRUW45R2dBQTo2Mzow.`,
      },
      {
        name: 'email_address',
        type: 'string',
        required: false,
        description: `Email address to notify when send_email_notification is enabled. Required if send_email_notification is true.`,
      },
      {
        name: 'field_maps',
        type: 'array',
        required: false,
        description: `Array of column mappings from the source CSV to MobileConnect destination fields (e.g. _MobileNumber, _SubscriberKey, _CountryCode), each with an ordinal position. Used together with a manual import_mapping_type such as MapByOrdinal. Example: [{"destination": "_MobileNumber", "ordinal": 2, "source": "mobile number"}, {"destination": "_SubscriberKey", "ordinal": 1, "source": "subscriber key"}].`,
      },
      {
        name: 'file_name',
        type: 'string',
        required: false,
        description: `The name of the CSV file to import, including its extension. The file must already be present in the location MobileConnect expects (e.g. the account's Enhanced FTP import folder). Example: testdata.csv.`,
      },
      {
        name: 'file_type',
        type: 'string',
        required: false,
        description: `The type of the file being imported. Salesforce currently only supports 'csv'.`,
      },
      {
        name: 'import_mapping_type',
        type: 'string',
        required: false,
        description: `How CSV columns are mapped to destination fields, e.g. MapByOrdinal (use field_maps) or an automatic header-inference mode. Omit to use the account default.`,
      },
      {
        name: 'is_first_row_header',
        type: 'boolean',
        required: false,
        description: `Whether the first row of the CSV file is a header row rather than data.`,
      },
      {
        name: 'keyword',
        type: 'string',
        required: false,
        description: `A keyword already configured on short_code that imported contacts should be opted on to. Example: WELCOME.`,
      },
      {
        name: 'send_email_notification',
        type: 'boolean',
        required: false,
        description: `Whether to email a notification when the import completes. If true, email_address is required.`,
      },
      {
        name: 'short_code',
        type: 'string',
        required: false,
        description: `The short code the imported contacts belong to. Example: 90913.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_sms_contact_import_status_get',
    description: `Get the status of a queued SMS contact import job, via GET /sms/v1/contacts/queueImport/{id}/status/{tokenId}. The id is the MobileConnect list ID the import targeted, and tokenId is the value returned by the Queue SMS Contact Import call. Salesforce's own example response returns tokenId, status (e.g. Completed), createdDate, and type. Example id: UEhwdktFWXpFZUs3Z3hRUW45R2dBQTo2Mzow, example tokenId: NzY2MTU6NDI6MA.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The ID of the MobileConnect list the import was queued against, as shown in the MobileConnect interface. Example: UEhwdktFWXpFZUs3Z3hRUW45R2dBQTo2Mzow.`,
      },
      {
        name: 'tokenId',
        type: 'string',
        required: true,
        description: `The unique tokenId returned by the Queue SMS Contact Import call. Example: NzY2MTU6NDI6MA.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_sms_contact_subscription_status_get',
    description: `Batch-check MobileConnect SMS subscription status for up to 500 contacts at once, via POST /sms/v1/contacts/subscriptions. Salesforce exposes this lookup as a POST with a batch body rather than a GET, even though it only reads data -- provide either mobile_numbers or subscriber_keys (up to 500 entries each; Salesforce's own example sends only mobile_numbers, so provide at least one of the two arrays). Returns a count, createDate/completeDate, and a contacts array where each entry includes the mobile number, the shortCode and keyword it is subscribed under, and its optInDate. Example mobile_numbers: ["15555555555"].`,
    params: [
      {
        name: 'mobile_numbers',
        type: 'array',
        required: false,
        description: `Array of mobile numbers to check subscription status for, up to 500. Numbers should include country code (e.g. U.S. numbers as 1 plus area code and number). Provide this and/or subscriber_keys. Example: ["15555555555"].`,
      },
      {
        name: 'subscriber_keys',
        type: 'array',
        required: false,
        description: `Array of subscriber keys to check subscription status for, up to 500. Provide this and/or mobile_numbers. Example: ["contact-001"].`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_sms_import_and_send',
    description: `Import a contact file or data extension and send an SMS message in a single call, via POST /sms/v1/automation/importSend. Salesforce documents this as supported only for Outbound Message templates (not keyword/inbound templates). The import_definition is a one-item array describing where the contacts come from: set ImportType to FILE and provide FileName plus a FieldMaps array mapping source columns to destination fields (e.g. _MobileNumber, _SubscriberKey), or set ImportType to DATA_EXTENSION and provide DataExtensionName with an ImportMappingType (e.g. InferFromColumnHeadings). The call returns HTTP 202 Accepted with a tokenId; poll the ImportSend Status tool with that tokenId to track import progress and record counts. Example import_definition (FILE): [{"ImportType": "FILE", "FileName": "MyTestList.csv", "ImportMappingType": "ManualMap", "FieldMaps": [{"Destination": "_MobileNumber", "Source": "Mobile"}, {"Destination": "_SubscriberKey", "Source": "Subscriber Key"}]}]. Example import_definition (DATA_EXTENSION): [{"ImportType": "DATA_EXTENSION", "ImportMappingType": "InferFromColumnHeadings", "DataExtensionName": "MyDataExtension", "IsFirstRowHeader": true}].`,
    params: [
      {
        name: 'import_definition',
        type: 'array',
        required: true,
        description: `One-item array (Salesforce currently limits this to a single entry) describing the source of contacts to import before sending. Use ImportType 'FILE' with FileName and a FieldMaps array (Destination/Source pairs, e.g. _MobileNumber, _SubscriberKey, _CountryCode) to import from an uploaded file, or ImportType 'DATA_EXTENSION' with DataExtensionName and ImportMappingType to import from an existing data extension. Example: [{"ImportType": "DATA_EXTENSION", "ImportMappingType": "InferFromColumnHeadings", "DataExtensionName": "MyDataExtension", "IsFirstRowHeader": true}].`,
      },
      {
        name: 'keyword',
        type: 'string',
        required: true,
        description: `A valid keyword already configured on the account's short code, used to opt the imported mobile numbers on to that keyword. Example: JOIN.`,
      },
      {
        name: 'messageId',
        type: 'string',
        required: true,
        description: `The encoded ID of the Outbound Message template to send. Find this via the SMS message definitions API or Mobile Studio.`,
      },
      {
        name: 'isDuplicationAllowed',
        type: 'boolean',
        required: false,
        description: `Whether the same mobile number can receive this message more than once. Omit to use the account/message default.`,
      },
      {
        name: 'isVisible',
        type: 'boolean',
        required: false,
        description: `Whether the generated import definition and its resulting list are made visible in the MobileConnect interface. Omit to use the default.`,
      },
      {
        name: 'notificationEmail',
        type: 'string',
        required: false,
        description: `Email address to notify when the import starts and completes. Omit to skip email notifications.`,
      },
      {
        name: 'override',
        type: 'boolean',
        required: false,
        description: `Whether to replace the template's configured message text with overrideText for this send. Omit to send the template's own text.`,
      },
      {
        name: 'overrideText',
        type: 'string',
        required: false,
        description: `Replacement message text to send instead of the template's configured text. Required when override is true.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_sms_import_send_delivery_report_create',
    description: `Generate a CSV delivery report for a Salesforce Marketing Cloud MessageList/ImportSend job, via POST /sms/v1/automation/importSend/{id}/deliveryReport. The id is the tokenId returned by the MessageList send or ImportSend call the report covers. The resulting .csv file, containing SMS delivery information for that job, is written to the account's Enhanced FTP 'reports' folder under the file_name you provide -- Salesforce's docs do not show an example response body, so success is inferred from the HTTP status. Example id: NDo8NDow.`,
    params: [
      {
        name: 'file_name',
        type: 'string',
        required: true,
        description: `The name to give the generated delivery report .csv file in the account's Enhanced FTP 'reports' folder. Example: DeliveryReportFileName.csv.`,
      },
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The tokenId of the MessageList send or ImportSend job to generate a delivery report for. Example: NDo8NDow.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_sms_import_send_status_get',
    description: `Get the status of a SMS ImportSend automation job in Salesforce Marketing Cloud, via GET /sms/v1/automation/importSend/{tokenid}/status. The tokenid is the tokenId returned in the response of the Import Contacts and Send SMS call. Salesforce's own example response returns status (e.g. Complete), lastUpdate, createdTime, startTime, completedTime, lastRunTime, source (the original file/data extension name), and counts of inserted, updated, and invalid records from the import. Example tokenId: NDo8NDow.`,
    params: [
      {
        name: 'tokenid',
        type: 'string',
        required: true,
        description: `The tokenId returned by the Import Contacts and Send SMS call whose status you want to check. Example: NDo8NDow.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_sms_keyword_create',
    description: `Create a keyword on your MobileConnect account's short code or long code. Contacts who text this keyword to your number trigger whatever automation (auto-reply, subscription, journey entry) is configured for it in Marketing Cloud. You must supply the keyword text and its two-letter country code, plus at least one of short_code or long_code identifying the number the keyword is created on. Returns HTTP 202 Accepted with the new KeywordId; keyword creation is processed asynchronously. Example: keyword 'JOIN', country_code 'US', short_code '12345'.`,
    params: [
      {
        name: 'country_code',
        type: 'string',
        required: true,
        description: `The two-letter country code specifying the country the short code (or long code) belongs to, e.g. 'US' for the United States.`,
      },
      {
        name: 'keyword',
        type: 'string',
        required: true,
        description: `The keyword text to create, e.g. 'JOIN'. This is the exact word a contact must text in to trigger the associated automation.`,
      },
      {
        name: 'long_code',
        type: 'string',
        required: false,
        description: `The long code the keyword will be created on, e.g. '+15551234567'. Provide either short_code or long_code (not necessarily both) to identify which MobileConnect number this keyword belongs to.`,
      },
      {
        name: 'short_code',
        type: 'string',
        required: false,
        description: `The short code the keyword will be created on, e.g. '12345'. Provide either short_code or long_code (not necessarily both) to identify which MobileConnect number this keyword belongs to.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_sms_keyword_delete_by_id',
    description: `Permanently delete a MobileConnect SMS keyword from your Salesforce Marketing Cloud account by its encoded keyword ID, via DELETE /sms/v1/keyword/{keywordId}. Once deleted, contacts texting that keyword to your short/long code no longer trigger the associated automation. This is irreversible -- recreate the keyword with the Create SMS Keyword tool if needed. Confirmed directly from Salesforce's REST API reference (deleteKeywordViaKeywordId), which documents a 202 Accepted response containing a Status message confirming the delete.`,
    params: [
      {
        name: 'keyword_id',
        type: 'string',
        required: true,
        description: `The encoded ID of the keyword to permanently delete, e.g. MzA6Nzg6MA. This is not the keyword text itself -- find it from a previous keyword list/create response or from Mobile Studio's keyword configuration.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_sms_keyword_delete_by_longcode',
    description: `Permanently delete a MobileConnect SMS keyword by its keyword text plus the long code it's configured on, via DELETE /sms/v1/keyword/{keyword}/{longCode}. Use this when you know the keyword text and long code but not the keyword's encoded ID (use the by-ID delete tool instead if you have that). Once deleted, contacts texting that keyword to the long code no longer trigger the associated automation; this is irreversible. Confirmed directly from Salesforce's REST API reference (deleteKeywordViaKeywordLongCode), which documents a request body echoing Keyword and LongCode and a 202 Accepted response with a Status confirmation message.`,
    params: [
      {
        name: 'keyword',
        type: 'string',
        required: true,
        description: `The exact keyword text to delete, e.g. 'TEST'. Must match the keyword text exactly as configured on the long code.`,
      },
      {
        name: 'long_code',
        type: 'string',
        required: true,
        description: `The long code the keyword is configured on, e.g. '5550003232'. Identifies which MobileConnect number's keyword to delete.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_sms_keyword_delete_by_shortcode',
    description: `Permanently delete a MobileConnect SMS keyword by its keyword text plus the short code and country code it's configured on, via DELETE /sms/v1/keyword/{keyword}/{shortCode}/{countryCode}. Use this when you know the keyword text, short code, and country but not the keyword's encoded ID (use the by-ID delete tool instead if you have that). Once deleted, contacts texting that keyword to the short code no longer trigger the associated automation; this is irreversible. Confirmed directly from Salesforce's REST API reference (deleteKeywordViaKeywordShortCodeCountryCode), which documents a request body echoing Keyword, ShortCode, and CountryCode and a 202 Accepted response with a Status confirmation message.`,
    params: [
      {
        name: 'country_code',
        type: 'string',
        required: true,
        description: `The two-letter country code the short code operates in, e.g. 'US'.`,
      },
      {
        name: 'keyword',
        type: 'string',
        required: true,
        description: `The exact keyword text to delete, e.g. 'TEST'. Must match the keyword text exactly as configured on the short code.`,
      },
      {
        name: 'short_code',
        type: 'string',
        required: true,
        description: `The short code the keyword is configured on, e.g. '89239'.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_sms_message_delivery_get',
    description: `Retrieve the overall delivery status of a MobileConnect SMS message sent to a contact, plus the per-recipient tracking history. Requires the message ID and the token ID that were both returned in the response of the original send call (POST /sms/v1/messageContact/{id}/send). Returns a top-level status (New, Queuing, Started, Finished, or Error), the message count, create/complete timestamps, and a tracking array with one entry per recipient containing mobileNumber, statusCode, standardStatusCode, and description. Because carriers can report multiple status codes over time for the same message, infer the final delivery outcome from the tracking entry with the highest-numbered standard status code. Both IDs are opaque encoded strings (not GUIDs) — Salesforce's own docs show values like messageId 'MTA3ODo3ODow', tokenId 'MENqMHZHV2x3a0M1dG1iOHVnam9LZzo3OTow'.`,
    params: [
      {
        name: 'message_id',
        type: 'string',
        required: true,
        description: `The message ID returned when the SMS was originally sent via the Post Message to Number/List (messageContact) API. Identifies the specific send job whose delivery status you want to check. This is an opaque encoded string (not a GUID/UUID), e.g. MTA3ODo3ODow.`,
      },
      {
        name: 'token_id',
        type: 'string',
        required: true,
        description: `The token ID returned alongside the message ID in the original send response. Identifies the specific recipient/job token whose delivery status you want to check. This is an opaque encoded string (not a GUID/UUID), e.g. MENqMHZHV2x3a0M1dG1iOHVnam9LZzo3OTow.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_sms_message_history_get',
    description: `Retrieve the message history for a specific mobile number tied to a MobileConnect SMS send job. Requires the message ID and token ID returned by the original send call (POST /sms/v1/messageContact/{id}/send) plus the recipient's mobile number. Returns the last message(s) sent to that mobile number for the job, including message type, content, and timestamp for each history entry. Use this to inspect exactly what content a specific recipient received. Both IDs are opaque encoded strings (not GUIDs) — Salesforce's own docs show values like messageId 'MTA3ODo3ODow', tokenId 'MENqMHZHV2x3a0M1dG1iOHVnam9LZzo3OTow', mobileNumber 1120816001.`,
    params: [
      {
        name: 'message_id',
        type: 'string',
        required: true,
        description: `The message ID returned when the SMS was originally sent via the Post Message to Number/List (messageContact) API. This is an opaque encoded string (not a GUID/UUID), e.g. MTA3ODo3ODow.`,
      },
      {
        name: 'mobile_number',
        type: 'string',
        required: true,
        description: `The recipient's mobile number to look up history for, in the normalized country-code format used by MobileConnect (digits only, including country code, no leading '+' or '00'). Example: 15551234567 for a US number.`,
      },
      {
        name: 'token_id',
        type: 'string',
        required: true,
        description: `The token ID returned alongside the message ID in the original send response. This is an opaque encoded string (not a GUID/UUID), e.g. MENqMHZHV2x3a0M1dG1iOHVnam9LZzo3OTow.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_sms_message_list_delivery_get',
    description: `Retrieve the delivery status of a MobileConnect SMS message sent to a contact list, via GET /sms/v1/messageList/{id}/deliveries/{tokenId}. This is the list-send counterpart to the existing per-contact delivery status tool: pass the message list definition ID and the token ID returned by the original Send SMS to List call. Returns a top-level status (New, Queuing, Started, Finished, or Error), a message count, create/complete timestamps, and a tracking array with one entry per recipient (mobile number, carrier status code, and message). Confirmed directly from Salesforce's REST API reference (Get Message List Status), which documents this exact response shape with a 200 response on success and a 400 with an errors array on invalid parameters.`,
    params: [
      {
        name: 'message_list_id',
        type: 'string',
        required: true,
        description: `The ID of the MobileConnect message list definition the send was made through -- the same ID used in the original Send SMS to List call, e.g. MzA6Nzg6MA.`,
      },
      {
        name: 'token_id',
        type: 'string',
        required: true,
        description: `The token ID returned in the response of the original Send SMS to List call. Identifies the specific send job whose delivery status you want to check. This is an opaque encoded string (not a GUID/UUID), e.g. MENqMHZHV2x3a0M1dG1iOHVnam9LZzo3OTow.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_sms_message_list_delivery_report_create',
    description: `Generate a CSV delivery report for a MobileConnect SMS message list send, via POST /sms/v1/messageList/{messageID}/deliveryReport/{tokenId}. Pass the message list definition ID and the token ID returned by the original Send SMS to List call, plus a file name; Marketing Cloud writes the report as a CSV file into your account's FTP/reports folder under that name. Confirmed directly from Salesforce's REST API reference (Create MessageList Delivery Report), which documents the path parameters and the required fileName body field. The exact success response body and status code are not shown in that reference, so this tool is configured leniently (any 2xx) rather than asserting a specific status -- treat any 2xx as success and check your FTP/reports folder for the file.`,
    params: [
      {
        name: 'file_name',
        type: 'string',
        required: true,
        description: `Name to give the generated report file. Marketing Cloud writes it as a CSV into your account's FTP/reports folder under this name, e.g. 'list_send_delivery_report'. Do not include a file extension unless your account setup expects one.`,
      },
      {
        name: 'message_list_id',
        type: 'string',
        required: true,
        description: `The ID of the MobileConnect message list definition the send was made through -- the same ID used in the original Send SMS to List call, e.g. MzA6Nzg6MA.`,
      },
      {
        name: 'token_id',
        type: 'string',
        required: true,
        description: `The token ID returned in the response of the original Send SMS to List call. This is an opaque encoded string (not a GUID/UUID), e.g. MENqMHZHV2x3a0M1dG1iOHVnam9LZzo3OTow.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_sms_message_send_to_list',
    description: `Initiate a Salesforce Marketing Cloud MobileConnect SMS send to one or more contact lists, via POST /sms/v1/messageList/{id}/send. The id is the internal id of an existing MobileConnect keyword/message definition (find it via the SMS definitions API or Mobile Studio). By default the send goes to the target and exclusion lists configured on the definition; set overrideTemplateTargetLists to 'true' and provide targetListIds to send to different lists instead (likewise for exclusions). If overrideMessageText is 'true', messageText is required and replaces the text configured on the definition. The API responds asynchronously (202 Accepted) with a tokenId you can use to check send status; a 400 response indicates a validation error.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The internal id of the MobileConnect keyword/message definition to send through, e.g. MzA6Nzg6MA. Find this via the SMS definitions list API or the Mobile Studio keyword configuration.`,
      },
      {
        name: 'allowDuplication',
        type: 'boolean',
        required: false,
        description: `Whether the same mobile number can receive this message more than once (e.g. if present on multiple target lists). Defaults to false.`,
      },
      {
        name: 'blackoutWindowEnd',
        type: 'string',
        required: false,
        description: `End time of a blackout window during which the message should not be delivered, in HHmm format relative to blackoutWindowUtcOffset. Required if any blackout window field is set.`,
      },
      {
        name: 'blackoutWindowStart',
        type: 'string',
        required: false,
        description: `Start time of a blackout window during which the message should not be delivered, in HHmm format relative to blackoutWindowUtcOffset. Required if any blackout window field is set.`,
      },
      {
        name: 'blackoutWindowUtcOffset',
        type: 'string',
        required: false,
        description: `UTC offset the blackoutWindowStart/blackoutWindowEnd times are expressed in, e.g. '-0500'. Required if any blackout window field is set.`,
      },
      {
        name: 'contentUrl',
        type: 'string',
        required: false,
        description: `URL of media content to include for an MMS send. Leave blank for a plain-text SMS.`,
      },
      {
        name: 'exclusionListIds',
        type: 'array',
        required: false,
        description: `List IDs to exclude from this send. Only used when overrideTemplateExclusionLists is 'true'; otherwise the definition's configured exclusion lists apply.`,
      },
      {
        name: 'ignoreExclusionLists',
        type: 'boolean',
        required: false,
        description: `Whether to ignore all exclusion lists, including the account's default exclusion list, for this send. Defaults to false. Use with caution.`,
      },
      {
        name: 'messageText',
        type: 'string',
        required: false,
        description: `Text of the message to send, overriding the text configured on the message definition. Required when overrideMessageText is 'true'.`,
      },
      {
        name: 'overrideMessageText',
        type: 'string',
        required: false,
        description: `Whether to override the message text configured on the definition with messageText. Pass 'true' or 'false' as a string. Defaults to 'false'.`,
      },
      {
        name: 'overrideTemplateExclusionLists',
        type: 'string',
        required: false,
        description: `Whether to use exclusionListIds instead of the definition's configured exclusion lists. Pass 'true' or 'false' as a string. Defaults to 'false'.`,
      },
      {
        name: 'overrideTemplateTargetLists',
        type: 'string',
        required: false,
        description: `Whether to use targetListIds instead of the definition's configured target lists. Pass 'true' or 'false' as a string. Defaults to 'false'. If 'true', targetListIds should be provided.`,
      },
      {
        name: 'sendTime',
        type: 'string',
        required: false,
        description: `UTC date/time to schedule the send for, formatted like '2026-09-01 17:01' (yyyy-MM-dd HH:mm). Leave blank to send immediately.`,
      },
      {
        name: 'targetListIds',
        type: 'array',
        required: false,
        description: `List IDs to send to. Only used when overrideTemplateTargetLists is 'true'; otherwise the definition's configured target lists apply.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_sms_message_send_to_number',
    description: `Initiate a Salesforce Marketing Cloud MobileConnect SMS send to one or more mobile numbers, via POST /sms/v1/messageContact/{id}/send. The id is the internal id of an existing MobileConnect keyword/message definition (find it via the SMS definitions API or Mobile Studio). Provide either mobileNumbers (plain phone numbers) or subscribers (mobile number + subscriber key pairs, up to 250), but not both. Mobile numbers must include the numeric country code with no formatting characters (e.g. 13175551212 for a US number). If subscribe or resubscribe is true, keyword is required. If override is true, messageText is required and replaces the message text configured on the definition. The API responds asynchronously (202 Accepted) with a tokenId you can use to check send status; a 400 response indicates a validation error.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `The internal id of the MobileConnect keyword/message definition to send through, e.g. MzA6Nzg6MA. Find this via the SMS definitions list API or the Mobile Studio keyword configuration.`,
      },
      {
        name: 'blackoutWindowEnd',
        type: 'string',
        required: false,
        description: `End time of a blackout window during which the message should not be delivered, in HHmm format relative to blackoutWindowUtcOffset. Required if any blackout window field is set.`,
      },
      {
        name: 'blackoutWindowStart',
        type: 'string',
        required: false,
        description: `Start time of a blackout window during which the message should not be delivered, in HHmm format relative to blackoutWindowUtcOffset. Required if any blackout window field is set.`,
      },
      {
        name: 'blackoutWindowUtcOffset',
        type: 'string',
        required: false,
        description: `UTC offset the blackoutWindowStart/blackoutWindowEnd times are expressed in, e.g. '-0500'. Required if any blackout window field is set.`,
      },
      {
        name: 'contentUrl',
        type: 'string',
        required: false,
        description: `URL of media content to include for an MMS send. Leave blank for a plain-text SMS.`,
      },
      {
        name: 'keyword',
        type: 'string',
        required: false,
        description: `The SMS keyword tied to this message. Required when subscribe or resubscribe is true.`,
      },
      {
        name: 'messageText',
        type: 'string',
        required: false,
        description: `Text of the message to send, overriding the text configured on the message definition. Required when override is true.`,
      },
      {
        name: 'mobileNumbers',
        type: 'array',
        required: false,
        description: `Array of mobile numbers to send the SMS to, including numeric country code and no formatting characters (e.g. 13175551212). Provide this or subscribers, not both.`,
      },
      {
        name: 'override',
        type: 'boolean',
        required: false,
        description: `Whether to override the message text configured on the definition with messageText. Defaults to false.`,
      },
      {
        name: 'resubscribe',
        type: 'boolean',
        required: false,
        description: `Whether to reset the recipient's subscription if they are currently unsubscribed. Defaults to false. If true, keyword is required.`,
      },
      {
        name: 'sendTime',
        type: 'string',
        required: false,
        description: `UTC date/time to schedule the send for, formatted like '2026-09-01 17:01'. Leave blank to send immediately.`,
      },
      {
        name: 'subscribe',
        type: 'boolean',
        required: false,
        description: `Whether to create a subscription for the recipient if none exists yet. Defaults to false. If true, keyword is required.`,
      },
      {
        name: 'subscribers',
        type: 'array',
        required: false,
        description: `Array of up to 250 subscriber objects to send to, each with mobileNumber (required), subscriberKey (required), and optional attributes (key-value pairs used for message personalization). Provide this or mobileNumbers, not both.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_sms_mo_message_delivery_get',
    description: `Retrieve the delivery status of a queued mobile-originated (MO) message, via GET /sms/v1/queueMO/deliveries/{tokenId}. Pass the token ID returned by the original Queue Mobile-Originated (MO) Message call. Returns a tracking array with one entry per simulated recipient, each containing the mobile number, carrier status code, and a status message (e.g. 'Carrier Success') -- useful for confirming that a simulated inbound test message was accepted and processed. Confirmed directly from Salesforce's REST API reference (getQueueMODelivery), which documents this exact response shape.`,
    params: [
      {
        name: 'token_id',
        type: 'string',
        required: true,
        description: `The token ID returned in the response of the original Queue Mobile-Originated (MO) Message call. This is an opaque encoded string (not a GUID/UUID), e.g. MENqMHZHV2x3a0M1dG1iOHVnam9LZzo3OTow.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_sms_mo_message_history_get',
    description: `Retrieve the full interaction history of a queued mobile-originated (MO) message, via GET /sms/v1/queueMO/history/{tokenId}. Pass the token ID returned by the original Queue Mobile-Originated (MO) Message call. Returns a message count, create timestamp, overall status, and a history array of individual message/response events (each with a type of MT or MO, the message text, and a timestamp) -- useful for tracing the full back-and-forth an inbound test message triggered, such as keyword auto-replies or double opt-in prompts. Confirmed directly from Salesforce's REST API reference (getQueueMOHistory), which documents this exact response shape.`,
    params: [
      {
        name: 'token_id',
        type: 'string',
        required: true,
        description: `The token ID returned in the response of the original Queue Mobile-Originated (MO) Message call. This is an opaque encoded string (not a GUID/UUID), e.g. MENqMHZHV2x3a0M1dG1iOHVnam9LZzo3OTow.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_sms_mo_message_queue',
    description: `Queue a simulated mobile-originated (MO) message on your MobileConnect short code, primarily used to test keyword flows and double opt-in journeys without needing an actual mobile device to text in. Requires short_code and message_text (the inbound text body, e.g. a keyword like 'JOIN'), plus either mobile_numbers (raw phone numbers) or subscribers (existing contacts identified by mobile number + SubscriberKey) -- provide exactly one of the two, not both. Accepts at most 250 entries in whichever list you provide. Returns HTTP 202 Accepted with an identifier and per-message result status.`,
    params: [
      {
        name: 'message_text',
        type: 'string',
        required: true,
        description: `The text body of the simulated inbound message, e.g. a keyword like 'JOIN' or a double opt-in confirmation reply like 'Y'.`,
      },
      {
        name: 'short_code',
        type: 'string',
        required: true,
        description: `The short code the simulated inbound message is sent to. Must be a short code already configured on the account.`,
      },
      {
        name: 'mobile_numbers',
        type: 'array',
        required: false,
        description: `Array of normalized mobile phone numbers (digits only, including country code, 8-15 characters each) to simulate the MO message from, up to 250 entries. Provide this or subscribers, not both.`,
      },
      {
        name: 'subscribers',
        type: 'array',
        required: false,
        description: `Array of subscriber objects (up to 250) to simulate the MO message from, when targeting existing contacts by SubscriberKey rather than raw mobile numbers. Each object must include mobilenumber and subscriberkey. Provide this or mobile_numbers, not both. Example: [{"mobilenumber": "15551234567", "subscriberkey": "contact-001"}].`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_tag_create',
    description: `Associate one or more tags with one or more objects (e.g. campaigns, journeys, Content Builder media) in Salesforce Marketing Cloud, using the Objects Tagging REST API. The API creates one tag-object association for every combination of the supplied object IDs and tag names (e.g. 3 tag names x 2 object IDs creates 6 associations). If a supplied tag name doesn't already exist, it's created automatically. For journeys, pass the journey's OriginalDefinitionId as the object ID.`,
    params: [
      {
        name: 'object_ids',
        type: 'array',
        required: true,
        description: `Array of unique object IDs to tag. For journeys, use each journey's OriginalDefinitionId rather than its VersionId.`,
      },
      {
        name: 'object_type_name',
        type: 'string',
        required: true,
        description: `The type of object being tagged.`,
      },
      {
        name: 'tag_names',
        type: 'array',
        required: true,
        description: `Array of tag names to assign to the given objects. Tag names that don't already exist are created automatically. Journey tags are limited to 128 characters.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_tag_delete',
    description: `Remove tag-to-object associations in Salesforce Marketing Cloud, using the Objects Tagging REST API's delete-associations action (POST /hub/v1/objects/{objectTypeName}/tags/delete). For each combination of the supplied object IDs and tag names, the association is removed only if it currently exists; the tag definitions themselves are not deleted, only their links to the specified objects. This action is irreversible for the removed associations.`,
    params: [
      {
        name: 'object_ids',
        type: 'array',
        required: true,
        description: `Array of unique object IDs whose tag associations should be removed. For journeys, use each journey's OriginalDefinitionId rather than its VersionId.`,
      },
      {
        name: 'object_type_name',
        type: 'string',
        required: true,
        description: `The type of object the tags are being removed from.`,
      },
      {
        name: 'tag_names',
        type: 'array',
        required: true,
        description: `Array of tag names whose association with the given object IDs should be removed. Only associations that currently exist are deleted; the underlying tag definitions are not deleted.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_tags_list',
    description: `List all tags (and, optionally, their nested/child tags) owned by the requesting client in Salesforce Marketing Cloud, using the Nested Tags REST API (GET /hub/v1/nestedtags). Each returned tag includes its ID, name, description, parent tag ID (if nested), and last modified date. Use this to discover existing tag names before associating them with objects (e.g. campaigns, journeys, media) via the Create Tag Associations tool. Salesforce's documentation describes the response body as a JSON array of tag objects, but a live test against a real tenant with zero tags configured for its requesting client returned a null body instead of an empty array. Treat a null (or otherwise non-array) response as equivalent to zero tags, not as an error.`,
    params: [
      {
        name: 'depth',
        type: 'integer',
        required: false,
        description: `Number of nested tag levels to include below each top-level tag in the response. 0 returns only top-level tags with no nested children expanded.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_transactional_email_definition_create',
    description: `Create a Transactional Messaging email send definition in Salesforce Marketing Cloud, via POST /messaging/v1/email/definitions. A send definition binds a unique definitionKey to a Content Builder email asset (referenced by its customerKey) plus subscription and delivery-option settings; once created, use the Send Transactional Email tool with this definitionKey to send. On success returns 201 Created with the definition's requestId, definitionKey, definitionId, and echoed configuration. Example: definitionKey 'order_confirmation_transactional', name 'Order Confirmation - Transactional', contentCustomerKey 'TXN_OrderConfirmation_v2' (the customerKey of an existing Content Builder email asset).`,
    params: [
      {
        name: 'contentCustomerKey',
        type: 'string',
        required: true,
        description: `The customerKey (external key) of an existing Content Builder email asset that this send definition will send. The asset must already exist in Content Builder.`,
      },
      {
        name: 'definitionKey',
        type: 'string',
        required: true,
        description: `A unique key you choose to identify this send definition, used afterward to send messages and to get/update/delete the definition. Must be unique within your Marketing Cloud account.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `A unique, human-readable name for this send definition, shown in Email Studio / Marketing Cloud UI.`,
      },
      {
        name: 'autoAddSubscriber',
        type: 'boolean',
        required: false,
        description: `Whether to automatically add the recipient's contactKey to Marketing Cloud as a subscriber if they don't already exist. Must be true if updateSubscriber is true. Defaults to true.`,
      },
      {
        name: 'bccEmails',
        type: 'array',
        required: false,
        description: `Optional list of email addresses to BCC on every send through this definition.`,
      },
      {
        name: 'ccEmails',
        type: 'array',
        required: false,
        description: `Optional list of email addresses to CC on every send through this definition.`,
      },
      {
        name: 'classification',
        type: 'string',
        required: false,
        description: `The Email Studio sending classification (delivery profile / sender profile grouping) this definition should send under, e.g. 'Default Transactional'. Classifications are configured per-account in Email Studio Administration; leave blank to use the account's default transactional classification.`,
      },
      {
        name: 'dataExtensionKey',
        type: 'string',
        required: false,
        description: `Optional customer key of a data extension to log every send/status event from this definition to, for auditing and troubleshooting.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional free-text description of what this send definition is used for.`,
      },
      {
        name: 'listName',
        type: 'string',
        required: false,
        description: `Optional name of a publication/subscriber list that recipients should be associated with when auto-added as subscribers.`,
      },
      {
        name: 'trackLinks',
        type: 'boolean',
        required: false,
        description: `Whether links in the sent email should be click-tracked by Marketing Cloud. Defaults to true.`,
      },
      {
        name: 'updateSubscriber',
        type: 'boolean',
        required: false,
        description: `Whether to update the subscriber's data in Marketing Cloud with each send's attributes. If true, autoAddSubscriber must also be true — the API rejects the request otherwise. Defaults to true.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_transactional_email_definition_delete',
    description: `Permanently delete a Transactional Messaging email send definition from Salesforce Marketing Cloud by its definition key, via DELETE /messaging/v1/email/definitions/{definitionKey}. This is irreversible — any integration still sending against this definitionKey will start failing immediately. It does not delete the underlying Content Builder email asset the definition referenced. Example definition key: order_confirmation_transactional.`,
    params: [
      {
        name: 'definitionKey',
        type: 'string',
        required: true,
        description: `The unique definitionKey (external key) of the transactional email send definition to permanently delete, e.g. order_confirmation_transactional.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_transactional_email_definition_get',
    description: `Retrieve a Transactional Messaging email send definition from Salesforce Marketing Cloud by its definition key, via GET /messaging/v1/email/definitions/{definitionKey}. Returns the definition's configuration: name, description, classification, the Content Builder email asset it sends (content.customerKey), its subscriptions settings (list, data extension, autoAddSubscriber, updateSubscriber), and send options (trackLinks, cc, bcc). Use this to inspect a transactional email definition's configuration before sending through it or before updating it. Example definition key: order_confirmation_transactional.`,
    params: [
      {
        name: 'definitionKey',
        type: 'string',
        required: true,
        description: `The unique definitionKey (external key) of the transactional email send definition to retrieve, e.g. order_confirmation_transactional. This is the key assigned when the definition was created.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_transactional_email_definition_list',
    description: `Get a paginated list of every Transactional Messaging email send definition in the account, via GET /messaging/v1/email/definitions -- the collection form of the Get Transactional Email Definition tool (GET /messaging/v1/email/definitions/{definitionKey}). Each entry is expected to carry the same kind of configuration as the single-definition get: name, description, classification, the Content Builder email asset it sends, subscription settings, and send options. Use this to enumerate all email send definitions before looking up or updating a specific one by key. Confidence note: this endpoint's existence was confirmed via a Salesforce documentation search-index page title, but its exact response shape and pagination parameter names were not independently verified (no live call was made during authoring). The optional page and page_size inputs below are modeled on the pagination style used elsewhere in this Messaging API family as a best-effort default -- if Salesforce's real parameter names differ, drop or adjust them once you see an actual response.`,
    params: [
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number of results to return, for accounts with many email send definitions. Starts at 1. Best-effort parameter name -- not independently confirmed against a live response.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of email send definitions to return per page. Best-effort parameter name -- not independently confirmed against a live response.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_transactional_email_definition_queue_get',
    description: `Get queue metrics for a Transactional Messaging email send definition, via GET /messaging/v1/email/definitions/{definitionKey}/queue. Intended to report how many records are currently waiting to be processed for this definition and how long the oldest unprocessed record has been sitting in the queue, so you can spot an email send definition that is backed up before it causes delivery delays -- the email equivalent of the Get Transactional SMS Definition Queue tool. Confidence note: this endpoint's existence was confirmed via a Salesforce documentation search-index page title; the exact field names in the response were not independently verified (no live call was made during authoring), so treat the returned payload's shape as approximate until you've seen a real response. Example definition key: order_confirmation_transactional.`,
    params: [
      {
        name: 'definitionKey',
        type: 'string',
        required: true,
        description: `The unique definitionKey (external key) of the transactional email send definition whose queue you want to inspect, e.g. order_confirmation_transactional. This is the key assigned when the definition was created.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_transactional_email_definition_update',
    description: `Update an existing Transactional Messaging email send definition in Salesforce Marketing Cloud by its definition key, via PATCH /messaging/v1/email/definitions/{definitionKey}. Only the fields you provide are included in the update request; fields left blank are omitted from the request body rather than cleared. Use this to change the definition's name, description, sending classification, which Content Builder email asset it sends, its subscription behavior, or its delivery options (link tracking, cc/bcc). Example: definitionKey 'order_confirmation_transactional', trackLinks true.`,
    params: [
      {
        name: 'definitionKey',
        type: 'string',
        required: true,
        description: `The unique definitionKey (external key) of the transactional email send definition to update, e.g. order_confirmation_transactional.`,
      },
      {
        name: 'autoAddSubscriber',
        type: 'boolean',
        required: false,
        description: `Whether to automatically add the recipient's contactKey as a subscriber if they don't already exist. Must be true if updateSubscriber is true. Leave blank to keep the current setting.`,
      },
      {
        name: 'bccEmails',
        type: 'array',
        required: false,
        description: `Replacement list of email addresses to BCC on every send through this definition. Leave blank to keep the current setting.`,
      },
      {
        name: 'ccEmails',
        type: 'array',
        required: false,
        description: `Replacement list of email addresses to CC on every send through this definition. Leave blank to keep the current setting.`,
      },
      {
        name: 'classification',
        type: 'string',
        required: false,
        description: `The Email Studio sending classification this definition should send under. Leave blank to keep the current setting.`,
      },
      {
        name: 'contentCustomerKey',
        type: 'string',
        required: false,
        description: `The customerKey of a Content Builder email asset to switch this definition to send. Leave blank to keep sending the currently configured asset.`,
      },
      {
        name: 'dataExtensionKey',
        type: 'string',
        required: false,
        description: `Customer key of a data extension to log send/status events to. Leave blank to keep the current setting.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Replacement free-text description for this send definition. Leave blank to keep the current setting.`,
      },
      {
        name: 'listName',
        type: 'string',
        required: false,
        description: `Name of a publication/subscriber list newly auto-added subscribers should be placed on. Leave blank to keep the current setting.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Replacement human-readable name for this send definition. Leave blank to keep the current setting.`,
      },
      {
        name: 'trackLinks',
        type: 'boolean',
        required: false,
        description: `Whether links in the sent email should be click-tracked. Leave blank to keep the current setting.`,
      },
      {
        name: 'updateSubscriber',
        type: 'boolean',
        required: false,
        description: `Whether to update subscriber data with each send's attributes. If true, autoAddSubscriber must also be true. Leave blank to keep the current setting.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_transactional_email_messages_not_sent_get',
    description: `Get a paginated list of Transactional Messaging email messages that were NOT sent to their recipients, oldest to newest, via GET /messaging/v1/email/messages/?type=notSent. This is the email equivalent of the SMS 'messages not sent' list tool, and the bulk counterpart to the Get Transactional Email Send Status tool (which looks up one message by messageKey) -- use it to sweep for failed sends across a definition instead of checking messages one at a time. Each entry is expected to identify the message and describe why it wasn't sent (an event/category type, a timestamp, and details such as the failing status code and message). Confidence note: this endpoint's existence was confirmed via a Salesforce documentation search-index page title; the exact response shape and pagination parameter names were not independently verified (no live call was made during authoring). The optional page and page_size inputs below are a best-effort guess at pagination based on similar list endpoints in this API family -- adjust them once you've seen a real response.`,
    params: [
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number of results to return. Starts at 1. Best-effort parameter name -- not independently confirmed against a live response.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of not-sent messages to return per page. Best-effort parameter name -- not independently confirmed against a live response.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_transactional_email_send',
    description: `Send a transactional email to a single recipient in Salesforce Marketing Cloud via a previously created send definition, via POST /messaging/v1/email/messages/{messageKey}. You supply the messageKey — a unique ID you choose for this specific message — as the path segment; the same value is used later with the Get Transactional Email Definition Send Status flow to check delivery. Personalization values placed in the 'attributes' object are substituted into the definition's content wherever it references those field names (e.g. AMPscript/personalization strings). Returns 202 Accepted with a requestId; the message is queued and processed asynchronously — actual delivery status must be checked separately. Example: messageKey 'order-42981-email-01', definitionKey 'order_confirmation_transactional', contactKey 'CUST-98765', to 'customer@example.com'.`,
    params: [
      {
        name: 'contactKey',
        type: 'string',
        required: true,
        description: `The unique subscriber/contact key identifying the recipient in Marketing Cloud. If the definition's autoAddSubscriber is enabled and this contactKey doesn't already exist, a new subscriber is created.`,
      },
      {
        name: 'definitionKey',
        type: 'string',
        required: true,
        description: `The definitionKey of the transactional email send definition to send through, created previously with the Create Transactional Email Definition tool.`,
      },
      {
        name: 'messageKey',
        type: 'string',
        required: true,
        description: `A unique identifier you choose for this specific message send, used as the URL path segment. Must be unique among the keys your business unit has used recently; reusing a value can return the status of the earlier send instead of creating a new one.`,
      },
      {
        name: 'to',
        type: 'string',
        required: true,
        description: `The recipient's email address that the message is sent to.`,
      },
      {
        name: 'attributes',
        type: 'object',
        required: false,
        description: `Optional key-value object of personalization attributes substituted into the send definition's email content for this recipient. Example: {"FirstName": "Sarah", "OrderNumber": "ORD-2025-44210"}.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_transactional_email_send_status_get',
    description: `Get the send status of a transactional email message in Salesforce Marketing Cloud by its messageKey, via GET /messaging/v1/email/messages/{messageKey}. This is the email equivalent of the Get Transactional SMS Send Status tool -- the messageKey is the caller-supplied unique identifier that was provided as the path segment when the message was sent with the Send Transactional Email tool. Expected to return an event/category type (e.g. an equivalent of TransactionalSendEvents.EmailSent, EmailQueued, or EmailNotSent for SMS), a timestamp, and an info object identifying the message and recipient, with a failure code/message included when the send did not succeed. Confidence note: this endpoint's existence was confirmed via a Salesforce documentation search-index page title, by direct analogy to the confirmed SMS status-get endpoint at the same API path shape; the exact response field names were not independently verified (no live call was made during authoring). Example messageKey: order-42981-email-01.`,
    params: [
      {
        name: 'messageKey',
        type: 'string',
        required: true,
        description: `The unique messageKey that was used as the path segment when the transactional email was sent (see the Send Transactional Email tool). Must match exactly, e.g. order-42981-email-01.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_transactional_journey_pause',
    description: `Pause a Transactional Messaging email send definition in Salesforce Marketing Cloud, via PATCH /messaging/v1/email/definitions/{definitionKey} with status set to Inactive. The standard Journey Pause tool explicitly does not apply to transactional (single-send) journeys -- per Salesforce's own documentation ('Pause and Resume a Transactional Send Journey'), the confirmed mechanism for pausing one is updating its underlying Transactional Messaging email definition's status property instead. While paused, sends against this definitionKey are rejected until it's resumed (Active).`,
    params: [
      {
        name: 'definitionKey',
        type: 'string',
        required: true,
        description: `The unique definitionKey (external key) of the transactional email send definition to pause, e.g. order_confirmation_transactional.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_transactional_journey_resume',
    description: `Resume a paused Transactional Messaging email send definition in Salesforce Marketing Cloud, via PATCH /messaging/v1/email/definitions/{definitionKey} with status set to Active. The standard Journey Resume tool explicitly does not apply to transactional (single-send) journeys -- per Salesforce's own documentation ('Pause and Resume a Transactional Send Journey'), the confirmed mechanism for resuming one is updating its underlying Transactional Messaging email definition's status property instead.`,
    params: [
      {
        name: 'definitionKey',
        type: 'string',
        required: true,
        description: `The unique definitionKey (external key) of the transactional email send definition to resume, e.g. order_confirmation_transactional.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_transactional_ott_definition_create',
    description: `Create a new OTT (over-the-top messaging: Facebook Messenger or LINE) send definition in Salesforce Marketing Cloud using the Transactional Messaging - OTT API (POST /messaging/v1/ott/definitions). A send definition is a reusable template pairing message content with a sending channel/account, later referenced by its definition key when sending OTT messages. Provide a unique definition key, a name, the sending network and sender ID, and the message content (a contents array of text/image/audio/video/native items). Example key: OTT_OrderUpdates.`,
    params: [
      {
        name: 'content',
        type: 'object',
        required: true,
        description: `The message content for this definition, as a JSON object with a 'contents' array (maximum 1 item). Each item has a 'type' (text, image, audio, video, or native) and the matching field: 'text' for text messages, or 'url' for image/audio/video. Example: {"contents": [{"type": "text", "text": "Your order has shipped!"}]}.`,
      },
      {
        name: 'definition_key',
        type: 'string',
        required: true,
        description: `A unique customer key (external key) to assign to this new OTT send definition, e.g. OTT_OrderUpdates.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The display name of the OTT send definition.`,
      },
      {
        name: 'sender_id',
        type: 'string',
        required: true,
        description: `The sender/account ID for the OTT network, e.g. your Facebook Page ID or LINE channel ID configured for OTT sending in Marketing Cloud.`,
      },
      {
        name: 'sender_type',
        type: 'string',
        required: true,
        description: `The OTT network this definition sends through. One of: messenger (Facebook Messenger), line (LINE).`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Free-text description of the OTT send definition's purpose.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Initial status of the OTT send definition. One of: active, inactive.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_transactional_ott_definition_delete',
    description: `Permanently delete a Transactional Messaging OTT (Facebook Messenger / LINE) send definition from Salesforce Marketing Cloud by its definition key, via DELETE /messaging/v1/ott/definitions/{definitionKey}. This is irreversible — any integration still sending against this definitionKey will start failing immediately. It does not delete the underlying Content Builder OTT content asset the definition referenced. Example definition key: order_shipped_messenger.`,
    params: [
      {
        name: 'definitionKey',
        type: 'string',
        required: true,
        description: `The unique definitionKey (external key) of the Transactional Messaging OTT send definition to permanently delete, e.g. order_shipped_messenger.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_transactional_ott_definition_get',
    description: `Retrieve an OTT (over-the-top messaging: Facebook Messenger or LINE) send definition from Salesforce Marketing Cloud by its definition key, using the Transactional Messaging - OTT API (GET /messaging/v1/ott/definitions/{definitionKey}). Returns the definition's metadata (name, description, status), its configured message content, and its sending network/account configuration. Use this to inspect an OTT definition before sending or updating it. Example key: OTT_OrderUpdates.`,
    params: [
      {
        name: 'definition_key',
        type: 'string',
        required: true,
        description: `The customer key (external key) of the OTT send definition to retrieve, e.g. OTT_OrderUpdates.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_transactional_ott_definition_update',
    description: `Update an existing Transactional Messaging OTT (Facebook Messenger / LINE) send definition in Salesforce Marketing Cloud by its definition key, via PATCH /messaging/v1/ott/definitions/{definitionKey}. Only include the fields you want to change — any field left blank keeps its current value on the definition. You can update the display name, description, sending classification, the referenced Content Builder OTT content asset (by customerKey), and the definition's subscriptions and options objects (channel-specific settings such as the bound OTT app/page and delivery options, e.g. URL shortener behavior). The definitionKey itself and the OTT channel type cannot be changed after creation — delete and recreate the definition instead. Example definition key: order_shipped_messenger.`,
    params: [
      {
        name: 'definitionKey',
        type: 'string',
        required: true,
        description: `The unique definitionKey (external key) of the Transactional Messaging OTT send definition to update, e.g. order_shipped_messenger. This is the key assigned when the definition was created and cannot itself be changed.`,
      },
      {
        name: 'classification',
        type: 'string',
        required: false,
        description: `Updated sending classification (delivery profile grouping) this definition should send under. Leave blank to keep the current classification.`,
      },
      {
        name: 'contentCustomerKey',
        type: 'string',
        required: false,
        description: `Updated customerKey (external key) of an existing Content Builder OTT content asset (Messenger/LINE template) this send definition should use. Leave blank to keep the currently referenced asset.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Updated free-text description of what this send definition is used for. Leave blank to keep the current description.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Updated human-readable name for this send definition, shown in the Marketing Cloud UI. Leave blank to keep the current name.`,
      },
      {
        name: 'options',
        type: 'object',
        required: false,
        description: `Updated options object controlling delivery behavior for this definition (e.g. link/URL shortener settings). Passed through as-is to Salesforce's definitionUpdateRequest 'options' object — see the help link for the exact fields Salesforce documents for the OTT channel. Leave blank to keep the current options.`,
      },
      {
        name: 'subscriptions',
        type: 'object',
        required: false,
        description: `Updated subscriptions object describing the OTT channel binding for this definition (e.g. which Messenger page or LINE channel it sends through, and subscriber auto-add behavior). Passed through as-is to Salesforce's definitionUpdateRequest 'subscriptions' object — see the help link for the exact fields Salesforce documents for the OTT channel. Leave blank to keep the current subscriptions configuration.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_transactional_ott_send',
    description: `Send an OTT (over-the-top messaging: Facebook Messenger or LINE) message to a recipient using an existing OTT send definition, via Salesforce Marketing Cloud's Transactional Messaging - OTT API (POST /messaging/v1/ott/messages/{messageKey}). Reference the send definition by its definitionKey, identify the recipient with either their OTT ID (ottId, the platform-specific user identifier such as a Messenger PSID) or a Marketing Cloud userReference (if both are given, userReference is used), and optionally override the message content. The messageKey you supply is a client-generated tracking identifier for this specific send (not the definition key). NOTE: Salesforce's documentation for this exact endpoint path could not be fully machine-verified at generation time (the reference page uses client-side rendering); this path and shape were inferred from the parallel, fully-verified Transactional Messaging - SMS/Email send pattern (POST /messaging/v1/<channel>/messages/{messageKey}) plus the confirmed OTT message content schema from Marketing Cloud's related Chat Messaging OTT send API. Verify against current Salesforce docs if you see errors.`,
    params: [
      {
        name: 'definition_key',
        type: 'string',
        required: true,
        description: `The customer key (external key) of the OTT send definition to use for this send, e.g. OTT_OrderUpdates.`,
      },
      {
        name: 'message_key',
        type: 'string',
        required: true,
        description: `A unique, client-generated identifier for tracking this specific send attempt, up to 100 characters. Must be unique per business unit within a rolling window. Not the same as the definition key.`,
      },
      {
        name: 'content_override',
        type: 'object',
        required: false,
        description: `Optional JSON object to override the send definition's default message content for this send only. Shape: {"contents": [{"type": "text", "text": "Your order has shipped!"}]} (maximum 1 item in contents).`,
      },
      {
        name: 'ott_id',
        type: 'string',
        required: false,
        description: `The platform-specific OTT user identifier for the recipient, e.g. a Facebook Messenger PSID or LINE user ID. Provide this or user_reference (if both are given, user_reference is used).`,
      },
      {
        name: 'user_reference',
        type: 'string',
        required: false,
        description: `A Marketing Cloud user reference identifying the recipient (e.g. a linked contact/subscriber reference), used instead of a raw platform ott_id. If both ott_id and user_reference are provided, user_reference is used.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_transactional_push_definition_create',
    description: `Create a new transactional push notification send definition in Salesforce Marketing Cloud using the Transactional Messaging - Push API (POST /messaging/v1/push/definitions). A send definition is a reusable template that pairs a notification payload (content) with delivery configuration; once created, it is referenced by its definition key when sending transactional push notifications to MobilePush-registered contacts. Provide a unique definition key, a name, and the notification content (typically a title/body alert, and optionally sound, badge count, a deep-link URL, and custom key/value data). Example key: PUSH_OrderShipped.`,
    params: [
      {
        name: 'content',
        type: 'object',
        required: true,
        description: `The push notification payload for this definition, as a JSON object. Typical shape: {"alert": {"title": "Order Shipped", "body": "Your order is on its way!"}, "sound": "default", "badgeCount": 1, "url": "https://example.com/orders/123", "customKeys": {"orderId": "123"}}. Exact supported keys depend on your Marketing Cloud MobilePush app configuration.`,
      },
      {
        name: 'definition_key',
        type: 'string',
        required: true,
        description: `A unique customer key (external key) to assign to this new push send definition, e.g. PUSH_OrderShipped.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The display name of the push send definition.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Free-text description of the push send definition's purpose.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Initial status of the push send definition. One of: active, inactive.`,
      },
      {
        name: 'subscriptions',
        type: 'object',
        required: false,
        description: `Optional JSON object specifying which MobilePush app(s)/channels this definition targets, if your Marketing Cloud account has more than one MobilePush app configured. Leave blank to use the account default.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_transactional_push_definition_delete',
    description: `Permanently delete a transactional push notification send definition in Salesforce Marketing Cloud, identified by its definition key, using the Transactional Messaging - Push API (DELETE /messaging/v1/push/definitions/{definitionKey}). This is irreversible: the deleted definition is archived internally and cannot be restored, though its key can typically be reused for a new definition afterward. Example key: PUSH_OrderShipped.`,
    params: [
      {
        name: 'definition_key',
        type: 'string',
        required: true,
        description: `The customer key (external key) of the transactional push send definition to delete, e.g. PUSH_OrderShipped.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_transactional_push_definition_get',
    description: `Retrieve a transactional push notification send definition from Salesforce Marketing Cloud by its definition key, using the Transactional Messaging - Push API (GET /messaging/v1/push/definitions/{definitionKey}). Returns the definition's metadata (name, description, status) and its configured notification content and subscription/app targeting. Use this to inspect a push definition's current configuration before sending or updating it. KNOWN SALESFORCE BEHAVIOR: the path and method here are correct and match the identical /messaging/v1/<channel>/definitions/{key} pattern used by the sibling Get Transactional Email/SMS Definition endpoints, but for a nonexistent definition_key this particular Push endpoint has been observed to return a raw HTTP 500 (body like {"errorcode":0,"message":"Internal Server Error"}) instead of the structured not-found error (MCMS_UTM_Runtime_ObjectNotFound-style) that the Email/SMS definition-get endpoints return for the same scenario. Treat a 500 from this call as 'definition_key probably doesn't exist' and re-verify the key (e.g. via the Create/Update response or Marketing Cloud UI) rather than assuming an outage. Example key: PUSH_OrderShipped.`,
    params: [
      {
        name: 'definition_key',
        type: 'string',
        required: true,
        description: `The customer key (external key) of the transactional push send definition to retrieve, e.g. PUSH_OrderShipped.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_transactional_push_definition_update',
    description: `Update an existing transactional push notification send definition in Salesforce Marketing Cloud, identified by its definition key, using the Transactional Messaging - Push API (PATCH /messaging/v1/push/definitions/{definitionKey}). Only the fields you provide are changed; update the notification content, status, or app/channel targeting as needed. Example key: PUSH_OrderShipped.`,
    params: [
      {
        name: 'definition_key',
        type: 'string',
        required: true,
        description: `The customer key (external key) of the transactional push send definition to update, e.g. PUSH_OrderShipped.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The display name of the push send definition.`,
      },
      {
        name: 'content',
        type: 'object',
        required: false,
        description: `Updated push notification payload for this definition, as a JSON object, e.g. {"alert": {"title": "Order Shipped", "body": "Your order is on its way!"}, "sound": "default"}. Leave blank to keep the existing content.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Updated free-text description of the push send definition's purpose.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Status to set on the push send definition. One of: active, inactive.`,
      },
      {
        name: 'subscriptions',
        type: 'object',
        required: false,
        description: `Optional JSON object specifying which MobilePush app(s)/channels this definition targets. Leave blank to keep the existing configuration.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_transactional_push_send',
    description: `Send a transactional push notification to a recipient using an existing push send definition, via Salesforce Marketing Cloud's Transactional Messaging - Push API (POST /messaging/v1/push/messages/{messageKey}). Identify the recipient by their Marketing Cloud contact key (the subscriber must already be registered for push in a MobilePush app), reference the send definition by its definitionKey, and optionally override the notification content or pass per-recipient personalization attributes. The messageKey you supply is a client-generated tracking identifier for this specific send (must be unique per business unit within a rolling window, not the definition key). NOTE: Salesforce's newer documentation for this endpoint could not be fully machine-verified at generation time (the reference page uses client-side rendering); this path and shape were inferred from the parallel, fully-verified Transactional Messaging - SMS/Email send pattern (POST /messaging/v1/<channel>/messages/{messageKey}). Verify against the current Salesforce docs if you see errors.`,
    params: [
      {
        name: 'contact_key',
        type: 'string',
        required: true,
        description: `The Marketing Cloud contact key of the recipient. The contact must already be subscribed/registered for push notifications through a MobilePush app.`,
      },
      {
        name: 'definition_key',
        type: 'string',
        required: true,
        description: `The customer key (external key) of the push send definition to use for this send, e.g. PUSH_OrderShipped.`,
      },
      {
        name: 'message_key',
        type: 'string',
        required: true,
        description: `A unique, client-generated identifier for tracking this specific send attempt, up to 100 characters. Must be unique per business unit within roughly a 2-day window. Not the same as the definition key.`,
      },
      {
        name: 'attributes',
        type: 'object',
        required: false,
        description: `Optional JSON object of personalization attribute name/value pairs available to the send definition's content for this specific recipient.`,
      },
      {
        name: 'content_override',
        type: 'object',
        required: false,
        description: `Optional JSON object to override the send definition's default notification content for this send only, e.g. {"alert": {"title": "Order Shipped", "body": "Your order is on its way!"}}.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_transactional_sms_definition_create',
    description: `Create a Transactional Messaging SMS send definition in Salesforce Marketing Cloud, via POST /messaging/v1/sms/definitions. A send definition binds a unique definitionKey to message content, the short/long code and keyword it sends from, and subscription settings; once created, use the Send Transactional SMS tool with this definitionKey to send. On success returns 201 Created with requestId, definitionKey, definitionId, and echoed configuration. Note: if updateSubscriber is true, autoAddSubscriber must also be true, or the API returns an error. Example: definitionKey 'order_shipped_sms', name 'Order Shipped - Transactional SMS', message 'Your order {{OrderNumber}} has shipped!', shortCode '12345', keyword 'SHIPPED'.`,
    params: [
      {
        name: 'definitionKey',
        type: 'string',
        required: true,
        description: `A unique key you choose to identify this send definition, used afterward to send messages and to get/update/delete the definition. Must be unique within your Marketing Cloud account.`,
      },
      {
        name: 'keyword',
        type: 'string',
        required: true,
        description: `The keyword associated with this send definition on the short/long code, used for message tracking and opt-out handling.`,
      },
      {
        name: 'message',
        type: 'string',
        required: true,
        description: `The SMS message text to send. Supports AMPscript personalization strings that are resolved at send time or overridden per-send.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `A unique, human-readable name for this send definition, shown in the Marketing Cloud UI.`,
      },
      {
        name: 'shortCode',
        type: 'string',
        required: true,
        description: `The short code (with countryCode) or a long code / full international phone number (numeric country code prefixed directly on the number, no countryCode needed) that this definition sends from.`,
      },
      {
        name: 'autoAddSubscriber',
        type: 'boolean',
        required: false,
        description: `Whether to automatically add the recipient's contactKey as a subscriber if they don't already exist. Must be true if updateSubscriber is true. Defaults to true.`,
      },
      {
        name: 'countryCode',
        type: 'string',
        required: false,
        description: `Alphabetic country code for the short code (used only when shortCode refers to a short code, not a long code/international number).`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional free-text description of what this send definition is used for.`,
      },
      {
        name: 'isLinkShorteningEnabled',
        type: 'boolean',
        required: false,
        description: `Optional. Enable Marketing Cloud's built-in URL shortener for links in the message.`,
      },
      {
        name: 'isSubscriberTrackingEnabled',
        type: 'boolean',
        required: false,
        description: `Optional. When link shortening is enabled, also track per-subscriber clicks on shortened links.`,
      },
      {
        name: 'smsMessageRegulatoryAuthorityTemplateId',
        type: 'string',
        required: false,
        description: `Optional DLT (Distributed Ledger Technology) regulatory template ID required in some countries (e.g. India TRAI) for pre-registered SMS templates.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Whether the definition is active and available to send through immediately after creation. One of: active, inactive. Defaults to active.`,
      },
      {
        name: 'updateSubscriber',
        type: 'boolean',
        required: false,
        description: `Whether to update the subscriber's data with each send's attributes. If true, autoAddSubscriber must also be true — the API rejects the request otherwise. Defaults to true.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_transactional_sms_definition_delete',
    description: `Permanently delete a transactional SMS send definition in Salesforce Marketing Cloud, identified by its definition key, using the Transactional Messaging - SMS API (DELETE /messaging/v1/sms/definitions/{definitionKey}). This is irreversible: the deleted definition is archived internally and cannot be restored, though its key can be reused for a new definition afterward since the archived data is copied to a new internal identifier. Example key: SMS_OrderConfirmation.`,
    params: [
      {
        name: 'definition_key',
        type: 'string',
        required: true,
        description: `The unique customer key (external key) of the transactional SMS send definition to delete, e.g. SMS_OrderConfirmation.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_transactional_sms_definition_get',
    description: `Retrieve a Transactional Messaging SMS send definition from Salesforce Marketing Cloud by its definition key, via GET /messaging/v1/sms/definitions/{definitionKey}. Returns the definition's configuration: name, description, status (active/inactive), message content, subscriptions settings (shortCode, countryCode, keyword, autoAddSubscriber, updateSubscriber), and options (URL shortener settings, regulatory template id). Use this to inspect a transactional SMS definition's configuration before sending through it or before updating it. Example definition key: order_shipped_sms.`,
    params: [
      {
        name: 'definitionKey',
        type: 'string',
        required: true,
        description: `The unique definitionKey (external key) of the transactional SMS send definition to retrieve, e.g. order_shipped_sms. This is the key assigned when the definition was created.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_transactional_sms_definition_list',
    description: `Get a paginated list of every Transactional Messaging SMS send definition in the account, via GET /messaging/v1/sms/definitions -- the collection form of the Get Transactional SMS Definition tool (GET /messaging/v1/sms/definitions/{definitionKey}). Each entry is expected to carry the same kind of configuration as the single-definition get: name, description, active/inactive status, message content, and subscription settings. Use this to enumerate all SMS send definitions before looking up or updating a specific one by key. Confidence note: this endpoint's existence was confirmed via a Salesforce documentation search-index page title, but its exact response shape and pagination parameter names were not independently verified (no live call was made during authoring). The optional page and page_size inputs below are modeled on the pagination style used elsewhere in this Messaging API family (e.g. the notSent message list endpoints) as a best-effort default -- if Salesforce's real parameter names differ, drop or adjust them once you see an actual response.`,
    params: [
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number of results to return, for accounts with many SMS send definitions. Starts at 1. Best-effort parameter name -- not independently confirmed against a live response.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of SMS send definitions to return per page. Best-effort parameter name -- not independently confirmed against a live response.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_transactional_sms_definition_queue_get',
    description: `Get queue metrics for a Transactional Messaging SMS send definition, via GET /messaging/v1/sms/definitions/{definitionKey}/queue. Intended to report how many records are currently waiting to be processed for this definition and how long the oldest unprocessed record has been sitting in the queue, so you can spot a send definition that is backed up before it causes delivery delays. Confidence note: this endpoint's existence was confirmed via a Salesforce documentation search-index page title; the exact field names in the response were not independently verified (no live call was made during authoring), so treat the returned payload's shape as approximate until you've seen a real response. Example definition key: order_shipped_sms.`,
    params: [
      {
        name: 'definitionKey',
        type: 'string',
        required: true,
        description: `The unique definitionKey (external key) of the transactional SMS send definition whose queue you want to inspect, e.g. order_shipped_sms. This is the key assigned when the definition was created.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_transactional_sms_definition_update',
    description: `Update an existing transactional SMS send definition in Salesforce Marketing Cloud, identified by its definition key. Uses the Transactional Messaging - SMS API (PATCH /messaging/v1/sms/definitions/{definitionKey}). Only the fields you provide are changed; provide the SMS body text, short code/keyword subscription settings, and link-shortening options as needed. Changes can take up to two minutes to apply to outbound messages. Example key: SMS_OrderConfirmation.`,
    params: [
      {
        name: 'definition_key',
        type: 'string',
        required: true,
        description: `The unique customer key (external key) of the transactional SMS send definition to update, e.g. SMS_OrderConfirmation.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The display name of the SMS send definition.`,
      },
      {
        name: 'auto_add_subscriber',
        type: 'boolean',
        required: false,
        description: `Whether a contact who replies with the keyword should be automatically added as a subscriber to the short code/keyword combination.`,
      },
      {
        name: 'country_code',
        type: 'string',
        required: false,
        description: `Two-letter country code associated with the short/long code used for this SMS definition, e.g. US.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Updated free-text description of the SMS send definition's purpose.`,
      },
      {
        name: 'is_link_shortening_enabled',
        type: 'boolean',
        required: false,
        description: `Whether links in the SMS message body are automatically shortened.`,
      },
      {
        name: 'is_subscriber_tracking_enabled',
        type: 'boolean',
        required: false,
        description: `Whether click tracking is enabled for shortened links sent to subscribers.`,
      },
      {
        name: 'keyword',
        type: 'string',
        required: false,
        description: `The SMS keyword associated with this definition's short code subscription, e.g. CONFIRM.`,
      },
      {
        name: 'message',
        type: 'string',
        required: false,
        description: `Updated text content of the SMS message body, e.g. 'Your order %%OrderId%% has shipped!'. Supports AMPscript personalization strings (%%FieldName%%).`,
      },
      {
        name: 'regulatory_authority_template_id',
        type: 'string',
        required: false,
        description: `Regulatory authority (e.g. DLT, for India-based senders) template ID required by local telecom regulations for this message content.`,
      },
      {
        name: 'short_code',
        type: 'string',
        required: false,
        description: `The short code or long code number this SMS definition sends from, e.g. 12345.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Status to set on the SMS send definition. One of: active, inactive.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_transactional_sms_messages_not_sent_get',
    description: `Get a paginated list of Transactional Messaging SMS messages that were NOT sent to their recipients, oldest to newest, via GET /messaging/v1/sms/messages/?type=notSent. This is the bulk/list counterpart to the Get Transactional SMS Send Status tool (which looks up one message by messageKey) -- use it to sweep for failed sends across a definition instead of checking messages one at a time. Each entry is expected to be similar in shape to the single-message status lookup: an eventCategoryType such as TransactionalSendEvents.SMSNotSent, a timestamp, and an info object identifying the message and the failure reason. Confidence note: this endpoint's existence was confirmed via a Salesforce documentation search-index page title; the exact response shape and pagination parameter names were not independently verified (no live call was made during authoring). The optional page and page_size inputs below are a best-effort guess at pagination based on similar list endpoints in this API family -- adjust them once you've seen a real response.`,
    params: [
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number of results to return. Starts at 1. Best-effort parameter name -- not independently confirmed against a live response.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Number of not-sent messages to return per page. Best-effort parameter name -- not independently confirmed against a live response.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_transactional_sms_send',
    description: `Send a transactional SMS to a single recipient in Salesforce Marketing Cloud via a previously created send definition, via POST /messaging/v1/sms/messages/{messageKey}. You supply the messageKey — a unique ID you choose for this specific message — as the path segment; the same value is used later with the Get Transactional SMS Send Status tool to check delivery. Personalization values placed in 'attributes' are substituted into the definition's message content; 'messageOverride' can replace the definition's default message text entirely for this one send. Returns 202 Accepted with a requestId and messageKey. Note: a messageKey must be unique among keys used in your business unit over roughly the last 2 days. Example: messageKey 'order-42981-sms-01', definitionKey 'order_shipped_sms', contactKey 'CUST-98765', to '+14155552671'.`,
    params: [
      {
        name: 'contactKey',
        type: 'string',
        required: true,
        description: `The unique subscriber/contact key identifying the recipient in Marketing Cloud. If the definition's autoAddSubscriber is enabled and this contactKey doesn't already exist, a new subscriber is created.`,
      },
      {
        name: 'definitionKey',
        type: 'string',
        required: true,
        description: `The definitionKey of the transactional SMS send definition to send through, created previously with the Create Transactional SMS Definition tool.`,
      },
      {
        name: 'messageKey',
        type: 'string',
        required: true,
        description: `A unique identifier you choose for this specific message send, used as the URL path segment. Must be unique among the keys your business unit has used over roughly the last 2 days; reusing a value can return the status of the earlier send instead of creating a new one.`,
      },
      {
        name: 'to',
        type: 'string',
        required: true,
        description: `The recipient's mobile phone number, including country code, e.g. +14155552671.`,
      },
      {
        name: 'attributes',
        type: 'object',
        required: false,
        description: `Optional key-value object of personalization attributes substituted into the send definition's message content for this recipient. Example: {"OrderNumber": "ORD-2025-44210"}.`,
      },
      {
        name: 'messageOverride',
        type: 'string',
        required: false,
        description: `Optional replacement for the send definition's default message text, used only for this send.`,
      },
      {
        name: 'resubscribe',
        type: 'boolean',
        required: false,
        description: `Optional. If the recipient had previously opted out of this short/long code and keyword, set to true to resubscribe them as part of this send.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_transactional_sms_send_status_get',
    description: `Get the send status of a transactional SMS message in Salesforce Marketing Cloud by its messageKey, via GET /messaging/v1/sms/messages/{messageKey}. The messageKey is the caller-supplied unique identifier that was provided as the path segment when the message was sent with the Send Transactional SMS tool. This route is rate-limited and intended for infrequent, ad-hoc verification (statuses are retrievable for up to 3 days); for real-time tracking at scale, subscribe to transactional send events via the Event Notification Service instead. Returns eventCategoryType (e.g. TransactionalSendEvents.SMSSent, TransactionalSendEvents.SMSQueued, or TransactionalSendEvents.SMSNotSent), a timestamp, and an info object with messageKey, contactKey, and — if not sent — statusCode/statusMessage describing the failure reason. If more than one message was sent with the same messageKey, the status of the most recently sent message is returned. Example messageKey: order-42981-sms-01.`,
    params: [
      {
        name: 'messageKey',
        type: 'string',
        required: true,
        description: `The unique messageKey that was used as the path segment when the transactional SMS was sent (see the Send Transactional SMS tool). Must match exactly, e.g. order-42981-sms-01.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_workflow_item_transition',
    description: `Transition a workflow item's state in Salesforce Marketing Cloud, using the Approvals Hub REST API (POST /hub/v1/workflowitems/{workflowItemId}/transitions). A workflow item is the underlying state machine behind an approval item (e.g. content pending review); this moves it from one state to another via a transitionId, for example from Draft to Submitted via the 'submit' transition, or from Submitted to Approved via an 'approve' transition. Valid transition IDs are specific to how the workflow's states are configured for your account -- consult the workflow item's current state and available transitions (surfaced via the Get Approval Item tool) rather than assuming a fixed set of names works for every workflow.`,
    params: [
      {
        name: 'transition_id',
        type: 'string',
        required: true,
        description: `The identifier of the transition to apply to the workflow item, e.g. 'submit' to move a workflow item from Draft to Submitted. Valid transition IDs depend on the workflow's configured states and are tenant/workflow-specific -- look them up from the workflow item's current state and available transitions, as returned by the Get Approval Item tool for the approval item backed by this workflow item.`,
      },
      {
        name: 'workflow_item_id',
        type: 'string',
        required: true,
        description: `The unique ID of the workflow item to transition. This is the same identifier used when creating an approval item (workflow_item_id on the Create Approval Item tool), or the workflow item ID embedded in an approval item's details from the Get Approval Item tool.`,
      },
      {
        name: 'override_notification_id',
        type: 'string',
        required: false,
        description: `Optional override notification flag. The only documented value is '9', which forces Marketing Cloud to send workflow notification emails for this transition even if the workflow's normal notification rules would otherwise suppress them. Leave blank for default notification behavior.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_workflow_team_user_create',
    description: `Assign a user to a specific role instance on a workflow item in Salesforce Marketing Cloud, using the Approvals Hub REST API (POST /hub/v1/workflowitems/{workflowItemId}/roles/{workflowRoleInstanceId}). Use this to staff a role (e.g. Approver, Reviewer) on a workflow item's approval process with a specific user, identified by both their user ID and username. Returns the created role-user assignment, including a generated workflowRoleInstanceUserId.`,
    params: [
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the user to assign to this workflow role. This is the Marketing Cloud user ID (not the workflow role instance ID), typically found in Setup > Users or via your account's user management tools.`,
      },
      {
        name: 'user_name',
        type: 'string',
        required: true,
        description: `The username of the user to assign to this workflow role, typically the user's Marketing Cloud login/email address. Must correspond to the same user identified by user_id.`,
      },
      {
        name: 'workflow_item_id',
        type: 'string',
        required: true,
        description: `The unique ID of the workflow item that has the role to assign this user to. Obtain this from the workflow item associated with an approval item (see Create Approval Item / Get Approval Item).`,
      },
      {
        name: 'workflow_role_instance_id',
        type: 'string',
        required: true,
        description: `The unique ID of the specific role instance on the workflow item to assign the user to (e.g. an 'Approver' or 'Reviewer' role instance for this particular workflow item). This is distinct from a workflow team's general role definition ID returned by the List Workflow Teams tool -- it identifies a role slot on this specific workflow item. Salesforce's public reference does not document a dedicated endpoint to look up workflowRoleInstanceId values directly; in practice it is obtained from the workflow item's own detail payload (its roles collection) as surfaced by your Marketing Cloud Approvals configuration.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_workflow_team_user_delete',
    description: `Permanently remove a user's assignment from a specific role instance on a workflow item in Salesforce Marketing Cloud, using the Approvals Hub REST API (DELETE /hub/v1/workflowitems/{workflowItemId}/roles/{workflowRoleInstanceId}/Users/{userId}). This un-staffs the role (e.g. Approver, Reviewer) for this workflow item -- it does not delete the underlying user account or the role definition itself, and it does not affect the user's assignments on other workflow items. Fails with 404 if the role-user assignment isn't currently active.`,
    params: [
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the user to remove from this workflow role. This only removes the user's assignment to the role -- it does not delete the user account itself.`,
      },
      {
        name: 'workflow_item_id',
        type: 'string',
        required: true,
        description: `The unique ID of the workflow item that has the role assignment to remove.`,
      },
      {
        name: 'workflow_role_instance_id',
        type: 'string',
        required: true,
        description: `The unique ID of the role instance on the workflow item that the user is currently assigned to. Use the same value that was supplied when the assignment was created with the Assign User to Workflow Role tool.`,
      },
    ],
  },
  {
    name: 'salesforcemarketingcloud_workflow_teams_list',
    description: `Retrieve active workflow teams from Salesforce Marketing Cloud's Approvals Hub REST API (GET /hub/v1/workflowteams/{objecttype}). Workflow teams are the groups of users that approval items (content pending review, e.g. emails or journeys) can be assigned to. Optionally scope results to a specific workflow object type (e.g. EmailSendDefinition) or leave the default '@all' to return teams for every object type, filter to only the teams the current user belongs to, and include each team's role/user membership in the response. Use this before assigning or reassigning an approval item to a team. Note: Salesforce's own documentation does not describe any restriction or interaction between object_type, assignee, and extra, but live testing observed identical object_type='@all' calls returning a 403 'Insufficient Privileges' in one case and a 400 'No workflow teams foundt type: @all' in another, depending on which other parameters were also supplied — this is undocumented Salesforce-side behavior, not a parameter-combination rule this tool enforces, so treat either error as a sign to retry with a specific object_type or to check the account's Approvals/workflow permissions rather than as a definitive 'no teams exist' result.`,
    params: [
      {
        name: 'assignee',
        type: 'string',
        required: false,
        description: `Filter results to workflow teams the specified assignee belongs to. The only documented value is '@current', which returns only the workflow teams the current authenticated user is assigned to. Leave blank to return all workflow teams regardless of assignee.`,
      },
      {
        name: 'extra',
        type: 'string',
        required: false,
        description: `Set to 'roleusers' to include each workflow team's role and user membership details in the response. Leave blank for a lighter-weight response without membership detail.`,
      },
      {
        name: 'object_type',
        type: 'string',
        required: false,
        description: `The workflow object type to scope results to, e.g. 'EmailSendDefinition' or 'InteractionStudio.DefinitionInfo' (journey). Defaults to '@all' to return workflow teams for every object type.`,
      },
    ],
  },
]
