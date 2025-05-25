export const redirects = {
  // SSO
  '/sso/quickstart-admin-portal': '/guides/sso/admin-portal',
  '/sso/social-login': '/social-logins/quickstart/',

  // SSO Guides
  '/sso/guides/setup-sso/implement-idp-initiated-sso':
    '/guides/sso/idp-init-sso/',
  '/sso/guides/setup-sso/handle-user-profile':
    '/guides/sso/sso-user-attributes/',
  '/sso/guides/setup-sso/build-login-page': '/sso/quickstart/',
  '/sso/guides/key-concepts/authorization-url':
    '/guides/sso/authorization-url/',
  '/sso/guides/key-concepts/redirect-uri': '/reference/redirects/',
  '/sso/guides/key-concepts/idtoken-claims': '/guides/idtoken-claims/',
  '/sso/guides/key-concepts/manage-client-secrets':
    '/guides/client-credentials-practices/',
  '/sso/guides/key-concepts/user-profile': '/guides/sso/user-profile-details/',
  '/sso/guides/test-your-integration/using-okta': '/guides/sso/okta-sso-test/',

  // SCIM
  '/scim/checklist': '/guides/directory/admin-portal/',

  // integrations
  '/integrations/[...slug]/': '/guides/integrations/auth-systems/[...slug]/',
  '/integrations/azure-ad-saml':
    '/guides/integrations/sso-integrations/azure-ad-saml/',
  '/integrations/okta-saml': '/guides/integrations/sso-integrations/okta-saml/',
  '/integrations/onelogin-saml':
    '/guides/integrations/sso-integrations/onelogin-saml/',
  '/integrations/jumpcloud':
    '/guides/integrations/sso-integrations/jumpcloud-saml/',
  '/integrations/azure-scim':
    '/guides/integrations/scim-integrations/azure-scim/',
  '/integrations/okta-scim':
    '/guides/integrations/scim-integrations/okta-scim/',
  '/integrations/onelogin': '/guides/integrations/scim-integrations/onelogin/',

  // social logins
  '/social-logins': '/social-logins/quickstart/',
  '/integrations/social-connections/[...slug]/':
    '/guides/integrations/social-connections/[...slug]/',

  '/sdks': '/dev-kit/',
  '/api/webhook-events': '/dev-kit/webhooks/directory-events/',
};
