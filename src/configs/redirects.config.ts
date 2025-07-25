export const redirects = {
  // SSO
  '/sso/quickstart-admin-portal': '/guides/sso/admin-portal',
  '/scim/quickstart': '/directory/scim/quickstart/',
  '/reference/errors': '/sso/reference/sso-integration-errors/',
  '/sso/social-login': '/social-logins/quickstart/',
  '/sso/social-logins-quickstart': '/social-logins/quickstart/',
  '/guides/sso/sso-basics/': '/sso/guides/sso-basics/',
  '/guides/sso/test-sso/': '/sso/guides/test-sso/',
  '/guides/sso/launch-checklist/': '/sso/guides/launch-checklist/',

  // SSO Guides
  '/sso/guides/setup-sso/implement-idp-initiated-sso': '/sso/guides/idp-init-sso/',
  '/sso/guides/setup-sso/handle-user-profile': '/sso/guides/sso-user-attributes/',
  '/sso/guides/setup-sso/build-login-page': '/sso/quickstart/',
  '/sso/guides/key-concepts/authorization-url': '/sso/guides/authorization-url/',
  '/sso/guides/key-concepts/redirect-uri': '/sso/reference/redirects/',
  '/best-practices/redirect-uri': '/sso/reference/redirects/',
  '/sso/guides/key-concepts/idtoken-claims': '/guides/idtoken-claims/',
  '/sso/guides/key-concepts/manage-client-secrets': '/guides/client-credentials-practices/',
  '/best-practices/manage-client-secrets': '/guides/client-credentials-practices/',
  '/sso/guides/key-concepts/user-profile': '/sso/guides/user-profile-details/',
  '/sso/guides/test-your-integration/using-okta': '/sso/guides/okta-sso-test/',
  '/sso/overview': '/guides/sso/sso-basics/',
  '/sso/guides/setup-sso/customize-user-attributes': '/sso/guides/sso-user-attributes/',

  // Legacy paths for SSO docs moved from /guides to /sso
  '/guides/sso/add-login-ux-sso/': '/sso/guides/add-login-ux-sso/',
  '/guides/sso/idp-init-sso/': '/sso/guides/idp-init-sso/',
  '/guides/sso/okta-sso-test/': '/sso/guides/okta-sso-test/',
  '/guides/sso/sso-user-attributes/': '/sso/guides/sso-user-attributes/',
  '/guides/sso/authorization-url/': '/sso/guides/authorization-url/',
  '/guides/sso/user-profile-details/': '/sso/guides/user-profile-details/',
  // Legacy reference docs moved from /reference to /sso/reference
  '/reference/sso/sso-integration-errors/': '/sso/reference/sso-integration-errors/',
  '/reference/redirects/': '/sso/reference/redirects/',

  // SCIM
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
  '/guides/directory/launch-checklist': '/directory/guides/launch-checklist',
  '/guides/directory/group-based-role-assignment': '/directory/guides/group-based-role-assignment',
  '/guides/directory/admin-portal': '/directory/guides/admin-portal',
  '/guides/directory/user-provisioning-basics': '/directory/guides/user-provisioning-basics',
  '/guides/directory/scim-protocol': '/directory/guides/scim-protocol',

  // M2M
  '/m2m/overview': '/guides/m2m/overview/',
  '/m2m/m2m-basics': '/guides/m2m/m2m-basics/',
  '/m2m/authenticate-scalekit-api': '/guides/authenticate-scalekit-api/',
  '/m2m/api-auth-for-m2m-clients': '/guides/m2m/api-auth-m2m-clients/',
  '/m2m/external-ids-and-metadata': '/guides/external-ids-and-metadata/',
  '/m2m/scopes': '/guides/m2m/scopes/',

  // integrations
  '/integrations': '/guides/integrations/',
  '/integrations/saml': '/guides/integrations/sso-integrations/generic-saml/',
  '/integrations/oidc': '/guides/integrations/sso-integrations/generic-oidc/',
  '/integrations/adfs-saml': '/guides/integrations/sso-integrations/microsoft-ad-fs/',

  // auth systems
  '/integrations/auth0/': '/guides/integrations/auth-systems/auth0/',
  '/sso/guides/integrate-with-your-auth-system/firebase':
    '/guides/integrations/auth-systems/firebase/',
  '/sso/guides/integrate-with-your-auth-system/auth0': '/guides/integrations/auth-systems/auth0/',
  '/integrations/firebase/': '/guides/integrations/auth-systems/firebase/',
  '/integrations/cognito/': '/guides/integrations/auth-systems/aws-cognito/',

  '/integrations/azure-ad-saml': '/guides/integrations/sso-integrations/azure-ad-saml/',
  '/integrations/okta-saml': '/guides/integrations/sso-integrations/okta-saml/',
  '/integrations/onelogin-saml': '/guides/integrations/sso-integrations/onelogin-saml/',
  '/integrations/jumpcloud': '/guides/integrations/sso-integrations/jumpcloud-saml/',
  '/integrations/onelogin': '/guides/integrations/scim-integrations/onelogin/',
  '/integrations/azure-scim/': '/guides/integrations/scim-integrations/azure-scim/',
  '/integrations/okta-scim/': '/guides/integrations/scim-integrations/okta-scim/',
  '/integrations/onelogin-scim': '/guides/integrations/scim-integrations/onelogin/',
  '/integrations/scim-connections/google-dir-sync/':
    '/guides/integrations/scim-integrations/google-dir-sync/',
  '/integrations/scim-connections/jumpcloud/': '/guides/integrations/scim-integrations/jumpcloud/',
  '/integrations/google-saml': '/guides/integrations/sso-integrations/google-saml/',
  '/integrations/pingidentity-saml': '/guides/integrations/sso-integrations/pingidentity-saml/',
  '/integrations/jumpcloud-saml': '/guides/integrations/sso-integrations/jumpcloud-saml/',

  // social logins
  '/social-logins': '/social-logins/quickstart/',
  '/integrations/social-connections/google/': '/guides/integrations/social-connections/google/',
  '/integrations/social-connections/microsoft/':
    '/guides/integrations/social-connections/microsoft/',
  '/integrations/social-connections/github/': '/guides/integrations/social-connections/github/',
  '/integrations/social-connections/gitlab/': '/guides/integrations/social-connections/gitlab/',
  '/integrations/social-connections/linkedin/': '/guides/integrations/social-connections/linkedin/',
  '/integrations/social-connections/salesforce/':
    '/guides/integrations/social-connections/salesforce/',

  // Other redirects
  '/sdks': '/dev-kit/',
  '/dev-kit/webhooks/event-object/': '/dev-kit',
  '/api/webhook-events': '/reference/webhooks/directory-events/',
  '/manage-scalekit/glossary': '/reference/glossary/',
  '/index-old': '/',
  '/sso/launch-checklist': '/guides/sso/launch-checklist/',
  '/sso/test-sso': '/guides/sso/test-sso/',
  '/sso/domain-and-theme-customization': '/guides/custom-domain/',
  '/sso/bkp/quickstart-admin-portal': '/guides/sso/admin-portal/',
  '/contact-us': '/support/contact-us/',
}
