import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'runwaremcp_account',
    description: `Retrieve Runware account information including balance and usage.`,
    params: [
      {
        name: 'operation',
        type: 'string',
        required: true,
        description: `Which account operation to perform. Currently only "getDetails" is supported.`,
      },
      {
        name: 'includeCost',
        type: 'boolean',
        required: false,
        description: `Include cost information`,
      },
    ],
  },
  {
    name: 'runwaremcp_get_task_details',
    description: `Retrieve the original request and response for a previously executed task. Useful for recovering results or auditing past generations.`,
    params: [
      {
        name: 'taskUUID',
        type: 'string',
        required: true,
        description: `UUID of the task to retrieve`,
      },
    ],
  },
  {
    name: 'runwaremcp_image_upload',
    description: `Upload an image to Runware for use as input in subsequent generation tasks. Returns an image UUID that can be used as seedImage, maskImage, etc.`,
    params: [
      {
        name: 'image',
        type: 'string',
        required: true,
        description: `URL, data URI, or base64 of the image to upload`,
      },
    ],
  },
  {
    name: 'runwaremcp_list_capabilities',
    description: `List every model capability Runware supports, with their human-readable labels. Use this to discover the taxonomy (e.g. "io:text-to-image", "op:upscale") before filtering list_models by capability, or to answer "what can Runware do?".`,
    params: [],
  },
  {
    name: 'runwaremcp_list_models',
    description: `List Runware's official, curated model integrations. Returns each model's name, AIR identifier, headline, capabilities, and pricing. Call this FIRST whenever the user names or asks about a model that could be first-party (e.g. "FLUX 2 dev", "SDXL", "Veo 3", "Gemma", "Wan 2.5", "Z-Image"), and also for open-ended "what models are available?" questions. Match the user's named model against the returned names. Only fall through to model_search if no curated entry matches.`,
    params: [
      {
        name: 'capability',
        type: 'string',
        required: false,
        description: `Optional capability filter (e.g. "io:text-to-image", "op:upscale"). Use list_capabilities first to discover valid ids.`,
      },
      {
        name: 'category',
        type: 'string',
        required: false,
        description: `Optional output-modality filter`,
      },
      {
        name: 'creator',
        type: 'string',
        required: false,
        description: `Optional creator id filter (e.g. "google", "alibaba")`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Optional free-text search across name, AIR, creator, capabilities`,
      },
    ],
  },
  {
    name: 'runwaremcp_model_details',
    description: `Get the full curated metadata for a single Runware model by AIR identifier — name, headline, description, capabilities, pricing, and creator. Use this when the user wants more depth on a model already surfaced by list_models, or to confirm an AIR matches what the user named.`,
    params: [
      {
        name: 'air',
        type: 'string',
        required: true,
        description: `Model AIR identifier (e.g. "runware:400@1")`,
      },
    ],
  },
  {
    name: 'runwaremcp_model_examples',
    description: `Get sample input/output examples for a curated Runware model. Useful when the user wants to see what a model produces, or to crib a working request shape before constructing a run() call.`,
    params: [
      { name: 'air', type: 'string', required: true, description: `Model AIR identifier` },
      {
        name: 'capability',
        type: 'string',
        required: false,
        description: `Optional capability filter (e.g. "io:text-to-image")`,
      },
    ],
  },
  {
    name: 'runwaremcp_model_pricing',
    description: `Get pricing details for a curated Runware model — overview text plus example configurations with prices (e.g. "1024×1024 = $0.0032"). Use this when the user asks how much a specific model will cost.`,
    params: [{ name: 'air', type: 'string', required: true, description: `Model AIR identifier` }],
  },
  {
    name: 'runwaremcp_model_schema',
    description: `Get the parameter schema for a specific model. Returns the JSON Schema describing all accepted parameters, their types, defaults, and constraints. ALWAYS call this before calling run() with a model you haven't used before, so you know what parameters to pass.`,
    params: [
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `Model AIR identifier (e.g., "runware:400@1", "google:3@3", "google:gemma@4-31b")`,
      },
    ],
  },
  {
    name: 'runwaremcp_model_search',
    description: `Search Runware's Civitai mirror and community-uploaded models — third-party fine-tunes, user uploads, style LoRAs, custom checkpoints. ONLY use this AFTER list_models has been checked and the user's named model is not in the curated catalog, OR when the user explicitly asks for a Civitai or community model. Do NOT use this for first-party models like FLUX, SDXL, Veo, Imagen, Gemma, Wan, Z-Image — those live in list_models.`,
    params: [
      {
        name: 'search',
        type: 'string',
        required: true,
        description: `Search query (name, description, or AIR ID)`,
      },
      {
        name: 'architecture',
        type: 'string',
        required: false,
        description: `Filter by architecture (e.g. "flux-1-dev", "sdxl")`,
      },
      {
        name: 'category',
        type: 'string',
        required: false,
        description: `Filter by model category`,
      },
      { name: 'tags', type: 'array', required: false, description: `Filter by tags` },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Filter checkpoints by type (only when category=checkpoint)`,
      },
    ],
  },
  {
    name: 'runwaremcp_model_upload',
    description: `Upload a custom AI model to Runware (checkpoint, LoRA, VAE, embeddings, etc.). Returns the AIR identifier once the upload completes.`,
    params: [
      {
        name: 'architecture',
        type: 'string',
        required: true,
        description: `Model architecture (e.g. "flux-1-dev", "sdxl")`,
      },
      { name: 'category', type: 'string', required: true, description: `Model category` },
      {
        name: 'downloadURL',
        type: 'string',
        required: true,
        description: `URL where the model weights can be downloaded from`,
      },
      { name: 'format', type: 'string', required: true, description: `Weight file format` },
      { name: 'name', type: 'string', required: true, description: `Display name for the model` },
      { name: 'version', type: 'string', required: true, description: `Model version` },
      {
        name: 'air',
        type: 'string',
        required: false,
        description: `Optional AIR identifier (format: provider:model@version)`,
      },
    ],
  },
  {
    name: 'runwaremcp_run',
    description: `Run an AI inference task on Runware. Supports image generation, video generation, audio generation, 3D generation, upscaling, background removal, captioning, and more. Pass a model AIR identifier and task-specific parameters. Example: { "model": "runware:400@1", "positivePrompt": "a cat", "width": 1024, "height": 1024 }`,
    params: [
      {
        name: 'model',
        type: 'string',
        required: true,
        description: `Model AIR identifier (e.g., "runware:400@1" for image, "google:3@3" for video, "google:gemma@4-31b" for LLM)`,
      },
    ],
  },
]
