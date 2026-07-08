import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'minicoursegeneratormcp_course_add_certificate',
    description: `Add a completion certificate to a Course — learners who finish the whole Course earn it. Creates the default certificate. Certificates live at the Course level, not per Module.`,
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
    name: 'minicoursegeneratormcp_course_list',
    description: `List the courses in the connected account (a Course is the top-level program).`,
    params: [],
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
    description: `Stage a media file (a video, a SCORM zip) for upload. Returns a temporary \`uploadUrl\` (presigned PUT) and \`downloadUrl\` (presigned GET, ~2h). Flow: (1) call this with the \`fileName\`; (2) PUT the file bytes to \`uploadUrl\`; (3) pass \`downloadUrl\` to \`video_upload\` / \`scorm_upload\`.`,
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
    name: 'minicoursegeneratormcp_module_create',
    description: `Create an empty Module inside a Course. A Module groups Sections; Sections hold Lessons. courseId is the id from course_list / course_create. Pass a short \`description\` — modules should always have one. To create a module WITH content in one step, prefer module_push.`,
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
    name: 'minicoursegeneratormcp_module_get',
    description: `Get a Module with its Sections and Lessons (and their ids — needed to edit them).`,
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
    name: 'minicoursegeneratormcp_module_push',
    description: `Create one complete Module (sections + lessons) from a \`kind: Module\` YAML spec. Include a top-level \`landingPage\` in the spec. Follow get_content_format for the content format; use dryRun:true to validate. Pass a short \`description\` — the spec has no description field, so this is how a created module gets one.`,
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
    name: 'minicoursegeneratormcp_module_update',
    description: `Rename a Module, change its description, or change its learner-interface language. Only the fields you pass change.`,
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
    name: 'minicoursegeneratormcp_scorm_upload',
    description: `Host an interactive SCORM package on MCG for a lesson \`scorm\` block. Stage the zip with \`media_upload_url\`, then call this with the returned \`downloadUrl\` as \`url\`. Returns { packageId, entryPointUrl, title, version, fileName }.`,
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
    description: `Host a video on Vimeo through MCG (server-side — no Vimeo account needed) for a lesson \`video\` block. Pass any publicly-reachable MP4 \`url\`, or stage a local file with \`media_upload_url\` and pass the returned \`downloadUrl\` as \`url\`. Returns { shopClipId, clipId, playerUrl }.`,
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
