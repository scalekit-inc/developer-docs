# Support triage — 2026-06

Tracking file for customer conversations (Pylon + Slack) from **2026-05-01** through **2026-06-12**. Not published to docs.

**Slack note:** Slack MCP was unavailable during initial harvest. Re-run `slack_search_public_and_private` when connected and append rows below.

## Triage schema

| ID        | Source      | Product          | Reader goal                             | Confirmed? | Content type          | Target path                                                               | Journey phase            | Action                   | GitHub       |
| --------- | ----------- | ---------------- | --------------------------------------- | ---------- | --------------------- | ------------------------------------------------------------------------- | ------------------------ | ------------------------ | ------------ |
| PY-802    | Pylon #802  | AgentKit         | Fix Jira connector OAuth callback       | partial    | FAQ + troubleshooting | `agentkit/connections.mdx`, `agentkit/authentication/troubleshooting.mdx` | Authentication / Go live | Sidebar + cross-link     | #641 partial |
| PY-603    | Pylon #603  | SaaSKit          | Validate OIDC id_token in Ruby          | yes        | How-to                | `authenticate/fsa/validate-oidc-tokens.mdx`                               | User authentication      | New page                 | #585         |
| PY-658    | Pylon #658  | MCP Auth         | Build CLI OAuth client (PKCE + DCR)     | yes        | How-to                | `authenticate/mcp/cli-oauth-client.mdx`                                   | Integration guides       | New page                 | #601         |
| PY-770    | Pylon #770  | Modular SSO      | Debug Firebase OIDC token exchange      | partial    | Cookbook              | `cookbooks/debug-firebase-oidc-scalekit-bridge.mdx`                       | Go live (cross-link)     | Defer — needs repro      | #642         |
| PY-652-SF | Pylon #652  | Agent connectors | Document Salesforce Chatter tools       | yes        | Connector sync        | generated `agentkit/connectors/salesforce.mdx`                            | Agent connectors         | Sync script              | #602         |
| PY-667    | Pylon #667  | Agent connectors | Clone Salesforce dashboard with name    | yes        | Connector template    | `_section-*-salesforce-*.mdx`                                             | Agent connectors         | Template                 | #599         |
| PY-959    | Pylon #959  | SaaSKit          | PRE_SESSION_CREATION on invite login    | yes        | FAQ                   | `manage-organizations/add-users-to-organization.mdx`                      | Manage users & orgs      | **Done** (recent commit) | —            |
| PY-1058   | Pylon #1058 | SaaSKit          | PRE_SESSION_CREATION session paths      | yes        | Concept FAQ           | `interceptors` / org guides                                               | Customize                | **Done** (recent commit) | —            |
| PY-661    | Pylon #661  | SaaSKit          | Email case sensitivity                  | yes (bug)  | Not docs              | —                                                                         | —                        | Product bug only         | #600         |
| PY-712    | Pylon #712  | Admin portal     | Display bug hot-fix                     | yes (ops)  | Not docs              | —                                                                         | —                        | Ops tracking             | #598         |
| GH-652    | GitHub #652 | AgentKit         | Parse `execute_tool` response           | yes        | Reference section     | `agentkit/tools/scalekit-optimized-tools.mdx`                             | Tool calling             | Extend page              | #652         |
| GH-671    | GitHub #671 | MCP Auth         | COOP popup OAuth failure                | yes        | Troubleshooting       | `authenticate/mcp/troubleshooting.mdx`                                    | Resources                | **Done** (#678)          | Close #671   |
| GH-738    | GitHub #738 | DX               | Auth logs Algolia noise                 | yes        | Product fix           | `home/saaskit`                                                            | —                        | **Done** (#737)          | Close #738   |
| GH-717    | GitHub #717 | SaaSKit          | Python `AuthorizationUrlOptions` kwargs | yes        | Doc fix               | 10+ guide files                                                           | User authentication      | Fix snippets             | #717         |
| GH-698    | GitHub #698 | AgentKit         | Python 3.8+ requirement                 | yes        | Reference             | `agentkit/sdks/python/index.mdx`                                          | SDKs                     | Add requirement          | #698         |
| GH-27     | GitHub #27  | Modular SSO      | Advanced SAML features                  | no         | How-to                | `sso/guides/`                                                             | Guides                   | Defer — IdP matrix       | #27          |
| GH-547    | GitHub #547 | AgentKit         | user_verify_url open redirect           | partial    | Upstream OpenAPI      | `public/api/`                                                             | —                        | Upstream only            | #547         |
| GH-596    | GitHub #596 | Agent connectors | Twitter `id` Required flag              | yes        | Sync metadata         | connector sync                                                            | Agent connectors         | Defer — upstream         | #596         |

## Deferred (new or follow-up issues)

| Theme                   | Issue                     | Reason                                               |
| ----------------------- | ------------------------- | ---------------------------------------------------- |
| SSO troubleshooting hub | New (or extend #585 area) | Error reference exists but `noindex`; needs hub page |
| SCIM troubleshooting    | New                       | No `directory/guides/troubleshooting.mdx`            |
| FSA troubleshooting hub | New                       | Pain scattered across login/session pages            |
| Firebase OIDC bridge    | #642                      | Intermittent failure — needs confirmed repro steps   |
| Advanced SAML           | #27                       | Needs product + IdP validation                       |

## Slack re-harvest checklist

When Slack MCP is available, search and append rows:

1. `documentation OR docs after:2026-05-01`
2. `AgentKit connector OR failed_to_exchange after:2026-05-01`
3. `MCP OAuth COOP popup after:2026-05-01`
4. `SSO SAML SCIM after:2026-05-01`
5. Customer channels via `slack_search_channels` → `in:#channel after:2026-05-01`
