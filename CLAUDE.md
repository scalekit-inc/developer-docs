# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is the Scalekit developer documentation site built with Astro and Starlight. It provides comprehensive documentation for Scalekit's authentication and user management platform, including Full Stack Auth (FSA), SSO, SCIM, and API references.

## Development Commands

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

## Architecture

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

### Content Structure

- All documentation is written in MDX format
- Content is organized by product area (fsa/, sso/, guides/, etc.)
- API references are generated from OpenAPI specifications
- Images and assets are stored in `src/assets/docs/`

### Build Process

- Astro builds static pages from MDX content
- Starlight provides the documentation framework
- API reference pages are generated using Scalar
- Search index is built for API documentation
- Git hooks ensure code quality before commits

### Styling

- Uses Tailwind CSS for utility-first styling
- Custom theme configuration in `starlight-theme-rapide`
- Responsive design with iframe-specific styling
- Custom fonts (Inter variable) and color schemes

## Key Features

- Multi-language code examples
- API reference with interactive examples
- Image zoom functionality (disabled in iframes)
- Link validation and broken link detection
- Search functionality with API reference integration
- Custom branding and theme

## Documentation Writing Style Guide

### Content Structure

**Frontmatter Standards:**

```yaml
---
title: 'Clear, descriptive title'
description: 'Concise description explaining what this guide covers and what users will learn'
sidebar:
  label: 'Short sidebar label'
tableOfContents: true # For longer guides with multiple sections
head:
  - tag: style
    content: |
      .sl-markdown-content h2 {
        font-size: var(--sl-text-xl);
      }
      .sl-markdown-content h3 {
        font-size: var(--sl-text-lg);
      }
prev:
  label: 'Previous guide name'
  link: '/path/to/previous/'
next:
  label: 'Next guide name'
  link: '/path/to/next/'
seeAlso:
  label: 'Related guides' # or "See also"
  expanded: false # or true for default open
  items:
    - title: 'Related guide title'
      icon: 'book' # or other icon names
      url: '/path/to/guide/'
---
```

**Opening Paragraph Patterns:**

Write 1-3 paragraphs that:

- Explain what users will accomplish in this guide
- Provide context about when/why they need this
- Preview the key concepts or workflow
- Use direct, instructional language

Examples:

- "Login initiation begins your authentication flow. You redirect users to Scalekit's hosted login page by creating an authorization URL with appropriate parameters."
- "User sessions determine how long users stay signed in to your application. After users successfully authenticate, you receive session tokens that manage their access."
- "When users access features in your application, you need to control what actions they can perform. These permissions might be set by your application or by organization administrators."

**Page Organization:**

1. **Opening context paragraph** (1-3 paragraphs)
2. **Collapsible supplementary sections** using `<details>`:

   ```mdx
   <details>
   <summary><IconTdesignSequence style="display: inline; width: 1rem; height: 1rem; vertical-align: middle; margin-right: 0.5rem;" /> Review the authentication sequence</summary>

   [Diagram or content here]

   </details>
   ```

   Common collapsible sections:
   - Sequence diagrams (`<IconTdesignSequence>`)
   - Video demonstrations (`<IconLucidePlay>`)
   - Data models (`<IconMaterialSymbolsArticlePersonRounded>`)
   - JSON examples (`<IconLucideFileJson>`)

3. **Main content using `<Steps>`** for sequential procedures
4. **Closing paragraph** with next steps or summary

**Using the Steps Component:**

```mdx
<Steps>
1. ## Step title with action verb

Explanation of what this step accomplishes and why.

<Tabs syncKey="tech-stack">
  <TabItem value="node" label="Node.js">
    [Code example]
  </TabItem>
  [Other languages...]
</Tabs>

Additional context or explanation after code.

<Aside type="tip" title="Helpful tip">
  Additional guidance or best practice.
</Aside>

2. ## Next step title

   [Continue pattern...]

</Steps>
```

**Badge Usage:**

- `<Badge text="recommended" />` - For recommended practices
- `<Badge text="API" variant="tip" />` - For API-based features
- `<Badge text="New" variant="tip" />` - For new features
- `<Badge text="Optional" />` - For optional parameters or steps

Place badges inline with headers:

