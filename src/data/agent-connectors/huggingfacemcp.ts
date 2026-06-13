import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'huggingfacemcp_dynamic_space',
    description: `Call a Hugging Face MCP-enabled Space dynamically. Use 'discover' to list available MCP spaces, 'view_parameters' to inspect a space's tools, or 'invoke' to call a specific tool.`,
    params: [
      {
        name: 'operation',
        type: 'string',
        required: false,
        description: `Action to perform: discover lists available tasks, view_parameters inspects a space, invoke runs it.`,
      },
      {
        name: 'parameters',
        type: 'string',
        required: false,
        description: `JSON string of input parameters. Used only with the "invoke" operation.`,
      },
      {
        name: 'space_name',
        type: 'string',
        required: false,
        description: `Space ID in "username/space-name" format. Required for "view_parameters" and "invoke" operations.`,
      },
    ],
  },
  {
    name: 'huggingfacemcp_gr1_z_image_turbo_generate',
    description: `Generate an image from a text prompt using the Image Turbo model hosted on Hugging Face Spaces.`,
    params: [
      {
        name: 'prompt',
        type: 'string',
        required: false,
        description: `Text prompt describing the desired image content`,
      },
      {
        name: 'random_seed',
        type: 'boolean',
        required: false,
        description: `Generate a new random seed for each run. Set to false to use the value in the seed field.`,
      },
      {
        name: 'resolution',
        type: 'string',
        required: false,
        description: `Output resolution in "WIDTHxHEIGHT ( RATIO )" format.`,
      },
      {
        name: 'seed',
        type: 'integer',
        required: false,
        description: `Seed value for reproducible image generation. Ignored when random_seed is true.`,
      },
      {
        name: 'shift',
        type: 'number',
        required: false,
        description: `Time shift parameter for the flow matching scheduler. Controls generation quality.`,
      },
      {
        name: 'steps',
        type: 'number',
        required: false,
        description: `Number of inference steps for the diffusion process. Higher values improve quality but take longer.`,
      },
    ],
  },
  {
    name: 'huggingfacemcp_hf_doc_fetch',
    description: `Fetch the content of a Hugging Face documentation page by URL, with optional character offset for pagination.`,
    params: [
      {
        name: 'doc_url',
        type: 'string',
        required: true,
        description: `Full URL of the Hugging Face or Gradio documentation page to fetch.`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `Token offset for paginating large documents. Use the offset value from the truncation message to fetch the next chunk.`,
      },
    ],
  },
  {
    name: 'huggingfacemcp_hf_doc_search',
    description: `Search Hugging Face documentation across all products or a specific product by query.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Semantic search query. Use an empty string to explore structure and navigation tips, or provide a specific query to find targeted documentation.`,
      },
      {
        name: 'product',
        type: 'string',
        required: false,
        description: `Hugging Face product or library to filter results by. Provide when known to narrow the search.`,
      },
    ],
  },
  {
    name: 'huggingfacemcp_hf_hub_query',
    description: `Ask a natural language question about the Hugging Face Hub and get an AI-generated answer.`,
    params: [
      {
        name: 'message',
        type: 'string',
        required: true,
        description: `Natural language query to run against the Hugging Face Hub.`,
      },
    ],
  },
  {
    name: 'huggingfacemcp_hf_whoami',
    description: `Return the currently authenticated Hugging Face user's profile information.`,
    params: [],
  },
  {
    name: 'huggingfacemcp_hub_repo_details',
    description: `Retrieve details for one or more Hugging Face Hub repositories by their IDs.`,
    params: [
      {
        name: 'repo_ids',
        type: 'array',
        required: true,
        description: `One or more repository IDs in "author/name" format. Supports models, datasets, and spaces.`,
      },
      {
        name: 'config',
        type: 'string',
        required: false,
        description: `Dataset Viewer config name. Required for dataset_preview when the dataset has multiple configs. Discover available configs via dataset_structure.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Number of rows to return for dataset_preview. Defaults to 5; clamped between 1 and 100.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Row offset for dataset_preview pagination. Defaults to 0.`,
      },
      {
        name: 'operations',
        type: 'array',
        required: false,
        description: `Details to return. Defaults to ["overview"]. For datasets, use ["overview", "dataset_structure"] first, then ["dataset_preview"] with config and split.`,
      },
      {
        name: 'repo_type',
        type: 'string',
        required: false,
        description: `Repository type to look up. Auto-detected when omitted.`,
      },
      {
        name: 'split',
        type: 'string',
        required: false,
        description: `Dataset split name. Required for dataset_preview when the dataset has multiple splits. Discover available splits via dataset_structure.`,
      },
    ],
  },
  {
    name: 'huggingfacemcp_hub_repo_search',
    description: `Search the Hugging Face Hub for models, datasets, or spaces with optional filters for author, task, and sort order.`,
    params: [
      {
        name: 'author',
        type: 'string',
        required: false,
        description: `Organization or user namespace to filter results by.`,
      },
      {
        name: 'filters',
        type: 'array',
        required: false,
        description: `Hub filter tags to apply to each selected repo type. Supports task tags, language codes, and framework tags.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of results to return per selected repository type. Clamped between 1 and 100.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Search term for repositories. Leave blank with sort + limit set to browse trending or recent repos.`,
      },
      {
        name: 'repo_types',
        type: 'array',
        required: false,
        description: `Repository types to include in the search. Defaults to model and dataset. space uses keyword search.`,
      },
      {
        name: 'sort',
        type: 'string',
        required: false,
        description: `Sort order for results, applied in descending order.`,
      },
    ],
  },
  {
    name: 'huggingfacemcp_paper_search',
    description: `Search Hugging Face Papers by query and return matching papers with abstracts and author information.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Semantic search query for finding ML research papers.`,
      },
      {
        name: 'concise_only',
        type: 'boolean',
        required: false,
        description: `Return a 2-sentence abstract summary instead of the full text. Recommended for broad queries that return many results.`,
      },
      {
        name: 'results_limit',
        type: 'number',
        required: false,
        description: `Maximum number of paper results to return.`,
      },
    ],
  },
  {
    name: 'huggingfacemcp_space_search',
    description: `Search Hugging Face Spaces by query and return matching spaces with relevance scores.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Semantic search query for finding Hugging Face Spaces.`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of Space results to return.`,
      },
      {
        name: 'mcp',
        type: 'boolean',
        required: false,
        description: `Set to true to return only MCP Server-enabled Spaces. Required when using results with dynamic_space.`,
      },
    ],
  },
]
