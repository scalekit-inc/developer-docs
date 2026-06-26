import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'swaggermcp_swagger_create_api_from_prompt',
    description: `Generate and save a new API definition in SwaggerHub using SmartBear AI from a natural language prompt.`,
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
    name: 'swaggermcp_swagger_create_or_update_api',
    description: `Create a new API or update an existing API definition in the SwaggerHub registry.`,
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
    description: `Create a new developer portal in SwaggerHub.`,
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
    description: `Create a new product within a portal to group and expose API documentation.`,
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
    description: `Add a new entry to the table of contents for a portal product section.`,
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
    description: `Delete a product from a portal by product ID.`,
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
    description: `Remove a table of contents entry from a portal product section.`,
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
    description: `Fetch an API definition from the SwaggerHub registry by owner, API name, and version.`,
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
    description: `Retrieve the content and metadata of a portal document by its ID.`,
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
    description: `Retrieve configuration and details for a specific portal by ID.`,
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
    description: `Retrieve details for a specific product within a portal.`,
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
    description: `List organizations the authenticated user belongs to, with optional search and pagination.`,
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
    description: `List sections within a portal product, with optional pagination and embedded data.`,
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
    description: `List all products within a specific portal.`,
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
    description: `List all portals the user has access to.`,
    params: [],
  },
  {
    name: 'swaggermcp_swagger_list_table_of_contents',
    description: `List table of contents entries for a section within a portal product.`,
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
    description: `Publish a portal product to make its content live, or publish as a preview.`,
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
    ],
  },
  {
    name: 'swaggermcp_swagger_scan_api_standardization',
    description: `Run a standardization scan on an API definition against the organization's governance rules.`,
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
    name: 'swaggermcp_swagger_search_apis_and_domains',
    description: `Search for APIs and domains in the SwaggerHub registry with optional filters.`,
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
    description: `Standardize and fix an API definition using AI to comply with the organization's governance rules.`,
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
    description: `Update the content or source URL of an existing portal document.`,
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
    description: `Update the configuration of an existing portal.`,
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
    description: `Update the settings of an existing product within a portal.`,
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
