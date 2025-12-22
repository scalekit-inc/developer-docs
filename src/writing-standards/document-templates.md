# Document Type Templates

**Guideline:** Every documentation page should fit into one of these four categories. Use these as templates rather than rigid requirements - adapt based on your content needs.

## A) How-to Guide (Task-Oriented)

**Purpose:** Produce practical, step-by-step guides that help users accomplish specific tasks.

### Recommended Structure

1. **H2 Overview** - What users will accomplish and when to use this guide (1-3 paragraphs)
2. **H2 Prerequisites** - Required roles, scopes, versions, prior setup (if applicable)
3. **H2 [Procedure Name]** - Main content using `<Steps>` component with numbered steps
   - Include verification indicators or success criteria where helpful
4. **H2 Verify** - How to confirm successful completion (if not obvious)
5. **H2 Next Steps** - Links to subsequent guides or related documentation
6. **H2 FAQs** (optional) - Short, scoped questions

### Flexible Approach

- Some guides may naturally combine Overview and Prerequisites
- Simple procedures might not need a separate Verify section
- Use your judgment based on content complexity

### Step Structure Pattern

```mdx
<Steps>

1. ## [Action verb] [object]

   Opening explanation of what this step accomplishes and why.

   <Tabs syncKey="tech-stack">
     <TabItem value="node" label="Node.js">
       [Code example or placeholder]
     </TabItem>
     [Other languages...]
   </Tabs>

   Additional context or verification criteria.

   <Aside type="tip" title="Best practice">
     Guidance or recommendation.
   </Aside>

2. ## [Next action verb] [object]

   [Continue pattern...]

</Steps>
```

### When to Use

- Implementing authentication flows
- Setting up integrations
- Configuring features
- Migration guides

### Example Titles

- "Implement user login with Scalekit"
- "Configure SSO for your organization"
- "Set up SCIM provisioning"
- "Migrate from custom auth to Scalekit"

## B) API Reference Page

**Purpose:** Generate clear endpoint documentation with technical specifications.

### Recommended Structure

1. **H2 Endpoint Summary** - Brief description of what the endpoint does
2. **H2 Authentication** - Auth scheme, required headers, scopes
3. **H2 Base URL** - Environment URL pattern
4. **H2 Parameters** - Request parameters in table format
5. **H2 Request** - Example requests (curl + SDK examples)
6. **H2 Response** - Success responses with schema
7. **H2 Errors** - Error responses in table format (status | code | message | resolution)
8. **H2 Examples** (optional) - Additional use case examples

### Flexible Approach

- For simple endpoints, combine Summary and Authentication
- Include error tables when they provide value beyond standard HTTP errors
- Focus on clarity over rigid structure

### Parameter Table Format

```markdown
| Parameter      | Type     | Required    | Default | Description                                    |
| -------------- | -------- | ----------- | ------- | ---------------------------------------------- |
| `client_id`    | `string` | Yes         | -       | Your application's public identifier           |
| `redirect_uri` | `string` | Yes         | -       | Must match URL registered in dashboard exactly |
| `state`        | `string` | Recommended | -       | Random string to prevent CSRF attacks          |
```

### Error Table Format

```markdown
| Status | Code                 | Message                    | Resolution                                  |
| ------ | -------------------- | -------------------------- | ------------------------------------------- |
| 400    | `invalid_request`    | Missing required parameter | Ensure all required parameters are included |
| 401    | `invalid_client`     | Invalid client credentials | Verify your client_id and client_secret     |
| 404    | `resource_not_found` | Organization not found     | Check the organization ID is correct        |
```

### When to Use

- Documenting REST API endpoints
- SDK method references
- Webhook payload specifications
- GraphQL operations

### Example Titles

- "POST /oauth/token - Exchange authorization code"
- "GET /api/v1/organizations - List organizations"
- "Webhook Event: user.created"

## C) Concept Page (Explanatory)

**Purpose:** Explain domain concepts clearly without step-by-step instructions.

### Recommended Structure

1. **H2 Overview** - What the concept is and why it matters (1-3 paragraphs)
2. **H2 How It Works** - Architecture, workflow, or mechanism explanation
3. **H2 Key Concepts** - Important terms and their definitions
4. **H2 Use Cases** - When and why to use this concept
5. **H2 Trade-offs** (if applicable) - Benefits, limitations, alternatives
6. **H2 Best Practices** - Recommended patterns and approaches
7. **H2 Related Guides** - Links to implementation guides and references

### Flexible Approach

- Combine sections naturally based on content flow
- Use diagrams and examples to illustrate concepts
- Focus on helping readers understand, not just follow steps

### When to Use

- Explaining authentication flows
- Describing system architecture
- Defining terminology (tokens, sessions, roles)
- Discussing security models
- Comparing approaches or patterns

### Example Titles

- "Understanding OAuth 2.1 authorization flow"
- "Session management concepts"
- "Role-based access control in Scalekit"
- "Token types and their purposes"

### Key Concepts Format

```markdown
## Key Concepts

- **Access Token** - Short-lived JWT (1 hour) used for API authorization. Contains user ID, organization ID, and permissions.
- **ID Token** - JWT containing verified user identity claims like email, name, and verification status.
- **Refresh Token** - Long-lived token (30 days) used to obtain new access tokens without re-authentication.
```

## D) Release Notes / Change Log

**Purpose:** Document product changes, migrations, and version updates with clear impact assessment.

### Required Sections

1. **H2 Summary** - High-level overview of the release with version number and date
2. **H2 Changes** - Organized by type:
   - **H3 Added** - New features and capabilities
   - **H3 Changed** - Modifications to existing features
   - **H3 Deprecated** - Features marked for removal (include timeline)
   - **H3 Removed** - Deleted features
   - **H3 Fixed** - Bug fixes
   - **H3 Security** - Security updates and patches
3. **H2 Breaking Changes** (if any) - Critical changes requiring immediate action
4. **H2 Migration Guide** - Step-by-step migration instructions with verification
5. **H2 Upgrade Instructions** - How to upgrade to this version

### When to Use

- Product version releases
- Breaking changes
- Feature deprecations
- Security updates
- SDK version updates

### Change Entry Format

```markdown
### Added

- **Multi-factor authentication support** - Organizations can now require MFA for all users. Configure in **Dashboard > Security > MFA Settings**. [Learn more](/guides/mfa/)
- **Bulk user import API** - New endpoint `/api/v1/users/import` for importing multiple users at once. [API Reference](/reference/api/users/import/)
```

### Breaking Change Format

```markdown
## Breaking Changes

### Session token format change

**Impact:** High - All applications must update token validation logic

**What changed:**

- Session tokens now use JWT format instead of opaque strings
- Token validation requires JWT verification instead of API lookup

**Required actions:**

1. Update SDK to version 2.0 or later
2. Replace `validateSessionToken()` calls with `validateJWT()`
3. Update token storage to handle larger token size

**Timeline:** Must complete by March 1, 2025
```
