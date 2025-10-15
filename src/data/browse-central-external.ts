export interface ExternalResource {
  title: string
  label?: string // Display label override
  url: string
  filterType: Array<'code-sample' | 'integration' | 'tutorial' | 'reference'>
  category: string[]
  icon?: string
  description?: string
}

export const externalResources: ExternalResource[] = [
  // Full-Stack Auth Examples
  {
    title: 'Next.js Full-Stack Auth',
    url: 'https://github.com/scalekit-inc/nextjs-example-apps/tree/main/full-stack-auth',
    filterType: ['code-sample'],
    category: ['Start Here', 'Core Authentication'],
    icon: 'nextjs',
    description: 'Complete React authentication flow with hosted login and session management',
  },
  {
    title: 'Next.js Demo Application',
    url: 'https://github.com/scalekit-developers/scalekit-nextjs-demo',
    filterType: ['code-sample'],
    category: ['Start Here', 'Core Authentication'],
    icon: 'nextjs',
    description: 'Comprehensive Next.js demo showcasing Scalekit authentication features',
  },
  {
    title: 'Express.js Example',
    url: 'https://github.com/scalekit-developers/scalekit-express-example',
    filterType: ['code-sample'],
    category: ['Core Authentication'],
    icon: 'express',
    description: 'Node.js authentication with session management and middleware',
  },
  {
    title: 'Spring Boot Example',
    url: 'https://github.com/scalekit-developers/scalekit-springboot-example',
    filterType: ['code-sample'],
    category: ['Core Authentication'],
    icon: 'springboot',
    description: 'Java enterprise authentication with Spring Security integration',
  },
  {
    title: 'FastAPI Example',
    url: 'https://github.com/scalekit-developers/scalekit-fastapi-example',
    filterType: ['code-sample'],
    category: ['Core Authentication'],
    icon: 'python',
    description: 'Python async authentication with modern API patterns',
  },
  {
    title: 'Go Example Application',
    url: 'https://github.com/scalekit-developers/scalekit-go-example',
    filterType: ['code-sample'],
    category: ['Core Authentication'],
    icon: 'go',
    description: 'Lightweight authentication server with Gin framework',
  },

  // SSO Integration Examples
  {
    title: 'Express.js SSO Demo',
    url: 'https://github.com/scalekit-inc/nodejs-example-apps/tree/main/sso-express-example',
    filterType: ['code-sample'],
    category: ['Enterprise Features'],
    icon: 'express',
    description: 'Single Sign-On implementation using Express.js',
  },
  {
    title: 'SSO Migrations Example',
    url: 'https://github.com/scalekit-inc/nodejs-example-apps/tree/main/sso-migrations-express-example',
    filterType: ['code-sample', 'tutorial'],
    category: ['Enterprise Features'],
    icon: 'migrate',
    description: 'Guide for handling SSO migrations and authentication system transitions',
  },
  {
    title: 'Express.js Login Box',
    url: 'https://github.com/scalekit-inc/nodejs-example-apps/tree/main/expressjs-loginbox-authn',
    filterType: ['code-sample'],
    category: ['Core Authentication'],
    icon: 'express',
    description: 'Authentication example using Express.js with login box implementation',
  },
  {
    title: 'Managed Login Box Demo',
    url: 'https://github.com/scalekit-developers/managed-loginbox-expressjs-demo',
    filterType: ['code-sample'],
    category: ['Core Authentication'],
    icon: 'express',
    description: 'Express.js app with Scalekit hosted authentication UI',
  },
  {
    title: 'OIDC, SAML & SCIM Examples',
    url: 'https://github.com/scalekit-developers/oidc-saml-scim-examples',
    filterType: ['code-sample'],
    category: ['Enterprise Features'],
    icon: 'python',
    description: 'Python integration patterns for Google, Okta and other providers',
  },
  {
    title: '.NET Core Examples',
    url: 'https://github.com/scalekit-inc/dotnet-example-apps',
    filterType: ['code-sample'],
    category: ['Enterprise Features'],
    icon: 'code',
    description: '.NET Core SAML and OIDC implementation samples',
  },

  // Integration with Auth Systems
  {
    title: 'Firebase Integration',
    url: 'https://github.com/scalekit-inc/scalekit-firebase-sso',
    filterType: ['code-sample', 'integration'],
    category: ['Social & Integrations'],
    icon: 'code',
    description: 'Firebase authentication integration with Scalekit SSO',
  },
  {
    title: 'Firebase Example (Node.js)',
    url: 'https://github.com/scalekit-inc/nodejs-example-apps/tree/main/firebase-example',
    filterType: ['code-sample'],
    category: ['Social & Integrations'],
    icon: 'nodejs',
    description: 'Node.js Firebase integration example',
  },
  {
    title: 'AWS Cognito Integration',
    url: 'https://github.com/scalekit-inc/scalekit-cognito-sso',
    filterType: ['code-sample', 'integration'],
    category: ['Social & Integrations'],
    icon: 'code',
    description: 'AWS Cognito SSO integration with OpenID Connect',
  },
  {
    title: 'Cognito with Next.js',
    url: 'https://github.com/scalekit-inc/nextjs-example-apps/tree/main/cognito-scalekit',
    filterType: ['code-sample'],
    category: ['Social & Integrations'],
    icon: 'nextjs',
    description: 'AWS Cognito with Scalekit SSO using Next.js and OIDC protocol',
  },

  // M2M Authentication
  {
    title: 'M2M Code Samples',
    url: 'https://github.com/scalekit-inc/gists/tree/main/m2m',
    filterType: ['code-sample', 'reference'],
    category: ['SDKs & Development Tools'],
    icon: 'code',
    description: 'Essential code snippets for machine-to-machine authentication',
  },

  // Agent Actions
  {
    title: 'LangChain Integration',
    url: 'https://github.com/scalekit-inc/sample-langchain-agent',
    filterType: ['code-sample'],
    category: ['SDKs & Development Tools'],
    icon: 'python',
    description: 'Agent Connect integration with LangChain for AI workflows',
  },
  {
    title: 'Google ADK Integration',
    url: 'https://github.com/scalekit-inc/google-adk-agent-example',
    filterType: ['code-sample'],
    category: ['SDKs & Development Tools'],
    icon: 'code',
    description: 'Google ADK agent integration with Scalekit',
  },
  {
    title: 'Direct Integration',
    url: 'https://github.com/scalekit-inc/python-connect-demos/tree/main/direct',
    filterType: ['code-sample'],
    category: ['SDKs & Development Tools'],
    icon: 'python',
    description: 'Direct integration examples for Scalekit Agent Actions',
  },

  // MCP Authentication
  {
    title: 'MCP Auth Demos',
    url: 'https://github.com/scalekit-inc/mcp-auth-demos',
    filterType: ['code-sample'],
    category: ['SDKs & Development Tools'],
    icon: 'code',
    description: 'Model Context Protocol authentication examples and patterns',
  },

  // Advanced Features
  {
    title: 'Admin Portal Embedding',
    url: 'https://github.com/scalekit-inc/nodejs-example-apps/tree/main/embed-admin-portal-sample',
    filterType: ['code-sample', 'tutorial'],
    category: ['Customization'],
    icon: 'nodejs',
    description: 'OAuth 2.0 client credentials flow with embedded admin portal',
  },
  {
    title: 'Webhook Events',
    url: 'https://github.com/scalekit-inc/nextjs-example-apps/tree/main/webhook-events',
    filterType: ['code-sample', 'tutorial'],
    category: ['Customization'],
    icon: 'nextjs',
    description: 'Setting up webhook endpoints and processing ScaleKit user events',
  },

  // Development Tools
  {
    title: 'Code Gists Collection',
    url: 'https://github.com/scalekit-inc/gists',
    filterType: ['code-sample', 'reference'],
    category: ['SDKs & Development Tools'],
    icon: 'code',
    description: 'Essential code snippets for building applications with Scalekit API',
  },
  {
    title: 'API Collections',
    url: 'https://github.com/scalekit-inc/api-collections',
    filterType: ['reference'],
    category: ['SDKs & Development Tools'],
    icon: 'progress',
    description: 'Postman and Bruno API testing collections for development',
  },

  // SDKs
  {
    title: 'Node.js SDK',
    url: 'https://github.com/scalekit-inc/scalekit-sdk-node',
    filterType: ['reference'],
    category: ['SDKs & Development Tools'],
    icon: 'nodejs',
    description: 'TypeScript/JavaScript SDK for SAML and OIDC Single Sign-On',
  },
  {
    title: 'Python SDK',
    url: 'https://github.com/scalekit-inc/scalekit-sdk-python',
    filterType: ['reference'],
    category: ['SDKs & Development Tools'],
    icon: 'python',
    description: 'Python SDK with FastAPI, Django, and Flask integration support',
  },
  {
    title: 'Java SDK',
    url: 'https://github.com/scalekit-inc/scalekit-sdk-java',
    filterType: ['reference'],
    category: ['SDKs & Development Tools'],
    icon: 'java',
    description: 'Java SDK for enterprise authentication with Spring Boot integration',
  },
  {
    title: 'Go SDK',
    url: 'https://github.com/scalekit-inc/scalekit-sdk-go',
    filterType: ['reference'],
    category: ['SDKs & Development Tools'],
    icon: 'go',
    description: 'Go SDK for SAML and OIDC Single Sign-On integration',
  },
]
