# SK-1707: SaaSKit pages that should teach session middleware

## What the two releases change

Two additive SDK releases shipped session middleware:

- **Node** — `@scalekit-sdk/node` `2.12.0+` adds `@scalekit-sdk/node/express`, `@scalekit-sdk/node/next`, and `@scalekit-sdk/node/edge`.
- **Python** — `scalekit-sdk-python` `2.17.0+` adds `scalekit.frameworks.flask`, `scalekit.frameworks.fastapi`, and `scalekit.frameworks.django`.

The hosted login page does not change. Scalekit still hosts the UI.

The reader’s app code does change. Node and Python no longer build login, callback, cookies, refresh, and logout by hand.

| Job | Quickstart today (Node / Python) | After the two releases |
| --- | --- | --- |
| Install | `npm install @scalekit-sdk/node` / `pip install scalekit-sdk-python` | Same packages. Python needs an extra: `[flask]`, `[fastapi]`, or `[django]`. Node imports a subpath: `/express`, `/next`, or `/edge`. |
| New secret | Three env vars | Add `COOKIE_ENCRYPTION_SECRET` (`openssl rand -base64 32`). |
| Start login | Reader writes `/login`. Calls `getAuthorizationUrl` / `get_authorization_url`. Builds `state`. Redirects. | Helper registers `GET /login`. |
| Complete login | Reader writes `/callback`. Calls `authenticateWithCode` / `authenticate_with_code`. | Helper registers `GET /callback`. |
| Store session | Reader encrypts tokens. Sets `accessToken`, `refreshToken`, and `idToken` cookies. | Helper sets one encrypted `sk_session` cookie. |
| Protect a route | Reader writes `verifyToken` / a Flask decorator. Calls `validateAccessToken` then `refreshAccessToken`. Returns JSON **401**. | `auth.requiresAuth` / `@auth.requires_auth` / `Depends(auth.requires_auth)` / `@login_required` / `auth.withAuth()`. Returns **302** to `/login`. |
| Who is logged in | Reader attaches `req.user` after a manual decode. | `req.scalekitUser` (Express), `auth.current_user` (Flask), `request.scalekit_user` (Django), `user` from `withAuth` (Next.js). |
| Log out | Reader writes `/logout`. Calls `getLogoutUrl`. Clears three cookies. | Helper registers `GET /logout`. Clears `sk_session`. |
| Next.js on Edge | Cookbook says Edge cannot run the Node SDK. | `ScalekitEdgeClient` from `@scalekit-sdk/node/edge` is the Edge client. |

Go and Java tabs stay on the old methods. Those SDKs have no helpers.

The core methods stay in the SDK. The helpers call them. The Quickstart should show the helper first for Node and Python.

### Per page

1. **SaaSKit Quickstart** — Collapse steps 2–5 for Node and Python into “construct the helper, protect one route”. Keep Go/Java as they are.
2. **Initiate signup/login** — Node/Python default becomes “send the user to `/login`”. Keep `getAuthorizationUrl` as the primitive path.
3. **Complete login** — Node/Python default becomes “the helper owns `/callback`”. Keep `authenticateWithCode` as the primitive path.
4. **Manage user sessions** — Node/Python default becomes `sk_session` + automatic refresh. Keep the hand-built middleware as “build it yourself”.
5. **Implement logout** — Node/Python default becomes `GET /logout`. Keep `getLogoutUrl` for Go/Java.
6. **Next.js hosted-auth cookbook** — Replace the hand-built Route Handlers with `ScalekitAuthNext`. Delete the “Edge cannot run the Node SDK” line.

---

