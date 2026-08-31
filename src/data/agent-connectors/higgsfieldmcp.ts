import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'higgsfieldmcp_animation_actions',
    description: `Read-only catalog of the 3D rig animation library (678 actions: locomotion, gestures, dancing, combat, daily actions). Search by name or browse by group/category to find the animation_action_id for 3D generation with enable_animation=true. Each result has a preview_url GIF — when several candidates fit (e.g. many Idle or Walk variants), show the user the previews as markdown images and let them pick instead of choosing blindly. Does not create jobs.`,
    params: [
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Pagination cursor (next_page_token from a previous result).`,
      },
      {
        name: 'category',
        type: 'string',
        required: false,
        description: `Filter by category, e.g. Walking, Running, Jumping, Idle, Dancing, Punching (see \`categories\` in the result).`,
      },
      {
        name: 'group',
        type: 'string',
        required: false,
        description: `Filter by top-level group: WalkAndRun, BodyMovements, DailyActions, Dancing, Fighting.`,
      },
      { name: 'limit', type: 'integer', required: false, description: `Max results, default 20.` },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Search term matched against action name and category, e.g. 'walk', 'backflip', 'sword attack'. Omit to browse.`,
      },
    ],
  },
  {
    name: 'higgsfieldmcp_apps_describe',
    description: `Get an app's action contract: with \`action\`, the full input/output schema + execution mode for that one action; without it, a summary of every action. Also returns \`manifest_revision\`, which apps_invoke requires. Read-only.`,
    params: [
      { name: 'app_id', type: 'string', required: true, description: `App UUID from apps_search.` },
      {
        name: 'action',
        type: 'string',
        required: false,
        description: `Action name. Omit to list all actions in summary.`,
      },
    ],
  },
  {
    name: 'higgsfieldmcp_apps_invoke',
    description: `Run one described action on a Marketplace app AS the current user. First call apps_describe(app_id, action) to get the exact \`arguments\` schema and the \`manifest_revision\`, then pass them here. Long-running actions return { id, status: "queued" }. If a widget is visible, it polls the status action automatically — do not re-invoke get_* as a follow-up poll. In text-only clients, poll by invoking the app's status action (e.g. get_render) until status is completed/failed. The action's own annotations (from apps_describe) indicate cost/side-effects; confirm with the user before an expensive or destructive action.`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: true,
        description: `Action name from apps_describe.`,
      },
      { name: 'app_id', type: 'string', required: true, description: `App UUID from apps_search.` },
      {
        name: 'manifest_revision',
        type: 'string',
        required: true,
        description: `From apps_describe. If it changed since, the call is rejected with manifest_changed — re-describe.`,
      },
      {
        name: 'arguments',
        type: 'object',
        required: false,
        description: `Action arguments matching its input_schema. Do not put binary/media bytes here — pass a media_id.`,
      },
    ],
  },
  {
    name: 'higgsfieldmcp_apps_search',
    description: `Search Higgsfield Marketplace apps callable through MCP. Returns each app's id, name, and the actions it exposes. Flow: apps_search to find an app → apps_describe(app_id, action) to get an action's argument schema + manifest_revision → apps_invoke to run it. Read-only; does not call any app.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Opaque pagination cursor from a previous next_cursor.`,
      },
      { name: 'limit', type: 'integer', required: false, description: `Max results (default 20).` },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Case-insensitive substring over app name/description. Omit to list all.`,
      },
    ],
  },
  {
    name: 'higgsfieldmcp_balance',
    description: `Get the user's available credits and current subscription plan. For transaction history, call \`transactions\` instead.`,
    params: [],
  },
  {
    name: 'higgsfieldmcp_cancel_trial_auto_renewal',
    description: `Cancel the auto-renewal of the Higgsfield MCP free trial. Call this when the user asks to cancel the trial, cancel auto-renewal, stop the upcoming charge, or asks how to cancel. IMPORTANT SEMANTICS: cancelling stops the automatic charge at the end of the trial ONLY — the user KEEPS trial access and remaining trial credits until the trial ends; nothing is charged. First call WITHOUT \`confirm\` (or confirm=false): in UI clients this opens a confirmation card with 'Keep trial with auto-renewal' and 'Cancel auto-renewal' buttons; in text-only clients relay \`assistant_response\` verbatim and wait for the user's explicit confirmation. Only call again with \`confirm=true\` after the user explicitly confirmed the cancellation in chat. Never pass confirm=true on the first call.`,
    params: [
      {
        name: 'confirm',
        type: 'boolean',
        required: false,
        description: `false (default): show the cancellation confirmation (widget in UI clients, question in text clients) — always start here. true: actually cancel auto-renewal — pass ONLY after the user explicitly confirmed the cancellation in chat (text-only clients; in UI clients the widget button confirms).`,
      },
    ],
  },
  {
    name: 'higgsfieldmcp_create_voice',
    description: `Open the Create Voice Apps UI. Call this immediately when the user asks to create a voice, call the Create Voice tool, or needs a local browser record/upload surface and no confirmed audio_media_id is already present. Do not ask the user to upload an audio file or provide the name in chat first; the widget collects the required name plus record/upload audio. If the user already has or attached an audio file in chat, still call this tool with initial_tab='upload' — remote tools cannot read Claude chat attachments, so the user re-selects the file in the widget's Upload tab (it uploads directly to Higgsfield). Do not try to pass a chat attachment or ask for a URL. The widget records/uploads, confirms the audio, and creates the voice itself end-to-end — and if the user is out of credits or on a free plan it shows the plans/credits UI inline. After the widget reports success you do NOT need to call create_voice_from_confirmed_audio again. Only call create_voice_from_confirmed_audio yourself when a confirmed audio_media_id is already present in the prompt and no UI step is needed.`,
    params: [
      {
        name: 'initial_tab',
        type: 'string',
        required: false,
        description: `Initial tab for the create voice UI. Defaults to record. Use 'upload' when the user already has or attached an audio file.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Initial name to prefill in the UI.`,
      },
    ],
  },
  {
    name: 'higgsfieldmcp_create_voice_from_confirmed_audio',
    description: `Backend-only creation of a cloned voice from an already confirmed audio upload. Do not call this tool until audio_media_id and name are already known. For direct creation, first upload speech audio with media_upload, PUT the bytes, then call media_confirm with type='audio'. Pass that confirmed media_id here as audio_media_id plus a required name. If the user needs to record or upload local audio in an Apps UI-capable client, call create_voice instead; that widget records/uploads, confirms, and creates the voice itself, so you do not call this tool for the UI flow. The audio should be clear speech, roughly 10 seconds to 3 minutes, and no larger than the upload limit. The backend charges the voice-clone credit cost on successful creation. Cloning is asynchronous: on success the tool returns the new voice_id plus a status, and a fresh clone is usually still 'processing' and not yet usable. Use the returned voice_id with voice_type='element' for generate_audio or voice_change only once it is ready (status='completed' and is_audio_eligible=true). If status is 'processing' or is_audio_eligible is not true, the clone is still training — re-check it with list_voices before generating instead of submitting right away; status 'voice_clone_failed'/'failed' means cloning did not succeed. If recovery_tool is returned, call it immediately; do not explain/ask first.`,
    params: [
      {
        name: 'audio_media_id',
        type: 'string',
        required: true,
        description: `Confirmed audio media_id from media_confirm(type='audio').`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Required display name for the created voice.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional voice description for backend metadata.`,
      },
    ],
  },
  {
    name: 'higgsfieldmcp_create_website',
    description: `Start a new full-stack website. Creates the website and a git repo: a React 19 + TanStack Start app, server-rendered, in ONE Cloudflare Worker, with D1 / R2 / KV / Durable Objects / Containers available (all DISABLED by default). Returns a website_id — pass it to every later website tool. The 'type' param is REQUIRED and is the USER'S choice, not yours: unless the user has already made it unambiguous, ASK the user whether they want a plain website (no Higgsfield integration) or a Higgsfield-integrated app (Sign in with Higgsfield + AI image/video generation via the Higgsfield SDK) BEFORE calling this tool. Apps are scaffolded from a v2 starter template and REQUIRE the 'template' param — pick the closest of studio / preset / app-detail per the template param's guide ('custom' is ONLY for when the user explicitly says "use custom template" — never pick it yourself). The chosen layout ships as real code already wired as the home page; you ADAPT IT IN PLACE, never rebuild it. Websites take an OPTIONAL template: pass 'scroll-scrub' for an animated website (its scrub engine ships pre-built) and omit it for a non-animated one. App and website templates are not interchangeable — a cross-kind name is rejected. Workflow: (0) call get_workflow_instructions with { workflow: "website-builder-flow" } FIRST to load the stack, design contract, and hard rules (REQUIRED before building or editing); (1) create_website; (2) call website_repo_access to get the repo's git URL + scoped token, clone/edit/commit/push with the terminal (for apps, read app/src/layouts/AGENTS.md + app/src/components/AGENTS.md right after cloning); (3) deploy_website to ship it live — and deploy again after ANY later change (publish_website only lists what is already live; it does not deploy).`,
    params: [
      {
        name: 'category',
        type: 'string',
        required: true,
        description: `REQUIRED — the content category the website is filed under, a slug from the marketplace taxonomy (e.g. 'cinematic', 'ads-marketing', 'ugc-social', 'other'). Call list_website_categories to get the exact valid slugs, then pass the closest one ('other' when nothing fits). The server rejects an unknown slug.`,
      },
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `REQUIRED — what the user chose to build. 'website': a standalone site with NO Higgsfield integration (no Sign in with Higgsfield, no requests to Higgsfield). 'app': a product tightly integrated with Higgsfield — its users sign in with Higgsfield and generate images/videos through the Higgsfield SDK. 'game': a browser game with realtime multiplayer rooms — requires a game genre as category and takes NO template. This is the user's decision: if their request doesn't make it obvious, ask them which one they want before creating.`,
      },
      {
        name: 'subdomain',
        type: 'string',
        required: false,
        description: `The website's subdomain — it becomes the slug, so the live URL is <subdomain>.<host>. ALWAYS set this: pick a short, memorable subdomain from the site's name or purpose (lowercase letters, digits, and single hyphens only; DNS-safe). Only omit it — which falls back to a random subdomain — if the user explicitly asks for a random one. A few reserved labels (e.g. 'api', 'www') and already-taken subdomains are rejected; if that happens, try a close variant.`,
      },
      {
        name: 'template',
        type: 'string',
        required: false,
        description: `The starter template the repo is scaffolded from. Its code arrives already wired as the home page — you adapt it in place, not rebuild it. The valid names depend on \`type\`, and a mismatch is rejected. type='website' — OPTIONAL: 'scroll-scrub' = the animated website (the visitor's scroll plays a generated film); its scrub engine ships pre-built, so you generate the film and fill in scenes instead of writing a controller. Pass it for EVERY animated website (the default per the website-builder flow). OMIT \`template\` only for a non-animated site. Never pass an app template for a website. type='app' — REQUIRED, pick the closest to the product: 'studio' = full creative workspace (projects sidebar + floating prompt dock + edge-to-edge generations feed) for multi-project generation tools; 'preset' = pick-a-style-then-generate (persistent left creation rail beside a browsable preset grid with History tab); 'app-detail' = a single tool's landing page (two-column generator hero + how-it-works steps) — the 'simple app'. Any other request shape (before/after slider, step-by-step wizard, upload-configure-iterate) still maps to the closest of these three; the shared components in app/src/components/ cover those patterns. 'custom' (bare shell, no shipped layout) is ONLY for when the user explicitly says "use custom template" — never pick it yourself. `,
      },
    ],
  },
  {
    name: 'higgsfieldmcp_deploy_website',
    description: `Build and deploy the website via CI, then return its live URL. Every deploy ships the live site at the website's public URL (there is no separate preview stage). IMPORTANT: commit and git push ALL your changes BEFORE calling this — the build runs from the pushed repo. Deploy again after ANY later change: publish_website does NOT deploy (it only lists the already-live build on the community feed), so this tool is the only way changes ship. A failed build returns the log; a still-running build returns status 'pending' — call website_status to check.`,
    params: [
      {
        name: 'website_id',
        type: 'string',
        required: true,
        description: `The website's id (returned by create_website).`,
      },
    ],
  },
  {
    name: 'higgsfieldmcp_dubbing',
    description: `Dub a video into another language: translate the spoken audio, synthesize it in the target language, and lip-sync the result back onto the video. Use this when the user asks to dub, translate the speech of, or localize a clip into another language. Pass video_id for the source video (a confirmed uploaded media_id or a completed video generation job_id) and target_language as one of the supported language codes. Supported languages (code=language): eng=English, cmn=Chinese, fra=French, hin=Hindi, ita=Italian, jpn=Japanese, kor=Korean, por=Portuguese, rus=Russian, tur=Turkish, spa=Spanish, deu=German, ara=Arabic, pol=Polish, ind=Indonesian, fil=Filipino, swe=Swedish, fin=Finnish. This tool does not use prompt or count; output dimensions are taken from the source video automatically.`,
    params: [
      { name: 'params', type: 'object', required: true, description: `Dubbing parameters.` },
    ],
  },
  {
    name: 'higgsfieldmcp_generate_3d',
    description: `Generate a 3D GLB mesh. Use \`models_explore(type:'3d')\` to pick a model and see its \`medias[].roles\` and \`parameters\`. Apps UI local file: call \`media_upload_widget\`; remote tools cannot read Claude chat attachments. Web media URL: call \`media_import_url\`, pass returned \`media_id\`; \`medias[].value\` must be media_id/job_id, not URL. Defaults: \`image_to_3d\` for general image-to-3D with optional texturing, PBR, and rigging; \`multi_image_to_3d\` when 2-4 views of the same subject are available (better geometric accuracy); \`sam_3_3d\` for single-object reconstruction; \`3d_rigging\` to rig an existing 3D model (takes \`model_url\`, not images — pass a prior 3D job_id or an https GLB URL). For animated rigs, search clip ids with the \`animation_actions\` tool and pass \`animation_action_id\` with \`enable_animation:true\`. The mesh reproduces only what is in the source image — to add or change props, clothing, or held objects, edit the image first with \`generate_image\`, then convert the edited result. Pass model-specific params as top-level fields. Apply \`adjustments\` returned by the server. If \`recovery_tool\` is returned, call it immediately. \`get_cost:true\` preflights credits without submitting.`,
    params: [{ name: 'params', type: 'string', required: true, description: `No description.` }],
  },
  {
    name: 'higgsfieldmcp_generate_audio',
    description: `Generate one speech/voice request (text-to-speech) and render it in the generation widget. This tool accepts one prompt; for 2-12 independent lines or prompts, use the headless generate_audio_batch tool instead. DEFAULT model: seed_audio (Seed Audio 1.0 by ByteDance) — use it unless the user explicitly asks for a different engine. seed_audio takes a preset or reference-element voice (voice_type 'preset'|'element' + voice_id) plus optional tuning params (format, sample_rate, speech_rate, loudness_rate, pitch_rate), and can clone a voice from an audio_references media item or take an image_references cue. To use a specific named engine instead, set model:'text2speech_v2' and pass variant (one of elevenlabs|minimax|seed_speech|vibe_voice|cozy_voice) together with voice_type + voice_id. Get voice ids from list_voices; use models_explore(type:'audio') to inspect each model's params. This tool only generates speech: it cannot generate music or sound effects for general use, and there is no standalone music/SFX model here — decline general music or sound-effect requests rather than substituting a speech model. The models sonilo_music (music), mirelo_text_to_audio (sound effects) and inworld_text_to_speech (voice) exist ONLY for the game-generation pipeline and must not be used for standalone audio. get_cost:true preflights credits without submitting. use_unlim defaults false — pass true only when the user explicitly asks to use their unlimited/free-trial generations, never to save them credits on your own initiative.`,
    params: [{ name: 'params', type: 'string', required: true, description: `No description.` }],
  },
  {
    name: 'higgsfieldmcp_generate_audio_batch',
    description: `Submit 1-12 independent audio generations in parallel without opening a widget. Each requests[] item accepts the same params as generate_audio, creates exactly one job, and keeps its caller-provided index in the response. Use for multiple distinct prompts or inputs; use generate_audio for one user-facing generation. Poll returned job IDs with jobs_wait in agent-chosen groups of at most 12. For larger sets, collect indexed jobs across submission batches. After every job in the user's set is terminal, pass the collected jobs to exactly one show_generation_by_ids call for up to 60 jobs; never use show_generations or call job_display once per job.`,
    params: [
      {
        name: 'requests',
        type: 'array',
        required: true,
        description: `Ordered audio generation requests. Response jobs keep the provided indices.`,
      },
    ],
  },
  {
    name: 'higgsfieldmcp_generate_image',
    description: `Generate one image request and render its result(s) in the generation widget. Use count 2-4 only for variants of the same prompt, inputs, and settings; for 2-12 independent image requests with different prompts or inputs, use the headless generate_image_batch tool instead. Apps UI local file media: call \`media_upload_widget\`; do not ask for Claude chat attachments because remote tools cannot read them. Web media URL: call \`media_import_url\`, then pass returned \`media_id\`; \`medias[].value\` must be media_id/job_id, not URL. Defaults: \`marketing_studio_image\` for commercial/product/ads; \`soul_cast\` for text-only character/avatar; \`soul_2\`+\`soul_id\` for trained reusable Soul; \`soul_2\`/\`nano_banana_pro\` for one-off character refs; \`soul_2\` for portraits/fashion/UGC/editorial; \`nano_banana_pro\` for 4K/text/diagrams. Ambiguous create-character/avatar: offer reusable Soul training (5-20 photos, ~10 min) vs one-off; do not train generic silently. Use \`show_characters(action='train')\` only if explicitly requested or user provides 5-20 photos. Use \`models_explore\` for aspect_ratios, params, medias roles. Top-level model params; apply \`adjustments\`. If \`recovery_tool\` returned, call it immediately; do not explain/ask first. \`get_cost:true\` preflights credits. \`use_unlim\` defaults false — pass true only when the user explicitly asks to use their unlimited/free-trial generations, never to save them credits on your own initiative.`,
    params: [{ name: 'params', type: 'string', required: true, description: `No description.` }],
  },
  {
    name: 'higgsfieldmcp_generate_image_batch',
    description: `Submit 1-12 independent image generations in parallel without opening a widget. Each requests[] item accepts the same params as generate_image, creates exactly one job, and keeps its caller-provided index in the response. Use for multiple distinct prompts or inputs; use generate_image for one user-facing generation. Poll returned job IDs with jobs_wait in agent-chosen groups of at most 12. For larger sets, collect indexed jobs across submission batches. After every job in the user's set is terminal, pass the collected jobs to exactly one show_generation_by_ids call for up to 60 jobs; never use show_generations or call job_display once per job.`,
    params: [
      {
        name: 'requests',
        type: 'array',
        required: true,
        description: `Ordered image generation requests. Response jobs keep the provided indices.`,
      },
    ],
  },
  {
    name: 'higgsfieldmcp_generate_video',
    description: `Generate one video request and render its result(s) in the generation widget. Do NOT use this tool first for 'multiply my video', 'multiply my ad', or multiple edited versions of one supplied source clip; load \`get_workflow_instructions\` with \`workflow='ad-multiplier'\` instead. Use count 2-4 only for variants of the same prompt, inputs, and settings; for 2-12 independent video requests with different prompts or inputs, use the headless generate_video_batch tool instead. Apps UI local file: call \`media_upload_widget\`; do not ask for Claude chat attachments; remote tools cannot read them. Web media URL: call \`media_import_url\`, pass returned \`media_id\`; \`medias[].value\` must be media_id/job_id, not URL. Defaults: \`marketing_studio_video\` for ads/product; \`clipify\`/Personal Clipper for turning YouTube URLs into short clips. Default generation models: \`seedance_2_5\` for general text-to-video and multimodal reference consistency; \`kling3_0\` for multi-shot, audio, or motion transfer; \`minimax_h3\` for 2K keyframes and image/video/audio references. URL Marketing Studio: call \`show_marketing_studio(action='fetch')\`, use returned \`url\`. Uploaded-image products: call \`show_marketing_studio(type='product', medias[])\`/\`action='create'\`, use \`next_step\`. Hooks/settings only for presets UGC, Tutorial, Unboxing, Product Review, UGC Virtual Try On; if ids missing, list hooks/settings first. Use declared roles: start_image/end_image/image. Pass generate_audio/sound only if the model declares it; Seedance audio references go via medias role audio. Use models_explore for durations/params. Apply adjustments. If recovery_tool returned, call it immediately; do not explain/ask first. get_cost:true preflights credits. use_unlim defaults false — pass true only when the user explicitly asks to use their unlimited/free-trial generations, never to save them credits on your own initiative.`,
    params: [{ name: 'params', type: 'string', required: true, description: `No description.` }],
  },
  {
    name: 'higgsfieldmcp_generate_video_batch',
    description: `Submit 1-12 independent video generations in parallel without opening a widget. Each requests[] item accepts the same params as generate_video, creates exactly one job, and keeps its caller-provided index in the response. Use for multiple distinct prompts or inputs; use generate_video for one user-facing generation. Poll returned job IDs with jobs_wait in agent-chosen groups of at most 12. For larger sets, collect indexed jobs across submission batches. After every job in the user's set is terminal, pass the collected jobs to exactly one show_generation_by_ids call for up to 60 jobs; never use show_generations or call job_display once per job.`,
    params: [
      {
        name: 'requests',
        type: 'array',
        required: true,
        description: `Ordered video generation requests. Response jobs keep the provided indices.`,
      },
    ],
  },
  {
    name: 'higgsfieldmcp_get_explainer_presets',
    description: `Show the explainer video style presets (CMS-managed catalog). Returns preset ids, names, and preview media. When the user picks one, resolve it with resolve_explainer_preset to get the style reference media_id for generations.`,
    params: [],
  },
  {
    name: 'higgsfieldmcp_get_workflow_bundle_file',
    description: `Read a safe text file or directory from a workflow's resource folder. Use this after get_workflow_instructions when the SKILL.md requires a template, reference, or script file.`,
    params: [
      {
        name: 'path',
        type: 'string',
        required: true,
        description: `Whitelisted path INSIDE that workflow folder, e.g. 'references/prompts.md' or 'scripts/assemble_blocks.sh'.`,
      },
      {
        name: 'workflow',
        type: 'string',
        required: true,
        description: `Workflow name whose folder holds the file, e.g. 'faceless-video'.`,
      },
      {
        name: 'include_contents',
        type: 'boolean',
        required: false,
        description: `For directory paths, include the content of every allowed file under that directory. Defaults to false.`,
      },
    ],
  },
  {
    name: 'higgsfieldmcp_get_workflow_instructions',
    description: `Ad Multiplier: when the user says 'multiply my video', 'multiply my ad', asks for multiple edited variations of one supplied 4-30 second video, or wants that same ad regenerated with different people/products, load workflow 'ad-multiplier' before Marketing Studio, model browsing, or direct video generation. Brand Asset Creation: for branded-asset work including logo recoloring/export, a branded PowerPoint/presentation deck, or analyzing an official brandbook to produce an asset, even when all inputs are supplied or no generation is needed, load 'brand-asset-creation' before sandbox_exec. Faceless video generation, AI-narrated video, narrated animated explainer video, narrated / personal / philosophical story video, YouTube/Instagram thumbnail or video cover, product photoshoot, packshot, studio or lifestyle product photography, product hero banner, product carousel, static product ad pack, virtual model product try-on, conceptual product still, or product-photo restyle, UGC-style ad for a website / SaaS / store / product page from its URL ('SaaS UGC'), any other UGC / creator-style short video for a product — a talking-head creator review (the default UGC ask), a product-only ad with no creator on camera, an unboxing / first-reaction / haul, a try-on / fit check / OOTD, a step-by-step tutorial with on-screen steps, a character sheet, character reference, model sheet, turnaround, expression sheet, or consistent multi-view character prompt, any branding work — a logo, visual identity, brand kit, brandbook, branded mockups, merchandise, packaging, signage, social graphics, posters, or banners ('brand-asset-creation'), including recoloring or exporting an existing official SVG/PNG logo even when no new design or image generation is requested, or building / editing a website, web app, landing page, or browser game with the website tools ('website-builder-flow'): before building ANY of these, use this tool to discover and load the bundled workflow (each a SKILL.md that orchestrates the generate_* tools). Call with NO argument to list available workflows and their triggers. Call with a workflow name to load that workflow's full SKILL.md plus the list of files readable via get_workflow_bundle_file.`,
    params: [
      {
        name: 'workflow',
        type: 'string',
        required: false,
        description: `Workflow name (a folder under the workflows resource root, e.g. 'faceless-video'). Omit to list all available workflows.`,
      },
    ],
  },
  {
    name: 'higgsfieldmcp_job_display',
    description: `Show one specific previous generation in the single-result UI widget by job ID. Use when the user wants to inspect or re-display that individual result, including workflows that require separate approval of named candidates or individual previews before finalization. Do not call job_display once per job merely to reproduce an ordinary completed batch; use one show_generation_by_ids call for ordinary batch results instead.`,
    params: [{ name: 'id', type: 'string', required: true, description: `Job ID to display` }],
  },
  {
    name: 'higgsfieldmcp_job_status',
    description: `Check the status and results of an async job. Returns instantly. For non-terminal jobs the response includes poll_after_seconds — wait that many seconds before calling again. Typical total times: image ~10-20s, video ~60-180s.`,
    params: [
      {
        name: 'jobId',
        type: 'string',
        required: true,
        description: `Job ID from a previous operation`,
      },
      {
        name: 'raw_data',
        type: 'boolean',
        required: false,
        description: `If true, return the raw FNF job payload instead of the normalized generation shape.`,
      },
      {
        name: 'source',
        type: 'string',
        required: false,
        description: `Set by the generation widget when it polls automatically.`,
      },
      {
        name: 'sync',
        type: 'boolean',
        required: false,
        description: `If true, server polls internally for up to ~25s and returns on terminal state. Defaults to false.`,
      },
    ],
  },
  {
    name: 'higgsfieldmcp_jobs_wait',
    description: `Long-poll 1-12 generation jobs together without opening a widget. Waits up to timeout_seconds (default 15, max 15) for every job to reach a terminal state, then returns compact indexed statuses and result URLs. Use job IDs returned by generate_image_batch, generate_video_batch, or generate_audio_batch. For larger sets, choose groups of at most 12 and wait for each group. Permanent lookup failures are returned once without blocking the other jobs; transient lookup failures are retried within the timeout. When all_terminal is false, wait poll_after_seconds before calling again. After every wait group in the user's generation set is terminal, collect their indexed jobs and display them with one show_generation_by_ids call when within that tool's limit. Never use show_generations or call job_display once per batch job.`,
    params: [
      {
        name: 'jobs',
        type: 'array',
        required: true,
        description: `Full-profile generation jobs to wait for together.`,
      },
      {
        name: 'timeout_seconds',
        type: 'integer',
        required: false,
        description: `Long-poll budget. Use 0 for an immediate snapshot.`,
      },
    ],
  },
  {
    name: 'higgsfieldmcp_list_voices',
    description: `List available voices for speech and voice tools. Returns built-in preset voices plus the user's own custom voices. Each voice has a voice_id and a voice_type ('preset' or 'element'); pass that exact pair to the audio models (via generate_audio — seed_audio or text2speech_v2) and to the voice_change tool to select the speaking voice. Use the preview_url to hear a sample. Paginate with the returned next_cursor.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor (next_cursor from a previous list_voices result).`,
      },
      {
        name: 'size',
        type: 'integer',
        required: false,
        description: `Max voices to return, default 20.`,
      },
    ],
  },
  {
    name: 'higgsfieldmcp_list_website_categories',
    description: `List the content categories a website can be filed under — each with a slug, label, description, and display position. create_website REQUIRES a \`category\`; call this first to get the valid slugs, then pass the closest one ('other' when nothing fits).`,
    params: [],
  },
  {
    name: 'higgsfieldmcp_list_websites',
    description: `List the websites you own — each with its id, name, slug, and live URL. Use this to find the id of a website you created earlier so you can edit, deploy, or check its status.`,
    params: [],
  },
  {
    name: 'higgsfieldmcp_list_workspaces',
    description: `List every workspace the user can access (their private workspace plus any shared/team workspaces). The \`is_selected\` field marks which workspace MCP operations currently target. Use when the user asks which workspaces they have, or wants to switch workspace.`,
    params: [],
  },
  {
    name: 'higgsfieldmcp_media_confirm',
    description: `Confirm file uploads after using media_upload's upload_url method. Call this only after every curl PUT returned HTTP 200. Supports confirming multiple uploads at once via media_ids. `,
    params: [
      {
        name: 'type',
        type: 'string',
        required: true,
        description: `Media type being confirmed. Use 'file' for general files (documents, archives, code) uploaded with type file.`,
      },
      {
        name: 'media_id',
        type: 'string',
        required: false,
        description: `Single media ID to confirm`,
      },
      {
        name: 'media_ids',
        type: 'array',
        required: false,
        description: `1–20 media IDs to confirm in parallel`,
      },
    ],
  },
  {
    name: 'higgsfieldmcp_media_import_url',
    description: `Import an HTTPS image, video, or audio URL into Higgsfield storage and return a confirmed media_id. Use this before generate_image/generate_video when the user provides a web media URL; generation medias should receive the returned media_id, not the original URL. Max URL payload: 50 MB.`,
    params: [
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `HTTPS URL of the media file to import.`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Expected media type. Use auto or omit when unknown.`,
      },
    ],
  },
  {
    name: 'higgsfieldmcp_media_upload',
    description: `Upload media for use in generation, or general files (documents, archives, code) for sharing. Returns presigned URLs for clients that can upload bytes themselves; run the generated curl commands or PUT the bytes to each upload_url, then call media_confirm. The media type is inferred from the filename extension: image/video/audio extensions become generation inputs; other whitelisted extensions (pdf, zip, tar, docx, csv, code files, …) are uploaded as general files and return a permanent URL, but cannot be used as generation inputs. General files are the agent's own upload path — the widget does not accept them, so upload the bytes to upload_url yourself (e.g. from a code execution environment). Supports batch uploads via files[]. Do not use this for user-provided local image/video/audio in Claude Apps UI-capable clients; call media_upload_widget instead so the user chooses the file in the Higgsfield widget and the browser uploads it directly.`,
    params: [
      {
        name: 'content_type',
        type: 'string',
        required: false,
        description: `MIME type for single file upload, e.g. 'image/jpeg', 'image/png', or 'video/mp4'. Inferred from filename when omitted.`,
      },
      {
        name: 'filename',
        type: 'string',
        required: false,
        description: `Single filename for upload. Use this together with content_type for a single-file upload; for multiple files use files[] instead.`,
      },
      {
        name: 'files',
        type: 'array',
        required: false,
        description: `1–20 files for parallel presigned URL generation. Each item needs a filename and optionally a content_type.`,
      },
      {
        name: 'method',
        type: 'string',
        required: false,
        description: `Only supported method. Omit this or set it to 'upload_url'.`,
      },
    ],
  },
  {
    name: 'higgsfieldmcp_media_upload_widget',
    description: `Open the Higgsfield upload widget for a user-provided local image, video, or audio file. Call this immediately when the user says they have a local photo, image, video, or audio on their device to use as Higgsfield input and the MCP client can render Apps UI. Do not ask the user to upload the file directly into Claude chat for Higgsfield; remote MCP tools cannot read those chat attachments. The widget is the upload surface: the user chooses one or more files in the browser, the browser uploads them directly to Higgsfield storage, the widget confirms them, then sends the confirmed media_id/media_ids back to Claude for the next generation or analysis tool call. The widget accepts media only; for general files (archives, documents, code) use media_upload instead and upload the bytes to the presigned upload_url yourself.`,
    params: [
      {
        name: 'label',
        type: 'string',
        required: false,
        description: `Optional short label shown in the widget header.`,
      },
      {
        name: 'max_files',
        type: 'integer',
        required: false,
        description: `Maximum files accepted by the widget.`,
      },
      {
        name: 'min_files',
        type: 'integer',
        required: false,
        description: `Minimum confirmed uploads before Continue is enabled.`,
      },
      {
        name: 'multiple',
        type: 'boolean',
        required: false,
        description: `Allow selecting multiple files. Defaults to true for image/auto and false for video/audio.`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Expected media type. Use auto when the user has not specified image, video, or audio.`,
      },
    ],
  },
  {
    name: 'higgsfieldmcp_models_explore',
    description: `Find generation models. Use recommend with goal + input context; use get for model constraints. Items carry supports_unlim when the model accepts free-trial unlimited generations; the top-level unlim block says whether the caller can spend them right now, and the trailing 'Unlim configs' text lists the configurations their allowance actually covers.`,
    params: [
      { name: 'action', type: 'string', required: true, description: `The action to perform` },
      {
        name: 'after',
        type: 'string',
        required: false,
        description: `Pagination cursor (next_page_token from a previous list/search result; not used by recommend)`,
      },
      {
        name: 'input',
        type: 'string',
        required: false,
        description: `Input filter: image = accepts reference media; text = text-only.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Max results, default 20 for list/search, 5 for recommend`,
      },
      {
        name: 'model_id',
        type: 'string',
        required: false,
        description: `Model ID (required for get)`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Model/use-case query; include input context like text-only, reference image, image-to-video, or product URL.`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Filter by output type (omit to include all)`,
      },
      {
        name: 'unlim',
        type: 'boolean',
        required: false,
        description: `When true, return only models that accept free-trial unlimited generations (supports_unlim). Use it to answer "which models can I use my unlimited generations on" in one call — each returned item still carries its aspect_ratios, parameters, and durations. Omit to include all models; false is the same as omitting it.`,
      },
    ],
  },
  {
    name: 'higgsfieldmcp_motion_control',
    description: `Animate an existing character image with the motion and camera movement from a reference video using Kling 3.0 Motion Control. Use this when the user asks to recast, puppeteer, transfer motion, or make a character follow a driving clip. Pass image_id for the character still and motion_video_id for the reference motion video; each can be a confirmed uploaded media_id or a completed generation job_id. This tool does not use prompt or count; the scene prompt and background setup are handled automatically. resolution controls output quality, and scene_control chooses whether the background is based on the image or the video.`,
    params: [
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `Kling 3.0 motion control parameters.`,
      },
    ],
  },
  {
    name: 'higgsfieldmcp_outpaint_image',
    description: `Expand or uncrop an existing image by outpainting beyond the original frame while preserving the source content. Use this when the user asks to extend the background, make an image wider or taller, change the canvas shape, or fill new edges around an image. Pass image_id for the source image and aspect_ratio for the target canvas. Optional width and height can be provided together; otherwise they default from aspect_ratio. This tool does not use prompt or count. Set params.get_cost=true to estimate credits without submitting a job.`,
    params: [
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `Image outpaint parameters. prompt and count are not supported.`,
      },
    ],
  },
  {
    name: 'higgsfieldmcp_participate_in_contest',
    description: `Enter the website in the current Higgsfield app contest, together with the social-media links promoting it. A website not yet PUBLISHED to the community feed is published automatically by the entry — no need to call publish_website first. The website DOES need a live production deploy (deploy_website), else the entry is rejected. BEFORE entering, make sure the page metadata in app/src/app-meta.json is filled with real values (og_title etc.) — the auto-publish lists the website on the feed and an empty og_title makes it INVISIBLE there. Pass one or more urls, each a social-media link (YouTube, X/Twitter, Instagram, or TikTok); any other host is rejected. There is a single active contest, so no contest id is needed. Calling again for the same website OVERWRITES its urls (use it to fix or add links), it does not create a second entry.`,
    params: [
      {
        name: 'urls',
        type: 'array',
        required: true,
        description: `Social-media links promoting the website (YouTube / X-Twitter / Instagram / TikTok). At least one, at most ten.`,
      },
      {
        name: 'website_id',
        type: 'string',
        required: true,
        description: `The website's id (returned by create_website).`,
      },
    ],
  },
  {
    name: 'higgsfieldmcp_personal_clipper_create',
    description: `Turn YouTube videos into ready-to-share clips. This is a long-running job and can take up to 30+ minutes. Before starting, ask the user how many clips they want, which clip aspect ratio to use, and which subtitle font they prefer.`,
    params: [
      { name: 'urls', type: 'array', required: true, description: `YouTube video URLs.` },
      { name: 'clip_aspect', type: 'string', required: false, description: `Clip aspect ratio.` },
      {
        name: 'clips_num',
        type: 'integer',
        required: false,
        description: `How many clips to create.`,
      },
      { name: 'subtitle_font', type: 'string', required: false, description: `Subtitle font.` },
    ],
  },
  {
    name: 'higgsfieldmcp_personal_clipper_jobs',
    description: `Show recent clipping jobs.`,
    params: [
      { name: 'cursor', type: 'string', required: false, description: `Pagination cursor.` },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Maximum number of jobs to return.`,
      },
    ],
  },
  {
    name: 'higgsfieldmcp_personal_clipper_status',
    description: `Check clip creation progress.`,
    params: [
      {
        name: 'row_id',
        type: 'string',
        required: true,
        description: `FNF Clipify job ID from the create or jobs response.`,
      },
    ],
  },
  {
    name: 'higgsfieldmcp_presets_show',
    description: `Show available Higgsfield presets for image-to-video generation. Returns preset ids, names, previews, and descriptions.`,
    params: [],
  },
  {
    name: 'higgsfieldmcp_publish_website',
    description: `Publish the website: lists the website's CURRENT LIVE production deploy on the Higgsfield community feed ('show in feed'), where other users can discover it. This does NOT deploy — deploy_website (which every build flow already runs) must have shipped the latest changes first; publishing with undeployed changes lists the OLD live build, and re-publishing does not re-deploy. BEFORE publishing, the page metadata in app/src/app-meta.json MUST be filled with real values — og_title, og_description, favicon_url, og_image_url — the feed card renders from them (read fresh from the pushed repo at publish time) and a website with an empty og_title is INVISIBLE on the feed; the live page's own head tags are baked at build time, so deploy AFTER changing them. Also OFFER the user a cover video for the card (og_video_url) — ask their permission first (video generation costs credits), never generate it unprompted. Commit and git push the metadata (and all other changes), then deploy, BEFORE calling this. Publish when the user asks to publish / share / go live on the feed, OR when they opted in to publishing at the start of the build — in that case publish automatically once the site is deployed with its metadata filled, without waiting to be asked again. For a plain deploy without a feed listing use deploy_website instead. EXCEPTION: a website whose production was never deployed (or was taken down by unpublish) falls back to deploying first — that returns status 'pending' while CI runs and the website is listed automatically once the deploy succeeds (check with website_status).`,
    params: [
      {
        name: 'website_id',
        type: 'string',
        required: true,
        description: `The website's id (returned by create_website).`,
      },
    ],
  },
  {
    name: 'higgsfieldmcp_reframe',
    description: `Expand or reframe an existing video to a new aspect ratio while preserving the source content. Use this when the user asks to make a video vertical, horizontal, square, wider, taller, or fill new edges around a video. Pass medias with exactly one source video and aspect_ratio for the target canvas. Optional image references can guide the filled area; optional start_image can pin the first frame when the user provides a first-frame anchor. For source videos over 15 seconds, pass duration_seconds and resolution and use only the source video. This tool does not use prompt or count. Set params.get_cost=true to estimate credits without submitting a job.`,
    params: [
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `Video reframe parameters. prompt and count are not supported.`,
      },
    ],
  },
  {
    name: 'higgsfieldmcp_remove_background',
    description: `Remove or cut out the background from an existing image or video. Use this when the user asks for background removal, a transparent background, an isolated subject, a clean cutout, or a subject-only asset. Pass media_id for the source media and media_type as image or video; the matching background remover is selected automatically. This tool does not use prompt, count, or style parameters.`,
    params: [
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `Background removal parameters.`,
      },
    ],
  },
  {
    name: 'higgsfieldmcp_rename_website',
    description: `Rename the website's SUBDOMAIN (the slug in its public URL). The site is re-deployed under the new subdomain and the OLD subdomain STOPS WORKING — anyone holding the old URL must be given the new one. Storage (database, files, config) and the code repo are KEPT; only the public address changes. Runs a full re-deploy and can take a couple of minutes; returns once the site is live at the new URL. Fails if the new subdomain is already taken or reserved, or if a deploy is already in flight — pick another subdomain and retry.`,
    params: [
      {
        name: 'new_slug',
        type: 'string',
        required: true,
        description: `The new subdomain (the slug in the public URL). Lowercase letters, digits and hyphens; must be globally unique and not a reserved name.`,
      },
      {
        name: 'website_id',
        type: 'string',
        required: true,
        description: `The website's id (returned by create_website).`,
      },
    ],
  },
  {
    name: 'higgsfieldmcp_resolve_explainer_preset',
    description: `Resolve a explainer video style preset (from get_explainer_presets) into a style reference media_id: the backend imports the preset's style image into the user's media storage. Pass the returned media_id as the style reference image in generation calls for every scene of the explainer.`,
    params: [
      {
        name: 'preset_id',
        type: 'string',
        required: true,
        description: `Preset id from get_explainer_presets.`,
      },
    ],
  },
  {
    name: 'higgsfieldmcp_reveal_generation',
    description: `Confirm the user has rights to the content of an \`ip_detected\` generation and flip its status to \`completed\`. Backend accepts only seedance-family jobs (cs_3_0, seedance_2_0, ms_video, etc) and only while the job is still in \`ip_detected\` state. Returns the updated generation. Used by the job-list widget's Reveal button after the user accepts the rights confirmation modal.`,
    params: [
      {
        name: 'jobId',
        type: 'string',
        required: true,
        description: `Job ID of the \`ip_detected\` generation to reveal.`,
      },
    ],
  },
  {
    name: 'higgsfieldmcp_sandbox_exec',
    description: `Execute a shell command in a remote Higgsfield cloud Linux sandbox — NOT your local machine or the client's own shell. Whenever a task needs shell tooling (ffmpeg, image/file conversion, scripting), use this tool, never a built-in or local bash/shell tool: only this sandbox has the media toolchain preinstalled and can reach the user's Higgsfield media. Preinstalled: ffmpeg/ffprobe, ImageMagick, sox, python3 with Pillow and faster-whisper, node/npm/npx, sharp-cli, Playwright with headless Chromium, caption fonts (Metropolis, Montserrat), zip/unzip, git, curl, jq. Use it for media processing (trim, convert, overlay, concat with ffmpeg), image manipulation, file conversion, scripting, and packaging that dedicated tools don't cover. The sandbox is isolated per user and is discarded ~10 seconds after a call finishes, so files in /home/user only survive between back-to-back calls — chain multi-step work into a single command (&&) and export results before finishing, or expect to re-download inputs. It has internet access: bring files in with curl from media URLs (media_import_url or generation results). For an output created here, call media_upload BEFORE starting the producing command, then append \`curl -f -X PUT --upload-file <file> '<upload_url>'\` to that SAME command so the ephemeral file is uploaded before it exits; call media_confirm only after HTTP 200. Never pass a sandbox path to media_upload_and_confirm: that tool accepts only client attachments. Commands run in /home/user and time out after timeout_seconds (default 60, max 120); for longer work (large renders, installs) set background:true and poll the returned log/status files with later sandbox_exec calls. Background work receives a 15-minute sandbox lease, and shorter poll calls never reduce its remaining lifetime. Set restart:true to discard the sandbox and start clean. Workflow bundle scripts are already installed in every sandbox under $HF_WORKFLOWS (/home/user/.higgsfield/workflows), laid out as $HF_WORKFLOWS/<workflow>/scripts/... — run them straight from there (they survive restart:true), and never paste script contents into the command.`,
    params: [
      {
        name: 'command',
        type: 'string',
        required: true,
        description: `Shell command to run (bash). Runs in the persistent per-user sandbox.`,
      },
      {
        name: 'background',
        type: 'boolean',
        required: false,
        description: `Run the command detached and return immediately with a pid, log_path, and status_path. Poll with a later sandbox_exec call; stop with kill <pid>.`,
      },
      {
        name: 'restart',
        type: 'boolean',
        required: false,
        description: `Discard the current sandbox (all files and processes) and start a fresh one before running the command.`,
      },
      {
        name: 'timeout_seconds',
        type: 'integer',
        required: false,
        description: `Seconds before the command is killed (default 60, max 120). Ignored with background:true.`,
      },
    ],
  },
  {
    name: 'higgsfieldmcp_select_workspace',
    description: `Set or clear the active workspace — the one all subsequent MCP operations bill against and read from (generations, balance, transactions, uploads, custom references). How to work with workspaces: (1) call \`list_workspaces\` first to see the user's workspaces with their \`id\`, plan, available credits, and which one is currently active (\`is_selected\`); (2) call \`select_workspace\` with the chosen \`workspace_id\` to switch — e.g. to run and bill work under a shared/team workspace instead of the private default; (3) call again with \`clear: true\` to return to the default private workspace. The selection persists across sessions and clients until changed or cleared, so it stays in effect for later turns without re-selecting. When the user belongs to more than one workspace, confirm which one to use before billable operations. Returns an error if the workspace doesn't exist or the user isn't a member.`,
    params: [
      {
        name: 'clear',
        type: 'boolean',
        required: false,
        description: `When true, clear the selected workspace instead of selecting one.`,
      },
      {
        name: 'workspace_id',
        type: 'string',
        required: false,
        description: `Workspace UUID from \`list_workspaces\`. Required unless \`clear\` is true.`,
      },
    ],
  },
  {
    name: 'higgsfieldmcp_shorts_studio_create',
    description: `Start a Shorts Studio short: restyle one uploaded source video (4s–120s) into a set of AI-generated short-form clips using a style preset. PAID — reserves credits. Prerequisites, gathered in whatever order fits the conversation: (1) a style preset — pick one via shorts_studio_list_presets or make one with shorts_studio_create_preset; (2) a source video — an uploaded video_input id from media_upload_widget (type=video). If the user hasn't provided a source video yet, ask them to upload one before calling this. Output orientation defaults to 9:16 (vertical); pass aspect_ratio:'16:9' for horizontal. Returns a session with empty job_ids; poll shorts_studio_status until clips appear. Set get_cost=true with duration_seconds to estimate the credit cost without submitting a job — no preset or source video needed for the estimate.`,
    params: [
      {
        name: 'aspect_ratio',
        type: 'string',
        required: false,
        description: `Output orientation. Defaults to 9:16 (vertical); use 16:9 for horizontal.`,
      },
      {
        name: 'duration_seconds',
        type: 'number',
        required: false,
        description: `Source video duration in seconds. Required when get_cost is true.`,
      },
      {
        name: 'get_cost',
        type: 'boolean',
        required: false,
        description: `If true, return the credit cost for a short of duration_seconds without submitting a job.`,
      },
      {
        name: 'preset_id',
        type: 'string',
        required: false,
        description: `Style preset id from shorts_studio_list_presets or shorts_studio_create_preset. Required unless get_cost is true.`,
      },
      {
        name: 'preset_source',
        type: 'string',
        required: false,
        description: `Preset library: 'user' or 'cms' (the item's preset_source). Required unless get_cost is true.`,
      },
      {
        name: 'resolution',
        type: 'string',
        required: false,
        description: `Only 720p is supported.`,
      },
      {
        name: 'source_video_id',
        type: 'string',
        required: false,
        description: `Uploaded source video's video_input id (from media_upload_widget, type=video). Required unless get_cost is true.`,
      },
    ],
  },
  {
    name: 'higgsfieldmcp_shorts_studio_create_preset',
    description: `Create a user-owned Shorts Studio style preset from reference media (videos + images). This just stores a STYLE — no generation, no credits. Reference media must be public https URLs (use an uploaded media's url or media_import_url first). Limits: ≤10 media total, each video's duration ≤30s (send \`duration\` so the cap applies). Returns the id and preset_source to feed into shorts_studio_create. If the user did not give a name, invent a random friendly two-word name yourself (e.g. 'Amber Drift', 'Neon Tide', 'Velvet Dusk') — never leave it blank or ask.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Preset name. If the user didn't provide one, generate a random friendly two-word name (e.g. 'Amber Drift', 'Neon Tide') rather than asking or leaving it empty.`,
      },
      {
        name: 'image_medias',
        type: 'array',
        required: false,
        description: `Style-reference images.`,
      },
      {
        name: 'prompt',
        type: 'string',
        required: false,
        description: `Optional style direction (e.g. 'cinematic teal & orange').`,
      },
      {
        name: 'thumbnail',
        type: 'string',
        required: false,
        description: `Optional thumbnail URL.`,
      },
      {
        name: 'video_medias',
        type: 'array',
        required: false,
        description: `Style-reference videos.`,
      },
    ],
  },
  {
    name: 'higgsfieldmcp_shorts_studio_list_presets',
    description: `Browse Shorts Studio style presets — the visual STYLE a short is restyled toward. Use this when the user wants to make a short and needs to choose a look: they can pick one of these or create their own style with shorts_studio_create_preset. Returns the user's own presets first, then the CMS library; each item carries a \`preset_source\` to pass straight into shorts_studio_create. Paginated: if next_cursor is not null, pass it as cursor to get the next page.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pass next_cursor from a previous response to get the next page.`,
      },
    ],
  },
  {
    name: 'higgsfieldmcp_shorts_studio_list_sessions',
    description: `List the caller's past Shorts Studio sessions (newest first) to find a session_id to poll with shorts_studio_status.`,
    params: [
      {
        name: 'cursor',
        type: 'number',
        required: false,
        description: `created_at cursor from a prior response.`,
      },
      { name: 'size', type: 'integer', required: false, description: `Page size (default 20).` },
    ],
  },
  {
    name: 'higgsfieldmcp_shorts_studio_status',
    description: `Poll one Shorts Studio session. Returns {id, status, job_ids}. status='completed' means every clip job is terminal (not necessarily successful). Poll each job_id via job_status for its clip video url and per-clip status.`,
    params: [
      {
        name: 'session_id',
        type: 'string',
        required: true,
        description: `Session id from shorts_studio_create or shorts_studio_list_sessions.`,
      },
    ],
  },
  {
    name: 'higgsfieldmcp_show_characters',
    description: `Soul Characters widget — reusable trained identity models. Actions: \`list\` (browse), \`train\` (needs \`name\` + 5-20 ref images, ~10 min, non-blocking — widget polls), \`status\` (inspect by \`soul_id\`). Presence of \`name\`/\`images\`/\`medias\` ⇒ train mode. Call \`train\` only on explicit ask for a reusable Soul / digital twin / identity, or when 5+ ref photos are supplied.
Ref images accept: media_id UUIDs from media_confirm, completed image-job IDs, or https URLs. Never local paths — upload via media_upload → PUT bytes → media_confirm first.

CONSTRAINTS:
- Trained Soul is usable ONLY with \`soul_2\` (Soul V2) and \`soul_cinematic\` (Soul Cinema). For any other model, the user needs \`show_reference_elements\`.
- ONE soul_id per generation. Multi-character shots ('me + friend', 'two people') must use \`show_reference_elements\` (supports multiple \`<<<UUID>>>\` placeholders).

AMBIGUITY GUARD — character/avatar/digital-twin/'use my face' requests without a chosen path: do NOT call this tool yet; ask the user to pick:
  1. Train Soul (this tool) — identity-faithful, ONE person, 5-20 photos, ~10 min, Soul V2 / Cinema only.
  2. Save as Element (\`show_reference_elements\` action=create) — instant, single image, multiple subjects allowed, works with Nano Banana Pro / 2, GPT Image 2, Seedream 4.5 / 5 lite, Cinema Studio Image 2.5, Cinema Studio Video 2 / 3.0, Seedance 2.0, Kling 3.0.
→ Soul signals: 'train' / 'digital twin' / 'identity' / 5+ photos of same person. → Force Elements: >1 character in shot, non-person subject, single image, mention of a non-Soul model, instant result wanted.

After ready: \`generate_image\` with \`model: 'soul_2'\` (or \`soul_cinematic\`) + the returned \`soul_id\`.`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: false,
        description: `Mode selector: list, train/create, or status/get.`,
      },
      {
        name: 'cursor',
        type: 'number',
        required: false,
        description: `Pagination cursor from previous response's next_cursor.`,
      },
      {
        name: 'images',
        type: 'array',
        required: false,
        description: `For Soul training: returned media_id UUIDs from media_confirm, completed image generation job IDs, or https image URLs. Required with medias to total 5-20 images for action=train. Do not pass local file paths.`,
      },
      {
        name: 'medias',
        type: 'array',
        required: false,
        description: `Chat media references to resolve as training images for action=train. Values may be media_id UUIDs, completed image generation job IDs, or https image URLs.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Character name, required for action=train.`,
      },
      {
        name: 'size',
        type: 'integer',
        required: false,
        description: `Number of characters per page.`,
      },
      {
        name: 'soul_id',
        type: 'string',
        required: false,
        description: `Character id for action=status.`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `List filter. Use ready to find characters available for generation.`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Character type. Use soul_2 for model='soul_2'; use soul_cinematic for model='soul_cinematic'; use soul for legacy Soul references.`,
      },
    ],
  },
  {
    name: 'higgsfieldmcp_show_generation_by_ids',
    description: `Render exactly 1-60 requested generation jobs in the full-profile gallery widget, ordered by index and paginated locally in groups of 12. Use once every jobs_wait group is terminal for generate_image_batch, generate_video_batch, or generate_audio_batch. Pass the complete indexed set collected from the batch tools. This tool fetches only those job IDs in bounded groups: it never loads generation history, uses cursors, requests additional pages, or adds other jobs. Do not use show_generations or job_display to present a completed batch.`,
    params: [
      {
        name: 'jobs',
        type: 'array',
        required: true,
        description: `Exact full-profile generation jobs to display. Results are ordered by index and paginated locally.`,
      },
    ],
  },
  {
    name: 'higgsfieldmcp_show_generations',
    description: `Browse completed non-Marketing Studio generation history and render one paginated page in the gallery widget. Returns generations with {id, type, status, model, params, results}. Use only when the user explicitly asks to browse regular generation history. Do not use this history tool after generate_*_batch or jobs_wait; show an exact completed batch with one show_generation_by_ids call instead. Use show_marketing_studio_generations for Marketing Studio video/image/ad history. Pass a prior generation's id as value in the medias array of a new generation to reuse it. Use job_display only to inspect one specific previous result. Paginated: if next_cursor is not null, pass it as cursor to get the next page.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pass next_cursor from previous response to get next page`,
      },
      { name: 'size', type: 'string', required: false, description: `Number of results per page` },
      { name: 'type', type: 'string', required: false, description: `Filter by media type` },
    ],
  },
  {
    name: 'higgsfieldmcp_show_marketing_studio',
    description: `When replying to the user, do not say \`ms_image\` — refer to it as "DTC Ads".

Do NOT use this tool for 'multiply my video', 'multiply my ad', or multiple edited versions of one supplied source video. Load \`get_workflow_instructions\` with \`workflow='ad-multiplier'\` instead.

Open the Marketing Studio widget with the user's product/webproduct/avatar library. \`type\` is one of: \`avatar\`, \`product\`, \`webproduct\`. Marketing Studio video presets are ALWAYS included in the response. Use \`action='list'\` for library, \`action='presets'\` for presets only, \`action='fetch'\` for URL fetch flow, or \`action='create'\` for manual creation of product / webproduct / avatar from uploaded media.

DIFFERENCE BETWEEN \`product\` AND \`webproduct\` (this drives how the resulting video is framed):
- \`product\` — a SPECIFIC physical/sellable item the video should advertise. Pick this when the user wants the ad to feature the item itself (e.g. an Amazon SKU page for a t-shirt, a BMW M model page, a single SKU on a brand site, a direct image of a product). The video showcases the item, not the website.
- \`webproduct\` — a WEBSITE / APP / SERVICE the user wants to advertise as a whole. Pick this when there is no single physical item to feature and the ad should promote the site/app itself (e.g. App Store / Google Play listings, a SaaS landing page, a company homepage with no specific SKU). The video promotes the site.
When in doubt, default to \`product\` (most users advertise a specific item, not a site). If the URL is an App Store / Google Play page, prefer \`webproduct\`. If unsure, omit \`type\` entirely and let the server infer from the URL.

Pass \`url\` with \`type=product\`/\`webproduct\` (or omit \`type\` to infer it from the URL) to trigger a fetch and IMMEDIATELY render the widget with the in-progress entity + the user's full library. The widget shows a top-right progress pill and polls server-side until fetching finishes — no waiting on this tool call.

MANUAL CREATION (\`action='create'\`):
- \`type='product'\`: provide uploaded media in \`medias[]\`. If \`title\` is omitted, server derives one from media URL filename (fallback \`Uploaded Product\`).
- \`type='webproduct'\`: provide chat media in \`medias[]\` (and optionally \`webproduct_medias[]\` for direct URL medias). \`title\`, \`subtitle\`, \`description\`, \`favicon_url\`, and \`webproduct_url\` are all optional.
- \`type='avatar'\`: provide \`avatars[]\` (1-4 items), each with \`name\` plus a single image media. Avatar media must be an image. Pick the right \`medias[0]\` shape based on what you have:
  · UPLOADED FILE (media_input UUID from media_upload) — REQUIRED to include url: \`{value: <uuid>, url: <https://upload.higgsfield.ai/...|https://upload-dev.higgsfield.ai/...|https://cdn.higgsfield.ai/...>, type: 'media_input', role: 'image'}\`. Server cannot fetch the URL for a media_input UUID itself.
  · COMPLETED IMAGE-GENERATION JOB (image_job UUID) — url optional: \`{value: <job_uuid>, role: 'image'}\` works (server pulls result_url from the job). Pass \`url\` + \`type: 'image_job'\` to skip the extra lookup.
  · DIRECT HTTPS URL — pass it as \`value\`: \`{value: <https://...>, role: 'image'}\`. Server ingests it via media-upload.
Equivalent pre-resolved shape: \`media: {id, url, type}\` (skip \`medias[]\`). Backend rejects any avatar URL outside cloudfront.net / cdn.higgsfield.ai / upload.higgsfield.ai / upload-dev.higgsfield.ai.
AFTER calling this tool with \`url\`, you MUST immediately call \`generate_video\` with \`params.model='marketing_studio_video'\` and \`params.url\` set to the same URL to generate the marketing video in its OWN widget. That call blocks until fetching is ready (up to ~45s) and then submits the video — no manual media handling needed.

Dedupes by URL: repeated calls for the same URL reuse any existing non-failed entity instead of re-fetching.

MS IMAGE INPUTS (\`generate_image\` with \`model='ms_image'\`):
- \`type='brand_kit'\` (alias \`brand_kits\`): manage Marketing Studio brand kits — name, logo, hero/product images, colours, fonts, tone of voice, products. Two creation flows:
  · \`action='fetch'\` with \`scrap_url='<brand site URL>'\` — server scrapes the site asynchronously. Status starts as \`queued\`/\`in_progress\`; the widget shows live progress and updates when done. DO NOT poll manually or call \`generate_image\` with the new id until the user confirms the kit is ready.
  · \`action='create'\` with \`brand_kit={...}\` — manual create when the user describes their brand directly (brand name, logo, images, colors, etc.) instead of giving a website URL. Returns \`status='completed'\` immediately — no polling. All fields in \`brand_kit\` are optional; aim for at least \`brand_name\`, \`business_overview\`, \`logo\`, and \`images\`. Recommended two-step flow: (1) ask one open question, research/draft the body yourself (web search, uploaded files via media_upload → CDN URLs); (2) show the user a readable summary, accept edits, THEN call \`action='create'\`. Do not interrogate the user for 17 fields. \`logo\` and \`images[].url\` must be CDN URLs (\`upload.higgsfield.ai/...\`, \`upload-dev.higgsfield.ai/...\`, or \`cdn.higgsfield.ai/...\`) — upload local/external files via the media_upload flow first.
  · Other actions: \`action='list'\`, \`action='get'\`/\`'update'\`/\`'delete'\` (each requires \`brand_kit_id\`). PUT update REPLACES \`data\` wholesale — call \`action='get'\` first, modify, send the full picture.
- \`type='ad_format'\` (aliases: \`ad_formats\`, \`image_style\`, \`image_styles\`): list curated DTC Ads ad-format presets for \`ms_image\`. Read-only. The user picks one as \`style_id\` for ad image generation. If the user doesn't pick one, the server resolves to a sensible default — but you SHOULD list and let them pick.

MARKETING STUDIO SETUP (hooks + settings):
- \`type='hook'\` (alias \`hooks\`): list available Marketing Studio Setup hooks — the 'what' (attention-grabbing mechanic, e.g. "Object flies into frame"). Returns user-owned + CMS preset items.
- \`type='setting'\` (alias \`settings\`): list available Marketing Studio Setup settings — the 'where' (location/vibe, e.g. "Sunlit kitchen, morning light"). Returns user-owned + CMS preset items.
- Some Marketing Studio video presets can include built-in hook/setting behavior. If the user picks such a preset, \`hook_id\`/\`setting_id\` are optional overrides rather than required fields.
- Hooks/settings are supported only for these presets: \`UGC\`, \`Tutorial\`, \`Unboxing\`, \`Product Review\`, \`UGC Virtual Try On\`.
- \`hook_id\` and \`setting_id\` are INDEPENDENT — pass either, both, or neither.
Use \`size\`, \`user_cursor\` (cursor pagination), and \`search\` for these listings. Pass any returned \`id\` to \`generate_video\` as \`params.hook_id\` and/or \`params.setting_id\` to apply the hook/setting to the marketing video. This tool is read-only for setup items — creation/pinning/preview generation are not exposed via MCP.`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: false,
        description: `Explicit mode selector. list=library by type, presets=presets only, fetch=URL fetch flow (product/webproduct/brand_kit), create=manual creation (type chooses entity), update=edit existing entity, get=fetch one by id (brand_kit), delete=remove by id (brand_kit).`,
      },
      {
        name: 'ad_reference_id',
        type: 'string',
        required: false,
        description: `UUID of the ad reference to update. Required for action=update,type=ad_reference.`,
      },
      {
        name: 'avatars',
        type: 'array',
        required: false,
        description: `Plural array. Two contexts:
1) \`action=create,type=avatar\` — avatars to CREATE. Each item: { name, medias|media, is_pinned? }. Max 4. \`name\` is required.
2) \`action=create,type=ad_reference\` — REFERENCE to a single existing avatar. Pass \`avatars: [{id: <avatar uuid>, type: 'custom'|'preset'}]\` (max 1 item).`,
      },
      {
        name: 'brand_kit',
        type: 'object',
        required: false,
        description: `Brand kit data payload for \`action='create'\` or \`action='update'\` with \`type='brand_kit'\`. All fields optional; for create aim for at least \`brand_name\`, \`business_overview\`, \`logo\`, \`images\`. \`logo\` and \`images[].url\` must be CDN URLs (\`upload.higgsfield.ai/...\` / \`upload-dev.higgsfield.ai/...\` / \`cdn.higgsfield.ai/...\`) — upload local files via the media_upload flow first. PUT update REPLACES the data wholesale — \`action='get'\` first, modify the fields you want to change, send the full picture back.`,
      },
      {
        name: 'brand_kit_id',
        type: 'string',
        required: false,
        description: `UUID of the brand kit to GET / UPDATE / DELETE. Used by \`action='get'\`, \`action='update'\`, \`action='delete'\` with \`type='brand_kit'\`.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Used by action=create with type=product/webproduct.`,
      },
      {
        name: 'edited_concept_json',
        type: 'string',
        required: false,
        description: `User-edited concept as structured JSON. Used by action=update,type=ad_reference. Only allowed once the ad reference's status is \`completed\` or \`failed\`.`,
      },
      {
        name: 'edited_concept_text',
        type: 'string',
        required: false,
        description: `User-edited concept as plain text. Used by action=update,type=ad_reference. Only allowed once the ad reference's status is \`completed\` or \`failed\`.`,
      },
      {
        name: 'favicon_url',
        type: 'string',
        required: false,
        description: `Used by action=create,type=webproduct.`,
      },
      {
        name: 'folder_id',
        type: 'string',
        required: false,
        description: `Optional folder for product fetch.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Page size for product/webproduct (offset/limit pagination).`,
      },
      {
        name: 'media_input_ids',
        type: 'array',
        required: false,
        description: `Legacy media IDs for action=create,type=product.`,
      },
      {
        name: 'medias',
        type: 'array',
        required: false,
        description: `Chat media for action=create with type=product/webproduct.`,
      },
      {
        name: 'mode',
        type: 'string',
        required: false,
        description: `Optional Marketing Studio preset label/slug for next_step video generation.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Used for product/webproduct`,
      },
      {
        name: 'preset_cursor',
        type: 'integer',
        required: false,
        description: `Avatars only: cursor over presets`,
      },
      {
        name: 'product_ids',
        type: 'array',
        required: false,
        description: `Plural array (max 1 item). Used by action=create,type=ad_reference to link an existing product. Pass \`product_ids: ['<product uuid>']\`. Do NOT use \`product_id\` (singular) — only the plural form is accepted.`,
      },
      {
        name: 'scrap_url',
        type: 'string',
        required: false,
        description: `Required by \`action='fetch'\` with \`type='brand_kit'\`. Pass the brand's website URL — the server fetches it asynchronously and populates the brand kit.`,
      },
      {
        name: 'scrape_url',
        type: 'string',
        required: false,
        description: `Deprecated alias of \`url\` for product/webproduct fetch. Prefer \`url\`.`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Search query — applies to avatar / hook / setting listings (case-insensitive substring match against name)`,
      },
      {
        name: 'size',
        type: 'integer',
        required: false,
        description: `Page size for avatar / hook / setting / ad_reference listings`,
      },
      {
        name: 'subtitle',
        type: 'string',
        required: false,
        description: `Used by action=create,type=webproduct.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `Used by action=create with type=product/webproduct. For product, optional and auto-derived from media when omitted; for webproduct optional.`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Entity kind to list. Use \`avatar\`/\`product\`/\`webproduct\`/\`ad_reference\`/\`brand_kit\` for libraries, \`hook\`/\`setting\` for Marketing Studio Setup items (read-only — listing only, no creation), \`ad_format\` (alias of \`image_style\`) for the curated DTC Ads ad-format catalogue (read-only). \`preset\`/\`presets\` are accepted as a no-op alias for omitting \`type\` — returns video presets only. Plural aliases (\`avatars\`, \`products\`, \`webproducts\`, \`hooks\`, \`settings\`, \`ad_references\`, \`brand_kits\`, \`ad_formats\`, \`image_styles\`) are accepted. Optional when \`url\` is set (inferred from URL).`,
      },
      {
        name: 'url',
        type: 'string',
        required: false,
        description: `URL to fetch. When set, only product/webproduct are valid. https:// is added automatically if missing.`,
      },
      {
        name: 'user_cursor',
        type: 'number',
        required: false,
        description: `Cursor pagination (created_at timestamp from the previous page's last item). Applies to avatars, hooks, settings, and ad_references. Pass \`null\`/omit for first page.`,
      },
      {
        name: 'video_input_id',
        type: 'string',
        required: false,
        description: `Used by action=create,type=ad_reference. UUID of a video already uploaded in chat (the chat-attachment's media id IS the video_input_id). URL ingestion is NOT supported — do NOT ask the user for TikTok/Instagram/YouTube/HTTPS links. If the user has only a URL, tell them to download the file and upload it as a chat attachment first.`,
      },
      {
        name: 'webproduct_medias',
        type: 'array',
        required: false,
        description: `Used by action=create,type=webproduct. Direct webproduct medias with url/type.`,
      },
      {
        name: 'webproduct_url',
        type: 'string',
        required: false,
        description: `Used by action=create,type=webproduct. URL stored on the webproduct (not fetched).`,
      },
    ],
  },
  {
    name: 'higgsfieldmcp_show_marketing_studio_generations',
    description: `Browse past completed Marketing Studio generations only. Returns Marketing Studio video and ad/image generations with {id, type, status, model, params, results}. Use show_generations for non-Marketing Studio image/video history.`,
    params: [
      {
        name: 'cursor',
        type: 'number',
        required: false,
        description: `Pass next_cursor from previous response to get the next page`,
      },
      { name: 'size', type: 'integer', required: false, description: `Number of results per page` },
    ],
  },
  {
    name: 'higgsfieldmcp_show_medias',
    description: `List your uploaded media files by type. Returns media IDs, URLs, and creation timestamps. Call once with the single type the user asked for (default image); do not enumerate the other types unless the user explicitly asks for them. Pass media IDs as value in the medias array of generation tools. Paginated: if next_cursor is not null, pass it as cursor to get the next page.`,
    params: [
      {
        name: 'cursor',
        type: 'number',
        required: false,
        description: `Pass next_cursor from previous response to get next page`,
      },
      { name: 'size', type: 'integer', required: false, description: `Number of results per page` },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Media type to list. Defaults to image.`,
      },
    ],
  },
  {
    name: 'higgsfieldmcp_show_plans_and_credits',
    description: `Open the single combined pricing widget for everything billing-related. The widget has two tabs the user can switch between: **Upgrade Plan** (Plus + Ultra, monthly + annual subscription cards) and **Top-up Credits** (one-time credit packs of 500 / 1,000 / 2,000 / 4,000 credits). Cards include feature lists, 7-Day Unlimited highlights, and 365-Day Unlimited blocks pulled from the live pricing config. Each plan card and credit pack has a CTA that links directly to the relevant Stripe or Higgsfield checkout/setup URL — no separate tool is needed to mint checkouts. For every billing request, the text response and \`assistant_response\` are intentionally short, user-facing sales copy with checkout URLs wrapped as action-specific Markdown links such as \`[Go to Checkout](url)\`, \`[Higgsfield Upgrade](url)\`, \`[Higgsfield Credit Top-up](url)\`, \`[Higgsfield Auto-refill](url)\`, \`[Higgsfield Team Top-up](url)\`, or \`[Higgsfield Team Auto-refill](url)\`; relay that response verbatim instead of summarizing, saying only that the widget opened, or listing options without links. If the user asks to buy credits or they are out of credits, first push auto-refill when \`auto_refill_purchase_link\` is present, then show \`credit_purchase_links\`. If the user asks to upgrade or a minimum plan is required, show \`plan_purchase_links\`. Pass \`intent='auto_refill'\` for out-of-credits recovery, \`intent='topup'\` for one-time credit packs, \`intent='upgrade'\` for plan upgrades, or \`intent='trial'\` when the user specifically asks for the free trial so the response is ordered for that purchase path. FREE TRIAL: when \`free_trial\` is present in the response, the user is eligible for a 3-day $0 Plus trial with MCP-only credits — the widget shows it and the text response leads with it. In text-only clients ALWAYS relay \`free_trial.compliance_note\` verbatim (MCP-only, card required, automatic charge after the trial unless cancelled, how to cancel by saying 'cancel auto-renewal'). When \`free_trial\` is absent, NEVER speculate about trial eligibility or mention fraud/abuse checks — present the paid plans neutrally. When \`initial_view='trial_upgrade'\`, the user's trial credits are exhausted: relay the numbered upgrade options plus the renewal reminder, and mention that saying 'cancel auto-renewal' stops the upcoming charge while keeping trial access. To cancel the trial's auto-renewal, call \`cancel_trial_auto_renewal\` instead of this tool. Use this tool for ANY of these requests: plans, pricing, subscriptions, upgrade options, comparing tiers, buying credits, topping up credits, refilling credits, credit packs. Do not look for separate \`show_plans\` or \`show_credit_topups\` tools — both have been merged into this one. Returns \`already_subscribed: true\` when the workspace is already on a paid plan; the widget hides the Upgrade tab in that case and shows only credit top-ups. Team-plan workspaces: \`workspace_kind\` field indicates the context. When \`workspace_kind='team_owner'\`, the widget renders team-specific Top-up and Auto-refill UIs and emits \`team_purchase_links\` (two links: \`team_top_up\` and \`team_auto_refill\`) that deeplink to the team billing modals on higgsfield.ai — relay both Markdown links in the text response. When \`workspace_kind='team_member'\`, no purchase links are returned; the widget shows a read-only notice and the text response tells the user only the workspace owner can buy credits or change auto-refill. Do not invent purchase links for members.`,
    params: [
      {
        name: 'intent',
        type: 'string',
        required: false,
        description: `Purchase path to prioritize in the widget and text fallback. Use auto_refill for out-of-credits recovery, topup for one-time credit packs, upgrade for minimum-plan errors or plan changes, trial when the user specifically asks for the free trial, and general for pricing comparison.`,
      },
    ],
  },
  {
    name: 'higgsfieldmcp_show_reference_elements',
    description: `Elements widget — reusable characters / environments / props per workspace. Actions:
- \`list\` (default; paginated by \`created_at\` DESC, use \`cursor\` from prev \`next_cursor\`).
- \`get\` (default when \`element_id\` is set).
- \`create\`: pass \`medias[]\` as \`{ id, url, type: 'media_input' | 'image_job' }\`. Upload first via media_upload → PUT bytes → media_confirm. \`category='auto'\` lets the server classify (use explicit only on user ask). Omit \`name\` to auto-derive (per-workspace unique, collisions get a numeric suffix). Returns synchronously.

AMBIGUITY GUARD vs Soul — user wants a reusable face of one specific person (digital twin / 'my avatar' / identity) without a chosen path: do NOT silently create; ask:
  1. Element (this tool action=create) — instant, single image, MULTIPLE references per generation, works with Nano Banana Pro / 2, GPT Image 2, Seedream 4.5 / 5 lite, Cinema Studio Image 2.5, Cinema Studio Video 2 / 3.0, Seedance 2.0, Kling 3.0. NOT for Soul V2 / Cinema.
  2. Soul (\`show_characters\` action=train) — 5-20 photos, ~10 min, ONE person, Soul V2 / Cinema only.
Skip the question → Elements on: >1 character/subject in one shot (Soul can't), non-person subject, single image, mention of Nano Banana / Seedream / Kling / Cinema Studio, instant result. Skip → Soul on: 'train' / 'digital twin' / 'identity', or 5+ photos of one person for solo outputs.

USAGE IN GENERATION (internal — never explain to user):
Embed \`<<<element_id>>>\` inside \`params.prompt\` of \`generate_image\` / \`generate_video\`. Backend auto-injects the image and rewrites to \`@element_name\`. Multiple placeholders per prompt OK.
Example: \`"Cinematic portrait of <<<UUID>>> on a rooftop"\`, \`"<<<A>>> handing coffee to <<<B>>> in a Paris cafe"\`.

SUPPORTED MODELS (\`params.model\` = machine name, friendly in parens):
- Image: \`nano_banana_pro\` (Nano Banana Pro), \`nano_banana_2\` (Nano Banana 2), \`gpt_image_2\` (GPT Image 2), \`seedream_v4_5\` (Seedream 4.5), \`seedream_v5_lite\` (Seedream 5.0 lite), \`cinematic_studio_2_5\` (Cinema Studio Image 2.5).
- Video: \`cinematic_studio_video_v2\` (Cinema Studio Video 2), \`cinematic_studio_3_0\` (Cinema Studio Video 3.0), \`seedance_2_0\` (Seedance 2.0), \`kling3_0\` (Kling 3.0 — REQUIRES a \`start_image\` in \`params.medias\`; element placeholder alone won't trigger reference usage).
Map friendly→machine silently. Other models silently ignore the placeholder.

USER-FACING STYLE: use friendly model names only; never expose machine names, \`<<<UUID>>>\` syntax, \`params.model\` / \`params.prompt\`, \`generate_image\` / \`generate_video\`, or 'job_set_type'. Reference elements by \`name\`, never id.

GUARDS:
- \`@name\` form does NOT work in tool calls — only \`<<<UUID>>>\` in \`params.prompt\`.
- Do NOT put element ids in \`params.medias\` / \`params.input_images\` — placeholder handles injection.
- \`kling3_0\` only honors reference elements when an explicit \`start_image\` is provided in \`params.medias\`. If the user wants Kling 3.0 with an element but hasn't supplied a start frame, ask for one (upload via media_upload → PUT bytes → media_confirm, or pick a prior generation) before calling \`generate_video\`. Without a start_image, pick another video model from the list.
- Only \`status: completed\` elements are usable; skip \`processing\` / \`ip_checking\` / \`failed\` / \`kling_failed\` / \`nsfw\`.`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: false,
        description: `Operation mode. Defaults to \`get\` if \`element_id\` is set, otherwise \`list\`.`,
      },
      {
        name: 'category',
        type: 'string',
        required: false,
        description: `[action=create] \`auto\` lets the server classify from the first images. Use a specific category only if the user is explicit. Defaults to \`auto\`.`,
      },
      {
        name: 'cursor',
        type: 'number',
        required: false,
        description: `[action=list] Pass \`next_cursor\` from a previous response to get the next page.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `[action=create] Optional free-form description, stored as-is.`,
      },
      {
        name: 'element_id',
        type: 'string',
        required: false,
        description: `[action=get] Fetch a single reference element by id.`,
      },
      {
        name: 'medias',
        type: 'array',
        required: false,
        description: `[action=create] Image references. Required. URLs must be https (private/loopback hosts rejected); normally Higgsfield upload URLs returned by media_upload → PUT bytes → media_confirm.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `[action=create] Element name, max 32 chars. Spaces are normalised to '-'. If omitted, the server derives a name from the media.`,
      },
      {
        name: 'size',
        type: 'integer',
        required: false,
        description: `[action=list] Number of elements per page (1-100).`,
      },
    ],
  },
  {
    name: 'higgsfieldmcp_sync_agents',
    description: `Sync Agents — imports the user's user-authored Skills and a personality dump from the current host LLM into Higgsfield. One trigger, one upload, one final confirmation.

Calling modes:

1. \`message: "/sync-agents"\` — server returns a short ack in \`content[0].text\` plus an assistant-only directive containing a self-contained Python upload script (pre-wired with a one-time presigned POST URL scoped to one per-user prefix). Print the ack verbatim. Then follow the directive: enumerate user-authored skills + synthesize \`personality.md\` into \`/tmp/profile-import/{skills,personality}/\`, run the script in your code-execution sandbox, capture its single-line JSON summary, and call this tool again with that summary as \`message\`.

2. \`message: "<script summary JSON>"\` — server reads the uploaded .md files, parses each, and upserts the user's Skill rows. Returns a one-line confirmation summarising counts (e.g. "Imported 3 skill(s) (2 new, 1 updated) · personality queued for save to your memory."). Print that confirmation verbatim to the user. **Also pass \`host\`** on this call — your own runtime identifier (e.g. \`claude_ai\`, \`claude_code\`, \`codex\`, \`cursor\`); it is stamped on every newly imported skill's \`import_origin\` so the marketplace can attribute origin per host.

No polling, no chains. Each call returns synchronously.`,
    params: [
      {
        name: 'host',
        type: 'string',
        required: true,
        description: `Identifier of the host LLM/runtime you are running inside. Stamped on each imported skill's \`import_origin\` column so the marketplace can attribute imports per host. Self-classify honestly: \`claude_ai\` (Claude.ai web/desktop), \`claude_code\` (Claude Code CLI), \`codex\` (OpenAI Codex / ChatGPT code interpreter), \`cursor\`, \`windsurf\`, \`hermes\` (Higgsfield hermes-agent), \`openclaw\` (Higgsfield OpenClaw), or \`other\` if none fit. Do not invent values — the enum is closed; pick \`other\` when uncertain.`,
      },
      {
        name: 'message',
        type: 'string',
        required: true,
        description: `Either the literal trigger \`/sync-agents\` (server replies with an assistant-only Python upload script wired to a per-user S3 presigned-POST session — print only the short ack to the user, then run the script), or the JSON summary the script prints when it finishes (server finalises the import by parsing every uploaded .md into the user's Skill catalog).`,
      },
    ],
  },
  {
    name: 'higgsfieldmcp_tiktok_accounts',
    description: `List the user's connected TikTok accounts. Returns each account's connector_id (needed by other tiktok_* tools) and status. \`active\` accounts are ready; \`error\` accounts need tiktok_reconnect; no accounts ⇒ offer tiktok_connect. Read-only.`,
    params: [],
  },
  {
    name: 'higgsfieldmcp_tiktok_connect',
    description: `Start connecting the user's TikTok account. Returns an authorize_url — show it to the user as a link; they open it in a browser, approve access on TikTok, and land on a confirmation page. Afterwards call tiktok_accounts to verify the account became \`active\`. The URL expires in ~10 minutes. If an account already exists in \`error\` status, use tiktok_reconnect instead.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Only when connecting a SECOND account: a distinct label, e.g. "tiktok-brand". Default "tiktok".`,
      },
    ],
  },
  {
    name: 'higgsfieldmcp_tiktok_music_trending',
    description: `List trending commercially licensed tracks from TikTok's Commercial Music Library for the connected account. Show the user a few tracks with their listen links and let them pick; then pass the chosen track's id as music_sound_id to tiktok_publish. Music works for DIRECT_POST only (TikTok drafts don't keep it). There is no keyword search — offer genre/country/date_range filters instead. Read-only.`,
    params: [
      {
        name: 'connector_id',
        type: 'string',
        required: true,
        description: `Active TikTok account from tiktok_accounts.`,
      },
      {
        name: 'country_code',
        type: 'string',
        required: false,
        description: `Region whose trending chart to use, e.g. US. Default US.`,
      },
      {
        name: 'date_range',
        type: 'string',
        required: false,
        description: `Popularity window. Default 7DAY.`,
      },
      {
        name: 'genre',
        type: 'string',
        required: false,
        description: `TikTok CML genre enum, e.g. ALL, POP, HIP_HOP/RAP, LO-FI, EDM, COUNTRY, K-POP, CHILL_BEATS, EPIC. Default ALL.`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Tracks per page. Default 10.`,
      },
      { name: 'offset', type: 'integer', required: false, description: `Page start. Default 0.` },
    ],
  },
  {
    name: 'higgsfieldmcp_tiktok_music_tune',
    description: `Open the tuning editor for one Commercial Music Library track the user already picked (via tiktok_music_trending): trim start/end and set track/original volumes. Pass the same genre/country_code/date_range filters that were used when the track was found, or the lookup may miss. The user copies the final configuration from the editor and pastes it into the chat; pass those values to tiktok_publish. Read-only.`,
    params: [
      {
        name: 'connector_id',
        type: 'string',
        required: true,
        description: `Active TikTok account from tiktok_accounts.`,
      },
      {
        name: 'music_sound_id',
        type: 'string',
        required: true,
        description: `The picked track's id (from tiktok_music_trending / the user's paste).`,
      },
      {
        name: 'country_code',
        type: 'string',
        required: false,
        description: `Same country filter the track was found with, if any.`,
      },
      {
        name: 'date_range',
        type: 'string',
        required: false,
        description: `Same date range filter the track was found with, if any.`,
      },
      {
        name: 'genre',
        type: 'string',
        required: false,
        description: `Same filter the track was found with, if any.`,
      },
    ],
  },
  {
    name: 'higgsfieldmcp_tiktok_prepare_publish',
    description: `Step 1 of publishing to TikTok. Validates the media and TikTok account, creates a publish session, and returns what the user must review and choose (preview, privacy options, required declarations, confirmations). The media URL must be a Higgsfield-hosted asset (TikTok requires a verified source domain). Then collect the user's choices and call tiktok_publish. mode=DIRECT_POST posts to the profile; mode=UPLOAD_TO_DRAFT saves to the user's TikTok drafts. MEDIA LIMITS — check before calling, and convert or downscale locally if a file does not comply; a rejected file costs a full convert-and-re-upload round trip, and TikTok rejects some files only asynchronously, after the post was submitted. Photos: JPEG or WebP only (PNG is rejected by TikTok, and Higgsfield image generation emits PNG — convert first), each at most 20 MB, resolution must fit within 1920x1080 or 1080x1920, up to 35 images. Videos: MP4, WebM or MOV, at most 1 GB, 3-600 seconds, at least 360 px on both sides, 23-60 FPS.`,
    params: [
      {
        name: 'connector_id',
        type: 'string',
        required: true,
        description: `Active TikTok account from tiktok_accounts.`,
      },
      {
        name: 'media_type',
        type: 'string',
        required: true,
        description: `Type of media being published.`,
      },
      {
        name: 'mode',
        type: 'string',
        required: true,
        description: `Publish mode: DIRECT_POST posts to the profile; UPLOAD_TO_DRAFT saves to the user's TikTok drafts.`,
      },
      {
        name: 'allow_comment',
        type: 'boolean',
        required: false,
        description: `Prefill — only if the user already stated it.`,
      },
      {
        name: 'allow_duet',
        type: 'boolean',
        required: false,
        description: `Prefill — only if the user already stated it.`,
      },
      {
        name: 'allow_stitch',
        type: 'boolean',
        required: false,
        description: `Prefill — only if the user already stated it.`,
      },
      {
        name: 'commercial_content_disclosure',
        type: 'object',
        required: false,
        description: `Prefill — only if the user already stated it.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Longer post description text.`,
      },
      {
        name: 'is_aigc',
        type: 'boolean',
        required: false,
        description: `Prefill — only if the user already stated whether the media is AI-generated.`,
      },
      {
        name: 'photo_cover_index',
        type: 'integer',
        required: false,
        description: `Index of the photo to use as the post cover, for PHOTO posts.`,
      },
      {
        name: 'photo_images',
        type: 'array',
        required: false,
        description: `Required for PHOTO. Higgsfield-hosted image URLs.`,
      },
      {
        name: 'privacy_level',
        type: 'string',
        required: false,
        description: `Prefill for the publish form — pass ONLY if the user already stated it explicitly.`,
      },
      { name: 'title', type: 'string', required: false, description: `Caption / title.` },
      {
        name: 'video_url',
        type: 'string',
        required: false,
        description: `Required for VIDEO. Must be a Higgsfield-hosted asset URL.`,
      },
    ],
  },
  {
    name: 'higgsfieldmcp_tiktok_publish',
    description: `Step 2 of publishing. Call only after tiktok_prepare_publish and after collecting the user's explicit choices and confirmations. Pass the publish_session_id from prepare (the media is locked to it — do not resend URLs). Set every flag listed in the prepare response's required_confirmations to true; these represent real user consent (AIGC/branded-content/music/privacy). Optionally attach a commercial track via music_sound_id from tiktok_music_trending (DIRECT_POST only). Returns a publish_id for tiktok_publish_status. PUBLISH QUOTAS per account, enforced before TikTok is called: at most 5 posts per minute and 13 posts per 24 hours, both rolling (TikTok's own ceiling is 6/minute and 15/day). A rejection returns code=cadence_burst or cadence_daily plus retry_after_seconds — wait that long instead of retrying, since retrying sooner only earns another rejection. Failed attempts and drafts do not consume quota; a post TikTok accepted does. Duration, frame size and frame rate are measured from the media file itself by tiktok_prepare_publish, before a publish slot is spent — there is no duration argument, never ask the user for one. music_sound_volume, video_original_sound_volume, music_sound_start and music_sound_end apply only together with music_sound_id and only to videos; without a track, or on a photo post, they are ignored. MEDIA LIMITS — check before calling, and convert or downscale locally if a file does not comply; a rejected file costs a full convert-and-re-upload round trip, and TikTok rejects some files only asynchronously, after the post was submitted. Photos: JPEG or WebP only (PNG is rejected by TikTok, and Higgsfield image generation emits PNG — convert first), each at most 20 MB, resolution must fit within 1920x1080 or 1080x1920, up to 35 images. Videos: MP4, WebM or MOV, at most 1 GB, 3-600 seconds, at least 360 px on both sides, 23-60 FPS.`,
    params: [
      { name: 'connector_id', type: 'string', required: true, description: `No description.` },
      { name: 'media_type', type: 'string', required: true, description: `No description.` },
      { name: 'mode', type: 'string', required: true, description: `No description.` },
      {
        name: 'preview_confirmed',
        type: 'boolean',
        required: true,
        description: `No description.`,
      },
      {
        name: 'publish_session_id',
        type: 'string',
        required: true,
        description: `From tiktok_prepare_publish.`,
      },
      { name: 'user_confirmed', type: 'boolean', required: true, description: `No description.` },
      { name: 'allow_comment', type: 'boolean', required: false, description: `No description.` },
      { name: 'allow_duet', type: 'boolean', required: false, description: `No description.` },
      { name: 'allow_stitch', type: 'boolean', required: false, description: `No description.` },
      { name: 'auto_add_music', type: 'boolean', required: false, description: `No description.` },
      {
        name: 'branded_content_policy_confirmed',
        type: 'boolean',
        required: false,
        description: `Required when branded_content is disclosed.`,
      },
      {
        name: 'commercial_content_disclosure',
        type: 'object',
        required: false,
        description: `DIRECT_POST: if enabled, at least one of your_brand / branded_content must be true.`,
      },
      {
        name: 'commercial_content_disclosure_selected_by_user',
        type: 'boolean',
        required: false,
        description: `No description.`,
      },
      { name: 'description', type: 'string', required: false, description: `No description.` },
      {
        name: 'interaction_settings_selected_by_user',
        type: 'boolean',
        required: false,
        description: `No description.`,
      },
      {
        name: 'is_aigc',
        type: 'boolean',
        required: false,
        description: `Set true for AI-generated/edited media (AIGC disclosure).`,
      },
      {
        name: 'music_sound_end',
        type: 'integer',
        required: false,
        description: `Track trim end in milliseconds. Defaults to the video duration. VIDEO only.`,
      },
      {
        name: 'music_sound_id',
        type: 'string',
        required: false,
        description: `Commercial Music Library track to attach: song_clip_id from tiktok_music_trending. DIRECT_POST only — drafts don't keep music. Mutually exclusive with auto_add_music.`,
      },
      {
        name: 'music_sound_start',
        type: 'integer',
        required: false,
        description: `Track trim start in milliseconds (65000 starts the track at 1:05). Defaults to the track beginning. VIDEO only.`,
      },
      {
        name: 'music_sound_volume',
        type: 'integer',
        required: false,
        description: `Track volume 0-100. Defaults to 50. VIDEO only.`,
      },
      {
        name: 'music_usage_confirmed',
        type: 'boolean',
        required: false,
        description: `No description.`,
      },
      {
        name: 'privacy_level',
        type: 'string',
        required: false,
        description: `Required for DIRECT_POST; pick from prepare's privacy_level_options.`,
      },
      {
        name: 'privacy_level_selected_by_user',
        type: 'boolean',
        required: false,
        description: `No description.`,
      },
      {
        name: 'processing_notice_acknowledged',
        type: 'boolean',
        required: false,
        description: `No description.`,
      },
      { name: 'title', type: 'string', required: false, description: `No description.` },
      {
        name: 'video_original_sound_volume',
        type: 'integer',
        required: false,
        description: `Original video audio volume 0-100. Defaults to 50 (0 mutes the user's own audio). VIDEO only.`,
      },
    ],
  },
  {
    name: 'higgsfieldmcp_tiktok_publish_status',
    description: `Step 3 of publishing. Fetch processing status for a publish_id returned by tiktok_publish. TikTok may take a few minutes to process before the post is live. Read-only.`,
    params: [
      { name: 'connector_id', type: 'string', required: true, description: `No description.` },
      { name: 'publish_id', type: 'string', required: true, description: `From tiktok_publish.` },
    ],
  },
  {
    name: 'higgsfieldmcp_tiktok_reconnect',
    description: `Re-run the TikTok OAuth for an existing connector in \`error\` status (expired/revoked access). Returns a fresh authorize_url — show it to the user as a link, then verify with tiktok_accounts.`,
    params: [
      {
        name: 'connector_id',
        type: 'string',
        required: true,
        description: `The connector to reconnect, from tiktok_accounts.`,
      },
    ],
  },
  {
    name: 'higgsfieldmcp_transactions',
    description: `List the user's credit transactions (spend/refund/grant/deduct), newest first. Paginated: if next_cursor is not null, pass it as cursor to get the next page.`,
    params: [
      {
        name: 'cursor',
        type: 'integer',
        required: false,
        description: `Pass next_cursor from the previous response to fetch the next page`,
      },
      {
        name: 'size',
        type: 'integer',
        required: false,
        description: `Number of transactions per page (1-100)`,
      },
    ],
  },
  {
    name: 'higgsfieldmcp_upscale_image',
    description: `Upscale and enhance an existing image. Use this when the user asks to upscale, enhance, or increase the resolution of an image to 2K/4K. This tool does not use prompt or count. Provider selects the upscale backend; currently only 'bytedance' is supported (the default). You MUST pass the source image's width and height in pixels (the caller supplies them; the server does not infer them). Set params.get_cost=true to preflight credits (flat cost) without submitting a job.`,
    params: [
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `Image upscale parameters. prompt and count are not supported.`,
      },
    ],
  },
  {
    name: 'higgsfieldmcp_upscale_video',
    description: `Upscale and enhance an existing video. Use this when the user asks to upscale, enhance, sharpen, denoise, restore, or convert a video to higher resolution. This tool does not use prompt or count, and does not support cost preflight. Choose a provider: 'bytedance' (preset-based, target 1080p/2K/4K — you MUST pass the source video width/height in pixels and may set fps to 24/30/60) or 'topaz' (Topaz Video, aspect-ratio based, target 1080p/2160p — no source dimensions needed).`,
    params: [
      {
        name: 'params',
        type: 'string',
        required: true,
        description: `Video upscale parameters. Set provider to 'bytedance' or 'topaz'. prompt, count and get_cost are not supported.`,
      },
    ],
  },
  {
    name: 'higgsfieldmcp_video_analysis_create',
    description: `Start a scene-by-scene analysis of a video. Provide EXACTLY ONE of: (a) video_input_id — UUID of a video the user has uploaded via media_upload/media_confirm, or (b) youtube_url — a YouTube link (youtube.com / youtu.be hosts only). Returns immediately with status='queued'; poll video_analysis_status until status='completed'. Processing typically takes 3-5 minutes on average. IMPORTANT: warn the user up front that the longer the video, the less accurate the scene-by-scene analysis becomes — short clips give the most reliable results.`,
    params: [
      {
        name: 'video_input_id',
        type: 'string',
        required: false,
        description: `UUID of the uploaded source video (the media_id returned by the upload tool).`,
      },
      {
        name: 'youtube_url',
        type: 'string',
        required: false,
        description: `HTTPS YouTube video URL on youtube.com, www.youtube.com, m.youtube.com, or youtu.be.`,
      },
    ],
  },
  {
    name: 'higgsfieldmcp_video_analysis_jobs',
    description: `List the user's video analyses in the current workspace, newest first. Paginate by passing the previous response's cursor.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor — unix timestamp of created_at from the previous page (advances backwards in time). Omit for the first page.`,
      },
      { name: 'size', type: 'integer', required: false, description: `Page size.` },
    ],
  },
  {
    name: 'higgsfieldmcp_video_analysis_status',
    description: `Get the status and result of a video analysis. Poll this after video_analysis_create until status='completed' (scenes populated) or 'failed' (fail_reason populated). Analyses typically finish in 3-5 minutes — poll accordingly every 30-60 seconds.`,
    params: [
      {
        name: 'video_analyze_id',
        type: 'string',
        required: true,
        description: `UUID returned by video_analysis_create or video_analysis_jobs.`,
      },
    ],
  },
  {
    name: 'higgsfieldmcp_virality_predictor',
    description: `Virality Predictor predicts a video's virality potential, engagement, attention, audience response, retention risk, hook strength, and creative performance with an interactive dashboard. Use when the user asks whether a video can go viral or wants creative-performance analysis. Create starts analysis from a confirmed uploaded video or completed generated video; preview re-opens an existing dashboard.`,
    params: [
      {
        name: 'action',
        type: 'string',
        required: true,
        description: `create starts Virality Predictor analysis; preview re-opens an existing dashboard.`,
      },
      {
        name: 'params',
        type: 'object',
        required: true,
        description: `Virality Predictor parameters. create uses medias; preview uses job_id.`,
      },
    ],
  },
  {
    name: 'higgsfieldmcp_voice_change',
    description: `Replace the spoken voice in a video with a different voice while keeping the original timing and visuals, then re-merge the new audio onto the video. Use this when the user asks to change, swap, or revoice the speaker in a clip. Pass video_id for the source video (a confirmed uploaded media_id or a completed video generation job_id) and voice_id for the target voice. voice_type selects whether voice_id is a built-in preset voice ('preset') or a workspace reference element ('element'). This tool does not use prompt or count; output dimensions are taken from the source video automatically.`,
    params: [
      { name: 'params', type: 'object', required: true, description: `Voice change parameters.` },
    ],
  },
  {
    name: 'higgsfieldmcp_website_db',
    description: `Inspect the website's database (D1 / SQLite), READ-ONLY. The website has ONE database — the live site's real data. Pick an operation: 'tables' (list tables); 'schema' (a table's columns — needs table); 'rows' (a page of rows — needs table; optional filters, order_by + order_dir, limit (default 50) + offset); 'query' (one read-only SELECT/WITH — needs sql). Writes and DDL are rejected.`,
    params: [
      {
        name: 'operation',
        type: 'string',
        required: true,
        description: `What to read: tables | schema | rows | query.`,
      },
      {
        name: 'website_id',
        type: 'string',
        required: true,
        description: `The website's id (returned by create_website).`,
      },
      {
        name: 'filters',
        type: 'array',
        required: false,
        description: `'rows' filters, each 'col:op[:value]' (eq ne gt gte lt lte like is_null).`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Max rows to return for 'rows' operation. Default 50.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Row offset to skip for 'rows' operation.`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Column to sort 'rows' results by.`,
      },
      {
        name: 'order_dir',
        type: 'string',
        required: false,
        description: `Sort direction for 'rows' results.`,
      },
      {
        name: 'sql',
        type: 'string',
        required: false,
        description: `A single read-only SELECT/WITH statement (operation 'query').`,
      },
      {
        name: 'table',
        type: 'string',
        required: false,
        description: `Table name. Required for 'schema' and 'rows'.`,
      },
    ],
  },
  {
    name: 'higgsfieldmcp_website_repo_access',
    description: `Get direct git access to a website's repo to edit it — THE way to get the website's code. Returns the repo URL, branch, slug, and a scoped token; clone it with the terminal tool, edit files, commit + push, then call deploy_website. Clone into a directory named after the slug so multiple websites can share the workspace. Access is scoped to your own websites — do not echo the token back to the user.`,
    params: [
      {
        name: 'website_id',
        type: 'string',
        required: true,
        description: `The website's id (returned by create_website).`,
      },
    ],
  },
  {
    name: 'higgsfieldmcp_website_secrets',
    description: `Manage a website's SECRETS (environment variables: API keys, tokens). Set them HERE instead of hardcoding them in source. One tool, three operations: 'set' (store/replace — needs name + value); 'delete' (remove — needs name); 'list' (the configured secrets as a {name: value} map). A change (set OR delete) is STAGED — NOT live until the next deploy_website. Read a secret SERVER-side in website code; never ship it to the browser.`,
    params: [
      {
        name: 'operation',
        type: 'string',
        required: true,
        description: `What to do: 'set', 'delete', or 'list'.`,
      },
      {
        name: 'website_id',
        type: 'string',
        required: true,
        description: `The website's id (returned by create_website).`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Secret name (env var). Required for 'set' and 'delete'.`,
      },
      {
        name: 'value',
        type: 'string',
        required: false,
        description: `Secret value. Required for 'set'.`,
      },
    ],
  },
  {
    name: 'higgsfieldmcp_website_status',
    description: `Get the website's deploy status — the live URL and the status of the last deploy. Use to check a deploy that returned 'pending', or to fetch the live URL.`,
    params: [
      {
        name: 'website_id',
        type: 'string',
        required: true,
        description: `The website's id (returned by create_website).`,
      },
    ],
  },
]
