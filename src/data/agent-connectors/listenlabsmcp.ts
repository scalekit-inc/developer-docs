import type { Tool } from '../../types/agent-connectors'

export const tools: Tool[] = [
  {
    name: 'listenlabsmcp_create_study',
    description: `Start a new guided user-interview study. Provide a plain-language description of the study goals and target audience. The platform's creation agent walks through onboarding stages; subsequent turns must use edit_study with the returned studyId and chatId.`,
    params: [
      {
        name: 'prompt',
        type: 'string',
        required: true,
        description: `Plain-language description of the study to create (goals, who to interview, what to learn)`,
      },
      {
        name: 'orgId',
        type: 'string',
        required: false,
        description: `Organization UUID when known (e.g. from list_creatable_orgs)`,
      },
      {
        name: 'orgName',
        type: 'string',
        required: false,
        description: `Organization name to create the study in. Required when the user belongs to multiple organizations.`,
      },
    ],
  },
  {
    name: 'listenlabsmcp_edit_study',
    description: `Send a natural-language edit instruction or structured button event to the study creation agent. Use after create_study (pass the chatId) for guided onboarding, or with a fresh chatId for direct edits to an existing study. Supply either prompt or buttonClick, not both.`,
    params: [
      { name: 'studyId', type: 'string', required: true, description: `UUID of the study to edit` },
      {
        name: 'buttonClick',
        type: 'object',
        required: false,
        description: `Structured button event from the guided onboarding flow`,
      },
      {
        name: 'chatId',
        type: 'string',
        required: false,
        description: `Chat session ID from create_study or a previous edit_study call. Omit on the first turn.`,
      },
      {
        name: 'prompt',
        type: 'string',
        required: false,
        description: `Free-form instruction or user input for the study agent`,
      },
    ],
  },
  {
    name: 'listenlabsmcp_get_response',
    description: `Deep-dive into a single respondent's interview. Returns a structured transcript with question tracking, input types, multiple choice data, and source URLs for each message. Paginated for large interviews.`,
    params: [
      {
        name: 'readable_id',
        type: 'number',
        required: true,
        description: `Respondent number from get_study_responses`,
      },
      {
        name: 'study_id',
        type: 'string',
        required: true,
        description: `Study ID (UUID) from list_studies`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor for long transcripts`,
      },
    ],
  },
  {
    name: 'listenlabsmcp_get_study_analysis',
    description: `Get the AI-generated analysis report for a study, rendered as markdown. Use list_studies first to find studies where has_analysis is true. The report includes sourced respondent quotes with deep-links to the original transcript messages.`,
    params: [
      {
        name: 'study_id',
        type: 'string',
        required: true,
        description: `Study ID (UUID) from list_studies`,
      },
    ],
  },
  {
    name: 'listenlabsmcp_get_study_responses',
    description: `Get response transcripts for a study. Returns formatted interview transcripts with pagination. Each respondent answer includes a source link to that exact message in the transcript.`,
    params: [
      {
        name: 'study_id',
        type: 'string',
        required: true,
        description: `Study ID (UUID) from list_studies`,
      },
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from previous response`,
      },
      {
        name: 'max_responses',
        type: 'number',
        required: false,
        description: `Maximum number of responses to return (default 10, max 50)`,
      },
      {
        name: 'question_numbers',
        type: 'array',
        required: false,
        description: `Only include these question numbers in the transcript (1-indexed)`,
      },
      {
        name: 'readable_ids',
        type: 'array',
        required: false,
        description: `Filter to specific respondents by their readable ID numbers`,
      },
    ],
  },
  {
    name: 'listenlabsmcp_get_study_state',
    description: `Return the current state of a study — title, audience, study guide, questions, screener, and recruitment details. Also includes launch eligibility, credit balance, and per-recruitment cost. Call before edit_study or launch_study to inspect the current study configuration.`,
    params: [
      {
        name: 'studyId',
        type: 'string',
        required: true,
        description: `UUID of the study to inspect`,
      },
    ],
  },
  {
    name: 'listenlabsmcp_launch_study',
    description: `Publish the study's draft revision (if needed) and start all unlaunched recruitments that fit the organization's credit balance. Recruitments are launched greedily in dashboard order. Returns launched and skipped recruitments with balance before/after. Safe to re-call — already-launched recruitments are skipped.`,
    params: [
      {
        name: 'studyId',
        type: 'string',
        required: true,
        description: `UUID of the study to launch`,
      },
    ],
  },
  {
    name: 'listenlabsmcp_list_creatable_orgs',
    description: `List organizations the user belongs to where they can create studies. Returns org ID, name, and role. Supports pagination and case-insensitive name search. Call before create_study when the user has not specified an organization.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from a previous call's nextCursor`,
      },
      {
        name: 'limit',
        type: 'integer',
        required: false,
        description: `Page size (default 10, max 25)`,
      },
      {
        name: 'textHint',
        type: 'string',
        required: false,
        description: `Case-insensitive substring to filter org names by`,
      },
    ],
  },
  {
    name: 'listenlabsmcp_list_studies',
    description: `List studies accessible to the authenticated user. Returns study ID, name, status, creation date, response count, and whether analysis is available. Paginated (50 per page). Use textHint to filter by study title; use cursor for pagination.`,
    params: [
      {
        name: 'cursor',
        type: 'string',
        required: false,
        description: `Pagination cursor from previous response`,
      },
      { name: 'status', type: 'string', required: false, description: `Filter by study status` },
      {
        name: 'textHint',
        type: 'string',
        required: false,
        description: `Case-insensitive substring to filter study titles by`,
      },
    ],
  },
  {
    name: 'listenlabsmcp_publish_study',
    description: `Publish the study's current draft revision so respondents see the latest version. No-op when the draft is identical to prod. Does not start recruitments — use launch_study to begin sourcing respondents.`,
    params: [
      {
        name: 'studyId',
        type: 'string',
        required: true,
        description: `UUID of the study to publish`,
      },
    ],
  },
  {
    name: 'listenlabsmcp_search_across_studies',
    description: `Search across study metadata using a text query. Returns matching studies with relevant context.`,
    params: [
      {
        name: 'query',
        type: 'string',
        required: true,
        description: `Search term to find across studies`,
      },
      {
        name: 'max_results',
        type: 'number',
        required: false,
        description: `Maximum number of results to return (default 10)`,
      },
    ],
  },
]