Change these pages, in this order. **MUST:** [`authenticate/fsa/quickstart.mdx`](../src/content/docs/authenticate/fsa/quickstart.mdx) (the labeled SaaSKit Quickstart still teaches login, callback, `HttpOnly` cookies, `validateAccessToken` / `refreshAccessToken`, and logout by hand for Node and Python). **SHOULD:** [`implement-login.mdx`](../src/content/docs/authenticate/fsa/implement-login.mdx), [`complete-login.mdx`](../src/content/docs/authenticate/fsa/complete-login.mdx), [`manage-session.mdx`](../src/content/docs/authenticate/fsa/manage-session.mdx), [`logout.mdx`](../src/content/docs/authenticate/fsa/logout.mdx), then the Next.js cookbook [`cookbooks/add-hosted-auth-nextjs-app-router.mdx`](../src/content/docs/cookbooks/add-hosted-auth-nextjs-app-router.mdx) (it also claims Edge cannot run the Node SDK). Next, update the later Node/Python cookie-gate pages [`authenticate/authz/implement-access-control.mdx`](../src/content/docs/authenticate/authz/implement-access-control.mdx) and [`guides/user-auth/preserve-intended-destination.mdx`](../src/content/docs/guides/user-auth/preserve-intended-destination.mdx). The sibling [`passwordless/oidc.mdx`](../src/content/docs/passwordless/oidc.mdx) page still teaches the same OIDC login and callback by hand. **CROSS-LINK only:** Set up, code-sample catalogs, launch checklist, session-claims, multi-app web, org switcher, and the AI/home entry points. Do not rewrite the SK-1706 SDK reference pages. They already document `ScalekitAuth` / `ScalekitAuthNext`.

## SaaSKit auth IA

Source: [`src/configs/sidebar.config.ts`](../src/configs/sidebar.config.ts) topic `authenticate` (label **SaaSKit**), default link `/authenticate/fsa/quickstart/`.

| Sidebar group | Pages (sidebar label) | Role for SK-1707 |
| --- | --- | --- |
| Getting started | Set up · Quickstart (SaaSKit) · Code samples | First-success path. Only Quickstart teaches the full login/session stack. |
| User authentication | Initiate signup/login · Complete login · Manage user sessions · Implement logout · Add auth redirects · Org redirect URLs | Core later-journey teaching surface. Redirect pages are dashboard config, not SDK. |
| Manage auth methods | Magic link or email OTP · Social logins · Passkeys · Enterprise SSO · Authentication flow | Dashboard / concept. None own session cookies. |
| Manage users & orgs | Overview (data model) · Add users · Email domain rules · Org domains · JIT · SCIM · Merge identities · Org switcher · Remove users · Delete · User management settings · Org session policy · Hosted widgets | Org switcher and add-users still call `getAuthorizationUrl` by hand. Session policy is dashboard-only. |
| Authorization | Overview · Create roles · Assign roles · Implement access control | Access-control page validates hand-rolled `accessToken` cookies. |
| Auth across multiple apps | Overview · Manage applications · Web App · Single Page App · Mobile & Desktop | Web App restates cookie/refresh/logout as HTTP, not SDK helpers. SPA/native are other client types. |
| Add auth to your APIs | API auth quickstart · API keys | M2M. Out of scope. |
| Customize / Go live | Session token claims · Production readiness checklist · Migrating to Full stack auth | Cross-link. Checklist still assumes hand-set cookies. |

Cookbooks live at `src/content/docs/cookbooks/` and publish under `/cookbooks/`. They are not in the SaaSKit sidebar ([`sidebar.config.ts` 653–654, 774](../src/configs/sidebar.config.ts)). FSA-relevant cookbooks: hosted Next.js auth, headless Next.js passwordless, Auth.js enterprise SSO, Auth0 migration, custom org switcher, Chargebee billing.

SK-1706 already shipped reference Quickstarts under SaaSKit SDKs (`saaskit-sdks`): Express, Next.js, Flask, FastAPI, Django. Those pages already use the new helpers. Do not retutorial them.

## Classification table

