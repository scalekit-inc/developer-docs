# Chatbot API Service + Widget Integration — Implementation Plan (Plan A)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Node.js chatbot API service using agentboard that answers docs questions grounded in llms.txt custom sets, offers to create Pylon issues when it can't answer, and integrates as a widget into docs.scalekit.com.

**Architecture:** An Express service at `services/chatbot-api/` uses agentboard's `AgentRunner` configured with two tools — `search_docs` (classifies query → fetches matching llms.txt custom set from the public docs URL) and `create_pylon_issue` (creates a Pylon issue with conversation context, requires user confirmation). The widget is injected into the Starlight docs site via the existing `Head.astro` override using agentboard's `AgentTerminal` React component as a placeholder — swap for `ChatBubble` variant once agentboard's UI variants are complete.

**Tech Stack:** Node.js 20+, TypeScript, agentboard (`github:scalekit-inc/agentboard`), Express 5, Vitest, Anthropic SDK (via agentboard), Pylon REST API.

**Depends on:** agentboard repo being installable from GitHub. Run `gh repo view scalekit-inc/agentboard` to verify it is public and has a build before starting.

**Plan B (Pylon feedback loop) and Plan C (Slack bot) follow this plan.**

---

## File map

```
services/chatbot-api/
  src/
    index.ts                      ← Express app entry + server start
    agent.ts                      ← AgentRunner + ToolRegistry setup (the configured agent)
    tools/
      search-docs.ts              ← search_docs tool: classifies query, fetches llms.txt set
      create-pylon-issue.ts       ← create_pylon_issue tool (requiresConfirmation: true)
    lib/
      classify-query.ts           ← maps query text → topic slug
      fetch-custom-set.ts         ← fetches llms.txt file by topic slug from docs URL
  tests/
    lib/
      classify-query.test.ts
      fetch-custom-set.test.ts
    tools/
      search-docs.test.ts
      create-pylon-issue.test.ts
    agent.test.ts                 ← integration: AgentRunner responds to a query
  package.json
  tsconfig.json
  vitest.config.ts
  .env.example

src/components/overrides/
  Head.astro                      ← MODIFY: inject chatbot widget script tag
src/components/chatbot/
  ChatbotWidget.astro             ← NEW: Astro component that mounts the React widget
```

---

## Task 1: Bootstrap the chatbot-api service

**Files:**

- Create: `services/chatbot-api/package.json`
- Create: `services/chatbot-api/tsconfig.json`
- Create: `services/chatbot-api/vitest.config.ts`
- Create: `services/chatbot-api/.env.example`
- Create: `services/chatbot-api/src/index.ts`

- [ ] **Step 1: Create the service directory and package.json**

```bash
mkdir -p services/chatbot-api/src/tools services/chatbot-api/src/lib services/chatbot-api/tests/lib services/chatbot-api/tests/tools
```

Create `services/chatbot-api/package.json`:

```json
{
  "name": "chatbot-api",
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "agentboard": "github:scalekit-inc/agentboard",
    "express": "^5.0.0",
    "dotenv": "^16.0.0"
  },
  "devDependencies": {
    "@types/express": "^5.0.0",
    "@types/node": "^20.0.0",
    "tsx": "^4.0.0",
    "typescript": "^5.0.0",
    "vitest": "^2.0.0",
    "msw": "^2.0.0"
  }
}
```

- [ ] **Step 2: Create tsconfig.json**

Create `services/chatbot-api/tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

- [ ] **Step 3: Create vitest.config.ts**

Create `services/chatbot-api/vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
  },
})
```

- [ ] **Step 4: Create .env.example**

Create `services/chatbot-api/.env.example`:

```
ANTHROPIC_API_KEY=sk-ant-...
PYLON_API_TOKEN=pylon_...
DOCS_BASE_URL=https://docs.scalekit.com
PORT=3001
```

Copy to `.env` and fill in values:

```bash
cp services/chatbot-api/.env.example services/chatbot-api/.env
```

- [ ] **Step 5: Create skeleton Express app**

Create `services/chatbot-api/src/index.ts`:

```ts
import 'dotenv/config'
import express from 'express'

const app = express()
app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

const port = process.env.PORT ?? 3001
app.listen(port, () => {
  console.log(`chatbot-api listening on http://localhost:${port}`)
})

export { app }
```

- [ ] **Step 6: Install dependencies and verify server starts**

```bash
cd services/chatbot-api && npm install
npm run dev
```

Expected output:

```
chatbot-api listening on http://localhost:3001
```

Verify:

```bash
curl http://localhost:3001/health
```

Expected: `{"status":"ok"}`

- [ ] **Step 7: Commit**

```bash
git add services/chatbot-api/
git commit -m "feat(chatbot-api): bootstrap express service skeleton"
```

---

## Task 2: Query topic classifier

**Files:**

- Create: `services/chatbot-api/src/lib/classify-query.ts`
- Create: `services/chatbot-api/tests/lib/classify-query.test.ts`

The classifier maps a query string to one of the topic slugs that correspond to llms.txt custom sets.

- [ ] **Step 1: Write failing tests**

Create `services/chatbot-api/tests/lib/classify-query.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { classifyQuery } from '../../src/lib/classify-query.js'

