import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'pixelbinmcp_create_prediction',
    description: `Start a PixelBin prediction (e.g. background removal, upscaling, watermark removal, image-to-video, image generation). ALWAYS call estimate-prediction-cost first to get a confirmation_token, present the credit cost to the user, and pass the token here. Image/video/PDF inputs must be public HTTPS URLs — use request-upload-url for local files or upload-asset-from-url for public URLs. Async: returns a prediction id; poll with get-prediction.`,
    params: [
      {
        name: 'input',
        type: 'object',
        required: true,
        description: `Operation-specific JSON input. Image/video/PDF values must be public HTTPS URLs.`,
      },
      {
        name: 'operation',
        type: 'string',
        required: true,
        description: `Operation id under the plugin (e.g. 'bg').`,
      },
      {
        name: 'plugin',
        type: 'string',
        required: true,
        description: `Plugin id from list-predictions (e.g. 'erase').`,
      },
      {
        name: 'confirmation_token',
        type: 'string',
        required: false,
        description: `Token returned by estimate-prediction-cost. Required to confirm credit spend.`,
      },
    ],
  },
  {
    name: 'pixelbinmcp_estimate_prediction_cost',
    description: `Estimate the credits a PixelBin prediction will consume before running it. Always call this before create-prediction. Returns creditsPerOperation, totalCredits, and a confirmation_token required by create-prediction.`,
    params: [
      {
        name: 'operation',
        type: 'string',
        required: true,
        description: `Operation id under the plugin.`,
      },
      {
        name: 'plugin',
        type: 'string',
        required: true,
        description: `Plugin id from list-predictions.`,
      },
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: `Number of times this operation will run. Defaults to 1.`,
      },
      {
        name: 'inputs',
        type: 'object',
        required: false,
        description: `Operation-specific inputs that affect cost. Optional for fixed-cost plugins.`,
      },
    ],
  },
  {
    name: 'pixelbinmcp_get_prediction',
    description: `Poll a PixelBin prediction by id. Returns status (ACCEPTED/RUNNING/SUCCESS/FAILURE) and, on SUCCESS, the result URL(s). Results are hosted ~30 days; use save-prediction-to-storage to persist permanently.`,
    params: [
      {
        name: 'prediction_id',
        type: 'string',
        required: true,
        description: `The prediction workflow id returned by create-prediction.`,
      },
    ],
  },
  {
    name: 'pixelbinmcp_list_predictions',
    description: `List available PixelBin prediction plugins and operations. Returns a catalog with display names, credit costs, and categories. Use include_schema=true to get input schemas for create-prediction.`,
    params: [
      {
        name: 'categories',
        type: 'string',
        required: false,
        description: `Optional comma-separated categories to filter (e.g. 'image-to-video,text-to-image').`,
      },
      {
        name: 'include_schema',
        type: 'boolean',
        required: false,
        description: `Include each plugin's input JSON Schema in the response.`,
      },
    ],
  },
  {
    name: 'pixelbinmcp_request_upload_url',
    description: `Mint a presigned PUT URL to upload a local file to PixelBin storage. Returns uploadUrl, headers, a curl command, and hostedUrl (the permanent CDN URL). Use for local files when you have shell/curl access. For public URLs, use upload-asset-from-url instead.`,
    params: [
      {
        name: 'filename',
        type: 'string',
        required: true,
        description: `File name with extension (e.g. 'photo.jpg'). Supported: jpg/jpeg/png/webp/avif/gif/bmp/tiff/heic/heif, mp4/webm/mov/avi/mkv/mpeg/mpg, pdf.`,
      },
      {
        name: 'access',
        type: 'string',
        required: false,
        description: `Access level. Defaults to public-read.`,
      },
      {
        name: 'overwrite',
        type: 'boolean',
        required: false,
        description: `Replace existing asset at same path. Defaults to false.`,
      },
      {
        name: 'path',
        type: 'string',
        required: false,
        description: `Optional folder path in PixelBin storage (e.g. 'mcp-uploads/'). Defaults to org root.`,
      },
    ],
  },
  {
    name: 'pixelbinmcp_save_prediction_to_storage',
    description: `Persist a completed prediction's output to the user's PixelBin storage as a permanent asset. Use after a successful create-prediction when the user wants to keep the result beyond its ~30-day expiry.`,
    params: [
      {
        name: 'prediction_id',
        type: 'string',
        required: true,
        description: `The prediction workflow id whose output to persist.`,
      },
      {
        name: 'access',
        type: 'string',
        required: false,
        description: `Access level for the saved asset. Defaults to public-read.`,
      },
      {
        name: 'path',
        type: 'string',
        required: false,
        description: `Optional folder path in PixelBin storage. Defaults to org root.`,
      },
    ],
  },
  {
    name: 'pixelbinmcp_upload_asset_from_url',
    description: `Ingest a publicly-reachable URL into the user's PixelBin storage. PixelBin fetches the asset server-side and returns a permanent CDN URL. Use when the user has a public URL; for local files use request-upload-url.`,
    params: [
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `Public HTTPS URL of the asset. Must be reachable without auth.`,
      },
      {
        name: 'access',
        type: 'string',
        required: false,
        description: `Access level. Defaults to public-read.`,
      },
      {
        name: 'format',
        type: 'string',
        required: false,
        description: `Optional file format override.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Optional asset filename without extension.`,
      },
      {
        name: 'overwrite',
        type: 'boolean',
        required: false,
        description: `Replace existing asset at same path. Defaults to false.`,
      },
      {
        name: 'path',
        type: 'string',
        required: false,
        description: `Optional folder path in PixelBin storage.`,
      },
    ],
  },
]
