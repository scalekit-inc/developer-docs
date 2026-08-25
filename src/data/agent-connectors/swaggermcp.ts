import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'swaggermcp_swagger_create_api_from_prompt',
    description: `Generate and save an API definition based on a prompt using SmartBear AI. This tool automatically applies organization governance and standardization rules during API generation. The specType parameter determines the format of the generated definition. Use: 'openapi20' for OpenAPI 2.0, 'openapi30x' for OpenAPI 3.0.x, 'openapi31x' for OpenAPI 3.1.x, 'asyncapi2xx' for AsyncAPI 2.x, 'asyncapi30x' for AsyncAPI 3.0.x. Use this tool when creating APIs that comply with governance policies or when generating APIs from natural language descriptions. Use this tool when users ask to create, generate, or design APIs with governance or standardization requirements. Returns HTTP 201 for creation, HTTP 200 for update. Response includes 'operation' field indicating whether it was a 'create' or 'update' operation along with API details and SwaggerHub URL.

**Toolset:** Registry API

**Parameters:**
- owner (string) *required*: API owner (organization or user, case-sensitive)
- apiName (string) *required*: API name
- prompt (string) *required*: The prompt describing the desired API functionality (e.g., 'Create a RESTful API for managing a pet store with endpoints for pets, orders, and inventory')
- specType (enum): Specification type for the generated API definition. Use: 'openapi20' for OpenAPI 2.0, 'openapi30x' for OpenAPI 3.0.x (default), 'openapi31x' for OpenAPI 3.1.x, 'asyncapi2xx' for AsyncAPI 2.x, 'asyncapi30x' for AsyncAPI 3.0.x (default: "openapi30x")`,
    params: [
      { name: 'apiName', type: 'string', required: true, description: `API name` },
      {
        name: 'owner',
        type: 'string',
        required: true,
        description: `API owner (organization or user, case-sensitive)`,
      },
      {
        name: 'prompt',
        type: 'string',
        required: true,
        description: `The prompt describing the desired API functionality (e.g., 'Create a RESTful API for managing a pet store with endpoints for pets, orders, and inventory')`,
      },
      {
        name: 'specType',
        type: 'string',
        required: false,
        description: `Specification type for the generated API definition. Use: 'openapi20' for OpenAPI 2.0, 'openapi30x' for OpenAPI 3.0.x (default), 'openapi31x' for OpenAPI 3.1.x, 'asyncapi2xx' for AsyncAPI 2.x, 'asyncapi30x' for AsyncAPI 3.0.x`,
      },
    ],
  },
  {
    name: 'swaggermcp_swagger_create_documentation_page',
    description: `Create a documentation page in a portal product in a single tool call. Supports markdown and html content types. Returns the page location details (productId, sectionId, slug) and a draftUrl to edit it in the portal.

**Toolset:** Documents

**Parameters:**
- portalId (string) *required*: Portal UUID or subdomain - unique identifier for the portal
- productId (string) *required*: Product UUID - unique identifier for the product
- pageTitle (string) *required*: Title of the documentation page - will be displayed in navigation (3-255 characters)
- pageSlug (string): URL slug for the documentation page. 3-255 characters, lowercase, alphanumeric with hyphens, underscores, or dots (e.g. 'my-page'). If not provided, the slug is generated from the page title.
- pageContent (string): Content of the documentation page. Provide HTML when contentType is 'html', Markdown when contentType is 'markdown'.
- contentType (enum): Content type of the documentation page. 'markdown' works with both 'internal' and 'external' source. 'html' only works with 'external' source — html + internal is not supported by the API and will return an error. (default: "markdown")
- source (enum): Where the document content is managed. 'internal': editable in both the portal UI and via API. 'external': editable via API only, not in the portal UI. Constraint: 'html' content type only supports 'external' source. (default: "internal")
- order (number): Order position of the documentation page within its parent section or item (default: 0)
- parentId (string): Parent table of contents item ID - null for top-level pages, or ID of parent item for nested structure`,
    params: [
      {
        name: 'pageTitle',
        type: 'string',
        required: true,
        description: `Title of the documentation page - will be displayed in navigation (3-255 characters)`,
      },
      {
        name: 'portalId',
        type: 'string',
        required: true,
        description: `Portal UUID or subdomain - unique identifier for the portal`,
      },
      {
        name: 'productId',
        type: 'string',
        required: true,
        description: `Product UUID - unique identifier for the product`,
      },
      {
        name: 'contentType',
        type: 'string',
        required: false,
        description: `Content type of the documentation page. 'markdown' works with both 'internal' and 'external' source. 'html' only works with 'external' source — html + internal is not supported by the API and will return an error.`,
      },
      {
        name: 'order',
        type: 'number',
        required: false,
        description: `Order position of the documentation page within its parent section or item`,
      },
      {
        name: 'pageContent',
        type: 'string',
        required: false,
        description: `Content of the documentation page. Provide HTML when contentType is 'html', Markdown when contentType is 'markdown'.`,
      },
      {
        name: 'pageSlug',
        type: 'string',
        required: false,
        description: `URL slug for the documentation page. 3-255 characters, lowercase, alphanumeric with hyphens, underscores, or dots (e.g. 'my-page'). If not provided, the slug is generated from the page title.`,
      },
      {
        name: 'parentId',
        type: 'string',
        required: false,
        description: `Parent table of contents item ID - null for top-level pages, or ID of parent item for nested structure`,
      },
      {
        name: 'source',
        type: 'string',
        required: false,
        description: `Where the document content is managed. 'internal': editable in both the portal UI and via API. 'external': editable via API only, not in the portal UI. Constraint: 'html' content type only supports 'external' source.`,
      },
    ],
  },
  {
    name: 'swaggermcp_swagger_create_or_update_api',
    description: `Create a new API or update an existing API in SwaggerHub Registry for Swagger Studio. The API specification type (OpenAPI, AsyncAPI) is automatically detected from the definition content. APIs are always created with fixed values: version 1.0.0, private visibility, and automock disabled (these values cannot be changed). Returns HTTP 201 for creation, HTTP 200 for update. Response includes 'operation' field indicating whether it was a 'create' or 'update' operation along with API details and SwaggerHub URL.

**Toolset:** Registry API

**Parameters:**
- owner (string) *required*: Organization name (owner of the API)
- apiName (string) *required*: API name
- definition (string) *required*: API definition content (OpenAPI/AsyncAPI specification in JSON or YAML format). Format is automatically detected. API is created with fixed values: version 1.0.0, private visibility, automock disabled, and no project assignment.`,
    params: [
      { name: 'apiName', type: 'string', required: true, description: `API name` },
      {
        name: 'definition',
        type: 'string',
        required: true,
        description: `API definition content (OpenAPI/AsyncAPI specification in JSON or YAML format). Format is automatically detected. API is created with fixed values: version 1.0.0, private visibility, automock disabled, and no project assignment.`,
      },
      {
        name: 'owner',
        type: 'string',
        required: true,
        description: `Organization name (owner of the API)`,
      },
    ],
  },
  {
    name: 'swaggermcp_swagger_create_portal',
    description: `Create a new portal within Swagger.

**Toolset:** Portals

**Parameters:**
- name (string): The display name for the portal - shown to users and in branding (3-40 characters)
- subdomain (string) *required*: The portal subdomain - used in the portal URL (e.g., 'myportal' for myportal.example.com). Must be unique, lowercase, 3-20 characters, alphanumeric with hyphens
- offline (boolean): If true, the portal will not be visible to customers - useful for development/staging environments. Defaults to false
- routing (string): Routing strategy for the portal - either 'browser' (client-side routing) or 'proxy' (server-side routing). Defaults to 'browser'
- credentialsEnabled (boolean): Whether authentication credentials are enabled for accessing the portal. When true, users can authenticate to access private content. Defaults to true
- swaggerHubOrganizationId (string) *required*: The corresponding Swagger organization UUID - required for portal creation. This links the portal to your Swagger organization. Only one Portal per Swagger organization is allowed.
- openapiRenderer (string): OpenAPI renderer type: 'SWAGGER_UI' (Swagger UI), 'ELEMENTS' (Stoplight Elements), or 'TOGGLE' (allows switching between both with Elements as default). Defaults to 'TOGGLE'
- pageContentFormat (string): Format for page content rendering - determines how documentation pages are processed: 'HTML', 'MARKDOWN', or 'BOTH'. Defaults to 'HTML'`,
    params: [
      {
        name: 'subdomain',
        type: 'string',
        required: true,
        description: `The portal subdomain - used in the portal URL (e.g., 'myportal' for myportal.example.com). Must be unique, lowercase, 3-20 characters, alphanumeric with hyphens`,
      },
      {
        name: 'swaggerHubOrganizationId',
        type: 'string',
        required: true,
        description: `The corresponding SwaggerHub organization UUID - required for portal creation. This links the portal to your SwaggerHub organization`,
      },
      {
        name: 'credentialsEnabled',
        type: 'boolean',
        required: false,
        description: `Whether authentication credentials are enabled for accessing the portal. When true, users can authenticate to access private content. Defaults to true`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `The display name for the portal - shown to users and in branding (3-40 characters)`,
      },
      {
        name: 'offline',
        type: 'boolean',
        required: false,
        description: `If true, the portal will not be visible to customers - useful for development/staging environments. Defaults to false`,
      },
      {
        name: 'openapiRenderer',
        type: 'string',
        required: false,
        description: `OpenAPI renderer type: 'SWAGGER_UI' (Swagger UI), 'ELEMENTS' (Stoplight Elements), or 'TOGGLE' (allows switching between both with Elements as default). Defaults to 'TOGGLE'`,
      },
      {
        name: 'pageContentFormat',
        type: 'string',
        required: false,
        description: `Format for page content rendering - determines how documentation pages are processed: 'HTML', 'MARKDOWN', or 'BOTH'. Defaults to 'HTML'`,
      },
      {
        name: 'routing',
        type: 'string',
        required: false,
        description: `Routing strategy for the portal - either 'browser' (client-side routing) or 'proxy' (server-side routing). Defaults to 'browser'`,
      },
    ],
  },
  {
    name: 'swaggermcp_swagger_create_portal_product',
    description: `Create a new product for a specific portal.

**Toolset:** Products

**Parameters:**
- portalId (string) *required*: Portal UUID or subdomain - unique identifier for the portal instance
- type (string) *required*: Product creation type - 'new' to create from scratch or 'copy' to duplicate an existing product
- productId (string): Source product UUID to copy from - required when type is 'copy', specifies which existing product to duplicate. Omit when type is 'new'
- name (string) *required*: Product display name - will be shown to users in the portal navigation and product listings (3-40 characters)
- slug (string) *required*: URL-friendly identifier for the product - must be unique within the portal, used in URLs (e.g., 'my-api' becomes /my-api). 3-22 characters, lowercase, alphanumeric with hyphens, underscores, or dots
- description (string): Product description - explains what the API/product does, shown in product listings and cards (max 110 characters)
- public (boolean): Whether the product is publicly visible to all portal visitors - false means only authenticated users with appropriate roles can access it
- hidden (boolean): Whether the product is hidden from the portal landing page navigation menus - useful for internal or draft products`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Product display name - will be shown to users in the portal navigation and product listings (3-40 characters)`,
      },
      {
        name: 'portalId',
        type: 'string',
        required: true,
        description: `Portal UUID or subdomain - unique identifier for the portal instance`,
      },
      {
        name: 'slug',
        type: 'string',
        required: true,
        description: `URL-friendly identifier for the product - must be unique within the portal, used in URLs (e.g., 'my-api' becomes /my-api). 3-22 characters, lowercase, alphanumeric with hyphens, underscores, or dots`,
      },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `Product creation type - 'new' to create from scratch or 'copy' to duplicate an existing product`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Product description - explains what the API/product does, shown in product listings and cards (max 110 characters)`,
      },
      {
        name: 'hidden',
        type: 'boolean',
        required: false,
        description: `Whether the product is hidden from the portal landing page navigation menus - useful for internal or draft products`,
      },
      {
        name: 'productId',
        type: 'string',
        required: false,
        description: `Source product UUID to copy from - required when type is 'copy', specifies which existing product to duplicate. Omit when type is 'new'`,
      },
      {
        name: 'public',
        type: 'boolean',
        required: false,
        description: `Whether the product is publicly visible to all portal visitors - false means only authenticated users with appropriate roles can access it`,
      },
    ],
  },
  {
    name: 'swaggermcp_swagger_create_table_of_contents',
    description: `Create a new table of contents item in a portal product section. Supports API references, HTML content, and Markdown content types.

**Toolset:** Table Of Contents

**Parameters:**
- sectionId (string) *required*: Section ID - unique identifier for the section within the product
- type (enum) *required*: Type of table of contents creation - 'new' to create from scratch or 'copy' to duplicate an existing one
- title (string) *required*: Title of the table of contents item - will be displayed in navigation (3-40 characters)
- slug (string) *required*: URL-friendly identifier for the table of contents item - must be unique within the section (3-22 characters, lowercase, alphanumeric with hyphens/underscores/dots)
- order (number) *required*: Order position of the table of contents item within its parent section or item
- parentId (string): Parent table of contents item ID - null for top-level items, or ID of parent item for nested structure
- content (object): Content configuration for the table of contents item`,
    params: [
      {
        name: 'order',
        type: 'number',
        required: true,
        description: `Order position of the table of contents item within its parent section or item`,
      },
      {
        name: 'sectionId',
        type: 'string',
        required: true,
        description: `Section ID - unique identifier for the section within the product`,
      },
      {
        name: 'slug',
        type: 'string',
        required: true,
        description: `URL-friendly identifier for the table of contents item - must be unique within the section (3-22 characters, lowercase, alphanumeric with hyphens/underscores/dots)`,
      },
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `Title of the table of contents item - will be displayed in navigation (3-40 characters)`,
      },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `Type of table of contents creation - 'new' to create from scratch or 'copy' to duplicate an existing one`,
      },
      {
        name: 'content',
        type: 'object',
        required: false,
        description: `Content configuration for the table of contents item`,
      },
      {
        name: 'parentId',
        type: 'string',
        required: false,
        description: `Parent table of contents item ID - null for top-level items, or ID of parent item for nested structure`,
      },
    ],
  },
  {
    name: 'swaggermcp_swagger_delete_portal_product',
    description: `Delete a product from a specific portal

**Toolset:** Products

**Parameters:**
- productId (string) *required*: Product UUID or identifier in the format 'portal-subdomain:product-slug' - unique identifier for the product`,
    params: [
      {
        name: 'productId',
        type: 'string',
        required: true,
        description: `Product UUID or identifier in the format 'portal-subdomain:product-slug' - unique identifier for the product`,
      },
    ],
  },
  {
    name: 'swaggermcp_swagger_delete_table_of_contents',
    description: `Delete table of contents entry. Performs a soft-delete of an entry from the table of contents. Supports recursive deletion of nested items.

**Toolset:** Table Of Contents

**Parameters:**
- tableOfContentsId (string) *required*: The table of contents UUID, or identifier in the format 'portal-subdomain:product-slug:section-slug:table-of-contents-slug'
- recursive (boolean): Flag to include all the nested tables of contents (default: false)`,
    params: [
      {
        name: 'tableOfContentsId',
        type: 'string',
        required: true,
        description: `The table of contents UUID, or identifier in the format 'portal-subdomain:product-slug:section-slug:table-of-contents-slug'`,
      },
      {
        name: 'recursive',
        type: 'boolean',
        required: false,
        description: `Flag to include all the nested tables of contents (default: false)`,
      },
    ],
  },
  {
    name: 'swaggermcp_swagger_get_api_definition',
    description: `Fetch resolved API definition from SwaggerHub Registry based on owner, API name, and version.

**Toolset:** Registry API

**Parameters:**
- owner (string) *required*: API owner (organization or user, case-sensitive)
- api (string) *required*: API name (case-sensitive)
- version (string) *required*: Version identifier
- resolved (boolean): Set to true to get the resolved version with all external $refs included (default false)
- flatten (boolean): Set to true to create models from inline schemas in OpenAPI definition (default false)`,
    params: [
      { name: 'api', type: 'string', required: true, description: `API name (case-sensitive)` },
      {
        name: 'owner',
        type: 'string',
        required: true,
        description: `API owner (organization or user, case-sensitive)`,
      },
      { name: 'version', type: 'string', required: true, description: `Version identifier` },
      {
        name: 'flatten',
        type: 'boolean',
        required: false,
        description: `Set to true to create models from inline schemas in OpenAPI definition (default false)`,
      },
      {
        name: 'resolved',
        type: 'boolean',
        required: false,
        description: `Set to true to get the resolved version with all external $refs included (default false)`,
      },
    ],
  },
  {
    name: 'swaggermcp_swagger_get_document',
    description: `Get document content and metadata by document ID. Useful for retrieving HTML or Markdown content from table of contents items.

**Toolset:** Documents

**Parameters:**
- documentId (string) *required*: Document UUID - unique identifier for the document`,
    params: [
      {
        name: 'documentId',
        type: 'string',
        required: true,
        description: `Document UUID - unique identifier for the document`,
      },
    ],
  },
  {
    name: 'swaggermcp_swagger_get_portal',
    description: `Retrieve information about a specific portal.

**Toolset:** Portals

**Parameters:**
- portalId (string) *required*: Portal UUID or subdomain - unique identifier for the portal instance`,
    params: [
      {
        name: 'portalId',
        type: 'string',
        required: true,
        description: `Portal UUID or subdomain - unique identifier for the portal instance`,
      },
    ],
  },
  {
    name: 'swaggermcp_swagger_get_portal_product',
    description: `Retrieve information about a specific product resource.

**Toolset:** Products

**Parameters:**
- productId (string) *required*: Product UUID or identifier in the format 'portal-subdomain:product-slug' - unique identifier for the product`,
    params: [
      {
        name: 'productId',
        type: 'string',
        required: true,
        description: `Product UUID or identifier in the format 'portal-subdomain:product-slug' - unique identifier for the product`,
      },
    ],
  },
  {
    name: 'swaggermcp_swagger_list_organizations',
    description: `Get organizations for a user. Returns a list of organizations that the authenticating user is a member of. On-Premise admin gets a list of all organizations in the system.

**Toolset:** Registry API

**Parameters:**
- q (string): Search organizations by partial or full name (case-insensitive)
- sortBy (enum): The property to sort the results by
- order (enum): Sort order
- page (number): 0-based index of the page to return
- pageSize (number): Number of results per page to return`,
    params: [
      { name: 'order', type: 'string', required: false, description: `Sort order` },
      {
        name: 'page',
        type: 'number',
        required: false,
        description: `0-based index of the page to return`,
      },
      {
        name: 'pageSize',
        type: 'number',
        required: false,
        description: `Number of results per page to return`,
      },
      {
        name: 'q',
        type: 'string',
        required: false,
        description: `Search organizations by partial or full name (case-insensitive)`,
      },
      {
        name: 'sortBy',
        type: 'string',
        required: false,
        description: `The property to sort the results by`,
      },
    ],
  },
  {
    name: 'swaggermcp_swagger_list_portal_product_sections',
    description: `Get sections for a specific product within a portal.

**Toolset:** Sections

**Parameters:**
- productId (string) *required*: Product UUID or identifier in the format 'portal-subdomain:product-slug' - unique identifier for the product
- embed (array): List of related entities to embed in the response - e.g., ['tableOfContents', 'tableOfContents.swaggerhubApi'] to include table of contents and SwaggerHub API details
- page (number): Page number for paginated results - specifies which page of results to retrieve (default is 1)
- size (number): Number of items per page for pagination - controls how many results are returned per page (default is 10)`,
    params: [
      {
        name: 'productId',
        type: 'string',
        required: true,
        description: `Product UUID or identifier in the format 'portal-subdomain:product-slug' - unique identifier for the product`,
      },
      {
        name: 'embed',
        type: 'array',
        required: false,
        description: `List of related entities to embed in the response - e.g., ['tableOfContents', 'tableOfContents.swaggerhubApi'] to include table of contents and SwaggerHub API details`,
      },
      {
        name: 'page',
        type: 'number',
        required: false,
        description: `Page number for paginated results - specifies which page of results to retrieve (default is 1)`,
      },
      {
        name: 'size',
        type: 'number',
        required: false,
        description: `Number of items per page for pagination - controls how many results are returned per page (default is 20)`,
      },
    ],
  },
  {
    name: 'swaggermcp_swagger_list_portal_products',
    description: `Get products for a specific portal that match your criteria.

**Toolset:** Products

**Parameters:**
- portalId (string) *required*: Portal UUID or subdomain - unique identifier for the portal instance`,
    params: [
      {
        name: 'portalId',
        type: 'string',
        required: true,
        description: `Portal UUID or subdomain - unique identifier for the portal instance`,
      },
    ],
  },
  {
    name: 'swaggermcp_swagger_list_portals',
    description: `Search for available portals within Swagger. Only portals where you have at least a designer role, either at the product level or organization level, are returned.

**Toolset:** Portals`,
    params: [],
  },
  {
    name: 'swaggermcp_swagger_list_table_of_contents',
    description: `Get table of contents for a section of a product within a portal.

**Toolset:** Table Of Contents

**Parameters:**
- sectionId (string) *required*: Section ID - unique identifier for the section within the product
- embed (array): List of related entities to embed in the response - e.g., ['swaggerhubApi'] to include SwaggerHub API details
- page (number): Page number for paginated results - specifies which page of results to retrieve (default is 1)
- size (number): Number of items per page for pagination - controls how many results are returned per page (default is 20)`,
    params: [
      {
        name: 'sectionId',
        type: 'string',
        required: true,
        description: `Section ID - unique identifier for the section within the product`,
      },
      {
        name: 'embed',
        type: 'array',
        required: false,
        description: `List of related entities to embed in the response - e.g., ['swaggerhubApi'] to include SwaggerHub API details`,
      },
      {
        name: 'page',
        type: 'number',
        required: false,
        description: `Page number for paginated results - specifies which page of results to retrieve (default is 1)`,
      },
      {
        name: 'size',
        type: 'number',
        required: false,
        description: `Number of items per page for pagination - controls how many results are returned per page (default is 20)`,
      },
    ],
  },
  {
    name: 'swaggermcp_swagger_publish_portal_product',
    description: `Publish a product's content to make it live or as preview. This endpoint publishes the current content of a product, making it visible to portal visitors. Use preview mode to test before going live. Optionally provide \`tableOfContentsId\` to get a page-specific URL. Returns publication status, a live or preview URL (null if URL building fails), product and portal metadata, and an optional \`warning\` when metadata/URL building failed — a warning does NOT mean the publish failed.

**Toolset:** Products

**Parameters:**
- productId (string) *required*: Product UUID or identifier in the format 'portal-subdomain:product-slug' - unique identifier for the product
- tableOfContentsId (string): Optional table of contents UUID, or identifier in the format 'portal-subdomain:product-slug:section-slug:table-of-contents-slug'. When provided, publishPortalProduct uses it to resolve the published URL path for the returned preview/live link.
- preview (boolean): Whether to publish as preview (true) or live (false). Preview allows testing before going live. Defaults to false (live publication) (default: false)`,
    params: [
      {
        name: 'productId',
        type: 'string',
        required: true,
        description: `Product UUID or identifier in the format 'portal-subdomain:product-slug' - unique identifier for the product`,
      },
      {
        name: 'preview',
        type: 'boolean',
        required: false,
        description: `Whether to publish as preview (true) or live (false). Preview allows testing before going live. Defaults to false (live publication)`,
      },
      {
        name: 'tableOfContentsId',
        type: 'string',
        required: false,
        description: `Optional table of contents UUID, or identifier in the format 'portal-subdomain:product-slug:section-slug:table-of-contents-slug'. When provided, publishPortalProduct uses it to resolve the published URL path for the returned preview/live link.`,
      },
    ],
  },
  {
    name: 'swaggermcp_swagger_resolve_organization_portal',
    description: `Resolve portal details for a Swagger organization in a single step. Given an organization UUID, returns the portal ID, subdomain, customDomain (when configured), and the list of products (with productId, productSlug, and productName) for the organization's portal. If the organization has no portal yet, a new portal is created automatically. Use this tool to obtain all portal context needed for subsequent portal and product operations.

**Toolset:** Portals

**Parameters:**
- organizationId (string) *required*: Swagger organization UUID - the organization to resolve portal details for`,
    params: [
      {
        name: 'organizationId',
        type: 'string',
        required: true,
        description: `Swagger organization UUID - the organization to resolve portal details for`,
      },
    ],
  },
  {
    name: 'swaggermcp_swagger_scan_api_standardization',
    description: `Run a standardization scan against an API definition using the organization's governance and standardization rules. Accepts a raw YAML or JSON OpenAPI/AsyncAPI definition and returns a list of validation errors, the total issue count, and counts grouped by severity. Use this tool when the user provides the API definition content directly (as raw YAML or JSON) and asks to validate, scan, or check the governance or standardization of the API.

**Toolset:** Registry API

**Parameters:**
- orgName (string) *required*: The organization name to use for standardization rules
- definition (string) *required*: API definition content (OpenAPI/AsyncAPI specification in JSON or YAML format) to scan for standardization errors`,
    params: [
      {
        name: 'definition',
        type: 'string',
        required: true,
        description: `API definition content (OpenAPI/AsyncAPI specification in JSON or YAML format) to scan for standardization errors`,
      },
      {
        name: 'orgName',
        type: 'string',
        required: true,
        description: `The organization name to use for standardization rules`,
      },
    ],
  },
  {
    name: 'swaggermcp_swagger_scan_api_standardization_from_registry',
    description: `Run a standardization scan on an API that already exists in SwaggerHub Registry, identified by organization name, API name, and version. Fetches the API definition from the registry internally and scans it against the organization's governance and standardization rules. Returns a list of validation errors, total issue count, counts grouped by severity, and a SwaggerHub UI URL for the scanned API. Use this tool when the user identifies the API by org name, API name, and version and asks to validate, scan, or check the governance or standardization of an existing API.

**Toolset:** Registry API

**Parameters:**
- orgName (string) *required*: The organization name that owns the API and provides the standardization rules (case-sensitive)
- apiName (string) *required*: API name (case-sensitive)
- version (string) *required*: Version identifier`,
    params: [
      { name: 'apiName', type: 'string', required: true, description: `API name (case-sensitive)` },
      {
        name: 'orgName',
        type: 'string',
        required: true,
        description: `The organization name that owns the API and provides the standardization rules (case-sensitive)`,
      },
      { name: 'version', type: 'string', required: true, description: `Version identifier` },
    ],
  },
  {
    name: 'swaggermcp_swagger_search_apis_and_domains',
    description: `Search for APIs and Domains in SwaggerHub Registry using the comprehensive /specs endpoint and retrieve metadata including owner, name, description, summary, version, and specification.

**Toolset:** Registry API

**Parameters:**
- query (string): Search query to filter APIs by name, description, or content
- state (enum): Filter APIs by publication state - ALL (default), PUBLISHED, or UNPUBLISHED
- tag (string): Filter APIs by tag
- offset (number): Offset for pagination (0-based, default 0)
- limit (number): Number of results per page (1-100, default 20)
- sort (enum): Sort field - NAME, UPDATED, or CREATED (default NAME)
- order (enum): Sort order - ASC or DESC (default ASC)
- owner (string): Filter APIs by owner (organization or user)
- specType (enum): Filter by specification type - API or DOMAIN (default all types)`,
    params: [
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of results per page (1-100, default 20)`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `Offset for pagination (0-based, default 0)`,
      },
      {
        name: 'order',
        type: 'string',
        required: false,
        description: `Sort order - ASC or DESC (default ASC)`,
      },
      {
        name: 'owner',
        type: 'string',
        required: false,
        description: `Filter APIs by owner (organization or user)`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Search query to filter APIs by name, description, or content`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort field - NAME, UPDATED, or CREATED (default NAME)`,
      },
      {
        name: 'specType',
        type: 'string',
        required: false,
        description: `Filter by specification type - API or DOMAIN (default all types)`,
      },
      {
        name: 'state',
        type: 'string',
        required: false,
        description: `Filter APIs by publication state - ALL (default), PUBLISHED, or UNPUBLISHED`,
      },
      { name: 'tag', type: 'string', required: false, description: `Filter APIs by tag` },
    ],
  },
  {
    name: 'swaggermcp_swagger_standardize_api',
    description: `Standardize and fix an API definition using AI to ensure compliance with governance policies. Scans the API definition for standardization errors and automatically fixes them using SmartBear AI. Optionally provide 'newVersion' (e.g. patch bump '1.0.0' → '1.0.1') to save the fixed definition as a new version — omitting it will overwrite the current version. Returns the number of errors found and the fixed definition if successful. Use this tool when users ask to standardize, fix, govern, or ensure governance compliance of APIs.

**Toolset:** Registry API

**Parameters:**
- owner (string) *required*: API owner (organization or user, case-sensitive)
- api (string) *required*: API name (case-sensitive)
- version (string) *required*: Version identifier
- newVersion (string): The version to save the fixed definition as (e.g. '1.0.1'). Omitting this will overwrite the current version — prefer providing a patch bump (e.g. '1.0.0' → '1.0.1') unless the user specifies otherwise.`,
    params: [
      { name: 'api', type: 'string', required: true, description: `API name (case-sensitive)` },
      {
        name: 'owner',
        type: 'string',
        required: true,
        description: `API owner (organization or user, case-sensitive)`,
      },
      { name: 'version', type: 'string', required: true, description: `Version identifier` },
      {
        name: 'newVersion',
        type: 'string',
        required: false,
        description: `The version to save the fixed definition as (e.g. '1.0.1'). Omitting this will overwrite the current version — prefer providing a patch bump (e.g. '1.0.0' → '1.0.1') unless the user specifies otherwise.`,
      },
    ],
  },
  {
    name: 'swaggermcp_swagger_update_document',
    description: `Update the content or source of an existing document. Supports both HTML and Markdown content types.

**Toolset:** Documents

**Parameters:**
- documentId (string) *required*: Document UUID - unique identifier for the document
- content (string): The document content to update (HTML or Markdown based on document type)
- type (enum): Content type of the document. Note: documents with type 'html' and source 'internal' cannot be edited via API — only 'html' + 'external' and all 'markdown' combinations are supported.
- source (enum): Where the document content is managed. 'internal': editable in both portal UI and API. 'external': editable via API only. Note: 'html' + 'internal' documents cannot be updated via API.`,
    params: [
      {
        name: 'documentId',
        type: 'string',
        required: true,
        description: `Document UUID - unique identifier for the document`,
      },
      {
        name: 'content',
        type: 'string',
        required: false,
        description: `The document content to update (HTML or Markdown based on document type)`,
      },
      {
        name: 'source',
        type: 'string',
        required: false,
        description: `Source of the document content - 'internal' allows to edit content in both UI and API, 'external' enables editing only via API.`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Content type - 'html' for HTML content or 'markdown' for Markdown content`,
      },
    ],
  },
  {
    name: 'swaggermcp_swagger_update_portal',
    description: `Update a specific portal's configuration.

**Toolset:** Portals

**Parameters:**
- portalId (string) *required*: Portal UUID or subdomain - unique identifier for the portal instance
- name (string): Update the portal display name - shown to users and in branding (3-40 characters)
- subdomain (string): Update the portal subdomain - changes the portal URL. Must remain unique across all portals (3-20 characters, lowercase, alphanumeric with hyphens)
- customDomain (boolean): Enable/disable custom domain for the portal - allows using your own domain instead of the default subdomain
- gtmKey (string): Google Tag Manager key for analytics tracking - format: GTM-XXXXXX (max 25 characters)
- offline (boolean): Set portal visibility - true hides portal from customers (useful for maintenance or development)
- routing (string): Update routing strategy - 'browser' for client-side routing or 'proxy' for server-side routing
- credentialsEnabled (boolean): Enable/disable authentication credentials for portal access - controls whether users can authenticate to view private content
- openapiRenderer (string): Change OpenAPI renderer: 'SWAGGER_UI' (Swagger UI), 'ELEMENTS' (Stoplight Elements), or 'TOGGLE' (switch between both)
- pageContentFormat (string): Update page content format for documentation rendering: 'HTML', 'MARKDOWN', or 'BOTH'`,
    params: [
      {
        name: 'portalId',
        type: 'string',
        required: true,
        description: `Portal UUID or subdomain - unique identifier for the portal instance`,
      },
      {
        name: 'credentialsEnabled',
        type: 'boolean',
        required: false,
        description: `Enable/disable authentication credentials for portal access - controls whether users can authenticate to view private content`,
      },
      {
        name: 'customDomain',
        type: 'boolean',
        required: false,
        description: `Enable/disable custom domain for the portal - allows using your own domain instead of the default subdomain`,
      },
      {
        name: 'gtmKey',
        type: 'string',
        required: false,
        description: `Google Tag Manager key for analytics tracking - format: GTM-XXXXXX (max 25 characters)`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Update the portal display name - shown to users and in branding (3-40 characters)`,
      },
      {
        name: 'offline',
        type: 'boolean',
        required: false,
        description: `Set portal visibility - true hides portal from customers (useful for maintenance or development)`,
      },
      {
        name: 'openapiRenderer',
        type: 'string',
        required: false,
        description: `Change OpenAPI renderer: 'SWAGGER_UI' (Swagger UI), 'ELEMENTS' (Stoplight Elements), or 'TOGGLE' (switch between both)`,
      },
      {
        name: 'pageContentFormat',
        type: 'string',
        required: false,
        description: `Update page content format for documentation rendering: 'HTML', 'MARKDOWN', or 'BOTH'`,
      },
      {
        name: 'routing',
        type: 'string',
        required: false,
        description: `Update routing strategy - 'browser' for client-side routing or 'proxy' for server-side routing`,
      },
      {
        name: 'subdomain',
        type: 'string',
        required: false,
        description: `Update the portal subdomain - changes the portal URL. Must remain unique across all portals (3-20 characters, lowercase, alphanumeric with hyphens)`,
      },
    ],
  },
  {
    name: 'swaggermcp_swagger_update_portal_product',
    description: `Update a product's settings within a specific portal.

**Toolset:** Products

**Parameters:**
- productId (string) *required*: Product UUID or identifier in the format 'portal-subdomain:product-slug' - unique identifier for the product
- name (string): Update product display name - changes how it appears to users in navigation and listings (3-40 characters)
- slug (string): Update URL-friendly identifier - must remain unique within the portal, affects product URLs (3-22 characters, lowercase, alphanumeric with hyphens/underscores/dots)
- description (string): Update product description - explains the API/product functionality, shown in listings (max 110 characters)
- public (boolean): Change product visibility - true makes it publicly accessible to all visitors, false restricts to authenticated users with roles
- hidden (boolean): Change navigation visibility - true hides from portal landing page menus while keeping the product accessible via direct links`,
    params: [
      {
        name: 'productId',
        type: 'string',
        required: true,
        description: `Product UUID or identifier in the format 'portal-subdomain:product-slug' - unique identifier for the product`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Update product description - explains the API/product functionality, shown in listings (max 110 characters)`,
      },
      {
        name: 'hidden',
        type: 'boolean',
        required: false,
        description: `Change navigation visibility - true hides from portal landing page menus while keeping the product accessible via direct links`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Update product display name - changes how it appears to users in navigation and listings (3-40 characters)`,
      },
      {
        name: 'public',
        type: 'boolean',
        required: false,
        description: `Change product visibility - true makes it publicly accessible to all visitors, false restricts to authenticated users with roles`,
      },
      {
        name: 'slug',
        type: 'string',
        required: false,
        description: `Update URL-friendly identifier - must remain unique within the portal, affects product URLs (3-22 characters, lowercase, alphanumeric with hyphens/underscores/dots)`,
      },
    ],
  },
]
