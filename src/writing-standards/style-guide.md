# Scalekit Documentation - Style Guide

## Core Principles

- **Voice:** Confident, direct, collaborative, instructional
- **Audience:** Practicing developers integrating Scalekit
- **Tense:** Present tense for descriptions; imperative for instructions
- **Person:** Second person ("you", "your application")—avoid passive voice
- **Clarity:** Prioritize clarity over flourish; explain the **why**, not just the **how**
- **Developer-focused:** Emphasize practical implementation over theory
- **Jargon:** Use only industry-standard terms; define Scalekit-specific terms once, then reuse consistently

## Language Rules

### Sentence Structure

- Target: ≤24 words per sentence (not a hard limit, aim for clarity)
- Paragraphs: ≤5 sentences (adjust based on content)
- Use concrete verbs: "Configure", "Validate", "Rotate", "Initialize"

### Direct, Instructional Language

- ✅ "This guide shows you how to..."
- ✅ "Create an authorization URL to..."
- ✅ "Configure the settings to enable..."
- ✅ "This prevents CSRF attacks by..."
- ⚠️ "You might want to consider..." (use sparingly, when giving options)
- ❌ "Now you'll want to..." (presumes reader's state)
- ❌ "Let's see how to..." (too informal)
- ❌ "Let's take a look at how to..." (presumes reader's state)

### Second Person (Always Use)

- ✅ "Your application receives an access token"
- ✅ "You must validate the state parameter"
- ⚠️ "The application receives..." (acceptable for passive voice in some contexts)

### Active Voice (Preferred)

- ✅ "Scalekit creates a user record" (preferred)
- ⚠️ "A user record is created by Scalekit" (acceptable when focus is on the record)

### Avoid Filler Words

- Minimize: "clearly", "simply", "basically", "obviously"
- Avoid: excessive superlatives and praise
- Use direct, factual statements

### Security and Context

- Explain security implications when relevant
- Include real-world use cases in comments
- Provide practical implementation context when it helps understanding

## Section Patterns

### Opening Phrases

- "This guide shows you how to..."
- "[Feature] provides the framework to..."
- "After [previous step], your application [next action]..."
- "When [condition], you need to [action]..."

### Section Headings (Use Action Verbs)

- "Store session tokens securely"
- "Validate the state parameter"
- "Exchange authorization code for tokens"
- "Create and manage user sessions"

### Transition Phrases

Connect steps and sections with:

- "After the user authenticates..."
- "Once the state is validated..."
- "Now that you have created..."
- "The next step is to..."
- "The following section shows how to..."

### Tense Usage

**Present Tense** (for descriptions):

- "Scalekit handles the complex authentication flow"
- "The SDK provides methods to refresh tokens"
- "Your application receives an access token"

**Future Tense** (for results):

- "This will redirect users to..."
- "You'll receive a JWT containing..."
- "Scalekit returns an authorization code"

## Content Structure

### Opening Paragraphs

Write 1-3 opening paragraphs that:

- Explain what users will accomplish in this guide
- Provide context about when/why they need this
- Preview the key concepts or workflow
- Use direct, instructional language

**Examples:**

- "Login initiation begins your authentication flow. You redirect users to Scalekit's hosted login page by creating an authorization URL with appropriate parameters."
- "User sessions determine how long users stay signed in to your application. After users successfully authenticate, you receive session tokens that manage their access."
- "When users access features in your application, you need to control what actions they can perform."

### Introduction Sections

- Begin with a clear statement of what the guide covers
- Explain the problem being solved or feature being implemented
- Provide context about when to use the feature
- Include collapsible sections for:
  - Sequence diagrams: `<IconTdesignSequence>`
  - Video demonstrations: `<IconLucidePlay>`
  - Data models: `<IconMaterialSymbolsArticlePersonRounded>`
  - JSON examples: `<IconLucideFileJson>`

### Step-by-Step Guides Structure

````mdx
<Steps>
1. ## Step title with action verb

Explanation of what this step accomplishes and why.

   <Tabs syncKey="tech-stack">
   <TabItem value="node" label="Node.js">
   ```javascript title="Express.js"
   // Code example
````

   </TabItem>
   </Tabs>

Additional context after code.

   <Aside type="tip" title="Helpful tip">
   Additional guidance.
   </Aside>

2. ## Next step title

   Continue pattern...

</Steps>
```

**Rules for Steps:**

- Use numbered format within Steps: `1. ## Title`
- All step content must be indented with 3 spaces
- Action-oriented headings
- Include code examples in all 4 languages
- Add context before and after code blocks
- Use Badges for optional/recommended steps

## Text Formatting

### Bold (`**text**`)

- Important terms on **first mention**
- UI elements: Click the **Save** button
- Dashboard paths: **Dashboard > Authentication > Session Policy**
- ❌ Do not use for emphasis in regular sentences

### Inline Code (`` `text` ``)

- Technical terms: `accessToken`, `refreshToken`, `idToken`
- Variable names: `req`, `res`, `user`
- Function/method names: `authenticateWithCode()`, `validateAccessToken()`
- Endpoints: `/auth/callback`, `/oauth/authorize`
- Scopes: `openid`, `profile`, `email`, `offline_access`
- Environment variables: `SCALEKIT_CLIENT_ID`, `NODE_ENV`
- File paths: `src/config/auth.ts`
- Placeholders: `<SCALEKIT_ENVIRONMENT_URL>`, `<CALLBACK_URL>`

### Dashboard References

Use this exact format:
**Dashboard > Section > Subsection > Field**

Examples:

- Navigate to **Dashboard > Developers > Settings > API Credentials**
- Find your callback URLs in **Dashboard > Authentication > Redirect URLs**
- Configure session duration in **Dashboard > Authentication > Session Policy**

### Links

- Use meaningful link text (not "click here" or "this")
- For file references: `[filename.ts](src/filename.ts)`
- For specific lines: `[filename.ts:42](src/filename.ts#L42)`
- For line ranges: `[filename.ts:42-51](src/filename.ts#L42-L51)`
- For folders: `[src/utils/](src/utils/)`

## Prohibited Phrases

Avoid phrases that presume the reader's state of mind:

- "Let's take a look at how to..."
- "Now you'll want to..."
- "You might be wondering..."
- "Let's see how to..."
