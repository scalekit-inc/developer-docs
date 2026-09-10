import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'smartlingmcp_smartling_add_issue_comment',
    description: `Post a new comment on an issue.

# Use cases
- Reply to a translator question
- Add additional context to a flagged issue

# Examples
- project_id="p1", issue_uid="i1", comment_text="Use the formal 'vous' form here"`,
    params: [
      {
        name: 'comment_text',
        type: 'string',
        required: true,
        description: `Comment body text (1–4000 chars)`,
      },
      { name: 'issue_uid', type: 'string', required: true, description: `The issue UID` },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The Smartling project UID`,
      },
    ],
  },
  {
    name: 'smartlingmcp_smartling_add_strings_to_job',
    description: `Add strings to an existing Smartling job by their hashcodes.

# What are string hashcodes?
String hashcodes are unique identifiers for translatable strings in Smartling. Each string in your project has a unique hashcode that can be used to reference it in various operations.

# Use cases
- User wants to add specific strings to a translation job
- User needs to include additional content in an existing job
- User wants to move strings from one job to another (when move_enabled=true)
- User needs to add strings for specific target locales only

# Examples
- Add strings to job: Provide project_id, job_uid, and array of hashcodes
- Add with specific locales: Include target_locale_ids to add strings for specific languages only
- Move strings between jobs: Set move_enabled=true to move strings from other jobs

# Parameters
- hashcodes: Array of string hashcodes to add to the job
- target_locale_ids: (Optional) Specific target locales to add strings for
- move_enabled: (Optional) Whether to move strings from other jobs if they exist elsewhere`,
    params: [
      {
        name: 'hashcodes',
        type: 'array',
        required: true,
        description: `Array of string hashcodes to add to the job. Each hashcode uniquely identifies a translatable string.`,
      },
      {
        name: 'job_uid',
        type: 'string',
        required: true,
        description: `The unique identifier of the job to add strings to (e.g., "job-uid-123", "translation-job-456")`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Smartling project (e.g., "project-123", "abc123def456")`,
      },
      {
        name: 'move_enabled',
        type: 'boolean',
        required: false,
        description: `(Optional) Whether to move strings from other jobs if they already exist elsewhere. Default is false.`,
      },
      {
        name: 'target_locale_ids',
        type: 'array',
        required: false,
        description: `(Optional) Array of target locale IDs to add strings for. If not provided, strings will be added for all job target locales. Example: ["es", "fr", "de"]`,
      },
    ],
  },
  {
    name: 'smartlingmcp_smartling_add_tags_to_strings',
    description: `Add tags to strings in a Smartling project.

# Use cases
- Categorize subsets of your content in a Project for quick and easy filtering

# Examples
- Add tags to mark strings for a specific release: tags=["v2.1", "new-feature"]
- Tag strings by component: tags=["navigation", "header"]
- Mark strings for review: tags=["needs-review", "high-priority"]

# Parameters
- project_id: The unique identifier of the Smartling project
- tags: Array of tag strings to add (max 100 tags, each max 128 characters)
- string_hashcodes: Array of string hashcodes to tag (max 1000 hashcodes)`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Smartling project (e.g., "project-123", "abc123def456")`,
      },
      {
        name: 'string_hashcodes',
        type: 'array',
        required: true,
        description: `Array of string hashcodes to add tags to. Maximum 1000 string hashcodes can be processed at once.`,
      },
      {
        name: 'tags',
        type: 'array',
        required: true,
        description: `Array of tag strings to add to the strings. Each tag must be 128 characters or less, and maximum 100 tags can be added at once.`,
      },
    ],
  },
  {
    name: 'smartlingmcp_smartling_authorize_job',
    description: `Authorize a Smartling job to begin translation work with optional locale workflow assignments.

# What does job authorization mean?
Job authorization moves a job from "AWAITING_AUTHORIZATION" status to "IN_PROGRESS" status, allowing translators to begin working on the content. This is a critical step in the translation workflow.

# Use cases
- User has prepared a job with all necessary strings and is ready to begin translation
- User wants to start the translation process for a completed job setup
- User needs to move a job from draft/preparation phase to active translation
- User wants to trigger translator notifications and workflow assignment
- User needs to assign specific workflows to target locales during authorization

# Examples
- Basic authorization: Provide project_id and job_uid to authorize the job
- Authorization with locale workflows: Include locale_workflows to assign specific workflows to target locales
- Start translation work: Once authorized, the job becomes available to translators
- Workflow activation: Authorization triggers any configured workflow assignments

# Locale Workflows
- Optional parameter to assign specific workflows to target locales
- Each entry maps a target locale to a specific workflow UID
- Format: [{"target_locale_id": "es-ES", "workflow_uid": "workflow-123"}]
- Useful for assigning different translation workflows to different languages

# Important Notes
- Jobs must be in "AWAITING_AUTHORIZATION" status to be authorized
- Once authorized, jobs typically cannot be moved back to unauthorized status
- Authorization may trigger notifications to assigned translators or project managers
- Locale workflows are optional and will use project defaults if not specified`,
    params: [
      {
        name: 'job_uid',
        type: 'string',
        required: true,
        description: `The unique identifier of the job to authorize (e.g., "job-uid-123", "translation-job-456")`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Smartling project (e.g., "project-123", "abc123def456")`,
      },
      {
        name: 'locale_workflows',
        type: 'array',
        required: false,
        description: `(Optional) Array of locale-workflow mappings to assign specific workflows to target locales during authorization. Example: [{"target_locale_id": "es-ES", "workflow_uid": "workflow-123"}]`,
      },
    ],
  },
  {
    name: 'smartlingmcp_smartling_count_account_issues',
    description: `Count issues across all projects in the current Smartling account (with optional project narrowing). The account is taken from the MCP token credentials.

# Use cases
- Show a global issue badge for the user

# Examples
- All open: issue_state_codes=["OPENED"]`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `Account UID. Call smartling_get_available_accounts_for_current_user first to retrieve it.`,
      },
      {
        name: 'answered',
        type: 'boolean',
        required: false,
        description: `Filter by answered state`,
      },
      {
        name: 'assignee_user_uid',
        type: 'string',
        required: false,
        description: `Filter to issues assigned to this user (max 12 chars)`,
      },
      {
        name: 'created_date_after',
        type: 'string',
        required: false,
        description: `ISO 8601 timestamp; include issues created after this date`,
      },
      {
        name: 'created_date_before',
        type: 'string',
        required: false,
        description: `ISO 8601 timestamp; include issues created before this date`,
      },
      {
        name: 'has_comments',
        type: 'boolean',
        required: false,
        description: `Filter by whether the issue has comments`,
      },
      {
        name: 'issue_numbers',
        type: 'array',
        required: false,
        description: `Filter by specific issue numbers (max 1000)`,
      },
      {
        name: 'issue_severity_level_codes',
        type: 'array',
        required: false,
        description: `Filter by severity (LOW, MEDIUM, HIGH)`,
      },
      {
        name: 'issue_state_codes',
        type: 'array',
        required: false,
        description: `Filter by state (OPENED, RESOLVED)`,
      },
      {
        name: 'issue_sub_type_codes',
        type: 'array',
        required: false,
        description: `Filter by sub-type (CLARIFICATION, MISSPELLING, etc.)`,
      },
      {
        name: 'issue_type_codes',
        type: 'array',
        required: false,
        description: `Filter by type (SOURCE, TRANSLATION)`,
      },
      {
        name: 'issue_watching_state_code',
        type: 'string',
        required: false,
        description: `Filter by current user's watching state`,
      },
      {
        name: 'job_filter',
        type: 'object',
        required: false,
        description: `Filter by job containment`,
      },
      {
        name: 'project_ids',
        type: 'array',
        required: false,
        description: `Optional: limit to specific project UIDs`,
      },
      {
        name: 'reopened',
        type: 'boolean',
        required: false,
        description: `Filter by reopened state`,
      },
      {
        name: 'reported_by_user_uid',
        type: 'string',
        required: false,
        description: `Filter to issues reported by this user (max 12 chars)`,
      },
      {
        name: 'resolved_date_after',
        type: 'string',
        required: false,
        description: `ISO 8601 timestamp; include issues resolved after this date`,
      },
      {
        name: 'resolved_date_before',
        type: 'string',
        required: false,
        description: `ISO 8601 timestamp; include issues resolved before this date`,
      },
      {
        name: 'string_filter',
        type: 'object',
        required: false,
        description: `Filter by string properties`,
      },
    ],
  },
  {
    name: 'smartlingmcp_smartling_count_project_issues',
    description: `Count issues within a single Smartling project matching the given filters.

# Use cases
- Display a badge of how many open issues a project has
- Sanity-check filter shape before running a full find

# Examples
- Count all open issues: project_id="p1", issue_state_codes=["OPENED"]`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The Smartling project UID`,
      },
      {
        name: 'answered',
        type: 'boolean',
        required: false,
        description: `Filter by answered state`,
      },
      {
        name: 'assignee_user_uid',
        type: 'string',
        required: false,
        description: `Filter to issues assigned to this user (max 12 chars)`,
      },
      {
        name: 'created_date_after',
        type: 'string',
        required: false,
        description: `ISO 8601 timestamp; include issues created after this date`,
      },
      {
        name: 'created_date_before',
        type: 'string',
        required: false,
        description: `ISO 8601 timestamp; include issues created before this date`,
      },
      {
        name: 'has_comments',
        type: 'boolean',
        required: false,
        description: `Filter by whether the issue has comments`,
      },
      {
        name: 'issue_numbers',
        type: 'array',
        required: false,
        description: `Filter by specific issue numbers (max 1000)`,
      },
      {
        name: 'issue_severity_level_codes',
        type: 'array',
        required: false,
        description: `Filter by severity (LOW, MEDIUM, HIGH)`,
      },
      {
        name: 'issue_state_codes',
        type: 'array',
        required: false,
        description: `Filter by state (OPENED, RESOLVED)`,
      },
      {
        name: 'issue_sub_type_codes',
        type: 'array',
        required: false,
        description: `Filter by sub-type (CLARIFICATION, MISSPELLING, etc.)`,
      },
      {
        name: 'issue_type_codes',
        type: 'array',
        required: false,
        description: `Filter by type (SOURCE, TRANSLATION)`,
      },
      {
        name: 'issue_watching_state_code',
        type: 'string',
        required: false,
        description: `Filter by current user's watching state`,
      },
      {
        name: 'job_filter',
        type: 'object',
        required: false,
        description: `Filter by job containment`,
      },
      {
        name: 'reopened',
        type: 'boolean',
        required: false,
        description: `Filter by reopened state`,
      },
      {
        name: 'reported_by_user_uid',
        type: 'string',
        required: false,
        description: `Filter to issues reported by this user (max 12 chars)`,
      },
      {
        name: 'resolved_date_after',
        type: 'string',
        required: false,
        description: `ISO 8601 timestamp; include issues resolved after this date`,
      },
      {
        name: 'resolved_date_before',
        type: 'string',
        required: false,
        description: `ISO 8601 timestamp; include issues resolved before this date`,
      },
      {
        name: 'string_filter',
        type: 'object',
        required: false,
        description: `Filter by string properties`,
      },
    ],
  },
  {
    name: 'smartlingmcp_smartling_create_issue',
    description: `Create a new string issue (question, clarification, quality flag) on a Smartling string.

# Use cases
- Translator flags an ambiguous source string with a CLARIFICATION sub-type
- QA raises a POOR_TRANSLATION issue against a translation
- PM creates a CUSTOM source issue with a HIGH severity assignment

# Examples
- Minimal: project_id, issue_text, issue_type=TRANSLATION, issue_sub_type=CLARIFICATION, string={hashcode, locale_id}
- With assignee + severity: also pass assignee_user_uid and issue_severity_level=HIGH`,
    params: [
      {
        name: 'issue_sub_type',
        type: 'string',
        required: true,
        description: `Issue sub-type (CLARIFICATION, MISSPELLING, POOR_TRANSLATION, DOES_NOT_FIT_SPACE, PLACEHOLDER_ISSUE, REVIEW_TRANSLATION, CUSTOM, MT_ERROR)`,
      },
      {
        name: 'issue_text',
        type: 'string',
        required: true,
        description: `Issue body text (1–4000 chars)`,
      },
      {
        name: 'issue_type',
        type: 'string',
        required: true,
        description: `Issue type: SOURCE or TRANSLATION`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The Smartling project UID`,
      },
      {
        name: 'string',
        type: 'object',
        required: true,
        description: `The string this issue is attached to`,
      },
      {
        name: 'assignee_user_uid',
        type: 'string',
        required: false,
        description: `Optional: user UID to assign the issue to (max 12 chars)`,
      },
      {
        name: 'issue_severity_level',
        type: 'string',
        required: false,
        description: `Optional: severity (LOW, MEDIUM, HIGH)`,
      },
    ],
  },
  {
    name: 'smartlingmcp_smartling_create_job',
    description: `Create Smartling job.

# Use cases
- User needs to create jobs with specific parameters

# Job Details Response
The response includes detailed job information:
- Callback method and URL configuration
- Creation and modification user details
- Custom field values
- Complete job metadata and timestamps`,
    params: [
      { name: 'job_name', type: 'string', required: true, description: `Name of the job` },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Smartling project (e.g., "project-123", "abc123def456")`,
      },
      {
        name: 'target_locale_ids',
        type: 'array',
        required: true,
        description: `Array of target locale IDs for translation`,
      },
      {
        name: 'callback_method',
        type: 'string',
        required: false,
        description: `Callback method configuration (GET, POST, etc.)`,
      },
      {
        name: 'callback_url',
        type: 'string',
        required: false,
        description: `Callback URL for job notifications`,
      },
      {
        name: 'custom_fields',
        type: 'array',
        required: false,
        description: `Array of custom field values for the job`,
      },
      { name: 'description', type: 'string', required: false, description: `Job description` },
      {
        name: 'due_date',
        type: 'string',
        required: false,
        description: `Due date for job completion`,
      },
      {
        name: 'reference_number',
        type: 'string',
        required: false,
        description: `Reference number for the job`,
      },
    ],
  },
  {
    name: 'smartlingmcp_smartling_create_strings',
    description: `Create strings in a Smartling project and poll until completion.

# What are strings in Smartling?
Strings are individual pieces of text content that need to be translated. Each string has a unique identifier (hashcode) and can contain metadata like instructions, format specifications, and variant information.

# Use cases
- Create new translatable content in a Smartling project
- Upload strings with specific formatting requirements
- Add strings with translation instructions and context
- Bulk create strings for translation workflows

# Examples
- Create simple strings: strings=[{"string_text": "Hello World"}]
- Create strings with variants: strings=[{"string_text": "Submit", "variant": "button.submit"}]
- Create strings with instructions: strings=[{"string_text": "Click here", "instruction": "This is a call-to-action button"}]
- Create strings with formatting: strings=[{"string_text": "<b>Bold text</b>", "format": "html"}]

# Parameters
- project_id: The unique identifier of the Smartling project
- namespace: (Optional) Namespace to organize strings
- placeholder_format: (Optional) Format for placeholders (e.g., "java", "python", "c", "resx", "yaml")
- placeholder_format_custom: (Optional) Custom regex pattern for placeholders
- strings: Array of string objects to create (max 100 strings per request)

# String Object Properties
- string_text: The actual text content (required)
- variant: (Optional) Unique identifier/key for the string
- callback_url: (Optional) URL for callback notifications
- callback_method: (Optional) HTTP method for callback (GET, POST)
- instruction: (Optional) Translation instruction/context
- format: (Optional) Content format (plain, html, xml, etc.)
- max_length: (Optional) Maximum character length for translations

# Polling Behavior
This tool automatically polls the creation process status until completion (up to 5 minutes).
It returns when the process is either successfully completed or failed.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Smartling project (e.g., "project-123", "abc123def456")`,
      },
      {
        name: 'strings',
        type: 'array',
        required: true,
        description: `Array of string objects to create. Maximum 100 strings can be created in a single request`,
      },
      {
        name: 'namespace',
        type: 'string',
        required: false,
        description: `(Optional) Namespace to organize and group related strings (e.g., "app.navigation", "forms.validation")`,
      },
      {
        name: 'placeholder_format',
        type: 'string',
        required: false,
        description: `(Optional) Predefined placeholder format. Common values: "java" ({name}), "python" (%(name)s), "c" (%s), "resx" ({0}), "yaml" (%{name})`,
      },
      {
        name: 'placeholder_format_custom',
        type: 'string',
        required: false,
        description: `(Optional) Custom regular expression pattern for identifying placeholders in the string text`,
      },
    ],
  },
  {
    name: 'smartlingmcp_smartling_delete_issue_assignee',
    description: `Unassign the user currently assigned to an issue.

# Use cases
- Remove the current assignee when the issue should not be owned by anyone

# Examples
- project_id="p1", issue_uid="i1"`,
    params: [
      { name: 'issue_uid', type: 'string', required: true, description: `The issue UID` },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The Smartling project UID`,
      },
    ],
  },
  {
    name: 'smartlingmcp_smartling_delete_issue_comment',
    description: `Delete a comment from an issue.

# Use cases
- Remove an off-topic or incorrect comment

# Examples
- project_id="p1", issue_uid="i1", issue_comment_uid="c1"

# Important
This action cannot be easily undone.`,
    params: [
      {
        name: 'issue_comment_uid',
        type: 'string',
        required: true,
        description: `The comment UID to delete`,
      },
      { name: 'issue_uid', type: 'string', required: true, description: `The issue UID` },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The Smartling project UID`,
      },
    ],
  },
  {
    name: 'smartlingmcp_smartling_edit_issue_text',
    description: `Edit the body text of an existing issue.

# Use cases
- Fix a typo in an issue's text
- Clarify a previously-vague issue description

# Examples
- project_id="abc", issue_uid="i1", issue_text="Updated description"`,
    params: [
      {
        name: 'issue_text',
        type: 'string',
        required: true,
        description: `New issue body text (1–4000 chars)`,
      },
      { name: 'issue_uid', type: 'string', required: true, description: `The issue UID to edit` },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The Smartling project UID`,
      },
    ],
  },
  {
    name: 'smartlingmcp_smartling_execute_lqa_evaluation',
    description: `Run an automated Linguistic Quality Assurance (LQA) evaluation on a single translated string and get back any detected quality errors.

# What is an LQA evaluation?
LQA evaluation checks a translation against its source string using Smartling's linguistic quality
rules (e.g. blocklist compliance, omissions, mistranslations) and returns the list of errors found,
each with a category and severity. It does not modify the string or record the errors anywhere;
it only reports what an LQA scan would flag.

# Use cases
- Automatically screen a translation for quality issues right after it's produced (e.g. from MT or a translator)
- Gate a workflow step transition on the string passing LQA with no critical/major errors
- Spot-check a translation on demand without waiting for a scheduled LQA pass

# Examples
- Minimal: account_id, project_uid, hashcode, source_locale_id="en", target_locale_id="fr-FR", original_string, translation
- With job/workflow context: also pass job_uid, workflow_uid, workflow_step_uid so the evaluation is attributed to that job step
- With custom metadata: metadata={"integrationType": "TEST"}`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `Account UID. Call smartling_get_available_accounts_for_current_user first to retrieve it.`,
      },
      {
        name: 'hashcode',
        type: 'string',
        required: true,
        description: `Hashcode of the string being evaluated. Not validated against Smartling content and does not need to correspond to an existing string; any non-empty string is accepted.`,
      },
      {
        name: 'original_string',
        type: 'string',
        required: true,
        description: `The original (source) string text`,
      },
      {
        name: 'project_uid',
        type: 'string',
        required: true,
        description: `The Smartling project UID the string belongs to`,
      },
      {
        name: 'source_locale_id',
        type: 'string',
        required: true,
        description: `Locale identifier of the source string (e.g. "en")`,
      },
      {
        name: 'target_locale_id',
        type: 'string',
        required: true,
        description: `Locale identifier of the translation (e.g. "fr-FR")`,
      },
      {
        name: 'translation',
        type: 'string',
        required: true,
        description: `The translated text to evaluate against the source`,
      },
      {
        name: 'job_uid',
        type: 'string',
        required: false,
        description: `Optional: translation job UID this evaluation is associated with`,
      },
      {
        name: 'metadata',
        type: 'object',
        required: false,
        description: `Optional: arbitrary string key/value metadata to attach to the evaluation (e.g. {"integrationType": "TEST"})`,
      },
      {
        name: 'word_count',
        type: 'integer',
        required: false,
        description: `Optional: word count of the string, used for reporting/metrics`,
      },
      {
        name: 'workflow_step_uid',
        type: 'string',
        required: false,
        description: `Optional: workflow step UID this evaluation is associated with`,
      },
      {
        name: 'workflow_uid',
        type: 'string',
        required: false,
        description: `Optional: workflow UID this evaluation is associated with`,
      },
    ],
  },
  {
    name: 'smartlingmcp_smartling_export_glossary',
    description: `Export glossary entries in various formats (CSV, XLSX, TBX).

# What is glossary export?
Glossary export allows you to export glossary entries with various filtering and formatting options. You can export entries in CSV, XLSX, or TBX formats with comprehensive filtering capabilities including locale filtering, entry state filtering, label filtering, and more.

# Use cases
- User requests to export entire glossary in a specific format
- User wants to export glossary entries for specific locales
- User needs to export filtered glossary entries (by state, labels, date ranges, etc.)
- User wants to export glossary in TBX format for translation memory systems
- User needs to export glossary entries with specific sorting or pagination

# Examples
- Export full glossary as CSV: {"glossary_uid": "abc123", "format": "CSV", "locale_ids": ["en-US", "fr-FR"]}
- Export active entries only: {"glossary_uid": "abc123", "format": "XLSX", "entry_state": "ACTIVE"}
- Export with custom filters: {"glossary_uid": "abc123", "format": "TBX", "tbx_version": "TBXcoreStructV02", "query": "marketing terms"}`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `Account UID. Call smartling_get_available_accounts_for_current_user first to retrieve it.`,
      },
      {
        name: 'format',
        type: 'string',
        required: true,
        description: `Export format. CSV for comma-separated values, XLSX for Excel format, TBX for translation exchange format.`,
      },
      {
        name: 'glossary_uid',
        type: 'string',
        required: true,
        description: `UID of the glossary to export entries from.`,
      },
      {
        name: 'created_by_filter',
        type: 'object',
        required: false,
        description: `Filter entries by creator.`,
      },
      {
        name: 'created_filter',
        type: 'object',
        required: false,
        description: `Filter entries by creation date.`,
      },
      {
        name: 'dnt_locale_id',
        type: 'string',
        required: false,
        description: `Filter entries by "Do Not Translate" flag for specified locale.`,
      },
      {
        name: 'dnt_term_set',
        type: 'boolean',
        required: false,
        description: `Filter entries based on "Do Not Translate" term setting.`,
      },
      {
        name: 'entry_state',
        type: 'string',
        required: false,
        description: `Filter entries by their state. ACTIVE for active entries only, ARCHIVED for archived entries only, BOTH for all entries.`,
      },
      {
        name: 'entry_uids',
        type: 'array',
        required: false,
        description: `Array of specific entry UIDs to export. If provided, only these entries will be exported.`,
      },
      {
        name: 'focus_locale_id',
        type: 'string',
        required: false,
        description: `Focus locale ID for the export. This locale will be prioritized in the export.`,
      },
      { name: 'labels', type: 'object', required: false, description: `Filter entries by labels.` },
      {
        name: 'last_modified_by_filter',
        type: 'object',
        required: false,
        description: `Filter entries by last modifier.`,
      },
      {
        name: 'last_modified_filter',
        type: 'object',
        required: false,
        description: `Filter entries by last modified date.`,
      },
      {
        name: 'locale_ids',
        type: 'array',
        required: false,
        description: `Array of locale IDs to include in export (e.g., ["en-US", "fr-FR", "de-DE"]). If not provided, all locales will be exported.`,
      },
      {
        name: 'missing_translation_locale_id',
        type: 'string',
        required: false,
        description: `Filter to include entries missing translations in specified locale.`,
      },
      {
        name: 'paging',
        type: 'object',
        required: false,
        description: `Pagination settings for the export.`,
      },
      {
        name: 'present_translation_locale_id',
        type: 'string',
        required: false,
        description: `Filter to include entries with translations present in specified locale.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Search query to filter entries by term content.`,
      },
      {
        name: 'return_fallback_translations',
        type: 'boolean',
        required: false,
        description: `Whether to include fallback translations in the export. Default is false.`,
      },
      {
        name: 'skip_entries',
        type: 'boolean',
        required: false,
        description: `Whether to skip entry details and export only metadata. Default is false.`,
      },
      {
        name: 'sorting',
        type: 'object',
        required: false,
        description: `Sorting settings for the export.`,
      },
      {
        name: 'tbx_version',
        type: 'string',
        required: false,
        description: `TBX version to use when exporting in TBX format. Only relevant when format is "TBX".`,
      },
    ],
  },
  {
    name: 'smartlingmcp_smartling_find_account_issues',
    description: `Search issues across all projects in the current Smartling account, with pagination, sorting, filters, and optional project narrowing. The account is taken from the MCP token credentials.

# Use cases
- Find all HIGH-severity OPEN issues across the whole account
- Cross-project triage of recent issues

# Examples
- All open: issue_state_codes=["OPENED"]
- Narrow to two projects: project_ids=["p1","p2"]`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `Account UID. Call smartling_get_available_accounts_for_current_user first to retrieve it.`,
      },
      {
        name: 'answered',
        type: 'boolean',
        required: false,
        description: `Filter by answered state`,
      },
      {
        name: 'assignee_user_uid',
        type: 'string',
        required: false,
        description: `Filter to issues assigned to this user (max 12 chars)`,
      },
      {
        name: 'created_date_after',
        type: 'string',
        required: false,
        description: `ISO 8601 timestamp; include issues created after this date`,
      },
      {
        name: 'created_date_before',
        type: 'string',
        required: false,
        description: `ISO 8601 timestamp; include issues created before this date`,
      },
      {
        name: 'has_comments',
        type: 'boolean',
        required: false,
        description: `Filter by whether the issue has comments`,
      },
      {
        name: 'issue_numbers',
        type: 'array',
        required: false,
        description: `Filter by specific issue numbers (max 1000)`,
      },
      {
        name: 'issue_severity_level_codes',
        type: 'array',
        required: false,
        description: `Filter by severity (LOW, MEDIUM, HIGH)`,
      },
      {
        name: 'issue_state_codes',
        type: 'array',
        required: false,
        description: `Filter by state (OPENED, RESOLVED)`,
      },
      {
        name: 'issue_sub_type_codes',
        type: 'array',
        required: false,
        description: `Filter by sub-type (CLARIFICATION, MISSPELLING, etc.)`,
      },
      {
        name: 'issue_type_codes',
        type: 'array',
        required: false,
        description: `Filter by type (SOURCE, TRANSLATION)`,
      },
      {
        name: 'issue_watching_state_code',
        type: 'string',
        required: false,
        description: `Filter by current user's watching state`,
      },
      {
        name: 'job_filter',
        type: 'object',
        required: false,
        description: `Filter by job containment`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Page size (1–30; default 30)`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Pagination offset, non-negative`,
      },
      {
        name: 'project_ids',
        type: 'array',
        required: false,
        description: `Optional: limit to specific project UIDs`,
      },
      {
        name: 'reopened',
        type: 'boolean',
        required: false,
        description: `Filter by reopened state`,
      },
      {
        name: 'reported_by_user_uid',
        type: 'string',
        required: false,
        description: `Filter to issues reported by this user (max 12 chars)`,
      },
      {
        name: 'resolved_date_after',
        type: 'string',
        required: false,
        description: `ISO 8601 timestamp; include issues resolved after this date`,
      },
      {
        name: 'resolved_date_before',
        type: 'string',
        required: false,
        description: `ISO 8601 timestamp; include issues resolved before this date`,
      },
      { name: 'sort_by', type: 'object', required: false, description: `Sort specification` },
      {
        name: 'string_filter',
        type: 'object',
        required: false,
        description: `Filter by string properties`,
      },
    ],
  },
  {
    name: 'smartlingmcp_smartling_find_project_issues',
    description: `Search issues within a single Smartling project, with pagination, sorting, and rich filters.

# Use cases
- List all OPEN issues in a project, newest first
- Find HIGH-severity TRANSLATION issues assigned to a specific user
- Count + page through a project's issue backlog

# Examples
- All open issues: project_id="p1", issue_state_codes=["OPENED"]
- By assignee: assignee_user_uid="user-1"
- Sorted by creation date: sort_by={items:[{direction:"DESC", field_name:"createdDate"}]}, limit=30`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The Smartling project UID`,
      },
      {
        name: 'answered',
        type: 'boolean',
        required: false,
        description: `Filter by answered state`,
      },
      {
        name: 'assignee_user_uid',
        type: 'string',
        required: false,
        description: `Filter to issues assigned to this user (max 12 chars)`,
      },
      {
        name: 'created_date_after',
        type: 'string',
        required: false,
        description: `ISO 8601 timestamp; include issues created after this date`,
      },
      {
        name: 'created_date_before',
        type: 'string',
        required: false,
        description: `ISO 8601 timestamp; include issues created before this date`,
      },
      {
        name: 'has_comments',
        type: 'boolean',
        required: false,
        description: `Filter by whether the issue has comments`,
      },
      {
        name: 'issue_numbers',
        type: 'array',
        required: false,
        description: `Filter by specific issue numbers (max 1000)`,
      },
      {
        name: 'issue_severity_level_codes',
        type: 'array',
        required: false,
        description: `Filter by severity (LOW, MEDIUM, HIGH)`,
      },
      {
        name: 'issue_state_codes',
        type: 'array',
        required: false,
        description: `Filter by state (OPENED, RESOLVED)`,
      },
      {
        name: 'issue_sub_type_codes',
        type: 'array',
        required: false,
        description: `Filter by sub-type (CLARIFICATION, MISSPELLING, etc.)`,
      },
      {
        name: 'issue_type_codes',
        type: 'array',
        required: false,
        description: `Filter by type (SOURCE, TRANSLATION)`,
      },
      {
        name: 'issue_watching_state_code',
        type: 'string',
        required: false,
        description: `Filter by current user's watching state`,
      },
      {
        name: 'job_filter',
        type: 'object',
        required: false,
        description: `Filter by job containment`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Page size (1–30; default 30)`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `Pagination offset, non-negative`,
      },
      {
        name: 'reopened',
        type: 'boolean',
        required: false,
        description: `Filter by reopened state`,
      },
      {
        name: 'reported_by_user_uid',
        type: 'string',
        required: false,
        description: `Filter to issues reported by this user (max 12 chars)`,
      },
      {
        name: 'resolved_date_after',
        type: 'string',
        required: false,
        description: `ISO 8601 timestamp; include issues resolved after this date`,
      },
      {
        name: 'resolved_date_before',
        type: 'string',
        required: false,
        description: `ISO 8601 timestamp; include issues resolved before this date`,
      },
      { name: 'sort_by', type: 'object', required: false, description: `Sort specification` },
      {
        name: 'string_filter',
        type: 'object',
        required: false,
        description: `Filter by string properties`,
      },
    ],
  },
  {
    name: 'smartlingmcp_smartling_get_available_accounts_for_current_user',
    description: `Get available accounts for the current user.

# What are available accounts?
Available accounts are Smartling accounts that the current authenticated user has access to. This tool is essential for determining which account UID to use with other Smartling MCP tools.

# Use cases
- User needs to determine which account UID to use before calling other Smartling tools
- User wants to see all accounts they have access to
- User needs to select the correct account context for their operations
- Required before using other Smartling MCP tools that need accountUid parameter

# Important Notes
- This tool must be used before other Smartling MCP tools that require accountUid parameter
- If the tool returns more than 1 account UID, the user will be asked to specify which one to use
- The account UID from this response should be used in subsequent tool calls

# Examples
- Get available accounts: Use without any parameters
- Account selection: If multiple accounts are returned, user must choose which account UID to use`,
    params: [],
  },
  {
    name: 'smartlingmcp_smartling_get_glossary',
    description: `Retrieve a specific glossary from the current Smartling account by its UID.

# What is glossary?
A Glossary is a list of terms and expressions that represent your brand, and influence your translations.
Companies create Glossaries in order to provide a shared understanding of terms to be used across all business units and languages.
With Smartling, you will be able to utilize the Glossary to synchronize translations across all responsible parties working on your translations.

# Use cases
- User requests to get detailed information about a specific glossary
- Resolving glossary(s) by project:
  - If you have only project name then you can chain next tools to get glossaries uids: smartling_list_projects -> smartling_get_project -> smartling_get_linguistic_package (glossaries uids might be inside linguistic package) -> smartling_list_glossaries or smartling_get_glossary.
  - If you have project uid then you can chain next tools to get glossaries uids: smartling_get_project -> smartling_get_linguistic_package (glossaries uids might be inside linguistic package) -> smartling_list_glossaries or smartling_get_glossary.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `Account UID. Call smartling_get_available_accounts_for_current_user first to retrieve it.`,
      },
      {
        name: 'glossary_uid',
        type: 'string',
        required: true,
        description: `UID of the glossary to retrieve.`,
      },
    ],
  },
  {
    name: 'smartlingmcp_smartling_get_issue',
    description: `Retrieve detailed information about a specific string issue.

# What is a string issue?
A string issue is a question, clarification request, or quality flag raised against a specific string (source or translation) inside a Smartling project.

# Use cases
- Inspect the full state of one issue by its UID
- Read severity, type, comments count, and assignee on a single issue

# Examples
- Get an issue: project_id="abc123", issue_uid="issue-uid-1"`,
    params: [
      {
        name: 'issue_uid',
        type: 'string',
        required: true,
        description: `The unique identifier of the issue to retrieve`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The Smartling project UID the issue belongs to`,
      },
    ],
  },
  {
    name: 'smartlingmcp_smartling_get_issue_comment',
    description: `Retrieve a single issue comment by UID.

# Use cases
- Read the full text of one specific comment

# Examples
- project_id="p1", issue_uid="i1", issue_comment_uid="c1"`,
    params: [
      { name: 'issue_comment_uid', type: 'string', required: true, description: `The comment UID` },
      { name: 'issue_uid', type: 'string', required: true, description: `The issue UID` },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The Smartling project UID`,
      },
    ],
  },
  {
    name: 'smartlingmcp_smartling_get_job',
    description: `Get detailed information about a specific Smartling job by its UID.

# What is a job?
A job is a translation task that contains files to be translated. Jobs help organize and manage translation work by grouping files together with specific target languages, due dates, and workflow requirements.

# Use cases
- User requests to get detailed information about a specific job
- User needs to see comprehensive job details including source files, custom fields, and metadata
- User wants to retrieve job priority, callback configuration, and user details
- User needs to understand job creation and modification history

# Examples
- Get job by UID: Provide project_id and job_uid parameters
- Retrieve job details: Returns complete job configuration with priority, source files, and custom fields
- Check job progress: View job status, creation date, due date, and completion dates

# Job Details Response
The response includes extended job information beyond the basic job list:
- Job priority level
- Array of source files in the job
- Callback method and URL configuration
- Creation and modification user details
- Custom field values
- Complete job metadata and timestamps`,
    params: [
      {
        name: 'job_uid',
        type: 'string',
        required: true,
        description: `The unique identifier of the job to retrieve (e.g., "job-uid-123", "translation-job-456")`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Smartling project (e.g., "project-123", "abc123def456")`,
      },
    ],
  },
  {
    name: 'smartlingmcp_smartling_get_job_history',
    description: `Get the audit history of a specific Smartling job.

# What is job history?
Job history is the chronological audit trail of everything that has happened
to a job: creation, status changes, content additions/removals, due date
changes, priority changes, and rush request create/remove events. Each entry
records the action, when it started/ended, who (if anyone) performed it, and
event-specific details.

# Use cases
- User wants to know who changed a job's due date or priority, and when
- User needs to see when content was added to or removed from a job
- User wants an audit trail of status changes for a job
- User is investigating unexpected job behavior and needs the sequence of events

# Examples
- Get recent history: Provide project_id and job_uid (returns up to 100 most recent entries)
- Page through longer histories: Use offset with limit to retrieve subsequent pages, guided by totalCount in the response

# Pagination
- limit: Page size, 1-100 (default 100 if omitted)
- offset: Zero-based offset into the history (default 0 if omitted)
- totalCount in the response tells you how many entries exist in total`,
    params: [
      {
        name: 'job_uid',
        type: 'string',
        required: true,
        description: `The unique identifier of the job to retrieve history for (e.g., "job-uid-123")`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Smartling project (e.g., "project-123", "abc123def456")`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `(Optional) Page size (1-100; default 100). Capped at 100 to keep responses manageable; use offset to page through longer histories.`,
      },
      {
        name: 'offset',
        type: 'integer',
        required: false,
        description: `(Optional) Pagination offset, non-negative. Defaults to 0 if omitted.`,
      },
    ],
  },
  {
    name: 'smartlingmcp_smartling_get_linguistic_package',
    description: `Retrieve a specific linguistic package from the current Smartling account by its UID.

# What is linguistic package?
A linguistic package is a collection of translation resources, including glossaries and style guides that are used to ensure consistent and accurate translations.
This bundle contains settings that determine which linguistic assets (glossaries, style guides) are provided to translators for your projects.

# Use cases
- User requests to get detailed information about a specific linguistic package.
- Resolving linguistic package by project:
  - If you have only project name then you can chain next tools to get linguistic package: smartling_list_projects -> smartling_get_project -> smartling_get_linguistic_package.
  - If you have project uid then you can chain next tools to get linguistic package: smartling_get_project -> smartling_get_linguistic_package.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `Account UID. Call smartling_get_available_accounts_for_current_user first to retrieve it.`,
      },
      {
        name: 'linguistic_package_uid',
        type: 'string',
        required: true,
        description: `UID of the linguistic package to retrieve.`,
      },
    ],
  },
  {
    name: 'smartlingmcp_smartling_get_project',
    description: `Retrieve a specific project from the current Smartling account by its UID.

# What is project?
A project is a translation environment for the various types of content user wants to translate.

# Use cases
- User requests to get detailed information about a specific project.
`,
    params: [
      {
        name: 'project_uid',
        type: 'string',
        required: true,
        description: `UID of the project to retrieve.`,
      },
    ],
  },
  {
    name: 'smartlingmcp_smartling_get_styleguide',
    description: `Get specific style guide by its unique identifier.

# What is styleguide?
A Style Guide is a collection of rules about your preferences regarding content formatting, writing tone, and style.
It is a tool for ensuring the language and tone of your brand is found accurate and consistent in your translations.

# Use cases
- User requests to get detailed information about a specific style guide.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `Account UID. Call smartling_get_available_accounts_for_current_user first to retrieve it.`,
      },
      {
        name: 'style_guide_uid',
        type: 'string',
        required: true,
        description: `Unique identifier of the style guide to retrieve. Must ask user if not provided.`,
      },
    ],
  },
  {
    name: 'smartlingmcp_smartling_get_word_count_report',
    description: `Get word count report from Smartling in CSV format for efficient analysis.

# What is word count report?
A word count report provides detailed information about word counts and weighted word counts for translation work. It includes data about projects, jobs, translation resources, agencies, locales, workflow steps, and fuzzy matching profiles.

# API Constraints
**CRITICAL**: The date range between start_date and end_date must be **less than 1 year (365 days)**. The API will return a validation error if the range exceeds this limit.

# IMPORTANT: Apply Filters to Minimize Response Size
**Always encourage users to apply as many filters as possible** to keep response size manageable:
- **project_ids**: Filter by specific projects (most important filter)
- **target_locale_ids**: Filter by specific target locales
- **job_uids**: Filter by specific jobs
- **user_uids**: Filter by specific translation resources
- **workflow_step_types**: Filter by specific workflow steps (use smartling_get_workflow_step_types tool first)
- **start_date/end_date**: Use narrow date ranges
- **fields**: Request only the columns you need (see field list below)

# Recommended Field Selection
**Minimize the number of fields in the 'fields' parameter**. Only include what's needed for the specific query:
- Minimal: "projectId,projectName,targetLocaleId,wordCount"
- With job info: "projectId,projectName,targetLocaleId,jobUid,jobName,wordCount"
- With translator: "projectId,targetLocaleId,translationResourceName,workflowStepType,wordCount"

# Examples
- Find projects with most words in French: {"start_date": "2024-01-01", "end_date": "2024-12-31", "target_locale_ids": ["fr-FR"], "fields": "projectId,projectName,wordCount"}
- Find strings in AI Review step: {"start_date": "2024-01-01", "end_date": "2024-12-31", "workflow_step_types": ["AI Review"], "fields": "projectId,jobName,workflowStepType,wordCount"}
- Translator productivity: {"start_date": "2024-01-01", "end_date": "2024-01-31", "user_uids": ["user-123"], "fields": "translationResourceName,targetLocaleId,wordCount"}`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `Account UID. Call smartling_get_available_accounts_for_current_user first to retrieve it.`,
      },
      {
        name: 'end_date',
        type: 'string',
        required: true,
        description: `End date for the report in ISO format (e.g., 2024-01-31) in America/New_York timezone. Note: The date range (end_date - start_date) must be less than 1 year (365 days).`,
      },
      {
        name: 'start_date',
        type: 'string',
        required: true,
        description: `Start date for the report in ISO format (e.g., 2024-01-01) in America/New_York timezone. Note: The date range (end_date - start_date) must be less than 1 year (365 days).`,
      },
      {
        name: 'agency_uid',
        type: 'string',
        required: false,
        description: `The unique identifier of the agency to get report for`,
      },
      {
        name: 'fields',
        type: 'string',
        required: false,
        description: `List of fields to include in the response, separated by commas. Possible values: accountUid, accountName, projectId, projectName, targetLocaleId, targetLocale, jobUid, jobName, jobReferenceNumber, jobNumber, translationResourceUid, translationResourceName, agencyUid, agencyName, workflowStepType, workflowStepUid, workflowStepName, fuzzyProfileName, fuzzyTier, wordCount, weightedWordCount, characterCount. If not provided, next list is recommended as default value: projectId, projectName, targetLocaleId, jobUid, jobName, translationResourceName, workflowStepType, wordCount, characterCount.`,
      },
      {
        name: 'job_uids',
        type: 'array',
        required: false,
        description: `List of the unique identifiers of the job to get report for`,
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: `Maximum number of items to return (default: 10000, max: 10000)`,
      },
      {
        name: 'offset',
        type: 'number',
        required: false,
        description: `Pagination offset (0-based)`,
      },
      {
        name: 'project_ids',
        type: 'array',
        required: false,
        description: `List of the unique identifiers of the Smartling project to get report for`,
      },
      {
        name: 'target_locale_ids',
        type: 'array',
        required: false,
        description: `List of the target locale identifiers (e.g., "es", "fr-FR") to get report for`,
      },
      {
        name: 'user_uids',
        type: 'array',
        required: false,
        description: `List of the unique identifiers of the translation resource/user to get report for`,
      },
      {
        name: 'workflow_step_types',
        type: 'array',
        required: false,
        description: `The workflow step types to filter by (e.g., "Translation", "Review", "Edit"). Entire list can be fetched using the "Get Workflow Step Types" tool`,
      },
    ],
  },
  {
    name: 'smartlingmcp_smartling_get_workflow_step_types',
    description: `Get available workflow step types from Smartling for use in reporting and filtering.

# What are workflow step types?
Workflow step types define the different stages in a translation workflow, such as "Translation", "Review", "Edit", etc. This tool retrieves the complete list of available step types that can be used for filtering in other report tools.


# Examples
- Get all available workflow step types: {} (no parameters needed)`,
    params: [],
  },
  {
    name: 'smartlingmcp_smartling_list_content_assignments',
    description: `List content assignments for the current Smartling account.

# What is a content assignment?
A content assignment represents a unit of translation work assigned to a translator (user) or an agency
within a specific workflow step of a translation job. Each assignment ties together a project, target
locale, workflow step, translation job, and the assignee responsible for completing the work, along with
the word count and due dates relevant to that step.

# Use cases
- Discover who (translator or agency) is assigned to active translation work across the account
- Audit workflow ownership across projects, locales, and jobs
- Identify unassigned content assignments (entries where userUid and agencyUid are null)
- Review upcoming workflow-step or overall job due dates for resource planning
- Inspect word counts per workflow step for capacity planning

# Examples
- List all content assignments for the current account:
{} (no parameters)`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `Account UID. Call smartling_get_available_accounts_for_current_user first to retrieve it.`,
      },
    ],
  },
  {
    name: 'smartlingmcp_smartling_list_file_jobs',
    description: `Retrieve a list of translation jobs where a specific file is involved in a Smartling project.

Returns a list of translation jobs that include the specified file. Each job object contains job metadata (UID, status, dates).
**Special case - Unassigned strings**: If the file contains strings that are NOT assigned to any job, the response includes a special indicator object with all null values \`{"jobUid":null,"dueDate":null,"createdDate":null,"status":null}\`. This signals that some file content remains unassigned.

# Use cases
- Check which translation jobs contain a specific file
- Identify files with unassigned strings that need job assignment
- Diagnose why the connector doesn't deliver completed jobs (file content may span multiple incomplete jobs)

# Parameters
- project_uid: The unique identifier of the Smartling project
- file_uri: The URI of the file to check job status for`,
    params: [
      {
        name: 'file_uri',
        type: 'string',
        required: true,
        description: `The URI of the file to check (e.g., "/content/app.json", "strings/mobile.properties")`,
      },
      {
        name: 'project_uid',
        type: 'string',
        required: true,
        description: `The unique identifier of the Smartling project (e.g., "project-123", "abc123def456")`,
      },
    ],
  },
  {
    name: 'smartlingmcp_smartling_list_glossaries',
    description: `List glossaries by set of filters.

# Use cases
- User requests to retrieve glossaries:
  - User asked to retrieve a list of all glossaries
  - User asked to search for glossaries by name or description
  - User asked to filter glossaries by state (active, archived, both)
  - User asked to look for glossary for a specific target locale
  - User asked to retrieve several glossaries by their UIDs`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `Account UID. Call smartling_get_available_accounts_for_current_user first to retrieve it.`,
      },
      {
        name: 'glossary_state',
        type: 'string',
        required: false,
        description: `Glossary state. Enum: "ACTIVE" "ARCHIVED" "BOTH".`,
      },
      {
        name: 'glossary_uids',
        type: 'array',
        required: false,
        description: `Filter by glossary UIDs.`,
      },
      {
        name: 'include_entries_count',
        type: 'boolean',
        required: false,
        description: `Allows excluding or including glossary entries count for each glossary found by the criteria.`,
      },
      {
        name: 'query',
        type: 'string',
        required: false,
        description: `Allows searching glossaries by query within glossaryName or description properties. Also supports exact search by glossaryUid.`,
      },
      {
        name: 'target_locale_id',
        type: 'string',
        required: false,
        description: `Filter glossaries that have the specified target locale preconfigured.`,
      },
    ],
  },
  {
    name: 'smartlingmcp_smartling_list_issue_comments',
    description: `List all comments on an issue.

# Use cases
- Read the discussion thread on an issue before responding
- Audit comment activity for a specific issue

# Examples
- project_id="p1", issue_uid="i1"`,
    params: [
      { name: 'issue_uid', type: 'string', required: true, description: `The issue UID` },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The Smartling project UID`,
      },
    ],
  },
  {
    name: 'smartlingmcp_smartling_list_jobs',
    description: `List jobs from a specific Smartling project with optional filtering.

# Use cases
- User requests to retrieve all jobs from a project
- User wants to filter jobs by name or status
- User needs to see job progress and status information
- User wants to understand what translation work is available or in progress

# Examples
- List all jobs in a project: Use only project_id parameter
- Find jobs by name: Include job_name parameter for filtering
- Filter by status: Use job_statuses parameter with specific statuses
- Find active jobs: Use job_statuses=["IN_PROGRESS","AWAITING_AUTHORIZATION"]

# Job Statuses
Available job statuses include:
- AWAITING_AUTHORIZATION: Job is waiting for approval to start
- IN_PROGRESS: Job is currently being worked on
- COMPLETED: Job has been finished
- CANCELLED: Job was cancelled before completion
- CLOSED: Job was closed after completion`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Smartling project (e.g., "project-123", "abc123def456")`,
      },
      {
        name: 'job_name',
        type: 'string',
        required: false,
        description: `(Optional) Filter jobs by name. Supports partial matching to find jobs containing this text.`,
      },
      {
        name: 'job_statuses',
        type: 'array',
        required: false,
        description: `(Optional) Filter jobs by status. Provide an array of job statuses to filter by. Example: ["IN_PROGRESS", "AWAITING_AUTHORIZATION"]`,
      },
    ],
  },
  {
    name: 'smartlingmcp_smartling_list_linguistic_packages',
    description: `List all linguistic packages from the current Smartling account.

# Use cases
- User requests to get a list of available linguistic packages.

# Examples
- List all linguistic packages:
{"account_id": "your-account-uid"}`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `Account UID. Call smartling_get_available_accounts_for_current_user first to retrieve it.`,
      },
    ],
  },
  {
    name: 'smartlingmcp_smartling_list_projects',
    description: `List projects from the current Smartling account by name.

# Use cases
- User requests to retrieve projects:
  - User asked to retrieve a list of all projects
  - User asked to search for projects by name
  - User asked to filter archived projects
  - User asked to look for projects with a specific project type codes
- Resolving project by project name:
  - If you have only project name then you can chain next tools to get project details: smartling_list_projects -> smartling_get_project (project list tool returns a simplified objects list with no additional information, so it needs to be followed by a get project call).

# Examples
- List all projects:
{} (no parameters)

- Find projects by name:
{
    "project_name_filter": "Mobile App"
}

- List active projects of specific type:
{
    "include_archived": false,
    "project_type_codes": ["web", "mobile"]
}`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `Account UID. Call smartling_get_available_accounts_for_current_user first to retrieve it.`,
      },
      {
        name: 'include_archived',
        type: 'boolean',
        required: false,
        description: `Whether to include archived projects in the list. If not provided, only active projects will be listed.`,
      },
      {
        name: 'project_name_filter',
        type: 'string',
        required: false,
        description: `Name of the project to filter by. If not provided, all projects will be listed. Do not enter empty string value if not provided, call tool without parameters instead. Must ask user if not provided.`,
      },
      {
        name: 'project_type_codes',
        type: 'array',
        required: false,
        description: `Array of project type codes to filter by. If not provided, all project types will be listed. Do not enter empty array if not provided, call tool without parameters instead. Must ask user if not provided.`,
      },
    ],
  },
  {
    name: 'smartlingmcp_smartling_list_styleguides',
    description: `List style guides from the current Smartling account by name.

# Use cases
- User requests to retrieve style guides:
  - User requests to retrieve all style guides.
  - User requests to retrieve style guides based on their names.

# Examples
- List all style guides:
{} (no parameters)

- Find style guides by name:
{
    "name": "Marketing"
}`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `Account UID. Call smartling_get_available_accounts_for_current_user first to retrieve it.`,
      },
      {
        name: 'name',
        type: 'string',
        required: false,
        description: `Name of the style guide to filter by. If not provided, all style guides will be listed. Do not enter empty string value if not provided, call tool without parameters instead. Must ask user if not provided.`,
      },
    ],
  },
  {
    name: 'smartlingmcp_smartling_list_users',
    description: `List users from a Smartling account with optional filtering.

# What are users in Smartling?
Users are individuals who have access to the Smartling platform with specific roles and permissions. They can be translators, project managers, reviewers, or other team members involved in the localization process.

# Use cases
- User requests to retrieve all users from the account
- User wants to search for specific users by name
- User needs to filter users by role or project assignment
- User wants to find users with specific status (active, pending)
- User wants to find users assigned to specific projects
- User needs to retrieve user contact information

# Examples
- List all users: Use without any parameters
- Search by name: Use keyword parameter to search in first and last names
- Filter by role: Use user_roles parameter with specific role names
- Find project users: Use project_ids parameter to find users assigned to specific projects
- Get active users: Use user_status="ACTIVE" to filter only active users

# User Statuses
Available user statuses include:
- ALL: All users regardless of status (default)
- ACTIVE: Users who are currently active
- PENDING: Users who have pending invitations

# Common Roles
Common user roles in Smartling include:
- ROLE_TRANSLATION_RESOURCE: Translation Resource
- ROLE_PROJECT_MANAGER: Project Manager
- ROLE_ACCOUNT_OWNER: Account Owner`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `Account UID. Call smartling_get_available_accounts_for_current_user first to retrieve it.`,
      },
      {
        name: 'keyword',
        type: 'string',
        required: false,
        description: `(Optional) Search keyword to filter users by first or last name. The search is performed as a wildcard match.`,
      },
      {
        name: 'project_ids',
        type: 'array',
        required: false,
        description: `(Optional) Array of project IDs to filter users who are assigned to specific projects. Example: ["project-123", "project-456"]`,
      },
      {
        name: 'user_roles',
        type: 'array',
        required: false,
        description: `(Optional) Array of role names to filter users by their assigned roles. Example: ["ROLE_TRANSLATION_RESOURCE", "ROLE_PROJECT_MANAGER"]`,
      },
      {
        name: 'user_status',
        type: 'string',
        required: false,
        description: `(Optional) Filter users by their status. ALL (default) returns all users, ACTIVE returns only active users, PENDING returns users with pending invitations.`,
      },
      {
        name: 'user_uids',
        type: 'array',
        required: false,
        description: `(Optional) Array of specific user UIDs to retrieve. Example: ["user-123", "user-456"]`,
      },
    ],
  },
  {
    name: 'smartlingmcp_smartling_list_workflows',
    description: `List workflows from a specific Smartling project with optional filtering.

# What is a workflow?
A workflow in Smartling defines the translation process steps that content goes through from source to target languages. Each workflow contains steps like translation, editing, review, and publishing, with specific configurations for each step.

# Use cases
- User requests to retrieve all workflows for a project
- User wants to search workflows by keyword
- User needs to filter workflows by specific locales
- User wants to find workflows with specific UIDs or step UIDs
- User needs to understand the translation process configuration

# Important Notes
- Results are limited to the first 100 workflows to avoid response size limits
- Response includes essential workflow and step information with verbose fields removed for performance

# Examples
- List all workflows in a project:
{
    "project_id": "project-123"
}

- Search workflows by keyword:
{
    "project_id": "project-123",
    "keyword": "marketing"
}

- Filter workflows by locales:
{
    "project_id": "project-123",
    "locale_ids": ["es-ES", "fr-FR"]
}

- Find specific workflows:
{
    "project_id": "project-123",
    "workflow_uids": ["workflow-uid-1", "workflow-uid-2"]
}`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `Account UID. Call smartling_get_available_accounts_for_current_user first to retrieve it.`,
      },
      {
        name: 'keyword',
        type: 'string',
        required: false,
        description: `Optional keyword to search for in workflow names. Supports partial matching.`,
      },
      {
        name: 'locale_ids',
        type: 'array',
        required: false,
        description: `Optional array of locale identifiers to filter workflows that include these locales. Example: ["es-ES", "fr-FR", "de-DE"]`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: false,
        description: `The unique identifier of the Smartling project to search workflows within. If not provided, returns workflows across all projects (if supported).`,
      },
      {
        name: 'workflow_step_uids',
        type: 'array',
        required: false,
        description: `Optional array of workflow step UIDs to filter workflows that contain these steps.`,
      },
      {
        name: 'workflow_uids',
        type: 'array',
        required: false,
        description: `Optional array of specific workflow UIDs to retrieve. Use this when you need to get specific workflows by their unique identifiers.`,
      },
    ],
  },
  {
    name: 'smartlingmcp_smartling_machine_translate_file',
    description: `Translates file content using machine translation.

# Use cases
- User requests to translate files (text or binary).

Two ways to supply the file - provide exactly one of \`upload_id\` or \`file_content\`:
1. \`upload_id\` (preferred, default choice): call smartling_request_upload_url first, PUT the file to the returned URL, then pass the returned upload_id here. Use this whenever you can run shell commands (e.g. Claude Code, Codex CLI, opencode, Cursor, Cline, Windsurf), regardless of file size or type - do not fall back to file_content just because the file is small.
2. \`file_content\` (inline base64): only use this when you cannot run shell commands (e.g. claude.ai) or the user explicitly asks for inline/base64 content.

Auto-detects source language if \`source_locale\` not provided.
Must ask user for \`target_locale\` if not specified.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `Account UID. Call smartling_get_available_accounts_for_current_user first to retrieve it.`,
      },
      {
        name: 'file_name',
        type: 'string',
        required: true,
        description: `Original filename for context.`,
      },
      { name: 'mime_type', type: 'string', required: true, description: `MIME type of the file.` },
      {
        name: 'target_locale',
        type: 'string',
        required: true,
        description: `Target language locale code (2 or 5 letters, e.g., "en" or "en-US", dash separator only). Must ask user if not provided.`,
      },
      {
        name: 'file_content',
        type: 'string',
        required: false,
        description: `File content encoded as base64 string. Exactly one of file_content or upload_id must be provided. Use upload_id instead whenever you can run shell commands (e.g. Claude Code, Codex CLI, opencode, Cursor, Cline, Windsurf) - only use file_content when you cannot, or the user explicitly asks for inline/base64 content.`,
      },
      {
        name: 'source_locale',
        type: 'string',
        required: false,
        description: `Source language locale code (2 or 5 letters, e.g., "it" or "it-IT", dash separator only). Auto-detected if omitted.`,
      },
      {
        name: 'upload_id',
        type: 'string',
        required: false,
        description: `Identifier returned by a prior smartling_request_upload_url call. Exactly one of file_content or upload_id must be provided. Preferred over file_content whenever you can run shell commands (e.g. Claude Code, Codex CLI, opencode, Cursor, Cline, Windsurf) - call smartling_request_upload_url first, PUT the file, then pass the returned upload_id here, regardless of file size.`,
      },
    ],
  },
  {
    name: 'smartlingmcp_smartling_machine_translate_text',
    description: `Translates text content using machine translation.

# Use cases
- User requests to translate text or simple text files (txt format).

For file translation, read the file contents first.
Split long text into sentence-based chunks to preserve meaning and context - avoid breaking mid-sentence or splitting related content.
Each chunk becomes an object \`{ "key": "<unique_key>", "source_text": "<text_to_translate>" }\` with \`key\` (unique identifier) and \`source_text\` (content to translate) in the \`text_items_to_translate\` array.
Total request size must not exceed 10MB.
Auto-detects source language if \`source_locale\` not provided.
Must ask user for \`target_locale\` if not specified.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `Account UID. Call smartling_get_available_accounts_for_current_user first to retrieve it.`,
      },
      {
        name: 'target_locale',
        type: 'string',
        required: true,
        description: `Target language locale code (2 or 5 letters, e.g., "en" or "en-US", dash separator only). Must ask user if not provided.`,
      },
      {
        name: 'text_items_to_translate',
        type: 'array',
        required: true,
        description: `Array of text items to be translated. Each item should have a unique key and the text to be translated.`,
      },
      {
        name: 'source_locale',
        type: 'string',
        required: false,
        description: `Source language locale code (2 or 5 letters, e.g., "it" or "it-IT", dash separator only). Auto-detected if omitted.`,
      },
    ],
  },
  {
    name: 'smartlingmcp_smartling_match_glossary_terms',
    description: `Match terms within a specific glossary.

# Use cases
- User requests to find specific terms in a source and translated strings.
- User requests to find specific terms in a source only strings.

# Examples
- Match glossary terms in source and translated strings:
{
    "glossary_uids": ["glossary-uid-1"],
    "source_locale_id": "en-US",
    "translation_locale_id": "fr-FR",
    "source_text_to_match": [
        {
            "key": "text-1",
            "text": "Hello"
        },
        {
            "key": "text-2",
            "text": "World"
        }
    ],
    "translation_text_to_match": [
        {
            "key": "text-1",
            "text": "Bonjour"
        },
        {
            "key": "text-2",
            "text": "Monde"
        }
    ]
}
- Match glossary terms in source only strings (pass only source strings but leave translation strings empty and preserve keys):
{
    "glossary_uids": ["glossary-uid-1"],
    "source_locale_id": "en-US",
    "translation_locale_id": "fr-FR",
    "source_text_to_match": [
        {
            "key": "text-1",
            "text": "Hello"
        },
        {
            "key": "text-2",
            "text": "World"
        }
    ],
    "translation_text_to_match": [
        {
            "key": "text-1",
            "text": ""
        },
        {
            "key": "text-2",
            "text": ""
        }
    ]
}`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `Account UID. Call smartling_get_available_accounts_for_current_user first to retrieve it.`,
      },
      {
        name: 'glossary_uids',
        type: 'array',
        required: true,
        description: `Array of glossary UIDs to search within.`,
      },
      {
        name: 'source_locale_id',
        type: 'string',
        required: true,
        description: `Source locale ID for the terms to match.`,
      },
      {
        name: 'source_text_to_match',
        type: 'array',
        required: true,
        description: `Source text to match against glossary terms.`,
      },
      {
        name: 'translation_locale_id',
        type: 'string',
        required: true,
        description: `Target locale ID for the terms to match.`,
      },
      {
        name: 'translation_text_to_match',
        type: 'array',
        required: true,
        description: `Translation text to match against glossary terms. If you need to only find terms in source string then set source_text_to_match and leave translation_text_to_match[N].text empty (you still need to pass translation_text_to_match[N].key).`,
      },
      {
        name: 'mt_optimized_terms_only',
        type: 'boolean',
        required: false,
        description: `Whether to include only MT-optimized terms. If not specified then MT-optimized only terms will be included.`,
      },
    ],
  },
  {
    name: 'smartlingmcp_smartling_open_or_close_issue',
    description: `Open or close (resolve) an issue.

# Use cases
- Resolve an issue once the underlying string question is answered
- Re-open a resolved issue that needs more discussion

# Examples
- Resolve: project_id="p1", issue_uid="i1", issue_state="RESOLVED"
- Re-open: issue_state="OPENED"`,
    params: [
      {
        name: 'issue_state',
        type: 'string',
        required: true,
        description: `New state: OPENED or RESOLVED`,
      },
      { name: 'issue_uid', type: 'string', required: true, description: `The issue UID` },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The Smartling project UID`,
      },
    ],
  },
  {
    name: 'smartlingmcp_smartling_remove_all_tags_from_strings',
    description: `Remove all tags from strings in a Smartling project.

# Use cases
- Clean slate for string reorganization - remove all tags before applying new categorization
- Prepare strings for migration to a different tagging system
- Batch clean up of strings during project restructuring

# Examples
- Clean up strings before project migration
- Remove all tags from deprecated feature strings  
- Reset tagging for strings that will be recategorized
- Clean up test strings that accumulated development tags

# Parameters
- project_id: The unique identifier of the Smartling project
- string_hashcodes: Array of string hashcodes to remove all tags from (max 1000 hashcodes)

# Important Note
This operation removes ALL tags from the specified strings. Use with caution as this action cannot be easily undone.`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Smartling project (e.g., "project-123", "abc123def456")`,
      },
      {
        name: 'string_hashcodes',
        type: 'array',
        required: true,
        description: `Array of string hashcodes to remove all tags from. Maximum 1000 string hashcodes can be processed at once.`,
      },
    ],
  },
  {
    name: 'smartlingmcp_smartling_remove_strings_from_job',
    description: `Remove strings from an existing Smartling job by their hashcodes.

# Use cases
- User wants to remove specific strings from a translation job
- User needs to exclude certain content from an existing job
- User wants to remove strings for specific target locales only
- User needs to clean up job content before authorization

# Examples
- Remove strings from job: Provide project_id, job_uid, and array of hashcodes
- Remove for specific locales: Include target_locale_ids to remove strings for specific languages only
- Clean up job: Remove unnecessary strings before job authorization

# Parameters
- hashcodes: Array of string hashcodes to remove from the job
- target_locale_ids: (Optional) Specific target locales to remove strings for`,
    params: [
      {
        name: 'hashcodes',
        type: 'array',
        required: true,
        description: `Array of string hashcodes to remove from the job. Each hashcode uniquely identifies a translatable string.`,
      },
      {
        name: 'job_uid',
        type: 'string',
        required: true,
        description: `The unique identifier of the job to remove strings from (e.g., "job-uid-123", "translation-job-456")`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Smartling project (e.g., "project-123", "abc123def456")`,
      },
      {
        name: 'target_locale_ids',
        type: 'array',
        required: false,
        description: `(Optional) Array of target locale IDs to remove strings for. If not provided, strings will be removed for all job target locales. Example: ["es", "fr", "de"]`,
      },
    ],
  },
  {
    name: 'smartlingmcp_smartling_remove_tags_from_strings',
    description: `Remove tags from strings in a Smartling project.

# Use cases
- Remove outdated tags from strings

# Examples
- Clean up categorization tags: tags=["old-feature", "deprecated"]
- Remove release tags after deployment: tags=["v2.0", "pending-release"]

# Parameters
- project_id: The unique identifier of the Smartling project
- tags: Array of tag strings to remove (max 100 tags, each max 128 characters)
- string_hashcodes: Array of string hashcodes to remove tags from (max 1000 hashcodes)`,
    params: [
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Smartling project (e.g., "project-123", "abc123def456")`,
      },
      {
        name: 'string_hashcodes',
        type: 'array',
        required: true,
        description: `Array of string hashcodes to remove tags from. Maximum 1000 string hashcodes can be processed at once.`,
      },
      {
        name: 'tags',
        type: 'array',
        required: true,
        description: `Array of tag strings to remove from the strings. Each tag must be 128 characters or less, and maximum 100 tags can be removed at once.`,
      },
    ],
  },
  {
    name: 'smartlingmcp_smartling_request_upload_url',
    description: `Requests a short-lived URL for uploading a local file, for use with other tools that accept an "upload_id" parameter (e.g. smartling_machine_translate_file).

# Use cases
- Preferred, default first step before translating or otherwise processing any local file, whenever you can run shell commands (e.g. Claude Code, Codex CLI, opencode, Cursor, Cline, Windsurf) - use this instead of inline base64 content regardless of file size or type.

Only usable by clients that can run shell commands (e.g. Claude Code, Codex CLI, opencode, Cursor, Cline, Windsurf) to PUT the file to the returned URL - not usable from claude.ai or other clients without local file/shell access, which should keep using inline base64 content instead.
The returned URL expires in 15 minutes. Upload immediately after requesting it, then pass the returned upload_id to the tool that needs the file.`,
    params: [
      {
        name: 'account_id',
        type: 'string',
        required: true,
        description: `Account UID. Call smartling_get_available_accounts_for_current_user first to retrieve it.`,
      },
    ],
  },
  {
    name: 'smartlingmcp_smartling_search_strings',
    description: `Search for strings in a Smartling project using various filters.

# What is string searching?
String searching allows you to find translation strings within a Smartling project based on various criteria like status, content, target locales, and more. This helps manage and locate specific strings for translation workflows.

# Use cases
- User requests to find strings by status (e.g., "untranslated", "translated", "approved")
- User wants to search strings by source content keywords
- User needs to find strings for specific target locales
- User wants to discover strings in a project for review or analysis
- User needs to find strings matching specific criteria for translation management

# Examples
- Search all untranslated strings in a project: Use project_uid and status parameters
- Find strings containing specific text: Use project_uid and source_keyword parameters
- Search strings for specific locales: Use project_uid and locale_ids parameters
- General string discovery: Use project_uid parameter only for all strings (up to 100 results)`,
    params: [
      {
        name: 'project_uid',
        type: 'string',
        required: true,
        description: `The unique identifier of the Smartling project to search strings within (e.g., "project-uid-123", "abc123def456")`,
      },
      {
        name: 'active_strings_filter',
        type: 'object',
        required: false,
        description: `Filter by active string presence.`,
      },
      {
        name: 'assignment_filter',
        type: 'object',
        required: false,
        description: `Filter by user assignment`,
      },
      {
        name: 'context_filter',
        type: 'object',
        required: false,
        description: `Filter by context presence with optional URL/UID filtering`,
      },
      {
        name: 'estimated_edit_effort_filter',
        type: 'object',
        required: false,
        description: `Filter by estimated edit effort levels.`,
      },
      {
        name: 'hashcodes',
        type: 'array',
        required: false,
        description: `Array of specific string hashcodes to search for (unique string identifiers)`,
      },
      {
        name: 'history_filter',
        type: 'object',
        required: false,
        description: `Filter by history actions and time intervals.`,
      },
      {
        name: 'ingestion_warning_type_filter',
        type: 'object',
        required: false,
        description: `Filter by ingestion warning types like CHARACTER_TO_WORD_RATIO_HIGH, STRING_TOO_LONG, etc.`,
      },
      {
        name: 'instructions_filter',
        type: 'object',
        required: false,
        description: `Filter by presence and content of translation instructions`,
      },
      {
        name: 'issues_filter',
        type: 'object',
        required: false,
        description: `Filter by string issues.`,
      },
      {
        name: 'key_variant_filter',
        type: 'object',
        required: false,
        description: `Filter by string key keyword with exact match option`,
      },
      {
        name: 'locale_ids',
        type: 'array',
        required: false,
        description: `Array of target locale identifiers to filter strings (e.g., ["es-ES", "fr-FR", "de-DE"])`,
      },
      {
        name: 'namespace_filter',
        type: 'object',
        required: false,
        description: `Filter by specific namespace name`,
      },
      {
        name: 'placeholder_plurals_selector',
        type: 'string',
        required: false,
        description: `Control display of placeholder and plural forms. Available options: HAS_PLACEHOLDERS, HAS_PLURALS, HAS_BOTH`,
      },
      {
        name: 'prepublish_filter',
        type: 'object',
        required: false,
        description: `Filter by prepublish presence`,
      },
      {
        name: 'source_keyword',
        type: 'string',
        required: false,
        description: `Text to search for within source string content (partial text matching)`,
      },
      {
        name: 'source_only',
        type: 'boolean',
        required: false,
        description: `Whether to return only source strings without translation data`,
      },
      {
        name: 'status',
        type: 'string',
        required: false,
        description: `Filter strings by translation status. AWAITING_AUTH: awaiting authorization, IN_PROGRESS: translation in progress, PUBLISHED: completed and published, EXCLUDED: excluded from translation`,
      },
      {
        name: 'tags_filter',
        type: 'object',
        required: false,
        description: `Filter by string tags.`,
      },
      {
        name: 'translation_jobs_filter',
        type: 'object',
        required: false,
        description: `Filter by translation job association`,
      },
      {
        name: 'translation_review_filter',
        type: 'object',
        required: false,
        description: `Filter by translation review presence and optional review state codes`,
      },
      {
        name: 'translations_filter',
        type: 'object',
        required: false,
        description: `Filter by translation presence and optionally search within translation text.`,
      },
      {
        name: 'urls_filter',
        type: 'object',
        required: false,
        description: `Filter by URL with exact match option`,
      },
      {
        name: 'workflow_steps_filter',
        type: 'object',
        required: false,
        description: `Filter by specific workflow step UIDs`,
      },
    ],
  },
  {
    name: 'smartlingmcp_smartling_search_translation_memory',
    description: `Search translation memory for similar translations in a Smartling project.

# What is translation memory?
A Translation Memory is a cloud-based database of all translations that have occurred within your Smartling account, as well as any translations that you may have imported to Smartling.
Translation Memories are used to leverage (or read from) previously used translations with new source content - allowing for cost savings, time savings, and translation consistency.
As translations are saved, they write to a designated Translation Memory.

# Use cases
- Useful for finding existing translations that match or are similar to source text.

# Examples
- Search for translations of "Hello world" in French:
{
    "project_id": "project-uid-123",
    "locale_id": "fr-FR",
    "search": "Hello world",
    "minimum_score": 0.7
}

- Find exact matches for UI text:
{
    "project_id": "project-uid-123",
    "locale_id": "es-ES",
    "search": "Click here to continue",
    "minimum_score": 0.95
}`,
    params: [
      {
        name: 'locale_id',
        type: 'string',
        required: true,
        description: `The target locale identifier (e.g., "es-ES", "fr-FR") to search translations for. Must ask user if not provided.`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Smartling project to search translation memory within. Must ask user if not provided.`,
      },
      {
        name: 'search',
        type: 'string',
        required: true,
        description: `The source text to search for in translation memory. This is the text you want to find similar translations for.`,
      },
      {
        name: 'minimum_score',
        type: 'number',
        required: false,
        description: `Minimum similarity score threshold (0.0 to 1.0). Higher values return more exact matches. For example, 0.5 means 50% similarity minimum. Defaults to 0.1 if not specified.`,
      },
    ],
  },
  {
    name: 'smartlingmcp_smartling_update_issue_answered',
    description: `Mark an issue as answered or un-answered.

# Use cases
- Mark an issue answered after a reply is posted
- Clear the answered flag if the reply is later found inadequate

# Examples
- project_id="p1", issue_uid="i1", answered=true`,
    params: [
      { name: 'answered', type: 'boolean', required: true, description: `New answered state` },
      { name: 'issue_uid', type: 'string', required: true, description: `The issue UID` },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The Smartling project UID`,
      },
    ],
  },
  {
    name: 'smartlingmcp_smartling_update_issue_assignee',
    description: `Assign an issue to a specific user.

# Use cases
- Route an issue to the responsible PM or translator for action

# Examples
- project_id="p1", issue_uid="i1", assignee_user_uid="user-xyz"`,
    params: [
      {
        name: 'assignee_user_uid',
        type: 'string',
        required: true,
        description: `User UID to assign the issue to (max 12 chars)`,
      },
      { name: 'issue_uid', type: 'string', required: true, description: `The issue UID` },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The Smartling project UID`,
      },
    ],
  },
  {
    name: 'smartlingmcp_smartling_update_issue_comment',
    description: `Edit the text of an existing comment.

# Use cases
- Fix a typo in a comment
- Update outdated guidance in a comment

# Examples
- project_id="p1", issue_uid="i1", issue_comment_uid="c1", comment_text="Edited"`,
    params: [
      {
        name: 'comment_text',
        type: 'string',
        required: true,
        description: `New comment body text (1–4000 chars)`,
      },
      { name: 'issue_comment_uid', type: 'string', required: true, description: `The comment UID` },
      { name: 'issue_uid', type: 'string', required: true, description: `The issue UID` },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The Smartling project UID`,
      },
    ],
  },
  {
    name: 'smartlingmcp_smartling_update_issue_severity_level',
    description: `Change the severity level of an issue.

# Use cases
- Escalate an issue from MEDIUM to HIGH
- Downgrade severity once mitigated

# Examples
- project_id="p1", issue_uid="i1", issue_severity_level="HIGH"`,
    params: [
      {
        name: 'issue_severity_level',
        type: 'string',
        required: true,
        description: `New severity: LOW, MEDIUM, or HIGH`,
      },
      { name: 'issue_uid', type: 'string', required: true, description: `The issue UID` },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The Smartling project UID`,
      },
    ],
  },
  {
    name: 'smartlingmcp_smartling_update_issue_type',
    description: `Change the type and sub-type of an issue (optionally narrowing to one locale).

# Use cases
- Re-categorize a CLARIFICATION issue as MISSPELLING after triage
- Move a TRANSLATION issue to a specific locale

# Examples
- project_id="p1", issue_uid="i1", issue_type="TRANSLATION", issue_sub_type="MISSPELLING"
- with locale: also locale_id="fr-FR"`,
    params: [
      { name: 'issue_sub_type', type: 'string', required: true, description: `New sub-type` },
      {
        name: 'issue_type',
        type: 'string',
        required: true,
        description: `New type: SOURCE or TRANSLATION`,
      },
      { name: 'issue_uid', type: 'string', required: true, description: `The issue UID` },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The Smartling project UID`,
      },
      {
        name: 'locale_id',
        type: 'string',
        required: false,
        description: `Optional: narrow the issue to this target locale (max 5 chars)`,
      },
    ],
  },
  {
    name: 'smartlingmcp_smartling_update_job',
    description: `Get detailed information about a specific Smartling job by its UID.

# Use cases
- User wants to set any of optional job properties like due date
- User needs to edit job metadata

# Job Details Response
The response includes detailed job information:
- Callback method and URL configuration
- Creation and modification user details
- Custom field values
- Complete job metadata and timestamps`,
    params: [
      { name: 'job_name', type: 'string', required: true, description: `Name of the job` },
      {
        name: 'job_uid',
        type: 'string',
        required: true,
        description: `Unique identifier for the translation job`,
      },
      {
        name: 'project_id',
        type: 'string',
        required: true,
        description: `The unique identifier of the Smartling project (e.g., "project-123", "abc123def456")`,
      },
      {
        name: 'callback_method',
        type: 'string',
        required: false,
        description: `Callback method configuration (GET, POST, etc.)`,
      },
      {
        name: 'callback_url',
        type: 'string',
        required: false,
        description: `Callback URL for job notifications`,
      },
      {
        name: 'custom_fields',
        type: 'array',
        required: false,
        description: `Array of custom field values for the job`,
      },
      { name: 'description', type: 'string', required: false, description: `Job description` },
      {
        name: 'due_date',
        type: 'string',
        required: false,
        description: `Due date for job completion`,
      },
      {
        name: 'reference_number',
        type: 'string',
        required: false,
        description: `Reference number for the job`,
      },
    ],
  },
]
