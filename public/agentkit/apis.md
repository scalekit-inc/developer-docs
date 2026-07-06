# AgentKit APIs

- **OpenAPI Version:** `3.1.1`
- **API Version:** `1.0.0`

# Overview

The AgentKit API gives your AI agents authenticated access to third-party apps — sending emails, reading calendars, creating tickets, querying databases, and more. Your agent calls a tool; Scalekit handles the OAuth flow, token storage, and API call.

**Base URLs:**

```properties
https://{your-subdomain}.scalekit.dev (Development)
https://{your-subdomain}.scalekit.com (Production)
```

## Quickstart

### 1. Get an access token

Use your API credentials from the [Scalekit Dashboard](https://app.scalekit.com) → **Developers → Settings → API Credentials**.

```sh
curl -X POST https://<SCALEKIT_ENVIRONMENT_URL>/oauth/token \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'client_id={client_id}' \
  -d 'client_secret={client_secret}' \
  -d 'grant_type=client_credentials'
```

### 2. List connected accounts

```sh
curl https://<SCALEKIT_ENVIRONMENT_URL>/api/v1/connected_accounts \
  -H 'Authorization: Bearer {access_token}'
```

### 3. Execute a tool on behalf of a user

```sh
curl -X POST https://<SCALEKIT_ENVIRONMENT_URL>/api/v1/execute_tool \
  -H 'Authorization: Bearer {access_token}' \
  -H 'Content-Type: application/json' \
  -d '{
    "connected_account_id": "{connected_account_id}",
    "tool_name": "gmail_fetch_emails",
    "tool_input": { "max_results": 5 }
  }'
```

## SDKs

```sh
npm install @scalekit-sdk/node    # Node.js
pip install scalekit-sdk-python    # Python
```

For the full product guide, see the [AgentKit documentation](https://docs.scalekit.com/agentkit/quickstart/).

***

Looking for SSO, SCIM, directory sync, or user management APIs? See the [SaaSKit API reference](https://docs.scalekit.com/saaskit/apis/). For the complete endpoint list across both products, see [All APIs](https://docs.scalekit.com/apis/).

## Servers

- **URL:** `https://$SCALEKIT_ENVIRONMENT_URL`

## Operations

### List connected accounts

- **Method:** `GET`
- **Path:** `/api/v1/connected_accounts`
- **Tags:** Connected Accounts

Retrieves a paginated list of connected accounts for third-party integrations. Filter by organization, user, connector type, provider, or identifier. Returns OAuth tokens, API keys, and connection status for each account. Use pagination tokens to navigate through large result sets.

#### Responses

##### Status: 200 Successfully retrieved the list of connected accounts with their authentication details and status

###### Content-Type: application/json

- **`connected_accounts`**

  `array` — List of connected accounts matching the filter criteria. Excludes sensitive authorization details for security.

  **Items:**

  - **`authorization_type`**

    `string`, possible values: `"OAUTH", "API_KEY", "BASIC_AUTH", "BEARER_TOKEN", "CUSTOM", "BASIC", "OAUTH_M2M", "TRELLO_OAUTH1", "GOOGLE_DWD"` — Authorization mechanism type.

  - **`connection_id`**

    `string` — Parent connection configuration reference.

  - **`connector`**

    `string` — Connector identifier.

  - **`id`**

    `string` — Unique connected account identifier.

  - **`identifier`**

    `string` — The unique identifier for this account in the third-party service.

  - **`last_used_at`**

    `string`, format: `date-time` — Last usage timestamp.

  - **`provider`**

    `string` — OAuth provider name (e.g., 'google', 'microsoft').

  - **`status`**

    `string`, possible values: `"ACTIVE", "EXPIRED", "PENDING_AUTH", "PENDING_VERIFICATION", "DISCONNECTED"` — Current connection status.

  - **`token_expires_at`**

    `string`, format: `date-time` — Token expiration timestamp.

  - **`updated_at`**

    `string`, format: `date-time` — Last modification timestamp.

- **`next_page_token`**

  `string` — Pagination token for retrieving the next page. Empty if this is the last page. Pass this value to page\_token in the next request.

- **`prev_page_token`**

  `string` — Pagination token for retrieving the previous page. Empty if this is the first page. Pass this value to page\_token to go back.

- **`total_size`**

  `integer`, format: `int64` — Total count of connected accounts matching the filter criteria across all pages. Use for calculating pagination.

**Example:**

```json
{
  "connected_accounts": [
    {
      "authorization_type": null,
      "connection_id": "conn_24834495392086178",
      "connector": "notion",
      "id": "ca_24834495392086178",
      "identifier": "user@example.com",
      "last_used_at": "2024-03-20T14:30:00Z",
      "provider": "google",
      "status": null,
      "token_expires_at": "2024-12-31T23:59:59Z",
      "updated_at": "2024-03-20T15:04:05Z"
    }
  ],
  "next_page_token": "eyJvZmZzZXQiOjIwfQ==",
  "prev_page_token": "eyJvZmZzZXQiOjB9",
  "total_size": 100
}
```

##### Status: 400 Invalid request - occurs when query parameters are malformed or validation fails

###### Content-Type: application/json

**Example:**

```json
null
```

##### Status: 401 Authentication required - missing or invalid access token

###### Content-Type: application/json

**Example:**

```json
null
```

### Update connected account credentials

- **Method:** `PUT`
- **Path:** `/api/v1/connected_accounts`
- **Tags:** Connected Accounts

Updates authentication credentials and configuration for an existing connected account. Modify OAuth tokens, refresh tokens, access scopes, or API configuration settings. Specify the account by ID, or by combination of organization/user, connector, and identifier. Returns the updated account with new token expiry and status information.

#### Request Body

##### Content-Type: application/json

- **`connected_account`**

  `object` — Details of the connected account to update

  - **`api_config`**

    `object` — Updated JSON configuration for API-specific settings. Merges with existing configuration - only provided fields are modified.

  - **`authorization_details`**

    `object` — Updated authentication credentials. Provide new OAuth tokens (e.g., after refresh) or updated static auth details. Only included fields will be modified.

    - **`google_dwd`**

      `object` — Google Domain-Wide Delegation authentication — used for GOOGLE\_DWD connections. Send only subject in requests; access\_token, scopes, and token\_expires\_at are response-only.

      - **`access_token`**

        `string` — OAuth access token acquired via the jwt-bearer grant. Present in responses only.

      - **`scopes`**

        `array` — OAuth scopes granted to this token. Present in responses only.

        **Items:**

        `string`

      - **`subject`**

        `string` — Email address of the Google Workspace user to impersonate via Domain-Wide Delegation.

      - **`token_expires_at`**

        `string`, format: `date-time` — When the access token expires. Present in responses only.

    - **`oauth_token`**

      `object`

      - **`access_token`**

        `string` — OAuth access token for API requests. Typically short-lived and must be refreshed after expiration.

      - **`domain`**

        `string` — Associated domain for workspace or organization-scoped OAuth connections (e.g., Google Workspace domain).

      - **`refresh_token`**

        `string` — OAuth refresh token for obtaining new access tokens. Long-lived and used to maintain persistent authorization.

      - **`scopes`**

        `array` — List of granted OAuth scopes defining the permissions and access levels for this connection.

        **Items:**

        `string`

    - **`static_auth`**

      `object`

      - **`details`**

        `object` — Flexible JSON structure containing static credentials. Format varies by connector type (API key, username/password, etc.).

- **`connector`**

  `string` — Connector identifier (e.g., 'notion', 'slack', 'google'). Alphanumeric characters, spaces, hyphens, underscores, and colons are allowed.

- **`id`**

  `string` — Unique identifier for the connected account to update

- **`identifier`**

  `string` — The unique identifier for the connected account within the third-party service (e.g., email address, user ID, workspace identifier).

- **`organization_id`**

  `string` — Organization ID for the connector

- **`user_id`**

  `string` — User ID for the connector

**Example:**

```json
{
  "connected_account": {
    "authorization_details": {
      "oauth_token": {
        "access_token": "...",
        "refresh_token": "...",
        "scopes": [
          "read",
          "write"
        ]
      }
    },
    "authorization_type": "OAUTH2"
  },
  "connector": "notion",
  "id": "ca_123",
  "identifier": "user@example.com",
  "organization_id": "org_121312434123312",
  "user_id": "user_121312434123312"
}
```

#### Responses

##### Status: 200 Connected account updated successfully with new credentials or configuration

###### Content-Type: application/json

- **`connected_account`**

  `object` — The updated connected account with refreshed credentials, new token expiry, and modified configuration settings.

  - **`api_config`**

    `object` — Optional JSON configuration for connector-specific API settings such as rate limits, custom endpoints, or feature flags.

  - **`authorization_details`**

    `object` — Sensitive authentication credentials including access tokens, refresh tokens, and scopes. Contains either OAuth tokens or static auth details.

    - **`google_dwd`**

      `object` — Google Domain-Wide Delegation authentication — used for GOOGLE\_DWD connections. Send only subject in requests; access\_token, scopes, and token\_expires\_at are response-only.

      - **`access_token`**

        `string` — OAuth access token acquired via the jwt-bearer grant. Present in responses only.

      - **`scopes`**

        `array` — OAuth scopes granted to this token. Present in responses only.

        **Items:**

        `string`

      - **`subject`**

        `string` — Email address of the Google Workspace user to impersonate via Domain-Wide Delegation.

      - **`token_expires_at`**

        `string`, format: `date-time` — When the access token expires. Present in responses only.

    - **`oauth_token`**

      `object`

      - **`access_token`**

        `string` — OAuth access token for API requests. Typically short-lived and must be refreshed after expiration.

      - **`domain`**

        `string` — Associated domain for workspace or organization-scoped OAuth connections (e.g., Google Workspace domain).

      - **`refresh_token`**

        `string` — OAuth refresh token for obtaining new access tokens. Long-lived and used to maintain persistent authorization.

      - **`scopes`**

        `array` — List of granted OAuth scopes defining the permissions and access levels for this connection.

        **Items:**

        `string`

    - **`static_auth`**

      `object`

      - **`details`**

        `object` — Flexible JSON structure containing static credentials. Format varies by connector type (API key, username/password, etc.).

  - **`authorization_type`**

    `string`, possible values: `"OAUTH", "API_KEY", "BASIC_AUTH", "BEARER_TOKEN", "CUSTOM", "BASIC", "OAUTH_M2M", "TRELLO_OAUTH1", "GOOGLE_DWD"` — Type of authorization mechanism used. Specifies whether this connection uses OAuth, API keys, bearer tokens, or other auth methods.

  - **`connection_id`**

    `string` — Reference to the parent connection configuration. Links this account to a specific connector setup in your environment.

  - **`connector`**

    `string` — Connector identifier (e.g., 'notion', 'slack', 'salesforce'). Indicates which third-party application this account connects to.

  - **`id`**

    `string` — Unique Scalekit-generated identifier for this connected account. Always prefixed with 'ca\_'.

  - **`identifier`**

    `string` — The unique identifier for this account in the third-party service. Typically an email address, user ID, or workspace identifier.

  - **`last_used_at`**

    `string`, format: `date-time` — Timestamp when this connected account was last used to make an API call. Useful for tracking active connections.

  - **`provider`**

    `string` — OAuth provider name (e.g., 'google', 'microsoft', 'github'). Identifies which authentication service manages this connection.

  - **`status`**

    `string`, possible values: `"ACTIVE", "EXPIRED", "PENDING_AUTH", "PENDING_VERIFICATION", "DISCONNECTED"` — Current status of the connected account. Indicates if the account is active, expired, pending authorization, or pending user identity verification.

  - **`token_expires_at`**

    `string`, format: `date-time` — Expiration timestamp for the access token. After this time, the token must be refreshed or re-authorized.

  - **`updated_at`**

    `string`, format: `date-time` — Timestamp when this connected account was last modified. Updated whenever credentials or configuration changes.

**Example:**

```json
{
  "connected_account": {
    "api_config": {
      "base_url": "https://api.custom-domain.com",
      "rate_limit": 1000,
      "timeout": 30
    },
    "authorization_details": null,
    "authorization_type": null,
    "connection_id": "conn_24834495392086178",
    "connector": "notion",
    "id": "ca_24834495392086178",
    "identifier": "user@example.com",
    "last_used_at": "2024-03-20T14:30:00Z",
    "provider": "google",
    "status": null,
    "token_expires_at": "2024-12-31T23:59:59Z",
    "updated_at": "2024-03-20T15:04:05Z"
  }
}
```

##### Status: 400 Invalid request - missing required fields, invalid authorization details, or validation failed

###### Content-Type: application/json

**Example:**

```json
null
```

##### Status: 401 Authentication required - missing or invalid access token

###### Content-Type: application/json

**Example:**

```json
null
```

##### Status: 404 Connected account not found - the specified account does not exist

###### Content-Type: application/json

**Example:**

```json
null
```

### Create a connected account

- **Method:** `POST`
- **Path:** `/api/v1/connected_accounts`
- **Tags:** Connected Accounts

Creates a new connected account with OAuth tokens or API credentials for third-party service integration. Supply authorization details including access tokens, refresh tokens, scopes, and optional API configuration. The account can be scoped to an organization or user. Returns the created account with its unique identifier and authentication status.

#### Request Body

##### Content-Type: application/json

- **`connected_account`**

  `object` — Details of the connected account to create

  - **`api_config`**

    `object` — Optional JSON configuration for connector-specific API settings such as rate limits, custom API endpoints, timeouts, or feature flags.

  - **`authorization_details`**

    `object` — Optional authentication credentials for the connected account. Include OAuth tokens (access\_token, refresh\_token, scopes) or static auth details (API keys, bearer tokens). Can be provided later via update.

    - **`google_dwd`**

      `object` — Google Domain-Wide Delegation authentication — used for GOOGLE\_DWD connections. Send only subject in requests; access\_token, scopes, and token\_expires\_at are response-only.

      - **`access_token`**

        `string` — OAuth access token acquired via the jwt-bearer grant. Present in responses only.

      - **`scopes`**

        `array` — OAuth scopes granted to this token. Present in responses only.

        **Items:**

        `string`

      - **`subject`**

        `string` — Email address of the Google Workspace user to impersonate via Domain-Wide Delegation.

      - **`token_expires_at`**

        `string`, format: `date-time` — When the access token expires. Present in responses only.

    - **`oauth_token`**

      `object`

      - **`access_token`**

        `string` — OAuth access token for API requests. Typically short-lived and must be refreshed after expiration.

      - **`domain`**

        `string` — Associated domain for workspace or organization-scoped OAuth connections (e.g., Google Workspace domain).

      - **`refresh_token`**

        `string` — OAuth refresh token for obtaining new access tokens. Long-lived and used to maintain persistent authorization.

      - **`scopes`**

        `array` — List of granted OAuth scopes defining the permissions and access levels for this connection.

        **Items:**

        `string`

    - **`static_auth`**

      `object`

      - **`details`**

        `object` — Flexible JSON structure containing static credentials. Format varies by connector type (API key, username/password, etc.).

- **`connector`**

  `string` — Connector identifier (e.g., 'notion', 'slack', 'google'). Alphanumeric characters, spaces, hyphens, underscores, and colons are allowed.

- **`identifier`**

  `string` — The unique identifier for the connected account within the third-party service (e.g., email address, user ID, workspace identifier).

- **`organization_id`**

  `string` — Organization ID for the connector

- **`user_id`**

  `string` — User ID for the connector

**Example:**

```json
{
  "connected_account": {
    "authorization_details": {
      "oauth_token": {
        "access_token": "...",
        "refresh_token": "...",
        "scopes": [
          "read",
          "write"
        ]
      }
    },
    "authorization_type": "OAUTH2"
  },
  "connector": "notion",
  "identifier": "user@example.com",
  "organization_id": "org_121312434123312",
  "user_id": "user_121312434123312"
}
```

#### Responses

##### Status: 201 Connected account created successfully with authentication credentials stored securely

###### Content-Type: application/json

- **`connected_account`**

  `object` — The newly created connected account with its unique identifier, status, and complete authorization details including access tokens.

  - **`api_config`**

    `object` — Optional JSON configuration for connector-specific API settings such as rate limits, custom endpoints, or feature flags.

  - **`authorization_details`**

    `object` — Sensitive authentication credentials including access tokens, refresh tokens, and scopes. Contains either OAuth tokens or static auth details.

    - **`google_dwd`**

      `object` — Google Domain-Wide Delegation authentication — used for GOOGLE\_DWD connections. Send only subject in requests; access\_token, scopes, and token\_expires\_at are response-only.

      - **`access_token`**

        `string` — OAuth access token acquired via the jwt-bearer grant. Present in responses only.

      - **`scopes`**

        `array` — OAuth scopes granted to this token. Present in responses only.

        **Items:**

        `string`

      - **`subject`**

        `string` — Email address of the Google Workspace user to impersonate via Domain-Wide Delegation.

      - **`token_expires_at`**

        `string`, format: `date-time` — When the access token expires. Present in responses only.

    - **`oauth_token`**

      `object`

      - **`access_token`**

        `string` — OAuth access token for API requests. Typically short-lived and must be refreshed after expiration.

      - **`domain`**

        `string` — Associated domain for workspace or organization-scoped OAuth connections (e.g., Google Workspace domain).

      - **`refresh_token`**

        `string` — OAuth refresh token for obtaining new access tokens. Long-lived and used to maintain persistent authorization.

      - **`scopes`**

        `array` — List of granted OAuth scopes defining the permissions and access levels for this connection.

        **Items:**

        `string`

    - **`static_auth`**

      `object`

      - **`details`**

        `object` — Flexible JSON structure containing static credentials. Format varies by connector type (API key, username/password, etc.).

  - **`authorization_type`**

    `string`, possible values: `"OAUTH", "API_KEY", "BASIC_AUTH", "BEARER_TOKEN", "CUSTOM", "BASIC", "OAUTH_M2M", "TRELLO_OAUTH1", "GOOGLE_DWD"` — Type of authorization mechanism used. Specifies whether this connection uses OAuth, API keys, bearer tokens, or other auth methods.

  - **`connection_id`**

    `string` — Reference to the parent connection configuration. Links this account to a specific connector setup in your environment.

  - **`connector`**

    `string` — Connector identifier (e.g., 'notion', 'slack', 'salesforce'). Indicates which third-party application this account connects to.

  - **`id`**

    `string` — Unique Scalekit-generated identifier for this connected account. Always prefixed with 'ca\_'.

  - **`identifier`**

    `string` — The unique identifier for this account in the third-party service. Typically an email address, user ID, or workspace identifier.

  - **`last_used_at`**

    `string`, format: `date-time` — Timestamp when this connected account was last used to make an API call. Useful for tracking active connections.

  - **`provider`**

    `string` — OAuth provider name (e.g., 'google', 'microsoft', 'github'). Identifies which authentication service manages this connection.

  - **`status`**

    `string`, possible values: `"ACTIVE", "EXPIRED", "PENDING_AUTH", "PENDING_VERIFICATION", "DISCONNECTED"` — Current status of the connected account. Indicates if the account is active, expired, pending authorization, or pending user identity verification.

  - **`token_expires_at`**

    `string`, format: `date-time` — Expiration timestamp for the access token. After this time, the token must be refreshed or re-authorized.

  - **`updated_at`**

    `string`, format: `date-time` — Timestamp when this connected account was last modified. Updated whenever credentials or configuration changes.

**Example:**

```json
{
  "connected_account": {
    "api_config": {
      "base_url": "https://api.custom-domain.com",
      "rate_limit": 1000,
      "timeout": 30
    },
    "authorization_details": null,
    "authorization_type": null,
    "connection_id": "conn_24834495392086178",
    "connector": "notion",
    "id": "ca_24834495392086178",
    "identifier": "user@example.com",
    "last_used_at": "2024-03-20T14:30:00Z",
    "provider": "google",
    "status": null,
    "token_expires_at": "2024-12-31T23:59:59Z",
    "updated_at": "2024-03-20T15:04:05Z"
  }
}
```

##### Status: 400 Invalid request - missing required fields, invalid authorization details, or validation failed

###### Content-Type: application/json

**Example:**

```json
null
```

##### Status: 401 Authentication required - missing or invalid access token

###### Content-Type: application/json

**Example:**

```json
null
```

##### Status: 409 Conflict - connected account with the same identifier already exists

###### Content-Type: application/json

**Example:**

```json
null
```

### Get connected account auth credentials

- **Method:** `GET`
- **Path:** `/api/v1/connected_accounts/auth`
- **Tags:** Connected Accounts

Retrieves complete authentication details for a connected account including OAuth tokens, refresh tokens, scopes, and API configuration. Query by account ID or by combination of organization/user, connector, and identifier. Returns sensitive credential information - use appropriate access controls.

#### Responses

##### Status: 200 Successfully retrieved connected account with full authentication details

###### Content-Type: application/json

- **`connected_account`**

  `object` — The connected account with complete details including sensitive authorization credentials (access tokens, refresh tokens, scopes). Handle with appropriate access controls.

  - **`api_config`**

    `object` — Optional JSON configuration for connector-specific API settings such as rate limits, custom endpoints, or feature flags.

  - **`authorization_details`**

    `object` — Sensitive authentication credentials including access tokens, refresh tokens, and scopes. Contains either OAuth tokens or static auth details.

    - **`google_dwd`**

      `object` — Google Domain-Wide Delegation authentication — used for GOOGLE\_DWD connections. Send only subject in requests; access\_token, scopes, and token\_expires\_at are response-only.

      - **`access_token`**

        `string` — OAuth access token acquired via the jwt-bearer grant. Present in responses only.

      - **`scopes`**

        `array` — OAuth scopes granted to this token. Present in responses only.

        **Items:**

        `string`

      - **`subject`**

        `string` — Email address of the Google Workspace user to impersonate via Domain-Wide Delegation.

      - **`token_expires_at`**

        `string`, format: `date-time` — When the access token expires. Present in responses only.

    - **`oauth_token`**

      `object`

      - **`access_token`**

        `string` — OAuth access token for API requests. Typically short-lived and must be refreshed after expiration.

      - **`domain`**

        `string` — Associated domain for workspace or organization-scoped OAuth connections (e.g., Google Workspace domain).

      - **`refresh_token`**

        `string` — OAuth refresh token for obtaining new access tokens. Long-lived and used to maintain persistent authorization.

      - **`scopes`**

        `array` — List of granted OAuth scopes defining the permissions and access levels for this connection.

        **Items:**

        `string`

    - **`static_auth`**

      `object`

      - **`details`**

        `object` — Flexible JSON structure containing static credentials. Format varies by connector type (API key, username/password, etc.).

  - **`authorization_type`**

    `string`, possible values: `"OAUTH", "API_KEY", "BASIC_AUTH", "BEARER_TOKEN", "CUSTOM", "BASIC", "OAUTH_M2M", "TRELLO_OAUTH1", "GOOGLE_DWD"` — Type of authorization mechanism used. Specifies whether this connection uses OAuth, API keys, bearer tokens, or other auth methods.

  - **`connection_id`**

    `string` — Reference to the parent connection configuration. Links this account to a specific connector setup in your environment.

  - **`connector`**

    `string` — Connector identifier (e.g., 'notion', 'slack', 'salesforce'). Indicates which third-party application this account connects to.

  - **`id`**

    `string` — Unique Scalekit-generated identifier for this connected account. Always prefixed with 'ca\_'.

  - **`identifier`**

    `string` — The unique identifier for this account in the third-party service. Typically an email address, user ID, or workspace identifier.

  - **`last_used_at`**

    `string`, format: `date-time` — Timestamp when this connected account was last used to make an API call. Useful for tracking active connections.

  - **`provider`**

    `string` — OAuth provider name (e.g., 'google', 'microsoft', 'github'). Identifies which authentication service manages this connection.

  - **`status`**

    `string`, possible values: `"ACTIVE", "EXPIRED", "PENDING_AUTH", "PENDING_VERIFICATION", "DISCONNECTED"` — Current status of the connected account. Indicates if the account is active, expired, pending authorization, or pending user identity verification.

  - **`token_expires_at`**

    `string`, format: `date-time` — Expiration timestamp for the access token. After this time, the token must be refreshed or re-authorized.

  - **`updated_at`**

    `string`, format: `date-time` — Timestamp when this connected account was last modified. Updated whenever credentials or configuration changes.

**Example:**

```json
{
  "connected_account": {
    "api_config": {
      "base_url": "https://api.custom-domain.com",
      "rate_limit": 1000,
      "timeout": 30
    },
    "authorization_details": null,
    "authorization_type": null,
    "connection_id": "conn_24834495392086178",
    "connector": "notion",
    "id": "ca_24834495392086178",
    "identifier": "user@example.com",
    "last_used_at": "2024-03-20T14:30:00Z",
    "provider": "google",
    "status": null,
    "token_expires_at": "2024-12-31T23:59:59Z",
    "updated_at": "2024-03-20T15:04:05Z"
  }
}
```

##### Status: 400 Invalid request - missing required query parameters

###### Content-Type: application/json

**Example:**

```json
null
```

##### Status: 401 Authentication required - missing or invalid access token

###### Content-Type: application/json

**Example:**

```json
null
```

##### Status: 404 Connected account not found - no account matches the specified criteria

###### Content-Type: application/json

**Example:**

```json
null
```

### Get connected account metadata

- **Method:** `GET`
- **Path:** `/api/v1/connected_accounts/details`
- **Tags:** Connected Accounts

Returns metadata for a connected account including status, connector type, provider, and configuration without exposing stored authorization credentials. Look up by account ID, or by a combination of organization (or user), connector, and external identifier.

#### Responses

##### Status: 200 Successfully retrieved connected account details

###### Content-Type: application/json

- **`connected_account`**

  `object` — The connected account with complete details including sensitive authorization credentials (access tokens, refresh tokens, scopes). Handle with appropriate access controls.

  - **`api_config`**

    `object` — Optional JSON configuration for connector-specific API settings such as rate limits, custom endpoints, or feature flags.

  - **`authorization_details`**

    `object` — Sensitive authentication credentials including access tokens, refresh tokens, and scopes. Contains either OAuth tokens or static auth details.

    - **`google_dwd`**

      `object` — Google Domain-Wide Delegation authentication — used for GOOGLE\_DWD connections. Send only subject in requests; access\_token, scopes, and token\_expires\_at are response-only.

      - **`access_token`**

        `string` — OAuth access token acquired via the jwt-bearer grant. Present in responses only.

      - **`scopes`**

        `array` — OAuth scopes granted to this token. Present in responses only.

        **Items:**

        `string`

      - **`subject`**

        `string` — Email address of the Google Workspace user to impersonate via Domain-Wide Delegation.

      - **`token_expires_at`**

        `string`, format: `date-time` — When the access token expires. Present in responses only.

    - **`oauth_token`**

      `object`

      - **`access_token`**

        `string` — OAuth access token for API requests. Typically short-lived and must be refreshed after expiration.

      - **`domain`**

        `string` — Associated domain for workspace or organization-scoped OAuth connections (e.g., Google Workspace domain).

      - **`refresh_token`**

        `string` — OAuth refresh token for obtaining new access tokens. Long-lived and used to maintain persistent authorization.

      - **`scopes`**

        `array` — List of granted OAuth scopes defining the permissions and access levels for this connection.

        **Items:**

        `string`

    - **`static_auth`**

      `object`

      - **`details`**

        `object` — Flexible JSON structure containing static credentials. Format varies by connector type (API key, username/password, etc.).

  - **`authorization_type`**

    `string`, possible values: `"OAUTH", "API_KEY", "BASIC_AUTH", "BEARER_TOKEN", "CUSTOM", "BASIC", "OAUTH_M2M", "TRELLO_OAUTH1", "GOOGLE_DWD"` — Type of authorization mechanism used. Specifies whether this connection uses OAuth, API keys, bearer tokens, or other auth methods.

  - **`connection_id`**

    `string` — Reference to the parent connection configuration. Links this account to a specific connector setup in your environment.

  - **`connector`**

    `string` — Connector identifier (e.g., 'notion', 'slack', 'salesforce'). Indicates which third-party application this account connects to.

  - **`id`**

    `string` — Unique Scalekit-generated identifier for this connected account. Always prefixed with 'ca\_'.

  - **`identifier`**

    `string` — The unique identifier for this account in the third-party service. Typically an email address, user ID, or workspace identifier.

  - **`last_used_at`**

    `string`, format: `date-time` — Timestamp when this connected account was last used to make an API call. Useful for tracking active connections.

  - **`provider`**

    `string` — OAuth provider name (e.g., 'google', 'microsoft', 'github'). Identifies which authentication service manages this connection.

  - **`status`**

    `string`, possible values: `"ACTIVE", "EXPIRED", "PENDING_AUTH", "PENDING_VERIFICATION", "DISCONNECTED"` — Current status of the connected account. Indicates if the account is active, expired, pending authorization, or pending user identity verification.

  - **`token_expires_at`**

    `string`, format: `date-time` — Expiration timestamp for the access token. After this time, the token must be refreshed or re-authorized.

  - **`updated_at`**

    `string`, format: `date-time` — Timestamp when this connected account was last modified. Updated whenever credentials or configuration changes.

**Example:**

```json
{
  "connected_account": {
    "api_config": {
      "base_url": "https://api.custom-domain.com",
      "rate_limit": 1000,
      "timeout": 30
    },
    "authorization_details": null,
    "authorization_type": null,
    "connection_id": "conn_24834495392086178",
    "connector": "notion",
    "id": "ca_24834495392086178",
    "identifier": "user@example.com",
    "last_used_at": "2024-03-20T14:30:00Z",
    "provider": "google",
    "status": null,
    "token_expires_at": "2024-12-31T23:59:59Z",
    "updated_at": "2024-03-20T15:04:05Z"
  }
}
```

##### Status: 400 Invalid request - missing required query parameters

###### Content-Type: application/json

**Example:**

```json
null
```

##### Status: 401 Authentication required - missing or invalid access token

###### Content-Type: application/json

**Example:**

```json
null
```

##### Status: 404 Connected account not found - no account matches the specified criteria

###### Content-Type: application/json

**Example:**

```json
null
```

### Generate authentication magic link

- **Method:** `POST`
- **Path:** `/api/v1/connected_accounts/magic_link`
- **Tags:** Connected Accounts

Creates a time-limited magic link for connecting or re-authorizing a third-party account. The link directs users to the OAuth authorization flow for the specified connector. Returns the generated link URL and expiration timestamp. Links typically expire after a short duration for security.

#### Request Body

##### Content-Type: application/json

- **`connector`**

  `string` — Connector identifier (e.g., 'notion', 'slack', 'google'). Alphanumeric characters, spaces, hyphens, underscores, and colons are allowed.

- **`id`**

  `string` — Unique identifier for the connected account

- **`identifier`**

  `string` — The unique identifier for the connected account within the third-party service (e.g., email address, user ID, workspace identifier).

- **`organization_id`**

  `string` — Organization ID for the connector

- **`state`**

  `string` — Optional opaque state value. State added to the user verify redirect URL query params to validate the user verification

- **`user_id`**

  `string` — User ID for the connector

- **`user_verify_url`**

  `string` — B2B app's user verify redirect URL

**Example:**

```json
{
  "connector": "notion",
  "id": "ca_123",
  "identifier": "user@example.com",
  "organization_id": "org_121312434123312",
  "state": "QVNDSUFyY2hhYml0dGVyXzE2ODQ5NzIwNzI0NTY=",
  "user_id": "user_121312434123312",
  "user_verify_url": "https://app.yourapp.com/user/verify/callback"
}
```

#### Responses

##### Status: 200 Magic link generated successfully with authorization URL and expiry time

###### Content-Type: application/json

- **`expiry`**

  `string`, format: `date-time` — Expiry timestamp for the authentication link

- **`link`**

  `string` — Authentication link for the connector

**Example:**

```json
{
  "expiry": "2024-03-20T15:04:05Z",
  "link": "https://notion.com/oauth/authorize?client_id=..."
}
```

##### Status: 400 Invalid request - missing required parameters or invalid connector

###### Content-Type: application/json

**Example:**

```json
null
```

##### Status: 401 Authentication required - missing or invalid access token

###### Content-Type: application/json

**Example:**

```json
null
```

### Verify connected account user

- **Method:** `POST`
- **Path:** `/api/v1/connected_accounts/user/verify`
- **Tags:** Connected Accounts

Confirms the user assertion and activates the connected account after the user completes third-party OAuth. Called by the B2B app server with auth\_request\_id and identifier. Validates that the asserted identifier matches the one stored on the auth request and promotes pending tokens to live.

#### Request Body

##### Content-Type: application/json

- **`auth_request_id` (required)**

  `string` — Auth request ID as base64url-encoded opaque token from the user verify redirect URL query params

- **`identifier` (required)**

  `string` — Current logged in user's connected account identifier

**Example:**

```json
{
  "auth_request_id": "QVNDSUFyY2hhYml0dGVyXzE2ODQ5NzIwNzI0NTY=",
  "identifier": "user@example.com"
}
```

#### Responses

##### Status: 200 Verification successful; connected account is now ACTIVE

###### Content-Type: application/json

- **`post_user_verify_redirect_url`**

  `string` — URL to redirect the user to after successful verification

**Example:**

```json
{
  "post_user_verify_redirect_url": "https://env1.example.com/connect/success"
}
```

##### Status: 400 Invalid request - missing or malformed fields

###### Content-Type: application/json

**Example:**

```json
null
```

##### Status: 401 Unauthorized - invalid or missing access token

###### Content-Type: application/json

**Example:**

```json
null
```

##### Status: 403 Forbidden - identifier mismatch

###### Content-Type: application/json

**Example:**

```json
null
```

##### Status: 404 Not found - no pending flow for the given auth\_request\_id or already consumed

###### Content-Type: application/json

**Example:**

```json
null
```

### Delete a connected account

- **Method:** `POST`
- **Path:** `/api/v1/connected_accounts:delete`
- **Tags:** Connected Accounts

Permanently removes a connected account and revokes all associated authentication credentials. Identify the account by ID, or by combination of organization/user, connector, and identifier. This action cannot be undone. All OAuth tokens and API keys for this account will be invalidated.

#### Request Body

##### Content-Type: application/json

- **`connector`**

  `string` — Connector identifier (e.g., 'notion', 'slack', 'google'). Alphanumeric characters, spaces, hyphens, underscores, and colons are allowed.

- **`id`**

  `string` — Unique identifier for the connected account to delete

- **`identifier`**

  `string` — The unique identifier for the connected account within the third-party service (e.g., email address, user ID, workspace identifier).

- **`organization_id`**

  `string` — Organization ID for the connector

- **`user_id`**

  `string` — User ID for the connector

**Example:**

```json
{
  "connector": "notion",
  "id": "ca_123",
  "identifier": "user@example.com",
  "organization_id": "org_121312434123312",
  "user_id": "user_121312434123312"
}
```

#### Responses

##### Status: 200 Connected account deleted successfully and all credentials revoked

###### Content-Type: application/json

**Example:**

```json
null
```

##### Status: 400 Invalid request - malformed parameters or validation failed

###### Content-Type: application/json

**Example:**

```json
null
```

##### Status: 401 Authentication required - missing or invalid access token

###### Content-Type: application/json

**Example:**

```json
null
```

##### Status: 404 Connected account not found - the specified account does not exist

###### Content-Type: application/json

**Example:**

```json
null
```

### Search connected accounts

- **Method:** `GET`
- **Path:** `/api/v1/connected_accounts:search`
- **Tags:** Connected Accounts

Search for connected accounts in your environment using a text query that matches against identifiers, providers, or connectors. The search performs case-insensitive matching across account details. Returns paginated results with account status and authentication type information.

#### Responses

##### Status: 200 Successfully retrieved matching connected accounts with pagination support

###### Content-Type: application/json

- **`connected_accounts`**

  `array` — List of connected accounts matching the search query. Excludes sensitive authorization details.

  **Items:**

  - **`authorization_type`**

    `string`, possible values: `"OAUTH", "API_KEY", "BASIC_AUTH", "BEARER_TOKEN", "CUSTOM", "BASIC", "OAUTH_M2M", "TRELLO_OAUTH1", "GOOGLE_DWD"` — Authorization mechanism type.

  - **`connection_id`**

    `string` — Parent connection configuration reference.

  - **`connector`**

    `string` — Connector identifier.

  - **`id`**

    `string` — Unique connected account identifier.

  - **`identifier`**

    `string` — The unique identifier for this account in the third-party service.

  - **`last_used_at`**

    `string`, format: `date-time` — Last usage timestamp.

  - **`provider`**

    `string` — OAuth provider name (e.g., 'google', 'microsoft').

  - **`status`**

    `string`, possible values: `"ACTIVE", "EXPIRED", "PENDING_AUTH", "PENDING_VERIFICATION", "DISCONNECTED"` — Current connection status.

  - **`token_expires_at`**

    `string`, format: `date-time` — Token expiration timestamp.

  - **`updated_at`**

    `string`, format: `date-time` — Last modification timestamp.

- **`next_page_token`**

  `string` — Pagination token for the next page. Empty if this is the last page.

- **`prev_page_token`**

  `string` — Pagination token for the previous page. Empty if this is the first page.

- **`total_size`**

  `integer`, format: `int64` — Total count of accounts matching the search query across all pages.

**Example:**

```json
{
  "connected_accounts": [
    {
      "authorization_type": null,
      "connection_id": "conn_24834495392086178",
      "connector": "notion",
      "id": "ca_24834495392086178",
      "identifier": "user@example.com",
      "last_used_at": "2024-03-20T14:30:00Z",
      "provider": "google",
      "status": null,
      "token_expires_at": "2024-12-31T23:59:59Z",
      "updated_at": "2024-03-20T15:04:05Z"
    }
  ],
  "next_page_token": "eyJvZmZzZXQiOjMwfQ==",
  "prev_page_token": "eyJvZmZzZXQiOjB9",
  "total_size": 100
}
```

##### Status: 400 Invalid request - query parameter is too short (minimum 3 characters) or validation failed

###### Content-Type: application/json

**Example:**

```json
null
```

##### Status: 401 Authentication required - missing or invalid access token

###### Content-Type: application/json

**Example:**

```json
null
```

### Create a custom provider

- **Method:** `POST`
- **Path:** `/api/v1/custom-providers`
- **Tags:** Connectors

Creates an environment-scoped custom provider (connector) with authentication patterns and optional proxy configuration. The returned identifier must be used for all subsequent update and delete operations on this provider.

#### Request Body

##### Content-Type: application/json

- **`auth_patterns`**

  `array` — Authentication patterns for the connected app provider

  **Items:**

- **`description`**

  `string` — Description of the connected app provider

- **`display_name`**

  `string` — Display name for the connected app provider

- **`icon_src`**

  `string` — URL for the provider icon. Should be an SVG image sized 800x800 pixels for best rendering experience.

- **`metadata`**

  `object` — Custom key-value metadata for this provider. Keys must be 3-25 characters, values must be 1-256 characters, with a maximum of 20 key-value pairs.

- **`proxy_enabled`**

  `boolean` — This flag indicates whether proxying is turned on for the connected app provider. When enabled, requests are routed through the provider proxy instead of being sent directly.

- **`proxy_url`**

  `string` — Proxy URL for the connected app provider. Must start with https\://

**Example:**

```json
{
  "auth_patterns": [
    {}
  ],
  "description": "Connect to Google Workspace for email and calendar integration",
  "display_name": "Google Workspace",
  "icon_src": "https://example.com/images/my-connector.svg",
  "metadata": {
    "api_version": "v2",
    "region": "us-east-1"
  },
  "proxy_enabled": true,
  "proxy_url": "https://mcp.example.com/mcp"
}
```

#### Responses

##### Status: 201 Returns the newly created custom provider, including its system-generated identifier and configuration

###### Content-Type: application/json

- **`provider`**

  `object`

  - **`auth_patterns`**

    `array`

    **Items:**

  - **`categories`**

    `array`

    **Items:**

    `string`

  - **`coming_soon`**

    `boolean`

  - **`description`**

    `string`

  - **`display_name`**

    `string`

  - **`display_priority`**

    `integer`, format: `int32`

  - **`icon_src`**

    `string`

  - **`id`**

    `string`

  - **`identifier`**

    `string`

  - **`is_custom`**

    `boolean` — Indicates whether the provider is environment-scoped (custom provider)

  - **`is_custom_mcp`**

    `boolean` — Indicates whether this is an environment-scoped MCP-based custom provider

  - **`metadata`**

    `object` — Custom key-value metadata stored for this provider. Returned for all providers; defaults to {} when no metadata has been set.

  - **`proxy_enabled`**

    `boolean`

  - **`proxy_url`**

    `string`

**Example:**

```json
{
  "provider": {
    "auth_patterns": [
      {}
    ],
    "categories": [
      ""
    ],
    "coming_soon": true,
    "description": "",
    "display_name": "",
    "display_priority": 1,
    "icon_src": "",
    "id": "",
    "identifier": "",
    "is_custom": false,
    "is_custom_mcp": false,
    "metadata": {
      "api_version": "v2",
      "region": "us-east-1"
    },
    "proxy_enabled": true,
    "proxy_url": ""
  }
}
```

##### Status: 400 Invalid request - the provider payload failed validation (e.g. missing required fields or invalid proxy URL)

###### Content-Type: application/json

**Example:**

```json
null
```

### Update a custom provider

- **Method:** `PUT`
- **Path:** `/api/v1/custom-providers/{identifier}`
- **Tags:** Connectors

Updates an existing environment-scoped custom provider (connector) by its identifier. Only the fields provided in the request are modified.

#### Request Body

##### Content-Type: application/json

- **`auth_patterns`**

  `array` — Authentication patterns for the connected app provider

  **Items:**

- **`description`**

  `string` — Description of the connected app provider

- **`display_name`**

  `string` — Display name for the connected app provider

- **`icon_src`**

  `string` — URL for the provider icon. Should be an SVG image sized 800x800 pixels for best rendering experience.

- **`metadata`**

  `object` — Custom key-value metadata for this provider. Keys must be 3-25 characters, values must be 1-256 characters, with a maximum of 20 key-value pairs.

- **`proxy_enabled`**

  `boolean` — This flag indicates whether proxying is turned on for the connected app provider. When enabled, requests are routed through the provider proxy instead of being sent directly.

- **`proxy_url`**

  `string` — Proxy URL for the connected app provider. Must start with https\://

**Example:**

```json
{
  "auth_patterns": [
    {}
  ],
  "description": "Connect to Google Workspace for email and calendar integration",
  "display_name": "Google Workspace",
  "icon_src": "https://example.com/images/my-connector.svg",
  "metadata": {
    "api_version": "v2",
    "region": "us-east-1"
  },
  "proxy_enabled": true,
  "proxy_url": "https://mcp.example.com/mcp"
}
```

#### Responses

##### Status: 200 Returns the updated custom provider with its current configuration

###### Content-Type: application/json

- **`provider`**

  `object`

  - **`auth_patterns`**

    `array`

    **Items:**

  - **`categories`**

    `array`

    **Items:**

    `string`

  - **`coming_soon`**

    `boolean`

  - **`description`**

    `string`

  - **`display_name`**

    `string`

  - **`display_priority`**

    `integer`, format: `int32`

  - **`icon_src`**

    `string`

  - **`id`**

    `string`

  - **`identifier`**

    `string`

  - **`is_custom`**

    `boolean` — Indicates whether the provider is environment-scoped (custom provider)

  - **`is_custom_mcp`**

    `boolean` — Indicates whether this is an environment-scoped MCP-based custom provider

  - **`metadata`**

    `object` — Custom key-value metadata stored for this provider. Returned for all providers; defaults to {} when no metadata has been set.

  - **`proxy_enabled`**

    `boolean`

  - **`proxy_url`**

    `string`

**Example:**

```json
{
  "provider": {
    "auth_patterns": [
      {}
    ],
    "categories": [
      ""
    ],
    "coming_soon": true,
    "description": "",
    "display_name": "",
    "display_priority": 1,
    "icon_src": "",
    "id": "",
    "identifier": "",
    "is_custom": false,
    "is_custom_mcp": false,
    "metadata": {
      "api_version": "v2",
      "region": "us-east-1"
    },
    "proxy_enabled": true,
    "proxy_url": ""
  }
}
```

##### Status: 400 Invalid request - the update payload failed validation

###### Content-Type: application/json

**Example:**

```json
null
```

##### Status: 404 Not Found - no custom provider exists with the given identifier

###### Content-Type: application/json

**Example:**

```json
null
```

### Delete a custom provider

- **Method:** `DELETE`
- **Path:** `/api/v1/custom-providers/{identifier}`
- **Tags:** Connectors

Deletes an environment-scoped custom provider (connector) by its identifier. This operation is permanent and removes the provider definition from the environment.

#### Responses

##### Status: 200 The custom provider was successfully deleted (no content returned)

###### Content-Type: application/json

**Example:**

```json
{}
```

##### Status: 404 Not Found - no custom provider exists with the given identifier

###### Content-Type: application/json

**Example:**

```json
null
```

### Execute a tool using a connected account

- **Method:** `POST`
- **Path:** `/api/v1/execute_tool`
- **Tags:** Tool Calling

Executes a tool action using authentication credentials from a connected account. Specify the tool by name and provide required parameters as JSON. The connected account can be identified by ID, or by combination of organization/user, connector, and identifier. Returns the execution result data and a unique execution ID for tracking. Use this endpoint to perform actions like sending emails, creating calendar events, or managing resources in external services.

#### Request Body

##### Content-Type: application/json

- **`agent_run_id`**

  `string` — Optional. Customer-supplied identifier grouping multiple tool calls into a single agent run. Useful for correlating logs across an agentic workflow.

- **`connected_account_id`**

  `string` — Optional. The unique ID of the connected account. Use this to directly identify the connected account instead of using identifier + connector combination.

- **`connector`**

  `string` — Optional. The name of the connector/provider (e.g., 'Google Workspace', 'Slack', 'Notion'). Alphanumeric characters, spaces, hyphens, underscores, and colons are allowed. Use this in combination with identifier to identify the connected account.

- **`identifier`**

  `string` — Optional. The unique identifier for the connected account within the third-party service (e.g., email address, user ID, workspace identifier). Use this in combination with connector to identify the connected account.

- **`organization_id`**

  `string` — Optional. The organization ID to scope the connected account lookup. Use this to narrow down the search when the same identifier exists across multiple organizations.

- **`params`**

  `object` — JSON object containing the parameters required for tool execution. The structure depends on the specific tool being executed.

- **`tool_name`**

  `string` — Name of the tool to execute

- **`user_id`**

  `string` — Optional. The user ID to scope the connected account lookup. Use this to narrow down the search when the same identifier exists across multiple users.

**Example:**

```json
{
  "agent_run_id": "run_abc123",
  "connected_account_id": "ca_123",
  "connector": "Google Workspace",
  "identifier": "user@example.com",
  "organization_id": "org_123",
  "params": {
    "body": "Hello World",
    "subject": "Hello",
    "to": "user@example.com"
  },
  "tool_name": "send_email",
  "user_id": "user_123"
}
```

#### Responses

##### Status: 200 Tool executed successfully with result data and execution ID

###### Content-Type: application/json

- **`data`**

  `object` — Free-flowing JSON parameters for the tool execution

- **`execution_id`**

  `string` — Unique identifier for the tool execution

**Example:**

```json
{
  "data": {
    "body": "Hello World",
    "subject": "Hello",
    "to": "user@example.com"
  },
  "execution_id": "123456789"
}
```

##### Status: 400 Invalid request - occurs when tool name is missing, parameters are malformed, or tool definition validation fails

###### Content-Type: application/json

**Example:**

```json
null
```

##### Status: 401 Authentication required - missing or invalid access token

###### Content-Type: application/json

**Example:**

```json
null
```

##### Status: 404 Tool or connected account not found - occurs when the specified tool name or connected account does not exist

###### Content-Type: application/json

**Example:**

```json
null
```

##### Status: 500 Tool execution failed - occurs when the external service returns an error or the tool encounters a runtime exception

###### Content-Type: application/json

**Example:**

```json
null
```

### List MCPs

- **Method:** `GET`
- **Path:** `/api/v1/mcp`
- **Tags:** MCP

Returns a list of existing MCPs, optionally filtered by connected\_account\_identifier and link\_token.

#### Responses

##### Status: 200 List of MCPs

###### Content-Type: application/json

- **`mcps`**

  `array` — List of MCPs

  **Items:**

  - **`connected_account_identifier`**

    `string` — Identifier for the connected account

  - **`id`**

    `string` — Unique ID of the tool

  - **`tool_mappings`**

    `array` — Provider name (e.g. GOOGLE)

    **Items:**

    - **`connection_name`**

      `string` — Connection name for the tool

    - **`status`**

      `string` — Authentication status of the tool

    - **`tool_names`**

      `array` — List of tool names

      **Items:**

      `string`

  - **`url`**

    `string` — Unique ID of the tool

**Example:**

```json
{
  "mcps": [
    {
      "connected_account_identifier": "account_123",
      "id": "res_123",
      "tool_mappings": "GOOGLE",
      "url": "https://example.com/mcp/v1/abc"
    }
  ]
}
```

##### Status: 400 Invalid request

###### Content-Type: application/json

**Example:**

```json
null
```

##### Status: 401 Authentication required

###### Content-Type: application/json

**Example:**

```json
null
```

### Create or retrieve MCP

- **Method:** `POST`
- **Path:** `/api/v1/mcp`
- **Tags:** MCP

Creates a new MCP for the configuration. If same configuration exists, it will return the existing MCP.

#### Request Body

##### Content-Type: application/json

- **`connected_account_identifier`**

  `string` — Identifier for the connected account

- **`id`**

  `string` — Unique ID of the tool

- **`tool_mappings`**

  `array` — Provider name (e.g. GOOGLE)

  **Items:**

  - **`connection_name`**

    `string` — Connection name for the tool

  - **`status`**

    `string` — Authentication status of the tool

  - **`tool_names`**

    `array` — List of tool names

    **Items:**

    `string`

- **`url`**

  `string` — Unique ID of the tool

**Example:**

```json
{
  "connected_account_identifier": "account_123",
  "id": "res_123",
  "tool_mappings": "GOOGLE",
  "url": "https://example.com/mcp/v1/abc"
}
```

#### Responses

##### Status: 200 The created or existing MCP

###### Content-Type: application/json

- **`mcp`**

  `object` — The MCP server details

  - **`connected_account_identifier`**

    `string` — Identifier for the connected account

  - **`id`**

    `string` — Unique ID of the tool

  - **`tool_mappings`**

    `array` — Provider name (e.g. GOOGLE)

    **Items:**

    - **`connection_name`**

      `string` — Connection name for the tool

    - **`status`**

      `string` — Authentication status of the tool

    - **`tool_names`**

      `array` — List of tool names

      **Items:**

      `string`

  - **`url`**

    `string` — Unique ID of the tool

**Example:**

```json
{
  "mcp": {
    "connected_account_identifier": "account_123",
    "id": "res_123",
    "tool_mappings": "GOOGLE",
    "url": "https://example.com/mcp/v1/abc"
  }
}
```

##### Status: 400 Invalid request

###### Content-Type: application/json

**Example:**

```json
null
```

##### Status: 401 Authentication required

###### Content-Type: application/json

**Example:**

```json
null
```

### Get MCP by ID

- **Method:** `GET`
- **Path:** `/api/v1/mcp/{mcp_id}`
- **Tags:** MCP

Returns the existing MCP with the given ID.

#### Responses

##### Status: 200 The requested MCP

###### Content-Type: application/json

- **`mcp`**

  `object` — The MCP details

  - **`connected_account_identifier`**

    `string` — Identifier for the connected account

  - **`id`**

    `string` — Unique ID of the tool

  - **`tool_mappings`**

    `array` — Provider name (e.g. GOOGLE)

    **Items:**

    - **`connection_name`**

      `string` — Connection name for the tool

    - **`status`**

      `string` — Authentication status of the tool

    - **`tool_names`**

      `array` — List of tool names

      **Items:**

      `string`

  - **`url`**

    `string` — Unique ID of the tool

**Example:**

```json
{
  "mcp": {
    "connected_account_identifier": "account_123",
    "id": "res_123",
    "tool_mappings": "GOOGLE",
    "url": "https://example.com/mcp/v1/abc"
  }
}
```

##### Status: 400 Invalid request

###### Content-Type: application/json

**Example:**

```json
null
```

##### Status: 401 Authentication required

###### Content-Type: application/json

**Example:**

```json
null
```

##### Status: 404 Not Found - MCP does not exist

###### Content-Type: application/json

**Example:**

```json
null
```

### Delete MCP by ID

- **Method:** `DELETE`
- **Path:** `/api/v1/mcp/{mcp_id}`
- **Tags:** MCP

Deletes the MCP with the given ID.

#### Responses

##### Status: 200 MCP deleted successfully

###### Content-Type: application/json

**Example:**

```json
null
```

##### Status: 400 Invalid request

###### Content-Type: application/json

**Example:**

```json
null
```

##### Status: 401 Authentication required

###### Content-Type: application/json

**Example:**

```json
null
```

##### Status: 404 Not Found - MCP does not exist

###### Content-Type: application/json

**Example:**

```json
null
```

### List MCP configurations

- **Method:** `GET`
- **Path:** `/api/v1/mcp/configs`
- **Tags:** MCP Configurations

Lists MCP configurations for the current environment with optional filters for id, name prefix, and provider.

#### Responses

##### Status: 200 Paginated list of MCP configurations

###### Content-Type: application/json

- **`configs`**

  `array` — List of MCP configurations

  **Items:**

  - **`connection_tool_mappings`**

    `array` — List of connection-to-tool mappings for this MCP config

    **Items:**

    - **`connected_account_id`**

      `string` — Connected account backing this connection in the MCP instance context

    - **`connected_account_status`**

      `string` — Authentication status for the connected account

    - **`connection_id`**

      `string` — Unique ID of the connection

    - **`connection_name`**

      `string` — Developer-assigned connection name

    - **`provider`**

      `string` — Provider name for this connection

    - **`tools`**

      `array` — List of tool names linked to this connection (empty = all tools)

      **Items:**

      `string`

  - **`description`**

    `string` — Description of the MCP configuration

  - **`id`**

    `string` — Unique ID of the MCP config

  - **`name`**

    `string` — Unique name for the MCP configuration

- **`next_page_token`**

  `string` — Pagination token to fetch the next page

- **`prev_page_token`**

  `string` — Pagination token to fetch the previous page

- **`total_size`**

  `integer`, format: `int64` — Total number of configs matching the filter

**Example:**

```json
{
  "configs": [
    {
      "connection_tool_mappings": [
        {}
      ],
      "description": "Summarizes daily emails and posts to Slack",
      "id": "cfg_85630864460904897",
      "name": "daily-summarizer"
    }
  ],
  "next_page_token": "",
  "prev_page_token": "",
  "total_size": 1
}
```

##### Status: 400 Invalid request - bad filter or pagination parameters

###### Content-Type: application/json

**Example:**

```json
null
```

##### Status: 401 Authentication required

###### Content-Type: application/json

**Example:**

```json
null
```

### Create a new MCP configuration

- **Method:** `POST`
- **Path:** `/api/v1/mcp/configs`
- **Tags:** MCP Configurations

Creates a new MCP configuration with a set of connections and tools.

#### Request Body

##### Content-Type: application/json

- **`connection_tool_mappings`**

  `array` — List of connection-to-tool mappings for this MCP config

  **Items:**

  - **`connected_account_id`**

    `string` — Connected account backing this connection in the MCP instance context

  - **`connected_account_status`**

    `string` — Authentication status for the connected account

  - **`connection_id`**

    `string` — Unique ID of the connection

  - **`connection_name`**

    `string` — Developer-assigned connection name

  - **`provider`**

    `string` — Provider name for this connection

  - **`tools`**

    `array` — List of tool names linked to this connection (empty = all tools)

    **Items:**

    `string`

- **`description`**

  `string` — Description of the MCP configuration

- **`id`**

  `string` — Unique ID of the MCP config

- **`name`**

  `string` — Unique name for the MCP configuration

**Example:**

```json
{
  "connection_tool_mappings": [
    {
      "connected_account_id": "",
      "connected_account_status": "",
      "connection_id": "",
      "connection_name": "",
      "provider": "",
      "tools": [
        ""
      ]
    }
  ],
  "description": "Summarizes daily emails and posts to Slack",
  "id": "cfg_85630864460904897",
  "name": "daily-summarizer"
}
```

#### Responses

##### Status: 201 The newly created MCP configuration

###### Content-Type: application/json

- **`config`**

  `object` — The created MCP configuration

  - **`connection_tool_mappings`**

    `array` — List of connection-to-tool mappings for this MCP config

    **Items:**

    - **`connected_account_id`**

      `string` — Connected account backing this connection in the MCP instance context

    - **`connected_account_status`**

      `string` — Authentication status for the connected account

    - **`connection_id`**

      `string` — Unique ID of the connection

    - **`connection_name`**

      `string` — Developer-assigned connection name

    - **`provider`**

      `string` — Provider name for this connection

    - **`tools`**

      `array` — List of tool names linked to this connection (empty = all tools)

      **Items:**

      `string`

  - **`description`**

    `string` — Description of the MCP configuration

  - **`id`**

    `string` — Unique ID of the MCP config

  - **`name`**

    `string` — Unique name for the MCP configuration

**Example:**

```json
{
  "config": {
    "connection_tool_mappings": [
      {}
    ],
    "description": "Summarizes daily emails and posts to Slack",
    "id": "cfg_85630864460904897",
    "name": "daily-summarizer"
  }
}
```

##### Status: 400 Invalid request - missing required fields or invalid connection/tool mappings

###### Content-Type: application/json

**Example:**

```json
null
```

##### Status: 401 Authentication required - missing or invalid access token

###### Content-Type: application/json

**Example:**

```json
null
```

### Fetch an MCP configuration

- **Method:** `GET`
- **Path:** `/api/v1/mcp/configs/{config_id}`
- **Tags:** MCP Configurations

Returns a single MCP configuration for the current environment by ID.

#### Responses

##### Status: 200 The requested MCP configuration

###### Content-Type: application/json

- **`config`**

  `object` — The requested MCP configuration

  - **`connection_tool_mappings`**

    `array` — List of connection-to-tool mappings for this MCP config

    **Items:**

    - **`connected_account_id`**

      `string` — Connected account backing this connection in the MCP instance context

    - **`connected_account_status`**

      `string` — Authentication status for the connected account

    - **`connection_id`**

      `string` — Unique ID of the connection

    - **`connection_name`**

      `string` — Developer-assigned connection name

    - **`provider`**

      `string` — Provider name for this connection

    - **`tools`**

      `array` — List of tool names linked to this connection (empty = all tools)

      **Items:**

      `string`

  - **`description`**

    `string` — Description of the MCP configuration

  - **`id`**

    `string` — Unique ID of the MCP config

  - **`name`**

    `string` — Unique name for the MCP configuration

**Example:**

```json
{
  "config": {
    "connection_tool_mappings": [
      {}
    ],
    "description": "Summarizes daily emails and posts to Slack",
    "id": "cfg_85630864460904897",
    "name": "daily-summarizer"
  }
}
```

##### Status: 400 Invalid request

###### Content-Type: application/json

**Example:**

```json
null
```

##### Status: 401 Authentication required

###### Content-Type: application/json

**Example:**

```json
null
```

##### Status: 404 Not Found - MCP configuration does not exist

###### Content-Type: application/json

**Example:**

```json
null
```

### Update an existing MCP configuration

- **Method:** `PUT`
- **Path:** `/api/v1/mcp/configs/{config_id}`
- **Tags:** MCP Configurations

Updates the name, description, and connection-to-tool mappings for an existing MCP configuration.

#### Request Body

##### Content-Type: application/json

- **`connection_tool_mappings`**

  `array` — Updated list of connection-to-tool mappings for this MCP config

  **Items:**

  - **`connected_account_id`**

    `string` — Connected account backing this connection in the MCP instance context

  - **`connected_account_status`**

    `string` — Authentication status for the connected account

  - **`connection_id`**

    `string` — Unique ID of the connection

  - **`connection_name`**

    `string` — Developer-assigned connection name

  - **`provider`**

    `string` — Provider name for this connection

  - **`tools`**

    `array` — List of tool names linked to this connection (empty = all tools)

    **Items:**

    `string`

- **`description`**

  `string` — Updated description for the MCP configuration

**Example:**

```json
{
  "connection_tool_mappings": [
    {
      "connected_account_id": "",
      "connected_account_status": "",
      "connection_id": "",
      "connection_name": "",
      "provider": "",
      "tools": [
        ""
      ]
    }
  ],
  "description": "Updated daily summarizer config"
}
```

#### Responses

##### Status: 200 The updated MCP configuration

###### Content-Type: application/json

- **`config`**

  `object` — The updated MCP configuration

  - **`connection_tool_mappings`**

    `array` — List of connection-to-tool mappings for this MCP config

    **Items:**

    - **`connected_account_id`**

      `string` — Connected account backing this connection in the MCP instance context

    - **`connected_account_status`**

      `string` — Authentication status for the connected account

    - **`connection_id`**

      `string` — Unique ID of the connection

    - **`connection_name`**

      `string` — Developer-assigned connection name

    - **`provider`**

      `string` — Provider name for this connection

    - **`tools`**

      `array` — List of tool names linked to this connection (empty = all tools)

      **Items:**

      `string`

  - **`description`**

    `string` — Description of the MCP configuration

  - **`id`**

    `string` — Unique ID of the MCP config

  - **`name`**

    `string` — Unique name for the MCP configuration

**Example:**

```json
{
  "config": {
    "connection_tool_mappings": [
      {}
    ],
    "description": "Summarizes daily emails and posts to Slack",
    "id": "cfg_85630864460904897",
    "name": "daily-summarizer"
  }
}
```

##### Status: 400 Invalid request - malformed payload or invalid mappings

###### Content-Type: application/json

**Example:**

```json
null
```

##### Status: 401 Authentication required

###### Content-Type: application/json

**Example:**

```json
null
```

##### Status: 404 Not Found - MCP configuration does not exist

###### Content-Type: application/json

**Example:**

```json
null
```

### Delete an MCP configuration

- **Method:** `DELETE`
- **Path:** `/api/v1/mcp/configs/{config_id}`
- **Tags:** MCP Configurations

Deletes the MCP configuration and any associated mappings and instances in the current environment.

#### Responses

##### Status: 200 MCP configuration and associated data deleted successfully

###### Content-Type: application/json

**Example:**

```json
null
```

##### Status: 400 Invalid request

###### Content-Type: application/json

**Example:**

```json
null
```

##### Status: 401 Authentication required

###### Content-Type: application/json

**Example:**

```json
null
```

##### Status: 404 Not Found - MCP configuration does not exist

###### Content-Type: application/json

**Example:**

```json
null
```

### List connected accounts for an MCP configuration

- **Method:** `POST`
- **Path:** `/api/v1/mcp/configs/{config_id}/connected_accounts`
- **Tags:** mcp-configs

Returns the connected account state for each connection in the MCP configuration for the given user identifier. When include\_auth\_link is true, creates connected accounts on the fly if they do not exist and returns a fresh authentication link per connection. When include\_auth\_link is false or omitted, returns the current status of existing connected accounts only — no accounts are created and authentication\_link is always empty. Authentication links are only present when the connection has an associated key; if the connection has no key, authentication\_link is empty regardless of include\_auth\_link.

#### Request Body

##### Content-Type: application/json

- **`identifier` (required)**

  `string` — Identifier for the end user whose connected accounts to retrieve

- **`include_auth_link`**

  `boolean` — When true, generates a fresh authentication link for each connection and creates connected accounts if they do not exist. When false or omitted, returns existing connected account status without creating accounts or generating links.

**Example:**

```json
{
  "identifier": "john.doe@example.com",
  "include_auth_link": true
}
```

#### Responses

##### Status: 200 Connected account state returned for each connection in the configuration

###### Content-Type: application/json

- **`connected_accounts`**

  `array` — Connected account state for each connection in the configuration

  **Items:**

  - **`authentication_link`**

    `string` — Fresh authentication link for the connected account. Empty when include\_auth\_link is false or when the connection has no associated key.

  - **`connected_account_id`**

    `string` — ID of the connected account for this user and connection

  - **`connected_account_status`**

    `string` — Authentication status of the connected account

  - **`connection_id`**

    `string` — ID of the connection

  - **`connection_name`**

    `string` — Name of the connection

  - **`provider`**

    `string` — Provider identifier for the connection

**Example:**

```json
{
  "connected_accounts": [
    {
      "authentication_link": "",
      "connected_account_id": "",
      "connected_account_status": "",
      "connection_id": "",
      "connection_name": "",
      "provider": ""
    }
  ]
}
```

##### Status: 400 Bad request - config\_id or identifier is missing or invalid

###### Content-Type: application/json

**Example:**

```json
null
```

##### Status: 404 Not found - no MCP configuration exists with the given config\_id

###### Content-Type: application/json

**Example:**

```json
null
```

### Create an MCP session token

- **Method:** `POST`
- **Path:** `/api/v1/mcp/configs/{mcp_config_id}/tokens`
- **Tags:** mcp-configs

Mints a short-lived JWT that represents a user identifier across the connected accounts associated with an MCP configuration. The supplied identifier becomes the token's `sub` claim; the token's `aud` claim is the MCP server URL bound to the configuration. Claims also carry the MCP configuration ID (`mcp_cfg`) and the list of resolved connected-account IDs (`ca_ids`). Use this operation to issue a single credential an MCP server can present on the user's behalf when calling provider tools. The mint fails if any connection mapped to the configuration has no active connected account for the identifier.

#### Request Body

##### Content-Type: application/json

- **`identifier` (required)**

  `string` — Upstream-provider identifier (typically the user's email or provider user-id) shared by the connected accounts the token represents. A single identifier can map to one connected account per connection in the MCP configuration.

- **`expiry`**

  `string` — Optional token lifetime. Must be between 60s and 24h. Defaults to 1h when omitted.

**Example:**

```json
{
  "expiry": "3600s",
  "identifier": "alice@acme.com"
}
```

#### Responses

##### Status: 200 Token created successfully; returns the signed JWT and its absolute expiry

###### Content-Type: application/json

- **`expires_at`**

  `string`, format: `date-time` — Absolute time at which the token expires. Equals issued\_at + expiry.

- **`token`**

  `string` — Signed JWT (RS256) whose \`sub\` claim is the supplied identifier and whose \`aud\` claim is the MCP server URL bound to the configuration. Payload also carries the MCP configuration ID (\`mcp\_cfg\`) and the resolved connected-account IDs (\`ca\_ids\`). Signed with the calling environment's active JWT signing key.

**Example:**

```json
{
  "expires_at": "",
  "token": "eyJhbGciOiJSUzI1NiIsImtpZCI6InNua18xMjMifQ.eyJhdWQiOlsiYWxpY2VAYWNtZS5jb20iXSwidG9rZW5fdHlwZSI6Im1jcF9zZXNzaW9uIn0.signature"
}
```

##### Status: 400 Invalid request - mcp\_config\_id or identifier is missing or malformed, expiry is outside the 60s-24h window, the MCP configuration has no connections, or a connection has no active connected account for the supplied identifier

###### Content-Type: application/json

**Example:**

```json
null
```

##### Status: 404 Not Found - no MCP configuration exists with the supplied ID in the caller's environment

###### Content-Type: application/json

**Example:**

```json
null
```

### List MCP instances

- **Method:** `GET`
- **Path:** `/api/v1/mcp/instances`
- **Tags:** MCP Instances

Lists MCP instances for the current environment with optional filters for instance id, name, configuration, and text search across name or user identifier.

#### Responses

##### Status: 200 Paginated list of MCP instances

###### Content-Type: application/json

- **`instances`**

  `array` — List of MCP instances

  **Items:**

  - **`config`**

    `object` — Configuration backing this instance

    - **`connection_tool_mappings`**

      `array` — List of connection-to-tool mappings for this MCP config

      **Items:**

      - **`connected_account_id`**

        `string` — Connected account backing this connection in the MCP instance context

      - **`connected_account_status`**

        `string` — Authentication status for the connected account

      - **`connection_id`**

        `string` — Unique ID of the connection

      - **`connection_name`**

        `string` — Developer-assigned connection name

      - **`provider`**

        `string` — Provider name for this connection

      - **`tools`**

        `array` — List of tool names linked to this connection (empty = all tools)

        **Items:**

        `string`

    - **`description`**

      `string` — Description of the MCP configuration

    - **`id`**

      `string` — Unique ID of the MCP config

    - **`name`**

      `string` — Unique name for the MCP configuration

  - **`id`**

    `string` — Unique ID of the MCP instance

  - **`last_used_at`**

    `string`, format: `date-time` — Timestamp when the instance was last used

  - **`name`**

    `string` — Display name of the instance

  - **`updated_at`**

    `string`, format: `date-time` — Timestamp when the instance was last updated

  - **`url`**

    `string` — URL to reach the MCP instance

  - **`user_identifier`**

    `string` — Identifier for the user who owns or uses this instance

- **`next_page_token`**

  `string` — Pagination token to fetch the next page

- **`prev_page_token`**

  `string` — Pagination token to fetch the previous page

- **`total_size`**

  `integer`, format: `int64` — Total number of instances matching the filter

**Example:**

```json
{
  "instances": [
    {
      "config": null,
      "id": "inst_88630864544790977",
      "last_used_at": "0001-01-01T00:00:00Z",
      "name": "daily-digest",
      "updated_at": "2025-10-07T12:21:00Z",
      "url": "https://example.com/mcp/v1/abc123",
      "user_identifier": "akshay.parihar"
    }
  ],
  "next_page_token": "",
  "prev_page_token": "",
  "total_size": 1
}
```

##### Status: 400 Invalid request

###### Content-Type: application/json

**Example:**

```json
null
```

##### Status: 401 Authentication required

###### Content-Type: application/json

**Example:**

```json
null
```

### Get or create an MCP instance

- **Method:** `POST`
- **Path:** `/api/v1/mcp/instances`
- **Tags:** MCP Instances

Returns an existing MCP instance for the given configuration, name, and user identifier or creates one if none exists.

#### Request Body

##### Content-Type: application/json

- **`config_name`**

  `string` — Name of the MCP configuration to associate with the instance

- **`name`**

  `string` — Display name for the MCP instance

- **`user_identifier`**

  `string` — Identifier for the end user requesting the instance

**Example:**

```json
{
  "config_name": "daily-summarizer",
  "name": "daily-digest",
  "user_identifier": "akshay.parihar"
}
```

#### Responses

##### Status: 200 The existing or newly created MCP instance

###### Content-Type: application/json

- **`instance`**

  `object` — Details of the MCP instance

  - **`config`**

    `object` — Configuration backing this instance

    - **`connection_tool_mappings`**

      `array` — List of connection-to-tool mappings for this MCP config

      **Items:**

      - **`connected_account_id`**

        `string` — Connected account backing this connection in the MCP instance context

      - **`connected_account_status`**

        `string` — Authentication status for the connected account

      - **`connection_id`**

        `string` — Unique ID of the connection

      - **`connection_name`**

        `string` — Developer-assigned connection name

      - **`provider`**

        `string` — Provider name for this connection

      - **`tools`**

        `array` — List of tool names linked to this connection (empty = all tools)

        **Items:**

        `string`

    - **`description`**

      `string` — Description of the MCP configuration

    - **`id`**

      `string` — Unique ID of the MCP config

    - **`name`**

      `string` — Unique name for the MCP configuration

  - **`id`**

    `string` — Unique ID of the MCP instance

  - **`last_used_at`**

    `string`, format: `date-time` — Timestamp when the instance was last used

  - **`name`**

    `string` — Display name of the instance

  - **`updated_at`**

    `string`, format: `date-time` — Timestamp when the instance was last updated

  - **`url`**

    `string` — URL to reach the MCP instance

  - **`user_identifier`**

    `string` — Identifier for the user who owns or uses this instance

**Example:**

```json
{
  "instance": {
    "config": null,
    "id": "inst_88630864544790977",
    "last_used_at": "0001-01-01T00:00:00Z",
    "name": "daily-digest",
    "updated_at": "2025-10-07T12:21:00Z",
    "url": "https://example.com/mcp/v1/abc123",
    "user_identifier": "akshay.parihar"
  }
}
```

##### Status: 400 Invalid request

###### Content-Type: application/json

**Example:**

```json
null
```

##### Status: 401 Authentication required

###### Content-Type: application/json

**Example:**

```json
null
```

### Fetch an MCP instance

- **Method:** `GET`
- **Path:** `/api/v1/mcp/instances/{instance_id}`
- **Tags:** MCP Instances

Returns a single MCP instance for the current environment by ID.

#### Responses

##### Status: 200 The requested MCP instance

###### Content-Type: application/json

- **`instance`**

  `object` — The requested MCP instance

  - **`config`**

    `object` — Configuration backing this instance

    - **`connection_tool_mappings`**

      `array` — List of connection-to-tool mappings for this MCP config

      **Items:**

      - **`connected_account_id`**

        `string` — Connected account backing this connection in the MCP instance context

      - **`connected_account_status`**

        `string` — Authentication status for the connected account

      - **`connection_id`**

        `string` — Unique ID of the connection

      - **`connection_name`**

        `string` — Developer-assigned connection name

      - **`provider`**

        `string` — Provider name for this connection

      - **`tools`**

        `array` — List of tool names linked to this connection (empty = all tools)

        **Items:**

        `string`

    - **`description`**

      `string` — Description of the MCP configuration

    - **`id`**

      `string` — Unique ID of the MCP config

    - **`name`**

      `string` — Unique name for the MCP configuration

  - **`id`**

    `string` — Unique ID of the MCP instance

  - **`last_used_at`**

    `string`, format: `date-time` — Timestamp when the instance was last used

  - **`name`**

    `string` — Display name of the instance

  - **`updated_at`**

    `string`, format: `date-time` — Timestamp when the instance was last updated

  - **`url`**

    `string` — URL to reach the MCP instance

  - **`user_identifier`**

    `string` — Identifier for the user who owns or uses this instance

**Example:**

```json
{
  "instance": {
    "config": null,
    "id": "inst_88630864544790977",
    "last_used_at": "0001-01-01T00:00:00Z",
    "name": "daily-digest",
    "updated_at": "2025-10-07T12:21:00Z",
    "url": "https://example.com/mcp/v1/abc123",
    "user_identifier": "akshay.parihar"
  }
}
```

##### Status: 400 Invalid request

###### Content-Type: application/json

**Example:**

```json
null
```

##### Status: 401 Authentication required

###### Content-Type: application/json

**Example:**

```json
null
```

##### Status: 404 Not Found - MCP instance does not exist

###### Content-Type: application/json

**Example:**

```json
null
```

### Delete an MCP instance

- **Method:** `DELETE`
- **Path:** `/api/v1/mcp/instances/{instance_id}`
- **Tags:** MCP Instances

Deletes a single MCP instance in the current environment.

#### Responses

##### Status: 200 MCP instance deleted successfully

###### Content-Type: application/json

**Example:**

```json
null
```

##### Status: 400 Invalid request

###### Content-Type: application/json

**Example:**

```json
null
```

##### Status: 401 Authentication required

###### Content-Type: application/json

**Example:**

```json
null
```

##### Status: 404 Not Found - MCP instance does not exist

###### Content-Type: application/json

**Example:**

```json
null
```

### Update an MCP instance

- **Method:** `PATCH`
- **Path:** `/api/v1/mcp/instances/{instance_id}`
- **Tags:** MCP Instances

Updates attributes of an MCP instance. Currently only the config name can be changed, which rebuilds the instance mappings.

#### Request Body

##### Content-Type: application/json

- **`config_name`**

  `string` — New MCP configuration name to attach to the instance

- **`name`**

  `string` — New display name for the MCP instance

**Example:**

```json
{
  "config_name": "daily-summarizer",
  "name": "daily-digest-updated"
}
```

#### Responses

##### Status: 200 The updated MCP instance

###### Content-Type: application/json

- **`instance`**

  `object` — Updated MCP instance

  - **`config`**

    `object` — Configuration backing this instance

    - **`connection_tool_mappings`**

      `array` — List of connection-to-tool mappings for this MCP config

      **Items:**

      - **`connected_account_id`**

        `string` — Connected account backing this connection in the MCP instance context

      - **`connected_account_status`**

        `string` — Authentication status for the connected account

      - **`connection_id`**

        `string` — Unique ID of the connection

      - **`connection_name`**

        `string` — Developer-assigned connection name

      - **`provider`**

        `string` — Provider name for this connection

      - **`tools`**

        `array` — List of tool names linked to this connection (empty = all tools)

        **Items:**

        `string`

    - **`description`**

      `string` — Description of the MCP configuration

    - **`id`**

      `string` — Unique ID of the MCP config

    - **`name`**

      `string` — Unique name for the MCP configuration

  - **`id`**

    `string` — Unique ID of the MCP instance

  - **`last_used_at`**

    `string`, format: `date-time` — Timestamp when the instance was last used

  - **`name`**

    `string` — Display name of the instance

  - **`updated_at`**

    `string`, format: `date-time` — Timestamp when the instance was last updated

  - **`url`**

    `string` — URL to reach the MCP instance

  - **`user_identifier`**

    `string` — Identifier for the user who owns or uses this instance

**Example:**

```json
{
  "instance": {
    "config": null,
    "id": "inst_88630864544790977",
    "last_used_at": "0001-01-01T00:00:00Z",
    "name": "daily-digest",
    "updated_at": "2025-10-07T12:21:00Z",
    "url": "https://example.com/mcp/v1/abc123",
    "user_identifier": "akshay.parihar"
  }
}
```

##### Status: 400 Invalid request

###### Content-Type: application/json

**Example:**

```json
null
```

##### Status: 401 Authentication required

###### Content-Type: application/json

**Example:**

```json
null
```

##### Status: 404 Not Found - MCP instance does not exist

###### Content-Type: application/json

**Example:**

```json
null
```

### Fetch connection auth state for an MCP instance

- **Method:** `POST`
- **Path:** `/api/v1/mcp/instances/{instance_id}:get_auth_state`
- **Tags:** MCP Instances

Returns the connected account status and fresh authentication links for each connection mapped to the MCP instance.

#### Responses

##### Status: 200 Authentication state for each connection in the MCP instance

###### Content-Type: application/json

- **`connections`**

  `array` — Status of each connection mapped to the instance

  **Items:**

  - **`authentication_link`**

    `string` — Magic link for reconnecting the connected account

  - **`connected_account_id`**

    `string` — Connected account backing the connection

  - **`connected_account_status`**

    `string` — Current authentication status of the connected account

  - **`connection_id`**

    `string` — Underlying connection identifier

  - **`connection_name`**

    `string` — Developer-assigned connection name

  - **`provider`**

    `string` — Provider backing the connection

**Example:**

```json
{
  "connections": [
    {
      "authentication_link": "",
      "connected_account_id": "",
      "connected_account_status": "",
      "connection_id": "",
      "connection_name": "",
      "provider": ""
    }
  ]
}
```

##### Status: 400 Invalid request

###### Content-Type: application/json

**Example:**

```json
null
```

##### Status: 401 Authentication required

###### Content-Type: application/json

**Example:**

```json
null
```

##### Status: 404 Not Found - MCP instance does not exist

###### Content-Type: application/json

**Example:**

```json
null
```

## Webhooks

### Connected Account Created

- **Method:**`POST`
- **Path:**`/webhooks/connected_account.created`

Triggered when a new connected account is created

### Connected Account Updated

- **Method:**`POST`
- **Path:**`/webhooks/connected_account.updated`

Triggered when a connected account is updated

### Connected Account Deleted

- **Method:**`POST`
- **Path:**`/webhooks/connected_account.deleted`

Triggered when a connected account is deleted

### Connected Account Magic Link Generated

- **Method:**`POST`
- **Path:**`/webhooks/connected_account.magic_link_generated`

Triggered when a magic link is generated for OAuth flow

### Connected Account OAuth Tokens Fetched

- **Method:**`POST`
- **Path:**`/webhooks/connected_account.oauth_tokens_fetched`

Triggered when OAuth tokens are successfully fetched

### Connected Account Token Refresh Succeeded

- **Method:**`POST`
- **Path:**`/webhooks/connected_account.token_refresh_succeeded`

Triggered when token refresh succeeds

### Connected Account Token Refresh Failed

- **Method:**`POST`
- **Path:**`/webhooks/connected_account.token_refresh_failed`

Triggered when token refresh fails

### Connected Account OAuth Succeeded

- **Method:**`POST`
- **Path:**`/webhooks/connected_account.oauth_succeeded`

Triggered when OAuth authentication succeeds

## Schemas

### Type of authentication mechanism used for the connected account

- **Type:**`string`

* OAUTH: OAuth 2.0 authorization with access and refresh tokens
* API\_KEY: Static API key authentication
* BASIC\_AUTH: HTTP Basic Authentication (username/password)
* BEARER\_TOKEN: Bearer token authentication
* CUSTOM: Custom authentication mechanism
* BASIC: Basic authentication (alias)
* OAUTH\_M2M: OAuth 2.0 client credentials (machine-to-machine)
* TRELLO\_OAUTH1: Trello token-based OAuth1-style browser authorization
* GOOGLE\_DWD: Google Domain-Wide Delegation

**Example:**

### Status of a connected account indicating its current state

- **Type:**`string`

* ACTIVE: Account is connected and credentials are valid
* EXPIRED: Access token has expired and needs refresh
* PENDING\_AUTH: Account awaiting user authorization (re-auth initiated)
* PENDING\_VERIFICATION: OAuth complete; awaiting user identity verification before activation
* DISCONNECTED: Account has been manually disconnected

**Example:**

### Connected account summary for list operations - excludes sensitive authorization details

- **Type:**`object`

* **`authorization_type`**

  `string`, possible values: `"OAUTH", "API_KEY", "BASIC_AUTH", "BEARER_TOKEN", "CUSTOM", "BASIC", "OAUTH_M2M", "TRELLO_OAUTH1", "GOOGLE_DWD"` — Authorization mechanism type.

* **`connection_id`**

  `string` — Parent connection configuration reference.

* **`connector`**

  `string` — Connector identifier.

* **`id`**

  `string` — Unique connected account identifier.

* **`identifier`**

  `string` — The unique identifier for this account in the third-party service.

* **`last_used_at`**

  `string`, format: `date-time` — Last usage timestamp.

* **`provider`**

  `string` — OAuth provider name (e.g., 'google', 'microsoft').

* **`status`**

  `string`, possible values: `"ACTIVE", "EXPIRED", "PENDING_AUTH", "PENDING_VERIFICATION", "DISCONNECTED"` — Current connection status.

* **`token_expires_at`**

  `string`, format: `date-time` — Token expiration timestamp.

* **`updated_at`**

  `string`, format: `date-time` — Last modification timestamp.

**Example:**

```json
{
  "authorization_type": "OAUTH",
  "connection_id": "conn_24834495392086178",
  "connector": "notion",
  "id": "ca_24834495392086178",
  "identifier": "user@example.com",
  "last_used_at": "2024-03-20T14:30:00Z",
  "provider": "google",
  "status": "ACTIVE",
  "token_expires_at": "2024-12-31T23:59:59Z",
  "updated_at": "2024-03-20T15:04:05Z"
}
```

### connected\_accountsListConnectedAccountsResponse

- **Type:**`object`

* **`connected_accounts`**

  `array` — List of connected accounts matching the filter criteria. Excludes sensitive authorization details for security.

  **Items:**

  - **`authorization_type`**

    `string`, possible values: `"OAUTH", "API_KEY", "BASIC_AUTH", "BEARER_TOKEN", "CUSTOM", "BASIC", "OAUTH_M2M", "TRELLO_OAUTH1", "GOOGLE_DWD"` — Authorization mechanism type.

  - **`connection_id`**

    `string` — Parent connection configuration reference.

  - **`connector`**

    `string` — Connector identifier.

  - **`id`**

    `string` — Unique connected account identifier.

  - **`identifier`**

    `string` — The unique identifier for this account in the third-party service.

  - **`last_used_at`**

    `string`, format: `date-time` — Last usage timestamp.

  - **`provider`**

    `string` — OAuth provider name (e.g., 'google', 'microsoft').

  - **`status`**

    `string`, possible values: `"ACTIVE", "EXPIRED", "PENDING_AUTH", "PENDING_VERIFICATION", "DISCONNECTED"` — Current connection status.

  - **`token_expires_at`**

    `string`, format: `date-time` — Token expiration timestamp.

  - **`updated_at`**

    `string`, format: `date-time` — Last modification timestamp.

* **`next_page_token`**

  `string` — Pagination token for retrieving the next page. Empty if this is the last page. Pass this value to page\_token in the next request.

* **`prev_page_token`**

  `string` — Pagination token for retrieving the previous page. Empty if this is the first page. Pass this value to page\_token to go back.

* **`total_size`**

  `integer`, format: `int64` — Total count of connected accounts matching the filter criteria across all pages. Use for calculating pagination.

**Example:**

```json
{
  "connected_accounts": [
    {
      "authorization_type": null,
      "connection_id": "conn_24834495392086178",
      "connector": "notion",
      "id": "ca_24834495392086178",
      "identifier": "user@example.com",
      "last_used_at": "2024-03-20T14:30:00Z",
      "provider": "google",
      "status": null,
      "token_expires_at": "2024-12-31T23:59:59Z",
      "updated_at": "2024-03-20T15:04:05Z"
    }
  ],
  "next_page_token": "eyJvZmZzZXQiOjIwfQ==",
  "prev_page_token": "eyJvZmZzZXQiOjB9",
  "total_size": 100
}
```

### connected\_accountsGoogleDWDAuth

- **Type:**`object`

Google Domain-Wide Delegation authentication — used for GOOGLE\_DWD connections. Send only subject in requests; access\_token, scopes, and token\_expires\_at are response-only.

- **`access_token`**

  `string` — OAuth access token acquired via the jwt-bearer grant. Present in responses only.

- **`scopes`**

  `array` — OAuth scopes granted to this token. Present in responses only.

  **Items:**

  `string`

- **`subject`**

  `string` — Email address of the Google Workspace user to impersonate via Domain-Wide Delegation.

- **`token_expires_at`**

  `string`, format: `date-time` — When the access token expires. Present in responses only.

**Example:**

```json
{
  "access_token": "ya29.a0AfH6SMBx...",
  "scopes": [
    "openid",
    "https://www.googleapis.com/auth/userinfo.email"
  ],
  "subject": "user@example.com",
  "token_expires_at": ""
}
```

### OAuth 2.0 access and refresh tokens with scopes

- **Type:**`object`

* **`access_token`**

  `string` — OAuth access token for API requests. Typically short-lived and must be refreshed after expiration.

* **`domain`**

  `string` — Associated domain for workspace or organization-scoped OAuth connections (e.g., Google Workspace domain).

* **`refresh_token`**

  `string` — OAuth refresh token for obtaining new access tokens. Long-lived and used to maintain persistent authorization.

* **`scopes`**

  `array` — List of granted OAuth scopes defining the permissions and access levels for this connection.

  **Items:**

  `string`

**Example:**

```json
{
  "access_token": "ya29.a0AfH6SMBx...",
  "domain": "example.com",
  "refresh_token": "1//0gHJxZ-Lb2...",
  "scopes": [
    "https://www.googleapis.com/auth/drive.readonly",
    "https://www.googleapis.com/auth/userinfo.email"
  ]
}
```

### Static authentication credentials for API keys, bearer tokens, or basic auth

- **Type:**`object`

* **`details`**

  `object` — Flexible JSON structure containing static credentials. Format varies by connector type (API key, username/password, etc.).

**Example:**

```json
{
  "details": {
    "api_key": "sk_live_...",
    "api_secret": "..."
  }
}
```

### Authentication credentials container supporting multiple auth types

- **Type:**`object`

* **`google_dwd`**

  `object` — Google Domain-Wide Delegation authentication — used for GOOGLE\_DWD connections. Send only subject in requests; access\_token, scopes, and token\_expires\_at are response-only.

  - **`access_token`**

    `string` — OAuth access token acquired via the jwt-bearer grant. Present in responses only.

  - **`scopes`**

    `array` — OAuth scopes granted to this token. Present in responses only.

    **Items:**

    `string`

  - **`subject`**

    `string` — Email address of the Google Workspace user to impersonate via Domain-Wide Delegation.

  - **`token_expires_at`**

    `string`, format: `date-time` — When the access token expires. Present in responses only.

* **`oauth_token`**

  `object`

  - **`access_token`**

    `string` — OAuth access token for API requests. Typically short-lived and must be refreshed after expiration.

  - **`domain`**

    `string` — Associated domain for workspace or organization-scoped OAuth connections (e.g., Google Workspace domain).

  - **`refresh_token`**

    `string` — OAuth refresh token for obtaining new access tokens. Long-lived and used to maintain persistent authorization.

  - **`scopes`**

    `array` — List of granted OAuth scopes defining the permissions and access levels for this connection.

    **Items:**

    `string`

* **`static_auth`**

  `object`

  - **`details`**

    `object` — Flexible JSON structure containing static credentials. Format varies by connector type (API key, username/password, etc.).

**Example:**

```json
{
  "google_dwd": {
    "access_token": "ya29.a0AfH6SMBx...",
    "scopes": [
      "openid",
      "https://www.googleapis.com/auth/userinfo.email"
    ],
    "subject": "user@example.com",
    "token_expires_at": ""
  },
  "oauth_token": {
    "access_token": "ya29.a0AfH6SMBx...",
    "domain": "example.com",
    "refresh_token": "1//0gHJxZ-Lb2...",
    "scopes": [
      "https://www.googleapis.com/auth/drive.readonly",
      "https://www.googleapis.com/auth/userinfo.email"
    ]
  },
  "static_auth": {
    "details": {
      "api_key": "sk_live_...",
      "api_secret": "..."
    }
  }
}
```

### Payload for updating an existing connected account - all fields optional

- **Type:**`object`

* **`api_config`**

  `object` — Updated JSON configuration for API-specific settings. Merges with existing configuration - only provided fields are modified.

* **`authorization_details`**

  `object` — Updated authentication credentials. Provide new OAuth tokens (e.g., after refresh) or updated static auth details. Only included fields will be modified.

  - **`google_dwd`**

    `object` — Google Domain-Wide Delegation authentication — used for GOOGLE\_DWD connections. Send only subject in requests; access\_token, scopes, and token\_expires\_at are response-only.

    - **`access_token`**

      `string` — OAuth access token acquired via the jwt-bearer grant. Present in responses only.

    - **`scopes`**

      `array` — OAuth scopes granted to this token. Present in responses only.

      **Items:**

      `string`

    - **`subject`**

      `string` — Email address of the Google Workspace user to impersonate via Domain-Wide Delegation.

    - **`token_expires_at`**

      `string`, format: `date-time` — When the access token expires. Present in responses only.

  - **`oauth_token`**

    `object`

    - **`access_token`**

      `string` — OAuth access token for API requests. Typically short-lived and must be refreshed after expiration.

    - **`domain`**

      `string` — Associated domain for workspace or organization-scoped OAuth connections (e.g., Google Workspace domain).

    - **`refresh_token`**

      `string` — OAuth refresh token for obtaining new access tokens. Long-lived and used to maintain persistent authorization.

    - **`scopes`**

      `array` — List of granted OAuth scopes defining the permissions and access levels for this connection.

      **Items:**

      `string`

  - **`static_auth`**

    `object`

    - **`details`**

      `object` — Flexible JSON structure containing static credentials. Format varies by connector type (API key, username/password, etc.).

**Example:**

```json
{
  "api_config": {
    "rate_limit": 2000,
    "timeout": 60
  },
  "authorization_details": {
    "oauth_token": {
      "access_token": "ya29.new_token...",
      "refresh_token": "1//0g...",
      "scopes": [
        "email",
        "profile",
        "calendar"
      ]
    }
  }
}
```

### connected\_accountsUpdateConnectedAccountRequest

- **Type:**`object`

* **`connected_account`**

  `object` — Details of the connected account to update

  - **`api_config`**

    `object` — Updated JSON configuration for API-specific settings. Merges with existing configuration - only provided fields are modified.

  - **`authorization_details`**

    `object` — Updated authentication credentials. Provide new OAuth tokens (e.g., after refresh) or updated static auth details. Only included fields will be modified.

    - **`google_dwd`**

      `object` — Google Domain-Wide Delegation authentication — used for GOOGLE\_DWD connections. Send only subject in requests; access\_token, scopes, and token\_expires\_at are response-only.

      - **`access_token`**

        `string` — OAuth access token acquired via the jwt-bearer grant. Present in responses only.

      - **`scopes`**

        `array` — OAuth scopes granted to this token. Present in responses only.

        **Items:**

        `string`

      - **`subject`**

        `string` — Email address of the Google Workspace user to impersonate via Domain-Wide Delegation.

      - **`token_expires_at`**

        `string`, format: `date-time` — When the access token expires. Present in responses only.

    - **`oauth_token`**

      `object`

      - **`access_token`**

        `string` — OAuth access token for API requests. Typically short-lived and must be refreshed after expiration.

      - **`domain`**

        `string` — Associated domain for workspace or organization-scoped OAuth connections (e.g., Google Workspace domain).

      - **`refresh_token`**

        `string` — OAuth refresh token for obtaining new access tokens. Long-lived and used to maintain persistent authorization.

      - **`scopes`**

        `array` — List of granted OAuth scopes defining the permissions and access levels for this connection.

        **Items:**

        `string`

    - **`static_auth`**

      `object`

      - **`details`**

        `object` — Flexible JSON structure containing static credentials. Format varies by connector type (API key, username/password, etc.).

* **`connector`**

  `string` — Connector identifier (e.g., 'notion', 'slack', 'google'). Alphanumeric characters, spaces, hyphens, underscores, and colons are allowed.

* **`id`**

  `string` — Unique identifier for the connected account to update

* **`identifier`**

  `string` — The unique identifier for the connected account within the third-party service (e.g., email address, user ID, workspace identifier).

* **`organization_id`**

  `string` — Organization ID for the connector

* **`user_id`**

  `string` — User ID for the connector

**Example:**

```json
{
  "connected_account": {
    "authorization_details": {
      "oauth_token": {
        "access_token": "...",
        "refresh_token": "...",
        "scopes": [
          "read",
          "write"
        ]
      }
    },
    "authorization_type": "OAUTH2"
  },
  "connector": "notion",
  "id": "ca_123",
  "identifier": "user@example.com",
  "organization_id": "org_121312434123312",
  "user_id": "user_121312434123312"
}
```

### connected\_accountsConnectedAccount

- **Type:**`object`

* **`api_config`**

  `object` — Optional JSON configuration for connector-specific API settings such as rate limits, custom endpoints, or feature flags.

* **`authorization_details`**

  `object` — Sensitive authentication credentials including access tokens, refresh tokens, and scopes. Contains either OAuth tokens or static auth details.

  - **`google_dwd`**

    `object` — Google Domain-Wide Delegation authentication — used for GOOGLE\_DWD connections. Send only subject in requests; access\_token, scopes, and token\_expires\_at are response-only.

    - **`access_token`**

      `string` — OAuth access token acquired via the jwt-bearer grant. Present in responses only.

    - **`scopes`**

      `array` — OAuth scopes granted to this token. Present in responses only.

      **Items:**

      `string`

    - **`subject`**

      `string` — Email address of the Google Workspace user to impersonate via Domain-Wide Delegation.

    - **`token_expires_at`**

      `string`, format: `date-time` — When the access token expires. Present in responses only.

  - **`oauth_token`**

    `object`

    - **`access_token`**

      `string` — OAuth access token for API requests. Typically short-lived and must be refreshed after expiration.

    - **`domain`**

      `string` — Associated domain for workspace or organization-scoped OAuth connections (e.g., Google Workspace domain).

    - **`refresh_token`**

      `string` — OAuth refresh token for obtaining new access tokens. Long-lived and used to maintain persistent authorization.

    - **`scopes`**

      `array` — List of granted OAuth scopes defining the permissions and access levels for this connection.

      **Items:**

      `string`

  - **`static_auth`**

    `object`

    - **`details`**

      `object` — Flexible JSON structure containing static credentials. Format varies by connector type (API key, username/password, etc.).

* **`authorization_type`**

  `string`, possible values: `"OAUTH", "API_KEY", "BASIC_AUTH", "BEARER_TOKEN", "CUSTOM", "BASIC", "OAUTH_M2M", "TRELLO_OAUTH1", "GOOGLE_DWD"` — Type of authorization mechanism used. Specifies whether this connection uses OAuth, API keys, bearer tokens, or other auth methods.

* **`connection_id`**

  `string` — Reference to the parent connection configuration. Links this account to a specific connector setup in your environment.

* **`connector`**

  `string` — Connector identifier (e.g., 'notion', 'slack', 'salesforce'). Indicates which third-party application this account connects to.

* **`id`**

  `string` — Unique Scalekit-generated identifier for this connected account. Always prefixed with 'ca\_'.

* **`identifier`**

  `string` — The unique identifier for this account in the third-party service. Typically an email address, user ID, or workspace identifier.

* **`last_used_at`**

  `string`, format: `date-time` — Timestamp when this connected account was last used to make an API call. Useful for tracking active connections.

* **`provider`**

  `string` — OAuth provider name (e.g., 'google', 'microsoft', 'github'). Identifies which authentication service manages this connection.

* **`status`**

  `string`, possible values: `"ACTIVE", "EXPIRED", "PENDING_AUTH", "PENDING_VERIFICATION", "DISCONNECTED"` — Current status of the connected account. Indicates if the account is active, expired, pending authorization, or pending user identity verification.

* **`token_expires_at`**

  `string`, format: `date-time` — Expiration timestamp for the access token. After this time, the token must be refreshed or re-authorized.

* **`updated_at`**

  `string`, format: `date-time` — Timestamp when this connected account was last modified. Updated whenever credentials or configuration changes.

**Example:**

```json
{
  "api_config": {
    "base_url": "https://api.custom-domain.com",
    "rate_limit": 1000,
    "timeout": 30
  },
  "authorization_details": {
    "google_dwd": null,
    "oauth_token": null,
    "static_auth": null
  },
  "authorization_type": "OAUTH",
  "connection_id": "conn_24834495392086178",
  "connector": "notion",
  "id": "ca_24834495392086178",
  "identifier": "user@example.com",
  "last_used_at": "2024-03-20T14:30:00Z",
  "provider": "google",
  "status": "ACTIVE",
  "token_expires_at": "2024-12-31T23:59:59Z",
  "updated_at": "2024-03-20T15:04:05Z"
}
```

### connected\_accountsUpdateConnectedAccountResponse

- **Type:**`object`

* **`connected_account`**

  `object` — The updated connected account with refreshed credentials, new token expiry, and modified configuration settings.

  - **`api_config`**

    `object` — Optional JSON configuration for connector-specific API settings such as rate limits, custom endpoints, or feature flags.

  - **`authorization_details`**

    `object` — Sensitive authentication credentials including access tokens, refresh tokens, and scopes. Contains either OAuth tokens or static auth details.

    - **`google_dwd`**

      `object` — Google Domain-Wide Delegation authentication — used for GOOGLE\_DWD connections. Send only subject in requests; access\_token, scopes, and token\_expires\_at are response-only.

      - **`access_token`**

        `string` — OAuth access token acquired via the jwt-bearer grant. Present in responses only.

      - **`scopes`**

        `array` — OAuth scopes granted to this token. Present in responses only.

        **Items:**

        `string`

      - **`subject`**

        `string` — Email address of the Google Workspace user to impersonate via Domain-Wide Delegation.

      - **`token_expires_at`**

        `string`, format: `date-time` — When the access token expires. Present in responses only.

    - **`oauth_token`**

      `object`

      - **`access_token`**

        `string` — OAuth access token for API requests. Typically short-lived and must be refreshed after expiration.

      - **`domain`**

        `string` — Associated domain for workspace or organization-scoped OAuth connections (e.g., Google Workspace domain).

      - **`refresh_token`**

        `string` — OAuth refresh token for obtaining new access tokens. Long-lived and used to maintain persistent authorization.

      - **`scopes`**

        `array` — List of granted OAuth scopes defining the permissions and access levels for this connection.

        **Items:**

        `string`

    - **`static_auth`**

      `object`

      - **`details`**

        `object` — Flexible JSON structure containing static credentials. Format varies by connector type (API key, username/password, etc.).

  - **`authorization_type`**

    `string`, possible values: `"OAUTH", "API_KEY", "BASIC_AUTH", "BEARER_TOKEN", "CUSTOM", "BASIC", "OAUTH_M2M", "TRELLO_OAUTH1", "GOOGLE_DWD"` — Type of authorization mechanism used. Specifies whether this connection uses OAuth, API keys, bearer tokens, or other auth methods.

  - **`connection_id`**

    `string` — Reference to the parent connection configuration. Links this account to a specific connector setup in your environment.

  - **`connector`**

    `string` — Connector identifier (e.g., 'notion', 'slack', 'salesforce'). Indicates which third-party application this account connects to.

  - **`id`**

    `string` — Unique Scalekit-generated identifier for this connected account. Always prefixed with 'ca\_'.

  - **`identifier`**

    `string` — The unique identifier for this account in the third-party service. Typically an email address, user ID, or workspace identifier.

  - **`last_used_at`**

    `string`, format: `date-time` — Timestamp when this connected account was last used to make an API call. Useful for tracking active connections.

  - **`provider`**

    `string` — OAuth provider name (e.g., 'google', 'microsoft', 'github'). Identifies which authentication service manages this connection.

  - **`status`**

    `string`, possible values: `"ACTIVE", "EXPIRED", "PENDING_AUTH", "PENDING_VERIFICATION", "DISCONNECTED"` — Current status of the connected account. Indicates if the account is active, expired, pending authorization, or pending user identity verification.

  - **`token_expires_at`**

    `string`, format: `date-time` — Expiration timestamp for the access token. After this time, the token must be refreshed or re-authorized.

  - **`updated_at`**

    `string`, format: `date-time` — Timestamp when this connected account was last modified. Updated whenever credentials or configuration changes.

**Example:**

```json
{
  "connected_account": {
    "api_config": {
      "base_url": "https://api.custom-domain.com",
      "rate_limit": 1000,
      "timeout": 30
    },
    "authorization_details": null,
    "authorization_type": null,
    "connection_id": "conn_24834495392086178",
    "connector": "notion",
    "id": "ca_24834495392086178",
    "identifier": "user@example.com",
    "last_used_at": "2024-03-20T14:30:00Z",
    "provider": "google",
    "status": null,
    "token_expires_at": "2024-12-31T23:59:59Z",
    "updated_at": "2024-03-20T15:04:05Z"
  }
}
```

### Payload for creating a new connected account - authorization details are optional

- **Type:**`object`

* **`api_config`**

  `object` — Optional JSON configuration for connector-specific API settings such as rate limits, custom API endpoints, timeouts, or feature flags.

* **`authorization_details`**

  `object` — Optional authentication credentials for the connected account. Include OAuth tokens (access\_token, refresh\_token, scopes) or static auth details (API keys, bearer tokens). Can be provided later via update.

  - **`google_dwd`**

    `object` — Google Domain-Wide Delegation authentication — used for GOOGLE\_DWD connections. Send only subject in requests; access\_token, scopes, and token\_expires\_at are response-only.

    - **`access_token`**

      `string` — OAuth access token acquired via the jwt-bearer grant. Present in responses only.

    - **`scopes`**

      `array` — OAuth scopes granted to this token. Present in responses only.

      **Items:**

      `string`

    - **`subject`**

      `string` — Email address of the Google Workspace user to impersonate via Domain-Wide Delegation.

    - **`token_expires_at`**

      `string`, format: `date-time` — When the access token expires. Present in responses only.

  - **`oauth_token`**

    `object`

    - **`access_token`**

      `string` — OAuth access token for API requests. Typically short-lived and must be refreshed after expiration.

    - **`domain`**

      `string` — Associated domain for workspace or organization-scoped OAuth connections (e.g., Google Workspace domain).

    - **`refresh_token`**

      `string` — OAuth refresh token for obtaining new access tokens. Long-lived and used to maintain persistent authorization.

    - **`scopes`**

      `array` — List of granted OAuth scopes defining the permissions and access levels for this connection.

      **Items:**

      `string`

  - **`static_auth`**

    `object`

    - **`details`**

      `object` — Flexible JSON structure containing static credentials. Format varies by connector type (API key, username/password, etc.).

**Example:**

```json
{
  "api_config": {
    "base_url": "https://api.custom-domain.com",
    "rate_limit": 1000,
    "timeout": 30
  },
  "authorization_details": {
    "oauth_token": {
      "access_token": "ya29.a0...",
      "refresh_token": "1//0g...",
      "scopes": [
        "email",
        "profile"
      ]
    }
  }
}
```

### connected\_accountsCreateConnectedAccountRequest

- **Type:**`object`

* **`connected_account`**

  `object` — Details of the connected account to create

  - **`api_config`**

    `object` — Optional JSON configuration for connector-specific API settings such as rate limits, custom API endpoints, timeouts, or feature flags.

  - **`authorization_details`**

    `object` — Optional authentication credentials for the connected account. Include OAuth tokens (access\_token, refresh\_token, scopes) or static auth details (API keys, bearer tokens). Can be provided later via update.

    - **`google_dwd`**

      `object` — Google Domain-Wide Delegation authentication — used for GOOGLE\_DWD connections. Send only subject in requests; access\_token, scopes, and token\_expires\_at are response-only.

      - **`access_token`**

        `string` — OAuth access token acquired via the jwt-bearer grant. Present in responses only.

      - **`scopes`**

        `array` — OAuth scopes granted to this token. Present in responses only.

        **Items:**

        `string`

      - **`subject`**

        `string` — Email address of the Google Workspace user to impersonate via Domain-Wide Delegation.

      - **`token_expires_at`**

        `string`, format: `date-time` — When the access token expires. Present in responses only.

    - **`oauth_token`**

      `object`

      - **`access_token`**

        `string` — OAuth access token for API requests. Typically short-lived and must be refreshed after expiration.

      - **`domain`**

        `string` — Associated domain for workspace or organization-scoped OAuth connections (e.g., Google Workspace domain).

      - **`refresh_token`**

        `string` — OAuth refresh token for obtaining new access tokens. Long-lived and used to maintain persistent authorization.

      - **`scopes`**

        `array` — List of granted OAuth scopes defining the permissions and access levels for this connection.

        **Items:**

        `string`

    - **`static_auth`**

      `object`

      - **`details`**

        `object` — Flexible JSON structure containing static credentials. Format varies by connector type (API key, username/password, etc.).

* **`connector`**

  `string` — Connector identifier (e.g., 'notion', 'slack', 'google'). Alphanumeric characters, spaces, hyphens, underscores, and colons are allowed.

* **`identifier`**

  `string` — The unique identifier for the connected account within the third-party service (e.g., email address, user ID, workspace identifier).

* **`organization_id`**

  `string` — Organization ID for the connector

* **`user_id`**

  `string` — User ID for the connector

**Example:**

```json
{
  "connected_account": {
    "authorization_details": {
      "oauth_token": {
        "access_token": "...",
        "refresh_token": "...",
        "scopes": [
          "read",
          "write"
        ]
      }
    },
    "authorization_type": "OAUTH2"
  },
  "connector": "notion",
  "identifier": "user@example.com",
  "organization_id": "org_121312434123312",
  "user_id": "user_121312434123312"
}
```

### connected\_accountsCreateConnectedAccountResponse

- **Type:**`object`

* **`connected_account`**

  `object` — The newly created connected account with its unique identifier, status, and complete authorization details including access tokens.

  - **`api_config`**

    `object` — Optional JSON configuration for connector-specific API settings such as rate limits, custom endpoints, or feature flags.

  - **`authorization_details`**

    `object` — Sensitive authentication credentials including access tokens, refresh tokens, and scopes. Contains either OAuth tokens or static auth details.

    - **`google_dwd`**

      `object` — Google Domain-Wide Delegation authentication — used for GOOGLE\_DWD connections. Send only subject in requests; access\_token, scopes, and token\_expires\_at are response-only.

      - **`access_token`**

        `string` — OAuth access token acquired via the jwt-bearer grant. Present in responses only.

      - **`scopes`**

        `array` — OAuth scopes granted to this token. Present in responses only.

        **Items:**

        `string`

      - **`subject`**

        `string` — Email address of the Google Workspace user to impersonate via Domain-Wide Delegation.

      - **`token_expires_at`**

        `string`, format: `date-time` — When the access token expires. Present in responses only.

    - **`oauth_token`**

      `object`

      - **`access_token`**

        `string` — OAuth access token for API requests. Typically short-lived and must be refreshed after expiration.

      - **`domain`**

        `string` — Associated domain for workspace or organization-scoped OAuth connections (e.g., Google Workspace domain).

      - **`refresh_token`**

        `string` — OAuth refresh token for obtaining new access tokens. Long-lived and used to maintain persistent authorization.

      - **`scopes`**

        `array` — List of granted OAuth scopes defining the permissions and access levels for this connection.

        **Items:**

        `string`

    - **`static_auth`**

      `object`

      - **`details`**

        `object` — Flexible JSON structure containing static credentials. Format varies by connector type (API key, username/password, etc.).

  - **`authorization_type`**

    `string`, possible values: `"OAUTH", "API_KEY", "BASIC_AUTH", "BEARER_TOKEN", "CUSTOM", "BASIC", "OAUTH_M2M", "TRELLO_OAUTH1", "GOOGLE_DWD"` — Type of authorization mechanism used. Specifies whether this connection uses OAuth, API keys, bearer tokens, or other auth methods.

  - **`connection_id`**

    `string` — Reference to the parent connection configuration. Links this account to a specific connector setup in your environment.

  - **`connector`**

    `string` — Connector identifier (e.g., 'notion', 'slack', 'salesforce'). Indicates which third-party application this account connects to.

  - **`id`**

    `string` — Unique Scalekit-generated identifier for this connected account. Always prefixed with 'ca\_'.

  - **`identifier`**

    `string` — The unique identifier for this account in the third-party service. Typically an email address, user ID, or workspace identifier.

  - **`last_used_at`**

    `string`, format: `date-time` — Timestamp when this connected account was last used to make an API call. Useful for tracking active connections.

  - **`provider`**

    `string` — OAuth provider name (e.g., 'google', 'microsoft', 'github'). Identifies which authentication service manages this connection.

  - **`status`**

    `string`, possible values: `"ACTIVE", "EXPIRED", "PENDING_AUTH", "PENDING_VERIFICATION", "DISCONNECTED"` — Current status of the connected account. Indicates if the account is active, expired, pending authorization, or pending user identity verification.

  - **`token_expires_at`**

    `string`, format: `date-time` — Expiration timestamp for the access token. After this time, the token must be refreshed or re-authorized.

  - **`updated_at`**

    `string`, format: `date-time` — Timestamp when this connected account was last modified. Updated whenever credentials or configuration changes.

**Example:**

```json
{
  "connected_account": {
    "api_config": {
      "base_url": "https://api.custom-domain.com",
      "rate_limit": 1000,
      "timeout": 30
    },
    "authorization_details": null,
    "authorization_type": null,
    "connection_id": "conn_24834495392086178",
    "connector": "notion",
    "id": "ca_24834495392086178",
    "identifier": "user@example.com",
    "last_used_at": "2024-03-20T14:30:00Z",
    "provider": "google",
    "status": null,
    "token_expires_at": "2024-12-31T23:59:59Z",
    "updated_at": "2024-03-20T15:04:05Z"
  }
}
```

### connected\_accountsGetConnectedAccountByIdentifierResponse

- **Type:**`object`

* **`connected_account`**

  `object` — The connected account with complete details including sensitive authorization credentials (access tokens, refresh tokens, scopes). Handle with appropriate access controls.

  - **`api_config`**

    `object` — Optional JSON configuration for connector-specific API settings such as rate limits, custom endpoints, or feature flags.

  - **`authorization_details`**

    `object` — Sensitive authentication credentials including access tokens, refresh tokens, and scopes. Contains either OAuth tokens or static auth details.

    - **`google_dwd`**

      `object` — Google Domain-Wide Delegation authentication — used for GOOGLE\_DWD connections. Send only subject in requests; access\_token, scopes, and token\_expires\_at are response-only.

      - **`access_token`**

        `string` — OAuth access token acquired via the jwt-bearer grant. Present in responses only.

      - **`scopes`**

        `array` — OAuth scopes granted to this token. Present in responses only.

        **Items:**

        `string`

      - **`subject`**

        `string` — Email address of the Google Workspace user to impersonate via Domain-Wide Delegation.

      - **`token_expires_at`**

        `string`, format: `date-time` — When the access token expires. Present in responses only.

    - **`oauth_token`**

      `object`

      - **`access_token`**

        `string` — OAuth access token for API requests. Typically short-lived and must be refreshed after expiration.

      - **`domain`**

        `string` — Associated domain for workspace or organization-scoped OAuth connections (e.g., Google Workspace domain).

      - **`refresh_token`**

        `string` — OAuth refresh token for obtaining new access tokens. Long-lived and used to maintain persistent authorization.

      - **`scopes`**

        `array` — List of granted OAuth scopes defining the permissions and access levels for this connection.

        **Items:**

        `string`

    - **`static_auth`**

      `object`

      - **`details`**

        `object` — Flexible JSON structure containing static credentials. Format varies by connector type (API key, username/password, etc.).

  - **`authorization_type`**

    `string`, possible values: `"OAUTH", "API_KEY", "BASIC_AUTH", "BEARER_TOKEN", "CUSTOM", "BASIC", "OAUTH_M2M", "TRELLO_OAUTH1", "GOOGLE_DWD"` — Type of authorization mechanism used. Specifies whether this connection uses OAuth, API keys, bearer tokens, or other auth methods.

  - **`connection_id`**

    `string` — Reference to the parent connection configuration. Links this account to a specific connector setup in your environment.

  - **`connector`**

    `string` — Connector identifier (e.g., 'notion', 'slack', 'salesforce'). Indicates which third-party application this account connects to.

  - **`id`**

    `string` — Unique Scalekit-generated identifier for this connected account. Always prefixed with 'ca\_'.

  - **`identifier`**

    `string` — The unique identifier for this account in the third-party service. Typically an email address, user ID, or workspace identifier.

  - **`last_used_at`**

    `string`, format: `date-time` — Timestamp when this connected account was last used to make an API call. Useful for tracking active connections.

  - **`provider`**

    `string` — OAuth provider name (e.g., 'google', 'microsoft', 'github'). Identifies which authentication service manages this connection.

  - **`status`**

    `string`, possible values: `"ACTIVE", "EXPIRED", "PENDING_AUTH", "PENDING_VERIFICATION", "DISCONNECTED"` — Current status of the connected account. Indicates if the account is active, expired, pending authorization, or pending user identity verification.

  - **`token_expires_at`**

    `string`, format: `date-time` — Expiration timestamp for the access token. After this time, the token must be refreshed or re-authorized.

  - **`updated_at`**

    `string`, format: `date-time` — Timestamp when this connected account was last modified. Updated whenever credentials or configuration changes.

**Example:**

```json
{
  "connected_account": {
    "api_config": {
      "base_url": "https://api.custom-domain.com",
      "rate_limit": 1000,
      "timeout": 30
    },
    "authorization_details": null,
    "authorization_type": null,
    "connection_id": "conn_24834495392086178",
    "connector": "notion",
    "id": "ca_24834495392086178",
    "identifier": "user@example.com",
    "last_used_at": "2024-03-20T14:30:00Z",
    "provider": "google",
    "status": null,
    "token_expires_at": "2024-12-31T23:59:59Z",
    "updated_at": "2024-03-20T15:04:05Z"
  }
}
```

### connected\_accountsGetMagicLinkForConnectedAccountRequest

- **Type:**`object`

* **`connector`**

  `string` — Connector identifier (e.g., 'notion', 'slack', 'google'). Alphanumeric characters, spaces, hyphens, underscores, and colons are allowed.

* **`id`**

  `string` — Unique identifier for the connected account

* **`identifier`**

  `string` — The unique identifier for the connected account within the third-party service (e.g., email address, user ID, workspace identifier).

* **`organization_id`**

  `string` — Organization ID for the connector

* **`state`**

  `string` — Optional opaque state value. State added to the user verify redirect URL query params to validate the user verification

* **`user_id`**

  `string` — User ID for the connector

* **`user_verify_url`**

  `string` — B2B app's user verify redirect URL

**Example:**

```json
{
  "connector": "notion",
  "id": "ca_123",
  "identifier": "user@example.com",
  "organization_id": "org_121312434123312",
  "state": "QVNDSUFyY2hhYml0dGVyXzE2ODQ5NzIwNzI0NTY=",
  "user_id": "user_121312434123312",
  "user_verify_url": "https://app.yourapp.com/user/verify/callback"
}
```

### connected\_accountsGetMagicLinkForConnectedAccountResponse

- **Type:**`object`

* **`expiry`**

  `string`, format: `date-time` — Expiry timestamp for the authentication link

* **`link`**

  `string` — Authentication link for the connector

**Example:**

```json
{
  "expiry": "2024-03-20T15:04:05Z",
  "link": "https://notion.com/oauth/authorize?client_id=..."
}
```

### connected\_accountsVerifyConnectedAccountUserRequest

- **Type:**`object`

* **`auth_request_id` (required)**

  `string` — Auth request ID as base64url-encoded opaque token from the user verify redirect URL query params

* **`identifier` (required)**

  `string` — Current logged in user's connected account identifier

**Example:**

```json
{
  "auth_request_id": "QVNDSUFyY2hhYml0dGVyXzE2ODQ5NzIwNzI0NTY=",
  "identifier": "user@example.com"
}
```

### connected\_accountsVerifyConnectedAccountUserResponse

- **Type:**`object`

* **`post_user_verify_redirect_url`**

  `string` — URL to redirect the user to after successful verification

**Example:**

```json
{
  "post_user_verify_redirect_url": "https://env1.example.com/connect/success"
}
```

### connected\_accountsDeleteConnectedAccountRequest

- **Type:**`object`

* **`connector`**

  `string` — Connector identifier (e.g., 'notion', 'slack', 'google'). Alphanumeric characters, spaces, hyphens, underscores, and colons are allowed.

* **`id`**

  `string` — Unique identifier for the connected account to delete

* **`identifier`**

  `string` — The unique identifier for the connected account within the third-party service (e.g., email address, user ID, workspace identifier).

* **`organization_id`**

  `string` — Organization ID for the connector

* **`user_id`**

  `string` — User ID for the connector

**Example:**

```json
{
  "connector": "notion",
  "id": "ca_123",
  "identifier": "user@example.com",
  "organization_id": "org_121312434123312",
  "user_id": "user_121312434123312"
}
```

### connected\_accountsSearchConnectedAccountsResponse

- **Type:**`object`

* **`connected_accounts`**

  `array` — List of connected accounts matching the search query. Excludes sensitive authorization details.

  **Items:**

  - **`authorization_type`**

    `string`, possible values: `"OAUTH", "API_KEY", "BASIC_AUTH", "BEARER_TOKEN", "CUSTOM", "BASIC", "OAUTH_M2M", "TRELLO_OAUTH1", "GOOGLE_DWD"` — Authorization mechanism type.

  - **`connection_id`**

    `string` — Parent connection configuration reference.

  - **`connector`**

    `string` — Connector identifier.

  - **`id`**

    `string` — Unique connected account identifier.

  - **`identifier`**

    `string` — The unique identifier for this account in the third-party service.

  - **`last_used_at`**

    `string`, format: `date-time` — Last usage timestamp.

  - **`provider`**

    `string` — OAuth provider name (e.g., 'google', 'microsoft').

  - **`status`**

    `string`, possible values: `"ACTIVE", "EXPIRED", "PENDING_AUTH", "PENDING_VERIFICATION", "DISCONNECTED"` — Current connection status.

  - **`token_expires_at`**

    `string`, format: `date-time` — Token expiration timestamp.

  - **`updated_at`**

    `string`, format: `date-time` — Last modification timestamp.

* **`next_page_token`**

  `string` — Pagination token for the next page. Empty if this is the last page.

* **`prev_page_token`**

  `string` — Pagination token for the previous page. Empty if this is the first page.

* **`total_size`**

  `integer`, format: `int64` — Total count of accounts matching the search query across all pages.

**Example:**

```json
{
  "connected_accounts": [
    {
      "authorization_type": null,
      "connection_id": "conn_24834495392086178",
      "connector": "notion",
      "id": "ca_24834495392086178",
      "identifier": "user@example.com",
      "last_used_at": "2024-03-20T14:30:00Z",
      "provider": "google",
      "status": null,
      "token_expires_at": "2024-12-31T23:59:59Z",
      "updated_at": "2024-03-20T15:04:05Z"
    }
  ],
  "next_page_token": "eyJvZmZzZXQiOjMwfQ==",
  "prev_page_token": "eyJvZmZzZXQiOjB9",
  "total_size": 100
}
```

### v1providersCreateCustomProvider

- **Type:**`object`

* **`auth_patterns`**

  `array` — Authentication patterns for the connected app provider

  **Items:**

* **`description`**

  `string` — Description of the connected app provider

* **`display_name`**

  `string` — Display name for the connected app provider

* **`icon_src`**

  `string` — URL for the provider icon. Should be an SVG image sized 800x800 pixels for best rendering experience.

* **`metadata`**

  `object` — Custom key-value metadata for this provider. Keys must be 3-25 characters, values must be 1-256 characters, with a maximum of 20 key-value pairs.

* **`proxy_enabled`**

  `boolean` — This flag indicates whether proxying is turned on for the connected app provider. When enabled, requests are routed through the provider proxy instead of being sent directly.

* **`proxy_url`**

  `string` — Proxy URL for the connected app provider. Must start with https\://

**Example:**

```json
{
  "auth_patterns": [
    {}
  ],
  "description": "Connect to Google Workspace for email and calendar integration",
  "display_name": "Google Workspace",
  "icon_src": "https://example.com/images/my-connector.svg",
  "metadata": {
    "api_version": "v2",
    "region": "us-east-1"
  },
  "proxy_enabled": true,
  "proxy_url": "https://mcp.example.com/mcp"
}
```

### Provider represents a connected app provider

- **Type:**`object`

* **`auth_patterns`**

  `array`

  **Items:**

* **`categories`**

  `array`

  **Items:**

  `string`

* **`coming_soon`**

  `boolean`

* **`description`**

  `string`

* **`display_name`**

  `string`

* **`display_priority`**

  `integer`, format: `int32`

* **`icon_src`**

  `string`

* **`id`**

  `string`

* **`identifier`**

  `string`

* **`is_custom`**

  `boolean` — Indicates whether the provider is environment-scoped (custom provider)

* **`is_custom_mcp`**

  `boolean` — Indicates whether this is an environment-scoped MCP-based custom provider

* **`metadata`**

  `object` — Custom key-value metadata stored for this provider. Returned for all providers; defaults to {} when no metadata has been set.

* **`proxy_enabled`**

  `boolean`

* **`proxy_url`**

  `string`

**Example:**

```json
{
  "auth_patterns": [
    {}
  ],
  "categories": [
    ""
  ],
  "coming_soon": true,
  "description": "",
  "display_name": "",
  "display_priority": 1,
  "icon_src": "",
  "id": "",
  "identifier": "",
  "is_custom": false,
  "is_custom_mcp": false,
  "metadata": {
    "api_version": "v2",
    "region": "us-east-1"
  },
  "proxy_enabled": true,
  "proxy_url": ""
}
```

### providersCreateProviderResponse

- **Type:**`object`

* **`provider`**

  `object`

  - **`auth_patterns`**

    `array`

    **Items:**

  - **`categories`**

    `array`

    **Items:**

    `string`

  - **`coming_soon`**

    `boolean`

  - **`description`**

    `string`

  - **`display_name`**

    `string`

  - **`display_priority`**

    `integer`, format: `int32`

  - **`icon_src`**

    `string`

  - **`id`**

    `string`

  - **`identifier`**

    `string`

  - **`is_custom`**

    `boolean` — Indicates whether the provider is environment-scoped (custom provider)

  - **`is_custom_mcp`**

    `boolean` — Indicates whether this is an environment-scoped MCP-based custom provider

  - **`metadata`**

    `object` — Custom key-value metadata stored for this provider. Returned for all providers; defaults to {} when no metadata has been set.

  - **`proxy_enabled`**

    `boolean`

  - **`proxy_url`**

    `string`

**Example:**

```json
{
  "provider": {
    "auth_patterns": [
      {}
    ],
    "categories": [
      ""
    ],
    "coming_soon": true,
    "description": "",
    "display_name": "",
    "display_priority": 1,
    "icon_src": "",
    "id": "",
    "identifier": "",
    "is_custom": false,
    "is_custom_mcp": false,
    "metadata": {
      "api_version": "v2",
      "region": "us-east-1"
    },
    "proxy_enabled": true,
    "proxy_url": ""
  }
}
```

### v1providersUpdateCustomProvider

- **Type:**`object`

* **`auth_patterns`**

  `array` — Authentication patterns for the connected app provider

  **Items:**

* **`description`**

  `string` — Description of the connected app provider

* **`display_name`**

  `string` — Display name for the connected app provider

* **`icon_src`**

  `string` — URL for the provider icon. Should be an SVG image sized 800x800 pixels for best rendering experience.

* **`metadata`**

  `object` — Custom key-value metadata for this provider. Keys must be 3-25 characters, values must be 1-256 characters, with a maximum of 20 key-value pairs.

* **`proxy_enabled`**

  `boolean` — This flag indicates whether proxying is turned on for the connected app provider. When enabled, requests are routed through the provider proxy instead of being sent directly.

* **`proxy_url`**

  `string` — Proxy URL for the connected app provider. Must start with https\://

**Example:**

```json
{
  "auth_patterns": [
    {}
  ],
  "description": "Connect to Google Workspace for email and calendar integration",
  "display_name": "Google Workspace",
  "icon_src": "https://example.com/images/my-connector.svg",
  "metadata": {
    "api_version": "v2",
    "region": "us-east-1"
  },
  "proxy_enabled": true,
  "proxy_url": "https://mcp.example.com/mcp"
}
```

### providersUpdateProviderResponse

- **Type:**`object`

* **`provider`**

  `object`

  - **`auth_patterns`**

    `array`

    **Items:**

  - **`categories`**

    `array`

    **Items:**

    `string`

  - **`coming_soon`**

    `boolean`

  - **`description`**

    `string`

  - **`display_name`**

    `string`

  - **`display_priority`**

    `integer`, format: `int32`

  - **`icon_src`**

    `string`

  - **`id`**

    `string`

  - **`identifier`**

    `string`

  - **`is_custom`**

    `boolean` — Indicates whether the provider is environment-scoped (custom provider)

  - **`is_custom_mcp`**

    `boolean` — Indicates whether this is an environment-scoped MCP-based custom provider

  - **`metadata`**

    `object` — Custom key-value metadata stored for this provider. Returned for all providers; defaults to {} when no metadata has been set.

  - **`proxy_enabled`**

    `boolean`

  - **`proxy_url`**

    `string`

**Example:**

```json
{
  "provider": {
    "auth_patterns": [
      {}
    ],
    "categories": [
      ""
    ],
    "coming_soon": true,
    "description": "",
    "display_name": "",
    "display_priority": 1,
    "icon_src": "",
    "id": "",
    "identifier": "",
    "is_custom": false,
    "is_custom_mcp": false,
    "metadata": {
      "api_version": "v2",
      "region": "us-east-1"
    },
    "proxy_enabled": true,
    "proxy_url": ""
  }
}
```

### providersDeleteProviderResponse

- **Type:**`object`

**Example:**

```json
{}
```

### toolsExecuteToolRequest

- **Type:**`object`

* **`agent_run_id`**

  `string` — Optional. Customer-supplied identifier grouping multiple tool calls into a single agent run. Useful for correlating logs across an agentic workflow.

* **`connected_account_id`**

  `string` — Optional. The unique ID of the connected account. Use this to directly identify the connected account instead of using identifier + connector combination.

* **`connector`**

  `string` — Optional. The name of the connector/provider (e.g., 'Google Workspace', 'Slack', 'Notion'). Alphanumeric characters, spaces, hyphens, underscores, and colons are allowed. Use this in combination with identifier to identify the connected account.

* **`identifier`**

  `string` — Optional. The unique identifier for the connected account within the third-party service (e.g., email address, user ID, workspace identifier). Use this in combination with connector to identify the connected account.

* **`organization_id`**

  `string` — Optional. The organization ID to scope the connected account lookup. Use this to narrow down the search when the same identifier exists across multiple organizations.

* **`params`**

  `object` — JSON object containing the parameters required for tool execution. The structure depends on the specific tool being executed.

* **`tool_name`**

  `string` — Name of the tool to execute

* **`user_id`**

  `string` — Optional. The user ID to scope the connected account lookup. Use this to narrow down the search when the same identifier exists across multiple users.

**Example:**

```json
{
  "agent_run_id": "run_abc123",
  "connected_account_id": "ca_123",
  "connector": "Google Workspace",
  "identifier": "user@example.com",
  "organization_id": "org_123",
  "params": {
    "body": "Hello World",
    "subject": "Hello",
    "to": "user@example.com"
  },
  "tool_name": "send_email",
  "user_id": "user_123"
}
```

### toolsExecuteToolResponse

- **Type:**`object`

* **`data`**

  `object` — Free-flowing JSON parameters for the tool execution

* **`execution_id`**

  `string` — Unique identifier for the tool execution

**Example:**

```json
{
  "data": {
    "body": "Hello World",
    "subject": "Hello",
    "to": "user@example.com"
  },
  "execution_id": "123456789"
}
```

### mcpToolMapping

- **Type:**`object`

* **`connection_name`**

  `string` — Connection name for the tool

* **`status`**

  `string` — Authentication status of the tool

* **`tool_names`**

  `array` — List of tool names

  **Items:**

  `string`

**Example:**

```json
{
  "connection_name": "MY-GMAIL",
  "status": "ACTIVE",
  "tool_names": [
    "GMAIL_FETCH_MAILS",
    "LIST_DRAFTS"
  ]
}
```

### mcpMcp

- **Type:**`object`

* **`connected_account_identifier`**

  `string` — Identifier for the connected account

* **`id`**

  `string` — Unique ID of the tool

* **`tool_mappings`**

  `array` — Provider name (e.g. GOOGLE)

  **Items:**

  - **`connection_name`**

    `string` — Connection name for the tool

  - **`status`**

    `string` — Authentication status of the tool

  - **`tool_names`**

    `array` — List of tool names

    **Items:**

    `string`

* **`url`**

  `string` — Unique ID of the tool

**Example:**

```json
{
  "connected_account_identifier": "account_123",
  "id": "res_123",
  "tool_mappings": "GOOGLE",
  "url": "https://example.com/mcp/v1/abc"
}
```

### mcpListMcpResponse

- **Type:**`object`

* **`mcps`**

  `array` — List of MCPs

  **Items:**

  - **`connected_account_identifier`**

    `string` — Identifier for the connected account

  - **`id`**

    `string` — Unique ID of the tool

  - **`tool_mappings`**

    `array` — Provider name (e.g. GOOGLE)

    **Items:**

    - **`connection_name`**

      `string` — Connection name for the tool

    - **`status`**

      `string` — Authentication status of the tool

    - **`tool_names`**

      `array` — List of tool names

      **Items:**

      `string`

  - **`url`**

    `string` — Unique ID of the tool

**Example:**

```json
{
  "mcps": [
    {
      "connected_account_identifier": "account_123",
      "id": "res_123",
      "tool_mappings": "GOOGLE",
      "url": "https://example.com/mcp/v1/abc"
    }
  ]
}
```

### mcpCreateMcpResponse

- **Type:**`object`

* **`mcp`**

  `object` — The MCP server details

  - **`connected_account_identifier`**

    `string` — Identifier for the connected account

  - **`id`**

    `string` — Unique ID of the tool

  - **`tool_mappings`**

    `array` — Provider name (e.g. GOOGLE)

    **Items:**

    - **`connection_name`**

      `string` — Connection name for the tool

    - **`status`**

      `string` — Authentication status of the tool

    - **`tool_names`**

      `array` — List of tool names

      **Items:**

      `string`

  - **`url`**

    `string` — Unique ID of the tool

**Example:**

```json
{
  "mcp": {
    "connected_account_identifier": "account_123",
    "id": "res_123",
    "tool_mappings": "GOOGLE",
    "url": "https://example.com/mcp/v1/abc"
  }
}
```

### mcpGetMcpResponse

- **Type:**`object`

* **`mcp`**

  `object` — The MCP details

  - **`connected_account_identifier`**

    `string` — Identifier for the connected account

  - **`id`**

    `string` — Unique ID of the tool

  - **`tool_mappings`**

    `array` — Provider name (e.g. GOOGLE)

    **Items:**

    - **`connection_name`**

      `string` — Connection name for the tool

    - **`status`**

      `string` — Authentication status of the tool

    - **`tool_names`**

      `array` — List of tool names

      **Items:**

      `string`

  - **`url`**

    `string` — Unique ID of the tool

**Example:**

```json
{
  "mcp": {
    "connected_account_identifier": "account_123",
    "id": "res_123",
    "tool_mappings": "GOOGLE",
    "url": "https://example.com/mcp/v1/abc"
  }
}
```

### mcpMcpConfigConnectionToolMapping

- **Type:**`object`

* **`connected_account_id`**

  `string` — Connected account backing this connection in the MCP instance context

* **`connected_account_status`**

  `string` — Authentication status for the connected account

* **`connection_id`**

  `string` — Unique ID of the connection

* **`connection_name`**

  `string` — Developer-assigned connection name

* **`provider`**

  `string` — Provider name for this connection

* **`tools`**

  `array` — List of tool names linked to this connection (empty = all tools)

  **Items:**

  `string`

**Example:**

```json
{
  "connected_account_id": "",
  "connected_account_status": "",
  "connection_id": "",
  "connection_name": "",
  "provider": "",
  "tools": [
    ""
  ]
}
```

### mcpMcpConfig

- **Type:**`object`

* **`connection_tool_mappings`**

  `array` — List of connection-to-tool mappings for this MCP config

  **Items:**

  - **`connected_account_id`**

    `string` — Connected account backing this connection in the MCP instance context

  - **`connected_account_status`**

    `string` — Authentication status for the connected account

  - **`connection_id`**

    `string` — Unique ID of the connection

  - **`connection_name`**

    `string` — Developer-assigned connection name

  - **`provider`**

    `string` — Provider name for this connection

  - **`tools`**

    `array` — List of tool names linked to this connection (empty = all tools)

    **Items:**

    `string`

* **`description`**

  `string` — Description of the MCP configuration

* **`id`**

  `string` — Unique ID of the MCP config

* **`name`**

  `string` — Unique name for the MCP configuration

**Example:**

```json
{
  "connection_tool_mappings": [
    {
      "connected_account_id": "",
      "connected_account_status": "",
      "connection_id": "",
      "connection_name": "",
      "provider": "",
      "tools": [
        ""
      ]
    }
  ],
  "description": "Summarizes daily emails and posts to Slack",
  "id": "cfg_85630864460904897",
  "name": "daily-summarizer"
}
```

### mcpListMcpConfigsResponse

- **Type:**`object`

* **`configs`**

  `array` — List of MCP configurations

  **Items:**

  - **`connection_tool_mappings`**

    `array` — List of connection-to-tool mappings for this MCP config

    **Items:**

    - **`connected_account_id`**

      `string` — Connected account backing this connection in the MCP instance context

    - **`connected_account_status`**

      `string` — Authentication status for the connected account

    - **`connection_id`**

      `string` — Unique ID of the connection

    - **`connection_name`**

      `string` — Developer-assigned connection name

    - **`provider`**

      `string` — Provider name for this connection

    - **`tools`**

      `array` — List of tool names linked to this connection (empty = all tools)

      **Items:**

      `string`

  - **`description`**

    `string` — Description of the MCP configuration

  - **`id`**

    `string` — Unique ID of the MCP config

  - **`name`**

    `string` — Unique name for the MCP configuration

* **`next_page_token`**

  `string` — Pagination token to fetch the next page

* **`prev_page_token`**

  `string` — Pagination token to fetch the previous page

* **`total_size`**

  `integer`, format: `int64` — Total number of configs matching the filter

**Example:**

```json
{
  "configs": [
    {
      "connection_tool_mappings": [
        {}
      ],
      "description": "Summarizes daily emails and posts to Slack",
      "id": "cfg_85630864460904897",
      "name": "daily-summarizer"
    }
  ],
  "next_page_token": "",
  "prev_page_token": "",
  "total_size": 1
}
```

### mcpCreateMcpConfigResponse

- **Type:**`object`

* **`config`**

  `object` — The created MCP configuration

  - **`connection_tool_mappings`**

    `array` — List of connection-to-tool mappings for this MCP config

    **Items:**

    - **`connected_account_id`**

      `string` — Connected account backing this connection in the MCP instance context

    - **`connected_account_status`**

      `string` — Authentication status for the connected account

    - **`connection_id`**

      `string` — Unique ID of the connection

    - **`connection_name`**

      `string` — Developer-assigned connection name

    - **`provider`**

      `string` — Provider name for this connection

    - **`tools`**

      `array` — List of tool names linked to this connection (empty = all tools)

      **Items:**

      `string`

  - **`description`**

    `string` — Description of the MCP configuration

  - **`id`**

    `string` — Unique ID of the MCP config

  - **`name`**

    `string` — Unique name for the MCP configuration

**Example:**

```json
{
  "config": {
    "connection_tool_mappings": [
      {}
    ],
    "description": "Summarizes daily emails and posts to Slack",
    "id": "cfg_85630864460904897",
    "name": "daily-summarizer"
  }
}
```

### mcpGetMcpConfigResponse

- **Type:**`object`

* **`config`**

  `object` — The requested MCP configuration

  - **`connection_tool_mappings`**

    `array` — List of connection-to-tool mappings for this MCP config

    **Items:**

    - **`connected_account_id`**

      `string` — Connected account backing this connection in the MCP instance context

    - **`connected_account_status`**

      `string` — Authentication status for the connected account

    - **`connection_id`**

      `string` — Unique ID of the connection

    - **`connection_name`**

      `string` — Developer-assigned connection name

    - **`provider`**

      `string` — Provider name for this connection

    - **`tools`**

      `array` — List of tool names linked to this connection (empty = all tools)

      **Items:**

      `string`

  - **`description`**

    `string` — Description of the MCP configuration

  - **`id`**

    `string` — Unique ID of the MCP config

  - **`name`**

    `string` — Unique name for the MCP configuration

**Example:**

```json
{
  "config": {
    "connection_tool_mappings": [
      {}
    ],
    "description": "Summarizes daily emails and posts to Slack",
    "id": "cfg_85630864460904897",
    "name": "daily-summarizer"
  }
}
```

### McpServiceUpdateMcpConfigBody

- **Type:**`object`

* **`connection_tool_mappings`**

  `array` — Updated list of connection-to-tool mappings for this MCP config

  **Items:**

  - **`connected_account_id`**

    `string` — Connected account backing this connection in the MCP instance context

  - **`connected_account_status`**

    `string` — Authentication status for the connected account

  - **`connection_id`**

    `string` — Unique ID of the connection

  - **`connection_name`**

    `string` — Developer-assigned connection name

  - **`provider`**

    `string` — Provider name for this connection

  - **`tools`**

    `array` — List of tool names linked to this connection (empty = all tools)

    **Items:**

    `string`

* **`description`**

  `string` — Updated description for the MCP configuration

**Example:**

```json
{
  "connection_tool_mappings": [
    {
      "connected_account_id": "",
      "connected_account_status": "",
      "connection_id": "",
      "connection_name": "",
      "provider": "",
      "tools": [
        ""
      ]
    }
  ],
  "description": "Updated daily summarizer config"
}
```

### mcpUpdateMcpConfigResponse

- **Type:**`object`

* **`config`**

  `object` — The updated MCP configuration

  - **`connection_tool_mappings`**

    `array` — List of connection-to-tool mappings for this MCP config

    **Items:**

    - **`connected_account_id`**

      `string` — Connected account backing this connection in the MCP instance context

    - **`connected_account_status`**

      `string` — Authentication status for the connected account

    - **`connection_id`**

      `string` — Unique ID of the connection

    - **`connection_name`**

      `string` — Developer-assigned connection name

    - **`provider`**

      `string` — Provider name for this connection

    - **`tools`**

      `array` — List of tool names linked to this connection (empty = all tools)

      **Items:**

      `string`

  - **`description`**

    `string` — Description of the MCP configuration

  - **`id`**

    `string` — Unique ID of the MCP config

  - **`name`**

    `string` — Unique name for the MCP configuration

**Example:**

```json
{
  "config": {
    "connection_tool_mappings": [
      {}
    ],
    "description": "Summarizes daily emails and posts to Slack",
    "id": "cfg_85630864460904897",
    "name": "daily-summarizer"
  }
}
```

### McpServiceListMcpConnectedAccountsBody

- **Type:**`object`

* **`identifier` (required)**

  `string` — Identifier for the end user whose connected accounts to retrieve

* **`include_auth_link`**

  `boolean` — When true, generates a fresh authentication link for each connection and creates connected accounts if they do not exist. When false or omitted, returns existing connected account status without creating accounts or generating links.

**Example:**

```json
{
  "identifier": "john.doe@example.com",
  "include_auth_link": true
}
```

### mcpMcpConnectionAuthState

- **Type:**`object`

* **`authentication_link`**

  `string` — Fresh authentication link for the connected account. Empty when include\_auth\_link is false or when the connection has no associated key.

* **`connected_account_id`**

  `string` — ID of the connected account for this user and connection

* **`connected_account_status`**

  `string` — Authentication status of the connected account

* **`connection_id`**

  `string` — ID of the connection

* **`connection_name`**

  `string` — Name of the connection

* **`provider`**

  `string` — Provider identifier for the connection

**Example:**

```json
{
  "authentication_link": "",
  "connected_account_id": "",
  "connected_account_status": "",
  "connection_id": "",
  "connection_name": "",
  "provider": ""
}
```

### mcpListMcpConnectedAccountsResponse

- **Type:**`object`

* **`connected_accounts`**

  `array` — Connected account state for each connection in the configuration

  **Items:**

  - **`authentication_link`**

    `string` — Fresh authentication link for the connected account. Empty when include\_auth\_link is false or when the connection has no associated key.

  - **`connected_account_id`**

    `string` — ID of the connected account for this user and connection

  - **`connected_account_status`**

    `string` — Authentication status of the connected account

  - **`connection_id`**

    `string` — ID of the connection

  - **`connection_name`**

    `string` — Name of the connection

  - **`provider`**

    `string` — Provider identifier for the connection

**Example:**

```json
{
  "connected_accounts": [
    {
      "authentication_link": "",
      "connected_account_id": "",
      "connected_account_status": "",
      "connection_id": "",
      "connection_name": "",
      "provider": ""
    }
  ]
}
```

### McpServiceCreateMcpSessionTokenBody

- **Type:**`object`

* **`identifier` (required)**

  `string` — Upstream-provider identifier (typically the user's email or provider user-id) shared by the connected accounts the token represents. A single identifier can map to one connected account per connection in the MCP configuration.

* **`expiry`**

  `string` — Optional token lifetime. Must be between 60s and 24h. Defaults to 1h when omitted.

**Example:**

```json
{
  "expiry": "3600s",
  "identifier": "alice@acme.com"
}
```

### mcpCreateMcpSessionTokenResponse

- **Type:**`object`

* **`expires_at`**

  `string`, format: `date-time` — Absolute time at which the token expires. Equals issued\_at + expiry.

* **`token`**

  `string` — Signed JWT (RS256) whose \`sub\` claim is the supplied identifier and whose \`aud\` claim is the MCP server URL bound to the configuration. Payload also carries the MCP configuration ID (\`mcp\_cfg\`) and the resolved connected-account IDs (\`ca\_ids\`). Signed with the calling environment's active JWT signing key.

**Example:**

```json
{
  "expires_at": "",
  "token": "eyJhbGciOiJSUzI1NiIsImtpZCI6InNua18xMjMifQ.eyJhdWQiOlsiYWxpY2VAYWNtZS5jb20iXSwidG9rZW5fdHlwZSI6Im1jcF9zZXNzaW9uIn0.signature"
}
```

### mcpMcpInstance

- **Type:**`object`

* **`config`**

  `object` — Configuration backing this instance

  - **`connection_tool_mappings`**

    `array` — List of connection-to-tool mappings for this MCP config

    **Items:**

    - **`connected_account_id`**

      `string` — Connected account backing this connection in the MCP instance context

    - **`connected_account_status`**

      `string` — Authentication status for the connected account

    - **`connection_id`**

      `string` — Unique ID of the connection

    - **`connection_name`**

      `string` — Developer-assigned connection name

    - **`provider`**

      `string` — Provider name for this connection

    - **`tools`**

      `array` — List of tool names linked to this connection (empty = all tools)

      **Items:**

      `string`

  - **`description`**

    `string` — Description of the MCP configuration

  - **`id`**

    `string` — Unique ID of the MCP config

  - **`name`**

    `string` — Unique name for the MCP configuration

* **`id`**

  `string` — Unique ID of the MCP instance

* **`last_used_at`**

  `string`, format: `date-time` — Timestamp when the instance was last used

* **`name`**

  `string` — Display name of the instance

* **`updated_at`**

  `string`, format: `date-time` — Timestamp when the instance was last updated

* **`url`**

  `string` — URL to reach the MCP instance

* **`user_identifier`**

  `string` — Identifier for the user who owns or uses this instance

**Example:**

```json
{
  "config": {
    "connection_tool_mappings": [
      {}
    ],
    "description": "Summarizes daily emails and posts to Slack",
    "id": "cfg_85630864460904897",
    "name": "daily-summarizer"
  },
  "id": "inst_88630864544790977",
  "last_used_at": "0001-01-01T00:00:00Z",
  "name": "daily-digest",
  "updated_at": "2025-10-07T12:21:00Z",
  "url": "https://example.com/mcp/v1/abc123",
  "user_identifier": "akshay.parihar"
}
```

### mcpListMcpInstancesResponse

- **Type:**`object`

* **`instances`**

  `array` — List of MCP instances

  **Items:**

  - **`config`**

    `object` — Configuration backing this instance

    - **`connection_tool_mappings`**

      `array` — List of connection-to-tool mappings for this MCP config

      **Items:**

      - **`connected_account_id`**

        `string` — Connected account backing this connection in the MCP instance context

      - **`connected_account_status`**

        `string` — Authentication status for the connected account

      - **`connection_id`**

        `string` — Unique ID of the connection

      - **`connection_name`**

        `string` — Developer-assigned connection name

      - **`provider`**

        `string` — Provider name for this connection

      - **`tools`**

        `array` — List of tool names linked to this connection (empty = all tools)

        **Items:**

        `string`

    - **`description`**

      `string` — Description of the MCP configuration

    - **`id`**

      `string` — Unique ID of the MCP config

    - **`name`**

      `string` — Unique name for the MCP configuration

  - **`id`**

    `string` — Unique ID of the MCP instance

  - **`last_used_at`**

    `string`, format: `date-time` — Timestamp when the instance was last used

  - **`name`**

    `string` — Display name of the instance

  - **`updated_at`**

    `string`, format: `date-time` — Timestamp when the instance was last updated

  - **`url`**

    `string` — URL to reach the MCP instance

  - **`user_identifier`**

    `string` — Identifier for the user who owns or uses this instance

* **`next_page_token`**

  `string` — Pagination token to fetch the next page

* **`prev_page_token`**

  `string` — Pagination token to fetch the previous page

* **`total_size`**

  `integer`, format: `int64` — Total number of instances matching the filter

**Example:**

```json
{
  "instances": [
    {
      "config": null,
      "id": "inst_88630864544790977",
      "last_used_at": "0001-01-01T00:00:00Z",
      "name": "daily-digest",
      "updated_at": "2025-10-07T12:21:00Z",
      "url": "https://example.com/mcp/v1/abc123",
      "user_identifier": "akshay.parihar"
    }
  ],
  "next_page_token": "",
  "prev_page_token": "",
  "total_size": 1
}
```

### mcpEnsureMcpInstanceRequest

- **Type:**`object`

* **`config_name`**

  `string` — Name of the MCP configuration to associate with the instance

* **`name`**

  `string` — Display name for the MCP instance

* **`user_identifier`**

  `string` — Identifier for the end user requesting the instance

**Example:**

```json
{
  "config_name": "daily-summarizer",
  "name": "daily-digest",
  "user_identifier": "akshay.parihar"
}
```

### mcpEnsureMcpInstanceResponse

- **Type:**`object`

* **`instance`**

  `object` — Details of the MCP instance

  - **`config`**

    `object` — Configuration backing this instance

    - **`connection_tool_mappings`**

      `array` — List of connection-to-tool mappings for this MCP config

      **Items:**

      - **`connected_account_id`**

        `string` — Connected account backing this connection in the MCP instance context

      - **`connected_account_status`**

        `string` — Authentication status for the connected account

      - **`connection_id`**

        `string` — Unique ID of the connection

      - **`connection_name`**

        `string` — Developer-assigned connection name

      - **`provider`**

        `string` — Provider name for this connection

      - **`tools`**

        `array` — List of tool names linked to this connection (empty = all tools)

        **Items:**

        `string`

    - **`description`**

      `string` — Description of the MCP configuration

    - **`id`**

      `string` — Unique ID of the MCP config

    - **`name`**

      `string` — Unique name for the MCP configuration

  - **`id`**

    `string` — Unique ID of the MCP instance

  - **`last_used_at`**

    `string`, format: `date-time` — Timestamp when the instance was last used

  - **`name`**

    `string` — Display name of the instance

  - **`updated_at`**

    `string`, format: `date-time` — Timestamp when the instance was last updated

  - **`url`**

    `string` — URL to reach the MCP instance

  - **`user_identifier`**

    `string` — Identifier for the user who owns or uses this instance

**Example:**

```json
{
  "instance": {
    "config": null,
    "id": "inst_88630864544790977",
    "last_used_at": "0001-01-01T00:00:00Z",
    "name": "daily-digest",
    "updated_at": "2025-10-07T12:21:00Z",
    "url": "https://example.com/mcp/v1/abc123",
    "user_identifier": "akshay.parihar"
  }
}
```

### mcpGetMcpInstanceResponse

- **Type:**`object`

* **`instance`**

  `object` — The requested MCP instance

  - **`config`**

    `object` — Configuration backing this instance

    - **`connection_tool_mappings`**

      `array` — List of connection-to-tool mappings for this MCP config

      **Items:**

      - **`connected_account_id`**

        `string` — Connected account backing this connection in the MCP instance context

      - **`connected_account_status`**

        `string` — Authentication status for the connected account

      - **`connection_id`**

        `string` — Unique ID of the connection

      - **`connection_name`**

        `string` — Developer-assigned connection name

      - **`provider`**

        `string` — Provider name for this connection

      - **`tools`**

        `array` — List of tool names linked to this connection (empty = all tools)

        **Items:**

        `string`

    - **`description`**

      `string` — Description of the MCP configuration

    - **`id`**

      `string` — Unique ID of the MCP config

    - **`name`**

      `string` — Unique name for the MCP configuration

  - **`id`**

    `string` — Unique ID of the MCP instance

  - **`last_used_at`**

    `string`, format: `date-time` — Timestamp when the instance was last used

  - **`name`**

    `string` — Display name of the instance

  - **`updated_at`**

    `string`, format: `date-time` — Timestamp when the instance was last updated

  - **`url`**

    `string` — URL to reach the MCP instance

  - **`user_identifier`**

    `string` — Identifier for the user who owns or uses this instance

**Example:**

```json
{
  "instance": {
    "config": null,
    "id": "inst_88630864544790977",
    "last_used_at": "0001-01-01T00:00:00Z",
    "name": "daily-digest",
    "updated_at": "2025-10-07T12:21:00Z",
    "url": "https://example.com/mcp/v1/abc123",
    "user_identifier": "akshay.parihar"
  }
}
```

### McpServiceUpdateMcpInstanceBody

- **Type:**`object`

* **`config_name`**

  `string` — New MCP configuration name to attach to the instance

* **`name`**

  `string` — New display name for the MCP instance

**Example:**

```json
{
  "config_name": "daily-summarizer",
  "name": "daily-digest-updated"
}
```

### mcpUpdateMcpInstanceResponse

- **Type:**`object`

* **`instance`**

  `object` — Updated MCP instance

  - **`config`**

    `object` — Configuration backing this instance

    - **`connection_tool_mappings`**

      `array` — List of connection-to-tool mappings for this MCP config

      **Items:**

      - **`connected_account_id`**

        `string` — Connected account backing this connection in the MCP instance context

      - **`connected_account_status`**

        `string` — Authentication status for the connected account

      - **`connection_id`**

        `string` — Unique ID of the connection

      - **`connection_name`**

        `string` — Developer-assigned connection name

      - **`provider`**

        `string` — Provider name for this connection

      - **`tools`**

        `array` — List of tool names linked to this connection (empty = all tools)

        **Items:**

        `string`

    - **`description`**

      `string` — Description of the MCP configuration

    - **`id`**

      `string` — Unique ID of the MCP config

    - **`name`**

      `string` — Unique name for the MCP configuration

  - **`id`**

    `string` — Unique ID of the MCP instance

  - **`last_used_at`**

    `string`, format: `date-time` — Timestamp when the instance was last used

  - **`name`**

    `string` — Display name of the instance

  - **`updated_at`**

    `string`, format: `date-time` — Timestamp when the instance was last updated

  - **`url`**

    `string` — URL to reach the MCP instance

  - **`user_identifier`**

    `string` — Identifier for the user who owns or uses this instance

**Example:**

```json
{
  "instance": {
    "config": null,
    "id": "inst_88630864544790977",
    "last_used_at": "0001-01-01T00:00:00Z",
    "name": "daily-digest",
    "updated_at": "2025-10-07T12:21:00Z",
    "url": "https://example.com/mcp/v1/abc123",
    "user_identifier": "akshay.parihar"
  }
}
```

### mcpMcpInstanceConnectionAuthState

- **Type:**`object`

* **`authentication_link`**

  `string` — Magic link for reconnecting the connected account

* **`connected_account_id`**

  `string` — Connected account backing the connection

* **`connected_account_status`**

  `string` — Current authentication status of the connected account

* **`connection_id`**

  `string` — Underlying connection identifier

* **`connection_name`**

  `string` — Developer-assigned connection name

* **`provider`**

  `string` — Provider backing the connection

**Example:**

```json
{
  "authentication_link": "",
  "connected_account_id": "",
  "connected_account_status": "",
  "connection_id": "",
  "connection_name": "",
  "provider": ""
}
```

### mcpGetMcpInstanceAuthStateResponse

- **Type:**`object`

* **`connections`**

  `array` — Status of each connection mapped to the instance

  **Items:**

  - **`authentication_link`**

    `string` — Magic link for reconnecting the connected account

  - **`connected_account_id`**

    `string` — Connected account backing the connection

  - **`connected_account_status`**

    `string` — Current authentication status of the connected account

  - **`connection_id`**

    `string` — Underlying connection identifier

  - **`connection_name`**

    `string` — Developer-assigned connection name

  - **`provider`**

    `string` — Provider backing the connection

**Example:**

```json
{
  "connections": [
    {
      "authentication_link": "",
      "connected_account_id": "",
      "connected_account_status": "",
      "connection_id": "",
      "connection_name": "",
      "provider": ""
    }
  ]
}
```

### ScalekitEvent

- **Type:**`object`

* **`environment_id` (required)**

  `string` — The environment ID where the event occurred

* **`id` (required)**

  `string` — Unique identifier for the webhook event (must be prefixed with "evt\_")

* **`object` (required)**

  `string`, possible values: `"Organization", "Connection", "Role", "Directory", "DirectoryUser", "DirectoryGroup", "Permission", "OrgMembership", "User"` — The type of object that triggered the webhook

* **`occurred_at` (required)**

  `string`, format: `date-time` — When the event occurred (ISO 8601 format)

* **`spec_version` (required)**

  `string` — The webhook specification version

* **`type` (required)**

  `string`, possible values: `"organization.created", "organization.updated", "organization.deleted", "organization.sso_created", "organization.sso_deleted", "organization.sso_enabled", "organization.sso_disabled", "user.signup", "user.login", "user.logout", "user.organization_invitation", "user.organization_membership_created", "user.organization_membership_updated", "user.organization_membership_deleted", "organization.directory.user_created", "organization.directory.user_updated", "organization.directory.user_deleted", "organization.directory.group_created", "organization.directory.group_updated", "organization.directory.group_deleted", "organization.directory_enabled", "organization.directory_disabled", "role.created", "role.updated", "role.deleted", "permission.created", "permission.updated", "permission.deleted"` — The event type

* **`data`**

  `object` — The event payload (structure varies by event type)

* **`display_name`**

  `string` — Human-readable display name for the event

* **`organization_id`**

  `string` — The organization ID (if applicable)

**Example:**

```json
{
  "spec_version": "1",
  "id": "evt_1234567890abcdef",
  "type": "organization.created",
  "occurred_at": "2024-01-01T00:00:00Z",
  "environment_id": "env_1234567890abcdef",
  "organization_id": "org_1234567890abcdef",
  "object": "Organization",
  "data": {
    "id": "org_1234567890abcdef",
    "name": "Example Organization",
    "created_at": "2024-01-01T00:00:00Z"
  },
  "display_name": "Organization Created"
}
```