describe('classifyQuery', () => {
  it('classifies FSA questions', () => {
    expect(classifyQuery('How do I manage user sessions in FSA?')).toBe('fsa')
    expect(classifyQuery('How does RBAC work?')).toBe('fsa')
    expect(classifyQuery('How do I add users to an org?')).toBe('fsa')
  })

  it('classifies SSO questions', () => {
    expect(classifyQuery('How do I set up SAML SSO?')).toBe('sso')
    expect(classifyQuery('Configure OIDC with Okta')).toBe('sso')
    expect(classifyQuery('single sign-on setup')).toBe('sso')
  })

  it('classifies SCIM questions', () => {
    expect(classifyQuery('How does SCIM provisioning work?')).toBe('scim')
    expect(classifyQuery('Sync users from directory')).toBe('scim')
  })

  it('classifies Agent Auth questions', () => {
    expect(classifyQuery('How do AI agents authenticate?')).toBe('agent-auth')
    expect(classifyQuery('OAuth vault for tool calling')).toBe('agent-auth')
  })

  it('classifies MCP questions', () => {
    expect(classifyQuery('How do I add auth to my MCP server?')).toBe('mcp')
    expect(classifyQuery('Dynamic Client Registration')).toBe('mcp')
  })

  it('classifies M2M questions', () => {
    expect(classifyQuery('Service to service authentication')).toBe('m2m')
    expect(classifyQuery('client credentials flow')).toBe('m2m')
    expect(classifyQuery('API key authentication')).toBe('m2m')
  })

  it('classifies SDK/API reference questions', () => {
    expect(classifyQuery('What does the getSession() method return?')).toBe('sdk')
    expect(classifyQuery('Webhook payload format')).toBe('sdk')
  })

  it('falls back to quickstart for unknown topics', () => {
    expect(classifyQuery('How do I get started with Scalekit?')).toBe('quickstart')
    expect(classifyQuery('What is Scalekit?')).toBe('quickstart')
  })

  it('is case-insensitive', () => {
    expect(classifyQuery('HOW DO I SET UP SAML SSO')).toBe('sso')
  })
})
```

- [ ] **Step 2: Run tests — verify they fail**

```bash
cd services/chatbot-api && npm test tests/lib/classify-query.test.ts
```

Expected: FAIL — `Cannot find module '../../src/lib/classify-query.js'`

- [ ] **Step 3: Implement classifyQuery**

Create `services/chatbot-api/src/lib/classify-query.ts`:

```ts
export type TopicSlug = 'fsa' | 'sso' | 'scim' | 'agent-auth' | 'mcp' | 'm2m' | 'sdk' | 'quickstart'

const TOPIC_PATTERNS: Array<[TopicSlug, RegExp]> = [
  [
    'fsa',
    /\bfsa\b|full[\s-]stack\s*auth|session|rbac|role.based|\buser.*org\b|\borg.*user\b|login\s*flow|sign[\s-]?in\s*flow/i,
  ],
  [
    'sso',
    /\bsso\b|saml|oidc(?!\s*vault)|single\s*sign[\s-]on|identity\s*provider|enterprise\s*login/i,
  ],
  ['scim', /\bscim\b|directory\s*sync|user\s*sync|provisioning|deprovisioning|group\s*sync/i],
  [
    'agent-auth',
    /agent\s*auth|ai\s*agent|oauth\s*vault|tool\s*call|mcp\s*connector|agent\s*connector/i,
  ],
  [
    'mcp',
    /\bmcp\b|model\s*context\s*protocol|dynamic\s*client\s*registration|mcp\s*server|mcp\s*auth/i,
  ],
  [
    'm2m',
    /m2m|machine[\s-]to[\s-]machine|client\s*credentials|api\s*key|service[\s-]to[\s-]service|service\s*account/i,
  ],
  [
    'sdk',
    /\bsdk\b|endpoint|webhook|api\s*reference|method\s*return|\bgetSession\b|\bcreateUser\b/i,
  ],
]

