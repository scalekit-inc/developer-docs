# CLAUDE.md

This file provides mandatory guidance to Claude Code and all documentation authors when creating content for the Scalekit developer documentation. These guidelines ensure consistency, clarity, and quality across all technical documentation.

---

## Overview

This is the Scalekit developer documentation site built with Astro and Starlight. It provides comprehensive documentation for Scalekit's authentication and user management platform, including Full Stack Auth (FSA), SSO, SCIM, and API references.

**Target Audience:** Internal Scalekit employees writing developer-facing documentation
**Primary Tool:** Claude Code (though guidelines apply to all authoring tools)
**Enforcement Level:** Strong guidance with minimal flexibility—deviations require explicit justification

---

## Table of Contents

1. [Development Environment](#development-environment)
2. [Architecture Overview](#architecture-overview)
3. [House Style and Voice](#house-style-and-voice)
4. [Document Type Categories](#document-type-categories)
5. [Frontmatter Standards](#frontmatter-standards)
6. [Content Structure and Formatting](#content-structure-and-formatting)
7. [Code Examples and Technical Content](#code-examples-and-technical-content)
8. [Components and UI Elements](#components-and-ui-elements)
9. [Technical Accuracy Requirements](#technical-accuracy-requirements)
10. [Validation and Quality Control](#validation-and-quality-control)
11. [Working with Claude Code](#working-with-claude-code)

---

## Development Environment

### Core Commands

- `pnpm dev` - Start development server (no HMR)
- `pnpm start` - Start development server with HMR
- `pnpm build` - Build the documentation site
- `pnpm preview` - Preview the built site locally

### Utility Commands

- `pnpm generate-search-index` - Generate search index for API documentation
- `pnpm reorder-swagger` - Reorder the Swagger/OpenAPI specification
- `pnpm format:check` - Check formatting with Prettier

### Git Hooks

- Git hooks are automatically installed via `postinstall` script
- Pre-commit and pre-push hooks are configured using `simple-git-hooks`
- Hooks run formatting checks before commits

---

## Architecture Overview

### Framework Stack

- **Astro** - Static site generator with component islands
- **Starlight** - Documentation framework built on Astro
- **Vue 3** - For interactive components (API reference)
- **React** - For some UI components
- **Tailwind CSS** - Styling framework

### Key Directories

- `src/content/docs/` - All documentation content in MDX format
- `src/components/` - Reusable components and Starlight overrides
- `src/configs/` - Configuration files for sidebar and redirects
- `public/api/` - OpenAPI/Swagger specifications
- `scripts/` - Build and utility scripts

### Content Organization

Documentation is organized into main sections:

- **FSA (Full Stack Auth)** - Complete authentication solution
- **SSO** - Single Sign-On integration guides
- **Directory/SCIM** - User provisioning and directory sync
- **Connect** - Agent Connect which sets up auth for users with external applications
- **M2M** - Machine-to-machine authentication
- **Guides** - Integration and setup guides
- **Reference** - API references and technical details

### Configuration Files

- `astro.config.mjs` - Main Astro configuration with Starlight setup
- `src/configs/sidebar.config.ts` - Sidebar navigation structure
- `src/configs/redirects.config.ts` - URL redirects configuration
- `tailwind.config.mjs` - Tailwind CSS configuration

### Component Overrides

Custom Starlight components in `src/components/overrides/`:

- `Head.astro` - Custom head with analytics and iframe detection
- `Header.astro` - Custom header component
- `PageSidebar.astro` - Custom page sidebar
- `Pagination.astro` - Custom pagination component

---

## House Style and Voice

### Core Principles

- **Voice:** Confident, direct, collaborative, instructional
- **Audience:** Practicing developers integrating Scalekit
- **Tense:** Present tense for descriptions; imperative for instructions
- **Person:** Second person ("you", "your application")—avoid passive voice
- **Clarity:** Prioritize clarity over flourish; explain the **why**, not just the **how**
- **Jargon:** Use only industry-standard terms; define Scalekit-specific terms once, then reuse consistently

### Language Rules

**1. Sentence Structure:**

- Target: ≤24 words per sentence
- Paragraphs: ≤5 sentences
- Use concrete verbs: "Configure", "Validate", "Rotate", "Initialize"

**2. Direct, Instructional Language:**

- ✅ "This guide shows you how to..."
- ✅ "Create an authorization URL to..."
- ❌ "You might want to consider creating..."

**3. Second Person:**

- ✅ "Your application receives an access token"
- ✅ "You must validate the state parameter"
- ❌ "The application receives an access token"

**4. Active Voice:**

- ✅ "Scalekit creates a user record"
- ❌ "A user record is created by Scalekit"

**5. Avoid Filler Words:**

- ❌ "clearly", "simply", "basically", "obviously", "just"
- ❌ Excessive superlatives and praise
- ✅ Direct, factual statements

**6. Explain Security and Context:**

- Always explain security implications with specific threats
- Include real-world use cases in comments
- Provide practical implementation context

### Opening Phrases

Use these patterns to begin sections:

- "This guide shows you how to..."
- "[Feature] provides the framework to..."
- "After [previous step], your application [next action]..."
- "When [condition], you need to [action]..."

### Transition Phrases

Connect steps and sections with:

- "After the user authenticates..."
- "Once the state is validated..."
- "Let's take a look at how to..."
- "Now that you have created..."
- "The next step is to..."

---

## Document Type Categories

**CRITICAL REQUIREMENT:** Every documentation page MUST fit into one of these four categories. If uncertain which category applies, Claude Code MUST ask the author before drafting.

### A) How-to Guide (Task-Oriented)

**Purpose:** Produce practical, step-by-step guides that verify success and anticipate common failures.

**Required Sections:**

1. **H2 Overview** - What users will accomplish and when to use this guide (1-3 paragraphs)
2. **H2 Prerequisites** - Required roles, scopes, versions, prior setup
3. **H2 [Procedure Name]** - Main content using `<Steps>` component with numbered steps
   - Each step MUST have verification indicators or success criteria
4. **H2 Verify** - How to confirm successful completion
5. **H2 Next Steps** - Links to subsequent guides or related documentation
6. **H2 FAQs** (optional) - Short, scoped questions

**Step Structure Pattern:**

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

**When to Use:**

- Implementing authentication flows
- Setting up integrations
- Configuring features
- Migration guides

**Example Titles:**

- "Implement user login with Scalekit"
- "Configure SSO for your organization"
- "Set up SCIM provisioning"
- "Migrate from custom auth to Scalekit"

---

### B) API Reference Page

**Purpose:** Generate standardized endpoint documentation with complete technical specifications.

**Required Sections:**

1. **H2 Endpoint Summary** - Brief description of what the endpoint does
2. **H2 Authentication** - Auth scheme, required headers, scopes
3. **H2 Base URL** - Environment URL pattern
4. **H2 Parameters** - Request parameters in table format
5. **H2 Request** - Example requests (curl + SDK examples)
6. **H2 Response** - Success responses with schema
7. **H2 Errors** - Error responses in table format (status | code | message | resolution)
8. **H2 Examples** (optional) - Additional use case examples

**Parameter Table Format:**

```markdown
| Parameter      | Type     | Required    | Default | Description                                    |
| -------------- | -------- | ----------- | ------- | ---------------------------------------------- |
| `client_id`    | `string` | Yes         | -       | Your application's public identifier           |
| `redirect_uri` | `string` | Yes         | -       | Must match URL registered in dashboard exactly |
| `state`        | `string` | Recommended | -       | Random string to prevent CSRF attacks          |
```

**Error Table Format:**

```markdown
| Status | Code                 | Message                    | Resolution                                  |
| ------ | -------------------- | -------------------------- | ------------------------------------------- |
| 400    | `invalid_request`    | Missing required parameter | Ensure all required parameters are included |
| 401    | `invalid_client`     | Invalid client credentials | Verify your client_id and client_secret     |
| 404    | `resource_not_found` | Organization not found     | Check the organization ID is correct        |
```

**When to Use:**

- Documenting REST API endpoints
- SDK method references
- Webhook payload specifications
- GraphQL operations

**Example Titles:**

- "POST /oauth/token - Exchange authorization code"
- "GET /api/v1/organizations - List organizations"
- "Webhook Event: user.created"

---

### C) Concept Page (Explanatory)

**Purpose:** Explain domain concepts clearly and neutrally without step-by-step instructions.

**Required Sections:**

1. **H2 Overview** - What the concept is and why it matters (1-3 paragraphs)
2. **H2 How It Works** - Architecture, workflow, or mechanism explanation
3. **H2 Key Concepts** - Important terms and their definitions
4. **H2 Use Cases** - When and why to use this concept
5. **H2 Trade-offs** (if applicable) - Benefits, limitations, alternatives
6. **H2 Best Practices** - Recommended patterns and approaches
7. **H2 Related Guides** - Links to implementation guides and references

**When to Use:**

- Explaining authentication flows
- Describing system architecture
- Defining terminology (tokens, sessions, roles)
- Discussing security models
- Comparing approaches or patterns

**Example Titles:**

- "Understanding OAuth 2.1 authorization flow"
- "Session management concepts"
- "Role-based access control in Scalekit"
- "Token types and their purposes"

**Key Concepts Format:**

```markdown
## Key Concepts

- **Access Token** - Short-lived JWT (1 hour) used for API authorization. Contains user ID, organization ID, and permissions.
- **ID Token** - JWT containing verified user identity claims like email, name, and verification status.
- **Refresh Token** - Long-lived token (30 days) used to obtain new access tokens without re-authentication.
```

---

### D) Release Notes / Change Log

**Purpose:** Document product changes, migrations, and version updates with clear impact assessment.

**Required Sections:**

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

**When to Use:**

- Product version releases
- Breaking changes
- Feature deprecations
- Security updates
- SDK version updates

**Change Entry Format:**

```markdown
### Added

- **Multi-factor authentication support** - Organizations can now require MFA for all users. Configure in **Dashboard > Security > MFA Settings**. [Learn more](/guides/mfa/)
- **Bulk user import API** - New endpoint `/api/v1/users/import` for importing multiple users at once. [API Reference](/reference/api/users/import/)
```

**Breaking Change Format:**

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

---

## Frontmatter Standards

Every documentation page MUST include complete frontmatter. All fields listed as **Required** must be present.

### Required Fields

```yaml
---
title: 'Clear, descriptive title' # Required - max 60 characters
description: 'Concise description explaining what this page covers' # Required - max 160 characters
sidebar:
  label: 'Short sidebar label' # Required - shorter than title
  order: 42 # Required - integer for navigation ordering
tags: [auth, sso, api, oauth2.1, tokens] # Required - for categorization
---
```

### Conditional Fields

**For Sequential Guides (How-to Guides):**

```yaml
prev:
  label: 'Previous guide name'
  link: '/path/to/previous/'
next:
  label: 'Next guide name'
  link: '/path/to/next/'
```

**For Related Documentation:**

```yaml
seeAlso:
  label: 'Related guides' # or "See also"
  expanded: false # or true for default open
  items:
    - title: 'Related guide title'
      icon: 'book' # icon options: book, rocket, star, puzzle, document
      url: '/path/to/guide/'
```

**For Long Pages:**

```yaml
tableOfContents: true # Shows automatic TOC
```

**For Custom Heading Sizes:**

```yaml
head:
  - tag: style
    content: |
      .sl-markdown-content h2 {
        font-size: var(--sl-text-xl);
      }
      .sl-markdown-content h3 {
        font-size: var(--sl-text-lg);
      }
```

### Frontmatter Rules

1. `title` must be ≤60 characters and describe the page's purpose
2. `description` must be ≤160 characters and explain what users will learn
3. `sidebar.label` should be shorter than `title` for navigation clarity
4. `sidebar.order` determines position in navigation (lower numbers first)
5. `tags` should include 3-6 relevant terms for search and categorization
6. Use `prev`/`next` for sequential guides to create learning paths
7. Use `seeAlso` to link related documentation without disrupting main flow

---

## Content Structure and Formatting

### Opening Paragraphs

Every page MUST begin with 1-3 paragraphs that:

1. Explain what users will accomplish
2. Provide context about when/why they need this
3. Preview key concepts or workflow
4. Use direct, instructional language

**Example:**

```markdown
Login initiation begins your authentication flow. You redirect users to Scalekit's hosted login page by creating an authorization URL with appropriate parameters.

This guide shows you how to construct the authorization URL, handle the redirect, and validate the response. After completing this guide, you'll have a working login flow that redirects users to authenticate through Scalekit.
```

### Page Organization

1. **Opening context paragraph** (1-3 paragraphs)
2. **Collapsible supplementary sections** (optional) - Use `<details>` for:
   - Sequence diagrams
   - Video demonstrations
   - Data models
   - Extended JSON examples
3. **Main content sections** - Using appropriate heading hierarchy
4. **Closing paragraph** - Preview next steps or summarize key points

### Collapsible Sections

Use `<details>` for supplementary content that shouldn't interrupt the main flow:

```mdx
<details>
<summary><IconTdesignSequence style="display: inline; width: 1rem; height: 1rem; vertical-align: middle; margin-right: 0.5rem;" /> Review the authentication sequence</summary>

[Diagram or detailed content here]

</details>
```

**Common Collapsible Section Icons:**

- `<IconTdesignSequence>` - Sequence diagrams
- `<IconLucidePlay>` - Video demonstrations
- `<IconMaterialSymbolsArticlePersonRounded>` - Data models
- `<IconLucideFileJson>` - JSON examples

### Markdown Conventions

**Heading Hierarchy:**

- ✅ Use H2 (`##`) for major sections
- ✅ Use H3 (`###`) for subsections
- ✅ Use H4 (`####`) for sub-steps within `<Steps>` component only
- ❌ Never use H1 in body content (comes from frontmatter `title`)
- ❌ Do not exceed H4 nesting

**Lists:**

- Use **bulleted lists** for unordered features, capabilities, options
- Use **numbered lists** ONLY within `<Steps>` component for procedures
- Keep list items parallel in grammatical structure
- Limit to 6-8 items per list; break into subsections if longer
- End each item with consistent punctuation (or none)

**Links:**

- Use meaningful link text (not "click here" or "this")
- For file references: `[filename.ts](src/filename.ts)`
- For specific lines: `[filename.ts:42](src/filename.ts#L42)`
- For line ranges: `[filename.ts:42-51](src/filename.ts#L42-L51)`
- For folders: `[src/utils/](src/utils/)`

**Tables:**

- Always include header row
- Use markdown format (no inline HTML)
- Align columns with pipes
- Keep cell content concise (≤100 characters)

**Code Blocks:**

- Always use fenced code blocks with language identifier
- Never use screenshots of code
- Show complete, runnable examples (or clear placeholders)
- Include error handling examples

### Text Formatting Standards

**Bold (`**text**`):**

- Important terms on **first mention**
- UI elements: Click the **Save** button
- Dashboard paths: **Dashboard > Authentication > Session Policy**
- ❌ Do not use for emphasis in regular sentences

**Inline Code (`` `text` ``):**

- Technical terms: `accessToken`, `refreshToken`, `idToken`
- Variable names: `req`, `res`, `user`
- Function/method names: `authenticateWithCode()`, `validateAccessToken()`
- Endpoints: `/auth/callback`, `/oauth/authorize`
- Scopes: `openid`, `profile`, `email`, `offline_access`
- Environment variables: `SCALEKIT_CLIENT_ID`, `NODE_ENV`
- File paths: `src/config/auth.ts`
- Placeholders: `<SCALEKIT_ENVIRONMENT_URL>`, `<CALLBACK_URL>`

**Italics (`_text_`):**

- Rarely used; prefer bold or code formatting

### Dashboard References

When referencing the Scalekit dashboard, use this exact format:

**Dashboard > Section > Subsection > Field**

**Examples:**

- Navigate to **Dashboard > Developers > Settings > API Credentials**
- Find your callback URLs in **Dashboard > Authentication > Redirect URLs**
- Configure session duration in **Dashboard > Authentication > Session Policy**
- Create roles in **Dashboard > Roles & Permissions > Roles**

---

## Code Examples and Technical Content

### Multi-Language Requirement

**CRITICAL:** All code examples MUST be provided by authors in 4 languages:

1. Node.js
2. Python
3. Go
4. Java

**Claude Code's Role:**

- Create the tab structure with placeholders indicating what code is needed
- Document what each code section should accomplish
- Authors manually write and insert actual code examples post-draft

Use `<Tabs syncKey="tech-stack">` to keep language selection synchronized across the page.

### Tab Structure for Claude Code

When drafting documentation, create this structure with clear placeholders:

````mdx
<Tabs syncKey="tech-stack">
  <TabItem value="node" label="Node.js">
    ```javascript title="Express.js" // [AUTHOR TODO] Add Node.js code example here // Should
    demonstrate: [describe what the code needs to show] // Key points to include: [list important
    elements] ```
  </TabItem>
  <TabItem value="python" label="Python">
    ```python title="Flask" # [AUTHOR TODO] Add Python code example here # Should demonstrate:
    [describe what the code needs to show] # Key points to include: [list important elements] ```
  </TabItem>
  <TabItem value="go" label="Go">
    ```go title="Gin" // [AUTHOR TODO] Add Go code example here // Should demonstrate: [describe
    what the code needs to show] // Key points to include: [list important elements] ```
  </TabItem>
  <TabItem value="java" label="Java">
    ```java title="Spring Boot" // [AUTHOR TODO] Add Java code example here // Should demonstrate:
    [describe what the code needs to show] // Key points to include: [list important elements] ```
  </TabItem>
</Tabs>
````

### Code Block Attributes

**Framework Title:**

```javascript title="Express.js"

```

Shows the specific framework: "Express.js", "Flask", "Gin", "Spring Boot"

**Line Wrapping:**

```javascript wrap

```

Use for long lines (URLs, long comments, configuration strings)

**Collapsing Boilerplate:**

```javascript collapse={1-4}

```

Hide imports, type definitions, setup code. Examples:

- `collapse={1-4}` - Hide first 4 lines
- `collapse={1-10, 25-35}` - Hide multiple ranges
- Use for: imports, middleware setup, error handling boilerplate

**Highlighting Important Lines:**

```javascript {5-8}

```

Highlight critical lines. Examples:

- `{12}` - Highlight line 12
- `{5-8}` - Highlight range
- `{5, 8, 12}` - Highlight specific lines

**Highlighting Terms:**

```javascript "authenticateWithCode"

```

Highlights specific method/function names throughout the code

**Line Numbers:**

```javascript showLineNumbers=false

```

Disable for simple examples, terminal output, JSON responses (default is `true`)

**Terminal Frame:**

```bash frame="terminal"

```

Use for CLI commands and shell output

### Advanced Highlighting with Labels

Authors can use JSON-style labels to explain code sections:

```javascript
{"Decrypt the token": 5-6} {8-10} {"Store tokens": 15-18}
```

This highlights specific line ranges and adds descriptive labels explaining what each section does.

### SDK Variable Naming Standards

**CRITICAL:** Use these exact variable names consistently across ALL documentation:

| Language | Variable Name     | Example Usage                                             |
| -------- | ----------------- | --------------------------------------------------------- |
| Node.js  | `scalekit`        | `const scalekit = new ScalekitClient(...)`                |
| Python   | `scalekit_client` | `scalekit_client = ScalekitClient(...)`                   |
| Go       | `scalekitClient`  | `scalekitClient := scalekit.NewScalekitClient(...)`       |
| Java     | `scalekitClient`  | `ScalekitClient scalekitClient = new ScalekitClient(...)` |

**Implementation Notes:**

- Authors should reference the installation guide rather than re-instantiating clients in every example
- Use `collapse` attribute to hide initialization boilerplate when SDK client is already initialized
- Add comment: `// Initialize Scalekit client (reference installation guide)`

### Code Quality Requirements

When authors write code examples, they must ensure:

- Full, working examples (never pseudo-code)
- All necessary imports included (use `collapse` to minimize)
- Both success and error paths shown
- Error handling included
- Environment checks for development vs production
- Realistic data and parameters

### Token and JWT Examples

When showing token contents, use tabs to separate ID token and access token:

````mdx
<Tabs>
<TabItem value="idToken" label="Decoded ID token">
```json title="ID token decoded" showLineNumbers=false
{
  "email": "john.doe@example.com",
  "oid": "org_59615193906282635",  // Organization ID
  "sub": "usr_63261014140912135"   // User's unique ID
}
````

</TabItem>
<TabItem value="accessToken" label="Decoded access token">
```json title="Decoded access token" showLineNumbers=false
{
  "permissions": ["projects:create", "projects:read"],
  "roles": ["admin"],
  "oid": "org_89678001X21929734"
}
```
</TabItem>
</Tabs>
```

### Security Documentation Standards

**Authors must always explain security implications in their code examples.**

Code comments should document:

1. **What threat is being mitigated** - Specific attack vectors (XSS, CSRF, token theft)
2. **Why this pattern is necessary** - The security principle being applied
3. **What could happen without it** - Consequences of not following the pattern

**Examples of security comments:**

- "Prevents JavaScript access to mitigate XSS attacks"
- "HTTPS-only in production to prevent man-in-the-middle attacks"
- "Prevents CSRF attacks by validating state parameter"
- "Encrypt tokens before storage for additional security layer"
- "ALWAYS verify requests are from Scalekit before processing"

### D2 Sequence Diagrams

Use D2 for sequence diagrams showing authentication flows:

````mdx
```d2 pad=50
title: "OAuth Authorization Flow" {
  near: top-center
  shape: text
  style.font-size: 20
}

shape: sequence_diagram

User -> Your App: Click "Sign In"
Your App -> Scalekit: Redirect to authorization URL
Scalekit -> User: Show login page
User -> Scalekit: Enter credentials
Scalekit -> Your App: Redirect with authorization code
Your App -> Scalekit: Exchange code for tokens
Scalekit -> Your App: Return access token
Your App -> User: Grant access to application
```
````

**D2 Guidelines:**

- Use `pad=50` for appropriate spacing
- Include descriptive title
- Use `\n` for line breaks in messages
- Keep message text ≤40 characters per line

---

## Components and UI Elements

### Starlight Components

Import at the top of MDX files:

```mdx
import {
  Steps,
  Tabs,
  TabItem,
  Aside,
  Card,
  CardGrid,
  LinkCard,
  Badge,
} from '@astrojs/starlight/components'

;
```

### Component Usage

**`<Steps>` - Sequential Procedures:**

```mdx
<Steps>

1. ## First step

   Content here

2. ## Second step

   Content here

</Steps>
```

**`<Tabs>` / `<TabItem>` - Multi-Language Examples:**

```mdx
<Tabs syncKey="tech-stack">
  <TabItem value="node" label="Node.js">
    Content
  </TabItem>
  <TabItem value="python" label="Python">
    Content
  </TabItem>
</Tabs>
```

**`<Aside>` - Callouts and Warnings:**

```mdx
<Aside type="tip" title="Best practice">
  Recommendation or helpful hint.
</Aside>

<Aside type="note" title="Additional context">
  Extra information or clarification.
</Aside>

<Aside type="caution">Important warning or common pitfall.</Aside>

<Aside type="danger">Critical warning about security or data loss.</Aside>
```

**Aside Types:**

- `tip` - Best practices, recommendations, helpful shortcuts
- `note` - Additional information, context, clarifications
- `caution` - Important warnings, common pitfalls
- `danger` - Critical warnings, security issues, data loss risks

**`<Badge>` - Inline Labels:**

```mdx
## Add state parameter <Badge text="recommended" />

## Refresh tokens <Badge text="API" variant="tip" />

## New feature <Badge text="New" variant="tip" />

## Optional step <Badge text="Optional" />
```

**`<LinkCard>` - Related Documentation:**

```mdx
<LinkCard
  title="Session Management"
  description="Learn how to manage user sessions securely"
  href="/authenticate/fsa/manage-session/"
/>
```

**`<Card>` / `<CardGrid>` - Feature Highlights:**

```mdx
<CardGrid>
  <Card title="Feature 1" icon="star">
    Description of feature
  </Card>
  <Card title="Feature 2" icon="rocket">
    Description of feature
  </Card>
</CardGrid>
```

### Custom Components

```mdx
import CheckItem from '@/components/ui/CheckItem.astro'
import CopyPrompt from '@components/ui/CopyPrompt.astro'
import { VideoPlayer } from 'starlight-videos/components'
import IconLucidePlay from '~icons/lucide/play'

;
```

- `<CheckItem>` - Checklist items
- `<CopyPrompt>` - AI prompt copy buttons
- `<VideoPlayer>` - Embedded video demonstrations
- Icons from `~icons/` for visual context

---

## Technical Accuracy Requirements

### Grounding in Product Behavior

**CRITICAL RULE:** All technical content MUST be grounded in actual Scalekit product behavior.

❌ **Do NOT:**

- Invent endpoints, parameters, or API methods
- Guess at configuration options or limits
- Assume features exist without verification
- Copy patterns from other products without validation

✅ **DO:**

- Verify all endpoints and parameters against API specifications
- Check dashboard screenshots for accurate navigation paths
- Test code examples (or mark as `TODO: [VERIFY]` if pending)
- Reference official Scalekit SDK documentation
- Insert `TODO: [VERIFY]` markers for uncertain information

### Scalekit Terminology Standards

Use Scalekit's exact terminology consistently:

**Core Concepts:**

- **Organizations** - Not "tenants", "accounts" (except "workspaces" in Connect context)
- **Connections** - SSO provider configurations
- **Workspaces** - Specific to Connect feature
- **Memberships** - User-organization relationships
- **Interceptors** - Webhook handlers for auth events

**Authentication:**

- **Authorization code** - Not "auth code" or "code token"
- **Access token** - JWT for API authorization
- **ID token** - JWT containing user identity claims
- **Refresh token** - Token to obtain new access tokens
- **Session** - User's authenticated state in your application

**Configuration:**

- **Environment URL** - Not "base URL" or "API endpoint"
- **Client ID** - Public identifier
- **Client Secret** - Private credential
- **Redirect URI** - OAuth callback URL (not "callback URL" alone)

### Code Example Standards

Even for placeholders (when authors write final code post-draft):

1. Use correct SDK variable names
2. Reference real SDK methods
3. Show realistic parameter names
4. Include proper error handling structure
5. Use actual HTTP status codes
6. Match framework conventions

**Example Placeholder:**

```javascript
// TODO: Implement after technical draft approval
// Required: Call scalekit.authenticateWithCode()
// Expected parameters: code, state, codeVerifier (optional)
// Returns: authResult with user, idToken, accessToken, refreshToken
// Error handling: Catch authentication failures, invalid state
```

---

## Validation and Quality Control

### Pre-Publication Checklist

Before considering a draft complete:

**✅ Frontmatter:**

- [ ] `title`, `description`, `sidebar.label`, `sidebar.order`, `tags` present
- [ ] Description ≤160 characters
- [ ] `prev`/`next` included for sequential guides
- [ ] `seeAlso` links to related documentation
- [ ] Tags include 3-6 relevant terms

**✅ Document Structure:**

- [ ] Fits one of four document type categories clearly
- [ ] Opening paragraph(s) explain what users will accomplish
- [ ] Headings follow hierarchy (H2 > H3 > H4 only in `<Steps>`)
- [ ] Sections flow logically with transitions
- [ ] Closing paragraph previews next steps or summarizes

**✅ Code Examples:**

- [ ] Placeholders or examples for all 4 languages (Node.js, Python, Go, Java)
- [ ] Uses `<Tabs syncKey="tech-stack">`
- [ ] Correct SDK variable names (`scalekit`, `scalekit_client`, `scalekitClient`)
- [ ] Code block attributes used appropriately
- [ ] Comments explain use cases, security, context
- [ ] Error handling structure shown
- [ ] Security implications explained with specific threats

**✅ Language and Style:**

- [ ] Direct, instructional language
- [ ] Second person ("you", "your application")
- [ ] Active voice
- [ ] Sentences ≤24 words
- [ ] No filler words ("clearly", "simply", "basically")
- [ ] Security explained with threat mitigation

**✅ Technical Accuracy:**

- [ ] All endpoints, parameters, methods verified
- [ ] Uses exact Scalekit terminology
- [ ] Dashboard paths match actual navigation
- [ ] No invented features
- [ ] `TODO: [VERIFY]` markers for unverified content

**✅ Visual Elements:**

- [ ] Images have descriptive alt text
- [ ] Diagrams in collapsible sections where appropriate
- [ ] Token/JWT examples in tabs
- [ ] Parameter tables formatted correctly
- [ ] Asides used for tips, notes, warnings

**✅ Navigation:**

- [ ] Links to related docs and API references
- [ ] File references use correct markdown format
- [ ] Dashboard paths use bold formatting
- [ ] External links proper

### Style Check Output

**MANDATORY:** At the end of every draft, Claude Code MUST include:

```
---
STYLE-CHECK: [PASSED | TODO]
```

**If PASSED:**

```
STYLE-CHECK: PASSED
- Document type: [How-to Guide | API Reference | Concept | Release Notes]
- Languages: Node.js, Python, Go, Java placeholders included
- Security: Threats and mitigations documented
- Navigation: prev/next/seeAlso configured appropriately
- Frontmatter: All required fields present
- Technical accuracy: Content grounded in Scalekit product behavior
```

**If TODO:**

```
STYLE-CHECK: TODO
Missing:
- [List specific missing elements]

Verify:
- [List items requiring verification]

Fix:
- [List items needing correction]
```

---

## Working with Claude Code

### Document Type Selection

When asked to create new documentation, Claude Code MUST:

1. **Identify document type** - Ask author: "Which document type should this be?"
   - How-to Guide (task-oriented with steps)
   - API Reference (endpoint documentation)
   - Concept (explanatory without steps)
   - Release Notes (changes and migration)

2. **If unclear**, provide context:
   - "This sounds like a How-to Guide since it involves step-by-step implementation. Should I proceed with that structure?"
   - "This could be either a Concept page or a How-to Guide. Do you want to explain the concept or provide implementation steps?"

### Initial Draft Workflow

**Step 1: Gather Context**

- What will users accomplish?
- What are the prerequisites?
- What security considerations exist?
- What are related guides?

**Step 2: Create Structure**

- Generate frontmatter with all required fields
- Create section headers per document type template
- Add opening paragraph explaining what users will learn

**Step 3: Add Content Placeholders**

- Write explanatory prose
- Insert code placeholders with 4-language tabs
- Add comments indicating what code should do
- Include parameter tables, diagrams, examples

**Step 4: Validate**

- Run through quality checklist
- Insert `TODO: [VERIFY]` for uncertain content
- Output `STYLE-CHECK` result

### Editing Existing Documentation

When updating existing docs:

**Preserve:**

- Existing structure and document type
- Working code examples (don't replace with placeholders)
- Frontmatter configuration
- Navigation links

**Update:**

- Only requested changes
- Related sections if changes affect them
- `TODO:` markers to completed content

**Avoid:**

- Rewriting unchanged sections
- Changing working code without reason
- Altering document type unnecessarily
- Adding unrequested features

### Uncertainty Protocol

When uncertain about technical details:

**1. Mark Clearly:**

```markdown
TODO: [VERIFY] - This endpoint may require additional parameters
TODO: [CHECK DASHBOARD] - Verify exact navigation path
TODO: [TEST] - Confirm this code example works as expected
```

**2. Ask Author:**

- "Which document type should this be?"
- "What is the exact endpoint path for this API method?"
- "Should this code example show error handling?"
- "Is this feature available in the current version?"

**3. Never Guess:**

- Don't invent API parameters
- Don't assume configuration options
- Don't create unverified code

---

## Prohibited Practices

### Do-Not List

❌ **Content and Structure:**

- Do NOT vary tone or style between authors
- Do NOT exceed H4 heading nesting
- Do NOT use H1 headings in body content
- Do NOT write pseudo-code (use clear placeholders)
- Do NOT document non-existent features
- Do NOT use screenshots of code

❌ **Language and Style:**

- Do NOT use filler words: "clearly", "simply", "basically", "obviously", "just"
- Do NOT use excessive superlatives or praise
- Do NOT write in first person ("I", "we")
- Do NOT use passive voice when active is clearer
- Do NOT omit security explanations

❌ **Technical Content:**

- Do NOT guess at API endpoints or parameters
- Do NOT invent configuration options
- Do NOT assume features exist
- Do NOT show incomplete error handling
- Do NOT mix terminology

❌ **Code Examples:**

- Do NOT provide only one language (must have all 4)
- Do NOT use inconsistent SDK variable names
- Do NOT omit error handling
- Do NOT show insecure practices without warnings
- Do NOT include real secrets or API keys

❌ **Formatting:**

- Do NOT use inline HTML for tables
- Do NOT use "click here" or "this" as link text
- Do NOT format file paths without code formatting
- Do NOT omit alt text for images
- Do NOT use inconsistent styles

### Common Pitfalls

Avoid these mistakes:

1. **Over-engineering** - Don't add features beyond what's requested
2. **Premature abstraction** - Don't create helpers for one-time operations
3. **Hypothetical requirements** - Don't design for features that don't exist
4. **Backwards-compatibility hacks** - Don't add `_unused` variables or `// removed` comments
5. **Unnecessary documentation** - Don't add docstrings to unchanged code
6. **Feature creep** - Bug fixes don't need surrounding code cleanup

---

## Quick Reference

### SDK Variable Names

| Language | Variable Name     |
| -------- | ----------------- |
| Node.js  | `scalekit`        |
| Python   | `scalekit_client` |
| Go       | `scalekitClient`  |
| Java     | `scalekitClient`  |

### Tab Labels

| Language | Tab Value | Tab Label |
| -------- | --------- | --------- |
| Node.js  | `node`    | `Node.js` |
| Python   | `python`  | `Python`  |
| Go       | `go`      | `Go`      |
| Java     | `java`    | `Java`    |

### Aside Types

| Type      | Purpose                            |
| --------- | ---------------------------------- |
| `tip`     | Best practices, recommendations    |
| `note`    | Additional context, clarifications |
| `caution` | Warnings, common pitfalls          |
| `danger`  | Critical warnings, security issues |

### Badge Variants

| Text          | Variant | Purpose                   |
| ------------- | ------- | ------------------------- |
| `recommended` | default | Recommended practices     |
| `API`         | `tip`   | API-based features        |
| `New`         | `tip`   | New features              |
| `Optional`    | default | Optional parameters/steps |

### Document Types

| Type          | Purpose                    | Key Sections                                    |
| ------------- | -------------------------- | ----------------------------------------------- |
| How-to Guide  | Task-oriented step-by-step | Overview, Prerequisites, Steps, Verify, Next    |
| API Reference | Endpoint documentation     | Summary, Auth, Parameters, Request, Response    |
| Concept       | Explanatory without steps  | Overview, How It Works, Key Concepts, Use Cases |
| Release Notes | Changes and migrations     | Summary, Changes, Breaking Changes, Migration   |

---

## Revision History

- **v2.0** (2025-12-05) - Unified guide merging house style standards with comprehensive technical guidelines
- **v1.0** (2024) - Initial documentation style guide

---

## For Authors Using Claude Code

### Getting Started

1. **Specify document type** - Tell Claude which category your content fits
2. **Provide context** - Share what users will accomplish and why
3. **Review placeholders** - Claude will create 4-language code placeholders for you to fill
4. **Check STYLE-CHECK output** - Ensure all requirements are met before publishing

### After Claude Generates Draft

1. **Verify technical accuracy** - Check all endpoints, parameters, and methods
2. **Write actual code** - Replace placeholders with working examples
3. **Test code examples** - Ensure all 4 languages work correctly
4. **Update frontmatter** - Adjust `prev`/`next` links based on final navigation
5. **Review security comments** - Ensure threat explanations are accurate

### Getting Help

If Claude's output doesn't match these guidelines:

- Point out the specific section of this CLAUDE.md file
- Request corrections based on the documented standards
- Ask Claude to re-run the STYLE-CHECK validation

---

**This document is the authoritative source for Scalekit documentation standards. All documentation must comply with these guidelines.**
