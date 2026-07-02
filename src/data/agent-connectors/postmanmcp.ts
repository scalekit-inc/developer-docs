import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'postmanmcp_createcollection',
    description: `Creates a collection using the [Postman Collection v2.1.0 schema format](https://schema.postman.com/collection/json/v2.1.0/draft-07/docs/index.html).

**Note:**

If you do not include the \\\`workspace\\\` query parameter, the system creates the collection in the oldest personal Internal workspace you own.`,
    params: [
      { name: 'workspace', type: 'string', required: true, description: `The workspace's ID.` },
      { name: 'collection', type: 'object', required: false, description: `No description.` },
    ],
  },
  {
    name: 'postmanmcp_createcollectionrequest',
    description: `Creates a request in a collection. For a complete list of properties, refer to the **Request** entry in the [Postman Collection Format documentation](https://schema.postman.com/collection/json/v2.1.0/draft-07/docs/index.html).

**Note:**

It is recommended that you pass the \\\`name\\\` property in the request body. If you do not, the system uses a null value. As a result, this creates a request with a blank name.`,
    params: [
      { name: 'collectionId', type: 'string', required: true, description: `The collection's ID.` },
      {
        name: 'auth',
        type: 'string',
        required: false,
        description: `The request's authentication information.`,
      },
      {
        name: 'data',
        type: 'string',
        required: false,
        description: `The request body's form data.`,
      },
      {
        name: 'dataMode',
        type: 'string',
        required: false,
        description: `The request body's data mode.`,
      },
      {
        name: 'dataOptions',
        type: 'string',
        required: false,
        description: `Additional configurations and options set for the request body's various data modes.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `The request's description.`,
      },
      {
        name: 'events',
        type: 'string',
        required: false,
        description: `A list of scripts configured to run when specific events occur.`,
      },
      {
        name: 'folderId',
        type: 'string',
        required: false,
        description: `The folder ID in which to create the request. By default, the system will create the request at the collection level.`,
      },
      {
        name: 'graphqlModeData',
        type: 'string',
        required: false,
        description: `The request body's GraphQL mode data.`,
      },
      { name: 'headerData', type: 'array', required: false, description: `The request's headers.` },
      {
        name: 'method',
        type: 'string',
        required: false,
        description: `The request's HTTP method.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `The request's name. It is recommended that you pass the \`name\` property in the request body. If you do not, the system uses a null value. As a result, this creates a request with a blank name.`,
      },
      {
        name: 'queryParams',
        type: 'array',
        required: false,
        description: `The request's query parameters.`,
      },
      {
        name: 'rawModeData',
        type: 'string',
        required: false,
        description: `The request body's raw mode data.`,
      },
      { name: 'url', type: 'string', required: false, description: `The request's URL.` },
    ],
  },
  {
    name: 'postmanmcp_createcollectionresponse',
    description: `Creates a request response in a collection. For a complete list of request body properties, refer to the **Response** entry in the [Postman Collection Format documentation](https://schema.postman.com/collection/json/v2.1.0/draft-07/docs/index.html).

**Note:**

It is recommended that you pass the \\\`name\\\` property in the request body. If you do not, the system uses a null value. As a result, this creates a response with a blank name.`,
    params: [
      { name: 'collectionId', type: 'string', required: true, description: `The collection's ID.` },
      { name: 'request', type: 'string', required: true, description: `The parent request's ID.` },
      {
        name: 'cookies',
        type: 'string',
        required: false,
        description: `The response's cookie data.`,
      },
      {
        name: 'dataMode',
        type: 'string',
        required: false,
        description: `The associated request body's data mode.`,
      },
      {
        name: 'dataOptions',
        type: 'string',
        required: false,
        description: `Additional configurations and options set for the request body's various data modes.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `The response's description.`,
      },
      { name: 'headers', type: 'array', required: false, description: `A list of headers.` },
      {
        name: 'language',
        type: 'string',
        required: false,
        description: `The response body's language type.`,
      },
      {
        name: 'method',
        type: 'string',
        required: false,
        description: `The request's HTTP method.`,
      },
      { name: 'mime', type: 'string', required: false, description: `The response's MIME type.` },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `The response's name. It is recommended that you pass the \`name\` property in the request body. If you do not, the system uses a null value. As a result, this creates a response with a blank name.`,
      },
      {
        name: 'rawDataType',
        type: 'string',
        required: false,
        description: `The response's raw data type.`,
      },
      {
        name: 'rawModeData',
        type: 'string',
        required: false,
        description: `The associated request body's raw mode data.`,
      },
      {
        name: 'requestObject',
        type: 'string',
        required: false,
        description: `A JSON-stringified representation of the associated request.`,
      },
      {
        name: 'responseCode',
        type: 'object',
        required: false,
        description: `The response's HTTP response code information.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `The response's HTTP status text.`,
      },
      {
        name: 'text',
        type: 'string',
        required: false,
        description: `The raw text of the response body.`,
      },
      {
        name: 'time',
        type: 'string',
        required: false,
        description: `The time taken by the request to complete, in milliseconds.`,
      },
      {
        name: 'url',
        type: 'string',
        required: false,
        description: `The associated request's URL.`,
      },
    ],
  },
  {
    name: 'postmanmcp_createenvironment',
    description: `Creates an environment.

**Note:**

- The request body size cannot exceed the maximum allowed size of 30MB.
- If you receive an HTTP \\\`411 Length Required\\\` error response, manually pass the \\\`Content-Length\\\` header and its value in the request header.
- If you do not include the \\\`workspace\\\` query parameter, the system creates the environment in the oldest personal Internal workspace you own.`,
    params: [
      { name: 'workspace', type: 'string', required: true, description: `The workspace's ID.` },
      {
        name: 'environment',
        type: 'object',
        required: false,
        description: `Information about the environment.`,
      },
    ],
  },
  {
    name: 'postmanmcp_createmock',
    description: `Creates a mock server in a collection.

- Pass the collection UID (ownerId-collectionId), not the bare collection ID.
- If you only have a \\\`collectionId\\\`, resolve the UID first:
  1) Prefer GET \\\`/collections/{collectionId}\\\` and read \\\`uid\\\`, or
  2) Construct \\\`{ownerId}-{collectionId}\\\` using ownerId from GET \\\`/me\\\`:
    - For team-owned collections: \\\`ownerId = me.teamId\\\`
    - For personal collections: \\\`ownerId = me.user.id\\\`
- Use the \\\`workspace\\\` query to place the mock in a specific workspace. Prefer explicit workspace scoping.`,
    params: [
      { name: 'workspace', type: 'string', required: true, description: `The workspace's ID.` },
      { name: 'mock', type: 'object', required: false, description: `No description.` },
    ],
  },
  {
    name: 'postmanmcp_createspec',
    description: `Creates an API specification in Postman's [Spec Hub](https://learning.postman.com/docs/design-apis/specifications/overview/). Specifications can be single or multi-file.

**Note:**
- Postman supports OpenAPI (2.0, 3.0, and 3.1), AsyncAPI (2.0 and 3.0), protobuf (2 and 3), GraphQL, and Smithy specifications.
- If the file path contains a \\\`/\\\` (forward slash) character, then a folder is created. For example, if the path is the \\\`components/schemas.json\\\` value, then a \\\`components\\\` folder is created with the \\\`schemas.json\\\` file inside.
- Multi-file specifications can only have one root file.
- Files cannot exceed a maximum of 12 MB in size.`,
    params: [
      {
        name: 'files',
        type: 'array',
        required: true,
        description: `A list of the specification's files and their contents.`,
      },
      { name: 'name', type: 'string', required: true, description: `The specification's name.` },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `The type of API specification.`,
      },
      { name: 'workspaceId', type: 'string', required: true, description: `The workspace's ID.` },
    ],
  },
  {
    name: 'postmanmcp_createspecfile',
    description: `Creates a file for an OpenAPI or a protobuf 2 or 3 specification.

**Note:**

- If the file path contains a \\\`/\\\` (forward slash) character, then a folder is created. For example, if the path is the \\\`components/schemas.json\\\` value, then a \\\`components\\\` folder is created with the \\\`schemas.json\\\` file inside.
- Creating a spec file assigns it the \\\`DEFAULT\\\` file type.
- Multi-file specifications can only have one root file.
- Files cannot exceed a maximum of 10 MB in size.`,
    params: [
      {
        name: 'content',
        type: 'string',
        required: true,
        description: `The file's stringified contents.`,
      },
      {
        name: 'path',
        type: 'string',
        required: true,
        description: `The file's path. Accepts JSON or YAML files.`,
      },
      { name: 'specId', type: 'string', required: true, description: `The spec's ID.` },
    ],
  },
  {
    name: 'postmanmcp_createworkspace',
    description: `Creates a new [workspace](https://learning.postman.com/docs/collaborating-in-postman/using-workspaces/creating-workspaces/).

**Note:**

- This endpoint returns a 403 \\\`Forbidden\\\` response if the user does not have permission to create workspaces. [Admins and Super Admins](https://learning.postman.com/docs/collaborating-in-postman/roles-and-permissions/#team-roles) can configure workspace permissions to restrict users and/or user groups from creating workspaces or require approvals for the creation of team workspaces.
- Private and [Partner Workspaces](https://learning.postman.com/docs/collaborating-in-postman/using-workspaces/partner-workspaces/) are available on Postman [**Team** and **Enterprise** plans](https://www.postman.com/pricing).
- There are rate limits when publishing public workspaces.
- Public team workspace names must be unique.
- The \\\`teamId\\\` property must be passed in the request body if [Postman Organizations](https://learning.postman.com/docs/administration/onboarding-checklist) is enabled.`,
    params: [
      {
        name: 'workspace',
        type: 'object',
        required: false,
        description: `Information about the workspace.`,
      },
    ],
  },
  {
    name: 'postmanmcp_duplicatecollection',
    description: `Creates a duplicate of the given collection in another workspace.

Use the GET \\\`/collection-duplicate-tasks/{taskId}\\\` endpoint to get the duplication task's current status.`,
    params: [
      {
        name: 'collectionId',
        type: 'string',
        required: true,
        description: `The collection's unique ID.`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: true,
        description: `The workspace ID in which to duplicate the collection.`,
      },
      {
        name: 'suffix',
        type: 'string',
        required: false,
        description: `An optional suffix to append to the duplicated collection's name.`,
      },
    ],
  },
  {
    name: 'postmanmcp_generatecollection',
    description: `Creates a collection from the given API specification.
The specification must already exist or be created before it can be used to generate a collection.
The response contains a polling link to the task status.`,
    params: [
      {
        name: 'elementType',
        type: 'string',
        required: true,
        description: `The \`collection\` element type.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The generated collection's name.`,
      },
      {
        name: 'options',
        type: 'object',
        required: true,
        description: `The advanced creation options and their values. For more details, see Postman's [OpenAPI to Postman Collection Converter OPTIONS documentation](https://github.com/postmanlabs/openapi-to-postman/blob/develop/OPTIONS.md). These properties are case-sensitive.`,
      },
      { name: 'specId', type: 'string', required: true, description: `The spec's ID.` },
    ],
  },
  {
    name: 'postmanmcp_generatespecfromcollection',
    description: `Generates an OpenAPI 2.0, 3.0, or 3.1 specification for the given collection. The response contains a polling link to the task status.`,
    params: [
      {
        name: 'collectionUid',
        type: 'string',
        required: true,
        description: `The collection's unique ID.`,
      },
      { name: 'elementType', type: 'string', required: true, description: `The \`spec\` value.` },
      {
        name: 'format',
        type: 'string',
        required: true,
        description: `The format of the API specification.`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `The API specification's name.`,
      },
      { name: 'type', type: 'string', required: true, description: `The specification's type.` },
    ],
  },
  {
    name: 'postmanmcp_getallspecs',
    description: `Gets all API specifications in a workspace.`,
    params: [
      { name: 'workspaceId', type: 'string', required: true, description: `The workspace's ID.` },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `The pointer to the first record of the set of paginated results. To view the next response, use the \`nextCursor\` value for this parameter.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The maximum number of rows to return in the response.`,
      },
    ],
  },
  {
    name: 'postmanmcp_getauthenticateduser',
    description: `Gets information about the authenticated user.
- This endpoint provides “current user” context (\\\`user.id\\\`, \\\`username\\\`, \\\`teamId\\\`, roles).
- When a user asks for “my …” (e.g., “my workspaces, my information, etc.”), call this first to resolve the user ID.`,
    params: [],
  },
  {
    name: 'postmanmcp_getcollection',
    description: `Get information about a collection. By default this tool returns the lightweight collection map (metadata + recursive itemRefs).
Use the model parameter to opt in to Postman's full API responses:
- model=minimal — root-level folder/request IDs only
- model=full — full Postman collection payload.`,
    params: [
      {
        name: 'collectionId',
        type: 'string',
        required: true,
        description: `The collection ID must be in the form <OWNER_ID>-<UUID> (e.g. 12345-33823532ab9e41c9b6fd12d0fd459b8b).`,
      },
      {
        name: 'access_key',
        type: 'string',
        required: false,
        description: `A collection's read-only access key. Using this query parameter does not require an API key to call the endpoint.`,
      },
      {
        name: 'model',
        type: 'string',
        required: false,
        description: `Optional response shape override. Omit to receive the lightweight collection map. Set to \`minimal\` for the Postman minimal model or \`full\` for the complete collection payload.`,
      },
    ],
  },
  {
    name: 'postmanmcp_getcollections',
    description: `The workspace ID query is required for this endpoint. If not provided, the LLM should ask the user to provide it.`,
    params: [
      { name: 'workspace', type: 'string', required: true, description: `The workspace's ID.` },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The maximum number of rows to return in the response.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Filter results by collections whose name exactly matches the given value. Partial or substring matches are not supported.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `The zero-based offset of the first item to return.`,
      },
    ],
  },
  {
    name: 'postmanmcp_getduplicatecollectiontaskstatus',
    description: `Gets the status of a collection duplication task.`,
    params: [
      { name: 'taskId', type: 'string', required: true, description: `The task's unique ID.` },
    ],
  },
  {
    name: 'postmanmcp_getenabledtools',
    description: `IMPORTANT: Run this tool first when a requested tool is unavailable. Returns information about which tools are enabled in the full and minimal tool sets, helping you identify available alternatives.`,
    params: [],
  },
  {
    name: 'postmanmcp_getenvironment',
    description: `Gets information about an environment.`,
    params: [
      {
        name: 'environmentId',
        type: 'string',
        required: true,
        description: `The environment's ID.`,
      },
    ],
  },
  {
    name: 'postmanmcp_getenvironments',
    description: `Gets information about all of your [environments](https://learning.postman.com/docs/sending-requests/managing-environments/).`,
    params: [
      { name: 'workspace', type: 'string', required: false, description: `The workspace's ID.` },
    ],
  },
  {
    name: 'postmanmcp_getgeneratedcollectionspecs',
    description: `Gets the API specification generated for the given collection.`,
    params: [
      {
        name: 'collectionUid',
        type: 'string',
        required: true,
        description: `The collection's unique ID.`,
      },
      { name: 'elementType', type: 'string', required: true, description: `The \`spec\` value.` },
    ],
  },
  {
    name: 'postmanmcp_getmock',
    description: `Gets information about a mock server.
- Resource: Mock server entity. Response includes the associated \\\`collection\\\` UID and \\\`mockUrl\\\`.
- Use the \\\`collection\\\` UID to navigate back to the source collection.`,
    params: [{ name: 'mockId', type: 'string', required: true, description: `The mock's ID.` }],
  },
  {
    name: 'postmanmcp_getmocks',
    description: `Gets all active mock servers. By default, returns only mock servers you created across all workspaces.

- Always pass either the \\\`workspace\\\` or \\\`teamId\\\` query to scope results. Prefer \\\`workspace\\\` when known.
- If you need team-scoped results, set \\\`teamId\\\` from the current user: call GET \\\`/me\\\` and use \\\`me.teamId\\\`.
- If both \\\`teamId\\\` and \\\`workspace\\\` are passed, only \\\`workspace\\\` is used.`,
    params: [
      {
        name: 'teamId',
        type: 'string',
        required: false,
        description: `Return only results that belong to the given team ID.
- For team-scoped requests, set this from GET \`/me\` (\`me.teamId\`).
`,
      },
      {
        name: 'workspace',
        type: 'string',
        required: false,
        description: `Return only results found in the given workspace ID.
- Prefer this parameter when the user mentions a specific workspace.
`,
      },
    ],
  },
  {
    name: 'postmanmcp_getspec',
    description: `Gets information about an API specification.`,
    params: [{ name: 'specId', type: 'string', required: true, description: `The spec's ID.` }],
  },
  {
    name: 'postmanmcp_getspeccollections',
    description: `Gets all of an API specification's generated collections.`,
    params: [
      {
        name: 'elementType',
        type: 'string',
        required: true,
        description: `The \`collection\` element type.`,
      },
      { name: 'specId', type: 'string', required: true, description: `The spec's ID.` },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `The pointer to the first record of the set of paginated results. To view the next response, use the \`nextCursor\` value for this parameter.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The maximum number of rows to return in the response.`,
      },
    ],
  },
  {
    name: 'postmanmcp_getspecdefinition',
    description: `Gets the complete contents of an OpenAPI or AsyncAPI specification's definition.`,
    params: [{ name: 'specId', type: 'string', required: true, description: `The spec's ID.` }],
  },
  {
    name: 'postmanmcp_getspecfile',
    description: `Gets the contents of an API specification's file.`,
    params: [
      { name: 'filePath', type: 'string', required: true, description: `The path to the file.` },
      { name: 'specId', type: 'string', required: true, description: `The spec's ID.` },
    ],
  },
  {
    name: 'postmanmcp_getspecfiles',
    description: `Gets all the files in an API specification.`,
    params: [{ name: 'specId', type: 'string', required: true, description: `The spec's ID.` }],
  },
  {
    name: 'postmanmcp_gettaggedentities',
    description: `**Requires an Enterprise plan.** Tagging is only available on Postman Enterprise plans. This tool returns a 404 error on Free, Basic, and Professional accounts.

Gets Postman elements (entities) by a given tag. Tags enable you to organize and search workspaces, APIs, and collections that contain shared tags.`,
    params: [
      {
        name: 'slug',
        type: 'string',
        required: true,
        description: `The tag's ID within a team or individual (non-team) user scope.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `The cursor to get the next set of results in the paginated response. If you pass an invalid value, the API only returns the first set of results.`,
      },
      {
        name: 'direction',
        type: 'string',
        required: false,
        description: `The ascending (\`asc\`) or descending (\`desc\`) order to sort the results by, based on the time of the entity's tagging.`,
      },
      {
        name: 'entityType',
        type: 'string',
        required: false,
        description: `Filter results for the given entity type.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The maximum number of tagged elements to return in a single call.`,
      },
    ],
  },
  {
    name: 'postmanmcp_getworkspace',
    description: `Gets information about a workspace.

**Note:**

This endpoint's response contains the \\\`visibility\\\` field. [Visibility](https://learning.postman.com/docs/collaborating-in-postman/using-workspaces/managing-workspaces/#changing-workspace-visibility) determines who can access the workspace:
- \\\`personal\\\` — Only you can access the workspace.
- \\\`team\\\` — All team members can access the workspace.
- \\\`private\\\` — Only invited team members can access the workspace ([**Team** and **Enterprise** plans only](https://www.postman.com/pricing)).
- \\\`public\\\` — Everyone can access the workspace.
- \\\`partner\\\` — Only invited team members and [partners](https://learning.postman.com/docs/collaborating-in-postman/using-workspaces/partner-workspaces/) can access the workspace ([**Team** and **Enterprise** plans only](https://www.postman.com/pricing)).`,
    params: [
      { name: 'workspaceId', type: 'string', required: true, description: `The workspace's ID.` },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Include the following information in the endpoint's response:
- \`mocks:deactivated\` — Include all deactivated mock servers in the response.
- \`scim\` — Return the SCIM user IDs of the workspace creator and who last modified it.
`,
      },
    ],
  },
  {
    name: 'postmanmcp_getworkspaces',
    description: `Gets all workspaces you have access to.
- For “my …” requests, first call GET \\\`/me\\\` and pass \\\`createdBy={me.user.id}\\\`.
- This endpoint's response contains the visibility field. Visibility determines who can access the workspace:
  - \\\`personal\\\` — Only you can access the workspace.
  - \\\`team\\\` — All team members can access the workspace.
  - \\\`private\\\` — Only invited team members can access the workspace (Professional and Enterprise).
  - \\\`public\\\` — Everyone can access the workspace.
  - \\\`partner\\\` — Invited team members and partners (Professional and Enterprise).
- For tools that require the workspace ID, and no workspace ID is provided, ask the user to provide the workspace ID. If the user does not provide the workspace ID, call this first with the createdBy parameter to use the first workspace.
- Results are paginated. Use the \\\`cursor\\\` parameter to retrieve additional pages.
- Examples:
  - “List my workspaces” → GET \\\`/me\\\`, then GET \\\`/workspaces?createdBy={me.user.id}&limit=100\\\`
  - “List my personal workspaces” → GET \\\`/me\\\`, then GET \\\`/workspaces?type=personal&createdBy={me.user.id}&limit=100\\\`
  - “List all public workspaces” → GET \\\`/workspaces?type=public&limit=100\\\``,
    params: [
      {
        name: 'createdBy',
        type: 'integer',
        required: false,
        description: `Return only workspaces created by the specified Postman user ID.
- For “my …” requests, set \`createdBy\` to the current user’s ID from GET \`/me\` (\`me.user.id\`).
- If the user's ID is not known, first call GET \`/me\`, then retry with \`createdBy\`.
`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `The cursor to get the next set of results in a paginated response. Get this value from the \`meta.nextCursor\` field in the previous response.
`,
      },
      {
        name: 'elementId',
        type: 'string',
        required: false,
        description: `Filter results to return the workspace where the given element's ID is located. When filtering by collection, you must use the collection's unique ID (\`userId\`-\`collection\`). If you pass this query parameter, you must also pass the \`elementType\` query parameter.`,
      },
      {
        name: 'elementType',
        type: 'string',
        required: false,
        description: `Filter results to return the workspace where the given element type is located. If you pass this query parameter, you must also pass the \`elementId\` query parameter.`,
      },
      {
        name: 'include',
        type: 'string',
        required: false,
        description: `Include the following information in the endpoint's response:
- \`mocks:deactivated\` — Include all deactivated mock servers in the response.
- \`scim\` — Return the SCIM user IDs of the workspace creator and who last modified it.
`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The maximum number of workspaces to return per page. Defaults to 100.
`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `The type of workspace to filter the response by. One of: \`personal\`, \`team\`, \`private\`, \`public\`, \`partner\`.
- For “my …” requests, this can be combined with \`createdBy\`. If type is not specified, it will search across all types for that user.
`,
      },
    ],
  },
  {
    name: 'postmanmcp_publishmock',
    description: `Publishes a mock server. Publishing a mock server sets its **Access Control** configuration setting to public.`,
    params: [{ name: 'mockId', type: 'string', required: true, description: `The mock's ID.` }],
  },
  {
    name: 'postmanmcp_putcollection',
    description: `Replaces the contents of a collection using the [Postman Collection v2.1.0 schema format](https://schema.postman.com/collection/json/v2.1.0/draft-07/docs/index.html). Include the collection's ID values in the request body. If you do not, the endpoint removes the existing items and creates new items.

- To perform an update asynchronously, use the \\\`Prefer\\\` header with the \\\`respond-async\\\` value. When performing an async update, this endpoint returns a HTTP \\\`202 Accepted\\\` response.
- For a complete list of properties and information, see the [Postman Collection Format documentation](https://schema.postman.com/collection/json/v2.1.0/draft-07/docs/index.html).
- For protocol profile behavior, refer to Postman's [Protocol Profile Behavior documentation](https://github.com/postmanlabs/postman-runtime/blob/develop/docs/protocol-profile-behavior.md).

**Note:**

- The maximum collection size this endpoint accepts cannot exceed 100 MB.
- Use the GET \\\`/collection-updates-tasks/{taskId}\\\` endpoint to get the collection's update status when performing an asynchronous update.
- If you don't include the collection items' ID values from the request body, the endpoint **removes** the existing items and recreates the items with new ID values.
- To copy another collection's contents to the given collection, remove all ID values before you pass it in this endpoint. If you do not, this endpoint returns an error. These values include the \\\`id\\\`, \\\`uid\\\`, and \\\`postman_id\\\` values.`,
    params: [
      {
        name: 'collectionId',
        type: 'string',
        required: true,
        description: `The collection ID must be in the form <OWNER_ID>-<UUID> (e.g. 12345-33823532ab9e41c9b6fd12d0fd459b8b).`,
      },
      { name: 'collection', type: 'object', required: false, description: `No description.` },
      {
        name: 'Prefer',
        type: 'string',
        required: false,
        description: `The \`respond-async\` header to perform the update asynchronously.`,
      },
    ],
  },
  {
    name: 'postmanmcp_putenvironment',
    description: `Replaces all the contents of an environment with the given information.

**Note:**

- The request body size cannot exceed the maximum allowed size of 30MB.
- If you receive an HTTP \\\`411 Length Required\\\` error response, manually pass the \\\`Content-Length\\\` header and its value in the request header.`,
    params: [
      {
        name: 'environmentId',
        type: 'string',
        required: true,
        description: `The environment's ID.`,
      },
      {
        name: 'environment',
        type: 'object',
        required: false,
        description: `Information about the environment.`,
      },
    ],
  },
  {
    name: 'postmanmcp_searchpostmanelements',
    description: `Search for Postman entities (requests, collections, workspaces, specs, flows, environments, and mocks).

**Ownership:**
- \`organization\` — Search within all resources owned by your organization (default).
- \`external\` — Search within the public Postman network (third-party and community APIs).
- \`all\` — Search across all scopes.

**When to use each ownership value and filters:**

| Goal | Recommended approach |
|------|----------------------|
| Find an internal API (e.g. "our notification service") | \`ownership: organization\` |
| Find a trusted API published to the Private Network | \`ownership: organization\` + \`privateNetwork: true\` filter |
| Find an internal API in all resources of organization and are visible to the organization only | \`ownership: organization\` + \`visibility: internal\` filter |
| Find an API by your organization that is made publicly visible | \`ownership: organization\` + \`visibility: public\` filter |
| Find a third party publicly visible API (e.g. "Stripe API", "Twilio API") | \`ownership: external\` + \`visibility: public\` filter |
| User says "our APIs", "internal", "team" | \`ownership: organization\` |
| Search across all scopes | \`ownership: all\` |

**Element Types:**
- \`requests\`: Search for individual API requests.
- \`collections\`: Search for API collections.
- \`workspaces\`: Search for Postman workspaces.
- \`specs\`: Search for API specifications.
- \`flows\`: Search for Postman Flows.
- \`environments\`: Search for Postman Environments.
- \`mocks\`: Search for Postman Mock Servers.

**Filters:**

Use the \`filters\` parameter to narrow results. The top-level key must be \`$and\` with an array of condition objects. Each condition object must contain exactly one field key.

Supported filter fields:
| Field | Operators | Notes |
|-------|-----------|-------|
| \`workspaceId\` | \`$eq\`, \`$ne\`, \`$in\`, \`$nin\` | All element types. \`$in\`/\`$nin\` accept arrays. |
| \`collectionId\` | \`$eq\`, \`$ne\`, \`$in\`, \`$nin\` | Requests and collections only. |
| \`visibility\` | \`$eq\`, \`$ne\` | Values: \`public\`, \`partner\`, \`internal\`. All element types. |
| \`privateNetwork\` | \`$eq\`, \`$ne\` | Boolean. All element types. |
| \`publisherIsVerified\` | \`$eq\`, \`$ne\` | Boolean. All element types. |
| \`method\` | \`$eq\`, \`$ne\`, \`$in\`, \`$nin\` | HTTP methods (GET, POST, etc.). Requests only. |
| \`tags\` | \`$eq\`, \`$ne\`, \`$in\`, \`$nin\` | Workspaces and collections only. |
| \`requestId\` | \`$eq\`, \`$ne\`, \`$in\`, \`$nin\` | Requests only. |
| \`specificationId\` | \`$eq\`, \`$ne\`, \`$in\`, \`$nin\` | Specs only. |
| \`flowId\` | \`$eq\`, \`$ne\`, \`$in\`, \`$nin\` | Flows only. |
| \`createdBy\` | \`$eq\`, \`$ne\`, \`$in\`, \`$nin\` | All element types. |
| \`organizationId\` | \`$eq\`, \`$ne\`, \`$in\`, \`$nin\` | All element types. |
| \`teamId\` | \`$eq\`, \`$ne\`, \`$in\`, \`$nin\` | All element types. |
| \`isGitConnected\` | \`$eq\`, \`$ne\` | Boolean. Workspaces, collections, requests, specs, flows, environments, mocks. |
| \`type\` | \`$eq\`, \`$ne\`, \`$in\`, \`$nin\` | Requests only. |

**Filter examples:**
- Private API Network only: \`{"$and":[{"privateNetwork":{"$eq":true}}]}\`
- Single workspace: \`{"$and":[{"workspaceId":{"$eq":"ws-abc123"}}]}\`
- Multiple workspaces: \`{"$and":[{"workspaceId":{"$in":["ws-1","ws-2"]}}]}\`
- Public visibility: \`{"$and":[{"visibility":{"$eq":"public"}}]}\`
- GET requests only: \`{"$and":[{"method":{"$eq":"GET"}}]}\`
- Combine conditions: \`{"$and":[{"visibility":{"$eq":"public"}},{"workspaceId":{"$eq":"ws-abc123"}}]}\`
- Environments in a workspace: \`{"$and":[{"workspaceId":{"$eq":"ws-abc123"}}]}\``,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `The cursor to get the next set of results in the paginated response. Pass the \`nextCursor\` value from the previous response.`,
      },
      {
        name: 'entityType',
        type: 'string',
        required: false,
        description: `The type of Postman entity to search for: \`requests\` (individual API requests), \`collections\` (API collections), \`workspaces\` (Postman workspaces), \`specs\` (API specifications), \`flows\` (Postman Flows), \`environments\` (Postman Environments), or \`mocks\` (Postman Mock Servers).`,
      },
      {
        name: 'filters',
        type: 'object',
        required: false,
        description: `Structured filter expression. Top-level key must be "$and" with an array of condition objects. Each condition: { "<field>": { "<operator>": <value> } }. Example: {"$and":[{"privateNetwork":{"$eq":true}}]}`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `The maximum number of search results to return. Maximum: 25.`,
      },
      {
        name: 'ownership',
        type: 'string',
        required: false,
        description: `The ownership scope. Use \`organization\` to search all resources in your organization (default), \`external\` to search the public Postman network, or \`all\` to search across all scopes.`,
      },
      {
        name: 'q',
        type: 'string',
        required: false,
        description: `The search query (e.g. "payment API", "notification service", "Stripe").`,
      },
    ],
  },
  {
    name: 'postmanmcp_synccollectionwithspec',
    description: `Syncs a collection generated from an API specification. This is an asynchronous endpoint that returns an HTTP \\\`202 Accepted\\\` response.

**Note:**

- This endpoint only supports the OpenAPI 2.0, 3.0, and 3.1 specification types.
- You can only sync collections generated from the given spec ID.`,
    params: [
      {
        name: 'collectionUid',
        type: 'string',
        required: true,
        description: `The collection's unique ID.`,
      },
      { name: 'specId', type: 'string', required: true, description: `The spec's ID.` },
    ],
  },
  {
    name: 'postmanmcp_syncspecwithcollection',
    description: `Syncs an API specification linked to a collection. This is an asynchronous endpoint that returns an HTTP \\\`202 Accepted\\\` response.

**Note:**

- This endpoint only supports the OpenAPI 2.0, 3.0, and 3.1 specification types.
- You can only sync collections generated from the given specification ID.`,
    params: [
      {
        name: 'collectionUid',
        type: 'string',
        required: true,
        description: `The collection's unique ID.`,
      },
      { name: 'specId', type: 'string', required: true, description: `The spec's ID.` },
    ],
  },
  {
    name: 'postmanmcp_updatecollectionrequest',
    description: `Updates a request in a collection. For a complete list of properties, refer to the **Request** entry in the [Postman Collection Format documentation](https://schema.postman.com/collection/json/v2.1.0/draft-07/docs/index.html).

**Note:**

- You must pass a collection ID (\\\`12ece9e1-2abf-4edc-8e34-de66e74114d2\\\`), not a collection(\\\`12345678-12ece9e1-2abf-4edc-8e34-de66e74114d2\\\`), in this endpoint.
- This endpoint does not support changing the folder of a request.
- This endpoint acts like a PATCH method. It only updates the values that you pass in the request body.`,
    params: [
      { name: 'collectionId', type: 'string', required: true, description: `The collection's ID.` },
      { name: 'requestId', type: 'string', required: true, description: `The request's ID.` },
      {
        name: 'auth',
        type: 'string',
        required: false,
        description: `The request's authentication information.`,
      },
      {
        name: 'data',
        type: 'string',
        required: false,
        description: `The request body's form data.`,
      },
      {
        name: 'dataMode',
        type: 'string',
        required: false,
        description: `The request body's data mode.`,
      },
      {
        name: 'dataOptions',
        type: 'string',
        required: false,
        description: `Additional configurations and options set for the request body's various data modes.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `The request's description.`,
      },
      {
        name: 'events',
        type: 'string',
        required: false,
        description: `A list of scripts configured to run when specific events occur.`,
      },
      {
        name: 'graphqlModeData',
        type: 'string',
        required: false,
        description: `The request body's GraphQL mode data.`,
      },
      { name: 'headerData', type: 'array', required: false, description: `The request's headers.` },
      {
        name: 'method',
        type: 'string',
        required: false,
        description: `The request's HTTP method.`,
      },
      { name: 'name', type: 'string', required: false, description: `The request's name.` },
      {
        name: 'queryParams',
        type: 'array',
        required: false,
        description: `The request's query parameters.`,
      },
      {
        name: 'rawModeData',
        type: 'string',
        required: false,
        description: `The request body's raw mode data.`,
      },
      { name: 'url', type: 'string', required: false, description: `The request's URL.` },
    ],
  },
  {
    name: 'postmanmcp_updatemock',
    description: `Updates a mock server.
- Resource: Mock server entity associated with a collection UID.
- Use this to change name, environment, privacy, or default server response.
- To activate a server response, set \\\`config.serverResponseId\\\` to the server response's \\\`id\\\`. Pass \\\`null\\\` to deactivate.`,
    params: [
      { name: 'mockId', type: 'string', required: true, description: `The mock's ID.` },
      { name: 'mock', type: 'object', required: false, description: `No description.` },
    ],
  },
  {
    name: 'postmanmcp_updatespecfile',
    description: `Updates a file for an OpenAPI or protobuf 2 or 3 specification.

**Note:**

- This endpoint does not accept an empty request body. You must pass one of the accepted values.
- This endpoint does not accept multiple request body properties in a single call. For example, you cannot pass both the \\\`content\\\` and \\\`type\\\` property at the same time.
- Multi-file specifications can only have one root file.
- When updating a file type to \\\`ROOT\\\`, the previous root file is updated to the \\\`DEFAULT\\\` file type.
- Files cannot exceed a maximum of 10 MB in size.`,
    params: [
      { name: 'filePath', type: 'string', required: true, description: `The path to the file.` },
      { name: 'specId', type: 'string', required: true, description: `The spec's ID.` },
      {
        name: 'content',
        type: 'string',
        required: false,
        description: `The specification's stringified contents.`,
      },
      { name: 'name', type: 'string', required: false, description: `The file's name.` },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `The type of file:
- \`ROOT\` — The file containing the full OpenAPI structure. This serves as the entry point for the API spec and references other (\`DEFAULT\`) spec files. Multi-file specs can only have one root file.
- \`DEFAULT\` — A file referenced by the \`ROOT\` file.
`,
      },
    ],
  },
  {
    name: 'postmanmcp_updatespecproperties',
    description: `Updates an API specification's properties, such as its name.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `The spec's name.` },
      { name: 'specId', type: 'string', required: true, description: `The spec's ID.` },
    ],
  },
  {
    name: 'postmanmcp_updateworkspace',
    description: `Updates a workspace's property, such as its name or visibility.

**Note:**

- This endpoint does not support the following visibility changes:
  - \\\`private\\\` to \\\`public\\\`, \\\`public\\\` to \\\`private\\\`, and \\\`private\\\` to \\\`personal\\\` for **Free** and **Solo** [plans](https://www.postman.com/pricing/).
  - \\\`public\\\` to \\\`personal\\\` for team users only.
- There are rate limits when publishing public workspaces.
- Public team workspace names must be unique.`,
    params: [
      { name: 'workspaceId', type: 'string', required: true, description: `The workspace's ID.` },
      { name: 'workspace', type: 'object', required: false, description: `No description.` },
    ],
  },
]
