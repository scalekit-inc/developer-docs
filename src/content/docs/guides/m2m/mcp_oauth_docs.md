---
title: OAuth Authorization Server for MCP Servers
description: Secure your Model Context Protocol (MCP) servers with Scalekit's drop-in OAuth 2.1 authorization solution
sidebar:
  label: OAuth for MCP Servers
prev: false
next: false
---
**Secure your Model Context Protocol (MCP) servers with Scalekit's drop-in OAuth 2.1 authorization solution**

## Overview

Scalekit's OAuth authorization server provides enterprise-grade authentication and authorization for MCP servers, implementing the official [MCP authorization specification](https://modelcontextprotocol.io/specification/draft/basic/authorization) with full OAuth 2.1 compliance. Transform your unsecured MCP endpoints into production-ready, auditable, and scoped-access services in minutes.

### Why You Need This

Remote MCP servers without authorization are security vulnerabilities waiting to happen. As [detailed in our blog post](https://www.scalekit.com/blog/ship-secure-mcp-server), shipping "naked" MCP servers means:

- No control over who accesses your tools and data
- No session duration management
- No audit trail of agent interactions
- Open endpoints that risk data leaks
- Non-compliance with MCP security specifications

Scalekit's authorization server solves these problems by providing:

- **Identity-scoped access**: Know exactly which agents are calling your MCP server
- **Granular permissions**: Scope access with fine-grained OAuth scopes
- **Short-lived tokens**: Reduce attack surface with configurable token lifetimes
- **Full compliance**: OAuth 2.1, PKCE, and Dynamic Client Registration support
- **Complete audit trail**: Track every interaction for security and compliance

## How It Works

Our authorization server acts as the OAuth 2.1 identity provider for your MCP server, implementing a clean separation of concerns:

```mermaid showLineNumbers=false

┌─────────────┐    ┌──────────────────┐    ┌─────────────┐
│   AI Agent  │───▶│ Scalekit OAuth   │───▶│ Your MCP    │
│  (Client)   │    │ Authorization    │    │ Server      │
│             │    │ Server           │    │ (Resource)  │
└─────────────┘    └──────────────────┘    └─────────────┘
```

**The authorization server** is your identity gatekeeper that:

- Authenticates users and agents
- Issues access tokens with specific scopes
- Handles OAuth 2.1 flows (authorization code, client credentials)
- Supports dynamic client registration for seamless integration

**Your MCP server** validates tokens and enforces permissions, only admitting requests with valid authorization.

## Getting Started

### Prerequisites

- An MCP server that accepts HTTP requests
- Node.js 16+ or equivalent runtime for your backend
- Basic understanding of OAuth 2.1 flows

### Step 1: Set Up Your Authorization Server

Contact our team to provision your Scalekit authorization server instance. You'll receive:

- Authorization server endpoint (e.g., `https://your-org.scalekit.com`)
- Admin dashboard access for configuration
- API credentials for server-to-server operations

### Step 2: Configure Your MCP Server

#### Token Validation Middleware

Your MCP server needs to validate incoming access tokens. Here's a complete middleware implementation:

```javascript
import { jwtVerify, createRemoteJWKSet } from 'jose';

// Configure JWKS endpoint from your Scalekit instance
const JWKS = createRemoteJWKSet(
  new URL('https://your-org.scalekit.com/.well-known/jwks')
);

// WWW-Authenticate header for 401 responses
const WWW_AUTHENTICATE_HEADER = [
  'Bearer error="unauthorized"',
  'error_description="Authorization required"',
  `resource_metadata="https://your-mcp-server.com/.well-known/oauth-protected-resource"`
].join(', ');

const validateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.match(/^Bearer (.+)$/)?.[1];
  
  if (!token) {
    return res
      .set('WWW-Authenticate', WWW_AUTHENTICATE_HEADER)
      .status(401)
      .json({ 
        error: 'unauthorized',
        error_description: 'Bearer token required' 
      });
  }

  try {
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: 'https://your-org.scalekit.com',
      audience: 'https://your-mcp-server.com' // Your MCP server identifier
    });

    // Attach token claims to request for downstream use
    req.auth = {
      userId: payload.sub,
      scopes: payload.scope?.split(' ') || [],
      clientId: payload.client_id,
      expiresAt: payload.exp
    };

    next();
  } catch (error) {
    console.error('Token validation failed:', error.message);
    return res
      .set('WWW-Authenticate', WWW_AUTHENTICATE_HEADER)
      .status(401)
      .json({ 
        error: 'invalid_token',
        error_description: 'Bearer token is invalid or expired' 
      });
  }
};

// Apply to all MCP endpoints
app.use('/mcp', validateToken);
```

#### Scope-Based Authorization

Implement granular permissions using OAuth scopes:

```javascript
const requireScope = (requiredScope) => {
  return (req, res, next) => {
    const userScopes = req.auth.scopes || [];
    
    if (!userScopes.includes(requiredScope)) {
      return res.status(403).json({
        error: 'insufficient_scope',
        error_description: `Required scope: ${requiredScope}`,
        scope: requiredScope
      });
    }
    
    next();
  };
};

// Example: Protect specific MCP tools with scopes
app.post('/mcp/tools/weather', 
  requireScope('mcp:tools:weather'), 
  handleWeatherRequest
);

app.post('/mcp/tools/calendar', 
  requireScope('mcp:tools:calendar:read'), 
  handleCalendarRead
);

app.post('/mcp/tools/send-email', 
  requireScope('mcp:tools:email:send'), 
  handleEmailSend
);
```

### Step 3: Implement Resource Metadata Discovery

MCP clients discover your authorization server through the OAuth 2.0 Protected Resource Metadata endpoint:

```javascript
// Required: OAuth Protected Resource Metadata endpoint
app.get('/.well-known/oauth-protected-resource', (req, res) => {
  res.json({
    resource: 'https://your-mcp-server.com',
    authorization_servers: ['https://your-org.scalekit.com'],
    bearer_methods_supported: ['header'],
    resource_documentation: 'https://your-mcp-server.com/docs',
    scopes_supported: [
      'mcp:tools:weather',
      'mcp:tools:calendar:read',
      'mcp:tools:calendar:write',
      'mcp:tools:email:send',
      'mcp:resources:*'
    ]
  });
});

// Optional: Proxy authorization server metadata for legacy clients
app.get('/.well-known/oauth-authorization-server', async (req, res) => {
  try {
    const response = await fetch(
      'https://your-org.scalekit.com/.well-known/oauth-authorization-server'
    );
    const metadata = await response.json();
    res.json(metadata);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch authorization server metadata' });
  }
});
```

### Step 4: Test the Integration

Create a simple test to verify your setup:

```javascript
// Test script to validate token flow
const testMCPAuth = async () => {
  // This would typically be handled by your MCP client
  const tokenResponse = await fetch('https://your-org.scalekit.com/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: 'your-test-client-id',
      client_secret: 'your-test-client-secret',
      scope: 'mcp:tools:weather'
    })
  });
  
  const { access_token } = await tokenResponse.json();
  
  // Test MCP server with token
  const mcpResponse = await fetch('https://your-mcp-server.com/mcp/tools/weather', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      method: 'weather/get_forecast',
      params: { location: 'San Francisco' }
    })
  });
  
  console.log('MCP Response:', await mcpResponse.json());
};
```

## OAuth 2.1 Flows Supported

### Authorization Code Flow (for user-facing agents)

Ideal when an AI agent acts on behalf of a human user:

```javascript
// Step 1: Redirect user to authorization server
const authURL = new URL('https://your-org.scalekit.com/oauth2/authorize');
authURL.searchParams.set('response_type', 'code');
authURL.searchParams.set('client_id', 'your-client-id');
authURL.searchParams.set('redirect_uri', 'https://your-app.com/callback');
authURL.searchParams.set('scope', 'mcp:tools:calendar:read mcp:tools:email:send');
authURL.searchParams.set('state', generateSecureRandomString());
authURL.searchParams.set('code_challenge', generatePKCEChallenge());
authURL.searchParams.set('code_challenge_method', 'S256');

// Step 2: Handle callback and exchange code for token
app.get('/callback', async (req, res) => {
  const { code, state } = req.query;
  
  // Verify state parameter to prevent CSRF
  if (!isValidState(state)) {
    return res.status(400).json({ error: 'Invalid state parameter' });
  }
  
  const tokenResponse = await fetch('https://your-org.scalekit.com/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      client_id: 'your-client-id',
      redirect_uri: 'https://your-app.com/callback',
      code_verifier: getPKCEVerifier() // From PKCE challenge generation
    })
  });
  
  const tokens = await tokenResponse.json();
  // Store tokens securely and proceed with MCP calls
});
```

### Client Credentials Flow (for machine-to-machine)

Perfect for automated agents that don't represent a specific user:

```javascript
const getMachineToken = async () => {
  const response = await fetch('https://your-org.scalekit.com/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: 'your-service-client-id',
      client_secret: 'your-service-client-secret',
      scope: 'mcp:tools:inventory:check mcp:resources:store-data'
    })
  });
  
  return await response.json();
};
```

## Scope Design Best Practices

Design OAuth scopes that reflect your MCP server's actual capabilities and security requirements:

### Hierarchical Scopes

```javascript
// Resource-based scopes
'mcp:resources:customer-data:read'    // Read customer data
'mcp:resources:customer-data:write'   // Modify customer data
'mcp:resources:*'                     // All resources (admin-level)

// Tool-based scopes
'mcp:tools:weather'                   // Weather API access
'mcp:tools:calendar:read'             // Read calendar events
'mcp:tools:calendar:write'            // Create/modify calendar events
'mcp:tools:email:send'                // Send emails
'mcp:tools:*'                         // All tools access

// Action-based scopes
'mcp:exec:workflows:risk-assessment'  // Execute risk assessment workflow
'mcp:exec:functions:data-analysis'    // Run data analysis functions
```

### Scope Validation Helpers

```javascript
const ScopeValidator = {
  hasScope: (userScopes, requiredScope) => {
    return userScopes.includes(requiredScope) || 
           userScopes.includes(requiredScope.split(':').slice(0, -1).join(':') + ':*');
  },
  
  hasAnyScope: (userScopes, allowedScopes) => {
    return allowedScopes.some(scope => ScopeValidator.hasScope(userScopes, scope));
  },
  
  validateToolAccess: (userScopes, toolName) => {
    const toolScope = `mcp:tools:${toolName}`;
    const wildcardScope = 'mcp:tools:*';
    return userScopes.includes(toolScope) || userScopes.includes(wildcardScope);
  }
};

// Usage in MCP tool handlers
app.post('/mcp/tools/:toolName', (req, res) => {
  const { toolName } = req.params;
  const userScopes = req.auth.scopes;
  
  if (!ScopeValidator.validateToolAccess(userScopes, toolName)) {
    return res.status(403).json({
      error: 'insufficient_scope',
      error_description: `Access to tool '${toolName}' requires appropriate scope`
    });
  }
  
  // Process tool request
});
```

## Dynamic Client Registration

Enable seamless integration for new MCP clients:

```javascript
// MCP clients can auto-register using DCR
const registerClient = async (clientMetadata) => {
  const response = await fetch('https://your-org.scalekit.com/oauth2/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_name: 'AI Sales Assistant',
      client_uri: 'https://sales-ai.company.com',
      redirect_uris: ['https://sales-ai.company.com/oauth/callback'],
      grant_types: ['authorization_code', 'refresh_token'],
      response_types: ['code'],
      scope: 'mcp:tools:crm:read mcp:tools:email:send',
      token_endpoint_auth_method: 'client_secret_basic',
      ...clientMetadata
    })
  });
  
  return await response.json();
  // Returns: { client_id, client_secret, client_id_issued_at, ... }
};
```

## Security Implementation

### Token Introspection

For high-security scenarios, validate tokens in real-time:

```javascript
const introspectToken = async (token) => {
  const response = await fetch('https://your-org.scalekit.com/oauth2/introspect', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${btoa('your-client-id:your-client-secret')}`
    },
    body: new URLSearchParams({ token })
  });
  
  return await response.json();
  // Returns: { active: true, scope: '...', client_id: '...', exp: ... }
};

