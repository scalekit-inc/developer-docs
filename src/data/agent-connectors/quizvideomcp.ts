import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'quizvideomcp_get_api_catalog',
    description: `Return the Quiz.Video API catalog linkset for agent discovery.`,
    params: [],
  },
  {
    name: 'quizvideomcp_get_llms_txt',
    description: `Return a compact LLM-readable summary of the Quiz.Video API.`,
    params: [],
  },
  {
    name: 'quizvideomcp_get_openapi_spec',
    description: `Return the Quiz.Video OpenAPI 3.1 specification.`,
    params: [],
  },
  {
    name: 'quizvideomcp_quiz_video_add_quiz_questions',
    description: `Append one or more questions (with their answers and optional images) to an existing quiz.`,
    params: [
      {
        name: 'questions',
        type: 'array',
        required: true,
        description: `One or more questions to append to the quiz.`,
      },
      {
        name: 'quizId',
        type: 'string',
        required: true,
        description: `Quiz ID in YouTube-style 11-character base64url format.`,
      },
    ],
  },
  {
    name: 'quizvideomcp_quiz_video_apply_template',
    description: `Apply a snapshot of a custom template to one or more quizzes you own. Sets each quiz's template field to "custom" and writes the snapshot into themeCustomization.customTemplate. Future edits to the source template do not auto-propagate.`,
    params: [
      {
        name: 'quizIds',
        type: 'array',
        required: true,
        description: `Quiz ids to apply the template to.`,
      },
      { name: 'templateId', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'quizvideomcp_quiz_video_create_flashcard_deck',
    description: `Create a flashcard deck. Required: title (3-120 chars) and cards[] (min 1). Optional: description (≤1200 chars), tags (≤50 each).`,
    params: [
      {
        name: 'cards',
        type: 'array',
        required: true,
        description: `Flashcards in the deck; at least one card is required.`,
      },
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `Deck title (3–120 characters).`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional deck description (≤1200 characters).`,
      },
      {
        name: 'tags',
        type: 'array',
        required: false,
        description: `Optional tags to categorize the deck (≤50 characters each).`,
      },
    ],
  },
  {
    name: 'quizvideomcp_quiz_video_create_quiz',
    description: `Create a quiz. Prefer sending themeDescription or themeCustomization so the saved quiz has a custom visual theme; if omitted, the server derives one from the title/description. Omit backgroundMusicId to use default YouTube-safe shared background music, or set null for silent. Required: title. Optional: description, format, quizType, template, countdownSeconds, difficulty, musicVolume, and questions[].`,
    params: [
      { name: 'title', type: 'string', required: true, description: `Human-readable quiz title.` },
      {
        name: 'backgroundMusicId',
        type: 'number',
        required: false,
        description: `Background music track id from /api/v1/music. Omit to use the default YouTube-safe shared track; set null for silent.`,
      },
      {
        name: 'countdownSeconds',
        type: 'number',
        required: false,
        description: `Seconds of countdown shown before each question (3–15).`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional longer description shown on the quiz page.`,
      },
      {
        name: 'difficulty',
        type: 'string',
        required: false,
        description: `Target difficulty level for the generated/created quiz.`,
      },
      {
        name: 'format',
        type: 'string',
        required: false,
        description: `Output aspect ratio: "tiktok" (9:16 vertical) or "youtube" (16:9 horizontal).`,
      },
      {
        name: 'musicVolume',
        type: 'number',
        required: false,
        description: `Background music volume from 0 (silent) to 1 (full). Default 0.15.`,
      },
      {
        name: 'questions',
        type: 'array',
        required: false,
        description: `Optional initial questions with their answers and images.`,
      },
      {
        name: 'quizType',
        type: 'string',
        required: false,
        description: `Quiz mechanic: multiple_choice, reveal_answer, or picture_guess.`,
      },
      {
        name: 'template',
        type: 'string',
        required: false,
        description: `Visual template id (e.g. "neon", "minimal").`,
      },
      {
        name: 'themeCustomization',
        type: 'object',
        required: false,
        description: `Explicit custom theme to save and apply to the quiz. Invalid colors/fonts are ignored by the API sanitizer.`,
      },
      {
        name: 'themeDescription',
        type: 'string',
        required: false,
        description: `Natural-language custom visual theme prompt. Example: "golden luxury game show", "ocean glass", or "cyber neon". The server saves the generated themeCustomization and applies it automatically.`,
      },
    ],
  },
  {
    name: 'quizvideomcp_quiz_video_create_quiz_hook',
    description: `Create a hook for a quiz. \`hook\` is a pass-through object whose fields follow the HookInput schema (see OpenAPI spec).`,
    params: [
      {
        name: 'hook',
        type: 'object',
        required: true,
        description: `HookInput object (hookType, positionType, title, content, plus optional styling — see OpenAPI spec).`,
      },
      {
        name: 'quizId',
        type: 'string',
        required: true,
        description: `Quiz ID in YouTube-style 11-character base64url format.`,
      },
    ],
  },
  {
    name: 'quizvideomcp_quiz_video_create_render',
    description: `Queue a new video render for an existing quiz. Returns the render sessionId; poll quiz_video_get_render until its status is "completed" (typically 1-5 minutes), then call quiz_video_download_render to obtain the signed MP4 URL. The quiz itself is viewable immediately at /quiz/{slug}/ regardless of render status.`,
    params: [
      {
        name: 'quizId',
        type: 'string',
        required: true,
        description: `ID of the quiz to render into a video.`,
      },
    ],
  },
  {
    name: 'quizvideomcp_quiz_video_create_template',
    description: `Save a new custom template authored in the drag-and-drop editor. Required: template (the CustomTemplate JSON). Optional: name, description, thumbnail, isDefault, isPublic.`,
    params: [
      {
        name: 'template',
        type: 'object',
        required: true,
        description: `CustomTemplate JSON with scenes.hook/question/answer and canvas.`,
      },
      { name: 'description', type: 'string', required: false, description: `No description.` },
      {
        name: 'isDefault',
        type: 'boolean',
        required: false,
        description: `Mark as your default template (replaces any existing default).`,
      },
      {
        name: 'isPublic',
        type: 'boolean',
        required: false,
        description: `Make discoverable to other users.`,
      },
      { name: 'name', type: 'string', required: false, description: `No description.` },
      {
        name: 'thumbnail',
        type: 'string',
        required: false,
        description: `Optional preview image URL or data URI.`,
      },
    ],
  },
  {
    name: 'quizvideomcp_quiz_video_delete_flashcard_deck',
    description: `Permanently delete a flashcard deck and all of its cards.`,
    params: [{ name: 'deckId', type: 'string', required: true, description: `Flashcard deck ID.` }],
  },
  {
    name: 'quizvideomcp_quiz_video_delete_quiz',
    description: `Permanently delete a quiz and all of its questions, answers, and hooks.`,
    params: [
      {
        name: 'quizId',
        type: 'string',
        required: true,
        description: `Quiz ID in YouTube-style 11-character base64url format.`,
      },
    ],
  },
  {
    name: 'quizvideomcp_quiz_video_delete_quiz_hook',
    description: `Delete a single hook from a quiz.`,
    params: [
      {
        name: 'hookId',
        type: 'number',
        required: true,
        description: `Numeric id of the hook to delete.`,
      },
      {
        name: 'quizId',
        type: 'string',
        required: true,
        description: `Quiz ID in YouTube-style 11-character base64url format.`,
      },
    ],
  },
  {
    name: 'quizvideomcp_quiz_video_delete_template',
    description: `Permanently delete a custom template you own. Quizzes that have a snapshot of this template are unaffected — the snapshot remains in their themeCustomization.`,
    params: [
      { name: 'templateId', type: 'string', required: true, description: `No description.` },
    ],
  },
  {
    name: 'quizvideomcp_quiz_video_download_render',
    description: `Request a signed download URL for a completed render.`,
    params: [
      {
        name: 'sessionId',
        type: 'string',
        required: true,
        description: `Render session id for a completed render.`,
      },
    ],
  },
  {
    name: 'quizvideomcp_quiz_video_generate_quiz',
    description: `AI-generate and save a quiz from a topic. Prefer providing themeDescription or themeCustomization; when omitted, the server derives and saves a topic-based custom theme. Omit backgroundMusicId to use default YouTube-safe shared background music, or set null for silent. The response \`data\` always includes a \`watchUrl\` (the public quiz-viewer page, instantly playable). When autoRender is true, \`data.render\` also contains the queued render session so the agent can poll quiz_video_get_render for the MP4.`,
    params: [
      {
        name: 'topic',
        type: 'string',
        required: true,
        description: `Subject the AI should build the quiz around.`,
      },
      {
        name: 'answerOptionCount',
        type: 'number',
        required: false,
        description: `For multiple-choice quizzes, generate 3 or 4 answer options per question. Defaults to 4.`,
      },
      {
        name: 'autoRender',
        type: 'boolean',
        required: false,
        description: `If true, immediately queue a video render for the new quiz. The render session (sessionId, status) is returned under \`data.render\`; poll quiz_video_get_render with that sessionId for progress and the final videoUrl. Rendering typically takes 1-5 minutes. Quiz creation is not blocked by render-queue failures — the quiz is returned either way.`,
      },
      {
        name: 'backgroundMusicId',
        type: 'number',
        required: false,
        description: `Background music track id from /api/v1/music. Omit to use the default YouTube-safe shared track; set null for silent.`,
      },
      {
        name: 'countdownSeconds',
        type: 'number',
        required: false,
        description: `Seconds of countdown shown before each question (3-15).`,
      },
      {
        name: 'difficulty',
        type: 'string',
        required: false,
        description: `Target difficulty level.`,
      },
      {
        name: 'extraDirection',
        type: 'string',
        required: false,
        description: `Additional instructions to steer the AI (tone, focus areas, exclusions).`,
      },
      {
        name: 'format',
        type: 'string',
        required: false,
        description: `Output aspect ratio. Defaults to "tiktok".`,
      },
      {
        name: 'musicVolume',
        type: 'number',
        required: false,
        description: `Background music volume from 0 (silent) to 1 (full). Default 0.15.`,
      },
      {
        name: 'numberOfQuestions',
        type: 'number',
        required: false,
        description: `How many questions to generate (1–200).`,
      },
      {
        name: 'progressBarStyle',
        type: 'string',
        required: false,
        description: `Countdown progress indicator style.`,
      },
      {
        name: 'quizType',
        type: 'string',
        required: false,
        description: `Quiz mechanic to generate.`,
      },
      {
        name: 'template',
        type: 'string',
        required: false,
        description: `Visual template id. If omitted, the saved custom theme can suggest a matching template.`,
      },
      {
        name: 'themeCustomization',
        type: 'object',
        required: false,
        description: `Explicit custom theme to save and apply to the generated quiz. Use themeDescription for prompt-style themes.`,
      },
      {
        name: 'themeDescription',
        type: 'string',
        required: false,
        description: `Natural-language custom visual theme prompt. Example: "golden luxury game show", "ocean glass", or "cyber neon".`,
      },
    ],
  },
  {
    name: 'quizvideomcp_quiz_video_get_account',
    description: `Get the authenticated user's account info, plan, and usage limits.`,
    params: [],
  },
  {
    name: 'quizvideomcp_quiz_video_get_flashcard_deck',
    description: `Fetch a flashcard deck (including all cards) by id.`,
    params: [{ name: 'deckId', type: 'string', required: true, description: `Flashcard deck ID.` }],
  },
  {
    name: 'quizvideomcp_quiz_video_get_quiz',
    description: `Fetch a single quiz (including settings and metadata) by id.`,
    params: [
      {
        name: 'quizId',
        type: 'string',
        required: true,
        description: `Quiz ID in YouTube-style 11-character base64url format.`,
      },
    ],
  },
  {
    name: 'quizvideomcp_quiz_video_get_render',
    description: `Fetch the status and progress of a render session. When status is "completed", the response also contains a signed \`videoUrl\` (and \`filename\`) so the agent can share the MP4 directly without a separate quiz_video_download_render call. In-progress polls return status + progress.`,
    params: [
      {
        name: 'sessionId',
        type: 'string',
        required: true,
        description: `Render session id returned when the render was started.`,
      },
    ],
  },
  {
    name: 'quizvideomcp_quiz_video_get_template',
    description: `Fetch a single custom template (including the full scenes/layers payload) by id.`,
    params: [
      { name: 'templateId', type: 'string', required: true, description: `Template id (tpl_...).` },
    ],
  },
  {
    name: 'quizvideomcp_quiz_video_list_flashcard_decks',
    description: `List flashcard decks owned by the authenticated user with optional pagination.`,
    params: [
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Results per page (1–100, default 20).`,
      },
      { name: 'page', type: 'number', required: false, description: `1-indexed page number.` },
    ],
  },
  {
    name: 'quizvideomcp_quiz_video_list_music',
    description: `List available background music tracks.`,
    params: [],
  },
  {
    name: 'quizvideomcp_quiz_video_list_quiz_hooks',
    description: `List video hooks configured for a quiz.`,
    params: [
      {
        name: 'quizId',
        type: 'string',
        required: true,
        description: `Quiz ID in YouTube-style 11-character base64url format.`,
      },
    ],
  },
  {
    name: 'quizvideomcp_quiz_video_list_quiz_questions',
    description: `List questions (and their answers) for a quiz.`,
    params: [
      {
        name: 'quizId',
        type: 'string',
        required: true,
        description: `Quiz ID in YouTube-style 11-character base64url format.`,
      },
    ],
  },
  {
    name: 'quizvideomcp_quiz_video_list_quizzes',
    description: `List quizzes owned by the authenticated user with optional pagination (page, limit).`,
    params: [
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Results per page (1–100, default 20).`,
      },
      { name: 'page', type: 'number', required: false, description: `1-indexed page number.` },
    ],
  },
  {
    name: 'quizvideomcp_quiz_video_list_templates',
    description: `List the caller's saved custom templates (and optionally public ones). Templates are reusable scene-based designs that can be applied to many quizzes.`,
    params: [
      {
        name: 'includePublic',
        type: 'boolean',
        required: false,
        description: `Include public templates in addition to your own. Default true.`,
      },
      { name: 'limit', type: 'number', required: false, description: `No description.` },
      { name: 'page', type: 'number', required: false, description: `No description.` },
    ],
  },
  {
    name: 'quizvideomcp_quiz_video_update_quiz',
    description: `Update a quiz. \`updates\` accepts any subset of quiz settings (title, description, format, template, timing, music, TTS, publish status, etc.).`,
    params: [
      {
        name: 'quizId',
        type: 'string',
        required: true,
        description: `Quiz ID in YouTube-style 11-character base64url format.`,
      },
      {
        name: 'updates',
        type: 'object',
        required: true,
        description: `Partial quiz settings object; only included fields are updated.`,
      },
    ],
  },
  {
    name: 'quizvideomcp_quiz_video_update_quiz_hook',
    description: `Update an existing hook on a quiz. Requires quizId and numeric hookId; \`updates\` is a partial HookInput.`,
    params: [
      {
        name: 'hookId',
        type: 'number',
        required: true,
        description: `Numeric id of the hook to update (from list_quiz_hooks).`,
      },
      {
        name: 'quizId',
        type: 'string',
        required: true,
        description: `Quiz ID in YouTube-style 11-character base64url format.`,
      },
      {
        name: 'updates',
        type: 'object',
        required: true,
        description: `Partial HookInput object; only included fields are updated.`,
      },
    ],
  },
  {
    name: 'quizvideomcp_quiz_video_update_template',
    description: `Update an existing template. Any subset of fields may be supplied; omitted fields stay unchanged.`,
    params: [
      { name: 'templateId', type: 'string', required: true, description: `No description.` },
      { name: 'description', type: 'string', required: false, description: `No description.` },
      { name: 'isDefault', type: 'boolean', required: false, description: `No description.` },
      { name: 'isPublic', type: 'boolean', required: false, description: `No description.` },
      { name: 'name', type: 'string', required: false, description: `No description.` },
      { name: 'template', type: 'object', required: false, description: `No description.` },
      { name: 'thumbnail', type: 'string', required: false, description: `No description.` },
    ],
  },
]
