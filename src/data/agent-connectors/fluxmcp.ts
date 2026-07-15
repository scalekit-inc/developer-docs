import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'fluxmcp_generate_image',
    description: `Submit one or more FLUX.2 image generations. Returns immediately after BFL accepts each submit; the iframe streams the actual images in as they finish.

Reference images go in \`input_medias: InputMedia[]\`. Two shapes:
  • \`{id: <string>}\` — for content already in our bucket.
  • \`{url: <https URL>}\` — ONLY for URLs the user typed from the open web.

For user-attached files, call \`request_upload_url\` FIRST and pass \`{id: data.media_id}\` from the tool's response.

Each \`requests\` entry is one image. Pass a single-item list for one image, or up to 8 entries to produce a batch in parallel.`,
    params: [
      {
        name: 'requests',
        type: 'array',
        required: true,
        description: `List of image generation requests. Pass a single-item list for one image; pass multiple to generate a batch in one call (each entry is submitted to BFL in parallel and the iframe renders the results as a clickable grid). Cap is 8 entries per call.`,
      },
    ],
  },
  {
    name: 'fluxmcp_generate_variations',
    description: `Generate N more images "in the same direction" as a previously completed generation. Use this tool whenever the user asks for variations of an existing generation — "more like that one", "give me variations", "another version", "show me alternatives", and similar.

Reads the original request from the DB (prompt, model, dimensions, safety, Flex knobs, AND input_image slots), and for models that support it sets \`prompt_upsampling=True\` so each call rephrases the prompt diversely before generation — combined with BFL's auto-picked seeds this produces compositionally distinct outputs in the same direction.

Pass ONLY the \`request_id\` (and optionally \`count\`) — every other field is sourced from the DB row.

Returns the same shape as \`generate_image\`: \`{data: {items: [{status: "pending", request_id, ...}, ...]}, message}\`.`,
    params: [
      {
        name: 'request_id',
        type: 'string',
        required: true,
        description: `The \`request_id\` of an existing ready generation to vary. The server reads its prompt, model, dimensions, safety_tolerance, Flex knobs, and any input_image slots and submits \`count\` fresh-seed clones in parallel.`,
      },
      {
        name: 'count',
        type: 'integer',
        required: false,
        description: `Number of variations to generate. Defaults to 4. Pass a different value only if the user specifically asked for it. Hard cap 8.`,
      },
    ],
  },
  {
    name: 'fluxmcp_get_credits',
    description: `Check the user's remaining BFL API credits AND welcome-bonus
free-generation balance.

The free pool is a one-time grant of N generations issued when
the user first connects MCP (counted in generations, not dollars
— every model decrements 1 from the pool regardless of cost).
Free generations are consumed automatically before paid credits;
when the free pool hits zero, gens charge the user's paid
balance.

Returns \`{credits, free_generations, free_generations_total_granted}\`
on success. \`free_generations\` may be 0 — surface that explicitly to
the user so they know the bonus is exhausted (it's a one-time
grant, not a refill).`,
    params: [],
  },
  {
    name: 'fluxmcp_get_history',
    description: `List the user's recent FLUX generations as a grid of thumbnails.

Each item carries the original prompt, model, seed, dimensions, plus \`image_url\` (full-res, 24h signed). The viewer offers per-tile Variations (regenerate via \`generate_variations\`) and Use (use the image as an \`input_medias\` entry on a follow-up \`generate_image\`), plus copy / download.

Pagination is keyset on \`created_at\`. Pass \`cursor=<next_cursor>\` to page back in time; combine with \`before\` / \`after\` for date ranges.

Returns the standard \`{data, message}\` shape. Errors: UNAUTHENTICATED, STORAGE_NOT_CONFIGURED, HISTORY_LIST_FAILED.`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Optional date filter: only return items strictly newer than this ISO-8601 timestamp.`,
      },
      {
        name: 'before',
        type: 'string',
        required: false,
        description: `Optional date filter: only return items strictly older than this ISO-8601 timestamp. Combine with \`cursor\` for keyset pagination over a fixed range.`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor. Pass \`data.next_cursor\` from a previous response to fetch the next (older) page. ISO-8601 timestamp; omit for the first page.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `DO NOT pass this argument. The viewer paginates with a Load more button — extra rows aren't useful in a single response. Omit so the server's default of 8 is used. Only override if the user literally said a number. Hard cap 16.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter by generation lifecycle status. Defaults to \`ready\`: completed generations only. Use \`all\` to include in-flight and failed rows.`,
      },
    ],
  },
  {
    name: 'fluxmcp_get_result',
    description: `DO NOT CALL FROM THE LLM. The image-viewer iframe handles all result polling automatically.

Internal tool: the iframe invokes this per pending item via \`app.callServerTool\` after \`generate_image\` returns with items in \`pending\` status. Each call inline-polls BFL up to \`INLINE_POLL_TIMEOUT_SECONDS\`; if the request is still running when the budget expires, the response is \`{status: "pending", request_id, ...}\` and the iframe just calls again.

Returns the same shape as a single-image \`generate_image\` result: \`{data: {status, image_url, image_path, seed, cost, remaining_credits, ...}, message}\` on ready, or \`{error: {code, ...}, message}\` on terminal failure.`,
    params: [
      {
        name: 'request_id',
        type: 'string',
        required: true,
        description: `The \`request_id\` returned by a previous \`generate_image\` call. The image-viewer iframe calls this tool per item to poll BFL until that item reaches a terminal state.`,
      },
    ],
  },
  {
    name: 'fluxmcp_refresh_image_url',
    description: `Mint a fresh 24h signed URL for an image already stored in this server's bucket. Internal: used by the iframe viewers to recover from expired URLs in older chats.

You normally do not need to call this from the LLM. Every fresh \`generate_image\` / \`get_history\` response includes a usable URL already. Call this only when the user explicitly asks for a refreshed link to an image they generated previously.

Returns \`{data: {url, expires_in_seconds}, message}\` on success, or an \`error\` payload (UNAUTHENTICATED, STORAGE_NOT_CONFIGURED, INVALID_IMAGE_PATH, REFRESH_FAILED).`,
    params: [
      {
        name: 'image_path',
        type: 'string',
        required: true,
        description: `Storage path of the image to renew, e.g. \`<user_id>/generations/<request_id>.jpg\`. Returned as \`data.image_path\` by \`generate_image\`, \`get_result\`, and \`get_history\`. Only paths owned by the calling user are accepted.`,
      },
    ],
  },
  {
    name: 'fluxmcp_request_upload_url',
    description: `Issue a signed PUT URL for a direct image upload to BFL's Storage bucket.

Use this ONLY when the user has attached a file in the chat and the image has no URL of its own. If the user already provided a public image URL, pass it as \`{url: <that URL>}\` inside \`input_medias\` on \`generate_image\` — do NOT route it through this upload step.

Flow:
  1. Call \`request_upload_url()\`. The response contains \`data.upload_url\` AND \`data.media_id\`.
  2. From your sandbox, PUT the raw bytes to \`data.upload_url\` with the appropriate \`Content-Type\`.
  3. Call \`generate_image\` with \`input_medias: [{id: data.media_id}]\`.

Allowed types: PNG, JPEG, WebP (static). Max size: 10 MB. Per-user cap: 20 image uploads (LRU eviction).

Returns the standard \`{data, message}\` / \`{error, message}\` shape.`,
    params: [],
  },
  {
    name: 'fluxmcp_vto',
    description: `Virtual try-on: dress \`person\` in \`garment\`. Preserves the subject's face, hair, and pose; only the worn item changes.

Use this tool — not \`generate_image\` — whenever the user wants to see a subject wearing a specific item from a reference image. Covers ALL wearable items: garments, hats, sunglasses, shoes, bags, jewelry, and accessories.

Prompt formula: "The person of image 1, maintaining exactly their face and pose, wearing the {GARMENT DESCRIPTION} of image 2."

Sourcing inputs (same {id}/{url} rules as generate_image):
- Person: upload via request_upload_url and pass {id: data.media_id}.
- Garment: if the user named a product without attaching an image, web-search for an official product image and pass its public URL as {url: <URL>}.

Response shape matches generate_image: returns immediately with {data: {items: [{status: "pending", request_id, ...}]}, message}.`,
    params: [
      {
        name: 'garment',
        type: 'string',
        required: true,
        description: `The item to try on — garment, hat, sunglasses, shoes, bag, or other wearable. Same {id}/{url} shape as person. Image 2 in the prompt template. For multi-piece outfits, merge into a single canvas first.`,
      },
      {
        name: 'person',
        type: 'string',
        required: true,
        description: `The subject to dress — usually a person, but a pet or mascot works too. Use {id: <media_id>} for uploads via request_upload_url or prior generation request_ids. Use {url: <https URL>} for public web images only. Keep at or below 1 MP for best results.`,
      },
      {
        name: 'prompt',
        type: 'string',
        required: true,
        description: `Styling instruction using the BFL formula: "The person of image 1, maintaining exactly their face and pose, wearing the {GARMENT DESCRIPTION} of image 2." Describe only the garment (category, fit, color). Do NOT describe what to preserve from the person.`,
      },
      {
        name: 'height',
        type: 'string',
        required: false,
        description: `Output canvas height in pixels. Same caps as width. Omit to let BFL default.`,
      },
      {
        name: 'seed',
        type: 'string',
        required: false,
        description: `Optional seed for reproducibility. Same seed + same inputs → same result.`,
      },
      {
        name: 'steps',
        type: 'string',
        required: false,
        description: `Number of denoising steps, 1–4. BFL defaults to 4 (highest quality). Lower values trade quality for speed.`,
      },
      {
        name: 'width',
        type: 'string',
        required: false,
        description: `Output canvas width in pixels. Omit to let BFL default. width * height must stay under 2 MP.`,
      },
    ],
  },
]
