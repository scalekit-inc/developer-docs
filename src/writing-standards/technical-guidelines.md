# Technical Guidelines and Standards

## Code Examples

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

## Token and JWT Examples

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
```

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
````

## D2 Sequence Diagrams

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
```

- `<CheckItem>` - Checklist items
- `<CopyPrompt>` - AI prompt copy buttons
- `<VideoPlayer>` - Embedded video demonstrations
- Icons from `~icons/` for visual context

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