export function classifyQuery(query: string): TopicSlug {
  for (const [slug, pattern] of TOPIC_PATTERNS) {
    if (pattern.test(query)) return slug
  }
  return 'quickstart'
}
```

- [ ] **Step 4: Run tests — verify they pass**

```bash
cd services/chatbot-api && npm test tests/lib/classify-query.test.ts
```

Expected: All tests PASS.

- [ ] **Step 5: Commit**

```bash
git add services/chatbot-api/src/lib/classify-query.ts services/chatbot-api/tests/lib/classify-query.test.ts
git commit -m "feat(chatbot-api): implement query topic classifier"
```

---

## Task 3: llms.txt custom set fetcher

**Files:**

- Create: `services/chatbot-api/src/lib/fetch-custom-set.ts`
- Create: `services/chatbot-api/tests/lib/fetch-custom-set.test.ts`

Fetches the right llms.txt file from the public docs URL based on topic slug. The custom sets are served at `{DOCS_BASE_URL}/llms-{slug}.txt` by `starlight-llms-txt`.

**Before implementing:** verify the actual URLs by running:

```bash
curl -I https://docs.scalekit.com/llms-fsa.txt
curl -I https://docs.scalekit.com/llms-agent-authentication.txt
```

If the URLs use different slugs (e.g. label-based like `llms-full-stack-auth-complete.txt`), update the `SLUG_TO_PATH` map in this task accordingly.

- [ ] **Step 1: Write failing tests**

Create `services/chatbot-api/tests/lib/fetch-custom-set.test.ts`:

```ts
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { fetchCustomSet } from '../../src/lib/fetch-custom-set.js'
import type { TopicSlug } from '../../src/lib/classify-query.js'

const MOCK_DOCS_CONTENT = '# FSA Docs\n\nThis is the full stack auth documentation.'

describe('fetchCustomSet', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
    process.env.DOCS_BASE_URL = 'https://docs.scalekit.com'
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('fetches the correct URL for fsa topic', async () => {
    ;(fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      text: async () => MOCK_DOCS_CONTENT,
    })

    const result = await fetchCustomSet('fsa')

    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/llms-'), expect.any(Object))
    expect(result).toBe(MOCK_DOCS_CONTENT)
  })

  it('falls back to llms-small.txt when custom set fetch fails', async () => {
    ;(fetch as ReturnType<typeof vi.fn>)
      .mockResolvedValueOnce({ ok: false, status: 404 })
      .mockResolvedValueOnce({ ok: true, text: async () => '# Full Docs\n\nAll content.' })

    const result = await fetchCustomSet('fsa')
    expect(result).toBe('# Full Docs\n\nAll content.')
  })

  it('throws when both custom set and fallback fail', async () => {
    ;(fetch as ReturnType<typeof vi.fn>)
      .mockResolvedValueOnce({ ok: false, status: 404 })
      .mockResolvedValueOnce({ ok: false, status: 500 })

    await expect(fetchCustomSet('fsa')).rejects.toThrow('Failed to fetch docs content')
  })

  it('fetches all topic slugs without throwing', async () => {
    const slugs: TopicSlug[] = [
      'fsa',
      'sso',
      'scim',
      'agent-auth',
      'mcp',
      'm2m',
      'sdk',
      'quickstart',
    ]
    for (const slug of slugs) {
      ;(fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        text: async () => `# ${slug} docs`,
      })
      const result = await fetchCustomSet(slug)
      expect(result).toContain(slug)
    }
  })
})
```

- [ ] **Step 2: Run tests — verify they fail**

```bash
cd services/chatbot-api && npm test tests/lib/fetch-custom-set.test.ts
```

Expected: FAIL — `Cannot find module '../../src/lib/fetch-custom-set.js'`

- [ ] **Step 3: Implement fetchCustomSet**

Create `services/chatbot-api/src/lib/fetch-custom-set.ts`:

```ts
import type { TopicSlug } from './classify-query.js'

// Maps topic slugs to the llms.txt path suffix served by starlight-llms-txt.
// Verify these paths exist by running:
//   curl -I https://docs.scalekit.com/llms-{path}.txt
// Update this map if the plugin uses different naming conventions.
const SLUG_TO_PATH: Record<TopicSlug, string> = {
  fsa: 'full-stack-auth-complete',
  sso: 'enterprise-sso-and-scim',
  scim: 'enterprise-sso-and-scim',
  'agent-auth': 'agent-authentication',
  mcp: 'mcp-authentication',
  m2m: 'machine-to-machine-auth',
  sdk: 'api-and-sdk-reference',
  quickstart: 'quickstart-collection',
}

export async function fetchCustomSet(topic: TopicSlug): Promise<string> {
  const baseUrl = process.env.DOCS_BASE_URL ?? 'https://docs.scalekit.com'
  const path = SLUG_TO_PATH[topic]
  const customSetUrl = `${baseUrl}/llms-${path}.txt`

  const customRes = await fetch(customSetUrl, {
    headers: { 'User-Agent': 'scalekit-chatbot/1.0' },
  })

  if (customRes.ok) {
    return customRes.text()
  }

  // Fall back to llms-small.txt which contains all content in a smaller footprint
  const fallbackUrl = `${baseUrl}/llms-small.txt`
  const fallbackRes = await fetch(fallbackUrl, {
    headers: { 'User-Agent': 'scalekit-chatbot/1.0' },
  })

  if (fallbackRes.ok) {
    return fallbackRes.text()
  }

  throw new Error(
    `Failed to fetch docs content: custom set ${customSetUrl} returned ${customRes.status}, ` +
      `fallback ${fallbackUrl} returned ${fallbackRes.status}`,
  )
}
```

- [ ] **Step 4: Run tests — verify they pass**

```bash
cd services/chatbot-api && npm test tests/lib/fetch-custom-set.test.ts
```

Expected: All tests PASS.

- [ ] **Step 5: Commit**

```bash
git add services/chatbot-api/src/lib/fetch-custom-set.ts services/chatbot-api/tests/lib/fetch-custom-set.test.ts
git commit -m "feat(chatbot-api): implement llms.txt custom set fetcher with fallback"
```

---

## Task 4: search_docs tool

**Files:**

- Create: `services/chatbot-api/src/tools/search-docs.ts`
- Create: `services/chatbot-api/tests/tools/search-docs.test.ts`

Combines `classifyQuery` + `fetchCustomSet` into a `RegistryTool` that agentboard's `ToolRegistry` can register.

- [ ] **Step 1: Write failing tests**

Create `services/chatbot-api/tests/tools/search-docs.test.ts`:

```ts
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { searchDocsTool } from '../../src/tools/search-docs.js'

