# SaaSKit session middleware is taught on Manage session

SaaSKit first-run docs teach Node and Python **session middleware** after the Express / Next.js / Flask / FastAPI helpers shipped.

The **SaaSKit Quickstart** stays first success: construct the helper and protect one route.

**Manage user sessions** is the complete how-to for those helpers. Express, Next.js, Flask, and FastAPI are explained there.

**Initiate signup/login** and **Complete login** keep the OAuth primitives. They get one sentence that points at Manage session. They do not grow framework tabs. They do not point at SDK pages.

**SDK pages** under `/saaskit/sdks/{express,nextjs,flask,fastapi,django}/` stay lookup. Manage session links to them for constructors, cookie options, and `createMiddleware`.

We rejected putting the full helper on every journey page (duplicates the hub). We rejected pointing surgical text at the SDK pages (those pages are reference, not the journey).

Go and Java stay on `getAuthorizationUrl`, `authenticateWithCode`, and hand-built cookies. Those SDKs have no session middleware.

Django is a link to `/saaskit/sdks/django/`. It does not get a Quickstart tab.