```mdx
1. #### Add `state` parameter <Badge text="recommended" />
```

### Code Examples

**Multi-Language Support:**

- **ALWAYS** provide code examples in all 4 languages: Node.js, Python, Go, Java
- Use `<Tabs syncKey="tech-stack">` to keep language selection synchronized across the page
- Label tabs consistently:
  - `<TabItem value="node" label="Node.js">`
  - `<TabItem value="python" label="Python">` or `<TabItem value="py" label="Python">`
  - `<TabItem value="go" label="Go">` or `<TabItem value="golang" label="Go">`
  - `<TabItem value="java" label="Java">`

**Code Block Formatting:**

````markdown
```javascript title="Express.js" wrap collapse={1-4} {5-6} "highlightTerm"
// Security: ALWAYS verify requests are from Scalekit before processing
// This prevents unauthorized parties from triggering your interceptor logic

// Use case: Validate email domain against an allowlist for enterprise customers
// Examples: company-wide authentication, department-specific access

const accessToken = req.cookies.accessToken

// Decrypt the access token before validation
const decryptedAccessToken = decrypt(accessToken)

// Use Scalekit SDK to validate the token
const isValid = await scalekit.validateAccessToken(decryptedAccessToken)
```
````

**Code Block Attributes:**

- `title="Framework"` - Show the specific framework: "Express.js", "Flask", "Gin", "Spring Boot"
- `wrap` - For lines that need to wrap (typically long URLs or comments)
- `collapse={lines}` - Hide boilerplate (imports, type definitions, setup). Examples:
  - `collapse={1-4}` - Hide first 4 lines
  - `collapse={1-10, 25-35}` - Hide multiple ranges
  - Use for: imports, middleware setup, error handling boilerplate
- `{lines}` - Highlight important lines. Examples:
  - `{12}` - Highlight line 12
  - `{5-8}` - Highlight range
  - `{5, 8, 12}` - Highlight specific lines
- `"term"` - Highlight method/function names in the code
  - `"authenticateWithCode"` - Highlights this method name
  - `"validateAccessToken"` - Highlights validation calls
- `showLineNumbers=false` - For simple examples, terminal output, or JSON
- `frame="terminal"` - For CLI commands

**Advanced Highlighting with Labels:**

Use JSON-style labels to explain specific sections:

```javascript
{"Decrypt the token before validation": 5-6} {8-10} {"Store new tokens": 15-18}
```

**Code Comment Patterns:**

1. **Security comments** (always include for security-related code):

   ```javascript
   // Security: ALWAYS verify requests are from Scalekit before processing
   // This prevents unauthorized parties from triggering your interceptor logic

   // Prevents JavaScript access to mitigate XSS attacks
   // Prevents CSRF attacks
   // HTTPS-only in production
   ```

2. **Use case comments** (explain real-world scenarios):

   ```javascript
   // Use case: Provision a workspace after a sales-assisted onboarding
   // Use case: HR system integration, bulk user imports, automated provisioning
   // Use case: Apply custom validation rules before allowing authentication
   ```

