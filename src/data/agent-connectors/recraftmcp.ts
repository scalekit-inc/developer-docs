import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'recraftmcp_create_style',
    description: `Create a custom style from one or more reference images. Provide images via URLs or base64-encoded data. The style parameter defines the base style type.`,
    params: [
      {
        name: 'input_image_type',
        type: 'string',
        required: true,
        description: `Visual image type for the style`,
      },
      {
        name: 'input_style_images_b64',
        type: 'array',
        required: false,
        description: `Base64-encoded reference images (1–5). Mutually exclusive with input_style_images_urls.`,
      },
      {
        name: 'input_style_images_urls',
        type: 'array',
        required: false,
        description: `Publicly accessible HTTPS URLs of reference images (1–5). Mutually exclusive with input_style_images_b64.`,
      },
      {
        name: 'model',
        type: 'string',
        required: false,
        description: `Model version. Default: recraftv4_1.`,
      },
      {
        name: 'private',
        type: 'boolean',
        required: false,
        description: `Whether the style is private.`,
      },
      {
        name: 'style_prompt',
        type: 'string',
        required: false,
        description: `Optional text prompt to refine style (1–1000 chars).`,
      },
    ],
  },
  {
    name: 'recraftmcp_creative_upscale',
    description: `Upscale an image using creative AI enhancement. Returns the upscaled image as a URL and a WEBP preview.`,
    params: [
      {
        name: 'input_image_url',
        type: 'string',
        required: true,
        description: `Publicly accessible HTTPS URL of the input image (PNG/JPEG/WEBP). Use request_upload_url first for local files.`,
      },
    ],
  },
  {
    name: 'recraftmcp_crisp_upscale',
    description: `Upscale an image with sharp, crisp quality enhancement. Returns the upscaled image as a URL and a WEBP preview.`,
    params: [
      {
        name: 'input_image_url',
        type: 'string',
        required: true,
        description: `Publicly accessible HTTPS URL of the input image (PNG/JPEG/WEBP). Use request_upload_url first for local files.`,
      },
    ],
  },
  {
    name: 'recraftmcp_delete_style',
    description: `Delete a custom style by its ID.`,
    params: [
      {
        name: 'input_style_id',
        type: 'string',
        required: true,
        description: `ID of the style to delete.`,
      },
    ],
  },
  {
    name: 'recraftmcp_erase_region',
    description: `Erase a masked region from an image, filling it with content-aware background. Returns the processed image as a URL and a WEBP preview.`,
    params: [
      {
        name: 'input_image_url',
        type: 'string',
        required: true,
        description: `Publicly accessible HTTPS URL of the source image (PNG/JPEG/WEBP).`,
      },
      {
        name: 'mask_image_url',
        type: 'string',
        required: true,
        description: `Publicly accessible HTTPS URL of the mask image. White areas will be erased.`,
      },
    ],
  },
  {
    name: 'recraftmcp_generate_background',
    description: `Generate a background for a masked region of an image based on a text prompt. Returns the processed image as a URL and a WEBP preview.`,
    params: [
      {
        name: 'input_image_url',
        type: 'string',
        required: true,
        description: `Publicly accessible HTTPS URL of the source image (PNG/JPEG/WEBP).`,
      },
      {
        name: 'mask_image_url',
        type: 'string',
        required: true,
        description: `Publicly accessible HTTPS URL of the mask image. White areas define the background region.`,
      },
      {
        name: 'prompt',
        type: 'string',
        required: true,
        description: `Text prompt for the background (1–10000 chars).`,
      },
      {
        name: 'input_style',
        type: 'string',
        required: false,
        description: `Visual style. Mutually exclusive with input_style_id.`,
      },
      {
        name: 'input_style_id',
        type: 'string',
        required: false,
        description: `Style ID to apply. Mutually exclusive with input_style.`,
      },
      { name: 'model', type: 'string', required: false, description: `Model version.` },
      {
        name: 'n',
        type: 'integer',
        required: false,
        description: `Number of images to generate (1–6). Default: 1.`,
      },
    ],
  },
  {
    name: 'recraftmcp_generate_image',
    description: `Generate an image from a text prompt. Returns image URLs and WEBP previews.`,
    params: [
      {
        name: 'prompt',
        type: 'string',
        required: true,
        description: `Text prompt (1–10000 chars).`,
      },
      {
        name: 'image_size',
        type: 'string',
        required: false,
        description: `Image dimensions or aspect ratio. Default: 1:1.`,
      },
      {
        name: 'input_style',
        type: 'string',
        required: false,
        description: `Visual style. Mutually exclusive with input_style_id.`,
      },
      {
        name: 'input_style_id',
        type: 'string',
        required: false,
        description: `Style ID. Mutually exclusive with input_style.`,
      },
      {
        name: 'model',
        type: 'string',
        required: false,
        description: `Model version. Default: recraftv4_1.`,
      },
      {
        name: 'n',
        type: 'integer',
        required: false,
        description: `Number of images (1–6). Default: 1.`,
      },
    ],
  },
  {
    name: 'recraftmcp_get_style',
    description: `Get details of a specific style by its ID.`,
    params: [
      {
        name: 'style_id',
        type: 'string',
        required: true,
        description: `UUID of the style (e.g. '550e8400-e29b-41d4-a716-446655440000').`,
      },
    ],
  },
  {
    name: 'recraftmcp_get_user',
    description: `Get information about the current user including ID, email, name, and credit balance.`,
    params: [],
  },
  {
    name: 'recraftmcp_image_to_image',
    description: `Transform an existing image based on a text prompt. The strength parameter controls how much the output differs from the input.`,
    params: [
      {
        name: 'input_image_url',
        type: 'string',
        required: true,
        description: `Publicly accessible HTTPS URL of the input image (PNG/JPEG/WEBP).`,
      },
      {
        name: 'prompt',
        type: 'string',
        required: true,
        description: `Text prompt for the transformation (1–10000 chars).`,
      },
      {
        name: 'image_size',
        type: 'string',
        required: false,
        description: `Output image dimensions.`,
      },
      {
        name: 'input_style',
        type: 'string',
        required: false,
        description: `Visual style. Mutually exclusive with input_style_id.`,
      },
      {
        name: 'input_style_id',
        type: 'string',
        required: false,
        description: `Style ID. Mutually exclusive with input_style.`,
      },
      { name: 'model', type: 'string', required: false, description: `Model version.` },
      { name: 'n', type: 'integer', required: false, description: `Number of images (1–6).` },
      {
        name: 'strength',
        type: 'number',
        required: false,
        description: `Transformation strength (0=identical, 1=fully transformed). Default: 0.6.`,
      },
    ],
  },
  {
    name: 'recraftmcp_inpaint_image',
    description: `Fill in a masked region of an image based on a text prompt. Returns the processed image as a URL and a WEBP preview.`,
    params: [
      {
        name: 'input_image_url',
        type: 'string',
        required: true,
        description: `Publicly accessible HTTPS URL of the source image (PNG/JPEG/WEBP).`,
      },
      {
        name: 'mask_image_url',
        type: 'string',
        required: true,
        description: `Publicly accessible HTTPS URL of the mask image. White areas define the inpainting region.`,
      },
      {
        name: 'prompt',
        type: 'string',
        required: true,
        description: `Text prompt describing what to paint in the masked region (1–10000 chars).`,
      },
      {
        name: 'input_style',
        type: 'string',
        required: false,
        description: `Visual style. Mutually exclusive with input_style_id.`,
      },
      {
        name: 'input_style_id',
        type: 'string',
        required: false,
        description: `Style ID. Mutually exclusive with input_style.`,
      },
      {
        name: 'model',
        type: 'string',
        required: false,
        description: `Model version to use for generation.`,
      },
      {
        name: 'n',
        type: 'integer',
        required: false,
        description: `Number of images to generate (1–6).`,
      },
    ],
  },
  {
    name: 'recraftmcp_list_styles',
    description: `List all custom styles created by the current user.`,
    params: [],
  },
  {
    name: 'recraftmcp_remove_background',
    description: `Remove the background from an image. Returns the result as a URL and a WEBP preview.`,
    params: [
      {
        name: 'input_image_url',
        type: 'string',
        required: true,
        description: `Publicly accessible HTTPS URL of the image (PNG/JPEG/WEBP).`,
      },
    ],
  },
  {
    name: 'recraftmcp_replace_background',
    description: `Replace the background of an image based on a text prompt. Returns the processed image as a URL and a WEBP preview.`,
    params: [
      {
        name: 'input_image_url',
        type: 'string',
        required: true,
        description: `Publicly accessible HTTPS URL of the source image (PNG/JPEG/WEBP).`,
      },
      {
        name: 'prompt',
        type: 'string',
        required: true,
        description: `Text prompt describing the new background (1–10000 chars).`,
      },
      {
        name: 'input_style',
        type: 'string',
        required: false,
        description: `Visual style. Mutually exclusive with input_style_id.`,
      },
      {
        name: 'input_style_id',
        type: 'string',
        required: false,
        description: `Style ID. Mutually exclusive with input_style.`,
      },
      {
        name: 'model',
        type: 'string',
        required: false,
        description: `Model version to use for generation.`,
      },
      {
        name: 'n',
        type: 'integer',
        required: false,
        description: `Number of images to generate (1–6).`,
      },
    ],
  },
  {
    name: 'recraftmcp_request_upload_url',
    description: `Issue an upload URL for a direct image upload. Use this when you have a local image file and need a publicly accessible URL. PUT the image bytes to the returned upload URL, then use the resulting image_url in other tools.`,
    params: [],
  },
  {
    name: 'recraftmcp_subscription_plans',
    description: `List available Recraft subscription plans with their credits, refill periods, and pricing.`,
    params: [],
  },
  {
    name: 'recraftmcp_suggest_model',
    description: `Suggest the best Recraft image generation model for a given user request.`,
    params: [
      {
        name: 'prompt',
        type: 'string',
        required: true,
        description: `The user's image generation request to evaluate.`,
      },
    ],
  },
  {
    name: 'recraftmcp_variate_image',
    description: `Generate variations of an existing image. Returns image URLs and WEBP previews.`,
    params: [
      {
        name: 'input_image_url',
        type: 'string',
        required: true,
        description: `Publicly accessible HTTPS URL of the source image (PNG/JPEG/WEBP).`,
      },
      {
        name: 'image_size',
        type: 'string',
        required: false,
        description: `Output image size as aspect ratio.`,
      },
      {
        name: 'input_style',
        type: 'string',
        required: false,
        description: `Visual style. Mutually exclusive with input_style_id.`,
      },
      {
        name: 'input_style_id',
        type: 'string',
        required: false,
        description: `Style ID. Mutually exclusive with input_style.`,
      },
      {
        name: 'model',
        type: 'string',
        required: false,
        description: `Model version to use for generation.`,
      },
      {
        name: 'n',
        type: 'integer',
        required: false,
        description: `Number of variations to generate (1–6).`,
      },
    ],
  },
  {
    name: 'recraftmcp_vectorize_image',
    description: `Convert a raster image to a vector format. Returns the vector image as a URL.`,
    params: [
      {
        name: 'input_image_url',
        type: 'string',
        required: true,
        description: `Publicly accessible HTTPS URL of the raster image (PNG/JPEG/WEBP).`,
      },
    ],
  },
]
