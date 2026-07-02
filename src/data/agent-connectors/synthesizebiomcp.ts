import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'synthesizebiomcp_analyze_gene_expression',
    description: `Start a differential gene expression analysis using Synthesize Bio's AI platform, returning a job ID to track progress.`,
    params: [
      { name: 'resolution_id', type: 'string', required: true, description: `The completed resolution_id returned by resolve_sample_metadata.` },
    ],
  },
  {
    name: 'synthesizebiomcp_get_analysis_results',
    description: `Poll the status and results of a running gene expression analysis job.`,
    params: [
      { name: 'job_id', type: 'string', required: true, description: `The job_id returned by analyze_gene_expression.` },
    ],
  },
  {
    name: 'synthesizebiomcp_get_counts_data_url',
    description: `Retrieve a presigned download URL for the raw gene expression counts data produced by a completed analysis job.`,
    params: [
      { name: 'job_id', type: 'string', required: true, description: `The job_id returned by analyze_gene_expression.` },
    ],
  },
  {
    name: 'synthesizebiomcp_resolve_sample_metadata',
    description: `Resolve a natural-language experiment description into structured sample groups using Synthesize Bio's AI metadata extraction.`,
    params: [
      { name: 'modality', type: 'string', required: false, description: `Sequencing modality. Defaults to "bulk".` },
      { name: 'prompt', type: 'string', required: false, description: `Natural language description of the experiment, e.g. "heart vs liver cells" or "KRAS knockout vs control in lung adenocarcinoma". Required unless \`resolution_id\` is provided to poll a previously-started resolution.` },
      { name: 'resolution_id', type: 'string', required: false, description: `Resolution identifier from a previous response with status 'resolving'. When provided, polls that in-flight resolution and \`prompt\` may be omitted.` },
    ],
  },
]