3. **Context comments** (explain what's happening):

   ```javascript
   // Extract encrypted tokens from request cookies
   // Decrypt the access token before validation
   // Exchange the authorization code for user data
   // This allows issuing new access tokens without requiring re-authentication
   ```

4. **Todo/Next step comments**:

   ```javascript
   // TODO: Store user session (next guide covers this)
   // Next step: Create a session and log in the user
   // Your application's roles are now registered with Scalekit
   ```

5. **Configuration comments**:
   ```javascript
   // Get the signing secret from Scalekit dashboard > Interceptors tab
   // Store this securely in environment variables
   // Must match the callback URL you registered in step 1
   ```

**Error Handling Pattern:**

Always show error handling in examples:

```javascript
try {
  // Main logic here
  const result = await scalekit.someMethod()

  // Success path
  res.redirect('/dashboard')
} catch (error) {
  console.error('Operation failed:', error)
  // Error path with user-friendly message
  res.redirect('/login?error=operation_failed')
}
```

**Token/JWT Examples:**

When showing token contents, use tabs to separate ID token and access token:

````mdx
<Tabs>
<TabItem value="idToken" label="Decoded ID token">
```json title="ID token decoded"
{
  "email": "john.doe@example.com",
  "oid": "org_59615193906282635", // Organization ID
  "sub": "usr_63261014140912135" // Subject (user's unique ID)
}
````

</TabItem>
<TabItem value="accessToken" label="Decoded access token">
```json title="Decoded access token"
{
  "permissions": ["projects:create", "projects:read"],
  "roles": ["admin"],
  "oid": "org_89678001X21929734"
}
```
</TabItem>
</Tabs>
```

### Writing Tone and Voice

**Core Principles:**

- Use direct, instructional language: "This guide shows you how to...", "Create an authorization URL to..."
- Write in second person: "your application", "you receive", "you must"
- Keep sentences clear and concise (aim for under 25 words)
- Explain the **why**, not just the **how**: "This prevents CSRF attacks by...", "Use this to validate that..."
- Focus on developer experience and practical implementation

**Language Patterns:**

1. **Section headings** - Use action verbs:
   - "Store session tokens securely"
   - "Validate the state parameter"
   - "Exchange authorization code for tokens"
   - "Create and manage user sessions"

2. **Present tense for descriptions**:
   - "Scalekit handles the complex authentication flow"
   - "The SDK provides methods to refresh tokens"
   - "Your application receives an access token"

3. **Future tense for results**:
   - "This will redirect users to..."
   - "You'll receive a JWT containing..."
   - "Scalekit returns an authorization code"

4. **Transition phrases** between sections:
   - "After the user authenticates..."
   - "Once the state is validated..."
   - "Let's take a look at how to..."
   - "Now that you have created..."
   - "The next step is to..."

5. **Avoid passive voice** - Use active constructions:
   - Good: "Scalekit creates a user record"
   - Bad: "A user record is created by Scalekit"

**Opening Phrases:**

- "This guide shows you how to..."
- "[Feature] provides the framework to..."
- "After [previous step], your application [next action]..."
- "When [condition], you need to [action]..."

### Technical Content Standards

**Security Emphasis:**

Always explain security implications with specific threats:

```javascript
// Security patterns to include:

// 1. Token storage
httpOnly: true, // Prevents JavaScript access to mitigate XSS attacks
secure: process.env.NODE_ENV === 'production', // HTTPS-only in production
sameSite: 'strict' // Prevents CSRF attacks

// 2. Verification
// Security: ALWAYS verify requests are from Scalekit before processing
// This prevents unauthorized parties from triggering your interceptor logic

// 3. Encryption
// Encrypt tokens before storing to add an additional security layer
const encryptedAccessToken = encrypt(accessToken);

// 4. State validation
// This critical step prevents Cross-Site Request Forgery (CSRF) attacks
if (!state || state !== storedState) {
  return res.redirect('/login?error=invalid_state');
}
```

**Parameter Tables:**

Format parameter descriptions as tables:

```markdown
| Parameter       | Required    | Description                                                                      |
| --------------- | ----------- | -------------------------------------------------------------------------------- |
| `response_type` | Yes         | Set to `code` for authorization code flow. Indicates the expected response type. |
| `client_id`     | Yes         | Your application's public identifier from the dashboard.                         |
| `scope`         | Yes         | Space-separated list of permissions. Always include `openid profile email`.      |
| `state`         | Recommended | Random string generated by your application. Use it to prevent CSRF attacks.     |
```

**Complete Examples:**

- Provide full, working code samples (never pseudo-code)
- Include all necessary imports (use `collapse` to minimize)
- Show both success and error paths
- Include error handling
- Add environment checks for development vs production

**Real-World Context:**

- Use actual Scalekit terminology: organizations, workspaces, memberships, connections
- Include practical use cases in comments
- Reference dashboard navigation: "Dashboard > Authentication > Session Policy"
- Link to related guides and API references
- Show realistic example data

**Dashboard References:**

Format as: **Dashboard > Section > Subsection > Field**

Examples:

- **Dashboard > Developers > Settings > API Credentials**
- **Dashboard > Authentication > Redirect URLs > Allowed Callback URLs**
- **Dashboard > Roles & Permissions > Roles**

### Components and UI Elements

**Starlight Components:**

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

- `<Steps>` - Sequential procedures (auto-numbered)
- `<Tabs syncKey="tech-stack">` - Multi-language examples with synchronized selection
- `<TabItem value="node" label="Node.js">` - Individual tab content
- `<Aside type="tip|note|caution|danger">` - Callouts and warnings
- `<Card>` / `<CardGrid>` - Feature highlights or grouped content
- `<LinkCard>` - Related documentation links
- `<Badge text="Label" variant="tip|note|caution" />` - Inline labels

**Custom Components:**

```mdx
import CheckItem from '@/components/ui/CheckItem.astro';
import CopyPrompt from '@components/ui/CopyPrompt.astro';
import { VideoPlayer } from 'starlight-videos/components'
import IconLucidePlay from '~icons/lucide/play

'
```

- `<CheckItem>` - Checklist items
- `<CopyPrompt>` - AI prompt copy buttons
- `<VideoPlayer>` - Embedded video demonstrations
- Icons from `~icons/` for visual context in collapsible sections

**Aside Usage Patterns:**

```mdx
<Aside type="tip" title="Match your redirect URLs exactly">
  Ensure the URL in your code matches what you configured in the Scalekit dashboard.
</Aside>

<Aside type="note" title="Quick testing tip">
  For quick testing, use a request bin service like Beeceptor.
</Aside>

<Aside type="caution">
  When a user belongs to multiple organizations, subsequent login flows automatically present an
  organization selection interface.
</Aside>
```

### Formatting Conventions

**Text Formatting:**

- **Bold** - Important terms on first mention, UI elements, dashboard paths
  - **Organizations** (first mention)
  - **Dashboard > Authentication > Session Policy**
  - Click **Create** button
- `Code formatting` - All technical terms, variables, functions, endpoints, file paths
  - `accessToken`, `refreshToken`, `idToken`
  - `offline_access`, `openid`, `profile`
  - `/auth/callback`, `/oauth/authorize`
  - `authenticateWithCode()`, `validateAccessToken()`
  - `SCALEKIT_CLIENT_ID`, `SCALEKIT_ENVIRONMENT_URL`
- _Italics_ - Rarely used; prefer bold or code formatting

**Lists and Bullets:**

- Use bullets for features, capabilities, unordered items
- Use numbered lists ONLY within `<Steps>` component
- Keep list items parallel in grammatical structure
- End each item with consistent punctuation (or none)

**Code and Technical Terms:**

Always format as inline code:

```markdown
- Token names: `accessToken`, `refreshToken`, `idToken`
- Scopes: `openid`, `profile`, `email`, `offline_access`
- Method names: `authenticateWithCode`, `getAuthorizationUrl`, `validateAccessToken`
- Endpoints: `/auth/callback`, `/oauth/authorize`, `/auth/logout`
- Placeholders: `<SCALEKIT_ENVIRONMENT_URL>`, `<CALLBACK_URL>`
- Environment variables: `SCALEKIT_CLIENT_ID`, `NODE_ENV`
```

### Data Models and Examples

**D2 Diagrams:**

````markdown
```d2 pad=50
title: "Diagram title" {
  near: top-center
  shape: text
  style.font-size: 20
}

shape: sequence_diagram

User -> Scalekit: Initiate sign up \n or login
Scalekit -> Your App: Package access contents \n in access tokens
Your App -> Your App: Determine the \nrole & permissions
Your App -> User: Allow/Deny
```
````

````

**JSON Examples:**

- Use tabs for ID token vs access token
- Include inline comments for field explanations
- Use realistic data
- Highlight key fields: `{9,11}` or `{"key fields": 9-12}`
- Set `showLineNumbers=false` for JSON

**Object Structure Examples:**

```markdown
The `authResult` object contains:

- `user` - Common user details with email, name, and verification status
- `idToken` - JWT containing verified full user identity claims
- `accessToken` - Short-lived token for API authorization
- `refreshToken` - Long-lived token to obtain new access tokens
````

### SDK Variable Naming Standards

**Consistent Variable Names:**

Always use these exact variable names for Scalekit SDK clients across all documentation:

- **Node.js**: `scalekit`

  ```javascript
  const scalekit = new ScalekitClient(
    process.env.SCALEKIT_ENVIRONMENT_URL,
    process.env.SCALEKIT_CLIENT_ID,
    process.env.SCALEKIT_CLIENT_SECRET,
  )
  ```

- **Python**: `scalekit_client`

  ```python
  scalekit_client = ScalekitClient(
      env_url=os.getenv("SCALEKIT_ENVIRONMENT_URL"),
      client_id=os.getenv("SCALEKIT_CLIENT_ID"),
      client_secret=os.getenv("SCALEKIT_CLIENT_SECRET")
  )
  ```

- **Go**: `scalekitClient`

  ```go
  scalekitClient := scalekit.NewScalekitClient(
      os.Getenv("SCALEKIT_ENVIRONMENT_URL"),
      os.Getenv("SCALEKIT_CLIENT_ID"),
      os.Getenv("SCALEKIT_CLIENT_SECRET"),
  )
  ```

- **Java**: `scalekitClient`
  ```java
  ScalekitClient scalekitClient = new ScalekitClient(
      System.getenv("SCALEKIT_ENVIRONMENT_URL"),
      System.getenv("SCALEKIT_CLIENT_ID"),
      System.getenv("SCALEKIT_CLIENT_SECRET")
  );
  ```

**Implementation Guidelines:**

- Reference installation guide rather than re-instantiating clients
- Maintain exact variable names across all guides
- Use `collapse` to hide initialization in code examples
- Comment when referencing: `// Initialize Scalekit client (reference installation guide for setup)`

### User Journey and Navigation

**Inter-Page Flow:**

Create smooth transitions between guides:

1. **Previous context reference**:
   - "After successful identity verification using any of the auth methods..."
   - "Once users have successfully verified their identity..."
   - "When users authenticate through Scalekit, your application receives..."

2. **Next steps preview**:
   - "Let's take a look at how to complete the login in the next step."
   - "Next, let's look at how users can be added to organizations."
   - "Now that you have created roles and permissions, the next step is to assign these roles to users."

3. **Use prev/next frontmatter**:
   ```yaml
   prev:
     label: 'Initiate user login'
     link: '/authenticate/fsa/implement-login/'
   next:
     label: 'Manage session'
     link: '/authenticate/fsa/manage-session/'
   ```

**Within-Page Flow:**

Use transition phrases between steps:

- "After the user authenticates:"
- "Once the `state` is validated..."
- "The `authResult` object returned contains:"
- "This sets browser cookies with the session tokens."
- "Authenticated users can access your dashboard."

### Content Quality Checklist

Before publishing documentation:

**Code Quality:**

- [ ] All code examples include Node.js, Python, Go, and Java versions
- [ ] Code blocks have appropriate attributes (`title`, `wrap`, `collapse`, highlighting)
- [ ] Code comments explain use cases, security, and context
- [ ] SDK variable names follow the established standards
- [ ] Error handling is included in examples
- [ ] Both success and error paths are shown
- [ ] Imports are included (collapsed when needed)

**Content Quality:**

- [ ] Opening paragraph(s) explain what users will accomplish
- [ ] Frontmatter is complete (title, description, sidebar, prev/next, seeAlso)
- [ ] Security implications are explained with specific threats
- [ ] Steps use action-oriented headings
- [ ] Transitions connect to previous/next guides
- [ ] Real-world use cases are documented
- [ ] Dashboard paths use correct formatting

**Visual Elements:**

- [ ] Visual aids (diagrams, screenshots) are included where helpful
- [ ] Sequence diagrams in collapsible sections where appropriate
- [ ] Token/JWT examples shown in tabs
- [ ] Parameter tables formatted correctly
- [ ] Asides highlight important tips, notes, or warnings

**References:**

- [ ] Links to related docs and API references are included
- [ ] Dashboard navigation paths are accurate
- [ ] Related guides in seeAlso section
- [ ] External links have proper target and rel attributes

## Cursor Rules

For consistent development and documentation:

```typescript
// Scalekit SDK variable naming standards
const scalekit = new ScalekitClient() // Node.js
const scalekit_client = ScalekitClient() // Python
const scalekitClient = new ScalekitClient() // Go & Java

// Always reference installation guide for client setup
// Avoid re-instantiating clients in code examples
// Use established variable names consistently
```