// Enhanced middleware with introspection
const strictTokenValidation = async (req, res, next) => {
  const token = req.headers.authorization?.match(/^Bearer (.+)$/)?.[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Bearer token required' });
  }
  
  try {
    // First validate JWT structure and signature
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: 'https://your-org.scalekit.com'
    });
    
    // Then introspect for real-time validation
    const introspection = await introspectToken(token);
    
    if (!introspection.active) {
      return res.status(401).json({ error: 'Token is not active' });
    }
    
    req.auth = {
      ...payload,
      scopes: introspection.scope?.split(' ') || []
    };
    
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
```

### Rate Limiting by Client

Implement client-specific rate limits:

```javascript
import rateLimit from 'express-rate-limit';

const createClientRateLimit = () => {
  return rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: (req) => {
      // Different limits based on client type or scopes
      const scopes = req.auth?.scopes || [];
      if (scopes.includes('mcp:tools:*')) return 1000; // Premium client
      if (scopes.includes('mcp:tools:basic')) return 100; // Basic client
      return 50; // Default limit
    },
    keyGenerator: (req) => req.auth?.clientId || req.ip,
    message: { 
      error: 'rate_limit_exceeded',
      error_description: 'Too many requests from this client' 
    }
  });
};

app.use('/mcp', createClientRateLimit());
```

## Monitoring and Observability

### Comprehensive Logging

Track all OAuth and MCP interactions:

```javascript
const auditLogger = {
  logTokenRequest: (clientId, grantType, scopes, success) => {
    console.log(JSON.stringify({
      event: 'oauth_token_request',
      timestamp: new Date().toISOString(),
      client_id: clientId,
      grant_type: grantType,
      requested_scopes: scopes,
      success
    }));
  },
  
  logMCPAccess: (req, toolName, success, error = null) => {
    console.log(JSON.stringify({
      event: 'mcp_tool_access',
      timestamp: new Date().toISOString(),
      user_id: req.auth?.userId,
      client_id: req.auth?.clientId,
      tool_name: toolName,
      scopes: req.auth?.scopes,
      success,
      error: error?.message,
      ip_address: req.ip,
      user_agent: req.get('User-Agent')
    }));
  }
};

