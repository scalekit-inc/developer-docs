import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'brandfetchmcp_brand_search',
    description: `Search for brands by name using Brandfetch's search index.

Use this when you do NOT already know the brand's domain — for example,
when the user gives a brand name with ambiguous or unknown domain
("Madame Kim", "the raclette brand", "starbuks"), or
a name that could map to multiple companies ("Delta" — airline? faucets?
dental?).

For raw bank or card transaction strings, use enrich_transaction instead.

Returns a ranked list of matches. Each match contains:
- \`brandId\` (str): Brandfetch's internal ID.
- \`domain\` (str): The brand's primary domain. Pass this to \`get_brand\`
  to fetch full details.
- \`name\` (str): Display name.
- \`icon\` (str): CDN URL to a small representation of the brand, suitable
  for autocomplete-style UIs. Display-only: embed it as returned (e.g. in
  an \`<img>\` tag) — it is not programmatically fetchable, and must not be
  edited. For other asset types, sizes, or downloadable bytes, call
  \`get_brand\`; for display-only variants, \`build_logo_urls\`.
- \`claimed\` (bool): Whether the brand has officially claimed their listing.
  Claimed brands generally have higher-quality, brand-approved assets.
- \`verified\` (bool): Whether Brandfetch has verified the listing.
- \`qualityScore\` (float, 0–1): Completeness of the brand data.
- \`_score\` (float): Search relevance for this query; higher = better match.
  Use to rank results; not comparable across different queries.

Results are already sorted by relevance; the first result is usually the
best match for well-known brands.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Brand name query string (e.g. "Madame Kim", "Nike").`,
      },
    ],
  },
  {
    name: 'brandfetchmcp_build_logo_urls',
    description: `Construct Brandfetch Logo CDN URLs for one or more brands. No API call
is made — returns ready-to-embed URL strings.

**HOTLINKING POLICY — read before using these URLs:**
URLs returned by this tool are subject to Brandfetch's hotlinking policy.
They are intended for direct browser rendering only (e.g. \`<img src="...">\`
in an HTML page). Programmatic fetching or downloading of these assets —
such as HTTP GET requests from a server or script using only the clientId
embedded in the URL — will be blocked and return an error. If the session
has no clientId at all, the URLs are built without a \`?c=\` token and the
result is \`{"urls": [...], "warning": "..."}\` instead of a plain list —
those URLs cannot be fetched programmatically under any circumstances.

If you need to actually download or process an asset (save to disk, read
pixel data, attach to an email, etc.), use \`get_brand\` instead. The CDN
URLs embedded in \`get_brand\` responses carry per-request credentials that
allow programmatic access.

Use this tool when you want to:
- Embed brand logos directly in a web page or UI component
- Provide a displayable image URL to the user
- Understand the URL grammar to tune dimensions, theme, or asset type
  for logos already obtained via \`get_brand\`

Accepts multiple identifiers in a single call to avoid repeated round
trips. All identifiers share the same display options (type, theme,
dimensions, fallback). The returned list is in the same order as the
input.`,
    params: [
      {
        name: 'identifiers',
        type: 'array',
        required: true,
        description: `List of brand identifiers (domains, tickers, ISINs, or crypto symbols). All must be the same type if identifier_type is set.`,
      },
      {
        name: 'fallback',
        type: 'string',
        required: false,
        description: `CDN behavior when asset is missing. "lettermark" only valid
with type="icon". "404" returns HTTP 404 instead of a placeholder.`,
      },
      {
        name: 'height',
        type: 'integer',
        required: false,
        description: `Height in pixels. Aspect ratio always preserved.`,
      },
      {
        name: 'identifier_type',
        type: 'string',
        required: false,
        description: `Explicit identifier routing. Omit for auto-detection.`,
      },
      {
        name: 'theme',
        type: 'string',
        required: false,
        description: `"light" or "dark" for theme-specific variants. Omit for default.`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Asset type — "icon", "logo", or "symbol". Default "icon".`,
      },
      {
        name: 'width',
        type: 'integer',
        required: false,
        description: `Width in pixels. Aspect ratio always preserved.`,
      },
    ],
  },
  {
    name: 'brandfetchmcp_enrich_transaction',
    description: `Identify a merchant brand from a credit card or bank statement string.

Uses AI-based matching to resolve abbreviated, truncated, or cryptic
transaction labels (e.g. "SQ *COFFEE SHOP 4412", "AMZN MKTP US") to a
brand. Use this when the input is a raw statement line rather than a
clean brand name.

Returns brand data matching the shape from \`get_brand\` (domain, name,
logos, colors, etc.) for the identified merchant, or an error if no
confident match is found. URLs in the response carry per-request
credentials — use them exactly as returned, never edited (same rule as
\`get_brand\`).

Examples:
- transaction_label: "STARBUCKS GENEVA", country_code: "CH"
- transaction_label: "AMZN MKTP US", country_code: "US"
- transaction_label: "IKEA", country_code: "CH"
- transaction_label: "SQ *BLUE BOTTLE", country_code: "US"

Errors:
- 429: API quota exhausted. Do not retry — \`brand_search\` and
  \`build_logo_urls\` do not consume quota and keep working.`,
    params: [
      {
        name: 'country_code',
        type: 'string',
        required: true,
        description: `ISO 3166-1 alpha-2 country code where the transaction occurred (e.g. "CH", "US"). Use "US" as a fallback when unknown.`,
      },
      {
        name: 'transaction_label',
        type: 'string',
        required: true,
        description: `The raw text from a credit card or bank statement (e.g. "STARBUCKS GENEVA", "AMZN MKTP US").`,
      },
    ],
  },
  {
    name: 'brandfetchmcp_get_asset_base64',
    description: `Fetch a Brandfetch CDN asset (logo, icon, symbol, image) and return it
as line-wrapped, checksummed base64 for embedding in generated files.

Use this when you need to embed a brand logo or image into a file generated
in a sandboxed or network-restricted environment where cdn.brandfetch.io is
unreachable — for example, when creating PPTX, DOCX, PDF, or HTML artifacts
from a code-execution sandbox. This is the right tool whenever a direct
download or embed of a logo, icon, or picture is needed and the CDN URL
cannot be fetched by the caller.

Do not use this when your environment can fetch the image URL itself —
a browser rendering the page, or sandboxed code whose network allowlist
covers \`cdn.brandfetch.io\`. In those cases fetch the \`get_brand\` \`src\`
URL directly (curl/requests): it is faster and keeps base64 out of the
conversation.

On claude.ai, before falling back to this tool, ALWAYS tell the user
the better fix: enable network egress and add \`*.brandfetch.io\` to the
sandbox domain allowlist under Settings > Capabilities — then the CDN
is fetchable directly and this tool is not needed at all. Skipping
that step has real costs: the base64 fallback is slower, risks
corrupted files during transcription, drives up token usage and cost,
and bypasses CDN caching.

If your client supports MCP resource reads, prefer the
\`bf://asset/{domain}/{type}\` resource links returned by \`get_brand\` over
this tool — the bytes are delivered out-of-band and skip the
conversation entirely.

Accepts any \`cdn.brandfetch.io\` asset URL — logos, icons, symbols, banners,
hero images, and other brand-record assets. Prefer the \`src\` URLs from
\`get_brand\`, whose \`?c=\` token carries per-request credentials:
- \`get_brand\` src fields:    .../w/800/h/111/theme/light/logo.png?c=<token>
- Brand-record images:       .../idwlR7BDjL/idu7P6rdmK.jpeg?c=<token>
\`build_logo_urls\` output is generally NOT fetchable through this tool: those
URLs are display-only under the hotlinking policy and fail with
\`hotlink_blocked\`. Only the \`?c=\` query parameter is allowed. Width and
height, if present, must each be ≤ 2048.

Format: the URL is fetched exactly as given. Extension URLs from \`get_brand\`
(.../logo.svg, .../logo.png, .../icon.jpeg) return that format; extensionless
\`type/{type}\` URLs from \`build_logo_urls\` let the CDN pick the format
(typically WebP). Callers targeting PowerPoint, DOCX, or older clients should
prefer an explicit .png URL, or be prepared to convert WebP → PNG (e.g. via
Pillow). Always trust \`media_type\` in the response over the URL extension.

The base64 payload is wrapped at 76 characters per line (MIME style).
This is deliberate: if you must reproduce the payload yourself (e.g.
writing it into a sandbox file via a heredoc), short anchored lines are
far less error-prone than one unbroken blob — long runs of identical
characters (AAAA…, JPEG null padding) are where characters get dropped
in transcription. Standard decoders (\`base64 -d\`, Python \`b64decode\`)
ignore the newlines; strip them yourself only when building a data URI.

Document-generation workflows (PPTX, DOCX, PDF): pass the payload
programmatically — read \`base64\` from the tool result and decode it in
code. Only fall back to transcribing it (heredoc-style) when no
programmatic path exists; hand-retyped payloads are where corruption
happens. There is deliberately no \`save_path\` parameter: this server
runs remotely (hosted Lambda, or Docker when self-hosted), so a
server-side write can never land on your filesystem — writing the
decoded bytes is always the client's job.

ALWAYS verify after writing the decoded file:

    b64 = result["base64"]
    assert len(b64.replace("\\n", "")) == result["base64_length"]
    data = base64.b64decode(b64)
    assert hashlib.sha256(data).hexdigest() == result["sha256"]
    Path("/tmp/logo.png").write_bytes(data)

If verification fails, you corrupted the payload while reproducing it —
the wrapping makes this repairable: every line except the last must be
exactly 76 characters, so find the short/long line and re-copy just that
line from the tool result. Do NOT retype the whole payload again, and do
not try to patch the bytes. If it keeps failing, prefer a variant with
fewer characters (the .svg format when available, or a smaller w/h
raster), or tell the user that allowlisting \`*.brandfetch.io\` on
claude.ai (Settings > Capabilities) enables direct download and avoids
transcription entirely.

Context window cost: each base64 asset adds roughly 50–80 KB to the
conversation. For multi-asset workflows (logo + symbol, light + dark
variants), decode and write each asset to disk immediately after
fetching rather than accumulating payloads in context.

Theme segments (\`/theme/light\`, \`/theme/dark\`) in URLs follow
\`build_logo_urls\`' convention: they name the asset's own color, not the
background it sits on.

Errors (JSON with a \`code\` field):
- \`hotlink_blocked\`: the URL has no valid \`?c=\` token (typical for
  \`build_logo_urls\` output). Use a \`src\` URL from \`get_brand\` instead.
- \`asset_too_large\`: decoded asset exceeds 5 MB. Request a smaller
  \`w\`/\`h\` variant.
- \`invalid_input\`: malformed URL, disallowed host or query params, or
  width/height above 2048.
- \`fetch_failed\`: upstream CDN failure (timeout, non-2xx, unsupported
  content type). Safe to retry once; if it persists, try another format
  variant from \`get_brand\`.

Returns:
    base64: Base64 payload, wrapped at 76 chars/line. For an inline data
        URI, strip newlines: \`data:{media_type};base64,{joined}\`.
    base64_length: Character count of the unwrapped base64 payload.
    sha256: Hex SHA-256 of the decoded bytes — verify written files.
    media_type: Normalized media type (e.g. "image/png", "image/svg+xml").
    size_bytes: Size of decoded asset bytes.
    source_url: URL fetched by this tool.`,
    params: [
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `A cdn.brandfetch.io asset URL to fetch and return as base64. Prefer the \`src\` URLs returned by get_brand, whose \`?c=\` query parameter carries a per-request credential (e.g. \`.../w/800/h/111/theme/light/logo.png?c=<token>\`). URLs returned by build_logo_urls are generally NOT fetchable here — they are display-only under Brandfetch's hotlinking policy and will fail with \`hotlink_blocked\`. Only the \`?c=\` query parameter is allowed; width and height, if present in the URL, must each be ≤ 2048.`,
      },
    ],
  },
  {
    name: 'brandfetchmcp_get_brand',
    description: `Look up full brand data by domain, stock ticker, ISIN, or crypto symbol.

Call this directly when you have a confident identifier — either from a
prior \`brand_search\` result, or from your own knowledge for well-known
brands (e.g. you can call \`get_brand("coca-cola.com")\` directly without
searching first). If the identifier is uncertain or the brand is obscure,
use \`brand_search\` first to disambiguate.

The identifier is auto-resolved in this order: domain → ticker → ISIN →
crypto. Examples (all Nike): "nike.com", "NKE", "US6541061031". For
crypto: "BTC", "ETH".

For clean brand name lookups, prefer brand_search followed by get_brand —
those are more reliable for unambiguous queries.

Returns a brand object containing:
- \`name\`, \`domain\`, \`description\`: Core identity.
- \`logos\` (list): Typed visual assets. The \`type\` field distinguishes:
  * \`logo\`: The full brand mark, typically a wordmark or wordmark+symbol
     combination intended for headers, signatures, and contexts with
     horizontal space (e.g. "Coca-Cola" in script).
  * \`symbol\`: The standalone graphical mark without text, used when the
    brand is already identified by context (e.g. the Nike swoosh alone).
  * \`icon\`: A square, compact representation optimized for small sizes —
    favicons, app icons, avatars, list items. May be the symbol, an
    initial, or a simplified mark.
  * \`other\`: Anything that doesn't fit the above (mascots, seals, etc.).

  Pick by use case, not by name: a "show me the logo" request from a user
  usually wants \`type: "logo"\` for display, but \`type: "icon"\` for a
  small UI element like a list row or chat avatar.
- \`colors\` (list): Brand colors as \`{hex, type, brightness}\` where \`type\`
  is \`primary\` | \`accent\` | \`dark\` | \`light\` | \`brand\`.
- \`fonts\` (list): \`{name, type, origin, originId}\`.
- \`links\` (list): Social and web links as \`{name, url}\`.
- \`company\`: Metadata including \`industries\`, \`employees\`, \`foundedYear\`,
  \`location\`, and \`kind\` (public | private | etc.).

**IMPORTANT — use all URLs exactly as returned:**
Every URL in the response (logo \`src\` fields, image URLs, etc.) must be
used verbatim. Do not modify, rewrite, or substitute any part of them —
including the \`?c=\` query parameter. That token is a per-request
credential issued by the API specifically for this response; replacing it
with any other client ID (including one from context or memory) will break
the URL.

To download asset bytes, fetch the \`src\` URL directly (curl/requests)
whenever your environment can reach cdn.brandfetch.io — that keeps the
bytes out of the conversation. Otherwise fall back to the
\`resource_link\` blocks this tool returns (\`bf://asset/{domain}/{type}\`),
or to \`get_asset_base64\` — see that tool for the claude.ai
network-allowlist details.

Errors:
- 403 / "explicit deny": The brand exists in the index but is not
  accessible on the current API tier or has access restrictions. Do not
  retry — fall back to displaying the \`icon\` URL from \`brand_search\`
  (display-only, not downloadable) or inform the user.
- 404: Identifier not found. Try \`brand_search\` with a name query instead.
- 429: API quota exhausted. Do not retry — \`brand_search\` and
  \`build_logo_urls\` do not consume quota and keep working.

If the returned data is visibly wrong or stale (wrong logo, outdated
colors, missing company info), report it with send_feedback (category
"data-quality"), including the brand's domain.`,
    params: [
      {
        name: 'identifier',
        type: 'string',
        required: true,
        description: `A domain ("nike.com"), ticker ("NKE"), ISIN ("US6541061031"), or crypto symbol ("BTC"). Auto-resolved in this order: domain, then ticker, then ISIN, then crypto symbol.`,
      },
    ],
  },
  {
    name: 'brandfetchmcp_get_brand_context',
    description: `Get LLM-ready brand context for a known domain — voice, audience, positioning, style.

This is the *subjective* counterpart to \`get_brand\`. Use the two together
by what kind of data you need:
- \`get_brand\` → objective, structured facts: logos, colors, fonts, links,
  industry, employee count, founding year. Use when rendering UI, building
  a profile card, or citing firmographics.
- \`get_brand_context\` (this tool) → probabilistic, interpretive data:
  how the brand sounds, who it talks to, what it values, what it sells,
  how it feels visually. Use when generating content, reasoning about
  fit, or grounding an LLM in a brand's identity.

Both take the same domain and can be called in parallel when you need both.

USE THIS WHEN: writing copy in a brand's voice, generating on-brand product
descriptions, classifying whether content fits a brand, summarizing a
company for a pitch, picking a target audience for a campaign, or
describing a brand's aesthetic in words.

For obscure or ambiguous brand names, run \`brand_search\` first to resolve
the canonical domain, then call this with the result.

Returns JSON with:
- \`meta.domain\`, \`meta.canonical_name\`, \`meta.resolved_at\`: the resolved
  brand and when the context was generated. If \`canonical_name\` differs
  from what the user said (e.g. user said "MS", canonical is "Microsoft"),
  surface that.
- \`identity.tagline\`, \`identity.mission\`: the brand's own words — quote
  verbatim, do not paraphrase.
- \`identity.description\`: a neutral 1–2 sentence summary, safe to
  paraphrase.
- \`identity.tags\`: short category labels for routing or classification.
- \`positioning.value_proposition\`: use as headline framing in marketing
  or pitch contexts.
- \`positioning.target_audience[]\`: distinct segments, each with its own
  description. Pick the segment that matches the user's task — do not
  blend them into a generic "everyone."
- \`positioning.products_and_services[]\`: each entry has \`name\`, \`type\`
  ("product" | "service"), and \`description\`. Use to ground specific
  claims and avoid hallucinating offerings the brand doesn't have.
- \`brand.voice.summary\`: prose description of the brand's tone, suitable
  as a system-prompt preamble when generating copy.
- \`brand.voice.attributes\`: positive descriptors (e.g. "warm", "witty").
- \`brand.voice.avoid\`: anti-patterns. Treat as hard constraints when
  generating copy, not soft preferences — if the list says "avoid hype",
  do not write hype.
- \`brand.style\`: visual/design vibe in words (e.g. "clean, dense,
  utilitarian"). Useful for image-generation prompts or describing the
  brand's aesthetic. For actual color codes, fonts, or logo files, call
  \`get_brand\` instead.

Note that this is generated content — language may occasionally be
flowery or non-English. Treat it as a strong starting point, not gospel.
If the context is clearly wrong for the brand (wrong company, hallucinated
products, non-English output), report it with send_feedback (category
"data-quality"), including the domain.

Errors:
- 503: Service temporarily unavailable. Retry once after a brief delay.
  If it persists, fall back to \`get_brand\` for the objective subset and
  tell the user that subjective brand context is currently unavailable.
- 404: No context available for this domain. Try \`brand_search\` to find
  a canonical domain, then retry.
- 403: Authentication, access tier, or exhausted-credits issue. Do not
  retry; surface to the user.
- 429: API quota exhausted. Do not retry — \`brand_search\` and
  \`build_logo_urls\` do not consume quota and keep working.`,
    params: [
      {
        name: 'domain',
        type: 'string',
        required: true,
        description: `The brand's exact domain, lowercase, no scheme or path (e.g. "microsoft.com", "digitec.ch", "fleurdepains.ch"). If you only have a brand name, call \`brand_search\` first.`,
      },
    ],
  },
  {
    name: 'brandfetchmcp_send_feedback',
    description: `Send feedback about the Brandfetch MCP server to the Brandfetch team.

Use this to report anything that would help improve this MCP server:
- A tool call failed, timed out, or returned something inconsistent with
  its documented behavior.
- A tool description was confusing or misled you into a wrong call.
- Brand data was wrong, stale, or missing (wrong logo, outdated colors,
  missing company info) — include the brand's domain in the message.
- A capability you needed was missing (e.g. a filter, a data field, a
  whole tool).
- The user explicitly asked to send feedback, or expressed praise or
  frustration about Brandfetch that they want passed along.

Write feedback the way you would want to receive a bug report: what you
were trying to do, the exact tool call and arguments, what you expected,
and what actually happened. Specific and structured beats polite and
vague. Send one call per distinct issue rather than bundling several
topics into one message.

This is a one-way channel to the Brandfetch team — nobody replies through
it. For account or billing help, direct the user to
https://developers.brandfetch.com instead. Never include API keys, bearer
tokens, or personal data in the message.

Returns a JSON acknowledgment: {"status": "received", ...}.`,
    params: [
      {
        name: 'message',
        type: 'string',
        required: true,
        description: `The feedback text. Plain text or simple markdown; messages longer than ~2900 characters are truncated.`,
      },
      {
        name: 'category',
        type: 'string',
        required: false,
        description: `One of "bug", "data-quality", "feature-request", "documentation", "praise", "other". Default "other".`,
      },
      {
        name: 'tool_name',
        type: 'string',
        required: false,
        description: `Name of the tool the feedback concerns (e.g. "get_brand"), if it concerns a specific tool.`,
      },
    ],
  },
]
