import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'aktapromcp_account_status',
    description: `Report the current user's plan tier and credit balance.

Free. No arguments — identity is taken from the authenticated API key.
Call this when the user asks about their plan, credits, or limits, and
consult it before attempting Subscription/Enterprise-only tools
(headcount_trends, website_traffic, employee_reviews, product_reviews,
job_posts, social_posts) or enterprise-only enrichment sections
(Funding Detail, M&A and Investment) to pre-empt a 403.

Returns: is_enterprise (bool), package_type (top_up | subscription |
enterprise), credit_balance (remaining credits), currency.`,
    params: [],
  },
  {
    name: 'aktapromcp_company_data',
    description: `Enrich a company with the requested sections, returned as Markdown.

akta-pro renders the (large, deeply-nested) company data into clean Markdown
server-side. Sections (credits): firmographic 2, business_model 2,
company_assessment 2, trust_signal 0.5, company_hierarchy 0.5,
digital_presence 0.5, financial_estimate 0.5, location 0.5,
management_profile 1.5, product_offering 2, strategic_signal 1.5,
customer_profile 1, industry 1, technology 2, funding_detail 3
(enterprise-only), mna_and_investment 5 (enterprise-only).

The two enterprise-only sections are skipped (not an error) when the
caller isn't on an Enterprise plan; the returned Markdown notes any that
were dropped.

Prerequisite: \`company\` must be an akta-pro uuid from company_search
(free). Names and websites are rejected.`,
    params: [
      {
        name: 'company',
        type: 'string',
        required: true,
        description: `akta-pro company uuid — the 7-character id from company_search (e.g. '00000l1'). This is the ONLY accepted form: company names ('Canva') and website domains ('canva.com') are rejected. Always call company_search first (it's free) and pass the \`uuid\` of the candidate you want; a domain can map to several distinct entities, so picking the right uuid is your decision to make, not the API's.`,
      },
      {
        name: 'sections',
        type: 'array',
        required: true,
        description: `One or more data sections to fetch. You MUST choose sections explicitly — there is no 'all'. Each section is billed separately. funding_detail and mna_and_investment are enterprise-only; they're silently skipped (not an error) for non-enterprise callers.`,
      },
    ],
  },
  {
    name: 'aktapromcp_company_data_concise',
    description: `Return a condensed company overview (no section selection).

akta-pro returns a slimmed JSON with the fluff redacted — much smaller than
full enrichment. Intended flat cost 8 credits.

Prerequisite: \`company\` must be an akta-pro uuid from company_search
(free). Names and websites are rejected.`,
    params: [
      {
        name: 'company',
        type: 'string',
        required: true,
        description: `akta-pro company uuid — the 7-character id from company_search (e.g. '00000l1'). This is the ONLY accepted form: company names ('Canva') and website domains ('canva.com') are rejected. Always call company_search first (it's free) and pass the \`uuid\` of the candidate you want; a domain can map to several distinct entities, so picking the right uuid is your decision to make, not the API's.`,
      },
    ],
  },
  {
    name: 'aktapromcp_company_search',
    description: `Resolve a company by name or website to its akta-pro identifiers.

ALWAYS call this first. Every other company tool accepts ONLY the \`uuid\`
returned here — names and websites are rejected — so this is also the
only way to check whether a company exists in akta-pro at all. Free
(0 credits). Returns candidates with uuid, name, website,
product_category, and public/private status.

Results are ranked but not disambiguated: one website can map to several
distinct entities (stripe.com → Stripe, Stripe Capital, Stripe Atlas).
Pick the candidate that matches the user's intent, and if none does, say
the company isn't covered rather than passing a guessed uuid.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Company name or website, e.g. 'Canva' or 'canva.com'. akta-pro auto-detects the input type.`,
      },
    ],
  },
  {
    name: 'aktapromcp_employee_reviews',
    description: `Employee reviews: overall + dimension-level ratings and individual
reviews (Glassdoor et al.). 1.5 credits per 50 reviews.
Subscription/Enterprise only.

Prerequisite: \`company\` must be an akta-pro uuid from company_search
(free). Names and websites are rejected.`,
    params: [
      {
        name: 'company',
        type: 'string',
        required: true,
        description: `akta-pro company uuid — the 7-character id from company_search (e.g. '00000l1'). This is the ONLY accepted form: company names ('Canva') and website domains ('canva.com') are rejected. Always call company_search first (it's free) and pass the \`uuid\` of the candidate you want; a domain can map to several distinct entities, so picking the right uuid is your decision to make, not the API's.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Max reviews to return (max 100).`,
      },
      { name: 'offset', type: 'integer', required: false, description: `Pagination offset.` },
    ],
  },
  {
    name: 'aktapromcp_generate_company_list',
    description: `Run a company list: the companies matching your filters.

Cost: 1.5 credits per call that returns companies + 0.2 per company, so
25 companies is 6.5 credits. A query matching nothing is FREE. The cost
does not depend on the fields: this tool always returns the same
identifying fields per company and never full enrichment, so screening a
list is cheap and predictable. For depth, call company_data on the few
uuids that matter — that is billed per section, on those companies only.

Prerequisites, in order: list_filters() to see what exists, then
get_filter_values() for every filter that has a \`dropdown_type\`. Use those
values VERBATIM and never write one from memory — these are exact strings
from akta-pro's data, so an invented value matches zero companies instead
of erroring. Key this call by each entry's \`filter\` — the one name that
field has everywhere.

Send at least one selective filter. A very broad or unfiltered query is
rejected, not slow — it exhausts the backend's query timeout.

Always read \`warnings\` in the result. A value that was dropped there means
the list is BROADER than what the user asked for, which otherwise looks
exactly like a good answer; a \`coerced\` entry means a value was normalised
to its canonical form (harmless, but worth trusting over your own spelling
next time).

A filter key that isn't in list_filters() is an error, not a warning — the
call fails with the offending key named and costs nothing, so fix the key
and retry rather than guessing.

Each company comes back with uuid, name, website, product_category,
company_type and hq_country — that is the whole row; there is no option to
return more per company. Feed a \`uuid\` straight into company_data /
news_signals for depth on one of them.
\`total_count\` saturates at 500, meaning "500 or more" — it is also the
deepest page reachable, so narrow the filters rather than paging past it.`,
    params: [
      {
        name: 'filters',
        type: 'object',
        required: true,
        description: `The filters to apply, keyed by the \`filter\` from each list_filters() entry (its enrichment path). E.g. {"firmographic.company_type": "Private", "location.hq.country": ["USA"], "firmographic.founded_year": {"gte": 2018}}. Filters sharing a \`same_element_group\` must all match the SAME sub-object. Ranges are {"gte": .., "lte": ..} (inclusive, either bound optional), booleans true/false, name filters a case-insensitive substring. At least one filter is REQUIRED.`,
      },
      { name: 'limit', type: 'integer', required: false, description: `Companies to return.` },
      { name: 'offset', type: 'integer', required: false, description: `Pagination offset.` },
      {
        name: 'sort_by',
        type: 'string',
        required: false,
        description: `Sort field. Defaults to relevance. Band fields (revenue_estimate, valuation_estimate, employee_range) sort by band magnitude, not alphabetically.`,
      },
      {
        name: 'sort_order',
        type: 'string',
        required: false,
        description: `Sort direction — desc gives highest revenue / most funding / largest headcount / most recently founded first. Ignored while sort_by is relevance.`,
      },
    ],
  },
  {
    name: 'aktapromcp_get_filter_values',
    description: `Get the allowed values for one or more filters. Free (0 credits).

Two kinds of result:
  * A fixed list -> [{label, value}]. Use \`value\` verbatim; \`label\` is
    just the human-readable form. \`query\` substring-filters the list.
  * A searched taxonomy (industry.industry, industry.naics,
    industry.sic; investors resolve to companies) -> ranked
    matches with a \`code\` and a similarity score. \`query\` is REQUIRED, and
    you use the \`code\`. For \`industry\`, \`level\` picks how deep in the
    taxonomy to search — leave it at the ['l4'] default for a specific
    niche, and pass ['all'] for a broad sector, since a broader code
    matches every company beneath it in the hierarchy.

NEVER write a value from memory. These are exact strings from akta-pro's
data, and a value that merely looks plausible matches zero companies
instead of failing — so a made-up value silently ruins the whole query. If
nothing returned clearly means what the user asked for, leave that filter
out rather than forcing a weak match.

Check \`truncated\` / \`total_available\`: if what you need isn't in the list,
re-query with a narrower \`query\`.`,
    params: [
      {
        name: 'lookups',
        type: 'array',
        required: true,
        description: `The filters whose values you want — resolve everything in ONE call (1-25 lookups). Take each \`dropdown_type\` from a list_filters() entry.`,
      },
    ],
  },
  {
    name: 'aktapromcp_headcount_trends',
    description: `LinkedIn-sourced headcount: total employees, historical growth, and
breakdown by function. 2.5 credits. Subscription/Enterprise only.

Prerequisite: \`company\` must be an akta-pro uuid from company_search
(free). Names and websites are rejected.`,
    params: [
      {
        name: 'company',
        type: 'string',
        required: true,
        description: `akta-pro company uuid — the 7-character id from company_search (e.g. '00000l1'). This is the ONLY accepted form: company names ('Canva') and website domains ('canva.com') are rejected. Always call company_search first (it's free) and pass the \`uuid\` of the candidate you want; a domain can map to several distinct entities, so picking the right uuid is your decision to make, not the API's.`,
      },
    ],
  },
  {
    name: 'aktapromcp_industry_search',
    description: `Resolve a free-text industry to akta-pro industry codes.

Free (0 credits). Use the returned \`code\` values as the \`industry\` filter
in news_signals. Returns code, industry_name, and similarity score.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Free-text industry or topic, e.g. 'warehouse automation'. Returns matching industry codes ranked by similarity.`,
      },
    ],
  },
  {
    name: 'aktapromcp_job_posts',
    description: `Live LinkedIn/Indeed job posts: title, location, description,
compensation, experience level, and key skills. 3 credits.
Subscription/Enterprise only.

Prerequisite: \`company\` must be an akta-pro uuid from company_search
(free). Names and websites are rejected.`,
    params: [
      {
        name: 'company',
        type: 'string',
        required: true,
        description: `akta-pro company uuid — the 7-character id from company_search (e.g. '00000l1'). This is the ONLY accepted form: company names ('Canva') and website domains ('canva.com') are rejected. Always call company_search first (it's free) and pass the \`uuid\` of the candidate you want; a domain can map to several distinct entities, so picking the right uuid is your decision to make, not the API's.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Max job listings to return.`,
      },
      { name: 'offset', type: 'integer', required: false, description: `Pagination offset.` },
    ],
  },
  {
    name: 'aktapromcp_list_filters',
    description: `List the filters available for building a company list. Free.

Call this FIRST whenever the request is for a SET of companies rather than
one named company. Each entry gives:
  filter             the field's enrichment path — the key to use in
                     your output, and the only name it has
  description        what it means / when to use it
  value_shape        the JSON shape to emit
  how_to_get_values  either "look up with /list/options/" or
                     "supply the value directly"
  dropdown_type      present only when a lookup is available; always the
                     same string as \`filter\`
  same_element_group present only for a repeated sub-object; every filter
                     sharing a group must match the SAME element

Next step: for every filter you picked that has a \`dropdown_type\`, call
get_filter_values() and use the returned values verbatim. Filters without
one take their value directly — ranges as {"gte": …, "lte": …} (inclusive,
either bound optional), booleans as true/false, name filters as a string
(case-insensitive substring, so a surname or partial name works).`,
    params: [],
  },
  {
    name: 'aktapromcp_news_detail',
    description: `Fetch the full article body for specific news id(s) from news_signals.

Use this after news_signals when you need the complete text of particular
articles — pass their \`id\`s here. Returns up to 10 articles with the same
fields as full_enrichment plus \`full_text\`. Cost: 0.1 credits per call +
0.01 per article.`,
    params: [
      {
        name: 'news_ids',
        type: 'array',
        required: true,
        description: `News article id(s) from news_signals results. Up to 10 per call.`,
      },
    ],
  },
  {
    name: 'aktapromcp_news_signals',
    description: `Fetch a list of news signals by company, industry, topic, or title (JSON).

Typically provide one of \`company\`, \`primary_company\`, \`industry\`,
\`query\`, or \`title\` to anchor the search. Cost: 0.1 credits per call +
0.01 per article.

\`company\` matches any article mentioning the company; \`primary_company\`
keeps only the articles the company is actually the subject of. Prefer
\`primary_company\` for "news about X" / company-monitoring requests, and
\`company\` when broad mention coverage matters. They are mutually
exclusive — passing both is an error.

To filter by news type/topic (e.g. "only product-related news"), call
news_types() first to find the matching tag code(s), then pass them as
type_codes. To filter by industry/sector, resolve codes with
industry_search and pass them as \`industry\` — don't fall back to \`query\`
for company or industry topics.

Default to the compact list (full_enrichment=False) — it's enough to read
and triage results. Don't set full_enrichment=True unless the user
explicitly needs every field on every article.

This list never includes full article text (kept compact). Every result
carries an \`id\`; pass those ids to \`news_detail\` to retrieve the complete
article body for the ones you care about.`,
    params: [
      {
        name: 'blacklisted',
        type: 'array',
        required: false,
        description: `Publisher domains to exclude (e.g. 'example.com').`,
      },
      {
        name: 'company',
        type: 'string',
        required: false,
        description: `News mentioning a specific company (anywhere in the article). akta-pro company uuid — the 7-character id from company_search (e.g. '00000l1'). This is the ONLY accepted form: company names ('Canva') and website domains ('canva.com') are rejected. Always call company_search first (it's free) and pass the \`uuid\` of the candidate you want; a domain can map to several distinct entities, so picking the right uuid is your decision to make, not the API's.`,
      },
      {
        name: 'countries',
        type: 'array',
        required: false,
        description: `Filter by the country of the event. ISO country codes (e.g. 'USA', 'GBR').`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: false,
        description: `End of date range, YYYY-MM-DD. Default today.`,
      },
      {
        name: 'entity_event',
        type: 'array',
        required: false,
        description: `Filter to articles mentioning these event names.`,
      },
      {
        name: 'entity_location',
        type: 'array',
        required: false,
        description: `Filter to articles mentioning these locations.`,
      },
      {
        name: 'entity_person',
        type: 'array',
        required: false,
        description: `Filter to articles mentioning these people (names).`,
      },
      {
        name: 'entity_product',
        type: 'array',
        required: false,
        description: `Filter to articles mentioning these product names.`,
      },
      {
        name: 'full_enrichment',
        type: 'boolean',
        required: false,
        description: `Keep False (the default) for almost all queries — it returns a compact list (id, title, AI summary, URL, date, publisher), which is enough to read and triage results. Only set True if the user explicitly needs the full per-article metadata (industries, types, entities, company mentions, sentiment) for every result; it is much larger, especially for broad topic/query searches. Do NOT default to True.`,
      },
      {
        name: 'group_articles',
        type: 'boolean',
        required: false,
        description: `Group near-duplicate articles from the same event.`,
      },
      {
        name: 'iab_codes',
        type: 'array',
        required: false,
        description: `Filter by IAB content taxonomy codes.`,
      },
      {
        name: 'industry',
        type: 'string',
        required: false,
        description: `Comma-separated industry codes to filter by. For ANY industry / sector / market news request, FIRST call industry_search to resolve the industry to its code(s), then pass them here — this is far more precise than a free-text query. Prefer this over \`query\` whenever the topic is an industry or market.`,
      },
      {
        name: 'iptc_codes',
        type: 'array',
        required: false,
        description: `Filter by IPTC media topic codes.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Max articles to return (max 1000).`,
      },
      {
        name: 'naics_codes',
        type: 'array',
        required: false,
        description: `Filter by NAICS industry classification codes.`,
      },
      {
        name: 'news_score',
        type: 'string',
        required: false,
        description: `Filter by news relevance/quality tier.`,
      },
      { name: 'offset', type: 'integer', required: false, description: `Pagination offset.` },
      {
        name: 'primary_company',
        type: 'string',
        required: false,
        description: `Like \`company\`, but returns ONLY articles where this company is the PRIMARY company the article is about — it drops articles that merely mention it in passing. Use this when the user wants news *about* a company rather than every article name-dropping it. Cannot be combined with \`company\`. akta-pro company uuid — the 7-character id from company_search (e.g. '00000l1'). This is the ONLY accepted form: company names ('Canva') and website domains ('canva.com') are rejected. Always call company_search first (it's free) and pass the \`uuid\` of the candidate you want; a domain can map to several distinct entities, so picking the right uuid is your decision to make, not the API's.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Open-ended free-text topic, e.g. 'crude oil prices'. Use ONLY as a last resort — if the request is about a specific company use \`company\` (via company_search), and if it's about an industry/sector/market use \`industry\` (via industry_search). Don't default to query for company or industry topics.`,
      },
      {
        name: 'sentiment',
        type: 'string',
        required: false,
        description: `Filter by article sentiment.`,
      },
      {
        name: 'sic_codes',
        type: 'array',
        required: false,
        description: `Filter by SIC industry classification codes.`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: false,
        description: `Start of date range, YYYY-MM-DD. Non-enterprise plans are limited to ~6 months back.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Search by text in the article title.`,
      },
      {
        name: 'type_codes',
        type: 'array',
        required: false,
        description: `Filter by news type/topic. These are tag codes from news_types() (e.g. 'SD01' for product launches, 'CM03' for M&A). To honor a request like 'only product-related news', call news_types() first, pick the matching code(s), and pass them here. Omit for all types.`,
      },
    ],
  },
  {
    name: 'aktapromcp_news_types',
    description: `List the news-type taxonomy (tag codes) for filtering news_signals.

Call this FIRST whenever the user wants a specific kind of news — e.g.
"product-related", "M&A", "layoffs", "funding". Map their intent to the
matching code(s) below, then pass them to
\`news_signals(type_codes=[…])\`. Free, no credits. Codes are grouped by
category (e.g. product launches = SD01, M&A = CM03, layoffs = WT02).`,
    params: [],
  },
  {
    name: 'aktapromcp_product_reviews',
    description: `Product catalog and per-product reviews (G2 et al.). Call once without
\`products\` to get the catalog + product \`id\`s, then again with those ids
to fetch reviews. 1.5 credits per 50 reviews. Subscription/Enterprise only.

Prerequisite: \`company\` must be an akta-pro uuid from company_search
(free). Names and websites are rejected.`,
    params: [
      {
        name: 'company',
        type: 'string',
        required: true,
        description: `akta-pro company uuid — the 7-character id from company_search (e.g. '00000l1'). This is the ONLY accepted form: company names ('Canva') and website domains ('canva.com') are rejected. Always call company_search first (it's free) and pass the \`uuid\` of the candidate you want; a domain can map to several distinct entities, so picking the right uuid is your decision to make, not the API's.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Max reviews per product (max 50; only when products given).`,
      },
      { name: 'offset', type: 'integer', required: false, description: `Pagination offset.` },
      {
        name: 'products',
        type: 'array',
        required: false,
        description: `Product IDs to fetch reviews for. Omit to list the product catalog (each product's \`id\` can then be passed here).`,
      },
    ],
  },
  {
    name: 'aktapromcp_social_posts',
    description: `Company social media posts: content type, text, publish date,
paid/repost flags, an AI classification, and engagement metrics.
1.5 credits. Subscription/Enterprise only.

Prerequisite: \`company\` must be an akta-pro uuid from company_search
(free). Names and websites are rejected.`,
    params: [
      {
        name: 'company',
        type: 'string',
        required: true,
        description: `akta-pro company uuid — the 7-character id from company_search (e.g. '00000l1'). This is the ONLY accepted form: company names ('Canva') and website domains ('canva.com') are rejected. Always call company_search first (it's free) and pass the \`uuid\` of the candidate you want; a domain can map to several distinct entities, so picking the right uuid is your decision to make, not the API's.`,
      },
      { name: 'limit', type: 'integer', required: false, description: `Max posts to return.` },
      { name: 'offset', type: 'integer', required: false, description: `Pagination offset.` },
    ],
  },
  {
    name: 'aktapromcp_website_traffic',
    description: `Website traffic: engagement metrics, monthly visit estimates, and
traffic by acquisition channel. 1.5 credits. Subscription/Enterprise only.

Prerequisite: \`company\` must be an akta-pro uuid from company_search
(free). Names and websites are rejected.`,
    params: [
      {
        name: 'company',
        type: 'string',
        required: true,
        description: `akta-pro company uuid — the 7-character id from company_search (e.g. '00000l1'). This is the ONLY accepted form: company names ('Canva') and website domains ('canva.com') are rejected. Always call company_search first (it's free) and pass the \`uuid\` of the candidate you want; a domain can map to several distinct entities, so picking the right uuid is your decision to make, not the API's.`,
      },
    ],
  },
]
