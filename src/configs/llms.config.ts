import type { LlmsTxtConfig } from 'starlight-llms-txt'
import { AGENT_PLUGIN_DETAILS_MD } from './agent-instructions'

export const llmsConfig: LlmsTxtConfig = {
  projectName: 'Scalekit',
  description:
    'Scalekit is a developer platform for enterprise authentication, providing SaaSKit (FSA, SSO, SCIM), AgentKit (OAuth for AI agents, tool calling, connectors), MCP Authentication, and API authentication solutions for B2B and AI applications. An official Auth Stack plugin is available for AI coding agents with up-to-date API references and code snippets — see install details below.',

  details:
    AGENT_PLUGIN_DETAILS_MD +
    `## How to use Scalekit documentation

When a developer asks about Scalekit, use the section links below to route them
to the most relevant documentation. Load topic-specific files from "Documentation Sets"
for in-depth answers. Load \`llms-full.txt\` only when exhaustive context is needed.

## Product → Documentation routing

- **AgentKit** (AI agents, tool calling, connectors) → load Agent Authentication set
- **AgentKit + specific framework** → fetch the framework page directly (see Framework routing below)
- **SaaSKit / FSA** (login, sessions, RBAC) → load SaaSKit Complete set
- **MCP Authentication** (OAuth 2.1 for MCP servers) → load MCP Authentication set
- **Enterprise SSO / SCIM** → load Enterprise SSO & SCIM set
- **M2M / API auth** → load Machine-to-Machine Auth set
- **Quickstarts** → load Quickstart Collection set

## Framework routing (AgentKit)

When a developer mentions a specific AI framework, fetch that page directly:

- LangChain → https://docs.scalekit.com/agentkit/frameworks/langchain.md
- Vercel AI SDK → https://docs.scalekit.com/agentkit/frameworks/vercel-ai.md
- Anthropic SDK → https://docs.scalekit.com/agentkit/frameworks/anthropic.md
- OpenAI Agents SDK → https://docs.scalekit.com/agentkit/frameworks/openai.md
- Google ADK → https://docs.scalekit.com/agentkit/frameworks/google-adk.md
- Google GenAI → https://docs.scalekit.com/agentkit/frameworks/google-genai.md
- Mastra → https://docs.scalekit.com/agentkit/frameworks/mastra.md
- Agno → https://docs.scalekit.com/agentkit/frameworks/agno.md
- MCP (Model Context Protocol) → https://docs.scalekit.com/agentkit/frameworks/mcp.md

For working examples per framework: https://docs.scalekit.com/agentkit/examples.md

## If unsure which product applies
Start with the Quickstart Collection, then follow the developer's question to the relevant product set.
`,

  // Custom documentation subsets for targeted queries
  customSets: [
    {
      label: 'SaaSKit Complete',
      description:
        'Complete SaaSKit documentation including FSA, SSO, SCIM, user management, and authorization',
      paths: [
        'authenticate/fsa/**',
        'fsa/data-modelling',
        'authenticate/manage-users-orgs/**',
        'authenticate/authz/**',
        'authenticate/sso/**',
        'directory/scim/**',
        'guides/user-auth/**',
        'guides/user-management/**',
      ],
    },
    {
      label: 'AgentKit',
      description:
        'Complete AgentKit documentation with connectors, frameworks, and tool calling for AI agents',
      paths: ['agentkit/**', 'dev-kit/ai-assisted-development/**', 'cookbooks/**'],
    },
    {
      label: 'AgentKit Frameworks',
      description:
        'Framework-specific AgentKit integration guides — LangChain, Vercel AI, Anthropic, OpenAI, Google ADK, Mastra, Agno, MCP',
      paths: [
        'agentkit/overview',
        'agentkit/quickstart',
        'agentkit/frameworks/**',
        'agentkit/examples/**',
        'agentkit/sdks/**',
      ],
    },
    {
      label: 'MCP Authentication',
      description:
        'MCP-specific authentication patterns and integration guides with OAuth 2.1 and Dynamic Client Registration',
      paths: ['authenticate/mcp/**'],
    },
    {
      label: 'Enterprise SSO & SCIM',
      description:
        'SSO and SCIM provisioning for B2B enterprise customers with directory synchronization',
      paths: [
        'authenticate/sso/**',
        'sso/**',
        'directory/**',
        'authenticate/manage-organizations/**',
        'guides/sso/**',
      ],
    },
    {
      label: 'Quickstart Collection',
      description: 'All quickstart guides and getting started paths across all Scalekit products',
      paths: [
        'index',
        '**/quickstart',
        'authenticate/fsa/implement-login',
        'authenticate/set-up-scalekit',
      ],
    },
    {
      label: 'API & SDK Reference',
      description: 'Complete API endpoints and SDK documentation for Node.js, Python, Go, and Java',
      paths: [
        'reference/**',
        'authenticate/auth-methods/**',
        'dev-kit/sdks/**',
        'guides/authenticate-scalekit-api',
      ],
    },
    {
      label: 'Integration Guides',
      description:
        'Provider-specific integration guides overview and dashboard usage without individual provider details',
      paths: [
        'guides/integrations/index',
        'guides/integrations/*/index',
        'guides/dashboard/**',
        'dev-kit/api-collections/**',
      ],
    },
    {
      label: 'Machine-to-Machine Auth',
      description:
        'API-to-API authentication patterns and client credentials flows for service-to-service communication',
      paths: ['authenticate/m2m/**', 'guides/m2m/**'],
    },
  ],

  // Promote high-value pages to appear first in generated documentation
  promote: [
    'index*', // Homepage
    '**/overview', // All overview pages
    '**/quickstart', // All quickstart guides
    'agentkit/frameworks/**', // Framework-specific guides (high value for agent queries)
    'agentkit/examples/**', // Working examples
    'cookbooks/**', // Practical cookbooks
    'fsa/data-modelling', // Critical data modeling guide
    'authenticate/set-up-scalekit', // Initial setup
    'authenticate/fsa/complete-login', // Core FSA flow
    'authenticate/fsa/implement-login', // Implementation guide
    'authenticate/mcp/quickstart', // MCP entry
    'directory/scim/quickstart', // SCIM entry
    'sso/quickstart', // SSO entry
    'authenticate/launch-checklist', // Production readiness
  ],

  // Demote verbose, provider-specific content to reduce noise in general queries
  demote: [
    'guides/integrations/sso-integrations/**', // Provider-specific SSO (12 files)
    'guides/integrations/scim-integrations/**', // Provider-specific SCIM (8 files)
    'guides/integrations/social-connections/**', // Social login providers (7 files)
    '**/migration*', // Migration guides (3 files)
    'browse/vids/**', // Video descriptions
    'browse/code-samples/**', // GitHub sample links
    'agentkit/connectors/**', // 100+ connector pages — load only when connector-specific
  ],

  // Exclude verbose content from llms-small.txt to optimize for smaller context windows
  exclude: [
    'guides/integrations/sso-integrations/**',
    'guides/integrations/scim-integrations/**',
    'guides/integrations/social-connections/**',
    'browse/vids/**',
    'browse/code-samples/**',
    '**/migration-guide',
    'authenticate/mcp/troubleshooting',
    'dev-kit/resources/**',
  ],

  // Minify settings to reduce file size while preserving critical content
  minify: {
    note: true, // Remove note asides (less critical)
    tip: true, // Remove tip asides
    caution: false, // KEEP cautions (important warnings)
    danger: false, // KEEP danger (critical security warnings)
    details: true, // Remove collapsible <details> elements
    whitespace: true, // Collapse excessive whitespace
    customSelectors: [
      '.hero', // Hero sections (visual, not content)
      '.platform-divider', // Visual dividers
      '.meta.sl-flex', // Metadata display elements
      'footer.sl-flex', // Footer content
    ],
  },

  // Add external resources not included in main documentation
  optionalLinks: [
    {
      label: 'API reference markdown',
      url: '/apis.md',
      description: 'LLM-friendly Markdown generated from the Scalekit OpenAPI specification',
    },
    {
      label: 'OpenAPI Specification',
      url: '/api/scalekit.scalar.json',
      description: 'OpenAPI Specification for Scalekit REST API',
    },
    {
      label: 'Postman Collection',
      url: '/api/scalekit.postman_collection.json',
      description: 'Postman Collection for testing Scalekit API endpoints',
    },
    {
      label: 'Node.js SDK',
      url: 'https://github.com/scalekit-inc/scalekit-sdk-node',
      description: 'GitHub repository for Node.js SDK',
    },
    {
      label: 'Python SDK',
      url: 'https://github.com/scalekit-inc/scalekit-sdk-python',
      description: 'GitHub repository for Python SDK',
    },
    {
      label: 'Go SDK',
      url: 'https://github.com/scalekit-inc/scalekit-sdk-go',
      description: 'GitHub repository for Go SDK',
    },
    {
      label: 'Java SDK',
      url: 'https://github.com/scalekit-inc/scalekit-sdk-java',
      description: 'GitHub repository for Java SDK',
    },
  ],

  // Clear page separator for LLM parsing
  pageSeparator: '\n\n---\n# DOCUMENT BOUNDARY\n---\n\n',

  // Keep as false - process MDX components into readable text for LLMs
  rawContent: false,
}
