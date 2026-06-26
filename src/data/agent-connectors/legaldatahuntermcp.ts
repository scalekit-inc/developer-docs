import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'legaldatahuntermcp_discover_countries',
    description: `List all available countries with their document counts and source counts. Returns LDH jurisdiction codes (mostly ISO 3166-1 alpha-2, plus supranational codes like EU, UN, CoE, INTL, OECD) with case law, legislation, and doctrine source counts and total document counts. This is the authoritative list of valid country codes to use in search and resolve_reference.`,
    params: [],
  },
  {
    name: 'legaldatahuntermcp_discover_sources',
    description: `List all data sources available for a specific country. Returns source IDs, data_types (namespaces each source covers: "case_law", "legislation", or "doctrine"), court names, tiers, document counts, and date ranges. Use this to understand what data is available before filtering a search.`,
    params: [
      {
        name: 'country_code',
        type: 'string',
        required: true,
        description: `LDH jurisdiction code for the country whose sources to list, e.g. "FR", "DE", "EU".`,
      },
      {
        name: 'include_empty',
        type: 'boolean',
        required: false,
        description: `If true, include sources with zero indexed documents (placeholders awaiting backfill).`,
      },
    ],
  },
  {
    name: 'legaldatahuntermcp_get_document',
    description: `Retrieve a legal document by its source and source_id. Returns a 2 KB text snippet by default; pass include_full_text=true to inline the complete document body. Use source and source_id values from search or resolve_reference results.`,
    params: [
      {
        name: 'source',
        type: 'string',
        required: true,
        description: `Source identifier for the legal database, e.g. "FR/Judilibre" or "DE/BVerfG".`,
      },
      {
        name: 'source_id',
        type: 'string',
        required: true,
        description: `Document identifier within the specified source.`,
      },
      {
        name: 'include_full_text',
        type: 'boolean',
        required: false,
        description: `If false (default), text is truncated to the leading 2 KB with text_truncated=true. Set true to return the full document text inline.`,
      },
    ],
  },
  {
    name: 'legaldatahuntermcp_get_filters',
    description: `Get available filter values for a specific data source. Returns distinct courts, jurisdictions, chambers, decision types, languages, court tiers, and date ranges that can be used to refine search results. For sources spanning multiple namespaces, pass namespace to select which namespace's filters to return.`,
    params: [
      {
        name: 'source',
        type: 'string',
        required: true,
        description: `Source identifier to get filters for, e.g. "FR/Judilibre" or "AT/RIS".`,
      },
      {
        name: 'namespace',
        type: 'string',
        required: false,
        description: `Optional namespace — "case_law", "legislation", or "doctrine". Required for sources spanning multiple namespaces; otherwise the namespace with the most rows is used.`,
      },
    ],
  },
  {
    name: 'legaldatahuntermcp_report_source_issue',
    description: `Report an issue with a data source to the platform maintainer. Use this to flag problems encountered during research — missing data, broken URLs, indexing errors, or data quality issues. Reports are reviewed by the Legal Data Hunter team. Does not count against your usage quota.`,
    params: [
      {
        name: 'issue_type',
        type: 'string',
        required: true,
        description: `Type of issue — one of: "unavailable", "indexing", "invalid_url", "data_quality", "other".`,
      },
      {
        name: 'source',
        type: 'string',
        required: true,
        description: `Source identifier for the data source being reported, e.g. "FR/Judilibre" or "AT/RIS".`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Free-text description of the problem encountered.`,
      },
    ],
  },
  {
    name: 'legaldatahuntermcp_resolve_reference',
    description: `Resolve a loose legal citation or reference to the exact matching document(s). Given an informal citation like "art. 6 code civil", "BVerfG 1 BvR 123/20", or "Regulation (EU) 2016/679", finds and returns the precise record. Supports ECLI, CELEX, article numbers, case numbers, NOR identifiers, and informal abbreviations.`,
    params: [
      {
        name: 'reference',
        type: 'string',
        required: true,
        description: `Legal reference string to resolve, e.g. "art. 6 code civil", "ECLI:FR:CCASS:2006:CO00559".`,
      },
      {
        name: 'hint_country',
        type: 'string',
        required: false,
        description: `LDH jurisdiction code to scope resolution (ISO 3166-1 alpha-2 or supranational codes like EU, CoE, INTL). Strongly recommended — roughly doubles the resolution rate.`,
      },
      {
        name: 'hint_type',
        type: 'string',
        required: false,
        description: `Type hint to further narrow resolution — "legislation" or "case_law".`,
      },
      {
        name: 'include_full_text',
        type: 'boolean',
        required: false,
        description: `If false (default), each returned document's text is truncated to the leading 2 KB. Set true to inline the full text in this response.`,
      },
    ],
  },
  {
    name: 'legaldatahuntermcp_search',
    description: `Search the world's fastest-growing legal database using hybrid semantic and keyword matching. Use this for anything touching the law: statutes, regulations, case law, official doctrine, or multi-jurisdictional and comparative legal questions. Covers tens of millions of primary-source documents across 230+ jurisdictions.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Natural language search query describing the legal topic or question.`,
      },
      {
        name: 'alpha',
        type: 'number',
        required: false,
        description: `Balance between semantic and keyword search (1.0 = pure semantic, 0.0 = pure keyword).`,
      },
      {
        name: 'country',
        type: 'array',
        required: false,
        description: `Filter by LDH jurisdiction codes (ISO 3166-1 alpha-2 or supranational codes like EU, UN, CoE, INTL, OECD).`,
      },
      {
        name: 'court_tier',
        type: 'integer',
        required: false,
        description: `Filter by court tier (1 = supreme, 2 = appellate, 3 = first instance).`,
      },
      {
        name: 'date_end',
        type: 'string',
        required: false,
        description: `End date filter in YYYY-MM-DD format.`,
      },
      {
        name: 'date_start',
        type: 'string',
        required: false,
        description: `Start date filter in YYYY-MM-DD format.`,
      },
      {
        name: 'jurisdiction',
        type: 'string',
        required: false,
        description: `Filter by jurisdiction name such as "civil" or "criminal".`,
      },
      {
        name: 'language',
        type: 'string',
        required: false,
        description: `Filter by language code, e.g. "fr" or "de".`,
      },
      {
        name: 'namespace',
        type: 'string',
        required: false,
        description: `Collection to search — "case_law", "legislation", or "doctrine".`,
      },
      {
        name: 'source',
        type: 'array',
        required: false,
        description: `Filter by source ID(s) from discover_sources, e.g. ["FR/Judilibre", "FR/CNIL"].`,
      },
      {
        name: 'subdivision',
        type: 'string',
        required: false,
        description: `Filter by geographic subdivision using ISO 3166-2 codes, e.g. "DE-BY" or "US-CA".`,
      },
      {
        name: 'top_k',
        type: 'integer',
        required: false,
        description: `Number of results to return (1–100).`,
      },
    ],
  },
]
