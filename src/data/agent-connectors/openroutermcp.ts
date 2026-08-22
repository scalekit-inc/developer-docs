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
    name: 'openroutermcp_generate_speech',
    description: `Synthesize speech from text and return it inline as an audio content block (clients that can play audio render it; not all MCP clients can). This bills the authenticated user. Find TTS models via list-models with output_modalities=speech, and each model's voices via get-model (supported_voices). Cost is available afterwards via get-generation.`,
    params: [
      { name: 'input', type: 'string', required: true, description: `Text to synthesize` },
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `TTS model slug, e.g. "mistralai/voxtral-mini-tts-2603"`,
      },
      {
        name: 'voice',
        type: 'string',
        required: true,
        description: `Voice identifier (provider-specific); list a model's supported_voices via get-model`,
      },
      {
        name: 'response_format',
        type: 'string',
        required: false,
        description: `Audio output format; defaults to mp3`,
      },
      {
        name: 'speed',
        type: 'number',
        required: false,
        description: `Playback speed multiplier; only honored by models that support it`,
      },
    ],
  },
  {
    name: 'openroutermcp_get_credits',
    description: `Check the remaining account credit balance before running a workload.`,
    params: [],
  },
  {
    name: 'openroutermcp_get_endpoint_uptime_history',
    description: `Get the hourly uptime history of every provider endpoint serving a model over the last 72 hours — the same per-provider uptime timeline shown on the model page. Use it to find which provider degraded during a window (e.g. "model X was failing between 05:00 and 08:30 UTC — whose uptime dipped?").`,
    params: [
      {
        name: 'author',
        type: 'string',
        required: true,
        description: `The model author/organization, e.g. "deepseek"`,
      },
      {
        name: 'slug',
        type: 'string',
        required: true,
        description: `The model slug, optionally with a variant suffix, e.g. "deepseek-chat" or "deepseek-chat:free"`,
      },
      {
        name: 'from',
        type: 'string',
        required: false,
        description: `Optional ISO 8601 start of the window, e.g. "2026-07-23T05:00:00Z". Data covers the last 72 hours.`,
      },
      {
        name: 'to',
        type: 'string',
        required: false,
        description: `Optional ISO 8601 end of the window, e.g. "2026-07-23T09:00:00Z"`,
      },
    ],
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
    name: 'openroutermcp_get_preset',
    description: `Get one saved preset by slug, including its designated version's config bundle (model, system prompt, temperature, and other sampling parameters), to inspect or reuse that configuration in a request. Find slugs with list-presets.`,
    params: [
      {
        name: 'request',
        type: 'object',
        required: true,
        description: `Identifies the preset to fetch.`,
      },
    ],
  },
  {
    name: 'openroutermcp_install_ori_harness',
    description: `Get the instructions for installing and using Ori Harness, then follow them. Call this tool FIRST when the user asks to install Ori, run their existing coding agent CLI through Ori, sign in to Ori, upgrade Ori, or choose an OpenRouter model for a local agent. It returns the complete recipe for installing Ori, signing in with OAuth without an API key, running an agent CLI under Ori, passing any OpenRouter model id with \`--model\`, upgrading with \`ori update\`, and verifying the installation. Do not use it for Ori model evaluations, plain unit tests, or when the user only wants to run an already-installed agent directly. Takes no arguments; the same document is published at https://openrouter.ai/skills/install-ori-harness.`,
    params: [],
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
    name: 'openroutermcp_list_presets',
    description: `List the caller's saved presets (named bundles of model, system prompt, and sampling config created in the OpenRouter dashboard), ordered by most recently updated. Use to discover which presets exist and get their slugs; use get-preset to inspect one preset's full config.`,
    params: [
      {
        name: 'request',
        type: 'object',
        required: false,
        description: `Optional pagination for the preset listing.`,
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
        name: 'max_tokens',
        type: 'integer',
        required: false,
        description: `Cap the total tokens generated (including reasoning). The single most effective lever to stop a reasoning model from running unbounded on a hard prompt. Omit for the model default.`,
      },
      {
        name: 'provider',
        type: 'object',
        required: false,
        description: `Provider routing preferences. Leave unset for normal chats so the router picks the best provider. Set ONLY when the request needs zero provider variance — running evals, benchmarking, or reproducing a result — because providers differ in quantization, throughput, and sampling, so the same model can return different outputs depending on who serves it. To hard-pin one provider: { only: ["fireworks"], allow_fallbacks: false }.`,
      },
      {
        name: 'reasoning_effort',
        type: 'string',
        required: false,
        description: `How hard a reasoning model should think: "max" | "xhigh" | "high" | "medium" | "low" | "minimal" | "none". Omit to use the model's own default. Use a lower value to cap cost/latency on reasoning models that over-think, or a higher value for hard prompts. Non-reasoning models ignore it. Discover a model's supported/default efforts via list-models or get-model.`,
      },
      { name: 'system', type: 'string', required: false, description: `Optional system prompt` },
      {
        name: 'timeout_ms',
        type: 'integer',
        required: false,
        description: `Abort the call locally after this many milliseconds. Returns a typed client_timeout error with elapsed_ms. If the timeout fires before any response, no generation id is available; if it fires while reading the response body, the generation may have completed upstream and been billed. Omit to wait for the default gateway timeout.`,
      },
    ],
  },
  {
    name: 'openroutermcp_spawn_ori_eval',
    description: `Get the instructions for running a model eval with Ori, then follow them. Ori runs the user's own agent on their own prompts, on a pinned harness and model, and grades what it did — so a score change means the model changed, not the environment. Call this tool FIRST, before writing any eval code: it returns a step-by-step recipe (install and auth checks, how to spawn \`ori code -p\`, how to relay Ori's scoping questions to the user, how to report results) that you carry out yourself. Do not hand-roll an eval instead.

Use it when the user asks which model they should use, wants to compare or bake off models, wants to measure whether their agent or prompt does the right thing, wants to catch regressions in agent behavior, or asks how good their current model is. Works for any codebase in any language.

Do not use it for plain unit tests that involve no model, and do not use it to re-run an eval that already exists (run \`ori eval <file>\` directly instead). Takes no arguments; the same document is published at https://openrouter.ai/skills/spawn-ori-eval.`,
    params: [],
  },
  {
    name: 'openroutermcp_transcribe_audio',
    description: `Transcribe speech from an audio file to text. Pass exactly one of audio_url (preferred; fetched server-side) or audio_base64. Returns the transcript plus the cost and generation id. This bills the authenticated user. Find STT models via list-models with output_modalities=transcription.`,
    params: [
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `STT model slug, e.g. "openai/whisper-large-v3"`,
      },
      {
        name: 'audio_base64',
        type: 'string',
        required: false,
        description: `Base64-encoded audio bytes, for small clips only. Requires format.`,
      },
      {
        name: 'audio_url',
        type: 'string',
        required: false,
        description: `HTTPS URL of the audio file to transcribe; fetched server-side (max 25 MB). Preferred over audio_base64.`,
      },
      {
        name: 'format',
        type: 'string',
        required: false,
        description: `Audio container format. Required with audio_base64; inferred from the URL or Content-Type otherwise.`,
      },
      {
        name: 'language',
        type: 'string',
        required: false,
        description: `ISO-639-1 language hint (e.g. "en", "ja"). Auto-detected if omitted.`,
      },
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