| Path | Sidebar label | Classification | Why | Key evidence |
| --- | --- | --- | --- | --- |
| `src/content/docs/authenticate/fsa/quickstart.mdx` | Quickstart (SaaSKit) (sidebar override; page has no `sidebar.label`) | **MUST update** | Labeled first-success page. Node/Python tabs teach `getAuthorizationUrl`, `authenticateWithCode` / `authenticate_with_code`, raw `accessToken`/`refreshToken` cookies, `validateAccessToken` / `refreshAccessToken`, and `getLogoutUrl`. No `ScalekitAuth`. | [`sidebar.config.ts` 29](../src/configs/sidebar.config.ts); [quickstart 126](../src/content/docs/authenticate/fsa/quickstart.mdx); [146](../src/content/docs/authenticate/fsa/quickstart.mdx); [224](../src/content/docs/authenticate/fsa/quickstart.mdx); [266](../src/content/docs/authenticate/fsa/quickstart.mdx); [422–436](../src/content/docs/authenticate/fsa/quickstart.mdx); [549–558](../src/content/docs/authenticate/fsa/quickstart.mdx); [596–606](../src/content/docs/authenticate/fsa/quickstart.mdx); [830–841](../src/content/docs/authenticate/fsa/quickstart.mdx) |
| `src/content/docs/authenticate/fsa/implement-login.mdx` | Initiate signup/login | **SHOULD update** | Later-journey start-login page. Express/Flask tabs still build `getAuthorizationUrl` / `get_authorization_url` and hand-roll `state`. Shared template `_user-authpage.mdx` does the same for `prompt: 'create'`. | [implement-login 5–6, 132–165](../src/content/docs/authenticate/fsa/implement-login.mdx); [`_user-authpage.mdx` 12, 27](../src/components/templates/_user-authpage.mdx) |
| `src/content/docs/authenticate/fsa/complete-login.mdx` | Complete login | **SHOULD update** | Later-journey callback page. Express/Flask exchange `code` with `authenticateWithCode` / `authenticate_with_code`, then leave a TODO to store the session. Also documents optional `validateAccessToken` and more `getAuthorizationUrl` routing snippets. | [complete-login 6–7, 101–126, 163–167, 553](../src/content/docs/authenticate/fsa/complete-login.mdx) |
| `src/content/docs/authenticate/fsa/manage-session.mdx` | Manage user sessions | **SHOULD update** | Later-journey session page. Node/Python still encrypt tokens, set `accessToken`/`refreshToken` cookies, and write custom `middleware/auth.js` / `middleware/auth.py` around `validateAccessToken` / `refreshAccessToken`. | [manage-session 14–15, 88–105, 127–143, 238–257, 289–312](../src/content/docs/authenticate/fsa/manage-session.mdx) |
| `src/content/docs/authenticate/fsa/logout.mdx` | Implement logout | **SHOULD update** | Later-journey logout page. Express/Flask extract `idToken`, call `getLogoutUrl` / `get_logout_url`, and clear three hand-set cookies. Helpers already own logout. | [logout 5–6, 43–61, 70–91](../src/content/docs/authenticate/fsa/logout.mdx) |
| `src/content/docs/cookbooks/add-hosted-auth-nextjs-app-router.mdx` | — (cookbook; not in SaaSKit sidebar) | **SHOULD update** | Only FSA cookbook that maps the full hosted login → callback → cookies → refresh → logout path for Node. It hand-rolls Route Handlers and a presence-only `middleware.ts`. It states the Edge runtime cannot run the Node SDK. That claim is now stale next to `ScalekitAuthNext` + `ScalekitEdgeClient`. | [cookbook 19–28, 109–112, 149–150, 212, 239, 269–275](../src/content/docs/cookbooks/add-hosted-auth-nextjs-app-router.mdx) |
| `src/content/docs/authenticate/authz/implement-access-control.mdx` | Implement access control | **SHOULD update** | Later Authorization step. Node/Python middleware still decrypts `req.cookies.accessToken` / `request.cookies.get('accessToken')` and calls `validateAccessToken` / `validate_access_token`. After helpers ship in the journey, this page should read `sk_session` / `scalekit_user` instead of growing a second cookie stack. | [implement-access-control 5–6, 81–88, 126–130](../src/content/docs/authenticate/authz/implement-access-control.mdx) |
| `src/content/docs/guides/user-auth/preserve-intended-destination.mdx` | Preserve user destination | **SHOULD update** | `manage-session` seeAlso. Express/Flask still set `sk_return_to` and call `getAuthorizationUrl` / `get_authorization_url` by hand. Point Node/Python at helper `returnTo` instead of a new tutorial. | [preserve-intended-destination 19–20, 47–53, 107–117](../src/content/docs/guides/user-auth/preserve-intended-destination.mdx); [manage-session 19–21](../src/content/docs/authenticate/fsa/manage-session.mdx) |
| `src/content/docs/passwordless/oidc.mdx` | Passwordless (not in SaaSKit sidebar) | **SHOULD update** | Sibling OIDC quickstart. Next link is Manage session. Node/Python still teach `getAuthorizationUrl` + `authenticateWithCode` and say “create a session” by hand. Not MCP/SSO. It is FSA login taught a second time. | [passwordless/oidc 10–11, 38–40, 141, 166, 288, 306](../src/content/docs/passwordless/oidc.mdx) |
| `src/content/docs/authenticate/set-up-scalekit.mdx` | Set up | **CROSS-LINK only** | First Getting started page. Installs the language client only (`npm install @scalekit-sdk/node`, `pip install scalekit-sdk-python`). No extras, no `frameworks.*`. Do not add a session tutorial. Point Node/Python at the framework Quickstarts and extras. | [set-up 16–17, 59–91](../src/content/docs/authenticate/set-up-scalekit.mdx); [`_installsdk.mdx` 8, 16](../src/components/templates/_installsdk.mdx) |
| `src/content/docs/authenticate/fsa/code-samples.mdx` | Code samples | **CROSS-LINK only** | Catalog only. Embeds `_fsa-code-samples.mdx` (Next, FastAPI, Flask, Django, Express GitHub apps). Add helper links. Do not paste a new tutorial. | [code-samples 5–12](../src/content/docs/authenticate/fsa/code-samples.mdx); [`_fsa-code-samples.mdx` 6–58](../src/components/templates/_fsa-code-samples.mdx) |
| `src/content/docs/resources/code-samples/full-stack-auth.mdx` | Full stack auth | **CROSS-LINK only** | Same catalog, Dev Kit copy. Update the shared template once. | [full-stack-auth 5–15](../src/content/docs/resources/code-samples/full-stack-auth.mdx) |
| `src/content/docs/browse/code-samples/hosted-login-examples.mdx` | Hosted login | **CROSS-LINK only** | Browse card. Points at older Express login-box repos. Link Express `ScalekitAuth` reference. Do not grow a tutorial. | [hosted-login-examples 10–35](../src/content/docs/browse/code-samples/hosted-login-examples.mdx) |
| `src/content/docs/authenticate/launch-checklist.mdx` | Production readiness checklist (title; no `sidebar.label`) | **CROSS-LINK only** | Go-live checklist still tells you to test authorization URL, code exchange, hand-set `httpOnly` cookies, and token refresh. Add a Node/Python helper checkbox. Do not add sample code. | [launch-checklist 56–62](../src/content/docs/authenticate/launch-checklist.mdx) |
| `src/content/docs/authenticate/fsa/session-token-claims.mdx` | Customize session token claims | **CROSS-LINK only** | Concept page for JWT claims. seeAlso already points at manage-session and complete-login. Point at helpers for how the cookie is written. Do not add a login tutorial. | [session-token-claims 7–23, 31–35](../src/content/docs/authenticate/fsa/session-token-claims.mdx) |
| `src/content/docs/authenticate/fsa/multiapp/web-app.mdx` | Web App | **CROSS-LINK only** | Multi-app web guide. Describes cookie storage, refresh POST, and `/oidc/logout` as raw HTTP. No Node/Python SDK snippets. Link the framework helpers. Keep the HTTP contract. | [web-app 5–6, 30, 125–170](../src/content/docs/authenticate/fsa/multiapp/web-app.mdx) |
| `src/content/docs/authenticate/manage-users-orgs/organization-switching.mdx` | Implement organization switcher | **CROSS-LINK only** | Shows Express/Flask `getAuthorizationUrl` with `prompt: 'select_account'`. Not first-run session. Point at helper login options. Do not retutorial cookies. | [organization-switching 5–6, 62–87](../src/content/docs/authenticate/manage-users-orgs/organization-switching.mdx) |
| `src/content/docs/authenticate/manage-organizations/add-users-to-organization.mdx` | Add users to organizations | **CROSS-LINK only** | Invite / initiate-login URL uses hand-rolled `/login` + `getAuthorizationUrl`. Not session middleware. | [add-users 5–6, 172–197](../src/content/docs/authenticate/manage-organizations/add-users-to-organization.mdx) |
| `src/content/docs/fsa/guides/user-invitations.mdx` | Building user invitations | **CROSS-LINK only** | Invitation guide. Reuses `_user-authpage.mdx` / `_retrieve-user-details.mdx` (`getAuthorizationUrl`, `authenticateWithCode`). Point at helpers. Do not grow a session tutorial. | [user-invitations 10–11, 36](../src/content/docs/fsa/guides/user-invitations.mdx); [`_retrieve-user-details.mdx` 19](../src/components/templates/_retrieve-user-details.mdx) |
| `src/content/docs/authenticate/manage-organizations/organization-session-policy.mdx` | Organization session policy | **CROSS-LINK only** | Dashboard timeouts. No SDK session code. seeAlso already points at manage-session. | [organization-session-policy 5–6, 16–19, 35–38](../src/content/docs/authenticate/manage-organizations/organization-session-policy.mdx) |
| `src/content/docs/home/saaskit/index.mdx` | — (splash; topic `authenticate`) | **CROSS-LINK only** | SaaSKit home. Sends builders to `/authenticate/fsa/quickstart`. No session code. After Quickstart changes, this link is enough. | [home/saaskit 6, 198](../src/content/docs/home/saaskit/index.mdx) |
| `src/content/docs/dev-kit/build-with-ai/full-stack-auth.mdx` | Full stack auth | **CROSS-LINK only** | Coding-agent install. Next is the FSA Quickstart. Update the skill outside this repo if it still pastes hand-rolled cookies. This page has no SDK samples. | [full-stack-auth 5–6, 18–19](../src/content/docs/dev-kit/build-with-ai/full-stack-auth.mdx) |
| `src/content/docs/fsa/guides/migration-guide.mdx` | Migrating to Full stack auth | **CROSS-LINK only** | Migration narrative. Mentions session cookies as something to export from the old system. No Node/Python login code. | [migration-guide 5–6](../src/content/docs/fsa/guides/migration-guide.mdx) |
| `src/content/docs/cookbooks/migrate-from-auth0-to-scalekit.mdx` | — (cookbook) | **CROSS-LINK only** | FSA migration recipe. Points at the Quickstart. Has no `getAuthorizationUrl` / session-cookie code. | [migrate-from-auth0 21](../src/content/docs/cookbooks/migrate-from-auth0-to-scalekit.mdx) |
| `src/content/docs/authenticate/auth-methods/authentication-flow.mdx` | Authentication flow | **CROSS-LINK only** | Hosted-page HRD concept. No SDK session code. | [authentication-flow 4–5, 15–21](../src/content/docs/authenticate/auth-methods/authentication-flow.mdx) |
| `src/content/docs/saaskit/sdks/express/index.mdx` | Quickstart (SaaSKit SDKs → Express) | **SKIP** | Already documents `@scalekit-sdk/node/express` `ScalekitAuth`. | [express 2–9, 28, 64–66](../src/content/docs/saaskit/sdks/express/index.mdx) |
| `src/content/docs/saaskit/sdks/nextjs/index.mdx` | Quickstart (SaaSKit SDKs → Next.js) | **SKIP** | Already documents `ScalekitAuthNext` and `ScalekitEdgeClient`. Corrects the Edge story. | [nextjs 9, 31–33, 69–77, 111–112, 330–360](../src/content/docs/saaskit/sdks/nextjs/index.mdx) |
| `src/content/docs/saaskit/sdks/flask/index.mdx` | Quickstart (SaaSKit SDKs → Flask) | **SKIP** | Already documents `scalekit.frameworks.flask.ScalekitAuth`. | [flask 2–9, 28, 65–68](../src/content/docs/saaskit/sdks/flask/index.mdx) |
| `src/content/docs/saaskit/sdks/fastapi/index.mdx` | Quickstart (SaaSKit SDKs → FastAPI) | **SKIP** | Already documents `scalekit.frameworks.fastapi.ScalekitAuth`. | [fastapi 2–9, 28, 65–68](../src/content/docs/saaskit/sdks/fastapi/index.mdx) |
| `src/content/docs/saaskit/sdks/django/index.mdx` | Quickstart (SaaSKit SDKs → Django) | **SKIP** | Already documents `ScalekitAuthMiddleware` + `@login_required`. | [django 2–9, 28–30, 67, 90](../src/content/docs/saaskit/sdks/django/index.mdx) |
| `src/content/docs/cookbooks/implement-nextjs-auth.mdx` | — (cookbook) | **SKIP** | Headless passwordless (`sendPasswordlessEmail`). Custom JWT `session` cookie. Not hosted FSA session middleware. | [implement-nextjs-auth 16–51, 86–102, 274–281](../src/content/docs/cookbooks/implement-nextjs-auth.mdx) |
| `src/content/docs/cookbooks/add-enterprise-sso-nextjs-authjs.mdx` | — (cookbook) | **SKIP** | Auth.js owns the session. Scalekit is an OIDC provider only. | [add-enterprise-sso 20, 47](../src/content/docs/cookbooks/add-enterprise-sso-nextjs-authjs.mdx) |
| `src/content/docs/cookbooks/sync-b2b-billing-with-chargebee.mdx` | — (cookbook) | **SKIP** | Billing cookbook. Uses `validateAccessToken` to read `oid`. Not first-run login. | [chargebee 300–307](../src/content/docs/cookbooks/sync-b2b-billing-with-chargebee.mdx) |
| `src/content/docs/cookbooks/building-custom-org-switcher.mdx` | — (cookbook) | **SKIP** | Custom switcher UI. No login/callback/session-helper code. | [building-custom-org-switcher 30–35](../src/content/docs/cookbooks/building-custom-org-switcher.mdx) |
| `src/content/docs/authenticate/m2m/api-auth-quickstart.mdx` | (Add auth to your APIs) | **SKIP** | M2M / API-key quickstart. `validate_access_token_and_get_claims` is machine-token validation, not user session cookies. | searched in `authenticate/m2m/` |
| `src/content/docs/authenticate/sso/add-modular-sso.mdx` | Quickstart: Add modular SSO | **SKIP** | Modular SSO product. Teaches `getAuthorizationUrl` + `authenticateWithCode` for that product, not FSA session middleware. | searched in `authenticate/sso/` |
| `src/content/docs/guides/user-auth/check-sso-domain.mdx` | (user-auth guide) | **SKIP** | Modular SSO domain-check. Not FSA first-success. | searched in `guides/user-auth/` |
| `src/content/docs/guides/user-auth/modular-social-logins.mdx` | (user-auth guide) | **SKIP** | Modular social logins. Not FSA session middleware. | searched in `guides/user-auth/` |
| `src/content/docs/authenticate/mcp/**` | MCP Auth | **SKIP** | MCP product. Token validation is resource-server auth, not FSA `sk_session`. | [`sidebar.config.ts` 404–454](../src/configs/sidebar.config.ts) |
| `src/content/docs/fsa/data-modelling.mdx` | Overview | **SKIP** | Users/orgs concept. No session helpers. | [data-modelling 6](../src/content/docs/fsa/data-modelling.mdx) |
| `src/content/docs/authenticate/fsa/multiapp/single-page-app.mdx` | Single Page App | **SKIP** | Public client + PKCE. Helpers are server/session middleware. | [single-page-app 5–6](../src/content/docs/authenticate/fsa/multiapp/single-page-app.mdx) |
| `src/content/docs/authenticate/fsa/multiapp/native-app.mdx` | Mobile & Desktop | **SKIP** | Native/mobile. Not Node/Python web middleware. | [native-app 5–6](../src/content/docs/authenticate/fsa/multiapp/native-app.mdx) |
| `src/content/docs/authenticate/auth-methods/passwordless.mdx` | Magic link or email OTP | **SKIP** | Dashboard enablement. Points at FSA Quickstart. No session code. | [auth-methods/passwordless 5–6, 33](../src/content/docs/authenticate/auth-methods/passwordless.mdx) |

