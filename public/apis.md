# Scalekit APIs

- **OpenAPI Version:** `3.1.1`
- **API Version:** `1.0.0`

# Overview

The Scalekit API is a RESTful API that enables you to manage organizations, users, and authentication settings. All requests must use HTTPS. All API requests use the following base URLs:

```properties
https://{your-subdomain}.scalekit.dev (Development)
https://{your-subdomain}.scalekit.com (Production)
https://auth.yourapp.com (Custom domain)
```

Scalekit operates two separate environments: Development and Production. Resources cannot be moved between environments.

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
curl https://<SCALEKIT_ENVIRONMENT_URL>/api/v1/organizations \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {access_token}'
```

The response includes an access token:

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6InNua181Ok4OTEyMjU2NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 86399,
  "scope": "openid"
}
```

## SDKs

Scalekit provides official SDKs for multiple programming languages. Check the changelog at GitHub repositories for the latest updates.

### Node.js

```sh
npm install @scalekit-sdk/node
```

Create a new Scalekit client instance after initializing the environment variables

```js
import { Scalekit } from '@scalekit-sdk/node'

export let scalekit = new Scalekit(
  process.env.SCALEKIT_ENVIRONMENT_URL,
  process.env.SCALEKIT_CLIENT_ID,
  process.env.SCALEKIT_CLIENT_SECRET,
)
```

[See the Node SDK changelog](https://github.com/scalekit-inc/scalekit-sdk-node/releases)

### Python

```sh
pip install scalekit-sdk-python
```

Create a new Scalekit client instance after initializing the environment variables.

```py
from scalekit import ScalekitClient
import os

scalekit_client = ScalekitClient(
    os.environ.get('SCALEKIT_ENVIRONMENT_URL'),
    os.environ.get('SCALEKIT_CLIENT_ID'),
    os.environ.get('SCALEKIT_CLIENT_SECRET')
)
```

[See the Python SDK changelog](https://github.com/scalekit-inc/scalekit-sdk-python/releases)

### Go

```sh
go get -u github.com/scalekit-inc/scalekit-sdk-go
```

Create a new Scalekit client instance after initializing the environment variables.

```go
package main

import (
    "os"
    "github.com/scalekit-inc/scalekit-sdk-go"
)

scalekitClient := scalekit.NewScalekitClient(
    os.Getenv("SCALEKIT_ENVIRONMENT_URL"),
    os.Getenv("SCALEKIT_CLIENT_ID"),
    os.Getenv("SCALEKIT_CLIENT_SECRET"),
)
```

[See the Go SDK changelog](https://github.com/scalekit-inc/scalekit-sdk-go/releases)

### Java

```gradle
/* Gradle users - add the following to your dependencies in build file */
implementation "com.scalekit:scalekit-sdk-java:2.0.11"
```

```xml
<!-- Maven users - add the following to your `pom.xml` -->
<dependency>
    <groupId>com.scalekit</groupId>
    <artifactId>scalekit-sdk-java</artifactId>
    <version>2.0.11</version>
</dependency>
```

[See the Java SDK changelog](https://github.com/scalekit-inc/scalekit-sdk-java/releases)

### Error handling

The API uses standard HTTP status codes:

| Code        | Description          |
| ----------- | -------------------- |
| 200/201     | Success              |
| 400         | Invalid request      |
| 401         | Authentication error |
| 404         | Resource not found   |
| 429         | Rate limit exceeded  |
| 500/501/504 | Server error         |

Error responses include detailed information:

```json
{
  "code": 16,
  "message": "Token empty",
  "details": [
    {
      "@type": "type.googleapis.com/scalekit.v1.errdetails.ErrorInfo",
      "error_code": "UNAUTHENTICATED"
    }
  ]
}
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

  `string` — Pagination token for retrieving the next page. Empty if this is the last page. Pass this value to page_token in the next request.

- **`prev_page_token`**

  `string` — Pagination token for retrieving the previous page. Empty if this is the first page. Pass this value to page_token to go back.

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

      `object` — Google Domain-Wide Delegation authentication — used for GOOGLE_DWD connections. Send only subject in requests; access_token, scopes, and token_expires_at are response-only.
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
        "scopes": ["read", "write"]
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

      `object` — Google Domain-Wide Delegation authentication — used for GOOGLE_DWD connections. Send only subject in requests; access_token, scopes, and token_expires_at are response-only.
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

    `object` — Optional authentication credentials for the connected account. Include OAuth tokens (access_token, refresh_token, scopes) or static auth details (API keys, bearer tokens). Can be provided later via update.
    - **`google_dwd`**

      `object` — Google Domain-Wide Delegation authentication — used for GOOGLE_DWD connections. Send only subject in requests; access_token, scopes, and token_expires_at are response-only.
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
        "scopes": ["read", "write"]
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

      `object` — Google Domain-Wide Delegation authentication — used for GOOGLE_DWD connections. Send only subject in requests; access_token, scopes, and token_expires_at are response-only.
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

      `object` — Google Domain-Wide Delegation authentication — used for GOOGLE_DWD connections. Send only subject in requests; access_token, scopes, and token_expires_at are response-only.
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

      `object` — Google Domain-Wide Delegation authentication — used for GOOGLE_DWD connections. Send only subject in requests; access_token, scopes, and token_expires_at are response-only.
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

Confirms the user assertion and activates the connected account after the user completes third-party OAuth. Called by the B2B app server with auth_request_id and identifier. Validates that the asserted identifier matches the one stored on the auth request and promotes pending tokens to live.

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

##### Status: 404 Not found - no pending flow for the given auth_request_id or already consumed

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

### List connections

- **Method:** `GET`
- **Path:** `/api/v1/connections`
- **Tags:** Connections

Retrieves a list of connections in the environment

#### Responses

##### Status: 200 Successfully retrieved connections

###### Content-Type: application/json

- **`connections`**

  `array` — List of connections matching the request criteria

  **Items:**
  - **`domains`**

    `array` — List of domains configured with this connection

    **Items:**

    `string`

  - **`enabled`**

    `boolean` — Whether the connection is currently active for organization users

  - **`id`**

    `string` — Unique identifier of the connection

  - **`key_id`**

    `string` — Alternative identifier for this connection, typically used in frontend applications or URLs

  - **`organization_id`**

    `string` — Unique identifier of the organization that owns this connection

  - **`organization_name`**

    `string` — Name of the organization of the connection

  - **`provider`**

    `string`, possible values: `"OKTA", "GOOGLE", "MICROSOFT_AD", "AUTH0", "ONELOGIN", "PING_IDENTITY", "JUMPCLOUD", "CUSTOM", "GITHUB", "GITLAB", "LINKEDIN", "SALESFORCE", "MICROSOFT", "IDP_SIMULATOR", "SCALEKIT", "ADFS"` — Identity provider type (e.g., OKTA, Google, Azure AD)

  - **`provider_key`**

    `string` — Key ID of the identity provider service that handles authentication

  - **`status`**

    `string`, possible values: `"DRAFT", "IN_PROGRESS", "COMPLETED"` — Current configuration status of the connection

  - **`type`**

    `string`, possible values: `"OIDC", "SAML", "PASSWORD", "OAUTH", "PASSWORDLESS", "BASIC", "BEARER", "API_KEY", "WEBAUTHN", "OAUTH_M2M", "TRELLO_OAUTH1", "GOOGLE_DWD"` — Authentication protocol used by the connection

**Example:**

```json
{
  "connections": [
    {
      "domains": ["yourapp.com", "yourworkspace.com"],
      "enabled": false,
      "id": "conn_2123312131125533",
      "key_id": "conn_2123312131125533",
      "organization_id": "org_2123312131125533",
      "organization_name": "Your Organization",
      "provider": "CUSTOM",
      "provider_key": "google",
      "status": "IN_PROGRESS",
      "type": "OIDC"
    }
  ]
}
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
  "auth_patterns": [{}],
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
    "auth_patterns": [{}],
    "categories": [""],
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
  "auth_patterns": [{}],
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
    "auth_patterns": [{}],
    "categories": [""],
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

### Resend user invitation email

- **Method:** `PATCH`
- **Path:** `/api/v1/invites/organizations/{organization_id}/users/{id}/resend`
- **Tags:** Users

Resends an invitation email to a user who has a pending or expired invitation in the specified organization. If the invitation has expired, a new invitation will be automatically created and sent. If the invitation is still valid, a reminder email will be sent instead. Use this endpoint when a user hasn't responded to their initial invitation and you need to send them a reminder or when the original invitation has expired. The invitation email includes a secure magic link that allows the user to complete their account setup and join the organization. Each resend operation increments the resent counter.

#### Request Body

##### Content-Type: application/json

**Example:**

```json
{}
```

#### Responses

##### Status: 200 Successfully resent the invitation email. Returns the updated invitation object with organization ID, user ID, membership status, timestamps, and resent count. If expired, a new invitation is created; otherwise, the existing one is resent.

###### Content-Type: application/json

- **`invite`**

  `object` — Updated invitation object containing the resent invitation details, including new expiration time and incremented resend counter.
  - **`created_at`**

    `string`, format: `date-time` — Timestamp when the invite was originally created.

  - **`expires_at`**

    `string`, format: `date-time` — The time at which the invite expires.

  - **`inviter_email`**

    `string` — Identifier of the user or system that initiated the invite.

  - **`organization_id`**

    `string` — The organization to which the invite belongs.

  - **`resent_at`**

    `string`, format: `date-time` — Timestamp when the invite was last resent, if applicable.

  - **`resent_count`**

    `integer`, format: `int32` — Number of times the invite has been resent.

  - **`status`**

    `string` — Current status of the invite (e.g., pending, accepted, expired, revoked).

  - **`user_id`**

    `string` — User ID to whom the invite is sent. May be empty if the user has not signed up yet.

**Example:**

```json
{
  "invite": {
    "expires_at": "2025-12-31T23:59:59Z",
    "organization_id": "org_123",
    "resent_count": 2,
    "status": "pending_invite",
    "user_id": "usr_456"
  }
}
```

##### Status: 400 Invalid request — common causes include user ID or organization ID is invalid, full-stack authentication is disabled, user profile is missing, invite already accepted, or missing expiry time in user management settings.

###### Content-Type: application/json

- **`debug_info`**

  `object` — Describes additional debugging info.
  - **`detail`**

    `string` — Additional debugging information provided by the server.

  - **`stack_entries`**

    `array` — The stack trace entries indicating where the error occurred.

    **Items:**

    `string`

- **`error_code`**

  `string`

- **`help_info`**

  `object` — HelpInfo provides documentation links attached to an error response. When present in ErrorInfo, clients should surface these links to help developers resolve the error. For example, a missing required field error may include a link to the relevant guide.
  - **`links`**

    `array` — One or more links relevant to resolving the error.

    **Items:**
    - **`description`**

      `string` — Human-readable label for the link (e.g. "User verification flow").

    - **`url`**

      `string` — Absolute URL to the documentation page (e.g. "https\://docs.scalekit.com/...").

- **`localized_message_info`**

  `object`
  - **`locale`**

    `string`

  - **`message`**

    `string`

- **`request_info`**

  `object` — Contains metadata about the request that clients can attach when filing a bug or providing other forms of feedback.
  - **`request_id`**

    `string` — An opaque string that should only be interpreted by the service generating it. For example, it can be used to identify requests in the service's logs.

  - **`serving_data`**

    `string` — Any data that was used to serve this request. For example, an encrypted stack trace that can be sent back to the service provider for debugging.

- **`resource_info`**

  `object` — Describes the resource that is being accessed.
  - **`description`**

    `string` — Describes what error is encountered when accessing this resource. For example, updating a cloud project may require the \`writer\` permission on the developer console project.

  - **`owner`**

    `string`

  - **`required_permissions`**

    `array` — The required permissions needed to access the resource.

    **Items:**

    `string`

  - **`resource_name`**

    `string`

  - **`user`**

    `string`

- **`tool_error_info`**

  `object`
  - **`execution_id`**

    `string`

  - **`tool_error_code`**

    `string`

  - **`tool_error_message`**

    `string`

- **`validation_error_info`**

  `object` — Describes violations in a client request. This error type focuses on the syntactic aspects of the request.
  - **`field_violations`**

    `array` — Describes all violations in a client request.

    **Items:**
    - **`constraint`**

      `string`

    - **`description`**

      `string` — A description of why the request element is bad.

    - **`field`**

      `string`

**Example:**

```json
{
  "debug_info": {
    "detail": "",
    "stack_entries": [""]
  },
  "error_code": "",
  "help_info": {
    "links": [{}]
  },
  "localized_message_info": {
    "locale": "",
    "message": ""
  },
  "request_info": {
    "request_id": "",
    "serving_data": ""
  },
  "resource_info": {
    "description": "",
    "owner": "",
    "required_permissions": [""],
    "resource_name": "",
    "user": ""
  },
  "tool_error_info": {
    "execution_id": "",
    "tool_error_code": "",
    "tool_error_message": ""
  },
  "validation_error_info": {
    "field_violations": [{}]
  }
}
```

##### Status: 404 Resource not found — the specified user, organization, membership, or invitation could not be found in the specified environment. Verify that all IDs are correct and that the resources exist before attempting to resend an invitation.

###### Content-Type: application/json

- **`debug_info`**

  `object` — Describes additional debugging info.
  - **`detail`**

    `string` — Additional debugging information provided by the server.

  - **`stack_entries`**

    `array` — The stack trace entries indicating where the error occurred.

    **Items:**

    `string`

- **`error_code`**

  `string`

- **`help_info`**

  `object` — HelpInfo provides documentation links attached to an error response. When present in ErrorInfo, clients should surface these links to help developers resolve the error. For example, a missing required field error may include a link to the relevant guide.
  - **`links`**

    `array` — One or more links relevant to resolving the error.

    **Items:**
    - **`description`**

      `string` — Human-readable label for the link (e.g. "User verification flow").

    - **`url`**

      `string` — Absolute URL to the documentation page (e.g. "https\://docs.scalekit.com/...").

- **`localized_message_info`**

  `object`
  - **`locale`**

    `string`

  - **`message`**

    `string`

- **`request_info`**

  `object` — Contains metadata about the request that clients can attach when filing a bug or providing other forms of feedback.
  - **`request_id`**

    `string` — An opaque string that should only be interpreted by the service generating it. For example, it can be used to identify requests in the service's logs.

  - **`serving_data`**

    `string` — Any data that was used to serve this request. For example, an encrypted stack trace that can be sent back to the service provider for debugging.

- **`resource_info`**

  `object` — Describes the resource that is being accessed.
  - **`description`**

    `string` — Describes what error is encountered when accessing this resource. For example, updating a cloud project may require the \`writer\` permission on the developer console project.

  - **`owner`**

    `string`

  - **`required_permissions`**

    `array` — The required permissions needed to access the resource.

    **Items:**

    `string`

  - **`resource_name`**

    `string`

  - **`user`**

    `string`

- **`tool_error_info`**

  `object`
  - **`execution_id`**

    `string`

  - **`tool_error_code`**

    `string`

  - **`tool_error_message`**

    `string`

- **`validation_error_info`**

  `object` — Describes violations in a client request. This error type focuses on the syntactic aspects of the request.
  - **`field_violations`**

    `array` — Describes all violations in a client request.

    **Items:**
    - **`constraint`**

      `string`

    - **`description`**

      `string` — A description of why the request element is bad.

    - **`field`**

      `string`

**Example:**

```json
{
  "debug_info": {
    "detail": "",
    "stack_entries": [""]
  },
  "error_code": "",
  "help_info": {
    "links": [{}]
  },
  "localized_message_info": {
    "locale": "",
    "message": ""
  },
  "request_info": {
    "request_id": "",
    "serving_data": ""
  },
  "resource_info": {
    "description": "",
    "owner": "",
    "required_permissions": [""],
    "resource_name": "",
    "user": ""
  },
  "tool_error_info": {
    "execution_id": "",
    "tool_error_code": "",
    "tool_error_message": ""
  },
  "validation_error_info": {
    "field_violations": [{}]
  }
}
```

##### Status: 500 Internal server error — an unexpected error occurred while processing the invitation resend request. This may be due to database connectivity issues, problems generating the secure magic link, email delivery service failures, or transaction errors during invitation processing. Contact support if the problem persists.

###### Content-Type: application/json

- **`debug_info`**

  `object` — Describes additional debugging info.
  - **`detail`**

    `string` — Additional debugging information provided by the server.

  - **`stack_entries`**

    `array` — The stack trace entries indicating where the error occurred.

    **Items:**

    `string`

- **`error_code`**

  `string`

- **`help_info`**

  `object` — HelpInfo provides documentation links attached to an error response. When present in ErrorInfo, clients should surface these links to help developers resolve the error. For example, a missing required field error may include a link to the relevant guide.
  - **`links`**

    `array` — One or more links relevant to resolving the error.

    **Items:**
    - **`description`**

      `string` — Human-readable label for the link (e.g. "User verification flow").

    - **`url`**

      `string` — Absolute URL to the documentation page (e.g. "https\://docs.scalekit.com/...").

- **`localized_message_info`**

  `object`
  - **`locale`**

    `string`

  - **`message`**

    `string`

- **`request_info`**

  `object` — Contains metadata about the request that clients can attach when filing a bug or providing other forms of feedback.
  - **`request_id`**

    `string` — An opaque string that should only be interpreted by the service generating it. For example, it can be used to identify requests in the service's logs.

  - **`serving_data`**

    `string` — Any data that was used to serve this request. For example, an encrypted stack trace that can be sent back to the service provider for debugging.

- **`resource_info`**

  `object` — Describes the resource that is being accessed.
  - **`description`**

    `string` — Describes what error is encountered when accessing this resource. For example, updating a cloud project may require the \`writer\` permission on the developer console project.

  - **`owner`**

    `string`

  - **`required_permissions`**

    `array` — The required permissions needed to access the resource.

    **Items:**

    `string`

  - **`resource_name`**

    `string`

  - **`user`**

    `string`

- **`tool_error_info`**

  `object`
  - **`execution_id`**

    `string`

  - **`tool_error_code`**

    `string`

  - **`tool_error_message`**

    `string`

- **`validation_error_info`**

  `object` — Describes violations in a client request. This error type focuses on the syntactic aspects of the request.
  - **`field_violations`**

    `array` — Describes all violations in a client request.

    **Items:**
    - **`constraint`**

      `string`

    - **`description`**

      `string` — A description of why the request element is bad.

    - **`field`**

      `string`

**Example:**

```json
{
  "debug_info": {
    "detail": "",
    "stack_entries": [""]
  },
  "error_code": "",
  "help_info": {
    "links": [{}]
  },
  "localized_message_info": {
    "locale": "",
    "message": ""
  },
  "request_info": {
    "request_id": "",
    "serving_data": ""
  },
  "resource_info": {
    "description": "",
    "owner": "",
    "required_permissions": [""],
    "resource_name": "",
    "user": ""
  },
  "tool_error_info": {
    "execution_id": "",
    "tool_error_code": "",
    "tool_error_message": ""
  },
  "validation_error_info": {
    "field_violations": [{}]
  }
}
```

### List MCPs

- **Method:** `GET`
- **Path:** `/api/v1/mcp`
- **Tags:** MCP

Returns a list of existing MCPs, optionally filtered by connected_account_identifier and link_token.

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
      "connection_tool_mappings": [{}],
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
      "tools": [""]
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
    "connection_tool_mappings": [{}],
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
    "connection_tool_mappings": [{}],
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
      "tools": [""]
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
    "connection_tool_mappings": [{}],
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

### Add existing user to organization

- **Method:** `POST`
- **Path:** `/api/v1/memberships/organizations/{organization_id}/users/{id}`
- **Tags:** Users

Adds an existing user to an organization and assigns them specific roles and permissions. Use this endpoint when you want to grant an existing user access to a particular organization. You can specify roles, metadata, and other membership details during the invitation process.

#### Request Body

##### Content-Type: application/json

- **`inviter_email`**

  `string` — Email address of the user who invited this member. Must be a valid email address.

- **`metadata`**

  `object` — Custom key-value pairs for storing additional user context. Keys (3-25 chars), values (1-256 chars).

- **`roles`**

  `array` — Role to assign to the user within the organization

  **Items:**
  - **`display_name`**

    `string` — Human-readable name for the role

  - **`id`**

    `string` — Role ID

  - **`name`**

    `string` — Attribute name/identifier for the role used in system operations and API calls. This should be a machine-readable identifier that follows naming conventions.

**Example:**

```json
{
  "inviter_email": "john.doe@example.com",
  "metadata": {
    "department": "engineering",
    "location": "nyc-office"
  },
  "roles": [
    {
      "name": "admin"
    }
  ]
}
```

#### Responses

##### Status: 201 User successfully added to the organization. Returns details of the updated membership details

###### Content-Type: application/json

- **`user`**

  `object`
  - **`create_time`**

    `string`, format: `date-time` — Timestamp when the user account was initially created. Automatically set by the server.

  - **`email`**

    `string` — Primary email address for the user. Must be unique across the environment and valid per RFC 5322.

  - **`external_id`**

    `string` — Your application's unique identifier for this organization, used to link Scalekit with your system.

  - **`id`**

    `string` — Unique system-generated identifier for the user. Immutable once created.

  - **`last_login_time`**

    `string`, format: `date-time` — Timestamp of the user's most recent successful authentication. Updated automatically.

  - **`memberships`**

    `array` — List of organization memberships. Automatically populated based on group assignments.

    **Items:**
    - **`accepted_at`**

      `string`, format: `date-time` — Timestamp when the user accepted the invitation.

    - **`created_at`**

      `string`, format: `date-time` — Timestamp when the invitation was created.

    - **`display_name`**

      `string` — Organization display name. This field stores a user-friendly name for the organization that may be different from the formal name, often used for UI display purposes.

    - **`expires_at`**

      `string`, format: `date-time` — Timestamp when the invitation expired.

    - **`inviter_email`**

      `string` — ID of the user who invited this user.

    - **`join_time`**

      `string`, format: `date-time` — Timestamp when the membership was created. Automatically set by the server.

    - **`membership_status`**

      `string`, possible values: `"ACTIVE", "INACTIVE", "PENDING_INVITE", "INVITE_EXPIRED"`

    - **`metadata`**

      `object` — Custom key-value pairs for storing additional user context. Keys (3-25 chars), values (1-256 chars).

    - **`name`**

      `string` — Organization name. This field stores the formal organization name used for identification and display purposes.

    - **`organization_id`**

      `string` — Unique identifier for the organization. Immutable and read-only.

    - **`permissions`**

      `array` — Effective permissions granted to the user within the organization (including inherited permissions from assigned roles). Lists the specific actions and access rights the user can perform.

      **Items:**

      `string`

    - **`provisioning_method`**

      `string` — How the user was provisioned. Possible values: - \`jit_using_sso\` (Just-in-time provisioning during SSO login) - \`allowed_email_domain\` (User joined via allowed email domain matching) - \`org_creator\` (User created the organization) - \`direct_provision\` (User was directly provisioned via API or SCIM) - \`invitation\` (User was invited and accepted an invitation)

    - **`roles`**

      `array`

      **Items:**
      - **`display_name`**

        `string` — Human-readable name for the role

      - **`id`**

        `string` — Role ID

      - **`name`**

        `string` — Attribute name/identifier for the role used in system operations and API calls. This should be a machine-readable identifier that follows naming conventions.

  - **`metadata`**

    `object` — Custom key-value pairs for storing additional user context. Keys (3-25 chars), values (1-256 chars).

  - **`update_time`**

    `string`, format: `date-time` — Timestamp of the last modification to the user account. Automatically updated by the server.

  - **`user_profile`**

    `object` — User's personal information including name, address, and other profile attributes.
    - **`custom_attributes`**

      `object` — Custom attributes for extended user profile data and application-specific information. This field stores business-specific user data like department, job title, security clearances, project assignments, or any other organizational attributes your application requires. Unlike system metadata, these attributes are typically managed by administrators or applications and are visible to end users for personalization and business logic. Keys must be 3-25 characters, values must be 1-256 characters, with a maximum of 20 key-value pairs.

    - **`email_verified`**

      `boolean` — Indicates if the user's email address has been verified. Automatically updated by the system.

    - **`external_identities`**

      `array` — List of external identity connections associated with the user profile.

      **Items:**
      - **`connection_id`**

        `string` — Unique identifier for the external identity connection. Immutable and read-only.

      - **`connection_provider`**

        `string`, possible values: `"OKTA", "GOOGLE", "MICROSOFT_AD", "AUTH0", "ONELOGIN", "PING_IDENTITY", "JUMPCLOUD", "CUSTOM", "GITHUB", "GITLAB", "LINKEDIN", "SALESFORCE", "MICROSOFT", "IDP_SIMULATOR", "SCALEKIT", "ADFS"` — Type of the identity provider.

      - **`connection_type`**

        `string` — Name of the external identity connection.

      - **`connection_user_id`**

        `string` — Unique identifier for the user in the external identity provider system. Immutable and read-only.

      - **`created_time`**

        `string`, format: `date-time` — Timestamp when this external identity connection was first created. Immutable and read-only.

      - **`is_social`**

        `boolean` — Indicates if the identity provider is a social provider (true) or enterprise/custom provider (false). Read-only.

      - **`last_login_time`**

        `string`, format: `date-time` — Timestamp of the user's last successful login via this external identity provider. Automatically updated by the system.

      - **`last_synced_time`**

        `string`, format: `date-time` — Timestamp of the last data synchronization for this external identity from the provider. Automatically updated by the system.

    - **`family_name`**

      `string` — The user's family name (last name or surname). This field stores the user's last name and is combined with the given name to create the full display name. The family name is used in formal communications, user listings, and organizational directories throughout the system. Maximum 255 characters allowed.

    - **`gender`**

      `string` — The user's gender identity information. This field stores the user's gender identity for personalization, compliance reporting, or organizational analytics purposes. This field supports any string value to accommodate diverse gender identities and should be handled with appropriate privacy considerations according to your organization's policies and applicable regulations.

    - **`given_name`**

      `string` — The user's given name (first name). This field stores the user's first name and is used for personalization, display purposes, and when generating the full display name. The given name appears in user interfaces, formal communications, and user listings throughout the system. Maximum 255 characters allowed.

    - **`groups`**

      `array` — The list of group names the user belongs to within the organization. This field stores the user's group memberships for role-based access control, team assignments, and organizational structure. Groups are typically used for permission management, collaborative access, and organizational hierarchy. Each group name represents a distinct organizational unit or team that the user is associated with.

      **Items:**

      `string`

    - **`id`**

      `string` — Unique system-generated identifier for the user profile. Immutable and read-only.

    - **`locale`**

      `string` — The user's preferred language and region settings using BCP-47 format codes. This field customizes the user's experience with localized content, date formats, number formatting, and UI language throughout the system. When not specified, the user inherits the organization's default locale settings. Common values include \`en-US\`, \`en-GB\`, \`fr-FR\`, \`de-DE\`, and \`es-ES\`.

    - **`metadata`**

      `object` — Raw attributes received from identity providers during authentication. This field stores the original user profile data as received from external IdP systems (SAML, OIDC, etc.) including provider-specific claims and attributes. These fields preserve the complete set of attributes received from the identity source and are used for mapping, synchronization, and audit purposes. Keys must be 3-25 characters, values must be 1-256 characters, with a maximum of 20 key-value pairs.

    - **`name`**

      `string` — The user's complete display name in formatted form. This field stores the full name as a single string and is typically used when you want to set the complete name rather than using separate given and family names. This name appears in user interfaces, reports, directory listings, and anywhere a formatted display name is needed. This field serves as a formatted display name that complements the individual given_name and family_name fields.

    - **`phone_number`**

      `string` — The user's phone number in E.164 international format. This field stores the phone number for user contact and identification purposes. The phone number must include the country code and be formatted according to E.164 standards (e.g., \`+1\` for US numbers). This field is optional.

    - **`phone_number_verified`**

      `boolean` — Indicates if the user's phone number has been verified. Automatically updated by the system.

    - **`picture`**

      `string` — The URL to the user's profile picture or avatar image. This field stores the location of the user's profile photo that appears in user interfaces, directory listings, and collaborative features throughout the system. The URL should point to a publicly accessible image file. Supported formats typically include JPEG, PNG, and GIF. This image is used for visual identification and personalization across the platform.

    - **`preferred_username`**

      `string` — The user's preferred username for display and identification purposes. This field stores a custom username that the user prefers to be known by, which may differ from their email or formal name. This username appears in user interfaces, mentions, informal communications, and collaborative features throughout the system. Maximum 512 characters allowed.

**Example:**

```json
{
  "user": {
    "create_time": "",
    "email": "user@example.com",
    "external_id": "ext_12345a67b89c",
    "id": "usr_1234abcd5678efgh",
    "last_login_time": "",
    "memberships": [{}],
    "metadata": {
      "department": "engineering",
      "location": "nyc-office"
    },
    "update_time": "",
    "user_profile": null
  }
}
```

### Delete organization membership for user

- **Method:** `DELETE`
- **Path:** `/api/v1/memberships/organizations/{organization_id}/users/{id}`
- **Tags:** Users

Removes a user from an organization by user ID or external ID. If the user has no memberships left and cascade is true, the user is also deleted. This action is irreversible and may also remove related group memberships.

#### Responses

##### Status: 200 User successfully marked for deletion. No content returned

###### Content-Type: application/json

**Example:**

```json
null
```

### Update organization membership for user

- **Method:** `PATCH`
- **Path:** `/api/v1/memberships/organizations/{organization_id}/users/{id}`
- **Tags:** Users

Updates a user's membership details within an organization by user ID or external ID. You can update roles and membership metadata.

#### Request Body

##### Content-Type: application/json

- **`metadata`**

  `object` — Custom key-value pairs for storing additional user context. Keys (3-25 chars), values (1-256 chars).

- **`roles`**

  `array` — Role to assign to the user within the organization

  **Items:**
  - **`display_name`**

    `string` — Human-readable name for the role

  - **`id`**

    `string` — Role ID

  - **`name`**

    `string` — Attribute name/identifier for the role used in system operations and API calls. This should be a machine-readable identifier that follows naming conventions.

**Example:**

```json
{
  "metadata": {
    "department": "engineering",
    "location": "nyc-office"
  },
  "roles": [
    {
      "name": "admin"
    }
  ]
}
```

#### Responses

##### Status: 200 Membership updated successfully. Returns the updated user object.

###### Content-Type: application/json

- **`user`**

  `object`
  - **`create_time`**

    `string`, format: `date-time` — Timestamp when the user account was initially created. Automatically set by the server.

  - **`email`**

    `string` — Primary email address for the user. Must be unique across the environment and valid per RFC 5322.

  - **`external_id`**

    `string` — Your application's unique identifier for this organization, used to link Scalekit with your system.

  - **`id`**

    `string` — Unique system-generated identifier for the user. Immutable once created.

  - **`last_login_time`**

    `string`, format: `date-time` — Timestamp of the user's most recent successful authentication. Updated automatically.

  - **`memberships`**

    `array` — List of organization memberships. Automatically populated based on group assignments.

    **Items:**
    - **`accepted_at`**

      `string`, format: `date-time` — Timestamp when the user accepted the invitation.

    - **`created_at`**

      `string`, format: `date-time` — Timestamp when the invitation was created.

    - **`display_name`**

      `string` — Organization display name. This field stores a user-friendly name for the organization that may be different from the formal name, often used for UI display purposes.

    - **`expires_at`**

      `string`, format: `date-time` — Timestamp when the invitation expired.

    - **`inviter_email`**

      `string` — ID of the user who invited this user.

    - **`join_time`**

      `string`, format: `date-time` — Timestamp when the membership was created. Automatically set by the server.

    - **`membership_status`**

      `string`, possible values: `"ACTIVE", "INACTIVE", "PENDING_INVITE", "INVITE_EXPIRED"`

    - **`metadata`**

      `object` — Custom key-value pairs for storing additional user context. Keys (3-25 chars), values (1-256 chars).

    - **`name`**

      `string` — Organization name. This field stores the formal organization name used for identification and display purposes.

    - **`organization_id`**

      `string` — Unique identifier for the organization. Immutable and read-only.

    - **`permissions`**

      `array` — Effective permissions granted to the user within the organization (including inherited permissions from assigned roles). Lists the specific actions and access rights the user can perform.

      **Items:**

      `string`

    - **`provisioning_method`**

      `string` — How the user was provisioned. Possible values: - \`jit_using_sso\` (Just-in-time provisioning during SSO login) - \`allowed_email_domain\` (User joined via allowed email domain matching) - \`org_creator\` (User created the organization) - \`direct_provision\` (User was directly provisioned via API or SCIM) - \`invitation\` (User was invited and accepted an invitation)

    - **`roles`**

      `array`

      **Items:**
      - **`display_name`**

        `string` — Human-readable name for the role

      - **`id`**

        `string` — Role ID

      - **`name`**

        `string` — Attribute name/identifier for the role used in system operations and API calls. This should be a machine-readable identifier that follows naming conventions.

  - **`metadata`**

    `object` — Custom key-value pairs for storing additional user context. Keys (3-25 chars), values (1-256 chars).

  - **`update_time`**

    `string`, format: `date-time` — Timestamp of the last modification to the user account. Automatically updated by the server.

  - **`user_profile`**

    `object` — User's personal information including name, address, and other profile attributes.
    - **`custom_attributes`**

      `object` — Custom attributes for extended user profile data and application-specific information. This field stores business-specific user data like department, job title, security clearances, project assignments, or any other organizational attributes your application requires. Unlike system metadata, these attributes are typically managed by administrators or applications and are visible to end users for personalization and business logic. Keys must be 3-25 characters, values must be 1-256 characters, with a maximum of 20 key-value pairs.

    - **`email_verified`**

      `boolean` — Indicates if the user's email address has been verified. Automatically updated by the system.

    - **`external_identities`**

      `array` — List of external identity connections associated with the user profile.

      **Items:**
      - **`connection_id`**

        `string` — Unique identifier for the external identity connection. Immutable and read-only.

      - **`connection_provider`**

        `string`, possible values: `"OKTA", "GOOGLE", "MICROSOFT_AD", "AUTH0", "ONELOGIN", "PING_IDENTITY", "JUMPCLOUD", "CUSTOM", "GITHUB", "GITLAB", "LINKEDIN", "SALESFORCE", "MICROSOFT", "IDP_SIMULATOR", "SCALEKIT", "ADFS"` — Type of the identity provider.

      - **`connection_type`**

        `string` — Name of the external identity connection.

      - **`connection_user_id`**

        `string` — Unique identifier for the user in the external identity provider system. Immutable and read-only.

      - **`created_time`**

        `string`, format: `date-time` — Timestamp when this external identity connection was first created. Immutable and read-only.

      - **`is_social`**

        `boolean` — Indicates if the identity provider is a social provider (true) or enterprise/custom provider (false). Read-only.

      - **`last_login_time`**

        `string`, format: `date-time` — Timestamp of the user's last successful login via this external identity provider. Automatically updated by the system.

      - **`last_synced_time`**

        `string`, format: `date-time` — Timestamp of the last data synchronization for this external identity from the provider. Automatically updated by the system.

    - **`family_name`**

      `string` — The user's family name (last name or surname). This field stores the user's last name and is combined with the given name to create the full display name. The family name is used in formal communications, user listings, and organizational directories throughout the system. Maximum 255 characters allowed.

    - **`gender`**

      `string` — The user's gender identity information. This field stores the user's gender identity for personalization, compliance reporting, or organizational analytics purposes. This field supports any string value to accommodate diverse gender identities and should be handled with appropriate privacy considerations according to your organization's policies and applicable regulations.

    - **`given_name`**

      `string` — The user's given name (first name). This field stores the user's first name and is used for personalization, display purposes, and when generating the full display name. The given name appears in user interfaces, formal communications, and user listings throughout the system. Maximum 255 characters allowed.

    - **`groups`**

      `array` — The list of group names the user belongs to within the organization. This field stores the user's group memberships for role-based access control, team assignments, and organizational structure. Groups are typically used for permission management, collaborative access, and organizational hierarchy. Each group name represents a distinct organizational unit or team that the user is associated with.

      **Items:**

      `string`

    - **`id`**

      `string` — Unique system-generated identifier for the user profile. Immutable and read-only.

    - **`locale`**

      `string` — The user's preferred language and region settings using BCP-47 format codes. This field customizes the user's experience with localized content, date formats, number formatting, and UI language throughout the system. When not specified, the user inherits the organization's default locale settings. Common values include \`en-US\`, \`en-GB\`, \`fr-FR\`, \`de-DE\`, and \`es-ES\`.

    - **`metadata`**

      `object` — Raw attributes received from identity providers during authentication. This field stores the original user profile data as received from external IdP systems (SAML, OIDC, etc.) including provider-specific claims and attributes. These fields preserve the complete set of attributes received from the identity source and are used for mapping, synchronization, and audit purposes. Keys must be 3-25 characters, values must be 1-256 characters, with a maximum of 20 key-value pairs.

    - **`name`**

      `string` — The user's complete display name in formatted form. This field stores the full name as a single string and is typically used when you want to set the complete name rather than using separate given and family names. This name appears in user interfaces, reports, directory listings, and anywhere a formatted display name is needed. This field serves as a formatted display name that complements the individual given_name and family_name fields.

    - **`phone_number`**

      `string` — The user's phone number in E.164 international format. This field stores the phone number for user contact and identification purposes. The phone number must include the country code and be formatted according to E.164 standards (e.g., \`+1\` for US numbers). This field is optional.

    - **`phone_number_verified`**

      `boolean` — Indicates if the user's phone number has been verified. Automatically updated by the system.

    - **`picture`**

      `string` — The URL to the user's profile picture or avatar image. This field stores the location of the user's profile photo that appears in user interfaces, directory listings, and collaborative features throughout the system. The URL should point to a publicly accessible image file. Supported formats typically include JPEG, PNG, and GIF. This image is used for visual identification and personalization across the platform.

    - **`preferred_username`**

      `string` — The user's preferred username for display and identification purposes. This field stores a custom username that the user prefers to be known by, which may differ from their email or formal name. This username appears in user interfaces, mentions, informal communications, and collaborative features throughout the system. Maximum 512 characters allowed.

**Example:**

```json
{
  "user": {
    "create_time": "",
    "email": "user@example.com",
    "external_id": "ext_12345a67b89c",
    "id": "usr_1234abcd5678efgh",
    "last_login_time": "",
    "memberships": [{}],
    "metadata": {
      "department": "engineering",
      "location": "nyc-office"
    },
    "update_time": "",
    "user_profile": null
  }
}
```

### List organizations

- **Method:** `GET`
- **Path:** `/api/v1/organizations`
- **Tags:** Organizations

Retrieve a paginated list of organizations within your environment. The response includes a `page_token` that can be used to access subsequent pages of results.

#### Responses

##### Status: 200 Successfully retrieved the list of organizations

###### Content-Type: application/json

- **`next_page_token`**

  `string` — Pagination token for the next page of results. Use this token to fetch the next page.

- **`organizations`**

  `array` — List of organization objects

  **Items:**
  - **`create_time` (required)**

    `string`, format: `date-time` — Timestamp when the organization was created

  - **`display_name`**

    `string` — Name of the organization. Must be between 1 and 200 characters

  - **`external_id`**

    `string` — Your application's unique identifier for this organization, used to link Scalekit with your system.

  - **`id`**

    `string` — Unique scalekit-generated identifier that uniquely references an organization

  - **`logo_url`**

    `string`, format: `uri` — HTTPS URL of the organization's logo image. Maximum 1024 characters. Must use the https scheme.

  - **`metadata`**

    `object` — Key value pairs extension attributes.

  - **`region_code`**

    `string`, possible values: `"US", "EU"` — Geographic region code for the organization. Currently limited to US.

  - **`settings`**

    `object` — Configuration options that control organization-level features and capabilities
    - **`features`**

      `array` — List of feature toggles that control organization capabilities such as SSO authentication and directory synchronization

      **Items:**
      - **`enabled` (required)**

        `boolean` — Whether the feature is enabled (true) or disabled (false) for this organization

      - **`name` (required)**

        `string` — Feature identifier. Supported values include: "sso" (Single Sign-On), "directory_sync" (Directory Synchronization), "domain_verification" (Domain Verification), "session_policy" (Organization-level session policy override)

  - **`slug`**

    `string` — Slug for dynamic redirect URI resolution. A single DNS label (e.g. acme) or hostname (e.g. oauth.pstmn.io). Lowercase alphanumeric, hyphens, and dots. Max 253 chars. Unique per environment.

  - **`update_time`**

    `string`, format: `date-time` — Timestamp when the organization was last updated

- **`prev_page_token`**

  `string` — Pagination token for the previous page of results. Use this token to fetch the previous page.

- **`total_size`**

  `integer`, format: `int64` — Total number of organizations in the environment.

**Example:**

```json
{
  "next_page_token": "<next_page_token>",
  "organizations": [
    {
      "create_time": "2025-02-15T06:23:44.560000Z",
      "display_name": "Megasoft",
      "external_id": "my_unique_id",
      "id": "org_59615193906282635",
      "logo_url": "https://cdn.example.com/acme-logo.png",
      "metadata": {
        "additionalProperty": ""
      },
      "region_code": "US",
      "settings": null,
      "slug": "acme",
      "update_time": "2025-02-15T06:23:44.560000Z"
    }
  ],
  "prev_page_token": "<prev_page_token>",
  "total_size": 30
}
```

##### Status: 400 Invalid page token

###### Content-Type: application/json

**Example:**

```json
null
```

### Create an organization

- **Method:** `POST`
- **Path:** `/api/v1/organizations`
- **Tags:** Organizations

Creates a new organization in your environment. Use this endpoint to add a new tenant that can be configured with various settings and metadata

#### Request Body

##### Content-Type: application/json

- **`display_name` (required)**

  `string` — Name of the organization. Must be between 1 and 200 characters.

- **`external_id`**

  `string` — Your application's unique identifier for this organization, used to link Scalekit with your system.

- **`logo_url`**

  `string`, format: `uri` — HTTPS URL of the organization's logo image. Maximum 1024 characters. Must use the https scheme.

- **`metadata`**

  `object`

- **`slug`**

  `string` — Slug for dynamic redirect URI resolution. A single DNS label (e.g. acme) or hostname (e.g. oauth.pstmn.io). Lowercase alphanumeric, hyphens, and dots. Max 253 chars. Unique per environment.

**Example:**

```json
{
  "display_name": "Megasoft Inc",
  "external_id": "my_unique_id",
  "logo_url": "https://cdn.example.com/acme-logo.png",
  "metadata": {
    "additionalProperty": ""
  },
  "slug": "acme"
}
```

#### Responses

##### Status: 201 Returns the newly created organization with its unique identifier and settings

###### Content-Type: application/json

- **`organization`**

  `object` — The newly created organization containing its ID, settings, and metadata
  - **`create_time` (required)**

    `string`, format: `date-time` — Timestamp when the organization was created

  - **`display_name`**

    `string` — Name of the organization. Must be between 1 and 200 characters

  - **`external_id`**

    `string` — Your application's unique identifier for this organization, used to link Scalekit with your system.

  - **`id`**

    `string` — Unique scalekit-generated identifier that uniquely references an organization

  - **`logo_url`**

    `string`, format: `uri` — HTTPS URL of the organization's logo image. Maximum 1024 characters. Must use the https scheme.

  - **`metadata`**

    `object` — Key value pairs extension attributes.

  - **`region_code`**

    `string`, possible values: `"US", "EU"` — Geographic region code for the organization. Currently limited to US.

  - **`settings`**

    `object` — Configuration options that control organization-level features and capabilities
    - **`features`**

      `array` — List of feature toggles that control organization capabilities such as SSO authentication and directory synchronization

      **Items:**
      - **`enabled` (required)**

        `boolean` — Whether the feature is enabled (true) or disabled (false) for this organization

      - **`name` (required)**

        `string` — Feature identifier. Supported values include: "sso" (Single Sign-On), "directory_sync" (Directory Synchronization), "domain_verification" (Domain Verification), "session_policy" (Organization-level session policy override)

  - **`slug`**

    `string` — Slug for dynamic redirect URI resolution. A single DNS label (e.g. acme) or hostname (e.g. oauth.pstmn.io). Lowercase alphanumeric, hyphens, and dots. Max 253 chars. Unique per environment.

  - **`update_time`**

    `string`, format: `date-time` — Timestamp when the organization was last updated

**Example:**

```json
{
  "organization": {
    "create_time": "2025-02-15T06:23:44.560000Z",
    "display_name": "Megasoft",
    "external_id": "my_unique_id",
    "id": "org_59615193906282635",
    "logo_url": "https://cdn.example.com/acme-logo.png",
    "metadata": {
      "additionalProperty": ""
    },
    "region_code": "US",
    "settings": null,
    "slug": "acme",
    "update_time": "2025-02-15T06:23:44.560000Z"
  }
}
```

### Get organization details

- **Method:** `GET`
- **Path:** `/api/v1/organizations/{id}`
- **Tags:** Organizations

Retrieves organization details by Scalekit ID, including name, region, metadata, and settings

#### Responses

##### Status: 200 Returns the complete organization object with ID, display name, settings, and metadata

###### Content-Type: application/json

- **`organization`**

  `object` — The newly created organization
  - **`create_time` (required)**

    `string`, format: `date-time` — Timestamp when the organization was created

  - **`display_name`**

    `string` — Name of the organization. Must be between 1 and 200 characters

  - **`external_id`**

    `string` — Your application's unique identifier for this organization, used to link Scalekit with your system.

  - **`id`**

    `string` — Unique scalekit-generated identifier that uniquely references an organization

  - **`logo_url`**

    `string`, format: `uri` — HTTPS URL of the organization's logo image. Maximum 1024 characters. Must use the https scheme.

  - **`metadata`**

    `object` — Key value pairs extension attributes.

  - **`region_code`**

    `string`, possible values: `"US", "EU"` — Geographic region code for the organization. Currently limited to US.

  - **`settings`**

    `object` — Configuration options that control organization-level features and capabilities
    - **`features`**

      `array` — List of feature toggles that control organization capabilities such as SSO authentication and directory synchronization

      **Items:**
      - **`enabled` (required)**

        `boolean` — Whether the feature is enabled (true) or disabled (false) for this organization

      - **`name` (required)**

        `string` — Feature identifier. Supported values include: "sso" (Single Sign-On), "directory_sync" (Directory Synchronization), "domain_verification" (Domain Verification), "session_policy" (Organization-level session policy override)

  - **`slug`**

    `string` — Slug for dynamic redirect URI resolution. A single DNS label (e.g. acme) or hostname (e.g. oauth.pstmn.io). Lowercase alphanumeric, hyphens, and dots. Max 253 chars. Unique per environment.

  - **`update_time`**

    `string`, format: `date-time` — Timestamp when the organization was last updated

**Example:**

```json
{
  "organization": {
    "create_time": "2025-02-15T06:23:44.560000Z",
    "display_name": "Megasoft",
    "external_id": "my_unique_id",
    "id": "org_59615193906282635",
    "logo_url": "https://cdn.example.com/acme-logo.png",
    "metadata": {
      "additionalProperty": ""
    },
    "region_code": "US",
    "settings": null,
    "slug": "acme",
    "update_time": "2025-02-15T06:23:44.560000Z"
  }
}
```

### Delete an organization

- **Method:** `DELETE`
- **Path:** `/api/v1/organizations/{id}`
- **Tags:** Organizations

Remove an existing organization from the environment using its unique identifier

#### Responses

##### Status: 200 Organization successfully deleted and no longer accessible

###### Content-Type: application/json

**Example:**

```json
null
```

### Update organization details

- **Method:** `PATCH`
- **Path:** `/api/v1/organizations/{id}`
- **Tags:** Organizations

Updates an organization's display name, external ID, or metadata. Requires a valid organization identifier. Region code cannot be modified through this endpoint.

#### Request Body

##### Content-Type: application/json

- **`display_name`**

  `string` — Name of the organization to display in the UI. Must be between 1 and 200 characters

- **`external_id`**

  `string` — Your application's unique identifier for this organization, used to link Scalekit with your system

- **`logo_url`**

  `string`, format: `uri` — HTTPS URL of the organization's logo image. Maximum 1024 characters. Must use the https scheme.

- **`metadata`**

  `object` — Custom key-value pairs to store with the organization. Keys must be 3-25 characters, values must be 1-256 characters. Maximum 10 pairs allowed.

- **`slug`**

  `string` — Slug for dynamic redirect URI resolution. A single DNS label (e.g. acme) or hostname (e.g. oauth.pstmn.io). Lowercase alphanumeric, hyphens, and dots. Max 253 chars. Send empty string to clear.

**Example:**

```json
{
  "display_name": "Acme Corporation",
  "external_id": "tenant_12345",
  "logo_url": "https://cdn.example.com/acme-logo.png",
  "metadata": {
    "industry": "technology"
  },
  "slug": "acme"
}
```

#### Responses

##### Status: 200 Returns the updated organization with all current details reflected in the response.

###### Content-Type: application/json

- **`organization`**

  `object` — Updated organization details
  - **`create_time` (required)**

    `string`, format: `date-time` — Timestamp when the organization was created

  - **`display_name`**

    `string` — Name of the organization. Must be between 1 and 200 characters

  - **`external_id`**

    `string` — Your application's unique identifier for this organization, used to link Scalekit with your system.

  - **`id`**

    `string` — Unique scalekit-generated identifier that uniquely references an organization

  - **`logo_url`**

    `string`, format: `uri` — HTTPS URL of the organization's logo image. Maximum 1024 characters. Must use the https scheme.

  - **`metadata`**

    `object` — Key value pairs extension attributes.

  - **`region_code`**

    `string`, possible values: `"US", "EU"` — Geographic region code for the organization. Currently limited to US.

  - **`settings`**

    `object` — Configuration options that control organization-level features and capabilities
    - **`features`**

      `array` — List of feature toggles that control organization capabilities such as SSO authentication and directory synchronization

      **Items:**
      - **`enabled` (required)**

        `boolean` — Whether the feature is enabled (true) or disabled (false) for this organization

      - **`name` (required)**

        `string` — Feature identifier. Supported values include: "sso" (Single Sign-On), "directory_sync" (Directory Synchronization), "domain_verification" (Domain Verification), "session_policy" (Organization-level session policy override)

  - **`slug`**

    `string` — Slug for dynamic redirect URI resolution. A single DNS label (e.g. acme) or hostname (e.g. oauth.pstmn.io). Lowercase alphanumeric, hyphens, and dots. Max 253 chars. Unique per environment.

  - **`update_time`**

    `string`, format: `date-time` — Timestamp when the organization was last updated

**Example:**

```json
{
  "organization": {
    "create_time": "2025-02-15T06:23:44.560000Z",
    "display_name": "Megasoft",
    "external_id": "my_unique_id",
    "id": "org_59615193906282635",
    "logo_url": "https://cdn.example.com/acme-logo.png",
    "metadata": {
      "additionalProperty": ""
    },
    "region_code": "US",
    "settings": null,
    "slug": "acme",
    "update_time": "2025-02-15T06:23:44.560000Z"
  }
}
```

### Generate admin portal link

- **Method:** `PUT`
- **Path:** `/api/v1/organizations/{id}/portal_links`
- **Tags:** Organizations

Creates a single use Admin Portal URL valid for 1 minute. Once the generated admin portal URL is accessed or rendered, a temporary session of 6 hours is created to allow the admin to update SSO/SCIM configuration.

#### Responses

##### Status: 200 Admin Portal link generated successfully. Returns the portal URL and expiration timestamp.

###### Content-Type: application/json

- **`link`**

  `object` — Contains the generated admin portal link details. The link URL can be shared with organization administrators to set up: Single Sign-On (SSO) authentication and directory synchronization
  - **`expire_time`**

    `string`, format: `date-time` — Expiry time of the link. The link is valid for 1 minute.

  - **`id`**

    `string` — Unique Identifier for the link

  - **`location`**

    `string` — Location of the link. This is the URL that can be used to access the Admin portal. The link is valid for 1 minute

**Example:**

```json
{
  "link": {
    "expire_time": "2024-02-06T14:48:00Z",
    "id": "lnk_123123123123123",
    "location": "https://scalekit.com/portal/lnk_123123123123123"
  }
}
```

### Toggle organization settings

- **Method:** `PATCH`
- **Path:** `/api/v1/organizations/{id}/settings`
- **Tags:** Organizations

Updates configuration settings for an organization. Supports modifying SSO configuration, directory synchronization settings, and session parameters. Requires organization ID and the specific settings to update.

#### Request Body

##### Content-Type: application/json

- **`features`**

  `array` — List of feature toggles that control organization capabilities such as SSO authentication and directory synchronization

  **Items:**
  - **`enabled` (required)**

    `boolean` — Whether the feature is enabled (true) or disabled (false) for this organization

  - **`name` (required)**

    `string` — Feature identifier. Supported values include: "sso" (Single Sign-On), "directory_sync" (Directory Synchronization), "domain_verification" (Domain Verification), "session_policy" (Organization-level session policy override)

**Example:**

```json
{
  "features": [
    {
      "enabled": true,
      "name": "sso"
    },
    {
      "enabled": false,
      "name": "directory_sync"
    }
  ]
}
```

#### Responses

##### Status: 200 Returns the complete organization object with updated settings applied. Contains all organization details including ID, display name, and the modified settings.

###### Content-Type: application/json

- **`organization`**

  `object` — The newly created organization
  - **`create_time` (required)**

    `string`, format: `date-time` — Timestamp when the organization was created

  - **`display_name`**

    `string` — Name of the organization. Must be between 1 and 200 characters

  - **`external_id`**

    `string` — Your application's unique identifier for this organization, used to link Scalekit with your system.

  - **`id`**

    `string` — Unique scalekit-generated identifier that uniquely references an organization

  - **`logo_url`**

    `string`, format: `uri` — HTTPS URL of the organization's logo image. Maximum 1024 characters. Must use the https scheme.

  - **`metadata`**

    `object` — Key value pairs extension attributes.

  - **`region_code`**

    `string`, possible values: `"US", "EU"` — Geographic region code for the organization. Currently limited to US.

  - **`settings`**

    `object` — Configuration options that control organization-level features and capabilities
    - **`features`**

      `array` — List of feature toggles that control organization capabilities such as SSO authentication and directory synchronization

      **Items:**
      - **`enabled` (required)**

        `boolean` — Whether the feature is enabled (true) or disabled (false) for this organization

      - **`name` (required)**

        `string` — Feature identifier. Supported values include: "sso" (Single Sign-On), "directory_sync" (Directory Synchronization), "domain_verification" (Domain Verification), "session_policy" (Organization-level session policy override)

  - **`slug`**

    `string` — Slug for dynamic redirect URI resolution. A single DNS label (e.g. acme) or hostname (e.g. oauth.pstmn.io). Lowercase alphanumeric, hyphens, and dots. Max 253 chars. Unique per environment.

  - **`update_time`**

    `string`, format: `date-time` — Timestamp when the organization was last updated

**Example:**

```json
{
  "organization": {
    "create_time": "2025-02-15T06:23:44.560000Z",
    "display_name": "Megasoft",
    "external_id": "my_unique_id",
    "id": "org_59615193906282635",
    "logo_url": "https://cdn.example.com/acme-logo.png",
    "metadata": {
      "additionalProperty": ""
    },
    "region_code": "US",
    "settings": null,
    "slug": "acme",
    "update_time": "2025-02-15T06:23:44.560000Z"
  }
}
```

##### Status: 400 Invalid request - occurs when the settings payload contains invalid values or unsupported configuration

###### Content-Type: application/json

**Example:**

```json
null
```

##### Status: 404 Organization not found - the specified organization ID doesn't exist

###### Content-Type: application/json

**Example:**

```json
null
```

### List organization roles

- **Method:** `GET`
- **Path:** `/api/v1/organizations/{org_id}/roles`
- **Tags:** Roles

Retrieves all environment roles and organization specific roles. Use this endpoint to view all role definitions, including custom roles and their configurations. You can optionally include permission details for each role to understand their capabilities. This is useful for role management, auditing organization access controls, or understanding the available access levels within the organization.

#### Responses

##### Status: 200 Successfully retrieved list of organization roles. Returns all roles with their metadata and optionally their permissions.

###### Content-Type: application/json

- **`roles`**

  `array` — List of roles objects

  **Items:**
  - **`default_creator`**

    `boolean` — Indicates if this role is the default creator role for new organizations.

  - **`default_member`**

    `boolean` — Indicates if this role is the default member role for new users.

  - **`dependent_roles_count`**

    `integer`, format: `int32` — Number of roles that extend from this role (dependent roles count). Read-only field.

  - **`description`**

    `string` — Detailed description of the role's purpose and capabilities. Maximum 2000 characters.

  - **`display_name`**

    `string` — Human-readable display name for the role. Used in user interfaces and reports.

  - **`extends`**

    `string` — Name of the base role that this role extends. Enables hierarchical role inheritance.

  - **`id`**

    `string` — Unique system-generated identifier for the role. Immutable once created.

  - **`is_org_role`**

    `boolean` — Indicates if this role is an organization role.

  - **`name`**

    `string` — Unique name identifier for the role. Must be alphanumeric with underscores, 1-100 characters.

  - **`permissions`**

    `array` — List of permissions with role source information. Only included when 'include' parameter is specified in the request.

    **Items:**
    - **`create_time`**

      `string`, format: `date-time`

    - **`description`**

      `string`

    - **`id`**

      `string`

    - **`name`**

      `string`

    - **`role_name`**

      `string` — Name of the role from which this permission was sourced

    - **`update_time`**

      `string`, format: `date-time`

**Example:**

```json
{
  "roles": [
    {
      "default_creator": true,
      "default_member": true,
      "dependent_roles_count": 3,
      "description": "Can create, edit, and publish content but cannot delete or manage users",
      "display_name": "Content Editor",
      "extends": "admin_role",
      "id": "role_1234abcd5678efgh",
      "is_org_role": true,
      "name": "content_editor",
      "permissions": [
        {
          "description": "Read Content",
          "name": "read:content",
          "role_name": "admin_role"
        },
        {
          "description": "Write Content",
          "name": "write:content",
          "role_name": "editor_role"
        }
      ]
    }
  ]
}
```

### Create organization role

- **Method:** `POST`
- **Path:** `/api/v1/organizations/{org_id}/roles`
- **Tags:** Roles

Creates a new role within the specified organization with basic configuration including name, display name, description, and permissions. Use this endpoint to define custom roles that can be assigned to users within the organization. You can create hierarchical roles by extending existing roles and assign specific permissions to control access levels. The role will be scoped to the organization and can be used for organization-specific access control.

#### Request Body

##### Content-Type: application/json

- **`description`**

  `string` — Description of the organization's role

- **`display_name`**

  `string` — Display name of the organization's role

- **`extends`**

  `string` — Base role name for hierarchical roles

- **`name`**

  `string` — Unique name of the organization's role

- **`permissions`**

  `array` — List of permission names to assign to this role. Permissions must exist in the current environment.

  **Items:**

  `string`

**Example:**

```json
{
  "description": "Organization Viewer Role will be used only for viewing the objects",
  "display_name": "Organization Viewer Role",
  "extends": "admin_role",
  "name": "org_viewer_role",
  "permissions": ["read:users", "write:documents"]
}
```

#### Responses

##### Status: 201 Organization role created successfully. Returns the complete role object with system-generated ID and timestamps.

###### Content-Type: application/json

- **`role`**

  `object`
  - **`default_creator`**

    `boolean` — Indicates if this role is the default creator role for new organizations.

  - **`default_member`**

    `boolean` — Indicates if this role is the default member role for new users.

  - **`dependent_roles_count`**

    `integer`, format: `int32` — Number of roles that extend from this role (dependent roles count). Read-only field.

  - **`description`**

    `string` — Detailed description of the role's purpose and capabilities. Maximum 2000 characters.

  - **`display_name`**

    `string` — Human-readable display name for the role. Used in user interfaces and reports.

  - **`extends`**

    `string` — Name of the base role that this role extends. Enables hierarchical role inheritance.

  - **`id`**

    `string` — Unique system-generated identifier for the role. Immutable once created.

  - **`is_org_role`**

    `boolean` — Indicates if this role is an organization role.

  - **`name`**

    `string` — Unique name identifier for the role. Must be alphanumeric with underscores, 1-100 characters.

  - **`permissions`**

    `array` — List of permissions with role source information. Only included when 'include' parameter is specified in the request.

    **Items:**
    - **`create_time`**

      `string`, format: `date-time`

    - **`description`**

      `string`

    - **`id`**

      `string`

    - **`name`**

      `string`

    - **`role_name`**

      `string` — Name of the role from which this permission was sourced

    - **`update_time`**

      `string`, format: `date-time`

**Example:**

```json
{
  "role": {
    "default_creator": true,
    "default_member": true,
    "dependent_roles_count": 3,
    "description": "Can create, edit, and publish content but cannot delete or manage users",
    "display_name": "Content Editor",
    "extends": "admin_role",
    "id": "role_1234abcd5678efgh",
    "is_org_role": true,
    "name": "content_editor",
    "permissions": [
      {
        "description": "Read Content",
        "name": "read:content",
        "role_name": "admin_role"
      },
      {
        "description": "Write Content",
        "name": "write:content",
        "role_name": "editor_role"
      }
    ]
  }
}
```

### Get organization role details

- **Method:** `GET`
- **Path:** `/api/v1/organizations/{org_id}/roles/{role_name}`
- **Tags:** Roles

Retrieves complete information for a specific organization role including metadata, inheritance details, and optionally permissions. Use this endpoint to audit role configuration and understand the role's place in the organization's role hierarchy. You can include permission details to see what capabilities the role provides. This operation is useful for role management, user assignment decisions, or understanding organization access controls.

#### Responses

##### Status: 200 Successfully retrieved organization role details. Returns the role object including metadata and inheritance details. Permissions are included only when requested via the include parameter.

###### Content-Type: application/json

- **`role`**

  `object`
  - **`default_creator`**

    `boolean` — Indicates if this role is the default creator role for new organizations.

  - **`default_member`**

    `boolean` — Indicates if this role is the default member role for new users.

  - **`dependent_roles_count`**

    `integer`, format: `int32` — Number of roles that extend from this role (dependent roles count). Read-only field.

  - **`description`**

    `string` — Detailed description of the role's purpose and capabilities. Maximum 2000 characters.

  - **`display_name`**

    `string` — Human-readable display name for the role. Used in user interfaces and reports.

  - **`extends`**

    `string` — Name of the base role that this role extends. Enables hierarchical role inheritance.

  - **`id`**

    `string` — Unique system-generated identifier for the role. Immutable once created.

  - **`is_org_role`**

    `boolean` — Indicates if this role is an organization role.

  - **`name`**

    `string` — Unique name identifier for the role. Must be alphanumeric with underscores, 1-100 characters.

  - **`permissions`**

    `array` — List of permissions with role source information. Only included when 'include' parameter is specified in the request.

    **Items:**
    - **`create_time`**

      `string`, format: `date-time`

    - **`description`**

      `string`

    - **`id`**

      `string`

    - **`name`**

      `string`

    - **`role_name`**

      `string` — Name of the role from which this permission was sourced

    - **`update_time`**

      `string`, format: `date-time`

**Example:**

```json
{
  "role": {
    "default_creator": true,
    "default_member": true,
    "dependent_roles_count": 3,
    "description": "Can create, edit, and publish content but cannot delete or manage users",
    "display_name": "Content Editor",
    "extends": "admin_role",
    "id": "role_1234abcd5678efgh",
    "is_org_role": true,
    "name": "content_editor",
    "permissions": [
      {
        "description": "Read Content",
        "name": "read:content",
        "role_name": "admin_role"
      },
      {
        "description": "Write Content",
        "name": "write:content",
        "role_name": "editor_role"
      }
    ]
  }
}
```

### Update organization role

- **Method:** `PUT`
- **Path:** `/api/v1/organizations/{org_id}/roles/{role_name}`
- **Tags:** Roles

Modifies an existing organization role's properties including display name, description, permissions, and inheritance settings. Use this endpoint to update role metadata, change permission assignments, or modify role hierarchy within the organization. Only the fields you specify will be updated, leaving other properties unchanged. When updating permissions, the new list replaces all existing permissions for the role.

#### Request Body

##### Content-Type: application/json

- **`description`**

  `string` — Detailed description of the role's purpose, capabilities, and intended use cases. Maximum 2000 characters.

- **`display_name`**

  `string` — Human-readable display name for the role. Used in user interfaces, reports, and user-facing communications.

- **`extends`**

  `string` — Name of the base role that this role extends. Enables hierarchical role inheritance where this role inherits all permissions from the base role.

- **`permissions`**

  `array` — List of permission names to assign to this role. When provided, this replaces all existing role-permission mappings. Permissions must exist in the current environment. Maximum 100 permissions per role.

  **Items:**

  `string`

**Example:**

```json
{
  "description": "Can create, edit, publish, and approve content. Cannot delete content or manage user accounts.",
  "display_name": "Senior Content Editor",
  "extends": "content_editor",
  "permissions": ["read:content", "write:content", "publish:content", "approve:content"]
}
```

#### Responses

##### Status: 200 Organization role updated successfully. Returns the modified role object with updated timestamps.

###### Content-Type: application/json

- **`role`**

  `object`
  - **`default_creator`**

    `boolean` — Indicates if this role is the default creator role for new organizations.

  - **`default_member`**

    `boolean` — Indicates if this role is the default member role for new users.

  - **`dependent_roles_count`**

    `integer`, format: `int32` — Number of roles that extend from this role (dependent roles count). Read-only field.

  - **`description`**

    `string` — Detailed description of the role's purpose and capabilities. Maximum 2000 characters.

  - **`display_name`**

    `string` — Human-readable display name for the role. Used in user interfaces and reports.

  - **`extends`**

    `string` — Name of the base role that this role extends. Enables hierarchical role inheritance.

  - **`id`**

    `string` — Unique system-generated identifier for the role. Immutable once created.

  - **`is_org_role`**

    `boolean` — Indicates if this role is an organization role.

  - **`name`**

    `string` — Unique name identifier for the role. Must be alphanumeric with underscores, 1-100 characters.

  - **`permissions`**

    `array` — List of permissions with role source information. Only included when 'include' parameter is specified in the request.

    **Items:**
    - **`create_time`**

      `string`, format: `date-time`

    - **`description`**

      `string`

    - **`id`**

      `string`

    - **`name`**

      `string`

    - **`role_name`**

      `string` — Name of the role from which this permission was sourced

    - **`update_time`**

      `string`, format: `date-time`

**Example:**

```json
{
  "role": {
    "default_creator": true,
    "default_member": true,
    "dependent_roles_count": 3,
    "description": "Can create, edit, and publish content but cannot delete or manage users",
    "display_name": "Content Editor",
    "extends": "admin_role",
    "id": "role_1234abcd5678efgh",
    "is_org_role": true,
    "name": "content_editor",
    "permissions": [
      {
        "description": "Read Content",
        "name": "read:content",
        "role_name": "admin_role"
      },
      {
        "description": "Write Content",
        "name": "write:content",
        "role_name": "editor_role"
      }
    ]
  }
}
```

### Delete organization role

- **Method:** `DELETE`
- **Path:** `/api/v1/organizations/{org_id}/roles/{role_name}`
- **Tags:** Roles

Permanently removes a role from the organization and optionally reassigns users who had that role to a different role. Use this endpoint when you need to clean up unused roles or restructure your organization's access control system. If users are assigned to the role being deleted, you can provide a reassign_role_name to move those users to a different role before deletion. This action cannot be undone, so ensure no critical users depend on the role before deletion.

#### Responses

##### Status: 200 Organization role successfully deleted and users reassigned if specified. No content returned.

###### Content-Type: application/json

**Example:**

```json
null
```

### Set default organization roles

- **Method:** `PATCH`
- **Path:** `/api/v1/organizations/{org_id}/roles:set_defaults`
- **Tags:** Roles

Updates the default member role for the specified organization. Use this endpoint to configure which role is automatically assigned to new users when they join the organization. The system will validate that the specified role exists and update the organization settings accordingly. This configuration affects all new user invitations and memberships within the organization.

#### Request Body

##### Content-Type: application/json

- **`default_member_role`**

  `string` — Unique name of the default member role

**Example:**

```json
{
  "default_member_role": "member"
}
```

#### Responses

##### Status: 200 Default organization roles updated successfully. Returns the updated default member role object with complete role information.

###### Content-Type: application/json

- **`default_member`**

  `object` — Updated default member role
  - **`default_creator`**

    `boolean` — Indicates if this role is the default creator role for new organizations.

  - **`default_member`**

    `boolean` — Indicates if this role is the default member role for new users.

  - **`dependent_roles_count`**

    `integer`, format: `int32` — Number of roles that extend from this role (dependent roles count). Read-only field.

  - **`description`**

    `string` — Detailed description of the role's purpose and capabilities. Maximum 2000 characters.

  - **`display_name`**

    `string` — Human-readable display name for the role. Used in user interfaces and reports.

  - **`extends`**

    `string` — Name of the base role that this role extends. Enables hierarchical role inheritance.

  - **`id`**

    `string` — Unique system-generated identifier for the role. Immutable once created.

  - **`is_org_role`**

    `boolean` — Indicates if this role is an organization role.

  - **`name`**

    `string` — Unique name identifier for the role. Must be alphanumeric with underscores, 1-100 characters.

  - **`permissions`**

    `array` — List of permissions with role source information. Only included when 'include' parameter is specified in the request.

    **Items:**
    - **`create_time`**

      `string`, format: `date-time`

    - **`description`**

      `string`

    - **`id`**

      `string`

    - **`name`**

      `string`

    - **`role_name`**

      `string` — Name of the role from which this permission was sourced

    - **`update_time`**

      `string`, format: `date-time`

**Example:**

```json
{
  "default_member": {
    "description": "Role for regular members",
    "display_name": "Member Role",
    "id": "role_0987654321",
    "name": "member"
  }
}
```

### List organization API clients

- **Method:** `GET`
- **Path:** `/api/v1/organizations/{organization_id}/clients`
- **Tags:** API Auth

Retrieves a paginated list of API clients for a specific organization. Returns client details including metadata, scopes, and secret information (without exposing actual secret values).

#### Responses

##### Status: 200 List of organization API clients returned successfully. Each client includes its configuration details and metadata.

###### Content-Type: application/json

- **`clients`**

  `array` — List of API client objects for the organization. Each client includes its configuration, metadata, and active secrets (without exposing actual secret values).

  **Items:**
  - **`audience`**

    `array` — The intended recipients of access tokens issued to this client. Each audience value should be a URI that identifies an API or service.

    **Items:**

    `string`

  - **`client_id`**

    `string` — The unique identifier for this API client. This ID is used to identify the client in API requests and logs. It is automatically generated when the client is created and cannot be modified.

  - **`create_time`**

    `string`, format: `date-time` — The timestamp when this API client was created. This field is automatically set by the server and cannot be modified.

  - **`custom_claims`**

    `array` — Additional claims included in access tokens issued to this client. These claims provide context about the client and can be used for authorization decisions.

    **Items:**
    - **`key`**

      `string` — The name of the custom claim. Must be between 1 and 128 characters. Use descriptive names that clearly indicate the claim's purpose.

    - **`value`**

      `string` — The value of the custom claim. This value will be included in access tokens issued to the client.

  - **`description`**

    `string` — A detailed description of the client's purpose and usage. This helps administrators understand what the client is used for.

  - **`expiry`**

    `string`, format: `int64` — Expiry time in seconds for the token generated by the client

  - **`is_cimd`**

    `boolean` — Indicates if the client was created via Client ID Metadata Document (CIMD). CIMD clients can update their own configuration according to the CIMD specification.

  - **`is_dcr`**

    `boolean` — Indicates if the client was created via Dynamic Client Registration (DCR). Clients created through DCR may have different management and lifecycle policies compared to those created manually.

  - **`metadata_uri`**

    `string` — The URI to the client's metadata, which is utilized to obtain the client's configuration details

  - **`name`**

    `string` — The display name of the API client. This name helps identify the client in the dashboard and logs.

  - **`organization_id`**

    `string` — The ID of the organization that owns this API client. This ID is used to associate the client with the correct organization and enforce organization-specific access controls.

  - **`redirect_uris`**

    `array` — The redirect URI for this API client. This URI is used in the OAuth 2.0 authorization flow to redirect users after authentication.

    **Items:**

    `string`

  - **`resource_id`**

    `string` — The ID of the resource associated with this M2M client. This field is used to link the client to a specific resource in the system.

  - **`scopes`**

    `array` — The OAuth 2.0 scopes granted to this client. These scopes determine what resources and actions the client can access.

    **Items:**

    `string`

  - **`secrets`**

    `array` — List of client secrets associated with this client. Each secret can be used for authentication, but only the most recently created secret is typically active. Secrets are stored securely and their values are never returned after creation.

    **Items:**
    - **`create_time`**

      `string`, format: `date-time` — The timestamp when this secret was created. This field is automatically set by the server and cannot be modified.

    - **`created_by`**

      `string` — The identifier of the user or system that created this secret. This field helps track who created the secret for audit and compliance purposes.

    - **`expire_time`**

      `string`, format: `date-time` — The timestamp when this secret will expire. After this time, the secret cannot be used for authentication regardless of its status. If not set, the secret does not expire.

    - **`id`**

      `string` — The unique identifier for this client secret. This ID is used to reference the secret in API requests for management operations like updating or deleting the secret.

    - **`last_used_time`**

      `string`, format: `date-time` — The timestamp when this secret was last used for authentication. This field helps track secret usage for security monitoring and identifying unused secrets that may be candidates for rotation.

    - **`plain_secret`**

      `string` — The full plaintext secret value. This field is only populated when the secret is first created and is never stored by the server. It must be securely stored by the client application as it cannot be retrieved again.

    - **`secret_suffix`**

      `string` — A suffix that helps identify this secret. This is the last few characters of the full secret value but is not sufficient for authentication. Helps identify which secret is being used in logs and debugging.

    - **`status`**

      `string`, possible values: `"INACTIVE"` — The current status of this secret. A secret must be ACTIVE to be used for authentication. INACTIVE secrets cannot be used for authentication but are retained for audit purposes.

    - **`update_time`**

      `string`, format: `date-time` — The timestamp when this secret was last updated. This field is automatically updated by the server when the secret's status changes or other properties are modified.

  - **`update_time`**

    `string`, format: `date-time` — The timestamp when this API client was last updated. This field is automatically updated by the server whenever the client's configuration changes.

- **`next_page_token`**

  `string` — Pagination token for the next page of results. Use this token to fetch the next page.

- **`prev_page_token`**

  `string` — Pagination token for the previous page of results. Use this token to fetch the previous page.

- **`total_size`**

  `integer`, format: `int64` — Total number of API clients in the organization.

**Example:**

```json
{
  "clients": [
    {
      "audience": ["https://api.example.com"],
      "client_id": "m2morg_1231234233424344",
      "create_time": "2024-01-05T14:48:00Z",
      "custom_claims": [{}],
      "description": "Service account for automated deployment processes",
      "expiry": 3600,
      "is_cimd": false,
      "is_dcr": false,
      "metadata_uri": "https://example.com/client-metadata.json",
      "name": "GitHub Actions Deployment Service",
      "organization_id": "org_1231234233424344",
      "redirect_uris": ["https://example.com/callback"],
      "resource_id": "app_1231234233424344",
      "scopes": ["deploy:resources", "read:deployments"],
      "secrets": [{}],
      "update_time": "2024-01-05T14:48:00Z"
    }
  ],
  "next_page_token": "<next_page_token>",
  "prev_page_token": "<prev_page_token>",
  "total_size": 30
}
```

### Create organization API client

- **Method:** `POST`
- **Path:** `/api/v1/organizations/{organization_id}/clients`
- **Tags:** API Auth

Creates a new API client for an organization. Returns the client details and a plain secret (available only once).

#### Request Body

##### Content-Type: application/json

- **`audience`**

  `array` — The intended recipients of the access tokens issued to this client. Each audience value should be a URI that identifies the API or service that will validate the token.

  **Items:**

  `string`

- **`custom_claims`**

  `array` — Additional claims to be included in access tokens issued to this client. These claims provide context about the client and can be used for authorization decisions. Keep claims minimal to avoid increasing token size.

  **Items:**
  - **`key`**

    `string` — The name of the custom claim. Must be between 1 and 128 characters. Use descriptive names that clearly indicate the claim's purpose.

  - **`value`**

    `string` — The value of the custom claim. This value will be included in access tokens issued to the client.

- **`description`**

  `string` — A detailed explanation of the client's purpose and usage. This helps administrators understand what the client is used for and who manages it.

- **`expiry`**

  `string`, format: `int64` — Expiry time in seconds for the token generated by the client

- **`name`**

  `string` — A descriptive name for the API client that helps identify its purpose. This name is displayed in the dashboard and logs. Must be between 1 and 128 characters.

- **`scopes`**

  `array` — OAuth 2.0 scopes that define the permissions granted to this client. Each scope represents a specific permission or set of permissions. The client can only access resources that match its granted scopes.

  **Items:**

  `string`

**Example:**

```json
{
  "audience": ["https://api.example.com/api/analytics", "https://deployment-api.acmecorp.com"],
  "custom_claims": [
    {
      "key": "environment",
      "value": "production"
    },
    {
      "key": "service",
      "value": "deployment"
    }
  ],
  "description": "Service account for GitHub Actions to deploy resources to production",
  "expiry": 3600,
  "name": "GitHub Actions Deployment Service",
  "scopes": ["deploy:resources", "read:deployments"]
}
```

#### Responses

##### Status: 201 API client created successfully. Returns the client ID and plain secret (only available at creation time). The client can be configured with scopes, audience values, and custom claims for fine-grained access control.

###### Content-Type: application/json

- **`client`**

  `object` — Details of the created client
  - **`audience`**

    `array` — The intended recipients of access tokens issued to this client. Each audience value should be a URI that identifies an API or service.

    **Items:**

    `string`

  - **`client_id`**

    `string` — The unique identifier for this API client. This ID is used to identify the client in API requests and logs. It is automatically generated when the client is created and cannot be modified.

  - **`create_time`**

    `string`, format: `date-time` — The timestamp when this API client was created. This field is automatically set by the server and cannot be modified.

  - **`custom_claims`**

    `array` — Additional claims included in access tokens issued to this client. These claims provide context about the client and can be used for authorization decisions.

    **Items:**
    - **`key`**

      `string` — The name of the custom claim. Must be between 1 and 128 characters. Use descriptive names that clearly indicate the claim's purpose.

    - **`value`**

      `string` — The value of the custom claim. This value will be included in access tokens issued to the client.

  - **`description`**

    `string` — A detailed description of the client's purpose and usage. This helps administrators understand what the client is used for.

  - **`expiry`**

    `string`, format: `int64` — Expiry time in seconds for the token generated by the client

  - **`is_cimd`**

    `boolean` — Indicates if the client was created via Client ID Metadata Document (CIMD). CIMD clients can update their own configuration according to the CIMD specification.

  - **`is_dcr`**

    `boolean` — Indicates if the client was created via Dynamic Client Registration (DCR). Clients created through DCR may have different management and lifecycle policies compared to those created manually.

  - **`metadata_uri`**

    `string` — The URI to the client's metadata, which is utilized to obtain the client's configuration details

  - **`name`**

    `string` — The display name of the API client. This name helps identify the client in the dashboard and logs.

  - **`organization_id`**

    `string` — The ID of the organization that owns this API client. This ID is used to associate the client with the correct organization and enforce organization-specific access controls.

  - **`redirect_uris`**

    `array` — The redirect URI for this API client. This URI is used in the OAuth 2.0 authorization flow to redirect users after authentication.

    **Items:**

    `string`

  - **`resource_id`**

    `string` — The ID of the resource associated with this M2M client. This field is used to link the client to a specific resource in the system.

  - **`scopes`**

    `array` — The OAuth 2.0 scopes granted to this client. These scopes determine what resources and actions the client can access.

    **Items:**

    `string`

  - **`secrets`**

    `array` — List of client secrets associated with this client. Each secret can be used for authentication, but only the most recently created secret is typically active. Secrets are stored securely and their values are never returned after creation.

    **Items:**
    - **`create_time`**

      `string`, format: `date-time` — The timestamp when this secret was created. This field is automatically set by the server and cannot be modified.

    - **`created_by`**

      `string` — The identifier of the user or system that created this secret. This field helps track who created the secret for audit and compliance purposes.

    - **`expire_time`**

      `string`, format: `date-time` — The timestamp when this secret will expire. After this time, the secret cannot be used for authentication regardless of its status. If not set, the secret does not expire.

    - **`id`**

      `string` — The unique identifier for this client secret. This ID is used to reference the secret in API requests for management operations like updating or deleting the secret.

    - **`last_used_time`**

      `string`, format: `date-time` — The timestamp when this secret was last used for authentication. This field helps track secret usage for security monitoring and identifying unused secrets that may be candidates for rotation.

    - **`plain_secret`**

      `string` — The full plaintext secret value. This field is only populated when the secret is first created and is never stored by the server. It must be securely stored by the client application as it cannot be retrieved again.

    - **`secret_suffix`**

      `string` — A suffix that helps identify this secret. This is the last few characters of the full secret value but is not sufficient for authentication. Helps identify which secret is being used in logs and debugging.

    - **`status`**

      `string`, possible values: `"INACTIVE"` — The current status of this secret. A secret must be ACTIVE to be used for authentication. INACTIVE secrets cannot be used for authentication but are retained for audit purposes.

    - **`update_time`**

      `string`, format: `date-time` — The timestamp when this secret was last updated. This field is automatically updated by the server when the secret's status changes or other properties are modified.

  - **`update_time`**

    `string`, format: `date-time` — The timestamp when this API client was last updated. This field is automatically updated by the server whenever the client's configuration changes.

- **`plain_secret`**

  `string` — Client secret value (only returned once at creation)

**Example:**

```json
{
  "client": {
    "audience": ["https://api.example.com"],
    "client_id": "m2morg_1231234233424344",
    "create_time": "2024-01-05T14:48:00Z",
    "custom_claims": [{}],
    "description": "Service account for automated deployment processes",
    "expiry": 3600,
    "is_cimd": false,
    "is_dcr": false,
    "metadata_uri": "https://example.com/client-metadata.json",
    "name": "GitHub Actions Deployment Service",
    "organization_id": "org_1231234233424344",
    "redirect_uris": ["https://example.com/callback"],
    "resource_id": "app_1231234233424344",
    "scopes": ["deploy:resources", "read:deployments"],
    "secrets": [{}],
    "update_time": "2024-01-05T14:48:00Z"
  },
  "plain_secret": "CdExsdErfccxDDssddfffgfeFHH1"
}
```

### Get organization API client

- **Method:** `GET`
- **Path:** `/api/v1/organizations/{organization_id}/clients/{client_id}`
- **Tags:** API Auth

Retrieves details of a specific API client in an organization.

#### Responses

##### Status: 200 Returns the complete API client configuration, including all current settings and a list of active secrets. Note that secret values are not included in the response for security reasons.

###### Content-Type: application/json

- **`client`**

  `object` — Details of the requested client
  - **`audience`**

    `array` — The intended recipients of access tokens issued to this client. Each audience value should be a URI that identifies an API or service.

    **Items:**

    `string`

  - **`client_id`**

    `string` — The unique identifier for this API client. This ID is used to identify the client in API requests and logs. It is automatically generated when the client is created and cannot be modified.

  - **`create_time`**

    `string`, format: `date-time` — The timestamp when this API client was created. This field is automatically set by the server and cannot be modified.

  - **`custom_claims`**

    `array` — Additional claims included in access tokens issued to this client. These claims provide context about the client and can be used for authorization decisions.

    **Items:**
    - **`key`**

      `string` — The name of the custom claim. Must be between 1 and 128 characters. Use descriptive names that clearly indicate the claim's purpose.

    - **`value`**

      `string` — The value of the custom claim. This value will be included in access tokens issued to the client.

  - **`description`**

    `string` — A detailed description of the client's purpose and usage. This helps administrators understand what the client is used for.

  - **`expiry`**

    `string`, format: `int64` — Expiry time in seconds for the token generated by the client

  - **`is_cimd`**

    `boolean` — Indicates if the client was created via Client ID Metadata Document (CIMD). CIMD clients can update their own configuration according to the CIMD specification.

  - **`is_dcr`**

    `boolean` — Indicates if the client was created via Dynamic Client Registration (DCR). Clients created through DCR may have different management and lifecycle policies compared to those created manually.

  - **`metadata_uri`**

    `string` — The URI to the client's metadata, which is utilized to obtain the client's configuration details

  - **`name`**

    `string` — The display name of the API client. This name helps identify the client in the dashboard and logs.

  - **`organization_id`**

    `string` — The ID of the organization that owns this API client. This ID is used to associate the client with the correct organization and enforce organization-specific access controls.

  - **`redirect_uris`**

    `array` — The redirect URI for this API client. This URI is used in the OAuth 2.0 authorization flow to redirect users after authentication.

    **Items:**

    `string`

  - **`resource_id`**

    `string` — The ID of the resource associated with this M2M client. This field is used to link the client to a specific resource in the system.

  - **`scopes`**

    `array` — The OAuth 2.0 scopes granted to this client. These scopes determine what resources and actions the client can access.

    **Items:**

    `string`

  - **`secrets`**

    `array` — List of client secrets associated with this client. Each secret can be used for authentication, but only the most recently created secret is typically active. Secrets are stored securely and their values are never returned after creation.

    **Items:**
    - **`create_time`**

      `string`, format: `date-time` — The timestamp when this secret was created. This field is automatically set by the server and cannot be modified.

    - **`created_by`**

      `string` — The identifier of the user or system that created this secret. This field helps track who created the secret for audit and compliance purposes.

    - **`expire_time`**

      `string`, format: `date-time` — The timestamp when this secret will expire. After this time, the secret cannot be used for authentication regardless of its status. If not set, the secret does not expire.

    - **`id`**

      `string` — The unique identifier for this client secret. This ID is used to reference the secret in API requests for management operations like updating or deleting the secret.

    - **`last_used_time`**

      `string`, format: `date-time` — The timestamp when this secret was last used for authentication. This field helps track secret usage for security monitoring and identifying unused secrets that may be candidates for rotation.

    - **`plain_secret`**

      `string` — The full plaintext secret value. This field is only populated when the secret is first created and is never stored by the server. It must be securely stored by the client application as it cannot be retrieved again.

    - **`secret_suffix`**

      `string` — A suffix that helps identify this secret. This is the last few characters of the full secret value but is not sufficient for authentication. Helps identify which secret is being used in logs and debugging.

    - **`status`**

      `string`, possible values: `"INACTIVE"` — The current status of this secret. A secret must be ACTIVE to be used for authentication. INACTIVE secrets cannot be used for authentication but are retained for audit purposes.

    - **`update_time`**

      `string`, format: `date-time` — The timestamp when this secret was last updated. This field is automatically updated by the server when the secret's status changes or other properties are modified.

  - **`update_time`**

    `string`, format: `date-time` — The timestamp when this API client was last updated. This field is automatically updated by the server whenever the client's configuration changes.

**Example:**

```json
{
  "client": {
    "audience": ["https://api.example.com"],
    "client_id": "m2morg_1231234233424344",
    "create_time": "2024-01-05T14:48:00Z",
    "custom_claims": [{}],
    "description": "Service account for automated deployment processes",
    "expiry": 3600,
    "is_cimd": false,
    "is_dcr": false,
    "metadata_uri": "https://example.com/client-metadata.json",
    "name": "GitHub Actions Deployment Service",
    "organization_id": "org_1231234233424344",
    "redirect_uris": ["https://example.com/callback"],
    "resource_id": "app_1231234233424344",
    "scopes": ["deploy:resources", "read:deployments"],
    "secrets": [{}],
    "update_time": "2024-01-05T14:48:00Z"
  }
}
```

### Delete organization API client

- **Method:** `DELETE`
- **Path:** `/api/v1/organizations/{organization_id}/clients/{client_id}`
- **Tags:** API Auth

Permanently deletes an API client from an organization. This operation cannot be undone and will revoke all access for the client. All associated secrets will also be invalidated. Use this endpoint to remove unused or compromised clients.

#### Responses

##### Status: 200 Organization API client successfully deleted and no longer accessible

###### Content-Type: application/json

**Example:**

```json
null
```

### Update organization API client

- **Method:** `PATCH`
- **Path:** `/api/v1/organizations/{organization_id}/clients/{client_id}`
- **Tags:** API Auth

Updates an existing organization API client. Only specified fields are modified.

#### Request Body

##### Content-Type: application/json

- **`audience`**

  `array` — The intended recipients of the access tokens issued to this client. Each audience value should be a URI that identifies the API or service that will validate the token.

  **Items:**

  `string`

- **`custom_claims`**

  `array` — Additional claims to be included in access tokens issued to this client. These claims provide context about the client and can be used for authorization decisions. Keep claims minimal to avoid increasing token size.

  **Items:**
  - **`key`**

    `string` — The name of the custom claim. Must be between 1 and 128 characters. Use descriptive names that clearly indicate the claim's purpose.

  - **`value`**

    `string` — The value of the custom claim. This value will be included in access tokens issued to the client.

- **`description`**

  `string` — A detailed explanation of the client's purpose and usage. This helps administrators understand what the client is used for and who manages it.

- **`expiry`**

  `string`, format: `int64` — Expiry time in seconds for the token generated by the client

- **`name`**

  `string` — A descriptive name for the API client that helps identify its purpose. This name is displayed in the dashboard and logs. Must be between 1 and 128 characters.

- **`scopes`**

  `array` — OAuth 2.0 scopes that define the permissions granted to this client. Each scope represents a specific permission or set of permissions. The client can only access resources that match its granted scopes.

  **Items:**

  `string`

**Example:**

```json
{
  "audience": ["https://api.example.com/api/analytics", "https://deployment-api.acmecorp.com"],
  "custom_claims": [
    {
      "key": "environment",
      "value": "production"
    },
    {
      "key": "service",
      "value": "deployment"
    }
  ],
  "description": "Service account for GitHub Actions to deploy resources to production",
  "expiry": 3600,
  "name": "GitHub Actions Deployment Service",
  "scopes": ["deploy:resources", "read:deployments"]
}
```

#### Responses

##### Status: 200 Returns the updated organization API client with all current details reflected in the response, including modified scopes, audience values, and custom claims.

###### Content-Type: application/json

- **`client`**

  `object` — Updated details of the client
  - **`audience`**

    `array` — The intended recipients of access tokens issued to this client. Each audience value should be a URI that identifies an API or service.

    **Items:**

    `string`

  - **`client_id`**

    `string` — The unique identifier for this API client. This ID is used to identify the client in API requests and logs. It is automatically generated when the client is created and cannot be modified.

  - **`create_time`**

    `string`, format: `date-time` — The timestamp when this API client was created. This field is automatically set by the server and cannot be modified.

  - **`custom_claims`**

    `array` — Additional claims included in access tokens issued to this client. These claims provide context about the client and can be used for authorization decisions.

    **Items:**
    - **`key`**

      `string` — The name of the custom claim. Must be between 1 and 128 characters. Use descriptive names that clearly indicate the claim's purpose.

    - **`value`**

      `string` — The value of the custom claim. This value will be included in access tokens issued to the client.

  - **`description`**

    `string` — A detailed description of the client's purpose and usage. This helps administrators understand what the client is used for.

  - **`expiry`**

    `string`, format: `int64` — Expiry time in seconds for the token generated by the client

  - **`is_cimd`**

    `boolean` — Indicates if the client was created via Client ID Metadata Document (CIMD). CIMD clients can update their own configuration according to the CIMD specification.

  - **`is_dcr`**

    `boolean` — Indicates if the client was created via Dynamic Client Registration (DCR). Clients created through DCR may have different management and lifecycle policies compared to those created manually.

  - **`metadata_uri`**

    `string` — The URI to the client's metadata, which is utilized to obtain the client's configuration details

  - **`name`**

    `string` — The display name of the API client. This name helps identify the client in the dashboard and logs.

  - **`organization_id`**

    `string` — The ID of the organization that owns this API client. This ID is used to associate the client with the correct organization and enforce organization-specific access controls.

  - **`redirect_uris`**

    `array` — The redirect URI for this API client. This URI is used in the OAuth 2.0 authorization flow to redirect users after authentication.

    **Items:**

    `string`

  - **`resource_id`**

    `string` — The ID of the resource associated with this M2M client. This field is used to link the client to a specific resource in the system.

  - **`scopes`**

    `array` — The OAuth 2.0 scopes granted to this client. These scopes determine what resources and actions the client can access.

    **Items:**

    `string`

  - **`secrets`**

    `array` — List of client secrets associated with this client. Each secret can be used for authentication, but only the most recently created secret is typically active. Secrets are stored securely and their values are never returned after creation.

    **Items:**
    - **`create_time`**

      `string`, format: `date-time` — The timestamp when this secret was created. This field is automatically set by the server and cannot be modified.

    - **`created_by`**

      `string` — The identifier of the user or system that created this secret. This field helps track who created the secret for audit and compliance purposes.

    - **`expire_time`**

      `string`, format: `date-time` — The timestamp when this secret will expire. After this time, the secret cannot be used for authentication regardless of its status. If not set, the secret does not expire.

    - **`id`**

      `string` — The unique identifier for this client secret. This ID is used to reference the secret in API requests for management operations like updating or deleting the secret.

    - **`last_used_time`**

      `string`, format: `date-time` — The timestamp when this secret was last used for authentication. This field helps track secret usage for security monitoring and identifying unused secrets that may be candidates for rotation.

    - **`plain_secret`**

      `string` — The full plaintext secret value. This field is only populated when the secret is first created and is never stored by the server. It must be securely stored by the client application as it cannot be retrieved again.

    - **`secret_suffix`**

      `string` — A suffix that helps identify this secret. This is the last few characters of the full secret value but is not sufficient for authentication. Helps identify which secret is being used in logs and debugging.

    - **`status`**

      `string`, possible values: `"INACTIVE"` — The current status of this secret. A secret must be ACTIVE to be used for authentication. INACTIVE secrets cannot be used for authentication but are retained for audit purposes.

    - **`update_time`**

      `string`, format: `date-time` — The timestamp when this secret was last updated. This field is automatically updated by the server when the secret's status changes or other properties are modified.

  - **`update_time`**

    `string`, format: `date-time` — The timestamp when this API client was last updated. This field is automatically updated by the server whenever the client's configuration changes.

**Example:**

```json
{
  "client": {
    "audience": ["https://api.example.com"],
    "client_id": "m2morg_1231234233424344",
    "create_time": "2024-01-05T14:48:00Z",
    "custom_claims": [{}],
    "description": "Service account for automated deployment processes",
    "expiry": 3600,
    "is_cimd": false,
    "is_dcr": false,
    "metadata_uri": "https://example.com/client-metadata.json",
    "name": "GitHub Actions Deployment Service",
    "organization_id": "org_1231234233424344",
    "redirect_uris": ["https://example.com/callback"],
    "resource_id": "app_1231234233424344",
    "scopes": ["deploy:resources", "read:deployments"],
    "secrets": [{}],
    "update_time": "2024-01-05T14:48:00Z"
  }
}
```

### Create organization API client secret

- **Method:** `POST`
- **Path:** `/api/v1/organizations/{organization_id}/clients/{client_id}/secrets`
- **Tags:** API Auth

Creates a new secret for an organization API client. Returns the plain secret (available only once).

#### Responses

##### Status: 201 Client secret created successfully. Returns the new secret ID and the plain secret value (only available at creation time). The secret can be used immediately for authentication.

###### Content-Type: application/json

- **`plain_secret`**

  `string` — Client secret value (only returned once at creation)

- **`secret`**

  `object` — Details of the created client secret
  - **`create_time`**

    `string`, format: `date-time` — The timestamp when this secret was created. This field is automatically set by the server and cannot be modified.

  - **`created_by`**

    `string` — The identifier of the user or system that created this secret. This field helps track who created the secret for audit and compliance purposes.

  - **`expire_time`**

    `string`, format: `date-time` — The timestamp when this secret will expire. After this time, the secret cannot be used for authentication regardless of its status. If not set, the secret does not expire.

  - **`id`**

    `string` — The unique identifier for this client secret. This ID is used to reference the secret in API requests for management operations like updating or deleting the secret.

  - **`last_used_time`**

    `string`, format: `date-time` — The timestamp when this secret was last used for authentication. This field helps track secret usage for security monitoring and identifying unused secrets that may be candidates for rotation.

  - **`plain_secret`**

    `string` — The full plaintext secret value. This field is only populated when the secret is first created and is never stored by the server. It must be securely stored by the client application as it cannot be retrieved again.

  - **`secret_suffix`**

    `string` — A suffix that helps identify this secret. This is the last few characters of the full secret value but is not sufficient for authentication. Helps identify which secret is being used in logs and debugging.

  - **`status`**

    `string`, possible values: `"INACTIVE"` — The current status of this secret. A secret must be ACTIVE to be used for authentication. INACTIVE secrets cannot be used for authentication but are retained for audit purposes.

  - **`update_time`**

    `string`, format: `date-time` — The timestamp when this secret was last updated. This field is automatically updated by the server when the secret's status changes or other properties are modified.

**Example:**

```json
{
  "plain_secret": "m2morg_client_secret_xyz123",
  "secret": {
    "create_time": "2024-01-05T14:48:00Z",
    "created_by": "user_12345",
    "expire_time": "2025-01-05T14:48:00Z",
    "id": "sec_1234abcd5678efgh",
    "last_used_time": "2024-02-15T10:30:00Z",
    "plain_secret": "sec_1234567890abcdefghijklmnopqrstuvwxyz",
    "secret_suffix": "xyzw",
    "status": "INACTIVE",
    "update_time": "2024-01-10T09:12:00Z"
  }
}
```

### Delete organization API client secret

- **Method:** `DELETE`
- **Path:** `/api/v1/organizations/{organization_id}/clients/{client_id}/secrets/{secret_id}`
- **Tags:** API Auth

Permanently deletes a secret from an organization API client. This operation cannot be undone.

#### Responses

##### Status: 200 Client secret successfully deleted and no longer accessible

###### Content-Type: application/json

**Example:**

```json
null
```

### Get connection details

- **Method:** `GET`
- **Path:** `/api/v1/organizations/{organization_id}/connections/{id}`
- **Tags:** Connections

Retrieves the complete configuration and status details for a specific connection by its ID within an organization. Returns all connection properties including provider settings, protocols, and current status.

#### Responses

##### Status: 200 Successfully retrieved connection details for the specified organization

###### Content-Type: application/json

- **`connection`**

  `object` — Complete connection details including provider configuration, protocol settings, status, and all metadata. Contains everything needed to understand the connection's current state.
  - **`attribute_mapping`**

    `object` — Maps identity provider attributes to user profile fields. For example, {'email': 'user.mail', 'name': 'user.displayName'}.

  - **`configuration_type`**

    `string`, possible values: `"DISCOVERY", "MANUAL"` — How the connection was configured: DISCOVERY (automatic configuration) or MANUAL (administrator configured)

  - **`debug_enabled`**

    `boolean` — Enables testing mode that allows non-HTTPS endpoints. Should only be enabled in development environments, never in production.

  - **`domains`**

    `array` — Domain associated with this connection, used for domain-based authentication flows.

    **Items:**
    - **`create_time`**

      `string`, format: `date-time` — Timestamp when the domain was first created.

    - **`domain`**

      `string` — The business domain name that was configured for allowed email domain functionality (e.g., company.com, subdomain.company.com).

    - **`domain_type`**

      `object`

    - **`environment_id`**

      `string` — The environment ID where this domain is configured.

    - **`id`**

      `string` — Scalekit-generated unique identifier for this domain record.

    - **`organization_id`**

      `string` — The organization to which the domain belongs.

    - **`update_time`**

      `string`, format: `date-time` — Timestamp when the domain was last updated.

    - **`verification_method`**

      `string`, possible values: `"ADMIN", "DNS", "NOT_APPLICABLE"` — Method that determines how domain ownership is verified. - ADMIN: domain is marked verified without DNS validation, typically by an admin. - DNS: domain must be verified by adding a TXT record to your DNS configuration. - NOT_APPLICABLE: verification does not apply to this domain type.

    - **`verification_status`**

      `string`, possible values: `"PENDING", "VERIFIED", "FAILED", "AUTO_VERIFIED"` — Verification status of the domain. - PENDING: DNS TXT record has not been validated yet. - VERIFIED: domain confirmed via DNS TXT record validation or admin approval. - AUTO_VERIFIED: domain verified automatically without DNS changes. - FAILED: DNS TXT record was not validated within the verification window.

  - **`enabled`**

    `boolean` — Controls whether users can sign in using this connection. When false, the connection exists but cannot be used for authentication.

  - **`google_dwd_config`**

    `object` — Configuration details for Google Domain-Wide Delegation. Present only when type is GOOGLE_DWD.
    - **`scopes`**

      `array` — OAuth 2.0 scopes to request.

      **Items:**

      `string`

    - **`service_account_json`**

      `string` — Google Cloud service account JSON key. Write-only: reads return a masked value.

    - **`token_uri`**

      `string` — Google token endpoint. Defaults to https\://oauth2.googleapis.com/token.

  - **`id`**

    `string` — Unique identifier for this connection. Used in API calls to reference this specific connection.

  - **`key_id`**

    `string` — Alternative identifier for this connection, typically used in frontend applications or URLs.

  - **`oauth_config`**

    `object` — Configuration details for OAuth connections. Present only when type is OAUTH.
    - **`access_type`**

      `string` — Access Type

    - **`app_name`**

      `string` — Application name used by providers that require it as an authorize query parameter (e.g., Trello's app_name).

    - **`authorize_uri`**

      `string` — Authorize URI

    - **`client_id`**

      `string` — Client ID

    - **`client_secret`**

      `string` — Client Secret

    - **`custom_scope_name`**

      `string` — Custom Scope Name

    - **`is_cimd`**

      `boolean` — Indicates whether this connection was registered using Client ID Metadata Document (CIMD) instead of Dynamic Client Registration.

    - **`optional_scopes`**

      `object` — Optional scopes configuration for identity providers that support or require additional scopes to be sent in a custom field during authentication requests.
      - **`field_name`**

        `string` — Name of the field in which scope should be sent in the authentication request. This is required by some identity providers that expect scopes to be sent in a custom field instead of the standard 'scope' parameter.

      - **`scopes`**

        `array` — List of optional scopes that can be requested during authentication

        **Items:**

        `string`

    - **`pkce_enabled`**

      `boolean` — PKCE Enabled

    - **`prompt`**

      `string` — Prompt for the user

    - **`redirect_uri`**

      `string` — Redirect URI

    - **`scopes`**

      `array` — OIDC Scopes

      **Items:**

      `string`

    - **`sync_user_profile_on_login`**

      `boolean` — Indicates whether user profiles should be synchronized with the identity provider upon each log-in.

    - **`tenant_id`**

      `string` — Microsoft Entra tenant ID. Required when using a single-tenant or multi-tenant app registered in Microsoft Entra. Leave empty to use the common endpoint.

    - **`token_access_type`**

      `string` — Token Access Type

    - **`token_uri`**

      `string` — Token URI

    - **`use_platform_creds`**

      `boolean` — Use Scalekit credentials

    - **`user_info_uri`**

      `string` — User Info URI

  - **`oidc_config`**

    `object` — Configuration details for OpenID Connect (OIDC) connections. Present only when type is OIDC.
    - **`authorize_uri`**

      `string` — Authorize URI

    - **`backchannel_logout_redirect_uri`**

      `string` — backchannel logout redirect uri where idp sends logout_token

    - **`client_id`**

      `string` — Client ID

    - **`client_secret`**

      `string` — Client Secret

    - **`discovery_endpoint`**

      `string` — Discovery Endpoint

    - **`idp_logout_required`**

      `boolean` — Enable IDP logout

    - **`issuer`**

      `string` — Issuer URL

    - **`jit_provisioning_with_sso_enabled`**

      `boolean` — Indicates if Just In Time user provisioning is enabled for the connection

    - **`jwks_uri`**

      `string` — JWKS URI

    - **`pkce_enabled`**

      `boolean` — PKCE Enabled

    - **`post_logout_redirect_uri`**

      `string` — post logout redirect uri

    - **`redirect_uri`**

      `string` — Redirect URI

    - **`scopes`**

      `array` — OIDC Scopes

      **Items:**

      `string`, possible values: `"openid", "profile", "email", "address", "phone"`

    - **`sync_user_profile_on_login`**

      `boolean` — Indicates whether user profiles should be synchronized with the identity provider upon each log-in.

    - **`token_auth_type`**

      `string`, possible values: `"URL_PARAMS", "BASIC_AUTH"` — Token Auth Type

    - **`token_uri`**

      `string` — Token URI

    - **`user_info_uri`**

      `string` — User Info URI

  - **`organization_id`**

    `string` — Identifier of the organization that owns this connection. Connections are typically scoped to a single organization.

  - **`passwordless_config`**

    `object` — Configuration details for Magic Link authentication. Present only when type is MAGIC_LINK.
    - **`code_challenge_length`**

      `integer`, format: `int64` — Code Challenge Length

    - **`code_challenge_type`**

      `string`, possible values: `"NUMERIC", "ALPHANUMERIC"` — Code Challenge Type

    - **`enforce_same_browser_origin`**

      `boolean` — Enforce Same Browser Origin

    - **`frequency`**

      `integer`, format: `int64` — Link Frequency

    - **`regenerate_passwordless_credentials_on_resend`**

      `boolean` — Regenerate the

    - **`type`**

      `string`, possible values: `"LINK", "OTP", "LINK_OTP"` — Passwordless Type

    - **`validity`**

      `integer`, format: `int64` — Link Validity in Seconds

  - **`provider`**

    `string`, possible values: `"OKTA", "GOOGLE", "MICROSOFT_AD", "AUTH0", "ONELOGIN", "PING_IDENTITY", "JUMPCLOUD", "CUSTOM", "GITHUB", "GITLAB", "LINKEDIN", "SALESFORCE", "MICROSOFT", "IDP_SIMULATOR", "SCALEKIT", "ADFS"` — Identity provider service that handles authentication (such as OKTA, Google, Azure AD, or a custom provider)

  - **`provider_key`**

    `string` — Key ID of the identity provider service that handles authentication

  - **`saml_config`**

    `object` — Configuration details for SAML connections. Present only when type is SAML.
    - **`allow_idp_initiated_login`**

      `boolean` — Allow IDP Initiated Login

    - **`assertion_encrypted`**

      `boolean` — Assertion Encrypted

    - **`certificate_id`**

      `string` — Certificate ID

    - **`default_redirect_uri`**

      `string` — Default Redirect URI

    - **`force_authn`**

      `boolean` — Force Authn

    - **`idp_certificates`**

      `array` — IDP Certificates

      **Items:**
      - **`certificate`**

        `string` — IDP Certificate

      - **`create_time`**

        `string`, format: `date-time` — Certificate Creation Time

      - **`expiry_time`**

        `string`, format: `date-time` — Certificate Expiry Time

      - **`id`**

        `string` — Certificate ID

      - **`issuer`**

        `string` — Certificate Issuer

    - **`idp_entity_id`**

      `string` — IDP Entity ID

    - **`idp_metadata_url`**

      `string` — IDP Metadata URL

    - **`idp_name_id_format`**

      `string`, possible values: `"UNSPECIFIED", "EMAIL", "TRANSIENT", "PERSISTENT"` — IDP Name ID Format

    - **`idp_slo_request_binding`**

      `string`, possible values: `"HTTP_POST", "HTTP_REDIRECT"` — IDP SLO Request Binding

    - **`idp_slo_required`**

      `boolean` — Enable IDP logout

    - **`idp_slo_url`**

      `string` — IDP SLO URL

    - **`idp_sso_request_binding`**

      `string`, possible values: `"HTTP_POST", "HTTP_REDIRECT"` — IDP SSO Request Binding

    - **`idp_sso_url`**

      `string` — IDP SSO URL

    - **`jit_provisioning_with_sso_enabled`**

      `boolean` — Indicates if Just In Time user provisioning is enabled for the connection

    - **`saml_signing_option`**

      `string`, possible values: `"NO_SIGNING", "SAML_ONLY_RESPONSE_SIGNING", "SAML_ONLY_ASSERTION_SIGNING", "SAML_RESPONSE_ASSERTION_SIGNING", "SAML_RESPONSE_OR_ASSERTION_SIGNING"` — SAML Signing Option

    - **`sp_assertion_url`**

      `string` — SP Assertion URL

    - **`sp_entity_id`**

      `string` — SP Entity ID

    - **`sp_metadata_url`**

      `string` — SP Metadata URL

    - **`sp_slo_url`**

      `string` — Service Provider SLO url

    - **`sync_user_profile_on_login`**

      `boolean` — Indicates whether user profiles should be synchronized with the identity provider upon each log-in.

    - **`ui_button_title`**

      `string` — UI Button Title

    - **`want_request_signed`**

      `boolean` — Want Request Signed

  - **`static_config`**

    `object` — Static configuration for custom connections. Present only when type is BASIC, BEARER, API_KEY, or custom.
    - **`static_config`**

      `object`

  - **`status`**

    `string`, possible values: `"DRAFT", "IN_PROGRESS", "COMPLETED"` — Current configuration status of the connection. Possible values include IN_PROGRESS, CONFIGURED, and ERROR.

  - **`test_connection_uri`**

    `string` — URI that can be used to test this connection. Visit this URL to verify the connection works correctly.

  - **`type`**

    `string`, possible values: `"OIDC", "SAML", "PASSWORD", "OAUTH", "PASSWORDLESS", "BASIC", "BEARER", "API_KEY", "WEBAUTHN", "OAUTH_M2M", "TRELLO_OAUTH1", "GOOGLE_DWD"` — Authentication protocol used by this connection. Can be OIDC (OpenID Connect), SAML, OAUTH, or MAGIC_LINK.

  - **`webauthn_config`**

    `object` — Configuration details for WebAuthn (passkeys). Present only when type is WEBAUTHN.
    - **`attestation`**

      `object`
      - **`conveyance_preference`**

        `string`

      - **`enterprise_approved_ids`**

        `array`

        **Items:**

        `string`

    - **`authenticator_selection`**

      `object`
      - **`authenticator_attachment`**

        `string`

      - **`user_verification`**

        `string`

    - **`authenticators`**

      `object`
      - **`desired_authenticator_status`**

        `array` — provides the list of statuses which are considered undesirable for status report validation purposes. Should be used with validate_status set to true.

        **Items:**

        `string`, default: `"[]"`

      - **`undesired_authenticator_status`**

        `array` — provides the list of statuses which are considered undesirable for status report validation purposes. Should be used with validate_status set to true.

        **Items:**

        `string`, default: `"['ATTESTATION_KEY_COMPROMISE', 'USER_VERIFICATION_BYPASS', 'USER_KEY_REMOTE_COMPROMISE', 'USER_KEY_PHYSICAL_COMPROMISE', 'REVOKED']"`

      - **`validate_anchors`**

        `boolean` — when set to true enables the validation of the attestation statement against the trust anchor from the metadata statement.

      - **`validate_attestation_type`**

        `boolean` — when set to true enables the validation of the attestation statements type against the known types the authenticator can produce.

      - **`validate_entry`**

        `boolean` — requires that the provided metadata has an entry for the given authenticator to be considered valid. By default an AAGUID which has a zero value should fail validation if validate_entry_permit_zero_aaguid is not provided with the value of true.

      - **`validate_entry_permit_zero_aaguid`**

        `boolean` — is an option that permits a zero'd AAGUID from an attestation statement to automatically pass metadata validations. Generally helpful to use with validate_entry.

      - **`validate_status`**

        `boolean` — when set to true enables the validation of the attestation statements AAGUID against the desired and undesired lists

    - **`enable_auto_registration`**

      `boolean` — Enable auto registration for WebAuthn

    - **`enable_conditional_login`**

      `boolean` — Allow autofill of passkeys in login page

    - **`rp`**

      `object`
      - **`ids`**

        `array`

        **Items:**

        `string`

      - **`origins`**

        `array`

        **Items:**

        `string`

    - **`show_passkey_button`**

      `boolean` — Show passkey button on login screen

    - **`timeout`**

      `object`
      - **`login`**

        `string`, default: `"\"300s\""` — Login timeout duration

      - **`login_uvd`**

        `string`, default: `"\"300s\""` — Login timeout duration when user verification is discouraged

      - **`registration`**

        `string`, default: `"\"300s\""` — Registration timeout duration

      - **`registration_uvd`**

        `string`, default: `"\"300s\""` — Registration timeout duration when user verification is discouraged

**Example:**

```json
{
  "connection": {
    "attribute_mapping": {
      "additionalProperty": ""
    },
    "configuration_type": "MANUAL",
    "debug_enabled": true,
    "domains": [
      {
        "name": "example.com"
      }
    ],
    "enabled": false,
    "google_dwd_config": null,
    "id": "conn_2123312131125533",
    "key_id": "",
    "oauth_config": null,
    "oidc_config": null,
    "organization_id": "org_2123312131125533",
    "passwordless_config": null,
    "provider": "OKTA",
    "provider_key": "google",
    "saml_config": null,
    "static_config": null,
    "status": "IN_PROGRESS",
    "test_connection_uri": "https://auth.example.com/test-connection/conn_2123312131125533",
    "type": "OIDC",
    "webauthn_config": null
  }
}
```

### Delete SSO connection

- **Method:** `DELETE`
- **Path:** `/api/v1/organizations/{organization_id}/connections/{id}`
- **Tags:** Connections

Deletes an SSO connection from the specified organization by connection ID. Use this endpoint when an identity provider integration is no longer needed for the organization. Returns an empty response after the SSO connection is deleted successfully.

#### Responses

##### Status: 200 SSO connection deleted successfully

###### Content-Type: application/json

**Example:**

```json
null
```

### Disable SSO connection

- **Method:** `PATCH`
- **Path:** `/api/v1/organizations/{organization_id}/connections/{id}:disable`
- **Tags:** Connections

Deactivate an existing connection for the specified organization. When disabled, users cannot authenticate using this connection. This endpoint changes the connection state from enabled to disabled without modifying other configuration settings

#### Responses

##### Status: 200 Connection disabled successfully

###### Content-Type: application/json

- **`enabled`**

  `boolean` — Current state of the connection after the operation. True means the connection is now enabled and can be used for authentication.

- **`error_message`**

  `string` — Error message if the operation fails

**Example:**

```json
{
  "enabled": true,
  "error_message": "placeholder"
}
```

### Enable SSO connection

- **Method:** `PATCH`
- **Path:** `/api/v1/organizations/{organization_id}/connections/{id}:enable`
- **Tags:** Connections

Activate an existing connection for the specified organization. When enabled, users can authenticate using this connection. This endpoint changes the connection state from disabled to enabled without modifying other configuration settings

#### Responses

##### Status: 200 Connection enabled successfully

###### Content-Type: application/json

- **`enabled`**

  `boolean` — Current state of the connection after the operation. True means the connection is now enabled and can be used for authentication.

- **`error_message`**

  `string` — Error message if the operation fails

**Example:**

```json
{
  "enabled": true,
  "error_message": "placeholder"
}
```

### List organization directories

- **Method:** `GET`
- **Path:** `/api/v1/organizations/{organization_id}/directories`
- **Tags:** Directory

#### Responses

##### Status: 200 Successfully retrieved the list of directories for the organization

###### Content-Type: application/json

- **`directories`**

  `array` — List of directories associated with the organization

  **Items:**
  - **`attribute_mappings`**

    `object` — Mappings between directory attributes and Scalekit user and group attributes
    - **`attributes`**

      `array`

      **Items:**
      - **`key`**

        `string`

      - **`map_to`**

        `string`

  - **`directory_endpoint`**

    `string` — The endpoint URL generated by Scalekit for synchronizing users and groups from the Directory Provider

  - **`directory_provider`**

    `string`, possible values: `"OKTA", "GOOGLE", "MICROSOFT_AD", "AUTH0", "ONELOGIN", "JUMPCLOUD", "PING_IDENTITY"` — Identity provider connected to this directory

  - **`directory_type`**

    `string`, possible values: `"SCIM", "LDAP", "POLL"` — Type of the directory, indicating the protocol or standard used for synchronization

  - **`email`**

    `string` — Email Id associated with Directory whose access will be used for polling

  - **`enabled`**

    `boolean` — Indicates whether the directory is currently enabled and actively synchronizing users and groups

  - **`groups_tracked`**

    `string` — It indicates if all groups are tracked or select groups are tracked

  - **`id`**

    `string` — Unique identifier of the directory

  - **`last_synced_at`**

    `string`, format: `date-time` — Timestamp of the last successful synchronization of users and groups from the Directory Provider

  - **`name`**

    `string` — Name of the directory, typically representing the connected Directory provider

  - **`organization_id`**

    `string` — Unique identifier of the organization to which the directory belongs

  - **`role_assignments`**

    `object` — Role assignments associated with the directory, defining group based role assignments
    - **`assignments`**

      `array`

      **Items:**
      - **`group_id`**

        `string` — group ID for the role mapping

      - **`role_name`**

        `string`

  - **`secrets`**

    `array` — List of secrets used for authenticating and synchronizing with the Directory Provider

    **Items:**
    - **`create_time`**

      `string`, format: `date-time` — Creation Time

    - **`directory_id`**

      `string` — Directory ID

    - **`expire_time`**

      `string`, format: `date-time` — Expiry Time

    - **`id`**

      `string`

    - **`last_used_time`**

      `string`, format: `date-time` — Last Used Time

    - **`secret_suffix`**

      `string` — Secret Suffix

    - **`status`**

      `string`, possible values: `"INACTIVE"` — Secret Status

  - **`stats`**

    `object` — Statistics and metrics related to the directory, such as synchronization status and error counts
    - **`group_updated_at`**

      `string`, format: `date-time` — Max time of Group Updated At for Directory

    - **`total_groups`**

      `integer`, format: `int32` — Total Groups in the Directory

    - **`total_users`**

      `integer`, format: `int32` — Total Users in the Directory

    - **`user_updated_at`**

      `string`, format: `date-time` — Max time of User Updated At for Directory

  - **`status`**

    `string` — Directory Status

  - **`total_groups`**

    `integer`, format: `int32` — Total number of groups in the directory

  - **`total_users`**

    `integer`, format: `int32` — Total number of users in the directory

**Example:**

```json
{
  "directories": [
    {
      "attribute_mappings": null,
      "directory_endpoint": "https://yourapp.scalekit.com/api/v1/directoies/dir_123212312/scim/v2",
      "directory_provider": "OKTA",
      "directory_type": "SCIM",
      "email": "john.doe@scalekit.cloud",
      "enabled": true,
      "groups_tracked": "ALL",
      "id": "dir_121312434123312",
      "last_synced_at": "2024-10-01T00:00:00Z",
      "name": "Azure AD",
      "organization_id": "org_121312434123312",
      "role_assignments": null,
      "secrets": [{}],
      "stats": null,
      "status": "IN_PROGRESS",
      "total_groups": 10,
      "total_users": 10
    }
  ]
}
```

### List directory groups

- **Method:** `GET`
- **Path:** `/api/v1/organizations/{organization_id}/directories/{directory_id}/groups`
- **Tags:** Directory

Retrieves all groups from a specified directory. Use this endpoint to view group structures from your connected identity provider.

#### Responses

##### Status: 200 Successfully retrieved the list of groups from the specified directory

###### Content-Type: application/json

- **`groups`**

  `array` — List of directory groups retrieved from the specified directory

  **Items:**
  - **`display_name`**

    `string` — Display Name

  - **`group_detail`**

    `object` — Complete Group Details Payload

  - **`id`**

    `string` — Group ID

  - **`total_users`**

    `integer`, format: `int32` — Total Users in the Group

  - **`updated_at`**

    `string`, format: `date-time` — Updated At

- **`next_page_token`**

  `string` — Token to retrieve the next page of results. Use this token in the 'page_token' field of the next request

- **`prev_page_token`**

  `string` — Token to retrieve the previous page of results. Use this token in the 'page_token' field of the next request

- **`total_size`**

  `integer`, format: `int64` — Total number of groups matching the request criteria, regardless of pagination

**Example:**

```json
{
  "groups": [
    {
      "display_name": "Admins",
      "group_detail": {},
      "id": "dirgroup_121312434123312",
      "total_users": 10,
      "updated_at": "2024-10-01T00:00:00Z"
    }
  ],
  "next_page_token": "",
  "prev_page_token": "",
  "total_size": 1
}
```

### List directory users

- **Method:** `GET`
- **Path:** `/api/v1/organizations/{organization_id}/directories/{directory_id}/users`
- **Tags:** Directory

Retrieves a list of all users within a specified directory for an organization. This endpoint allows you to view user accounts associated with your connected Directory Providers.

#### Responses

##### Status: 200 Successfully retrieved the list of users from the specified directory

###### Content-Type: application/json

- **`next_page_token`**

  `string` — Token for pagination. Use this token in the 'page_token' field of the next request to fetch the subsequent page of users

- **`prev_page_token`**

  `string` — Token for pagination. Use this token in the 'page_token' field of the next request to fetch the prior page of users

- **`total_size`**

  `integer`, format: `int64` — Total number of users available in the directory that match the request criteria

- **`users`**

  `array` — List of directory users retrieved from the specified directory

  **Items:**
  - **`email`**

    `string` — Email

  - **`emails`**

    `array` — Emails

    **Items:**

    `string`

  - **`family_name`**

    `string` — Last Name

  - **`given_name`**

    `string` — First Name

  - **`groups`**

    `array` — Groups

    **Items:**
    - **`display_name`**

      `string` — Display Name

    - **`group_detail`**

      `object` — Complete Group Details Payload

    - **`id`**

      `string` — Group ID

    - **`total_users`**

      `integer`, format: `int32` — Total Users in the Group

    - **`updated_at`**

      `string`, format: `date-time` — Updated At

  - **`id`**

    `string` — User ID

  - **`preferred_username`**

    `string` — Preferred Username

  - **`updated_at`**

    `string`, format: `date-time` — Updated At

  - **`user_detail`**

    `object` — Complete User Details Payload

**Example:**

```json
{
  "next_page_token": "",
  "prev_page_token": "",
  "total_size": 1,
  "users": [
    {
      "email": "johndoe",
      "emails": [""],
      "family_name": "Doe",
      "given_name": "John",
      "groups": [{}],
      "id": "diruser_121312434123312",
      "preferred_username": "johndoe",
      "updated_at": "2024-10-01T00:00:00Z",
      "user_detail": {}
    }
  ]
}
```

### Get directory details

- **Method:** `GET`
- **Path:** `/api/v1/organizations/{organization_id}/directories/{id}`
- **Tags:** Directory

Retrieves detailed information about a specific directory within an organization

#### Responses

##### Status: 200 Successfully retrieved directory details

###### Content-Type: application/json

- **`directory`**

  `object` — Detailed information about the requested directory
  - **`attribute_mappings`**

    `object` — Mappings between directory attributes and Scalekit user and group attributes
    - **`attributes`**

      `array`

      **Items:**
      - **`key`**

        `string`

      - **`map_to`**

        `string`

  - **`directory_endpoint`**

    `string` — The endpoint URL generated by Scalekit for synchronizing users and groups from the Directory Provider

  - **`directory_provider`**

    `string`, possible values: `"OKTA", "GOOGLE", "MICROSOFT_AD", "AUTH0", "ONELOGIN", "JUMPCLOUD", "PING_IDENTITY"` — Identity provider connected to this directory

  - **`directory_type`**

    `string`, possible values: `"SCIM", "LDAP", "POLL"` — Type of the directory, indicating the protocol or standard used for synchronization

  - **`email`**

    `string` — Email Id associated with Directory whose access will be used for polling

  - **`enabled`**

    `boolean` — Indicates whether the directory is currently enabled and actively synchronizing users and groups

  - **`groups_tracked`**

    `string` — It indicates if all groups are tracked or select groups are tracked

  - **`id`**

    `string` — Unique identifier of the directory

  - **`last_synced_at`**

    `string`, format: `date-time` — Timestamp of the last successful synchronization of users and groups from the Directory Provider

  - **`name`**

    `string` — Name of the directory, typically representing the connected Directory provider

  - **`organization_id`**

    `string` — Unique identifier of the organization to which the directory belongs

  - **`role_assignments`**

    `object` — Role assignments associated with the directory, defining group based role assignments
    - **`assignments`**

      `array`

      **Items:**
      - **`group_id`**

        `string` — group ID for the role mapping

      - **`role_name`**

        `string`

  - **`secrets`**

    `array` — List of secrets used for authenticating and synchronizing with the Directory Provider

    **Items:**
    - **`create_time`**

      `string`, format: `date-time` — Creation Time

    - **`directory_id`**

      `string` — Directory ID

    - **`expire_time`**

      `string`, format: `date-time` — Expiry Time

    - **`id`**

      `string`

    - **`last_used_time`**

      `string`, format: `date-time` — Last Used Time

    - **`secret_suffix`**

      `string` — Secret Suffix

    - **`status`**

      `string`, possible values: `"INACTIVE"` — Secret Status

  - **`stats`**

    `object` — Statistics and metrics related to the directory, such as synchronization status and error counts
    - **`group_updated_at`**

      `string`, format: `date-time` — Max time of Group Updated At for Directory

    - **`total_groups`**

      `integer`, format: `int32` — Total Groups in the Directory

    - **`total_users`**

      `integer`, format: `int32` — Total Users in the Directory

    - **`user_updated_at`**

      `string`, format: `date-time` — Max time of User Updated At for Directory

  - **`status`**

    `string` — Directory Status

  - **`total_groups`**

    `integer`, format: `int32` — Total number of groups in the directory

  - **`total_users`**

    `integer`, format: `int32` — Total number of users in the directory

**Example:**

```json
{
  "directory": {
    "attribute_mappings": null,
    "directory_endpoint": "https://yourapp.scalekit.com/api/v1/directoies/dir_123212312/scim/v2",
    "directory_provider": "OKTA",
    "directory_type": "SCIM",
    "email": "john.doe@scalekit.cloud",
    "enabled": true,
    "groups_tracked": "ALL",
    "id": "dir_121312434123312",
    "last_synced_at": "2024-10-01T00:00:00Z",
    "name": "Azure AD",
    "organization_id": "org_121312434123312",
    "role_assignments": null,
    "secrets": [{}],
    "stats": null,
    "status": "IN_PROGRESS",
    "total_groups": 10,
    "total_users": 10
  }
}
```

### Disable a directory

- **Method:** `PATCH`
- **Path:** `/api/v1/organizations/{organization_id}/directories/{id}:disable`
- **Tags:** Directory

Stops synchronization of users and groups from a specified directory within an organization. This operation prevents further updates from the connected Directory provider

#### Responses

##### Status: 200 Successfully disabled the directory

###### Content-Type: application/json

- **`enabled`**

  `boolean` — Specifies the directory's state after the toggle operation. A value of \`true\` indicates that the directory is enabled and actively synchronizing users and groups. A value of \`false\` means the directory is disabled, halting synchronization

- **`error_message`**

  `string` — Contains a human-readable error message if the toggle operation encountered an issue. If the operation was successful, this field will be empty

**Example:**

```json
{
  "enabled": true,
  "error_message": "The directory is already enabled"
}
```

### Enable a directory

- **Method:** `PATCH`
- **Path:** `/api/v1/organizations/{organization_id}/directories/{id}:enable`
- **Tags:** Directory

Activates a directory within an organization, allowing it to synchronize users and groups with the connected Directory provider

#### Responses

##### Status: 200 Success

###### Content-Type: application/json

- **`enabled`**

  `boolean` — Specifies the directory's state after the toggle operation. A value of \`true\` indicates that the directory is enabled and actively synchronizing users and groups. A value of \`false\` means the directory is disabled, halting synchronization

- **`error_message`**

  `string` — Contains a human-readable error message if the toggle operation encountered an issue. If the operation was successful, this field will be empty

**Example:**

```json
{
  "enabled": true,
  "error_message": "The directory is already enabled"
}
```

### List Domains

- **Method:** `GET`
- **Path:** `/api/v1/organizations/{organization_id}/domains`
- **Tags:** Domains

Retrieves a paginated list of all domains configured for the specified organization.

Domain types:

- ALLOWED_EMAIL_DOMAIN: Trusted domains used to suggest the organization in the organization switcher during sign-in/sign-up (auth-method agnostic).
- ORGANIZATION_DOMAIN: SSO discovery domains used to route users to the correct SSO provider and enforce SSO.

#### Responses

##### Status: 200 Successfully retrieved the list of domains.

###### Content-Type: application/json

- **`domains`**

  `array` — Array of domain objects containing all domain details including verification status and configuration.

  **Items:**
  - **`create_time`**

    `string`, format: `date-time` — Timestamp when the domain was first created.

  - **`domain`**

    `string` — The business domain name that was configured for allowed email domain functionality (e.g., company.com, subdomain.company.com).

  - **`domain_type`**

    `object`

  - **`environment_id`**

    `string` — The environment ID where this domain is configured.

  - **`id`**

    `string` — Scalekit-generated unique identifier for this domain record.

  - **`organization_id`**

    `string` — The organization to which the domain belongs.

  - **`update_time`**

    `string`, format: `date-time` — Timestamp when the domain was last updated.

  - **`verification_method`**

    `string`, possible values: `"ADMIN", "DNS", "NOT_APPLICABLE"` — Method that determines how domain ownership is verified. - ADMIN: domain is marked verified without DNS validation, typically by an admin. - DNS: domain must be verified by adding a TXT record to your DNS configuration. - NOT_APPLICABLE: verification does not apply to this domain type.

  - **`verification_status`**

    `string`, possible values: `"PENDING", "VERIFIED", "FAILED", "AUTO_VERIFIED"` — Verification status of the domain. - PENDING: DNS TXT record has not been validated yet. - VERIFIED: domain confirmed via DNS TXT record validation or admin approval. - AUTO_VERIFIED: domain verified automatically without DNS changes. - FAILED: DNS TXT record was not validated within the verification window.

- **`page_number`**

  `integer`, format: `int32` — Current page number in the pagination sequence.

- **`page_size`**

  `integer`, format: `int32` — Number of domains returned in this page.

**Example:**

```json
{
  "domains": [
    {
      "create_time": "2025-09-01T12:14:43.100000Z",
      "domain": "customerdomain.com",
      "domain_type": "ORGANIZATION_DOMAIN",
      "environment_id": "env_58345499215790610",
      "id": "dom_88351643129225005",
      "organization_id": "org_81667076086825451",
      "update_time": "2025-09-01T12:14:43.110455Z",
      "verification_method": "ADMIN",
      "verification_status": "AUTO_VERIFIED"
    }
  ],
  "page_number": 1,
  "page_size": 1
}
```

### Create Domain

- **Method:** `POST`
- **Path:** `/api/v1/organizations/{organization_id}/domains`
- **Tags:** Domains

Creates and associates a domain with an organization.

Use one of the following domain types:

- ALLOWED_EMAIL_DOMAIN: Adds a trusted email domain for organization suggestions in the organization switcher during sign-in/sign-up (auth-method agnostic).
- ORGANIZATION_DOMAIN: Enables SSO domain discovery. If a user signs in with a matching email domain, Scalekit redirects them to the organization’s SSO provider and enforces SSO.

The domain must be a valid business domain that you control. Public/disposable domains (e.g., gmail.com) are blocked for security.

#### Request Body

##### Content-Type: application/json

- **`domain`**

  `string` — The domain name to be configured. Must be a valid business domain you control. Public and disposable domains (gmail.com, outlook.com, etc.) are automatically blocked for security.

- **`domain_type`**

  `string`, possible values: `"ALLOWED_EMAIL_DOMAIN", "ORGANIZATION_DOMAIN"` — The domain type. - ALLOWED_EMAIL_DOMAIN: trusted domain used to suggest the organization in the organization switcher during sign-in/sign-up. - ORGANIZATION_DOMAIN: SSO discovery domain used to route users to the correct SSO provider and enforce SSO.

**Example:**

```json
{
  "domain": "customerdomain.com",
  "domain_type": "ORGANIZATION_DOMAIN"
}
```

#### Responses

##### Status: 200 Successfully created the domain.

###### Content-Type: application/json

- **`domain`**

  `object` — The newly created domain object with all configuration details and system-generated identifiers.
  - **`create_time`**

    `string`, format: `date-time` — Timestamp when the domain was first created.

  - **`domain`**

    `string` — The business domain name that was configured for allowed email domain functionality (e.g., company.com, subdomain.company.com).

  - **`domain_type`**

    `object`

  - **`environment_id`**

    `string` — The environment ID where this domain is configured.

  - **`id`**

    `string` — Scalekit-generated unique identifier for this domain record.

  - **`organization_id`**

    `string` — The organization to which the domain belongs.

  - **`update_time`**

    `string`, format: `date-time` — Timestamp when the domain was last updated.

  - **`verification_method`**

    `string`, possible values: `"ADMIN", "DNS", "NOT_APPLICABLE"` — Method that determines how domain ownership is verified. - ADMIN: domain is marked verified without DNS validation, typically by an admin. - DNS: domain must be verified by adding a TXT record to your DNS configuration. - NOT_APPLICABLE: verification does not apply to this domain type.

  - **`verification_status`**

    `string`, possible values: `"PENDING", "VERIFIED", "FAILED", "AUTO_VERIFIED"` — Verification status of the domain. - PENDING: DNS TXT record has not been validated yet. - VERIFIED: domain confirmed via DNS TXT record validation or admin approval. - AUTO_VERIFIED: domain verified automatically without DNS changes. - FAILED: DNS TXT record was not validated within the verification window.

**Example:**

```json
{
  "domain": {
    "create_time": "2025-09-01T12:14:43.100000Z",
    "domain": "customerdomain.com",
    "domain_type": "ORGANIZATION_DOMAIN",
    "environment_id": "env_58345499215790610",
    "id": "dom_88351643129225005",
    "organization_id": "org_81667076086825451",
    "update_time": "2025-09-01T12:14:43.110455Z",
    "verification_method": "ADMIN",
    "verification_status": "AUTO_VERIFIED"
  }
}
```

##### Status: 400 Invalid request — common causes invalid domain format, public or disposable domain, or domain already exists.

###### Content-Type: application/json

- **`debug_info`**

  `object` — Describes additional debugging info.
  - **`detail`**

    `string` — Additional debugging information provided by the server.

  - **`stack_entries`**

    `array` — The stack trace entries indicating where the error occurred.

    **Items:**

    `string`

- **`error_code`**

  `string`

- **`help_info`**

  `object` — HelpInfo provides documentation links attached to an error response. When present in ErrorInfo, clients should surface these links to help developers resolve the error. For example, a missing required field error may include a link to the relevant guide.
  - **`links`**

    `array` — One or more links relevant to resolving the error.

    **Items:**
    - **`description`**

      `string` — Human-readable label for the link (e.g. "User verification flow").

    - **`url`**

      `string` — Absolute URL to the documentation page (e.g. "https\://docs.scalekit.com/...").

- **`localized_message_info`**

  `object`
  - **`locale`**

    `string`

  - **`message`**

    `string`

- **`request_info`**

  `object` — Contains metadata about the request that clients can attach when filing a bug or providing other forms of feedback.
  - **`request_id`**

    `string` — An opaque string that should only be interpreted by the service generating it. For example, it can be used to identify requests in the service's logs.

  - **`serving_data`**

    `string` — Any data that was used to serve this request. For example, an encrypted stack trace that can be sent back to the service provider for debugging.

- **`resource_info`**

  `object` — Describes the resource that is being accessed.
  - **`description`**

    `string` — Describes what error is encountered when accessing this resource. For example, updating a cloud project may require the \`writer\` permission on the developer console project.

  - **`owner`**

    `string`

  - **`required_permissions`**

    `array` — The required permissions needed to access the resource.

    **Items:**

    `string`

  - **`resource_name`**

    `string`

  - **`user`**

    `string`

- **`tool_error_info`**

  `object`
  - **`execution_id`**

    `string`

  - **`tool_error_code`**

    `string`

  - **`tool_error_message`**

    `string`

- **`validation_error_info`**

  `object` — Describes violations in a client request. This error type focuses on the syntactic aspects of the request.
  - **`field_violations`**

    `array` — Describes all violations in a client request.

    **Items:**
    - **`constraint`**

      `string`

    - **`description`**

      `string` — A description of why the request element is bad.

    - **`field`**

      `string`

**Example:**

```json
{
  "debug_info": {
    "detail": "",
    "stack_entries": [""]
  },
  "error_code": "",
  "help_info": {
    "links": [{}]
  },
  "localized_message_info": {
    "locale": "",
    "message": ""
  },
  "request_info": {
    "request_id": "",
    "serving_data": ""
  },
  "resource_info": {
    "description": "",
    "owner": "",
    "required_permissions": [""],
    "resource_name": "",
    "user": ""
  },
  "tool_error_info": {
    "execution_id": "",
    "tool_error_code": "",
    "tool_error_message": ""
  },
  "validation_error_info": {
    "field_violations": [{}]
  }
}
```

### Get Domain

- **Method:** `GET`
- **Path:** `/api/v1/organizations/{organization_id}/domains/{id}`
- **Tags:** Domains

Retrieves complete details for a domain including domain type, timestamps, and configuration information.

#### Responses

##### Status: 200 Successfully retrieved the domain details.

###### Content-Type: application/json

- **`domain`**

  `object` — The requested domain object with complete details including domain type, timestamps and configuration.
  - **`create_time`**

    `string`, format: `date-time` — Timestamp when the domain was first created.

  - **`domain`**

    `string` — The business domain name that was configured for allowed email domain functionality (e.g., company.com, subdomain.company.com).

  - **`domain_type`**

    `object`

  - **`environment_id`**

    `string` — The environment ID where this domain is configured.

  - **`id`**

    `string` — Scalekit-generated unique identifier for this domain record.

  - **`organization_id`**

    `string` — The organization to which the domain belongs.

  - **`update_time`**

    `string`, format: `date-time` — Timestamp when the domain was last updated.

  - **`verification_method`**

    `string`, possible values: `"ADMIN", "DNS", "NOT_APPLICABLE"` — Method that determines how domain ownership is verified. - ADMIN: domain is marked verified without DNS validation, typically by an admin. - DNS: domain must be verified by adding a TXT record to your DNS configuration. - NOT_APPLICABLE: verification does not apply to this domain type.

  - **`verification_status`**

    `string`, possible values: `"PENDING", "VERIFIED", "FAILED", "AUTO_VERIFIED"` — Verification status of the domain. - PENDING: DNS TXT record has not been validated yet. - VERIFIED: domain confirmed via DNS TXT record validation or admin approval. - AUTO_VERIFIED: domain verified automatically without DNS changes. - FAILED: DNS TXT record was not validated within the verification window.

**Example:**

```json
{
  "domain": {
    "create_time": "2025-09-01T12:14:43.100000Z",
    "domain": "customerdomain.com",
    "domain_type": "ORGANIZATION_DOMAIN",
    "environment_id": "env_58345499215790610",
    "id": "dom_88351643129225005",
    "organization_id": "org_81667076086825451",
    "update_time": "2025-09-01T12:14:43.110455Z",
    "verification_method": "ADMIN",
    "verification_status": "AUTO_VERIFIED"
  }
}
```

### Delete Domain

- **Method:** `DELETE`
- **Path:** `/api/v1/organizations/{organization_id}/domains/{id}`
- **Tags:** Domains

Permanently removes a domain record from an organization.

- Deleting an ORGANIZATION_DOMAIN disables SSO routing/enforcement for that domain.
- Deleting an ALLOWED_EMAIL_DOMAIN stops organization suggestions for users with that email domain.

#### Responses

##### Status: 200 Domain successfully deleted.

###### Content-Type: application/json

**Example:**

```json
null
```

### Get organization session policy

- **Method:** `GET`
- **Path:** `/api/v1/organizations/{organization_id}/session-policy`
- **Tags:** Organizations

Retrieves the session policy for an organization. Returns session_policy='APPLICATION' if the organization inherits the application-level defaults, or session_policy='CUSTOM' with the configured values if a custom policy is active.

#### Responses

##### Status: 200 Session policy retrieved successfully.

###### Content-Type: application/json

- **`policy`**

  `object` — The session policy for the organization.
  - **`absolute_session_timeout`**

    `integer`, format: `int32` — The absolute session timeout value. The unit is specified by absolute_session_timeout_unit. Omitted when policy_source is 'environment'.

  - **`absolute_session_timeout_unit`**

    `string`, possible values: `"MINUTES", "HOURS", "DAYS"` — Unit for absolute_session_timeout. Accepted values: 'minutes', 'hours', 'days'. Responses always return 'minutes'.

  - **`idle_session_timeout`**

    `integer`, format: `int32` — The idle session timeout value. The unit is specified by idle_session_timeout_unit. Omitted when idle_session_timeout_enabled is false or policy_source is 'environment'.

  - **`idle_session_timeout_enabled`**

    `boolean` — Whether idle session timeout is enabled for this organization. Omitted when policy_source is 'environment'.

  - **`idle_session_timeout_unit`**

    `string`, possible values: `"MINUTES", "HOURS", "DAYS"` — Unit for idle_session_timeout. Accepted values: 'minutes', 'hours', 'days'. Responses always return 'minutes'.

  - **`policy_source`**

    `string`, possible values: `"APPLICATION", "CUSTOM"` — Policy source. 'APPLICATION' means the organization inherits the application-level session policy. 'CUSTOM' means organization-specific timeout values are active.

**Example:**

```json
{
  "policy": {
    "absolute_session_timeout": 360,
    "absolute_session_timeout_unit": "minutes",
    "idle_session_timeout": 84,
    "idle_session_timeout_enabled": true,
    "idle_session_timeout_unit": "minutes",
    "policy_source": "CUSTOM"
  }
}
```

##### Status: 404 Organization not found.

###### Content-Type: application/json

**Example:**

```json
null
```

### Update organization session policy

- **Method:** `PATCH`
- **Path:** `/api/v1/organizations/{organization_id}/session-policy`
- **Tags:** Organizations

Sets a custom session policy for an organization or reverts to application-level settings. Send session_policy='APPLICATION' to revert to application defaults. Send session_policy='CUSTOM' with timeout values to activate a custom policy.

#### Request Body

##### Content-Type: application/json

- **`absolute_session_timeout`**

  `integer`, format: `int32` — The absolute session timeout value. The unit is specified by absolute_session_timeout_unit. Omit when policy_source is APPLICATION.

- **`absolute_session_timeout_unit`**

  `string`, possible values: `"MINUTES", "HOURS", "DAYS"` — Unit for absolute_session_timeout. Accepted values: 'MINUTES', 'HOURS', 'DAYS'. Defaults to MINUTES.

- **`idle_session_timeout`**

  `integer`, format: `int32` — The idle session timeout value. The unit is specified by idle_session_timeout_unit. Omit when idle_session_timeout_enabled is false.

- **`idle_session_timeout_enabled`**

  `boolean` — Whether idle session timeout is enabled. Omit when policy_source is APPLICATION.

- **`idle_session_timeout_unit`**

  `string`, possible values: `"MINUTES", "HOURS", "DAYS"` — Unit for idle_session_timeout. Accepted values: 'MINUTES', 'HOURS', 'DAYS'. Defaults to MINUTES.

- **`policy_source`**

  `string`, possible values: `"APPLICATION", "CUSTOM"` — Policy source. Send 'APPLICATION' to revert to application defaults. Send 'CUSTOM' with timeout values to activate a custom policy.

**Example:**

```json
{
  "absolute_session_timeout": 360,
  "absolute_session_timeout_unit": "MINUTES",
  "idle_session_timeout": 84,
  "idle_session_timeout_enabled": true,
  "idle_session_timeout_unit": "MINUTES",
  "policy_source": "CUSTOM"
}
```

#### Responses

##### Status: 200 Session policy updated successfully.

###### Content-Type: application/json

- **`policy`**

  `object` — The updated session policy for the organization.
  - **`absolute_session_timeout`**

    `integer`, format: `int32` — The absolute session timeout value. The unit is specified by absolute_session_timeout_unit. Omitted when policy_source is 'environment'.

  - **`absolute_session_timeout_unit`**

    `string`, possible values: `"MINUTES", "HOURS", "DAYS"` — Unit for absolute_session_timeout. Accepted values: 'minutes', 'hours', 'days'. Responses always return 'minutes'.

  - **`idle_session_timeout`**

    `integer`, format: `int32` — The idle session timeout value. The unit is specified by idle_session_timeout_unit. Omitted when idle_session_timeout_enabled is false or policy_source is 'environment'.

  - **`idle_session_timeout_enabled`**

    `boolean` — Whether idle session timeout is enabled for this organization. Omitted when policy_source is 'environment'.

  - **`idle_session_timeout_unit`**

    `string`, possible values: `"MINUTES", "HOURS", "DAYS"` — Unit for idle_session_timeout. Accepted values: 'minutes', 'hours', 'days'. Responses always return 'minutes'.

  - **`policy_source`**

    `string`, possible values: `"APPLICATION", "CUSTOM"` — Policy source. 'APPLICATION' means the organization inherits the application-level session policy. 'CUSTOM' means organization-specific timeout values are active.

**Example:**

```json
{
  "policy": {
    "absolute_session_timeout": 360,
    "absolute_session_timeout_unit": "minutes",
    "idle_session_timeout": 84,
    "idle_session_timeout_enabled": true,
    "idle_session_timeout_unit": "minutes",
    "policy_source": "CUSTOM"
  }
}
```

##### Status: 404 Organization not found.

###### Content-Type: application/json

**Example:**

```json
null
```

### Upsert organization user setting

- **Method:** `PATCH`
- **Path:** `/api/v1/organizations/{organization_id}/settings/usermanagement`
- **Tags:** Organizations

Upsert user management settings for an organization

#### Request Body

##### Content-Type: application/json

- **`settings`**

  `object` — The new values for the setting fields to patch.
  - **`max_allowed_users`**

    `integer`, format: `int32` — Maximum number of users allowed in the organization. When nil (not set), there feature is not enabled. When explicitly set to zero, it also means no limit. When set to a positive integer, it enforces the maximum user limit.

**Example:**

```json
{
  "settings": {
    "max_allowed_users": 100
  }
}
```

#### Responses

##### Status: 200 Returns the updated organization setting.

###### Content-Type: application/json

- **`settings`**

  `object` — The updated setting.
  - **`max_allowed_users`**

    `integer`, format: `int32` — Maximum number of users allowed in the organization. When nil (not set), there feature is not enabled. When explicitly set to zero, it also means no limit. When set to a positive integer, it enforces the maximum user limit.

**Example:**

```json
{
  "settings": {
    "max_allowed_users": 100
  }
}
```

### List organization users

- **Method:** `GET`
- **Path:** `/api/v1/organizations/{organization_id}/users`
- **Tags:** Users

Retrieves a paginated list of all users who are members of the specified organization. Use this endpoint to view all users with access to a particular organization, including their roles, metadata, and membership details. Supports pagination for large user lists.

#### Responses

##### Status: 200 Successfully retrieved the list of users in the organization

###### Content-Type: application/json

- **`next_page_token`**

  `string` — Opaque token for retrieving the next page of results. Empty if there are no more pages.

- **`prev_page_token`**

  `string` — Opaque token for retrieving the previous page of results. Empty for the first page.

- **`total_size`**

  `integer`, format: `int64` — Total number of users matching the request criteria, regardless of pagination.

- **`users`**

  `array` — List of user objects for the current page. May contain fewer entries than requested page_size.

  **Items:**
  - **`create_time`**

    `string`, format: `date-time` — Timestamp when the user account was initially created. Automatically set by the server.

  - **`email`**

    `string` — Primary email address for the user. Must be unique across the environment and valid per RFC 5322.

  - **`external_id`**

    `string` — Your application's unique identifier for this organization, used to link Scalekit with your system.

  - **`id`**

    `string` — Unique system-generated identifier for the user. Immutable once created.

  - **`last_login_time`**

    `string`, format: `date-time` — Timestamp of the user's most recent successful authentication. Updated automatically.

  - **`memberships`**

    `array` — List of organization memberships. Automatically populated based on group assignments.

    **Items:**
    - **`accepted_at`**

      `string`, format: `date-time` — Timestamp when the user accepted the invitation.

    - **`created_at`**

      `string`, format: `date-time` — Timestamp when the invitation was created.

    - **`display_name`**

      `string` — Organization display name. This field stores a user-friendly name for the organization that may be different from the formal name, often used for UI display purposes.

    - **`expires_at`**

      `string`, format: `date-time` — Timestamp when the invitation expired.

    - **`inviter_email`**

      `string` — ID of the user who invited this user.

    - **`join_time`**

      `string`, format: `date-time` — Timestamp when the membership was created. Automatically set by the server.

    - **`membership_status`**

      `string`, possible values: `"ACTIVE", "INACTIVE", "PENDING_INVITE", "INVITE_EXPIRED"`

    - **`metadata`**

      `object` — Custom key-value pairs for storing additional user context. Keys (3-25 chars), values (1-256 chars).

    - **`name`**

      `string` — Organization name. This field stores the formal organization name used for identification and display purposes.

    - **`organization_id`**

      `string` — Unique identifier for the organization. Immutable and read-only.

    - **`permissions`**

      `array` — Effective permissions granted to the user within the organization (including inherited permissions from assigned roles). Lists the specific actions and access rights the user can perform.

      **Items:**

      `string`

    - **`provisioning_method`**

      `string` — How the user was provisioned. Possible values: - \`jit_using_sso\` (Just-in-time provisioning during SSO login) - \`allowed_email_domain\` (User joined via allowed email domain matching) - \`org_creator\` (User created the organization) - \`direct_provision\` (User was directly provisioned via API or SCIM) - \`invitation\` (User was invited and accepted an invitation)

    - **`roles`**

      `array`

      **Items:**
      - **`display_name`**

        `string` — Human-readable name for the role

      - **`id`**

        `string` — Role ID

      - **`name`**

        `string` — Attribute name/identifier for the role used in system operations and API calls. This should be a machine-readable identifier that follows naming conventions.

  - **`metadata`**

    `object` — Custom key-value pairs for storing additional user context. Keys (3-25 chars), values (1-256 chars).

  - **`update_time`**

    `string`, format: `date-time` — Timestamp of the last modification to the user account. Automatically updated by the server.

  - **`user_profile`**

    `object` — User's personal information including name, address, and other profile attributes.
    - **`custom_attributes`**

      `object` — Custom attributes for extended user profile data and application-specific information. This field stores business-specific user data like department, job title, security clearances, project assignments, or any other organizational attributes your application requires. Unlike system metadata, these attributes are typically managed by administrators or applications and are visible to end users for personalization and business logic. Keys must be 3-25 characters, values must be 1-256 characters, with a maximum of 20 key-value pairs.

    - **`email_verified`**

      `boolean` — Indicates if the user's email address has been verified. Automatically updated by the system.

    - **`external_identities`**

      `array` — List of external identity connections associated with the user profile.

      **Items:**
      - **`connection_id`**

        `string` — Unique identifier for the external identity connection. Immutable and read-only.

      - **`connection_provider`**

        `string`, possible values: `"OKTA", "GOOGLE", "MICROSOFT_AD", "AUTH0", "ONELOGIN", "PING_IDENTITY", "JUMPCLOUD", "CUSTOM", "GITHUB", "GITLAB", "LINKEDIN", "SALESFORCE", "MICROSOFT", "IDP_SIMULATOR", "SCALEKIT", "ADFS"` — Type of the identity provider.

      - **`connection_type`**

        `string` — Name of the external identity connection.

      - **`connection_user_id`**

        `string` — Unique identifier for the user in the external identity provider system. Immutable and read-only.

      - **`created_time`**

        `string`, format: `date-time` — Timestamp when this external identity connection was first created. Immutable and read-only.

      - **`is_social`**

        `boolean` — Indicates if the identity provider is a social provider (true) or enterprise/custom provider (false). Read-only.

      - **`last_login_time`**

        `string`, format: `date-time` — Timestamp of the user's last successful login via this external identity provider. Automatically updated by the system.

      - **`last_synced_time`**

        `string`, format: `date-time` — Timestamp of the last data synchronization for this external identity from the provider. Automatically updated by the system.

    - **`family_name`**

      `string` — The user's family name (last name or surname). This field stores the user's last name and is combined with the given name to create the full display name. The family name is used in formal communications, user listings, and organizational directories throughout the system. Maximum 255 characters allowed.

    - **`gender`**

      `string` — The user's gender identity information. This field stores the user's gender identity for personalization, compliance reporting, or organizational analytics purposes. This field supports any string value to accommodate diverse gender identities and should be handled with appropriate privacy considerations according to your organization's policies and applicable regulations.

    - **`given_name`**

      `string` — The user's given name (first name). This field stores the user's first name and is used for personalization, display purposes, and when generating the full display name. The given name appears in user interfaces, formal communications, and user listings throughout the system. Maximum 255 characters allowed.

    - **`groups`**

      `array` — The list of group names the user belongs to within the organization. This field stores the user's group memberships for role-based access control, team assignments, and organizational structure. Groups are typically used for permission management, collaborative access, and organizational hierarchy. Each group name represents a distinct organizational unit or team that the user is associated with.

      **Items:**

      `string`

    - **`id`**

      `string` — Unique system-generated identifier for the user profile. Immutable and read-only.

    - **`locale`**

      `string` — The user's preferred language and region settings using BCP-47 format codes. This field customizes the user's experience with localized content, date formats, number formatting, and UI language throughout the system. When not specified, the user inherits the organization's default locale settings. Common values include \`en-US\`, \`en-GB\`, \`fr-FR\`, \`de-DE\`, and \`es-ES\`.

    - **`metadata`**

      `object` — Raw attributes received from identity providers during authentication. This field stores the original user profile data as received from external IdP systems (SAML, OIDC, etc.) including provider-specific claims and attributes. These fields preserve the complete set of attributes received from the identity source and are used for mapping, synchronization, and audit purposes. Keys must be 3-25 characters, values must be 1-256 characters, with a maximum of 20 key-value pairs.

    - **`name`**

      `string` — The user's complete display name in formatted form. This field stores the full name as a single string and is typically used when you want to set the complete name rather than using separate given and family names. This name appears in user interfaces, reports, directory listings, and anywhere a formatted display name is needed. This field serves as a formatted display name that complements the individual given_name and family_name fields.

    - **`phone_number`**

      `string` — The user's phone number in E.164 international format. This field stores the phone number for user contact and identification purposes. The phone number must include the country code and be formatted according to E.164 standards (e.g., \`+1\` for US numbers). This field is optional.

    - **`phone_number_verified`**

      `boolean` — Indicates if the user's phone number has been verified. Automatically updated by the system.

    - **`picture`**

      `string` — The URL to the user's profile picture or avatar image. This field stores the location of the user's profile photo that appears in user interfaces, directory listings, and collaborative features throughout the system. The URL should point to a publicly accessible image file. Supported formats typically include JPEG, PNG, and GIF. This image is used for visual identification and personalization across the platform.

    - **`preferred_username`**

      `string` — The user's preferred username for display and identification purposes. This field stores a custom username that the user prefers to be known by, which may differ from their email or formal name. This username appears in user interfaces, mentions, informal communications, and collaborative features throughout the system. Maximum 512 characters allowed.

**Example:**

```json
{
  "next_page_token": "eyJwYWdlIjogMiwgImxhc3RfaWQiOiAidXNyXzEyMzQ1In0=",
  "prev_page_token": "eyJwYWdlIjogMCwgImZpcnN0X2lkIjogInVzcl85ODc2NSJ9",
  "total_size": 1042,
  "users": [
    {
      "create_time": "",
      "email": "user@example.com",
      "external_id": "ext_12345a67b89c",
      "id": "usr_1234abcd5678efgh",
      "last_login_time": "",
      "memberships": [{}],
      "metadata": {
        "department": "engineering",
        "location": "nyc-office"
      },
      "update_time": "",
      "user_profile": null
    }
  ]
}
```

### Create new user in organization

- **Method:** `POST`
- **Path:** `/api/v1/organizations/{organization_id}/users`
- **Tags:** Users

Creates a new user account and immediately adds them to the specified organization. Use this endpoint when you want to create a user and grant them access to an organization in a single operation. You can provide user profile information, assign roles, and configure membership metadata. The user receives an activation email unless this feature is disabled in the organization settings.

#### Request Body

##### Content-Type: application/json

- **`email`**

  `string` — Primary email address for the user. Must be unique across the environment and valid per RFC 5322.

- **`external_id`**

  `string` — Your application's unique identifier for this organization, used to link Scalekit with your system.

- **`membership`**

  `object` — List of organization memberships. Automatically populated based on group assignments.
  - **`inviter_email`**

    `string` — Email address of the user who invited this member. Must be a valid email address.

  - **`metadata`**

    `object` — Custom key-value pairs for storing additional user context. Keys (3-25 chars), values (1-256 chars).

  - **`roles`**

    `array` — Role to assign to the user within the organization

    **Items:**
    - **`display_name`**

      `string` — Human-readable name for the role

    - **`id`**

      `string` — Role ID

    - **`name`**

      `string` — Attribute name/identifier for the role used in system operations and API calls. This should be a machine-readable identifier that follows naming conventions.

- **`metadata`**

  `object` — Custom key-value pairs for storing additional user context. Keys (3-25 chars), values (1-256 chars).

- **`user_profile`**

  `object` — User's personal information including name, address, and other profile attributes.
  - **`custom_attributes`**

    `object` — Custom attributes for extended user profile data. Keys (3-25 chars), values (1-256 chars).

  - **`family_name`**

    `string` — User's family name. Maximum 255 characters.

  - **`gender`**

    `string` — User's gender identity.

  - **`given_name`**

    `string` — User's given name. Maximum 255 characters.

  - **`groups`**

    `array` — List of group names the user belongs to. Each group name must be 1-250 characters

    **Items:**

    `string`

  - **`locale`**

    `string` — User's localization preference in BCP-47 format. Defaults to organization settings.

  - **`metadata`**

    `object` — System-managed key-value pairs for internal tracking. Keys (3-25 chars), values (1-256 chars).

  - **`name`**

    `string` — Full name in display format. Typically combines first_name and last_name.

  - **`phone_number`**

    `string` — Phone number in E.164 international format. Required for SMS-based authentication.

  - **`picture`**

    `string` — URL to the user's profile picture or avatar.

  - **`preferred_username`**

    `string` — User's preferred username for display purposes.

**Example:**

```json
{
  "email": "user@example.com",
  "external_id": "ext_12345a67b89c",
  "membership": {
    "inviter_email": "john.doe@example.com",
    "metadata": {
      "department": "engineering",
      "location": "nyc-office"
    },
    "roles": [
      {
        "name": "admin"
      }
    ]
  },
  "metadata": {
    "department": "engineering",
    "location": "nyc-office"
  },
  "user_profile": {
    "custom_attributes": {
      "department": "engineering",
      "security_clearance": "level2"
    },
    "family_name": "Doe",
    "gender": "male",
    "given_name": "John",
    "groups": ["engineering", "managers"],
    "locale": "en-US",
    "metadata": {
      "account_status": "active",
      "signup_source": "mobile_app"
    },
    "name": "John Michael Doe",
    "phone_number": "+14155552671",
    "picture": "https://example.com/avatar.jpg",
    "preferred_username": "John Michael Doe"
  }
}
```

#### Responses

##### Status: 201 User created successfully. Returns the created user object, including system-generated identifiers and timestamps

###### Content-Type: application/json

- **`user`**

  `object`
  - **`create_time`**

    `string`, format: `date-time` — Timestamp when the user account was initially created. Automatically set by the server.

  - **`email`**

    `string` — Primary email address for the user. Must be unique across the environment and valid per RFC 5322.

  - **`external_id`**

    `string` — Your application's unique identifier for this organization, used to link Scalekit with your system.

  - **`id`**

    `string` — Unique system-generated identifier for the user. Immutable once created.

  - **`last_login_time`**

    `string`, format: `date-time` — Timestamp of the user's most recent successful authentication. Updated automatically.

  - **`memberships`**

    `array` — List of organization memberships. Automatically populated based on group assignments.

    **Items:**
    - **`accepted_at`**

      `string`, format: `date-time` — Timestamp when the user accepted the invitation.

    - **`created_at`**

      `string`, format: `date-time` — Timestamp when the invitation was created.

    - **`display_name`**

      `string` — Organization display name. This field stores a user-friendly name for the organization that may be different from the formal name, often used for UI display purposes.

    - **`expires_at`**

      `string`, format: `date-time` — Timestamp when the invitation expired.

    - **`inviter_email`**

      `string` — ID of the user who invited this user.

    - **`join_time`**

      `string`, format: `date-time` — Timestamp when the membership was created. Automatically set by the server.

    - **`membership_status`**

      `string`, possible values: `"ACTIVE", "INACTIVE", "PENDING_INVITE", "INVITE_EXPIRED"`

    - **`metadata`**

      `object` — Custom key-value pairs for storing additional user context. Keys (3-25 chars), values (1-256 chars).

    - **`name`**

      `string` — Organization name. This field stores the formal organization name used for identification and display purposes.

    - **`organization_id`**

      `string` — Unique identifier for the organization. Immutable and read-only.

    - **`permissions`**

      `array` — Effective permissions granted to the user within the organization (including inherited permissions from assigned roles). Lists the specific actions and access rights the user can perform.

      **Items:**

      `string`

    - **`provisioning_method`**

      `string` — How the user was provisioned. Possible values: - \`jit_using_sso\` (Just-in-time provisioning during SSO login) - \`allowed_email_domain\` (User joined via allowed email domain matching) - \`org_creator\` (User created the organization) - \`direct_provision\` (User was directly provisioned via API or SCIM) - \`invitation\` (User was invited and accepted an invitation)

    - **`roles`**

      `array`

      **Items:**
      - **`display_name`**

        `string` — Human-readable name for the role

      - **`id`**

        `string` — Role ID

      - **`name`**

        `string` — Attribute name/identifier for the role used in system operations and API calls. This should be a machine-readable identifier that follows naming conventions.

  - **`metadata`**

    `object` — Custom key-value pairs for storing additional user context. Keys (3-25 chars), values (1-256 chars).

  - **`update_time`**

    `string`, format: `date-time` — Timestamp of the last modification to the user account. Automatically updated by the server.

  - **`user_profile`**

    `object` — User's personal information including name, address, and other profile attributes.
    - **`custom_attributes`**

      `object` — Custom attributes for extended user profile data and application-specific information. This field stores business-specific user data like department, job title, security clearances, project assignments, or any other organizational attributes your application requires. Unlike system metadata, these attributes are typically managed by administrators or applications and are visible to end users for personalization and business logic. Keys must be 3-25 characters, values must be 1-256 characters, with a maximum of 20 key-value pairs.

    - **`email_verified`**

      `boolean` — Indicates if the user's email address has been verified. Automatically updated by the system.

    - **`external_identities`**

      `array` — List of external identity connections associated with the user profile.

      **Items:**
      - **`connection_id`**

        `string` — Unique identifier for the external identity connection. Immutable and read-only.

      - **`connection_provider`**

        `string`, possible values: `"OKTA", "GOOGLE", "MICROSOFT_AD", "AUTH0", "ONELOGIN", "PING_IDENTITY", "JUMPCLOUD", "CUSTOM", "GITHUB", "GITLAB", "LINKEDIN", "SALESFORCE", "MICROSOFT", "IDP_SIMULATOR", "SCALEKIT", "ADFS"` — Type of the identity provider.

      - **`connection_type`**

        `string` — Name of the external identity connection.

      - **`connection_user_id`**

        `string` — Unique identifier for the user in the external identity provider system. Immutable and read-only.

      - **`created_time`**

        `string`, format: `date-time` — Timestamp when this external identity connection was first created. Immutable and read-only.

      - **`is_social`**

        `boolean` — Indicates if the identity provider is a social provider (true) or enterprise/custom provider (false). Read-only.

      - **`last_login_time`**

        `string`, format: `date-time` — Timestamp of the user's last successful login via this external identity provider. Automatically updated by the system.

      - **`last_synced_time`**

        `string`, format: `date-time` — Timestamp of the last data synchronization for this external identity from the provider. Automatically updated by the system.

    - **`family_name`**

      `string` — The user's family name (last name or surname). This field stores the user's last name and is combined with the given name to create the full display name. The family name is used in formal communications, user listings, and organizational directories throughout the system. Maximum 255 characters allowed.

    - **`gender`**

      `string` — The user's gender identity information. This field stores the user's gender identity for personalization, compliance reporting, or organizational analytics purposes. This field supports any string value to accommodate diverse gender identities and should be handled with appropriate privacy considerations according to your organization's policies and applicable regulations.

    - **`given_name`**

      `string` — The user's given name (first name). This field stores the user's first name and is used for personalization, display purposes, and when generating the full display name. The given name appears in user interfaces, formal communications, and user listings throughout the system. Maximum 255 characters allowed.

    - **`groups`**

      `array` — The list of group names the user belongs to within the organization. This field stores the user's group memberships for role-based access control, team assignments, and organizational structure. Groups are typically used for permission management, collaborative access, and organizational hierarchy. Each group name represents a distinct organizational unit or team that the user is associated with.

      **Items:**

      `string`

    - **`id`**

      `string` — Unique system-generated identifier for the user profile. Immutable and read-only.

    - **`locale`**

      `string` — The user's preferred language and region settings using BCP-47 format codes. This field customizes the user's experience with localized content, date formats, number formatting, and UI language throughout the system. When not specified, the user inherits the organization's default locale settings. Common values include \`en-US\`, \`en-GB\`, \`fr-FR\`, \`de-DE\`, and \`es-ES\`.

    - **`metadata`**

      `object` — Raw attributes received from identity providers during authentication. This field stores the original user profile data as received from external IdP systems (SAML, OIDC, etc.) including provider-specific claims and attributes. These fields preserve the complete set of attributes received from the identity source and are used for mapping, synchronization, and audit purposes. Keys must be 3-25 characters, values must be 1-256 characters, with a maximum of 20 key-value pairs.

    - **`name`**

      `string` — The user's complete display name in formatted form. This field stores the full name as a single string and is typically used when you want to set the complete name rather than using separate given and family names. This name appears in user interfaces, reports, directory listings, and anywhere a formatted display name is needed. This field serves as a formatted display name that complements the individual given_name and family_name fields.

    - **`phone_number`**

      `string` — The user's phone number in E.164 international format. This field stores the phone number for user contact and identification purposes. The phone number must include the country code and be formatted according to E.164 standards (e.g., \`+1\` for US numbers). This field is optional.

    - **`phone_number_verified`**

      `boolean` — Indicates if the user's phone number has been verified. Automatically updated by the system.

    - **`picture`**

      `string` — The URL to the user's profile picture or avatar image. This field stores the location of the user's profile photo that appears in user interfaces, directory listings, and collaborative features throughout the system. The URL should point to a publicly accessible image file. Supported formats typically include JPEG, PNG, and GIF. This image is used for visual identification and personalization across the platform.

    - **`preferred_username`**

      `string` — The user's preferred username for display and identification purposes. This field stores a custom username that the user prefers to be known by, which may differ from their email or formal name. This username appears in user interfaces, mentions, informal communications, and collaborative features throughout the system. Maximum 512 characters allowed.

**Example:**

```json
{
  "user": {
    "create_time": "",
    "email": "user@example.com",
    "external_id": "ext_12345a67b89c",
    "id": "usr_1234abcd5678efgh",
    "last_login_time": "",
    "memberships": [{}],
    "metadata": {
      "department": "engineering",
      "location": "nyc-office"
    },
    "update_time": "",
    "user_profile": null
  }
}
```

### List user permissions

- **Method:** `GET`
- **Path:** `/api/v1/organizations/{organization_id}/users/{user_id}/permissions`
- **Tags:** Users

Retrieves all permissions a user has access to within a specific organization. This includes permissions from direct role assignments and inherited permissions from role hierarchy.

#### Responses

##### Status: 200 Successfully retrieved the list of permissions for the user

###### Content-Type: application/json

- **`permissions`**

  `array` — List of permissions the user has access to

  **Items:**
  - **`description`**

    `string` — Description of what the permission allows

  - **`id`**

    `string` — Unique identifier for the permission

  - **`name`**

    `string` — Unique name identifier for the permission

**Example:**

```json
{
  "permissions": [
    {
      "description": "Allows creating new user accounts",
      "id": "perm_1234abcd5678efgh",
      "name": "users:create"
    }
  ]
}
```

### List user roles

- **Method:** `GET`
- **Path:** `/api/v1/organizations/{organization_id}/users/{user_id}/roles`
- **Tags:** Users

Retrieves all roles assigned to a user within a specific organization. This includes both direct role assignments and inherited roles from role hierarchy.

#### Responses

##### Status: 200 Successfully retrieved the list of roles assigned to the user

###### Content-Type: application/json

- **`roles`**

  `array` — List of roles assigned to the user

  **Items:**
  - **`display_name`**

    `string` — Human-readable name for the role

  - **`id`**

    `string` — Role ID

  - **`name`**

    `string` — Attribute name/identifier for the role used in system operations and API calls. This should be a machine-readable identifier that follows naming conventions.

**Example:**

```json
{
  "roles": [
    {
      "display_name": "Dev Team",
      "id": "role_79643236410327240",
      "name": "team_dev"
    }
  ]
}
```

### Search organization users

- **Method:** `GET`
- **Path:** `/api/v1/organizations/{organization_id}/users:search`
- **Tags:** Users

Searches for users within a specific organization by email address, user ID, or external ID. The query must be at least 3 characters and is case-insensitive. Scopes results strictly to the given organization. Returns a paginated list of matching users with up to 30 results per page. Use the next_page_token from the response to retrieve subsequent pages.

#### Responses

##### Status: 200 Matching users within the organization returned; includes pagination cursors for navigating large result sets.

###### Content-Type: application/json

- **`next_page_token`**

  `string` — Token for retrieving the next page of results. Empty if there are no more pages.

- **`prev_page_token`**

  `string` — Token for retrieving the previous page of results. Empty if this is the first page.

- **`total_size`**

  `integer`, format: `int64` — Total number of users matching the request criteria, regardless of pagination.

- **`users`**

  `array` — List of matching users.

  **Items:**
  - **`create_time`**

    `string`, format: `date-time` — Timestamp when the user account was initially created. Automatically set by the server.

  - **`email`**

    `string` — Primary email address for the user. Must be unique across the environment and valid per RFC 5322.

  - **`external_id`**

    `string` — Your application's unique identifier for this organization, used to link Scalekit with your system.

  - **`id`**

    `string` — Unique system-generated identifier for the user. Immutable once created.

  - **`last_login_time`**

    `string`, format: `date-time` — Timestamp of the user's most recent successful authentication. Updated automatically.

  - **`memberships`**

    `array` — List of organization memberships. Automatically populated based on group assignments.

    **Items:**
    - **`accepted_at`**

      `string`, format: `date-time` — Timestamp when the user accepted the invitation.

    - **`created_at`**

      `string`, format: `date-time` — Timestamp when the invitation was created.

    - **`display_name`**

      `string` — Organization display name. This field stores a user-friendly name for the organization that may be different from the formal name, often used for UI display purposes.

    - **`expires_at`**

      `string`, format: `date-time` — Timestamp when the invitation expired.

    - **`inviter_email`**

      `string` — ID of the user who invited this user.

    - **`join_time`**

      `string`, format: `date-time` — Timestamp when the membership was created. Automatically set by the server.

    - **`membership_status`**

      `string`, possible values: `"ACTIVE", "INACTIVE", "PENDING_INVITE", "INVITE_EXPIRED"`

    - **`metadata`**

      `object` — Custom key-value pairs for storing additional user context. Keys (3-25 chars), values (1-256 chars).

    - **`name`**

      `string` — Organization name. This field stores the formal organization name used for identification and display purposes.

    - **`organization_id`**

      `string` — Unique identifier for the organization. Immutable and read-only.

    - **`permissions`**

      `array` — Effective permissions granted to the user within the organization (including inherited permissions from assigned roles). Lists the specific actions and access rights the user can perform.

      **Items:**

      `string`

    - **`provisioning_method`**

      `string` — How the user was provisioned. Possible values: - \`jit_using_sso\` (Just-in-time provisioning during SSO login) - \`allowed_email_domain\` (User joined via allowed email domain matching) - \`org_creator\` (User created the organization) - \`direct_provision\` (User was directly provisioned via API or SCIM) - \`invitation\` (User was invited and accepted an invitation)

    - **`roles`**

      `array`

      **Items:**
      - **`display_name`**

        `string` — Human-readable name for the role

      - **`id`**

        `string` — Role ID

      - **`name`**

        `string` — Attribute name/identifier for the role used in system operations and API calls. This should be a machine-readable identifier that follows naming conventions.

  - **`metadata`**

    `object` — Custom key-value pairs for storing additional user context. Keys (3-25 chars), values (1-256 chars).

  - **`update_time`**

    `string`, format: `date-time` — Timestamp of the last modification to the user account. Automatically updated by the server.

  - **`user_profile`**

    `object` — User's personal information including name, address, and other profile attributes.
    - **`custom_attributes`**

      `object` — Custom attributes for extended user profile data and application-specific information. This field stores business-specific user data like department, job title, security clearances, project assignments, or any other organizational attributes your application requires. Unlike system metadata, these attributes are typically managed by administrators or applications and are visible to end users for personalization and business logic. Keys must be 3-25 characters, values must be 1-256 characters, with a maximum of 20 key-value pairs.

    - **`email_verified`**

      `boolean` — Indicates if the user's email address has been verified. Automatically updated by the system.

    - **`external_identities`**

      `array` — List of external identity connections associated with the user profile.

      **Items:**
      - **`connection_id`**

        `string` — Unique identifier for the external identity connection. Immutable and read-only.

      - **`connection_provider`**

        `string`, possible values: `"OKTA", "GOOGLE", "MICROSOFT_AD", "AUTH0", "ONELOGIN", "PING_IDENTITY", "JUMPCLOUD", "CUSTOM", "GITHUB", "GITLAB", "LINKEDIN", "SALESFORCE", "MICROSOFT", "IDP_SIMULATOR", "SCALEKIT", "ADFS"` — Type of the identity provider.

      - **`connection_type`**

        `string` — Name of the external identity connection.

      - **`connection_user_id`**

        `string` — Unique identifier for the user in the external identity provider system. Immutable and read-only.

      - **`created_time`**

        `string`, format: `date-time` — Timestamp when this external identity connection was first created. Immutable and read-only.

      - **`is_social`**

        `boolean` — Indicates if the identity provider is a social provider (true) or enterprise/custom provider (false). Read-only.

      - **`last_login_time`**

        `string`, format: `date-time` — Timestamp of the user's last successful login via this external identity provider. Automatically updated by the system.

      - **`last_synced_time`**

        `string`, format: `date-time` — Timestamp of the last data synchronization for this external identity from the provider. Automatically updated by the system.

    - **`family_name`**

      `string` — The user's family name (last name or surname). This field stores the user's last name and is combined with the given name to create the full display name. The family name is used in formal communications, user listings, and organizational directories throughout the system. Maximum 255 characters allowed.

    - **`gender`**

      `string` — The user's gender identity information. This field stores the user's gender identity for personalization, compliance reporting, or organizational analytics purposes. This field supports any string value to accommodate diverse gender identities and should be handled with appropriate privacy considerations according to your organization's policies and applicable regulations.

    - **`given_name`**

      `string` — The user's given name (first name). This field stores the user's first name and is used for personalization, display purposes, and when generating the full display name. The given name appears in user interfaces, formal communications, and user listings throughout the system. Maximum 255 characters allowed.

    - **`groups`**

      `array` — The list of group names the user belongs to within the organization. This field stores the user's group memberships for role-based access control, team assignments, and organizational structure. Groups are typically used for permission management, collaborative access, and organizational hierarchy. Each group name represents a distinct organizational unit or team that the user is associated with.

      **Items:**

      `string`

    - **`id`**

      `string` — Unique system-generated identifier for the user profile. Immutable and read-only.

    - **`locale`**

      `string` — The user's preferred language and region settings using BCP-47 format codes. This field customizes the user's experience with localized content, date formats, number formatting, and UI language throughout the system. When not specified, the user inherits the organization's default locale settings. Common values include \`en-US\`, \`en-GB\`, \`fr-FR\`, \`de-DE\`, and \`es-ES\`.

    - **`metadata`**

      `object` — Raw attributes received from identity providers during authentication. This field stores the original user profile data as received from external IdP systems (SAML, OIDC, etc.) including provider-specific claims and attributes. These fields preserve the complete set of attributes received from the identity source and are used for mapping, synchronization, and audit purposes. Keys must be 3-25 characters, values must be 1-256 characters, with a maximum of 20 key-value pairs.

    - **`name`**

      `string` — The user's complete display name in formatted form. This field stores the full name as a single string and is typically used when you want to set the complete name rather than using separate given and family names. This name appears in user interfaces, reports, directory listings, and anywhere a formatted display name is needed. This field serves as a formatted display name that complements the individual given_name and family_name fields.

    - **`phone_number`**

      `string` — The user's phone number in E.164 international format. This field stores the phone number for user contact and identification purposes. The phone number must include the country code and be formatted according to E.164 standards (e.g., \`+1\` for US numbers). This field is optional.

    - **`phone_number_verified`**

      `boolean` — Indicates if the user's phone number has been verified. Automatically updated by the system.

    - **`picture`**

      `string` — The URL to the user's profile picture or avatar image. This field stores the location of the user's profile photo that appears in user interfaces, directory listings, and collaborative features throughout the system. The URL should point to a publicly accessible image file. Supported formats typically include JPEG, PNG, and GIF. This image is used for visual identification and personalization across the platform.

    - **`preferred_username`**

      `string` — The user's preferred username for display and identification purposes. This field stores a custom username that the user prefers to be known by, which may differ from their email or formal name. This username appears in user interfaces, mentions, informal communications, and collaborative features throughout the system. Maximum 512 characters allowed.

**Example:**

```json
{
  "next_page_token": "eyJwYWdlIjogMiwgImxhc3RfaWQiOiAidXNyXzEyMzQ1In0=",
  "prev_page_token": "eyJwYWdlIjogMCwgImZpcnN0X2lkIjogInVzcl85ODc2NSJ9",
  "total_size": 1042,
  "users": [
    {
      "create_time": "",
      "email": "user@example.com",
      "external_id": "ext_12345a67b89c",
      "id": "usr_1234abcd5678efgh",
      "last_login_time": "",
      "memberships": [{}],
      "metadata": {
        "department": "engineering",
        "location": "nyc-office"
      },
      "update_time": "",
      "user_profile": null
    }
  ]
}
```

##### Status: 400 Bad Request - query must be at least 3 characters and no more than 100 characters, and organization_id must be a valid org\_ prefixed identifier.

###### Content-Type: application/json

**Example:**

```json
null
```

##### Status: 404 Not Found - organization not found.

###### Content-Type: application/json

**Example:**

```json
null
```

### Get organization details by external Id

- **Method:** `GET`
- **Path:** `/api/v1/organizations:external/{external_id}`
- **Tags:** Organizations

Retrieves organization details by external ID, including name, region, metadata, and settings. Only provide external_id in the path. If the id query parameter is also supplied, it silently takes precedence over external_id due to protobuf oneof semantics, which causes the request to fail with a 400 Bad Request ('ExternalId is required').

#### Responses

##### Status: 200 Returns the complete organization object with ID, display name, settings, external ID and metadata

###### Content-Type: application/json

- **`organization`**

  `object` — The newly created organization
  - **`create_time` (required)**

    `string`, format: `date-time` — Timestamp when the organization was created

  - **`display_name`**

    `string` — Name of the organization. Must be between 1 and 200 characters

  - **`external_id`**

    `string` — Your application's unique identifier for this organization, used to link Scalekit with your system.

  - **`id`**

    `string` — Unique scalekit-generated identifier that uniquely references an organization

  - **`logo_url`**

    `string`, format: `uri` — HTTPS URL of the organization's logo image. Maximum 1024 characters. Must use the https scheme.

  - **`metadata`**

    `object` — Key value pairs extension attributes.

  - **`region_code`**

    `string`, possible values: `"US", "EU"` — Geographic region code for the organization. Currently limited to US.

  - **`settings`**

    `object` — Configuration options that control organization-level features and capabilities
    - **`features`**

      `array` — List of feature toggles that control organization capabilities such as SSO authentication and directory synchronization

      **Items:**
      - **`enabled` (required)**

        `boolean` — Whether the feature is enabled (true) or disabled (false) for this organization

      - **`name` (required)**

        `string` — Feature identifier. Supported values include: "sso" (Single Sign-On), "directory_sync" (Directory Synchronization), "domain_verification" (Domain Verification), "session_policy" (Organization-level session policy override)

  - **`slug`**

    `string` — Slug for dynamic redirect URI resolution. A single DNS label (e.g. acme) or hostname (e.g. oauth.pstmn.io). Lowercase alphanumeric, hyphens, and dots. Max 253 chars. Unique per environment.

  - **`update_time`**

    `string`, format: `date-time` — Timestamp when the organization was last updated

**Example:**

```json
{
  "organization": {
    "create_time": "2025-02-15T06:23:44.560000Z",
    "display_name": "Megasoft",
    "external_id": "my_unique_id",
    "id": "org_59615193906282635",
    "logo_url": "https://cdn.example.com/acme-logo.png",
    "metadata": {
      "additionalProperty": ""
    },
    "region_code": "US",
    "settings": null,
    "slug": "acme",
    "update_time": "2025-02-15T06:23:44.560000Z"
  }
}
```

##### Status: 400 Invalid request - external ID is empty or the caller's organization claim does not match

###### Content-Type: application/json

**Example:**

```json
null
```

##### Status: 404 Organization not found - no organization exists with the specified external ID

###### Content-Type: application/json

**Example:**

```json
null
```

### Resend passwordless email

- **Method:** `POST`
- **Path:** `/api/v1/passwordless/email/resend`
- **Tags:** Magic link & OTP

Resend a verification email if the user didn't receive it or if the previous code/link has expired

#### Request Body

##### Content-Type: application/json

- **`auth_request_id`**

  `string` — The authentication request identifier from the original send passwordless email request. Use this to resend the Verification Code (OTP) or Magic Link to the same email address.

**Example:**

```json
{
  "auth_request_id": "h5Y8kT5RVwaea5WEgW4n-6C-aO_-fuTUW7Vb9-Rh3AcY9qxZqQ"
}
```

#### Responses

##### Status: 200 Successfully resent the passwordless authentication email. Returns updated authentication request details with new expiration time.

###### Content-Type: application/json

- **`auth_request_id`**

  `string` — Unique identifier for this passwordless authentication request. Use this ID to resend emails.

- **`expires_at`**

  `string`, format: `int64` — Unix timestamp (seconds since epoch) when the passwordless authentication will expire. After this time, the OTP or magic link will no longer be valid.

- **`expires_in`**

  `integer`, format: `int64` — Number of seconds from now until the passwordless authentication expires. This is a convenience field calculated from the expires_at timestamp.

- **`passwordless_type`**

  `string`, possible values: `"OTP", "LINK", "LINK_OTP"` — Type of passwordless authentication that was sent via email. OTP sends a numeric code, LINK sends a clickable magic link, and LINK_OTP provides both options for user convenience.

**Example:**

```json
{
  "auth_request_id": "h5Y8kT5RVwaea5WEgW4n-6C-aO_-fuTUW7Vb9-Rh3AcY9qxZqQ",
  "expires_at": 1748696575,
  "expires_in": 300,
  "passwordless_type": "OTP"
}
```

### Send passwordless email

- **Method:** `POST`
- **Path:** `/api/v1/passwordless/email/send`
- **Tags:** Magic link & OTP

Send a verification email containing either a verification code (OTP), magic link, or both to a user's email address

#### Request Body

##### Content-Type: application/json

- **`email`**

  `string` — Email address where the passwordless authentication credentials will be sent. Must be a valid email format.

- **`expires_in`**

  `integer`, format: `int64` — Time in seconds until the passwordless authentication expires. If not specified, defaults to 300 seconds (5 minutes)

- **`magiclink_auth_uri`**

  `string` — Your application's callback URL where users will be redirected after clicking the magic link in their email. The link token will be appended as a query parameter as link_token

- **`state`**

  `string` — Custom state parameter that will be returned unchanged in the verification response. Use this to maintain application state between the authentication request and callback, such as the intended destination after login

- **`template`**

  `string`, possible values: `"SIGNIN", "SIGNUP"` — Specifies the authentication intent for the passwordless request. Use SIGNIN for existing users or SIGNUP for new user registration. This affects the email template and user experience flow.

- **`template_variables`**

  `object` — A set of key-value pairs to personalize the email template. \* You may include up to 30 key-value pairs. \* The following variable names are reserved by the system and cannot be supplied: \`otp\`, \`expiry_time_relative\`, \`link\`, \`expire_time\`, \`expiry_time\`. \* Every variable referenced in your email template must be included as a key-value pair. Use these variables to insert custom information, such as a team name, URL or the user's employee ID. All variables are interpolated before the email is sent, regardless of the email provider.

**Example:**

```json
{
  "email": "john.doe@example.com",
  "expires_in": 300,
  "magiclink_auth_uri": "https://yourapp.com/auth/passwordless/callback",
  "state": "d62ivasry29lso",
  "template": "SIGNIN",
  "template_variables": {
    "custom_variable_key": "custom_variable_value"
  }
}
```

#### Responses

##### Status: 200 Successfully sent passwordless authentication email. Returns the authentication request details including expiration time and auth request ID

###### Content-Type: application/json

- **`auth_request_id`**

  `string` — Unique identifier for this passwordless authentication request. Use this ID to resend emails.

- **`expires_at`**

  `string`, format: `int64` — Unix timestamp (seconds since epoch) when the passwordless authentication will expire. After this time, the OTP or magic link will no longer be valid.

- **`expires_in`**

  `integer`, format: `int64` — Number of seconds from now until the passwordless authentication expires. This is a convenience field calculated from the expires_at timestamp.

- **`passwordless_type`**

  `string`, possible values: `"OTP", "LINK", "LINK_OTP"` — Type of passwordless authentication that was sent via email. OTP sends a numeric code, LINK sends a clickable magic link, and LINK_OTP provides both options for user convenience.

**Example:**

```json
{
  "auth_request_id": "h5Y8kT5RVwaea5WEgW4n-6C-aO_-fuTUW7Vb9-Rh3AcY9qxZqQ",
  "expires_at": 1748696575,
  "expires_in": 300,
  "passwordless_type": "OTP"
}
```

### Verify passwordless email

- **Method:** `POST`
- **Path:** `/api/v1/passwordless/email/verify`
- **Tags:** Magic link & OTP

Verify a user's identity using either a verification code or magic link token

#### Request Body

##### Content-Type: application/json

- **`auth_request_id`**

  `string` — The authentication request identifier returned from the send passwordless email endpoint. Required when verifying OTP codes to link the verification with the original request.

- **`code`**

  `string` — The Verification Code (OTP) received via email. This is typically a 6-digit numeric code that users enter manually to verify their identity.

- **`link_token`**

  `string` — The unique token from the magic link URL received via email. Extract this token when users click the magic link and are redirected to your application to later verify the user.

**Example:**

```json
{
  "auth_request_id": "h5Y8kT5RVwaea5WEgW4n-6C-aO_-fuTUW7Vb9-Rh3AcY9qxZqQ",
  "code": "123456",
  "link_token": "afe9d61c-d80d-4020-a8ee-61765ab71cb3"
}
```

#### Responses

##### Status: 200 Successfully verified the passwordless authentication. Returns user email

###### Content-Type: application/json

- **`email`**

  `string` — Email address of the successfully authenticated user. This confirms which email account was verified through the passwordless flow.

- **`passwordless_type`**

  `string`, possible values: `"OTP", "LINK", "LINK_OTP"` — The type of passwordless authentication that was successfully verified, confirming which method the user completed.

- **`state`**

  `string` — The custom state parameter that was provided in the original authentication request, returned unchanged. Use this to restore your application's context after authentication.

- **`template`**

  `string`, possible values: `"SIGNIN", "SIGNUP"` — Specifies which email template to choose. For User Signin choose SIGNIN and for User Signup use SIGNUP

**Example:**

```json
{
  "email": "john.doe@example.com",
  "passwordless_type": "OTP",
  "state": "kdt7yiag28t341fr1",
  "template": "SIGNIN"
}
```

### List all permissions

- **Method:** `GET`
- **Path:** `/api/v1/permissions`
- **Tags:** Permissions

Retrieves a comprehensive, paginated list of all permissions available within the environment. Use this endpoint to view all permission definitions for auditing, role management, or understanding the complete set of available access controls. The response includes pagination tokens to navigate through large sets of permissions efficiently. Each permission object contains the permission name, description, creation time, and last update time. This operation is useful for building permission selection interfaces, auditing permission usage, or understanding the scope of available access controls in your RBAC system.

#### Responses

##### Status: 200 Successfully retrieved the list of permissions. Returns a paginated list of permission objects with metadata and pagination tokens for navigation.

###### Content-Type: application/json

- **`next_page_token`**

  `string` — Token to retrieve next page of results

- **`permissions`**

  `array`

  **Items:**
  - **`create_time`**

    `string`, format: `date-time`

  - **`description`**

    `string`

  - **`id`**

    `string`

  - **`is_scalekit_permission`**

    `boolean` — Indicates whether this permission is predefined by Scalekit

  - **`name`**

    `string`

  - **`update_time`**

    `string`, format: `date-time`

- **`prev_page_token`**

  `string` — Token to retrieve previous page of results

- **`total_size`**

  `integer`, format: `int64` — Total number of permissions available

**Example:**

```json
{
  "next_page_token": "token_def456",
  "permissions": [
    {
      "create_time": "",
      "description": "",
      "id": "",
      "is_scalekit_permission": true,
      "name": "",
      "update_time": ""
    }
  ],
  "prev_page_token": "token_def456",
  "total_size": 150
}
```

### Create new permission

- **Method:** `POST`
- **Path:** `/api/v1/permissions`
- **Tags:** Permissions

Creates a new permission that represents a specific action users can perform within the environment. Use this endpoint to define granular access controls for your RBAC system. You can provide a unique permission name following the format 'action:resource' (for example, 'read:documents', 'write:users') and an optional description explaining the permission's purpose. The permission name must be unique across the environment and follows alphanumeric naming conventions with colons and underscores. Returns the created permission object including system-generated ID and timestamps.

#### Request Body

##### Content-Type: application/json

- **`description`**

  `string` — Description of the permission

- **`name`**

  `string` — Unique name/ID of the permission

**Example:**

```json
{
  "description": "Allows user to read documents from the system",
  "name": "read:documents"
}
```

#### Responses

##### Status: 201 Permission created successfully. Returns the complete permission object with system-generated ID, name, description, and timestamps.

###### Content-Type: application/json

- **`permission`**

  `object`
  - **`create_time`**

    `string`, format: `date-time`

  - **`description`**

    `string`

  - **`id`**

    `string`

  - **`is_scalekit_permission`**

    `boolean` — Indicates whether this permission is predefined by Scalekit

  - **`name`**

    `string`

  - **`update_time`**

    `string`, format: `date-time`

**Example:**

```json
{
  "permission": {
    "create_time": "",
    "description": "",
    "id": "",
    "is_scalekit_permission": true,
    "name": "",
    "update_time": ""
  }
}
```

### Retrieve permission details

- **Method:** `GET`
- **Path:** `/api/v1/permissions/{permission_name}`
- **Tags:** Permissions

Retrieves complete information for a specific permission by its unique name identifier. Use this endpoint to view permission details including description, creation time, and last update time. Provide the permission name in the path parameter following the format 'action:resource' (for example, 'read:documents'). This operation is useful for auditing permission definitions, understanding permission purposes, or verifying permission existence before assignment. Returns the complete permission object with all metadata and system-generated timestamps.

#### Responses

##### Status: 200 Successfully retrieved permission details. Returns the complete permission object including name, description, creation time, and update time.

###### Content-Type: application/json

- **`permission`**

  `object`
  - **`create_time`**

    `string`, format: `date-time`

  - **`description`**

    `string`

  - **`id`**

    `string`

  - **`is_scalekit_permission`**

    `boolean` — Indicates whether this permission is predefined by Scalekit

  - **`name`**

    `string`

  - **`update_time`**

    `string`, format: `date-time`

**Example:**

```json
{
  "permission": {
    "create_time": "",
    "description": "",
    "id": "",
    "is_scalekit_permission": true,
    "name": "",
    "update_time": ""
  }
}
```

### Update permission details

- **Method:** `PUT`
- **Path:** `/api/v1/permissions/{permission_name}`
- **Tags:** Permissions

Modifies an existing permission's attributes including description and metadata. Use this endpoint to update permission descriptions or clarify permission purposes after creation. The permission is identified by its unique name in the path parameter, and only the fields you specify in the request body will be updated. Note that the permission name itself cannot be changed as it serves as the immutable identifier. This operation is useful for maintaining clear documentation of permission purposes or updating descriptions to reflect changes in system functionality. Returns the updated permission object with modified timestamps.

#### Request Body

##### Content-Type: application/json

- **`description`**

  `string` — Description of the permission

- **`name`**

  `string` — Unique name/ID of the permission

**Example:**

```json
{
  "description": "Allows user to read documents from the system",
  "name": "read:documents"
}
```

#### Responses

##### Status: 200 Permission updated successfully. Returns the modified permission object with updated description and timestamps.

###### Content-Type: application/json

- **`permission`**

  `object`
  - **`create_time`**

    `string`, format: `date-time`

  - **`description`**

    `string`

  - **`id`**

    `string`

  - **`is_scalekit_permission`**

    `boolean` — Indicates whether this permission is predefined by Scalekit

  - **`name`**

    `string`

  - **`update_time`**

    `string`, format: `date-time`

**Example:**

```json
{
  "permission": {
    "create_time": "",
    "description": "",
    "id": "",
    "is_scalekit_permission": true,
    "name": "",
    "update_time": ""
  }
}
```

### Delete permission

- **Method:** `DELETE`
- **Path:** `/api/v1/permissions/{permission_name}`
- **Tags:** Permissions

Permanently removes a permission from the environment using its unique name identifier. Use this endpoint when you need to clean up unused permissions or remove access controls that are no longer relevant. The permission is identified by its name in the path parameter following the format 'action:resource'. This operation cannot be undone, so ensure no active roles depend on the permission before deletion. If the permission is currently assigned to any roles, you may need to remove those assignments first or update the roles to use alternative permissions. Returns no content on successful deletion.

#### Responses

##### Status: 200 Permission successfully deleted. No content returned.

###### Content-Type: application/json

**Example:**

```json
null
```

### List all roles in environment

- **Method:** `GET`
- **Path:** `/api/v1/roles`
- **Tags:** Roles

Retrieves a comprehensive list of all roles available within the specified environment including organization roles. Use this endpoint to view all role definitions, including custom roles and their configurations. You can optionally include permission details for each role to understand their capabilities. This is useful for role management, auditing organization access controls, or understanding the available access levels within the organization.

#### Responses

##### Status: 200 Successfully retrieved list of roles. Returns all roles with their metadata and optionally their permissions.

###### Content-Type: application/json

- **`roles`**

  `array` — List of all roles in the environment with their metadata and optionally their permissions.

  **Items:**
  - **`default_creator`**

    `boolean` — Indicates if this role is the default creator role for new organizations.

  - **`default_member`**

    `boolean` — Indicates if this role is the default member role for new users.

  - **`dependent_roles_count`**

    `integer`, format: `int32` — Number of roles that extend from this role (dependent roles count). Read-only field.

  - **`description`**

    `string` — Detailed description of the role's purpose and capabilities. Maximum 2000 characters.

  - **`display_name`**

    `string` — Human-readable display name for the role. Used in user interfaces and reports.

  - **`extends`**

    `string` — Name of the base role that this role extends. Enables hierarchical role inheritance.

  - **`id`**

    `string` — Unique system-generated identifier for the role. Immutable once created.

  - **`is_org_role`**

    `boolean` — Indicates if this role is an organization role.

  - **`name`**

    `string` — Unique name identifier for the role. Must be alphanumeric with underscores, 1-100 characters.

  - **`permissions`**

    `array` — List of permissions with role source information. Only included when 'include' parameter is specified in the request.

    **Items:**
    - **`create_time`**

      `string`, format: `date-time`

    - **`description`**

      `string`

    - **`id`**

      `string`

    - **`name`**

      `string`

    - **`role_name`**

      `string` — Name of the role from which this permission was sourced

    - **`update_time`**

      `string`, format: `date-time`

**Example:**

```json
{
  "roles": [
    {
      "display_name": "Administrator",
      "id": "role_1234abcd5678efgh",
      "name": "admin"
    },
    {
      "display_name": "Viewer",
      "id": "role_9876zyxw5432vuts",
      "name": "viewer"
    }
  ]
}
```

### Create new role in environment

- **Method:** `POST`
- **Path:** `/api/v1/roles`
- **Tags:** Roles

Creates a new role within the environment with specified permissions and metadata. Use this endpoint to define custom roles that can be assigned to users or groups. You can create hierarchical roles by extending existing roles, assign specific permissions, and configure display information. Roles are the foundation of your access control system and determine what actions users can perform.

#### Request Body

##### Content-Type: application/json

- **`description`**

  `string` — Detailed description of the role's purpose, capabilities, and intended use cases. Maximum 2000 characters.

- **`display_name`**

  `string` — Human-readable display name for the role. Used in user interfaces, reports, and user-facing communications.

- **`extends`**

  `string` — Name of the base role that this role extends. Enables hierarchical role inheritance where this role inherits all permissions from the base role.

- **`name`**

  `string` — Unique name identifier for the role. Must be alphanumeric with underscores, 1-64 characters. This name is used in API calls and cannot be changed after creation.

- **`permissions`**

  `array` — List of permission names to assign to this role. Permissions must exist in the current environment. Maximum 100 permissions per role.

  **Items:**

  `string`

**Example:**

```json
{
  "description": "Can create, edit, and publish content but cannot delete content or manage user accounts",
  "display_name": "Content Editor",
  "extends": "viewer",
  "name": "content_editor",
  "permissions": ["read:content", "write:content", "publish:content"]
}
```

#### Responses

##### Status: 201 Role created successfully. Returns the complete role object with system-generated ID and timestamps.

###### Content-Type: application/json

- **`role`**

  `object` — The created role object with system-generated ID and all configuration details.
  - **`default_creator`**

    `boolean` — Indicates if this role is the default creator role for new organizations.

  - **`default_member`**

    `boolean` — Indicates if this role is the default member role for new users.

  - **`dependent_roles_count`**

    `integer`, format: `int32` — Number of roles that extend from this role (dependent roles count). Read-only field.

  - **`description`**

    `string` — Detailed description of the role's purpose and capabilities. Maximum 2000 characters.

  - **`display_name`**

    `string` — Human-readable display name for the role. Used in user interfaces and reports.

  - **`extends`**

    `string` — Name of the base role that this role extends. Enables hierarchical role inheritance.

  - **`id`**

    `string` — Unique system-generated identifier for the role. Immutable once created.

  - **`is_org_role`**

    `boolean` — Indicates if this role is an organization role.

  - **`name`**

    `string` — Unique name identifier for the role. Must be alphanumeric with underscores, 1-100 characters.

  - **`permissions`**

    `array` — List of permissions with role source information. Only included when 'include' parameter is specified in the request.

    **Items:**
    - **`create_time`**

      `string`, format: `date-time`

    - **`description`**

      `string`

    - **`id`**

      `string`

    - **`name`**

      `string`

    - **`role_name`**

      `string` — Name of the role from which this permission was sourced

    - **`update_time`**

      `string`, format: `date-time`

**Example:**

```json
{
  "role": {
    "description": "Can edit content",
    "display_name": "Content Editor",
    "id": "role_1234abcd5678efgh",
    "name": "content_editor"
  }
}
```

### Set default creator and member roles

- **Method:** `PATCH`
- **Path:** `/api/v1/roles/default`
- **Tags:** Roles

Updates the default creator and member roles for the current environment. Use this endpoint to configure which roles are automatically assigned to new users when they join the environment. You can specify role names for both creator and member default roles. The system will validate that the specified roles exist and update the environment settings accordingly. Returns the updated default role objects including their complete role information and permissions.

#### Request Body

##### Content-Type: application/json

- **`default_creator`**

  `object` — Default creator role (deprecated - use default_creator_role field instead)
  - **`id`**

    `string`

  - **`name`**

    `string` — Unique name of the role

- **`default_creator_role`**

  `string` — Name of the role to set as the default creator role. This role will be automatically assigned to users who create new resources in the environment. Must be a valid role name that exists in the environment.

- **`default_member`**

  `object` — Default member role (deprecated - use default_member_role field instead)
  - **`id`**

    `string`

  - **`name`**

    `string` — Unique name of the role

- **`default_member_role`**

  `string` — Name of the role to set as the default member role. This role will be automatically assigned to new users when they join the environment. Must be a valid role name that exists in the environment.

**Example:**

```json
{
  "default_creator": {
    "description": "Role for creating resources",
    "display_name": "Creator Role",
    "id": "role_1234567890",
    "name": "creator"
  },
  "default_creator_role": "creator",
  "default_member": {
    "description": "Role for regular members",
    "display_name": "Member Role",
    "id": "role_0987654321",
    "name": "member"
  },
  "default_member_role": "member"
}
```

#### Responses

##### Status: 200 Default roles updated successfully

###### Content-Type: application/json

- **`default_creator`**

  `object` — The role that is now set as the default creator role for the environment. Contains complete role information including permissions and metadata.
  - **`default_creator`**

    `boolean` — Indicates if this role is the default creator role for new organizations.

  - **`default_member`**

    `boolean` — Indicates if this role is the default member role for new users.

  - **`dependent_roles_count`**

    `integer`, format: `int32` — Number of roles that extend from this role (dependent roles count). Read-only field.

  - **`description`**

    `string` — Detailed description of the role's purpose and capabilities. Maximum 2000 characters.

  - **`display_name`**

    `string` — Human-readable display name for the role. Used in user interfaces and reports.

  - **`extends`**

    `string` — Name of the base role that this role extends. Enables hierarchical role inheritance.

  - **`id`**

    `string` — Unique system-generated identifier for the role. Immutable once created.

  - **`is_org_role`**

    `boolean` — Indicates if this role is an organization role.

  - **`name`**

    `string` — Unique name identifier for the role. Must be alphanumeric with underscores, 1-100 characters.

  - **`permissions`**

    `array` — List of permissions with role source information. Only included when 'include' parameter is specified in the request.

    **Items:**
    - **`create_time`**

      `string`, format: `date-time`

    - **`description`**

      `string`

    - **`id`**

      `string`

    - **`name`**

      `string`

    - **`role_name`**

      `string` — Name of the role from which this permission was sourced

    - **`update_time`**

      `string`, format: `date-time`

- **`default_member`**

  `object` — The role that is now set as the default member role for the environment. Contains complete role information including permissions and metadata.
  - **`default_creator`**

    `boolean` — Indicates if this role is the default creator role for new organizations.

  - **`default_member`**

    `boolean` — Indicates if this role is the default member role for new users.

  - **`dependent_roles_count`**

    `integer`, format: `int32` — Number of roles that extend from this role (dependent roles count). Read-only field.

  - **`description`**

    `string` — Detailed description of the role's purpose and capabilities. Maximum 2000 characters.

  - **`display_name`**

    `string` — Human-readable display name for the role. Used in user interfaces and reports.

  - **`extends`**

    `string` — Name of the base role that this role extends. Enables hierarchical role inheritance.

  - **`id`**

    `string` — Unique system-generated identifier for the role. Immutable once created.

  - **`is_org_role`**

    `boolean` — Indicates if this role is an organization role.

  - **`name`**

    `string` — Unique name identifier for the role. Must be alphanumeric with underscores, 1-100 characters.

  - **`permissions`**

    `array` — List of permissions with role source information. Only included when 'include' parameter is specified in the request.

    **Items:**
    - **`create_time`**

      `string`, format: `date-time`

    - **`description`**

      `string`

    - **`id`**

      `string`

    - **`name`**

      `string`

    - **`role_name`**

      `string` — Name of the role from which this permission was sourced

    - **`update_time`**

      `string`, format: `date-time`

**Example:**

```json
{
  "default_creator": {
    "description": "Role for creating resources",
    "display_name": "Creator Role",
    "id": "role_1234567890",
    "name": "creator"
  },
  "default_member": {
    "description": "Role for regular members",
    "display_name": "Member Role",
    "id": "role_0987654321",
    "name": "member"
  }
}
```

### Get role details

- **Method:** `GET`
- **Path:** `/api/v1/roles/{role_name}`
- **Tags:** Roles

Retrieves complete information for a specific role including metadata and inheritance details (base role and dependent role count). Use this endpoint to audit role configuration and understand the role's place in the hierarchy. To view the role's permissions, use the ListRolePermissions endpoint.

#### Responses

##### Status: 200 Successfully retrieved role details. Returns the role object including metadata and inheritance details. Permissions are not included.

###### Content-Type: application/json

- **`role`**

  `object` — The complete role object with all metadata, permissions, and inheritance details.
  - **`default_creator`**

    `boolean` — Indicates if this role is the default creator role for new organizations.

  - **`default_member`**

    `boolean` — Indicates if this role is the default member role for new users.

  - **`dependent_roles_count`**

    `integer`, format: `int32` — Number of roles that extend from this role (dependent roles count). Read-only field.

  - **`description`**

    `string` — Detailed description of the role's purpose and capabilities. Maximum 2000 characters.

  - **`display_name`**

    `string` — Human-readable display name for the role. Used in user interfaces and reports.

  - **`extends`**

    `string` — Name of the base role that this role extends. Enables hierarchical role inheritance.

  - **`id`**

    `string` — Unique system-generated identifier for the role. Immutable once created.

  - **`is_org_role`**

    `boolean` — Indicates if this role is an organization role.

  - **`name`**

    `string` — Unique name identifier for the role. Must be alphanumeric with underscores, 1-100 characters.

  - **`permissions`**

    `array` — List of permissions with role source information. Only included when 'include' parameter is specified in the request.

    **Items:**
    - **`create_time`**

      `string`, format: `date-time`

    - **`description`**

      `string`

    - **`id`**

      `string`

    - **`name`**

      `string`

    - **`role_name`**

      `string` — Name of the role from which this permission was sourced

    - **`update_time`**

      `string`, format: `date-time`

**Example:**

```json
{
  "role": {
    "dependent_roles_count": 2,
    "display_name": "Content Editor",
    "id": "role_1234abcd5678efgh",
    "name": "content_editor",
    "permissions": [
      {
        "name": "read:content"
      }
    ]
  }
}
```

### Update role information

- **Method:** `PUT`
- **Path:** `/api/v1/roles/{role_name}`
- **Tags:** Roles

Modifies an existing role's properties including display name, description, permissions, and inheritance. Use this endpoint to update role metadata, change permission assignments, or modify role hierarchy. Only the fields you specify will be updated, leaving other properties unchanged. When updating permissions, the new list replaces all existing permissions for the role.

#### Request Body

##### Content-Type: application/json

- **`description`**

  `string` — Detailed description of the role's purpose, capabilities, and intended use cases. Maximum 2000 characters.

- **`display_name`**

  `string` — Human-readable display name for the role. Used in user interfaces, reports, and user-facing communications.

- **`extends`**

  `string` — Name of the base role that this role extends. Enables hierarchical role inheritance where this role inherits all permissions from the base role.

- **`permissions`**

  `array` — List of permission names to assign to this role. When provided, this replaces all existing role-permission mappings. Permissions must exist in the current environment. Maximum 100 permissions per role.

  **Items:**

  `string`

**Example:**

```json
{
  "description": "Can create, edit, publish, and approve content. Cannot delete content or manage user accounts.",
  "display_name": "Senior Content Editor",
  "extends": "content_editor",
  "permissions": ["read:content", "write:content", "publish:content", "approve:content"]
}
```

#### Responses

##### Status: 200 Role updated successfully. Returns the modified role object with updated timestamps.

###### Content-Type: application/json

- **`role`**

  `object` — The updated role object with all current configuration details.
  - **`default_creator`**

    `boolean` — Indicates if this role is the default creator role for new organizations.

  - **`default_member`**

    `boolean` — Indicates if this role is the default member role for new users.

  - **`dependent_roles_count`**

    `integer`, format: `int32` — Number of roles that extend from this role (dependent roles count). Read-only field.

  - **`description`**

    `string` — Detailed description of the role's purpose and capabilities. Maximum 2000 characters.

  - **`display_name`**

    `string` — Human-readable display name for the role. Used in user interfaces and reports.

  - **`extends`**

    `string` — Name of the base role that this role extends. Enables hierarchical role inheritance.

  - **`id`**

    `string` — Unique system-generated identifier for the role. Immutable once created.

  - **`is_org_role`**

    `boolean` — Indicates if this role is an organization role.

  - **`name`**

    `string` — Unique name identifier for the role. Must be alphanumeric with underscores, 1-100 characters.

  - **`permissions`**

    `array` — List of permissions with role source information. Only included when 'include' parameter is specified in the request.

    **Items:**
    - **`create_time`**

      `string`, format: `date-time`

    - **`description`**

      `string`

    - **`id`**

      `string`

    - **`name`**

      `string`

    - **`role_name`**

      `string` — Name of the role from which this permission was sourced

    - **`update_time`**

      `string`, format: `date-time`

**Example:**

```json
{
  "role": {
    "description": "Can edit and approve content",
    "display_name": "Senior Editor",
    "id": "role_1234abcd5678efgh",
    "name": "content_editor"
  }
}
```

### Delete role and reassign users

- **Method:** `DELETE`
- **Path:** `/api/v1/roles/{role_name}`
- **Tags:** Roles

Permanently removes a role from the environment and reassigns users who had that role to a different role. Use this endpoint when you need to clean up unused roles or restructure your access control system. The role cannot be deleted if it has dependent roles (roles that extend it) unless you specify a replacement role. If users are assigned to the role being deleted, you must provide a reassign_role_name to move those users to a different role before deletion can proceed. This action cannot be undone, so ensure no critical users depend on the role before deletion.

#### Responses

##### Status: 200 Role successfully deleted and users reassigned. No content returned.

###### Content-Type: application/json

**Example:**

```json
null
```

### List dependent roles

- **Method:** `GET`
- **Path:** `/api/v1/roles/{role_name}/dependents`
- **Tags:** Roles

Retrieves all roles that directly extend the specified base role through inheritance. Use this endpoint to understand the role hierarchy and identify which roles inherit permissions from a particular base role. Provide the base role name as a path parameter, and the response will include all dependent roles with their metadata and permission information. This operation is useful for auditing role inheritance relationships, understanding the impact of changes to base roles, or managing role hierarchies effectively. Returns a list of dependent role objects including their names, display names, descriptions, and permission details.

#### Responses

##### Status: 200 Successfully retrieved dependent roles. Returns a list of all roles that extend the specified base role, including their metadata and permission information.

###### Content-Type: application/json

- **`roles`**

  `array` — List of dependent roles

  **Items:**
  - **`default_creator`**

    `boolean` — Indicates if this role is the default creator role for new organizations.

  - **`default_member`**

    `boolean` — Indicates if this role is the default member role for new users.

  - **`dependent_roles_count`**

    `integer`, format: `int32` — Number of roles that extend from this role (dependent roles count). Read-only field.

  - **`description`**

    `string` — Detailed description of the role's purpose and capabilities. Maximum 2000 characters.

  - **`display_name`**

    `string` — Human-readable display name for the role. Used in user interfaces and reports.

  - **`extends`**

    `string` — Name of the base role that this role extends. Enables hierarchical role inheritance.

  - **`id`**

    `string` — Unique system-generated identifier for the role. Immutable once created.

  - **`is_org_role`**

    `boolean` — Indicates if this role is an organization role.

  - **`name`**

    `string` — Unique name identifier for the role. Must be alphanumeric with underscores, 1-100 characters.

  - **`permissions`**

    `array` — List of permissions with role source information. Only included when 'include' parameter is specified in the request.

    **Items:**
    - **`create_time`**

      `string`, format: `date-time`

    - **`description`**

      `string`

    - **`id`**

      `string`

    - **`name`**

      `string`

    - **`role_name`**

      `string` — Name of the role from which this permission was sourced

    - **`update_time`**

      `string`, format: `date-time`

**Example:**

```json
{
  "roles": [
    {
      "default_creator": true,
      "default_member": true,
      "dependent_roles_count": 3,
      "description": "Can create, edit, and publish content but cannot delete or manage users",
      "display_name": "Content Editor",
      "extends": "admin_role",
      "id": "role_1234abcd5678efgh",
      "is_org_role": true,
      "name": "content_editor",
      "permissions": [
        {
          "description": "Read Content",
          "name": "read:content",
          "role_name": "admin_role"
        },
        {
          "description": "Write Content",
          "name": "write:content",
          "role_name": "editor_role"
        }
      ]
    }
  ]
}
```

### List permissions for role

- **Method:** `GET`
- **Path:** `/api/v1/roles/{role_name}/permissions`
- **Tags:** Roles

Retrieves all permissions directly assigned to the specified role, excluding permissions inherited from base roles. Use this endpoint to view the explicit permission assignments for a role, which is useful for understanding direct role capabilities, auditing permission assignments, or managing role-permission relationships. Provide the role name as a path parameter, and the response will include only the permissions that are directly assigned to that role. This operation does not include inherited permissions from role hierarchies - use ListEffectiveRolePermissions to see the complete set of permissions including inheritance. Returns a list of permission objects with their names, descriptions, and assignment metadata.

#### Responses

##### Status: 200 Successfully retrieved role permissions. Returns a list of all permissions directly assigned to the specified role, excluding inherited permissions.

###### Content-Type: application/json

- **`permissions`**

  `array` — List of permissions directly assigned to the role

  **Items:**
  - **`create_time`**

    `string`, format: `date-time`

  - **`description`**

    `string`

  - **`id`**

    `string`

  - **`is_scalekit_permission`**

    `boolean` — Indicates whether this permission is predefined by Scalekit

  - **`name`**

    `string`

  - **`update_time`**

    `string`, format: `date-time`

**Example:**

```json
{
  "permissions": [
    {
      "create_time": "",
      "description": "",
      "id": "",
      "is_scalekit_permission": true,
      "name": "",
      "update_time": ""
    }
  ]
}
```

### Add permissions to role

- **Method:** `POST`
- **Path:** `/api/v1/roles/{role_name}/permissions`
- **Tags:** Roles

Adds one or more permissions to the specified role while preserving existing permission assignments. Use this endpoint to grant additional capabilities to a role without affecting its current permission set. Provide the role name as a path parameter and a list of permission names in the request body. The system will validate that all specified permissions exist in the environment and add them to the role. Existing permission assignments remain unchanged, making this operation safe for incremental permission management. This is useful for gradually expanding role capabilities or adding new permissions as your system evolves. Returns the updated list of all permissions now assigned to the role.

#### Request Body

##### Content-Type: application/json

- **`permission_names`**

  `array` — List of permission names to add to the role

  **Items:**

  `string`

**Example:**

```json
{
  "permission_names": [""]
}
```

#### Responses

##### Status: 200 Permissions added to role successfully. Returns the complete list of all permissions now assigned to the role, including both existing and newly added permissions.

###### Content-Type: application/json

- **`permissions`**

  `array` — List of all permissions belonging to the role after addition

  **Items:**
  - **`create_time`**

    `string`, format: `date-time`

  - **`description`**

    `string`

  - **`id`**

    `string`

  - **`is_scalekit_permission`**

    `boolean` — Indicates whether this permission is predefined by Scalekit

  - **`name`**

    `string`

  - **`update_time`**

    `string`, format: `date-time`

**Example:**

```json
{
  "permissions": [
    {
      "create_time": "",
      "description": "",
      "id": "",
      "is_scalekit_permission": true,
      "name": "",
      "update_time": ""
    }
  ]
}
```

### Remove permission from role

- **Method:** `DELETE`
- **Path:** `/api/v1/roles/{role_name}/permissions/{permission_name}`
- **Tags:** Roles

Removes a specific permission from the specified role, revoking that capability from all users assigned to the role. Use this endpoint to restrict role capabilities or remove unnecessary permissions. Provide both the role name and permission name as path parameters. This operation only affects the direct permission assignment and does not impact permissions inherited from base roles. If the permission is inherited through role hierarchy, you may need to modify the base role instead. This is useful for fine-tuning role permissions, implementing least-privilege access controls, or removing deprecated permissions. Returns no content on successful removal.

#### Responses

##### Status: 200 Permission removed from role successfully. No content returned.

###### Content-Type: application/json

**Example:**

```json
null
```

### List effective permissions for role

- **Method:** `GET`
- **Path:** `/api/v1/roles/{role_name}/permissions:all`
- **Tags:** Roles

Retrieves the complete set of effective permissions for a role, including both directly assigned permissions and permissions inherited from base roles through the role hierarchy. Use this endpoint to understand the full scope of capabilities available to users assigned to a specific role. Provide the role name as a path parameter, and the response will include all permissions that apply to the role, accounting for inheritance relationships. This operation is essential for auditing role capabilities, understanding permission inheritance, or verifying the complete access scope before role assignment. Returns a comprehensive list of permission names representing the full set of effective permissions for the specified role.

#### Responses

##### Status: 200 Successfully retrieved effective permissions. Returns the complete list of all permissions that apply to the role, including both direct assignments and inherited permissions from base roles.

###### Content-Type: application/json

- **`permissions`**

  `array` — List of all effective permissions including those inherited from base roles

  **Items:**
  - **`create_time`**

    `string`, format: `date-time`

  - **`description`**

    `string`

  - **`id`**

    `string`

  - **`is_scalekit_permission`**

    `boolean` — Indicates whether this permission is predefined by Scalekit

  - **`name`**

    `string`

  - **`update_time`**

    `string`, format: `date-time`

**Example:**

```json
{
  "permissions": [
    {
      "create_time": "",
      "description": "",
      "id": "",
      "is_scalekit_permission": true,
      "name": "",
      "update_time": ""
    }
  ]
}
```

### Retrieve user count for role

- **Method:** `GET`
- **Path:** `/api/v1/roles/{role_name}/users:count`
- **Tags:** Roles

Retrieves the total number of users currently assigned to the specified role within the environment. Use this endpoint to monitor role usage, enforce user limits, or understand the scope of role assignments. Provide the role's unique name as a path parameter, and the response will include the current user count for that role. This operation is read-only and does not modify any data or user assignments. The count reflects all users who have the role either directly assigned or inherited through organization membership. This information is useful for capacity planning, security auditing, or understanding the impact of role changes across your user base.

#### Responses

##### Status: 200 Successfully retrieved user count for the specified role. Returns the total number of users currently assigned to the role, including both direct assignments and inherited assignments.

###### Content-Type: application/json

- **`count`**

  `string`, format: `int64` — Number of users associated with the role

**Example:**

```json
{
  "count": 10
}
```

### Set default creator and member roles

- **Method:** `PATCH`
- **Path:** `/api/v1/roles:set_defaults`
- **Tags:** Roles

Updates the default creator and member roles for the current environment. Use this endpoint to configure which roles are automatically assigned to new users when they join the environment. You can specify role names for both creator and member default roles. The system will validate that the specified roles exist and update the environment settings accordingly. Returns the updated default role objects including their complete role information and permissions.

#### Request Body

##### Content-Type: application/json

- **`default_creator`**

  `object` — Default creator role (deprecated - use default_creator_role field instead)
  - **`id`**

    `string`

  - **`name`**

    `string` — Unique name of the role

- **`default_creator_role`**

  `string` — Name of the role to set as the default creator role. This role will be automatically assigned to users who create new resources in the environment. Must be a valid role name that exists in the environment.

- **`default_member`**

  `object` — Default member role (deprecated - use default_member_role field instead)
  - **`id`**

    `string`

  - **`name`**

    `string` — Unique name of the role

- **`default_member_role`**

  `string` — Name of the role to set as the default member role. This role will be automatically assigned to new users when they join the environment. Must be a valid role name that exists in the environment.

**Example:**

```json
{
  "default_creator": {
    "description": "Role for creating resources",
    "display_name": "Creator Role",
    "id": "role_1234567890",
    "name": "creator"
  },
  "default_creator_role": "creator",
  "default_member": {
    "description": "Role for regular members",
    "display_name": "Member Role",
    "id": "role_0987654321",
    "name": "member"
  },
  "default_member_role": "member"
}
```

#### Responses

##### Status: 200 Default roles updated successfully

###### Content-Type: application/json

- **`default_creator`**

  `object` — The role that is now set as the default creator role for the environment. Contains complete role information including permissions and metadata.
  - **`default_creator`**

    `boolean` — Indicates if this role is the default creator role for new organizations.

  - **`default_member`**

    `boolean` — Indicates if this role is the default member role for new users.

  - **`dependent_roles_count`**

    `integer`, format: `int32` — Number of roles that extend from this role (dependent roles count). Read-only field.

  - **`description`**

    `string` — Detailed description of the role's purpose and capabilities. Maximum 2000 characters.

  - **`display_name`**

    `string` — Human-readable display name for the role. Used in user interfaces and reports.

  - **`extends`**

    `string` — Name of the base role that this role extends. Enables hierarchical role inheritance.

  - **`id`**

    `string` — Unique system-generated identifier for the role. Immutable once created.

  - **`is_org_role`**

    `boolean` — Indicates if this role is an organization role.

  - **`name`**

    `string` — Unique name identifier for the role. Must be alphanumeric with underscores, 1-100 characters.

  - **`permissions`**

    `array` — List of permissions with role source information. Only included when 'include' parameter is specified in the request.

    **Items:**
    - **`create_time`**

      `string`, format: `date-time`

    - **`description`**

      `string`

    - **`id`**

      `string`

    - **`name`**

      `string`

    - **`role_name`**

      `string` — Name of the role from which this permission was sourced

    - **`update_time`**

      `string`, format: `date-time`

- **`default_member`**

  `object` — The role that is now set as the default member role for the environment. Contains complete role information including permissions and metadata.
  - **`default_creator`**

    `boolean` — Indicates if this role is the default creator role for new organizations.

  - **`default_member`**

    `boolean` — Indicates if this role is the default member role for new users.

  - **`dependent_roles_count`**

    `integer`, format: `int32` — Number of roles that extend from this role (dependent roles count). Read-only field.

  - **`description`**

    `string` — Detailed description of the role's purpose and capabilities. Maximum 2000 characters.

  - **`display_name`**

    `string` — Human-readable display name for the role. Used in user interfaces and reports.

  - **`extends`**

    `string` — Name of the base role that this role extends. Enables hierarchical role inheritance.

  - **`id`**

    `string` — Unique system-generated identifier for the role. Immutable once created.

  - **`is_org_role`**

    `boolean` — Indicates if this role is an organization role.

  - **`name`**

    `string` — Unique name identifier for the role. Must be alphanumeric with underscores, 1-100 characters.

  - **`permissions`**

    `array` — List of permissions with role source information. Only included when 'include' parameter is specified in the request.

    **Items:**
    - **`create_time`**

      `string`, format: `date-time`

    - **`description`**

      `string`

    - **`id`**

      `string`

    - **`name`**

      `string`

    - **`role_name`**

      `string` — Name of the role from which this permission was sourced

    - **`update_time`**

      `string`, format: `date-time`

**Example:**

```json
{
  "default_creator": {
    "description": "Role for creating resources",
    "display_name": "Creator Role",
    "id": "role_1234567890",
    "name": "creator"
  },
  "default_member": {
    "description": "Role for regular members",
    "display_name": "Member Role",
    "id": "role_0987654321",
    "name": "member"
  }
}
```

### Get session details

- **Method:** `GET`
- **Path:** `/api/v1/sessions/{session_id}`
- **Tags:** Sessions

Retrieves comprehensive details for a specific user session including authentication status, device information, and expiration timelines. Use this endpoint to fetch current session metadata for security audits, session validation, or to display session information in user account management interfaces. Returns all session properties including the user ID, authenticated organizations, device details with browser/OS information, IP address and geolocation, and all relevant timestamps (creation, last activity, idle expiration, absolute expiration, and actual expiration if applicable).

#### Responses

##### Status: 200 Successfully retrieved session details

###### Content-Type: application/json

- **`absolute_expires_at`**

  `string`, format: `date-time` — Hard expiration timestamp for the session regardless of user activity. The session will be forcibly terminated at this time. This represents the maximum session lifetime from creation.

- **`authenticated_clients`**

  `array` — Details of the authenticated clients for this session: client ID and organization context.

  **Items:**
  - **`client_id`**

    `string` — Unique identifier of the authenticated client application.

  - **`organization_id`**

    `string` — Active or last active Organization ID associated with the authenticated client.

- **`authenticated_organizations`**

  `array` — List of organization IDs that have been authenticated for this user within the current session. Contains all organizations where the user has successfully completed SSO or authentication.

  **Items:**

  `string`

- **`created_at`**

  `string`, format: `date-time` — Timestamp indicating when the session was created. This is set once at session creation and remains constant throughout the session lifetime.

- **`device`**

  `object` — Complete device metadata associated with this session including browser, operating system, device type, and geographic location based on IP address.
  - **`browser`**

    `string` — Browser name and family extracted from the user agent. Examples: Chrome, Safari, Firefox, Edge, Mobile Safari.

  - **`browser_version`**

    `string` — Version of the browser application. Represents the specific release version of the browser being used.

  - **`device_type`**

    `string` — Categorized device type classification. Possible values: 'desktop' (traditional computers), 'mobile' (smartphones and small tablets), 'tablet' (large tablets), 'other'. Useful for displaying session information by device category.

  - **`ip`**

    `string` — IP address of the device that initiated the session. This is the public-facing IP address used to connect to the application. Useful for security audits and geographic distribution analysis.

  - **`location`**

    `object` — Geographic location information derived from IP address geolocation. Includes country, region, city, and coordinates. Note: Based on IP location data and may not represent the user's exact physical location.
    - **`city`**

      `string` — City name where the session originated based on IP geolocation. Approximate location derived from IP address.

    - **`latitude`**

      `string` — Latitude coordinate of the estimated location. Decimal format (e.g., '37.7749'). Note: Represents IP geolocation center and may not be precise.

    - **`longitude`**

      `string` — Longitude coordinate of the estimated location. Decimal format (e.g., '-122.4194'). Note: Represents IP geolocation center and may not be precise.

    - **`region`**

      `string` — Geographic region name derived from IP geolocation. Represents the country-level location (e.g., 'United States', 'France').

    - **`region_subdivision`**

      `string` — Regional subdivision code or name (e.g., state abbreviation for US, province for Canada). Two-letter ISO format when applicable.

  - **`os`**

    `string` — Operating system name extracted from the user agent and device headers. Examples: macOS, Windows, Linux, iOS, Android.

  - **`os_version`**

    `string` — Version of the operating system. Represents the specific OS release the device is running.

  - **`user_agent`**

    `string` — Complete HTTP User-Agent header string from the client request. Contains browser type, version, and operating system information. Used for detailed device fingerprinting and user agent analysis.

- **`expired_at`**

  `string`, format: `date-time` — Timestamp when the session was terminated. Null if the session is still active. Set when the session expires due to reaching idle_expires_at or absolute_expires_at timeout, or when administratively revoked. Not set for user-initiated logout (see logout_at instead).

- **`idle_expires_at`**

  `string`, format: `date-time` — Projected expiration timestamp if the session remains idle without user activity. This timestamp is recalculated with each user activity. Session will be automatically terminated at this time if no activity occurs.

- **`last_active_at`**

  `string`, format: `date-time` — Timestamp of the most recent user activity detected in this session. Updated on each API request or user interaction. Used to determine if a session has exceeded the idle timeout threshold.

- **`logout_at`**

  `string`, format: `date-time` — Timestamp when the user explicitly logged out from the session. Null if the user has not logged out. When set, indicates the session ended due to explicit user logout rather than timeout.

- **`organization_id`**

  `string` — Organization ID for the user's most recently active organization within this session. This represents the primary organization context for the current session.

- **`session_id`**

  `string` — Unique identifier for the session. System-generated read-only field used to reference this session.

- **`status`**

  `string` — Current operational status of the session. Possible values: 'active' (session is valid and requests are allowed), 'expired' (session terminated due to idle or absolute timeout), 'revoked' (session was administratively revoked), 'logout' (user explicitly logged out). Use this to determine if the session can be used for new requests.

- **`updated_at`**

  `string`, format: `date-time` — Timestamp indicating when the session was last updated. Updated whenever session state changes such as organization context changes or metadata updates.

- **`user_id`**

  `string` — Unique identifier for the user who owns and is authenticated within this session.

**Example:**

```json
{
  "absolute_expires_at": "2025-01-22T10:30:00Z",
  "authenticated_clients": [
    {
      "client_id": "skc_1234567890",
      "organization_id": "org_1234567890"
    }
  ],
  "authenticated_organizations": ["org_123", "org_456"],
  "created_at": "2025-01-15T10:30:00Z",
  "device": {
    "browser": "Chrome",
    "browser_version": "120.0.0.0",
    "device_type": "desktop",
    "ip": "192.0.2.1",
    "location": null,
    "os": "macOS",
    "os_version": "14.2",
    "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
  },
  "expired_at": "2025-01-15T12:00:00Z",
  "idle_expires_at": "2025-01-15T11:30:00Z",
  "last_active_at": "2025-01-15T10:55:30Z",
  "logout_at": "2025-01-15T14:00:00Z",
  "organization_id": "org_1234567890123456",
  "session_id": "ses_1234567890123456",
  "status": "active",
  "updated_at": "2025-01-15T10:45:00Z",
  "user_id": "usr_1234567890123456"
}
```

### Revoke user session

- **Method:** `POST`
- **Path:** `/api/v1/sessions/{session_id}/revoke`
- **Tags:** Sessions

Immediately invalidates a specific user session by session ID, setting its status to 'revoked'. Once revoked, the session cannot be used for any future API requests or application access. Use this endpoint to implement session-level logout, force a user to reauthenticate on a specific device, or terminate suspicious sessions. The revocation is instantaneous and irreversible. Returns the revoked session details including the session ID, user ID, and the revocation timestamp.

#### Responses

##### Status: 200 Successfully revoked the session. Returns the revoked session details

###### Content-Type: application/json

- **`revoked_session`**

  `object` — Details of the revoked session including session ID, user ID, creation and revocation timestamps, and final device information.
  - **`absolute_expires_at`**

    `string`, format: `date-time` — The absolute expiration timestamp that was configured for this session before revocation. Represents the hard deadline regardless of activity.

  - **`created_at`**

    `string`, format: `date-time` — Timestamp indicating when the session was originally created before revocation.

  - **`expired_at`**

    `string`, format: `date-time` — Timestamp when the session was actually terminated. Set to the revocation time when the session is revoked.

  - **`idle_expires_at`**

    `string`, format: `date-time` — The idle expiration timestamp that was configured for this session before revocation. Represents when the session would have expired due to inactivity.

  - **`last_active_at`**

    `string`, format: `date-time` — Timestamp of the last recorded user activity in this session before revocation. Helps identify inactive sessions that were revoked.

  - **`logout_at`**

    `string`, format: `date-time` — Timestamp when the user explicitly logged out (if applicable). Null if the session was revoked without prior logout.

  - **`session_id`**

    `string` — Unique identifier for the revoked session. System-generated read-only field.

  - **`status`**

    `string` — Status of the session after revocation. Always 'revoked' since only active sessions can be revoked. Sessions that were already expired or logged out are not included in the revocation response.

  - **`updated_at`**

    `string`, format: `date-time` — Timestamp indicating when the session was last modified before revocation.

  - **`user_id`**

    `string` — Unique identifier for the user who owned this session.

**Example:**

```json
{
  "revoked_session": {
    "absolute_expires_at": "2025-01-22T10:30:00Z",
    "created_at": "2025-01-15T10:30:00Z",
    "expired_at": "2025-01-15T12:00:00Z",
    "idle_expires_at": "2025-01-15T11:30:00Z",
    "last_active_at": "2025-01-15T10:55:30Z",
    "logout_at": "2025-01-15T14:00:00Z",
    "session_id": "ses_1234567890123456",
    "status": "revoked",
    "updated_at": "2025-01-15T10:45:00Z",
    "user_id": "usr_1234567890123456"
  }
}
```

### List all users in environment

- **Method:** `GET`
- **Path:** `/api/v1/users`
- **Tags:** Users

Retrieves a paginated list of all users across your entire environment. Use this endpoint to view all users regardless of their organization memberships. This is useful for administrative purposes, user audits, or when you need to see all users in your Scalekit environment. Supports pagination for large user bases.

#### Responses

##### Status: 200 List of users.

###### Content-Type: application/json

- **`next_page_token`**

  `string` — Token for retrieving the next page of results. Empty if there are no more pages.

- **`prev_page_token`**

  `string` — Token for retrieving the previous page of results. Empty if this is the first page.

- **`total_size`**

  `integer`, format: `int64` — Total number of users matching the request criteria, regardless of pagination.

- **`users`**

  `array` — List of users.

  **Items:**
  - **`create_time`**

    `string`, format: `date-time` — Timestamp when the user account was initially created. Automatically set by the server.

  - **`email`**

    `string` — Primary email address for the user. Must be unique across the environment and valid per RFC 5322.

  - **`external_id`**

    `string` — Your application's unique identifier for this organization, used to link Scalekit with your system.

  - **`id`**

    `string` — Unique system-generated identifier for the user. Immutable once created.

  - **`last_login_time`**

    `string`, format: `date-time` — Timestamp of the user's most recent successful authentication. Updated automatically.

  - **`memberships`**

    `array` — List of organization memberships. Automatically populated based on group assignments.

    **Items:**
    - **`accepted_at`**

      `string`, format: `date-time` — Timestamp when the user accepted the invitation.

    - **`created_at`**

      `string`, format: `date-time` — Timestamp when the invitation was created.

    - **`display_name`**

      `string` — Organization display name. This field stores a user-friendly name for the organization that may be different from the formal name, often used for UI display purposes.

    - **`expires_at`**

      `string`, format: `date-time` — Timestamp when the invitation expired.

    - **`inviter_email`**

      `string` — ID of the user who invited this user.

    - **`join_time`**

      `string`, format: `date-time` — Timestamp when the membership was created. Automatically set by the server.

    - **`membership_status`**

      `string`, possible values: `"ACTIVE", "INACTIVE", "PENDING_INVITE", "INVITE_EXPIRED"`

    - **`metadata`**

      `object` — Custom key-value pairs for storing additional user context. Keys (3-25 chars), values (1-256 chars).

    - **`name`**

      `string` — Organization name. This field stores the formal organization name used for identification and display purposes.

    - **`organization_id`**

      `string` — Unique identifier for the organization. Immutable and read-only.

    - **`permissions`**

      `array` — Effective permissions granted to the user within the organization (including inherited permissions from assigned roles). Lists the specific actions and access rights the user can perform.

      **Items:**

      `string`

    - **`provisioning_method`**

      `string` — How the user was provisioned. Possible values: - \`jit_using_sso\` (Just-in-time provisioning during SSO login) - \`allowed_email_domain\` (User joined via allowed email domain matching) - \`org_creator\` (User created the organization) - \`direct_provision\` (User was directly provisioned via API or SCIM) - \`invitation\` (User was invited and accepted an invitation)

    - **`roles`**

      `array`

      **Items:**
      - **`display_name`**

        `string` — Human-readable name for the role

      - **`id`**

        `string` — Role ID

      - **`name`**

        `string` — Attribute name/identifier for the role used in system operations and API calls. This should be a machine-readable identifier that follows naming conventions.

  - **`metadata`**

    `object` — Custom key-value pairs for storing additional user context. Keys (3-25 chars), values (1-256 chars).

  - **`update_time`**

    `string`, format: `date-time` — Timestamp of the last modification to the user account. Automatically updated by the server.

  - **`user_profile`**

    `object` — User's personal information including name, address, and other profile attributes.
    - **`custom_attributes`**

      `object` — Custom attributes for extended user profile data and application-specific information. This field stores business-specific user data like department, job title, security clearances, project assignments, or any other organizational attributes your application requires. Unlike system metadata, these attributes are typically managed by administrators or applications and are visible to end users for personalization and business logic. Keys must be 3-25 characters, values must be 1-256 characters, with a maximum of 20 key-value pairs.

    - **`email_verified`**

      `boolean` — Indicates if the user's email address has been verified. Automatically updated by the system.

    - **`external_identities`**

      `array` — List of external identity connections associated with the user profile.

      **Items:**
      - **`connection_id`**

        `string` — Unique identifier for the external identity connection. Immutable and read-only.

      - **`connection_provider`**

        `string`, possible values: `"OKTA", "GOOGLE", "MICROSOFT_AD", "AUTH0", "ONELOGIN", "PING_IDENTITY", "JUMPCLOUD", "CUSTOM", "GITHUB", "GITLAB", "LINKEDIN", "SALESFORCE", "MICROSOFT", "IDP_SIMULATOR", "SCALEKIT", "ADFS"` — Type of the identity provider.

      - **`connection_type`**

        `string` — Name of the external identity connection.

      - **`connection_user_id`**

        `string` — Unique identifier for the user in the external identity provider system. Immutable and read-only.

      - **`created_time`**

        `string`, format: `date-time` — Timestamp when this external identity connection was first created. Immutable and read-only.

      - **`is_social`**

        `boolean` — Indicates if the identity provider is a social provider (true) or enterprise/custom provider (false). Read-only.

      - **`last_login_time`**

        `string`, format: `date-time` — Timestamp of the user's last successful login via this external identity provider. Automatically updated by the system.

      - **`last_synced_time`**

        `string`, format: `date-time` — Timestamp of the last data synchronization for this external identity from the provider. Automatically updated by the system.

    - **`family_name`**

      `string` — The user's family name (last name or surname). This field stores the user's last name and is combined with the given name to create the full display name. The family name is used in formal communications, user listings, and organizational directories throughout the system. Maximum 255 characters allowed.

    - **`gender`**

      `string` — The user's gender identity information. This field stores the user's gender identity for personalization, compliance reporting, or organizational analytics purposes. This field supports any string value to accommodate diverse gender identities and should be handled with appropriate privacy considerations according to your organization's policies and applicable regulations.

    - **`given_name`**

      `string` — The user's given name (first name). This field stores the user's first name and is used for personalization, display purposes, and when generating the full display name. The given name appears in user interfaces, formal communications, and user listings throughout the system. Maximum 255 characters allowed.

    - **`groups`**

      `array` — The list of group names the user belongs to within the organization. This field stores the user's group memberships for role-based access control, team assignments, and organizational structure. Groups are typically used for permission management, collaborative access, and organizational hierarchy. Each group name represents a distinct organizational unit or team that the user is associated with.

      **Items:**

      `string`

    - **`id`**

      `string` — Unique system-generated identifier for the user profile. Immutable and read-only.

    - **`locale`**

      `string` — The user's preferred language and region settings using BCP-47 format codes. This field customizes the user's experience with localized content, date formats, number formatting, and UI language throughout the system. When not specified, the user inherits the organization's default locale settings. Common values include \`en-US\`, \`en-GB\`, \`fr-FR\`, \`de-DE\`, and \`es-ES\`.

    - **`metadata`**

      `object` — Raw attributes received from identity providers during authentication. This field stores the original user profile data as received from external IdP systems (SAML, OIDC, etc.) including provider-specific claims and attributes. These fields preserve the complete set of attributes received from the identity source and are used for mapping, synchronization, and audit purposes. Keys must be 3-25 characters, values must be 1-256 characters, with a maximum of 20 key-value pairs.

    - **`name`**

      `string` — The user's complete display name in formatted form. This field stores the full name as a single string and is typically used when you want to set the complete name rather than using separate given and family names. This name appears in user interfaces, reports, directory listings, and anywhere a formatted display name is needed. This field serves as a formatted display name that complements the individual given_name and family_name fields.

    - **`phone_number`**

      `string` — The user's phone number in E.164 international format. This field stores the phone number for user contact and identification purposes. The phone number must include the country code and be formatted according to E.164 standards (e.g., \`+1\` for US numbers). This field is optional.

    - **`phone_number_verified`**

      `boolean` — Indicates if the user's phone number has been verified. Automatically updated by the system.

    - **`picture`**

      `string` — The URL to the user's profile picture or avatar image. This field stores the location of the user's profile photo that appears in user interfaces, directory listings, and collaborative features throughout the system. The URL should point to a publicly accessible image file. Supported formats typically include JPEG, PNG, and GIF. This image is used for visual identification and personalization across the platform.

    - **`preferred_username`**

      `string` — The user's preferred username for display and identification purposes. This field stores a custom username that the user prefers to be known by, which may differ from their email or formal name. This username appears in user interfaces, mentions, informal communications, and collaborative features throughout the system. Maximum 512 characters allowed.

**Example:**

```json
{
  "next_page_token": "eyJwYWdlIjogMiwgImxhc3RfaWQiOiAidXNyXzEyMzQ1In0=",
  "prev_page_token": "eyJwYWdlIjogMCwgImZpcnN0X2lkIjogInVzcl85ODc2NSJ9",
  "total_size": 1042,
  "users": [
    {
      "create_time": "",
      "email": "user@example.com",
      "external_id": "ext_12345a67b89c",
      "id": "usr_1234abcd5678efgh",
      "last_login_time": "",
      "memberships": [{}],
      "metadata": {
        "department": "engineering",
        "location": "nyc-office"
      },
      "update_time": "",
      "user_profile": null
    }
  ]
}
```

### Get user

- **Method:** `GET`
- **Path:** `/api/v1/users/{id}`
- **Tags:** Users

Retrieves all details for a user by system-generated user ID or external ID. The response includes organization memberships and user metadata.

#### Responses

##### Status: 200 User details retrieved successfully. Returns full user object with system-generated fields and timestamps.

###### Content-Type: application/json

- **`user`**

  `object`
  - **`create_time`**

    `string`, format: `date-time` — Timestamp when the user account was initially created. Automatically set by the server.

  - **`email`**

    `string` — Primary email address for the user. Must be unique across the environment and valid per RFC 5322.

  - **`external_id`**

    `string` — Your application's unique identifier for this organization, used to link Scalekit with your system.

  - **`id`**

    `string` — Unique system-generated identifier for the user. Immutable once created.

  - **`last_login_time`**

    `string`, format: `date-time` — Timestamp of the user's most recent successful authentication. Updated automatically.

  - **`memberships`**

    `array` — List of organization memberships. Automatically populated based on group assignments.

    **Items:**
    - **`accepted_at`**

      `string`, format: `date-time` — Timestamp when the user accepted the invitation.

    - **`created_at`**

      `string`, format: `date-time` — Timestamp when the invitation was created.

    - **`display_name`**

      `string` — Organization display name. This field stores a user-friendly name for the organization that may be different from the formal name, often used for UI display purposes.

    - **`expires_at`**

      `string`, format: `date-time` — Timestamp when the invitation expired.

    - **`inviter_email`**

      `string` — ID of the user who invited this user.

    - **`join_time`**

      `string`, format: `date-time` — Timestamp when the membership was created. Automatically set by the server.

    - **`membership_status`**

      `string`, possible values: `"ACTIVE", "INACTIVE", "PENDING_INVITE", "INVITE_EXPIRED"`

    - **`metadata`**

      `object` — Custom key-value pairs for storing additional user context. Keys (3-25 chars), values (1-256 chars).

    - **`name`**

      `string` — Organization name. This field stores the formal organization name used for identification and display purposes.

    - **`organization_id`**

      `string` — Unique identifier for the organization. Immutable and read-only.

    - **`permissions`**

      `array` — Effective permissions granted to the user within the organization (including inherited permissions from assigned roles). Lists the specific actions and access rights the user can perform.

      **Items:**

      `string`

    - **`provisioning_method`**

      `string` — How the user was provisioned. Possible values: - \`jit_using_sso\` (Just-in-time provisioning during SSO login) - \`allowed_email_domain\` (User joined via allowed email domain matching) - \`org_creator\` (User created the organization) - \`direct_provision\` (User was directly provisioned via API or SCIM) - \`invitation\` (User was invited and accepted an invitation)

    - **`roles`**

      `array`

      **Items:**
      - **`display_name`**

        `string` — Human-readable name for the role

      - **`id`**

        `string` — Role ID

      - **`name`**

        `string` — Attribute name/identifier for the role used in system operations and API calls. This should be a machine-readable identifier that follows naming conventions.

  - **`metadata`**

    `object` — Custom key-value pairs for storing additional user context. Keys (3-25 chars), values (1-256 chars).

  - **`update_time`**

    `string`, format: `date-time` — Timestamp of the last modification to the user account. Automatically updated by the server.

  - **`user_profile`**

    `object` — User's personal information including name, address, and other profile attributes.
    - **`custom_attributes`**

      `object` — Custom attributes for extended user profile data and application-specific information. This field stores business-specific user data like department, job title, security clearances, project assignments, or any other organizational attributes your application requires. Unlike system metadata, these attributes are typically managed by administrators or applications and are visible to end users for personalization and business logic. Keys must be 3-25 characters, values must be 1-256 characters, with a maximum of 20 key-value pairs.

    - **`email_verified`**

      `boolean` — Indicates if the user's email address has been verified. Automatically updated by the system.

    - **`external_identities`**

      `array` — List of external identity connections associated with the user profile.

      **Items:**
      - **`connection_id`**

        `string` — Unique identifier for the external identity connection. Immutable and read-only.

      - **`connection_provider`**

        `string`, possible values: `"OKTA", "GOOGLE", "MICROSOFT_AD", "AUTH0", "ONELOGIN", "PING_IDENTITY", "JUMPCLOUD", "CUSTOM", "GITHUB", "GITLAB", "LINKEDIN", "SALESFORCE", "MICROSOFT", "IDP_SIMULATOR", "SCALEKIT", "ADFS"` — Type of the identity provider.

      - **`connection_type`**

        `string` — Name of the external identity connection.

      - **`connection_user_id`**

        `string` — Unique identifier for the user in the external identity provider system. Immutable and read-only.

      - **`created_time`**

        `string`, format: `date-time` — Timestamp when this external identity connection was first created. Immutable and read-only.

      - **`is_social`**

        `boolean` — Indicates if the identity provider is a social provider (true) or enterprise/custom provider (false). Read-only.

      - **`last_login_time`**

        `string`, format: `date-time` — Timestamp of the user's last successful login via this external identity provider. Automatically updated by the system.

      - **`last_synced_time`**

        `string`, format: `date-time` — Timestamp of the last data synchronization for this external identity from the provider. Automatically updated by the system.

    - **`family_name`**

      `string` — The user's family name (last name or surname). This field stores the user's last name and is combined with the given name to create the full display name. The family name is used in formal communications, user listings, and organizational directories throughout the system. Maximum 255 characters allowed.

    - **`gender`**

      `string` — The user's gender identity information. This field stores the user's gender identity for personalization, compliance reporting, or organizational analytics purposes. This field supports any string value to accommodate diverse gender identities and should be handled with appropriate privacy considerations according to your organization's policies and applicable regulations.

    - **`given_name`**

      `string` — The user's given name (first name). This field stores the user's first name and is used for personalization, display purposes, and when generating the full display name. The given name appears in user interfaces, formal communications, and user listings throughout the system. Maximum 255 characters allowed.

    - **`groups`**

      `array` — The list of group names the user belongs to within the organization. This field stores the user's group memberships for role-based access control, team assignments, and organizational structure. Groups are typically used for permission management, collaborative access, and organizational hierarchy. Each group name represents a distinct organizational unit or team that the user is associated with.

      **Items:**

      `string`

    - **`id`**

      `string` — Unique system-generated identifier for the user profile. Immutable and read-only.

    - **`locale`**

      `string` — The user's preferred language and region settings using BCP-47 format codes. This field customizes the user's experience with localized content, date formats, number formatting, and UI language throughout the system. When not specified, the user inherits the organization's default locale settings. Common values include \`en-US\`, \`en-GB\`, \`fr-FR\`, \`de-DE\`, and \`es-ES\`.

    - **`metadata`**

      `object` — Raw attributes received from identity providers during authentication. This field stores the original user profile data as received from external IdP systems (SAML, OIDC, etc.) including provider-specific claims and attributes. These fields preserve the complete set of attributes received from the identity source and are used for mapping, synchronization, and audit purposes. Keys must be 3-25 characters, values must be 1-256 characters, with a maximum of 20 key-value pairs.

    - **`name`**

      `string` — The user's complete display name in formatted form. This field stores the full name as a single string and is typically used when you want to set the complete name rather than using separate given and family names. This name appears in user interfaces, reports, directory listings, and anywhere a formatted display name is needed. This field serves as a formatted display name that complements the individual given_name and family_name fields.

    - **`phone_number`**

      `string` — The user's phone number in E.164 international format. This field stores the phone number for user contact and identification purposes. The phone number must include the country code and be formatted according to E.164 standards (e.g., \`+1\` for US numbers). This field is optional.

    - **`phone_number_verified`**

      `boolean` — Indicates if the user's phone number has been verified. Automatically updated by the system.

    - **`picture`**

      `string` — The URL to the user's profile picture or avatar image. This field stores the location of the user's profile photo that appears in user interfaces, directory listings, and collaborative features throughout the system. The URL should point to a publicly accessible image file. Supported formats typically include JPEG, PNG, and GIF. This image is used for visual identification and personalization across the platform.

    - **`preferred_username`**

      `string` — The user's preferred username for display and identification purposes. This field stores a custom username that the user prefers to be known by, which may differ from their email or formal name. This username appears in user interfaces, mentions, informal communications, and collaborative features throughout the system. Maximum 512 characters allowed.

**Example:**

```json
{
  "user": {
    "create_time": "",
    "email": "user@example.com",
    "external_id": "ext_12345a67b89c",
    "id": "usr_1234abcd5678efgh",
    "last_login_time": "",
    "memberships": [{}],
    "metadata": {
      "department": "engineering",
      "location": "nyc-office"
    },
    "update_time": "",
    "user_profile": null
  }
}
```

### Delete user permanently

- **Method:** `DELETE`
- **Path:** `/api/v1/users/{id}`
- **Tags:** Users

Permanently removes a user from your environment and deletes all associated data. Use this endpoint when you need to completely remove a user account. This action deletes the user's profile, memberships, and all related data across all organizations. This operation cannot be undone, so use with caution.

#### Responses

##### Status: 200 User successfully deleted. No content returned

###### Content-Type: application/json

**Example:**

```json
null
```

### Update user information

- **Method:** `PATCH`
- **Path:** `/api/v1/users/{id}`
- **Tags:** Users

Modifies user account information including profile details, metadata, and external ID. Use this endpoint to update a user's personal information, contact details, or custom metadata. You can update the user's profile, phone number, and metadata fields. Note that fields like user ID, email address, environment ID, and creation time cannot be modified.

#### Request Body

##### Content-Type: application/json

- **`external_id`**

  `string` — Your application's unique identifier for this organization, used to link Scalekit with your system.

- **`metadata`**

  `object` — Custom key-value pairs for storing additional user context. Keys (3-25 chars), values (1-256 chars).

- **`user_profile`**

  `object` — User's personal information including name, address, and other profile attributes.
  - **`custom_attributes`**

    `object` — Updates custom attributes for extended user profile data and application-specific information. Use this field to store business-specific user data like department, job title, security clearances, project assignments, or any other organizational attributes your application requires. Unlike system metadata, these attributes are typically managed by administrators or applications and are visible to end users. Keys must be 3-25 characters, values must be 1-256 characters, with a maximum of 20 key-value pairs.

  - **`family_name`**

    `string` — Updates the user's family name (last name or surname). Use this field to modify how the user's last name appears throughout the system. Maximum 255 characters allowed.

  - **`first_name`**

    `string` — \[DEPRECATED] Use given_name instead. User's given name. Maximum 200 characters.

  - **`gender`**

    `string` — Updates the user's gender identity information. Use this field to store the user's gender identity for personalization, compliance, or reporting purposes. This field supports any string value to accommodate diverse gender identities and should be handled with appropriate privacy considerations according to your organization's policies.

  - **`given_name`**

    `string` — Updates the user's given name (first name). Use this field to modify how the user's first name appears in the system and user interfaces. Maximum 255 characters allowed.

  - **`groups`**

    `array` — Updates the list of group names the user belongs to within the organization. Use this field to manage the user's group memberships for role-based access control, team assignments, or organizational structure. Groups are typically used for permission management and collaborative access. Each group name must be unique within the list, 1-250 characters long, with a maximum of 50 groups per user.

    **Items:**

    `string`

  - **`last_name`**

    `string` — \[DEPRECATED] Use family_name instead. User's family name. Maximum 200 characters.

  - **`locale`**

    `string` — Updates the user's preferred language and region settings using BCP-47 format codes. Use this field to customize the user's experience with localized content, date formats, number formatting, and UI language. When not specified, the user inherits the organization's default locale settings. Common values include \`en-US\`, \`en-GB\`, \`fr-FR\`, \`de-DE\`, and \`es-ES\`.

  - **`metadata`**

    `object` — Updates system-managed key-value pairs for internal tracking and operational data. Use this field to store system-generated metadata like account status, signup source, last activity tracking, or integration-specific identifiers. These fields are typically managed by automated processes rather than direct user input. Keys must be 3-25 characters, values must be 1-256 characters, with a maximum of 20 key-value pairs.

  - **`name`**

    `string` — Updates the user's complete display name. Use this field when you want to set the full name as a single string rather than using separate given and family names. This name appears in user interfaces, reports, and anywhere a formatted display name is needed.

  - **`phone_number`**

    `string` — Updates the user's phone number in E.164 international format. Use this field to enable SMS-based authentication methods, two-factor authentication, or phone-based account recovery. The phone number must include the country code and be formatted according to E.164 standards (e.g., \`+1\` for US numbers). This field is required when enabling SMS authentication features.

  - **`picture`**

    `string` — Updates the URL to the user's profile picture or avatar image. Use this field to set or change the user's profile photo that appears in user interfaces, directory listings, and collaborative features. The URL should point to a publicly accessible image file. Supported formats typically include JPEG, PNG, and GIF. Maximum URL length is 2048 characters.

  - **`preferred_username`**

    `string` — Updates the user's preferred username for display and identification purposes. Use this field to set a custom username that the user prefers to be known by, which may differ from their email or formal name. This username appears in user interfaces, mentions, and informal communications. Maximum 512 characters allowed.

**Example:**

```json
{
  "external_id": "ext_12345a67b89c",
  "metadata": {
    "department": "engineering",
    "location": "nyc-office"
  },
  "user_profile": {
    "custom_attributes": {
      "department": "engineering",
      "security_clearance": "level2"
    },
    "family_name": "Doe",
    "first_name": "John",
    "gender": "male",
    "given_name": "John",
    "groups": ["engineering", "managers"],
    "last_name": "Doe",
    "locale": "en-US",
    "metadata": {
      "account_status": "active",
      "signup_source": "mobile_app"
    },
    "name": "John Doe",
    "phone_number": "+14155552671",
    "picture": "https://example.com/avatar.jpg",
    "preferred_username": "John Michael Doe"
  }
}
```

#### Responses

##### Status: 200 User updated successfully. Returns the modified user object with updated timestamps.

###### Content-Type: application/json

- **`user`**

  `object`
  - **`create_time`**

    `string`, format: `date-time` — Timestamp when the user account was initially created. Automatically set by the server.

  - **`email`**

    `string` — Primary email address for the user. Must be unique across the environment and valid per RFC 5322.

  - **`external_id`**

    `string` — Your application's unique identifier for this organization, used to link Scalekit with your system.

  - **`id`**

    `string` — Unique system-generated identifier for the user. Immutable once created.

  - **`last_login_time`**

    `string`, format: `date-time` — Timestamp of the user's most recent successful authentication. Updated automatically.

  - **`memberships`**

    `array` — List of organization memberships. Automatically populated based on group assignments.

    **Items:**
    - **`accepted_at`**

      `string`, format: `date-time` — Timestamp when the user accepted the invitation.

    - **`created_at`**

      `string`, format: `date-time` — Timestamp when the invitation was created.

    - **`display_name`**

      `string` — Organization display name. This field stores a user-friendly name for the organization that may be different from the formal name, often used for UI display purposes.

    - **`expires_at`**

      `string`, format: `date-time` — Timestamp when the invitation expired.

    - **`inviter_email`**

      `string` — ID of the user who invited this user.

    - **`join_time`**

      `string`, format: `date-time` — Timestamp when the membership was created. Automatically set by the server.

    - **`membership_status`**

      `string`, possible values: `"ACTIVE", "INACTIVE", "PENDING_INVITE", "INVITE_EXPIRED"`

    - **`metadata`**

      `object` — Custom key-value pairs for storing additional user context. Keys (3-25 chars), values (1-256 chars).

    - **`name`**

      `string` — Organization name. This field stores the formal organization name used for identification and display purposes.

    - **`organization_id`**

      `string` — Unique identifier for the organization. Immutable and read-only.

    - **`permissions`**

      `array` — Effective permissions granted to the user within the organization (including inherited permissions from assigned roles). Lists the specific actions and access rights the user can perform.

      **Items:**

      `string`

    - **`provisioning_method`**

      `string` — How the user was provisioned. Possible values: - \`jit_using_sso\` (Just-in-time provisioning during SSO login) - \`allowed_email_domain\` (User joined via allowed email domain matching) - \`org_creator\` (User created the organization) - \`direct_provision\` (User was directly provisioned via API or SCIM) - \`invitation\` (User was invited and accepted an invitation)

    - **`roles`**

      `array`

      **Items:**
      - **`display_name`**

        `string` — Human-readable name for the role

      - **`id`**

        `string` — Role ID

      - **`name`**

        `string` — Attribute name/identifier for the role used in system operations and API calls. This should be a machine-readable identifier that follows naming conventions.

  - **`metadata`**

    `object` — Custom key-value pairs for storing additional user context. Keys (3-25 chars), values (1-256 chars).

  - **`update_time`**

    `string`, format: `date-time` — Timestamp of the last modification to the user account. Automatically updated by the server.

  - **`user_profile`**

    `object` — User's personal information including name, address, and other profile attributes.
    - **`custom_attributes`**

      `object` — Custom attributes for extended user profile data and application-specific information. This field stores business-specific user data like department, job title, security clearances, project assignments, or any other organizational attributes your application requires. Unlike system metadata, these attributes are typically managed by administrators or applications and are visible to end users for personalization and business logic. Keys must be 3-25 characters, values must be 1-256 characters, with a maximum of 20 key-value pairs.

    - **`email_verified`**

      `boolean` — Indicates if the user's email address has been verified. Automatically updated by the system.

    - **`external_identities`**

      `array` — List of external identity connections associated with the user profile.

      **Items:**
      - **`connection_id`**

        `string` — Unique identifier for the external identity connection. Immutable and read-only.

      - **`connection_provider`**

        `string`, possible values: `"OKTA", "GOOGLE", "MICROSOFT_AD", "AUTH0", "ONELOGIN", "PING_IDENTITY", "JUMPCLOUD", "CUSTOM", "GITHUB", "GITLAB", "LINKEDIN", "SALESFORCE", "MICROSOFT", "IDP_SIMULATOR", "SCALEKIT", "ADFS"` — Type of the identity provider.

      - **`connection_type`**

        `string` — Name of the external identity connection.

      - **`connection_user_id`**

        `string` — Unique identifier for the user in the external identity provider system. Immutable and read-only.

      - **`created_time`**

        `string`, format: `date-time` — Timestamp when this external identity connection was first created. Immutable and read-only.

      - **`is_social`**

        `boolean` — Indicates if the identity provider is a social provider (true) or enterprise/custom provider (false). Read-only.

      - **`last_login_time`**

        `string`, format: `date-time` — Timestamp of the user's last successful login via this external identity provider. Automatically updated by the system.

      - **`last_synced_time`**

        `string`, format: `date-time` — Timestamp of the last data synchronization for this external identity from the provider. Automatically updated by the system.

    - **`family_name`**

      `string` — The user's family name (last name or surname). This field stores the user's last name and is combined with the given name to create the full display name. The family name is used in formal communications, user listings, and organizational directories throughout the system. Maximum 255 characters allowed.

    - **`gender`**

      `string` — The user's gender identity information. This field stores the user's gender identity for personalization, compliance reporting, or organizational analytics purposes. This field supports any string value to accommodate diverse gender identities and should be handled with appropriate privacy considerations according to your organization's policies and applicable regulations.

    - **`given_name`**

      `string` — The user's given name (first name). This field stores the user's first name and is used for personalization, display purposes, and when generating the full display name. The given name appears in user interfaces, formal communications, and user listings throughout the system. Maximum 255 characters allowed.

    - **`groups`**

      `array` — The list of group names the user belongs to within the organization. This field stores the user's group memberships for role-based access control, team assignments, and organizational structure. Groups are typically used for permission management, collaborative access, and organizational hierarchy. Each group name represents a distinct organizational unit or team that the user is associated with.

      **Items:**

      `string`

    - **`id`**

      `string` — Unique system-generated identifier for the user profile. Immutable and read-only.

    - **`locale`**

      `string` — The user's preferred language and region settings using BCP-47 format codes. This field customizes the user's experience with localized content, date formats, number formatting, and UI language throughout the system. When not specified, the user inherits the organization's default locale settings. Common values include \`en-US\`, \`en-GB\`, \`fr-FR\`, \`de-DE\`, and \`es-ES\`.

    - **`metadata`**

      `object` — Raw attributes received from identity providers during authentication. This field stores the original user profile data as received from external IdP systems (SAML, OIDC, etc.) including provider-specific claims and attributes. These fields preserve the complete set of attributes received from the identity source and are used for mapping, synchronization, and audit purposes. Keys must be 3-25 characters, values must be 1-256 characters, with a maximum of 20 key-value pairs.

    - **`name`**

      `string` — The user's complete display name in formatted form. This field stores the full name as a single string and is typically used when you want to set the complete name rather than using separate given and family names. This name appears in user interfaces, reports, directory listings, and anywhere a formatted display name is needed. This field serves as a formatted display name that complements the individual given_name and family_name fields.

    - **`phone_number`**

      `string` — The user's phone number in E.164 international format. This field stores the phone number for user contact and identification purposes. The phone number must include the country code and be formatted according to E.164 standards (e.g., \`+1\` for US numbers). This field is optional.

    - **`phone_number_verified`**

      `boolean` — Indicates if the user's phone number has been verified. Automatically updated by the system.

    - **`picture`**

      `string` — The URL to the user's profile picture or avatar image. This field stores the location of the user's profile photo that appears in user interfaces, directory listings, and collaborative features throughout the system. The URL should point to a publicly accessible image file. Supported formats typically include JPEG, PNG, and GIF. This image is used for visual identification and personalization across the platform.

    - **`preferred_username`**

      `string` — The user's preferred username for display and identification purposes. This field stores a custom username that the user prefers to be known by, which may differ from their email or formal name. This username appears in user interfaces, mentions, informal communications, and collaborative features throughout the system. Maximum 512 characters allowed.

**Example:**

```json
{
  "user": {
    "create_time": "",
    "email": "user@example.com",
    "external_id": "ext_12345a67b89c",
    "id": "usr_1234abcd5678efgh",
    "last_login_time": "",
    "memberships": [{}],
    "metadata": {
      "department": "engineering",
      "location": "nyc-office"
    },
    "update_time": "",
    "user_profile": null
  }
}
```

### List user sessions

- **Method:** `GET`
- **Path:** `/api/v1/users/{user_id}/sessions`
- **Tags:** Sessions

Retrieves a paginated list of all sessions associated with a specific user across all devices and browsers. Use this endpoint to audit user activity, display all active sessions in account management interfaces, or verify user authentication status across devices. Supports filtering by session status (active, expired, revoked, logout) and time range (creation date). Returns session details for each session including device information, IP address, geolocation, and current status. The response includes pagination metadata (page tokens and total count) to handle large session lists efficiently.

#### Responses

##### Status: 200 Successfully retrieved user sessions. Returns a list of sessions with pagination information

###### Content-Type: application/json

- **`next_page_token`**

  `string` — Pagination token for retrieving the next page of results. Empty string if there are no more pages (you have reached the final page of results).

- **`prev_page_token`**

  `string` — Pagination token for retrieving the previous page of results. Empty string for the first page. Use this to navigate backward through result pages.

- **`sessions`**

  `array` — Array of session objects for the requested user. May contain fewer entries than the requested page_size when reaching the final page of results.

  **Items:**
  - **`absolute_expires_at`**

    `string`, format: `date-time` — Hard expiration timestamp for the session regardless of user activity. The session will be forcibly terminated at this time. This represents the maximum session lifetime from creation.

  - **`authenticated_clients`**

    `array` — Details of the authenticated clients for this session: client ID and organization context.

    **Items:**
    - **`client_id`**

      `string` — Unique identifier of the authenticated client application.

    - **`organization_id`**

      `string` — Active or last active Organization ID associated with the authenticated client.

  - **`authenticated_organizations`**

    `array` — List of organization IDs that have been authenticated for this user within the current session. Contains all organizations where the user has successfully completed SSO or authentication.

    **Items:**

    `string`

  - **`created_at`**

    `string`, format: `date-time` — Timestamp indicating when the session was created. This is set once at session creation and remains constant throughout the session lifetime.

  - **`device`**

    `object` — Complete device metadata associated with this session including browser, operating system, device type, and geographic location based on IP address.
    - **`browser`**

      `string` — Browser name and family extracted from the user agent. Examples: Chrome, Safari, Firefox, Edge, Mobile Safari.

    - **`browser_version`**

      `string` — Version of the browser application. Represents the specific release version of the browser being used.

    - **`device_type`**

      `string` — Categorized device type classification. Possible values: 'desktop' (traditional computers), 'mobile' (smartphones and small tablets), 'tablet' (large tablets), 'other'. Useful for displaying session information by device category.

    - **`ip`**

      `string` — IP address of the device that initiated the session. This is the public-facing IP address used to connect to the application. Useful for security audits and geographic distribution analysis.

    - **`location`**

      `object` — Geographic location information derived from IP address geolocation. Includes country, region, city, and coordinates. Note: Based on IP location data and may not represent the user's exact physical location.
      - **`city`**

        `string` — City name where the session originated based on IP geolocation. Approximate location derived from IP address.

      - **`latitude`**

        `string` — Latitude coordinate of the estimated location. Decimal format (e.g., '37.7749'). Note: Represents IP geolocation center and may not be precise.

      - **`longitude`**

        `string` — Longitude coordinate of the estimated location. Decimal format (e.g., '-122.4194'). Note: Represents IP geolocation center and may not be precise.

      - **`region`**

        `string` — Geographic region name derived from IP geolocation. Represents the country-level location (e.g., 'United States', 'France').

      - **`region_subdivision`**

        `string` — Regional subdivision code or name (e.g., state abbreviation for US, province for Canada). Two-letter ISO format when applicable.

    - **`os`**

      `string` — Operating system name extracted from the user agent and device headers. Examples: macOS, Windows, Linux, iOS, Android.

    - **`os_version`**

      `string` — Version of the operating system. Represents the specific OS release the device is running.

    - **`user_agent`**

      `string` — Complete HTTP User-Agent header string from the client request. Contains browser type, version, and operating system information. Used for detailed device fingerprinting and user agent analysis.

  - **`expired_at`**

    `string`, format: `date-time` — Timestamp when the session was terminated. Null if the session is still active. Set when the session expires due to reaching idle_expires_at or absolute_expires_at timeout, or when administratively revoked. Not set for user-initiated logout (see logout_at instead).

  - **`idle_expires_at`**

    `string`, format: `date-time` — Projected expiration timestamp if the session remains idle without user activity. This timestamp is recalculated with each user activity. Session will be automatically terminated at this time if no activity occurs.

  - **`last_active_at`**

    `string`, format: `date-time` — Timestamp of the most recent user activity detected in this session. Updated on each API request or user interaction. Used to determine if a session has exceeded the idle timeout threshold.

  - **`logout_at`**

    `string`, format: `date-time` — Timestamp when the user explicitly logged out from the session. Null if the user has not logged out. When set, indicates the session ended due to explicit user logout rather than timeout.

  - **`organization_id`**

    `string` — Organization ID for the user's most recently active organization within this session. This represents the primary organization context for the current session.

  - **`session_id`**

    `string` — Unique identifier for the session. System-generated read-only field used to reference this session.

  - **`status`**

    `string` — Current operational status of the session. Possible values: 'active' (session is valid and requests are allowed), 'expired' (session terminated due to idle or absolute timeout), 'revoked' (session was administratively revoked), 'logout' (user explicitly logged out). Use this to determine if the session can be used for new requests.

  - **`updated_at`**

    `string`, format: `date-time` — Timestamp indicating when the session was last updated. Updated whenever session state changes such as organization context changes or metadata updates.

  - **`user_id`**

    `string` — Unique identifier for the user who owns and is authenticated within this session.

- **`total_size`**

  `integer`, format: `int64` — Total number of sessions matching the applied filter criteria, regardless of pagination. This represents the complete result set size before pagination is applied.

**Example:**

```json
{
  "next_page_token": "eyJwYWdlIjogMiwgImxhc3RfaWQiOiAic2VzXzEyMzQ1In0=",
  "prev_page_token": "eyJwYWdlIjogMCwgImZpcnN0X2lkIjogInNlc183OTAxIn0=",
  "sessions": [
    {
      "absolute_expires_at": "2025-01-22T10:30:00Z",
      "authenticated_clients": [{}],
      "authenticated_organizations": ["org_123", "org_456"],
      "created_at": "2025-01-15T10:30:00Z",
      "device": null,
      "expired_at": "2025-01-15T12:00:00Z",
      "idle_expires_at": "2025-01-15T11:30:00Z",
      "last_active_at": "2025-01-15T10:55:30Z",
      "logout_at": "2025-01-15T14:00:00Z",
      "organization_id": "org_1234567890123456",
      "session_id": "ses_1234567890123456",
      "status": "active",
      "updated_at": "2025-01-15T10:45:00Z",
      "user_id": "usr_1234567890123456"
    }
  ],
  "total_size": 42
}
```

### Revoke all user sessions

- **Method:** `POST`
- **Path:** `/api/v1/users/{user_id}/sessions/revoke`
- **Tags:** Sessions

Immediately invalidates all active sessions for a specific user across all devices and browsers, setting their status to 'revoked'. Use this endpoint to implement global logout functionality, force re-authentication after security incidents, or terminate all sessions following a password reset or credential compromise. Only active sessions are revoked; already expired, logout, or previously revoked sessions remain unchanged. The revocation is atomic and instantaneous. Returns a list of all revoked sessions with their details and a total count of sessions revoked.

#### Responses

##### Status: 200 Successfully revoked all user sessions. Returns the list of revoked sessions and total count

###### Content-Type: application/json

- **`revoked_sessions`**

  `array` — List of all sessions that were revoked, including detailed information for each revoked session with IDs, timestamps, and device details.

  **Items:**
  - **`absolute_expires_at`**

    `string`, format: `date-time` — The absolute expiration timestamp that was configured for this session before revocation. Represents the hard deadline regardless of activity.

  - **`created_at`**

    `string`, format: `date-time` — Timestamp indicating when the session was originally created before revocation.

  - **`expired_at`**

    `string`, format: `date-time` — Timestamp when the session was actually terminated. Set to the revocation time when the session is revoked.

  - **`idle_expires_at`**

    `string`, format: `date-time` — The idle expiration timestamp that was configured for this session before revocation. Represents when the session would have expired due to inactivity.

  - **`last_active_at`**

    `string`, format: `date-time` — Timestamp of the last recorded user activity in this session before revocation. Helps identify inactive sessions that were revoked.

  - **`logout_at`**

    `string`, format: `date-time` — Timestamp when the user explicitly logged out (if applicable). Null if the session was revoked without prior logout.

  - **`session_id`**

    `string` — Unique identifier for the revoked session. System-generated read-only field.

  - **`status`**

    `string` — Status of the session after revocation. Always 'revoked' since only active sessions can be revoked. Sessions that were already expired or logged out are not included in the revocation response.

  - **`updated_at`**

    `string`, format: `date-time` — Timestamp indicating when the session was last modified before revocation.

  - **`user_id`**

    `string` — Unique identifier for the user who owned this session.

- **`total_revoked`**

  `integer`, format: `int64` — Total count of active sessions that were revoked. Useful for confirmation and audit logging.

**Example:**

```json
{
  "revoked_sessions": [
    {
      "absolute_expires_at": "2025-01-22T10:30:00Z",
      "created_at": "2025-01-15T10:30:00Z",
      "expired_at": "2025-01-15T12:00:00Z",
      "idle_expires_at": "2025-01-15T11:30:00Z",
      "last_active_at": "2025-01-15T10:55:30Z",
      "logout_at": "2025-01-15T14:00:00Z",
      "session_id": "ses_1234567890123456",
      "status": "revoked",
      "updated_at": "2025-01-15T10:45:00Z",
      "user_id": "usr_1234567890123456"
    }
  ],
  "total_revoked": 5
}
```

### Search users

- **Method:** `GET`
- **Path:** `/api/v1/users:search`
- **Tags:** Users

Searches for users across the entire environment by email address, user ID, or external ID. The query must be at least 3 characters and is case-insensitive. Returns a paginated list of matching users with up to 30 results per page. Use the next_page_token from the response to retrieve subsequent pages.

#### Responses

##### Status: 200 Matching users returned; includes pagination cursors for navigating large result sets.

###### Content-Type: application/json

- **`next_page_token`**

  `string` — Token for retrieving the next page of results. Empty if there are no more pages.

- **`prev_page_token`**

  `string` — Token for retrieving the previous page of results. Empty if this is the first page.

- **`total_size`**

  `integer`, format: `int64` — Total number of users matching the request criteria, regardless of pagination.

- **`users`**

  `array` — List of matching users.

  **Items:**
  - **`create_time`**

    `string`, format: `date-time` — Timestamp when the user account was initially created. Automatically set by the server.

  - **`email`**

    `string` — Primary email address for the user. Must be unique across the environment and valid per RFC 5322.

  - **`external_id`**

    `string` — Your application's unique identifier for this organization, used to link Scalekit with your system.

  - **`id`**

    `string` — Unique system-generated identifier for the user. Immutable once created.

  - **`last_login_time`**

    `string`, format: `date-time` — Timestamp of the user's most recent successful authentication. Updated automatically.

  - **`memberships`**

    `array` — List of organization memberships. Automatically populated based on group assignments.

    **Items:**
    - **`accepted_at`**

      `string`, format: `date-time` — Timestamp when the user accepted the invitation.

    - **`created_at`**

      `string`, format: `date-time` — Timestamp when the invitation was created.

    - **`display_name`**

      `string` — Organization display name. This field stores a user-friendly name for the organization that may be different from the formal name, often used for UI display purposes.

    - **`expires_at`**

      `string`, format: `date-time` — Timestamp when the invitation expired.

    - **`inviter_email`**

      `string` — ID of the user who invited this user.

    - **`join_time`**

      `string`, format: `date-time` — Timestamp when the membership was created. Automatically set by the server.

    - **`membership_status`**

      `string`, possible values: `"ACTIVE", "INACTIVE", "PENDING_INVITE", "INVITE_EXPIRED"`

    - **`metadata`**

      `object` — Custom key-value pairs for storing additional user context. Keys (3-25 chars), values (1-256 chars).

    - **`name`**

      `string` — Organization name. This field stores the formal organization name used for identification and display purposes.

    - **`organization_id`**

      `string` — Unique identifier for the organization. Immutable and read-only.

    - **`permissions`**

      `array` — Effective permissions granted to the user within the organization (including inherited permissions from assigned roles). Lists the specific actions and access rights the user can perform.

      **Items:**

      `string`

    - **`provisioning_method`**

      `string` — How the user was provisioned. Possible values: - \`jit_using_sso\` (Just-in-time provisioning during SSO login) - \`allowed_email_domain\` (User joined via allowed email domain matching) - \`org_creator\` (User created the organization) - \`direct_provision\` (User was directly provisioned via API or SCIM) - \`invitation\` (User was invited and accepted an invitation)

    - **`roles`**

      `array`

      **Items:**
      - **`display_name`**

        `string` — Human-readable name for the role

      - **`id`**

        `string` — Role ID

      - **`name`**

        `string` — Attribute name/identifier for the role used in system operations and API calls. This should be a machine-readable identifier that follows naming conventions.

  - **`metadata`**

    `object` — Custom key-value pairs for storing additional user context. Keys (3-25 chars), values (1-256 chars).

  - **`update_time`**

    `string`, format: `date-time` — Timestamp of the last modification to the user account. Automatically updated by the server.

  - **`user_profile`**

    `object` — User's personal information including name, address, and other profile attributes.
    - **`custom_attributes`**

      `object` — Custom attributes for extended user profile data and application-specific information. This field stores business-specific user data like department, job title, security clearances, project assignments, or any other organizational attributes your application requires. Unlike system metadata, these attributes are typically managed by administrators or applications and are visible to end users for personalization and business logic. Keys must be 3-25 characters, values must be 1-256 characters, with a maximum of 20 key-value pairs.

    - **`email_verified`**

      `boolean` — Indicates if the user's email address has been verified. Automatically updated by the system.

    - **`external_identities`**

      `array` — List of external identity connections associated with the user profile.

      **Items:**
      - **`connection_id`**

        `string` — Unique identifier for the external identity connection. Immutable and read-only.

      - **`connection_provider`**

        `string`, possible values: `"OKTA", "GOOGLE", "MICROSOFT_AD", "AUTH0", "ONELOGIN", "PING_IDENTITY", "JUMPCLOUD", "CUSTOM", "GITHUB", "GITLAB", "LINKEDIN", "SALESFORCE", "MICROSOFT", "IDP_SIMULATOR", "SCALEKIT", "ADFS"` — Type of the identity provider.

      - **`connection_type`**

        `string` — Name of the external identity connection.

      - **`connection_user_id`**

        `string` — Unique identifier for the user in the external identity provider system. Immutable and read-only.

      - **`created_time`**

        `string`, format: `date-time` — Timestamp when this external identity connection was first created. Immutable and read-only.

      - **`is_social`**

        `boolean` — Indicates if the identity provider is a social provider (true) or enterprise/custom provider (false). Read-only.

      - **`last_login_time`**

        `string`, format: `date-time` — Timestamp of the user's last successful login via this external identity provider. Automatically updated by the system.

      - **`last_synced_time`**

        `string`, format: `date-time` — Timestamp of the last data synchronization for this external identity from the provider. Automatically updated by the system.

    - **`family_name`**

      `string` — The user's family name (last name or surname). This field stores the user's last name and is combined with the given name to create the full display name. The family name is used in formal communications, user listings, and organizational directories throughout the system. Maximum 255 characters allowed.

    - **`gender`**

      `string` — The user's gender identity information. This field stores the user's gender identity for personalization, compliance reporting, or organizational analytics purposes. This field supports any string value to accommodate diverse gender identities and should be handled with appropriate privacy considerations according to your organization's policies and applicable regulations.

    - **`given_name`**

      `string` — The user's given name (first name). This field stores the user's first name and is used for personalization, display purposes, and when generating the full display name. The given name appears in user interfaces, formal communications, and user listings throughout the system. Maximum 255 characters allowed.

    - **`groups`**

      `array` — The list of group names the user belongs to within the organization. This field stores the user's group memberships for role-based access control, team assignments, and organizational structure. Groups are typically used for permission management, collaborative access, and organizational hierarchy. Each group name represents a distinct organizational unit or team that the user is associated with.

      **Items:**

      `string`

    - **`id`**

      `string` — Unique system-generated identifier for the user profile. Immutable and read-only.

    - **`locale`**

      `string` — The user's preferred language and region settings using BCP-47 format codes. This field customizes the user's experience with localized content, date formats, number formatting, and UI language throughout the system. When not specified, the user inherits the organization's default locale settings. Common values include \`en-US\`, \`en-GB\`, \`fr-FR\`, \`de-DE\`, and \`es-ES\`.

    - **`metadata`**

      `object` — Raw attributes received from identity providers during authentication. This field stores the original user profile data as received from external IdP systems (SAML, OIDC, etc.) including provider-specific claims and attributes. These fields preserve the complete set of attributes received from the identity source and are used for mapping, synchronization, and audit purposes. Keys must be 3-25 characters, values must be 1-256 characters, with a maximum of 20 key-value pairs.

    - **`name`**

      `string` — The user's complete display name in formatted form. This field stores the full name as a single string and is typically used when you want to set the complete name rather than using separate given and family names. This name appears in user interfaces, reports, directory listings, and anywhere a formatted display name is needed. This field serves as a formatted display name that complements the individual given_name and family_name fields.

    - **`phone_number`**

      `string` — The user's phone number in E.164 international format. This field stores the phone number for user contact and identification purposes. The phone number must include the country code and be formatted according to E.164 standards (e.g., \`+1\` for US numbers). This field is optional.

    - **`phone_number_verified`**

      `boolean` — Indicates if the user's phone number has been verified. Automatically updated by the system.

    - **`picture`**

      `string` — The URL to the user's profile picture or avatar image. This field stores the location of the user's profile photo that appears in user interfaces, directory listings, and collaborative features throughout the system. The URL should point to a publicly accessible image file. Supported formats typically include JPEG, PNG, and GIF. This image is used for visual identification and personalization across the platform.

    - **`preferred_username`**

      `string` — The user's preferred username for display and identification purposes. This field stores a custom username that the user prefers to be known by, which may differ from their email or formal name. This username appears in user interfaces, mentions, informal communications, and collaborative features throughout the system. Maximum 512 characters allowed.

**Example:**

```json
{
  "next_page_token": "eyJwYWdlIjogMiwgImxhc3RfaWQiOiAidXNyXzEyMzQ1In0=",
  "prev_page_token": "eyJwYWdlIjogMCwgImZpcnN0X2lkIjogInVzcl85ODc2NSJ9",
  "total_size": 1042,
  "users": [
    {
      "create_time": "",
      "email": "user@example.com",
      "external_id": "ext_12345a67b89c",
      "id": "usr_1234abcd5678efgh",
      "last_login_time": "",
      "memberships": [{}],
      "metadata": {
        "department": "engineering",
        "location": "nyc-office"
      },
      "update_time": "",
      "user_profile": null
    }
  ]
}
```

##### Status: 400 Bad Request - query must be at least 3 characters and no more than 100 characters.

###### Content-Type: application/json

**Example:**

```json
null
```

### List user's passkeys

- **Method:** `GET`
- **Path:** `/api/v1/webauthn/credentials`
- **Tags:** Passkeys

Retrieves all registered passkeys for the current user, including device information, creation timestamps, and display names. Use this to show users their registered authenticators.

#### Responses

##### Status: 200 List of passkeys with metadata

###### Content-Type: application/json

- **`all_accepted_credentials_options`**

  `object` — Options including RP ID and all accepted credential IDs for authentication
  - **`all_accepted_credential_ids`**

    `array` — List of credential IDs the user can authenticate with

    **Items:**

    `string`

  - **`rp_id`**

    `string` — Relying Party ID for credential operations

  - **`user_id`**

    `string` — User ID for credential verification

- **`credentials`**

  `array` — All passkeys registered for the user

  **Items:**
  - **`attestation_type`**

    `string` — Type of attestation: "none", "indirect", or "direct"

  - **`authenticator`**

    `object` — Authenticator information including model and name
    - **`aaguid`**

      `string` — Authenticator Attestation GUID (AAGUID) identifying the device model

    - **`attachment`**

      `string` — Attachment type: "platform" (built-in) or "cross-platform"

    - **`icon_dark`**

      `string` — Icon URL for dark theme display

    - **`icon_light`**

      `string` — Icon URL for light theme display

    - **`name`**

      `string` — Human-readable name of the authenticator model

  - **`authenticator_flags`**

    `object` — Flags indicating authenticator capabilities
    - **`backup_eligible`**

      `boolean` — Whether this credential can be backed up to another device

    - **`backup_state`**

      `boolean` — Whether this credential was synced or backed up

    - **`user_present`**

      `boolean` — Whether the user was present during authentication

    - **`user_verified`**

      `boolean` — Whether the user was verified (e.g., fingerprint, PIN)

  - **`client_info`**

    `object` — Geographic and network information from registration
    - **`city`**

      `string` — City name

    - **`ip`**

      `string` — IP address from which credential was registered

    - **`region`**

      `string` — Geographic region (e.g., "US")

    - **`region_subdivision`**

      `string` — Regional subdivision (e.g., "CA")

  - **`created_at`**

    `string`, format: `date-time` — Timestamp when the credential was created

  - **`credential_id`**

    `string` — The actual credential ID bytes from the authenticator

  - **`display_name`**

    `string` — Optional user-friendly name for this passkey

  - **`id`**

    `string` — Credential unique identifier

  - **`transports`**

    `array` — Supported transports for this credential

    **Items:**

    `string`

  - **`updated_at`**

    `string`, format: `date-time` — Timestamp of last update

  - **`user_agent`**

    `object` — Browser and device information from registration
    - **`browser`**

      `string` — Browser name (e.g., "Chrome", "Safari")

    - **`browser_version`**

      `string` — Browser version number

    - **`device_model`**

      `string` — Device model if available

    - **`device_type`**

      `string` — Device type: "desktop", "mobile", or "tablet"

    - **`os`**

      `string` — Operating system name (e.g., "Windows", "iOS")

    - **`os_version`**

      `string` — Operating system version

    - **`raw`**

      `string` — Raw user agent string from the browser

    - **`url`**

      `string` — Parsed user agent URL reference

  - **`user_id`**

    `string` — User ID this credential belongs to

**Example:**

```json
{
  "all_accepted_credentials_options": {
    "all_accepted_credential_ids": [""],
    "rp_id": "example.com",
    "user_id": "user_xyz789"
  },
  "credentials": [
    {
      "attestation_type": "direct",
      "authenticator": null,
      "authenticator_flags": null,
      "client_info": null,
      "created_at": "2025-02-15T06:23:44.560000Z",
      "credential_id": "",
      "display_name": "My Yubikey",
      "id": "cred_abc123",
      "transports": [""],
      "updated_at": "2025-02-15T06:23:44.560000Z",
      "user_agent": null,
      "user_id": "user_xyz789"
    }
  ]
}
```

### Remove a passkey

- **Method:** `DELETE`
- **Path:** `/api/v1/webauthn/credentials/{credential_id}`
- **Tags:** Passkeys

Deletes a specific passkey credential for the current user. After removal, the authenticator can no longer be used for authentication.

#### Responses

##### Status: 200 Passkey successfully deleted

###### Content-Type: application/json

- **`success`**

  `boolean` — Whether the credential was successfully deleted

- **`unknown_credential_options`**

  `object` — Options for handling unknown credentials in client applications
  - **`credential_id`**

    `string` — The deleted credential ID

  - **`rp_id`**

    `string` — The RP ID for this credential

**Example:**

```json
{
  "success": true,
  "unknown_credential_options": {
    "credential_id": "cred_abc123",
    "rp_id": "example.com"
  }
}
```

### Rename a passkey

- **Method:** `PATCH`
- **Path:** `/api/v1/webauthn/credentials/{credential_id}`
- **Tags:** Passkeys

Updates the display name of a passkey credential to help users identify their authenticators. Only the display name can be modified.

#### Request Body

##### Content-Type: application/json

- **`display_name`**

  `string` — Human-friendly name for this credential (1-120 characters)

**Example:**

```json
{
  "display_name": "My iPhone 15 Pro"
}
```

#### Responses

##### Status: 200 Passkey successfully updated with new name

###### Content-Type: application/json

- **`credential`**

  `object` — The updated credential with new display name
  - **`attestation_type`**

    `string` — Type of attestation: "none", "indirect", or "direct"

  - **`authenticator`**

    `object` — Authenticator information including model and name
    - **`aaguid`**

      `string` — Authenticator Attestation GUID (AAGUID) identifying the device model

    - **`attachment`**

      `string` — Attachment type: "platform" (built-in) or "cross-platform"

    - **`icon_dark`**

      `string` — Icon URL for dark theme display

    - **`icon_light`**

      `string` — Icon URL for light theme display

    - **`name`**

      `string` — Human-readable name of the authenticator model

  - **`authenticator_flags`**

    `object` — Flags indicating authenticator capabilities
    - **`backup_eligible`**

      `boolean` — Whether this credential can be backed up to another device

    - **`backup_state`**

      `boolean` — Whether this credential was synced or backed up

    - **`user_present`**

      `boolean` — Whether the user was present during authentication

    - **`user_verified`**

      `boolean` — Whether the user was verified (e.g., fingerprint, PIN)

  - **`client_info`**

    `object` — Geographic and network information from registration
    - **`city`**

      `string` — City name

    - **`ip`**

      `string` — IP address from which credential was registered

    - **`region`**

      `string` — Geographic region (e.g., "US")

    - **`region_subdivision`**

      `string` — Regional subdivision (e.g., "CA")

  - **`created_at`**

    `string`, format: `date-time` — Timestamp when the credential was created

  - **`credential_id`**

    `string` — The actual credential ID bytes from the authenticator

  - **`display_name`**

    `string` — Optional user-friendly name for this passkey

  - **`id`**

    `string` — Credential unique identifier

  - **`transports`**

    `array` — Supported transports for this credential

    **Items:**

    `string`

  - **`updated_at`**

    `string`, format: `date-time` — Timestamp of last update

  - **`user_agent`**

    `object` — Browser and device information from registration
    - **`browser`**

      `string` — Browser name (e.g., "Chrome", "Safari")

    - **`browser_version`**

      `string` — Browser version number

    - **`device_model`**

      `string` — Device model if available

    - **`device_type`**

      `string` — Device type: "desktop", "mobile", or "tablet"

    - **`os`**

      `string` — Operating system name (e.g., "Windows", "iOS")

    - **`os_version`**

      `string` — Operating system version

    - **`raw`**

      `string` — Raw user agent string from the browser

    - **`url`**

      `string` — Parsed user agent URL reference

  - **`user_id`**

    `string` — User ID this credential belongs to

**Example:**

```json
{
  "credential": {
    "attestation_type": "direct",
    "authenticator": null,
    "authenticator_flags": null,
    "client_info": null,
    "created_at": "2025-02-15T06:23:44.560000Z",
    "credential_id": "",
    "display_name": "My Yubikey",
    "id": "cred_abc123",
    "transports": [""],
    "updated_at": "2025-02-15T06:23:44.560000Z",
    "user_agent": null,
    "user_id": "user_xyz789"
  }
}
```

## Webhooks

### Organization Created

- **Method:**`POST`
- **Path:**`/webhooks/organization.created`

Triggered when a new organization is created in Scalekit

### Organization Updated

- **Method:**`POST`
- **Path:**`/webhooks/organization.updated`

Triggered when an organization is updated

### Organization Deleted

- **Method:**`POST`
- **Path:**`/webhooks/organization.deleted`

Triggered when an organization is deleted

### User Signup

- **Method:**`POST`
- **Path:**`/webhooks/user.signup`

Triggered when a user signs up to create a new organization

### User Login

- **Method:**`POST`
- **Path:**`/webhooks/user.login`

Triggered when a user logs in and a session is created

### User Logout

- **Method:**`POST`
- **Path:**`/webhooks/user.logout`

Triggered when a user's session is terminated

### User Organization Invitation

- **Method:**`POST`
- **Path:**`/webhooks/user.organization_invitation`

Triggered when a user is invited to join an organization

### User Organization Membership Created

- **Method:**`POST`
- **Path:**`/webhooks/user.organization_membership_created`

Triggered when a user joins an organization

### User Organization Membership Deleted

- **Method:**`POST`
- **Path:**`/webhooks/user.organization_membership_deleted`

Triggered when a user's membership in an organization is removed or deleted

### User Organization Membership Updated

- **Method:**`POST`
- **Path:**`/webhooks/user.organization_membership_updated`

Triggered when a user's organization membership is updated, e.g., change of user's role in an organization

### Directory Enabled

- **Method:**`POST`
- **Path:**`/webhooks/organization.directory_enabled`

Triggered when a directory sync is enabled

### Directory Disabled

- **Method:**`POST`
- **Path:**`/webhooks/organization.directory_disabled`

Triggered when a directory sync is disabled

### Directory User Created

- **Method:**`POST`
- **Path:**`/webhooks/organization.directory.user_created`

Triggered when a new directory user is created

### Directory User Updated

- **Method:**`POST`
- **Path:**`/webhooks/organization.directory.user_updated`

Triggered when a directory user is updated

### Directory User Deleted

- **Method:**`POST`
- **Path:**`/webhooks/organization.directory.user_deleted`

Triggered when a directory user is deleted

### Directory Group Created

- **Method:**`POST`
- **Path:**`/webhooks/organization.directory.group_created`

Triggered when a new directory group is created

### Directory Group Updated

- **Method:**`POST`
- **Path:**`/webhooks/organization.directory.group_updated`

Triggered when a directory group is updated

### Directory Group Deleted

- **Method:**`POST`
- **Path:**`/webhooks/organization.directory.group_deleted`

Triggered when a directory group is deleted

### SSO Connection Created

- **Method:**`POST`
- **Path:**`/webhooks/organization.sso_created`

Triggered when a new SSO connection is created for an organization

### SSO Connection Enabled

- **Method:**`POST`
- **Path:**`/webhooks/organization.sso_enabled`

Triggered when an SSO connection is enabled for an organization

### SSO Connection Disabled

- **Method:**`POST`
- **Path:**`/webhooks/organization.sso_disabled`

Triggered when an SSO connection is disabled for an organization

### SSO Connection Deleted

- **Method:**`POST`
- **Path:**`/webhooks/organization.sso_deleted`

Triggered when an SSO connection is deleted for an organization

### Role Created

- **Method:**`POST`
- **Path:**`/webhooks/role.created`

Triggered when a new role is created

### Role Updated

- **Method:**`POST`
- **Path:**`/webhooks/role.updated`

Triggered when a role is updated

### Role Deleted

- **Method:**`POST`
- **Path:**`/webhooks/role.deleted`

Triggered when a role is deleted

### Permission Created

- **Method:**`POST`
- **Path:**`/webhooks/permission.created`

Triggered when a new permission is created

### Permission Updated

- **Method:**`POST`
- **Path:**`/webhooks/permission.updated`

Triggered when a permission is updated

### Permission Deleted

- **Method:**`POST`
- **Path:**`/webhooks/permission.deleted`

Triggered when a permission is deleted

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

### HelpInfoLink

- **Type:**`object`

A documentation or reference link.

- **`description`**

  `string` — Human-readable label for the link (e.g. "User verification flow").

- **`url`**

  `string` — Absolute URL to the documentation page (e.g. "https\://docs.scalekit.com/...").

**Example:**

```json
{
  "description": "",
  "url": ""
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
      "tools": [""]
    }
  ],
  "description": "Updated daily summarizer config"
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

### OrganizationServiceUpdateOrganizationSessionPolicyBody

- **Type:**`object`

* **`absolute_session_timeout`**

  `integer`, format: `int32` — The absolute session timeout value. The unit is specified by absolute_session_timeout_unit. Omit when policy_source is APPLICATION.

* **`absolute_session_timeout_unit`**

  `string`, possible values: `"MINUTES", "HOURS", "DAYS"` — Unit for absolute_session_timeout. Accepted values: 'MINUTES', 'HOURS', 'DAYS'. Defaults to MINUTES.

* **`idle_session_timeout`**

  `integer`, format: `int32` — The idle session timeout value. The unit is specified by idle_session_timeout_unit. Omit when idle_session_timeout_enabled is false.

* **`idle_session_timeout_enabled`**

  `boolean` — Whether idle session timeout is enabled. Omit when policy_source is APPLICATION.

* **`idle_session_timeout_unit`**

  `string`, possible values: `"MINUTES", "HOURS", "DAYS"` — Unit for idle_session_timeout. Accepted values: 'MINUTES', 'HOURS', 'DAYS'. Defaults to MINUTES.

* **`policy_source`**

  `string`, possible values: `"APPLICATION", "CUSTOM"` — Policy source. Send 'APPLICATION' to revert to application defaults. Send 'CUSTOM' with timeout values to activate a custom policy.

**Example:**

```json
{
  "absolute_session_timeout": 360,
  "absolute_session_timeout_unit": "MINUTES",
  "idle_session_timeout": 84,
  "idle_session_timeout_enabled": true,
  "idle_session_timeout_unit": "MINUTES",
  "policy_source": "CUSTOM"
}
```

### OrganizationServiceUpsertUserManagementSettingsBody

- **Type:**`object`

* **`settings`**

  `object` — The new values for the setting fields to patch.
  - **`max_allowed_users`**

    `integer`, format: `int32` — Maximum number of users allowed in the organization. When nil (not set), there feature is not enabled. When explicitly set to zero, it also means no limit. When set to a positive integer, it enforces the maximum user limit.

**Example:**

```json
{
  "settings": {
    "max_allowed_users": 100
  }
}
```

### RolesServiceAddPermissionsToRoleBody

- **Type:**`object`

* **`permission_names`**

  `array` — List of permission names to add to the role

  **Items:**

  `string`

**Example:**

```json
{
  "permission_names": [""]
}
```

### RolesServiceUpdateDefaultOrganizationRolesBody

- **Type:**`object`

* **`default_member_role`**

  `string` — Unique name of the default member role

**Example:**

```json
{
  "default_member_role": "member"
}
```

### UserServiceResendInviteBody

- **Type:**`object`

**Example:**

```json
{}
```

### ValidationErrorInfoFieldViolation

- **Type:**`object`

A message type used to describe a single bad request field.

- **`constraint`**

  `string`

- **`description`**

  `string` — A description of why the request element is bad.

- **`field`**

  `string`

**Example:**

```json
{
  "constraint": "",
  "description": "",
  "field": ""
}
```

### Attestation preferences for registration

- **Type:**`object`

* **`conveyance_preference`**

  `string`

* **`enterprise_approved_ids`**

  `array`

  **Items:**

  `string`

**Example:**

```json
{
  "conveyance_preference": "",
  "enterprise_approved_ids": [""]
}
```

### WebAuthConfigurationAuthenticatorSelection

- **Type:**`object`

* **`authenticator_attachment`**

  `string`

* **`user_verification`**

  `string`

**Example:**

```json
{
  "authenticator_attachment": "",
  "user_verification": ""
}
```

### WebAuthConfigurationAuthenticators

- **Type:**`object`

* **`desired_authenticator_status`**

  `array` — provides the list of statuses which are considered undesirable for status report validation purposes. Should be used with validate_status set to true.

  **Items:**

  `string`, default: `"[]"`

* **`undesired_authenticator_status`**

  `array` — provides the list of statuses which are considered undesirable for status report validation purposes. Should be used with validate_status set to true.

  **Items:**

  `string`, default: `"['ATTESTATION_KEY_COMPROMISE', 'USER_VERIFICATION_BYPASS', 'USER_KEY_REMOTE_COMPROMISE', 'USER_KEY_PHYSICAL_COMPROMISE', 'REVOKED']"`

* **`validate_anchors`**

  `boolean` — when set to true enables the validation of the attestation statement against the trust anchor from the metadata statement.

* **`validate_attestation_type`**

  `boolean` — when set to true enables the validation of the attestation statements type against the known types the authenticator can produce.

* **`validate_entry`**

  `boolean` — requires that the provided metadata has an entry for the given authenticator to be considered valid. By default an AAGUID which has a zero value should fail validation if validate_entry_permit_zero_aaguid is not provided with the value of true.

* **`validate_entry_permit_zero_aaguid`**

  `boolean` — is an option that permits a zero'd AAGUID from an attestation statement to automatically pass metadata validations. Generally helpful to use with validate_entry.

* **`validate_status`**

  `boolean` — when set to true enables the validation of the attestation statements AAGUID against the desired and undesired lists

**Example:**

```json
{
  "desired_authenticator_status": ["[]"],
  "undesired_authenticator_status": [
    "['ATTESTATION_KEY_COMPROMISE', 'USER_VERIFICATION_BYPASS', 'USER_KEY_REMOTE_COMPROMISE', 'USER_KEY_PHYSICAL_COMPROMISE', 'REVOKED']"
  ],
  "validate_anchors": true,
  "validate_attestation_type": true,
  "validate_entry": true,
  "validate_entry_permit_zero_aaguid": true,
  "validate_status": true
}
```

### Rp contains relying party identifiers and origins

- **Type:**`object`

* **`ids`**

  `array`

  **Items:**

  `string`

* **`origins`**

  `array`

  **Items:**

  `string`

**Example:**

```json
{
  "ids": [""],
  "origins": [""]
}
```

### WebAuthConfigurationTimeout

- **Type:**`object`

* **`login`**

  `string`, default: `"\"300s\""` — Login timeout duration

* **`login_uvd`**

  `string`, default: `"\"300s\""` — Login timeout duration when user verification is discouraged

* **`registration`**

  `string`, default: `"\"300s\""` — Registration timeout duration

* **`registration_uvd`**

  `string`, default: `"\"300s\""` — Registration timeout duration when user verification is discouraged

**Example:**

```json
{
  "login": "\"300s\"",
  "login_uvd": "\"300s\"",
  "registration": "\"300s\"",
  "registration_uvd": "\"300s\""
}
```

### WebAuthnCredentialAuthenticator

- **Type:**`object`

* **`aaguid`**

  `string` — Authenticator Attestation GUID (AAGUID) identifying the device model

* **`attachment`**

  `string` — Attachment type: "platform" (built-in) or "cross-platform"

* **`icon_dark`**

  `string` — Icon URL for dark theme display

* **`icon_light`**

  `string` — Icon URL for light theme display

* **`name`**

  `string` — Human-readable name of the authenticator model

**Example:**

```json
{
  "aaguid": "",
  "attachment": "platform",
  "icon_dark": "",
  "icon_light": "",
  "name": "Apple Touch ID"
}
```

### WebAuthnCredentialAuthenticatorFlags

- **Type:**`object`

* **`backup_eligible`**

  `boolean` — Whether this credential can be backed up to another device

* **`backup_state`**

  `boolean` — Whether this credential was synced or backed up

* **`user_present`**

  `boolean` — Whether the user was present during authentication

* **`user_verified`**

  `boolean` — Whether the user was verified (e.g., fingerprint, PIN)

**Example:**

```json
{
  "backup_eligible": true,
  "backup_state": true,
  "user_present": true,
  "user_verified": true
}
```

### WebAuthnCredentialClientInfo

- **Type:**`object`

* **`city`**

  `string` — City name

* **`ip`**

  `string` — IP address from which credential was registered

* **`region`**

  `string` — Geographic region (e.g., "US")

* **`region_subdivision`**

  `string` — Regional subdivision (e.g., "CA")

**Example:**

```json
{
  "city": "San Francisco",
  "ip": "192.0.2.1",
  "region": "US",
  "region_subdivision": "CA"
}
```

### WebAuthnCredentialUserAgent

- **Type:**`object`

* **`browser`**

  `string` — Browser name (e.g., "Chrome", "Safari")

* **`browser_version`**

  `string` — Browser version number

* **`device_model`**

  `string` — Device model if available

* **`device_type`**

  `string` — Device type: "desktop", "mobile", or "tablet"

* **`os`**

  `string` — Operating system name (e.g., "Windows", "iOS")

* **`os_version`**

  `string` — Operating system version

* **`raw`**

  `string` — Raw user agent string from the browser

* **`url`**

  `string` — Parsed user agent URL reference

**Example:**

```json
{
  "browser": "Chrome",
  "browser_version": "120.0.6099.129",
  "device_model": "iPhone15,2",
  "device_type": "mobile",
  "os": "macOS",
  "os_version": "14.2",
  "raw": "",
  "url": ""
}
```

### WebAuthnServiceUpdateCredentialBody

- **Type:**`object`

* **`display_name`**

  `string` — Human-friendly name for this credential (1-120 characters)

**Example:**

```json
{
  "display_name": "My iPhone 15 Pro"
}
```

### authpasswordlessPasswordlessType

- **Type:**`string`

**Example:**

### Client Secret

- **Type:**`object`

A secure credential used for authenticating an API client. Each client can have multiple secrets for key rotation purposes.

- **`create_time`**

  `string`, format: `date-time` — The timestamp when this secret was created. This field is automatically set by the server and cannot be modified.

- **`created_by`**

  `string` — The identifier of the user or system that created this secret. This field helps track who created the secret for audit and compliance purposes.

- **`expire_time`**

  `string`, format: `date-time` — The timestamp when this secret will expire. After this time, the secret cannot be used for authentication regardless of its status. If not set, the secret does not expire.

- **`id`**

  `string` — The unique identifier for this client secret. This ID is used to reference the secret in API requests for management operations like updating or deleting the secret.

- **`last_used_time`**

  `string`, format: `date-time` — The timestamp when this secret was last used for authentication. This field helps track secret usage for security monitoring and identifying unused secrets that may be candidates for rotation.

- **`plain_secret`**

  `string` — The full plaintext secret value. This field is only populated when the secret is first created and is never stored by the server. It must be securely stored by the client application as it cannot be retrieved again.

- **`secret_suffix`**

  `string` — A suffix that helps identify this secret. This is the last few characters of the full secret value but is not sufficient for authentication. Helps identify which secret is being used in logs and debugging.

- **`status`**

  `string`, possible values: `"INACTIVE"` — The current status of this secret. A secret must be ACTIVE to be used for authentication. INACTIVE secrets cannot be used for authentication but are retained for audit purposes.

- **`update_time`**

  `string`, format: `date-time` — The timestamp when this secret was last updated. This field is automatically updated by the server when the secret's status changes or other properties are modified.

**Example:**

```json
{
  "create_time": "2024-01-05T14:48:00Z",
  "created_by": "user_12345",
  "expire_time": "2025-01-05T14:48:00Z",
  "id": "sec_1234abcd5678efgh",
  "last_used_time": "2024-02-15T10:30:00Z",
  "plain_secret": "sec_1234567890abcdefghijklmnopqrstuvwxyz",
  "secret_suffix": "xyzw",
  "status": "INACTIVE",
  "update_time": "2024-01-10T09:12:00Z"
}
```

### clientsClientSecretStatus

- **Type:**`string`

ClientSecretStatus indicates whether a client secret can be used for authentication. ACTIVE secrets can be used for authentication while INACTIVE secrets cannot.

- INACTIVE: The secret is inactive and cannot be used for authentication

**Example:**

### clientsCreateOrganizationClientResponse

- **Type:**`object`

* **`client`**

  `object` — Details of the created client
  - **`audience`**

    `array` — The intended recipients of access tokens issued to this client. Each audience value should be a URI that identifies an API or service.

    **Items:**

    `string`

  - **`client_id`**

    `string` — The unique identifier for this API client. This ID is used to identify the client in API requests and logs. It is automatically generated when the client is created and cannot be modified.

  - **`create_time`**

    `string`, format: `date-time` — The timestamp when this API client was created. This field is automatically set by the server and cannot be modified.

  - **`custom_claims`**

    `array` — Additional claims included in access tokens issued to this client. These claims provide context about the client and can be used for authorization decisions.

    **Items:**
    - **`key`**

      `string` — The name of the custom claim. Must be between 1 and 128 characters. Use descriptive names that clearly indicate the claim's purpose.

    - **`value`**

      `string` — The value of the custom claim. This value will be included in access tokens issued to the client.

  - **`description`**

    `string` — A detailed description of the client's purpose and usage. This helps administrators understand what the client is used for.

  - **`expiry`**

    `string`, format: `int64` — Expiry time in seconds for the token generated by the client

  - **`is_cimd`**

    `boolean` — Indicates if the client was created via Client ID Metadata Document (CIMD). CIMD clients can update their own configuration according to the CIMD specification.

  - **`is_dcr`**

    `boolean` — Indicates if the client was created via Dynamic Client Registration (DCR). Clients created through DCR may have different management and lifecycle policies compared to those created manually.

  - **`metadata_uri`**

    `string` — The URI to the client's metadata, which is utilized to obtain the client's configuration details

  - **`name`**

    `string` — The display name of the API client. This name helps identify the client in the dashboard and logs.

  - **`organization_id`**

    `string` — The ID of the organization that owns this API client. This ID is used to associate the client with the correct organization and enforce organization-specific access controls.

  - **`redirect_uris`**

    `array` — The redirect URI for this API client. This URI is used in the OAuth 2.0 authorization flow to redirect users after authentication.

    **Items:**

    `string`

  - **`resource_id`**

    `string` — The ID of the resource associated with this M2M client. This field is used to link the client to a specific resource in the system.

  - **`scopes`**

    `array` — The OAuth 2.0 scopes granted to this client. These scopes determine what resources and actions the client can access.

    **Items:**

    `string`

  - **`secrets`**

    `array` — List of client secrets associated with this client. Each secret can be used for authentication, but only the most recently created secret is typically active. Secrets are stored securely and their values are never returned after creation.

    **Items:**
    - **`create_time`**

      `string`, format: `date-time` — The timestamp when this secret was created. This field is automatically set by the server and cannot be modified.

    - **`created_by`**

      `string` — The identifier of the user or system that created this secret. This field helps track who created the secret for audit and compliance purposes.

    - **`expire_time`**

      `string`, format: `date-time` — The timestamp when this secret will expire. After this time, the secret cannot be used for authentication regardless of its status. If not set, the secret does not expire.

    - **`id`**

      `string` — The unique identifier for this client secret. This ID is used to reference the secret in API requests for management operations like updating or deleting the secret.

    - **`last_used_time`**

      `string`, format: `date-time` — The timestamp when this secret was last used for authentication. This field helps track secret usage for security monitoring and identifying unused secrets that may be candidates for rotation.

    - **`plain_secret`**

      `string` — The full plaintext secret value. This field is only populated when the secret is first created and is never stored by the server. It must be securely stored by the client application as it cannot be retrieved again.

    - **`secret_suffix`**

      `string` — A suffix that helps identify this secret. This is the last few characters of the full secret value but is not sufficient for authentication. Helps identify which secret is being used in logs and debugging.

    - **`status`**

      `string`, possible values: `"INACTIVE"` — The current status of this secret. A secret must be ACTIVE to be used for authentication. INACTIVE secrets cannot be used for authentication but are retained for audit purposes.

    - **`update_time`**

      `string`, format: `date-time` — The timestamp when this secret was last updated. This field is automatically updated by the server when the secret's status changes or other properties are modified.

  - **`update_time`**

    `string`, format: `date-time` — The timestamp when this API client was last updated. This field is automatically updated by the server whenever the client's configuration changes.

* **`plain_secret`**

  `string` — Client secret value (only returned once at creation)

**Example:**

```json
{
  "client": {
    "audience": ["https://api.example.com"],
    "client_id": "m2morg_1231234233424344",
    "create_time": "2024-01-05T14:48:00Z",
    "custom_claims": [{}],
    "description": "Service account for automated deployment processes",
    "expiry": 3600,
    "is_cimd": false,
    "is_dcr": false,
    "metadata_uri": "https://example.com/client-metadata.json",
    "name": "GitHub Actions Deployment Service",
    "organization_id": "org_1231234233424344",
    "redirect_uris": ["https://example.com/callback"],
    "resource_id": "app_1231234233424344",
    "scopes": ["deploy:resources", "read:deployments"],
    "secrets": [{}],
    "update_time": "2024-01-05T14:48:00Z"
  },
  "plain_secret": "CdExsdErfccxDDssddfffgfeFHH1"
}
```

### clientsCreateOrganizationClientSecretResponse

- **Type:**`object`

* **`plain_secret`**

  `string` — Client secret value (only returned once at creation)

* **`secret`**

  `object` — Details of the created client secret
  - **`create_time`**

    `string`, format: `date-time` — The timestamp when this secret was created. This field is automatically set by the server and cannot be modified.

  - **`created_by`**

    `string` — The identifier of the user or system that created this secret. This field helps track who created the secret for audit and compliance purposes.

  - **`expire_time`**

    `string`, format: `date-time` — The timestamp when this secret will expire. After this time, the secret cannot be used for authentication regardless of its status. If not set, the secret does not expire.

  - **`id`**

    `string` — The unique identifier for this client secret. This ID is used to reference the secret in API requests for management operations like updating or deleting the secret.

  - **`last_used_time`**

    `string`, format: `date-time` — The timestamp when this secret was last used for authentication. This field helps track secret usage for security monitoring and identifying unused secrets that may be candidates for rotation.

  - **`plain_secret`**

    `string` — The full plaintext secret value. This field is only populated when the secret is first created and is never stored by the server. It must be securely stored by the client application as it cannot be retrieved again.

  - **`secret_suffix`**

    `string` — A suffix that helps identify this secret. This is the last few characters of the full secret value but is not sufficient for authentication. Helps identify which secret is being used in logs and debugging.

  - **`status`**

    `string`, possible values: `"INACTIVE"` — The current status of this secret. A secret must be ACTIVE to be used for authentication. INACTIVE secrets cannot be used for authentication but are retained for audit purposes.

  - **`update_time`**

    `string`, format: `date-time` — The timestamp when this secret was last updated. This field is automatically updated by the server when the secret's status changes or other properties are modified.

**Example:**

```json
{
  "plain_secret": "m2morg_client_secret_xyz123",
  "secret": {
    "create_time": "2024-01-05T14:48:00Z",
    "created_by": "user_12345",
    "expire_time": "2025-01-05T14:48:00Z",
    "id": "sec_1234abcd5678efgh",
    "last_used_time": "2024-02-15T10:30:00Z",
    "plain_secret": "sec_1234567890abcdefghijklmnopqrstuvwxyz",
    "secret_suffix": "xyzw",
    "status": "INACTIVE",
    "update_time": "2024-01-10T09:12:00Z"
  }
}
```

### clientsCustomClaim

- **Type:**`object`

* **`key`**

  `string` — The name of the custom claim. Must be between 1 and 128 characters. Use descriptive names that clearly indicate the claim's purpose.

* **`value`**

  `string` — The value of the custom claim. This value will be included in access tokens issued to the client.

**Example:**

```json
{
  "key": "environment",
  "value": "production"
}
```

### clientsGetOrganizationClientResponse

- **Type:**`object`

* **`client`**

  `object` — Details of the requested client
  - **`audience`**

    `array` — The intended recipients of access tokens issued to this client. Each audience value should be a URI that identifies an API or service.

    **Items:**

    `string`

  - **`client_id`**

    `string` — The unique identifier for this API client. This ID is used to identify the client in API requests and logs. It is automatically generated when the client is created and cannot be modified.

  - **`create_time`**

    `string`, format: `date-time` — The timestamp when this API client was created. This field is automatically set by the server and cannot be modified.

  - **`custom_claims`**

    `array` — Additional claims included in access tokens issued to this client. These claims provide context about the client and can be used for authorization decisions.

    **Items:**
    - **`key`**

      `string` — The name of the custom claim. Must be between 1 and 128 characters. Use descriptive names that clearly indicate the claim's purpose.

    - **`value`**

      `string` — The value of the custom claim. This value will be included in access tokens issued to the client.

  - **`description`**

    `string` — A detailed description of the client's purpose and usage. This helps administrators understand what the client is used for.

  - **`expiry`**

    `string`, format: `int64` — Expiry time in seconds for the token generated by the client

  - **`is_cimd`**

    `boolean` — Indicates if the client was created via Client ID Metadata Document (CIMD). CIMD clients can update their own configuration according to the CIMD specification.

  - **`is_dcr`**

    `boolean` — Indicates if the client was created via Dynamic Client Registration (DCR). Clients created through DCR may have different management and lifecycle policies compared to those created manually.

  - **`metadata_uri`**

    `string` — The URI to the client's metadata, which is utilized to obtain the client's configuration details

  - **`name`**

    `string` — The display name of the API client. This name helps identify the client in the dashboard and logs.

  - **`organization_id`**

    `string` — The ID of the organization that owns this API client. This ID is used to associate the client with the correct organization and enforce organization-specific access controls.

  - **`redirect_uris`**

    `array` — The redirect URI for this API client. This URI is used in the OAuth 2.0 authorization flow to redirect users after authentication.

    **Items:**

    `string`

  - **`resource_id`**

    `string` — The ID of the resource associated with this M2M client. This field is used to link the client to a specific resource in the system.

  - **`scopes`**

    `array` — The OAuth 2.0 scopes granted to this client. These scopes determine what resources and actions the client can access.

    **Items:**

    `string`

  - **`secrets`**

    `array` — List of client secrets associated with this client. Each secret can be used for authentication, but only the most recently created secret is typically active. Secrets are stored securely and their values are never returned after creation.

    **Items:**
    - **`create_time`**

      `string`, format: `date-time` — The timestamp when this secret was created. This field is automatically set by the server and cannot be modified.

    - **`created_by`**

      `string` — The identifier of the user or system that created this secret. This field helps track who created the secret for audit and compliance purposes.

    - **`expire_time`**

      `string`, format: `date-time` — The timestamp when this secret will expire. After this time, the secret cannot be used for authentication regardless of its status. If not set, the secret does not expire.

    - **`id`**

      `string` — The unique identifier for this client secret. This ID is used to reference the secret in API requests for management operations like updating or deleting the secret.

    - **`last_used_time`**

      `string`, format: `date-time` — The timestamp when this secret was last used for authentication. This field helps track secret usage for security monitoring and identifying unused secrets that may be candidates for rotation.

    - **`plain_secret`**

      `string` — The full plaintext secret value. This field is only populated when the secret is first created and is never stored by the server. It must be securely stored by the client application as it cannot be retrieved again.

    - **`secret_suffix`**

      `string` — A suffix that helps identify this secret. This is the last few characters of the full secret value but is not sufficient for authentication. Helps identify which secret is being used in logs and debugging.

    - **`status`**

      `string`, possible values: `"INACTIVE"` — The current status of this secret. A secret must be ACTIVE to be used for authentication. INACTIVE secrets cannot be used for authentication but are retained for audit purposes.

    - **`update_time`**

      `string`, format: `date-time` — The timestamp when this secret was last updated. This field is automatically updated by the server when the secret's status changes or other properties are modified.

  - **`update_time`**

    `string`, format: `date-time` — The timestamp when this API client was last updated. This field is automatically updated by the server whenever the client's configuration changes.

**Example:**

```json
{
  "client": {
    "audience": ["https://api.example.com"],
    "client_id": "m2morg_1231234233424344",
    "create_time": "2024-01-05T14:48:00Z",
    "custom_claims": [{}],
    "description": "Service account for automated deployment processes",
    "expiry": 3600,
    "is_cimd": false,
    "is_dcr": false,
    "metadata_uri": "https://example.com/client-metadata.json",
    "name": "GitHub Actions Deployment Service",
    "organization_id": "org_1231234233424344",
    "redirect_uris": ["https://example.com/callback"],
    "resource_id": "app_1231234233424344",
    "scopes": ["deploy:resources", "read:deployments"],
    "secrets": [{}],
    "update_time": "2024-01-05T14:48:00Z"
  }
}
```

### List Organization Clients Response

- **Type:**`object`

Response message containing a paginated list of API clients for the specified organization.

- **`clients`**

  `array` — List of API client objects for the organization. Each client includes its configuration, metadata, and active secrets (without exposing actual secret values).

  **Items:**
  - **`audience`**

    `array` — The intended recipients of access tokens issued to this client. Each audience value should be a URI that identifies an API or service.

    **Items:**

    `string`

  - **`client_id`**

    `string` — The unique identifier for this API client. This ID is used to identify the client in API requests and logs. It is automatically generated when the client is created and cannot be modified.

  - **`create_time`**

    `string`, format: `date-time` — The timestamp when this API client was created. This field is automatically set by the server and cannot be modified.

  - **`custom_claims`**

    `array` — Additional claims included in access tokens issued to this client. These claims provide context about the client and can be used for authorization decisions.

    **Items:**
    - **`key`**

      `string` — The name of the custom claim. Must be between 1 and 128 characters. Use descriptive names that clearly indicate the claim's purpose.

    - **`value`**

      `string` — The value of the custom claim. This value will be included in access tokens issued to the client.

  - **`description`**

    `string` — A detailed description of the client's purpose and usage. This helps administrators understand what the client is used for.

  - **`expiry`**

    `string`, format: `int64` — Expiry time in seconds for the token generated by the client

  - **`is_cimd`**

    `boolean` — Indicates if the client was created via Client ID Metadata Document (CIMD). CIMD clients can update their own configuration according to the CIMD specification.

  - **`is_dcr`**

    `boolean` — Indicates if the client was created via Dynamic Client Registration (DCR). Clients created through DCR may have different management and lifecycle policies compared to those created manually.

  - **`metadata_uri`**

    `string` — The URI to the client's metadata, which is utilized to obtain the client's configuration details

  - **`name`**

    `string` — The display name of the API client. This name helps identify the client in the dashboard and logs.

  - **`organization_id`**

    `string` — The ID of the organization that owns this API client. This ID is used to associate the client with the correct organization and enforce organization-specific access controls.

  - **`redirect_uris`**

    `array` — The redirect URI for this API client. This URI is used in the OAuth 2.0 authorization flow to redirect users after authentication.

    **Items:**

    `string`

  - **`resource_id`**

    `string` — The ID of the resource associated with this M2M client. This field is used to link the client to a specific resource in the system.

  - **`scopes`**

    `array` — The OAuth 2.0 scopes granted to this client. These scopes determine what resources and actions the client can access.

    **Items:**

    `string`

  - **`secrets`**

    `array` — List of client secrets associated with this client. Each secret can be used for authentication, but only the most recently created secret is typically active. Secrets are stored securely and their values are never returned after creation.

    **Items:**
    - **`create_time`**

      `string`, format: `date-time` — The timestamp when this secret was created. This field is automatically set by the server and cannot be modified.

    - **`created_by`**

      `string` — The identifier of the user or system that created this secret. This field helps track who created the secret for audit and compliance purposes.

    - **`expire_time`**

      `string`, format: `date-time` — The timestamp when this secret will expire. After this time, the secret cannot be used for authentication regardless of its status. If not set, the secret does not expire.

    - **`id`**

      `string` — The unique identifier for this client secret. This ID is used to reference the secret in API requests for management operations like updating or deleting the secret.

    - **`last_used_time`**

      `string`, format: `date-time` — The timestamp when this secret was last used for authentication. This field helps track secret usage for security monitoring and identifying unused secrets that may be candidates for rotation.

    - **`plain_secret`**

      `string` — The full plaintext secret value. This field is only populated when the secret is first created and is never stored by the server. It must be securely stored by the client application as it cannot be retrieved again.

    - **`secret_suffix`**

      `string` — A suffix that helps identify this secret. This is the last few characters of the full secret value but is not sufficient for authentication. Helps identify which secret is being used in logs and debugging.

    - **`status`**

      `string`, possible values: `"INACTIVE"` — The current status of this secret. A secret must be ACTIVE to be used for authentication. INACTIVE secrets cannot be used for authentication but are retained for audit purposes.

    - **`update_time`**

      `string`, format: `date-time` — The timestamp when this secret was last updated. This field is automatically updated by the server when the secret's status changes or other properties are modified.

  - **`update_time`**

    `string`, format: `date-time` — The timestamp when this API client was last updated. This field is automatically updated by the server whenever the client's configuration changes.

- **`next_page_token`**

  `string` — Pagination token for the next page of results. Use this token to fetch the next page.

- **`prev_page_token`**

  `string` — Pagination token for the previous page of results. Use this token to fetch the previous page.

- **`total_size`**

  `integer`, format: `int64` — Total number of API clients in the organization.

**Example:**

```json
{
  "clients": [
    {
      "audience": ["https://api.example.com"],
      "client_id": "m2morg_1231234233424344",
      "create_time": "2024-01-05T14:48:00Z",
      "custom_claims": [{}],
      "description": "Service account for automated deployment processes",
      "expiry": 3600,
      "is_cimd": false,
      "is_dcr": false,
      "metadata_uri": "https://example.com/client-metadata.json",
      "name": "GitHub Actions Deployment Service",
      "organization_id": "org_1231234233424344",
      "redirect_uris": ["https://example.com/callback"],
      "resource_id": "app_1231234233424344",
      "scopes": ["deploy:resources", "read:deployments"],
      "secrets": [{}],
      "update_time": "2024-01-05T14:48:00Z"
    }
  ],
  "next_page_token": "<next_page_token>",
  "prev_page_token": "<prev_page_token>",
  "total_size": 30
}
```

### clientsM2MClient

- **Type:**`object`

* **`audience`**

  `array` — The intended recipients of access tokens issued to this client. Each audience value should be a URI that identifies an API or service.

  **Items:**

  `string`

* **`client_id`**

  `string` — The unique identifier for this API client. This ID is used to identify the client in API requests and logs. It is automatically generated when the client is created and cannot be modified.

* **`create_time`**

  `string`, format: `date-time` — The timestamp when this API client was created. This field is automatically set by the server and cannot be modified.

* **`custom_claims`**

  `array` — Additional claims included in access tokens issued to this client. These claims provide context about the client and can be used for authorization decisions.

  **Items:**
  - **`key`**

    `string` — The name of the custom claim. Must be between 1 and 128 characters. Use descriptive names that clearly indicate the claim's purpose.

  - **`value`**

    `string` — The value of the custom claim. This value will be included in access tokens issued to the client.

* **`description`**

  `string` — A detailed description of the client's purpose and usage. This helps administrators understand what the client is used for.

* **`expiry`**

  `string`, format: `int64` — Expiry time in seconds for the token generated by the client

* **`is_cimd`**

  `boolean` — Indicates if the client was created via Client ID Metadata Document (CIMD). CIMD clients can update their own configuration according to the CIMD specification.

* **`is_dcr`**

  `boolean` — Indicates if the client was created via Dynamic Client Registration (DCR). Clients created through DCR may have different management and lifecycle policies compared to those created manually.

* **`metadata_uri`**

  `string` — The URI to the client's metadata, which is utilized to obtain the client's configuration details

* **`name`**

  `string` — The display name of the API client. This name helps identify the client in the dashboard and logs.

* **`organization_id`**

  `string` — The ID of the organization that owns this API client. This ID is used to associate the client with the correct organization and enforce organization-specific access controls.

* **`redirect_uris`**

  `array` — The redirect URI for this API client. This URI is used in the OAuth 2.0 authorization flow to redirect users after authentication.

  **Items:**

  `string`

* **`resource_id`**

  `string` — The ID of the resource associated with this M2M client. This field is used to link the client to a specific resource in the system.

* **`scopes`**

  `array` — The OAuth 2.0 scopes granted to this client. These scopes determine what resources and actions the client can access.

  **Items:**

  `string`

* **`secrets`**

  `array` — List of client secrets associated with this client. Each secret can be used for authentication, but only the most recently created secret is typically active. Secrets are stored securely and their values are never returned after creation.

  **Items:**
  - **`create_time`**

    `string`, format: `date-time` — The timestamp when this secret was created. This field is automatically set by the server and cannot be modified.

  - **`created_by`**

    `string` — The identifier of the user or system that created this secret. This field helps track who created the secret for audit and compliance purposes.

  - **`expire_time`**

    `string`, format: `date-time` — The timestamp when this secret will expire. After this time, the secret cannot be used for authentication regardless of its status. If not set, the secret does not expire.

  - **`id`**

    `string` — The unique identifier for this client secret. This ID is used to reference the secret in API requests for management operations like updating or deleting the secret.

  - **`last_used_time`**

    `string`, format: `date-time` — The timestamp when this secret was last used for authentication. This field helps track secret usage for security monitoring and identifying unused secrets that may be candidates for rotation.

  - **`plain_secret`**

    `string` — The full plaintext secret value. This field is only populated when the secret is first created and is never stored by the server. It must be securely stored by the client application as it cannot be retrieved again.

  - **`secret_suffix`**

    `string` — A suffix that helps identify this secret. This is the last few characters of the full secret value but is not sufficient for authentication. Helps identify which secret is being used in logs and debugging.

  - **`status`**

    `string`, possible values: `"INACTIVE"` — The current status of this secret. A secret must be ACTIVE to be used for authentication. INACTIVE secrets cannot be used for authentication but are retained for audit purposes.

  - **`update_time`**

    `string`, format: `date-time` — The timestamp when this secret was last updated. This field is automatically updated by the server when the secret's status changes or other properties are modified.

* **`update_time`**

  `string`, format: `date-time` — The timestamp when this API client was last updated. This field is automatically updated by the server whenever the client's configuration changes.

**Example:**

```json
{
  "audience": ["https://api.example.com"],
  "client_id": "m2morg_1231234233424344",
  "create_time": "2024-01-05T14:48:00Z",
  "custom_claims": [
    {
      "key": "environment",
      "value": "production"
    }
  ],
  "description": "Service account for automated deployment processes",
  "expiry": 3600,
  "is_cimd": false,
  "is_dcr": false,
  "metadata_uri": "https://example.com/client-metadata.json",
  "name": "GitHub Actions Deployment Service",
  "organization_id": "org_1231234233424344",
  "redirect_uris": ["https://example.com/callback"],
  "resource_id": "app_1231234233424344",
  "scopes": ["deploy:resources", "read:deployments"],
  "secrets": [
    {
      "create_time": "2024-01-05T14:48:00Z",
      "created_by": "user_12345",
      "expire_time": "2025-01-05T14:48:00Z",
      "id": "sec_1234abcd5678efgh",
      "last_used_time": "2024-02-15T10:30:00Z",
      "plain_secret": "sec_1234567890abcdefghijklmnopqrstuvwxyz",
      "secret_suffix": "xyzw",
      "status": "INACTIVE",
      "update_time": "2024-01-10T09:12:00Z"
    }
  ],
  "update_time": "2024-01-05T14:48:00Z"
}
```

### clientsOrganizationClient

- **Type:**`object`

* **`audience`**

  `array` — The intended recipients of the access tokens issued to this client. Each audience value should be a URI that identifies the API or service that will validate the token.

  **Items:**

  `string`

* **`custom_claims`**

  `array` — Additional claims to be included in access tokens issued to this client. These claims provide context about the client and can be used for authorization decisions. Keep claims minimal to avoid increasing token size.

  **Items:**
  - **`key`**

    `string` — The name of the custom claim. Must be between 1 and 128 characters. Use descriptive names that clearly indicate the claim's purpose.

  - **`value`**

    `string` — The value of the custom claim. This value will be included in access tokens issued to the client.

* **`description`**

  `string` — A detailed explanation of the client's purpose and usage. This helps administrators understand what the client is used for and who manages it.

* **`expiry`**

  `string`, format: `int64` — Expiry time in seconds for the token generated by the client

* **`name`**

  `string` — A descriptive name for the API client that helps identify its purpose. This name is displayed in the dashboard and logs. Must be between 1 and 128 characters.

* **`scopes`**

  `array` — OAuth 2.0 scopes that define the permissions granted to this client. Each scope represents a specific permission or set of permissions. The client can only access resources that match its granted scopes.

  **Items:**

  `string`

**Example:**

```json
{
  "audience": ["https://api.example.com/api/analytics", "https://deployment-api.acmecorp.com"],
  "custom_claims": [
    {
      "key": "environment",
      "value": "production"
    },
    {
      "key": "service",
      "value": "deployment"
    }
  ],
  "description": "Service account for GitHub Actions to deploy resources to production",
  "expiry": 3600,
  "name": "GitHub Actions Deployment Service",
  "scopes": ["deploy:resources", "read:deployments"]
}
```

### clientsUpdateOrganizationClientResponse

- **Type:**`object`

* **`client`**

  `object` — Updated details of the client
  - **`audience`**

    `array` — The intended recipients of access tokens issued to this client. Each audience value should be a URI that identifies an API or service.

    **Items:**

    `string`

  - **`client_id`**

    `string` — The unique identifier for this API client. This ID is used to identify the client in API requests and logs. It is automatically generated when the client is created and cannot be modified.

  - **`create_time`**

    `string`, format: `date-time` — The timestamp when this API client was created. This field is automatically set by the server and cannot be modified.

  - **`custom_claims`**

    `array` — Additional claims included in access tokens issued to this client. These claims provide context about the client and can be used for authorization decisions.

    **Items:**
    - **`key`**

      `string` — The name of the custom claim. Must be between 1 and 128 characters. Use descriptive names that clearly indicate the claim's purpose.

    - **`value`**

      `string` — The value of the custom claim. This value will be included in access tokens issued to the client.

  - **`description`**

    `string` — A detailed description of the client's purpose and usage. This helps administrators understand what the client is used for.

  - **`expiry`**

    `string`, format: `int64` — Expiry time in seconds for the token generated by the client

  - **`is_cimd`**

    `boolean` — Indicates if the client was created via Client ID Metadata Document (CIMD). CIMD clients can update their own configuration according to the CIMD specification.

  - **`is_dcr`**

    `boolean` — Indicates if the client was created via Dynamic Client Registration (DCR). Clients created through DCR may have different management and lifecycle policies compared to those created manually.

  - **`metadata_uri`**

    `string` — The URI to the client's metadata, which is utilized to obtain the client's configuration details

  - **`name`**

    `string` — The display name of the API client. This name helps identify the client in the dashboard and logs.

  - **`organization_id`**

    `string` — The ID of the organization that owns this API client. This ID is used to associate the client with the correct organization and enforce organization-specific access controls.

  - **`redirect_uris`**

    `array` — The redirect URI for this API client. This URI is used in the OAuth 2.0 authorization flow to redirect users after authentication.

    **Items:**

    `string`

  - **`resource_id`**

    `string` — The ID of the resource associated with this M2M client. This field is used to link the client to a specific resource in the system.

  - **`scopes`**

    `array` — The OAuth 2.0 scopes granted to this client. These scopes determine what resources and actions the client can access.

    **Items:**

    `string`

  - **`secrets`**

    `array` — List of client secrets associated with this client. Each secret can be used for authentication, but only the most recently created secret is typically active. Secrets are stored securely and their values are never returned after creation.

    **Items:**
    - **`create_time`**

      `string`, format: `date-time` — The timestamp when this secret was created. This field is automatically set by the server and cannot be modified.

    - **`created_by`**

      `string` — The identifier of the user or system that created this secret. This field helps track who created the secret for audit and compliance purposes.

    - **`expire_time`**

      `string`, format: `date-time` — The timestamp when this secret will expire. After this time, the secret cannot be used for authentication regardless of its status. If not set, the secret does not expire.

    - **`id`**

      `string` — The unique identifier for this client secret. This ID is used to reference the secret in API requests for management operations like updating or deleting the secret.

    - **`last_used_time`**

      `string`, format: `date-time` — The timestamp when this secret was last used for authentication. This field helps track secret usage for security monitoring and identifying unused secrets that may be candidates for rotation.

    - **`plain_secret`**

      `string` — The full plaintext secret value. This field is only populated when the secret is first created and is never stored by the server. It must be securely stored by the client application as it cannot be retrieved again.

    - **`secret_suffix`**

      `string` — A suffix that helps identify this secret. This is the last few characters of the full secret value but is not sufficient for authentication. Helps identify which secret is being used in logs and debugging.

    - **`status`**

      `string`, possible values: `"INACTIVE"` — The current status of this secret. A secret must be ACTIVE to be used for authentication. INACTIVE secrets cannot be used for authentication but are retained for audit purposes.

    - **`update_time`**

      `string`, format: `date-time` — The timestamp when this secret was last updated. This field is automatically updated by the server when the secret's status changes or other properties are modified.

  - **`update_time`**

    `string`, format: `date-time` — The timestamp when this API client was last updated. This field is automatically updated by the server whenever the client's configuration changes.

**Example:**

```json
{
  "client": {
    "audience": ["https://api.example.com"],
    "client_id": "m2morg_1231234233424344",
    "create_time": "2024-01-05T14:48:00Z",
    "custom_claims": [{}],
    "description": "Service account for automated deployment processes",
    "expiry": 3600,
    "is_cimd": false,
    "is_dcr": false,
    "metadata_uri": "https://example.com/client-metadata.json",
    "name": "GitHub Actions Deployment Service",
    "organization_id": "org_1231234233424344",
    "redirect_uris": ["https://example.com/callback"],
    "resource_id": "app_1231234233424344",
    "scopes": ["deploy:resources", "read:deployments"],
    "secrets": [{}],
    "update_time": "2024-01-05T14:48:00Z"
  }
}
```

### commonsExternalIdentity

- **Type:**`object`

* **`connection_id`**

  `string` — Unique identifier for the external identity connection. Immutable and read-only.

* **`connection_provider`**

  `string`, possible values: `"OKTA", "GOOGLE", "MICROSOFT_AD", "AUTH0", "ONELOGIN", "PING_IDENTITY", "JUMPCLOUD", "CUSTOM", "GITHUB", "GITLAB", "LINKEDIN", "SALESFORCE", "MICROSOFT", "IDP_SIMULATOR", "SCALEKIT", "ADFS"` — Type of the identity provider.

* **`connection_type`**

  `string` — Name of the external identity connection.

* **`connection_user_id`**

  `string` — Unique identifier for the user in the external identity provider system. Immutable and read-only.

* **`created_time`**

  `string`, format: `date-time` — Timestamp when this external identity connection was first created. Immutable and read-only.

* **`is_social`**

  `boolean` — Indicates if the identity provider is a social provider (true) or enterprise/custom provider (false). Read-only.

* **`last_login_time`**

  `string`, format: `date-time` — Timestamp of the user's last successful login via this external identity provider. Automatically updated by the system.

* **`last_synced_time`**

  `string`, format: `date-time` — Timestamp of the last data synchronization for this external identity from the provider. Automatically updated by the system.

**Example:**

```json
{
  "connection_id": "conn_1234abcd5678efgh",
  "connection_provider": "GOOGLE",
  "connection_type": "OAUTH",
  "connection_user_id": "ext_user_12345",
  "created_time": "",
  "is_social": true,
  "last_login_time": "",
  "last_synced_time": ""
}
```

### commonsIdentityProviderType

- **Type:**`string`

**Example:**

### commonsMembershipStatus

- **Type:**`string`

**Example:**

### commonsOrganizationMembership

- **Type:**`object`

* **`accepted_at`**

  `string`, format: `date-time` — Timestamp when the user accepted the invitation.

* **`created_at`**

  `string`, format: `date-time` — Timestamp when the invitation was created.

* **`display_name`**

  `string` — Organization display name. This field stores a user-friendly name for the organization that may be different from the formal name, often used for UI display purposes.

* **`expires_at`**

  `string`, format: `date-time` — Timestamp when the invitation expired.

* **`inviter_email`**

  `string` — ID of the user who invited this user.

* **`join_time`**

  `string`, format: `date-time` — Timestamp when the membership was created. Automatically set by the server.

* **`membership_status`**

  `string`, possible values: `"ACTIVE", "INACTIVE", "PENDING_INVITE", "INVITE_EXPIRED"`

* **`metadata`**

  `object` — Custom key-value pairs for storing additional user context. Keys (3-25 chars), values (1-256 chars).

* **`name`**

  `string` — Organization name. This field stores the formal organization name used for identification and display purposes.

* **`organization_id`**

  `string` — Unique identifier for the organization. Immutable and read-only.

* **`permissions`**

  `array` — Effective permissions granted to the user within the organization (including inherited permissions from assigned roles). Lists the specific actions and access rights the user can perform.

  **Items:**

  `string`

* **`provisioning_method`**

  `string` — How the user was provisioned. Possible values: - \`jit_using_sso\` (Just-in-time provisioning during SSO login) - \`allowed_email_domain\` (User joined via allowed email domain matching) - \`org_creator\` (User created the organization) - \`direct_provision\` (User was directly provisioned via API or SCIM) - \`invitation\` (User was invited and accepted an invitation)

* **`roles`**

  `array`

  **Items:**
  - **`display_name`**

    `string` — Human-readable name for the role

  - **`id`**

    `string` — Role ID

  - **`name`**

    `string` — Attribute name/identifier for the role used in system operations and API calls. This should be a machine-readable identifier that follows naming conventions.

**Example:**

```json
{
  "accepted_at": "",
  "created_at": "",
  "display_name": "Acme Corporation",
  "expires_at": "",
  "inviter_email": "",
  "join_time": "",
  "membership_status": "ACTIVE",
  "metadata": {
    "department": "engineering",
    "location": "nyc-office"
  },
  "name": "AcmeCorp",
  "organization_id": "org_1234abcd5678efgh",
  "permissions": ["read_projects", "write_tasks", "manage_users"],
  "provisioning_method": "",
  "roles": [
    {
      "display_name": "Dev Team",
      "id": "role_79643236410327240",
      "name": "team_dev"
    }
  ]
}
```

### commonsRegionCode

- **Type:**`string`

**Example:**

### commonsRole

- **Type:**`object`

* **`display_name`**

  `string` — Human-readable name for the role

* **`id`**

  `string` — Role ID

* **`name`**

  `string` — Attribute name/identifier for the role used in system operations and API calls. This should be a machine-readable identifier that follows naming conventions.

**Example:**

```json
{
  "display_name": "Dev Team",
  "id": "role_79643236410327240",
  "name": "team_dev"
}
```

### commonsTimeUnit

- **Type:**`string`

**Example:**

### commonsUserProfile

- **Type:**`object`

* **`custom_attributes`**

  `object` — Custom attributes for extended user profile data and application-specific information. This field stores business-specific user data like department, job title, security clearances, project assignments, or any other organizational attributes your application requires. Unlike system metadata, these attributes are typically managed by administrators or applications and are visible to end users for personalization and business logic. Keys must be 3-25 characters, values must be 1-256 characters, with a maximum of 20 key-value pairs.

* **`email_verified`**

  `boolean` — Indicates if the user's email address has been verified. Automatically updated by the system.

* **`external_identities`**

  `array` — List of external identity connections associated with the user profile.

  **Items:**
  - **`connection_id`**

    `string` — Unique identifier for the external identity connection. Immutable and read-only.

  - **`connection_provider`**

    `string`, possible values: `"OKTA", "GOOGLE", "MICROSOFT_AD", "AUTH0", "ONELOGIN", "PING_IDENTITY", "JUMPCLOUD", "CUSTOM", "GITHUB", "GITLAB", "LINKEDIN", "SALESFORCE", "MICROSOFT", "IDP_SIMULATOR", "SCALEKIT", "ADFS"` — Type of the identity provider.

  - **`connection_type`**

    `string` — Name of the external identity connection.

  - **`connection_user_id`**

    `string` — Unique identifier for the user in the external identity provider system. Immutable and read-only.

  - **`created_time`**

    `string`, format: `date-time` — Timestamp when this external identity connection was first created. Immutable and read-only.

  - **`is_social`**

    `boolean` — Indicates if the identity provider is a social provider (true) or enterprise/custom provider (false). Read-only.

  - **`last_login_time`**

    `string`, format: `date-time` — Timestamp of the user's last successful login via this external identity provider. Automatically updated by the system.

  - **`last_synced_time`**

    `string`, format: `date-time` — Timestamp of the last data synchronization for this external identity from the provider. Automatically updated by the system.

* **`family_name`**

  `string` — The user's family name (last name or surname). This field stores the user's last name and is combined with the given name to create the full display name. The family name is used in formal communications, user listings, and organizational directories throughout the system. Maximum 255 characters allowed.

* **`gender`**

  `string` — The user's gender identity information. This field stores the user's gender identity for personalization, compliance reporting, or organizational analytics purposes. This field supports any string value to accommodate diverse gender identities and should be handled with appropriate privacy considerations according to your organization's policies and applicable regulations.

* **`given_name`**

  `string` — The user's given name (first name). This field stores the user's first name and is used for personalization, display purposes, and when generating the full display name. The given name appears in user interfaces, formal communications, and user listings throughout the system. Maximum 255 characters allowed.

* **`groups`**

  `array` — The list of group names the user belongs to within the organization. This field stores the user's group memberships for role-based access control, team assignments, and organizational structure. Groups are typically used for permission management, collaborative access, and organizational hierarchy. Each group name represents a distinct organizational unit or team that the user is associated with.

  **Items:**

  `string`

* **`id`**

  `string` — Unique system-generated identifier for the user profile. Immutable and read-only.

* **`locale`**

  `string` — The user's preferred language and region settings using BCP-47 format codes. This field customizes the user's experience with localized content, date formats, number formatting, and UI language throughout the system. When not specified, the user inherits the organization's default locale settings. Common values include \`en-US\`, \`en-GB\`, \`fr-FR\`, \`de-DE\`, and \`es-ES\`.

* **`metadata`**

  `object` — Raw attributes received from identity providers during authentication. This field stores the original user profile data as received from external IdP systems (SAML, OIDC, etc.) including provider-specific claims and attributes. These fields preserve the complete set of attributes received from the identity source and are used for mapping, synchronization, and audit purposes. Keys must be 3-25 characters, values must be 1-256 characters, with a maximum of 20 key-value pairs.

* **`name`**

  `string` — The user's complete display name in formatted form. This field stores the full name as a single string and is typically used when you want to set the complete name rather than using separate given and family names. This name appears in user interfaces, reports, directory listings, and anywhere a formatted display name is needed. This field serves as a formatted display name that complements the individual given_name and family_name fields.

* **`phone_number`**

  `string` — The user's phone number in E.164 international format. This field stores the phone number for user contact and identification purposes. The phone number must include the country code and be formatted according to E.164 standards (e.g., \`+1\` for US numbers). This field is optional.

* **`phone_number_verified`**

  `boolean` — Indicates if the user's phone number has been verified. Automatically updated by the system.

* **`picture`**

  `string` — The URL to the user's profile picture or avatar image. This field stores the location of the user's profile photo that appears in user interfaces, directory listings, and collaborative features throughout the system. The URL should point to a publicly accessible image file. Supported formats typically include JPEG, PNG, and GIF. This image is used for visual identification and personalization across the platform.

* **`preferred_username`**

  `string` — The user's preferred username for display and identification purposes. This field stores a custom username that the user prefers to be known by, which may differ from their email or formal name. This username appears in user interfaces, mentions, informal communications, and collaborative features throughout the system. Maximum 512 characters allowed.

**Example:**

```json
{
  "custom_attributes": {
    "department": "engineering",
    "security_clearance": "level2"
  },
  "email_verified": true,
  "external_identities": [
    {
      "connection_id": "conn_1234abcd5678efgh",
      "connection_provider": "GOOGLE",
      "connection_type": "OAUTH",
      "connection_user_id": "ext_user_12345",
      "created_time": "",
      "is_social": true,
      "last_login_time": "",
      "last_synced_time": ""
    }
  ],
  "family_name": "Doe",
  "gender": "male",
  "given_name": "John",
  "groups": ["admin", "developer"],
  "id": "usr_profile_1234abcd5678efgh",
  "locale": "en-US",
  "metadata": {
    "department": "engineering",
    "employee_type": "full-time",
    "idp_user_id": "12345"
  },
  "name": "John Michael Doe",
  "phone_number": "+14155552671",
  "phone_number_verified": true,
  "picture": "https://example.com/avatar.jpg",
  "preferred_username": "johndoe"
}
```

### Authentication credentials container supporting multiple auth types

- **Type:**`object`

* **`google_dwd`**

  `object` — Google Domain-Wide Delegation authentication — used for GOOGLE_DWD connections. Send only subject in requests; access_token, scopes, and token_expires_at are response-only.
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
    "scopes": ["openid", "https://www.googleapis.com/auth/userinfo.email"],
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

### connected_accountsConnectedAccount

- **Type:**`object`

* **`api_config`**

  `object` — Optional JSON configuration for connector-specific API settings such as rate limits, custom endpoints, or feature flags.

* **`authorization_details`**

  `object` — Sensitive authentication credentials including access tokens, refresh tokens, and scopes. Contains either OAuth tokens or static auth details.
  - **`google_dwd`**

    `object` — Google Domain-Wide Delegation authentication — used for GOOGLE_DWD connections. Send only subject in requests; access_token, scopes, and token_expires_at are response-only.
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

### Status of a connected account indicating its current state

- **Type:**`string`

* ACTIVE: Account is connected and credentials are valid
* EXPIRED: Access token has expired and needs refresh
* PENDING_AUTH: Account awaiting user authorization (re-auth initiated)
* PENDING_VERIFICATION: OAuth complete; awaiting user identity verification before activation
* DISCONNECTED: Account has been manually disconnected

**Example:**

### Type of authentication mechanism used for the connected account

- **Type:**`string`

* OAUTH: OAuth 2.0 authorization with access and refresh tokens
* API_KEY: Static API key authentication
* BASIC_AUTH: HTTP Basic Authentication (username/password)
* BEARER_TOKEN: Bearer token authentication
* CUSTOM: Custom authentication mechanism
* BASIC: Basic authentication (alias)
* OAUTH_M2M: OAuth 2.0 client credentials (machine-to-machine)
* TRELLO_OAUTH1: Trello token-based OAuth1-style browser authorization
* GOOGLE_DWD: Google Domain-Wide Delegation

**Example:**

### connected_accountsCreateConnectedAccountRequest

- **Type:**`object`

* **`connected_account`**

  `object` — Details of the connected account to create
  - **`api_config`**

    `object` — Optional JSON configuration for connector-specific API settings such as rate limits, custom API endpoints, timeouts, or feature flags.

  - **`authorization_details`**

    `object` — Optional authentication credentials for the connected account. Include OAuth tokens (access_token, refresh_token, scopes) or static auth details (API keys, bearer tokens). Can be provided later via update.
    - **`google_dwd`**

      `object` — Google Domain-Wide Delegation authentication — used for GOOGLE_DWD connections. Send only subject in requests; access_token, scopes, and token_expires_at are response-only.
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
        "scopes": ["read", "write"]
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

### connected_accountsCreateConnectedAccountResponse

- **Type:**`object`

* **`connected_account`**

  `object` — The newly created connected account with its unique identifier, status, and complete authorization details including access tokens.
  - **`api_config`**

    `object` — Optional JSON configuration for connector-specific API settings such as rate limits, custom endpoints, or feature flags.

  - **`authorization_details`**

    `object` — Sensitive authentication credentials including access tokens, refresh tokens, and scopes. Contains either OAuth tokens or static auth details.
    - **`google_dwd`**

      `object` — Google Domain-Wide Delegation authentication — used for GOOGLE_DWD connections. Send only subject in requests; access_token, scopes, and token_expires_at are response-only.
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

### connected_accountsDeleteConnectedAccountRequest

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

### connected_accountsDeleteConnectedAccountResponse

- **Type:**`object`

**Example:**

```json
{}
```

### connected_accountsGetConnectedAccountByIdentifierResponse

- **Type:**`object`

* **`connected_account`**

  `object` — The connected account with complete details including sensitive authorization credentials (access tokens, refresh tokens, scopes). Handle with appropriate access controls.
  - **`api_config`**

    `object` — Optional JSON configuration for connector-specific API settings such as rate limits, custom endpoints, or feature flags.

  - **`authorization_details`**

    `object` — Sensitive authentication credentials including access tokens, refresh tokens, and scopes. Contains either OAuth tokens or static auth details.
    - **`google_dwd`**

      `object` — Google Domain-Wide Delegation authentication — used for GOOGLE_DWD connections. Send only subject in requests; access_token, scopes, and token_expires_at are response-only.
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

### connected_accountsGetMagicLinkForConnectedAccountRequest

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

### connected_accountsGetMagicLinkForConnectedAccountResponse

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

### connected_accountsGoogleDWDAuth

- **Type:**`object`

Google Domain-Wide Delegation authentication — used for GOOGLE_DWD connections. Send only subject in requests; access_token, scopes, and token_expires_at are response-only.

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
  "scopes": ["openid", "https://www.googleapis.com/auth/userinfo.email"],
  "subject": "user@example.com",
  "token_expires_at": ""
}
```

### connected_accountsListConnectedAccountsResponse

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

  `string` — Pagination token for retrieving the next page. Empty if this is the last page. Pass this value to page_token in the next request.

* **`prev_page_token`**

  `string` — Pagination token for retrieving the previous page. Empty if this is the first page. Pass this value to page_token to go back.

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

### connected_accountsSearchConnectedAccountsResponse

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

### connected_accountsUpdateConnectedAccountRequest

- **Type:**`object`

* **`connected_account`**

  `object` — Details of the connected account to update
  - **`api_config`**

    `object` — Updated JSON configuration for API-specific settings. Merges with existing configuration - only provided fields are modified.

  - **`authorization_details`**

    `object` — Updated authentication credentials. Provide new OAuth tokens (e.g., after refresh) or updated static auth details. Only included fields will be modified.
    - **`google_dwd`**

      `object` — Google Domain-Wide Delegation authentication — used for GOOGLE_DWD connections. Send only subject in requests; access_token, scopes, and token_expires_at are response-only.
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
        "scopes": ["read", "write"]
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

### connected_accountsUpdateConnectedAccountResponse

- **Type:**`object`

* **`connected_account`**

  `object` — The updated connected account with refreshed credentials, new token expiry, and modified configuration settings.
  - **`api_config`**

    `object` — Optional JSON configuration for connector-specific API settings such as rate limits, custom endpoints, or feature flags.

  - **`authorization_details`**

    `object` — Sensitive authentication credentials including access tokens, refresh tokens, and scopes. Contains either OAuth tokens or static auth details.
    - **`google_dwd`**

      `object` — Google Domain-Wide Delegation authentication — used for GOOGLE_DWD connections. Send only subject in requests; access_token, scopes, and token_expires_at are response-only.
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

### connected_accountsVerifyConnectedAccountUserRequest

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

### connected_accountsVerifyConnectedAccountUserResponse

- **Type:**`object`

* **`post_user_verify_redirect_url`**

  `string` — URL to redirect the user to after successful verification

**Example:**

```json
{
  "post_user_verify_redirect_url": "https://env1.example.com/connect/success"
}
```

### connectionsCodeChallengeType

- **Type:**`string`

**Example:**

### connectionsConfigurationType

- **Type:**`string`

**Example:**

### connectionsConnection

- **Type:**`object`

* **`attribute_mapping`**

  `object` — Maps identity provider attributes to user profile fields. For example, {'email': 'user.mail', 'name': 'user.displayName'}.

* **`configuration_type`**

  `string`, possible values: `"DISCOVERY", "MANUAL"` — How the connection was configured: DISCOVERY (automatic configuration) or MANUAL (administrator configured)

* **`debug_enabled`**

  `boolean` — Enables testing mode that allows non-HTTPS endpoints. Should only be enabled in development environments, never in production.

* **`domains`**

  `array` — Domain associated with this connection, used for domain-based authentication flows.

  **Items:**
  - **`create_time`**

    `string`, format: `date-time` — Timestamp when the domain was first created.

  - **`domain`**

    `string` — The business domain name that was configured for allowed email domain functionality (e.g., company.com, subdomain.company.com).

  - **`domain_type`**

    `object`

  - **`environment_id`**

    `string` — The environment ID where this domain is configured.

  - **`id`**

    `string` — Scalekit-generated unique identifier for this domain record.

  - **`organization_id`**

    `string` — The organization to which the domain belongs.

  - **`update_time`**

    `string`, format: `date-time` — Timestamp when the domain was last updated.

  - **`verification_method`**

    `string`, possible values: `"ADMIN", "DNS", "NOT_APPLICABLE"` — Method that determines how domain ownership is verified. - ADMIN: domain is marked verified without DNS validation, typically by an admin. - DNS: domain must be verified by adding a TXT record to your DNS configuration. - NOT_APPLICABLE: verification does not apply to this domain type.

  - **`verification_status`**

    `string`, possible values: `"PENDING", "VERIFIED", "FAILED", "AUTO_VERIFIED"` — Verification status of the domain. - PENDING: DNS TXT record has not been validated yet. - VERIFIED: domain confirmed via DNS TXT record validation or admin approval. - AUTO_VERIFIED: domain verified automatically without DNS changes. - FAILED: DNS TXT record was not validated within the verification window.

* **`enabled`**

  `boolean` — Controls whether users can sign in using this connection. When false, the connection exists but cannot be used for authentication.

* **`google_dwd_config`**

  `object` — Configuration details for Google Domain-Wide Delegation. Present only when type is GOOGLE_DWD.
  - **`scopes`**

    `array` — OAuth 2.0 scopes to request.

    **Items:**

    `string`

  - **`service_account_json`**

    `string` — Google Cloud service account JSON key. Write-only: reads return a masked value.

  - **`token_uri`**

    `string` — Google token endpoint. Defaults to https\://oauth2.googleapis.com/token.

* **`id`**

  `string` — Unique identifier for this connection. Used in API calls to reference this specific connection.

* **`key_id`**

  `string` — Alternative identifier for this connection, typically used in frontend applications or URLs.

* **`oauth_config`**

  `object` — Configuration details for OAuth connections. Present only when type is OAUTH.
  - **`access_type`**

    `string` — Access Type

  - **`app_name`**

    `string` — Application name used by providers that require it as an authorize query parameter (e.g., Trello's app_name).

  - **`authorize_uri`**

    `string` — Authorize URI

  - **`client_id`**

    `string` — Client ID

  - **`client_secret`**

    `string` — Client Secret

  - **`custom_scope_name`**

    `string` — Custom Scope Name

  - **`is_cimd`**

    `boolean` — Indicates whether this connection was registered using Client ID Metadata Document (CIMD) instead of Dynamic Client Registration.

  - **`optional_scopes`**

    `object` — Optional scopes configuration for identity providers that support or require additional scopes to be sent in a custom field during authentication requests.
    - **`field_name`**

      `string` — Name of the field in which scope should be sent in the authentication request. This is required by some identity providers that expect scopes to be sent in a custom field instead of the standard 'scope' parameter.

    - **`scopes`**

      `array` — List of optional scopes that can be requested during authentication

      **Items:**

      `string`

  - **`pkce_enabled`**

    `boolean` — PKCE Enabled

  - **`prompt`**

    `string` — Prompt for the user

  - **`redirect_uri`**

    `string` — Redirect URI

  - **`scopes`**

    `array` — OIDC Scopes

    **Items:**

    `string`

  - **`sync_user_profile_on_login`**

    `boolean` — Indicates whether user profiles should be synchronized with the identity provider upon each log-in.

  - **`tenant_id`**

    `string` — Microsoft Entra tenant ID. Required when using a single-tenant or multi-tenant app registered in Microsoft Entra. Leave empty to use the common endpoint.

  - **`token_access_type`**

    `string` — Token Access Type

  - **`token_uri`**

    `string` — Token URI

  - **`use_platform_creds`**

    `boolean` — Use Scalekit credentials

  - **`user_info_uri`**

    `string` — User Info URI

* **`oidc_config`**

  `object` — Configuration details for OpenID Connect (OIDC) connections. Present only when type is OIDC.
  - **`authorize_uri`**

    `string` — Authorize URI

  - **`backchannel_logout_redirect_uri`**

    `string` — backchannel logout redirect uri where idp sends logout_token

  - **`client_id`**

    `string` — Client ID

  - **`client_secret`**

    `string` — Client Secret

  - **`discovery_endpoint`**

    `string` — Discovery Endpoint

  - **`idp_logout_required`**

    `boolean` — Enable IDP logout

  - **`issuer`**

    `string` — Issuer URL

  - **`jit_provisioning_with_sso_enabled`**

    `boolean` — Indicates if Just In Time user provisioning is enabled for the connection

  - **`jwks_uri`**

    `string` — JWKS URI

  - **`pkce_enabled`**

    `boolean` — PKCE Enabled

  - **`post_logout_redirect_uri`**

    `string` — post logout redirect uri

  - **`redirect_uri`**

    `string` — Redirect URI

  - **`scopes`**

    `array` — OIDC Scopes

    **Items:**

    `string`, possible values: `"openid", "profile", "email", "address", "phone"`

  - **`sync_user_profile_on_login`**

    `boolean` — Indicates whether user profiles should be synchronized with the identity provider upon each log-in.

  - **`token_auth_type`**

    `string`, possible values: `"URL_PARAMS", "BASIC_AUTH"` — Token Auth Type

  - **`token_uri`**

    `string` — Token URI

  - **`user_info_uri`**

    `string` — User Info URI

* **`organization_id`**

  `string` — Identifier of the organization that owns this connection. Connections are typically scoped to a single organization.

* **`passwordless_config`**

  `object` — Configuration details for Magic Link authentication. Present only when type is MAGIC_LINK.
  - **`code_challenge_length`**

    `integer`, format: `int64` — Code Challenge Length

  - **`code_challenge_type`**

    `string`, possible values: `"NUMERIC", "ALPHANUMERIC"` — Code Challenge Type

  - **`enforce_same_browser_origin`**

    `boolean` — Enforce Same Browser Origin

  - **`frequency`**

    `integer`, format: `int64` — Link Frequency

  - **`regenerate_passwordless_credentials_on_resend`**

    `boolean` — Regenerate the

  - **`type`**

    `string`, possible values: `"LINK", "OTP", "LINK_OTP"` — Passwordless Type

  - **`validity`**

    `integer`, format: `int64` — Link Validity in Seconds

* **`provider`**

  `string`, possible values: `"OKTA", "GOOGLE", "MICROSOFT_AD", "AUTH0", "ONELOGIN", "PING_IDENTITY", "JUMPCLOUD", "CUSTOM", "GITHUB", "GITLAB", "LINKEDIN", "SALESFORCE", "MICROSOFT", "IDP_SIMULATOR", "SCALEKIT", "ADFS"` — Identity provider service that handles authentication (such as OKTA, Google, Azure AD, or a custom provider)

* **`provider_key`**

  `string` — Key ID of the identity provider service that handles authentication

* **`saml_config`**

  `object` — Configuration details for SAML connections. Present only when type is SAML.
  - **`allow_idp_initiated_login`**

    `boolean` — Allow IDP Initiated Login

  - **`assertion_encrypted`**

    `boolean` — Assertion Encrypted

  - **`certificate_id`**

    `string` — Certificate ID

  - **`default_redirect_uri`**

    `string` — Default Redirect URI

  - **`force_authn`**

    `boolean` — Force Authn

  - **`idp_certificates`**

    `array` — IDP Certificates

    **Items:**
    - **`certificate`**

      `string` — IDP Certificate

    - **`create_time`**

      `string`, format: `date-time` — Certificate Creation Time

    - **`expiry_time`**

      `string`, format: `date-time` — Certificate Expiry Time

    - **`id`**

      `string` — Certificate ID

    - **`issuer`**

      `string` — Certificate Issuer

  - **`idp_entity_id`**

    `string` — IDP Entity ID

  - **`idp_metadata_url`**

    `string` — IDP Metadata URL

  - **`idp_name_id_format`**

    `string`, possible values: `"UNSPECIFIED", "EMAIL", "TRANSIENT", "PERSISTENT"` — IDP Name ID Format

  - **`idp_slo_request_binding`**

    `string`, possible values: `"HTTP_POST", "HTTP_REDIRECT"` — IDP SLO Request Binding

  - **`idp_slo_required`**

    `boolean` — Enable IDP logout

  - **`idp_slo_url`**

    `string` — IDP SLO URL

  - **`idp_sso_request_binding`**

    `string`, possible values: `"HTTP_POST", "HTTP_REDIRECT"` — IDP SSO Request Binding

  - **`idp_sso_url`**

    `string` — IDP SSO URL

  - **`jit_provisioning_with_sso_enabled`**

    `boolean` — Indicates if Just In Time user provisioning is enabled for the connection

  - **`saml_signing_option`**

    `string`, possible values: `"NO_SIGNING", "SAML_ONLY_RESPONSE_SIGNING", "SAML_ONLY_ASSERTION_SIGNING", "SAML_RESPONSE_ASSERTION_SIGNING", "SAML_RESPONSE_OR_ASSERTION_SIGNING"` — SAML Signing Option

  - **`sp_assertion_url`**

    `string` — SP Assertion URL

  - **`sp_entity_id`**

    `string` — SP Entity ID

  - **`sp_metadata_url`**

    `string` — SP Metadata URL

  - **`sp_slo_url`**

    `string` — Service Provider SLO url

  - **`sync_user_profile_on_login`**

    `boolean` — Indicates whether user profiles should be synchronized with the identity provider upon each log-in.

  - **`ui_button_title`**

    `string` — UI Button Title

  - **`want_request_signed`**

    `boolean` — Want Request Signed

* **`static_config`**

  `object` — Static configuration for custom connections. Present only when type is BASIC, BEARER, API_KEY, or custom.
  - **`static_config`**

    `object`

* **`status`**

  `string`, possible values: `"DRAFT", "IN_PROGRESS", "COMPLETED"` — Current configuration status of the connection. Possible values include IN_PROGRESS, CONFIGURED, and ERROR.

* **`test_connection_uri`**

  `string` — URI that can be used to test this connection. Visit this URL to verify the connection works correctly.

* **`type`**

  `string`, possible values: `"OIDC", "SAML", "PASSWORD", "OAUTH", "PASSWORDLESS", "BASIC", "BEARER", "API_KEY", "WEBAUTHN", "OAUTH_M2M", "TRELLO_OAUTH1", "GOOGLE_DWD"` — Authentication protocol used by this connection. Can be OIDC (OpenID Connect), SAML, OAUTH, or MAGIC_LINK.

* **`webauthn_config`**

  `object` — Configuration details for WebAuthn (passkeys). Present only when type is WEBAUTHN.
  - **`attestation`**

    `object`
    - **`conveyance_preference`**

      `string`

    - **`enterprise_approved_ids`**

      `array`

      **Items:**

      `string`

  - **`authenticator_selection`**

    `object`
    - **`authenticator_attachment`**

      `string`

    - **`user_verification`**

      `string`

  - **`authenticators`**

    `object`
    - **`desired_authenticator_status`**

      `array` — provides the list of statuses which are considered undesirable for status report validation purposes. Should be used with validate_status set to true.

      **Items:**

      `string`, default: `"[]"`

    - **`undesired_authenticator_status`**

      `array` — provides the list of statuses which are considered undesirable for status report validation purposes. Should be used with validate_status set to true.

      **Items:**

      `string`, default: `"['ATTESTATION_KEY_COMPROMISE', 'USER_VERIFICATION_BYPASS', 'USER_KEY_REMOTE_COMPROMISE', 'USER_KEY_PHYSICAL_COMPROMISE', 'REVOKED']"`

    - **`validate_anchors`**

      `boolean` — when set to true enables the validation of the attestation statement against the trust anchor from the metadata statement.

    - **`validate_attestation_type`**

      `boolean` — when set to true enables the validation of the attestation statements type against the known types the authenticator can produce.

    - **`validate_entry`**

      `boolean` — requires that the provided metadata has an entry for the given authenticator to be considered valid. By default an AAGUID which has a zero value should fail validation if validate_entry_permit_zero_aaguid is not provided with the value of true.

    - **`validate_entry_permit_zero_aaguid`**

      `boolean` — is an option that permits a zero'd AAGUID from an attestation statement to automatically pass metadata validations. Generally helpful to use with validate_entry.

    - **`validate_status`**

      `boolean` — when set to true enables the validation of the attestation statements AAGUID against the desired and undesired lists

  - **`enable_auto_registration`**

    `boolean` — Enable auto registration for WebAuthn

  - **`enable_conditional_login`**

    `boolean` — Allow autofill of passkeys in login page

  - **`rp`**

    `object`
    - **`ids`**

      `array`

      **Items:**

      `string`

    - **`origins`**

      `array`

      **Items:**

      `string`

  - **`show_passkey_button`**

    `boolean` — Show passkey button on login screen

  - **`timeout`**

    `object`
    - **`login`**

      `string`, default: `"\"300s\""` — Login timeout duration

    - **`login_uvd`**

      `string`, default: `"\"300s\""` — Login timeout duration when user verification is discouraged

    - **`registration`**

      `string`, default: `"\"300s\""` — Registration timeout duration

    - **`registration_uvd`**

      `string`, default: `"\"300s\""` — Registration timeout duration when user verification is discouraged

**Example:**

```json
{
  "attribute_mapping": {
    "additionalProperty": ""
  },
  "configuration_type": "MANUAL",
  "debug_enabled": true,
  "domains": [
    {
      "name": "example.com"
    }
  ],
  "enabled": false,
  "google_dwd_config": {
    "scopes": [""],
    "service_account_json": "",
    "token_uri": ""
  },
  "id": "conn_2123312131125533",
  "key_id": "",
  "oauth_config": {
    "access_type": "offline",
    "app_name": "My Trello App",
    "authorize_uri": "https://youridp.com/service/oauth/authorize",
    "client_id": "oauth_client_id",
    "client_secret": "oauth_client_secret",
    "custom_scope_name": "user_scope",
    "is_cimd": true,
    "optional_scopes": null,
    "pkce_enabled": true,
    "prompt": "none",
    "redirect_uri": "https://yourapp.com/service/oauth/redirect",
    "scopes": ["openid", "profile"],
    "sync_user_profile_on_login": true,
    "tenant_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "token_access_type": "offline",
    "token_uri": "https://youridp.com/service/oauth/token",
    "use_platform_creds": true,
    "user_info_uri": "https://youridp.com/service/oauth/userinfo"
  },
  "oidc_config": {
    "authorize_uri": "https://youridp.com/service/oauth/authorize",
    "backchannel_logout_redirect_uri": "https://yourapp.com/sso/v1/oidc/conn_1234/backchannel-logout",
    "client_id": "oauth_client_id",
    "client_secret": "oauth_client_secret",
    "discovery_endpoint": "https://youridp.com/service/oauth/.well-known/openid-configuration",
    "idp_logout_required": true,
    "issuer": "https://youridp.com/service/oauth",
    "jit_provisioning_with_sso_enabled": true,
    "jwks_uri": "https://youridp.com/service/oauth/jwks",
    "pkce_enabled": true,
    "post_logout_redirect_uri": "https://yourapp.com/sso/v1/oidc/conn_1234/logout/callback",
    "redirect_uri": "https://yourapp.com/sso/v1/oidc/conn_1234/callback",
    "scopes": ["openid", "profile"],
    "sync_user_profile_on_login": true,
    "token_auth_type": "URL_PARAMS",
    "token_uri": "https://youridp.com/service/oauth/token",
    "user_info_uri": "https://youridp.com/service/oauth/userinfo"
  },
  "organization_id": "org_2123312131125533",
  "passwordless_config": {
    "code_challenge_length": 6,
    "code_challenge_type": "NUMERIC",
    "enforce_same_browser_origin": true,
    "frequency": 1,
    "regenerate_passwordless_credentials_on_resend": true,
    "type": "LINK",
    "validity": 600
  },
  "provider": "OKTA",
  "provider_key": "google",
  "saml_config": {
    "allow_idp_initiated_login": true,
    "assertion_encrypted": true,
    "certificate_id": "cer_35585423166144613",
    "default_redirect_uri": "https://yourapp.com/service/saml/redirect",
    "force_authn": true,
    "idp_certificates": [{}],
    "idp_entity_id": "https://youridp.com/service/saml",
    "idp_metadata_url": "https://youridp.com/service/saml/metadata",
    "idp_name_id_format": "EMAIL",
    "idp_slo_request_binding": "HTTP_POST",
    "idp_slo_required": true,
    "idp_slo_url": "https://youridp.com/service/saml/slo",
    "idp_sso_request_binding": "HTTP_POST",
    "idp_sso_url": "https://youridp.com/service/saml/sso",
    "jit_provisioning_with_sso_enabled": true,
    "saml_signing_option": "SAML_ONLY_RESPONSE_SIGNING",
    "sp_assertion_url": "https://youridp.com/service/saml/assertion",
    "sp_entity_id": "https://yourapp.com/service/saml",
    "sp_metadata_url": "https://youridp.com/service/saml/metadata",
    "sp_slo_url": "https://yourapp.com/sso/v1/saml/conn_1234/slo/callback",
    "sync_user_profile_on_login": true,
    "ui_button_title": "Login with SSO",
    "want_request_signed": true
  },
  "static_config": {
    "static_config": {}
  },
  "status": "IN_PROGRESS",
  "test_connection_uri": "https://auth.example.com/test-connection/conn_2123312131125533",
  "type": "OIDC",
  "webauthn_config": {
    "attestation": null,
    "authenticator_selection": null,
    "authenticators": null,
    "enable_auto_registration": true,
    "enable_conditional_login": true,
    "rp": null,
    "show_passkey_button": true,
    "timeout": null
  }
}
```

### connectionsConnectionProvider

- **Type:**`string`

**Example:**

### connectionsConnectionStatus

- **Type:**`string`

**Example:**

### connectionsConnectionType

- **Type:**`string`

**Example:**

### connectionsGetConnectionResponse

- **Type:**`object`

* **`connection`**

  `object` — Complete connection details including provider configuration, protocol settings, status, and all metadata. Contains everything needed to understand the connection's current state.
  - **`attribute_mapping`**

    `object` — Maps identity provider attributes to user profile fields. For example, {'email': 'user.mail', 'name': 'user.displayName'}.

  - **`configuration_type`**

    `string`, possible values: `"DISCOVERY", "MANUAL"` — How the connection was configured: DISCOVERY (automatic configuration) or MANUAL (administrator configured)

  - **`debug_enabled`**

    `boolean` — Enables testing mode that allows non-HTTPS endpoints. Should only be enabled in development environments, never in production.

  - **`domains`**

    `array` — Domain associated with this connection, used for domain-based authentication flows.

    **Items:**
    - **`create_time`**

      `string`, format: `date-time` — Timestamp when the domain was first created.

    - **`domain`**

      `string` — The business domain name that was configured for allowed email domain functionality (e.g., company.com, subdomain.company.com).

    - **`domain_type`**

      `object`

    - **`environment_id`**

      `string` — The environment ID where this domain is configured.

    - **`id`**

      `string` — Scalekit-generated unique identifier for this domain record.

    - **`organization_id`**

      `string` — The organization to which the domain belongs.

    - **`update_time`**

      `string`, format: `date-time` — Timestamp when the domain was last updated.

    - **`verification_method`**

      `string`, possible values: `"ADMIN", "DNS", "NOT_APPLICABLE"` — Method that determines how domain ownership is verified. - ADMIN: domain is marked verified without DNS validation, typically by an admin. - DNS: domain must be verified by adding a TXT record to your DNS configuration. - NOT_APPLICABLE: verification does not apply to this domain type.

    - **`verification_status`**

      `string`, possible values: `"PENDING", "VERIFIED", "FAILED", "AUTO_VERIFIED"` — Verification status of the domain. - PENDING: DNS TXT record has not been validated yet. - VERIFIED: domain confirmed via DNS TXT record validation or admin approval. - AUTO_VERIFIED: domain verified automatically without DNS changes. - FAILED: DNS TXT record was not validated within the verification window.

  - **`enabled`**

    `boolean` — Controls whether users can sign in using this connection. When false, the connection exists but cannot be used for authentication.

  - **`google_dwd_config`**

    `object` — Configuration details for Google Domain-Wide Delegation. Present only when type is GOOGLE_DWD.
    - **`scopes`**

      `array` — OAuth 2.0 scopes to request.

      **Items:**

      `string`

    - **`service_account_json`**

      `string` — Google Cloud service account JSON key. Write-only: reads return a masked value.

    - **`token_uri`**

      `string` — Google token endpoint. Defaults to https\://oauth2.googleapis.com/token.

  - **`id`**

    `string` — Unique identifier for this connection. Used in API calls to reference this specific connection.

  - **`key_id`**

    `string` — Alternative identifier for this connection, typically used in frontend applications or URLs.

  - **`oauth_config`**

    `object` — Configuration details for OAuth connections. Present only when type is OAUTH.
    - **`access_type`**

      `string` — Access Type

    - **`app_name`**

      `string` — Application name used by providers that require it as an authorize query parameter (e.g., Trello's app_name).

    - **`authorize_uri`**

      `string` — Authorize URI

    - **`client_id`**

      `string` — Client ID

    - **`client_secret`**

      `string` — Client Secret

    - **`custom_scope_name`**

      `string` — Custom Scope Name

    - **`is_cimd`**

      `boolean` — Indicates whether this connection was registered using Client ID Metadata Document (CIMD) instead of Dynamic Client Registration.

    - **`optional_scopes`**

      `object` — Optional scopes configuration for identity providers that support or require additional scopes to be sent in a custom field during authentication requests.
      - **`field_name`**

        `string` — Name of the field in which scope should be sent in the authentication request. This is required by some identity providers that expect scopes to be sent in a custom field instead of the standard 'scope' parameter.

      - **`scopes`**

        `array` — List of optional scopes that can be requested during authentication

        **Items:**

        `string`

    - **`pkce_enabled`**

      `boolean` — PKCE Enabled

    - **`prompt`**

      `string` — Prompt for the user

    - **`redirect_uri`**

      `string` — Redirect URI

    - **`scopes`**

      `array` — OIDC Scopes

      **Items:**

      `string`

    - **`sync_user_profile_on_login`**

      `boolean` — Indicates whether user profiles should be synchronized with the identity provider upon each log-in.

    - **`tenant_id`**

      `string` — Microsoft Entra tenant ID. Required when using a single-tenant or multi-tenant app registered in Microsoft Entra. Leave empty to use the common endpoint.

    - **`token_access_type`**

      `string` — Token Access Type

    - **`token_uri`**

      `string` — Token URI

    - **`use_platform_creds`**

      `boolean` — Use Scalekit credentials

    - **`user_info_uri`**

      `string` — User Info URI

  - **`oidc_config`**

    `object` — Configuration details for OpenID Connect (OIDC) connections. Present only when type is OIDC.
    - **`authorize_uri`**

      `string` — Authorize URI

    - **`backchannel_logout_redirect_uri`**

      `string` — backchannel logout redirect uri where idp sends logout_token

    - **`client_id`**

      `string` — Client ID

    - **`client_secret`**

      `string` — Client Secret

    - **`discovery_endpoint`**

      `string` — Discovery Endpoint

    - **`idp_logout_required`**

      `boolean` — Enable IDP logout

    - **`issuer`**

      `string` — Issuer URL

    - **`jit_provisioning_with_sso_enabled`**

      `boolean` — Indicates if Just In Time user provisioning is enabled for the connection

    - **`jwks_uri`**

      `string` — JWKS URI

    - **`pkce_enabled`**

      `boolean` — PKCE Enabled

    - **`post_logout_redirect_uri`**

      `string` — post logout redirect uri

    - **`redirect_uri`**

      `string` — Redirect URI

    - **`scopes`**

      `array` — OIDC Scopes

      **Items:**

      `string`, possible values: `"openid", "profile", "email", "address", "phone"`

    - **`sync_user_profile_on_login`**

      `boolean` — Indicates whether user profiles should be synchronized with the identity provider upon each log-in.

    - **`token_auth_type`**

      `string`, possible values: `"URL_PARAMS", "BASIC_AUTH"` — Token Auth Type

    - **`token_uri`**

      `string` — Token URI

    - **`user_info_uri`**

      `string` — User Info URI

  - **`organization_id`**

    `string` — Identifier of the organization that owns this connection. Connections are typically scoped to a single organization.

  - **`passwordless_config`**

    `object` — Configuration details for Magic Link authentication. Present only when type is MAGIC_LINK.
    - **`code_challenge_length`**

      `integer`, format: `int64` — Code Challenge Length

    - **`code_challenge_type`**

      `string`, possible values: `"NUMERIC", "ALPHANUMERIC"` — Code Challenge Type

    - **`enforce_same_browser_origin`**

      `boolean` — Enforce Same Browser Origin

    - **`frequency`**

      `integer`, format: `int64` — Link Frequency

    - **`regenerate_passwordless_credentials_on_resend`**

      `boolean` — Regenerate the

    - **`type`**

      `string`, possible values: `"LINK", "OTP", "LINK_OTP"` — Passwordless Type

    - **`validity`**

      `integer`, format: `int64` — Link Validity in Seconds

  - **`provider`**

    `string`, possible values: `"OKTA", "GOOGLE", "MICROSOFT_AD", "AUTH0", "ONELOGIN", "PING_IDENTITY", "JUMPCLOUD", "CUSTOM", "GITHUB", "GITLAB", "LINKEDIN", "SALESFORCE", "MICROSOFT", "IDP_SIMULATOR", "SCALEKIT", "ADFS"` — Identity provider service that handles authentication (such as OKTA, Google, Azure AD, or a custom provider)

  - **`provider_key`**

    `string` — Key ID of the identity provider service that handles authentication

  - **`saml_config`**

    `object` — Configuration details for SAML connections. Present only when type is SAML.
    - **`allow_idp_initiated_login`**

      `boolean` — Allow IDP Initiated Login

    - **`assertion_encrypted`**

      `boolean` — Assertion Encrypted

    - **`certificate_id`**

      `string` — Certificate ID

    - **`default_redirect_uri`**

      `string` — Default Redirect URI

    - **`force_authn`**

      `boolean` — Force Authn

    - **`idp_certificates`**

      `array` — IDP Certificates

      **Items:**
      - **`certificate`**

        `string` — IDP Certificate

      - **`create_time`**

        `string`, format: `date-time` — Certificate Creation Time

      - **`expiry_time`**

        `string`, format: `date-time` — Certificate Expiry Time

      - **`id`**

        `string` — Certificate ID

      - **`issuer`**

        `string` — Certificate Issuer

    - **`idp_entity_id`**

      `string` — IDP Entity ID

    - **`idp_metadata_url`**

      `string` — IDP Metadata URL

    - **`idp_name_id_format`**

      `string`, possible values: `"UNSPECIFIED", "EMAIL", "TRANSIENT", "PERSISTENT"` — IDP Name ID Format

    - **`idp_slo_request_binding`**

      `string`, possible values: `"HTTP_POST", "HTTP_REDIRECT"` — IDP SLO Request Binding

    - **`idp_slo_required`**

      `boolean` — Enable IDP logout

    - **`idp_slo_url`**

      `string` — IDP SLO URL

    - **`idp_sso_request_binding`**

      `string`, possible values: `"HTTP_POST", "HTTP_REDIRECT"` — IDP SSO Request Binding

    - **`idp_sso_url`**

      `string` — IDP SSO URL

    - **`jit_provisioning_with_sso_enabled`**

      `boolean` — Indicates if Just In Time user provisioning is enabled for the connection

    - **`saml_signing_option`**

      `string`, possible values: `"NO_SIGNING", "SAML_ONLY_RESPONSE_SIGNING", "SAML_ONLY_ASSERTION_SIGNING", "SAML_RESPONSE_ASSERTION_SIGNING", "SAML_RESPONSE_OR_ASSERTION_SIGNING"` — SAML Signing Option

    - **`sp_assertion_url`**

      `string` — SP Assertion URL

    - **`sp_entity_id`**

      `string` — SP Entity ID

    - **`sp_metadata_url`**

      `string` — SP Metadata URL

    - **`sp_slo_url`**

      `string` — Service Provider SLO url

    - **`sync_user_profile_on_login`**

      `boolean` — Indicates whether user profiles should be synchronized with the identity provider upon each log-in.

    - **`ui_button_title`**

      `string` — UI Button Title

    - **`want_request_signed`**

      `boolean` — Want Request Signed

  - **`static_config`**

    `object` — Static configuration for custom connections. Present only when type is BASIC, BEARER, API_KEY, or custom.
    - **`static_config`**

      `object`

  - **`status`**

    `string`, possible values: `"DRAFT", "IN_PROGRESS", "COMPLETED"` — Current configuration status of the connection. Possible values include IN_PROGRESS, CONFIGURED, and ERROR.

  - **`test_connection_uri`**

    `string` — URI that can be used to test this connection. Visit this URL to verify the connection works correctly.

  - **`type`**

    `string`, possible values: `"OIDC", "SAML", "PASSWORD", "OAUTH", "PASSWORDLESS", "BASIC", "BEARER", "API_KEY", "WEBAUTHN", "OAUTH_M2M", "TRELLO_OAUTH1", "GOOGLE_DWD"` — Authentication protocol used by this connection. Can be OIDC (OpenID Connect), SAML, OAUTH, or MAGIC_LINK.

  - **`webauthn_config`**

    `object` — Configuration details for WebAuthn (passkeys). Present only when type is WEBAUTHN.
    - **`attestation`**

      `object`
      - **`conveyance_preference`**

        `string`

      - **`enterprise_approved_ids`**

        `array`

        **Items:**

        `string`

    - **`authenticator_selection`**

      `object`
      - **`authenticator_attachment`**

        `string`

      - **`user_verification`**

        `string`

    - **`authenticators`**

      `object`
      - **`desired_authenticator_status`**

        `array` — provides the list of statuses which are considered undesirable for status report validation purposes. Should be used with validate_status set to true.

        **Items:**

        `string`, default: `"[]"`

      - **`undesired_authenticator_status`**

        `array` — provides the list of statuses which are considered undesirable for status report validation purposes. Should be used with validate_status set to true.

        **Items:**

        `string`, default: `"['ATTESTATION_KEY_COMPROMISE', 'USER_VERIFICATION_BYPASS', 'USER_KEY_REMOTE_COMPROMISE', 'USER_KEY_PHYSICAL_COMPROMISE', 'REVOKED']"`

      - **`validate_anchors`**

        `boolean` — when set to true enables the validation of the attestation statement against the trust anchor from the metadata statement.

      - **`validate_attestation_type`**

        `boolean` — when set to true enables the validation of the attestation statements type against the known types the authenticator can produce.

      - **`validate_entry`**

        `boolean` — requires that the provided metadata has an entry for the given authenticator to be considered valid. By default an AAGUID which has a zero value should fail validation if validate_entry_permit_zero_aaguid is not provided with the value of true.

      - **`validate_entry_permit_zero_aaguid`**

        `boolean` — is an option that permits a zero'd AAGUID from an attestation statement to automatically pass metadata validations. Generally helpful to use with validate_entry.

      - **`validate_status`**

        `boolean` — when set to true enables the validation of the attestation statements AAGUID against the desired and undesired lists

    - **`enable_auto_registration`**

      `boolean` — Enable auto registration for WebAuthn

    - **`enable_conditional_login`**

      `boolean` — Allow autofill of passkeys in login page

    - **`rp`**

      `object`
      - **`ids`**

        `array`

        **Items:**

        `string`

      - **`origins`**

        `array`

        **Items:**

        `string`

    - **`show_passkey_button`**

      `boolean` — Show passkey button on login screen

    - **`timeout`**

      `object`
      - **`login`**

        `string`, default: `"\"300s\""` — Login timeout duration

      - **`login_uvd`**

        `string`, default: `"\"300s\""` — Login timeout duration when user verification is discouraged

      - **`registration`**

        `string`, default: `"\"300s\""` — Registration timeout duration

      - **`registration_uvd`**

        `string`, default: `"\"300s\""` — Registration timeout duration when user verification is discouraged

**Example:**

```json
{
  "connection": {
    "attribute_mapping": {
      "additionalProperty": ""
    },
    "configuration_type": "MANUAL",
    "debug_enabled": true,
    "domains": [
      {
        "name": "example.com"
      }
    ],
    "enabled": false,
    "google_dwd_config": null,
    "id": "conn_2123312131125533",
    "key_id": "",
    "oauth_config": null,
    "oidc_config": null,
    "organization_id": "org_2123312131125533",
    "passwordless_config": null,
    "provider": "OKTA",
    "provider_key": "google",
    "saml_config": null,
    "static_config": null,
    "status": "IN_PROGRESS",
    "test_connection_uri": "https://auth.example.com/test-connection/conn_2123312131125533",
    "type": "OIDC",
    "webauthn_config": null
  }
}
```

### connectionsGoogleDWDConfig

- **Type:**`object`

* **`scopes`**

  `array` — OAuth 2.0 scopes to request.

  **Items:**

  `string`

* **`service_account_json`**

  `string` — Google Cloud service account JSON key. Write-only: reads return a masked value.

* **`token_uri`**

  `string` — Google token endpoint. Defaults to https\://oauth2.googleapis.com/token.

**Example:**

```json
{
  "scopes": [""],
  "service_account_json": "",
  "token_uri": ""
}
```

### connectionsIDPCertificate

- **Type:**`object`

* **`certificate`**

  `string` — IDP Certificate

* **`create_time`**

  `string`, format: `date-time` — Certificate Creation Time

* **`expiry_time`**

  `string`, format: `date-time` — Certificate Expiry Time

* **`id`**

  `string` — Certificate ID

* **`issuer`**

  `string` — Certificate Issuer

**Example:**

```json
{
  "certificate": "",
  "create_time": "2021-09-01T00:00:00Z",
  "expiry_time": "2021-09-01T00:00:00Z",
  "id": "cert_123123123123",
  "issuer": "https://youridp.com/service/saml"
}
```

### connectionsListConnection

- **Type:**`object`

* **`domains`**

  `array` — List of domains configured with this connection

  **Items:**

  `string`

* **`enabled`**

  `boolean` — Whether the connection is currently active for organization users

* **`id`**

  `string` — Unique identifier of the connection

* **`key_id`**

  `string` — Alternative identifier for this connection, typically used in frontend applications or URLs

* **`organization_id`**

  `string` — Unique identifier of the organization that owns this connection

* **`organization_name`**

  `string` — Name of the organization of the connection

* **`provider`**

  `string`, possible values: `"OKTA", "GOOGLE", "MICROSOFT_AD", "AUTH0", "ONELOGIN", "PING_IDENTITY", "JUMPCLOUD", "CUSTOM", "GITHUB", "GITLAB", "LINKEDIN", "SALESFORCE", "MICROSOFT", "IDP_SIMULATOR", "SCALEKIT", "ADFS"` — Identity provider type (e.g., OKTA, Google, Azure AD)

* **`provider_key`**

  `string` — Key ID of the identity provider service that handles authentication

* **`status`**

  `string`, possible values: `"DRAFT", "IN_PROGRESS", "COMPLETED"` — Current configuration status of the connection

* **`type`**

  `string`, possible values: `"OIDC", "SAML", "PASSWORD", "OAUTH", "PASSWORDLESS", "BASIC", "BEARER", "API_KEY", "WEBAUTHN", "OAUTH_M2M", "TRELLO_OAUTH1", "GOOGLE_DWD"` — Authentication protocol used by the connection

**Example:**

```json
{
  "domains": ["yourapp.com", "yourworkspace.com"],
  "enabled": false,
  "id": "conn_2123312131125533",
  "key_id": "conn_2123312131125533",
  "organization_id": "org_2123312131125533",
  "organization_name": "Your Organization",
  "provider": "CUSTOM",
  "provider_key": "google",
  "status": "IN_PROGRESS",
  "type": "OIDC"
}
```

### connectionsListConnectionsResponse

- **Type:**`object`

* **`connections`**

  `array` — List of connections matching the request criteria

  **Items:**
  - **`domains`**

    `array` — List of domains configured with this connection

    **Items:**

    `string`

  - **`enabled`**

    `boolean` — Whether the connection is currently active for organization users

  - **`id`**

    `string` — Unique identifier of the connection

  - **`key_id`**

    `string` — Alternative identifier for this connection, typically used in frontend applications or URLs

  - **`organization_id`**

    `string` — Unique identifier of the organization that owns this connection

  - **`organization_name`**

    `string` — Name of the organization of the connection

  - **`provider`**

    `string`, possible values: `"OKTA", "GOOGLE", "MICROSOFT_AD", "AUTH0", "ONELOGIN", "PING_IDENTITY", "JUMPCLOUD", "CUSTOM", "GITHUB", "GITLAB", "LINKEDIN", "SALESFORCE", "MICROSOFT", "IDP_SIMULATOR", "SCALEKIT", "ADFS"` — Identity provider type (e.g., OKTA, Google, Azure AD)

  - **`provider_key`**

    `string` — Key ID of the identity provider service that handles authentication

  - **`status`**

    `string`, possible values: `"DRAFT", "IN_PROGRESS", "COMPLETED"` — Current configuration status of the connection

  - **`type`**

    `string`, possible values: `"OIDC", "SAML", "PASSWORD", "OAUTH", "PASSWORDLESS", "BASIC", "BEARER", "API_KEY", "WEBAUTHN", "OAUTH_M2M", "TRELLO_OAUTH1", "GOOGLE_DWD"` — Authentication protocol used by the connection

**Example:**

```json
{
  "connections": [
    {
      "domains": ["yourapp.com", "yourworkspace.com"],
      "enabled": false,
      "id": "conn_2123312131125533",
      "key_id": "conn_2123312131125533",
      "organization_id": "org_2123312131125533",
      "organization_name": "Your Organization",
      "provider": "CUSTOM",
      "provider_key": "google",
      "status": "IN_PROGRESS",
      "type": "OIDC"
    }
  ]
}
```

### connectionsNameIdFormat

- **Type:**`string`

**Example:**

### connectionsOAuthConnectionConfig

- **Type:**`object`

* **`access_type`**

  `string` — Access Type

* **`app_name`**

  `string` — Application name used by providers that require it as an authorize query parameter (e.g., Trello's app_name).

* **`authorize_uri`**

  `string` — Authorize URI

* **`client_id`**

  `string` — Client ID

* **`client_secret`**

  `string` — Client Secret

* **`custom_scope_name`**

  `string` — Custom Scope Name

* **`is_cimd`**

  `boolean` — Indicates whether this connection was registered using Client ID Metadata Document (CIMD) instead of Dynamic Client Registration.

* **`optional_scopes`**

  `object` — Optional scopes configuration for identity providers that support or require additional scopes to be sent in a custom field during authentication requests.
  - **`field_name`**

    `string` — Name of the field in which scope should be sent in the authentication request. This is required by some identity providers that expect scopes to be sent in a custom field instead of the standard 'scope' parameter.

  - **`scopes`**

    `array` — List of optional scopes that can be requested during authentication

    **Items:**

    `string`

* **`pkce_enabled`**

  `boolean` — PKCE Enabled

* **`prompt`**

  `string` — Prompt for the user

* **`redirect_uri`**

  `string` — Redirect URI

* **`scopes`**

  `array` — OIDC Scopes

  **Items:**

  `string`

* **`sync_user_profile_on_login`**

  `boolean` — Indicates whether user profiles should be synchronized with the identity provider upon each log-in.

* **`tenant_id`**

  `string` — Microsoft Entra tenant ID. Required when using a single-tenant or multi-tenant app registered in Microsoft Entra. Leave empty to use the common endpoint.

* **`token_access_type`**

  `string` — Token Access Type

* **`token_uri`**

  `string` — Token URI

* **`use_platform_creds`**

  `boolean` — Use Scalekit credentials

* **`user_info_uri`**

  `string` — User Info URI

**Example:**

```json
{
  "access_type": "offline",
  "app_name": "My Trello App",
  "authorize_uri": "https://youridp.com/service/oauth/authorize",
  "client_id": "oauth_client_id",
  "client_secret": "oauth_client_secret",
  "custom_scope_name": "user_scope",
  "is_cimd": true,
  "optional_scopes": {
    "field_name": "optional_scope or bot_scope",
    "scopes": ["scope1", "scope2"]
  },
  "pkce_enabled": true,
  "prompt": "none",
  "redirect_uri": "https://yourapp.com/service/oauth/redirect",
  "scopes": ["openid", "profile"],
  "sync_user_profile_on_login": true,
  "tenant_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "token_access_type": "offline",
  "token_uri": "https://youridp.com/service/oauth/token",
  "use_platform_creds": true,
  "user_info_uri": "https://youridp.com/service/oauth/userinfo"
}
```

### connectionsOIDCConnectionConfig

- **Type:**`object`

* **`authorize_uri`**

  `string` — Authorize URI

* **`backchannel_logout_redirect_uri`**

  `string` — backchannel logout redirect uri where idp sends logout_token

* **`client_id`**

  `string` — Client ID

* **`client_secret`**

  `string` — Client Secret

* **`discovery_endpoint`**

  `string` — Discovery Endpoint

* **`idp_logout_required`**

  `boolean` — Enable IDP logout

* **`issuer`**

  `string` — Issuer URL

* **`jit_provisioning_with_sso_enabled`**

  `boolean` — Indicates if Just In Time user provisioning is enabled for the connection

* **`jwks_uri`**

  `string` — JWKS URI

* **`pkce_enabled`**

  `boolean` — PKCE Enabled

* **`post_logout_redirect_uri`**

  `string` — post logout redirect uri

* **`redirect_uri`**

  `string` — Redirect URI

* **`scopes`**

  `array` — OIDC Scopes

  **Items:**

  `string`, possible values: `"openid", "profile", "email", "address", "phone"`

* **`sync_user_profile_on_login`**

  `boolean` — Indicates whether user profiles should be synchronized with the identity provider upon each log-in.

* **`token_auth_type`**

  `string`, possible values: `"URL_PARAMS", "BASIC_AUTH"` — Token Auth Type

* **`token_uri`**

  `string` — Token URI

* **`user_info_uri`**

  `string` — User Info URI

**Example:**

```json
{
  "authorize_uri": "https://youridp.com/service/oauth/authorize",
  "backchannel_logout_redirect_uri": "https://yourapp.com/sso/v1/oidc/conn_1234/backchannel-logout",
  "client_id": "oauth_client_id",
  "client_secret": "oauth_client_secret",
  "discovery_endpoint": "https://youridp.com/service/oauth/.well-known/openid-configuration",
  "idp_logout_required": true,
  "issuer": "https://youridp.com/service/oauth",
  "jit_provisioning_with_sso_enabled": true,
  "jwks_uri": "https://youridp.com/service/oauth/jwks",
  "pkce_enabled": true,
  "post_logout_redirect_uri": "https://yourapp.com/sso/v1/oidc/conn_1234/logout/callback",
  "redirect_uri": "https://yourapp.com/sso/v1/oidc/conn_1234/callback",
  "scopes": ["openid", "profile"],
  "sync_user_profile_on_login": true,
  "token_auth_type": "URL_PARAMS",
  "token_uri": "https://youridp.com/service/oauth/token",
  "user_info_uri": "https://youridp.com/service/oauth/userinfo"
}
```

### connectionsOIDCScope

- **Type:**`string`

**Example:**

### connectionsOptionalScopes

- **Type:**`object`

* **`field_name`**

  `string` — Name of the field in which scope should be sent in the authentication request. This is required by some identity providers that expect scopes to be sent in a custom field instead of the standard 'scope' parameter.

* **`scopes`**

  `array` — List of optional scopes that can be requested during authentication

  **Items:**

  `string`

**Example:**

```json
{
  "field_name": "optional_scope or bot_scope",
  "scopes": ["scope1", "scope2"]
}
```

### connectionsPasswordLessConfig

- **Type:**`object`

* **`code_challenge_length`**

  `integer`, format: `int64` — Code Challenge Length

* **`code_challenge_type`**

  `string`, possible values: `"NUMERIC", "ALPHANUMERIC"` — Code Challenge Type

* **`enforce_same_browser_origin`**

  `boolean` — Enforce Same Browser Origin

* **`frequency`**

  `integer`, format: `int64` — Link Frequency

* **`regenerate_passwordless_credentials_on_resend`**

  `boolean` — Regenerate the

* **`type`**

  `string`, possible values: `"LINK", "OTP", "LINK_OTP"` — Passwordless Type

* **`validity`**

  `integer`, format: `int64` — Link Validity in Seconds

**Example:**

```json
{
  "code_challenge_length": 6,
  "code_challenge_type": "NUMERIC",
  "enforce_same_browser_origin": true,
  "frequency": 1,
  "regenerate_passwordless_credentials_on_resend": true,
  "type": "LINK",
  "validity": 600
}
```

### connectionsPasswordlessType

- **Type:**`string`

**Example:**

### connectionsRequestBinding

- **Type:**`string`

**Example:**

### connectionsSAMLConnectionConfigResponse

- **Type:**`object`

* **`allow_idp_initiated_login`**

  `boolean` — Allow IDP Initiated Login

* **`assertion_encrypted`**

  `boolean` — Assertion Encrypted

* **`certificate_id`**

  `string` — Certificate ID

* **`default_redirect_uri`**

  `string` — Default Redirect URI

* **`force_authn`**

  `boolean` — Force Authn

* **`idp_certificates`**

  `array` — IDP Certificates

  **Items:**
  - **`certificate`**

    `string` — IDP Certificate

  - **`create_time`**

    `string`, format: `date-time` — Certificate Creation Time

  - **`expiry_time`**

    `string`, format: `date-time` — Certificate Expiry Time

  - **`id`**

    `string` — Certificate ID

  - **`issuer`**

    `string` — Certificate Issuer

* **`idp_entity_id`**

  `string` — IDP Entity ID

* **`idp_metadata_url`**

  `string` — IDP Metadata URL

* **`idp_name_id_format`**

  `string`, possible values: `"UNSPECIFIED", "EMAIL", "TRANSIENT", "PERSISTENT"` — IDP Name ID Format

* **`idp_slo_request_binding`**

  `string`, possible values: `"HTTP_POST", "HTTP_REDIRECT"` — IDP SLO Request Binding

* **`idp_slo_required`**

  `boolean` — Enable IDP logout

* **`idp_slo_url`**

  `string` — IDP SLO URL

* **`idp_sso_request_binding`**

  `string`, possible values: `"HTTP_POST", "HTTP_REDIRECT"` — IDP SSO Request Binding

* **`idp_sso_url`**

  `string` — IDP SSO URL

* **`jit_provisioning_with_sso_enabled`**

  `boolean` — Indicates if Just In Time user provisioning is enabled for the connection

* **`saml_signing_option`**

  `string`, possible values: `"NO_SIGNING", "SAML_ONLY_RESPONSE_SIGNING", "SAML_ONLY_ASSERTION_SIGNING", "SAML_RESPONSE_ASSERTION_SIGNING", "SAML_RESPONSE_OR_ASSERTION_SIGNING"` — SAML Signing Option

* **`sp_assertion_url`**

  `string` — SP Assertion URL

* **`sp_entity_id`**

  `string` — SP Entity ID

* **`sp_metadata_url`**

  `string` — SP Metadata URL

* **`sp_slo_url`**

  `string` — Service Provider SLO url

* **`sync_user_profile_on_login`**

  `boolean` — Indicates whether user profiles should be synchronized with the identity provider upon each log-in.

* **`ui_button_title`**

  `string` — UI Button Title

* **`want_request_signed`**

  `boolean` — Want Request Signed

**Example:**

```json
{
  "allow_idp_initiated_login": true,
  "assertion_encrypted": true,
  "certificate_id": "cer_35585423166144613",
  "default_redirect_uri": "https://yourapp.com/service/saml/redirect",
  "force_authn": true,
  "idp_certificates": [
    {
      "certificate": "",
      "create_time": "2021-09-01T00:00:00Z",
      "expiry_time": "2021-09-01T00:00:00Z",
      "id": "cert_123123123123",
      "issuer": "https://youridp.com/service/saml"
    }
  ],
  "idp_entity_id": "https://youridp.com/service/saml",
  "idp_metadata_url": "https://youridp.com/service/saml/metadata",
  "idp_name_id_format": "EMAIL",
  "idp_slo_request_binding": "HTTP_POST",
  "idp_slo_required": true,
  "idp_slo_url": "https://youridp.com/service/saml/slo",
  "idp_sso_request_binding": "HTTP_POST",
  "idp_sso_url": "https://youridp.com/service/saml/sso",
  "jit_provisioning_with_sso_enabled": true,
  "saml_signing_option": "SAML_ONLY_RESPONSE_SIGNING",
  "sp_assertion_url": "https://youridp.com/service/saml/assertion",
  "sp_entity_id": "https://yourapp.com/service/saml",
  "sp_metadata_url": "https://youridp.com/service/saml/metadata",
  "sp_slo_url": "https://yourapp.com/sso/v1/saml/conn_1234/slo/callback",
  "sync_user_profile_on_login": true,
  "ui_button_title": "Login with SSO",
  "want_request_signed": true
}
```

### enums all

- **Type:**`string`

**Example:**

### connectionsStaticAuthConfig

- **Type:**`object`

* **`static_config`**

  `object`

**Example:**

```json
{
  "static_config": {}
}
```

### connectionsToggleConnectionResponse

- **Type:**`object`

* **`enabled`**

  `boolean` — Current state of the connection after the operation. True means the connection is now enabled and can be used for authentication.

* **`error_message`**

  `string` — Error message if the operation fails

**Example:**

```json
{
  "enabled": true,
  "error_message": "placeholder"
}
```

### connectionsTokenAuthType

- **Type:**`string`

**Example:**

### WebAuthConfiguration defines WebAuthn (passkeys) configuration limited to RP and Attestation

- **Type:**`object`

* **`attestation`**

  `object`
  - **`conveyance_preference`**

    `string`

  - **`enterprise_approved_ids`**

    `array`

    **Items:**

    `string`

* **`authenticator_selection`**

  `object`
  - **`authenticator_attachment`**

    `string`

  - **`user_verification`**

    `string`

* **`authenticators`**

  `object`
  - **`desired_authenticator_status`**

    `array` — provides the list of statuses which are considered undesirable for status report validation purposes. Should be used with validate_status set to true.

    **Items:**

    `string`, default: `"[]"`

  - **`undesired_authenticator_status`**

    `array` — provides the list of statuses which are considered undesirable for status report validation purposes. Should be used with validate_status set to true.

    **Items:**

    `string`, default: `"['ATTESTATION_KEY_COMPROMISE', 'USER_VERIFICATION_BYPASS', 'USER_KEY_REMOTE_COMPROMISE', 'USER_KEY_PHYSICAL_COMPROMISE', 'REVOKED']"`

  - **`validate_anchors`**

    `boolean` — when set to true enables the validation of the attestation statement against the trust anchor from the metadata statement.

  - **`validate_attestation_type`**

    `boolean` — when set to true enables the validation of the attestation statements type against the known types the authenticator can produce.

  - **`validate_entry`**

    `boolean` — requires that the provided metadata has an entry for the given authenticator to be considered valid. By default an AAGUID which has a zero value should fail validation if validate_entry_permit_zero_aaguid is not provided with the value of true.

  - **`validate_entry_permit_zero_aaguid`**

    `boolean` — is an option that permits a zero'd AAGUID from an attestation statement to automatically pass metadata validations. Generally helpful to use with validate_entry.

  - **`validate_status`**

    `boolean` — when set to true enables the validation of the attestation statements AAGUID against the desired and undesired lists

* **`enable_auto_registration`**

  `boolean` — Enable auto registration for WebAuthn

* **`enable_conditional_login`**

  `boolean` — Allow autofill of passkeys in login page

* **`rp`**

  `object`
  - **`ids`**

    `array`

    **Items:**

    `string`

  - **`origins`**

    `array`

    **Items:**

    `string`

* **`show_passkey_button`**

  `boolean` — Show passkey button on login screen

* **`timeout`**

  `object`
  - **`login`**

    `string`, default: `"\"300s\""` — Login timeout duration

  - **`login_uvd`**

    `string`, default: `"\"300s\""` — Login timeout duration when user verification is discouraged

  - **`registration`**

    `string`, default: `"\"300s\""` — Registration timeout duration

  - **`registration_uvd`**

    `string`, default: `"\"300s\""` — Registration timeout duration when user verification is discouraged

**Example:**

```json
{
  "attestation": {
    "conveyance_preference": "",
    "enterprise_approved_ids": [""]
  },
  "authenticator_selection": {
    "authenticator_attachment": "",
    "user_verification": ""
  },
  "authenticators": {
    "desired_authenticator_status": ["[]"],
    "undesired_authenticator_status": [
      "['ATTESTATION_KEY_COMPROMISE', 'USER_VERIFICATION_BYPASS', 'USER_KEY_REMOTE_COMPROMISE', 'USER_KEY_PHYSICAL_COMPROMISE', 'REVOKED']"
    ],
    "validate_anchors": true,
    "validate_attestation_type": true,
    "validate_entry": true,
    "validate_entry_permit_zero_aaguid": true,
    "validate_status": true
  },
  "enable_auto_registration": true,
  "enable_conditional_login": true,
  "rp": {
    "ids": [""],
    "origins": [""]
  },
  "show_passkey_button": true,
  "timeout": {
    "login": "\"300s\"",
    "login_uvd": "\"300s\"",
    "registration": "\"300s\"",
    "registration_uvd": "\"300s\""
  }
}
```

### directoriesAttributeMapping

- **Type:**`object`

* **`key`**

  `string`

* **`map_to`**

  `string`

**Example:**

```json
{
  "key": "",
  "map_to": ""
}
```

### directoriesAttributeMappings

- **Type:**`object`

* **`attributes`**

  `array`

  **Items:**
  - **`key`**

    `string`

  - **`map_to`**

    `string`

**Example:**

```json
{
  "attributes": [
    {
      "key": "",
      "map_to": ""
    }
  ]
}
```

### directoriesDirectory

- **Type:**`object`

* **`attribute_mappings`**

  `object` — Mappings between directory attributes and Scalekit user and group attributes
  - **`attributes`**

    `array`

    **Items:**
    - **`key`**

      `string`

    - **`map_to`**

      `string`

* **`directory_endpoint`**

  `string` — The endpoint URL generated by Scalekit for synchronizing users and groups from the Directory Provider

* **`directory_provider`**

  `string`, possible values: `"OKTA", "GOOGLE", "MICROSOFT_AD", "AUTH0", "ONELOGIN", "JUMPCLOUD", "PING_IDENTITY"` — Identity provider connected to this directory

* **`directory_type`**

  `string`, possible values: `"SCIM", "LDAP", "POLL"` — Type of the directory, indicating the protocol or standard used for synchronization

* **`email`**

  `string` — Email Id associated with Directory whose access will be used for polling

* **`enabled`**

  `boolean` — Indicates whether the directory is currently enabled and actively synchronizing users and groups

* **`groups_tracked`**

  `string` — It indicates if all groups are tracked or select groups are tracked

* **`id`**

  `string` — Unique identifier of the directory

* **`last_synced_at`**

  `string`, format: `date-time` — Timestamp of the last successful synchronization of users and groups from the Directory Provider

* **`name`**

  `string` — Name of the directory, typically representing the connected Directory provider

* **`organization_id`**

  `string` — Unique identifier of the organization to which the directory belongs

* **`role_assignments`**

  `object` — Role assignments associated with the directory, defining group based role assignments
  - **`assignments`**

    `array`

    **Items:**
    - **`group_id`**

      `string` — group ID for the role mapping

    - **`role_name`**

      `string`

* **`secrets`**

  `array` — List of secrets used for authenticating and synchronizing with the Directory Provider

  **Items:**
  - **`create_time`**

    `string`, format: `date-time` — Creation Time

  - **`directory_id`**

    `string` — Directory ID

  - **`expire_time`**

    `string`, format: `date-time` — Expiry Time

  - **`id`**

    `string`

  - **`last_used_time`**

    `string`, format: `date-time` — Last Used Time

  - **`secret_suffix`**

    `string` — Secret Suffix

  - **`status`**

    `string`, possible values: `"INACTIVE"` — Secret Status

* **`stats`**

  `object` — Statistics and metrics related to the directory, such as synchronization status and error counts
  - **`group_updated_at`**

    `string`, format: `date-time` — Max time of Group Updated At for Directory

  - **`total_groups`**

    `integer`, format: `int32` — Total Groups in the Directory

  - **`total_users`**

    `integer`, format: `int32` — Total Users in the Directory

  - **`user_updated_at`**

    `string`, format: `date-time` — Max time of User Updated At for Directory

* **`status`**

  `string` — Directory Status

* **`total_groups`**

  `integer`, format: `int32` — Total number of groups in the directory

* **`total_users`**

  `integer`, format: `int32` — Total number of users in the directory

**Example:**

```json
{
  "attribute_mappings": {
    "attributes": [{}]
  },
  "directory_endpoint": "https://yourapp.scalekit.com/api/v1/directoies/dir_123212312/scim/v2",
  "directory_provider": "OKTA",
  "directory_type": "SCIM",
  "email": "john.doe@scalekit.cloud",
  "enabled": true,
  "groups_tracked": "ALL",
  "id": "dir_121312434123312",
  "last_synced_at": "2024-10-01T00:00:00Z",
  "name": "Azure AD",
  "organization_id": "org_121312434123312",
  "role_assignments": {
    "assignments": [{}]
  },
  "secrets": [
    {
      "create_time": "2024-10-01T00:00:00Z",
      "directory_id": "dir_12362474900684814",
      "expire_time": "2025-10-01T00:00:00Z",
      "id": "",
      "last_used_time": "2024-10-01T00:00:00Z",
      "secret_suffix": "Nzg5",
      "status": "INACTIVE"
    }
  ],
  "stats": {
    "group_updated_at": "2024-10-01T00:00:00Z",
    "total_groups": 10,
    "total_users": 10,
    "user_updated_at": "2024-10-01T00:00:00Z"
  },
  "status": "IN_PROGRESS",
  "total_groups": 10,
  "total_users": 10
}
```

### directoriesDirectoryGroup

- **Type:**`object`

* **`display_name`**

  `string` — Display Name

* **`group_detail`**

  `object` — Complete Group Details Payload

* **`id`**

  `string` — Group ID

* **`total_users`**

  `integer`, format: `int32` — Total Users in the Group

* **`updated_at`**

  `string`, format: `date-time` — Updated At

**Example:**

```json
{
  "display_name": "Admins",
  "group_detail": {},
  "id": "dirgroup_121312434123312",
  "total_users": 10,
  "updated_at": "2024-10-01T00:00:00Z"
}
```

### directoriesDirectoryProvider

- **Type:**`string`

**Example:**

### directoriesDirectoryType

- **Type:**`string`

**Example:**

### directoriesDirectoryUser

- **Type:**`object`

* **`email`**

  `string` — Email

* **`emails`**

  `array` — Emails

  **Items:**

  `string`

* **`family_name`**

  `string` — Last Name

* **`given_name`**

  `string` — First Name

* **`groups`**

  `array` — Groups

  **Items:**
  - **`display_name`**

    `string` — Display Name

  - **`group_detail`**

    `object` — Complete Group Details Payload

  - **`id`**

    `string` — Group ID

  - **`total_users`**

    `integer`, format: `int32` — Total Users in the Group

  - **`updated_at`**

    `string`, format: `date-time` — Updated At

* **`id`**

  `string` — User ID

* **`preferred_username`**

  `string` — Preferred Username

* **`updated_at`**

  `string`, format: `date-time` — Updated At

* **`user_detail`**

  `object` — Complete User Details Payload

**Example:**

```json
{
  "email": "johndoe",
  "emails": [""],
  "family_name": "Doe",
  "given_name": "John",
  "groups": [
    {
      "display_name": "Admins",
      "group_detail": {},
      "id": "dirgroup_121312434123312",
      "total_users": 10,
      "updated_at": "2024-10-01T00:00:00Z"
    }
  ],
  "id": "diruser_121312434123312",
  "preferred_username": "johndoe",
  "updated_at": "2024-10-01T00:00:00Z",
  "user_detail": {}
}
```

### directoriesGetDirectoryResponse

- **Type:**`object`

* **`directory`**

  `object` — Detailed information about the requested directory
  - **`attribute_mappings`**

    `object` — Mappings between directory attributes and Scalekit user and group attributes
    - **`attributes`**

      `array`

      **Items:**
      - **`key`**

        `string`

      - **`map_to`**

        `string`

  - **`directory_endpoint`**

    `string` — The endpoint URL generated by Scalekit for synchronizing users and groups from the Directory Provider

  - **`directory_provider`**

    `string`, possible values: `"OKTA", "GOOGLE", "MICROSOFT_AD", "AUTH0", "ONELOGIN", "JUMPCLOUD", "PING_IDENTITY"` — Identity provider connected to this directory

  - **`directory_type`**

    `string`, possible values: `"SCIM", "LDAP", "POLL"` — Type of the directory, indicating the protocol or standard used for synchronization

  - **`email`**

    `string` — Email Id associated with Directory whose access will be used for polling

  - **`enabled`**

    `boolean` — Indicates whether the directory is currently enabled and actively synchronizing users and groups

  - **`groups_tracked`**

    `string` — It indicates if all groups are tracked or select groups are tracked

  - **`id`**

    `string` — Unique identifier of the directory

  - **`last_synced_at`**

    `string`, format: `date-time` — Timestamp of the last successful synchronization of users and groups from the Directory Provider

  - **`name`**

    `string` — Name of the directory, typically representing the connected Directory provider

  - **`organization_id`**

    `string` — Unique identifier of the organization to which the directory belongs

  - **`role_assignments`**

    `object` — Role assignments associated with the directory, defining group based role assignments
    - **`assignments`**

      `array`

      **Items:**
      - **`group_id`**

        `string` — group ID for the role mapping

      - **`role_name`**

        `string`

  - **`secrets`**

    `array` — List of secrets used for authenticating and synchronizing with the Directory Provider

    **Items:**
    - **`create_time`**

      `string`, format: `date-time` — Creation Time

    - **`directory_id`**

      `string` — Directory ID

    - **`expire_time`**

      `string`, format: `date-time` — Expiry Time

    - **`id`**

      `string`

    - **`last_used_time`**

      `string`, format: `date-time` — Last Used Time

    - **`secret_suffix`**

      `string` — Secret Suffix

    - **`status`**

      `string`, possible values: `"INACTIVE"` — Secret Status

  - **`stats`**

    `object` — Statistics and metrics related to the directory, such as synchronization status and error counts
    - **`group_updated_at`**

      `string`, format: `date-time` — Max time of Group Updated At for Directory

    - **`total_groups`**

      `integer`, format: `int32` — Total Groups in the Directory

    - **`total_users`**

      `integer`, format: `int32` — Total Users in the Directory

    - **`user_updated_at`**

      `string`, format: `date-time` — Max time of User Updated At for Directory

  - **`status`**

    `string` — Directory Status

  - **`total_groups`**

    `integer`, format: `int32` — Total number of groups in the directory

  - **`total_users`**

    `integer`, format: `int32` — Total number of users in the directory

**Example:**

```json
{
  "directory": {
    "attribute_mappings": null,
    "directory_endpoint": "https://yourapp.scalekit.com/api/v1/directoies/dir_123212312/scim/v2",
    "directory_provider": "OKTA",
    "directory_type": "SCIM",
    "email": "john.doe@scalekit.cloud",
    "enabled": true,
    "groups_tracked": "ALL",
    "id": "dir_121312434123312",
    "last_synced_at": "2024-10-01T00:00:00Z",
    "name": "Azure AD",
    "organization_id": "org_121312434123312",
    "role_assignments": null,
    "secrets": [{}],
    "stats": null,
    "status": "IN_PROGRESS",
    "total_groups": 10,
    "total_users": 10
  }
}
```

### directoriesListDirectoriesResponse

- **Type:**`object`

* **`directories`**

  `array` — List of directories associated with the organization

  **Items:**
  - **`attribute_mappings`**

    `object` — Mappings between directory attributes and Scalekit user and group attributes
    - **`attributes`**

      `array`

      **Items:**
      - **`key`**

        `string`

      - **`map_to`**

        `string`

  - **`directory_endpoint`**

    `string` — The endpoint URL generated by Scalekit for synchronizing users and groups from the Directory Provider

  - **`directory_provider`**

    `string`, possible values: `"OKTA", "GOOGLE", "MICROSOFT_AD", "AUTH0", "ONELOGIN", "JUMPCLOUD", "PING_IDENTITY"` — Identity provider connected to this directory

  - **`directory_type`**

    `string`, possible values: `"SCIM", "LDAP", "POLL"` — Type of the directory, indicating the protocol or standard used for synchronization

  - **`email`**

    `string` — Email Id associated with Directory whose access will be used for polling

  - **`enabled`**

    `boolean` — Indicates whether the directory is currently enabled and actively synchronizing users and groups

  - **`groups_tracked`**

    `string` — It indicates if all groups are tracked or select groups are tracked

  - **`id`**

    `string` — Unique identifier of the directory

  - **`last_synced_at`**

    `string`, format: `date-time` — Timestamp of the last successful synchronization of users and groups from the Directory Provider

  - **`name`**

    `string` — Name of the directory, typically representing the connected Directory provider

  - **`organization_id`**

    `string` — Unique identifier of the organization to which the directory belongs

  - **`role_assignments`**

    `object` — Role assignments associated with the directory, defining group based role assignments
    - **`assignments`**

      `array`

      **Items:**
      - **`group_id`**

        `string` — group ID for the role mapping

      - **`role_name`**

        `string`

  - **`secrets`**

    `array` — List of secrets used for authenticating and synchronizing with the Directory Provider

    **Items:**
    - **`create_time`**

      `string`, format: `date-time` — Creation Time

    - **`directory_id`**

      `string` — Directory ID

    - **`expire_time`**

      `string`, format: `date-time` — Expiry Time

    - **`id`**

      `string`

    - **`last_used_time`**

      `string`, format: `date-time` — Last Used Time

    - **`secret_suffix`**

      `string` — Secret Suffix

    - **`status`**

      `string`, possible values: `"INACTIVE"` — Secret Status

  - **`stats`**

    `object` — Statistics and metrics related to the directory, such as synchronization status and error counts
    - **`group_updated_at`**

      `string`, format: `date-time` — Max time of Group Updated At for Directory

    - **`total_groups`**

      `integer`, format: `int32` — Total Groups in the Directory

    - **`total_users`**

      `integer`, format: `int32` — Total Users in the Directory

    - **`user_updated_at`**

      `string`, format: `date-time` — Max time of User Updated At for Directory

  - **`status`**

    `string` — Directory Status

  - **`total_groups`**

    `integer`, format: `int32` — Total number of groups in the directory

  - **`total_users`**

    `integer`, format: `int32` — Total number of users in the directory

**Example:**

```json
{
  "directories": [
    {
      "attribute_mappings": null,
      "directory_endpoint": "https://yourapp.scalekit.com/api/v1/directoies/dir_123212312/scim/v2",
      "directory_provider": "OKTA",
      "directory_type": "SCIM",
      "email": "john.doe@scalekit.cloud",
      "enabled": true,
      "groups_tracked": "ALL",
      "id": "dir_121312434123312",
      "last_synced_at": "2024-10-01T00:00:00Z",
      "name": "Azure AD",
      "organization_id": "org_121312434123312",
      "role_assignments": null,
      "secrets": [{}],
      "stats": null,
      "status": "IN_PROGRESS",
      "total_groups": 10,
      "total_users": 10
    }
  ]
}
```

### directoriesListDirectoryGroupsResponse

- **Type:**`object`

* **`groups`**

  `array` — List of directory groups retrieved from the specified directory

  **Items:**
  - **`display_name`**

    `string` — Display Name

  - **`group_detail`**

    `object` — Complete Group Details Payload

  - **`id`**

    `string` — Group ID

  - **`total_users`**

    `integer`, format: `int32` — Total Users in the Group

  - **`updated_at`**

    `string`, format: `date-time` — Updated At

* **`next_page_token`**

  `string` — Token to retrieve the next page of results. Use this token in the 'page_token' field of the next request

* **`prev_page_token`**

  `string` — Token to retrieve the previous page of results. Use this token in the 'page_token' field of the next request

* **`total_size`**

  `integer`, format: `int64` — Total number of groups matching the request criteria, regardless of pagination

**Example:**

```json
{
  "groups": [
    {
      "display_name": "Admins",
      "group_detail": {},
      "id": "dirgroup_121312434123312",
      "total_users": 10,
      "updated_at": "2024-10-01T00:00:00Z"
    }
  ],
  "next_page_token": "",
  "prev_page_token": "",
  "total_size": 1
}
```

### directoriesListDirectoryUsersResponse

- **Type:**`object`

* **`next_page_token`**

  `string` — Token for pagination. Use this token in the 'page_token' field of the next request to fetch the subsequent page of users

* **`prev_page_token`**

  `string` — Token for pagination. Use this token in the 'page_token' field of the next request to fetch the prior page of users

* **`total_size`**

  `integer`, format: `int64` — Total number of users available in the directory that match the request criteria

* **`users`**

  `array` — List of directory users retrieved from the specified directory

  **Items:**
  - **`email`**

    `string` — Email

  - **`emails`**

    `array` — Emails

    **Items:**

    `string`

  - **`family_name`**

    `string` — Last Name

  - **`given_name`**

    `string` — First Name

  - **`groups`**

    `array` — Groups

    **Items:**
    - **`display_name`**

      `string` — Display Name

    - **`group_detail`**

      `object` — Complete Group Details Payload

    - **`id`**

      `string` — Group ID

    - **`total_users`**

      `integer`, format: `int32` — Total Users in the Group

    - **`updated_at`**

      `string`, format: `date-time` — Updated At

  - **`id`**

    `string` — User ID

  - **`preferred_username`**

    `string` — Preferred Username

  - **`updated_at`**

    `string`, format: `date-time` — Updated At

  - **`user_detail`**

    `object` — Complete User Details Payload

**Example:**

```json
{
  "next_page_token": "",
  "prev_page_token": "",
  "total_size": 1,
  "users": [
    {
      "email": "johndoe",
      "emails": [""],
      "family_name": "Doe",
      "given_name": "John",
      "groups": [{}],
      "id": "diruser_121312434123312",
      "preferred_username": "johndoe",
      "updated_at": "2024-10-01T00:00:00Z",
      "user_detail": {}
    }
  ]
}
```

### directoriesRoleAssignment

- **Type:**`object`

* **`group_id`**

  `string` — group ID for the role mapping

* **`role_name`**

  `string`

**Example:**

```json
{
  "group_id": "dirgroup_121312434123",
  "role_name": ""
}
```

### directoriesRoleAssignments

- **Type:**`object`

* **`assignments`**

  `array`

  **Items:**
  - **`group_id`**

    `string` — group ID for the role mapping

  - **`role_name`**

    `string`

**Example:**

```json
{
  "assignments": [
    {
      "group_id": "dirgroup_121312434123",
      "role_name": ""
    }
  ]
}
```

### directoriesSecret

- **Type:**`object`

* **`create_time`**

  `string`, format: `date-time` — Creation Time

* **`directory_id`**

  `string` — Directory ID

* **`expire_time`**

  `string`, format: `date-time` — Expiry Time

* **`id`**

  `string`

* **`last_used_time`**

  `string`, format: `date-time` — Last Used Time

* **`secret_suffix`**

  `string` — Secret Suffix

* **`status`**

  `string`, possible values: `"INACTIVE"` — Secret Status

**Example:**

```json
{
  "create_time": "2024-10-01T00:00:00Z",
  "directory_id": "dir_12362474900684814",
  "expire_time": "2025-10-01T00:00:00Z",
  "id": "",
  "last_used_time": "2024-10-01T00:00:00Z",
  "secret_suffix": "Nzg5",
  "status": "INACTIVE"
}
```

### directoriesSecretStatus

- **Type:**`string`

**Example:**

### directoriesStats

- **Type:**`object`

* **`group_updated_at`**

  `string`, format: `date-time` — Max time of Group Updated At for Directory

* **`total_groups`**

  `integer`, format: `int32` — Total Groups in the Directory

* **`total_users`**

  `integer`, format: `int32` — Total Users in the Directory

* **`user_updated_at`**

  `string`, format: `date-time` — Max time of User Updated At for Directory

**Example:**

```json
{
  "group_updated_at": "2024-10-01T00:00:00Z",
  "total_groups": 10,
  "total_users": 10,
  "user_updated_at": "2024-10-01T00:00:00Z"
}
```

### directoriesToggleDirectoryResponse

- **Type:**`object`

* **`enabled`**

  `boolean` — Specifies the directory's state after the toggle operation. A value of \`true\` indicates that the directory is enabled and actively synchronizing users and groups. A value of \`false\` means the directory is disabled, halting synchronization

* **`error_message`**

  `string` — Contains a human-readable error message if the toggle operation encountered an issue. If the operation was successful, this field will be empty

**Example:**

```json
{
  "enabled": true,
  "error_message": "The directory is already enabled"
}
```

### domainsCreateDomainResponse

- **Type:**`object`

* **`domain`**

  `object` — The newly created domain object with all configuration details and system-generated identifiers.
  - **`create_time`**

    `string`, format: `date-time` — Timestamp when the domain was first created.

  - **`domain`**

    `string` — The business domain name that was configured for allowed email domain functionality (e.g., company.com, subdomain.company.com).

  - **`domain_type`**

    `object`

  - **`environment_id`**

    `string` — The environment ID where this domain is configured.

  - **`id`**

    `string` — Scalekit-generated unique identifier for this domain record.

  - **`organization_id`**

    `string` — The organization to which the domain belongs.

  - **`update_time`**

    `string`, format: `date-time` — Timestamp when the domain was last updated.

  - **`verification_method`**

    `string`, possible values: `"ADMIN", "DNS", "NOT_APPLICABLE"` — Method that determines how domain ownership is verified. - ADMIN: domain is marked verified without DNS validation, typically by an admin. - DNS: domain must be verified by adding a TXT record to your DNS configuration. - NOT_APPLICABLE: verification does not apply to this domain type.

  - **`verification_status`**

    `string`, possible values: `"PENDING", "VERIFIED", "FAILED", "AUTO_VERIFIED"` — Verification status of the domain. - PENDING: DNS TXT record has not been validated yet. - VERIFIED: domain confirmed via DNS TXT record validation or admin approval. - AUTO_VERIFIED: domain verified automatically without DNS changes. - FAILED: DNS TXT record was not validated within the verification window.

**Example:**

```json
{
  "domain": {
    "create_time": "2025-09-01T12:14:43.100000Z",
    "domain": "customerdomain.com",
    "domain_type": "ORGANIZATION_DOMAIN",
    "environment_id": "env_58345499215790610",
    "id": "dom_88351643129225005",
    "organization_id": "org_81667076086825451",
    "update_time": "2025-09-01T12:14:43.110455Z",
    "verification_method": "ADMIN",
    "verification_status": "AUTO_VERIFIED"
  }
}
```

### domainsDomain

- **Type:**`object`

* **`create_time`**

  `string`, format: `date-time` — Timestamp when the domain was first created.

* **`domain`**

  `string` — The business domain name that was configured for allowed email domain functionality (e.g., company.com, subdomain.company.com).

* **`domain_type`**

  `object`

* **`environment_id`**

  `string` — The environment ID where this domain is configured.

* **`id`**

  `string` — Scalekit-generated unique identifier for this domain record.

* **`organization_id`**

  `string` — The organization to which the domain belongs.

* **`update_time`**

  `string`, format: `date-time` — Timestamp when the domain was last updated.

* **`verification_method`**

  `string`, possible values: `"ADMIN", "DNS", "NOT_APPLICABLE"` — Method that determines how domain ownership is verified. - ADMIN: domain is marked verified without DNS validation, typically by an admin. - DNS: domain must be verified by adding a TXT record to your DNS configuration. - NOT_APPLICABLE: verification does not apply to this domain type.

* **`verification_status`**

  `string`, possible values: `"PENDING", "VERIFIED", "FAILED", "AUTO_VERIFIED"` — Verification status of the domain. - PENDING: DNS TXT record has not been validated yet. - VERIFIED: domain confirmed via DNS TXT record validation or admin approval. - AUTO_VERIFIED: domain verified automatically without DNS changes. - FAILED: DNS TXT record was not validated within the verification window.

**Example:**

```json
{
  "create_time": "2025-09-01T12:14:43.100000Z",
  "domain": "customerdomain.com",
  "domain_type": "ORGANIZATION_DOMAIN",
  "environment_id": "env_58345499215790610",
  "id": "dom_88351643129225005",
  "organization_id": "org_81667076086825451",
  "update_time": "2025-09-01T12:14:43.110455Z",
  "verification_method": "ADMIN",
  "verification_status": "AUTO_VERIFIED"
}
```

### domainsDomainType

- **Type:**`string`

**Example:**

### domainsGetDomainResponse

- **Type:**`object`

* **`domain`**

  `object` — The requested domain object with complete details including domain type, timestamps and configuration.
  - **`create_time`**

    `string`, format: `date-time` — Timestamp when the domain was first created.

  - **`domain`**

    `string` — The business domain name that was configured for allowed email domain functionality (e.g., company.com, subdomain.company.com).

  - **`domain_type`**

    `object`

  - **`environment_id`**

    `string` — The environment ID where this domain is configured.

  - **`id`**

    `string` — Scalekit-generated unique identifier for this domain record.

  - **`organization_id`**

    `string` — The organization to which the domain belongs.

  - **`update_time`**

    `string`, format: `date-time` — Timestamp when the domain was last updated.

  - **`verification_method`**

    `string`, possible values: `"ADMIN", "DNS", "NOT_APPLICABLE"` — Method that determines how domain ownership is verified. - ADMIN: domain is marked verified without DNS validation, typically by an admin. - DNS: domain must be verified by adding a TXT record to your DNS configuration. - NOT_APPLICABLE: verification does not apply to this domain type.

  - **`verification_status`**

    `string`, possible values: `"PENDING", "VERIFIED", "FAILED", "AUTO_VERIFIED"` — Verification status of the domain. - PENDING: DNS TXT record has not been validated yet. - VERIFIED: domain confirmed via DNS TXT record validation or admin approval. - AUTO_VERIFIED: domain verified automatically without DNS changes. - FAILED: DNS TXT record was not validated within the verification window.

**Example:**

```json
{
  "domain": {
    "create_time": "2025-09-01T12:14:43.100000Z",
    "domain": "customerdomain.com",
    "domain_type": "ORGANIZATION_DOMAIN",
    "environment_id": "env_58345499215790610",
    "id": "dom_88351643129225005",
    "organization_id": "org_81667076086825451",
    "update_time": "2025-09-01T12:14:43.110455Z",
    "verification_method": "ADMIN",
    "verification_status": "AUTO_VERIFIED"
  }
}
```

### domainsListDomainResponse

- **Type:**`object`

* **`domains`**

  `array` — Array of domain objects containing all domain details including verification status and configuration.

  **Items:**
  - **`create_time`**

    `string`, format: `date-time` — Timestamp when the domain was first created.

  - **`domain`**

    `string` — The business domain name that was configured for allowed email domain functionality (e.g., company.com, subdomain.company.com).

  - **`domain_type`**

    `object`

  - **`environment_id`**

    `string` — The environment ID where this domain is configured.

  - **`id`**

    `string` — Scalekit-generated unique identifier for this domain record.

  - **`organization_id`**

    `string` — The organization to which the domain belongs.

  - **`update_time`**

    `string`, format: `date-time` — Timestamp when the domain was last updated.

  - **`verification_method`**

    `string`, possible values: `"ADMIN", "DNS", "NOT_APPLICABLE"` — Method that determines how domain ownership is verified. - ADMIN: domain is marked verified without DNS validation, typically by an admin. - DNS: domain must be verified by adding a TXT record to your DNS configuration. - NOT_APPLICABLE: verification does not apply to this domain type.

  - **`verification_status`**

    `string`, possible values: `"PENDING", "VERIFIED", "FAILED", "AUTO_VERIFIED"` — Verification status of the domain. - PENDING: DNS TXT record has not been validated yet. - VERIFIED: domain confirmed via DNS TXT record validation or admin approval. - AUTO_VERIFIED: domain verified automatically without DNS changes. - FAILED: DNS TXT record was not validated within the verification window.

* **`page_number`**

  `integer`, format: `int32` — Current page number in the pagination sequence.

* **`page_size`**

  `integer`, format: `int32` — Number of domains returned in this page.

**Example:**

```json
{
  "domains": [
    {
      "create_time": "2025-09-01T12:14:43.100000Z",
      "domain": "customerdomain.com",
      "domain_type": "ORGANIZATION_DOMAIN",
      "environment_id": "env_58345499215790610",
      "id": "dom_88351643129225005",
      "organization_id": "org_81667076086825451",
      "update_time": "2025-09-01T12:14:43.110455Z",
      "verification_method": "ADMIN",
      "verification_status": "AUTO_VERIFIED"
    }
  ],
  "page_number": 1,
  "page_size": 1
}
```

### domainsVerificationMethod

- **Type:**`string`

**Example:**

### domainsVerificationStatus

- **Type:**`string`

**Example:**

### errdetailsDebugInfo

- **Type:**`object`

Describes additional debugging info.

- **`detail`**

  `string` — Additional debugging information provided by the server.

- **`stack_entries`**

  `array` — The stack trace entries indicating where the error occurred.

  **Items:**

  `string`

**Example:**

```json
{
  "detail": "",
  "stack_entries": [""]
}
```

### errdetailsErrorInfo

- **Type:**`object`

* **`debug_info`**

  `object` — Describes additional debugging info.
  - **`detail`**

    `string` — Additional debugging information provided by the server.

  - **`stack_entries`**

    `array` — The stack trace entries indicating where the error occurred.

    **Items:**

    `string`

* **`error_code`**

  `string`

* **`help_info`**

  `object` — HelpInfo provides documentation links attached to an error response. When present in ErrorInfo, clients should surface these links to help developers resolve the error. For example, a missing required field error may include a link to the relevant guide.
  - **`links`**

    `array` — One or more links relevant to resolving the error.

    **Items:**
    - **`description`**

      `string` — Human-readable label for the link (e.g. "User verification flow").

    - **`url`**

      `string` — Absolute URL to the documentation page (e.g. "https\://docs.scalekit.com/...").

* **`localized_message_info`**

  `object`
  - **`locale`**

    `string`

  - **`message`**

    `string`

* **`request_info`**

  `object` — Contains metadata about the request that clients can attach when filing a bug or providing other forms of feedback.
  - **`request_id`**

    `string` — An opaque string that should only be interpreted by the service generating it. For example, it can be used to identify requests in the service's logs.

  - **`serving_data`**

    `string` — Any data that was used to serve this request. For example, an encrypted stack trace that can be sent back to the service provider for debugging.

* **`resource_info`**

  `object` — Describes the resource that is being accessed.
  - **`description`**

    `string` — Describes what error is encountered when accessing this resource. For example, updating a cloud project may require the \`writer\` permission on the developer console project.

  - **`owner`**

    `string`

  - **`required_permissions`**

    `array` — The required permissions needed to access the resource.

    **Items:**

    `string`

  - **`resource_name`**

    `string`

  - **`user`**

    `string`

* **`tool_error_info`**

  `object`
  - **`execution_id`**

    `string`

  - **`tool_error_code`**

    `string`

  - **`tool_error_message`**

    `string`

* **`validation_error_info`**

  `object` — Describes violations in a client request. This error type focuses on the syntactic aspects of the request.
  - **`field_violations`**

    `array` — Describes all violations in a client request.

    **Items:**
    - **`constraint`**

      `string`

    - **`description`**

      `string` — A description of why the request element is bad.

    - **`field`**

      `string`

**Example:**

```json
{
  "debug_info": {
    "detail": "",
    "stack_entries": [""]
  },
  "error_code": "",
  "help_info": {
    "links": [{}]
  },
  "localized_message_info": {
    "locale": "",
    "message": ""
  },
  "request_info": {
    "request_id": "",
    "serving_data": ""
  },
  "resource_info": {
    "description": "",
    "owner": "",
    "required_permissions": [""],
    "resource_name": "",
    "user": ""
  },
  "tool_error_info": {
    "execution_id": "",
    "tool_error_code": "",
    "tool_error_message": ""
  },
  "validation_error_info": {
    "field_violations": [{}]
  }
}
```

### errdetailsHelpInfo

- **Type:**`object`

HelpInfo provides documentation links attached to an error response. When present in ErrorInfo, clients should surface these links to help developers resolve the error. For example, a missing required field error may include a link to the relevant guide.

- **`links`**

  `array` — One or more links relevant to resolving the error.

  **Items:**
  - **`description`**

    `string` — Human-readable label for the link (e.g. "User verification flow").

  - **`url`**

    `string` — Absolute URL to the documentation page (e.g. "https\://docs.scalekit.com/...").

**Example:**

```json
{
  "links": [
    {
      "description": "",
      "url": ""
    }
  ]
}
```

### errdetailsLocalizedMessageInfo

- **Type:**`object`

* **`locale`**

  `string`

* **`message`**

  `string`

**Example:**

```json
{
  "locale": "",
  "message": ""
}
```

### errdetailsRequestInfo

- **Type:**`object`

Contains metadata about the request that clients can attach when filing a bug or providing other forms of feedback.

- **`request_id`**

  `string` — An opaque string that should only be interpreted by the service generating it. For example, it can be used to identify requests in the service's logs.

- **`serving_data`**

  `string` — Any data that was used to serve this request. For example, an encrypted stack trace that can be sent back to the service provider for debugging.

**Example:**

```json
{
  "request_id": "",
  "serving_data": ""
}
```

### errdetailsResourceInfo

- **Type:**`object`

Describes the resource that is being accessed.

- **`description`**

  `string` — Describes what error is encountered when accessing this resource. For example, updating a cloud project may require the \`writer\` permission on the developer console project.

- **`owner`**

  `string`

- **`required_permissions`**

  `array` — The required permissions needed to access the resource.

  **Items:**

  `string`

- **`resource_name`**

  `string`

- **`user`**

  `string`

**Example:**

```json
{
  "description": "",
  "owner": "",
  "required_permissions": [""],
  "resource_name": "",
  "user": ""
}
```

### errdetailsToolErrorInfo

- **Type:**`object`

* **`execution_id`**

  `string`

* **`tool_error_code`**

  `string`

* **`tool_error_message`**

  `string`

**Example:**

```json
{
  "execution_id": "",
  "tool_error_code": "",
  "tool_error_message": ""
}
```

### errdetailsValidationErrorInfo

- **Type:**`object`

Describes violations in a client request. This error type focuses on the syntactic aspects of the request.

- **`field_violations`**

  `array` — Describes all violations in a client request.

  **Items:**
  - **`constraint`**

    `string`

  - **`description`**

    `string` — A description of why the request element is bad.

  - **`field`**

    `string`

**Example:**

```json
{
  "field_violations": [
    {
      "constraint": "",
      "description": "",
      "field": ""
    }
  ]
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
    "connection_tool_mappings": [{}],
    "description": "Summarizes daily emails and posts to Slack",
    "id": "cfg_85630864460904897",
    "name": "daily-summarizer"
  }
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

### mcpDeleteMcpConfigResponse

- **Type:**`object`

**Example:**

```json
{}
```

### mcpDeleteMcpInstanceResponse

- **Type:**`object`

**Example:**

```json
{}
```

### mcpDeleteMcpResponse

- **Type:**`object`

**Example:**

```json
{}
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
    "connection_tool_mappings": [{}],
    "description": "Summarizes daily emails and posts to Slack",
    "id": "cfg_85630864460904897",
    "name": "daily-summarizer"
  }
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

### mcpListMcpConfigsRequestFilter

- **Type:**`object`

* **`id`**

  `string` — Filter by MCP configuration id

* **`name`**

  `string` — Case-insensitive prefix search on configuration name (minimum 3 characters)

* **`provider`**

  `string` — Filter configs that include this provider

**Example:**

```json
{
  "id": "",
  "name": "",
  "provider": ""
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
      "connection_tool_mappings": [{}],
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

### mcpListMcpInstancesRequestFilter

- **Type:**`object`

* **`config_name`**

  `string` — Filter by MCP configuration name

* **`id`**

  `string` — Filter by MCP instance id

* **`name`**

  `string` — Filter by exact instance name

* **`user_identifier`**

  `string` — Filter by user identifier

**Example:**

```json
{
  "config_name": "",
  "id": "",
  "name": "",
  "user_identifier": ""
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

### mcpListMcpRequestFilter

- **Type:**`object`

* **`connected_account_identifier`**

  `string` — Filter by connected account identifier

* **`link_token`**

  `string` — Filter by link token

**Example:**

```json
{
  "connected_account_identifier": "",
  "link_token": ""
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
      "tools": [""]
    }
  ],
  "description": "Summarizes daily emails and posts to Slack",
  "id": "cfg_85630864460904897",
  "name": "daily-summarizer"
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
  "tools": [""]
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
    "connection_tool_mappings": [{}],
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
  "tool_names": ["GMAIL_FETCH_MAILS", "LIST_DRAFTS"]
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
    "connection_tool_mappings": [{}],
    "description": "Summarizes daily emails and posts to Slack",
    "id": "cfg_85630864460904897",
    "name": "daily-summarizer"
  }
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

### organizationsCreateOrganizationResponse

- **Type:**`object`

* **`organization`**

  `object` — The newly created organization containing its ID, settings, and metadata
  - **`create_time` (required)**

    `string`, format: `date-time` — Timestamp when the organization was created

  - **`display_name`**

    `string` — Name of the organization. Must be between 1 and 200 characters

  - **`external_id`**

    `string` — Your application's unique identifier for this organization, used to link Scalekit with your system.

  - **`id`**

    `string` — Unique scalekit-generated identifier that uniquely references an organization

  - **`logo_url`**

    `string`, format: `uri` — HTTPS URL of the organization's logo image. Maximum 1024 characters. Must use the https scheme.

  - **`metadata`**

    `object` — Key value pairs extension attributes.

  - **`region_code`**

    `string`, possible values: `"US", "EU"` — Geographic region code for the organization. Currently limited to US.

  - **`settings`**

    `object` — Configuration options that control organization-level features and capabilities
    - **`features`**

      `array` — List of feature toggles that control organization capabilities such as SSO authentication and directory synchronization

      **Items:**
      - **`enabled` (required)**

        `boolean` — Whether the feature is enabled (true) or disabled (false) for this organization

      - **`name` (required)**

        `string` — Feature identifier. Supported values include: "sso" (Single Sign-On), "directory_sync" (Directory Synchronization), "domain_verification" (Domain Verification), "session_policy" (Organization-level session policy override)

  - **`slug`**

    `string` — Slug for dynamic redirect URI resolution. A single DNS label (e.g. acme) or hostname (e.g. oauth.pstmn.io). Lowercase alphanumeric, hyphens, and dots. Max 253 chars. Unique per environment.

  - **`update_time`**

    `string`, format: `date-time` — Timestamp when the organization was last updated

**Example:**

```json
{
  "organization": {
    "create_time": "2025-02-15T06:23:44.560000Z",
    "display_name": "Megasoft",
    "external_id": "my_unique_id",
    "id": "org_59615193906282635",
    "logo_url": "https://cdn.example.com/acme-logo.png",
    "metadata": {
      "additionalProperty": ""
    },
    "region_code": "US",
    "settings": null,
    "slug": "acme",
    "update_time": "2025-02-15T06:23:44.560000Z"
  }
}
```

### Feature represents the available features that can be enabled for an organization's portal link

- **Type:**`string`

* dir_sync: Enables directory synchronization configuration in the portal
* sso: Enables Single Sign-On (SSO) configuration in the portal

**Example:**

### organizationsGeneratePortalLinkResponse

- **Type:**`object`

* **`link`**

  `object` — Contains the generated admin portal link details. The link URL can be shared with organization administrators to set up: Single Sign-On (SSO) authentication and directory synchronization
  - **`expire_time`**

    `string`, format: `date-time` — Expiry time of the link. The link is valid for 1 minute.

  - **`id`**

    `string` — Unique Identifier for the link

  - **`location`**

    `string` — Location of the link. This is the URL that can be used to access the Admin portal. The link is valid for 1 minute

**Example:**

```json
{
  "link": {
    "expire_time": "2024-02-06T14:48:00Z",
    "id": "lnk_123123123123123",
    "location": "https://scalekit.com/portal/lnk_123123123123123"
  }
}
```

### organizationsGetOrganizationResponse

- **Type:**`object`

* **`organization`**

  `object` — The newly created organization
  - **`create_time` (required)**

    `string`, format: `date-time` — Timestamp when the organization was created

  - **`display_name`**

    `string` — Name of the organization. Must be between 1 and 200 characters

  - **`external_id`**

    `string` — Your application's unique identifier for this organization, used to link Scalekit with your system.

  - **`id`**

    `string` — Unique scalekit-generated identifier that uniquely references an organization

  - **`logo_url`**

    `string`, format: `uri` — HTTPS URL of the organization's logo image. Maximum 1024 characters. Must use the https scheme.

  - **`metadata`**

    `object` — Key value pairs extension attributes.

  - **`region_code`**

    `string`, possible values: `"US", "EU"` — Geographic region code for the organization. Currently limited to US.

  - **`settings`**

    `object` — Configuration options that control organization-level features and capabilities
    - **`features`**

      `array` — List of feature toggles that control organization capabilities such as SSO authentication and directory synchronization

      **Items:**
      - **`enabled` (required)**

        `boolean` — Whether the feature is enabled (true) or disabled (false) for this organization

      - **`name` (required)**

        `string` — Feature identifier. Supported values include: "sso" (Single Sign-On), "directory_sync" (Directory Synchronization), "domain_verification" (Domain Verification), "session_policy" (Organization-level session policy override)

  - **`slug`**

    `string` — Slug for dynamic redirect URI resolution. A single DNS label (e.g. acme) or hostname (e.g. oauth.pstmn.io). Lowercase alphanumeric, hyphens, and dots. Max 253 chars. Unique per environment.

  - **`update_time`**

    `string`, format: `date-time` — Timestamp when the organization was last updated

**Example:**

```json
{
  "organization": {
    "create_time": "2025-02-15T06:23:44.560000Z",
    "display_name": "Megasoft",
    "external_id": "my_unique_id",
    "id": "org_59615193906282635",
    "logo_url": "https://cdn.example.com/acme-logo.png",
    "metadata": {
      "additionalProperty": ""
    },
    "region_code": "US",
    "settings": null,
    "slug": "acme",
    "update_time": "2025-02-15T06:23:44.560000Z"
  }
}
```

### organizationsGetOrganizationSessionPolicyResponse

- **Type:**`object`

* **`policy`**

  `object` — The session policy for the organization.
  - **`absolute_session_timeout`**

    `integer`, format: `int32` — The absolute session timeout value. The unit is specified by absolute_session_timeout_unit. Omitted when policy_source is 'environment'.

  - **`absolute_session_timeout_unit`**

    `string`, possible values: `"MINUTES", "HOURS", "DAYS"` — Unit for absolute_session_timeout. Accepted values: 'minutes', 'hours', 'days'. Responses always return 'minutes'.

  - **`idle_session_timeout`**

    `integer`, format: `int32` — The idle session timeout value. The unit is specified by idle_session_timeout_unit. Omitted when idle_session_timeout_enabled is false or policy_source is 'environment'.

  - **`idle_session_timeout_enabled`**

    `boolean` — Whether idle session timeout is enabled for this organization. Omitted when policy_source is 'environment'.

  - **`idle_session_timeout_unit`**

    `string`, possible values: `"MINUTES", "HOURS", "DAYS"` — Unit for idle_session_timeout. Accepted values: 'minutes', 'hours', 'days'. Responses always return 'minutes'.

  - **`policy_source`**

    `string`, possible values: `"APPLICATION", "CUSTOM"` — Policy source. 'APPLICATION' means the organization inherits the application-level session policy. 'CUSTOM' means organization-specific timeout values are active.

**Example:**

```json
{
  "policy": {
    "absolute_session_timeout": 360,
    "absolute_session_timeout_unit": "minutes",
    "idle_session_timeout": 84,
    "idle_session_timeout_enabled": true,
    "idle_session_timeout_unit": "minutes",
    "policy_source": "CUSTOM"
  }
}
```

### organizationsLink

- **Type:**`object`

* **`expire_time`**

  `string`, format: `date-time` — Expiry time of the link. The link is valid for 1 minute.

* **`id`**

  `string` — Unique Identifier for the link

* **`location`**

  `string` — Location of the link. This is the URL that can be used to access the Admin portal. The link is valid for 1 minute

**Example:**

```json
{
  "expire_time": "2024-02-06T14:48:00Z",
  "id": "lnk_123123123123123",
  "location": "https://scalekit.com/portal/lnk_123123123123123"
}
```

### organizationsListOrganizationsResponse

- **Type:**`object`

* **`next_page_token`**

  `string` — Pagination token for the next page of results. Use this token to fetch the next page.

* **`organizations`**

  `array` — List of organization objects

  **Items:**
  - **`create_time` (required)**

    `string`, format: `date-time` — Timestamp when the organization was created

  - **`display_name`**

    `string` — Name of the organization. Must be between 1 and 200 characters

  - **`external_id`**

    `string` — Your application's unique identifier for this organization, used to link Scalekit with your system.

  - **`id`**

    `string` — Unique scalekit-generated identifier that uniquely references an organization

  - **`logo_url`**

    `string`, format: `uri` — HTTPS URL of the organization's logo image. Maximum 1024 characters. Must use the https scheme.

  - **`metadata`**

    `object` — Key value pairs extension attributes.

  - **`region_code`**

    `string`, possible values: `"US", "EU"` — Geographic region code for the organization. Currently limited to US.

  - **`settings`**

    `object` — Configuration options that control organization-level features and capabilities
    - **`features`**

      `array` — List of feature toggles that control organization capabilities such as SSO authentication and directory synchronization

      **Items:**
      - **`enabled` (required)**

        `boolean` — Whether the feature is enabled (true) or disabled (false) for this organization

      - **`name` (required)**

        `string` — Feature identifier. Supported values include: "sso" (Single Sign-On), "directory_sync" (Directory Synchronization), "domain_verification" (Domain Verification), "session_policy" (Organization-level session policy override)

  - **`slug`**

    `string` — Slug for dynamic redirect URI resolution. A single DNS label (e.g. acme) or hostname (e.g. oauth.pstmn.io). Lowercase alphanumeric, hyphens, and dots. Max 253 chars. Unique per environment.

  - **`update_time`**

    `string`, format: `date-time` — Timestamp when the organization was last updated

* **`prev_page_token`**

  `string` — Pagination token for the previous page of results. Use this token to fetch the previous page.

* **`total_size`**

  `integer`, format: `int64` — Total number of organizations in the environment.

**Example:**

```json
{
  "next_page_token": "<next_page_token>",
  "organizations": [
    {
      "create_time": "2025-02-15T06:23:44.560000Z",
      "display_name": "Megasoft",
      "external_id": "my_unique_id",
      "id": "org_59615193906282635",
      "logo_url": "https://cdn.example.com/acme-logo.png",
      "metadata": {
        "additionalProperty": ""
      },
      "region_code": "US",
      "settings": null,
      "slug": "acme",
      "update_time": "2025-02-15T06:23:44.560000Z"
    }
  ],
  "prev_page_token": "<prev_page_token>",
  "total_size": 30
}
```

### organizationsOrganization

- **Type:**`object`

* **`create_time` (required)**

  `string`, format: `date-time` — Timestamp when the organization was created

* **`display_name`**

  `string` — Name of the organization. Must be between 1 and 200 characters

* **`external_id`**

  `string` — Your application's unique identifier for this organization, used to link Scalekit with your system.

* **`id`**

  `string` — Unique scalekit-generated identifier that uniquely references an organization

* **`logo_url`**

  `string`, format: `uri` — HTTPS URL of the organization's logo image. Maximum 1024 characters. Must use the https scheme.

* **`metadata`**

  `object` — Key value pairs extension attributes.

* **`region_code`**

  `string`, possible values: `"US", "EU"` — Geographic region code for the organization. Currently limited to US.

* **`settings`**

  `object` — Configuration options that control organization-level features and capabilities
  - **`features`**

    `array` — List of feature toggles that control organization capabilities such as SSO authentication and directory synchronization

    **Items:**
    - **`enabled` (required)**

      `boolean` — Whether the feature is enabled (true) or disabled (false) for this organization

    - **`name` (required)**

      `string` — Feature identifier. Supported values include: "sso" (Single Sign-On), "directory_sync" (Directory Synchronization), "domain_verification" (Domain Verification), "session_policy" (Organization-level session policy override)

* **`slug`**

  `string` — Slug for dynamic redirect URI resolution. A single DNS label (e.g. acme) or hostname (e.g. oauth.pstmn.io). Lowercase alphanumeric, hyphens, and dots. Max 253 chars. Unique per environment.

* **`update_time`**

  `string`, format: `date-time` — Timestamp when the organization was last updated

**Example:**

```json
{
  "create_time": "2025-02-15T06:23:44.560000Z",
  "display_name": "Megasoft",
  "external_id": "my_unique_id",
  "id": "org_59615193906282635",
  "logo_url": "https://cdn.example.com/acme-logo.png",
  "metadata": {
    "additionalProperty": ""
  },
  "region_code": "US",
  "settings": {
    "features": [
      {
        "enabled": true,
        "name": "sso"
      },
      {
        "enabled": false,
        "name": "directory_sync"
      }
    ]
  },
  "slug": "acme",
  "update_time": "2025-02-15T06:23:44.560000Z"
}
```

### organizationsOrganizationSessionPolicySettings

- **Type:**`object`

* **`absolute_session_timeout`**

  `integer`, format: `int32` — The absolute session timeout value. The unit is specified by absolute_session_timeout_unit. Omitted when policy_source is 'environment'.

* **`absolute_session_timeout_unit`**

  `string`, possible values: `"MINUTES", "HOURS", "DAYS"` — Unit for absolute_session_timeout. Accepted values: 'minutes', 'hours', 'days'. Responses always return 'minutes'.

* **`idle_session_timeout`**

  `integer`, format: `int32` — The idle session timeout value. The unit is specified by idle_session_timeout_unit. Omitted when idle_session_timeout_enabled is false or policy_source is 'environment'.

* **`idle_session_timeout_enabled`**

  `boolean` — Whether idle session timeout is enabled for this organization. Omitted when policy_source is 'environment'.

* **`idle_session_timeout_unit`**

  `string`, possible values: `"MINUTES", "HOURS", "DAYS"` — Unit for idle_session_timeout. Accepted values: 'minutes', 'hours', 'days'. Responses always return 'minutes'.

* **`policy_source`**

  `string`, possible values: `"APPLICATION", "CUSTOM"` — Policy source. 'APPLICATION' means the organization inherits the application-level session policy. 'CUSTOM' means organization-specific timeout values are active.

**Example:**

```json
{
  "absolute_session_timeout": 360,
  "absolute_session_timeout_unit": "minutes",
  "idle_session_timeout": 84,
  "idle_session_timeout_enabled": true,
  "idle_session_timeout_unit": "minutes",
  "policy_source": "CUSTOM"
}
```

### Organization Settings

- **Type:**`object`

Configuration options that control organization-level features and capabilities

- **`features`**

  `array` — List of feature toggles that control organization capabilities such as SSO authentication and directory synchronization

  **Items:**
  - **`enabled` (required)**

    `boolean` — Whether the feature is enabled (true) or disabled (false) for this organization

  - **`name` (required)**

    `string` — Feature identifier. Supported values include: "sso" (Single Sign-On), "directory_sync" (Directory Synchronization), "domain_verification" (Domain Verification), "session_policy" (Organization-level session policy override)

**Example:**

```json
{
  "features": [
    {
      "enabled": true,
      "name": "sso"
    },
    {
      "enabled": false,
      "name": "directory_sync"
    }
  ]
}
```

### Organization Feature Toggle

- **Type:**`object`

Controls the activation state of a specific organization feature

- **`enabled` (required)**

  `boolean` — Whether the feature is enabled (true) or disabled (false) for this organization

- **`name` (required)**

  `string` — Feature identifier. Supported values include: "sso" (Single Sign-On), "directory_sync" (Directory Synchronization), "domain_verification" (Domain Verification), "session_policy" (Organization-level session policy override)

**Example:**

```json
{
  "enabled": true,
  "name": "sso"
}
```

### organizationsOrganizationUserManagementSettings

- **Type:**`object`

* **`max_allowed_users`**

  `integer`, format: `int32` — Maximum number of users allowed in the organization. When nil (not set), there feature is not enabled. When explicitly set to zero, it also means no limit. When set to a positive integer, it enforces the maximum user limit.

**Example:**

```json
{
  "max_allowed_users": 100
}
```

### organizationsSessionPolicyType

- **Type:**`string`

**Example:**

### organizationsUpdateOrganizationResponse

- **Type:**`object`

* **`organization`**

  `object` — Updated organization details
  - **`create_time` (required)**

    `string`, format: `date-time` — Timestamp when the organization was created

  - **`display_name`**

    `string` — Name of the organization. Must be between 1 and 200 characters

  - **`external_id`**

    `string` — Your application's unique identifier for this organization, used to link Scalekit with your system.

  - **`id`**

    `string` — Unique scalekit-generated identifier that uniquely references an organization

  - **`logo_url`**

    `string`, format: `uri` — HTTPS URL of the organization's logo image. Maximum 1024 characters. Must use the https scheme.

  - **`metadata`**

    `object` — Key value pairs extension attributes.

  - **`region_code`**

    `string`, possible values: `"US", "EU"` — Geographic region code for the organization. Currently limited to US.

  - **`settings`**

    `object` — Configuration options that control organization-level features and capabilities
    - **`features`**

      `array` — List of feature toggles that control organization capabilities such as SSO authentication and directory synchronization

      **Items:**
      - **`enabled` (required)**

        `boolean` — Whether the feature is enabled (true) or disabled (false) for this organization

      - **`name` (required)**

        `string` — Feature identifier. Supported values include: "sso" (Single Sign-On), "directory_sync" (Directory Synchronization), "domain_verification" (Domain Verification), "session_policy" (Organization-level session policy override)

  - **`slug`**

    `string` — Slug for dynamic redirect URI resolution. A single DNS label (e.g. acme) or hostname (e.g. oauth.pstmn.io). Lowercase alphanumeric, hyphens, and dots. Max 253 chars. Unique per environment.

  - **`update_time`**

    `string`, format: `date-time` — Timestamp when the organization was last updated

**Example:**

```json
{
  "organization": {
    "create_time": "2025-02-15T06:23:44.560000Z",
    "display_name": "Megasoft",
    "external_id": "my_unique_id",
    "id": "org_59615193906282635",
    "logo_url": "https://cdn.example.com/acme-logo.png",
    "metadata": {
      "additionalProperty": ""
    },
    "region_code": "US",
    "settings": null,
    "slug": "acme",
    "update_time": "2025-02-15T06:23:44.560000Z"
  }
}
```

### organizationsUpdateOrganizationSessionPolicyResponse

- **Type:**`object`

* **`policy`**

  `object` — The updated session policy for the organization.
  - **`absolute_session_timeout`**

    `integer`, format: `int32` — The absolute session timeout value. The unit is specified by absolute_session_timeout_unit. Omitted when policy_source is 'environment'.

  - **`absolute_session_timeout_unit`**

    `string`, possible values: `"MINUTES", "HOURS", "DAYS"` — Unit for absolute_session_timeout. Accepted values: 'minutes', 'hours', 'days'. Responses always return 'minutes'.

  - **`idle_session_timeout`**

    `integer`, format: `int32` — The idle session timeout value. The unit is specified by idle_session_timeout_unit. Omitted when idle_session_timeout_enabled is false or policy_source is 'environment'.

  - **`idle_session_timeout_enabled`**

    `boolean` — Whether idle session timeout is enabled for this organization. Omitted when policy_source is 'environment'.

  - **`idle_session_timeout_unit`**

    `string`, possible values: `"MINUTES", "HOURS", "DAYS"` — Unit for idle_session_timeout. Accepted values: 'minutes', 'hours', 'days'. Responses always return 'minutes'.

  - **`policy_source`**

    `string`, possible values: `"APPLICATION", "CUSTOM"` — Policy source. 'APPLICATION' means the organization inherits the application-level session policy. 'CUSTOM' means organization-specific timeout values are active.

**Example:**

```json
{
  "policy": {
    "absolute_session_timeout": 360,
    "absolute_session_timeout_unit": "minutes",
    "idle_session_timeout": 84,
    "idle_session_timeout_enabled": true,
    "idle_session_timeout_unit": "minutes",
    "policy_source": "CUSTOM"
  }
}
```

### organizationsUpsertUserManagementSettingsResponse

- **Type:**`object`

* **`settings`**

  `object` — The updated setting.
  - **`max_allowed_users`**

    `integer`, format: `int32` — Maximum number of users allowed in the organization. When nil (not set), there feature is not enabled. When explicitly set to zero, it also means no limit. When set to a positive integer, it enforces the maximum user limit.

**Example:**

```json
{
  "settings": {
    "max_allowed_users": 100
  }
}
```

### passwordlessResendPasswordlessRequest

- **Type:**`object`

* **`auth_request_id`**

  `string` — The authentication request identifier from the original send passwordless email request. Use this to resend the Verification Code (OTP) or Magic Link to the same email address.

**Example:**

```json
{
  "auth_request_id": "h5Y8kT5RVwaea5WEgW4n-6C-aO_-fuTUW7Vb9-Rh3AcY9qxZqQ"
}
```

### passwordlessSendPasswordlessRequest

- **Type:**`object`

* **`email`**

  `string` — Email address where the passwordless authentication credentials will be sent. Must be a valid email format.

* **`expires_in`**

  `integer`, format: `int64` — Time in seconds until the passwordless authentication expires. If not specified, defaults to 300 seconds (5 minutes)

* **`magiclink_auth_uri`**

  `string` — Your application's callback URL where users will be redirected after clicking the magic link in their email. The link token will be appended as a query parameter as link_token

* **`state`**

  `string` — Custom state parameter that will be returned unchanged in the verification response. Use this to maintain application state between the authentication request and callback, such as the intended destination after login

* **`template`**

  `string`, possible values: `"SIGNIN", "SIGNUP"` — Specifies the authentication intent for the passwordless request. Use SIGNIN for existing users or SIGNUP for new user registration. This affects the email template and user experience flow.

* **`template_variables`**

  `object` — A set of key-value pairs to personalize the email template. \* You may include up to 30 key-value pairs. \* The following variable names are reserved by the system and cannot be supplied: \`otp\`, \`expiry_time_relative\`, \`link\`, \`expire_time\`, \`expiry_time\`. \* Every variable referenced in your email template must be included as a key-value pair. Use these variables to insert custom information, such as a team name, URL or the user's employee ID. All variables are interpolated before the email is sent, regardless of the email provider.

**Example:**

```json
{
  "email": "john.doe@example.com",
  "expires_in": 300,
  "magiclink_auth_uri": "https://yourapp.com/auth/passwordless/callback",
  "state": "d62ivasry29lso",
  "template": "SIGNIN",
  "template_variables": {
    "custom_variable_key": "custom_variable_value"
  }
}
```

### passwordlessSendPasswordlessResponse

- **Type:**`object`

* **`auth_request_id`**

  `string` — Unique identifier for this passwordless authentication request. Use this ID to resend emails.

* **`expires_at`**

  `string`, format: `int64` — Unix timestamp (seconds since epoch) when the passwordless authentication will expire. After this time, the OTP or magic link will no longer be valid.

* **`expires_in`**

  `integer`, format: `int64` — Number of seconds from now until the passwordless authentication expires. This is a convenience field calculated from the expires_at timestamp.

* **`passwordless_type`**

  `string`, possible values: `"OTP", "LINK", "LINK_OTP"` — Type of passwordless authentication that was sent via email. OTP sends a numeric code, LINK sends a clickable magic link, and LINK_OTP provides both options for user convenience.

**Example:**

```json
{
  "auth_request_id": "h5Y8kT5RVwaea5WEgW4n-6C-aO_-fuTUW7Vb9-Rh3AcY9qxZqQ",
  "expires_at": 1748696575,
  "expires_in": 300,
  "passwordless_type": "OTP"
}
```

### passwordlessTemplateType

- **Type:**`string`

**Example:**

### passwordlessVerifyPasswordLessRequest

- **Type:**`object`

* **`auth_request_id`**

  `string` — The authentication request identifier returned from the send passwordless email endpoint. Required when verifying OTP codes to link the verification with the original request.

* **`code`**

  `string` — The Verification Code (OTP) received via email. This is typically a 6-digit numeric code that users enter manually to verify their identity.

* **`link_token`**

  `string` — The unique token from the magic link URL received via email. Extract this token when users click the magic link and are redirected to your application to later verify the user.

**Example:**

```json
{
  "auth_request_id": "h5Y8kT5RVwaea5WEgW4n-6C-aO_-fuTUW7Vb9-Rh3AcY9qxZqQ",
  "code": "123456",
  "link_token": "afe9d61c-d80d-4020-a8ee-61765ab71cb3"
}
```

### passwordlessVerifyPasswordLessResponse

- **Type:**`object`

* **`email`**

  `string` — Email address of the successfully authenticated user. This confirms which email account was verified through the passwordless flow.

* **`passwordless_type`**

  `string`, possible values: `"OTP", "LINK", "LINK_OTP"` — The type of passwordless authentication that was successfully verified, confirming which method the user completed.

* **`state`**

  `string` — The custom state parameter that was provided in the original authentication request, returned unchanged. Use this to restore your application's context after authentication.

* **`template`**

  `string`, possible values: `"SIGNIN", "SIGNUP"` — Specifies which email template to choose. For User Signin choose SIGNIN and for User Signup use SIGNUP

**Example:**

```json
{
  "email": "john.doe@example.com",
  "passwordless_type": "OTP",
  "state": "kdt7yiag28t341fr1",
  "template": "SIGNIN"
}
```

### protobufNullValue

- **Type:**`string`

`NullValue` is a singleton enumeration to represent the null value for the `Value` type union.

The JSON representation for `NullValue` is JSON `null`.

**Example:**

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
    "auth_patterns": [{}],
    "categories": [""],
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
  "auth_patterns": [{}],
  "categories": [""],
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
    "auth_patterns": [{}],
    "categories": [""],
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

### rolesAddPermissionsToRoleResponse

- **Type:**`object`

* **`permissions`**

  `array` — List of all permissions belonging to the role after addition

  **Items:**
  - **`create_time`**

    `string`, format: `date-time`

  - **`description`**

    `string`

  - **`id`**

    `string`

  - **`is_scalekit_permission`**

    `boolean` — Indicates whether this permission is predefined by Scalekit

  - **`name`**

    `string`

  - **`update_time`**

    `string`, format: `date-time`

**Example:**

```json
{
  "permissions": [
    {
      "create_time": "",
      "description": "",
      "id": "",
      "is_scalekit_permission": true,
      "name": "",
      "update_time": ""
    }
  ]
}
```

### rolesCreateOrganizationRoleResponse

- **Type:**`object`

* **`role`**

  `object`
  - **`default_creator`**

    `boolean` — Indicates if this role is the default creator role for new organizations.

  - **`default_member`**

    `boolean` — Indicates if this role is the default member role for new users.

  - **`dependent_roles_count`**

    `integer`, format: `int32` — Number of roles that extend from this role (dependent roles count). Read-only field.

  - **`description`**

    `string` — Detailed description of the role's purpose and capabilities. Maximum 2000 characters.

  - **`display_name`**

    `string` — Human-readable display name for the role. Used in user interfaces and reports.

  - **`extends`**

    `string` — Name of the base role that this role extends. Enables hierarchical role inheritance.

  - **`id`**

    `string` — Unique system-generated identifier for the role. Immutable once created.

  - **`is_org_role`**

    `boolean` — Indicates if this role is an organization role.

  - **`name`**

    `string` — Unique name identifier for the role. Must be alphanumeric with underscores, 1-100 characters.

  - **`permissions`**

    `array` — List of permissions with role source information. Only included when 'include' parameter is specified in the request.

    **Items:**
    - **`create_time`**

      `string`, format: `date-time`

    - **`description`**

      `string`

    - **`id`**

      `string`

    - **`name`**

      `string`

    - **`role_name`**

      `string` — Name of the role from which this permission was sourced

    - **`update_time`**

      `string`, format: `date-time`

**Example:**

```json
{
  "role": {
    "default_creator": true,
    "default_member": true,
    "dependent_roles_count": 3,
    "description": "Can create, edit, and publish content but cannot delete or manage users",
    "display_name": "Content Editor",
    "extends": "admin_role",
    "id": "role_1234abcd5678efgh",
    "is_org_role": true,
    "name": "content_editor",
    "permissions": [
      {
        "description": "Read Content",
        "name": "read:content",
        "role_name": "admin_role"
      },
      {
        "description": "Write Content",
        "name": "write:content",
        "role_name": "editor_role"
      }
    ]
  }
}
```

### rolesCreatePermissionResponse

- **Type:**`object`

* **`permission`**

  `object`
  - **`create_time`**

    `string`, format: `date-time`

  - **`description`**

    `string`

  - **`id`**

    `string`

  - **`is_scalekit_permission`**

    `boolean` — Indicates whether this permission is predefined by Scalekit

  - **`name`**

    `string`

  - **`update_time`**

    `string`, format: `date-time`

**Example:**

```json
{
  "permission": {
    "create_time": "",
    "description": "",
    "id": "",
    "is_scalekit_permission": true,
    "name": "",
    "update_time": ""
  }
}
```

### rolesCreateRoleResponse

- **Type:**`object`

* **`role`**

  `object` — The created role object with system-generated ID and all configuration details.
  - **`default_creator`**

    `boolean` — Indicates if this role is the default creator role for new organizations.

  - **`default_member`**

    `boolean` — Indicates if this role is the default member role for new users.

  - **`dependent_roles_count`**

    `integer`, format: `int32` — Number of roles that extend from this role (dependent roles count). Read-only field.

  - **`description`**

    `string` — Detailed description of the role's purpose and capabilities. Maximum 2000 characters.

  - **`display_name`**

    `string` — Human-readable display name for the role. Used in user interfaces and reports.

  - **`extends`**

    `string` — Name of the base role that this role extends. Enables hierarchical role inheritance.

  - **`id`**

    `string` — Unique system-generated identifier for the role. Immutable once created.

  - **`is_org_role`**

    `boolean` — Indicates if this role is an organization role.

  - **`name`**

    `string` — Unique name identifier for the role. Must be alphanumeric with underscores, 1-100 characters.

  - **`permissions`**

    `array` — List of permissions with role source information. Only included when 'include' parameter is specified in the request.

    **Items:**
    - **`create_time`**

      `string`, format: `date-time`

    - **`description`**

      `string`

    - **`id`**

      `string`

    - **`name`**

      `string`

    - **`role_name`**

      `string` — Name of the role from which this permission was sourced

    - **`update_time`**

      `string`, format: `date-time`

**Example:**

```json
{
  "role": {
    "description": "Can edit content",
    "display_name": "Content Editor",
    "id": "role_1234abcd5678efgh",
    "name": "content_editor"
  }
}
```

### rolesGetOrganizationRoleResponse

- **Type:**`object`

* **`role`**

  `object`
  - **`default_creator`**

    `boolean` — Indicates if this role is the default creator role for new organizations.

  - **`default_member`**

    `boolean` — Indicates if this role is the default member role for new users.

  - **`dependent_roles_count`**

    `integer`, format: `int32` — Number of roles that extend from this role (dependent roles count). Read-only field.

  - **`description`**

    `string` — Detailed description of the role's purpose and capabilities. Maximum 2000 characters.

  - **`display_name`**

    `string` — Human-readable display name for the role. Used in user interfaces and reports.

  - **`extends`**

    `string` — Name of the base role that this role extends. Enables hierarchical role inheritance.

  - **`id`**

    `string` — Unique system-generated identifier for the role. Immutable once created.

  - **`is_org_role`**

    `boolean` — Indicates if this role is an organization role.

  - **`name`**

    `string` — Unique name identifier for the role. Must be alphanumeric with underscores, 1-100 characters.

  - **`permissions`**

    `array` — List of permissions with role source information. Only included when 'include' parameter is specified in the request.

    **Items:**
    - **`create_time`**

      `string`, format: `date-time`

    - **`description`**

      `string`

    - **`id`**

      `string`

    - **`name`**

      `string`

    - **`role_name`**

      `string` — Name of the role from which this permission was sourced

    - **`update_time`**

      `string`, format: `date-time`

**Example:**

```json
{
  "role": {
    "default_creator": true,
    "default_member": true,
    "dependent_roles_count": 3,
    "description": "Can create, edit, and publish content but cannot delete or manage users",
    "display_name": "Content Editor",
    "extends": "admin_role",
    "id": "role_1234abcd5678efgh",
    "is_org_role": true,
    "name": "content_editor",
    "permissions": [
      {
        "description": "Read Content",
        "name": "read:content",
        "role_name": "admin_role"
      },
      {
        "description": "Write Content",
        "name": "write:content",
        "role_name": "editor_role"
      }
    ]
  }
}
```

### rolesGetPermissionResponse

- **Type:**`object`

* **`permission`**

  `object`
  - **`create_time`**

    `string`, format: `date-time`

  - **`description`**

    `string`

  - **`id`**

    `string`

  - **`is_scalekit_permission`**

    `boolean` — Indicates whether this permission is predefined by Scalekit

  - **`name`**

    `string`

  - **`update_time`**

    `string`, format: `date-time`

**Example:**

```json
{
  "permission": {
    "create_time": "",
    "description": "",
    "id": "",
    "is_scalekit_permission": true,
    "name": "",
    "update_time": ""
  }
}
```

### rolesGetRoleResponse

- **Type:**`object`

* **`role`**

  `object` — The complete role object with all metadata, permissions, and inheritance details.
  - **`default_creator`**

    `boolean` — Indicates if this role is the default creator role for new organizations.

  - **`default_member`**

    `boolean` — Indicates if this role is the default member role for new users.

  - **`dependent_roles_count`**

    `integer`, format: `int32` — Number of roles that extend from this role (dependent roles count). Read-only field.

  - **`description`**

    `string` — Detailed description of the role's purpose and capabilities. Maximum 2000 characters.

  - **`display_name`**

    `string` — Human-readable display name for the role. Used in user interfaces and reports.

  - **`extends`**

    `string` — Name of the base role that this role extends. Enables hierarchical role inheritance.

  - **`id`**

    `string` — Unique system-generated identifier for the role. Immutable once created.

  - **`is_org_role`**

    `boolean` — Indicates if this role is an organization role.

  - **`name`**

    `string` — Unique name identifier for the role. Must be alphanumeric with underscores, 1-100 characters.

  - **`permissions`**

    `array` — List of permissions with role source information. Only included when 'include' parameter is specified in the request.

    **Items:**
    - **`create_time`**

      `string`, format: `date-time`

    - **`description`**

      `string`

    - **`id`**

      `string`

    - **`name`**

      `string`

    - **`role_name`**

      `string` — Name of the role from which this permission was sourced

    - **`update_time`**

      `string`, format: `date-time`

**Example:**

```json
{
  "role": {
    "dependent_roles_count": 2,
    "display_name": "Content Editor",
    "id": "role_1234abcd5678efgh",
    "name": "content_editor",
    "permissions": [
      {
        "name": "read:content"
      }
    ]
  }
}
```

### rolesGetRoleUsersCountResponse

- **Type:**`object`

* **`count`**

  `string`, format: `int64` — Number of users associated with the role

**Example:**

```json
{
  "count": 10
}
```

### rolesListDependentRolesResponse

- **Type:**`object`

* **`roles`**

  `array` — List of dependent roles

  **Items:**
  - **`default_creator`**

    `boolean` — Indicates if this role is the default creator role for new organizations.

  - **`default_member`**

    `boolean` — Indicates if this role is the default member role for new users.

  - **`dependent_roles_count`**

    `integer`, format: `int32` — Number of roles that extend from this role (dependent roles count). Read-only field.

  - **`description`**

    `string` — Detailed description of the role's purpose and capabilities. Maximum 2000 characters.

  - **`display_name`**

    `string` — Human-readable display name for the role. Used in user interfaces and reports.

  - **`extends`**

    `string` — Name of the base role that this role extends. Enables hierarchical role inheritance.

  - **`id`**

    `string` — Unique system-generated identifier for the role. Immutable once created.

  - **`is_org_role`**

    `boolean` — Indicates if this role is an organization role.

  - **`name`**

    `string` — Unique name identifier for the role. Must be alphanumeric with underscores, 1-100 characters.

  - **`permissions`**

    `array` — List of permissions with role source information. Only included when 'include' parameter is specified in the request.

    **Items:**
    - **`create_time`**

      `string`, format: `date-time`

    - **`description`**

      `string`

    - **`id`**

      `string`

    - **`name`**

      `string`

    - **`role_name`**

      `string` — Name of the role from which this permission was sourced

    - **`update_time`**

      `string`, format: `date-time`

**Example:**

```json
{
  "roles": [
    {
      "default_creator": true,
      "default_member": true,
      "dependent_roles_count": 3,
      "description": "Can create, edit, and publish content but cannot delete or manage users",
      "display_name": "Content Editor",
      "extends": "admin_role",
      "id": "role_1234abcd5678efgh",
      "is_org_role": true,
      "name": "content_editor",
      "permissions": [
        {
          "description": "Read Content",
          "name": "read:content",
          "role_name": "admin_role"
        },
        {
          "description": "Write Content",
          "name": "write:content",
          "role_name": "editor_role"
        }
      ]
    }
  ]
}
```

### rolesListEffectiveRolePermissionsResponse

- **Type:**`object`

* **`permissions`**

  `array` — List of all effective permissions including those inherited from base roles

  **Items:**
  - **`create_time`**

    `string`, format: `date-time`

  - **`description`**

    `string`

  - **`id`**

    `string`

  - **`is_scalekit_permission`**

    `boolean` — Indicates whether this permission is predefined by Scalekit

  - **`name`**

    `string`

  - **`update_time`**

    `string`, format: `date-time`

**Example:**

```json
{
  "permissions": [
    {
      "create_time": "",
      "description": "",
      "id": "",
      "is_scalekit_permission": true,
      "name": "",
      "update_time": ""
    }
  ]
}
```

### rolesListOrganizationRolesResponse

- **Type:**`object`

* **`roles`**

  `array` — List of roles objects

  **Items:**
  - **`default_creator`**

    `boolean` — Indicates if this role is the default creator role for new organizations.

  - **`default_member`**

    `boolean` — Indicates if this role is the default member role for new users.

  - **`dependent_roles_count`**

    `integer`, format: `int32` — Number of roles that extend from this role (dependent roles count). Read-only field.

  - **`description`**

    `string` — Detailed description of the role's purpose and capabilities. Maximum 2000 characters.

  - **`display_name`**

    `string` — Human-readable display name for the role. Used in user interfaces and reports.

  - **`extends`**

    `string` — Name of the base role that this role extends. Enables hierarchical role inheritance.

  - **`id`**

    `string` — Unique system-generated identifier for the role. Immutable once created.

  - **`is_org_role`**

    `boolean` — Indicates if this role is an organization role.

  - **`name`**

    `string` — Unique name identifier for the role. Must be alphanumeric with underscores, 1-100 characters.

  - **`permissions`**

    `array` — List of permissions with role source information. Only included when 'include' parameter is specified in the request.

    **Items:**
    - **`create_time`**

      `string`, format: `date-time`

    - **`description`**

      `string`

    - **`id`**

      `string`

    - **`name`**

      `string`

    - **`role_name`**

      `string` — Name of the role from which this permission was sourced

    - **`update_time`**

      `string`, format: `date-time`

**Example:**

```json
{
  "roles": [
    {
      "default_creator": true,
      "default_member": true,
      "dependent_roles_count": 3,
      "description": "Can create, edit, and publish content but cannot delete or manage users",
      "display_name": "Content Editor",
      "extends": "admin_role",
      "id": "role_1234abcd5678efgh",
      "is_org_role": true,
      "name": "content_editor",
      "permissions": [
        {
          "description": "Read Content",
          "name": "read:content",
          "role_name": "admin_role"
        },
        {
          "description": "Write Content",
          "name": "write:content",
          "role_name": "editor_role"
        }
      ]
    }
  ]
}
```

### rolesListPermissionsResponse

- **Type:**`object`

* **`next_page_token`**

  `string` — Token to retrieve next page of results

* **`permissions`**

  `array`

  **Items:**
  - **`create_time`**

    `string`, format: `date-time`

  - **`description`**

    `string`

  - **`id`**

    `string`

  - **`is_scalekit_permission`**

    `boolean` — Indicates whether this permission is predefined by Scalekit

  - **`name`**

    `string`

  - **`update_time`**

    `string`, format: `date-time`

* **`prev_page_token`**

  `string` — Token to retrieve previous page of results

* **`total_size`**

  `integer`, format: `int64` — Total number of permissions available

**Example:**

```json
{
  "next_page_token": "token_def456",
  "permissions": [
    {
      "create_time": "",
      "description": "",
      "id": "",
      "is_scalekit_permission": true,
      "name": "",
      "update_time": ""
    }
  ],
  "prev_page_token": "token_def456",
  "total_size": 150
}
```

### rolesListRolePermissionsResponse

- **Type:**`object`

* **`permissions`**

  `array` — List of permissions directly assigned to the role

  **Items:**
  - **`create_time`**

    `string`, format: `date-time`

  - **`description`**

    `string`

  - **`id`**

    `string`

  - **`is_scalekit_permission`**

    `boolean` — Indicates whether this permission is predefined by Scalekit

  - **`name`**

    `string`

  - **`update_time`**

    `string`, format: `date-time`

**Example:**

```json
{
  "permissions": [
    {
      "create_time": "",
      "description": "",
      "id": "",
      "is_scalekit_permission": true,
      "name": "",
      "update_time": ""
    }
  ]
}
```

### rolesListRolesResponse

- **Type:**`object`

* **`roles`**

  `array` — List of all roles in the environment with their metadata and optionally their permissions.

  **Items:**
  - **`default_creator`**

    `boolean` — Indicates if this role is the default creator role for new organizations.

  - **`default_member`**

    `boolean` — Indicates if this role is the default member role for new users.

  - **`dependent_roles_count`**

    `integer`, format: `int32` — Number of roles that extend from this role (dependent roles count). Read-only field.

  - **`description`**

    `string` — Detailed description of the role's purpose and capabilities. Maximum 2000 characters.

  - **`display_name`**

    `string` — Human-readable display name for the role. Used in user interfaces and reports.

  - **`extends`**

    `string` — Name of the base role that this role extends. Enables hierarchical role inheritance.

  - **`id`**

    `string` — Unique system-generated identifier for the role. Immutable once created.

  - **`is_org_role`**

    `boolean` — Indicates if this role is an organization role.

  - **`name`**

    `string` — Unique name identifier for the role. Must be alphanumeric with underscores, 1-100 characters.

  - **`permissions`**

    `array` — List of permissions with role source information. Only included when 'include' parameter is specified in the request.

    **Items:**
    - **`create_time`**

      `string`, format: `date-time`

    - **`description`**

      `string`

    - **`id`**

      `string`

    - **`name`**

      `string`

    - **`role_name`**

      `string` — Name of the role from which this permission was sourced

    - **`update_time`**

      `string`, format: `date-time`

**Example:**

```json
{
  "roles": [
    {
      "display_name": "Administrator",
      "id": "role_1234abcd5678efgh",
      "name": "admin"
    },
    {
      "display_name": "Viewer",
      "id": "role_9876zyxw5432vuts",
      "name": "viewer"
    }
  ]
}
```

### Permission Entity

- **Type:**`object`

* **`create_time`**

  `string`, format: `date-time`

* **`description`**

  `string`

* **`id`**

  `string`

* **`is_scalekit_permission`**

  `boolean` — Indicates whether this permission is predefined by Scalekit

* **`name`**

  `string`

* **`update_time`**

  `string`, format: `date-time`

**Example:**

```json
{
  "create_time": "",
  "description": "",
  "id": "",
  "is_scalekit_permission": true,
  "name": "",
  "update_time": ""
}
```

### rolesPermissionType

- **Type:**`string`

**Example:**

### RolePermissions represents a permission with role source information

- **Type:**`object`

* **`create_time`**

  `string`, format: `date-time`

* **`description`**

  `string`

* **`id`**

  `string`

* **`name`**

  `string`

* **`role_name`**

  `string` — Name of the role from which this permission was sourced

* **`update_time`**

  `string`, format: `date-time`

**Example:**

```json
{
  "create_time": "",
  "description": "",
  "id": "",
  "name": "",
  "role_name": "admin_role",
  "update_time": ""
}
```

### rolesUpdateDefaultOrganizationRolesResponse

- **Type:**`object`

* **`default_member`**

  `object` — Updated default member role
  - **`default_creator`**

    `boolean` — Indicates if this role is the default creator role for new organizations.

  - **`default_member`**

    `boolean` — Indicates if this role is the default member role for new users.

  - **`dependent_roles_count`**

    `integer`, format: `int32` — Number of roles that extend from this role (dependent roles count). Read-only field.

  - **`description`**

    `string` — Detailed description of the role's purpose and capabilities. Maximum 2000 characters.

  - **`display_name`**

    `string` — Human-readable display name for the role. Used in user interfaces and reports.

  - **`extends`**

    `string` — Name of the base role that this role extends. Enables hierarchical role inheritance.

  - **`id`**

    `string` — Unique system-generated identifier for the role. Immutable once created.

  - **`is_org_role`**

    `boolean` — Indicates if this role is an organization role.

  - **`name`**

    `string` — Unique name identifier for the role. Must be alphanumeric with underscores, 1-100 characters.

  - **`permissions`**

    `array` — List of permissions with role source information. Only included when 'include' parameter is specified in the request.

    **Items:**
    - **`create_time`**

      `string`, format: `date-time`

    - **`description`**

      `string`

    - **`id`**

      `string`

    - **`name`**

      `string`

    - **`role_name`**

      `string` — Name of the role from which this permission was sourced

    - **`update_time`**

      `string`, format: `date-time`

**Example:**

```json
{
  "default_member": {
    "description": "Role for regular members",
    "display_name": "Member Role",
    "id": "role_0987654321",
    "name": "member"
  }
}
```

### rolesUpdateDefaultRole

- **Type:**`object`

* **`id`**

  `string`

* **`name`**

  `string` — Unique name of the role

**Example:**

```json
{
  "id": "",
  "name": "creator"
}
```

### rolesUpdateDefaultRolesRequest

- **Type:**`object`

* **`default_creator`**

  `object` — Default creator role (deprecated - use default_creator_role field instead)
  - **`id`**

    `string`

  - **`name`**

    `string` — Unique name of the role

* **`default_creator_role`**

  `string` — Name of the role to set as the default creator role. This role will be automatically assigned to users who create new resources in the environment. Must be a valid role name that exists in the environment.

* **`default_member`**

  `object` — Default member role (deprecated - use default_member_role field instead)
  - **`id`**

    `string`

  - **`name`**

    `string` — Unique name of the role

* **`default_member_role`**

  `string` — Name of the role to set as the default member role. This role will be automatically assigned to new users when they join the environment. Must be a valid role name that exists in the environment.

**Example:**

```json
{
  "default_creator": {
    "description": "Role for creating resources",
    "display_name": "Creator Role",
    "id": "role_1234567890",
    "name": "creator"
  },
  "default_creator_role": "creator",
  "default_member": {
    "description": "Role for regular members",
    "display_name": "Member Role",
    "id": "role_0987654321",
    "name": "member"
  },
  "default_member_role": "member"
}
```

### rolesUpdateDefaultRolesResponse

- **Type:**`object`

* **`default_creator`**

  `object` — The role that is now set as the default creator role for the environment. Contains complete role information including permissions and metadata.
  - **`default_creator`**

    `boolean` — Indicates if this role is the default creator role for new organizations.

  - **`default_member`**

    `boolean` — Indicates if this role is the default member role for new users.

  - **`dependent_roles_count`**

    `integer`, format: `int32` — Number of roles that extend from this role (dependent roles count). Read-only field.

  - **`description`**

    `string` — Detailed description of the role's purpose and capabilities. Maximum 2000 characters.

  - **`display_name`**

    `string` — Human-readable display name for the role. Used in user interfaces and reports.

  - **`extends`**

    `string` — Name of the base role that this role extends. Enables hierarchical role inheritance.

  - **`id`**

    `string` — Unique system-generated identifier for the role. Immutable once created.

  - **`is_org_role`**

    `boolean` — Indicates if this role is an organization role.

  - **`name`**

    `string` — Unique name identifier for the role. Must be alphanumeric with underscores, 1-100 characters.

  - **`permissions`**

    `array` — List of permissions with role source information. Only included when 'include' parameter is specified in the request.

    **Items:**
    - **`create_time`**

      `string`, format: `date-time`

    - **`description`**

      `string`

    - **`id`**

      `string`

    - **`name`**

      `string`

    - **`role_name`**

      `string` — Name of the role from which this permission was sourced

    - **`update_time`**

      `string`, format: `date-time`

* **`default_member`**

  `object` — The role that is now set as the default member role for the environment. Contains complete role information including permissions and metadata.
  - **`default_creator`**

    `boolean` — Indicates if this role is the default creator role for new organizations.

  - **`default_member`**

    `boolean` — Indicates if this role is the default member role for new users.

  - **`dependent_roles_count`**

    `integer`, format: `int32` — Number of roles that extend from this role (dependent roles count). Read-only field.

  - **`description`**

    `string` — Detailed description of the role's purpose and capabilities. Maximum 2000 characters.

  - **`display_name`**

    `string` — Human-readable display name for the role. Used in user interfaces and reports.

  - **`extends`**

    `string` — Name of the base role that this role extends. Enables hierarchical role inheritance.

  - **`id`**

    `string` — Unique system-generated identifier for the role. Immutable once created.

  - **`is_org_role`**

    `boolean` — Indicates if this role is an organization role.

  - **`name`**

    `string` — Unique name identifier for the role. Must be alphanumeric with underscores, 1-100 characters.

  - **`permissions`**

    `array` — List of permissions with role source information. Only included when 'include' parameter is specified in the request.

    **Items:**
    - **`create_time`**

      `string`, format: `date-time`

    - **`description`**

      `string`

    - **`id`**

      `string`

    - **`name`**

      `string`

    - **`role_name`**

      `string` — Name of the role from which this permission was sourced

    - **`update_time`**

      `string`, format: `date-time`

**Example:**

```json
{
  "default_creator": {
    "description": "Role for creating resources",
    "display_name": "Creator Role",
    "id": "role_1234567890",
    "name": "creator"
  },
  "default_member": {
    "description": "Role for regular members",
    "display_name": "Member Role",
    "id": "role_0987654321",
    "name": "member"
  }
}
```

### rolesUpdateOrganizationRoleResponse

- **Type:**`object`

* **`role`**

  `object`
  - **`default_creator`**

    `boolean` — Indicates if this role is the default creator role for new organizations.

  - **`default_member`**

    `boolean` — Indicates if this role is the default member role for new users.

  - **`dependent_roles_count`**

    `integer`, format: `int32` — Number of roles that extend from this role (dependent roles count). Read-only field.

  - **`description`**

    `string` — Detailed description of the role's purpose and capabilities. Maximum 2000 characters.

  - **`display_name`**

    `string` — Human-readable display name for the role. Used in user interfaces and reports.

  - **`extends`**

    `string` — Name of the base role that this role extends. Enables hierarchical role inheritance.

  - **`id`**

    `string` — Unique system-generated identifier for the role. Immutable once created.

  - **`is_org_role`**

    `boolean` — Indicates if this role is an organization role.

  - **`name`**

    `string` — Unique name identifier for the role. Must be alphanumeric with underscores, 1-100 characters.

  - **`permissions`**

    `array` — List of permissions with role source information. Only included when 'include' parameter is specified in the request.

    **Items:**
    - **`create_time`**

      `string`, format: `date-time`

    - **`description`**

      `string`

    - **`id`**

      `string`

    - **`name`**

      `string`

    - **`role_name`**

      `string` — Name of the role from which this permission was sourced

    - **`update_time`**

      `string`, format: `date-time`

**Example:**

```json
{
  "role": {
    "default_creator": true,
    "default_member": true,
    "dependent_roles_count": 3,
    "description": "Can create, edit, and publish content but cannot delete or manage users",
    "display_name": "Content Editor",
    "extends": "admin_role",
    "id": "role_1234abcd5678efgh",
    "is_org_role": true,
    "name": "content_editor",
    "permissions": [
      {
        "description": "Read Content",
        "name": "read:content",
        "role_name": "admin_role"
      },
      {
        "description": "Write Content",
        "name": "write:content",
        "role_name": "editor_role"
      }
    ]
  }
}
```

### rolesUpdatePermissionResponse

- **Type:**`object`

* **`permission`**

  `object`
  - **`create_time`**

    `string`, format: `date-time`

  - **`description`**

    `string`

  - **`id`**

    `string`

  - **`is_scalekit_permission`**

    `boolean` — Indicates whether this permission is predefined by Scalekit

  - **`name`**

    `string`

  - **`update_time`**

    `string`, format: `date-time`

**Example:**

```json
{
  "permission": {
    "create_time": "",
    "description": "",
    "id": "",
    "is_scalekit_permission": true,
    "name": "",
    "update_time": ""
  }
}
```

### rolesUpdateRoleResponse

- **Type:**`object`

* **`role`**

  `object` — The updated role object with all current configuration details.
  - **`default_creator`**

    `boolean` — Indicates if this role is the default creator role for new organizations.

  - **`default_member`**

    `boolean` — Indicates if this role is the default member role for new users.

  - **`dependent_roles_count`**

    `integer`, format: `int32` — Number of roles that extend from this role (dependent roles count). Read-only field.

  - **`description`**

    `string` — Detailed description of the role's purpose and capabilities. Maximum 2000 characters.

  - **`display_name`**

    `string` — Human-readable display name for the role. Used in user interfaces and reports.

  - **`extends`**

    `string` — Name of the base role that this role extends. Enables hierarchical role inheritance.

  - **`id`**

    `string` — Unique system-generated identifier for the role. Immutable once created.

  - **`is_org_role`**

    `boolean` — Indicates if this role is an organization role.

  - **`name`**

    `string` — Unique name identifier for the role. Must be alphanumeric with underscores, 1-100 characters.

  - **`permissions`**

    `array` — List of permissions with role source information. Only included when 'include' parameter is specified in the request.

    **Items:**
    - **`create_time`**

      `string`, format: `date-time`

    - **`description`**

      `string`

    - **`id`**

      `string`

    - **`name`**

      `string`

    - **`role_name`**

      `string` — Name of the role from which this permission was sourced

    - **`update_time`**

      `string`, format: `date-time`

**Example:**

```json
{
  "role": {
    "description": "Can edit and approve content",
    "display_name": "Senior Editor",
    "id": "role_1234abcd5678efgh",
    "name": "content_editor"
  }
}
```

### sessionsAuthenticatedClients

- **Type:**`object`

AuthenticatedClients represents an authenticated client in a session along with its organization context.

- **`client_id`**

  `string` — Unique identifier of the authenticated client application.

- **`organization_id`**

  `string` — Active or last active Organization ID associated with the authenticated client.

**Example:**

```json
{
  "client_id": "skc_1234567890",
  "organization_id": "org_1234567890"
}
```

### sessionsDeviceDetails

- **Type:**`object`

* **`browser`**

  `string` — Browser name and family extracted from the user agent. Examples: Chrome, Safari, Firefox, Edge, Mobile Safari.

* **`browser_version`**

  `string` — Version of the browser application. Represents the specific release version of the browser being used.

* **`device_type`**

  `string` — Categorized device type classification. Possible values: 'desktop' (traditional computers), 'mobile' (smartphones and small tablets), 'tablet' (large tablets), 'other'. Useful for displaying session information by device category.

* **`ip`**

  `string` — IP address of the device that initiated the session. This is the public-facing IP address used to connect to the application. Useful for security audits and geographic distribution analysis.

* **`location`**

  `object` — Geographic location information derived from IP address geolocation. Includes country, region, city, and coordinates. Note: Based on IP location data and may not represent the user's exact physical location.
  - **`city`**

    `string` — City name where the session originated based on IP geolocation. Approximate location derived from IP address.

  - **`latitude`**

    `string` — Latitude coordinate of the estimated location. Decimal format (e.g., '37.7749'). Note: Represents IP geolocation center and may not be precise.

  - **`longitude`**

    `string` — Longitude coordinate of the estimated location. Decimal format (e.g., '-122.4194'). Note: Represents IP geolocation center and may not be precise.

  - **`region`**

    `string` — Geographic region name derived from IP geolocation. Represents the country-level location (e.g., 'United States', 'France').

  - **`region_subdivision`**

    `string` — Regional subdivision code or name (e.g., state abbreviation for US, province for Canada). Two-letter ISO format when applicable.

* **`os`**

  `string` — Operating system name extracted from the user agent and device headers. Examples: macOS, Windows, Linux, iOS, Android.

* **`os_version`**

  `string` — Version of the operating system. Represents the specific OS release the device is running.

* **`user_agent`**

  `string` — Complete HTTP User-Agent header string from the client request. Contains browser type, version, and operating system information. Used for detailed device fingerprinting and user agent analysis.

**Example:**

```json
{
  "browser": "Chrome",
  "browser_version": "120.0.0.0",
  "device_type": "desktop",
  "ip": "192.0.2.1",
  "location": {
    "city": "San Francisco",
    "latitude": "37.7749",
    "longitude": "-122.4194",
    "region": "United States",
    "region_subdivision": "CA"
  },
  "os": "macOS",
  "os_version": "14.2",
  "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}
```

### sessionsRevokeAllUserSessionsResponse

- **Type:**`object`

* **`revoked_sessions`**

  `array` — List of all sessions that were revoked, including detailed information for each revoked session with IDs, timestamps, and device details.

  **Items:**
  - **`absolute_expires_at`**

    `string`, format: `date-time` — The absolute expiration timestamp that was configured for this session before revocation. Represents the hard deadline regardless of activity.

  - **`created_at`**

    `string`, format: `date-time` — Timestamp indicating when the session was originally created before revocation.

  - **`expired_at`**

    `string`, format: `date-time` — Timestamp when the session was actually terminated. Set to the revocation time when the session is revoked.

  - **`idle_expires_at`**

    `string`, format: `date-time` — The idle expiration timestamp that was configured for this session before revocation. Represents when the session would have expired due to inactivity.

  - **`last_active_at`**

    `string`, format: `date-time` — Timestamp of the last recorded user activity in this session before revocation. Helps identify inactive sessions that were revoked.

  - **`logout_at`**

    `string`, format: `date-time` — Timestamp when the user explicitly logged out (if applicable). Null if the session was revoked without prior logout.

  - **`session_id`**

    `string` — Unique identifier for the revoked session. System-generated read-only field.

  - **`status`**

    `string` — Status of the session after revocation. Always 'revoked' since only active sessions can be revoked. Sessions that were already expired or logged out are not included in the revocation response.

  - **`updated_at`**

    `string`, format: `date-time` — Timestamp indicating when the session was last modified before revocation.

  - **`user_id`**

    `string` — Unique identifier for the user who owned this session.

* **`total_revoked`**

  `integer`, format: `int64` — Total count of active sessions that were revoked. Useful for confirmation and audit logging.

**Example:**

```json
{
  "revoked_sessions": [
    {
      "absolute_expires_at": "2025-01-22T10:30:00Z",
      "created_at": "2025-01-15T10:30:00Z",
      "expired_at": "2025-01-15T12:00:00Z",
      "idle_expires_at": "2025-01-15T11:30:00Z",
      "last_active_at": "2025-01-15T10:55:30Z",
      "logout_at": "2025-01-15T14:00:00Z",
      "session_id": "ses_1234567890123456",
      "status": "revoked",
      "updated_at": "2025-01-15T10:45:00Z",
      "user_id": "usr_1234567890123456"
    }
  ],
  "total_revoked": 5
}
```

### sessionsRevokeSessionResponse

- **Type:**`object`

* **`revoked_session`**

  `object` — Details of the revoked session including session ID, user ID, creation and revocation timestamps, and final device information.
  - **`absolute_expires_at`**

    `string`, format: `date-time` — The absolute expiration timestamp that was configured for this session before revocation. Represents the hard deadline regardless of activity.

  - **`created_at`**

    `string`, format: `date-time` — Timestamp indicating when the session was originally created before revocation.

  - **`expired_at`**

    `string`, format: `date-time` — Timestamp when the session was actually terminated. Set to the revocation time when the session is revoked.

  - **`idle_expires_at`**

    `string`, format: `date-time` — The idle expiration timestamp that was configured for this session before revocation. Represents when the session would have expired due to inactivity.

  - **`last_active_at`**

    `string`, format: `date-time` — Timestamp of the last recorded user activity in this session before revocation. Helps identify inactive sessions that were revoked.

  - **`logout_at`**

    `string`, format: `date-time` — Timestamp when the user explicitly logged out (if applicable). Null if the session was revoked without prior logout.

  - **`session_id`**

    `string` — Unique identifier for the revoked session. System-generated read-only field.

  - **`status`**

    `string` — Status of the session after revocation. Always 'revoked' since only active sessions can be revoked. Sessions that were already expired or logged out are not included in the revocation response.

  - **`updated_at`**

    `string`, format: `date-time` — Timestamp indicating when the session was last modified before revocation.

  - **`user_id`**

    `string` — Unique identifier for the user who owned this session.

**Example:**

```json
{
  "revoked_session": {
    "absolute_expires_at": "2025-01-22T10:30:00Z",
    "created_at": "2025-01-15T10:30:00Z",
    "expired_at": "2025-01-15T12:00:00Z",
    "idle_expires_at": "2025-01-15T11:30:00Z",
    "last_active_at": "2025-01-15T10:55:30Z",
    "logout_at": "2025-01-15T14:00:00Z",
    "session_id": "ses_1234567890123456",
    "status": "revoked",
    "updated_at": "2025-01-15T10:45:00Z",
    "user_id": "usr_1234567890123456"
  }
}
```

### sessionsRevokedSessionDetails

- **Type:**`object`

* **`absolute_expires_at`**

  `string`, format: `date-time` — The absolute expiration timestamp that was configured for this session before revocation. Represents the hard deadline regardless of activity.

* **`created_at`**

  `string`, format: `date-time` — Timestamp indicating when the session was originally created before revocation.

* **`expired_at`**

  `string`, format: `date-time` — Timestamp when the session was actually terminated. Set to the revocation time when the session is revoked.

* **`idle_expires_at`**

  `string`, format: `date-time` — The idle expiration timestamp that was configured for this session before revocation. Represents when the session would have expired due to inactivity.

* **`last_active_at`**

  `string`, format: `date-time` — Timestamp of the last recorded user activity in this session before revocation. Helps identify inactive sessions that were revoked.

* **`logout_at`**

  `string`, format: `date-time` — Timestamp when the user explicitly logged out (if applicable). Null if the session was revoked without prior logout.

* **`session_id`**

  `string` — Unique identifier for the revoked session. System-generated read-only field.

* **`status`**

  `string` — Status of the session after revocation. Always 'revoked' since only active sessions can be revoked. Sessions that were already expired or logged out are not included in the revocation response.

* **`updated_at`**

  `string`, format: `date-time` — Timestamp indicating when the session was last modified before revocation.

* **`user_id`**

  `string` — Unique identifier for the user who owned this session.

**Example:**

```json
{
  "absolute_expires_at": "2025-01-22T10:30:00Z",
  "created_at": "2025-01-15T10:30:00Z",
  "expired_at": "2025-01-15T12:00:00Z",
  "idle_expires_at": "2025-01-15T11:30:00Z",
  "last_active_at": "2025-01-15T10:55:30Z",
  "logout_at": "2025-01-15T14:00:00Z",
  "session_id": "ses_1234567890123456",
  "status": "revoked",
  "updated_at": "2025-01-15T10:45:00Z",
  "user_id": "usr_1234567890123456"
}
```

### sessionsSessionDetails

- **Type:**`object`

* **`absolute_expires_at`**

  `string`, format: `date-time` — Hard expiration timestamp for the session regardless of user activity. The session will be forcibly terminated at this time. This represents the maximum session lifetime from creation.

* **`authenticated_clients`**

  `array` — Details of the authenticated clients for this session: client ID and organization context.

  **Items:**
  - **`client_id`**

    `string` — Unique identifier of the authenticated client application.

  - **`organization_id`**

    `string` — Active or last active Organization ID associated with the authenticated client.

* **`authenticated_organizations`**

  `array` — List of organization IDs that have been authenticated for this user within the current session. Contains all organizations where the user has successfully completed SSO or authentication.

  **Items:**

  `string`

* **`created_at`**

  `string`, format: `date-time` — Timestamp indicating when the session was created. This is set once at session creation and remains constant throughout the session lifetime.

* **`device`**

  `object` — Complete device metadata associated with this session including browser, operating system, device type, and geographic location based on IP address.
  - **`browser`**

    `string` — Browser name and family extracted from the user agent. Examples: Chrome, Safari, Firefox, Edge, Mobile Safari.

  - **`browser_version`**

    `string` — Version of the browser application. Represents the specific release version of the browser being used.

  - **`device_type`**

    `string` — Categorized device type classification. Possible values: 'desktop' (traditional computers), 'mobile' (smartphones and small tablets), 'tablet' (large tablets), 'other'. Useful for displaying session information by device category.

  - **`ip`**

    `string` — IP address of the device that initiated the session. This is the public-facing IP address used to connect to the application. Useful for security audits and geographic distribution analysis.

  - **`location`**

    `object` — Geographic location information derived from IP address geolocation. Includes country, region, city, and coordinates. Note: Based on IP location data and may not represent the user's exact physical location.
    - **`city`**

      `string` — City name where the session originated based on IP geolocation. Approximate location derived from IP address.

    - **`latitude`**

      `string` — Latitude coordinate of the estimated location. Decimal format (e.g., '37.7749'). Note: Represents IP geolocation center and may not be precise.

    - **`longitude`**

      `string` — Longitude coordinate of the estimated location. Decimal format (e.g., '-122.4194'). Note: Represents IP geolocation center and may not be precise.

    - **`region`**

      `string` — Geographic region name derived from IP geolocation. Represents the country-level location (e.g., 'United States', 'France').

    - **`region_subdivision`**

      `string` — Regional subdivision code or name (e.g., state abbreviation for US, province for Canada). Two-letter ISO format when applicable.

  - **`os`**

    `string` — Operating system name extracted from the user agent and device headers. Examples: macOS, Windows, Linux, iOS, Android.

  - **`os_version`**

    `string` — Version of the operating system. Represents the specific OS release the device is running.

  - **`user_agent`**

    `string` — Complete HTTP User-Agent header string from the client request. Contains browser type, version, and operating system information. Used for detailed device fingerprinting and user agent analysis.

* **`expired_at`**

  `string`, format: `date-time` — Timestamp when the session was terminated. Null if the session is still active. Set when the session expires due to reaching idle_expires_at or absolute_expires_at timeout, or when administratively revoked. Not set for user-initiated logout (see logout_at instead).

* **`idle_expires_at`**

  `string`, format: `date-time` — Projected expiration timestamp if the session remains idle without user activity. This timestamp is recalculated with each user activity. Session will be automatically terminated at this time if no activity occurs.

* **`last_active_at`**

  `string`, format: `date-time` — Timestamp of the most recent user activity detected in this session. Updated on each API request or user interaction. Used to determine if a session has exceeded the idle timeout threshold.

* **`logout_at`**

  `string`, format: `date-time` — Timestamp when the user explicitly logged out from the session. Null if the user has not logged out. When set, indicates the session ended due to explicit user logout rather than timeout.

* **`organization_id`**

  `string` — Organization ID for the user's most recently active organization within this session. This represents the primary organization context for the current session.

* **`session_id`**

  `string` — Unique identifier for the session. System-generated read-only field used to reference this session.

* **`status`**

  `string` — Current operational status of the session. Possible values: 'active' (session is valid and requests are allowed), 'expired' (session terminated due to idle or absolute timeout), 'revoked' (session was administratively revoked), 'logout' (user explicitly logged out). Use this to determine if the session can be used for new requests.

* **`updated_at`**

  `string`, format: `date-time` — Timestamp indicating when the session was last updated. Updated whenever session state changes such as organization context changes or metadata updates.

* **`user_id`**

  `string` — Unique identifier for the user who owns and is authenticated within this session.

**Example:**

```json
{
  "absolute_expires_at": "2025-01-22T10:30:00Z",
  "authenticated_clients": [
    {
      "client_id": "skc_1234567890",
      "organization_id": "org_1234567890"
    }
  ],
  "authenticated_organizations": ["org_123", "org_456"],
  "created_at": "2025-01-15T10:30:00Z",
  "device": {
    "browser": "Chrome",
    "browser_version": "120.0.0.0",
    "device_type": "desktop",
    "ip": "192.0.2.1",
    "location": null,
    "os": "macOS",
    "os_version": "14.2",
    "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
  },
  "expired_at": "2025-01-15T12:00:00Z",
  "idle_expires_at": "2025-01-15T11:30:00Z",
  "last_active_at": "2025-01-15T10:55:30Z",
  "logout_at": "2025-01-15T14:00:00Z",
  "organization_id": "org_1234567890123456",
  "session_id": "ses_1234567890123456",
  "status": "active",
  "updated_at": "2025-01-15T10:45:00Z",
  "user_id": "usr_1234567890123456"
}
```

### sessionsUserSessionDetails

- **Type:**`object`

* **`next_page_token`**

  `string` — Pagination token for retrieving the next page of results. Empty string if there are no more pages (you have reached the final page of results).

* **`prev_page_token`**

  `string` — Pagination token for retrieving the previous page of results. Empty string for the first page. Use this to navigate backward through result pages.

* **`sessions`**

  `array` — Array of session objects for the requested user. May contain fewer entries than the requested page_size when reaching the final page of results.

  **Items:**
  - **`absolute_expires_at`**

    `string`, format: `date-time` — Hard expiration timestamp for the session regardless of user activity. The session will be forcibly terminated at this time. This represents the maximum session lifetime from creation.

  - **`authenticated_clients`**

    `array` — Details of the authenticated clients for this session: client ID and organization context.

    **Items:**
    - **`client_id`**

      `string` — Unique identifier of the authenticated client application.

    - **`organization_id`**

      `string` — Active or last active Organization ID associated with the authenticated client.

  - **`authenticated_organizations`**

    `array` — List of organization IDs that have been authenticated for this user within the current session. Contains all organizations where the user has successfully completed SSO or authentication.

    **Items:**

    `string`

  - **`created_at`**

    `string`, format: `date-time` — Timestamp indicating when the session was created. This is set once at session creation and remains constant throughout the session lifetime.

  - **`device`**

    `object` — Complete device metadata associated with this session including browser, operating system, device type, and geographic location based on IP address.
    - **`browser`**

      `string` — Browser name and family extracted from the user agent. Examples: Chrome, Safari, Firefox, Edge, Mobile Safari.

    - **`browser_version`**

      `string` — Version of the browser application. Represents the specific release version of the browser being used.

    - **`device_type`**

      `string` — Categorized device type classification. Possible values: 'desktop' (traditional computers), 'mobile' (smartphones and small tablets), 'tablet' (large tablets), 'other'. Useful for displaying session information by device category.

    - **`ip`**

      `string` — IP address of the device that initiated the session. This is the public-facing IP address used to connect to the application. Useful for security audits and geographic distribution analysis.

    - **`location`**

      `object` — Geographic location information derived from IP address geolocation. Includes country, region, city, and coordinates. Note: Based on IP location data and may not represent the user's exact physical location.
      - **`city`**

        `string` — City name where the session originated based on IP geolocation. Approximate location derived from IP address.

      - **`latitude`**

        `string` — Latitude coordinate of the estimated location. Decimal format (e.g., '37.7749'). Note: Represents IP geolocation center and may not be precise.

      - **`longitude`**

        `string` — Longitude coordinate of the estimated location. Decimal format (e.g., '-122.4194'). Note: Represents IP geolocation center and may not be precise.

      - **`region`**

        `string` — Geographic region name derived from IP geolocation. Represents the country-level location (e.g., 'United States', 'France').

      - **`region_subdivision`**

        `string` — Regional subdivision code or name (e.g., state abbreviation for US, province for Canada). Two-letter ISO format when applicable.

    - **`os`**

      `string` — Operating system name extracted from the user agent and device headers. Examples: macOS, Windows, Linux, iOS, Android.

    - **`os_version`**

      `string` — Version of the operating system. Represents the specific OS release the device is running.

    - **`user_agent`**

      `string` — Complete HTTP User-Agent header string from the client request. Contains browser type, version, and operating system information. Used for detailed device fingerprinting and user agent analysis.

  - **`expired_at`**

    `string`, format: `date-time` — Timestamp when the session was terminated. Null if the session is still active. Set when the session expires due to reaching idle_expires_at or absolute_expires_at timeout, or when administratively revoked. Not set for user-initiated logout (see logout_at instead).

  - **`idle_expires_at`**

    `string`, format: `date-time` — Projected expiration timestamp if the session remains idle without user activity. This timestamp is recalculated with each user activity. Session will be automatically terminated at this time if no activity occurs.

  - **`last_active_at`**

    `string`, format: `date-time` — Timestamp of the most recent user activity detected in this session. Updated on each API request or user interaction. Used to determine if a session has exceeded the idle timeout threshold.

  - **`logout_at`**

    `string`, format: `date-time` — Timestamp when the user explicitly logged out from the session. Null if the user has not logged out. When set, indicates the session ended due to explicit user logout rather than timeout.

  - **`organization_id`**

    `string` — Organization ID for the user's most recently active organization within this session. This represents the primary organization context for the current session.

  - **`session_id`**

    `string` — Unique identifier for the session. System-generated read-only field used to reference this session.

  - **`status`**

    `string` — Current operational status of the session. Possible values: 'active' (session is valid and requests are allowed), 'expired' (session terminated due to idle or absolute timeout), 'revoked' (session was administratively revoked), 'logout' (user explicitly logged out). Use this to determine if the session can be used for new requests.

  - **`updated_at`**

    `string`, format: `date-time` — Timestamp indicating when the session was last updated. Updated whenever session state changes such as organization context changes or metadata updates.

  - **`user_id`**

    `string` — Unique identifier for the user who owns and is authenticated within this session.

* **`total_size`**

  `integer`, format: `int64` — Total number of sessions matching the applied filter criteria, regardless of pagination. This represents the complete result set size before pagination is applied.

**Example:**

```json
{
  "next_page_token": "eyJwYWdlIjogMiwgImxhc3RfaWQiOiAic2VzXzEyMzQ1In0=",
  "prev_page_token": "eyJwYWdlIjogMCwgImZpcnN0X2lkIjogInNlc183OTAxIn0=",
  "sessions": [
    {
      "absolute_expires_at": "2025-01-22T10:30:00Z",
      "authenticated_clients": [{}],
      "authenticated_organizations": ["org_123", "org_456"],
      "created_at": "2025-01-15T10:30:00Z",
      "device": null,
      "expired_at": "2025-01-15T12:00:00Z",
      "idle_expires_at": "2025-01-15T11:30:00Z",
      "last_active_at": "2025-01-15T10:55:30Z",
      "logout_at": "2025-01-15T14:00:00Z",
      "organization_id": "org_1234567890123456",
      "session_id": "ses_1234567890123456",
      "status": "active",
      "updated_at": "2025-01-15T10:45:00Z",
      "user_id": "usr_1234567890123456"
    }
  ],
  "total_size": 42
}
```

### sessionsUserSessionFilter

- **Type:**`object`

* **`end_time`**

  `string`, format: `date-time` — Filter to include only sessions created on or before this timestamp. Optional. Uses RFC 3339 format. Must be after start_time if both are specified.

* **`start_time`**

  `string`, format: `date-time` — Filter to include only sessions created on or after this timestamp. Optional. Uses RFC 3339 format. Useful for querying sessions within a specific time window.

* **`status`**

  `array` — Filter sessions by one or more status values. Possible values: 'active', 'expired', 'revoked', 'logout'. Leave empty to include all statuses. Multiple values use OR logic (e.g., status=\['active', 'expired'] returns sessions that are either active OR expired).

  **Items:**

  `string`

**Example:**

```json
{
  "end_time": "2025-12-31T23:59:59Z",
  "start_time": "2025-01-01T00:00:00Z",
  "status": ["active"]
}
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

### usersCreateMembershipResponse

- **Type:**`object`

* **`user`**

  `object`
  - **`create_time`**

    `string`, format: `date-time` — Timestamp when the user account was initially created. Automatically set by the server.

  - **`email`**

    `string` — Primary email address for the user. Must be unique across the environment and valid per RFC 5322.

  - **`external_id`**

    `string` — Your application's unique identifier for this organization, used to link Scalekit with your system.

  - **`id`**

    `string` — Unique system-generated identifier for the user. Immutable once created.

  - **`last_login_time`**

    `string`, format: `date-time` — Timestamp of the user's most recent successful authentication. Updated automatically.

  - **`memberships`**

    `array` — List of organization memberships. Automatically populated based on group assignments.

    **Items:**
    - **`accepted_at`**

      `string`, format: `date-time` — Timestamp when the user accepted the invitation.

    - **`created_at`**

      `string`, format: `date-time` — Timestamp when the invitation was created.

    - **`display_name`**

      `string` — Organization display name. This field stores a user-friendly name for the organization that may be different from the formal name, often used for UI display purposes.

    - **`expires_at`**

      `string`, format: `date-time` — Timestamp when the invitation expired.

    - **`inviter_email`**

      `string` — ID of the user who invited this user.

    - **`join_time`**

      `string`, format: `date-time` — Timestamp when the membership was created. Automatically set by the server.

    - **`membership_status`**

      `string`, possible values: `"ACTIVE", "INACTIVE", "PENDING_INVITE", "INVITE_EXPIRED"`

    - **`metadata`**

      `object` — Custom key-value pairs for storing additional user context. Keys (3-25 chars), values (1-256 chars).

    - **`name`**

      `string` — Organization name. This field stores the formal organization name used for identification and display purposes.

    - **`organization_id`**

      `string` — Unique identifier for the organization. Immutable and read-only.

    - **`permissions`**

      `array` — Effective permissions granted to the user within the organization (including inherited permissions from assigned roles). Lists the specific actions and access rights the user can perform.

      **Items:**

      `string`

    - **`provisioning_method`**

      `string` — How the user was provisioned. Possible values: - \`jit_using_sso\` (Just-in-time provisioning during SSO login) - \`allowed_email_domain\` (User joined via allowed email domain matching) - \`org_creator\` (User created the organization) - \`direct_provision\` (User was directly provisioned via API or SCIM) - \`invitation\` (User was invited and accepted an invitation)

    - **`roles`**

      `array`

      **Items:**
      - **`display_name`**

        `string` — Human-readable name for the role

      - **`id`**

        `string` — Role ID

      - **`name`**

        `string` — Attribute name/identifier for the role used in system operations and API calls. This should be a machine-readable identifier that follows naming conventions.

  - **`metadata`**

    `object` — Custom key-value pairs for storing additional user context. Keys (3-25 chars), values (1-256 chars).

  - **`update_time`**

    `string`, format: `date-time` — Timestamp of the last modification to the user account. Automatically updated by the server.

  - **`user_profile`**

    `object` — User's personal information including name, address, and other profile attributes.
    - **`custom_attributes`**

      `object` — Custom attributes for extended user profile data and application-specific information. This field stores business-specific user data like department, job title, security clearances, project assignments, or any other organizational attributes your application requires. Unlike system metadata, these attributes are typically managed by administrators or applications and are visible to end users for personalization and business logic. Keys must be 3-25 characters, values must be 1-256 characters, with a maximum of 20 key-value pairs.

    - **`email_verified`**

      `boolean` — Indicates if the user's email address has been verified. Automatically updated by the system.

    - **`external_identities`**

      `array` — List of external identity connections associated with the user profile.

      **Items:**
      - **`connection_id`**

        `string` — Unique identifier for the external identity connection. Immutable and read-only.

      - **`connection_provider`**

        `string`, possible values: `"OKTA", "GOOGLE", "MICROSOFT_AD", "AUTH0", "ONELOGIN", "PING_IDENTITY", "JUMPCLOUD", "CUSTOM", "GITHUB", "GITLAB", "LINKEDIN", "SALESFORCE", "MICROSOFT", "IDP_SIMULATOR", "SCALEKIT", "ADFS"` — Type of the identity provider.

      - **`connection_type`**

        `string` — Name of the external identity connection.

      - **`connection_user_id`**

        `string` — Unique identifier for the user in the external identity provider system. Immutable and read-only.

      - **`created_time`**

        `string`, format: `date-time` — Timestamp when this external identity connection was first created. Immutable and read-only.

      - **`is_social`**

        `boolean` — Indicates if the identity provider is a social provider (true) or enterprise/custom provider (false). Read-only.

      - **`last_login_time`**

        `string`, format: `date-time` — Timestamp of the user's last successful login via this external identity provider. Automatically updated by the system.

      - **`last_synced_time`**

        `string`, format: `date-time` — Timestamp of the last data synchronization for this external identity from the provider. Automatically updated by the system.

    - **`family_name`**

      `string` — The user's family name (last name or surname). This field stores the user's last name and is combined with the given name to create the full display name. The family name is used in formal communications, user listings, and organizational directories throughout the system. Maximum 255 characters allowed.

    - **`gender`**

      `string` — The user's gender identity information. This field stores the user's gender identity for personalization, compliance reporting, or organizational analytics purposes. This field supports any string value to accommodate diverse gender identities and should be handled with appropriate privacy considerations according to your organization's policies and applicable regulations.

    - **`given_name`**

      `string` — The user's given name (first name). This field stores the user's first name and is used for personalization, display purposes, and when generating the full display name. The given name appears in user interfaces, formal communications, and user listings throughout the system. Maximum 255 characters allowed.

    - **`groups`**

      `array` — The list of group names the user belongs to within the organization. This field stores the user's group memberships for role-based access control, team assignments, and organizational structure. Groups are typically used for permission management, collaborative access, and organizational hierarchy. Each group name represents a distinct organizational unit or team that the user is associated with.

      **Items:**

      `string`

    - **`id`**

      `string` — Unique system-generated identifier for the user profile. Immutable and read-only.

    - **`locale`**

      `string` — The user's preferred language and region settings using BCP-47 format codes. This field customizes the user's experience with localized content, date formats, number formatting, and UI language throughout the system. When not specified, the user inherits the organization's default locale settings. Common values include \`en-US\`, \`en-GB\`, \`fr-FR\`, \`de-DE\`, and \`es-ES\`.

    - **`metadata`**

      `object` — Raw attributes received from identity providers during authentication. This field stores the original user profile data as received from external IdP systems (SAML, OIDC, etc.) including provider-specific claims and attributes. These fields preserve the complete set of attributes received from the identity source and are used for mapping, synchronization, and audit purposes. Keys must be 3-25 characters, values must be 1-256 characters, with a maximum of 20 key-value pairs.

    - **`name`**

      `string` — The user's complete display name in formatted form. This field stores the full name as a single string and is typically used when you want to set the complete name rather than using separate given and family names. This name appears in user interfaces, reports, directory listings, and anywhere a formatted display name is needed. This field serves as a formatted display name that complements the individual given_name and family_name fields.

    - **`phone_number`**

      `string` — The user's phone number in E.164 international format. This field stores the phone number for user contact and identification purposes. The phone number must include the country code and be formatted according to E.164 standards (e.g., \`+1\` for US numbers). This field is optional.

    - **`phone_number_verified`**

      `boolean` — Indicates if the user's phone number has been verified. Automatically updated by the system.

    - **`picture`**

      `string` — The URL to the user's profile picture or avatar image. This field stores the location of the user's profile photo that appears in user interfaces, directory listings, and collaborative features throughout the system. The URL should point to a publicly accessible image file. Supported formats typically include JPEG, PNG, and GIF. This image is used for visual identification and personalization across the platform.

    - **`preferred_username`**

      `string` — The user's preferred username for display and identification purposes. This field stores a custom username that the user prefers to be known by, which may differ from their email or formal name. This username appears in user interfaces, mentions, informal communications, and collaborative features throughout the system. Maximum 512 characters allowed.

**Example:**

```json
{
  "user": {
    "create_time": "",
    "email": "user@example.com",
    "external_id": "ext_12345a67b89c",
    "id": "usr_1234abcd5678efgh",
    "last_login_time": "",
    "memberships": [{}],
    "metadata": {
      "department": "engineering",
      "location": "nyc-office"
    },
    "update_time": "",
    "user_profile": null
  }
}
```

### usersCreateUser

- **Type:**`object`

* **`email`**

  `string` — Primary email address for the user. Must be unique across the environment and valid per RFC 5322.

* **`external_id`**

  `string` — Your application's unique identifier for this organization, used to link Scalekit with your system.

* **`membership`**

  `object` — List of organization memberships. Automatically populated based on group assignments.
  - **`inviter_email`**

    `string` — Email address of the user who invited this member. Must be a valid email address.

  - **`metadata`**

    `object` — Custom key-value pairs for storing additional user context. Keys (3-25 chars), values (1-256 chars).

  - **`roles`**

    `array` — Role to assign to the user within the organization

    **Items:**
    - **`display_name`**

      `string` — Human-readable name for the role

    - **`id`**

      `string` — Role ID

    - **`name`**

      `string` — Attribute name/identifier for the role used in system operations and API calls. This should be a machine-readable identifier that follows naming conventions.

* **`metadata`**

  `object` — Custom key-value pairs for storing additional user context. Keys (3-25 chars), values (1-256 chars).

* **`user_profile`**

  `object` — User's personal information including name, address, and other profile attributes.
  - **`custom_attributes`**

    `object` — Custom attributes for extended user profile data. Keys (3-25 chars), values (1-256 chars).

  - **`family_name`**

    `string` — User's family name. Maximum 255 characters.

  - **`gender`**

    `string` — User's gender identity.

  - **`given_name`**

    `string` — User's given name. Maximum 255 characters.

  - **`groups`**

    `array` — List of group names the user belongs to. Each group name must be 1-250 characters

    **Items:**

    `string`

  - **`locale`**

    `string` — User's localization preference in BCP-47 format. Defaults to organization settings.

  - **`metadata`**

    `object` — System-managed key-value pairs for internal tracking. Keys (3-25 chars), values (1-256 chars).

  - **`name`**

    `string` — Full name in display format. Typically combines first_name and last_name.

  - **`phone_number`**

    `string` — Phone number in E.164 international format. Required for SMS-based authentication.

  - **`picture`**

    `string` — URL to the user's profile picture or avatar.

  - **`preferred_username`**

    `string` — User's preferred username for display purposes.

**Example:**

```json
{
  "email": "user@example.com",
  "external_id": "ext_12345a67b89c",
  "membership": {
    "inviter_email": "john.doe@example.com",
    "metadata": {
      "department": "engineering",
      "location": "nyc-office"
    },
    "roles": [
      {
        "name": "admin"
      }
    ]
  },
  "metadata": {
    "department": "engineering",
    "location": "nyc-office"
  },
  "user_profile": {
    "custom_attributes": {
      "department": "engineering",
      "security_clearance": "level2"
    },
    "family_name": "Doe",
    "gender": "male",
    "given_name": "John",
    "groups": ["engineering", "managers"],
    "locale": "en-US",
    "metadata": {
      "account_status": "active",
      "signup_source": "mobile_app"
    },
    "name": "John Michael Doe",
    "phone_number": "+14155552671",
    "picture": "https://example.com/avatar.jpg",
    "preferred_username": "John Michael Doe"
  }
}
```

### usersCreateUserAndMembershipResponse

- **Type:**`object`

* **`user`**

  `object`
  - **`create_time`**

    `string`, format: `date-time` — Timestamp when the user account was initially created. Automatically set by the server.

  - **`email`**

    `string` — Primary email address for the user. Must be unique across the environment and valid per RFC 5322.

  - **`external_id`**

    `string` — Your application's unique identifier for this organization, used to link Scalekit with your system.

  - **`id`**

    `string` — Unique system-generated identifier for the user. Immutable once created.

  - **`last_login_time`**

    `string`, format: `date-time` — Timestamp of the user's most recent successful authentication. Updated automatically.

  - **`memberships`**

    `array` — List of organization memberships. Automatically populated based on group assignments.

    **Items:**
    - **`accepted_at`**

      `string`, format: `date-time` — Timestamp when the user accepted the invitation.

    - **`created_at`**

      `string`, format: `date-time` — Timestamp when the invitation was created.

    - **`display_name`**

      `string` — Organization display name. This field stores a user-friendly name for the organization that may be different from the formal name, often used for UI display purposes.

    - **`expires_at`**

      `string`, format: `date-time` — Timestamp when the invitation expired.

    - **`inviter_email`**

      `string` — ID of the user who invited this user.

    - **`join_time`**

      `string`, format: `date-time` — Timestamp when the membership was created. Automatically set by the server.

    - **`membership_status`**

      `string`, possible values: `"ACTIVE", "INACTIVE", "PENDING_INVITE", "INVITE_EXPIRED"`

    - **`metadata`**

      `object` — Custom key-value pairs for storing additional user context. Keys (3-25 chars), values (1-256 chars).

    - **`name`**

      `string` — Organization name. This field stores the formal organization name used for identification and display purposes.

    - **`organization_id`**

      `string` — Unique identifier for the organization. Immutable and read-only.

    - **`permissions`**

      `array` — Effective permissions granted to the user within the organization (including inherited permissions from assigned roles). Lists the specific actions and access rights the user can perform.

      **Items:**

      `string`

    - **`provisioning_method`**

      `string` — How the user was provisioned. Possible values: - \`jit_using_sso\` (Just-in-time provisioning during SSO login) - \`allowed_email_domain\` (User joined via allowed email domain matching) - \`org_creator\` (User created the organization) - \`direct_provision\` (User was directly provisioned via API or SCIM) - \`invitation\` (User was invited and accepted an invitation)

    - **`roles`**

      `array`

      **Items:**
      - **`display_name`**

        `string` — Human-readable name for the role

      - **`id`**

        `string` — Role ID

      - **`name`**

        `string` — Attribute name/identifier for the role used in system operations and API calls. This should be a machine-readable identifier that follows naming conventions.

  - **`metadata`**

    `object` — Custom key-value pairs for storing additional user context. Keys (3-25 chars), values (1-256 chars).

  - **`update_time`**

    `string`, format: `date-time` — Timestamp of the last modification to the user account. Automatically updated by the server.

  - **`user_profile`**

    `object` — User's personal information including name, address, and other profile attributes.
    - **`custom_attributes`**

      `object` — Custom attributes for extended user profile data and application-specific information. This field stores business-specific user data like department, job title, security clearances, project assignments, or any other organizational attributes your application requires. Unlike system metadata, these attributes are typically managed by administrators or applications and are visible to end users for personalization and business logic. Keys must be 3-25 characters, values must be 1-256 characters, with a maximum of 20 key-value pairs.

    - **`email_verified`**

      `boolean` — Indicates if the user's email address has been verified. Automatically updated by the system.

    - **`external_identities`**

      `array` — List of external identity connections associated with the user profile.

      **Items:**
      - **`connection_id`**

        `string` — Unique identifier for the external identity connection. Immutable and read-only.

      - **`connection_provider`**

        `string`, possible values: `"OKTA", "GOOGLE", "MICROSOFT_AD", "AUTH0", "ONELOGIN", "PING_IDENTITY", "JUMPCLOUD", "CUSTOM", "GITHUB", "GITLAB", "LINKEDIN", "SALESFORCE", "MICROSOFT", "IDP_SIMULATOR", "SCALEKIT", "ADFS"` — Type of the identity provider.

      - **`connection_type`**

        `string` — Name of the external identity connection.

      - **`connection_user_id`**

        `string` — Unique identifier for the user in the external identity provider system. Immutable and read-only.

      - **`created_time`**

        `string`, format: `date-time` — Timestamp when this external identity connection was first created. Immutable and read-only.

      - **`is_social`**

        `boolean` — Indicates if the identity provider is a social provider (true) or enterprise/custom provider (false). Read-only.

      - **`last_login_time`**

        `string`, format: `date-time` — Timestamp of the user's last successful login via this external identity provider. Automatically updated by the system.

      - **`last_synced_time`**

        `string`, format: `date-time` — Timestamp of the last data synchronization for this external identity from the provider. Automatically updated by the system.

    - **`family_name`**

      `string` — The user's family name (last name or surname). This field stores the user's last name and is combined with the given name to create the full display name. The family name is used in formal communications, user listings, and organizational directories throughout the system. Maximum 255 characters allowed.

    - **`gender`**

      `string` — The user's gender identity information. This field stores the user's gender identity for personalization, compliance reporting, or organizational analytics purposes. This field supports any string value to accommodate diverse gender identities and should be handled with appropriate privacy considerations according to your organization's policies and applicable regulations.

    - **`given_name`**

      `string` — The user's given name (first name). This field stores the user's first name and is used for personalization, display purposes, and when generating the full display name. The given name appears in user interfaces, formal communications, and user listings throughout the system. Maximum 255 characters allowed.

    - **`groups`**

      `array` — The list of group names the user belongs to within the organization. This field stores the user's group memberships for role-based access control, team assignments, and organizational structure. Groups are typically used for permission management, collaborative access, and organizational hierarchy. Each group name represents a distinct organizational unit or team that the user is associated with.

      **Items:**

      `string`

    - **`id`**

      `string` — Unique system-generated identifier for the user profile. Immutable and read-only.

    - **`locale`**

      `string` — The user's preferred language and region settings using BCP-47 format codes. This field customizes the user's experience with localized content, date formats, number formatting, and UI language throughout the system. When not specified, the user inherits the organization's default locale settings. Common values include \`en-US\`, \`en-GB\`, \`fr-FR\`, \`de-DE\`, and \`es-ES\`.

    - **`metadata`**

      `object` — Raw attributes received from identity providers during authentication. This field stores the original user profile data as received from external IdP systems (SAML, OIDC, etc.) including provider-specific claims and attributes. These fields preserve the complete set of attributes received from the identity source and are used for mapping, synchronization, and audit purposes. Keys must be 3-25 characters, values must be 1-256 characters, with a maximum of 20 key-value pairs.

    - **`name`**

      `string` — The user's complete display name in formatted form. This field stores the full name as a single string and is typically used when you want to set the complete name rather than using separate given and family names. This name appears in user interfaces, reports, directory listings, and anywhere a formatted display name is needed. This field serves as a formatted display name that complements the individual given_name and family_name fields.

    - **`phone_number`**

      `string` — The user's phone number in E.164 international format. This field stores the phone number for user contact and identification purposes. The phone number must include the country code and be formatted according to E.164 standards (e.g., \`+1\` for US numbers). This field is optional.

    - **`phone_number_verified`**

      `boolean` — Indicates if the user's phone number has been verified. Automatically updated by the system.

    - **`picture`**

      `string` — The URL to the user's profile picture or avatar image. This field stores the location of the user's profile photo that appears in user interfaces, directory listings, and collaborative features throughout the system. The URL should point to a publicly accessible image file. Supported formats typically include JPEG, PNG, and GIF. This image is used for visual identification and personalization across the platform.

    - **`preferred_username`**

      `string` — The user's preferred username for display and identification purposes. This field stores a custom username that the user prefers to be known by, which may differ from their email or formal name. This username appears in user interfaces, mentions, informal communications, and collaborative features throughout the system. Maximum 512 characters allowed.

**Example:**

```json
{
  "user": {
    "create_time": "",
    "email": "user@example.com",
    "external_id": "ext_12345a67b89c",
    "id": "usr_1234abcd5678efgh",
    "last_login_time": "",
    "memberships": [{}],
    "metadata": {
      "department": "engineering",
      "location": "nyc-office"
    },
    "update_time": "",
    "user_profile": null
  }
}
```

### usersCreateUserProfile

- **Type:**`object`

* **`custom_attributes`**

  `object` — Custom attributes for extended user profile data. Keys (3-25 chars), values (1-256 chars).

* **`family_name`**

  `string` — User's family name. Maximum 255 characters.

* **`gender`**

  `string` — User's gender identity.

* **`given_name`**

  `string` — User's given name. Maximum 255 characters.

* **`groups`**

  `array` — List of group names the user belongs to. Each group name must be 1-250 characters

  **Items:**

  `string`

* **`locale`**

  `string` — User's localization preference in BCP-47 format. Defaults to organization settings.

* **`metadata`**

  `object` — System-managed key-value pairs for internal tracking. Keys (3-25 chars), values (1-256 chars).

* **`name`**

  `string` — Full name in display format. Typically combines first_name and last_name.

* **`phone_number`**

  `string` — Phone number in E.164 international format. Required for SMS-based authentication.

* **`picture`**

  `string` — URL to the user's profile picture or avatar.

* **`preferred_username`**

  `string` — User's preferred username for display purposes.

**Example:**

```json
{
  "custom_attributes": {
    "department": "engineering",
    "security_clearance": "level2"
  },
  "family_name": "Doe",
  "gender": "male",
  "given_name": "John",
  "groups": ["engineering", "managers"],
  "locale": "en-US",
  "metadata": {
    "account_status": "active",
    "signup_source": "mobile_app"
  },
  "name": "John Michael Doe",
  "phone_number": "+14155552671",
  "picture": "https://example.com/avatar.jpg",
  "preferred_username": "John Michael Doe"
}
```

### usersGetUserResponse

- **Type:**`object`

* **`user`**

  `object`
  - **`create_time`**

    `string`, format: `date-time` — Timestamp when the user account was initially created. Automatically set by the server.

  - **`email`**

    `string` — Primary email address for the user. Must be unique across the environment and valid per RFC 5322.

  - **`external_id`**

    `string` — Your application's unique identifier for this organization, used to link Scalekit with your system.

  - **`id`**

    `string` — Unique system-generated identifier for the user. Immutable once created.

  - **`last_login_time`**

    `string`, format: `date-time` — Timestamp of the user's most recent successful authentication. Updated automatically.

  - **`memberships`**

    `array` — List of organization memberships. Automatically populated based on group assignments.

    **Items:**
    - **`accepted_at`**

      `string`, format: `date-time` — Timestamp when the user accepted the invitation.

    - **`created_at`**

      `string`, format: `date-time` — Timestamp when the invitation was created.

    - **`display_name`**

      `string` — Organization display name. This field stores a user-friendly name for the organization that may be different from the formal name, often used for UI display purposes.

    - **`expires_at`**

      `string`, format: `date-time` — Timestamp when the invitation expired.

    - **`inviter_email`**

      `string` — ID of the user who invited this user.

    - **`join_time`**

      `string`, format: `date-time` — Timestamp when the membership was created. Automatically set by the server.

    - **`membership_status`**

      `string`, possible values: `"ACTIVE", "INACTIVE", "PENDING_INVITE", "INVITE_EXPIRED"`

    - **`metadata`**

      `object` — Custom key-value pairs for storing additional user context. Keys (3-25 chars), values (1-256 chars).

    - **`name`**

      `string` — Organization name. This field stores the formal organization name used for identification and display purposes.

    - **`organization_id`**

      `string` — Unique identifier for the organization. Immutable and read-only.

    - **`permissions`**

      `array` — Effective permissions granted to the user within the organization (including inherited permissions from assigned roles). Lists the specific actions and access rights the user can perform.

      **Items:**

      `string`

    - **`provisioning_method`**

      `string` — How the user was provisioned. Possible values: - \`jit_using_sso\` (Just-in-time provisioning during SSO login) - \`allowed_email_domain\` (User joined via allowed email domain matching) - \`org_creator\` (User created the organization) - \`direct_provision\` (User was directly provisioned via API or SCIM) - \`invitation\` (User was invited and accepted an invitation)

    - **`roles`**

      `array`

      **Items:**
      - **`display_name`**

        `string` — Human-readable name for the role

      - **`id`**

        `string` — Role ID

      - **`name`**

        `string` — Attribute name/identifier for the role used in system operations and API calls. This should be a machine-readable identifier that follows naming conventions.

  - **`metadata`**

    `object` — Custom key-value pairs for storing additional user context. Keys (3-25 chars), values (1-256 chars).

  - **`update_time`**

    `string`, format: `date-time` — Timestamp of the last modification to the user account. Automatically updated by the server.

  - **`user_profile`**

    `object` — User's personal information including name, address, and other profile attributes.
    - **`custom_attributes`**

      `object` — Custom attributes for extended user profile data and application-specific information. This field stores business-specific user data like department, job title, security clearances, project assignments, or any other organizational attributes your application requires. Unlike system metadata, these attributes are typically managed by administrators or applications and are visible to end users for personalization and business logic. Keys must be 3-25 characters, values must be 1-256 characters, with a maximum of 20 key-value pairs.

    - **`email_verified`**

      `boolean` — Indicates if the user's email address has been verified. Automatically updated by the system.

    - **`external_identities`**

      `array` — List of external identity connections associated with the user profile.

      **Items:**
      - **`connection_id`**

        `string` — Unique identifier for the external identity connection. Immutable and read-only.

      - **`connection_provider`**

        `string`, possible values: `"OKTA", "GOOGLE", "MICROSOFT_AD", "AUTH0", "ONELOGIN", "PING_IDENTITY", "JUMPCLOUD", "CUSTOM", "GITHUB", "GITLAB", "LINKEDIN", "SALESFORCE", "MICROSOFT", "IDP_SIMULATOR", "SCALEKIT", "ADFS"` — Type of the identity provider.

      - **`connection_type`**

        `string` — Name of the external identity connection.

      - **`connection_user_id`**

        `string` — Unique identifier for the user in the external identity provider system. Immutable and read-only.

      - **`created_time`**

        `string`, format: `date-time` — Timestamp when this external identity connection was first created. Immutable and read-only.

      - **`is_social`**

        `boolean` — Indicates if the identity provider is a social provider (true) or enterprise/custom provider (false). Read-only.

      - **`last_login_time`**

        `string`, format: `date-time` — Timestamp of the user's last successful login via this external identity provider. Automatically updated by the system.

      - **`last_synced_time`**

        `string`, format: `date-time` — Timestamp of the last data synchronization for this external identity from the provider. Automatically updated by the system.

    - **`family_name`**

      `string` — The user's family name (last name or surname). This field stores the user's last name and is combined with the given name to create the full display name. The family name is used in formal communications, user listings, and organizational directories throughout the system. Maximum 255 characters allowed.

    - **`gender`**

      `string` — The user's gender identity information. This field stores the user's gender identity for personalization, compliance reporting, or organizational analytics purposes. This field supports any string value to accommodate diverse gender identities and should be handled with appropriate privacy considerations according to your organization's policies and applicable regulations.

    - **`given_name`**

      `string` — The user's given name (first name). This field stores the user's first name and is used for personalization, display purposes, and when generating the full display name. The given name appears in user interfaces, formal communications, and user listings throughout the system. Maximum 255 characters allowed.

    - **`groups`**

      `array` — The list of group names the user belongs to within the organization. This field stores the user's group memberships for role-based access control, team assignments, and organizational structure. Groups are typically used for permission management, collaborative access, and organizational hierarchy. Each group name represents a distinct organizational unit or team that the user is associated with.

      **Items:**

      `string`

    - **`id`**

      `string` — Unique system-generated identifier for the user profile. Immutable and read-only.

    - **`locale`**

      `string` — The user's preferred language and region settings using BCP-47 format codes. This field customizes the user's experience with localized content, date formats, number formatting, and UI language throughout the system. When not specified, the user inherits the organization's default locale settings. Common values include \`en-US\`, \`en-GB\`, \`fr-FR\`, \`de-DE\`, and \`es-ES\`.

    - **`metadata`**

      `object` — Raw attributes received from identity providers during authentication. This field stores the original user profile data as received from external IdP systems (SAML, OIDC, etc.) including provider-specific claims and attributes. These fields preserve the complete set of attributes received from the identity source and are used for mapping, synchronization, and audit purposes. Keys must be 3-25 characters, values must be 1-256 characters, with a maximum of 20 key-value pairs.

    - **`name`**

      `string` — The user's complete display name in formatted form. This field stores the full name as a single string and is typically used when you want to set the complete name rather than using separate given and family names. This name appears in user interfaces, reports, directory listings, and anywhere a formatted display name is needed. This field serves as a formatted display name that complements the individual given_name and family_name fields.

    - **`phone_number`**

      `string` — The user's phone number in E.164 international format. This field stores the phone number for user contact and identification purposes. The phone number must include the country code and be formatted according to E.164 standards (e.g., \`+1\` for US numbers). This field is optional.

    - **`phone_number_verified`**

      `boolean` — Indicates if the user's phone number has been verified. Automatically updated by the system.

    - **`picture`**

      `string` — The URL to the user's profile picture or avatar image. This field stores the location of the user's profile photo that appears in user interfaces, directory listings, and collaborative features throughout the system. The URL should point to a publicly accessible image file. Supported formats typically include JPEG, PNG, and GIF. This image is used for visual identification and personalization across the platform.

    - **`preferred_username`**

      `string` — The user's preferred username for display and identification purposes. This field stores a custom username that the user prefers to be known by, which may differ from their email or formal name. This username appears in user interfaces, mentions, informal communications, and collaborative features throughout the system. Maximum 512 characters allowed.

**Example:**

```json
{
  "user": {
    "create_time": "",
    "email": "user@example.com",
    "external_id": "ext_12345a67b89c",
    "id": "usr_1234abcd5678efgh",
    "last_login_time": "",
    "memberships": [{}],
    "metadata": {
      "department": "engineering",
      "location": "nyc-office"
    },
    "update_time": "",
    "user_profile": null
  }
}
```

### usersInvite

- **Type:**`object`

* **`created_at`**

  `string`, format: `date-time` — Timestamp when the invite was originally created.

* **`expires_at`**

  `string`, format: `date-time` — The time at which the invite expires.

* **`inviter_email`**

  `string` — Identifier of the user or system that initiated the invite.

* **`organization_id`**

  `string` — The organization to which the invite belongs.

* **`resent_at`**

  `string`, format: `date-time` — Timestamp when the invite was last resent, if applicable.

* **`resent_count`**

  `integer`, format: `int32` — Number of times the invite has been resent.

* **`status`**

  `string` — Current status of the invite (e.g., pending, accepted, expired, revoked).

* **`user_id`**

  `string` — User ID to whom the invite is sent. May be empty if the user has not signed up yet.

**Example:**

```json
{
  "created_at": "2025-07-10T08:00:00Z",
  "expires_at": "2025-12-31T23:59:59Z",
  "inviter_email": "admin@example.com",
  "organization_id": "org_987654321",
  "resent_at": "2025-07-15T09:30:00Z",
  "resent_count": 2,
  "status": "pending_invite",
  "user_id": "usr_123456"
}
```

### usersListOrganizationUsersResponse

- **Type:**`object`

* **`next_page_token`**

  `string` — Opaque token for retrieving the next page of results. Empty if there are no more pages.

* **`prev_page_token`**

  `string` — Opaque token for retrieving the previous page of results. Empty for the first page.

* **`total_size`**

  `integer`, format: `int64` — Total number of users matching the request criteria, regardless of pagination.

* **`users`**

  `array` — List of user objects for the current page. May contain fewer entries than requested page_size.

  **Items:**
  - **`create_time`**

    `string`, format: `date-time` — Timestamp when the user account was initially created. Automatically set by the server.

  - **`email`**

    `string` — Primary email address for the user. Must be unique across the environment and valid per RFC 5322.

  - **`external_id`**

    `string` — Your application's unique identifier for this organization, used to link Scalekit with your system.

  - **`id`**

    `string` — Unique system-generated identifier for the user. Immutable once created.

  - **`last_login_time`**

    `string`, format: `date-time` — Timestamp of the user's most recent successful authentication. Updated automatically.

  - **`memberships`**

    `array` — List of organization memberships. Automatically populated based on group assignments.

    **Items:**
    - **`accepted_at`**

      `string`, format: `date-time` — Timestamp when the user accepted the invitation.

    - **`created_at`**

      `string`, format: `date-time` — Timestamp when the invitation was created.

    - **`display_name`**

      `string` — Organization display name. This field stores a user-friendly name for the organization that may be different from the formal name, often used for UI display purposes.

    - **`expires_at`**

      `string`, format: `date-time` — Timestamp when the invitation expired.

    - **`inviter_email`**

      `string` — ID of the user who invited this user.

    - **`join_time`**

      `string`, format: `date-time` — Timestamp when the membership was created. Automatically set by the server.

    - **`membership_status`**

      `string`, possible values: `"ACTIVE", "INACTIVE", "PENDING_INVITE", "INVITE_EXPIRED"`

    - **`metadata`**

      `object` — Custom key-value pairs for storing additional user context. Keys (3-25 chars), values (1-256 chars).

    - **`name`**

      `string` — Organization name. This field stores the formal organization name used for identification and display purposes.

    - **`organization_id`**

      `string` — Unique identifier for the organization. Immutable and read-only.

    - **`permissions`**

      `array` — Effective permissions granted to the user within the organization (including inherited permissions from assigned roles). Lists the specific actions and access rights the user can perform.

      **Items:**

      `string`

    - **`provisioning_method`**

      `string` — How the user was provisioned. Possible values: - \`jit_using_sso\` (Just-in-time provisioning during SSO login) - \`allowed_email_domain\` (User joined via allowed email domain matching) - \`org_creator\` (User created the organization) - \`direct_provision\` (User was directly provisioned via API or SCIM) - \`invitation\` (User was invited and accepted an invitation)

    - **`roles`**

      `array`

      **Items:**
      - **`display_name`**

        `string` — Human-readable name for the role

      - **`id`**

        `string` — Role ID

      - **`name`**

        `string` — Attribute name/identifier for the role used in system operations and API calls. This should be a machine-readable identifier that follows naming conventions.

  - **`metadata`**

    `object` — Custom key-value pairs for storing additional user context. Keys (3-25 chars), values (1-256 chars).

  - **`update_time`**

    `string`, format: `date-time` — Timestamp of the last modification to the user account. Automatically updated by the server.

  - **`user_profile`**

    `object` — User's personal information including name, address, and other profile attributes.
    - **`custom_attributes`**

      `object` — Custom attributes for extended user profile data and application-specific information. This field stores business-specific user data like department, job title, security clearances, project assignments, or any other organizational attributes your application requires. Unlike system metadata, these attributes are typically managed by administrators or applications and are visible to end users for personalization and business logic. Keys must be 3-25 characters, values must be 1-256 characters, with a maximum of 20 key-value pairs.

    - **`email_verified`**

      `boolean` — Indicates if the user's email address has been verified. Automatically updated by the system.

    - **`external_identities`**

      `array` — List of external identity connections associated with the user profile.

      **Items:**
      - **`connection_id`**

        `string` — Unique identifier for the external identity connection. Immutable and read-only.

      - **`connection_provider`**

        `string`, possible values: `"OKTA", "GOOGLE", "MICROSOFT_AD", "AUTH0", "ONELOGIN", "PING_IDENTITY", "JUMPCLOUD", "CUSTOM", "GITHUB", "GITLAB", "LINKEDIN", "SALESFORCE", "MICROSOFT", "IDP_SIMULATOR", "SCALEKIT", "ADFS"` — Type of the identity provider.

      - **`connection_type`**

        `string` — Name of the external identity connection.

      - **`connection_user_id`**

        `string` — Unique identifier for the user in the external identity provider system. Immutable and read-only.

      - **`created_time`**

        `string`, format: `date-time` — Timestamp when this external identity connection was first created. Immutable and read-only.

      - **`is_social`**

        `boolean` — Indicates if the identity provider is a social provider (true) or enterprise/custom provider (false). Read-only.

      - **`last_login_time`**

        `string`, format: `date-time` — Timestamp of the user's last successful login via this external identity provider. Automatically updated by the system.

      - **`last_synced_time`**

        `string`, format: `date-time` — Timestamp of the last data synchronization for this external identity from the provider. Automatically updated by the system.

    - **`family_name`**

      `string` — The user's family name (last name or surname). This field stores the user's last name and is combined with the given name to create the full display name. The family name is used in formal communications, user listings, and organizational directories throughout the system. Maximum 255 characters allowed.

    - **`gender`**

      `string` — The user's gender identity information. This field stores the user's gender identity for personalization, compliance reporting, or organizational analytics purposes. This field supports any string value to accommodate diverse gender identities and should be handled with appropriate privacy considerations according to your organization's policies and applicable regulations.

    - **`given_name`**

      `string` — The user's given name (first name). This field stores the user's first name and is used for personalization, display purposes, and when generating the full display name. The given name appears in user interfaces, formal communications, and user listings throughout the system. Maximum 255 characters allowed.

    - **`groups`**

      `array` — The list of group names the user belongs to within the organization. This field stores the user's group memberships for role-based access control, team assignments, and organizational structure. Groups are typically used for permission management, collaborative access, and organizational hierarchy. Each group name represents a distinct organizational unit or team that the user is associated with.

      **Items:**

      `string`

    - **`id`**

      `string` — Unique system-generated identifier for the user profile. Immutable and read-only.

    - **`locale`**

      `string` — The user's preferred language and region settings using BCP-47 format codes. This field customizes the user's experience with localized content, date formats, number formatting, and UI language throughout the system. When not specified, the user inherits the organization's default locale settings. Common values include \`en-US\`, \`en-GB\`, \`fr-FR\`, \`de-DE\`, and \`es-ES\`.

    - **`metadata`**

      `object` — Raw attributes received from identity providers during authentication. This field stores the original user profile data as received from external IdP systems (SAML, OIDC, etc.) including provider-specific claims and attributes. These fields preserve the complete set of attributes received from the identity source and are used for mapping, synchronization, and audit purposes. Keys must be 3-25 characters, values must be 1-256 characters, with a maximum of 20 key-value pairs.

    - **`name`**

      `string` — The user's complete display name in formatted form. This field stores the full name as a single string and is typically used when you want to set the complete name rather than using separate given and family names. This name appears in user interfaces, reports, directory listings, and anywhere a formatted display name is needed. This field serves as a formatted display name that complements the individual given_name and family_name fields.

    - **`phone_number`**

      `string` — The user's phone number in E.164 international format. This field stores the phone number for user contact and identification purposes. The phone number must include the country code and be formatted according to E.164 standards (e.g., \`+1\` for US numbers). This field is optional.

    - **`phone_number_verified`**

      `boolean` — Indicates if the user's phone number has been verified. Automatically updated by the system.

    - **`picture`**

      `string` — The URL to the user's profile picture or avatar image. This field stores the location of the user's profile photo that appears in user interfaces, directory listings, and collaborative features throughout the system. The URL should point to a publicly accessible image file. Supported formats typically include JPEG, PNG, and GIF. This image is used for visual identification and personalization across the platform.

    - **`preferred_username`**

      `string` — The user's preferred username for display and identification purposes. This field stores a custom username that the user prefers to be known by, which may differ from their email or formal name. This username appears in user interfaces, mentions, informal communications, and collaborative features throughout the system. Maximum 512 characters allowed.

**Example:**

```json
{
  "next_page_token": "eyJwYWdlIjogMiwgImxhc3RfaWQiOiAidXNyXzEyMzQ1In0=",
  "prev_page_token": "eyJwYWdlIjogMCwgImZpcnN0X2lkIjogInVzcl85ODc2NSJ9",
  "total_size": 1042,
  "users": [
    {
      "create_time": "",
      "email": "user@example.com",
      "external_id": "ext_12345a67b89c",
      "id": "usr_1234abcd5678efgh",
      "last_login_time": "",
      "memberships": [{}],
      "metadata": {
        "department": "engineering",
        "location": "nyc-office"
      },
      "update_time": "",
      "user_profile": null
    }
  ]
}
```

### usersListUserPermissionsResponse

- **Type:**`object`

* **`permissions`**

  `array` — List of permissions the user has access to

  **Items:**
  - **`description`**

    `string` — Description of what the permission allows

  - **`id`**

    `string` — Unique identifier for the permission

  - **`name`**

    `string` — Unique name identifier for the permission

**Example:**

```json
{
  "permissions": [
    {
      "description": "Allows creating new user accounts",
      "id": "perm_1234abcd5678efgh",
      "name": "users:create"
    }
  ]
}
```

### usersListUserRolesResponse

- **Type:**`object`

* **`roles`**

  `array` — List of roles assigned to the user

  **Items:**
  - **`display_name`**

    `string` — Human-readable name for the role

  - **`id`**

    `string` — Role ID

  - **`name`**

    `string` — Attribute name/identifier for the role used in system operations and API calls. This should be a machine-readable identifier that follows naming conventions.

**Example:**

```json
{
  "roles": [
    {
      "display_name": "Dev Team",
      "id": "role_79643236410327240",
      "name": "team_dev"
    }
  ]
}
```

### usersListUsersResponse

- **Type:**`object`

* **`next_page_token`**

  `string` — Token for retrieving the next page of results. Empty if there are no more pages.

* **`prev_page_token`**

  `string` — Token for retrieving the previous page of results. Empty if this is the first page.

* **`total_size`**

  `integer`, format: `int64` — Total number of users matching the request criteria, regardless of pagination.

* **`users`**

  `array` — List of users.

  **Items:**
  - **`create_time`**

    `string`, format: `date-time` — Timestamp when the user account was initially created. Automatically set by the server.

  - **`email`**

    `string` — Primary email address for the user. Must be unique across the environment and valid per RFC 5322.

  - **`external_id`**

    `string` — Your application's unique identifier for this organization, used to link Scalekit with your system.

  - **`id`**

    `string` — Unique system-generated identifier for the user. Immutable once created.

  - **`last_login_time`**

    `string`, format: `date-time` — Timestamp of the user's most recent successful authentication. Updated automatically.

  - **`memberships`**

    `array` — List of organization memberships. Automatically populated based on group assignments.

    **Items:**
    - **`accepted_at`**

      `string`, format: `date-time` — Timestamp when the user accepted the invitation.

    - **`created_at`**

      `string`, format: `date-time` — Timestamp when the invitation was created.

    - **`display_name`**

      `string` — Organization display name. This field stores a user-friendly name for the organization that may be different from the formal name, often used for UI display purposes.

    - **`expires_at`**

      `string`, format: `date-time` — Timestamp when the invitation expired.

    - **`inviter_email`**

      `string` — ID of the user who invited this user.

    - **`join_time`**

      `string`, format: `date-time` — Timestamp when the membership was created. Automatically set by the server.

    - **`membership_status`**

      `string`, possible values: `"ACTIVE", "INACTIVE", "PENDING_INVITE", "INVITE_EXPIRED"`

    - **`metadata`**

      `object` — Custom key-value pairs for storing additional user context. Keys (3-25 chars), values (1-256 chars).

    - **`name`**

      `string` — Organization name. This field stores the formal organization name used for identification and display purposes.

    - **`organization_id`**

      `string` — Unique identifier for the organization. Immutable and read-only.

    - **`permissions`**

      `array` — Effective permissions granted to the user within the organization (including inherited permissions from assigned roles). Lists the specific actions and access rights the user can perform.

      **Items:**

      `string`

    - **`provisioning_method`**

      `string` — How the user was provisioned. Possible values: - \`jit_using_sso\` (Just-in-time provisioning during SSO login) - \`allowed_email_domain\` (User joined via allowed email domain matching) - \`org_creator\` (User created the organization) - \`direct_provision\` (User was directly provisioned via API or SCIM) - \`invitation\` (User was invited and accepted an invitation)

    - **`roles`**

      `array`

      **Items:**
      - **`display_name`**

        `string` — Human-readable name for the role

      - **`id`**

        `string` — Role ID

      - **`name`**

        `string` — Attribute name/identifier for the role used in system operations and API calls. This should be a machine-readable identifier that follows naming conventions.

  - **`metadata`**

    `object` — Custom key-value pairs for storing additional user context. Keys (3-25 chars), values (1-256 chars).

  - **`update_time`**

    `string`, format: `date-time` — Timestamp of the last modification to the user account. Automatically updated by the server.

  - **`user_profile`**

    `object` — User's personal information including name, address, and other profile attributes.
    - **`custom_attributes`**

      `object` — Custom attributes for extended user profile data and application-specific information. This field stores business-specific user data like department, job title, security clearances, project assignments, or any other organizational attributes your application requires. Unlike system metadata, these attributes are typically managed by administrators or applications and are visible to end users for personalization and business logic. Keys must be 3-25 characters, values must be 1-256 characters, with a maximum of 20 key-value pairs.

    - **`email_verified`**

      `boolean` — Indicates if the user's email address has been verified. Automatically updated by the system.

    - **`external_identities`**

      `array` — List of external identity connections associated with the user profile.

      **Items:**
      - **`connection_id`**

        `string` — Unique identifier for the external identity connection. Immutable and read-only.

      - **`connection_provider`**

        `string`, possible values: `"OKTA", "GOOGLE", "MICROSOFT_AD", "AUTH0", "ONELOGIN", "PING_IDENTITY", "JUMPCLOUD", "CUSTOM", "GITHUB", "GITLAB", "LINKEDIN", "SALESFORCE", "MICROSOFT", "IDP_SIMULATOR", "SCALEKIT", "ADFS"` — Type of the identity provider.

      - **`connection_type`**

        `string` — Name of the external identity connection.

      - **`connection_user_id`**

        `string` — Unique identifier for the user in the external identity provider system. Immutable and read-only.

      - **`created_time`**

        `string`, format: `date-time` — Timestamp when this external identity connection was first created. Immutable and read-only.

      - **`is_social`**

        `boolean` — Indicates if the identity provider is a social provider (true) or enterprise/custom provider (false). Read-only.

      - **`last_login_time`**

        `string`, format: `date-time` — Timestamp of the user's last successful login via this external identity provider. Automatically updated by the system.

      - **`last_synced_time`**

        `string`, format: `date-time` — Timestamp of the last data synchronization for this external identity from the provider. Automatically updated by the system.

    - **`family_name`**

      `string` — The user's family name (last name or surname). This field stores the user's last name and is combined with the given name to create the full display name. The family name is used in formal communications, user listings, and organizational directories throughout the system. Maximum 255 characters allowed.

    - **`gender`**

      `string` — The user's gender identity information. This field stores the user's gender identity for personalization, compliance reporting, or organizational analytics purposes. This field supports any string value to accommodate diverse gender identities and should be handled with appropriate privacy considerations according to your organization's policies and applicable regulations.

    - **`given_name`**

      `string` — The user's given name (first name). This field stores the user's first name and is used for personalization, display purposes, and when generating the full display name. The given name appears in user interfaces, formal communications, and user listings throughout the system. Maximum 255 characters allowed.

    - **`groups`**

      `array` — The list of group names the user belongs to within the organization. This field stores the user's group memberships for role-based access control, team assignments, and organizational structure. Groups are typically used for permission management, collaborative access, and organizational hierarchy. Each group name represents a distinct organizational unit or team that the user is associated with.

      **Items:**

      `string`

    - **`id`**

      `string` — Unique system-generated identifier for the user profile. Immutable and read-only.

    - **`locale`**

      `string` — The user's preferred language and region settings using BCP-47 format codes. This field customizes the user's experience with localized content, date formats, number formatting, and UI language throughout the system. When not specified, the user inherits the organization's default locale settings. Common values include \`en-US\`, \`en-GB\`, \`fr-FR\`, \`de-DE\`, and \`es-ES\`.

    - **`metadata`**

      `object` — Raw attributes received from identity providers during authentication. This field stores the original user profile data as received from external IdP systems (SAML, OIDC, etc.) including provider-specific claims and attributes. These fields preserve the complete set of attributes received from the identity source and are used for mapping, synchronization, and audit purposes. Keys must be 3-25 characters, values must be 1-256 characters, with a maximum of 20 key-value pairs.

    - **`name`**

      `string` — The user's complete display name in formatted form. This field stores the full name as a single string and is typically used when you want to set the complete name rather than using separate given and family names. This name appears in user interfaces, reports, directory listings, and anywhere a formatted display name is needed. This field serves as a formatted display name that complements the individual given_name and family_name fields.

    - **`phone_number`**

      `string` — The user's phone number in E.164 international format. This field stores the phone number for user contact and identification purposes. The phone number must include the country code and be formatted according to E.164 standards (e.g., \`+1\` for US numbers). This field is optional.

    - **`phone_number_verified`**

      `boolean` — Indicates if the user's phone number has been verified. Automatically updated by the system.

    - **`picture`**

      `string` — The URL to the user's profile picture or avatar image. This field stores the location of the user's profile photo that appears in user interfaces, directory listings, and collaborative features throughout the system. The URL should point to a publicly accessible image file. Supported formats typically include JPEG, PNG, and GIF. This image is used for visual identification and personalization across the platform.

    - **`preferred_username`**

      `string` — The user's preferred username for display and identification purposes. This field stores a custom username that the user prefers to be known by, which may differ from their email or formal name. This username appears in user interfaces, mentions, informal communications, and collaborative features throughout the system. Maximum 512 characters allowed.

**Example:**

```json
{
  "next_page_token": "eyJwYWdlIjogMiwgImxhc3RfaWQiOiAidXNyXzEyMzQ1In0=",
  "prev_page_token": "eyJwYWdlIjogMCwgImZpcnN0X2lkIjogInVzcl85ODc2NSJ9",
  "total_size": 1042,
  "users": [
    {
      "create_time": "",
      "email": "user@example.com",
      "external_id": "ext_12345a67b89c",
      "id": "usr_1234abcd5678efgh",
      "last_login_time": "",
      "memberships": [{}],
      "metadata": {
        "department": "engineering",
        "location": "nyc-office"
      },
      "update_time": "",
      "user_profile": null
    }
  ]
}
```

### usersPermission

- **Type:**`object`

* **`description`**

  `string` — Description of what the permission allows

* **`id`**

  `string` — Unique identifier for the permission

* **`name`**

  `string` — Unique name identifier for the permission

**Example:**

```json
{
  "description": "Allows creating new user accounts",
  "id": "perm_1234abcd5678efgh",
  "name": "users:create"
}
```

### usersResendInviteResponse

- **Type:**`object`

* **`invite`**

  `object` — Updated invitation object containing the resent invitation details, including new expiration time and incremented resend counter.
  - **`created_at`**

    `string`, format: `date-time` — Timestamp when the invite was originally created.

  - **`expires_at`**

    `string`, format: `date-time` — The time at which the invite expires.

  - **`inviter_email`**

    `string` — Identifier of the user or system that initiated the invite.

  - **`organization_id`**

    `string` — The organization to which the invite belongs.

  - **`resent_at`**

    `string`, format: `date-time` — Timestamp when the invite was last resent, if applicable.

  - **`resent_count`**

    `integer`, format: `int32` — Number of times the invite has been resent.

  - **`status`**

    `string` — Current status of the invite (e.g., pending, accepted, expired, revoked).

  - **`user_id`**

    `string` — User ID to whom the invite is sent. May be empty if the user has not signed up yet.

**Example:**

```json
{
  "invite": {
    "expires_at": "2025-12-31T23:59:59Z",
    "organization_id": "org_123",
    "resent_count": 2,
    "status": "pending_invite",
    "user_id": "usr_456"
  }
}
```

### usersSearchOrganizationUsersResponse

- **Type:**`object`

* **`next_page_token`**

  `string` — Token for retrieving the next page of results. Empty if there are no more pages.

* **`prev_page_token`**

  `string` — Token for retrieving the previous page of results. Empty if this is the first page.

* **`total_size`**

  `integer`, format: `int64` — Total number of users matching the request criteria, regardless of pagination.

* **`users`**

  `array` — List of matching users.

  **Items:**
  - **`create_time`**

    `string`, format: `date-time` — Timestamp when the user account was initially created. Automatically set by the server.

  - **`email`**

    `string` — Primary email address for the user. Must be unique across the environment and valid per RFC 5322.

  - **`external_id`**

    `string` — Your application's unique identifier for this organization, used to link Scalekit with your system.

  - **`id`**

    `string` — Unique system-generated identifier for the user. Immutable once created.

  - **`last_login_time`**

    `string`, format: `date-time` — Timestamp of the user's most recent successful authentication. Updated automatically.

  - **`memberships`**

    `array` — List of organization memberships. Automatically populated based on group assignments.

    **Items:**
    - **`accepted_at`**

      `string`, format: `date-time` — Timestamp when the user accepted the invitation.

    - **`created_at`**

      `string`, format: `date-time` — Timestamp when the invitation was created.

    - **`display_name`**

      `string` — Organization display name. This field stores a user-friendly name for the organization that may be different from the formal name, often used for UI display purposes.

    - **`expires_at`**

      `string`, format: `date-time` — Timestamp when the invitation expired.

    - **`inviter_email`**

      `string` — ID of the user who invited this user.

    - **`join_time`**

      `string`, format: `date-time` — Timestamp when the membership was created. Automatically set by the server.

    - **`membership_status`**

      `string`, possible values: `"ACTIVE", "INACTIVE", "PENDING_INVITE", "INVITE_EXPIRED"`

    - **`metadata`**

      `object` — Custom key-value pairs for storing additional user context. Keys (3-25 chars), values (1-256 chars).

    - **`name`**

      `string` — Organization name. This field stores the formal organization name used for identification and display purposes.

    - **`organization_id`**

      `string` — Unique identifier for the organization. Immutable and read-only.

    - **`permissions`**

      `array` — Effective permissions granted to the user within the organization (including inherited permissions from assigned roles). Lists the specific actions and access rights the user can perform.

      **Items:**

      `string`

    - **`provisioning_method`**

      `string` — How the user was provisioned. Possible values: - \`jit_using_sso\` (Just-in-time provisioning during SSO login) - \`allowed_email_domain\` (User joined via allowed email domain matching) - \`org_creator\` (User created the organization) - \`direct_provision\` (User was directly provisioned via API or SCIM) - \`invitation\` (User was invited and accepted an invitation)

    - **`roles`**

      `array`

      **Items:**
      - **`display_name`**

        `string` — Human-readable name for the role

      - **`id`**

        `string` — Role ID

      - **`name`**

        `string` — Attribute name/identifier for the role used in system operations and API calls. This should be a machine-readable identifier that follows naming conventions.

  - **`metadata`**

    `object` — Custom key-value pairs for storing additional user context. Keys (3-25 chars), values (1-256 chars).

  - **`update_time`**

    `string`, format: `date-time` — Timestamp of the last modification to the user account. Automatically updated by the server.

  - **`user_profile`**

    `object` — User's personal information including name, address, and other profile attributes.
    - **`custom_attributes`**

      `object` — Custom attributes for extended user profile data and application-specific information. This field stores business-specific user data like department, job title, security clearances, project assignments, or any other organizational attributes your application requires. Unlike system metadata, these attributes are typically managed by administrators or applications and are visible to end users for personalization and business logic. Keys must be 3-25 characters, values must be 1-256 characters, with a maximum of 20 key-value pairs.

    - **`email_verified`**

      `boolean` — Indicates if the user's email address has been verified. Automatically updated by the system.

    - **`external_identities`**

      `array` — List of external identity connections associated with the user profile.

      **Items:**
      - **`connection_id`**

        `string` — Unique identifier for the external identity connection. Immutable and read-only.

      - **`connection_provider`**

        `string`, possible values: `"OKTA", "GOOGLE", "MICROSOFT_AD", "AUTH0", "ONELOGIN", "PING_IDENTITY", "JUMPCLOUD", "CUSTOM", "GITHUB", "GITLAB", "LINKEDIN", "SALESFORCE", "MICROSOFT", "IDP_SIMULATOR", "SCALEKIT", "ADFS"` — Type of the identity provider.

      - **`connection_type`**

        `string` — Name of the external identity connection.

      - **`connection_user_id`**

        `string` — Unique identifier for the user in the external identity provider system. Immutable and read-only.

      - **`created_time`**

        `string`, format: `date-time` — Timestamp when this external identity connection was first created. Immutable and read-only.

      - **`is_social`**

        `boolean` — Indicates if the identity provider is a social provider (true) or enterprise/custom provider (false). Read-only.

      - **`last_login_time`**

        `string`, format: `date-time` — Timestamp of the user's last successful login via this external identity provider. Automatically updated by the system.

      - **`last_synced_time`**

        `string`, format: `date-time` — Timestamp of the last data synchronization for this external identity from the provider. Automatically updated by the system.

    - **`family_name`**

      `string` — The user's family name (last name or surname). This field stores the user's last name and is combined with the given name to create the full display name. The family name is used in formal communications, user listings, and organizational directories throughout the system. Maximum 255 characters allowed.

    - **`gender`**

      `string` — The user's gender identity information. This field stores the user's gender identity for personalization, compliance reporting, or organizational analytics purposes. This field supports any string value to accommodate diverse gender identities and should be handled with appropriate privacy considerations according to your organization's policies and applicable regulations.

    - **`given_name`**

      `string` — The user's given name (first name). This field stores the user's first name and is used for personalization, display purposes, and when generating the full display name. The given name appears in user interfaces, formal communications, and user listings throughout the system. Maximum 255 characters allowed.

    - **`groups`**

      `array` — The list of group names the user belongs to within the organization. This field stores the user's group memberships for role-based access control, team assignments, and organizational structure. Groups are typically used for permission management, collaborative access, and organizational hierarchy. Each group name represents a distinct organizational unit or team that the user is associated with.

      **Items:**

      `string`

    - **`id`**

      `string` — Unique system-generated identifier for the user profile. Immutable and read-only.

    - **`locale`**

      `string` — The user's preferred language and region settings using BCP-47 format codes. This field customizes the user's experience with localized content, date formats, number formatting, and UI language throughout the system. When not specified, the user inherits the organization's default locale settings. Common values include \`en-US\`, \`en-GB\`, \`fr-FR\`, \`de-DE\`, and \`es-ES\`.

    - **`metadata`**

      `object` — Raw attributes received from identity providers during authentication. This field stores the original user profile data as received from external IdP systems (SAML, OIDC, etc.) including provider-specific claims and attributes. These fields preserve the complete set of attributes received from the identity source and are used for mapping, synchronization, and audit purposes. Keys must be 3-25 characters, values must be 1-256 characters, with a maximum of 20 key-value pairs.

    - **`name`**

      `string` — The user's complete display name in formatted form. This field stores the full name as a single string and is typically used when you want to set the complete name rather than using separate given and family names. This name appears in user interfaces, reports, directory listings, and anywhere a formatted display name is needed. This field serves as a formatted display name that complements the individual given_name and family_name fields.

    - **`phone_number`**

      `string` — The user's phone number in E.164 international format. This field stores the phone number for user contact and identification purposes. The phone number must include the country code and be formatted according to E.164 standards (e.g., \`+1\` for US numbers). This field is optional.

    - **`phone_number_verified`**

      `boolean` — Indicates if the user's phone number has been verified. Automatically updated by the system.

    - **`picture`**

      `string` — The URL to the user's profile picture or avatar image. This field stores the location of the user's profile photo that appears in user interfaces, directory listings, and collaborative features throughout the system. The URL should point to a publicly accessible image file. Supported formats typically include JPEG, PNG, and GIF. This image is used for visual identification and personalization across the platform.

    - **`preferred_username`**

      `string` — The user's preferred username for display and identification purposes. This field stores a custom username that the user prefers to be known by, which may differ from their email or formal name. This username appears in user interfaces, mentions, informal communications, and collaborative features throughout the system. Maximum 512 characters allowed.

**Example:**

```json
{
  "next_page_token": "eyJwYWdlIjogMiwgImxhc3RfaWQiOiAidXNyXzEyMzQ1In0=",
  "prev_page_token": "eyJwYWdlIjogMCwgImZpcnN0X2lkIjogInVzcl85ODc2NSJ9",
  "total_size": 1042,
  "users": [
    {
      "create_time": "",
      "email": "user@example.com",
      "external_id": "ext_12345a67b89c",
      "id": "usr_1234abcd5678efgh",
      "last_login_time": "",
      "memberships": [{}],
      "metadata": {
        "department": "engineering",
        "location": "nyc-office"
      },
      "update_time": "",
      "user_profile": null
    }
  ]
}
```

### usersSearchUsersResponse

- **Type:**`object`

* **`next_page_token`**

  `string` — Token for retrieving the next page of results. Empty if there are no more pages.

* **`prev_page_token`**

  `string` — Token for retrieving the previous page of results. Empty if this is the first page.

* **`total_size`**

  `integer`, format: `int64` — Total number of users matching the request criteria, regardless of pagination.

* **`users`**

  `array` — List of matching users.

  **Items:**
  - **`create_time`**

    `string`, format: `date-time` — Timestamp when the user account was initially created. Automatically set by the server.

  - **`email`**

    `string` — Primary email address for the user. Must be unique across the environment and valid per RFC 5322.

  - **`external_id`**

    `string` — Your application's unique identifier for this organization, used to link Scalekit with your system.

  - **`id`**

    `string` — Unique system-generated identifier for the user. Immutable once created.

  - **`last_login_time`**

    `string`, format: `date-time` — Timestamp of the user's most recent successful authentication. Updated automatically.

  - **`memberships`**

    `array` — List of organization memberships. Automatically populated based on group assignments.

    **Items:**
    - **`accepted_at`**

      `string`, format: `date-time` — Timestamp when the user accepted the invitation.

    - **`created_at`**

      `string`, format: `date-time` — Timestamp when the invitation was created.

    - **`display_name`**

      `string` — Organization display name. This field stores a user-friendly name for the organization that may be different from the formal name, often used for UI display purposes.

    - **`expires_at`**

      `string`, format: `date-time` — Timestamp when the invitation expired.

    - **`inviter_email`**

      `string` — ID of the user who invited this user.

    - **`join_time`**

      `string`, format: `date-time` — Timestamp when the membership was created. Automatically set by the server.

    - **`membership_status`**

      `string`, possible values: `"ACTIVE", "INACTIVE", "PENDING_INVITE", "INVITE_EXPIRED"`

    - **`metadata`**

      `object` — Custom key-value pairs for storing additional user context. Keys (3-25 chars), values (1-256 chars).

    - **`name`**

      `string` — Organization name. This field stores the formal organization name used for identification and display purposes.

    - **`organization_id`**

      `string` — Unique identifier for the organization. Immutable and read-only.

    - **`permissions`**

      `array` — Effective permissions granted to the user within the organization (including inherited permissions from assigned roles). Lists the specific actions and access rights the user can perform.

      **Items:**

      `string`

    - **`provisioning_method`**

      `string` — How the user was provisioned. Possible values: - \`jit_using_sso\` (Just-in-time provisioning during SSO login) - \`allowed_email_domain\` (User joined via allowed email domain matching) - \`org_creator\` (User created the organization) - \`direct_provision\` (User was directly provisioned via API or SCIM) - \`invitation\` (User was invited and accepted an invitation)

    - **`roles`**

      `array`

      **Items:**
      - **`display_name`**

        `string` — Human-readable name for the role

      - **`id`**

        `string` — Role ID

      - **`name`**

        `string` — Attribute name/identifier for the role used in system operations and API calls. This should be a machine-readable identifier that follows naming conventions.

  - **`metadata`**

    `object` — Custom key-value pairs for storing additional user context. Keys (3-25 chars), values (1-256 chars).

  - **`update_time`**

    `string`, format: `date-time` — Timestamp of the last modification to the user account. Automatically updated by the server.

  - **`user_profile`**

    `object` — User's personal information including name, address, and other profile attributes.
    - **`custom_attributes`**

      `object` — Custom attributes for extended user profile data and application-specific information. This field stores business-specific user data like department, job title, security clearances, project assignments, or any other organizational attributes your application requires. Unlike system metadata, these attributes are typically managed by administrators or applications and are visible to end users for personalization and business logic. Keys must be 3-25 characters, values must be 1-256 characters, with a maximum of 20 key-value pairs.

    - **`email_verified`**

      `boolean` — Indicates if the user's email address has been verified. Automatically updated by the system.

    - **`external_identities`**

      `array` — List of external identity connections associated with the user profile.

      **Items:**
      - **`connection_id`**

        `string` — Unique identifier for the external identity connection. Immutable and read-only.

      - **`connection_provider`**

        `string`, possible values: `"OKTA", "GOOGLE", "MICROSOFT_AD", "AUTH0", "ONELOGIN", "PING_IDENTITY", "JUMPCLOUD", "CUSTOM", "GITHUB", "GITLAB", "LINKEDIN", "SALESFORCE", "MICROSOFT", "IDP_SIMULATOR", "SCALEKIT", "ADFS"` — Type of the identity provider.

      - **`connection_type`**

        `string` — Name of the external identity connection.

      - **`connection_user_id`**

        `string` — Unique identifier for the user in the external identity provider system. Immutable and read-only.

      - **`created_time`**

        `string`, format: `date-time` — Timestamp when this external identity connection was first created. Immutable and read-only.

      - **`is_social`**

        `boolean` — Indicates if the identity provider is a social provider (true) or enterprise/custom provider (false). Read-only.

      - **`last_login_time`**

        `string`, format: `date-time` — Timestamp of the user's last successful login via this external identity provider. Automatically updated by the system.

      - **`last_synced_time`**

        `string`, format: `date-time` — Timestamp of the last data synchronization for this external identity from the provider. Automatically updated by the system.

    - **`family_name`**

      `string` — The user's family name (last name or surname). This field stores the user's last name and is combined with the given name to create the full display name. The family name is used in formal communications, user listings, and organizational directories throughout the system. Maximum 255 characters allowed.

    - **`gender`**

      `string` — The user's gender identity information. This field stores the user's gender identity for personalization, compliance reporting, or organizational analytics purposes. This field supports any string value to accommodate diverse gender identities and should be handled with appropriate privacy considerations according to your organization's policies and applicable regulations.

    - **`given_name`**

      `string` — The user's given name (first name). This field stores the user's first name and is used for personalization, display purposes, and when generating the full display name. The given name appears in user interfaces, formal communications, and user listings throughout the system. Maximum 255 characters allowed.

    - **`groups`**

      `array` — The list of group names the user belongs to within the organization. This field stores the user's group memberships for role-based access control, team assignments, and organizational structure. Groups are typically used for permission management, collaborative access, and organizational hierarchy. Each group name represents a distinct organizational unit or team that the user is associated with.

      **Items:**

      `string`

    - **`id`**

      `string` — Unique system-generated identifier for the user profile. Immutable and read-only.

    - **`locale`**

      `string` — The user's preferred language and region settings using BCP-47 format codes. This field customizes the user's experience with localized content, date formats, number formatting, and UI language throughout the system. When not specified, the user inherits the organization's default locale settings. Common values include \`en-US\`, \`en-GB\`, \`fr-FR\`, \`de-DE\`, and \`es-ES\`.

    - **`metadata`**

      `object` — Raw attributes received from identity providers during authentication. This field stores the original user profile data as received from external IdP systems (SAML, OIDC, etc.) including provider-specific claims and attributes. These fields preserve the complete set of attributes received from the identity source and are used for mapping, synchronization, and audit purposes. Keys must be 3-25 characters, values must be 1-256 characters, with a maximum of 20 key-value pairs.

    - **`name`**

      `string` — The user's complete display name in formatted form. This field stores the full name as a single string and is typically used when you want to set the complete name rather than using separate given and family names. This name appears in user interfaces, reports, directory listings, and anywhere a formatted display name is needed. This field serves as a formatted display name that complements the individual given_name and family_name fields.

    - **`phone_number`**

      `string` — The user's phone number in E.164 international format. This field stores the phone number for user contact and identification purposes. The phone number must include the country code and be formatted according to E.164 standards (e.g., \`+1\` for US numbers). This field is optional.

    - **`phone_number_verified`**

      `boolean` — Indicates if the user's phone number has been verified. Automatically updated by the system.

    - **`picture`**

      `string` — The URL to the user's profile picture or avatar image. This field stores the location of the user's profile photo that appears in user interfaces, directory listings, and collaborative features throughout the system. The URL should point to a publicly accessible image file. Supported formats typically include JPEG, PNG, and GIF. This image is used for visual identification and personalization across the platform.

    - **`preferred_username`**

      `string` — The user's preferred username for display and identification purposes. This field stores a custom username that the user prefers to be known by, which may differ from their email or formal name. This username appears in user interfaces, mentions, informal communications, and collaborative features throughout the system. Maximum 512 characters allowed.

**Example:**

```json
{
  "next_page_token": "eyJwYWdlIjogMiwgImxhc3RfaWQiOiAidXNyXzEyMzQ1In0=",
  "prev_page_token": "eyJwYWdlIjogMCwgImZpcnN0X2lkIjogInVzcl85ODc2NSJ9",
  "total_size": 1042,
  "users": [
    {
      "create_time": "",
      "email": "user@example.com",
      "external_id": "ext_12345a67b89c",
      "id": "usr_1234abcd5678efgh",
      "last_login_time": "",
      "memberships": [{}],
      "metadata": {
        "department": "engineering",
        "location": "nyc-office"
      },
      "update_time": "",
      "user_profile": null
    }
  ]
}
```

### usersUpdateMembershipResponse

- **Type:**`object`

* **`user`**

  `object`
  - **`create_time`**

    `string`, format: `date-time` — Timestamp when the user account was initially created. Automatically set by the server.

  - **`email`**

    `string` — Primary email address for the user. Must be unique across the environment and valid per RFC 5322.

  - **`external_id`**

    `string` — Your application's unique identifier for this organization, used to link Scalekit with your system.

  - **`id`**

    `string` — Unique system-generated identifier for the user. Immutable once created.

  - **`last_login_time`**

    `string`, format: `date-time` — Timestamp of the user's most recent successful authentication. Updated automatically.

  - **`memberships`**

    `array` — List of organization memberships. Automatically populated based on group assignments.

    **Items:**
    - **`accepted_at`**

      `string`, format: `date-time` — Timestamp when the user accepted the invitation.

    - **`created_at`**

      `string`, format: `date-time` — Timestamp when the invitation was created.

    - **`display_name`**

      `string` — Organization display name. This field stores a user-friendly name for the organization that may be different from the formal name, often used for UI display purposes.

    - **`expires_at`**

      `string`, format: `date-time` — Timestamp when the invitation expired.

    - **`inviter_email`**

      `string` — ID of the user who invited this user.

    - **`join_time`**

      `string`, format: `date-time` — Timestamp when the membership was created. Automatically set by the server.

    - **`membership_status`**

      `string`, possible values: `"ACTIVE", "INACTIVE", "PENDING_INVITE", "INVITE_EXPIRED"`

    - **`metadata`**

      `object` — Custom key-value pairs for storing additional user context. Keys (3-25 chars), values (1-256 chars).

    - **`name`**

      `string` — Organization name. This field stores the formal organization name used for identification and display purposes.

    - **`organization_id`**

      `string` — Unique identifier for the organization. Immutable and read-only.

    - **`permissions`**

      `array` — Effective permissions granted to the user within the organization (including inherited permissions from assigned roles). Lists the specific actions and access rights the user can perform.

      **Items:**

      `string`

    - **`provisioning_method`**

      `string` — How the user was provisioned. Possible values: - \`jit_using_sso\` (Just-in-time provisioning during SSO login) - \`allowed_email_domain\` (User joined via allowed email domain matching) - \`org_creator\` (User created the organization) - \`direct_provision\` (User was directly provisioned via API or SCIM) - \`invitation\` (User was invited and accepted an invitation)

    - **`roles`**

      `array`

      **Items:**
      - **`display_name`**

        `string` — Human-readable name for the role

      - **`id`**

        `string` — Role ID

      - **`name`**

        `string` — Attribute name/identifier for the role used in system operations and API calls. This should be a machine-readable identifier that follows naming conventions.

  - **`metadata`**

    `object` — Custom key-value pairs for storing additional user context. Keys (3-25 chars), values (1-256 chars).

  - **`update_time`**

    `string`, format: `date-time` — Timestamp of the last modification to the user account. Automatically updated by the server.

  - **`user_profile`**

    `object` — User's personal information including name, address, and other profile attributes.
    - **`custom_attributes`**

      `object` — Custom attributes for extended user profile data and application-specific information. This field stores business-specific user data like department, job title, security clearances, project assignments, or any other organizational attributes your application requires. Unlike system metadata, these attributes are typically managed by administrators or applications and are visible to end users for personalization and business logic. Keys must be 3-25 characters, values must be 1-256 characters, with a maximum of 20 key-value pairs.

    - **`email_verified`**

      `boolean` — Indicates if the user's email address has been verified. Automatically updated by the system.

    - **`external_identities`**

      `array` — List of external identity connections associated with the user profile.

      **Items:**
      - **`connection_id`**

        `string` — Unique identifier for the external identity connection. Immutable and read-only.

      - **`connection_provider`**

        `string`, possible values: `"OKTA", "GOOGLE", "MICROSOFT_AD", "AUTH0", "ONELOGIN", "PING_IDENTITY", "JUMPCLOUD", "CUSTOM", "GITHUB", "GITLAB", "LINKEDIN", "SALESFORCE", "MICROSOFT", "IDP_SIMULATOR", "SCALEKIT", "ADFS"` — Type of the identity provider.

      - **`connection_type`**

        `string` — Name of the external identity connection.

      - **`connection_user_id`**

        `string` — Unique identifier for the user in the external identity provider system. Immutable and read-only.

      - **`created_time`**

        `string`, format: `date-time` — Timestamp when this external identity connection was first created. Immutable and read-only.

      - **`is_social`**

        `boolean` — Indicates if the identity provider is a social provider (true) or enterprise/custom provider (false). Read-only.

      - **`last_login_time`**

        `string`, format: `date-time` — Timestamp of the user's last successful login via this external identity provider. Automatically updated by the system.

      - **`last_synced_time`**

        `string`, format: `date-time` — Timestamp of the last data synchronization for this external identity from the provider. Automatically updated by the system.

    - **`family_name`**

      `string` — The user's family name (last name or surname). This field stores the user's last name and is combined with the given name to create the full display name. The family name is used in formal communications, user listings, and organizational directories throughout the system. Maximum 255 characters allowed.

    - **`gender`**

      `string` — The user's gender identity information. This field stores the user's gender identity for personalization, compliance reporting, or organizational analytics purposes. This field supports any string value to accommodate diverse gender identities and should be handled with appropriate privacy considerations according to your organization's policies and applicable regulations.

    - **`given_name`**

      `string` — The user's given name (first name). This field stores the user's first name and is used for personalization, display purposes, and when generating the full display name. The given name appears in user interfaces, formal communications, and user listings throughout the system. Maximum 255 characters allowed.

    - **`groups`**

      `array` — The list of group names the user belongs to within the organization. This field stores the user's group memberships for role-based access control, team assignments, and organizational structure. Groups are typically used for permission management, collaborative access, and organizational hierarchy. Each group name represents a distinct organizational unit or team that the user is associated with.

      **Items:**

      `string`

    - **`id`**

      `string` — Unique system-generated identifier for the user profile. Immutable and read-only.

    - **`locale`**

      `string` — The user's preferred language and region settings using BCP-47 format codes. This field customizes the user's experience with localized content, date formats, number formatting, and UI language throughout the system. When not specified, the user inherits the organization's default locale settings. Common values include \`en-US\`, \`en-GB\`, \`fr-FR\`, \`de-DE\`, and \`es-ES\`.

    - **`metadata`**

      `object` — Raw attributes received from identity providers during authentication. This field stores the original user profile data as received from external IdP systems (SAML, OIDC, etc.) including provider-specific claims and attributes. These fields preserve the complete set of attributes received from the identity source and are used for mapping, synchronization, and audit purposes. Keys must be 3-25 characters, values must be 1-256 characters, with a maximum of 20 key-value pairs.

    - **`name`**

      `string` — The user's complete display name in formatted form. This field stores the full name as a single string and is typically used when you want to set the complete name rather than using separate given and family names. This name appears in user interfaces, reports, directory listings, and anywhere a formatted display name is needed. This field serves as a formatted display name that complements the individual given_name and family_name fields.

    - **`phone_number`**

      `string` — The user's phone number in E.164 international format. This field stores the phone number for user contact and identification purposes. The phone number must include the country code and be formatted according to E.164 standards (e.g., \`+1\` for US numbers). This field is optional.

    - **`phone_number_verified`**

      `boolean` — Indicates if the user's phone number has been verified. Automatically updated by the system.

    - **`picture`**

      `string` — The URL to the user's profile picture or avatar image. This field stores the location of the user's profile photo that appears in user interfaces, directory listings, and collaborative features throughout the system. The URL should point to a publicly accessible image file. Supported formats typically include JPEG, PNG, and GIF. This image is used for visual identification and personalization across the platform.

    - **`preferred_username`**

      `string` — The user's preferred username for display and identification purposes. This field stores a custom username that the user prefers to be known by, which may differ from their email or formal name. This username appears in user interfaces, mentions, informal communications, and collaborative features throughout the system. Maximum 512 characters allowed.

**Example:**

```json
{
  "user": {
    "create_time": "",
    "email": "user@example.com",
    "external_id": "ext_12345a67b89c",
    "id": "usr_1234abcd5678efgh",
    "last_login_time": "",
    "memberships": [{}],
    "metadata": {
      "department": "engineering",
      "location": "nyc-office"
    },
    "update_time": "",
    "user_profile": null
  }
}
```

### usersUpdateUserProfile

- **Type:**`object`

* **`custom_attributes`**

  `object` — Updates custom attributes for extended user profile data and application-specific information. Use this field to store business-specific user data like department, job title, security clearances, project assignments, or any other organizational attributes your application requires. Unlike system metadata, these attributes are typically managed by administrators or applications and are visible to end users. Keys must be 3-25 characters, values must be 1-256 characters, with a maximum of 20 key-value pairs.

* **`family_name`**

  `string` — Updates the user's family name (last name or surname). Use this field to modify how the user's last name appears throughout the system. Maximum 255 characters allowed.

* **`first_name`**

  `string` — \[DEPRECATED] Use given_name instead. User's given name. Maximum 200 characters.

* **`gender`**

  `string` — Updates the user's gender identity information. Use this field to store the user's gender identity for personalization, compliance, or reporting purposes. This field supports any string value to accommodate diverse gender identities and should be handled with appropriate privacy considerations according to your organization's policies.

* **`given_name`**

  `string` — Updates the user's given name (first name). Use this field to modify how the user's first name appears in the system and user interfaces. Maximum 255 characters allowed.

* **`groups`**

  `array` — Updates the list of group names the user belongs to within the organization. Use this field to manage the user's group memberships for role-based access control, team assignments, or organizational structure. Groups are typically used for permission management and collaborative access. Each group name must be unique within the list, 1-250 characters long, with a maximum of 50 groups per user.

  **Items:**

  `string`

* **`last_name`**

  `string` — \[DEPRECATED] Use family_name instead. User's family name. Maximum 200 characters.

* **`locale`**

  `string` — Updates the user's preferred language and region settings using BCP-47 format codes. Use this field to customize the user's experience with localized content, date formats, number formatting, and UI language. When not specified, the user inherits the organization's default locale settings. Common values include \`en-US\`, \`en-GB\`, \`fr-FR\`, \`de-DE\`, and \`es-ES\`.

* **`metadata`**

  `object` — Updates system-managed key-value pairs for internal tracking and operational data. Use this field to store system-generated metadata like account status, signup source, last activity tracking, or integration-specific identifiers. These fields are typically managed by automated processes rather than direct user input. Keys must be 3-25 characters, values must be 1-256 characters, with a maximum of 20 key-value pairs.

* **`name`**

  `string` — Updates the user's complete display name. Use this field when you want to set the full name as a single string rather than using separate given and family names. This name appears in user interfaces, reports, and anywhere a formatted display name is needed.

* **`phone_number`**

  `string` — Updates the user's phone number in E.164 international format. Use this field to enable SMS-based authentication methods, two-factor authentication, or phone-based account recovery. The phone number must include the country code and be formatted according to E.164 standards (e.g., \`+1\` for US numbers). This field is required when enabling SMS authentication features.

* **`picture`**

  `string` — Updates the URL to the user's profile picture or avatar image. Use this field to set or change the user's profile photo that appears in user interfaces, directory listings, and collaborative features. The URL should point to a publicly accessible image file. Supported formats typically include JPEG, PNG, and GIF. Maximum URL length is 2048 characters.

* **`preferred_username`**

  `string` — Updates the user's preferred username for display and identification purposes. Use this field to set a custom username that the user prefers to be known by, which may differ from their email or formal name. This username appears in user interfaces, mentions, and informal communications. Maximum 512 characters allowed.

**Example:**

```json
{
  "custom_attributes": {
    "department": "engineering",
    "security_clearance": "level2"
  },
  "family_name": "Doe",
  "first_name": "John",
  "gender": "male",
  "given_name": "John",
  "groups": ["engineering", "managers"],
  "last_name": "Doe",
  "locale": "en-US",
  "metadata": {
    "account_status": "active",
    "signup_source": "mobile_app"
  },
  "name": "John Doe",
  "phone_number": "+14155552671",
  "picture": "https://example.com/avatar.jpg",
  "preferred_username": "John Michael Doe"
}
```

### usersUpdateUserResponse

- **Type:**`object`

* **`user`**

  `object`
  - **`create_time`**

    `string`, format: `date-time` — Timestamp when the user account was initially created. Automatically set by the server.

  - **`email`**

    `string` — Primary email address for the user. Must be unique across the environment and valid per RFC 5322.

  - **`external_id`**

    `string` — Your application's unique identifier for this organization, used to link Scalekit with your system.

  - **`id`**

    `string` — Unique system-generated identifier for the user. Immutable once created.

  - **`last_login_time`**

    `string`, format: `date-time` — Timestamp of the user's most recent successful authentication. Updated automatically.

  - **`memberships`**

    `array` — List of organization memberships. Automatically populated based on group assignments.

    **Items:**
    - **`accepted_at`**

      `string`, format: `date-time` — Timestamp when the user accepted the invitation.

    - **`created_at`**

      `string`, format: `date-time` — Timestamp when the invitation was created.

    - **`display_name`**

      `string` — Organization display name. This field stores a user-friendly name for the organization that may be different from the formal name, often used for UI display purposes.

    - **`expires_at`**

      `string`, format: `date-time` — Timestamp when the invitation expired.

    - **`inviter_email`**

      `string` — ID of the user who invited this user.

    - **`join_time`**

      `string`, format: `date-time` — Timestamp when the membership was created. Automatically set by the server.

    - **`membership_status`**

      `string`, possible values: `"ACTIVE", "INACTIVE", "PENDING_INVITE", "INVITE_EXPIRED"`

    - **`metadata`**

      `object` — Custom key-value pairs for storing additional user context. Keys (3-25 chars), values (1-256 chars).

    - **`name`**

      `string` — Organization name. This field stores the formal organization name used for identification and display purposes.

    - **`organization_id`**

      `string` — Unique identifier for the organization. Immutable and read-only.

    - **`permissions`**

      `array` — Effective permissions granted to the user within the organization (including inherited permissions from assigned roles). Lists the specific actions and access rights the user can perform.

      **Items:**

      `string`

    - **`provisioning_method`**

      `string` — How the user was provisioned. Possible values: - \`jit_using_sso\` (Just-in-time provisioning during SSO login) - \`allowed_email_domain\` (User joined via allowed email domain matching) - \`org_creator\` (User created the organization) - \`direct_provision\` (User was directly provisioned via API or SCIM) - \`invitation\` (User was invited and accepted an invitation)

    - **`roles`**

      `array`

      **Items:**
      - **`display_name`**

        `string` — Human-readable name for the role

      - **`id`**

        `string` — Role ID

      - **`name`**

        `string` — Attribute name/identifier for the role used in system operations and API calls. This should be a machine-readable identifier that follows naming conventions.

  - **`metadata`**

    `object` — Custom key-value pairs for storing additional user context. Keys (3-25 chars), values (1-256 chars).

  - **`update_time`**

    `string`, format: `date-time` — Timestamp of the last modification to the user account. Automatically updated by the server.

  - **`user_profile`**

    `object` — User's personal information including name, address, and other profile attributes.
    - **`custom_attributes`**

      `object` — Custom attributes for extended user profile data and application-specific information. This field stores business-specific user data like department, job title, security clearances, project assignments, or any other organizational attributes your application requires. Unlike system metadata, these attributes are typically managed by administrators or applications and are visible to end users for personalization and business logic. Keys must be 3-25 characters, values must be 1-256 characters, with a maximum of 20 key-value pairs.

    - **`email_verified`**

      `boolean` — Indicates if the user's email address has been verified. Automatically updated by the system.

    - **`external_identities`**

      `array` — List of external identity connections associated with the user profile.

      **Items:**
      - **`connection_id`**

        `string` — Unique identifier for the external identity connection. Immutable and read-only.

      - **`connection_provider`**

        `string`, possible values: `"OKTA", "GOOGLE", "MICROSOFT_AD", "AUTH0", "ONELOGIN", "PING_IDENTITY", "JUMPCLOUD", "CUSTOM", "GITHUB", "GITLAB", "LINKEDIN", "SALESFORCE", "MICROSOFT", "IDP_SIMULATOR", "SCALEKIT", "ADFS"` — Type of the identity provider.

      - **`connection_type`**

        `string` — Name of the external identity connection.

      - **`connection_user_id`**

        `string` — Unique identifier for the user in the external identity provider system. Immutable and read-only.

      - **`created_time`**

        `string`, format: `date-time` — Timestamp when this external identity connection was first created. Immutable and read-only.

      - **`is_social`**

        `boolean` — Indicates if the identity provider is a social provider (true) or enterprise/custom provider (false). Read-only.

      - **`last_login_time`**

        `string`, format: `date-time` — Timestamp of the user's last successful login via this external identity provider. Automatically updated by the system.

      - **`last_synced_time`**

        `string`, format: `date-time` — Timestamp of the last data synchronization for this external identity from the provider. Automatically updated by the system.

    - **`family_name`**

      `string` — The user's family name (last name or surname). This field stores the user's last name and is combined with the given name to create the full display name. The family name is used in formal communications, user listings, and organizational directories throughout the system. Maximum 255 characters allowed.

    - **`gender`**

      `string` — The user's gender identity information. This field stores the user's gender identity for personalization, compliance reporting, or organizational analytics purposes. This field supports any string value to accommodate diverse gender identities and should be handled with appropriate privacy considerations according to your organization's policies and applicable regulations.

    - **`given_name`**

      `string` — The user's given name (first name). This field stores the user's first name and is used for personalization, display purposes, and when generating the full display name. The given name appears in user interfaces, formal communications, and user listings throughout the system. Maximum 255 characters allowed.

    - **`groups`**

      `array` — The list of group names the user belongs to within the organization. This field stores the user's group memberships for role-based access control, team assignments, and organizational structure. Groups are typically used for permission management, collaborative access, and organizational hierarchy. Each group name represents a distinct organizational unit or team that the user is associated with.

      **Items:**

      `string`

    - **`id`**

      `string` — Unique system-generated identifier for the user profile. Immutable and read-only.

    - **`locale`**

      `string` — The user's preferred language and region settings using BCP-47 format codes. This field customizes the user's experience with localized content, date formats, number formatting, and UI language throughout the system. When not specified, the user inherits the organization's default locale settings. Common values include \`en-US\`, \`en-GB\`, \`fr-FR\`, \`de-DE\`, and \`es-ES\`.

    - **`metadata`**

      `object` — Raw attributes received from identity providers during authentication. This field stores the original user profile data as received from external IdP systems (SAML, OIDC, etc.) including provider-specific claims and attributes. These fields preserve the complete set of attributes received from the identity source and are used for mapping, synchronization, and audit purposes. Keys must be 3-25 characters, values must be 1-256 characters, with a maximum of 20 key-value pairs.

    - **`name`**

      `string` — The user's complete display name in formatted form. This field stores the full name as a single string and is typically used when you want to set the complete name rather than using separate given and family names. This name appears in user interfaces, reports, directory listings, and anywhere a formatted display name is needed. This field serves as a formatted display name that complements the individual given_name and family_name fields.

    - **`phone_number`**

      `string` — The user's phone number in E.164 international format. This field stores the phone number for user contact and identification purposes. The phone number must include the country code and be formatted according to E.164 standards (e.g., \`+1\` for US numbers). This field is optional.

    - **`phone_number_verified`**

      `boolean` — Indicates if the user's phone number has been verified. Automatically updated by the system.

    - **`picture`**

      `string` — The URL to the user's profile picture or avatar image. This field stores the location of the user's profile photo that appears in user interfaces, directory listings, and collaborative features throughout the system. The URL should point to a publicly accessible image file. Supported formats typically include JPEG, PNG, and GIF. This image is used for visual identification and personalization across the platform.

    - **`preferred_username`**

      `string` — The user's preferred username for display and identification purposes. This field stores a custom username that the user prefers to be known by, which may differ from their email or formal name. This username appears in user interfaces, mentions, informal communications, and collaborative features throughout the system. Maximum 512 characters allowed.

**Example:**

```json
{
  "user": {
    "create_time": "",
    "email": "user@example.com",
    "external_id": "ext_12345a67b89c",
    "id": "usr_1234abcd5678efgh",
    "last_login_time": "",
    "memberships": [{}],
    "metadata": {
      "department": "engineering",
      "location": "nyc-office"
    },
    "update_time": "",
    "user_profile": null
  }
}
```

### usersUser

- **Type:**`object`

* **`create_time`**

  `string`, format: `date-time` — Timestamp when the user account was initially created. Automatically set by the server.

* **`email`**

  `string` — Primary email address for the user. Must be unique across the environment and valid per RFC 5322.

* **`external_id`**

  `string` — Your application's unique identifier for this organization, used to link Scalekit with your system.

* **`id`**

  `string` — Unique system-generated identifier for the user. Immutable once created.

* **`last_login_time`**

  `string`, format: `date-time` — Timestamp of the user's most recent successful authentication. Updated automatically.

* **`memberships`**

  `array` — List of organization memberships. Automatically populated based on group assignments.

  **Items:**
  - **`accepted_at`**

    `string`, format: `date-time` — Timestamp when the user accepted the invitation.

  - **`created_at`**

    `string`, format: `date-time` — Timestamp when the invitation was created.

  - **`display_name`**

    `string` — Organization display name. This field stores a user-friendly name for the organization that may be different from the formal name, often used for UI display purposes.

  - **`expires_at`**

    `string`, format: `date-time` — Timestamp when the invitation expired.

  - **`inviter_email`**

    `string` — ID of the user who invited this user.

  - **`join_time`**

    `string`, format: `date-time` — Timestamp when the membership was created. Automatically set by the server.

  - **`membership_status`**

    `string`, possible values: `"ACTIVE", "INACTIVE", "PENDING_INVITE", "INVITE_EXPIRED"`

  - **`metadata`**

    `object` — Custom key-value pairs for storing additional user context. Keys (3-25 chars), values (1-256 chars).

  - **`name`**

    `string` — Organization name. This field stores the formal organization name used for identification and display purposes.

  - **`organization_id`**

    `string` — Unique identifier for the organization. Immutable and read-only.

  - **`permissions`**

    `array` — Effective permissions granted to the user within the organization (including inherited permissions from assigned roles). Lists the specific actions and access rights the user can perform.

    **Items:**

    `string`

  - **`provisioning_method`**

    `string` — How the user was provisioned. Possible values: - \`jit_using_sso\` (Just-in-time provisioning during SSO login) - \`allowed_email_domain\` (User joined via allowed email domain matching) - \`org_creator\` (User created the organization) - \`direct_provision\` (User was directly provisioned via API or SCIM) - \`invitation\` (User was invited and accepted an invitation)

  - **`roles`**

    `array`

    **Items:**
    - **`display_name`**

      `string` — Human-readable name for the role

    - **`id`**

      `string` — Role ID

    - **`name`**

      `string` — Attribute name/identifier for the role used in system operations and API calls. This should be a machine-readable identifier that follows naming conventions.

* **`metadata`**

  `object` — Custom key-value pairs for storing additional user context. Keys (3-25 chars), values (1-256 chars).

* **`update_time`**

  `string`, format: `date-time` — Timestamp of the last modification to the user account. Automatically updated by the server.

* **`user_profile`**

  `object` — User's personal information including name, address, and other profile attributes.
  - **`custom_attributes`**

    `object` — Custom attributes for extended user profile data and application-specific information. This field stores business-specific user data like department, job title, security clearances, project assignments, or any other organizational attributes your application requires. Unlike system metadata, these attributes are typically managed by administrators or applications and are visible to end users for personalization and business logic. Keys must be 3-25 characters, values must be 1-256 characters, with a maximum of 20 key-value pairs.

  - **`email_verified`**

    `boolean` — Indicates if the user's email address has been verified. Automatically updated by the system.

  - **`external_identities`**

    `array` — List of external identity connections associated with the user profile.

    **Items:**
    - **`connection_id`**

      `string` — Unique identifier for the external identity connection. Immutable and read-only.

    - **`connection_provider`**

      `string`, possible values: `"OKTA", "GOOGLE", "MICROSOFT_AD", "AUTH0", "ONELOGIN", "PING_IDENTITY", "JUMPCLOUD", "CUSTOM", "GITHUB", "GITLAB", "LINKEDIN", "SALESFORCE", "MICROSOFT", "IDP_SIMULATOR", "SCALEKIT", "ADFS"` — Type of the identity provider.

    - **`connection_type`**

      `string` — Name of the external identity connection.

    - **`connection_user_id`**

      `string` — Unique identifier for the user in the external identity provider system. Immutable and read-only.

    - **`created_time`**

      `string`, format: `date-time` — Timestamp when this external identity connection was first created. Immutable and read-only.

    - **`is_social`**

      `boolean` — Indicates if the identity provider is a social provider (true) or enterprise/custom provider (false). Read-only.

    - **`last_login_time`**

      `string`, format: `date-time` — Timestamp of the user's last successful login via this external identity provider. Automatically updated by the system.

    - **`last_synced_time`**

      `string`, format: `date-time` — Timestamp of the last data synchronization for this external identity from the provider. Automatically updated by the system.

  - **`family_name`**

    `string` — The user's family name (last name or surname). This field stores the user's last name and is combined with the given name to create the full display name. The family name is used in formal communications, user listings, and organizational directories throughout the system. Maximum 255 characters allowed.

  - **`gender`**

    `string` — The user's gender identity information. This field stores the user's gender identity for personalization, compliance reporting, or organizational analytics purposes. This field supports any string value to accommodate diverse gender identities and should be handled with appropriate privacy considerations according to your organization's policies and applicable regulations.

  - **`given_name`**

    `string` — The user's given name (first name). This field stores the user's first name and is used for personalization, display purposes, and when generating the full display name. The given name appears in user interfaces, formal communications, and user listings throughout the system. Maximum 255 characters allowed.

  - **`groups`**

    `array` — The list of group names the user belongs to within the organization. This field stores the user's group memberships for role-based access control, team assignments, and organizational structure. Groups are typically used for permission management, collaborative access, and organizational hierarchy. Each group name represents a distinct organizational unit or team that the user is associated with.

    **Items:**

    `string`

  - **`id`**

    `string` — Unique system-generated identifier for the user profile. Immutable and read-only.

  - **`locale`**

    `string` — The user's preferred language and region settings using BCP-47 format codes. This field customizes the user's experience with localized content, date formats, number formatting, and UI language throughout the system. When not specified, the user inherits the organization's default locale settings. Common values include \`en-US\`, \`en-GB\`, \`fr-FR\`, \`de-DE\`, and \`es-ES\`.

  - **`metadata`**

    `object` — Raw attributes received from identity providers during authentication. This field stores the original user profile data as received from external IdP systems (SAML, OIDC, etc.) including provider-specific claims and attributes. These fields preserve the complete set of attributes received from the identity source and are used for mapping, synchronization, and audit purposes. Keys must be 3-25 characters, values must be 1-256 characters, with a maximum of 20 key-value pairs.

  - **`name`**

    `string` — The user's complete display name in formatted form. This field stores the full name as a single string and is typically used when you want to set the complete name rather than using separate given and family names. This name appears in user interfaces, reports, directory listings, and anywhere a formatted display name is needed. This field serves as a formatted display name that complements the individual given_name and family_name fields.

  - **`phone_number`**

    `string` — The user's phone number in E.164 international format. This field stores the phone number for user contact and identification purposes. The phone number must include the country code and be formatted according to E.164 standards (e.g., \`+1\` for US numbers). This field is optional.

  - **`phone_number_verified`**

    `boolean` — Indicates if the user's phone number has been verified. Automatically updated by the system.

  - **`picture`**

    `string` — The URL to the user's profile picture or avatar image. This field stores the location of the user's profile photo that appears in user interfaces, directory listings, and collaborative features throughout the system. The URL should point to a publicly accessible image file. Supported formats typically include JPEG, PNG, and GIF. This image is used for visual identification and personalization across the platform.

  - **`preferred_username`**

    `string` — The user's preferred username for display and identification purposes. This field stores a custom username that the user prefers to be known by, which may differ from their email or formal name. This username appears in user interfaces, mentions, informal communications, and collaborative features throughout the system. Maximum 512 characters allowed.

**Example:**

```json
{
  "create_time": "",
  "email": "user@example.com",
  "external_id": "ext_12345a67b89c",
  "id": "usr_1234abcd5678efgh",
  "last_login_time": "",
  "memberships": [
    {
      "accepted_at": "",
      "created_at": "",
      "display_name": "Acme Corporation",
      "expires_at": "",
      "inviter_email": "",
      "join_time": "",
      "membership_status": null,
      "metadata": {
        "department": "engineering",
        "location": "nyc-office"
      },
      "name": "AcmeCorp",
      "organization_id": "org_1234abcd5678efgh",
      "permissions": ["read_projects", "write_tasks", "manage_users"],
      "provisioning_method": "",
      "roles": [{}]
    }
  ],
  "metadata": {
    "department": "engineering",
    "location": "nyc-office"
  },
  "update_time": "",
  "user_profile": {
    "custom_attributes": {
      "department": "engineering",
      "security_clearance": "level2"
    },
    "email_verified": true,
    "external_identities": [{}],
    "family_name": "Doe",
    "gender": "male",
    "given_name": "John",
    "groups": ["admin", "developer"],
    "id": "usr_profile_1234abcd5678efgh",
    "locale": "en-US",
    "metadata": {
      "department": "engineering",
      "employee_type": "full-time",
      "idp_user_id": "12345"
    },
    "name": "John Michael Doe",
    "phone_number": "+14155552671",
    "phone_number_verified": true,
    "picture": "https://example.com/avatar.jpg",
    "preferred_username": "johndoe"
  }
}
```

### Payload for creating a new connected account - authorization details are optional

- **Type:**`object`

* **`api_config`**

  `object` — Optional JSON configuration for connector-specific API settings such as rate limits, custom API endpoints, timeouts, or feature flags.

* **`authorization_details`**

  `object` — Optional authentication credentials for the connected account. Include OAuth tokens (access_token, refresh_token, scopes) or static auth details (API keys, bearer tokens). Can be provided later via update.
  - **`google_dwd`**

    `object` — Google Domain-Wide Delegation authentication — used for GOOGLE_DWD connections. Send only subject in requests; access_token, scopes, and token_expires_at are response-only.
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
      "scopes": ["email", "profile"]
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

    `object` — Google Domain-Wide Delegation authentication — used for GOOGLE_DWD connections. Send only subject in requests; access_token, scopes, and token_expires_at are response-only.
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
      "scopes": ["email", "profile", "calendar"]
    }
  }
}
```

### v1domainsCreateDomain

- **Type:**`object`

* **`domain`**

  `string` — The domain name to be configured. Must be a valid business domain you control. Public and disposable domains (gmail.com, outlook.com, etc.) are automatically blocked for security.

* **`domain_type`**

  `string`, possible values: `"ALLOWED_EMAIL_DOMAIN", "ORGANIZATION_DOMAIN"` — The domain type. - ALLOWED_EMAIL_DOMAIN: trusted domain used to suggest the organization in the organization switcher during sign-in/sign-up. - ORGANIZATION_DOMAIN: SSO discovery domain used to route users to the correct SSO provider and enforce SSO.

**Example:**

```json
{
  "domain": "customerdomain.com",
  "domain_type": "ORGANIZATION_DOMAIN"
}
```

### v1organizationsCreateOrganization

- **Type:**`object`

* **`display_name` (required)**

  `string` — Name of the organization. Must be between 1 and 200 characters.

* **`external_id`**

  `string` — Your application's unique identifier for this organization, used to link Scalekit with your system.

* **`logo_url`**

  `string`, format: `uri` — HTTPS URL of the organization's logo image. Maximum 1024 characters. Must use the https scheme.

* **`metadata`**

  `object`

* **`slug`**

  `string` — Slug for dynamic redirect URI resolution. A single DNS label (e.g. acme) or hostname (e.g. oauth.pstmn.io). Lowercase alphanumeric, hyphens, and dots. Max 253 chars. Unique per environment.

**Example:**

```json
{
  "display_name": "Megasoft Inc",
  "external_id": "my_unique_id",
  "logo_url": "https://cdn.example.com/acme-logo.png",
  "metadata": {
    "additionalProperty": ""
  },
  "slug": "acme"
}
```

### v1organizationsUpdateOrganization

- **Type:**`object`

For update messages ensure the indexes are same as the base model itself.

- **`display_name`**

  `string` — Name of the organization to display in the UI. Must be between 1 and 200 characters

- **`external_id`**

  `string` — Your application's unique identifier for this organization, used to link Scalekit with your system

- **`logo_url`**

  `string`, format: `uri` — HTTPS URL of the organization's logo image. Maximum 1024 characters. Must use the https scheme.

- **`metadata`**

  `object` — Custom key-value pairs to store with the organization. Keys must be 3-25 characters, values must be 1-256 characters. Maximum 10 pairs allowed.

- **`slug`**

  `string` — Slug for dynamic redirect URI resolution. A single DNS label (e.g. acme) or hostname (e.g. oauth.pstmn.io). Lowercase alphanumeric, hyphens, and dots. Max 253 chars. Send empty string to clear.

**Example:**

```json
{
  "display_name": "Acme Corporation",
  "external_id": "tenant_12345",
  "logo_url": "https://cdn.example.com/acme-logo.png",
  "metadata": {
    "industry": "technology"
  },
  "slug": "acme"
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
  "auth_patterns": [{}],
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
  "auth_patterns": [{}],
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

### v1rolesCreateOrganizationRole

- **Type:**`object`

* **`description`**

  `string` — Description of the organization's role

* **`display_name`**

  `string` — Display name of the organization's role

* **`extends`**

  `string` — Base role name for hierarchical roles

* **`name`**

  `string` — Unique name of the organization's role

* **`permissions`**

  `array` — List of permission names to assign to this role. Permissions must exist in the current environment.

  **Items:**

  `string`

**Example:**

```json
{
  "description": "Organization Viewer Role will be used only for viewing the objects",
  "display_name": "Organization Viewer Role",
  "extends": "admin_role",
  "name": "org_viewer_role",
  "permissions": ["read:users", "write:documents"]
}
```

### v1rolesCreatePermission

- **Type:**`object`

* **`description`**

  `string` — Description of the permission

* **`name`**

  `string` — Unique name/ID of the permission

**Example:**

```json
{
  "description": "Allows user to read documents from the system",
  "name": "read:documents"
}
```

### v1rolesCreateRole

- **Type:**`object`

* **`description`**

  `string` — Detailed description of the role's purpose, capabilities, and intended use cases. Maximum 2000 characters.

* **`display_name`**

  `string` — Human-readable display name for the role. Used in user interfaces, reports, and user-facing communications.

* **`extends`**

  `string` — Name of the base role that this role extends. Enables hierarchical role inheritance where this role inherits all permissions from the base role.

* **`name`**

  `string` — Unique name identifier for the role. Must be alphanumeric with underscores, 1-64 characters. This name is used in API calls and cannot be changed after creation.

* **`permissions`**

  `array` — List of permission names to assign to this role. Permissions must exist in the current environment. Maximum 100 permissions per role.

  **Items:**

  `string`

**Example:**

```json
{
  "description": "Can create, edit, and publish content but cannot delete content or manage user accounts",
  "display_name": "Content Editor",
  "extends": "viewer",
  "name": "content_editor",
  "permissions": ["read:content", "write:content", "publish:content"]
}
```

### v1rolesRole

- **Type:**`object`

* **`default_creator`**

  `boolean` — Indicates if this role is the default creator role for new organizations.

* **`default_member`**

  `boolean` — Indicates if this role is the default member role for new users.

* **`dependent_roles_count`**

  `integer`, format: `int32` — Number of roles that extend from this role (dependent roles count). Read-only field.

* **`description`**

  `string` — Detailed description of the role's purpose and capabilities. Maximum 2000 characters.

* **`display_name`**

  `string` — Human-readable display name for the role. Used in user interfaces and reports.

* **`extends`**

  `string` — Name of the base role that this role extends. Enables hierarchical role inheritance.

* **`id`**

  `string` — Unique system-generated identifier for the role. Immutable once created.

* **`is_org_role`**

  `boolean` — Indicates if this role is an organization role.

* **`name`**

  `string` — Unique name identifier for the role. Must be alphanumeric with underscores, 1-100 characters.

* **`permissions`**

  `array` — List of permissions with role source information. Only included when 'include' parameter is specified in the request.

  **Items:**
  - **`create_time`**

    `string`, format: `date-time`

  - **`description`**

    `string`

  - **`id`**

    `string`

  - **`name`**

    `string`

  - **`role_name`**

    `string` — Name of the role from which this permission was sourced

  - **`update_time`**

    `string`, format: `date-time`

**Example:**

```json
{
  "default_creator": true,
  "default_member": true,
  "dependent_roles_count": 3,
  "description": "Can create, edit, and publish content but cannot delete or manage users",
  "display_name": "Content Editor",
  "extends": "admin_role",
  "id": "role_1234abcd5678efgh",
  "is_org_role": true,
  "name": "content_editor",
  "permissions": [
    {
      "description": "Read Content",
      "name": "read:content",
      "role_name": "admin_role"
    },
    {
      "description": "Write Content",
      "name": "write:content",
      "role_name": "editor_role"
    }
  ]
}
```

### v1rolesUpdateRole

- **Type:**`object`

* **`description`**

  `string` — Detailed description of the role's purpose, capabilities, and intended use cases. Maximum 2000 characters.

* **`display_name`**

  `string` — Human-readable display name for the role. Used in user interfaces, reports, and user-facing communications.

* **`extends`**

  `string` — Name of the base role that this role extends. Enables hierarchical role inheritance where this role inherits all permissions from the base role.

* **`permissions`**

  `array` — List of permission names to assign to this role. When provided, this replaces all existing role-permission mappings. Permissions must exist in the current environment. Maximum 100 permissions per role.

  **Items:**

  `string`

**Example:**

```json
{
  "description": "Can create, edit, publish, and approve content. Cannot delete content or manage user accounts.",
  "display_name": "Senior Content Editor",
  "extends": "content_editor",
  "permissions": ["read:content", "write:content", "publish:content", "approve:content"]
}
```

### v1sessionsLocation

- **Type:**`object`

* **`city`**

  `string` — City name where the session originated based on IP geolocation. Approximate location derived from IP address.

* **`latitude`**

  `string` — Latitude coordinate of the estimated location. Decimal format (e.g., '37.7749'). Note: Represents IP geolocation center and may not be precise.

* **`longitude`**

  `string` — Longitude coordinate of the estimated location. Decimal format (e.g., '-122.4194'). Note: Represents IP geolocation center and may not be precise.

* **`region`**

  `string` — Geographic region name derived from IP geolocation. Represents the country-level location (e.g., 'United States', 'France').

* **`region_subdivision`**

  `string` — Regional subdivision code or name (e.g., state abbreviation for US, province for Canada). Two-letter ISO format when applicable.

**Example:**

```json
{
  "city": "San Francisco",
  "latitude": "37.7749",
  "longitude": "-122.4194",
  "region": "United States",
  "region_subdivision": "CA"
}
```

### v1usersCreateMembership

- **Type:**`object`

* **`inviter_email`**

  `string` — Email address of the user who invited this member. Must be a valid email address.

* **`metadata`**

  `object` — Custom key-value pairs for storing additional user context. Keys (3-25 chars), values (1-256 chars).

* **`roles`**

  `array` — Role to assign to the user within the organization

  **Items:**
  - **`display_name`**

    `string` — Human-readable name for the role

  - **`id`**

    `string` — Role ID

  - **`name`**

    `string` — Attribute name/identifier for the role used in system operations and API calls. This should be a machine-readable identifier that follows naming conventions.

**Example:**

```json
{
  "inviter_email": "john.doe@example.com",
  "metadata": {
    "department": "engineering",
    "location": "nyc-office"
  },
  "roles": [
    {
      "name": "admin"
    }
  ]
}
```

### v1usersUpdateMembership

- **Type:**`object`

* **`metadata`**

  `object` — Custom key-value pairs for storing additional user context. Keys (3-25 chars), values (1-256 chars).

* **`roles`**

  `array` — Role to assign to the user within the organization

  **Items:**
  - **`display_name`**

    `string` — Human-readable name for the role

  - **`id`**

    `string` — Role ID

  - **`name`**

    `string` — Attribute name/identifier for the role used in system operations and API calls. This should be a machine-readable identifier that follows naming conventions.

**Example:**

```json
{
  "metadata": {
    "department": "engineering",
    "location": "nyc-office"
  },
  "roles": [
    {
      "name": "admin"
    }
  ]
}
```

### v1usersUpdateUser

- **Type:**`object`

* **`external_id`**

  `string` — Your application's unique identifier for this organization, used to link Scalekit with your system.

* **`metadata`**

  `object` — Custom key-value pairs for storing additional user context. Keys (3-25 chars), values (1-256 chars).

* **`user_profile`**

  `object` — User's personal information including name, address, and other profile attributes.
  - **`custom_attributes`**

    `object` — Updates custom attributes for extended user profile data and application-specific information. Use this field to store business-specific user data like department, job title, security clearances, project assignments, or any other organizational attributes your application requires. Unlike system metadata, these attributes are typically managed by administrators or applications and are visible to end users. Keys must be 3-25 characters, values must be 1-256 characters, with a maximum of 20 key-value pairs.

  - **`family_name`**

    `string` — Updates the user's family name (last name or surname). Use this field to modify how the user's last name appears throughout the system. Maximum 255 characters allowed.

  - **`first_name`**

    `string` — \[DEPRECATED] Use given_name instead. User's given name. Maximum 200 characters.

  - **`gender`**

    `string` — Updates the user's gender identity information. Use this field to store the user's gender identity for personalization, compliance, or reporting purposes. This field supports any string value to accommodate diverse gender identities and should be handled with appropriate privacy considerations according to your organization's policies.

  - **`given_name`**

    `string` — Updates the user's given name (first name). Use this field to modify how the user's first name appears in the system and user interfaces. Maximum 255 characters allowed.

  - **`groups`**

    `array` — Updates the list of group names the user belongs to within the organization. Use this field to manage the user's group memberships for role-based access control, team assignments, or organizational structure. Groups are typically used for permission management and collaborative access. Each group name must be unique within the list, 1-250 characters long, with a maximum of 50 groups per user.

    **Items:**

    `string`

  - **`last_name`**

    `string` — \[DEPRECATED] Use family_name instead. User's family name. Maximum 200 characters.

  - **`locale`**

    `string` — Updates the user's preferred language and region settings using BCP-47 format codes. Use this field to customize the user's experience with localized content, date formats, number formatting, and UI language. When not specified, the user inherits the organization's default locale settings. Common values include \`en-US\`, \`en-GB\`, \`fr-FR\`, \`de-DE\`, and \`es-ES\`.

  - **`metadata`**

    `object` — Updates system-managed key-value pairs for internal tracking and operational data. Use this field to store system-generated metadata like account status, signup source, last activity tracking, or integration-specific identifiers. These fields are typically managed by automated processes rather than direct user input. Keys must be 3-25 characters, values must be 1-256 characters, with a maximum of 20 key-value pairs.

  - **`name`**

    `string` — Updates the user's complete display name. Use this field when you want to set the full name as a single string rather than using separate given and family names. This name appears in user interfaces, reports, and anywhere a formatted display name is needed.

  - **`phone_number`**

    `string` — Updates the user's phone number in E.164 international format. Use this field to enable SMS-based authentication methods, two-factor authentication, or phone-based account recovery. The phone number must include the country code and be formatted according to E.164 standards (e.g., \`+1\` for US numbers). This field is required when enabling SMS authentication features.

  - **`picture`**

    `string` — Updates the URL to the user's profile picture or avatar image. Use this field to set or change the user's profile photo that appears in user interfaces, directory listings, and collaborative features. The URL should point to a publicly accessible image file. Supported formats typically include JPEG, PNG, and GIF. Maximum URL length is 2048 characters.

  - **`preferred_username`**

    `string` — Updates the user's preferred username for display and identification purposes. Use this field to set a custom username that the user prefers to be known by, which may differ from their email or formal name. This username appears in user interfaces, mentions, and informal communications. Maximum 512 characters allowed.

**Example:**

```json
{
  "external_id": "ext_12345a67b89c",
  "metadata": {
    "department": "engineering",
    "location": "nyc-office"
  },
  "user_profile": {
    "custom_attributes": {
      "department": "engineering",
      "security_clearance": "level2"
    },
    "family_name": "Doe",
    "first_name": "John",
    "gender": "male",
    "given_name": "John",
    "groups": ["engineering", "managers"],
    "last_name": "Doe",
    "locale": "en-US",
    "metadata": {
      "account_status": "active",
      "signup_source": "mobile_app"
    },
    "name": "John Doe",
    "phone_number": "+14155552671",
    "picture": "https://example.com/avatar.jpg",
    "preferred_username": "John Michael Doe"
  }
}
```

### webauthnAllAcceptedCredentialsOptions

- **Type:**`object`

* **`all_accepted_credential_ids`**

  `array` — List of credential IDs the user can authenticate with

  **Items:**

  `string`

* **`rp_id`**

  `string` — Relying Party ID for credential operations

* **`user_id`**

  `string` — User ID for credential verification

**Example:**

```json
{
  "all_accepted_credential_ids": [""],
  "rp_id": "example.com",
  "user_id": "user_xyz789"
}
```

### webauthnDeleteCredentialResponse

- **Type:**`object`

* **`success`**

  `boolean` — Whether the credential was successfully deleted

* **`unknown_credential_options`**

  `object` — Options for handling unknown credentials in client applications
  - **`credential_id`**

    `string` — The deleted credential ID

  - **`rp_id`**

    `string` — The RP ID for this credential

**Example:**

```json
{
  "success": true,
  "unknown_credential_options": {
    "credential_id": "cred_abc123",
    "rp_id": "example.com"
  }
}
```

### webauthnListCredentialsResponse

- **Type:**`object`

* **`all_accepted_credentials_options`**

  `object` — Options including RP ID and all accepted credential IDs for authentication
  - **`all_accepted_credential_ids`**

    `array` — List of credential IDs the user can authenticate with

    **Items:**

    `string`

  - **`rp_id`**

    `string` — Relying Party ID for credential operations

  - **`user_id`**

    `string` — User ID for credential verification

* **`credentials`**

  `array` — All passkeys registered for the user

  **Items:**
  - **`attestation_type`**

    `string` — Type of attestation: "none", "indirect", or "direct"

  - **`authenticator`**

    `object` — Authenticator information including model and name
    - **`aaguid`**

      `string` — Authenticator Attestation GUID (AAGUID) identifying the device model

    - **`attachment`**

      `string` — Attachment type: "platform" (built-in) or "cross-platform"

    - **`icon_dark`**

      `string` — Icon URL for dark theme display

    - **`icon_light`**

      `string` — Icon URL for light theme display

    - **`name`**

      `string` — Human-readable name of the authenticator model

  - **`authenticator_flags`**

    `object` — Flags indicating authenticator capabilities
    - **`backup_eligible`**

      `boolean` — Whether this credential can be backed up to another device

    - **`backup_state`**

      `boolean` — Whether this credential was synced or backed up

    - **`user_present`**

      `boolean` — Whether the user was present during authentication

    - **`user_verified`**

      `boolean` — Whether the user was verified (e.g., fingerprint, PIN)

  - **`client_info`**

    `object` — Geographic and network information from registration
    - **`city`**

      `string` — City name

    - **`ip`**

      `string` — IP address from which credential was registered

    - **`region`**

      `string` — Geographic region (e.g., "US")

    - **`region_subdivision`**

      `string` — Regional subdivision (e.g., "CA")

  - **`created_at`**

    `string`, format: `date-time` — Timestamp when the credential was created

  - **`credential_id`**

    `string` — The actual credential ID bytes from the authenticator

  - **`display_name`**

    `string` — Optional user-friendly name for this passkey

  - **`id`**

    `string` — Credential unique identifier

  - **`transports`**

    `array` — Supported transports for this credential

    **Items:**

    `string`

  - **`updated_at`**

    `string`, format: `date-time` — Timestamp of last update

  - **`user_agent`**

    `object` — Browser and device information from registration
    - **`browser`**

      `string` — Browser name (e.g., "Chrome", "Safari")

    - **`browser_version`**

      `string` — Browser version number

    - **`device_model`**

      `string` — Device model if available

    - **`device_type`**

      `string` — Device type: "desktop", "mobile", or "tablet"

    - **`os`**

      `string` — Operating system name (e.g., "Windows", "iOS")

    - **`os_version`**

      `string` — Operating system version

    - **`raw`**

      `string` — Raw user agent string from the browser

    - **`url`**

      `string` — Parsed user agent URL reference

  - **`user_id`**

    `string` — User ID this credential belongs to

**Example:**

```json
{
  "all_accepted_credentials_options": {
    "all_accepted_credential_ids": [""],
    "rp_id": "example.com",
    "user_id": "user_xyz789"
  },
  "credentials": [
    {
      "attestation_type": "direct",
      "authenticator": null,
      "authenticator_flags": null,
      "client_info": null,
      "created_at": "2025-02-15T06:23:44.560000Z",
      "credential_id": "",
      "display_name": "My Yubikey",
      "id": "cred_abc123",
      "transports": [""],
      "updated_at": "2025-02-15T06:23:44.560000Z",
      "user_agent": null,
      "user_id": "user_xyz789"
    }
  ]
}
```

### webauthnUnknownCredentialOptions

- **Type:**`object`

* **`credential_id`**

  `string` — The deleted credential ID

* **`rp_id`**

  `string` — The RP ID for this credential

**Example:**

```json
{
  "credential_id": "cred_abc123",
  "rp_id": "example.com"
}
```

### webauthnUpdateCredentialResponse

- **Type:**`object`

* **`credential`**

  `object` — The updated credential with new display name
  - **`attestation_type`**

    `string` — Type of attestation: "none", "indirect", or "direct"

  - **`authenticator`**

    `object` — Authenticator information including model and name
    - **`aaguid`**

      `string` — Authenticator Attestation GUID (AAGUID) identifying the device model

    - **`attachment`**

      `string` — Attachment type: "platform" (built-in) or "cross-platform"

    - **`icon_dark`**

      `string` — Icon URL for dark theme display

    - **`icon_light`**

      `string` — Icon URL for light theme display

    - **`name`**

      `string` — Human-readable name of the authenticator model

  - **`authenticator_flags`**

    `object` — Flags indicating authenticator capabilities
    - **`backup_eligible`**

      `boolean` — Whether this credential can be backed up to another device

    - **`backup_state`**

      `boolean` — Whether this credential was synced or backed up

    - **`user_present`**

      `boolean` — Whether the user was present during authentication

    - **`user_verified`**

      `boolean` — Whether the user was verified (e.g., fingerprint, PIN)

  - **`client_info`**

    `object` — Geographic and network information from registration
    - **`city`**

      `string` — City name

    - **`ip`**

      `string` — IP address from which credential was registered

    - **`region`**

      `string` — Geographic region (e.g., "US")

    - **`region_subdivision`**

      `string` — Regional subdivision (e.g., "CA")

  - **`created_at`**

    `string`, format: `date-time` — Timestamp when the credential was created

  - **`credential_id`**

    `string` — The actual credential ID bytes from the authenticator

  - **`display_name`**

    `string` — Optional user-friendly name for this passkey

  - **`id`**

    `string` — Credential unique identifier

  - **`transports`**

    `array` — Supported transports for this credential

    **Items:**

    `string`

  - **`updated_at`**

    `string`, format: `date-time` — Timestamp of last update

  - **`user_agent`**

    `object` — Browser and device information from registration
    - **`browser`**

      `string` — Browser name (e.g., "Chrome", "Safari")

    - **`browser_version`**

      `string` — Browser version number

    - **`device_model`**

      `string` — Device model if available

    - **`device_type`**

      `string` — Device type: "desktop", "mobile", or "tablet"

    - **`os`**

      `string` — Operating system name (e.g., "Windows", "iOS")

    - **`os_version`**

      `string` — Operating system version

    - **`raw`**

      `string` — Raw user agent string from the browser

    - **`url`**

      `string` — Parsed user agent URL reference

  - **`user_id`**

    `string` — User ID this credential belongs to

**Example:**

```json
{
  "credential": {
    "attestation_type": "direct",
    "authenticator": null,
    "authenticator_flags": null,
    "client_info": null,
    "created_at": "2025-02-15T06:23:44.560000Z",
    "credential_id": "",
    "display_name": "My Yubikey",
    "id": "cred_abc123",
    "transports": [""],
    "updated_at": "2025-02-15T06:23:44.560000Z",
    "user_agent": null,
    "user_id": "user_xyz789"
  }
}
```

### webauthnWebAuthnCredential

- **Type:**`object`

* **`attestation_type`**

  `string` — Type of attestation: "none", "indirect", or "direct"

* **`authenticator`**

  `object` — Authenticator information including model and name
  - **`aaguid`**

    `string` — Authenticator Attestation GUID (AAGUID) identifying the device model

  - **`attachment`**

    `string` — Attachment type: "platform" (built-in) or "cross-platform"

  - **`icon_dark`**

    `string` — Icon URL for dark theme display

  - **`icon_light`**

    `string` — Icon URL for light theme display

  - **`name`**

    `string` — Human-readable name of the authenticator model

* **`authenticator_flags`**

  `object` — Flags indicating authenticator capabilities
  - **`backup_eligible`**

    `boolean` — Whether this credential can be backed up to another device

  - **`backup_state`**

    `boolean` — Whether this credential was synced or backed up

  - **`user_present`**

    `boolean` — Whether the user was present during authentication

  - **`user_verified`**

    `boolean` — Whether the user was verified (e.g., fingerprint, PIN)

* **`client_info`**

  `object` — Geographic and network information from registration
  - **`city`**

    `string` — City name

  - **`ip`**

    `string` — IP address from which credential was registered

  - **`region`**

    `string` — Geographic region (e.g., "US")

  - **`region_subdivision`**

    `string` — Regional subdivision (e.g., "CA")

* **`created_at`**

  `string`, format: `date-time` — Timestamp when the credential was created

* **`credential_id`**

  `string` — The actual credential ID bytes from the authenticator

* **`display_name`**

  `string` — Optional user-friendly name for this passkey

* **`id`**

  `string` — Credential unique identifier

* **`transports`**

  `array` — Supported transports for this credential

  **Items:**

  `string`

* **`updated_at`**

  `string`, format: `date-time` — Timestamp of last update

* **`user_agent`**

  `object` — Browser and device information from registration
  - **`browser`**

    `string` — Browser name (e.g., "Chrome", "Safari")

  - **`browser_version`**

    `string` — Browser version number

  - **`device_model`**

    `string` — Device model if available

  - **`device_type`**

    `string` — Device type: "desktop", "mobile", or "tablet"

  - **`os`**

    `string` — Operating system name (e.g., "Windows", "iOS")

  - **`os_version`**

    `string` — Operating system version

  - **`raw`**

    `string` — Raw user agent string from the browser

  - **`url`**

    `string` — Parsed user agent URL reference

* **`user_id`**

  `string` — User ID this credential belongs to

**Example:**

```json
{
  "attestation_type": "direct",
  "authenticator": {
    "aaguid": "",
    "attachment": "platform",
    "icon_dark": "",
    "icon_light": "",
    "name": "Apple Touch ID"
  },
  "authenticator_flags": {
    "backup_eligible": true,
    "backup_state": true,
    "user_present": true,
    "user_verified": true
  },
  "client_info": {
    "city": "San Francisco",
    "ip": "192.0.2.1",
    "region": "US",
    "region_subdivision": "CA"
  },
  "created_at": "2025-02-15T06:23:44.560000Z",
  "credential_id": "",
  "display_name": "My Yubikey",
  "id": "cred_abc123",
  "transports": [""],
  "updated_at": "2025-02-15T06:23:44.560000Z",
  "user_agent": {
    "browser": "Chrome",
    "browser_version": "120.0.6099.129",
    "device_model": "iPhone15,2",
    "device_type": "mobile",
    "os": "macOS",
    "os_version": "14.2",
    "raw": "",
    "url": ""
  },
  "user_id": "user_xyz789"
}
```

### TestUser

- **Type:**`object`

* **`emails`**

  `array` — Explicit list of test user email addresses. Each email must contain '+sktest' in the local part (e.g. alice+sktest\@example.com). Maximum 5 emails per environment (configurable server-side).

  **Items:**

  `string`, format: `email`

* **`enabled`**

  `boolean` — Whether test user mode is enabled for this environment.

* **`static_confirmation_code`**

  `string` — Six-digit static OTP code used in place of a real verification email for matched test users.

**Example:**

```json
{
  "enabled": true,
  "emails": ["alice+sktest@example.com", "bob+sktest@example.com"],
  "static_confirmation_code": "424242"
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
