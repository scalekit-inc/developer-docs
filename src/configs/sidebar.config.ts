export const sidebar = [
  {
    label: "Single Sign-On",
    link: "/sso/quickstart",
    id: "sso",
    icon: "seti:lock",
    items: [
      {
        label: "Getting started",
        items: [
          "guides/sso/sso-basics",
          "sso/quickstart",
          "guides/sso/test-sso",
          "guides/sso/admin-portal",
          "guides/sso/launch-checklist",
        ],
      },
      {
        label: "Social authentication",
        items: [
          "social-logins/quickstart",
          {
            label: "connections",
            collapsed: false,
            autogenerate: {
              directory: "guides/integrations/social-connections",
            },
          },
        ],
      },
      {
        label: "Guides",
        items: [
          "guides/custom-domain",
          "guides/sso/idp-init-sso",
          "guides/sso/okta-sso-test",
          "guides/sso/sso-user-attributes",
          "reference/sso/sso-integration-errors",
          "reference/redirects",
          {
            label: "Coexist with",
            autogenerate: { directory: "guides/integrations/auth-systems" },
          },
          {
            label: "Concepts",
            items: [
              "guides/sso/authorization-url",
              "guides/idtoken-claims",
              "guides/sso/user-profile-details",
              "guides/client-credentials-practices",
            ],
          },
        ],
      },
    ],
  },
  {
    label: "SCIM Provisioning",
    link: "/directory/scim/quickstart",
    icon: "seti:folder",
    id: "directory",
    items: [
      {
        label: "Getting started",
        items: [
          "directory/scim/quickstart",
          "directory/code-examples",
          "guides/directory/admin-portal",
          "guides/directory/launch-checklist",
        ],
      },
      {
        label: "Guides",
        items: [
          "guides/directory/group-based-role-assignment",
          "guides/webhooks-best-practices",
          {
            label: "Concepts",
            items: [
              "guides/directory/user-provisioning-basics",
              "guides/directory/scim-protocol",
            ],
          },
        ],
      },
    ],
  },
  {
    label: "Passwordless Auth",
    link: "/guides/passwordless/quickstart",
    icon: "seti:email",
    id: "passwordless",
    items: [
      {
        label: "Getting started",
        items: [
          "guides/passwordless/overview",
          "guides/passwordless/quickstart",
          "guides/passwordless/oidc",
        ],
      },
    ],
  },
  {
    label: "API Auth",
    link: "/m2m/quickstart",
    id: "m2m",
    icon: "seti:powershell",
    badge: { text: "Beta", variant: "note" },
    items: [
      {
        label: "Getting started",
        items: [
          "guides/m2m/overview",
          "m2m/quickstart",
          {
            label: "Code examples",
            link: "https://github.com/scalekit-developers/gists/tree/main/m2m",
            attrs: { target: "_blank", rel: "noopener" },
          },
        ],
      },
      {
        label: "Guides",
        items: [
          "guides/m2m/m2m-basics",
          "guides/m2m/scopes",
          "guides/m2m/api-auth-m2m-clients",
        ],
      },
    ],
  },
  {
    label: "APIs & SDKs",
    id: "dev-kit",
    link: "/dev-kit/",
    icon: "seti:crystal_embedded",
    items: [
      {
        label: "Developer kit",
        items: [
          {
            label: "API reference",
            link: "/apis",
            attrs: { target: "_blank", rel: "noopener" },
            badge: { text: "REST ↗", variant: "note" },
          },
          {
            label: "Postman collections",
            link: "https://github.com/scalekit-developers/api-collections",
            attrs: { target: "_blank", rel: "noopener" },
          },
          {
            label: "Code gists",
            link: "https://github.com/scalekit-developers/gists",
            attrs: { target: "_blank", rel: "noopener" },
          },
          {
            label: "SDKs",
            items: [
              {
                label: "Nodejs",
                link: "https://github.com/scalekit-inc/scalekit-sdk-node",
                attrs: { target: "_blank", rel: "noopener" },
              },
              {
                label: "Python",
                link: "https://github.com/scalekit-inc/scalekit-sdk-python",
                attrs: { target: "_blank", rel: "noopener" },
              },
              {
                label: "Go",
                link: "https://github.com/scalekit-inc/scalekit-sdk-go",
                attrs: { target: "_blank", rel: "noopener" },
              },
              {
                label: "Java",
                link: "https://github.com/scalekit-inc/scalekit-sdk-java",
                attrs: { target: "_blank", rel: "noopener" },
              },
            ],
          },
        ],
      },
      {
        label: "Reference",
        items: [
          "reference/admin-portal/ui-events",
          {
            label: "Webhooks",
            autogenerate: { directory: "reference/webhooks" },
          },
          "reference/glossary",
        ],
      },
      {
        label: "Support",
        items: [
          "support/contact-us",
          {
            label: "Release notes",
            link: "https://www.scalekit.com/product-updates",
          },
          {
            label: "Status",
            link: "https://scalekit.statuspage.io/",
            attrs: { target: "_blank", rel: "noopener" },
          },
        ],
      },
    ],
  },
  {
    label: "Integrations",
    id: "integrations",
    link: "guides/integrations/sso-integrations",
    icon: "puzzle",
    items: [
      {
        label: "SSO integrations",
        autogenerate: { directory: "guides/integrations/sso-integrations" },
      },
      {
        label: "SCIM integrations",
        autogenerate: { directory: "guides/integrations/scim-integrations" },
      },
    ],
  },
];

export const topics = {
  exclude: [
    "/", // Exclude root path
    "/index", // Exclude index by name
    "/guides/redirects",
    "/guides/integrations",
    "/home/guides/**/*",
    "/home/guides/admin-portal",
    "/home/**/*",
    "/guides/setup-scalekit",
    "/guides/external-ids-and-metadata",
  ],
  "dev-kit": ["/guides/unlisted/passwordless-as-service"],
};
