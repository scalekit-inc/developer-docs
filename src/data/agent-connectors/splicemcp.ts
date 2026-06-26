import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'splicemcp_create_stack',
    description: `Create a multi-track stack from an existing Splice sample, optionally generating a public share URL.`,
    params: [
      {
        name: 'asset_uuid',
        type: 'string',
        required: true,
        description: `The UUID of the sample to use as the seed for the stack`,
      },
      {
        name: 'bpm',
        type: 'integer',
        required: false,
        description: `Target BPM for the stack (e.g. use the seed sample's BPM). Omit to let the backend decide.`,
      },
      {
        name: 'generate_public_url',
        type: 'boolean',
        required: false,
        description: `Set to true ONLY if the user explicitly asks for a shareable, public, or web link. Defaults to false.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `An optional name for the stack`,
      },
    ],
  },
  {
    name: 'splicemcp_describe_a_sound',
    description: `Search the Splice catalog for samples matching a natural language description, with optional BPM and type filters.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Natural language description of the sound you are looking for`,
      },
      { name: 'bpm_max', type: 'integer', required: false, description: `Maximum BPM filter` },
      { name: 'bpm_min', type: 'integer', required: false, description: `Minimum BPM filter` },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Sample type: loop or oneshot`,
      },
    ],
  },
  {
    name: 'splicemcp_download_asset',
    description: `Purchase a Splice sample and return a presigned download URL for the audio file.`,
    params: [
      {
        name: 'asset_uuid',
        type: 'string',
        required: true,
        description: `UUID of the asset to download`,
      },
      {
        name: 'download_path',
        type: 'string',
        required: false,
        description: `Optional hint indicating where the client should save the downloaded file. The server returns a presigned URL; the client is responsible for fetching and saving the file. Omit when the client does not have local filesystem access (e.g. web-based clients).`,
      },
    ],
  },
  {
    name: 'splicemcp_prompt_to_stack',
    description: `Generate a complete multi-track arrangement of compatible samples from a text prompt describing the desired sound.`,
    params: [
      {
        name: 'prompt',
        type: 'string',
        required: true,
        description: `Your prompt describing the sound you want to create (e.g. "lo-fi hip hop beat at 80 bpm with a groovy bassline and jazzy piano", "an upbeat pop song in the style of Bruno Mars in the key of C major")`,
      },
      {
        name: 'bpm_max',
        type: 'integer',
        required: false,
        description: `Maximum BPM for sample selection based on the genre. Must be provided together with bpm_min.`,
      },
      {
        name: 'bpm_min',
        type: 'integer',
        required: false,
        description: `Minimum BPM for sample selection based on the genre. Infer from genre when the user does not specify a BPM. Typical ranges: lo-fi/chill 60–100, soulful beats/R&B 70–120, pop 100–130, disco/funk 110–130, house/techno/dance 115–135, industrial/experimental 110–150, drum and bass/jungle 160–180. For genres not listed, ensure at least a 30 BPM spread between bpm_min and bpm_max.`,
      },
      {
        name: 'generate_public_url',
        type: 'boolean',
        required: false,
        description: `Set to true ONLY if the user explicitly asks for a shareable, public, or web link. Defaults to false.`,
      },
    ],
  },
  {
    name: 'splicemcp_share_stack',
    description: `Generate a public shareable URL for an existing stack by its UUID.`,
    params: [
      {
        name: 'stack_uuid',
        type: 'string',
        required: true,
        description: `UUID of the stack to share`,
      },
    ],
  },
  {
    name: 'splicemcp_update_stack',
    description: `Modify an existing stack by adding, removing, or swapping sounds, or by renaming it or changing its BPM.`,
    params: [
      {
        name: 'stack_uuid',
        type: 'string',
        required: true,
        description: `The UUID of the stack to modify (returned as Stack UUID by create_stack or prompt_to_stack). Use the UUID value, not a URL.`,
      },
      {
        name: 'add_asset_uuids',
        type: 'string',
        required: false,
        description: `Asset UUIDs to add as new layers at the end of the stack. Mutually exclusive with add_compatible_layers.`,
      },
      {
        name: 'add_compatible_layers',
        type: 'string',
        required: false,
        description: `Layers to add using harmonically compatible samples. Specify the instrument type for each layer. Mutually exclusive with add_asset_uuids.`,
      },
      {
        name: 'bpm',
        type: 'integer',
        required: false,
        description: `New playback BPM for the stack`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New name for the stack (max 64 characters)`,
      },
      {
        name: 'remove_layer_uuids',
        type: 'string',
        required: false,
        description: `Layer UUIDs to remove from the stack (use the Layer UUID values shown in the stack output)`,
      },
      {
        name: 'swap_compatible_layers',
        type: 'string',
        required: false,
        description: `Layers to swap with harmonically compatible replacements. Mutually exclusive with swap_layers.`,
      },
      {
        name: 'swap_layers',
        type: 'string',
        required: false,
        description: `Layers whose sample content should be replaced with a specific asset. Mutually exclusive with swap_compatible_layers.`,
      },
    ],
  },
]