const MOCK_FSA_CONTENT = '# Full Stack Auth\n\nScalekit FSA documentation content here.'

describe('searchDocsTool', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        text: async () => MOCK_FSA_CONTENT,
      }),
    )
    process.env.DOCS_BASE_URL = 'https://docs.scalekit.com'
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('has correct tool definition for Claude', () => {
    expect(searchDocsTool.definition.name).toBe('search_docs')
    expect(searchDocsTool.definition.description).toContain('search')
    expect(searchDocsTool.definition.input_schema.properties).toHaveProperty('query')
  })

  it('returns docs content for a query', async () => {
    const result = await searchDocsTool.execute(
      { query: 'How do I set up RBAC?' },
      { userId: 'anon', orgId: '', isAdmin: false },
    )
    expect(result).toContain('Full Stack Auth')
  })

  it('accepts optional topic override', async () => {
    const result = await searchDocsTool.execute(
      { query: 'How do I set up RBAC?', topic: 'sso' },
      { userId: 'anon', orgId: '', isAdmin: false },
    )
    expect(result).toBeDefined()
    // Verify the sso path was fetched
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('enterprise-sso'),
      expect.any(Object),
    )
  })

  it('does not require confirmation', () => {
    expect(searchDocsTool.requiresConfirmation).toBeFalsy()
  })
})
```

- [ ] **Step 2: Run tests — verify they fail**

```bash
cd services/chatbot-api && npm test tests/tools/search-docs.test.ts
```

Expected: FAIL — `Cannot find module '../../src/tools/search-docs.js'`

- [ ] **Step 3: Implement search_docs tool**

Create `services/chatbot-api/src/tools/search-docs.ts`:

```ts
import type { RegistryTool } from 'agentboard'
import { classifyQuery, type TopicSlug } from '../lib/classify-query.js'
import { fetchCustomSet } from '../lib/fetch-custom-set.js'

export const searchDocsTool: RegistryTool = {
  definition: {
    name: 'search_docs',
    description:
      'Search Scalekit documentation to answer questions. ' +
      'Always call this tool before answering any question about Scalekit products ' +
      '(FSA, SSO, SCIM, Agent Auth, MCP, M2M, SDK). ' +
      'Returns the relevant documentation content as context.',
    input_schema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'The user question to search for in the docs',
        },
        topic: {
          type: 'string',
          enum: ['fsa', 'sso', 'scim', 'agent-auth', 'mcp', 'm2m', 'sdk', 'quickstart'],
          description:
            'Optional topic override. If omitted, the topic is auto-detected from the query.',
        },
      },
      required: ['query'],
    },
  },
  execute: async (args) => {
    const { query, topic } = args as { query: string; topic?: TopicSlug }
    const resolvedTopic = topic ?? classifyQuery(query)
    const content = await fetchCustomSet(resolvedTopic)
    return content
  },
  requiresConfirmation: false,
}
```

- [ ] **Step 4: Run tests — verify they pass**

```bash
cd services/chatbot-api && npm test tests/tools/search-docs.test.ts
```

Expected: All tests PASS.

- [ ] **Step 5: Commit**

```bash
git add services/chatbot-api/src/tools/search-docs.ts services/chatbot-api/tests/tools/search-docs.test.ts
git commit -m "feat(chatbot-api): implement search_docs tool using llms.txt custom sets"
```

---

## Task 5: create_pylon_issue tool

**Files:**

- Create: `services/chatbot-api/src/tools/create-pylon-issue.ts`
- Create: `services/chatbot-api/tests/tools/create-pylon-issue.test.ts`

Creates a Pylon support issue with full conversation context and user identity. `requiresConfirmation: true` — agentboard pauses and asks the user to confirm before executing.

**Before implementing:** Verify your Pylon API base URL and auth format by checking the Pylon dashboard or docs. The tool uses `https://api.usepylon.com` with a Bearer token. If your Pylon instance uses a different URL, set `PYLON_API_URL` in `.env`.

- [ ] **Step 1: Write failing tests**

