import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'crustdatamcp_crustdata_account_endpoints_v2',
    description: `ACCOUNT ENDPOINT PERMISSIONS — NEW API (v2025-11-01). Lists every Crustdata API endpoint with this account's access status (enabled/disabled), effective rate limit in requests/minute, and — with include_fields=true — the response fields enabled and disabled for the account. FREE, no credits. THE tool for diagnosing a 403 from any v2 tool ('is this endpoint on my plan?') and for answering 'what am I allowed to call / what is my rate limit?'. Narrow with path (exact match), category, or status — filters combine with AND, and unknown path/category values return an empty list rather than an error. RESPONSE: {api_version, token_limit_rpm, endpoints: [{path, category, status, effective_rate_limit_rpm, fields?}]}.`,
    params: [
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `Input for GET /account/endpoints (v2025-11-01).`,
      },
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_autocomplete_company',
    description: `Get autocomplete suggestions for CompanyDB field values. FREE — 0 credits consumed. Use to discover valid values before constructing a filter on crustdata_company_search_db (e.g. \`field='hq_city', query='san francisco'\` returns the actual stored values like 'San Francisco', 'San Francisco Bay Area'). Empty \`query\` is allowed — returns the most common values for the field. Also serves the technographics vocabulary for crustdata_company_search_by_technology: \`field='technology'\` (tech names, e.g. query='snow' → 'Snowflake', 'Snowplow') and \`field='technology_category'\` (e.g. 'programming_language', 'cloud_service', 'ai_model'). V2 ALTERNATIVE: crustdata_autocomplete_company_v2 (new /company/search/autocomplete API) resolves values for crustdata_company_search_db_v2, which needs v2 field paths.`,
    params: [
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `Autocomplete parameters including field, query, and limit.`,
      },
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_autocomplete_company_v2',
    description: `COMPANY FIELD AUTOCOMPLETE on the v2 API (version 2025-11-01). crustdata_autocomplete_company covers this capability on the default API and serves ordinary requests for it. This is its v2 edition. This edition is for requests that name the new API specifically — 'the new API', 'v2', 'the 2025-11-01 API', or '/company/search/autocomplete'. FREE. Also use it — without a separate v2 ask — whenever you are building filters for crustdata_company_search_db_v2, since that needs v2 field paths and exact indexed values the v1 autocomplete cannot resolve. Differences from v1: nested v2 field paths (locations.country, not hq_country) and v2-shaped scope filters. Feed a returned value back into a search filter verbatim.`,
    params: [
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `Input for POST /company/search/autocomplete (v2025-11-01).`,
      },
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_autocomplete_filter',
    description: `Get autocomplete suggestions for search filter values. Useful for building valid filters for people and company searches. Best coverage on 'region' and 'title'. 'school' returns matches for well-known institutions but may return empty for niche international schools. 'industry' is currently low-coverage upstream — prefer crustdata_autocomplete_company with field='linkedin_industries' for industry values when filtering company DB.`,
    params: [
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `Autocomplete parameters including filter_type and query.`,
      },
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_autocomplete_job',
    description: `JOB FIELD AUTOCOMPLETE (v2025-11-01). FREE — no credits. Returns the exact indexed values a crustdata_job_search filter will accept, so use it BEFORE filtering on a free-text job field (title, category, company name, location) — a near-miss value like 'SWE' for 'Software Engineer' matches zero jobs silently. Not version-gated: crustdata_job_search already runs on the 2025-11-01 /job/search endpoint, so this is simply its value-discovery helper. Empty \`query\` returns the most common values for the field.`,
    params: [
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `Input for POST /job/search/autocomplete (v2025-11-01).`,
      },
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_autocomplete_person',
    description: `Get autocomplete suggestions for people database fields. Useful for building filters or discovering valid field values. CONTEXTUAL AUTOCOMPLETE: pass \`filters\` (same shape as PersonDB search filters) to narrow suggestions to a subset — e.g. field='current_employers.title' + filters={'filter_type': 'current_employers.name', 'type': 'in', 'value': ['Databricks']} returns titles only for people currently at Databricks. When the filter path and the autocomplete field share a nested prefix (both on current_employers.*), the API automatically scopes both to the same array element. Empty \`query\` is allowed — returns the most common values for the field (optionally constrained by filters). Free of charge — no credits consumed. V2 ALTERNATIVE: crustdata_autocomplete_person_v2 (new /person/search/autocomplete API) resolves values for crustdata_people_search_db_v2 and crustdata_people_search_semantic, which need v2 field paths.`,
    params: [
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `Autocomplete parameters including field, query, and limit.`,
      },
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_autocomplete_person_v2',
    description: `PERSON FIELD AUTOCOMPLETE on the v2 API (version 2025-11-01). crustdata_autocomplete_person covers this capability on the default API and serves ordinary requests for it. This is its v2 edition. This edition is for requests that name the new API specifically — 'the new API', 'v2', 'the 2025-11-01 API', or '/person/search/autocomplete'. FREE. Also use it — without a separate v2 ask — whenever you are building filters for crustdata_people_search_db_v2 or crustdata_people_search_semantic, since those need v2 field paths and exact indexed values that the v1 autocomplete cannot resolve. Differences from v1: nested v2 field paths (experience.employment_details.current.title, not current_employers.title) and v2-shaped scope filters ({field, type, value} leaves, NOT 'filter_type'). Feed a returned value back into a search filter verbatim.`,
    params: [
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `Input for POST /person/search/autocomplete (v2025-11-01).`,
      },
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_batch_company_enrich',
    description: `BATCH COMPANY ENRICHMENT — NEW API (v2025-11-01). Enriches up to 10,000 companies in ONE async job instead of one request per company. Submits to /batch/company/enrich, polls until done, then returns the records. Use this for lists of ~50+ companies; for a handful use crustdata_company_enrich (v1 default) or crustdata_company_enrich_v2 — those are synchronous and answer in seconds. Provide exactly ONE identifier list (domains / names / crustdata_company_ids / professional_network_profile_urls). COST: same per-company rate as crustdata_company_enrich_v2 (including the 'technographics' add-on); unresolved identifiers are dropped, not billed. LIMITS: at most 5 active batch jobs per account (a 6th returns 429). RESPONSE: {batch_id, status, entities_requested, entities_fulfilled, result_count, results: [{original_identifier, ...company fields}]}; on timeout, {batch_id, status_url} to re-poll.`,
    params: [
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `Input for POST /batch/company/enrich (v2025-11-01).`,
      },
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_batch_job_search',
    description: `Async batch job search for larger responses. Searches jobs from the database for up to 10 companies at once. Submits a batch job, polls until completion (~10-30s), then returns results. Use crustdata_company_identify first to get company IDs (free). For quick single-company searches, prefer crustdata_job_search instead.`,
    params: [
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `Input parameters for batch job search.`,
      },
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_batch_job_search_live',
    description: `Async batch LIVE job search across multiple companies. Scrapes LinkedIn in real-time for up to 10 companies at once, up to 100 jobs per company. Submits a batch job, polls until completion (~15-60s), then returns results. Use crustdata_company_identify first to get company IDs (free). For a single company, prefer crustdata_job_search_live instead.`,
    params: [
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `Input parameters for batch live job search.`,
      },
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_batch_people_enrich',
    description: `RENAMED — call crustdata_batch_person_contact_enrich instead. This name is kept as a temporary alias for backward compatibility; it forwards to crustdata_batch_person_contact_enrich unchanged and will be removed in a future release. The new name says what the tool actually returns — CONTACT fields (business email / personal emails / phone numbers) — so it can't be mistaken for crustdata_batch_person_profile_enrich, which returns full profiles.`,
    params: [
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `Input parameters for batch contact enrichment.`,
      },
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_batch_person_contact_enrich',
    description: `Async batch CONTACT enrichment for 1-1000 LinkedIn URLs. Returns business email, personal email, and phone numbers per URL — contact fields ONLY, never full profiles. Submits a batch job, polls until completion, then returns parsed results.

COST: no base fee — billed per contact type returned, per matched person; counted per type, not per record, and persons with no contact data are free (run crustdata_credit_costs for rates). Enterprise plans only.

**Scope: 100+ URL lists**, where an async job is genuinely needed. For contact info on up to 100 URLs, \`crustdata_people_contact_enrich\` is synchronous and returns the same contact data in seconds.

**Neighbouring tools:** ≤100 URLs → crustdata_people_contact_enrich; one person's profile fast → crustdata_people_enrich; non-contact profile fields like work history / education → crustdata_people_enrich for one person, or crustdata_batch_person_profile_enrich for a batch.

Access is per-user gated (Crustdata team enables it; not all tokens have it). On 403, tell the user to ping gtm@crustdata.co to be added to the allowlist.`,
    params: [
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `Input parameters for batch contact enrichment.`,
      },
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_batch_person_identify',
    description: `PERSON REVERSE-EMAIL LOOKUP — NEW API (v2025-11-01). THE tool for resolving email addresses to the people behind them — replaces the slow v1 reverse-email path (crustdata_people_enrich with business_email / personal_email). Resolves business AND personal (e.g. Gmail) addresses. Submits an async job to /batch/person/identify (up to 300 emails), polls GET /batch/{batch_id} until completion (~seconds for known emails), then returns parsed rows. COST: billed only for emails that resolve to a person; unmatched emails are FREE. RESPONSE: {batch_id, status, results: [{matched_on, match_type, matches: [{confidence_score, person_data: {crustdata_person_id, basic_profile}}]}]}; on timeout returns {batch_id, status, status_url} to re-poll later.`,
    params: [
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `Input for POST /batch/person/identify (v2025-11-01).`,
      },
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_batch_person_profile_enrich',
    description: `BATCH PERSON PROFILE ENRICHMENT — NEW API (v2025-11-01). Enriches up to 10,000 people in ONE async job, returning full PROFILE records (basic_profile + social_handles by default; add experience / education / skills / contact via \`fields\`). Submits to /batch/person/enrich, polls until done, returns the records. NOT the same as crustdata_batch_person_contact_enrich, which is CONTACT-ONLY (business email / personal emails / phone numbers) on a different endpoint — use that one when the user wants contact details and this one when they want profiles. For a handful of people use crustdata_people_enrich (v1 default) or crustdata_people_enrich_v2 instead — synchronous, answers in seconds. Provide exactly ONE identifier list (professional_network_profile_urls or business_emails). COST: same additive per-profile rate as crustdata_people_enrich_v2; unresolved identifiers are dropped, not billed. LIMITS: at most 5 active batch jobs per account (a 6th returns 429). RESPONSE: {batch_id, status, entities_requested, entities_fulfilled, result_count, results: [{original_identifier, ...person fields}]}; on timeout, {batch_id, status_url} to re-poll.`,
    params: [
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `Input for POST /batch/person/enrich (v2025-11-01).`,
      },
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_company_enrich',
    description: `Get comprehensive company profile data. **BATCHED: ONE CALL COVERS UP TO 25 COMPANIES.** Each identifier (company_domain, company_name, company_linkedin_url, company_id) accepts a COMMA-SEPARATED list of up to 25 entries. That makes one 25-identifier call roughly 10x faster end-to-end than 25 separate calls, which each carry ~30-60s of LLM thinking time in between. A loop of N single-company calls is the slow path to the same result. FIELDS: omit \`fields\` for the basic + firmographics bundle; pass \`fields=[...]\` with the opt-in nested objects you actually need (headcount, funding_and_investment, web_traffic, etc.) — see the fields param description for the full list. V2 ALTERNATIVE: crustdata_company_enrich_v2 covers the same capability on the new /company/enrich API, for requests that name v2 specifically.`,
    params: [
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `Company enrichment parameters (at least one identifier required).`,
      },
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_company_enrich_v2',
    description: `COMPANY ENRICHMENT on the v2 API (version 2025-11-01). crustdata_company_enrich covers this capability on the default API and serves ordinary requests for it. This is its v2 edition. This edition is for requests that name the new API specifically — 'the new API', 'v2', 'the 2025-11-01 API', or '/company/enrich'. 'technographics' in fields bills an add-on (for tech stack alone prefer crustdata_company_technographics — ungated, same rate). Differences from v1: POST with plural-array identifiers (exactly one of domains / names / crustdata_company_ids / professional_network_profile_urls); response is the match envelope with nested company_data (basic_info / metrics / funding / …).`,
    params: [
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `Input for POST /company/enrich (v2025-11-01).`,
      },
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_company_identify',
    description: `Identify and match companies by name, domain, LinkedIn URL, Crunchbase URL, or Crustdata company_id. **BATCHED: ONE CALL COVERS UP TO 25 COMPANIES.** Each identifier field (company_name, company_domain, company_linkedin_url, company_id) accepts a COMMA-SEPARATED list of up to 25 values. That makes one 25-name call roughly 10x faster end-to-end than 25 separate calls, which each carry ~30-60s of LLM thinking time in between. FREE either way, so a loop of N single-company calls is the slow path to the same result. Pass ONE identifier TYPE per call (only company_name OR only company_domain, etc.) — within that type, comma-separate up to 25. If you pass multiple TYPES, the MCP picks the most specific one and surfaces the dropped ones in \`dropped_identifiers\`. Returns {companies: [...], count: N, used_identifier?, dropped_identifiers?, note?}. Use this to find the Crustdata company_id for follow-up enrichment via crustdata_company_enrich. V2 ALTERNATIVE: crustdata_company_identify_v2 covers the same capability on the new /company/identify API, for requests that name v2 specifically.`,
    params: [
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `Company identification parameters (at least one identifier required).`,
      },
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_company_identify_v2',
    description: `COMPANY IDENTIFY on the v2 API (version 2025-11-01). crustdata_company_identify covers this capability on the default API and serves ordinary requests for it. This is its v2 edition. This edition is for requests that name the new API specifically — 'the new API', 'v2', 'the 2025-11-01 API', or '/company/identify'. FREE. Differences from v1: identifiers are plural arrays (domains / names / crustdata_company_ids / professional_network_profile_urls — exactly one). RESPONSE: list of {matched_on, match_type, matches: [{confidence_score, company_data.basic_info}]}.`,
    params: [
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `Input for POST /company/identify (v2025-11-01).`,
      },
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_company_search',
    description: `Real-time search for companies using LinkedIn Sales Navigator style filters. Find companies by headcount, industry, location, revenue, funding activity, and more. Returns up to 25 results per page (max 65 pages). Values must be arrays: ['value'] not 'value'. For ANNUAL_REVENUE: use type 'between' with {'min': X, 'max': Y} in millions USD + 'sub_filter': 'USD'. For DEPARTMENT_HEADCOUNT/GROWTH: use type 'between' with department name as sub_filter. RESPONSE: By default (compact=true), returns trimmed company records with key fields only. Set compact=false for full data. V2 ALTERNATIVE: crustdata_company_search_v2 covers the same capability on the new /company/professional_network/search/live API, for requests that name v2 specifically.`,
    params: [
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `Search parameters including filters array and page number.`,
      },
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_company_search_by_technology',
    description: `FIND COMPANIES BY TECHNOLOGY (technographics search, v2025-11-01). THE tool for 'which companies use Snowflake?', 'find companies running dbt AND Airflow', 'companies using an ai_model', 'accounts on my competitor's stack'. Filters the company dataset on detected tech: \`technologies\` (names — set match='all' to require every one, default 'any'), \`categories\` (lowercase snake_case), and \`min_technologies\`. Narrow further with \`additional_filters\` (headcount.total, locations.country, …). Resolve tech names and categories first with crustdata_autocomplete_company (field='technology' or 'technology_category') — it is FREE and returns the exact stored spellings, and an unrecognised name silently matches nothing. NOTE: search FILTERS on the stack, it does not RETURN it — results are company records. To see what a matched company actually uses, pass it to crustdata_company_technographics.`,
    params: [
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `Input for POST /company/search filtered on the technographics namespace.`,
      },
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_company_search_db',
    description: `Search the Crustdata company database with flexible filters. Fast search against pre-indexed data. FILTER SYNTAX: Uses 'filter_type'/'type'/'value' keys (NOT 'column' — that's for PersonDB). Combine with {'op': 'and', 'conditions': [...]}. Operators: = != in not_in > < => =< (.) for fuzzy text [.] for exact-token text matching (>= / <= are auto-translated to => / =<). NOTE: For LinkedIn Sales Navigator-style filters, use crustdata_company_search instead. CATEGORICAL FIELDS — IMPORTANT: For \`linkedin_industries\`, \`industries\`, \`country\`, \`taxonomy.professional_network_industry\`, the values are a CLOSED vocabulary. A plausible-but-wrong value ('IT' for 'Information Technology', 'fintech' for 'Financial Services') returns ZERO rows silently. crustdata_autocomplete_company resolves the exact stored value for one of these fields, which is what a correct filter needs. RESPONSE: By default (compact=true), returns trimmed company records with key fields only (company_name, website, linkedin_url, hq, headcount, industries). Set compact=false for full data including employee trends, funding details, etc. V2 ALTERNATIVE: crustdata_company_search_db_v2 covers the same capability on the new /company/search API, for requests that name v2 specifically.`,
    params: [
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `Search parameters including filters, sorts, limit, and cursor.`,
      },
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_company_search_db_v2',
    description: `COMPANY SEARCH — DATASET on the v2 API (version 2025-11-01). crustdata_company_search_db covers this capability on the default API and serves ordinary requests for it. This is its v2 edition. This edition is for requests that name the new API specifically — 'the new API', 'v2', 'the 2025-11-01 API', or '/company/search'. Differences from v1: filter leaves use {field, type, value} with nested field paths (basic_info.name, metrics.headcount.total, …); pagination is cursor-based (pass back next_cursor); response companies are nested (basic_info / metrics / …). Results are compacted to key fields by default — pass compact=false for full nested records. Also filters on technographics (technographics.technologies.name / .category / .total_technologies), though crustdata_company_search_by_technology is the ungated, purpose-built tool for that and needs no v2 opt-in.`,
    params: [
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `Input for POST /company/search (v2025-11-01).`,
      },
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_company_search_v2',
    description: `COMPANY SEARCH — REAL-TIME (live LinkedIn) on the v2 API (version 2025-11-01). crustdata_company_search covers this capability on the default API and serves ordinary requests for it. This is its v2 edition. This edition is for requests that name the new API specifically — 'the new API', 'v2', 'the 2025-11-01 API', or '/company/professional_network/search/live'. Requires an enterprise plan (403 otherwise). COST: billed per company returned. Differences from v1: filters are an ARRAY of {field, type, value} leaves (operators 'in'/'not in'/'between'; UPPER_SNAKE live field names like KEYWORD, COMPANY_HEADCOUNT, REGION); pagination via required 'page'; nested response shape. Results are compacted to key fields by default — pass compact=false for full nested records.`,
    params: [
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `Input for POST /company/professional_network/search/live (v2025-11-01).`,
      },
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_company_social_posts',
    description: `DEPRECATED — call crustdata_social_posts_by_keyword instead. This name is kept as a temporary alias for backward compatibility; it forwards to crustdata_social_posts_by_keyword and will be removed in a future release. The new name is more accurate because the keyword search covers BOTH company and personal posts, not just company posts.`,
    params: [
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `Input parameters for social posts keyword search (covers both company and person posts).`,
      },
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_company_technographics',
    description: `TECHNOGRAPHICS — what technologies a company uses (v2025-11-01). Billed as a base enrich plus a technographics add-on (check crustdata_credits_check); companies with no technographics data are billed the base only. THE tool for 'what is X's tech stack?', 'does X use Snowflake?', 'what data warehouse does X run?'. Returns total_technologies (true count), top_technologies (most notable, up to 25) and — where the account has field-level permission — a detailed technologies[] list of {name, category, sources}, ordered by how central the tech is to the company. Sources are 'web signals' (the company's site) or 'job posting'. Provide EXACTLY ONE identifier list: domains, names, crustdata_company_ids, or professional_network_profile_urls. To go the other way — find companies that use a given technology — use crustdata_company_search_by_technology.`,
    params: [
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `Input for POST /company/enrich with the technographics field group.`,
      },
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_credit_costs',
    description: `Return a markdown table of how many Crustdata credits each MCP tool call costs, broken down by variation (in-DB vs realtime, reactors/comments, business email, exact keyword match, per-result vs per-100-results, etc.). Free — makes no API call and consumes no credits. Use this to answer 'how much does X cost?' or to compare costs before making expensive calls. Note: credits are only charged when a call returns results.`,
    params: [
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_credits_check',
    description: `Check your remaining Crustdata API credit balance. Free — consumes no credits.`,
    params: [
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_credits_check_v2',
    description: `CREDIT BALANCE on the v2 API (version 2025-11-01). crustdata_credits_check covers this capability on the default API and serves ordinary requests for it. This is its v2 edition. This edition is for requests that name the new API specifically — 'the new API', 'v2', 'the 2025-11-01 API', or '/account/credits'. FREE. Differences from v1: the balance is nested under \`account\` and comes with the recurring grant (recurring_credits, recurring_credits_frequency, recurring_credits_refresh_date). Accounts with credit wallets also get a \`wallets\` list splitting recurring (spent first) from top-up (rolls over until expires_at) — informational only; gate spending decisions on account.credits.`,
    params: [
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_employee_reviews',
    description: `EMPLOYEE REVIEWS (Glassdoor-style) — NEW API (v2025-11-01). Requires an enterprise plan (403 otherwise). Full employee-review profile for a company: overall star rating with distribution, category ratings (culture, work/life balance, compensation, management, diversity, career), CEO approval, review/salary/interview/benefit counts, firmographics, office locations, awards, and individual reviews with pros/cons/advice and reviewer context. Input: crustdata_company_id only — resolve domains/names first via crustdata_company_identify. NOTE: a 500 'No glassdoor data found' means the company has no review coverage — it is a miss (no credit consumed), and a retry returns the same miss.`,
    params: [
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `Input for POST /employee_review/enrich (v2025-11-01).`,
      },
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_get_skill_body',
    description: `Fetch the live SKILL.md body for a centrally-managed skill. The local SKILL.md installed at ~/.claude/skills/<name>/SKILL.md is intentionally a stub that points here — call this tool to get the current playbook before executing the skill. Returns the full instructions exactly as authored in the admin UI. Throws if the caller hasn't been granted access to this skill.`,
    params: [
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `Input parameters for fetching a skill's live SKILL.md body.`,
      },
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_get_skill_file',
    description: `Fetch a helper file (reference, script, README, etc.) for a centrally-managed skill. Use this whenever the live SKILL.md body (from crustdata_get_skill_body) references a relative path like \`references/foo.md\` or \`scripts/bar.py\` — the file is NOT installed locally, only on the server. For executable scripts, write the returned content to a temp path before running.`,
    params: [
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `Input parameters for fetching a helper file from a skill.`,
      },
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_get_twitter_posts',
    description: `Find recent Twitter/X posts from a company or person by their Twitter handle. This is the Twitter/X post tool — it covers tweets, X posts and Twitter posts, which the social_posts tools do not (those are LinkedIn only). Returns post titles, URLs, and snippets.`,
    params: [
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `Input parameters for fetching Twitter/X posts from a company.`,
      },
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_github_enrich',
    description: `GITHUB DEVELOPER PROFILES (dev platform) — NEW API (v2025-11-01). Requires an enterprise plan (403 otherwise). Enrich a person (or GitHub org) with their dev-platform profile: bio, location, public repo count, followers/following, declared handles (LinkedIn / X / website), org memberships, and a 0-1 confidence_score on the match. Provide EXACTLY ONE of crustdata_person_id or profile_url. RESPONSE: {crustdata_person_id, dev_platform_profiles: [...]} — crustdata_person_id is 0 for org profiles / unlinked accounts.`,
    params: [
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `Input for POST /dev_platform/enrich (v2025-11-01).`,
      },
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_healthz',
    description: `Lightweight liveness probe for the Crustdata MCP server itself. Returns {status: 'ok'} when the server is reachable. Does NOT call the Crustdata API or consume credits. Use this when you need to verify the MCP connection is healthy without spending credits.`,
    params: [
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_install_skills',
    description: `Install Crustdata research skills locally so they appear as native /slash-commands in Claude Code (e.g., /research-person). By default writes full skill content (SKILL.md + helper files like references/, scripts/) plus a .crustdata_version marker. Each skill becomes invokable without any further server roundtrips. Use crustdata_skill_versions periodically to check whether a re-install is needed.`,
    params: [
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `Input parameters for installing Crustdata skills locally.`,
      },
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_job_search',
    description: `Search the job listings database. Find jobs by company, title, location, category, and more. Supports filters, sorting, cursor pagination (up to 1000 results), and aggregations (counts/breakdowns). No charge when a query returns 0 results. Filters use 'field'/'type'/'value' keys with nested field paths (e.g., 'job_details.title', 'company.basic_info.name'). RESPONSE: By default returns a compact markdown table without descriptions. Use aggregations with limit=0 to get counts without fetching listings (e.g., 'how many engineering jobs at Google?').`,
    params: [
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `Input parameters for job search (DB).`,
      },
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_job_search_live',
    description: `Fetch LIVE job listings from LinkedIn for a specific company. Scrapes LinkedIn in real-time — slower than crustdata_job_search but returns the most current data. No charge when 0 results come back. Use crustdata_company_identify first to get the crustdata_company_id (free). Use crustdata_job_search for filtering by title/location/category — this tool only filters by company. RESPONSE: Returns job listings with company enrichment data (headcount, funding, revenue).`,
    params: [
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `Input parameters for realtime job search (LinkedIn scrape).`,
      },
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_list_my_skills',
    description: `List the Crustdata skills your account has access to install. Use this BEFORE crustdata_install_skills to see what's available, or to confirm what was granted. Returns names + descriptions.`,
    params: [
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_people_contact_enrich',
    description: `**THE PRIMARY TOOL FOR CONTACT INFO.** Get business emails, personal emails, and phone numbers for people by LinkedIn URL — synchronously, results in seconds. Use this whenever the user asks for 'emails', 'personal emails', 'phones', 'contact info', or wants to reach/message/sequence a list of people. Accepts 1-100 LinkedIn URLs per call — or 1-100 business_emails for reverse lookup (exactly one identifier list) — chunked to the API's 25-identifier requests automatically (~10-25s per 25). Returns per-URL rows plus a fill_summary, so you can report coverage without re-parsing. Email results include a deliverability status per address. Billed per requested contact type, per matched person — no base fee, unmatched identifiers free (run crustdata_credit_costs for rates). Narrow \`fields\` to only the tiers you need. Enterprise plans only. **Prefer this over crustdata_people_enrich for contact data** (that tool is for full profiles: work history, education, skills). **Prefer this over crustdata_batch_person_contact_enrich for lists up to 100** — batch is async-job-based and only worth it for 100+ URLs where wall time doesn't matter.`,
    params: [
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `Input parameters for sync contact enrichment.`,
      },
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_people_enrich',
    description: `Get detailed person profile data by LinkedIn URL, business email, personal email, or GitHub URL. **BATCHED: ONE CALL COVERS UP TO 25 PROFILES.** \`linkedin_profile_url\` (and business_email / personal_email / github_profile_url) accept COMMA-SEPARATED values, up to 25 per call, and the call returns in ~3s regardless of list size. That makes one 25-URL call roughly 10x faster end-to-end than 25 separate calls, which each carry ~30-60s of LLM thinking time in between. A loop of N single-profile calls is the slow path to the same result. Use exactly ONE identifier TYPE per call (linkedin_profile_url OR business_email OR …); within that type, comma-separate for batching. Returns professional information including current role, company, experience history, education, and skills. Supports reverse lookup by personal email (e.g., Gmail) or by GitHub URL — pass github_profile_url=https://github.com/<user> to resolve the person's LinkedIn + full profile. FIELD SELECTION: omit all field params to get the API's default profile shape. Set include_all_fields=true for the curated full bundle. Use the include_* flags additively for gated extras: include_business_email (work email), include_personal_contact_info (personal email / phone), include_github_profiles (GitHub). Or pass \`fields\` for an exact comma-separated list — include_* flags still append on top. **SCOPE: FULL PROFILE DATA (work history, education, skills).** Contact info (emails / personal emails / phones) is crustdata_people_contact_enrich's job — that is the dedicated contact endpoint, returning per-URL contact rows with deliverability status in seconds, up to 100 URLs per call. **FRESH / REAL-TIME / NOT-CACHED REQUESTS ARE COVERED HERE**: enrich_realtime=true (plus force_fetch=true to bypass the cache entirely and scrape every profile live). This v1 tool does real-time, so a fresh-data request is not by itself what selects the v2 tool. V2 ALTERNATIVE: crustdata_people_enrich_v2 covers the same capability on the new /person/enrich API, for requests that name v2 specifically.`,
    params: [
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `Person enrichment parameters (at least one identifier required).`,
      },
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_people_enrich_v2',
    description: `PERSON ENRICHMENT on the v2 API (version 2025-11-01). crustdata_people_enrich covers this capability on the default API and serves ordinary requests for it. This is its v2 edition. This edition is for requests that name the new API specifically — 'the new API', 'v2', 'the 2025-11-01 API', or '/person/enrich'. COST: additive — contact and dev-platform field groups bill add-ons on top of the base profile (run crustdata_credit_costs for rates). NOTE: on this endpoint contact.personal_emails / contact.phone_numbers are returned only when previously enriched — crustdata_people_contact_enrich is the on-demand contact tool. Differences from v1: POST with plural-array identifiers (exactly one of professional_network_profile_urls / business_emails, max 25 each); default response is basic_profile + social_handles only — pass \`fields\` for experience / education / skills / contact. The cached dataset is used unless realtime=true, which fetches a fresh profile from the web (enterprise, URLs only) — that flag is how this tool serves a fresh-data request once it has been selected. Wanting fresh / real-time / non-cached data is not by itself what selects it: crustdata_people_enrich does real-time too (enrich_realtime=true) and remains the default. If the plan denies some requested fields, the cached path strips the gated fields and retries once (noted in the response). RESPONSE: list of {matched_on, match_type, matches: [{confidence_score, person_data}]}; unmatched identifiers return matches: [].`,
    params: [
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `Input for POST /person/enrich (v2025-11-01).`,
      },
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_people_search',
    description: `The slow (10-30s), expensive live-LinkedIn fallback for people search. crustdata_people_search_db is the primary tool; this one covers the narrow case where the DB search returns 0 results and the request needs live LinkedIn data. Uses DIFFERENT filter format than DB tool: 'filter_type'/'type'/'value' (NOT 'column'). Values must be arrays: ['Google'] not 'Google'. Operators: 'in', 'not in'. PAGINATION — the two modes are mutually exclusive: (a) \`limit=N\` for a single bulk call (what most callers want). Sync max 25; beyond that, background_job=true returns a job_id to poll back by calling this tool again with job_id=<id> — async cap is 10,000 per call. (b) \`page=N\` to iterate 25-at-a-time across multiple sync calls (max 100 pages). Passing both \`page\` and \`limit\` is rejected. OPTIONS: fuzzy_match=true for broader title matching (propagates to all CURRENT_TITLE/PAST_TITLE filters), strict_title_and_company_match=true for exact matching, exclude_profiles/exclude_names to filter out specific results. RESPONSE: By default (compact=true), returns trimmed profiles with key fields only. Set compact=false for full data. V2 ALTERNATIVE: crustdata_people_search_live_v2 covers the same capability on the new /person/professional_network/search/live API, for requests that name v2 specifically.`,
    params: [
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `Search parameters including filters array and page number.`,
      },
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_people_search_db',
    description: `The primary people-search tool — the default entry point for any people search, across 800M+ professional profiles. Up to 1000 per request with cursor pagination. crustdata_people_search is the slow live-LinkedIn fallback, and covers the narrow case where this tool returns 0 results and the request needs live LinkedIn data. FILTER SYNTAX: Each filter uses 'column'/'type'/'value' keys (NOT 'filter_type'). Combine multiple filters with {'op': 'and', 'conditions': [...]}. Use [.] for substring match, (.) for fuzzy match, = for exact, 'in' for set membership, and (!) to exclude profiles whose value contains a substring (better than != / not_in for substring-based exclusion). POST-PROCESSING: pass exclude_profiles (LinkedIn URLs) or exclude_names to drop specific entries from results — handy for de-duping across paginated calls. KEY COLUMNS: headline, region, skills, name, current_employers.name, current_employers.title, current_employers.description (company description text), current_employers.company_industries, years_of_experience_raw. CATEGORICAL FIELDS — IMPORTANT: For \`current_employers.title\`, \`current_employers.industry\`, \`current_employers.company_industries\`, \`region\`, \`current_employers.seniority_level\` and \`current_employers.function_category\`, the values are a CLOSED vocabulary. A plausible-but-wrong value ('VP' for 'Vice President', 'SF' for 'San Francisco') returns ZERO rows silently. crustdata_autocomplete_person resolves the exact stored value for one of these fields, which is what a correct filter needs. RESPONSE: By default (compact=true), returns trimmed profiles with key fields only (name, headline, region, linkedin_profile_url, current employer name/title). Set compact=false for full data including skills, education, past employers, etc. V2 ALTERNATIVE: crustdata_people_search_db_v2 covers the same capability on the new /person/search API, for requests that name v2 specifically.`,
    params: [
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `Search parameters including filters, sorts, limit, and cursor.`,
      },
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_people_search_db_v2',
    description: `PEOPLE SEARCH on the v2 dataset API (version 2025-11-01). This is the v2 edition of crustdata_people_search_db (legacy), which covers the same capability on the default API and serves ordinary people search. This edition is for requests that name the new API specifically — 'the new API', 'v2', 'the 2025-11-01 API', 'the new dataset API', or '/person/search'. Differences from the legacy tool: same DB, richer nested response shape, vanity LinkedIn URLs (linkedin.com/in/jane-doe) instead of URN-format fallbacks (linkedin.com/in/ACw...). Cost is the same as the legacy crustdata_people_search_db tool. FILTER SHAPE: leaves use {field, type, value} (NOT 'column'). Field paths are nested, e.g. basic_profile.name, experience.employment_details.current.title, experience.employment_details.current.company_name, education.schools.school. Branches use {op: 'and'|'or', conditions: [...]}. RESPONSE: native nested shape — basic_profile / contact / experience / education / social_handles / professional_network. LinkedIn URL lives at social_handles.professional_network_identifier.profile_url.`,
    params: [
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `Input parameters for the new /person/search dataset API (2025-11-01).`,
      },
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_people_search_live_v2',
    description: `PEOPLE SEARCH — REAL-TIME (live LinkedIn) on the v2 API (version 2025-11-01). crustdata_people_search covers this capability on the default API and serves ordinary requests for it. This is its v2 edition. This edition is for requests that name the new API specifically — 'the new API', 'v2', 'the 2025-11-01 API', or '/person/professional_network/search/live'. Requires an enterprise plan (403 otherwise). COST: billed per profile returned. Differences from v1: filter leaves use {field, type, value} (NOT 'filter_type'); pagination is page-based (increment \`page\` until profiles is empty); response profiles use the nested v2 shape (basic_profile / experience / social_handles / …) with total_display_count as an approximate string ('2,500+'). Results are compacted to key fields by default — pass compact=false for full nested records.`,
    params: [
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `Input for POST /person/professional_network/search/live (v2025-11-01).`,
      },
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_people_search_semantic',
    description: `PEOPLE SEMANTIC SEARCH (beta) — natural-language people search on the /person/search dataset (v2025-11-01). crustdata_people_search_db covers ordinary filter-based people search. This tool is for requests that ask for semantic / natural-language search specifically — 'use semantic search', 'natural-language search', 'search by description', 'rank these by relevance', or a pasted job description with a request for similar people. WHAT IT DOES: ranks people by how well their whole profile (title, skills, company history, education, location, summary) matches \`query\`. KEY BEHAVIORS: (1) It always returns results — the per-profile \`fit\` tier (strong / possible / weak) is the quality signal; the result count is not. (2) \`total_count\` is the size of the ranked pool, not a count of good matches. (3) Results are already relevance-ordered — sorting is not available. PARAMS: \`query\` (required natural-language text); \`search_mode\` (hybrid/lexical/semantic); \`recall_mode\` (managed/exact — use 'exact' to enforce \`filters\` as hard constraints); optional \`filters\` (same tree shape as crustdata_people_search_db_v2, leaves use 'field' not 'column'). RESPONSE: native nested v2 shape (basic_profile / contact / experience / education / social_handles / professional_network) plus a per-profile \`fit\` tier, with top-level total_count + total_count_relation (eq | gte). Cost: same per-result rate as crustdata_people_search_db.`,
    params: [
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `Input parameters for Person Semantic Search (beta) on POST /person/search.`,
      },
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_skill_versions',
    description: `Return current server-side version markers for the caller's granted skills. Each version is the ISO timestamp of the most recent update to the skill in the admin DB. Compare against the .crustdata_version file written at install time — if they differ, re-run crustdata_install_skills to refresh local content. Cheap, single DB query. Safe to call once per session.`,
    params: [
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_social_posts',
    description: `Get recent LINKEDIN posts authored by a specific person OR company profile, OR fetch a single post by URL (GET /screener/linkedin_posts). This tool is for LINKEDIN ONLY — for Twitter/X posts, use crustdata_get_twitter_posts instead. Provide EXACTLY ONE identifier: person_linkedin_url, company_domain, company_linkedin_url, company_name, company_id, or linkedin_post_url (single-post mode — disables pagination). For keyword-based discovery across the network, use crustdata_social_posts_by_keyword instead. Posts come back sorted by date (most recent first) — there is no sort parameter. Use 'limit' (1-100, default 20) to control how many posts to return, and 'page' (1-20) to paginate through more — most recent posts appear on page 1. Add 'reactors' and/or 'comments' to the 'fields' parameter for engagement details. RESPONSE: By default (compact=true), returns trimmed posts with key fields and truncated text. Set compact=false for full post data. V2 ALTERNATIVE: crustdata_social_posts_v2 covers the same capability on the new /social_post/professional_network/enrich/live API, for requests that name v2 specifically.`,
    params: [
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `Parameters including profile identifier and pagination options.`,
      },
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_social_posts_by_keyword',
    description: `Search LINKEDIN posts by keyword (POST /screener/linkedin_posts/keyword_search/). This tool is for LINKEDIN ONLY — for Twitter/X posts, use crustdata_get_twitter_posts instead. Finds BOTH company and personal LinkedIn posts mentioning specific topics, products, or trends. Useful for market research, competitive intelligence, and trend analysis. For posts authored by a SPECIFIC profile (person OR company), use crustdata_social_posts instead. CONSTRAINT: \`keyword\` accepts at most 6 keywords joined by OR/AND (max 5 operators). By default (compact=true), returns trimmed posts. Set compact=false for full data. V2 ALTERNATIVE: crustdata_social_posts_by_keyword_v2 covers the same capability on the new /social_post/professional_network/search/live API, for requests that name v2 specifically.`,
    params: [
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `Search parameters including keyword and limit.`,
      },
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_social_posts_by_keyword_v2',
    description: `SOCIAL POSTS — KEYWORD SEARCH (live) on the v2 API (version 2025-11-01). crustdata_social_posts_by_keyword covers this capability on the default API and serves ordinary requests for it. This is its v2 edition. This edition is for requests that name the new API specifically — 'the new API', 'v2', 'the 2025-11-01 API', or '/social_post/professional_network/search/live'. Requires an enterprise plan (403 otherwise). Differences from v1: filters use {field, value} (NOT 'filter_type') with field in PROFESSIONAL_NETWORK_MEMBER / MENTIONING_PROFESSIONAL_NETWORK_MEMBER / COMPANY / MENTIONING_COMPANY / AUTHOR_INDUSTRY / AUTHOR_COMPANY / AUTHOR_TITLE; keyword is optional (filters alone is fine); page (5 posts/page) and limit are MUTUALLY EXCLUSIVE. Reactors/comments are NOT available here — feed each share_url into crustdata_social_posts_v2 (social_post_url) instead. RESPONSE: a top-level ARRAY of posts (no 'posts' wrapper).`,
    params: [
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `Input for POST /social_post/professional_network/search/live (v2025-11-01).`,
      },
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_social_posts_v2',
    description: `SOCIAL POSTS — BY PROFILE (live) on the v2 API (version 2025-11-01). crustdata_social_posts covers this capability on the default API and serves ordinary requests for it. This is its v2 edition. This edition is for requests that name the new API specifically — 'the new API', 'v2', 'the 2025-11-01 API', or '/social_post/professional_network/enrich/live'. Requires an enterprise plan (403 otherwise). COST: billed per post, plus per 100 reactors/comments returned. Differences from v1: single-post identifier is social_post_url; person URL is professional_network_profile_url; company page URL is company_professional_network_url; crustdata_company_id is an integer; page (1-20, 5 posts/page) and limit (1-100) are MUTUALLY EXCLUSIVE. Latency can reach 30-60s when pulling reactors/comments. RESPONSE: {posts: [...]} with nested actor / engagement objects.`,
    params: [
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `Input for POST /social_post/professional_network/enrich/live (v2025-11-01).`,
      },
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_watch_cancel',
    description: `WATCH CANCEL — NEW watcher system (v2025-11-01 API). Manages watches created by crustdata_watch_create (NOT the legacy crustdata_watcher_* watches). FREE. DELETE the watch — returns 204 No Content (surfaced here as {success: true}). Deletion is terminal; the watch cannot be resumed. If the user may want it back, pause it via crustdata_watch_update instead. RESPONSE: {api_request, response} — api_request echoes the exact API call (with a copy-pasteable curl) and response is the deletion result.`,
    params: [
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `Input for GET /watch/{entity_type}/{watch_id} (v2025-11-01).`,
      },
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_watch_create',
    description: `WATCH CREATE — NEW watcher system (v2025-11-01 API). Create an entity or discovery watch on people or companies. This is the PREFERRED way to track specific companies/people for data changes or get alerted on new matches to a filter. (The legacy crustdata_watcher_* tools drive the separate v1 event-webhook product — use those only when the user asks for the legacy watcher or its event types.) mode='entity' tracks known people/companies you list for profile changes; mode='discovery' alerts on NEW people/companies matching a saved filter. Entity mode: POST /watch/{entity_type} with entities + track (+ optional fields); billed per change notification (check crustdata_credit_costs) — person watches tier by config.refresh_frequency_days (fresher data costs more), first run is a free baseline and no-change runs are free. Discovery mode: POST /watch/{entity_type}/search with filters; billed per new match delivered, first run is a free baseline of up to 5 matches. Both modes need config.trigger ({type: 'interval', every_hours: N}) and at least one notifications channel. RESPONSE: {api_request, response} — api_request echoes the exact API call (with a copy-pasteable curl) and response is the created watch.`,
    params: [
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `Input for POST /watch/{entity_type} (entity) or /watch/{entity_type}/search (discovery).`,
      },
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_watch_get',
    description: `WATCH GET — NEW watcher system (v2025-11-01 API). Manages watches created by crustdata_watch_create (NOT the legacy crustdata_watcher_* watches). FREE. Returns the full watch object (kind, dataset, status, entities/track or filters, fields, config, notifications, created_at, last_run_at). last_run_at is null until the baseline run completes.`,
    params: [
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `Input for GET /watch/{entity_type}/{watch_id} (v2025-11-01).`,
      },
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_watch_list',
    description: `WATCH LIST — NEW watcher system (v2025-11-01 API). Manages watches created by crustdata_watch_create (NOT the legacy crustdata_watcher_* watches). FREE. Lists the caller's v2 watches for one dataset as an array of watch objects (id, kind: 'entity'|'discovery', dataset, status, config, notifications, created_at, last_run_at). Filter with status; page with limit/offset (all optional).`,
    params: [
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `Input for GET /watch/{entity_type} (v2025-11-01).`,
      },
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_watch_update',
    description: `WATCH UPDATE — NEW watcher system (v2025-11-01 API). Manages watches created by crustdata_watch_create (NOT the legacy crustdata_watcher_* watches). FREE. PATCH to pause/resume (status 'paused'/'active') and/or replace the watched entities list, config, or notifications. A watch's track and fields are fixed at create time — create a new watch to change what you watch for. To delete permanently, use crustdata_watch_cancel. RESPONSE: {api_request, response} — api_request echoes the exact API call (with a copy-pasteable curl) and response is the updated watch.`,
    params: [
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `Input for PATCH /watch/{entity_type}/{watch_id} (v2025-11-01).`,
      },
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_watcher_cancel',
    description: `Permanently cancel a watcher subscription by ID. Cancellation is irreversible — the watch stops running and cannot be reactivated (use crustdata_watcher_update with status='paused' if you only want to pause it). Notification history and run records are preserved. The cancelled watch is hidden from crustdata_watcher_list unless include_cancelled=true. SEE ALSO: crustdata_watch_cancel — the NEW v2 watch system (entity + discovery watchers on people/companies data); prefer it for tracking profile-data changes. This legacy tool remains for event-webhook subscriptions.`,
    params: [
      { name: 'params', type: 'object', required: true, description: `The watch ID to cancel.` },
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_watcher_create',
    description: `Create a watcher to monitor events. No webhook hosting required — if the user does not provide notification_endpoint, the watcher posts to a Crustdata-managed receiver and the MCP retrieves delivered payloads via crustdata_watcher_run_summary. Creating a watch is FREE; credits are only charged when the watch runs. Event types include 'job-posting-with-keyword-and-location' (new job postings), 'company-watch-linkedin-posts' (company LinkedIn activity), 'linkedin-person-post-updates' (person LinkedIn posts), 'person-discovery-via-filters' (people matching Sales Nav filters), and more. Use crustdata_watcher_simulate to dry-run first, crustdata_watcher_cancel to permanently stop a watch. The response includes an \`api_request\` field with the exact JSON body posted and a copy-pasteable curl; after creating, surface that curl to the user so they can reproduce or save it. SEE ALSO: crustdata_watch_create — the NEW v2 watch system (entity + discovery watchers on people/companies data); prefer it for tracking profile-data changes. This legacy tool remains for event-webhook subscriptions.`,
    params: [
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `Watcher creation parameters.`,
      },
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_watcher_get',
    description: `Get the full details of a single watcher subscription by ID (status, filters, endpoint, frequency, etc.). SEE ALSO: crustdata_watch_get — the NEW v2 watch system (entity + discovery watchers on people/companies data); prefer it for tracking profile-data changes. This legacy tool remains for event-webhook subscriptions.`,
    params: [
      { name: 'params', type: 'object', required: true, description: `The watch ID to fetch.` },
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_watcher_list',
    description: `List the caller's watcher subscriptions, most recent first. Returns id, event_type_slug, status, frequency, created_at, last_run_id, notification_endpoint, and max_notifications_per_execution. By default returns the 50 most recent watchers in compact form (bulky filter payloads stripped to avoid context overflow). Use this at the start of any session that references a previously-created watch — users often forget the subscription_id, so match by event_type_slug + created_at to recover it. Pass compact=false only when the user explicitly asks to see filter details, and consider pairing with limit=10 for very active accounts. SEE ALSO: crustdata_watch_list — the NEW v2 watch system (entity + discovery watchers on people/companies data); prefer it for tracking profile-data changes. This legacy tool remains for event-webhook subscriptions.`,
    params: [
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `List options (include_cancelled, compact, limit).`,
      },
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_watcher_run_summary',
    description: `Fetch the detailed summary of a single watcher run: per-stage pipeline logs with timestamps AND the actual webhook payload(s) we delivered for that run. Each entry in \`notifications\` has sent_at, http_status, and the full \`payload\` we POSTed (subscription_id, event_type, timestamp, and the matching records). Use this to show the user the actual matches their watcher produced — no webhook hosting required on their side; the MCP can render the results directly in chat. If the run is still in progress, logs and notifications may be empty arrays.`,
    params: [
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `Subscription id and run id.`,
      },
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_watcher_runs',
    description: `List recent runs of a watcher. Each entry includes the run id, status (RUNNING/SUCCESS/FAILED/SKIPPED), started_at, completed_at, new_records_count, credits_deducted, and notification_http_status. Cursor-paginated, most recent first. Use this to find out which runs have results worth inspecting (use crustdata_watcher_run_summary to fetch the actual delivered records for any run).`,
    params: [
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `Subscription id, pagination cursor, and limit.`,
      },
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_watcher_simulate',
    description: `Simulate a watcher subscription to test your webhook endpoint. Sends a test notification without creating a persistent subscription.`,
    params: [
      { name: 'params', type: 'object', required: true, description: `Simulation parameters.` },
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_watcher_update',
    description: `Update an existing watcher subscription. Can change status (pause/resume), update webhook endpoint, or modify filters for certain subscription types. SEE ALSO: crustdata_watch_update — the NEW v2 watch system (entity + discovery watchers on people/companies data); prefer it for tracking profile-data changes. This legacy tool remains for event-webhook subscriptions.`,
    params: [
      { name: 'params', type: 'object', required: true, description: `Watcher update parameters.` },
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_web_fetch',
    description: `Fetch and extract text content from up to 10 web page URLs in one request. HTML is stripped and content is capped per URL. V2 ALTERNATIVE: crustdata_web_fetch_v2 covers the same capability on the new /web/enrich/live API, for requests that name v2 specifically.`,
    params: [
      { name: 'params', type: 'object', required: true, description: `Web fetch parameters.` },
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_web_fetch_v2',
    description: `WEB FETCH on the v2 API (version 2025-11-01). crustdata_web_fetch covers this capability on the default API and serves ordinary requests for it. This is its v2 edition. This edition is for requests that name the new API specifically — 'the new API', 'v2', 'the 2025-11-01 API', or '/web/enrich/live'. Differences from v1: optional human_mode (browser-like fetch for bot-protected pages); content is RAW HTML (v1 strips it); RESPONSE is a top-level ARRAY of {success, url, timestamp (s), title, content}. Failed URLs come back as success=false with null fields, in any order — match entries by url, not index.`,
    params: [
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `Input for POST /web/enrich/live (v2025-11-01).`,
      },
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_web_search',
    description: `Search the web for information about companies, people, or topics. Returns search results with titles, URLs, and snippets. V2 ALTERNATIVE: crustdata_web_search_v2 covers the same capability on the new /web/search/live API, for requests that name v2 specifically.`,
    params: [
      { name: 'params', type: 'object', required: true, description: `Web search parameters.` },
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
  {
    name: 'crustdatamcp_crustdata_web_search_v2',
    description: `WEB SEARCH on the v2 API (version 2025-11-01). crustdata_web_search covers this capability on the default API and serves ordinary requests for it. This is its v2 edition. This edition is for requests that name the new API specifically — 'the new API', 'v2', 'the 2025-11-01 API', or '/web/search/live'. Differences from v1: NO fetch_content parameter (it is removed in 2025-11-01 — search first, then pass result URLs to crustdata_web_fetch_v2); the country param is 'location' (not geolocation); 'page' aggregates that many result pages; optional human_mode for bot-protected retrieval. RESPONSE: {success, query, timestamp (ms), results[], metadata} — result shape varies by source.`,
    params: [
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `Input for POST /web/search/live (v2025-11-01).`,
      },
      {
        name: '_rationale',
        type: 'string',
        required: false,
        description: `Describe the user's intent and why this tool was selected in general terms only; do not include specific field values, names, emails, or other data.`,
      },
    ],
  },
]