// Use in your MCP handlers
app.post('/mcp/tools/:toolName', async (req, res) => {
  const { toolName } = req.params;
  
  try {
    // Process tool request
    const result = await processToolRequest(toolName, req.body);
    
    auditLogger.logMCPAccess(req, toolName, true);
    res.json(result);
  } catch (error) {
    auditLogger.logMCPAccess(req, toolName, false, error);
    res.status(500).json({ error: 'Tool execution failed' });
  }
});
```

### Health Check Endpoints

Monitor your MCP server and authorization integration:

```javascript
app.get('/health', async (req, res) => {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    services: {
      mcp_server: 'healthy',
      oauth_server: 'unknown'
    }
  };
  
  try {
    // Test OAuth server connectivity
    const oauthTest = await fetch('https://your-org.scalekit.com/.well-known/oauth-authorization-server');
    health.services.oauth_server = oauthTest.ok ? 'healthy' : 'degraded';
  } catch (error) {
    health.services.oauth_server = 'unhealthy';
    health.status = 'degraded';
  }
  
  const statusCode = health.status === 'healthy' ? 200 : 503;
  res.status(statusCode).json(health);
});
```

## Troubleshooting

### Common Issues and Solutions

**Token Validation Failures**

```javascript
// Debug token validation issues
const debugTokenValidation = async (token) => {
  try {
    // Check token structure
    const [header, payload, signature] = token.split('.');
    console.log('Token Header:', JSON.parse(atob(header)));
    console.log('Token Payload:', JSON.parse(atob(payload)));
    
    // Validate with detailed error info
    await jwtVerify(token, JWKS, {
      issuer: 'https://your-org.scalekit.com'
    });
  } catch (error) {
    console.error('Token validation error:', {
      name: error.name,
      message: error.message,
      code: error.code
    });
  }
};
```

**CORS Issues with Authorization Server**

```javascript
// Configure CORS for OAuth endpoints
app.use('/oauth', cors({
  origin: 'https://your-org.scalekit.com',
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Authorization', 'Content-Type', 'MCP-Protocol-Version']
}));
```

**Scope Permission Debugging**

```javascript
const debugScopes = (req, res, next) => {
  console.log('Request Scopes:', {
    user_scopes: req.auth?.scopes,
    required_scope: req.requiredScope,
    has_permission: req.auth?.scopes?.includes(req.requiredScope)
  });
  next();
};
```

### Error Response Standards

Follow OAuth 2.1 and MCP error response formats:

```javascript
const sendOAuthError = (res, error, description, statusCode = 400) => {
  res.status(statusCode).json({
    error,
    error_description: description,
    error_uri: 'https://your-mcp-server.com/docs/errors'
  });
};

