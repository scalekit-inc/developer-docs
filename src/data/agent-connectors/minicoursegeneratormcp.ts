import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'minicoursegeneratormcp_audio_upload',
    description: `Host an audio file on MCG for a lesson \`audio\` block (narration, a podcast clip, a pronunciation sample). Stage the file with \`media_upload_url\` (get an upload URL, PUT the file to it), then call this with the returned **\`downloadUrl\`** as \`url\`. Returns { documentId, url } — put the **\`url\`** in the \`audio\` block. Do NOT put a \`media_upload_url\` downloadUrl in a lesson: it expires in ~2h, this one is durable. mp3/wav/ogg/flac/aac/m4a/wma.`,
    params: [
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `Publicly-reachable URL of the audio file — use the \`downloadUrl\` from media_upload_url.`,
      },
      {
        name: 'fileName',
        type: 'string',
        required: false,
        description: `File name (its extension picks the MIME type; defaults to the URL's base name).`,
      },
      {
        name: 'replaceId',
        type: 'string',
        required: false,
        description: `Optional documentId to replace, keeping the same hosted url.`,
      },
    ],
  },
  {
    name: 'minicoursegeneratormcp_course_add_certificate',
    description: `Add a completion certificate to a Course — learners who finish the whole Course earn it. Creates the default certificate (its copy and pass threshold can be tuned later in the MCG admin UI). Certificates live at the Course level, not per Module.`,
    params: [
      {
        name: 'courseId',
        type: 'string',
        required: true,
        description: `The id of the course to add a certificate to. Retrieve it from course_list or course_create.`,
      },
    ],
  },
  {
    name: 'minicoursegeneratormcp_course_analytics',
    description: `Aggregate learner analytics for a Course: how many are assigned, how many engaged, how many completed it, certificates and badges issued, and the mean quiz score. No personal data — counts only. Pass moduleId to narrow the same report to one Module. Start here before reaching for the per-learner lists — and for a public Course this is the ONLY reach figure, because a public Course enrols nobody and so has no learner list at all.`,
    params: [
      {
        name: 'courseId',
        type: 'string',
        required: true,
        description: `Course id from course_list.`,
      },
      {
        name: 'moduleId',
        type: 'integer',
        required: false,
        description: `Optional: narrow the report to this Module.`,
      },
    ],
  },
  {
    name: 'minicoursegeneratormcp_course_create',
    description: `Create a Course — the top-level program. A Course holds several Modules (add them with module_push, one per topic); use module_push directly only for a single standalone topic. Pass \`landingPage\` (marketing copy) to create the course's landing page with it. See get_content_format.`,
    params: [
      { name: 'name', type: 'string', required: true, description: `Course name.` },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional course description.`,
      },
      {
        name: 'landingPage',
        type: 'string',
        required: false,
        description: `Landing-page marketing copy as YAML (introduction/audience/learning_outcomes/program_details/keywords).`,
      },
    ],
  },
  {
    name: 'minicoursegeneratormcp_course_finishers',
    description: `The learners who completed a whole Course, with their mean score, when they finished, and their certificate URL where one was issued. Use \`from\` to ask only about recent completions. Rows carry the learner's real name and email — the connected shop's own learners. Treat them as personal data: use them to answer what was asked, and do not republish a roster elsewhere.`,
    params: [
      {
        name: 'courseId',
        type: 'string',
        required: true,
        description: `Course id from course_list.`,
      },
      {
        name: 'from',
        type: 'string',
        required: false,
        description: `Only learners who finished on or after this ISO 8601 date.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Zero-based page. Default 0.`,
      },
      {
        name: 'pageSize',
        type: 'integer',
        required: false,
        description: `Rows per page. Default 20, max 100.`,
      },
    ],
  },
  {
    name: 'minicoursegeneratormcp_course_learner_add',
    description: `Give someone access to a Course, creating their learner account if this account has never seen them. Pass \`email\` (and optionally \`name\`); \`username\` defaults to the email. Adding someone who is already on the Course is a no-op and comes back with alreadyMember: true. Check \`errors\` on the result — a non-empty list means they were NOT added. This does not email them; send the course link yourself.`,
    params: [
      {
        name: 'courseId',
        type: 'string',
        required: true,
        description: `Course id from course_list.`,
      },
      {
        name: 'email',
        type: 'string',
        required: false,
        description: `The learner's email address.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `The learner's display name — what a certificate is made out to.`,
      },
      {
        name: 'username',
        type: 'string',
        required: false,
        description: `Optional username. Defaults to the email.`,
      },
    ],
  },
  {
    name: 'minicoursegeneratormcp_course_learner_remove',
    description: `Take someone off a Course. This revokes access only — their account, their progress and any certificate they earned are kept, so adding them back restores where they were. Removing someone who is not on the Course is a no-op and comes back with removed: false.`,
    params: [
      {
        name: 'courseId',
        type: 'string',
        required: true,
        description: `Course id from course_list.`,
      },
      {
        name: 'learner',
        type: 'string',
        required: true,
        description: `The learner's email address or username.`,
      },
    ],
  },
  {
    name: 'minicoursegeneratormcp_course_learners',
    description: `The learners on a Course — one row each with name and email, how far they got, their score, whether they earned the certificate and when they were last active. Paginated (20 per page, max 100). A public Course enrols nobody, so this returns no rows and a \`note\` saying so — report that note, not "no learners", and use course_analytics for its reach. Rows carry the learner's real name and email — the connected shop's own learners. Treat them as personal data: use them to answer what was asked, and do not republish a roster elsewhere.`,
    params: [
      {
        name: 'courseId',
        type: 'string',
        required: true,
        description: `Course id from course_list.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Zero-based page. Default 0.`,
      },
      {
        name: 'pageSize',
        type: 'integer',
        required: false,
        description: `Rows per page. Default 20, max 100.`,
      },
    ],
  },
  {
    name: 'minicoursegeneratormcp_course_list',
    description: `List the courses in the connected account (a Course is the top-level program). Paginated — 20 per page by default, 100 max. An account can hold far more courses than one page, so check \`hasNextPage\` and keep paging before you conclude anything about the whole account; \`totalCount\` tells you how many there are in total.`,
    params: [
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Zero-based page. Default 0.`,
      },
      {
        name: 'pageSize',
        type: 'integer',
        required: false,
        description: `Courses per page. Default 20, max 100.`,
      },
    ],
  },
  {
    name: 'minicoursegeneratormcp_course_update',
    description: `Rename a Course or change its description. courseId is the id from course_list / course_create. Only the fields you pass change.`,
    params: [
      {
        name: 'courseId',
        type: 'string',
        required: true,
        description: `The id of the course to update. Retrieve it from course_list or course_create.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New course description.`,
      },
      { name: 'name', type: 'string', required: false, description: `New course name.` },
    ],
  },
  {
    name: 'minicoursegeneratormcp_get_content_format',
    description: `The MCG Course Authoring Guide — how to plan, structure, and write a course, the lesson content format, and landing-page copy. Read it before creating anything.`,
    params: [],
  },
  {
    name: 'minicoursegeneratormcp_learner_get',
    description: `One learner's full record: every Course they can reach, how far they got in each, their score, when they finished, and whether a certificate was issued — plus per-module detail inside each course. This answers "which courses has this person completed" in one call. Rows carry the learner's real name and email — the connected shop's own learners. Treat them as personal data: use them to answer what was asked, and do not republish a roster elsewhere.`,
    params: [
      {
        name: 'learner',
        type: 'string',
        required: true,
        description: `The learner's email, username, or the session id from learner_list.`,
      },
      {
        name: 'startedOnly',
        type: 'boolean',
        required: false,
        description: `Skip Courses they were given but never opened. Default false.`,
      },
    ],
  },
  {
    name: 'minicoursegeneratormcp_learner_list',
    description: `The account's learners across EVERY Course, one row each with how many courses they were given, started and completed. Use this — not a course_learners call per course — to answer questions about people rather than about one course ("who has finished anything", "which of our learners are stalled", "find this person"). \`search\` matches name, email or username. Paginated (20 per page, max 100). Rows carry the learner's real name and email — the connected shop's own learners. Treat them as personal data: use them to answer what was asked, and do not republish a roster elsewhere.`,
    params: [
      {
        name: 'completedOnly',
        type: 'boolean',
        required: false,
        description: `Only learners who completed at least one Course. Default false.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Zero-based page. Default 0.`,
      },
      {
        name: 'pageSize',
        type: 'integer',
        required: false,
        description: `Rows per page. Default 20, max 100.`,
      },
      {
        name: 'registeredOnly',
        type: 'boolean',
        required: false,
        description: `Skip anonymous public-link learners, who have no name or email to report. Default false.`,
      },
      {
        name: 'search',
        type: 'string',
        required: false,
        description: `Match on name, email or username. Omit for everyone.`,
      },
    ],
  },
  {
    name: 'minicoursegeneratormcp_lesson_create',
    description: `Add a Lesson to an existing Section. For a content lesson, pass \`content\` in the MCG content-authoring format (a \`content:\` document) — call get_content_format first. The CLI compiles it to HTML.`,
    params: [
      {
        name: 'moduleId',
        type: 'integer',
        required: true,
        description: `The integer ID of the module that owns this section.`,
      },
      {
        name: 'sectionId',
        type: 'string',
        required: true,
        description: `The unique identifier of the section to add the lesson to.`,
      },
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `The title of the new lesson.`,
      },
      {
        name: 'content',
        type: 'string',
        required: false,
        description: `For an info lesson: the body as a content-authoring \`content:\` YAML document. For a quiz lesson: a YAML with \`question:\` and \`choices:\`.`,
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        description: `Lesson type — \`info\` for a content lesson or \`quiz\` for an interactive quiz lesson.`,
      },
    ],
  },
  {
    name: 'minicoursegeneratormcp_lesson_delete',
    description: `Delete a Lesson. This is destructive.`,
    params: [
      {
        name: 'lessonId',
        type: 'integer',
        required: true,
        description: `The integer ID of the lesson to permanently delete.`,
      },
    ],
  },
  {
    name: 'minicoursegeneratormcp_lesson_discard_changes',
    description: `Throw away a Lesson's unpublished edits and restore the content learners currently see. Irreversible — the working copy is gone, not archived. Only affects a lesson whose status is published_with_changes.`,
    params: [{ name: 'lessonId', type: 'integer', required: true, description: `Lesson id` }],
  },
  {
    name: 'minicoursegeneratormcp_lesson_get',
    description: `Get a Lesson (title, type, and the rendered HTML body).`,
    params: [
      {
        name: 'lessonId',
        type: 'integer',
        required: true,
        description: `The integer ID of the lesson to retrieve.`,
      },
    ],
  },
  {
    name: 'minicoursegeneratormcp_lesson_move',
    description: `Reorder a Lesson within its Module by setting its order (lower comes first). Optionally move it into another Section of the same module by passing sectionId. moduleId is the lesson's module.`,
    params: [
      {
        name: 'lessonId',
        type: 'integer',
        required: true,
        description: `The integer ID of the lesson to reorder or move.`,
      },
      {
        name: 'moduleId',
        type: 'integer',
        required: true,
        description: `The integer ID of the module that owns this lesson.`,
      },
      {
        name: 'order',
        type: 'integer',
        required: true,
        description: `The new 1-based position of the lesson within its section. Lower numbers appear first.`,
      },
      {
        name: 'sectionId',
        type: 'string',
        required: false,
        description: `The section to move the lesson into. Must be a section within the same module. Omit to keep the lesson in its current section.`,
      },
    ],
  },
  {
    name: 'minicoursegeneratormcp_lesson_publish',
    description: `Publish one Lesson — a draft lesson goes live, or the pending edits on a live lesson replace what learners are reading. Use this to ship part of a module while leaving unfinished lessons as drafts. Only meaningful inside a published module: publishing a lesson in a draft module shows it to nobody, because the module itself is not on the air (use module_publish first).`,
    params: [{ name: 'lessonId', type: 'integer', required: true, description: `Lesson id` }],
  },
  {
    name: 'minicoursegeneratormcp_lesson_selections',
    description: `Get a quiz/survey Lesson's selections — the authored options (id, text, and whether each is flagged correct). No learner/response data.`,
    params: [
      {
        name: 'lessonId',
        type: 'integer',
        required: true,
        description: `The integer ID of the quiz or survey lesson whose answer options to retrieve.`,
      },
    ],
  },
  {
    name: 'minicoursegeneratormcp_lesson_unpublish',
    description: `Pull one Lesson out of the live module, back to draft. It keeps its content and its id, so learner progress and analytics still line up, but learners no longer see it.`,
    params: [{ name: 'lessonId', type: 'integer', required: true, description: `Lesson id` }],
  },
  {
    name: 'minicoursegeneratormcp_lesson_update',
    description: `Edit a Lesson. Pass \`title\` to rename, and/or \`content\` (the MCG content-authoring format) to replace the body — the CLI recompiles it to HTML and replaces the whole body. Authoring is always in content-format, never raw HTML; call get_content_format for the spec.`,
    params: [
      {
        name: 'lessonId',
        type: 'integer',
        required: true,
        description: `The integer ID of the lesson to edit.`,
      },
      {
        name: 'content',
        type: 'string',
        required: false,
        description: `Replacement body in the MCG content-authoring format. The CLI compiles it to HTML and replaces the entire existing body. Call get_content_format for the authoring spec. Omit to leave the body unchanged.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `New title for the lesson. Omit to leave the title unchanged.`,
      },
    ],
  },
  {
    name: 'minicoursegeneratormcp_media_upload_url',
    description: `Stage a media file (a video, a SCORM zip) for upload. Returns a temporary **\`uploadUrl\`** (presigned PUT) and **\`downloadUrl\`** (presigned GET, ~2h). Flow: (1) call this with the \`fileName\` (and \`contentType\`); (2) **PUT the file's bytes to \`uploadUrl\`** from your shell — e.g. \`curl -T <file> -H "Content-Type: <contentType>" "<uploadUrl>"\` — so the bytes go straight to storage and never pass through this conversation; (3) pass \`downloadUrl\` as the \`url\` to \`video_upload\` / \`scorm_upload\`. Use this for video and SCORM (don't base64 big files).`,
    params: [
      {
        name: 'fileName',
        type: 'string',
        required: true,
        description: `File name to stage, e.g. "welcome.mp4" or "quiz.zip".`,
      },
      {
        name: 'contentType',
        type: 'string',
        required: false,
        description: `MIME type to sign the PUT with, e.g. "video/mp4" or "application/zip" (default application/octet-stream).`,
      },
    ],
  },
  {
    name: 'minicoursegeneratormcp_module_analytics',
    description: `Aggregate learner analytics for one Module: assigned, engaged, completed, badges earned and the mean quiz score. No personal data — counts only.`,
    params: [
      {
        name: 'moduleId',
        type: 'integer',
        required: true,
        description: `Module id from module_list.`,
      },
    ],
  },
  {
    name: 'minicoursegeneratormcp_module_answers',
    description: `One learner's answer to every question in a Module: the question, the options they picked (or the text they typed), which options were correct, and whether they got it right. This is the only tool that returns per-question answers — the analytics and finisher tools carry scores only.

Covers BOTH quiz Lessons and the questions inside activity blocks (crossword, wordle, word search, riddle, jumble, pixel quest, SCORM). Each row says which in \`source\`, and activity rows carry \`blockType\`. So this is the whole picture for a module — there is no second tool to call for games.

Two shapes not to misread: \`isCorrect: null\` means the question is ungraded OR they never reached it — NOT that they got it wrong; and a SCORM row has an \`answer\` but no question text (it comes back empty), because a SCORM package reports its outcome without telling us what was asked. That is a real answer, not missing data. Rows carry the learner's real name and email — the connected shop's own learners. Treat them as personal data: use them to answer what was asked, and do not republish a roster elsewhere.`,
    params: [
      {
        name: 'learner',
        type: 'string',
        required: true,
        description: `The learner's email, username, or — for someone who took a public course by link — the session id from learner_list.`,
      },
      {
        name: 'moduleId',
        type: 'integer',
        required: true,
        description: `Module id from module_list.`,
      },
    ],
  },
  {
    name: 'minicoursegeneratormcp_module_create',
    description: `Create an empty Module inside a Course. A Module groups Sections; Sections hold Lessons. courseId is the id from course_list / course_create. Pass a short \`description\` — modules should always have one. To create a module WITH content in one step, prefer module_push. The module is created as a DRAFT: nobody can reach it until module_publish runs.`,
    params: [
      {
        name: 'courseId',
        type: 'string',
        required: true,
        description: `The id of the course to add this module to.`,
      },
      { name: 'name', type: 'string', required: true, description: `Module name.` },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Short module description (1-2 sentences). Always set one.`,
      },
      {
        name: 'language',
        type: 'string',
        required: false,
        description: `ISO language code for the learner interface (default en).`,
      },
    ],
  },
  {
    name: 'minicoursegeneratormcp_module_delete',
    description: `Delete a Module and all its Sections and Lessons. This is destructive.`,
    params: [
      {
        name: 'moduleId',
        type: 'integer',
        required: true,
        description: `The numeric id of the module to delete.`,
      },
    ],
  },
  {
    name: 'minicoursegeneratormcp_module_finishers',
    description: `The learners who completed one Module, with completion percentage, quiz score, and start/finish times. Use this to see where a specific module is landing. Rows carry the learner's real name and email — the connected shop's own learners. Treat them as personal data: use them to answer what was asked, and do not republish a roster elsewhere.`,
    params: [
      {
        name: 'moduleId',
        type: 'integer',
        required: true,
        description: `Module id from module_list.`,
      },
      {
        name: 'from',
        type: 'string',
        required: false,
        description: `Only learners who finished on or after this ISO 8601 date.`,
      },
      {
        name: 'page',
        type: 'integer',
        required: false,
        description: `Zero-based page. Default 0.`,
      },
      {
        name: 'pageSize',
        type: 'integer',
        required: false,
        description: `Rows per page. Default 20, max 100.`,
      },
    ],
  },
  {
    name: 'minicoursegeneratormcp_module_get',
    description: `Get a Module with its Sections and Lessons (and their ids — needed to edit them). Also reports publish state: the module's \`status\` (draft | published | published_with_changes), \`pendingLessonCount\`, and a \`status\` per lesson. Check this before telling someone a module is live.`,
    params: [
      {
        name: 'moduleId',
        type: 'integer',
        required: true,
        description: `The numeric id of the module to retrieve. Retrieve it from module_list.`,
      },
    ],
  },
  {
    name: 'minicoursegeneratormcp_module_list',
    description: `List the Modules inside a Course (each with id, name, and section/lesson counts). courseId is the Course (collection) id from course_list / course_create.`,
    params: [
      {
        name: 'courseId',
        type: 'string',
        required: true,
        description: `The id of the course whose modules to list.`,
      },
    ],
  },
  {
    name: 'minicoursegeneratormcp_module_move',
    description: `Reorder a Module within its Course by setting its zero-based position (lower comes first). The other modules keep their relative order and shift around it, so to place one module you only pass that module — not the whole ordering. Use module_list to see the current order.`,
    params: [
      {
        name: 'courseId',
        type: 'string',
        required: true,
        description: `Course (collection) id the module belongs to`,
      },
      { name: 'moduleId', type: 'integer', required: true, description: `Module id to move` },
      {
        name: 'order',
        type: 'integer',
        required: true,
        description: `New zero-based position within the course (lower comes first)`,
      },
    ],
  },
  {
    name: 'minicoursegeneratormcp_module_publish',
    description: `Publish a Module: it and every Lesson in it become visible to learners, and its previewUrl starts working. Modules are created as DRAFTS, so a module you just created or pushed is not reachable by anyone until this runs — if you hand someone the link first, it will not work. Publishing is public: only call it when the person has said they want the module live.`,
    params: [{ name: 'moduleId', type: 'integer', required: true, description: `Module id` }],
  },
  {
    name: 'minicoursegeneratormcp_module_push',
    description: `Create one complete Module (sections + lessons) from a \`kind: Module\` YAML spec — a Module is one focused unit; a full course is several Modules in a Course (see course_create). Include a top-level \`landingPage\` in the spec. Follow get_content_format for the content format; use dryRun:true to validate. Pass a short \`description\` — the spec has no description field, so this is how a created module gets one (every module should have a description). The module is created as a DRAFT — the previewUrl it returns will not work for anyone else until module_publish runs. Say so rather than handing over a link that looks broken, and publish only once the person has said they want it live.`,
    params: [
      {
        name: 'spec',
        type: 'string',
        required: true,
        description: `A \`kind: Module\` YAML spec defining sections and lessons. See get_content_format for the required structure.`,
      },
      {
        name: 'courseId',
        type: 'string',
        required: false,
        description: `The id of the parent course. Retrieve it from course_list or course_create.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Short module description (1-2 sentences).`,
      },
      {
        name: 'dryRun',
        type: 'boolean',
        required: false,
        description: `If true, validate the spec without creating anything.`,
      },
    ],
  },
  {
    name: 'minicoursegeneratormcp_module_theme',
    description: `Set how the learner sees a Module: page layout, typography and colours. Use it to match an author's brand — they often supply a palette or a style sheet. A merge patch: only the fields you pass change. Colours are CSS hex. Note this themes the whole module; to tint one box inside a lesson use the \`background\`/\`text_color\` box fields instead (see get_content_format).`,
    params: [
      { name: 'moduleId', type: 'integer', required: true, description: `Module id` },
      {
        name: 'backgroundColor',
        type: 'string',
        required: false,
        description: `Page background colour as CSS hex`,
      },
      {
        name: 'bodyBackgroundImage',
        type: 'string',
        required: false,
        description: `Page background image url`,
      },
      {
        name: 'buttonColor',
        type: 'string',
        required: false,
        description: `Button colour as CSS hex`,
      },
      {
        name: 'cardAlignment',
        type: 'string',
        required: false,
        description: `top, center or bottom`,
      },
      {
        name: 'cardBackgroundColor',
        type: 'string',
        required: false,
        description: `Card background colour as CSS hex`,
      },
      {
        name: 'font',
        type: 'string',
        required: false,
        description: `Font family, e.g. "Open Sans"`,
      },
      {
        name: 'fontColor',
        type: 'string',
        required: false,
        description: `Text colour as CSS hex, e.g. "#1e293b"`,
      },
      { name: 'fontSize', type: 'string', required: false, description: `S, M or L` },
      {
        name: 'layout',
        type: 'integer',
        required: false,
        description: `0 default, 1 left/right, 2 native, 3 bottom`,
      },
      { name: 'lineHeight', type: 'string', required: false, description: `S, M or L` },
    ],
  },
  {
    name: 'minicoursegeneratormcp_module_unpublish',
    description: `Move a Module back to draft. Learners lose access immediately and the previewUrl stops working. Content and learner progress are kept, so it can be published again.`,
    params: [{ name: 'moduleId', type: 'integer', required: true, description: `Module id` }],
  },
  {
    name: 'minicoursegeneratormcp_module_update',
    description: `Rename a Module, change its description, or change its learner-interface language. Only the fields you pass change. \`language\` switches the interface chrome (buttons/labels) the learner sees to that language's defaults — it does NOT translate the authored lesson content.`,
    params: [
      {
        name: 'moduleId',
        type: 'integer',
        required: true,
        description: `The numeric id of the module to update.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New module description.`,
      },
      {
        name: 'language',
        type: 'string',
        required: false,
        description: `ISO language code for the learner interface.`,
      },
      { name: 'name', type: 'string', required: false, description: `New module name.` },
    ],
  },
  {
    name: 'minicoursegeneratormcp_scorm_delete',
    description: `Delete a hosted SCORM package. This is destructive: any lesson \`scorm\` block still referencing this packageId will break, so remove or repoint those lessons first. To swap in a corrected activity, prefer \`scorm_replace\` — it keeps the packageId and the lessons intact.`,
    params: [
      {
        name: 'packageId',
        type: 'string',
        required: true,
        description: `SCORM packageId to delete (GUID).`,
      },
    ],
  },
  {
    name: 'minicoursegeneratormcp_scorm_replace',
    description: `Correct or update an already-hosted SCORM activity **in place**, keeping the same \`packageId\`. Every lesson whose \`scorm\` block references that packageId picks up the new activity with no content edit — so use this instead of deleting and re-adding. Generate the corrected SCORM 1.2 zip, stage it with \`media_upload_url\`, then call this with the returned \`downloadUrl\` as \`url\` and the existing \`packageId\`.`,
    params: [
      {
        name: 'packageId',
        type: 'string',
        required: true,
        description: `The existing SCORM packageId to replace (GUID).`,
      },
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `Publicly-reachable URL of the new SCORM .zip — use the \`downloadUrl\` from media_upload_url.`,
      },
      {
        name: 'fileName',
        type: 'string',
        required: false,
        description: `Optional file name to record (defaults to the URL's base name).`,
      },
    ],
  },
  {
    name: 'minicoursegeneratormcp_scorm_upload',
    description: `Host an interactive SCORM package (an AI-authored, self-contained scored activity) on MCG for a lesson \`scorm\` block. You generate a SCORM 1.2 zip yourself (a self-contained HTML interactive that reports cmi.core.score/lesson_status via the SCORM API, plus a minimal imsmanifest.xml — read get_content_format's SCORM reporting rules first: report each interaction and commit as it happens, not once at the end, or partial attempts record nothing). Stage the zip with \`media_upload_url\` (get an upload URL, PUT the file to it), then call this with the returned **\`downloadUrl\`** as \`url\`. Returns { packageId, entryPointUrl, title, version, fileName } — put the **\`packageId\`** (and the returned entryPointUrl/title/version/fileName) in the \`scorm\` block.`,
    params: [
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `Publicly-reachable URL of the SCORM .zip — use the \`downloadUrl\` from media_upload_url.`,
      },
      {
        name: 'fileName',
        type: 'string',
        required: false,
        description: `Optional display name for the SCORM package.`,
      },
    ],
  },
  {
    name: 'minicoursegeneratormcp_section_create',
    description: `Add a Section to an existing Module.`,
    params: [
      {
        name: 'moduleId',
        type: 'integer',
        required: true,
        description: `The numeric id of the module to add the section to.`,
      },
      { name: 'title', type: 'string', required: true, description: `Section title.` },
    ],
  },
  {
    name: 'minicoursegeneratormcp_section_delete',
    description: `Delete a Section and its Lessons. This is destructive.`,
    params: [
      {
        name: 'sectionId',
        type: 'string',
        required: true,
        description: `The unique identifier of the section to delete. All lessons inside it will also be permanently deleted.`,
      },
    ],
  },
  {
    name: 'minicoursegeneratormcp_section_update',
    description: `Rename a Section.`,
    params: [
      {
        name: 'sectionId',
        type: 'string',
        required: true,
        description: `The unique identifier of the section to rename.`,
      },
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `The new title for the section.`,
      },
    ],
  },
  {
    name: 'minicoursegeneratormcp_video_upload',
    description: `Host a video on Vimeo through MCG (server-side — no third-party account needed) for a lesson \`video\` block. **Any MP4 works** — pass any publicly-reachable video \`url\` directly, or stage a local file with \`media_upload_url\` (get an upload URL, PUT the file to it) and pass the returned **\`downloadUrl\`** as \`url\`. Returns { shopClipId, clipId, playerUrl } — put the **\`shopClipId\`** in the \`video\` block's \`shopClipId\`. MCG renders its own native player and bakes the playback URL in server-side once Vimeo finishes transcoding.`,
    params: [
      {
        name: 'url',
        type: 'string',
        required: true,
        description: `Publicly-reachable URL of the video file — any hosted MP4, or the \`downloadUrl\` from media_upload_url.`,
      },
      {
        name: 'fileName',
        type: 'string',
        required: false,
        description: `Optional display name for the video on Vimeo.`,
      },
    ],
  },
  {
    name: 'minicoursegeneratormcp_whoami',
    description: `Returns the MCG account this connection is authenticated as (user id, email, shop id). Use it to confirm you connected the correct account.`,
    params: [],
  },
]
