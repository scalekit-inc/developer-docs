import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'makemcp_app_documentation_get',
    description: `Retrieves markdown documentation for the specific Make App. Use when configuring Make Apps and Modules and when you need to learn more about the available capabilities.`,
    params: [
      { name: 'appName', type: 'string', required: true, description: `Name of the App to get the documentation for.` },
    ],
  },
  {
    name: 'makemcp_app-module_get',
    description: `Retrieves a single Module from the given App in the given Organization.`,
    params: [
      { name: 'appName', type: 'string', required: true, description: `Name of the App from which Module should be retrieved.` },
      { name: 'appVersion', type: 'integer', required: true, description: `Version of the App from which Module should be retrieved.` },
      { name: 'moduleName', type: 'string', required: true, description: `Name of the Module to retrieve.` },
      { name: 'organizationId', type: 'integer', required: true, description: `The ID of the Organization to get App Module for.` },
      { name: 'format', type: 'string', required: false, description: `Format of the output allowing transformation before being returned.` },
    ],
  },
  {
    name: 'makemcp_app-modules_list',
    description: `Retrieves a list of Modules available for the given App in the given Organization and Team.`,
    params: [
      { name: 'appName', type: 'string', required: true, description: `Name of the App from which Modules should be listed.` },
      { name: 'appVersion', type: 'integer', required: true, description: `Version of the App from which Modules should be listed.` },
      { name: 'organizationId', type: 'integer', required: true, description: `The ID of the Organization to list App Modules for.` },
      { name: 'usage', type: 'string', required: false, description: `Optionally applies usage filter to return only modules that are relevant for it.` },
    ],
  },
  {
    name: 'makemcp_apps_recommend',
    description: `Based on the user's intention, recommend applications that can assist in achieving their goals. This tool should provide a list of applications that are relevant to the user's needs, including their names and versions.`,
    params: [
      { name: 'intention', type: 'string', required: true, description: `The intention for which the recommended apps are requested. This should be a clear and concise description of the user's needs or goals.` },
    ],
  },
  {
    name: 'makemcp_connection-metadata_get',
    description: `Retrieves metadata of the given connection, or returns an error when the connection type doesn't exist.`,
    params: [
      { name: 'typeName', type: 'string', required: true, description: `Name of the Connection to retrieve metadata for.` },
    ],
  },
  {
    name: 'makemcp_connections_get',
    description: `Get connection (connections): Get details of a specific connection.`,
    params: [
      { name: 'connectionId', type: 'number', required: true, description: `The connection ID to get` },
    ],
  },
  {
    name: 'makemcp_connections_list',
    description: `List connections (connections): List connections for a team.`,
    params: [
      { name: 'teamId', type: 'number', required: true, description: `The team ID to list connections for` },
      { name: 'scopes', type: 'object', required: false, description: `Scopes that are required on the requested connection types. Each connection type is a key in this object with an array of scopes as the value.` },
      { name: 'type', type: 'array', required: false, description: `Filter by connection type` },
    ],
  },
  {
    name: 'makemcp_credential-requests_create',
    description: `Create credential request (credential-requests): Create a credential request for the currently authenticated user to set up connections and keys. This will return a URL where the user can authorize the credentials, so that they can be used in scenarios.`,
    params: [
      { name: 'credentials', type: 'array', required: true, description: `Array of app/module selections to derive credentials from.` },
      { name: 'teamId', type: 'number', required: true, description: `Team ID` },
      { name: 'description', type: 'string', required: false, description: `Description of the Request which will be displayed to the End Users who open it.` },
      { name: 'name', type: 'string', required: false, description: `Name of the Request which will be displayed to the End Users who open it.` },
    ],
  },
  {
    name: 'makemcp_credential-requests_create-by-credentials',
    description: `Create credential request by connection/key types (credential-requests): Create a credential request for one or more connections (OAuth) and/or keys (API keys) by their type identifiers (e.g. "google", "slack", "apikeyauth"). Use this when you know the exact connection or key types needed. The response includes the created request, an array of credentials associated with the request, and a publicUri where the end-user must go to authorize the requested credentials. At least one connection or one key must be provided.`,
    params: [
      { name: 'teamId', type: 'number', required: true, description: `The numeric ID of the Make team where the connections/keys will be created once authorized.` },
      { name: 'connections', type: 'array', required: false, description: `Array of OAuth or basic-auth connections to request. Each item needs at least a "type" (e.g. "google", "slack", "github").` },
      { name: 'description', type: 'string', required: false, description: `Instructions or context for the end-user, displayed on the authorization page.` },
      { name: 'keys', type: 'array', required: false, description: `Array of API keys to request. Each item needs at least a "type" (e.g. "apikeyauth", "basicauth").` },
      { name: 'name', type: 'string', required: false, description: `Human-readable name for the credential request, displayed to the end-user who will authorize it.` },
    ],
  },
  {
    name: 'makemcp_credential-requests_credential-decline',
    description: `Decline credential (credential-requests): Decline a credential authorization request by ID, setting its status to "declined" and preventing it from being authorized. An optional reason can be provided to explain the decision. This operation is idempotent - declining an already-declined credential has no additional effect.`,
    params: [
      { name: 'credentialId', type: 'string', required: true, description: `The credential ID to decline` },
      { name: 'reason', type: 'string', required: false, description: `Optional reason for declining` },
    ],
  },
  {
    name: 'makemcp_credential-requests_credential-delete',
    description: `Delete credential (credential-requests): Delete a credential (e.g., revoke OAuth tokens or remove stored API keys) and reset its state to pending. Use this when a credential needs re-authorization with updated permissions, tokens have become stale, or you want to force re-authentication. After deletion, the credential can be authorized again through the normal flow.`,
    params: [
      { name: 'credentialId', type: 'string', required: true, description: `The credential ID to delete` },
    ],
  },
  {
    name: 'makemcp_credential-requests_delete',
    description: `Delete credential request (credential-requests): Permanently delete a credential request and all associated credentials (connections and API keys) by ID. Any scenarios using connections from this request will lose access to the corresponding services. This action cannot be undone.`,
    params: [
      { name: 'requestId', type: 'string', required: true, description: `The credential request ID to delete` },
    ],
  },
  {
    name: 'makemcp_credential-requests_extend-connection',
    description: `Extend connection OAuth scopes (credential-requests): Add new OAuth scopes to an existing connection. Use this when a connection exists but lacks the permissions (scopes) needed for a specific operation. Creates a credential request that the end-user must authorize via the returned publicUri to grant the additional scopes. Fails if all requested scopes are already present on the connection.`,
    params: [
      { name: 'connectionId', type: 'number', required: true, description: `The numeric ID of an existing Make connection whose OAuth scopes need to be expanded.` },
      { name: 'scopes', type: 'array', required: true, description: `One or more new OAuth scope strings to add to the connection. At least one scope must be new (not already granted).` },
    ],
  },
  {
    name: 'makemcp_credential-requests_get',
    description: `Get credential request details (credential-requests): Retrieve detailed information about a specific credential request by its ID. Returns all associated credentials with their authorization status, provider configuration, user details, and authorization URLs for pending credentials. Use this to check the state of credentials within a request.`,
    params: [
      { name: 'requestId', type: 'string', required: true, description: `The credential request ID to get details for` },
    ],
  },
  {
    name: 'makemcp_credential-requests_list',
    description: `List credential requests (credential-requests): Retrieve a list of credential requests. Each request can contain multiple credentials (connections and API keys). Filter by team, user, provider, status, or name to find specific requests.`,
    params: [
      { name: 'teamId', type: 'number', required: true, description: `Filter by team ID` },
      { name: 'makeProviderId', type: 'string', required: false, description: `Filter by Make provider ID` },
      { name: 'name', type: 'string', required: false, description: `Filter by name` },
      { name: 'status', type: 'string', required: false, description: `Filter by status` },
      { name: 'userId', type: 'number', required: false, description: `Filter by user ID` },
    ],
  },
  {
    name: 'makemcp_credential-requests_list-app-modules-with-creden',
    description: `List app modules with credentials (credential-requests): List all modules of a given Make app (and version) that require credentials, along with the required credential type and OAuth scopes. Use this to discover which modules exist for an app before constructing a credential request — the returned \`id\` values are what you pass in \`credentials[].appModules\` for \`credential-requests_create\`. For custom/SDK apps, prefix the app name with \`app#\` (e.g. \`app#my-custom-app\`).`,
    params: [
      { name: 'appName', type: 'string', required: true, description: `App name (e.g. \`slack\`). For custom/SDK apps, prefix with \`app#\` (e.g. \`app#my-custom-app\`).` },
      { name: 'appVersion', type: 'string', required: true, description: `App major version number (e.g. \`4\`), or the literal string \`"latest"\`.` },
    ],
  },
  {
    name: 'makemcp_custom_apps_connections_configure',
    description: `Create new connection or update existing connection.`,
    params: [
      { name: 'mode', type: 'string', required: true, description: `Specify whether to create a new connection or update an existing one` },
      { name: 'appName', type: 'string', required: false, description: `Required for CREATE mode. The name of the app to create the connection for` },
      { name: 'connectionName', type: 'string', required: false, description: `Required for UPDATE mode only. The connection ID (auto-generated during creation, typically appName or appName with suffix)` },
      { name: 'label', type: 'string', required: false, description: `Required for CREATE mode. The title of the connection, visible in the scenario builder. Will update when in UPDATE mode` },
      { name: 'sections', type: 'object', required: false, description: `Configure connection sections: api, parameters, scopes, scope. Each section value can be a JSON value (object/array) or a JSONC string (to preserve comments). Example: {"api": {"baseUrl": "https://api.example.com"}, "parameters": [{"name": "apikey", "type": "text", "required": true}]}` },
      { name: 'type', type: 'string', required: false, description: `Required for CREATE mode. The type of the connection` },
    ],
  },
  {
    name: 'makemcp_custom_apps_connections_delete',
    description: `Delete a connection`,
    params: [
      { name: 'connectionName', type: 'string', required: true, description: `The name of the connection` },
    ],
  },
  {
    name: 'makemcp_custom_apps_connections_fetch',
    description: `List all connections for an app or get metadata for a specific connection with optional sections.`,
    params: [
      { name: 'appName', type: 'string', required: false, description: `The name of the app. Required when listing all connections for an app.` },
      { name: 'connectionName', type: 'string', required: false, description: `The connection ID (often identical to the app name). If provided, gets this specific connection.` },
      { name: 'sections', type: 'array', required: false, description: `Optional sections to include when fetching a specific connection.` },
    ],
  },
  {
    name: 'makemcp_custom_apps_create',
    description: `Create new custom app. This is is the first step in creating a new custom app for Make.com Note that the "name" that you pass in is just a prefix and the "name" in the response is  the identifier for the app that needs to be passed in later requests`,
    params: [
      { name: 'label', type: 'string', required: true, description: `The title of your custom app. This field is required, and users will see it in the app list.` },
      { name: 'description', type: 'string', required: false, description: `Optional short description of your custom app.` },
      { name: 'name', type: 'string', required: false, description: `The prefix for the app id, the created app will contain a random string postfix, which should be included when referencing the app for later operations` },
      { name: 'theme', type: 'string', required: false, description: `The color that Make uses for your custom app modules and forms.` },
    ],
  },
  {
    name: 'makemcp_custom_apps_delete',
    description: `Delete a custom app by name and version`,
    params: [
      { name: 'name', type: 'string', required: true, description: `The name of the app` },
      { name: 'version', type: 'number', required: true, description: `The version of the app` },
    ],
  },
  {
    name: 'makemcp_custom_apps_fetch',
    description: `List existing custom apps or get metadata for a specific app with optional sections and/or docs.`,
    params: [
      { name: 'appName', type: 'string', required: false, description: `The name of the app. If not provided, all apps will be listed.` },
      { name: 'appVersion', type: 'number', required: false, description: `The version of the app. Required only when appName is provided.` },
      { name: 'includeDocs', type: 'boolean', required: false, description: `Whether to include app documentation (readme) in the response.` },
      { name: 'sections', type: 'array', required: false, description: `Optional sections to include when fetching a specific app. Available sections: base, groups, install, installSpec.` },
    ],
  },
  {
    name: 'makemcp_custom_apps_functions_create',
    description: `Create a new function`,
    params: [
      { name: 'appName', type: 'string', required: true, description: `The name of an app.` },
      { name: 'appVersion', type: 'integer', required: true, description: `The version of the app` },
      { name: 'name', type: 'string', required: true, description: `The name of the function` },
    ],
  },
  {
    name: 'makemcp_custom_apps_functions_delete',
    description: `Delete a function`,
    params: [
      { name: 'appName', type: 'string', required: true, description: `The name of an app.` },
      { name: 'appVersion', type: 'integer', required: true, description: `The version of the app` },
      { name: 'functionName', type: 'string', required: true, description: `The name of the function` },
    ],
  },
  {
    name: 'makemcp_custom_apps_functions_fetch',
    description: `List all functions for an app or get a specific function by name`,
    params: [
      { name: 'appName', type: 'string', required: true, description: `The name of the app` },
      { name: 'appVersion', type: 'number', required: true, description: `The version of the app` },
      { name: 'functionName', type: 'string', required: false, description: `The name of the function. If not provided, all functions will be listed.` },
    ],
  },
  {
    name: 'makemcp_custom_apps_functions_get_code',
    description: `Get function code`,
    params: [
      { name: 'appName', type: 'string', required: true, description: `The name of an app.` },
      { name: 'appVersion', type: 'integer', required: true, description: `The version of the app` },
      { name: 'functionName', type: 'string', required: true, description: `The name of the function` },
    ],
  },
  {
    name: 'makemcp_custom_apps_functions_get_test',
    description: `Get function test code`,
    params: [
      { name: 'appName', type: 'string', required: true, description: `The name of an app.` },
      { name: 'appVersion', type: 'integer', required: true, description: `The version of the app` },
      { name: 'functionName', type: 'string', required: true, description: `The name of the function` },
    ],
  },
  {
    name: 'makemcp_custom_apps_functions_set_code',
    description: `Set/update function code`,
    params: [
      { name: 'appName', type: 'string', required: true, description: `The name of an app.` },
      { name: 'appVersion', type: 'integer', required: true, description: `The version of the app` },
      { name: 'code', type: 'string', required: true, description: `The function code` },
      { name: 'functionName', type: 'string', required: true, description: `The name of the function` },
    ],
  },
  {
    name: 'makemcp_custom_apps_functions_set_test',
    description: `Set/update function test code`,
    params: [
      { name: 'appName', type: 'string', required: true, description: `The name of an app.` },
      { name: 'appVersion', type: 'integer', required: true, description: `The version of the app` },
      { name: 'functionName', type: 'string', required: true, description: `The name of the function` },
      { name: 'test', type: 'string', required: true, description: `The test code` },
    ],
  },
  {
    name: 'makemcp_custom_apps_get_example',
    description: `Retrieve an example for a specific tool input.`,
    params: [
      { name: 'tool', type: 'string', required: true, description: `Name of tool, excluding the custom_apps_ prefix.  only connections_configure is available.` },
      { name: 'example_key', type: 'string', required: false, description: `No description.` },
    ],
  },
  {
    name: 'makemcp_custom_apps_modules_configure',
    description: `Create new modules or update existing modules and their sections in a single operation.`,
    params: [
      { name: 'appName', type: 'string', required: true, description: `The name of an app.` },
      { name: 'appVersion', type: 'integer', required: true, description: `The version of the app` },
      { name: 'mode', type: 'string', required: true, description: `Specify whether to create a new module or update an existing one` },
      { name: 'moduleName', type: 'string', required: true, description: `The name (id) of the module` },
      { name: 'connection', type: 'string', required: false, description: `The name (id) of the connection to link to this module` },
      { name: 'description', type: 'string', required: false, description: `Short description of the module` },
      { name: 'label', type: 'string', required: false, description: `Required for CREATE mode. The title of the module, visible to users in the scenario builder` },
      { name: 'sections', type: 'object', required: false, description: `Configure module sections: communication, mappable_parameters, interface, scope, epoch, etc. Each section value can be a JSON value (object/array) or a JSONC string (to preserve comments). Example: {"communication": {"url": "/api/endpoint", "method": "GET"}, "mappable_parameters": [{"name": "id", "type": "text", "required": true}]}` },
      { name: 'typeId', type: 'number', required: false, description: `Required for CREATE mode. The type ID of the module - see description for mapping` },
    ],
  },
  {
    name: 'makemcp_custom_apps_modules_delete',
    description: `Delete a module`,
    params: [
      { name: 'appName', type: 'string', required: true, description: `The name of an app.` },
      { name: 'appVersion', type: 'integer', required: true, description: `The version of the app` },
      { name: 'moduleName', type: 'string', required: true, description: `The name of the module` },
    ],
  },
  {
    name: 'makemcp_custom_apps_modules_fetch',
    description: `List all modules for an app or get metadata for a specific module with optional sections.`,
    params: [
      { name: 'appName', type: 'string', required: true, description: `The name of the app` },
      { name: 'appVersion', type: 'number', required: true, description: `The version of the app` },
      { name: 'moduleName', type: 'string', required: false, description: `The name of the module. If not provided, all modules will be listed.` },
      { name: 'sections', type: 'array', required: false, description: `Optional sections to include when fetching a specific module. Available sections: communication, mappable_parameters, interface, scope, epoch, samples, static_parameters.` },
    ],
  },
  {
    name: 'makemcp_custom_apps_rpcs_configure',
    description: `Create new RPC or update existing RPC and their sections in a single operation.`,
    params: [
      { name: 'appName', type: 'string', required: true, description: `The name of an app.` },
      { name: 'appVersion', type: 'integer', required: true, description: `The version of the app` },
      { name: 'mode', type: 'string', required: true, description: `Specify whether to create a new RPC or update an existing one` },
      { name: 'rpcName', type: 'string', required: true, description: `For CREATE mode: The identifier to assign to the new RPC. For UPDATE mode: The existing RPC identifier to modify.` },
      { name: 'connection', type: 'string', required: false, description: `Connection name` },
      { name: 'label', type: 'string', required: false, description: `The title of the RPC visible in the scenario builder` },
      { name: 'sections', type: 'object', required: false, description: `Configure RPC sections: api, parameters. Each section value can be a JSON value (object/array) or a JSONC string (to preserve comments). Example: {"api": {"url": "/api/endpoint", "method": "POST"}, "parameters": [{"name": "param1", "type": "text", "required": true}]}` },
    ],
  },
  {
    name: 'makemcp_custom_apps_rpcs_delete',
    description: `Delete an RPC`,
    params: [
      { name: 'appName', type: 'string', required: true, description: `The name of an app.` },
      { name: 'appVersion', type: 'integer', required: true, description: `The version of the app` },
      { name: 'rpcName', type: 'string', required: true, description: `The name of the RPC` },
    ],
  },
  {
    name: 'makemcp_custom_apps_rpcs_fetch',
    description: `List all RPCs for an app or get metadata for a specific RPC with optional sections.`,
    params: [
      { name: 'appName', type: 'string', required: true, description: `The name of an app.` },
      { name: 'appVersion', type: 'integer', required: true, description: `The version of the app` },
      { name: 'rpcName', type: 'string', required: false, description: `The name of the RPC. If not provided, all RPCs will be listed.` },
      { name: 'sections', type: 'array', required: false, description: `Optional sections to include when fetching a specific RPC. Available sections: api, parameters.` },
    ],
  },
  {
    name: 'makemcp_custom_apps_rpcs_test',
    description: `Test an RPC with provided data and schema`,
    params: [
      { name: 'appName', type: 'string', required: true, description: `The name of an app.` },
      { name: 'appVersion', type: 'integer', required: true, description: `The version of the app` },
      { name: 'data', type: 'object', required: true, description: `Test data object` },
      { name: 'rpcName', type: 'string', required: true, description: `The name of the RPC` },
      { name: 'schema', type: 'array', required: true, description: `Schema definition array` },
    ],
  },
  {
    name: 'makemcp_custom_apps_set_base',
    description: `Set the base section of a custom app. This is the structure all modules and remote procedures inherit from.`,
    params: [
      { name: 'appName', type: 'string', required: true, description: `The name of an app.` },
      { name: 'appVersion', type: 'integer', required: true, description: `The version of the app` },
      { name: 'base', type: 'string', required: true, description: `The base section data. Can be a JSON object or a JSONC string (to preserve comments). Key properties: baseUrl (required, the base URL prefix for modules), headers (optional, object of header key-value pairs), qs (optional, query string key-value pairs), log (optional, { sanitize: string[] } for redacting sensitive paths).` },
    ],
  },
  {
    name: 'makemcp_custom_apps_set_docs',
    description: `Set app documentation (readme)`,
    params: [
      { name: 'docs', type: 'string', required: true, description: `The documentation content in markdown format` },
      { name: 'name', type: 'string', required: true, description: `The name of the app` },
      { name: 'version', type: 'number', required: true, description: `The version of the app` },
    ],
  },
  {
    name: 'makemcp_custom_apps_set_groups',
    description: `Set the groups section of an custom app. This defines module groupings for the app.`,
    params: [
      { name: 'appName', type: 'string', required: true, description: `The name of an app.` },
      { name: 'appVersion', type: 'integer', required: true, description: `The version of the app` },
      { name: 'groups', type: 'array', required: true, description: `No description.` },
    ],
  },
  {
    name: 'makemcp_custom_apps_update',
    description: `Update an existing custom app`,
    params: [
      { name: 'name', type: 'string', required: true, description: `The name of the app` },
      { name: 'version', type: 'number', required: true, description: `The version of the app` },
      { name: 'description', type: 'string', required: false, description: `The description of the app` },
      { name: 'label', type: 'string', required: false, description: `The label of the app visible in the scenario builder` },
      { name: 'theme', type: 'string', required: false, description: `The color of the app logo` },
    ],
  },
  {
    name: 'makemcp_custom_apps_webhooks_create',
    description: `Create a new webhook for an app`,
    params: [
      { name: 'appName', type: 'string', required: true, description: `The name of the app` },
      { name: 'label', type: 'string', required: true, description: `The label of the webhook visible in the scenario builder` },
      { name: 'type', type: 'string', required: true, description: `The type of the webhook` },
    ],
  },
  {
    name: 'makemcp_custom_apps_webhooks_delete',
    description: `Delete a webhook`,
    params: [
      { name: 'webhookName', type: 'string', required: true, description: `The name of the webhook` },
    ],
  },
  {
    name: 'makemcp_custom_apps_webhooks_fetch',
    description: `List all webhooks for an app or get metadata for a specific webhook with optional sections.`,
    params: [
      { name: 'appName', type: 'string', required: false, description: `The name of the app. Required when listing all webhooks.` },
      { name: 'sections', type: 'array', required: false, description: `Optional sections to include when fetching a specific webhook. Available sections: api, parameters, attach, detach, scope.` },
      { name: 'webhookName', type: 'string', required: false, description: `The webhook ID (often identical to the app name). If provided, gets this specific webhook.` },
    ],
  },
  {
    name: 'makemcp_custom_apps_webhooks_set_section',
    description: `Set a specific section of a webhook.`,
    params: [
      { name: 'body', type: 'string', required: true, description: `The section data to set. Can be a JSON object or a JSONC string (to preserve comments).` },
      { name: 'section', type: 'string', required: true, description: `The section to set` },
      { name: 'webhookName', type: 'string', required: true, description: `The name of the webhook` },
    ],
  },
  {
    name: 'makemcp_custom_apps_webhooks_update',
    description: `Update an existing webhook`,
    params: [
      { name: 'webhookName', type: 'string', required: true, description: `The name of the webhook` },
      { name: 'label', type: 'string', required: false, description: `The label of the webhook visible in the scenario builder` },
    ],
  },
  {
    name: 'makemcp_data-store-records_create',
    description: `Create data store record (data-store-records): Create a new record in a data store.`,
    params: [
      { name: 'data', type: 'object', required: true, description: `Record data` },
      { name: 'dataStoreId', type: 'number', required: true, description: `The data store ID to create the record in` },
      { name: 'key', type: 'string', required: false, description: `Unique key for the record (optional)` },
    ],
  },
  {
    name: 'makemcp_data-store-records_delete',
    description: `Delete data store records (data-store-records): Delete specific records from a data store by keys.`,
    params: [
      { name: 'dataStoreId', type: 'number', required: true, description: `The data store ID to delete records from` },
      { name: 'keys', type: 'array', required: true, description: `Array of record keys to delete` },
    ],
  },
  {
    name: 'makemcp_data-store-records_list',
    description: `List data store records (data-store-records): List all records in a data store.`,
    params: [
      { name: 'dataStoreId', type: 'number', required: true, description: `The data store ID to list records from` },
      { name: 'limit', type: 'number', required: false, description: `Maximum number of records to return` },
    ],
  },
  {
    name: 'makemcp_data-store-records_replace',
    description: `Replace data store record (data-store-records): Replace an existing record in a data store or create if it doesn't exist.`,
    params: [
      { name: 'data', type: 'object', required: true, description: `New record data` },
      { name: 'dataStoreId', type: 'number', required: true, description: `The data store ID containing the record` },
      { name: 'key', type: 'string', required: true, description: `Unique key of the record to replace` },
    ],
  },
  {
    name: 'makemcp_data-store-records_update',
    description: `Update data store record (data-store-records): Update an existing record in a data store.`,
    params: [
      { name: 'data', type: 'object', required: true, description: `Updated record data` },
      { name: 'dataStoreId', type: 'number', required: true, description: `The data store ID containing the record` },
      { name: 'key', type: 'string', required: true, description: `Unique key of the record to update` },
    ],
  },
  {
    name: 'makemcp_data-stores_create',
    description: `Create data store (data-stores): Create a new data store.`,
    params: [
      { name: 'maxSizeMB', type: 'number', required: true, description: `Maximum size in MB for the data store` },
      { name: 'name', type: 'string', required: true, description: `Name of the data store` },
      { name: 'teamId', type: 'number', required: true, description: `ID of the team to create the data store in` },
      { name: 'datastructureId', type: 'number', required: false, description: `ID of the data structure defining the record format` },
    ],
  },
  {
    name: 'makemcp_data-stores_delete',
    description: `Delete data store (data-stores): Delete a data store.`,
    params: [
      { name: 'dataStoreId', type: 'number', required: true, description: `The data store ID to delete` },
    ],
  },
  {
    name: 'makemcp_data-stores_get',
    description: `Get data store (data-stores): Get data store details by ID.`,
    params: [
      { name: 'dataStoreId', type: 'number', required: true, description: `The data store ID to retrieve` },
    ],
  },
  {
    name: 'makemcp_data-stores_list',
    description: `List data stores (data-stores): List all data stores for a team.`,
    params: [
      { name: 'teamId', type: 'number', required: true, description: `The team ID to filter data stores by` },
    ],
  },
  {
    name: 'makemcp_data-stores_update',
    description: `Update data store (data-stores): Update a data store.`,
    params: [
      { name: 'dataStoreId', type: 'number', required: true, description: `The data store ID to update` },
      { name: 'datastructureId', type: 'number', required: false, description: `New data structure ID` },
      { name: 'maxSizeMB', type: 'number', required: false, description: `New maximum size in MB for the data store` },
      { name: 'name', type: 'string', required: false, description: `New name for the data store` },
    ],
  },
  {
    name: 'makemcp_data-structures_create',
    description: `Create data structure (data-structures): Create a new data structure.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `The name of the data structure. The maximum length of the name is 128 characters` },
      { name: 'spec', type: 'array', required: true, description: `Sets the data structure specification. Each item follows the Make Parameters Syntax.` },
      { name: 'strict', type: 'boolean', required: true, description: `Set to true to enforce strict validation of the data put in the data structure` },
      { name: 'teamId', type: 'number', required: true, description: `The unique ID of the team in which the data structure will be created` },
    ],
  },
  {
    name: 'makemcp_data-structures_delete',
    description: `Delete data structure (data-structures): Delete a data structure.`,
    params: [
      { name: 'dataStructureId', type: 'number', required: true, description: `The data structure ID to delete` },
    ],
  },
  {
    name: 'makemcp_data-structures_generate',
    description: `Generates Data Structure Definition in Make Parameters Format from the sample data provided as input.`,
    params: [
      { name: 'data', type: 'string', required: true, description: `The input data from which the specification should be generated. The content of this field should match the format specified in the 'type' field.` },
      { name: 'type', type: 'string', required: false, description: `The format of the input data from which the specification should be generated.` },
    ],
  },
  {
    name: 'makemcp_data-structures_get',
    description: `Get data structure (data-structures): Get details of a specific data structure.`,
    params: [
      { name: 'dataStructureId', type: 'number', required: true, description: `The data structure ID to retrieve` },
    ],
  },
  {
    name: 'makemcp_data-structures_list',
    description: `List data structures (data-structures): List data structures for a team.`,
    params: [
      { name: 'teamId', type: 'number', required: true, description: `The team ID to list data structures for` },
    ],
  },
  {
    name: 'makemcp_data-structures_update',
    description: `Update data structure (data-structures): Update an existing data structure.`,
    params: [
      { name: 'dataStructureId', type: 'number', required: true, description: `The data structure ID to update` },
      { name: 'name', type: 'string', required: false, description: `The name of the data structure. The maximum length of the name is 128 characters` },
      { name: 'spec', type: 'array', required: false, description: `Sets the data structure specification. Each item follows the Make Parameters Syntax.` },
      { name: 'strict', type: 'boolean', required: false, description: `Set to true to enforce strict validation of the data put in the data structure` },
    ],
  },
  {
    name: 'makemcp_enums_countries',
    description: `List countries (enums): List all available countries.`,
    params: [
    ],
  },
  {
    name: 'makemcp_enums_regions',
    description: `List regions (enums): List all available regions.`,
    params: [
    ],
  },
  {
    name: 'makemcp_enums_timezones',
    description: `List timezones (enums): List all available timezones.`,
    params: [
    ],
  },
  {
    name: 'makemcp_executions_get',
    description: `Get execution (executions): Get details of a specific execution.`,
    params: [
      { name: 'executionId', type: 'string', required: true, description: `The execution ID to retrieve` },
      { name: 'scenarioId', type: 'number', required: true, description: `The scenario ID the execution belongs to` },
    ],
  },
  {
    name: 'makemcp_executions_get-detail',
    description: `Get execution detail (executions): Get detailed result of a specific execution.`,
    params: [
      { name: 'executionId', type: 'string', required: true, description: `The execution ID to retrieve` },
      { name: 'scenarioId', type: 'number', required: true, description: `The scenario ID the execution belongs to` },
    ],
  },
  {
    name: 'makemcp_executions_list',
    description: `List executions (executions): List executions for a scenario.`,
    params: [
      { name: 'scenarioId', type: 'number', required: true, description: `The scenario ID to list executions for` },
      { name: 'from', type: 'number', required: false, description: `Start timestamp for filtering` },
      { name: 'status', type: 'string', required: false, description: `Filter by execution status` },
      { name: 'to', type: 'number', required: false, description: `End timestamp for filtering` },
    ],
  },
  {
    name: 'makemcp_extract_blueprint_components',
    description: `This tool analyzes a given Blueprint and extracts a list of various Connections, Keys, Hooks and other components that are required to be provided in order to map the Blueprint properly.`,
    params: [
      { name: 'blueprint', type: 'object', required: true, description: `A blueprint of a Make Scenario.` },
      { name: 'organizationId', type: 'integer', required: true, description: `The ID of the Organization in which context the extraction should operate.` },
      { name: 'teamId', type: 'integer', required: true, description: `The ID of the Team in which context the extraction should operate.` },
    ],
  },
  {
    name: 'makemcp_extract_module_components',
    description: `Extracts the list of Components required by the particular Module. Use to identify what Connections, Keys, Hooks and other resources are needed to work with the Module.`,
    params: [
      { name: 'appName', type: 'string', required: true, description: `Name of the App to which the module belongs.` },
      { name: 'appVersion', type: 'integer', required: true, description: `Version of the App to which the module belongs.` },
      { name: 'moduleName', type: 'string', required: true, description: `The name of the module to extract components from.` },
      { name: 'organizationId', type: 'integer', required: true, description: `The ID of the Organization in which context the extraction should operate.` },
      { name: 'teamId', type: 'integer', required: true, description: `The ID of the Team in which context the extraction should operate.` },
      { name: 'includeOptions', type: 'boolean', required: false, description: `When enabled, the Tool will also include available options for each extracted component, which are especially useful when configuring a module with Scoped Connections.` },
      { name: 'moduleIdOverride', type: 'integer', required: false, description: `When extracting the Components from Module, an artificial single-module Blueprint is created to run the extraction on. By default, the generated Module ID is #1. This parameter allows overriding the generated value.` },
    ],
  },
  {
    name: 'makemcp_folders_create',
    description: `Create folder (folders): Create a new folder.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name of the folder` },
      { name: 'teamId', type: 'number', required: true, description: `The team ID where the folder will be created` },
    ],
  },
  {
    name: 'makemcp_folders_delete',
    description: `Delete folder (folders): Delete a folder.`,
    params: [
      { name: 'folderId', type: 'number', required: true, description: `The folder ID to delete` },
    ],
  },
  {
    name: 'makemcp_folders_list',
    description: `List folders (folders): List folders for a team.`,
    params: [
      { name: 'teamId', type: 'number', required: true, description: `The team ID to list folders for` },
    ],
  },
  {
    name: 'makemcp_folders_update',
    description: `Update folder (folders): Update an existing folder.`,
    params: [
      { name: 'folderId', type: 'number', required: true, description: `The folder ID to update` },
      { name: 'name', type: 'string', required: false, description: `New name for the folder` },
    ],
  },
  {
    name: 'makemcp_hook-config_get',
    description: `Retrieves the manifest and form configuration of a hook of the given type. Use this to understand what fields are required when configuring a hook.`,
    params: [
      { name: 'typeName', type: 'string', required: true, description: `The type name of the hook (e.g. "slack-events", "gateway-webhook", "gateway-mailhook").` },
      { name: 'format', type: 'string', required: false, description: `Format of the output allowing transformation before being returned.` },
    ],
  },
  {
    name: 'makemcp_hook-metadata_get',
    description: `Retrieves metadata of the given hook, or returns an error when the hook type doesn't exist.`,
    params: [
      { name: 'typeName', type: 'string', required: true, description: `Name of the Hook to retrieve metadata for.` },
    ],
  },
  {
    name: 'makemcp_hooks_create',
    description: `Create webhook/mailhook (hooks): Create a new webhook/mailhook.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `The name of the webhook` },
      { name: 'teamId', type: 'number', required: true, description: `The team ID where the hook will be created` },
      { name: 'typeName', type: 'string', required: true, description: `The hook type related to the app for which it will be created` },
      { name: 'data', type: 'object', required: false, description: `Additional data specific to the hook type` },
    ],
  },
  {
    name: 'makemcp_hooks_delete',
    description: `Delete webhook/mailhook (hooks): Delete a webhook/mailhook.`,
    params: [
      { name: 'hookId', type: 'number', required: true, description: `The hook ID to delete` },
    ],
  },
  {
    name: 'makemcp_hooks_get',
    description: `Get webhook/mailhook (hooks): Get details of a specific webhook/mailhook.`,
    params: [
      { name: 'hookId', type: 'number', required: true, description: `The hook ID to retrieve` },
    ],
  },
  {
    name: 'makemcp_hooks_list',
    description: `List webhooks/mailhooks (hooks): List webhooks/mailhooks for a specific team.`,
    params: [
      { name: 'teamId', type: 'number', required: true, description: `The team ID to list hooks for` },
    ],
  },
  {
    name: 'makemcp_hooks_update',
    description: `Update webhook/mailhook (hooks): Update an existing webhook/mailhook.`,
    params: [
      { name: 'data', type: 'object', required: true, description: `New data configuration for the hook` },
      { name: 'hookId', type: 'number', required: true, description: `The hook ID to update` },
    ],
  },
  {
    name: 'makemcp_key-metadata_get',
    description: `Retrieves metadata of the given key, or returns an error when the key type doesn't exist.`,
    params: [
      { name: 'typeName', type: 'string', required: true, description: `Name of the Key to retrieve metadata for.` },
    ],
  },
  {
    name: 'makemcp_keys_delete',
    description: `Delete key (keys): Delete a key.`,
    params: [
      { name: 'keyId', type: 'number', required: true, description: `The key ID to delete` },
    ],
  },
  {
    name: 'makemcp_keys_get',
    description: `Get key (keys): Get details of a specific key.`,
    params: [
      { name: 'keyId', type: 'number', required: true, description: `The key ID to retrieve` },
    ],
  },
  {
    name: 'makemcp_keys_list',
    description: `List keys (keys): List all keys for a team.`,
    params: [
      { name: 'teamId', type: 'number', required: true, description: `The team ID to list keys for` },
    ],
  },
  {
    name: 'makemcp_organizations_create',
    description: `Create organization (organizations): Create a new organization.`,
    params: [
      { name: 'countryId', type: 'number', required: true, description: `The ID of the country` },
      { name: 'name', type: 'string', required: true, description: `Name of the organization` },
      { name: 'regionId', type: 'number', required: true, description: `The ID of the region the organization will be created in` },
      { name: 'timezoneId', type: 'number', required: true, description: `The ID of the timezone` },
    ],
  },
  {
    name: 'makemcp_organizations_delete',
    description: `Delete organization (organizations): Delete an organization.`,
    params: [
      { name: 'organizationId', type: 'number', required: true, description: `The organization ID to delete` },
    ],
  },
  {
    name: 'makemcp_organizations_get',
    description: `Get organization (organizations): Get details of a specific organization.`,
    params: [
      { name: 'organizationId', type: 'number', required: true, description: `The organization ID to retrieve` },
    ],
  },
  {
    name: 'makemcp_organizations_list',
    description: `List organizations (organizations): List organizations for the current user.`,
    params: [
    ],
  },
  {
    name: 'makemcp_organizations_update',
    description: `Update organization (organizations): Update an existing organization.`,
    params: [
      { name: 'organizationId', type: 'number', required: true, description: `The organization ID to update` },
      { name: 'countryId', type: 'number', required: false, description: `New country ID` },
      { name: 'name', type: 'string', required: false, description: `New name for the organization` },
      { name: 'timezoneId', type: 'number', required: false, description: `New timezone ID` },
    ],
  },
  {
    name: 'makemcp_public-templates_get',
    description: `Get public template (public-templates): Get details of a public template by its URL slug (e.g. "12289-add-webhook-data-to-a-google-sheet"). Use this for templates discovered via public-templates_list.`,
    params: [
      { name: 'templateUrl', type: 'string', required: true, description: `The URL slug of the public template (e.g. "12289-add-webhook-data-to-a-google-sheet")` },
    ],
  },
  {
    name: 'makemcp_public-templates_get-blueprint',
    description: `Get public template blueprint (public-templates): Get the full blueprint of a public template including scenario flow, controller configuration, scheduling, and metadata. Use this for templates discovered via public-templates_list.`,
    params: [
      { name: 'templateUrl', type: 'string', required: true, description: `The URL slug of the public template (e.g. "12289-add-webhook-data-to-a-google-sheet")` },
    ],
  },
  {
    name: 'makemcp_public-templates_list',
    description: `List public templates (public-templates): Search and list public (approved) templates available for anyone. Supports name-based search for template discovery. Results are sorted by usage by default.`,
    params: [
      { name: 'includeEn', type: 'boolean', required: false, description: `Whether to include English-language public templates in results` },
      { name: 'name', type: 'string', required: false, description: `Search public templates by name` },
      { name: 'usedApps', type: 'array', required: false, description: `Filter public templates by apps used` },
    ],
  },
  {
    name: 'makemcp_rpc_execute',
    description: `Executes a Make Remote Procedure Call (RPC) with the provided input.`,
    params: [
      { name: 'appName', type: 'string', required: true, description: `Name of the App from which the RPC should be executed.` },
      { name: 'appVersion', type: 'integer', required: true, description: `Version of the App from which the RPC should be executed.` },
      { name: 'data', type: 'object', required: true, description: `Object containing input values of the RPC.` },
      { name: 'rpcName', type: 'string', required: true, description: `Name of the RPC to be executed.` },
      { name: 'format', type: 'string', required: false, description: `Format of the output allowing transformation before being returned.` },
    ],
  },
  {
    name: 'makemcp_scenarios_activate',
    description: `Activate scenario (scenarios): Activate a scenario.`,
    params: [
      { name: 'scenarioId', type: 'number', required: true, description: `The scenario ID to activate` },
    ],
  },
  {
    name: 'makemcp_scenarios_create',
    description: `Create scenario (scenarios): Create a new scenario.`,
    params: [
      { name: 'blueprint', type: 'string', required: true, description: `Blueprint containing the scenario configuration` },
      { name: 'scheduling', type: 'string', required: true, description: `Scheduling configuration for the scenario` },
      { name: 'teamId', type: 'number', required: true, description: `ID of the team where the scenario will be created` },
      { name: 'basedon', type: 'string', required: false, description: `ID of an existing template to base this one on` },
      { name: 'confirmed', type: 'boolean', required: false, description: `Confirmation in case the scenario uses apps that are not yet installed` },
      { name: 'folderId', type: 'number', required: false, description: `ID of the folder where the scenario will be placed` },
    ],
  },
  {
    name: 'makemcp_scenarios_deactivate',
    description: `Deactivate scenario (scenarios): Deactivate a scenario.`,
    params: [
      { name: 'scenarioId', type: 'number', required: true, description: `The scenario ID to deactivate` },
    ],
  },
  {
    name: 'makemcp_scenarios_delete',
    description: `Delete scenario (scenarios): Delete a scenario.`,
    params: [
      { name: 'scenarioId', type: 'number', required: true, description: `The scenario ID to delete` },
    ],
  },
  {
    name: 'makemcp_scenarios_get',
    description: `Get scenario (scenarios): Get a scenario and its blueprint by ID.`,
    params: [
      { name: 'scenarioId', type: 'number', required: true, description: `The scenario ID to retrieve` },
    ],
  },
  {
    name: 'makemcp_scenarios_interface',
    description: `Get scenario interface (scenarios): Get the interface for a scenario.`,
    params: [
      { name: 'scenarioId', type: 'number', required: true, description: `The scenario ID to get the interface for` },
    ],
  },
  {
    name: 'makemcp_scenarios_list',
    description: `List scenarios (scenarios): List all scenarios for a team.`,
    params: [
      { name: 'teamId', type: 'number', required: true, description: `The team ID to filter scenarios by` },
    ],
  },
  {
    name: 'makemcp_scenarios_run',
    description: `Run scenario (scenarios): Execute a scenario with optional input data.`,
    params: [
      { name: 'scenarioId', type: 'number', required: true, description: `The scenario ID to run` },
      { name: 'callbackUrl', type: 'string', required: false, description: `URL to call once the scenario execution finishes` },
      { name: 'data', type: 'object', required: false, description: `Optional input data for the scenario` },
      { name: 'responsive', type: 'boolean', required: false, description: `Whether to run responsively` },
    ],
  },
  {
    name: 'makemcp_scenarios_set-interface',
    description: `Set scenario interface (scenarios): Update the interface for a scenario.`,
    params: [
      { name: 'interface', type: 'object', required: true, description: `The interface definition with input and output specifications` },
      { name: 'scenarioId', type: 'number', required: true, description: `The scenario ID to update the interface for` },
    ],
  },
  {
    name: 'makemcp_scenarios_update',
    description: `Update scenario (scenarios): Update a scenario.`,
    params: [
      { name: 'scenarioId', type: 'number', required: true, description: `The scenario ID to update` },
      { name: 'blueprint', type: 'string', required: false, description: `Updated blueprint configuration` },
      { name: 'confirmed', type: 'boolean', required: false, description: `Confirmation in case the scenario uses apps that are not yet installed` },
      { name: 'description', type: 'string', required: false, description: `New description for the scenario` },
      { name: 'folderId', type: 'number', required: false, description: `New folder ID for the scenario` },
      { name: 'name', type: 'string', required: false, description: `New name for the scenario` },
      { name: 'scheduling', type: 'string', required: false, description: `Updated scheduling configuration` },
    ],
  },
  {
    name: 'makemcp_teams_create',
    description: `Create team (teams): Create a new team.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Name for the new team` },
      { name: 'organizationId', type: 'number', required: true, description: `ID of the organization where the team will be created` },
      { name: 'operationsLimit', type: 'number', required: false, description: `Maximum operations limit for the team` },
      { name: 'transferLimit', type: 'number', required: false, description: `Maximum data transfer limit for the team` },
    ],
  },
  {
    name: 'makemcp_teams_delete',
    description: `Delete team (teams): Delete a team.`,
    params: [
      { name: 'teamId', type: 'number', required: true, description: `The team ID to delete` },
    ],
  },
  {
    name: 'makemcp_teams_get',
    description: `Get team (teams): Get details of a specific team.`,
    params: [
      { name: 'teamId', type: 'number', required: true, description: `The team ID to retrieve` },
    ],
  },
  {
    name: 'makemcp_teams_list',
    description: `List teams (teams): List teams for the current user.`,
    params: [
      { name: 'organizationId', type: 'number', required: true, description: `The organization ID to list teams for` },
    ],
  },
  {
    name: 'makemcp_tools_create',
    description: `This tool creates a new Tool in the system based on provided parameters.`,
    params: [
      { name: 'description', type: 'string', required: true, description: `A brief description of what the Tool does.` },
      { name: 'inputs', type: 'array', required: true, description: `An array of input parameters that the Tool accepts.` },
      { name: 'module', type: 'object', required: true, description: `Details of the module that the Tool will encapsulate.` },
      { name: 'name', type: 'string', required: true, description: `The name of the Tool.` },
      { name: 'teamId', type: 'integer', required: true, description: `The ID of the Team under which the Tool will be created.` },
    ],
  },
  {
    name: 'makemcp_tools_get',
    description: `Retrieves details of a specific Tool by its ID.`,
    params: [
      { name: 'toolId', type: 'integer', required: true, description: `The ID of the Tool to be retrieved.` },
    ],
  },
  {
    name: 'makemcp_tools_update',
    description: `This tool updates an existing Tool's details based on provided parameters.`,
    params: [
      { name: 'toolId', type: 'integer', required: true, description: `The ID of the Tool to be updated.` },
      { name: 'description', type: 'string', required: false, description: `A brief description of what the Tool does.` },
      { name: 'inputs', type: 'array', required: false, description: `An array of input parameters that the Tool accepts.` },
      { name: 'module', type: 'object', required: false, description: `Details of the module that the Tool will encapsulate.` },
      { name: 'name', type: 'string', required: false, description: `The name of the Tool.` },
    ],
  },
  {
    name: 'makemcp_users_me',
    description: `Get current user (users): Get details of the current user.`,
    params: [
    ],
  },
  {
    name: 'makemcp_validate_blueprint_schema',
    description: `Validates the overall structure of the Scenario Blueprint against the Schema.`,
    params: [
      { name: 'blueprint', type: 'object', required: true, description: `A blueprint of a Make Scenario.` },
    ],
  },
  {
    name: 'makemcp_validate_epoch_configuration',
    description: `Validates the Epoch Configuration of particular Trigger Module.`,
    params: [
      { name: 'appName', type: 'string', required: true, description: `Name of the App to which the module belongs.` },
      { name: 'appVersion', type: 'integer', required: true, description: `Version of the App to which the module belongs.` },
      { name: 'epoch', type: 'object', required: true, description: `Module "epoch" configuration to be validated. This collection represents settings for trigger pointer (what epoch to watch).` },
      { name: 'moduleName', type: 'string', required: true, description: `The name of the module to validate the configuration for.` },
      { name: 'organizationId', type: 'integer', required: true, description: `The ID of the Organization in which context the Validation should operate.` },
      { name: 'parameters', type: 'object', required: true, description: `Module "parameters" configuration. Since Epoch exists only on triggers, there are no dynamic parameters. This collection is not directly validated, but serves as context for RPC calls, which are based on the module configuration.` },
      { name: 'teamId', type: 'integer', required: true, description: `The ID of the Team in which context the Validation should operate.` },
      { name: 'strict', type: 'boolean', required: false, description: `Enforces strict validation mode, which is guarding against unknown parameters in the configuration. Don't turn off unless necessary.` },
    ],
  },
  {
    name: 'makemcp_validate_hook_configuration',
    description: `This tool validates that hook configuration values are correctly set for a given hook type.`,
    params: [
      { name: 'organizationId', type: 'integer', required: true, description: `The ID of the Organization in which context the Validation should operate.` },
      { name: 'teamId', type: 'integer', required: true, description: `The ID of the Team in which context the Validation should operate.` },
      { name: 'typeName', type: 'string', required: true, description: `The type name of the hook to validate the configuration for (e.g. "slack-events", "gateway-webhook", "gateway-mailhook").` },
      { name: 'values', type: 'object', required: true, description: `Hook configuration values to be validated against the form schema.` },
      { name: 'strict', type: 'boolean', required: false, description: `Enforces strict validation mode, which is guarding against unknown parameters in the configuration. Don't turn off unless necessary.` },
    ],
  },
  {
    name: 'makemcp_validate_module_configuration',
    description: `This tool validates that parameters and mapper collection are correctly configured for a given module in a given app.`,
    params: [
      { name: 'appName', type: 'string', required: true, description: `Name of the App to which the module belongs.` },
      { name: 'appVersion', type: 'integer', required: true, description: `Version of the App to which the module belongs.` },
      { name: 'mapper', type: 'object', required: true, description: `Module "mapper" configuration to be validated. These are dynamic parameters.` },
      { name: 'moduleName', type: 'string', required: true, description: `The name of the module to validate the configuration for.` },
      { name: 'organizationId', type: 'integer', required: true, description: `The ID of the Organization in which context the Validation should operate.` },
      { name: 'parameters', type: 'object', required: true, description: `Module "parameters" configuration to be validated. These are static parameters.` },
      { name: 'teamId', type: 'integer', required: true, description: `The ID of the Team in which context the Validation should operate.` },
      { name: 'restoreExtras', type: 'object', required: false, description: `Dictionary of values to be stored as part of 'extra' entry in the field's restore object.` },
      { name: 'schemas', type: 'boolean', required: false, description: `Enables generation of fully expanded Forman schemas with all dynamic nested fields resolved.` },
      { name: 'states', type: 'boolean', required: false, description: `Enables generation of Field States, which can be fed into Make Frontend Components for better user experience.` },
      { name: 'strict', type: 'boolean', required: false, description: `Enforces strict validation mode, which is guarding against unknown parameters in the configuration. Don't turn off unless necessary.` },
    ],
  },
  {
    name: 'makemcp_validate_scheduling_schema',
    description: `Validates the Scheduling of the Scenario against the Schema.`,
    params: [
      { name: 'scheduling', type: 'object', required: true, description: `A scheduling configuration of a Make Scenario.` },
    ],
  },
]