Create `services/chatbot-api/tests/tools/create-pylon-issue.test.ts`:

```ts
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { createPylonIssueTool } from '../../src/tools/create-pylon-issue.js'
import type { AgentContext } from 'agentboard'

const MOCK_ISSUE_RESPONSE = {
  id: 'issue_abc123',
  title: 'Docs gap: passkeys + SAML SSO',
  status: 'open',
}

describe('createPylonIssueTool', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => MOCK_ISSUE_RESPONSE,
      }),
    )
    process.env.PYLON_API_TOKEN = 'test-pylon-token'
    process.env.PYLON_API_URL = 'https://api.usepylon.com'
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    delete process.env.PYLON_API_TOKEN
    delete process.env.PYLON_API_URL
  })

  it('has correct tool definition', () => {
    expect(createPylonIssueTool.definition.name).toBe('create_pylon_issue')
    expect(createPylonIssueTool.definition.input_schema.properties).toHaveProperty('question')
    expect(createPylonIssueTool.definition.input_schema.properties).toHaveProperty(
      'conversation_summary',
    )
  })

  it('requires confirmation before executing', () => {
    expect(createPylonIssueTool.requiresConfirmation).toBe(true)
  })

  it('creates an issue with user context when user is identified', async () => {
    const ctx: AgentContext = {
      userId: 'jane@acme.com',
      orgId: 'org_acme',
      isAdmin: false,
    }

    const result = (await createPylonIssueTool.execute(
      {
        question: 'Can passkeys and SAML SSO coexist for the same org?',
        conversation_summary:
          'User asked about passkeys + SAML, no confident answer found in docs.',
      },
      ctx,
    )) as { issueId: string; message: string }

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('usepylon.com'),
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          Authorization: 'Bearer test-pylon-token',
        }),
      }),
    )
    expect(result.issueId).toBe('issue_abc123')
    expect(result.message).toContain('issue_abc123')
  })

  it('creates an issue for anonymous users without user context', async () => {
    const ctx: AgentContext = {
      userId: '',
      orgId: '',
      isAdmin: false,
    }

    await createPylonIssueTool.execute(
      { question: 'How does M2M auth work?', conversation_summary: 'No answer found.' },
      ctx,
    )

    expect(fetch).toHaveBeenCalled()
  })

  it('throws with a clear message when PYLON_API_TOKEN is missing', async () => {
    delete process.env.PYLON_API_TOKEN
    const ctx: AgentContext = { userId: '', orgId: '', isAdmin: false }

    await expect(
      createPylonIssueTool.execute({ question: 'test', conversation_summary: 'test' }, ctx),
    ).rejects.toThrow('PYLON_API_TOKEN')
  })

  it('throws when Pylon API returns an error', async () => {
    ;(fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      status: 401,
      text: async () => 'Unauthorized',
    })
    const ctx: AgentContext = { userId: '', orgId: '', isAdmin: false }

    await expect(
      createPylonIssueTool.execute({ question: 'test', conversation_summary: 'test' }, ctx),
    ).rejects.toThrow('Pylon API error 401')
  })
})
```

- [ ] **Step 2: Run tests — verify they fail**

```bash
cd services/chatbot-api && npm test tests/tools/create-pylon-issue.test.ts
```

Expected: FAIL — `Cannot find module '../../src/tools/create-pylon-issue.js'`

- [ ] **Step 3: Implement create_pylon_issue tool**

Create `services/chatbot-api/src/tools/create-pylon-issue.ts`:

```ts
import type { RegistryTool, AgentContext } from 'agentboard'

interface PylonIssueArgs {
  question: string
  conversation_summary: string
  user_email?: string // provided by widget when anonymous user opts in
}

export const createPylonIssueTool: RegistryTool = {
  definition: {
    name: 'create_pylon_issue',
    description:
      'Create a support issue in Pylon when the documentation does not contain a confident answer. ' +
      'Only call this tool after the user has explicitly confirmed they want to create an issue. ' +
      'Include the original question and a summary of what was searched.',
    input_schema: {
      type: 'object',
      properties: {
        question: {
          type: 'string',
          description: "The user's original question that could not be answered from docs.",
        },
        conversation_summary: {
          type: 'string',
          description: 'Brief summary of the conversation and what docs were searched.',
        },
        user_email: {
          type: 'string',
          description: 'Optional email address provided by the user for follow-up.',
        },
      },
      required: ['question', 'conversation_summary'],
    },
  },
  execute: async (args, ctx: AgentContext) => {
    const { question, conversation_summary, user_email } = args as PylonIssueArgs

    const token = process.env.PYLON_API_TOKEN
    if (!token) throw new Error('PYLON_API_TOKEN environment variable is not set')

    const apiUrl = process.env.PYLON_API_URL ?? 'https://api.usepylon.com'

    const title = `Docs gap: ${question.slice(0, 80)}${question.length > 80 ? '…' : ''}`

    const body: Record<string, unknown> = {
      title,
      body: [
        `**Question:** ${question}`,
        '',
        `**Context:** ${conversation_summary}`,
        '',
        `**Source:** docs chatbot`,
        ctx.userId ? `**User:** ${ctx.userId}` : '',
        ctx.orgId ? `**Org:** ${ctx.orgId}` : '',
        user_email ? `**Contact:** ${user_email}` : '',
      ]
        .filter(Boolean)
        .join('\n'),
      tags: ['docs-gap'],
    }

    if (ctx.userId) body.requester_email = ctx.userId

    const res = await fetch(`${apiUrl}/issues`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      const text = await res.text().catch(() => '')
      throw new Error(`Pylon API error ${res.status}: ${text}`)
    }

    const issue = (await res.json()) as { id: string }
    return {
      issueId: issue.id,
      message: `Support issue created (${issue.id}). Our team will follow up${ctx.userId ? ` with ${ctx.userId}` : ''}.`,
    }
  },
  requiresConfirmation: true,
}
```