## Shared templates (not pages)

Update these when you change the journey pages. They are not standalone docs.

| Template | Used by | Note |
| --- | --- | --- |
| `src/components/templates/_installsdk.mdx` | Quickstart, Set up, manage-session, migration pages | Language-client install only. No `flask`/`fastapi`/`django` extras. |
| `src/components/templates/_user-authpage.mdx` | implement-login, user-invitations | Hand-rolled `getAuthorizationUrl` for `prompt: 'create'`. |
| `src/components/templates/_retrieve-user-details.mdx` | user-invitations | Hand-rolled `authenticateWithCode`. |
| `src/components/templates/_create-session.mdx` | Exported, unused by any MDX page | Hand-rolled `res.cookie('accessToken', ...)`. Delete or retarget if you touch session templates. |
| `src/components/templates/_fsa-code-samples.mdx` | `authenticate/fsa/code-samples.mdx` and `resources/code-samples/full-stack-auth.mdx` | One edit covers both catalogs. |

## Out of scope

- **SK-1706 SDK reference pages** already document the helpers: Express, Next.js, Flask, FastAPI, Django under `src/content/docs/saaskit/sdks/`.
- **Go and Java** FSA tabs stay on the low-level client. There is no shipped session middleware for those languages. Do not invent helpers.
- **AgentKit** (`src/content/docs/agentkit/`, AgentKit cookbooks).
- **Modular SSO / Modular SCIM** as products (`authenticate/sso/`, `directory/`, `guides/user-auth/modular-social-logins.mdx`, `guides/user-auth/check-sso-domain.mdx`).
- **MCP Auth** (`authenticate/mcp/`). Those pages validate access tokens for MCP servers, not FSA session cookies.
- **M2M / API keys** (`authenticate/m2m/`).
- **Headless passwordless** (`passwordless/quickstart.mdx`, `cookbooks/implement-nextjs-auth.mdx`).
- **Auth.js SSO cookbook** (`cookbooks/add-enterprise-sso-nextjs-authjs.mdx`). Auth.js owns that session.
- **SPA, native, Expo, iOS** clients.
- **Dashboard-only pages**: redirects, branding, email templates, passkeys/social/SSO method setup, encryption keys, interceptors, webhooks.

