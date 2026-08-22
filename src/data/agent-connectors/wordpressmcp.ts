import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'wordpressmcp_wpcom_ai_agent_sites_list',
    description: `Lists public production WordPress.com sites whose owners enabled AI Agent Access. Use this when the user asks to list, find, discover, or show sites/blogs that opted into AI agents, AI Agent Access, Blog Talks Back, or sites available for Jetpack Search Voice. Pass query or keywords to filter by what a site is about, matched against existing site metadata like title, description, site vertical, and site intent. This is the discovery/listing tool; it does not search within a blog. Page with after_blog_id/per_page until pagination.has_more is false.`,
    params: [
      {
        name: 'after_blog_id',
        type: 'integer',
        required: false,
        description: `Keyset cursor into the AI Agent Access discovery index. Returns sites with blog_id strictly greater than this value. Use pagination.next_after_blog_id from the previous response when pagination.has_more is true; omit or pass 0 to start from the beginning.`,
      },
      {
        name: 'keywords',
        type: 'array',
        required: false,
        description: `Optional topic keywords to filter opted-in sites by. Matched against existing site metadata including title, description, site_vertical, site_intent, and vertical stickers.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of sticker-indexed site candidates to evaluate per page. Returned sites can be fewer because private, staging, test, coming-soon, and otherwise ineligible candidates are filtered out.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Optional natural-language topic query for discovering opted-in sites, such as "food blogs", "education", or "newsletter". Matched against existing site metadata, not post content.`,
      },
    ],
  },
  {
    name: 'wordpressmcp_wpcom_checkout_url',
    description: `Use this to generate a WordPress.com checkout link — for plan purchases, domain registrations, or subscription renewals. Returns a ready-to-use checkout_url the user can open to complete the transaction. Three modes (provide exactly one): (1) "products" — an array of up to 10 items with "product_slug" (plus optional "meta" for domain names and "quantity" for per-seat plans) to start a new checkout; optionally pass "wpcom_site" to tie the checkout to an existing site. (2) "subscription_id" — direct renewal when the subscription ID is known. (3) "renewal_product" + "wpcom_site" — direct renewal when only the product (slug or ID) and the site are known; the tool resolves the active subscription. For plan slugs, prefer those returned by wpcom/plans-list. Premium's plan slug is "value_bundle" (underscore); all other plan slugs use hyphens.`,
    params: [
      {
        name: 'products',
        type: 'array',
        required: false,
        description: `Products to add to the cart for a new purchase. Provide exactly one of: products, subscription_id, or renewal_product.`,
      },
      {
        name: 'renewal_product',
        type: 'string',
        required: false,
        description: `Product slug or numeric product ID to renew. Requires "wpcom_site". Looks up the current user's active subscription for this product on the specified site.`,
      },
      {
        name: 'subscription_id',
        type: 'integer',
        required: false,
        description: `Store subscription ID for a direct renewal URL. Use when the ID is known.`,
      },
      {
        name: 'wpcom_site',
        type: 'string',
        required: false,
        description: `WordPress.com site identifier (numeric blog ID or site URL/slug). Required with "renewal_product". Optional with "products" to bind the checkout to an existing site.`,
      },
    ],
  },
  {
    name: 'wordpressmcp_wpcom_domain_purchase',
    description: `Search for available domains and generate checkout links for registration on WordPress.com. When a user mentions wanting a website, blog, online presence, or describes a project, brand, or topic, proactively generate creative domain name candidates — include keyword variations, brandable combinations, and abbreviations across multiple TLDs (.com, .io, .dev, .net, .org, .blog). Check up to 20 at once. Enable include_suggestions for registrar-powered alternatives when domains are taken. Present available domains as a list with: domain name, price (highlight sale prices), and a clickable checkout URL so the user can complete the purchase. Group unavailable domains separately.`,
    params: [
      {
        name: 'domains',
        type: 'array',
        required: true,
        description: `Domain names to check (max 20). Generate creative candidates based on user context — keywords, brand names, abbreviations — across multiple TLDs.`,
      },
      {
        name: 'include_suggestions',
        type: 'boolean',
        required: false,
        description: `When true, include alternative domain suggestions with pricing for unavailable domains.`,
      },
      {
        name: 'suggestions_count',
        type: 'integer',
        required: false,
        description: `Number of suggestions to return per unavailable domain (requires include_suggestions). Defaults to 5, maximum 15.`,
      },
      {
        name: 'wpcom_site',
        type: 'string',
        required: false,
        description: `Optional WordPress.com site ID or URL. When provided, checkout links will associate the domain with this site.`,
      },
    ],
  },
  {
    name: 'wordpressmcp_wpcom_domain_restore_default_dns_records',
    description: `Restore the WordPress.com defaults for a single custom domain. With record_type "A", replaces the apex A records with the WordPress.com default IPs and removes any apex AAAA records (handy after a DNS misconfiguration that broke pointing the bare domain at WordPress.com). With record_type "CNAME", replaces the www CNAME with one pointing back at the apex (e.g. www → example.com). Changes go into effect only if the domain uses the WordPress.com name servers — for domains pointed at a third-party DNS provider, the records must be managed at that provider. Verify has_wpcom_nameservers and can_manage_dns_records are both true via wpcom/domain-details before calling. The caller must have manage_options on the site the domain is connected to. To inspect the resulting records, call wpcom/domain-dns-records. Always check domain_status via wpcom/user-domains first; if it is not "active", mention that to the user — expired domains may not resolve even when DNS and nameservers look correct.`,
    params: [
      {
        name: 'domain',
        type: 'string',
        required: true,
        description: `The domain name to restore DNS defaults for (e.g. example.com).`,
      },
      {
        name: 'record_type',
        type: 'string',
        required: true,
        description: `Which default to restore. "A" restores the apex A records to the WordPress.com defaults and removes any apex AAAA records. "CNAME" restores the www CNAME so that www points back at the apex.`,
      },
    ],
  },
  {
    name: 'wordpressmcp_wpcom_domain_set_mail_service',
    description: `Configure DNS records on a domain for an external mail service (Google Workspace, iCloud Mail, Office 365, or Zoho Mail) by applying the provider DNS template in one step. Supply the verification token the provider asked you to add to your DNS as proof of domain ownership. The caller must have manage_options on the site the domain is connected to. Changes only take effect when the domain uses the WordPress.com nameservers — for domains pointed at a third-party DNS provider, the records must be applied at that provider. Confirm has_wpcom_nameservers and can_manage_dns_records via wpcom/domain-details before calling. For Google Workspace, DKIM is optional: pass dkim_selector and dkim_txt_record together to add the DKIM record, or omit both to set up verification, SPF and MX only. The user generates those two values in the Google Admin console, where the default selector is "google". To see what records were applied, call wpcom/domain-dns-records afterwards. Always check domain_status via wpcom/user-domains first; if it is not "active", mention that to the user — expired domains may not resolve even when DNS and nameservers look correct.`,
    params: [
      {
        name: 'domain',
        type: 'string',
        required: true,
        description: `The domain name to configure (e.g. example.com).`,
      },
      {
        name: 'mail_service',
        type: 'string',
        required: true,
        description: `The external mail service to set up.`,
      },
      {
        name: 'verification_token',
        type: 'string',
        required: true,
        description: `The verification token supplied by the email provider — for "google-workspace" - token like "google-site-verification=..."; for "icloud-mail" - token like "apple-domain=..."; for "office-365" - token like "MS=ms..."; for "zoho-mail" token like "zb...".`,
      },
      {
        name: 'dkim_selector',
        type: 'string',
        required: false,
        description: `Optional, "google-workspace" only. The DKIM selector shown next to the DKIM record in the Google Admin console — "google" unless the user changed it. Send it together with dkim_txt_record.`,
      },
      {
        name: 'dkim_txt_record',
        type: 'string',
        required: false,
        description: `Optional, "google-workspace" only. The DKIM TXT record value the user copies from the Google Admin console under Apps > Google Workspace > Gmail > Authenticate email. Send it together with dkim_selector.`,
      },
    ],
  },
  {
    name: 'wordpressmcp_wpcom_domain_update_dns_records',
    description: `Add or remove DNS records (A, AAAA, ALIAS, CAA, CNAME, MX, NS, SRV, TXT) for a single custom domain. Supply two arrays: records_to_add (records to create) and records_to_remove (records to delete, matched against existing records by their fields). Changes go into effect only if the domain uses the WordPress.com name servers — for domains pointed at a third-party DNS provider, the records must be managed at that provider. The ability verifies the nameservers itself: when the domain does not use the WordPress.com nameservers the update is refused with status wpcom_nameservers_required and no records are changed — relay the message field to the user, and only set apply_without_wpcom_nameservers to true if the user wants to prepare the WordPress.com zone before switching nameservers. Verify can_manage_dns_records is true via wpcom/domain-details before calling. Root NS records on domains registered with WordPress.com cannot be modified. The caller must have manage_options on the site the domain is connected to. To inspect the current records first, call wpcom/domain-dns-records. Always check domain_status via wpcom/user-domains first; if it is not "active", mention that to the user — expired domains may not resolve even when DNS and nameservers look correct.`,
    params: [
      {
        name: 'domain',
        type: 'string',
        required: true,
        description: `The domain name to update DNS records for (e.g. example.com).`,
      },
      {
        name: 'apply_without_wpcom_nameservers',
        type: 'boolean',
        required: false,
        description: `By default the update is refused when the domain does not use the WordPress.com nameservers, because the records would not take effect. Set to true to apply the records anyway — only after telling the user the records stay dormant until the nameservers of the domain point to WordPress.com (e.g. to prepare the zone before a nameserver switch).`,
      },
      {
        name: 'records_to_add',
        type: 'array',
        required: false,
        description: `DNS records to create. Each record must specify type and the fields required by that type (see item schema).`,
      },
      {
        name: 'records_to_remove',
        type: 'array',
        required: false,
        description: `DNS records to remove. Each record is matched against existing records by its fields, so supply the same field values that the read ability returned for the record you want to remove. To remove a protected record (e.g. the default A records on the apex, where protected_field is true in the read response), include protected_field: true along with type and name; this removes the entire protected rrset rather than matching by data.`,
      },
    ],
  },
  {
    name: 'wordpressmcp_wpcom_domain_update_nameservers',
    description: `Set the nameservers for a single custom domain. Only works for domains registered with WordPress.com — for connected/mapped domains the nameservers are managed at the external registrar and this ability will return a domain_not_registered_with_wpcom error. Confirm eligibility via can_manage_name_servers on wpcom/domain-details before calling. Provide between 2 and 13 valid nameserver hostnames as plain strings (e.g. ["ns1.example.com", "ns2.example.com"]). The caller must have manage_options on the site the domain is connected to. Root NS records on domains registered with WordPress.com may be subject to additional restrictions (e.g. during TLD maintenance). To inspect the current nameservers first, call wpcom/domain-get-nameservers. Always check domain_status via wpcom/user-domains first; if it is not "active", mention that to the user — expired domains may not resolve even when DNS and nameservers look correct.`,
    params: [
      {
        name: 'domain',
        type: 'string',
        required: true,
        description: `The domain name to update nameservers for (e.g. example.com).`,
      },
      {
        name: 'nameservers',
        type: 'array',
        required: true,
        description: `The desired nameservers as an array of hostname strings. Must contain between 2 and 13 distinct valid nameserver hostnames.`,
      },
    ],
  },
  {
    name: 'wordpressmcp_wpcom_mcp_account',
    description: `Manage the current user's WordPress.com account — profile, notifications, achievements, domains, subscriptions, connections, and security. To list all your sites, use the standalone wpcom-user-sites tool. Workflow: "list" to discover available operations, "describe" for parameter schema, "execute" to run. Always share results with the user.

SAFETY PROTOCOL: Before ANY write operation (profile.update, notifications.update), you MUST: (1) Describe exactly what you plan to change. (2) Ask the user for confirmation and wait for their response. Never auto-execute write operations without user approval.`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: true,
        description: `The operation to perform: "list" to discover available operations, "describe" to get the schema for a specific operation, "execute" to run an operation.`,
      },
      {
        name: 'operation',
        type: 'string',
        required: false,
        description: `The operation name (required for describe/execute). Format: "resource.action" (e.g., "profile.get", "notifications.update"). Use action "list" to see all available operations.`,
      },
      {
        name: 'params',
        type: 'object',
        required: false,
        description: `Operation parameters (required for execute). Use action "describe" first to see available parameters for the operation.`,
      },
      {
        name: 'wpcom_site',
        type: 'string',
        required: false,
        description: `Optional site identifier, passed through to sub-abilities that need it (e.g., notifications scoped to a specific site). Not required at the account facade level.`,
      },
    ],
  },
  {
    name: 'wordpressmcp_wpcom_mcp_content_authoring',
    description: `Manage content on WordPress.com sites — posts, pages, media, comments, taxonomies, and patterns. For site infrastructure (settings, plugins, users), use wpcom-mcp-site instead. Workflow: "list" to discover operations, "describe" for parameter schema, "execute" to run. To change one part of an existing page or post without rewriting the whole thing, use the block-level (section) operations (page-sections.* / post-sections.*) instead of pages.update / posts.update; they edit a single top-level block in place. Reserve pages.update / posts.update for new content and full rewrites. For design-aligned content: fetch wpcom-mcp-site-editor-context (theme.active → theme.presets) first, then browse patterns here (patterns.list → patterns.get), customize with preset slugs, and create as draft. Show edit/preview links after create/update. Always share results with the user.

SAFETY PROTOCOL: Before ANY create, update, or delete operation, you MUST: (1) Describe exactly what you plan to do. (2) Ask the user for confirmation and wait for their response. (3) Re-call with \`user_confirmed: true\` (boolean) in params. Never auto-execute write operations without user approval.`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: true,
        description: `The operation to perform: "list" to discover available operations, "describe" to get the schema for a specific operation, "execute" to run an operation. For create/update/delete operations, execute requires \`user_confirmed: true\` (boolean) in params.`,
      },
      {
        name: 'wpcom_site',
        type: 'string',
        required: true,
        description: `The site to manage. Can be a site ID (numeric) or URL (e.g., "myblog.wordpress.com"). Use wpcom-user-sites to list sites the user has access to.`,
      },
      {
        name: 'operation',
        type: 'string',
        required: false,
        description: `The operation name (required for describe/execute). Format: "resource.action" (e.g., "posts.create", "tags.delete"). Use action "list" to see all available operations.`,
      },
      {
        name: 'params',
        type: 'object',
        required: false,
        description: `Operation parameters (required for execute). Use action "describe" first to see available parameters for the operation. For create/update/delete operations, include \`user_confirmed: true\` (boolean) after the user has confirmed.`,
      },
    ],
  },
  {
    name: 'wordpressmcp_wpcom_mcp_create_site',
    description: `Create a new WordPress.com site. This tool is the ONLY entry point the agent should use to create a site.

CORE RULES (apply without calling site.instructions):
- The subdomain is DERIVED from \`title\` automatically. NEVER ask the user for a URL slug, subdomain, or custom site address — it is not an input field. Show a subdomain preview derived from the title for confirmation only.
- Ask ONE direct question for the title. Do NOT ask about site type, audience, tone, topic, or goals — those are NOT required to create a site.
- After the site is created, share the URL and STOP. Do NOT auto-chain into theme picking or homepage authoring; offer them only if the user asks.

WORKFLOW:
1. action="execute", operation="site.instructions" (no params) — returns the runbook: field schema, conversational rules, confirmation policy (including the deterministic subdomain-derivation rule), the handoff to site.provision, and a list of next actions available after creation. When the user has not enabled the create-site capability, the runbook also surfaces a \`preflight_required\` block — walk the user to the link in that block BEFORE asking any interview question. Call site.instructions ONCE, up front.
2. Ask the user a single direct question for the title (or detect test-site intent — see the runbook rules — and skip to step 3 with "Test site" as the title).
3. Derive the subdomain slug from \`title\` locally per the \`subdomain_derivation_rule\` in the runbook (lowercase, strip diacritics, remove every non-alphanumeric character). Then call action="execute", operation="subdomain.check", params: { slugs: [ <derived slug> ] }. Read the first entry in \`results\`; it reports whether the slug is valid + available, plus the \`would_be_url\` the user will actually receive (which may carry a numeric suffix when the base slug is taken). Show the user the actual \`results[0].would_be_url\` verbatim before asking for title confirmation. If \`results[0].is_valid\` is false (empty slug, blacklisted, invalid characters), ask the user for a different title and re-derive — do NOT proceed to site.provision.
4. (Optional) Ask once whether the user wants a short tagline; accept "skip" / "not now" cleanly.
5. Summarize the collected fields — especially the title and the \`would_be_url\` from subdomain.check — and ask for explicit confirmation.
6. action="execute", operation="site.provision", params: { spec: { title: <confirmed title>, [description: <tagline if provided>] }, user_confirmed: true }. \`title\` is the only required field on \`spec\`; \`description\` is the only common optional field. \`user_confirmed\` MUST be the boolean \`true\` (or one of the strings \`"true"\` / \`"yes"\` / \`"on"\` / \`"1"\`) after the user has approved the title and subdomain preview.
7. On success, share the returned site_url and stop. On \`invalid_spec\` errors, the error message lists each offending field on its own line (for example \`- spec.title: missing field\`); fix only the listed fields and retry site.provision. On \`empty_subdomain_after_derivation\` errors, the title strips to an empty subdomain (subdomain.check should have caught this earlier) — ask the user for a different title and retry.

SPEC SHAPE: only \`title\` is required. \`description\` (one-sentence tagline) is optional. \`locale\` is auto-defaulted from the user's account locale.

SAFETY: site.provision creates a real site on the user's account. Only call it after the user has explicitly confirmed the title and subdomain preview.`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: true,
        description: `The STRAP action: "list" to see operations and workflow, "describe" for an operation's schema, "execute" to run an operation.`,
      },
      {
        name: 'operation',
        type: 'string',
        required: false,
        description: `Operation name (required for describe/execute). "site.instructions" returns the runbook; "subdomain.check" reports whether a candidate slug is valid + available (caller derives the slug from title per the runbook rule); "site.provision" creates the site.`,
      },
      {
        name: 'params',
        type: 'object',
        required: false,
        description: `Operation parameters (required for execute). See action="describe" for each operation's schema.`,
      },
    ],
  },
  {
    name: 'wordpressmcp_wpcom_mcp_jetpack_search_voice',
    description: `Returns search results from a public, opted-in blog plus its Guidelines (site + additional) in a single call. Use this only for reader-facing requests to answer from a public blog URL in that blog's voice, for example "Talk to this blog <blog_url>" or "Chat with this blog <blog_url>". Do not use this for private/internal content, WordPress.com site or account management, or owner/admin content operations. Use keyword-focused search queries, then compose answers in the blog author's voice with grounded citations.`,
    params: [
      {
        name: 'blog_url',
        type: 'string',
        required: true,
        description: `Full URL of the blog to search (e.g. https://example.wordpress.com/).`,
      },
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Keyword-focused search query derived from the reader's question. Short, specific, noun-heavy queries work best because this is backed by Jetpack Search rather than semantic retrieval. Prefer place names, post topics, and distinctive terms over conversational filler. If a first call returns no search_results, retry once with a shorter keyword-only query.`,
      },
      {
        name: 'num_results',
        type: 'integer',
        required: false,
        description: `Max number of search results (default 5, max 20).`,
      },
    ],
  },
  {
    name: 'wordpressmcp_wpcom_mcp_plugin_management',
    description: `Manage plugins on a WordPress.com site — list installed plugins, search the marketplace catalog, install / activate / deactivate / update / uninstall. Workflow: "list" to discover operations, "describe" for parameter schema, "execute" to run. plugin.search is account-level and does not require a site; all other operations require wpcom_site. 

SAFETY PROTOCOL: Before ANY write operation (install / activate / deactivate / update / uninstall) you MUST: (1) Describe exactly what you plan to change. (2) Ask the user for confirmation and wait for their response. (3) Pass user_confirmed: true in params for the four standard write operations. plugin.uninstall additionally returns a data-aware preview when called without user_confirmed: true — use that preview to confirm with the user before re-calling with user_confirmed: true.`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: true,
        description: `The operation to perform: "list" to discover available operations, "describe" to get the schema for a specific operation, "execute" to run an operation.`,
      },
      {
        name: 'operation',
        type: 'string',
        required: false,
        description: `The operation name (required for describe/execute). One of: plugin.list, plugin.search, plugin.install, plugin.activate, plugin.deactivate, plugin.update, plugin.uninstall.`,
      },
      {
        name: 'params',
        type: 'object',
        required: false,
        description: `Operation parameters (required for execute). Call describe first to see what each operation expects. For site-scoped operations, pass the target site at the top-level wpcom_site field; the STRAP forwards that authoritative site into the leaf ability input.`,
      },
      {
        name: 'wpcom_site',
        type: 'string',
        required: false,
        description: `The authoritative target site for site-scoped operations. Required for everything except plugin.search (which is account-level). Use this top-level field rather than nesting wpcom_site inside params.`,
      },
    ],
  },
  {
    name: 'wordpressmcp_wpcom_mcp_send_feedback',
    description: `Submit feature requests, bug reports, or general feedback about the WordPress.com and ContextA8c MCP servers to the development team. Feedback is reviewed internally. Suggest this tool when the user encounters errors, expresses frustration, or struggles to accomplish their goal with the available tools.`,
    params: [
      {
        name: 'content',
        type: 'string',
        required: true,
        description: `The feedback message. For bug reports, include what the user was trying to do, what happened, and any relevant context (site URL, tool name, error message). For feature requests, describe the desired behavior and use case. Plain text.`,
      },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `Feedback type: "request" for feature requests, "bug" for bug reports, or "general" for other kinds of feedback.`,
      },
    ],
  },
  {
    name: 'wordpressmcp_wpcom_mcp_site',
    description: `Manage site-level settings and infrastructure for a WordPress.com site — not content (use wpcom-mcp-content-authoring for posts, pages, media). Covers: settings, statistics, plugins, users, activity log, and theme management (theme.list to browse available themes, theme.set to activate one). Use wpcom-user-sites first if you need to find the target site ID. Workflow: "list" to discover operations, "describe" for parameter schema, "execute" to run. Always share results with the user.

SAFETY PROTOCOL: Before ANY write operation (settings.update, theme.set), you MUST: (1) Describe exactly what you plan to change. (2) Ask the user for confirmation and wait for their response. Never auto-execute write operations without user approval.`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: true,
        description: `The operation to perform: "list" to discover available operations, "describe" to get the schema for a specific operation, "execute" to run an operation.`,
      },
      {
        name: 'operation',
        type: 'string',
        required: false,
        description: `The operation name (required for describe/execute). Format: "resource.action" (e.g., "settings.get", "theme.list"). Use action "list" to see all available operations.`,
      },
      {
        name: 'params',
        type: 'object',
        required: false,
        description: `Operation parameters (required for execute). Use action "describe" first to see available parameters for the operation.`,
      },
      {
        name: 'wpcom_site',
        type: 'string',
        required: false,
        description: `The target site for all operations. Can be a site ID (numeric) or URL (e.g., "myblog.wordpress.com"). Required for execute — all site operations need a target site. Use wpcom-user-sites to list sites the user has access to.`,
      },
    ],
  },
  {
    name: 'wordpressmcp_wpcom_mcp_site_editing',
    description: `Read and modify site structure: templates, template parts, navigation menus (classic and block), global styles, and installed themes. Use action "list" to discover operations, "describe" for schema, "execute" to run. SAFETY: Write operations (create/update/delete) require user confirmation — they affect all visitors site-wide. Recommended sequence before any write: fetch current state first (templates.list → templates.get, or navigation.list → navigation.get, or global-styles.get). For FSE block types use site-editor-context blocks.allowed with the site-editing context.`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: true,
        description: `The operation to perform: "list" to discover available operations, "describe" to get the schema for a specific operation, "execute" to run an operation. Write operations require \`user_confirmed: true\` (boolean) in params.`,
      },
      {
        name: 'wpcom_site',
        type: 'string',
        required: true,
        description: `The site to operate on. Can be a site ID (numeric) or URL (e.g., "myblog.wordpress.com"). Use wpcom-user-sites to list sites the user has access to.`,
      },
      {
        name: 'operation',
        type: 'string',
        required: false,
        description: `The operation name (required for describe/execute). Format: "resource.action" (e.g., "templates.list", "navigation.update", "global-styles.get"). Use action "list" to see all available operations.`,
      },
      {
        name: 'params',
        type: 'object',
        required: false,
        description: `Operation parameters (required for execute). Use action "describe" to see available parameters. For create/update/delete operations, include \`user_confirmed: true\` (boolean) after the user has confirmed.`,
      },
    ],
  },
  {
    name: 'wordpressmcp_wpcom_mcp_site_editor_context',
    description: `Query site design context. Operations: theme.active (active stylesheet slug), theme.presets (color palette, fonts, spacing tokens), theme.styles (applied block/element styles), blocks.allowed (registered block types). theme.presets and theme.styles auto-resolve the stylesheet from the active theme if omitted. Use action "list" to discover operations, "describe" for schema, "get" to fetch data. Call this BEFORE wpcom-mcp-content-authoring when building pages or posts — start with theme.active to get the stylesheet slug, then theme.presets for design tokens. Use preset slugs instead of hard-coded values.`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: true,
        description: `The operation to perform: "list" to discover available context operations, "describe" to get the schema for a specific operation, "get" to fetch specific context data.`,
      },
      {
        name: 'wpcom_site',
        type: 'string',
        required: true,
        description: `The site to query context for. Can be a site ID (numeric) or URL (e.g., "myblog.wordpress.com"). Use wpcom-user-sites to list sites the user has access to.`,
      },
      {
        name: 'operation',
        type: 'string',
        required: false,
        description: `The context operation name (required for describe/get). Format: "resource.action" (e.g., "theme.presets", "blocks.allowed"). Use action "list" to see all available operations.`,
      },
      {
        name: 'params',
        type: 'object',
        required: false,
        description: `Operation parameters (optional for get). Use action "describe" to see available parameters for the operation.`,
      },
    ],
  },
  {
    name: 'wordpressmcp_wpcom_mcp_user_management',
    description: `Manage site collaborators on a WordPress.com site. Seven operations:
- user.list — list current collaborators on the site (read-only)
- user.pending-invites — list outstanding invites (read-only)
- user.invite — send a new invite (SENDS REAL EMAIL)
- user.cancel-invite — cancel a pending invite
- user.resend-invite — resend a pending invite (SENDS REAL EMAIL)
- user.change-role — change a collaborator's role (CONFIRMATION REQUIRED)
- user.remove-access — remove a collaborator from this site (CONFIRMATION REQUIRED, IRREVERSIBLE)

Workflow: use action="list" to enumerate the operations and action="describe" to read a schema. Both are read-only. Only use action="execute" when the site owner has asked for a specific change. NEVER call execute on user.invite, user.cancel-invite, or user.resend-invite to demonstrate, explore, or test — each of these reaches a real inbox and writes to the audit log.

REQUIRED INPUTS: if the owner has not provided every required parameter for the operation (recipient email/login for invites, role for invites or role changes, target user id for role changes or removals), do NOT invent values. Ask the owner first.

SAFETY PROTOCOL for user.change-role and user.remove-access: (1) Call execute without user_confirmed and present the preview to the owner. (2) Wait for explicit owner confirmation. (3) Re-call with user_confirmed: true to apply. user.remove-access removes the user from this site only — it does NOT delete their WordPress.com account.

ROLE VALUES: user.invite and user.change-role accept only the five stock WordPress roles (administrator, editor, author, contributor, subscriber). Custom or plugin-introduced roles (e.g. shop_manager, bbp_moderator) are not supported on this surface.

All operations require wpcom_site at the top level of the input.`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: true,
        description: `The operation to perform: "list" to discover available operations, "describe" to get the schema for a specific operation, "execute" to run an operation.`,
      },
      {
        name: 'operation',
        type: 'string',
        required: false,
        description: `The operation name (required for describe/execute). One of: user.list, user.pending-invites, user.invite, user.cancel-invite, user.resend-invite, user.change-role, user.remove-access.`,
      },
      {
        name: 'params',
        type: 'object',
        required: false,
        description: `Operation parameters (required for execute). Call describe first to see what each operation expects. For site-scoped operations pass the target site at the top-level wpcom_site field; the STRAP forwards that authoritative site into the leaf ability input.`,
      },
      {
        name: 'wpcom_site',
        type: 'string',
        required: false,
        description: `The authoritative target site for site-scoped operations. Required for every user-management operation. Use this top-level field rather than nesting wpcom_site inside params.`,
      },
    ],
  },
  {
    name: 'wordpressmcp_wpcom_plans_list',
    description: `Use this to help users select or upgrade WordPress.com hosting. Returns the hosting plan catalogue (Personal, Premium, Business, Ecommerce) with prices in the user's currency and a per-tier feature list (storage, themes, plugins, SFTP/SSH, custom code, online store, etc.) so you can answer questions like "where can I host my website?", "how much does WordPress.com cost?", "can I install plugins?", or "which plan lets me sell products on my site?". For capability questions, compare plan_card_features across tiers to find which tier unlocks the feature the user needs. Pass "wpcom_site" (numeric blog ID or site URL/slug like "example.wordpress.com") to also receive intro offers, downgrade paths, and a ready-to-purchase checkout_url on each row. Without "wpcom_site" checkout_url is null on every row — ask the user which site to upgrade before starting checkout.`,
    params: [
      {
        name: 'currency',
        type: 'string',
        required: false,
        description: `ISO 4217 currency code (e.g. "USD", "EUR"). Defaults to the current user's billing currency.`,
      },
      {
        name: 'interval',
        type: 'string',
        required: false,
        description: `Billing interval. Defaults to "yearly".`,
      },
      {
        name: 'wpcom_site',
        type: 'string',
        required: false,
        description: `Optional WordPress.com site (numeric blog ID or site URL/slug like "example.wordpress.com"). When supplied, intro offers, downgrade paths, and a site-bound checkout_url are included on each plan row. When omitted, the catalogue is returned siteless: plan_card_features and prices in the user's currency are still included; per-site enrichment is omitted; checkout_url is null on every row.`,
      },
    ],
  },
  {
    name: 'wordpressmcp_wpcom_user_sites',
    description: `List the authenticated user's accessible sites across WordPress.com and self-hosted Jetpack-connected sites. Returns blog IDs, URLs, names, platform type, MCP access status, and optional metrics. Use this to discover which site IDs exist before calling site-scoped abilities.`,
    params: [
      {
        name: 'environment',
        type: 'string',
        required: false,
        description: `Filter by site environment. "production" excludes staging/test/deleted/migration-hidden sites (default). "staging" shows only staging sites. "test" shows only test sites. "all" includes everything.`,
      },
      { name: 'filters', type: 'object', required: false, description: `No description.` },
      {
        name: 'include_metrics',
        type: 'boolean',
        required: false,
        description: `Include site metrics in the response.`,
      },
      {
        name: 'ownership',
        type: 'string',
        required: false,
        description: `Filter by site ownership. Only "user" is available - shows your accessible sites.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Page number for pagination.`,
      },
      {
        name: 'per_page',
        type: 'integer',
        required: false,
        description: `Number of sites per page.`,
      },
      {
        name: 'platform',
        type: 'string',
        required: false,
        description: `Filter by platform type. "simple" shows classic WordPress.com sites. "atomic" shows WordPress.com sites with SSH/SFTP access. "jetpack" shows self-hosted Jetpack-connected sites. "all" shows every platform type.`,
      },
      { name: 'sort', type: 'object', required: false, description: `No description.` },
    ],
  },
]