- [ ] **Step 4: Run tests — verify they pass**

```bash
cd services/chatbot-api && npm test tests/tools/create-pylon-issue.test.ts
```

Expected: All tests PASS.

- [ ] **Step 5: Commit**

```bash
git add services/chatbot-api/src/tools/create-pylon-issue.ts services/chatbot-api/tests/tools/create-pylon-issue.test.ts
git commit -m "feat(chatbot-api): implement create_pylon_issue tool with confirmation"
```

---

## Task 6: Configure AgentRunner and wire Express routes

**Files:**

- Create: `services/chatbot-api/src/agent.ts`
- Modify: `services/chatbot-api/src/index.ts`
- Create: `services/chatbot-api/tests/agent.test.ts`

- [ ] **Step 1: Write failing integration test**

Create `services/chatbot-api/tests/agent.test.ts`:

```ts
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import Anthropic from '@anthropic-ai/sdk'

// Mock the Anthropic SDK to avoid real API calls in tests
vi.mock('@anthropic-ai/sdk', () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      messages: {
        create: vi.fn().mockResolvedValue({
          id: 'msg_test',
          content: [{ type: 'text', text: 'Based on the docs, here is how FSA sessions work...' }],
          stop_reason: 'end_turn',
          usage: { input_tokens: 100, output_tokens: 50 },
        }),
      },
    })),
  }
})

vi.stubGlobal(
  'fetch',
  vi.fn().mockResolvedValue({
    ok: true,
    text: async () => '# FSA Docs\n\nSession management works by...',
  }),
)

describe('createAgent', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('creates an agent with search_docs and create_pylon_issue tools', async () => {
    process.env.ANTHROPIC_API_KEY = 'test-key'
    const { createAgent } = await import('../src/agent.js')
    const { runner, tools } = createAgent()

    expect(runner).toBeDefined()
    expect(tools.size).toBe(2)
  })

  it('registers search_docs without confirmation', async () => {
    process.env.ANTHROPIC_API_KEY = 'test-key'
    const { createAgent } = await import('../src/agent.js')
    const { tools } = createAgent()

    expect(tools.requiresConfirmation('search_docs')).toBe(false)
    expect(tools.requiresConfirmation('create_pylon_issue')).toBe(true)
  })
})
```

- [ ] **Step 2: Run test — verify it fails**

```bash
cd services/chatbot-api && npm test tests/agent.test.ts
```

Expected: FAIL — `Cannot find module '../src/agent.js'`

- [ ] **Step 3: Implement agent.ts**

Create `services/chatbot-api/src/agent.ts`:

```ts
import Anthropic from '@anthropic-ai/sdk'
import { AgentRunner, ToolRegistry, InMemorySessionStore } from 'agentboard'
import { searchDocsTool } from './tools/search-docs.js'
import { createPylonIssueTool } from './tools/create-pylon-issue.js'

const SYSTEM_PROMPT = `You are the Scalekit docs assistant.

When answering questions:
1. ALWAYS call search_docs first before answering any product question.
2. Answer ONLY using content returned by search_docs. Do not use prior knowledge.
3. Always cite the source by mentioning the relevant docs section.
4. Keep answers concise and link to the relevant docs page when possible.

If search_docs does not contain a clear answer to the question:
- Say explicitly: "I don't have a confident answer for this in the docs."
- Offer to create a support issue: "Would you like me to create a support issue so our team can follow up?"
- If the user confirms, call create_pylon_issue with the original question and a summary.

Never guess or invent information about Scalekit products.`

export function createAgent() {
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  })

  const tools = new ToolRegistry()
  tools.register(searchDocsTool)
  tools.register(createPylonIssueTool)

  const runner = new AgentRunner({
    anthropic,
    systemPrompt: SYSTEM_PROMPT,
    tools,
    sessionStore: new InMemorySessionStore(),
    model: 'claude-haiku-4-5-20251001',
    maxTokens: 1024,
  })

  return { runner, tools }
}
```

- [ ] **Step 4: Wire the Express routes using agentboard's Express adapter**

Update `services/chatbot-api/src/index.ts`:

