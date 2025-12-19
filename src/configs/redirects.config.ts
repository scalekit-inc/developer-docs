export const redirects = {
  // =============================================================================
  // HOMEPAGE REDIRECT
  // =============================================================================
  // '/': '/authenticate/welcome',
  '/authenticate': '/',

  // =============================================================================
  // FULL STACK AUTH (FSA) REDIRECTS
  // =============================================================================

  // User authentication flow pages moved to /authenticate/*
  '/fsa/quickstart': '/authenticate/fsa/quickstart/',
  '/fsa/guides/implement-login': '/authenticate/fsa/implement-login/',
  '/fsa/guides/implement-signup': '/authenticate/fsa/implement-login/',
  '/fsa/guides/manage-session': '/authenticate/fsa/manage-session/',
  '/fsa/guides/logout': '/authenticate/fsa/logout/',
  '/fsa/guides/automated-user-provisioning': '/authenticate/manage-users-orgs/email-domain-rules/',
  '/fsa/guides/signup-restrictions': '/authenticate/manage-users-orgs/email-domain-rules/',
  '/fsa/guides/allowed-email-domains': '/authenticate/manage-users-orgs/email-domain-rules/',
  '/fsa/guides/merge-identities': '/authenticate/manage-users-orgs/merge-identities/',
  '/fsa/guides/onboard-enterprise-customers': '/sso/guides/onboard-enterprise-customers/',
  '/fsa/guides/enterprise-sso/': '/authenticate/auth-methods/enterprise-sso/',
  '/fsa/guides/auth-methods/': '/authenticate/auth-methods/passwordless/',
  '/fsa/guides/social-logins/': '/authenticate/auth-methods/social-logins/',
  '/fsa/reference/user-profile/': '/authenticate/manage-users-orgs/custom-user-attributes/',

  // =============================================================================
  // SINGLE SIGN-ON (SSO) REDIRECTS
  // =============================================================================

  // SSO quickstart and admin portal
  '/sso/quickstart': '/authenticate/sso/add-modular-sso/',
  '/sso/quickstart-admin-portal': '/guides/admin-portal',
  '/sso/overview': '/guides/sso/sso-basics/',
  '/sso/launch-checklist': '/guides/sso/launch-checklist/',
  '/sso/test-sso': '/guides/sso/test-sso/',
  '/sso/domain-and-theme-customization': '/guides/custom-domain/',
  '/sso/bkp/quickstart-admin-portal': '/guides/admin-portal/',
  '/guides/sso/admin-portal': '/guides/admin-portal/',

  // SSO legacy guides moved from /guides to /sso
  '/guides/sso/sso-basics/': '/sso/guides/sso-basics/',
  '/guides/sso/test-sso/': '/sso/guides/test-sso/',
  '/guides/sso/launch-checklist/': '/sso/guides/launch-checklist/',
  '/guides/sso/add-login-ux-sso/': '/sso/guides/add-login-ux-sso/',
  '/guides/sso/idp-init-sso/': '/sso/guides/idp-init-sso/',
  '/guides/sso/okta-sso-test/': '/sso/guides/okta-sso-test/',
  '/guides/sso/sso-user-attributes/': '/sso/guides/sso-user-attributes/',
  '/guides/sso/authorization-url/': '/sso/guides/authorization-url/',
  '/guides/sso/user-profile-details/': '/sso/guides/user-profile-details/',

  // SSO setup and key concepts
  '/sso/guides/setup-sso/implement-idp-initiated-sso': '/sso/guides/idp-init-sso/',
  '/sso/guides/setup-sso/handle-user-profile': '/sso/guides/sso-user-attributes/',
  '/sso/guides/setup-sso/build-login-page': '/sso/quickstart/',
  '/sso/guides/setup-sso/customize-user-attributes': '/sso/guides/sso-user-attributes/',
  '/sso/guides/key-concepts/authorization-url': '/sso/guides/authorization-url/',
  '/sso/guides/key-concepts/redirect-uri': '/guides/dashboard/redirects/',
  '/sso/guides/key-concepts/idtoken-claims': '/guides/idtoken-claims/',
  '/sso/guides/key-concepts/manage-client-secrets': '/guides/client-credentials-practices/',
  '/sso/guides/key-concepts/user-profile': '/sso/guides/user-profile-details/',
  '/sso/guides/test-your-integration/using-okta': '/sso/guides/test-sso/',
  '/sso/guides/okta-sso-test/': '/sso/guides/test-sso/',
  '/sso/reference/redirects': '/guides/dashboard/redirects/',

  // SSO integrations with auth systems
  '/sso/guides/integrate-with-your-auth-system/firebase':
    '/guides/integrations/auth-systems/firebase/',
  '/sso/guides/integrate-with-your-auth-system/auth0': '/guides/integrations/auth-systems/auth0/',

  // SSO social logins - moved to authenticate/auth-methods/social-logins
  '/sso/social-login': '/authenticate/auth-methods/social-logins/',
  '/sso/social-logins-quickstart': '/authenticate/auth-methods/social-logins/',
  '/social-logins': '/authenticate/auth-methods/social-logins/',
  '/social-logins/quickstart': '/authenticate/auth-methods/social-logins/',

  // SSO reference and errors
  '/reference/errors': '/sso/reference/sso-integration-errors/',
  '/reference/sso/sso-integration-errors/': '/sso/reference/sso-integration-errors/',
  '/reference/redirects/': '/guides/dashboard/redirects/',

  // Best practices
  '/best-practices/redirect-uri': '/guides/dashboard/redirects/',
  '/best-practices/manage-client-secrets': '/guides/client-credentials-practices/',

  // =============================================================================
  // MANAGE USERS & ORGANIZATIONS REDIRECTS
  // =============================================================================

  // User and organization management files reorganized
  '/fsa/guides/create-organization': '/authenticate/manage-users-orgs/create-organization/',
  '/fsa/guides/custom-user-attributes': '/authenticate/manage-users-orgs/custom-user-attributes/',
  '/authenticate/manage-users-orgs/delete-users-orgs':
    '/authenticate/manage-users-orgs/delete-users-and-organizations/',
  'fsa/guides/app-roles': '/authenticate/authz/create-roles-permissions/',

  // =============================================================================
  // SCIM / DIRECTORY PROVISIONING REDIRECTS
  // =============================================================================

  // SCIM legacy paths
  '/scim/quickstart': '/directory/scim/quickstart/',
  '/scim/checklist': '/guides/directory/admin-portal/',
  '/scim/basics': '/guides/directory/user-provisioning-basics/',
  '/scim/scim-protocol': '/guides/directory/scim-protocol/',
  '/scim/webhooks': '/reference/webhooks/directory-events/',
  '/scim/automatically-assign-roles': '/guides/directory/group-based-role-assignment/',
  '/scim/map-user-attributes': '/guides/directory/user-provisioning-basics/',
  '/scim/listen-directory-events': '/reference/webhooks/directory-events/',
  '/scim/gbac': '/guides/directory/group-based-role-assignment/',
  '/scim/explore-sample-apps': '/directory/code-examples/',
  '/scim/domain-and-theme-customization': '/guides/custom-domain/',
  '/scim/in-product-quickstart': '/directory/scim/quickstart/',

  // SCIM guides moved from /guides/directory to /directory/guides
  '/guides/directory/launch-checklist': '/directory/guides/launch-checklist',
  '/guides/directory/group-based-role-assignment': '/directory/guides/group-based-role-assignment',
  '/guides/directory/admin-portal': '/directory/guides/admin-portal',
  '/guides/directory/user-provisioning-basics': '/directory/guides/user-provisioning-basics',
  '/guides/directory/scim-protocol': '/directory/guides/scim-protocol',

  // =============================================================================
  // AUTH FLOW INTERCEPTORS REDIRECTS
  // =============================================================================

  // Auth flow interceptors moved to /authenticate/interceptors/
  '/guides/auth-flow-interceptors': '/authenticate/interceptors/auth-flow-interceptors/',
  '/guides/interceptor-scenarios': '/authenticate/interceptors/auth-flow-interceptors/',
  '/authenticate/interceptors/interceptor-scenarios/':
    '/authenticate/interceptors/auth-flow-interceptors/',

  // =============================================================================
  // MODULES TERMINOLOGY REDIRECTS
  // =============================================================================
  '/guides/user-auth/standalone-social-logins': '/guides/user-auth/modular-social-logins',

  // =============================================================================
  // MAGIC LINK & OTP AUTH REDIRECTS
  // =============================================================================
  '/guides/passwordless/quickstart': '/passwordless/quickstart',
  '/guides/passwordless/oidc': '/passwordless/oidc',
  '/guides/passwordless/overview': '/passwordless/overview',
  '/guides/passwordless/custom-email-templates': '/guides/dashboard/custom-email-templates',

  // =============================================================================
  // MCP AUTH REDIRECTS
  // =============================================================================

  // Core MCP pages moved to /authenticate/mcp/
  '/mcp/quickstart': '/authenticate/mcp/quickstart/',
  '/mcp/overview': '/authenticate/mcp/overview/',
  '/mcp/intro-to-mcp-auth': '/authenticate/mcp/intro-to-mcp-auth/',
  '/mcp/troubleshooting': '/authenticate/mcp/troubleshooting/',

  // MCP guides moved to /authenticate/mcp/
  '/guides/mcp/overview': '/authenticate/mcp/intro-to-mcp-auth/',
  '/guides/mcp/oauth': '/authenticate/mcp/quickstart/',
  '/mcp/oauth': '/authenticate/mcp/quickstart/',
  '/guides/mcp/additional-reading': '/authenticate/mcp/additional-reading/',
  '/mcp/guides/additional-reading': '/authenticate/mcp/additional-reading/',

  // MCP topology pages moved to /authenticate/mcp/topologies/
  '/mcp/topologies/human-mcp': '/authenticate/mcp/topologies/human-mcp/',
  '/mcp/topologies/agent-mcp': '/authenticate/mcp/topologies/agent-mcp/',
  '/mcp/topologies/mcp-api': '/authenticate/mcp/topologies/mcp-api/',
  '/mcp/topologies/': '/authenticate/mcp/topologies/human-mcp/',

  // MCP integration examples already at /authenticate/mcp/ (keep existing redirects)
  '/mcp/managing-mcp-clients': '/authenticate/mcp/managing-mcp-clients/',
  '/mcp/integrations/fastmcp': '/authenticate/mcp/fastmcp-quickstart/',
  '/browse/code-samples/github/mcp/fastmcp': '/authenticate/mcp/fastmcp-quickstart/',
  '/mcp/fastmcp-quickstart': '/authenticate/mcp/fastmcp-quickstart/',
  '/mcp/integrations/fastapi-fastmcp': '/authenticate/mcp/fastapi-fastmcp-quickstart/',
  '/browse/code-samples/github/mcp/fastapi-fastmcp':
    '/authenticate/mcp/fastapi-fastmcp-quickstart/',
  '/mcp/fastapi-fastmcp': '/authenticate/mcp/fastapi-fastmcp-quickstart/',
  '/mcp/fastapi-fastmcp-quickstart': '/authenticate/mcp/fastapi-fastmcp-quickstart/',
  '/mcp/integrations/expressjs': '/authenticate/mcp/expressjs-quickstart/',
  '/browse/code-samples/github/mcp/expressjs': '/authenticate/mcp/expressjs-quickstart/',
  '/mcp/expressjs': '/authenticate/mcp/expressjs-quickstart/',
  '/mcp/expressjs-quickstart': '/authenticate/mcp/expressjs-quickstart/',

  // =============================================================================
  // AGENT AUTH REDIRECTS
  // =============================================================================
  // Agent Actions rebranded to Agent Auth (preserve all legacy URLs)
  //
  // Notes (Astro routing):
  // - File-based routes take precedence over redirects.
  // - Prefer a single dynamic redirect for 1:1 path renames.
  //
  // Redirects are handled via dynamic route endpoints in:
  // - src/pages/agent-actions/index.ts
  // - src/pages/agent-actions/[...slug].ts
  //
  // Explicit redirects below serve as fallback for common paths:
  // Main pages
  '/agent-actions': '/agent-auth/quickstart/',
  '/agent-actions/': '/agent-auth/quickstart/',
  '/agent-actions/overview': '/agent-auth/overview/',
  '/agent-actions/overview/': '/agent-auth/overview/',
  '/agent-actions/quickstart': '/agent-auth/quickstart/',
  '/agent-actions/quickstart/': '/agent-auth/quickstart/',
  '/agent-actions/providers': '/agent-auth/providers/',
  '/agent-actions/providers/': '/agent-auth/providers/',
  '/agent-actions/connections': '/agent-auth/connections/',
  '/agent-actions/connections/': '/agent-auth/connections/',
  '/agent-actions/connected-accounts': '/agent-auth/connected-accounts/',
  '/agent-actions/connected-accounts/': '/agent-auth/connected-accounts/',
  '/agent-actions/agentic-quickstart': '/agent-auth/agentic-quickstart/',
  '/agent-actions/agentic-quickstart/': '/agent-auth/agentic-quickstart/',

  // Authentication pages
  '/agent-actions/authentication/auth-flows-comparison': '/agent-auth/authentication/auth-flows-comparison/',
  '/agent-actions/authentication/auth-flows-comparison/': '/agent-auth/authentication/auth-flows-comparison/',
  '/agent-actions/authentication/multi-provider': '/agent-auth/authentication/multi-provider/',
  '/agent-actions/authentication/multi-provider/': '/agent-auth/authentication/multi-provider/',
  '/agent-actions/authentication/scopes-permissions': '/agent-auth/authentication/scopes-permissions/',
  '/agent-actions/authentication/scopes-permissions/': '/agent-auth/authentication/scopes-permissions/',
  '/agent-actions/authentication/testing-auth-flows': '/agent-auth/authentication/testing-auth-flows/',
  '/agent-actions/authentication/testing-auth-flows/': '/agent-auth/authentication/testing-auth-flows/',
  '/agent-actions/authentication/token-management': '/agent-auth/authentication/token-management/',
  '/agent-actions/authentication/token-management/': '/agent-auth/authentication/token-management/',
  '/agent-actions/authentication/troubleshooting': '/agent-auth/authentication/troubleshooting/',
  '/agent-actions/authentication/troubleshooting/': '/agent-auth/authentication/troubleshooting/',

  // Advanced pages
  '/agent-actions/advanced/bring-your-own-oauth': '/agent-auth/advanced/bring-your-own-oauth/',
  '/agent-actions/advanced/bring-your-own-oauth/': '/agent-auth/advanced/bring-your-own-oauth/',
  '/agent-actions/advanced/custom-domain': '/agent-auth/advanced/custom-domain/',
  '/agent-actions/advanced/custom-domain/': '/agent-auth/advanced/custom-domain/',
  '/agent-actions/advanced/overview': '/agent-auth/advanced/overview/',
  '/agent-actions/advanced/overview/': '/agent-auth/advanced/overview/',
  '/agent-actions/advanced/proxy-api-calls': '/agent-auth/advanced/proxy-api-calls/',
  '/agent-actions/advanced/proxy-api-calls/': '/agent-auth/advanced/proxy-api-calls/',

  // Frameworks pages
  '/agent-actions/frameworks/agno': '/agent-auth/frameworks/agno/',
  '/agent-actions/frameworks/agno/': '/agent-auth/frameworks/agno/',
  '/agent-actions/frameworks/anthropic': '/agent-auth/frameworks/anthropic/',
  '/agent-actions/frameworks/anthropic/': '/agent-auth/frameworks/anthropic/',
  '/agent-actions/frameworks/google-adk': '/agent-auth/frameworks/google-adk/',
  '/agent-actions/frameworks/google-adk/': '/agent-auth/frameworks/google-adk/',
  '/agent-actions/frameworks/google-genai': '/agent-auth/frameworks/google-genai/',
  '/agent-actions/frameworks/google-genai/': '/agent-auth/frameworks/google-genai/',
  '/agent-actions/frameworks/langchain': '/agent-auth/frameworks/langchain/',
  '/agent-actions/frameworks/langchain/': '/agent-auth/frameworks/langchain/',
  '/agent-actions/frameworks/mastra': '/agent-auth/frameworks/mastra/',
  '/agent-actions/frameworks/mastra/': '/agent-auth/frameworks/mastra/',
  '/agent-actions/frameworks/mcp': '/agent-auth/frameworks/mcp/',
  '/agent-actions/frameworks/mcp/': '/agent-auth/frameworks/mcp/',
  '/agent-actions/frameworks/openai': '/agent-auth/frameworks/openai/',
  '/agent-actions/frameworks/openai/': '/agent-auth/frameworks/openai/',
  '/agent-actions/frameworks/vercel-ai': '/agent-auth/frameworks/vercel-ai/',
  '/agent-actions/frameworks/vercel-ai/': '/agent-auth/frameworks/vercel-ai/',

  // MCP pages
  '/agent-actions/mcp/quickstart': '/agent-auth/mcp/quickstart/',
  '/agent-actions/mcp/quickstart/': '/agent-auth/mcp/quickstart/',

  // Tools pages
  '/agent-actions/tools/authorize': '/agent-auth/tools/authorize/',
  '/agent-actions/tools/authorize/': '/agent-auth/tools/authorize/',
  '/agent-actions/tools/custom-processors': '/agent-auth/tools/custom-processors/',
  '/agent-actions/tools/custom-processors/': '/agent-auth/tools/custom-processors/',
  '/agent-actions/tools/custom-tools': '/agent-auth/tools/custom-tools/',
  '/agent-actions/tools/custom-tools/': '/agent-auth/tools/custom-tools/',
  '/agent-actions/tools/execute': '/agent-auth/tools/execute/',
  '/agent-actions/tools/execute/': '/agent-auth/tools/execute/',
  '/agent-actions/tools/modifiers': '/agent-auth/tools/modifiers/',
  '/agent-actions/tools/modifiers/': '/agent-auth/tools/modifiers/',
  '/agent-actions/tools/overview': '/agent-auth/tools/overview/',
  '/agent-actions/tools/overview/': '/agent-auth/tools/overview/',
  '/agent-actions/tools/proxy-tools': '/agent-auth/tools/proxy-tools/',
  '/agent-actions/tools/proxy-tools/': '/agent-auth/tools/proxy-tools/',

  // =============================================================================
  // API AUTH (M2M) REDIRECTS
  // =============================================================================
  '/m2m/quickstart': '/authenticate/m2m/api-auth-quickstart/',
  '/m2m/overview': '/guides/m2m/overview/',
  '/m2m/m2m-basics': '/guides/m2m/overview/',
  '/guides/m2m/m2m-basics': '/guides/m2m/overview/',
  '/m2m/authenticate-scalekit-api': '/guides/authenticate-scalekit-api/',
  '/m2m/api-auth-for-m2m-clients': '/guides/m2m/api-auth-m2m-clients/',
  '/m2m/external-ids-and-metadata': '/guides/external-ids-and-metadata/',
  '/m2m/scopes': '/guides/m2m/scopes/',

  // =============================================================================
  // INTEGRATIONS REDIRECTS
  // =============================================================================

  // General integrations
  '/integrations': '/guides/integrations/',
  '/integrations/saml': '/guides/integrations/sso-integrations/generic-saml/',
  '/integrations/oidc': '/guides/integrations/sso-integrations/generic-oidc/',
  '/integrations/adfs-saml': '/guides/integrations/sso-integrations/microsoft-ad-fs/',

  // Auth systems integrations
  '/integrations/auth0/': '/guides/integrations/auth-systems/auth0/',
  '/integrations/firebase/': '/guides/integrations/auth-systems/firebase/',
  '/integrations/cognito/': '/guides/integrations/auth-systems/aws-cognito/',

  // SSO integrations
  '/integrations/azure-ad-saml': '/guides/integrations/sso-integrations/azure-ad-saml/',
  '/integrations/okta-saml': '/guides/integrations/sso-integrations/okta-saml/',
  '/integrations/onelogin-saml': '/guides/integrations/sso-integrations/onelogin-saml/',
  '/integrations/jumpcloud': '/guides/integrations/sso-integrations/jumpcloud-saml/',
  '/integrations/jumpcloud-saml': '/guides/integrations/sso-integrations/jumpcloud-saml/',
  '/integrations/google-saml': '/guides/integrations/sso-integrations/google-saml/',
  '/integrations/pingidentity-saml': '/guides/integrations/sso-integrations/pingidentity-saml/',

  // SCIM integrations
  '/integrations/onelogin': '/guides/integrations/scim-integrations/onelogin/',
  '/integrations/azure-scim/': '/guides/integrations/scim-integrations/azure-scim/',
  '/integrations/okta-scim/': '/guides/integrations/scim-integrations/okta-scim/',
  '/integrations/onelogin-scim': '/guides/integrations/scim-integrations/onelogin/',
  '/integrations/scim-connections/google-dir-sync/':
    '/guides/integrations/scim-integrations/google-dir-sync/',
  '/integrations/scim-connections/jumpcloud/': '/guides/integrations/scim-integrations/jumpcloud/',

  // Social connections
  '/integrations/social-connections/google/': '/guides/integrations/social-connections/google/',
  '/integrations/social-connections/microsoft/':
    '/guides/integrations/social-connections/microsoft/',
  '/integrations/social-connections/github/': '/guides/integrations/social-connections/github/',
  '/integrations/social-connections/gitlab/': '/guides/integrations/social-connections/gitlab/',
  '/integrations/social-connections/linkedin/': '/guides/integrations/social-connections/linkedin/',
  '/integrations/social-connections/salesforce/':
    '/guides/integrations/social-connections/salesforce/',

  // =============================================================================
  // GENERAL / OTHER REDIRECTS
  // =============================================================================
  '/examples': '/scenarios/',
  '/dev-kit/': '/dev-kit/overview',
  '/dev-kit/sdks/overview': '/authenticate/set-up-scalekit/',
  '/authenticate/installation': '/authenticate/set-up-scalekit/',
  '/guides/setup-scalekit/': '/authenticate/set-up-scalekit/',
  '/fsa/reference/user-management-settings': '/authenticate/fsa/user-management-settings/',
  '/dev-kit/webhooks/event-object/': '/reference/webhooks/overview/',
  '/reference/webhooks/event-object/': '/reference/webhooks/overview/',
  '/api/webhook-events': '/reference/webhooks/directory-events/',
  '/manage-scalekit/glossary': '/reference/glossary/',
  '/contact-us': '/support/contact-us/',
  '/index-old': '/',

  // Logs pages - webhook logs merged into auth logs
  '/guides/view-webhook-logs/': '/guides/dashboard/auth-logs/',
}
