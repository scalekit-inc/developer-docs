import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'alphaxivmcp_answer_pdf_queries',
    description: `Returns raw filtered page content from one PDF as XML. Supports arXiv, alphaXiv, and Semantic Scholar abstract pages. Multiple queries on the same paper can be batched into one call.`,
    params: [
      {
        name: 'queries',
        type: 'array',
        required: true,
        description: `A brief description of what information you're looking for in the paper.`,
      },
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `A PDF URL (e.g., 'https://arxiv.org/pdf/2307.12307', 'https://alphaxiv.org/abs/2307.12307')`,
      },
    ],
  },
  {
    name: 'alphaxivmcp_discover_papers',
    description: `Discovers and ranks multiple candidate papers for a research topic. Use for literature discovery, related work, or broad topical coverage.`,
    params: [
      {
        name: 'difficulty',
        type: 'number',
        required: true,
        description: `A 1-10 estimate of how much retrieval effort this request warrants.`,
      },
      {
        name: 'keywords',
        type: 'array',
        required: true,
        description: `3-4 concise keyword terms for exact-name, acronym, method, benchmark, author, or title matching.`,
      },
      {
        name: 'question',
        type: 'string',
        required: true,
        description: `A detailed semantic description of the papers that would best answer the user's request.`,
      },
    ],
  },
  {
    name: 'alphaxivmcp_get_paper_content',
    description: `Get the content of an arXiv/alphaXiv paper as text. By default returns a structured AI-generated intermediate report. Use the fullText option to get raw extracted text.`,
    params: [
      { name: 'url', type: 'string', required: true, description: `An arXiv or alphaXiv URL` },
      {
        name: 'fullText',
        type: 'boolean',
        required: false,
        description: `If true, return the full extracted text instead of the intermediate report.`,
      },
    ],
  },
  {
    name: 'alphaxivmcp_read_files_from_github_repository',
    description: `Reads the contents of a file or directory from the paper's codebase repository. Returns repository structure for '/', directory listing for directories, or file contents for files.`,
    params: [
      {
        name: 'githubUrl',
        type: 'string',
        required: true,
        description: `The URL of the paper's codebase repository.`,
      },
      {
        name: 'path',
        type: 'string',
        required: true,
        description: `The path to the file or directory. Use '/' to get the entire repository structure.`,
      },
    ],
  },
]