```ts
import 'dotenv/config'
import express from 'express'
import { createAgentRouter } from 'agentboard/express'
import { createAgent } from './agent.js'

const app = express()
app.use(express.json())

// CORS for the docs site and any embed origin
app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-user-id, x-org-id, x-is-admin')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  next()
})

app.options('*', (_req, res) => res.sendStatus(200))

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

const { runner, tools } = createAgent()

// Mount the agentboard Express router at /api/chat
// It handles POST /api/chat (send message) and POST /api/chat/confirm (tool confirmation)
app.use(
  '/api/chat',
  createAgentRouter({
    runner,
    context: (req) => ({
      userId: (req.headers['x-user-id'] as string) ?? '',
      orgId: (req.headers['x-org-id'] as string) ?? '',
      isAdmin: req.headers['x-is-admin'] === 'true',
    }),
  }),
)

const port = process.env.PORT ?? 3001
app.listen(port, () => {
  console.log(`chatbot-api listening on http://localhost:${port}`)
})

export { app }
```

- [ ] **Step 5: Run all tests**

```bash
cd services/chatbot-api && npm test
```

Expected: All tests PASS.

- [ ] **Step 6: Smoke test the running server**

```bash
cd services/chatbot-api && npm run dev
```

In another terminal:

```bash
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "How does RBAC work in FSA?", "session_id": "test-123"}' \
  --no-buffer
```

Expected: SSE stream of `data: {"type":"token","data":{"text":"..."}}` events, ending with `data: {"type":"done",...}`.

- [ ] **Step 7: Commit**

```bash
git add services/chatbot-api/src/agent.ts services/chatbot-api/src/index.ts services/chatbot-api/tests/agent.test.ts
git commit -m "feat(chatbot-api): wire AgentRunner with Express routes"
```

---

## Task 7: Integrate widget into Starlight docs site

**Files:**

- Create: `src/components/chatbot/ChatbotWidget.astro`
- Modify: `src/components/overrides/Head.astro`

This task embeds the agentboard widget into the docs site. It uses `AgentTerminal` as a placeholder. When agentboard's `ChatBubble` variant is complete (built in the parallel agentboard session), replace `AgentTerminal` with `AgentChatBubble` — no other changes needed.

- [ ] **Step 1: Create the ChatbotWidget Astro component**

Create `src/components/chatbot/ChatbotWidget.astro`:

```astro
---
// Chatbot widget component.
// Currently uses AgentTerminal as placeholder.
// Replace with AgentChatBubble once agentboard UI variants are complete.
const chatApiUrl = import.meta.env.PUBLIC_CHATBOT_API_URL ?? 'http://localhost:3001'
---

<div
  id="scalekit-chatbot-container"
  style="display:none; position:fixed; bottom:24px; right:24px; z-index:9999; width:420px; height:560px; border-radius:12px; overflow:hidden; box-shadow:0 8px 32px rgba(0,0,0,0.3);"
>
  <div id="scalekit-chatbot-mount" style="width:100%; height:100%;"></div>
</div>

<button
  id="scalekit-chatbot-trigger"
  aria-label="Ask AI"
  style="position:fixed; bottom:24px; right:24px; z-index:9999; width:48px; height:48px; border-radius:50%; background:#6366f1; border:none; cursor:pointer; color:white; font-size:20px; box-shadow:0 4px 12px rgba(99,102,241,0.4);"
>
  💬
</button>

<script define:vars={{ chatApiUrl }}>
  // Toggle open/close
  const trigger = document.getElementById('scalekit-chatbot-trigger')
  const container = document.getElementById('scalekit-chatbot-container')
  let open = false

  trigger?.addEventListener('click', () => {
    open = !open
    if (container) container.style.display = open ? 'block' : 'none'
    if (trigger) trigger.style.display = open ? 'none' : 'flex'
    if (open) window.__scalekitChatMount?.(chatApiUrl)
  })

  // ScalekitChat.identify() API — call this from the app after auth
  window.ScalekitChat = {
    identify: ({ email, name, orgId, orgName }) => {
      window.__scalekitChatUser = { email, name, orgId, orgName }
    },
  }
</script>

<script>
  // Mount the React widget when the panel opens
  // This is loaded lazily to avoid blocking page load
  window.__scalekitChatMount = async (endpoint) => {
    if (window.__scalekitChatMounted) return
    window.__scalekitChatMounted = true

    const { AgentTerminal, createRoot } = await Promise.all([
      import('agentboard/react').then((m) => m.AgentTerminal),
      import('react-dom/client').then((m) => m.createRoot),
    ])

    const mount = document.getElementById('scalekit-chatbot-mount')
    if (!mount) return

    const user = window.__scalekitChatUser
    const headers = user
      ? {
          'x-user-id': user.email ?? '',
          'x-org-id': user.orgId ?? '',
        }
      : {}

    const root = createRoot(mount)
    root.render(AgentTerminal({ endpoint: `${endpoint}/api/chat`, headers, theme: 'zinc' }))
  }
