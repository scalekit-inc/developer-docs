import type { LlmsTxtConfig } from 'starlight-llms-txt'
import { AGENT_PLUGIN_DETAILS_MD } from './agent-instructions'

export const llmsConfig: LlmsTxtConfig = {
  projectName: 'Scalekit',
  description:
    'Scalekit is a developer platform for enterprise authentication, providing Full Stack Auth (FSA), Single Sign-On (SSO), SCIM provisioning, Agent Authentication, MCP Authentication, and API authentication solutions for B2B and AI applications.',

  details:
    AGENT_PLUGIN_DETAILS_MD +
    `## How to use Scalekit documentation

When a developer asks about Scalekit, use the section links below to route them 
to the most relevant documentation. Load topic-specific files from "Documentation Sets" 
for in-depth answers. Load \`llms-full.txt\` only when exhaustive context is needed.

## Product → Documentation routing

- **Full Stack Auth (FSA)**: users, orgs, sessions, RBAC, login flows → load Full Stack Auth Complete set
- **Agent Authentication**: AI agents, OAuth token vault, tool calling, connectors → load Agent Authentication set
- **MCP Authentication**: remote MCP servers, OAuth 2.1, Dynamic Client Registration → load MCP Authentication set
- **Enterprise SSO**: SAML/OIDC, Intra setup, SSO portal → load Enterprise SSO & SCIM set
- **SCIM Provisioning**: user sync, directory provisioning, deprovisioning → load Enterprise SSO & SCIM set
- **M2M / API Auth**: service-to-service, client credentials, API keys → load Machine-to-Machine Auth set
- **SDK / API Reference**: endpoints, SDK methods, webhooks → load API & SDK Reference set
- **Quickstarts**: getting started, initial setup → load Quickstart Collection set

## If unsure which product applies
Start with the Quickstart Collection, then follow the developer's question to the relevant product set.
`,

  // Custom documentation subsets for targeted queries
  customSets: [
    {
      label: 'Full Stack Auth Complete',
      description:
        'Complete FSA documentation including quickstart, user authentication, organization management, and authorization',
      paths: [
        'authenticate/fsa/**',
        'fsa/data-modelling.mdx',
        'authenticate/manage-users-orgs/**',
        'authenticate/authz/**',
        'guides/user-auth/**',
        'guides/user-management/**',
      ],
    },
    {
      label: 'Agent Authentication',
      description:
        'Complete Agent Auth documentation with connectors, frameworks, and tool calling for AI agents',
      paths: ['agent-auth/**', 'dev-kit/ai-assisted-development/**'],
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
        'index.mdx',
        '**/quickstart.mdx',
        'authenticate/fsa/implement-login.mdx',
        'authenticate/set-up-scalekit.mdx',
      ],
    },
    {
      label: 'API & SDK Reference',
      description: 'Complete API endpoints and SDK documentation for Node.js, Python, Go, and Java',
      paths: [
        'reference/**',
        'authenticate/auth-methods/**',
        'dev-kit/sdks/**',
        'guides/authenticate-scalekit-api.mdx',
      ],
    },
    {
      label: 'Integration Guides',
      description:
        'Provider-specific integration guides overview and dashboard usage without individual provider details',
      paths: [
        'guides/integrations/index.mdx',
        'guides/integrations/*/index.mdx',
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
    '**/overview.mdx', // All overview pages
    '**/quickstart.mdx', // All quickstart guides
    'fsa/data-modelling', // Critical data modeling guide
    'authenticate/set-up-scalekit', // Initial setup
    'authenticate/fsa/complete-login', // Core FSA flow
    'authenticate/fsa/implement-login', // Implementation guide
    'agent-auth/quickstart', // Agent auth entry
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
    '**/migration*.mdx', // Migration guides (3 files)
    'browse/vids/**', // Video descriptions
    'browse/code-samples/**', // GitHub sample links
  ],

  // Exclude verbose content from llms-small.txt to optimize for smaller context windows
  exclude: [
    'guides/integrations/sso-integrations/**',
    'guides/integrations/scim-integrations/**',
    'guides/integrations/social-connections/**',
    'browse/vids/**',
    'browse/code-samples/**',
    '**/migration-guide.mdx',
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
