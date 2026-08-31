import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'googleclassroom_announcement_create',
    description: `Create a new announcement (stream post) in a Google Classroom course.
Returns the created announcement, including its Classroom-assigned ID, state, and creation time.
Use this to post a new update to the class stream; use announcement_patch to edit an existing announcement instead of recreating it. Announcements are stream posts, distinct from topics which are organizational labels used to group coursework.`,
    params: [
      {
        name: 'course_id',
        type: 'string',
        required: true,
        description: `Identifier of the course to post the announcement in. This can be either the Classroom-assigned course ID (a numeric string) or an alias (e.g. prefixed with 'd:' for a domain-scoped alias or 'p:' for a project-scoped alias).`,
      },
      {
        name: 'text',
        type: 'string',
        required: true,
        description: `Body text of the announcement, shown in the Classroom stream. Must be a valid UTF-8 string of no more than 30,000 characters. Example: 'Reminder: submit your project proposal by Friday.'`,
      },
      {
        name: 'assignee_mode',
        type: 'string',
        required: false,
        description: `Controls which students can view this announcement. ALL_STUDENTS makes it visible to every student in the course; INDIVIDUAL_STUDENTS restricts visibility to only the students listed in individual_student_ids. If unspecified, Classroom defaults to ALL_STUDENTS. Example: ALL_STUDENTS.`,
      },
      {
        name: 'individual_student_ids',
        type: 'array',
        required: false,
        description: `Classroom user IDs of the students who should have access to this announcement. Only applied when assignee_mode is INDIVIDUAL_STUDENTS; ignored otherwise. Example: 106783094529935604519.`,
      },
      {
        name: 'materials',
        type: 'string',
        required: false,
        description: `Additional materials to attach to the announcement, as a JSON-encoded array of Material objects (each with one of driveFile, youtubeVideo, link, or form). Announcements support at most 20 material items. Example: [{"link":{"url":"https://example.com/reading.pdf"}}].`,
      },
      {
        name: 'scheduled_time',
        type: 'string',
        required: false,
        description: `RFC3339 UTC timestamp at which Classroom should automatically publish this announcement. Must be paired with state=DRAFT — Classroom rejects a scheduled_time on an announcement that publishes immediately (the default state when state is omitted is PUBLISHED, not DRAFT). Example: 2026-09-01T15:00:00.000Z.`,
      },
      {
        name: 'state',
        type: 'string',
        required: false,
        description: `Status of the announcement. PUBLISHED makes it immediately visible to students; DRAFT keeps it hidden until published. If unspecified, Classroom defaults to PUBLISHED. Example: PUBLISHED.`,
      },
    ],
  },
  {
    name: 'googleclassroom_announcement_delete',
    description: `Permanently delete an announcement from a Google Classroom course.
Returns an empty response on success.
Use this to remove an announcement that was created by this app's OAuth client; this cannot be undone. Use announcement_get first if you need to confirm the announcement's details before deleting it.`,
    params: [
      {
        name: 'announcement_id',
        type: 'string',
        required: true,
        description: `Classroom-assigned identifier of the announcement to delete, unique per course. Example: 167869283124.`,
      },
      {
        name: 'course_id',
        type: 'string',
        required: true,
        description: `Identifier of the course the announcement belongs to. This can be either the Classroom-assigned course ID (a numeric string) or an alias (e.g. prefixed with 'd:' for a domain-scoped alias or 'p:' for a project-scoped alias).`,
      },
    ],
  },
  {
    name: 'googleclassroom_announcement_get',
    description: `Retrieve a single announcement from a Google Classroom course by its ID.
Returns the announcement's text, state, assignee mode, materials, and timestamps.
Use this when you already know the announcement's ID; use announcements_list to browse or find announcements in a course.`,
    params: [
      {
        name: 'announcement_id',
        type: 'string',
        required: true,
        description: `Classroom-assigned identifier of the announcement to retrieve, unique per course. Example: 167869283124.`,
      },
      {
        name: 'course_id',
        type: 'string',
        required: true,
        description: `Identifier of the course the announcement belongs to. This can be either the Classroom-assigned course ID (a numeric string) or an alias (e.g. prefixed with 'd:' for a domain-scoped alias or 'p:' for a project-scoped alias).`,
      },
    ],
  },
  {
    name: 'googleclassroom_announcement_modify_assignees',
    description: `Change which students can view a Google Classroom announcement by updating its assignee mode.
Returns the updated announcement reflecting the new assignee mode and, if applicable, its individual-student access list.
Use this to switch an announcement between visible-to-all-students and visible-to-specific-students, or to add or remove individual students' access; use announcement_patch for other field changes such as text or state. Only a teacher of the course may call this.`,
    params: [
      {
        name: 'announcement_id',
        type: 'string',
        required: true,
        description: `Classroom-assigned identifier of the announcement whose assignees to modify, unique per course. Example: 167869283124.`,
      },
      {
        name: 'assignee_mode',
        type: 'string',
        required: true,
        description: `Mode describing whether the announcement is accessible by all students or only specified individual students. Use ALL_STUDENTS to open visibility to the whole class, or INDIVIDUAL_STUDENTS together with add_student_ids/remove_student_ids to manage a specific list. Example: INDIVIDUAL_STUDENTS.`,
      },
      {
        name: 'course_id',
        type: 'string',
        required: true,
        description: `Identifier of the course the announcement belongs to. This can be either the Classroom-assigned course ID (a numeric string) or an alias (e.g. prefixed with 'd:' for a domain-scoped alias or 'p:' for a project-scoped alias).`,
      },
      {
        name: 'add_student_ids',
        type: 'array',
        required: false,
        description: `Classroom user IDs of students to grant access to this announcement. Only applied when assignee_mode is INDIVIDUAL_STUDENTS. Example: 106783094529935604519.`,
      },
      {
        name: 'remove_student_ids',
        type: 'array',
        required: false,
        description: `Classroom user IDs of students to revoke access to this announcement. Only applied when assignee_mode is INDIVIDUAL_STUDENTS. Example: 110237461287654321098.`,
      },
    ],
  },
  {
    name: 'googleclassroom_announcement_patch',
    description: `Update one or more fields of an existing Google Classroom announcement.
Returns the updated announcement, reflecting only the fields named in update_mask.
Use this for partial edits instead of recreating the announcement with announcement_create; only text, state, and scheduled_time can be changed via this endpoint. To change who can view the announcement, use announcement_modify_assignees instead; materials cannot be edited via patch.`,
    params: [
      {
        name: 'announcement_id',
        type: 'string',
        required: true,
        description: `Classroom-assigned identifier of the announcement to update, unique per course. Example: 167869283124.`,
      },
      {
        name: 'course_id',
        type: 'string',
        required: true,
        description: `Identifier of the course the announcement belongs to. This can be either the Classroom-assigned course ID (a numeric string) or an alias (e.g. prefixed with 'd:' for a domain-scoped alias or 'p:' for a project-scoped alias).`,
      },
      {
        name: 'update_mask',
        type: 'string',
        required: true,
        description: `Comma-separated list of announcement field names to update; only fields named here are changed. Google documents text, state, and scheduledTime as the only fields editable via this endpoint. To change assigneeMode, use announcement_modify_assignees instead. This field is required to perform any update. Example: 'text,state'.`,
      },
      {
        name: 'scheduled_time',
        type: 'string',
        required: false,
        description: `RFC3339 UTC timestamp at which Classroom should automatically publish this announcement. Must be included in update_mask (scheduledTime) to take effect, and the announcement must currently be in DRAFT state — Classroom rejects setting a scheduled_time on an already-published announcement ("Scheduled time cannot be set for published coursework"). Example: 2026-09-01T15:00:00.000Z.`,
      },
      {
        name: 'state',
        type: 'string',
        required: false,
        description: `Status of the announcement. PUBLISHED makes it immediately visible to students; DRAFT hides it; DELETED removes it from the stream. Must be included in update_mask (state) to take effect. Example: PUBLISHED.`,
      },
      {
        name: 'text',
        type: 'string',
        required: false,
        description: `New body text of the announcement, shown in the Classroom stream. Must be a valid UTF-8 string of no more than 30,000 characters. Must be included in update_mask (text) to take effect. Example: 'Updated: deadline moved to Monday.'`,
      },
    ],
  },
  {
    name: 'googleclassroom_announcements_list',
    description: `List announcements posted to a Google Classroom course, optionally filtered by state and sorted.
Returns a page of announcements plus a nextPageToken for fetching further pages.
Use this to browse or search announcements in a course; use announcement_get when you already know a specific announcement's ID. Students only ever see PUBLISHED announcements regardless of the filter; teachers and domain administrators see all states.`,
    params: [
      {
        name: 'course_id',
        type: 'string',
        required: true,
        description: `Identifier of the course whose announcements to list. This can be either the Classroom-assigned course ID (a numeric string) or an alias (e.g. prefixed with 'd:' for a domain-scoped alias or 'p:' for a project-scoped alias).`,
      },
      {
        name: 'announcement_states',
        type: 'array',
        required: false,
        description: `Restrict returned announcements to these states. Pass one or more values to include multiple states. If omitted, only PUBLISHED announcements are returned by default. Example: PUBLISHED.`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Sort ordering for results, as a comma-separated list of fields with an optional 'asc' or 'desc' direction keyword. The only supported field is updateTime. If omitted, results are returned in an unspecified order. Example: 'updateTime desc'.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of announcements to return per page. Zero or unspecified lets the server assign a maximum; the server may return fewer than requested. Example: 20.`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `nextPageToken value returned by a previous call to this endpoint, used to fetch the next page of results. Omit to fetch the first page. Example: 'CAoQABoQ'.`,
      },
    ],
  },
  {
    name: 'googleclassroom_course_alias_create',
    description: `Create an alternate identifier (alias) for a Google Classroom course, scoped either to the domain or to the calling project.
Returns the created CourseAlias resource containing the alias string.
Use this to give a course a memorable or system-specific ID you can reference instead of its numeric Classroom ID. Use course_aliases_list to see existing aliases, or course_alias_delete to remove one (which takes the alias string itself, not the course's internal ID).`,
    params: [
      {
        name: 'alias',
        type: 'string',
        required: true,
        description: `The alias string to create, including its scope prefix. Use 'd:' for a domain-scoped alias (e.g. 'd:math_101') or 'p:' for a project-scoped alias (e.g. 'p:abc123'). Domain-scoped aliases are unique within the domain; project-scoped aliases are unique within the project.`,
      },
      {
        name: 'course_id',
        type: 'string',
        required: true,
        description: `Identifier of the course to create the alias for. This can be either the Classroom-assigned numeric course ID or an existing alias for the course.`,
      },
    ],
  },
  {
    name: 'googleclassroom_course_alias_delete',
    description: `Delete an existing alias of a Google Classroom course.
Returns an empty response on success.
Use this to remove an alternate identifier you no longer want to resolve to the course; use course_aliases_list first if you need to look up the exact alias string. Pass the alias itself here (e.g. 'd:math_101'), not the course's Classroom-assigned numeric ID.`,
    params: [
      {
        name: 'alias',
        type: 'string',
        required: true,
        description: `The alias to delete, including its scope prefix ('d:' for domain-scoped or 'p:' for project-scoped). This must be an alias string, not the Classroom-assigned numeric course ID.`,
      },
      {
        name: 'course_id',
        type: 'string',
        required: true,
        description: `Identifier of the course whose alias should be deleted. This can be either the Classroom-assigned numeric course ID or an existing alias for the course.`,
      },
    ],
  },
  {
    name: 'googleclassroom_course_aliases_list',
    description: `List all aliases of a Google Classroom course, paginated.
Returns an array of alias objects (each with an alias string) along with a next-page token when more results exist.
Use this to discover the alias strings you'd pass to course_alias_delete, or to check whether a course already has an alias before creating a new one with course_alias_create.`,
    params: [
      {
        name: 'course_id',
        type: 'string',
        required: true,
        description: `Identifier of the course whose aliases should be listed. This can be either the Classroom-assigned numeric course ID or an existing alias for the course.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of aliases to return. If zero or unspecified, the server may assign a maximum. The server may return fewer than the specified number of results.`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `The nextPageToken value returned from a previous course_aliases_list call, used to retrieve the subsequent page of results. Omit this to fetch the first page.`,
      },
    ],
  },
  {
    name: 'googleclassroom_course_create',
    description: `Create a new course in Google Classroom, adding the specified owner as its teacher.
Returns the created Course resource, including its Classroom-assigned id, current state, and the course details you supplied.
Use this to provision a brand-new class. Use course_patch afterward to change individual fields, or course_get / courses_list to look up existing courses.`,
    params: [
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Name of the course, for example "10th Grade Biology". Required. Must be a valid UTF-8 string between 1 and 750 characters.`,
      },
      {
        name: 'owner_id',
        type: 'string',
        required: true,
        description: `Identifier of the user who owns the course and is added to it as a teacher. Required when creating a course. Accepts a numeric user id, an email address, or the literal string "me" for the requesting user. A non-admin caller can only create a course owned by themselves; domain admins can create courses owned by any user in their domain.`,
      },
      {
        name: 'course_state',
        type: 'string',
        required: false,
        description: `State of the course. One of ACTIVE, ARCHIVED, PROVISIONED, DECLINED, SUSPENDED, or COURSE_STATE_UNSPECIFIED. If omitted, Classroom defaults new courses to PROVISIONED.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional description of the course, for example an overview of what will be covered. If set, must be a valid UTF-8 string no longer than 30,000 characters.`,
      },
      {
        name: 'description_heading',
        type: 'string',
        required: false,
        description: `Optional heading shown above the course description on the course's About page, for example "Welcome to 10th Grade Biology." If set, must be a valid UTF-8 string no longer than 3600 characters.`,
      },
      {
        name: 'id',
        type: 'string',
        required: false,
        description: `Optional alias string to create for this course. The Classroom-assigned numeric id is always assigned automatically and cannot be changed after creation; setting this field additionally registers the alias you provide so the course can also be referenced by it. Use a 'p:' project-scoped prefix for a regular (non-admin) caller — a 'd:' domain-scoped alias can only be created by a domain admin and otherwise fails with a generic 'Precondition check failed' error and no course created.`,
      },
      {
        name: 'levels',
        type: 'string',
        required: false,
        description: `Optional levels for the course, for example "9th grade", "Middle school", "4th - 5th", or "K-2". If set, must be a valid UTF-8 string fewer than 1000 characters. Once set, this field can only be cleared later using course_patch.`,
      },
      {
        name: 'room',
        type: 'string',
        required: false,
        description: `Optional room location for the course, for example "301". If set, must be a valid UTF-8 string no longer than 650 characters.`,
      },
      {
        name: 'section',
        type: 'string',
        required: false,
        description: `Optional section of the course, for example "Period 2". If set, must be a valid UTF-8 string no longer than 2800 characters.`,
      },
      {
        name: 'subject',
        type: 'string',
        required: false,
        description: `Optional subject of the course.`,
      },
    ],
  },
  {
    name: 'googleclassroom_course_delete',
    description: `Permanently delete a course from Google Classroom.
Returns an empty object on success; the course and its data are removed and cannot be recovered.
Use this only when you intend to permanently remove a course. If you just want to hide it from active use without losing data, use course_patch to set courseState to ARCHIVED instead.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Identifier of the course to delete. This can be either the Classroom-assigned course ID (a numeric string) or an alias (e.g. prefixed with 'd:' for a domain-scoped alias or 'p:' for a project-scoped alias).`,
      },
    ],
  },
  {
    name: 'googleclassroom_course_get',
    description: `Retrieve a single Google Classroom course by its Classroom-assigned ID or alias.
Returns the course's name, section, description, room, state, owner ID, enrollment codes, and other course details.
Use this when you already know the course ID or alias; use a list or search tool to find a course otherwise.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Identifier of the course to return. This can be either the Classroom-assigned course ID (a numeric string) or an alias (e.g. prefixed with 'd:' for a domain-scoped alias or 'p:' for a project-scoped alias).`,
      },
    ],
  },
  {
    name: 'googleclassroom_course_get_grading_period_settings',
    description: `Retrieve the grading period settings configured for a course in Google Classroom.
Returns whether grading periods apply to existing coursework (applyToExistingCoursework) and the full ordered list of grading periods (id, title, startDate, endDate) defined for the course.
Use this to inspect the current grading periods before calling course_update_grading_period_settings, since that call replaces the entire grading-periods list.`,
    params: [
      {
        name: 'course_id',
        type: 'string',
        required: true,
        description: `Identifier of the course whose grading period settings to retrieve. This can be either the Classroom-assigned course ID (a numeric string) or an alias.`,
      },
    ],
  },
  {
    name: 'googleclassroom_course_patch',
    description: `Update one or more fields on an existing course in Google Classroom using an explicit field mask (HTTP PATCH).
Returns the updated Course resource; only the fields named in update_mask are changed, everything else is left untouched.
This is the recommended way to change a course — prefer it over course_update, which fully replaces the object and clears anything you omit.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Identifier of the course to update. This can be either the Classroom-assigned course ID (a numeric string) or an alias (e.g. prefixed with 'd:' for a domain-scoped alias or 'p:' for a project-scoped alias).`,
      },
      {
        name: 'update_mask',
        type: 'string',
        required: true,
        description: `Comma-separated list of Course field names to update, in camelCase (e.g. "name,room"). Required — the request fails if this is omitted or contains invalid field names. Valid field names: courseState, description, descriptionHeading, levels, name, ownerId, room, section, subject. Only the fields listed here are changed; supply the corresponding input value for each field you list (leaving a listed field's input blank clears it).`,
      },
      {
        name: 'course_state',
        type: 'string',
        required: false,
        description: `New state of the course. One of ACTIVE, ARCHIVED, PROVISIONED, DECLINED, SUSPENDED, or COURSE_STATE_UNSPECIFIED. Only applied if "courseState" is included in update_mask.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New description of the course, for example an overview of what will be covered. Must be a valid UTF-8 string no longer than 30,000 characters. Only applied if "description" is included in update_mask.`,
      },
      {
        name: 'description_heading',
        type: 'string',
        required: false,
        description: `New heading shown above the course description on the course's About page, for example "Welcome to 10th Grade Biology." Must be a valid UTF-8 string no longer than 3600 characters. Only applied if "descriptionHeading" is included in update_mask.`,
      },
      {
        name: 'levels',
        type: 'string',
        required: false,
        description: `New levels for the course, for example "9th grade", "Middle school", "4th - 5th", or "K-2". Must be a valid UTF-8 string fewer than 1000 characters. Only applied if "levels" is included in update_mask; this is also the only way to clear levels (leave this input blank while including levels in update_mask).`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New name of the course, for example "10th Grade Biology". Must be a valid UTF-8 string between 1 and 750 characters. Only applied if "name" is included in update_mask.`,
      },
      {
        name: 'owner_id',
        type: 'string',
        required: false,
        description: `Identifier of the user to transfer course ownership to. Only domain admins can change this via patch; other callers should leave it unset. Accepts a numeric user id, an email address, or the literal string "me". Only applied if "ownerId" is included in update_mask; the transfer is treated as effective immediately, though propagation to related resources may take time.`,
      },
      {
        name: 'room',
        type: 'string',
        required: false,
        description: `New room location for the course, for example "301". Must be a valid UTF-8 string no longer than 650 characters. Only applied if "room" is included in update_mask.`,
      },
      {
        name: 'section',
        type: 'string',
        required: false,
        description: `New section of the course, for example "Period 2". Must be a valid UTF-8 string no longer than 2800 characters. Only applied if "section" is included in update_mask.`,
      },
      {
        name: 'subject',
        type: 'string',
        required: false,
        description: `New subject of the course. Only applied if "subject" is included in update_mask.`,
      },
    ],
  },
  {
    name: 'googleclassroom_course_update',
    description: `Replace an existing course's editable fields in Google Classroom with a full-object update (HTTP PUT).
Returns the updated Course resource. Any editable field you omit (other than levels) is cleared, because this call replaces the whole set of editable fields rather than merging.
Use course_patch instead for a safer, targeted change to just a few fields via an explicit field mask — that is the recommended way to update a course. Reach for course_update only when you intend to resupply every editable field at once.`,
    params: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: `Identifier of the course to update. This can be either the Classroom-assigned course ID (a numeric string) or an alias (e.g. prefixed with 'd:' for a domain-scoped alias or 'p:' for a project-scoped alias).`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Name of the course, for example "10th Grade Biology". Required on every call to this tool — because UpdateCourse replaces the whole set of editable fields, name must always be supplied even when it isn't changing. Must be a valid UTF-8 string between 1 and 750 characters.`,
      },
      {
        name: 'course_state',
        type: 'string',
        required: false,
        description: `State of the course. One of ACTIVE, ARCHIVED, PROVISIONED, DECLINED, SUSPENDED, or COURSE_STATE_UNSPECIFIED. Omitting this field clears it to the default (PROVISIONED), since this call replaces the whole set of editable fields.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Description of the course, for example an overview of what will be covered. Must be a valid UTF-8 string no longer than 30,000 characters. Omitting this field clears it, since this call replaces the whole set of editable fields.`,
      },
      {
        name: 'description_heading',
        type: 'string',
        required: false,
        description: `Heading shown above the course description on the course's About page, for example "Welcome to 10th Grade Biology." Must be a valid UTF-8 string no longer than 3600 characters. Omitting this field clears it, since this call replaces the whole set of editable fields.`,
      },
      {
        name: 'levels',
        type: 'string',
        required: false,
        description: `Levels for the course, for example "9th grade", "Middle school", "4th - 5th", or "K-2". Must be a valid UTF-8 string fewer than 1000 characters. Unlike the other fields on this tool, levels is NOT cleared if you omit it — the existing value is preserved. Use course_patch instead to explicitly clear levels.`,
      },
      {
        name: 'room',
        type: 'string',
        required: false,
        description: `Room location for the course, for example "301". Must be a valid UTF-8 string no longer than 650 characters. Omitting this field clears it, since this call replaces the whole set of editable fields.`,
      },
      {
        name: 'section',
        type: 'string',
        required: false,
        description: `Section of the course, for example "Period 2". Must be a valid UTF-8 string no longer than 2800 characters. Omitting this field clears it, since this call replaces the whole set of editable fields.`,
      },
      {
        name: 'subject',
        type: 'string',
        required: false,
        description: `Subject of the course. Omitting this field clears it, since this call replaces the whole set of editable fields.`,
      },
    ],
  },
  {
    name: 'googleclassroom_course_update_grading_period_settings',
    description: `Update the grading period settings of a course in Google Classroom using an explicit field mask, adding, removing, or modifying individual grading periods.
Returns the updated GradingPeriodSettings, including the (fully replaced) list of grading periods and the applyToExistingCoursework flag.
Call course_get_grading_period_settings first to see the current periods before crafting your update: when grading_periods is included in update_mask, the entire list is replaced — periods you leave out (by id) are deleted, so re-include any existing period you want to keep unchanged.`,
    params: [
      {
        name: 'course_id',
        type: 'string',
        required: true,
        description: `Identifier of the course whose grading period settings to update. This can be either the Classroom-assigned course ID (a numeric string) or an alias.`,
      },
      {
        name: 'update_mask',
        type: 'string',
        required: true,
        description: `Comma-separated list of GradingPeriodSettings field names to update, in snake_case (e.g. "grading_periods,apply_to_existing_coursework"). Required. Valid field names: grading_periods, apply_to_existing_coursework. When grading_periods is included, the entire gradingPeriods list is replaced by what you provide in grading_periods: periods without an "id" are treated as additions and assigned a new id; existing periods whose id is missing from the list you provide are deleted; periods with an existing id and changed data are edited; an unknown id results in an error.`,
      },
      {
        name: 'apply_to_existing_coursework',
        type: 'boolean',
        required: false,
        description: `Whether to apply grading periods retroactively to existing stream items (coursework, materials, announcements, etc.) already in the course, rather than only to new items. Once set, this value is persisted and does not need to be resent on every future update. Defaults to false if it has never been set before. Only applied if "apply_to_existing_coursework" is included in update_mask.`,
      },
      {
        name: 'grading_periods',
        type: 'string',
        required: false,
        description: `JSON array of GradingPeriod objects that fully replaces the course's existing grading periods. Only applied if "grading_periods" is included in update_mask. Each object has: "title" (string, required, must be unique within the course), "startDate" and "endDate" (each a Date object of the form {"year":YYYY,"month":M,"day":D}, both required and inclusive), and optionally "id" (string) to edit an existing period in place — omit id to create a new period. Grading periods must not have overlapping date ranges and must be listed in chronological order; existing periods whose id you leave out of this array are deleted. See the schema reference for full details.`,
      },
    ],
  },
  {
    name: 'googleclassroom_courses_list',
    description: `List courses in Google Classroom that the requesting user is permitted to view, optionally filtered by teacher, student, or course state.
Returns a page of Course resources (id, name, section, room, state, owner, and other course details) plus a nextPageToken for fetching subsequent pages.
Use this to browse or filter courses; use course_get instead when you already know a specific course's id or alias.`,
    params: [
      {
        name: 'course_states',
        type: 'array',
        required: false,
        description: `Restrict returned courses to those in one or more of these states. If omitted, courses in any state are returned.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of courses to return per page. Zero or unset lets the server assign a default page size; the server may return fewer than requested.`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `Pagination token from a previous call's nextPageToken, used to fetch the next page of results. Must be used with request parameters identical to the call that produced it.`,
      },
      {
        name: 'student_id',
        type: 'string',
        required: false,
        description: `Restrict returned courses to those having a student with this identifier. Accepts a numeric user id, an email address, or the literal string "me". If set, teacher_id must be left empty.`,
      },
      {
        name: 'teacher_id',
        type: 'string',
        required: false,
        description: `Restrict returned courses to those having a teacher with this identifier. Accepts a numeric user id, an email address, or the literal string "me". If set, student_id must be left empty.`,
      },
    ],
  },
  {
    name: 'googleclassroom_coursework_create',
    description: `Create a course work item (assignment, short-answer question, or multiple-choice question) in a Google Classroom course.
Returns the created CourseWork resource with its Classroom-assigned id, state, and timestamps.
Use this to add new work to a course; use coursework_patch to update an existing item afterward, and coursework_get or coursework_list to look up what already exists first.`,
    params: [
      {
        name: 'course_id',
        type: 'string',
        required: true,
        description: `Identifier of the course to add the course work to. This can be either the Classroom-assigned course identifier or an alias.`,
      },
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `Title of this course work. Must be a valid UTF-8 string between 1 and 3000 characters.`,
      },
      {
        name: 'work_type',
        type: 'string',
        required: true,
        description: `Type of this course work: ASSIGNMENT, SHORT_ANSWER_QUESTION, or MULTIPLE_CHOICE_QUESTION. Set at creation time and cannot be changed afterward. MULTIPLE_CHOICE_QUESTION requires multiple_choice_question_json.`,
      },
      {
        name: 'assignee_mode',
        type: 'string',
        required: false,
        description: `Assignee mode of the coursework: ALL_STUDENTS or INDIVIDUAL_STUDENTS. If unspecified, defaults to ALL_STUDENTS. Set to INDIVIDUAL_STUDENTS and provide individual_student_ids to target specific students.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional description of this course work. If set, must be a valid UTF-8 string containing no more than 30,000 characters.`,
      },
      {
        name: 'due_date',
        type: 'object',
        required: false,
        description: `Optional due date (UTC) as an object with year, month, and day integers, e.g. {"year":2026,"month":9,"day":15}. If set, due_time must also be set.`,
      },
      {
        name: 'due_time',
        type: 'object',
        required: false,
        description: `Optional time of day (UTC) that submissions are due, as an object with hours and minutes (and optionally seconds), e.g. {"hours":23,"minutes":59}. If set, due_date must also be set.`,
      },
      {
        name: 'grading_period_id',
        type: 'string',
        required: false,
        description: `Identifier of the grading period associated with the coursework. If unspecified at creation, it is derived from due_date (or scheduled_time if no due_date is set).`,
      },
      {
        name: 'individual_student_ids',
        type: 'array',
        required: false,
        description: `List of student user IDs who should be assigned this coursework. Only used when assignee_mode is INDIVIDUAL_STUDENTS.`,
      },
      {
        name: 'materials_json',
        type: 'string',
        required: false,
        description: `JSON array of Material objects to attach (up to 20). Each item is one of driveFile, youtubeVideo, link, or form, e.g. [{"link":{"url":"https://example.com"}}]. See https://developers.google.com/workspace/classroom/reference/rest/v1/courses.courseWork#Material`,
      },
      {
        name: 'max_points',
        type: 'number',
        required: false,
        description: `Maximum grade for this course work. If zero or unspecified, the assignment is considered ungraded. Must be a non-negative number.`,
      },
      {
        name: 'multiple_choice_question_json',
        type: 'string',
        required: false,
        description: `JSON object with a "choices" array of answer strings, e.g. {"choices":["Option A","Option B"]}. Required when work_type is MULTIPLE_CHOICE_QUESTION. See https://developers.google.com/workspace/classroom/reference/rest/v1/courses.courseWork#MultipleChoiceQuestion`,
      },
      {
        name: 'scheduled_time',
        type: 'string',
        required: false,
        description: `Optional RFC3339 UTC timestamp for when this course work is scheduled to be published.`,
      },
      {
        name: 'state',
        type: 'string',
        required: false,
        description: `Status of this course work: PUBLISHED, DRAFT, or DELETED. If unspecified, defaults to DRAFT.`,
      },
      {
        name: 'submission_modification_mode',
        type: 'string',
        required: false,
        description: `Setting to determine when students may modify submissions: MODIFIABLE_UNTIL_TURNED_IN (default) or MODIFIABLE.`,
      },
      {
        name: 'topic_id',
        type: 'string',
        required: false,
        description: `Identifier for the topic that this coursework is associated with. Must match an existing topic in the course.`,
      },
    ],
  },
  {
    name: 'googleclassroom_coursework_delete',
    description: `Permanently delete a course work item from a Google Classroom course. The request must be made by the same Developer Console project/OAuth client that originally created the item.
Returns an empty response on success; the course work and its association with student submissions are removed.
Use this to remove an item that was created in error; there is no undo. Use coursework_patch with state DELETED first if you only want to soft-remove it from active views while keeping the record.`,
    params: [
      {
        name: 'course_id',
        type: 'string',
        required: true,
        description: `Identifier of the course. This can be either the Classroom-assigned course identifier or an alias.`,
      },
      {
        name: 'coursework_id',
        type: 'string',
        required: true,
        description: `Classroom-assigned identifier of the course work to delete.`,
      },
    ],
  },
  {
    name: 'googleclassroom_coursework_get',
    description: `Retrieve a single course work item (assignment, short-answer question, or multiple-choice question) from a Google Classroom course by its ID.
Returns the CourseWork resource: title, description, work type, state, due date/time, max points, and materials.
Use this when you already know the course work ID; use coursework_list to browse or search for items in a course.`,
    params: [
      {
        name: 'course_id',
        type: 'string',
        required: true,
        description: `Identifier of the course. This can be either the Classroom-assigned course identifier or an alias.`,
      },
      {
        name: 'coursework_id',
        type: 'string',
        required: true,
        description: `Identifier of the course work to return.`,
      },
    ],
  },
  {
    name: 'googleclassroom_coursework_list',
    description: `List course work items in a Google Classroom course, optionally filtered by state and sorted, with pagination.
Returns an array of CourseWork resources plus a nextPageToken for further pages. Students only see PUBLISHED items; teachers and admins see all.
Use this to browse or enumerate a course's assignments and questions; use coursework_get when you already know a specific course work ID.`,
    params: [
      {
        name: 'course_id',
        type: 'string',
        required: true,
        description: `Identifier of the course. This can be either the Classroom-assigned course identifier or an alias.`,
      },
      {
        name: 'course_work_states',
        type: 'array',
        required: false,
        description: `Restrict results to course work with these statuses. If unspecified, only PUBLISHED items are returned. Pass multiple values to include more than one state.`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Comma-separated list of fields to sort by, each optionally followed by 'asc' or 'desc'. Supported fields are updateTime and dueDate. If not specified, updateTime desc is the default (most recently updated first); example: 'dueDate desc,updateTime asc'.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of items to return. Zero or unspecified lets the server choose a maximum; the server may return fewer than requested.`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `The nextPageToken value returned from a previous list call, to fetch the next page of results. The request must otherwise be identical to the one that produced this token.`,
      },
    ],
  },
  {
    name: 'googleclassroom_coursework_material_create',
    description: `Create a new course work material (classwork reference content with no grade) in a Google Classroom course.
Returns the created course work material, including its assigned ID, state, and alternate link.
Use this to publish reference materials like readings, links, or files for students to view; course work materials are never graded, unlike student_submission_* tools which track a specific student's graded work. Use coursework_material_patch to edit it afterward.`,
    params: [
      {
        name: 'course_id',
        type: 'string',
        required: true,
        description: `Identifier of the course to create the course work material in. This identifier can be either the Classroom-assigned identifier or an alias.`,
      },
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `Title of this course work material. Must be a valid UTF-8 string containing between 1 and 3000 characters.`,
      },
      {
        name: 'assignee_mode',
        type: 'string',
        required: false,
        description: `Assignee mode of the course work material: whether it is visible to all students or only to specific individuals. If unspecified, defaults to ALL_STUDENTS.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `Optional description of this course work material. Must be a valid UTF-8 string containing no more than 30,000 characters.`,
      },
      {
        name: 'individual_students_options',
        type: 'string',
        required: false,
        description: `JSON object naming the students with access to this material, used only when assignee_mode is INDIVIDUAL_STUDENTS. Shape: {"studentIds":["<userId1>","<userId2>"]}.`,
      },
      {
        name: 'materials',
        type: 'string',
        required: false,
        description: `JSON array of additional materials to attach (Drive files, links, or YouTube videos). A course work material must have no more than 20 material items. Each item is one of: {"driveFile":{"driveFile":{"id":"<fileId>"},"shareMode":"VIEW"}}, {"link":{"url":"<url>"}}, or {"youtubeVideo":{"id":"<videoId>"}}. Google Forms materials cannot be attached by clients (read-only field).`,
      },
      {
        name: 'scheduled_time',
        type: 'string',
        required: false,
        description: `Optional RFC3339 timestamp when this course work material is scheduled to be published. Only used when state is set to DRAFT and you want a future publish time.`,
      },
      {
        name: 'state',
        type: 'string',
        required: false,
        description: `Status of this course work material. If unspecified, defaults to DRAFT (visible only to teachers). Set to PUBLISHED to make it visible to students immediately.`,
      },
      {
        name: 'topic_id',
        type: 'string',
        required: false,
        description: `Identifier for the topic that this course work material is associated with. Must match an existing topic in the course.`,
      },
    ],
  },
  {
    name: 'googleclassroom_coursework_material_delete',
    description: `Permanently delete a course work material from a Google Classroom course.
Returns an empty response on success.
Use this to remove classwork reference material you no longer want students to see; this cannot be undone. Can only be called by the Developer Console project that originally created the course work material.`,
    params: [
      {
        name: 'course_id',
        type: 'string',
        required: true,
        description: `Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.`,
      },
      {
        name: 'material_id',
        type: 'string',
        required: true,
        description: `Identifier of the course work material to delete. This is a Classroom-assigned identifier.`,
      },
    ],
  },
  {
    name: 'googleclassroom_coursework_material_get',
    description: `Retrieve a single course work material by ID from a Google Classroom course.
Returns its title, description, attached materials, state, assignee mode, and Classroom link.
Use this when you already know the course work material ID; use coursework_materials_list to find one first. This returns ungraded classwork reference content, not a student's graded work — use student_submission_get for that.`,
    params: [
      {
        name: 'course_id',
        type: 'string',
        required: true,
        description: `Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.`,
      },
      {
        name: 'material_id',
        type: 'string',
        required: true,
        description: `Identifier of the course work material to return.`,
      },
    ],
  },
  {
    name: 'googleclassroom_coursework_material_patch',
    description: `Update one or more fields of an existing course work material in a Google Classroom course.
Returns the updated course work material.
Use this to edit fields like title, description, state, or attached materials after coursework_material_create; name the fields you are changing in update_mask. Course work material is never graded, unlike student_submission_patch which sets a specific student's grade.`,
    params: [
      {
        name: 'course_id',
        type: 'string',
        required: true,
        description: `Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.`,
      },
      {
        name: 'material_id',
        type: 'string',
        required: true,
        description: `Identifier of the course work material to update.`,
      },
      {
        name: 'update_mask',
        type: 'string',
        required: true,
        description: `Mask that identifies which fields on the course work material to update. Required to perform an update; the update fails if a named field is not supported. Comma-separated list, e.g. 'title,description'.`,
      },
      {
        name: 'assignee_mode',
        type: 'string',
        required: false,
        description: `Assignee mode of the course work material: whether it is visible to all students or only to specific individuals. Only applied if 'assigneeMode' is included in update_mask.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New description for this course work material. Must be a valid UTF-8 string containing no more than 30,000 characters. Only applied if 'description' is included in update_mask.`,
      },
      {
        name: 'individual_students_options',
        type: 'string',
        required: false,
        description: `JSON object naming the students with access to this material, used only when assignee_mode is INDIVIDUAL_STUDENTS. Shape: {"studentIds":["<userId1>","<userId2>"]}. Only applied if 'individualStudentsOptions' is included in update_mask.`,
      },
      {
        name: 'materials',
        type: 'string',
        required: false,
        description: `JSON array of additional materials to attach (Drive files, links, or YouTube videos), replacing the existing list. Max 20 items. Each item is one of: {"driveFile":{"driveFile":{"id":"<fileId>"},"shareMode":"VIEW"}}, {"link":{"url":"<url>"}}, or {"youtubeVideo":{"id":"<videoId>"}}. Google Forms materials cannot be attached by clients (read-only field). Only applied if 'materials' is included in update_mask.`,
      },
      {
        name: 'scheduled_time',
        type: 'string',
        required: false,
        description: `New RFC3339 timestamp when this course work material is scheduled to be published. Only applied if 'scheduledTime' is included in update_mask.`,
      },
      {
        name: 'state',
        type: 'string',
        required: false,
        description: `New status for this course work material, e.g. PUBLISHED to make it visible to students. Only applied if 'state' is included in update_mask.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `New title for this course work material. Must be a valid UTF-8 string containing between 1 and 3000 characters. Only applied if 'title' is included in update_mask.`,
      },
      {
        name: 'topic_id',
        type: 'string',
        required: false,
        description: `New identifier for the topic this course work material is associated with. Must match an existing topic in the course. Only applied if 'topicId' is included in update_mask.`,
      },
    ],
  },
  {
    name: 'googleclassroom_coursework_materials_list',
    description: `List course work materials in a Google Classroom course, optionally filtered by state or by attached Drive/link content.
Returns each material's ID, title, state, and metadata, plus a page token for more results.
Use this to browse or search classwork reference materials; students only see PUBLISHED materials while teachers and domain administrators see all. Use coursework_material_get when you already know the material ID, or student_submissions_list to see graded student work instead.`,
    params: [
      {
        name: 'course_id',
        type: 'string',
        required: true,
        description: `Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.`,
      },
      {
        name: 'course_work_material_states',
        type: 'array',
        required: false,
        description: `Restriction on which course work material states to return. If unspecified, only items with a state of PUBLISHED are returned.`,
      },
      {
        name: 'material_drive_id',
        type: 'string',
        required: false,
        description: `Optional filter for course work material with at least one Drive material whose file ID matches this string.`,
      },
      {
        name: 'material_link',
        type: 'string',
        required: false,
        description: `Optional filter for course work material with at least one link material whose URL partially matches this string.`,
      },
      {
        name: 'order_by',
        type: 'string',
        required: false,
        description: `Optional sort ordering for results. Comma-separated list of fields with an optional sort direction keyword. Supported field is 'updateTime'; supported directions are 'asc' and 'desc'. If not specified, results are returned in an unspecified order.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of items to return. Zero or unspecified indicates that the server may assign a maximum. The server may return fewer than the specified number of results.`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `The nextPageToken value returned from a previous coursework_materials_list call, used to retrieve the subsequent page of results. Omit this to fetch the first page.`,
      },
    ],
  },
  {
    name: 'googleclassroom_coursework_modify_assignees',
    description: `Change which students a course work item is assigned to: switch between ALL_STUDENTS and INDIVIDUAL_STUDENTS, and add or remove specific students from an individually-assigned item.
Returns the updated CourseWork resource reflecting the new assignee mode and student list.
Use this instead of coursework_patch when you only need to change assignment targeting; only a teacher of the course containing the coursework may call this.`,
    params: [
      {
        name: 'assignee_mode',
        type: 'string',
        required: true,
        description: `Mode of the coursework describing whether it is assigned to all students or specified individual students.`,
      },
      {
        name: 'course_id',
        type: 'string',
        required: true,
        description: `Identifier of the course. This can be either the Classroom-assigned course identifier or an alias.`,
      },
      {
        name: 'coursework_id',
        type: 'string',
        required: true,
        description: `Identifier of the coursework whose assignees are being modified.`,
      },
      {
        name: 'add_student_ids',
        type: 'array',
        required: false,
        description: `Student user IDs to add to the individually-assigned list. Only applied when assignee_mode is INDIVIDUAL_STUDENTS.`,
      },
      {
        name: 'remove_student_ids',
        type: 'array',
        required: false,
        description: `Student user IDs to remove from the individually-assigned list. Only applied when assignee_mode is INDIVIDUAL_STUDENTS.`,
      },
    ],
  },
  {
    name: 'googleclassroom_coursework_patch',
    description: `Update one or more fields of an existing course work item in a Google Classroom course, using an explicit field mask.
Returns the updated CourseWork resource. Only the fields named in update_mask are applied; all other current values are left unchanged.
Use this to change title, description, points, due date, or state on an existing item instead of deleting and recreating it; use coursework_create to add a new item.`,
    params: [
      {
        name: 'course_id',
        type: 'string',
        required: true,
        description: `Identifier of the course. This can be either the Classroom-assigned course identifier or an alias.`,
      },
      {
        name: 'coursework_id',
        type: 'string',
        required: true,
        description: `Identifier of the course work to update.`,
      },
      {
        name: 'update_mask',
        type: 'string',
        required: true,
        description: `Required. Comma-separated list of CourseWork field names to update, e.g. 'title,description,dueDate,maxPoints'. Only fields named here are changed; fields settable to empty values can be cleared by naming them here while leaving the value unset.`,
      },
      {
        name: 'assignee_mode',
        type: 'string',
        required: false,
        description: `New assignee mode: ALL_STUDENTS or INDIVIDUAL_STUDENTS. Include 'assigneeMode' in update_mask to apply.`,
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: `New description of this course work (up to 30,000 UTF-8 characters). Include 'description' in update_mask to apply.`,
      },
      {
        name: 'due_date',
        type: 'object',
        required: false,
        description: `New due date (UTC) as {"year":2026,"month":9,"day":15}. Include 'dueDate' in update_mask to apply.`,
      },
      {
        name: 'due_time',
        type: 'object',
        required: false,
        description: `New due time (UTC) as {"hours":23,"minutes":59}. Include 'dueTime' in update_mask to apply.`,
      },
      {
        name: 'grading_period_id',
        type: 'string',
        required: false,
        description: `New grading period identifier. Include 'gradingPeriodId' in update_mask to apply.`,
      },
      {
        name: 'individual_student_ids',
        type: 'array',
        required: false,
        description: `New list of student user IDs assigned to this coursework, used only when assignee_mode is INDIVIDUAL_STUDENTS. Include 'individualStudentsOptions' in update_mask to apply.`,
      },
      {
        name: 'materials_json',
        type: 'string',
        required: false,
        description: `New JSON array of Material objects (up to 20), replacing the existing materials. See https://developers.google.com/workspace/classroom/reference/rest/v1/courses.courseWork#Material. Include 'materials' in update_mask to apply.`,
      },
      {
        name: 'max_points',
        type: 'number',
        required: false,
        description: `New maximum grade for this course work. Include 'maxPoints' in update_mask to apply.`,
      },
      {
        name: 'multiple_choice_question_json',
        type: 'string',
        required: false,
        description: `New JSON object with a "choices" array of answer strings, e.g. {"choices":["Option A","Option B"]}. Only relevant when work type is MULTIPLE_CHOICE_QUESTION. Include 'multipleChoiceQuestion' in update_mask to apply.`,
      },
      {
        name: 'scheduled_time',
        type: 'string',
        required: false,
        description: `New RFC3339 UTC timestamp for when this course work should be published. Include 'scheduledTime' in update_mask to apply.`,
      },
      {
        name: 'state',
        type: 'string',
        required: false,
        description: `New status: PUBLISHED, DRAFT, or DELETED. Include 'state' in update_mask to apply.`,
      },
      {
        name: 'submission_modification_mode',
        type: 'string',
        required: false,
        description: `New submission modification setting: MODIFIABLE_UNTIL_TURNED_IN or MODIFIABLE. Include 'submissionModificationMode' in update_mask to apply.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `New title for this course work (1-3000 UTF-8 characters). Include 'title' in update_mask to apply.`,
      },
      {
        name: 'topic_id',
        type: 'string',
        required: false,
        description: `New topic identifier for this coursework; must match an existing topic in the course. Include 'topicId' in update_mask to apply.`,
      },
      {
        name: 'work_type',
        type: 'string',
        required: false,
        description: `Course work type. Google Classroom does not allow changing an item's work type after creation; including this field is unlikely to succeed even if named in update_mask.`,
      },
    ],
  },
  {
    name: 'googleclassroom_coursework_rubric_create',
    description: `Create a rubric in Classroom's standalone rubrics sub-collection for a course work item (courseWork/{courseWorkId}/rubrics), addressed afterward by its own rubric ID.
Returns the created Rubric resource including its Classroom-assigned rubric id, criteria, and levels.
Use this to add a rubric via the rubrics sub-collection API; use coursework_update_rubric instead if you mean the single rubric embedded directly on a courseWork item (PATCH .../courseWork/{courseWorkId}/rubric, no sub-collection). Check coursework_rubrics_list first to confirm one doesn't already exist.
The requesting user and course owner must have rubrics creation capabilities.`,
    params: [
      {
        name: 'course_id',
        type: 'string',
        required: true,
        description: `Required. Identifier of the course.`,
      },
      {
        name: 'course_work_id',
        type: 'string',
        required: true,
        description: `Required. Identifier of the course work to create the rubric under.`,
      },
      {
        name: 'criteria_json',
        type: 'string',
        required: false,
        description: `JSON array of Criterion objects defining the rubric. Each criterion has a title, optional description, and a levels array; each level has a title, points, and optional description. Example: [{"title":"Grammar","levels":[{"title":"Excellent","points":10},{"title":"Needs Work","points":5}]}]. Provide this or source_spreadsheet_id. See https://developers.google.com/workspace/classroom/reference/rest/v1/courses.courseWork.rubrics`,
      },
      {
        name: 'source_spreadsheet_id',
        type: 'string',
        required: false,
        description: `Input only. Immutable. Google Sheets ID of a spreadsheet containing formatted rubric settings, used to build the rubric from a spreadsheet instead of inline criteria. Provide this or criteria_json.`,
      },
    ],
  },
  {
    name: 'googleclassroom_coursework_rubric_delete',
    description: `Permanently delete a rubric from Classroom's standalone rubrics sub-collection for a course work item. The requesting user and course owner must have rubrics creation capabilities, and the request must be made by the same Google Cloud console OAuth client that created the rubric.
Returns an empty response on success.
Use this for a rubric addressed by its own rubric ID under .../rubrics/{id}; this does not affect a rubric embedded directly on a courseWork item via coursework_update_rubric. Use coursework_rubrics_list first to find the rubric ID if you don't already have it.`,
    params: [
      {
        name: 'course_id',
        type: 'string',
        required: true,
        description: `Required. Identifier of the course.`,
      },
      {
        name: 'course_work_id',
        type: 'string',
        required: true,
        description: `Required. Identifier of the course work the rubric belongs to.`,
      },
      {
        name: 'rubric_id',
        type: 'string',
        required: true,
        description: `Required. Identifier of the rubric to permanently delete.`,
      },
    ],
  },
  {
    name: 'googleclassroom_coursework_rubric_get',
    description: `Retrieve a single rubric from Classroom's standalone rubrics sub-collection for a course work item, by its rubric ID.
Returns the Rubric resource: id, criteria, levels, and source spreadsheet ID if one was used.
Use this when you already know the rubric ID; use coursework_rubrics_list to find it first. For the rubric embedded directly on a courseWork item instead (no separate rubric ID), fetch it via coursework_get, which returns it inline.`,
    params: [
      {
        name: 'course_id',
        type: 'string',
        required: true,
        description: `Required. Identifier of the course.`,
      },
      {
        name: 'course_work_id',
        type: 'string',
        required: true,
        description: `Required. Identifier of the course work the rubric belongs to.`,
      },
      {
        name: 'rubric_id',
        type: 'string',
        required: true,
        description: `Required. Identifier of the rubric to return.`,
      },
    ],
  },
  {
    name: 'googleclassroom_coursework_rubric_patch',
    description: `Update one or more fields of a rubric in Classroom's standalone rubrics sub-collection for a course work item, using an explicit field mask.
Returns the updated Rubric resource. Only the fields named in update_mask are applied; all other current values are left unchanged.
Use this for a rubric created via coursework_rubric_create (addressed by its own rubric ID under .../rubrics/{id}); use coursework_update_rubric instead for the single rubric embedded directly on a courseWork item (no separate rubric ID in the path).
Rubric update capabilities are limited once grading has started, and the requesting user and course owner must have rubrics creation capabilities.`,
    params: [
      {
        name: 'course_id',
        type: 'string',
        required: true,
        description: `Required. Identifier of the course.`,
      },
      {
        name: 'course_work_id',
        type: 'string',
        required: true,
        description: `Required. Identifier of the course work the rubric belongs to.`,
      },
      {
        name: 'rubric_id',
        type: 'string',
        required: true,
        description: `Required. Identifier of the rubric to update.`,
      },
      {
        name: 'update_mask',
        type: 'string',
        required: true,
        description: `Required. Mask identifying which rubric fields to update, e.g. 'criteria' or 'sourceSpreadsheetId'. The update fails if invalid fields are specified.`,
      },
      {
        name: 'criteria_json',
        type: 'string',
        required: false,
        description: `New JSON array of Criterion objects, replacing the rubric's criteria. Each criterion has a title, optional description, and a levels array; each level has a title, points, and optional description. Example: [{"title":"Grammar","levels":[{"title":"Excellent","points":10}]}]. See https://developers.google.com/workspace/classroom/reference/rest/v1/courses.courseWork.rubrics. Include 'criteria' in update_mask to apply.`,
      },
      {
        name: 'source_spreadsheet_id',
        type: 'string',
        required: false,
        description: `Input only. Immutable. Google Sheets ID of a spreadsheet containing formatted rubric settings, used to replace the rubric from a spreadsheet instead of inline criteria. Include 'sourceSpreadsheetId' in update_mask to apply.`,
      },
    ],
  },
  {
    name: 'googleclassroom_coursework_rubrics_list',
    description: `List rubrics in Classroom's standalone rubrics sub-collection for a course work item, with pagination.
Returns an array of Rubric resources (id, criteria, levels) plus a nextPageToken; at most 1 rubric is returned per page today since Classroom currently supports a single rubric per course work.
Use this to check whether a course work item already has a rubric, or to find its rubric ID before calling coursework_rubric_get, coursework_rubric_patch, or coursework_rubric_delete.`,
    params: [
      {
        name: 'course_id',
        type: 'string',
        required: true,
        description: `Required. Identifier of the course.`,
      },
      {
        name: 'course_work_id',
        type: 'string',
        required: true,
        description: `Required. Identifier of the course work to list rubrics for.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `The maximum number of rubrics to return. If unspecified, at most 1 rubric is returned. The maximum value is 1; values above 1 are coerced down to 1.`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `The nextPageToken value returned from a previous list call, to fetch the next page of results. The request must otherwise be identical to the one that produced this token.`,
      },
    ],
  },
  {
    name: 'googleclassroom_coursework_update_rubric',
    description: `Update the rubric embedded directly on a course work item, using an explicit field mask (PATCH .../courseWork/{courseWorkId}/rubric — no separate rubric ID in the path).
Returns the updated Rubric resource with its criteria and levels.
Use this only for that single embedded rubric on a courseWork item; use coursework_rubric_create, coursework_rubric_get, coursework_rubrics_list, coursework_rubric_patch, and coursework_rubric_delete for Classroom's separate standalone rubrics sub-collection (courseWork/{courseWorkId}/rubrics/{id}), which currently supports at most one rubric per course work but addresses it via an explicit rubric ID in the path rather than implicitly.
Rubric update capabilities are limited once grading has started, and the requesting user and course owner must have rubrics creation capabilities.`,
    params: [
      {
        name: 'course_id',
        type: 'string',
        required: true,
        description: `Required. Identifier of the course.`,
      },
      {
        name: 'course_work_id',
        type: 'string',
        required: true,
        description: `Required. Identifier of the course work whose embedded rubric is being updated.`,
      },
      {
        name: 'update_mask',
        type: 'string',
        required: true,
        description: `Required. Mask identifying which rubric fields to update, e.g. 'criteria' or 'sourceSpreadsheetId'. The update fails if invalid fields are specified.`,
      },
      {
        name: 'criteria_json',
        type: 'string',
        required: false,
        description: `New JSON array of Criterion objects, replacing the rubric's criteria. Each criterion has an id, title, optional description, and a levels array; each level has an id, title, points, and optional description. Example: [{"title":"Grammar","levels":[{"title":"Excellent","points":10},{"title":"Needs Work","points":5}]}]. See https://developers.google.com/workspace/classroom/reference/rest/v1/courses.courseWork.rubrics. Include 'criteria' in update_mask to apply.`,
      },
      {
        name: 'id',
        type: 'string',
        required: false,
        description: `Identifier of the rubric to update. This endpoint does not create a rubric — if the course work has no rubric yet, Google rejects the call with 'Rubric ID is required' when this is omitted. In practice, first create the rubric via coursework_rubric_create (or look it up via coursework_rubric_get / coursework_rubrics_list), then pass its id here to update it.`,
      },
      {
        name: 'source_spreadsheet_id',
        type: 'string',
        required: false,
        description: `Input only. Immutable. Google Sheets ID of a spreadsheet containing formatted rubric settings, used to build or replace the rubric from a spreadsheet instead of inline criteria. Include 'sourceSpreadsheetId' in update_mask to apply.`,
      },
    ],
  },
  {
    name: 'googleclassroom_guardian_delete',
    description: `Revoke an already-linked guardian's access for a student, permanently removing the Guardian resource.
Returns an empty response on success; the guardian will stop receiving notifications and is no longer accessible via the API.
Use this to remove a guardian who is already linked and active; use guardian_invitation_patch instead to cancel a pending invitation that has not yet been accepted, since that is a different resource from an active guardian link.`,
    params: [
      {
        name: 'guardian_id',
        type: 'string',
        required: true,
        description: `The 'id' field from a Guardian resource.`,
      },
      {
        name: 'student_id',
        type: 'string',
        required: true,
        description: `Identifier of the student whose guardian is to be deleted. Can be the student's numeric Classroom identifier, their email address, or the string literal 'me' to refer to the requesting user.`,
      },
    ],
  },
  {
    name: 'googleclassroom_guardian_get',
    description: `Retrieve a single guardian already linked to a student, by guardian ID.
Returns the Guardian record: its guardian ID, the linked student's user ID, and the guardian's profile information.
Use this when you already know a specific guardian's ID; use guardians_list to browse all guardians linked to a student, or guardian_invitation_get instead for a pending invitation that has not yet resulted in a link.`,
    params: [
      {
        name: 'guardian_id',
        type: 'string',
        required: true,
        description: `The 'id' field from a Guardian resource.`,
      },
      {
        name: 'student_id',
        type: 'string',
        required: true,
        description: `Identifier of the student whose guardian is being requested. Can be the student's numeric Classroom identifier, their email address, or the string literal 'me' to refer to the requesting user.`,
      },
    ],
  },
  {
    name: 'googleclassroom_guardian_invitation_create',
    description: `Send a guardian invitation email for a student, asking the recipient to confirm they are the student's guardian.
Returns the created GuardianInvitation record, including its invitation ID and initial PENDING state.
Use this to start linking a new guardian to a student; once the guardian accepts by email, a separate Guardian resource is created automatically. Use guardians_list or guardian_get to see guardians already linked, and guardian_invitations_list or guardian_invitation_get to check a pending invitation's status.`,
    params: [
      {
        name: 'invited_email_address',
        type: 'string',
        required: true,
        description: `Email address to send the guardian invitation to. This field is only visible to domain administrators once the invitation exists.`,
      },
      {
        name: 'student_id',
        type: 'string',
        required: true,
        description: `Identifier of the student the guardian is being invited for. Can be the student's numeric Classroom identifier or their email address.`,
      },
    ],
  },
  {
    name: 'googleclassroom_guardian_invitation_get',
    description: `Retrieve a single guardian invitation for a student by invitation ID.
Returns the GuardianInvitation record: its state (PENDING, COMPLETE, or GUARDIAN_INVITATION_STATE_UNSPECIFIED), the invited email address (domain administrators only), and creation time.
Use this to check the status of one specific pending or historical invitation; use guardian_invitations_list to browse all invitations for a student, or guardian_get/guardians_list instead for guardians that are already linked rather than merely invited.`,
    params: [
      {
        name: 'invitation_id',
        type: 'string',
        required: true,
        description: `The 'id' field of the GuardianInvitation to retrieve.`,
      },
      {
        name: 'student_id',
        type: 'string',
        required: true,
        description: `Identifier of the student whose guardian invitation is being requested. Can be the student's numeric Classroom identifier, their email address, or the string literal 'me' to refer to the requesting user.`,
      },
    ],
  },
  {
    name: 'googleclassroom_guardian_invitation_patch',
    description: `Withdraw a pending guardian invitation by transitioning its state to COMPLETE — the only modification this endpoint supports (there is no API method to accept an invitation on the recipient's behalf).
Returns the updated GuardianInvitation record showing its new COMPLETE state.
Use this to cancel an invitation you sent before the recipient accepts it via email; use guardian_delete instead to revoke an already-linked guardian's access, since that is a different resource from a pending invitation.`,
    params: [
      {
        name: 'invitation_id',
        type: 'string',
        required: true,
        description: `The 'id' field of the GuardianInvitation to modify.`,
      },
      {
        name: 'state',
        type: 'string',
        required: true,
        description: `The new state for the invitation. In practice the only value the API accepts here is COMPLETE, which withdraws a PENDING invitation.`,
      },
      {
        name: 'student_id',
        type: 'string',
        required: true,
        description: `Identifier of the student whose guardian invitation is being modified. Can be the student's numeric Classroom identifier or their email address.`,
      },
    ],
  },
  {
    name: 'googleclassroom_guardian_invitations_list',
    description: `List guardian invitations for a student (or, for domain administrators, across every student they can view using '-'), optionally filtered by invited email address or invitation state, paginated.
Returns an array of GuardianInvitation records — id, invited email (domain administrators only), state, and creation time — plus a next-page token when more results exist.
Use this to browse pending or historical invitation requests; use guardians_list instead to see guardians who have already accepted and are actively linked, not merely invited.`,
    params: [
      {
        name: 'student_id',
        type: 'string',
        required: true,
        description: `Identifier of the student whose guardian invitations to list. Can be the student's numeric Classroom identifier, their email address, the string literal 'me', or '-' to list invitations across every student the requester may view (domain administrators only).`,
      },
      {
        name: 'invited_email_address',
        type: 'string',
        required: false,
        description: `If specified, only return invitations sent to this exact email address.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of invitations to return. Zero or unspecified lets the server assign a maximum; the server may return fewer than requested.`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `The nextPageToken value returned from a previous guardian_invitations_list call, used to retrieve the subsequent page of results. Omit this to fetch the first page.`,
      },
      {
        name: 'states',
        type: 'array',
        required: false,
        description: `If specified, only return invitations with one of these state values. If omitted, only invitations with a state of PENDING are returned.`,
      },
    ],
  },
  {
    name: 'googleclassroom_guardians_list',
    description: `List guardians currently linked to a student (or, for domain administrators, across every student they can view using '-'), optionally filtered by the email address the original invitation was sent to, paginated.
Returns an array of Guardian records — guardian ID, the linked student's user ID, and the guardian's profile info — plus a next-page token when more results exist.
Use this to see guardians who have already accepted and are actively receiving notifications; use guardian_invitations_list instead to see pending or historical invitation requests that have not, or did not, result in a link.`,
    params: [
      {
        name: 'student_id',
        type: 'string',
        required: true,
        description: `Identifier of the student whose guardians to list. Can be the student's numeric Classroom identifier, their email address, the string literal 'me', or '-' to list guardians across every student the requester may view (domain administrators only).`,
      },
      {
        name: 'invited_email_address',
        type: 'string',
        required: false,
        description: `Filter results by the email address that the original invitation was sent to, resulting in this guardian link. This filter can only be used by domain administrators.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of guardians to return. Zero or unspecified lets the server assign a maximum; the server may return fewer than requested.`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `The nextPageToken value returned from a previous guardians_list call, used to retrieve the subsequent page of results. Omit this to fetch the first page.`,
      },
    ],
  },
  {
    name: 'googleclassroom_invitation_accept',
    description: `Accept an invitation, removing it and adding the invited user to the course as a student, teacher, or owner as specified by the invitation.
Returns an empty response on success.
Use this only as the invited user themselves — Classroom rejects the call if made with any other identity's credentials, even the course owner's. Use invitation_delete instead to withdraw an invitation without accepting it.
Must be called using the invited user's own connected Google Classroom identity, not the identity that sent the invitation.`,
    params: [
      {
        name: 'invitation_id',
        type: 'string',
        required: true,
        description: `Identifier of the invitation to accept, as returned by invitation_create or invitations_list. The requesting user's credentials must belong to the user the invitation was addressed to.`,
      },
    ],
  },
  {
    name: 'googleclassroom_invitation_create',
    description: `Invite a user to join a Google Classroom course in a specific role (student, teacher, or owner).
Returns the created Invitation, including its invitation ID, invited user ID, course ID, and role.
Use this for the polite, asynchronous path where the invited user must accept before joining; use student_create or teacher_create instead to add someone directly to the roster without requiring their acceptance.
The invited user must call invitation_accept as themselves to actually join the course; only one invitation may exist per user and course at a time — delete and recreate to change the role.`,
    params: [
      {
        name: 'course_id',
        type: 'string',
        required: true,
        description: `Identifier of the course to invite the user to. This can be either the Classroom-assigned numeric course ID or an alias for the course.`,
      },
      {
        name: 'role',
        type: 'string',
        required: true,
        description: `Role to invite the user to have in the course. Must be one of STUDENT, TEACHER, or OWNER; must not be COURSE_ROLE_UNSPECIFIED.`,
      },
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `Identifier of the invited user. This can be the user's numeric Classroom identifier, their email address, or the string literal 'me' to refer to the requesting user.`,
      },
    ],
  },
  {
    name: 'googleclassroom_invitation_delete',
    description: `Delete an invitation, withdrawing it before the invited user accepts.
Returns an empty response on success.
Use this to cancel a pending invitation, for example to reissue it with a different role; use invitation_accept instead if the invited user actually wants to join the course.`,
    params: [
      {
        name: 'invitation_id',
        type: 'string',
        required: true,
        description: `Identifier of the invitation to delete, as returned by invitation_create or invitations_list.`,
      },
    ],
  },
  {
    name: 'googleclassroom_invitation_get',
    description: `Retrieve a single invitation by its ID.
Returns the invitation's ID, invited user ID, course ID, and role.
Use this when you already know the invitation ID; use invitations_list instead to find an invitation by user or course.`,
    params: [
      {
        name: 'invitation_id',
        type: 'string',
        required: true,
        description: `Identifier of the invitation to return, as returned by invitation_create or invitations_list.`,
      },
    ],
  },
  {
    name: 'googleclassroom_invitations_list',
    description: `List invitations that the requesting user is permitted to view, optionally filtered by user or course, paginated.
Returns an array of invitations (each with its ID, invited user ID, course ID, and role) along with a next-page token when more results exist.
Use this to find an invitation when you don't already have its ID — for example to check whether a user has a pending invitation to a course; use invitation_get instead once you know the specific invitation ID.
At least one of user_id or course_id must be supplied; both may be supplied together to narrow the search.`,
    params: [
      {
        name: 'course_id',
        type: 'string',
        required: false,
        description: `Restrict returned invitations to those for a course with the specified identifier. At least one of user_id or course_id must be supplied.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of invitations to return per page. If zero or unspecified, the server chooses a default page size; a value of 0 is not guaranteed to return the maximum page size. The server may return fewer than the specified number of results.`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `The nextPageToken value returned from a previous invitations_list call, used to retrieve the subsequent page of results. Omit this to fetch the first page. The request must otherwise be identical to the one that produced this token.`,
      },
      {
        name: 'user_id',
        type: 'string',
        required: false,
        description: `Restrict returned invitations to those for a specific user. Can be the user's numeric Classroom identifier, their email address, or the string literal 'me' to refer to the requesting user. At least one of user_id or course_id must be supplied.`,
      },
    ],
  },
  {
    name: 'googleclassroom_registration_create',
    description: `Register a Cloud Pub/Sub topic to start receiving push notifications about roster or coursework changes for a Google Classroom course.
Returns the created Registration, including its server-assigned registration ID and expiry time.
Use this to set up event-driven sync instead of polling for changes; use registration_delete to stop notifications once you no longer need them.
Requires a Cloud Pub/Sub topic you already created, with Classroom's push-notification service account granted Publisher permission on it.`,
    params: [
      {
        name: 'feed_course_id',
        type: 'string',
        required: true,
        description: `Identifier of the course whose changes should be reported. This can be either the Classroom-assigned numeric course ID or an alias for the course. Required for both supported feed types.`,
      },
      {
        name: 'feed_type',
        type: 'string',
        required: true,
        description: `The class of notifications Classroom should deliver. COURSE_ROSTER_CHANGES notifies about students or teachers being added to or removed from the specified course. COURSE_WORK_CHANGES notifies about course work and course work material changes in the specified course.`,
      },
      {
        name: 'topic_name',
        type: 'string',
        required: true,
        description: `Full resource name of the Cloud Pub/Sub topic notifications should be published to, in the form 'projects/{project}/topics/{topic}'. The topic must already exist and Classroom's push-notification service account (classroom-notifications@system.gserviceaccount.com) must have Publisher permission on it. See https://developers.google.com/workspace/classroom/reference/rest/v1/registrations for setup details.`,
      },
    ],
  },
  {
    name: 'googleclassroom_registration_delete',
    description: `Delete a Registration, causing Classroom to stop sending push notifications for it.
Returns an empty response on success.
Use this once you no longer need Cloud Pub/Sub notifications for a course's roster or coursework changes; use registration_create to set one up again with a new (or the same) feed and topic.`,
    params: [
      {
        name: 'registration_id',
        type: 'string',
        required: true,
        description: `The registrationId of the Registration to delete, as returned by registration_create.`,
      },
    ],
  },
  {
    name: 'googleclassroom_student_create',
    description: `Enroll a user as a student of a Google Classroom course, either self-enrolling with the course's enrollment code or being added directly by an authorized user such as a domain administrator.
Returns the created student record, including the user's profile and course ID.
Use this to self-enroll by setting user_id to 'me' (or your own ID) plus the course's enrollment_code, or to add someone directly by setting user_id without an enrollment_code if you have permission to add students to the course. Use teacher_create instead to add someone as a teacher.`,
    params: [
      {
        name: 'course_id',
        type: 'string',
        required: true,
        description: `Identifier of the course to enroll the student in. This can be either the Classroom-assigned numeric course ID or an alias for the course.`,
      },
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `Identifier of the user to add as a student. This can be the user's numeric Classroom identifier, their email address, or the string literal 'me' to refer to the requesting user.`,
      },
      {
        name: 'enrollment_code',
        type: 'string',
        required: false,
        description: `Enrollment code of the course. Required if user_id refers to the requesting user themself (self-enrollment); may be omitted if the requesting user has administrative permission to add students to the course directly.`,
      },
    ],
  },
  {
    name: 'googleclassroom_student_delete',
    description: `Unenroll a student from a Google Classroom course, permanently removing their roster entry.
Returns an empty response on success.
Use this to remove a specific student you already have the user ID for; use students_list first if you need to look up their user ID. Use teacher_delete instead to remove a teacher.`,
    params: [
      {
        name: 'course_id',
        type: 'string',
        required: true,
        description: `Identifier of the course. This can be either the Classroom-assigned numeric course ID or an alias for the course.`,
      },
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `Identifier of the student to delete. This can be the user's numeric Classroom identifier, their email address, or the string literal 'me' to refer to the requesting user.`,
      },
    ],
  },
  {
    name: 'googleclassroom_student_get',
    description: `Retrieve a single student's enrollment record in a Google Classroom course by user ID.
Returns the student's profile, course ID, and Drive folder information for their coursework.
Use this when you already know the student's user ID or email; use students_list to browse or find a student in a course otherwise.`,
    params: [
      {
        name: 'course_id',
        type: 'string',
        required: true,
        description: `Identifier of the course. This can be either the Classroom-assigned numeric course ID or an alias for the course.`,
      },
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `Identifier of the student to return. This can be the user's numeric Classroom identifier, their email address, or the string literal 'me' to refer to the requesting user.`,
      },
    ],
  },
  {
    name: 'googleclassroom_student_group_create',
    description: `Create a student group within a Google Classroom course, used to organize students for purposes such as differentiated assignments.
Returns the created student group's ID, course ID, and title.
Use this to define a new group inside a course; call student_group_member_create afterward to add already-enrolled students to it. Student groups are a course-scoped organizational feature, distinct from course-level enrollment — use student_create to add a student to the course itself, not to a group within it.`,
    params: [
      {
        name: 'course_id',
        type: 'string',
        required: true,
        description: `Identifier of the course to create the student group in. This can be either the Classroom-assigned numeric course ID or an alias for the course.`,
      },
      {
        name: 'title',
        type: 'string',
        required: true,
        description: `The title of the student group, shown to teachers and students in Classroom (e.g. 'Group A' or 'Advanced Readers').`,
      },
      {
        name: 'student_group_id',
        type: 'string',
        required: false,
        description: `Optional client-specified identifier for the new student group. If omitted, Classroom assigns an identifier automatically.`,
      },
    ],
  },
  {
    name: 'googleclassroom_student_group_delete',
    description: `Delete a student group from a Google Classroom course.
Returns an empty object on success.
This removes the group itself, not the students in it — the students remain enrolled in the course. Use student_group_member_delete instead to remove a single student from a group while keeping the group intact.`,
    params: [
      {
        name: 'course_id',
        type: 'string',
        required: true,
        description: `Identifier of the course containing the student group to delete. This can be either the Classroom-assigned numeric course ID or an alias for the course.`,
      },
      {
        name: 'student_group_id',
        type: 'string',
        required: true,
        description: `Identifier of the student group to delete.`,
      },
    ],
  },
  {
    name: 'googleclassroom_student_group_member_create',
    description: `Add an already-enrolled course student as a member of a student group in Google Classroom.
Returns the created student group member object (userId, studentGroupId, courseId).
The user must already be enrolled as a student in the course — use student_create to enroll them in the course first if they aren't yet. Use this only to place an enrolled student into a group (e.g. for differentiated assignments); do not confuse this with student_create, which enrolls a student in the course itself rather than in a group within it.`,
    params: [
      {
        name: 'course_id',
        type: 'string',
        required: true,
        description: `Identifier of the course that contains the student group. This can be either the Classroom-assigned numeric course ID or an alias for the course.`,
      },
      {
        name: 'student_group_id',
        type: 'string',
        required: true,
        description: `Identifier of the student group to add the member to.`,
      },
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `Identifier of the student to add to the group. This can be the user's numeric Classroom identifier, their email address, or the string literal 'me' to refer to the requesting user. The user must already be an enrolled student in the course.`,
      },
    ],
  },
  {
    name: 'googleclassroom_student_group_member_delete',
    description: `Remove a student from a student group in a Google Classroom course.
Returns an empty object on success.
This removes the student from the group only — they remain enrolled in the course. Use student_group_delete instead to remove the entire group, or a course roster tool to unenroll the student from the course itself.`,
    params: [
      {
        name: 'course_id',
        type: 'string',
        required: true,
        description: `Identifier of the course that contains the relevant student group. This can be either the Classroom-assigned numeric course ID or an alias for the course.`,
      },
      {
        name: 'student_group_id',
        type: 'string',
        required: true,
        description: `Identifier of the student group containing the member to remove.`,
      },
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `Identifier of the student group member to delete. This can be the user's numeric Classroom identifier, their email address, or the string literal 'me' to refer to the requesting user.`,
      },
    ],
  },
  {
    name: 'googleclassroom_student_group_members_list',
    description: `List the students who are members of a specific student group within a Google Classroom course, paginated.
Returns an array of student group member objects (userId, studentGroupId, courseId) plus a nextPageToken when more results exist.
Use this to see who's already in a group before adding or removing members with student_group_member_create or student_group_member_delete. This lists group membership only — use course roster tools like student_create to see or manage who's enrolled in the course itself.`,
    params: [
      {
        name: 'course_id',
        type: 'string',
        required: true,
        description: `Identifier of the course that contains the student group. This can be either the Classroom-assigned numeric course ID or an alias for the course.`,
      },
      {
        name: 'student_group_id',
        type: 'string',
        required: true,
        description: `Identifier of the student group whose members should be listed.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of members to return. If zero or unspecified, the server may assign a maximum. The server may return fewer than the specified number of results.`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `The nextPageToken value returned from a previous student_group_members_list call, used to retrieve the subsequent page of results. Omit this to fetch the first page.`,
      },
    ],
  },
  {
    name: 'googleclassroom_student_group_patch',
    description: `Update one or more fields of an existing student group in a Google Classroom course.
Returns the updated student group object.
Requires update_mask naming which field(s) to change; only fields listed there are applied. Use student_groups_list to find the student group's ID first. Student groups are a course-scoped grouping feature (e.g. for differentiated assignments), distinct from course-level enrollment records managed by tools like student_create.`,
    params: [
      {
        name: 'course_id',
        type: 'string',
        required: true,
        description: `Identifier of the course that contains the student group. This can be either the Classroom-assigned numeric course ID or an alias for the course.`,
      },
      {
        name: 'student_group_id',
        type: 'string',
        required: true,
        description: `Identifier of the student group to update.`,
      },
      {
        name: 'update_mask',
        type: 'string',
        required: true,
        description: `Required. Comma-separated list of field names on the student group to update, e.g. 'title'. Only fields named here are changed; the request fails if a field outside this list is specified.`,
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: `New title for the student group. Include 'title' in update_mask for this to take effect.`,
      },
    ],
  },
  {
    name: 'googleclassroom_student_groups_list',
    description: `List the student groups defined within a Google Classroom course, paginated.
Returns an array of student group objects (id, courseId, title) plus a nextPageToken when more results exist.
Use this to discover existing groups and their IDs before patching, deleting, or listing/adding members for one. Student groups organize students within a course (e.g. for differentiated assignments) and are separate from the course's student roster — use roster tools like student_create to manage course-level enrollment instead.`,
    params: [
      {
        name: 'course_id',
        type: 'string',
        required: true,
        description: `Identifier of the course whose student groups should be listed. This can be either the Classroom-assigned numeric course ID or an alias for the course.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of student groups to return. If zero or unspecified, the server may assign a maximum, currently up to 75 items. The server may return fewer than the specified number of results.`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `The nextPageToken value returned from a previous student_groups_list call, used to retrieve the subsequent page of results. Omit this to fetch the first page.`,
      },
    ],
  },
  {
    name: 'googleclassroom_student_submission_get',
    description: `Retrieve a single student's submission for a piece of Google Classroom course work.
Returns the submission's state, grade (assignedGrade/draftGrade), late status, submission content (assignment, short-answer, or multiple-choice), and its Classroom link.
Use this when you already know the course, course work, and submission ID. Use student_submissions_list to find a submission ID first, and coursework_material_get for ungraded classwork material instead.`,
    params: [
      {
        name: 'course_id',
        type: 'string',
        required: true,
        description: `Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.`,
      },
      {
        name: 'course_work_id',
        type: 'string',
        required: true,
        description: `Identifier of the course work that the student submission belongs to.`,
      },
      {
        name: 'submission_id',
        type: 'string',
        required: true,
        description: `Identifier of the student submission to return.`,
      },
    ],
  },
  {
    name: 'googleclassroom_student_submission_modify_attachments',
    description: `Add Drive file, link, or YouTube video attachments to a student's own submission, as the student who owns it.
Returns the updated student submission including its new list of attachments.
Use this to attach materials to a submission before turning it in with student_submission_turn_in; attachments can only be added (never removed) here, a submission may hold at most 20, and this only works for course work with workType ASSIGNMENT. Only the student who owns the submission may call this.`,
    params: [
      {
        name: 'add_attachments',
        type: 'string',
        required: true,
        description: `JSON array of Attachment objects to add to the submission. Each item is one of: {"driveFile":{"id":"<fileId>"}}, {"link":{"url":"<url>"}}, or {"youTubeVideo":{"id":"<videoId>"}}. Form attachments are not supported by this endpoint. A submission may not have more than 20 attachments in total.`,
      },
      {
        name: 'course_id',
        type: 'string',
        required: true,
        description: `Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.`,
      },
      {
        name: 'course_work_id',
        type: 'string',
        required: true,
        description: `Identifier of the course work that the student submission belongs to. This course work's workType must be ASSIGNMENT.`,
      },
      {
        name: 'submission_id',
        type: 'string',
        required: true,
        description: `Identifier of the student submission to add attachments to.`,
      },
    ],
  },
  {
    name: 'googleclassroom_student_submission_patch',
    description: `Set or update the grade on a student submission, as a teacher of the course.
Returns the updated student submission, including its new assignedGrade and/or draftGrade values.
Use this to grade a submission by updating assignedGrade (the final grade visible to the student and their guardians) and/or draftGrade (a pending grade visible only to teachers); name the fields you are setting in update_mask. Use student_submission_return afterward to release the grade to the student.`,
    params: [
      {
        name: 'course_id',
        type: 'string',
        required: true,
        description: `Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.`,
      },
      {
        name: 'course_work_id',
        type: 'string',
        required: true,
        description: `Identifier of the course work that the student submission belongs to.`,
      },
      {
        name: 'submission_id',
        type: 'string',
        required: true,
        description: `Identifier of the student submission to update.`,
      },
      {
        name: 'update_mask',
        type: 'string',
        required: true,
        description: `Mask that identifies which fields on the student submission to update. Required to perform an update; the update fails if a named field is not one of the fields this endpoint supports. Comma-separated list, e.g. 'draftGrade,assignedGrade'.`,
      },
      {
        name: 'assigned_grade',
        type: 'number',
        required: false,
        description: `The final grade for this submission. Must be non-negative; decimal values are allowed but rounded to two decimal places. This is visible to the student and their guardians, and may be modified only by course teachers. Only applied if 'assignedGrade' is included in update_mask.`,
      },
      {
        name: 'draft_grade',
        type: 'number',
        required: false,
        description: `The pending grade for this submission. Must be non-negative; decimal values are allowed but rounded to two decimal places. This is visible only to teachers, not to the student, until it is copied into assignedGrade. Only applied if 'draftGrade' is included in update_mask.`,
      },
    ],
  },
  {
    name: 'googleclassroom_student_submission_reclaim',
    description: `Reclaim a turned-in student submission on behalf of the student who owns it, undoing the turn-in.
Transfers ownership of any Drive files attached to the submission back to the student and updates the submission's state.
Call this only for a submission that has already been turned in but not yet graded or returned, so the student can keep editing it. Only the student who owns the submission may call this. Use student_submission_turn_in to submit it again afterward.`,
    params: [
      {
        name: 'course_id',
        type: 'string',
        required: true,
        description: `Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.`,
      },
      {
        name: 'course_work_id',
        type: 'string',
        required: true,
        description: `Identifier of the course work that the student submission belongs to.`,
      },
      {
        name: 'submission_id',
        type: 'string',
        required: true,
        description: `Identifier of the student submission to reclaim. This submission must have already been turned in.`,
      },
    ],
  },
  {
    name: 'googleclassroom_student_submission_return',
    description: `Return a graded student submission to the student, as a teacher of the course.
Transfers ownership of any Drive files attached to the submission back to the student and may update the submission's state; does not copy draftGrade into assignedGrade.
Call this after grading with student_submission_patch to release the submission and hand attachments back to the student. Only a teacher of the course containing the submission may call this.`,
    params: [
      {
        name: 'course_id',
        type: 'string',
        required: true,
        description: `Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.`,
      },
      {
        name: 'course_work_id',
        type: 'string',
        required: true,
        description: `Identifier of the course work that the student submission belongs to.`,
      },
      {
        name: 'submission_id',
        type: 'string',
        required: true,
        description: `Identifier of the student submission to return to the student.`,
      },
    ],
  },
  {
    name: 'googleclassroom_student_submission_turn_in',
    description: `Turn in a student submission for grading, as the student who owns it.
Transfers ownership of any attached Drive files to the teacher and updates the submission's state to TURNED_IN.
Call this once the student has finished their work and it is ready for the teacher to grade. Only the student that owns the submission may call this. Use student_submission_reclaim to undo this before the teacher grades or returns it.`,
    params: [
      {
        name: 'course_id',
        type: 'string',
        required: true,
        description: `Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.`,
      },
      {
        name: 'course_work_id',
        type: 'string',
        required: true,
        description: `Identifier of the course work that the student submission belongs to.`,
      },
      {
        name: 'submission_id',
        type: 'string',
        required: true,
        description: `Identifier of the student submission to turn in.`,
      },
    ],
  },
  {
    name: 'googleclassroom_student_submissions_list',
    description: `List student submissions for a piece of Google Classroom course work, or across all course work in a course.
Returns each submission's ID, state, grade, late status, and submission content, plus a page token for more results.
Use this to browse or filter submissions by state, lateness, or student; pass '-' as course_work_id to list submissions across all course work in the course. Students only see their own submissions; teachers and domain administrators see all. Use student_submission_get when you already know the submission ID.`,
    params: [
      {
        name: 'course_id',
        type: 'string',
        required: true,
        description: `Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.`,
      },
      {
        name: 'course_work_id',
        type: 'string',
        required: true,
        description: `Identifier of the course work to request submissions for. Set this to the literal string '-' to request student work for all course work in the specified course.`,
      },
      {
        name: 'late',
        type: 'string',
        required: false,
        description: `Requested lateness value. If specified, returned student submissions are restricted to this value. If unspecified, submissions are returned regardless of lateness.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of items to return. Zero or unspecified indicates that the server may assign a maximum. The server may return fewer than the specified number of results.`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `The nextPageToken value returned from a previous student_submissions_list call, used to retrieve the subsequent page of results. Omit this to fetch the first page.`,
      },
      {
        name: 'states',
        type: 'array',
        required: false,
        description: `Requested submission states. If specified, returned student submissions match one of the specified submission states.`,
      },
      {
        name: 'user_id',
        type: 'string',
        required: false,
        description: `Optional argument to restrict returned student work to the student with this identifier. Can be the numeric Classroom user identifier or the string literal 'me' for the requesting user.`,
      },
    ],
  },
  {
    name: 'googleclassroom_students_list',
    description: `List the students of a Google Classroom course that the requester is permitted to view, paginated.
Returns an array of student records (profile, user ID) along with a next-page token when more results exist.
Use this to browse or search a course's roster; use student_get instead when you already know a specific student's user ID.`,
    params: [
      {
        name: 'course_id',
        type: 'string',
        required: true,
        description: `Identifier of the course. This can be either the Classroom-assigned numeric course ID or an alias for the course.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of students to return. Defaults to 30 if unspecified or zero. The server may return fewer than the specified number of results.`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `The nextPageToken value returned from a previous students_list call, used to retrieve the subsequent page of results. Omit this to fetch the first page.`,
      },
    ],
  },
  {
    name: 'googleclassroom_teacher_create',
    description: `Add a user as a teacher of a Google Classroom course, as an authorized user (e.g. a domain administrator) directly adding them by user ID.
Returns the created teacher record, including the user's profile and course ID.
Use this when you already know the target user's ID or email and have domain-administrator permission to add them directly; non-admin users inviting a colleague should send an Invitation instead. Use student_create instead to enroll someone as a student.`,
    params: [
      {
        name: 'course_id',
        type: 'string',
        required: true,
        description: `Identifier of the course to add the teacher to. This can be either the Classroom-assigned numeric course ID or an alias for the course.`,
      },
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `Identifier of the user to add as a teacher. This can be the user's numeric Classroom identifier, their email address, or the string literal 'me' to refer to the requesting user.`,
      },
    ],
  },
  {
    name: 'googleclassroom_teacher_delete',
    description: `Remove a teacher from a Google Classroom course. The primary teacher of a course cannot be removed this way.
Returns an empty response on success.
Use this to remove a specific teacher you already have the user ID for; use teachers_list first if you need to look up their user ID. Use student_delete instead to remove a student.`,
    params: [
      {
        name: 'course_id',
        type: 'string',
        required: true,
        description: `Identifier of the course. This can be either the Classroom-assigned numeric course ID or an alias for the course.`,
      },
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `Identifier of the teacher to delete. This can be the user's numeric Classroom identifier, their email address, or the string literal 'me' to refer to the requesting user. This cannot be the course's primary teacher.`,
      },
    ],
  },
  {
    name: 'googleclassroom_teacher_get',
    description: `Retrieve a single teacher's record in a Google Classroom course by user ID.
Returns the teacher's profile and course ID.
Use this when you already know the teacher's user ID or email; use teachers_list to browse or find a teacher in a course otherwise.`,
    params: [
      {
        name: 'course_id',
        type: 'string',
        required: true,
        description: `Identifier of the course. This can be either the Classroom-assigned numeric course ID or an alias for the course.`,
      },
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `Identifier of the teacher to return. This can be the user's numeric Classroom identifier, their email address, or the string literal 'me' to refer to the requesting user.`,
      },
    ],
  },
  {
    name: 'googleclassroom_teachers_list',
    description: `List the teachers of a Google Classroom course that the requester is permitted to view, paginated.
Returns an array of teacher records (profile, user ID) along with a next-page token when more results exist.
Use this to browse a course's teaching staff; use teacher_get instead when you already know a specific teacher's user ID.`,
    params: [
      {
        name: 'course_id',
        type: 'string',
        required: true,
        description: `Identifier of the course. This can be either the Classroom-assigned numeric course ID or an alias for the course.`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of teachers to return. Defaults to 30 if unspecified or zero. The server may return fewer than the specified number of results.`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `The nextPageToken value returned from a previous teachers_list call, used to retrieve the subsequent page of results. Omit this to fetch the first page.`,
      },
    ],
  },
  {
    name: 'googleclassroom_topic_create',
    description: `Create a new topic (organizational label) in a Google Classroom course.
Returns the created topic, including its Classroom-assigned topic ID.
Use this to add a new category for grouping coursework and announcements in the stream; topics are labels used to organize content, distinct from announcements which are the stream posts themselves. Fails if a topic with the same name already exists in the course.`,
    params: [
      {
        name: 'course_id',
        type: 'string',
        required: true,
        description: `Identifier of the course to create the topic in. This can be either the Classroom-assigned course ID (a numeric string) or an alias (e.g. prefixed with 'd:' for a domain-scoped alias or 'p:' for a project-scoped alias).`,
      },
      {
        name: 'name',
        type: 'string',
        required: true,
        description: `Name of the topic, as shown to users. Leading and trailing whitespace is trimmed and internal runs of whitespace are collapsed to one space; the result must be non-empty and no more than 100 characters. Example: 'Unit 1: Introduction'.`,
      },
    ],
  },
  {
    name: 'googleclassroom_topic_delete',
    description: `Permanently delete a topic from a Google Classroom course.
Returns an empty response on success.
Use this to remove a topic that is no longer needed for organizing coursework; this cannot be undone. Use topic_get first if you need to confirm the topic's details before deleting it.`,
    params: [
      {
        name: 'course_id',
        type: 'string',
        required: true,
        description: `Identifier of the course the topic belongs to. This can be either the Classroom-assigned course ID (a numeric string) or an alias (e.g. prefixed with 'd:' for a domain-scoped alias or 'p:' for a project-scoped alias).`,
      },
      {
        name: 'topic_id',
        type: 'string',
        required: true,
        description: `Classroom-assigned identifier of the topic to delete. Example: 167882111234.`,
      },
    ],
  },
  {
    name: 'googleclassroom_topic_get',
    description: `Retrieve a single topic from a Google Classroom course by its ID.
Returns the topic's name and last-updated timestamp.
Use this when you already know the topic's ID; use topics_list to browse or find topics in a course.`,
    params: [
      {
        name: 'course_id',
        type: 'string',
        required: true,
        description: `Identifier of the course the topic belongs to. This can be either the Classroom-assigned course ID (a numeric string) or an alias (e.g. prefixed with 'd:' for a domain-scoped alias or 'p:' for a project-scoped alias).`,
      },
      {
        name: 'topic_id',
        type: 'string',
        required: true,
        description: `Classroom-assigned identifier of the topic to retrieve. Example: 167882111234.`,
      },
    ],
  },
  {
    name: 'googleclassroom_topic_patch',
    description: `Update the name of an existing Google Classroom topic.
Returns the updated topic, reflecting only the fields named in update_mask.
Use this for partial edits instead of recreating the topic with topic_create; requires the topic to already exist and to have been created by this app's OAuth client. Fails if another topic in the course already has the target name.`,
    params: [
      {
        name: 'course_id',
        type: 'string',
        required: true,
        description: `Identifier of the course the topic belongs to. This can be either the Classroom-assigned course ID (a numeric string) or an alias (e.g. prefixed with 'd:' for a domain-scoped alias or 'p:' for a project-scoped alias).`,
      },
      {
        name: 'topic_id',
        type: 'string',
        required: true,
        description: `Classroom-assigned identifier of the topic to update. Example: 167882111234.`,
      },
      {
        name: 'update_mask',
        type: 'string',
        required: true,
        description: `Comma-separated list of topic field names to update; only fields named here are changed. The only editable field is name. This field is required to perform any update. Example: 'name'.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `New name for the topic, as shown to users. Leading and trailing whitespace is trimmed and internal runs of whitespace are collapsed to one space; the result must be non-empty and no more than 100 characters. Must be included in update_mask (name) to take effect. Example: 'Unit 1: Introduction'.`,
      },
    ],
  },
  {
    name: 'googleclassroom_topics_list',
    description: `List the topics in a Google Classroom course that the requester is permitted to view.
Returns a page of topics plus a nextPageToken for fetching further pages.
Use this to browse or discover topics available for organizing coursework and announcements; use topic_get when you already know a specific topic's ID.`,
    params: [
      {
        name: 'course_id',
        type: 'string',
        required: true,
        description: `Identifier of the course whose topics to list. This can be either the Classroom-assigned course ID (a numeric string) or an alias (e.g. prefixed with 'd:' for a domain-scoped alias or 'p:' for a project-scoped alias).`,
      },
      {
        name: 'page_size',
        type: 'integer',
        required: false,
        description: `Maximum number of topics to return per page. Zero or unspecified lets the server assign a maximum; the server may return fewer than requested. Example: 20.`,
      },
      {
        name: 'page_token',
        type: 'string',
        required: false,
        description: `nextPageToken value returned by a previous call to this endpoint, used to fetch the next page of results. Omit to fetch the first page. Example: 'CAoQABoQ'.`,
      },
    ],
  },
  {
    name: 'googleclassroom_user_profile_get',
    description: `Retrieve a single user's Google Classroom profile by numeric ID, email address, or 'me'.
Returns the user's name, email address (if the profile-emails scope is granted), profile photo URL, and permissions.
Use this to look up a specific person's identity details; use students_list or teachers_list instead to see who is enrolled in a course, since those return enrollment records rather than full profiles.`,
    params: [
      {
        name: 'user_id',
        type: 'string',
        required: true,
        description: `Identifier of the profile to return. Can be the user's numeric Classroom identifier, their email address, or the string literal 'me' to refer to the requesting user.`,
      },
    ],
  },
]