</script>
```

- [ ] **Step 2: Add PUBLIC_CHATBOT_API_URL to the docs site env**

Add to the root `.env` of the docs site (create if it doesn't exist):

```
PUBLIC_CHATBOT_API_URL=http://localhost:3001
```

For production, this will be the deployed chatbot-api URL.

- [ ] **Step 3: Inject the widget into Head.astro**

Modify `src/components/overrides/Head.astro`:

```astro
---
import Default from '@astrojs/starlight/components/Head.astro'
import ChatbotWidget from '../chatbot/ChatbotWidget.astro'
---

<Default>
  <slot />
</Default>

<ChatbotWidget />
```

- [ ] **Step 4: Verify the widget renders in local dev**

```bash
# Terminal 1 — start chatbot API
cd services/chatbot-api && npm run dev

# Terminal 2 — start docs site
pnpm dev
```

Open `http://localhost:4321` in a browser. Verify:

- A purple 💬 button appears in the bottom-right corner
- Clicking it opens a chat panel
- Typing a question produces a streamed response
- An unanswerable question produces the "create support issue?" offer

- [ ] **Step 5: Commit**

```bash
git add src/components/chatbot/ChatbotWidget.astro src/components/overrides/Head.astro
git commit -m "feat(docs): integrate chatbot widget into Starlight layout"
```

---

## Task 8: Final wiring check and env documentation

**Files:**

- Create: `services/chatbot-api/README.md`

- [ ] **Step 1: Run the full test suite**

```bash
cd services/chatbot-api && npm test
```

Expected: All tests PASS with no skipped tests.

- [ ] **Step 2: Verify the confirmation flow end-to-end**

With the chatbot API running and docs site open:

1. Ask: "How do I set up SCIM provisioning?" — should get a docs-grounded answer.
2. Ask: "Does Scalekit support biometric authentication on iOS?" — should get the "I don't have a confident answer" response with Yes/No buttons.
3. Click "Yes, create issue" — should trigger the `confirm` flow and create a Pylon issue (check your Pylon dashboard).

- [ ] **Step 3: Write the service README**

Create `services/chatbot-api/README.md`:

````markdown
# chatbot-api

Node.js Express service powering the Scalekit docs chatbot.

## Setup

\```bash
npm install
cp .env.example .env

# Fill in ANTHROPIC_API_KEY and PYLON_API_TOKEN in .env

\```

## Run

\```bash
npm run dev # development with hot reload
npm start # production
\```

## Environment variables

| Variable            | Required | Description                                                         |
| ------------------- | -------- | ------------------------------------------------------------------- |
| `ANTHROPIC_API_KEY` | Yes      | Anthropic API key                                                   |
| `PYLON_API_TOKEN`   | Yes      | Pylon API Bearer token                                              |
| `DOCS_BASE_URL`     | No       | Docs URL for llms.txt fetching (default: https://docs.scalekit.com) |
| `PYLON_API_URL`     | No       | Pylon API base URL (default: https://api.usepylon.com)              |
| `PORT`              | No       | Port to listen on (default: 3001)                                   |

## Endpoints

- `GET /health` — health check
- `POST /api/chat` — send a message (SSE stream)
- `POST /api/chat/confirm` — confirm a pending tool action

## Passing user context

Set headers on requests from identified surfaces:

\```
x-user-id: jane@acme.com
x-org-id: org_acme
x-is-admin: false
\```

## Swapping the widget UI

The docs site widget (`src/components/chatbot/ChatbotWidget.astro`) currently uses
`AgentTerminal`. Once agentboard's `ChatBubble` variant is complete, replace the
import and component in that file — no changes to this service needed.
````

- [ ] **Step 4: Final commit**

```bash
git add services/chatbot-api/README.md
git commit -m "docs(chatbot-api): add README with setup and env documentation"
```

---

## Self-review notes

**Spec coverage check:**

- ✅ Custom-built with Claude API (agentboard + Anthropic SDK)
- ✅ search_docs tool using llms.txt custom sets (Tasks 2–4)
- ✅ create_pylon_issue with requiresConfirmation (Task 5)
- ✅ AgentRunner configured with Haiku model (Task 6)
- ✅ Anonymous + identified user modes (Task 6 headers, Task 7 ScalekitChat.identify)
- ✅ Widget integrated into Starlight Head.astro (Task 7)
- ✅ Thumbs-down triggering issue offer: handled by system prompt instruction to Claude + confirmation tool flow
- ⚠️ **llms.txt URL paths**: The `SLUG_TO_PATH` map in Task 3 uses assumed paths. Implementer must verify against the live docs site before deployment (step noted in Task 3).
- ⚠️ **Pylon API endpoint format**: Task 5 uses `POST /issues` on `api.usepylon.com`. Implementer must verify against Pylon's actual API docs.

**Out of scope for Plan A** (covered in Plans B and C):

- Pylon webhook listener and gap analyzer
- PR drafter agent
- Slack bot