// Usage examples
app.use((error, req, res, next) => {
  if (error.name === 'TokenExpiredError') {
    return sendOAuthError(res, 'invalid_token', 'Access token has expired', 401);
  }
  
  if (error.name === 'InsufficientScopeError') {
    return sendOAuthError(res, 'insufficient_scope', `Required scope: ${error.requiredScope}`, 403);
  }
  
  // Default error
  sendOAuthError(res, 'server_error', 'An unexpected error occurred', 500);
});
```

## Advanced Configuration

### Custom Scope Mapping

Map OAuth scopes to internal permissions:

```javascript
const scopePermissionMap = {
  'mcp:tools:weather': ['weather:read'],
  'mcp:tools:calendar:read': ['calendar:events:read'],
  'mcp:tools:calendar:write': ['calendar:events:read', 'calendar:events:write'],
  'mcp:tools:email:send': ['email:send', 'contacts:read'],
  'mcp:resources:customer-data': ['customers:read', 'customers:write']
};

const getPermissionsFromScopes = (scopes) => {
  const permissions = new Set();
  scopes.forEach(scope => {
    const scopePermissions = scopePermissionMap[scope] || [];
    scopePermissions.forEach(permission => permissions.add(permission));
  });
  return Array.from(permissions);
};
```

### Refresh Token Management

Handle token refresh for long-running agents:

```javascript
const TokenManager = {
  async refreshToken(refreshToken) {
    const response = await fetch('https://your-org.scalekit.com/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: 'your-client-id',
        client_secret: 'your-client-secret'
      })
    });
    
    return await response.json();
  },
  
  async autoRefreshWrapper(tokenStore, makeRequest) {
    try {
      return await makeRequest(tokenStore.accessToken);
    } catch (error) {
      if (error.status === 401) {
        // Token expired, try refresh
        const newTokens = await this.refreshToken(tokenStore.refreshToken);
        tokenStore.accessToken = newTokens.access_token;
        tokenStore.refreshToken = newTokens.refresh_token;
        
        // Retry original request
        return await makeRequest(tokenStore.accessToken);
      }
      throw error;
    }
  }
};
```

## API Reference

### Authorization Server Endpoints

**Authorization Endpoint**

```
GET https://your-org.scalekit.com/oauth2/authorize
```

**Token Endpoint**

```
POST https://your-org.scalekit.com/oauth2/token
```

**Dynamic Client Registration**

```
POST https://your-org.scalekit.com/oauth2/register
```

**Token Introspection**

```
POST https://your-org.scalekit.com/oauth2/introspect
```

**JWKS Endpoint**

```
GET https://your-org.scalekit.com/.well-known/jwks
```

**Server Metadata**

```
GET https://your-org.scalekit.com/.well-known/oauth-authorization-server
```

### MCP Server Required Endpoints

**Protected Resource Metadata** (Required)

```
GET https://your-mcp-server.com/.well-known/oauth-protected-resource
```

**Authorization Server Metadata Proxy** (Optional, for legacy clients)

```
GET https://your-mcp-server.com/.well-known/oauth-authorization-server
```

## Next Steps

1. **Contact Scalekit** to provision your authorization server instance
2. **Implement token validation** in your MCP server using the provided middleware
3. **Design your scope model** based on your MCP tools and resources
4. **Test the integration** with different OAuth flows
5. **Monitor and audit** all interactions for security compliance

For detailed technical insights, read our comprehensive guides:

- [Why MCP servers need OAuth security](https://www.scalekit.com/blog/ship-secure-mcp-server)
- [OAuth 2.1 and MCP: The new standard for secure AI integrations](https://www.scalekit.com/blog/oauth-2-1-mcp-secure-ai-integrations)

Transform your MCP server from a security risk into a production-ready, enterprise-grade service with Scalekit's drop-in OAuth authorization server.
