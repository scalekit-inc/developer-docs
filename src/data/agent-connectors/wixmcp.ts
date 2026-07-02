import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'wixmcp_browsewixrestdocsmenu',
    description: `Browse the Wix REST API documentation menu hierarchy to explore available API categories and endpoints.`,
    params: [
      {
        name: 'reason',
        type: 'string',
        required: true,
        description: `One sentence describing the original user request and why you are browsing this part of the docs menu.`,
      },
      {
        name: 'menuUrl',
        type: 'string',
        required: false,
        description: `URL of the menu to browse. Empty/omitted returns the root menu. Copy the URL from links in previous responses of this tool. Example: "https://dev.wix.com/docs/api-reference/ecommerce" or "https://dev.wix.com/docs/api-reference/ecommerce/catalog"`,
      },
    ],
  },
  {
    name: 'wixmcp_callwixsiteapi',
    description: `Call any Wix REST API endpoint on a specific site to create, read, update, or delete site data.`,
    params: [
      {
        name: 'method',
        type: 'string',
        required: true,
        description: `The HTTP method to use for the API call (e.g. GET, POST, PUT, DELETE)`,
      },
      {
        name: 'reason',
        type: 'string',
        required: true,
        description: `One sentence explaining the original user request and why you are calling this API to complete it.`,
      },
      {
        name: 'siteId',
        type: 'string',
        required: true,
        description: `The id of the site selected using site selection tool`,
      },
      {
        name: 'sourceDocUrl',
        type: 'string',
        required: true,
        description: `The URL of the documentation or recipe where you found this API endpoint.
MAKE SURE THE ENDPOINT URL IS REALLY THERE AND YOUR ARE NOT GUESSING IT !!!
Must be a valid URL like:
- https://dev.wix.com/docs/api-reference/... (REST API reference docs)
Use "user-provided" if the user gave you the endpoint directly.
Use "other" ONLY IF YOU HAVE A VERY GOOD REASON TO DO SO`,
      },
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `The url of the api to call - ALWAYS get the API url from the Wix REST docs or from the conversation context, the URL MUST BE ABSOLUTE URL
NEVER guess the API url, ALWAYS get it from the conversation context, i.e from the user prompt or from the "WixREADME" tool or from the "SearchWixRESTDocumentation" tool or from the "BrowseWixRESTDocsMenu" tool or from the "ReadFullDocsArticle" tool
Allowed API urls are: wix.com, dev.wix.com, manage.wix.com, editor.wix.com, wixapis.com
Docs urls like https://dev.wix.com/docs/... are not API urls, if you want to read the docs, use the "ReadFullDocsArticle" tool`,
      },
      {
        name: 'body',
        type: 'string',
        required: false,
        description: `The request body as a JSON object or array with all the required fields and values, including nested objects. Pass the actual value (object or array), NOT a JSON string. YOU MUST NEVER MAKE UP A BODY - the body should be based on the conversation context, i.e from the user prompt OR got into the conversation context by the "ReadFullDocsArticle" tool OR by the "SearchWixAPISpec" tool OR by the "ReadFullDocsMethodSchema" tool - i.e based on the API docs, a relevant recipe you read (preferably), a code example you found in the docs, a schema you read etc.. YOU MUST NEVER ASSUME YOU KNOW WHAT THE BODY SCHEMA IS WITHOUT CONCRETE EXAMPLES OR SCHEMA DEFINITIONS FROM THE CONVERSATION CONTEXT. Prefer reading relevant recipes if you have them in context for understand the body schema for API calls.`,
      },
    ],
  },
  {
    name: 'wixmcp_claimanonymoussite',
    description: `Transfer an anonymously created Wix site to the authenticated user's account using a job ID.`,
    params: [
      {
        name: 'jobId',
        type: 'string',
        required: true,
        description: `The job ID from site creation - required to authenticate the claim`,
      },
      {
        name: 'siteId',
        type: 'string',
        required: true,
        description: `The metasite ID of the anonymous site to claim`,
      },
    ],
  },
  {
    name: 'wixmcp_createwixbusinessguide',
    description: `Generate a guided plan for creating a new Wix site from a template, with the Wix Editor, or as a headless site.`,
    params: [
      {
        name: 'userPrompt',
        type: 'string',
        required: false,
        description: `The user prompt that triggered this tool`,
      },
    ],
  },
  {
    name: 'wixmcp_executewixapi',
    description: `Execute JavaScript code against the Wix REST API in a sandboxed environment to query or mutate site data.`,
    params: [
      {
        name: 'code',
        type: 'string',
        required: true,
        description: `JavaScript async function expression to execute against the Wix REST API. The value must be the function itself, for example \`async function() { ... }\` or \`async () => { ... }\`, not a script body and not an invoked function. Return the final answer from inside the function. Do not write top-level \`const\`, top-level \`await\`, or top-level \`return\` outside the function body. Use \`wix.request({ method, url, body })\` for Wix API calls. Scope defaults to \`site\` when the ExecuteWixAPI \`siteId\` parameter is passed, otherwise \`account\`; set \`scope\` explicitly when needed. Full Wix API URLs and paths starting with \`/\` are supported. Do not pass \`siteId\` inside \`wix.request()\`; one ExecuteWixAPI call can target only the tool-level \`siteId\`.`,
      },
      {
        name: 'hasMutations',
        type: 'boolean',
        required: true,
        description: `Whether this code creates, updates, deletes, publishes, installs, imports, uploads, or otherwise mutates Wix data or site/account state. Set this to true for create/update/delete/bulk create/import/upload calls even if the reason is inspection, verification, or response-shape discovery. Read-only GET/query/list/search calls can use false.`,
      },
      {
        name: 'reason',
        type: 'string',
        required: true,
        description: `One sentence explaining the original user request and why you are executing code to complete it.`,
      },
      {
        name: 'sourceDocUrls',
        type: 'array',
        required: true,
        description: `The URLs of the documentation, recipes, API articles, or schema sources where you confirmed the Wix REST endpoints, HTTP methods, request body shapes, auth contexts, and required fields used by this code.
Include every docs/schema source needed for the endpoints and request shapes used in the code.
MAKE SURE THE ENDPOINT URLS AND REQUEST SHAPES ARE REALLY THERE AND YOU ARE NOT GUESSING THEM !!!
Each value must be a valid URL like:
- https://dev.wix.com/docs/api-reference/... (REST API reference docs)
Use ["user-provided"] if the user gave you all endpoint and request details directly.
Use ["other"] ONLY IF YOU HAVE A VERY GOOD REASON TO DO SO`,
      },
      {
        name: 'siteId',
        type: 'string',
        required: false,
        description: `Wix site ID for site-level API calls. Required when using \`wix.request({ scope: "site", ... })\`. One ExecuteWixAPI call can target only this siteId; per-request siteId inside \`wix.request()\` is not supported. Find site IDs using ListWixSites or an account-level \`wix.request()\` call to query the Sites API.`,
      },
    ],
  },
  {
    name: 'wixmcp_getsuggesteddomains',
    description: `Suggest available domain names based on a search query or an existing Wix site's name.`,
    params: [
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Number of suggestions to return (default: 10, max: 20)`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Free-text keywords, business idea, or brand concept to base suggestions on. Use the user's own words.`,
      },
      {
        name: 'siteId',
        type: 'string',
        required: false,
        description: `Site ID to auto-suggest a domain based on the site name. Used when suggesting domains after site creation.`,
      },
      {
        name: 'tlds',
        type: 'array',
        required: false,
        description: `Filter by specific TLDs (e.g. ["com", "net"]). Do not include the dot.`,
      },
    ],
  },
  {
    name: 'wixmcp_listwixsites',
    description: `List all Wix sites belonging to the authenticated account, with optional name filtering.`,
    params: [
      {
        name: 'nameSearch',
        type: 'string',
        required: false,
        description: `optional filer by name, if not provided all sites will be returned`,
      },
    ],
  },
  {
    name: 'wixmcp_managewixsite',
    description: `Call account-level Wix APIs to create, update, or publish a site.`,
    params: [
      {
        name: 'method',
        type: 'string',
        required: true,
        description: `The HTTP method to use for the API call (e.g. GET, POST, PUT, DELETE)`,
      },
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `The url of the api to call - ALWAYS get the information from the Wix REST docs DONT GUESS IT, the URL MUST BE ABSOLUTE URL`,
      },
      {
        name: 'body',
        type: 'string',
        required: false,
        description: `The request body as a JSON object or array with all the required fields and values, including nested objects. Pass the actual value (object or array), NOT a JSON string. YOU MUST NEVER MAKE UP A BODY - this should be based on the conversation context, i.e from the user prompt or from the "WixREADME" tool or from the "SearchWixRESTDocumentation" tool or from the "BrowseWixRESTDocsMenu" tool or from the "ReadFullDocsArticle" tool or from the "SearchWixAPISpec" tool or from the "ReadFullDocsMethodSchema" tool - i.e based on the API docs. YOU MUST NEVER ASSUME YOU KNOW WHAT THE SCHEMA IS WITHOUT CONCRETE EXAMPLES OR SCHEMA DEFINITIONS FROM THE CONVERSATION CONTEXT.`,
      },
    ],
  },
  {
    name: 'wixmcp_pullsitecreationjob',
    description: `Poll the status of a site creation or editing job until it completes.`,
    params: [{ name: 'jobId', type: 'string', required: true, description: `The job ID to pull` }],
  },
  {
    name: 'wixmcp_readfulldocsarticle',
    description: `Fetch the full content and code examples for a specific Wix documentation article.`,
    params: [
      {
        name: 'articleUrl',
        type: 'string',
        required: true,
        description: `The URL of the docs article or method article to fetch. Should be something like https://dev.wix.com/docs/.../... For REST docs, use the URL as-is. For SDK docs, the URL SHOULD include the query param ?apiView=SDK (e.g. https://dev.wix.com/docs/...?apiView=SDK).`,
      },
    ],
  },
  {
    name: 'wixmcp_readfulldocsmethodschema',
    description: `Fetch the complete request and response schema for a specific Wix API method.`,
    params: [
      {
        name: 'articleUrl',
        type: 'string',
        required: true,
        description: `The URL of the documentation to fetch. Should be something like https://dev.wix.com/docs/.../... For REST docs, use the URL as-is. For SDK docs, the URL SHOULD include the query param ?apiView=SDK (e.g. https://dev.wix.com/docs/...?apiView=SDK).`,
      },
      {
        name: 'reason',
        type: 'string',
        required: true,
        description: `One sentence describing the original user request, the task you are trying to accomplish, and why you need the full schema (e.g., no relevant code example found in docs or recipes).`,
      },
    ],
  },
  {
    name: 'wixmcp_searchbuildappsdocumentation',
    description: `Search the Wix documentation for building and publishing Wix apps.`,
    params: [
      {
        name: 'searchTerm',
        type: 'string',
        required: true,
        description: `The search term to search for in the Build Apps Documentation`,
      },
      {
        name: 'maxResults',
        type: 'number',
        required: false,
        description: `The maximum number of results to return, default is 10, max is 15`,
      },
    ],
  },
  {
    name: 'wixmcp_searchwixapispec',
    description: `Search and inspect the Wix REST API spec by running JavaScript in a sandboxed read-only environment.`,
    params: [
      {
        name: 'code',
        type: 'string',
        required: true,
        description: `JavaScript async function() expression to search the Wix API index. Has access to \`lightIndex\` (array of resources) and \`getResourceSchema(resourceId)\` (returns full schema).`,
      },
      {
        name: 'reason',
        type: 'string',
        required: true,
        description: `One sentence describing the original user request and why you are searching or inspecting the Wix API spec.`,
      },
    ],
  },
  {
    name: 'wixmcp_searchwixclidocumentation',
    description: `Search the Wix CLI documentation for website development commands and workflows.`,
    params: [
      {
        name: 'reason',
        type: 'string',
        required: true,
        description: `One sentence describing the original user request and the task you are trying to accomplish with this search.`,
      },
      {
        name: 'searchTerm',
        type: 'string',
        required: true,
        description: `The search term to search for in the Wix CLI Documentation`,
      },
      {
        name: 'maxResults',
        type: 'number',
        required: false,
        description: `The maximum number of results to return, default is 10, max is 15`,
      },
    ],
  },
  {
    name: 'wixmcp_searchwixheadlessdocumentation',
    description: `Search the Wix headless documentation for building custom frontends with Wix backend services.`,
    params: [
      {
        name: 'searchTerm',
        type: 'string',
        required: true,
        description: `The search term to search for in the Headless Documentation`,
      },
      {
        name: 'maxResults',
        type: 'number',
        required: false,
        description: `The maximum number of results to return, default is 10, max is 15`,
      },
    ],
  },
  {
    name: 'wixmcp_searchwixrestdocumentation',
    description: `Search the official Wix REST API documentation to find endpoints, schemas, and usage examples.`,
    params: [
      {
        name: 'reason',
        type: 'string',
        required: true,
        description: `One sentence describing the original user request and the task you are trying to accomplish with this search.`,
      },
      {
        name: 'searchTerm',
        type: 'string',
        required: true,
        description: `The search term to search for in the Wix REST API Documentation`,
      },
      {
        name: 'maxResults',
        type: 'number',
        required: false,
        description: `The maximum number of results to return, default is 10, max is 15`,
      },
    ],
  },
  {
    name: 'wixmcp_searchwixsdkdocumentation',
    description: `Search the Wix JavaScript SDK documentation for client-side and server-side SDK usage.`,
    params: [
      {
        name: 'searchTerm',
        type: 'string',
        required: true,
        description: `The search term to search for in the Wix SDK Documentation`,
      },
      {
        name: 'maxResults',
        type: 'number',
        required: false,
        description: `The maximum number of results to return, default is 10, max is 15`,
      },
    ],
  },
  {
    name: 'wixmcp_searchwixwdsdocumentation',
    description: `Search the Wix Design System documentation for UI components and design guidelines.`,
    params: [
      {
        name: 'searchTerm',
        type: 'string',
        required: true,
        description: `The search term to search for in the Wix Design System Documentation`,
      },
      {
        name: 'maxResults',
        type: 'number',
        required: false,
        description: `The maximum number of results to return, default is 10, max is 15`,
      },
    ],
  },
  {
    name: 'wixmcp_supportandfeedback',
    description: `Submit feedback or a support request about the Wix MCP tools to the Wix team.`,
    params: [
      {
        name: 'message',
        type: 'string',
        required: true,
        description: `The message to send to Wix`,
      },
      {
        name: 'requestId',
        type: 'string',
        required: false,
        description: `request id if returned from the server in a failed API call to Wix`,
      },
    ],
  },
  {
    name: 'wixmcp_uploadimagetowixsite',
    description: `Upload one or more images to a Wix site's Media Manager and return the file URL and media ID.`,
    params: [
      {
        name: 'siteId',
        type: 'string',
        required: true,
        description: `The ID of the Wix site to upload to`,
      },
      {
        name: 'displayName',
        type: 'string',
        required: false,
        description: `Optional display name for the file in Media Manager. If not provided, uses the original filename.`,
      },
      {
        name: 'image',
        type: 'array',
        required: false,
        description: `Array of images to upload. Use this when the user provides image file attachments OR image URLs. ALWAYS pass ALL images together in a single call — NEVER call this tool once per image. ChatGPT/OpenAI clients: user-attached files are automatically resolved to download_urls, just include them here. Each item must have download_url and optionally file_id. Do NOT use together with imageBase64.`,
      },
      {
        name: 'imageBase64',
        type: 'string',
        required: false,
        description: `Base64-encoded image data. Use when the client can read a file and encode it as base64. May include a data URL prefix (e.g. "data:image/jpeg;base64,...") or be raw base64. Do NOT use together with image.`,
      },
      {
        name: 'mimeType',
        type: 'string',
        required: false,
        description: `MIME type of the image (e.g. "image/jpeg", "image/png", "image/webp"). Required when imageBase64 does not include a data URL prefix.`,
      },
    ],
  },
  {
    name: 'wixmcp_wixreadme',
    description: `Read the Wix MCP README for guidance on how to use the available Wix tools effectively.`,
    params: [],
  },
  {
    name: 'wixmcp_wixsitebuilder',
    description: `Create or build a new Wix site using AI, returning a job ID to track the creation progress.`,
    params: [
      {
        name: 'sitePrompt',
        type: 'string',
        required: true,
        description: `The prompt to build the site. If not provided, the user will be asked to provide a prompt.`,
      },
      {
        name: 'jobId',
        type: 'string',
        required: false,
        description: `The job ID of the site build. If not provided, a new job will be created.`,
      },
      {
        name: 'suggestedSiteName',
        type: 'string',
        required: false,
        description: `Suggested site name to use for the site based on the site prompt.`,
      },
    ],
  },
]
