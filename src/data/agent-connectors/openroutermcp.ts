import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'openroutermcp_generate_image',
    description: `Generate an image from a text prompt and return it inline. The image is sent back as an image content block: clients that render images (e.g. desktop apps) display it, and the model can see it. This bills the authenticated user for the generation.`,
    params: [
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `Image model slug, e.g. "bytedance-seed/seedream-4.5"`,
      },
      {
        name: 'prompt',
        type: 'string',
        required: true,
        description: `Text description of the desired image`,
      },
      {
        name: 'size',
        type: 'string',
        required: false,
        description: `Optional output size, e.g. "2K", "4K", or explicit "1024x1024"`,
      },
    ],
  },
  {
    name: 'openroutermcp_get_credits',
    description: `Check the remaining account credit balance before running a workload.`,
    params: [],
  },
  {
    name: 'openroutermcp_get_generation',
    description: `Inspect cost, token counts, and serving provider for a specific generation id, to debug spend and routing. send-message returns the generation id of each call in its output.`,
    params: [
      {
        name: 'request',
        type: 'object',
        required: true,
        description: `Identifies the generation to inspect.`,
      },
    ],
  },
  {
    name: 'openroutermcp_get_model',
    description: `Get full details for one model by author/slug (supports :variant suffixes and slug aliases) without fetching the whole catalog. Use this instead of list-models when the model is already known.`,
    params: [
      {
        name: 'request',
        type: 'object',
        required: true,
        description: `Identifies the model to fetch by author and slug.`,
      },
    ],
  },
  {
    name: 'openroutermcp_list_app_rankings',
    description: `See which APPS/products drive the most OpenRouter traffic, filterable by category, to gauge ecosystem adoption and find example use cases. For model rankings use list-daily-model-rankings instead.`,
    params: [
      {
        name: 'request',
        type: 'object',
        required: false,
        description: `Optional filters and pagination for the app ranking query.`,
      },
    ],
  },
  {
    name: 'openroutermcp_list_benchmarks',
    description: `Compare model quality beyond price using third-party benchmarks. The optional source arg selects the dataset and the result shape: source=artificial-analysis returns intelligence, coding, and agentic index scores; source=design-arena returns head-to-head standings (elo, win rate) filterable by arena and category. Omit source to get results from all sources in one call. Optional task_type (coding, intelligence, agentic) narrows to models suited for that workload.`,
    params: [
      {
        name: 'request',
        type: 'object',
        required: false,
        description: `Optional filters for the benchmark query.`,
      },
    ],
  },
  {
    name: 'openroutermcp_list_daily_model_rankings',
    description: `See which MODELS are most used and trending by token volume, to pick a proven model. Optionally slice by period (day/week/month), modality, context_bucket, or by category / language_type (sampled weekly estimates). For app/product rankings use list-app-rankings instead.`,
    params: [
      {
        name: 'request',
        type: 'object',
        required: false,
        description: `Optional filters and time grain for the model ranking query.`,
      },
    ],
  },
  {
    name: 'openroutermcp_list_model_endpoints',
    description: `See which providers serve a given model and at what price, latency, throughput, and data-policy status, to choose routing or debug a slow provider.`,
    params: [
      {
        name: 'request',
        type: 'object',
        required: true,
        description: `Identifies the model whose serving endpoints should be listed.`,
      },
    ],
  },
  {
    name: 'openroutermcp_list_models',
    description: `List the live OpenRouter model catalog with pricing, context length, modalities, supported parameters, and benchmark scores, to pick a model and wire the right slug into code. Prefer the server-side params over fetching the full list and post-processing. Search/sort: q (free-text name/slug search), sort (pricing-low-to-high/high-to-low, context-high-to-low, throughput-high-to-low, latency-low-to-high, most-popular, top-weekly, newest, intelligence-high-to-low, coding-high-to-low, agentic-high-to-low, design-arena-elo-high-to-low). Filters: category (use case, e.g. programming), min_price/max_price (prompt $/M), min_output_price/max_output_price (completion $/M), context (minimum tokens), min_age_days/max_age_days (model age), min_intelligence_index/max, min_coding_index/max, min_agentic_index/max (Artificial Analysis indices), min_tool_success_rate/max (0-1), arch (model family), model_authors, providers (case-sensitive display names, e.g. Groq), input/output_modalities, supported_parameters, zdr, and region.`,
    params: [
      {
        name: 'request',
        type: 'object',
        required: false,
        description: `Search, sort, and filter parameters for the model catalog. All fields are optional; omit entirely to list all models with default ordering.`,
      },
    ],
  },
  {
    name: 'openroutermcp_list_providers',
    description: `List available providers to configure allow/deny/routing preferences.`,
    params: [],
  },
  {
    name: 'openroutermcp_list_task_classifications',
    description: `See what OpenRouter traffic is actually used for: a market-share breakdown by task type (code generation, web search, summarization, ...) over a trailing window, each with its top models by usage, plus macro-category (Code, Data, Agent, General) aggregates. Use to learn which models real usage favors for a given kind of work. All shares are fractions (0-1) of sampled traffic; absolute volumes are not exposed.`,
    params: [
      {
        name: 'request',
        type: 'object',
        required: false,
        description: `Optional windowing options for the task classification query.`,
      },
    ],
  },
  {
    name: 'openroutermcp_ping',
    description: `Health-check tool that verifies the MCP connection is alive.`,
    params: [],
  },
  {
    name: 'openroutermcp_search_docs',
    description: `Search the full OpenRouter documentation to answer "how do I…" questions with correct, current API usage. Each result includes a "View docs" link to the source page; if a result is marked truncated or the complete page is needed, fetch that link or share it with the user.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `What to look up in the OpenRouter docs, e.g. "stream responses"`,
      },
      {
        name: 'max_results',
        type: 'integer',
        required: false,
        description: `How many doc sections to return`,
      },
    ],
  },
  {
    name: 'openroutermcp_send_feedback',
    description: `Submit structured feedback on a specific generation the caller made — a category plus an optional comment. Use after a generation had a problem (wrong or incoherent output, latency, formatting, billing, or an API error) so the OpenRouter team can act on it. Requires the generation id, which get-generation and send-message both return.`,
    params: [
      {
        name: 'request',
        type: 'object',
        required: true,
        description: `Structured feedback about a specific generation`,
      },
    ],
  },
  {
    name: 'openroutermcp_send_message',
    description: `Chat with a model and get its plain-text response, to test a prompt or compare models without leaving the editor. Model slug suffixes activate routing variants: ":online" enables web search (e.g. "deepseek/deepseek-v4-pro:online"), ":nitro" prioritizes throughput, ":floor" prioritizes lowest price, ":free" uses a free endpoint if one exists. For normal chats, omit "provider" and let the router choose. Set "provider" to pin the upstream provider only when zero variance is needed, such as running evals or reproducing a result.`,
    params: [
      { name: 'message', type: 'string', required: true, description: `The user message to send` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `Model slug, e.g. "openai/gpt-4o-mini"`,
      },
      {
        name: 'provider',
        type: 'object',
        required: false,
        description: `Provider routing preferences. Leave unset for normal chats so the router picks the best provider. Set ONLY when the request needs zero provider variance — running evals, benchmarking, or reproducing a result — because providers differ in quantization, throughput, and sampling, so the same model can return different outputs depending on who serves it. To hard-pin one provider: { only: ["fireworks"], allow_fallbacks: false }.`,
      },
      { name: 'system', type: 'string', required: false, description: `Optional system prompt` },
    ],
  },
  {
    name: 'openroutermcp_view_skills',
    description: `Retrieve a curated OpenRouter best-practice recipe (an Agent Skill) by name. Available skills:
- find-best-model-evals: Find the best OpenRouter model for a specific task by running a real eval on your own data — balancing quality, cost, and speed, with each candidate pinned to one provider so results don't drift.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Skill name from the list in this tool description`,
      },
      {
        name: 'path',
        type: 'string',
        required: false,
        description: `File within the skill (defaults to SKILL.md)`,
      },
    ],
  },
]
