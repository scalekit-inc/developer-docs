# AgentKit APIs

- **OpenAPI Version:** `3.1.1`
- **API Version:** `1.0.0`

The AgentKit API enables you to manage connected accounts for third-party integrations, execute tools on behalf of users, and handle OAuth connections to external services like Google, Notion, Slack, and other applications.

## Quickstart

The Scalekit API uses OAuth 2.0 Client Credentials for authentication.

Copy your API credentials from the Scalekit dashboard's API Config section and set them as environment variables.

```sh
SCALEKIT_ENVIRONMENT_URL='<YOUR_ENVIRONMENT_URL>'
SCALEKIT_CLIENT_ID='<ENVIRONMENT_CLIENT_ID>'
SCALEKIT_CLIENT_SECRET='<ENVIRONMENT_CLIENT_SECRET>'
```

Getting an access token

1. Get your credentials from the [Scalekit Dashboard](https://app.scalekit.com)
2. Request an access token:

```sh
curl https://<SCALEKIT_ENVIRONMENT_URL>/oauth/token \
  -X POST \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'client_id={client_id}' \
  -d 'client_secret={client_secret}' \
  -d 'grant_type=client_credentials'
```

3. Use the access token in API requests:

```sh
curl https://<SCALEKIT_ENVIRONMENT_URL>/api/v1/connected_accounts \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {access_token}'
```

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

    `string`, possible values: `"OAUTH", "API_KEY", "BASIC_AUTH", "BEARER_TOKEN", "CUSTOM", "BASIC"` — Authorization mechanism type.

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

    `string`, possible values: `"ACTIVE", "EXPIRED", "PENDING_AUTH", "PENDING_VERIFICATION"` — Current connection status.

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

  `string` — Connector identifier

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

    `string`, possible values: `"OAUTH", "API_KEY", "BASIC_AUTH", "BEARER_TOKEN", "CUSTOM", "BASIC"` — Type of authorization mechanism used. Specifies whether this connection uses OAuth, API keys, bearer tokens, or other auth methods.

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

    `string`, possible values: `"ACTIVE", "EXPIRED", "PENDING_AUTH", "PENDING_VERIFICATION"` — Current status of the connected account. Indicates if the account is active, expired, pending authorization, or pending user identity verification.

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

  `string` — Connector identifier

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

    `string`, possible values: `"OAUTH", "API_KEY", "BASIC_AUTH", "BEARER_TOKEN", "CUSTOM", "BASIC"` — Type of authorization mechanism used. Specifies whether this connection uses OAuth, API keys, bearer tokens, or other auth methods.

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

    `string`, possible values: `"ACTIVE", "EXPIRED", "PENDING_AUTH", "PENDING_VERIFICATION"` — Current status of the connected account. Indicates if the account is active, expired, pending authorization, or pending user identity verification.

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

### Get connected account details

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

    `string`, possible values: `"OAUTH", "API_KEY", "BASIC_AUTH", "BEARER_TOKEN", "CUSTOM", "BASIC"` — Type of authorization mechanism used. Specifies whether this connection uses OAuth, API keys, bearer tokens, or other auth methods.

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

    `string`, possible values: `"ACTIVE", "EXPIRED", "PENDING_AUTH", "PENDING_VERIFICATION"` — Current status of the connected account. Indicates if the account is active, expired, pending authorization, or pending user identity verification.

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

  `string` — Connector identifier

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

  `string` — Connector identifier

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

    `string`, possible values: `"OAUTH", "API_KEY", "BASIC_AUTH", "BEARER_TOKEN", "CUSTOM", "BASIC"` — Authorization mechanism type.

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

    `string`, possible values: `"ACTIVE", "EXPIRED", "PENDING_AUTH", "PENDING_VERIFICATION"` — Current connection status.

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

### Execute a tool using a connected account

- **Method:** `POST`
- **Path:** `/api/v1/execute_tool`
- **Tags:** Connected Accounts

Executes a tool action using authentication credentials from a connected account. Specify the tool by name and provide required parameters as JSON. The connected account can be identified by ID, or by combination of organization/user, connector, and identifier. Returns the execution result data and a unique execution ID for tracking. Use this endpoint to perform actions like sending emails, creating calendar events, or managing resources in external services.

#### Request Body

##### Content-Type: application/json

- **`connected_account_id`**

  `string` — Optional. The unique ID of the connected account. Use this to directly identify the connected account instead of using identifier + connector combination.

- **`connector`**

  `string` — Optional. The name of the connector/provider (e.g., 'Google Workspace', 'Slack', 'Notion'). Use this in combination with identifier to identify the connected account.

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

**Example:**

### Status of a connected account indicating its current state

- **Type:**`string`

* ACTIVE: Account is connected and credentials are valid
* EXPIRED: Access token has expired and needs refresh
* PENDING\_AUTH: Account awaiting user authorization (re-auth initiated)
* PENDING\_VERIFICATION: OAuth complete; awaiting user identity verification before activation

**Example:**

### Connected account summary for list operations - excludes sensitive authorization details

- **Type:**`object`

* **`authorization_type`**

  `string`, possible values: `"OAUTH", "API_KEY", "BASIC_AUTH", "BEARER_TOKEN", "CUSTOM", "BASIC"` — Authorization mechanism type.

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

  `string`, possible values: `"ACTIVE", "EXPIRED", "PENDING_AUTH", "PENDING_VERIFICATION"` — Current connection status.

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

    `string`, possible values: `"OAUTH", "API_KEY", "BASIC_AUTH", "BEARER_TOKEN", "CUSTOM", "BASIC"` — Authorization mechanism type.

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

    `string`, possible values: `"ACTIVE", "EXPIRED", "PENDING_AUTH", "PENDING_VERIFICATION"` — Current connection status.

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

  `string` — Connector identifier

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

  `string`, possible values: `"OAUTH", "API_KEY", "BASIC_AUTH", "BEARER_TOKEN", "CUSTOM", "BASIC"` — Type of authorization mechanism used. Specifies whether this connection uses OAuth, API keys, bearer tokens, or other auth methods.

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

  `string`, possible values: `"ACTIVE", "EXPIRED", "PENDING_AUTH", "PENDING_VERIFICATION"` — Current status of the connected account. Indicates if the account is active, expired, pending authorization, or pending user identity verification.

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

    `string`, possible values: `"OAUTH", "API_KEY", "BASIC_AUTH", "BEARER_TOKEN", "CUSTOM", "BASIC"` — Type of authorization mechanism used. Specifies whether this connection uses OAuth, API keys, bearer tokens, or other auth methods.

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

    `string`, possible values: `"ACTIVE", "EXPIRED", "PENDING_AUTH", "PENDING_VERIFICATION"` — Current status of the connected account. Indicates if the account is active, expired, pending authorization, or pending user identity verification.

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

  `string` — Connector identifier

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

    `string`, possible values: `"OAUTH", "API_KEY", "BASIC_AUTH", "BEARER_TOKEN", "CUSTOM", "BASIC"` — Type of authorization mechanism used. Specifies whether this connection uses OAuth, API keys, bearer tokens, or other auth methods.

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

    `string`, possible values: `"ACTIVE", "EXPIRED", "PENDING_AUTH", "PENDING_VERIFICATION"` — Current status of the connected account. Indicates if the account is active, expired, pending authorization, or pending user identity verification.

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

    `string`, possible values: `"OAUTH", "API_KEY", "BASIC_AUTH", "BEARER_TOKEN", "CUSTOM", "BASIC"` — Type of authorization mechanism used. Specifies whether this connection uses OAuth, API keys, bearer tokens, or other auth methods.

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

    `string`, possible values: `"ACTIVE", "EXPIRED", "PENDING_AUTH", "PENDING_VERIFICATION"` — Current status of the connected account. Indicates if the account is active, expired, pending authorization, or pending user identity verification.

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

  `string` — Connector identifier

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

  `string` — Connector identifier

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

    `string`, possible values: `"OAUTH", "API_KEY", "BASIC_AUTH", "BEARER_TOKEN", "CUSTOM", "BASIC"` — Authorization mechanism type.

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

    `string`, possible values: `"ACTIVE", "EXPIRED", "PENDING_AUTH", "PENDING_VERIFICATION"` — Current connection status.

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

### toolsExecuteToolRequest

- **Type:**`object`

* **`connected_account_id`**

  `string` — Optional. The unique ID of the connected account. Use this to directly identify the connected account instead of using identifier + connector combination.

* **`connector`**

  `string` — Optional. The name of the connector/provider (e.g., 'Google Workspace', 'Slack', 'Notion'). Use this in combination with identifier to identify the connected account.

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
