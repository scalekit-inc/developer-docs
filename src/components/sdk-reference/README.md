# SDK reference partials

Hard-coded ClassBrowser content for AgentKit and SaaSKit SDK reference.

## Layout

```text
sdk-reference/
  agentkit/{node,python}/
    _nav.json              # sidebar clients + labels (source of truth for nav)
    *.mdx                  # optional method body helpers (not full-page-only)
  saaskit/{node,python,go,java}/
    _nav.json
    *.mdx
```

## Public pages

| URL                               | Role                        |
| --------------------------------- | --------------------------- |
| `/sdks/`                          | All SDKs hub                |
| `/saaskit/sdks/`                  | SaaSKit product SDK home    |
| `/saaskit/sdks/{lang}/`           | Installation                |
| `/saaskit/sdks/{lang}/{client}/`  | Client page (methods + TOC) |
| `/agentkit/sdks/`                 | AgentKit product SDK home   |
| `/agentkit/sdks/{lang}/`          | Installation                |
| `/agentkit/sdks/{lang}/{client}/` | Client page                 |

## TOC rule (critical)

Starlight’s right TOC only indexes **markdown headings on the page document**.

- Put `### \`methodName\`` on the **client page** (content MDX).
- Do **not** ship a page that is only `<FullClientPartial />` if methods must appear in the TOC.
- Partials may wrap ClassBrowser / MethodParams **bodies** under those headings.

## Sidebar

`src/configs/sdk-sidebar.ts` reads each language `_nav.json` via `buildLanguageGroup()`.

| Change       | Edit                                                 |
| ------------ | ---------------------------------------------------- |
| New method   | Client page MDX only                                 |
| New client   | Page + `_nav.json` entry                             |
| New language | Folder + `_nav.json` + one `buildLanguageGroup` call |

## Authoring

1. Outcome-focused intro (“Manage your customer organizations”).
2. Accessor in backticks (`organization` on `ScalekitClient`).
3. Each method: `### \`name\``, one-liner, ClassBrowser and/or MethodParams, example (no line numbers).
4. Labels: sentence case product objects (**Organizations**), not raw identifiers.

## REFERENCE.md

Build still fetches each SDK’s `REFERENCE.md` into `sdk-references`. Primary UI is these pages/partials; the collection remains for footer metadata and future parse/inject.

## Mobile SDKs (Expo / iOS)

Collapsible language group with a **single** child page (Quickstart). Section headings live in the **right TOC**, not the left sidebar:

```text
▾ Expo SDK
    Quickstart         → /sdks/expo/   (one page)
                        right TOC: Installation, Provider setup, useScalekit, Changelog
▾ iOS SDK
    Quickstart         → /sdks/ios/
```

Do not list guide sections under the left collapsible. Add ClassBrowser only if a real multi-client API surface appears.

## Deprecations

- Prefer ClassBrowser for method chrome; **keep** `MethodParams` / `MethodReturns` when the table UX fits.
