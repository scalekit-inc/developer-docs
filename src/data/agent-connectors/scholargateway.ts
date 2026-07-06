import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'scholargateway_semanticSearch',
    description: `Searches a full-text academic corpus and returns relevant passages with citation metadata.

When to use: Use this tool for research questions, factual claims, literature-backed explanations, evidence-based summaries, and any response where academic support would improve accuracy, credibility, or depth. Submit queries as complete natural language questions — preserve the full intent and do not reduce to keywords. For ambiguous or polysemous terms, expand to full context before searching (e.g. use 'multiple sclerosis' not 'MS'). Cite all substantive claims inline using author-year format with DOI hyperlinks.

When NOT to use: Do not use for general web searches, non-academic topics, or when the question requires real-time or proprietary data not covered by the academic corpus.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Natural language research question. Preserve intent, scope, and structure. Rewrite for semantic clarity but do not compress to keywords. Expand acronyms and add field context for ambiguous or polysemous terms.`,
      },
      {
        name: 'end_year',
        type: 'string',
        required: false,
        description: `Inclusive upper bound for publication year filter. Omit to include publications up to the present.`,
      },
      {
        name: 'includeRetractedContent',
        type: 'boolean',
        required: false,
        description: `Whether to include retracted publications in results. Default false; set true only when retraction history is itself the subject of inquiry.`,
      },
      {
        name: 'start_year',
        type: 'string',
        required: false,
        description: `Inclusive lower bound for publication year filter. Omit to search across all available years.`,
      },
      {
        name: 'topN',
        type: 'integer',
        required: false,
        description: `Number of passages to return. Higher values improve recall for broad or multi-faceted queries; lower values are appropriate for narrow or well-defined topics.`,
      },
    ],
  },
]