## Implementation notes (research only)

- The SaaSKit first-success path is three pages. Only Quickstart teaches the stack. Set up and Code samples need links, not a second tutorial.
- Keep Go/Java hand-rolled snippets on Quickstart and the later journey pages. The new surface is Node and Python only.
- The Next.js cookbook is the only page that still says Edge cannot run the Node SDK ([cookbook 28, 273–274](../src/content/docs/cookbooks/add-hosted-auth-nextjs-app-router.mdx)). The Next.js SDK page already documents `ScalekitEdgeClient` and `runtime: 'nodejs'` ([nextjs 111–112](../src/content/docs/saaskit/sdks/nextjs/index.mdx)).
- There is no Flask, Express, Django, or FastAPI cookbook. Those stacks learn FSA from Quickstart plus the SK-1706 SDK pages.
- Repo glossary: use **session middleware**, not “adapter” ([`CONTEXT.md` 7–9](../CONTEXT.md)).

## Sources

- Linear [SK-1707](https://linear.app/scalekit/issue/SK-1707/update-quickstarts-for-node-and-python-framework-support) (parent [SK-1706](https://linear.app/scalekit/issue/SK-1706/document-framework-support-for-node-and-python-sdks), PR 968).
- [`src/configs/sidebar.config.ts`](../src/configs/sidebar.config.ts) lines 18–147 (SaaSKit IA), 560–574 (SaaSKit SDK nav), 653–654 and 774 (cookbooks topic).
- [`CONTEXT.md`](../CONTEXT.md) lines 7–13 (session middleware glossary).
- Opened MDX listed in the table. Search terms: `validateAccessToken`, `validate_access_token`, `refreshAccessToken`, `refresh_access_token`, `getAuthorizationUrl`, `authenticateWithCode`, `ScalekitAuth`, `ScalekitAuthNext`, `ScalekitEdgeClient`, `frameworks.flask`, `@scalekit-sdk/node/express`, `@scalekit-sdk/node/next`, `@scalekit-sdk/node/edge`, `middleware.ts`, “Edge runtime can't run the Node SDK”.
- Already-shipped reference: `src/content/docs/saaskit/sdks/{express,nextjs,flask,fastapi,django}/index.mdx`.
